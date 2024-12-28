import classNames from 'classnames'
import React, { MutableRefObject } from 'react'

export function chainedRef<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref) {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    }
  }
}

export function nearestIndex(x: number, values: number[]) {
  // find FIRST value >= cur
  let left = 0,
    right = values.length
  while (right - left > 1) {
    const mid = (left + right - 1) >> 1
    if (values[mid] < x) {
      left = mid + 1
    } else {
      right = mid + 1
    }
  }
  if (left === 0) {
    return 0
  } else if (x >= (values[left] + values[left - 1]) * 0.5) {
    return left
  } else {
    return left - 1
  }
}

export function nearestValue(x: number, values: number[]) {
  return values[nearestIndex(x, values)]
}

export function nearestInRanges(cur: number, ranges: number[], prev: number) {
  // find FIRST group with max >= cur
  let left = 0,
    right = ranges.length >> 1
  while (right - left > 1) {
    const mid = (left + right - 1) >> 1
    if (ranges[mid + mid + 1] < cur) {
      left = mid + 1
    } else {
      right = mid + 1
    }
  }
  left *= 2
  if (cur >= ranges[left] && cur <= ranges[left + 1]) {
    return cur
  } else if (cur > ranges[left + 1]) {
    return ranges[left + 1]
  } else if (left > 0 && prev > cur) {
    return ranges[left - 1]
  } else {
    return ranges[left]
  }
}

const formatNum = (value: number, digits: number, trim: boolean) =>
  trim ? parseFloat(value.toFixed(digits)).toString() : value.toFixed(digits)

const NumberInput = React.forwardRef(function NumberInput(
  {
    digits = 2,
    value = 0,
    onChange,
    onEnter,
    className,
    values,
    ranges,
    onFocus: onFocusOrig,
    onBlur: onBlurOrig,
    onlyFinal,
    trim = true,
    text,
    time,
    ...props
  }: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    digits?: number
    value: number
    onChange: (value: number) => void
    onEnter?: (value: number | undefined) => void
    values?: number[]
    ranges?: number[]
    onlyFinal?: boolean
    trim?: boolean
    text?: boolean
    time?: boolean
  },
  forwardRef: React.ForwardedRef<HTMLInputElement>
) {
  const disabled = props.disabled
  const min = props.min === undefined ? undefined : Number(props.min)
  const max = props.max === undefined ? undefined : Number(props.max)
  const step = props.step === undefined ? 1 : Number(props.step)

  const [valid, setValid] = React.useState(true)
  const [refresh, setRefresh] = React.useState(0)
  const valueRef = React.useRef<number | undefined>(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const fmtValue = React.useCallback(
    (value: number) => {
      if (time) {
        const minutes = Math.floor(value / 60)
        let seconds = formatNum(value - minutes * 60, digits, trim)
        if (seconds.match(/^\d(?:\.|$)/)) {
          seconds = '0' + seconds
        }
        return `${minutes}:${seconds}`
      } else {
        return formatNum(value, digits, trim)
      }
    },
    [trim, digits, time]
  )
  const parseValue = React.useCallback(
    (text: string) => {
      if (time) {
        let result = 0
        for (const part of text.split(':')) {
          result = result * 60 + parseFloat(part)
        }
        return result
      } else {
        return parseFloat(text)
      }
    },
    [time]
  )

  React.useLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value
      inputRef.current!.value = fmtValue(value)
      setValid(true)
    }
  }, [value, refresh, fmtValue])

  const onFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      inputRef.current!.select()
      if (onFocusOrig) onFocusOrig(e)
    },
    [onFocusOrig]
  )

  const onInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(
        time ? /[^\-\d.:]/g : /[^\-\d.]/g,
        ''
      )
      if (e.target.value !== filtered) {
        e.target.value = filtered
      }
      const m = filtered.match(
        time ? /^(?:\d+:)?(\d*)(?:\.(\d*))?$/ : /^-?(\d*)(?:\.(\d*))?$/
      )
      const input = parseValue(e.target.value)
      if (!m || isNaN(input)) {
        setValid(false)
        valueRef.current = undefined
      } else {
        const d = Math.max(digits, m[2] ? m[2].length : 0)
        const eps = Math.exp(-Math.LN10 * d) * 0.51
        let clamped = input
        if (step && !isNaN(step)) clamped = Math.round(clamped / step) * step
        if (min != null) clamped = Math.max(min, clamped)
        if (max != null) clamped = Math.min(max, clamped)
        if (values) clamped = nearestValue(clamped, values)
        if (ranges) clamped = nearestInRanges(clamped, ranges, value)
        if (Math.abs(clamped - input) > eps) {
          if (valid && Math.abs(input - value) === step) {
            inputRef.current!.value = fmtValue(clamped)
            valueRef.current = clamped
            setValid(true)
            if (!onlyFinal) {
              onChange(clamped)
            }
          } else {
            valueRef.current = undefined
            setValid(false)
          }
        } else {
          valueRef.current = clamped
          setValid(true)
          if (!onlyFinal) {
            onChange(clamped)
          }
        }
      }
    },
    [
      digits,
      min,
      max,
      step,
      onChange,
      value,
      values,
      ranges,
      valid,
      onlyFinal,
      fmtValue,
      parseValue,
      time
    ]
  )

  React.useEffect(() => {
    if (disabled) return
    function onWheel(e: WheelEvent) {
      if (e.shiftKey) return
      e.preventDefault()
      e.stopPropagation()
      const dir = e.deltaY > 0 ? -1 : 1
      let clamped = value
      if (values) {
        const index = nearestIndex(clamped, values)
        if (index + dir >= 0 && index + dir < values.length) {
          clamped = values[index + dir]
        }
      } else {
        if (step && !isNaN(step)) clamped += step * dir
        else clamped += dir
        if (min != null) clamped = Math.max(min, clamped)
        if (max != null) clamped = Math.min(max, clamped)
        if (ranges) clamped = nearestInRanges(clamped, ranges, value)
      }
      inputRef.current!.value = fmtValue(clamped)
      valueRef.current = clamped
      onChange(clamped)
      setValid(true)
    }
    const node = inputRef.current!
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [value, onChange, min, max, step, values, ranges, fmtValue, disabled])

  const onAccept = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let input = parseValue(inputRef.current!.value)
      if (isNaN(input)) {
        valueRef.current = value
        inputRef.current!.value = fmtValue(value)
        setValid(true)
      } else {
        if (step && !isNaN(step)) input = Math.round(input / step) * step
        if (min != null) input = Math.max(min, input)
        if (max != null) input = Math.min(max, input)
        if (values) input = nearestValue(input, values)
        if (ranges) input = nearestInRanges(input, ranges, value)
        valueRef.current = input
        inputRef.current!.value = fmtValue(input)
        setValid(true)
        onChange(input)
        setRefresh((v) => v + 1)
      }
      if (onBlurOrig) onBlurOrig(e)
    },
    [
      min,
      max,
      step,
      value,
      values,
      ranges,
      onChange,
      onBlurOrig,
      fmtValue,
      parseValue
    ]
  )

  const onCancel = React.useCallback(() => {
    valueRef.current = value
    inputRef.current!.value = fmtValue(value)
    setValid(true)
  }, [value, fmtValue])

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) {
        return
      }
      switch (e.key) {
        case 'Enter':
          inputRef.current!.blur()
          if (onEnter) onEnter(valueRef.current)
          break
        case 'Esc':
        case 'Escape':
          onCancel()
          inputRef.current!.blur()
          break
        // no default
      }
    },
    [disabled, onEnter, onCancel]
  )

  const ref = React.useMemo(
    () => chainedRef(inputRef, forwardRef),
    [inputRef, forwardRef]
  )

  return (
    <input
      type={text ? 'text' : 'number'}
      defaultValue={fmtValue(value)}
      onChange={onInput}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onAccept}
      className={classNames(className, { invalid: !valid })}
      ref={ref}
      {...props}
    />
  )
})

export default NumberInput

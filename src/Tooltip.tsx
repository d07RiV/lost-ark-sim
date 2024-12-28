import classNames from 'classnames'
import { ReactNode } from 'react'

export function Tooltip({
  tooltip,
  className,
  children
}: {
  className?: string
  tooltip: ReactNode
  children: ReactNode
}) {
  return (
    <div className={classNames('with-tooltip', className)}>
      {children}
      <div className="tooltip">{tooltip}</div>
    </div>
  )
}

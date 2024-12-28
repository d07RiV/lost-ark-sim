import classNames from 'classnames'

export function Icon({
  icon,
  style,
  className,
  ...props
}: { icon: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames('icon', className)}
      style={{ backgroundImage: `url(/icons/${icon}.webp)`, ...style }}
      {...props}
    />
  )
}

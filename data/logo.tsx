const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="10" y="10" width="180" height="180" rx="20" fill="#FF6D00" />
      <path d="M50 50 L150 50 L100 150 Z" fill="#FFFFFF" stroke="#FF6D00" strokeWidth="5" />
      <circle cx="100" cy="100" r="40" fill="#FFFFFF" stroke="#FF6D00" strokeWidth="5" />
    </svg>
  )
}
export default Logo

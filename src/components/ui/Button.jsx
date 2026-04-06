import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const variantClass = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    outline: styles.outline,
    danger: styles.danger,
  }[variant];

  const sizeClass = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
    icon: styles.icon,
  }[size];

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className={`${styles.spinner} h-5 w-5`} viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;

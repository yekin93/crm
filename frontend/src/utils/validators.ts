export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): boolean => {
    // At least 6 characters
    return password.length >= 6;
  },

  passwordStrength: (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strengthCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
      .filter(Boolean).length;
    
    if (strengthCount >= 3) return 'strong';
    if (strengthCount >= 2) return 'medium';
    return 'weak';
  },

  required: (value: string | undefined | null): boolean => {
    return value !== undefined && value !== null && value.trim().length > 0;
  },

  minLength: (value: string, length: number): boolean => {
    return value.length >= length;
  },

  maxLength: (value: string, length: number): boolean => {
    return value.length <= length;
  },

  matchPasswords: (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

export const getValidationMessage = {
  required: (fieldName: string) => `${fieldName} alanı zorunludur.`,
  email: () => 'Geçerli bir e-posta adresi giriniz.',
  password: () => 'Şifre en az 6 karakter olmalıdır.',
  passwordMatch: () => 'Şifreler eşleşmiyor.',
  minLength: (fieldName: string, length: number) =>
    `${fieldName} en az ${length} karakter olmalıdır.`,
  maxLength: (fieldName: string, length: number) =>
    `${fieldName} en fazla ${length} karakter olmalıdır.`,
};

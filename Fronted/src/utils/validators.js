// Validation utility with comprehensive rules
export const validators = {
  email: (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!re.test(value)) return "Please enter a valid email address";
    return null;
  },

  password: (value, minLength = 8) => {
    if (!value) return "Password is required";
    if (value.length < minLength) return `Password must be at least ${minLength} characters`;
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    return null;
  },

  phone: (value) => {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!value) return "Phone number is required";
    if (!re.test(value.replace(/\s/g, ""))) return "Please enter a valid phone number";
    return null;
  },

  name: (value) => {
    if (!value || !value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    if (value.trim().length > 100) return "Name must be less than 100 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return null;
  },

  amount: (value, min = 1, max = 1000000) => {
    if (!value) return "Amount is required";
    const num = parseFloat(value);
    if (isNaN(num)) return "Please enter a valid amount";
    if (num < min) return `Amount must be at least ₹${min}`;
    if (num > max) return `Amount cannot exceed ₹${max.toLocaleString("en-IN")}`;
    return null;
  },

  skillTitle: (value) => {
    if (!value || !value.trim()) return "Skill title is required";
    if (value.trim().length < 3) return "Skill title must be at least 3 characters";
    if (value.trim().length > 100) return "Skill title must be less than 100 characters";
    return null;
  },

  skillRate: (value) => {
    if (!value) return "Hourly rate is required";
    const num = parseFloat(value);
    if (isNaN(num)) return "Please enter a valid rate";
    if (num < 50) return "Hourly rate must be at least ₹50";
    if (num > 100000) return "Hourly rate cannot exceed ₹100,000";
    return null;
  },

  description: (value, maxLength = 500) => {
    if (!value || !value.trim()) return "Description is required";
    if (value.trim().length < 10) return "Description must be at least 10 characters";
    if (value.trim().length > maxLength) return `Description must be less than ${maxLength} characters`;
    return null;
  },

  bio: (value, maxLength = 500) => {
    if (value && value.trim().length > maxLength) return `Bio must be less than ${maxLength} characters`;
    return null;
  },

  city: (value) => {
    if (!value || !value.trim()) return "City is required";
    if (value.trim().length < 2) return "City must be at least 2 characters";
    if (value.trim().length > 100) return "City must be less than 100 characters";
    return null;
  },
};

// Batch validation function
export const validateForm = (data, rules) => {
  const errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(data[field]);
    if (error) errors[field] = error;
  }
  return errors;
};

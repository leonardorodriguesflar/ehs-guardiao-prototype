import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationSchema {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  schema: ValidationSchema
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((field: string, value: any): string | null => {
    const rule = schema[field];
    if (!rule) return null;

    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'Este campo é obrigatório';
    }

    if (value && typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `Mínimo de ${rule.minLength} caracteres`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Máximo de ${rule.maxLength} caracteres`;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return 'Formato inválido';
      }
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [schema]);

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(schema).forEach(field => {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(schema).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  }, [data, schema, validateField]);

  const updateField = useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error || ''
      }));
    }
  }, [touched, validateField]);

  const touchField = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, data[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
  }, [data, validateField]);

  const resetForm = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    updateField,
    touchField,
    validateAll,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
}
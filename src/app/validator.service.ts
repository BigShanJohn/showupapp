import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public errors: string[] = [];
  constructor() { }

  isEmail(val: string): boolean {
    if (/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(val)) {
      return true;
    }
    this.errors.push(`Email is invalid`);
    return false;
  }

  isPhone(val: string): boolean {
    if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(val)) {
      return true;
    }
    this.errors.push(`Phone number is invalid `);
    return false;
  }

  required(val: string, label: string): boolean {
    if (val.trim().length > 0) {
      return true;
    }
    this.errors.push(`${label} is required`);
    return false;
  }

  matched(val1: string, val2: string, label: string = 'Password'): boolean {
    if (val1.trim() == val2.trim()) {
      return true;
    }
    this.errors.push(`${label} does not match`);
    return false;
  }

  isStrongPassword(val: string) {
    let strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (strongRegex.test(val)) {
      return true;
    }
    this.errors.push(`Strong password  must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character,  1 special character and be eight characters or longer`);
    return false;

  }

  range(val: string, label: string, min: number = 1, max: number | null = null): boolean {
    if (val.trim().length >= min && !max) {
      return true;
    }
    else if (val.trim().length >= min && (max && max <= val.trim().length)) {
      return true;
    }
    this.errors.push(!max ? `${label}  must be atleast ${min} characters` : `${label}  must be atleast ${min} characters and not more than  ${max} characters`);
    return false;
  }

  clear() {
    this.errors = [];
  }
}

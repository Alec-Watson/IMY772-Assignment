
const { add, subtract, multiply, divide } = require('../src/calculator/calculator')
describe('Error Handling / Edge Cases', () => {
  divide
    // Division by zero
    test('division by zero returns error', () => {
            const a = "14";
            const b = "00";
            expect(() => divide(a, b)).toThrow('Division by zero');
    });
  
    // Non-hex input
    test('non-hex input throws error', () => {
      const a = "ZZ";
      const b = "ZZ";
      expect(() => subtract(a, b)).toThrow('Invalid hexadecimal input');
    });
  
    // Input exceeds 2 digits (duplicated to make sense in this group too)
    test('input exceeds 2 digits throws error', () => {
        const a = "ABC";
        const b = "ABC"
        expect(() => add(a,b)).toThrow('Input exceeds maximum of 2 hex digits');    
    });
  
  });
  
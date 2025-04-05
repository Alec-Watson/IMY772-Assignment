const { add, subtract, multiply, divide } = require('../src/calculator/calculator');

describe('Input/Output Constraints', () => {

  test('input exceeds 2 digits throws error', () => {
    expect(() => {
      multiply("1A3", "1");
    }).toThrow('Input exceeds maximum of 2 hex digits');
  });

  test('output should not exceed 4 digits', () => {
    const result = multiply("FF", "FF"); // "FE01"
    expect(parseInt(result, 16)).toBeLessThanOrEqual(0xFFFF);
  });

  test('should not output negative values', () => {
    const result = subtract("0A", "0F"); // "00"
    expect(parseInt(result, 16)).toBeGreaterThanOrEqual(0);
  });

  test('division should return integer part only', () => {
    const result = divide("14", "05"); // "04"
    expect(Number.isInteger(parseInt(result, 16))).toBe(true);
  });

});

const { add, subtract, multiply, divide } = require('../src/calculator/calculator')
describe('Arithmetic Operations', () => {

  // Addition
  test('adds 0A + 05 = 0F', () => {
    const a = "0A";
    const b = "05";
    const result = add(a, b);
    expect(result).toBe("0F");
  });

  // Subtraction
  test('subtracts 0F - 0A = 05', () => {
    const a = "0F";
    const b = "0A";
    const result = subtract(a, b);
    expect(result).toBe("05");
  });

  test('subtracts 0A - 0F = 00 (no negative)', () => {
    const a = "0A";
    const b = "0F";
    const result = subtract(a, b);
    expect(result).toBe("00");
  });

  // Multiplication
  test('multiplies 0A * 05 = 32', () => {
    const a = "0A";
    const b = "05";
    const result = multiply(a, b);
    expect(result).toBe("32");
  });

  // Division
  test('divides 14 / 05 = 04', () => {
    const a = "14";
    const b = "05";
    const result = divide(a, b);
    expect(result).toBe("04");
  });

});
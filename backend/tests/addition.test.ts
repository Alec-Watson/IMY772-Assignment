test('adds 0A + 05 = 0F', () => {
    const a = parseInt("0A", 16);
    const b = parseInt("05", 16);
    const sum = a + b;
    expect(sum.toString(16).toUpperCase()).toBe("F");
  });
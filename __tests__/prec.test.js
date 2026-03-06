const parse = require("../src/parser.js").parse;

describe('Parser Failing Tests', () => {
  test('should handle multiplication and division before addition and subtraction', () => {
    expect(parse("2 + 3 * 4")).toBe(14); // 2 + (3 * 4) = 14
    expect(parse("10 - 6 / 2")).toBe(7); // 10 - (6 / 2) = 7
    expect(parse("5 * 2 + 3")).toBe(13); // (5 * 2) + 3 = 13
    expect(parse("20 / 4 - 2")).toBe(3); // (20 / 4) - 2 = 3
  });
  test('should handle exponentiation with highest precedence', () => {
    expect(parse("2 + 3 ** 2")).toBe(11); // 2 + (3 ** 2) = 11
    expect(parse("2 * 3 ** 2")).toBe(18); // 2 * (3 ** 2) = 18
    expect(parse("10 - 2 ** 3")).toBe(2); // 10 - (2 ** 3) = 2
  });
  test('should handle right associativity for exponentiation', () => {
    expect(parse("2 ** 3 ** 2")).toBe(512); // 2 ** (3 ** 2) = 2 ** 9 = 512
    expect(parse("3 ** 2 ** 2")).toBe(81); // 3 ** (2 ** 2) = 3 ** 4 = 81
  });
  test('should handle mixed operations with correct precedence', () => {
    expect(parse("1 + 2 * 3 - 4")).toBe(3); // 1 + (2 * 3) - 4 = 3
    expect(parse("15 / 3 + 2 * 4")).toBe(13); // (15 / 3) + (2 * 4) = 13
    expect(parse("10 - 3 * 2 + 1")).toBe(5); // 10 - (3 * 2) + 1 = 5
  });
  test('should handle expressions with exponentiation precedence', () => {
    expect(parse("2 ** 3 + 1")).toBe(9); // (2 ** 3) + 1 = 9
    expect(parse("3 + 2 ** 4")).toBe(19); // 3 + (2 ** 4) = 19
    expect(parse("2 * 3 ** 2 + 1")).toBe(19); // 2 * (3 ** 2) + 1 = 19
  });
  test('should handle various realistic calculations with correct precedence', () => {
    expect(parse("1 + 2 * 3")).toBe(7); // 1 + (2 * 3) = 7
    expect(parse("6 / 2 + 4")).toBe(7); // (6 / 2) + 4 = 7
    expect(parse("2 ** 2 + 1")).toBe(5); // (2 ** 2) + 1 = 5
    expect(parse("10 / 2 / 5")).toBe(1); // (10 / 2) / 5 = 1
    expect(parse("100 - 50 + 25")).toBe(75); // (100 - 50) + 25 = 75
    expect(parse("2 * 3 + 4 * 5")).toBe(26); // (2 * 3) + (4 * 5) = 26
  });

  test('should handle precedence correctly with floating-point numbers', () => {
    expect(parse("1.5 + 2.5 * 2")).toBeCloseTo(6.5); // 1.5 + (2.5 * 2)
    expect(parse("7.2 - 3.6 / 1.2")).toBeCloseTo(4.2); // 7.2 - (3.6 / 1.2)
    expect(parse("1.2 * 3.0 + 0.4")).toBeCloseTo(4.0); // (1.2 * 3.0) + 0.4
  });

  test('should handle associativity correctly with floating-point numbers', () => {
    expect(parse("9.0 / 3.0 / 1.5")).toBeCloseTo(2.0); // (9.0 / 3.0) / 1.5
    expect(parse("5.5 - 2.2 - 1.1")).toBeCloseTo(2.2); // (5.5 - 2.2) - 1.1
    expect(parse("2.5 ** 2.0 ** 2.0")).toBeCloseTo(39.0625); // 2.5 ** (2.0 ** 2.0)
  });

  test('should handle mixed precedence and associativity with floating-point numbers', () => {
    expect(parse("1.1 + 2.2 * 3.0 - 0.5")).toBeCloseTo(7.2); // 1.1 + (2.2 * 3.0) - 0.5
    expect(parse("2.0 ** 2.0 * 1.5 + 0.5")).toBeCloseTo(6.5); // (2.0 ** 2.0) * 1.5 + 0.5
    expect(parse("1.5 + 2.0 ** 3.0 / 4.0")).toBeCloseTo(3.5); // 1.5 + ((2.0 ** 3.0) / 4.0)
  });

  test('should respect precedence changes introduced by parentheses', () => {
    expect(parse("(1 + 2) * 3")).toBe(9); // (1 + 2) * 3
    expect(parse("10 / (2 + 3)")).toBe(2); // 10 / (2 + 3)
    expect(parse("(8 - 3) * (2 + 1)")).toBe(15); // (8 - 3) * (2 + 1)
  });

  test('should respect parentheses with exponentiation precedence', () => {
    expect(parse("(2 + 1) ** 2")).toBe(9); // (2 + 1) ** 2
    expect(parse("2 ** (1 + 2)")).toBe(8); // 2 ** (1 + 2)
    expect(parse("(2 ** 3) ** 2")).toBe(64); // (2 ** 3) ** 2
  });

  test('should handle nested parentheses with mixed operators', () => {
    expect(parse("((1 + 2) * (3 + 4)) / 7")).toBe(3); // ((1 + 2) * (3 + 4)) / 7
    expect(parse("(5 - (1 + 1)) * (2 + 3)")).toBe(15); // (5 - (1 + 1)) * (2 + 3)
    expect(parse("2 * (3 + (4 * 2))")).toBe(22); // 2 * (3 + (4 * 2))
  });

  test('Should handle factorials with correct precedence', () => {
    expect(parse("5!")).toBe(120);
    expect(parse("3! + 2")).toBe(8); // (3!) + 2 = 6 + 2 = 8
    expect(parse("4! * 2")).toBe(48); // (4!) * 2 = 24 * 2 = 48
    expect(parse("6! / 3!")).toBe(120); // (6!) / (3!) = 720 / 6 = 120
    expect(parse("5! - 10")).toBe(110); // (5!) - 10 = 120 - 10 = 110
    expect(parse("2 * 3!")).toBe(12); // 2 * (3!) = 2 * 6 = 12
    expect(parse("4! + 3!")).toBe(30); // (4!) + (3!) = 24 + 6 = 30
    expect(parse("5! / 2")).toBe(60); // (5!) / 2 = 120 / 2 = 60
    expect(parse("3! ** 2")).toBe(36); // (3!) ** 2 = 6 ** 2 = 36
    expect(parse("4! - 3! + 2")).toBe(20); // (4!) - (3!) + 2 = 24 - 6 + 2 = 20
  });
});

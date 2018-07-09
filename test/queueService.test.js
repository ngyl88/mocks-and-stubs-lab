const mockRandomInt = jest.fn();
jest.doMock("mathjs", () => {
  return {
    randomInt: mockRandomInt
  };
});
const generateQueue = require("../src/queueService");

beforeEach(() => {
  mockRandomInt.mockReset();
  mockRandomInt
    .mockImplementationOnce((num1, num2) => 3)
    .mockImplementationOnce((num1, num2) => 2)
    .mockImplementationOnce((num1, num2) => -10)
    .mockImplementationOnce((num1, num2) => 1);
});

it("should call randomInt when generateQueue is called", () => {
  generateQueue();
  expect(mockRandomInt).toBeCalledTimes(4);
});

it("should return an array when generateQueue is called", () => {
  const result = generateQueue();
  expect(result).toBeInstanceOf(Array);
  expect(result).toEqual([2, -10, 1]);
});

// step 1: only one function exported, describe block is optional
// step 2: dependencies --> mocking required

const mockGenerateQueue = jest.fn();
const mockMakePayment = jest.fn();
const mockRefundPayment = jest.fn();

jest.doMock("../src/paymentService", () => {
  return {
    makePayment: mockMakePayment,
    refundPayment: mockRefundPayment
  };
});
jest.doMock("../src/queueService.js", () => {
  return mockGenerateQueue;
});

const processPayments = require("../src/main");

describe("paymentService should call makePayment or refundPayment according to the items in the queue", () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    mockGenerateQueue.mockReset();
    mockMakePayment.mockReset();
    mockRefundPayment.mockReset();
  });

  test("should not call makePayment or refundPayment when paymentQueue is empty", () => {
    mockGenerateQueue.mockImplementationOnce(() => []);

    processPayments();

    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).not.toBeCalled();
    expect(mockRefundPayment).not.toHaveBeenCalled();
  });

  test('calls makePayment when next item in paymentQueue is positive', () => {
    // arrange
    mockGenerateQueue.mockReturnValue([1]);

    // act

    // assert
    
  });

  test("should call makePayment everytime if the queue are all non-negative items", () => {
    mockGenerateQueue.mockImplementationOnce(() => [10, 0, 20, 49, 55]);

    processPayments();

    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).toHaveBeenCalledTimes(5);
    expect(mockRefundPayment).toHaveBeenCalledTimes(0);
  });

  test("should call refundPayment everytime if the queue are all negative items", () => {
    mockGenerateQueue.mockImplementationOnce(() => [-10, -20]);

    processPayments();

    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).toHaveBeenCalledTimes(0);
    expect(mockRefundPayment).toHaveBeenCalledTimes(2);
  });

  test("should call makePayment or refundPayment accordingly if the queue contains positive and negative items", () => {
    mockGenerateQueue.mockImplementationOnce(() => [-10, -30, 0, 10, 50]);

    processPayments();

    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).toHaveBeenCalledTimes(3);
    expect(mockRefundPayment).toHaveBeenCalledTimes(2);
  });
});

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

  test("should call make payment everytime if the queue are all non-negative items", () => {
    mockGenerateQueue.mockImplementationOnce(() => [10, 0, 20, 49, 55]);
    
    processPayments();
    
    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).toHaveBeenCalledTimes(5);
    expect(mockRefundPayment).toHaveBeenCalledTimes(0);
  });
  
  test("should call refund payment everytime if the queue are all negative items", () => {
    mockGenerateQueue.mockImplementationOnce(() => [-10, -20]);

    processPayments();
    
    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).toHaveBeenCalledTimes(0);
    expect(mockRefundPayment).toHaveBeenCalledTimes(2);
  });
  
  test("should call make payment or refund payment accordingly if the queue contains positive and negative items", () => {
    mockGenerateQueue.mockImplementationOnce(() => [-10, -20, -30, 0, 1, 10, 50, 100]);
    
    processPayments();

    expect(mockGenerateQueue).toHaveBeenCalledTimes(1);
    expect(mockMakePayment).toHaveBeenCalledTimes(5);
    expect(mockRefundPayment).toHaveBeenCalledTimes(3);
  });
});

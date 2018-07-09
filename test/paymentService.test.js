const { makePayment, refundPayment } = require("../src/paymentService");

// step 1: 2 functions exported, 2 describe blocks
// step 2: no dependency, no mocking required

describe("makePayment", () => {
  it("should return a message using the argument", () => {
    const result = makePayment(10.05);
    expect(result).toBe("payment made for $10.05");
  });
});

describe("refundPayment", () => {
  it("should return a message using the argument", () => {
    const result = refundPayment(1);
    expect(result).toBe("refund made for $1");
  });
});

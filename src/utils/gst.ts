export interface GSTResult {
  originalAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  gstRate: number;
}

export const calculateGST = (
  amount: number,
  rate: number,
  isInclusive: boolean = false,
): GSTResult => {
  let gstAmount = 0;
  let totalAmount = 0;
  let originalAmount = amount;

  if (isInclusive) {
    // GST = Total - (Total / (1 + Rate%))
    originalAmount = amount / (1 + rate / 100);
    gstAmount = amount - originalAmount;
    totalAmount = amount;
  } else {
    // GST = Amount * Rate%
    gstAmount = amount * (rate / 100);
    totalAmount = amount + gstAmount;
  }

  return {
    originalAmount,
    gstAmount,
    totalAmount,
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
    gstRate: rate,
  };
};

export const gstRates = [3, 5, 12, 18, 28];

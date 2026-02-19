export interface AmortizationResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: {
    month: number;
    emi: number;
    interest: number;
    principalPaid: number;
    balance: number;
  }[];
}

/**
 * EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
 * P = Principal loan amount
 * R = Monthly interest rate
 * N = Monthly loan tenure (number of months)
 */
export const calculateEMI = (
  principal: number,
  annualRate: number,
  years: number,
) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) return principal / months;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return emi;
};

export const calculateAmortization = (
  principal: number,
  annualRate: number,
  years: number,
) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const emi = calculateEMI(principal, annualRate, years);

  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;

    schedule.push({
      month: i,
      emi,
      interest,
      principalPaid,
      balance: Math.max(0, balance),
    });
  }

  return {
    emi,
    totalPayment: emi * months,
    totalInterest: emi * months - principal,
    schedule,
  };
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
};

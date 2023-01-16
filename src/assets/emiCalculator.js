export default emiCalculate = (loanAmount, rate, years) => {
  const monthlyInterestRatio = rate / 100 / 12;
  const month = years * 12;
  var top = Math.pow(1 + monthlyInterestRatio, month);
  var sp = top / (top - 1);
  return (loanAmount * monthlyInterestRatio * sp).toFixed();
};

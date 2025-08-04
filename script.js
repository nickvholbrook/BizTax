document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const turnover = parseFloat(document.getElementById('turnover').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const expenses = parseFloat(document.getElementById('expenses').value);

    // Tax Rates and Limits
    const corporationTaxRate = 0.25;
    const personalAllowance = 12570;
    const basicRateLimit = 50270;
    const dividendAllowance = 1000;
    const dividendTaxRateHigher = 0.3375;

    // Calculate Company Profit and Corporation Tax
    const companyProfit = turnover - salary - expenses;
    const corporationTax = companyProfit * corporationTaxRate;

    // Income Tax Calculation
    const taxableIncome = salary - personalAllowance;
    let incomeTax = 0;
    if (taxableIncome <= basicRateLimit) {
        incomeTax = taxableIncome * 0.20;
    } else {
        incomeTax = (basicRateLimit - personalAllowance) * 0.20 + (taxableIncome - basicRateLimit) * 0.40;
    }

    // National Insurance Calculation
    let ni = 0;
    if (taxableIncome <= basicRateLimit) {
        ni = taxableIncome * 0.12;
    } else {
        ni = (basicRateLimit - personalAllowance) * 0.12 + (taxableIncome - basicRateLimit) * 0.02;
    }

    // Dividend Tax Calculation
    const remainingProfit = companyProfit - corporationTax;
    const taxableDividends = remainingProfit - dividendAllowance;
    let dividendTax = 0;
    if (taxableDividends > 0) {
        dividendTax = taxableDividends * dividendTaxRateHigher;
    }

    // Display Results
    document.getElementById('corporationTax').innerText = `Corporation Tax: £${corporationTax.toFixed(2)}`;
    document.getElementById('incomeTax').innerText = `Income Tax: £${incomeTax.toFixed(2)}`;
    document.getElementById('nationalInsurance').innerText = `National Insurance: £${ni.toFixed(2)}`;
    document.getElementById('dividendTax').innerText = `Dividend Tax: £${dividendTax.toFixed(2)}`;
});

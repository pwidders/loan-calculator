// Listen for submit
document.getElementById('loan-data').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';
  // display for 2 seconds before running calculate function
  setTimeout(calculateResults, 2000);

   e.preventDefault(); 
});

// Calculate Results
function calculateResults(){
  console.log('Calculating...');
  // DOM elements
  const amount = document.getElementById('amount'); 
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Display results
    document.getElementById('results').style.display = 'block';
    // Hide loading spinner
    document.getElementById('loading').style.display = 'none';
  } else {  // error handling 
    showError('Please check your numbers');
  }
}

// showError
function showError(error) {
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class to div
  errorDiv.className = 'alert alert-danger';

  // Create text node and append it to the div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading); // insertBefore method allows you to move elements before another 

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);

  // clearError function
  function clearError() {
    document.querySelector('.alert').remove();
  }
}

// ==UserScript==
// @name          ASB Full Bank Account Field Parser
// @description   Adds a field for a full bank account no, which populates the existing bank account number fields.
// @include       https://fnc.asbbank.co.nz/*/OneOffPayment/OneOffPaymentDetail.aspx
// ==/UserScript==

var updateNumbers = function(event) {
  var full = event.target.value.replace(/[^0-9]/g, "");
  
  var bank = full.substring(0, 2);
  var branch = full.substring(2, 6);
  var acct = full.substring(6, 13);
  var suffix = full.substring(13);
  
  document.getElementById("payeeAccount_accountNumber_txtBank").value = bank;
  document.getElementById("payeeAccount_accountNumber_txtBranch").value = branch;
  document.getElementById("payeeAccount_accountNumber_txtAccount").value = acct;
  document.getElementById("payeeAccount_accountNumber_txtSuffix").value = suffix;
  
}

// Get the fast cheque table -- gross
var td = document.evaluate( '/html/body/form/table[2]/tbody/tr/td[2]/table[3]/tbody/tr[2]/td/table/tbody/tr[2]/td', document, null, XPathResult.ANY_TYPE, null ).iterateNext();

var input = document.createElement("INPUT");
input.size = 41;
input.addEventListener('change', updateNumbers, true); 

var caption = document.createElement("I");
caption.innerHTML = "<BR>Paste Full Account Number Here";

td.appendChild(input);
td.appendChild(caption);
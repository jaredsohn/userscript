// ==UserScript==
// @name       Bill Pay Overview Total Amount
// @namespace  https://github.com/cmonnom/BillPayOverview
// @version    0.2
// @description  Extension to the Wells Fargo page Bill Overview 
// (https://billpay.wellsfargo.com/billpay/application/mca/Overview)
// to add the total amount entered for paying the bills.
// @match      https://billpay.wellsfargo.com/billpay/application/mca/Overview
// @copyright  2012+, Guitou
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

/* Extension to the Wells Fargo page Bill Overview 
(https://billpay.wellsfargo.com/billpay/application/mca/Overview)
to add the total amount entered for paying the bills.*/

var tot = 0;
var divTotalOpen = '<div align="center" class="total">Total: $';
var divTotalClose = '</div>';
var $continueButton;
var maxBankId;

function createTagTotal() {
    return $(divTotalOpen + tot + divTotalClose);
}

/*find the number of bank accounts*/
function numOfBankAccounts() {
    return document.getElementsByClassName("reqConfirm").length / 2;
}

/* add the total div to the web page */
function addTotalAmountToHtml() {
    $continueButton.before(createTagTotal());
}

/* go through all bank accounts and add the value of input if provided */
function total() {
    for (var i = 0; i < maxBankId; i++) {
        var temp = parseFloat($("input[name='payees[" + i + "].paymentAmount']").val());
        if (!isNaN(temp)) {
            tot += temp;
        }
    }
    $('.total').remove();
    addTotalAmountToHtml();
    tot = 0;
}

/* start the timer */
function updateTotal(){
    setInterval(function() {total();},1000); //update the total amount every second
}

jQuery(document).ready(function() {
    $continueButton = $('.overviewTableBottomBar');
    maxBankId = numOfBankAccounts();
    addTotalAmountToHtml();
    updateTotal();
});


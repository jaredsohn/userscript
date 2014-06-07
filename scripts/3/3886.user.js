// ==UserScript==
// @name           ICA-banken autofill date for transfers
// @namespace      http://henrik.nyh.se
// @description    Automatically fills out the date of the next weekday on ICA-banken transfer/payment pages, since this is not otherwise done automatically. Note that this date is usually, but not always, the next valid date.
// @include        https://icabanken.ica.se/Transfer/TransferAdd.asp*
// @include        https://icabanken.ica.se/PayTransf/Payment.asp*
// ==/UserScript==

var form = document.forms[0];
if (!form) return;

var date = form.elements.namedItem('TransfDate') || form.elements.namedItem('PaymentDate');

unsafeWindow.oldSubmitForm = unsafeWindow.submitForm;
unsafeWindow.submitForm = function(name, btnAction) {
	// Before committing transactions, empty the date field to avoid validation prompt
	if (name == "Kontakt" && btnAction == "4")  date.value = '';
	unsafeWindow.oldSubmitForm(name, btnAction);
}

if (date.value) return;

var tomorrow = new Date(new Date().getTime() + 60*60*24*1000);
var ty = tomorrow.getFullYear();
var tm = tomorrow.getMonth() + 1;
var td = tomorrow.getDate();

if (tomorrow.getDay() == 6) td += 2;  // Today is Friday
if (tomorrow.getDay() == 0) td += 1;  // Today is Saturday

var isPayment = (location.href.indexOf('Payment') != -1);  // = räkning
td += isPayment;  // Add a day if payment

date.value = ty + zeropad(tm) + zeropad(td);


function zeropad(num) {
	return num < 10 ? "0"+num : num;
}

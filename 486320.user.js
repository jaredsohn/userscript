// ==UserScript==
// @name          Turk - Transfer_Earnings_Hide_and_Alert
// @include       https://www.mturk.com/mturk/dashboard*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @description   Hides the Earnings column and changes the Total Earnings tab to green when a threshold has been met. (Modify the values manually within the script.)
// ==/UserScript==

//The variable below gets the Transfer Earnings Reward

var toTransfer = parseFloat($('#transfer_earnings .reward') .text() .substr(1) .replace(',', ''));

//The below changes the background of Total Earnings
//Change "50" to whatever you wish to be alerted to.
//"50" alerts you when "$50" is available to transfer by changing the background color.
//"#006600" refers to the color green in HEX.
//As a reminder, you must refresh the page in order for it to update.

if (toTransfer >= 50) {
	$("td.white_text_14_bold:Contains('Total Earnings')").css('background-color', '#006600');
}

// The below removes "Earnings Available" table

$(".metrics-table-first-header:Contains('Earnings Available')").parent().parent().parent().parent().remove();

// ==UserScript==
// @name           IPPractice.ca - CIPO tool
// @namespace      ippractice.ca
// @description    Allows commas in CIPO patent number search
// @version        0.1.2
// @author         Alan Macek
// @copyright      2011, Alan Macek (http://www.alanmacek.com)
// @include        http://brevets-patents.ic.gc.ca/opic-cipo/cpd/eng/search/number.html*
// ==/UserScript==

/*
Release History
2011/06/06: Version 0.1
	- initial release
2011/06/10: Version 0.1.1
	- fix bug due to multiple submit buttons
2011/07/15: Version 0.1.2
        - fix bug that blocks hitting 'return' key in Chrome
*/

//mark if we are in a click routine already
var alreadyClicked = 0;

//new submit routine
// - delete the commas
// - and submit the form
function mySubmit(n) {
 alreadyClicked = 1;
 var curNumber = document.getElementById('query').value;
 curNumber = curNumber.replace(/\,/g,"");
 document.getElementById('query').value = curNumber;
 document.getElementsByName(n)[0].click();
 if (alreadyClicked) {
  //the 'click' method didn't work - seems to be a problem with Chrome
  document.getElementById('number').submit();
  alreadyClicked = 0;   
 }
}
 
//modify the 'number' field to allow 9 digits rather than 7 digits
var html = document.body.innerHTML;
html = html.replace(/size="7" maxlength="7"/,"size='9' maxlength='9'");
document.body.innerHTML = html;
 
//add our own 'submit' functionality
document.getElementsByName('summaryAction')[0].addEventListener("click", function(e) {
 if (!alreadyClicked) {
	 e.stopPropagation();
	 e.preventDefault();
	 mySubmit('summaryAction');
 }
 alreadyClicked = 0;
 }, true);

document.getElementsByName('financialTransactionsAction')[0].addEventListener("click", function(e) {
 if (!alreadyClicked) {
	 e.stopPropagation();
	 e.preventDefault();
	 mySubmit('financialTransactionsAction');
 }
 alreadyClicked = 0;
 }, true);


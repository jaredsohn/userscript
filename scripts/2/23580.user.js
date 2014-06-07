// ==UserScript==
// @name           PayPal Instant Transfer Zapper
// @namespace      http://none
// @description    v1.1 08/21/09 Win the battle over PayPal's "instant transfer" default
// @include        https://www.paypal.com/*
// @include		   https://payments.ebay.com/*
// ==/UserScript==
//***************GUID for FF extension: 6b2a52f3-07c2-4c37-bf05-efa81b340ea1 *****************
// changed 8/22/08:: @include        https://www.paypal.com/us/cgi-bin/webscr*
/* How many times have you unwittingly been burned by PayPal's non-configurable payment default to "instant transfer"? If it hasn't happened to you yet, don't worry - it will! All it takes is being in a hurry to complete a transaction. Your guard is down and you simply forget to change their self-serving default. They have designed their site intentionally to inhibit transactions using credit cards and ensnare people into unwanted bank transfers. A bright orange button labeled "Send Money" is placed prominently near the top of the payment page, while a small ordinary link buried below must be clicked to fund payments with your credit card. Click the orange button first and it's too late... gotcha! If you find this dirty trick infuriating like I do, use this script to prevent PayPal's greedy hands from getting into your bank account instead of your Credit Card - where they actually have to earn their money! A confirmation dialog will pop up to prevent you from accidentally clicking "send money" without selectively choosing your payment source. v. 1.05 OBSOLETE: The rest of the script automates the dismissal of the final nag screen. Change GMautoClickthru to "false" to turn off the automation (default is now ON as of 09/30/08). Don't worry, the automation does not submit the payment - you can still back out after return to the main payment screen. 


Testing instructions:
It's easy to test this simple script by initiating a payment to a dummy recipient. Please note: The script does NOT submit your payment, nor is it necessary for you to press the orange "Send Money" button to test the script. You will know the script is working when the pop-up dialog comes up, asking whether you want to change your payment method. If you do not see the dialog, then the script is either not working, or PayPal has not tried to use "Instant Transfer" to fund your payment.

Version History:
v1.02 8/22/08 updated script for changes to PayPal pages
v1.03 09/30/08 added support for money requests/invoices; automated "confirmation" page
v1.04 10/04/08 added support for shopping carts
v1.041 10/20/08 PP finally removed its confirmation screen, so deleted some obsolete code. Functionally the same as 1.04
v1.042 05/13/09 removed loose variables by executing entire script within an anonymous function
*/

//utilize unique (unnamed) namespace by creating and executing the script
//within an anonymous function which uses only local vars:

(function(){ //this creates the unique, private unnamed namespace

var GMautoClickthru = true //change this to false to allow the final nag screen (but why would you?)

//establish which payment page we are on by looking for an identifier:
var GMpageTitle = document.getElementsByTagName('title');
//alert(GMpageTitle[0].innerHTML)
if (GMpageTitle[0]) GMpageTitle = GMpageTitle[0].innerHTML
else GMpageTitle = ""

//force funding options screen so they can't trick us:
// Send Money --> Regular paypal payment
// Complete Your Payment --> PayPal coming from eBay
// Review Your Payment --> money requests/invoices coming from email link
// Review your payment --> PayPal shopping cart (tested example at moderntennis.com)
if (GMpageTitle.indexOf("Send Money")>-1||GMpageTitle.indexOf("Complete Your Payment")>-1||GMpageTitle.indexOf("Review Your Payment -")>-1||GMpageTitle.indexOf("Review your payment -")>-1) {
	var GMbody = document.getElementsByTagName('body');
	// pop up tickler only if they're trying to hijack our bank account:
	if ((GMbody[0].innerHTML.indexOf("Instant Transfer :")>-1||GMbody[0].innerHTML.indexOf("Instant Transfer:")>-1) && confirm("WARNING: PayPal is set to use your bank account\nto fund this transaction.\n\nWould you like to pay by Credit Card instead?")){
		document.getElementById('myAllTextSubmitID').name='funding_select';
		document.getElementById('myAllTextSubmitID').value='Change';
		// 8/22/08 above line changed for other payment types, but below still used on money requests:
		if (GMpageTitle.indexOf("Review Your Payment -")>-1) {	
			document.getElementById('myAllTextSubmitID').value='More Funding Options';
		}
		document.getElementById('myAllTextSubmitID').form.submit();
	}
	return false;
}
// direct payment from eBay - eBay checkout (they don't even bother to mention "instant payment"!)
if (GMpageTitle.indexOf("Confirm your payment")>-1) {
	var GMbody = document.getElementsByTagName('body');
	// pop up tickler only if they're trying to hijack our bank account:
	if (GMbody[0].innerHTML.indexOf("bank account x")>-1 && confirm("WARNING: PayPal is set to use your bank account\nto fund this transaction.\n\nWould you like to pay by Credit Card instead?")){
		var GManchorTags = document.getElementsByTagName('a')
		var i
		for (i=0;i<GManchorTags.length;i++) {
			// works as of 6/12/09:
			if (GManchorTags[i].innerHTML=='More funding options'){
				document.location = GManchorTags[i].href
			}
		}
	}
	return false;
}

if (GMpageTitle.indexOf("Funding Options")>-1) {
	//allow manual changing if creditCard already checked:
	if (document.getElementById('creditCard').checked) return false
	document.getElementById('creditCard').click();
	//document.getElementById('echeck').click(); //uncomment to make echeck the default
	
	/* 09/30/08 automation disabled to ensure card selection for users w/ multiple cards or eCheck users:
	if (GMautoClickthru){
		document.getElementById('continue').click(); 
	}
	*/
	return false;
}
/*This next page I resent the most. How stupid do they think we are? And how offensive to waste our time clicking through another page with this unpersuasive load of BS:

Before changing your funding source to a credit card, consider the benefits of paying with your bank account:

    * No finance charges or bills to pay
    * We keep your bank account details private
	
At least they don't try to bribe us any more with their insulting $1,000 sweepstakes....
*/

//10/20/2008 v.1.041 PP finally dropped this ridiculous confirmation page
//so this is now obsolete but will leave in in case PP resurrects this page:

if (GMpageTitle.indexOf("Confirm your payment method")>-1) {

	function GMclickYes() {
		var GMinputs = document.getElementsByTagName('input')
		for (i=0;i<GMinputs.length;i++){
			if (GMinputs[i].name == "_funding-select-submit"){
				GMinputs[i].click()
			}
		}
	}
	if (GMautoClickthru){
		//note: setTimeout was used only so we can see our "realtruth" filler
		//it does not add wait time since it is set to 0
		window.setTimeout(GMclickYes, 0);
	}
	return false;
}

})(); // the () causes immediate execution of the containing anonymous function
// see http://jeffreysambells.com/posts/2006/11/22/play-nice-with-others-javascript-namespace/

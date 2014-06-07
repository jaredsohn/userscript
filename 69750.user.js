// ==UserScript==
// @name           Paypal Pay By Credit Card
// @namespace      http://userscripts.org/scripts/show/69750
// @description    Automatically change paypal payment from default of "Instant Transfer" to credit card.
// @include        https://www.paypal.com/*
// @include        http*://payments.ebay.*
// @version        1.00
// ==/UserScript==

/*global GM_getValue,GM_log,GM_registerMenuCommand,GM_setValue,document,unsafeWindow*/

function shouldAutoGotoPaymentOptionsPage() {
	return GM_getValue("AUTO_GOTO_PAYMENT_OPTIONS_PAGE", true);
}

function setShouldAutoGotoPaymentOptionsPage(val) {
	GM_setValue("AUTO_GOTO_PAYMENT_OPTIONS_PAGE", val);
}

function shouldAutoSubmitPaymentOptionsPage() {
	return GM_getValue("AUTO_SUBMIT_PAYMENT_OPTIONS_PAGE", true);
}

function setShouldAutoSubmitPaymentOptionsPage(val) {
	GM_setValue("AUTO_SUBMIT_PAYMENT_OPTIONS_PAGE", val);
}

var GM_LOG = function(message) {
	if (unsafeWindow.console && unsafeWindow.console.log && unsafeWindow.console.log.call) {
		unsafeWindow.console.log(message);
	} else if (GM_log && GM_log.call) {
		GM_log(message);
	}
};

function stringContains(input, toSearch) {
  return input.indexOf(toSearch) >= 0;
}

function registerStyles() {
	GM_addStyle(
		"div.GM_AutoWorking {" +
			"background-color: rgba(25%, 25%, 25%, 0.9);" +
			"position: fixed;" +
			"width: 100%;" +
			"height: 100%;" +
			"top: 0px;" + 
			"left: 0px;" +
			"z-index: 100;" +
			"display: table;" + 
			"font-size: 32px;" + 
		"}" + 
		"div.GM_AutoWorking > * {" + 
			"display: table-cell;" +
			"vertical-align: middle;" + 
			"text-align:center;" +
		"}" +
		"div.GM_AutoWorking > * > *{" + 
			"background-color: white;" + 
			"-moz-border-radius: 8px;" +
			"padding: 10px;" + 
		"}");
}

/** 
 * Overlays the entire screen with a slightly transparent div that makes the document 
 * look "disabled", with the text argument prominently displayed in the middle.
 */
function showAutoWorkingOnScreen(text) {	
	var div = document.createElement("div");
	div.setAttribute("class", "GM_AutoWorking");
	div.innerHTML = "<div><span>" + text + "</span></div>";
	document.body.appendChild(div);
}

function showConfigOptions(html) {
	var div = document.createElement("div");
	div.setAttribute("class", "GM_AutoWorking");
	div.innerHTML = "<div><div><div>" + html + "</div></div></div>";
	document.body.appendChild(div);
}

function isPayingWithCC() {
	var bodyText = document.getElementsByTagName('body')[0].innerHTML.toLowerCase();
	// This occurs in the html as 
	bodyText = bodyText.replace("transaction fees details and adding bank account", "");
	var hasBankAccount = stringContains(bodyText, "bank account") || stringContains(bodyText, "instant");
	var hasCC = stringContains(bodyText, "from visa") || stringContains(bodyText, "credit/debit card : visa");
	GM_LOG("Using bank: " + hasBankAccount + ", CC: " + hasCC);
	return !hasBankAccount && hasCC;
}

function disableFormSubmitWhenCCNotSelected() {
	GM_LOG("Installing submit form disabler function");
	
	var submitListener = function(e) {
		try {
			var target = e ? e.target : this;
			//GM_LOG('interceptor: target = <' + target + '>');

			var frm;
			// target could be an INPUT element
			if (target.tagName.toLowerCase() == 'input') {
				frm = target.form;
			} else {
				frm = target;
			}
			if (!frm || !frm.tagName || frm.tagName.toLowerCase() != 'form') {
				GM_LOG('interceptor: found <' + frm + (frm.tagName ? '(' + frm.tagName + ')' : '') + '> instead of form; investigate further!!!');
			}

			if (!isPayingWithCC()) {
				return false;
			} else {
				GM_LOG("Credit card or echeck selected.  Preparing to submit form.");
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	};

	//HTMLFormElement.prototype.realSubmit = HTMLFormElement.prototype.submit;
	//HTMLFormElement.prototype.submit = submitInterceptor;
	
	
	// define our 'submit' handler on window, to avoid defining
	// on individual forms
	window.addEventListener('submit', 
		function(e) {
			var stopSubmit = submitListener(e);
			if (!stopSubmit) {
				e.preventDefault();
			}
			return stopSubmit;
		}, 
		false);
}

function autoGotoPaymentOptionsPageOnEbay() {
	if (shouldAutoGotoPaymentOptionsPage() && !isPayingWithCC()) {
		GM_LOG("Auto goto payment option page: ebay");
		showAutoWorkingOnScreen("Going to payment select screen ...");
		document.location = document.getElementById("moreoptionslink0").href;
	}
}

function autoGotoPaymentOptionsPageOnPaypal() {
	if (shouldAutoGotoPaymentOptionsPage() && !isPayingWithCC()) {
		GM_LOG("Auto goto payment option page: paypal");
		showAutoWorkingOnScreen("Going to payment select screen ...");
		document.getElementById('myAllTextSubmitID').name = 'funding_select';
		document.getElementById('myAllTextSubmitID').value = 'funding_select';
		document.getElementById('myAllTextSubmitID').form.submit();
	}
}

function autoGotoPaymentOptionsPageOnPaypal2() {
	if (shouldAutoGotoPaymentOptionsPage() && !isPayingWithCC()) {
		GM_LOG("Auto goto payment option page: paypal2");
		showAutoWorkingOnScreen("Going to payment select screen ...");
		document.getElementById('myAllTextSubmitID').name = 'funding_select';
		document.getElementById('myAllTextSubmitID').value = 'funding_select';
		document.getElementById('myAllTextSubmitID').form.submit();
	}
}

function autoSelectAndSubmitCCPage() {
	if (shouldAutoSubmitPaymentOptionsPage()) { 
		GM_LOG("Auto selecting CC");
		showAutoWorkingOnScreen("Selecting credit card ...");
		var ccInput = document.getElementById('creditCard');
		ccInput.checked = true;
		
		var form = document.forms.namedItem('fundingOptions');
		// Add value indicating "continue" button was pressed
		form.action = form.action + "&Continue=Continue";
		form.submit();
	}
}

/** Registers greasemonkey menu items that toggle the automatic features of the script */
function registerConfigSettings() {
	var autoGoto = shouldAutoGotoPaymentOptionsPage();
	GM_registerMenuCommand(autoGoto ? "Disable auto-goto payment options page" : "Enable auto-goto payment options page",
		function() {
			setShouldAutoGotoPaymentOptionsPage(!autoGoto);
		});
		
	
	var autoSubmit = shouldAutoSubmitPaymentOptionsPage();
	GM_registerMenuCommand(autoSubmit ? "Disable auto-submit payment options page" : "Enable auto-submit payment options page",
			function() {
				setShouldAutoSubmitPaymentOptionsPage(!autoSubmit);
		});
}

function checkIfReadyForPayment() {
        GM_LOG("Checking for payment");
	if (document.getElementById("funding_select") || document.getElementsByClassName("scTrack:MF:EC:Review:Payment:Change").length) {
		GM_LOG("Detected funding select");
		autoGotoPaymentOptionsPageOnPaypal2();
		disableFormSubmitWhenCCNotSelected();
	}
	if (!isPayingWithCC()) {
		GM_LOG("Scheduling next check for 250 ms");
		setTimeout(checkIfReadyForPayment, 250);
	}
}

function determinePageAndExecute() {
	// Ebay payment process
	var sourceUrl = document.URL;
	if (sourceUrl.match(/payments.ebay.*CompleteCheckout/i)) {
		registerStyles();	
		if (document.getElementById("moreoptionslink0")) {
			disableFormSubmitWhenCCNotSelected();
			autoGotoPaymentOptionsPageOnEbay();
		} else {
			GM_LOG("No change payment option link detected");
		}
	}
	
	// element payment process
	var title = document.title;
	var bodyText = document.getElementsByTagName('body')[0].innerHTML.toLowerCase();
	if (sourceUrl.match(/https:\/\/www.paypal.com/i) && 
		((title.match(/Send/i) && title.match(/Money/i) && stringContains(bodyText, "review")) ||
		(title.match(/Review/i) && title.match(/Payment/i)) || 
		(title.match(/Complete Your Payment/i)) // Auctiva
		)) {
		registerStyles();
		disableFormSubmitWhenCCNotSelected();
		autoGotoPaymentOptionsPageOnPaypal();
	}
	
	if (sourceUrl.match(/https:\/\/www.paypal.com/i) && title.match(/Funding/i) && title.match(/Options/i)) {
		registerStyles();
		autoSelectAndSubmitCCPage();
	}
	// Handle new form.  Ajaxy, so just scan the page every few seconds to see if we've hit anything.
	if (sourceUrl.match(/https:\/\/www.paypal.com/i)) {
		setTimeout(checkIfReadyForPayment, 250);
	}
}

GM_LOG("Running Paypal Instant Transfer Defeater Script");
registerConfigSettings();
determinePageAndExecute();

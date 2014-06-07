// ==UserScript==
// @name           Google Voice SMS Signature
// @namespace      http://userscripts.org/users/266001
// @description    Adds signature to Google Voice SMS messages sent from web interface
// @include        https://www.google.com/voice*
// ==/UserScript==

var sig = " Insert Sig Here.";

var xhrMod = function(signature) {
	// Adds signature to the SMS message if an SMS message was intercepted.
	var addSig = function(data) {
		
		// Test to see that it's a POST request (GET sends null data) and has a text parameter (SMS messages have one).
		if (data && data.indexOf("&text=") != -1) {
			// Replace the message in the data string with the signature appended to the message.
			var t = data.substring(data.indexOf("&text="), data.indexOf("&", data.indexOf("&text=") + 6));
			return data.replace(t, t + encodeURIComponent(signature)); }
		else {
			return false; } }
	
	// Variable to store the URL so the modified send function can access it.
	XMLHttpRequest.prototype.u = "";
	
	(function(send) {
		XMLHttpRequest.prototype.send = function(data) {
			// Tries to add the signature to the data string.
			var newdata = addSig(data);
			
			// Call the actual send function with the modified message if we're sending an SMS
			// message (check that it's the right URL and that a signature was successfully appended).
			if (newdata !== false && this.u.indexOf("sms") != -1) {
				send.call(this, newdata); }
			else {
				send.call(this, data); } }; }(XMLHttpRequest.prototype.send));
			
	(function(open) {
		XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
			// Modified to store the URL so send can access it.
			this.u = url;
			open.call(this, method, url, async, user, password); }; }(XMLHttpRequest.prototype.open)); };

// Inject the script in the page and quickly remove it to clean up
var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.textContent = "(" + xhrMod + "(\"" + sig + "\"));";
document.body.appendChild(inject);
document.body.removeChild(inject);
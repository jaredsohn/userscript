// ==UserScript==
// @name          Show the Keypad on ING Direct
// @namespace     http://spig.net/userscripts/
// @description   Toggles the keyboard pinpad on ING Direct when logging in
// @date          2008-12-19
// @include       https://secure.ingdirect.com/myaccount/INGDirect.html?command=displayCustomerAuthenticate&fill=&userType=Client
// @GM_version    0.8.20080609.0
// @version       0.1.0
// ==/UserScript==

var body, script;
body = document.getElementsByTagName('body')[0];
if (!body) { return; }
script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = "togglePinPad('key');";
body.appendChild(script);

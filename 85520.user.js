// ==UserScript==
// @name           OwaChkBasic
// @namespace      OWAchkBasic
// @description    Checks the checkbox for light OWA (2010)
// @include        https://*/owa/auth/logon.aspx*
// ==/UserScript==

var chkbsc = document.getElementById('chkBsc');
if (chkbsc) {
	var chkbscUnder = chkbsc.wrappedJSObject || chkbsc;
	chkbscUnder.checked = true;

	// Create an onClick event
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);

	// ... and clicking!
	chkbscUnder.dispatchEvent(evt); 

}
// ==UserScript==
// @name        Starbucks Austria WiFi
// @namespace   at.edwardd
// @description Automatically logs into Starbucks Austria free WiFi (mpp.tpn.ch) after you have registered once.
// @include     http://www.mpp.tpn.ch/starbucks*
// @version     1
// @grant       none
// ==/UserScript==

function isready() {
	//alert(document.getElementById("aConnect"));
	if(!document.getElementById("aConnect"))
		window.setTimeout(isready, 200);
	else
		doconnect();
}

function doconnect() {
	var agree1 = document.getElementById("chkAgree1");
	var agree2 = document.getElementById("chkAgree2");
	var frm = document.getElementById("frmConnect");

	// check the "I have read..." checkboxes
	agree1.checked = true;
	agree2.checked = true;

	// submit the form
	connect();
}

isready();
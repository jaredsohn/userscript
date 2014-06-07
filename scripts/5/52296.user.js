// ==UserScript==
// @author		  zqqou
// @name          Travian Signature for Messages
// @namespace     http://userscripts.org/
// @description   This script creates automatically signature to your messages.
// @include       http://*.travian.*/nachrichten.php
// @version		  0.3
// ==/UserScript==

// EDIT THIS:
var sig = "AxerpipZ"

var igm = document.getElementById('igm');
if (igm) {
	igm.innerHTML = "\n\n----\n"+sig + igm.innerHTML;
}
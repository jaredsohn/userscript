// ==UserScript==
// @author		  Mikal KD
// @name          NoFear
// @namespace     http://userscripts.org/
// @description   This script creates automatically signature to your messages.
// @include       http://*.travian.*/nachrichten.php
// @include       http://*.travian*.*/nachrichten.php?t=1
// @include       http://*.travian*.*/nachrichten.php?t=1&id=*
// @version		  0.5
// ==/UserScript==

// EDIT THIS:
var sig = "Luretryne"

var igm = document.getElementById('igm');
if (igm) {
	igm.innerHTML = "\n\n----\n"+sig + igm.innerHTML;
}
// ==UserScript==
// @name          Travian Message Buttons
// @namespace     TravianReportButtons
// @description   report/message delete/archive buttons stay on the same page
// @include       http://*.travian.*/berichte.php?s=*&o=0
// @include       http://*.travian.*/nachrichten.php?s=*&o=0
// ==/UserScript==

var table = document.getElementById('overview');
if (table) {
	var form = table.parentNode;
	if (form) {
		form.setAttribute('action', window.location.href);
	}
}

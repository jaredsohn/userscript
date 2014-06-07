// ==UserScript==
// @name           Cancel Javascript Alerts
// @author         alkenrinnstet
// @description    Replace javascript alerts with confirm dialogues; click cancel to stop script
// @include        *
// ==/UserScript==

unsafeWindow.alert = function alert(message) {
	if (!alert.block) {
		alert.block = !confirm(message);
	}
}
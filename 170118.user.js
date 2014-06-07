// ==UserScript==
// @name        Soha Tratu Q&A Auto Japanese
// @namespace   n/a
// @description Auto-select Japanese Q&A at tratu.soha.vn
// @downloadURL https://userscripts.org/scripts/source/170118.user.js
// @updateURL   https://userscripts.org/scripts/source/170118.meta.js
// @match       http://tratu.soha.vn/dict/*
// @match       http://tratu.soha.vn/index.php?*
// @version     1.3
// @grant       none
// ==/UserScript==

try {
	var JFlag = document.getElementById("jpflag"); // Specify the element
	var MEvt = document.createEvent("MouseEvents"); // Mouse event
	MEvt.initEvent( "click", false, true ); // Event detail
	JFlag.dispatchEvent( MEvt ); // Force to generate the event
} catch (e) {
//    console.log(e.source + " - " + e.message);
}

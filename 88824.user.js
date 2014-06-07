// ==UserScript==
// @name        freshbase
// @namespace   http://basecamphq.com
// @description Refreshes basecamp after 60 sec of no mouse or keyboard interaction
// @include     *
// @author      Wietse Hage
// ==/UserScript==

(function () {
	var interval; startTimer();
	function startTimer() {	interval=setInterval(function(){ location.reload(); }, 60000); }
	function resetTimer() { clearInterval(interval); startTimer(); }
	document.onmousemove = function(){ resetTimer(); };
	document.onkeypress = function(){ resetTimer(); };
})();
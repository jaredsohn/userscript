// ==UserScript==
// @name           BPTrade in new Window
// @namespace      http://unidomcorp.com
// @description    Make "Trade" blueprint open in a popunder
// @include        http://*.war-facts.com/blueprints.php*
// ==/UserScript==
/* BPTrade in new Window   by William Frye (aka Carabas)   For Warring Factions (http://war-facts.com/)   =========================================================   This script is provided "AS-IS" with no warranties    whatsoever, expressed or implied. USE AT YOUR OWN RISK.   =========================================================
*/
unsafeWindow.poptrade = function(url) {
	var winfeatures="width=800,height=510,scrollbars=1,resizable=1,toolbar=0,location=0,menubar=0,status=1,directories=0"	trade=window.open(url,"",winfeatures)
	trade.blur()
	window.focus()
}
var inputs = document.getElementsByTagName('input');for (var i = 0;i < inputs.length;i++) {	if (inputs[i].value == "Trade") {		var j = inputs[i].getAttribute("onclick");		inputs[i].setAttribute("onclick","poptrade("+j.substr(16,j.length-17)+");");	}}
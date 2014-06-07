// ==UserScript==
// @name           Battledome Plot Refresher
// @namespace      archonz.com
// @description    This refreshes on my page to tell you when there are more challengers. 
// @include        *archonz.com/bd.php
// ==/UserScript==

var waitTime = 10000;
var waitTimeAfterNewWave = 120000;

var strHTML = document.body.innerHTML;
if(strHTML == "on"){
	alert("A new wave has entered!");
	window.setTimeout(function(){window.location.reload() ;},waitTimeAfterNewWave) ;

} else { window.setTimeout(function(){window.location.reload() ;},waitTime) ;}return;
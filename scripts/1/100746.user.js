// ==UserScript==
// @name           NY Times Paywall Remover
// @description    Removes the NY Times pay wall.
// @namespace      http://www.aintaer.com/Projects
// @include        http*://nytimes.com/*
// @include        http*://*.nytimes.com/*
// @version        1.2
// @run-at         document-start
// @grant          unsafeWindow
// @grant          GM_log
// ==/UserScript==
var caughtEvents = ["load","onload","keydown"];

function findElem(id) {
	return document.getElementById(id);
}

function removeEl(el) {
	el.parentNode.style.display="none";
	GM_log("Overlay hidden");
}

function wait(check, callback){
  if (check()) callback()
  else window.setTimeout(wait, 70, check, callback);
}

function snipe(id) {
	wait(
		function() {return findElem(id)},
		function() {removeEl(findElem(id))}
	);
}
function removeHash() {
    window.location.replace(window.location.href.replace(/(\?|&)gwh=([^&]+)/, ''));
} 

// Hide the overlays and allow scrolling.
if (window.location.search.indexOf("gwh=")>-1) {
	snipe('gatewayCreative');
	removeHash();
}

// Tricking mtr.js to believe it's looking at an error page
function errPST() {
  var pst = document.getElementsByName("PST")[0];
  if (pst) pst.content = 'error';
}
errPST();
addEventListener('DOMNodeInserted', function(e) {
  errPST();
});

addEventListener('DOMContentLoaded', function(){
    // Try to prevent loading of gwy.js
    (unsafeWindow.NYTD || NYTD).Hosts.jsHost="//xxx.nytimes.com";
}, false);

// Prevent NYT from listening to certain events, see caughtEvents
var delayedEventListener = unsafeWindow.addEventListener;
unsafeWindow.addEventListener = function(ev,func,bubble) {
	var found = false;
	for (var i=caughtEvents.length-1;i>=0;--i)
		found |= (caughtEvents[i]==ev);
	if (found) GM_log("Blocked "+ev);
	else delayedEventListener(ev,func,bubble);
};
// Steal the generated callback function to do nothing
delayedEventListener("load",function() {
	var callbackRE = new RegExp("^\\w"+
		String((new Date()).getTime()).slice(0,-5));
	for (var i in unsafeWindow) {
		if (callbackRE.test(i)) {
		  GM_log('Found callback: '+i);
		  unsafeWindow[i] = function(){};
		}
	}
},false);

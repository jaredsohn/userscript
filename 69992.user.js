// ==UserScript==
// @name          Brazzers TrailerSurpass
// @namespace     http://www.brazzers.com
// @description   (v0.1)
// @include       http://www.brazzers.com/tour3/index.php?action=scene&tab=trailer&id=*
// ==/UserScript==

// jQuery code provided from http://joanpiedra.com/jquery/greasemonkey/
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var autodown = GM_getValue("autodown");
if( autodown == undefined ) {
    autodown = false;
    GM_setValue("autodown", autodown);
}

unsafeWindow.onunload = function(){
    GM_setValue("autodown", autodown);
}

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined' || autodown == undefined) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        main();
    }
}

GM_wait();

function main() {
	var A=window.location;
	var B=A.split("&");
	var C=B[0]+"&tab=hdpics&"+B[2];
	window.location.href=C;
}
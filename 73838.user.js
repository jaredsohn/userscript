// ==UserScript==
// @name           AutoIt-mini
// @namespace      autoit.de
// @description    minimize
// @include        http://autoit.de/index.php*
// @include        https://autoit.de/index.php*
// @include        http://www.autoit.de/index.php*
// @include        https://www.autoit.de/index.php*
// ==/UserScript==


// see http://joanpiedra.com/jquery/greasemonkey/
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    $("div[class=userAvatar]").css('display', 'none');
    $("div[class=userMessenger]").css('display', 'none');
    $("div[class=userCredits]").css('display', 'none');
    $("div[class=signature]").css('display', 'none');
	$("div[class=contentFooter]").next().css('display', 'none').next().css('display', 'none').next().css('display', 'none'); // Zeug unter dem Post
    $("div[id=logo]").css('display', 'none'); // Logo oben
    $("div[id=leftboxcontent]").css('display', 'none'); // Seitenleiste 3x
    $("div[id=secondSplit]").css('width', '100%').css('margin-left', '0px');
    $("div[class=secondSplit]").css('width', '100%').css('margin-left', '0px');
}
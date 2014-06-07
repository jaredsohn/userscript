// ==UserScript==
// @name           Install Anyways
// @namespace      http://www.dudeami.com/
// @description    Used with Nightly Tester Tools, allows you to install addons that are not "OK'ed" for your version.
// @include        https://addons.mozilla.org/en-US/firefox/addon/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
function GM_wait() {if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }} GM_wait();
function letsJQuery() {

// Code below here!!!
var theId = $('.install-container:first').attr('id');
theId = theId.substring(8);
if ($('#orig-' + theId + ':visible').size() == 0) {
	$('<div style="font-size: 10px; margin-bottom: 10px;"><strong>Note:</strong> This addon is not compatable with your firefox version. Install Anyways will let you install it though.</div>').insertBefore('#orig-' + theId);
}
$('#orig-' + theId).css('display', 'block');
$('#install-' + theId).css('display', 'none');
// Keep the bracket under this...
}
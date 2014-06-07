// ==UserScript==
// @name           Select All
// @namespace      Outlook Web Access
// @description    Adds button to select all messages
// @include        *?Cmd=contents*
// ==/UserScript==

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

function getToolbar(){
	return $(".trToolbar tbody tr td[width='100%']")
}
function getToolBarDivider(){
	return $(".trToolbar tbody tr td img[src*='div.gif']").eq(0).parent()
}
function appendToolbar(content) {
	getToolbar().before(content);
}
function appendToolbarButton(id, name) {
	appendToolbar('<td width="1%" valign="middle" nowrap="" align="left"><a id="'+id+'" style="cursor:pointer"><nobr><font size="2"> '+name+'</font></nobr></a></td>');
}
function appendToolbarDivider() {
	appendToolbar(getToolBarDivider().clone())
}

function buildSelectAll() {
	appendToolbarButton("CmdSelectAll", "Select All")

	$("#CmdSelectAll").click(function() {
	     $(".List input[type='checkbox']").each(function() {
			this.checked = true;
	     });
	});
}

function buildToolbar() {
	appendToolbarDivider();
	buildSelectAll();
}

// All your GM code must be inside this function
function letsJQuery() {
	buildToolbar();
}
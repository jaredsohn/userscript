// ==UserScript==
// @name           Itslearning talk list enhancement, show course name
// @namespace      itslearning.com*
// @description    Adds more information to the sucky task list display, such as what course the task is from
// @include        https://www.itslearning.com/main/mainmenu.aspx
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

function letsJQuery() {
	// putt jquery her
	//$(".task-title").hide();
	//$("table#ctl43_ctl07_activities").hide();
	//$("div.task-list-table").hide();
	$("div.task-list-table").css("background","#ffeedd");
	
	$("div.tast-list-table,td.task-title a").each(function() {
		$(this).text($(this).attr('title').split(' - ')[0]);
	});
}
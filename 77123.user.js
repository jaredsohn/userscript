// ==UserScript==
// @name           Jira Column Hider
// @namespace      http://thedeanda.com
// @description    Add buttons to toggle jira search column in results page and hide the column when page loads
// @include        */IssueNavigator.jspa*
// @version        0.9
// @copyright      2011+, Miguel De Anda
// @unwrap
// ==/UserScript==

// Add jQuery
(function(){
	var GM_JQ;
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	waitForJquery();
})();

// Check if jQuery's loaded
function waitForJquery() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(waitForJquery, 100);
	} else {
		JiraColumnHider();
	}
}

function JiraColumnHider() {
	var $ = unsafeWindow.jQuery;
	$(document).ready(function() {
		var menu = $("#filterFormHeader");
		if (menu!=null) {
			var newItem = $('<li></li>');
			var button = $('<a></a>');
			var content = $('<strong></strong>');
			menu.append(newItem);
			newItem.append(button);
			button.attr("class", "item");
			button.append(content);
			content.append(document.createTextNode("Hide"));
			button.attr("title", "Hide Column");
			button.click(function() {
				$("td.filterSummaryCell").hide();
			});
		}

		// add the show link
		var div = document.getElementById("main-nav");
		if (div) {
			var newLi = $('<li></li>');
			var newA = $('<a></a>');
			$(div).append(newLi);
			newLi.attr("class", "aui-dd-parent nonlazy");
			newA.attr("class", "lnk");
			newA.text("Show Column");
			newA.click(function() {
				$("td.filterSummaryCell").show();
			});
			newLi.append(newA);
		}

		$("td.filterSummaryCell").hide();
	});
}



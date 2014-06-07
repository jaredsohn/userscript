// ==UserScript==
// @name           Show Attachments, JIRA!
// @namespace      http://www.outshine.com/
// @description    Tired of missing attachments you were supposed to act on?  Any items hidden behind the "eye" icon are fetched for display with the issue summary.
// @include        *//jira.*/browse/*
// @version        1.0.0
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2011-11-02.
Updated on 2011-11-02.
*/

var attachmentModule = document.getElementById('attachmentmodule');

if (attachmentModule) {
	var attachmentList = document.evaluate(
		"div[@class='mod-content']",
		attachmentModule,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;

	var h = attachmentList.getElementsByTagName('*');

	if (h.length == 0) {
		// attachment list empty, fetch whatever is on the attachments page
		var attachmentURL = document.getElementById('manageattachments').getAttribute("href");
		if (attachmentURL) {
			GM_xmlhttpRequest({
				method: "GET",
				url: attachmentURL,
				onload: function(response) {
					var regex = new RegExp('<table class="typeA"(.|\n|\r)+</table>', 'mi');
					var attachmentTable = regex.exec(response.responseText);
					attachmentList.innerHTML = attachmentTable;
				}
			});
		}
	}
}

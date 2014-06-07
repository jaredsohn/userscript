// ==UserScript==
// @name           MySpace "Comment Back"
// @version        1.1
// @author         EnigmatiK
// @namespace      http://theme.freehostia.com/greasemonkey/mscommentback/
// @description    Shows the original message when clicking on "Comment Back" links.
// @include        http://*.myspace.com/*
// ==/UserScript==

var x = window.location.search.match('&comment=.+');
if (x) {
	var textarea = document.getElementById('ctl00_cpMain_UserWriteCommentsControl_commentTextBox');
	if (textarea) {
		var row = textarea.parentNode.parentNode;
		if (row) {
			var new_row = document.createElement('tr');
			var col1 = document.createElement('td');
			var col2 = document.createElement('td');
			col1.innerHTML = '<td width="15%">Original:</td>';
			col2.innerHTML = '<td width="85%">' + unescape(x.toString().substr(9)).replace(/\n/g, '<br>') + '</td>';
			new_row.insertBefore(col1, null);
			new_row.insertBefore(col2, null);
			row.parentNode.insertBefore(new_row, row);
			//
			var table = row.parentNode;
			if (table) table.innerHTML = table.innerHTML.replace('Post A Comment About', 'Reply to');
		}
	}
} else if (document.getElementById('commentBack')) {
	var commentPage = (window.location.toString().match(/user.viewComments/i) != null);
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		if (links[i].id == 'commentBack') {
			var text =
				(commentPage)
					? links[i].parentNode.parentNode.parentNode.getElementsByTagName('span')[0].innerHTML
					: links[i].parentNode.parentNode.innerHTML.split('\n')[14].substr(36);
			links[i].href += '&comment=' + encodeURIComponent(text.replace(/<br(.*?)>/g, '\n'));
		}
	}
}

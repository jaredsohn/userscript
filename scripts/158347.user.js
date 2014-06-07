// ==UserScript==
// @name			GTS fix
// @namespace		http://www.nsn.com
// @description		Make GTS better
// @require			http://code.jquery.com/jquery-1.9.0.min.js
// @match			http://diiba.netact.noklab.net/*
// @downloadURL		http://userscripts.org/scripts/source/158347.user.js
// @updateURL		http://userscripts.org/scripts/source/158347.user.js
// @version			1.4
// ==/UserScript==

function addDownloadLink() {
	var link = this.innerHTML.substr(5);
	var resultList;
	var catalogLink, reportLink, br;

	resultList = [ $('<a>', {
		text : link,
		title : 'Download directory',
		href : link,
	}), $('<br>'), $('<a>', {
		text : link + 'log.html',
		title : 'Download directory',
		href : link + 'log.html',
	}) ];
	return resultList;
}
$(document).ready(function() {
	$('.info').children('p:contains(log)').replaceWith(addDownloadLink);
});

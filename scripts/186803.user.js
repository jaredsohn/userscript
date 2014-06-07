// ==UserScript==
// @name			Trac List with Keyword Links
// @description		show keyword links in trac ticket lists
// @author			Sven-Steffen Arndt
// @include			http://trac.*/query*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version			1.0.1
// ==/UserScript==

function getKeywordLinks(keywords) {
	var result = '';
	$.each(keywords, function(key,value) {
		var keyword = $.trim(value);
		var url = '/query?status=!closed&keywords=~'+keyword;
		var keywordLink = '<a href="'+url+'">'+keyword+'</a>';
		result = result + ' ' + keywordLink;
	});
	return result;
}

$(".listing tbody td.keywords").each(function (index) {
	var tdContent = $.trim($(this).html());
	var keywords = tdContent.split(/,| /g);
	$(this).html(getKeywordLinks(keywords));
});

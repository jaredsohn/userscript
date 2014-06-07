// ==UserScript==
// @name           Torrent AV DLHelper
// @namespace      http://userscripts.org/scripts/show/114183
// @include        http://torrent0av.blog.fc2.com/blog-entry*
// @include        http://torrent0av.blog.fc2.com/
// @include        http://torrent0av.blog.fc2.com/page*.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

// core parser for download url
function parse(resp) {
	var reg = new RegExp('http[^\']*');
	var emList = $('.dl > em', $(resp));
	var output = '';
	for (var cnt = 0; cnt < emList.length; cnt++) {
		var ele = emList[cnt];
		var url = ele.getAttribute('onclick').match(reg);
		
		output = output + '<li><a target=\'_blank\' href=\'' + url + '\'>' + url + '</a></li>';
	}
	
	return output;
}
// parser for entry page
function parseEntryPage() {
	var output = parse($(document));
	$('header > h1').append('<ul>'+output+'</ul>');
}

// parser for listpage
function parseListPage() {
	
	HEADER = null;

	$.each($('article > section > header > h1'),
		function () {
			var aTag = $('a', $(this));
			var linkUrl = aTag.attr('href');

			// Global Variable for CallBack
			// not ASYNC, so need not be Array
			HEADER = $(this);

			$.ajax({
				async: false,
				type: 'GET',
				timeout: 60000,
				url: linkUrl, 
				success: function(resp) {
					HEADER.append('<ul>'+parse(resp)+'</ul>');
				},
			});
		}
	);
}

// url handling
if (window.location.toString().indexOf('entry') >= 0) {
	parseEntryPage();
}else{
	parseListPage();
}	

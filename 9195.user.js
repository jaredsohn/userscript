// ==UserScript==
// @name           Google Bookmarks
// @namespace      http://nothingoutoftheordinary.com
// @description    Hit Pause/Break, and the site will be bookmarked via Google Bookmarks
// @include        *
// ==/UserScript==


function bookmark(location,title) {
	var geturl = 'http://www.google.com/bookmarks/mark';
	var postdata = 'q='+encodeURIComponent(location)+'&title='+encodeURIComponent(title)+'&labels=';
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: geturl,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey - Google Bookmarker - http://nothingoutoftheordinary.com/?s=bookmark',
			'Accept': 'text/xml,text/html',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: postdata,
		onload: function (responseDetails) {return true; }
	});
}


document.addEventListener('keypress', function (event) {	
	if(event.keyCode == 19) {
		bookmark(location.href,document.title);
		event.stopPropagation();
		event.preventDefault();
	}
}, true);
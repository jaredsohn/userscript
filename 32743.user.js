//
// ==UserScript==
// @name          UrlCash Filter
// @description   Removes wrapper pages on urlcash links.
// @include       *
// ==/UserScript==

var re = new RegExp('(http://[a-z0-9\-]*\.(urlcash\.net|usercash.com))', "i");
var rt = new RegExp('<title>([^<]*)</title>', "i");

function clickHandler(event) {
	var url = event.currentTarget.getAttribute('href');
	GM_xmlhttpRequest({method: 'GET', url: url, onload: function(response){
		var t = response.responseText;
		var m = rt.exec(t);
		if (m != null) GM_openInTab(m[1]);
	}});
	event.preventDefault();
}

var links = document.getElementsByTagName('a');
for (var i=0; i<links.length; i++) {	
	var href = links[i].getAttribute('href');
	var m = re.exec(href);
	if (m != null) links[i].addEventListener('click', clickHandler, false);
}

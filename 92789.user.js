// ==UserScript==
// @name           Extract yahoo results
// @namespace      Yahoo
// @description    Extract Results from Yahoo Results Page
// @include        http://search.yahoo.com/*
// @include        http://uk.search.yahoo.com/*
// ==/UserScript==

var results = document.getElementById('web');

var listItems = results.getElementsByTagName('li');

var href = "";
div = '<div width="100%">';
for ( var i=0, len=listItems.length; i<len; ++i ){

	var url = listItems[i].getElementsByTagName('a')[0].href;

	//filter out the "sub" results that appear beneath a site
	if (url.search("rds.yahoo.com") == -1 ){
		href = url + "<br />";
		div += href;
	}
}
div += '</div>';

document.getElementById('web').innerHTML += div;

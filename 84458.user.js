// ==UserScript==
// @name	wikiWatch
// @namespace	http://diveintogreasemonkey.org/download/
// @description hello world
// @include 	http://*.wikipedia.org/*
// ==/UserScript==

var url = 'http://kyletns.com/wikiwatch/logWikiView.php?url=' 
         + escape(decodeURI(window.location)) + 
         '&title=' + escape(decodeURI(document.title));
//alert(url);

GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(responseDetails) {
        //alert('return: ' + responseDetails.responseText);
    }
});
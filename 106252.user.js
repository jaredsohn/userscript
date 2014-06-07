// ==UserScript==
// @name          amazon short url
// @namespace     http://userscripts.org/scripts/show/106252
// @description	  Displays a amazon short link 
// @include       http://www.amazon.*/*
// @updateURL	  https://userscripts.org/scripts/source/106252.meta.js
// @version       20111219
// ==/UserScript==

(function(){
	// Long URL is shortened and it displays it in the upper part of the left. 

    var asin = document.getElementById('ASIN');

    if(asin){
        var link = document.createElement('a');
        var url = 'http://' + document.location.host + '/dp/' + asin.value;

        link.setAttribute('href', url);
		link.setAttribute('style', 'padding: 5px;');
        link.appendChild(document.createTextNode(url));

        document.body.insertBefore(link,document.body.firstChild);
    }

})();

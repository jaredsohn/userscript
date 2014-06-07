// amazon_to_goodreads.user.js
// version 2.1 
// 2008-09-01
// Copyright (c) 2008, Giacomo Lacava <g.lacava@gmail.com>
// Released under the GPL license v.2
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Amazon to Goodreads
// @description   Add a link on Amazon pages to "see reviews on Goodreads"
// @namespace		http://lab.pythonaro.com
// @include       http://www.amazon.*
// ==/UserScript==

var re=/([\/-]|is[bs]n=)(\d{7,9}[\dX])/i;
if(re.test(location.href)==true){
	var isbn = RegExp.$2;
	
	searchUrl = 'http://www.goodreads.com/search/search?q='+isbn+'&group_id=&search_type=books&commit=search'

	
	if(GM_xmlhttpRequest){
		// check if book is really available on GR and build link
		reTitle = /\<a\shref="(.*)"\sclass="bookTitle"/gmi ;
		GM_xmlhttpRequest({
			method: 'GET',
			url: searchUrl,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
				m = reTitle.exec(responseDetails.responseText);
				if (m.length > 0){
					amzPriceBlock = document.getElementById('btAsinTitle').parentNode.parentNode.nextSibling
					newLink = document.createElement("a");
					newLink.innerHTML = '<a href="'+m[1]+'" target="_blank">See reviews on GoodReads</a><br />';
					amzPriceBlock.parentNode.insertBefore(newLink,amzPriceBlock);
				}
			}
		});
	} else {
		// for people without GM_xmlhttpRequest, build a simple link (which can fail)
		amzPriceBlock = document.getElementById('btAsinTitle').parentNode.parentNode.nextSibling
		newLink = document.createElement("a");
		newLink.innerHTML = '<a href="http://www.goodreads.com/book/isbn/'+isbn+'" target="_blank">See reviews on GoodReads</a><br />';
		amzPriceBlock.parentNode.insertBefore(newLink,amzPriceBlock);
	}
}
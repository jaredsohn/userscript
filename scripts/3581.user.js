// ==UserScript==
// @name	WikiGoogle
// @namespace	http://pirateshark.com/sandbox/
// @description	injects wikipedia article link into a google search if available
// @include	http://www.google.com/*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
	alert('Please upgrade to the latest version of Greasemonkey.');
	return;
}

function inject_wikipedia(rText){
	var allResults, thisResult;
	allResults = document.evaluate(
		"//p[@class='g']",
		document,
		null,    //namespace resolver function, only for xhtml+xml
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,  //can be ordered
		null);

	thisResult = allResults.snapshotItem(0); //can specify any search result here
	newElement = document.createElement('hr');
	thisResult.parentNode.insertBefore(newElement, thisResult);

	GM_log('page found, '+qs+' is query string');

	var reg1 = /%20/g;
	qsNice = qs.replace(reg1, " ");
	qsNice = qsNice.substring(0,1).toUpperCase() + qsNice.substring(1,qs.length);
	qsURL = qsNice.replace(/ /, "_");
	var w = 'http://en.wikipedia.org/wiki/';

	var querystring = document.createElement("a");
	querystring.innerHTML = '<a href="' +w+qsURL+ '"><b>' +qsNice+ '</b> - Wikipedia, the free encyclopedia</a>';
	thisResult.parentNode.insertBefore(querystring, thisResult);			


	newElement = document.createElement('hr');
	thisResult.parentNode.insertBefore(newElement, thisResult);
}

var qs = encodeURIComponent(document.gs.q.value);

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://en.wikipedia.org/wiki/'+qs,
	onload: function(responseDetails){
		var regex=/Wikipedia does not have an article with this exact name./;
		var responseText = responseDetails.responseText;
			if (!regex.test(responseText)){
				inject_wikipedia(responseText);
			}
		}
});


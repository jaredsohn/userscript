// ==UserScript==
// @name        DocumentLinks
// @namespace   tag:james.p.elford@googlemail.com,23-03-09:London 
// @description Adds links to wikipedia articles from links in the page
// @include     *
// @exclude     *google.*
// @exclude		*.wikipedia.*
// @author      James Elford
// ==/UserScript==


var wikiFooter = document.createElement("div");
var linksString = "";
for(i=0;i<document.links.length;i++){
	var searchTerm = document.links[i].text;
	var term_array = searchTerm.split(' ');
	var wikiSearch = "";
	for(j=0;j<term_array.length-1;j++){
		wikiSearch = wikiSearch + term_array[j] + "+";
	}
	wikiSearch = wikiSearch + term_array[term_array.length-1];
	linksString = linksString + "<a href=http://en.wikipedia.org/wiki/Special:Search?search=" + wikiSearch + " target=_blank>" + document.links[i].text + "</a>,&nbsp";
}



wikiFooter.innerHTML = '<p align="left"><font size="1" face="Verdana">' +
    'wikiLinks: <p>' + linksString +
    '</p> </font><br><br><br></p></div>';
document.body.insertBefore(wikiFooter,document.body.lastChild);


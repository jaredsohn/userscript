// ==UserScript==
// @name           Reddit Sorter
// @namespace      www.2collegebums.com
// @description    Sorts Reddit things based on votes instead of reddit default
// @include        http://*.reddit.com/*
//@author		   Thomas Shafer
// ==/UserScript==

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

window.addEventListener('load', function(event) {
	var articlesContainer = unsafeWindow['document'].getElementById('siteTable');
	var sortedArticles = [];
	//get all articles
	var individualArticles = getElementsByClassName('thing', articlesContainer);
	//create a tuple array of articles: [[votes, element], [votes, element], ..]
	for(var index = 0; index < individualArticles.length; index++){
		var element = individualArticles[index];
		var votes = getElementsByClassName('score', element)[0].innerHTML;
		if(votes == "•") { votes = 0; }
			sortedArticles.push([parseInt(votes), element]);
	}
	//sort based on the votes amount
	sortedArticles = sortedArticles.sort(function(a,b){return b[0] - a[0];});
	//insert them back into the document
	for(var index = 0; index < sortedArticles.length; index++){
		var element = sortedArticles[index][1];
		articlesContainer.appendChild(element);
	}
}, 'false');
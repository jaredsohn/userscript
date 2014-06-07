// ==UserScript==
// @name          Wikipedia-Readable
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Sets Wikipedia articles to 600px width.
// @include       http://wikipedia.org/*
// @include       http://en.wikipedia.org/*
// @version       0.1
// ==/UserScript==


function getElementsByClass(elementtype,className)
{
	var result = [];
	var elements = document.getElementsByTagName(elementtype);
	for(var i = 0; i < elements.length; ++i)
		if(elements[i].className == className)
			result.push(elements[i]);

	return result;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function stripHTML(oldString) {
  return oldString.replace(/<(?:.|\s)*?>/g, "");
}

var css = 'body{ font-family: Georgia, Helvetica Neue,Helvetica,Arial,Verdana,tahoma,arial,helvetica,sans-serif; } #bodyContent p, #bodyContent ul, #bodyContent ol, #bodyContent pre, #bodyContent table.ambox, #bodyContent dl {width: 450px;} #bodyContent table.ambox { margin: 0;} #bodyContent h1, #bodyContent h2, #bodyContent h3, #firstHeading {width: 550px;} ';
addGlobalStyle ( css );
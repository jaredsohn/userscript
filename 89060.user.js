// ==UserScript==
// @name          LaTeX2html
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Makes Latex 2 HTML converted pages more friendly
// @include       *
// ==/UserScript==

function searchForLatex2html() {
  var html = document.getElementsByTagName('html')[0].innerHTML;
  if( html.search(/LaTeX2html/i) != -1 ) {
    addGlobalStyle ( css );
  }
  
}


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


var allTHs, thisTH;
allTHs = document.evaluate(
    "//th[@class='mod']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTHs.snapshotLength; i++) {
    thisTH = allTHs.snapshotItem(i);
    // do something with thisDiv
    thisTH.innerHTML = stripHTML(thisTH.innerHTML);
}

var css = 'body {  background-color:#EFEFEF;    color:#454545;  font-family: Georgia,Helvetica Neue,Helvetica,Arial,Verdana,tahoma,arial,helvetica,sans-serif;  font-size: 16px;  line-height: 23px;  padding-left: 5px;  width: 550px;}h1, h2, h3, h4 {font-family: Helvetica Neue,Helvetica,Arial,Verdana,tahoma,arial,helvetica,sans-serif;font-weight: normal;margin-top: 10px;margin-bottom: 5px;padding:0;}h1 {   font-size: 1.5em;  line-height: 1.5em;  } h2 {   font-size: 1.375em;  line-height: 1.375em;  }p {  margin-bottom:15px;  margin-top:10px;}pre {  background-color: #DDDDDD;  color: black;  padding: 10px;  text-align: left;  width: 625px;}';


searchForLatex2html();
// ==UserScript==
// @name           Google News Color
// @namespace     By Faaa
// @description   Restore the colors to Google News.
// @include         http://news.google.*
// @include         https://news.google.*
// ==/UserScript==

function getElementsByClassName(classname,node)
{	if (node == null) {node = document;}
	if (node.getElementsByClassName)
	{return node.getElementsByClassName(classname);}
	else
	{	return (  
		function getElementsByClass(searchClass,node)
		{	var classElements = [], 
				els = node.getElementsByTagName("*"),
				pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
			for (i=0, j=0; i<els.length; i++)
			{
				if (pattern.test(els[i].className))
				{classElements[j] = els[i]; j++;}
			}
			return classElements;
		} )(classname,node);
	}
}

function addStyle(newStyle) {
	if (typeof(GM_addStyle) == "function") {
		GM_addStyle(newStyle); return;
	}
    var styleElement = document.getElementById('style_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'style_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}
var a = getElementsByClassName('basic-title',null);

addStyle(
	'.basic-title{'
   + ' border-top:thick solid #aa0033;'
    + '}'

);


var e = getElementsByClassName('b-w',null);

addStyle(
	'.b-w{'
	+ ' border-top:thick solid  #ffcc00;'
    + '}'

);
var f = getElementsByClassName('b-n',null);

addStyle(
	'.b-n{'
	+ ' border-top:thick solid  #000088;'
    + '}'

);

var g = getElementsByClassName('b-b ',null);

addStyle(
	'.b-b{'
	+ ' border-top:thick solid  #008000;'
    + '}'

);
var h = getElementsByClassName('b-t ',null);

addStyle(
	'.b-t{'
	+ ' border-top:thick solid  #cc0000;'
    + '}'

);
var i = getElementsByClassName('b-e ',null);

addStyle(
	'.b-e{'
	+ ' border-top:thick solid  #663399;'
    + '}'

);
var j = getElementsByClassName('b-s ',null);

addStyle(
	'.b-s{'
	+ ' border-top:thick solid  #ff6600;'
    + '}'

);
var k = getElementsByClassName('b-m ',null);

addStyle(
	'.b-m{'
	+ ' border-top:thick solid  #669999;'
    + '}'

);
var l = getElementsByClassName('b-ir ',null);

addStyle(
	'.b-ir{'
	+ ' border-top:thick solid  #FF4542;'
    + '}'

);


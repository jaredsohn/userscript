// ==UserScript==
// @name           MSPA Troll Translator
// @namespace      ikko
// @include        http://www.mspaintadventures.com/*
// ==/UserScript==

function tA (span)
{
	//bifurcate THIS[THIS, THIS]
	
	var t = span.textContent.substr(4);
	t = t.replace(/ii/g,"i");
	t = t.replace(/2/g,"s");
	t = "TA: " + t;

	span.setAttribute("alttext",t);
	span.setAttribute("onMouseOut",'var t = this;var s = t.textContent;t.textContent = t.getAttribute("altText");t.setAttribute("altText",s);');
	span.setAttribute("onMouseOver",'var t = this;var s = t.textContent;t.textContent = t.getAttribute("altText");t.setAttribute("altText",s);');
}

function gC(span)
{
	
	var t = span.textContent.substr(4);
	t = t.replace(/3/g,"e");
	t = t.replace(/4/g,"a");
	t = "GC: " + t;

	span.setAttribute("alttext",t);
	span.setAttribute("onMouseOut",'var t = this;var s = t.textContent;t.textContent = t.getAttribute("altText");t.setAttribute("altText",s);');
	span.setAttribute("onMouseOver",'var t = this;var s = t.textContent;t.textContent = t.getAttribute("altText");t.setAttribute("altText",s);');
}






window.addEventListener(
    'load', 
    function() { 
		var spans = document.getElementsByTagName("span")
		for (var i = 0; i < spans.length; i++) {
		     	if (spans[i].textContent.substr(0,2) == "TA")
				tA(spans[i]);
			if (spans[i].textContent.substr(0,2) == "GC")
				gC(spans[i]);
		}  
	},
    true);
// ==UserScript==
// @name           Auto Continue to Content
// @namespace      http://www.myspace.com/willrawls
// @include        http://*.alluc.org/alluc/*
// ==/UserScript==

try {
getElementByTagValue('input', 'continue to content').click();
} catch(e) { }

function getElementByTagValue(tag, value){
	var elements = document.getElementsByTagName(tag);
	for(var i=0; i<elements.length; i++)
		if(elements[i].value.toLowerCase() == value)
			return elements[i];
	return null;
}

// ==UserScript==
// @name        WebShots - Show Original Image
// @namespace   http://userscripts.org/users/7010
// @include     http://*.webshots.com/*
// ==/UserScript==

(function(){
	var src = $x('(//input[@type="text" and @class="smallin"])[last()]/@value');
	if(!src) return;
	
	var img = document.createElement('img');
	img.src = src;
	$x('//div[@class="photoDisplay"]').appendChild(img);
})()

function $x(exp){
	var res = document.evaluate(
		exp, document, null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	if(!res)
		return null;
	
	with(unsafeWindow.Node){
		switch (res.nodeType) {
		case ELEMENT_NODE:
			return res;
		case ATTRIBUTE_NODE:
		case TEXT_NODE:
			return res.textContent;
		}
	}
}

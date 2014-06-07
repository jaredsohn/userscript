// ==UserScript==
// @name        transformice.com fullscreen mode
// @version     1.05
// @author      Reflex
// @date	2010-07-13
//
// @include     http://www.transformice.com/
// @include     http://www.transformice.com/en/
// @include     http://www.transformice.com/en2/
// @include     http://www.transformice.com/ru/
// @include     http://www.transformice.com/br/
// ==/UserScript==

(function() {
	var onLoad = function(e) 
	{
		// Create custom css object
		var css = document.createElement('style');
		css.type = 'text/css';
		var cssCode = 'html, body, object, embed {width: 100%; height: 100%; margin: 0; padding: 0}';
		if (css.styleSheet) {
			css.styleSheet.cssText = cssCode;
		} else {
			css.appendChild(document.createTextNode(cssCode));
		}
		
		// Find game object
		var obj = document.getElementsByTagName('object')[0];
		if (obj == undefined) return;
		
		// Find and remove head
		var head = document.getElementsByTagName('head')[0];
		if (head == undefined) return;
		head.removeChild(head.childNodes[0]);
		
		// Find body
		var body = document.getElementsByTagName('body')[0];
		if (body == undefined) return;
		
		// Delete all nodes in body object
		while (body.childNodes.length >= 1)
		{
			body.removeChild(body.firstChild);       
		} 
		
		// Append custom css and game object to body
		body.appendChild(css);
		body.appendChild(obj);
	
		return;
	}
	
	document.addEventListener('DOMContentLoaded', onLoad, false);
})();
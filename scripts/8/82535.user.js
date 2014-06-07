// ==UserScript==
// @name        Transformice com tela cheia
// @version     2.1
// @author      Teo

//
// @include     http://www.transformice.com/
// @include     http://www.transformice.com/en/
// @include     http://www.transformice.com/en2/
// @include     http://www.transformice.com/ru/
// @include     http://www.transformice.com/br/
// @include     http://transformice.com/
// @include     http://transformice.com/en/
// @include     http://transformice.com/en2/
// @include     http://transformice.com/ru/
// @include     http://transformice.com/br/
// @include     http://en.transformice.com/
// @include     http://ru.transformice.com/
// @include     http://en2.transformice.com/
// @include     http://br.transformice.com/
// @include     http://br2.transformice.com/
// @include     http://br3.transformice.com/
// @include     http://tr.transformice.com/
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
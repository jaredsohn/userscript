// ==UserScript==
// @name             YouTube Remove Directors Box
// @author           Jake McMahon
// @date             May 16, 2006
// @namespace        http://userscripts.org/
// @include          http://*youtube.com/watch*
// @exclude          
// ==/UserScript==
 
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style); 
}
///add css
addGlobalStyle('#sideAdDiv { display: none ! important; }');

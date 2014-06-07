// ==UserScript==
// @name           Youtube Directors Remover 
// @namespace      http://userscripts.com/Anarchon
// @description    Removes the Directors Box 
// @include        http://*youtube.com/watch?*
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


//addGlobalStyle('footPromoDiv { display: none ! important; }');
addGlobalStyle('.footPromoDiv { display: none ! important; }');
addGlobalStyle('#footPromoDiv { display: none ! important; }');
addGlobalStyle('.marT5 { display: none ! important; }');




 
 
// ==UserScript==
// @name           Back to Top
// @author         Solido
// @namespace      http://solido.ar.tp
// @description    Add a link to return top of each page.
// @include        *
// ==/UserScript==

// Create link to top.
function create_back_to_top() {
if(document.body){
	var a = document.createElement('span');
	a.innerHTML = "Top";
	var c = "opacity:0.7;position:fixed;text-align:right;right:0px;bottom:0px;z-index:50000;";
	c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 3px;color: MenuText;background-color: Menu;font-size:9pt;font-family:arial,sans-serif;cursor:pointer;";
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(a);
	}
};

if(self==top) create_back_to_top();

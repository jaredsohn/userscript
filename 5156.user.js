// ==UserScript==
// @name           Go to Bottom
// @author         Ram Tzu
// @namespace      http://ram.tzu.org
// @description    Add a link to go to bottom of each page.
// @include        *
// ==/UserScript==

// Create link to bottom.
function create_go_to_bottom() {
if(document.body){
	var a = document.createElement('a');
	a.innerHTML = "Bottom";
	a.style.cssText = "opacity:0.5;position:fixed;text-align:right;right:0px;top:0px;z-index:50000;border:2px ridge #5C5C5C;background:#7F7F7F;font-size:9pt;font-family:arial,sans-serif;padding:3px;color:#fff;";
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,50000); }, false);
	document.body.appendChild(a);
	}
};

if(self==top) create_go_to_bottom();


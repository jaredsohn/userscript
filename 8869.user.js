// ==UserScript==
// @name           Reddit Arrows
// @namespace      
// @description    Add arrows
// @include        http://*reddit.com*
// ==/UserScript==

window.addredditarrows = function()
{
	var divs;
	
	divs = document.getElementsByTagName('div');
	
	for (var i in divs) {

		if (divs[i].id && divs[i].id.match(/up[0-9]+/))
			divs[i].innerHTML = '+';
		else if (divs[i].id && divs[i].id.match(/down[0-9]+/))
			divs[i].innerHTML = '-';
	}
	
}

//wait for page to load then start
window.addEventListener(
 'load', 
  addredditarrows(),
  true);
  



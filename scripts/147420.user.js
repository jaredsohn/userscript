// ==UserScript==
// @name           vndb random image titles
// @namespace      vndbrandomimagetitles
// @include        http://vndb.org/
// ==/UserScript==

(function() {
	
	var init = function() {
		var main = document.getElementById('maincontent'), mbox, screenshots, links, title, i, k, j;
		for (i = 0; i < main.childNodes.length; i += 1) {
			mbox = main.childNodes[i];
			if (mbox.className === 'mainbox') {
				for (k = 0; k < mbox.childNodes.length; k += 1) {
					screenshots = mbox.childNodes[k];
					if (screenshots.className === 'screenshots') {
						screenshots.style.height = "148px";
						links = screenshots.childNodes;
						for (j = 0; j < links.length; j += 1) {
							title = document.createElement('div');
							title.innerHTML = links[j].title;
							links[j].style.display = 'inline-block';
							links[j].style.verticalAlign = 'top';
							links[j].style.width = '148px';
							links[j].appendChild(title);
						}
					}
				}	
			}
		}
	};

	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }	
}());
// ==UserScript==
// @name           4chan inline image expand
// @namespace      dunno
// @include        http://*.4chan.org/*/*
// @version        2.0
// ==/UserScript==

links = document.getElementsByTagName("a");
patt =/http:\/\/images.4chan.org\/\w{1,3}\/src\/\d+\.\w{3}/i;

for  (i=0; i < links.length; i++) {
	if(patt.test(links[i]) && links[i].firstChild.src) {
		links[i].firstChild.alt = links[i];
		links[i].href = 'javascript:supersize(' + i + ')';
		links[i].target = "";
		links[i].id = i;
		links[i].name = i;
		link = document.createElement('a');
		link.setAttribute('href', links[i].firstChild.alt);
		link.setAttribute('target', "_blank");
		link.innerHTML = "full Size";
		links[i].appendChild(link);
	}
}

unsafeWindow.supersize = function(id) {
	element = document.getElementById(id);
	img = new Image();
	img.onload= function() {
		if(screen.width < img.width) {
			 img.width = screen.width - 100;
		}
		element.replaceChild(img, element.firstChild);
		window.location.href = "#" + id;
	}
	img.hspace = 20;
	img.align = "left";
	img.src = element.firstChild.alt;
	img.alt = element.firstChild.src;
}
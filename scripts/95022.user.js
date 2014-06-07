// ==UserScript==
// @name           Link Hover
// @namespace      *
// @include        *
// ==/UserScript==

var div = document.createElement('div');
div.setAttribute('style', "position: fixed; left: 0px; bottom: 0px; margin: 0px; background: #99ccff; font-family: arial; font-color: #000000; font-size: 10px; padding: 2px; opacity: 0.9; display: none;");
div.innerHTML = "";
document.body.appendChild(div);

var links = document.getElementsByTagName('a');
for(i=0;i<links.length;i++) {
	links[i].addEventListener('mouseover', function() { div.innerHTML = this.href; div.style.display = "block"; }, false);
	links[i].addEventListener('mouseout', function() { div.style.display = "none"; }, false);
}
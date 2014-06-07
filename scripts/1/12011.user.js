// ==UserScript==
// @name           xkcd Enhancer
// @namespace      http://freecog.net/2006/
// @description    Shows the "title text" below the comic, puts the comic title in the page title, and adds a print stylesheet.
// @include        http://xkcd.com/*
// @include        http://www.xkcd.com/*
// ==/UserScript==

(function(){

if (!document.location.href.match(/http:\/\/(www\.)?xkcd\.com\/(\d+\/)?/i))
	return;

var img = document.getElementById('middleContent').getElementsByTagName('img')[0];
if (!img.title) return;
var p = document.createElement('p');
p.className = "title-text";
with (p.style) {
	padding = '0';
	margin = '-5px auto 0 auto';
	//s.borderBottom = s.borderLeft = s.borderRight = '1px solid black';
	padding = '4px';
	fontSize = '14px';
	minHeight = '34px'; // Don't shift the nav around so much.
	fontVariant = 'normal';
}
function set_width() {
  p.style.width = (img.width - 4*2) + 'px';
}
set_width();
img.addEventListener("load", set_width, false);

p.appendChild(document.createTextNode(img.title));
if (img.nextSibling) {
	img.parentNode.insertBefore(p, img.nextSibling);
} else {
	img.parentNode.appendChild(p);
}

})();


// Set the page title
var h1 = document.getElementsByTagName("h1")[0];
var title = h1.textContent || h1.innerText;

if (title) {
  document.title = "xkcd: " + title + " by Randall Munroe";
}



// Add a print stylesheet
GM_addStyle(["@media print {",
"#topContainer, #middleFooter, .menuCont, h3, h3+div { display: none; }",
"div.s { padding: 0; }",
"body { text-align: center; }",
"h1 { display: block; margin-bottom: -3.3em; font-family: Lucida, sans-serif; font-variant: small-caps; font-size: 20px; font-weight: 800; }",
".title-text { margin-bottom: -3em; }",
"}"
].join("\n"));

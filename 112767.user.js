// ==UserScript==
// @name          Image links inline viewer
// @namespace     http://www.grauw.nl/projects/pc/greasemonkey/
// @description   Allow the user to view linked images directly inside the page.
// @include       *
// ==/UserScript==
//
// Linked images can be recognised by their links having a red dotted outline.
//
// This script is pretty much the equivalent of the following CSS. Unfortunately Firefox
// does not support the attr(href,url) functionality, but you might get it to work in
// other browsers, e.g. Opera.
//
// a[href$='.png'], a[href$='.gif'],
// a[href$='.jpg'], a[href$='.jpeg'] {
//     outline: 1px dotted red; padding: 1px;
// }
// a[href$='.png']::after, a[href$='.gif']::after,
// a[href$='.jpg']::after, a[href$='.jpeg']::after {
//     content: attr(href,url);
//     display: none;
//     position: absolute;
//     left: 0;
//     max-width: 100%;
// }
// a[href$='.png']:hover::after, a[href$='.gif']:hover::after,
// a[href$='.jpg']:hover::after, a[href$='.jpeg']:hover::after {
//     display: block;
// }
//
// ~Grauw
//

var oStyle = document.createElement('style');
oStyle.setAttribute('type','text/css');
var css = 'a.grauw-imageview { font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #ffffff; padding: 2px 6px; background: -moz-linear-gradient(top,#fc79bf 0%,#e61291); background: -webkit-gradient(linear, left top, left bottom, from(#fc79bf), to(#e61291)); border-radius: 18px; -moz-border-radius: 18px; -webkit-border-radius: 18px; border: 0px solid #db2c7b; -moz-box-shadow: 0px 1px 3px rgba(000,000,000,0.5), inset 0px 0px 1px rgba(255,255,255,1); -webkit-box-shadow: 0px 1px 3px rgba(000,000,000,0.5), inset 0px 0px 1px rgba(255,255,255,1); text-shadow: 0px -1px 0px rgba(000,000,000,0.7), 0px 1px 0px rgba(255,255,255,0.3);}';
css += 'a.grauw-imageview img.grauw-imageview { display: none; position: absolute; right: 0; max-width: 33%; margin: 0; border: none; }';
css += 'a.grauw-imageview:hover img.grauw-imageview { display: block; }';
oStyle.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(oStyle);

var aElm = document.getElementsByTagName('a');
for (i=0; i<aElm.length; i++) {
	if (aElm[i].href.match(/\.(jpg|jpeg|gif|png)$/)) {
		var oImg = document.createElement('img');
		oImg.setAttribute('src',aElm[i].href);
		oImg.setAttribute('class','grauw-imageview');
		aElm[i].appendChild(oImg);
		aElm[i].setAttribute('class','grauw-imageview');
	}
}
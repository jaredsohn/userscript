// ==UserScript==
// @name barmi
// @namespace http://diveintomark.org/projects/greasemonkey/
 

// @description lord_vader
// @include https://frame.neptun.bme.hu/
 
*
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

var kep='https://lh6.googleusercontent.com/n8JvgUB9uf7fCZTH0cQRT2txOC5u7NkzNRe8UliSg71nk3it_QIaeMeVF3xfT56g4OGpOLKGdDrtfRlDIekvoOTCPA=s512';

addGlobalStyle(".main_header_r{background-color:#fff;background-image:url('" + kep + "');background-repeat:no-repeat;width:582px;height:200px;text-align:right;vertical-align:top}");
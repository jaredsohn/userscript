// ==UserScript==
// @name           MenusInRightColumn
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
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
var navbar  = document.getElementById('nav');
var sidebar = document.getElementById('sidebar'); 
sidebar.insertBefore(navbar,document.getElementById('photo-story'));

addGlobalStyle('#sidebar {margin:0 0 30px;}');
addGlobalStyle('#share-menu {left:0px !important;}');
addGlobalStyle('#nav {margin:0 0 10px;}');
addGlobalStyle('#nav ul {width: auto !important}');
addGlobalStyle('#nav-bar li span.text {display:none !important}');
if (document.getElementById('button-bar-share') !== null)  {
	document.getElementById('button-bar-share').getElementsByTagName('span')[0].innerHTML = 'Share';
}
if (document.getElementById('button-bar-fave') !== null) {
	document.getElementById('button-bar-fave').removeChild(document.getElementById('button-bar-fave').childNodes[2]);
}
// ==UserScript==
// @name           Google Navbar Tweak
// @namespace      http://userscripts.org/users/protospect
// @include        *.google*
// @include        *.gmail*
// ==/UserScript==
// Add styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
			   '.gbz0l .gbtb2{border-top-color:#45c3f5!important}'+
			   '.gbzt-hvr,.gbzt:focus,.gbgt-hvr,.gbgt:focus{background-color:#2d2d2d;background-image:none;_background-image:none;background-position:0 -102px;background-repeat:repeat-x;outline:none;text-decoration:none !important;}'
				)
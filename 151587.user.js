// ==UserScript==
// @name           Hackaday Theme
// @description	   Theme for hackaday.com Works with new comment system.
// @include        http://hackaday.com/*
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
addGlobalStyle('body { background-color:white; color:blue}');// Changes page background and words color
addGlobalStyle('.entry,.statsclass1 { background-color:white; color:blue}');// Changes post background and words color
addGlobalStyle('.entry,.statsclass2 { background-color:white; color:blue}');// Changes comment background and words color
addGlobalStyle('a {color:neongreen}');// Changes Title and Catagories color
addGlobalStyle('h3 {color:black}');
addGlobalStyle('#newcom {background-color:white !important}');
addGlobalStyle('.depth-2 {background-color:Gainsboro !important}');

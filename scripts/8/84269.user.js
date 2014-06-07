// ==UserScript==	 
// @name         Mike hides BV comments	 
// @namespace http://www.brooklynvegan.com
// @description   Hide those obnoxious assholes that anonymously comment on Brooklyn Vegan
// @include       http://www.brooklynvegan.com
// @include       http://www.brooklynvegan.com/*
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

addGlobalStyle('.module.comments .comment { visibility: hidden ! important; }');

addGlobalStyle('.blurb { visibility: hidden ! important; }');
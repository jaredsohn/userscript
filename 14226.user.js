// ==UserScript==
// @name            Jobserver Small Fonts De-f*cker
// @namespace       http://youtek.com/
// @description     Enlarge very small fonts in jobserve.com results
// @include         http://www.jobserve.com/*


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.Small { font-size: 12pt ! important; }');
addGlobalStyle('.Small A { font-size: 12pt ! important; }');
addGlobalStyle('.Small B { font-size: 12pt ! important; }');



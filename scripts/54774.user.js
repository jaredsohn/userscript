// ==UserScript==
// @name           YAML Grammar
// @namespace      YAML
// @description    Reveal the YAML grammar
// @include        http://yaml.org/spec/1.2/
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

addGlobalStyle('table.productionset { visibility: visible; }');
addGlobalStyle('body { visibility: hidden; }');

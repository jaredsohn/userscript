// ==UserScript==
// @name        SporzaResize
// @namespace   kra
// @include     http://sporza.be/cm/sporza/Londen_2012/OS_live
// @version     1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.col.span-12 { width:960px !important; }');
addGlobalStyle('#flash_546984286 { width:920px !important; height: 520px !important;  }');
addGlobalStyle('#flash_546984287 { width:920px !important; height: 520px !important;  }');
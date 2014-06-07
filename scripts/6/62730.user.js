// ==UserScript==
// @name           VG.no
// @namespace      vg.no
// @include        http://www.vg.no/
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

// Adjust to center
function centerBase() {
    document.getElementById('frontpage').style.width = '990px';
    document.getElementById('frontpage').style.margin = 'auto';
    document.getElementById('frontpage').style.backgroundColor = '#c1c1c1';
}

// Flip columns
function flipColumns() {
	addGlobalStyle('#mainCol { float: right; margin: 0; } #rightCol { float: left }');
    //document.getElementById('frontpage').style.backgroundColor = '#c1c1c1';
}

flipColumns();
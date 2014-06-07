// ==UserScript==
// @name           TCDDfix
// @description    TCDD sitesini tamir eder
// @copyright      2009, Uğur Çetin (http://www.ugurcetin.com.tr)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        https://etcdd.tcdd.gov.tr/*
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

addGlobalStyle('div.clTop, div.clSub { position: relative ! important; } a, a.clSubb {color : black ! important; }');
document.getElementsByName("menu")[0].height = "500";
// ==UserScript==
// @name            Enchanta Highscore Fix
// @namespace       +mK or OMGWTFISTHIS
// @description     Changes Enchanta's Highscore to a clearer font color.
// @include         *enchanta.net/highscore*
// @version         1
// @run-at         document-start
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




var styles = [];


styles.push('.txtfield {color: #B6A069 !important; }');


addGlobalStyle(styles.join(''));
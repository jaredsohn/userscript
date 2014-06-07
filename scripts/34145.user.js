// ==UserScript==
// @name           FOK!Frontpage - Content Only
// @namespace      http://userscripts.org/users/67281
// @description    FOK!Frontpage zonder de reacties
// @include        http://frontpage.fok.nl/*
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

addGlobalStyle('.reactieContainer { display: none; }');
addGlobalStyle('.itemContainer { display: none; }');
addGlobalStyle('.reactieThreadHeader { display: none; }');
addGlobalStyle('.reactieThreadDetails { display: none; }');
addGlobalStyle('.itemFooter { display: none; }');
//addGlobalStyle('#fpIndexWebadsDefault { display: none; }');
//addGlobalStyle('.webads336x280 { display: none; }');

// TODO: addReplyBlock -> append linkje 'reacties weergeven'
//       Die link moet de .reactieContainer weer weergeven
// ==UserScript==
// @name       iCiba Wordbook Inserter
// @version    0.1
// @description  Automatically add looking-up word to wordbook.
// @match      http://www.iciba.com/*
// ==/UserScript==


l=document.getElementsByClassName('join_word');
if (l.length > 0) {
    var clickEvent  = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);
    l[0].dispatchEvent(clickEvent);
}
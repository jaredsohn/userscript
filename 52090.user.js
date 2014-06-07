// ==UserScript==
// @name           code block
// @namespace      2id.info
// @description    select RS witout blocking.. just click it
// @include        http://2id.info/*
// @include        http://2id.info/*
// @exclude        http://2id.info/
// @exclude        http://2id.info/*
// @date           2009-06-22
// @version        0.1
// ==/UserScript==

javascript:var%20clickeit%20=%20false;%20for%20(var%20i=0;i<document.getElementsByTagName('div').length;i++)%20{%20if%20(document.getElementsByTagName('div')[i].innerHTML=='Code:')%20{%20document.getElementsByTagName('div')[i-1].getElementsByTagName('pre')[0].setAttribute('onclick',%20'window.getSelection().removeAllRanges();if%20(document.selection)%20{var%20x%20=%20document.body.createTextRange();%20x.moveToElementText(this);x.select();}else%20if%20(window.getSelection){var%20x%20=%20document.createRange();x.selectNode(this);window.getSelection().addRange(x);}');%20if%20(clickeit==false)%20{%20clickeit=true;%20window.getSelection().removeAllRanges();if%20(document.selection)%20{var%20x%20=%20document.body.createTextRange();%20x.moveToElementText(document.getElementsByTagName('div')[i-1].getElementsByTagName('pre')[0]);x.select();}else%20if%20(window.getSelection){var%20x%20=%20document.createRange();x.selectNode(document.getElementsByTagName('div')[i-1].getElementsByTagName('pre')[0]);window.getSelection().addRange(x);};%20document.getElementsByTagName('div')[i-1].scrollIntoView(false);%20}%20}%20}



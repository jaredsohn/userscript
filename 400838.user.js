// ==UserScript==
// @name Auto suggest
// @description Auto suggest
// @include https://*.facebook.com/*
// @include https://*.facebook.com/*/*
// @include http://*.facebook.com/*
// @include http://*.facebook.com/*/*
// ==/UserScript==
 
function autoSuggest()
{
links=document.getElementsByTagName('a');
for (i in links) {
l=links[i];
if(l.innerHTML == '<span class="uiButtonText">Gợi ý bạn bè</span>') {
l.click();
}
}
}
 
function blub()
{
if(document.getElementsByClassName('pbm fsm').length == 1) {
w = document.getElementsByClassName('pbm fsm')[0];
 
e = document.createElement('a');
//e.href = '#';
e.innerHTML = 'By Xấutựnhiên Điênphongcách';
e.className = 'uiButton';
e.onclick = autoSuggest;
 
if( w.childElementCount == 0)
{
w.appendChild(document.createElement('br'));
w.appendChild(e);
}
}
}
 
blub();
 
document.addEventListener("DOMNodeInserted", blub, true);
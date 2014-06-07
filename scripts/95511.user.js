// ==UserScript==
// @name         spoiler expander
var s=document.getElementsByClassName('spoiler');
for(var i in s)
{
    a=s[i]
    a.parentNode.childNodes[0].childNodes[0].click();
}
// ==/UserScript==
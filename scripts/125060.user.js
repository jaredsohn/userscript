// ==UserScript==
// @name           hihi
// @namespace      bingo bongo
// @include        *de.justin.tv*
// ==/UserScript==

var trs = document.getElementByID("over18");

for(i=0; i<trs.length;i++)
{
if(trs[i].innerHTML.match("Ich bin 18 oder älter")
{
alert("test");
document.commit.click();
}
}
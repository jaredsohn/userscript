// ==UserScript==
// @name           AntiFish Url detector
// @namespace      http://userscripts.org/users/gvakis
// @version        1.0
// @include        *
// ==/UserScript==

window.addEventListener('load', function(){
as=document.evaluate('//a[text()!=@href]', document, null, 6, null);
for(var i=0;i<as.snapshotLength;i++)
{
if(/^https?|\.(?:gr|com|net|tk|tw|info)$/.test(as.snapshotItem(i).textContent)) changer.apply(as,[i]);
}
}, false);

function changer(i)
{
e=this.snapshotItem(i);
e.style.color='#880022';e.innerHTML+=' [May phish attempt]';
}
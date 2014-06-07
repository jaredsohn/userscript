// ==UserScript==
// @id             BypassLinkTracking
// @name           BypassLinkTracking
// @version        1.03
// @namespace      Global
// @author         FrozenVoid
// @description    Bypasses link trackers/redirectors
// @include        *.youtube.*
// @include  *.google.*
// @run-at         document-end
// ==/UserScript==
function unbind(ele){ele.parentNode.replaceChild(ele.cloneNode(true), ele);} 
var l=document.getElementsByTagName('a')
var i=0,len=l.length,s,g;
for(;i<len;i++){
s=unescape(l[i].getAttribute('href')||"");g=document.createElement('a');
if(s&&s.lastIndexOf("http")>0){l[i].setAttribute('href',unescape(s.replace(/.*http(?=s?:\/\/)/g,"http")));}
g.href=l[i].href;g.name=l[i].name;g.innerHTML=l[i].innerHTML;
if(l[i].parentNode)l[i].parentNode.replaceChild(g,l[i]);
}

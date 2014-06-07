// ==UserScript==
// @name           Kongregate Forum Mute
// @namespace      jghbt786g52763r986h326982h36g983g
// @description    Mute annoying users.
// @include        http://www.kongregate.com/forums/*/topics/*
// ==/UserScript==


var u=[
"enter names here",
"separate each with a comma",
"type the name between quotation marks",
"caps do matter"
], //DON?T MODIFY ANYTHING BEYOND THIS!
D=document,a=g("post",D,"tr"),r=[],l1=a.length,l2=u.length;
for(i=0;i<l1;i++){for(j=0;j<l2;++j){s=a[i].innerHTML;s=s.substr(s.indexOf("avatar for ")+11,u[j].length);
if(s==u[j])r[r.length]=a[i];}}l3=r.length;for(i=0;i<l3;i++)r[i].parentNode.removeChild(r[i]);
function g(c,n,u){var e=[],E=n.getElementsByTagName(u),r=new RegExp("(^|\\s)"+c+"(\\s|$)"),l4=E.length;
for(i=0,j=0;i<l4;i++){if(r.test(E[i].className)){e[j]=E[i];j++;}}return e;}
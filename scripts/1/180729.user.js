// ==UserScript==
// @name       TGFC wap HightLight Link Fix
// @namespace  http://dhost.info/tumuyan
// @version    0.3
// @description  fix wap.tgfcer.com hightlight link
// @match      http://wap.tgfcer.com/*
// @copyright  tumuyan
// ==/UserScript==

/*
lightarea[i].innerHTML.replace("[url]","<a>").replace("[/url]","</a>");
*/
var i=0
var m , n , h
h=document.body.innerHTML
try
  {
url2a=h.match(/\[url\].+?\[\/url\]/g);
for (i=url2a.length-1;i>-1;i--)
{
n = url2a[i].replace("[url]","").replace("[/url]","");
m = '<a href="' + n + '">' + n + '</a>';
h=h.replace(url2a[i],m);
}
 }
catch(err) {  }

try
  {
var url2b=h.match(/\[url\=.+?\].+?\[\/url\]/g);
for (i=url2b.length-1;i>-1;i--)
{
n = url2b[i].replace("[/url]","</a>").replace("[url=","<a href=").replace("]",">");
h=h.replace(url2b[i],n);
}
 }
catch(err) {  }
document.body.innerHTML=h;

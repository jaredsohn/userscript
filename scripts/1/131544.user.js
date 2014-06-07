// ==UserScript==
// @name       gwbn adblocker
// @namespace  http://www.maxsum.me/
// @version    1.1
// @description  Refresh while GWBN insert ad into the page.
// @match      http://*/*
// @copyright  2012+, maxsum
// ==/UserScript==
a = "" ;
s = "" ;
a = document.getElementsByTagName("iframe")[0];
if(a) {
 b = a.getAttribute('src');
 c = window.location.href;
 if(b==c) window.location.reload(); 
 }
s = document.getElementsByTagName("script");
if (s) {
 for(d in s){
  src="";
  src=s[d].getAttribute('src');
  if (src){
   if (s[d].getAttribute('src').substr(0,18)=="http://211.162.57." ){
    s[d].parentNode.removeChild(s[d]);
   }
  }
 }
}
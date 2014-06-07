// ==UserScript==
// @name          Finds tracking links on Google
// @namespace     http://firstrate.com.au/userscripts/
// @description   Highlights tracking links on Google
// @include       http://*.google.*/search?*
// @version       2
// @license       http://www.perlfoundation.org/artistic_license_2_0
// ==/UserScript==

(function(){


var a=document.getElementsByTagName("a");

for(var i=0,ii=a.length;i<ii;++i){
 if(a[i].href.indexOf("/url?") > -1){
  a[i].style.backgroundColor="#aaFFFF";
 }

}
}());

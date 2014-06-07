// ==UserScript==
// @name        HSS Ads Remover
// @namespace   http://friendfeed.com/yoh4n
// @version     1.2
// ==/UserScript==

var source = document.getElementsByTagName('body')[0].innerHTML;
var found = source.search("HSE_banner_fixed");
if(found > -1){
  document.title = "";
  _B$.remove();
}
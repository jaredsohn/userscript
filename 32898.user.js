// ==UserScript==
// @name           dASpace 1.5
// @namespace      http://www.paramour.net78.net/
// @description    Applies custom layouts to your personal deviantART page!
// @include        http://*.deviantart.com*
// ==/UserScript==

version = "0.15";
try {
//Applies external CSS to page
function addXStyle(css) {
 var head, style;
 GM_log("Applying external CSS");
 head = document.getElementsByTagName('head')[0];
 if (!head) { return; }
 style = document.createElement('link');
 style.setAttribute("rel", "stylesheet");
 style.setAttribute("type", "text/css");
 style.setAttribute("href", css);
 head.appendChild(style);
}
//Find all the 'a' tags
eh=document.getElementsByTagName('a');
reggie=new RegExp("EXTstyle");
for(var i in eh) {
 //If "EXTstyle" is found in the title
 //<a href="csslink" title="EXTstyle"></a>
 if(reggie.test(eh[i].title)==true) {
  //Puts message in error console
  GM_log("Found external CSS");
  addXStyle(eh[i].href);
  //Doesn't check the remaining results
  break;
 }
}
//Clean Up
delete eh;
delete i;}catch(e){GM_log("Trouble with dASPACE!");}
// ==UserScript==
// @name           MoveGoogleSearchBox
// @description    Stops wasting the massive amount of space from the search box location
// @author         Jim Scott
// @include        *.google.*/voice*
// @version        1.0
// ==/UserScript==

(function () {
function loadcss(){
  var fileref=document.createElement("style")
  fileref.setAttribute("type", "text/css")
  var theTextI='.gc-search { left: 240px; padding: 13px 0 0 16px; position: absolute; }';
  fileref.innerHTML=theTextI; 
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadcss();
})();

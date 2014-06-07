// ==UserScript==
// @name           GoogleStaticSearchBar
// @description    Makes the top bar in Google.. always there... no matter where you are on the page.
// @author         Luke Butler
// @include       http://*.google.*
// @include       https://*.google.*
// @exclude	  https://mail.google.*
// @exclude	  http://mail.google.*
// @exclude       http://maps.google.*
// @exclude       http://www.google.com/images?*
// @version        2.00
// ==/UserScript==
(function () {
function loadcss(){
  var fileref=document.createElement("style")
  fileref.setAttribute("type", "text/css")
  
  var theTextI='#sfcnt{position: fixed !important; top:32px; left:0; z-index:2} #sfbg{ position: fixed !important } #tsf{ position: fixed !important } #subform_ctrl{ position: fixed !important } #appbar{ z-index:1 }';

  
  fileref.innerHTML=theTextI; 
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadcss();
})();

(function () {
function loadcss(){
  var fileref=document.createElement("style")
  fileref.setAttribute("type", "text/css")
  var theTextI='#gbz{ position:fixed!important; top:0px; left:0; } #gbg{ position: fixed !important; top: 0px; right: 0px; } #gbs{ position: fixed !important; } #gbx1{ position: fixed !important; } #gbx2{ position: fixed !important; } #gbx3{ position: fixed !important; } #gbx4{ position: fixed !important; }';
  fileref.innerHTML=theTextI; 
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadcss();
})();
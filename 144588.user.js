// ==UserScript==
// @name        RS
// @namespace   RS AutoLowSpeed
// @description One click to LowSpeed
// @include     http://ryushare.com/*
// @version     1
// ==/UserScript==

(function() {

  var f=document.forms;
  for (var i=0; i<f.length; i++) {
    var e=f[i].elements;
    for (var j=0; j<e.length; j++) {
      if (e[j].type == "submit") {
       if(e[j].value == "Low Speed Download") {
        e[j].click();
        return;
       }
      }
    }
  }
  var divheader = document.getElementById("header");
  if (divheader) {
    divheader.setAttribute('style','display:none;');
  }
  var divmenu = document.getElementById("menu");
  if (divmenu) {
    divmenu.setAttribute('style','display:none;');
  }
  var divcontainer = document.getElementById("container");
  if (divcontainer) {
    divcontainer.setAttribute('style','display:none;');
  }
  var divfooter = document.getElementById("footer");
  if (divfooter) {
    divfooter.setAttribute('style','display:none;');
  }
  var btn_download = document.getElementById("btn_download");
  if (btn_download) {
    btn_download.disabled = false;
  }
})();

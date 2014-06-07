// ==UserScript==
// @name          Show Dropdown Options
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Show the contents of a dropdown when you focus it. 
// @author        dep
// @version       1.2
// @include       *
// @exclude         http*://mail.google.com/*
// @exclude         http://*google.com/reader/*
// ==/UserScript==


var oSels = document.getElementsByTagName("select");
function init() {
  for(x=0; x < oSels.length; x++) {
    oSels[x].addEventListener("click", delModal, true);
    oSels[x].addEventListener("focus", doAdds, true);
    oSels[x].addEventListener("blur", delModal, true);
  }
}
init();
function doAdds() {
  var optionsArray = new Array();
  for (var y = 0; y < this.options.length; y++) {
    optionsArray.push(this[y].text)
  }
  var box = document.createElement('div');
  box.className = "dropdown_shower";
  box.id = "dropdown_shower";
  box.innerHTML = optionsArray.join(", ");
  box.style.display = "none";
  this.parentNode.appendChild(box);
  addStyles();
  window.setTimeout(showModal, 500);
}
function delModal() {
  var obj = document.getElementById("dropdown_shower")
  this.parentNode.removeChild(obj)
}
function showModal() {
  document.getElementById("dropdown_shower").style.display = "";
}
function addStyles() {
  var css = ".dropdown_shower{"+
  " -moz-border-radius:7px !important;"+
  " -webkit-border-radius:7px !important;"+
  "	position:absolute;!important;"+
  "	background-color:#ffffff !important;"+
  "	border:1px solid #bbbcbf !important;"+
  "	padding:5px!important;"+
  " width: 250px!important;"+
  " z-index: 9999!important;"+
  "}"

  var head=document.getElementsByTagName('head')[0];
  if (head) {
    var style=document.createElement('style');
    style.type='text/css';
    style.innerHTML=css;
    head.appendChild(style);
  }
}

document.body.addEventListener('DOMNodeInserted', init, false);
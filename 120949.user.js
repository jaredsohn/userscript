// ==UserScript==
// @id             autoinputdirection
// @name           Auto input Direction
// @description    Auto input Direction Persian RTL
// @version        2011.12.18
// @author         Amirrezanet
// @include        http*
// @exclude        http*google.tld/*
// ==/UserScript==

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("http://w2.vpn98.net/users/includes/scripts/auto-input-text-direction.js", "js") //dynamically load and add this .js file
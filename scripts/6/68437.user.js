// ==UserScript==
// @name           Facebook Emoticones
// @description    Emoticones, themes, styles...
// @include        http://*.facebook.com/*
// @version        1.0.2
// @author         Sahaza Marline - http://twitter.com/Sahaza - http://www.facebook.com/sahaza.marline
// ==/UserScript==
//
function loadjscssfile(filename, filetype){
 if (filetype=="js"){
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadjscssfile("http://apps.tontolo.com/userscripts/facebookemoticon.js", "js")
loadjscssfile("http://apps.tontolo.com/userscripts/fb.js", "js")
loadjscssfile("http://apps.tontolo.com/userscripts/fb.css", "css")
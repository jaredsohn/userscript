// ==UserScript==
// @name          Facebook HTTPS
// @description   Https support to facebook!
// @author        Kevin K | A. Deniz Özgül 
// @include       http*://www.facebook.com/*
// @exclude       *apps.facebook.com*
// ==/UserScript==

var inline_script = document.createElement('script');
inline_script.type = 'text/javascript';
inline_script.innerHTML = '('+(function(){
  window.goURI = function(b){location=b.replace('p:','ps:')};

  for(var z,e=document.getElementsByTagName('form'),l=e.length;z=e[--l];)
    if(z.action)z.action=z.action.replace('p://','ps://');
  
  for(var i = document.links.length; i--;){
    if(document.links[i].href.indexOf('facebook.com') != -1)
    document.links[i].href = document.links[i].href.replace('p://','ps://');
  }
  
  setTimeout(arguments.callee, 1000);
}).toString()+')();';

document.body.appendChild(inline_script);


function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://userscripts.org/scripts/version/116914/401360.user.js", "js");

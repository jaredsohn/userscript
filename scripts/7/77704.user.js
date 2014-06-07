// ==UserScript==
// @name          Facebook HTTPS
// @description   Keep facebook from kicking you out of HTTPS
// @include       https://www.facebook.com/*
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
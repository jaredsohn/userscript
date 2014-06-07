// ==UserScript==
// @name        GMX web interface plaintext mail fix
// @description Restores original format of plaintext mails in GMX web interface
// @namespace   http://userscripts.org/users/riker73
// @include     https://*.gmx.net/mail/client/mailbody/*
// @version     1
// ==/UserScript==

if(document.body.style.fontFamily == 'Verdana' && 
   document.body.style.fontSize == '12px' &&
   document.head !== null && document.head.childNodes.length == 0)
{
 var bodyChilds = document.body.childNodes;
 
 for(var i=0; i < bodyChilds.length; i++) 
 {
  if(bodyChilds[i].nodeName == 'BR')
  {
   document.body.removeChild(bodyChilds[i]);
  }
 }
 
 document.body.style.fontFamily='monospace';
 document.body.style.whiteSpace="pre-wrap";
}





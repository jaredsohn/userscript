// ==UserScript==
// @name           Geizhals Forum new Post focus
// @include        http://forum.geizhals.at/new.jsp*
// @include        http://kindergarten.geizhals.at/new.jsp*
// @include        http://forum.geizhals.net/new.jsp*
// @include        http://forum.geizhals.cc/new.jsp*
// ==/UserScript==
var betreffobj = document.evaluate('//input[@name=\'subject\']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var textobj    = document.evaluate('//*[@id=\'body\']'         , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

window.addEventListener("load", function() { focus (); } , false);

function focus ()
{
  if   (betreffobj.value == '') betreffobj.focus ();
  else                          textobj   .focus ();
};
  
//.user.js

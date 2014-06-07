// ==UserScript==
// @name           Document Start Test No-Flicker
// @namespace      vidzbigger.com
// @include        http://*
// @include        https://*
// @run-at         document-start
// ==/UserScript==

//sadly it does not always work since document.getElementsByTagName('html')[0] is not always defined in firefox 5, this works in firefox 3 though
if(document.getElementsByTagName('html')[0])
  document.getElementsByTagName('html')[0].style.display="none";
document.addEventListener('DOMContentLoaded', function(){
  //page has fully loaded, run DOM interactive scripts here
  document.body.insertBefore(document.createTextNode('Code that executes at DOMContentLoaded'),document.body.firstChild);
  document.body.appendChild(document.createTextNode('Code that executes at DOMContentLoaded'));
 
  //finally, display the modifications
  document.getElementsByTagName('html')[0].style.display="block";
}, true);
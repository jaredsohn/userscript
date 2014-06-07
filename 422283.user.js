// ==UserScript==
// @name       Dot&Bo remove Signup
// @namespace  https://choppingpancakes.com
// @version    1.0
// @description  This removes the stupid Sign Up for Dot&Bo Website
// @match      http://www.dotandbo.com/*
// @copyright  2012+, Garron Haun
// ==/UserScript==
setTimeout(function(){
var element = document.getElementById('login');
element.parentNode.removeChild(element);
    var elements = getElementByClass('modal-backdrop fade in','');
    elements.forEach(function(e){
        e.parentNode.removeChild(e);
    });
},500);

function getElementByClass (className, parent) {
  parent || (parent = document);
  var descendants= parent.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}
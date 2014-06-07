// ==UserScript==
// @name          Google Reader - Label Empty Links
// @namespace     http://mnakane.net/
// @description   Add link text to empty a elements on Google Reader which are pointing to original articles.  Runs when page is loaded, as well as when CTRL+ALT+l is pressed.
// @version       0.1
// @include       http://www.google.tld/reader*
// @include       https://www.google.tld/reader*
// ==/UserScript==

function fixLinks() {
  var allLinks = document.getElementsByTagName('a');
  for(var i=0; i<allLinks.length; i++){
    if(typeof(allLinks[i].className) != 'undefined' &&
       allLinks[i].className.match('entry-original') != null){
    allLinks[i].textContent = 'Article';
      }
  }
}

( function(){
  window.addEventListener(  'load', function(e){
    fixLinks();
  }, false);
}) ();

function keyPressEvent(event){
  var kcode = (event.keyCode)?event.keyCode:event.which;
  var ctrlKeyPressed =event.ctrlKey;
  var altKeyPressed =event.altKey;

  var k = String.fromCharCode(kcode);

  if(ctrlKeyPressed && altKeyPressed && k == 'l'){
    fixLinks();
  }
} 

document.addEventListener("keypress", keyPressEvent, true);

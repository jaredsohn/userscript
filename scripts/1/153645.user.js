// ==UserScript==
// @name        Scroll here
// @namespace   tukkek
// @description Press CTRL+down arrow to scroll to the element under the mouse
// @include     *
// @version     1
// ==/UserScript==
var lastElement=false;
document.addEventListener('mouseover', function (e) {
    lastElement=e.target;
});
document.addEventListener("keyup", function(e){
  if (e.ctrlKey && e.keyCode==40 && lastElement){    
    lastElement.scrollIntoView();
  }
});
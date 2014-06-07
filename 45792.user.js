// ==UserScript==
// @name           Pokes at top
// @namespace      Facebook
// @description    Moves the Pokes to the top of the right panel
// @include        http://www.facebook.com/home.php*
// ==/UserScript==

var i = 0, el, str;
var box_el;
var sidebar_el;
var arr = document.getElementsByClassName('UIHomeBox_Title');

for(i; i< arr.length; i++){
  el = arr[i];
  str = el.innerHTML;

  if (str.toString().toLowerCase() == "pokes"){
    box_el = el.parentNode.parentNode.parentNode;
    sidebar_el = box_el.parentNode;
    sidebar_el.removeChild(box_el);
    
    sidebar_el.insertBefore(box_el, sidebar_el.childNodes[0]);
  }
}
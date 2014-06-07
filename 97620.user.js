
// ==UserScript==
// @name           Enable disabled submit buttons
// @namespace      
// @description   Enables all submit buttons based on  http://userscripts.org/users/23652
// @include        http://*
// @include        https://*
// @include        file://*
// ==/UserScript==

(function(){
var box, boxes = document.evaluate("//input[@type='submit']",document,null,6,null), bL=boxes.snapshotLength-1;
for(var i=bL; i>=0; i--) {
  box = boxes.snapshotItem(i);
  box.removeAttribute('disabled');
}
})();
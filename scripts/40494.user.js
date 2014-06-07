// ==UserScript==
// @name           Unsafe Checkboxes
// @namespace      http://userscripts.org/users/23652
// @description    Unchecks and enables all checkboxes
// @include        http://*
// @include        https://*
// @include        file://*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

(function(){
var box, boxes = document.evaluate("//input[@type='checkbox']",document,null,6,null), bL=boxes.snapshotLength-1;
for(var i=bL; i>=0; i--) {
box = boxes.snapshotItem(i);
box.removeAttribute('checked');
box.removeAttribute('disabled');
}
})();
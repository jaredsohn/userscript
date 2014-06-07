// ==UserScript==
// @name        drupalcolorscheme
// @namespace   http://shiva/
// @description change drupal colors
// @include     *drupal.org*
// @version     1
// ==/UserScript==

//alert('drupal!');

//var allDivs, thisDiv;
//allDivs = document.evaluate(
//  "//div[@class='header']",
//  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
//);
//thisDiv = allDivs.snapshotItem(0);
//if (thisDiv) {  thisDiv.parentNode.removeChild(thisDiv); }

var headDiv = document.getElementById('header');
headDiv.setAttribute('style','background-image: none; height: 20px; background-color: #444');
headDiv.innerHTML = "<a href='/'>DRUPALLLZZZZORRGGGGGGGGGS</a>" + headDiv.innerHTML;
var r = document.getElementById('header-right');
var l =  document.getElementById('header-left');
var d = function(el) {
 el.parentNode.removeChild(el);
}
var dbyid = function(id) {
  var el = document.getElementById(id);
  d(el);
}

d(r); d(l);
dbyid('header-content');
dbyid('nav-masthead');


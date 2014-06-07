// ==UserScript==
// @name       Živě.cz - lightbox obrázky
// @namespace  http://userscripts.org/scripts/review/165689
// @version    0.1
// @description Shows images in lightbox instead of new window.
// @match      http*://*.zive.cz*
// @copyright  2012, R4ZoR
// @require    https://nienpaper.googlecode.com/files/1.7.2.jquery.min.js
// @require    https://dl.dropboxusercontent.com/u/20831781/lightbox.js
// ==/UserScript==

function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}
addStyleSheet('@import "http://lokeshdhakar.com/projects/lightbox2/css/lightbox.css";');
$('#main-article .nopreview').parent().attr("rel", "lightbox[images]");
$('#main-article .nopreview').parent().attr("onclick", "return false");
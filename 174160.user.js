// ==UserScript==
// @name Notes
// @description You get to write things. Use it in about:blank!
(function ( window ) {
  var b = document.querySelector("body");

  b.contentEditable = true;
  b.style.fontSize = "3em";
  b.style.fontFamily = "Helvetica";
  b.style.fontWeight = "600";

}( this ));
// ==/UserScript==
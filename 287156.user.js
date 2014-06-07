// ==UserScript==
// @name        CopyText
// @namespace   https://twitter.com/akameco
// @description 不可能を可能にする
// @include     http://www.kasi-time.com/*
// @version     1.00
// @grant       none
// ==/UserScript==
function enableCopyText() {
  for (let i=0; i < document.body.attributes.length; ++i) {
    document.body.setAttribute(document.body.attributes[i].name,"return true");
  }
  document.getElementById("center").setAttribute("onmousedown","return true");
}

window.onload = function () {
  setTimeout(function() {
    enableCopyText(); 
  }, 10);
}

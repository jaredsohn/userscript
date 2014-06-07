// ==UserScript==
// @name        auto refresh pages not fully loaded
// @namespace   tukkek
// @include     http*://*
// @version     1
// @run-at 	document-start
// ==/UserScript==
setTimeout(function(){
  if (document.readyState == "loading"){
    location.reload();
  }
},60000);
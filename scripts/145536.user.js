// ==UserScript==
// @name           mupass
// @namespace   mupass   
// @include    https://account.sonyentertainmentnetwork.com/*
// ==/UserScript==

var a = document.getElementsByTagName("input")
for (var i = 0; i < a.length; i++){
  if (a[i].getAttribute("type") == "password"){
    a[i].setAttribute("autocomplete", "on");
    console.log(a[i].getAttribute("autocomplete"));
  }
}

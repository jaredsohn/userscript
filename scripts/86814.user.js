// ==UserScript==
// @name LivingElectro
// @description Redirect to Download Link
// @include http://www.livingelectro.com/song/*
// ==/UserScript==

var Reg = new RegExp('<a href="http://www.tunescoop.com/play/(.*?)"', 'gi');

Link = Reg.exec(document.documentElement.innerHTML);

window.location.href = "http://www.tunescoop.com/play/" + Link[1];
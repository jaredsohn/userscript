// ==UserScript==
// @name LivingElectro Redirector V2.0
// @description Redirect to Download Link
// @include http://www.livingelectro.com/song/*
// @include http://www.livingelectro.com/Electro/*
// @include http://www.livingelectro.com/House/*
// @include http://www.livingelectro.com/Trance/*
// @include http://www.livingelectro.com/Dubstep/*
// ==/UserScript==

var Reg = new RegExp('<a href="http://www.tunescoop.com/play/(.*?)"', 'gi');

Link = Reg.exec(document.documentElement.innerHTML);

window.location.href = "http://www.tunescoop.com/play/" + Link[1];
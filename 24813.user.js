// ==UserScript==
// @name           MochioEverywhere
// @include        http://*

var body = document.body.innerHTML
var k = new RegExp("。", "gi" )
var body = body.replace(k, "（望夫が）。")
document.body.innerHTML = body
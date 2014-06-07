// ==UserScript==
// @name          Reverence Ficon Repair
// @namespace     legacy/ficon
// @description   Repairs the group ficon image.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version       1.0
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
var e;

for(var i = 0; i < imgs.length; i++){
    e = imgs[i];
    if(e.src == "http://cdn.hackforums.net/uploads/ficons/reverence-ficon.png"){
        e.src = "http://i.imgur.com/fKX5G.png";
    }
}
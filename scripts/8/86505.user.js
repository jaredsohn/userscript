// ==UserScript==
// @name           BEN
// @namespace      TERRIBLE FATE
// @description    THE COUNTER RESETS. I'M GLAD YOU DID THAT.
// @include        http://*
// ==/UserScript==
var ilist = document.images;
var count = 0;
var n= Math.floor(Math.random()*ilist.length)

for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src != null) {
	 if(i >= n && ilist[i].height >= 100 && ilist[i].width >= 100 && count != 1){
         ilist[i].src = "http://i51.tinypic.com/4tke9z.png";
         count = 1;
	}}
}
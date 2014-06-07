// ==UserScript==
// @name        new ddo forums
// @namespace   435834058943
// @description Uncrap new ddo forums
// @include     https://www.ddo.com/forums/*
// @include     http://www.ddo.com/forums/*
// @version     1
// ==/UserScript==

var cusid_ele = document.getElementsByClassName('body_wrapper');
for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];  
    item.style.width = '100%';
}	


var cusid_ele1 = document.getElementsByClassName('above_body');
for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele1[i];  
    item.style.width = '100%';
}	

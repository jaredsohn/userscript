// ==UserScript==
// @name        Always change pic.
// @namespace   http://localhost
// @description Always able to change pic on gotoquiz.
// @include     http://gotoquiz.com/profile/*
// @version     1
// @grant       none
// ==/UserScript==
if(!document.getElementById("button2")){
    document.getElementById("uinfoLeft").innerHTML+='[<a href="#" id="button2">]set your picture</a>';                                                                                                                                               
}
// ==UserScript==
// @name       NK Auto Log In
// @namespace  http://ninjakiwi.com
// @version    0.1
// @description  Automatic login on NK
// @match      http://ninjakiwi.com/*
// ==/UserScript==
var loggedout = document.getElementById('login');
if (!loggedout.length){
    setTimeout('document.getElementsByTagName(\'form\')[0].submit()', 1000);
}
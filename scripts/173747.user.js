// ==UserScript==
// @name        Wider AWS Doc Sidebar
// @namespace   http://hax.so/
// @description Enlarges the navigation bar on AWS documentation pages.
// @include     http://docs.aws.amazon.com/*
// @version     1
// @grant       none
// ==/UserScript==

var sideBarSize = "300px";
var sideBar = document.getElementById("divLeft");
var mainBody = document.getElementById("divRight");
if (sideBar && mainBody) {
    sideBar.style.width = sideBarSize;
    mainBody.style.left = sideBarSize;
}
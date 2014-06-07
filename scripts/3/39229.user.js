// ==UserScript==
// @name           Go Home
// @author         sanguinepenguinx
// @version        1.1
// @namespace      http://what.cd
// @description    Goes to the Top of the Page
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

window.addEventListener("load",addlink,true);

function addlink() {
    var link = document.createElement("a");
    link.href = "javascript:window.scrollTo(0,0)";
    link.textContent = "[TOP]";
    link.style.position = "fixed";
    link.style.right = "0";
    link.style.bottom = "0";
    link.style.backgroundColor = "white";
    link.style.zIndex = "1000";
    document.getElementsByTagName("body")[0].appendChild(link);
};
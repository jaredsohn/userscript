// ==UserScript==
// @name           Go Home Clickly
// @author         sanguinepenguinx
// @version        1.1
// @namespace      http://what.cd
// @description    Goes to the Top or Bottom of a Page
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

window.addEventListener("dblclick",gohome,true);

function gohome() {
    if (window.pageYOffset < window.innerHeight) window.scrollTo(0,document.body.scrollHeight);
    else window.scrollTo(0,0);
};
// ==UserScript==
// @name	Facebook Nastaleeq
// @namespace   http://blog.muhasab.info
// @description	Facebook Nastaleeq font conversion for Urdu Community.
// @author	Muhammad Sabir
// @homepage    http://userscripts.org/users/351380
// @include	http://*facebook.com/*
// @include	https://*facebook.com/*
// ==/UserScript==

function UrduStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

UrduStyle('*[dir=rtl], html[dir=rtl] > body,  div[dir=rtl], span[dir=rtl], .entry-body, .direction_rtl, ._1rv, .rtl, .inputtext, .webMessengerMessageGroup, html[dir=rtl] * {    font-family: "Jameel Noori Nastaleeq","Urdu Typesetting","Alvi Nastaleeq","Pak Nastaleeq","Nafees Web Naskh","Urdu Naskh Asiatype",Tahoma!important;    font-size: 130%;}');
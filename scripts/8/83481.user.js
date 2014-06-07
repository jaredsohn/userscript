// ==UserScript==
// @name           GReadable - improved readability for Google Reader
// @namespace      http://www.vcarrer.com
// @author         Vladimir Carrer
// @description    Improves the reading inside the Google Reader text columns
// @include        http://google.com/reader/*
// @include        http://*.google.com/reader/*
// @include        https://google.com/reader/*
// @include        https://*.google.com/reader/*
// @include        https://google.co.uk/reader/*
// @include        https://*.google.co.uk/reader/*
// @include        http://*.google.it/reader/*
// @include        https://*.google.it/reader/*
// @include        http://*.google.com.br/reader/*
// @include        https://*.google.com.br/reader/*

// ==/UserScript==

  
(function(){
var h = document.getElementsByTagName("head")[0];         
var c = document.createElement('style');
c.type = 'text/css';
c.innerHTML  = '#current-entry {font-size:21px;line-height:1.6; font-family:georgia;}.entry .entry-body,.entry .entry-title, .entry .entry-likers{max-width:90%;}.entry-container{color:#111;}p{margin:0 0  13px 0;}h1,h2,h3,h4,h5,h6{margin:0 0 5px 0;font-weight:normal;}h1{font-size:1.6em; line-height:1.18;} h2{font-size: 1.5em; line-height:1.19;}h3{font-size: 1.4em; line-height:1.24;} h4{font-size: 1.3em; line-height:1.23;} h5,h6 {font-size:1em; line-height:1.3;font-weight:700;}';
h.appendChild(c);
})();
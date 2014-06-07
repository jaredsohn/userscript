// ==UserScript==
// @name           Creep Overload! :{
// @namespace      http://www.thetalentshow.org
// @description    Cute Overload becomes much more disturbing and hilarious when you remove the media.
// @include        http://mfrost.typepad.com/cute_overload/*
// ==/UserScript==

mystylesheet =  '' +
'body {font-family: Verdana, sans-serif; color: black; background: #FFE;}' +
'h1 {font: 16pt Georgia, serif;}' +
'h2 {font-size: 12pt;}' +
'h3 {font-size: 11pt;}' +
'h4 {font-size: 10pt;}' +
'a:link {color: #0000AA;}' +
'a:hover {color: #000088; background: #EEEEFF;}' +
'a, div, p, dd, li {font-size: 10pt; line-height: 170%;}' +
'img {display:none;}' +
'embed {display:none;}'

window.addEventListener("load", function(e) {


    // Define the new stylesheet for the page & attach it
    var newstyle = document.createElement("style")
    newstyle.type = "text/css"
    var css = document.createTextNode(mystylesheet)
    newstyle.appendChild(css)
    document.getElementsByTagName('head')[0].appendChild(newstyle)
}, false)

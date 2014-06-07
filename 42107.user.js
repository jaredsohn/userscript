// ==UserScript==
// @name           Punch an' Pie Link Style striping
// @namespace      77087
// @description    Remove the ugly style around the "Punch an' Pie" links
// @include        http://www.punchanpie.net/cgi-bin/*
// ==/UserScript==

mystylesheet =  '' +
'body,td,th {' +
'	color: #CCCCCC;'+
'	font-family: Geneva, Arial, Helvetica, sans-serif;'+
'}'+
'body {'+
'	background-color: #660066;'+
'}'+
'.style3 {color: #660066}'+
'.style4 {font-size: 12px}'+
'a:link {'+
'	text-decoration: underline;'+
'}'+
'a:visited {'+
'	text-decoration: underline;'+
'}'+
'a:hover {'+
'	text-decoration: none;'+
'	color: #FFFFFF;'+
'}'+
'a:active {'+
'	text-decoration: underline;'+
'}'+
'.style6 {font-size: 10px}'+
'.style7 {color: #993399}'

window.addEventListener("load", function(e) {
    // Remove the existing embedded and linked stylesheets
    var styles = document.getElementsByTagName('style')
    while (styles[0])
        styles[0].parentNode.removeChild(styles[0])

    // Define the new stylesheet for the page & attach it
    var newstyle = document.createElement("style")
    newstyle.type = "text/css"
    var css = document.createTextNode(mystylesheet)
    newstyle.appendChild(css)
    document.getElementsByTagName('head')[0].appendChild(newstyle)
}, false)


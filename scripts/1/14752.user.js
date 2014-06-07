// Boring CSS
// version 0.6
// 2009-01-02
// Copyright (c) 2007, Eric Talevich
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need Greasemonkey
// 0.3 or later: http://greasemonkey.mozdev.org/ Then restart Firefox and
// revisit this script.  Under Tools, there will be a new menu item to "Install
// User Script".  Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select "Boring CSS", and
// click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Boring CSS
// @description   Replaces each page's CSS with a minimal stylesheet.
// @include       http://*.com/blog/*
// @include       http://*.com/blogs/*
// @include       http://*.com/weblogs/*
// @include       http://*.blogger.com/*
// @include       http://*.blogspot.com/*
// @include       http://*.googlepages.com/*
// @include       http://*.typepad.com/*
// @include       http://*.wordpress.com/*
// @include       http://*.blogs.it/*
// @include       http://blogs.*.com/*
// @include       http://*.wikipedia.org/*
// @include       http://*.arstechnica.com/*
// @include       http://www.codeproject.com/*
// @exclude       http://www.blogger.com/*
// @exclude       http://www.blogspot.com/*
// @exclude       http://www.googlepages.com/*
// @exclude       http://www.typepad.com/*
// @exclude       http://www.wordpress.com/*
// @exclude       http://wordpress.com/*
// ==/UserScript==

mystylesheet =  '' +
'body {font-family: Verdana, sans-serif; color: black; background: #FFE;}' +
'h1 {font: 16pt Georgia, serif;}' +
'h2 {font-size: 12pt;}' +
'h3 {font-size: 11pt;}' +
'h4 {font-size: 10pt;}' +
'a:link {color: #00A;}' +
'a:visited {color: #666;}' +
'a:hover {color: #008; background: #EEF;}' +
'a, div, p, dd, li {font-size: 10pt; line-height: 170%;}'

window.addEventListener("load", function(e) {
    // Remove the existing embedded and linked stylesheets
    var styles = document.getElementsByTagName('style')
    while (styles[0])
        styles[0].parentNode.removeChild(styles[0])

    var links = document.getElementsByTagName('link')
    for (var i=0; i < links.length; ++i ) {
        var link = links[i]
        if (link.getAttribute('rel').toLowerCase() == 'stylesheet') {
            link.parentNode.removeChild(link)
            i-- // Since we popped a node, the indexes shift by 1
        }
    }

    // Define the new stylesheet for the page & attach it
    var newstyle = document.createElement("style")
    newstyle.type = "text/css"
    var css = document.createTextNode(mystylesheet)
    newstyle.appendChild(css)
    document.getElementsByTagName('head')[0].appendChild(newstyle)
}, false)


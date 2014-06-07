// Remove Wonkette posts from Swampland
// Version 0.0.1
//
// Copyright (c) 2007 LonewackoDotCom
// Released under the GPL License
//
// Removes posts from Time's Swampland blog that are
// written by Wonkette (Ana Marie Cox)
//
// ==UserScript==
// @name Wonkette Bye Bye
// @namespace http://lonewacko.com/
// @description Remove Wonketteishness from Swampland
// @include http://time-blog.com/swampland/*
// @include http://*.time-blog.com/swampland/*
// ==/UserScript==

var spans = document.getElementsByTagName( "span" );
for ( i = 0; i < spans.length; i++ ) {
span = spans[ i ];

if ( span.className == "postedby" &&
span.innerHTML.match( "Ana Marie Cox" ) ) {
span.parentNode.parentNode.style.display = "none";
}
}

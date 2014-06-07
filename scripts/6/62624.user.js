//
// Written by Faisal Deshmukh
// Script Version: 1.0
//
//
// ==UserScript==
// @name           Indian express single page news content
// @namespace      -
// @description    Displays news content on a single page instead of multiple pages
// @include        http://www.indianexpress.com/*
// ==/UserScript==




var anchors = document.getElementsByTagName('a');
//alert('boogeyman is here');

for ( var i = 0; i < anchors.length; i++ ) 
{

    var link = anchors[i].href.replace( /^http:\/\/(.*\.)?www.indianexpress\.com\/news\/(.*)$/, "http://www.indianexpress.com/news/$20" );
    anchors[i].href = link;

}
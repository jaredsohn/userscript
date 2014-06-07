// ==UserScript==
// @name           U like
// @namespace      ulike
// @description    no need to like groups to see hidden content
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==

   
show_hidden();
function show_hidden()
{
    var spanArray = window.parent.parent.parent.document.getElementsByTagName('span'); 
    var number_spans = spanArray.length ;
    for( var num11 = 0; num11 < number_spans ; num11++ )
    {
        var target = spanArray[ num11 ] ;
        target.style.visibility = "visible";
    } 
} 


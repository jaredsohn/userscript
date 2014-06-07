// ==UserScript==
// @name           pixiv direct links
// @namespace      d4rkie
// @include        http://img*.pixiv.net/*
// ==/UserScript==

var cell = document.body;

if ( cell.hasChildNodes() )
{
    while ( cell.childNodes.length >= 1 )
    {
        cell.removeChild( cell.firstChild );       
    } 
}

var image = document.createElement('img');
image.src = window.location.href;
document.body.appendChild(image)
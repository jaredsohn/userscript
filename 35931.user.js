// ==UserScript==
// @name           MIT OCW
// @namespace      MIT_OCW
// @include        http://ocw.mit.edu/OcwWeb/*/LectureNotes/*
// ==/UserScript==


var links = document.getElementsByTagName("A");
var urlTest = /mitstorage\.download\.akamai\.com\/(.*)$/;
var urlTest2 = /archive\.org\/stream\/(.*?)/;
for( var i = 0; i < links.length; i++ )
{
    if( String(links[i].href).match( urlTest ) )
    {
        links[i].href = 'http://ocw.mit.edu/ans' + RegExp.$1;
    }
    else if( String(links[i].href).match( urlTest2 ) )
    {
        links[i].href = 'http://www.archive.org/download/' + RegExp.$1;    
    }

}
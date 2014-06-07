// ==UserScript==
// @name 	Remove _thumb
// @namespace 	Remove_thumb
// @description 	Removes _thumb
// @date 	2009-2-26
// @include 	http://www.coltstudiogroup.com/gallery/*
// ==/UserScript==

var a = document.getElementsByTagName("a");
for (var i=0; i<a.length; i++)
{
    var link = a[i].getAttribute("href");
    var index = link.search(/_thumb/);
    if (index != -1)
    {
        var linkStart = link.substring(0, index);
        var linkEnd = link.substring(index+6, link.length);
        a[i].setAttribute("href", linkStart + linkEnd);
    }
}
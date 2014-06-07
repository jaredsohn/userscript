// ==UserScript==
// @name           devil404
// @namespace      http://readerofthreads.com/devil404
// @description    Makes the forum a little bit more coherent
// @include        http://www.take2.co.za/*
// ==/UserScript==

var allLinks = document.getElementsByTagName("A");

for (var i = 0; i < allLinks.length; i++)
{
    var thisLink = allLinks.item(i);
    var linkRef = thisLink.href;
    if (linkRef.indexOf('=5761') != -1 && thisLink.parentNode.nodeName == "DT")
    {
        var findPost = thisLink;       
        findPost = findPost.parentNode.parentNode.parentNode;
        while (findPost.nodeName != "DIV")
        {
        	findPost = findPost.nextSibling;
        }
        findPost.innerHTML = "";   
    }
}
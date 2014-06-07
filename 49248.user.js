// ==UserScript==
// @name           I'm the best!
// @namespace      http://readerofthreads.com/thebest
// @description    Makes my posts even more amazing
// @include        http://www.take2.co.za/*
// ==/UserScript==

var allLinks = document.getElementsByTagName("A");

for (var i = 0; i < allLinks.length; i++)
{
    var thisLink = allLinks.item(i);
    var linkRef = thisLink.href;
    if (linkRef.indexOf('=4646') != -1 && thisLink.parentNode.nodeName == "DT")
    {
        var findPost = thisLink;       
        findPost = findPost.parentNode.parentNode.previousSibling.previousSibling.firstChild;
        while (findPost.nodeName != "DIV")
        {
        	findPost = findPost.nextSibling;
        }
        findPost.innerHTML = "<h3>I'm the best!</h3>";   
    }
    else if (linkRef.indexOf('=4646') != 0 && thisLink.parentNode.nodeName == "DT")
    {
    	  var findPost = thisLink;       
        findPost = findPost.parentNode.parentNode.previousSibling.previousSibling.firstChild;
        while (findPost.nodeName != "DIV")
        {
        	findPost = findPost.nextSibling;
        }
        findPost.innerHTML = "I suck!"; 
    } 
}
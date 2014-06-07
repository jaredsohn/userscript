// ==UserScript==
// @name           troll-b-gone (blog.hu edition)
// @namespace      none
// @description    Blog.hu trollfilter
// @include        http://*.blog.hu/*
// ==/UserScript==

// script based on martonx's blog.hu filter
// send bugreports to pulsewidth1 (at) gmail (dot) com

// UserIDs
// quick and dirty hack, storing userIDs this way saves us 2 JS function calls per parsing cycle
var trollURLs = ['http://blog.hu/user/123','http://blog.hu/user/456','http://blog.hu/user/789'];

var allLinks, thisLink;

// get all links from the page
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (i = 0; i < allLinks.snapshotLength; i++)
{
   thisLink = allLinks.snapshotItem(i);
   
   profileURL = thisLink.getAttribute("href");

   for(j = 0; j < trollURLs.length; j++)
   {
      //match
      if(profileURL == trollURLs[j])
      {
         // user HREF -> commentAuthor SPAN -> H1 -> comment DIV
         commentDiv = thisLink.parentNode.parentNode.parentNode;
         commentDiv.innerHTML = "bla";
         break;
      }
   }
}

// EOF
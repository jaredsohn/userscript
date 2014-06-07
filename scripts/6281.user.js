// ==UserScript==
// @name           Yahoo Music from YouTube
// @description    The best way to view Yahoo Music videos is to view them in YouTube..
// @include        http://*launch.yahoo.com/*
// @include        http://*music.yahoo.com/*
// ==/UserScript==


window.onload = function ()
{
  var allTheLinks = document.getElementsByTagName("a");
  var searchQuery,theLink;

  for (i=0; i<allTheLinks.length; i++)
  {
    theLink = allTheLinks[i];
    if (theLink.className == "w11" && theLink.target == "_top")
    { 
      searchQuery = theLink.parentNode.innerHTML.replace(/<\/a><br>/," ").substr(71);
      theLink.href = "http://youtube.com/results?search_query="+searchQuery+"";
      theLink.target = "";
      theLink.style.color = "orange";
    }
  }
}

// if you can improve the script to support more links (and not only the ones in the main page)
// or you can improve enything else, then send me a mail:
// liorwohl@gmail.com

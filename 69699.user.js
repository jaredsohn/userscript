// ==UserScript==
// @name           4Chan No Truncate
// @namespace      http://localhost/NoTruncate
// @description    No post number truncating in 4 chan
// @include        http://boards.4chan.org/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

var linkRegex = /\/res\/(\d+)#q(\d+)$/;
var quoteRegex= /javascript:quote\(\'(\d+)\'\)/;

for (var i =0; i < links.length; i++)
{
  var link = links[i];
  var result = linkRegex.exec(link.href);
  if (result != null)
  {
    link.innerHTML = result[2];
  }
  else 
  {
    result = quoteRegex.exec(link.href);
    if (result != null)
    {
      link.innerHTML = result[1];
    }
  }
}

/* Apple Buttons Fix version 0.3

   Created 01/10/2005
   Copyright (c) 2005, Released under the GPL http://www.gnu.org/copyleft/gpl.html
   Created by David Elentok, 3david@gmail.com

   As you may have noticed, apple are now using .mov files as buttons in the high
   definition trailers pages, what this script does is change these buttons into
   normal links (because they mess up the mplayer mozilla-plugin). */

// ==UserScript==
// @name          Apple Buttons Fix
// @namespace     http://www.ee.bgu.ac.il/~elentok
// @description   Change ".mov" buttons to standard links in apple's high-def trailers
// @include       http://trailers.apple.com/*
// ==/UserScript==


document.convertObjects = function ()
{
  var items = document.getElementsByTagName ("OBJECT");
  for (var i=0; i<items.length; i++)
  {
    params = items[i].getElementsByTagName("PARAM")
    for (var j=0; j<params.length; j++)
    {
      if (params[j].name && params[j].name=="href")
      {
        href = params[j].value;

        newNode = document.createElement("a")
        newNode.appendChild(document.createTextNode(href))
        newNode.setAttribute("href", href)

      }
    }
    if (!newNode)
      newNode=document.createTextNode("ERROR: no href found")
    items[i].parentNode.replaceChild(newNode, items[i])
  }
}

document.convertObjects()

for (var i=1; i<10; i++)
  window.setTimeout("document.convertObjects();", 100*i); 

window.addEventListener("load", function(){
  document.convertObjects();
}, true);

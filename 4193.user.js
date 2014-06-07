// ==UserScript==
// @name          Universeum resizer
// @description	  Resize frame on universeum webbpage
// @include       http://www.universeum.se/index.asp?*
// @include       http://universeum.se/index.asp?*
// ==/UserScript==

// <frameset rows="51,320,*" frameborder="NO" border="0" framespacing="0">

framesets = document.getElementsByTagName("frameset");

for (i = 0; i < framesets.length; i++)
{
  if (framesets.item(i).rows == "51,320,*")
  {
    framesets.item(i).rows = "51,*,70";
  }
}

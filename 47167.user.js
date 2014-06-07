// ==UserScript==
// @name           XNA - Open Unread
// @namespace      http://www.zolomon.eu
// @description    Opens every unread thread at http://forums.xna.com/forums/TopicsNotRead.aspx in a new tab/window.
// @include        http://forums.xna.com/forums/TopicsNotRead.aspx
// @version        0.1
// @author         Nick Gravelyn
// @maintainer     Zolomon
// ==/UserScript==

var myreg = /\<a href="(.+?)"\>Last Post\<\/a\>/g;
var i = 0;
for (i = 0; i < 20; i++)
{
   var match = myreg.exec(document.documentElement.innerHTML);
   if (match.length == 2)
      window.open(match[1], '', '');
}

void(0);
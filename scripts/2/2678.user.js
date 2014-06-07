// Enhance Tree
// version 0.1 BETA!
// 2006-01-19
// Copyright (c) 2006, Castagno Raffaele (raffaele.castagnoATgmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Crosspost", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Enhanced Tree
// @namespace 
// @description adds a visual tree to google groups structured view of threads
// @include *browse_frm*
// @include *browse_frm*
// ==/UserScript==

var tts = document.getElementsByTagName('tt');

if (tts.length) 
{
  var tts_len = tts.length;
  var tt;
  var base = new Array(tts_len);
  for(idx=0; idx<tts_len; idx++)
  {
    var tt = tts[idx];
    var inn = tt.innerHTML;
    var tokens = inn.split(';').length;
    base[idx] = new Array(tokens);
    base[idx][tokens-1] = '';
  }
  createTree(base);
  for(idx=0; idx<tts_len; idx++)
  {
    tts[idx].innerHTML = base[idx].join('');
  }
} 

function createTree(base)
{
  var last_len = 0;
  for(x = base.length-1; x>=0; x--)
  {
    var line = base[x];
    var len = line.length;

    for(y = len-1; y>=0; y--)
    {
      if(x==0 && y==0)
        line[y] = '\u252C';
      else if(y==len-1)
      {
        line[y] = '\u2514';
      }
      else
        line[y] = '&nbsp';
    }
    
    if (x<base.length-1)
    {
      var oldLine = base[x+1];
      var refLen = Math.min(oldLine.length, line.length);
      for(i=0; i<refLen; i++)
      {
        if(oldLine[i] == '\u2514' || oldLine[i]=='\u2502')
          line[i] = '\u2502';
      }
    }
    last_len = len;
    base[x] = line;
  }
  return;
}
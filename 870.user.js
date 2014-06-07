// Remove Xeni posts from BoingBoing
// Release 0.0.1
// This software is licensed under the GPL
//
// Copyright 2005 Jesse Andrews (anotherjesse@gmail.com)
//
// About:
//
// No offense to Xeni, but every so often her posts are over the top (for
// work), so this script will remove all her posts from boingboing.
// Perhaps it would be enough to remove those that link to fleshbot, since
// almost always not work safe...  
// 

// ==UserScript==
// @name          de-Xeni
// @namespace     http://overstimulate.com
// @description   Get rid of Xeni's posts
// @include       http://boingboing.net*
// @include       http://www.boingboing.net*
// ==/UserScript==

if ( document.getElementById('content') != null ) {
  d = document.getElementById('content')
  k = d.childNodes;
  bad = 0
  for (i = k.length-1; i>=0; i--) {
    try {
      if (k[i].className == 'posted') {
         if ( k[i].innerHTML.match('Xeni')) bad = 1;
         else bad = 0;
      }
    } catch (e) {}
  if (bad) d.removeChild(k[i])
  }
}

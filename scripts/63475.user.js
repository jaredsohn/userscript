//
// Go straight to the content and bypass any warnings.
//

// ==UserScript==
// @name          Fixup Craigslist Links to go Straight to Content
// @description   Bypasses Craigslist links that post warnings or other things and goes straight to the content.
// @include       http://*.craigslist.tld/*
// ==/UserScript==

var all_a = document.getElementsByTagName('a');

for (var i = 0; i < all_a.length; i++) {
  this_a = all_a[i];

  if ( this_a.href && this_a.href.match( /\/cgi-bin\//i ) )  {
    this_a.href = this_a.href.replace( /\/cgi-bin.*\??\&?category=(.*)/i, "/$1" )
  }
}

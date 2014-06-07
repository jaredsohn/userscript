// ==UserScript==
// @name          BlogLeft
// @namespace     http://sniggle.net/
// @description   trims the Bloglines left frame
// @include       http://www.bloglines.com/myblogs_subs*
// @include       http://bloglines.com/myblogs_subs*
// ==/UserScript==

// Dump the Bloglines graphic at the top
// It's a <div> with class=header-list.  Remove it.
// Also remove the extra <p> spacer

Divs = document.getElementsByTagName("div");
for( var i = Divs.length-1; i >= 0; i-- )
{
  Div = Divs[i];
  if( Div.className == 'header-list' )
  {
    Div.parentNode.removeChild( Div );
  }
  if( Div.className == 'hnav' )
  {
//            #text         P
    p = Div.nextSibling.nextSibling;
    p.parentNode.removeChild( p );
  }
}

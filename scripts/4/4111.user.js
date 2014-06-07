// ==UserScript==
// @name           Blogspot default comment form enforcer
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Replaces all links to the Blogger popup comment form with links to the default comment form.
// @include        http://*.blogspot.com/*
// ==/UserScript==

var com_link_re = /^http:..www.blogger.com.comment.g\?blogID=\d+&postID=\d+/i;
Array.prototype.slice.call( document.links ).map( unpopup_when_comment_link );

function unpopup_when_comment_link( a )
{
  var com_link = a.href.match( com_link_re );
  if( com_link )
  {
    a.href = com_link[0]; // drop trailing junk URL parameters (i e popup mode)
    a.removeAttribute( 'onclick' ); // and don't pop up any windows or the like
  }
}

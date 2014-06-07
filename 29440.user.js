// ==UserScript==
// @name           Google Sites lists fixer
// @namespace      http://i1t2b3.net
// @description    Makes lists look as normal ones - one item at line, with marker
// @include        http://sites.google.com/*
// ==/UserScript==

var c = document.getElementById('COMP_page-subpages');
if( !c ) return false;

tags = c.getElementsByTagName( 'LI' );
for( var i=0; i < tags.length; i++ )
{
  tags[i].style.display = 'list-item';
  tags[i].style.listStyleType = 'circle';
  tags[i].style.padding = '2px';
  tags[i].style.marginLeft = '2em';
}
//
// ==UserScript==
// @name          HWMCOM colored durability
// @description  Inventory arts durability in colors
// @include       http://www.lordswm.com/inventory.php
// ==/UserScript==


var url = 'http://www.lordswm.com/' ;
var url_cur = location.href ;

var els = document.getElementsByTagName( 'li' );
var item_hard_regexp = /: (\d+)\/(\d+)/

for( var i = 0; i < els.length; i++ )
{
  var el = els[i];
  if( el.innerHTML.match(/\Durability: /) )
  {
    p = item_hard_regexp.exec( el.innerHTML ) ;
    hard_g = p[2] ;
    hard_c = p[1] ;
    if( hard_c == 0 )
    {
      el.parentNode.parentNode.parentNode.style.background = '#FFA07A' ; // 0
    } else if( hard_c < hard_g*0.33 )
    {
      el.parentNode.parentNode.parentNode.style.background = '#F0E68C' ; // < 33%
/*
    } else if( hard_c < hard_g*0.66 )
    {
      el.parentNode.parentNode.parentNode.style.background = '#D3D3D3' ; // < 66%
*/
    }
  }
}
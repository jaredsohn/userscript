//
// ==UserScript==
// @name          HWM colored strength new lot
// @description   colored strength auction new lot
// @include       http://www.heroeswm.com/auction_new_lot.php
// ==/UserScript==


var url = 'http://www.heroeswm.com/' ;
var url_cur = location.href ;

var els = document.getElementsByTagName( 'option' );
var item_hard_regexp = / (\d+)\/(\d+)/

for( var i = 0; i < els.length; i++ )
{
  var el = els[i];
  if( ( hard_par = item_hard_regexp.exec( el.innerHTML ) ) )
  {
    hard_g = hard_par[2] ;
    hard_c = hard_par[1] ;
    item = el ;
    if( hard_c <= hard_g*0.15 )
    {
      item.style.border = '1px solid #F00' ; // 0
      item.style.background = '#FFC0CB' ;
    } else if( hard_c <= hard_g*0.33 )
    {
      item.style.border = '1px solid #F00' ; // < 25%
      item.style.background = '#FFC0CB' ;
    } else if( hard_c <= hard_g*0.50 )
    {
      item.style.border = '1px solid #FFD700' ; // < 50%
      item.style.background = '#EEE8AA' ;
    } else if( hard_c < hard_g*1 )
    {
      item.style.border = '1px solid #00F' ; // < 100%
      item.style.background = '#87CEEB' ;
    } else if( hard_c == hard_g )
    {
      item.style.border = '1px solid #008000' ; // =100%
      item.style.background = '#90EE90' ;
    }
  }
}
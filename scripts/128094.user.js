//
// ==UserScript==
// @name          HWM colored strength auction MOD
// @description   colored strength auction
// @include       http://www.heroeswm.ru/auction.php?*
// ==/UserScript==


var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;

var els = document.getElementsByTagName( 'a' );
var item_hard_regexp = /\: (\d+)\/(\d+)/
var item_hard_regexp2 = /<b>(\d+)<\/b><\/font>\/(\d+)/

for( var i = 0; i < els.length; i++ )
{
  var el = els[i];
  if( el.href.match(/auction_lot_protocol.php/) && el.href!=els[i-1].href )
  {
    if( ( hard_par = item_hard_regexp.exec( el.parentNode.innerHTML ) ) || ( hard_par = item_hard_regexp2.exec( el.parentNode.innerHTML ) ) )
    {
      hard_g = hard_par[2] ;
      hard_c = hard_par[1] ;
      item = el.parentNode.parentNode.firstChild ;
      if( hard_c <= hard_g*0.15 )
      {
        item.style.background = '#B00' ; // 0
	item.style.border="medium solid Orangered";
      } else if( hard_c <= hard_g*0.33 )
      {
        item.style.background = '#FFa000' ; // < 25%
	item.style.border="medium solid Coral";
      } else if( hard_c <= hard_g*0.50 )
      {
        item.style.background = '#FFD700' ; // < 50%
	item.style.border="medium solid gold";
      } else if( hard_c < hard_g*1 )
      {
        item.style.background = '#AAF' ; // < 100%
	item.style.border="medium solid Darkturquoise";
      } else if( hard_c == hard_g )
      {
        item.style.background='#00F000 center right' ; // =100%
	item.style.border="medium solid Limegreen";
      }
    }
  }
}
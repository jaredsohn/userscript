//
// ==UserScript==
// @name          HWM colored strength auction
// @description   colored strength auction
// @include       http://www.heroeswm.com/auction.php?*
// ==/UserScript==


var url = 'http://www.heroeswm.com/' ;
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
        item.style.background = '#F00' ; // 0
      } else if( hard_c <= hard_g*0.33 )
      {
        item.style.background = '#FFC0CB' ; // < 25%
      } else if( hard_c <= hard_g*0.50 )
      {
        item.style.background = '#FFD700' ; // < 50%
      } else if( hard_c < hard_g*1 )
      {
        item.style.background = '#00F' ; // < 100%
      } else if( hard_c == hard_g )
      {
        item.style.background = '#008000' ; // =100%
      }
    }
  }
}
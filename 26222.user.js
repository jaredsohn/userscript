//
// ==UserScript==
// @name          HWM cyfral strength
// @description   cyfral strength
// @include       http://www.heroeswm.com/home.php
// @include       http://www.heroeswm.com/pl_info.php?*
// @include       http://www.heroeswm.com/inventory.php
// ==/UserScript==


var url = 'http://www.heroeswm.com/' ;
var url_cur = location.href ;

var els = document.getElementsByTagName( 'a' );
var item_hard_regexp = /: (\d+)\/(\d+)/

if( url_cur == 'http://www.heroeswm.com/inventory.php' )
{
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.href.match(/pull_off=/) && el.firstChild.getAttribute( 'width' ) == 50 )
    {
      p = item_hard_regexp.exec( el.firstChild.title ) ;
      d = document.createElement( 'div' );
      d.innerHTML = p[1] ;
      d.style.fontSize = '9px' ;
      d.style.padding = '0px 1px' ;
      d.style.border = '1px solid #eecd59' ;
      d.style.margin = '2px' ;
      d.style.background = '#FFF' ;
      d.style.position = 'absolute' ;
      el.parentNode.insertBefore( d , el ) ;
    }
  }

} else
{
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.href.match(/art_info.php/) && el.firstChild.getAttribute( 'width' ) == 50 )
    {
      p = item_hard_regexp.exec( el.firstChild.title ) ;
      d = document.createElement( 'div' );
      d.innerHTML = p[1] ;
      d.style.fontSize = '9px' ;
      d.style.padding = '0px 1px' ;
      d.style.border = '1px solid #eecd59' ;
      d.style.margin = '2px' ;
      d.style.background = '#FFF' ;
      d.style.position = 'absolute' ;
      el.parentNode.insertBefore( d , el ) ;
    }
  }
}
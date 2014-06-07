// ==UserScript==
// @name           hwmtransnick
// @description    HWM set link & nick for transfer
// @include        http://www.heroeswm.com/pl_info.php?*
// @include        http://www.heroeswm.com/transfer.php?*
// ==/UserScript==

var url_cur = location.href ;
var url = 'http://www.heroeswm.com/' ;

if( url_cur.indexOf('pl-info.php') )
{
  var els = document.getElementsByTagName('a');
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.href.match(/http:\/\/www\.heroeswm\.com\/sms-create\.php.*/) )
    {
      itemname_r = /mailto=(.+)/ ;
      item_name = itemname_r.exec( el.href ) ;
      a = document.createElement( 'a' );
      a.href = url + 'transfer.php?nick=' + item_name[1] ;
      a.title = 'Transfer resources' ;
      a.style.textDecoration = 'none'
      a.innerHTML = 'Transfer resources' ;
      el.parentNode.insertBefore( a , el.nextSibling ) ;
      el.parentNode.insertBefore( document.createTextNode( '/' ) , el.nextSibling ) ;
      break;
    }
  }
}


if( url_cur.indexOf('transfer.php') )
{
  itemname_r = /nick=(.+)&?/ ;
  item_name = itemname_r.exec( url_cur ) ;
  var els = document.getElementsByTagName('input');
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.name == 'nick' && el.type == 'text' )
    {
      el.value = item_name[1] ;
      break ;
    }
  }
}
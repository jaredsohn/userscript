// ==UserScript==
// @name           Lgnd.ru statistics link
// @description    Create link like http://pl_id.lgnd.ru for quick access player's statistic
// @include        http://www.heroeswm.ru/pl_info.php?*
// @include        http://qrator.heroeswm.ru/pl_info.php?*
// @include        http://178.248.235.15/pl_info.php?*
// @include        http://www.lordswm.com/pl_info.php?*
// ==/UserScript==

var url_cur = location.href ;
var url = '.lgnd.ru' ;

var els = document.getElementsByTagName('a');

for( var i = 0; i < els.length; i++ )
{
  var el = els[i];
  if( el.href.match(/http:\/\/www\.heroeswm\.ru\/pl_cardlog\.php*/) )
  {
    pattern = /id=(.+)/ ;
	temp = pattern.exec( el.href ) ;
	var pl_id = temp [1];
	
    break;
  }
}

for( var i = 0; i < els.length; i++ )
{
  var el = els[i];
  if( el.href.match(/http:\/\/www\.heroeswm\.ru\/sms-create\.php.*/) )
  {
    a = document.createElement( 'a' );
    a.href = 'http://' + pl_id + url ;

	str = '\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 lgnd.ru' ;
    a.title = str;
    a.style.textDecoration = 'none'
    a.innerHTML = str;
    el.parentNode.insertBefore( a , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( '/' ) , el.nextSibling ) ;
    break;
  }
}

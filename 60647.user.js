// ==UserScript==
// @name           hwmelementstransnick
// @description    HWM set link & nick for elements transfer
// @include        http://www.heroeswm.ru/pl_info.php?*
// @include        http://www.heroeswm.ru/el_transfer.php?*
// ==/UserScript==

var url_cur = location.href ;
var url = 'http://www.heroeswm.ru/' ;

if( url_cur.indexOf('pl-info.php') )
{
  var els = document.getElementsByTagName('a');
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.href.match(/http:\/\/www\.heroeswm\.ru\/sms-create\.php.*/) )
    {
      itemname_r = /mailto=(.+)/ ;
      item_name = itemname_r.exec( el.href ) ;
      a = document.createElement( 'a' );
      a.href = url + 'el_transfer.php?nick=' + item_name[1] ;
      a.title = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b' ;
      a.style.textDecoration = 'none'
      a.innerHTML = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b' ;
      el.parentNode.insertBefore( a , el.nextSibling ) ;
      el.parentNode.insertBefore( document.createElement('br') , el.nextSibling ) ;
      break;
    }
  }
}

function urlDecode(string) {
	var codes = '%E0%E1%E2%E3%E4%E5%B8%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF';
	codes += '%C0%C1%C2%C3%C4%C5%A8%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF';
	codes = codes.split('%');
	var chars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	chars += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
	for (var i=0; i<codes.length; i++) string = string.split('%'+codes[i+1]).join(chars[i]);
	return string;
}

if( url_cur.indexOf('el_transfer.php') )
{
  itemname_r = /nick=(.+)&?/ ;
  item_name = itemname_r.exec( url_cur ) ;
  var els = document.getElementsByTagName('input');
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.name == 'nick' && el.type == 'text' )
    {
      el.value = urlDecode(item_name[1]);
      break ;
    }
  }
}
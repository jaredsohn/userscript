// ==UserScript==
// @name          hwmmenumod
// @homepage      http://hwm.xo4yxa.ru/js/menumod/
// @description   HWM menu mod
// @include       http://www.heroeswm.ru/*
// @include       http://heroeswm.ru/*
// @exclude       http://www.heroeswm.ru/warlog.php?*
// ==/UserScript==

var menu_type = 0 ;
var pers_id = 967740 ; // яПНяПН яПНяПНяПНяПНяПНяПНяПНяПНяПН
var pers_fr = 1 ; // яПНяПНяПНяПНяПНяПНяПН яПНяПНяПНяПНяПНяПНяПНяПНяПН ( 1 яПНяПНяПНяПНяПНяПН, 2 яПНяПНяПНяПН, 3 яПНяПНяПН, 4 яПНяПНяПНяПН , 5 яПНяПНяПНяПНяПН, 6 яПНяПНяПНяПНяПНяПН яПНяПНяПНяПН , 7 яПНяПНяПНяПНяПН )

var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;

var fr_img = new Array( '' , 'r1.gif' , 'r2.gif', 'r3.gif' , 'r4.gif' , 'r5.gif' , 'r6.gif' , 'r7.gif' )
var fr_bid = new Array( '' , 'heaven_statue' , 'pillar_of_bones' , 'wizard_well' , 'luck_fountain' , 'barb_attack' , 'hall_of_intrigue' , '' )

var anchors = document.getElementById('a');

for( var i = 0; i < anchors.length; i++ )
{
  var el = anchors[i];
  if( pers_id != 0 && el.href.match(/http:\/\/www\.heroeswm\.ru\/home.php/) )
  {
    ar = document.createElement( 'a' );
    ar.href = url+'pl_hunter_stat.php?id=' + pers_id ;
    ar.title = '\u041b\u0438\u0447\u043d\u044b\u0435 \u0440\u0435\u043a\u043e\u0440\u0434\u044b' ;
    ar.style.fontWeight = 'bold' ;
    ar.style.textDecoration = 'none' ;
    ar.style.color = '#255216117' ;
    ar.innerHTML = 'Рекорды' ;
    el.parentNode.insertBefore( ar , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( '' ) , el.nextSibling ) ;

    au = document.createElement( 'a' );
    au.href = url+'pl_info.php?id=' + pers_id ;
    au.title = '\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435' ;
    if( pers_fr == 0 || !fr_img[pers_fr] )
    {
      au.style.fontStyle = 'italic' ;
      au.style.fontWeight = 'bold' ;
      au.style.textDecoration = 'none' ;
      au.style.color = '#00F' ;
      au.innerHTML = 'i' ;
    } else
    {
      au.innerHTML = '<img src="' + url + 'i/' + fr_img[pers_fr] + '" border="0" align="absmiddle">' ;
    }
    el.parentNode.insertBefore( au , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( ' ' ) , el.nextSibling ) ;
  }


  if( el.href.match(/http:\/\/www\.heroeswm\.ru\/roulette.php/) )
  {
    el.href= url+'army.php';
    el.innerHTML = menu_type == 0 ? '<b>\u0410\u0440\u043c\u0438\u044f</b>' : '<img src="' + url + 'i/s_morale.gif" border="0" align="absmiddle" title="\u0410\u0440\u043c\u0438\u044f">' ;

    am = document.createElement( 'a' );
    am.setAttribute("href", url+'sms.php' );
    am.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    am.innerHTML = '\u041f\u043e\u0447\u0442\u0430' ;
    el.parentNode.insertBefore( am , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    ai = document.createElement( 'a' );
    ai.setAttribute("href", url+'auction.php' );
    ai.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    ai.innerHTML = menu_type == 0 ? '\u0420\u044b\u043d\u043e\u043a' : '<img src="' + url + 'i/gold.gif" border="0" align="absmiddle" title="\u0420\u044b\u043d\u043e\u043a">' ;

    el.parentNode.insertBefore( ai , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    am = document.createElement( 'a' );
    am.setAttribute("href", url+'shop.php' );
    am.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    am.innerHTML = '\u041c\u0430\u0433\u0430\u0437\u0438\u043d' ;
    el.parentNode.insertBefore( am , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    ai = document.createElement( 'a' );
    ai.setAttribute("href", url+'inventory.php' );
    ai.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    ai.innerHTML = '\u0418\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044c' ;
    el.parentNode.insertBefore( ai , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    if( pers_fr != 0 || fr_bid[pers_fr] )
    {
      as = document.createElement( 'a' );
      as.href = url+'build_apply.php?bid=' + fr_bid[pers_fr] ;
      as.title = '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c' ;
      as.style.fontWeight = 'bold' ;
      as.style.textDecoration = 'none' ;
      as.style.color = '#00F' ;
      as.innerHTML = '#' ;
      el.parentNode.insertBefore( as , el.nextSibling ) ;
      el.parentNode.insertBefore( document.createTextNode( ' - ' ) , el.nextSibling ) ;
    }

    a = document.createElement( 'a' );
    a.setAttribute("href", url+'castle.php' );
    a.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    a.innerHTML = menu_type == 0 ? '\u0417\u0430\u043c\u043e\u043a' : '<img src="' + url + 'i/s_defence.gif" border="0" align="absmiddle" title="\u0417\u0430\u043c\u043e\u043a">' ;
    el.parentNode.insertBefore( a , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;
  }
}

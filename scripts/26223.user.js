// ==UserScript==
// @name          hwmmenumod
// @homepage      http://hwm.xo4yxa.ru/js/menumod/
// @description   HWM menu mod
// @include       http://www.heroeswm.com/*
// @include       http://heroeswm.com/*
// @exclude       http://www.heroeswm.com/warlog.php?*
// ==/UserScript==

var menu_type = 0 ;
var pers_id = 23527 ; // your id
var pers_fr = 5 ; // Factoin number ( 1 knight, 2 necr, 3 wizard, 4 elf , 5 barbarian, 6 dark elf, 7 demon )

var url = 'http://www.heroeswm.com/' ;
var url_cur = location.href ;

var fr_img = new Array( '' , 'r1.gif' , 'r2.gif', 'r3.gif' , 'r4.gif' , 'r5.gif' , 'r6.gif' , 'r7.gif' )
var fr_bid = new Array( '' , 'heaven_statue' , 'pillar_of_bones' , 'wizard_well' , 'luck_fountain' , 'barb_attack' , 'hall_of_intrigue' , '' )

var anchors = document.getElementsByTagName('a');

for( var i = 0; i < anchors.length; i++ )
{
  var el = anchors[i];
  if( pers_id != 0 && el.href.match(/http:\/\/www\.heroeswm\.com\/home.php/) )
  {
    ar = document.createElement( 'a' );
    ar.href = url+'pl_hunter_stat.php?id=' + pers_id ;
    ar.title = 'Personal records' ;
    ar.style.fontWeight = 'bold' ;
    ar.style.textDecoration = 'none' ;
    ar.style.color = '#00F' ;
    ar.innerHTML = 'o_O' ;
    el.parentNode.insertBefore( ar , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( ' ' ) , el.nextSibling ) ;

    au = document.createElement( 'a' );
    au.href = url+'pl_info.php?id=' + pers_id ;
    au.title = 'Character info' ;
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

  if( el.href.match(/http:\/\/www\.heroeswm\.com\/bselect.php/) )
  {
    if( menu_type == 1 ) el.innerHTML = '<img src="' + url + 'i/s_attack.gif" border="0" align="absmiddle" title="Combats">' ;

    a3 = document.createElement( 'a' );
    a3.setAttribute("href", url+'group_wars.php');
    a3.innerHTML = '3:3' ;
    el.parentNode.insertBefore( a3 , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' - ' ) , el.nextSibling ) ;
    a1 = document.createElement( 'a' );
    a1.setAttribute("href", url+'one_to_one.php' );
    a1.innerHTML = '1:1' ;
    el.parentNode.insertBefore( a1 , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( ': ' ) , el.nextSibling ) ;
  }

  if( el.href.match(/http:\/\/www\.heroeswm\.com\/roulette.php/) )
  {
    el.href= url+'army.php';
    el.innerHTML = menu_type == 0 ? '<b>Army</b>' : '<img src="' + url + 'i/s_morale.gif" border="0" align="absmiddle" title="Army">' ;

    am = document.createElement( 'a' );
    am.setAttribute("href", url+'sms.php' );
    am.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    am.innerHTML = 'Mail' ;
    el.parentNode.insertBefore( am , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    ai = document.createElement( 'a' );
    ai.setAttribute("href", url+'auction.php' );
    ai.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    ai.innerHTML = menu_type == 0 ? 'Market' : '<img src="' + url + 'i/gold.gif" border="0" align="absmiddle" title="Market">' ;

    el.parentNode.insertBefore( ai , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    am = document.createElement( 'a' );
    am.setAttribute("href", url+'shop.php' );
    am.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    am.innerHTML = 'Shop' ;
    el.parentNode.insertBefore( am , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    ai = document.createElement( 'a' );
    ai.setAttribute("href", url+'inventory.php' );
    ai.setAttribute("style", 'font-weight: bold;text-decoration:none;' );
    ai.innerHTML = 'Inventory' ;
    el.parentNode.insertBefore( ai , el.nextSibling ) ;

    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;

    if( pers_fr != 0 || fr_bid[pers_fr] )
    {
      as = document.createElement( 'a' );
      as.href = url+'build_apply.php?bid=' + fr_bid[pers_fr] ;
      as.title = 'Use' ;
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
    a.innerHTML = menu_type == 0 ? 'Castle' : '<img src="' + url + 'i/s_defence.gif" border="0" align="absmiddle" title="Castle">' ;
    el.parentNode.insertBefore( a , el.nextSibling ) ;
    el.parentNode.insertBefore( document.createTextNode( ' | ' ) , el.nextSibling ) ;
  }
}

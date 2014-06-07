// HWM art cost for 1 combat 
// (c) 2009, xo4yxa
//
// ==UserScript==
// @name			hwmcost1batl
// @homepage		http://hwm.xo4yxa.ru/js/cost1batl/
// @version		0.01b
// @description	HWM art cost for 1 combat 
// @include		http://www.heroeswm.ru/art_info.php?id=*
// ==/UserScript==

var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;
var b = document.getElementsByTagName( 'body' )[0] ;
var hard_regexp = /\u041f\u0440\u043e\u0447\u043d\u043e\u0441\u0442\u044c:\<\/b> (\d+)/ ;
var h = hard_regexp.exec( b.innerHTML ) ;
var e0 = getI( "//b[text()=' \u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0440\u0435\u043c\u043e\u043d\u0442\u0430:']" ).snapshotItem(0) ;
var e1 = e0.nextSibling.firstChild.firstChild.firstChild.nextSibling ;
var e2 = document.createElement( 'div' );
e2.innerHTML = '  Ремонт на 40% = ' + Math.floor( e1.innerHTML.replace( ',' , '' )*0.4 ) + '<br>'+'  Ремонт на 35% = ' + Math.floor( e1.innerHTML.replace( ',' , '' )*0.35 ) + '<br>'+'  Ремонт на 30% = ' + Math.floor( e1.innerHTML.replace( ',' , '' )*0.3 ) + '<br>'+'<br><b> \u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043e\u0434\u043d\u043e\u0433\u043e \u0431\u043e\u044f:</b><table border=0 cellspacing=0 cellpadding=0><tr><td><img width=24 height=24 src="i/gold.gif" border=0 title="������"></td><td>' + Math.floor( e1.innerHTML.replace( ',' , '' )*2.5*0.35/h[1] )+  '</td></tr></table><i>\u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043e\u0434\u043d\u043e\u0433\u043e \u0431\u043e\u044f \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u0438 \u0440\u0435\u043c\u043e\u043d\u0442\u0430, \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u0434\u043b\u044f \u0440\u0435\u0434\u043a\u0438\u0445 \u0432\u0435\u0449\u0435\u0439 \u0438 \u043d\u0430\u0433\u0440\u0430\u0434, \u043e\u043d\u0430 \u0441\u0438\u043b\u044c\u043d\u043e \u0443\u0441\u043b\u043e\u0432\u043d\u0430</i>' ;
e0.parentNode.insertBefore( e2 , e0.nextSibling.nextSibling ) ;

function getI( xpath ){	return document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );}
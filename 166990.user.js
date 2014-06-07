// HWM art cost for 1 combat 
// (c) 2009, xo4yxa (update 2013)
//
// ==UserScript==
// @name		uni_hwm_cost_1_batl
// @homepage		http://hwm.xo4yxa.ru/js/cost1batl/
// @version		1.2
// @description		HWM art cost for 1 combat (2013.11.18)
// @include		http://178.248.235.15/art_info.php?id=*
// @include        	http://209.200.152.144/art_info.php?id=*
// @include        	http://*.heroeswm.*/art_info.php?id=*
// @include        	http://*.lordswm.*/art_info.php?id=*
// ==/UserScript==

var url_cur = location.href ;
var url = 'http://'+location.hostname+'/';

/** Библиотека юникода
*
* Реализует функции работы с юникодом.
* @file lib_unicode.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/
function uchar(s) {
    switch (s[0]) {
        case "А": return "\u0410";
        case "Б": return "\u0411";
        case "В": return "\u0412";
        case "Г": return "\u0413";
        case "Д": return "\u0414";
        case "Е": return "\u0415";
        case "Ж": return "\u0416";
        case "З": return "\u0417";
        case "И": return "\u0418";
        case "Й": return "\u0419";
        case "К": return "\u041a";
        case "Л": return "\u041b";
        case "М": return "\u041c";
        case "Н": return "\u041d";
        case "О": return "\u041e";
        case "П": return "\u041f";
        case "Р": return "\u0420";
        case "С": return "\u0421";
        case "Т": return "\u0422";
        case "У": return "\u0423";
        case "Ф": return "\u0424";
        case "Х": return "\u0425";
        case "Ц": return "\u0426";
        case "Ч": return "\u0427";
        case "Ш": return "\u0428";
        case "Щ": return "\u0429";
        case "Ъ": return "\u042a";
        case "Ы": return "\u042b";
        case "Ь": return "\u042c";
        case "Э": return "\u042d";
        case "Ю": return "\u042e";
        case "Я": return "\u042f";
        case "а": return "\u0430";
        case "б": return "\u0431";
        case "в": return "\u0432";
        case "г": return "\u0433";
        case "д": return "\u0434";
        case "е": return "\u0435";
        case "ж": return "\u0436";
        case "з": return "\u0437";
        case "и": return "\u0438";
        case "й": return "\u0439";
        case "к": return "\u043a";
        case "л": return "\u043b";
        case "м": return "\u043c";
        case "н": return "\u043d";
        case "о": return "\u043e";
        case "п": return "\u043f";
        case "р": return "\u0440";
        case "с": return "\u0441";
        case "т": return "\u0442";
        case "у": return "\u0443";
        case "ф": return "\u0444";
        case "х": return "\u0445";
        case "ц": return "\u0446";
        case "ч": return "\u0447";
        case "ш": return "\u0448";
        case "щ": return "\u0449";
        case "ъ": return "\u044a";
        case "ы": return "\u044b";
        case "ь": return "\u044c";
        case "э": return "\u044d";
        case "ю": return "\u044e";
        case "я": return "\u044f";
        case "Ё": return "\u0401";
        case "ё": return "\u0451";
        default: return s[0];
    }
}
function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}
var str_1     = ustring("Стоимость боя по госцене (по цене предприятия):");
var str_2     = ustring("Стоимость артефакта по госцене (по цене предприятия):");
var str_3     = ustring("Стоимость одного боя рассчитывается относительно Цены и Прочности, поэтому для редких вещей и наград, она сильно условна");

var b = document.getElementsByTagName( 'body' )[0] ;
var hard_regexp = /\u041f\u0440\u043e\u0447\u043d\u043e\u0441\u0442\u044c:\<\/b> (\d+)/ ;
var h = hard_regexp.exec( b.innerHTML ) ;
var e0 = getI( "//b[text()=' \u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0440\u0435\u043c\u043e\u043d\u0442\u0430:']" ).snapshotItem(0) ;
var e1 = e0.nextSibling.firstChild.firstChild.firstChild.nextSibling ;
var e2 = document.createElement( 'div' );
e2.innerHTML =              '<br><b>'+str_1+'</b><table border=0 cellspacing=0 cellpadding=0><tr><td><img width=24 height=24 src="i/gold.gif" border=0></td><td>' + Math.ceil( e1.innerHTML.replace( ',' , '' )/(0.95*h[1]) ) +' (<B><font color = #006FFF>'+ Math.ceil( e1.innerHTML.replace( ',' , '' )*97/(95*h[1]) ) +'</font></B>)'+ '</td></tr></table>' ;
e2.innerHTML = e2.innerHTML+'<br><b>'+str_2+'</b><table border=0 cellspacing=0 cellpadding=0><tr><td><img width=24 height=24 src="i/gold.gif" border=0></td><td>' + Math.ceil( e1.innerHTML.replace( ',' , '' )*20/19) +' (<B><font color = #006FFF>'+ Math.floor(Math.ceil( e1.innerHTML.replace( ',' , '' )*20/19)*97/100) +'</font></B>)'+ '</td></tr></table>' ;
e2.innerHTML = e2.innerHTML+'<i>'+str_3+'</i>' ;

e0.parentNode.insertBefore( e2 , e0.nextSibling.nextSibling ) ;

function getI( xpath ){	return document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );}
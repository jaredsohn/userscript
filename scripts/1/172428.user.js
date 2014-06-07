// ==UserScript==
// @name        L'Union, l'Ardennais: reçus 5 sur 5
// @description Supprime automatiquement les cookies du site L'Union, l'Ardennais qui empêche la consultation de plus de 5 articles (antérieur au jours) depuis la mise à jours du site.
// @namespace   martindamien
// @include     http://www.lunion.presse.fr/*
// @version     1.0
// @grant       none
// ==/UserScript==

//
// This code was found on: http://stackoverflow.com/questions/2194473/can-greasemonkey-delete-cookies-from-a-given-domain
// and was made by : http://stackoverflow.com/users/331508/brock-adams
//

var domain      = document.domain;
var domain2     = document.domain.replace (/^www\./, "");
var domain3     = document.domain.replace (/^(\w+\.)+?(\w+\.\w+)$/, "$2");

var cookieList  = document.cookie.split (';');

for (var J = cookieList.length - 1;   J >= 0;  --J)
{

    var cookieName = cookieList[J].replace (/\s*(\w+)=.+$/, "$1");

    document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;domain=" + domain  + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;domain=" + domain2 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;domain=" + domain3 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    
}
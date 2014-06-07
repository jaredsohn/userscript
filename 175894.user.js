// ==UserScript==
// @name           Remove G & M Nag Screen
// @namespace      http://userscripts.org/
// @description    
// @version        1.1
// @author         Spookstaz
// @include        http://www.theglobeandmail.com/*
// ==/UserScript==
var div = document.getElementById("paywallModalUpsell");
if (div) { div.style.display = "none"; }

var div2 = document.getElementById("topSubscribeBanner");
if (div2) { div2.style.visibility = "hidden"; }

$('.modal-backdrop').hide();


var domain      = document.domain;
var domain2     = document.domain.replace (/^www\./, "");
var domain3     = document.domain.replace (/^(\w+\.)+?(\w+\.\w+)$/, "$2");

//--- Loop through cookies and delete them.
var cookieList  = document.cookie.split (';');

for (var J = cookieList.length - 1;   J >= 0;  --J) {
    var cookieName = cookieList[J].replace (/\s*(\w+)=.+$/, "$1");

    //--- To delete a cookie, set its expiration date to a past value.
    document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;domain=" + domain  + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;domain=" + domain2 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie = cookieName + "=;path=/;domain=" + domain3 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
}

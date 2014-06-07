// ==UserScript==
// @name           Redirect to guest wifi
// @namespace      AJ
// @description    Redirects from files.oraclecorp to wifi guess pass page, IF the user is logged in
// @include        http://files.oraclecorp.com/app/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() { 
        if(typeof $("span.xp").contains != "undefined")
        if($("span.xp") && $("span.xp").text() == "Return to PortalLogoutHelp")
            window.location = "http://files.oraclecorp.com/content/AllPublic/Users/Users-W/wifiadmin_us-Public/airespace_pwd_apac.txt";
});

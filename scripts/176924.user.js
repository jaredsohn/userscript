// ==UserScript==
// @name        M.PTRepair
// @namespace   M.PTRepair
// @description Mangacn.net PTRepair
// @include     http://www.mangacn.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js
// @grant       none
// @version     0.0.1
// ==/UserScript==

try{
    if (window.location.href.match(/mangacn.net/))
    {
        $("#style_switch").hide();
    }
}
catch(e){
    alert (e);
}
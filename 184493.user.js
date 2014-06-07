// ==UserScript==
// @name           egov4you join & finish
// @version        1.0
// @namespace      http://userscripts.org/users/437772
// @description    Auto retry join or finish egof4you minibattle on error
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include	   http://www.egov4you.info/mini/join/*
// ==/UserScript==

jQuery(document).ready(function() {
    notice = $('.notice');
    if (notice[0])
    {
        document.forms["MinisoldierJoinForm"].submit();
    }
});

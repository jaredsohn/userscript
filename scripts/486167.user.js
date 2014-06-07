// ==UserScript==
// @name		LinusTechTips Comic Sans Destroy
// @namespace	LTT
// @version		0.1
// @description	
// @include		https://linustechtips.com/main/*
// @include		https://www.linustechtips.com/main/*
// @include		http://linustechtips.com/main/*
// @include		http://www.linustechtips.com/main/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @updateURL	https://userscripts.org/scripts/source/486167.meta.js
// @downloadURL	https://userscripts.org/scripts/source/486167.user.js
// @copyright	2014+, Ssoele
// ==/UserScript==

jQuery.noConflict();

jQuery('*').each(function() {
    if(jQuery(this).css('font-family').indexOf("comic") > -1){
        jQuery(this).css('font-family', "helvetica,arial,sans-serif");
    }
});
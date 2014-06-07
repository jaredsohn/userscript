// ==UserScript==
// @name		LinusTechTips StarCitizen Forum Layout
// @namespace	UOLTT
// @version		0.2.3
// @description	
// @include		https://linustechtips.com/main/*
// @include		https://www.linustechtips.com/main/*
// @include		http://linustechtips.com/main/*
// @include		http://www.linustechtips.com/main/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @updateURL	https://userscripts.org/scripts/source/474343.meta.js
// @downloadURL	https://userscripts.org/scripts/source/474343.user.js
// @copyright	2014+, Ssoele
// ==/UserScript==

jQuery.noConflict();

var starCitizenPage = false;

jQuery('a').each(function() {
    if(jQuery(this).attr('title') == "Return to Star Citizen"){
        starCitizenPage = true;
    }
});

if(starCitizenPage) {
    changeLayout();
}

function changeLayout() {
    jQuery("head").append("<link href='http://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' type='text/css'>");
    jQuery("head").append("<link id='starcitizenstyle' href='http://static.uoltt.com/forum.css' type='text/css' rel='stylesheet' />");
    jQuery("#logo a img").attr("src", "http://static.uoltt.com/logo.png");
    jQuery("link").each(function () {
    	if(jQuery(this).attr('type') == "text/css") {
	    	var href = jQuery(this).attr('href');
	    	href = href.replace('css_4', 'css_7');
	    	jQuery(this).attr('href', href);
    	}
    });
}
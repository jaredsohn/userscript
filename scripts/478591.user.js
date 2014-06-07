// ==UserScript==
// @name        AdevarulCleaner
// @namespace   http://gexge.ro
// @description Enhancements for Adevarul.ro
// @include       http://adevarul.*/*
// @include       http://*.adevarul.*/*
// @include       https://adevarul.*/*
// @include       https://*.adevarul.*/*
// @author      GExGE
// @timestamp   1299644556453
// @version     1.2
// ==/UserScript==

// Last edited 2014-04-23


// Hide Click.ro articles
var roclicks = 0;
$('.category-tag').each(
    function (i) {
    	if ($(this).html() == "Click.ro") {
    		$(this).parent().parent().hide();
    		roclicks = roclicks + 1;
    	}
    }
);
console.log('roclicks: ' + roclicks);

// Hide promobar
$('#promoBar_wrapper').hide();

// Hide GSP
$('.cross-gsp').hide();
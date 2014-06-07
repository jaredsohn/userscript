// ==UserScript==
// @name     Remove annoying 'signatures'
// @include  http://redacted.se/*
// @author Arrivance
// @description Remove annoying 'signatures' from http://redacted.se
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$('.content').html(function(){
	return $(this).html().replace(/([-])([<])\w+.\w+..\w+...\w+.([>])(.*?)([>])/ig, "");
});


$('.content').html(function() { 
    return $(this).html().replace(/(\W|^)([-])\w+/ig, ""); 
}); 

$('.content').html(function() { 
    return $(this).html().replace(/([<])\w+.\w+..\w+...\w+..BlessTheKnife([<]).\w+([>])/ig, ""); 
}); 

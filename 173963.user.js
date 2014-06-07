// ==UserScript==
// @name        	KOC View More
// @namespace   	cnj
// @description 	Simple script to remove ads from blocking so much screen
// @homepage       	http://userscripts.org/scripts/show/173963
// @include        	*.kingdomsofcamelot.com/*main_src.php*
// @include        	*.kingdomsofcamelot.com/*platforms/kabam*
// @include        	*apps.facebook.com/kingdomsofcamelot/*
// @include        	*kabam.com/games/kingdoms-of-camelot/play*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @version     	1
// ==/UserScript==

$('#queue_building div.bottom_q').click(function(){
alert($(this).attr('id'));
});




$(document).ready(function(){
//    alert('jQuery!');
$(".additional_queue").css("display","none");
$(".first_free_with").css("display","none");
$('#queue_building div.bottom_q').css("display" , "none");
//alert($(".first_free_with").text);

//alert($('#queue_building div.bottom_q').text);

});

// ==UserScript==
// @name        Create Element
// @namespace   mgNewElement
// @include     http://*.marketglory.com/*
// @require		http://code.jquery.com/jquery-migrate-1.2.1.min.js
// @version     1
// @grant       none
// ==/UserScript==


$('.nd_chat_menu_holder, .copyright, #right_placeholder > div').hide();

$('#right_placeholder').append($('.ms_other_links')[0]);
$('.ms_other_links').css('width', '160px').removeClass('left').show();
$('.ms_my_profile').css({'width': '100%', 'padding-top': '0px'});


/* NAVBAR PANEL
================================================================================== */
var makeEL = '<div class="navPanel"></div>';
$('.whiteBg').append(makeEL);



/* FIGHT BUTTON
================================================================================== */
var makeButton = '<a class="btnFight" href="#">START</a>';
$('.navPanel').append(makeButton);



/* CLEAR COOKIE BUTTON
================================================================================== */
var makeButton = '<a class="btnClearCookie" href="#">CLEAR ALL COOKIE</a>';
$('.navPanel').append(makeButton);



/* INFO BOX
================================================================================== */
var makeEL =
	'<ul class="infoBox">' +
		'<li id="infoIDR">IDR: <b></b></li>' + 
		'<li id="infoFIGHT">FIGHT: <b></b></li>' + 
		'<li id="infoWORK">WORK: <b></b></li>' + 
	'</ul>';
$('.navPanel').append(makeEL);



/* URL PATH
================================================================================== */
var makeEL = '<div class="infoPath"><b></b></div>';
$('.navPanel').append(makeEL);



/* URL PATH
================================================================================== */
var makeEL = '<div class="loadingImg"><img src="http://www.mnscu.edu/assets/img/ajax_loading_small.gif" alt="Loading Images" /></div>';
$('.navPanel').append(makeEL);


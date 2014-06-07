// ==UserScript==
// @name        365
// @namespace   abhi
// @include     http://www.football365.com/*
// @exclude     http://www.football365.com/
// @exclude     http://www.football365.com/transfer-list
// @version     1
// @grant     	none
// ==/UserScript==

function dothis(){
	$('.base-head-t1').remove();
	$('.base-head-t2').remove();
	$('.base-ad-mpu').remove();
}

$('.base-foot').remove();
$('.col2').remove();
$('#sky-bet-accordian').remove();
$('#mini-gallery0').remove();
$('.base-mailbox').remove();
$('.base-head-t1').remove();
$('.base-head-t2').remove();
$('a.thickbox').remove();
$('a.powerHead').remove();
$('div.base-box').remove();
$('.ob_strip_container AR_1').remove();
$('.base-wrap').attr('style', 'width:100%');
$('.col1').attr('style', 'width:80%');
setTimeout(function(){$('embed').remove();}, 3000);	
$('.base-article-head>a').remove();
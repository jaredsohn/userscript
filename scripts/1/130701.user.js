// ==UserScript==
// @name          CSS by Seed Aid aux64
// @namespace     http://lib.audit-01.com/css
// @description   CSS
// @include       http://pirat.ca*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require	http://lib.audit-01.com/files/jqModal.js
// @version        0.2
// ==/UserScript==




//$('div#main-nav table tbody tr td.nowrap a:last').before('<a>Скрипт CSS ON</a> · ');

$('html body div#body_container div#page_container table').css({'width' : '100%'});
$('object').remove();
$('#logo').remove();
$('#sidebar2').remove();
$('#MarketGidComposite7527').remove();
$('div#latest_news table tbody tr td:first').after('<td><img align="right" src="templates/default/images/logo6.gif"></td> ');
$('#body_container').css({'padding-top' : '5px'});
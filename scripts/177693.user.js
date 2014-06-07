// ==UserScript==
// @name         eventhubs
// @match        http://eventhubs.com/*
// @match        https://eventhubs.com/*
// @match        http://*.eventhubs.com/*
// @match        https://*.eventhubs.com/*
// ==/UserScript==

$('#main_content_left').children('div').css('display', 'block');
$("h1:contains('Ad blocking software detected')").closest('div').hide();

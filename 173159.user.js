// ==UserScript==
// @name       KOTU
// @namespace  KOTU
// @description  script for auto buy raw wep
// @include        http://www.erepublik.com/*/economy/market/*/12/*
// @include        http://userscripts.org/scripts/review/156586
// @copyright  KOTU

// ==/UserScript==

setTimeout("if(parseFloat(jQuery('sup').first().text().substr(0,3)) < 0.04){var amount = jQuery('.m_stock').eq(1).text().replace();jQuery('input[type="text"]').eq(1).val();
jQuery("span:contains('All')").eq(1).first().trigger('click');} else setTimeout(\"window.location.reload();\",Math.random()*8000+5000);",1000);
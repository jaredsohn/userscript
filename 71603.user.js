// ==UserScript==
// @name           gm_dc
// @namespace      http://old.the-game.ru
// @description    Bot for site http://the-game.ru.
// @include        http://old.the-game.ru/*
// @include 	   http://free.the-game.ru/*
// @require        http://yandex.st/jquery/1.4.2/jquery.min.js
// ==/UserScript==
$(document).ready(function () {
	function win2unicode(str) {
	   var charmap   = unescape(
		  "%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
		  "%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
		  "%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
		  "%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")
	   var code2char = function(code) {
				   if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)
				   if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)
				   return String.fromCharCode(code)
				}
	   var res = ""
	   for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))
	   return res
	};
alert('превед!');
});
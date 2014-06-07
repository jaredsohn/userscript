// ==UserScript==
// @name         donnie
// @version      1.0
// @include      http://*.sofiawars.com/player/
// @author       Герганката & Mr_Rage
// @require      http://code.jquery.com/jquery-1.9.1.min.js
// @run-at       document-end
// ==/UserScript==


var explink = "/player/";
var exp2 = $('href ="/player/" div.bars>div>div.exp').text();

$('td.say-cell dl#statistics-accordion.vtabs dd div.pers-statistics div.bars').prepend('<div class="exp">'+exp2+'<div class="bar"><div><div class="percent" style="width:50%;"></div></div></div></div>');
$('div.bar').css('margin-left', 'auto').css('margin-right', 'auto');




	if(/([0-9]+)\/([0-9]+)/.test($(".exp").text())) {
		var from = parseInt(RegExp.$1,10);
		var to = parseInt(RegExp.$2, 10);
		$('div.exp>div.bar').before(' (' +(to - from)+ ')');	
	}

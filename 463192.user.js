// ==UserScript==
// @name Larenaa Swag Mod
// @include http://www.larenaa.com*
// ==/UserScript==
//

function yolo(){
	var colors = ['blue', 'lime', 'black', 'yellow', 'white'];
	$("body").animate({
		backgroundColor: colors[Math.floor(Math.random() * colors.length)]
	}, 10);
}

setInterval(function(){yolo()}, 50);
// ==UserScript==
// @name        FuckUp
// @namespace   fuckedpages
// @description Fucks up the interwebz
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @require       http://www.cornify.com/js/cornify.js
// ==/UserScript==

function get_random_color() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function getSpeed()
{
	// Heute erkläre ich euch den ominösen Return-Befehl oder... öh... Statement!
	return 2 + Math.random() * 10;
}
function fuckItUp()
{
	for(var j = 0; j < 30; j++)
	{
		cornify_add();
	}
	
	$('body').append(
		'<div class="donttouch bouncy" style="z-index:9999999;position:absolute; left: 0; top: 0; width: 400px; height: 350px;">' +
			'<object class="donttouch" width="100%" height="100%" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
				'<param value="http://www.nigga-stole-my-bike.com/meatspin/doa.swf" name="movie">' +
				'<param value="high" name="quality">' +
				'<embed class="donttouch" width="400" height="350" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://www.nigga-stole-my-bike.com/meatspin/doa.swf">' +
			'</object>'+
		'</div>'
	);

	$("body").css("background-image", "url(\"http://www.gagreport.com/Funny_Pictures/GIFS-2/SexWithFatty.gif\")");
	
	var $all = $("*:not(body):not(html):not(.donttouch):not(div > img)");
	var $elem;
	var $bouncy = $(".bouncy");
	var bspeed = [getSpeed(), getSpeed()];
	var bdim = [0, 0, $bouncy.width(), $bouncy.height()];
	var wdim = [$(window).width(), $(window).height()];
	var brot = 0;
	
	setInterval(function(){
		for(var i = 0; i < 3; i ++)
		{
			$elem = $all.eq(Math.random() * $all.length);
			$elem.css("background-color", get_random_color())
				 .css("width", (100 + Math.random() * 1000) + "px")
				 .css("height", (20 + Math.random() * 100) + "px")
				 .css("margin-left", (Math.random() * 100) + "px");
		}
	}, 20);
	
	setInterval(function(){
		$bouncy.css("left", (bdim[0] += bspeed[0]) + "px")
		       .css("top", (bdim[1] += bspeed[1]) + "px");
			   
		if(bdim[0] + bdim[2] > wdim[0] || bdim[0] < 0)
			bspeed[0] = (bdim[0] < 0) ? getSpeed() : -getSpeed();
			
		if(bdim[1] + bdim[1] > wdim[1] || bdim[1] < 0)
			bspeed[1] = (bdim[1] < 0) ? getSpeed() : -getSpeed();
			
	}, 20);
};

$(function()
{
	$('<button style="position:absolute; top: 10px; left: 10px;">Pwned</button>').appendTo('body').click(function()
	{
		if(confirm("Sind Sie wirklich sicher?"))
		{
			fuckItUp();
		}
	});
});
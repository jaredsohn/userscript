// ==UserScript==
// @name           GAGA
// @namespace      http://www.mylifeisberkeley.com
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var lyrics =["Rah","rah","ah","ah","ah","roma","ro","mama","gaga","ooh","la","la","WANT YOUR BAD ROOMANCE!!"];
var colors =["orange","blue","green","red","black","gray"];
var percentages = ["25%","50%","70%","10%"];
var i=0;
var lyric=0;
function runIt()
{
	$("#words").css({"opacity":1});
	var word=lyrics[lyric];
	var color=colors[Math.floor(Math.random()*6)];
	var left=percentages[Math.floor(Math.random()*4)];
	var top=percentages[Math.floor(Math.random()*4)];
	$("#words").css({"color":color,"top":top,"left":left});
	$("#words").fadeOut("fast",function(){
		$("#words").html(word);
		$("#words").fadeIn("fast");
	});
	
	lyric=(lyric+1)%14;
	
	if(i==1)
	{
		setTimeout(runIt,500);
	}
	
}
function setup()
{
	$("body").prepend('<button id="goWildButton">Go GAGA!</button>');
	$("body").prepend('<button id="stopWildButton" style="display:none;">No GAGA!</button>');
	$("#goWildButton").click(function(){
		if(i!=1)
		{
			i=1;
			// $("#words").fadeIn("fast");
			runIt();
		}
		$(this).fadeOut("fast",function(){
			$("#stopWildButton").fadeIn("fast");
		});
	});
	$("#stopWildButton").click(function(){
		i=0;
		// $("#words").fadeOut("fast");
		$(this).fadeOut("fast",function(){
			$("#goWildButton").fadeIn("fast");
		});
	});
	$("body").append('<div id="words" style="position:absolute; top:50%; left:50%; font-size:150pt; z-index:100000000"></div>');
}
// runIt();
$(document).ready(function(){
	setup();
});
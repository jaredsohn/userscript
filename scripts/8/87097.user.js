// ==UserScript==
// @name           Test
// @namespace      http://www.mylifeisberkeley.com
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var i=0;
var color="white";
function runIt()
{
	if(color=="white")
	{
		color="black";
	}
	else
	{
		color="white";
	}
	$("div").each(function(){
		$(this).css({"background":color});
	});
	
	i++;
	if(i<10000)
	{
		setTimeout(runIt,100);
	}
	
}
function setup()
{
	$("body").prepend('<button id="goWildButton">Go Wild!</button>');
	$("body").prepend('<button id="stopWildButton" style="display:none;">No Wild!</button>');
	$("#goWildButton").click(function(){
		if(i>0 && i<10000)
		{
			i=0;
		}
		else
		{
			i=0;
			runIt();
		}
		$(this).fadeOut("fast",function(){
			$("#stopWildButton").fadeIn("fast");
		});
	});
	$("#stopWildButton").click(function(){
		i=1000000;
		$(this).fadeOut("fast",function(){
			$("#goWildButton").fadeIn("fast");
		});
	});
	$("body").append('<div style=""><object id="playerID" width="480" height="385"><param name="movie" value="http://www.youtube.com/v/TlMGuR_XSbc?fs=1&amp;hl=en_US&enablejsapi=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/TlMGuR_XSbc?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object></div>');
}
// runIt();
$(document).ready(function(){
	setup();
});
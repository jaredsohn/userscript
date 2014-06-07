// ==UserScript==
// @name        xkcd Handsfree!
// @namespace   xkcdh
// @description Handsfree mode for the XKCD web-comic
// @exclude		*blag.xkcd.com/*
// @exclude		*what-if.xkcd.com/*
// @exclude		*store.xkcd.com/*
// @include     *xkcd.com/*
// @exclude		*xkcd.com/about/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1
// ==/UserScript==

var container = document.getElementById("ctitle");
var title = container.innerHTML;
var shouldStop = false;

timeout = function(time, func){
	setInterval(function(){
		func();
	}, time)
}

function nextComic()
{
	var a = document.getElementsByTagName("a");
	for(var i = 0; i < a.length; i++)
	{
		var an = a[i];
		if(an.getAttribute("accesskey") == "n")
		{
			window.location = an.href;
		}
	}

}

var t = 0;
timeout(1000, function(){
	if(!shouldStop)
	{
		if(t > 45)
		{
			nextComic();
			t = 0;
		}
		else
		{
			updateTimer(45 - t + " seconds");
			t++;
		}
	}
	else
	{
		console.log("stopped");
	}
});

appendTitle("<input type='button' value='Stop' id='stop' name='stop' onClick=window.stop = true></input><br />");

function appendTitle(str)
{
	container.innerHTML += "<br />" + str;
}

function initTimer()
{
	container.innerHTML += "<span id='timer'></span>";
}
initTimer();

var timerContainer = document.getElementById("timer");
function updateTimer(str)
{
	timerContainer.innerHTML = str + "<br />";
}

$("#stop").click(function(){
	shouldStop = true;
});
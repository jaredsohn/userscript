// ==UserScript==
// @name           Ghost Trappers Monster AutoAssist [Druvid]
// @namespace      Druvid's GT Monster AutoAssist
// @description    Automatically assists a monster link then closes the tab when done.
// @include        http://www.ghost-trappers.com/fb/ghost_monster.php*
// @include        http://apps.facebook.com/ghost-trappers/ghost_monster.php*
// @version        2.0 Ghost-trappers iframe compatible. 
// @version        1.1 Monster link on logbook can now be used to access monster journal. 
// @version        1.0 Initial Release.
// ==/UserScript==

var minAssistDelay = 2;		// in seconds, minimum delay before assisting
var maxAssistDelay = 4;		// in seconds, maximum delay before assisting
var assistedCloseDelay = 1;	// in seconds, delay before closing tab if you have already assisted
var caughtCloseDelay = 1;	// in seconds, delay before closing tab if monster is already caught
var basetitle = document.title;
var url = document.location.href;

//Redirect GT main site
function redirect()
{
	redirectUrl = 'http://www.ghost-trappers.com/fb/ghost_monster.php' + url.substr(url.indexOf("?id"));		
	if(url.indexOf("http://apps.facebook.com/ghost-trappers/ghost_monster.php?")!=-1)
		window.setTimeout(function(){window.location=redirectUrl;},1000);
	else
		window.setTimeout(function(){autoAssist();}, 1000);
}

function autoAssist(){


	window.scrollBy(0,600);	
	if(url.indexOf("ghost_monster.php?id=")!=-1 && url.indexOf("&test=")!=-1)
	{
		var gm_button_arr = document.getElementsByClassName("gmButton");
		var count = gm_button_arr.length;
		if(count==2)
		{
			var r = minAssistDelay+(Math.floor((Math.random()*(maxAssistDelay-minAssistDelay+1))));

			window.setTimeout(function(){countDown(r,"assist");}, 1000);
		}
		else if(count==1)
		{  
			window.setTimeout(function(){countDown(assistedCloseDelay,"assisted");}, 1000);
		}
		else
		{  
			window.setTimeout(function(){countDown(caughtCloseDelay,"caught");}, 1000);
		}
	}
}

function countDown(time,action){
	if(time>0)
	{
		var str = null;
		if(action=="assist") str = "<Assisting> in ";
		else if(action=="assisted") str = "[Done Assisting] Closing in ";
		else str = "[Caught] Closing in ";

		document.title= str + (countdownFormat(time--))+ " | "+basetitle;		
		window.setTimeout(function () { countDown(time,action); }, 1000);
	
	}
	else
	{
		if(action=="assist")
		{
			document.title = "Helping monster hunt . . ."+ " | "+basetitle;
			window.setTimeout(
				function(){
					window.location=document.getElementById('gmAssistContainer').firstChild.href;
				},1000
			);
		}
		else
		{
			document.title = "Closing window . . ."+ " | "+basetitle;
			window.setTimeout(function() {closeWindow();}, 1000);
		}	
	}
}

//Formating for title
function countdownFormat(time)
{
	var timeString;  
	var hr = Math.floor(time / 3600);
	var min = Math.floor((time % 3600) / 60);
	var sec = (time % 3600 % 60) % 60;

	if (sec < 10) sec = "0" + sec;

	if (hr > 0)
		timeString = hr.toString() + " h " + min.toString() + " m " + sec.toString() + " s";
	else if (min > 0)
		timeString = min.toString() + " m " + sec.toString() + " s";
	else
		timeString = sec.toString() + " s";
	
	hr = null; min = null; sec = null;

	return (timeString);
}

//Enables autoclose tab when assisting monsters
function closeWindow() 
{
	window.open('','_parent','');
	window.close();
}

window.setTimeout(function(){redirect();}, 1000);
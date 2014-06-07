// ==UserScript==
// @name        MouseHunt Autohorn
// @author      A Shrouded Figure
// @description Automatically sounds the hunters horn for MouseHunt.
// @include     http://apps.facebook.com/mousehunt/*
// ==/UserScript==

// Play a sound when a Kings Reward is encountered.
var playKingsRewardSound = true;

// King's Reward Song:
// You may use the sound from any YouTube video.

// Castle Crashers - Main Theme:
var kingsRewardSoundURL = 'http://www.youtube.com/watch?v=I7NZ4oR4978';


var title = document.title;
var next_turntime = new Date();
var next_activeturn = get_next_activeturn();
var kings_reward_time = 450;

next_turntime.setSeconds(next_turntime.getSeconds() + next_activeturn);

if (logged_in())
{
	if (kings_reward())
	{
		document.title = "Kings Reward!";
		
		if (playKingsRewardSound)
    {
			kingsRewardSoundURL = kingsRewardSoundURL.replace("watch?v=", "v/");
			var kingsRewardSound = document.createElement("div");
			kingsRewardSound.innerHTML = '<object><embed src="' + kingsRewardSoundURL + '&amp;autoplay=1" type="application/x-shockwave-flash" width="0" height="0"></embed></object>';
			document.getElementById("content").appendChild(kingsRewardSound);
			kings_reward_timer();
    }
	}
	else if (out_of_cheese())
	{
		document.title = "Out of Cheese!"
	} else {
		if (next_activeturn == 0)
		{
			document.title = "Time to Sound the Horn!";
		} else {
			check_time_left();
		}
	}
	
	show_title_percent();
	document.getElementById("app10337532241_huntTimer").id = "app10337532241_huntTimerBREAK";
	document.getElementById("app10337532241_huntTimerBREAK").innerHTML = '<span class="timerlabel"><form id="autohorn" name="autohorn"><label for="power"><input type="checkbox" name="power" id="power" checked="checked"><div style="display:inline; position:absolute; margin-top:3px;">Autohorn ' + timeFromDate(next_turntime) + '</div></label></form></span>';
}

function check_time_left()
{
	document.title = timeFromSeconds(next_activeturn) + " | " + title;
	
	if (next_activeturn <= 0)
	{
		if (autohorn_eligible() && next_activeturn > -2)
    {
			if (document.autohorn.power.checked)
			{
				document.title = "Sounding The Horn...";
				window.location.href = "http://apps.facebook.com/mousehunt/turn.php";
			} else {
				document.title = "Skipped Turn"
			}
    } else {
			document.title = "Time to Sound the Horn!";
			if (confirm("Time to sound the horn!\nDo you want to sound it now?"))
    	{
				document.title = "Sounding The Horn...";
				window.location.href = "http://apps.facebook.com/mousehunt/turn.php";
    	} else {
				document.title = title;
			}
		}
	} else {
		next_activeturn = Math.round((next_turntime.getTime() - new Date().getTime()) / 1000);
		setTimeout(check_time_left, 1000);
	}
}

function get_next_activeturn()
{
	var documentScripts = document.getElementsByTagName("script");
	for(i = 0; i < documentScripts.length; i++)
	{
		if (documentScripts[i].innerHTML.indexOf("next_activeturn_seconds") != -1) 
		{
			var startIndex = documentScripts[i].innerHTML.indexOf("next_activeturn_seconds") + 26;
			var endIndex = documentScripts[i].innerHTML.indexOf(",", startIndex);
			
			return parseInt(documentScripts[i].innerHTML.substring(startIndex, endIndex));
			
			break;
		}
	}
}

function autohorn_eligible()
{
	if (window.location.href == "http://apps.facebook.com/mousehunt/" || 
			window.location.href.indexOf(".facebook.com/mousehunt/?ref=bookmarks") != -1 || 
			window.location.href.indexOf(".facebook.com/mousehunt/?ref=canvas_bkmk_top") != -1 || 
			window.location.href.indexOf(".facebook.com/mousehunt/index.php") !=  -1 ||
			window.location.href.indexOf(".facebook.com/mousehunt/turn.php") != -1)
	{
		return true;
	} else {
		return false;
	}
}

function logged_in()
{
	if (document.body.innerHTML.indexOf("Sign up for Facebook to use MouseHunt") != -1)
	{
		return false;
	} else {
		return true;
	}
}

function kings_reward()
{
	var documentScripts = document.getElementsByTagName("script");
	for(i = 0; i < documentScripts.length; i++)
	{
		if (documentScripts[i].innerHTML.indexOf("has_puzzle") != -1)
		{
			var startIndex = documentScripts[i].innerHTML.indexOf("has_puzzle") + 13;
			var endIndex = documentScripts[i].innerHTML.indexOf(",", startIndex);
			
			return eval(documentScripts[i].innerHTML.substring(startIndex, endIndex));
			
			break
		}
	}
}

function out_of_cheese()
{
	if (document.getElementById("app10337532241_hud_baitName").innerHTML.indexOf("None!") != -1)
	{
		return true;
	} else {
		return false;
	}
}

function timeFromSeconds(seconds)
{
    var m = (Math.floor(seconds % 3600 / 60) < 10 ? '0' : '') + Math.floor(seconds % 3600 / 60);
    var s = (Math.floor(seconds % 3600 % 60) < 10 ? '0' : '') + Math.floor(seconds % 3600 % 60);
    return m + ":" + s;
}

function timeFromDate(time)
{
	var h = ((time.getHours() % 12 || 12) < 10 ? '0' : '') + (time.getHours() % 12 || 12);
	var m = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
	var s = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
	return h + ":" + m + ":" + s;
}

function show_title_percent()
{
	var current_percent = document.getElementById("app10337532241_hud_titlebar").getAttribute("title");
	var endIndex = current_percent.indexOf('% complete');
	current_percent = current_percent.substring(0, endIndex);

	document.getElementById("app10337532241_hud_titlePercentage").innerHTML = current_percent;
}

function kings_reward_timer()
{
	if (kings_reward_time <= 0)
	{
		window.location.href = "http://www.facebook.com/#!/apps/application.php?id=10337532241";
	} else {
		document.title = "Kings Reward! | " + timeFromSeconds(kings_reward_time);
		kings_reward_time--;
		setTimeout(kings_reward_timer, 1000);
	}
}
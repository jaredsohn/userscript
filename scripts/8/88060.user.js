// ==UserScript==
// @name           Bots4 Remove Frames
// @namespace      Bots4 Remove Frames
// @description    Bots4 Remove Frames
// @include        http://*bots4.net/train/*
// @include        http://*bots4.net/fight/*
//
// @author         AquaRegia
// @version        2011-09-10
// ==/UserScript==

if(!window.chrome)
{
	var storage = unsafeWindow.localStorage;
}
else
{
	var storage = localStorage;
}

function toggleFrames()
{
	hideFrames = !hideFrames;
	fakeBattleLog.style.display = hideFrames ? "block" : "none";
	container.style.display = hideFrames ? "none" : "block";
	frameLink.innerHTML = hideFrames ? "Add frames!" : "Remove frames!";
	
	storage["hideFrames"] = hideFrames;
}

var battleLog = document.getElementById("battle-log");
var container = document.getElementById("container");

if(battleLog)
{
	var fakeBattleLog = document.createElement("div");
	fakeBattleLog.style.display = "none";
	fakeBattleLog.style.zIndex = "99";
	fakeBattleLog.style.position = "absolute";
	fakeBattleLog.style.left = "0px";
	fakeBattleLog.style.top = "0px";
	fakeBattleLog.style.padding = "4px";
	fakeBattleLog.style.background = "#000";

	var hideFrames = (storage["hideFrames"] == "true") ? true : false;

	var frameLink = document.createElement("font");
	frameLink.style.zIndex = "100";
	frameLink.style.cursor = "pointer";
	frameLink.style.position = "fixed";
	frameLink.style.bottom = "8px";
	frameLink.style.right = "8px";

	frameLink.appendChild(document.createTextNode(hideFrames ? "Add frames!" : "Remove frames!"));
	frameLink.addEventListener("click", toggleFrames, false);
	frameLink.addEventListener("mouseover", function(){this.style.textDecoration = "underline"}, false);
	frameLink.addEventListener("mouseout", function(){this.style.textDecoration = "none"}, false);

	document.body.appendChild(fakeBattleLog);
	document.body.appendChild(frameLink)

	if(hideFrames)
	{
		fakeBattleLog.style.display = "block";
		container.style.display = "none";
	}
	
	setInterval(function()
	{
		if(hideFrames)
		{
			if(battleLog.innerHTML > fakeBattleLog.innerHTML)
			{
				fakeBattleLog.innerHTML = battleLog.innerHTML;
				window.scroll(0, 1000000);
			}
		}
	}, 100);
}
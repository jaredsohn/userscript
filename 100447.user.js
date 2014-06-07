// ==UserScript==
// @name           Bots4 Bmail Sound
// @namespace      Bots4 Bmail Sound
// @description    Bots4 Bmail Sound
// @include        http://bots4.net/*
//
// @author 	   AquaRegia
// @version 	   2011-04-04
// ==/UserScript==

if(!window.chrome)
{
	var storage = unsafeWindow.localStorage;
}
else
{
	var storage = localStorage;
}

var isOnline = document.getElementById("experience-bar-wrap-header") ? true : false;

function playSound(src)
{
	var audio = document.createElement("audio");
	audio.src = src;
	audio.autoplay = "true";
	audio.style.display = "none";

	document.body.appendChild(audio);
}

if(isOnline)
{
	var headerLinks = document.getElementById('header').getElementsByTagName('a');
	var username;

	for(var i = 0; i < headerLinks.length; i++)
	{
		if(headerLinks[i].href.match('/profile'))
		{
			username = headerLinks[i].innerHTML;
			break;
		}
	}
	
	var scriptActivated = storage["BmailAlert:" + username] ? storage["BmailAlert:" + username] == "true" : "true";
	var soundSource = storage["BmailAlert:source:" + username] ? storage["BmailAlert:source:" + username] : "http://www.ilovewavs.com/Events/GotMail/Mail25.wav";

	if(scriptActivated && !(/post-office/.test(document.location.href)))
	{
		var allLinks = document.links;
		var mails = 0;
		
		for(var i = 0; i < allLinks.length; i++)
		{
			if(/post-office/.test(allLinks[i].href))
			{
				mails = parseInt(allLinks[i].getElementsByTagName("span")[1].innerHTML);
				break;
			}
		}
		
		if(mails > 0)
		{
			playSound(soundSource);
		}
	}
	else if(/post-office$/.test(document.location.href))
	{
		var settingsDiv = document.createElement("div");
		settingsDiv.className = "forum-location";
		
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = scriptActivated;
		checkbox.addEventListener("click", function()
		{
			storage["BmailAlert:" + username] = this.checked;
		}, false);
		
		var text = document.createElement("span");
		text.style.color = "#CFC";
		text.style.marginLeft = "10px";
		text.innerHTML = "Alert me when I get mail";
		
		var input = document.createElement("input");
		input.type = "text";
		input.value = soundSource;
		input.style.width = "400px";
		input.style.height = "1.2em";
		input.style.marginLeft = "20px";
		input.addEventListener("blur", function()
		{
			storage["BmailAlert:source:" + username] = this.value;
		}, false);
		
		var playButton = document.createElement("input");
		playButton.type = "submit";
		playButton.style.marginLeft = "2px";
		playButton.value = "play";
		playButton.addEventListener("click", function()
		{
			playSound(storage["BmailAlert:source:" + username]);
		}, false);
		
		settingsDiv.appendChild(checkbox);
		settingsDiv.appendChild(text);
		settingsDiv.appendChild(input);
		settingsDiv.appendChild(playButton);
		
		var forumTop = document.getElementsByClassName("forum-location")[0];
		
		forumTop.parentNode.insertBefore(settingsDiv, forumTop);
	}
}
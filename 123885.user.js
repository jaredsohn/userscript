// ==UserScript==
// @name           Tumblr Audio Warn
// @namespace      http://sidebr.tumblr.com/
// @description    Warns the user that they're about to close/reload a dashboard that's playing music
// @version        1.1
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

/*

(C) 2011 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

History
-------

2012-01-23 - Updated to work with Missing E and other tools that modify the post controls
2012-01-23 - Created.

*/

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function windowUnloading(toggle)
{
	window.onbeforeunload = function() {
		return (toggle ? "Audio may still be playing!" : null);
	};
}

function audioIsPlaying(aid)
{
	var id = document.getElementById(aid);

	var playing = parseInt(localStorage.getItem("audioIsPlaying"));

	if (playing)
	{
		playing = 0;
		localStorage.setItem("audioIsPlaying", playing);
		windowUnloading(false);
	}
	else
	{
		playing = 1;
		localStorage.setItem("audioIsPlaying", playing);
		windowUnloading(true);
	}

	var audioText = "Audio warning is now " + (playing ? "on. <a style='cursor:pointer; text-decoration:none' onclick='audioIsPlaying(\"" + aid + "\")'>(Turn off)</a>" : "off. <a style='cursor:pointer; text-decoration:none' onclick='audioIsPlaying(\"" + aid + "\")'>(Turn on)</a>");

	var audioControl = document.createElement('div');
		audioControl.setAttribute('style', 'font-size:10px;');
		audioControl.setAttribute('id', 'audioControl_' + aid);
		audioControl.innerHTML = audioText;
	
	if (aControl = document.getElementById('audioControl_' + aid))
		aControl.innerHTML = audioText;
	else
		id.down().appendChild(audioControl);
	
}

function getPosts(startNum)
{
	var allPosts = document.getElementById("posts").getElementsByTagName('li');
	var postContainer = [], postControls = [];
	
	for (var i = startNum; i < allPosts.length; i++)
	{
		if (allPosts[i].innerHTML.search('audio_node_') > -1)
		{
			audioSpanAt = 0;
			while (allPosts[i].getElementsByTagName('span')[audioSpanAt].getAttribute('id').search('audio_node_') != 0)
			{
				audioSpanAt++;
				
				try
				{
					allPosts[i].getElementsByTagName('span')[audioSpanAt].getAttribute('id').search('audio_node_');
				}
				catch(err)
				{
					audioSpanAt++;
				}
					
			}
			/*if (allPosts[i].innerHTML.search('note_link_current_') > -1)
				audioSpanAt = 3;
			else
				audioSpanAt = 0;*/
			audioID = allPosts[i].getElementsByTagName('span')[audioSpanAt];
			postContainer.push(allPosts[i]);
			postControls.push(audioID);
			
			allPosts[i].getElementsByTagName('span')[audioSpanAt].down().down().setAttribute('onclick','audioIsPlaying("' + audioID.getAttribute('id') + '", this)');
		}
	}
	
	return allPosts.length + startNum;
}

function main()
{
	var startNum = 0;
	var pageLength = document.getElementById("posts").getElementsByTagName('li').length;

	startNum = getPosts(startNum);

	Ajax.Responders.register({
		onLoaded: function() 
		{
		checkPage = setInterval(function() {
			var newLength = document.getElementById('posts').getElementsByTagName('li').length;
			if (pageLength < newLength)
			{
				getPosts(pageLength);
				pageLength = newLength;
			}
			window.clearInterval(checkPage);
			return;
		}, 5000);		
			
		},
	});




}

embedElement("script", windowUnloading, false);
embedElement("script", audioIsPlaying, false);
embedElement("script", getPosts, false);
embedElement("script", main, true);
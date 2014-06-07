// ==UserScript==
// @name        Clickable Links
// @namespace   Kinetic
// @include     http://www.thelostrunes.com/game.php
// @include     http://thelostrunes.com/game.php
// @version     1
// ==/UserScript==

function addGlobalJS(js)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

addGlobalJS("function replaceURLWithHTMLLinks(text)				{					var exp = /(\\b(https?|ftp|file):\\\/\\\/[-A-Z0-9+&@#\\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\\/%=~_|])/ig;					return text.replace(exp,'<a target=\"_blank\" href=\"$1\">$1</a>'); 				} function handleResponse4(){	if(chat.readyState == 4)	{		var response = chat.responseText;		var update = new Array();				if(response.indexOf('|' != -1))		{			update = response.split('|');			update.shift();						var totalUpdates = update.length;			var currentUpdate = 1;			while (currentUpdate <= totalUpdates)			{				chatArray.shift();				chatArray.push(update[currentUpdate-1]);				currentUpdate += 1;			}						var chatmsg = '';			for (var i=chatArray.length-1; i>=0; --i)			{											chatmsg = chatmsg + chatArray[i] + '<br />';			}	chatmsg = chatmsg.replace(/<span style=\"color: #DDDDDD\">Peasant<\\/span>/ig, '<span style=\"color: #DDDDDD\">Noob</span>');					document.getElementById('chat').innerHTML = replaceURLWithHTMLLinks(chatmsg);		}				chatcalled = 0;		clearTimeout(disablechattimer);		clearTimeout(chatcalledtimer);	}}");
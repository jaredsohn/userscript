// ==UserScript==
// @name        No Re-direction Upon Link Click
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

addGlobalJS("function replaceAnnoyingThing(text)				{  					return text.replace(/href=\"out.php\\\?link=/ig,'href=\"'); 				}");

addGlobalJS("function handleResponse4(){	if(chat.readyState == 4)	{		var response = chat.responseText;		var update = new Array();				if(response.indexOf('|' != -1))		{			update = response.split('|');			update.shift();						var totalUpdates = update.length;			var currentUpdate = 1;			while (currentUpdate <= totalUpdates)			{		if (chatArray.length >= chatLimit) {		chatArray.shift();	}			chatArray.push(update[currentUpdate-1]);				currentUpdate += 1;			}						var chatmsg = '';			for (var i=chatArray.length-1; i>=0; --i)			{											chatmsg = chatmsg + chatArray[i] + '<br />';			}	chatmsg = chatmsg.replace(/<span style=\"color: #DDDDDD\">Peasant<\\/span>/ig, '<span style=\"color: #DDDDDD\">Noob</span>');					document.getElementById('chat').innerHTML = replaceAnnoyingThing(chatmsg);		}				chatcalled = 0;		clearTimeout(disablechattimer);		clearTimeout(chatcalledtimer);	}}");
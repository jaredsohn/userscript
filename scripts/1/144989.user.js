// ==UserScript==
// @name        Ignored Deleter
// @namespace   Leeterthanyou
// @description No need to see (ignored) spam anymore.
// @include     http://thelostrunes.com/game.php
// @include     http://www.thelostrunes.com/game.php
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

addGlobalJS("function handleResponse4(){	if(chat.readyState == 4)	{		var response = chat.responseText;		var update = new Array();				if(response.indexOf('|' != -1))		{			update = response.split('|');			update.shift();						var totalUpdates = update.length;			var currentUpdate = 1;			while (currentUpdate <= totalUpdates)			{				chatArray.shift();				chatArray.push(update[currentUpdate-1]);				currentUpdate += 1;			}						var chatmsg = '';			for (var i=chatArray.length-1; i>=0; --i)			{	var testTxt = '#777777'; var testTxt2 = '(ignored)';		var testSrch = chatArray[i].search(testTxt); var testSrch2 = chatArray[i].search(testTxt2); 				if ((testSrch == -1) && (testSrch2 == -1))				{				chatmsg = chatmsg + chatArray[i] + '<br />';				}			}						document.getElementById('chat').innerHTML = chatmsg;		}				chatcalled = 0;		clearTimeout(disablechattimer);		clearTimeout(chatcalledtimer);	}}");
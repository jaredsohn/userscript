// ==UserScript==
// @name           FakeClubXChat
// @namespace      FakeClubXChatSpace
// @description    Custom Chat for the FakeClub!
// @include        http://www.fakeclub.com/forum/
// @include        http://www.fakeclub.com/forum/index.pl*
// ==/UserScript==

var count;
window.addEventListener('load', init, true);

function fakeClubSend()
{
	var tmp = document.getElementsByTagName("a")[6].innerHTML; 
	var p1 = tmp.indexOf("[")+2;
	var p2 = tmp.indexOf("]")-1;
	var tmp2 = tmp.substring(p1, p2);
	if(tmp == "Home") tmp2 = "******";
	var tmp3 = document.getElementById('chat_message').value;
	document.getElementById('chat_message').value = '';
	if(tmp3 != '')
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://thefc.host22.com/xChat.php?u='+tmp2+'&m='+tmp3,
			onload: function(responseDetails) 
			{
				setTimeout( ref1 , 0 );
			}
		  });
	}
}

function buildChat()
{
	var orig = document.getElementsByTagName("table")[0].innerHTML; 
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://thefc.host22.com/xChat_Display.php',
		onload: function(responseDetails) 
		{
			document.getElementsByTagName("table")[0].innerHTML = responseDetails.responseText + orig; 
			document.getElementById('chat_controls').innerHTML = '<input type="text" value="" id="chat_message"  maxlength="250" size="85" /><input id="chat_send" style="background-color: #ffeecc; color: #006699; font-weight: bold;" type="button" value="Send" />';
			document.getElementById('chat_send').addEventListener('click', fakeClubSend, true);
		}
	  });
}

function checkCount()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://thefc.host22.com/xChat_Count.php',
		onload: function(responseDetails) 
		{
			var tmp = responseDetails.responseText;
			var tmp2 = tmp.indexOf("<!-- www.000webhost.com Analytics Code -->");
			count = tmp.substring(0,tmp2);
		}
	  });
}

var ref1 = function checkUpdates()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://thefc.host22.com/xChat_Update.php?c='+count,
		onload: function(responseDetails) 
		{
			var tmp = responseDetails.responseText;
			var tmp2 = tmp.indexOf("<!-- www.000webhost.com Analytics Code -->");
			var tmp3 = tmp.substring(0,tmp2-1);
			if(tmp3.length > 6)
			{
				document.getElementById('chat_main').innerHTML = responseDetails.responseText;
				document.getElementById('chat_controls').innerHTML = '<input type="text" value="" id="chat_message"  maxlength="250" size="85" /><input id="chat_send" type="button" value="Send" />';
				document.getElementById('chat_send').addEventListener('click', fakeClubSend, true);
				checkCount();
			}
		}
	  });
}


function init()
{
	buildChat();
	checkCount();
	setInterval ( ref1 , 10000 );
}
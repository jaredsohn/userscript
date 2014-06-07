// ==UserScript==
// @name			Chat in Quake Live Welcome screen
// @version			1.0.5
// @author			kry
// @namespace		http://userscripts.org/users/kry
// @description		Shows the Quake Live chat in Welcome screen with previous chat on the right
// @include			http://*.quakelive.com/*
// @exclude			http://*.quakelive.com/forum*
// ==/UserScript==

/************************************************************

Licensed for unlimited modification and redistribution
as long as this notice is kept intact.

Chat in Quake Live Welcome screen script made by kry.

This script replaces contents in Quake Live Welcome screen
with a new chat interface.

Version history
	Version 1.0.5
		- Fixed a bug where a #!join link was followed,
		the user saw the chat and not the link to game.
	Version 1.0.4
		- Before every time a new message came, the whole
		message div refreshed, now the script only adds
		the new message at the end of message div
	Version 1.0.3
		- Changed Welcome image text to Chat
		- Changed Home menu Welcome text to Chat
		- If chat is already in view, no scrolling is done
	Version 1.0.2
		- Current and previous chat friend names shown
		above chats.
	Version 1.0.1
		- Increased timeout before focus is sent back to
		Welcome screen chat text field.
		- Added messages to Current and Previous chat windows
		that are used when no real chat content is present.
		- Scrolls the chat in view after sending a message
		(had problems with small resolutions)
	Version 1.0.0
		- First version
		
Known bugs
	- In order to maintain good focus on the chat text field,
		basic chat text field is not usable. If you write
		there, the focus moves back to Welcome screen chat
		text field.

************************************************************/

var haschatbox = 0;
var haslistener = 0;
var gotit = 0;
var presslistener = 0;
var hasprevious = 0;
var imagechanged = 0;
var linkchanged = 0;
var currentmessagecount = 0;
var currentmessage = 0;

function listener()
{
	if ( document.getElementById("im-chat-body").childNodes[currentmessagecount].id != "im-chat-body-bottom" )
	{
		currentmessage = document.createElement("div");
		document.getElementById("chatti").appendChild( currentmessage )
		
		currentmessage.className = document.getElementById("im-chat-body").childNodes[currentmessagecount].className;
		currentmessage.innerHTML = document.getElementById("im-chat-body").childNodes[currentmessagecount].innerHTML;

		currentmessagecount++;
	}
	else if ( currentmessage != 0 )
	{
		currentmessage.innerHTML = document.getElementById("im-chat-body").childNodes[currentmessagecount - 1].innerHTML;
	}

	var scrollable = document.getElementById("scrollable");
	scrollable.scrollTop = scrollable.scrollHeight;
}

function addmessage(i)
{

}

function listener2()
{
	setTimeout(writeit, 250);
}

/*
Found from http://www.performantdesign.com/2009/08/26/scrollintoview-but-only-if-out-of-view/
*/
function scrollIntoViewIfOutOfView(el) {
  var topOfPage = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var heightOfPage = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var elY = 0;
  var elH = 0;
  if (document.layers) {
    elY = el.y;
    elH = el.height;
  }
  else {
    for(var p=el; p&&p.tagName!='BODY'; p=p.offsetParent){
      elY += p.offsetTop;
    }
    elH = el.offsetHeight;
  }
  if ((topOfPage + heightOfPage) < (elY + elH)) {
    el.scrollIntoView(false);
  }
  else if (elY < topOfPage) {
    el.scrollIntoView(true);
  }
}

function writeit()
{
	document.getElementById("chatinput").value = document.getElementById("chat-msg").value;
	document.getElementById("chatinput").focus();
	scrollIntoViewIfOutOfView( document.getElementById('qlv_chat') );
}

function addchatlistener()
{
	document.getElementById("chatti").innerHTML = "";
	while ( document.getElementById("im-chat-body").childNodes[currentmessagecount].id != "im-chat-body-bottom" )
	{
		currentmessage = document.createElement("div");
		currentmessage.className = document.getElementById("im-chat-body").childNodes[currentmessagecount].className;
		currentmessage.innerHTML = document.getElementById("im-chat-body").childNodes[currentmessagecount].innerHTML;
		document.getElementById("chatti").appendChild( currentmessage )
		currentmessagecount++;
	}

	var scrollable = document.getElementById("scrollable");
	scrollable.scrollTop = scrollable.scrollHeight;
	
	document.getElementById("im-chat-body").addEventListener('DOMSubtreeModified', listener, false);
	document.getElementById("chat-msg").addEventListener('keypress', listener2, false);
	
	findselected();
}

function changeimage()
{
	var button = document.getElementById('btn_welcome');
	button.id = "btn_chat";
	button.style.backgroundImage = "url(http://img850.imageshack.us/img850/5585/chatlink.png)";
}

function changelink()
{
	var link = document.getElementById('tn_home').getElementsByTagName('ul')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0];
	link.innerHTML = "Chat";
	link.id = "link_chat";
}

function findselected()
{
	var found = 0;
	var cont = 1;
	var i = 0;
	var current = 0;
	
	var itemlist = document.getElementById('im-active').getElementsByTagName('div')[0];
	
	while ( cont )
	{
		if ( current = itemlist.getElementsByTagName('div')[i] )
		{
			if ( current.className == "rosteritem rosteritem-selected" )
			{
				cont = 0;
				found = 1;
			}
			i++;
		}
		else if ( found == 0 )
		{
			found = 2;
			itemlist = document.getElementById('im-online').getElementsByTagName('div')[0];
			i = 0;
		}
		else
		{
			cont = 0;
		}
	}
	
	if ( found == 1 )
	{
		var copyofcurrent = document.createElement("div");
		
		copyofcurrent.innerHTML = current.innerHTML;
		copyofcurrent.id = "1chatname";
		
		copyofcurrent.getElementsByTagName('span')[3].innerHTML = "";
		
		document.getElementById('chatname').innerHTML = "";
		document.getElementById('chatname').appendChild(copyofcurrent);
	}
}

document.body.addEventListener('DOMNodeInserted', function(event)
{
	if ( ( document.getElementById("qlv_welcome") || document.getElementById("qlv_chat") ) && location.hash.match("#!welcome") )
	{
		if ( haschatbox == 0 )
		{
			haschatbox = 1;
			gotit = document.getElementById("qlv_welcome");
			gotit.innerHTML = "<table style='height:515px;width:650px;margin-left:auto;margin-right:auto;margin-top:5px;text-align:center;'><tr><td><p style='color:#000000;'>Current chat</p></td><td><p style='color:#000000;'>Previous chat</p></td></tr><tr><td id='chatnametd'><div id='chatname'><p></p></div></td><td id='chatnametd2'><div id='chatname2'><p></p></div></td></tr><tr><td><div id='scrollable' style='height:477px;width:310px;margin-left:auto;margin-right:auto;margin-bottom:5px;overflow:auto;background-color:#ffffff;border-style:ridge;border-color:#000000;border-width:3px;'><div id='chatti' style='color:#000000;'></div></div></td><td><div id='scrollable2' style='height:477px;width:310px;margin-left:auto;margin-right:auto;margin-bottom:5px;overflow:auto;background-color:#fbfbfb;border-style:solid;border-color:#000000;border-width:1px;'><div id='chatti2' style='color:#000000;'></div></div></td></tr><tr><td><input type='text' id='chatinput' size='45' value='' style='margin-left:auto;margin-right:auto;border-style:inset;border-color:#000000;border-width:1px;' onkeydown='if(event.keyCode==13){document.getElementById(\"chat-msg\").value = document.getElementById(\"chatinput\").value;document.getElementById(\"chatinput\").value = \"\";document.getElementById(\"chat-msg\").focus();document.getElementById(\"im-chat-send\").click();document.getElementById(\"chatinput\").value = \"\";document.getElementById(\"chat-msg\").blur();}' /></td></tr></table>";
			gotit.id = "qlv_chat";
			
			var chatname = document.getElementById('chatnametd');
			
			chatname.style.color = "#000000";
			chatname.style.width = "300px";
			chatname.style.height = "21px";
			chatname.style.marginLeft = "auto";
			chatname.style.marginRight = "auto";
			
			var chatname = document.getElementById('chatnametd2');
			
			chatname.style.color = "#000000";
			chatname.style.width = "300px";
			chatname.style.height = "21px";
			chatname.style.marginLeft = "auto";
			chatname.style.marginRight = "auto";
			
			document.getElementById("chatti").innerHTML = "<table style='height:477px;width:100%;text-align:center;'><tr><td>You do not have any active chats</td></tr>";
			document.getElementById("chatti2").innerHTML = "<table style='height:477px;width:100%;text-align:center;'><tr><td>You do not have any previous chats</td></tr>";
		}
	}
	else
	{
		haschatbox = 0;
	}
	
	if ( document.getElementById("im-chat-body") && haschatbox == 1 )
	{
		if ( haslistener == 0 )
		{
			haslistener = 1;
			hasprevious = 1;
			
			document.getElementById("chatinput").focus();
			document.getElementById("chat-msg").addEventListener('keypress', listener2, false);
			setTimeout(addchatlistener, 500);
		}
	}
	else
	{
		if (haslistener == 1)
		{
			hasprevious = 0;
			haslistener = 0;
			
			currentmessagecount = 0;
			currentmessage = 0;
			
			var chatname = document.getElementById('1chatname');
			chatname.id = "2chatname";
			document.getElementById('chatname2').innerHTML = "";
			document.getElementById('chatname2').appendChild(chatname);
			document.getElementById('chatname').innerHTML = "";
			
			document.getElementById("chatti2").innerHTML = document.getElementById("chatti").innerHTML;
			
			var scrollable = document.getElementById("scrollable2");
			scrollable.scrollTop = scrollable.scrollHeight;
			
			document.getElementById("chatti").innerHTML = "<table style='height:477px;width:100%;text-align:center;'><tr><td>Your friend has logged off or you closed the active chat</td></tr>";
			
			document.getElementById("im-chat-body").removeEventListener('DOMSubtreeModified', listener, false);
			document.getElementById("chat-msg").removeEventListener('keypress', listener2, false);
		}
	}
	
	if ( document.getElementById('btn_welcome') )
	{
		changeimage();
	}
	
	if ( document.getElementById('tn_home') && !document.getElementById('link_chat') )
	{
		changelink();
	}
}, false);
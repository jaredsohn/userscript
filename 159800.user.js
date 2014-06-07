// ==UserScript==
// @name Alternative Chatform
// @namespace Avalon
// @description adds a select bar next to chat bar. DOES NOT WORK WITH BATTLECOUNTERS!
// @include http://thelostrunes.com/game.php
// @include	http://www.thelostrunes.com/game.php
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



addGlobalJS("function customsubmitchat() { var message = document.getElementById('chatinput').value; var messagetype = document.getElementById('customtype').value; if (message.match(/(\\||#)/g)) { alert('Messages cannot contain the characters | or #.'); } else if (chatsubmitted == 1) { alert('Please wait until your previous message has been sent.'); } else { if(messagetype == 1) { var cmsg = message; } else if(messagetype == 2) { var cmsg = '/c '+message; } else if(messagetype == 3) { var cmsg = '/me '+message; } else if(messagetype == 4) { var cmsg = '/n '+message; } else if(messagetype == 5) { var cmsg = '/s '+message; } if (message == '/togglechatcolor') { togglechatcolor() } else { chatsubmitted = 1; disablechattimer = setTimeout('chatsubmitted = 0;', 3000); sendChat2('misc.php?mod=chat', 'msg='+cmsg); } } }");

document.getElementById("chatform").innerHTML = '<form style="margin-top: 0px; margin-bottom: 0px;" action="javascript:customsubmitchat();"><input type="text" onblur="chatfocused=0" onfocus="chatfocused=1" size="100" id="chatinput"> <select name="type" id="customtype"><option value="1">Normal</option><option value="2">Clan</option><option value="3">Emote</option><option value="4">Newbie</option><option value="5">Staff</option> <input type="submit" value="Chat"></form><span id="presetbar"><allign=right>';










// ==UserScript==
// @name        TLR - Private Messaging
// @namespace   ThatGuyOverThere
// @include     http://www.thelostrunes.com/game.php
// @include     http://thelostrunes.com/game.php
// @version     1
// @grant       none
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

var users = new Array();
var keys = new Array();

/*EDIT ONLY USERS AND KEYS##########################################*/

/*USERS -> Add Users Here -> users[n] = "username";*/

users[0] = "Preset";
users[1] = "Example";
users[2] = "List";

/*END OF USERS LIST*/

/*KEYS -> Add Generated Keys Here -> keys[n] = "key";*/

keys[0] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
keys[1] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
keys[2] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/*END OF KEYS LIST*/

/*EDIT ONLY USERS AND KEYS##########################################*/

var uCount = 0;
var uArray = ""; var kArray = "";
while (uCount < users.length)
{
	uArray += '"'+users[uCount] +'",';
	kArray += '"'+keys[uCount] +'",';
	uCount++;
}
uArray = uArray.substr(0, (uArray.length - 1));
kArray = kArray.substr(0, (kArray.length - 1));

function varName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var uArrayName = varName();
var kArrayName = varName();

while (uArrayName == kArrayName)
{
	kArrayName = varName();
}

addGlobalJS("var "+ uArrayName +" = Array("+ uArray +"); var "+ kArrayName +" = Array("+ kArray +");");

addGlobalJS('function pmKeyGen(){var text = "";var possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";for (var i=0; i < 52; i++){var nextChar = possible.charAt(Math.floor(Math.random() * possible.length));text += nextChar;possible = possible.replace(nextChar, "");}alert(text);}');

document.getElementById('chatform').innerHTML = '<table border="0" cellspacing="0" cellpadding="0"><tr><td><form style="margin-top: 0px; margin-bottom: 0px;" action="javascript:submitChat();"><select id="prefixcommand"><option></option><option>/c</option></select> <input type="text" onblur="chatfocused=0" onfocus="chatfocused=1" size="100" id="chatinput"> <input type="submit" value="Chat"></form></td><td><input id="enc_check" type="checkbox" checked /> <input type="submit" value="Key Gen" onClick="pmKeyGen();" /></td></tr></table>';

addGlobalJS("function ucwords (str) {return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {return $1.toUpperCase();});}");

addGlobalJS("function linkReplace(text) {var exp = /(\\b(https?|ftp|file):\\/\\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/ig;return text.replace(exp,'<a href=\\'$1\\' target=\\'_blank\\'>$1</a>'); }");

addGlobalJS("function handleResponse4(){	if(chat.readyState == 4)	{		var response = chat.responseText;		var update = new Array();		if(response.indexOf('|' != -1))		{			update = response.split('|');			update.shift();			var totalUpdates = update.length;			var currentUpdate = 1;			while (currentUpdate <= totalUpdates)			{        if (chatArray.length >= chatLimit) {          chatArray.shift();        }				chatArray.push(update[currentUpdate-1]);				currentUpdate += 1;			}			var chatmsg = '';			for (var i=chatArray.length-1; i>=0; --i)			{					chatArray[i]=chatArray[i].replace(/%/g, '&#37;');				var check1 = chatArray[i].search(\"PM From <a href=\\\"javascript:m\\\\('\"); var check2 = chatArray[i].search(\"PM Sent To <a href=\\\"javascript:m\\\\('\");var check3 = chatArray[i].search(\":  pm123\"); var check4 = chatArray[i].search(\": \\\"pm123\"); if ((check1 != -1) && (check3 != -1)) { var newChat = chatArray[i].substr(60); newChat = newChat.split('\\''); var uCheck = "+ uArrayName +".indexOf(ucwords(newChat[0].toLowerCase())); if (uCheck != -1) { var decKey = "+ kArrayName +"[uCheck]; var toDec = chatArray[i].substr(78 + (newChat[0].length*2)); toDec = toDec.substr(0,(toDec.length - 7)); var decoded = decodeStr(toDec,decKey); chatArray[i] = chatArray[i].replace('pm123 '+toDec, decoded +' (encrypted)'); chatArray[i] = linkReplace(chatArray[i]); } } else if ((check2 != -1) && (check4 != -1)) { var newChat = chatArray[i].substr(63); newChat = newChat.split('\\''); var uCheck = "+ uArrayName +".indexOf(ucwords(newChat[0].toLowerCase())); if (uCheck != -1) { var decKey = "+ kArrayName +"[uCheck]; var toDec = chatArray[i].substr(81 + (newChat[0].length*2)); toDec = toDec.substr(0,(toDec.length - 8)); var decoded = decodeStr(toDec,decKey); chatArray[i] = chatArray[i].replace('pm123 '+toDec, decoded +' (encrypted)'); chatArray[i] = linkReplace(chatArray[i]); } }		chatmsg = chatmsg + chatArray[i] + '<br />';			}			document.getElementById('chat').innerHTML = chatmsg;		}		chatcalled = 0;				clearTimeout(disablechattimer);		clearTimeout(chatcalledtimer);	}}");

addGlobalJS('function submitChat(){ var cmsg = document.getElementById("chatinput").value;if (cmsg.match(/(\\||#)/g)){alert("Messages cannot contain the characters | or #.");}else if(cmsg.match(/^\\/view/)){document.getElementById("chatinput").value = "";viewPlayer(cmsg.substring(6));}else if(chatsubmitted == 1){alert("Please wait until your previous message has been sent.");}else{if(chatprefix.length>0){            if (cmsg.substring(0,1) == "/") {              var outcome = window.confirm("You\\\'ve picked a prefix in the drop down menu, but started the message with a \\\'/\\\'. Are you sure you want to send this message?");              if (!outcome) {                return false;              }            }cmsg = chatprefix+cmsg;}chatsubmitted = 1;disablechattimer = setTimeout("chatsubmitted = 0;", 3000); if (document.getElementById("enc_check").checked){var splitmsg = cmsg.split(":");var receiver = splitmsg[0].substr(3);var arrayCheck = '+ uArrayName +'.indexOf(ucwords(receiver.toLowerCase()));if (arrayCheck != -1){var encKey = '+ kArrayName +'[arrayCheck];var toEnc = cmsg.substr(receiver.length + 4);var encMsg = encodeStr(toEnc,encKey);cmsg = "/m "+ receiver +": pm123 "+ encMsg;}} cmsg = cmsg.replace(/\\+/g, "%2B").replace(/&/g, "%26"); sendChat2("misc.php?mod=chat", "msg=" + cmsg);}}');

addGlobalJS('function encodeStr(uncoded,key) {uncoded = uncoded.replace(/^\\s+|\\s+$/g,""); var coded = "";var chr;for (var i = 0; i <= uncoded.length - 1; i++) { chr = uncoded.charCodeAt(i); if (chr >= 65 && chr <= 90) { coded += key.charAt(chr - 65); } else if (chr >= 97 && chr <= 122) { coded += key.charAt(chr - 71); } else { /*coded += String.fromCharCode(chr);*/ coded += uncoded.charAt(i); }  }return encodeURIComponent(coded);} function decodeStr(coded,key) {coded = decodeURIComponent(coded); coded = $("<div/>").html(coded).text();var uncoded = "";var chr;for (var i = 0; i <= coded.length - 1; i++) {chr = coded.charAt(i);if ((key.indexOf(chr) < 26) && (chr >= "A" && chr <= "z") && (coded.charAt(i) != "\\`") && (coded.charAt(i) != "\\_") && (coded.charAt(i) != "\\[") && (coded.charAt(i) != "\\]") && (coded.charAt(i) != "\\^") && (coded.charAt(i) != "\\\\")) { uncoded += String.fromCharCode(65 + key.indexOf(chr)); } else if ((key.indexOf(chr) > 25) && (chr >= "A" && chr <= "z") && (coded.charAt(i) != "\\`") && (coded.charAt(i) != "\\_") && (coded.charAt(i) != "\\^") && (coded.charAt(i) != "\\[") && (coded.charAt(i) != "\\]") && (coded.charAt(i) != "\\\\")) { uncoded += String.fromCharCode(71 + key.indexOf(chr)); } else { uncoded += chr; } }return uncoded; }');
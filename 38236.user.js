// ==UserScript==
// @name	Itamaram's SwordSlayer
// @namespace	http://itamaram.selfip.com:8621/SwordSlayer.user.js
// @description	Modifies the chat so that the sword would be less annoying
// @include	http://*.kingdomofloathing.com/*
// @include	http://127.0.0.1:60080/*
// ==/UserScript==

//This script is more of a mash-up, rather than an actual script. The small amount of code I've 
//actually generated rather than copy pasted is probably badly written, and hence easily recognizable.
//This scripts used the following sources (listed in no particular order):
//[0] The source code of KoL's chat window
// www*.kingdomofloathing.com/lchat.php
//[1] Dive into Greasemonkey section 5.5
// http://diveintogreasemonkey.org/casestudy/dumbquotes.html
//[2] OneTonTomato's Birthdays script
// http://kol.upup.us/scripts/scripts.php?script=birthdays.user.js
//[3] OneTonTomato's Chat Functions script
// http://kol.upup.us/scripts/scripts.php?script=ChatFunctions.user.js
//[4] KoL Wiki page regarding the Sword Behind Inappropriate Prepositions
// http://kol.coldfront.net/thekolwiki/index.php/Sword_behind_inappropriate_prepositions
//[5] PLT1 website
// plt1.com
//[6] EvilTwinSkippy's forum post in the script's thread
// http://forums.kingdomofloathing.com/vb/showpost.php?p=3030753&postcount=8

//Version history:
//1.0
// initial release
//1.1:
// Code improvement
// Capitalize instead of adding full stops
// Got the KolMafia relay browser port right
//2.0
// Now monitors all pages in order to automatically note the sword being equipped unequipped.
//2.1
// removed a bug which caused multiple filter messages to appear.

function periodify(str){
	//Capitalizes all words which would otherwise be affected by the sword. Concept taken from [6]
	//Structure of code is inspired from [1], list of prepositions is taken from [4]
	var words, replacements, regex, key;
	words = ["about", "above", "across", "after", "against", "along", "among", "around", "at", "before", "behind",
		"below", "beneath", "beside", "between", "beyond", "by", "down", "during", "except", "for", "from", "in",
		"inside", "into", "like", "near", "of", "off", "on", "onto", "out", "outside", "over", "past", "through",
		"throughout", "to", "under", "up", "upon", "with", "within", "without"];
	replacements = {};
	regex = {};
	for (i = 0 ; i < words.length ; i++){
		regex[words[i]] = new RegExp("\\b" + words[i] + "\\b", 'gi');
		//\b is the escape sequence matching the start of a string,
		//the end of a string, or a whitespace. (used to recognize words) [5]
		replacements[words[i]] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
	}
	for (i = 0 ; i < words.length ; i++){
		str = str.replace(regex[words[i]], replacements[words[i]]);
	}
	return str;
}

var chatField = null;
var chatButton = null;
if (window.location.pathname == "/lchat.php"){
	//Algorithm for finding chatField/chatButton is copied from [3]. Slight modification had been made to make
	//the calls valid from any frame.
	chatElements = parent.document.getElementsByTagName('frame')[3].contentDocument.forms.namedItem('chatform').elements;
	chatField = chatElements.namedItem('graf');
	for(var i=1 ; i<chatElements.length ; i++) {
		if(chatElements[i].value == "Chat" && chatElements[i].type == "button") {
			chatButton = chatElements[i];
			break;
		}
	}


	//The following code removes the default events for the chat control pane.
	//I wrote them, and hence this is probably the incorrect way to do so.
	//See [3] and [4] for a more elegant solution.
	//This is probably going to clash with other scripts revolving around the chat. Sorry about that.
	var ins = document.getElementsByTagName('input');
	for (var i = 0 ; i < ins.length ; i++)
	{
		if (ins[i].value=="Chat"){
			ins[i].setAttribute("onClick", null);
		}
		if (ins[i].name == 'graf'){
			ins[i].setAttribute("onKeyUp",null);
		}
	}
	
	chatButton.addEventListener('click', processMessage, true);
	chatField.addEventListener('keyup', handlekey, true);
}

//This method adds a (green) message to your chat window. Highly reusable!
function messageToChat(str){
	var msg = document.createElement('div');
	msg.className = "sword message";
	var font=document.createElement('font');
	font.color="green";
	font.appendChild(document.createTextNode(str));
	msg.appendChild(font);
	document.getElementById('ChatWindow').appendChild(msg);
}

//Checks for special cases of input, and calls the default function otherwise
function processMessage(){
	if (chatField.value == "/sword on"){
		GM_setValue('swordon',true);
		messageToChat("Sword filter is now on")
		chatField.value = "";
	}
	else if (chatField.value == "/sword off"){
		GM_setValue('swordon',false);
		messageToChat("Sword filter is now off")
		chatField.value = "";
	}
	else{
		if(GM_getValue('swordon',false) == true){
			chatField.value = periodify(chatField.value.toString());
		}
		unsafeWindow.submitchat();
	}
}

function handlekey(e){
	unsafeWindow.cycles=0;//cycles is responsible for chat timeout. When it reaches a threshold, your chat times out.
	var found;
	found=0;//no idea what is the purpose of this variable. It was copy pasted from [0] as a safety measure.
	if (e.keyCode==13) {
		processMessage();
		found=1;
	}
	if (found==0) {
		if (e.which==13) processMessage();;
	}
}

//checks for the equipping unequipping of the sword in the main window
if (window.location.pathname != "/lchat.php" && window.location.pathname != "/compactmenu.php" && window.location.pathname != "/charpane.php"){
	document.addEventListener('DOMNodeInserted',function(){canItBeSwordTimeNow();},true);
}
function canItBeSwordTimeNow(){
	//get the title of the topmost box displayed.
	titlenode = document.evaluate(
    '//td[@bgcolor="blue"]/b/text()',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
	if (titlenode.data != "Results:"){
		return;
	}
	
	//get the content of the first box (if it is a results box)
	var tablenode = document.evaluate(
	'//table[@width="95%"][@cellspacing=0][@cellpadding=0]',
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
    //The HTML snippets which will show when the sword is equipped and unequipped.
    var swordEquip1 = '<tr><td align="right">You equip an item:</td><td><img style="vertical-align: middle;" class="hand" src="http://images.kingdomofloathing.com/itemimages/prepsword.gif" onclick="descitem(656480531)">';
    var swordEquip2 = '<tr><td align="right">Item equipped:</td><td><img style="vertical-align: middle;" class="hand" src="http://images.kingdomofloathing.com/itemimages/prepsword.gif" onclick="descitem(656480531)">';
    var swordUnequip = '<tr><td align="right">Item unequipped:</td><td><img style="vertical-align: middle;" class="hand" src="http://images.kingdomofloathing.com/itemimages/prepsword.gif" onclick="descitem(656480531)">';
    if (tablenode.innerHTML.indexOf(swordEquip1) != -1 || tablenode.innerHTML.indexOf(swordEquip2) != -1){
	    if (GM_getValue('swordon',false) != true){
		    results('<center>Sword Slayer Filter is <b>on</b></center>');
			GM_setValue('swordon',true);
		}
	    return;
    }
    else if (tablenode.innerHTML.indexOf(swordUnequip) != -1){
	    if (GM_getValue('swordon', false) != false){
		    results('<center>Sword Slayer Filter is <b>off</b></center>');
			GM_setValue('swordon',false);
		}
	    return;
    }
}

//displays a KoL style results box at the top of the page. innode is the content of the box.
function results(innode){
	var t = document.createElement('table');
	t.setAttribute('width','95%');
	t.setAttribute('cellspacing','0');
	t.setAttribute('cellpadding','0');
	t.innerHTML = '<tr><td style="color: white;" align=center bgcolor=blue><b>Results:</b></td></tr><tr><td style="padding: 5px; border: 1px solid blue;">'+innode+'</td></tr><tr><td height=4></td></tr>';
	
	//gets the mainframe, the first table in it, and appends the new results box above it.
	var mainframe = parent.document.getElementsByTagName('frame')[2].contentDocument.getElementsByTagName('centeR')[0];
	var firstTable = mainframe.getElementsByTagName('table')[0];
	mainframe.insertBefore(t,firstTable);
}
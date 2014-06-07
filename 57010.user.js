// ==UserScript==
// @name           Reborn Ultra Script
// @namespace      http://forums.graal.in/
// @description    Gives you more options for Reborn forums
// @include        http://forums.graal.in/*
// ==/UserScript==

var smileylist = [
	[":marlon:", "http://i8.photobucket.com/albums/a13/stonependant/emote-marlon-2.png"],
	[":(", "http://forums.graal.in/forums/images/style_graal/smilies/frown.gif"],
	[":pluffy:", "http://forums.graal.in/forums/images/style_graal/smilies/pluffy.gif"],
	[":cool:", "http://forums.graal.in/forums/images/style_graal/smilies/cool.gif"],
	[":rolleyes:", "http://forums.graal.in/forums/images/style_graal/smilies/rolleyes.gif"],
	[":redface:", "http://forums.graal.in/forums/images/style_graal/smilies/redface.gif"],
	[":confused2:", "http://forums.graal.in/forums/images/style_graal/smilies/confused.gif"],
	[":wink:", "http://forums.graal.in/forums/images/style_graal/smilies/wink.gif"],
	[">_<", "http://forums.graal.in/forums/images/style_graal/smilies/raspberry.gif"],
	["x_x", "http://forums.graal.in/forums/images/style_graal/smilies/displeased.gif"],
	[":)", "http://forums.graal.in/forums/images/style_graal/smilies/smile.gif"],
	[":whatever:", "http://forums.graal.in/forums/images/style_graal/smilies/whatever.gif"],
	["!pissed!", "http://forums.graal.in/forums/images/style_graal/smilies/pissed.gif"],
	[":cry:", "http://forums.graal.in/forums/images/style_graal/smilies/cry.gif"],
	[":P", "http://forums.graal.in/forums/images/style_graal/smilies/tongue.gif"],
	[":oo:", "http://forums.graal.in/forums/images/style_graal/smilies/oo.gif"],
	[":blush:", "http://forums.graal.in/forums/images/style_graal/smilies/blush.gif"],
	[":spam:", "http://forums.graal.in/forums/images/style_graal/smilies/spam.gif"],
	[":noob:", "http://forums.graal.in/forums/images/style_graal/smilies/noob.gif"],
	[":D", "http://forums.graal.in/forums/images/style_graal/smilies/biggrin.gif"],
	[":unixmad:", "http://i8.photobucket.com/albums/a13/stonependant/unixico.png"],
	[":dangerless:", "http://i8.photobucket.com/albums/a13/stonependant/emote-dangerless-1.png"],
	[":megaeek:", "http://forums.graal.in/forums/images/style_graal/smilies/megaeek.gif"],
	[":asleep:", "http://forums.graal.in/forums/images/style_graal/smilies/asleep.gif"],
	["Dangerless", "http://forums.graal.in/forums/images/style_graal/smilies/pluffy.gif"],
	[":animesmiley:", "http://forums.graal.in/forums/images/style_graal/smilies/animesmiley.gif"],
	[":eek:", "http://forums.graal.in/forums/images/style_graal/smilies/eek.gif"],
	[":fro:", "http://forums.graal.in/forums/images/style_graal/smilies/fro.gif"],
	[":mad:", "http://forums.graal.in/forums/images/style_graal/smilies/mad.gif"],
];

function testStuff(smileyid) {
	textarea = document.getElementById('vB_Editor_QR_textarea');
	if (!textarea) {
		textarea = document.getElementById('vB_Editor_001_textarea');
	}
	var code = smileylist[smileyid][0];
	var left = textarea.value.substr(0, textarea.selectionStart);
	var right = textarea.value.substr(textarea.selectionEnd);
	textarea.value = left + code + right;
	textarea.selectionStart = textarea.selectionEnd = left.length + code.length;
	textarea.focus();
}

function main() {
//THIS MOTHERFUCKIN CODE RIGHT DOWN HERE GIVES YOU THE EXTRA OPTIONS, NUMBNUTS
var allUsers, curUser, cloneUid;
allUsers = document.evaluate(
    "//a[@class='bigusername']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0; i<allUsers.snapshotLength; i++) {
	curUser = allUsers.snapshotItem(i);
	cloneUid = curUser.cloneNode(true);
	var addFriend = document.createElement('a');
	addFriend.innerHTML = '<a href="' + cloneUid.href.replace(/member.php\?/gi, "profile.php?do=addlist&userlist=friend&") + '">Add Friend</a><br><a href="' + cloneUid.href.replace(/member.php\?/gi, "profile.php?do=addlist&userlist=ignore&") + '">Add to Ignore List</a><br>';
	curUser.parentNode.parentNode.appendChild(addFriend);
}

//WHY ARE YOU LOOKING IN MY SOURCE CODE ANYWAY YOU QUEERSHIT?

//THIS IS SHIT FOR THE SMILEY BAR MOTHER FUCKER
var qrtextarea = document.getElementById('vB_Editor_QR_textarea');
if (!qrtextarea) {
	qrtextarea = document.getElementById('vB_Editor_001_textarea');
}
if (qrtextarea) {
	smilesHolder = document.createElement('div');
	qrtextarea.parentNode.insertBefore(smilesHolder, qrtextarea.nextSibling);
	smilesHolder.style.overflowX = 'scroll';
	smilesHolder.style.width = '620px';
	smilesHolder.innerHTML = '<div id="smilesBar" style="width:800px;"></div>';
	var smilesBar = document.getElementById('smilesBar');
	for (var i=0;i<smileylist.length;i++) {
		var smileybutton = document.createElement('img');
		smileybutton.src = smileylist[i][1];
		smileybutton.name = i;
		smileybutton.addEventListener('click', function() {testStuff(this.name)}, false);
		smilesBar.appendChild(smileybutton);
	}
}
}

window.addEventListener('load', main, false);
// ==UserScript==
// @name           RiX's MouseHunt Friends
// @namespace      robbiedebadeend
// @include        http://apps.facebook.com/mousehunt/*
// @description	   This script shows a box with link to mousehunt friends
// ==/UserScript==

var rixfrdiv;
var rixfriendsettings;
var rixfriendsownprofile;
var rixfriendscurpage = document.location.href;
Number.prototype.toSource=Boolean.prototype.toSource=Function.prototype.toSource=function() {return this+''}
String.prototype.toSource=function() {var s=this;s=s.replace(/\\/g, "\\\\");s=s.replace(/\"/g, "\\\"");s=s.replace(/\n/g, "\\n");s=s.replace(/\r/g, "");return '"'+s+'"'}
Array.prototype.toSource=function() {var a=this;var s1='[';if (a.length>0) {for (var i=0;i<a.length;i++) {if ((a[i]+'')=='undefined') {s1+=', ';continue;};s1+=a[i].toSource()+(i<a.length-1?',':'')}};s1+=']';return s1}
Object.prototype.toSource=function() {var o=this;if (o==null) return 'null';var s1='';for (var item in o) {if (item=="toSource") continue;	if (o[item]==null) {continue;};s1+=item+':'+o[item].toSource()+','};s1=s1.substr(0,s1.length-1);s1='{'+s1+'}';return s1}
function preinstall() {
	defaultfriends = [['RiX','http://apps.facebook.com/mousehunt/hunterprofile.php?snuid=1043491160']];
	GM_setValue('version','1.0');
	GM_setValue('friends', defaultfriends.toSource());
	GM_setValue('ownprofile', 'http://apps.facebook.com/mousehunt/hunterprofile.php?snuid=1043491160');
	alert('Be sure to set you own hunters profile in the settings (by clicking on the --edit marker)');
	loadSettings();
}
function storeSettings() {
	GM_setValue('friends', rixfriendsettings.toSource());
	GM_setValue('ownprofile', rixfriendsownprofile);
	loadSettings();
	removeRixFriends();
	printRixFriends();
}
function storeOwnProfile() {
	var newownprofile = document.getElementById('rixfrOwnprofile').value;
	if(newownprofile.indexOf('http://apps.facebook.com/mousehunt/hunterprofile.php?snuid=') != -1) {
		rixfriendsownprofile = newownprofile;
		storeSettings();
	}
	else
		alert('not a valid Hunters Profile URL entered !!');
}
function loadSettings() {
	rixfriendsettings = GM_getValue('friends');
	if(typeof rixfriendsettings == "undefined")
		alert("couldnt load settings for RiX's MouseHunt Friends");
	else {
		eval('rixfriendsettings = '+GM_getValue('friends'));
		rixfriendsownprofile = GM_getValue('ownprofile');
	}
}
if(GM_getValue('version') != '1.0')
	preinstall();
else
	loadSettings();



function printRixFrEditBox() {
	var settingsbackdiv = document.createElement('div');
	settingsbackdiv.id = 'rixfrSettingsBack';
	settingsbackdiv.setAttribute('style','display:block;z-index:1001;position:fixed;top:0;left:0;width:100%;height:100%;background:black;opacity:0.4');
	document.body.appendChild(settingsbackdiv);
	var settingsdiv = document.createElement('div');
	settingsdiv.id = 'rixfrSettings';
	settingsdiv.setAttribute('style','display:block;z-index:1002;position:fixed;overflow:auto;left:10%;top:10%;width:80%;height:80%;background-color:white;padding:15px;border:1px solid black');
	document.body.appendChild(settingsdiv);
	var html = "<h2>RiX's MouseHunt Friends</h2>";
	html += "<table cellspacing='5' cellpadding='5'><th>Your own huntersprofile</th></tr>";
	html += "<tr><td><input type='text' name='rixfrOwnprofile' id='rixfrOwnprofile' size='100' value='";
	html += rixfriendsownprofile;
	html += "'/></td></tr>";
	html += "<tr><td style='text-align:right'><button id='rixfrSaveSettings'>Save Settings</button></td></tr>";
	html += "</table>";
	document.getElementById('rixfrSettings').innerHTML = html;

	document.getElementById('rixfrSaveSettings').addEventListener('click', function(e) {storeOwnProfile();hideRixFrEditBox();}, false);
	document.getElementById('rixfrSettingsBack').addEventListener('click', function(e) {hideRixFrEditBox();}, false);
}
function hideRixFrEditBox() {
	settingsbackdiv = document.getElementById('rixfrSettingsBack');
	settingsdiv = document.getElementById('rixfrSettings');
	settingsbackdiv.parentNode.removeChild(settingsbackdiv);
	settingsdiv.parentNode.removeChild(settingsdiv);
}


function createFriendName(friendname) {
	var newfriendname = '';
	if(friendname.length > 18) {
		for(var i=0;i<15;i++) {
			newfriendname += friendname[i];
		}
		newfriendname += '...';
	}
	else
		newfriendname = friendname;
	return newfriendname;
}
function getFriendsName() {
	var divs = document.getElementsByTagName('div');
	for (i=0; i<divs.length; i++) {
		if (divs[i].className == 'sectionname') {
			return divs[i].innerHTML;
		}
	}
	return 'niets';
}
function checkForFriendsPage() {
	if(rixfriendscurpage.indexOf('http://apps.facebook.com/mousehunt/hunterprofile.php?snuid=') != -1) {
		if(rixfriendscurpage != rixfriendsownprofile)
			return true;
		else
			return false;
	}
	else
		return false;
}
function addNewFriend(rixfriendname,rixfrienduri) {
	rixfriendsettings.push([rixfriendname,rixfrienduri]);
	storeSettings();
}
function createAddButton() {
	var necessary = true;
	for(var i=0;i<rixfriendsettings.length; i++) {
		var friend = rixfriendsettings[i];
		if(friend[1] == rixfriendscurpage)
			necessary = false;
	}
	if(necessary == true) {
		var rixfradd = document.createElement('span');
		rixfradd.id = 'rixfradd';
		rixfradd.style.marginLeft = '50px';
		rixfradd.style.fontSize = '-1';
		rixfradd.style.cursor = 'pointer';
		rixfradd.style.textAlign = 'center';
		rixfradd.style.display = 'block';
		rixfradd.innerHTML = '-- add';
		document.getElementById('rixfrdiv').appendChild(rixfradd);
		document.getElementById('rixfradd').addEventListener('click', function(e) {addNewFriend(getFriendsName(),rixfriendscurpage);}, false);
	}
}
function printRixFriends() {
	var html = '';
	var printbox = false;
	for(var i=0; i < rixfriendsettings.length; i++) {
		var friend = rixfriendsettings[i];
		html += '<a href="'+friend[1]+'">'+createFriendName(friend[0])+'</a><br/>';
	}
	if(html != '')
		printbox = true;
	else if(checkForFriendsPage() == true)
		printbox = true;

	if(printbox == true) {
		rixfrdiv = document.createElement('div');
		rixfrdiv.id = 'rixfrdiv';
		rixfrdiv.style.position = 'absolute';
		rixfrdiv.style.left = '20px';
		rixfrdiv.style.top = '100px';
		rixfrdiv.style.width = '100px';
		rixfrdiv.style.padding = '5px';
		rixfrdiv.style.border = '1px solid black';
		rixfrdiv.innerHTML = html;
		document.body.appendChild(rixfrdiv);
		var rixfredit = document.createElement('span');
		rixfredit.id = 'rixfredit';
		rixfredit.style.marginLeft = '50px';
		rixfredit.style.fontSize = '-1';
		rixfredit.style.cursor = 'pointer';
		rixfredit.style.textAlign = 'center';
		rixfredit.style.display = 'block';
		rixfredit.innerHTML = '-- edit';
		document.getElementById('rixfrdiv').appendChild(rixfredit);
		document.getElementById('rixfredit').addEventListener('click',function(e) {printRixFrEditBox();}, false);
		if(checkForFriendsPage() == true)
			createAddButton();
	}
}
function removeRixFriends() {
	if(document.getElementById('rixfrdiv')) {
		rixfr = document.getElementById('rixfrdiv');
		rixfr.parentNode.removeChild(rixfr);
	}
}


printRixFriends();
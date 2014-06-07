// ==============================================================
// Title:	PlzMe
// Version: 	0.2b (beta version)
// Date:	09-May-2011
// Author:	Diado
// URL:	http://diado.deviantart.com/
// Note:	This is a beta version of PlzMe, so please report any bugs or feature requests to Diado at the above URL.
// Disclaimer:	This script is provided 'as is', without any warranty or guarantee of any kind.
// Version History:
//		v0.2b		Updated to work with FireFox 4
// ==============================================================
//
//
// ==UserScript==
// @name          PlzMe v0.2b
// @namespace     PlzMe
// @description   Allows easy access to 'plz account' icons within deviantART chat rooms
// @include       http://chat.deviantart.com/*
// ==/UserScript==

var scriptPlzMe, divPlzMe, divScroller, divTitle, divCustom, divCustomLink, divDefaultIcons, divCustomIcons, hr;

GM_addStyle('#plzme_main {visibility:hidden;position:absolute;z-index:9998;background-color:#ccd9c7;width:250px;height:300px;opacity:.8;border:1px solid #40534a;left:100px;top:100px;padding:3px 5px 5px 5px;}');
GM_addStyle('#plzme_main h1 {margin:2px;font-size:14px;font-weight:normal;float:left;height:15px;}');
GM_addStyle('#plzme_main h1 a:link, #plzme_main h1 a:visited {color:#3B7E9F;}');
GM_addStyle('#plzme_scroller {position:relative;z-index:9999;background-color:#b7c3b3;width:240px;height:270px;left:0px;top:2px;padding:5px;overflow:auto;}');
GM_addStyle('.plzme_link {cursor:pointer;}');
GM_addStyle('#plzme_scroller img {margin:2px;border:1px dotted #DDDDDD;width:50px;height:50px;}');
GM_addStyle('#plzme_custom {visibility:hidden;position:absolute;z-index:9999;background-color:#ccd9c7;width:250px;height:300px;left:' + ((screen.availWidth / 2) - 125) + 'px;top:' + ((screen.availHeight / 2) - 250) + 'px;opacity:.8;border:1px solid #40534a;}');
GM_addStyle('#plzme_customLink {z-index:9999;text-align:right;float:right;height:15px;margin-top:5px;}');
GM_addStyle('#plzme_customLink a, #plzme_customLink a:link, #plzme_customLink a:visited {color:#3B7E9F;font-size:12px;font-weight:normal;text-decoration:underline;cursor:pointer;}');
GM_addStyle('#plzme_scroller hr {border:1px solid #AAAAAA;opacity:.8;}');
GM_addStyle('#plzme_custom div.header {background-color:#498091;text-align:center;color:#ffffff;font-weight:bold;font-size:16px;padding:5px;}');
GM_addStyle('#plzme_custom div.introText {text-align:left;color:#000000;font-weight:normal;font-size:10px;padding:5px;}');
GM_addStyle('#plzme_custom div.inputContainer {padding:5px;}');
GM_addStyle('#plzme_custom div.inputContainer textarea {width:233px;height:170px;font-size:11px;}');
GM_addStyle('#plzme_custom div.buttonContainer {padding:5px;text-align:right;}');

divPlzMe = document.createElement('div');
divPlzMe.id = 'plzme_main';
divPlzMe.setAttribute('onMouseOut', 'plzme_closeMenuTimed();');
divPlzMe.setAttribute('onMouseMove', 'plzme_closeMenuCancel();');
document.body.appendChild(divPlzMe);

divCustom = document.createElement('div');
divCustom.setAttribute('id', 'plzme_custom');
divCustom.innerHTML = '<div class="header">PlzMe: Edit Icons</div><div class="introText">Enter each icon code you wish to add to PlzMe on it\'s own line. (Note: A cookie is used to store these settings)</div><div class="inputContainer"><textarea id="plzme_edit"></textarea></div><div class="buttonContainer"><input type="button" value="Cancel" onClick="plzme_hideCustom();" /><input type="button" value="Save" onClick="plzme_saveCustom();" /></div>';
document.body.appendChild(divCustom);

divTitle = document.createElement('h1');
divTitle.innerHTML = '<b>PlzMe</b> by <a href="http://diado.deviantart.com/">=diado</a>';
divPlzMe.appendChild(divTitle);

divCustomLink = document.createElement('div');
divCustomLink.id = 'plzme_customLink'
divCustomLink.innerHTML = '<a onClick="javascript:plzme_showCustom();">Edit</a>';
divPlzMe.appendChild(divCustomLink);

divScroller = document.createElement('div');
divScroller.id = 'plzme_scroller';
divPlzMe.appendChild(divScroller);

divCustomIcons = document.createElement('div');
divCustomIcons.id = 'plzme_customIcons';
divScroller.appendChild(divCustomIcons);

scriptPlzMe = document.createElement('script');
scriptPlzMe.appendChild(document.createTextNode((<r><![CDATA[

var plzme_menuRequired = false;
var customIconString = '';
var customIcons = new Array();
var triggerRoom = '';

customIconString = plzme_readCookie('plzme_icons');
if (customIconString === null) {
	customIconString = ':iconnewglomp:\n:iconredbullglompplz:\n:iconmeltplz:\n:iconsqueeeplz:\n:iconballoonplz:\n:icontardglompplz:\n:iconpancakeglompplz:\n:icondoublehugplz:\n:icontardgrinn:\n:iconcookieteaseplz:\n:iconfacepalmextremeplz:\n:iconcookienomplz:\n:icontarddanceplz:\n:iconteamoplz:\n:icondweebdanceplz:\n:iconweekenddanceplz:\n:iconyeehawplz:\n:icongrindanceplz:\n:iconcarameldansenplz:\n:iconmoarplz:\n:iconpedobearplz:\n:icongwahplz:\n:iconbeautifulheartplz:\n:iconmudkipluvplz:\n:iconspartaplz:\n:iconkermityayplz:\n:iconimhappyplz:\n:iconohjoyplz:\n:iconseewhatididthere:';
}

customIconString = customIconString.replace(' ', '');
if (customIconString.length > 0 ) {
	customIcons = customIconString.split('\n');
}

function plzme_checkStack() {
	var i;
	if (dAmnChatTabStack.length > 0) {
		for (i=0; i &lt; (dAmnChatTabStack.length); i++) {
			plzme_createLink(dAmnChatTabStack[i])
		}
	}
	setTimeout('plzme_checkStack();', 500);
}
function plzme_createLink(chatTab) {
	var txtSpacer, linkPlzMe, chatToolbar;
	if (plzme_chatLinkExists(chatTab) == false) {
		txtSpacer = document.createTextNode(' | ');
		linkPlzMe = document.createElement('a');
		linkPlzMe.id = 'plzme_chatLink_' + plzme_getChatName(chatTab);
		linkPlzMe.setAttribute('onClick','plzme_show(event, \'' + chatTab + '\')');
		linkPlzMe.setAttribute('class','plzme_link');
		linkPlzMe.innerHTML = 'PlzMe';
		linkPlzMe.title = 'View / insert plz icons';
		chatToolbar = dAmnChats[chatTab].channels.main.iconbar_el.firstChild;
		chatToolbar.insertBefore(txtSpacer,chatToolbar.firstChild);
		chatToolbar.insertBefore(linkPlzMe,txtSpacer);
	}
}
function plzme_show(e, trigger) {
	var divPlzMe = document.getElementById('plzme_main');
	var boxLeft, boxTop;
	triggerRoom = trigger;
	if (window.scrollX > 0 || window.scrollY > 0) {
		boxLeft = e.clientX + window.scrollX;
		boxTop = e.clientY + window.scrollY;
	} else {
		boxLeft = e.clientX;
		boxTop = e.clientY;
	}
	boxTop -= 315;
	boxLeft -= 240;
	divPlzMe.style.left = boxLeft + 'px';
	divPlzMe.style.top = boxTop + 'px';
	divPlzMe.style.visibility = 'visible';
	return false;
}
function plzme_closeMenuTimed() {
	plzme_menuRequired = false;
	setTimeout('plzme_closeMenu();', 500);
}
function plzme_closeMenu() {
	if (plzme_menuRequired == false) {
		document.getElementById('plzme_main').style.visibility = 'hidden';
	}
}
function plzme_closeMenuForced() {
	plzme_menuRequired = false;
	document.getElementById('plzme_main').style.visibility = 'hidden';
}
function plzme_closeMenuCancel() {
	plzme_menuRequired = true;
}
function plzme_append(toAppend) {
	var inputBoxes, inputBox, selStart, selEnd;
	inputBox = dAmnChats[triggerRoom].channels.main.input_el.firstChild.firstChild;
	selStart = inputBox.selectionStart;
	selEnd = inputBox.selectionEnd;
	inputBox.value = inputBox.value.substring(0,selStart) + toAppend + inputBox.value.substring(selEnd);
	plzme_closeMenuForced();
	inputBox.focus();
}
function plzme_getUrlFromIcon(iconcode, ext) {
	var url = '';
	var iconname = '';
	if (iconcode.length > 0) {
		url += 'http://a.deviantart.com/avatars/'
		iconname = plzme_getNameFromIcon(iconcode);
		url += iconname.substring(0,1) + '/' + iconname.substring(1,2) + '/' + iconname + '.' + ext;
	}
	return url;
}
function plzme_getNameFromIcon(iconcode) {
	var name = '';
	if (iconcode.length > 0) {
		name = iconcode.replace(':icon', '');
		name = name.replace(':', '');
	}
	return name;
}
function plzme_setIcons(divTitle,icons) {
	var i, imgIcon;
	var div = document.getElementById(divTitle);
	div.innerHTML = '';
	for (i=0; i &lt; icons.length; i++) {
		if (icons[i].length > 0) {
			imgIcon = document.createElement('img');
			imgIcon.id = 'plzme_img_' + i;
			imgIcon.addEventListener('error', plzme_tryGif, true);
			imgIcon.setAttribute('onClick', 'plzme_append(\'' + icons[i] + '\');');
			imgIcon.setAttribute('width', '50px');
			imgIcon.setAttribute('height', '50px');
			imgIcon.src = plzme_getUrlFromIcon(icons[i],'gif');
			imgIcon.title = plzme_getNameFromIcon(icons[i]);
			div.appendChild(imgIcon);
		}
	}
}
function plzme_tryGif() {
	if (this.src.search('.gif') > -1) {
		this.src = this.src.replace('.gif', '.png');
		return;
	}
	if (this.src.search('.png') > -1) {
		this.src = this.src.replace('.png', '.jpg');
		return;
	}
}
function plzme_getChatName(chatKey) {
	var chatName = '';
	if (chatKey.length > 0) {
		chatName = chatKey.substring(chatKey.lastIndexOf(':'));
	}
	return chatName;
}
function plzme_chatLinkExists(chatKey) {
	if (document.getElementById('plzme_chatLink_' + plzme_getChatName(chatKey))) {
		return true;
	} else {
		return false;
	}
}
function plzme_showCustom() {
	var edit = document.getElementById('plzme_edit');
	plzme_closeMenuForced();
	edit.value = customIconString;
	edit.scrollTop = edit.scrollHeight
	edit.selectionStart = edit.value.length;
	edit.selectionEnd = edit.value.length;
	document.getElementById('plzme_custom').style.visibility = 'visible';
	edit.focus();
}
function plzme_hideCustom() {
	document.getElementById('plzme_custom').style.visibility = 'hidden';
}
function plzme_saveCustom() {
	var edit = document.getElementById('plzme_edit');
	customIconString = edit.value;
	plzme_setCookie('plzme_icons', customIconString);
	if (customIconString.length > 0 ) {
		customIcons = customIconString.split('\n');
	} else {
		customIcons = new Array();
	}
	plzme_setIcons('plzme_customIcons', customIcons);
	plzme_hideCustom();
}
function plzme_setCookie(name, value) {
  var expiryDate = new Date();
  var day = 24 * 60 * 60 * 1000;
  expiryDate.setTime(expiryDate.getTime() + (90 * day));
  document.cookie = name + "=" + escape(value) + "; expires=" +  expiryDate.toGMTString() + "; path=/; domain=deviantart.com";
}

function plzme_readCookie(name) {
  var nameValuePair, i;
  var cookieValues = document.cookie.split(/; /);
  for (i = 0; i &lt; cookieValues.length; i++) {
    nameValuePair = cookieValues[i].split(/=/);
    if (nameValuePair[0] == name)
      return unescape(nameValuePair[1]);
  }
  return null;
}

plzme_setIcons('plzme_customIcons', customIcons);
plzme_checkStack();

]]></r>).toString()));

document.getElementsByTagName('head')[0].appendChild(scriptPlzMe);
GM_log('PlzMe initialisation successful');

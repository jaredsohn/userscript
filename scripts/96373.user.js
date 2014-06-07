// ==UserScript==
// @name           JoggForumEnhancer
// @description    Ger tydligare markering av olästa respektive lästa trådar på jogg.se:s forum. Omedelbart till höger om toppmenyn finns två länkar för att markera olästa trådar med gul bakgrundsfärg och/eller lästa trådar med grå text.
// @include        http://jogg.se/*
// @include        http://www.jogg.se/*
// @version        0.4
// ==/UserScript==

var unread = true;
var read = true;
prefs=getCookie('joggPrefsGM').split('|');
if (prefs.length == 2) {
	unread=prefs[0] == 'true';
	read=prefs[1] == 'true';
} else {
	unread = confirm ('Vill du sätta bakgrundsfärg på olästa forumtrådar?');
	read = confirm ('Vill du göra lästa forumtrådar grå?');
}
setCookie('joggPrefsGM',unread.toString()+'|'+read.toString(),365);
setLinkColor(unread, read);
function setLinkColor(unread, read) {
	var allDivs = document.getElementsByTagName('DIV');
	if (allDivs) {
		for (j=0; j<allDivs.length; j++) {
			if (allDivs[j].className.indexOf('forum') != -1 && allDivs[j].className.indexOf('forum_') == -1) {
				var rows = allDivs[j].getElementsByTagName('TR');
				for (i=0; i<rows.length; i++) {
					if (rows[i].parentNode.nodeName != 'TABLE' && rows[i].parentNode.nodeName != 'TBODY') continue;
					if (rows[i].className == 'olast' || rows[i].getElementsByTagName('B').length != 0) {
						if (unread) rows[i].style.backgroundColor = '#FAF1CB';
					} else if (read) {
						var links = rows[i].getElementsByTagName('A');
						if (links.length != 0) {
							for (k=0; k<links.length; k++) {
								links[k].style.color = '#777777';
							}
						}
					}
				}
			}
		}
	}
}
var settings=document.createElement('li');
settings.style.top='-3px';
var settingUnread = document.createElement('a');
settingUnread.setAttribute('href','javascript:document.cookie=\'joggPrefsGM='+!unread+'%7C'+read+'; expires=0; path=/;\';location.reload();');
settingUnread.style.color='#0066BB';
settingUnread.style.fontWeight='bold';
settingUnread.style.background=unread?'#FFFFFF':'#FAF1CB';
settingUnread.style.padding='2px 6px';
settingUnread.style.display='inline';
settingUnread.appendChild(document.createTextNode('A'));
var settingRead = document.createElement('a');
settingRead.setAttribute('href','javascript:document.cookie=\'joggPrefsGM='+unread+'%7C'+!read+'; expires=0; path=/;\';location.reload();');
settingRead.style.color=read?'#0066BB':'#777777';
settingRead.style.background='#FFFFFF';
settingRead.style.padding='2px 6px';
settingRead.style.display='inline';
settingRead.appendChild(document.createTextNode('A'));
settings.appendChild(settingUnread);
settings.appendChild(settingRead);
document.getElementById('header_nav').appendChild(settings);

function setCookie(name,value,days){var ttl=new Date();ttl.setTime(ttl.getTime()+days*86400000);document.cookie=name+'='+encodeURIComponent(value)+'; expires='+(days!=0?(ttl.toGMTString()):'')+'; path=/;';}
function getCookie(name){if(document.cookie.length!=0)try{x=document.cookie.indexOf(name+'=');if(x!=-1){x=x+name.length+1;y=document.cookie.indexOf(';',x);if(y==-1){y=document.cookie.length;}var c=document.cookie.substring(x,y);return decodeURIComponent(c);}}catch(e){setCookie(name,'',-1)} return '';}

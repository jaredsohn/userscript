// ==UserScript==
// @name           Previous&Next Users Links
// @namespace      
// @description    Adds links to previous and next user profiles
// @include        http://leprosorium.ru/users/*
// @include        http://*.leprosorium.ru/users/*
// @author         http://leprosorium.ru/users/14685
// ==/UserScript==

uidstr = window.location.toString().match(/.*\/(\d+).*/)[1];
uid = parseInt(uidstr);
prevuid = uid - 1;
nextuid = uid + 1;
nextstr= window.location.toString().split(uidstr).join(nextuid);
prevstr= window.location.toString().split(uidstr).join(prevuid);
if (document.getElementById('gertruda') == null)
{
	username = document.getElementsByTagName('h2').item(0)
	container = document.createElement('span');
	container.innerHTML = '<br><table cellspacing="0" cellpadding="0" style="width: 100%; border: 0px;"><tr><td style="text-align: left; width: 50%;"><a href="' + prevstr + '" style="font-size: 11px; font-family: tahoma; color:#666; text-decoration: none; margin-left: 65px;"><span style="font-size: 14px;">&#8592;</span>&nbsp;previous user</a></td><td style="text-align: right; width: 50%;"><a href="' + nextstr + '" style="font-size:11px; font-family: tahoma; color: #666; margin-right: 115px;  text-decoration: none;">next user&nbsp;<span style="font-size: 14px;">&#8594;</span></a></td></tr></table>';
	username.parentNode.insertBefore(container, username);
}
else
{
	container = document.createElement('span');
container.innerHTML = '<br><table cellspacing="0" cellpadding="0" style="width: 100%; border: 0px;"><tr><td style="text-align: left; width: 50%;"><a href="' + prevstr + '" style="font-size: 11px; font-family: tahoma; color:#666; text-decoration: none;"><span style="font-size: 14px;">&#8592;</span>&nbsp;previous user</a></td><td style="text-align: right; width: 50%;"><a href="' + nextstr + '" style="font-size:11px; font-family: tahoma; color: #666; margin-right: 20px;  text-decoration: none;">next user&nbsp;<span style="font-size: 14px;">&#8594;</span></a></td></tr></table>';
	document.getElementById('generic-wrapper').insertBefore(container, document.getElementById('generic-wrapper').firstChild);
}
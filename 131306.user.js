// ==UserScript==
// @name           IPBoardImageless
// @namespace      IPBoardImageless
// @include        http://forum.gaijin.ru/*
// @include        http://www.avsim.su/forum/*
// @include        http://forums.eagle.ru/*
// @decription     Supress Alt Text for avatars and Lighbox poupups for IP.Board forums.
// ==/UserScript==

elementList = document.querySelectorAll("img.ipsUserPhoto");
for (var i=0; i<elementList.length; i++)
{
	elementList[i].setAttribute('alt', "");
}

elementList = document.querySelectorAll("a");
for (var i=0; i<elementList.length; i++)
{
	if (elementList[i].getAttribute('rel') && elementList[i].getAttribute('rel').substr(0, 8) == "lightbox")
		elementList[i].setAttribute('rel', "");
}

elementList = document.querySelectorAll("span");
for (var i=0; i<elementList.length; i++)
{
	if (elementList[i].getAttribute('rel') && elementList[i].getAttribute('rel').substr(0, 8) == "lightbox")
		elementList[i].setAttribute('rel', "");
}

elementList = document.querySelectorAll("img.inlineimg");
for (var i=0; i<elementList.length; i++)
{
	elementList[i].setAttribute('alt', "");
}

// ==UserScript==
// @name           vk_popdrag
// @namespace    vkpop
// @description    Drag&drop for popups
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", mvid, false);
var divs=new Array(), vidBox, vidHead, dragin=0, offX=0, offY=0, prevScr;
function mvid()
{
	divs=document.getElementsByTagName('DIV');

	for(i=0;i<document.getElementsByTagName('A').length;i++)
	{
		if(document.getElementsByTagName('A')[i].onclick)
		{
			document.getElementsByTagName('A')[i].onmouseup='setTimeout("delSt()", 400);';
		}
	}
	document.body.onmouseup=clearDrag;
	document.body.onmousemove=dragVid;
}

function delSt()
{
	for(i=0;i<document.getElementsByClassName(unescape('popup_box_container%20message_box')).length;i++)
	{
		if(document.getElementsByClassName(unescape('popup_box_container%20message_box'))[i].style.display!='none')
		{
			vidBox=document.getElementsByClassName(unescape('popup_box_container%20message_box'))[i];
		}
	}
	vidHead=vidBox.getElementsByClassName("box_title")[0];
	vidHead.onmousedown=dragVidStart;
	prevScr=window.scrollY;
	window.onscroll=keepVid;
}

function keepVid()
{
	vidBox.style.top=parseInt(vidBox.style.top)-prevScr+window.scrollY;
	prevScr=window.scrollY;
}

function dragVidStart(event)
{
	detectCoord();
	offX=event.clientX-cleft;
	offY=(event.clientY+window.scrollY)-ctop;
	dragin=1;
}

function clearDrag()
{
	dragin=0;
}

function dragVid(event)
{
	if(dragin)
	{
		vidBox.style.marginLeft=((event.clientX-screen.availWidth/2)-offX-2)+'px';
		vidBox.style.top=(event.clientY+window.scrollY)-10-offY+'px';
	}
}
var cleft, ctop, cel;
function detectCoord()
{
	cel=vidHead;
	cleft=cel.offsetLeft; 
	ctop=cel.offsetTop;
	while(cel=cel.offsetParent)
	{
		cleft+=parseInt(cel.offsetLeft);
		ctop+=parseInt(cel.offsetTop);
	}
}
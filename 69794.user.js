// ==UserScript==
// @name           WretchStopMusic
// @namespace      No.bbs@ptt.cc
// @description    停止無名小站的自動播放音樂(附帶修復影片播放功能XD)
// @include        http://www.wretch.cc/album/*
// @include        http://www.wretch.cc/video/*
// @include        http://www.wretch.cc/blog/*
// @include        http://js.wretch.yahoo.net/iframe.php?*
// @version        0.01
// ==/UserScript==

var o,t,u;

if((o=document.getElementById('WretchPlayer')) || (o=document.getElementById('flexPlayer')))
{
	t=o.previousSibling.innerHTML;

	if(o.src.indexOf('playerProductInstall.swf')!=-1 && (u=t.match(/"flashvars","(feedPath=[^"]+)/)))
	{
		o.setAttribute('flashvars',u[1]);
		o.src='http://pic.wretch.cc/e//serv/video/video_player/WretchPlayer.swf';
	}
	else if((u=t.match(/"src",\s*"([^"]*flexPlayer[^"]*)/)))
	{
		if(o.src.indexOf('playerProductInstall.swf')!=-1)
		{
			o.setAttribute('allowScriptAccess','always');
			o.setAttribute('allowfullscreen','true');
		}
		if(/&HeadADLink=/.test(unsafeWindow.myflash))
		{
			o.setAttribute('flashvars',unsafeWindow.myflash.replace(/&HeadADLink=[^ ]*/,''));
			o.src=u[1]+'.swf';
		}
	}
}

if((o=document.getElementById('automusic')) && (o=document.getElementById('line')))
{
	t=o.getAttribute('flashvars');

	if(/autostart=true/.test(t))
	{
		o.setAttribute('flashvars',t.replace('autostart=true','autostart=false'));
		o.src=o.src;
	}
}

if((o=document.getElementById('description')) && (o=o.getElementsByTagName('embed')[0]))
{
	if(/autostart=true/.test(o.src))
	o.src=o.src.replace('autostart=true','autostart=false');
}

if(/js\.wretch\.yahoo\.net/.test(document.baseURI))
{
	o=document.getElementsByTagName('embed');
	if(o[0] && /autostart=true/.test(o[0].src))
	o[0].src=o[0].src.replace('autostart=true','autostart=false');
}
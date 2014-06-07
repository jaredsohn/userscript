// ==UserScript==
// @name           bilibiliPlayerChange
// @namespace      http://www.bilibili.tv
// @include        http://www.bilibili.tv/video/*
// ==/UserScript==

var player_url = 'http://zdw-bilibiliplayer.appspot.com/p/ABPlayer.swf';	//这里填ABPlayer的地址
var comments_url = 'http://comment.bilibili.tv/dm,';
var post_url = 'http://comment.bilibili.tv/dmpost';

var player,id,vid,newplayer;
player = document.getElementById("bofqi");
id = player.getElementsByTagName("embed")[0].getAttribute("flashvars");

if(id.substring(0,4)=="vid=")
{
	vid = id.substring(4);
	newplayer = document.createElement("div");
	newplayer.innerHTML = 
	'<embed id="ABPlayer" width="950" height="482" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" ' +
	'src="' + player_url + '" ' +
	'flashvars="mode=sina&vid='+vid+'&comments='+comments_url+vid+'&send=' + post_url +'" ' +
	'allowscriptaccess="always" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash">';
	
	player.parentNode.insertBefore(newplayer, player);
	player.parentNode.removeChild(player);
}
else
	alert("no vid!");
 

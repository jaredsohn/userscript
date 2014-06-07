// ==UserScript==
// @name           GomTV Direct VOD-Links
// @namespace      gomtv_directvod
// @include        http://www.gomtv.net/*
// @author         MasterOfChaos
// @description    Shows direct links for VODs on GomTV.net
// Version 2
// ==/UserScript==
function GetDirectLink()
{
	//Find playercontrol
	var player=document.getElementById('player_net9');
	if(player==null)
		return;

	//read raw url
	var params=player.getElementsByTagName('param');
	var url='';
	for(var i=0;i<params.length;i++)
	{
		if (params[i].getAttribute('name')=='movie')
		url=params[i].getAttribute('value');
	}

	//format url
	url=url.substr(url.indexOf('link=')+5);
	if(url.indexOf('&')>=0)
		url=url.substr(0,url.indexOf('&'));
	url='http://flvdn.gomtv.net/viewer/'+url+'.flv';

	//add to document
	var postinfo=document.getElementsByClassName('postinfo')[0];
	if (postinfo==null)
		return;

	postinfo.appendChild(document.createElement('br'));
	postinfo.appendChild(document.createTextNode('Download: '));
	var link = document.createElement('a');
	link.setAttribute('href',url);
	link.appendChild(document.createTextNode(url));
	postinfo.appendChild(link);
}

//register event
window.addEventListener('load',GetDirectLink,false);
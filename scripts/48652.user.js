// ==UserScript==
// @name           Youtube Alternate Video Player
// @namespace      userscripts.org
// @description    Fix some bug in Youtube accessed from Tunisia and Replaces the youtube flash video player with FlowPlayer flash video player. ( flowplayer.org )
// @version        1.41
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include	    http://208.65.153.238/*
// ==/UserScript==
var playerEnabled=1;
var docTitle=document.title;
var link=location.href;

if((docTitle.indexOf('404 Not Found')!=-1)||(docTitle.indexOf('Oups ! Petit')!=-1)){
	window.location.replace("http://208.65.153.238/" + link.substring(link.indexOf(".com")+5));}
	
document.title=docTitle+" ~ Viva TuniTech.net ~";

if ((playerEnabled>0)||(link.indexOf('youtube.com')!=-1)){

var vidID = document.location.toString().split("v=")[1].split("&")[0];

var fv = document.getElementById('movie_player').getAttribute('flashvars');
var srcWithT = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("&t=")[1].split("&")[0];
var srcMP4SD = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("&t=")[1].split("&")[0]+'&fmt=18';
var srcMP4HD = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("&t=")[1].split("&")[0]+'&fmt=22';


var pD = document.getElementById('watch-player-div');

if (playerEnabled==1) {
pD.innerHTML = pD.innerHTML+
	'<a href="'+srcWithT+'"><b>Download FLV</b></a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
	'<a href="'+srcMP4SD+'"><b>Download MP4 SD</b></a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
	'<a href="'+srcMP4HD+'"><b>Download MP4 HD</b></a>';}
	
}
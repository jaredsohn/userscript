// ==UserScript==
// @name		AnoniB Video Downloader
// @namespace		Derpy_AVD
// @description		Provides the .flv link to videos on video.anonib.com
// @version		1.1
// @include		http://video.anonib.com/videos/*
// ==/UserScript==

//Version Log
//1.1 - code update to support more videos (h/t to discussion board)

//This script is pretty straightforward:
//1) Go to the video's page (doesn't matter) if it's private or not.
//2) You can now click on "Download" adjacent to the video's title.
//Have fun!

window.onload=function movietime()
{
var AVPath=window.location.pathname.split("/");
var AVNum=AVPath[2];
var AVNuml=AVNum.length;
var count=0;
if (AVNuml>3)
	{
	var many= AVNuml-3;
	AVNum = String(AVNum);
	var first=AVNum.substring(0,many);
	first = parseInt(first);
	var count=first*1000;
	}
var sauce="http://video.anonib.com/contents/videos/"+count+"/"+AVNum+"/"+AVNum+".flv";
var derp=document.getElementsByTagName("h2")[0].innerHTML;
var dl=document.createElement("a");
dl.innerHTML="[Download]";
dl.href=sauce;
document.getElementsByTagName("h2")[0].appendChild(dl);
};
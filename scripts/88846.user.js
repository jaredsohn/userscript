// ==UserScript==
// @name           Xbox live
// @namespace      Friends button
// @description    Friends button on GamerStatArea
// @include        http://www.xbox.com/*
// @include        http://live.xbox.com/*
// @author         Gundam0079
// ==/UserScript==

//Hide jQuery slideshow
var slide = document.getElementById('silverlightControlHost');
if(slide!=undefined)
	slide.style.display = "none";
//Hide silverlight and that crap
var sl = document.getElementsByClassName('hero-host');
if(sl.length>0)
	sl[0].style.display = "none";
//Hide bottom right ad (YOU CAN ALSO USE ADBLOCK PLUS)
var ad = document.getElementById('AdSection');
if(ad!=undefined)
	ad.style.display = "none";
//Add top friends button
var bar = document.getElementById('GamerStatArea');
if(bar!=undefined){
	var parts = location.pathname.split('/');
	var btnFriend  = document.createElement('span');
	btnFriend.innerHTML = "<a style='float:right;font-weight:bold;' href='http://live.xbox.com/"+parts[1]+"/FriendCenter'>Amigos</a>";
	bar.appendChild(btnFriend);
}
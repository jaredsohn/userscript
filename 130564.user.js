// ==UserScript==
// @name           LikeFor
// @description    Like videos by particular users when played (edit the script before using)
// @author         Ad@m
// @include        http://www.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @version        1.0
// ==/UserScript==

var LikeFor=[]; //change this to an array of users you want to automatically like

(function(){
	var banner;
	if(!(banner=document.querySelector("#watch-userbanner").title)){
		banner=document.querySelector("#watch-headline-user-info>.yt-uix-button-group>.yt-uix-button>.yt-uix-button-content").innerText;
	}
	if(LikeFor.indexOf(banner)==-1) return;
	var v=document.createEvent("MouseEvents");
	v.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	setTimeout(function(){
		document.querySelector("#watch-like").dispatchEvent(v);
	},50);
})();
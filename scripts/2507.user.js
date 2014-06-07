// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          Google Reader Slideshow
// @description   Auto-scrolls through articles in Google Reader based on a user-defined interval. Link added to main controls to toggle slideshow on/off. Change value of seconds field to change interval. If you don't like the default interval, just edit the script, it's on the first line. 
// @include       http://www.google.com/reader/lens/*
// @version	   0.5
// @GM_version	   0.6.4
// @FF_version	   1.5
// ==/UserScript==

var defaultInterval = 5; //in seconds

GM_setValue('toggleState','off');
var drawerList = document.getElementById('drawer-list');

var slideShow = document.createElement('li');
slideShow.innerHTML = '<a href="javascript:;" id="slideShow">View Slideshow</a>';
drawerList.appendChild(slideShow);

var seconds = document.createElement('li');
seconds.innerHTML =  '<input id="interval" value="'+defaultInterval+'" size="1" maxlength="2" style="vertical-align:middle;width:20px"> sec.';
drawerList.appendChild(seconds);

function slideShowToggle(){
    var interval = document.getElementById('interval').value;
    if(interval){
    		if(GM_getValue('toggleState')=='off'){
			var intervalID = window.setInterval('v.down(true)',interval*1000);
			GM_setValue('intervalID',intervalID);
			GM_setValue('toggleState','on'); 
			var slideShow = document.getElementById('slideShow');
			slideShow.innerHTML = 'Stop Slideshow'; 
			slideShow.style.color = '#ff0000';
			//document.addEventListener('keydown',slideShowToggle,false);
		}
		else{
			var intervalID = GM_getValue('intervalID');
			if(intervalID) window.clearInterval(intervalID);
			GM_setValue('toggleState','off'); 
			var slideShow = document.getElementById('slideShow');
			slideShow.innerHTML = 'View Slideshow'; 
			slideShow.style.color = '#1010C8';
			//document.removeEventListener('keydown',slideShowToggle,false);
		}     
    }

}

document.getElementById('slideShow').addEventListener('click',slideShowToggle,false);
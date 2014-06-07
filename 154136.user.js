// ==UserScript==
// @name           YouTube: 1-Click Hide/Pause Video
// @version        1.0
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var tog = document.getElementById('movie_player'), togl = false;
var obj = tog.wrappedJSObject || tog;

/* The Button */
var roots = document.getElementById('watch-headline-title');
var newbutton = roots.appendChild(document.createElement("button"));
newbutton.className="newb yt-uix-button yt-uix-button-hh-primary";
newbutton.type="button";
newbutton.addEventListener('click', function () { toggle(); }, false);
newbutton.appendChild(document.createTextNode("HIDE+PAUSE"));

/* Add CSS */
var sheet = document.createElement('style'); 
sheet.innerHTML = ".newb {color:white!important; width:200px; height:133px; font-size: 130%; top:42%; left:1%; position:fixed; z-index:999!important; }";
document.body.appendChild(sheet);
 
/* Toggle Function */
function toggle() {
//obj.getPlayerState() 1
	togl=!togl;	
	if(togl){
	obj.pauseVideo();
	tog.style.display = "none";
	}
	else{
	tog.style.display = "";
	obj.playVideo();
	}
 }
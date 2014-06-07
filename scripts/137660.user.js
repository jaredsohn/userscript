// ==UserScript==
// @name     YouTube Load More Videos
// @namespace   www.youtube.com
// @description   Auto-load more videos in YouTube user page . . . 
// @include         http://www.youtube.com/user/*
// @include         https://www.youtube.com/user/*
// @include         http://www.youtube.com/channel/*
// @include         https://www.youtube.com/channel/*
// @updateURL        https://userscripts.org/scripts/source/137660.user.js
// @downloadURL     https://userscripts.org/scripts/source/137660.user.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/137660/large.png
// @author          BY SAILOR
// @version                6
// ==/UserScript==


//* Auto Load Button *//
var roots = document.getElementById('guide');
var BUTTON0 = roots.appendChild(document.createElement("button"));
BUTTON0.id="topbar";
BUTTON0.className="loads yt-uix-button yt-uix-button-default";
BUTTON0.type="button";
BUTTON0.addEventListener('click', function ( ) { loads( ); }, false);
BUTTON0.appendChild(document.createTextNode("Load More"));

//* Toggle Function *//

var int = "" ;

function loads( ) { 

if ( int == "" ) {

int = window.setInterval("document.getElementsByClassName('load-more-button')[0].click( );",  1500 );
intt = window.setInterval("document.getElementsByClassName('more-videos')[0].click( );",  1500 );
BUTTON0.innerHTML= 'Stop';
BUTTON0.style.color = "Red";
     } 
       else
              {
          stops( );
      }
    }

function stops( ) {

if ( int != "" ) {

window.clearInterval(int);
window.clearInterval(intt);
          int = "";
BUTTON0.innerHTML= 'Load More';
BUTTON0.style.color = "black";

      }
    }

//* No button x No Fly *//

if ( !document.getElementsByClassName('load-more-button')[0] && !document.getElementsByClassName('more-videos')[0] ) {

document.getElementById('topbar').style.display = "none";

}

//* Add CSS *//

var sheet = document.createElement('style');

sheet.innerHTML = ".loads { position: absolute; visibility: hidden; text-align: center; width: 10%; z-index: 100; }";

document.body.appendChild(sheet);



/***********************************************
* Floating Top Bar script- Â© Dynamic Drive (www.dynamicdrive.com)
* Sliding routine by Roy Whittle (http://www.javascript-fx.com/)
* This notice must stay intact for legal use.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

var persistclose=0 //set to 0 or 1. 1 means once the bar is manually closed, it will remain closed for browser session
var startX = 26 //set x offset of bar in pixels
var startY = 360 //set y offset of bar in pixels
var verticalpos="fromtop" //enter "fromtop" or "frombottom"

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function get_cookie(Name) {
var search = Name + "="
var returnvalue = "";
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search)
if (offset != -1) {
offset += search.length
end = document.cookie.indexOf(";", offset);
if (end == -1) end = document.cookie.length;
returnvalue=unescape(document.cookie.substring(offset, end))
}
}
return returnvalue;
}

function closebar(){
if (persistclose)
document.cookie="remainclosed=1"
document.getElementById("topbar").style.visibility="hidden"
}

function staticbar(){
	barheight=document.getElementById("topbar").offsetHeight
	var ns = (navigator.appName.indexOf("Netscape") != -1) || window.opera;
	var d = document;
	function ml(id){
		var el=d.getElementById(id);
		if (!persistclose || persistclose && get_cookie("remainclosed")=="")
		el.style.visibility="visible"
		if(d.layers)el.style=el;
		el.sP=function(x,y){this.style.left=x+"px";this.style.top=y+"px";};
		el.x = startX;
		if (verticalpos=="fromtop")
		el.y = startY;
		else{
		el.y = ns ? pageYOffset + innerHeight : iecompattest().scrollTop + iecompattest().clientHeight;
		el.y -= startY;
		}
		return el;
	}
	window.stayTopLeft=function(){
		if (verticalpos=="fromtop"){
		var pY = ns ? pageYOffset : iecompattest().scrollTop;
		ftlObj.y += (pY + startY - ftlObj.y)/8;
		}
		else{
		var pY = ns ? pageYOffset + innerHeight - barheight: iecompattest().scrollTop + iecompattest().clientHeight - barheight;
		ftlObj.y += (pY - startY - ftlObj.y)/8;
		}
		ftlObj.sP(ftlObj.x, ftlObj.y);
		setTimeout("stayTopLeft()", 10);
	}
	ftlObj = ml("topbar");
	stayTopLeft();
}

if (window.addEventListener)
window.addEventListener("load", staticbar, false)
else if (window.attachEvent)
window.attachEvent("onload", staticbar)
else if (document.getElementById)
window.onload=staticbar

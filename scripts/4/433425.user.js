// ==UserScript==
// @name        VOD Mode
// @namespace   Pandemic21
// @description Strips the scroll bar and current/max time from the video, as well as the times for the other videos on the side.
// @include     https://www.youtube.com/*
// @include     http://www.youtube.com/*
// @exclude     https://www.youtube.com/embed/*
// @exclude     http://www.youtube.com/embed/*
// @version     1.0
// @run-at      document-start
// @grant       none
// ==/UserScript==

var inter, player, player_div;


//start magic
var code=function _gaq_(){
    try{
        function getUndefined(){
            return undefined;
        }
        navigator.plugins.__defineGetter__('Shockwave Flash',getUndefined);
        navigator.mimeTypes.__defineGetter__('application/x-shockwave-flash',getUndefined);
        ytspf=ytspf||{};
        ytspf.enabled=false;
        ytplayer.config.html5=true;
        delete ytplayer.config.args.ad3_module;
    }catch(e){}
}


function removeFlash(){
    var sc=document.createElement('script');
    sc.textContent='('+code+')()';
    document.head.appendChild(sc);
    sc.parentNode.removeChild(sc);
	//end magic
    
    //get the player, hide it (there's a delay between when the video appears
    //	and when the time and bar are stripped, so I make it invisible until 
    //	it's stripped
    player_div = document.getElementById("player-api")
    player_div.style.display="none";
    hideOtherVideoTimes();
    inter = setInterval(function(){editHTML()},9);
}

//Hides all the video times.
function hideOtherVideoTimes(){
    var movie_times = document.getElementsByClassName("video-time");
    var size = movie_times.length;
    
    for(var k=0; k<size; k++)
    {
        //and... it's gone.
        movie_times[k].style.display="none";
    }
}

function editHTML(){
    player = document.getElementById("movie_player");
    //strip scrolly bar
    player.children[3].children[0].innerHTML=""
    //strip current / max time
	player.children[3].children[1].children[3].innerHTML=""
    clearInterval(inter);
    //poof it back
    player_div.style.display="block";
}

//fucking magic. This forces Youtube to play the video using the HTML5
//	player. I didn't write this part of the script, I found it here:
//	http://userscripts.org/scripts/show/180699
window.addEventListener('DOMContentLoaded',removeFlash);
// ==UserScript==
// @name           Sit or Start and Team Ranker keystrokes 
// @description    Make left/right arrow key work for Yahoo Fantasy Sit or Start and Team Ranker feature
// @include        http://*.fantasysports.yahoo.com/f*/playerranker?*
// @include 	   http://sports.yahoo.com/*/teamranker?*
// ==/UserScript==

document.addEventListener("keypress", keys, true )
var left,right,kind,right_link,left_link;
if(document.getElementById('player-1')){ // player ranker
	links=document.getElementsByTagName('a'); 
	kind="player";
	righty=document.getElementById('player-2');
	lefty=document.getElementById('player-1');
	right_link=links[2].href; // this looks fragile
	left_link=links[1].href;
	}
else {kind="team";
	righty=document.getElementById('tr-team-1');
	lefty=document.getElementById('tr-team-0');
	right_link=righty.childNodes[3].href;
	left_link=lefty.childNodes[3].href;
	}

function keys(key) {
	switch (key.keyCode) {
		case 10: // return
		case 13: // enter --  both should submit form
			if (left){location.href=left_link;}
			if (right){location.href=right_link;}
			break;
		case 39: // rightkey
			// choose right id
			switch(kind){
				case "player":
					righty.className="player-2.hover hover";
					lefty.className="player-1.hover";
				case "team": 
					righty.className="tr-team hover";
					lefty.className="tr-team";
			}
			right=1;
			left=0;
			return right;
			break;
		case 37: // leftkey
			switch(kind){
			case "player": lefty.className="player-1.hover hover";
								righty.className="player-2.hover";
			case "team":
					righty.className="tr-team";
					lefty.className="tr-team hover";
			}
			right=0;
			left=1;
			return left;
			break;
		}
}
// ==UserScript==
// @name           Scam Highlighter (Facebook)
// @namespace      http://userscripts.org/users/304644
// @description    Highlights all official Zynga game posts in green and all known scam posts in red.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @copyright      Matt
// @version        2.0.0.3
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @require        http://sizzlemctwizzle.com/updater.php?id=99840&days=1
// @require        http://userscripts.org/scripts/source/29910.user.js
// @run-at         document-end
// ==/UserScript==

////////////////////////////////////////////////////////////////////
// Update Log:
//
// 2.0.0.3 (4/14/11)
// -Added quick work-around to a false scam showing up green. Later versions will add additional checks to assure a post is really coming from Zynga.
//
// Known issues:
// -Loads a little slow in chrome. That is out of my control.
////////////////////////////////////////////////////////////////////

// Variables
var x,stories=document.getElementsByClassName("uiStreamStory"); 

function highlight() { 
	for(x=0;x<stories.length;x++){ 
		if(stories[x].innerHTML.match(match1) && stories[x].innerHTML.match(match4)){ 
			stories[x].style.background='#90FF90';
		}
		else if (stories[x].innerHTML.match(match3)){
			stories[x].style.background='#FFF';
		}
		else if (stories[x].innerHTML.match(match2)){
			stories[x].style.background='#FF7070';
		}
	}
}


//This grabs the file with the scam ID numbers inside.
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://farmvillion.com/scamlist.txt',
	headers: { 'Cache-Control': 'no-cache' },
	onload: function(resp) {
		var lists = JSON.parse(resp.responseText);
		scamId = lists.scamId;
	        legitId = lists.legitId;
		falsePos = lists.falsePos;
		gameUrl = lists.gameUrl;
		match1=new RegExp("apps/application\\.php\\?id=("+legitId.join('|')+")");
		match2=new RegExp("apps/application\\.php\\?id=("+scamId.join('|')+")");
		match3=new RegExp(falsePos.join('|'));
                match4=new RegExp(gameUrl.join('|'));
		highlight();
		setInterval(highlight,500); //runs highlight every half second
	}
});
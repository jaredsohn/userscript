// ==UserScript==
// @name           Scroll GLB Players
// @namespace      GLB
// @description    Scroll Players From Profile Page
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

window.setTimeout( function() 
{

  var myPlayers = ['000001','000002','000003']

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var url = window.location.href;
var id = url.substring(url.indexOf('_id=')+4, url.length);

var nextid;
nextid = 0;

for (var i = 0; i < myPlayers.length; i++) {
	if (myPlayers[i] == id){
		if (i==myPlayers.length-1){
		nextid = myPlayers[0];
		} else {
		nextid = myPlayers[i+1];
		}
	}
}

var players = getElementsByClassName("big_head subhead_head",document);
var playerTitle = players[0];

if (nextid >0) {
if (playerTitle) {
    playerTitle.innerHTML = playerTitle.innerHTML + "&nbsp;<a href='http://goallineblitz.com/game/player.pl?player_id=" + nextid + "'>></a>&nbsp;";    
}
}

}
)
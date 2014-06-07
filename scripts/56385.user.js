// ==UserScript==
// @name           eRepublik Friend Tracker
// @namespace      http://j.8labs.com/
// @description    Helps you track your friends on eRepublik.
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/de
// ==/UserScript==

var html = '<h2>Friend Tracker</h2>'
var nplayers
var count = 0

var mainPlayer;

var playersMap = new Array();

function fetchplayersWellness(mainPlayer, ids)
{
	nplayers = ids.length
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="background: rgb(220,220,220);padding:2px">Name</th><th style="background: rgb(220,220,220);padding:2px">Wellness</th><th style="background: rgb(220,220,220);padding:2px">Lvl.</th><th style="background: rgb(220,220,220);padding:2px">Exp.</th><th style="background: rgb(220,220,220);padding:2px">Location</th><th style="background: rgb(220,220,220);padding:2px">Str.</th><th style="background: rgb(220,220,220);padding:2px">Rank</th><th style="background: rgb(220,220,220);"></th></tr>'
	// Add yourself.
	
	html += '<tr><td><a href="/en/citizen/profile/'+mainPlayer.id+
	'"><img src="' + mainPlayer.avatar_link + '" height="15" width="15">'+
	mainPlayer.name+'</a></td><td style="padding-left: 4px">'+mainPlayer.wellness+
	'</td><td style="padding-left: 4px">'+mainPlayer.level+
	'</td><td style="padding-left: 4px">'+mainPlayer.experience_points+
	'</td><td style="padding-left: 4px">'+mainPlayer.country+'</td><td style="padding-left: 4px">'+mainPlayer.strength+
	'</td><td style="padding-left: 4px"><img src="http://www.erepublik.com/images/parts/icon_position_military_' + mainPlayer.military_rank.toLowerCase() + '.gif" width="15" height="15" alt="' + mainPlayer.military_rank + '">'+
	'</td><td>'+
	'</td><td></td></tr>';
	
	// Add all your friends.
	for(var i=0;i<ids.length;i++) {
	    fetchplayerWellness(ids[i]["id"]);
	}
}

function fetchplayerWellness(id) 
{
	var player = null
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
            onload:function(response)
            {
				// todo think about bad request -
				try {
					player = eval('(' + response.responseText + ')')
					html += '<tr><td><a href="/en/citizen/profile/'+player.id+
					'"><img src="' + player.avatar_link + '" height="15" width="15">'+
					player.name+'</a></td><td style="padding-left: 4px">'+player.wellness+
					'</td><td style="padding-left: 4px">'+player.level+
					'</td><td style="padding-left: 4px">'+player.experience_points+
					'</td><td style="padding-left: 4px">'+player.country+'</td><td style="padding-left: 4px">'+player.strength+
					'</td><td style="padding-left: 4px"><img src="http://www.erepublik.com/images/parts/icon_position_military_' + player.military_rank.toLowerCase() + '.gif" width="15" height="15" alt="' + player.military_rank + '">'+
					'</td><td><div id="miniprofile" style="width: 25px"><a class="msg" href="/en/messages/compose/'+player.id+'"></a></div>'+
					'</td><td></td></tr>'
					playersMap[id]=player
				} catch(err) {
					//	should enter removible line --- 
				}
				if (++count==nplayers) {
					html+= '</table>'
					var displayEl = document.createElement("div");
					displayEl.setAttribute('class', 'core');
				    displayEl.setAttribute('style', 'padding-bottom:10px;');
				    displayEl.innerHTML = html;
				    latest=document.getElementById('content');
				    latest.parentNode.insertBefore(displayEl, latest);
				    
					// add events
					var fo = GM_getValue("players", null)
					if (fo!=null) {
						var f = eval(fo)
						for (var i=0;i<f.length;i++) {
							if ( $(f[i]+"_id") != null) {
								$(f[i]+"_id").addEventListener("click", removeplayer, true)
							}
						}
					} 
					   
				}
            }
        }
    );
}

function getPlayer(id) 
{
	var mainPlayer = null
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json?by_username=true',
            onload:function(response)
            {
				// todo think about bad request -
				try {
					mainPlayer = eval('(' + response.responseText + ')');
					fetchplayersWellness (mainPlayer, mainPlayer.friends);
				} catch(err) {
					//	should enter removible line ---
				}
            }
        }
    );
}

function $(A) {return document.getElementById(A);}

function addplayer(e) {
    e.stopPropagation();
	e.preventDefault();
    GM_setValue("thisplayer", $('newplayer').value);
    getPlayer($('newplayer').value);
    $('newplayer').value = "";
}

function Main(e) {
   var thisPlayer = GM_getValue("thisplayer", null);
   if (thisPlayer==null) {
       html = '<h2>Friend Tracker</h2>Oops... it looks like you\'ve not set the program up.<br />Enter your username. (Spaces included.)<br /><br />' + '<form id="playerForm" action="#"><input type="text" name="fname" id="newplayer" /><input type="submit" value="add"/></form>'
       var displayEl = document.createElement("div");
		displayEl.setAttribute('class', 'core');
	    displayEl.setAttribute('style', 'padding-bottom:10px;');
	    displayEl.innerHTML = html;
	    latest=document.getElementById('content');
	    latest.parentNode.insertBefore(displayEl, latest);
	    $('playerForm').addEventListener('submit', addplayer, true);
   } else {
       getPlayer(thisPlayer);
   }
}

window.addEventListener('load', Main, false);
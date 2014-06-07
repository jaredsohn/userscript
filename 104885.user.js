// ==UserScript==
// @name           Ravaglia
// @namespace      Ravaglia
// @description    Ravaglia
// @include        http://people.ciram.unibo.it/~ravaglia/corsi/analisi_2/esito_scritto.htm
// @exclude        
// ==/UserScript==

var	soundSrc, playerSrc;
	soundSrc = "http://chargraph.com/josh/timer/notify.mp3";
	playerSrc = "http://www.infowars.com/mediaplayer.swf";


function searcherM()
{

var bodyText, search, searchF;

bodyText = document.getElementsByTagName("body")[0].innerHTML;

search = "585520";

searchF = bodyText.indexOf(search);

if(searchF !== -1)
{
   var player = document.createElement('embed');
   player.src = playerSrc;
   player.setAttribute("style", "visibility:hidden;");
   player.setAttribute('id', 'timer_sound');
   player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
   document.body.appendChild(player);
   setTimeout(function(){var ts=document.getElementById("timer_sound");if(ts){ts.parentNode.removeChild(ts);}}, 5000);
   alert("Risultati usciti");  
}
else
   setTimeout(function() { location.reload(); }, 10 * 1000);
}


searcherM()
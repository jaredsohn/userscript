// ==UserScript==
// @name           Aukcijonas labai trumpai
// @include        http://s*.gladiatus.*/game/index.php?mod=auction*
// ==/UserScript==


var	REFRESH_DELAY = 1; // in seconds
var	currentTime = new Date()
var	hour = currentTime.getHours();
var	minute = currentTime.getMinutes();
var	second = currentTime.getSeconds();
        if(second < 10)
           second = "0" + second;
var	time = hour + ":" + minute + ":" + second;
var	soundSrc, playerSrc;
	soundSrc = "http://chargraph.com/josh/timer/notify.mp3";
	playerSrc = "http://www.infowars.com/mediaplayer.swf";



function time2()
{
var second2 = second;
var minute2 = minute + 10;
var hour2 = hour;
var time2;

  if(minute2 >= 60)
  {
     hour2++;
     minute2 = minute2 - 60;
  }
  if(hour2 >= 24)
  {
     hour2 = hour2 - 24;
  }

time2 = hour2 + ":" + minute2 + ":" + second2;

if(minute < 10)
   minute = "0" + minute;
if(minute2 < 10)
   minute2 = "0" + minute2;

return time2;
}

function searcherVS()
{

var bodyText, search, search2, search3, searchF, searchF2, searchF3;

bodyText = document.getElementsByTagName("body")[0].innerHTML;

search = "Labai trumpai";
search2 = "Labai trumpai";
search3 = "Labai trumpai";

searchF = bodyText.indexOf(search);
searchF2 = bodyText.indexOf(search2);
searchF3 = bodyText.indexOf(search3);

if(searchF !== -1 || searchF2 !== -1 || searchF3 !== -1)
{
   var player = document.createElement('embed');
   player.src = playerSrc;
   player.setAttribute("style", "visibility:hidden;");
   player.setAttribute('id', 'timer_sound');
   player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
   document.body.appendChild(player);
   setTimeout(function(){var ts=document.getElementById("timer_sound");if(ts){ts.parentNode.removeChild(ts);}}, 5000);
   alert("Labai trumpai @" + time + "\n" + "Numatoma pabaiga @ " + time2());  
}
else
   setTimeout(function() { location.reload(); }, REFRESH_DELAY * 5 * 1000);
}


searcherVS()
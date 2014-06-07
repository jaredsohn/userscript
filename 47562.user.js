// ==UserScript==
// @name           AuctionQuiet
// @namespace      GladiatusAuctionQuiet
// @description    Automatski refreshuje Aukcijsku kucu u Gladiatusu sve dok aukciji ne ostane Jako kratko. Kada stigne do Jako kratko alarm ce se ukljuciti.
// @include        http://*.gladiatus.*/game/index.php?mod=auction*
// @exclude        
// ==/UserScript==


var	REFRESH_DELAY = 1; // in seconds
var	currentTime = new Date()
var	hour = currentTime.getHours();
var	minute = currentTime.getMinutes();
var	second = currentTime.getSeconds();
var	time = hour + ":" + minute + ":" + second;
var	soundSrc, playerSrc;
	soundSrc = "http://www.zedge.net/download-to-pc/7808285/";
	playerSrc = "http://www.infowars.com/mediaplayer.swf";



function time2()
{
var second2 = second;
var minute2 = minute + 30;
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

return time2;
}

function searcherVS()
{

var bodyText, search, searchF;

bodyText = document.getElementsByTagName("body")[0].innerHTML;

search = "jako kratko";

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
   alert("VS @ " + time + "\n" + "Auction end @ " + time2());  
}
else
   setTimeout(function() { location.reload(); }, REFRESH_DELAY * 5 * 1000);
}


searcherVS()
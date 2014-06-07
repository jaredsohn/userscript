// ==UserScript==
// @name           Gladiatus.net Müzeyede Çok Kısa Alarmı - Very Short Alarm
// @namespace      Gladiatus.net Müzeyede Çok Kısa Alarmı - Very Short Alarm
// @description    Oto Sayfa Yeniler ve Çok kısaya geçtigi zaman ile Müzayede bitiş zamanını ekrana yazar.
// @include        http://*.gladiatus.*/game/index.php?mod=auction*
// @exclude        
// ==/UserScript==

var	REFRESH_DELAY = 1; // in seconds
var	currentTime = new Date()
var	hour = currentTime.getHours();
var	minute = currentTime.getMinutes();
	if(minute < 10)
	minute = "0" + minute;
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
var minute2 = minute +30;
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

search = "çok kısa";

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
   alert("Çok Kısaya Geçtigi Saat -  " + time + "\n" + "Müzayede Bitiş Saati  -  " + time2());  
}
else
   setTimeout(function() { location.reload(); }, REFRESH_DELAY * 5 * 1000);
}


searcherVS()
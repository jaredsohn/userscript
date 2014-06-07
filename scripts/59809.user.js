// ==UserScript==
// @name           Facebook Fish Wrangler "Fish Now" Notification
// @namespace      KHMI - Greasemonkey
// @include        http://apps.facebook.com/fishwrangler/*
// @exclude        http://apps.facebook.com/fishwrangler/map-travel/*
// @exclude        http://apps.facebook.com/fishwrangler/cast
// @description	   Plays a WAV file when it is time to fish. 
// ==/UserScript==

// WAV sound to play for notification
var alertSound = "http://www.fileden.com/files/2009/10/15/2603503/foghorn.wav"; 

// "0" = silent "100" = full volume
var ALERT_VOLUME = "100"; 

// find all input elements
var inputs = document.getElementsByTagName("input");

if(inputs) {
   //loop through and find the fish timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("timer_hidden") != -1)
      {
         timervalue = inputs[i].value;
         break;
      }
   }   
}
if(typeof(timervalue) !== "undefined") {
	// convert timervalue to milliseconds
	var timeoutvalue = parseInt(timervalue) * 1000;

	// setTimeout to play sound
	setTimeout(function() {playSound(alertSound, ALERT_VOLUME);} , timeoutvalue);
}

function playSound(sound, volume) {
  var bodi = document.getElementsByTagName("body")[0];
  var emb = document.createElement("embed");
  emb.src = sound;
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "false");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", volume);
  bodi.appendChild(emb);
}
// ==UserScript==
// @name           Ogame Alarme
// @description    alarme pour ogame
// @include        *ogame*overview*
// @version 1.0.6
// ==/UserScript==

var volume = "100";
var sonAttaque 	= "http://lolzland.hostei.com/forum/temp/marche_imperiale.mp3";

if(document.getElementById('attack_alert').style.visibility == "visible"){
	
	clearTimeout(timer);
	joueAlarme(sonAttaque);
}
else{

	tempsMin = 180000;  // 3 min
	tempsMax = 1080000; // 18 min
//	tempsMin = 60000;  // 10 sec
//	tempsMax = 80000;  // 20 sec

	time  = (Math.random()*(tempsMax-tempsMin))+tempsMin;
	time = Math.round(time);
	var timer = setInterval(function(){
		location.reload();
	}, time);
}

function joueAlarme(effet)
{
	body = document.getElementsByTagName("body")[0];
	var emb = document.createElement("embed");
	
	emb.src = effet;
	emb.setAttribute("autostart", "true");
	emb.setAttribute("loop", "false");
	emb.setAttribute("hidden", "true");
	emb.setAttribute("volume", volume);
	
	body.appendChild(emb);	
}
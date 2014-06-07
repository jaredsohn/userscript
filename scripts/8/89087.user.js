// ==UserScript==
// @name           Notify Facebook Cleaner
// @namespace      Scortis modifed by odiex
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==

i=0;
allowedmsgs = new Array();

/* Show unknown */
show_unknown = 0;

for(a=0; a<100; a++){
	if(show_unknown) allowedmsgs[a] = 1;
	else allowedmsgs[a] = 0;
}

/* Katakan apa yang akan ditunjukkan dan di sembunyikan */
/* Acara */
allowedmsgs[1] = 1;
/* Catatan */
allowedmsgs[2] = 1;
/* Video */
allowedmsgs[3] = 1;
/* Ajakan Teman join group */
allowedmsgs[4] = 0;
/* Links */
allowedmsgs[5] = 1;
/* Photos */
allowedmsgs[6] = 1;
/* Tagged di photo */
allowedmsgs[7] = 1;
/* Teman yang Menyukai */
allowedmsgs[8] = 0;
/* Colekan */
allowedmsgs[9] = 0;
/* Hubungan */
allowedmsgs[10] = 1;
/* Status */
allowedmsgs[11] = 1;
/* Teman yang berteman dengan seseorang */
allowedmsgs[12] = 0;
/* Teman yang mengomentari Dinding */
allowedmsgs[26] = 1;

setInterval(function (){
	if(document.getElementById("home_stream")){
	while(document.getElementById("home_stream").getElementsByTagName("li").item(i)){
		item = document.getElementById("home_stream").getElementsByTagName("li").item(i);
		if(item.getAttribute("data-ft")){
			attr = item.getAttribute("data-ft");
			reg = /("s_obj":){1}[0-9]{1,2}/;
			mtch = attr.match(reg);
			if(mtch){
			xp=mtch[0].split('"');
			nr2=xp[2].split(':');
			nr=nr2[1];
			if(!allowedmsgs[nr]) item.style.display = "none";
			} else {
			item.style.display = "none";
			}
		}
		i++;
	}
	}
}, 1000);
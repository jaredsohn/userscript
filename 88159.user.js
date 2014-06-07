// ==UserScript==
// @name           Facebook Cleaner
// @namespace      Scortis
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

/* Says what will be showed and what hidden */
/* Events */
allowedmsgs[1] = 0;
/* Notes */
allowedmsgs[2] = 0;
/* Video */
allowedmsgs[3] = 0;
/* Friend joins group */
allowedmsgs[4] = 0;
/* Links */
allowedmsgs[5] = 0;
/* Photos */
allowedmsgs[6] = 0;
/* Tagged in photo */
allowedmsgs[7] = 0;
/* Friend like something */
allowedmsgs[8] = 0;
/* BuddyPoke */
allowedmsgs[9] = 0;
/* Relationships */
allowedmsgs[10] = 0;
/* Status */
allowedmsgs[11] = 0;
/* Buddy becomes a friend with someone */
allowedmsgs[12] = 0;
/* Somebody writes on buddy's wall */
allowedmsgs[26] = 0;

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
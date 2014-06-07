// ==UserScript==
// @name           (Sryth) Reset Time Tracker v1.0
// @namespace      none
// @include        http://www.sryth.com/game/ci.php?f_c=parser2.inc
// @include        http://www.sryth.com/game/ci.php?f_c=parser2.inc&
// @description	   Script to track reset timers for the game www.sryth.com
// ==/UserScript==

var now = new Date();
var minutes=parseInt( document.body.innerHTML.match(/\d+(?= minute)/g) )
var hours=parseInt( document.body.innerHTML.match(/\d+(?= hour)/g) )


//Tarn
if (document.body.innerHTML.match("Move away from the ruins of Tarn")){
	if (minutes)
		document.cookie = 'Tarn=' + escape(now.getTime()+minutes*60*1000)
}
else if (document.body.innerHTML.match("You hear something rattling about")){
	minutes=180;
	document.cookie = 'Tarn=' + escape(now.getTime()+minutes*60*1000)
}
//Jadefang
else if (document.body.innerHTML.match("Move away from the jadefang lair...")){
	if (minutes)
		document.cookie = 'Jadefang=' + escape(now.getTime()+minutes*60*1000)
}
else if (document.body.innerHTML.match("hive ravaged and their queen slain")){
	minutes=90;
	document.cookie = 'Jadefang=' + escape(now.getTime()+minutes*60*1000)
}
//Axepath
else if (document.body.innerHTML.match("Move away from the graveyard")){
	if (minutes)
		document.cookie = 'Axepath=' + escape(now.getTime()+minutes*60*1000)
}
else if (document.body.innerHTML.match("Without turning around again, you set off on your way.")){
	minutes=60;
	document.cookie = 'Axepath=' + escape(now.getTime()+minutes*60*1000)
}
//YirTanon
else if (document.body.innerHTML.match("Move away from the ruined temple")){
	if (minutes)
		document.cookie = 'YirTanon=' + escape(now.getTime()+minutes*60*1000)
}
else if (document.body.innerHTML.match("without looking back again, you turn and promptly set off on your way.")){
	minutes=60;
	document.cookie = 'YirTanon=' + escape(now.getTime()+minutes*60*1000)
}
//Bat cave
else if (document.body.innerHTML.match("in front of the cave stand two large rocks")){
	if (minutes)
		document.cookie = 'BatCave=' + escape(now.getTime()+minutes*60*1000)
}
else if (document.body.innerHTML.match("left the eerie confines of the shadowy lair.")){
	minutes=60;
	document.cookie = 'BatCave=' + escape(now.getTime()+minutes*60*1000)
}
//Archery
else if(document.body.innerHTML.match("wait until you can attempt to again")){
	if (minutes!=null && hours!=null)
		document.cookie = 'Archery=' + escape(now.getTime()+ (hours*60 + minutes)*60*1000)
}
else if (document.body.innerHTML.match("Launch your arrows at the targets...")){
	minutes=120;
	document.cookie = 'Archery=' + escape(now.getTime()+minutes*60*1000)
}
//Bone Horde
else if (document.body.innerHTML.match("The Bone Horde Challenge - Level 1<")){
	minutes=180;
	document.cookie = 'BoneHorde=' + escape(now.getTime()+minutes*60*1000)
}
//Ogredom
else if (document.body.innerHTML.match("The Lords of Ogredom - Level 1<")){
	minutes=180;
	document.cookie = 'Ogredom=' + escape(now.getTime()+minutes*60*1000)
}
//BHC and LoO
else if (document.body.innerHTML.match("Listed below are the various challenges available")){
	var set=document.getElementsByTagName('ul');
	for (var i=0;i<set.length;i++){
		minutes=parseInt( set[i].innerHTML.match(/\d+(?= minute)/g) )
		hours=parseInt( set[i].innerHTML.match(/\d+(?= hour)/g) )
		if (set[i].innerHTML.match("Bone Horde")){
			document.cookie = 'BoneHorde=' + escape(now.getTime()+ (hours*60 + minutes)*60*1000)
		}	
		else if (set[i].innerHTML.match("Ogredom")){
			document.cookie = 'Ogredom=' + escape(now.getTime()+ (hours*60 + minutes)*60*1000)
		}
	}
}
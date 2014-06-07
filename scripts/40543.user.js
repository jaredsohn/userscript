// ==UserScript==
// @name			GameFAQs Sig TimeStamper
// @description	Timestamps GameFAQs posts. Requires you to preview your post like a good poster. Place "<time>" where you want your time displayed.
// @author		Awesumness (GFAQS:Poo Poo Butter)
// @include		http://www.gamefaqs.com/boards/*
// @Notes		Special thanks to Karamthulhu's Random Sig script for a few lines.
// @Notes		First UserScript. Be gentle. 
// ==/UserScript==
var done = 0;
function doSig(){
	if (done == 0){		
		var textUrea = document.getElementsByTagName('textarea');
		if ( !textUrea[0] ) return;	
		var d = new Date();
		var currtime = [d.getHours(), d.getMinutes(), d.getSeconds()];
		var whatM="AM";
		// ***WARNING:CAUTION THE NEXT LINE IS BUGGY*** THIS ENTER YOUR POSTING TIMESTAMP FROM A PREVIOUS SIG
		var gftime = [00,00,00];
		// ***WARNING:CAUTION THE NEXT LINE IS BUGGY*** ENTER THE POSTING TIME IN THE POST HEADER
		var ytime  = [00,00,00];
		var calsec = (currtime[0] + gftime[0] - ytime[0]) * 3600 + (currtime[1] + gftime[1] - ytime[1]) * 60 + currtime[2] + gftime[2] - ytime[2];
		currtime[0] = Math.floor(calsec / 3600);
		calsec -=currtime[0] * 3600;
		currtime[1] = Math.floor(calsec / 60);
		currtime[2] = calsec - currtime[1] * 60;
		if(currtime[0] < 1){
			currtime[0]+=48;
		}
		if(currtime[0] >= 24){
			currtime[0] %=24;
		}
		if(currtime[0] >= 12){
			currtime[0] -=12;
			whatM="PM";
		}
		if(currtime[0] == 0){
			currtime[0] = 12;
			whatM="AM";
		}

		if(currtime[0] < 10){currtime[0] = "0" + currtime[0]}
		if(currtime[1] < 10){currtime[1] = "0" + currtime[1]}
		if(currtime[2] < 10){currtime[2] = "0" + currtime[2]}
		var thisIsYourCurrentTime = currtime[0] + ":" + currtime[1] + ":" + currtime[2] + " " + whatM;
		textUrea[0].value = textUrea[0].value.replace("<time>",thisIsYourCurrentTime);
		done = 1;
	}
}
function getPostButtons(){
	var butts = document.getElementsByTagName('input');
	for(var x=0;x<=butts.length-1;x++){
		if(butts[x].value=="Post Message"){
			butts[x].addEventListener('mousedown', doSig, false);
		}
	}
}
getPostButtons();
// ==UserScript==
// @name            Mission Hotkeys for Kuwaii
// @namespace       BvS-Fafnir
// @include         http://www.animecubed.com/billy/bvs/missions/mission*
// @include         http://animecubed.com/billy/bvs/missions/mission*
// ==/UserScript==


function process_event(event) {
	var KeyID = event.keyCode;
		if(document.forms.namedItem("attempt")) {   //Do Smart Mission Attempt
			smartAttemptMission(KeyID);
			}
		else if (KeyID>64&&KeyID<91){    //Request New Mission
			document.forms.namedItem("domission").wrappedJSObject.submit();
			}
		}

function smartAttemptMission(KeyID) {
if(KeyID == 72){			//h
			alert("Hot Keys:\nR: Sword Call\nW: Mind-Body Switch Jutsu\nS: Flock of Seagulls\nD: Pervert-Destroying Punch\nF: Morning Peacock\nQ: Attack on the Nervous System\nZ: I Can Haz Cheeseburger\n\nE: Escape");
			}
else if (KeyID==69){		//e
	smokeBomb();
	}
else if (KeyID==82){		//r
	Reaper();
	}
//else if (KeyID==87){		//w
//	MindBodySwitch();
//	}
else if (KeyID==83){		//s
	Seagulls();
	}
else if (KeyID==68){		//d
	PervPunch();
	}
else if (KeyID==70){		//f
	Peacock();
	}
else if (KeyID==81){		//q
	Nervous();
	}
else if (KeyID==90){		//z
	iCanHaz();
	}
}

function attemptMission() {
	document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
}

function smokeBomb() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==374)		//Escape jutsu
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function iCanHaz() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==484)		//Escape jutsu
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}


function Nervous() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==429)		//Escape jutsu
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function MindBodySwitch() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==393)		//Mind Body Switch jutsu
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function Reaper() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==499)		//Sword Call
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function Seagulls() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==419)		//Flock of Seagulls
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function PervPunch() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==416)		//Pervert-Destroying Punch
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

function Peacock() {
	var jutsu=document.forms.namedItem("attempt").elements;
	for(var i=0; i<jutsu.length; i++)
		if(jutsu[i].value==422)		//Morning Peacock
			jutsu[i].wrappedJSObject.click();
	attemptMission();
}

window.addEventListener("keyup", process_event, false);
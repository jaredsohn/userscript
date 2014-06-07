// ==UserScript==
// @name            Billy Mission Hotkeys
// @namespace       Garyzx
// @include         http://*animecubed.com/billy/bvs/missions/mission*
// ==/UserScript==

function process_event(event) {
// ESCAPE JUTSU
	if (event.keyCode==81){		//Q
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==374)		// Escape jutsu
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}

// ADVANCED WHITEEYE / WHITEEYE
	if (event.keyCode==87){		//W
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==501 || jutsu[i].value==503)		// Advanced WhiteEye OR WhiteEye
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	// Attempt mission
	}

// ADVANCED REDEYE / REDEYE
	if (event.keyCode==82){		//R
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==500)		//Advanced RedEye OR Redeye (TBD)
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}

// FLYING THUNDER GOD TECHNIQUE
	if (event.keyCode==70){		//F
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==448)		// Flying Thunder God Technique
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}

// DIAGNOSIS
	if (event.keyCode==68){		//D
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==485)		// Diagnosis
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}

// EPIC DOG URINATION TECHNIQUE
	if (event.keyCode==69){		//E
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==421)		// Epic Dog Urination Tehnique
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}

// OBSESSIVE INSIGHT
	if (event.keyCode==83){		//S
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==466)		// Obsessive Insight
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}

// I CAN HAS CHEESEBURGER
	if (event.keyCode==67){		//C
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==484)		// I Can Has Cheeseburger
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}


// ATTEMPT (NEW) MISSION with the DEFAULT JUTSU
	if (event.keyCode==77){		//M
		if(document.forms.namedItem("attempt"))
			document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
		else
			document.forms.namedItem("domission").wrappedJSObject.submit();	//New mission
	}

// CHARGE CHAKRA
	if (event.keyCode==75)		//K
		document.forms.namedItem("chakra").wrappedJSObject.submit();	//Charge chakra

// BACK TO MISSION SELECT - might not work
	if (event.keyCode==66)		//B
		document.forms.namedItem("back").wrappedJSObject.submit();	//Back to mission select

}

window.addEventListener("keyup", process_event, false);
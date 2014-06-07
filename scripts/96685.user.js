// ==UserScript==
// @name           Glowslinging hotkey+AI 0.8
// @namespace      Conster
// @description    1-5 selects skill manually, f uses currently selected skill + EX Attack, s explains AI's motivation
// @include        http://www.animecubed.com/billy/bvs/billycon-glowslingfight.html
// @include        http://www.animecubed.com/billy/bvs/billycon-glowslinging.html
// ==/UserScript==

if (document.forms.namedItem( "slingact" ) ) {
	simpleAI(false);
}
function process_event(event) {
	if (event.keyCode>=49 && event.keyCode<=54) {		//1-5
		if (document.forms.namedItem( "startsling2" ) ) {
			document.forms.namedItem("startsling2").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "slingact" ) ) {
			var skills=document.forms.namedItem("slingact").elements;
			var pickthis = event.keyCode-49;
			for(var i=0; i<skills.length; i++)
				if(skills[i].value==pickthis)		//AC, FA, GC, TP or WR
					skills[i].wrappedJSObject.click();
			document.forms.namedItem("slingact").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "goslinag" ) ) {
			document.forms.namedItem("goslinag").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "gosling" ) ) {
			document.forms.namedItem("gosling").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "glowsling" ) ) {
			document.forms.namedItem("glowsling").wrappedJSObject.submit();
		}
	} else if (event.keyCode==70) {	//f
		if (document.forms.namedItem( "startsling2" ) ) {
			document.forms.namedItem("startsling2").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "slingact" ) ) {
			var skills=document.forms.namedItem("slingact").elements;
			document.forms.namedItem("slingact").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "goslinag" ) ) {
			document.forms.namedItem("goslinag").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "gosling" ) ) {
			document.forms.namedItem("gosling").wrappedJSObject.submit();
		} else if (document.forms.namedItem( "glowsling" ) ) {
			document.forms.namedItem("glowsling").wrappedJSObject.submit();
		}
	} else if (event.keyCode==83) { //s: simple AI
		if (document.forms.namedItem( "slingact" ) ) {
			simpleAI(true);
		}
	}
}

function simpleAI(debugme) {
	var debugstring = "";
	//determine Spin
	var tables = document.getElementsByTagName("table");
	var everything = tables[0].innerHTML;	//this contains your password several times, so I'll be careful not to peep
	var stats = "";				//full HTML of your stats and your opponent's
	var movesandstuff = "";			//moves used and opponent's next move
	var istart = 0;				//start index for substring function
	var iend = 0;				//end index for substring function
	var tstr = "";				//tempstring;
	var yourlastmove = -1;		var theirlastmove = -1;		var theirnextmove = -1;

	//step 1: get the HTML of your and your opponent's Spin, Risk and skills	START
	istart = everything.indexOf("Your Spin");
	iend   = everything.lastIndexOf("Uses");
	stats = everything.substring(istart,iend);
	//step 1									END

	//step 2: determine own Spin and Risk						START
	istart = stats.indexOf("<b>")+3;	iend   = stats.indexOf("</b>");
	tstr = stats.substring(istart,iend);	var yourspin = parseInt(tstr);
	debugstring = debugstring + "Your spin is " + yourspin + ".\n";

	stats = stats.substring(stats.indexOf("Your Risk"));
	istart = stats.indexOf("<b>")+3;	iend   = stats.indexOf("</b>");
	tstr = stats.substring(istart,iend);	var yourrisk = parseInt(tstr);
	debugstring = debugstring + "Your risk is " + yourrisk + ".\n";
	//step 2									END

	//step 3: determine enemy's Spin and Risk					START
	stats = stats.substring(stats.indexOf("Their Spin"));
	istart = stats.indexOf("<b>")+3;	iend   = stats.indexOf("</b>");
	tstr = stats.substring(istart,iend);	var theirspin = parseInt(tstr);
	debugstring = debugstring + "Their spin is " + theirspin + ".\n";

	stats = stats.substring(stats.indexOf("Their Risk"));
	istart = stats.indexOf("<b>")+3;	iend   = stats.indexOf("</b>");
	tstr = stats.substring(istart,iend);	var theirrisk = parseInt(tstr);
	debugstring = debugstring + "Their risk is " + theirrisk + ".\n";
	//step 3									END

	//step 4: determine last used moves						START
	istart = everything.indexOf("used!");
	if (istart >= 0) {
		//step 4A: get the HTML of the used moves					START
		tstr = everything.substring(0,istart);					//used to find the start of used moves
		istart = tstr.lastIndexOf("<i>")+3;
		movesandstuff = everything.substring(istart);
		istart = movesandstuff.indexOf(" uses ");
		tstr = movesandstuff.substring(istart);
		iend = tstr.indexOf("</i>") + istart;
		movesandstuff = movesandstuff.substring(0,iend);
		//step 4A									END

		//step 4B: determine last used moves
		iend = movesandstuff.indexOf(" used!");
		tstr = movesandstuff.substring(0,iend);
		if (tstr == "Alpha Cancel") {
			yourlastmove = 0;
		} else if (tstr == "Frame Advantage") {
			yourlastmove = 1;
		} else if (tstr == "Guard Crush") {
			yourlastmove = 2;
		} else if (tstr == "Tech Punish") {
			yourlastmove = 3;
		} else if (tstr == "Wake-Up Reversal") {
			yourlastmove = 4;
		}
		istart = movesandstuff.indexOf(" uses ")+6;
		iend = movesandstuff.lastIndexOf("!");
		tstr = movesandstuff.substring(istart,iend);
		if (tstr == "Alpha Cancel") {
			theirlastmove = 0;
		} else if (tstr == "Frame Advantage") {
			theirlastmove = 1;
		} else if (tstr == "Guard Crush") {
			theirlastmove = 2;
		} else if (tstr == "Tech Punish") {
			theirlastmove = 3;
		} else if (tstr == "Wake-Up Reversal") {
			theirlastmove = 4;
		}
		debugstring = debugstring + "Your last move was " + yourlastmove + ".\n";
		debugstring = debugstring + "Their last move was " + theirlastmove + ".\n";
		//step 4B									END
	}
	//step 4									END

	//step 5: determine enemy's next move						START
	istart = everything.indexOf("next move: <i>")+14;
	if (istart >= 14) {
		tstr = everything.substring(istart);
		iend = tstr.indexOf("?</i>");
		tstr = tstr.substring(0,iend);
		if (tstr == "Alpha Cancel") {
			theirnextmove = 0;
		} else if (tstr == "Frame Advantage") {
			theirnextmove = 1;
		} else if (tstr == "Guard Crush") {
			theirnextmove = 2;
		} else if (tstr == "Tech Punish") {
			theirnextmove = 3;
		} else if (tstr == "Wake-Up Reversal") {
			theirnextmove = 4;
		}
		debugstring = debugstring + "Their next move is " + theirnextmove + ".\n";
	}
	//step 5									END


	//step 6: decide on the next move						START

		//step 6A: base priorities and priority modifier values for each situation	START
	//base priorities: first is tiebreaker priority, next is actual preference
		var pac = 0.0 + -5;	//do not like			0
		var pfa = 0.2 + 0;	//				2
		var pgc = 0.4 + 0;	//				4
		var ptp = 0.3 + 0;	//				3
		var pwr = 0.1 + 0;	//				1
	//knowing the opponent's next move
		var crush	= 15;		//you'll get +2 levels, +1 damage!
		var beat	= 5;		//you'll get +1 level
		var mirror	= 0;		//-1 damage, but mirror move abilities kick in
		var lose	= -5;		//they'll get +1 level
		var drown	= -15;		//they'll get +2 levels, +1 damage!
	//don't like to repeat your last move? make this negative
		var repeat	= -2;		//they might see it coming
	//situations affecting whether or not to use Frame Advantage
		var spinlerisk	= 3;		//at spin <= risk, it's interesting
		var spingtrisk	= 1;		//at spin > risk, it's less interesting
		var spinsafecap	= -5;		//at spin 2+, you run the risk of triggering Wave of Discord if you go higher
		var lessspin	= 0;		//if your spin < their spin, you might want to increase it
		var avoidDWfa	= 0;		//try -10 if at Cliff+: if your spin > their spin, you'll trigger Dark Whirlwind
	//situations affecting whether or not to use Guard Crush
		var killit	= 4;		//they have spin! KILL IT WITH FIRE!
		var avoidDWgc	= 0;		//try -10 if at Cliff+: if your spin > their spin, you'll trigger Dark Whirlwind
	//situations affecting whether or not to use Tech Punish (use GC instead of TP if enemy has Spin)
		var trisk00	= 1;		//they have risk 0! MAKE THEM SUFFER!
		var trisk01	= 3;		//pro: more risk means TP is more useful. con: Shadow Focus + WR.
		var trisk02	= 5;		//they'll have risk even if they WR? I'll take it!
		var trisk03	= 8;		//they'll have 2+ risk even if they WR? AWESOME!
	//situations affecting whether or not to use Wake-Up Reversal
		var riskgtspin	= 2;		//more risk than spin? yikes
		var highrisk	= 3;		//at 2+ Risk, WR becomes more interesting
		var risk0spin0	= 0;		//at 0 Risk, 0 Spin, it's basically a neutral move
		var risk0spin1	= -3;		//at 0 Risk, 1+ Spin, you'd just hurt yourself
		var avoidDWwr	= 0;		//>0 at Cliff+: -1 Spin might prevent a Dark Whirlwind (if you're not too late)
	//first off: using the opponent's next move
	if (theirnextmove == 0) {		pac += mirror;	pfa += crush;	pgc += lose;	ptp += beat;	pwr += drown;
	} else if (theirnextmove == 1) {	pac += drown;	pfa += mirror;	pgc += crush;	ptp += lose;	pwr += beat;
	} else if (theirnextmove == 2) {	pac += beat;	pfa += drown;	pgc += mirror;	ptp += crush;	pwr += lose;
	} else if (theirnextmove == 3) {	pac += lose;	pfa += beat;	pgc += drown;	ptp += mirror;	pwr += crush;
	} else if (theirnextmove == 4) {	pac += crush;	pfa += lose;	pgc += beat;	ptp += drown;	pwr += mirror;
	}
	//second: repeating your last move
	if (yourlastmove == 0) {	pac += repeat;
	} else if (yourlastmove == 1) {	pfa += repeat;
	} else if (yourlastmove == 2) {	pgc += repeat;
	} else if (yourlastmove == 3) {	ptp += repeat;
	} else if (yourlastmove == 4) {	pwr += repeat;
	}
	//Frame Advantage	2-3 factors
	if (yourspin <= yourrisk) {	pfa += spinlerisk;
	} else {			pfa += spingtrisk;
	}
	if (yourspin >= 2) {		pfa += spinsafecap;
	}
	if (yourspin < theirspin) {	pfa += lessspin;
	} else {			pfa += avoidDWfa;
	}
	//Guard Crush		1-2 factors
	if (theirspin > 0) {		pgc += killit
	}
	if (yourspin >= theirspin) {	pgc += avoidDWgc;
	}
	//Tech Punish		1 factor
	//special note: if enemy EX >= 200, cap their Risk at 1 for determining TP priority;
	//		if enemy EX == 300, cap their Risk at 0 for determining TP priority
	istart = everything.lastIndexOf("EX Gauge (")+10;
	tstr = everything.substring(istart);
	iend = tstr.indexOf(")");
	tstr = tstr.substring(0,iend);
	var theirex = parseInt(tstr);
	var cappedrisk = theirrisk;
	if (theirex == 300) {
		cappedrisk = 0;
	} else if (theirex >= 200) {
		cappedrisk = Math.min(cappedrisk,1);
	}
	if (theirspin == 0) {
		if (cappedrisk == 0) {		ptp += trisk00;
		} else if (cappedrisk == 1) {	ptp += trisk01;
		} else if (cappedrisk == 2) {	ptp += trisk02;
		} else {			ptp += trisk03;
		}
	}
	//Wake-Up Reversal	1-3 factors
	if (yourrisk > yourspin) {	pwr += riskgtspin;
	}
	if (yourrisk >= 2) {		pwr += highrisk;
	} else if (yourrisk == 0) {
		if (yourspin == 0) {	pwr += risk0spin0;
		} else {		pwr += risk0spin1;
		}
	}
	if (yourspin >= theirspin) {	pwr += avoidDWwr;
	}
	debugstring = debugstring + pac + "," + pfa + "," + pgc + "," + ptp + "," + pwr + "\n";
	//step 6									END

	//step 7: pick a move								START
	var bestscore = Math.max(pac,pfa,pgc,ptp,pwr);
	var bestmove = -1;
	if (pac == bestscore) {
		bestmove = 0;
	} else if (pfa == bestscore) {
		bestmove = 1;
	} else if (pgc == bestscore) {
		bestmove = 2;
	} else if (ptp == bestscore) {
		bestmove = 3;
	} else {
		bestmove = 4;
	}
	var skills=document.forms.namedItem("slingact").elements;
	for(var i=0; i<skills.length; i++) {
		if(skills[i].value==bestmove) {		skills[i].wrappedJSObject.click();	}
	}
	//step 7									END

	//step 8: pick Look at my Horse if possible					START
	for(var i=0; i<skills.length; i++) {
		if(skills[i].value=="K") {					//Look at my Horse
			skills[i].wrappedJSObject.click();
		}
	}
	//step 8									END
	if (debugme) {					alert(bestmove + "\n"+debugstring);	}
}

window.addEventListener("keydown", process_event, false);
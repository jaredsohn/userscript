// ==UserScript==
// @name          WaniKani LevelUP Celebrator
// @namespace     https://www.wanikani.com
// @description   This will display a "level-up" notification on your WK Dashboard after you level up.  You can customize the image and text of the display.  Other achievements are also noted.  By RhosVeedcy.
// @version 2.1.3
// @downloadURL   https://userscripts.org/scripts/source/423664.user.js
// @updateURL     https://userscripts.org/scripts/source/423664.meta.js
// @include       https://www.wanikani.com/
// @include       https://www.wanikani.com/dashboard
// @run-at	  document-end
// @grant	  GM_registerMenuCommand

// ==/UserScript==


function get(id) {
    console.log('get fct');
    if (id && typeof id === 'string') {
	console.log(id);
        id = document.getElementById(id);
    }
    return id || null;
}


function GMsetup() {
  if (GM_registerMenuCommand) {
    GM_registerMenuCommand('WaniKani LevelUP Celebrator: Set image URL', function() {
      var curEntry = localStorage.getItem("WKlvlupImgURL") || "";
      var newImgURL = prompt('New Image URL:', curEntry);
      if (newImgURL != null) {
	if (typeof(newImgURL) !== "string") {
		newImgURL = String(newImgURL);
	}
        localStorage.setItem("WKlvlupImgURL", newImgURL);
      }
    });

    GM_registerMenuCommand('WaniKani LevelUP Celebrator: Set text', function() {
      var curEntry = localStorage.getItem("WKlvlupText") || "";
      var newText = prompt('New text:', curEntry);
      if (newText != null) {
	if (typeof(newText) !== "string") {
		newText = String(newText);
	}
        localStorage.setItem("WKlvlupText", newText);
      }
    });

    GM_registerMenuCommand('WaniKani LevelUP Celebrator: Preview', function() {
	sessionStorage.setItem("WKlvlupPreview", 1);
	location.reload();
    });

  }
}


function checkLevel() {

	console.log("checkLevel() start");

	var lastKnownLevel = localStorage.getItem("WKlvlupPrevLevel") || 1;
	var curlevel = document.getElementsByClassName("levels")[0].getElementsByTagName("span")[0].innerHTML || lastKnownLevel;

	var prev = Number(lastKnownLevel);
	var cur  = Number(curlevel);
	var next = prev + 1;

	if (cur == next) { 
		console.log("leveled up!");
		var d = new Date();
		var n = d.getTime();
		localStorage.setItem("WKlvlupLevTime", n); // record level-up time
		localStorage.setItem("WKlvlupPrevLevel", cur);  // update 'lastKnownLevel' for next time

	} else if (cur != prev) {
		// either this is the first time we're running, or there's a different user here, 
		// or the user's subscription status has changed, or something else weird is going on;

		// if cur == 2, assume the user's subscription expired; leave everything be and wait for renewal. Otherwise,

		if (cur != 2 || ! localStorage.getItem("WKlvlupPrevLevel")) { 

			// clear WKlvlupLevTime to make sure we don't display the level-up message
			console.log("reinitializing");
			localStorage.setItem("WKlvlupLevTime", 0);
			localStorage.setItem("WKlvlupPrevLevel", cur);  // update 'lastKnownLevel' for next time

			// also reinitialize the nextMilestones array
			initializeMilestones();

		}

	} //else cur == prev, so 'lastKnownLevel' is still correct (or it will continue to default to 1 if it hasn't been stored yet)

	console.log("prev level: ", prev);
	console.log("cur level: ", cur);
	console.log("next level: ", next);
	console.log("checkLevel() end");

	return cur;
}



function shouldDisplay() {

	console.log('shouldDisplay() start');

	var levTime = localStorage.getItem("WKlvlupLevTime") || 0;
	var rawdur = 10;  // new level display is enabled for 10 minutes after first display time
	var d = new Date();
	var now = d.getTime();
	var retval;
	var duration = Number(rawdur);
	var preview = sessionStorage.getItem("WKlvlupPreview");

	var theTxt = localStorage.getItem("WKlvlupText");

	console.log("now = ", now);
	console.log("levTime = ", levTime);
	console.log("rawdur = ", rawdur);
	console.log("duration minutes = ", duration);

	if (preview && preview == 1) {
		console.log("Preview enabled, display it");
		sessionStorage.setItem("WKlvlupPreview", 0);	// once only
		return 1;
	}

	if (theTxt && theTxt.substring(0, 8) == "%#TEST%#") {
		console.log("text begins with %#TEST%#, always display");
		return 1;
	}
	
	duration *= 60000; // convert to milliseconds

	console.log("duration msec = ", duration);

	console.log("now - levTime = ", now - levTime);

	if ((now - levTime) <= duration) {
		retval = 1;
	} else {
		retval = 0;
	}

	console.log("retval = ", retval);

	console.log('shouldDisplay() end');
	return retval;
}



function displayLevelUpMessage ( curLevel ) {
	console.log('displayLevelUpMessage() start');
	var msg = get("search");
    	var t = document.createElement('div');
 	var theImg = localStorage.getItem("WKlvlupImgURL");
	var theTxt = localStorage.getItem("WKlvlupText");
    	
 	t.innerHTML = '<img id="WKlvlupImg" style="margin:20px;float:left"> </img>'+
        		'<div id="WKlvlupTxt" style="margin:20px;text-align:center;float:left;line-height:110%;font-size:300%"> </div>'+
        		'</div>';

    	msg.appendChild(t);

	var thing1 = get("WKlvlupImg");
	if (thing1 && theImg) {
		thing1.src = theImg;
	}

	var thing2 = get("WKlvlupTxt");

	if (thing2 && theTxt) {
		if (theTxt.substring(0, 8) == "%#TEST%#") {
			// indicates test mode; strip the test flag out of the text
			theTxt = theTxt.replace("%#TEST%#", "");
		}
		
		theTxt = theTxt.replace(/#LEVELNUM#/g, curLevel);  // support #LEVELNUM# variable in text strings

		thing2.innerHTML= theTxt;
	} 

	console.log('displayLevelUpMessage() end');
}


function getNextMilestone( numTurtles ) {

	console.log("getNextMilestone()");

	var milestones = [1, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 999999];
	var i=0;

	console.log("numTurtles = ", numTurtles);

	while ( milestones[i] <= numTurtles ) {

		i++;
	}
	console.log("next milestone = ", milestones[i]);
	return milestones[i];
}


function getTurtleCounts() {	// cumulative (enl = enl + bur, etc.)

	console.log("getTurtleCounts()");

	// I'm doing the string split(" ") and replace() so we will play nicely with one of my other scripts just in case the other one runs first

	var bstr = document.getElementById("burned").getElementsByTagName("span")[0].innerHTML.split(" ")[0] || "0";
	var estr = document.getElementById("enlightened").getElementsByTagName("span")[0].innerHTML.split(" ")[0] || "0";
	var mstr = document.getElementById("master").getElementsByTagName("span")[0].innerHTML.split(" ")[0] || "0";
	var gstr = document.getElementById("guru").getElementsByTagName("span")[0].innerHTML.split(" ")[0] || "0";
	var astr = document.getElementById("apprentice").getElementsByTagName("span")[0].innerHTML.split(" ")[0] || "0";

	var uparrow = "↑";
	var downarrow = "↓";

	bstr = bstr.replace(uparrow, "");
	estr = estr.replace(uparrow, "");
	mstr = mstr.replace(uparrow, "");
	gstr = gstr.replace(uparrow, "");
	astr = astr.replace(uparrow, "");

	bstr = bstr.replace(downarrow, "");
	estr = estr.replace(downarrow, "");
	mstr = mstr.replace(downarrow, "");
	gstr = gstr.replace(downarrow, "");
	astr = astr.replace(downarrow, "");

	var burned = Number( bstr );
	var enlightened = Number( estr );
	var master = Number( mstr );
	var guru = Number( gstr );
	var apprentice = Number( astr );

	console.log("raw counts: ", apprentice, guru, master, enlightened, burned);

	enlightened += burned;
	master += enlightened;
	guru += master;
	apprentice += guru;

	console.log("cumulative counts: ", apprentice, guru, master, enlightened, burned);

	return [apprentice, guru, master, enlightened, burned];
}



function init () {
	console.log('init() start');

 	var theImg = localStorage.getItem("WKlvlupImgURL");
	var theTxt = localStorage.getItem("WKlvlupText");
	var nextMilestones = localStorage.getItem("WKlvlupMilestones");
    
      	if (!theImg) {
		theImg = "https://i.imgur.com/K6UQL1Z.gif";
        	localStorage.setItem("WKlvlupImgURL", theImg);
      	}
      
      	if (!theTxt) {
		theTxt = '<br/>You leveled up!<br/>Congratulations!';
        	localStorage.setItem("WKlvlupText", theTxt);
      	}

	if (!nextMilestones) {

		initializeMilestones();
		
	}

	console.log('init() end');
}


function initializeMilestones () {

	console.log("initializeMilestones()");

	var turtleCounts = getTurtleCounts();	// cumulative (enl = enl + bur, etc.)
	var nextMilestones = new Array();

	for (var x=1; x < turtleCounts.length; x++) {

		nextMilestones[x-1] = getNextMilestone( turtleCounts[x] );  // turtleCounts[] includes Apprentice items, nextMilestones[] does not
	}

	localStorage.setItem("WKlvlupMilestones", JSON.stringify(nextMilestones));
}


function checkMilestones( level ) {

	console.log("checkMilestones()");

	var nextMilestones = JSON.parse( localStorage.getItem("WKlvlupMilestones") );
	var turtleCounts = getTurtleCounts();
	var achievements = new Array();
	var gotOne = 0;
	var testAllDone = null; //sessionStorage.getItem("WKlvlupTestAllBurned");

	console.log("nextMilestones: ", JSON.stringify(nextMilestones));

	if ( testAllDone || (level >= 50  && (turtleCounts[0] == turtleCounts[4]))) {

		// also check that lessons == 0 and reviews == 0

		var rvws = document.getElementsByClassName("reviews")[0].getElementsByTagName("span")[0];
		var lsns = document.getElementsByClassName("lessons")[0].getElementsByTagName("span")[0];
	
		if (testAllDone || (rvws == 0 && lsns == 0)) {

			console.log("all turtles burned!");

			// set flag
			sessionStorage.setItem("WKlvlupAllBurned", 1);

			// return some otherwise-impossible array so that we'll get into displayMilestones()
			console.log("returning [1,1,1,1]");	
			return [1, 1, 1, 1];
		}
	}

	for (var x=0; x < nextMilestones.length; x++) {

		if (turtleCounts[x+1] >= nextMilestones[x]) { // turtleCounts[] includes Apprentice items, nextMilestones[] does not
			
			achievements[x] = nextMilestones[x];
			nextMilestones[x] = getNextMilestone( turtleCounts[x+1] );
			gotOne++;

		} else {
			achievements[x] = 0;
		}
	}

	console.log("achievements: ", JSON.stringify(achievements));

	if (gotOne != 0) {

		console.log("checkMilestones() returning achievements");
		localStorage.setItem("WKlvlupMilestones", JSON.stringify(nextMilestones));
		return achievements;

	} else {
		console.log("checkMilestones() returning null");
		return null;
	}
}


function displayMilestones ( milestones ) {

	console.log('displayMilestones() start');
	var msg = get("search");
    	var t = document.createElement('div');
 	var theImg = localStorage.getItem("WKlvlupImgURL");
	var theTxt = "<br/>";
	var labels = [" Guru turtle!", " Master turtle!", " Enlightened turtle!", " Burned turtle!"];
    	
 	t.innerHTML = '<img id="WKlvlupImg" style="margin:20px;float:left"> </img>'+
        		'<div id="WKlvlupTxt" style="margin:20px;text-align:center;float:left;line-height:110%;font-size:300%"> </div>'+
        		'</div>';

    	msg.appendChild(t);

	var thing1 = get("WKlvlupImg");
	if (thing1 && theImg) {
		thing1.src = theImg;
	}

	var allDoneWK = sessionStorage.getItem("WKlvlupAllBurned");
	
	if (allDoneWK && allDoneWK == 1) {

		theTxt += "ALL TURTLES BURNED!<br/>WANIKANI COMPLETE!";
		//sessionStorage.removeItem("WKlvlupTestAllBurned");
	} else {

		for (var x = milestones.length - 1; x >= 0; x--) {

			if (milestones[x] == 1) {

				theTxt += "First" + labels[x] + "<br/>";
			}
			else if (milestones[x] != 0) {

				theTxt += milestones[x] + "th" + labels[x] + "<br/>";
			}
		}
	}

	var thing2 = get("WKlvlupTxt");

	if (thing2) {

		thing2.innerHTML= theTxt;
	} 

	console.log('displayMilestones() end');
}



function main () {

	var curLevel;

	console.log("main()");

	init();

	GMsetup();

	curLevel = checkLevel();

	var lastKnownLevel = localStorage.getItem("WKlvlupPrevLevel") || 1;

	if (curLevel != lastKnownLevel) { return; }

	if (shouldDisplay()) {

		var durtext = get("WKlvldurTxt");

		if (durtext) { durtext.parentNode.removeChild(durtext); }  // override WK Level Duration script

		displayLevelUpMessage( curLevel );

	} else {

		var milestones = checkMilestones( curLevel );

		if (milestones) {

			var durtext = get("WKlvldurTxt");

			if (durtext) { durtext.parentNode.removeChild(durtext); }  // override WK Level Duration script

			displayMilestones( milestones );

		} 
	}
}

window.addEventListener("load", main, false);

console.log('script load end');

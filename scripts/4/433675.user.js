// ==UserScript==
// @name          WaniKani Level Duration
// @namespace     https://www.wanikani.com
// @description   This will display the number of days since your last level-up. Two display options are offered.  By RhosVeedcy.
// @version 1.3.3
// @downloadURL   https://userscripts.org/scripts/source/433675.user.js
// @updateURL     https://userscripts.org/scripts/source/433675.meta.js
// @include       https://www.wanikani.com/
// @include       https://www.wanikani.com/dashboard
// @include       https://www.wanikani.com/level/*
// @include       https://www.wanikani.com/radicals*
// @include       https://www.wanikani.com/lattice/*
// @include       https://www.wanikani.com/kanji*
// @include       https://www.wanikani.com/vocabulary*
// @include       https://www.wanikani.com/community*
// @include       https://www.wanikani.com/chat/*
// @include       https://www.wanikani.com/about
// @include       https://www.wanikani.com/api
// @include       https://www.wanikani.com/faq
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


function dateSuffix(d) {
  if(d>3 && d<21) return 'th'; // http://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}


function GMsetup() {

  if (GM_registerMenuCommand) {

    GM_registerMenuCommand('WaniKani Level Duration: Switch display type', function() {
	var curDType = localStorage.getItem("WKlvldurDType") || 0;
	curDType++;
	curDType %= 2;
	localStorage.setItem("WKlvldurDType", curDType);
	location.reload();
    });

    GM_registerMenuCommand('WaniKani Level Duration: Set manually', function() {
      var minusDays = prompt('How many days ago did you level up?');
      if (minusDays != null) {
	minusDays = Number(minusDays);
	if (isNaN(minusDays) || minusDays < 0) { 
		
		return; 
	}
	var d = new Date();
	var n = d.getTime();
	minusDays *= 24*60*60*1000;
	localStorage.setItem("WKlvlupLevTime", n - minusDays); // record level-up time
	location.reload();
      }
    });

  }
}


function checkLevel() {

	console.log("checkLevel() start");

	var lastKnownLevel = localStorage.getItem("WKlvlupPrevLevel") || 1;
	var levelEls = document.getElementsByClassName("levels");

	if (!levelEls || !levelEls[0]) {

		return -1;
	}

	var spanEls = levelEls[0].getElementsByTagName("span");

	if (!spanEls || !spanEls[0]) {

		return -1;
	}


	var curlevel = spanEls[0].innerHTML || lastKnownLevel;

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
		// or the user's subscription status has changed, or something else weird is going on.

		// if cur == 2, assume the user's subscription expired; leave everything be and wait for renewal. Otherwise,

		if (cur != 2 || ! localStorage.getItem("WKlvlupPrevLevel")) { 


			// clear WKlvlupLevTime to make sure we don't display incorrect level info
			console.log("reinitializing");
			localStorage.setItem("WKlvlupLevTime", 0);
			localStorage.setItem("WKlvlupPrevLevel", cur);  // update 'lastKnownLevel' for next time
		}

	} //else cur == prev, so 'lastKnownLevel' is still correct (or it will continue to default to 1 if it hasn't been stored yet)

	console.log("prev level: ", prev);
	console.log("cur level: ", cur);
	console.log("next level: ", next);
	console.log("checkLevel() end");

	return cur;
}



function displayLastLevTime( curLevel ) {

   console.log('displayLastLevTime()');

   var lastKnownLevel = localStorage.getItem("WKlvlupPrevLevel") || 1;
   var levTime = localStorage.getItem("WKlvlupLevTime") || 0;
   var wkPage = window.location.pathname;

   if (levTime != 0 && curLevel == lastKnownLevel) {

	var datetime = new Date(Number(levTime));
	var now = new Date;
	var one10thDay = 24*60*60*100;	// hours*minutes*seconds*milliseconds/10
	var diffDays = (Math.round((now.getTime() - datetime.getTime())/(one10thDay))) / 10;
	var curDType = localStorage.getItem("WKlvldurDType") || 0;

	console.log("diffDays    = ", diffDays);
	console.log("displayType = ", curDType);

	if (curDType == 0) { // display type 0

	   var levelsbox = document.getElementsByClassName("levels")[0].getElementsByTagName("a")[0];

	   if (levelsbox) {

		var t2 = document.createElement('div');
 		t2.innerHTML = '<div id="WKlvldurLBTxt"> </div>'+
  		     		'</div>';

  		levelsbox.appendChild(t2);

		var thing3 = get("WKlvldurLBTxt");

		if (thing3 && diffDays >= 0) {

			var dayString = ((diffDays > 1.0) ? " days)" : " day)");

			if (diffDays < 0.1) {

				diffDays = "< 0.1";   // (< 0.1 day)
			}

			thing3.innerHTML = "(" + diffDays + dayString;

			// this next block is to make everything else in the navbar line up properly (popups mainly)

			var boxnames = ["title", "lessons", "reviews", "radicals", "kanji", "vocabulary", "account"];

			for (var i=0; i < boxnames.length; i++) {

				var innerStr = '<div id=' + boxnames[i] + 'xxlvlup' + ' style="color:#F2F2F2"> </div>'+ '</div>';
				var thebox = document.getElementsByClassName(boxnames[i])[0].getElementsByTagName("a")[0];
				var stubby = document.createElement('div');
 				stubby.innerHTML = innerStr;
				thebox.appendChild(stubby);
				var theThing = get(boxnames[i]+'xxlvlup');
				theThing.innerHTML = ".";
			}
		}
	    }
	} else if (wkPage === "/" || wkPage === "/dashboard") { // display type 1

	   var celebrationImg = get("WKlvlupImg");
	   var celebrationTxt = get("WKlvlupTxt");

	   if (celebrationImg || celebrationTxt) { return; } // WK LevelUP Celebrator is doing its thing, don't crash the party

	   var msg = get("search");

	   if (msg) {

   		var t = document.createElement('div');

 		t.innerHTML = '<div id="WKlvldurTxt" align="center" style="margin:18px;text-align:center;line-height:110%;font-size:100%;"> </div>'+
      		  		'</div>';

		t.style.fontFamily = "'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif";
	    	msg.appendChild(t);

		var thing2 = get("WKlvldurTxt");

		if (thing2) {

			var daynames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var monthnames = ["January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "];
			var dd = datetime.getDate();
			var hours = datetime.getHours();
			var minutes = datetime.getMinutes();
			var ampm = "AM";

			if (hours > 12) {

				hours -= 12;
				ampm = "PM";
			}

			if (minutes < 10) {

				minutes = "0" + String(minutes);
			}

			var theTxt = "You reached Level " + curLevel + " on " + daynames[datetime.getDay()] + ", " + monthnames[datetime.getMonth()] + dd + dateSuffix(dd) + " at " + hours + ":" + minutes + " " + ampm;

			if (diffDays >= 0 && diffDays < 0.1) {

				theTxt += " (< 0.1 day ago)";
			
			} else if (diffDays >= 0.1 && diffDays <= 1) {

				theTxt += " (" + diffDays + " day ago)";

			} else if (diffDays > 1) {

				theTxt += " (" + diffDays + " days ago)";
			}

			thing2.innerHTML= theTxt;
		}
	    }
	}
  }
}


function init () {

	console.log('init() start');

	var curDType = localStorage.getItem("WKlvldurDType");
    
      	if (!curDType) {
        	localStorage.setItem("WKlvldurDType", 0);
      	}
      
	console.log('init() end');
}



function main () {

	var curLevel;

	console.log("pathname: ", window.location.pathname);

	console.log("main()");

	init();

	GMsetup();

	curLevel = checkLevel();

	if (curLevel != -1) {

		displayLastLevTime(curLevel);
	}
}

window.addEventListener("load", main, false);

console.log('script load end');

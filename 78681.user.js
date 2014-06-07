// ==UserScript==
// @name           MH Horn Timer
// @namespace      http://localhost.localdomain
// @description    Makes the countdown timer for the horn visible
// @include        http://www.mousehuntgame.com/*
// @include        https://www.mousehuntgame.com/*
// ==/UserScript==

// @include        http://apps.facebook.com/mousehunt/*
// @include        https://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include        https://apps.new.facebook.com/mousehunt/*


//document.getElementById("header").removeClassName("hornwaiting").removeClassName("hornsounding").removeClassName("hornsounded").addClassName("hornready");
// id=huntTimer has the timer

var origTitle = document.title;
var newTitle = "Sound the horn";
var titleCount = 0;
var spaces = 0;
var wasHorn = 0;
var timeLeft = "";
var sec = 0;
GM_log("Horn Timer started");

var changeTitle = function() { 
  delay=5; 
//  GM_log("Horn Timer: changeTitle function called"); 
  if  (document.getElementById("header").className.search(/hornready/i) >= 0) { 
	  spaces = titleCount % 6 * 2; 
	  var preString = "_"; 
	  for (var i = 0; i < spaces; i++) { 
		  preString += "_"; 
	} 
	document.title = preString + newTitle; 
	titleCount++; 
	wasHorn = 1;
  	unsafeWindow.setTimeout(changeTitle, 1000); 
  	//window.getAttention(); //window.focus(); 
  	//alert("Sound the horn"); 
  } else { 
	  //  alert("Time has passed"); 
	  timeLeft = unsafeWindow.HuntersHorn.getSecondsRemaining(); 
	  //    if (document.getElementById("huntTimer")) { 
	  //       timeLeft = document.getElementById("huntTimer").childNodes[0].innerHTML; 
	  //	    timeLeft =  timeLeft.substring(timeLeft.search("/span>")+6); 
	  //	    alert(timeLeft); 
	  // <span class="timerlabel">Next Hunt:</span> 12 mins 
	  //  } 
	  //    alert(unsafeWindow.HuntersHorn.getSecondsRemaining()); alert ("Time left: " + timeLeft);

    if (timeLeft >= 1) {
	    preString = Math.floor(timeLeft / 60);
	    sec = timeLeft % 60;
	    if (sec == 0) { sec = "00"; }
	    else if (sec < 10) { sec = "0" + sec; }
	    preString += ":" + sec;
    	    document.title = preString + " | " + origTitle;
    }
    if ( wasHorn == 1 ) {
	    wasHorn = 0;
    }
//    if ( document.getElementById("hornArea") ) {
//	    var Str = document.getElementById("hornArea").firstChild.lastchild.innerHTML;
//	    var patt = new RegExp("\d+","mg");
//	    alert("Str = " + Str);
//	    var Time = Str.match(patt)[0];
//	    alert("Time = " + Time);
//    }
    if (timeLeft <= (2*delay)) {
	    unsafeWindow.setTimeout(changeTitle, 1000);
    } else {
	    unsafeWindow.setTimeout(changeTitle, 1000*delay);
    }
//    if (unsafeWindow.user != undefined) {
//	   alert("Next turn in: " + unsafeWindow.user.next_activeturn_seconds);
//    }
//    alert(user.next_activeturn_seconds);

//    alert(document.getSecondsRemaining());
//    alert ("another 2 seconds");
  }
}

unsafeWindow.setTimeout(changeTitle, 50);
// GM_log ("Timeout set");

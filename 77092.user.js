// ==UserScript==
// @name		MouseHunt Timer
// @shortname	mhtimer
// @version	0.1
// @description    Displays a countdown timer to the next hunting horn within the facebook game MouseHunt.
// @creator	Martin Ledgard
// @homepageURL	http://www.le6o.com
// @ff_min_version	3.0
// @ff_max_version	3.0.*
// @include        http://apps.facebook.com/mousehunt/*
// ==/UserScript==

var main;
main = document.getElementById('app10337532241_contentcontainer');
if (main) {
	var newElement, allInputs, thisInput, timerInput, timerCache;
	
    newElement = document.createElement('div');
	newElement.setAttribute("id", "le6oDiv");
	newElement.innerHTML = "<div class=\"clearfix\" style=\"padding:5px 0 0; margin-right:2px\"><div id=\"le6oTimer\" style=\"float:right; width:341px; text-align:center; background:#FFFACD; border:1px solid #8D876D; padding:5px;\">&nbsp;</div></div>";	
	main.parentNode.insertBefore(newElement, main);
	
	allInputs = document.getElementsByTagName('input');
	for (var i = 0; i < allInputs.length; i++) {
		thisInput = allInputs[i];
		if ( thisInput.type == 'hidden' ) {
			if ( thisInput.id.toString().search("hornWaitValue") > -1 ) {
				timerInput = thisInput;
				timerCache = timerInput.value;
				setTimeout(updateTimer, 0);
			}
		}
	}
}

function updateTimer() {
	if ( timerCache > timerInput.value ) {
		timerWait = timerInput.value;
		timerCache = timerWait;	
	} else {
		timerWait = timerCache - 1;
	}
	
	if (timerWait >= 0) {
		document.getElementById('le6oTimer').innerHTML = "You will able to sound the Hunter's Horn in <strong>"+secondsToString(timerWait)+"</strong>";
		setTimeout(updateTimer, 1000);
	}
	else if (timerWait < 0) {
		document.getElementById('le6oTimer').innerHTML = "You are ready to hunt! Click the <a href='http://apps.facebook.com/mousehunt/turn.php'>Hunter's Horn</a> to start a hunt!";
	}
}

function secondsToString(seconds) {
	minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	return (minutes > 0) ? minutes+' min. '+seconds+' sec.' : seconds+' sec.';
}
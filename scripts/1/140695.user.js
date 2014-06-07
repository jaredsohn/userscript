// ==UserScript==
// @name        Runkeeper
// @description Export all runkeeper activities.
// @include     http://runkeeper.com/user/*/activity/*
// @version     1
// ==/UserScript==

// Function that simulate the click
function simulateClick(el){
   var customEvent = document.createEvent("MouseEvents");
   customEvent.initMouseEvent(   "click",
                        true,
                        true,
                        unsafeWindow,
                        1,
                        0,
                        0,
                        0,
                        0,
                        false,
                        false,
                        false,
                        false,
                        0,
                        undefined
                     );
   el.dispatchEvent( customEvent );
};

// Function that clicks every month with "delay" seconds of delay.
// Note delay=3 seconds to ensure that the server load the activities.
// It also works with a delay of 1,5 seconds.
// Max is the total number of months.
function myLoop (max) {
	setTimeout(function () {
		simulateClick(allMonths.snapshotItem(i)); // Click the i-th month
		i++;
			if (i < max) { //stops when finishes all months
				myLoop(max); //recursively call
					}
				else {alert("Finish with workouts loading. Now start \"dTa One Click\" to download your activities");
}
   }, delay)
}

// Function that is called when button is pressed.
// It founds the number of months
function getMonths(){
allMonths = document.evaluate("//div[contains(@class,'ui-accordion-header')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
myLoop(allMonths.snapshotLength);
}

// Starting script

// Defines variables
//var ;
var allScript, thisScript, allMonths;
var lenght;
var delay = 3000;
var i=0;

// Define new javascript element.
var newScript = document.createElement('script');
newScript.src = "http://ddepaoli3.altervista.org/script_runkeeper.js";
newScript.type = "text/javascript";

// Insert my script before the original one. 
allScript = document.evaluate('//script[contains(@src,"activity/rkActivitiesManager.js")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i< allScript.snapshotLength; i++) {
thisScript = allScript.snapshotItem(i);
thisScript.parentNode.insertBefore(newScript, thisScript);
}

var leftColumn = document.getElementById('leftColumn');

// Create button
var btn = document.createElement( 'input' );
btn.addEventListener("click", getMonths, false); // when button is pressed getMonths function is called.
					// Otherwise the script doesn't start
with( btn ) {
  setAttribute( 'value', 'Start open all months!' );
  setAttribute( 'style', 'height: 50px; width: 200px');
  setAttribute( 'type', 'button' );
}
var newH3 = document.createElement('h3');
newH3.appendChild(document.createTextNode('LINK'));
leftColumn.parentNode.insertBefore(newH3, leftColumn);
leftColumn.parentNode.insertBefore(btn, newH3);




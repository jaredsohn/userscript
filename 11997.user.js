// ==UserScript==
// @name           Reddit Comment Score
// @namespace      reddit.com
// @description    Scores your Reddit comments
// @include        *reddit.com/user/*
// ==/UserScript==

// Cycle through all the elements

var allElements, thisElement;
allElements = document.getElementsByTagName('*');
var total = 0;
var score_match = 0;
for(var i=0; i < allElements.length; i++) {
    thisElement = allElements[i];

// If we find a score tag, then pattern match the number before score and add it to 
// the total.

    if(thisElement.id.match("usermenu")){
	my_add = thisElement;
    }

    if(thisElement.id.match("score.*")){
	score_match++;
        // Remember to check for a minus, then find 1 or more numbers.
	total_re = /-*\d+/;
	total += parseInt(total_re.exec(thisElement.innerHTML));
      }

}

myTextNode = document.createTextNode("Avg Score = " + (total/ score_match) + " Total Comments = " + score_match);
var bob = my_add.appendChild(myTextNode);
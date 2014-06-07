// ==UserScript==
// @name       Goodreads reading challenge fixer
// @namespace  http://x008FBE.null/
// @version    1.4
// @description  Re-adds the percentage/number-of-books functionality into the Goodreads Reading Challenge.
// @match  *://*.goodreads.com/*
// @exclude *://*.goodreads.com/challenges/*
// @grant none
// @noframes
// @copyright  2014+, 0x008FBE (SHA512-base64: ob/E5W+twaeT6441jg23i0RYUQiKjKcdgFWqT4JDnNYeLdDnV5xCQ8b1Rj2Vx20iOYoyprDtZXGX0NpoymvdEg==)
// ==/UserScript==

var progress_div = 'challengeProgress';		// The div class of the progress text.
var cProgDivs = document.querySelectorAll('.'+progress_div);
var regE = new RegExp('You have read ([0-9]+) of ([0-9]+) books\.*');
var scheduleStr = new RegExp('([0-9]+) books(.*?)schedule');
var newString = '{0} books ({1}%){2}schedule';
var showChallengeMessage = true;

// If the challenge progress box is present, modify it as we prefer.
var cProgDiv = null;
if(cProgDivs) {
    var cMatch;
    for(var i = 0; i < cProgDivs.length; i++) {
        console.log('Test');
        cMatch = regE.exec(cProgDivs[i].innerHTML);
        if(cMatch) {
            cProgDiv = cProgDivs[i];
            break;
        }
    }
}

if(cProgDiv) {
	var cMatch = regE.exec(cProgDiv.innerHTML);
	
	console.log('Found.');
	
	var booksread = cMatch[1];
	var totalbooks = cMatch[2];

	var booksperc = Math.floor(100*booksread/totalbooks);

	
    // Add percentage to the "books ahead" message.
    var aMatch = scheduleStr.exec(cProgDiv.innerHTML);
    if(aMatch) {
        var booksAhead = aMatch[1];
        var percAhead = Math.floor(100*booksAhead/totalbooks);
        
        newString = formatstr(newString, booksAhead, percAhead, aMatch[2]);
        cProgDiv.innerHTML = cProgDiv.innerHTML.replace(aMatch[0], newString);
    }
    
    // Add percentage to the progress bar - No longer necessary.
    /*
    var outerBarEl = document.querySelector('div.progressBarOuter');
    if(outerBarEl) {
		outerBarEl.style.display='inline-block';
		outerBarEl.style.width='130px';
		outerBarEl.style.verticalAlign='middle';
		
		var containerDiv = '<div style="width:170px;display:inline-block;vertical-align:middle">';
        var percDiv = '<div style="display:inline;vertical-align:middle; margin-left:5px;margin-top:2px">'+booksperc+'%';
		outerBarEl.outerHTML = containerDiv + outerBarEl.outerHTML + percDiv + '</div></div>';
	}
    */
        
    // Remove the challenge message
    if(!showChallengeMessage) {
		challengeMessageEl = document.querySelector('h3.challengeShortText');
        if (challengeMessageEl) {
	        challengeMessageEl.parentNode.removeChild(challengeMessageEl);
        }
    }
}

function formatstr(str) {
	for(var i = 1; i < arguments.length; i++) {
		var regexp = new RegExp('\\{'+(i-1)+'\\}', 'gi');
		str = str.replace(regexp, arguments[i]);
	}
	return str;
}

function getPercentOfYear() {
	// Gets the percentage of the year that has already passed,  

	var now = new Date();
	var days_in_year = leapYear(now.getFullYear()) ? 366.0 : 365.0;
	
	return 100*getDayOfYear()/days_in_year;
}

function getDayOfYear() {
	// Gets the number of days (including fractional days) that have passed since the beginning of 
	// the current year.
	
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);	// Beginning of year in Epoch time (ms)
	return (now-start)/864e5;	// 864e5 is the length of a day in milliseconds.
}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

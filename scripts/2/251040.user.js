// ==UserScript==
// @name       Goodreads reading challenge fixer - Legacy
// @namespace  http://x008FBE.null/
// @version    0.2.5
// @description  Re-adds the percentage/number-of-books functionality into the Goodreads Reading Challenge.
// @match  *://*.goodreads.com/*
// @noframes
// @copyright  2014+, 0x008FBE (SHA512-base64: ob/E5W+twaeT6441jg23i0RYUQiKjKcdgFWqT4JDnNYeLdDnV5xCQ8b1Rj2Vx20iOYoyprDtZXGX0NpoymvdEg==)
// ==/UserScript==

var progress_div = 'challengeProgress';		// The div class of the progress text.
var cProgDiv = document.querySelector('.'+progress_div);
var regE = new RegExp('You have read ([0-9]+) of ([0-9]+) books\.*');
var scheduleString = ['You are {0} books <i>({1}%)</i> {2} schedule.', 'You are right on schedule.'];
var schedulePreposition = ['ahead of', 'behind'];
var newString = 'You have completed {0} <i>({1}%)</i> of your goal of {2} books.';
var showChallengeMessage = false;

// If the challenge progress box is present, modify it as we prefer.
if(cProgDiv) {
	var cMatch = regE.exec(cProgDiv.innerHTML);
	
	var booksread = cMatch[1];
	var totalbooks = cMatch[2];
	
	var booksperc = Math.floor(100*booksread/totalbooks);
	var yearPerc = Math.floor(getPercentOfYear());
	var perc_diff = booksperc-yearPerc;
	var books_diff = Math.floor(perc_diff*totalbooks/100);	
	
	var scheduleStringChoice = (perc_diff == 0) ? 1 : 0;
	var schedulePrepositionChoice = (perc_diff > 0) ? 0 : 1;
	perc_diff = Math.abs(perc_diff);
	books_diff = Math.abs(books_diff);
	
	newString = formatstr(newString, booksread, booksperc, totalbooks);
	
	if (!scheduleStringChoice) {
		newString += ' ' + formatstr(scheduleString[scheduleStringChoice],
							books_diff, 
							perc_diff,
							schedulePreposition[schedulePrepositionChoice]);
	} else {
		newString += ' ' + scheduleString[scheduleStringChoice];			
	}
		
	cProgDiv.innerHTML = cProgDiv.innerHTML.replace(cMatch[0], newString);	
    
    // Fix the View Challenge Button
    var viewChallengeEl = document.querySelector('a.viewChallenge');
    if(viewChallengeEl) {
        viewChallengeEl.style.marginTop='2px';
        viewChallengeEl.style.fontSize='12px';
        viewChallengeEl.outerHTML = '<div align="right" style="margin-right:12px">'+viewChallengeEl.outerHTML+'</div>';   
    }
    
    // Remove the challenge message
    if(!showChallengeMessage) {
		challengeMessageEl = document.querySelector('h3.challengeShortText');
        if (challengeMessageEl) {
	        challengeMessageEl.parentNode.removeChild(challengeMessageEl);
        }
        // Remove the margins on the outer progress bar.
        progOuterEl = document.querySelector('div.progressBarOuter');
        if(progOuterEl) {
            progOuterEl.style.marginTop='2px';
            progOuterEl.style.marginBottom='2px';
        }
        
        // Fix the padding on the message
        yCMEl = document.querySelector('div.yearChallengeModule');
        if(yCMEl) {
            yCMEl.style.paddingTop='0px';    
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

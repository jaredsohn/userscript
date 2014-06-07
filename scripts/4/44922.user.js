/*
 * Title:
 * 	GM_BRAMUS.facebook.homepage.noquiz
 * 
 * Author:
 * 	Bramus!
 * 
 * Last Updated:
 *  2009-04-11
 * 
 * Version History:
 * 	2009-04-11: added some more forbidden strings and fixed the issue (ever since facebook changed something in their HTML output) where all stuff got deleted.
 * 	2009-03-22: first version
 *
 * Based upon
 * 	facebook.com - quiz stories remover (http://userscripts.org/scripts/show/44319)
 * 	code by David Wahlund (http://userscripts.org/topics/23611)	
 */

// ==UserScript==
// @name           GM_BRAMUS.facebook.homepage.noquiz
// @namespace      http://www.bram.us/
// @description    Removes quiz stories from homepage
// @include        http://*.facebook.com/*
// ==/UserScript==


// the forbidden strings array
var forbiden_strings = new Array();

//default rule to match quizzes
forbiden_strings.push("quiz and the result is");
forbiden_strings.push("Check out this quiz!");
forbiden_strings.push("took the quiz"); 
forbiden_strings.push("completed the quiz");

//here you can add new rules
// ex. forbidden_strings.push("quiz");
forbiden_strings.push("What are yours?");
forbiden_strings.push("quiz");
forbiden_strings.push("Quiz");
forbiden_strings.push("just took the");
forbiden_strings.push("picked their (5)");

//removes matching stories - code by David Wahlund - http://userscripts.org/topics/23611
function remove_stories(){
	
	// get all stories
	var messages = document.getElementsByClassName("UIStoryAttachment_Copy");
	
	// number of stories
	var count = messages.length;
	
	// loop 'm
	for (var i = count - 1; i >= 0; i--){
		
		// current story
		msg = messages[i];
		
		//cycles through all forbiden strings
		for (var j = 0; j < forbiden_strings.length; j++){
			
			//if msg guts matches forbiden given string
			if (msg.textContent.indexOf(forbiden_strings[j]) >= 0){
				
				//finds wrapper for given message
				var msg_parparpar = msg.parentNode.parentNode.parentNode.parentNode;
				
				//removes wrapper mentioned above
				// msg_parparpar.parentNode.removeChild(msg_parparpar);
				msg_parparpar.style.display = 'none';
				
				// next!
				continue;

			}
			
		}
	}
}


// removes matching stories and starts the timer
function no_quiz(){
	remove_stories(); // remove 'm now
	t = setInterval(remove_stories, 1000); // remove future stories (viz. when clicking the more link)
}


//waits till page is loaded
window.addEventListener("load", no_quiz, false);

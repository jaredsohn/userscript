// ==UserScript==
// @name        Wanikani Override
// @namespace   wkoverride
// @description Adds an "Ignore Answer" button during reviews that makes WaniKani ignore the current answer (useful if, for example, you made a stupid typo)
// @include     http://www.wanikani.com/review/session*
// @include     https://www.wanikani.com/review/session*
// @version     1.1.2
// @author      Rui Pinheiro
// @grant       GM_addStyle
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL https://userscripts.org/scripts/source/174048.user.js
// @updateURL   https://userscripts.org/scripts/source/174048.meta.js
// ==/UserScript==

/*
 *  ====  Wanikani  Override  ====
 *    ==   by Rui Pinheiro   ==
 *
 *  One of my biggest peeves with Wanikani is how once you get something wrong,
 *  you can't change it. If you type too fast and make a typo, or if the spell checker
 *  doesn't	like you, you're out of luck. It's really frustrating to know an answer but
 *  have Wanikani deny it to you because it wants the '-ing' form of the verb, but you
 *  typed the infinitive.
 *  Sometimes you get lucky, and the spell checker is lenient enough to mark the answer
 *  correctly. Other times, that's not the case.
 *  Then, there's the other type of mistakes. The ones where you type a reading but were
 *  supposed to type a meaning, or the opposite. Those are really annoying, since most
 *  times you actually knew the correct reading or meaning respectively.
 *
 *
 *  My problem is that the decision was completely out of my hands. My objective is to
 *  learn Kanji, and I'm not going to cheat since that wouldn't bring me closer to where
 *  I want to be, but Wanikani decides that I can't be trusted and does not let me correct it.
 *
 *  But now, with the client-side reviews update, we can finally do something about all this!
 *
 *
 *
 *  This userscript fixes this problem, by adding an "Ignore Answer" button to the footer
 *  during reviews. This button can be clicked anytime an answer has been marked as wrong by
 *  Wanikani.
 *
 *  Once clicked, the current answer will be changed from "incorrect" (red background)
 *  to "ignored" (yellow background), and Wanikani will forget you even answered it.
 *  This way, the item will appear again later on during the review cycle, effectively
 *  giving you a second chance to get it right without stupid typos or the spell checker
 *  getting in the way.
 *
 *
 *  DISCLAIMER:
 *  I am not responsible for any problems caused by this script.
 *  This script was developed on Firefox 25.0.1 with Greasemonkey 1.12.
 *  It was also tested on Chrome 31.0.1650.57 with Tampermonkey 3.5.3630.77.
 *  Because I'm just one person, I can't guarantee the script works anywhere else.
 *
 *  Also, anyone using this script is responsible for using it correctly.
 *  This should be used only if you make an honest mistake but actually knew the correct
 *  answer. Using it in any other way will harm your Kanji learning process,
 *  cheating will only make learning Japanese harder and you'll end up harming only yourselves!
 */
 
/*
 *	This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
/*
 *	=== Changelog ===
 *
 *  1.1.2 (11 March 2014)
 *  - Relicensed under the GPLv3.
 *
 *  1.1.1 (23 January 2014)
 *  - Now supports the HTTPS protocol.
 *
 *  1.1.0 (24 November 2013)
 *  - Previously ignored answers can be unignored by pressing the 'Ignore' button again before skipping to the next question.
 *  - Code cleaned up, added debug functionality and better error logging (like all my other Wanikani scripts)
 *
 *  1.0.5 (7 November 2013)
 *  - Ignores '~' hotkey if pressed while editing an item's notes.
 *
 *  1.0.4 (14 August 2013)
 *  - Fixed the '~' hotkey in Chrome.
 *
 *  1.0.3 (5 August 2013)
 *  - Wanikani update changed the review URL. While the script worked, it also affected the reviews summary page. This has been fixed
 *
 *  1.0.2 (29 July 2013)
 *  - Made '~' a hotkey, as requested by some users of the Wanikani forums.
 *  - Script now updates the question count and error count correctly.
 *
 *  1.0.1 (24 July 2013)
 *  - Fixed a bug that would cause "Null" to appear instead of "Reading" or "Meaning" after ignoring a certain Vocabulary.
 *  - Tested the script on Google Chrome with Tampermonkey (the script does not work natively).
 *
 *  1.0.0 (23 July 2013)
 *  - First release.
 *
 */
 
/*
 * Debug Settings
 */
var debugLogEnabled = false;
var scriptShortName = "WKO";

scriptLog = debugLogEnabled ? function(msg) { if(typeof msg === 'string'){ console.log(scriptShortName + ": " + msg); }else{ console.log(msg); } } : function() {};

/*
 * Other settings
 */
var prefAllowUnignore = true;

/*
 * "Ignore Answer" Button Click
 */
var ActionEnum = Object.freeze({ ignore:0, unignore:1 });
unsafeWindow.WKO_ignoreAnswer = function ()
{	
	try
	{
		/* Check if the current item was answered incorrectly */
		var elmnts = document.getElementsByClassName("incorrect");
		var elmnts2 = document.getElementsByClassName("WKO_ignored");
		
		var curAction;
		if(!isEmpty(elmnts[0])) // Current answer is wrong
			curAction = ActionEnum.ignore;
		else if(prefAllowUnignore && !isEmpty(elmnts2[0])) // Current answer is ignored
			curAction = ActionEnum.unignore;
		else // Either there is no current answer, or it's correct
		{
			alert("WKO: Current item wasn't answered incorrectly, nor ignored previously!");
			return false;
		}
		
		/* Grab information about current question */
		var curItem = $.jStorage.get("currentItem");
		var questionType = $.jStorage.get("questionType");
	  
		/* Build item name */
		var itemName;
		
		if(curItem.rad)
			itemName = "r";
		else if(curItem.kan)
			itemName = "k";
		else
			itemName = "v";
		
		itemName += curItem.id;
		scriptLog(itemName);
		
		/* Grab item from jStorage.
		 * 
		 * item.rc and item.mc => Reading/Meaning Completed (if answered the item correctly)
		 * item.ri and item.mi => Reading/Meaning Invalid (number of mistakes before answering correctly)
		 */
		var item = $.jStorage.get(itemName) || {};
		
		/* Update the item data */
		if(questionType === "meaning")
	  	{
			if(!("mi" in item) || isEmpty(item.mi))
			{
		  		throw Error("item.mi undefined");
		  		return false;
		  	}
		  	else if(item.mi < 0 || (item.mi == 0 && curAction == ActionEnum.ignore))
		  	{
		  		throw Error("item.mi too small");
		  		return false;
		  	}
		  	
		  	if(curAction == ActionEnum.ignore)
		  		item.mi -= 1;
		  	else
		  		item.mi += 1;
		  	
		  	delete item.mc;
		}
		else
		{
			if(!("ri" in item) || isEmpty(item.ri))
			{
		  		throw Error("item.ri undefined");
		  		return false;
		  	}
		  	else if(item.ri < 0 || (item.ri == 0 && curAction == ActionEnum.ignore))
		  	{
		  		throw Error("i.ri too small");
		  		return false;
		  	}
		  	
		  	if(curAction == ActionEnum.ignore)
		  		item.ri -= 1;
		  	else
		  		item.ri += 1;
	
		  	delete item.rc;
		}
		
		/* Save the new state back into jStorage */
		$.jStorage.set(itemName, item);
		
		/* Modify the questions counter and wrong counter and change the style of the answer field */
		var wrongCount = $.jStorage.get("wrongCount");
		var questionCount = $.jStorage.get("questionCount");
		
		if(curAction == ActionEnum.ignore)
		{
			$.jStorage.set("wrongCount", wrongCount-1);
			$.jStorage.set("questionCount", questionCount-1);
			
			$("#answer-form fieldset").removeClass("incorrect");
			$("#answer-form fieldset").addClass("WKO_ignored");
		}
		else
		{
			$.jStorage.set("wrongCount", wrongCount+1);
			$.jStorage.set("questionCount", questionCount+1);
			
			$("#answer-form fieldset").removeClass("WKO_ignored");
			$("#answer-form fieldset").addClass("incorrect");
		}
		
		return true;
	}
	catch(err) { logError(err); }
}

/*
 * Bind '~' as a hotkey 
 */
function bindHotkey()
{
	$(document).on("keydown.reviewScreen", function (event)
	{
		if ($("#reviews").is(":visible") && !$("*:focus").is("textarea, input"))
		{
			//alert('keycode: ' + event.keyCode);
			switch (event.keyCode) {
				case 176: //Firefox '~'
				case 191: //Chrome '~'
					event.stopPropagation();
					event.preventDefault();
					
					if($("#user-response").is(":disabled"))
						unsafeWindow.WKO_ignoreAnswer();
						
					return false;
					break;
			}
		}
	});
}

/*
 * Inject Ignore Button
 */
function addIgnoreAnswerBtn()
{
	var footer = document.getElementsByTagName('footer');
	
	footer[0].innerHTML = "<div id=\"WKO_button\" title=\"Ignore Answer\" onclick=\"WKO_ignoreAnswer();\">Ignore Answer</div>" +
	                      footer[0].innerHTML;
}

/*
 * Prepares the script
 */
function scriptInit()
{
	// Add global CSS styles
	GM_addStyle("#WKO_button {background-color: #CC0000; color: #FFFFFF; cursor: pointer; display: inline-block; font-size: 0.8125em; padding: 10px; vertical-align: bottom;}");
	GM_addStyle("#answer-form fieldset.WKO_ignored input[type=\"text\"]:-moz-placeholder, #answer-form fieldset.WKO_ignored input[type=\"text\"]:-moz-placeholder {color: #FFFFFF; font-family: \"Source Sans Pro\",sans-serif; font-weight: 300; text-shadow: none; transition: color 0.15s linear 0s; } #answer-form fieldset.WKO_ignored button, #answer-form fieldset.WKO_ignored input[type=\"text\"], #answer-form fieldset.WKO_ignored input[type=\"text\"]:disabled { background-color: #FFCC00 !important; }");
	
	scriptLog("loaded");
	
	// Set up hooks
	try
	{
		addIgnoreAnswerBtn();
		bindHotkey();
	}
	catch(err) { logError(err); }
}

/*
 * Helper Functions/Variables
 */
$ = unsafeWindow.$;
 
function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}

/*
 * Error handling
 * Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
 */
function logError(error)
{
	var stackMessage = "";
	if("stack" in error)
		stackMessage = "\n\tStack: " + error.stack;
		
	console.error(scriptShortName + " Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
}

/*
 * Start the script
 */
scriptInit();
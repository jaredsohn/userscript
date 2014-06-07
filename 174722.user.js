// ==UserScript==
// @name        Wanikani Mistake Delay
// @namespace   WKMistakeDelay
// @description Disables 'Enter' for one second after making a mistake.
// @include     http://www.wanikani.com/review/session*
// @include     https://www.wanikani.com/review/session*
// @version     1.0.3
// @author      Rui Pinheiro
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL https://userscripts.org/scripts/source/174722.user.js
// @updateURL   https://userscripts.org/scripts/source/174722.meta.js
// ==/UserScript==

/*
 *  ====  Wanikani Mistake Delay  ====
 *    ==     by Rui Pinheiro      ==
 *
 *  After the new client-side review system was introduced, reviews became blazing fast.
 *
 *  The downside of that speed was that I found myself pressing 'Enter' twice after answering
 *  any question I'm sure is correct, but then finding out it isn't, yet the second 'Enter' press
 *  already took effect and it skips automatically to the following item.
 *
 *  This script takes care of that problem, blocking 'Enter' presses for 1 second if a mistake is
 *  made. This makes 'Enter' spamming work only if the answer was correct, and if not will
 *  "force" you to take notice.
 *
 *
 *  Note that this script does not change the behaviour of the "Next" button.
 *
 *
 *  DISCLAIMER:
 *  I am not responsible for any problems caused by this script.
 *  This script was developed on Firefox 22.0 with Greasemonkey 1.10.
 *  Because I'm just one person, I can't guarantee the script works anywhere else.
 *  Though, it should also work on Chrome with Tampermonkey
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
 *	=== Changelog ===~
 *
 *  1.0.3 (11 March 2014)
 *  - Relicensed under the GPLv3.
 *
 *  1.0.2 (23 January 2014)
 *  - Now supports the HTTPS protocol.
 *
 *  1.0.1 (5 August 2013)
 *  - Wanikani update changed the review URL. While the script worked, it also (invisibly) affected the reviews summary page. This has been fixed
 *
 *  1.0.0 (31 July 2013)
 *  - First release.
 *
 */
 
//------------------
// Helper Functions/Variables
//------
/* Delay before reactivating enter in milliseconds
   (safe to modify according to personal preference) */
unsafeWindow.WKMD_msDelay = 1000;

/* jQuery */
$ = unsafeWindow.$;

/* Incorrect Last Answer Booleans */
unsafeWindow.WKMD_incorrectLastAnswer = false;
unsafeWindow.WKMD_blockDisabledChange = false;

//------------------
// jQuery Hacks
//------
unsafeWindow.jQuery.fn.WKMD_oldJQueryTrigger = unsafeWindow.jQuery.fn.trigger;
unsafeWindow.jQuery.fn.WKMD_oldJQueryProp = unsafeWindow.jQuery.fn.prop;

/* Block triggering of the #answer-form button "click" event */
unsafeWindow.jQuery.fn.trigger = function(name)
{
	//console.log("this: " + this + "; name: " + name);
	if(unsafeWindow.WKMD_incorrectLastAnswer && $("#reviews").is(":visible") && $("#answer-form button").is(this) && name == "click")
	{
		unsafeWindow.WKMD_blockDisabledChange = true;
		return false;
	}
	else
		return this.WKMD_oldJQueryTrigger(name);
}

/* Block changing #user-response entry field "disabled" to false */
unsafeWindow.jQuery.fn.prop = function(name, value)
{
	//console.log("this: %o; name: " + name + "; value: " + value, this);
	if(unsafeWindow.WKMD_blockDisabledChange && $("#reviews").is(":visible") && $("#user-response").is(this) && name == "disabled" && value === false)
	{
		var result = this.WKMD_oldJQueryProp(name, unsafeWindow.WKMD_blockDisabledChange);
		unsafeWindow.WKMD_blockDisabledChange = false;
		return result;
	}
	else
		return this.WKMD_oldJQueryProp(name, value);
}

//------------------
// Detect wrong answers
//------
WKMD_originalAnswerCheckerEvaluate = unsafeWindow.answerChecker.evaluate;

unsafeWindow.answerChecker.evaluate = function (itemType, correctValue)
{
	var result = WKMD_originalAnswerCheckerEvaluate(itemType, correctValue);
	
	if(result.passed == false)
	{
		unsafeWindow.WKMD_incorrectLastAnswer = true;
		setTimeout(function () { unsafeWindow.WKMD_incorrectLastAnswer = false; }, unsafeWindow.WKMD_msDelay);
	}
	
	return result;
}
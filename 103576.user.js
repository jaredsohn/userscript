// ==UserScript==
// @name LORCODE Anti-Hassle Preprocessor
// @namespace http://www.linux.org.ru
// @author proud_anon
// @version 1.0beta
// @description Preprocesses LORCODE on Linux.org.ru marking line breaks, URLs and quotes automatically.
// @exclude http://*linux.org.ru/forum/*/
// @exclude http://*linux.org.ru/news/*/
// @exclude http://*linux.org.ru/gallery/*/
// @exclude http://*linux.org.ru/polls/*/
// @include http://*linux.org.ru/forum/*/*
// @include http://*linux.org.ru/news/*/*
// @include http://*linux.org.ru/gallery/*/*
// @include http://*linux.org.ru/polls/*/*
// @include http://*linux.org.ru/add.jsp*
// @include http://*linux.org.ru/comment-message.jsp*
// @include http://*linux.org.ru/add_comment.jsp*
// ==/UserScript==

/**
This script is distributed under the terms of WTFPL. Exact terms and conditions
follow.

		DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004
 
Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.
 
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 
 0. You just DO WHAT THE FUCK YOU WANT TO.
*/

(function() {	//To be compatible with Opera
var unsafeWindow = unsafeWindow;
if(unsafeWindow == null) unsafeWindow = window;
if(unsafeWindow == null) throw ("Neither window nor unsafeWindow are defined");
var document = unsafeWindow.document;

function getrealobject(element) {
	//For convenience
	if(typeof element == "string") element = document.getElementById(element);
	//Bypass Firefox sandbox
	return (element != null && element.wrappedJSObject) ?
		element.wrappedJSObject : element;
}

/*
 * This regexp matches an i, user, quote, url, list and code tags (opening tag,
 * inner content and closing tag) OR a line that begins with ">" or "username>"
 * (some spaces and tabs allowed).
 *
 * Groups:
 * If it's tag [i], [user] or [url] (otherwise all are undefined):
 * 1 - tag name
 * 2 - tag parameter (undefined if none)
 * 3 - tag inner content (empty string if none)
 * If it's [quote], [list] or [code] (otherwise all are undefined):
 * 4 - tag name
 * 5 - tag parameter (undefined if none)
 * 6 - tag inner content (empty string if none)
 * 7 - tabs and spaces and the newline sequence after the tag (empty string if none)
 * If it's a quote (otherwise all are null):
 * 8 - quote prefix (usually ">" or "username>")
 * 10 - quote content (empty string if none). Does not include the newline sequence if it follows the content.
 */
var TAGS_QUOTES_REGEXP = /\[(?!i=)(?!user=)(i|user|url)(?:=(.+?))?\]([\s\S]*?)\[\/\1\]|\[(quote|list|code)(?:=(.+?))?\]([\s\S]*?)\[\/\4\]((?:[ \t]*?\r\n|\r|\n)?)|^([ \t]{0,5}\w{0,50}>)(?!.*\[(b|u|s|em|strong|user)\](?!.*\[\/\9\]))(?!.*\[url(?:=.+)?\](?!.*\[\/url]))(?!.*\[(?:quote|list|code)\])(?!.*\[i\])(.*?)(?=(?:\[br\])*[ \t]*$)/gm;

/*
 * Finds newline sequences or [br]'s followed by [spaces and tabs and]
 * newline sequences.
 *
 * Groups:
 * 1 - spaces and tabs preceding the newline
 * 2 - newline
 */
var NEWLINES_REGEXP = /(?:\[br\])?([ \t]*)(\r\n|\r|\n)/g;

/*
 * Finds URLs. Copied from LOR sources wuth some alterations
 * to adapt to Javascript.
 * Ignore capturing groups.
 */
var URLS_REGEXP = /(((https?)|(ftp)):\/\/(([0-9\w.-]+\.\w+)|(\d+\.\d+\.\d+\.\d+))(:[0-9]+)?(\/\S*)?)|(mailto:[a-z0-9_+-]+@[0-9a-z.-]+\.[a-z]+)|(news:[a-z0-9.-]+)|(((www)|(ftp))\.(([0-9a-z.-]+\.[a-z]+(:[0-9]+)?(\/[^ ]*)?)|([a-z]+(\/[^ ]*)?)))/g;

function findTagsQuotes(Text, NoQuotes) {
	var bkp = TAGS_QUOTES_REGEXP.lastIndex;
	TAGS_QUOTES_REGEXP.lastIndex = 0;
	var prev = 0;
	var result = "";
	var tmp;
	while((tmp = TAGS_QUOTES_REGEXP.exec(Text)) != null) {
		//Parsing text between the previous match and this one
		var ind = TAGS_QUOTES_REGEXP.lastIndex - tmp[0].length;
		if(prev < ind) result += findURLsBRs(Text.substr(prev, ind - prev));
		prev = TAGS_QUOTES_REGEXP.lastIndex;
		
		//If this is a tag
		if(tmp[1] || tmp[4]) {
			if(tmp[1] == "i") {
				result += "[" + tmp[1];
				if(tmp[2]) result += "=" + tmp[2];
				result += "]" + findTagsQuotes(tmp[3], true) + "[/" + tmp[1] + "]";
			}
			else if(tmp[4] == "quote") {
				result += "[" + tmp[4];
				if(tmp[5]) result += "=" + tmp[5];
				result += "]" + findTagsQuotes(tmp[6], true) + "[/" + tmp[4] + "]" + tmp[7];
			}
			else result += tmp[0];
		}
		
		//If this is a quote
		else if(tmp[8]) {
			if(!NoQuotes) result += "[i]"; 
			result += tmp[8] + findTagsQuotes(tmp[10], true);
			if(!NoQuotes) result += "[/i]";
		}
		
		//Otherwise there is an error somewhere
		else {
			alert("Свершилось невозможное");
			throw("Impossible statement reached");
		}
	}
	if(prev < Text.length) result += findURLsBRs(Text.substr(prev));
	TAGS_QUOTES_REGEXP.lastIndex = bkp;
	return result;
}

function findURLsBRs(Text) {
	return Text.replace(URLS_REGEXP, "[url]$&[/url]").replace(NEWLINES_REGEXP, "[br]$1$2");
}

function preprocessMessage(msgarea) {
	msgarea.value = findTagsQuotes(msgarea.value);
}

function StandardLAHPIntegration() {
	var msgform = getrealobject("commentForm");
	if(msgform == null) msgform = getrealobject("messageForm");
	if(msgform == null) return;
	
	//Looking for the text area
	var msgarea = getrealobject(msgform.getElementsByTagName("textarea")[0]);
	if(msgarea == null) return;
	
	//Looking for the related mode options
	var modesel = getrealobject(msgform.mode), lorcodeoption, rawlorcodeoption;
	if(modesel == null) return;
	for(var i = 0, x = modesel.getElementsByTagName("option"); i < x.length; i++) {
		if(x[i].value == "lorcode") {
			rawlorcodeoption = x[i];	//Without getrealobject, since it works as is
			x[i].innerHTML = "LORCODE без обработки";
			lorcodeoption = document.createElement("option");
			lorcodeoption.value = "lorcode_preprocessing";
			lorcodeoption.innerHTML = "LORCODE с обработкой";
			modesel.appendChild(lorcodeoption);
			if(rawlorcodeoption.selected &&
					document.location.href.indexOf("lahp_disable_preprocessing") == -1)
				lorcodeoption.selected = true;
			break;
		}
	}
	
	function prepareStandardFormForSubmission() {
		if(lorcodeoption.selected) {
			preprocessMessage(msgarea);
			rawlorcodeoption.selected = true;
		}
		else if(rawlorcodeoption.selected) {
			msgform.action += (msgform.action.indexOf("?") == -1 ? "?" : "&");
			msgform.action += "lahp_disable_preprocessing";
		}
	}
	
	var input = document.createElement("input");
	input.type = "button";
	input.addEventListener('click', function() { preprocessMessage(msgarea); }, false);
	input.value = "Обработка LORCODE";
	msgform.appendChild(input);
	
	//Also catch Ctrl+Enter
	msgform.addEventListener('keydown', function(event) {
		//13 = DOM_VK_RETURN, 14 = DOM_VK_ENTER
		if((event.keyCode == 13 || event.keyCode == 14) && event.ctrlKey)
			prepareStandardFormForSubmission();
	}, true);
	
	for(var i = 0, x = msgform.getElementsByTagName("input"); i < x.length; i++) {
		if(x[i].type == "submit") {
			x[i].addEventListener("click", prepareStandardFormForSubmission, true);
		}
	}
}

//Modifying the standard form unless it is forbidden or the form doesn't exist
//It can be forbidden by an external plugin which can add an element with a special ID
if(document.getElementById("lahp_do_not_process_standard_form") == null) StandardLAHPIntegration();

//Adding a special element to integrate with other script
var input = document.createElement("input");
input.type = "button";
input.style.display = "none";
input.addEventListener("click", function() {
		var msgarea = getrealobject(this.value);
		preprocessMessage(msgarea);
}, false);
document.body.appendChild(input);
})();

// ==UserScript==
// @name        Gaming XP Enhancer
// @namespace   freeforumzone.leonardo.it
// @description Enhance Gaming XP forum navigation
// @icon http://img1.freeforumzone.it/upload1/860221_ico.gif
// @include     http://freeforumzone.leonardo.it/newpost.aspx?a=*&c=25037&f=25037*
// @include     http://*.freeforumzone.leonardo.it/newpost.aspx?a=*&c=25037&f=25037*
// @include     http://freeforumzone.leonardo.it/discussione.aspx*
// @include     http://*.freeforumzone.leonardo.it/discussione.aspx*
// @match     http://freeforumzone.leonardo.it/newpost.aspx?a=*&c=25037&f=25037*
// @match     http://*.freeforumzone.leonardo.it/newpost.aspx?a=*&c=25037&f=25037*
// @match     http://freeforumzone.leonardo.it/discussione.aspx*
// @match     http://*.freeforumzone.leonardo.it/discussione.aspx*
// @version     1.0
// @downloadURL http://userscripts.org/scripts/source/137484.user.js
// @updateURL http://userscripts.org/scripts/source/137484.meta.js
// ==/UserScript==

// NOTES:

// constants
var KARMA_BUTTONS_CLASS_NEW_POST_PAGE = "cbutt";
var KARMA_ID_DIV_FAST_POST = "ctl00_CPH1_DivFastPost";

// execution code
if (window.top == window.self) {  //don't run on frames or iframes
	//window.addEventListener ("load", karmaEnhanceFFZ, false);
	karmaEnhanceFFZ();
}

// functions
function karmaEnhanceFFZ() {
	var isGXP = false;
	var isNewPost = false;
	var isThreadPage = false;
	
	var url = window.location.toString();
	
	
	if (url.indexOf("newpost.aspx") >= 0) {
		isGXP = true;
		isNewPost = true;
	} else if (url.indexOf("discussione.aspx") >= 0 && karmaStringEndsWith(document.title, "- Gaming XP")) {
		isGXP = true;
		isThreadPage = true;
	}

	if (isGXP) {
		var karmaScript = document.createElement('script'); 
		karmaScript.type = "text/javascript"; 
		karmaScript.src = "http://im2.freeforumzone.it/up/29/45/1120947455.txt";
		document.getElementsByTagName('head')[0].appendChild(karmaScript);
		if (isNewPost) {
			karmaInjectNewButtonsOnPostPage();
		} else if (isThreadPage) {
			karmaInjectIconsInFastPost();
		}
	}
}

function karmaInjectNewButtonsOnPostPage() {
	// getting code button
	var codeButton = karmaGetCodeButtonOnNewPostPage();
	
	if (codeButton != null) {
		// getting td element containing code button
		var tdCodeButton = codeButton.parentNode;
		
		// creating spoiler button
		var tdSpoilerButton = document.createElement("td");
		tdSpoilerButton.innerHTML = "<input type=\"button\" value=\"Spoiler\" onclick=\"Javascript:InsTag(\'SPOILER\')\" class=\"cbutt\">";
		
		// creating list button 
		var tdListButton = document.createElement("td");
		tdListButton.innerHTML = "<input type=\"button\" value=\"List\" onclick=\"Javascript:InsTag(\'LIST\')\" class=\"cbutt\">";

		// creating list option button 
		var tdListOptionButton = document.createElement("td");
		tdListOptionButton.innerHTML = "<input type=\"button\" value=\"*\" onclick=\"Javascript:karmaInsListOption()\" class=\"cbutt\" alt=\"List Option\" title=\"List Option\">";
		
		// injecting new buttons
		var nextTdButton = tdCodeButton.nextSibling;
		nextTdButton.parentNode.insertBefore(tdSpoilerButton, nextTdButton);
		nextTdButton.parentNode.insertBefore(tdListButton, nextTdButton);
		nextTdButton.parentNode.insertBefore(tdListOptionButton, nextTdButton);
		
	} else {
		// unable to find 'Code' button: nothing will be done
	}
}

function karmaGetCodeButtonOnNewPostPage() {
	// find this element:
	// <input type="button" value="Code" onclick="Javascript:InsTag('TESTO')" class="cbutt">
	
	var result = null;
	var buttons = document.getElementsByClassName(KARMA_BUTTONS_CLASS_NEW_POST_PAGE);
	
	if (buttons != null) {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].value == "Code") {
				result = buttons[i];
			}
		}
	}
	
	return result;
}

function karmaInjectIconsInFastPost() {
	var fastPostDiv = document.getElementById(KARMA_ID_DIV_FAST_POST);
	if (fastPostDiv) {
		var trs = fastPostDiv.getElementsByTagName("tr");
		if (trs && trs.length > 0) {
			var lastTr = trs[length - 1];
			var trIcons = document.createElement("tr");
			trIcons.innerHTML = "<td class=\"ctdforum ctdins_title\" style=\"white-space: nowrap\">" +
                    "<span class=\"cfont2\">Icone</span>" +
                "</td>" +
                "<td align=\"left\" class=\"ctdforum ctdins_content ctdins_content_alt\" style=\"width: 100%\">" +
                    "<div id=\"karmaShowIconsButtonOnFastReply\" style=\"\">" +
						"<input type=\"button\" value=\"Mostra Icone\" onclick=\"javascript:karmaShowIconsOnFastReply();\"/>" + 
					"</div> " +
                    "<div id=\"karmaIconsOnFastReply\" style=\"display: none;\">" +
					"</div> " +
                "</td>";
			lastTr.parentNode.insertBefore(trIcons, lastTr);	

		} else {
			// table rows of fast reply not found: nothing will be done
		}
	} else {
		// div fast replay not found: nothing will be done
	}
}

function karmaStringEndsWith(str, suffix) {
	
	var result = false;
	if (str != null) {
		str = str.toString();
		if (str.length >= suffix.length) {
			var substr = str.substring(str.length - suffix.length);
			result = (substr === suffix);
		} 
	}
    return result;
}



/***** GLOBAL NEW AND OVERRIDEN FUNCTIONS AND VARIABLES ******/
/* FOR DEBUG */
/*

var karmaScript = document.createElement('script'); 
karmaScript.type = "text/javascript"; 
karmaScript.innerHTML = (<><![CDATA[
// INSERT CODE HERE
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(karmaScript);
*/
// Copyleft (c)2007, The GreaseMonkey Scripter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To run this script, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools > Greasemonkey > Manage User Scripts, then
// select "CommentCollapser", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           CommentCollapser
// @namespace      http://gmscripter.blogspot.com/
// @description    On Worpress-based blogs, collapse comments and add comment nav. links)
// @include        *
// ==/UserScript==


// To Do?:
// Separate script to link-ify "@82" and "# 82" notation.  
// Don't collapse unless over X number of comments?
// + a: or class? :hover {cursor:pointer;}  http://wiki.greasespot.net/GM_addStyle
//		impact performance?
// + smaller fonts for: "(next by same)" and "[+]" (but not too small mistakenly click on URL'ed username.
// + "Working..." red, floated progress notification on top left
//		OR improve performance
// ? 1-line excerpt of each post +postSize (textNode.nodeValue.length?)
// + "blink" (next by same)
//		impact performance?

// "globals"  TODO-atTo"window"
var comObj = {}; // "associative array" of Comments

// Add Comment to comObj datastructure
function comAdd(keyValList) {  // assoc "array", really an obj.
	var key = keyValList[0];
	var val = keyValList[1];
	if (typeof comObj[key] === "undefined") {
		comObj[key] = [val];
	} else { 
		comObj[key].push(val);
	}
}

// subFunction expand/collapse
function liToggle(liNode, turnOn) {
	var divList = liNode.getElementsByTagName("div");
	var spanList = liNode.getElementsByTagName("span");

	var posState = "absolute";
	var visState = "collapse";
	// non-GM: spanList[classCommMeta].setAttribute("style", attributeSetting);
	if (turnOn === true) {
		posState = "relative";
		visState = "visible";
	}
	spanList[1].style.visibility = visState;
	spanList[1].style.position = posState;
	divList[1].style.visibility = visState;
	divList[1].style.position = posState;
}	

// Utility func: Expand/collapse individual comment
function indivTog(plusMinusEl, override) {
	var dateNode;
	var entryN = plusMinusEl.parentNode.nextSibling.nextSibling;
	var posState = "absolute";
	var visState = "collapse";
	var iconState = "[+]";
	if ((plusMinusEl.firstChild.nodeValue == "[+]") || (override === true)) { // to expand state
		posState = "relative";
		visState = "visible";
		iconState = "[-]";
	} 

	if (plusMinusEl.nextSibling.nodeName == "BR") {
		dateNode = plusMinusEl.nextSibling.nextSibling.nextSibling;
	} else { // move beyond " (next by same)":
		dateNode = plusMinusEl.nextSibling.nextSibling.nextSibling.nextSibling; 
	}
	plusMinusEl.firstChild.nodeValue = iconState;
	dateNode.style.position = posState; // <span ..date/time >
	dateNode.style.visibility = visState;
	entryN.style.position = posState;  // <div class="entry">
	entryN.style.visibility = visState;
}

// Expand next post when click on "(next by same)" 
function expNxt() {
//	this.href = http://... .html#comment-1139
	var navId = this.href.split("#")[1];
	var plusMinusElId = "c" + navId.split("-")[1];
	indivTog( document.getElementById(plusMinusElId), true);
}

// eXPAND/cOLLAPSE [+]/[-] an individual comment
function ec() {
	// "this" here is target of event, like "event.currentTarget"
	indivTog(this, false);
}

// Return [key, value] = [authorText, commentId/Num] to load intocomObj
//  (also, add "[+]" and "(next by same)" to DOM)  
function getKeyValPair(liNode) {
	var commentNum = liNode.id.split("-")[1];
	var authorSpan = liNode.getElementsByTagName("span")[0];
	var authorNode = authorSpan.firstChild;
	var authorText = authorNode.nodeValue;
	var nxtPost, lastPushed, nxtTxt, divP, brP, periodIdx; 
	// chop off # from author name (e.g. "12. John Doe")
	if (authorNode.nodeValue.indexOf(".") !== "undefined" &&
	    authorNode.nodeValue.indexOf(".") < 5) { // Period is probably part of # if in first 4 slots
		periodIdx = authorNode.nodeValue.indexOf(".");
		authorText = authorText.slice(periodIdx +1);
	}
	if (authorText.length > 1) { // no link in username
		authorText = authorText.substr(1); // strips leading whitspace, TODO BUG - if "." in Username
	} else if (authorText.length == 1) {
				authorText = authorSpan.getElementsByTagName("a")[0].firstChild.nodeValue;
				}
	else {
		alert("getKeyValPair: authorText Error");
	}
	
	// add (next by same)
	var isNextUser = false;
	if (typeof comObj[authorText] !== "undefined") {
		isNextUser = true;
		nxtPost = document.createElement("a");
		lastPushed = comObj[authorText].length - 1;
		nxtPost.setAttribute("href", "#comment-" + comObj[authorText][lastPushed]);
		nxtTxt = document.createTextNode(" (next by same)");
		nxtPost.appendChild(nxtTxt);
		nxtPost.addEventListener("click", expNxt, true);
		// put between div's childeren <span ..> and <br>
		divP = authorSpan.parentNode;
		brP = authorSpan.nextSibling;
		divP.insertBefore(nxtPost, brP);
	}

	// add "[+]" to DOM:
	// Finished product = <a id="c42011" style="color:blue;" onclick="ec(this.id);">[-]</a>
	var indivToggle = document.createElement("a");
	indivToggle.setAttribute("id", "c" + commentNum);
	indivToggle.setAttribute("style", "color:blue;");
	var tn = document.createTextNode("[+]");
	indivToggle.appendChild(tn);
	// failed?-non GM:  indivToggle.onclick = "javascript:ec(this.id);";
	// non-GM: indivToggle.setAttribute("onclick", "window.ec(this.id);");
	// GM-required (only way to do it):
	indivToggle.addEventListener("click", ec, true);
	// put between div's childeren <span ..> and (<br> or "<a next-by-user>")
	var div = authorSpan.parentNode;
	var nextEl = authorSpan.nextSibling;
	div.insertBefore(indivToggle, nextEl);

	return [authorText, commentNum];		
}
	
// Walk/collapse li's (building comObj), then output list
function initializeCollapse() {
	var cBlock = document.getElementById("comments");
	var ulList = cBlock.getElementsByTagName("ul");
	var liList = ulList[0].getElementsByTagName("li");
	var firstOnlyF = true;
	var keyValPair = [];

	// build comObj datastructure by walking li's backwards
	for (var i = liList.length - 2; i > -1; --i) {  // "- 2" skips "Leave a Reply" section
//DEBUG			if (firstOnlyF == true) {
			comAdd( getKeyValPair(liList[i]) );
			liToggle(liList[i], false);
			firstOnlyF = false;
//DEBUG		}
	}
}

// "main()"
// Wordpress Recognition
var metas = document.getElementsByTagName("meta");
var canRun = false;
for (var i in metas) {
	if (typeof metas[i].content !== "undefined") {
		if (metas[i].content.substr(0,9) == "WordPress") {
			canRun = true;
		}
	}
}
if (canRun === true) {
	GM_log("WordPress meta tag recognized, running CommentCollapser...");
	initializeCollapse();
}

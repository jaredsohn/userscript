// ==UserScript==
// @name            SN Total Commenter Death
// @namespace       andrew.james.barr@gmail.com,2007-10-28:sn#v2
// @description     Full killfile functionality for Sadly,No! comments.
// @include         http://www.sadlyno.com/archives/*
// ==/UserScript==

var KF_DELIMITER = "@@";
var KILLFILE = "SNKill"
//A convenience function to remove whitespace on either side of a string.
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*
This function blanks out all comments by people on your kill list
and puts the (un)kill link in the sig line of each comment.

Loosely based on pharyngulakillfile.user.js
by  stan [dot] dyck (at) gmail {dot} com.
*/
function adjust() {
	var curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
	var comments = document.evaluate(
		"//p[@class='commentauthor']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(var j=0; j<comments.snapshotLength; j++) {
		var header = comments.snapshotItem(j);
		var userID = getUserID(header);
		var killMe = false;
		for(var k=0; k<curKF.length; k++) {
			if(curKF[k] == userID) {
				killMe = true;
				break;
			}
		}
  	modHeader(header, userID, killMe);
	}
}

/* This function adds the (un)kill link to the specified header node. If kill is true, it will be a kill link. */
function modHeader(header, user, kill) {
	var fchillin = header.childNodes;
  var liEl = header.parentNode;
  var paras = liEl.getElementsByTagName("p");
	var killLink = document.createElement("a");
  var links, txt;
  if(kill) {
    para = document.createElement("p");
    for(var j=2; j<paras.length; j++)
      paras[j].parentNode.style.display = "none";
    txt = "unkill";
  } else {
    for(var j=2; j<paras.length; j++)
      paras[j].style.display = "";
    txt = "kill";
  }
	killLink.setAttribute("href", txt + "('" + user + "')");
	killLink.appendChild(document.createTextNode(" ("+txt+")"));
  links = paras[1].getElementsByTagName("a");
  if(links.length > 1) paras[1].removeChild(links[1]);
	paras[1].appendChild(killLink);
}

//extracts the user id from the specified header node.
function getUserID(header) {
	var idMatcher = /\s*(<a [^<]+>)?([^<\|]+)(<\/a>)?\s*said/i;
	var imatch = idMatcher.exec(header.innerHTML);
	if(imatch != null) {
		return imatch[2].trim();
	} else {
		return "";
	}
}

/*
Adds the specified name to the kill file.
*/
function addToKillFile(name) {
	var curKF;
	if(GM_getValue(KILLFILE, "") == "") {
		curKF = new Array();
	} else {
		curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
	}
	for(var i=0; i<curKF.length; i++) {
		if(name == curKF[i]) return;
	}
	curKF.push(name);
	GM_setValue(KILLFILE, curKF.join(KF_DELIMITER));
}

/*
Removes the specified name from the kill file.
*/
function removeFromKillFile(name) {
	var curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
	var newKF = new Array();
	for(var i=0; i<curKF.length; i++) {
		if(curKF[i] != name)
			newKF.push(curKF[i]);
	}
	GM_setValue(KILLFILE, newKF.join(KF_DELIMITER));
}

//trap all click events and run them through this anonymous function.
document.addEventListener('click', function(event) {
	var clickTarget = unescape(event.target);
	var lMatcher = /.*\/(un)?kill\('(.*)'\)$/;  //finds the (un)kill link
	var imatch = lMatcher.exec(clickTarget);
	if(imatch != null) { //user clicked a (un)kill link.
		if(imatch[1] == null) {
			if(confirm("Add " + imatch[2] + " to your kill file?")) {
				addToKillFile(imatch[2]);
				adjust();
			}
		} else {
			if(confirm("Remove " + imatch[2] +
			" from your kill file?")) {
				removeFromKillFile(imatch[2]);
				adjust();
			}
		}
		//prevent further processing of the click event.
		event.stopPropagation();
		event.preventDefault();
	}
}, true);

window.onload = adjust();

//snkillfile.user.js


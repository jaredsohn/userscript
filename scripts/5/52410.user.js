// ==UserScript==
// @name           Show GC-Votes
// @namespace   tag:sockenpuppe123
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// @description  retrieves and displays votes by username in cache listings on geocaching.com (for *open* GC-Vote accounts only)
// ==/UserScript==
/*
 * Changelog
 *
 * 2009-07-12 version 0.3:
 * - due to server restrains, manual requests for each username
 *                
 */

var version="1.5g";
var GETVOTES="http://dosensuche.de/GCVote/getVotes.php";

function log(str) {
  if(true) { GM_log(str); }
}

// get cache id

var CacheID = "";
var ref = document.getElementById("Header1_urlLogin").href
var regexp = /%3fguid%3d([^%]*)/;
regexp.exec(ref);
CacheID = RegExp.$1;
if (CacheID == "") {
  ref = document.getElementById("lnkPrintFriendly5Logs").href
	regexp = /\?guid=([^&]*)/;
	regexp.exec(ref);
	CacheID = RegExp.$1;
}
log("found cache id:" + CacheID);

// add buttons

var button;
var objs = document.getElementsByTagName("a");
for(var i = 0; i < objs.length; i++) {
  if (objs[i].href.search(/\/profile\/\?guid=/) >= 0) {
    if (typeof objs[i].style == "undefined"
         ||      objs[i].style.length == 0 ) continue;
    log("found username:" +  objs[i].firstChild.nodeValue);
    button = document.createElement("input");
  	button.type = "button";
		button.name = "none";
		button.value = "Get GC-Vote";
		button.style.fontSize = "80%";
		if (CacheID.length == 0) {
			button.title = "Could not retrieve cache waypoint.\nPlease contact author on www.userscripts.org";
		} else {
		  button.title = "Click to retrieve vote by user '" + objs[i].firstChild.nodeValue + "'";
			button.addEventListener("click", (function(buttonnode, username, node) { 
		        return function() {  buttonnode.disabled = true; 
																			  getVote(buttonnode, username, node);
																		 }
         })(button, objs[i].firstChild.nodeValue, objs[i].parentNode), false);
	  }
		objs[i].parentNode.appendChild(button);
		if (CacheID.length == 0) break;
  }
}

// button on click handler

function getVote(buttonnode, username, node) {
  log("request started for username: " + username);
  // version=1.5g&userName=Radelhans&cacheIds=4e68a04e-161c-4351-9813-bec6f6a4ca8a&password=
  GM_xmlhttpRequest({
	  method: 'POST',
	  headers: {'Content-type':'application/x-www-form-urlencoded'},
	  data: "version=" + version + "&userName=" + username + "&cacheIds=" + CacheID + "&password=",
	  url: GETVOTES,
  	onload: function(responseDetails) {
  		getVoteResponse(buttonnode, username, node, responseDetails.responseText);
  	},
	  onerror: function(responseDetails) {
		  alert("Unable to get votes for '" + username + "' from server! Errorcode " + responseDetails.status);
	  }
	});
}

function getVoteResponse(buttonnode, username, node, xmlString) {
  log("response received for username: " + username + " xml:" + xmlString);

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml");
	if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
	  alert("GC-Vote server error message:\n--------------\n" + xmlString + "\n--------------\nPlease try again later or with different IP address.");
		buttonnode.disabled = false;
		return;
	}
	buttonnode.parentNode.removeChild(buttonnode);
  var rootNodes = xmlDoc.getElementsByTagName("votes");
  if (rootNodes.length > 0) {
    var rootNode = rootNodes[0];
    var locked = (rootNode.getAttribute("securityState") == "locked") ? true : false;
  }  
  var votes = xmlDoc.getElementsByTagName("vote");
  var voteUser = votes[0].getAttribute("voteUser");
  log("user: " + username + " vote:" + voteUser + " locked:" + locked);
  if (locked) {
    node.style.backgroundImage="url(http://dosensuche.de/GCVote/padlock.gif)";
  } else if (voteUser <= 0) {
    node.appendChild(document.createTextNode("(" + voteUser + ")"));
  } else {
    var img = document.createElement("img");
    img.src = "http://www.geocaching.com/images/stars/stars" + Math.floor(voteUser) + ".gif";
    node.appendChild(img);
  }
}

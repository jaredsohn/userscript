// ==UserScript==
// @name           VNDB: Release Patrolling
// @namespace      vndb
// @description    Allows to mark specific entries in the release browser
// @include        http://vndb.org/r*
// @include        http://vndb.org/v*
// @date           2009-08-30
// @version        1.2
// @GM_version     0.6.8
// ==/UserScript==


//
// Based on http://userscripts.org/scripts/show/9275
// Google - Block unwanted results
//
// Uses http://code.google.com/p/getelementsbyclassname/  (http://www.opensource.org/licenses/mit-license.php)


/* ----- Script boot ------------------------------------------------ */

window.addEventListener("load", bootScript, false);

// Start running
function bootScript() {
  if (new RegExp('/(v|r).*[^0-9]').test(window.location.pathname))
    return;

  if (new RegExp('/r[0-9]+$').test(window.location.pathname)) {
    window.statusChangeHandler = installTab;
  }
  else {
    window.statusChangeHandler = filterResults;
  }
  
  window.statusChangeHandler(window.location.pathname);
}

/* ----- Constants -------------------------------------------------- */

const VNDBS_BACKGROUND_ONCOLOR = "#ADFF2F";  // patrolled
//const VNDBS_BACKGROUND_ONCOLOR = "transparent";
//const VNDBS_BACKGROUND_OFFCOLOR = "#A5CAF5";
const VNDBS_BACKGROUND_OFFCOLOR = "transparent";

const VNDBS_TARGET_HREF_XPATH = "//tbody/tr/td[starts-with(@class,'tc4')]/a";

// I don't know since when, it's impossible to use chrome URI's here.
const VNDBS_URL_CHECKED_ON = "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Yes_check.svg/15px-Yes_check.svg.png";
const VNDBS_URL_CHECKED_OFF = "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/15px-X_mark.svg.png";


/* ----- Main functions --------------------------------------------- */

// Filter the results, highlighting marked & unmarked entries
function filterResults() {
  
  // Get the list of bookmarked ids as a RegExp object
  reBookmarked = getBookmarkedAsRegexp();
  
  // XPath to get all the target anchors
  var xpAnchor = VNDBS_TARGET_HREF_XPATH;
  var nlAnchors = $x(xpAnchor);
  
  // Iterate through the results, acting on matching ids, and adding
  // a link to bookmark each result
  for (var i = 0; i < nlAnchors.length; i++) {
    
    var orgNode = nlAnchors[i].parentNode.parentNode;
    var nodeDiv = nlAnchors[i].parentNode;

    var strHref = nlAnchors[i].toString();
    
    // This array will be null if no matching id was found and will
    // contain the id-rule if a match is found
    var arrBookmarkedAs = (reBookmarked) ? reBookmarked.exec(strHref) : null;

    if (arrBookmarkedAs && arrBookmarkedAs.length > 1) {
      addBookmarkLink(nodeDiv, arrBookmarkedAs[1], true);
      orgNode.style.backgroundColor = VNDBS_BACKGROUND_ONCOLOR;
    } else {
      addBookmarkLink(nodeDiv, strHref, false);
      orgNode.style.backgroundColor = VNDBS_BACKGROUND_OFFCOLOR;
    }
    
  }
  
}


// Add a link to activate the result filtering
function addBookmarkLink(node, href, bookmarked) {
  
  // Find the node to which we will append the control link
  var nodeCorrectPlace = node;

  // Check for existing control link, if exists, remove - otherwise, add
  // a text hyphen
  var nodeControl = nodeCorrectPlace.firstChild;
  if (nodeControl && nodeControl.nodeName == "SPAN" && nodeControl.hasAttribute("href")) {
    removeNode(nodeControl);
  } else {
//    var nodeTextHyphen = document.createTextNode(" - ");
//    nodeCorrectPlace.insertBefore(nodeTextHyphen, nodeCorrectPlace.firstChild);
  }
  
  
  nodeControl = document.createElement("span");
  nodeControl.className = "VNDBS_link_" + ((bookmarked) ? "on" : "off");
  nodeControl.setAttribute("href", href);
  nodeControl.setAttribute("title", ((bookmarked) ? "Unmark" : "Mark") + " release: " + href);
  nodeControl.textContent = "";
  nodeControl.addEventListener("click", (bookmarked) ? unbookmarkResultHref : bookmarkResultHref, false);
  
  nodeCorrectPlace.insertBefore(nodeControl, nodeCorrectPlace.firstChild);
  
}


// Create a tab handler, if applicable
function installTab(rid) {
  var testNodes = getElementsByClassName('maintabs', 'ul', document.body);
  if (testNodes.length == 0)
    return;
  var tabsContainerNode = testNodes[0];

  // Get the list of bookmarked ids as a RegExp object
  reBookmarked = getBookmarkedAsRegexp();
    
  // This array will be null if no matching id was found and will
  // contain the id-rule if a match is found
  var arrBookmarkedAs = (reBookmarked) ? reBookmarked.exec(rid) : null;
  
  var newTabNode;

  var li = getElementsByClassName("VNDBS_tab_state", "li", tabsContainerNode);
  if (li.length > 0) {
    newTabNode = li = li[0];
  }
  else {
    li = document.createElement("li");
    li.className = "VNDBS_tab_state";
    li.innerHTML = "<a><b id='VNDBS_tab_ui_text'>...</b></a>";
    newTabNode = tabsContainerNode.insertBefore(li, tabsContainerNode.firstChild);
  }

  var nodeContent = newTabNode.firstChild;
  var nodeDiv = document.getElementById("VNDBS_tab_ui_text");

  if (arrBookmarkedAs && arrBookmarkedAs.length > 1) {
    addBookmarkLink(nodeContent, arrBookmarkedAs[1], true);
    nodeContent.style.backgroundColor = VNDBS_BACKGROUND_ONCOLOR;
    nodeDiv.textContent = "patrolled";
  } else {
    addBookmarkLink(nodeContent, rid, false);
    nodeContent.style.backgroundColor = VNDBS_BACKGROUND_OFFCOLOR;
    nodeDiv.textContent = "unpatrolled";
  }

}





/* ----- Event-called function -------------------------------------- */


// Add an id to the list (called by link under a result)
function bookmarkResultHref(e) {
  
  var reHrefIdMatcher = /r([0-9]+)/
  var arrHrefIdMatches = reHrefIdMatcher.exec(this.getAttribute("href"));

  // Sanity check
  if (arrHrefIdMatches && arrHrefIdMatches.length == 2) {
    var idTopic = parseInt(arrHrefIdMatches[1], 10);
    addToBookmarkList(idTopic.toString());
  } else {
    GM_log("Error! Cannot find release id, URL is malformed (or this script is broken)");
  }
  
}


// Remove a domain from the list (called by link under a result)
function unbookmarkResultHref(e) {
  
  removeFromBookmarkList(this.getAttribute("href"));
  
}



/* ----- GUI functions ---------------------------------------------- */



// Display a tiny message in the corner, and disappears it after a while
function displayMessage(str, type) {
  
  // Take existing message node, or create a new one if not exist
  var nodeMessage = document.getElementById("VNDBS_nodeMessage");
  if (nodeMessage) {
    
    // Clear existing timeout if exist
    if (window.VNDBS_toFade) {
      window.clearTimeout(window.VNDBS_toFade);
    }
    
  } else {
    
    // Create the message node, set it's id
    nodeMessage = document.createElement("div");
    nodeMessage.setAttribute("id", "VNDBS_nodeMessage");
    
    // Append message node to body
    document.body.appendChild(nodeMessage);
    
  }
  
  // Set the base opacity for the message node
  nodeMessage.style.opacity = 1;
  
  // Set the message class by type, and text by str
  nodeMessage.className = "VNDBS_message" + type;
  nodeMessage.textContent = str;
  
  // Begin fadeout of message, save timeout ID to window
  var toFade = window.setTimeout(fadeMessage, 3500);
  window.VNDBS_toFade = toFade;
  
}


// Fade out the message in the corner, destroying it when it reaches 0 opacity
function fadeMessage() {
  
  var nodeMessage = document.getElementById("VNDBS_nodeMessage");
  
  // Only work if there is such a node
  if (nodeMessage) {
    
    // Calculate new opacity
    var nOpacity = nodeMessage.style.opacity - 0.05;
    
    if (nOpacity > 0) {
      
      // Set new opacity
      nodeMessage.style.opacity = nOpacity;
      
      // Set timeout to continue fading
      var toFade = window.setTimeout(fadeMessage, 60);
      window.VNDBS_toFade = toFade;
      
    } else {
      
      // Remove message node
      removeNode(nodeMessage);
      
    }
    
  }
  
}





/* ----- Backend (GM_get/setValue) functions ------------------------ */


// Load the listed ids into a regexp object
function getBookmarkedAsRegexp() {
  
  var strBookmarkList = GM_getValue("VNDBS_bookmarklist", undefined);
  if (strBookmarkList) {
    return new RegExp("/r(" + strBookmarkList + ")$");
  } else {
    return false;
  }
  
}


// Load the listed ids into an array
function getBookmarkedAsArray() {
  
  var strBookmarkList = GM_getValue("VNDBS_bookmarklist", undefined);
  if (strBookmarkList) {
    return strBookmarkList.split(/\|/).sort();
  } else {
    return new Array();
  }
  
}


// Add an id to the list, while checking for redundancies
function addToBookmarkList(str) {
  
  // Get a list of all bookmarked domains
  var arrBookmarkedIds = getBookmarkedAsArray();
  
  for (var i = 0; i < arrBookmarkedIds.length; i++) {
    
    var strBookmarkedId = arrBookmarkedIds[i];
    
    var reIsAlreadyListed = new RegExp("^" + strBookmarkedId + "$");
    
    if (reIsAlreadyListed.test(str)) {
      displayMessage("Already bookmarked as " + strBookmarkedId + "!", "Error");
      window.statusChangeHandler(window.location.pathname);
      return false;
    }

  }

  arrBookmarkedIds.push(str);
  
  // Finally, save list
  GM_setValue("VNDBS_bookmarklist", arrBookmarkedIds.sort().join('|'));
  displayMessage("Bookmarking: " + str, "On");
  GM_log(GM_getValue('VNDBS_bookmarklist', undefined));
  
  // Re-filter the results
  window.statusChangeHandler(window.location.pathname);

  
}


// Remove an id from the list
function removeFromBookmarkList(str) {
  
  // Get a list of all listed ids as an array
  var arrBookmarkedIds = getBookmarkedAsArray();
  
  // Dynamic RegExp object, find the domain
  var reFindDomain = new RegExp("^" + str + "$");
  
  // Inner function for the next array.filter action
  function filterBookmarklist(element, index, array) {
    return !reFindDomain.test(element);
  }
  
  var arrNewBookmarklist = arrBookmarkedIds.filter(filterBookmarklist);
  GM_setValue("VNDBS_bookmarklist", arrNewBookmarklist.join('|'));
  displayMessage("Unbookmarking: " + str, "Off");
  
  // Re-filter the results
  window.statusChangeHandler(window.location.pathname);
  
}


/* ----- Helper function -------------------------------------------- */


// XPath helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}


// Remove DOM node
function removeNode(element) {
  element.parentNode.removeChild(element);
}


/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

/* ----- Stylish! --------------------------------------------------- */


// Main page
GM_addStyle("span#VNDBS_controlPanelLink {color: #0000CC; cursor: pointer; font-size: small; text-decoration: underline;}");
GM_addStyle("span.VNDBS_link_on        {color: #77c; cursor: pointer; text-decoration: underline; padding-left: 24px; background: url(" + VNDBS_URL_CHECKED_ON + ") no-repeat;}");
GM_addStyle("span.VNDBS_link_off       {color: #77c; cursor: pointer; text-decoration: underline; padding-left: 24px; background: url(" + VNDBS_URL_CHECKED_OFF + ") no-repeat; filter:alpha(opacity=75); -moz-opacity:.75; opacity:.75;}");
GM_addStyle("span.VNDBS_link_off:hover {color: #77c; cursor: pointer; text-decoration: underline; padding-left: 24px; background: url(" + VNDBS_URL_CHECKED_OFF + ") no-repeat; filter:alpha(opacity=100); -moz-opacity:1.00; opacity:1.00; outline: 1px solid #F00;}");

// Messages
GM_addStyle("div#VNDBS_nodeMessage {border-width: 2px; border-style: solid; cursor: default; font-weight: bold; padding: 0.2em 2em; position: fixed; top: 0; right: 0;}");
GM_addStyle("div.VNDBS_messageOn {background-color: #e5ecf9; border-color: #36c; color: black;}");
GM_addStyle("div.VNDBS_messageOff {background-color: #74ad74; border-color: green; color: white;}");
GM_addStyle("div.VNDBS_messageError {background-color: #ffabab; border-color: red; color: black;}");

// Overrides
GM_addStyle(".alt1, .alt1Active { background: none !important; }");

/* ----- So Say We All ---------------------------------------------- */



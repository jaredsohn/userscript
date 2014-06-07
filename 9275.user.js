// ==UserScript==
// @name           Google - Block unwanted results
// @namespace      grease1 DOT daniboy AT antichef DOT com
// @description    Remove unwanted results from google, filtered by your own customizable blacklist
// @include        http://www.google.tld/search?*
// @date           2007-05-16
// @version        0.1
// @GM_version     0.6.8
// ==/UserScript==

/* ----- Script boot ------------------------------------------------ */

window.addEventListener("load", bootScript, false);

// Start running
function bootScript() {
  
  addControlLink();
  filterResults();
  
}

/* ----- Constants -------------------------------------------------- */


// Blocking methods
const BLOCKING_METHOD_HIDE = 0x00;
const BLOCKING_METHOD_FADE = 0x01;





/* ----- Main functions --------------------------------------------- */

// Add a link to open this script's control panel
function addControlLink() {
  
  // XPath to get the <font> node that the link will be appended before
  var xpFont = "//table[@class='t bt']//td[last()]/font[@size='-1']";
  var nodeFont = $x(xpFont)[0];
  
  // Create the link and add a click event to it
  var nodeControl = document.createElement("span");
  nodeControl.setAttribute("id", "GBUR_controlPanelLink");
  nodeControl.textContent = "Blocking options";
  nodeControl.addEventListener("click", openControlPanel, false);
  
  // Create a hyphen space ;)
  var nodeHyphen = document.createElement("span");
  nodeHyphen.textContent = " - ";
  nodeHyphen.style.fontSize = "small";
  
  // Attach CP link and hyphen before said font node
  nodeFont.parentNode.insertBefore(nodeControl, nodeFont);
  nodeFont.parentNode.insertBefore(nodeHyphen, nodeControl.nextSibling);
  
}


// Filter the results, removing the unwanted and showing the wanted
function filterResults() {
  
  // Get the list of blocked domains as a RegExp object
  reBlocked = getBlacklistedAsRegexp();
  
  // XPath to get all the result's anchors
  var xpAnchor = "//div[@class='g']/h2[@class='r']/a";
  var nlAnchors = $x(xpAnchor);
  
  // Get the blocking method
  var nBlockingMethod = getBlockingMethod();
  
  // Iterate through the results, acting on blocked results, and adding
  // a link to block each result
  for (var i = 0; i < nlAnchors.length; i++) {
    
    // Find the main <div> that contains the result
    var nodeDiv = nlAnchors[i].parentNode.parentNode;
    var strHref = nlAnchors[i].toString();
    
    // This array will be null if domain should not be blocked, and will
    // contain the blocking-rule if a match is found
    var arrBlockedAs = (reBlocked) ? reBlocked.exec(strHref) : null;
    
    // If matched, add an unblocking link to the result that will cancel
    // the blocking rule; otherwise, add a blocking link to block that
    // domain
    if (arrBlockedAs && arrBlockedAs.length == 2) {
      
      addBlockLink(nodeDiv, arrBlockedAs[1], true);
      
      switch (nBlockingMethod) {
        case BLOCKING_METHOD_FADE :
          nodeDiv.style.display = "block";
          nodeDiv.style.opacity = 0.25;
          break;
        case BLOCKING_METHOD_HIDE :
        default :
          nodeDiv.style.opacity = 1;
          nodeDiv.style.display = "none";
          break;
      }
      
    } else {
      
      addBlockLink(nodeDiv, strHref, false);
      nodeDiv.style.opacity = 1;
      nodeDiv.style.display = "block";
      
    }
    
  }
  
}


// Add a link to activate the result filtering
function addBlockLink(node, href, blocked) {
  
  // Find the node to which we will append the control link
  var nodeCorrectPlace = node.getElementsByTagName("nobr")[0];
  
  // Check for existing control link, if exists, remove - otherwise, add
  // a text hyphen
  var nodeControl = nodeCorrectPlace.lastChild;
  if (nodeControl && nodeControl.nodeName == "SPAN" && nodeControl.hasAttribute("href")) {
    removeNode(nodeControl);
  } else {
    var nodeTextHyphen = document.createTextNode(" - ");
    nodeCorrectPlace.appendChild(nodeTextHyphen);
  }
  
  
  nodeControl = document.createElement("span");
  nodeControl.className = "fl";
  nodeControl.setAttribute("href", href);
  nodeControl.textContent = (blocked) ? "Stop blocking" : "Block result";
  nodeControl.addEventListener("click", (blocked) ? unblockResultHref : blockResultHref, false);
  
  nodeCorrectPlace.appendChild(nodeControl);
  
}





/* ----- Event-called function -------------------------------------- */


// Add a domain to the blacklist (called by link under a result)
function blockResultHref(e) {
  
  // Get the basic domain, removing "www." if exists
  var reDomain = /^https?:\/\/(?:www\d*\.)?((?:[\w-]+\.)*(?:\w+))\//
  var arrDomain = reDomain.exec(this.getAttribute("href"));
  
  // Sanity check
  if (arrDomain && arrDomain.length == 2) {
    
    // Split domain to parts, based on levels. for example:
    // "sub.example.com" --> ["sub", "example", "com"]
    var strDomain = arrDomain[1];
    var arrDomainParts = strDomain.split(/\./);
    
    // Sanity check
    if (arrDomainParts) {
      
      // If the domain has only two parts, we block it, otherwise, we open
      // a selection screen for the user to choose which tomain to block.
      // Examples:
      // 1) example.com will automatically become blocked
      // 2) deeper.sub.example.com will open a selection screen
      if (arrDomainParts.length == 2) {
        addToBlacklist(strDomain);
      } else {
        openSelectionScreen(arrDomainParts, e);
      }
      
    } else {
      GM_log("Error! Error in this script");
    }
  } else {
    GM_log("Error! Domain is malformed (or this script is broken)");
  }
  
}


// Remove a domain from the blacklist (called by link under a result)
function unblockResultHref(e) {
  
  removeFromBlacklist(this.getAttribute("href"));
  
}


// Add a domain to the blacklist (called by link in selection box)
function blockSelectedHref(e) {
  
  var strDomain = this.getAttribute("href");
  addToBlacklist(strDomain);
  closeModals(e);
  
}


// Add or remove a domain from the blacklist (called by checkboxes in
// control panel)
function actOnCheckbox(e) {
  
  if (this.checked) {
    addToBlacklist(this.value);
  } else {
    removeFromBlacklist(this.value);
  }
  
  filterResults();
  
}


// Change the blocking method (called by radio in control panel)
function actOnRadio(e) {
  
  if (this.checked) {
    setBlockingMethod(this.value);
    filterResults();
  } else {
    GM_log("Warning! Change blocking method was called on unselected radio");
  }
  
}


// Open the script's main control panel (called by CP link)
function openControlPanel(e) {
  
  // Darken everything to isolate the control panel
  darkenAll();
  
  displayControlPanel();
  
}


// Open a selection box to select a domain from various subdomains
// (called by another event, hence not really an event-called function)
function openSelectionScreen(arrDomainParts, e) {
  
  // Darken everything to isolate the control panel
  darkenAll();
  
  displaySelectionScreen(arrDomainParts, e.pageX, e.pageY);
  
}


// Close any "modals" (called by clicking on dark mask or a cancel or
// apply button)
function closeModals(e) {
  
  undarkenAll();
  closeOpenPanel();
  
}





/* ----- GUI functions ---------------------------------------------- */


// Display the main control panel
function displayControlPanel() {
  
  // Create the main node for the control panel
  var nodeControlPanel = document.createElement("div");
  nodeControlPanel.setAttribute("id", "GBUR_controlPanel");
  nodeControlPanel.className = "GBUR_controlPanelMain";
  
  // Create a node to be the title of the control panel
  var nodeTitle = document.createElement("div");
  nodeTitle.className = "GBUR_controlTitle";
  nodeTitle.textContent = "Blocking options";
  nodeControlPanel.appendChild(nodeTitle);
  
  // Create a form for the control panel
  var nodeForm = document.createElement("form");
  
  // Create the form's first fieldset
  var nodeFieldsetFirst = document.createElement("fieldset");
  
  // Create the first fieldset's legend
  var nodeLegendFirst = document.createElement("legend");
  nodeLegendFirst.textContent = "Uncheck box to unblock domain";
  nodeFieldsetFirst.appendChild(nodeLegendFirst);
  
  // Get the list of blocked domains as array
  var arrBlocked = getBlacklistedAsArray();
  if (arrBlocked.length != 0) {
    
    // Create a div, so we can style the fieldset better
    var nodeDivInFieldsetFirst = document.createElement("div");
    
    // Inner function for the next array.foreach action
    function insertInputNode(element, index, array) {
      
      var nodeInput = document.createElement("input");
      nodeInput.type = "checkbox";
      nodeInput.checked = true;
      nodeInput.value = element;
      nodeInput.addEventListener("click", actOnCheckbox, false);
      
      var nodeLabel = document.createElement("label");
      nodeLabel.appendChild(nodeInput);
      nodeLabel.appendChild(document.createTextNode(' ' + element));
      
      nodeDivInFieldsetFirst.appendChild(nodeLabel);
      
    }
    
    // Sort blacklist, and insert a checkbox for each domain
    arrBlocked.sort();
    arrBlocked.forEach(insertInputNode);
    
    // Append div to first fieldset
    nodeFieldsetFirst.appendChild(nodeDivInFieldsetFirst);
    
  } else {
    
    nodeFieldsetFirst.textContent = "There are currently no blocked domains";
    
  }
  
  
  // Append first fieldset to form
  nodeForm.appendChild(nodeFieldsetFirst);
  
  
  // Create the form's second fieldset
  var nodeFieldsetSecond = document.createElement("fieldset");
  
  // Create the second fieldset's legend
  var nodeLegendSecond = document.createElement("legend");
  nodeLegendSecond.textContent = "How would you like to handle blocked domains?";
  nodeFieldsetSecond.appendChild(nodeLegendSecond);
  
  // Create input radio for "hide" option
  var nodeInputRadioHide = document.createElement("input");
  nodeInputRadioHide.type = "radio";
  nodeInputRadioHide.name = "GBUR_blockingMethod";
  nodeInputRadioHide.checked = (getBlockingMethod() == BLOCKING_METHOD_HIDE);
  nodeInputRadioHide.value = BLOCKING_METHOD_HIDE;
  nodeInputRadioHide.addEventListener("click", actOnRadio, false);
  
  // Create label for "hide" option
  var nodeLabelHide = document.createElement("label");
  nodeLabelHide.appendChild(nodeInputRadioHide);
  nodeLabelHide.appendChild(document.createTextNode(" Completely hide blocked results"));
  
  // Create input radio for "fade" option
  var nodeInputRadioFade = document.createElement("input");
  nodeInputRadioFade.type = "radio";
  nodeInputRadioFade.name = "GBUR_blockingMethod";
  nodeInputRadioFade.checked = (getBlockingMethod() == BLOCKING_METHOD_FADE);
  nodeInputRadioFade.value = BLOCKING_METHOD_FADE;
  nodeInputRadioFade.addEventListener("click", actOnRadio, false);
  
  // Create label for "hide" option
  var nodeLabelFade = document.createElement("label");
  nodeLabelFade.appendChild(nodeInputRadioFade);
  nodeLabelFade.appendChild(document.createTextNode(" Fade out blocked results"));
  
  // Append labels to second fieldset to form
  nodeFieldsetSecond.appendChild(nodeLabelHide);
  nodeFieldsetSecond.appendChild(nodeLabelFade);
  nodeForm.appendChild(nodeFieldsetSecond);
  
  
  // Append form to CP
  nodeControlPanel.appendChild(nodeForm);
  
  // Create a "Close" button for the CP
  var nodeClose = document.createElement("div");
  nodeClose.className = "GBUR_controlCancel";
  nodeClose.textContent = "Close";
  nodeClose.addEventListener("click", closeModals, false);
  nodeControlPanel.appendChild(nodeClose);
  
  // Finally, append CP to body
  document.body.appendChild(nodeControlPanel);
  
}


// Display domain selection screen, when domain has multiple parts
function displaySelectionScreen(arrDomainParts, x, y) {
  
  // Create the main node for the selection screen
  var nodeSelectionScreen = document.createElement("div");
  nodeSelectionScreen.setAttribute("id", "GBUR_controlPanel");
  nodeSelectionScreen.className = "GBUR_controlPanelSelectionScreen";
  nodeSelectionScreen.style.left = x+"px";
  nodeSelectionScreen.style.top = y+"px";
  
  // Create a node to be the title of the selection screen
  var nodeTitle = document.createElement("div");
  nodeTitle.className = "GBUR_controlTitle";
  nodeTitle.textContent = "Select which domain to block:";
  nodeSelectionScreen.appendChild(nodeTitle);
  
  // Create an unordered list node, to which all optional domains will be attaches
  var nodeList = document.createElement("ul");
  nodeList.className = "GBUR_controlList";
  
  // Work for each level of the domain
  do {
    
    // Get the actual domain as a string
    var strDomainOption = arrDomainParts.join('.');
    
    // Create the list item node
    var nodeItem = document.createElement("li");
    
    // Create the clickable link that will add this domain to the blacklist
    var nodeDomainOption = document.createElement("span");
    nodeDomainOption.className = "GBUR_controlLink";
    nodeDomainOption.setAttribute("href", strDomainOption);
    nodeDomainOption.textContent = strDomainOption;
    nodeDomainOption.addEventListener("click", blockSelectedHref, false);
    
    // Append link to list item, and list item to list
    nodeItem.appendChild(nodeDomainOption);
    nodeList.appendChild(nodeItem);
    
    // Take out the first last of the domain, and try again for next level
    arrDomainParts.shift();
    
  } while (arrDomainParts.length > 1);
  
  // Append the list to the selection screen
  nodeSelectionScreen.appendChild(nodeList);
  
  // Create a "Cancel" button for the selection screen
  var nodeCancel = document.createElement("div");
  nodeCancel.className = "GBUR_controlCancel";
  nodeCancel.textContent = "Cancel";
  nodeCancel.addEventListener("click", closeModals, false);
  nodeSelectionScreen.appendChild(nodeCancel);
  
  // Finally, append selection screen to body
  document.body.appendChild(nodeSelectionScreen);
  
}


// Closes any open control panel
function closeOpenPanel() {
  
  var nodePanel = document.getElementById("GBUR_controlPanel");
  if (nodePanel) {
    removeNode(nodePanel);
  } else {
    GM_log("Warning! Requested to close a nonexistent panel");
  }
  
}


// Create a "dark mask" to cover everything
function darkenAll() {
  
  var nodeDarkness = document.getElementById("GBUR_nodeDarkness");
  if (!nodeDarkness) {
    
    var nodeBody = document.body;
    
    nodeDarkness = document.createElement("div");
    nodeDarkness.setAttribute("id", "GBUR_nodeDarkness");
    nodeDarkness.addEventListener("click", closeModals, false);;
    
    nodeBody.appendChild(nodeDarkness);
    
  } else {
    GM_log("Warning! Dark mask already exist");
  }
  
}


// Remove the "dark mask" created with darkenAll
function undarkenAll() {
  
  var nodeDarkness = document.getElementById("GBUR_nodeDarkness");
  if (nodeDarkness) {
    removeNode(nodeDarkness);
  } else {
    GM_log("Warning! Requested to remove a nonexistent mask");
  }
  
}


// Display a tiny message in the corner, and disappears it after a while
function displayMessage(str, type) {
  
  // Take existing message node, or create a new one if not exist
  var nodeMessage = document.getElementById("GBUR_nodeMessage");
  if (nodeMessage) {
    
    // Clear existing timeout if exist
    if (window.GBUR_toFade) {
      window.clearTimeout(window.GBUR_toFade);
    }
    
  } else {
    
    // Create the message node, set it's id
    nodeMessage = document.createElement("div");
    nodeMessage.setAttribute("id", "GBUR_nodeMessage");
    
    // Append message node to body
    document.body.appendChild(nodeMessage);
    
  }
  
  // Set the base opacity for the message node
  nodeMessage.style.opacity = 1;
  
  // Set the message class by type, and text by str
  nodeMessage.className = "GBUR_message" + type;
  nodeMessage.textContent = str;
  
  // Begin fadeout of message, save timeout ID to window
  var toFade = window.setTimeout(fadeMessage, 3500);
  window.GBUR_toFade = toFade;
  
}


// Fade out the message in the corner, destroying it when it reaches 0 opacity
function fadeMessage() {
  
  var nodeMessage = document.getElementById("GBUR_nodeMessage");
  
  // Only work if there is such a node
  if (nodeMessage) {
    
    // Calculate new opacity
    var nOpacity = nodeMessage.style.opacity - 0.05;
    
    if (nOpacity > 0) {
      
      // Set new opacity
      nodeMessage.style.opacity = nOpacity;
      
      // Set timeout to continue fading
      var toFade = window.setTimeout(fadeMessage, 60);
      window.GBUR_toFade = toFade;
      
    } else {
      
      // Remove message node
      removeNode(nodeMessage);
      
    }
    
  }
  
}





/* ----- Backend (GM_get/setValue) functions ------------------------ */


// Load the blacklisted domains into a regexp object
function getBlacklistedAsRegexp() {
  
  var strBlacklist = GM_getValue("GBUR_blacklist", undefined);
  if (strBlacklist) {
    return new RegExp("^https?://(?:[\\w-]+\\.)*(" + strBlacklist.replace(/\./g, "\.") + ")/");
  } else {
    return false;
  }
  
}


// Load the blacklisted domains into an array
function getBlacklistedAsArray() {
  
  var strBlacklist = GM_getValue("GBUR_blacklist", undefined);
  if (strBlacklist) {
    return strBlacklist.split(/\|/).sort();
  } else {
    return new Array();
  }
  
}


// Add a domain to the blacklist, while checking for redundancies
function addToBlacklist(str) {
  
  // Get a list of all blacklisted domains
  var arrBlacklistedDomains = getBlacklistedAsArray();
  
  // Iterate through the list of blacklisted domains, and check if the
  // domain we're trying to block is already (or if a upper-level domain
  // that already contains the domain we're trying to block).
  for (var i = 0; i < arrBlacklistedDomains.length; i++) {
    
    var strBlacklistedDomain = arrBlacklistedDomains[i];
    
    // Dynamic RegExp object, checking if the an existing item already
    // blocks the new domain we're trying to block. for example:
    // New domain to block is "sub.example.com" - If we're already
    // blocking "example.com", code will exit gracefully.
    var reIsAlreadyListed = new RegExp("(?:[\\w-]+\\.)*" + strBlacklistedDomain.replace(/\./g, "\\.") + "$");
    
    if (reIsAlreadyListed.test(str)) {
      displayMessage("Already blocked as " + strBlacklistedDomain + "!", "Error");
      filterResults();
      return false;
    }
    
  }
  
  // Dynamic RegExp object, checking if str blocks an item
  var reIsSubAlreadyListed = new RegExp("(?:[\\w-]+\\.)*" + str.replace(/\./g, "\\.") + "$");
  
  // Inner function for the next array.filter action
  function filterBlacklist(element, index, array) {
    return !reIsSubAlreadyListed.test(element);
  }
  
  // Filter blacklist array to take out all domains that will be blocked
  // by the new domain we're blocking. for example:
  // New domain to block is "example.com", this will remove instances of
  // "sub.example.com", "othersub.example.com", etc.
  var arrNewBlacklist = arrBlacklistedDomains.filter(filterBlacklist);
  arrNewBlacklist.push(str);
  
  // Finally, save blacklist
  GM_setValue("GBUR_blacklist", arrNewBlacklist.sort().join('|'));
  displayMessage("Blocking: " + str, "On");
  
  // Re-filter the results
  filterResults();
  
}


// Remove a domain from the blacklist
function removeFromBlacklist(str) {
  
  // Get a list of all blacklisted domains as an array
  var arrBlacklistedDomains = getBlacklistedAsArray();
  
  // Dynamic RegExp object, find the domain
  var reFindDomain = new RegExp(str.replace(/\./g, "\\."));
  
  // Inner function for the next array.filter action
  function filterBlacklist(element, index, array) {
    return !reFindDomain.test(element);
  }
  
  // Filter blacklist to take out the domain we no longer want to block
  var arrNewBlacklist = arrBlacklistedDomains.filter(filterBlacklist);
  GM_setValue("GBUR_blacklist", arrNewBlacklist.join('|'));
  displayMessage("Unblocking: " + str, "Off");
  
  // Re-filter the results
  filterResults();
  
}


// Return the method of blocking
function getBlockingMethod() {
  
  return parseInt(GM_getValue("GBUR_method", BLOCKING_METHOD_HIDE));
  
}


// Set the method of blocking
function setBlockingMethod(method) {
  
  GM_setValue("GBUR_method", method);
  
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





/* ----- Stylish! --------------------------------------------------- */


// Main page
GM_addStyle("span#GBUR_controlPanelLink {color: #0000CC; cursor: pointer; font-size: small; text-decoration: underline;}");
GM_addStyle("span.fl {color: #77c; cursor: pointer; text-decoration: underline;}");


// Messages
GM_addStyle("div#GBUR_nodeMessage {border-width: 2px; border-style: solid; cursor: default; font-weight: bold; padding: 0.2em 2em; position: fixed; top: 0; right: 0;}");
GM_addStyle("div.GBUR_messageOn {background-color: #e5ecf9; border-color: #36c; color: black;}");
GM_addStyle("div.GBUR_messageOff {background-color: #74ad74; border-color: green; color: white;}");
GM_addStyle("div.GBUR_messageError {background-color: #ffabab; border-color: red; color: black;}");


// Control panels, generic
GM_addStyle("div#GBUR_nodeDarkness {background-color: white; height: 100%; width: 100%; opacity: .7; position: fixed; top: 0; left: 0;");
GM_addStyle("div#GBUR_controlPanel {border: 1px solid #36c; background-color: #e5ecf9; padding: 1em; -moz-border-radius: 12px 0 0 12px;");
GM_addStyle("div.GBUR_controlCancel {color: blue; cursor: pointer; text-align: right; text-decoration: underline;}");


// Control panels, main CP
GM_addStyle("div.GBUR_controlPanelMain {overflow: auto; position: fixed; top: 3em; left: 3em; bottom: 2em; right: 3em;");
GM_addStyle("div#GBUR_controlPanel label {display: block;}");
GM_addStyle("div#GBUR_controlPanel div > label {max-width: 14em; overflow: hidden; white-space: pre;}");
GM_addStyle("div#GBUR_controlPanel legend {color: #36c; font-size: 1.1em;}");
GM_addStyle("div#GBUR_controlPanel fieldset {border: 3px groove green; margin: 1.3em 0; -moz-border-radius: 8px;}");
GM_addStyle("div#GBUR_controlPanel fieldset div {-moz-column-width: 14em;}");


// Control panels, selection screen
GM_addStyle("div.GBUR_controlPanelSelectionScreen {position: absolute;");
GM_addStyle("div.GBUR_controlTitle {font-size: 1.1em; font-weight: bold; margin-bottom: 0.3em;}");
GM_addStyle(".GBUR_controlList {list-style: square outside; padding: 0 0 0 1em;}");
GM_addStyle(".GBUR_controlLink {color: blue; cursor: pointer; text-decoration: underline;}");


/* ----- So Say We All ---------------------------------------------- */



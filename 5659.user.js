// ==UserScript==
// @name          First text area accesskey
// @namespace     tag:oliver.dyas@gmail.com,2006-9-21:userscript
// @description   Adds an accesskey (Alt-s) to the first text box on a page, useful for modifying the search query on a results page or jumping straight to a login prompt.
// @version       0.0.3
// ==/UserScript==

(function() {
  //############## THIS CONTROLS WHICH KEY IS USED ##############
  var searchBoxAccessKey = "s";

  // Nick Turrietta came up with the idea
  // I copied the trick for doing this from Gary Mason at http://userscripts.org/scripts/show/4027
  // I'm not a programmer so forgive the poor quality, if you improve this script please send me a copy

// V annoying, i can't get it to work on digg results pages or the google front page, everywhere else i try it is find

  var searchButtons = document.evaluate("//input[@value='Search']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//GM_log("search buttons: "+searchButtons.snapshotLength)
  if (searchButtons.snapshotLength!=0) {
    // find the last search button on the page
    var thisTextarea = searchButtons.snapshotItem(searchButtons.snapshotLength-1);
	
	while (thisTextarea = thisTextarea.previousSibling) {
	  if (thisTextarea.type == "text") break;
//GM_log(thisTextarea.type);
	  if (thisTextarea.previousSibling==null) break;
	}
  }
//GM_log("# forms: "+document.forms.length)
//GM_log("first attempt: "+thisTextarea);

  if (thisTextarea==undefined) {
    allTextareas = document.evaluate("//input[@type='text']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var thisTextarea = allTextareas.snapshotItem(0);
  }

  if (undefined != thisTextarea) {

    // If it hasn't one already, give the text box an id for the label
    // ( This should avoid breaking anything )
    var textAreaId = thisTextarea.getAttribute("id");
    if (undefined == textAreaId) {
      thisTextarea.setAttribute("id", "searchbox");
      textAreaId = "searchbox";
    }

    // Create a label so the textbox can have an accesskey
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", textAreaId);
    newLabel.setAttribute("accessKey", searchBoxAccessKey);
    newLabel.setAttribute("title", "Change text");

//	thisTextarea.parent.appendChild(newLabel);

    // Add the label to the first form on the page
    document.forms[0].appendChild(newLabel);
  }
})();

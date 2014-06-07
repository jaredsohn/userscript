// ==UserScript==
// @name Pinboard - Tag Frequency Autocomplete with Taglist Highlighting
// @namespace http://murklins.talkoncorners.net
// @description When adding a bookmark, tag autocomplete sorts by tag frequency (kind of), and tags get highlighted in the taglist as they are selected.
// @include http://pinboard.in/add*
// @include http://www.pinboard.in/add*
// @include https://pinboard.in/add*
// @include https://www.pinboard.in/add*
// @require http://yui.yahooapis.com/2.9.0/build/yahoo-dom-event/yahoo-dom-event.js
// @require http://yui.yahooapis.com/2.9.0/build/datasource/datasource-min.js
// @require http://yui.yahooapis.com/2.9.0/build/autocomplete/autocomplete-min.js
// ==/UserScript==

//***** CONFIGURATION *****

var highlightStyle = "background-color: rgb(255, 248, 198);";

//***** CODE ******

highlightStyle = highlightStyle.trim();
if (highlightStyle.charAt(highlightStyle.length-1) == ";") {
  highlightStyle = highlightStyle.substring(0, highlightStyle.length-1);
}

var prevTags = [];

// Only bother with this whole process if we can identify the "tags" form element
var tagsInput = document.getElementById("tags");
if (!tagsInput) {
  GM_log("Can't find tags element. Exiting script.");
  return;
}	

// get the current account name from cookie
var user = "";
var userRegex = new RegExp("login=(.*?);");
var userArr = userRegex.exec(document.cookie);
if (userArr) {
  user = userArr[1];
}
else {
  userRegex = new RegExp("; login=(.*?)$");
  userArr = userRegex.exec(document.cookie);
  if (userArr) {
    user = userArr[1];
  }
}
if (user == "") {
  // user cookie storage has changed! Log and exit.
  GM_log("Can't get current user from cookie. Exiting script.");
  return;
}

// get the tags from the user's front page
var href = window.location.href;
var http = href.split(":")[0];
var req = new XMLHttpRequest(); 
var url = http + "://pinboard.in/u:" + user + "?mode=list&floor=1";
req.open("GET",  url, true);  
req.onreadystatechange = function (aEvt) { 
  if (req.readyState == 4 || req.readyState == 'complete') { 
    var respText = req.responseText;
    
    // get the username of the currently signed in user, and compare it to the user 
    // that initially opened the post a bookmark page
    var currUserRegex = new RegExp("<title>Pinboard: bookmarks for (.*?)</title>");
    var userArr = currUserRegex.exec(respText);
    var currUser = "";
    if (userArr) {
      currUser = userArr[1];
    }
    if (currUser != user) {
      GM_log("The user " + user + " is no longer logged in. Exiting script.");
      return;
    }
    
    // parse out the tags, along with (rudimentary) frequency information
    var tagTuples = parseTags(respText);

    if (tagTuples.length == 0) {
      // no tags, so just exit
      GM_log("No tags list. Exiting script.");
      return;
    }
    
    buildAutocomplete(tagTuples);
  }  
};  
req.send(null);

// while the tags are being fetched, setup the tag highlighting
setupHighlighting();

function setupHighlighting() {
  var taglist = document.evaluate("//div/a[contains(@onclick, 'add_tag')]", document, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null);
  if (taglist.snapshotLength == 0) {
      GM_log("Couldn't find tag list. Tag highlighting not enabled.");
      return;    
  }
  for (var i = 0; i < taglist.snapshotLength; i++) {
    var t = taglist.snapshotItem(i);
    
    // give each tag link a unique ID based on its innerHTML (escaping ' and ")
    var tagName = escapeTag(t.innerHTML.trim());
    t.id = "gm_highlightTags_" + tagName.toLowerCase();
    
    // and listen to every tag link click
    t.addEventListener("click", function(event) {highlightTags();}, false);
  }
  
  // track events on the tags input
  tagsInput.addEventListener("keyup", function(event) {highlightTags();}, false);
  tagsInput.addEventListener("change", function(event) {highlightTags();}, false);
  
  // highlight any pre-assigned tags
  highlightTags();
}

function buildAutocomplete(tagTuples) {
  // create the data scource
  tagDataSource = new YAHOO.util.DataSource(tagTuples,{ 
      responseType : YAHOO.util.DataSource.TYPE_JSARRAY, 
      responseSchema : { 
          fields : ['tag','count'] 
      }
  });
  
  // add the yui-skin-sam class to the body so that autocomplete gets styled properly
  var body = document.getElementsByTagName("body")[0];
  body.className = body.className + " yui-skin-sam";
    
  // hide the default pinboard autocomplete
  // note that this doesn't stop the tags input from running the pinboard
  // autocomplete code, since the event listeners for that can't be removed.
  // this will simply prevent that pinboad drop down from displaying.
  GM_addStyle(".pin-ac {display: none; z-index: 0;}");
  var pinAC = document.evaluate("//div[contains(@class, 'pin-ac')]", body, null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
  if (pinAC.snapshotLength != 1) {
      GM_log("Couldn't turn off Pinboard default autocomplete.");
      return;    
  }
  pinAC = pinAC.snapshotItem(0);
  pinAC.parentNode.removeChild(pinAC);
  
  // create the Yahoo autocomplete container div
  var autocompleteDiv = document.createElement("div");
  autocompleteDiv.id = "gm_frequency_tags";
  
  // put the tags input into the autocomplete container div
  var tagInput = document.getElementById("tags");
  tagInput.parentNode.insertBefore(autocompleteDiv, tagInput);
  tagInput.parentNode.removeChild(tagInput);
  autocompleteDiv.appendChild(tagInput);
  
  // create the Yahoo autocomplete results div
  var tagResults = document.createElement("div");
  tagResults.id = "gm_frequency_tags_results";
  autocompleteDiv.appendChild(tagResults);
  
  // if we can find the taglist, make the autocomplete listen to mouseclicks
  // so that tags in the list get highlighted as needed
  var tl = document.evaluate("//a[contains(@onclick, 'add_tag')]", document, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null);
  if (tl.snapshotLength != 0) {
    autocompleteDiv.addEventListener("click", function(event) {highlightTags();}, false);
  }
  
  // attach the Yahoo autocomplete widget
  var yahooAutoComp = new YAHOO.widget.AutoComplete("tags","gm_frequency_tags_results", tagDataSource);
  yahooAutoComp.delimChar = ' ';
  yahooAutoComp.maxResultsDisplayed = 8;
  yahooAutoComp.filterResults = function(req, raw, res, cb) {
    // sort autocomplete results by tag count
    var data = res.results || [];
    var filtered = [];
    if (req) {    
      for(var b = data.length - 1; b >= 0; b--) {
        var tag = data[b]["tag"];
        var count = data[b]["count"];
        var p;
        if (this.queryMatchCase) {
           p = tag.indexOf(decodeURIComponent(req));
        }
        else {
          p = tag.toLowerCase().indexOf(decodeURIComponent(req).toLowerCase());
        }
        if ( (!this.queryMatchContains && (p===0)) || (this.queryMatchContains && (p>-1)) ) {
          filtered.unshift(data[b]);
        }
      }
      filtered.sort(sortByCount);
      res.results = filtered;
    }  
    return res; 
  }
  
  // refocus the tags input
  tagInput.focus();
}

function parseTags(respText) {
  var tags = [];
  var err = false;
  
  // first, cut the page down to just what's after the opening tag cloud div tag
  var pageRegex = new RegExp("<div id=\"tag_cloud\">([\\s\\S]*?)</body>");
  var postTagCloud = pageRegex.exec(respText);
  if (postTagCloud) {
    respText = postTagCloud[1];
  }
  else {
    GM_log("Can't find tag cloud div.");
    return [];  
  }
              
  var tagsRegex = new RegExp("<a class=\"tag\" style=\"opacity\:(.*?)\".*?>(.*?)</a>", "g");
  while (arr = tagsRegex.exec(respText)) {
    var style = arr[1];
    var tagname = arr[2];
    
    var opacity = "";
    var fontsize = "";
    if (style.indexOf("font-size") != -1 ) {
      var fontRegex = new RegExp("(.*?;)font-size\:(.*?)\%");
      var fontRegexArr = fontRegex.exec(style);
      if (fontRegexArr) {
        style = fontRegexArr[1];
        fontsize = fontRegexArr[2];
        if (! isNaN(parseFloat(fontRegexArr[2]))) {
          fontsize = parseFloat(fontRegexArr[2]);
        }
      }
    }
    
    if (style.charAt(style.length - 1) == ";") {
      style = style.substr(0, style.length - 1);
      if (! isNaN(parseFloat(style))) {
        opacity = parseFloat(style) * 100;
      }
    }
    
    if (tagname != "" && opacity != "") {
      // add opacity to font size to get some semblance of a frequency value
      var freq = opacity;
      if (fontsize != "") {
        freq += fontsize;
      }
      tags.push({tag: tagname, count: freq.toString()});
    }
    else {
      err = true;
      break;
    }
  }
  
  if (err) {
    GM_log("Can't get tags list with opacity and font-size values.");
    return [];
  }
  return tags;
}

function sortByCount(a, b) {
    return ((parseFloat(a.count) < parseFloat(b.count)) ? 1 : ((parseFloat(a.count) > parseFloat(b.count)) ? -1 : 0));
}

function highlightTags() {
  // check the difference between the tags that are now in the tags input and
  // the ones that were in there the last time we highlighted
  var newTags = tagsInput.value.trim().toLowerCase();
  if (newTags == "") {
    newTags = [];
  }
  else {
    newTags = newTags.split(/\s+/);
  }
  var addHighlight = diff(newTags, prevTags);
  var removeHighlight = diff(prevTags, newTags);
  
  // remove highlighting from tags that got deleted
  for (var i = 0; i < removeHighlight.length; i++) {
    var tagId = "gm_highlightTags_" + escapeTag(removeHighlight[i]);
    var tnode = document.getElementById(tagId);
    if (tnode) {
      var style = tnode.getAttribute("style");
      var newStyle = removeStyle(highlightStyle, style);
      tnode.setAttribute("style", newStyle);
    }
  }
  
  // highlight the tags that were added
  for (var i = 0; i < addHighlight.length; i++) {
    var tagId = "gm_highlightTags_" + escapeTag(addHighlight[i]);
    var tnode = document.getElementById(tagId);
    if (tnode) {
      style = tnode.getAttribute("style");
      var newStyle = addStyle(highlightStyle, style);
      tnode.setAttribute("style", newStyle);
    }
  }
  
  // set the current tags
  prevTags = newTags;
}

function removeStyle(styleToDelete, wholeStyle) {
  var style = wholeStyle.trim().split(/\s*;\s*/);
  var newStyle = "";
  for (var s = 0; s < style.length; s++) {
    if ((style[s].trim() != styleToDelete) && (style[s].trim() != "")) {
      newStyle = style[s] + ";";
    }
  }
  return newStyle;
}

function addStyle(styleToAdd, wholeStyle) {
  var style = wholeStyle.trim();
  if (style.charAt(style.length-1) != ";") {
    style = style + ";";
  }
  return style + styleToAdd + ";";
}

function escapeTag(tag) {
  var escapedTag = tag.replace(/[\']/g,"_");
  return escapedTag.replace(/[\"]/g,"__");
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};

function diff(a, b) {
  var diff = [];
  var match = false;
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (a[i] === b[j]) {
        match = true;
        break;
      }
    }
    match ? match = false :  diff.push(a[i]);
  }
  return diff;
}

// skin the Delicious autocomplete
GM_addStyle(
  ".yui-skin-sam .yui-ac{width:40em;}" +
  ".yui-skin-sam .yui-ac{position:relative;font-family:arial;font-size:100%;top:-7px;}" +
  ".yui-skin-sam .yui-ac-input{position:absolute;width:100%;margin:0;padding:0;}" +
  ".yui-skin-sam .yui-ac-container{position:absolute;top:1.6em;width:100%}" +
  ".yui-skin-sam .yui-ac-content{position:absolute;width:100%;border:1px solid #808080;background:#fff;overflow:hidden;z-index:9050}" +
  ".yui-skin-sam .yui-ac-shadow{position:absolute;margin:.3em;width:100%;background:#000;-moz-opacity:.10;opacity:.10;filter:alpha(opacity=10);z-index:9049}" +
  ".yui-skin-sam .yui-ac iframe{opacity:0;filter:alpha(opacity=0);padding-right:.3em;padding-bottom:.3em}" +
  ".yui-skin-sam .yui-ac-content ul{margin:0;padding:0;width:100%}" +
  ".yui-skin-sam .yui-ac-content li{margin:0;padding:2px 5px;cursor:default;white-space:nowrap;list-style:none;zoom:1}" +
  ".yui-skin-sam .yui-ac-content li.yui-ac-prehighlight{background:#b3d4ff}" +
  ".yui-skin-sam .yui-ac-content li.yui-ac-highlight{background:#426fd9;color:#FFF}"
);
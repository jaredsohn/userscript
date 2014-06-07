//
// ==UserScript==
// @name          WKN Board
// @namespace     http://www.waterkant.net/suriname/forum/*
// @description
//
//                SUPPORTED BROWSERS:
//                - supports FireFox. Hasn't been tested on other browsers and uses features that are incompatible with
//                  exisiting versions of Internet Explorer and Chrome. Has been tested on FireFox 4 and FireFox 3.6.
//
//  ----------------------------------------------------
//                Copyright (C) 2011 by TNA Porkmeister62
//                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//                THE SOFTWARE.
//  ----------------------------------------------------
//                WHAT MyBoard DOES:
//
//                for the most current information, check http://porkmeister62.webs.com
//
//                Adds several browser side features for pooning boards (TNABOARD.COM & TNAXXBOARD.COM), including:
//                - Lists for tracking providers: (NOW, ATF, REPEAT, CLEARED, SPECIAL, TDL, DONE, MAYBE). Topics by these providers are colored based on the list
//
//                - Block ads by specific providers. These ads are completely hidden when viewing ad forums and search results
//
//                - When viewing Provider Ad Forums, click the small icon by each topic summary to add that member to the
//                      blocked ads list & hide all ads by that member.
//
//                - MyBoard Menu is added to the menubar of all board webpages (right most menu):
//                      At A Glance         - Presents an "at a glance" summary of the forum pages (most useful for Provider Ad forums)
//                                            Click on the member page to go instantly to the post. Hover on the member name to see post topic.
//                      Show Lists          - Shows which members are in each list & click to go go their last ad.
//                                            click on the member name to go to their latest add (except for ingored - click on those to toggle in/out of list)
//                      Clear BLOCKED_ADS   - Confirms, then clears all members from blocked ads list.
//                      Clear <listname>    - Confirms, then clears all members from that list.
//                      About MyBoard       - Summary of this version of MyBoard including other supported boards and option to check for updates.
//
//                - Management buttons when viewing posts:
//                    * Topic post for provider ads:
//                        1) Search Button to go to Search page, pre-populated with provider name & all review & rob forums selected for the search.
//                           When all these fields are selected, the screen requires a scroll to get to the submit button, so MyBoard also adds a 
//                           submit search button next to the search keywords field so you can click it w/o scrolling down.
//                        2) Posts & Topics buttons to go to list of all posts/topics by this member (same as going to their profile & clicking 
//                           the show all topics or show all posts links.
//                        3) Post rev button takes you to the review page for this forum & pre-populates the subject with provider name.
//                        4) Buttons to toggle provider in/out of each list (tdl, etc)
//                        5) BLOCKED_ADS button to toggle provider in/out of Blocked Ads list. MyBoard hides all ads by providers in the BLOCKED_ADS list.
//                     * All other posts in all forums:
//                        1) Search button to go to search page, pre-populated with member name in subject.
//                        2) Posts & Topics buttons to go to list of all posts/topics by this member.
//                        3) Button to toggle member in IGNORED list.  All posts by members in ignored list are collapsed to a small
//                           line which can be clicked to toggle them in/out of the list.
//
//                 - Search page.  Added a submit button next to the keywords input field - this makes it easy to just click submit w/o having to scroll.
//                                 or user the keyboard.
//
//  IMPORTANT: if you Install a newer version of FireFox or uninstall MyBoard, you will lose all of your persistent data (eg lists, etc).
//             (Greasemonkey's only persistent data storage is tied to the specific installation of the script in the specific Firefox user profile,
//              and the script gets deleted when the script is uninstalled, or when the profile gets deleted (as in when upgrading major version of firefox).
//             If you are technically savvy, you can copy the contents of your lists from the Firefox about:config  (in Firefox 4, enter about:config
//             in the address bar, then click Ok at the warning.  Scroll down to the G's and find the greasemonkey.scriptvals & you'll see the lists.
//
//             If you manage to delete your lists (by installing FireFox 4 on top of 3.6 for example), and you have a recent backup, you can retrieve
//             the file prefs.js from your backup & find the lists contents in there. Although is is possible to modify your new prefs.js, it's not,
//             recommended nor supported, and changing it can cause other issues.
//
//             MyBoard was created by porkmeister62 of tnaboard.com.
//             It was inspired by earlier scripts including punbb ignore & tna preview.
//
//
// @include       http://www.waterkant.net/suriname/forum/*
// @include       http://www.waterkant.net/suriname/forum/*
// ==/UserScript==
var startTime = new Date();
var timeout         = 500;
var closeTimer        = 0;
var ddmenuitem      = 0;

//======================= CORE Object & Functions  (Helper funtions) ==============================================

// Core object has all methods/properties of Core functions.
var Core = {
  logUpdates: true,    //set to true to enable logging of non-errors, false to turn off.
  logEnter: false,    //set to true to ouput to log on Core.enter (function enter)
  logLeave: false,     //set to true to output to log on Core.leave (function exit)
  errorCount: 0,        //total number of errors logged by Core.error
};
//-----------------------------------------------------------------------------


//------------------------------------ Core.start() --------------------------------------------------
//  FUNCTION  :   Core.start(theObject)
//  PURPOSE   :   waits for page to load, then executes theObject
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   theObject - function to run upon page load
//  RETURNS   :   -
Core.start = function(theObject)
{
  window.addEventListener("load", theObject.init, false);
};
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.size() --------------------------------------------------
//  FUNCTION  :   Core.size
//  PURPOSE   :   returns the number of "own" properties in an object. Useful for determining number of
//                entries in an associative array
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   number of "own" properties in an object.
//
Core.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.createHeader() --------------------------------------------------
//  FUNCTION  :   Core.createHeader(character, length, title, leadDelimiterCharacter, trailDelimiterCharacter)
//  PURPOSE   :   builds a string of repeating characters with optional centered title
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   character     - Character to repeat on left and right of title (or for entire string if no title)
//                length        - Number of total characters in the string
//                title         - Optional. title to center in middle of string
//    leadDelimiterCharacter    - OPTIONAL. a character to place immediately before the title within the string.
//    trailDelimiterCharacter   - OPTIONAL. a character to place immediately after the title within the string.//
//  RETURNS   :                 - a string of repeating characters of size length. If title is defined & of length>0, it's
//                              placed within the string (with delimiters if specified).
//                              If length is not long enough to accommodate all of title (plus opt delim), title is truncated.
//                              if length is not long enough to accommodate at least one character of title (with opt delim)
//                              null is returned.
Core.createHeader = function (character, length, title, leadDelimiterCharacter, trailDelimiterCharacter) {
  var self = "Core.createHeader";
  var result, titleExtSize, titleExt, truncateCount, howMany;
  result = "";
  if (!title || typeof title == "undefined" || title=="") {
    //title is not set or is of zero length, so return string of length characters
    for (var i=0; i<length; i++) {
      result += character;
    }
  } else {
    //title specified. confirm there's enough room for at least one char of title plus any leading/trailing delimiter
    minSizeReq = (!leadDelimiterCharacter || typeof leadDelimiterCharacter == "undefined") ? 0: 1;
    minSizeReq += (!trailDelimiterCharacter || typeof leadDelimiterCharacter == "undefined") ? 0: 1;
    if (length < minSizeReq + 1) return null;

    // room for at least one char + any delim. build titleExt (title,possibly truncated, + any delim)
    truncateCount = (minSizeReq + title.length) - length;
    titleExt = (truncateCount > 0) ? title.substr(0,title.length-truncateCount) : title;
    if (leadDelimiterCharacter && typeof leadDelimiterCharacter != "undefined") titleExt = leadDelimiterCharacter + titleExt;
    if (trailDelimiterCharacter && typeof trailDelimiterCharacter != "undefined") titleExt = titleExt + trailDelimiterCharacter;
    //add in the leading & trailing chars
    howMany = parseInt((length - titleExt.length)/2);
    for (var i=0; i<howMany; i++) {
      result += character;
    }
    result += titleExt + result;
    // if there is an odd char, put it on the end
    if (((length - titleExt.length) % 2) != 0) {
      result += character;
    }
  }
  return result;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------ Core.justifyText() --------------------------------------
//  FUNCTION  :   Core.justifyText(string, width, alignment)
//  PURPOSE   :   Returns string beginning with str padded with spaces to achieve width
//                and with string aligned "left", "right", or "center"
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   string    - String to justify
//                width     - total width of result
//                alignment - string "left", "right", or "center" specifies how to justifiy.
//  RETURNS   :   String, justified as specified. If a problem, returns null.
Core.justifyText = function(string, width, alignment) {
  var self = "Core.justifyText";
  var myStr, spaces, prefix, suffix;
  myStr = string.toString();
  spaces = width - myStr.length; // number of spaces we'll need to add.
  if (alignment == "left") {
    //left align - spaces all go in suffix
    prefix = ""
    for (suffix=""; suffix.length<spaces; suffix+=" ");
  } else if (alignment == "right") {
    //right allign - spaces all go in prefix
    suffix = ""
    for (prefix=""; prefix.length<spaces; prefix+=" ");
  } else if (alignment == "center") {
    //center align, split spaces between suffix/prefix & put any odd extra in suffix
    var stop = parseInt(spaces/2);
    for (prefix=""; prefix.length<stop; prefix+=" ");
    suffix = prefix;
    if (spaces % 2 == 1) suffix += " ";  //if there's an extra space, put it on the end.
  } else {
    Core.error(self, "called for string: '" + string + "' with width: " + width + "  Expected alignment (left, right, center) found: " + alignment);
    return null;
  }
  return prefix + myStr + suffix;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.isTheNode() --------------------------------------------------
//  FUNCTION  :   Core.isTheNode(node, Pattern, nodeName)
//  PURPOSE   :   
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   node      - Dom element
//                Pattern   - regular expression pattern to match against node's class
//                tagName  - 
//  RETURNS   :   true if node is a tag tagName and className matching RegExp Pattern, false otherwise
Core.isTheNode = function(node, Pattern, tagName) {
  var self = "Core.isTheNode";
  Core.enter(self, "PATTERN: " + Pattern);
  if (node != null && node.nodeType == 1) {
    if (node.tagName == tagName && node.className != null) {
          var result = Pattern.test(node.className);
          Core.leave(self, "result: " + result);
          return result;
    }
  }
  Core.leave(self);
  return false;
}
//-----------------------------------------------------------------------------




//------------------------------------ Core.isInClasses() --------------------------------------------------
//  FUNCTION  :   Core.isInClasses(className, classes)
//  PURPOSE   :   Determine if string className one of the classes within classes
//  ASSUMES   :   classes is a string value of a HTML class property
//  AFFECTS   :   -
//  PARAMETERS:   className   - the className to look for in classes
//                classes     - the string with the valid html class property names seperated by whitespace
//  RETURNS   :   true if className is in classes, false otherwise.
Core.isInClasses = function(className, classes) {
  var self="Core.isInClasses";
  Core.enter(self, "className:" + className + " classes:" + classes);
  var pattern = new RegExp("(^| )" + className + "( |$)");
  return pattern.test(classes)
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.insertAfter() --------------------------------------------------
//  FUNCTION  :   Core.insertAfter(newElement,targetElement)
//  PURPOSE   :   adds newElement as the immediate sibling following targetElement.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   newElement    - the DOM element to be inserted
//                targetElement - the DOL element where newElement will be inserted as an immediate following sibling.
//  RETURNS   :   -
Core.insertAfter = function (newElement,targetElement) {
  var self = "Core.insertAfter";
  var parent = targetElement.parentNode;
  if(targetElement.nextSibling) {
    return targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling)
  } else {
    // target not at the end - need to insert new element between target and it's current next sibling.
    return targetElement.appendChild(newElement);
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.getElementsByClass() --------------------------------------------------
//  FUNCTION  :   Core.getElementsByClass(theClass, theNode)
//  PURPOSE   :   returns array of DOM nodes which incude theClass in their class property.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   theClass  - string. the className to search for.
//                theNode   - Optional. The location within the DOM to search. that node & all
//                            descendants are searched. If not specified, the entire page (document) is searched.
//  RETURNS   :   array with the elements in theClass within theNode, inclusive.
Core.getElementsByClass = function(theClass, theNode) {
  var self = "Core.getElementsByClass";
  var matchedArray, elementArray, pattern;

  // set elementArray to the elements to be searched
  if (!theNode || (typeof theNode == "undefined")) {
    elementArray = document.getElementsByTagName("*");
  } else {
    elementArray = theNode.getElementsByTagName("*");
  }

  //fill matchedArray with the matches
  matchedArray = [];
  pattern = new RegExp("(^| )" + theClass + "( |$)");
  for (var i = 0; i < elementArray.length; i++) {
    if (pattern.test(elementArray[i].className)) {
      matchedArray[matchedArray.length] = elementArray[i];
    }
  }
  return matchedArray;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.getElementsById() --------------------------------------------------
//  FUNCTION  :   Core.getElementsById(idPattern)
//  PURPOSE   :   Find all elements with ID matching the reg expression in idPattern
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   idPattern - regular expression
//  RETURNS   :   Array of the matches.
Core.getElementsById = function(idPattern) {
  var self = "getElementsById: ";
  Core.enter(self);

  var elementArray;

  elementArray = [];
  if (typeof document.all != "undefined") {
    elementArray = document.all;
  }
  else
  {
    elementArray = document.getElementsByTagName("*");
  }
  var matchedArray = [];
  var pattern = new RegExp("(^| )" + idPattern + "( |$)");
  for (var i = 0; i < elementArray.length; i++)
  {
    if (pattern.test(elementArray[i].id))
    {
      matchedArray[matchedArray.length] = elementArray[i];
    }
  }
  return matchedArray;
}
//-----------------------------------------------------------------------------------------------------------------------


//--------------------------logging & error functions -------------------------



//-----------------------------------------------------------------------------------------------------------------------
//  FUNCTION  :   Core.enter(functionName, msg, alertFlag)
//  PURPOSE   :   if logUpdates && logEnter are true, Writes to log that functionName entered (with msg appended to function name)
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   functionName - string name of function being entered
//                msg          - Optional. string message to append to functionName in log
//                alertFlag    - Optional. If true, message is also displayed with alert();
//  RETURNS   :   -
Core.enter = function(functionName, msg, alertFlag) {
    var str;

    if (Core.logUpdates && Core.logEnter) {
      str = functionName + ": (ENTERING)"
      if (msg & (typeof msg != "undefined")) {
         str += ": " + msg;
      }
      GM_log(str);
      if (alertFlag) {
         alert(str)
      }
    }
  }
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.leave() --------------------------------------------------
//  FUNCTION  :   Core.leave(functionName, msg, alertFlag)
//  PURPOSE   :   if Core.logUpdates & Core.logLeave, writes update to log that functionName exited.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   functionName  - String name of function being exited.
//                msg           - Optional. string message for log
//                alertFlag     - Optional. if specified && true, displays log message in via alert();
//  RETURNS   :   -
Core.leave = function (functionName, msg, alertFlag) {
  if (Core.logUpdates && Core.logLeave) {
    var str;
    str = functionName + ": (RETURNING)"
    if (msg & (typeof msg != "undefined")) {
       str = str + ": " + msg;
    }
    GM_log(str);
    if (alertFlag) {
       alert(str)
    }
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.log() --------------------------------------------------
//  FUNCTION  :   Core.log(functionName, msg, alertFlag)
//  PURPOSE   :   if Core.logUpdates, writes message to log
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   functionName  - String name of calling function
//                msg           - Optional. string message for log
//                alertFlag     - Optional. if specified && true, displays log message in via alert();
//  RETURNS   :
//-----------------------------------------------------------------------------
// If Core.logUpdates is true:
//    Writes to log functionName + msg
//    if alertFlag is true, also displays an alert.
Core.log = function(functionName, msg, alertFlag) {
  var str;
  if (Core.logUpdates) {
    str = functionName + ": (LOGGING...)"
    if (msg && (typeof msg != "undefined")) {
       str = str + ": " + msg;
    }
    GM_log(str);
    if (alertFlag) {
       alert(str)
    }
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.alert() --------------------------------------------------
//  FUNCTION  :   Core.alert(message, title, width, okFunction)
//  PURPOSE   :   Displays an custom alert using dialog box object
//  ASSUMES   :   Core.alert() is not modal - the dialog is immdiately presented & then execution contines. To create
//                a modal effect, provide the okFunction and have it perform the actions to be done after the alert.
//  AFFECTS   :   -
//  PARAMETERS:   Message  - Body text for the alert. this can be a simple string, or HTML.
//                title    - Optional, title for alert. if not specified, "Alert" is used.
//                width    - optional width (percentage w/o %) for dialog. If not specified, size is crudely calculated and used.
//                okFunction - Optional function to setup as the event listener for the okButton.
//  RETURNS   :   null
Core.alert = function(message, title, width, okFunction) {
  var self = "Core.alert";
  var DialogObj, myTitle;
  myTitle = (!title || typeof title == "undefined") ? "alert" : title;
  myWidth= (!width || typeof width == "undefined") ? "50" : width;
  DialogObj = new DialogBox.init(myTitle, message, myWidth);
  Core.enumerateOwnProperties(DialogObj);
  DialogObj.show(okFunction);
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.logWithHeader() --------------------------------------------------
//  FUNCTION  :   Core.logWithHeader(functionName, msg, alertFlag)
//  PURPOSE   :   if Core.logUpdates, Writes a header to the log file, followed by a message.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   functionName  - String name of calling function
//                msg           - Optional. string message for log
//                alertFlag     - Optional. if specified && true, displays log message in via alert();//  RETURNS   :   // If Core.logUpdates is true:
Core.logWithHeader = function(functionName, msg, alertFlag) {
  if (Core.logUpdates) {
    var str = "\n" + Core.createHeader("*", 100) + "\n";
    str += functionName + ": (LOGGING...:)";
    if (msg && (typeof msg != "undefined")) {
       str += ": " + msg;
    }
    str += "\n" + Core.createHeader("*", 100);
    GM_log(str);
    if (alertFlag) {
       alert(str);
    }
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.exit() --------------------------------------------------
//  FUNCTION  :   Core.exit
//  PURPOSE   :   throws an exception to force exit of the script.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   str - optional string for the throw(). if not specified, "Script Exit" is used.
//  RETURNS   :   does not return
Core.exit = function (str) {
  if (!str && (typeof str != "undefined")) {
    throw(str);
  } else {
    throw('Script exit');
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.error() --------------------------------------------------
//  FUNCTION  :   Core.error
//  PURPOSE   :   Writes to log with error header functionName + msg; increments error count. exits if exitFlag
//  ASSUMES   :   -
//  AFFECTS   :   Core.errorCount
//  PARAMETERS:   functionName    - name of function reporting error. gets prepended + ":" to error message.
//                msg             - string with description of error.
//                exitFlag        - Optional. if specified and true, an exception is thrown to exit the script
//  RETURNS   :   null (or doesn't return if exitFlag is true)
Core.error = function(functionName, msg, exitFlag) {
  var str;
  Core.errorCount++;
  str = Core.createHeader("*", 120, "ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR","<",">")+"\n\t\t";
  str += functionName + ": (ERROR:)"
  if (msg && (typeof msg != "undefined")){
     str = str + ": " + msg;
    GM_log(str);
    if (exitFlag) {
       Core.exit(str);
    }
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.isMemberOfList() --------------------------------------------------
//  FUNCTION  :   Core.isMemberOfList=function(list, name)
//  PURPOSE   :   returns true if string name is a member in list, false otherwise.
//  ASSUMES   :   list items are delimited by "," and name's don't include ","
//  AFFECTS   :   -
//  PARAMETERS:   list  - a list of strings to search, list members seperated by ","
//                name  - the name to search.
//  RETURNS   :   true if name is in list, false otherwise.
Core.isMemberOfList=function(list, name) {
    return list.indexOf("," + name + ",") >= 0;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.enumerateOwnProperties() --------------------------------------------------
//  FUNCTION  :   Core.enumerateOwnProperties(myobject)
//  PURPOSE   :   builds string with properties of myobject and outputs to log
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   myobject - any object.
//  RETURNS   :   string with properties in form name:value
Core.enumerateOwnProperties = function(myObject) {
  var self = "Core.enumerateOwnProperties";

Core.log(self,"myObject:" + myObject);
  var outputString = "\n";
  for (var name in myObject) {
    if (myObject.hasOwnProperty(name)  && (typeof myObject[name] != "function")) {
      outputString += name + ": " + myObject[name] + "\n";
    }
  }
  Core.log(self, outputString);
  return outputString;
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ Core.enumerateAllProperties() --------------------------------------------------
//  FUNCTION  :   Core.enumerateAllProperties(myObject)
//  PURPOSE   :   returns a string with all enumeratable properties for myObject
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   myObject - an object
//  RETURNS   :   string with all enumerable properties.
Core.enumerateAllProperties = function(myObject) {
  var self = "enumerateAllProperties";
  var outputString = "";
  for (var name in myObject) {
      outputString += name + ": " + myObject[name] + "\n";
  }
  Core.log(self, outputString);
  return outputString;
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ Core.getValueForUrlQueryString() --------------------------------------------------
//  FUNCTION  :   Core.getValueForUrlQueryString(url, name)
//  PURPOSE   :   examines name=value pairs on url, looking for one with name
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   url   - a valid URL string
//                name  - string to search for (eg search for pair with name= )
//  RETURNS   :   value of name=pair if found, otherwise null
Core.getValueForUrlQueryString = function(url, name) {
  var queries = url.split("?");
  for (var query = 1; query < queries.length; query++) {
    var nameValuePairs = queries[query].split("&");
    for (var i = 0; i<nameValuePairs.length; i++) {
      var thisPair = nameValuePairs[i].split("=");
      if (thisPair[0] == name) {
        return thisPair[1]
      }
    }
  }
  return null;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Core.getQueryStrings() --------------------------------------------------
//  FUNCTION  :   Core.getQueryStrings(url)
//  PURPOSE   :   builds a lookup array with the query strings for the url
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   url - a valid url
//  RETURNS   :   lookup array (lookup by name retrieves the value)
Core.getQueryStrings = function(url) {
  var self = "Core.getQueryStrings";
  Core.enter(self, "url:" + url);

  var result = [];
  //remove any hash
  var str = url.split("#")[0];
  var queries = str.split("?");
  for (var query = 1; query < queries.length; query++) {
    var nameValuePairs = queries[query].split("&");
    for (var i=0; i < nameValuePairs.length; i++) {
      var temp = nameValuePairs[i].split("=")
      if (temp.length != 2) {
        Core.error(self, "not a legit name=value Query string: " + nameValuePairs + " in url: " + url);
        return null
      } else {
        result[temp[0]] = temp[1];
      }
    }
  }
  Core.leave(self);
  return result;
}
//-----------------------------------------------------------------------------------------------------------------------



// ---------------------- DialogBox Object ------------------------------------------------------------
//  FUNCTION  :   DialogBox constructor function
//  PURPOSE   :   DialogBox objects are used to implement "dialog box like" functionality using DOM & CSS.
//                To use:
//                    1) Create a new DialogBox object, as in: new DialogBox("my title", "the message to display", 50)
//                    2) Style the dialog as you wish by modifying the DOM elements.
//                    3) Cause the dialog to display using the .show() method.
//                    The user clicking the okay button invokes the .hide event, which hides & "destroys" the dialog object.
//                    NOTE: .show() does not wait for the user to click OK - script processing continues as soon as .show
//                    completes displaying of the dialog.
//                      To make the dialog "modal" for the page, do the following:
//                      1) When invoking the .Show() method, specify an event handler that does all processing that occurs AFTER the user clicks OK.
//                      2) after invoking the .show method, exit the script (Core.exit);
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:
//    title               - text to display in the titlebar
//    message             - text to display in the message. it can included \n for line feed
//    width               - Optional string with number to use for the width percentage (eg use "50" to fill 50% of the screen with dialog box).
//  RETURNS:              null
//  ADDITIONAL NOTES:
//    Structure of the dialog box DOM:
//    An index (this.dialogIndex) is assigned for each dialog & is appended to component names to form unique ID fields
//    for the DOM elements. Here is the layout is for dialog with index 0:
//        <div class="dialogContainer" id="Dialog_container_0">
//          <style> ... </style>
//          <div class="transparency"></div>
//          <table border="0" id="Dialog_layer_0" class="dialogLayer" style="width: 50%; left: 25%;">
//            <tbody>
//              <tr><td id="Dialog_title_0" class="dialogTitle"> Need to be logged in</td></tr>
//              <tr><td></td></tr>
//              <tr><td id="Dialog_message_0" class="dialogMessage">text message for the dialog here</td></tr>
//              <tr align="center"><td width="100%"><input type="button" id="Dialog_button_0" class="dialogOkButton" value="OK"></td></tr>
//            </tbody>
//          </table>
//        </div>
var DialogBox = {
  dialogObjects:    [],   //array of all dialog objects.
  hide: function () {
    var self= "DialogBox.hide";
    //this.dialogContainerStyleProperty.visibility = "hidden";
    this.destroy();
    if (this.okFunction && (typeof this.okFunction == "function")) {
      this.okFunction();
    }
  },
  hideOnEscape: function (e) {
    if (e.keyCode == 27) {
      this.destroy();
    }
  },
  init:  function (title, message, width)  {
    var self="DialogBox";
   //add this object to the array of dialog objects.
    this.dialogIndex = DialogBox.dialogObjects.length;
    DialogBox.dialogObjects[this.dialogIndex] = this;
    this.name = "Dialog_" + this.dialogIndex;
    this.timer = null;  //will get set to interval timer id so it can be cleared by destory() method.
    this.dialogContainerStyleProperty = null;
    this.dialogLayerId = "Dialog_layer_" + this.dialogIndex;
    this.dialogMessageId = "Dialog_message_" + this.dialogIndex;
    this.dialogOkayButtonId = "Dialog_button_" + this.dialogIndex;
    this.dialogContainerId = "Dialog_container_" + this.dialogIndex;
    this.dialogTitleId = "Dialog_title_" + this.dialogIndex;
    this.isDestroyed=false;
    var myCssText;            // myCssText styles the dialog box including title, text, ok button, etc.
    myCssText =
    '<STYLE type="text/css">\
     .dialogContainer {\
      position: absolute;\
      top:0px;\
      left:0px;\
      height: 100%;\
      width: 100%;\
      cursor: default;\
      opacity:1;\
      visibility:hidden;\
      z-index: 9999;\
    }\
     .transparency {\
      position: absolute;\
      height:' + document.documentElement.scrollHeight + 'px;\
      width: ' + document.documentElement.clientWidth + document.documentElement.scrollLeft + 'px;\
      cursor: default;\
      background-color: #ffffff;\
      opacity:.8;\
      z-index: -1;\
    }\  .dialogLayer {\
      position: absolute;\
      top:auto;\
      cursor: default;\
      background-color: #E4E4E4;\
      visibility:inherit; \
      border-style: groove;\
      border-width: 2px;\
      border-color: #FFFFFF;\
      text-align:center;\
      overflow:auto;\
    }\  .dialogTitle {\
      background-color: #3C56FF;\
      font-family: arial;\
      font-size: 9pt;\
      color: #FFFFFF;\
      font-weight: bold;\
      text-align:center;\
      position:relative;\
    }\
      .dialogMessage {\
      font-family: arial;\
      font-size: 9pt;\
      color: #000000;\
      font-weight: normal;\
      width:100%;\
      text-align:center;\
      position:relative;\
      padding:1em;\
    }\
   .dialogOkButton {\
      background-color: #D4D4D4;\
      color: #000000;\
      font-size: 9pt;\
      font-family: arial;\
      width: 70px;\
      height:	20px;\
      margin-left:auto;\
      margin-right:auto;\
      text-align:center;\
      position:relative;\
    }\
    </STYLE>';
    //<!--DialogBox layer covers everything visible. It's a block element which encloses everything used for mydialogBox. -->
    var tag = document.createElement("DIV");
    this.containerTag=tag;
    var containerId = "myContainer_" + this.dialogIndex;
    tag.className="dialogContainer";
    tag.id=this.dialogContainerId;
    tag.innerHTML = myCssText +
    "<div class='transparency'></div><table class='dialogLayer' id='" + this.dialogLayerId + "' border=0>" +
    "<tr><td class=dialogTitle id='" + this.dialogTitleId + "'>" + " " + title + "</td></tr>" +
    "<tr><td></td></tr>" +
    "<tr><td class=dialogMessage id='" + this.dialogMessageId + "'>" + message + "</td></tr>" +
    "<tr align=center><td width=100%><input type=button value='OK' class=dialogOkButton id=" + this.dialogOkayButtonId + "></td></tr>" +
    "</table>";
    document.getElementsByTagName("BODY")[0].appendChild(tag);

    var alertLayerStyle = tag.style;
    var theStyle = document.getElementById(this.dialogLayerId).style;
    this.dialogContainerStyleProperty= alertLayerStyle;
    if (!width || (typeof width == "undefined")) {
      //crudely guestimate dialog size...
      // assume 50 characters per line up to 25 lines
      // them bump width% of 5% for every x chars
      var thisText = (title.length > message.length) ? title.length: message.length;
      var charsPerLine = 50;
      var lines = parseInt(thisText/charsPerLine);
      var threshold = 15;
      var myWidth = 21;
      if (lines > threshold) {
        do {
          //bump line myWidth/charsperline up 20% till we hit maxes or acheive threshold
          charsPerLine = parseInt(charsPerLine*1.2);
          myWidth = parseInt(myWidth*1.2);
          threshold = parseInt(threshold*1.2);
          lines = parseInt(thisText/charsPerLine);
        } while(lines > threshold && myWidth < 100);
      }
      myWidth = (myWidth>100)? 100: myWidth; //100% is max!
      theStyle.width= myWidth+"%";
    } else {
      //width specified, use it.
      myWidth = width;
      theStyle.width = myWidth + "%";
    }
    theStyle.left = parseInt((100 - myWidth)/2)+"%";

    //attach the hide method to the okay button & to press of ESC key
    var buttonTag = tag.getElementsByTagName("INPUT")[0];
    buttonTag.addEventListener("click", DialogBox.hide.bind(this),"true");
    document.addEventListener("keydown", DialogBox.hideOnEscape.bind(this), false);
    
    // apply the adjustFunction, if specified
    if (typeof adjustFunction == "function") {
      adjustFunction(tag);
    }
    //set the theStyle proerty & make the dialog visible.
  //  alertLayerStyle.visibility="visible";
  //  document.getElementById("myButton").focus();
    return;
  }, //init method
} //dialogBox object
// -----------------------------------------------------------------------------------



//------------------------------------ DialogBox.init.prototype.show() --------------------------------------------------
//  FUNCTION  :   DialogBox.init.prototype.show
//  PURPOSE   :   Displays a dialog box for this object
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   okFunction  - Optional function to call when okay button is clicked.
//  RETURNS   :   null;
DialogBox.init.prototype.show = function(okFunction) {
  var self = "DialogBox.init.prototype.show";

  var styleProp = this.dialogContainerStyleProperty;
  var okButton, theOkFunction
  styleProp.visibility = "visible";

  //theOkFunction = (!okFunction || typeof okFunction == "undefined") ? function () {this.destroy()}.bind(this): function() {this.destroy().bind(this); okFunction};
  okButton = document.getElementById(this.dialogOkayButtonId);
  if (okFunction && typeof okFunction == "function") {
    this.okFunction = okFunction; //save reference so it can be removed by destroy....
  }
  okButton.focus();
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ DialogBox.init.prototype.destroy() --------------------------------------------------
//  FUNCTION  :   DialogBox.init.prototype.destroy()
//  PURPOSE   :   Called when done with dialog. Deletes/removes what it can for the dialog box (DOM elements, 
//                    event listener, timer, etc).  If this.okFunction is a function, calls it.
//  ASSUMES   :   -
//  AFFECTS   :   Dialog object
//  PARAMETERS:   -
//  RETURNS   :   null
DialogBox.init.prototype.destroy = function() {
  //remove the event listener & the DHTML Nodes
  var self = "DialogBox.init.prototype.destroy";
  Core.enter(self,"this.name" + this.name);
  
  var okButton;
  
  if (typeof this.isDestroyed == "undefined" || !this.isDestroyed) {
    this.isDestroyed = true;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    okButton = this.containerTag.getElementsByTagName("INPUT")[0];
    okButton.removeEventListener("click",this.hide,"true");
    document.removeEventListener("keydown",this.hideOnEscape,"true");
    
    if (typeof this.okFunction == "function") {
      this.okFunction();
    }
    this.containerTag.parentNode.removeChild(this.containerTag);
    DialogBox.dialogObjects.splice(this.dialogId - 1,1);
    }
  return null;
}
//-----------------------------------------------------------------------------------------------------------------------


// ------------------------- end of CORE object/fuctions -------------------------


//=============================== MyBoard Object ==========================================================================
  // object for all the myBoard specfic properties/methods
var MyBoard = {
  // CONSTANTS:
  idPrefix:                 "ID: ",                                  //Prefix inserted before userId's to form display name. stripped off by event handler.
  boardsUrl :               "http://www.waterkant.net/suriname/forum",         //where to check for lists of other boards, most current version of MyBoard, etc.
  version :                 "1.0",                                   //version of this script.
  isCurrentVersion:             "",                                  //set to true or false when latestVersion is updated in about Myboard.
  latestVersionMessage:         null,                                //Latest version message retrieved from boardsURL via about MyBoard menuitem.
  lastUpdateCheckDate:          null,                                //date of last update check via about MyBoard menu item
  latestVersion:                null,                                //latest version of MyBoard (retrieved via about MyBoard menu item)
  MyBoardLatestVersionDate:     null,                                //The date of the latest version was released (retrieved via about MyBoard menu)
  otherSupportedBoardLinks:     [],                                  //other supported sites (retrieved via About Myboard menu)                                                                    
  otherNotSupportedBoardLinks:  [],                                  //other sites (not supported by MyBoard) for hobbyists in seattle (retrieved wtih about menu)
  supportedDomains:         ["www.www.waterkant.net/suriname",
                             "www.www.waterkant.net/suriname"],                  //Domains currently supported. All others are ignored.
  boardIds :                 ["tna", "tnaxx"],                       // Board ID's - Used to build persistent storage key names to keep keys seperate
  boardIdsByDomain:         { "www.waterkant.net/suriname":"tna",              // Constant lookup array for board id's.
                              "www.waterkant.net/suriname" : "tnaxx"},
  boardId :                  null,                                   //gets set to Id for this board. Used to keep keys seperate;
  profilePage:               "/profile.php?id=",                     //string to build profile page url.
  linkSuffix:                "?MyBoardLink=",                         //suffix to append to post mgmt links (with linkType apppended to this
                                                                     //  so that MyBoard knows page was referred by MyBoard Link.
                                                                     //  linkType include: (searchUser, postReview, showTopics, showPosts)
                                                                     //  linkSuffix is appended immediately following any of the board link constructs
                                                                     //  (eg it's the first MyBoard custom component of the link)
  isLoaded   :               false,                                 //gets set true when main.init is done. used to detect reprocessing of page.
  searchPage :               "/search.php",                          //string to build search page url
  postReviewPage :           {"tna"    : "/review_post.php?fid=",    //string to build post review page url for tna
                              "tnaxx"  : "/post.php?fid="},          //string to build post review page url for tnaxx
  showPostsString:  "search.php?action=show_user_posts&user_id=",    //String to build show posts button.
  showTopicsString: "search.php?action=show_user_topics&user_id=",   //String to build show Topics button
  PostClassPattern:          new RegExp("(^| )post( |$)"),           // reg expression to use for checking if element is a post class
  postClassElementName:      "DIV",                                  // name of element node expected to contain PostClass
  TopicPostClassPattern:     new RegExp("(^| )topicpost( |$)"),      //reg expression to use for checking if a topicpost class
  topicPostClassElementName: "DIV",                                  // name of element node expected to contain TopicPostClass
  ReplyPostClassPattern:     new RegExp("(^| )replypost( |$)"),      //reg expression to use for checking if a replypost class
  replyPostClassElementName: "DIV",                                  // name of element node expected to contain replypost class
  IconClassPattern:          new RegExp("(^| )icon( |$)"),           // reg expressoin to use for checking if its the icon div
  iconClassElementName:      "SPAN",                                 // name of element node expected to contain icon class
  menuNavLinkId:             "MyBoard_menuNavLinkNode",              // id property for MyBoard menu nav link node I create & put in brd-navlinks.
                                                                     //The following prefix's are uses to build classnames which are set for
                                                                     //DOM nodes that get event handlers. The prefix gets information
                                                                     //that the event handler can then use to detrmine which MyBoard object to use.
  longTextButtonClassName:       "MyBoard_longTextButton",           //class to use for buttons with longer text so then can be reduced with a style.
  listButtonClassNamePrefix:     "MyBoard_list_",                    //prefix gets List shortname appended & then is added to class for toggle button so event hndler finds list
  postViewStateButtonClassPrefix:"MyBoard_postViewState_",           //prefix used to build classname for post state toggle button. The PostObj index is appended.
  menuObjectClassNamePrefix :    "MyBoard_menuObj_",                 //prefix used to build classname for menu objects. What is appended depends on the menu.
  toggleBlockedClassName:        "MyBoard_Toggleblocked_BLOCKED_ADS",//ClassName to tell event listener to toggle in/out of blocked_ads list.
  toggleBlockedClassNamePrefix:  "MyBoard_Toggleblocked_",           //prefix used to build classname for toggleblocked element on summarytopic pages.
  uIObjects:                     [],                                 //array of UiObjects - one for each Ui Menu, Dialog, & Button
  uIObjectsById:                 [],                                 //associative array of uIObjects by the UIObject's id.
  lists:                         [],                                 //Array of all List  objects.
  listsByShortName:              [],                                 // gets populated by shortName with list  objects.
  isListsPopulated:              false,                             //gets set true when lists are populated from persistgent storage.
  isUsersPopulated:              false,                             //gets set when users list is populated from persistent storage.
  listCss:                       null,                              //CSS for lists.
  displayGroups:                 ["MyBoard_lists",                   // Groups of lists - each list can only be in one group. UI that shows all lists, does it
                                  "MyBoard_hides"],                  //    in the order of displayGroups (eg first the MyBoard_lists group, then MyBoard_hides group).
  users:                         [],                                 //array of all user  objects.
  usersByUserName:               [],                                 //lookup array of all user  objects by userName (if userName known);
  usersByUserId:                 [],                                 //lookup array of all user  objects by userId (if userID known);
  isUsersDirty:                  false,                             //set to true anytime user data has been updated & reset to false when data is saved to persistent storage
  isListsDirty:                  false,                             //set to true anytime any list data has been updated & reset to false when data is saved to persistent storage
  NoneList:                      null,                              //gets set to the NONE list when the lists are setup.
  savedUserList:                 null,                              // gets set to retrieved user list from persistent storage.
  savedUsersListKeyPrefix:       "MyBoard.savedUsers_",               //Prefix - gets boardId appended to build user savedUsersListKey
  savedUsersListKey:              null,                              //persistent storage key for saved user  objects.
  listDefinitions:                                                  //The definitions used to create each list for this board (passed to MyBoard.makeList()
                                                                    //the values for each array are the parameters to pass to the List constructor function 
                                                                    //(except that the listkey parameter also gets MyBoard.boardId prepended to it to make the 
                                                                    // key unique to the board).
                                                                    //IMPORTANT: The order is important. lists created first take higher precedence when 
                                                                    //           deciding which list to apply for a topic/post.
                                                                    //           to add a new list, create a new entry in the MyBoard.listDefinitions array at the location
                                                                    //           where you want the list to apply w/r to the other lists. 
       [["NONE",      "Not On Any list",        "#ffffff",    "#000000", null,                           "userName", false, true,false],
        ["BLOCKED_ADS","Blocked Ads",           "Gainsboro",  "#00579C", "_BLOCKED_ADS_list",             "userName", false, true,true],
        ["IGNORED",   "Ignored Users",          "Gainsboro",  "#00579C", "_IGNORE_list",                  "userId",   true, false,true],
        ["NOW",       "See Now",                "Pink",       "#00579C", "_NOW_list",                     "userName", false, true,false],
        ["ATF",       "All Time Favorites",     "Gold",       "#00579C", "_ATF_list",                     "userName", false, true,false],
        ["REPEAT",    "Seen and Want To REPEAT","LightBlue",  "#00579C", "_REPEAT_list",                  "userName", false, true,false],
        ["SPECIAL",   "Waiting For Special",    "Aquamarine", "#00579C", "_SPECIAL_list",                 "userName", false, true,false],
        ["CLEARED",   "References Cleared",     "Khaki",      "#00579C", "_CLEARED_list",                 "userName", false, true,false],
        ["TDL",       "To Do",                  "LightGreen", "#00579C", "_TDL_list",                     "userName", false, true,false],
        ["DONE",      "One And DONE",           "LightGrey",  "#00579C", "_DONE_list",                    "userName", false, true,false],
        ["WAITING",   "Hot, waiting for reviews/menu/offering upgrade","LightGoldenRodYellow",  "#00579C","_WAITING_list","userName", false, true,false],
        ["MAYBE",     "Maybe, if slow",         "AliceBlue",  "#00579C", "_MAYBE_list",                   "userName", false, true,false],
        ["DOUBTFUL",  "Doubtful, but not blocking yet", "LightGrey","#00579C", "_DOUBTFUL_list",          "userName", false, true,false]],
  listDefinitionsOffsets: {                                         //offsets inot listDefinitions arrays for these lists fields.
    shortName:            0,
    longName:             1,
    backgroundColor:      2,
    color:                3,
    listKey:              4,
    userKeyType:          5,
    appliesToPosts:       6,
    appliesToTopics:      7,
    hides:                8,
  },
  pesistentUserDataSaveCount: 0,                                          //number of times persisent user data is saved. used for stats.
  pesistentListDataSaveCount: 0,                                          //number of times any persistent list is saved. used for stats.

};
MyBoard.uIObject = function(objectId, uIType, tag) {
    this.id =                                    objectId;                 // Id to put on  node in UI portion of DOM tree
    this.tag =                                   tag;                     // highest element node for this specific ui object
    this.uIObjectIndex =                         MyBoard.uIObjects.length; // index into MyBoard.uIObjects array of this object.
    MyBoard.uIObjects[this.uIObjectIndex] =      this;                    // add me...
    MyBoard.uIObjectsById[objectId] =            this;                    // associative array so we can lookup when we have the id
    this.uIType =                                uIType;                    // type of interface for this object ("button", "menu", "dialog")
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ Page Object -----------------------------------------------------------------------
// MyBoard.Page object tracks information about the current page we're processing.
MyBoard.Page = {
  posts:                    [],            //array of the post  objects for this page.
  postsByPostId:            [],            //associateive array of post  objects referenced by postId
  postsByUserName:              [],            //associative array of posts by user in this. Two dimensional - [user, n], where n=the nth most recent
                                            //post found for that user.
  pageType:                 null,          //string with pageType for this page (viewTopic, viewForum, search, searchResults, emailForm, rules,
                                           //                         profile, postReview, post, index, userList,gallery, uploadImage, 
                                           //                         register, login, redirecting, privateMessage)
  pageNumber:               1,              //page Number of this page. If no &p= on URL, then 1.
  forumId:                  "not set",     //for viewForum pages, the forum ID (id= on url); for viewTopic pages, the formu id that the topic is in.
  ForumName:                "",            //for viewForum pages, the name of the Forum. for viewTopic pages, the name of the forum the topic is in.
  targetForumId:            null,          //for post pages, the forum to receive post. (fid= on url)
  unknownAction:            false,          //true if we encounter an unknown action= string on a page we do understand (typically search)
  isCustomSearchResults:    false,         //true if current page has results of custom search, false otherwise. Show_new, etc are not custom.
  domain:                   "",             //will be set to domain for this page (eg www.tnaboard.com
  url:                      "",             //will be set to url for this page
  pathname:                 "",             //will be set to pathname for this page
  queryStrings:             "",             //will be set to the queryStrings on the URI for the page
  search:                   "",             //will be set to search strings for this page's (eg name=value after ?)
  referredByMyBoardLink:    false,         //will be set true if this page was loaded by clicking a MyBoard management link button
  hasResultsByTopic:        false,         //will be set to true if this is a page with search results by topic
  hasResultsByPost:         false,         //will be set to true if this is a page with search results by post
  hasViewTopicPosts:        false,         //will be set to true if page has viewTopic posts.
  hasSummaryTopicPosts:     false,         //will be set to true if page has summaryTopic posts.
  isAtAGlanceSupported:     false,         //will be set to true for pages which the At a Glance menu is available.
  isProviderAdForum:        false,         //will be set true if page is a viewForum page for provider ads
  isProviderAdTopicView:    false,         //will be set true if page is a viewTopic page for a provider ad.
  skipFurtherProcessing:   false,         //set to true by Page.init method if this page is not to processed further after the .init method completes.
  hiddenPostsCount:         0,              //count of hidden posts on this page.
};
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.Page.getForumInformationFromViewForumPage() --------------------------------------------------
//  FUNCTION  :   MyBoard.Page.getForumInformationFromViewForumPage(node)
//  PURPOSE   :   Determines which forumId and forumName for this 'viewForum' page
//  ASSUMES   :   page is a viewForum page.
//  AFFECTS   :   Sets the .forumId and .forumName properties.
//  PARAMETERS:   node  - DOM element at top of tree for this search. can be the document element. Assumed to have a a forum page in descendents.
//  RETURNS   :   -
MyBoard.Page.getForumInformationFromViewForumPage = function (node) {
  var self = "getForumInformationFromViewForumPage";

  var ThisPage, tags, crumbs, tag;

  ThisPage = MyBoard.Page;
  tags = node.getElementById("brd-crumbs-top");
  crumbs = Core.getElementsByClass("crumblast", tags);
  if (crumbs.length == 1) {
    tags = crumbs[0].getElementsByTagName("A");
    if (typeof tags == "undefined" || tags == null || tags.length != 1) {
      Core.error(self, "expected to find a DOM element with class 'crumblast' bailing...");
    } else {
      ThisPage.forumId = ThisPage.queryStrings.hasOwnProperty("id") ?  ThisPage.queryStrings["id"] :  ThisPage.queryStrings["fid"];
      ThisPage.forumId = ThisPage.forumId * 1;
      if (isNaN(ThisPage.forumId) || ThisPage.forumId <= 0) {
         Core.error(self, "missing or unknown forum id for ViewForum page: '" + ThisPage.forumId + "' isNaN:" + isNaN(ThisPage.forumId));
         return;
      }
      ThisPage.forumName = tags[0].textContent
      ThisPage.isProviderAdForum = ThisPage.forumName.indexOf("Provider Ads") >= 0;
    }
  } else {
    Core.error(self, "expected to find exactly 1 crumblast, found: " + crumbs.length);
  }
  return;
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.Page.getForumInformationFromViewTopicPage () --------------------------------------------------
//  FUNCTION  :   MyBoard.Page.getForumInformationFromViewTopicPage(node)
//  PURPOSE   :   Determines which forumId and forumName for this *** 'viewTopic' *** page (uses brd-crumbs)
//  ASSUMES   :   page is a viewTopic page or a search results page with results by topic.
//  AFFECTS   :   MyBoard.Page object
//  PARAMETERS:   node - DOM element node that has a viewTopic page in it's descendants
//  RETURNS   :   null
MyBoard.Page.getForumInformationFromViewTopicPage = function (node) {
  var self = "getForumInformationFromViewTopicPage";

  var tags = node.getElementById("brd-crumbs-top");
  var crumbs = Core.getElementsByClass("crumb", tags);

  if (crumbs.length == 3) {
    tags = crumbs[1].getElementsByTagName("A");
    if (typeof tags == "undefined" || tags == null || tags.length != 1) {
      Core.error(self, "expected to find one tag with link to forum.");
    } else {
        MyBoard.Page.forumId = 1 * Core.getValueForUrlQueryString(tags[0].href,"id");
        MyBoard.Page.forumName = tags[0].textContent;
    }
  } else {
    Core.error(self, "expected to find exactly 3 crumbs, found: " + crumbs.length);
  }
  return;
}
//-----------------------------------------------------------------------------



//------------------------------------Core.enumerateElement() --------------------------------------------------
//  FUNCTION  :   Core.enumerateElement(element, propertyName1, ...)
//  PURPOSE   :   Returns string with the tagName, class, ID & any propertyname1... properties of an DOM element.
//  ASSUMES   : -
//  AFFECTS   : -
//  PARAMETERS:   element - a DOM element.
//                property1, ...  -   OPTIONAL. property names to enumerate.
//  RETURNS   : - string which was added to the log.
Core.enumerateElement = function (element) {
  var self = "Core.enumerateElement";
  
  var result = "";
  
  result += "tagName:" + ((element.tagName) ? element.tagName + " ": "null ");
  result += "className:" + ((element.className) ? element.className + " ": "null ");
  result += "id:" + ((element.id) ? element.id + " ": "null ");

  //add on any additional
  for (var i = 1; i< arguments.length; i++) { 
    Core.log(self,"argument:" + arguments[i] + " object:" + element[arguments[i]]);
    if (typeof element[arguments[i]] == "object") {
      result += element[i] + Core.enumerateAllProperties(element[arguments[i]]);
    } else {
      result += arguments[i] + ((element[arguments[i]]) ? element[arguments[i]] + " ": "null ");
    }
  }
  return result;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------MyBoard.getPostDiv() --------------------------------------------------
//  FUNCTION  :   MyBoard.getPostDiv(element)
//  PURPOSE   :   Finds the DIV DOM element for the post that element is part of. The post may be a summaryTopic, a viewTopic Post or reply,
//                or a row of search results.
//  ASSUMES   : -
//  AFFECTS   : -
//  PARAMETERS:   element - a DOM element that is the post Div (or its hiddenDiv), or a descendent of the post div (or its hddenDiv).
//  RETURNS   :   DOM element for the post Div if postDiv found, otherwise returns NULL;
MyBoard.getPostDiv = function (element) {
  var self = "MyBoard.getPostDiv";
  Core.enter(self, "element tag:" + element.tagName + " class:" + element.className);
  
  var done, result;
  
  // three possible cases:
  //  1) we are at or within the PostDiv DOM subtree
  //  2) we are at or within the hiddenDiv DOM subtree
  //  3) we are not within either the PostDiv nor hiddenDiv subtrees (return null);
  
  // start at this element and go up until we encounter an elment from which we can determine which case.
  done = false;
  result = element;
  while ( !done) {
    if (result.nodeType != 1) {
      result = result.parentNode;
    } else if (Core.isInClasses("main-item", result.className) || Core.isInClasses("post", result.className)) {
      //"main-item" is for summaryTopics (forum, or search results).
      //"post" is for viewTopic (can be reply post or topicpost)
      // eitherway, we're done- this is the postDiv
      done = true;
      //confirm it's a div - if not, bail...
      if (result.tagName != "DIV") {
        Core.error(self, "found 'post' node, but not a DIV tag: " + result.tagName);
        result = null;
      }
    } else if (Core.isInClasses("MyBoard_hideDiv", result.className)) {
      //element was within the hiddenDiv and result now points to the hiddenDiv. The post div is the previous sibbling.
      result = result.previousSibling;
    } else if (result == document) {
      //at the top, didn't find it.
      Core.log(self,"Didn't find PostDiv");
      break;
    } else {
      result = result.parentNode;
    }
  }
  return result;
}
//-----------------------------------------------------------------------------------------------------------------------



//----------------------------------------MyBoard.buildTableRowsForPagePostsByList() -----------------------------------------------------
//  FUNCTION  :   MyBoard.buildTableRowsForPagePostsByList(nCol, filterProperty)
//  PURPOSE   :   builds a string, with HTML TR/TH/TD tags, suitible for inclusion within html table tags with the detailed stats 
//                  for all lists that apply to current, 
//  ASSUMES   :   Page has been processed.
//  AFFECTS   :   -
//  PARAMETERS:   nCol            - number of columns for the table rows.
//                filterProperty  - Optional. if specified, the name of a List  Object property (like "hides") to use
//                                    for filtering (eg if specified, then only include if list  objects [filterProperty] is true.
//  RETURNS   :   string with HTML suitable for inclusion within <table> & </table> tags.
MyBoard.buildTableRowsForPagePostsByList = function(nCol, filterProperty) {
  var self = "MyBoard.buildTableRowsForPagePostsByList";

  var tableRows, ListObj, filtered, addedCount, fontSizeStr, postStr, myNewLine;
  
  //walk each list that applies on this page, building the header row & then, if at least one post on the list, calling bulidPostSummaryTableRows 
  //  to build the rows for that list with links for the posts on this page. 
  tableRows= "";
  filtered = false;
  for (var i=0; i < MyBoard.lists.length; i++) {
    ListObj = MyBoard.lists[i];
    //only include if the list applies for this page
    if (typeof ListObj.applies[MyBoard.Page.pageType] != "undefined" && ListObj.applies[MyBoard.Page.pageType]) {
      // check for filtering - do nothing for this column if filtered
      if (typeof filterProperty != "undefined") {
        filtered = ListObj[filterProperty];
      }
      if (!filtered) {
        // a new list.
        fontSizeStr = (ListObj.posts.length==0) ? " style='font-size:75%; '" : "";
        postStr = (ListObj.posts.length==1) ? " post" : " posts";
        tableRows +=  "<tr class='" + ListObj.listClassName + "'><th colspan=" +
                  nCol +  fontSizeStr + ">" + ListObj.longName + " (" + ListObj.shortName + ") " + ListObj.posts.length +
                  postStr + "</th></tr>";
        if (ListObj.posts.length>0) tableRows += ListObj.buildPostLinkTableRows(nCol);
      } //if !filtered
    }
  } //for each list
  return tableRows;
}
//-----------------------------------------------------------------------------



// --------------------------- User Object Area ----------------------------------------------
//------------------------------------ User() --------------------------------------------------
//  FUNCTION  :   User(userName, userId)
//  PURPOSE   :   Constructor function for user objects. Constructs user Object for user with userName and/or userId
//                Either or both of userName/userId must be provided.  Any values provided must be unique for this board.
//  ASSUMES   :   -
//  AFFECTS   :   MyBoard.users[], MyBoard.usersByName[], MyBoard.usersById[]
//  PARAMETERS:   userName        - string userName for this user. "" if not known.
//                userId          - string userId of this user - "" if unknown.
//                userKeyType  - string "userName" or "userId". specifies what type of key is in userKey.
//  RETURNS   :
var User = function (userName, userId) {
    var self = "User constructor function";
    this.lists=               [];         //array of list (objects) for this user. Lists are added in the order encountered.
                                           //  but a maximum of one list for each MyBoard.displayGroup[].
                                           //the first entry is the list used to style posts by this user.
    this.posts=               [];         //array of post  objects for this user. posts are placed in the array in the order
                                          // they are encountered when processing the page.
    this.userIsIgnored=       false;      // set to true if posts by this user are to be ignored.
    this.userTitle=           null;       //title for this user on this board
    this.userStatus=          null;       //status for this user on this board
    this.userProfileHref=     null;       // will get to set to href for user profile when we have a UserId;
    this.userProfileHrefTitle =           // title to display for tag setup with userProfileHref;
      "Click to access member profile";
    this.lastAdHref=          null;       //the last ad post (seen in an ad forum for this user). If they have an ad on the
                                           //current page, it will be same as .posts[0]
    this.lastAdHrefTitle =                // title to display for tag setup with lastAdHref;
      "Click to access the last ad MyBoard has seen for this provider";
    this.isPersistent=        false;      //gets set to true if this user is added to any other object which is persistent.
    this.isDirty=             false;      //gets set to true when any user object is updated and the data hasn't been saved.
                                           //work in progress.... intend to use when implementing MUTEX
                                           
    //verify at least one of userName & userId are provided & that any value provided is unique.

    this.userName = null;                                 //userName on this board
    if (userName && (typeof userName != "undefined")) {
      this.userName = userName;
      if (typeof MyBoard.usersByUserName[this.userName] != "undefined") {
        //value already exists. bail & throw exception
        Core.error(self, "Attempt to create new user object for existing userName: " + this.userName, true);
      }
    }

    this.userId = null;                                   //userId on this board
    if (userId && (typeof userId != "undefined")) {
      this.userId = userId;
      this.userProfileHref = MyBoard.profilePage + userId;
      if (typeof MyBoard.usersByUserId[this.userId] != "undefined") {
        //value already exists. bail & throw exception
        Core.error(self, "Attempt to create new user object for existing userId: " + this.userId, true);
      }
    }

    if (!this.userName && !this.userId) {
      //neither parameter specified and unique. bail & throw exception
      Core.error(self, "Expected at least one of userName/userId to be provided & unique. username: " + userName + " userId:" + userId, true);
    }
    // a valid user specified, setup the MyBoard user arrays entries
    this.MyBoardUserIndex=    MyBoard.users.length; //index of this object in MyBoard.users array.
    MyBoard.users[MyBoard.users.length] = this; //add this object to the users arrays...
    if (this.userName) {
      MyBoard.usersByUserName[this.userName] = this;
    }
    if (this.userId) {
      MyBoard.usersByUserId[this.userId] = this;
    }
    //Core.log(self,"MyBoard.users.length:" + MyBoard.users.length + " added user; " + this.userDisplayInf());
}
//--------------------------------------------------------------------------------------


//------------------------------------ User.prototype.setDirty() --------------------------------------------------
//  FUNCTION  :   User.prototype.setDirty()
//  PURPOSE   :   marks this user as 'dirty' (eg changed since load from persistent storage).
//  ASSUMES   :   -
//  AFFECTS   :   this user object, MyBoard object
//  PARAMETERS:   -
//  RETURNS   :   -
User.prototype.setDirty = function () {
  var self = "User.prototype.setDirty";
  this.isDirty = true;
  if (this.isPersistent) {
    if (!MyBoard.isUsersDirty) {
      Core.logWithHeader(self,"setting dirty - User: " + this.userDisplayName() + " dirty, causing MyBoard.isUsersDirty to change to TRUE")
    }
    MyBoard.isUsersDirty = true;
  }
}
//-----------------------------------------------------------------------------------------------------------------



//------------------------------------ User.savePersistentData() --------------------------------------------------
//  FUNCTION  :   User.savePersistentData()
//  PURPOSE   :   Saves the persistent data in users to persistent storage for all persistent users;
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   -
User.savePersistentData = function() {
  var self = "User.savePersistentData";

  var UserSavInf = function (userName, userId, lastAdHref) {
    this.userName = userName;
    this.userId = userId;
    this.lastAdHref = lastAdHref;
  }
  var UserObj, UserSaveObj, usersWithId=0, usersInLists = [];
  var dirtyCount = 0, str="";

  //Core.log(self, "MyBoard.isUsersDirty:" + MyBoard.isUsersDirty + ((MyBoard.isUsersDirty) ? " sone data dirty - save required " : " Nothing dirty - nothing to save"));

  for (var i=0; i < MyBoard.users.length; i++) {
    UserObj = MyBoard.users[i];
    if (UserObj.isPersistent) {
      if (UserObj.isDirty) Core.log(self, "Persistent 'dirty' user:" + UserObj.userName);
      dirtyCount = (UserObj.isDirty) ? ++dirtyCount : dirtyCount;
      usersInLists[usersInLists.length] = new UserSavInf(UserObj.userName,UserObj.userId, UserObj.lastAdHref);
      UserObj.isDirty = false; //reset to show it's no longer dirty...
      if (UserObj.userId) {
      //Core.log(self,"User with userId found: " + UserObj.userDisplayInf());
        usersWithId++;
      } else {
        str += UserObj.userDisplayName() + " Missing ID, ";
      }
    }
  } //for 
  
  if (dirtyCount > 0) {
    //temporary checks for now....
    if (!MyBoard.isUsersDirty) {
      Core.error(self, "MyBoard.isUsersDirty is false, but dirty users found - saving them...");
    }
    MyBoard.pesistentUserDataSaveCount++;
    Core.logWithHeader(self, "Save Count (" + MyBoard.pesistentUserDataSaveCount + ") total users (" + MyBoard.users.length + ") to save:" + 
                              usersInLists.length + " (" + usersWithId + " have id. dirtyCount:" + dirtyCount + ")");
    GM_setValue(MyBoard.savedUsersListKey, usersInLists.toSource());
    MyBoard.isUsersDirty = false;
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ User.prototype.userDisplayName() --------------------------------------------------
//  FUNCTION  :   User.prototype.userDisplayName()
//  PURPOSE   :   build username for display. IF userName is available, users that. Otherwise, builds name by MyBoard.idPrefix + userId
//  ASSUMES   :   page has been processed
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   string with user Name and user Id (if available)
User.prototype.userDisplayName = function() {
  var self = "User.prototype.userDisplayName";

  if (this.userName  && (typeof this.userName != "undefined")) {
    result = this.userName;
  } else if (this.userId  && (this.userId != "undefined")) {
    result = MyBoard.idPrefix + this.userId;
  } else {
    Core.error(self, "Expected either userName or userId to be defined, but neither is.");
    result=null;
  }
  return result;
}
//--------------------------------------------------------------------------------------



//------------------------------------ User.prototype.checkAndUpdateLastAdHref() --------------------------------------------------
//  FUNCTION  :   User.prototype.checkAndUpdateLastAdHref(href)
//  PURPOSE   :   Compares href to any existing lastAdHref for this user & updates the user object if href is newer.
//  ASSUMES   :   -
//  AFFECTS   :   this user objects lastAdHref & isDirty properties
//  PARAMETERS:   -
//  RETURNS   :   -
User.prototype.checkAndUpdateLastAdHref = function(href) {
  var self="User.prototype.checkAndUpdateLastAdHref";
  Core.enter(self, "href:" + href);
  
  var queryStrings, hrefTopicId, existingTopicId;
  
  if (this.lastAdHref) {
    //We already have one, determine which one is newer.
    queryStrings = Core.getQueryStrings(this.lastAdHref);
    existingTopicId = (queryStrings.hasOwnProperty("id")) ? Number(queryStrings["id"]) : 0;
    queryStrings = Core.getQueryStrings(href);
    hrefTopicId = (queryStrings.hasOwnProperty("id")) ? Number(queryStrings["id"]): 0;
    if (hrefTopicId > existingTopicId) {
      //href is newer....
      this.lastAdHref = href;
      this.setDirty();
    } 
  } else {
    // don't currently have one - use href
    this.lastAdHref = href;
    this.setDirty();
  }
}
//--------------------------------------------------------------------------------------



//------------------------------------ User.prototype.userDisplayInf() --------------------------------------------------
//  FUNCTION  :   User.prototype.userDisplayInf()
//  PURPOSE   :   Builds string with information for this user.
//  ASSUMES   :   page has been processed
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   string with user Name and user Id (if available)
User.prototype.userDisplayInf = function() {
  var self = "User.prototype.userDisplayInf";
  
  var result;

  result = "userName: " + ((this.userName  && (typeof this.userName != "undefined")) ? "'" + this.userName + "' " : "null ");
  result += "userId: " + ((this.userId  && (typeof this.userId != "undefined")) ? "'" + this.userId + "' " : "null ");
  result += (this.isDirty) ? " ** IS DIRTY **" : " is NOT dirty ";
    
  //add the lists:
  result += " Lists: ";
  for (var i=0; i< this.lists.length; i++) {
    result += this.lists[i].shortName + ", ";
  }  
  return result;
}



//------------------------------------ MyBoard.lookupUserObject() --------------------------------------------------
//  FUNCTION  :   MyBoard.lookupUserObject(userKey)
//  PURPOSE   :   Returns UserObj that is referenced by userKey. userKey can be either userName or userId.
//  ASSUMES   :   For any user object, there are no other user objects with same userName or userId
//  AFFECTS   :   -
//  PARAMETERS:   - userIdentifier   - a unique identifier for this user. can be either a userId or a userName.
//  RETURNS   :   the user object for the user, if found. Otherwise null;
MyBoard.lookupUserObject = function(userIdentifier) {
  var self = "MyBoard.lookupUserObject";
  //Core.log(self,"userIdentifier:'" + userIdentifier + "'");
  var result = null;

  if (MyBoard.usersByUserName[userIdentifier] && (typeof MyBoard.usersByUserName[userIdentifier] != "undefined")) {
    result = MyBoard.usersByUserName[userIdentifier];
  } else if (MyBoard.usersByUserId[userIdentifier] && (typeof MyBoard.usersByUserId[userIdentifier] != "undefined")) {
    result = MyBoard.usersByUserId[userIdentifier];
  }
  if (result) {
    //Core.log(self, "found: " + result.userDisplayName());
  } else {
    //Core.log(self, "not found -returning null");
  }
  return result;
}
//---------------------------------------------------------------------------------------



// --------------------------- MyBoard.whichListForUser() ----------------------------------------------
//  FUNCTION  :   MyBoard.whichListForUser(UserObj, listGroupFilter)
//  PURPOSE   :   Determines which list is the current list for UserObj.
//  ASSUMES   :   - Lists are loaded in MyBoard.lists in priority order, UserObj has a valid user.
//  AFFECTS   :   - none
//  PARAMETERS:   - UserObj         - User Object.
//                - listGroupFilter[]  - Array of strings for the list display groups. If specified, only lists
//                                       in the groups are included. If not specified all lists are included.
//  RETURNS   :   List  Object for the highest priority list for this user within the constraints of listGroupFilter. 
//                null if user not found in any of the groups as constrained by listGroupFilter. 
//                Note: The NONE list is part of the "MyBoard_Lists" group. Search of all groups for a user who is 
//                only in the NONE list, results in the NONE list  object. Search for the same user of lists filterd 
//                by "MyBoard_Hides" would result in null, since that user is not in any of the hides lists.
//
MyBoard.whichListForUser = function (UserObj, listGroupFilter) {
  var self = "MyBoard.whichListForUser";
  
  var listWithUser, ListObj, filtering;
  
  //set filtering to true if any filtering of lists
  filtering = (listGroupFilter && (typeof listGroupFilter != "undefined"));
  
  listWithUser = null;
  for (var i=0; i<UserObj.lists.length; i++) {
    ListObj = UserObj.lists[i];
    if (filtering) {
      for (var j=0; j<listGroupFilter.length; j++) {
        if (ListObj.displayGroup == listGroupFilter[j]) {
          listWithuser = ListObj;
          break;
        }
      }    
    } else {
      listWithUser = ListObj;
    }
    if (listWithUser) break;
  } //for each list
  Core.log(self, "User: " + UserObj.userDisplayName() + " whichListForUser: " + ((listWithUser)? listWithUser.shortName : "null"));
  return listWithUser;
}
//---------------------------------------------------------------------------------------



// --------------------------- List Object ----------------------------------------------
//  FUNCTION  :   List
//  PURPOSE   :   Constuctor function for list objects
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   - shortName       - String to use for shortName
//                  longName        - String to use for longName
//                  color           - String with valid css text for the style.color property. Used to set color for text in UI for this list.
//                  backgroundColor - String with valid css text for the style.backgroundColor property. Used to set color for background of ui for this list.
//                  listKey         - String with the key for the GM_getValue & GM_setValue calls to access/store this list in persistent storate
//                                    "" if list is a list which is not stored in persistent storage.
//                  userKeyType  - String with the type of userKey used for this list. Choices are "userId" & "userName"
//                  appliestoPosts  - boolean, true if this list applies to posts (like ignore list), false otherwise.
//                  appliestoTopics - boolean, true if this list applies to topics, false otherwise
//                  hides           - boolean, true if this is a list that causes things to be hidden (IGNORED for example), false otherweise.
//  RETURNS   :   list object.
var List = function (shortName, longName, backgroundColor, color, listKey, userKeyType, appliesToPosts, appliesToTopics, hides) {
      var self = "List Object Constructor";

      if (arguments.length == 0) return;  // if called with no args, just setting up prototype, so do nothing.

      Core.enter(self, "list:" + shortName + " listKey:" + listKey + " userKeyType:" + userKeyType);
      
      //define the properties....
      this.isDirty=          false;                            //set to true if this list has been updated since last saved to peristent storage.
      this.listKey=          listKey;                           // string listkey used for GM_setValue/GM_getValue, if list is persistent.
      this.isPersistent=     Boolean(listKey);                  // set to true only if this list is persistent...
      this.longName=         longName;                          //Longer version of name for this list - used for title,
      this.shortName=        shortName;                         //short name of list - should start with letter and only consist of letters & numbers.
      this.color=            color;                             //text color to use  for ui items for this list.
      this.backgroundColor=  backgroundColor;                   //background color to use for ui items for this list.
      this.userKeyType=   userKeyType;                    //String name of property to check when comparing potental user with names i this list. Either "userId" or "userName"
      this.users =            [];                                //array of userObjects for users on this list.
      this.hides=            hides;                             //set true only for lists that hide posts/topics (BLOCKED_ADS, IGNORE)
      this.notHides=         !hides;                              //true if this is a list that doesn't hide posts.
      this.savedList=        {};                                // the saved list which was loaded from perisistent storage
      this.userKeys=       [""];                                // array of userKeys on this list - created from persistent storage list
      this.posts=            [];                                //array of post  Objects for posts on this page by users in this list.
      this.listClassName=    MyBoard.listButtonClassNamePrefix +
                                               shortName;       //Classname to add to node elements for this list
      this.displayButtonOnPostDivType= {
            "providerAdTopicPost":   true,                      //true if we display toggle buttons for each post/topic of this type
            "topicPost":             false,                     //same for topicPost that is not a providerAdTopicPost
            "replyPost":             false,                     //same for replyPost
            "forumSummaryTopic":     false,                     //same for forumSummaryTopic
            "searchSummaryTopic":    false,                     //same for searchSummaryTopic
      };
      this.applies=         {                                   // Applies property exists & is true if list applies to this page. False or doesn't  exist if it doesn't
            "viewForum":             true,                      // By default, lists apply on viewForum and searchResults pages
            "searchResults":         true,
            "viewTopic":             false,
      };
      this.appliesToPosts=          appliesToPosts;             // set to true for lists that apply to posts (eg ignore, false otherwise);
      this.appliesToTopics=         appliesToTopics;            // set to treufor lists that apply to topics, false otherwise.
      this.displayGroup=                "MyBoard_lists";        // default group is MyBoard_lists - all lists which are toggled from provider ad topicPost.
                                                                // Other groups include "MyBoard_hides"  for lists which hide things (posts, ads)
      this.confirmAction=               false;                 // if true, user is prompted before adding/removing from list
      this.buttonTagId=                 null;                  // Id for the management toggle button for this list.
      this.buttonTagHref=               "#";                    // href for the management toggle button for this list.
      this.buttonTag=                   null;                  // DOM Element for the management toggle button for this list.
      this.buttonTagParentTagName= "li";                       // tagName for parent DOM element of the management toggle button
      this.addButtonTextContent =  "(+)" + shortName;          // textContent for the management toggle button when it will add the user to the list
      this.delButtonTextContent =  "(-)" + shortName;         // textContent for the management toggle button when it will delete the user from the list
      this.addButtonTitle =        "Click here to Add to "
                                    + shortName + " list.";     //text for toggle button title when it will add user to list
      this.delButtonTitle =         "Click here to remove from "
                                     + shortName + " list.";    //text for toggle button title when it will delete user from list
      this.menuLinkTitle =          "Click to access member profile"; //text for title of link in menu UI like showLists; may be overidden for topic based lists.

      this.buttonTagClassName= MyBoard.buildClassNameWithValue( //ClassName assigned to toggle button node so event handler knows which list
                                 shortName,
                                 MyBoard.listButtonClassNamePrefix);
      // load the lists....
      this.getList();
      return this;
};
// -------------------------------------------------------------------------------------------



//------------------------------------ List.prototype.setDirty() --------------------------------------------------
//  FUNCTION  :   List.prototype.setDirty()
//  PURPOSE   :   marks this list as 'dirty' (eg changed since load from persistent storage). Does nothing if list is not persistent.
//  ASSUMES   :   -
//  AFFECTS   :   this list object, MyBoard object's .isListsDirty property.
//  PARAMETERS:   -
//  RETURNS   :   -
List.prototype.setDirty = function () {
  var self = "List.prototype.setDirty";
  if (this.isPersistent) {
    this.isDirty = true;
    if (!MyBoard.isListsDirty) {
      Core.log(self,"List: " + this.shortName + " dirty, causing MyBoard.isListsDirty to change to TRUE")
    }
    MyBoard.isListsDirty = true;
  }
}
//-----------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.makeList() --------------------------------------------------
//  FUNCTION  :   MyBoard.makeList
//  PURPOSE   :   Creates a new list object, using the definitions array  + prepending MyBoard.boardId to the list key if the key is not null.
//  ASSUMES   :   MyBoard.boardId is set.
//  AFFECTS   :   MyBoard, User, and List objects.
//  PARAMETERS:   listDefinitionArray - Array of arguments to pass to the List constructor function. The 
//                listKey argument gets prepended with MyBoard.boardId to make the key unique to this board.
//  RETURNS   :   new list object.
MyBoard.makeList = function (listDefinitionArray) {
  Core.enter("makelist", listDefinitionArray);
  var result, keyOffset, listKey;
  
  //prepend the boardId, if listkey specified
  keyOffset = MyBoard.listDefinitionsOffsets.listKey;
  listKey = null;
  if (listDefinitionArray[keyOffset] && (typeof listDefinitionArray[keyOffset] != "undefined")) { 
      listDefinitionArray[keyOffset] =  MyBoard.boardId + listDefinitionArray[keyOffset];
      //Core.log(self,"key:" + listDefinitionArray[4]);
  }
  result = new List();
  List.apply(result,listDefinitionArray);

  //Core.log(self, " AFTER makeList ******** " + " List: " + result.shortName + " (isPersistent:" + result.isPersistent + ") (" + result.userKeys.length + ") *****************\n" + result.userKeys + "\n");
  return result;
}
MyBoard.makeList.prototype = new List();  //link makeList's object prototype to List object so list constructor works properly.
//----------------------------------------------------------------------------------------------------------------------



//------------------------------------ List.prototype.savePersistentData() --------------------------------------------------
//  FUNCTION  :   List.prototype.savePersistentData(UserObj)
//  PURPOSE   :   if this list has persistent data, saves the current list to persistent data
//  ASSUMES   :   -
//  AFFECTS   :   persistent storage for list. this list object (if repaired)
//  PARAMETERS:   -
//  RETURNS   :   -
List.prototype.savePersistentData = function() {
  var self = "List.prototype.savePersistentData";

  var newList, lookupStr, newUserKeys, newUserKeysbyUserKey;
  
  newUserKeysByUserKey = [];
  newUserKeys = [""];
  
  if (this.isPersistent) {
    //Avoid dups by making copy of all the users
    
    lookupStr = "usersBy" + ((this.userKeyType == "userName") ? "UserName" : "UserId");
    for (var i=1; i<this.userKeys.length-1; i++) {
      if (typeof newUserKeysByUserKey[this.userKeys[i]] == "undefined") {
        // not a dupe, add
        //Core.log(self, "adding user:" + this.userKeys[i] + "lookupStr:" + lookupStr);
        newUserKeysByUserKey[this.userKeys[i]] = MyBoard[lookupStr][this.userKeys[i]];
        newUserKeys.push(this.userKeys[i]);
      } else {
        //Core.log(self, "dup user on list " + this.shortName + " user:" + this.userKeys[i] + " SKIPPED");
      }
    }
    newUserKeys.push("");
    //Core.log(self, "after dup check. Remaining keys:" + newUserKeys.length + " out of " + this.userKeys.length + "\n new list:" + newUserKeys);

    newList = newUserKeys.join(",");        // build new list from array
    this.savedList = newList;                 // update our copy

    GM_setValue(this.listKey, newList);       // save persistent data
    MyBoard.pesistentListDataSaveCount++;
    Core.log(self,"list saved (lists save count:" + MyBoard.pesistentListDataSaveCount + ". new list from GM_getValue:\n" + GM_getValue(this.listKey));
  }
}
// -------------------------------------------------------------------------------------------



//------------------------------------ List.prototype.addMember() --------------------------------------------------
//  FUNCTION  :   List.prototype.addMember(UserObj, doNotUpdatePersistentData, markListDirty)
//  PURPOSE   :   adds a new member to this list.
//  ASSUMES   :   -
//  AFFECTS   :   this list object & NONE list object (if this isn't NONE & user is on none)  & the user object for the member being added.
//                    persistent data.
//  PARAMETERS:   UserObj                    - user object to be added to this list.
//                doNotUpdatePersistentData  - Optional (default=false). If true, persistent data for this list is not updated.
//                                             if false, or not specified, persistent data is updated.
//                markIsListsDirty           - OPTIONAL. If specified & true, the lists .setDirty() method is invoked. 
//                                             if not specified or false, setDirty() is not invoked.
//  RETURNS   :   offset of user in this.userKeys array
List.prototype.addMember = function(UserObj, doNotUpdatePersistentData, markListDirty) {
  var self = "List.prototype.addMember";
  Core.enter(self,"user:" + UserObj.userDisplayName() + " doNotUpdatePersistentData:" + doNotUpdatePersistentData + " markListDirty:" + markListDirty);

  var result;
  
  // confirm they're not already added
  for (var i=1; i<this.userKeys.length-1; i++) {
    if (this.userKeys[i] == UserObj[this.userKeyType]) {
      //user is already there - just return the location.
      Core.log(self,"key found at location (" + i + ") Not adding duplicate for list:" + this.shortName + " and user:" + UserObj.userDisplayInf());
      return i;
    }
  }
  
  //key is not already in this list.
  //add userKey to to end of lists userKeys array, with empty cell appended...
  if (this.userKeys.length == 1) {
    //empty list - only has one blank entry. add this & blank to end.
    this.userKeys.push(UserObj[this.userKeyType]);
  } else {
    this.userKeys[this.userKeys.length-1] = UserObj[this.userKeyType];  // replace blank at end with new user
  }
  //add blank to end...
  this.userKeys[this.userKeys.length] = "";
  result = this.userKeys.length - 1;    // added item - return loc.
  
  if (markListDirty && (typeof markListDirty != "undefined")) {
    //Core.log(self, "calling setDirty() for list:" + this.shortName + "; user: " + UserObj.userDisplayName());
    this.setDirty();
  }

  //add this list to the user object's lists
  UserObj.addList(this, markListDirty);

  //if this is any list other than NONE, remove this user from NONE list (if they're on it)
  if (this != MyBoard.NoneList) {
    //Core.log(self, "calling removeMember to take user off NONE list...");
    MyBoard.NoneList.removeMember(UserObj);
  //Core.log(self,"after removemember");
  }
  //save peristent data unless forced not to by doNotUpdatePersistentData parameter
  if (!doNotUpdatePersistentData || (typeof doNotUpdatePersistentData == "undefined")) {
    //Core.log(self, "calling savepersistentdata");
    MyBoard.savePersistentData();
  }
//Core.log(self,"calling udpatepostslists");  
  UserObj.updatePostsLists();

  return result;
} //List.prototype.addMember
// -------------------------------------------------------------------------------------------



//------------------------------------ User.prototype.updatePostsLists() --------------------------------------------------
//  FUNCTION  :   User.prototype.updatePostsLists()
//  PURPOSE   :   Updates the post lists array for all posts by this user.
//  ASSUMES   :   -
//  AFFECTS   :   MyBoard post objects
//  PARAMETERS:   -
//  RETURNS   :   -
User.prototype.updatePostsLists = function () {
  var self = "User.prototype.updatePostsLists";

  var result;
  
  for (var i=0; i<this.posts.length; i++) {
    result =this.posts[i].setList();
    Core.log(self, "Post " + this.posts[i].postNumber + " for user " + this.userDisplayName() + " set to list " + result.shortName);
  }
}
//------------------------------------------------------------------------------------------------------------------



//------------------------------------ User.prototype.addList() --------------------------------------------------
//  FUNCTION  :   User.prototype.addList(ListObj)
//  PURPOSE   :   Appends this list to lists for this user.
//  ASSUMES   :   user is not already on the list
//  AFFECTS   :   this user object. NOte: does NOT affect the List Object. this method is called when list object adds/removes a member.
//  PARAMETERS:   ListObj                             - list object to be added for this user.
//                markDirtyIfPersistenceChangedToTrue - Optional, default true. Passed through to setPersistence.
//  RETURNS   :   -
User.prototype.addList = function (ListObj, markDirtyIfPersistenceChangedToTrue) {
  var self = "User.prototype.addList";

  markDirtyIfPersistenceChangedToTrue = (typeof markDirtyIfPersistenceChangedToTrue =="undefined") ? true : markDirtyIfPersistenceChangedToTrue;
  Core.enter(self,"list:" + ListObj.shortName + " markDirtyIfPersistenceChangedToTrue:"+markDirtyIfPersistenceChangedToTrue);
    
  this.lists.push(ListObj);
  this.setPersistence(markDirtyIfPersistenceChangedToTrue); 

  //Core.log(self, " User: " + this.userDisplayName() + " added to " + ListObj.shortName + " persistence:" + this.isPersistent);
}  
// -------------------------------------------------------------------------------------------



//------------------------------------ User.prototype.removeList() --------------------------------------------------
//  FUNCTION  :   User.prototype.removeList(ListObj)
//  PURPOSE   :   Removes a list from this user's lists.
//  ASSUMES   :   -
//  AFFECTS   :   this user object.
//  PARAMETERS:   ListObj - list object to be removed from user object's .lists property.
//  RETURNS   :   -1 if member removed, null if member not found.

User.prototype.removeList = function (ListObj) {
  var self = "User.prototype.removeList";

if (ListObj != MyBoard.NoneList) {
  Core.log(self, "entering...User:" + this.userDisplayName() + " List:" + ((ListObj) ? ListObj.shortName : " ListObj is null") + " .lists.length:" + this.lists.length);
}
  //remove this list from the User object's lists array
  found = false;
  for (var i=0; i<this.lists.length; i++) {
  //Core.log(self, "checking user's list[" + i  + "]: " + this.lists[i].shortName);
    if (this.lists[i] === ListObj) {
      found = true;
      this.lists.splice(i,1);
      this.setPersistence();
      
      //Core.log(self,"Removed list : " + ListObj.shortName + " from user:" + this.userDisplayName() + "'s lists. (Persistence:" + 
      //              this.isPersistent + ") new lists:" + this.lists);
      break;
    }
  }
  if (!found) {
    if (ListObj != MyBoard.NoneList) {
      Core.log(self, "unable to find list " + ListObj.shortName + " in user's lists:" + this.lists);
    }
  }

}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ User.prototype.setPersistence() --------------------------------------------------
//  FUNCTION  :   User.prototype.setPersistence()
//  PURPOSE   :   Examines this user object and sets it's isPersistent property.
//  ASSUMES   :   -
//  AFFECTS   :   this user object, can affect MyBoard.isUsersDirty
//  PARAMETERS:   markDirtyIfPersistenceChangedtoTrue - Optional. If specified and true, the user's isDirty property will be set to true if
//                    the users persistences is currently false and it gets set to true. 
//  RETURNS   :   true if user object is persistent, false otherwise.
User.prototype.setPersistence = function (markDirtyIfPersistenceChangedToTrue) {
  var self = "User.prototype.setPersistence";
  
  var oldPersistence = this.isPersistent, isUsersDirty = MyBoard.isUsersDirty, str, isPersistent = false;

  Core.enter(self, "entering. User:" + this.userDisplayName() + " user persistence:" + this.isPersistent + 
               " MyBoard.isUsersDirty:" + MyBoard.isUsersDirty + " user's isDirty:" + this.isDirty +
               " markDirtyIfPersistenceChangedToTrue:" + markDirtyIfPersistenceChangedToTrue);
  // for now, only users on persistent lists are persistent.
  for (var i=0; i< this.lists.length; i++) {
    if (this.lists[i].isPersistent) {
      isPersistent = true;
      //Core.log(self, "User " + this.userDisplayName() + " persistence is true because user is on list:" + this.lists[i].shortName);
      break;
    }
  }
  this.isPersistent = isPersistent;

  // ------- if this user's persistences just became true?
  str = "";
  if (this.isPersistent && (oldPersistence != this.isPersistent)) {
    //persistence has changed to true for this list. Mark user dirty if markdirty.... flag specified
    str += "Persistence changed to TRUE ";
    if (markDirtyIfPersistenceChangedToTrue && (typeof markDirtyIfPersistenceChangedToTrue != "undefined" )) {
      str += "calling user's setDirty() method ";
      this.setDirty();
    } else if (this.isDirty) {
      //user was already dirty, but just became persistent by being added to this list. Update MyBoard.isUsersDirty
      str += "for DIRTY user (" + this.userDisplayName() + ") ";
      MyBoard.isUsersDirty = true;
      str += (!isUsersDirty) ? "(this change caused MyBoard.isUsersDirty to be **** CHANGED TO TRUE *****) " : "";
    } else {
      str += "User " + this.userDisplayName() + " persistence changed to " + this.isPersistent + " (with no impact on MyBoard.isUsersDirty)";
    }
    //Core.log(self, str);
  }
  //if (MyBoard.isUsersDirty) Core.log(self, "************* isUsersDirty is TRUE");
  return this.isPersistent;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ List.prototype.removeMember() --------------------------------------------------
//  FUNCTION  :   List.prototype.removeMember(UserObj, offset, markListDirty)
//  PURPOSE   :   Removes a member from this list.
//  ASSUMES   :   -
//  AFFECTS   :   this list object & the NONE list object (if this isn't the NONE list object), user object, MyBoard object.
//  PARAMETERS:   UserObj       - user object to be added to this list.
//                offset        - Optional. if specified, offset of userKey for this object in List.userKeys.
//                markListDirty - Optional. default true. If specified & false, list will not be marked as dirty.
//  RETURNS   :   -1 if member removed, null if member not found.
List.prototype.removeMember = function(UserObj, offset) {
  var self = "List.prototype.removeMember";
  markListDirty = (typeof markListDirty == "undefined") ? true : markListDirty;
  Core.enter(self,"user:" + UserObj.userDisplayName() + " list:" + this.shortName + " markListDirty:" + markListDirty);

  var result, loc, found;

  //set loc to current location in list's userKeys array
  loc = -1;
  if (offset && (typeof offset != "undefined")) {
    //offset specified - confirm location
    if (this.userKeys[offset] == UserObj[this.userKeyType]) {
      loc = offset;
    } else {
      // not in list - okay if this is the none list - otherwise, an error...
      if (this != MyBoard.NoneList) {
        Core.error(self,"offset for " + this.shortName + " list specified: " + offset + " ,but user: " + UserObj[this.userKeytype] + " not found. Instead, found: " + this.userKeys[offset]);
      }
      return null
    }
  } else {
    // offset not specified. Search the list...
    loc = MyBoard.searchArray(this.userKeys, UserObj[this.userKeyType]);
  }
  
  // remove the user from this list object
  this.userKeys.splice(loc,1);
  if (markListDirty) {
    this.setDirty();
  }
  loc = -1;                                     // return -1 when removing...

  //remove reference to this list from user object's lists
  UserObj.removeList(this);
//Core.log(self,"after call removeList");

  //if this is not the NONE list & the user object is not on any other lists, add to NONE
  if ((this != MyBoard.NoneList) && (UserObj.lists.length == 0)) {
    if ((UserObj[MyBoard.NoneList.userKeyType]) && (typeof UserObj[MyBoard.NoneList.userKeyType] != "undefined")) {
      //We have a valid,defined userKey - add to None list
      MyBoard.NoneList.addMember(UserObj);
    } else {
      //don't have proper user key - complain and bail
      Core.error(self, " attempt to add user to NONE List, but " + MyBoard.NoneList.userKeyType + 
                        " is null or undefined for for user " + UserObj.userDisplayName());
      return null;
    }
  }

//Core.log(self,"after none-list check");

  // save udpated lists/users to persistent data store
  MyBoard.savePersistentData();
}
// -------------------------------------------------------------------------------------------



//------------------------------------ List.prototype.getList() --------------------------------------------------
//  FUNCTION  :   List.prototype.getList
//  PURPOSE   :   If list is persistent: gets the list from persistent storage, repairing if necessary.
//                if necessary, creates the persistent storage entry for the list.
//  ASSUMES   :   this list object's .isPersistent, .listKey, .shortName & .userKeyType properties are set.
//  AFFECTS   :   User objects for users on this list. this list object. Persistent storage for this list.
//  PARAMETERS:   -
//  RETURNS   :   null
List.prototype.getList = function() {
  var self = "List.prototype.getList";
  Core.enter(self);

  var repaired, length, UserObj, tempUserKeys;
  
  if (this.isPersistent) {
    if ( (!this.shortName || typeof this.shortName == "undefined" || this.shortName.length < 1 ) ||
         (!this.listKey || typeof this.listKey == "undefined")) {
        Core.error(self, "expected shortName and listKey to be setup.");
        return;
    }
    
    //load from persistent storage
    this.savedList = GM_getValue(this.listKey);
    if (typeof this.savedList == "undefined") {
      //Create new, "empty" persistent list storage for this list.
      this.userKeys[0] = "";
      this.savedList = this.userKeys.join(","); // convert array to new list
      Core.logWithHeader(self, "Persistent storage for List not found - creating new list: " + this.shortName + ":'" + this.savedList + "'");
      GM_setValue(this.listKey, this.savedList);   // save persistent data
    } else {
      // Persistent storage for list exists. split the list into the userKeys[] array, check/repair list.
      // put the users into users array (note: the list values are a userName or userId, depending on the list's .userKeyType property)
      tempUserKeys = this.savedList.split(',');
      Core.log(self, "***************** " + this.shortName + " length:" + ((tempUserKeys.length <= 2) ? 0 : tempUserKeys.length - 2) + " *******************");
      
      
      // confirm & repair lists; make all repairs on the users array, then if any were made, save to persistent storage
      repaired = false;
      // ensure one empty space at end
      length = tempUserKeys.length;
      if (tempUserKeys[length-1] != "") {
        Core.logWithHeader(self, "before adding empty to end: '" + tempUserKeys + "'");
        tempUserKeys.push("");
        repaired = true;
        Core.logWithHeader(self, "after adding empty to end: '" + tempUserKeys + "'");
      }
      // ensure no empties in middle
      for (var j = 1; j< tempUserKeys.length-1; j++) {
        if (tempUserKeys[j] == "") {
          Core.logWithHeader(self, "before users fix (J:" + j + "): '" + tempUserKeys + "'");
          tempUserKeys.splice(j,1);
          repaired = true;
          Core.logWithHeader(self, "after users end fix (j:" + j + "): '" + tempUserKeys + "'");
        };
      }
      // ensure one empty at beginning
      if (tempUserKeys[0] != "") {
        Core.logWithHeader(self, "before users prefix: '" + tempUserKeys + "'");
        tempUserKeys.unshift("");
        repaired = true;
        Core.logWithHeader(self, "after users prefix: '" + tempUserKeys + "'");
      }

      // find or create User Objects for each list entry & add the member to this list.
      this.userKeys = [""];
      for (i=1; i<tempUserKeys.length-1; i++) {
        userName = (this.userKeyType == "userName") ? tempUserKeys[i]: null;
        userId = (this.userKeyType == "userId") ? tempUserKeys[i]: null;
        UserObj = MyBoard.getUserObject(userName, userId,false);
        this.addMember(UserObj, true, false);  //add the member, but don't update persistent data nor mark as dirty.
        
      }

    } // else - persistent storage found
  } else if (this.shortName == "NONE") {
    //Core.log(self, "None list found - setting MyBoard.NoneList");
    MyBoard.NoneList = this;
  }
} //List.prototype.getList
//--------------------------------------------------------------------------------------------------------------------



//------------------------------------ List.prototype.emptyList () --------------------------------------------------
//  FUNCTION  :   List.prototype.emptyList
//  PURPOSE   :   Resets list Object to empty state, updating peristent torage if list is persistent.
//  ASSUMES   :   -
//  AFFECTS   :   List object & persistent storage
//  PARAMETERS:   none
//  RETURNS   :   null
List.prototype.emptyList = function() {
  var self = "List.prototype.emptyList";
  Core.log(self, "List:" + this.shortName + " value before empty:" + this.savedList);
  
  var UserObj;
  
  //the first and last entries are empty. walk all the non-empty entries, removing...
  for (var i=1; i<this.userKeys.length-1; i++) {
    UserObj = MyBoard.lookupUserObject(this.userKeys[i])
    if (UserObj) {
      this.removeMember(UserObj);
    } else {
      Core.error(self, "attempting to remove user " + this.userKeys[i] + " but User Obj not found. bailing....");
      throw ("no user object found for userKey:" + this.userKeys[i]);
    }
  }
  
  if (this.isPersistent) MyBoard.savePersistentData();

  Core.log(self,"List emptied. new list:");
  Core.enumerateOwnProperties(this);
}
//-----------------------------------------------------------------------------



//------------------------------------ List.prototype.clearList() --------------------------------------------------
//  FUNCTION  :   List.prototype.clearList
//  PURPOSE   :   Prompts user, then removes all user data from the list and returns list to state after it was just created.
//                if list is already empty & a backup exists, offers to restore it.
//  ASSUMES   :   -
//  AFFECTS   :   this List objects user data properties; Persistent storage for this list, if it's persistent.
//  PARAMETERS:   -
//  RETURNS   :   -
List.prototype.clearList = function() {
  var self = "List.prototype.clearList";
  Core.log(self, "list:" + this.shortName);

  var confirmed, backedUpListKey, backedUpList;

  // key to save backup if we clear list
  backedUpListKey = this.listKey + "_SAVED";
  confirmed = confirm("WARNING _ This will remove **ALL** names from the " + this.longName + " (" + this.shortName + ") list.\n" +
                           "This action will clear all names from the list - click cancel to keep the list intact.\n\n" +
                           "Note: you can remove individual entries from any of the lists via the MyBoard.Show Lists menu.\n\n" +
                           "If you wish to remove all names from the list, click OK.");
  if (confirmed) {
    Core.log(self, "confirmed - clearing list " + this.shortName);
    //Save a backup
    Core.log(self,"backedUpListKey:" + backedUpListKey + " value:\n" + this.savedList);
    this.emptyList();
  }
  main.init();  //force reload of page
  Core.leave(self);
}
//-----------------------------------------------------------------------------



//------------------------------------List.buildUsersTableRows --------------------------------------------------
//  FUNCTION  :   List.buildUsersTableRows (nCol, hrefProperty)
//  PURPOSE   :   Returns a string with HTML for the table rows (header and data) for all users on this list.
//  ASSUMES   :   1) "this" is a List object, populated with results of processing the page (eg .posts[] array has the posts.
//                Page has been processed (.init method & process<pageType>method);
//                2) For hrefProperty & altHrefProperty, if they're specified, then the UserObj's property with name formed by
//                the hrefProperty + "Title" (eg if hrefProperty is "adLink", then "adLinkTitle" would be assumed to be the title.//  AFFECTS   :   -
//  PARAMETERS:   nCol                - Number of columns (providers) to display on each line
//                hrefProperty        - if specified, the UserObj property to use for the href.
//                altHrefProperty     - if specified & hrefProperty is null/unassigned, altHrefProperty is used.
//  RETURNS   :   String with table rows (nCol columns per row)
//------------------------------------------------------------------------------------------------------------
List.prototype.buildUsersTableRows = function(nCol,hrefProperty, altHrefProperty) {
  var self = "List.prototype.buildUsersTableRows";
  var stats;
  var addedCount;  //tracks how many users have been added to the output.
  var postsCount;  //count of total posts by all users in this list on this page.
  var result, userKey, remainingColumns, widthPercent, UserObj, linkHref, title;

    result = "";
    addedCount = 0;
    widthPercent = parseInt( (1/nCol) * 100);
    //for user in the list, add an entry to the table.
    //(users has empty cell at beginning and end, so skip those)
    for (var i=1; i< this.userKeys.length-1; i++) {
      userKey = this.userKeys[i];
      //UserObj = MyBoard.getUserObject(userKey, this.userKeyType);
      UserObj = MyBoard.lookupUserObject(userKey);
      if (!UserObj || (typeof UserObj == "undefined")) {
        Core.error(self, "Unable to find user object for user: " + userKey + " bailing...");
        throw("unable to find user object for " + userKey);
      }

      // setup the title & link. If it's a hides link & no href's specified, it will get setup to toggle by teh event handler.
      linkHref = "javascript: void(0)"; 
      title = this.menuLinkTitle;

      //href specified? set it up for the link.
      if (hrefProperty && (typeof hrefProperty != "undefined") &&
        UserObj[hrefProperty] && (typeof UserObj[hrefProperty] != "undefined")) {
        //Core.log(self," using hrefProperty for link for " + UserObj.userName + " href:" + UserObj[hrefProperty]);
        linkHref = UserObj[hrefProperty];
        title = UserObj[hrefProperty + "Title"];
      } else if (altHrefProperty && (typeof altHrefProperty != "undefined") &&
        UserObj[altHrefProperty] && (typeof UserObj[altHrefProperty] != "undefined")) {
          
          //altHref specdified, set it up as the link.
          Core.log(self," using AltHrefProperty for link for " + UserObj.userName + " href:" + UserObj[altHrefProperty]);
                  linkHref = UserObj[altHrefProperty];
                  Core.logWithHeader(self, "using althref:" + linkHref);
          title = UserObj[altHrefProperty + "Title"];
      }

      if (addedCount % nCol == 0) {
        //first column, start new table row/data
        result += "<tr class='" + this.listClassName + "'><td width=" + widthPercent + "%>";
      } else {
        // 2nd or later column - terminate previous table data, start new table data.
        result += "</td><td>";
      }
      //add link for this column
      result += "<a href='" + linkHref + "' title='" + title + "'>" + UserObj.userDisplayName() + "</a>";
      addedCount++;
      if ((addedCount % nCol == 0) || (addedCount == this.userKeys.length-2)) {
        // last column on this line or last user. fill-in row & terminate table data/row.
        if (addedCount % nCol != 0) {
          //last column - fill out the table
          remainingColumns = nCol - (addedCount % nCol);
          result +="</td><td colspan=" + remainingColumns + "></td></tr>";
        } else {
          //last cell for this row, terminate table data/row.
          result += "</td></tr>";
        }
      } // if last column
    } //for user
  return result;
}
//-----------------------------------------------------------------------------



//------------------------------------List.prototype.buildPostLinkTableRows -----------------------------------------
//  FUNCTION  :   buildPostLinkTableRows
//  PURPOSE   :   Returns a string with HTML for the table rows (header and data) of links found on current page from this list.
//                If >1 post for a user is found, only the first post encountered is put in the table.
//  ASSUMES   :   "this" is a List object, populated with results of processing the page (eg .posts[] array has the posts.
//                Page has been processed (.init method & process<pageType>method);
//  AFFECTS   :   -
//  PARAMETERS:   nCol          - Number of columns (providers) to display on each line
//  RETURNS   :   String with table rows (nCol per row).
//------------------------------------------------------------------------------------------------------------
List.prototype.buildPostLinkTableRows = function(nCol) {
  var self = "List.prototype.buildPostLinkTableRows";
  //Core.log(self, "this.shortName:" + this.shortName + " nCol:" + nCol);
  var stats;    //string of results
  var addedCount;  //tracks how many users have been added to the output.
  var postsCount;  //count of total posts by all users in this list on this page.
  var result, user, remainingColumns, widthPercent, ThisPost, userName;
  if (this.posts.length > 0) {
    //start by setting up the width style for the td elments for this list.
    widthPercent = parseInt((1/nCol)*100);
    result = '<STYLE type="text/css">\n\t tr.' + this.listClassName + " td { width:" + widthPercent + "%;}\n</STYLE>";

    addedCount = 0;
    //for each post on this page, if the post is by a user with this list as current list  & it's their first post on this page, add it.
    for (i=0; i<this.posts.length; i++) {
      ThisPost = this.posts[i];
      userName = ThisPost.UserObj.userName;
      if ((ThisPost.UserObj.lists && (ThisPost.UserObj.lists[0] == this)) &&
          (ThisPost.UserObj.posts && (ThisPost.UserObj.posts[0] = ThisPost))){
        //This post applies to this list - is it the first on the page?
        if (addedCount % nCol == 0) {
          //first column, start new table row/data
          result += "<tr class='" + this.listClassName + "'><td>";
        } else {
          // 2nd or later column - terminate previous table data, start new table data.
          result += "</td><td>";
        }
        //add link for this column
        result += "<a href='" + ThisPost.summaryTopicTargetHref + "' title='" + ThisPost.postSubject + "'>" + userName + "</a>";
        addedCount++;
        if (addedCount % nCol == 0) {
            //last cell for this row, terminate table data/row.
            result += "</td></tr>";
        }
      } //if user is in this list
    } //for each post
    // end the last tr/td....
    result +="</td>";
    if (addedCount % nCol == 0) {
      //last field was at a row boundary
      result += "</tr>";
    } else {
      //last field was not at a row boundary, fill in the row
      remainingColumns = nCol - (addedCount % nCol);
      result +="</td><td colspan=" + remainingColumns + "></td></tr>";
    }
  } // this.posts.length > 0
  return result;
}
//---------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.showListsMenuObject() --------------------------------------------------
//  FUNCTION  :   List.showListsMenuObject
//  PURPOSE   :   Handles menu click event to show all the user's MyBoard lists (doesn't show the NONE list)
//  ASSUMES   :   Event tag has classname with list created by MyBoard.buildClassNameWithValue
//  AFFECTS   :   Nothing iniitially, but actions on menu can afffect list objects.
//  PARAMETERS:   event - target of the click
//  RETURNS   :   null
MyBoard.showListsMenuObject = function(event) {
  var self = "MyBoard.showListsMenuObject";

  var displayGroup, msgHTML, nCol, width, ListObj, listTRs;

  MyBoard.menuClose();
  
  nCol = 6;  // display with four columns
  width = nCol * 11; //width of dialog

  //ensure the lists/users are loaded...
  if (!MyBoard.isListsPopulated) {
    MyBoard.getPersistentData();
  }


  // start with the css & then build the table...
  msgHTML =  MyBoard.listCss + "<table width=100%><TR style='font-Size:150%;'><TH COLSPAN=" + nCol +
                              ">Click on any of the links below to go to the most recent ad MyBoard has seen for this user</th></tr>";
  for (j = 0; j < MyBoard.displayGroups.length; j++) {
    displayGroup = MyBoard.displayGroups[j];
    for (var i=0 ; i < MyBoard.lists.length; i++) {
      if ((MyBoard.lists[i].displayGroup == displayGroup) && (MyBoard.lists[i] != MyBoard.NoneList)) {
        if (MyBoard.lists[i].appliesToTopics) {
          //setup links to the topic
          msgHTML += List.buildListUsersHTML(MyBoard.lists[i], nCol, "lastAdHref", "userProfileHref");
        } else {
          //list doesn't apply to topic. table cells will toggle user in/out of list.
          Core.log(self,"post based list - " + MyBoard.lists[i].shortName + " with users: " + MyBoard.lists[i].userKeys.length);
          if (MyBoard.lists[i].userKeys.length >= 3) {
              //at least one user, so display this message
              msgHTML += "<TR style='font-Size:150%;'><TH COLSPAN=" + nCol +
                              ">Click on any member below to toggle the member in/out of the " + MyBoard.lists[i].shortName + " list.</th></tr>";
          }
          msgHTML += List.buildListUsersHTML(MyBoard.lists[i], nCol);
        }
      }
    }
  }
  msgHTML += "</table>";
  theDialog = new DialogBox.init("Show Lists" ,msgHTML, width);

  //add eventlistener to toggle members in/out of the lists that only affect posts
  for (var i = 0; i < MyBoard.lists.length; i++) {
    ListObj = MyBoard.lists[i];
    //Core.log(self,"List: " + ListObj.shortName + " appliesToPosts:" + ListObj.appliesToPosts + " appliesToTopics:" + ListObj.appliesToTopics);
    if (ListObj.appliesToPosts && !ListObj.appliesToTopics) {        //narrow down to TRs with class= & their anchors
    
      listTRs = Core.getElementsByClass(ListObj.listClassName, theDialog.containerTag); //all TRs for this list
      //Core.log(self,"listTRs " + ((listTRs) ? "length:" + listTRs.length : " is NULL") + " listClassName:" + ListObj. listClassName);
      if (listTRs) {
        for (var j=0; j<listTRs.length; j++) {
          anchors = listTRs[j].getElementsByTagName("a");
      //Core.log(self,"anchors " + ((anchors) ? "length:" + anchors.length : " is NULL"));
          if (anchors) {
            for (var k=0; k<anchors.length; k++) {
    //Core.log(self,"Anchor EventListener added for " + anchors[k].textContent);
              anchors[k].addEventListener("click", MyBoard.toggleUserInListMenuObject, true);
            }
          }
        }
      }
    }
  }

  // show the dialog & when user clicks okay, reload page if anything is dirty
  theDialog.show(function() {if(MyBoard.isUsersDirty || MyBoard.isListsDirty) main.init()});
  window.scrollTo(0,0); //scroll to top of screen;
  event.preventDefault();
}
//-----------------------------------------------------------------------------------------------------------------



//------------------------------------ List.buildListUsersHTML() --------------------------------------------------
//  FUNCTION  :   List.buildListHTML(ListObj, nCol, hrefProperty)
//  PURPOSE   :   Creates a string with the HTML for table rows of links for each member in ListObj
//                if no members are found, the row consists of a single colspan=nCol cell with "List <this listname> is empty"
//  ASSUMES   :   For hrefProperty & altHrefProperty, if they're specified, then the UserObj's property with name formed by
//                the hrefProperty + "Title" (eg if hrefProperty is "adLink", then "adLinkTitle" would be assumed to be the title.
//  AFFECTS   :   -
//  PARAMETERS:   ListObj   - A list object, populated.
//                nCol      - Number of columns for the table rows.
//                hrerfProperty - if specified, property on UserObj to use for anchor href
//                altHrefProperty - if specified & hrefProperty is not used, altHrefProperty is used.
//  RETURNS   :   string with HTML for a table with links for each member in ListObj, and with
//                class="MyBoard_list_" + ListObj.shortName  for each TR.
List.buildListUsersHTML = function (ListObj, nCol, hrefProperty, altHrefProperty) {
  var self = "List.buildListUsersHTML";
  var result = "";
  var listMemberCount, listMemberStr;
  //retrieve the name from the classname
  listMemberCount = ((!ListObj.userKeys) || (typeof ListObj.userKeys=="undefined")) ? 0: ListObj.userKeys.length-2;

  if (listMemberCount > 0) {
    //include the header row
    listMemberStr = (listMemberCount == 1) ? " member" : " members";
    result += "<tr class='" + ListObj.listClassName + "'><th style='font-Size:200%'; colspan=" +
            nCol + ">" + ListObj.longName + " (" + listMemberCount + listMemberStr + ")</th></tr>";
    result += ListObj.buildUsersTableRows(nCol, hrefProperty, altHrefProperty);
  } else {
    //no list member posts on this page.
    result += "<tr class='" + MyBoard.listButtonClassNamePrefix + ListObj.shortName + "'><td colspan=" + nCol + ">List " + ListObj.longName + " (" + ListObj.shortName + ") is empty.</td></tr>";
  }
  return result;
};
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.savePersistentData() --------------------------------------------------
//  FUNCTION  :   MyBoard.savePersistentData(forceSave)
//  PURPOSE   :   Saves persistent user data from storage
//  ASSUMES   :   -
//  AFFECTS   :   MyBoard object (by creating new user objects)
//  PARAMETERS:   forceSave - Optional boolean. If specifeid and true, data is saved regardless of whether it's dirty or not.
//                            if not specified, or false, data is only saved if it's dirty.
//  RETURNS   :   -
MyBoard.savePersistentData = function(forceSave) {
  var self = "MyBoard.savePersistentData";

  var forceIt = (forceSave && (typeof forceSave != "undefined"));
  var ListObj;

  //save the lists
  if (MyBoard.isListsDirty || forceIt) {
    for (var i=0; i<MyBoard.lists.length; i++) {
      ListObj = MyBoard.lists[i];
      if (ListObj.isPersistent) {
        if (ListObj.isDirty || forceSave) {
          ListObj.savePersistentData();
          Core.log(self, "Saving list: " + ListObj.shortName + " MyBoard.isListsDirty:" + MyBoard.isListsDirty + 
                        " list's isDirty:" + ListObj.isDirty + "forceSave:" + forceSave);
        }
      }
    }
  }
  
  //save the users
  if (MyBoard.isUsersDirty || forceIt) {
    //Core.log(self, "Saving lists MyBoard.isListsDirty:" + MyBoard.isListsDirty);
    User.savePersistentData();
  }

} //MyBoard.savePersistentData
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.getPersistentUserData() --------------------------------------------------
//  FUNCTION  :   MyBoard.getPersistentUserData()
//  PURPOSE   :   Retrieves persistent user data from storage
//  ASSUMES   :   -
//  AFFECTS   :   MyBoard object (by creating new user objects)
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.getPersistentUserData = function() {
  var self = "MyBoard.getPersistentUserData";
  var usersInList, UserObj;
  //get the user objects persistent data
  MyBoard.savedUserList = GM_getValue(MyBoard.savedUsersListKey);
  if (MyBoard.savedUserList && (typeof MyBoard.savedUserList != "undefined")) {
    usersInList = eval(MyBoard.savedUserList);
    Core.logWithHeader(self, "\t\t\t\t ******* THE USERS (" + usersInList.length + ")******* ");
    for (var i=0; i< usersInList.length; i++) {
      UserObj = MyBoard.getUserObject(usersInList[i].userName, usersInList[i].userId, false);
      UserObj.lastAdHref = usersInList[i].lastAdHref;
    }
  }
  return;
}
//----------------------------------------------------------------------------



//------------------------------------ MyBoard.getLists() --------------------------------------------------
//  FUNCTION  :   MyBoard.getLists()
//  PURPOSE   :   Load users & the lists from persistent data.
//  ASSUMES   :   -
//  AFFECTS   :   User objects, List objects.
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.getLists = function(){
  var self = "MyBoard.getLists";

  var ListObj;
  Core.logWithHeader(self, "\t\t\t\t ******* THE LISTS ******");

  //  Setup Lists array with an entry for each list, in priority order (eg first one that applies is the one to use)
  MyBoard.lists = [];
  for (var i=0; i<MyBoard.listDefinitions.length; i++) {
    MyBoard.lists.push(MyBoard.makeList(MyBoard.listDefinitions[i]));  
    MyBoard.listsByShortName[MyBoard.lists[i].shortName] = MyBoard.lists[i];    
  }

  //Ignored list is special - only applies when viewing posts
  ListObj = MyBoard.listsByShortName["IGNORED"];
  ListObj.displayButtonOnPostDivType["providerAdTopicPost"] =    false; //don't offer ignore button on provider ad post
  ListObj.displayButtonOnPostDivType["topicPost"] =              true;  //do display on replies.
  ListObj.displayButtonOnPostDivType["replyPost"] =              true;  //do display on replies.
  ListObj.applies["viewForum"] = false;
  ListObj.applies["viewTopic"] = true;

  //create the list for users not on any list
  MyBoard.NoneList = MyBoard.listsByShortName["NONE"];
  MyBoard.NoneList.displayButtonOnPostDivType["providerAdTopicPost"]=false; //don't want to put this option on the provider ad topic


  //set the stuff for each list that depends on the special case stuff like .hides.
  for (var i=0; i<MyBoard.lists.length; i++) {
    ListObj = MyBoard.lists[i];

    //set menuLinkTitle for lists that apply only to posts.
    if (ListObj.appliesToPosts && !ListObj.appliesToTopics) {
      ListObj.menuLinkTitle = "Click to toggle user in/out of list: " + ListObj.shortName;
    }

    if (ListObj.hides) {
      ListObj.displayGroup = "MyBoard_hides";
      ListObj.applies["searchResults"] = false;
    }
  }
  MyBoard.isListsPopulated = true;
  MyBoard.listCss = MyBoard.buildListTableCss();
}
//-----------------------------------------------------------------------------



//------------------------------------ MyBoard.getPersistentData() --------------------------------------------------
//  FUNCTION  :   MyBoard.getPersistentData()
//  PURPOSE   :   Load users & the lists from persistent data.
//  ASSUMES   :   -
//  AFFECTS   :   User objects, List objects, MyBoard object
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.getPersistentData = function () {
  var self = "MyBoard.getPersistentData";
  Core.enter(self);

  var str;

  MyBoard.getPersistentUserData(); //load the saved user data (username/id/lastAdhref
  

  MyBoard.getLists(); //populate the lists from persistent storage
}
//-----------------------------------------------------------------------------



//------------------------------------ MyBoard.getUserIdFromViewTopicPostDiv() --------------------------------------------------
//  FUNCTION  :   MyBoard.getUserIdFromViewTopicPostDiv(postDiv)
//  PURPOSE   :   searches a post DIV of a viewTopic page for the userId.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   postDiv - DOM element for the div for a topic post. Note: does not work on search results by post.
//  RETURNS   :   userId for this post if found, else null.
MyBoard.getUserIdFromViewTopicPostDiv = function(postDiv) {
  var self = "MyBoard.getUserIdFromViewTopicPostDiv";

  var href, result, queryStrings, elements;

  elements = Core.getElementsByClass("username", postDiv);
  result = null;
  for (var i=0; i < elements[0].childNodes.length; i++){
    if (elements[0].childNodes[i].nodeType == 1 && elements[0].childNodes[i].tagName == "A") {
      href = elements[0].childNodes[i].href;
      if (href.indexOf("/profile.php") >= 0) {
        queryStrings = Core.getQueryStrings(href);
        if (queryStrings.hasOwnProperty("id"))  {
          return queryStrings["id"];
        } else {
          Core.error(self,"expected query string id+ on tag for class username:" + href);
          return;
        }
      } //if
    } //if
  } //for
  Core.error(self,"Unable to find username in post DIV.");
  return;
}
//-----------------------------------------------------------------------------



//------------------------------------ MyBoard.searchArray() --------------------------------------------------
//  FUNCTION  :   MyBoard.searchArray()
//  PURPOSE   :   Searches theArray for user
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   theArray  - array to search
//                str       - string to search for in array
//  RETURNS   :   offset of str in theArray if found, -1 otherwise.
MyBoard.searchArray = function(theArray, str) {
  var self = "MyBoard.searchArray";
  
  var result = -1;
  for (var i=0; i < theArray.length; i++) {
    if(str == theArray[i]) {
      result = i;
    }
  }
  Core.leave(self, str + " result:" + result);
  return result;
}
//-------------------------------------------------------------------------------------------------------



//----------------------------------MyBoard.toggleUserInList()-------------------------------------------
// FUNCTION:    MyBoard.toggleUserInList(ListObj, userIdentifier, offset) 
// PURPOSE:     if user is already in the ListObj's users list, removes them; else adds them. then refreshes
//              the persistent data.
// ASSUMES:     -
// AFFECTS:     List object, user object, peristent storage
// PARAMETERS:  ListObj    -      list object for users list to be adjusted.
 //             userIdentifer -   user identifer (userName or userId) to add or remove to/from ListObj
 //             offset -          OPTIONAL. if specified, it's the offset of the user within the
 //                               List  Object.userKeys array.
 // Returns:   the offset of the user if added to the list,
 //            -1 if removed from the list,
 //            null if an error
MyBoard.toggleUserInList = function(ListObj, userIdentifier, offset) {
  var self = "MyBoard.toggleUserInList";
  
  var loc, confirmed, UserObj, userKey;

  Core.enter(self, "userIdentifier: '" + userIdentifier +"' ListObj: " + ListObj.shortName + " offset:" + offset + " userKeys: '" + ListObj.userKeys + "'");
  // Ensure lists are populated
  if (!MyBoard.isListsPopulated) {
    Core.log(self, "MyBoard lists aren't populated. populating...");
    MyBoard.getLists();
  }

  UserObj = MyBoard.lookupUserObject(userIdentifier);
  if (!UserObj) {
    Core.error(self, "Unknown user - bailing ...  user:" + userIdentifier);
    throw(self + ": unknown user");
  }

  userKey = UserObj[ListObj.userKeyType];

  // determine whether adding or removing, and where it is, if removing.
  loc = -1;
  if (arguments.length == 3) {
    //offset specified - confirm location
    if (ListObj.userKeys[offset] == userKey) {
      loc = offset;
    } else {
      Core.error(self,"offset for " + ListObj.shortName + " list specified: " + offset + " ,but userKey: " + userKey + " not found. Instead, found: " + ListObj.userKeys[offset]);
      return null
    }
  } else {
    // offset not specified. Search the list...
    loc = MyBoard.searchArray(ListObj.userKeys, userKey);
  }


  // Action (add or remove) determined. Now Update ListObj to implement the change
  confirmed = true;
  if (loc >= 0) {
    // Removing from list, confirm if required, then take it out of array, save the data.
    if (ListObj.confirmAction &&
        !confirm("Are you sure you want to REMOVE this user[" + userKey + "] from your " + ListObj.shortName + " list?") ) {
        confirmed = false;
    }
    if (confirmed) {
     ListObj.removeMember(UserObj, loc);
     loc = -1;
      Core.log(self, "REMOVED: " + userKey + " From List " + ListObj.shortName + " at location " + loc + "\n\t\t\tNew list is: '" + ListObj.userKeys + "'");
    }
  }  else {
    // Add to list & append to array
   if (ListObj.confirmAction &&
        !confirm("Are you sure you want to ADD this user[" + useKey + "] to your " + ListObj.shortName + " list?") ) {
        confirmed = false;
    }
    if (confirmed) {
      UserObj = MyBoard.lookupUserObject(userKey);
      if (!UserObj || (typeof UserObj == "undefined")) {
        Core.error(self, "Unable to find user object for user: " + userKey + " bailing...");
        throw("unable to find user object for " + userKey);
      }
      //add this member and udpate persistent data/mark dirty.
      loc = ListObj.addMember(UserObj, false, true); 
      Core.log(self, "ADDED: " + userKey + " to List " + ListObj.shortName + " at location " + loc + "\n\t\t\tNew list is: '" + ListObj.userKeys + "'");
    }
  }
  Core.leave(self, "returning: " + loc);
  return loc
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.toggleUserInListMenuObject() --------------------------------------------------
//  FUNCTION  :   MyBoard.toggleUserInListMenuObject(event)
//  PURPOSE   :   Handles click event to toggle user in/out of list from menu dialogs like Show Lists.
//  ASSUMES   :   Lists are populated. the TR record for target row has a className=<MyBoard.listButtonClassNamePrefix><MyBoard.listButtonClassPrefix>
//                href of target has # followed by string to use for user to be removed.
//  AFFECTS   :   Persistent storage for this list. Stops other processing for this event.
//  PARAMETERS:   event - DOM element which was clicked
//  RETURNS   :   null
MyBoard.toggleUserInListMenuObject = function (event) {
  var self = "MyBoard.toggleUserInListMenu";

  var removedPrefix, ListObj, listName, userIdentifier, buttonPressed, trTag, inList;

  removedPrefix = "Removed: ";
  //get the listname and assign ListObj;
  buttonPressed = event.currentTarget;
  // if a link is in the tag, do nothing in this handler.
  if (buttonPressed.href != "javascript:%20void(0)") return;  
  
  //no link in tag - treat as member name & toggle them in/out of list ...
  trTag = event.currentTarget.parentNode.parentNode;
  if ((trTag.tagName != "TR") || (typeof trTag.className == "undefined" )) {
    Core.error(self,"expected element to be anchor within <tr class='" + MyBoard.listButtonClassPrefix + "' Found: " + trTag.html);
    return;
  } else {
    // if it's a list that only applies to posts, toggle user out of the list. otherwise, do nothing;
    shortName = MyBoard.getValueFromClassName(trTag.className,MyBoard.listButtonClassNamePrefix);
    if (shortName) {
      ListObj = MyBoard.listsByShortName[shortName];
      //parse the listname off the classname of the TR record

      //get the user;
      userIdentifier = event.currentTarget.textContent;
      //if user was removed during this dialogbox session, the text will have "user: " user " removed.". parse out the user
      if (userIdentifier.indexOf(removedPrefix) == 0) {
        userIdentifier = userIdentifier.substr(removedPrefix.length);
      }

      // if userIdentifier is an ID, extract the portion after ID:
      if (userIdentifier.indexOf(MyBoard.idPrefix) == 0) {
        userIdentifier = userIdentifier.substr(MyBoard.idPrefix.length);
      } 
      
      // toggle user into or out of list
      Core.logWithHeader(self," userIdentifier: '" + userIdentifier + "' list: " + ListObj.shortName + " calling MyBoard.toggleUserInList...");
      inList = MyBoard.toggleUserInList(ListObj, userIdentifier);
      //update the dialog content
      if(!inList) {
        Core.error(self, "unable to toggle user - bailing...");
        return;
      }
      if (inList==-1) {
        // user was removed from the list
        buttonPressed.textContent = ListObj.addButtonTextContent;
        buttonPressed.title = ListObj.addButtonTitle
        buttonPressed.style.opacity=".65";
        buttonPressed.textContent = removedPrefix + userIdentifier;
        result = "User (" + userIdentifier + ") REMOVED from (" + ListObj.shortName +"). Updated list: " + ListObj.userKeys;
      } else {
        // user was added to the list
        buttonPressed.textContent = userIdentifier;
        buttonPressed.title = ListObj.delButtonTitle
        buttonPressed.style.opacity="1";
        result = "User (" + userIdentifier + ") ADDED to (" + ListObj.shortName +"). Updated list: " + ListObj.userKeys;
      }
    } //if listname found ok
    else {
      Core.error(self,"Expected TR classname to have list name:" + trTag.innerHTML);
      return;
    } // if it applies to posts and not topics.
  } // if-else tr node found
  event.preventDefault();
} // MyBoard.toggleUserInListMenuObject
//-----------------------------------------------------------------------------



//------------------------------------ MyBoard.clearHidesListMenu() --------------------------------------------------
//  FUNCTION  :   MyBoard.clearHidesListMenu(event)
//  PURPOSE   :   Event handler for the clear <listName> menu's.  Applies the list's clearList() method.
//  ASSUMES   :   the list name is encoded in the className for the element which triggered the event.
//  AFFECTS   :   list object.
//  PARAMETERS:   event - DOM element which triggered the event.
//  RETURNS   :   -
MyBoard.clearHidesListMenu = function(event) {
  var self = "MyBoard.clearHidesListMenu";
  Core.log(self);
  var shortName, buttonPressed;
  MyBoard.menuClose();

  // Ensure users lists are populated
  if (!MyBoard.isListsPopulated) {
    Core.log(self, "MyBoard lists aren't populated. populating...");
    MyBoard.getLists();
  }

  //get the listname, then apply the clearList() method.
  buttonPressed = event.currentTarget;
  shortName = MyBoard.getValueFromClassName(buttonPressed.className, MyBoard.menuObjectClassNamePrefix);
  if (shortName) {
    Core.log(self, "list is: " + shortName + " applying clearList...");
    MyBoard.listsByShortName[shortName].clearList();
  } else {
    Core.error(self, "Expected list name embedded in classname of DOM element:" + buttonPressed.tagName);
    return;
  }
  Core.leave(self);
}
//-----------------------------------------------------------------------------



//------------------------------------ MyBoard.addManagementLink() --------------------------------------------------
//  FUNCTION  :   MyBoard.addManagementLink(managementLinksLocation, title, href, textContent, className, buttonTagParentTagName, id)
//  PURPOSE   :   Creates and adds a post management link.
//  ASSUMES   :   -
//  AFFECTS   :   The DOM for this page.
//  PARAMETERS:   managementLinksLocation - DOM Element for management links. The new managment link is created either as a 
//                                          child (tagName buttonTagParentTagName) of an element that is a child of this 
//                                          element, or, if buttonTagParentTagName is "direct", the child of this element.
//                title                   - String to set as title for the link.
//                href                    - href property for the link.
//                textContent             - textContent property for the link.
//                className               - ClassName property for the link.
//                buttonTagParentTagName  - type of tag for parent of the link, or "direct" if link is direct child of managementLinksLocation.
//                id                      - id property for the link.
//  RETURNS   :   New DoM element for the link.
MyBoard.addManagementLink = function(managementLinksLocation, title, href, textContent, className, buttonTagParentTagName, id) {
  var self = "myBoard.addManagementLink";

  var tag, containerTag;

  tag = document.createElement("a");
  tag.title = title;
  tag.href = href;
  tag.textContent = textContent;
  tag.className = className;
  if (id != null) { tag.buttonTagId += " " + id;};
  if (buttonTagParentTagName != "direct") {
    containerTag = document.createElement(buttonTagParentTagName);
    containerTag.appendChild(tag);
    managementLinksLocation.appendChild(containerTag);
  } else {
    managementLinksLocation.appendChild(tag);
  }
  tag.style.borderStyle= "solid";
  tag.style.borderWidth = "1px 2px 2px 1px";
  tag.style.textDecoration = "none";
  tag.style.padding = "1px";
  tag.style.borderColor = "#69f #00f #00f #69f";
  tag.style.marginRight="1em";
  tag.style.display="block";
  tag.style.width="100%";
  tag.style.textAlign="center";
  Core.leave(self);
  return tag;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ () --------------------------------------------------
//  FUNCTION  :   MyBoard.addManagementButton(managementLinksLocation, title, textContent, className, buttonTagParentTagName, id)
//  PURPOSE   :   Creates and adds a post management button.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  AFFECTS   :   The DOM for this page.
//  PARAMETERS:   managementLinksLocation - DOM Element for management links. The new managment button is created either as a 
//                                          child (tagName buttonTagParentTagName) of an element that is a child of this 
//                                          element, or, if buttonTagParentTagName is "direct", the child of this element.
//                title                   - String to set as title for the button.
//                textContent             - textContent property for the button.
//                className               - ClassName property for the button.
//                buttonTagParentTagName  - type of tag for parent of the button, or "direct" if button is direct child of managementLinksLocation.
//                id                      - id property for the button.
//  RETURNS   :   New DoM element for the button.
MyBoard.addManagementButton = function(managementLinksLocation, title, textContent, className, buttonTagParentTagName, id) {
  var self = "myBoard.addManagementButton";
  Core.enter(self, "title: " + title + " className:" + className + " buttonTagParentTagName: " + buttonTagParentTagName + " id: " + id);

  var tag, containerTag;

  tag = document.createElement("input");
  tag.type="button"
  tag.style.width = "100px";
  tag.title = title;
  tag.value=textContent;
  tag.style.fontSize="90%";
  tag.className = className;
  if (textContent >= 5) {
    tag.className += MyBoard.longTextButtonClassName;
  }
  if (id != null) { tag.buttonTagId += " " + id;};
  if (buttonTagParentTagName != "direct") {
    containerTag = document.createElement(buttonTagParentTagName);
    containerTag.appendChild(tag);
    managementLinksLocation.appendChild(containerTag);
  } else {
    managementLinksLocation.appendChild(tag);
  }
  Core.leave(self);
  return tag;
}
//-----------------------------------------------------------------------------



//------------------------------------ MyBoard.addManagementToggleButton() --------------------------------------------------
//  FUNCTION  :   MyBoard.addManagementToggleButton(PostObj, ListOb, location)
//  PURPOSE   :   adds button (as child of location PostObj.managementLinksLocation) for adding or removing Provider from list in ListObj.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   PostObj   - A Post Object for post which will have the button added.
//                ListObj   - The List Object for the list that this button will toggle user in/out of. Uses the href, className, id, 
//                            buttonTagParentTagName, & managementLinksLocation properties to setup the button.

//                location  - The DOM element that will be the parent of the DOM element created for this button.
//  RETURNS   :   The DOM element for the toggle button.
MyBoard.addManagementToggleButton = function(PostObj, ListObj, location) {
  var self = "MyBoard.addManagementToggleButton";

  // set title and textContent depending on current state (in list, not in list)
  var title = "";
  var textContent = "";
  var opacity = "1";
  var fontWeight="bold";
  if (PostObj.userIsInList(ListObj)) {
      //in the list, button is for removing
      textContent = ListObj.delButtonTextContent;
      title = ListObj.delButtonTitle;
  } else {
      //not inlist, button is for adding.
      opacity = ".65"
      textContent = ListObj.addButtonTextContent;
      title = ListObj.addButtonTitle;
  }
  ListObj.buttonTag = MyBoard.addManagementLink(location,
                                                title,
                                                "javascript: void(0)",
                                                textContent,
                                                ListObj.buttonTagClassName,
                                                "direct",
                                                ListObj.buttonTagId);
  // add the event listener
  ListObj.buttonTag.addEventListener("click", PostObj.toggleUserInListButton, true);
  
  //style the button
  ListObj.buttonTag.style.backgroundColor=ListObj.backgroundColor;
  ListObj.buttonTag.style.color=ListObj.color;
  ListObj.buttonTag.style.opacity=opacity;
  ListObj.buttonTag.style.fontWeight=fontWeight;
  
  //hack for now - would be better to detrmine onscreen width.
  if (!ListObj.hides && (textContent.length > 15)) {
    ListObj.buttonTag.style.fontSize="70%";
  } else if (!ListObj.hides && (textContent.length > 11)) {
    ListObj.buttonTag.style.fontSize="80%";
  } else if (!ListObj.hides && (textContent.length > 9)) {
    ListObj.buttonTag.style.fontSize="90%";
  }
  Core.leave(self);
  return ListObj.buttonTag;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------MyBoard.addPostManagementLinks()-----------------------------------------
//  FUNCTION  :   MyBoard.addPostManagementLinks(PageObj, PostObj)
//  PURPOSE   :   Creates and adds the toggle buttons and links for posts (list toggles, posts/topics, search, etc.
//  ASSUMES   :   - 
//  AFFECTS   :   DOM elements for the page.
//  PARAMETERS:   PageObj    - The Page object for the page with this post. Uses PageObj's forumName & forumId properties
//                PostObj    - the Post Object for this post. uses PostObj's UserObj, isReplyPost, managementLinksLocation,
//                             postId, isProviderAdTopic properties and hide() method.
//  RETURNS   :  - 
// adds the links for adding/removing from lists, review search, etc as children of managementLinksLocation node element.
// if isReplyPost is true, then only puts up lists which are relevant to all (ignore posts, show user's posts, etc.)
MyBoard.addPostManagementLinks = function(PageObj, PostObj) {
  var self = "MyBoard.addPostManagementLinks";
  Core.enter(self, "userName:" + PostObj.UserObj.userName);

  var tag, thisNav, thisSubNav, list, reviewForumId, searchHref, hidesNav,listTogglesCount, ListObj, postReviewUrl;
;
  
  // ---------------------- Search Reviews Button ----------------------------------------------------------
  searchHref=MyBoard.searchPage + MyBoard.linkSuffix + "searchUser" + "&userName=" + encodeURIComponent(PostObj.UserObj.userName);
  if ((PageObj.forumName.indexOf("Provider Ads") < 0) || (PostObj.isReplyPost)) {
    //Not the topicPost for a provider ad, so add defaults=none
    searchHref += "&defaults=none";  //if not the topic post, then assume not an add & add query string to tell processSearchpage to not set forums.
  }
  //setup the container for all of the post management links/buttons
  list = document.createElement("li");
  list.style.width="100%";
  list.style.display="block";
  PostObj.managementLinksLocation.appendChild(list);
  thisNav = document.createElement("UL");
  list.appendChild(thisNav);
  tag = MyBoard.addManagementLink(thisNav,
                            "Custom search for: " + PostObj.UserObj.userName,
                            searchHref,
                            "Search: " + PostObj.UserObj.userName,
                            "MyBoardMangementLink",
                            "direct",
                            "searchbutton_" + PostObj.postId);
  //thisNav.style.height="1.8em";
  thisNav.style.display="block";
  thisNav.style.width="100%";
  thisNav.style.marginBottom="0em";
  thisNav.style.paddingBottom="0";
  //thisNav.style.marginTop="1em";
  // Put the show posts & show topics buttons as siblings in the same list element.
  //------------------------- Show posts  & Show Topics -------------------------
  //showPostsString= http://www.waterkant.net/suriname/forum/search.php?action=show_user_posts&user_id=<userId>
  thisNav = document.createElement("UL");
  thisNav.style.display="block";
  thisNav.style.clear="both";
//    thisNav.style.height="1.8em";
  thisNav.style.width="100%";
  thisNav.style.margin="0";
  thisNav.style.padding="0";
  list.appendChild(thisNav);
  thisSubNav = document.createElement("LI");
  thisNav.appendChild(thisSubNav);
  tag = MyBoard.addManagementLink(thisSubNav,
                            "Show Posts by: " + PostObj.UserObj.userName,
                            MyBoard.showPostsString + PostObj.UserObj.userId + MyBoard.linkSuffix + "showPosts",
                            "[Posts]",
                            "MyBoardMangementLink",
                            "direct",
                            "ShowPostsbutton_" + PostObj.postId);
  thisSubNav.style.padding="0";
  tag.style.fontSize="90%";
  tag.style.padding="0";
  thisSubNav.style.width="47%";
  thisSubNav.style.display="inline";
  thisSubNav.style.cssFloat="left";
//------------------------- Show topics -------------------------
//  http://www.waterkant.net/suriname/forum/search.php?action=show_user_topics&user_id=<userId>
  thisSubNav = document.createElement("LI");
  thisNav.appendChild(thisSubNav);
  tag = MyBoard.addManagementLink(thisSubNav,
                            "Show Topics by: " + PostObj.UserObj.userName,
                            MyBoard.showTopicsString + PostObj.UserObj.userId+ MyBoard.linkSuffix + "showTopics",
                            "[Topics]",
                            "MyBoardMangementLink",
                            "direct",
                            "ShowTopicsbutton_" + PostObj.postId);
  thisSubNav.style.padding="0";
  tag.style.fontSize="90%";
  tag.style.padding="0";
  thisSubNav.style.width="47%";
  thisSubNav.style.display="inline";
  thisSubNav.style.cssFloat="right";

  //----------------------------- Provider Ad Topic Post ----------------------------------------------------------------
  // add all the managment buttons which only apply to the provider topic post (eg most of the list toggles, search provider, etc)
  if (PostObj.isProviderAdTopic) {
    // --------------------- add Post Review button  ------------------------------
    thisNav = document.createElement("UL");
    list.appendChild(thisNav);

    //on tna - link to post reviews for seattle providers (forum 4) is:
    //  http://www.tnaboard.com/review_post.php?fid=4
    //eg fid= points to the ad forum & the review_post.php figures out where to post it...
    //on tnaxxhobby, link to post reviews for seattle providers (forum 9) is
    //  http://tnaxxhobby.com/post.php?fid=10
    //  eg, fid=10 points to the review forum
    //build the url...
    reviewForumId = PageObj.forumId + 1; // would be better to search, but this does work for all current TNA forums.
    Core.log(self,"MyBoard.boardId:" + MyBoard.boardId + " .postReviewPage[boardId]:" + MyBoard.postReviewPage[MyBoard.boardId]);
    postReviewUrl = MyBoard.postReviewPage[MyBoard.boardId] + reviewForumId
    if (MyBoard.boardId == "tnaxx") {
      postReviewUrl = MyBoard.postReviewPage[MyBoard.boardId] + reviewForumId;
    }
    postReviewUrl += MyBoard.linkSuffix + "postReview" + "&providerName=" + encodeURIComponent(PostObj.UserObj.userName);
    tag = MyBoard.addManagementLink(thisNav,
                              "post a review for provider: " + PostObj.UserObj.userName + "(" + PostObj.UserObj.userId + ") in forum " + reviewForumId,
                              postReviewUrl,
                              "Post Rev:" + PostObj.UserObj.userName,
                              "MyBoardMangementLink",
                              "direct",
                              "postreviewButton_" + PostObj.postId);
    thisNav.style.width="100%";
    thisNav.style.display="block";
    thisNav.style.clear="both";
    thisNav.style.marginBottom="3px";
    thisNav.style.paddingBottom="0";

    // ----------------------add the list toggle buttons ---------------------------------
    thisNav = null;
    hidesNav = null;
    listTogglesCount = 0;
    for (var i=0; i < MyBoard.lists.length; i++) {
      ListObj = MyBoard.lists[i];
      // only show this list if it's in the MyBoard_Lists display group & this is an Ad's Topic Post
      if (ListObj.displayButtonOnPostDivType["providerAdTopicPost"]) {
        if (ListObj.displayGroup == "MyBoard_lists") {
          if (!thisNav) {
            //first list, create UL container
            thisNav = document.createElement("UL");
            list.appendChild(thisNav);
            thisNav.style.display="block";
            thisNav.style.clear="both";
            thisNav.style.width="100%";
          }
          thisSubNav = document.createElement("LI");
          thisNav.appendChild(thisSubNav);
          MyBoard.addManagementToggleButton(PostObj, ListObj, thisSubNav);
          thisSubNav.style.width="47%";
          thisSubNav.style.display="inline";
          listTogglesCount++;  //update count of toggles added
          thisSubNav.style.cssFloat= (listTogglesCount%2 == 1) ? "left": "right";
        } else if (ListObj.displayGroup=="MyBoard_hides") {
          //a list that hides - display after the other lists
          if (!hidesNav) {
            //first one, create UL container node
            hidesNav = document.createElement("UL");
            hidesNav.style.display="block";
            hidesNav.style.clear="both";
            hidesNav.style.width="100%";
          }
          thisSubNav = document.createElement("LI");
          hidesNav.appendChild(thisSubNav);
          thisSubNav.style.clear="both";
          thisSubNav.style.height="100%";
          tag = MyBoard.addManagementToggleButton(PostObj, ListObj, thisSubNav);
          tag.style.clear="both";
          tag.style.height="1.5em";
          tag.style.marginTop="2px";
          tag.style.paddingTop=".2em";
          tag.style.paddingBottom=".2em";
        }
      } //if list gets displayed on ad Topic post.
    } //for each list
    
    // add the list(s) if any hides found
    if (hidesNav) {
      list.appendChild(hidesNav);
      hidesNav.style.marginTop="3px";
      hidesNav.style.paddingTop="3px";
      hidesNav.style.height="1.5em";
    }
  } // if PostObj isProviderAd
    
  // --------------------------------- Add buttons for posts which are not the Provider ad Topic --------------------------------------
  if (!PostObj.isProviderAdTopic) {
    for (var i=0; i < MyBoard.lists.length; i++) {
      var ListObj = MyBoard.lists[i];
      // one button per line for the list toggles
      if (ListObj.displayButtonOnPostDivType["replyPost"] ||
          ListObj.displayButtonOnPostDivType["topicPost"]) {
        thisNav = document.createElement("UL");
        list.appendChild(thisNav);
        thisNav.style.display="block";
        thisNav.style.clear="both";
        thisNav.style.width="100%";
        tag = MyBoard.addManagementToggleButton(PostObj, ListObj, thisNav);
        tag.style.clear="both";
        tag.style.height="1.5em";
        tag.style.marginTop="2px";
        tag.style.paddingTop=".2em";
        tag.style.paddingBottom=".2em";
        //if user is ignored, hide them.
        if (PostObj.UserObj.userIsIgnored) {
            PostObj.hide(MyBoard.listsByShortName["IGNORED"]);
        }
      } // if we display this on replies..
    } //for each list
  } // if not a provider ad topic post
  return;
  Core.leave(self);
} //MyBoard.addPostManagementLinks
//-----------------------------------------------------------------------------------------------------------------------



// ------------------------------MyBoard.parseViewTopicPost () ----------------------------------------------------------
//  FUNCTION  :   MyBoard.parseViewTopicPost(PageObj, PostObj, postDiv)
//  PURPOSE   :   Parses the DOM for a viewTopic post, setting the properties for PostObj and PageObj.
//  ASSUMES   :   -
//  AFFECTS   :   PostObj and PageObj; user object for the user who did this post;
//  PARAMETERS:   PageObj   - The Page object for the page with this post.
//                PostObj   - The Post object for the page with this post. The post must be a post on a viewTopic page.
//                postDiv   - The DOM div element which contains this post.
//  RETURNS   :   -
MyBoard.parseViewTopicPost= function(PageObj, PostObj, postDiv) {
  var self = "MyBoard.parseViewTopicPost";
  Core.enter(self, "Postcount:" + PageObj.posts.length);

  var userName, userId, tags;
  
  //------------------- PostObj.div, userName, userId - get/create user Object & set.
  PostObj.div = postDiv;
  userName = MyBoard.getuserNameFromTopicPostDiv(postDiv);
  userId = MyBoard.getUserIdFromViewTopicPostDiv(postDiv);

  // set the UserObj for this post, creating it if necessary. Update UserObj's lastAdHref if this is an ad and it's newer.
  PostObj.UserObj = MyBoard.getUserObject(userName, userId, false);
  if (PostObj.isProviderAdTopic) {
    PostObj.UserObj.checkAndUpdateLastAdHref(PageObj.url);  
  }

  // ------------------ postId -------------------------------
  PostObj.postId = MyBoard.getPostIdFromTopicPostDiv(postDiv);
  PageObj.postsByPostId[PostObj.postId] = PostObj; 

  //  --------------- userTitle ---------------
  tags = Core.getElementsByClass("usertitle", postDiv);
  tags = tags[0].getElementsByTagName("span");
  PostObj.UserObj.userTitle = tags[0].textContent;

  // ----------- userStatus --------------------
  tags = Core.getElementsByClass("userstatus", postDiv);
  tags = tags[0].getElementsByTagName("span");
  PostObj.UserObj.userStatus = tags[0].textContent;

  // -------------- reply or a topic post -------------------
  PostObj.isReplyPost = Core.isTheNode(postDiv, MyBoard.ReplyPostClassPattern, MyBoard.replyPostClassElementName);
  PostObj.isTopicPost = !PostObj.isReplyPost;
} //MyBoard.parseViewTopicPost
//-----------------------------------------------------------------------------


//==============================  POST OBJECT ==================================================

//------------------------------------ Post() --------------------------------------------------
//  FUNCTION  :   Post()
//  PURPOSE   :   Post constructor function - used to make Post objects to track information about post we're currently processing.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   this Post object.
// 
var Post = function() {
  this.UserObj=           null;       // user Object for user who created this post.
  this.pageObject=        {};          // page object for the page containing this post.
  this.postId=            "";          // id property of the DIV with className "posthead" for this post.
                                        //    has form p<number>, as in p1865318.  The post permalink can be
                                        //    built wth the id. eg: /viewtopic.php?pid=1865318#p1865318
  this.div=               {};          // div containing the post;
  this.postNumber=        -1;          // the number of this post on this page.
  this.postIndex=         -1;          // the index of this ost on this page into the MyBoard.Page.posts[] array.
  this.isSummaryTopic =   false;       // gets set true if post is a summaryTopic post.
  this.summaryTopicIcon = null;        // gets set to icon element for summarytopics.
  this.summaryTopicTargetHref = null;  // gets set to the href for the topic page when this is a summaryTopic post.
  this.managementLinksLocation=  null; // location where we put the links
  this.hiddenDiv=         null;        // location of stuff to show when post hidden; gets set by .hide method
  this.showDiv=           null;        // location of stuff to show when post shown.  gets set by .show method
  this.isTopicPost=       false;       // true if this is the Topic Post for a viewTopic page, false otherwise.
  this.isReply=           false;       // true if this is a Reply post, false otherwise.
  this.isHidden=          false;       // true if this post is currently hidden, false otherwise.
  this.isProviderAdTopic= false;       // true if this posts is the topic post for a Provider Ad, false otherwise.
  this.isSummaryForAd=    false;       // True if this post is a summaryTopic for a provider Ad, false otherwise.
  return this;
};
//--------------------------------------------------------------------------------------



//------------------------------------ Post.prototype.hide() --------------------------------------------------
//  FUNCTION  :   Post.prototype.hide(ListObj)
//  PURPOSE   :   Hides this post, replacing it with a small banner Div which can be clicked to unhide the post.
//  ASSUMES   :   Post object's .div property is set.
//  AFFECTS   :   Post object .hiddenDiv property (when creating element), .showdiv property, .isHidden property.
//  PARAMETERS:   ListObj - List  object - Post is being hidden because user is on this list.
//  RETURNS   :   DOM element for the hidden div.
Post.prototype.hide = function (ListObj) {
  var self = "Post.prototype.hide";
//Core.log(self);
  var tag;
  if (!this.isHidden) {
    if (!this.hiddenDiv) {
      //create div to show when post is hidden.
      this.showDiv = this.div;  //initialize .showDiv;
      this.hiddenDiv = document.createElement("div");
      this.hiddenDiv.className="MyBoard_hideDiv";
      tag = MyBoard.addManagementToggleButton(this, ListObj, this.hiddenDiv);
      tag.style.border="0px";
      tag.textContent =  ((this.isSummaryTopic)? "Ad " : "Post") + " by " + this.UserObj.userName + " is hidden - click here to unhide & remove " + this.UserObj.userName + " from " + ListObj.shortName;
    }
    this.hiddenDiv.style.display="inline";
    this.showDiv.style.display = "none";
    this.isHidden = true;
    //insert the dom element
    Core.insertAfter(this.hiddenDiv, this.div)
    MyBoard.Page.hiddenPostsCount++;
  } //if post is not hidden
}
//--------------------------------------------------------------------------------------



//------------------------------------ Post.prototype.show() --------------------------------------------------
//  FUNCTION  :   Post.prototype.show()
//  PURPOSE   :   Makes post visible by unhiding it if it is hidden.
//  ASSUMES   :   Post object's .div & .isHidden property is set.
//  AFFECTS   :   Post object .hiddenDiv property (when creating element), .showdiv property, .isHidden property.
//  PARAMETERS:   -
//  RETURNS   :   DOM element for the Post's showDiv
Post.prototype.show = function () {
  var self = "Post.prototype.show";
  Core.enter(self, " postId:" + this.postId + " postNumber:" + this.postNumber);

  if (this.isHidden) {
    //if posts .showDiv isn't set, use the post div as the show div.
    if (!this.showDiv) {
      this.showDiv = this.div;
    }
    this.hiddenDiv.style.display="none";
    this.showDiv.style.display = "";
    this.isHidden = false;
    MyBoard.Page.hiddenPostsCount--;
  } //if isHidden
}
//-------------------------------------------------------------------------------------------------------------------------------



// -------------------------------- Post.prototype.userIsInList() ----------------------------------------------------------------
//  FUNCTION  :   Post.prototype.userIsInList(ListObj)
//  PURPOSE   :   Determines if the user who made ths post is in the list in ListObj.
//  ASSUMES   :   ListObj is populated; Post's UserObj is populated.
//  AFFECTS   :   -
//  PARAMETERS:   ListObj - List object for the list to be checked
//  RETURNS   :   true if user is in the list, false otherwise.
Post.prototype.userIsInList = function (ListObj) {
    var self = "Post.prototype.userIsInList"
    Core.enter(self,"ENTERING...Post: " + this.postNumber + " user:" + this.UserObj.userDisplayName() + " list:" + ListObj.shortName);

    var result;
    
    result = MyBoard.searchArray(ListObj.userKeys, this.UserObj[ListObj.userKeyType]);
    result = (result < 0)? false : true;
    return result;
}
//-----------------------------------------------------------------------------



//------------------------------------ Post.prototype.setList() --------------------------------------------------
//  FUNCTION  :   Post.prototype.setList()
//  PURPOSE   :   Determines highest priority list for the user who created this post & applies list's settings.
//  ASSUMES   :   Post Object, MyBoard.lists, and user object is populated.
//  AFFECTS   :   this Post object. List Object, User Object (for user who did this post), DOM for this post
//  PARAMETERS:   -
//  RETURNS   :   List Object for the list which has highest priority for this post (eg the one to use for display styling).
Post.prototype.setList = function () {
  var self = "Post.prototype.setList";

  var listWithUser, iconTitle, ListObj, str, loc, TempListObj;

  listWithUser = null;
  iconTitle = "";  //gets set with descriptive title for icon, but only used on summaryTopics.
  //Determine which list. It's generally the first list that the user is in, but can be a later list if the user is ignored etc.
  //can also be not on any list if user isn't on any list and hasn't been added to none list yet ...
  for (var i=0; i<MyBoard.lists.length; i++) {
    ListObj = MyBoard.lists[i];
    if (this.userIsInList(ListObj)) {
      if (ListObj.hides && (MyBoard.Page.isCustomSearchResults || (this.isSummaryTopic && !this.isSummaryForAd))) {
        // special case - woudl normally apply & hide, but we Don't hide when its custom search or it's a topic post for something that's not an ad
        // since this list is not applied, searching will continue
        str = MyBoard.Page.isCustomSearchResults ? "topics in custom search results." : "topics that are not for ads.";
        iconTitle += this.UserObj.userName + " is on your " + ListObj.shortName + " list, but MyBoard doesn't hide " + str;
        listWithUser = ListObj;
      } else {
        // found the list to use
        iconTitle += this.UserObj.userName;
        iconTitle += (ListObj.shortName == "NONE") ? " is not on any of your lists. Click to block ads from " + 
                          this.UserObj.userName :  " is on your " + ListObj.shortName + " list.";
        listWithUser = ListObj;
        if (ListObj.hides) {
          if (ListObj.applies[MyBoard.Page.pageType] ) {
             this.hide(ListObj); 
          }
        }
        break; //done searching...
      } //poster found in list
    }
  } //for each list
  
  if (!listWithUser) {
    //Not in any lists - add to NONE list
    ListObj = MyBoard.NoneList;
    ListObj.addMember(this.UserObj);
    iconTitle = this.UserObj.userName + " is not on any of your lists. Click to block ads from " + this.UserObj.userName;
  }

  //if there is a summaryTopicIcon, set the title...
  if (this.summaryTopicIcon) {
    this.summaryTopicIcon.title = iconTitle;    
  }

  //include this post on the ListObj's posts array if it's not there already
  loc=null;
  for (var i=0; i<ListObj.posts.length; i++) {
    if (ListObj.posts[i] === this) {
      loc = i;
      //Core.log(self, "post " + this.postNumber + " is already in posts for " + ListObj.shortName);
      break;
    }
  }
  if (!loc) {
    ListObj.posts.push(this);
    str = "";
    for (var i=0; i<ListObj.posts.length; i++) {
      str += ListObj.posts[i].postNumber + "  ";
    }
    //Core.log(self, "post " + this.postNumber + " added to " + ListObj.shortName + "'s posts. Updated post for this list\n:" + str); 
  }

  //remove this post from any other lists arrays (since they don't apply to this post):
  for (var i=0; i<MyBoard.lists.length; i++) {
    TempListObj = MyBoard.lists[i];
    if (!(TempListObj === ListObj)) {
      var j=0;
      while (j<TempListObj.posts.length) {
        if (TempListObj.posts[j] === this) {
          TempListObj.posts.splice(j,1);
        } else {
          j++;
        }
      } //while
    } //if not this list
  } // for each list

  
  
  str = "Processed Post (" + this.postIndex + ") postId: " + this.postId + " userKey: " + this.UserObj.userName + " ";
  str += "***** User in list: " + ListObj.shortName;
  this.div.style.background = ListObj.backgroundColor;
  //set the anchor text if it's a sticky
  //this.div.style.color = ListObj.color;
  
  
  // if the div is a sticky, force the link colors if link is dark
  //var links = this.div.getElementsByTagName("A");
  
  //.brd a:hover, .brd a:active, .brd a:focus, .brd p.feed a:hover, .brd p.feed a:active, .brd p.feed a:focus {
  //  color: #B42000;
  //  text-decoration: none;


  //Core.log(self,str);
  return ListObj;
}
// --------------------------------------------------------------------------------------------



//----------------------------------Post.prototype.toggleUserInListButton() -------------------------------------------
//  FUNCTION  :   Post.prototype.toggleUserInListButton(event)
//  PURPOSE   :   event handler for clicking on the list toggle buttions (atf, etc) that toggle user in/out of list.
//                Also handles menu event (clicking a user name in a menu or dialog).
//  ASSUMES   :   The lists shortName is embedded in a className and retrieveable with MyBoard.getValueFromClassName.
//  AFFECTS   :   List object, user objects, persistent data. prevents any additional events for this action.
//  PARAMETERS:   event - DOM element that triggered the event.
//  RETURNS   :   -
Post.prototype.toggleUserInListButton = function(event) {
  var self="Post.prototype.toggleUserInListButton";

  var shortName, buttonPressed, tag, ListObj, postId=null, PostObj, TempPostObj, inList, userKey, userName, action;

  buttonPressed = event.currentTarget;
  tag = buttonPressed;
  event.preventDefault();

  // ------------------------- determine which LIST ---------------------------------------------
  if (typeof buttonPressed.className == "undefined" ) {
    Core.error(self,"expected to find list name in classnames, but no class name set");
    return;
  }

  shortName = MyBoard.getValueFromClassName(buttonPressed.className,MyBoard.listButtonClassNamePrefix);
  if (!shortName) {
    shortName = MyBoard.getValueFromClassName(buttonPressed.className,MyBoard.toggleBlockedClassNamePrefix);
    //Core.log(self, "Post number: " + this.postNumber + " toggled blocked: " + shortName);
  }

  if (!shortName || !MyBoard.listsByShortName[shortName] || (typeof MyBoard.listsByShortName[shortName] == "undefined")) {
    Core.error(self, "unable to parse list name from classes:" + buttonPressed.className);
    return;
  }
  ListObj = MyBoard.listsByShortName[shortName];

  // ------------------------- determine which POST & which USER  ---------------------------------------------
  // get the Post Object - if it's not found, we're being called from a menu instead of a button on a page
  postDiv = MyBoard.getPostDiv(tag);
  if (!postDiv) {
    //no div found...
    Core.error(self,"Expected to find a div for the topic or post:" + Core.enumerateElement(buttonPressed));
    throw ("expected to find DIV for this post or topic");
  }
  //Retrieve the PostId & use to lookup the Post Object.
  if (MyBoard.Page.hasViewTopicPosts) {
    postId = MyBoard.getPostIdFromTopicPostDiv(postDiv);
  } else if (MyBoard.Page.hasSummaryTopicPosts) {
    TempPostObj = new Post();
    TempPostObj.parseSummaryTopicPost(postDiv);
    postId = TempPostObj.postId;
  } else {
    Core.error(self, "expected page with topics or posts; found neither");
    throw("expected page with topics or posts - found neither");
  }
  PostObj = MyBoard.Page.postsByPostId[postId];
  inList = PostObj.userIsInList(ListObj);
  userKey = PostObj.UserObj[ListObj.userKeyType];
  userName = PostObj.UserObj.userName;

  //---------------------------------- Information collected, now toggle userKey in/out of list & update posts --------------------------
  Core.logWithHeader(self, "Post: " + PostObj.postId + " userKey (" + userKey + ") and list: " + ListObj.shortName);
  var result = "result:"
  inList = MyBoard.toggleUserInList(ListObj, userKey);
  Core.log(self, "after inList:" + inList);
  if(!inList) {
    Core.error(self, "unable to toggle userKey - bailing...");
    return;
  } else {
    //Core.logWithHeader(self, "inList:" + inList + " userKey:" + userKey);
    if (buttonPressed.tagName == "A" && !Core.isInClasses("MyBoard_hideDiv", buttonPressed.parentNode.className)) {
      // if it's actually a management button, update the button ui 
      if (!((ListObj.hides) && (ListObj.applies[MyBoard.Page.pageType]))) {
        //update button since it won't hide this topic....
        if (inList==-1) {
          // userKey was removed from the list, update button text
          buttonPressed.textContent = ListObj.addButtonTextContent;
          buttonPressed.title = ListObj.addButtonTitle
          buttonPressed.style.opacity=".65";
          result = "User (" + userKey + ") REMOVED from (" + ListObj.shortName +"). Updated list: " + ListObj.userKeys;
        } else {
          // userKey was added to the list, update button text
          buttonPressed.textContent = ListObj.delButtonTextContent;
          buttonPressed.title = ListObj.delButtonTitle
          buttonPressed.style.opacity="1";
          result = "User (" + userKey + ") ADDED to (" + ListObj.shortName +"). Updated list: " + ListObj.userKeys;
        }
      }
    }
    action = null;
    if ((ListObj.hides) && (ListObj.applies[MyBoard.Page.pageType])) {
      // this change either hides or shows posts by userKey on this page
      action = (inList >-1 ) ? "hide" : "show";
      Core.log(self,"action: " + action + " for userKey: " + userKey + " on list: " + ListObj.shortName);
    }
    
    // update posts by this userKey for new list
    for (var i=0; i< MyBoard.Page.postsByUserName[userName].length; i++) {
      MyBoard.Page.postsByUserName[userName][i].setList();
      if (action) {
        MyBoard.Page.postsByUserName[userName][i][action](ListObj);
      }
    }
  }
  Core.leave(self, result);
  return;
}
//-----------------------------------------------------------------------------------------------------------------------



//----------------------MyBoard.getValueFromClassName-------------------------------------------------------
//  FUNCTION  :   MyBoard.getValueFromClassName(value, prefix)
//  PURPOSE   :   Examines string of "words" seperated by space (eg like classes for a DOM element) and if any of 
//                the words in the string are in the format built by MyBoard.buildClassNameWithValue using prefix,
//                returns the value which was used to build it. 
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   value  - the string to get the value from.
//                prefix - the prefix used to build the string. The value is the portion after the prefix up to the whitespace/end of string.
//  RETURNS   :   the value, if found, else ""
MyBoard.getValueFromClassName = function(value, prefix) {
  var self = "MyBoard.getValueFromClassName";
  Core.enter(self,"value: " + value + " prefix:" + prefix)
  
  var pattern = new RegExp("(^| )(" + prefix + ")(.+?)( |$)")
  var result=value.match(pattern);
  if (result && result.length >=4) {
      //found it - it's the part that matches the (prefix) portion of regexp)
      Core.leave(self,"returning value: " + result[3]);
      return result[3];
  } else {
    Core.leave(self, "word with prefix not found");
    return null;
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//----------------------MyBoard.buildClassNameWithValue-------------------------------------------------------
//  Creates a string which can be used as a node class name, which begins
//  with prefix and can be decoded by MyBoard.getValueFromClassName to retrieve the word
//  later (from event handler for example).
//
MyBoard.buildClassNameWithValue = function(value, prefix) {
  var self = "MyBoard.buildClassNameWithValue";
  Core.enter(self,"value: " + value + " prefix:" + prefix)
  //should add code to confirm value & prefix are legit characters
  return prefix + value
}
//-----------------------------------------------------------------------------------------------------------------------



//-------------------------MyBoard.Page.init() ----------------------------------------------------
//  FUNCTION  :   MyBoard.Page.init
//  PURPOSE   :   Initializes the MyBoard.Page object, including pageType and other page related properties.
//                note: if page is a redirect page, doesn't attempt to process any other properties.
//  ASSUMES   :   -
//  AFFECTS   :   MyBoard.Page, MyBoard object
//  PARAMETERS:   -
//  RETURNS   :   none
MyBoard.Page.init = function() {
  var self = "MyBoard.Page.init";
  var tag, loginUrl, crumbs;
  
  this.referredByMyBoardLink = false;
  this.unknownAction = false;
  this.url = document.location.href;
  this.domain = ""
  // confirm it's a domain we look at, else bail
  for (var i=0;i< MyBoard.supportedDomains.length; i++) {
    if (MyBoard.supportedDomains[i].indexOf(document.domain) > -1) {
      this.domain = document.domain;
      if (this.domain.indexOf("www") < 0) this.domain = "www." + this.domain;
      MyBoard.boardId = MyBoard.boardIdsByDomain[this.domain];
      MyBoard.savedUsersListKey = MyBoard.savedUsersListKeyPrefix + MyBoard.boardId;
    }
  }
  if (this.domain == "") {
    Core.log(self, "not a supported domain, bailing... : " + document.domain);
    this.skipFurtherProcessing=true;
    return;
  }

  // check for redirect page
  if (document.title.indexOf("Redirecting") == 0) {
    MyBoard.Page.pageType = "redirecting";
    this.skipFurtherProcessing=true;
    return;
  }

  this.pathname = document.location.pathname;
  this.search = document.location.search;
  this.queryStrings = Core.getQueryStrings(this.url);

  //Check if page is being accessed via clicking MyBoard Link & confirm user logged in if it is.
  if (this.queryStrings.hasOwnProperty("MyBoardLink")) {
    // Got here by clicking one of the management buttons.
    this.referredByMyBoardLink = true;
    // make sure we're logged in
    tag = document.getElementById("navlogin");
    if (tag && (typeof tag!= "undefined")) {
      Core.log(self, "user is not logged in - alerting & redirecting to login page");
      //display an alert & then go to login page when they click okay.
      loginUrl = "http://" + this.domain + "/login.php";
      Core.alert("<strong>You need to be logged in to complete this action.</strong><br><br>If you were already logged in, the board may have logged you out due to inactivity<br><br>" +
                    "Click <strong>OK</strong> to proceed to login page, or press your <strong>BACK button</strong> to return to the previous page",
                    "Need to be logged in",null,
                    function() {location.replace(loginUrl)});
      this.skipFurtherProcessing=true;
      Core.exit();
    }
  }
  
  this.posts = [];
  this.pageType = null;
  if ((this.pathname.indexOf("/viewforum.php") > -1) &&
     (this.queryStrings.hasOwnProperty("id") ||  this.queryStrings.hasOwnProperty("fid"))) {
    // ----------------------------------- VIEWFORUM ---------------------------------------------------------------
    this.pageType = "viewForum";
    this.isAtAGlanceSupported = true;
    //get the formumId and forumName
    MyBoard.Page.getForumInformationFromViewForumPage(document);
    this.hasSummaryTopicPosts= true;
  } else if ((this.pathname.indexOf("/viewtopic.php") > -1) &&
            (this.queryStrings.hasOwnProperty("id") ||  this.queryStrings.hasOwnProperty("pid"))) {
    // ----------------------------------- VIEWTOPIC ---------------------------------------------------------------
    this.pageType = "viewTopic";
    this.hasViewTopicPosts= true;
    this.topicId = this.queryStrings.hasOwnProperty("id") ?  this.queryStrings["id"] :  this.queryStrings["pid"];
    //set the forum properties.
    this.getForumInformationFromViewTopicPage(document);
  } else if (this.pathname.indexOf("/search.php") > -1) {
    // ----------------------------------- SEARCH ------------------------------------------------------------------
    // search url. type of page depends on query strings
      // search url with query strings. Either one we know about or this is an unknown pageType
      if ((this.referredByMyBoardLink) && (this.queryStrings.MyBoardLink == "searchUser")) {
         // this is the search form page, loaded by clicking the MyBoard post management link for search reviews
        this.pageType = "search";
      } else if (this.queryStrings.hasOwnProperty("action")) {
        if (this.queryStrings["action"] == "show_user_topics") {
          this.pageType = "searchResults";
          this.skipFurtherProcessing=true;
          this.hasResultsByTopic = true;
          this.hasResultsByPost = false;
          this.hasSummaryTopicPosts= true;
          this.isAtAGlanceSupported = false;
        } else if (this.queryStrings["action"] == "show_user_posts") {
          this.pageType = "searchResults";
          this.skipFurtherProcessing=true;
          this.hasResultsByTopic = false;
          this.hasResultsByPost = true;
          this.hasSummaryTopicPosts= false;
          this.isAtAGlanceSupported = false;        
        } else if ((this.queryStrings["action"] == "show_new" ||
             this.queryStrings["action"] == "show_recent" ||
             this.queryStrings["action"] == "show_unanswered")) {
          this.pageType = "searchResults";
          this.hasResultsByTopic = true;
          this.hasResultsByPost = false;
          this.hasSummaryTopicPosts= true;
          this.isAtAGlanceSupported = true;
        } else {
          //unknown action= search results
          this.pageType = "searchResults";
          this.hasResultsByTopic = false;
          this.hasResultsByPost = false;
          this.hasSummaryTopicPosts= false;
          this.isAtAGlanceSupported = false;       
        }
      } else if (this.queryStrings.hasOwnProperty("search_id") &&
                  (!isNaN(this.queryStrings["search_id"]) || Core.size(this.queryStrings) > 0)) {
        // search results of custom search, or unrecognized query string - need to look at page to determine whether results are by Post or by Topic.
        // if it's by topic, each topic Div class will include "main-item", versus if by post, will include "post".
        // Alternately, could have looked at document for id="brd-searchtopics" & "brd-searchposts".
        this.pageType = "searchResults";
        this.isCustomSearchResults = true;
        var resultsByTopic = (Core.getElementsByClass("main-item",document).length > 0);
        var resultsByPost  = (Core.getElementsByClass("post",document).length > 0);
        if (resultsByTopic && !resultsByPost) {
          // results are by Topic
          this.hasResultsByTopic = true;
          this.hasResultsByPost = false;
          this.isAtAGlanceSupported = true;
        } else if (!resultsByTopic && resultsByPost) {
          // results by Post
          this.hasResultsByTopic = false;
          this.hasResultsByPost = true;
        } else {
          // Empty search results or unknown state
          this.hasResultsByTopic = false;
          this.hasResultsByPost = false;
          this.pageType = "search";
        }
        this.hasViewTopicPosts= this.hasResultsByPost;
        this.hasSummaryTopicPosts= this.hasResultsByTopic;
      } else {
        // no query string - it's the search form page
        this.pageType = "search";
      }
      // -------------------------------------------- END of SEARCH ------------------------------------------------
  } else if (this.pathname.indexOf("/misc.php") > -1) {
    // ----------------------------------- MISC ---------------------------------------------------------------
    // misc.php - determine which one; 
    this.skipFurtherProcessing=true;
    for (var name in this.queryStrings) {
      if (name == "email") {
        // this is a page to submit email
        this.pageType = "emailForm";
        break;
      } else if (name == "action" && this.queryStrings[name] == "rules") {
        // rules page
        this.pageType = "rules";
        break;
      } else if (name == "section" && this.queryStrings[name] == "pun_pm") {
        this.pageType = "privateMessage";
      }      
    }
    if (this.pageType == null) {
      Core.error(self, "unrecognized Query String. Setting pageType=unknown; MISC.PHP url: " + this.url);
      this.pageType="unknown";
    }
  } else if (this.pathname.indexOf("/profile.php") > -1) {
    // ----------------------------------- PROFILE ---------------------------------------------------------------
    if (this.queryStrings.hasOwnProperty("id")) {
      this.pageType = "profile";
      this.skipFurtherProcessing=true;
      this.userId = this.queryStrings["id"];
    } else {
      Core.error(self, "expected id= query string on profile.php: " + this.url);
    }
  } else if ((this.pathname.indexOf("/review_post.php") > -1) && this.queryStrings.hasOwnProperty("fid")) {
   // ----------------------------------- POSTREVIEW on TNA ---------------------------------------------------------------
    this.pageType = "postReview";
    this.targetForumId = this.queryStrings["fid"];
  } else if ((this.pathname.indexOf("/post.php") > -1) && this.queryStrings.hasOwnProperty("fid")) {
   // ----------------------------------- POST, and on TNAXX - Post Review --------------
    this.pageType = "post";
    this.skipFurtherProcessing=true;
    this.targetForumId = this.queryStrings["fid"];
    //on TNAXX, post review forums are done with /post.php?fid=  on TNA it's /review_post.php.
    //check for TNAXX case here by looking at the crumbs to determine if this post is in a reviews forum.
    tag = document.getElementById("brd-crumbs-top");
        Core.log(self,"brd-crumbs-top:" + Core.enumerateElement(tag));
    crumbs = Core.getElementsByClass("crumb", tag);
    // For a post page, the crumbs tags should be as follows:
    //    crumbs[0] - index page link
    //    crumbs[1] - ad forum link
    //    crumbs[2] - this page
    if (crumbs.length == 3) {
      tag = crumbs[1].getElementsByTagName("A");
      if (!tag || typeof tag == "undefined" || tag.length != 1) {
        Core.error(self, "expected to find one tag with link to forum. don't know what kind of post this is.");
      } else {
        if ((tag[0].textContent.indexOf("Reviews") > -1) && (tag[0].textContent.indexOf("Coffee") < 0))  {
          //forum is a review forum. this is a postReview page.
          this.pageType = "postReview";
          this.skipFurtherProcessing = false;
        }
      }
    }
  //------------ INDEX, USERLIST, GALLERY, UPLOADIMAGE, REGISTER, LOGIN, UNKNOWN  --------------------------
  } else if (this.pathname.indexOf("/index.php") > -1) {
    this.pageType = "index";
    this.skipFurtherProcessing=true;
  } else if (this.pathname.indexOf("/userlist.php") > -1) {
    this.pageType = "userList";
    this.skipFurtherProcessing=true;
  } else if (this.pathname.indexOf("/gallery.php") > -1) {
    this.pageType = "gallery";
    this.skipFurtherProcessing=true;
  } else if (this.pathname.indexOf("/uploadimg.php") > -1) {
    this.pageType = "uploadImage";
    this.skipFurtherProcessing=true;
  } else if (this.pathname.indexOf("/register.php") > -1) {
    this.pageType = "register";
    this.skipFurtherProcessing=true;
  } else if ((this.pathname.indexOf("/login.php") > -1) || (this.pathname == "/")) {
    this.pageType = "login";
    this.skipFurtherProcessing=true;
  }
  if (this.pageType == null) {
    Core.error(self, "Unknown pageType for url: " + this.url +
                     "\n hash:" + this.hash +
                     "\n pathname:" + this.pathname +
                     "\n search:" + this.search + "\nqueryStrings: ");
    Core.enumerateOwnProperties(this.queryStrings);
    this.skipFurtherProcessing=true;
    return;
  }
  Core.leave(self, "pageType found: " & this.pageType);
}
//-----------------------------------------------------------------------------



//------------------- PAGE PROCESSING FUNCTIONS -------------------------------

//--------------------MyBoard.Page.processSummaryTopicPosts()---------------------------------------------------------
//  FUNCTION  :   MyBoard.Page.processSummaryTopicPosts()
//  PURPOSE   :   Processes pages with summaryTopics (viewForum & searchResults), populating the MyBoard objects & styling the posts, etc.
//  ASSUMES   :   Page has been initialized (MyBoard.Page.init());
//  AFFECTS   :   everything
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.Page.processSummaryTopicPosts = function() {
    var self = "MyBoard.Page.processSummaryTopicPosts: ";
    Core.enter(self);

    var allPostNodes, postIndex, postNode, ThisPost, userName, listWithUser, iconTitle, ListObj, 
       str, tags, toggleAdLink, adParent;
  
    // Confirm we're on a forum or search results page
    if ((MyBoard.Page.pageType == null) ||
        ((MyBoard.Page.pageType != "searchResults") &&
         (MyBoard.Page.pageType != "viewForum"))) {
      Core.error(self, " Expected page with sumamry topics. pageType: " + MyBoard.Page.pageType);
      return;
    }

    // walk the posts & hide or highlight each post based on the list the user is in.
    //MyBoard.Page.hiddenPostsCount = 0;
    if (MyBoard.Page.pageType == "viewForum") {
      allPostNodes = Core.getElementsById("topic\\d+");
    } else {
      allPostNodes = Core.getElementsByClass("main-item",document);
    }
    if(allPostNodes.length <= 0 || allPostNodes == null) {
      Core.leave(self, "no posts on page: " + MyBoard.Page.url);
      return;
    }
    for (postIndex = 0; postIndex < allPostNodes.length; postIndex++) {
      //------------------------------------------------------
      // Setup the Post Object & get the post info
      postNode = allPostNodes[postIndex];
      ThisPost = new Post;
      ThisPost.postIndex = postIndex
      ThisPost.postNumber = postIndex + 1;
      ThisPost.isSummaryTopic = true;
      MyBoard.Page.posts[postIndex] = ThisPost;
      if (!ThisPost.parseSummaryTopicPost(postNode)) {
        Core.error(self, "Unable to parse summary topic post. bailing...");
        return;
      }
      MyBoard.Page.postsByPostId[ThisPost.postId] = ThisPost;

      //update MyBoard.Page object posts arrays
      userName = ThisPost.UserObj.userName;
      if (MyBoard.Page.postsByUserName[userName]) {
        MyBoard.Page.postsByUserName[userName][MyBoard.Page.postsByUserName[userName].length] = ThisPost;
        //Core.log(self, MyBoard.Page.postsByUserName[userName].length + " post for user: " + userName + "added to MyBoard.Page.postsByUserName");
      } else {
        MyBoard.Page.postsByUserName[userName]=[];
        MyBoard.Page.postsByUserName[userName][0] = ThisPost;
        //Core.log(self, "First post for user: " + userName + " added to MyBoard.Page.postsByUserName");
      }

      // if adPost, save the link if it's newer
      if (MyBoard.Page.isProviderAdForum) {
        ThisPost.UserObj.checkAndUpdateLastAdHref(ThisPost.summaryTopicTargetHref);
      }

      tags = Core.getElementsByClass("icon",postNode);
      if (tags.length != 1 || (typeof tags[0] == "undefined")) {
        Core.error(self,"Icon element NOT found for post by " + userName + " id: " + postNode.id);
        continue
      }
      ThisPost.summaryTopicIcon = tags[0];

      // ------------------- if topic for Provider Ad, set the List &  setup for click of icon to toggle user into blocked ads ----------------- //
      if (ThisPost.isSummaryForAd) {
        ListObj = ThisPost.setList();
        ThisPost.summaryTopicIcon.className += " "+ MyBoard.toggleBlockedClassName;  //tells event handler to toggle blocked.
        ThisPost.summaryTopicIcon.addEventListener("click", ThisPost.toggleUserInListButton, true);
        toggleAdLink = document.createElement("a");
        adParent = postNode.parentNode;
        adParent.insertBefore(toggleAdLink,postNode);
      }
    } //for each post
    Core.leave(self);
}
//-----------------------------------------------------------------------------


//---------------------------------------------------------------------------
//method which process the page we know to be a viewForum page.
MyBoard.Page.processViewForumPage = function() {
  var self = "MyBoard.Page.processViewForumPage";
  Core.logWithHeader(self, "\t\t\t ****** PROCESSING VIEWFORUM PAGE *****");
  this.processSummaryTopicPosts();
}
//-----------------------------------------------------------------------------



//-----------------------------------------------------------------------------
//method which process the page we know to be a searchResults page.
MyBoard.Page.processSearchResultsPage = function() {
  var self = "MyBoard.Page.processSearchResultsPage";
  Core.logWithHeader(self, "\t\t\t ****** PROCESSING SEARCH RESULTS PAGE *****");
  this.processSummaryTopicPosts();
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------- MyBoard.Page.processViewTopicPage ----------------------------------------------------------
//  FUNCTION  :   MyBoard.Page.processViewTopicPage()
//  PURPOSE   :   Walks all posts on a viewtopic page, populating the MyBoard objects with information from the posts,
//                hiding ignored posts, styling posts on the lists, and adding the post management buttons for each topic.
//  ASSUMES   :   This is a valid viewTopic page & MyBoard.Page.Init has been run.
//  AFFECTS   :   The MyBoard objects.
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.Page.processViewTopicPage = function() {
  var self = "MyBoard.Page.processViewTopicPage: ";
  Core.logWithHeader(self, "\t\t\t ****** PROCESSING VIEWTOPIC PAGE *****");
    
  var docDivs, topicPostCount, ThisPost, str, ListObj, tag, crumbs, userName;

  if (this.pageType != "viewTopic") {
    Core.error(self, "expected viewTopic page. url: " + this.url);
    return; //
  }

  // ------ Determine if this is a provider ad page & set MyBoard.Page.isProviderAdTopicView property ---------------------
  tag = document.getElementById("brd-crumbs-top");
  crumbs = Core.getElementsByClass("crumb", tag);
  // For a provider ad topicView page, the crumbs tags should be as follows:
  //    crumbs[0] - index page link
  //    crumbs[1] - ad forum link
  //    crumbs[2] - viewtopic link
  MyBoard.Page.isProviderAdTopicView = false;
  if (crumbs.length == 3) {
    tag = crumbs[1].getElementsByTagName("A");
    if (typeof tag == "undefined" || tag == null || tag.length != 1) {
      Core.error(self, "expected to find one tag with link to forum. Assuming NOT a provider ad post.");
    } else {
      MyBoard.Page.isProviderAdTopicView = tag[0].textContent.indexOf("Provider Ads") >= 0;
    }
  }

  // ---------- walk all the divs, processing each post
  docDivs = document.getElementsByTagName("DIV");
  topicPostCount = 0;
  for (var i = 0 ; i < docDivs.length ; i++ ) {
    if ( Core.isTheNode(docDivs[i], MyBoard.PostClassPattern, MyBoard.postClassElementName)) {
      // post div found - Create new Post object and set properties with data from post
      ThisPost = new Post; // post object for this post
      if ((topicPostCount == 0) && (MyBoard.Page.isProviderAdTopicView)) {
        //first post on provider ad page is provider ad post
        ThisPost.isProviderAdTopic = true;
      }
      ThisPost.postIndex = topicPostCount++;
      ThisPost.postNumber = topicPostCount;
      MyBoard.Page.posts[ThisPost.postIndex] = ThisPost;
      MyBoard.parseViewTopicPost(MyBoard.Page, ThisPost, docDivs[i]);
      userName = ThisPost.UserObj.userName;
      str =  "Processing post number: " + topicPostCount + " userId: " +  ThisPost.UserObj.userId + " userName: " + userName;
      if (!MyBoard.Page.postsByUserName[userName]) MyBoard.Page.postsByUserName[userName] = [];
      MyBoard.Page.postsByUserName[userName].push(ThisPost);
      // check if ingored user
      //this should be made generic...
      ListObj = MyBoard.listsByShortName["IGNORED"];
      if (ThisPost.userIsInList(ListObj)) {
        ThisPost.UserObj.userIsIgnored = true;
        ListObj.posts[ListObj.posts.length] = ThisPost;
        str += " *** IGNORED USER ***";
      }
      ThisPost.managementLinksLocation = ThisPost.div.getElementsByTagName("ul")[0]; //This is the element where we'll add our options.
      MyBoard.addPostManagementLinks(MyBoard.Page, ThisPost);

      // --- insert blank line below management links
      dd = document.createElement("dd");
      dd.textContent = "\r";
      dd.appendChild(document.createElement("br"));
      ThisPost.managementLinksLocation.appendChild(dd);
      ThisPost.setList();
    }
  } //for each post
}  //MyBoard.Page.processViewTopicPage
//-----------------------------------------------------------------------------



//------------------MyBoard.Page.processSearchPage-----------------------------------------------------------

//------------------------------------ MyBoard.Page.processSearchPage() --------------------------------------------------
//  FUNCTION  :   MyBoard.Page.processSearchPage()
//  PURPOSE   :   Processes a searchPage (eg page with the search form). If the page was loaded by clicking a post management link,
//                populates the search keywords. if the link was for a provider, sets the forums to search all reiew and rob forumns.
//                Always adds an extra submit button to the right of the keywords fields so user can click w/o scrolling.
//  ASSUMES   :   if called from a post MyBoard link, the url QueryString will have a MyBoard=searchUser&userName=<username>
//  AFFECTS   :   The DOm for this page.
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.Page.processSearchPage = function() {
  var self = "MyBoard.Page.processSearchPage";
  Core.enter(self);

  var inputTag, searchSet, searchOptions, inputTags, labelTags, selectCount, submitButton, groupSet, group1Set, group2Set, 
      searchOrderRadioTag, sortOrderRadioTag, postTimeDropListTag;

  Core.logWithHeader(self, "\t\t\t ****** PROCESSING SEARCH PAGE *****");

  if (this.pageType != "search") {
    Core.error(self, "page type " + this.pageType + " is not a search page: " + document.location.href);
    return;
  }

  // Find the Keywords field (fld1), parse the userName off the QueryString & populate the keywords field.
  inputTag = document.getElementById("fld1");
  if (!inputTag || (inputTag.tagName != "INPUT")) {
    Core.error(self, "Expected to find fld1 as input field. it's either null or not an inut tag: " + inputTag.tagName);
    return;
  }

  //add convenient submit button...
  submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit search";
  submitButton.name = "search";
  inputTag.parentNode.appendChild(submitButton).focus();


  // only do the rest if called by a MyBoard management link
  if (this.referredByMyBoardLink) {
    Core.log(self, "On Search page called from MyBoard Management Link");
    // Get the userName from the QuerySTring & place in the keywords field.
    if (MyBoard.Page.queryStrings.hasOwnProperty("userName")) {
      name = decodeURIComponent(MyBoard.Page.queryStrings["userName"]);
    } else {
      Core.error(self, "expected name for Query Field userName= on url:" + document.url);
      return;
    }
    inputTag.value = name.replace(/%20/g," ");
    //add a submit button here
    // Unless path has query string defaults=none, check all of the rob/review boxes on the form.
    if (!MyBoard.Page.queryStrings.hasOwnProperty("defaults")  || MyBoard.Page.queryStrings["defaults"] != "none") {
      // find the forums to search & enable all review & rob forums
      //The checklist fields are all in set4 with frm-group group1...
      groupSet = Core.getElementsByClass("frm-group", document);
      if (groupSet.length != 2) {
        Core.error(self, "expected to find exactly two tags with class=frm-group tags. bailing... found :" + groupSet.length);
        return;
      }

      // ---------------------------------- search forum checkbox settings ---------------------------------------------------
      if (Core.isInClasses("group1", groupSet[0].className)) {
        //group1 has all the checklist fields for each forum (all within set4 fieldset)
        group1Set = groupSet[0];
        searchSet = Core.getElementsByClass("set4",group1Set);
        if (searchSet.length != 1) {
          Core.error(self, "Expected exactly one frm-group group1  Set4 in Search Page. Bailing. searchSet.length:" + searchSet.length);
          return;
        } 
        checkListDivs = Core.getElementsByClass("checklist-item",searchSet[0]);
        // walk the form fields,
        // populating searchOptions array for each field.
        searchOptions = [];
        function InputFieldObject(tag) {
                                      this.inputTag = tag;
                                      this.id= tag.id;
                                      this.value= tag.value;
                                      this.checked = tag.checked;
                                      this.labelTag = null;
        };
        for (var i=0; i<checkListDivs.length; i++) {
          //grab the fieldId, value off the input tag
          inputTags = checkListDivs[i].getElementsByTagName("input");
          if ( !inputTags || inputTags.length != 1) {
            Core.error(self, "expected checklist-item DIV's to have exactly one input tag: " + searchSet[0].innerHtml);
            return;
          }
          // Construct the new object & save in searchOptions[]
          InputObject = new InputFieldObject(inputTags[0]);
          // get/set the label
          labelTags = checkListDivs[i].getElementsByTagName("LABEL");
          if ( !labelTags || labelTags.length != 1) {
            Core.error(self, "expected checklist-item DIV's to have exactly one label tag: " + searchSet[0].innerHtml);
            return;
          }
          InputObject.labelTag = labelTags[0];
          searchOptions.push(InputObject);
          // if it's a rob section, or a review section that's not a coffee stand, search it.
          // as of 6/17/11, TNA has combined reviews & ISO, whereas TNAXX has some combined & some seperate 
          // reviews vs ISO & also has coffee stand reviews.
          if (((InputObject.labelTag.textContent.indexOf("Reviews") > -1) &&  
              (InputObject.labelTag.textContent.indexOf("Coffee") < 0)) ||
              (InputObject.labelTag.textContent.indexOf("ROB") > -1)) {
            InputObject.inputTag.checked=true;        
          } else {
            //set it to false so page works right when user returns via back button
            InputObject.inputTag.checked=false;
          }
        } //for
      } else {
        Core.error(self, "expected first tags with class=frm-group to have class group1. bailing... found :" + groupSet[0].className);
        return;      
      }
      
      // ---------------------------------- search results settings ---------------------------------------------------
      if (Core.isInClasses("group2", groupSet[1].className)) {
        group2Set = groupSet[1];
      } else {
        Core.error(self, "expected second tags with class=frm-group to have class group2. bailing... found :" + groupSet[1].className);
        return;      
      }
      // set the sort by to post time.
      searchSet = Core.getElementsByClass("sf-set", group2Set)
      if (!Core.isInClasses("set1", searchSet[0].className)) {
        Core.error(self, "expected to find div with class=sf-set set1 for settings of sort by. not setting sort by."); 
      } else {
        searchSet = searchSet[0].getElementsByTagName("option");
        postTimeDropListTag = null;
        for (i=0; i<searchSet.length; i++) {
          if (searchSet[i].textContent.indexOf("Post time") > -1) {
            postTimeDropListTag = searchSet[i];
            postTimeDropListTag.selected = true;
            break;
          }
        }
        if (!postTimeDropListTag) {
          Core.error(self, "unable to find Post Time setting.");
        }
      }

      // set the sort order
      searchSet = Core.getElementsByClass("mf-set", group2Set)
      if (!Core.isInClasses("set2", searchSet[0].className)) {
        Core.error(self, "expected to find div with class=mf-set set2 for settings of sort by. not setting sort by."); 
      } else {
        searchSet = searchSet[0].getElementsByTagName("INPUT");
        sortOrderRadioTag = null;
        for (i=0; i<searchSet.length; i++) {
          if (searchSet[i].value.indexOf("DESC") != -1) {
            sortOrderRadioTag = searchSet[i];
            sortOrderRadioTag.checked = true;
            break;
          }
        }
        if (!sortOrderRadioTag) {
          Core.error(self, "unable to find Sort Order 'descending' input.");
        }
      }
      
      // set the display results
      searchSet = Core.getElementsByClass("mf-set", group2Set)
      if (!Core.isInClasses("set3", searchSet[1].className)) {
        Core.error(self, "expected to find div with class=mf-set set2 for settings of search results. not setting search results."); 
      } else {
        searchSet = searchSet[1].getElementsByTagName("INPUT");
        searchResultsRadioTag = null;
        for (i=0; i<searchSet.length; i++) {
          if (searchSet[i].value.indexOf("topics") != -1) {
            searchResultsRadioTag = searchSet[i];
            searchResultsRadioTag.checked = true;
            break;
          }
        }
        if (!sortOrderRadioTag) {
          Core.error(self, "unable to find Sort Order 'descending' input.");
        }
      }
    } //if query string does not have defaults=none
  }//if this.referredByMyBoardLink
  Core.leave(self);
}
//-----------------------------------------------------------------------------------------------------------------------



//-----------------MyBoard.Page.processPostReviewPage------------------------------------------------------------
//  FUNCTION  :   MyBoard.Page.processPostReviewPage
//  PURPOSE   :   Called for pageType PostReview.  If page was activated by clicking a MyBoard management button from an ad, Sets review subject.
//  ASSUMES   :   -
//  AFFECTS   :   Review Subject field in form
//  PARAMETERS:   none
//  RETURNS   :   null
//
MyBoard.Page.processPostReviewPage = function() {
  var self = "MyBoard.Page.processPostReviewPage";
  Core.logWithHeader(self, "\t\t\t ****** PROCESSING POST REVIEW PAGE *****");

  Core.enumerateOwnProperties(MyBoard.Page);

  var url, form, forms, name, input;
  if (MyBoard.Page.referredByMyBoardLink) {
    // got here by clicking a MyBoard managmeent link, populate the field
    Core.log(self,"referred:" + MyBoard.Page.url);
    url = document.location.href;
    if (MyBoard.boardId == "tna") {
      form = document.getElementById("post");
    } else {
      form = document.getElementById("afocus");
    }
    if (form == null) {
        Core.error(self, "Unable to find form 'post' to populate fields for posting review.");
        return;
    }
    name = decodeURIComponent(MyBoard.Page.queryStrings["providerName"]);
    Core.log(self,"name:"+name);
    input = form.getElementsByTagName("input");
    for( i = 0; i < input.length; i++) {
      //if (input[i].name == "req_subject" || input[i].id == "req_subject") {
      if (input[i].name == "req_subject") {
          input[i].value="REV: " + name;
          return;
      }
    }
  } // if referredByMyBoardLink
} //function
//-----------------------------------------------------------------------------------------------------------------------




// --------------------------MyBoard.buildListTableCss()----------------------------------------------
MyBoard.buildListTableCss = function() {
  var self="MyBoard.buildListTableCss";
  if (!MyBoard.isListsPopulated) {
    Core.error(self, "Expected lists to be populated. bailing...");
    return null;
  }
  var myCss =
      '<STYLE type="text/css">\
      .pageSummaryStats th {\
        color:#ffffff;\
        background-color:#3C56FF;\
        font-size: 20pt;\
      }\
      .pageSummaryStats td {\
        width:25%;\
        color:#ffffff;\
        background-color:#3C56FF;\
      }\
      .pageSummaryStats tr {\
        height: 1.2em;\
      }\
      .pageSummaryStats tr.MyBoard_divider {\
        height: 3px;\
        padding: 0px;\
        border: 0px;\
        margin: 0px;\
        background-color: transparent;\
        color: #000000 ;\
      }\
      .pageSummaryStats .MyBoard_divider th{\
        height: 3px;\
        padding: 0px;\
        color: inherit;\
        background-color:inherit;\
      }\
      .pageSummaryStats .MyBoard_divider hr{\
        border: 0px;\
        height: 2px;\
        color: inherit;\
        background-color:inherit;\
        margin:0;\
      }\
      table.pageSummaryStats {\
        width:100%;\
      }';
  //Color each list
  for (var i=0; i < MyBoard.lists.length; i++) {
    if (MyBoard.lists[i].backgroundColor != "none") {
      myCss += "\n tr." + MyBoard.lists[i].listClassName + " * { background-color:" + MyBoard.lists[i].backgroundColor + "; color:" + MyBoard.lists[i].color + "; height:1.2em; }";
    } else {
      myCss += "\n tr." + MyBoard.lists[i].listClassName + " th { background-color:#000000; color:#ffffff; height:1.2em; }";
    }
  }
  myCss += "\n</STYLE>";
  return myCss;
} //function buildListTableCss
// ---------------------------------------------------------------------------------------------------------



//----------------------- MyBoard.pageAtAGlanceMenuObject ----------------------------------------------------
//  FUNCTION  :   MyBoard.pageAtAGlanceMenuObject
//  PURPOSE   :   Event handler for clicking "At A Glance" MyBoard Menu Item.  Displays a table with links
//                for all users in all lists who have topics on this page.
//                Only works for viewForum and searchResults page types. Other pages are not supported
//                and a message is displayed saying it only works on the supported page types.
//  ASSUMES   :   Page has been processed.
//  AFFECTS   :   -
//  PARAMETERS:   event - target of event, but not used.
//  RETURNS   :   null
MyBoard.pageAtAGlanceMenuObject = function(event) {
  var self="MyBoard.pageAtAGlanceMenuObject";

  var tableHTML, nCol, theDialog, width;
  
  MyBoard.menuClose();

  nCol = 5;  //number of columns in table
  width = nCol * 11; // width of table.
  if (MyBoard.Page.pageType == "searchResults" || MyBoard.Page.pageType == "viewForum") {
    tableHTML = MyBoard.listCss;
    tableHTML += "<table class='pageSummaryStats'><tr><th colspan=" + nCol + ">Click on any link to access their topic on this page.</th></tr>";
    //first do the non-hiding lists, then then the hiding list(s).
    tableHTML += MyBoard.buildTableRowsForPagePostsByList(nCol, "hides");
    tableHTML += MyBoard.buildTableRowsForPagePostsByList(nCol,"notHides");
    tableHTML += "</table>";
  } else {
    tableHTML = "Stats are only available for forumView and Search Results by Topic pages";
  }
  theDialog = new DialogBox.init("This Page Summary",tableHTML, width);
  theDialog.show();
}
//-----------------------------------------------------------------------------------------------------------



//-----------------------MyBoard.aboutMyBoardMenuObject------------------------------------------------------
//  FUNCTION  :   MyBoard.aboutMyBoardMenuObject(event)
//  PURPOSE   :   Handles the click event on the About MyBoard menu.  Displays information about MyBoard
//                  and optionally checks for updated information.
//  ASSUMES   :   -
//  AFFECTS   :   MyBoard object information about the script version & other boards. 
//  PARAMETERS:   event - DOM node that triggered this event. Not used.
//  RETURNS   :   -
MyBoard.aboutMyBoardMenuObject = function() {
  var self = "MyBoard.aboutMyBoardMenuObject";
  Core.enter(self) ;

  var headerMsg, versionMsg, supportedMsg, msg, msg2, confirmed;  
  MyBoard.menuClose();
    
  headerMsg = "*************** About MyBoard ***************\n";
  versionMsg =  "\t\t\tInstalled Version: " + MyBoard.version;
  msg =  "\n\tCreated by Porkmeister62 of TNA and TNAXXHOBBY\n";
  msg += "\tBoard Links, Updated Version Information and Install links maintained on: \n\t\t" + MyBoard.boardsUrl + "\n";
  msg += "\nThe following Hobby boards are supported by this installed version of MyBoard:\n";
  msg += "\t\t WWW.TNABOARD.COM\n";
  msg += "\t\t WWW.TNAXXHOBBY.COM\n";
  msg2 = "\n\n MyBoard can access " + MyBoard.boardsUrl + " to determine if there are";
  msg2 += "\n newer versions of MyBoard, and to get a current list of known hobby";
  msg2 += "\n boards. It only takes a few seconds. Would you like to check now?";
  msg2 += "\n choose OK to check, Cancel to not check";
  msg2 += "\n Note: if you click 'OK', this dialog will disappear and an updated dialog will reappear after a few seconds.";

  // show version information & request permission to check for update & get it if given.
  confirmed = confirm(headerMsg+versionMsg+msg+msg2);
  if (confirmed) {
    GM_xmlhttpRequest({
      method: "GET",
      url:    MyBoard.boardsUrl,
      onload: function(response) {
        var ajaxSelf = "onload";
        
        var boardsHtml, tempDiv, boardLinks, boardsHtml, tempDiv, tag, str;
        
        boardsHtml = response.responseText;
        tempDiv		= document.createElement('div');
        tempDiv.innerHTML	= boardsHtml.replace(/<script(.|\s)*?\/script>/g, '');

        //------------------- supported and not supported boards/sites ------------------
        boardLinks = Core.getElementsByClass("hobbyLink", tempDiv);
        if (boardLinks.length <= 0) {
          Core.error(ajaxSelf, "no hobbyLinks found at " + this.url);
        } else {
        // ----------------- get latestVersion -------------------------
        tag = Core.getElementsByClass("MyBoardLatestVersion", tempDiv);
        if (tag) {
          MyBoard.latestVersion =  tag[0].textContent;
          MyBoard.isCurrentVersion = (MyBoard.latestVersion == MyBoard.version);
        } else {
          str = "Unable to find latest MyBoard version information at " + MyBoard.boardsUrl;
          Core.error(self, str);
          versionMsg+= "\t\t" + str;
        }
        // ----------------- get latestVersionDate -------------------------
        tag = Core.getElementsByClass("MyBoardLatestVersionDate", tempDiv);
        if (tag) {
          MyBoard.MyBoardLatestVersionDate = tag[0].textContent;
        } else if (MyBoard.latestVersion) {
          str = "Unable to find latest MyBoard version DATE at " + MyBoard.boardsUrl;
          Core.error(self, str);
          versionMsg += "\t\t" + str;
        }
        // ----------------- get Version message -----------------------
        tag = Core.getElementsByClass("MyBoardVersionMessage", tempDiv);
        if (tag) {
        Core.log(self, tag.innerText);
          MyBoard.latestVersionMessage =  tag[0].textContent;
          MyBoard.lastUpdateCheckDate = new Date();
          if (MyBoard.isCurrentVersion) {
            versionMsg += "\n\n********** GOOD NEWS!!! THE INSTALLED VERSION IS CURRENT *************\n"
          } else {
            versionMsg += "\n*** INSTALLED VERSION IS NOT CURRENT **** \n" + MyBoard.latestVersionMessage + "'\n";
          }
        } else {
          str = "Unable to find latest MyBoard version information at " + MyBoard.boardsUrl;
          Core.error(self, str);
          versionMsg+= "\t\t" + str;
        }
        
          // add the board links to our message and to Myboard object
          MyBoard.otherSupportedBoardLinks = []
          MyBoard.otherNotSupportedBoardLinks = []
          // first do the ones MyBoard Supports
          if (!MyBoard.isCurrentVersion) {
            msg += "\n**** The following hobby boards are supported on the latest version of MyBoard (" + MyBoard.latestVersion + ") ****";
          }
          for (var i=0; i<boardLinks.length; i++) {
            if (Core.isInClasses("MyBoardSupport", boardLinks[i].className)) {
              MyBoard.otherSupportedBoardLinks.push(boardLinks[i].href);
              if (!MyBoard.isCurrentVersion) msg += "\t\t" + boardLinks[i].textContent + "\n";
            }
          }
          // and now the other boards
          msg += "\n**** Other Hobby Boards and sites with information on Seattle hobbying****\n" +
                  "\t(provided for your information only; These sites are neither endorsed\n\tby PorkMeister62, nor supported By MyBoard)\n\n";
          for (var i=0; i<boardLinks.length; i++) {
            if (Core.isInClasses("MyBoardNoSupport", boardLinks[i].className)) {
              MyBoard.otherNotSupportedBoardLinks.push(boardLinks[i].href);
              msg += "\t\t\t" + boardLinks[i].textContent + "\n";
            }
          }
        }
        msg += "\nTo provide feedback on these lists, email porkmeister62 through TNA or TNAXX, or submit feedback at " + MyBoard.boardsUrl;
        alert(headerMsg+versionMsg+msg);
      }
    }); //GM_xmlhttpRequest
  } //if confirmed
  Core.leave(self);
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.getPostIdFromTopicPostDiv() --------------------------------------------------
//  FUNCTION  :   MyBoard.getPostIdFromTopicPostDiv()
//  PURPOSE   :   searches topicPost adn returns the postId. Meant to be called on a page with posts & not summaryTopics.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   postDiv - DOM element containing the post.
//  RETURNS   :   id for dom element for this post.
MyBoard.getPostIdFromTopicPostDiv = function(postDiv) {
  var self = "MyBoard.getPostIdFromTopicPostDiv";
  var elements = Core.getElementsByClass("posthead", postDiv);
  if (!elements) {
    Core.error(self, "expected to find element with class=posthead bailing...");
    return null;
  }
  var result = elements[0].id;
  return result;
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.getuserNameFromTopicPostDiv() --------------------------------------------------
//  FUNCTION  :   MyBoard.getuserNameFromTopicPostDiv(postDiv)
//  PURPOSE   :   searches topic post Div and returns the userName
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   postDiv - DOM element for the post. Must be for a topic or reply post and not a summaryTopic.
//  RETURNS   :   string with userName for this post.
MyBoard.getuserNameFromTopicPostDiv = function(postDiv) {
  var self = "MyBoard.getuserNameFromTopicPostDiv";

  var elements = Core.getElementsByClass("post-byline", postDiv);
  for (var i=0; elements && i < elements[0].childNodes.length; i++){
    if (elements[0].childNodes[i].nodeType == 1 && elements[0].childNodes[i].tagName == "A") {
      return elements[0].childNodes[i].textContent;
    }
  }
  Core.error(self,"Unable to find username in post DIV: \n" + postDiv.innerHTML);
}
//-----------------------------------------------------------------------------------------------------------------------



//-------------------------Post.prototype.parseSummaryTopicPost()----------------------------------------------------
//  FUNCTION  :   Post.prototype.parseSummaryTopicPost
//  PURPOSE   :   parses information from summaryTopic post and populates post object.
// searches thru Summary Topic DIV and sets the post properties & user properties for:
//    .topicId      : id for this topic. retrieved from id= of SummaryTopic Div tag, less "topic" eg id=topic1234 would be topicId of 1234
//    .summaryTopicTargetHref     : link to this post - retrieved from h3>a tag
//    .postSubject  : subject of this post, text from h3>a tag
//    .postId       : unique ID for this post, retrieved from query string on h3>a tag; Note that for
//                    posts which are also the 1st post in a topic, postId is the same as topicId
//    .userName     : userName who authored this post, retrieved span class="item-starter">cite textContent
//    .replies      : number of replies to this post (retrieved from the li class=info-replies textContent)
//    .targetForumId
//    .isSummaryForAd
// --- and to be added real soon...
//    .views        : number of views of this post (retrieved from the li class=info-views textContent)
//    .lastPost     : link to most recent post/reply on this topic (from li class=info-lastpost * a tag href)
//    .lastPostDateTime : date/time of lastPost linke (from li class=info-lastpost * a tag textContent)
//    .lastPostUserName : user who authored LastPost (from li class=info-lastpost * cite tag textContent)
//  ASSUMES   :   "this" is a post object.
//  AFFECTS   :   post object "this", user Object for poster
//  PARAMETERS:   summaryTopicDiv     - div node with id=topic<id> for the summaryTopic Post
//  RETURNS   :   true if post successfully parsed, null otherwise.
//------------------------------------------------------------------------------------------------------------
Post.prototype.parseSummaryTopicPost = function(summaryTopicDiv) {
    var self = "Post.prototype.parseSummaryTopicPost: ";
    Core.enter(self);
    
    var tag, userName, ThisPage, nodes, queryStrings;
    
    //Determine if this topic summary is for an ad, and which forum the post is in.
    this.div = summaryTopicDiv;
    this.isSummaryForAd = false;
    if (MyBoard.Page.pageType == "viewForum") {
    
      // ---------------- viewForum ------------------------ 
      // -- if it's an ad forum, then summaryTopic is for an ad
      if (MyBoard.Page.forumName.indexOf("Provider Ads") >= 0) {
        //viewing provider ads forum - all topis are for ads
        this.isSummaryForAd = true;
      } else {
        //in a forum that is not provider ads...
        this.isSummaryForAd = false;
      }
    } else {
      //---------------------------------- search results -------------------------------------------
      //if the forum for the topic is an ad forum, then this summaryTopic is for an ad...
      ThisPage = MyBoard.Page;
      nodes = Core.getElementsByClass("info-forum", summaryTopicDiv);
      if (nodes.length == 1) {
        tags = nodes[0].getElementsByTagName("A");
        if (typeof tags == "undefined" || tags == null || tags.length != 1) {
          Core.error(self, "expected to find one tag with info on target forum below post node with class info-forum.");
        } else {
          queryStrings = Core.getQueryStrings(tags[0].href);
          this.targetForumId = queryStrings.hasOwnProperty("id") ?  queryStrings["id"] :  queryStrings["fid"];
          this.targetForumId = this.targetForumId * 1;
          if (isNaN(this.targetForumId) || this.targetForumId <= 0) {
             Core.error(self, "missing or unknown forum id for ViewForum link '" + this.targetForumId + "' isNaN:" + isNaN(this.targetForumId));
             return;
          }
          this.targetForumName = tags[0].textContent;
          this.isSummaryForAd = this.targetForumName.indexOf("Provider Ads") >= 0;
        }
      } else {
        Core.error(self, "expected to find exactly 1 node on post with class info-forum, found: " + nodes.length);
      }
    }
    
    
    // ----- postLink, postSubject, postId all from h3 > a tag
    tag = summaryTopicDiv.getElementsByTagName("h3");
    if (tag && (typeof tag[0] != "undefined") && tag.length == 1 && Core.isInClasses("hn", tag[0].className)) {
      //h3 tag found - now look for child anchor tag
      tag = tag[0].getElementsByTagName("a");
      if (tag && (typeof tag[0] != "undefined") && tag.length == 1) {
        //anchor found
        this.summaryTopicTargetHref = tag[0].href;
        this.postSubject = tag[0].textContent;
        this.postId = Core.getValueForUrlQueryString(this.summaryTopicTargetHref, "id");
        this.topicId = this.postId; //topicId and PostId are the same for 1st post in topic & all links on this page are for 1st post in topic...
      } else {
        Core.error(self,"expected anchor tag (decendent of h3 with class='hn') with post link & subject.");
        return;
      }
    } else {
      Core.error(self, "expected to find one H3 tag below summaryTopicDiv");
      return;
    }
    //-------- userName (get from span class=item-starter > cite textContent ---------------------------
    var tag = Core.getElementsByClass("item-starter", summaryTopicDiv);
    if (tag && (typeof tag[0] != "undefined") && tag.length == 1) {
      //span found, now get the cite
      tag = tag[0].getElementsByTagName("cite");
      if (tag && (typeof tag[0] != "undefined") && tag.length == 1) {
        userName = tag[0].textContent;
        userName = userName.replace(/&nbsp;/ig," "); //remove any html spacing
        userName = userName.replace(/^\s+|\s+$/g,""); //remove any whitespace
        userName = userName.replace(/^by\s/i,""); //remove "by " from front, if appicable
        userName = userName.replace(/,/g,"."); //convert any , to a .
        this.UserObj=MyBoard.getUserObject(userName,"",false);
      } else {
        Core.error(self, "expected to find username in Cite tag decendant of span with class item-starter; unable to find cite tag");
        return;
      }
    } else {
      Core.error(self, "expected to find username in Cite tag decendant of span with class item-starter; unable to find span class=item-starter");
      return;
    }
    Core.leave(self,  "returning: " + name);
    return true;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.getUserObject() --------------------------------------------------
//  FUNCTION  :   MyBoard.getUserObject
//  PURPOSE   :   Searches for user object for this user and if found, returns it, if not found, creates one and returns it.
//  ASSUMES   :
//  AFFECTS   :   MyBoard object (user arrays); Persistent storage if new user data found for persistent UserObj
//                user objects .isDirty property (set to true if any user object fields are updated or if a new user object is created.
//  PARAMETERS:   userName      - string to use for lookup of userName. Optional if userId specified.
//                userId        - String userId to use for lookup of userName. Optional if userName specified.
//                markNewAsDirty- OPTIONAL, default TRUE. If FALSE, setDirty is not called for user objects which are new.
//  RETURNS   :   User object   (existing or new) for this user.
MyBoard.getUserObject = function (userName, userId, markNewAsDirty) {
  var self = "MyBoard.getUserObject";
  var lookupArray, result, userNameProvided, userIdProvided, UserObjByUserId, UserObjByUserName;

  //default markNewAsDirty to true if not specified...
  markNewAsDirty = (typeof markNewAsDirty != "undefined") ? markNewAsDirty: true;
  userNameProvided = (!userName || (typeof userName == "undefined"))  ? false : true;
  userIdProvided = (!userId || (typeof userId == "undefined"))  ? false : true;
  if (!userNameProvided && !userIdProvided) {
      Core.error(self, "Must supply at least one of (userName, userId)");
      return null;
  }

  UserObjByUserId = (userIdProvided) ? MyBoard.usersByUserId[userId] : null;
  UserObjByUserName = (userNameProvided) ? MyBoard.usersByUserName[userName] : null;

  result = null;
  if ( (UserObjByUserId && (typeof UserObjByUserId != "undefined")) &&
       (UserObjByUserName && (typeof UserObjByUserName != "undefined")) ) {
    // --------- found user object both by userName and userID. confirm their the same --------------
    if (UserObjByUserId === UserObjByUserName) {
      result = UserObjByUserId;
    } else {
      // ------------ Mulitple user Objects for one user - bail -------------------------------------
      Core.error(self, " Different user objects for same user - bailing.... \n By userNAme: " + UserObjbyUserName.userDisplayInf() + "\nBy userId:" +
                      UserObjByUserId.userDisplayInf());
      Throw("duplicate user objects");
    }
  } else if ( (!UserObjByUserId || (typeof UserObjByUserId == "undefined")) &&
              (!UserObjByUserName || (typeof UserObjByUserName == "undefined")) ) {
    // ------------- UserOBj not found, create new one ------------------------------------------------
    result = new User(userName, userId);
    if (userNameProvided) MyBoard.usersByUserName[userName] = result;
    if (userIdProvided) MyBoard.usersByUserId[userId] = result;
    if (markNewAsDirty) {
      result.setDirty();
    }
  } else if (UserObjByUserId && (typeof UserObjByUserId != "undefined")) {
    // found it by ID, but not by userName; set userName if specified
    result = UserObjByUserId;
    if (userNameProvided) {
      result.userName = userName;
      MyBoard.usersByUserName[userName] = result;
      result.setDirty();  //mark that it was updated.
    }
  } else {
    // found it by userName, but not by userId
    result = UserObjByUserName;
    if (userIdProvided) {
      result.userId = userId;
      MyBoard.usersByUserId[userId] = result;
      result.setDirty(); //mark that it was updated.
    }
  }
  return result;
}
//-----------------------------------------------------------------------------------------------------------------------



//----------------------- menu functions --------------------------------------

//------------------------------------ MyBoard.menuOpen() --------------------------------------------------
//  FUNCTION  :   MyBoard.menuOpen(event)
//  PURPOSE   :   Event handler for user click of MyBoard menu. Hides the nav link and shows a div with the menu.
//  ASSUMES   :   The div to display is the only DIV descendent of the event DOM element's parentNode.
//  AFFECTS   :   DOM style properties.
//  PARAMETERS:   event - the DOM element on which the event triggered.
//  RETURNS   :   -
MyBoard.menuOpen = function(event) {
  var self = "MyBoard.menuOpen";
  
  // cancel any existing close timer
  MyBoard.menuCancelCloseTimer();

  // close old layer
  if(ddmenuitem) {
      ddmenuitem.style.visibility = 'hidden';
      ddmenuitem.style.display = 'none';
  }
  var anchor = event.currentTarget;
  var divList = anchor.parentNode.getElementsByTagName("div");
  if (divList.length != 1) {
      Core.error(self, "invalid menu anchor. ParentNode contains more than one div!", true);
      throw("Invalid menu anchor");
  }
  // get new layer and show it
  ddmenuitem = divList[0];
  ddmenuitem.style.visibility = 'visible';
  ddmenuitem.style.display = '';
}
//-----------------------------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------------------------------------

//------------------------------------ () --------------------------------------------------
//  FUNCTION  :   MyBoard.menuClose()
//  PURPOSE   :   hides DOM element for the menu
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.menuClose = function() {
  if(ddmenuitem) {
    ddmenuitem.style.visibility = 'hidden';
    ddmenuitem.style.display = 'none';
  }
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.menuCloseTimer() --------------------------------------------------
//  FUNCTION  :   MyBoard.menuCloseTimer()
//  PURPOSE   :   Sets the time to close the menu
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   the timer
MyBoard.menuCloseTimer = function()
{
  closeTimer = setTimeout(MyBoard.menuClose, timeout);
  return closeTimer;
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.menuCancelCloseTimer() --------------------------------------------------
//  FUNCTION  :   MyBoard.menuCancelCloseTimer()
//  PURPOSE   :   cancels the menu close timer
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.menuCancelCloseTimer = function()
{
  if(closeTimer)
  {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.hiliteMenu() --------------------------------------------------
//  FUNCTION  :   MyBoard.hiliteMenu(event)
//  PURPOSE   :   event handler to Highlight the menu item
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   event - DOM element that triggered the event.
//  RETURNS   :   
MyBoard.hiliteMenu = function(event) {
  link = event.target;
  link.style.background = "#49A3FF";
  link.style.color="white";
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.unhiliteMenu() --------------------------------------------------
//  FUNCTION  :   MyBoard.unhiliteMenu()
//  PURPOSE   :   event handler that removes menu highlite created by MyBoard.hiliteMenu
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   event - DOM element on which this event was triggered.
//  RETURNS   :   -
MyBoard.unhiliteMenu = function(event) {
  link = event.target;
  link.style.background = "";
  link.style.color = "#2875DE";
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.createMyBoardMenuLink() --------------------------------------------------
//  FUNCTION  :   MyBoard.createMyBoardMenuLink(menuText, title, eventHandler, menuClassName)
//  PURPOSE   :   Creates a link for the MyBoard menu. Called for each menu item.
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   menuText      - The text to display for the menu choice
//                title         - string to set to title for the menu item.
//                eventHandler  - event handler to setup for click event on the menu item.
//                menuClassName - string to set for the className property on the menu link.
//  RETURNS   :   -
MyBoard.createMyBoardMenuLink = function(menuText, title, eventHandler, menuClassName) {
  var self = "MyBoard.createMyBoardMenuLink";
  
  var menuLink = document.createElement("a");
  menuLink.href="javascript: void(0)"; 
  menuLink.textContent = menuText;
  menuLink.title = title;
  menuLink.className = menuClassName
  menuLink.style.position = "relative";
  menuLink.style.display = "block";
  menuLink.style.margin = "0";
  menuLink.style.paddingTop = "5px";
  menuLink.style.paddingBottom = "5px";
  menuLink.style.paddingRight = "10px";
  menuLink.style.paddingLeft = "10px";
  menuLink.style.width = "auto";
  menuLink.style.whiteSpace = "nowrap";
  menuLink.style.textAlign = "left";
  menuLink.style.textDecoration = "none";
  menuLink.style.background = "#EAEBD8";
  menuLink.style.color = "#2875DE";
  menuLink.style.fontSize = "11px";
  menuLink.style.fontFace = "arial";
  menuLink.addEventListener("click", eventHandler, false);
  menuLink.addEventListener("mouseover",MyBoard.hiliteMenu,false);
  menuLink.addEventListener("mouseout",MyBoard.unhiliteMenu,false);
  return menuLink;
}
//-----------------------------------------------------------------------------------------------------------------------




//------------------------------------ MyBoard.createMyBoardMenu() --------------------------------------------------
//  FUNCTION  :   MyBoard.createMyBoardMenu()
//  PURPOSE   :   Creates the MyBoard menu
//  ASSUMES   :   -
//  AFFECTS   :   -
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.createMyBoardMenu = function() {
  var self = "MyBoard.createMyBoardMenu";

  var menuDiv, menuLink, menuAnchor, listDefinition, listDefinition, shortName, menuClassName;

  menuDiv = document.createElement("div");
  menuDiv.id="menuDiv";
  menuDiv.addEventListener("mouseover",MyBoard.menuCancelCloseTimer,false);
  menuDiv.addEventListener("mouseout",MyBoard.menuCloseTimer,false);
  menuDiv.style.position = "absolute";
  menuDiv.style.display = "none";
  menuDiv.style.margin = "0";
  menuDiv.style.padding = "0";
  menuDiv.style.background = "#EAEBD8";
  menuDiv.style.borderWidth = "1px";
  menuDiv.style.borderStyle = "solid";
  menuDiv.style.borderColor = "#5970B2";
  menuDiv.style.zIndex = "10000";
  //--------------------------------- At A Glance Menu Link  ------------------------------------
  // only add it if the page supports it...
  if (MyBoard.Page.isAtAGlanceSupported) {
    menuLink = MyBoard.createMyBoardMenuLink("At a Glance","Click to see a Summary table for this page",
                        MyBoard.pageAtAGlanceMenuObject, "MyBoard_atAGlance_menu");
    menuDiv.appendChild(menuLink);
  }
  //--------------------------------- Show Lists menu  ------------------------------------
  menuLink = MyBoard.createMyBoardMenuLink("Show Lists","Click to view your MyBoard lists",
                      MyBoard.showListsMenuObject, "MyBoard_ShowLists_menu");
  menuDiv.appendChild(menuLink);
  //--------------------------------- About MyBoard Menu Link ------------------------------------
  menuLink = MyBoard.createMyBoardMenuLink("About MyBoard (Supported Boards)","Click to access information about MyBoard & Supported Hobby Boards",
                      MyBoard.aboutMyBoardMenuObject, "MyBoard_aboutMyBoard_menu");
  menuDiv.appendChild(menuLink);
  //--------------------------------- Clear lists Links ------------------------------------
  // build menus from definitions since we may not have loaded lists
  for (var i=0; i<MyBoard.listDefinitions.length; i++) {
    listDefinition = MyBoard.listDefinitions[i];
    if (listDefinition[MyBoard.listDefinitionsOffsets.shortName] != "NONE") {
      shortName = listDefinition[MyBoard.listDefinitionsOffsets.shortName];
      menuClassName = MyBoard.buildClassNameWithValue(shortName, MyBoard.menuObjectClassNamePrefix);
      menuLink = MyBoard.createMyBoardMenuLink("CLEAR " + shortName,"Click to remove all " + shortName,
                        MyBoard.clearHidesListMenu, menuClassName);
      menuDiv.appendChild(menuLink);

    }
  }
  //add a line
  line = document.createElement("hr");
  line.style.height="1em";
  menuDiv.appendChild(line);
  //-------------------- The Main Menu Anchor ------------------------------------
  menuAnchor = document.createElement("a");
  menuAnchor.textContent = "MyBoard";
  menuAnchor.href="javascript: void(0)";
  menuAnchor.addEventListener("mouseover",MyBoard.menuOpen,false);
  menuAnchor.addEventListener("mouseout",MyBoard.menuCloseTimer,false);
  menuAnchor.style.marginTop = "0 ";
  menuAnchor.style.marginRight = "1px";
  menuAnchor.style.marginBottom = "0";
  menuAnchor.style.marginLeft = "0";
  menuAnchor.style.paddingTop = "4px";
  menuAnchor.style.paddingBottom = "4px";
  menuAnchor.style.paddingRight = "10px";
  menuAnchor.style.paddingLeft = "10px";
  menuAnchor.style.width = "auto";
  menuAnchor.style.color = "#FFF";
  menuAnchor.style.textAlign = "center";
  menuAnchor.style.textDecoration = "none";
  var menu = document.createElement("li");
  menu.id = MyBoard.menuNavLinkId;
  menu.style.margin = "0";
  menu.style.padding = "0";
  menu.style.position = "absolute";
  menu.style.listStyle = "none";
  menu.style.float = "left";
  menu.style.fontWeight = "bold";
  menu.style.fontSize = "11px";
  menu.style.fontFace = "arial";
  menu.appendChild(menuAnchor);
  menu.appendChild(menuDiv);
  MenuObj = new MyBoard.uIObject(menu.id, "menu", menu);
  return menu;
}
//-----------------------------------------------------------------------------------------------------------------------



//------------------------------------ MyBoard.addMyBoardMenuToTopMenuBar() --------------------------------------------------
//  FUNCTION  :   MyBoard.addMyBoardMenuToTopMenuBar
//  PURPOSE   :   Adds MyBoard menu to the menuBar
//  ASSUMES   :   the Board's menu bar has ID "brd-navlinks"
//  AFFECTS   :   DOM
//  PARAMETERS:   -
//  RETURNS   :   -
MyBoard.addMyBoardMenuToTopMenuBar = function() {
    var self = "MyBoard.addMyBoardMenuToTopMenuBar";
    var menu, list, menuBar;

    Core.enter(self);
    menuBar = document.getElementById("brd-navlinks");
    if (typeof menuBar == "undefined" || menuBar == null) {
      Core.error(self, "Could not find top menu bar");
      return;
    }
    menu = MyBoard.createMyBoardMenu();
    list = menuBar.getElementsByTagName("ul");
    list[0].appendChild(menu);
    Core.leave(self);
}
//-----------------------------------------------------------------------------------------------------------------------



//--------------------------- MAIN BODY --------------------------------------------------
//Main body - gets executed when the script starts.
main = {
  init: function() {
    var self = "main.init()";
 
    var str, endTime, seconds, result;

    str = "\t\t" + document.location.href;
    if (MyBoard.isLoaded) {
      main.reload();
    } else {
      //setup the Page object and determine page type
      MyBoard.Page.init();
      str += " pageType:" + MyBoard.Page.pageType +
             "\ndomain:'" + MyBoard.Page.domain + "' boardId: " + MyBoard.boardId + 
             " forumId:" + MyBoard.Page.forumId + " forumName:" + MyBoard.Page.forumName;

      Core.logWithHeader(self, str);    
      if (MyBoard.Page.domain != "" && !MyBoard.Page.skipFurtherProcessing) {
        //populate the lists (atf, rdl, etc
        MyBoard.getPersistentData();

        //call the processing function for this pagetype (convert 1st char to upper)
        str = MyBoard.Page.pageType.substr(0,1);
        str = "process" + str.toUpperCase() + MyBoard.Page.pageType.substr(1,MyBoard.Page.pageType.length-1)+"Page";
        if (MyBoard.Page[str] && typeof MyBoard.Page[str] == "function") {
          MyBoard.Page[str]();
          //save updated user inf for this page.
          User.savePersistentData();
        } else {
          Core.error(self, "Processing pageType: " + MyBoard.Page.pageType + ", but no processing function found:" + str); 
        }
      }
      
      if (MyBoard.Page.pageType != "redirecting") MyBoard.addMyBoardMenuToTopMenuBar();
      result= (Core.errorCount>0) ? "WITH " + Core.errorCount + " ERRORS" : "***** SUCCESS *****";
      Core.logWithHeader(self,"\t\t****** MyBoard COMPLETED ******\t\t" + result +
                                "\n\tpageType:" + MyBoard.Page.pageType + 
                                ((MyBoard.Page.skipFurtherProcessing) ? "\t\t" : " (" + MyBoard.Page.posts.length + " posts; " + 
                                            MyBoard.Page.hiddenPostsCount + " hidden) ") + 
                                "\n\tUsers persistent data saved: " + MyBoard.pesistentUserDataSaveCount +" times" +
                                "\n\tlist persistent data saved:  " + MyBoard.pesistentListDataSaveCount + " times");
      MyBoard.isLoaded = true;

      endTime = new Date();
      seconds =  (endTime.getTime() - startTime.getTime()) / 1000;
      Core.log(self, "script run time: " + seconds + " sec");
      //if (Core.errorCount > 0) {
      //  alert("Errors enocountered - check error log for details")
      //}
    }
  }, //init method
  reload: function() {
    var self = "main.reload";
    Core.log(self," attempting to reload page");
    window.location.reload();
  }

} //main
main.init();
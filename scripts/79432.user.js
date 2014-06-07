// vanilla user ignore script
// version 0.1
// Firefox extension GUID: {a7080f44-3bbd-482a-8023-24349aaf394d}
// Copyright (c) 2007, Lyle Hanson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Vanilla User Ignore", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Vanilla User Ignore
// @namespace     http://bikelikemad.org
// @description   Ignore comments from certain users on Vanilla forums
// @include       http://*bikelikemad.org/comments.php*
// @include       http://*chifg.com/comments.php*
// @include       http://*bikeblackribbon.com/forum/comments.php*
// @include       http://*fixed.gr/*comments.php*
// @include       http://*lafixed.com/comments.php*
// @include       http://*sffixed.com/comments.php*
// @include       http://*londonfgss.com/comments.php*
// ==/UserScript==

//TODO: option to ignore quoted posts by a user as well
//TODO: hide certain individual posts rather than just by user
//TODO: hide certain discussions

// author names and IDs for the comments on the current page
var authorIDs;
var authorNames;
var hostname = getHostName();

// get the comments list node
var commentsListNode = document.getElementById('Comments');
parseAuthorIDs(commentsListNode);
addIgnoreButtons(commentsListNode);
//GM_registerMenuCommand("Edit ignore list", editList);
var ignoreUsersList = getIgnoreUsersList();
hideIgnoredPosts(commentsListNode);



function parseAuthorIDs (commentsNode) {
  // the regex used to match a user ID from an account link
  var authorIDRegex = /.*\/account\.php\?u=(\d+)/;
  // the XPath expression used to find author names and IDs
  var AuthorXPath = '//li/div[@class="CommentHeader"]/ul/li/a';
  var authorNodes = document.evaluate(AuthorXPath, commentsNode, null,
                                      XPathResult.ORDERED_ANY_TYPE, null);

  // reinitialize the arrays
  authorIDs = new Array();
  authorNames = new Array();
  
  // loop through the matching author ID nodes
  var currentAuthorLink = authorNodes.iterateNext();
  while (currentAuthorLink) {
    // apply the regex to the account link
    var resultArray = authorIDRegex.exec(currentAuthorLink.getAttribute("href"));
    // add the userID to the array
    if ( resultArray && (resultArray.length >= 2) )
      authorIDs.push(resultArray[1]);
  	else
      authorIDs.push(-1);
    // add the author name
    authorNames.push(currentAuthorLink.textContent);
    currentAuthorLink = authorNodes.iterateNext();
  }
}


function addIgnoreButtons(commentsNode) {
  // the XPath expression used to find the span in the comment header for each post
  var XPathPattern = '//div[@class = "CommentHeader"]/span';
  var headerItemNodes = document.evaluate(XPathPattern, commentsNode, null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < headerItemNodes.snapshotLength; i++) {
    var currentHeaderItem = headerItemNodes.snapshotItem(i);
    var ignoreLink = document.createElement('a');
    ignoreLink.setAttribute('href', 'javascript:void(0)');
    var ignoreText = document.createTextNode('ignore user');
    ignoreLink.appendChild(ignoreText);
    // create a closure to pass our protected value into the standard environment    
    (function(userID) {
      ignoreLink.addEventListener('click', function(){ignoreUser(userID);}, true);
    })(authorIDs[i]);
    currentHeaderItem.insertBefore(ignoreLink, currentHeaderItem.firstChild);
  }
}


function ignoreUser (userID) {
  if (arrayContains(ignoreUsersList, userID))
    return;
  ignoreUsersList[ignoreUsersList.length] = userID;
  setIgnoreUsersList(ignoreUsersList);
  hideIgnoredPosts(commentsListNode);
}


function unignoreUser (userID) {
  ignoreUsersList = removeItems(ignoreUsersList, userID);
  setIgnoreUsersList(ignoreUsersList);
  hideIgnoredPosts(commentsListNode);
}


function hideIgnoredPosts(commentsNode) {
  // list items representing the comments on the current page
  var commentNodes = document.evaluate('./li[not(@class="IgnoredPost")]', commentsNode, null,
                                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < commentNodes.snapshotLength; i++ )
  {
    var currentCommentNode = commentNodes.snapshotItem(i);
    var currentAuthorID = authorIDs[i];
    // see if this author ID is in the ignored users list
    var userIsIgnored = false;
    // if the user is ignored
    if (arrayContains(ignoreUsersList, currentAuthorID)) {
      // is the comment already hidden?
      if (currentCommentNode.style.display == "none")
        continue;
      // hide the node
      currentCommentNode.style.display = "none";
      // insert a replacement "comment is ignored" node
      var hiddenCommentElement = document.createElement("li");
      hiddenCommentElement.className = "IgnoredPost";
      hiddenCommentElement.innerHTML = '<div class="CommentHeader"><ul><li>[Comment by ' + authorNames[i] + ' ignored]</li></ul> <span><a id="UnignoreUserButton" href="javascript:void(0)">unignore user</a></span></div>';
      currentCommentNode.parentNode.insertBefore(hiddenCommentElement, currentCommentNode.nextSibling);
      // now get a reference to the unignore link
      var unignoreLink = document.getElementById("UnignoreUserButton");
      // clear the ID
      unignoreLink.setAttribute('id', null);
      // create a closure to pass our protected value into the standard environment    
      (function(userID) {
        unignoreLink.addEventListener('click', function(){unignoreUser(userID);}, true);
      })(currentAuthorID);
    }
    // otherwise if this user was unignored but this post is still hidden
    else if (currentCommentNode.style.display == "none") {
      var nextElement = currentCommentNode.nextSibling;
      if (nextElement && (nextElement.className == "IgnoredPost")) {
        nextElement.parentNode.removeChild(nextElement);
        currentCommentNode.style.display = "list-item";
      }
    }
  }
}


function getIgnoreUsersList() {
   var ignorelistString = GM_getValue(hostname + "-ignoreUsersList");
   if (ignorelistString != undefined && ignorelistString.length > 0)
     return ignorelistString.split("|");
   else
    return new Array();
 }


function setIgnoreUsersList(list) {
  if (list != undefined && list.length > 0)
    GM_setValue(hostname + "-ignoreUsersList", list.join("|"));
  else
    GM_setValue(hostname + "-ignoreUsersList", "");
}


function getHostName() {
  var domArray = window.location.host.split('.');
  return domArray[domArray.length-2]+"."+domArray[domArray.length-1];
}


function arrayContains(array, item) {
  for (var i=0; i<array.length; i++) {
    if (array[i] == item)
      return true;
  }
  return false;
}


function removeItems(array, item) {
  var i = 0;
  while (i < array.length) {
    if (array[i] == item) {
      array.splice(i, 1);
    } else {
      i++;
    }
  }
  return array;
}
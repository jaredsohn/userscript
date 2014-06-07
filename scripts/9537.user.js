// ==UserScript==
// @name           Extended blocking
// @namespace      http://www.outeverywhere.com
// @include        http://www.outeverywhere.com/opinions/*
// @include        http://www.journalhound.com/opinions/*
// ==/UserScript==


//
// Maximum number of posters who can be blocked
//
var MAX_BLOCKS = 50;

var _blockUserId = null;
var _blockUserName = null;

var _quoteButton = null;

//
// Mappings from id to username.  All entries in the map are blocked 
//
var _blockedUsers = {};
var _blockedPhotos = {};

//
//  
//
var _userBackgrounds = {};

//
//  Add getElementsByClassName method to the document object
//
//  tagName paremter is option.  If null or omitted, all tags
//  are returned
//
document.getElementsByClassName = function(clsName, tagName) {
  var retVal = new Array();
  var elements = document.getElementsByTagName(tagName ? tagName : "*");
  for (var i = 0; i < elements.length; ++i){
    if (elements[i].className.indexOf(" ") >= 0) {
      var classes = elements[i].className.split(" ");
      for (var j = 0; j < classes.length; ++j) {
      if (classes[j] == clsName)
         retVal.push(elements[i]);
      }
    } else if(elements[i].className == clsName) {
      retVal.push(elements[i]);
    }
  }
  return retVal;
}


/*
   name - name of the cookie
   value - value of the cookie
   [expires] - expiration date of the cookie
     (defaults to end of current session)
   [path] - path for which the cookie is valid
     (defaults to path of calling document)
   [domain] - domain for which the cookie is valid
     (defaults to domain of calling document)
   [secure] - Boolean value indicating if the cookie transmission requires
     a secure transmission
   * an argument defaults when it is assigned null as a placeholder
   * a null placeholder is not required for trailing omitted arguments
*/

function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}


/*
  name - name of the desired cookie
  return string containing value of specified cookie or null
  if cookie does not exist
*/

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}


/*
   name - name of the cookie
   [path] - path of the cookie (must be same as path used to create cookie)
   [domain] - domain of the cookie (must be same as domain used to
     create cookie)
   path and domain default if assigned null or omitted if no explicit
     argument proceeds
*/

function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}



function scrollToElement(theElement){

  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                        		      
 window.scrollTo(selectedPosX,selectedPosY);

}



function focusOnPlaceholder() {
  var placeholders = document.getElementsByClassName("placeholder", "div");
  for (var ii = 0; ii< placeholders.length; ++ii) {
    if (placeholders[ii].className == "placeholder") {
      var anchors = placeholders[ii].getElementsByTagName("a");
      if (anchors.length > 0) {
        scrollToElement(anchors[0]);
      }
      break;
    }
  }

  return;
}



//
// Cross browser compatible method to add events.
//
function addEvent(object, eventType, method, useCapture) {
  if (object.attachEvent) {
    object.attachEvent("on" + eventType, method);
  } else if (object.addEventListener) {
    object.addEventListener(eventType, method, useCapture ? true : false);
  }
}

//
// Return the first node in the tree history with the specified class name
//
function getParentWithClassName(node, className) {
  while (node && node.className != className) {
    node = node.parentNode;
  }
  return node;
}


function getParentWithTagName(node, tagName) {
  while (node && node.tagName.toLowerCase() != tagName.toLowerCase()) {
    node = node.parentNode;
  }
  return node;
}

function getCoords(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return {x:curleft, y:curtop};
}


//
//
//
function toggleBlockedPosting(event) {
  if (!event) {
    event = window.event;
  }
    
  var target = event.target ? event.target : event.srcElement;
  target = getParentWithTagName(target, "div");
  
  if (target.nextSibling.style.display == "none") {
    target.nextSibling.style.display = "block";
    target.style.opacity = 0.2;
  } else {
    target.nextSibling.style.display = "none";
    target.style.opacity = 1;
  }
  return;
}
 

function getUserId(element) {
  var post = getParentWithClassName(element, "forumpost");
  var anchor = post.getElementsByTagName("a")[0];
  var start = anchor.href.indexOf("who=") + 4;
  var end = anchor.href.indexOf("&", start);
  return "_" + anchor.href.substring(start, end);
}

function getUserName(element) {
  var post = getParentWithClassName(element, "forumpost"); 
  start = post.innerHTML.lastIndexOf("(") + 1;
  end = post.innerHTML.lastIndexOf(")");
  return post.innerHTML.substring(start, end);
}


//
//
//
function showBlockOptions(event) {
  if (!event) {
    event = window.event;
  }

  var target = event.target ? event.target : event.srcElement;
  
  _quoteButton = target;

  window._blockUserId = getUserId(target);
  window._blockUserName = getUserName(target);
  
  
  if (_blockedUsers[window._blockUserId]) {
     document.getElementById("blockUser").style.display = "none";
     document.getElementById("unblockUser").style.display = "block";
  } else {
     document.getElementById("blockUser").style.display = "block";
     document.getElementById("unblockUser").style.display = "none";
  }
  
  if (_blockedPhotos[window._blockUserId]) {
     document.getElementById("blockPhoto").style.display = "none";
     document.getElementById("unblockPhoto").style.display = "block";
  } else {
     document.getElementById("blockPhoto").style.display = "block";
     document.getElementById("unblockPhoto").style.display = "none";
  }  


  var blockOptions = document.getElementById("blockOptions");
  
  var coords = getCoords(target);
  blockOptions.style.display = "block"; 
  blockOptions.style.left = (coords.x - blockOptions.offsetWidth + target.offsetWidth) + "px" ;
  blockOptions.style.top = (coords.y + target.offsetHeight + 1) + "px";

  event.cancelBubble = true;
  if (event.stopPropagation) {
    event.stopPropagation()
  }
  
  event.preventDefault();
  return false;
}



function saveBlockedPosters() {
  var cookieString = "";
  for (var id in _blockedUsers) {
    cookieString += cookieString.length > 0 ? "," : "";
    cookieString += id + ":" + _blockedUsers[id] 
  }

  var date = new Date();
  date.setFullYear(date.getFullYear() + 2);  
  setCookie("blockedUsers", cookieString, date);
  
  return;
}




function saveBlockedPhotos() {
  var cookieString = "";
  for (var id in _blockedPhotos) {
    cookieString += cookieString.length > 0 ? "," : "";
    cookieString += id + ":" + _blockedPhotos[id] 
  }

  var date = new Date();
  date.setFullYear(date.getFullYear() + 2);  
  setCookie("blockedPhotos", cookieString, date);
  
  return;
}




function blockPoster(event) {
  var userId = window._blockUserId;
  var userName = window._blockUserName;
  _blockedUsers[userId] = userName;
  
  saveBlockedPosters();
  updateBlocksDisplay();

  return;
}

function unblockPoster(event) {
  delete _blockedUsers[window._blockUserId];
  
  saveBlockedPosters();
  updateBlocksDisplay();
  return;
}



function blockPosterPhoto(event) {
  var userId = window._blockUserId;
  var userName = window._blockUserName;
  _blockedPhotos[userId] = userName;
  
  saveBlockedPhotos();
  updateBlocksDisplay();
  return;
}

function unblockPosterPhoto(event) {
  delete _blockedPhotos[window._blockUserId];
  saveBlockedPhotos();
  updateBlocksDisplay();
  return;
}


//
// Hide or redisplay any users that have been blocked or unblocked.
//
function updateBlocksDisplay() {

  var postTops = document.getElementsByClassName("posttop", "div");

  for (var ii = 0; ii < postTops.length; ++ii) {
    
    var postTop = postTops[ii];
    var post = getParentWithClassName(postTop, "forumpost");
    
    var userName = getUserName(post);
    var userId = getUserId(post);
    
    if (!_userBackgrounds[userId]) {
      _userBackgrounds[userId] = postTop.style.background;
    }
     
    //
    // Hide the user photo if it's blocked
    //
    if (_blockedPhotos[userId]) {
      postTop.style.oldBackground = 
      postTop.style.background = "";
    } else {
      postTop.style.background = _userBackgrounds[userId];
    }
    
    //
    // Check whether the blocked place holder exists.
    //
    var blockPlaceholder = null;
    if (post.previousSibling && post.previousSibling.className == "placeholder blockPlaceholder") {
      blockPlaceholder = post.previousSibling;
    }
    
    //
    // Hide the post if it's blocked
    //
    if (_blockedUsers[userId]) {
      
      post.style.display = "none";
      
      
      if (!blockPlaceholder) {
        //
        // Insert some text to notify that the posting has been blocked and an
        // option to redisplay it.
        //
        var div = document.createElement("div");
        div.innerHTML = "<span style='letter-spacing:normal'>Blocked posting from " + 
                        userName + "</span>";
        div.className = "placeholder blockPlaceholder";
        div.style.marginBottom = "2px";
        div.style.marginTop = "2px";
        
        var span = document.createElement("span");
        span.style.textTransform = "lowercase";
        span.style.letterSpacing = "normal";
        span.style.textAlign = "right";
        span.innerHTML = "";
        div.appendChild(span);
        
        addEvent(div, "click", toggleBlockedPosting);
        post.parentNode.insertBefore(div, post);     
      }
  
    } else {
      post.style.display = "block";
      if (blockPlaceholder) {
        blockPlaceholder.parentNode.removeChild(blockPlaceholder);
      }
    }
  
  }
  
  if (!_pageLoaded) {
    focusOnPlaceholder();
  }
  return;
}






var _blockCookie = getCookie("blockedUsers");
var _blockPhotoCookie = getCookie("blockedPhotos");

//
// Parse the cookies into their respective maps
//
if (_blockCookie) {
  var idNamePairs = _blockCookie.split(",");
  for (var ii = 0; ii < idNamePairs.length; ++ii) {
    var idName = idNamePairs[ii].split(":");
    _blockedUsers[idName[0]] = idName[1];
  }
}

if (_blockPhotoCookie) {
  var idNamePairs = _blockPhotoCookie.split(",");
  for (var ii = 0; ii < idNamePairs.length; ++ii) {
    var idName = idNamePairs[ii].split(":");
    _blockedPhotos[idName[0]] = idName[1];
  }
}


updateBlocksDisplay();

var postTops = document.getElementsByClassName("posttop", "div");

//
// update the quote buttons.
//
for (var ii = 0; ii < postTops.length; ++ii) {
  
  var postTop = postTops[ii];
  var post = getParentWithClassName(postTop, "forumpost");
  post.id = "post" + ii; 
  
  //
  // Alter the block button functionality
  //
  var postDivs = post.getElementsByTagName("div");
  var postBot = postDivs[postDivs.length - 1];
  var anchors = postBot.getElementsByTagName("a");


  for (var jj = 0; jj < anchors.length; ++jj) {

    if (anchors[jj].innerHTML.toLowerCase() == "block poster") {
      var button = anchors[jj];
      button.innerHTML = "block";
      addEvent(button, "click",  showBlockOptions);
      break;
    }
  }
  
}
 

function highlight(event) {
  if (!event) {
    event = window.event;
  }
  var target = event.target ? event.target : event.srcElement;
  var children = target.getElementsByTagName("div");
  if (children.length == 0) {
    target.style.backgroundColor = "#e0e0e0";
  } 
  return;
}

function lowlight(event) {
  if (!event) {
    event = window.event;
  }
  var target = event.target ? event.target : event.srcElement;
  var children = target.getElementsByTagName("div");
  if (children.length == 0) {
    target.style.backgroundColor = "";
  }
  return;
}
 
//
//  Create the blocking options panel
//
var blockOptions = document.createElement("div");
blockOptions.id = "blockOptions";



var blockUser = document.createElement("div");
blockUser.innerHTML = "Hide Posts";
blockUser.id = "blockUser";
addEvent(blockUser, "click", blockPoster);

var unblockUser = document.createElement("div");
unblockUser.innerHTML = "Show Posts";
unblockUser.id = "unblockUser";
addEvent(unblockUser, "click", unblockPoster);

var blockPhoto = document.createElement("div");
blockPhoto.innerHTML = "Hide Photo";
blockPhoto.id = "blockPhoto";
addEvent(blockPhoto, "click", blockPosterPhoto);

var unblockPhoto = document.createElement("div");
unblockPhoto.innerHTML = "Show Photo";
unblockPhoto.id = "unblockPhoto";
addEvent(unblockPhoto, "click", unblockPosterPhoto);


var standardBlockOption =  document.createElement("div");
standardBlockOption.innerHTML = "Block Poster";
addEvent(standardBlockOption, "click", function() {
  if (confirm("Do you want to block this user completely")) {
    location.href = _quoteButton.href;
  }
}); 


blockOptions.appendChild(blockPhoto);
blockOptions.appendChild(unblockPhoto);
blockOptions.appendChild(blockUser);
blockOptions.appendChild(unblockUser);
blockOptions.appendChild(standardBlockOption);


blockOptions.style.border = "1px solid black";
blockOptions.style.padding = "2px";
blockOptions.style.backgroundColor = "white";
blockOptions.style.position = "absolute";
blockOptions.style.cursor = "default";
blockOptions.style.display = "none";


addEvent(blockOptions, "mouseover", highlight);
addEvent(blockOptions, "mouseout", lowlight);


document.body.appendChild(blockOptions);

addEvent(document.body, "click", function() {
  document.getElementById("blockOptions").style.display = "none"; 
});

var _pageLoaded = true;






// ==UserScript==
// @name           PackRat Tracker
// @namespace      http://userscripts.org/users/59262
// @description    Allows PackRat players to keep track of their progress with each collection. Information about collections and card availability is collected automatically from packrat tools at http://www.packrattools.com/
// @source         http://userscripts.org/scripts/show/31750
// @identifier     http://userscripts.org/scripts/source/31750.user.js
// @version        v2 1.6
// @date           2011-05-03
// @creator        Constantinos Neophytou, based (with permission) on the original code written by James David Sutter at http://packrat.utut.net/. Some modifications provided by Isaac Kishk
// @include        http://apps.facebook.com/packrat*
// @include        http://apps.new.facebook.com/packrat*
// @include        http://www.facebook.com/board*
// @include        http://www.new.facebook.com/board*
// @include        http://www.facebook.com/topic*
// @include        http://www.new.facebook.com/topic*
// @include        http://packrattools.com/*
// @include        http://*.packrattools.com/*
// ==/UserScript==

var globalPrefs = new Prefs();

/* Update */
var version_timestamp   = 201105032041;
var req_data_version = 200808080405;

/* Check frequency, in hours */
var FREQ_COLLECTION = 12;
var FREQ_COLLECTION_DATA = 24;
var FREQ_NEW = 2;

var EMPTY_LINK = "javascript:void(0);";
var REQUEST_HEADER = {
  'Cache-Control': 'no-cache',
  'User-Agent': 'Mozilla/5.0 (compatible; Greasemonkey PackRat Tracker; version ' + version_timestamp + ')'
};

var markets = {
  'Buy':{slug:", $1cr",regex:/[, ]*([0-9]+)([ ]*credits)/gi,filler:true,market:false},
  'Purchase':{slug:", $1tx",regex:/[, ]*([0-9]+)([ ]*tickets)/gi,filler:true,market:false},
  // 'Pop-up':{slug:"PU",regex:/Pop-up|Pop up|Invite Bonus/gi,market:false,ticket:false,xl:false},
  // 'Vault Bonus':{slug:"VB",regex:/Vault Bonus( Only)?/gi,market:false,ticket:false,xl:false},
  'Draw Card':{slug:"BD",regex:/(Bonus Draw|Draw Card|Draw Bonus)/gi,market:false,ticket:false,xl:false},
  // 'Moscow':{slug:"M",link:"moscow",regex:/Moscow/gi,market:true,ticket:false,xl:false},
  // 'Rio de Janeiro':{slug:"R",link:"rio",regex:/Rio de Janeiro/gi,market:true,ticket:false,xl:true},
  
  // 'Chicago':{slug:"C",link:"chicago",regex:/Chicago/gi,market:true,ticket:false,xl:false},
  'London':{slug:"L",link:"london",regex:/London/gi,market:true,ticket:false,xl:false},
  'Washington D.C.':{slug:"W",link:"washington-dc",regex:/Washington-DC/gi,market:true,ticket:false,xl:false},
  // 'New York':{slug:"NY",link:"new-york",regex:/(New York|new-york)/gi,market:true,ticket:false,xl:false},
  'Venice':{slug:"Ve",link:"venice",regex:/Venice/gi,market:true,ticket:false,xl:false},
  'Moscow':{slug:"M",link:"moscow",regex:/Moscow/gi,market:true,ticket:false,xl:false},
  // 'Sydney':{slug:"S",link:"sydney",regex:/Sydney/gi,market:true,ticket:false,xl:false},
  // 'Berkeley':{slug:"B",link:"berkeley",regex:/Berkeley/gi,market:true,ticket:false,xl:false},
  // 'Easter':{slug:"E",link:"easter",regex:/Easter/gi,market:true,ticket:false,xl:false},
  'Singapore':{slug:"Si",link:"singapore",regex:/Singapore/gi,market:true,ticket:false,xl:true},
  'Austin':{slug:"A",link:"austin",regex:/Austin/gi,market:true,ticket:false,xl:true},
  'Vancouver':{slug:"Va",link:"vancouver",regex:/Vancouver/gi,market:true,ticket:false,xl:true},
  'Paris':{slug:"P",link:"paris",regex:/Paris/gi,market:true,ticket:true,xl:false},
  'Beijing':{slug:"B",link:"beijing",regex:/Beijing/gi,market:true,ticket:true,xl:false},
  'Portofino':{slug:"P",link:"portofino",regex:/Portofino/gi,market:true,ticket:true,xl:false},
  'Dubai':{slug:"D",link:"dubai",regex:/Dubai/gi,market:true,ticket:true,xl:false}
  // 'Scottsdale':{slug:"Sc",link:"scottsdale",regex:/Scottsdale/gi,market:true,ticket:true,xl:false}
};

var priceTypes = {'Cr':'Credits', 'Tx':'Tickets'};

// reverse lookups
var marketSlugs = {
  'chicago': 'Chicago',
  'london': 'London',
  'washington-dc': 'Washington D.C.',
  'new-york': 'New York',
  'sydney': 'Sydney',
  'venice': 'Venice',
  'moscow': 'Moscow',
  'berkeley': 'Berkeley',
  'easter': 'Easter',
  'singapore': 'Singapore',
  'austin': 'Austin',
  'vancouver': 'Vancouver',
  'paris': 'Paris',
  'beijing': 'Beijing',
  'portofino': 'Portofino',
  'dubai': 'Dubai',
  'scottsdale': 'Scottsdale'
};

// Global data
var lastCollUpdate = ({});
var collections = ({});
var rats = ({});

function populateMarketData() {
  var marketLink = PACKRAT_HREF + "markets/";
  for (var m in markets) {
    var marketClass = '';
    if (markets[m].ticket) {
      marketClass = 'packrat_tracker_ticketMarket';
    } else if (markets[m].xl) {
      marketClass = 'packrat_tracker_xlMarket';
    } else if (!markets[m].filler) {
      marketClass = 'packrat_tracker_creditMarket';
    }
    if (markets[m].link != undefined)
      markets[m].slugElem = "</a></span><span class='"+marketClass+"'><a href='"+marketLink+markets[m].link+"'>"+markets[m].slug;
    else if (marketClass != '')
      markets[m].slugElem = "</a></span><span class='"+marketClass+"'>"+markets[m].slug+"<a href='"+EMPTY_LINK+"'>";
    else
      markets[m].slugElem = markets[m].slug;
  }
}

var families = {
  'banana':{out_color:"#fff4bf",in_color:"#ffdd73"},
  'blueberry':{out_color:"#cceeff",in_color:"#99ddff"},
  'cherry':{out_color:"#ffd9dd",in_color:"#ffa6ae"},  
  'chocolate':{out_color:"#f2e0ce",in_color:"#ccb399"},
  'cotton':{out_color:"#f4cfe8",in_color:"#f492d4"},
  'cotton-candy':{out_color:"#f4cfe8",in_color:"#f492d4"},
  'lavender':{out_color:"#dacef2",in_color:"#b7a1e6"},
  'lime':{out_color:"#e6ffb3",in_color:"#c4e67f"},
  'mandarin':{out_color:"#ffdacc",in_color:"#ffb499"}
};

var popupRegex = /(Pop-up|Pop up|Invite Bonus|Bonus Draw|Draw Bonus|Draw Card|Vault Bonus( Only)?)/gi;

function familyFromColor(color_string) {
  var hexcolor = parseColorString(color_string);
  
  for (var i in families) {
    if (hexcolor == families[i].out_color) {
      return i;
    }
  }
  return 'unknown';
}

/***
 * Function: Script Update Checker
 *
 * Description:
 * Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
var version_scriptNum = 31750;
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"), 10)+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/"+version_scriptNum+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"").replace(/&#x000A;?/g,"\n");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1], 10)>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/"+version_scriptNum);}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});updateCheck(false);

var CREDIT_COLLECTION = 1;
var XL_COLLECTION = 2;
var TICKET_COLLECTION = 4;

var ALPHA_SORT = "alpha";
var DATE_SORT = "date";

var WIKI_HREF = "http://www.packratwiki.com/";
var PRT_HREF = "http://packrattools.com/";
var API_HREF = "http://api.packrattools.com/";
var INFO_HREF = PRT_HREF + "info/";
var MOTD_HREF = "http://www.neophytou.net/packrat/prt_motd.php";
var STORE_HREF = "http://www.neophytou.net/packrat/tracker/";
var MARKET_TRACKER = PRT_HREF + "tracker/";

var MIN_WORD_LENGTH = 3;
var MIN_SEARCH_LENGTH = 2;

var foilFamilies = ['foil-banana', 'foil-blueberry', 'foil-cherry', 'foil-chocolate', 'foil-cotton-candy', 'foil-lavender', 'foil-lime', 'foil-mandarin'];

function getUserData(dataID, defaultData, userID, onlyUser) {
  var data;
  if (userID == undefined)
    userID = globalPrefs.userID;
  var global = ({"motd":1, "lastUpdate":1, "targetScriptName":1, "lastImgUpdate":1});
  
  if (global[dataID]) {
    if (!onlyUser) {
      if (typeof defaultData == "string") {
        return GM_getValue(dataID, defaultData);
      } else {
        return eval(GM_getValue(dataID, defaultData.toSource()));
      }
    } else {
      return -1;
    }
  }
  data = GM_getValue(userID+'_'+dataID, false);
  var evalData = false;
  if (typeof defaultData != "string") {
    evalData = true;
  }
  if (data === false) {
    if (evalData) {
      defaultData = defaultData.toSource();
    }
    data = GM_getValue(dataID, defaultData);
    GM_setValue(userID+'_'+dataID, data);
    if (typeof GM_deleteValue == 'function')
      GM_deleteValue(dataID);
  }
  if (evalData) {
    return eval(data);
  } else {
    return data;
  }
}

function setUserData(dataID, data, userID) {
  var global = ({"motd":1, "lastUpdate":1, "targetScriptName":1, "coll-images":1, "images":1, "lastImgUpdate":1});
  if (global[dataID]) {
    return;
  }
  
  if (userID == undefined || userID == 0)
    userID = globalPrefs.userID;
  if (userID == 0) return;
  dataID = userID + "_" + dataID;
  if (typeof data == "string") {
    GM_setValue(dataID, data);
  } else {
    GM_setValue(dataID, data.toSource());
  }
}

/* Basic classes */
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};
String.prototype.fullTrim = function() {
  return this.trim().replace(/  +/g," ");
};
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
};
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
};


/***
 * Object: Utils
 *
 * Description: contains some utilities functions.
 */
Utils = new Object();

/***
 * Method: Element.getElementsByClassName(name, node)
 *
 * Description:
 * Gets a list of elements with a give className.
 *
 * @param name        -- the classname to look for.
 * @param node        -- node on which we start the search.
 * @return array      -- an array of nodes matching the classname.
 */
if (document.getElementsByClassName) {
  /* Firefox 3: native implementation */
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    return node.getElementsByClassName(classname);
  };
} else {
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    var xpathExpression;
    var returnElements = new Array();
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";
    var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);

    while (node = xpathResult.iterateNext()) {
      returnElements.push(node);
    }
    return returnElements;
  };
}

/***
 * Function: Utils.getElementsByXPath(expression, node)
 *
 * Description:
 * Returns an array of elements obtained from evaluating the XPath expression on
 * the node.
 *
 * @param expression         -- the expression to evaluate.
 * @param node               -- context node, defaults to document.
 * @return array             -- an array of elements matching the expression
 */
Utils.getElementsByXPath = function(expression, node) {
  if (!node) node = document;
  var result = new Array();
  var xpathResult;
  xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()) {
    result.push(node);
  }

  return result;
};

//*****************************************************************************
// Do not remove this notice.
//
// Copyright 2001 by Mike Hall.
// See http://www.brainjar.com for terms of use.
//*****************************************************************************

// Determine browser and version.
function Browser() {
  var ua, s, i;
  this.isIE    = false;
  this.isNS    = false;
  this.version = null;
  ua = navigator.userAgent;
  s = "MSIE";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isIE = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }
  s = "Netscape6/";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }
  // Treat any other "Gecko" browser as NS 6.1.
  s = "Gecko";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = 6.1;
    return;
  }
}
var browser = new Browser();

// Global object to hold drag information.
var dragObj = new Object();
dragObj.zIndex = 100;

function dragStart(event, id) {
  var el;
  var x, y;
  // If an element id was given, find it. Otherwise use the element being
  // clicked on.
  if (id)
    dragObj.elNode = document.getElementById(id);
  else {
    if (browser.isIE)
      dragObj.elNode = window.event.srcElement;
    if (browser.isNS)
      dragObj.elNode = event.target;
    // If this is a text node, use its parent element.
    if (dragObj.elNode.nodeType == 3)
      dragObj.elNode = dragObj.elNode.parentNode;
  }
  // Get cursor position with respect to the page.
  if (browser.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (browser.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }
  // Save starting positions of cursor and element.
  dragObj.cursorStartX = x;
  dragObj.cursorStartY = y;
  if (isNaN(parseInt(dragObj.elNode.style.right, 10))) {
    dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
  } else {
    dragObj.elStartLeft  = window.innerWidth - 255 - parseInt(dragObj.elNode.style.right, 10);
  }
  dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);

  if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
  if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

  // Update element's z-index.
  dragObj.elNode.style.zIndex = ++dragObj.zIndex;

  // Capture mousemove and mouseup events on the page.
  if (browser.isIE) {
    document.attachEvent("onmousemove", dragGo);
    document.attachEvent("onmouseup",   dragStop);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (browser.isNS) {
    document.addEventListener("mousemove", dragGo,   true);
    document.addEventListener("mouseup",   dragStop, true);
    event.preventDefault();
  }
}

function dragGo(event) {
  var x, y;
  // Get cursor position with respect to the page.
  if (browser.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (browser.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  dragObj.elNode.style.right = "auto";
  // Move drag element by the same amount the cursor has moved.
  dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
  dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";

  if (browser.isIE) {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (browser.isNS)
    event.preventDefault();
}

function dragStop(event) {
  var point = ({});
  point.left = parseInt(dragObj.elNode.style.left, 10);
  point.right = window.innerWidth - 255 - parseInt(dragObj.elNode.style.left, 10);
  point.top = parseInt(dragObj.elNode.style.top, 10);
  // Save window position
  if (point.left < -220) {
    point.left = -220;
    dragObj.elNode.style.left = "-220px";
  }
  if (point.top < -65) {
    point.top = -65;
    dragObj.elNode.style.top = "-65px";
  }
  setPref("WINDOW_POSITION", point)();
  
  if (point.left >= point.right) {
    dragObj.elNode.style.left = 'auto';
    dragObj.elNode.style.right = (point.right - 10) + "px";
  }
  
  // Stop capturing mousemove and mouseup events.
  if (browser.isIE) {
    document.detachEvent("onmousemove", dragGo);
    document.detachEvent("onmouseup",   dragStop);
  }
  if (browser.isNS) {
    document.removeEventListener("mousemove", dragGo,   true);
    document.removeEventListener("mouseup",   dragStop, true);
  }
}

function getUserID() {
  var userID = 0;
  var div = document.getElementById('fb_menu_profile');
  if (div) {
    var link = div.getElementsByTagName('a');
    if (link && link[0]) {
      userID = link[0].href.match(/id=([0-9]+)/);
      if (userID && userID[1]) {
        userID = parseInt(userID[1], 10);
      } else {
        var user = link[0].href.match(/\/([^?\/]+)\?/)[1];
        var userIDs = eval(GM_getValue('userIDs', '({})'));
        // alert(user + " - " + userIDs.toSource() + " - " + userIDs[user]);
        if (!userIDs[user] || userIDs[user] == undefined) {
          var div = document.getElementsByName('fb_sig_user');
          if (div && div[0])
            userIDs[user] = parseInt(div[0].value, 10);
          GM_setValue('userIDs', userIDs.toSource());
          // alert(userIDs.toSource());
        }
        userID = userIDs[user];
        // alert(userID);
      }
    }
  } else {
    var link = document.getElementById('navAccountName');
    if (link) {
      userID = link.href.match(/id=([0-9]+)/);
      if (userID && userID[1]) {
        userID = parseInt(userID[1], 10);
      } else {
        var user = link.href.match(/\/([^?\/]+)\??/)[1];
        var userIDs = eval(GM_getValue('userIDs', '({})'));
        // alert(user + " - " + userIDs.toSource() + " - " + userIDs[user]);
        if (!userIDs[user] || userIDs[user] == undefined) {
          var div = document.getElementsByName('fb_sig_user');
          if (div && div[0])
            userIDs[user] = parseInt(div[0].value, 10);
          GM_setValue('userIDs', userIDs.toSource());
          // alert(userIDs.toSource());
        }
        userID = userIDs[user];
        // alert(userID);
      }
    }
  }
  return userID;
}

var Page = new Object();

Page.init = function() {
  /* Now */
  Page.now = Math.floor(new Date().getTime() / 1000);
  var url = location.href;
  /* New Facebook layout */
  Page.fnew = false;
  if (url.indexOf('packratwiki') != -1) Page.wiki = true;
  else Page.wiki = false;
  if (url.indexOf('packrattools') != -1) Page.marketTracker = true;
  else Page.marketTracker = false;
  if ((url.indexOf('board.php') != -1) || (url.indexOf('topic.php') != -1)) {
    Page.boards = true;
    if ((url.indexOf("app_id=2431403991") != -1) || (url.indexOf("xid=packrat") != -1)) {
      Page.packratBoards = true;
    } else {
      Page.packratBoards = false;
      return;
    }
  } else Page.boards = false;
  Page.onPackrat = !Page.wiki && !Page.marketTracker && !Page.boards;
  /* User ID */
  Page.active_tab = 0;
  if (Page.onPackrat) {
    var nav = document.getElementById('app2431403991_nav');
    var activeBox = Utils.getElementsByClassName('selected', nav);
    if (activeBox.length) {
      var span = activeBox[0].getElementsByTagName('span');
      if (span && span[0] && span[0].innerHTML == "Your Pack") {
        Page.active_tab = 1;
      }
    }
  }
  if (!Page.wiki) {
    if (Page.marketTracker) {
      div = Utils.getElementsByClassName("content")[0];
      Page.c_user = '';
      Page.c_userID = '';
      Page.p_user = globalPrefs.P_USER;
    } else {
      Page.c_user = getUserID();
      var browse = document.getElementById('app2431403991_browse');
      if (Page.active_tab) {
        var activeBox = Utils.getElementsByClassName('selected', nav);
        var link = activeBox[0].getElementsByTagName('a');
        matched = link[0].href.match(/\/packrat\/users\/(([0-9]+)\-([0-9a-f]+))(\/.+)?/);
        if (matched && matched.length > 1) {
          Page.c_userID = matched[1];
        }
      } else if (browse) {
        var matched = Utils.getElementsByClassName('avatar-featured', browse);
        if (matched && matched[0]) {
          matched = matched[0].href.match(/\/packrat\/users\/(([0-9]+)\-([0-9a-f]+))(\/.+)?/);
          if (matched && matched.length > 1) {
            Page.c_userID = matched[1];
          }
        }
      } else {
        var matched = location.href.match(/\/packrat\/users\/(([0-9]+)\-([0-9a-f]+))(\/.+)?/);
        if (matched && matched.length > 1) {
          Page.c_userID = matched[1];
        }
      }
      if (Page.active_tab) {
        if (matched && matched.length > 1) {
          Page.p_user = matched[1];
          setPref('P_USER', matched[1])();
        } else {
          Page.p_user = globalPrefs.P_USER;
        }
      } else {
        Page.p_user = globalPrefs.P_USER;
      }
    }
  }
  /* Cut out the params */
  var params = url.split('?');
  url = params[0];
  if (params[1]) {
    params = params[1];
  } else params = undefined;
  var parts = url.split('/');
  if (Page.wiki) basePart = 3;
  else if (Page.boards) basePart = 3;
  else {
    if ((parts[4].replace(/#/gi, '') == 'users') && (parts.length > 6))
      basePart = 6;
    else
      basePart = 4;
  }
  if (!Page.marketTracker) {
    /* type */
    Page.c_page = parts[basePart].replace(/#/gi,'');
    /* Argument (like user id, etc.) */
    if (parts[basePart+1])
      Page.c_arg = parts[basePart+1].replace(/#/gi,'');
    else
      Page.c_arg = parts[basePart-1];
    /* params */
    Page.c_params = new Object();
    if (!params) return;
    parts = params.split('&');
    for (var i = 0; i < parts.length; i++) {
      var param = parts[i].split('=');
      Page.c_params[param[0]] = param[1];
    }
  } else {
    Page.c_page = "marketTracker";
    Page.c_arg = '';
    Page.c_params = new Object();
  }
};

Page.backgroundScan = function(page, fetch_url, callback) {
  try
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: fetch_url + "?" + (new Date().getTime()),
			headers: REQUEST_HEADER,
			onload: function(xhrResponse)
			{
        lastCollUpdate.setTime(page);
        lastCollUpdate.save();
				var text = xhrResponse.responseText;//.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
				parser=new DOMParser();
        xmlDoc = parser.parseFromString(text,"text/xml");
        collections.updateData(page, xmlDoc, fetch_url);
        if (typeof callback == "function")
          callback();
        else if (typeof callback == "string")
          eval(callback);
			}
		});
	}
	catch (err)
	{
    alert("An error occurred while checking for recipes:\n" + err);
	}
};

Page.backgroundJSONScan = function(page, fetch_url, callback) {
  try
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: fetch_url + "&" + (new Date().getTime()),
			headers: REQUEST_HEADER,
			onload: function(xhrResponse)
			{
        lastCollUpdate.setTime(page);
        lastCollUpdate.save();
        try
        {
				  var json = eval(xhrResponse.responseText);
			  }
			  catch (err)
			  {
			    //error
			    return;
			  }
        collections.updateJSONData(page, json, fetch_url);
        if (typeof callback == "function")
          callback();
        else if (typeof callback == "string")
          eval(callback);
			}
		});
	}
	catch (err)
	{
    alert("An error occurred while checking for recipes:\n" + err);
	}
};

Page.motdScan = function() {
  try
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: MOTD_HREF + "?version="+version_timestamp+"&date="+new Date().getTime(),
			headers: REQUEST_HEADER,
			onload: function(xhrResponse)
			{
				var text = xhrResponse.responseText;//.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
				var old_motd = GM_getValue('motd', '');
				if (old_motd != text) {
				  setPref('HIDE_MOTD', false)();
				}
        var motd = document.getElementById("prt_motd");
        motd.innerHTML = text;
        GM_setValue('motd', text);
			}
		});
	}
	catch (err) { }
};

Page.goUrl = function(url) {
  return function() {
    location.href = url;
  };
};

Page.scan = function() {
  var check_vault = globalPrefs.CHECK_VAULT;
  var next_url = '';
  //if (check_vault) {
  //  next_url = PACKRAT_HREF + "users/" + Page.p_user + "/vault";
  //}
  var collectionExists = true;

  if (Page.c_page == 'vault' && Page.c_userID == Page.p_user) {
    var div = Utils.getElementsByClassName('paging');
    if (div.length) {
      div = div[div.length-1];
      next_url = div.href;
    }
    /* Check cards */
    var cards = new Array();
    var divs = Utils.getElementsByClassName('card-wrapper', document.getElementById('app2431403991_cards'));
    for (var i = 0; i < divs.length; i++) {
      var front = Utils.getElementsByClassName('card', divs[i])[0];
      if (!front) continue;
      var cardLink = front.getElementsByTagName('a');
      if (!cardLink || !cardLink.length) continue;
      var name = cardLink[0].innerHTML;
      cardLink = cardLink[0].parentNode.innerHTML;
      id = cardLink.match(/\/items\/([^\/]+)\/history/);
      if (!id) {
        id = cardLink.href.match(/Kind\/(.*)/);
        if (!id) continue;
      }
      var card = new Card(id[1]);
      card.name = name;
      var collection = front.id.match(/app2431403991_card_([0-9a-z\-]+).*/);
      if (!collection || !collection.length) continue;
      card.collection = collection[1];
      /* Name */
      cards.push(card);
    }
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (!card.id) continue;
      /* Check if collection exists in db */
      collectionExists = false;
      for (var j in collections[card.collection].cards) {
        if (typeof collections[card.collection].cards[j] == "function") continue;
        collectionExists = true;
        if (card.name == collections[card.collection].cards[j].name) {
          // mark as owned
          collections[card.collection].cards[j].owned = true;
        }
      }
      updateCollectionStatus(card.collection);
      if (!collectionExists) {
        // fetch collection, redo check.
        Page.backgroundJSONScan("wiki", apiUrl(collections[card.collection].slug), Page.scan);
        // Page.backgroundScan("wiki", collections[card.collection].wiki_link, Page.scan);
        break;
      }
    }
    collections.save();
    if (collectionExists && (div.innerHTML != 'Next')) {
      setPref('CHECK_VAULT', false)();
      next_url = PACKRAT_HREF;
    }
    // go to next_url
    //if (collectionExists && check_vault && next_url)
    //  setTimeout(Page.goUrl(next_url), 1000);
  }
};

function trackerUrl(slug)
{
  if (slug)
  {
    return MARKET_TRACKER + "?collection=" + slug;
  }
  return MARKET_TRACKER;
}

function infoUrl(slug)
{
  if (slug)
  {
    return INFO_HREF + "?collection=" + slug;
  }
  return INFO_HREF;
}

function apiUrl(slug)
{
  if (slug)
  {
    var time = '';
    if (globalPrefs.marketDataFreshness !== 0) {
      var date = new Date();
      date.setDate(date.getDate()-globalPrefs.marketDataFreshness);
      time = '&time=' + (date.getTime() / 1000);
    }
    return API_HREF + "?req=collection&collection="+slug+time;
  }
  return API_HREF + "?req=list";
}

function slugFromApiURL(apiurl)
{
  var split = apiurl.split("&");
  if (split && split[1]) {
    var data = split[1].split("=");
    if (data && data[1]) {
      return data[1];
    }
  }
  return '';
}

function toggle_iStore_links() {
  var iStore = document.getElementById('packrat_tracker_istore_links');
  var show = document.getElementById('packrat_tracker_istore_show_links');
  var hide = document.getElementById('packrat_tracker_istore_hide_links');
  
  if (!iStore || !show || !hide) return;
  
  if (iStore.style.display == "none") {
    iStore.style.display = "block";
    show.style.display = "none";
    hide.style.display="inline";
  } else {
    iStore.style.display = "none";
    show.style.display = "inline";
    hide.style.display="none";
  }
}

function InternetStore() {
  this.userID = globalPrefs.userID;
  this.tries = 0;
  this.loadURL = STORE_HREF + "index.php?userID=" + this.userID;
  this.saveURL = this.loadURL + "&action=save";
  this.logoutURL = this.loadURL + "&action=logout";
  this.signupURL = this.loadURL + "&action=signup";
  this.loginURL = this.loadURL + "&action=login";
  this.checkURL = this.loadURL + "&action=lastsave";
  this.headers = REQUEST_HEADER;
  this.headers['Cookie'] = 'loginkey='+globalPrefs.LOGINKEY;
  this.clearURL = STORE_HREF + "clear.gif";
  var clear = document.getElementById('packrat_tracker_istore_clear');
  if (!clear) {
    var img = document.createElement('iframe');
    img.width = 1;
    img.height = 1;
    img.id = "packrat_tracker_istore_clear";
    document.getElementById('facebook').appendChild(img);
    img.src = this.clearURL;
  }
}

InternetStore.prototype = new Object();

InternetStore.prototype.load = function(noask) {
  if (!noask) {
    var answer = confirm("Are you sure you want to load from iStore? Any data you have locally will be overwritten!");
    if (!answer) {this.restoreIndicator(); return; }
  }
  this.setAction("Loading data... (please wait, it's a lot of data!)");
  try
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: this.loadURL,
			headers: this.headers,
			onload: function(xhrResponse)
			{
			  try {
  				var response = eval(xhrResponse.responseText);
  				if (response['loginkey']) {
  				  setPref('LOGINKEY', response['loginkey'])();
  				}
  		    var iStore = new InternetStore();
  				if (response['request'] != undefined) {
  				  if (response['request']) {
  				    // need to get password, sign up, save data.
  				    iStore.signup();
  				  } else {
    				  iStore.restoreIndicator();
  				  }
  			    return;
  				}
  				if (response['loggedin'] != undefined) {
  				  if (!response['loggedin']) {
  				    // not logged in, get pass and log in, get data again.
  				    iStore.logIn("load");
    			    return;
  				  }
  				}
  				if (!response['data']) {
  				  alert("There was an error retrieving the data. Please try again.");
  				  alert(xhrResponse.responseText);
  				}
  				var responseData = eval(response['data']);
  			  iStore.restoreIndicator();
  			  for (var x in responseData) {
            setUserData(x, responseData[x]);
  			  }
  			  alert("Data loaded. You will now be redirected to your pack");
  			  location.href = PACKRAT_HREF;
				} catch (err) {
  			  iStore.restoreIndicator();
				  alert("There was an error retrieving the data: "+err+". Please try again.");
				}
			}
		});
	}
	catch (err) { }
};

InternetStore.prototype.signup = function() {
  this.setAction('Registering...');
  this.tries = 0;
  this.getPassword(true);
  if (!this.password) {
		this.restoreIndicator();
    return;
  }
  try
	{
	  this.headers['Cookie'] += ";password="+this.password;
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: this.signupURL,
			headers: this.headers,
			onload: function(xhrResponse)
			{
			  var iStore = new InternetStore();
			  try {
  				var response = eval(xhrResponse.responseText);
  				if (response['loginkey']) {
  				  setPref('LOGINKEY', response['loginkey'])();
  				}
  				if (response['loggedin'] != undefined && response['loggedin']) {
  			    iStore.save(true);
  				} else {
  				  iStore.restoreIndicator();
  				}
				} catch (err) {
				  iStore.restoreIndicator();
				  alert("There was an error signing up: "+err+". Please try again.");
				}
			}
		});
	}
	catch (err) { }
};

InternetStore.prototype.logIn = function(callbackStr) {
  this.setAction('Logging in...');
  this.getPassword();
  if (!this.password) {
		this.restoreIndicator();
    return;
  }
  try
	{
	  this.headers['Cookie'] += ";password="+this.password;
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: this.loginURL,
			headers: this.headers,
			onload: function(xhrResponse)
			{
			  var iStore = new InternetStore();
			  try {
				  var response = eval(xhrResponse.responseText);
  				if (response['loginkey']) {
  				  setPref('LOGINKEY', response['loginkey'])();
  				}
  				if (response['loggedin'] != undefined) {
  				  if (response['loggedin']) {
  				    if (callbackStr == "load") {
  				      iStore.load(true);
				      } else if (callbackStr == "save") {
				        iStore.save(true);
				      }
  				    return;
  			    } else {
  			      alert("Login failed, please try again.");
  			    }
  				}
				} catch (err) {
		      alert("Login failed: "+err+", please try again.");
				}
			  iStore.restoreIndicator();
			}
		});
	}
	catch (err) { }
};

InternetStore.prototype.logOut = function() {
  this.setAction('Logging out...');
  try
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: this.logoutURL,
			headers: this.headers,
			onload: function(xhrResponse)
			{
			  var iStore = new InternetStore();
			  try {
				  var response = eval(xhrResponse.responseText);
  				if (response['loginkey']) {
  				  setPref('LOGINKEY', response['loginkey'])();
  				}
  				if (response['loggedin'] != undefined) {
  				  if (!response['loggedin']) {
  			      alert("Successfully logged out.");
  			    } else {
  			      alert("Logout failed, please try again.");
  			    }
  				}
  				iStore.restoreIndicator();
				} catch (err) {
  				iStore.restoreIndicator();
		      alert("Logout failed: "+err+", please try again.");
				}
			}
		});
	}
	catch (err) { }
};

InternetStore.prototype.getPassword = function(newPass) {
  this.password = '';
  this.tries += 1;
  if (newPass) {
    this.password = prompt("Please select a password", '');
    var verify = prompt("Please verify your password", '');
    if (this.password != verify) {
      alert("Passwords do not match!");
      if (this.tries < 3) {
        this.getPassword(newPass);
        return;
      } else {
        this.password = false;
      }
    }
    return;
  }
  this.password = prompt('Please enter your password','');
};

InternetStore.prototype.save = function(noask, nocheck) {
  if (!noask) {
    var answer = confirm("Are you sure you want to save to the iStore? Any data already stored there will be overwritten!");
    if (!answer) {this.restoreIndicator(); return; }
  }
  try
	{
	  if (!noask && !nocheck) {
      this.setAction("Logging in...");
  		GM_xmlhttpRequest(
  		{
  			method: "GET",
  			url: this.checkURL,
  			headers: this.headers,
  			onload: function(xhrResponse)
  			{
  				var iStore = new InternetStore();
  			  try {
    				var response = eval(xhrResponse.responseText);
    				if (response['loginkey']) {
    				  setPref('LOGINKEY', response['loginkey'])();
    				}
    				if (response['request'] != undefined) {
    				  if (response['request']) {
    				    // need to get password, sign up, save data.
    				    iStore.signup();
    				  } else {
      				  iStore.restoreIndicator();
    				  }
    			    return;
    				}
    				if (response['loggedin'] == undefined) {
      				alert("There was an error communicating with the server");
      				iStore.restoreIndicator();
    				  return;
  				  }
  				  if (!response['loggedin']) {
  				    // not logged in, get pass and log in, get data again.
  				    iStore.logIn("save");
    			    return;
  				  } else {
  				    iStore.save(true, true);
  				    return;
  				  }
  				} catch (err) {
    			  iStore.restoreIndicator();
  				  alert("There was an error retrieving the data: "+err+". Please try again.");
  				}
  			}
  		});
	    return;
	  }
    this.setAction("Saving data... (please be patient, it's a lot of data!)");
	  var userData = ({});
	  for (var x in globalPrefs.savePrefs) {
	    userData[x] = getUserData(x, globalPrefs.savePrefs[x], globalPrefs.userID, true);
	    if (userData[x] === -1) {
	      delete(userData[x]);
	    }
	  }
	  this.headers['Content-type'] = "application/x-www-form-urlencoded";
		GM_xmlhttpRequest(
		{
			method: "POST",
			url: this.saveURL,
			data: "data="+encodeURIComponent(userData.toSource()),
			headers: this.headers,
			onload: function(xhrResponse)
			{
				var iStore = new InternetStore();
			  try {
  				var response = eval(xhrResponse.responseText);
  				if (response['loginkey']) {
  				  setPref('LOGINKEY', response['loginkey'])();
  				}
  				if (response['request'] != undefined) {
  				  if (response['request']) {
  				    // need to get password, sign up, save data.
  				    iStore.signup();
  				  } else {
    				  iStore.restoreIndicator();
  				  }
  			    return;
  				}
  				if (response['loggedin'] != undefined) {
  				  if (!response['loggedin']) {
  				    // not logged in, get pass and log in, get data again.
  				    iStore.logIn("save");
    			    return;
  				  }
  				}
  				if (response['saved'] == undefined || !response['saved']) {
  				  alert("Data NOT saved. Please try again.");
  				} else {
  				  alert("Data saved!");
  				}
  			  iStore.restoreIndicator();
				} catch (err) {
  			  iStore.restoreIndicator();
				  alert("Data NOT saved: "+err+". Please try again.");
				}
			}
		});
	}
	catch (err) { }
};

InternetStore.prototype.setAction = function(str) {
  var elem = document.getElementById('packrat_tracker_istore_text');
  if (!elem) return;
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
  if (str != undefined) {
    addText(str, elem, false);
  }
  var progress = document.getElementById('packrat_tracker_istore');
  var links = document.getElementById('packrat_tracker_istore_links');
  if (!progress || !links) return;
  if (str == undefined) {
    progress.style.display = "none";
    links.style.display = "block";
  } else {
    progress.style.display = "block";
    links.style.display = "none";
  }
};

InternetStore.prototype.restoreIndicator = function() {
  delete(this.password);
  this.setAction(undefined);
};

function startVaultScan() {
  return function() {
    setPref('CHECK_VAULT', true)();
    Page.scan();
  };
}

function parseDate(dateString) {
  var monthNumbers = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  var date = new Date();
  date.setHours(0,0,0,0);
  var split = dateString.match(/([^ ]+) ([0-9]+)[snrt]?[tdh]?, ([0-9]+)/i);
  if (split && split[0] && split[1] && split[2] && split[3]) {
    date.setFullYear(parseInt(split[3], 10), monthNumbers[split[1].substring(0,3)], parseInt(split[2], 10));
  }
  return date;
}

function parseJSONDate(dateString) {
  var split = dateString.split("-");
  var date = new Date(split[0], parseInt(split[1], 10)-1, split[2]);
  date.setHours(0,0,0,0);
  return date;
}

function repopulateMenu() {
  var select = document.getElementById("allcolld");
  populateCollectionList(select);
  var visible_repe = globalPrefs.VISIBLE_REPE;
  if (visible_repe != '' && select.selectedIndex==0) {
    for (var s in select.options) {
      if (select.options[s].value == visible_repe) {
        setSelect(s);
        break;
      }
    }
  }
}

function setProgressCount(coll, count, size) {
  var elem;
  var hideIfFull = false;
  if (typeof coll == "string")
    elem = document.getElementById(coll+"_progressCount");
  else {
    hideIfFull = true;
    elem = coll;
  }
  var countBoxes = Utils.getElementsByClassName('progressCount', elem);
  for (var x in countBoxes) {
    if (typeof countBoxes[x] !== 'number')
    {
        try{
            elem.removeChild(countBoxes[x]);
        } catch(ex) { }
    }
  }
  if (globalPrefs.SHOW_COUNT || globalPrefs.SHOW_PERCENT) {
    if (count >= size && globalPrefs.SHOW_FEAT_STATUS && hideIfFull) return;
    var box = document.createElement('span');
    box.className = "progressCount";
    if (globalPrefs.SHOW_COUNT)
      addText(count + "/" + size, box, true);
    var percent = (count * 100) / size;
    percent = Math.round(percent);
    if (globalPrefs.SHOW_PERCENT)
      addText(percent + "%", box, false);
    if (!globalPrefs.SHOW_PERCENT || !globalPrefs.SHOW_COUNT) {
      if (elem.style.marginTop) {
        elem.style.marginTop = "7px";
      }
      else {
        elem.style.marginTop = "1px";
      }
    }
    elem.appendChild(box);
  }
}

function timedScanForChanges(coll, hours) {
  if (lastCollUpdate.getTime(coll) + (3600000 * hours) <= (new Date().getTime())) // Checks once every hour (hours * 60 m * 60 s * 1000 ms)
  {
    lastCollUpdate.setTime(coll);
    lastCollUpdate.save();
    setTimeout(scanWikiForChanges(coll),200);
  }
}

function collectionUpdateCheck(forced) {
  return function() {
    if (((lastCollUpdate.getTime("onsale") + (3600000 * FREQ_COLLECTION)) <= (new Date().getTime())) || forced)
       // Checks every 12h (12 h * 60 m * 60 s * 1000 ms)
    {
      lastCollUpdate.setTime("onsale");
      lastCollUpdate.save();
      setTimeout(function() { Page.motdScan(); }, 200);
      setTimeout(scanWikiForCollChanges(forced),250);
    }
  };
}

function restoreUpdateLink() {
  var progress = document.getElementById('prt_collection_update_progress');
  var link = document.getElementById('prt_collection_update_link');
  var vault_scan = document.getElementById('prt_vault_scan_linkr');
  if (progress != undefined)
    progress.style.display = "none";
  if (link != undefined)
    link.style.display = "block";
  if (vault_scan != undefined)
    vault_scan.style.display = "block";
  populateCollections(document.getElementById("prt_form"));
  var visible_repe = globalPrefs.VISIBLE_REPE;
  if (visible_repe != '') {
    resetRecipes(visible_repe, false)();
  }
  repopulateMenu();
}

function scanWikiForCollChanges(forced) {
  return function() {
    if (forced) {
      var progress = document.getElementById('prt_collection_update_progress');
      var link = document.getElementById('prt_collection_update_link');
      link.style.display = "none";
      progress.style.display = "block";
      Page.backgroundJSONScan("onsale", apiUrl(), restoreUpdateLink);
      // Page.backgroundScan("onsale", WIKI_HREF + "PackRat", restoreUpdateLink);
    } else {
      Page.backgroundJSONScan("onsale", apiUrl(), '');
      // Page.backgroundScan("onsale", WIKI_HREF + "PackRat", '');
    }
  };
}

function Card(id) {
  this.id = id;
  this.name = '?';
  this.collection = 'unknown';
  this.points = 0;
  this.details = '';
  this.recipe = '';
  this.ingredients = new CardData();
  this.isIngredient = false;
  this.owned = false;
}

function CardData() {}

CardData.prototype = new Object();

function Collection(slug) {
  this.slug = slug;
  this.name = 'unknown';
  this.family = 'unknown';
  this.img = "";
  this.isExpired = false;
  this.isNew = false;
  this.isFuture = false;
  this.isExpiring = false;
  this.size = 0;
  this.wiki_link = WIKI_HREF;
  this.cards = new CardData();
}

function dateSort(a, b) {
  var order = 1;
  if (a.isExpiring && b.isExpiring)
    order = -1;
  return ((a.date < b.date) ? order : ((a.date > b.date) ? -1 * order : ((a.slug < b.slug) ? -1 : ((a.slug > b.slug) ? 1 : 0))));
}

function sortCollections(coll) {
  if (globalPrefs.SORT_STATUS == DATE_SORT) {
    var dateSorted = [];
    var dateSeen = false;
    for (var i in coll) {
      if (coll[i].date) dateSeen = true;
      dateSorted.push({'date':coll[i].date,'slug':i,'isExpiring':coll[i].isExpiring});
    }
    if (!dateSeen) {
      collectionUpdateCheck(true)();
      return;
    }
    dateSorted = dateSorted.sort(dateSort);
    var sorted = [];
    for (var j in dateSorted) {
      sorted.push(dateSorted[j].slug);
    }
    return sorted;
  }
  else if (globalPrefs.SORT_STATUS == ALPHA_SORT || true) {
    var toSort = [];
    for (var i in coll)
      toSort.push(i);
    return toSort.sort();
  }
}

function sortByValue(keyArray, valueMap) {
  return keyArray.sort(function(a,b){return ((valueMap[a].name<valueMap[b].name) ? -1 : ((valueMap[a].name>valueMap[b].name) ? 1 : 0));});
}

function Prefs() {
  var defaultPrefs = new Object();
  defaultPrefs.userID = getUserID();
  defaultPrefs.SORT_STATUS = ALPHA_SORT;
  defaultPrefs.SHOW_CREDIT_STATUS = true;
  defaultPrefs.SHOW_FEAT_STATUS = true;
  defaultPrefs.SHOW_PROGRESS = false;
  defaultPrefs.SHOW_PERCENT = false;
  defaultPrefs.SHOW_COUNT = true;
  defaultPrefs.FLOAT_SLIDER = false;
  defaultPrefs.PRTleft = GM_getValue('PRTleft', true);
  defaultPrefs.HIDE_FEATED = GM_getValue('hideFeated', false);
  defaultPrefs.CHECK_VAULT = false;
  defaultPrefs.VISIBLE_REPE = GM_getValue('visible_repe', '');
  defaultPrefs.REQ_DATA_VERSION = parseInt(GM_getValue('req_data_version', '0'), 10);
  defaultPrefs.PRTs = GM_getValue('PRTs', true);
  defaultPrefs.HTTPGO = GM_getValue('httpgo', 'guidemain');
  defaultPrefs.HIDE_MOTD = false;
  defaultPrefs.SEARCH_TERM = GM_getValue('search_term', '');
  defaultPrefs.P_USER = GM_getValue('p_user', '');
  defaultPrefs.DEF_POINT = ({left:-10000,right:-10000,top:-10000});
	defaultPrefs.WINDOW_POSITION = eval(GM_getValue("window_position", defaultPrefs.DEF_POINT.toSource()));
	defaultPrefs.LOGINKEY = '';
	defaultPrefs.hideTicketMarkets = false;
	defaultPrefs.hideXLMarkets = false;
  defaultPrefs.last_img_update = 0;
  defaultPrefs.last_coll_img_update = 0;  
  defaultPrefs.marketDataFreshness = 0;
	
  var prefs = getUserData('prefs', defaultPrefs, defaultPrefs.userID);
  for (var i in defaultPrefs) {
    if (prefs[i] == undefined) {
      prefs[i] = defaultPrefs[i];
    }
  }
  for (var i in prefs) {
    if (typeof prefs[i] == 'function') continue;
    this[i] = prefs[i];
  }
  this['validPrefs'] = ({"userIDs":({}), "saved_prefs":({}), "saved_card_list":({}), "saved_foils":({}), "saved_users":({}), "saved_soundex":({}), "saved_names":({}), "saved_packs":({}), "saved_words":({}), "coll-images":({}), "images":({}), "motd":'', "lastUpdate":'0', "targetScriptName":'', "prefs":({}), "rats":([]), "lastCollUpdate":({}), "lastImgUpdate":({}), "collections":({})});
  this['savePrefs'] = ({"saved_prefs":({}), "saved_packs":({}), "prefs":({}), "rats":([]), "collections":({})});
}

Prefs.prototype = new Object();

Prefs.prototype.cleanPrefs = function() {
  if (typeof GM_listValues != 'function' || typeof GM_deleteValue != 'function')
    return;
    
  var values = GM_listValues();
  var valid = this['validPrefs'];
  
  for (var i = 0; i < values.length; ++i) {
    var x = values[i].match(/[0-9]*_?(.*)/)[1];
    if (valid[x] == undefined) {
      GM_deleteValue(values[i]);
    }
    x = values[i].match(/0_(.*)/);
    if (x && x[1]) {
      GM_deleteValue(values[i]);
    }
  }
  
};

Prefs.prototype.save = function() {
  var valid = this['validPrefs'];
  this.cleanPrefs();
  delete(this['validPrefs']);
  if (globalPrefs.userID)
    GM_setValue(globalPrefs.userID+'_prefs', this.toSource());
  this['validPrefs'] = valid;
};

function togglePref(stat) {
  return function() {
    globalPrefs = new Prefs();
    globalPrefs[stat] = !globalPrefs[stat];
    globalPrefs.save();
    repopulateMenu();
  };
}

function setPref(stat, value) {
  return function() {
    globalPrefs = new Prefs();
    globalPrefs[stat] = value;
    globalPrefs.save();
    if (stat == "SORT_STATUS")
      repopulateMenu();
  };
}

function Rats() {
  var def = ([]);
  var rats = getUserData('rats', def);
  for (var i in rats) {
    if (typeof rats[i] == 'function') continue;
    this[i] = rats[i];
  }
}

function sortRats(rats) {
  var toSort = [];
  for (var i in rats) {
    if (typeof rats[i] == "function") continue;
    toSort.push(i);
  }
  return toSort.sort();
}

Rats.prototype = new Object();
Rats.prototype.save = function() {
  GM_setValue(globalPrefs.userID+'_rats', this.toSource());
};
Rats.prototype.updateRatData = function() {
  if ((Page.c_page == "steal" && Page.c_arg == "packrat") || (Page.c_page == 'users' && !Page.active_tab)) {
    var browse = document.getElementById('app2431403991_browse');
    if (!browse) return;
    var avatar = Utils.getElementsByClassName('avatar-featured', browse);
    if (!avatar || !avatar[0]) return;
    var uid = avatar[0].href.match(/\/packrat\/users\/(([0-9]+)\-([0-9a-f]+))(\/.+)?/);
    if (!uid || !uid[1]) return;
    var img = Utils.getElementsByClassName('rat', avatar[0]);
    if (!img || !img[0]) return;
    var myRat = false;
    var stealButtons = Utils.getElementsByClassName('steal_button');
    for (var x in stealButtons) {
      var inactive = Utils.getElementsByClassName('inactive', stealButtons[x]);
      if (!inactive || !inactive[0]) {
        myRat = true;
        break;
      }
    }
  }
  if (!myRat) return;
  var title = document.getElementById('app2431403991_title');
  if (!title) return;
  var header = title.getElementsByTagName('h2');
  if (!header || !header[0]) return;
  this[header[0].innerHTML] = uid[1];
  // if (Page.c_page == 'friends' && Page.c_arg == 'rats') { 
  //   /* Update list of rats */
  //   var elms = Utils.getElementsByClassName('card-wrapper',document);
  //   var user, link;
  //   for (var i in this) {
  //     if (typeof this[i] == "string") {
  //       delete this[i];
  //     }
  //   }
  //   
  //   for (var i = 0; i < elms.length; i++) {
  //     user = elms[i].getElementsByTagName('img')[0];
  //     if (user.src.indexOf('fake_users') != -1) {
  //       /* A rat */
  //       link = elms[i].getElementsByTagName('a')[0];
  //       uid = link.href.split('/')[5];
  //       this[user.alt] = uid;
  //     }
  //   }
  // }
  this.save();
};

function LastUpdateData() {
  var def = ({});
  var obj = getUserData('lastCollUpdate', def);
  for (var i in obj) {
    this[i] = obj[i];
  }
}

LastUpdateData.prototype = new Object();

LastUpdateData.prototype.save = function() {
  GM_setValue(globalPrefs.userID+'_lastCollUpdate', this.toSource());
};

LastUpdateData.prototype.size = function() {
  var len = 0;
  for (var i in this) {
    if (typeof this[i] != 'function') {
      len++;
    }
  }
  return len;
};

LastUpdateData.prototype.setTime = function(coll, time) {
  if (typeof this[coll] == "function")
    return;
  if (time == undefined)
    time = new Date().getTime();
  this[coll] = time + '';
};

LastUpdateData.prototype.getTime = function(coll) {
  if (typeof this[coll] != "function" && this[coll] != undefined)
    return parseInt(this[coll], 10);
  else
    return 0;
};

function SoundEx() {
}

SoundEx.prototype.getValue = function(chr) {
  var val = ({});
  val.a = -1;
  val.b =  1;
  val.c =  2;
  val.d =  3;
  val.e = -1;
  val.f =  1;
  val.g =  2;
  val.h =  0;
  val.i = -1;
  val.j =  2;
  val.k =  2;
  val.l =  4;
  val.m =  5;
  val.n =  5;
  val.o = -1;
  val.p =  1;
  val.q =  2;
  val.r =  6;
  val.s =  2;
  val.t =  3;
  val.u = -1;
  val.v =  1;
  val.w =  0;
  val.x =  2;
  val.y = -1;
  val.z =  2;
  if (val[chr] == undefined) return 0;
  return val[chr];
};

// Collapse out directly adjacent sounds
// 1. Assume that surname.length>=1
// 2. Assume that surname contains only lowercase letters
SoundEx.prototype.collapse = function(surname) {
  if (surname.length==1) {
    return surname;
  }
  var right=this.collapse(surname.substring(1,surname.length));
  if (this.getValue(surname.charAt(0)) == this.getValue(right.charAt(0))) {
    return surname.charAt(0)+right.substring(1,right.length);
  }
  return surname.charAt(0)+right;
};

// Collapse out directly adjacent sounds using the new National Archives method
// 1. Assume that surname.length>=1
// 2. Assume that surname contains only lowercase letters
// 3. H and W are completely ignored
SoundEx.prototype.omit = function(surname) {
  if (surname.length==1) {
    return surname;
  }
  var right=this.omit(surname.substring(1,surname.length));
  if (!this.getValue(right.charAt(0))) {
    return surname.charAt(0)+right.substring(1,right.length);
  }
  return surname.charAt(0)+right;
};

// Output the coded sequence
SoundEx.prototype.output_sequence = function(seq) {
  var output=seq.charAt(0).toUpperCase(); // Retain first letter
  output+="-"; // Separate letter with a dash
  var stage2=seq.substring(1,seq.length);
  var count=0;
  for (var i=0; i<stage2.length && count<3; i++) {
    if (this.getValue(stage2.charAt(i))>0) {
      output+=this.getValue(stage2.charAt(i));
      count++;
    }
  }
  for (; count<3; count++) {
    output+="0";
  }
  return output;
};

SoundEx.prototype.getString = function(term) {
  var stage1=this.omit(term);
  var stage2=this.collapse(stage1);
  return this.output_sequence(stage2);
};

/*
 * this['users'][userId][cardName][link] = 1
 * this['cards'][cardName][userId] = count
 * this['sound'][soundex][cardName] = 1
 * this['names'][userId] = name
 * this['packs'][userId] = 1/0
**/
function SavedCards() {
  this.clearData();
}

SavedCards.prototype = new Object();

SavedCards.prototype.clearData = function() {
  this.loadPrefs();
  this['users'] = ({});
  this['cards'] = ({});
  this['foils'] = ({});
  this['sound'] = ({});
  this['names'] = ({});
  this['packs'] = ({});
  this['words'] = ({});
  this['modified'] = ({});
  this['modified']['users'] = false;
  this['modified']['cards'] = false;
  this['modified']['foils'] = false;
  this['modified']['sound'] = false;
  this['modified']['names'] = false;
  this['modified']['packs'] = false;
  this['modified']['words'] = false;
  this['loaded'] = ({});
  this['loaded']['users'] = false;
  this['loaded']['cards'] = false;
  this['loaded']['foils'] = false;
  this['loaded']['sound'] = false;
  this['loaded']['names'] = false;
  this['loaded']['packs'] = false;
  this['loaded']['words'] = false;
};

SavedCards.prototype.loadPrefs = function() {
  var defaultPrefs = new Object();
  defaultPrefs.SOUND_SEARCH = true;
  defaultPrefs.PARTIAL_WORD_SEARCH = true;
  defaultPrefs.LIVE_SEARCH = false;
  defaultPrefs.ONLY_FOIL_SEARCH = false;
  defaultPrefs.INACTIVE_SAVE = true;
  var prefs = getUserData('saved_prefs', defaultPrefs);
  this['prefs'] = ({});
  for (var i in defaultPrefs) {
    if (prefs[i] == undefined) {
      prefs[i] = defaultPrefs[i];
    }
  }
  for (var i in prefs) {
    if (typeof prefs[i] == 'function') continue;
    this['prefs'][i] = prefs[i];
  }
};

SavedCards.prototype.loadCards = function() {
  var def = ({});
  var cards = getUserData('saved_card_list', def);
  var foils = getUserData('saved_foils', def);
  for (var i in cards) {
    this['cards'][i] = cards[i];
  }
  for (var i in foils) {
    this['foils'][i] = foils[i];
  }
  this['loaded']['cards'] = true;
  this['loaded']['foils'] = true;
};
SavedCards.prototype.loadUsers = function() {
  var def = ({});
  var users = getUserData('saved_users', def);
  for (var j in users) {
    this['users'][j] = users[j];
  }
  this['loaded']['users'] = true;
};
SavedCards.prototype.loadSound = function() {
  var def = ({});
  var sound = getUserData('saved_soundex', def);
  for (var k in sound) {
    this['sound'][k] = sound[k];
  }
  this['loaded']['sound'] = true;
};
SavedCards.prototype.loadNames = function() {
  var def = ({});
  var names = getUserData('saved_names', def);
  for (var l in names) {
    this['names'][l] = names[l];
  }
  this['loaded']['names'] = true;
};
SavedCards.prototype.loadPacks = function() {
  var def = ({});
  var packs = getUserData('saved_packs', def);
  for (var i in packs) {
    this['packs'][i] = packs[i];
  }
  this['loaded']['packs'] = true;
};
SavedCards.prototype.loadWords = function() {
  var def = ({});
  var words = getUserData('saved_words', def);
  for (var i in words) {
    this['words'][i] = words[i];
  }
  this['loaded']['words'] = true;
};

SavedCards.prototype.loadAll = function() {
  this.loadNames();
  this.loadSound();
  this.loadCards();
  this.loadUsers();
  this.loadPacks();
  this.loadWords();
};

SavedCards.prototype.formatCardName = function(cardName) {
  return cardName.replace(/[ \s\t\n]+/g,'').toLowerCase();
};

SavedCards.prototype.clearCards = function(userId) {
  if (!this['loaded']['users']) this.loadUsers();
  if (!this['loaded']['cards']) this.loadCards();
  
  for (var cardName in this['users'][userId]) {
    var mCardName = this.formatCardName(cardName);
    if (this['cards'][mCardName]) {
      if (this['cards'][mCardName][userId]) {
        for (var j in this['users'][userId][cardName]) {
          if (this['cards'][mCardName][userId]) {
            this['cards'][mCardName][userId] -= 1;
          }
        }
        if (this['cards'][mCardName][userId] <= 0) {
          delete(this['cards'][mCardName][userId]);
        }
      }
      var exists = false;
      for (var j in this['cards'][mCardName]) {
        exists = true;
        break;
      }
      if (!exists) {
        delete(this['cards'][mCardName]);
      }
    }
  }
  delete (this['users'][userId]);
  this['modified']['users'] = true;
  this['modified']['cards'] = true;
};

SavedCards.prototype.completeErase = function(userId) {
  if (!this['loaded']['users']) this.loadUsers();
  if (!this['loaded']['cards']) this.loadCards();
  
  for (var mCardName in this['cards']) {
    if (this['cards'][mCardName][userId]) {
      delete(this['cards'][mCardName][userId]);
    }
    var exists = false;
    for (var j in this['cards'][mCardName]) {
      exists = true;
      break;
    }
    if (!exists) {
      delete(this['cards'][mCardName]);
    }
  }
  
  delete (this['users'][userId]);
  this['modified']['users'] = true;
  this['modified']['cards'] = true;
};

SavedCards.prototype.clearFoils = function(userId) {
  if (!this['loaded']['users']) this.loadUsers();
  if (!this['loaded']['foils']) this.loadCards();
  
  for (var cardName in this['users']['userId']) {
    var mCardName = this.formatCardName(cardName);
    if (this['foils'][mCardName]) {
      for (var j in this['users'][userId][cardName]) {
        if (this['foils'][mCardName][userId]) {
          delete(this['foils'][mCardName][userId]);
        }
      }
      var exists = false;
      for (var j in this['foils'][mCardName]) {
        exists = true;
        break;
      }
      if (!exists) {
        delete(this['foils'][mCardName]);
      }
    }
  }
};

SavedCards.prototype.addCard = function(userId, cardName, cardLink) {
  if (!this['loaded']['users']) this.loadUsers();
  if (!this['loaded']['cards']) this.loadCards();
  
  var mCardName = this.formatCardName(cardName);
  if (this['users'][userId] == undefined) {
    this['users'][userId] = ({});
  }
  if (this['users'][userId][cardName] == undefined) {
    this['users'][userId][cardName] = ({});
  }
  this['users'][userId][cardName][cardLink] = 1; // true
  
  if (this['cards'][mCardName] == undefined) {
    this['cards'][mCardName] = ({});
  }
  if (this['cards'][mCardName][userId] == undefined) {
    this['cards'][mCardName][userId] = 0;
  }
  this['cards'][mCardName][userId] += 1;
  
  this.addSoundEx(mCardName, cardName);
  this.indexWords(cardName);
  
  this['modified']['users'] = true;
  this['modified']['cards'] = true;
};

SavedCards.prototype.addFoil = function(userId, cardName) {
  if (!this['loaded']['users']) this.loadUsers();
  if (!this['loaded']['foils']) this.loadCards();
  
  var mCardName = this.formatCardName(cardName);
  if (this['foils'][mCardName] == undefined) {
    this['foils'][mCardName] = ({});
  }
  if (this['foils'][mCardName][userId] == undefined) {
    this['foils'][mCardName][userId] = 0;
  }
  this['foils'][mCardName][userId] += 1;
  this['modified']['foils'] = true;
};

SavedCards.prototype.hasFoil = function(userId, cardName) {
  if (!this['loaded']['foils']) this.loadCards();

  var mCardName = this.formatCardName(cardName);
  if (this['foils'][mCardName] == undefined)
    return false;
  if (this['foils'][mCardName][userId] == undefined)
    return false;
  
  return (this['foils'][mCardName][userId] > 0);
};

SavedCards.prototype.indexWords = function(cardName) {
  if (!this['loaded']['words']) this.loadWords();
  var words = cardName.split(' ');
  for (var i = 0; i < words.length; ++i) {
    var mWord = this.formatCardName(words[i]);
    if (mWord.length < MIN_WORD_LENGTH) continue;
    this.addSoundEx(mWord, cardName);
    if (this['words'][mWord] == undefined)
      this['words'][mWord] = ({});
    if (!this['words'][mWord][cardName]) {
      this['words'][mWord][cardName] = 1;
      this['modified']['words'] = true;
    }
  }
};

SavedCards.prototype.addSoundEx = function(word, cardName) {
  if (word.length < MIN_WORD_LENGTH) return;
  if (!this['loaded']['sound']) this.loadSound();
  // do something with soundex
  var sdx = new SoundEx();
  var string = sdx.getString(word);
  if (this['sound'][string] == undefined)
    this['sound'][string] = ({});
  if (!this['sound'][string][cardName]) {
    this['sound'][string][cardName] = 1;
    this['modified']['sound'] = true;
  }
};

SavedCards.prototype.addName = function(userId, userName) {
  if (!this['loaded']['names']) this.loadNames();
  if (this['names'][userId] != userName) {
    this['names'][userId] = userName;
    this['modified']['names'] = true;
  }
};

SavedCards.prototype.getName = function(userId) {
  if (!this['loaded']['names']) this.loadNames();
  if (!this['names'][userId])
    return userId;
  return this['names'][userId];
};

SavedCards.prototype.refreshName = function() {
  var nameBox = document.getElementById('app2431403991_title');
  if (nameBox != undefined) {
    var name = nameBox.getElementsByTagName('h2');
    if (name && name[0] != undefined) {
      this.addName(Page.c_userID, name[0].innerHTML);
    }
  }
};

SavedCards.prototype.togglePackStatus = function(userId) {
  if (Page.c_userID == Page.p_user) return;
  if (!this['loaded']['packs']) this.loadPacks();
  this['packs'][userId] = !this.packStatus(userId);
  this['modified']['packs'] = true;
  this.save();
  rememberCards();
};

SavedCards.prototype.togglePref = function(pref) {
  this['prefs'][pref] = !this['prefs'][pref];
  this.save();
};

SavedCards.prototype.getPref = function(pref) {
  return this['prefs'][pref];
};

SavedCards.prototype.packStatus = function(userId) {
  if (userId == Page.p_user) return false;
  if (!this['loaded']['packs']) this.loadPacks();
  var ratKing = document.getElementById('app2431403991_rat-great');
  var recentlyStolen = false;
  if (ratKing) {
    recentlyStolen = ratKing.parentNode.getElementsByTagName("p");
  }
  if (this['packs'][userId] == undefined) {
    if (recentlyStolen && (recentlyStolen[0] != undefined) && (recentlyStolen[0].innerHTML.match(/never played PackRat before/) == 'never played PackRat before')) {
      var savedCards = new SavedCards();
      this['packs'][userId] = savedCards.getPref('INACTIVE_SAVE'); // default for inactive packs
    } else {
      this['packs'][userId] = false;
    }
    this['modified']['packs'] = true;
  }
  return this['packs'][userId];
};

SavedCards.prototype.findCard = function(searchTerm) {
  var mCardName = this.formatCardName(searchTerm);
  if (!this['loaded']['cards']) this.loadCards();
  var ret = ({});
  var onlyFoils = this.getPref('ONLY_FOIL_SEARCH');
  if (onlyFoils && searchTerm === "**") {
    ret = this['foils'];
    ret['onlyFoils'] = true;
    ret['allFoils'] = true;
    ret['noFullMatch'] = true;
    return ret;
  }
  ret['onlyFoils'] = onlyFoils;
  ret['allFoils'] = false;
  if (this['cards'][mCardName] != undefined) {
    if (!onlyFoils) {
      return this['cards'][mCardName];
    } else {
      var users = this['cards'][mCardName];
      var ret = ({});
      for (var i in users) {
        if (this.hasFoil(i, mCardName)) {
          ret[i] = users[i];
        }
      }
      return ret;
    }
  }
  ret['noFullMatch'] = true;
  if (this.getPref('PARTIAL_WORD_SEARCH')) {
    if (!this['loaded']['words']) this.loadWords();
    var words = searchTerm.split(' ');
    var matched = false;
    for (var i = 0; i < words.length; ++i) {
      var mWord = this.formatCardName(words[i]);
      if (mWord.length < MIN_WORD_LENGTH) continue;
      for (var x in this['words'][mWord]) {
        var tempCardName = this.formatCardName(x);
        if (ret[x] == undefined) ret[x] = ({});
        var cardExists = false;
        for (var y in this['cards'][tempCardName]) {
          if (onlyFoils && !this.hasFoil(y, x)) continue;
          cardExists = true;
          ret[x][y] = this['cards'][tempCardName][y];
        }
        if (!cardExists) {
          delete(ret[x]);
        } else {
          matched = true;
        }
      }
    }
    if (matched) {
      ret['isPartial'] = true;
      return ret;
    }
  }
  if (this.getPref('SOUND_SEARCH')) {
    if (!this['loaded']['sound']) this.loadSound();
    // get soundex and do search
    var sdx = new SoundEx();
    var string = sdx.getString(mCardName);
    var matched = false;
    var foundSound = false;
    for (var x in this['sound'][string]) {
      foundSound = true;
      var tempCardName = this.formatCardName(x);
      if (ret[x] == undefined) ret[x] = ({});
      var cardExists = false;
      for (var y in this['cards'][tempCardName]) {
        if (onlyFoils && !this.hasFoil(y, x)) continue;
        cardExists = true;
        ret[x][y] = this['cards'][tempCardName][y];
      }
      if (!cardExists) {
        delete(ret[x]);
      } else {
        matched = true;
      }
    }
    if (!foundSound && this.getPref('PARTIAL_WORD_SEARCH')) {
      var words = searchTerm.split(' ');
      for (var i = 0; i < words.length; ++i) {
        var mWord = this.formatCardName(words[i]);
        if (mWord.length <= 3) continue;
        for (var x in this['words'][mWord]) {
          var mCardName = this.formatCardName(x);
          var string = sdx.getString(mCardName);
          for (var x in this['sound'][string]) {
            matched = true;
            var tempCardName = this.formatCardName(x);
            if (ret[x] == undefined) ret[x] = ({});
            var cardExists = false;
            for (var y in this['cards'][tempCardName]) {
              if (onlyFoils && !this.hasFoil(y, x)) continue;
              cardExists = true;
              ret[x][y] = this['cards'][tempCardName][y];
            }
            if (!cardExists) {
              delete(ret[x]);
            } else {
              matched = true;
            }
          }
        }
      }
    }
    if (matched) {
      ret['isSoundex'] = true;
    }
  }
  return ret;
};

SavedCards.prototype.toString = function() {
  var string = '';
  if (!this['loaded']['cards']) this.loadCards();
  for (var x in this['cards']) {
    var card = "'"+x + "',";
    for (var y in this['cards'][x]) {
      string += card + y + ",'" + this.getName(y) + "'," + this['cards'][x][y] + "\n";
    }
  }
  GM_setValue(globalPrefs.userID+'_saved_csv', string);
};

SavedCards.prototype.save = function() {
  if (this['modified']['cards'])
    GM_setValue(globalPrefs.userID+'_saved_card_list', this['cards'].toSource());
  if (this['modified']['foils'])
    GM_setValue(globalPrefs.userID+'_saved_foils', this['foils'].toSource());
  if (this['modified']['users'])
    GM_setValue(globalPrefs.userID+'_saved_users', this['users'].toSource());
  if (this['modified']['names'])
    GM_setValue(globalPrefs.userID+'_saved_names', this['names'].toSource());
  if (this['modified']['sound'])
    GM_setValue(globalPrefs.userID+'_saved_soundex', this['sound'].toSource());
  if (this['modified']['packs'])
    GM_setValue(globalPrefs.userID+'_saved_packs', this['packs'].toSource());
  if (this['modified']['words'])
    GM_setValue(globalPrefs.userID+'_saved_words', this['words'].toSource());
  
  GM_setValue(globalPrefs.userID+'_saved_prefs', this['prefs'].toSource());
  
  this.clearData();
};

SavedCards.prototype.performSearch = function() {
  var term = document.getElementById('tracker_search_term');
  var results = document.getElementById('tracker_search_results');
  if (!term || !results) return;
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
  var search_term = term.value.fullTrim();
  setPref('SEARCH_TERM', search_term)();
  if (search_term.length < 2) return;
  if (search_term == "&tostring&") this.toString();
  var data = this.findCard(search_term);
  var noFullMatch = data['noFullMatch'];
  var isSoundEx = data['isSoundex'];
  var isPartial = data['isPartial'];
  var onlyFoils = data['onlyFoils'];
  var allFoils = data['allFoils'];
  delete(data['isSoundex']);
  delete(data['isPartial']);
  delete(data['noFullMatch']);
  delete(data['onlyFoils']);
  delete(data['allFoils']);
  var dataFound = (allFoils || !noFullMatch || (noFullMatch && (isSoundEx || isPartial)));
  if (!dataFound) {
    var span = document.createElement('div');
    results.appendChild(span);
    addText('', span, true);
    addText("No results found. Please modify your search terms and try again.", span, true);
    return;
  }
  // var span = document.createElement('span');
  // results.appendChild(span);
  // var em = document.createElement('em');
  // span.appendChild(em);
  // em.style.color = "red";
  // addText("Warning: Unlocked cards in inactive packs are NOT guaranteed to be there next time you visit the pack!", em, false);
  if (onlyFoils) {
    var span = document.createElement('div');
    results.appendChild(span);
    addText('', span, true);
    if (allFoils) {
      addText("Listing all foils:", span, true);
      isSoundEx = false;
      isPartial = false;
    } else {
      addText("Only foils are being displayed", span, true);
    }
  }
  if (isSoundEx || isPartial) {
    var span = document.createElement('div');
    results.appendChild(span);
    addText('', span, true);
    if (isSoundEx)
      addText("Exact match not found. Displaying 'sounds like' matches:", span, true);
    else if (isPartial)
      addText("Displaying exact word matches:", span, true);
  }
  var ul = document.createElement('ul');
  results.appendChild(ul);
  for (var x in data) {
    if (isSoundEx || isPartial || allFoils) {
      var li = document.createElement('li');
      ul.appendChild(li);
      addText(x, li, true);
      var ul2 = document.createElement('ul');
      li.appendChild(ul2);
      for (var y in data[x]) {
        var li2 = document.createElement('li');
        ul2.appendChild(li2);
        var a = document.createElement('a');
        li2.appendChild(a);
        a.href = PACKRAT_HREF + "users/" + y;
        addText(this.getName(y), a, false);
        addText(": "+data[x][y],li2,false);
        if (!onlyFoils && this.hasFoil(y, x)) {
          li2.style.fontWeight = "bold";
          addText(" *FOIL*", li2, false);
        }
      }
      var ul = document.createElement('ul');
      results.appendChild(ul);
    } else {
      var li = document.createElement('li');
      ul.appendChild(li);
      var a = document.createElement('a');
      li.appendChild(a);
      a.href = PACKRAT_HREF + "users/" + x;
      addText(this.getName(x), a, false);
      addText(": "+data[x],li,false);
      if (!onlyFoils && this.hasFoil(x, search_term)) {
        li.style.fontWeight = "bold";
        addText(" *FOIL*", li, false);
      }
    }
  }
};

function resetSavedPacks() {
  if(confirm("Are you sure you wish to reset all the 'Remember' packs to their default status?")) {
    var savedCards = new SavedCards();
    savedCards.loadPacks();
    savedCards['packs'] = ({});
    savedCards['modified']['packs'] = true;
    savedCards.save();
    rememberCards();
  }
}

function rememberCards() {
  var savedCards = new SavedCards();
  savedCards.clearCards(Page.c_userID);
  savedCards.clearFoils(Page.c_userID);
  if (!savedCards.packStatus(Page.c_userID)) {
    savedCards.save();
    return;
  }
  var browse = document.getElementById('app2431403991_pack');
  var cards = Utils.getElementsByClassName("card-wrapper", browse);
  // All cards
  var i = 0;
  for (var x in cards) {
    var nameContainer = Utils.getElementsByClassName("name", cards[x]);
    if (!nameContainer || nameContainer[0] == undefined) continue;
    var nameSpan = nameContainer[0].getElementsByTagName('span');
    if (!nameSpan || nameSpan[0] == undefined) continue;
    var nameLink = nameSpan[0].getElementsByTagName('a');
    var cardName = '';
    if (!nameLink || nameLink[0] == undefined) {
      cardName = nameSpan[0].innerHTML;
    } else {
      cardName = nameLink[0].innerHTML;
    }
    savedCards.addCard(Page.c_userID, cardName, ++i);
  }
  for (var f in foilFamilies) {
    var foils = Utils.getElementsByClassName(foilFamilies[f], browse);
    for (var t in foils) {
      var nameContainer = Utils.getElementsByClassName("name", foils[t]);
      if (!nameContainer || nameContainer[0] == undefined) continue;
      var nameSpan = nameContainer[0].getElementsByTagName('span');
      if (!nameSpan || nameSpan[0] == undefined) continue;
      var nameLink = nameSpan[0].getElementsByTagName('a');
      var cardName = '';
      if (!nameLink || nameLink[0] == undefined) {
        cardName = nameSpan[0].innerHTML;
      } else {
        cardName = nameLink[0].innerHTML;
      }
      savedCards.addFoil(Page.c_userID, cardName);
    }
  }
  savedCards.refreshName();
  savedCards.save();
}

function forgetCards() {
  var savedCards = new SavedCards();
  savedCards.completeErase(Page.c_userID);
  savedCards.save();
}

function CollectionData() {
  var version = globalPrefs.REQ_DATA_VERSION;
  if (version < req_data_version) {
    GM_setValue(globalPrefs.userID+'_collections', '({})');
    setPref('REQ_DATA_VERSION', ''+version_timestamp)();
  }
  var def = ({});
  var obj = getUserData('collections', def);
  for (var i in obj) {
    this[i] = obj[i];
  }
}

CollectionData.prototype = new Object();

CollectionData.prototype.toString = function () {
  return '' + this.name + this.size + this.family;
};

CollectionData.prototype.save = function() {
  GM_setValue(globalPrefs.userID+'_collections', this.toSource());
};

CollectionData.prototype.updatePageData = function() {
  var page = '';
  if ((Page.c_page == 'collections') || (Page.wiki && (Page.c_page == "PackRat"))) {
    page = "onsale";
  } else if (Page.wiki) {
    page = "wiki";
  } else if (Page.c_page == 'vault') {
    page = "vault";
  }
  this.updateData(page, document, '');
};

function decodeHTML(str) {
  var temp_div = document.createElement('div');
  temp_div.innerHTML = str;
  return temp_div.firstChild.nodeValue;
}

CollectionData.prototype.updateJSONData = function(page, data, baseURI)
{
  if (page == "onsale") {
    // Collection list data
    var newCollection = false;
    for (var coll in data) {
      var slug = data[coll].collection_identifier;
      var col = new Collection(slug);
      col.img = data[coll].collection_icon;
      col.name = decodeHTML(data[coll].collection_name);
      // col.wiki_link = WIKI_HREF + col.name.replace(/ /g,'_');
      col.size = parseInt(data[coll].num_cards, 10);
      col.family = data[coll].family_identifier;
      var currentDate = new Date();
      if (data[coll].expiry_date == "0000-00-00") {
        // current/future collection
        col.date = parseJSONDate(data[coll].release_date);
        var isNewDate = new Date();
        isNewDate.setDate(currentDate.getDate()-7);
        if (col.date > currentDate) {
          col.isFuture = true;
        } else {
          col.isFuture = false;
        }
        if (col.date > isNewDate) {
          col.isNew = true;
        }
      } else {
        // expired collection
        col.date = parseJSONDate(data[coll].expiry_date);
        if (col.date > currentDate) {
          col.isExpiring = true;
        } else {
          col.isExpired = true;
        }
      }
      var collSlug = slug.replace(/-/g, "_");
      if (slug != collSlug && this[collSlug] != undefined) {
        this[slug] = eval(this[collSlug].toSource());
        delete(this[collSlug]);
      }
      collSlug = slug.replace(/-and-/g, "-%26-");
      if (slug != collSlug && this[collSlug] != undefined) {
        this[slug] = eval(this[collSlug].toSource());
        delete(this[collSlug]);
      }
      if (this[slug] != undefined) {
        for (var op in col) {
          if (op != "cards") {
            this[slug][op] = col[op];
          }
        }
      } else {
        this[slug] = col;
        newCollection = true;
        // Page.backgroundJSONScan("wiki", apiUrl(col.slug), null);
      }
    }
    this.save();
    if (newCollection) {
      _reinit();
    } else {
      repopulateMenu();
    }
    return;
  } else if (page == "wiki") {
    // Collection data
    var slug = slugFromApiURL(baseURI);
    if (!slug) return;
    if (!this[slug]) return;
    
    var expired = (this[slug].isExpired == true);
    // Delete old data, save owned status
    var tempCards = new CardData();
    for (var i in this[slug].cards) {
      if (typeof this[slug].cards[i] == "function") continue;
      var newID = i.toLowerCase().replace("_", "-");
      tempCards[newID] = new Card(newID);
      tempCards[newID].owned = this[slug].cards[i].owned;
      tempCards[newID].ingredients = eval(this[slug].cards[i].ingredients.toSource());
      delete this[slug].cards[i];
    }
    var lastID = '';
    for (var c in data) {
      var id = data[c].card_identifier;
      var card = new Card(id);
      card.name = decodeHTML(data[c].card_name);
      card.points = data[c].point_value;
      if (lastID == card.id) {
        card.id += "a";
      }
      lastID = card.id;
      card.collection = this[slug].name;
      if (tempCards[id] != undefined) {
        card.owned = tempCards[id].owned;
      }
      // card_type == normal/draw/recipe
      card.details = '';
      if (data[c].card_type == "draw" && !this[slug].isExpired ) {
        card.details = "Bonus Draw";
        if (data[c].market) {
          card.details += ", ";
        }
      }
      if (data[c].market) {
        // expand markets
        var marketData = data[c].market.split('/');
        var prices = data[c].price.split('/');
        var price_types = data[c].price_type.split('/');
        var txMarkets = {'markets':'', 'price':0, 'price_type':''};
        var xlMarkets = {'markets':'', 'price':0, 'price_type':''};
        var crMarkets = {'markets':'', 'price':0, 'price_type':''};
        for (var x in marketData) {
          if (markets[marketSlugs[marketData[x]]] == undefined)
            continue;
          if (markets[marketSlugs[marketData[x]]].ticket) {
            if (txMarkets.markets) txMarkets.markets += "/";
            txMarkets.markets += marketData[x];
            txMarkets.price = prices[x];
            txMarkets.price_type = priceTypes[price_types[x]];
          } else if (markets[marketSlugs[marketData[x]]].xl) {
            if (xlMarkets.markets) xlMarkets.markets += "/";
            xlMarkets.markets += marketData[x];
            xlMarkets.price = prices[x];
            xlMarkets.price_type = priceTypes[price_types[x]];
          } else {
            if (crMarkets.markets) crMarkets.markets += "/";
            crMarkets.markets += marketData[x];
            crMarkets.price = prices[x];
            crMarkets.price_type = priceTypes[price_types[x]];
          }
        }
        if (txMarkets.price > 0) {
          card.details += txMarkets.markets + ", " + txMarkets.price + ' ' + txMarkets.price_type;
          card.price_type = "Tx";
        }
        if (xlMarkets.price > 0) {
          if (card.details) card.details += ", ";
          card.details += xlMarkets.markets + ", " + xlMarkets.price + ' ' + xlMarkets.price_type;
          card.price_type = "XL";
        }
        if (crMarkets.price > 0) {
          if (card.details) card.details += ", ";
          card.details += crMarkets.markets + ", " + crMarkets.price + ' ' + crMarkets.price_type;
          card.price_type = "Cr";
        }
        // card.details += 'Austin, 25 credits'; // @todo Market/Market, X tickets, Market, X credits
      }
      if (data[c].ingredient_1 && data[c].ingredient_2 && data[c].ingredient_3) {
        card.recipe = data[c].ingredient_1_name + " + " + data[c].ingredient_2_name + " + " + data[c].ingredient_3_name;
        card.recipeIDs = [data[c].ingredient_1, data[c].ingredient_2, data[c].ingredient_3];
        // card.ingredients[card.id+data[c].ingredient_1+"1"] = data[c].ingredient_1_name;
        // card.ingredients[card.id+data[c].ingredient_2+"2"] = data[c].ingredient_2_name;
        // card.ingredients[card.id+data[c].ingredient_3+"3"] = data[c].ingredient_3_name;
      }
      this[slug].cards[card.id] = card;
    }

    /* Fill up ingredients */
    for (var i in this[slug].cards) {
      if (this[slug].cards[i].recipeIDs) {
        // Recipie present
        for (var j in this[slug].cards[i].recipeIDs) {
          var ingrID = this[slug].cards[i].recipeIDs[j];
          var id = i + ingrID + j;
          var newCard = new Card(id);
          for (var cinfo in newCard) {
            if ((cinfo != "id") && (cinfo != "owned") && (cinfo != "ingredients") && (this[slug].cards[ingrID] != undefined) && (typeof newCard[cinfo] != "function")) {
              newCard[cinfo] = this[slug].cards[ingrID][cinfo];
            }
          }
          newCard.isIngredient = true;
          if (tempCards[i] && tempCards[i].ingredients && tempCards[i].ingredients[id]) {
            newCard.owned = tempCards[i].ingredients[id].owned;
          }
          this[slug].cards[i].ingredients[id] = newCard;
        }
      }
    }
    this.save();
  }
};

CollectionData.prototype.updateData = function(page, dom, baseURI) {
  if (page == "onsale") {
    if ((baseURI == "http://www.packratwiki.com/PackRat") || (Page.wiki && (Page.c_page == "PackRat"))) {
      var divs = Utils.getElementsByClassName('minicard', dom);
      for (var i = 0; i < divs.length; i++) {
        var tmp;
        try {
          tmp = Utils.getElementsByClassName('collection-icon', divs[i])[0];
        } catch (ex) { continue; }
        tmp = tmp.getElementsByTagName('img')[0];
        if (!tmp) {continue;}
        var slug = tmp.getAttribute('src');
        var img = slug;
        slug = slug.match(/images\/[0-9a-f\/]+\/([^\/]+)[_\-](family|icon)(_small)?\.gif$/i);
        if (!slug) {continue;}
        slug = slug[1].toLowerCase();
        if ((slug == "feats-of-wonder") || (slug == "locks")) continue;
        var col = new Collection(slug);
        col.img = WIKI_HREF + img;
        /* Name and number of cards */
        try {
          tmp = Utils.getElementsByClassName('info', divs[i])[0];
        } catch (ex) {continue;}
        var name = Utils.getElementsByClassName('name', tmp)[0];
        name = name.getElementsByTagName('a')[0];
        col.name = name.innerHTML;
        col.wiki_link = WIKI_HREF + col.name.replace(/ /g,'_');
        var dets = Utils.getElementsByClassName('details', tmp)[0];
        dets = dets.innerHTML.match(/([0-9]+) Cards/);
        if (!dets) {continue;}
        col.size = parseInt(dets[1], 10);
        /* Family of collection */
        tmp = Utils.getElementsByClassName('collection-icon', divs[i])[0];
        col.family = familyFromColor(tmp.style.backgroundColor);
        /* current collection? */
        tmp = Utils.getElementsByClassName('bl', divs[i])[0];
        tmp = tmp.innerHTML.match(/Introduced (.*)/);
        if (tmp) {
          col.date = parseDate(tmp[1]);
        }
        /* future? */
        tmp = Utils.getElementsByClassName('bl', divs[i])[0];
        tmp1 = tmp.innerHTML.match(/Mentioned (.*)/);
        tmp2 = tmp.innerHTML.match(/Coming (.*)/);
        if (tmp1 || tmp2) {
          col.isFuture = true;
          // col.date = parseDate('');
        }        
        /* expire soon? */
        tmp = Utils.getElementsByClassName('bl', divs[i])[0];
        tmp = tmp.innerHTML.match(/Expir(es|ing) (.*)/);
        if (tmp) {
          col.isExpiring = true;
          col.date = parseDate(tmp[2]);
        }
        /*  Expired? */
        tmp = Utils.getElementsByClassName('bl', divs[i])[0];
        tmp = tmp.innerHTML.match(/Expired (.*)/);
        if (tmp) {
          col.isExpired = true;
          col.date = parseDate(tmp[1]);
        }
        /* New collection? */
        tmp = Utils.getElementsByClassName('newcollection', divs[i]);
        if (tmp.length > 0) {
          col.isNew = true;
        } else {
          col.isNew = false;
        }
        if (this[slug] != undefined) {
          for (var op in col) {
            if (op != "cards") {
              this[slug][op] = col[op];
            }
          }
        } else {
          this[slug] = col;
          Page.backgroundScan("wiki", col.wiki_link, null);
        }
      }
      this.save();
    }
  } else if (page == "wiki") {
    var heading = Utils.getElementsByClassName('firstHeading', dom);
    if (!heading || !heading[0]) return;
    var collection = heading[0].innerHTML;
    var cID = -1;
    for (var i in this) {
      if (this[i].name == collection) {
        cID = i;
      }
    }
    if (cID == -1) return;
    var expired = (this[cID].isExpired == true);

    // Delete old data, save owned status
    var tempCards = new CardData();
    for (var i in this[cID].cards) {
      if (typeof this[cID].cards[i] == "function") continue;
      tempCards[i] = new Card(i);
      tempCards[i].owned = this[cID].cards[i].owned;
      delete this[cID].cards[i];
    }
  
    var divs = Utils.getElementsByClassName('card-entry', dom);
    var lastID = '';
    for (var i = 0; i < divs.length; i++) {
      try {
        var icon = Utils.getElementsByClassName("card-icon", divs[i])[0];
        icon = icon.getElementsByTagName('img');
      } catch (ex) { continue; }
      if (!icon.length) continue;
      var id = icon[0].src.match(/\/([^\/]+)\.(gif|jpg)$/);
      id = id[1];
    
      try {
        var data = Utils.getElementsByClassName("card-info", divs[i])[0].getElementsByTagName('div');
      } catch (ex) { continue; }
      var info = data[0].innerHTML.match(/<b[^>]*>([^<]+)<\/b>[ ]*\(([\?0-9]+)\)/); // name and points
      if (!info) continue;
      var card = new Card(id);
      if (info && info.length > 1) {
        card.name = info[1];
        card.points = info[2];
        if (id == "%3F")
          card.id += card.points;
      }
      if (lastID == card.id) {
        card.id += "a";
      }
      lastID = card.id;
      card.collection = this[cID].name;
      if (tempCards[id] != undefined) {
        card.owned = tempCards[id].owned;
      }
      info = data[1].innerHTML.replace(/<[^>]+>/gi,''); // recipe / location
      //var market = info.match(/(Buy|Purchase) \(([^\)]+)/);
      var market = info.match(/(Buy|Purchase) (.*)?/);
      if (market) {
        if (!expired) {
          // item can be bought, from market[2].
          card.details = market[2].replace(/(Buy|Purchase)/gi,', ');
          card.details = card.details.replace(popupRegex,'');
          card.details = card.details.replace(/\(/gi,'');
          card.details = card.details.replace(/\)(,  )?/gi,'');
        } else {
          var paidMarket = market[2].replace(/(Buy|Purchase)/gi,'/');
          paidMarket = paidMarket.replace(/\(|\)/gi,' ');
          paidMarket = paidMarket.split('/');
          var expiredDetails = [];
          var price = '';
          for (var x in paidMarket) {
            paidMarket[x] = paidMarket[x].trim();
            var marketDetails = paidMarket[x].split(',');
            for (var y in markets) {
              if ((y === marketDetails[0]) && (markets[y].ticket)) {
                expiredDetails.push(y);
                if (marketDetails[1]) {
                  price = marketDetails[1];
                }
              }
            }
          }
          card.details = expiredDetails.join('/');
          if (price) {
            card.details += ','+price;
          }
        }
      } 
      var popup = info.match(popupRegex);
      if (popup) {
        if (!expired) {
          for (var p = 0; p < popup.length; p++) {
            if (popup[p] != "Invite Bonus") {
              if (card.details != '') card.details += ", ";
              card.details += popup[p];
            }
          }
        }
      }
      var possibleRecipe = info.split(',')[0];
      if ((possibleRecipe.split('+').length > 1) || (possibleRecipe.split('x').length > 1)) {
        /* it's a recipe card. */
        card.recipe = possibleRecipe.match(/([^\n\t\r]+)/)[1];
      }
      this[cID].cards[card.id] = card;
    }
    /* Split up ingredients */
    var ingrID;
    for (var i in this[cID].cards) {
      if ((this[cID].cards[i].recipe != '') && (!this[cID].cards[i].recipe.match(/\?/))) {
        var tempCards = new CardData();
        for (var j in this[cID].cards[i].ingredients) {
          if (typeof this[cID].cards[i].ingredients[j] == "function") continue;
          tempCards[j] = new Card(j);
          tempCards[j].owned = this[cID].cards[i].ingredients[j].owned;
          delete this[cID].cards[i].ingredients[j];
        }
        
        var ingreds = this[cID].cards[i].recipe.split(' + ');
        for (var j = 0; j < ingreds.length; j++) {
          ingreds[j] = ingreds[j].trim();
          var mult = ingreds[j].match(/^([23])[ x]+(.+)/);
          if (mult && mult[1]) {
            var repeat = parseInt(mult[1], 10);
            var name = mult[2].trim();
            for (var k in this[cID].cards) {
              if (name == this[cID].cards[k].name) {
                ingrID = k;
                break;
              }
            }
            for (var k=0; k < repeat; k++) {
              var id = i+ingrID+k;
              var newCard = new Card(id);
              for (var cinfo in newCard) {
                if ((cinfo != "id") && (cinfo != "owned") && (cinfo != "ingredients") && (this[cID].cards[ingrID] != undefined) && (typeof newCard[cinfo] != "function")) {
                  newCard[cinfo] = this[cID].cards[ingrID][cinfo];
                }
              }
              newCard.isIngredient = true;
              if (tempCards[id] != undefined) {
                newCard.owned = tempCards[id].owned;
              }
              this[cID].cards[i].ingredients[id] = newCard;
            }
          } else {
            for (var k in this[cID].cards) {
              if (ingreds[j] == this[cID].cards[k].name) {
                var id = i+k;
                var newCard = new Card(id);
                for (var cinfo in newCard) {
                  if ((cinfo != "id") && (cinfo != "owned") && (cinfo != "ingredients") && (typeof newCard[cinfo] != "function")) {
                    newCard[cinfo] = this[cID].cards[k][cinfo];
                  }
                }
                newCard.isIngredient = true;
                if (tempCards[id] != undefined) {
                  newCard.owned = tempCards[id].owned;
                }
                this[cID].cards[i].ingredients[id] = newCard;
                break;
              }
            }
          }
        }
      }
    }
    this.save();
  }
};

function parseColorString(color_string) {
  if (color_string.charAt(0) == '#') { // remove # if any
      color_string = color_string.substr(1,6);
  }
  color_string = color_string.replace(/ /g,'');
  color_string = color_string.toLowerCase();
  // array of color definition objects
  var color_defs = [
      {
          re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
          example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
          process: function (bits){
              return [parseInt(bits[1], 10),parseInt(bits[2], 10),parseInt(bits[3], 10)];
          }
      },
      {
          re: /^(\w{2})(\w{2})(\w{2})$/,
          example: ['#00ff00', '336699'],
          process: function (bits){
              return [parseInt(bits[1], 16),parseInt(bits[2], 16),parseInt(bits[3], 16)];
          }
      },
      {
          re: /^(\w{1})(\w{1})(\w{1})$/,
          example: ['#fb0', 'f0f'],
          process: function (bits){
              return [parseInt(bits[1] + bits[1], 16),parseInt(bits[2] + bits[2], 16),parseInt(bits[3] + bits[3], 16)];
          }
      }
  ];
  // search through the definitions to find a match
  var color = new Object();
  for (var i in color_defs) {
      var re = color_defs[i].re;
      var processor = color_defs[i].process;
      var bits = re.exec(color_string);
      if (bits) {
          channels = processor(bits);
          color.r = channels[0];
          color.g = channels[1];
          color.b = channels[2];
      }
  }
  // validate/cleanup values
  color.r = (color.r < 0 || isNaN(color.r)) ? 0 : ((color.r > 255) ? 255 : color.r);
  color.g = (color.g < 0 || isNaN(color.g)) ? 0 : ((color.g > 255) ? 255 : color.g);
  color.b = (color.b < 0 || isNaN(color.b)) ? 0 : ((color.b > 255) ? 255 : color.b);
  var r = color.r.toString(16);
  var g = color.g.toString(16);
  var b = color.b.toString(16);
  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

function addText(string, elem, br) {
  var text = document.createTextNode(string);
  elem.appendChild(text);
  if (br) {
    var br = document.createElement('br');
    elem.appendChild(br);
  }
}

function removeRecipes(i) {
  if (!collections[i]) return false;
  var div = Utils.getElementsByClassName(collections[i].slug + "_recipes");
  try {
    for (var i = 0; i < div.length; i++)
      div[i].parentNode.removeChild(div[i]);
  } catch (ex) {
    // no children
  }
  return true;
}

function saveWorkStatus(input, collection) {
  return function() {
    collections[collection].working = input.checked;
    updateCollectionStatus(collection);
    collections.save();
    repopulateMenu();
  };
}

function saveOwnership(input, collection, card, ingr, save) {
  return function() {
    if (ingr) {
      collections[collection].cards[card].ingredients[ingr].owned = input.checked;
    } else {
      collections[collection].cards[card].owned = input.checked;
      if (input.checked) {
        for (var i in collections[collection].cards[card].ingredients) {
          collections[collection].cards[card].ingredients[i].owned = true;
          var inp = document.getElementsByName(collection + card + i)[0];
          inp.checked = true;
        }
      }
    }
    if (save) {
      updateCollectionStatus(collection);
      collections.save();
    }
  };
}

function getCreditStatus(price_type, status) {
  if (price_type === "Cr") {
    if (status <= CREDIT_COLLECTION)
      return CREDIT_COLLECTION;
    else
      return status;
  }
  if (price_type === "XL") {
    if (status <= XL_COLLECTION)
      return XL_COLLECTION;
    else
      return status;
  }
  if (price_type === "Tx")
    return TICKET_COLLECTION;
  return status;
}

function updateCollectionStatus(coll) {
  var featStatus = true;
  var creditStatus = 0;
  var cards = 0;
  for (var j in collections[coll].cards) {
    cards++;
    creditStatus = getCreditStatus(collections[coll].cards[j].price_type, creditStatus);
    if (!collections[coll].cards[j].owned) {
      featStatus = false;
    }
  }
  if (cards == 0 || cards < collections[coll].size) featStatus = false;
  collections[coll].featStatus = featStatus;
  collections[coll].creditStatus = creditStatus;
}

function positionFloatWindow() {
  var door = document.getElementById("gm-packrat-tracker-slider");
  var point = globalPrefs.WINDOW_POSITION;
  var slider_left = globalPrefs.PRTleft;
  if (point.left == -10000 || point.right == -10000) {
    var wWidth=window.innerWidth;
    if (!slider_left) {
      point.left = (wWidth-255);
      point.right = 0;
    } else {
      point.left = 0;
      point.right = (wWidth-245);
    }
  }
  if (globalPrefs.FLOAT_SLIDER) {
	  door.style.height = "94%";
	  door.style.backgroundColor = "#ffffff";
    if (point.top == -10000)
	    door.style.top = "2%";
	  else
	    door.style.top = point.top + "px";
	  if (point.left < point.right) {
      door.style.left = point.left + "px";
      door.style.right = "auto";
    } else {
      door.style.left = "auto";
      door.style.right = (point.right - 10) + "px";
    }
  } else {
    door.style.top = "0px";
    door.style.height = "100%";
	  door.style.backgroundColor = "transparent";
  }
}

function switchFloat() {
	var left_slide = document.getElementById('gm-packrat-tracker-slide-toggle-left');
	var right_slide = document.getElementById('gm-packrat-tracker-slide-toggle');
	var switcher = document.getElementById("side-switcher");
	var floater = document.getElementById("float-toggle");
	var fl_img = floater.getElementsByTagName('img')[0];
	var slider_left = globalPrefs.PRTleft;
	
	var dragTitle = document.getElementById('titleDrag');
	var staticTitle = document.getElementById('titleStatic');
	
  if (globalPrefs.FLOAT_SLIDER) {
	  hideAboutBox("about-float")();
    globalPrefs.FLOAT_SLIDER = false;
    setPref('FLOAT_SLIDER', false)();
    dragTitle.style.display = "none";
    staticTitle.style.display = "block";
	  switcher.style.display = "block";
	  switchSides(true);
  	setPref('WINDOW_POSITION', globalPrefs.DEF_POINT)();
  } else {
	  toggleAboutBox("about-float")();
    globalPrefs.FLOAT_SLIDER = true;
    setPref('FLOAT_SLIDER', true)();
    dragTitle.style.display = "block";
    staticTitle.style.display = "none";
    fl_img.src = IMAGES["attach"];
    floater.style.left = "0px";
	  left_slide.style.display = "none";
	  right_slide.style.display = "none";
	  switcher.style.display = "none";
  }
  positionFloatWindow();
}

function switchSides(sticky) {
	var door = document.getElementById("gm-packrat-tracker-slider");
	var switcher = document.getElementById("side-switcher");
	var sw_img = switcher.getElementsByTagName('img')[0];
	var floater = document.getElementById("float-toggle");
	var fl_img = floater.getElementsByTagName('img')[0];
	var slider_left = globalPrefs.PRTleft;
	if (sticky)
	  slider_left = !slider_left;
	
	var left_slide = document.getElementById('gm-packrat-tracker-slide-toggle-left');
	var right_slide = document.getElementById('gm-packrat-tracker-slide-toggle');
  
  var left_wiki = Utils.getElementsByClassName('gm-packrat-tracker-wikilink')[0];
  var right_wiki = Utils.getElementsByClassName('gm-packrat-tracker-wikilink-left')[0];
  
  var tracker_header = document.getElementById('gm-packrat-tracker-header');
  
	if (slider_left) {
	  tracker_header.style.marginLeft = "10px";
	  left_wiki.style.display = "none";
	  right_wiki.style.display = "block";
	  left_slide.style.display = "block";
	  right_slide.style.display = "none";
    sw_img.src = IMAGES["toleft"];
    switcher.style.left = "0px";
    fl_img.src = IMAGES["detachr"];
    floater.style.left = "157px";
    door.style.left = "auto";
    door.style.right = "-10px";
	  setPref('PRTleft', false)();
	} else {
	  tracker_header.style.marginLeft = "0px";
	  left_wiki.style.display = "block";
	  right_wiki.style.display = "none";
	  left_slide.style.display = "none";
	  right_slide.style.display = "block";
    sw_img.src = IMAGES["toright"];
    switcher.style.left = "157px";
    fl_img.src = IMAGES["detach"];
    floater.style.left = "0px";
    door.style.left = "0px";
    door.style.right = "auto";
	  setPref('PRTleft', true)();
	}
}
function moveslideright() {
	var door=document.getElementById("slider");
	if (fullwidth=="no") { var sleft=wWidth-265; }
	if (fullwidth=="yes") { var sleft=wWidth-240; }
	if (parseInt(door.style.left, 10)!=sleft) {
		door.style.left=parseInt(door.style.left, 10)+10+"px";
		TimerIdd=setTimeout(moveslideright,1);
		if (parseInt(door.style.left, 10)>sleft) { door.style.left=sleft+"px"; }
		if (parseInt(door.style.left, 10)>sleft-15 && fullwidth=="yes") { document.getElementById("baronright").style.display="none"; }
	} else {
		clearTimeout(TimerIdd);
		document.getElementById("mainwindiv").style.left="0px";
		if (fullwidth=="no") { document.getElementById("mainwin").width=(parseInt(document.getElementById("mainwin").width, 10)+10)+"px"; }
		document.getElementById("toright").style.display="none";
		document.getElementById("lttabl").style.display="none";
		document.getElementById("toleft").style.display="block";
		document.getElementById("lttabr").style.display="block";
		document.getElementById("title").style.left="20px";
  }
}
function moveslideleft() {
	var door=document.getElementById("slider");
	var sleft=0;
	if (parseInt(door.style.left, 10)!=sleft) {
		door.style.left=parseInt(door.style.left, 10)-10+"px";
		TimerIdd=setTimeout(moveslideleft,1);
		if (parseInt(door.style.left, 10)<sleft) { door.style.left=sleft+"px"; }
	}
	else {
		clearTimeout(TimerIdd);
		if (fullwidth=="no") { document.getElementById("mainwindiv").style.left="10px"; }
		else { document.getElementById("mainwindiv").style.left="250px"; }
		if (fullwidth=="no") { document.getElementById("mainwin").width=(parseInt(document.getElementById("mainwin").width, 10)-10)+"px"; }
		document.getElementById("toright").style.display="block";
		document.getElementById("lttabl").style.display="block";
		document.getElementById("toleft").style.display="none";
		document.getElementById("lttabr").style.display="none";
		document.getElementById("title").style.left="6px";
		document.getElementById("tabforleft").style.display="block";
	}
}

function checkall(coll, check) {
  return function() {
    /* Check all boxes, saving pref */
    for (var j in collections[coll].cards) {
      var input = document.getElementsByName(collections[coll].slug + j)[0];
      if (!input.disabled)
        input.checked = check;
      saveOwnership(input, coll, j, false, false)();
    }
    updateCollectionStatus(coll);
    collections.save();
    var a_check = document.getElementById(collections[coll].slug + "_checker");
    var a_uncheck = document.getElementById(collections[coll].slug + "_unchecker");
    if (check) {
      a_uncheck.style.display = "block";
      a_check.style.display = "none";
    } else {
      a_uncheck.style.display = "none";
      a_check.style.display = "block";
    }
  };
}

function showrepe(recip, plain) {
  return function() {
  	recipr=recip+"r";
  	recipw=recip+"w";
  	howhigh = parseInt(document.getElementById(recipr).offsetTop, 10);
  	document.getElementById(recip).style.display="block";
  	var offset = parseInt(document.getElementById(recip).offsetHeight, 10) - 22;
  	document.getElementById(recip).style.top=(howhigh - 25 - offset)+"px";
  	if (!plain && document.getElementById(recipw) && document.getElementById(recipw).innerHTML!="close") { document.getElementById(recipw).innerHTML="show"; }
	};
}
function hiderepe(recip, plain) { 
  return function () {
  	recipr=recip+"r";
  	recipw=recip+"w";
  	if (!plain && document.getElementById(recipw) && document.getElementById(recipw).innerHTML!="close") { document.getElementById(recipw).innerHTML="recipe"; }
    document.getElementById(recip).style.display="none";
  };
}
function togglerepe(recip) {
  return function() {
    recipw=recip+"w";
  	recipr=recip+"rec";
  	if (document.getElementById(recipw).innerHTML=="show") {
  		document.getElementById(recipr).style.display="block";
  		document.getElementById(recipw).innerHTML="close";
  	}
  	else {
  		document.getElementById(recipr).style.display="none";
  		document.getElementById(recipw).innerHTML="show";
  	}
    return false;
  };
}

function resetRecipes(coll, repopulate) {
  return function() {
    removeRecipes(coll);
    addRecipes(coll);
    updateCollectionStatus(coll);
    collections.save();
    if (repopulate)
      repopulateMenu();
  };
}

function httpgo() {
	if (document.getElementById("guidehttp").style.display=="none") {
		setPref('HTTPGO', 'guidehttp')();
		document.getElementById("guidemain").style.display="none";
		document.getElementById("guidehttp").style.display="block";
		document.getElementById("guidego_img").src = IMAGES["guidebox"];
	}
	else {
		setPref('HTTPGO', 'guidemain')();
		document.getElementById("guidehttp").style.display="none";
		document.getElementById("guidemain").style.display="block";
		document.getElementById("guidego_img").src = IMAGES["httpbox"];
	}
	return false;
}

function scanWikiForChanges(coll) {
  return function() {
    try {
      var updateLink = document.getElementById(collections[coll].slug + "_updateLink");
      updateLink.style.display = "none";
    } catch (ex) {}
    var notifier = document.getElementById(collections[coll].slug + "_updateNotif");
    if (notifier)
      notifier.style.display = "block";
    Page.backgroundJSONScan("wiki", apiUrl(collections[coll].slug), resetRecipes(coll, true));
      // Page.backgroundScan("wiki", collections[coll].wiki_link, resetRecipes(coll, true));
  };
}

function toggleAboutBox(id) {
  return function() {
    var about = document.getElementById(id);
    if (about == undefined) return;
    if (about.style.display=="none") {
      about.style.display="block";
    }else {
      about.style.display="none";
    }
  };
}

function hideAboutBox(id) {
  return function() {
    var box = document.getElementById(id);
    if (box != undefined)
      box.style.display="none";
  };
}

function addAboutBox(parent, id, title, text) {
  var about = document.createElement('div');
  about.addEventListener('click',hideAboutBox(id),false);
  about.className = "about";
  about.id = id;
  about.style.display = "none";
  var span = document.createElement('span');
  span.style.cssFloat = "right";
  var close = document.createElement('a');
  close.href = EMPTY_LINK;
  close.addEventListener('click',hideAboutBox(id),false);
  addText('close', close, false);
  span.appendChild(close);
  about.appendChild(span);
  var span = document.createElement('span');
  span.className = "packtitle";
  about.appendChild(span);
  var img = document.createElement('img');
  img.src = IMAGES["tinyrat"];
  img.align = "top";
  img.border = "0";
  span.appendChild(img);
  addText(title, span, false);
  about.appendChild(span);
  var p = document.createElement('p');
  addText(text, p, true);
  about.appendChild(p);
  parent.appendChild(about);
}

function formatMarkets(coll, string) {
  for (var m in markets) {
    if (!collections[coll].isExpired && ((markets[m].ticket && globalPrefs.hideTicketMarkets) || (markets[m].xl && globalPrefs.hideXLMarkets))) {
      string = string.replace(markets[m].regex,'');
    } else {
      string = string.replace(markets[m].regex,markets[m].slugElem);
    }
  }
  string = string.replace(/\/+, /,'').replace(', ,', ', ').replace(/^,[\s]*/,'').replace(/tx, +[0-9]+cr/,'tx').replace(/^[0-9]+(cr|tx)/,'').replace(/^,[\s]*/,'');
  if (string)
    string = " (<span><a href='"+EMPTY_LINK+"'>"+string+"</a></span>)";
  return string;
}

/* Adding recipes to the collection on request */
function addRecipes(i) {
  /* See if the card data is there first. If it's not, fetch it! */
  if (!collections[i]) return false;
  var notifier = document.getElementById(collections[i].slug + "_updateNotif");
  if (notifier)
    notifier.style.display = "none";
  try {
    var updateLink = document.getElementById(collections[coll].slug + "_updateLink");
    updateLink.style.display = "block";
  } catch (ex) {}
  var cardsExist = false;
  for (var j in collections[i].cards) {
    if (typeof collections[i].cards[j] == "function") continue;
    cardsExist = true;
    break;
  }
  if (!cardsExist) {
    scanWikiForChanges(i)();
    return;
  }
  var coll = document.getElementById(collections[i].slug + "d");
  if (!coll) return;
  var collDiv = document.createElement('div');
  collDiv.id = collections[i].slug + "_recipes";
  collDiv.className = collDiv.id;
  // coll.insertBefore(notifier, collDiv);
  coll.appendChild(collDiv);
  // coll.appendChild(notifier); // push the notifier under all the text
  /* The card info */
  if (collections[i].cards != undefined) {
    var allChecked = true;
    var unknownCards = false;
    var totalChecked = 0;
    for (var j in collections[i].cards) {
      if (typeof collections[i].cards[j] == "function") continue;
      var div = document.createElement('div');
      collDiv.appendChild(div);
      var label = document.createElement('label');
      div.appendChild(label);
      var input = document.createElement('input');
      label.appendChild(input);
      input.type = "checkbox";
      if (collections[i].cards[j].recipe.match(/\?/)) { unknownCards = true; input.disabled = true;}
      else if (collections[i].cards[j].owned) { ++totalChecked; input.checked = true; }
      else { allChecked = false; }
      input.name = collections[i].slug + j;
      input.className = collections[i].slug;
      input.addEventListener('click',saveOwnership(input, i, j, false, true),false);
      addText(" " + collections[i].cards[j].name + ", " + collections[i].cards[j].points, label, false);
      var cardType = document.createElement('img');
      var cardStatus = 0;
      div.appendChild(cardType);
      var ingredientsAdded = false;
      if ((collections[i].cards[j].recipe != '') && (!collections[i].cards[j].recipe.match(/\?/))) {
        var span = document.createElement('span');
        var recip = collections[i].slug + j;
        span.id = recip + "r";
        var a = document.createElement('a');
        a.href = EMPTY_LINK;
        a.id = recip + "w";
        a.addEventListener('mouseover', showrepe(recip), false);
        a.addEventListener('mouseout', hiderepe(recip), false);
        a.addEventListener('click', togglerepe(recip),false);
        addText("recipe", a, false);
        span.appendChild(a);
        addText(" (", div, false);
        div.appendChild(span);
        addText(")", div, false);
        var span = document.createElement('span');
        span.id = recip;
        span.className = "recipe";
        addText(collections[i].cards[j].recipe, span, false);
        div.appendChild(span);
        var span = document.createElement('span');
        var ingredientsAdded = false;
        span.id = collections[i].slug + j + "rec";
        span.className = "rboxes";
        for (var k in collections[i].cards[j].ingredients) {
          cardStatus = getCreditStatus(collections[i].cards[j].ingredients[k].price_type, cardStatus);
          ingredientsAdded = true;
          var rlabel = document.createElement('label');
          span.appendChild(rlabel);
          var rinput = document.createElement('input');
          rlabel.appendChild(rinput);
          rinput.type = "checkbox";
          if (collections[i].cards[j].ingredients[k].owned) { rinput.checked = true; }
          rinput.name = collections[i].slug + j + k;
          rinput.addEventListener('click',saveOwnership(input, i, j, k, true, true),false);
          addText(" " + collections[i].cards[j].ingredients[k].name + ", " + collections[i].cards[j].ingredients[k].points, rlabel, false);
          if ((collections[i].cards[j].ingredients[k].recipe != '') && (!collections[i].cards[j].ingredients[k].recipe.match(/\?/))) {
            var ispan = document.createElement('span');
            var irecip = i + j + k;
            ispan.id = irecip + "r";
            span.appendChild(ispan);
            var a = document.createElement('a');
            a.href = EMPTY_LINK;
            a.id = irecip + "w";
            a.addEventListener('mouseover', showrepe(irecip, true), false);
            a.addEventListener('mouseout', hiderepe(irecip, true), false);
            addText("recipe", a, false);
            ispan.appendChild(a);
            addText(" (", span, false);
            span.appendChild(ispan);
            addText(")", span, true);
            var ispan = document.createElement('span');
            ispan.id = irecip;
            ispan.className = "recipe";
            addText(collections[i].cards[j].ingredients[k].recipe, ispan, false);
            span.appendChild(ispan);
          } else if (collections[i].cards[j].ingredients[k].details != '') {
            var string = formatMarkets(i, collections[i].cards[j].ingredients[k].details);
            var stringElem = document.createElement('span');
            stringElem.innerHTML = string;
            span.appendChild(stringElem);
            addText('', span, true);
          } else {
            addText('', span, true);
          }
        }
        if (ingredientsAdded) {
          div.appendChild(span);
        }
      }
      if (collections[i].cards[j].details != '') {
        cardStatus = getCreditStatus(collections[i].cards[j].price_type, cardStatus);
        var string = formatMarkets(i, collections[i].cards[j].details);
        var stringElem = document.createElement('span');
        stringElem.innerHTML = string;
        div.appendChild(stringElem);
        // addText(string, div, false);
      }
      addText('', div, true);
      if (cardStatus == TICKET_COLLECTION) {
        //cardType.src = IMAGES["TICKET"];
        //div.style.border = "#CCFFCC 1px solid";
      } else if (cardStatus == XL_COLLECTION) {
        //cardType.src = IMAGES["XL"];
        //div.style.border = "#CBDDFF 1px solid";
      }
    }
    setProgressCount(collections[i].slug, totalChecked, collections[i].size);
    var span = document.getElementById(i+"_checkAllLinks");
    if (!span) {
      span = document.createElement('span');
      span.id = i+"_checkAllLinks";
      span.style.cssFloat = "left";
      span.style.textAlign = "left";
      span.style.display = "block";
      var a_check = document.createElement('a');
      a_check.href = EMPTY_LINK;
      a_check.id = collections[i].slug + "_checker";
      a_check.addEventListener('click',checkall(i, true),false);
      addText("Check All", a_check, false);
      var a_uncheck = document.createElement('a');
      a_uncheck.href = EMPTY_LINK;
      a_uncheck.id = collections[i].slug + "_unchecker";
      a_uncheck.addEventListener('click',checkall(i, false),false);
      addText("Uncheck All", a_uncheck, false);
      a_uncheck.style.display = "none";
      a_check.style.display = "none";
      if (allChecked) {
        a_uncheck.style.display = "block";
      } else {
        a_check.style.display = "block";
      }
      span.appendChild(a_uncheck);
      span.appendChild(a_check);
      var container = document.getElementById(i+"_closeLink");
      container.parentNode.insertBefore(span, container);
    }

    var span = document.createElement('span');
    span.id = collections[i].slug + "_updateLink";
    span.appendChild(document.createElement('br'));
    var a_update = document.createElement('a');
    a_update.href = EMPTY_LINK;
    a_update.addEventListener('click',scanWikiForChanges(i),false);
    addText("Update data from PackRat Tools", a_update, false);
    span.appendChild(a_update);
    collDiv.appendChild(span);
    /* Update link */
    var span = document.createElement('span');
    span.appendChild(document.createElement('br'));
    span.id = collections[i].slug + "_updateNotif";
    addText("Checking PackRat Tools for updates... ", span, false);
    var img = document.createElement('img');
    img.src = IMAGES["ajax-loader"];
    span.appendChild(img);
    span.style.display = "none";
    collDiv.appendChild(span);
    if (unknownCards) {
      // Some cards are still unknown, check the wiki once every hour.
      timedScanForChanges(i, FREQ_NEW);
    } else {
      // All cards are known, check the wiki once every 4 days.
      timedScanForChanges(i, FREQ_COLLECTION_DATA);
    }

    addAboutBox(collDiv, "about-in-progress", "In Progress", "If you're currently working on this collection, then checking this box will include this collection in a special section at the top of the pull down menu. If you've feated this collection, then enabling 'Hide feated collections' in the preferences will not hide the link from the 'In Progress' section until this box is unchecked.");
    
    var p = document.createElement('p');
    var label = document.createElement('label');
    p.appendChild(label);
    addText("In progress:", label, false);
    var input = document.createElement('input');
    label.appendChild(input);
    input.type = "checkbox";
    input.name = collections[i].slug + "_working";
    input.className = collections[i].slug;
    if (collections[i].working) { input.checked = true; }
    input.addEventListener('click',saveWorkStatus(input, i),false);
    var a = document.createElement('a');
    a.href = EMPTY_LINK;
    a.addEventListener('click', toggleAboutBox("about-in-progress"), false);
    addText("what's this?",a,false);
    addText("(",p,false);
    p.appendChild(a);
    addText(")",p,false);
    collDiv.appendChild(p);
  }
  return true;
}

function setSelect(index) {
	var select = document.getElementById("allcolld");
	if (select) {
	  select.selectedIndex = index;
    // select.style.backgroundImage = select.options[index].style.backgroundImage;
    // select.className = select.options[index].className;
  }
}

function hide(coll) {
  return function() {
  	setSelect(0);
  	document.getElementById("guide").style.display="block";
  	document.getElementById(coll+"d").style.display="none";
  	removeRecipes(coll);
    setPref('VISIBLE_REPE', '')();
  };
}

function showSel(a) {
  for (var i in collections) {
    if (typeof collections[i] == "function") continue;
    document.getElementById(collections[i].slug+"d").style.display="none";
    removeRecipes(collections[i].slug);
  }
  var select = document.getElementById("allcolld");
  if (select.selectedIndex==0) {
    for (var s in select.options) {
      if (select.options[s].value == a) {
        setSelect(s);
        break;
      }
    }
  }
  setPref('VISIBLE_REPE', a)();
  if (a == "guide") {
    document.getElementById("guide").style.display="block";
    return;
  }
  addRecipes(a);
  var coll = document.getElementById(a+"d");
  if (!coll)
    return;

	var door=document.getElementById("gm-packrat-tracker-slider");
	var wHeight = door.clientHeight;//window.innerHeight
	coll.style.display="block";
	if (94+coll.clientHeight+10>=wHeight) { coll.style.top=((wHeight-coll.clientHeight)-20)+"px"; }
	if (parseInt(coll.style.top, 10)<8) { coll.style.top="8px"; }
	document.getElementById("guide").style.display="none";
}

function slide() {
	var door=document.getElementById("gm-packrat-tracker-slider");
	var slider_left = globalPrefs.PRTleft;
  if (slider_left) {
  	if (door.style.left == "0px") { setPref('PRTs', false)(); slideleft(); } else { setPref('PRTs', true)(); slideright(); }
  } else {
  	if (door.style.right == "-10px") { setPref('PRTs', false)(); slideright(); } else { setPref('PRTs', true)(); slideleft(); }
  }
}
function slideleft() {
	var door=document.getElementById("gm-packrat-tracker-slider");
  if (door.style.left != "auto") {
    // Slider is on the left
  	if (door.style.left!="-240px") {
  		door.style.left=parseInt(door.style.left, 10)-20+"px";
  		TimerIdd=setTimeout(slideleft,1);
  	}
  	else {
  		clearTimeout(TimerIdd);
  		document.getElementById("tabb").src = IMAGES["tab"];
  	}
	} else {
	  // Slider is on right
  	if (door.style.right!="-10px") {
  		door.style.right=parseInt(door.style.right, 10)+20+"px";
  		TimerIdd=setTimeout(slideleft,1);
  	}
  	else {
  		clearTimeout(TimerIdd);
  		document.getElementById("tabbl").src= IMAGES["tabor"];
  	}
	}
}
function slideright() {
	var door=document.getElementById("gm-packrat-tracker-slider");
  if (door.style.left != "auto") {
    // Slider is on the left
  	if (door.style.left!="0px") {
  		door.style.left=parseInt(door.style.left, 10)+20+"px";
  		TimerIdd=setTimeout(slideright,1);
  	}
  	else {
  		clearTimeout(TimerIdd);
  		document.getElementById("tabb").src= IMAGES["tabo"];
  	}
	} else {
	  // Slider is on the right
  	if (door.style.right!="-250px") {
  		door.style.right=parseInt(door.style.right, 10)-20+"px";
  		TimerIdd=setTimeout(slideright,1);
  	}
  	else {
  		clearTimeout(TimerIdd);
  		document.getElementById("tabbl").src = IMAGES["tabr"];
  	}
	}
}

function wikiDialog() {
  var css = "#gm-packrat-wiki {top:0; height: 109px; left: 0; text-align: left; position: fixed; z-Index:150;width: 5px; background-color: #1a3981;} #gm-packrat-wiki .gm-packrat-tracker-wikilink {position: absolute; top: 27px; left: 5px;}";
  GM_addStyle(css);
  
  var main_div = document.createElement('div');
  main_div.id = 'gm-packrat-wiki';
  var span = document.createElement('span');
  span.className = "gm-packrat-tracker-wikilink";
  var a = document.createElement('a');
  a.href = PACKRAT_HREF;
  var img = document.createElement('img');
  img.src = IMAGES["packr"];
  img.id = "gopic";
  img.name = "gopic";
  a.appendChild(img);
  span.appendChild(a);
  main_div.appendChild(span);
  
  /* Append pack link to main document */
  document.getElementsByTagName('body')[0].appendChild(main_div);
}

function sizeof(obj) {
  var i = 0;
  for (var x in obj)
    ++i;
  return i;
}

function populateCollectionList(select) {
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  var current_group = document.createElement('optgroup');
  current_group.label = "In Progress";
  var new_group = document.createElement('optgroup');
  new_group.label = "New Releases";
  var active_group = document.createElement('optgroup');
  active_group.label = "Active";
  var retired_group = document.createElement('optgroup');
  retired_group.label = "Retired Sets";
  var future_group = document.createElement('optgroup');
  future_group.label = "Upcoming Releases";
  var expiring_group = document.createElement('optgroup');
  expiring_group.label = "Expiring Soon";
  var opt = document.createElement('option');
  opt.value = "guide";
  addText("Select a collection:", opt, false);
  select.appendChild(opt);
  var sortedCollections = sortCollections(collections);
  for (var s in sortedCollections) {
    var i = sortedCollections[s];
    if (typeof collections[i] == "function") continue;
    if (collections[i].creditStatus == undefined) {
      updateCollectionStatus(i);
    }
    var hideColl = globalPrefs.HIDE_FEATED && collections[i].featStatus;
    if (hideColl && !collections[i].working) continue;
    var opt = document.createElement('option');
    opt.className = collections[i].family+"_opt";
    if (IMAGES['coll-'+i] == undefined) {
      opt.style.backgroundImage = "url("+collections[i].img+")";
    } else {
      opt.style.backgroundImage = "url("+IMAGES['coll-'+i]+")";
    }
    opt.value = i;
    if (globalPrefs.SHOW_PROGRESS) {
      var progressCount = document.createElement('div');
      progressCount.className = "ttiny " + collections[i].slug + "_progressCount";
      opt.appendChild(progressCount);
      var totalChecked = 0;
      for (var j in collections[i].cards) {
        if (typeof collections[i].cards[j] == "function") continue;
        if (collections[i].cards[j].owned) ++totalChecked;
      }
      setProgressCount(progressCount, totalChecked, collections[i].size);
    }
    addText(collections[i].name, opt, false);
    if (globalPrefs.SHOW_CREDIT_STATUS) {
      addText(' ', opt, false);
      var creditImg = document.createElement('img');
      if (collections[i].creditStatus == TICKET_COLLECTION) {
        creditImg.src = IMAGES['TICKET'];
      } else if (collections[i].creditStatus == XL_COLLECTION) {
        creditImg.src = IMAGES['XL'];
      } else if (collections[i].creditStatus != CREDIT_COLLECTION) {
        creditImg.src = IMAGES['NO_CREDIT'];
      }
      opt.appendChild(creditImg);
    }
    if (globalPrefs.SHOW_FEAT_STATUS && collections[i].featStatus) {
      var featImg = document.createElement('img');
      featImg.src = IMAGES["feat-icon"];
      opt.appendChild(featImg);
    }
    if (collections[i].working) {
      current_group.appendChild(opt.cloneNode(true));
    }
    if (!hideColl) {
      if (collections[i].isExpired) {
        retired_group.appendChild(opt);
      } else if (collections[i].isNew) {
        new_group.appendChild(opt);
      } else if (collections[i].isFuture) {
        future_group.appendChild(opt);
      } else if (collections[i].isExpiring) {
        expiring_group.appendChild(opt);
      } else {
        active_group.appendChild(opt);
      }
    }
  }
  if (sizeof(current_group) > 1)
    select.appendChild(current_group);
  if (sizeof(expiring_group) > 1)
    select.appendChild(expiring_group);
  if (sizeof(future_group) > 1)
    select.appendChild(future_group);
  if (sizeof(new_group) > 1)
    select.appendChild(new_group);
  if (sizeof(active_group) > 1)
    select.appendChild(active_group);
  if (sizeof(retired_group) > 1)
    select.appendChild(retired_group);
}

function populateCollections(form) {
  for (var i in collections) {
    if (typeof collections[i] == "function") continue;
    var div = document.createElement('div');
    div.id = collections[i].slug + "d";
    var tmp = document.getElementById(div.id);
    if (tmp) continue;
    div.className = "window pack coll_" + collections[i].family;
    
    /* Close link */
    var span = document.createElement('span');
    span.id = i + "_closeLink";
    span.style.textAlign = "right";
    span.style.display = "block";
    var a = document.createElement('a');
    a.href = EMPTY_LINK;
    a.addEventListener('click',hide(i),false);
    addText("Close window", a, false);
    span.appendChild(a);
    div.appendChild(span);
    
    /* Collection name */
    var span = document.createElement('span');
    span.className = "packtitle";
    var progressCount = document.createElement('div');
    progressCount.id = collections[i].slug + "_progressCount";
    progressCount.className = "ttiny ";
    progressCount.style.marginTop = "2px";
    span.appendChild(progressCount);
    var img = document.createElement('img');
    if (IMAGES['coll-'+i] == undefined) {
      img.src = collections[i].img;
    } else {
      img.src = IMAGES['coll-'+i];
    }
    img.width = 16;
    img.height = 16;
    img.border = 0;
    img.id = img.name = collections[i].slug+"_coll_img";
    span.appendChild(img);
    addText(" ",span,false);
    var a = document.createElement('a');
    a.href = infoUrl(collections[i].slug);
    addText(collections[i].name, a, false);
    span.appendChild(a);
    var a2 = document.createElement('a');
    a2.href = PACKRAT_HREF + "users/" + Page.p_user + "/vault?collection=" + collections[i].slug;
    addText("Vault", a2, false);
    addText(" (", span, false);
    span.appendChild(a2);
    addText(")", span, false);
    div.appendChild(span);
    
    var span = document.createElement('span');
    span.id = collections[i].slug + "_marketLink";
    span.appendChild(document.createElement('br'));
    var a_market = document.createElement('a');
    a_market.href = trackerUrl(collections[i].slug);
    a_market.target = "_blank";
    addText("Up-to-date market data", a_market, true);
    span.appendChild(a_market);
    div.appendChild(span);
    
    form.appendChild(div);
  }
}

function sliderDialog() {
  if (Page.wiki || Page.marketTracker) {
    wikiDialog();
    return;
  }
  var css = "#gm-packrat-tracker-slider{color:black; font-family:Helvetica, Geneva, Arial, SunSans-Regular, sans-serif; background-color:transparent; top:0px; width:250px; height: 100%; text-align: left; background-image:url("+IMAGES["85percblue"]+"); position: fixed; z-Index:150;} #gm-packrat-tracker-slider label {font-weight: normal; cursor: normal; color: #000; padding: 0; margin: 0;} #gm-packrat-tracker-slider .window{background:#ffffff; width:216px; border:1px solid #1A3981; padding:5px; font-size:11px; position:absolute; top:115px; background-image:url("+IMAGES["lightrat"]+"); background-repeat:no-repeat; background-position:bottom right} #gm-packrat-tracker-slider .guide{left:6px; width:216px;} #gm-packrat-tracker-slider #guide {max-height: 70%; overflow: auto;} #gm-packrat-tracker-slider #tracker_search, #gm-packrat-tracker-slider #prefs, #gm-packrat-tracker-slider .about {position:absolute; left:8px; top:10%; width:200px; background-color:white; border:1px solid #1A3981; padding:5px; font-size:11px; z-Index:155; max-height: 85%; overflow: auto;} #gm-packrat-tracker-slider .about {background-image:url("+IMAGES["alertbg"]+")} #gm-packrat-tracker-slider #tracker_search ul {padding-left: 15px; margin: 15px 0 0 0;} #gm-packrat-tracker-slider #tracker_search ul ul {padding-left: 5px; margin: 0;} #gm-packrat-tracker-slider .ttiny {float:right; color:#1A3981; font-size:7pt; line-height:9px; margin:-3px 2px 0px 0px;} #gm-packrat-tracker-slider .pack {display:none; left:6px; z-Index:154; max-height: 85%; overflow: auto;} #gm-packrat-tracker-slider .packtitle{color:#1A3981; font-weight:bold; font-size:9pt; line-height:15pt} #gm-packrat-tracker-slider .rboxes { display:none; position:inline; padding:0 15px; } #gm-packrat-tracker-slider .recipe{display:none; position:absolute; left:1px; background-image:url("+IMAGES["recipebg"]+"); color:white; width:210px; text-align:center; padding:5px} #gm-packrat-tracker-slider .gm-packrat-tracker-title{z-Index:153; position:absolute; top:6px; left:6px;} #gm-packrat-tracker-slider .gm-packrat-tracker-wikilink{position:absolute; top:0px; left:231px;} #gm-packrat-tracker-slider .gm-packrat-tracker-wikilink-left{position:absolute; top:0px; right:241px;} #gm-packrat-tracker-slider .gm-packrat-tracker-collections {top:80px; left:8px; position:absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-collections select{border: 1px solid #bdc7d8;} #gm-packrat-tracker-slider .gm-packrat-tracker-collections select option{width:166px; background-repeat:no-repeat; background-position: 3px; padding: 2px 2px 2px 22px; height:16px; border-top:1px solid;} #gm-packrat-tracker-slider .gm-packrat-tracker-collections select option * {vertical-align: middle;} #gm-packrat-tracker-slider .gm-packrat-tracker-slide-border-right{width:10px; background:#1A3981; height:100%; top:0px; left:240px; position:absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-slide-border-left{width:10px; background:#1A3981; height:100%; top:0px; left:-10px; position:absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-slide-border-bottom{width:260px; background:#1A3981; height:1px; bottom:-1px; left: -10px; position:absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-slide-border-top{width:260px; background:#1A3981; height:1px; top:0px; left: -10px; position:absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-slide-toggle{left:240px; position:absolute} #gm-packrat-tracker-slider .gm-packrat-tracker-slide-toggle-left{left:-20px; position:absolute} #gm-packrat-tracker-slider .gm-packrat-tracker-move-tracker {bottom: 0; margin-bottom: -3px; position: absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-float {bottom: 0; margin-bottom: -3px; position: absolute;} #gm-packrat-tracker-slider .httpgo {position:absolute; top:1px; right:1px;} #gm-packrat-tracker-slider .packrat_tracker_creditMarket, #gm-packrat-tracker-slider .packrat_tracker_creditMarket a {color:#ef7e23;font-weight:normal;} #gm-packrat-tracker-slider .packrat_tracker_xlMarket, #gm-packrat-tracker-slider .packrat_tracker_xlMarket a {color:#8F8F8F;font-weight:normal;} #gm-packrat-tracker-slider .packrat_tracker_ticketMarket, #gm-packrat-tracker-slider .packrat_tracker_ticketMarket a {color:#89CF00;font-weight:normal;} #gm-packrat-tracker-slider #donater {width:240px; position:absolute; bottom: 2px; text-align:center; font-size:11px;}";
  GM_addStyle(css);
  if (Page.marketTracker) {
    var css2 = "#gm-packrat-tracker-slider div, #gm-packrat-tracker-slider label, #gm-packrat-tracker-slider a { font-family:Helvetica, Geneva, Arial, SunSans-Regular, sans-serif; } #gm-packrat-tracker-slider p {padding: 5px 0;} #gm-packrat-tracker-slider label, #gm-packrat-tracker-slider input {float:none;} #gm-packrat-tracker-slider option, #gm-packrat-tracker-slider optgroup {color: #000;}";
    GM_addStyle(css2);
  }
  //var css2 = "#gm-packrat-tracker-slider .reciper{display:none; position:absolute; left:-32px; background-image:url("+IMAGES["recipebg"]+"); color:white; width:216px; text-align:center; padding:5px;} #gm-packrat-tracker-slider .packr{display:none; left:38px; width:144px; z-Index:154} #gm-packrat-tracker-slider .out{padding:1px; margin:2px 0px 2px} #gm-packrat-tracker-slider .in{height:16px; border:1px dotted #ffffff; padding:2px} #gm-packrat-tracker-slider .gm-packrat-tracker-active{top:80px; left:8px; position:absolute;} #gm-packrat-tracker-slider .gm-packrat-tracker-retired{top:80px; position:absolute; left:208px; z-Index:150} #gm-packrat-tracker-slider #gar{position:absolute; left:26px;} #gm-packrat-tracker-slider #garc{position:absolute; left:196px;}";
  var family_css = "";
  for (var i in families) {
    family_css += "#gm-packrat-tracker-slider select option."+i+"_opt{background-color:"+families[i].in_color+"; border-top-color:"+families[i].out_color+";} ";
    family_css += "#gm-packrat-tracker-slider div.coll_"+i+"{background-color: "+families[i].out_color+"; border-color: "+families[i].in_color+";}";
  }
  GM_addStyle(family_css);
  if (!Page.wiki) {
    var css2 = "#gm-packrat-tracker-slider {font-size: 0.8em !important;}";
    GM_addStyle(css2);
  }

  /* Building main container */
  var main_div = document.createElement('div');
  main_div.id = 'gm-packrat-tracker-slider';
  var slider_open = globalPrefs.PRTs;
  var slider_left = globalPrefs.PRTleft;
  
  // if (!Page.wiki && !Page.marketTracker) {
  //    var FB_frame = Utils.getElementsByClassName('UIStandardFrame_Container')[0];
  //   FB_frame.style.paddingLeft = 12+"px";
  // }
  if (slider_left) {
    main_div.style.right = "auto";
  	if (slider_open) {
      main_div.style.left = "0px";
    } else {
      main_div.style.left = "-240px";
    }
  } else {
    main_div.style.left = "auto";
  	if (slider_open) {
      main_div.style.right = "-10px";
    } else {
      main_div.style.right = "-250px";
    }
  }
  
  /* Building form */
  var form = document.createElement('div');
  // form.method = 'GET';
  // form.name = 'prt_form';
  form.id = "prt_form";
  main_div.appendChild(form);
  var submitButton = document.createElement('input');
  submitButton.value = "Submit";
  submitButton.type = "Submit";
  submitButton.style.display = "none";
  submitButton.disabled = true;
  form.appendChild(submitButton);
  
  /* Left Wiki/Packrat link */
  var span = document.createElement('span');
  span.id = span.className = "gm-packrat-tracker-wikilink";
  if (!slider_left) {
    span.style.display = "none";
  }
  var a = document.createElement('a');
  var img = document.createElement('img');
	if (Page.wiki) {
    img.src = IMAGES["pack"];
    a.href = PACKRAT_HREF;
	} else {
    img.src = IMAGES["prtools"];
    a.href = INFO_HREF;
	}
  img.id = "gopic";
  img.name = "gopic";
  a.appendChild(img);
  span.appendChild(a);
  form.appendChild(span);
  
  /* Right Wiki/Packrat link */
  var span = document.createElement('span');
  span.id = span.className = "gm-packrat-tracker-wikilink-left";
  if (slider_left) {
    span.style.display = "none";
  }
  var a = document.createElement('a');
  var img = document.createElement('img');
	if (Page.wiki) {
    img.src = IMAGES["packr"];
    a.href = PACKRAT_HREF;
	} else {
    img.src = IMAGES["prtoolsr"];
    a.href = INFO_HREF;
	}
  img.id = "gopicl";
  img.name = "gopicl";
  a.appendChild(img);
  span.appendChild(a);
  form.appendChild(span);
  
  var div = document.createElement('div');
  div.id = "gm-packrat-tracker-header";
  div.style.position = "relative";
  if (slider_left) {
    div.style.marginLeft = "0px";
  } else {
    div.style.marginLeft = "10px";
  }
  form.appendChild(div);
  
  /* Title */
  var span = document.createElement('span');
  span.className = "gm-packrat-tracker-title";
  var img = document.createElement('img');
  img.src = IMAGES["title"];
  img.id = "titleStatic";
  span.appendChild(img);
  var dragImg = img.cloneNode(true);
  dragImg.addEventListener('mousedown', function(e) {dragStart(e,'gm-packrat-tracker-slider');}, false);
  dragImg.id = "titleDrag";
  span.appendChild(dragImg);
  if (globalPrefs.FLOAT_SLIDER)
    img.style.display = "none";
  else
    dragImg.style.display = "none";
  div.appendChild(span);
  
  /* Collections */
  var coll_div = document.createElement('div');
  coll_div.className = "gm-packrat-tracker-collections";
  div.appendChild(coll_div);
  var select = document.createElement('select');
  select.id = "allcolld";
  select.addEventListener('change', function() { showSel(this.value); }, false);
  coll_div.appendChild(select);
  populateCollectionList(select);
  
  /* Info box */
  var info_box = document.createElement('div');
  info_box.id = "guide";
  info_box.className = "window guide";
  var span = document.createElement('span');
  span.className = "packtitle";
  var img = document.createElement('img');
  img.src = IMAGES["tinyrat"];
  span.appendChild(img);
  addText(" Guide", span, false);
  info_box.appendChild(span);
  
  var guideblock = globalPrefs.HTTPGO;
	
  var div = document.createElement('div');
  div.className = 'httpgo';
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click',function() {httpgo();},false);
  var img = document.createElement('img');
  img.id = "guidego_img";
  if (guideblock != 'guidemain')
    img.src = IMAGES["guidebox"];
  else
    img.src = IMAGES["httpbox"];
  a.appendChild(img);
  div.appendChild(a);
  info_box.appendChild(div);
  
  /* Donate */
  var donate_box = document.createElement('div');
  donate_box.id = "donater";
  form.appendChild(donate_box);
  var donate = document.createElement('div');
  donate.id = "donater_box";
  donate_box.appendChild(donate);
  if (globalPrefs.HIDE_MOTD || Page.marketTracker) {
    donate.style.display = "none";
  }
  /* MOTD box */
  var motd = document.createElement('div');
  donate.appendChild(motd);
  motd.id = "prt_motd";
  addText(GM_getValue('motd', "This tracker is, and will remain, free. Keeping this updated and with new features however takes time, and my addiction to this game is insatiable. If you wish to help feed my addiction, use this button. Thank you, and keep playing!"), motd, false);
  var close = document.createElement('a');
  close.href = EMPTY_LINK;
  close.addEventListener('click', function() { setPref('HIDE_MOTD', true)(); document.getElementById('donater_box').style.display = "none"; document.getElementById('prt_motd_open').style.display = "block"; }, false);
  addText('hide', close, false);
  addText(" (", motd, false);
  motd.appendChild(close);
  addText(")", motd, false);
  var ppForm = document.createElement('form');
  donate.appendChild(ppForm);
  ppForm.method = "POST";
  ppForm.action = "https://www.paypal.com/cgi-bin/webscr";
  var input = document.createElement('input');
  ppForm.appendChild(input);
  input.type = "hidden";
  input.name = "cmd";
  input.value = "_s-xclick";
  var input2 = document.createElement('input');
  ppForm.appendChild(input2);
  input2.type = "hidden";
  input2.name = "encrypted";
  input2.value = "-----BEGIN PKCS7-----MIIHVwYJKoZIhvcNAQcEoIIHSDCCB0QCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYB7S1ru1Qy+7ljLO32wYYY5xpl/Iynr7snZGIrhaGbKFewBT1sqLPrdc5IFKDGFSncrmiodz6MCp+vGKuVezI2Z1CAkH9a3S7SCTquQdmLmcSSuJWazdPsi7oZKDwIdQyJoAK1oRQLTUdJpfV1sfMWP9QoYAHcNKbHfwRJW0JmLLDELMAkGBSsOAwIaBQAwgdQGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIob3H1FSBh/iAgbBvpBcLEgsK4podr8dZg3Lv1OKBa+B924uqj2nMF8i3TOH8a+IqQPVabR42APUPTFZyUjjuvo6AJy+5BufSs0xfoltdyrm7ReOQCv7wzoxozPkfSdnWIzX/BwTmT1J0O7q/kRitwi6pugf4fFgmiX7CJndp2msPjZo4MPrOkoQw1BuPnWhROeA17BJKM8Rs2JruAFWC8Wh/a4xl9fyxSEUwfi5FFW18JwfzazGM3G/u3KCCA4cwggODMIIC7KADAgECAgEAMA0GCSqGSIb3DQEBBQUAMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTAeFw0wNDAyMTMxMDEzMTVaFw0zNTAyMTMxMDEzMTVaMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwUdO3fxEzEtcnI7ZKZL412XvZPugoni7i7D7prCe0AtaHTc97CYgm7NsAtJyxNLixmhLV8pyIEaiHXWAh8fPKW+R017+EmXrr9EaquPmsVvTywAAE1PMNOKqo2kl4Gxiz9zZqIajOm1fZGWcGS0f5JQ2kBqNbvbg2/Za+GJ/qwUCAwEAAaOB7jCB6zAdBgNVHQ4EFgQUlp98u8ZvF71ZP1LXChvsENZklGswgbsGA1UdIwSBszCBsIAUlp98u8ZvF71ZP1LXChvsENZklGuhgZSkgZEwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAgV86VpqAWuXvX6Oro4qJ1tYVIT5DgWpE692Ag422H7yRIr/9j/iKG4Thia/Oflx4TdL+IFJBAyPK9v6zZNZtBgPBynXb048hsP16l2vi0k5Q2JKiPDsEfBhGI+HnxLXEaUWAcVfCsQFvd2A1sxRr67ip5y2wwBelUecP3AjJ+YcxggGaMIIBlgIBATCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTA5MDMxMzE5NDY0NVowIwYJKoZIhvcNAQkEMRYEFAjVcynUGagSMwGHTFs04rAZUyEzMA0GCSqGSIb3DQEBAQUABIGAuQz871wC/lOgNMHARE4hCu8ikXO0TCoJeePi6w9S7pWf1e9re0ZeKGGj2ZCK2mwOIWhAClmImhFSy7GG2VrP3x8oEGmgsOqy9LZcaU3GRfdVFoVjq4rwdpjAJYFQSkzq+Jb1UnsXTvI16uFhwrTIk88kBC+wX6bqSSNlly/GZjQ=-----END PKCS7-----";
  var ppImg = document.createElement('input');
  ppForm.appendChild(ppImg);
  ppImg.type = "image";
  ppImg.src = "https://www.paypal.com/en_GB/i/btn/btn_donate_SM.gif";
  ppImg.border = "0";
  ppImg.name = "submit";
  ppImg.alt = "PayPal - The safer, easier way to pay online.";
  var ppFiller = document.createElement('img');
  ppForm.appendChild(ppFiller);
  ppFiller.alt = "";
  ppFiller.border = "0";
  ppFiller.src = "https://www.paypal.com/en_GB/i/scr/pixel.gif";
  ppFiller.width = 1;
  ppFiller.height = 1;
  var open = document.createElement('span');
  donate_box.appendChild(open);
  open.id = "prt_motd_open";
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click', function() { setPref('HIDE_MOTD', false)(); document.getElementById('donater_box').style.display = "block"; document.getElementById('prt_motd_open').style.display = "none"; }, false);
  addText('show', a, false);
  addText("(", open, false);
  open.appendChild(a);
  addText(")", open, false);
  if (!globalPrefs.HIDE_MOTD && !Page.marketTracker) {
    open.style.display = "none";
  }
  
  var guidemain = document.createElement('div');
  guidemain.id = "guidemain";
  if (guideblock != 'guidemain') {
    guidemain.style.display = 'none';
  }
  
  var p = document.createElement('p');
  addText("Select a collection from the pull-down above. Click on the 'Links' icon on the top right for more options.", p, false);
  guidemain.appendChild(p);
  var showInit = true;
  for (var i in collections) {
    if (typeof collections[i] == "function") continue;
    showInit = false;
    break;
  }

  var coll_exist = false;
  for (var i in collections) {
    if (typeof collections[i] == "function") continue;
    coll_exist = true;
    break;
  }
  if (globalPrefs.CHECK_VAULT) {
    var p = document.createElement('p');
    var img = document.createElement('img');
    img.src = IMAGES["ajax-loader"];
    p.appendChild(img);
    addText(" Scanning vaulted cards... (this might take a minute or two. Be patient, and don't do anything else until it finishes)", p, false);
    guidemain.appendChild(p);
  } else {
    var p = document.createElement('p');
    p.id = "prt_vault_scan_linkr";
    if (!coll_exist) {
      p.style.display = "none";
    }
/*    var a = document.createElement('a');
    a.href = EMPTY_LINK;
    a.addEventListener('click',startVaultScan(),false);
    addText("Scan vaulted cards", a, false);
    var recip = "prt_vault_scan_link";
    a.addEventListener('mouseover', showrepe(recip), false);
    a.addEventListener('mouseout', hiderepe(recip), false);
    p.appendChild(a);
    var span = document.createElement('span');
    span.id = recip;
    span.className = "recipe";
    span.style.fontWeight = "bold";
    span.style.fontSize = "1.3em";
    var span2 = document.createElement('span');
    span2.style.fontSize = "1.5em";
    addText("**WARNING**", span2, true);
    span.appendChild(span2);
    addText("You should NOT do anything else until scanning completes. Alternatively, you can manually navigate your vault - Vaulted cards will still be checked.", span, false);
    p.appendChild(span);
    guidemain.appendChild(p);
*/
  }
  
  var p = document.createElement('p');
  var table = document.createElement('table');
  p.appendChild(table);
  var tr = document.createElement('tr');
  table.appendChild(tr);
  var td1 = document.createElement('td');
  tr.appendChild(td1);
  td1.style.width = "50%";
  var td2 = document.createElement('td');
  tr.appendChild(td2);
  addText('', td2, true);
  var totalLinks = 0;
  for (var m in markets) {
    if (!markets[m].filler) {
      ++totalLinks;
    }
  }
  var insertedLinks = 0;
  for (var m in markets) {
    if (!markets[m].filler) {
      ++insertedLinks;
      var span = document.createElement('span');
      if (markets[m].ticket)
        span.className = "packrat_tracker_ticketMarket";
      else if (markets[m].xl)
        span.className = "packrat_tracker_xlMarket";
      else
        span.className = "packrat_tracker_creditMarket";
      if (markets[m].link != undefined) {
        var a = document.createElement('a');
        span.appendChild(a);
        a.href = PACKRAT_HREF + "markets/" + markets[m].link;
        addText(markets[m].slug + ": " + m, a, true);
      } else {
        addText(markets[m].slug + ": " + m, span, true);
      }
      if (markets[m].ticket || markets[m].xl)
        td2.appendChild(span);
      else
        td1.appendChild(span);
    }
  }
  guidemain.appendChild(p);

  var savedCards = new SavedCards();
  
  var search = document.createElement('div');
  search.id = "tracker_search";
  search.style.display = "none";
  var span = document.createElement('span');
  span.style.cssFloat = "right";
  /* Close button */
  var close = document.createElement('a');
  close.href = EMPTY_LINK;
  close.addEventListener('click',function() {var search = document.getElementById("tracker_search"); search.style.display="none";},false);
  addText('close', close, false);
  span.appendChild(close);
  search.appendChild(span);
  /* Image + Title */
  var span = document.createElement('span');
  span.className = "packtitle";
  search.appendChild(span);
  var img = document.createElement('img');
  img.src = IMAGES["tinyrat"];
  img.align = "top";
  img.border = "0";
  span.appendChild(img);
  addText("Card Search", span, false);
  search.appendChild(span);
  var p = document.createElement('p');
  addText('Pack options:', p, true);
  if (Page.onPackrat && (Page.c_page == 'users' || Page.c_page == 'steal') && Page.c_userID && (Page.c_userID != Page.p_user)) {
    /* Remember option */
    var label = document.createElement('label');
    p.appendChild(label);
    var input = document.createElement('input');
    label.appendChild(input);
    input.type = 'checkbox';
    savedCards.refreshName();
    addText("Remember " + savedCards.getName(Page.c_userID) + "'s Pack", label, true);
    input.checked = input.defaultChecked = savedCards.packStatus(Page.c_userID);
    input.addEventListener('click', function() {var savedCards = new SavedCards();savedCards.togglePackStatus(Page.c_userID);}, false);
  }
  /* Default inactive pack save option */
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Automatically remember inactive packs", label, true);
  input.checked = input.defaultChecked = savedCards.getPref('INACTIVE_SAVE');
  input.addEventListener('click', function() {savedCards.togglePref('INACTIVE_SAVE');}, false);
  /* Reset saved packs */
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click',function() { resetSavedPacks(); },false);
  addText('Clear marked packs', a, true);
  p.appendChild(a);
  addText('', p, true);
  
  addText('General Options:', p, true);
  /* Sound Status option */
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Use 'sounds like' if no match", label, true);
  input.checked = input.defaultChecked = savedCards.getPref('SOUND_SEARCH');
  input.addEventListener('click', function() {savedCards.togglePref('SOUND_SEARCH');}, false);
  /* Partial matching option */
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Use single word matching", label, true);
  input.checked = input.defaultChecked = savedCards.getPref('PARTIAL_WORD_SEARCH');
  input.addEventListener('click', function() {savedCards.togglePref('PARTIAL_WORD_SEARCH');}, false);
  /* Live searching option */
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Live searching", label, true);
  input.checked = input.defaultChecked = savedCards.getPref('LIVE_SEARCH');
  input.addEventListener('click', function() {savedCards.togglePref('LIVE_SEARCH');}, false);
  /* Only foil search option */
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Only show foils", label, true);
  input.checked = input.defaultChecked = savedCards.getPref('ONLY_FOIL_SEARCH');
  input.addEventListener('click', function() {savedCards.togglePref('ONLY_FOIL_SEARCH');}, false);
  /* Search box */
  addText('', p, true);
  addText('Type a card name and hit "enter":', p, true);
  var input = document.createElement('input');
  p.appendChild(input);
  input.id = "tracker_search_term";
  input.type = 'text';
  input.size = '20';
  input.setAttribute("autocomplete", "off");
  input.addEventListener('keyup',function(e) { if (savedCards.getPref('LIVE_SEARCH') || e.keyCode == 13) savedCards.performSearch(); return false; }, false);
  input.value = globalPrefs.SEARCH_TERM;
  var search_res = document.createElement('div');
  search_res.id = "tracker_search_results";
  p.appendChild(search_res);
  search.appendChild(p);
  guidemain.appendChild(search);
  
  var prefs = document.createElement('div');
  prefs.id = "prefs";
  prefs.style.display = "none";
  var span = document.createElement('span');
  span.style.cssFloat = "right";
  var close = document.createElement('a');
  close.href = EMPTY_LINK;
  close.addEventListener('click',function() {repopulateMenu();var prefs = document.getElementById("prefs"); prefs.style.display="none";},false);
  addText('close', close, false);
  span.appendChild(close);
  prefs.appendChild(span);
  var span = document.createElement('span');
  span.className = "packtitle";
  prefs.appendChild(span);
  var img = document.createElement('img');
  img.src = IMAGES["tinyrat"];
  img.align = "top";
  img.border = "0";
  span.appendChild(img);
  addText("Preferences", span, false);
  prefs.appendChild(span);
  
  var p = document.createElement('p');
  // Internet store
  var strong = document.createElement('strong');
  p.appendChild(strong);
  addText('iStore: ', strong, false);
  addText('(', p, false);
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.id = "packrat_tracker_istore_show_links";
  a.style.display = "inline";
  a.addEventListener('click', function() { toggle_iStore_links(); }, false);
  addText('show', a, false);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.id = "packrat_tracker_istore_hide_links";
  a.style.display = "none";
  a.addEventListener('click', function() { toggle_iStore_links(); }, false);
  addText('hide', a, false);
  p.appendChild(a);
  addText(')', p, true);
  var istoreBox = document.createElement('div');
  p.appendChild(istoreBox);
  istoreBox.id = "packrat_tracker_istore_links";
  istoreBox.style.display = "none";
  var ul = document.createElement('ul');
  istoreBox.appendChild(ul);
  ul.style.paddingLeft = "20px";
  var li = document.createElement('li');
  ul.appendChild(li);
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click', function() { var iStore = new InternetStore(); iStore.load(); }, false);
  addText("Load data from the server", a, false);
  li.appendChild(a);
  var li = document.createElement('li');
  ul.appendChild(li);
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click', function() { var iStore = new InternetStore(); iStore.save(); }, false);
  addText("Save data to the server", a, false);
  li.appendChild(a);
  var li = document.createElement('li');
  ul.appendChild(li);
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click', function() { var iStore = new InternetStore(); iStore.logOut(); }, false);
  addText("Log out of server", a, false);
  li.appendChild(a);
  var div = document.createElement('div');
  istoreBox.appendChild(div);
  var em = document.createElement('em');
  div.appendChild(em);
  addText("Disclaimer: Your FaceBook ID will be stored on an external server along with all data necessary for the tracker to operate. Your data can only be accessed by providing your password, from any computer. Your password will be stored in encrypted form, and you will remain logged in from this computer until you log in from another pc, or you explicitly click on the 'Log Out' link. If you've never used this service before, you will be asked to create a password the first time you use it.", em, false);
  
  var div = document.createElement('div');
  p.appendChild(div);
  div.style.display = "none";
  div.id = "packrat_tracker_istore";
  var img = document.createElement('img');
  img.src = IMAGES["ajax-loader"];
  div.appendChild(img);
  addText(' ', div, false);
  var span = document.createElement('span');
  span.id = "packrat_tracker_istore_text";
  div.appendChild(span);
  // General Options
  addText('', p, true);
  addText('General Options:', p, true);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Hide feated collections", label, true);
  input.checked = input.defaultChecked = globalPrefs.HIDE_FEATED;
  input.addEventListener('click', togglePref('HIDE_FEATED'), false);
  prefs.appendChild(p);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Show market status icons", label, true);
  input.checked = input.defaultChecked = globalPrefs.SHOW_CREDIT_STATUS;
  input.addEventListener('click', togglePref('SHOW_CREDIT_STATUS'), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Show feat status icons", label, true);
  input.checked = input.defaultChecked = globalPrefs.SHOW_FEAT_STATUS;
  input.addEventListener('click', togglePref('SHOW_FEAT_STATUS'), false);
  // Progress display section
  addText('', p, true);
  addText('Progress display:', p, true);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Show count", label, true);
  input.checked = input.defaultChecked = globalPrefs.SHOW_COUNT;
  input.addEventListener('click', togglePref('SHOW_COUNT'), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Show percentage", label, true);
  input.checked = input.defaultChecked = globalPrefs.SHOW_PERCENT;
  input.addEventListener('click', togglePref('SHOW_PERCENT'), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Display in menu", label, true);
  input.checked = input.defaultChecked = globalPrefs.SHOW_PROGRESS;
  input.addEventListener('click', togglePref('SHOW_PROGRESS'), false);
  
  // Market Options
  addText('', p, true);
  addText('Market info settings:', p, true);
  addText('(from current collections)', p, true);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Hide Ticket Markets", label, true);
  input.checked = input.defaultChecked = globalPrefs.hideTicketMarkets;
  input.addEventListener('click', togglePref('hideTicketMarkets'), false);
  prefs.appendChild(p);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'checkbox';
  addText("Hide XL Markets", label, true);
  input.checked = input.defaultChecked = globalPrefs.hideXLMarkets;
  input.addEventListener('click', togglePref('hideXLMarkets'), false);

  // marketDataFreshness
  // Market Data freshness
  addText('', p, true);
  addText('Market data age:', p, true);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'market_freshness';
  addText("Today", label, true);
  input.checked = input.defaultChecked = globalPrefs.marketDataFreshness == 1;
  input.addEventListener('click', setPref('marketDataFreshness', 1), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'market_freshness';
  addText("Last 2 Days (default)", label, true);
  input.checked = input.defaultChecked = globalPrefs.marketDataFreshness == 0;
  input.addEventListener('click', setPref('marketDataFreshness', 0), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'market_freshness';
  addText("This week", label, true);
  input.checked = input.defaultChecked = globalPrefs.marketDataFreshness == 7;
  input.addEventListener('click', setPref('marketDataFreshness', 7), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'market_freshness';
  addText("This fortnight", label, true);
  input.checked = input.defaultChecked = globalPrefs.marketDataFreshness == 14;
  input.addEventListener('click', setPref('marketDataFreshness', 14), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'market_freshness';
  addText("A while", label, true);
  input.checked = input.defaultChecked = globalPrefs.marketDataFreshness == 35;
  input.addEventListener('click', setPref('marketDataFreshness', 35), false);
  prefs.appendChild(p);
  
  // Sort order section
  addText('', p, true);
  addText('Sort Order:', p, true);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'sort_status';
  addText("Alphabetically", label, true);
  input.checked = input.defaultChecked = globalPrefs.SORT_STATUS == ALPHA_SORT;
  input.addEventListener('click', setPref('SORT_STATUS', ALPHA_SORT), false);
  var label = document.createElement('label');
  p.appendChild(label);
  var input = document.createElement('input');
  label.appendChild(input);
  input.type = 'radio';
  input.name = 'sort_status';
  addText("By date of release/retirement", label, true);
  input.checked = input.defaultChecked = globalPrefs.SORT_STATUS == DATE_SORT;
  input.addEventListener('click', setPref('SORT_STATUS', DATE_SORT), false);
  prefs.appendChild(p);
  
  guidemain.appendChild(prefs);
    
  var p = document.createElement('p');
  var prefImgLink = document.createElement('a');
  prefImgLink.href = EMPTY_LINK;
  prefImgLink.addEventListener('click', function() {var prefs = document.getElementById("prefs");if (prefs == undefined) return;if (prefs.style.display=="none") {prefs.style.display="block";}else {prefs.style.display="none";}}, false);
  var img = document.createElement('img');
  img.src = IMAGES["mbutprefs"];
  prefImgLink.appendChild(img);
  p.appendChild(prefImgLink);
  var searchImgLink = document.createElement('a');
  searchImgLink.href = EMPTY_LINK;
  searchImgLink.addEventListener('click', function() {var search = document.getElementById("tracker_search");if (search == undefined) return;if (search.style.display=="none") {search.style.display="block";}else {search.style.display="none";}}, false);
  var img = document.createElement('img');
  img.src = IMAGES["mbutsearch"];
  searchImgLink.appendChild(img);
  p.appendChild(searchImgLink);
  var a = document.createElement('a');
  a.href = PRT_HREF;
  a.target = "_blank";
  var img = document.createElement('img');
  img.src = IMAGES["mbuttools"];
  a.appendChild(img);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = "http://www.dailysqueaker.com/";
  a.target = "_blank";
  var img = document.createElement('img');
  img.src = IMAGES["mbutsqueaker"];
  a.appendChild(img);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = "http://packrat-cafe.com/forum/index.php";
  a.target = "_blank";
  var img = document.createElement('img');
  img.src = IMAGES["mbutcafe"];
  a.appendChild(img);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = "http://www.card-trades.com/";
  a.target = "_blank";
  var img = document.createElement('img');
  img.src = IMAGES["mbutctrades"];
  a.appendChild(img);
  p.appendChild(a);
  guidemain.appendChild(p);
  
  info_box.appendChild(guidemain);
  
  var guidehttp = document.createElement('div');
  guidehttp.id = "guidehttp";
  if (guideblock == 'guidemain') {
    guidehttp.style.display = "none";
  }
  
  var p = document.createElement('p');
  var firstMarket = true;
  for (var i in markets) {
    if (markets[i].market) {
      if (!firstMarket)
        addText(" | ", p, false);
      var span = document.createElement('span');
      if (markets[i].ticket)
        span.className = "packrat_tracker_ticketMarket";
      else if (markets[i].xl)
        span.className = "packrat_tracker_xlMarket";
      else
        span.className = "packrat_tracker_creditMarket";
      var a = document.createElement('a');
      a.href = PACKRAT_HREF + "markets/" + markets[i].link;
      addText(i, a, false);
      span.appendChild(a);
      p.appendChild(span);
      firstMarket = false;
    }
  }
  guidehttp.appendChild(p);
  
  var p = document.createElement('p');
  var hasRats = false;
  var sortedRats = sortRats(rats);
  for (var s in sortedRats) {
    var i = sortedRats[s];
    if (typeof rats[i] == "function") continue;
    hasRats = true;
    var a = document.createElement('a');
    a.href = PACKRAT_HREF + "users/" + rats[i];
    var a2 = document.createElement('a');
    a2.href = a.href;
    var img = document.createElement('img');
    img.border = "0";
    var len = (i.indexOf(' ') > 0) ? i.indexOf(' ') : i.length;
    img.src = IMAGES[i];
    a.appendChild(img);
    addText(i, a2, true);
    p.appendChild(a);
    addText(' ', p, false);
    p.appendChild(a2);
  }
  if (!hasRats) {
    var a = document.createElement('div');
    // a.href = PACKRAT_HREF + "users/" + Page.p_user + "/friends/rats";
    addText("First visit all your rats to remember them", a, false);
    p.appendChild(a);
  }
  guidehttp.appendChild(p);
  
  var p = document.createElement('p');
  var a = document.createElement('a');
  a.href = PACKRAT_HREF + "users/" + Page.p_user;
  addText("Your Pack", a, false);
  p.appendChild(a);
  addText(" | ", p, false);
  var a = document.createElement('a');
  a.href = PACKRAT_HREF + "users/" + Page.p_user + "/vault";
  addText("Your Vault", a, false);
  p.appendChild(a);
  addText(" | ", p, false);
  var a = document.createElement('a');
  a.href = PACKRAT_HREF + "users/" + Page.p_user + "/feats";
  addText("Your Feats", a, true);
  p.appendChild(a);
  // addText("Steal from friends:", p, true);
  // var a = document.createElement('a');
  // a.href = PACKRAT_HREF + "users/" + Page.p_user + "/friends/all";
  // addText("All", a, false);
  // p.appendChild(a);
  // addText(" | ", p, false);
  // var a = document.createElement('a');
  // a.href = PACKRAT_HREF + "users/" + Page.p_user + "/friends/packrat";
  // addText("Packrat", a, false);
  // p.appendChild(a);
  // addText(" | ", p, false);
  // var a = document.createElement('a');
  // a.href = PACKRAT_HREF + "users/" + Page.p_user + "/friends/xl";
  // addText("XL", a, false);
  // p.appendChild(a);
  // addText(" | ", p, false);
  // var a = document.createElement('a');
  // a.href = PACKRAT_HREF + "users/" + Page.p_user + "/friends/online";
  // addText("Online", a, false);
  // p.appendChild(a);
  // addText(" | ", p, false);
  // var a = document.createElement('a');
  // a.href = PACKRAT_HREF + "users/" + Page.p_user + "/friends/rats";
  // addText("Rats", a, true);
  // p.appendChild(a);
  guidehttp.appendChild(p);
  
//  var p = document.createElement('p');
//  var a = document.createElement('a');
//  a.href = PACKRAT_HREF + "clear_cache";
//  addText("Clear cache (for general problems)", a, true);
//  p.appendChild(a);
//  var a = document.createElement('a');
//  a.href = PACKRAT_HREF + "update_feats";
//  addText("Update your feats", a, false);
//  p.appendChild(a);
//  guidehttp.appendChild(p);
  
  var p = document.createElement('p');
  var a = document.createElement('a');
  a.href = FB_HREF + "board.php?app_id=2431403991&xid=packrat_general2&c_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss%253Ffbapp_ec%253D754&r_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&sig=1a5cf21db3fa378c06ac7d5a9105117a";
  var img = document.createElement('img');
  img.src = IMAGES["disupdates"];
  a.appendChild(img);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = FB_HREF + "board.php?xid=packrat_offtopic&app_id=2431403991&c_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&r_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&sig=49d33e8e95078a78433e1841f675f01c";
  var img = document.createElement('img');
  img.src = IMAGES["disyap"];
  a.appendChild(img);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = FB_HREF + "board.php?app_id=2431403991&xid=packrat_trading2&c_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&r_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&sig=80973211086076fefdda5243bde39273";
  var img = document.createElement('img');
  img.src = IMAGES["discurrent"];
  a.appendChild(img);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = FB_HREF + "board.php?app_id=2431403991&xid=packrat_trading_retired2&c_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&r_url=http%253A%252F%252Fapps.facebook.com%252Fpackrat%252Fdiscuss&sig=b8748dbf3117b54aa2a5124ce82877ed";
  var img = document.createElement('img');
  img.src = IMAGES["disretired"];
  a.appendChild(img);
  p.appendChild(a);
  guidehttp.appendChild(p);
  
  var p = document.createElement('p');
  var span = document.createElement('span');
  span.id = "prt_collection_update_link";
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click',collectionUpdateCheck(true),false);
  addText("Update Collection data", a, false);
  span.appendChild(a);
  p.appendChild(span);
  var span = document.createElement('span');
  span.id = "prt_collection_update_progress";
  var img = document.createElement('img');
  img.src = IMAGES["ajax-loader"];
  span.appendChild(img);
  addText(" Updating collection data...", span, false);
  span.style.display = "none";
  p.appendChild(span);
  guidehttp.appendChild(p);
  
  info_box.appendChild(guidehttp);
  
  var p = document.createElement('p');
  p.style.textAlign = "center";
  addText("© 2009 ", p, false);
  var a = document.createElement('a');
  a.href = FB_HREF+"profile.php?id=500042";
  addText("Constantinos Neophytou", a, true);
  p.appendChild(a);
  addText("Data provided by: ", p, false);
  var a = document.createElement('a');
  a.href = PRT_HREF;
  addText("PackRat Tools", a, true);
  p.appendChild(a);
  addText("Concept and design: ", p, false);
  var a = document.createElement('a');
  a.href = FB_HREF+"profile.php?id=707238876";
  addText("James David Sutter", a, true);
  p.appendChild(a);
  var a = document.createElement('a');
  a.href = FB_HREF+"inbox/?compose&id=500042&subject=PackRat Tracker";
  addText("Make suggestions & report bugs", a, true);
  p.appendChild(a);
  // var a = document.createElement('a');
  // a.href = "http://userscripts.org/reviews/new?script_id=31750";
  // addText("Rate it!", a, true);
  // addText("Like this script? ", p, false);
  // p.appendChild(a);
  info_box.appendChild(p);
  form.appendChild(info_box);
  
  /* Append slider to main document */
  document.getElementsByTagName('body')[0].appendChild(main_div);
  positionFloatWindow();
  savedCards.performSearch();
  
  /* The contents of the collections - Recipes and such */
  populateCollections(form);

  /* Border */
  var div = document.createElement('div');
  div.className = "gm-packrat-tracker-slide-border-right";
  form.appendChild(div);
  var div = document.createElement('div');
  div.className = "gm-packrat-tracker-slide-border-left";
  form.appendChild(div);
  var div = document.createElement('div');
  div.className = "gm-packrat-tracker-slide-border-bottom";
  form.appendChild(div);
  var div = document.createElement('div');
  div.className = "gm-packrat-tracker-slide-border-top";
  form.appendChild(div);
  
  /* Slider toggle tab */
  var div = document.createElement('div');
  div.id = div.className = "gm-packrat-tracker-slide-toggle";
  div.style.bottom = "0";
  if (!slider_left) {
    div.style.display = "none";
  }
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click',function() {slide(); return false;},false);
  var img = document.createElement('img');
	if (slider_open)
    img.src = IMAGES["tabo"];
  else
    img.src = IMAGES["tab"];
  img.id = "tabb";
  a.appendChild(img);
  div.appendChild(a);
  form.appendChild(div);
  if (globalPrefs.FLOAT_SLIDER) {
    div.style.display = "none";
  }

  /* Left slider toggle tab */
  var div = document.createElement('div');
  div.id = div.className = "gm-packrat-tracker-slide-toggle-left";
  div.style.bottom = "0";
  if (slider_left) {
    div.style.display = "none";
  }
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click',function() {slide(); return false;},false);
  var img = document.createElement('img');
	if (slider_open)
    img.src = IMAGES["tabor"];
  else
    img.src = IMAGES["tabr"];
  img.id = "tabbl";
  a.appendChild(img);
  div.appendChild(a);
  form.appendChild(div);
  if (globalPrefs.FLOAT_SLIDER) {
    div.style.display = "none";
  }
  
  /* Slide tracker to right/left */
  var div = document.createElement('div');
  div.className = "gm-packrat-tracker-move-tracker";
  div.style.bottom = "0";
  div.id = "side-switcher";
  var a = document.createElement('a');
  a.href = EMPTY_LINK;
  a.addEventListener('click', function() { switchSides(false); return false; }, false);
  var img = document.createElement('img');
  if (slider_left) {
    img.src = IMAGES["toright"];
    div.style.left = "157px";
  } else {
    img.src = IMAGES["toleft"];
    div.style.left = "0px";
  }
  a.appendChild(img);
  div.appendChild(a);
  form.appendChild(div);
  if (globalPrefs.FLOAT_SLIDER) {
    div.style.display = "none";
  }
	
	/* Attach/detach */
	var div = document.createElement('div');
	div.className = "gm-packrat-tracker-float";
	div.style.bottom = "0";
	div.id = "float-toggle";
	var a = document.createElement('a');
	a.href = EMPTY_LINK;
	a.addEventListener('click', function () { switchFloat(); return false; }, false);
	var img = document.createElement('img');
	if (globalPrefs.FLOAT_SLIDER) {
	  img.src = IMAGES["attach"];
	  div.style.left = "0px";
	} else {
	  if (slider_left) {
	    img.src = IMAGES["detach"];
	    div.style.left = "0px";
	  } else {
	    img.src = IMAGES["detachr"];
	    div.style.left = "157px";
	  }
	}
	a.appendChild(img);
	div.appendChild(a);
	form.appendChild(div);
	addAboutBox(form, "about-float", "Floating Window", "With the PackRat Tracker main window detached, you can click and drag on the logo to move the tracker around the screen. Go ahead, place it exactly where you like! The tracker will stay there until you move it, or until you re-attach it to the screen. Unfortunately there is no way to resize the window yet.");
	
  /* Display selected collection */
  var visible_repe = globalPrefs.VISIBLE_REPE;
  if (visible_repe != '') {
    showSel(visible_repe);
  }
}

function parseImages(coll, responseText) {
  try {
		var response = eval(responseText);
		var pref = '';
		var gmVal = '';
		if (coll) {
		  gmVal = 'coll-images';
		  pref = "last_coll_img_update";
		} else {
		  gmVal = 'images';
		  pref = "last_img_update";
		}
		
		var images = eval(GM_getValue(gmVal, '({})'));
		for (var i in response) {
		  images[i] = response[i];
		}
		GM_setValue(gmVal, images.toSource());
    var updateTimes = eval(GM_getValue("lastImgUpdate", "({last_img_update:0,last_coll_img_update:0})"));
    updateTimes[pref] = Math.round(new Date().getTime()/1000.0);
    GM_setValue("lastImgUpdate", updateTimes.toSource());
	} catch (err) { }
}

function fetchImages(coll) {
  var fetchLink = "http://www.neophytou.net/packrat/tracker/images.php?lastUpdate=";
  if (coll) {
    var updateTimes = eval(GM_getValue("lastImgUpdate", "({last_img_update:0,last_coll_img_update:0})"));
	  var lastUpdate = updateTimes.last_coll_img_update;
    fetchLink += lastUpdate;
    fetchLink += "&type=collection";
  } else {
    var updateTimes = eval(GM_getValue("lastImgUpdate", "({last_img_update:0,last_coll_img_update:0})"));
	  var lastUpdate = updateTimes.last_img_update;
    fetchLink += lastUpdate;
  }
  try
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: fetchLink,
			headers: REQUEST_HEADER,
			onload: function(xhrResponse)
			{
			  parseImages(coll, xhrResponse.responseText);
			}
		});
	}
	catch (err) { }
}

function loadImages() {
  var img = new Object();
  
  img['TICKET'] = "http://www.neophytou.net/packrat/images/TICKET.png";
  img['XL'] = "http://www.neophytou.net/packrat/images/XL.png";
  img['NO_CREDIT'] = "http://www.neophytou.net/packrat/images/NO_CREDIT.png";
  img['toleft'] = "http://packrat.utut.net/toleft.png";
  img['toright'] = "http://packrat.utut.net/toright.png";
  img['guidebox'] = "http://packrat.utut.net/guidebox.gif";
  img['httpbox'] = "http://packrat.utut.net/httpbox.gif";
  img['tab'] = "http://packrat.utut.net/tab.png";
  img['tabor'] = "http://packrat.utut.net/tabor.png";
  img['tabo'] = "http://packrat.utut.net/tabo.png";
  img['tabr'] = "http://packrat.utut.net/tabr.png";
  img['feat-icon'] = "http://www.neophytou.net/packrat/images/feat-icon.png";
  img['ajax-loader'] = "http://packrat.utut.net/ajax-loader.gif";
  img['pack'] = "http://packrat.utut.net/pack.gif";
  img['wiki'] = "http://packrat.utut.net/wiki.gif";
  img['wikir'] = "http://packrat.utut.net/wikir.gif";
  img['prtools'] = "http://www.neophytou.net/packrat/images/prtools.gif";
  img['prtoolsr'] = "http://www.neophytou.net/packrat/images/prtoolsr.gif";
  img['packr'] = "http://packrat.utut.net/packr.gif";
  img['title'] = "http://packrat.utut.net/title.png";
  img['tinyrat'] = "http://packrat.utut.net/tinyrat.gif";
  img['mbutmarket'] = "http://packrat.utut.net/mbutmarket.gif";
  img['mbuttools'] = "http://www.neophytou.net/packrat/images/mbuttools.gif";
  img['mbutcafe'] = "http://packrat.utut.net/mbutcafe.gif";
  img['mbutctrades'] = "http://packrat.utut.net/mbutctrades.gif";
  img['mbutsqueaker'] = "http://packrat.utut.net/mbutsqueaker.gif";
  img['mbutprefs'] = "http://packrat.utut.net/mbutprefs.gif";
  img['mbutsearch'] = "http://packrat.utut.net/mbutsearch.gif";
  img['disupdates'] = "http://packrat.utut.net/disupdates.gif";
  img['disyap'] = "http://packrat.utut.net/disyap.gif";
  img['discurrent'] = "http://packrat.utut.net/discurrent.gif";
  img['disretired'] = "http://packrat.utut.net/disretired.gif";
  img['85percblue'] = "http://www.neophytou.net/packrat/images/85percblue.png";
  img['alertbg'] = "http://www.neophytou.net/packrat/images/alertbg.png";
  img['detachr'] = "http://packrat.utut.net/detachr.gif";
  img['detach'] = "http://packrat.utut.net/detach.gif";
  img['attach'] = "http://www.neophytou.net/packrat/images/attach.gif";
  img['lightrat'] = "http://packrat.utut.net/lightrat.png";
  img['recipebg'] = "http://packrat.utut.net/recipebg.png";

  img['Biff'] = "http://www.neophytou.net/packrat/images/Bif.gif";
  img['Captain Ratbeard'] = "http://www.neophytou.net/packrat/images/Captain.gif";
  img['Marcel Le Rat'] = "http://www.neophytou.net/packrat/images/Marcel.gif";
  img['Mark Zuckerrat'] = "http://www.neophytou.net/packrat/images/Mark.gif";
  img['Princess Cinderatta'] = "http://www.neophytou.net/packrat/images/Princess.gif";
  img['Rat Cassidy'] = "http://www.neophytou.net/packrat/images/Rat.gif";
  img['Ratina Triumph'] = "http://www.neophytou.net/packrat/images/Ratina.gif";
  img['Rattori Hanzo'] = "http://www.neophytou.net/packrat/images/Rattori.gif";
  img['Ratty Crocker'] = "http://www.neophytou.net/packrat/images/Ratty.gif";
  img['Shakirat'] = "http://www.neophytou.net/packrat/images/Shakirat.gif";
  
  var images = eval(GM_getValue('images', '({})'));
  
  for (var i in img) {
    if (typeof img[i] == 'function') continue;
    if (images[i] == undefined) {
      images[i] = img[i];
    }
  }
  
  var collections = eval(GM_getValue('coll-images', '({})'));

  for (var j in collections) {
    if (typeof collections[j] == 'function') continue;
    images[j] = collections[j];
  }

  var updateTimes = eval(GM_getValue("lastImgUpdate", "({last_img_update:0,last_coll_img_update:0})"));
  if (updateTimes.last_img_update < 1289218920) {
    fetchImages(false);
  }
  
  if (updateTimes.last_coll_img_update+172800 <= Math.round((new Date().getTime())/1000.0)) {
    // every 2 days
    fetchImages(true);
  }
  
  return images;
}

function pollPageForChange() {
  var browse = document.getElementById('app2431403991_browse');
  if (!browse) return;
  var links = Utils.getElementsByClassName('avatar-featured', browse);
  if (!links || !links[0]) return;
  
  function waitForNext(featured) {
    var browse = document.getElementById('app2431403991_browse');
    if (!browse) return;
    var links = Utils.getElementsByClassName('avatar-featured', browse);
    if (!links || !links[0]) return;
    if (links[0].href == featured) {
      setTimeout(function() { waitForNext(featured); }, 500);
    } else {
      setTimeout(function() { _reinit(); }, 200);
    }
  }
  setTimeout(function() { waitForNext(links[0].href); }, 500);
}

function _reinit() {
  var slider = document.getElementById('gm-packrat-tracker-slider');
  if (slider) {
    slider.parentNode.removeChild(slider);
  }
  pollPageForChange();

  Page.init();
  populateMarketData();

  lastCollUpdate = new LastUpdateData();
  if (getUserID()) {
    collectionUpdateCheck(false)();
    collections = new CollectionData();
    collections.updatePageData();
    rats = new Rats();
    rats.updateRatData();
    Page.scan();
    rememberCards();
  }
  sliderDialog();
}

if (!Page.boards || Page.packratBoards) {

  var FB_HREF = "http://www.facebook.com/";
  var FB_APP_HREF = "http://apps.facebook.com/";

  var PACKRAT_HREF = FB_APP_HREF + "packrat/";

  var IMAGES = loadImages(); // really needed??

  if (Page.marketTracker) {
    Page.init();
    sliderDialog();
  } else {
    _reinit();
  }
}

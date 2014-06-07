// ==UserScript==
// @name           Sleepy
// @namespace      http://www.barafranca.com
// @description    Enhances Omerta's gameplay.
// @include        http://*barafranca.*/*
// @require        http://sleepy.trabot.net/dl/js/jquery-1.4.2.js
// @resource       topic http://sleepy.trabot.net/dl/resources/topic.gif
// @resource       prefs http://sleepy.trabot.net/dl/resources/prefs.png
// @resource       prefsMedium http://sleepy.trabot.net/dl/resources/prefsMedium.png
// @resource       menu http://sleepy.trabot.net/dl/resources/menu.png
// @resource       hotkey http://sleepy.trabot.net/dl/resources/hotkey.png
// @resource       hotkeyActive http://sleepy.trabot.net/dl/resources/hotkeyActive.png
// @resource       hide http://sleepy.trabot.net/dl/resources/hide.png
// @resource       hideActive http://sleepy.trabot.net/dl/resources/hideActive.png
// @resource       fill http://sleepy.trabot.net/dl/resources/fill.png
// @resource       travel http://sleepy.trabot.net/dl/resources/travel.png
// @resource       logo http://sleepy.trabot.net/dl/resources/logo.png
// @resource       sell http://sleepy.trabot.net/dl/resources/sell.png
// @resource       repair http://sleepy.trabot.net/dl/resources/repair.png
// @resource       lock http://sleepy.trabot.net/dl/resources/lock.png
// @resource       unlock http://sleepy.trabot.net/dl/resources/unlock.png
// @resource       safehouse http://sleepy.trabot.net/dl/resources/safehouse.png
// @resource       flag http://sleepy.trabot.net/dl/resources/flag.png
// ==/UserScript==

/* 
 * Copyright (c) 2008-2011 Tijmen van der Burgt
 *
 * Sleepy is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Sleepy is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Sleepy.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// Sleepy version/release (used to periodically check for updates)
const SLEEPY_VERSION = "0.4.5";
const SLEEPY_RELEASE = 7;

// Omerta version (used to distinguish versions)
const OMERTA_VERSION = (function() {
  var chunks = window.location.hostname.split(".");
  var subdomain = chunks[0] == "barafranca" ? null : chunks[0];
  var extension = chunks[chunks.length - 1];
  
  if (subdomain == "dm" || subdomain == "deathmatch")
    return "dm"
  else if (subdomain == "beta")
    return "beta"
  else if (subdomain == "dev")
    return "dev"
  else
    return extension;
})();

// Omerta stuff
const CITIES = ["Detroit", "Chicago", "Palermo", "New York", "Las Vegas", "Philadelphia", "Baltimore", "Corleone"];
const NARCS_TYPES = ["Morphine", "Heroin", "Opium", "Cocaine", "Marihuana", "Tobacco", "Glue"];
const BOOZE_TYPES = ["Wine", "Cognac", "Whiskey", "Amaretto", "Beer", "Port", "Rum"];
const BASE_URL = "http://" + window.location.hostname + "/";
const USER_STATUS = BASE_URL + "userstatus.php";
const PRICES = BASE_URL + "BeO/webroot/index.php?module=API&action=smuggling_prices";

const HEIST_CARS =  [19, 21, 22, 27, 32, 34, 35, 40, 43];
const OC_CARS =     [24, 25, 28, 29, 30, 31, 33, 39, 44];
const MOC_CARS =    [33, 39, 41, 42, 45, 47, 48, 54];


// TraBot stuff
const TRABOT_STATS = ["com", "nl", "dm"].indexOf(OMERTA_VERSION) != -1;
const TRABOT_NEWS = ["com", "dm"].indexOf(OMERTA_VERSION) != -1;
const TRABOT_USERS = "http://sleepy.trabot.net/users.php";
const TRABOT_HISTORY = "http://sleepy.trabot.net/history.php";
const TRABOT_ONTIME = "http://sleepy.trabot.net/ontime.php";
const TRABOT_RSS_FEED = "http://news.trabot.net/rss/";

// Sleepy stuff
const SLEEPY_WEBSITE = "http://sleepy.trabot.net/dl/";
const SLEEPY_VERSION_INFO = "http://sleepy.trabot.net/dl/version.xml";

const DEFAULT_VALUES = {
  hotkeys:                {"./BeO/webroot/index.php?module=Launchpad": "A", "./BeO/webroot/index.php?module=Crimes": "C", "./BeO/webroot/index.php?module=Cars": "N", "./jail.php": "J", "./smuggling.php": "S", "./BeO/webroot/index.php?module=Travel": "T", "./BeO/webroot/index.php?module=GroupCrimes": "G", "./kill.php": "K", "./BeO/webroot/index.php?module=Mail&action=inbox": "M", "./bullets2.php": "B", "./obay.php": "O", "./BeO/webroot/index.php?module=Spots": "R", "./BeO/webroot/index.php?module=Statistics": "Z"},
  
  hiddenItems:            ["./chat.php", "./family_recruitment.php", "./arcade.php"],
  lockedCars:             [],
  
  lastUpdateCheck:        0,
  nextFlight:             0,
  
  hideFriendAvatars:      false,
  hideTopFrame:           false,
  hideRightFrame:         false,
  classicTheme:           false,
  
  bidAnonymously:         true,
  notifyUpdates:          true,
  userTooltips:           true,
  logo:                   true,
  mailShortcuts:          true,
  garageShortcuts:        true,
  denoteHotkeys:          true,
  news:                   true,
  smuggling:              true,
  quickTravel:            true,
  spotsOverview:          true
};

// Query string hash
const GET = (function() {
  var searchChunks = window.location.search.split(/[?=&]/);
  var searchKeys = [];
  
  for (i = 1; i < searchChunks.length - 1; i += 2) {
    searchKeys[searchChunks[i]] = searchChunks[i + 1];
  }
  
  return searchKeys;
})();

// Delete all values (simulates a new installation)
if (false) {
  for each (var name in GM_listValues()) {
    GM_deleteValue(name);
  }
}

// GM_getValue/GM_setValue wrappers,
// so it will handle more types

function getValue(name) {
  try {
    var value = eval(GM_getValue(name, DEFAULT_VALUES[name]));
  } catch(e) {
    var value = GM_getValue(name, DEFAULT_VALUES[name]);
  }
  
  return value;
}

function setValue(name, value) {
  if (typeof value == "object")
    value = uneval(value);
   
  GM_setValue(name, value);
}

function commafy(num) {
		var str = (num + "").split(".");
		var dec = str[1] || "";
		var num = str[0].replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
		return (dec) ? num + "." + dec : num;
}

function toInt(string) {
    return parseInt(string.match(/\d+/g).join(""));
}

function duration(s) {
  
    if (isNaN(s))
        return NaN;
    
    if (s < 0)
        throw new Error("Negative number");
  
    var d = s / (3600 * 24);
	var h = (d - Math.floor(d)) * 24;
	var m = (h - Math.floor(h)) * 60;
	var s = (m - Math.floor(m)) * 60;
	
	d = Math.floor(d);
	h = Math.floor(h);
	m = Math.floor(m);
	s = Math.round(s);
			
	var duration = [];
	
	if (d > 0) duration.push(d + "d");
	if (h > 0) duration.push(h + "h");
	if (m > 0) duration.push(m + "m");
	if (s > 0 || duration.length == 0) duration.push(s + "s");
    
	duration.splice(3);
    return duration.join(" ");
}

function parseDateString(dateString) {
  
  var chunks = dateString.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
  
  var day = parseInt(chunks[1]);
  var month = parseInt(chunks[2]);
  var year = parseInt(chunks[3]);
  
  var hour = parseInt(chunks[4]);
  var minute = parseInt(chunks[5]);
  var second = parseInt(chunks[6]);
  
  var date = new Date(year, month, day, hour, minute, second);
  
  return date;
}

// Change bright profit/loss colors
GM_addStyle(".profit { color: #108f25 !important; }");
GM_addStyle(".loss { color: #cc3333 !important; }");

// Classic Omerta Theme
if (getValue("classicTheme")) {
  
  // Menu & News
  
  GM_addStyle("#menu th, .subnav, #newscontainer { background: #3f515f !important; }");
  $("#menu th").css({
    "color": "yellow",
    "border": "none"
  });
  $(".menuLink[href=./BeO/webroot/index.php?module=Launchpad]").css("font-weight", "bold");
  
  // Top frame
  $("#paneltopbar, #topbar").css({
    "background": "#3f515f"
  });
  
  // Tables
  GM_addStyle(".tableheader, .oheader { background: url(" + GM_getResourceURL("topic") + ") !important; }");
  GM_addStyle(".tableheader, .tableheader *, .oheader { color: black !important; }");
  
  // Navigation tabs
  $(".smsmenu a").css({
      "background": "#AFAFAF",
      "color": "black",
      "border": "1px solid black",
      "padding-top": "2px",
      "padding-bottom": "2px"
  });
  
  $(".smsmenu").css("margin-bottom", "5px");
  GM_addStyle(".smsmenu .selected { background: #BFBFBF !important; }");
  GM_addStyle(".smsmenu a:hover { background: #BFBFBF !important; }");
  
  // DC+ bar
  $("#panel *").css("background", "inherit");
  
  // Progress bars
  $(".progress *").css("color", "white");
  $(".progress dd").css("background", "#17252F");
  $(".progress span").css("background", "#AFAFAF");
  
  // User profiles & Family pages
  GM_addStyle(".subtableheader { background: #3F505F !important; }");
  
  // Marquee
  $("#marquee").css({
      "background": "#117A99",
      "border-top": "1px solid black",
      "border-bottom": "1px solid black"
  });
}


// Add Omerta & Sleepy version to title
document.title = "Omerta." + OMERTA_VERSION + " (Sleepy " + SLEEPY_VERSION + ")";

// Check if (a new version of) Sleepy has been installed
if (getValue("version") != SLEEPY_VERSION) {
	setValue("version", SLEEPY_VERSION);
    alert("Sleepy " + SLEEPY_VERSION + " is installed successfully.\nYour browser will now be refreshed.");
	top.location.reload();
}

if (window.location.pathname == "/game.php") {
  
  // Set 'My Acount' as index page
  $("frame[name='main']").attr("src", "./BeO/webroot/index.php?module=Launchpad");
  
  // Add GM menu commands
  GM_registerMenuCommand("Sleepy " + SLEEPY_VERSION + " (check for update)", function() {
    checkUpdate(true);
  });
  
  GM_registerMenuCommand("Preferences Panel", injectPrefs);
  
  GM_registerMenuCommand("Customize Menu", function() {
    var menu = top.frames[1];
    
    if (menu.location.search == "?edit=true")
      menu.location.search = "";
    else
      menu.location.search = "?edit=true";
  });
  
  // Hide top/right frame(s)
  if (getValue("hideTopFrame"))
    $("frameset:eq(0)").attr("rows", "25,*");
  
  if (getValue("hideRightFrame"))
    $("frameset:eq(1)").attr("cols", "15%,*,0");
    
  // Check for update (every 48 hours)
  if (getValue("notifyUpdates")) {
    var time = new Date().getTime();
    var lastUpdateCheck = getValue("lastUpdateCheck");
    var checkInterval = 3600 * 48 * 1000;
    if (time - lastUpdateCheck > checkInterval) {
      setValue("lastUpdateCheck", time.toString());  
      checkUpdate(false);
    }
  }
}

if (window.location.pathname == "/banner.php" && getValue("hideTopFrame")) {
  $("frameset:eq(0)").attr("rows", "0,*");
}

// Omerta Index
// Focus email text field, so saved user credentials will be shown
if (window.location.pathname == "/" || window.location.pathname == "/game-login.php") {
  $(":text[name=email]:last")[0].focus();
}

function injectPrefs() {
  
  var body = $("body", top.frames[2].document);
  
  // Clean previous page
  body.empty();
  
  
  // Inject HTML
  var wrapper = $('<div></div>')
  body.append(wrapper), main = $('<div class="category"></div>'), menu = $('<div class="category"></div>'), misc = $('<div class="category"></div>'), sample1 = $('<div class="category"></div>'), sample2 = $('<div class="category"></div>');
  
  
  wrapper.append('<h1>Sleepy Preferences Panel <span id="buttons"><button id="apply">Apply</button> <button id="cancel">Cancel</button> <button id="reset">Reset</button></span></h1>');
  wrapper.append('<h2>Global</h2>');
  wrapper.append('<div class="category" id="global"></div>');
  wrapper.append('<h2>Page Specific</h2>');
  wrapper.append('<div class="category" id="specific"></div>');  
  wrapper.append('<h2>Miscellaneous</h2>');
  wrapper.append('<div class="category" id="misc"></div>');
  
  // Enumerate preferences
  var prefs = [];
  prefs[0] = ["global", "userTooltips", "User tooltips", "Display tooltips by hovering user links with you cursor for a certain amount of time"];
  prefs[1] = ["global", "classicTheme", "Classic theme", "Replace your current theme with Omerta\'s classic theme"];
  prefs[2] = ["global", "denoteHotkeys", "Denote hotkeys (menu)", "Display hotkeys by holding your cursor over menu items"];
  prefs[3] = ["global", "hideTopFrame", "Hide top frame", ""];
  prefs[4] = ["global", "hideRightFrame", "Hide news frame", ""];
  prefs[5] = ["specific", "mailShortcuts", "Mail shortcuts", "Add shortcuts to manage your messages individually"];
  prefs[6] = ["specific", "garageShortcuts", "Car shortcuts (garage)", "Add shortcuts to manage your cars individually"];
  prefs[7] = ["specific", "quickTravel", "Quick travel", "Travel to a city directly with one click"];
  prefs[8] = ["specific", "hideFriendAvatars", "Hide friend avaters (user profile)", "Replace friend avaters with their usernames"];
  prefs[9] = ["specific", "spotsOverview", "Enumerate spots (spot raids)", "Display spots in a table instead of a map"];
  if (TRABOT_NEWS) prefs[10] = ["specific", "news", "TraBot news", "Merge TraBot news items with Omerta news items"];
  prefs[11] = ["misc", "logo", "Sleepy logo", "Replace Omerta\'s logo with Sleepy\'s logo"];
  prefs[12] = ["misc", "notifyUpdates", "Check for updates", "Allow Sleepy to regularly check for updates"];
  prefs[13] = ["specific", "smuggling", "Calculate profits and add buy/sell shortcuts (smuggling)", ""];
  
  
  // Inject preferences
  $(prefs).each(function() {
    $("div#" + this[0], wrapper).append('<label id="' + this[1] + '" title="' + this[3] + '"><input type="checkbox"> <span>' + this[2] + '</span></label>');
  });
  
  // Define CSS styles
  body.css({
    "margin": "35px",
    "background": 'url("/static/images/game/layout/mainbg.png") repeat-x scroll center top #E6E6E6',
    "font": "12px Arial, Helvetica, sans-serif",
    "color": "black"
  });
  
  /*
  wrapper.css({
    "border-right": "1px solid #31424F",
    "border-left": "1px solid #31424F",
    "border-bottom": "1px solid #31424F"
  });
  */
  
  $("h1, h2", wrapper).css({
    "color": "#efefef",
    "border-top": "1px solid #31424F",
    "border-bottom": "1px solid #31424F"
  });
  
  $("h1", wrapper).css({
    "padding": "10px",
    //"margin": "0px 0px 20px 0px",
    "font-size": "18px",
    "background": "#4b5b69 url(" + GM_getResourceURL("prefsMedium") + ") no-repeat 5px 50%",
    "-moz-border-radius": "0px",
    "text-indent": "25px"
  });
  
  $("h2", wrapper).css({
    "background": "#4b5b69",
    "cursor": "pointer",
    "padding": "5px",
    "font-size": "14px",
    "margin": "0px",
    "margin-top": "5px",
    "text-indent": "30px"
  });
  
  $("#buttons", wrapper).css({
    "padding": "3px 3px 3px 12px",
    "margin-left": "10px",
    "border-left": "1px solid #31424F"
  });
  
  $("button", wrapper).css({
    "background": "#53636F",
    "cursor": "pointer",
    "color": "#efefef",
    "margin": "2px",
    "-moz-border-radius": "4px",
    "padding": "2px 6px 2px 6px",
    "border": "1px solid #31424F"
  });
  
  $(".category", wrapper).css({
    "padding": "2px",
    "text-indent": "10px",
    "border-right": "1px solid #31424F",
    "border-left": "1px solid #31424F",
    "border-bottom": "1px solid #31424F",
    "background": "#D3D8DB"
  });
  
  $("label", wrapper).css({
    "display": "block",
    "cursor": "pointer",
    "padding": "2px",
  });
  
  $("label *", wrapper).css("vertical-align", "middle");
  
  
  $("label", wrapper).each(function() {
    var checkbox = $(this).find(":checkbox")[0];
    
    checkbox.checked = getValue(this.id);
  });
  
  
  $("button", wrapper).hover(
    function() {
      $(this).css("background", "#576875");
    },
    
    function() {
      $(this).css("background", "#53636F");
    }
  );
  
  $("h2", wrapper).click(function(i) {
    var category = $(this).next(".category");
    
    category.filter(":hidden").animate({
      height: "toggle"
    }, "fast");
    
    $(".category:visible", wrapper).each(function() {
      if (this != category[0]) {
        $(this).animate({
          height: "toggle"
        }, "fast");
      }
    });
    
  });
  
  $(".category", wrapper).hide();
  $("#global", wrapper).show();
  
  // Apply
  $("#apply", wrapper).click(function() {
    $("label", wrapper).each(function() {
      var enabled = $(this).find(":checkbox")[0].checked;
      setValue(this.id, enabled);
    });
    
    top.location.reload();
  });
  
  // Cancel
  $("#cancel", wrapper).click(function() {
    top.location.reload();
  });
  
  // Reset
  $("#reset", wrapper).click(function() {
    if (confirm("Are you sure you want to reset your preferences?\nAll changes will be lost!")) {
      $("label", wrapper).each(function() {
        GM_deleteValue(this.id);
        top.location.reload();
      });
    }
  });
  
}

function checkUpdate(feedback) {
	GM_xmlhttpRequest({
		method: "GET",	
		url: SLEEPY_VERSION_INFO,
		onload: function(response) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(response.responseText, "text/xml");
			var version = dom.getElementsByTagName("version")[0].textContent;
			var release = parseInt(dom.getElementsByTagName("release")[0].textContent);
			var url = dom.getElementsByTagName("url")[0].textContent;
			
			if (SLEEPY_RELEASE < release) {
			  if (confirm("A new version of Sleepy (" + version + ") is available. Do you wish to update?"))
			    open(url);
			}
			else if (feedback) {
				alert("Sleepy is up to date.");
			}
		}
	});
}

// Image Code Protection
if ($("#imgcode")[0]) {
  $("form").submit(function() {
    var ver = $(this.elements).filter(":text[size=3]")[0];
    
    if (!ver) return;
    
    // Bad image code,
    // stop form from submitting
  	if (ver.value.length != 3 || ver.value.match(/[^a-zA-Z0-9]/)) {
  		ver.value = "";
  		ver.focus();
  		return false;
  	}
  });
}

// Right frame
if (window.location.pathname == "/info.php" && false) {
  
  var div = $("#menubg");
  
  var oNewsItems = $(".story");
  var newsItems = [];
  var newsLinks = [];
  
  $("a", newsItems).each(function() {
    newsLinks.push(this.href);
  });
  
  // Clean up crap
  div.empty();
  
  // Insert our new tables 
  var tables = [$("<table />"), $("<table />"), $("<table />")];
  div.append(tables[2]);
  div.append(tables[0]);
  div.append(tables[1]);
  
  // Apply CSS styles
  $("table").css({
    "font-size":    "10px",
    "background":   "#000000",
    "color":        "#ffffff",
    "border":       "none",
    "opacity":      "0.85",
    "cursor":       "pointer"
  });
  
  GM_addStyle("td, th { padding: 5px !important; font-size: 10px !important; }");
  GM_addStyle("th { border: none !important; border-bottom: 1px solid #1d1b1b !important; border-bottom: 1px solid #1d1b1b !important; background: #15151d; text-align: center !important; }");
  GM_addStyle(".userData, .city, .newsItem { border-bottom: 1px solid #1d1b1b; }");
  GM_addStyle("a { font-size: 10px !important; }");
  
  // Add mouse hover effects (has to be a live handler; since the elements are created dynamically)
  $(".userData, .city, .newsItem").live("mouseover", function() {
    $(this).css("background", "#191717");
  });
  $(".userData, .city, .newsItem").live("mouseout", function() {
    $(this).css("background", "#000000");
  });
  
  var interval;
  
  // News items
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://news.trabot.net/rss/",
    headers: {
      "User-Agent": navigator.userAgent,
      "Accept": "text/xml"
    },
    onload: function(response) {
      
      var xmlParser = new DOMParser();
      var rss = xmlParser.parseFromString(response.responseText, "text/xml");
      
      tables[2].append('<tr><th colspan="2" id="newsHeader">News</th></tr>');
      
      oNewsItems.each(function(index) {
        var title = $("a", this)[0].childNodes[2].textContent;
        var date = new Date();
        var dayOfMonth = $("a", this)[0].childNodes[0].textContent.split("-")[0];
        var month = $("a", this)[0].childNodes[0].textContent.split("-")[1] - 1;
        var link = $("a", this)[0].href;
        
        date.setDate(dayOfMonth);
        date.setMonth(month); 
        
        var formattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
        newsItems.push([date, link, $('<tr class="newsItem"><td>' + formattedDate + '</td><td>' + title + '</td></tr>')]);
        
      });
      
      // News from trabot.net   
      $("item", rss).each(function() {
       
        var title = $("title", this).text();
        var description = $("description", this).text();
        var sDate = $("pubDate", this).text();
        var link = $("link", this)[0].textContent;
        
        newsLinks.push(link);
        
        //sDate = sDate.replace(/(\w{3}), (\d+) (\w{3})/, "$1, $2, $3 " + new Date().getFullYear());
        var date = new Date(sDate);
        var formattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
        
        newsItems.push([date, link, $('<tr class="newsItem" title="' + description + '"><td>' + formattedDate + '</td><td>' + title + '</td></tr>')]);
        
      });
      
      
      // Sort news items
      var sortedNewsItems = [];
      
      for (i = 0; i < newsItems.length; i++) {
        
        var iDate = newsItems[i][0];
        
        if (sortedNewsItems.length == 0) {
          sortedNewsItems.push(newsItems[i]); // Place i at start of array
          continue;
        }
        
        for (j = 0; j < sortedNewsItems.length; j++) {
          var jDate = sortedNewsItems[j][0];
          
          if (iDate.getTime() > jDate.getTime()) {         
            var list = sortedNewsItems.splice(j, 0, newsItems[i]); // Place i before j
            break;
          } 
          
          else if (j == sortedNewsItems.length - 1) {
            var list = sortedNewsItems.push(newsItems[i]); // Place i at end of array
            break;
          }
        }
      }
      
      // Apend news items in descending order
      $(sortedNewsItems).each(function() {
        var item = $(this[2]);
        var url = this[1];
        tables[2].append(item);
        
        item.click(function() {
          if (url.split(/\/+/)[1] == "news.trabot.net") GM_openInTab(url);
          else top.frames[2].location = url;
        });
      });
    }
  });
  
  
  // User information
  function loadUserData() {
    
    // Clear all data to make clear the data is being (re)loaded right now
    $(".userData").each(function() {
      $("td", this)[1].textContent = null;
    });
       
    GM_xmlhttpRequest({
      method: "GET",
      url: BASE_URL + "userstatus.php",
      headers: {
        "User-Agent": navigator.userAgent,
        "Accept": "text/xml"
      },
      onload: function(response) {
        
        var xmlDoc = response.responseText;
        var time = Math.round(new Date().getTime() / 1000); 
        
        // Parse data
        var waitingTimes = {
          crime:    parseInt($("crime", xmlDoc).text()),
          car:      parseInt($("car", xmlDoc).text()),
          heist:    parseInt($("heist", xmlDoc).text()),
          oc:       parseInt($("oc", xmlDoc).text()),
          moc:      parseInt($("moc", xmlDoc).text()),
          travel:   parseInt($("travel", xmlDoc).text()),
          bullets:  parseInt($("bullets", xmlDoc).text()),
          booze:    parseInt($("booze", xmlDoc).text()),
          narcs:    parseInt($("drugs", xmlDoc).text())
        };
        
        var userData = {
          messages: parseInt($("unread", xmlDoc).text()),
          health:   parseInt($("health", xmlDoc).text()),
          jail:     parseInt($("jail", xmlDoc).text()),
          lastVote: GM_getValue("lastVote")
        };
        
        // Corresponding links
        var links = {
          crime:    "BeO/webroot/index.php?module=Crimes",
          car:      "BeO/webroot/index.php?module=Cars",
          heist:    "BeO/webroot/index.php?module=Heist",
          oc:       "BeO/webroot/index.php?module=OC",
          moc:      "BeO/webroot/index.php?module=MOC",
          travel:   "BeO/webroot/index.php?module=Travel",
          bullets:  "bullets2.php",
          booze:    "smuggling.php",
          narcs:    "smuggling.php",
          messages: "BeO/webroot/index.php?module=Mail",
          health:   "BeO/webroot/index.php?module=Bloodbank",
          jail:     "jail.php",
          lastVote: "vfo.php"
        };
        
        // Clean up
        clearInterval(interval);
        tables[0].empty();
        
        // Append HTML
        tables[0].append('<tr><th colspan="2" id="timersHeader">User Information <a href="#" id="refreshUserData">(Refresh)</a></th></tr>');
        tables[0].append('<tr class="userData" id="crime"><td width="50%">Crime</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="car"><td width="50%">Car</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="heist"><td width="50%">Heist</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="oc"><td width="50%">OC</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="moc"><td width="50%">MOC</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="travel"><td width="50%">Travel</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="bullets"><td width="50%">Bullets</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="booze"><td width="50%">Booze</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="narcs"><td width="50%">Narcotics</td><td width="50%"></td></tr>');
        
        // Other data
        tables[0].append('<tr class="userData" id="messages"><td width="50%">Messages</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="health"><td width="50%">Health</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="jail"><td width="50%">Jail</td><td width="50%"></td></tr>');
        tables[0].append('<tr class="userData" id="lastVote"><td width="50%">Last Vote</td><td width="50%"></td></tr>');
        
        // Add links to the rows
        $(".userData").each(function(i) {
          $(this).click(function() {
            top.frames[2].location = links[this.id];
          });
        });
        
        // Refresh timers when refresh link is clicked
        $("#refreshUserData").click(function() {
          loadUserData();
        });
        
        
        // Insert data
        function displayData() {
          for (id in waitingTimes) {
            $("td", "#" + id)[1].textContent = (waitingTimes[id] == 0 ? "idle" : duration(waitingTimes[id]));
          }
          
          $("td", "#messages")[1].textContent = isNaN(userData.messages) ? "n/a" : userData.messages;
          $("td", "#health")[1].textContent = isNaN(userData.health) ? "n/a" : userData.health + "%";
          $("td", "#jail")[1].textContent = (userData.jail == 0 ? "no" : duration(userData.jail));
          
          var time = Math.round(new Date().getTime() / 1000);
          $("td", "#lastVote")[1].textContent = duration(time - userData.lastVote);
        }
        
        displayData();
        
        // Create interval for the timers
        interval = setInterval(function() {
          for (id in waitingTimes) {
            if (waitingTimes[id] != 0) waitingTimes[id]--;
          }
          
          if (userData.jail != 0) userData.jail--;
          displayData();
        }, 1000);
        
      }
    });
  }
  
  
  loadUserData();
  setInterval(loadUserData, 30000);
  
  // Coke prices
  GM_xmlhttpRequest({
    method: "GET",
    url: BASE_URL + "BeO/webroot/index.php?module=API&action=smuggling_prices",
    headers: {
      "User-Agent": navigator.userAgent,
      "Accept": "text/xml"
    },
    onload: function(response) {
      var xmlDoc = $(response.responseText);
      var time = parseInt($("epochtimestamp", xmlDoc).text()) * 1000;
      time = new Date(time);
      time = [("0" + time.getHours()).slice(-2), ("0" + time.getMinutes()).slice(-2), ("0" + time.getSeconds()).slice(-2)].join(":");
      
      var cokePrices = [], lowCokePrice = 99999, lowCokeCity, highCokePrice = 0, highCokeCity;
      
      // Determine high & low coke city
      $("city", xmlDoc).each(function(i) {
        var cokePrice = parseInt($("cocaine", this).text());
        cokePrices.push(cokePrice);
        
        if (cokePrice > highCokePrice) highCokePrice = cokePrice, highCokeCity = i;
        if (cokePrice < lowCokePrice) lowCokePrice = cokePrice, lowCokeCity = i;
      });
      
      tables[1].append('<tr><th colspan="2" id="pricesHeader">Coke Prices (' + time + ')</th></tr>');
      
      // Loop to the coke prices; and display them
      $(cokePrices).each(function(i) {
        var cokePrice = "$" + commafy(this);
        
        if (i == highCokeCity) {
          tables[1].append('<tr class="city" style="color: red;"><td width="50%">' + CITIES[i] + '</td><td width="50%">' + cokePrice + '</td></tr>');
        } else if (i == lowCokeCity) {
          tables[1].append('<tr class="city" style="color: green;"><td width="50%">' + CITIES[i] + '</td><td width="50%">' + cokePrice + '</td></tr>'); 
        } else {
          tables[1].append('<tr class="city"><td width="50%">' + CITIES[i] + '</td><td width="50%">' + cokePrice + '</td></tr>');
        }
      });
      
      // Refresh coke prices at 0 minutes and 30 minutes
      setInterval(function() {
        var date = new Date();
        //console.log(date.getMinutes());
        if (date.getMinutes() == 0 || date.getMinutes() == 14) { // add +10 seconds
          if (lastRefresh != date.getMinutes()) {
            var lastRefresh = date.getMinutes();
            //alert("Reloading coke prices... @ " + lastRefresh);
          } 
        }
      }, 10000);
      
      // Add links to city rows
      $(".city").each(function(i) {
        $(this).click(function() {
          if (confirm("Are you sure you want to travel to " + Omerta.cities[i] + "?")) {
            top.frames[2].location = Omerta.baseUrl + "BeO/webroot/index.php?module=Travel&action=TravelNow&City=" + i;
          }
        });
      }); 
    }
  });
}

// Votes & Affliates
if (window.location.pathname == '/vfo.php') {
  var votelots = []; 
  var time = new Date().getTime();
  var lastVote = getValue("lastVote");
  
  var div = $("<div />"), a = $("<a />");
  
  a.html("Open all vote links in separate tabs");
  
  if (lastVote)
    a.append(" (last vote: <b>" + duration((time - lastVote) / 1000) + "</b> ago)");
  
  a.attr("href", "javascript:void(0);");
    
  div.css({
    "text-align": "center",
    "margin": "20px"
  });
    
  div.append(a);
    
  $(document.body).prepend(div);
    
  a.click(function() {
    if (!confirm("Are you sure?"))
      return;
      
    var votelots = $("a[href^='votelot.php']");
    var i = 0;
    
    function openLink() {
      var time = new Date().getTime();
      var percentage = Math.round(((i + 1) / votelots.length) * 100);
      var votelot = votelots[i];
      
      if (i < votelots.length) {
        div.html('Opened link <b>' + (i + 1) + '</b> of <b>' + votelots.length + '</b> (' + percentage + '%)');
        div.append('<p><a href="javascript:void(0);" id="cancel">(Cancel)</a></p>');
        GM_openInTab(votelot.href);
        setValue('lastVote', time.toString());
        i++;
      } else {
        $("p", div).html("<p>Done!</p>");
        clearInterval(timer);
      }
    }
    
    var timer = setInterval(openLink, 500);
    openLink();
    
    $("#cancel").live("click", function() {
      $("p", div).html("<p>Done!</p>");
      clearInterval(timer);
    });
    
  });
}

// Settings icons
if (window.location.pathname == "/marquee.php") {
  var menuIcon = $('<img class="icon" src="' + GM_getResourceURL("menu") + '" />"');
  var prefsIcon = $('<img class="icon" src="' + GM_getResourceURL("prefs") + '" />"');
  var details = $('<div></div>');
  
  if (getValue("classicTheme"))
    $("#marquee").css("height", "23px");
  
  $("body").append(menuIcon);
  $("body").append(prefsIcon);
  $("body").append(details);
  
  $(".icon").css({
    "position": "absolute",
    "top": "2px",
    "cursor": "pointer",
    "opacity": "0.75"
  });
  
  prefsIcon.css("left", "0px");
  menuIcon.css("left", "22px");
  
  details.css({
    "position": "absolute",
    "left": "52px",
    "top": "2px",
    "color": "white",
    "background": "#191919",
    "border": "1px solid #706b6b",
    "height": "19px",
    "padding": "0px 5px 0px 5px",
    "line-height": "16px",
    "opacity": "0.75"
  });
  
  details.hide();
  
  $(".icon").hover(
    function() {
      $(this).css("opacity", "1");
      details.show();
      
      if (this == menuIcon[0]) details.text("Customize your menu");
      else if (this == prefsIcon[0]) details.text("Edit your preferences");
    },
    
    function() {
      $(this).css("opacity", "0.75");
      details.hide();
    }
  );
  
  menuIcon.click(function() {
    
    var menu = top.frames[1];
    
    if (menu.location.search == "?edit=true")
      menu.location.search = "";
    else
      menu.location.search = "?edit=true";
  });
  
  prefsIcon.click(injectPrefs); 
}

// Menu
if (window.location.pathname + window.location.search == "/menu.php") {
  
  // Denote access keys
  if (getValue("denoteHotkeys"))
    GM_addStyle('a[accesskey]:hover:after { content: " [" attr(accesskey) "]"; }');
  
  var hiddenItems = getValue("hiddenItems");
  var hotkeys = getValue("hotkeys");
  
  // Remove Omerta acess keys
  $(".menuLink").removeAttr("accesskey");
  
  // Add Sleepy access keys
  for (href in hotkeys) {
    $("a[href=" + href + "]").attr("accesskey", hotkeys[href]);
  }
  
  // Hide items
  $(hiddenItems).each(function() {
    $("a[href='" + this + "']").hide();
  });
  
  $("form[action$='user.php']").submit(function() {
    
    var user = $("input[name='nick']", this);
    
    if (user.val() == "") {
      top.frames[2].location = BASE_URL + "user.php";
      return false;
    }
  });
}

// Customize Menu
if (window.location.pathname == "/menu.php" && GET["edit"]) {
  
  var hiddenItems = getValue("hiddenItems");
  var hotkeys = getValue("hotkeys");
  
  // Remove Omerta hotkeys
  $(".menuLink").removeAttr("accesskey");  
  
  // Apply hide/hotkey icons
  $(".menuLink").each(function() {
    var item = $(this);
    var href = item.attr("href");
    var row = item.parent().parent();
    
    var hidden = (hiddenItems.indexOf(href) != -1);
    var hotkey = hotkeys[href];
    
    if (hotkey) {
      item.attr("accesskey", hotkey);
      row.prepend('<td width="20"><img class="hotkeyItem" src="' + GM_getResourceURL("hotkeyActive") + '" title="Set a hotkey for this item" /></td>');
    } else {
      row.prepend('<td width="20"><img class="hotkeyItem" src="' + GM_getResourceURL("hotkey") + '" title="Set a hotkey for this item" /></td>');
    }    
    
    if (hidden) {
      row.prepend('<td width="20"><img class="hideItem" src="' + GM_getResourceURL("hideActive") + '" title="Show this item" /></td>');
      item.css("text-decoration", "line-through");
    } else {
      row.prepend('<td width="20"><img class="hideItem" src="' + GM_getResourceURL("hide") + '" title="Hide this item" /></td>');
    }
    
  });
  
  // Apply style
  $(".hideItem, .hotkeyItem").css("cursor", "pointer");
  $(".menuLink").css("padding", "3px 5px");
  
  // Denote Sleepy hotkeys
  GM_addStyle('a[accesskey]:after { content: " [" attr(accesskey) "]"; }');
  
  
  
  // Disable links
  $(".menuLink").click(function() {
    return false;
  });
  
  // Disable subnav toggling
  $("th").each(function() {
    this.removeAttribute("onclick");
  });  
  
  // Fix column span
  $(".container").attr("colspan", "3");
  
  // Visibility handler
  $(".hideItem").click(function() {
    var icon = $(this);
    var row = icon.parent().parent();
    var item = row.find(".menuLink");
    var itemIndex = hiddenItems.indexOf(item.attr("href"));
    var hidden =  (itemIndex != -1);
    
    if (!hidden) {
      item.css("text-decoration", "line-through");
      icon.attr("src", GM_getResourceURL("hideActive"));
      icon.attr("title", "Show this item");
      hiddenItems.push(item.attr("href"));
    } else {
      item.css("text-decoration", "none");
      icon.attr("src", GM_getResourceURL("hide"));
      icon.attr("title", "Hide this item");
      hiddenItems.splice(itemIndex, 1);
    }
  });
  
  
  // Hotkey handler
  $(".hotkeyItem").click(function() {
    var icon = $(this);
    var row = icon.parent().parent();
    var item = row.find(".menuLink");
    var curKey = item.attr("accesskey") || "";
    var key = prompt("Set a hotkey for '" + item.text() + "':\n(Leave text box empty to remove the hotkey)", curKey);
    
    // Prompt dialog has been cancelled
    if (key == null) return;
    
    // Recreate prompt dialog (invalid input)
    while (key.length > 1) {
      key = prompt("Set a hotkey for '" + item.text() + "':\n(Leave text box empty to remove the hotkey)", curKey);
      if (key == null) return;
    }
      
    // Add Hotkey
    if (key.length == 1) {
      icon.attr("src", GM_getResourceURL("hotkeyActive"));
      item.attr("accesskey", key.toUpperCase());
      hotkeys[item.attr("href")] = key.toUpperCase();
      
    // Remove hotkey 
    } else if (key.length == 0) {      
      item.removeAttr("accesskey");
      icon.attr("src", GM_getResourceURL("hotkey"));
      delete hotkeys[item.attr("href")];
    } 
  });
  
  // Add buttons
  var apply = $('<input id="apply" type="button" value="Apply" />');
  var cancel = $('<input id="cancel" type="button" value="Cancel" />');
  
  $(".container:last").empty();
  $(".container:last").append(apply);
  $(".container:last").append(cancel);  
  
  
  // Style buttons
  $(".container:last").css({
    "border-top": "1px solid #353535",
    "padding": "3px"
  });
  
  $("#apply, #cancel").css({
    "width": "60px",
    "margin": "3px"
  });
  
  $("#cancel").click(function() {
    window.location.search = "";
  });
  
  $("#apply").click(function() {
    //console.log(hiddenItems);
    //console.log(hotkeys);
    
    setValue("hiddenItems", hiddenItems);
    setValue("hotkeys", hotkeys);
    
    window.location.search = "";
  });
}

// Add mail shortcuts
if (window.location.search.indexOf("?module=Mail") != -1 && getValue("mailShortcuts")) {
  
  var rows = $(".color1, .color2");
	
	$(".tableitem td:eq(0)").attr("colspan", 4);
	
	// Append delete icons
	rows.each(function() {
		
		var delMsg = $("a[href*='showMsg']", this).attr("href");
		delMsg = delMsg.replace("showMsg", "delMsg");
		delMsg = delMsg.replace("iMsgId", "iId");
		
		delMsg += "&iParty=2";
		
		var column = $('<td width="25"></td>');
		column.html('<img src="../../static/images/game/messages/del.gif" title="Delete" width="22" height="22" style="cursor: pointer;" />');
		
		$("img", column).click(function() {
			window.location.href = delMsg;
		});
		
		column.insertBefore($("td", this)[0]);
		
	});
	
	// Append reply icons
	rows.each(function() {
		
		var sendMsg = $("a[href*='showMsg']", this).attr("href");
		sendMsg = sendMsg.replace("showMsg", "sendMsg");
		sendMsg = sendMsg.replace("iMsgId", "iReply");
		
		var column = $('<td width="25"></td>');
		column.html('<img src="../../static/images/game/messages/reply.gif" title="Reply" width="22" height="22" style="cursor: pointer;" />');
		
		
		$("img", column).click(function() {
			window.location.href = sendMsg;
		});
		
		column.insertBefore($("td", this)[1]);
		
	});
	
	// Append read icons
	rows.each(function() {
  	
  	var row = this;
  	var column = $('<td width="25"></td>');
  	var readIcon = $("img[src$='read.png']", row);
  	var readUrl = $("a[href*='showMsg']", this).attr("href");
  	var id = readUrl.match(/iMsgId=(\d+)/)[1];
  	
  	column.append(readIcon);
  	column.insertBefore($("td", row)[2]);
  	
  	readIcon.attr("title", "Peek");
  	readIcon.css("cursor", "pointer");
  	
		readIcon.click(function(e) {
			
  		var message = $("#" + id);
  		
  		// Message is loaded
  		if (message[0]) {
    	  if (message.is(":hidden"))
      	  message.show();
      	else
      	  message.hide();
      	  
      	return; 
  		}
  		
  		// Load message
  		readIcon.attr("value", "loading");
		
  		GM_xmlhttpRequest({
    		method: "GET",
    		url: readUrl,
    		onload: function(response) {
      		var htmlDoc = $(response.responseText);
      		var message = htmlDoc.find("tr:eq(8)");
      		
      		// Style message
      		message.find("td").attr("colspan", "8");
      		message.css("border-top", "4px solid black");
      		message.attr("id", id);
      		
      		// Mark message as read
      		row.className = "color1";
      		readIcon.attr("src", "../../static/images/game/mailbox/read.png");
      		
      		// Insert message
      		message.insertAfter(row);
    		}
    	});
    });
	});
}

if (/\?module=Travel&action=FetchInfo&CityId=\d/.test(window.location.search) && getValue("quickTravel")) {
    var travelButton = $("input[type='submit']")[0];

    if (travelButton)
        travelButton.click();
}


if (window.location.pathname == '/family.php') {
	
	// Enumerate capos
	var onlineUsers = $("a[style='color: blue;']");
	var info = $("table")[1];
	var capoRegimes = $("a[class='tableheader']");
	var capos = [];
	var capoNames = [];
	
	
	$(".subtableheader .tableheader").css({
        "background": "none",
        "font-weight": "normal",
        "border": "none",
        "color": "inherit"
    });
    
    $(".subtableheader .tableheader").removeClass("tableheader");
	
	capoRegimes.each(function() {
		
		capos.push('<a href="' + this.href + '">' + this.textContent + '</a>');
		capoNames.push(this.textContent);
		
	});
	
	
	var tr = '<tr><td class="subtableheader">Capos:</td><td class="profilerow">' + capos.join(", ") + '</td></tr>';
	
	$(info).append(tr);
	
	
	// Emphasize prominent users
	var objects = $("table")[3];
	var don = $("a:eq(0)", info).text();
	var consig = $("a:eq(1)", info).text();
	var sotto = $("a:eq(2)", info).text();
	var objectOwners = [];
	
	var users = $("table:eq(8), table:eq(9)").find("a");
	
	$("tr", objects).each(function(index) {
		if (index > 3) {
			var owner = $("td", this)[2].textContent;
			
			objectOwners.push(owner);
		}
	});
	
	users.each(function() {
		
		// Top 3 (bold)
		if ([don, sotto, consig].indexOf(this.textContent) != -1) {
			$(this).css("font-weight", "bold");
		}
		
		// Capos (underline)
		if (capoNames.indexOf(this.textContent) != -1) {
			$(this).css("text-decoration", "underline");
		}
		
		// Object owners (italic)
		if (objectOwners.indexOf(this.textContent) != -1) {
			$(this).css("font-style", "italic");
		}
		
	});
	
	$("#legend").css("float", "right");
	$("#legend").css("font-weight", "normal");
	
	// Highlight all online users
	$("a").each(function() {
		
		var user = this;
		
		onlineUsers.each(function() {
			if (this.textContent == user.textContent && user.pathname == "/user.php") {
				user.style.color = "blue";
			}
		});
			
	});
	
	// Enumerate top ranks
	if (TRABOT_STATS) {
  	
		var famId = window.location.search.match(/fam=(\d+)/)[1];
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: TRABOT_USERS + '?ver=' + window.location.hostname + '&fam=' + famId,
			headers: {
				'User-Agent': navigator.userAgent,
				'Accept': 'text/xml'
			},
			onload: function(response) {
				var ranks = [];
				var parser = new DOMParser();
				var dom = parser.parseFromString(response.responseText, 'text/xml');
				
				// Stop if there is no data to be found
				if ($("error", dom)[0]) return;
				
				$("rank", dom).each(function() {
					ranks.push(this.textContent);
				});
				
				ranks.reverse();
				
				var table = '<table width="100%"> <tr><td>Godfather/First Lady:</td><td> ' + ranks[0].bold() + ' </td></tr> <tr><td>Capodecina:</td><td> ' + ranks[1].bold() + ' </td></tr> <tr><td>Bruglione:</td><td> ' + ranks[2].bold() + ' </td></tr> <tr><td>Chief:</td><td> ' + ranks[3].bold() + ' </td></tr> <tr><td>Local Chief:</td><td> ' + ranks[4].bold() + ' </td></tr> </table>';
				var tr = '<tr><td class="subtableheader">Ranks:</td> <td class="profilerow"> ' + table + '</td></tr>';
				$(info).append(tr);
			}
		});
	}
}


// Tab management
if (["?module=Launchpad", "?module=Shop", "?module=Statistics"].indexOf(window.location.search) != -1) {
  
  function onTabLoad(tab, content) {
    
    // Add user tooltips
    addUserTooltips();
    
    // Start processing tabs (tab.search, tab.hostname)
    
    // Select cheapest blood type (blood bank)
    if (tab.search == "?module=Bloodbank&action=" && $("input[name=UnitsToBuy]")[0]) {
      var table = $("table.thinline:eq(1)");
      var bloodType;
      var bloodPrice = 9999;
      var bloodPrices = [];
      
      // Populate hash with parsed blood prices
      bloodPrices["A"] = parseInt(table.find("td:eq(11)").text().match(/\d+/g).join(""));
      bloodPrices["B"] = parseInt(table.find("td:eq(12)").text().match(/\d+/g).join(""));
      bloodPrices["AB"] = parseInt(table.find("td:eq(13)").text().match(/\d+/g).join(""));
      bloodPrices["O"] = parseInt(table.find("td:eq(14)").text().match(/\d+/g).join(""));
      
      // Loop through compatible blood types,
      // and determine cheapest type
      $("select[name=BuyType] option").each(function() {
        var type = this.value;
        var price = bloodPrices[type];
        
        if (price < bloodPrice) {
          bloodPrice = price;
          bloodType = type;
        }
      });
    
      // Select cheapest cheapest type
      $("select[name=BuyType] option[value=" + bloodType + "]").attr("selected", true);
      $("input[name=UnitsToBuy]")[0].focus();
    }
    
    if (tab.search == "?module=Statistics&action=global_stats") {
      var tables = $("table");
      var rows = tables.eq(2).find("tr:gt(2)");
      
      // Append a cross icon to dead families
      rows.each(function() {
        var cells = $("td", this);
        var node = cells.eq(3).contents()[0];
        
        if (node) {
          if (node.nodeName == "#text") // Fam is no more
            $(node).after(' <img src="/static/images/game/generic/rip.png" title="Dead family" />');
        }
      });
      
      // Add (BF) indicators to BF-kills
      for (i = 0; i < rows.length - 1; i++) {
        var curRow = rows.eq(i);
        var nextRow = rows.eq(i + 1);
        
        var curDate = parseDateString(curRow.find("td:eq(1)").text());
        var nextDate = parseDateString(nextRow.find("td:eq(1)").text());
        
        // Kills occurred at the same second, mark it as BF-kill
        if (curDate.getTime() - nextDate.getTime() == 0) {
          
          // Make sure kill isn't tagged as BF/A
          if (!curRow.has("b")[0])
            curRow.find("td:eq(0)").prepend('(<b>BF</b>) ');
            
          if (!nextRow.has("b")[0])
            nextRow.find("td:eq(0)").prepend('(<b>BF</b>) ');
            
        }
      }
    }
    
    // Status
    if (tab.pathname == "/information.php") {
      var status = $(".thinline:eq(0)");
      var waitingTimes = $(".thinline:eq(1)");
      
      var user = status.find("tr:eq(2)").find("td:eq(1)").text();
      var rank = status.find("tr:eq(7)").find("td:eq(1)").text();
      
      // Store user and rank
      setValue("user", user);
      setValue("rank", rank);      
      
      var nextFlight = waitingTimes.find("tr:eq(7)").find("td:eq(1)").text();
      
      if (/oTimer.setTime\(\d+\)/g.test(nextFlight)) {
          
          nextFlight = parseInt(nextFlight.match(/oTimer.setTime\((\d+)\)/)[1]) * 1000;
          nextFlight += new Date().getTime();
          
      } else {
          nextFlight = 0;
      }

      setValue("nextFlight", nextFlight.toString());

    }
  }
  
  
  
  
  
  
  var tabIndex, evt;
  var tabs = $(".smsmenu a[rel='smsdivcontainer']");
  
  // Check for tab switches
  function tabObserver(tab, callback) {
    var ready = !$("#smsdivcontainer img[src='/static/images/sms/loading.gif']")[0];
    
    if (ready) {
      if (callback) callback(tab, $("#smsdivcontainer"));
    } else {
      setTimeout(tabObserver, 100, tab, callback);
    }
  }
  
  var selectedTab = $(".smsmenu a.selected")[0];
  tabObserver(selectedTab, onTabLoad);
  
  $(".smsmenu a").click(function(e) {
    setTimeout(tabObserver, 100, this, onTabLoad);
  });
  
  // Add tab switching with keyboard shortcuts
  $(document).keyup(function(e) {
    if (e.ctrlKey && (e.keyCode == 37 || e.keyCode == 39)) {
      
      tabs.each(function(i) {
        if (this.className == "selected") {
          tabIndex = i;
          return false;
        }
      });
      
      evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      
      // Ctrl+LeftArrow
      if (e.keyCode == 37) {
        if (tabIndex > 0) tabIndex--;
        else tabIndex = tabs.length - 1;
        tabs[tabIndex].dispatchEvent(evt);
      }
      
      // Ctrl+RightArrow
      if (e.keyCode == 39) {
        if (tabIndex < tabs.length - 1) tabIndex++;
        else tabIndex = 0;
        tabs[tabIndex].dispatchEvent(evt);
      }
    }
  });
}

// Automatically sort users by rank
if (window.location.search == "?module=Statistics") {
    $("#stattabs a[href=/allusers.php]").attr("href", "/allusers.php?start=0&order=lastrank&sort=DESC&dead=SHOW");
}

/*
if (["?module=Crimes", "?module=Cars"].indexOf(window.location.search) != -1 && $("input[type='submit']")[0]) {
  
  // Captcha
  if ($("#imgcode")[0]) {
    $("form").submit(function() {
      var ver = $("#ver");
			if (ver.val().length != 3 || ver.val().match(/[^a-zA-Z0-9]/)) {
				ver.val("");
				ver[0].focus();
				return false;
			}
		});
	}
	
	// No captcha
	else {
  	$("input[type='submit']")[0].focus();
	}
}
*/

// Focus 'Sell car' button
if (window.location.search == "?module=Cars&action=docar") {
  var sellButton = $(":submit")[0];
  if (sellButton)
    sellButton.focus();
}

// Bank
if (window.location.pathname == "/bank.php") {
  
  var amount = $("input[name='amount']");
  var cell = amount.parent().parent().next().find("td")[0];
  var textNode = cell.childNodes[1];
  var text = textNode.textContent;
  
  amount.bind("keyup", function() {
    var netAmount = Math.round(parseInt(this.value) * 0.9);
    if (this.value != "") textNode.textContent = " (Net amount: $" + commafy(netAmount) + ")";
    else textNode.textContent = text;
  });
  
  if (GET["user"]) {
    $(":text[name=nick]").val(GET["user"]);
    $(function() {
      $(":text[name=detail]")[0].focus();
    });
  }
}

// User Profile
if (window.location.pathname == "/user.php") {
  var table = $("#user");
  var user = $("#username").attr("value");
  var status = $("#status");
  var online = status.text().indexOf("5") != -1;
  var dead = !!$("img[src='/static/images/userbadges/rip.gif']")[0];
  var url = TRABOT_ONTIME + '?name=' + user + '&ver=' + window.location.hostname;
  
  // Akill
  if (dead) var akill = !$("img[src='/static/images/userbadges/rip.gif']").parent("a[href^='forums/view-topic.php?id=']")[0];
  else var akill = false;
  if (akill) status.append(" (A-kill)");
  
  // Actions
  if (!dead && getValue("user") != user) {
    var row = $("#username").parent().parent();
    row.append(' / <a href="javascript:void(0);" id="action">Action</a>');
    
    var contextMenu;
    
    $("body").click(function(e) {
      
      if (contextMenu) {
        contextMenu.remove();
        contextMenu = undefined;
        return;
      }
      
      if (e.target.id != "action") return;
      
      var offset = $(e.target).offset();
      
      contextMenu = $('<div id="contextMenu"></div>');
      contextMenu.append('<p>Action</p>');
      contextMenu.append('<ul></ul>');
      
      contextMenu.find("ul").append('<li id="inviteHeist">Invite for heist</li>');
      contextMenu.find("ul").append('<li id="sendHPs">Send HPs</li>');
      contextMenu.find("ul").append('<li id="sendMoney">Send money</li>');
      contextMenu.find("ul").append('<li id="hireDets">Hire detectives</li>');
      contextMenu.find("ul").append('<li id="kill">Kill</li>');
      
      $("body").append(contextMenu);
      
      contextMenu.css({
        "position": "absolute",
        "left": offset.left + 50,
        "top": offset.top,
        "color": "white",
        "background": "#3F505F",
        "border": "1px solid black",
        "padding": "0px",
        "opacity": "0.95",
        "font-size": "12px",
      });
      
      contextMenu.find("p").css({
        "text-align": "center",
        "width": "100%",
        "font-weight": "bold",
        "margin": "0px",
        "padding": "5px 0px 5px 0px"
      });
      
      contextMenu.find("li").css({
        "padding": "4px 13px 4px 13px",
      });
      
      contextMenu.find("li").css({
        "list-style-type": "none",
        "cursor": "pointer",
        "border-top": "1px solid black"
      });
      
      contextMenu.find("ul").css({
        "padding": "0px",
        "margin": "0px"
      });
      
      GM_addStyle("#contextMenu li:hover { background: #4C5F6F; }");
      
    });
    
    $("#contextMenu li").live("click", function() {
      switch (this.id) {
        case "inviteHeist":
          window.location = BASE_URL + "BeO/webroot/index.php?module=Heist&action=&driver=" + user;
          break;
        case "sendHPs":
          window.location = BASE_URL + "honorpoints.php?user=" + user;
          break;
        case "sendMoney":
          window.location = BASE_URL + "bank.php?user=" + user;
          break;                    
        case "hireDets":
          window.location = BASE_URL + "kill.php?action=hireDets&user=" + user;         
          break;
        case "kill":
          window.location = BASE_URL + "kill.php?action=kill&user=" + user;         
          break;
      }
    });
  }  
    
  if (TRABOT_STATS) {
    // Ontime & Offtime
    if (!dead) {
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
          "User-Agent": navigator.userAgent,
          "Accept": "text/html",
        },
      
        onload: function(response) {
          
          if ($("error", response.responseText)[0]) return;
          
          var now = Math.floor(new Date().getTime() / 1000);
          var lastSeen = parseInt($("time", response.responseText).text());
          var ontime = parseInt($("total", response.responseText).text());
          
          if (online) {
            status.append(" (" + duration(ontime).bold() + " total)");
          }
          
          else if (lastSeen > 0) {
            status.append(" (Offline for " + duration(now - lastSeen).bold() + ")");
          }
        }
      });
    }
    
    // History
    var row = $("#username").parent().parent();
    var url = TRABOT_HISTORY + '?name=' + user + '&ver=' + window.location.hostname;
    row.append(' / <a href="' + url + '">History</a>');
  }
}

// Smuggling
if (window.location.pathname == "/smuggling.php" && getValue("smuggling")) {
  
  // Elements references
  var info = $("td:eq(0)");
  var tables = $("table:eq(1), table:eq(2)");
  var rows = tables.find("tr:gt(2):lt(7)");
  var boozeRows = $("table:eq(1)").find("tr:gt(2):lt(7)");
  var narcsRows = $("table:eq(2)").find("tr:gt(2):lt(7)");
  var boozeInputs = boozeRows.find("input[type=text]");
  var narcsInputs = narcsRows.find("input[type=text]");
  var captcha = $("#imgcode");
  
  // Parse data
  var currentCity = CITIES.indexOf($("#city").attr("value"));
  var maxUnits = [];
  maxUnits["booze"] = parseInt(info.find("span:eq(0)").text().match(/\d+/)[0]);
  maxUnits["narcs"] =  parseInt(info.find("span:eq(1)").text().match(/\d+/)[0]);
  
  var multiplier = parseInt($("#lexhelpsyou").text().match(/\d+/)); 
  if (isNaN(multiplier))
      multiplier = 0;
  multiplier = (multiplier / 100) + 1;
  
  // Helper functions
  function focusSubmit() {
    var inputVer = $("input[name=ver]")[0];
    var inputSubmit = $("input[type=submit]")[0];
    
    if (inputVer)
      inputVer.focus();
    else
      inputSubmit.focus();
  }
  
  function fill(textbox) {
    var textbox = $(textbox);
    var unitsInPocket = parseInt(textbox.parent().next().next().text());
    var BNType = $.contains(tables[0], textbox[0]) ? "booze" : "narcs";
    
    if (unitsInPocket > 0)
      textbox.val(unitsInPocket);
    else
      textbox.val(maxUnits[BNType]);
      
    focusSubmit();
  }
  
  function toggle(textbox) {
    var textbox = $(textbox);
    var unitsInPocket = parseInt(textbox.parent().next().next().text());
    var units = parseInt(textbox.val());
    
    if (units == 0)
      fill(textbox);
    else
      textbox.val(0);
      
    focusSubmit();
  }
  
  
  // Adjust lay-out
  info.find("span, a, br").remove();
  $("h3:eq(0)").wrapInner('<a href="prices.php"><b></b></a>');
  
  tables.find("tr:first").prepend('<td class="tableheader"></td>');
  tables.find("tr:first").find("td:eq(2)").after('<td class="tableheader"></td>');
  tables.find("td:last").before('<td></td>');
  $("td[bgcolor=black][colspan]").attr("colspan", 10);
  
  
  // Highlight units in pocket
  rows.each(function() {
    var row = $(this);
    var cells = row.find("td");
    
    if (cells.eq(2).text() != "0")
      cells.eq(2).css("font-weight", "bold");
  });
  
  // Checkboxes
  rows.prepend('<td align="center" width="25"><input type="checkbox" class="fill" title="Permanently fill units" /></td>');
  
  $(":checkbox.fill").click(function() {
    var row = $(this).parent().parent();
    var textbox = row.find(":text");
    var type = textbox.attr("name");
    var table = $(this).parents("table.thinline");
    var checkbox = this;
    var BNType = $.contains(tables[0], textbox[0]) ? "booze" : "narcs";
    
    table.find(":checkbox").each(function() {
      if (this != checkbox && this.checked) {
        this.checked = false;
        $(this).parent().parent().find(":text").val(0);
      }
    });
    
    if (this.checked) {
      fill(textbox);
      BNType == "booze" ? setValue("autoBooze", type) : setValue("autoNarcs", type);
    } else {
      textbox.val(0);
      BNType == "booze" ? GM_deleteValue("autoBooze") : GM_deleteValue("autoNarcs");
    }
  });  
  
  // Fill links
  rows.find("td:eq(1)").wrapInner('<a href="javascript:void(0);" title="Fill Units" class="fill"></a>');
  
  $("a.fill").click(function() {
    var row = $(this).parent().parent();
    var textbox = row.find(":text");
    toggle(textbox);
  });
  
  // Fill icons
  rows.find("td:eq(2)").after('<td width="16"><img src="' + GM_getResourceURL("fill") + '" title="Fill units" class="fill" /></td>');
  rows.find("td:eq(2)").attr("width", 1);
  rows.find("td:eq(2)").attr("align", "right");
  
  $("img.fill").css({
    "display": "none",
    "cursor": "pointer"
  });
  
  
  rows.find("td:gt(1):lt(2)").hover(
    function() {
      $(this).parent().find("img.fill").show();
    },
    function() {
      $(this).parent().find("img.fill").hide();
    }
  );
  
  $("img.fill").click(function() {
    var row = $(this).parent().parent();
    var textbox = row.find(":text");
    toggle(textbox);
  });
  
  
  
  tables.eq(0).find(".tableheader:eq(4)").append(" (" + maxUnits["booze"] + ")");
  tables.eq(1).find(".tableheader:eq(4)").append(" (" + maxUnits["narcs"] + ")");
  
  /*
  if (lexBonus > 0) {
    tables.eq(0).find(".tableheader:eq(6)").append(" (+" + lexBonus + "%)");
    tables.eq(1).find(".tableheader:eq(6)").append(" (+" + lexBonus + "%)");
  }
  */
  
  focusSubmit();
  
  // Remember auto booze/narcs options
  var autoBooze = getValue("autoBooze");
  var autoNarcs = getValue("autoNarcs");
  
  if (autoBooze) {
    var textbox = $(":text[name=" + autoBooze + "]");
    var row = textbox.parent().parent();
    var checkbox = row.find(":checkbox.fill");
    
    checkbox.attr("checked", true);
    fill(textbox);
  }
  
  if (autoNarcs) {
    var textbox = $(":text[name=" + autoNarcs + "]");
    var row = textbox.parent().parent();
    var checkbox = row.find(":checkbox.fill");
    
    checkbox.attr("checked", true);
    fill(textbox);
  }  
  
  // Global options
  info.append('<p><a href="javascript:alert(\'Prices have not been loaded yet.\');" id="buy" title="Buy units that will yield maximum profit">[Buy best]</a> &mdash; <a href="javascript:void(0);" id="sell" title="Sell all units in pocket">[Sell all]</a> &mdash; <a href="javascript:void(0);" id="reset" title="Reset all text fields">[Reset]</a>');
  
  $("#sell").click(function() {
    
    rows.each(function() {
      var textbox = $("input[type=text]", this);
      var units = $("td:eq(4)", this).text();
      textbox.val(units);
    });
    
    focusSubmit();
    
    if (!captcha[0])
        $("form")[0].submit();
  });
  
  $("#reset").click(function() {
    boozeInputs.val(0);
    narcsInputs.val(0);
    focusSubmit();
  });
  
  
  // Load Omerta prices
  $.get(PRICES, function(data) {
    
    // Retrieve cities from XML page
    var cities = $("city", data);
    var boozePrices = [], narcsPrices = [];
    var boozeProfits = [], narcsProfits = [];
    
    // Create a table
    var table = $('<table class="thinline" width="500"></table>');
    table.append('<tr style="border-bottom: 3px solid black;"><td class="tableheader">City</td><td class="tableheader">Coke Price</td><td class="tableheader">Best Profit</td><td class="tableheader" colspan="2"></td></tr>');
    table.css("margin-bottom", "50px");
    $(".tableheader", table).css("text-align", "left");
    $("body").append(table);
    
    // Parse and store all prices
    cities.each(function() {
      boozePrices.push([parseInt($("wine", this).text()), parseInt($("cognac", this).text()), parseInt($("whiskey", this).text()), parseInt($("amaretto", this).text()), parseInt($("beer", this).text()), parseInt($("port", this).text()), parseInt($("rum", this).text())]);
      narcsPrices.push([parseInt($("morphine", this).text()), parseInt($("heroin", this).text()), parseInt($("opium", this).text()), parseInt($("cocaine", this).text()), parseInt($("marijuana", this).text()), parseInt($("tobacco", this).text()), parseInt($("glue", this).text())]);
    });
    
    // Calculate best profits for each city
    var bestProfit = 0, mostProfitableCity;
    
    cities.each(function(index) {
      var narcsProfit = 0, narcsType = null;
      var boozeProfit = 0, boozeType = null;
      
      $(narcsPrices[index]).each(function(i) {
        var type = i;
        var price1 = narcsPrices[currentCity][i];
        var price2 = parseInt(this * multiplier);
        var profit = Math.max(price2 - price1, 0);
        
        if (profit > narcsProfit) {
          narcsProfit = profit;
          narcsType = type;
        }
      });
      
      $(boozePrices[index]).each(function(i) {
        var type = i;
        var price1 = boozePrices[currentCity][i];
        var price2 = parseInt(this * multiplier);
        var profit = Math.max(price2 - price1, 0);
        
        if (profit > boozeProfit) {
          boozeProfit = profit;
          boozeType = type;
        }
      });
      
      var profit = (maxUnits["narcs"] * narcsProfit) + (maxUnits["booze"] * boozeProfit);
      if (profit > bestProfit) {
          bestProfit = profit;
          mostProfitableCity = index;
      }  
      
      //console.log(CITIES[index] + " => " + BOOZE_TYPES[boozeType] + " & " + NARCS_TYPES[narcsType]);
      
      narcsProfits.push([narcsType, narcsProfit]);
      boozeProfits.push([boozeType, boozeProfit]);
    });

    // Populate table with rows (city, coke price, best profit, shortcuts)
    cities.each(function(index) {
      var city = $(this);
      var cokePrice = "$" + commafy(city.find("cocaine").text());
      var totalProfit = "$" + commafy((narcsProfits[index][1] * maxUnits["narcs"]) + (boozeProfits[index][1] * maxUnits["booze"]));
      var row = $('<tr class="city" value="' + index + '"></tr>');
      table.append(row);
      
      row.append('<td>' + CITIES[index] + '</td>');
      row.append('<td>' + cokePrice + '</td>');
      row.append('<td>' + totalProfit + '</td>');
      row.append('<td width="20"><img class="fill" src="' + GM_getResourceURL("fill") + '" title="Fill units" />');

      // Disable travel shortcut since it's using a session token now
      //row.append('<td width="20"><img class="travel" src="' + GM_getResourceURL("travel") +'" title="Travel" />');
      
      row.find(".fill, .travel").css("cursor", "pointer");
      row.find(".fill, .travel").hide();
      row.css("height", "20px");
      
      if (index == currentCity) row.css("font-weight", "bold");
      
    });
    
    // Highlight high & low coke
    var highCoke = 0, lowCoke = 99999;
    var highCokeCity, lowCokeCity;
    cities.each(function(i) {
      var cokePrice = parseInt($("cocaine", this).text());
      
      if (cokePrice > highCoke) {
        highCoke = cokePrice;
        highCokeCity = i;
      }
      
      if (cokePrice < lowCoke) {
        lowCoke = cokePrice;
        lowCokeCity = i;
      }
    });
    
    $("tr[value=" + highCokeCity + "] td:eq(1)").addClass("loss");
    $("tr[value=" + lowCokeCity + "] td:eq(1)").addClass("profit");
    
    // Highlight best profit
    $("tr[value=" + mostProfitableCity + "] td:eq(2)").addClass("loss");
    
    // Create profit details row
    var details = $('<tr><td colspan="4" align="center"></td></tr>');
    table.append(details);
    details.css("border-top", "1px solid black");
    details.find("td").css("padding", "5px");
    details.hide();
    
    // Display details row on hover
    $(".city").hover(
    
      // Mouse in
      function() {
        var i = $(this).attr("value");
        var cell = details.find("td");
        details.show();
        $(this).addClass("color2");
        $(this).css("outline", "black solid 1px");
        $(".fill, .travel", this).show();
        
        /*
        console.log("------------------------------");
        console.log(CITIES[i]);
        console.log(narcsProfits[i]);
        console.log(boozeProfits[i]);
        console.log("------------------------------");
        */
        
        // Current city
        if (i == currentCity) {
          cell.html('You are currently in ' + CITIES[i] + '.');
          return;
        }
        
        // No profit
        else if (boozeProfits[i][0] == null && narcsProfits[i][0] == null) {
          cell.html('No profitable booze/narcotics combination.');
          return;
        }
        
        // Only booze profit  
        else if (narcsProfits[i][0] == null) {
          cell.html('<b>' + maxUnits["booze"] + '</b> ' + BOOZE_TYPES[boozeProfits[i][0]] + ' (<b>$' + commafy(boozeProfits[i][1]) + '</b>)');
        }
        
        // Only narcs profit
        else if (boozeProfits[i][0] == null) {
          cell.html('<b>' + maxUnits["narcs"] + '</b> ' + NARCS_TYPES[narcsProfits[i][0]] + ' (<b>$' + commafy(narcsProfits[i][1]) + '</b>)');
        }
        
        // Both booze and narcs profit
        else {
          cell.html('<b>' + maxUnits["booze"] + '</b> ' + BOOZE_TYPES[boozeProfits[i][0]] + ' (<b>$' + commafy(boozeProfits[i][1]) + '</b>)' + ' & ' + '<b>' + maxUnits["narcs"] + '</b> ' +  NARCS_TYPES[narcsProfits[i][0]] + ' (<b>$' + commafy(narcsProfits[i][1]) + '</b>)');
        }
        
        var totalProfit = (maxUnits["booze"] * boozeProfits[i][1]) + (maxUnits["narcs"] * narcsProfits[i][1]);
        cell.append('<p>Gross profit: <b>$' + commafy(totalProfit) + '</b></p>');        
        
      },
      
      // Mouse out
      function() {
        details.hide();
        $(this).removeClass("color2");
        $(this).css("outline", "none");
        $(".fill, .travel", this).hide();
      }
    );    
    
    
    // Travel shortcuts
    $(".travel", table).click(function(e) {
      var cityId = $(this).parents(".city").attr("value");
      var nextFlight = getValue("nextFlight");
      var now = new Date().getTime();
      
      if (nextFlight > now) {
          var eta = (nextFlight - now) / 1000;
          alert("You can travel again in: " + duration(eta));
          return;
      }
      
      if (confirm("Are you sure you want to travel to " + CITIES[cityId] + "?")) {
        GM_xmlhttpRequest({
          method: "GET",
          url: BASE_URL + "BeO/webroot/index.php?module=Travel&action=TravelNow&City=" + cityId,
          onload: function(response) {
            var htmlDoc = $(response.responseText);
            var result = htmlDoc.find("font[color=red]").text();
            $("#travel_cityname", top.frames[1].document).text(CITIES[cityId]);
            window.location = "?travel=true&result=" + encodeURI(result);
          }
        });
      }
    });    
    
    // Fill shortcuts
    $(".fill", table).click(function(e) {
      var cityId = $(this).parents(".city").attr("value");
      var boozeType = boozeProfits[cityId][0];
      var narcsType = narcsProfits[cityId][0];
      var boozeInput = boozeInputs.eq(boozeType);
      var narcsInput = narcsInputs.eq(narcsType);
      var boozeUnits = parseInt(boozeInput.parent().next().next().text());
      var narcsUnits = parseInt(narcsInput.parent().next().next().text());
      
      boozeInputs.val(0);
      narcsInputs.val(0);
      
      if (boozeType != null && boozeUnits == 0)
        fill(boozeInput);
        
      if (narcsType != null && narcsUnits == 0)
        fill(narcsInput);
        
      focusSubmit();
    });
    
    // Buy shortcut
    $("#buy").attr("href", "javascript:void(0);");
    
    $("#buy").click(function() {
        var boozeType = boozeProfits[mostProfitableCity][0];
        var narcsType = narcsProfits[mostProfitableCity][0];
        var boozeInput = boozeInputs.eq(boozeType);
        var narcsInput = narcsInputs.eq(narcsType);
        var boozeUnits = parseInt(boozeInput.parent().next().next().text());
        var narcsUnits = parseInt(narcsInput.parent().next().next().text());        
        
        boozeInputs.val(0);
        narcsInputs.val(0);
        
      if (boozeType != null && boozeUnits == 0)
        fill(boozeInput);
        
      if (narcsType != null && narcsUnits == 0)
        fill(narcsInput);
        
      focusSubmit();
        
      if (!captcha[0])
        $("form")[0].submit();        
    });
    
  });
  
  // Display travel result
  if (GET["travel"]) {
    var result = decodeURI(GET["result"]);
    
    $("body").prepend('<div id="travelResult">' + result + '</div>');
    
    $("#travelResult").css({
      "color": "red",
      "font-weight": "bold"
    });
  }
  
}

// Sleepy logo
if (window.location.pathname == "/pic.php" && getValue("logo")) {
  
  // Remove Omerta logo
  $("img").remove();
  
  // Add our own logo
  var logo = $('<img title="Sleepy ' + SLEEPY_VERSION + '" src="' + GM_getResourceURL("logo") + '" />');
  $("#topbar").append(logo);
  
  logo.css({
    "cursor": "pointer",
    "margin": "18px 0px 0px 5px",
  });
  
  logo.click(function() {
    open(SLEEPY_WEBSITE);
  });
}

// In jail
if (window.location.pathname == "/iminjail.php") {
  var joe = $("#joe")[0];
  var bailButton = $(":submit[name=buymeout]")[0];
  var bustButton = $(":submit")[1];
  
  if (bustButton) {
    bustButton.focus();
  }
  
  else if (bailButton) {
    bailButton.focus();
  }
  
  else if (joe) {
      
  }
}

// Obay
if (window.location.pathname == "/obay.php") {
  
  // Individual auction
  if (GET["specific"]) {
    var bidAnonymously = getValue("bidAnonymously");
    
    $("input[name='bid']")[0].focus();
    
    if (bidAnonymously)
      $("input[name='anon'][value='0']").attr("checked", "true");
    else
      $("input[name='anon'][value='1']").attr("checked", "true");
    
    $("input[name='anon']").click(function() { $("input[name='bid']")[0].focus(); });
    $("input[name='anon'][value='0']").click(function() { setValue("bidAnonymously", true); });
    $("input[name='anon'][value='1']").click(function() { setValue("bidAnonymously", false); });
    
    // Quick bid
    if (GET["action"] == "bid") {
      $("form")[0].submit();
    } 
  }
  
  // Auctions overview
  else {
    
    var table = $("table:eq(2)");
    var header = table.find(".tableitem:eq(0)");
    var auctions = $(".one, .two, .three");
    
    // Add quick bid links
    $("td[colspan=6]").attr("colspan", 7);
    $("td[colspan=5]").attr("colspan", 6);
    header.append('<td>Bid</td>');
    
    auctions.each(function() {
      var auction = $(this);
      var auctionId = auction.find("a[href^='obay.php?specific=']")[0].search.match(/specific=(\d+)/)[1];
      var auctionUrl = "obay.php?specific=" + auctionId + "&action=bid";
      
      auction.append('<td><a href="' + auctionUrl + '" title="Bid on this auction (minimum bid)">Bid</a></td>');
    });
    
    // Add price per bullet on bullet auctions
    
    // User selected bullets as auction type
    if (GET["type"] == "11") {
      auctions.each(function() {
        var row = $(this);
        var cells = row.find("td");
        var bullets = parseInt(cells.eq(1).text());
        var price = parseInt(cells.eq(2).text().match(/\d/g).join(""));
        var pricePerBullet = Math.round(price / bullets);
        
        cells.eq(1).append(" ($" + commafy(pricePerBullet) + ")");
      });
    }
    
    // No auction type is selected
    else {
      $("tr[value=10]").each(function() {
        var row = $(this);
        var cells = row.find("td");
        var bullets = parseInt(cells.eq(2).text());
        var price = parseInt(cells.eq(3).text().match(/\d/g).join(""));
        var pricePerBullet = Math.round(price / bullets);
        
        cells.eq(2).append(" ($" + commafy(pricePerBullet) + ")");
      });
    }
  }
}

// Garage
if (window.location.pathname == "/garage.php" && getValue("garageShortcuts")) {
  var rows = $("tr.thinline, tr.color2");
  var header = $("tr:first");
  var checkboxes = rows.find("input[name^='carid']");
  var lockedCars = getValue("lockedCars");
  var table = $("table.thinline");
  
  var imgRepair = $('<img src="' + GM_getResourceURL("repair") + '" title="Repair" />');
  var imgSell = $('<img src="' + GM_getResourceURL("sell") + '" title="Sell" />');
  var imgSafehouse = $('<img src="' + GM_getResourceURL("safehouse") + '" title="Safehouse" />');
  var imgFlag = $('<img src="' + GM_getResourceURL("flag") + '" title="Flag" />');
  var imgAction = $('<img src="' + 'http://sleepy.trabot.net/dl/resources/action.png' + '" title="Action" />');
  
  var shortcuts = imgRepair.add(imgSell).add(imgSafehouse).add(imgFlag);
  shortcuts.css("cursor", "pointer");
  
  rows.hover(
    function() {
        shortcuts.show();
        $("td", this).eq(6).append(imgRepair);
        $("td", this).eq(7).append(imgSell);
        $("td", this).eq(8).append(imgSafehouse);
        $("td", this).eq(9).append(imgFlag);
    },
    function() {
        shortcuts.hide();
        
    }
  );  
  
  checkboxes.parent().attr("width", 16);
  $("td:last", rows).before('<td width="16"></td><td width="16"></td><td width="16"></td><td width="16"></td>');
  $("td:last", header).before('<td width="16" class="tableheader" colspan="4"></td>');
  
  
  // Shortcut handlers
  imgRepair.click(function() {
      var row = $(this).parent().parent();
      
      // Select car
      checkboxes.attr("checked", false);
      row.find(":checkbox").attr("checked", true);
      
      // Repair car
      $("form[name=cars]").append('<input type="hidden" name="repair" />');
      $("form[name=cars]")[0].submit();
  });
  
  imgSell.click(function() {
      var row = $(this).parent().parent();
      
      // Select car
      checkboxes.attr("checked", false);
      row.find(":checkbox").attr("checked", true);
      
      // Sell car
      $("form[name=cars]").append('<input type="hidden" name="sell" />');
      $("form[name=cars]")[0].submit();
  });
  
  imgSafehouse.click(function() {
      var row = $(this).parent().parent();
      var inSafehouse = (row.find(":hidden[name^=carsafe]").val() == 1);
      
      // Select car
      checkboxes.attr("checked", false);
      row.find(":checkbox").attr("checked", true);
      
      // Unsafehouse car
      if (inSafehouse)
          $("form[name=cars]").append('<input type="hidden" name="unsafehouse" />');
          
      // Safehouse car
      else
          $("form[name=cars]").append('<input type="hidden" name="safehouse" />');
          
      $("form[name=cars]")[0].submit();
  });
  
  
  // Flag car
  var contextMenu;
  
  $("body").click(function(e) {
    
    if (contextMenu) {
      contextMenu.remove();
      contextMenu = undefined;
      return;
    }
    
    if (e.target != imgFlag[0]) return;
    
    var row = $(e.target).parents("tr");
    var checkbox = row.find("input[name^='carid']");
      
    contextMenu = $('<div id="contextMenu"></div>');
    contextMenu.append('<p>Flag Car</p>');
    contextMenu.append('<ul></ul>');
    
    contextMenu.find("ul").append('<li id="flagHeistCar">Heist</li>');
    contextMenu.find("ul").append('<li id="flagOCCar">OC/MOC</li>');
    contextMenu.find("ul").append('<li id="flagRaidCar">Raid</li>');
    contextMenu.find("ul").append('<li id="clearRoles">(Clear roles)</li>');
    
    $("body").append(contextMenu);
    
    var offset = $(e.target).offset();
    
    contextMenu.css({
      "position": "absolute",
      "left": offset.left - 110,
      "top": offset.top,
      "color": "white",
      "background": "#3F505F",
      "border": "1px solid black",
      "padding": "0px",
      "opacity": "0.95",
      "font-size": "12px",
    });
    
    contextMenu.find("p").css({
      "text-align": "center",
      "width": "100%",
      "font-weight": "bold",
      "margin": "0px",
      "padding": "5px 0px 5px 0px"
    });
    
    contextMenu.find("li").css({
      "padding": "4px 13px 4px 13px",
    });
    
    contextMenu.find("li").css({
      "list-style-type": "none",
      "cursor": "pointer",
      "border-top": "1px solid black"
    });
    
    contextMenu.find("ul").css({
      "padding": "0px",
      "margin": "0px"
    });
    
    GM_addStyle("#contextMenu li:hover { background: #4C5F6F; }");
    
    $("li", contextMenu).click(function() {
      
      checkboxes.attr("checked", false);
      checkbox.attr("checked", true);
      
      switch (this.id) {
        case "flagHeistCar":
          $("input[name='heist']")[0].click();
          break;
        case "flagOCCar":
          $("input[name='oc']")[0].click();
          break;
        case "flagRaidCar":
          $("input[name='raid']")[0].click();
          break;
        case "clearRoles":
          $("input[name='clearroles']")[0].click();
          break;
      }
    });
  });
  
  /*
  $(".lockCar").click(function() {
    var row = $(this).parents("tr");
    var checkbox = row.find("input[name^='carid']");
    var carId = parseInt(row.find("td:first").text());
    var carIndex = lockedCars.indexOf(carId);
    
    if (carIndex == -1) {
      lockedCars.push(carId);
      this.src = GM_getResourceURL("unlock");
      this.title = "Unlock this car";
      checkbox.attr("disabled", true);
      
    } else {
      lockedCars.splice(carIndex);
      this.src = GM_getResourceURL("lock");
      this.title = "Lock this car";
      checkbox.attr("disabled", false);
    }
    
    setValue("lockedCars", lockedCars);
  });
  
  $("input[type='button']:first").click(function() {
    checkboxes.each(function(i) {
      var inSafehouse = $("input[name='carsafe[" + i + "]']").val() == 1;
      
      if (this.disabled || inSafehouse)
        return true;
      
      this.checked = true;
    });
  });  
  
  */
  
  // Car statistics
  var row = $('<tr><td></td></tr>');
  var iCars = rows.length;
  var totalDmg = 0;
  var totalValue = 0;
  
  rows.each(function() {
      var row = $(this);
      var dmg = parseInt(row.find("td:eq(2)").text().match(/\d+/)[0]);
      var value = parseInt(row.find("td:eq(3)").text().match(/\d/g).join(""));
      
      totalDmg += dmg;
      totalValue += value;
  });
  
  var avgDmg = (iCars == 0 ? 0 :Math.round(totalDmg / iCars));
  
  row.css({
      "font-style": "italic",
      "border-top": "1px solid black"
  });
  table.find("tr:last").before(row);
  
  row.append('<td>' + iCars + ' total</td>');
  row.append('<td>' + avgDmg + '% average</td>');
  row.append('<td>$' + commafy(totalValue) + ' total</td>');
  row.append('<td></td><td colspan="7">' + commafy(iCars * 12) + ' potential bullets</td>');
  
  // Car types
  rows.each(function() {
      var row = $(this);
      var aCar = row.find("a[href^=carinfo.php?car=]");
      var carId = parseInt(aCar.attr("href").match(/car=(\d+)/)[1]);
      
      if (HEIST_CARS.indexOf(carId) != -1) {
          aCar.append(' <span class="carType">(Heist)</span>');
          aCar.css("border-bottom", "1px solid " + $("body").css("color"));
      }
      
      if (OC_CARS.indexOf(carId) != -1) {
          if (MOC_CARS.indexOf(carId) == -1)
            aCar.append(' <span class="carType">(OC)</span>');
          else
            aCar.append(' <span class="carType">(OC/MOC)</span>');
            
          aCar.css("border-bottom", "1px solid " + $("body").css("color"));
      }
      
  });
  
  $(".carType").css("font-size", "8.5px");
  
  
  // Advanced car filter
  var filter = $('<table id="filter"></table>');
  $("td:last", table).append(filter);
  
  //filter.append('<tr><th colspan="2">Car filter</th></tr>');
  
  filter.append('<tr><th colspan="2">Types</th></tr>');
  filter.append('<tr><td><label><input type="checkbox" checked="true" id="oc" /> OC</label></td> <td><label><input type="checkbox" checked="true" id="moc" /> MOC</label></td></tr>');
  filter.append('<tr><td><label><input type="checkbox" checked="true" id="heist" /> Heist</label></td> <td><label><input type="checkbox" checked="true" id="other" /> Other</label></td></tr>');
  
  filter.append('<tr><th colspan="2">Value range</th></tr>');
  filter.append('<tr><td><input type="text" value="0" id="minValue" /></td> <td><input type="text" value="5000" id="maxValue" /></td></tr>');
  
  filter.append('<tr><th colspan="2">Damage range</th></tr>');
  filter.append('<tr><td><input type="text" value="0" id="minDamage" /></td> <td><input type="text" value="100" id="maxDamage" /></td></tr>');
  
  filter.append('<tr><td colspan="2" align="center"><input type="button" id="apply" value="Filter cars" /></td></tr>');
  
  filter.css({
      "margin": "8px"
  });
  
  $("#filter th").css({
      "font-size": "12px",
      "border": "1px solid black",
      "padding": "2px 0px 2px 0px",
      "background": "#b2b2b2",
      "color": "black"
  });
  
  $("#filter :text").css({
      "padding": "1px",
      "color": "black",
      "border": "1px solid black",
      "font-size": "12px",
      "background": "#e1e1e1",
      "width": "75px"
  });
  
  $("#filter :button").css({
      "padding": "2px",
      "color": "black",
      "font-size": "12px",
      "background": "#e1e1e1",
  });  
  
  function applyFilter() {
      
      // Car types
      var oc = $("#oc")[0].checked;
      var moc = $("#moc")[0].checked;
      var heist = $("#heist")[0].checked;
      var other = $("#other")[0].checked;
      
      // Car IDs
      var carIds = [];
      if (oc)
        carIds = carIds.concat(OC_CARS);
        
      if (moc)
        carIds = carIds.concat(MOC_CARS);
        
      if (heist)
        carIds = carIds.concat(HEIST_CARS);
        
      if (other) {
          for (i = 1; i <= 54; i++) {
              var ids = OC_CARS.concat(MOC_CARS).concat(HEIST_CARS);
              if (ids.indexOf(i) == -1) {
                  carIds.push(i);
              }
          }
      }
      
      // Value
      var minValue = parseInt($("#minValue").val());
      var maxValue = parseInt($("#maxValue").val());
      
      // Damage
      var minDamage = parseInt($("#minDamage").val());
      var maxDamage = parseInt($("#maxDamage").val());
        
      checkboxes.attr("checked", false);        
      
      // Loop through cars and apply checks
      checkboxes.each(function() {
          var checkbox = $(this);
          var row = checkbox.parents("tr");
          var carId = parseInt(row.find("a[href^=carinfo.php?car=]").attr("href").match(/car=(\d+)/)[1]);
          var value = toInt(row.find("td:eq(3)").text());
          var damage = parseInt(row.find("td:eq(2)").text().match(/\d+%/));
          
          if (carIds.indexOf(carId) == -1)
            return;
            
          if (value < minValue || value > maxValue)
            return;
            
          if (damage < minDamage || damage> maxDamage)
            return;
            
          checkbox.attr("checked", true);
      });
  }
  
  $("#apply").click(applyFilter);
}

// Spot Raids
if (GET["module"] == "Spots" && getValue("spotsOverview") && $("#map")[0]) {
  var spots = $("div[id^=spot_default_]");
  var tooltips = $("div[id^=tooltip_default_]");
  var table = $('<table class="thinline" width="600"></table>');
  
  $("#legend").remove();
  $("b:eq(0)").remove();
  tooltips.remove();
  
  $("#map").removeAttr("style");
  
  table.append('<tr style="border-bottom: 3px solid black;"><td class="tableheader"><b>Spot</b></td><td class="tableheader"><b>Protection</b></td><td class="tableheader"><b>Profit left</b</td><td class="tableheader"><b>Benefits</b></td><td class="tableheader"></td></tr>');
  
  $(".tableheader", table).css("text-align", "left");
  
  $("body").prepend(table);
  
  spots.each(function() {
    var spot = $(this);
    var row = $('<tr></tr>');
    var rows = spot.find("tr");
    var name = spot.find("b:first").text();
    var profit = rows.eq(2).find("td:last").text();
    var protection = rows.eq(3).find("div[id^=jsprogbar_div_protection_]").text() + "%";
    var benefits = rows.eq(6).find("td:last").text();
    var spotId = spot.attr("id").match(/\d+/);
    
    row.append('<td>' + name+ '</td>');
    row.append('<td>' + protection+ '</td>');
    row.append('<td>' + profit + '</td>');
    row.append('<td>' + benefits + '</td>');
    
    
    
    row.append('<td><a class="openSpot" href="javascript:Spots.click(' + spotId + ');">Open Spot</a></td>');
    table.append(row);
    
    
    spot.parent().next().remove();
    spot.parent().removeAttr("style");
    spot.parent().hide();
    spot.parent().css({
        "width": "600px",
        "margin": "auto"
    });
    
    //spot.css("text-align", "center");
    //spot.find("table").css("margin", "auto");
    
    
    
  });
}

// News frame
if (window.location.pathname == "/info.php") {
  
  // Style news items
  GM_addStyle(".newsItem { font: 11px Verdana, Arial, Helvetica, sans-serif; display: block; margin: 5px 10px 5px 10px; padding: 5px 5px 10px 5px; border-bottom: 1px solid #BFBFBF; }");
  
  $(".newsheader").css("border-bottom", "1px solid #BFBFBF");
  $("#newsmore").css("border", "none");
  
  $(".more").css({
    "font": "inherit"
  });
  
  $(".story a").addClass("newsItem");
  
  $(".newsheader").after($(".story a"));
  $("div[id=news]").remove();
  
  $("#newsmore a").removeClass("menuLink");
  
  
  // Add time since last vote
  var lastVote, time;
  $("a[href=./vfo.php]").append('<div id="lastVote"></div>');
  
  function showLastVote() {
    time = new Date().getTime();
    lastVote = getValue("lastVote");
    
    if (lastVote)
      $("#lastVote").text("(" + duration((time - lastVote) / 1000) + ")");
    
  }
  
  setInterval(showLastVote, 1000);
  showLastVote();
  
  
  // Add TraBot news items & general discussion links
  if (TRABOT_NEWS && getValue("news")) {
    GM_xmlhttpRequest({
      method: "GET",
      url: TRABOT_RSS_FEED + "?v=" + OMERTA_VERSION,
      onload: function(response) {
        
        var xmlParser = new DOMParser();
        var rss = xmlParser.parseFromString(response.responseText, "text/xml");
        
        var newsItems = [];
        var OmertaItems = $(".newsItem");
        
        // Omerta news items
        OmertaItems.each(function(index) {
          var title = this.childNodes[2].textContent;
          var link = this.href;
          var year = new Date().getFullYear();
          var dayOfMonth = this.childNodes[0].textContent.split("-")[0];
          var month = this.childNodes[0].textContent.split("-")[1] - 1;
          var date = new Date(year, month, dayOfMonth);
          var formattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
          
          newsItems.push([date, $('<a href="' + link + '" target="main" onmousedown="return false;" class="newsItem">' + formattedDate + ' (Omerta)<br />' + title + '</a>')]);
        });
        
        // TraBot news items  
        $("item", rss).each(function() {
         
          var title = $("title", this).text();
          var description = $("description", this).text();
          var link = $("link", this)[0].textContent;
          var sDate = $("pubDate", this).text();
          var id = $("quid", this).text();
          var date = new Date(sDate);
          var formattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
          
          newsItems.push([date, $('<a href="http://news.trabot.net/sleepy/?id=' + id + '" title="' + description +'" target="main" onmousedown="return false;" class="newsItem">' + formattedDate + ' (TraBot)<br />' + title + '</a>')]);
          
        });
        
        
        // Sort news items
        var sortedNewsItems = [];
        
        for (i = 0; i < newsItems.length; i++) {
          
          var iDate = newsItems[i][0];
          
          if (sortedNewsItems.length == 0) {
            sortedNewsItems.push(newsItems[i]); // Place i at start of array
            continue;
          }
          
          for (j = 0; j < sortedNewsItems.length; j++) {
            var jDate = sortedNewsItems[j][0];
            
            if (iDate.getTime() > jDate.getTime()) {         
              var list = sortedNewsItems.splice(j, 0, newsItems[i]); // Place i before j
              break;
            } 
            
            else if (j == sortedNewsItems.length - 1) {
              var list = sortedNewsItems.push(newsItems[i]); // Place i at end of array
              break;
            }
          }
        }
        
        sortedNewsItems.splice(5);
        sortedNewsItems.reverse();
        
        // Remove old Omerta news items
        $(".newsItem").remove();
        
        // Insert our new news items (TraBot & Omerta news combined)
        $(sortedNewsItems).each(function() {
          var item = this[1];
          $(".newsheader").after(item);
        });
        
        // Append TraBot discussion link
        switch (OMERTA_VERSION) {
            case "com":
                var discussionUrl = "http://news.trabot.net/sleepy/?id=126";
                break;
            case "dm":
                var discussionUrl = "http://news.trabot.net/sleepy/?id=125";
                break;
        }
        
        var a = $('<p><a href="' + discussionUrl + '" target="main">(TraBot discussion)</a></p>');
        a.css("text-align", "right");
        $(".more").after(a);
        
      }
    });
  }
}

// Bullets
if (window.location.pathname == "/bullets2.php") {
  var details = $("table.thinline td:eq(2)");
  var captcha = $("#imgcode");
  
  // Local bulletfactory
  if (details[0]) {
    var seconds;
    details.eq(0).append('<div id="bulletsEta"></div>');
    
    function showBulletsEta() {
      seconds = 60 - new Date().getSeconds();
      $("#bulletsEta").text("Potential bullet refresh in approximately " + seconds + " seconds.");
    }
    
    showBulletsEta();
    setInterval(showBulletsEta, 1000);
  }
  
  // Bulletfactory
  if (details[1]) {
    var buyString = details.eq(1).contents()[8].textContent;
    var bullets = buyString.match(/\d+/)[0];
    $(":text[name=amount_bull]").val(bullets);
  }
  
  // Put captcha between BF & LBF
  // Removes LBF for some users?
  // Commented out for now...
  
  /*
  if (captcha[0]) {
      $("center:first").after(captcha.parent());
      captcha.parent().css("padding", "5px");
  }
  */
}


// User tooltips
function addUserTooltips() {
  var delay = 1000;
  var timeouts = [];
  var tooltips = [];
  var users = $("a[href*='user.php?nick='], a[href*='user.php?idn=']").not("[href*=&addfriend=]").not("[href*=&remfriend=]");
  
  if (!getValue("userTooltips")) return;
  
  // Discard possible timeout after link is clicked
  users.click(function() {
    if (timeouts[this])
      clearTimeout(timeouts[this]);
  });
  
  users.mouseover(function(e) {
  	if (tooltips[this]) {
    	drawTooltip(this, e);
  	} else {
  		timeouts[this] = setTimeout(drawTooltip, delay, this, e);
  	}
  });
  
  users.mouseout(function() {
  	
    // Discard possible timeout
    if (timeouts[this])
      clearTimeout(timeouts[this]);
  	
    // Remove possible tooltip and mousemove handler
  	if (tooltips[this]) {
  		tooltips[this].remove();
  		$(this).unbind("mousemove");
  	}
  	
  });

  function drawTooltip(link, e) {
    
    var tooltip = tooltips[link];
  	
    // Tooltip is cached; load cached tooltip instead
  	if (tooltip) {
    	if (tooltip.val() != "error") {
  		  $("body").append(tooltip);
  		  updatePosition(e);
  		  $(link).mousemove(updatePosition);
  		  return;
  	  }
  	}
  	
  	tooltip = $('<table></table>');
  	
  	tooltips[link] = tooltip
  	
  	$("body").append(tooltip);
  	
  	tooltip.append('<tr><th>User Details</th></tr>');
  	tooltip.append('<tr><td>Requesting details...</td></tr>');
  	
  	tooltip.css({
  		"color": "white",
  		"font-weight": "normal",
  		"border": "1px solid black",
  		"background": "#3F505F",
  		"opacity": "0.95",
  		"position": "absolute",
  		"font-size": "12px",
  		"padding": "5px",
  		"width": "400px"
  	});
  	
  	// Move tooltip along with cursor
  	function updatePosition(e) {
  		var distanceX = tooltip[0].clientWidth + 22;
  		var distanceY = tooltip[0].clientHeight + 22;
  		
  		if (e.clientX + distanceX > document.body.clientWidth)
  		  tooltip.css("left", e.clientX - distanceX);
		  else
		    tooltip.css("left", e.pageX + 20);
		    
		  if (e.clientY + distanceY > document.body.clientHeight)
  		tooltip.css("top", e.pageY - distanceY);
		  else
		  tooltip.css("top", e.pageY + 20);
  	}
  	
  	$(link).mousemove(updatePosition);
  	updatePosition(e)
  	
  	GM_xmlhttpRequest({
  		method: "GET",
  		url: link.href,
      		
  		onload: function(response) {
  			
  			var user = $(response.responseText);
  			
  			try {
    			tooltip.html('<tr><th colspan="2">User Details (' + user.find("#username")[0].textContent + ')</th></tr>');
  				tooltip.append('<tr><td>' + user.find("#rank").parent().prev().text() + '</td><td>' + user.find("#rank").text() + '</td></tr>');
  				tooltip.append('<tr><td>' + user.find("#hp").parent().prev().text() + '</td><td>' + user.find("#hp").text() + '</td></tr>');
  				tooltip.append('<tr><td>' + user.find("#status").parent().prev().text() + '</td><td>' + user.find("#status").text() + '</td></tr>');
  				tooltip.append('<tr><td>' + user.find("#position").text() + '</td><td>' + user.find("#family").text() + '</td></tr>');
  				tooltip.append('<tr><td>' + user.find("#wealth").parent().prev().text() + '</td><td>' + user.find("#wealth").text() + '</td></tr>');
  				
  				// Optional stuff
  				if (user.find("#roul")[0])
  				  tooltip.append('<tr><td>' + user.find("#roul").parent().prev().text() + '</td><td>' + user.find("#roul").text() + '</td></tr>');
  				  
  				if (user.find("#punt")[0])
  				  tooltip.append('<tr><td>' + user.find("#punt").parent().prev().text() + '</td><td>' + user.find("#punt").text() + '</td></tr>');

  				if (user.find("#book")[0])
  				  tooltip.append('<tr><td>' + user.find("#book").parent().prev().text() + '</td><td>' + user.find("#book").text() + '</td></tr>');
  				  
  				if (user.find("#bj")[0])
  				  tooltip.append('<tr><td>' + user.find("#bj").parent().prev().text() + '</td><td>' + user.find("#bj").text() + '</td></tr>');
  				  
  				if (user.find("#slot")[0])
  				  tooltip.append('<tr><td>' + user.find("#slot").parent().prev().text() + '</td><td>' + user.find("#slot").text() + '</td></tr>');
  				  
  				if (user.find("#numbers")[0])
  				  tooltip.append('<tr><td>' + user.find("#numbers").parent().prev().text() + '</td><td>' + user.find("#numbers").text() + '</td></tr>');
  				  
  				if (user.find("#bf")[0])
  				  tooltip.append('<tr><td>' + user.find("#bf").parent().prev().text() + '</td><td>' + user.find("#bf").text() + '</td></tr>');
  			}
  			
  			catch (e) { // Suppress errors
  			  tooltip.html('<tr><th colspan="2">User Details</th></tr>');
  				tooltip.append('<tr><td colspan="2">Couldn\'t retrieve details.</td></tr>');
  				
  				tooltip.val("error"); // Make sure this tooltip won't be cached
  			}
  			
  			updatePosition(e);
  			
  		}
  	});
  }
}

addUserTooltips();

if (window.location.pathname == "/honorpoints.php") {
  
  var user = GET["user"];
  
  if (user) {
    $(":text[name=to]").val(user);
    $(":text[name=number]").val(null);
    $(":text[name=number]")[0].focus();
  }
}

// Hide friend avatars
if (window.location.pathname == "/user.php" && getValue("hideFriendAvatars")) {
  
  var table = $("a[href^=./BeO/webroot/index.php?module=Friends&action=getFriends]").parent().parent().parent().parent();
  var friends = table.find("a[href^=user.php]");
  var footer = table.find("tr:last");
  
  // Remove avatars from links
  friends.find("img, br").remove();
  
  // Clean friends table
  table.empty();
  
  // Reorganize friend links
  friends.each(function(i) {
    var row = $('<tr></tr>');
    var cell = $('<td width="25%"></td>');
    
    cell.append(this);
    row.append(cell);
    table.append(row);
  });
  
  // Extended friends list link
  footer.find("td").removeAttr("align");
  footer.find("a").css("font-weight", "bold");
  table.append(footer);
}

if (GET["module"] == "GroupCrimes") {
  if ($("a")[0]) {
    $("a")[0].focus();
  }
}

// Heist
if (GET["module"] == "Heist") {
  
  // Leader (invite)
  if ($("select[name=gun]")[0]) {
    $(":text[name=bullets]").val(50);
    $(":text[name=driver]")[0].focus();
    $("option[value=real]").attr("selected", true);
    
    if (GET["driver"])
      $(":text[name=driver]").val(GET["driver"]);    
  }
  
  // Leader (start)
  else if ($(":submit[name=start]")[0]) {
    $(":submit[name=start]")[0].focus();
  }
  
  // Leader (make transfer)
  else if ($("#maketransfer a")[0]) {
    $("#maketransfer a")[0].focus();
  }
  
  // Driver (select car)
  else if ($("select[name=carid]")[0]) {
    $("select[name=carid]")[0].focus();
  }
}

// OC
if (window.location.pathname == "/orgcrime2.php") {
  
  // Leader (invite)
  if ($(":text[name=expexp]")[0]) {
    $(":text[name=expexp]")[0].focus();
  }
  
  // Leader (start)
  else if ($(":submit[name=doit]")[0]) {
    $(":submit[name=doit]")[0].focus();
  }
  
  // Leader (open calculator)
  else if ($(":submit[name=maketransfer]")[0]) {
    $(":submit[name=maketransfer]")[0].focus();
  }
  
  // Leader (make transfer)
  else if ($(":submit[name$=transfer]")[0]) {
    $(":submit[name$=transfer]")[0].focus();
  }  
  
  // Confirm participation
  else if ($("a[href=orgcrime2.php?takepart=yes]")[0]) {
    $("a[href=orgcrime2.php?takepart=yes]")[0].focus();
  }
  
  // EE
  else if ($(":radio[name=exploz]")[1]) {
    $(":radio[name=exploz]")[1].checked = true;
    $(":submit")[0].focus();
  }
  
  // WE
  else if ($("select[name=guns]")[0]) {
    $("select[name=guns] option[value=2]").attr("selected", true);
    $(":text[name=bulletz]").val(100);
    $(":text[name=bulletz]")[0].focus();
  }
  
  // Driver
  else if ($("select[name=caridz]")[0]) {
    $("select[name=caridz]")[0].focus();
  }
}

// MOC
if (GET["module"] == "MegaOC") {
  
  // Leader (invite)
  if ($(":text[name=drivers[1]]")[0]) {
    $(":text[name=drivers[1]]")[0].focus();
  }
  
  // Leader (start)
  else if ($("form[action$=go]")[0]) {
    $(":submit")[0].focus();
  }
  
  // Leader (make transfer)
  else if ($("td[id^=maketransfer] a")[0]) {
    $("td[id^=maketransfer] a")[0].focus();
  }
  
  // Driver
  else if ($("form[action$=setcar]")[0]) {
    $("select")[0].focus();
  }
  
  // WE
  else if ($("form[action$=setbullets]")[0]) {
    $(":text").val(500);
    $(":text")[0].focus();
  }
  
  // EE
  else if ($("form[action$=setexplosives]")[0]) {
    $(":radio")[2].checked = true;
    $(":submit")[0].focus();
  }
}

if (window.location.pathname == "/kill.php") {
  if (GET["action"] == "hireDets") {
    $(":text[name=name]").val(GET["user"]);
    $(":text[name=name]")[0].focus();
    $("form[action='kill.php?action=hire']")[0].submit();
  }
    
  if (GET["action"] == "kill") {
    $(":text[name=nick]").val(GET["user"]);
    $(":text[name=bulletsf]")[0].focus();
  }
}

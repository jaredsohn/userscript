// City of Wonder Wall Scanner
// version 1.1
// 2010-11-04
// Copyright (c) 2010, Dark Side Networks
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "City of War Wall Manager", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          City of Wonder Wall Manager
// @namespace     cowwm
// @description   Collect Bonuses and Assist Build Marvels for the Facebook game City of Wonder
// @include       http://www.facebook.com/home.php?filter=app_114335335255741*
// @require		  http://userscripts.org/scripts/source/73008.user.js
// ==/UserScript==
// CHANGELOG
// 1.1
// Bugfix update checking
// 1.0
// Bugfix New Marvel St. Basil's Cathedral
// See http://userscripts.org/scripts/show/85444 for full details
// 0.8.9
// Bugfix New Marvel Dracula's Castle Broke Script
// Added Simple Quick Fix to handle this type.
// Included JoeSimmons Filter Fix so app only loads on filtered feed pages
// 0.8.8B
// Bugfix Collecting Bonuses
// 0.8.7B
// Bugfix Collecting Bonuses
// 0.8.6B
// Bugfix Detect Error Checking for Updates
// 0.8.5B
// Individual User Options
// Enhaced FB Lag Detection and Reload
// 0.8B
// Lots of Code Re-factoring based on new Landing Pages for Marvels and Bonuses
// New Accurate Reporting based on parsed output of collected values
// 0.7A
// Hide Posts Already Processed Option
// Reset User DB Option
// Updated Status Reports
// UI Updates
// Removed GM Script Options (Moved to Options Panel)
// Check for Updates every 6 hrs on startup
// 0.6.1A
// Bugfix Disabling "Like" Bonus Option Fixed
// 0.6A
// Enable "Like" Bonus Option
// Modify Metadata to prevent loading on random FB Pages
// 0.5A
// Enable Multiple User Support
// Options Enabled
// Script Settings
var version = "1.1";
var debug = false; // Set to false to disable logging
var logLevel = "debug"; // set to debug, info, warn, or error to filter events
var upgradeInterval = 21600000; // Check for new version on load every 6 hrs
//var upgradeInterval = 1; // Debug
// Script Variables
var applicationID = "114335335255741";
var gameTitle = "City of Wonder";
var bonusRegex = "Pick Up Silver|Collect Silver|Collect Bonus";
var marvelRegex = "Help to Collect Bonus";
var legengRegex = "Send Legend to help";
var townRegex = "Visit your city"
var loaded = 0;
var workerMax = 5;
var collectorMax = 10;
// Aliases
var newLine = "<br>&nbsp;&nbsp;";
var indent = "&nbsp;&nbsp;";

function $() {
  if (arguments.length == 1) {
    return document.getElementById(arguments[0]);
  }
  var result = [],
      i = 0,
      el;
  while (el = document.getElementById(arguments[i++])) {
    result.push(el);
  }
  return result;
}

var wonder = {
  core: {
    init: function () {
      if (typeof unsafeWindow != "undefined" && unsafeWindow != unsafeWindow.top) {
        return false;
      }
      try {
        wonder.core.uname = document.getElementsByClassName("fbxWelcomeBoxName")[0].text;
        wonder.core.uid = document.getElementsByClassName('fbxWelcomeBoxName')[0].href.split("=")[1];
      }
      catch (e) {
        loaded++;
        if (loaded >= 5) {
          wonder.utils.logger("Error Loading - Tried 5x and gave up", "warn");
          while (document.getElementById("cowwm-cpanel") != null && document.getElementById("cowwm-cpanel") != undefined) {
            var cpanel = document.getElementById("cowwm-cpanel");
            document.body.removeChild(cpanel);
          }
          return false;
        }
        setTimeout(function () {
          wonder.core.init()
        }, 1000);
        return false;
      }
      optsImg = "<img src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%0FPLTE%E2%E2%E2%8A%8A%8A%AC%AC%AC%FF%FF%FFUUU%1C%CB%CE%D3%00%00%00%04tRNS%FF%FF%FF%00%40*%A9%F4%00%00%00%3DIDATx%DA%A4%8FA%0E%00%40%04%03%A9%FE%FF%CDK%D2%B0%BBW%BD%CD%94%08%8B%2F%B6%10N%BE%A2%18%97%00%09pDr%A5%85%B8W%8A%911%09%A8%EC%2B%8CaM%60%F5%CB%11%60%00%9C%F0%03%07%F6%BC%1D%2C%00%00%00%00IEND%AEB%60%82' id='cowwm-opts-img' class='cowwm-icon' title='Click to open or close Options'/>";
      playImg = "<img src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%0FPLTE%A7%A7%A7%C8%C8%C8YYY%40%40%40%00%00%00%9F0%E7%C0%00%00%00%05tRNS%FF%FF%FF%FF%00%FB%B6%0ES%00%00%00%2BIDATx%DAb%60A%03%0CT%13%60fbD%13%60%86%0B%C1%05%60BH%02%CC%CC%0CxU%A0%99%81n%0BeN%07%080%00%03%EF%03%C6%E9%D4%E3)%00%00%00%00IEND%AEB%60%82' id='cowwm-scan-img' class='cowwm-icon' title='Click to Scan for New Posts'/>";
      upgradeImg = "<img src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%18PLTE%C7%C7%C7UUU%7B%7B%7B%BF%BF%BF%A6%A6%A6%FF%FF%FF%40%40%40%FF%FF%FFk5%D0%FB%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00UIDATx%DAt%8F%5B%12%800%08%03%23%8Fx%FF%1B%5B%C0%96%EA%E8~%95%9D%C0%A48_%E0S%A8p%20%3A%85%F1%C6Jh%3C%DD%FD%205E%E4%3D%18%5B)*%9E%82-%24W6Q%F3Cp%09%E1%A2%8E%A2%13%E8b)lVGU%C7%FF%E7v.%01%06%005%D6%06%07%F9%3B(%D0%00%00%00%00IEND%AEB%60%82' id='cowwm-upgrade-img' class='cowwm-icon'>";
      collapseImg = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFNJREFUeNpi/P//PwMlgImBQjDwBrDgkggLC4MxQYHECGKsWrWKZBf8R6NJMgBuM5T+T6oBjAT4tI+F/wT4RHnhP5bwIMkLjPj8D5YYzQsMAAEGACWVEhvuKJzxAAAAAElFTkSuQmCC' id='cowwm-collapse-img' class='cowwm-icon'/>";
      wonder.utils.logger("Initializing City of Wonder Wall Manager", "info");
      desc = "<h4 id='cowwm-title'>City of Wonder Wall Manager</h4><div id='cowwm-totals'><b>Marvels Assisted:</b>&nbsp;<span id='cowwm-totals-marvels'></span><br/><b>Bonuses Collected:</b>&nbsp;<span id='cowwm-totals-bonus'></span><br/><b title='Estimated Silver Collected'>Silver Gained:</b>&nbsp;<span id='cowwm-totals-silver'></span></div><br/><div id='cowwm-summary'><br/></div>" + optsImg + indent + collapseImg + indent + upgradeImg + indent + playImg + indent + indent + "<span id='cowwm-status'>Loading (Waiting for Facebook to Finish Loading)</span><div id='cowwm-mworker'></div><div id='cowwm-bworker'></div><div id='cpMessage'></div>";
      div = document.createElement('div');
      div.id = 'cowwm-cpanel';
      div.innerHTML = desc;
      document.body.style.paddingBottom = "4em";
      document.body.appendChild(div);
      wonder.utils.logger("Loading Control Panel", "info");
      var autoExpand = wonder.opts.get("opts." + wonder.core.uid + ".autoexpand")
      var likeMarvel = wonder.opts.get("opts." + wonder.core.uid + ".likemarvel")
      var likeBonus = wonder.opts.get("opts." + wonder.core.uid + ".likebonus")
      var dimCompleted = wonder.opts.get("opts." + wonder.core.uid + ".dimcompleted");
      if (autoExpand === undefined) autoExpand = true;
      if (likeMarvel === undefined) likeMarvel = true;
      if (likeBonus === undefined) likeBonus = true;
      if (dimCompleted === undefined) dimCompleted = true;
      // Load Auto Expand More Posts Option
      if (autoExpand === true) {
        wonder.opts.autoexpand = true;
        wonder.opts.set("opts." + wonder.core.uid + ".autoexpand", true);
        window.setInterval(wonder.actions.expand, 1000);
      }
      else {
        wonder.opts.autoexpand = false;
        wonder.opts.get("opts." + wonder.core.uid + ".autoexpand", false);
      }
      // Load Like Marvel Assist Option
      if (likeMarvel === true) {
        wonder.opts.likemarvel = true;
        wonder.opts.set("opts." + wonder.core.uid + ".likemarvel", true);
      }
      else {
        wonder.opts.likemarvel = false;
        wonder.opts.set("opts." + wonder.core.uid + ".likemarvel", false);
      }
      // Load Like Bonus Collection Option
      if (likeBonus === true) {
        wonder.opts.likebonus = true;
        wonder.opts.set("opts." + wonder.core.uid + ".likebonus", true);
      }
      else {
        wonder.opts.likebonus = false;
        wonder.opts.set("opts." + wonder.core.uid + ".likebonus", false);
      }
      // Load Dim Processed Option
      if (dimCompleted === true) {
        wonder.opts.dimcompleted = true;
        wonder.opts.set("opts." + wonder.core.uid + ".dimcompleted", true);
      }
      else {
        wonder.opts.dimcompleted = false;
        wonder.opts.set("opts." + wonder.core.uid + ".dimcompleted", false);
      }
      wonder.utils.logger("------------------------------------", "debug");
      wonder.utils.logger("City of Wonder Wall Manager Settings", "debug")
      wonder.utils.logger("-------------------------------------", "debug");
      wonder.utils.logger("User: " + wonder.core.uname + " (" + wonder.core.uid + ")", "debug");
      wonder.utils.logger("Version: " + version, "debug");
      wonder.utils.logger("-----------------------------", "debug");
      wonder.utils.logger("Auto Expand More Posts: " + wonder.opts.autoexpand, "debug");
      wonder.utils.logger("Like Bonuses Collected: " + wonder.opts.likebonus, "debug");
      wonder.utils.logger("Like Marvel Assissted: " + wonder.opts.likemarvel, "debug");
      wonder.utils.logger("Hide Processed Posts: " + wonder.opts.dimcompleted, "debug");
      wonder.utils.logger("-----------------------------", "debug");
      wonder.reports.totals(wonder.core.uid);
      return true;
    },
    uid: { // Store Running User UID
    },
    uname: { // Store running User Username
    },
  },
  utils: {
    getExternalResource: function (url, cb) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
              doc = document.implementation.createDocument('', '', dt),
              html = doc.createElement('html');
          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          cb(doc)
        }
      });
    },
    logger: function (msg, level) {
      var ts = new Date;
      var timestamp = ts.getFullYear() + "-" + wonder.utils.pad(ts.getMonth() + 1, 2) + "-" + wonder.utils.pad(ts.getDate(), 2) + " " + wonder.utils.pad(ts.getHours(), 2) + ":" + wonder.utils.pad(ts.getMinutes(), 2) + ":" + wonder.utils.pad(ts.getSeconds(), 2);
      var logLevels = {
        "debug": 0,
        "info": 1,
        "warn": 2,
        "error": 3
      };
      var minLogLevel = logLevels[logLevel];
      if (debug === false) {
        return true;
      }
      if (level === null || level === undefined) {
        level = "info";
      }
      else {
        level = level.toLowerCase();
      }
      if (level === "error" && minLogLevel <= 3) {
        console.error(timestamp + " - [ " + level.toUpperCase() + " ] - " + msg);
      }
      else if (level === "warn" && minLogLevel <= 2) {
        console.warn(timestamp + " - [ " + level.toUpperCase() + " ] - " + msg);
      }
      else if (level === "info" && minLogLevel <= 1) {
        console.info(timestamp + " - [ " + level.toUpperCase() + " ] - " + msg);
      }
      else if (level === "debug" && minLogLevel <= 0) {
        console.log(timestamp + " - [ " + level.toUpperCase() + " ] - " + msg);
      }
    },
    pad: function (number, length) {
      var str = '' + number;
      while (str.length < length) {
        str = '0' + str;
      }
      return str;
    },
    csv2Array: function (csv) {
      if (csv === '' || csv === null || csv === undefined) return new Array();
      var myArray = new Array();
      var t = csv.split(',');
      for (var i = 0; t.length > i; i++) {
        myArray.push(t[i]);
      }
      return myArray;
    },
    addGlobalStyle: function (css) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) {
        return;
      }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
    },
    wipeDB: function () {
      var keys = GM_listValues();
      if (keys.length > 0) {
        wonder.utils.logger("Warning next run will collect items that have already been collected", "warn")
        for (var i = 0, key = null; key = keys[i]; i++) {
          if (key.match(/runtime/) || key.match(/reports/)) {
            wonder.utils.logger("Removing Completed Data: " + key, "info");
            wonder.opts.del(key);
          }
          wonder.reports.totals(wonder.core.uid);
        }
        return true;
      }
    },
    wait: function (check, callback) {
      if (check) {
        if (typeof callback == 'function') {
          callback();
        }
      }
      else if (!check) {
        window.setTimeout('wonder.utils.wait.call(this.check, callback)', '400');
      }
    },
    pause: function (millis) {
      var date = new Date();
      var curDate = null;
      do {
        curDate = new Date();
      }
      while (curDate - date < millis);
    },
    fade: function (e, dir, s) {
      // Fade by JoeSimmons. Fade in/out by id and choose speed: slow, medium, or fast
      // Syntax: fade('idhere', 'out', 'medium');
      if (!e || !dir || typeof dir != 'string' || (dir != 'out' && dir != 'in')) {
        return;
      } // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
      dir = dir.toLowerCase();
      s = s.toLowerCase(); // Fix case sensitive bug
      var node = (typeof e == 'string') ? $(e) : e,
          
          
          // Define node to be faded
          
          speed = {
          slow: 400,
          medium: 200,
          fast: 100
          };
      if (!s) var s = 'medium'; // Make speed medium if not specified
      if (s != 'slow' && s != 'medium' && s != 'fast') s = 'medium'; // Set speed to medium if specified speed not supported
      if (dir == 'in') node.style.opacity = '0';
      else if (dir == 'out') node.style.opacity = '1';
      node.style.display = '';
      var intv = setInterval(function () {
        if (dir == 'out') {
          if (parseFloat(node.style.opacity) > 0) node.style.opacity = (parseFloat(node.style.opacity) - .1).toString();
          else {
            clearInterval(intv);
            node.style.display = 'none';
          }
        }
        else if (dir == 'in') {
          if (parseFloat(node.style.opacity) < 1) node.style.opacity = (parseFloat(node.style.opacity) + .1).toString();
          else {
            clearInterval(intv);
          }
        }
      }, speed[s]);
    },
    str2Currency: function (nStr) {
      nStr += '';
      x = nStr.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    },
    statusPoller: function () {
      if ($("cowwm-mworker").innerHTML == 0 && $("cowwm-bworker").innerHTML == 0) {
        wonder.actions.updatePanel('', "Idle");
      }
    }
  },
  // End wonder.utils
  opts: {
    autoexpand: {},
    likemarvel: {},
    likebonus: {},
    dimcompleted: {},
    config: function () {
      var cpanel = document.getElementById('cowwm-cpanel');
      var oPanel = document.getElementById('cowwm-config');
      var autoExpandEnabled = wonder.opts.get("opts." + wonder.core.uid + ".autoexpand");
      var likeMarvel = wonder.opts.get("opts." + wonder.core.uid + ".likemarvel");
      var likeBonus = wonder.opts.get("opts." + wonder.core.uid + ".likebonus");
      var dimCompleted = wonder.opts.get("opts." + wonder.core.uid + ".dimcompleted");
      // Check and Set Auto Expand Option
      if (autoExpandEnabled === undefined) {
        var expandChecked = "checked";
        wonder.opts.autoexpand = true;
      }
      else if (autoExpandEnabled === true) {
        var expandChecked = "checked";
        wonder.opts.autoexpand = true;
      }
      else if (autoExpandEnabled === false) {
        var expandChecked = "";
        wonder.opts.autoexpand = false;
      }
      // Check and Set Like Marvels Option
      if (likeMarvel === undefined) {
        wonder.opts.likemarvel = true;
        var likeChecked = "checked";
      }
      else if (likeMarvel === true) {
        wonder.opts.likemarvel = true;
        var likeChecked = "checked";
      }
      else if (likeMarvel === false) {
        wonder.opts.likemarvel = false;
        var likeChecked = "";
      }
      // Check and Set Like Bonuses Option
      if (likeBonus === undefined) {
        wonder.opts.likebonus = true;
        var bLikeChecked = "checked";
      }
      else if (likeBonus === true) {
        wonder.opts.likebonus = true;
        var bLikeChecked = "checked";
      }
      else if (likeBonus === false) {
        wonder.opts.likebonus = false;
        var bLikeChecked = "";
      }
      // Check and Set Hide Posts Option
      if (dimCompleted === undefined) {
        var dimChecked = "checked";
        wonder.opts.dimcompleted = true;
      }
      else if (dimCompleted === true) {
        var dimChecked = "checked";
        wonder.opts.dimcompleted = true;
      }
      else if (dimCompleted === false) {
        var dimChecked = "";
        wonder.opts.dimcompleted = false;
      }
      if (oPanel === undefined || oPanel === null) {
        div = document.createElement('div');
        div.id = "cowwm-config";
        closeImg = "<img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8cHh4jJzIqIyUvJR4eKzssLzM1ODg4ISo9QTw2QTI3ODUBCQoKDAwFDQ4KDSkYHhgpKSkpKSkpKSkpKSkpKTUpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKf/AABEIAA4ADgMBIgACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAABAgcA/8QAIBAAAgMAAgEFAAAAAAAAAAAAAQIDBBEAIQUSQVFhgf/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ao965X8P42vZnqRvXxRK4A9SaOjmd9/fNcQSeJhlkqxwSOwJRSGzo9aBwS2KbGBbUDSvW6Ubq7mE5uH9HFUwzUkp0o2jSI6BIxOD43s+/IT//2Q==' id='cowwm-opts-close'/>";
        div.innerHTML = "<h4>Wall Manager Options</h4>" + closeImg + "<br/><br/>" + "<label for='autoExpand' id='autoExpandLbl'>Auto Expand 'More Posts'</label>" + "<input type='checkbox' id='autoExpand' " + expandChecked + "/><br/>" + "<label for='likeBonus' id='likeBonusLbl'>'Like' Bonuses Collected</label><input type='checkbox' id='likeBonus' " + bLikeChecked + "/><br/><label for='likeMarvel' id='likeMarvelLbl'>'Like' Marvels Assisted</label><input type='checkbox' id='likeMarvel' " + likeChecked + "/><br/>" + "<label for='likeMarvel' id='dimCompletedLbl'>Hide Posts Already Processed</label><input type='checkbox' id='dimCollected' " + dimChecked + "/><br/>" + "<a href='javascript:void(0);' id='cowwm-resetdb'>Reset All Databases</a>" + indent + "<a href='javascript:void(0);' id='cowwm-reset-user-db'>Reset User Database</a>";
        cpanel.appendChild(div);
        $('cowwm-opts-close').addEventListener("click", wonder.opts.config, true);
        $('autoExpand').addEventListener('change', function () {
          wonder.opts.set('opts.' + wonder.core.uid + '.autoexpand', document.getElementById('autoExpand').checked);
        }, true);
        $('likeMarvel').addEventListener('change', function () {
          wonder.opts.set('opts.' + wonder.core.uid + '.likemarvel', document.getElementById('likeMarvel').checked);
        }, true);
        $('likeBonus').addEventListener('change', function () {
          wonder.opts.set('opts.' + wonder.core.uid + '.likebonus', document.getElementById('likeBonus').checked);
        }, true);
        $('dimCollected').addEventListener('change', function () {
          wonder.opts.set('opts.' + wonder.core.uid + '.dimcompleted', document.getElementById('dimCollected').checked);
        }, true);
        $("cowwm-resetdb").addEventListener("click", function () {
          var r = confirm("Clearing the Database will attempt to Collect Bonuses and Assist with Marvels already Completed.\r\n\r\nDo you wish to Contiune?");
          if (r == true) {
            wonder.utils.wipeDB();
          }
        }, true);
        $("cowwm-reset-user-db").addEventListener("click", function () {
          var r = confirm("Clearing the Database will attempt to Collect Bonuses and Assist with Marvels already Completed for " + wonder.core.uname + ".\r\n\r\nDo you wish to Contiune?");
          if (r == true) {
            wonder.opts.wipeUserData(wonder.core.uid);
          }
        }, true);
      }
      else {
        if (oPanel.style.visibility == "hidden") {
          oPanel.style.visibility = "visible";
        }
        else {
          oPanel.style.visibility = "hidden";
        }
      }
    },
    get: function (key) {
      return GM_getValue(key);
    },
    set: function (key, value) {
      return GM_setValue(key, value);
    },
    del: function (key) {
      return GM_deleteValue(key);
    },
    wipeUserData: function () {
      wonder.utils.logger("Clearing Database for User: " + wonder.core.uname, "info");
      GM_deleteValue("runtime." + wonder.core.uid + ".completed.bonus");
      GM_deleteValue("runtime." + wonder.core.uid + ".completed.marvels");
      wonder.opts.del("reports." + wonder.core.uid + ".silver");
      wonder.reports.totals(wonder.core.uid);
    },
    upgradeCheck: function (opt) {
      var lastCheck = wonder.opts.get('opts.' + wonder.core.uid + '.lastcheck');
      var now = new Date.now();
      if (opt === "forced") {
        lastCheck = 0;
      };
      if (lastCheck === undefined) {
        wonder.opts.set("opts." + wonder.core.uid + ".lastcheck", now.toString());
        lastCheck = now;
      }
      if (now - lastCheck > upgradeInterval) {
        wonder.utils.logger("Checking for Updates", "info")
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://github.com/dsn/City-of-Wonder-Wall-Manager/raw/master/cow-wm.user.js",
          onload: function (response) {
            if (response.responseText.search("version") === -1) {
              wonder.utils.logger("Error checking for update: " + response.responseText, "info");
              return false;
            }
            var remoteVer = response.responseText.match(/version = \"\d+\.\d+\"/g)[0].split('=')[1].replace(" ", "").replace('"','').replace('"','');
            if (remoteVer > version.replace(/Alpha|Beta|Release/, "")) {
              wonder.utils.logger("New Version Detected: " + remoteVer, "debug")
              document.getElementById("cpMessage").innerHTML = "<strong>City of Wonder Wall Manager<br/>New Version Available</strong><br/><br/><h4 style='background-color: darkred;'>Your Version: " + version + "</h4><h4 style='background-color: darkgreen; -moz-border-radius: 0px 0px 5px 5px;'>New Version: " + remoteVer + "</h4><br><a href='http://userscripts.org/scripts/show/85444' target='_blank' style='color: white;'><b>Read Details</b></a> | <a href='http://userscripts.org/scripts/source/85444.user.js' target='_blank' style='color: white;'><b>Update</b></a>";
              document.getElementById("cpMessage").style.visibility = "visible";
              document.getElementById("cpMessage").addEventListener("click", function () {
                document.getElementById("cpMessage").style.visibility = "hidden";
              }, true);
            }
            else {
              wonder.utils.logger("No Updates Found", "info");
              document.getElementById('cpMessage').innerHTML = "No Update Available";
              document.getElementById('cpMessage').style.visibility = "visible";
              setTimeout(function () {
                document.getElementById('cpMessage').style.visibility = "hidden";
              }, 3000);
            }
          }
        });
      }
      wonder.opts.set('opts.' + wonder.core.uid + '.lastcheck', now.toString());
    },
  },
  // End wonder.opts
  actions: {
    // Start wonder.actions
    updatePanel: function (msg, status) {
      var cpanel = document.getElementById('cowwm-cpanel');
      if (msg === null || msg === undefined) {
        msg = "";
      }
      if (status === null || status === undefined) {
        status = "Idle";
      }
      if (typeof linkEnabled != 'boolean' || linkEnabled === "" || linkEnabled === undefined) {
        linkEnabled = true;
      }(status == "Idle" || status == "Paused") ? linkEnabled = true : linkEnabled = false;
      if (cpanel !== null && cpanel !== undefined) {
        var cowStatus = document.getElementById("cowwm-status");
        var btn = document.getElementById("cowwm-scan-img");
        if (cowStatus !== null && cowStatus !== undefined) {
          cowStatus.innerHTML = status;
        }
        if (btn !== null && btn !== undefined) {
          if (linkEnabled === true) {
            btn.style.background = "#dadada";
            document.getElementById('cowwm-scan-img').addEventListener("click", wonder.actions.getStories, false);
          }
          else if (linkEnabled === false) {
            btn.style.background = "#ffd3d3";
            document.getElementById('cowwm-scan-img').removeEventListener("click", wonder.actions.getStories, false);
          }
        }
        document.getElementById('cowwm-opts-img').addEventListener("click", wonder.opts.config, false);
      }
    },
    click: function (e, type) {
      if (!e && typeof e == 'string') e = document.getElementById(e);
      if (!e) return;
      var evObj = e.ownerDocument.createEvent('MouseEvents');
      evObj.initMouseEvent("click", true, true, e.ownerDocument.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      e.dispatchEvent(evObj);
    },
    expand: function () {
      var el = document.body.getElementsByClassName('uiStreamCollapsed');
      for (var i = 0; el.length > i; i++) {
        wonder.utils.logger("Found More Posts Link - Expanding", "debug");
        wonder.actions.click(el[i].children[0]);
      }
    },
    getStories: function () {
      $("cowwm-scan-img").style.background = "#ffd3d3";
      wonder.actions.updatePanel("", "Running");
      var myName = document.getElementsByClassName('fbxWelcomeBoxName')[0].text;
      var uid = document.getElementsByClassName('fbxWelcomeBoxName')[0].href.split("=")[1];
      wonder.utils.logger("Searching for new Posts", "info")
      // create some array's to store our data
      var lcount = new Array();
      var blinks = new Array();
      var mlinks = new Array();
      var tlinks = new Array();
      var myPosts = 0;
      var mDupeCount = 0;
      var bDupeCount = 0;
      // Get each Post for the Application
      var stories = document.getElementsByClassName('aid_' + applicationID);
      if (stories !== null && stories.length > 0) {
        wonder.actions.updatePanel('Collecting Posts', 'Running');
        for (var i = 0; i < stories.length; i++) {
          var appid = stories[i].innerHTML.match(/(application\.php\?id=|app_id=)([0-9]{1,})/);
          if (appid !== null && appid[2] === applicationID) {
            var dataft = stories[i].attributes[1].nodeValue;
            var fbid = JSON.parse(dataft)['fbid'];
            var likeLink = stories[i].getElementsByClassName('like_link');
            if (likeLink[0] === undefined) {
              likeLink === null;
            }
            var links = stories[i].getElementsByTagName('a')
            var actorName = links[2].text;
            lcount.push(fbid)
            if (actorName !== '') {
              for (var x = 0; x < links.length; x++) {
                var storyid = stories[i].id;
                if (links[x].text.match(marvelRegex)) {
                  k = uid + links[x].href.split('?')[0].split("/")[7] + links[x].href.split('?')[0].split("/")[8];
                  if (wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels")).indexOf(k) !== -1) {
                    if (wonder.opts.dimcompleted === true) {
                      wonder.utils.fade(storyid, "out", "fast");
                    }
                    mDupeCount++;
                    continue;
                  }
                  else {
                    var mTmp = new Object;
                    mTmp.actor = actorName
                    mTmp.uid = uid;
                    try {
                      mTmp.type = links[x].href.split('marvelRequest-')[1].split('-')[0].replace('+', ' ');
                    }
                    catch (e) {
                      mTmp.type = links[x].href.split('multiMarvel-')[1].split('-')[0].replace('+', ' ').replace("%27", '').replace('+', ' ');
                    }
                    mTmp.id = fbid;
                    mTmp.sid = storyid;
                    mTmp.base = links[x].href.split('?')[0]
                    mTmp.url = links[x].href
                    mTmp.like_link = likeLink[0];
                    wonder.utils.logger("Found Help Build " + mTmp.type + " Marvel Request for " + mTmp.actor, "debug")
                    mlinks.push(mTmp);
                  }
                }
                else if (links[x].text.match(bonusRegex)) {
                  b = links[x].href.split('?')[0];
                  k = uid + b.split("/")[7] + b.split("/")[8];
                  if (wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.bonus")).indexOf(k) !== -1) {
                    if (wonder.opts.dimcompleted === true) {
                      wonder.utils.fade(storyid, "out", "fast");
                    }
                    bDupeCount++;
                    continue;
                  }
                  var bTmp = new Object;
                  bTmp.actor = actorName;
                  bTmp.uid = uid;
                  bTmp.type = links[x].text;
                  bTmp.id = fbid;
                  bTmp.sid = storyid;
                  bTmp.base = links[x].href.split('?')[0]
                  bTmp.url = links[x].href
                  bTmp.like_link = likeLink[0];
                  wonder.utils.logger("Found a Bonus (" + fbid + ") to Pickup from " + actorName, "debug")
                  blinks.push(bTmp);
                }
                else if (links[x].text.match(townRegex)) {
                  wonder.utils.logger("Found Embassy Link", "debug");
                  tlinks.push(links[x]);
                  if (wonder.opts.dimcompleted === true) {
                    wonder.utils.fade(storyid, "out", "fast");
                  }
                }
              }
            }
            else {
              wonder.utils.logger("Skipping post from yourself", "debug");
              myPosts++;
              if (wonder.opts.dimcompleted === true) {
                var storyid = stories[i].id;
                wonder.utils.fade(storyid, "out", "fast");
              }
            }
          }
        }

        // Done Collecting Data Start Process Links
        wonder.actions.updatePanel('Processing: ' + lcount.length + ' Items<br/><b>Marvels:</b> ' + mlinks.length + '<br/><b>Bonuses:</b> ' + blinks.length, 'Running');
        wonder.utils.logger("Found " + lcount.length + " Posts - Processing (" + mlinks.length + " Marvels, " + blinks.length + " Bonuses, and " + tlinks.length + " Embassy / Visit Links)", "info");

        // Process Marvels
        for (y = 0; mlinks.length > y; y++) {
          var key = mlinks[y].uid + mlinks[y].base.split("/")[7] + mlinks[y].base.split("/")[8];
          var mCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels"));
          if (mCompleted.indexOf(key) === -1) {
            var url = mlinks[y].url;
            var id = mlinks[y].id;
            var like = mlinks[y].like_link;
            var sid = mlinks[y].sid
            wonder.utils.logger("Attempting to Build " + mlinks[y].type + " for " + mlinks[y].actor, "debug");
            wonder.marvels.collect(sid, url, like, key);
          }
          else {
            wonder.utils.logger("Duplicate Marvel Request Found in Collection - Skipping", "warn");
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(mlinks[y].sid, "out", "fast");
            }
            mDupeCount++;
            continue;
          }
        }
        // Process Bonuses
        for (var z = 0; blinks.length > z; z++) {
          var key = blinks[z].uid + blinks[z].base.split("/")[7] + blinks[z].base.split("/")[8];
          var bonusURL = blinks[z].url;
          var id = blinks[z].id;
          var sid = blinks[z].sid;
          var like = blinks[z].like_link;

          wonder.utils.logger("Collecting Bonus from " + blinks[z].actor, "debug");
          wonder.bonus.collect(sid, bonusURL, like, key);
        }
        var mProcd = mlinks.length;
        var bProcd = blinks.length;
        var mDesc = "";
        var bDesc = "";
        if (mProcd > 0 && mDupeCount > 0) {
          mDesc = "<b>Marvels</b> " + "Assisted: " + mProcd + " Skipped: " + mDupeCount + newLine;
        }
        else if (mProcd > 0 && mDupeCount == 0) {
          mDesc = "<b>Marvels</b> " + "Assisted: " + mProcd + newLine
        }
        else if (mProcd <= 0 && mDupeCount > 0) {
          mDesc = "<b>Marvels</b> " + "Skipped: " + mDupeCount + newLine;
        }
        if (bProcd > 0 && bDupeCount > 0) {
          bDesc = "<b>Bonuses</b> " + "Collected: " + bProcd + " Skipped: " + bDupeCount + newLine;
        }
        else if (bProcd > 0 && bDupeCount == 0) {
          bDesc = "<b>Bonuses</b> " + "Collected: " + bProcd + newLine
        }
        else if (bProcd <= 0 && bDupeCount > 0) {
          bDesc = "<b>Bonuses</b> " + "Skipped: " + bDupeCount + newLine;
        }
        var desc = newLine + "<b>Processed</b> (" + lcount.length + " Items)" + newLine + mDesc + bDesc + "<b>Visits</b> " + tlinks.length + " <b>Your Posts</b>: " + myPosts + "<br><br>";
        $("cowwm-summary").innerHTML = desc;
        wonder.reports.totals(uid);
      }
      else {
        wonder.utils.logger("No " + gameTitle + " Posts Found", "info")
      }
    },
  },
  // End wonder.actions
  // Start wonder.marvels
  marvels: {
    collect: function (sid, url, like, key) {
      var cur = parseInt($("cowwm-mworker").innerHTML);
      if (cur >= workerMax) {
        wonder.utils.logger("Marvel Worker Queue is Full - Re-Queueing", "debug");
        setTimeout(function () {
          wonder.marvels.collect(sid, url, like)
        }, 1000);
        return;
      }
      $("cowwm-mworker").innerHTML = cur + 1;
      wonder.actions.updatePanel('', 'Building Marvel');
      var clean = setTimeout(function () {
        wonder.worker.cleanup("marvel");
      }, 30000);
      wonder.utils.getExternalResource(url, function (resp, url) {
        var nextUrl = resp.getElementById('app114335335255741_iframe_canvas').src;
        //console.log("Final Marvel URL: " + nextUrl);
        wonder.utils.getExternalResource(nextUrl, function (doc) {
          var msg = doc.getElementsByClassName("msgs")[0].innerHTML;
          //console.log(msg);
          if (msg.search("city to see it in all its glory") !== -1) {
            wonder.utils.logger("Failed - Completed already", "debug");
            // Dim on Complete
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
            var mCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels"));
            mCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.marvels", mCompleted.toString());

          }
          else if (msg.search("You've already helped") !== -1) {
            wonder.utils.logger("Failed - Already Helped", "debug")
            // Dim on Complete
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
            wonder.utils.logger("Cleaning up Stale Marvel Worker", "info");
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
            var mCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels"));
            mCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.marvels", mCompleted.toString());

          }
          else if (msg.search("Check back to see if you can help with another step") !== -1) {
            wonder.utils.logger("Failed - Already Helped", "debug")
            // Dim on Complete
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
            var mCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels"));
            mCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.marvels", mCompleted.toString());
          }
          else if (msg.search(/[0-9]{1,} Coins/) !== -1) {
            wonder.utils.logger("Successfully Helped Build Marvel", "debug");
            var collected = wonder.opts.get("reports." + wonder.core.uid + ".silver");
            (collected !== undefined && collected !== null) ? collected = parseInt(collected) : collected = 0;
            var reward = parseInt(msg.match(/([0-9]{1,}) Coins/)[1]);
            var total = (collected + reward);
            wonder.utils.logger("Collected: " + reward + " Total Collected: " + collected + " New Total: " + total, "debug");
            wonder.opts.set("reports." + wonder.core.uid + ".silver", total);

            if (wonder.opts.likemarvel === true) {
              if (like !== undefined && like.title == "Like this item" && like !== null) {
                wonder.utils.logger("Marking Marvel " + sid + " Assisted with 'Like'", "debug");
                like.click();
              }
            }
            // Dim on Complete
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
            var mCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels"));
            mCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.marvels", mCompleted.toString());
          }
          else if (msg.search("You helped build the") !== -1) {
            wonder.utils.logger("Successfully Helped Build Marvel", "debug");
            var collected = wonder.opts.get("reports." + wonder.core.uid + ".silver");
            (collected !== undefined && collected !== null) ? collected = parseInt(collected) : collected = 0;
            var reward = parseInt(msg.match(/([0-9]{1,}) Coins/)[1]);
            var total = (collected + reward);
            wonder.utils.logger("Collected: " + reward + " Total Collected: " + collected + " New Total: " + total, "debug");
            wonder.opts.set("reports." + wonder.core.uid + ".silver", total);
            if (wonder.opts.likemarvel === true) {
              if (like !== undefined && like.title == "Like this item" && like !== null) {
                wonder.utils.logger("Marking Marvel " + sid + " Assisted with 'Like'", "debug");
                like.click();
              }
            }
            // Dim on Complete
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
            var mCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.marvels"));
            mCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.marvels", mCompleted.toString());
          }
          else if (msg.search("Unable to Complete Request") !== -1) {
            wonder.utils.logger("Error - Server Error Detected", "debug");
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
          }
          else {
            console.debug("Unknown Error Mavel Building Error: " + msg);
            wonder.worker.cleanup("marvel");
            clearTimeout(clean);
          }
        });
      });
    },
  },
  bonus: {
    collect: function (sid, url, like, key) {
      var cur = parseInt($("cowwm-bworker").innerHTML);
      if (cur >= collectorMax) {
        wonder.utils.logger("Bonus Worker Queue is Full - Re-Queueing", "debug");
        setTimeout(function () {
          wonder.bonus.collect(sid, url, like)
        }, 1000);
        return;
      }
      $("cowwm-bworker").innerHTML = cur + 1;
      wonder.actions.updatePanel('', 'Collecting Bonus');
      var clean = setTimeout(function () {
        wonder.utils.logger("Cleaning up Stale Bonus Collector", "info");
        wonder.worker.cleanup("bonus");
      }, 30000);
      wonder.utils.getExternalResource(url, function (doc) {
        var nextUrl = doc.getElementById('app114335335255741_iframe_canvas').src;
        //console.log("Bonus Helper URL: " + nextUrl);
        wonder.utils.getExternalResource(nextUrl, function (result) {
          var msg = result.getElementsByClassName("msgs")[0].innerHTML;
          if (msg.search("You already collected this bonus") !== -1) {
            wonder.utils.logger("Already Collected this Bonus", "debug");
            clearTimeout(clean);
            wonder.worker.cleanup('bonus');
            var bCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.bonus"));
            bCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.bonus", bCompleted.toString());
            // Dim on Complete
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
          }
          else if (msg.search(/[0-9]{1,} Coins/) !== -1) {
            var collected = wonder.opts.get("reports." + wonder.core.uid + ".silver");
            (collected !== undefined && collected !== null) ? collected = parseInt(collected) : collected = 0;
            var reward = parseInt(msg.match(/([0-9]{1,}) Coins/)[1]);
            var total = (collected + reward);
            wonder.utils.logger("Collected: " + reward + " Total Collected: " + collected + " New Total: " + total, "debug");
            wonder.opts.set("reports." + wonder.core.uid + ".silver", total);
            var collectBtn = result.getElementsByClassName("msgs")[0].getElementsByTagName("a");
            var finalURL = collectBtn[0].attributes[1].nodeValue.match(/\'(.*)\'/)[1];
            wonder.reports.totals(wonder.core.uid);
            wonder.utils.getExternalResource(finalURL, function (response) {
              wonder.utils.logger("Collected Bonus", "debug");
              var bCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.bonus"));
              bCompleted.push(key);
              clearTimeout(clean);
              wonder.opts.set("runtime." + wonder.core.uid + ".completed.bonus", bCompleted.toString());

              // Dim on Complete
              if (wonder.opts.dimcompleted === true) {
                wonder.utils.fade(sid, "out", "fast");
              }
              wonder.worker.cleanup('bonus');
            });
          }
          else if (msg.search("collect your own bonus") !== -1) {
            wonder.utils.logger("Whoops tried to collect my own bonus", "info");
            clearTimeout(clean);
            wonder.worker.cleanup('bonus');
            var bCompleted = wonder.utils.csv2Array(wonder.opts.get("runtime." + wonder.core.uid + ".completed.bonus"));
            bCompleted.push(key);
            wonder.opts.set("runtime." + wonder.core.uid + ".completed.bonus", bCompleted.toString());
            if (wonder.opts.dimcompleted === true) {
              wonder.utils.fade(sid, "out", "fast");
            }
          }
          else {
            wonder.utils.logger("Unknown Bonus Collection Error: " + msg, "warn");
            clearTimeout(clean);
            wonder.worker.cleanup('bonus');
          }
        });

      });

    },
  },
  reports: {
    totals: function (uid) {
      if (uid === undefined || uid === null || uid === '') {
        return false;
      }
      var mCompleted = wonder.utils.csv2Array(wonder.opts.get('runtime.' + wonder.core.uid + '.completed.marvels'));
      var bCompleted = wonder.utils.csv2Array(wonder.opts.get('runtime.' + wonder.core.uid + '.completed.bonus'));
      var silver = wonder.opts.get('reports.' + uid + '.silver');
      if (silver === undefined) {
        silver = 0;
      };
      $("cowwm-totals-marvels").innerHTML = mCompleted.length;
      $("cowwm-totals-bonus").innerHTML = bCompleted.length;
      $("cowwm-totals-silver").innerHTML = wonder.utils.str2Currency("$" + silver);
    }
  },
  worker: {
    status: function () {
      var curLoad = wonder.opts.get('runtime.' + wonder.core.uid + '.workers');
    },
    cleanup: function (wtype) {
      if (wtype == "marvel") {
        var cur = parseInt($("cowwm-mworker").innerHTML);
        $("cowwm-mworker").innerHTML = cur - 1;
      }
      else if (wtype == "bonus") {
        var cur = parseInt($("cowwm-bworker").innerHTML);
        $("cowwm-bworker").innerHTML = cur - 1;
      }
    },
  }
} // End Wonder
if (wonder.core.init() === true) {
  var tmout = setTimeout(function () {
    wonder.utils.logger("Facebook Loading Timeout - Reloading", "warn");
    top.location = top.location;
  }, 30000);
  wonder.utils.logger("City of Wonder Wall Manager Init Successful", "info");
  wonder.utils.logger("Waiting for Facebook to Complete Loading", "info");
  window.addEventListener("load", function () {
    if (wonder.opts.get("opts." + wonder.core.uid + ".autoexpand") === true) {
      setInterval(wonder.actions.expand, 1000);
    }
    //console.clear();
    var collapse = document.getElementById("cowwm-collapse-img");
    collapse.addEventListener("click", function (e) {
      if ($("cowwm-summary").style.display == "none" && $("cowwm-totals").style.display == "none") {
        collapse.title = "Collapse the City of Wonder Wall Manager";
        $("cowwm-summary").style.display = "block";
        $("cowwm-totals").style.display = "block";
        $("cowwm-status").style.display = "block";
        $("cowwm-cpanel").style.width = "250px";
        $("cowwm-title").style.height = "20px";
      }
      else {
        collapse.title = "Expand the City of Wonder Wall Manager";
        $("cowwm-summary").style.display = "none";
        $("cowwm-totals").style.display = "none";
        $("cowwm-status").style.display = "none";
        $("cowwm-cpanel").style.width = "120px";
        $("cowwm-title").style.height = "30px";
      }
    }, true);
    wonder.actions.click(collapse);

    var upCheck = document.getElementById("cowwm-upgrade-img");
    upCheck.title = "Check for Updates";
    upCheck.addEventListener("click", function (e) {
      wonder.opts.upgradeCheck("forced");
    }, true);

    $("cowwm-mworker").innerHTML = 0;
    $("cowwm-bworker").innerHTML = 0;

    wonder.utils.addGlobalStyle('#cpMessage {' + '  position: fixed;' + '  bottom: 10%;' + '  left: 50%;' + '  width: 300px;' + '  margin-left: -300px;' + '  z-index: 9999;' + '  font-size: 18px;' + '  -moz-border-radius: 10px;' + '  border-radius: 10px 10px 10px 10px;' + '  background-image: initial;' + '  background-attachment: initial;' + '  background-origin: initial;' + '  background-clip: initial;' + '  background-color: rgba(0, 0, 0, 0.648438);' + '  color: rgb(255, 255, 255);' + '  padding-top: 20px;' + '  padding-right: 20px;' + '  padding-bottom: 20px;' + '  padding-left: 20px;' + '  opacity: 1;' + '  visibility: hidden;' + '  background-position: initial initial;' + '  background-repeat: initial initial; }' +
    '#cowwm-resetdb {' + '  float: left;' + '  padding-left: 10px; }' +
    '#cowwm-reset-user-db {' + '  float: right;' + '  padding-right: 10px; }' +
    '#cowwm-resetdb, #cowwm-reset-user-db {' + '  position: relative;' + '  bottom: -30px;' + '  color: white; }' +
    '#cowwm-opts-close {' + '  cursor: pointer; ' + '  position: absolute;' + '  top: 5px;' + '  right: 5px; }' +
    '.cowwm-icon {' + '  -moz-border-radius:3px 3px 3px 3px;' + '  background: #DADADA;' + '  border:1px solid #D3D3D3;' + '  bottom:2px;' + '  cursor: pointer;' + '  color:#555555;' + '  display:inline-block;' + '  font-size:13px;' + '  font-weight:normal;' + '  margin-left:1px;' + '  margin-right:1px;' + '  padding:2px;}' +
    '#cowwm-opts-img {' + '  left: 10px;' + '  position:absolute;}' +
    '#cowwm-collapse-img {' + '  left: 35px;' + '  position:absolute;}' +
    '#cowwm-upgrade-img {' + '  left: 60px;' + '  position:absolute;}' +
    '#cowwm-scan-img {' + '  left: 85px;' + '  position:absolute;}' +
    '#cowwm-cpanel {' + ' -moz-border-radius-topright: 5px;' + ' -moz-border-radius-topleft: 5px;' + '  position: fixed;' + '  left: 20px;' + '  right: 0;' + '  bottom: 0;' + '  top: auto;' + '  background: black;' + '  color: white;' + '  margin: 1em 0 0 0;' + '  width: 120px;' + '  text-align: center; ' + '  z-index: 99999;' + '  font-family: Verdana, sans-serif; }' +
    '#cowwm-status {' + '  float: right;' + '  margin-right: 10px;}' +
    '#cowwm-config {' + ' -moz-border-radius-topright: 5px;' + ' -moz-border-radius-topleft: 5px;' + ' -moz-border-radius-bottomright: 5px;' + ' -moz-border-radius-bottomleft: 5px;' + '  width: 300px;' + '  height: 150px;' + '  position: fixed;' + '  text-align: left;' + '  top: 50%; left: 40%;' + '  background-color: black; }' +
    '#cowwm-config h4 {' + ' text-align: center;' + ' -moz-border-radius-topright: 3px;' + ' -moz-border-radius-topleft: 3px;' + '  text-color: white; }' +
    '#cowwm-config label {' + '  color: white;' + '  margin-top: 2px;' + '  font-family: Verdana, sans-serif;' + '  font-weight: normal;' + '  display: normal;' + '  position: absolute;' + '  left: 10px; }' +
    '#cowwm-config input {' + ' width: 13px;' + ' height: 13px;' + ' padding: 0;' + ' vertical-align: middle;' + ' position: absolute;' + ' right: 10px; }' +
    '#cowwm-cpanel h4, cowwm-totals h4 {' + ' -moz-border-radius-topright: 5px;' + ' -moz-border-radius-topleft: 5px;' + '  background-color: #3B5998;' + '  height: 20px;' + '  padding-top: 5px;' + '  text-align: center;' + '  text-color: white; ' + '  color: white; }' +
    '#cowwm-summary {' + '  background-color: black;' + '  position: relative;' + '  text-align: left;' + '  top: bottom: 50px; }' +
    '#cowwm-mworker, #cowwm-bworker {' + '  width: 0px;' + '  height: 0px; }' +
    '#cowwm-totals b, #cowwm-totals span {' + '  color: white;' + '  float: left;' + '  padding-left: 10px;}' +
    '#cowwm-mworker {' + '  visibility: hidden;}' +
    '#cowwm-bworker {' + '  visibility: hidden;}');

    wonder.actions.updatePanel("", "Idle");
    wonder.utils.logger("City of Wonder Wall Manager Loaded")
    clearTimeout(tmout);
    wonder.opts.upgradeCheck();
    setInterval(wonder.utils.statusPoller, 1500);
  }, true);


}
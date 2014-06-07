// ==UserScript==
// @name         Websurf bot
// @namespace    www.websurf.cz
// @author       Gobie
// @version      0.0.4
// @include      http://*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function () {

// Settings
function Settings()
{
  this.klic = "Websurf";
  this.name = GM_getValue("name","");
  this.pass = GM_getValue("pass","");
  this.web = "http://www.websurf.cz/";
}

var SURF = false;
var DEBUG = false;
var Cfg = new Settings();

// Registered Commands
GM_registerMenuCommand(Cfg.klic + " - Start", startSurf);
GM_registerMenuCommand(Cfg.klic + " - Stop", stopSurf);
GM_registerMenuCommand(Cfg.klic + " - Credit status", creditStatus);

// Logs
function log(p) {
  if (DEBUG) GM_log((new Date().getTime()).toString() + " - " + p);
}
function logE(p) {
  log("Error - " + p);
}

// Utilities
function getRandom(min, max) {		
  return (Math.round(Math.random() * (max-min)) + min); 
}

function nastav(fce, cas) {
  if (SURF)
    setTimeout(fce, cas*1000);
}

function isAllDef() {
 	var res = true;
  for (var i = 0; i < arguments.length; ++i) {
		res &= (arguments[i] != undefined && arguments[i] != null && arguments[i] != "");
	}
  return res;
}

function promptValue(key, text) {
  var newValue = prompt(text,"");
  if (isAllDef(newValue)) {
    GM_setValue(key, newValue.toString());
    Cfg[key] = newValue;
  }
}

function request(type, url, loadFce, errorFce) {
  return GM_xmlhttpRequest({
    method: type,
    url: url,
    onload: loadFce,
    onerror: errorFce
  });
}

// Set settings
function enterSettings() {
  promptValue("name", "Enter your Websurf.cz username\nYour current username is '" + Cfg.name + "'");
  promptValue("pass", "Enter your Websurf.cz password\nYour current password is '" + Cfg.pass + "'");
}

// Login utilities
function isReadyToLogin() {
  if (isAllDef(Cfg.name, Cfg.pass)) {
    return true;
  } else {
    if (confirm("Username and password haven't been filled yet !\nDo you want to enter these information ?"))
      enterSettings();
    return false;
  }
}

function login(url, section, fce) {
  if (isReadyToLogin()) {
    request('POST', Cfg.web + url, 
      function(res) {
        log(section + " logging");
        if ($("font:contains('Chyba')", res.responseText).length != 0) {
          if (confirm("You have enetered incorrect username or password !\nDo u wish to enter new one ?")) {
            enterSettings();
            fce();
          }
        } else {
          fce();
        }
      },
      function() {
        logE(section + " logging");
      }
    );
  }
}

// Credit status check
function creditStatus() {
  request('GET', Cfg.web + "admin.php", 
    function(res) {
      var credits = $(".crcount", res.responseText);
      if (credits.length != 0) {
        alert("Credits: " + credits.text().replace(/\s+/g, ' '));
      } else if ($("input[name='akce'][value='prihlasit_se']", res.responseText).length != 0) {
        login("admin.php?jmeno=" + Cfg.name + "&heslo=" + Cfg.pass + "&akce=prihlasit_se&prihltrvale=1", "admin", creditStatus);
      }
    },
    function() { logE("admin logging"); }
  );
}

// Main functions
function nextWinAT() {
  templateWin(nextWinAT, "auto", "top.php?name=" + Cfg.name, [17, 20, 1]);
}
function nextWinAB() {
  templateWin(nextWinAB, "auto", "bottom.php", [17, 20, 1]);
}
function nextWinB() {
  templateWin(nextWinB, "best", "stranka.php?znamka=" + getRandom(1,5), [8, 12, 1]);
}
function nextWinM() {
  templateWin(nextWinM, "manual", "stranka.php", [12, 19, 1]);
}
function nextWinP() {
  templateWin(nextWinP, "pay", "stranka.php", [5, 60, 60]);
}

function templateWin(fce, section, param, timeint) {
  if (param != "bottom.php") 
    request('GET', Cfg.web + section + "/online.php",
      function() { log(section + " - online"); },
      function() { logE(section + " - online"); }
    );

  request('GET', Cfg.web + section + "/" + param,
    function(res) {
      log(section);
      if ($("input[name='akce'][value='login']", res.responseText).length != 0) {
        login(section + "/index.php?jmeno=" + Cfg.name + "&heslo=" + Cfg.pass + "&akce=login", section, fce);
      } else {
        nastav(fce, getRandom(timeint[0],timeint[1])*timeint[2]);
      }
    },
    function() {
      logE(section);
      nastav(fce, 45);
    }
  );
}

// Surf control
function startSurf() {
  SURF = true;
  if (isReadyToLogin()) {
    nextWinAT();
    nextWinAB();
    nextWinB();
    nextWinM();
    nextWinP();
  }
}

function stopSurf() {
  SURF = false;
}

})();
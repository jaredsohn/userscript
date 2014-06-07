// ==UserScript==                                                                
// @name          Fetch                                                     
// @namespace     http://4chan.org/neoquest                                      
// @description   Keyboardizing Neopets Fetch
// @include       http://www.neopets.com/games/maze/*                            
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://userscripts.org/scripts/source/54389.user.js
// @require       http://userscripts.org/scripts/source/54987.user.js
// @require       http://userscripts.org/scripts/source/131873.user.js
// ==/UserScript==  

var debug = false; 
var keyboard = new KeyboardDispatcher(get, log);
var name = 'Fetch-'

var settings = { 
    "name": "Fetch",
	"title": "Fetch: Configuration",
	"size":  ["550px",0],
	"description": "<br />",
   	"sessions": {
		"default": {
			"fields": fillDirectionSettings(keyboard)
        }
    },
    "positiveCallback": function(w, e) {
        w.Save();
        keyboard.reload();
        w.FadeOut(0);
        keyboard.disableOnKeyDown = false;
    },
    "negativeCallback": function(w, e) {
        w.FadeOut(0);
        keyboard.disableOnKeyDown = false;
    }
};

function log(val) {
  if (debug)
    GM_log(JSON.stringify(val));
};

function get(n) {
  return GM_getValue(name + n);
};

function set(n, v) {
  if (debug) {
    log('SET: ' + n + ' ' + typeof(n) + ' ' + v + ' ' + typeof(v));
  }
  GM_setValue(name + n, v); 
};

function fillDirectionSettings(keyboard) {
  var directions = {
      'North':     'W',
      'South':     'S',
      'East':      'D',
      'West':      'A',
  }
  for (var i in directions) {
    keyboard.addAction(i, directions[i], i);
  }
  return keyboard.getActions();
};

function buildFuncMap(keyboard) {
  var directions = ['North', 'South', 'East', 'West'];
  for (var i = 0; i < directions.length; i++) {
    keyboard.attachFunction(directions[i], maybeMove);
  }
};

function maybeMove(action, keyboard) {
  var area = $('area[alt="' + action + '"]');
  if (area) {
    area[0].click();
    return true;
  }
  return false;
};

function showConfig() {
  keyboard.disableOnKeyDown = true;
  configPage.Open().FadeIn(0);
  set('Config', true);
};

function main() {
  WinConfig.loadDefaultCss();
  GM_addStyle('.winconfig { z-index:200; }');
  configPage = WinConfig.init(settings)
  GM_registerMenuCommand('Fetch Configuration', showConfig);
  if (!get('Config')) {
    showConfig();
  }
  buildFuncMap(keyboard);
  keyboard.start();
};

main();

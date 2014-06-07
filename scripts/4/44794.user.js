// ==UserScript==
// @name           AEProject Script
// @namespace      guillaumeleonhart@hotmail.com
// @description    AEProject Script
// @include        http://*.astroempires.com/*
// @include        http://aeproject.free.fr/*
// @exclude        http://forum.astroempires.com/*
// @exclude        http://*.astroempires.com/login.aspx*
// @exclude        http://*.astroempires.com/home.aspx*
// @exclude        http://*.astroempires.com/
// @resource targt littletarget.gif
// @resource arrow littlearrow.gif
// @resource   eye eye.png
// @resource alarm alarmclock.png
// @resource   css style.css
// ==/UserScript==

////////////////////////////////////////////////////////////////////////
// Page Title Enhancement
////////////////////////////////////////////////////////////////////////
function enhancePageTitle() {
  pageUrl.match(/\?(.+)$/);
  var params = RegExp.$1;
  params = params.split("&");
  var EmpireParams = {};
  var serverTitle = universe + serverName.substring(1) + " - ";

  function getparams() {
    for(var i=0;i<params.length;i++) {
      var tmp = params[i].split("=");
      EmpireParams[tmp[0]] = unescape(tmp[1]);
    }
  }

  switch(location.pathname) {
    case "/commander.aspx": document.title = serverTitle+"Commanders"; break;
    case "/guild.aspx": document.title = serverTitle+"Guild"; break;
    case "/notes.aspx": document.title = serverTitle+"Notes"; break;
    case "/bookmarks.aspx": document.title = serverTitle+"Bookmarks"; break;
    case "/messages.aspx": document.title = serverTitle+"Messages"; break;
    case "/board.aspx": document.title = serverTitle+"Board"; break;
    case "/base.aspx":
      if (document.forms[0] && document.forms[0].elements[0]) {
        var base = document.forms[0].elements[0];
        if (base.options[base.selectedIndex]) {
          document.title = serverTitle+base.options[base.selectedIndex].text;
          break;
        }
      }
      document.title = serverTitle+"Base";
    break;
    case "/map.aspx": 
      getparams();
      if (EmpireParams["map"])
        document.title = serverTitle+"Map/" + EmpireParams["map"];
      else if (EmpireParams["loc"])
        document.title = EmpireParams["loc"];
      else
        document.title = serverTitle+"Map";
    break;
    case "/fleet.aspx":
      getparams();
      if (EmpireParams["gal"])
        document.title = serverTitle+ EmpireParams["gal"];
      else
        document.title = serverTitle+"Fleets";
    break;
    case "/empire.aspx":
      getparams();
      for(var i in EmpireParams) {
        switch(EmpireParams[i]) {
          case "scanners": document.title = serverTitle+"Scanners"; break;
          case "technologies": document.title = serverTitle+"Tech"; break;
          case "units": document.title = serverTitle+"Units"; break;
          case "structures": document.title = serverTitle+"Structures"; break;
          case "economy": document.title = serverTitle+"Economy"; break;
          case "bases_capacities": document.title = serverTitle+"Base Capacities"; break;
          case "bases_events": document.title = serverTitle+"Base Events"; break;
          case "trade": document.title = serverTitle+"Trade"; break;
          default: document.title = serverTitle+"Empire"; break;
        }
      }
    default:
      document.title = document.title.replace("Astro Empires - ", serverTitle)
    break;
  }
}

////////////////////////////////////////////////////////////////////////
// Main functions
////////////////////////////////////////////////////////////////////////
function getPageType() {
	if (location.href.indexOf('fleet.aspx')!=-1) {
		if (location.search.indexOf('gal')!=-1)
			return 'mapGalaxy';
		else if ($('destination'))
			return 'fleetMove';
		else if (location.search=='')
			return 'fleets';
		else
			return 'fleetsData';
	} else if (location.href.indexOf('map.aspx')!=-1) {
    var searchVars = location.search.replace(/&order=(.*)/, '');
    switch (searchVars.length) {
    case 0:
      return 'map';
    break;
    case 8:
      return 'mapGalaxy';
    break;
		case 17:
			if (location.href.indexOf('cmp=')!=-1) {
				return 'mapRegion';
			} else {
				return 'mapAstro';
			}
		break;
		case 20:
			return 'mapSystem';
		break;
		}
	} else if (location.href.indexOf('empire.aspx')!=-1) {
		if (location.search.indexOf('bases_capacities')!=-1)
			return 'bases_capacities';
		if (location.search.indexOf('structures')!=-1)
			return 'structures';
		if (location.search.indexOf('economy')!=-1)
			return 'economy';
		if (location.search.indexOf('units')!=-1)
			return 'units';
		if (location.search.indexOf('fleet')!=-1)
			return 'fleetdata';
		if (location.search.indexOf('technologies')!=-1)
			return 'technology';
		if (location.search.indexOf('scanners')!=-1)
			return 'scanners';
		if (location.search.indexOf('trade')!=-1)
			return 'trade';
		if (location.search=='' || location.search.indexOf('bases_events'))
			return 'empire';
	} else if (location.href.indexOf('base.aspx')!=-1) {
		if (location.search.indexOf('structures')!=-1 || location.search.indexOf('defenses')!=-1) {
      if (location.search.indexOf('info')!=-1)
        return 'baseBuildInfo';
			return 'baseBuildQueue';
		} else if (location.search.indexOf('production')!=-1) {
      if (location.search.indexOf('info')!=-1)
        return 'baseProdInfo';
			return 'baseProdQueue';
		} else if (location.search.indexOf('research')!=-1) {
      if (location.search.indexOf('info')!=-1)
        return 'baseSearchInfo';
			return 'baseSearchQueue';
		} else if (location.search.indexOf('trade')!=-1) {
      if (location.search.indexOf('&action=new')!=-1)
        return 'baseAddTrade';
			return 'baseTrade';
		} else if (location.search.indexOf('?base=')!=-1)
			return 'baseOverview';
		else
			return 'base';
	}	else if (location.href.indexOf('profile.aspx')!=-1) {
    if (location.search.indexOf('player')!=-1 && location.search.indexOf(gameID)==-1)
      return 'player';
    if (location.search.indexOf('action=edit')!=-1)
      return 'editProfile';
    return 'profile';
	} else if (location.href.indexOf('account.aspx')!=-1) {
    if (location.search.indexOf('aepconfig')!=-1)
      return 'aepConfig';
		return 'account';
	}	else if (location.href.indexOf('guild.aspx')!=-1) {
    if (location.search.indexOf('creategroup')!=-1)
      return 'createGroup';
    if (location.search.indexOf('guild=')!=-1)
      return 'guild';
		return 'myGuild';
  } else if (location.href.indexOf('board.aspx')!=-1)
		return 'board';
	else if (location.href.indexOf('messages.aspx')!=-1)
		return 'messages';
	else if (location.href.indexOf('ranks.aspx')!=-1)
		return 'ranks';
	else if (location.href.indexOf('search.php')!=-1)
		return 'reportSearch';
	else if (location.href.indexOf('ranks.aspx')!=-1)
		return 'ranks';
	else if (location.href.indexOf('commander.aspx')!=-1)
		return 'commander';
	else if (location.href.indexOf(databaseUrl)!=-1)
		return 'database';
	else
		return 'other';
}

function $(id) {
  return document.getElementById(id);
}

function $f(id) {
  return moveFrame.contentDocument.getElementById(id);
}

Function.prototype.bind = function(object) {
  var func = this;
  return function() { return func.apply(object, arguments); }
}

function node(opt) {
  function attr(name) {
    var value = opt[name];
    delete opt[name];
    return value;
  }
  var expandos = { id: 1, className: 1, title: 1, type: 1, checked: 1 };
  var id = opt.id;
  var n = $(id);
  if (!n) {
    n = document.createElement(attr("tag") || "div");
    var after = attr("after");
    var before = opt.prepend ? opt.prepend.firstChild : attr("before");
    var parent = attr("prepend") || attr("append") || (before || after || {}).parentNode;
    if (parent) {
      if (before)
        parent.insertBefore(n, before);
      else if (after)
        parent.insertBefore(n, after.nextSibling);
      else
        parent.appendChild(n);
    }
    if (id) n.id = id;
  }
  var html = attr("html");
  if ("undefined" != typeof html) n.innerHTML = html;
  var text = attr("text");
  if ("undefined" != typeof text) n.textContent = text;
  var style = attr("style");
  if (style)
    for (var prop in style)
      n.style[prop] = style[prop];
  for (prop in opt)
    if (expandos[prop])
      n[prop] = opt[prop];
    else
      n.setAttribute(prop, opt[prop]+"");
  return n;
}

function centerEl(el) {
  var panew = el.offsetWidth;
  var paneh = el.offsetHeight;
  var winw = window.innerWidth-20;
  var winh = window.innerHeight-20;
  
  el.style.top = String((winh - paneh)/2)+'px';
  el.style.left = String((winw - panew)/2)+'px';
}

function isForumLogin(html) {
	var start = html.slice(0,5);
	if (start=='<!DOC' || start=='<html') {
		return true;
	}
	return false;
}

function interpretForumLogin(html) {
	if (isForumLogin(html))
		return "<span style='color:red;'>Database access<br /><a href=\""+databaseUrl+"ucp.php\" target=\"_blank\">&raquo; Please login &raquo;</a><br /> or ask administrators</span>";
	else return html;
}

function blankCallback() {}

var EventManager = {
  _registry: null,
  Initialise: function() {
    if (this._registry == null) {
      this._registry = [];
      EventManager.Add(window, "unload", this.CleanUp);
    }
  },
   Add: function(obj, type, fn, useCapture) {
    this.Initialise();
    if (typeof obj == "string") {
        obj = $(obj);
    }
    if (obj == null || fn == null) {
        return false;
    }
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, useCapture);
      this._registry.push({obj: obj, type: type, fn: fn, useCapture: useCapture});
      return true;
    }
    return false;
  },
  CleanUp: function() {
    for (var i = 0; i < EventManager._registry.length; i++) {
      with (EventManager._registry[i]) {
        obj.removeEventListener(type, fn, useCapture);
      }
    }
    EventManager._registry = null;
  }
};

function getVars() {
  var listVars = GM_getValue('AEP_listvars', '').split('#');
  for (var i=1; i<listVars.length; i++) {
    var res = listVars[i].split(",");
    vars[res[0]] = GM_getValue(res[0]+'_'+serverName, res[1]);
  }
}

function saveVars() {
  var listVars = '';
  for (var name in vars) {
    GM_setValue(name+'_'+serverName, vars[name]);
  }
}

////////////////////////////////////////////////////////////////////////
// Vars defined
////////////////////////////////////////////////////////////////////////

var global = this;
var vars = new Array();
var databaseUrl = 'http://aeproject.free.fr/';
var serverUrl = window.location.hostname.toString();
var pageUrl = window.location.toString();

var pageType = getPageType();

if (pageType == 'database') {
  try {
    var serverName = $('currServ').innerHTML.toLowerCase();
  } catch(e) {throw('Server Error')}
  var universe = serverName[0].toUpperCase();
  var gameUrl = 'http://'+serverName+'.astroempires.com/';
  var serverUrl = serverName+'.astroempires.com';
} else {
  var serverName = serverUrl.split('.')[0];
  var universe = serverUrl[0].toUpperCase();
  var gameUrl = 'http://'+serverName+'.astroempires.com/';
}

if (serverName == 'aeproject')
  throw('Server Error')

var version = GM_getValue('AEP_version_'+serverName, 0);
var gameID = GM_getValue('AEP_gameID_'+serverName, 0);
var playerName = GM_getValue('AEP_name_'+serverName, '');
var guild = GM_getValue('AEP_guild_'+serverName, '');

try {
  firstFrame = top.document.getElementById('moveFrame');
} catch(e) { firstFrame = 0; }
var isMoveFrame = (firstFrame) ? 1 : 0;

var img_target = GM_getResourceURL("targt");
var img_arrow = GM_getResourceURL("arrow");
var img_alarm = GM_getResourceURL("alarm");
var img_eye = GM_getResourceURL("eye");

////////////////////////////////////////////////////////////////////////
// Main Program
////////////////////////////////////////////////////////////////////////

var css = GM_getResourceText("css");
GM_addStyle(css);

if (pageType == 'profile') {
  var profileTable = document.evaluate("//table[contains(.,'Player #')]/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var fullName = profileTable.childNodes[1].firstChild.innerHTML;
  var tag = fullName.indexOf('] ',0);
  if(tag == -1) {
    guild = 'none';
    playerName = fullName;
  } else {
    guild = fullName.substring(1, tag);
    playerName = fullName.substring(tag+2);
  }
  gameID = profileTable.childNodes[3].firstChild.childNodes[2].nodeValue;

  GM_setValue('AEP_gameID_'+serverName, gameID);
  GM_setValue('AEP_name_'+serverName, playerName);
  GM_setValue('AEP_guild_'+serverName, guild);
} else {
  if (GM_getValue('AEP_gameID_'+serverName, '') == '' || (GM_getValue('AEP_name_'+serverName, '') == '' || GM_getValue('AEP_guild_'+serverName, '') == '') ) {
    window.location.href = gameUrl+'profile.aspx'
  }
}

var ads = document.evaluate("//table[starts-with(., 'Advertising')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (ads) {
  ads.parentNode.removeChild(ads.previousSibling)
  ads.parentNode.removeChild(ads)
}

getVars();
enhancePageTitle();
var moduleLoader = GM_getValue('AEP_MODULE_LOADER',';').split("\n");
for (modules in moduleLoader) {
  var res = moduleLoader[modules].split('#');
  if (eval(res[1])) {
    try {
      global.eval(GM_getValue('AEP_MODULE_'+res[0],';'));
      GM_log(res[0]);
    } catch(e) {}
  }
}

GM_xmlhttpRequest({
  method: 'POST',
  url: databaseUrl+'ajax/login.php',
  headers: {
    'Accept': 'text/html',
    'Content-type':'application/x-www-form-urlencoded'
  },
  data: 'account='+gameID
       +'&name='+encodeURIComponent(playerName)
       +'&guild='+encodeURIComponent(guild)
       +'&server='+encodeURIComponent(serverName)
       +'&version='+escape(version),
  onload: loginResponse
});

function loginResponse(responseDetails) {
  var responseText = responseDetails.responseText;
  if (isForumLogin(responseText)) {
    var updateNotification = node({html: '<u>AEProject Script</u><br />'+interpretForumLogin(responseText), className:'saveNotification', 
      style:{display:'block', position:'fixed', padding:'5px'}, append: document.body});
  } else {
    try{
      global.eval(responseDetails.responseText);
    } catch(e) {}
  }
}

window.addEventListener("unload", saveVars, false);
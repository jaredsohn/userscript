// ==UserScript==
// @name           Quake Live Custom map launcher
// @version        1.0.0
// @namespace      http://userscripts.org/users/kry
// @description    Custom map launcher
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

/************************************************************

Licensed for unlimited modification and redistribution
as long as this notice is kept intact.

Quake Live Custom map launcher script made by kry.

Game launch scripts taken from the Quake Live New Alt Browser
by wn_. If you have not tried he's browser, try it!
http://userscripts.org/scripts/show/73076

This script adds a map launcher under the chat

Version history
	Version 1.0.0
		- First version
		
Known bugs
	- If you encounter bugs right after installing the script
	add atleast 1 map and see if the bugs are still there.

************************************************************/

/**
 * GM_ API emulation for Chrome
 * 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (typeof GM_getValue == "undefined") {
  GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value)
      return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
      case 'b':
        return value == 'true';
      case 'n':
        return Number(value);
      default:
        return value;
    }
  }
  GM_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  }
  GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }
  GM_addStyle = function(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  GM_registerMenuCommand = function() {}
}

var mapAmount = GM_getValue("mapAmount",0);

var $ = unsafeWindow.jQuery,
    quakelive = unsafeWindow.quakelive,
    LaunchGame = unsafeWindow.LaunchGame,
    pluginx = unsafeWindow.pluginx;

/**
 * Set up the prototype for launch game parameters, which is used
 * in ql_alt_parameters() and ql_alt_demo()
 */
function aLaunchGameParams(a) {
  a = $.extend({
    isBotGame: false,
    isTraining: false,
    password: null,
    hasFullscreen: false
  }, a);
  this.isBotGame = a.isBotGame;
  this.isTraining = a.isTraining;
  this.password = a.password;
  this.hasFullscreen = quakelive.cvars.GetIntegerValue("r_fullscreen", 0) != 0;
  this.cmdStrings = []
}
aLaunchGameParams.prototype.Append = function (a) {
  this.cmdStrings.push(a)
};
aLaunchGameParams.prototype.Prepend = function (a) {
  this.cmdStrings.shift(a)
};
aLaunchGameParams.prototype.GetCommandLine = function () {
  var a = quakelive.cvars.Get("model");
  quakelive.cvars.Set("headmodel", a.value);
  quakelive.cvars.Set("team_model", a.value);
  quakelive.cvars.Set("team_headmodel", a.value);
  quakelive.cfgUpdater.StoreConfig(quakelive.cfgUpdater.CFG_BIT_REP);

  a = "";

  if (quakelive.siteConfig.premiumStatus == "standard" && !this.isTraining)
    a += "+set in_nograb 1 ";

  a += "+set r_fullscreen " + quakelive.cvars.GetIntegerValue("r_fullscreen", 0) + " ";
  a += '+set gt_user "' + pluginx.username + '" ';
  a += '+set gt_pass "' + pluginx.password + '" ';
  a += '+set gt_realm "' + quakelive.siteConfig.realm + '" ';

  if (typeof this.password == "string")
    a += '+set password "' + this.password + '" ';

  a += this.cmdStrings.join(" ");

  return a;
};

GM_addStyle(" #mapLauncherContainer {color:black;} #mapLauncherContainer input {border-style:inset;border-color:black;border-width:1px;} ");

function get_maps()
{
	var maps;
	mapAmount = GM_getValue("mapAmount");
	var i = 0;
	
	while ( i < mapAmount )
	{
		i++;
		
		var map = GM_getValue("map" + i);
		
		maps = maps + '<option>'+map+'</option>';
	}
	
	return maps;
}

function get_maps_id()
{
	var maps;
	mapAmount = GM_getValue("mapAmount");
	var i = 0;
	
	while ( i < mapAmount )
	{
		i++;
		
		var map = GM_getValue("map" + i);
		
		maps = maps + '<option value="' + i + '">'+map+'</option>';
	}
	
	return maps;
}

function launch()
{
	var mapSelect = document.getElementById("mapSelect");
	var map = mapSelect.options[mapSelect.selectedIndex].text;
	var other = document.getElementById("otherOptionsField").value;
	
	var k = new aLaunchGameParams;
	k.Append("+map " + map + " " + other);
	LaunchGame(k)
	
	// launch_map();
}

function add()
{
	currentAmount = GM_getValue("mapAmount",0);

	currentAmount++;
	GM_setValue("mapAmount",currentAmount);
	
	mapAmount = currentAmount;
	
	GM_setValue("map" + currentAmount,document.getElementById("addMapField").value);
	resetLauncher();
}

function remove()
{
	currentAmount = GM_getValue("mapAmount");
	var mapRemoveSelect = document.getElementById("mapRemoveSelect");
	var removedMap = mapRemoveSelect.options[mapRemoveSelect.selectedIndex].value;
	
	if	( currentAmount == 1 )
	{
		GM_deleteValue("mapAmount");
		GM_deleteValue("map1");
	}
	else
	{
		var i = parseInt(removedMap);
		while ( i < currentAmount )
		{
			var i1 = i+1;
			var nextMap = GM_getValue("map"+i1);
			GM_setValue("map" + i,nextMap);
			i = i1;
		}
		GM_deleteValue("map" + currentAmount);
		GM_setValue("mapAmount",currentAmount - 1);
	}
	resetLauncher();
}

function resetLauncher()
{
	mapAmount = GM_getValue("mapAmount",0);
	if (mapAmount != 0)
	{
		document.getElementById("launcher").innerHTML = "Map<br />" +
			"<select id='mapSelect'>" +
			get_maps() +
			"</select>" +
			"<br />" +
			"Other options" +
			"<br />" +
			"<input type='text' size='25' id='otherOptionsField' />" +
			"<br />" +
			"<button id='launchbutton'>Launch map</button>";
		
		document.getElementById("remover").innerHTML = "Remove map from list<br />" +
			"<select id='mapRemoveSelect'>" +
			get_maps_id() +
			"</select><br />" +
			"<button id='removebutton'>Remove map</button>";
	}
	else
	{
		document.getElementById("launcher").innerHTML = "";
		document.getElementById("remover").innerHTML = "";
	}
	document.getElementById('addbutton').addEventListener("click", add, true);
	document.getElementById('removebutton').addEventListener("click", remove, true);
	document.getElementById('launchbutton').addEventListener("click", launch, true);
}

var mapss = get_maps();
var mapss_id = get_maps_id();

function addLauncher()
{
	var mapLauncherContainer = document.createElement("div");
	var mapLauncher = document.createElement("div");
	var launcher = document.createElement("div");
	var adder = document.createElement("div");
	var remover = document.createElement("div");
	
	mapLauncherContainer.id = "mapLauncherContainer";
	launcher.id = "launcher";
	remover.id = "remover";
	
	if (mapAmount != 0)
	{
		launcher.innerHTML = "Map<br />" +
			"<select id='mapSelect'>" +
			mapss +
			"</select>" +
			"<br />" +
			"Other options" +
			"<br />" +
			"<input type='text' size='25' id='otherOptionsField' /><br />" +
			"<button id='launchbutton'>Launch map</button>";
		remover.innerHTML = "Remove map from list<br />" +
			"<select id='mapRemoveSelect'>" +
			mapss_id +
			"</select><br />" +
			"<button id='removebutton'>Remove map</button>";
	}
	else
	{
		launcher.innerHTML =
			"No maps in the list";
		remover.innerHTML =
			"";
	}

	adder.innerHTML = "Add map to list" +
		"<br />" +
		"<input type='text' size='25' id='addMapField' /><br />" +
		"<button id='addbutton'>Add map</button>";

	mapLauncher.appendChild( launcher );
	mapLauncher.appendChild( adder );
	mapLauncher.appendChild( remover );

	mapLauncherContainer.appendChild( mapLauncher );
	
	document.getElementById("qlv_contentChat").appendChild(mapLauncherContainer);
	
	document.getElementById('addbutton').addEventListener("click", add, true);
	document.getElementById('removebutton').addEventListener("click", remove, true);
	document.getElementById('launchbutton').addEventListener("click", launch, true);
}

var haslauncher = 0;
var hasingamelauncher = 0;

document.body.addEventListener('DOMNodeInserted', function(event)
{		
	if ( document.getElementById("qlv_contentChat") )
	{
		if ( haslauncher == 0 )
		{
			haslauncher = 1;
			addLauncher();
		}
	}
	else
	{
		haslauncher = 0;
	}
}, false);

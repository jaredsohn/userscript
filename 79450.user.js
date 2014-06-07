// ==UserScript== 
// @name	tester
// @namespace 	aehelperPsycho
// @description	Astro Empires helper, Psycho's version
// @include	http://*.astroempires.com/*
// @exclude	http://www.astroempires.com/
// @exclude	http://forum.astroempires.com/*
// @exclude	http://*.astroempires.com/login.aspx*
// @exclude	http://*.astroempires.com/home.aspx*
// @exclude	http://*.astroempires.com/profile.aspx?action=*

// ==/UserScript==

// @contributor     C3 - Production Helper http://userscripts.org/scripts/show/71893
// @contributor C3 - Battlepaster http://userscripts.org/scripts/show/72194


var changeLog =
  [["Once Installed", "You can control most features from the Account page of your profile. For your finishing times to be at the 24 hours setting change the coutdown cut off to 24 hours. You can also toggle through the different time formats on the empire page by pressing the time left.To set your home guild just visit your guild page. To set the stances of other guilds you can either do this manually on a guilds profile or by the guild rankings page."],
["Mar 25, 2010", "Added a auto battlepaste feature."],
["Mar 24, 2010", "Added an integrated battle calculator."],
["Mar 24, 2010", "New Version Up."],
["To come", "An auto fleet launcher and a all in one production tool."],
   ];

var pageLoadTime = new Date(); // Will be initialized from the game clock
var secondsElapsed = 0;        // Seconds elapsed since the page was loaded
var currentTime = new Date();  // Page load time + seconds elapsed

var revision = Number("$Revision: 2955 $".match(/\d+/))
var server = "unknown";
if (document.location.href.match(/http:\/\/([a-z]+)\.astroempires\.com\//i)) {
  server = RegExp.$1;
}

if (navigator.appName.match(/Opera/i)) {
  GM_log = opera.postError;
  var opera = true;
}
else {
  var opera = false;
}

//
// Colors namespace, from:
// http://www.switchonthecode.com/tutorials/javascript-interactive-color-picker
//
var Colors = new function()
{
  this.ColorFromHSV = function(hue, sat, val)
  {
    var color = new Color();
    color.SetHSV(hue,sat,val);
    return color;
  }

  this.ColorFromRGB = function(r, g, b)
  {
    var color = new Color();
    color.SetRGB(r,g,b);
    return color;
  }

  this.ColorFromHex = function(hexStr)
  {
    var color = new Color();
    color.SetHexString(hexStr);
    return color;
  }

  this.ColorFromRGBString = function(rgbStr)
  {
    var color = new Color();
    color.SetRGBString(rgbStr);
    return color;
  }

  function Color()
  {
    //Stored as values between 0 and 1
    var red = 0;
    var green = 0;
    var blue = 0;
   
    //Stored as values between 0 and 360
    var hue = 0;
   
    //Stored as values between 0 and 1
    var saturation = 0;
    var value = 0;
     
    this.SetRGB = function(r, g, b)
    {
      if (isNaN(r) || isNaN(g) || isNaN(b))
        return false;
       
      r = r/255.0;
      red = r > 1 ? 1 : r < 0 ? 0 : r;
      g = g/255.0;
      green = g > 1 ? 1 : g < 0 ? 0 : g;
      b = b/255.0;
      blue = b > 1 ? 1 : b < 0 ? 0 : b;
     
      calculateHSV();
      return true;
    }
   
    this.Red = function()
    { return Math.round(red*255); }
   
    this.Green = function()
    { return Math.round(green*255); }
   
    this.Blue = function()
    { return Math.round(blue*255); }
   
    this.SetHSV = function(h, s, v)
    {
      if (isNaN(h) || isNaN(s) || isNaN(v))
        return false;
       
      hue = (h >= 360) ? 359.99 : (h < 0) ? 0 : h;
      saturation = (s > 1) ? 1 : (s < 0) ? 0 : s;
      value = (v > 1) ? 1 : (v < 0) ? 0 : v;
      calculateRGB();
      return true;
    }
     
    this.Hue = function()
    { return hue; }
     
    this.Saturation = function()
    { return saturation; }
     
    this.Value = function()
    { return value; }
     
    this.SetHexString = function(hexString)
    {
      if(hexString == null || typeof(hexString) != "string")
        return false;
       
      if (hexString.substr(0, 1) == '#')
        hexString = hexString.substr(1);
       
      if(hexString.length != 6)
        return false;
         
      var r = parseInt(hexString.substr(0, 2), 16);
      var g = parseInt(hexString.substr(2, 2), 16);
      var b = parseInt(hexString.substr(4, 2), 16);
     
      return this.SetRGB(r,g,b);
    }
     
    this.HexString = function()
    {
      var rStr = this.Red().toString(16);
      if (rStr.length == 1)
        rStr = '0' + rStr;
      var gStr = this.Green().toString(16);
      if (gStr.length == 1)
        gStr = '0' + gStr;
      var bStr = this.Blue().toString(16);
      if (bStr.length == 1)
        bStr = '0' + bStr;
      return ('#' + rStr + gStr + bStr).toUpperCase();
    }
   
    this.SetRGBString = function(rgbStr)
    {
      var x = rgbStr.match(/\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)\s*/i);
      if (x) {
	return this.SetRGB(Number(x[1]), Number(x[2]), Number(x[3]));
      }
      else {
	return false;
      }
    }

    this.Complement = function()
    {
      var newHue = (hue>= 180) ? hue - 180 : hue + 180;
      var newVal = (value * (saturation - 1) + 1);
      var newSat = (value*saturation) / newVal;
      var newColor = new Color();
      newColor.SetHSV(newHue, newSat, newVal);
      return newColor;
    }
   
    function calculateHSV()
    {
      var max = Math.max(Math.max(red, green), blue);
      var min = Math.min(Math.min(red, green), blue);
     
      value = max;
     
      saturation = 0;
      if(max != 0)
        saturation = 1 - min/max;
       
      hue = 0;
      if(min == max)
        return;
     
      var delta = (max - min);
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue = hue * 60;
      if(hue <0)
        hue += 360;
    }
   
    function calculateRGB()
    {
      red = value;
      green = value;
      blue = value;
     
      if(value == 0 || saturation == 0)
        return;
     
      var tHue = (hue / 60);
      var i = Math.floor(tHue);
      var f = tHue - i;
      var p = value * (1 - saturation);
      var q = value * (1 - saturation * f);
      var t = value * (1 - saturation * (1 - f));
      switch(i)
      {
        case 0:
          red = value; green = t; blue = p;
          break;
        case 1:
          red = q; green = value; blue = p;
          break;
        case 2:
          red = p; green = value; blue = t;
          break;
        case 3:
          red = p; green = q; blue = value;
          break;
        case 4:
          red = t; green = p; blue = value;
          break;
        default:
          red = value; green = p; blue = q;
          break;
      }
    }
  }
}();
//
// End of Colors namespace
//

function colorChart(startHue, endHue, height, width, callback)
{
  var hueDiff = endHue - startHue;
  if (hueDiff < 0)
    hueDiff += 360;
  var html = [];
  html.push("<table cellspacing='0' cellpadding='0' " +
	    "style='border:1px solid;border-color:white;cursor:crosshair'>");
  var cellHTML = function(hex) {
    return "<td style='background:"+hex
    +";height:3;padding-right:6;border:0'/>";
  }
  var rows = height/3;
  var cols = width/6;
  for (var row = 0; row < rows; row++) {
    var hue = startHue + (row / (rows-1) * hueDiff);
    if (hue >= 360)
      hue -= 360;
    html.push("<tr>");
    for (var col = 0; col < cols/2; col++) {
      var sat = col / (cols/2 - 1);
      var hex = Colors.ColorFromHSV(hue, sat, 1).HexString();
      html.push(cellHTML(hex));
    }
    for (var col = 1; col <= cols/2; col++) {
      var value = col / (cols/2);
      var hex = Colors.ColorFromHSV(hue, 1, 1-value).HexString();
      html.push(cellHTML(hex));
    }
    html.push("</tr>");
  }
  var div = document.createElement("div");
  div.innerHTML = html.join("");
  delete html;

  var down = false;

  function downListener(event) {
    down = true;
  }
  function moveListener(event) {
    if (event.target.nodeName == "TD" && down) {
      var c = event.target.style.backgroundColor+"";
      c = Colors.ColorFromRGBString(c).HexString();
      callback(c);
    }
  }
  function upListener(event) {
    down = false;
    if (event.target.nodeName == "TD") {
      var c = event.target.style.backgroundColor+"";
      c = Colors.ColorFromRGBString(c).HexString();
      callback(c);
    }
  }
  div.addEventListener("mousedown", downListener, false);
  div.addEventListener("mousemove", moveListener, false);
  div.addEventListener("mouseup", upListener, false);
  return div;
}

function xpath(path, root)
{
  if (!root)
    root = document;
  var result = document.evaluate(path, root, null,
				 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var nodes = [];
  for (var i = 0; i < result.snapshotLength; i++) {
    nodes[i] = result.snapshotItem(i);
  }
  return nodes;
}

function xpath1(path, root)
{
  var nodes = xpath(path, root);
  if (nodes.length != 1)
    return undefined;
  return nodes[0];
}

function getSetting(key, defaultValue)
{
  if (opera) {
    return defaultValue;
  }
  return GM_getValue(server + "_aehelperPsycho_"+key, defaultValue);
}

function setSetting(key, value)
{
  if (!opera) {
    return GM_setValue(server + "_aehelperPsycho_"+key, value);
  }
}

function getFlag(key)
{
  return getSetting(key, "true") == "true";
}

function setFlag(key, value)
{
  if (value) {
    setSetting(key, "true");
  }
  else {
    setSetting(key, "false");
  }
}

function getNumberList(list)
{
  var x = list.match(/(\d+,?)+/);
  if (!x) return [];
  return list.split(",").map(Number);
}

function validateNumberList(list)
{
  return getNumberList(list).join(",");
}

function getFriendlyGuilds()
{
  var x = getNumberList(getSetting("friendlyGuilds", ""));
  return arrayRemove(x, Number(getSetting("homeGuild", 0)));
}

function getHostileGuilds()
{
  return getNumberList(getSetting("hostileGuilds", ""));
}

function getEnemyGuilds()
{
  return getNumberList(getSetting("enemyGuilds", ""));
}

function arrayRemove(array, value)
{
  for (var i in array) {
    if (array[i] == value) {
      array.splice(i, 1);
    }
  }
  return array;
}

function arrayContains(array, value)
{
  for (var i in array) {
    if (array[i] == value) {
      return true;
    }
  }
  return false;
}

function arrayInsertSorted(array, value)
{
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return array;
    }
    else if (array[i] > value) {
      array.splice(i, 0, value);
      return array;
    }
  }
  array[array.length] = value;
  return array;  
}

function arrayDedup(array)
{
  array.sort();
  var i = 1;
  while (i < array.length) {
    if (array[i] == array[i-1])
      array.splice(i, 1);
    else
      i++;
  }
  return array;
}

function isFriendlyGuild(guild)
{
  return arrayContains(getFriendlyGuilds(), guild);
}

function isHostileGuild(guild)
{
  return arrayContains(getHostileGuilds(), guild);
}

function isEnemyGuild(guild)
{
  return arrayContains(getEnemyGuilds(), guild);
}

function setStances(friendlyGuilds, hostileGuilds, enemyGuilds)
{
  setSetting("friendlyGuilds", friendlyGuilds.join(","));
  setSetting("hostileGuilds", hostileGuilds.join(","));
  setSetting("enemyGuilds", enemyGuilds.join(","));
}

function setFriendlyGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayInsertSorted(friendly, guild);
  arrayRemove(hostile, guild);
  arrayRemove(enemy, guild);
  setStances(friendly, hostile, enemy);
}

function setNeutralGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayRemove(friendly, guild);
  arrayRemove(hostile, guild);
  arrayRemove(enemy, guild);
  setStances(friendly, hostile, enemy);
}

function setHostileGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayRemove(friendly, guild);
  arrayInsertSorted(hostile, guild);
  arrayRemove(enemy, guild);
  setStances(friendly, hostile, enemy);
}

function setEnemyGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayRemove(friendly, guild);
  arrayRemove(hostile, guild);
  arrayInsertSorted(enemy, guild);
  setStances(friendly, hostile, enemy);
}

function getGuildLink(guild, color)
{
  var tag = getSetting("tag"+guild, "#"+guild);
  return "<a style='color:"+color
    +"' href='guild.aspx?guild="+guild+"'>"+tag+"</a>";
}

function getGuildLinks(guilds, color)
{
  return guilds.map(function (x) {return getGuildLink(x, color);}).join(", ");
}

function getFriendlyGuildLinks()
{
  return getGuildLinks(getFriendlyGuilds(), getFriendlyPlayerColor());
}

function getHostileGuildLinks()
{
  return getGuildLinks(getHostileGuilds(), getHostilePlayerColor());
}

function getEnemyGuildLinks()
{
  return getGuildLinks(getEnemyGuilds(), getEnemyPlayerColor());
}
function getAddressList()
{
  var list = getNumberList(getSetting("knownPlayers", ""));
  if (getFlag("alwaysIncludeContacts"))
    list = list.concat(getContacts());
  if (getFlag("alwaysIncludeGuildMates"))
    list = list.concat(getGuildMates());
  var blocked = getBlockedContacts();
  for (var i = 0; i < blocked.length; i++) {
    arrayRemove(list, blocked[i]);
  }
  return arrayDedup(list);
}

function addToAddressList(player)
{
  var players = getNumberList(getSetting("knownPlayers", ""));
  arrayInsertSorted(players, Number(player));
  setSetting("knownPlayers", players.join(","));
}

function removeFromAddressList(player)
{
  var players = getNumberList(getSetting("knownPlayers", ""));
  arrayRemove(players, Number(player));
  setSetting("knownPlayers", players.join(","));
}

function setPlayerName(player, name)
{
  name = name.replace(/^\s+/, "");
  name = name.replace(/\s+$/, "");
  setSetting("player"+player, name);
}

function getPlayerName(player)
{
  return getSetting("player"+player, "Player #"+player);
}

function setContacts(players)
{
  setSetting("contacts", players.join(","));
}

function getContacts()
{
  return getNumberList(getSetting("contacts", ""));
}

function setBlockedContacts(players)
{
  setSetting("blockedContacts", players.join(","));
}

function getBlockedContacts()
{
  return getNumberList(getSetting("blockedContacts", ""));
}

function setGuildMates(players)
{
  setSetting("guildMates", players.join(","));
}

function getGuildMates()
{
  return getNumberList(getSetting("guildMates", ""));
}

function getPlayerLink(player)
{
  var name = getPlayerName(player).replace(/\s+/g, "&nbsp;");
  return "<a href='profile.aspx?player="+player+"'>"+name+"</a>";
}

function showConfigOnAccountPage()
{
  function heading(text, section)
  {
    return "<tr><th align='center' colspan='2' "
      + "style='padding-top:10px;padding-bottom:5px'>"
      + "<u>"+text+"</u> &nbsp; <small>("
      + "<a id='showHide_"+section+"' href='javascript:;'></a>)"
      +"</small></th></tr>";
  }

  var bgColor = "transparent";
  var changes = "<table class='no_back' ";
  changes += "style='border:0;background:transparent;'>";
  for (var i = 0; i < changeLog.length && i < 10; i++) {
    changes += "<tr><td class='gray'><b>"+changeLog[i][0].replace(/ /g, "&nbsp;")+":</b>&nbsp;&nbsp;</td>";
    changes += "<td class='gray' style='padding-right:5px;'>"+changeLog[i][1]+"</td></tr>";
  }
  changes += "</table>";

  var url = "http://userscripts.org/scripts/source/72379.user.js";
  var html = "<table class='no_back' width='590' ";
  html += "style='background:"+bgColor+";' id='aeHelperConfig'>";
  html += "<tr><th align='center' colspan='2' style='padding-bottom:10px;'><font size='+1'>AE Helper Psycho Edition</font> &nbsp; &nbsp;</th></tr>";
  html += "<tr><td width='190'></td><td width='400'></td></tr>";
  html += "<tr><th align='center' colspan='2'>Current revision:&nbsp;";
  html += "<b>"+revision+" &nbsp; &nbsp; ";
  html += "(<a id='updateLink' href='"+url+"'>Update</a>)</b></th></tr>";
  html += "<tr><td align='left' colspan='2' class='gray' style='padding-left:5px;'>Problems updating to the latest revision?  Hit Ctrl-Shift-Del and clear your cache first.</td></tr>";
  html += heading("Recent Changes", "changes");
  html += "<tr section='changes'><td colspan='2' class='gray' style='padding-left:5px;'>"+changes+"</td></tr>";

  // Diplomatic Stances
  html += heading("Diplomatic Stances", "stances");
  html += "<tr section='stances'><th align='left' style='padding-left:5px;'>Home guild:&nbsp;</th>";
  html += "<td align='left' id='homeGuildLink'></td></tr>";
  html += "<tr section='stances'><th align='left' style='padding-left:5px;'>Friendly guilds:&nbsp;</th>";
  html += "<td align='left' id='friendlyGuildLinks'></td></tr>";
  html += "<tr section='stances'><th align='left' style='padding-left:5px;'>Hostile guilds:&nbsp;</th>";
  html += "<td align='left' id='hostileGuildLinks'></td></tr>";
  html += "<tr section='stances'><th align='left' style='padding-left:5px;'>Enemy guilds:&nbsp;</th>";
  html += "<td align='left' id='enemyGuildLinks'></td></tr>";
  html += "<tr section='stances'><td colspan='2' class='gray' style='padding-left:5px;'>";
  html += "Gates from your home guild appear in green on the map overlays. ";
  html += "Friendly/hostile/enemy gates appear in blue/purple/red. ";
  html += "To update your home guild, visit your internal ";
  html += "<a style='color:#dddddd;' href='guild.aspx'>guild page</a>. ";
  html += "To configure the diplomatic stance of other guilds, visit their ";
  html += "guild page and select the appropriate stance from the drop-down ";
  html += "list that appears there, or visit the ";
  html += "<a style='color:#dddddd;' href='ranks.aspx?view=guilds_fleet'> ";
  html += "guild ranks</a>.</td></tr>";
  html += "<tr section='stances'><th align='left' style='padding-left:5px;'>";
  html += "Highlight player links:&nbsp;</th>";
  html += "<td align='left'>";
  html += "<input type='checkbox' id='config_highlightAllies'/>";
  html += "<a href='javascript:;' id='changeAlliedColor'>Allies</a>";
  html += " &nbsp; <input type='checkbox' id='config_highlightFriends'/>";
  html += "<a href='javascript:;' id='changeFriendlyColor'>Friends</a>";
  html += " &nbsp; <input type='checkbox' id='config_highlightNeutrals'/>";
  html += "<a href='javascript:;' id='changeNeutralColor'>Neutrals</a>";
  html += " &nbsp; <input type='checkbox' id='config_highlightHostiles'/>";
  html += "<a href='javascript:;' id='changeHostileColor'>Hostiles</a>";
  html += " &nbsp; <input type='checkbox' id='config_highlightEnemies'/>";
  html += "<a href='javascript:;' id='changeEnemyColor'>Enemies</a>";
  html += "</td></tr>";
  html += "<tr section='stances'><td colspan='2' class='gray' style='padding-left:5px;'>Highlight links to players according to the diplomatic stances of their guilds.  Click on the checkbox labels to customize the highlight colors.</td></tr>";
  html += "<tr section='stances'>";
  html += "<td id='colorChartCell' colspan='2' align='center' ";
  html += "style='padding-top:5px;visibility:hidden;display:none'>";
  html += "<table class='no_back' style='border:0;background:transparent'>";
  html += "<tr><td style='padding-right:20'><div id='colorChart'></div></td>";
  html += "<td valign='center' align='center'><table class='no_back'><tr>";
  html += "<td id='colorPreview'>";
  html += "</td></tr></table></td></tr><tr><td colspan='2' align='center'>";
  html += "<a href='javascript:;' id='applyColor'>";
  html += "Apply selected color</a>";
  html += " &nbsp; &nbsp; &nbsp; &nbsp; ";
  html += "<a href='javascript:;' id='revertColor'>";
  html += "Cancel</a>";
  html += " &nbsp; &nbsp; &nbsp; &nbsp; ";
  html += "<a href='javascript:;' id='defaultColor'>";
  html += "Restore default color</a>";
  html += "</td></tr></table></td></tr>";

  // Database Settings
  if (server == "alpha") {
    html += heading("Database Settings", "db");
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Upload data to:&nbsp;</th>";
    html += "<td align='left'><input type='checkbox' id='config_uploadToGenome'/>Genome &nbsp;&nbsp; <input type='checkbox' id='config_uploadToRubyFARM'/>RubyFARM</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Check the databases for which you have accounts.</td></tr>";
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Search provider:&nbsp;</th>";
    html += "<td align='left'><input type='radio' id='config_searchUsingGenome' name='searchProvider' value='Genome'> Genome <input type='radio' id='config_searchUsingRubyFARM' name='searchProvider' value='RubyFARM'> RubyFARM <input type='radio' id='config_searchDisabled' name='searchProvider' value='None'> None&nbsp;(disabled)</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Preferred database used to retrieve jump gate locations etc.</td></tr>";
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Add map overlays:&nbsp;</th>";
    html += "<td align='left'><input type='checkbox' id='config_addMapOverlays'/>Yes</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Add map overlays with friendly/enemy gates and last scouted times.</td></tr>";
  } 

  // Time and Display Options
  html += heading("Time and Display Options", "time");
  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Animate game clock:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_animateTimer'/>Yes</td></tr>";
  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Animate the game clock that shows the current server time, so it counts up in real time.</td></tr>";
  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Add completion times:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addCompletionTimes'/>Yes</td></tr>";
  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Make all countdown timers clickable, to toggle the display between showing the time remaining and the actual time of completion/arrival.</td></tr>";
  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Countdown cut-off:&nbsp;</th>";
  html += "<td align='left'><input type='radio' id='config_countdownCutoff24' name='countdownCutoff' value='24'> 24 hours <input type='radio' id='config_countdownCutoff48' name='countdownCutoff' value='48'> 48 hours <input type='radio' id='config_countdownCutoff72' name='countdownCutoff' value='None'> 72 hours <input type='radio' id='config_countdownCutoffNone' name='countdownCutoff' value='None'> No cutoff</td></tr>";
  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Countdowns longer than the cut-off are by default displayed as completion/arrival times.</td></tr>";
  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Countdown timer format:&nbsp;</th>";
  html += "<td align='left'><input type='radio' id='config_countdownFormat1' name='countdownFormat' value='1'> 12:34:56 <input type='radio' id='config_countdownFormat2' name='countdownFormat' value='2'> 12h 34m 56s</td></tr>";
  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Select your preferred display format for countdown timers.</td></tr>";
  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Highlight table rows:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_highlightTableRows'/>Yes</td></tr>";
  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Modify the display of tables so that the row under the mouse cursor is highlighted.</td></tr>";

  // Empire Management Features
  html += heading("Empire Managament Features", "empire");
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Enable production wizard:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertProductionWizard'/>Yes  <input type='checkbox' id='config_showProductionWizardByDefault'/> Display the wizard by default&nbsp; &nbsp; &nbsp; &nbsp; </td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>The production wizard is a mouse-friendly interface for submitting production orders on a single base, and allows you to specify either an explicit quantity or a production deadline.</td></tr>";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Add short queue warnings:&nbsp;</th>";
  html += "<td align='left'><input type='radio' id='config_queueWarnings24' name='queueWarnings'/>24 hour warnings <input type='radio' id='config_queueWarnings12' name='queueWarnings'/>12 hour warnings <input type='radio' id='config_queueWarningsDisabled' name='queueWarnings'/>No warnings</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Highlight construction/production/research items close to completion on the empire page.</td></tr>";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Add mouse-over tooltips:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addProductionTooltips'/>To production pages";
  html += " &nbsp; &nbsp; <input type='checkbox' id='config_addCapacityTooltips'/>To base overview pages</input></td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Add mouse-over tooltips to production pages, with production rates for each unit, and to base overview pages, with minimum pillage, effective construction/production/research capacities, effective jump gate speeds, and FT swarm requirements.</td></tr>";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Show commander effects:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_showEffectiveCapacities'/>Yes</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Expand the empire capacities page to include the effects of construction/production commanders, showing both the base and effective capacities.</td></tr.";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Track units in production:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_trackProduction'/>Yes</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Track the number of units in production and display it as a new column on the Units page.</td></tr>";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Add hangar space column:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertHangarSpaceColumn'/>Yes</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Insert a new column on the Units page showing the total hangar space per unit.</td></tr>";

  // Navigation Features
  html += heading("Navigation Features", "navigation");
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Persist table sort options:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_persistSortOptions'/>Yes</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Persist sort options across page loads, remembering which column each table is sorted by.</td></tr>";
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Insert empire sub-menu:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertEmpireMenu'/>Yes &nbsp; &nbsp; &nbsp; ";
  html += "<input type='checkbox' id='config_classicEmpireMenu'>Use the classic single-line menu</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Insert the empire sub-menu on every page (single-line or double-line version).</td></tr>";
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Adapt to free accounts:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_freeAccountEmpireMenu'/>Yes</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Adapt the empire sub-menu to free accounts, removing unavailable features.</td></tr>";
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Shortcut fleet links:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_shortcutFleetLinks'/>Yes</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Make your fleet links go directly to the move fleet page.</td></tr>";
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Expand base locations:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_expandBaseLocations'/>Yes</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Expand the location field on base pages to include links to the galaxy/region/system where the base is located, as well as a link to bookmark the base location.</td></tr>";
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Hide help comments on:&nbsp;</th>";
  html += "<td align='left'>";
  html += "<input type='checkbox' id='config_hideStructureDescriptions'/>Structures</input> &nbsp; ";
  html += "<input type='checkbox' id='config_hideTurretDescriptions'/>Turrets</input> &nbsp; ";
  html += "<input type='checkbox' id='config_hideUnitDescriptions'/>Units</input> &nbsp; ";
  html += "<input type='checkbox' id='config_hideTechDescriptions'/>Technologies";
  html += "</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Hide the gray descriptions of structures/turrets/units/techs that appear below each item on base pages.  Results in a much more compact display when managing queues.</td></tr>";
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Hide occupied by column:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_hideOccupiedByColumn'/>Yes</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>Hides the Occupied By column on the empire page if none of your bases are occupied.</td></tr>";

  // Fleet Details and Movement Features
  html += heading("Fleet Details and Movement Features", "fleet");
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Insert fleet totals:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_sumFleets'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Insert fleet summaries with total fleet per guild in crowded locations.</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Show extra fleet details:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_fleetDetails'/>Yes &nbsp; &nbsp; &nbsp; &nbsp; <input type='checkbox' id='config_fleetDetailsOnByDefault'/> Default to the detailed view</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Insert a link on fleet overview pages to display a detailed view, with additional columns showing per-unit hangar space, fleet size and armor stats.</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Show recall timer:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addRecallTime'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Add an animated timer showing the recall time for fleets in transit.</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Cache recent locations:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_cacheLocations'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Cache the most recently viewed locations and add them as additional move options.</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Insert move options:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addOneScoutLink'/>Move one scout &nbsp; &nbsp; &nbsp; <input type='checkbox' id='config_addInvertLink'/>Invert selection</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Insert additional move options to just move a single scout ship (saves a click or two while scouting), and to invert the current selection (nice for making drops).</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Enable travel planner:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addTravelPlanner'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>The travel planner is opened from map or base pages and calculates travel/launch times.</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Enable battle calculator:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertBattleCalculator'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>The integrated battle calculator may be opened from fleet overview pages, attack confirmation pages, or from the top menu.</td></tr>";

  // Board and Messaging Features
  html += heading("Board and Messaging Features", "board");
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Insert quote links:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertQuoteLinks'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Insert links for quoting board posts, and quote the original message when replying to PMs.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Insert trade links:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertTradeLinks'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Replace open trades pasted on the boards with quick in-line menus for initiating trades.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Disable redirects:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_disableBoardRedirects'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Disable the redirection warning for off-site links in board posts.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Enhance PMs:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_enhancePrivateMessages'/>Yes &nbsp; &nbsp; &nbsp; &nbsp; ";
  html += "<input type='checkbox' id='config_parseMMLinks'>Parse MMLINKs</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>";
  html += "Allow sending of private messages to multiple recipients per ";
  html += "message.  Parse and display embedded mass message links in ";
  html += "notes/inbox/sentbox/savebox/board/internal guild pages. ";
  html += "Mass message links have the following syntax:";
  html += "<p>&nbsp; &nbsp; <b>MMLINK(p1,p2,...,pN)(link caption)</b>";
  html += " &nbsp; &nbsp; where p1,p2,...,pN are numeric player IDs</p>";
  html += "</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Address list options:&nbsp;</th>";
  html += "<td align='left'>";
  html += "<input type='checkbox' id='config_alwaysIncludeContacts'/>Always include contacts</input> &nbsp; &nbsp; ";
  html += "<input type='checkbox' id='config_alwaysIncludeGuildMates'/>Always include guild mates</input>";
  html += "</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>When sending PMs, players in your address list may be selected as additional recipients.  Add or remove individual players from your address list while viewing their profiles.</td></tr>";
  html += "</table>";

  var table = document.getElementById("account_main");
  if (!table) return;
  table.firstChild.innerHTML += "<tr><td align='center'><br/>"
    +html+"</tr><br/></td>";

  var chartCell = document.getElementById("colorChartCell");
  var preview = document.getElementById("colorPreview");
  var chart = document.getElementById("colorChart");
  var changingStanceColor = false;
  var currentColor = null;

  function changeColor(stance, minHue, maxHue)
  {
    if (changingStanceColor == stance) return;

    function colorChanged(color)
    {
      var style = "text-align:center; font-weight:bold; border-width:2; "
	+ "padding:5; border-color:"+color+"; color:"+color;
      preview.setAttribute("style", style);
      preview.innerHTML = "[Preview] "+changingStanceColor+" Player"
	+"<br/>"+color.toUpperCase();
      currentColor = color;
    }

    changingStanceColor = stance;
    currentColor = getPlayerColor(stance);
    colorChanged(currentColor);
    chart.innerHTML = "";
    var div = colorChart(minHue, maxHue, 60, 300, colorChanged);
    chart.appendChild(div);
    chartCell.style.visibility = "";
    chartCell.style.display = "";
  }

  function makeChangeColorListener(stance, minHue, maxHue)
  {
    return function(e) { changeColor(stance, minHue, maxHue); };
  }

  var stances = [["Allied",    80, 180],
		 ["Friendly", 180, 280],
		 ["Neutral",    0, 100],
		 ["Hostile",  250, 350],
		 ["Enemy",    310,  50]];
  for (var i = 0; i < stances.length; i++) {
    var s = stances[i][0];
    var link = document.getElementById("change"+s+"Color");
    link.style.color = getPlayerColor(s);
    var minHue = stances[i][1];
    var maxHue = stances[i][2];
    link.addEventListener("click", makeChangeColorListener(s, minHue, maxHue),
			  false);
  }

  function updateColors()
  {
    for (var i = 0; i < stances.length; i++) {
      var s = stances[i][0];
      var link = document.getElementById("change"+s+"Color");
      link.style.color = getPlayerColor(s);
    }
    document.getElementById("homeGuildLink").innerHTML = getHomeGuildLink();
    document.getElementById("friendlyGuildLinks").innerHTML = getFriendlyGuildLinks();
    document.getElementById("hostileGuildLinks").innerHTML = getHostileGuildLinks();
    document.getElementById("enemyGuildLinks").innerHTML = getEnemyGuildLinks();
  }

  updateColors();

  function applyColor(e)
  {
    if (changingStanceColor) {
      setPlayerColor(changingStanceColor, currentColor);
      changingStanceColor = false;
      chart.innerHTML = "";
      chartCell.style.visibility = "hidden";
      chartCell.style.display = "none";
      updateColors();
    }
  }

  function revertColor(e)
  {
    if (changingStanceColor) {
      changingStanceColor = false;
      chart.innerHTML = "";
      chartCell.style.visibility = "hidden";
      chartCell.style.display = "none";
      updateColors();
    }
  }

  function defaultColor(e)
  {
    if (changingStanceColor) {
      revertToDefaultPlayerColor(changingStanceColor);
      changingStanceColor = false;
      chart.innerHTML = "";
      chartCell.style.visibility = "hidden";
      chartCell.style.display = "none";
      updateColors();
    }
  }

  var link = document.getElementById("applyColor");
  link.addEventListener("click", applyColor, false);
  var link = document.getElementById("revertColor");
  link.addEventListener("click", revertColor, false);
  var link = document.getElementById("defaultColor");
  link.addEventListener("click", defaultColor, false);

  function addFlagListener(flag, parentFlag)
  {
    var listener = function (e) { setFlag(flag, e.target.checked); };
    var elem = document.getElementById("config_"+flag);
    elem.addEventListener("click", listener, false);
    if (getFlag(flag))
      elem.checked = true;
    if (parentFlag) {
      function parentListener(e) {
	if (!e.target.checked) {
	  elem.disabled = true;
	}
	else {
	  elem.disabled = false;
	}
      }
      var parent = document.getElementById("config_"+parentFlag);
      parent.addEventListener("click", parentListener, false);
      elem.disabled = !parent.checked;
    }
  }

  function addRadioListeners(flags)
  {
    function listener(e) {
      for (var i = 0; i < flags.length; i++) {
	setFlag(flags[i], false);
      }
      var flag = e.target.getAttribute("id").substring(7);
      setFlag(flag, e.target.checked);
    }
    for (var i = 0; i < flags.length; i++) {
      var elem = document.getElementById("config_"+flags[i]);
      elem.addEventListener("click", listener, false);
      if (getFlag(flags[i])) {
	for (var j = 0; j < flags.length; j++) {
	  if (j != i) {
	    setFlag(flags[j], false);
	  }
	}
	elem.checked = true;
      }
    }
  }

  function addSectionListener(section)
  {
    var t = document.getElementById("aeHelperConfig");
    var link = document.getElementById("showHide_"+section);
    var show = getFlag("showSection_"+section);
    if (!t || !link) return;

    function updateRows(show)
    {
      link.textContent = show? "Hide" : "Show";
      for (var i = 0; i < t.rows.length; i++) {
	if (t.rows[i].getAttribute("section") == section) {
	  t.rows[i].style.display = show? "" : "none";
	  t.rows[i].style.visibility = show? "" : "hidden";
	}
      }
    }

    function listener(e) {
      if (e.target == link) {
	var show = !getFlag("showSection_"+section);
	setFlag("showSection_"+section, show);
	updateRows(show);
      }
    }
    link.addEventListener("click", listener, false);
    updateRows(show);
  }

  addSectionListener("changes");
  addSectionListener("stances");
  addSectionListener("db");
  addSectionListener("time");
  addSectionListener("empire");
  addSectionListener("navigation");
  addSectionListener("fleet");
  addSectionListener("board");

  addFlagListener("highlightAllies");
  addFlagListener("highlightFriends");
  addFlagListener("highlightNeutrals");
  addFlagListener("highlightHostiles");
  addFlagListener("highlightEnemies");

  if (server == "alpha") {
    addFlagListener("uploadToGenome");
    addFlagListener("uploadToRubyFARM");
    addRadioListeners(["searchUsingGenome", "searchUsingRubyFARM", "searchDisabled"]); 
    addFlagListener("addMapOverlays");
  }

  addFlagListener("animateTimer");
  addFlagListener("addCompletionTimes");
  addRadioListeners(["countdownCutoff72", "countdownCutoffNone",
		     "countdownCutoff24", "countdownCutoff48"]);
  addRadioListeners(["countdownFormat1", "countdownFormat2"]);
  addFlagListener("highlightTableRows");

  addFlagListener("insertProductionWizard");
  addFlagListener("showProductionWizardByDefault", "insertProductionWizard");
  addRadioListeners(["queueWarnings24", "queueWarnings12", "queueWarningsDisabled"]);
  addFlagListener("addProductionTooltips");
  addFlagListener("addCapacityTooltips");
  addFlagListener("showEffectiveCapacities");
  addFlagListener("trackProduction");
  addFlagListener("insertHangarSpaceColumn");

  addFlagListener("persistSortOptions");
  addFlagListener("insertEmpireMenu");
  addFlagListener("classicEmpireMenu");
  addFlagListener("freeAccountEmpireMenu");
  addFlagListener("shortcutFleetLinks");
  addFlagListener("expandBaseLocations");
  addFlagListener("hideStructureDescriptions");
  addFlagListener("hideTurretDescriptions");
  addFlagListener("hideUnitDescriptions");
  addFlagListener("hideTechDescriptions");
  addFlagListener("hideOccupiedByColumn");

  addFlagListener("sumFleets");
  addFlagListener("fleetDetails");
  addFlagListener("fleetDetailsOnByDefault", "fleetDetails");
  addFlagListener("addRecallTime");
  addFlagListener("cacheLocations");
  addFlagListener("addOneScoutLink");
  addFlagListener("addInvertLink");
  addFlagListener("addTravelPlanner");
  addFlagListener("insertBattleCalculator");

  addFlagListener("insertQuoteLinks");
  addFlagListener("insertTradeLinks");
  addFlagListener("disableBoardRedirects");
  addFlagListener("enhancePrivateMessages");
  addFlagListener("parseMMLinks", "enhancePrivateMessages");
  addFlagListener("alwaysIncludeContacts");
  addFlagListener("alwaysIncludeGuildMates");

  // Load version.txt to see if the script is out of date
  var url = "http://www.valvag.no/aehz/version.txt";
  function versionLoaded(details)
  {
    var n = details.responseText.match(/\d+/);
    if (n && n > revision) {
      var txt = "Update to revision " + n + " available!";
      document.getElementById("updateLink").textContent = txt;
    }
  }
  var req = { method: "GET", url: url, onload: versionLoaded };
  GM_xmlhttpRequest(req);
}

function genomeUpload(url, html)
{
  if (!getFlag("uploadToGenome"))
    return;
  var postURL = "http://genome.aeonanon.com/data/input/";
  if (opera) {
    var frame = document.createElement("div");
    frame.innerHTML = "<iframe style='position:fixed;top:0;right:0;width:110px;height:29px;background:#333;font-size:10;' name='genomeFrame' id='genomeFrame'></iframe>";
    frame.innerHTML += "<form id='genomeSubmit' style='visibility:hidden;position:fixed;top:75%;left:25%;' method='POST' action='"+postURL+"' target='genomeFrame'>";
    frame.innerHTML += "<input type='hidden' name='brief' value='true' />";
    frame.innerHTML += "<input type='hidden' name='url' value='"+url+"' />";
    frame.innerHTML += "<textarea style='visibility:hidden;position:fixed;top:75%;left:25%;' name='text'>"+html+"</textarea></form>";
    document.body.appendChild(frame);
    document.getElementById("genomeSubmit").submit();
  }
  else {
    var div = document.createElement("div");
    div.innerHTML = "<div style='display:block;background:#333;position:fixed;top:0;right:0;padding:3px;text-align:center;border:1px solid #000;border-width: 0 0 2px 2px;' id='genomeLink'>Uploading...</div>";
    document.body.appendChild(div);
    var headers = { "Content-Type": "application/x-www-form-urlencoded" };
    var data = "brief=true&url=" + encodeURIComponent(url) +
      "&text=" +  encodeURIComponent(html);
    var loaded = function(details) {
      document.getElementById("genomeLink").innerHTML=details.responseText;
    };
    var req = { method: "POST", url: postURL, headers: headers,
		data: data, onload: loaded };
    GM_xmlhttpRequest(req);
  }
}

function farmUpload(url, html)
{
  if (!getFlag("uploadToRubyFARM"))
    return;
  var postURL = "http://rubyfarm.dontexist.net/submit";
  if (opera) {
    var data = encodeURIComponent(html);
    var datalen = data.length;
    var frame = document.createElement("div");
    frame.innerHTML = "<iframe style='frameborder:0;position:fixed;top:31;right:0;width:110px;height:29px;background:#333;font-size:10' name='farmframe' id='farmframe'></iframe>";
    frame.innerHTML += "<form id='farmsubmit' style='visibility:hidden;position:fixed;top:75%;left:25%;' method='POST' action='"+postURL+"' target='farmframe'>";
    frame.innerHTML += "<input type='hidden' name='length' value='"+datalen+"' />";
    frame.innerHTML += "<input type='hidden' name='url' value='"+url+"' />";
    frame.innerHTML += "<textarea style='visibility:hidden;position:fixed;top:75%;left:25%;' name='text'>"+data+"</textarea></form>";
    document.body.appendChild(frame);
    document.getElementById("farmsubmit").submit();
  }
  else {
    var div = document.createElement("div");
    div.innerHTML = "<div style='display:block;background:#333;position:fixed;top:25;right:0;padding:3px;text-align:center;border:1px solid #000;border-width: 0 0 2px 2px;' id='FARMLink'>Uploading...</div>";
    document.body.appendChild(div);
    var data = encodeURIComponent(html);
    var datalen = data.length;
    data = "length=" + datalen + "&url=" + encodeURIComponent(url)
      + " &text=" + data;
    var headers = { "Content-Type": "application/x-www-form-urlencoded" };
    var loaded = function(details) {
      document.getElementById("FARMLink").innerHTML=details.responseText;
    };
    var req = { method: "POST", url: postURL, headers: headers,
		data: data, onload: loaded };
    GM_xmlhttpRequest(req);
  }
}

function uploadBody(url)
{
  if (server == "alpha") {
    if (url.match(/base\.aspx\?base=\d{1,10}$/) ||
	url.match(/loc=A\d{2}:\d{2}:\d{2}/) ||
	url.match(/guild\.aspx\?guild=/) ||
	url.match(/(profile|scanners)/) ||
	url.match(/ranks\.aspx\?view=guilds/) ||
	url.match(/combat\.aspx\?fleet=/) ||
	url.match(/fleet\.aspx\?fleet=\d+$/)) {
      var html = document.body.innerHTML.replace(/\<br\>/g,"<br />");
      if (url.match(/loc=A\d\d:\d\d:\d\d:\d\d/) &&
	  html.match(/\/images\/astros\/(unknown|asteroid)\.jpg/i) &&
	  !html.match(/map_fleets/)) {
	// Don't upload asteroids without fleets or unknown astros
      }
      else {
	genomeUpload(url, html);
	farmUpload(url, html);
      }
    }
  }
}

function getTableWidth()
{
  var tables = document.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    var t = tables[i];
    if (t.getAttribute("class") == "top") {
      var w = t.getAttribute("width");
      if (!w) return "800";
      return w;
    }
  }
  return "800";
}

var twidth = getTableWidth();

function newTable(content)
{
  return "<table align='center' width='"+twidth+"'><tr><th align='center'>" +
    content + "</th></tr></table><br/>";
}

function logStackTrace() {
  var callstack = [];
  var isCallstackPopulated = false;
  try {
    i.dont.exist+=0; // doesn't exist- that's the point
  }
  catch(e) {
    if (e.stack) { // Firefox
      var lines = e.stack.split('\n');
      for (var i=0, len=lines.length; i<len; i++) {
        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
          callstack.push(lines[i]);
	}
      }
      // remove call to printStackTrace()
      callstack.shift();
    }
    GM_log("Call stack: " + callstack.join(" // "));
  }
}

function parseNum(s)
{
  if (s == undefined) {
    GM_log("Cannot parse number: " + s);
    logStackTrace();
    return undefined;
  }
  s = s.replace(/^\s+/, "");
  s = s.replace(/\s+$/, "");
  if (s == "")
    return 0;
  var sign = 1;
  if (s.charAt(0) == "-") {
    sign = -1;
    s = s.substring(1);
  }
  if (s.match(/^\d{1,3}(\.\d\d\d)+(,\d+)?$/)) {
    // 1.234.567,89
    s = s.replace(/\./g, '');
    s = s.replace(/,/g, '.');
  }
  else if (s.match(/^\d{1,3}(,\d\d\d)+(\.\d+)?$/)) {
    // 1,234,567.89
    s = s.replace(/,/g, '');
  }
  else if (s.match(/^\d+(,\d+)?$/)) {
    // 123,456789
    s = s.replace(/,/g, '.');
  }
  else if (s.match(/^\d+(\.\d+)?$/)) {
    // 123.456789
    s = s;
  }
  else {
    GM_log("Cannot parse number: " + s);
    logStackTrace();
    return NaN;
  }
  return sign * Number(s);
}

function startsWith(s, t)
{
  if (t.length > s.length)
    return false;
  return s.substring(0, t.length) == t;
}

function endsWith(s, t)
{
  if (t.length > s.length)
    return false;
  return s.substring(s.length-t.length, s.length) == t;
}

function newElement(tag, attributes)
{
  var elem = document.createElement(tag);
  for (a in attributes) {
    elem.setAttribute(a, attributes[a]);
  }
  return elem;
}

function recordTechs()
{
  var techTable = document.getElementById("empire_technologies");
  if (!techTable) return;
  var t = techTable.rows[1].cells[0].firstChild;
  var rows = t.rows;
  var techAbbr = ["E","C","A","L","M","SD","PL","WD","SH",
		  "I","PH","AI","D","CN","TC"];
  var techString = "";
  for (var i = 1; i < rows.length; i += 2) {
    techString += techAbbr[((i-1)/2)] + rows[i].cells[4].textContent + " ";
  }
  if (getFlag("showAbbreviatedTechList")) {
    var html = "<tr><td colspan='6' align='center' style='padding-top:12px'>";
    html += "<small>Abbreviated tech list: " + techString + "</small></td></tr>";
    t.innerHTML += "<tfoot>" + html + "</tfoot>";
  }
  setSetting("techs", techString);
}

function showEffectiveCapacities()
{
  var t = document.getElementById("empire_capacities");
  if (!t) return;
  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows) return;

  var totalCons = 0;
  var totalProd = 0;
  for (var i = 1; i < rows.length-1; i++) {
    var r = rows[i];
    var level = 0;
    if (r.cells[7].innerHTML.match(/Construction (\d+)/)) {
      level = Number(RegExp.$1);
    }
    var cell = rows[i].cells[4];
    var html = cell.innerHTML;
    var x = Number(html.match(/\d+/));
    var newX = x / (1 - level * 0.01);
    totalCons += newX;
    if (level > 0) {
      cell.innerHTML = html.replace(/\d+/, x+" <span class='help'>("
				    +Math.round(newX)+")</span>");
    }
    var tip = "Effective construction: "
      + Math.round(newX*10)/10 + " credits/hour - "
      + commaFormat(Math.round(newX*24)) + " credits/day - " 
      + commaFormat(Math.round(newX*24*7)) + " credits/week";
    rows[i].cells[4].title = tip;
    
    var level = 0;
    if (r.cells[7].innerHTML.match(/Production (\d+)/)) {
      var level = Number(RegExp.$1);
    }
    var cell = rows[i].cells[5];
    var html = cell.innerHTML;
    var x = Number(html.match(/\d+/));
    var newX = x / (1 - level * 0.01);
    totalProd += newX;
    if (level > 0) {
      cell.innerHTML = html.replace(/\d+/, x+" <span class='help'>("
				    +Math.round(newX)+")</span>"); 
    }
    var tip = "Effective production: "
      + Math.round(newX*10)/10 + " credits/hour - "
      + commaFormat(Math.round(newX*24)) + " credits/day - " 
      + commaFormat(Math.round(newX*24*7)) + " credits/week";
    rows[i].cells[5].title = tip;
  }
  var last = rows[rows.length-1];
  last.cells[4].innerHTML += " <span class='help'>("
    +commaFormat(Math.round(totalCons))+")</span>";
  var tip = "Total effective construction: "
    + commaFormat(Math.round(totalCons)) + " /hour - "
    + commaFormat(Math.round(totalCons*24)) + " /day - " 
    + commaFormat(Math.round(totalCons*24*7)) + " /week";
  last.cells[4].title = tip;
  last.cells[5].innerHTML += " <span class='help'>("
    +commaFormat(Math.round(totalProd))+")</span>";
  var tip = "Total effective production: "
    + commaFormat(Math.round(totalProd)) + " /hour - "
    + commaFormat(Math.round(totalProd*24)) + " /day - " 
    + commaFormat(Math.round(totalProd*24*7)) + " /week";
  last.cells[5].title = tip;
}

function lowest(x)
{
  var v = x[0];
  for (var i = 1; i < x.length; i++) {
    if (x[i] < v) {
      v = x[i];
    }
  }
  return v;
}

function insertDatabaseLink(url)
{
  if (getFlag("searchUsingGenome")) {
    var link = "http://genome.aeonanon.com/data/view/";
    var genome = true;
    var caption = "in Genome";
  }
  else if (getFlag("searchUsingRubyFARM")) {
    var link = "http://rubyfarm.dontexist.net/";
    var genome = false;
    var caption = "in RubyFARM";
  }
  else {
    return;
  }
  var offset = 2;
  if (url.match(/base\.aspx\?base=(\d{1,20})$/)) {
    if (genome) {
      link += "base/" + RegExp.$1 + "/";
    }
    else {
      link += "base/view/" + RegExp.$1;
    }
    caption = "View base " + caption;
  }
  else if (url.match(/profile\.aspx\?player=(\d{1,20})/)) {
    if (genome) {
      link += "player/" + RegExp.$1 + "/";
    }
    else {
      link += "player/view/" + RegExp.$1;
    }
    caption = "View player " + caption;
  }
  else if (url.match(/guild\.aspx\?guild=(\d{1,20})$/)) {
    if (genome) {
      link += "guild/" + RegExp.$1 + "/";
    }
    else {
      link = "";
    }
    caption = "View guild " + caption;
  }

  if (link) {
    var content = "<a target='_blank' href='" + link + "'>" + caption + "</a>";
    displayData(offset, newTable(content));
  }
}

function getJumpGateLevel()
{
  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[1].cells;
    if (cells) {
      var structs = cells[2].innerHTML.split(/<br>/g);
      var levels = cells[3].innerHTML.split(/<br>/g);
      for (var i = 0; i < structs.length; i++) {
	if (structs[i] == "Jump Gate") {
	  return Number(levels[i]);
	}
      }
    }
  }
  return 0;
}

function getBaseCommander()
{
  var t = xpath1("//table[@class='base']");
  if (t && t.rows.length > 1) {
    var txt = t.rows[1].cells[0].textContent;
    if (txt.match(/Base Commander:.*?\((.*?) (\d{1,2})\)/)) {
      return [RegExp.$1, Number(RegExp.$2)];
    }
  }
  return ["", 0];
}

function trim(s)
{
  return s.replace(/\s+$/, '').replace(/^\s+/, '');
}

function addTravelPlanner(loc)
{
  if (!loc) return;
  var linkHTML =
    "<table class='no_back' style='border:0; background:#333333;'>"
    + "<tr><td style='padding: 2 4 2 4'><small>"
    + "<a href='javascript:;' id='travelPlannerLink'>"
    + "Open travel planner</a></small></td></tr></table>";
  var t = document.getElementById("base_processing-capacities");
  if (t) {
    var html = "<center>"+linkHTML+"</center>";
    t.parentNode.innerHTML += html;
    var insertAfter = xpath1("//table[@class='base']");
  }
  else if (!document.getElementById("map_base")) {
    var t = xpath1("//table[@class='astro']");
    if (!t) return;
    t.rows[0].cells[1].innerHTML += "<br/>"+linkHTML+"";
    var insertAfter = t;
  }
  else {
    return;
  }
  var techs = " "+getMyTech()+" ";
  var warp = Number(techs.match(/ WD(\d+) /)[1]);
  var stellar = Number(techs.match(/ SD(\d+) /)[1]);
  var jg = getJumpGateLevel();
  var log = 0;
  var commander = getBaseCommander();
  if (commander[0] == "Logistics")
    log = commander[1];
  
  var html = "<br/><table class='no_back' align='center' cellpadding='6' "
    + "width='"+twidth+"'>"
    + "<tr><td align='center' colspan='2' style='border-bottom:0'>"
    + "<b>Travel Planner</b> ";
  html += "<small>(<a href='javascript:;' id='travelPlannerCloseLink'>";
  html += "Close</a>)</small></td></tr>";
  html += "<tr><td align='right' style='padding-right:20; border-bottom:0'>";
  html += "<table class='no_back' cellpadding='2' style='border:0;'>";
  html += "<tr><td style='border-bottom:0' width='100'/>";
  html += "<td style='border-bottom:0' width='140'/>";
  html += "<td style='border-bottom:0' width='100'/></tr>";
  html += "<tr><td colspan='2'><b>Origin:</b></td><td align='right'>";
  html += "<input id='travelFrom' onChange='updatePlanner()' onKeyUp='updatePlanner()' size='13' maxlength='12' value='"+loc+"' class='quant input-numeric' type='text'></td></tr>";
  html += "<tr><td><b>Destination:</b></td><td align='right'>";
  html += "<select id='travelBookmarks' onChange='updatePlanner()'>";
  html += "<option value=''>Bookmarks...</option>";
  var bookmarks = getBookmarks();
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i]) {
      html += "<option value='"+bookmarks[i]+"'>"+bookmarks[i]+"</option>";
    }
  }
  html += "</select></td><td align='right'>";
  html += "<input id='travelTo' onChange='updatePlanner()' onKeyUp='updatePlanner()' size='13' maxlength='12' value='' class='quant input-numeric' type='text'></td></tr>";
  html += "<tr><td colspan='3' align='right'><small><b>Distance: <span id='travelDistance'></span></b></small></td></tr>";
  html += "<tr><td colspan='2'><b>Jump Gate:</b></td>";
  html += "<td align='right'><select id='travelJG' onChange='updatePlanner()'>";
  html += "<option value='0'>None</option>";
  for (var i = 1; i <= 19; i++) {
    html += "<option value='" + i + "'" +
      (i == jg? " selected='selected'" : "") + ">Level " + i + "</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><td colspan='2'><b>Logistics Commander:</b></td>";
  html += "<td align='right'><select id='travelLog' onChange='updatePlanner()'>";
  html += "<option value='0'>None</option>";
  for (var i = 1; i <= 19; i++) {
    html += "<option value='" + i + "'" +
      (i == log? " selected='selected'" : "") + ">Level " + i + "</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><td colspan='2'><b>Stellar Drive Tech:</b></td>";
  html += "<td align='right'><select id='travelStellar' onChange='updatePlanner()'>";
  for (var i = 0; i <= 35; i++) {
    html += "<option value='" + i + "'" +
      (i == stellar? " selected='selected'" : "") + ">Level " + i + "</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><td colspan='2'><b>Warp Drive Tech:</b></td>";
  html += "<td align='right'><select id='travelWarp' onChange='updatePlanner()'>";
  for (var i = 0; i <= 30; i++) {
    html += "<option value='" + i + "'" +
      (i == warp? " selected='selected'" : "") + ">Level " + i + "</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><td><b>Arrival Time:</b></td>";
  html += "<td colspan='2' align='right'><select id='travelDay' onChange='updatePlanner()'>";
  html += "<option value='0'>Set arrival time...</option>";
  var time = new Date(pageLoadTime.getTime());
  time.setUTCHours(0);
  time.setUTCMinutes(0);
  time.setUTCSeconds(0);
  time.setUTCMilliseconds(0);
  for (var i = 0; i < 100; i++) {
    html += "<option value='"+time.getTime()+"'>"+formatDate(time)+"</option>";
    time.setUTCDate(time.getUTCDate()+1);
  }
  html += "</select><b>@</b>";
  html += "<select id='travelHour' onChange='updatePlanner()'>";
  for (var i = 0; i < 24; i++) {
    html += "<option value='"+i+"'>"+zeroPad(i,2)+"</option>";
  }
  html += "</select><b>:</b>";
  html += "<select id='travelMinute' onChange='updatePlanner()'>";
  for (var i = 0; i < 60; i++) {
    html += "<option value='"+i+"'>"+zeroPad(i,2)+"</option>";
  }
  html += "</select></td></tr>"
    + "</table></td><td align='left' style='border-bottom:0'>"
    + "<table class='no_back' style='border:0'>"
    + "<tr><td style='border-bottom:0'>"
    + "<table class='layout listing' id='travelTimes' cellpadding='2'></table>"
    + "</td></tr></table></td></tr>"
    + "<tr><td align='center' colspan='2' style='border-bottom:0'>"
    + "<table class='no_back' style='border:0'>"
    + "<tr><td style='border-bottom:0'>"
    + "<table class='layout listing' id='travelLaunchTimes' cellpadding='2'>"
    + "</table></td></tr></table></td></tr></table>";
  var div = document.createElement("div");
  div.style.display = "none";
  div.innerHTML = html;

  function updatePlanner()
  {
    var travelTimes = document.getElementById("travelTimes");
    var travelLaunchTimes = document.getElementById("travelLaunchTimes");
    var travelDistance = document.getElementById("travelDistance");
    var travelJG = document.getElementById("travelJG");
    var travelLog = document.getElementById("travelLog");
    var travelWarp = document.getElementById("travelWarp");
    var travelStellar = document.getElementById("travelStellar");
    var travelFrom = document.getElementById("travelFrom");
    var travelTo = document.getElementById("travelTo");
    var travelBookmarks = document.getElementById("travelBookmarks");
    var travelDay = document.getElementById("travelDay");
    var travelHour = document.getElementById("travelHour");
    var travelMinute = document.getElementById("travelMinute");

    var warp = Number(travelWarp.value);
    var stellar = Number(travelStellar.value);
    var from = travelFrom.value;
    travelFrom.value = from = trim(from);
    if (travelBookmarks.value) {
      var to = travelBookmarks.value;
      travelBookmarks.value = '';
    }
    else {
      var to = travelTo.value;
    }
    travelTo.value = to = trim(to);
    if (to.match(/^[A-Z]\d\d/i)) {
      if (to.substring(1,3) != from.substring(1,3)) {
	to = to.substring(0,3) + ":00:00:00";
      }
    }
    var d = distance(from, to);
    travelDistance.innerHTML = d;

    var html = "<tr class='listing-header'><td></td>";
    html += "<td align='right'><b>Speed</b></td>";
    html += "<td align='right' style='padding-left:20'><b>Travel Time</b></td></tr>";
    var units = ["Scout Ship", "Corvette", "Frigate", "Cruiser",
		 "Heavy Cruiser", "Dreadnought", "Leviathan", "Death Star"];
    var jg = Number(travelJG.value);
    var log = Number(travelLog.value);
    var techs = "WD"+travelWarp.value+" SD"+travelStellar.value;
    for (var i = 0; i < units.length; i++) {
      html += "<tr><td>" + plural(2, units[i]) + "</td>";
      var stats = unitStats[units[i]];
      var speed = stats.adjustedSpeed(techs, jg, log);
      html += "<td align='right' style='padding-left:20'>"
	+ decimalFormat(speed, 2) + "</td>";
      var time = d / speed * 3600;
      html += "<td align='right' style='padding-left:20'>"
	+ formatCountdown1(time) + "</td></tr>";
    }
    travelTimes.innerHTML = html;

    var arrival = Number(travelDay.value);
    if (!arrival) {
      travelLaunchTimes.innerHTML = "";
    }
    else {
      arrival += Number(travelHour.value)*60*60*1000;
      arrival += Number(travelMinute.value)*60*1000;

      var highlightStyle = "color:#FFFF99;";

      function formatLaunchTime(future)
      {
	return dayName[future.getUTCDay()]+"&nbsp;"
	  +zeroPad(future.getUTCDate(),2)+"&nbsp;"
	  +monthName[future.getUTCMonth()]+" "
	  +"@"+zeroPad(future.getUTCHours(),2)+":"
	  +zeroPad(future.getUTCMinutes(),2)+":"
	  +zeroPad(future.getUTCSeconds(),2);
      }
      
      var bbcode = "[b][u][color='red']MOVE ORDERS[/color][/u]\n\n"
	+ "[color='yellow']Origin: " + travelFrom.value
	+ "\nDestination: " + travelTo.value
	+ "\nArrival time:[/color] [color='white']"
	+ formatLaunchTime(new Date(arrival))
	+ "[/color][/b]\n";
     
      function launchRow(unit, minTech, maxTech, myTech, addBBcode)
      {
	var stats = unitStats[unit];
	var html = "<tr><th align='right' height='25' "
	  + "style='padding-right:10'>"
	  + plural(2, unit).replace(/ /g, '&nbsp;') + ":</th>";
	if (addBBcode)
	  bbcode += "\n[color='white'][b]" + unit 
	    + " Launch Times:[/b][/color]\n";
	for (var tech = minTech; tech <= maxTech; tech++) {
	  var speed = stats.adjustedSpeed("WD"+tech+" SD"+tech, jg, log);
	  var time = d / speed * 3600;
	  var t = new Date(arrival - time * 1000);
	  html += "<td align='right' style='";
	  if (tech == myTech) {
	    html += highlightStyle;
	  }
	  // Add some hidden divs for copy/paste purposes
	  html += "'><div style='display:none'>";
	  html += plural(2, unit)+" "+stats.drive+" "+tech+":</div><small>";
	  if (t < pageLoadTime) 
	    html += "Launch&nbsp;Now";
	  else
	    html += formatLaunchTime(t);
	  html += "</small><div style='display:none'></div></td>";
	  if (addBBcode)
	    bbcode += "[color='"+(tech%2 == 0 ? "#AAAAAA" : "#EEEEEE")
	      + "']" + stats.drive + " " + tech + ": Launch "
	      + (t < pageLoadTime? "now" : " on " + formatLaunchTime(t))
	      + "[/color]\n";
	}
	html += "</tr>";
	return html;
      }
      
      var html = "<tr align='center' class='listing-header'>";
      html += "<td colspan='11' align='center' style='padding-top:20; padding-bottom:10'>";
      html += "<b><u>Launch Times To Arrive ";
      html += formatLaunchTime(new Date(arrival));
      html += "</u></b></td></tr><tr class='listing-header'><td></td>";
      for (var i = 20; i <= 29; i++) {
	html += "<th align='right' style='";
	if (i == stellar) {
	  html += highlightStyle;
	}
	html += "'>Stellar "+i+"</th>";
      }
      html += "</tr>";
      html += launchRow("Corvette", 20, 29, stellar, false);
      html += launchRow("Frigate", 20, 29, stellar, true);
      html += "<tr class='listing-header'><td>&nbsp;</td></tr>";
      html += "<tr class='listing-header'><td></td>";
      for (var i = 18; i <= 27; i++) {
	html += "<th align='right' style='"
	if (i == warp) {
	  html += highlightStyle;
	}
	html += "'>Warp "+i+"</th>";
      }
      html += "</tr>";
      html += launchRow("Cruiser", 18, 27, warp, true);
      html += launchRow("Heavy Cruiser", 18, 27, warp, true);
      html += launchRow("Dreadnought", 18, 27, warp, true);
      html += launchRow("Leviathan", 18, 27, warp, true);
      html += launchRow("Death Star", 18, 27, warp, false);
      html += "<tr class='nohighlight'>"
	+ "<td colspan='11' align='center' style='padding-top:10'>"
	+ "<small>BBCode version: (right-click to copy)</small><br/>"
	+ "<textarea cols='120' rows='1' readonly style='background:#000000' "
	+ "onMouseOver='this.select()'>"
	+ bbcode + "</textarea></td></tr>";
      travelLaunchTimes.innerHTML = html;
    }
    if (getFlag("highlightTableRows")) {
      highlightTableRows();
    }
  };

  unsafeWindow.updatePlanner = function(e) {
    window.setTimeout(updatePlanner, 0);
  };
  insertAfter.parentNode.insertBefore(div, insertAfter.nextSibling);
  updatePlanner();
  var link = document.getElementById("travelPlannerLink");
  link.addEventListener("click",
			function (e) { div.style.display = ""; }, false);
  var link = document.getElementById("travelPlannerCloseLink");
  link.addEventListener("click",
			function (e) { div.style.display = "none"; }, false);
}

function addFTSwarmTooltip()
{
  // Ignores barracks, laser, missile, plasmo and ion turrets for now
  
  var turretArmor = {};
  turretArmor['Photon Turrets'] = 64;
  turretArmor['Disruptor Turrets'] = 256;
  turretArmor['Deflection Shields'] = 512;
  turretArmor['Planetary Shield'] = 2048;
  turretArmor['Planetary Ring'] = 1024;

  // Defense commander assigned?
  var commander = getBaseCommander();
  var defCommander = 0;
  if (commander[0] == "Defense") {
    defCommander = commander[1];
  }

  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[1].cells;
    if (cells) {
      var defs = cells[4].innerHTML.split(/<br>/g);
      var levels = cells[5].innerHTML.split(/<br>/g);
      var totalArmor = 0;
      for (var i = 0; i < defs.length; i++) {
	if (defs[i]) {
	  var a = turretArmor[defs[i]];
	  if (a == undefined) {
	    GM_log("Ignoring "+defs[i]+" in FT swarm calculation");
	  }
	  else {
	    var n = parseNum(levels[i].split("/")[0]);
	    totalArmor += a*n;
	  }
	}
      }
      var techs = " "+getMyTech()+" ";
      var armorTech = Number(techs.match(/ A(\d+) /)[1]);
      var laserTech = Number(techs.match(/ L(\d+) /)[1]);
      totalArmor *= (1 + 0.05*armorTech) * (1 + 0.01*defCommander);
      // TODO: Verify if defense commander bonus is applied correctly above
      var totalPower = 2 * (1 + 0.05*laserTech);
      var fts = Math.ceil(totalArmor * 100 / totalPower);
      var tip = commaFormat(fts) + " FTs needed to level defenses "
	+ "(with laser " + laserTech + " vs. armor " + armorTech + ")";
      cells[4].title = tip;
      cells[5].title = tip;
    }
  }
}

function addPillageTooltip()
{
  var t = document.getElementById('base_processing-capacities');
  if (t) {
    var rows = t.rows[1].cells[0].firstChild.rows;
    if (!rows) return;
    var maxEcon = Number(rows[4].cells[1].textContent);
    var curEcon = Number(rows[5].cells[1].textContent);
    var minPillage = Math.floor(6 * Math.pow(curEcon - (maxEcon * .7),2));
    var tip = "Minimum pillage: "+commaFormat(minPillage)+" credits";
    rows[4].title = tip;
    rows[5].title = tip;
  }
  else {
    var t = document.getElementById("map_base");
    if (!t) return;
    var rows = t.rows[0].cells[0].firstChild.rows;
    if (!rows) return;
    if (rows[0].cells[0].textContent == "Base") {
      var s = rows[1].cells[3].textContent;
      if (s.match(/(\d+)\s*\/\s*(\d+)/)) {
	var maxEcon = Number(RegExp.$1);
	var curEcon = Number(RegExp.$2);
	var minPillage = Math.floor(6 * Math.pow(curEcon - (maxEcon * .7),2));
	var tip = "Minimum pillage: "+commaFormat(minPillage)+" credits";
	rows[1].cells[3].title = tip;
      }
    }
  }
}

function addCapacityTooltips()
{
  var t = document.getElementById('base_processing-capacities');
  if (t) {
    var rows = t.rows[1].cells[0].firstChild.rows;
    if (!rows) return;
    var t2 = xpath1("//table[@class='base']");
    if (!t2) return;
    var commander = getBaseCommander();

    // Construction commander?
    if (commander[0] == "Construction") {
      var lvl = commander[1];
    }
    else {
      var lvl = 0;
    }
    var n = parseNum(rows[0].cells[1].textContent) / (1 - lvl*0.01);
    var tip = "Effective construction: "
      + Math.round(n*10)/10 + " credits/hour - "
      + commaFormat(Math.round(n*24)) + " credits/day - " 
      + commaFormat(Math.round(n*24*7)) + " credits/week";
    rows[0].title = tip;
    if (lvl > 0) {
      t2.rows[1].cells[0].title = tip;
    }

    // Production commander?
    if (commander[0] == "Production") {
      var lvl = commander[1];
    }
    else {
      var lvl = 0;
    }
    var n = parseNum(rows[1].cells[1].textContent) / (1 - lvl*0.01);
    var tip = "Effective production: "
      + Math.round(n*10)/10 + " credits/hour - "
      + commaFormat(Math.round(n*24)) + " credits/day - " 
      + commaFormat(Math.round(n*24*7)) + " credits/week";
    rows[1].title = tip;
    if (lvl > 0) {
      t2.rows[1].cells[0].title = tip;
    }
    
    // Research commander?
    if (commander[0] == "Research") {
      var lvl = commander[1];
    }
    else {
      var lvl = 0;
    }
    var n = parseNum(rows[2].cells[1].textContent) / (1 - lvl*0.01);
    var tip = "Effective research: "
      + Math.round(n*10)/10 + " credits/hour - "
      + commaFormat(Math.round(n*24)) + " credits/day - " 
      + commaFormat(Math.round(n*24*7)) + " credits/week";
    rows[2].title = tip;
    if (lvl > 0) {
      t2.rows[1].cells[0].title = tip;
    }
    
    // Logistics commander?
    if (commander[0] == "Logistics") {
      var lvl = commander[1];
    }
    else {
      var lvl = 0;
    }
    var t3 = document.getElementById("base_resume-structures");
    if (t3) {
      var cells = t3.rows[0].cells[0].firstChild.rows[1].cells;
      if (cells) {
	var jg = getJumpGateLevel();
	var s = Math.round((jg+1) / (1 - lvl*0.01) * 100) / 100;
	var tip = "Effective jump gate speed: " + s;
	cells[2].title = tip;
	cells[3].title = tip;
	if (lvl > 0) {
	  t2.rows[1].cells[0].title = tip;
	}
      }
    }
  }
}

function showTheDebris()
{
  var html = document.body.innerHTML;
  html = html.replace(/<span class=.gray comment. title=./gi,
		      "<span class='gray comment'>");
  html = html.replace(/Debris.>\*<\/span>/gi,"Debris</span>");
  document.body.innerHTML = html;
}

function displayData(num, content)
{
  var dataDisplay = document.createElement("div");
  dataDisplay.innerHTML = content;
  var children = document.body.childNodes;
  var n = 6-num;
  if (n >= children.length)
    document.body.appendChild(dataDisplay);
  else
    document.body.insertBefore(dataDisplay, children[n]);
}

function toSeconds(time)
{
  time.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/i);
  var hours = RegExp.$1;
  var minutes = RegExp.$2;
  var seconds = RegExp.$3;
  return((hours*3600) + (minutes*60) + (seconds*1));
}

function enhanceScanners()
{
  var scannerframe = document.createElement("table");
  scannerframe.width = twidth;
  scannerframe.align = "center";
  scannerframe.innerHTML += "<tr><th colspan='4' align='center'>Enhance Scanners</th></tr>" + 
    "<tr><td>Galaxies: <input type='text' id='galaxies' /></td><td>Guilds (ID #): <input type='text' id='guilds' /></td><td>" + 
    "<input type='checkbox' id='enemies'>Enemies</td><td><input type='submit' id='scannerrequest' /></td></tr>";
  document.body.appendChild(scannerframe);
  var listener = function(event) {
    if (event.target == document.getElementById("scannerrequest")) {
      getScanners();
    }
  };
  document.addEventListener("click", listener, false);
}

function getScanners()
{
  var gal = document.getElementById("galaxies").value;
  var galurl = "galaxy="+encodeURIComponent(gal);
  var guilds = document.getElementById("guilds").value;
  var guildurl = "&guild="+encodeURIComponent(guilds);
  var enemies = document.getElementById("enemies").checked;
  if(!enemies) enemies = "";
  var url = "http://genome.aeonanon.com/data/search/scanner/?" + galurl + guildurl + enemies;
  var exists = document.getElementById("scannerframe");
  if (exists != undefined) {
    exists.src = url + "&brief=True";
    return;
  }
  var scannerframe2 = document.createElement("table");
  scannerframe2.width = twidth;
  scannerframe2.align = "center";
  scannerframe2.innerHTML = "<iframe id='scannerframe' style='width:"+twidth+";height:768' src='"+url+"&brief=True'></iframe>";
  document.body.appendChild(scannerframe2);
}

function updateLocationCache(location, basename)
{
  var cache = getSetting("locationCache", "");
  cache = cache.split(";");
  entry = [location, basename].join("/");
  var i = cache.indexOf(entry);
  // Remove entry if present
  if (i >= 0)
    cache.splice(i, 1);
  // Add entry to the end, and maybe remove one from the start
  if (cache.push(entry) > 10)
    cache.shift();
  cache = cache.join(";");
  setSetting("locationCache", cache);
}

function readLocationCache()
{
  var cache = getSetting("locationCache", "");
  cache = cache.split(";");
  cache = cache.map(function(x) { a = x.split("/"); if (a.length == 1) a.push(''); return a; });
  return cache;
}

function updateLocationCacheFromMapPage(location)
{
  var basename = "";
  var t = document.getElementById("map_base");
  if (t) {
    t = t.rows[0].cells[0].firstChild;
    if (t.rows[0].cells[0].textContent == "Base") {
      basename = t.rows[1].cells[0].firstChild.textContent;
    }
  }
  updateLocationCache(location, basename);
}

function updateLocationCacheFromBasePage()
{
  var location = "";
  var basename = "";
  var tables = document.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    var t = tables[i];
    if (t.rows.length > 0 && t.rows[0].cells.length > 1 &&
	t.rows[0].cells[1].textContent == "Location") {
      if (t.getAttribute("class") == "base_top") {
	location = t.rows[1].cells[0].textContent;
      }
      else {
	location = t.rows[1].cells[1].textContent;
      }
    }
    else if (t.getAttribute("class") == "base") {
      basename = t.rows[0].cells[1].textContent;
      if (basename.substr(basename.length-2) == " \u00A9")
	basename = basename.substr(0, basename.length-2);
    }
  }
  if (location && basename) {
    updateLocationCache(location, basename);
  }
}

function addCachedLocationsMoveMenu()
{
  var cache = readLocationCache();
  if (cache.length == 0)
    return;
  var tables = document.getElementsByTagName("table");
  var t = tables[tables.length-1];
  var r = t.rows[t.rows.length-1];
  var hasOccs = (r.cells[2].textContent != "");
  var small = r.cells[2].firstChild;
  if (hasOccs) {
    br = document.createElement("br");
    small.insertBefore(br, small.firstChild);
    headline = document.createTextNode("Occupations:");
    small.insertBefore(headline, small.firstChild);
    for (var i = 0; i < 3; i++) {
      var br = document.createElement("br");
      small.insertBefore(br, small.firstChild);
    }
  }
  // The most recently cached location is last in the array, but when
  // adding them like this the most recent one ends up on top.
  for (var i = 0; i < cache.length; i++) {
    var entry = cache[i];
    var link = document.createElement("a");
    link.setAttribute("href", "javascript:fastloc('" + entry[0] + "');");
    if (entry[1] == "")
      link.textContent = entry[0];
    else
      link.textContent = entry[1] + " (" + entry[0] + ")";
    var br = document.createElement("br");
    small.insertBefore(link, small.firstChild);
    small.insertBefore(br, small.firstChild);
  }
  var headline = document.createTextNode("Recent locations:");
  small.insertBefore(headline, small.firstChild);
  // Initially select the most recent location
  unsafeWindow.fastloc(cache[cache.length-1][0]);
}

function findBaseLocation()
{
  var cell = xpath1("//table//tr/th[text()='Location' and position()=2]");
  if (!cell)
    return null;
  var row = cell.parentNode;
  if (row.cells[0].textContent == "Base Name") {
    var locCell = row.nextSibling.cells[1];
  }
  else {
    var locCell = row.nextSibling.cells[0];
  }
  return locCell.textContent;
}

function expandBaseLocations()
{
  var cell = xpath1("//table//tr/th[text()='Location' and position()=2]");
  if (!cell) return;
  var row = cell.parentNode;
  if (row.cells[0].textContent == "Base Name") {
    var locCell = row.nextSibling.cells[1];
  }
  else {
    var locCell = row.nextSibling.cells[0];
  }
  if (!locCell)
    return;
  row.cells[0].width = "20%";
  row.cells[1].width = "24%";
  row.cells[2].width = "14%";
  row.cells[3].width = "14%";
  row.cells[4].width = "14%";
  row.cells[5].width = "14%";
  var loc = locCell.textContent;
  var url = "bookmarks.aspx?action=add&astro="+loc;
  var galUrl = "map.aspx?cmp=2&loc="+loc.substring(0,3);
  var regUrl = "map.aspx?cmp=2&loc="+loc.substring(0,6);
  var sysUrl = "map.aspx?cmp=2&loc="+loc.substring(0,9);
  cell.innerHTML += " &nbsp; <small>(<a href='"+url+"'>Bookmark</a>)</small>";
  var html = " &nbsp; <small>(<a href='"+galUrl+"'>"+loc.substring(0,3);
  html += "<a href='"+regUrl+"'>"+loc.substring(3,6)+"</a>";
  html += "<a href='"+sysUrl+"'>"+loc.substring(6,9)+"</a>)</small>";
  locCell.innerHTML += html;
}

function nbsp(n)
{
  var s = "";
  for (i = 0; i < n; i++)
    s += "\u00a0";
  return s;
}

function addOneScoutLink()
{
  var e = document.getElementById('availScout Ship');
  if (!e) return;
  var t = document.getElementById('fleet_move');
  if (!t) return;
  var form = t.rows[1].cells[0].firstChild;
  form.setAttribute("id", "moveForm");
  t = form.firstChild;
  var r = t.rows[t.rows.length-3];
  var c = r.cells[0];
  c.appendChild(document.createTextNode(nbsp(12)));
  var code = "document.getElementById('quantScout Ship').value='1';"
    + "update('Scout Ship');"
    + "document.getElementById('moveForm').submit();";
  var button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("value", "Move 1 Scout");
  button.setAttribute("onclick", code);
  c.appendChild(button, c.firstChild);
}

function addInvertLink()
{
  var x = xpath("//table[@id='fleet_move']//table[@class='layout']//tr/td/a[text()='All']");
  if (x.length != 1) return;
  var td = x[0].parentNode;

  var code = "";
  code += "function invert(id) {\n";
  code += "  var quantElem = document.getElementById('quant'+id);\n";
  code += "  var avail = Number(document.getElementById('avail'+id).textContent);\n";
  code += "  quantElem.value = avail - Number(quantElem.value);\n";
  code += "  update(id);\n";
  code += "}\n\n";
  code += "function invertAll() {\n";
  code += "  var units = document.getElementById('units').value.split(',');\n";
  code += "  for (var i = 0; i < units.length; i++) {\n";
  code += "    invert(units[i]);\n";
  code += "  }\n";
  code += "}\n";
  addScript(code);
  td.innerHTML += " - <a href='javascript:invertAll()'>Invert</a>";
}

function distance(from, to)
{
  var s = from.match(/^[A-Z](\d\d)\:(\d)(\d)\:(\d)(\d)\:(\d)(\d)$/i);
  var t = to.match(/^[A-Z](\d\d)\:(\d)(\d)\:(\d)(\d)\:(\d)(\d)$/i);
  if (!s || !t || from == to) {
    return 0;
  }
  s = s.slice(1,8).map(Number);
  t = t.slice(1,8).map(Number);
  if (s[0] == t[0]) {
    // same galaxy
    var sy = s[1]*10 + s[3];
    var sx = s[2]*10 + s[4];
    var ty = t[1]*10 + t[3];
    var tx = t[2]*10 + t[4];
    if (sy == ty && sx == tx) {
      // same system
      if (s[5] == t[5]) {
	// same orbit
	return 0.1 * Math.abs(s[6]-t[6]);
      }
      else {
	// same system, different orbits
	return 0.2 * Math.abs(s[5]-t[5]);
      }
    }
    else {
      // different systems
      var dx = sx - tx;
      var dy = sy - ty;
      return Math.ceil(Math.sqrt(dx*dx + dy*dy));
    }
  }
  else {
    if (Math.floor(s[0] / 10) == Math.floor(t[0] / 10)) {
      // different galaxies, same cluster
      return Math.abs(s[0] - t[0]) * 200;
    }
    // different galaxy clusters
    if (s[0] < t[0]) {
      return 2000 + Math.abs(9 - (s[0]%10) + (t[0]%10)) * 200;
    }
    else {
      return 2000 + Math.abs((s[0]%10) + 9 - (t[0]%10)) * 200;
    }
  }
}

function insertCell(newCell, prevCell)
{
  prevCell.parentNode.insertBefore(newCell, prevCell.nextSibling);
  var colSpan = prevCell.getAttribute("colspan");
  if (colSpan) {
    colSpan = Number(colSpan);
    if (colSpan > 1) {
      prevCell.setAttribute("colspan", colSpan-1);
    }
  }
}

function addFindJGLink()
{
  var t = document.getElementById('fleet_move');
  var start = document.getElementById('start');
  if (!t || !start)
    return;
  var startLoc = start.textContent;
  if (!startLoc.match(/^[A-Z](\d\d)\:\d\d\:\d\d\:\d\d$/))
    return;
  var gal = RegExp.$1;
  var homeTag = getSetting("homeTag");
  var homeGuild = getSetting("homeGuild");
  if (!homeTag || !homeGuild) {
    GM_log("Unknown home guild - visit guild.aspx");
    return;
  }
  var link = document.createElement("a");
  link.appendChild(document.createTextNode("Find " + homeTag + " JGs"));
  link.setAttribute("style", "color:gold;cursor:pointer");
  var newCell = document.createElement("td");
  newCell.appendChild(link);
  var prevCell = document.getElementById("destination").parentNode;
  insertCell(newCell, prevCell);
  newCell = document.createElement("th");
  newCell.appendChild(document.createTextNode(nbsp(1)));
  prevCell = prevCell.parentNode.previousSibling.cells[1];
  insertCell(newCell, prevCell);
  var div = document.createElement("div");
  div.id = "jumpGateResults";
  div.style.visilibity = "hidden";
  document.body.appendChild(div);
  var jumpGatesLoading = false;

  function closeJumpGateResults()
  {
    hideDiv("jumpGateResults");
  }

  function findJumpGates(e)
  {
    if (jumpGatesLoading) {
      showDiv("jumpGateResults");
      return;
    }
    jumpGatesLoading = true;
    div.style.display = "block";
    div.style.background = "#000";
    div.style.position = "absolute";
    var x = e.pageX + 240;
    div.style.left = x - x%100;
    var y = e.pageY + 30;
    div.style.top = y - y%20;
    div.style.padding = 5;
    var html = "<table width='220' class='no_back'>";
    html += "<tr><th>Searching DB...</th></tr>";
    html += "<tr><td><small>&nbsp;</small></td></tr>";
    html += "<tr><td align='center' colspan='3'><b><a id='abortJumpGateSearch' style='color:gold;cursor:pointer'>Abort</a></b></td><tr></table>";
    div.innerHTML = html;
    var abortLink = document.getElementById("abortJumpGateSearch");
    abortLink.addEventListener('click', closeJumpGateResults, false);
    showDiv("jumpGateResults");
    var pendingSearches = 0;
    var gates = [];
    
    function addGate(loc, level, base)
    {
      if (loc == startLoc || level < 1)
	return;
      for (var i = 0; i < gates.length; i++) {
	if (gates[i][0] == loc) {
	  if (level > gates[i][1]) {
	    gates[i][1] = level;
	    gates[i][2] = base;
	  }
	  return;
	}
      }
      gates[gates.length] = [loc, level, base, distance(startLoc, loc)];
    }

    function genomeGatesLoaded(div)
    {
      var tables = div.getElementsByTagName("table");
      for (var i = 0; i < tables.length; i++) {
	if (tables[i].getAttribute("class") == "sortable") {
	  var rows = tables[i].rows;
	  for (var j = 1; j < rows.length; j++) {
	    var owner = rows[j].cells[2].textContent;
	    if (getGuildTag(owner) == homeTag) {
	      var loc = rows[j].cells[3].textContent;
	      var level = parseInt(rows[j].cells[4].textContent);
	      var base = parseInt(rows[j].cells[0].textContent);
	      addGate(loc, level, base);
	    }
	  }
	}
      }
      if (--pendingSearches == 0) {
	jumpGatesLoaded(gates);
      }
    }

    function genomeBasesLoaded(div)
    {
      var t = document.getElementById("base-table");
      if (t) {
	t.setAttribute("id", "");
	for (var i = 1; i < t.rows.length; i++) {
	  var loc = t.rows[i].cells[7].textContent;
	  var level = parseInt(t.rows[i].cells[12].textContent);
	  var base = parseInt(t.rows[i].cells[0].textContent);
	  addGate(loc, level, base);
	}
      }
      if (--pendingSearches == 0) {
	jumpGatesLoaded(gates);
      }
    }

    function farmBasesLoaded(div)
    {
      var tables = div.getElementsByTagName("table");
      for (var i = 0; i < tables.length; i++) {
	if (tables[i].getAttribute("class") == "sortable") {
	  var rows = tables[i].rows;
	  for (var j = 1; j < rows.length; j++) {
	    var loc = rows[j].cells[3].textContent;
	    var level = parseInt(rows[j].cells[9].textContent);
	    var base = parseInt(rows[j].cells[0].textContent);
	    addGate(loc, level, base);
	  }
	}
      }
      if (--pendingSearches == 0) {
	jumpGatesLoaded(gates);
      }      
    }

    if (getFlag("uploadToGenome")) {
      // Search for allied jump gates using the jump gate search
      pendingSearches++;
      var url = "http://genome.aeonanon.com/data/search/gate/?galaxy="+gal;
      getPage(url, genomeGatesLoaded);
      // Search for the home guild id
      pendingSearches++;
      url = "http://genome.aeonanon.com/data/search/base/?galaxy="+gal+"&econ=0&guild="+homeGuild;
      getPage(url, genomeBasesLoaded);
    }
    if (getFlag("uploadToRubyFARM")) {
      // Search for allied jump gates using the jump gate search
      var url = "http://rubyfarm.dontexist.net/search/jumpgate?location="+gal+"&commit=Search";
      getPage(url, farmBasesLoaded);
      pendingSearches++;
      // Search for the home guild id
      pendingSearches++;
      var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+homeGuild+"&commit=Search";
      getPage(url, farmBasesLoaded);
    }
  }

  function jumpGatesLoaded(gates)
  {
    // Sort by distance and cap the list after the 15 closest gates
    gates.sort(function (x, y) { return x[3]-y[3]; });
    gates = gates.slice(0,20);
    var html = "<table width='220' class='no_back'>";
    html += "<tr style='color:gold'><th align='left'>Location</th>";
    html += "<th align='center'>Distance</th>";
    html += "<th align='right'>Level</th></tr>";
    for (var i = 0; i < gates.length; i++) {
      var href = '"javascript:fastloc(\'' + gates[i][0] + '\');"';
      html += "<tr><td align='left'><small>";
      html += "<a href="+href+">"+gates[i][0]+"</a></small></td>";
      html += "<td align='center'><small>"+gates[i][3]+"</small></td>";
      html += "<td align='right'><small><a href='base.aspx?base="+gates[i][2];
      html += "'>"+gates[i][1]+"</a></small></td></tr>";
    }
    //html += "<tr><td colspan='3'>&nbsp;</td></tr>";
    html += "<tr><td align='center' colspan='3'><b><a id='closeJumpGateResults' style='color:gold;cursor:pointer'>Close</a></b></td><tr>";
    html += "</table>";
    div.innerHTML = html;
    var closeLink = document.getElementById("closeJumpGateResults");
    closeLink.addEventListener('click', closeJumpGateResults, false);
  }

  link.addEventListener('click', findJumpGates, false);
}

function shortcutFleetLinks()
{
  // Make the on-map fleet links point directly to the move fleet page
  var imgs = document.getElementsByTagName("img");
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.getAttribute("src") == "images/point.gif" &&
	img.parentNode.nodeName == "A") {
      var href = img.parentNode.getAttribute("href");
      if (href.match(/fleet\.aspx\?fleet=\d{1,20}$/)) {
	img.parentNode.setAttribute("href", href+"&view=move");
      }
    }
  }
  // Do the same for the links in the fleet list
  // and the links in the empire fleet list
  var t = document.getElementById("fleets-list");
  var empireFleets = false;
  if (!t) {
    t = document.getElementById("empire_fleets");
    empireFleets = true;
  }
  if (t) {
    var rows = t.rows[1].cells[0].firstChild.rows;
    if (rows) {
      for (var i = 1; i < rows.length; i++) {
	var a = rows[i].cells[0].firstChild;
	if (a && a.nodeName == "SMALL") {
	  a = a.firstChild;
	}
	if (a && a.nodeName == "A") {
	  var href = a.getAttribute("href");
	  if (href.match(/fleet\.aspx\?fleet=\d{1,20}$/)) {
	    // Don't modify links to fleets that are already moving
	    if (!empireFleets && rows[i].cells[2].textContent != "") {
	      continue;
	    }
	    if (empireFleets && endsWith(rows[i].cells[1].textContent, "*")) {
	      continue;
	    }
	    a.setAttribute("href", href+"&view=move");
	  }
	}
      }
    }
  }
}

function insertEmpireMenu()
{
  var menu = document.getElementById("empire_menu");
  var unitsid = "units";
  if (!menu && document.getElementById(unitsid)) {
    unitsid += "2";
  }
  var html1 = '<tbody><tr><th width="8%" id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th width="12%" id="bases_production"><a href="empire.aspx?view=bases_production">Production</a></th><th width="12%" id="bases_capacities"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th width="10%" id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th width="8%" id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th width="12%" id="structures"><a href="empire.aspx?view=structures">Structures</a></th><th width="8%" id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="8%" id="'+unitsid+'"><a href="empire.aspx?view=units">Units</a></th><th width="12%" id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th><th width="10%" id="scanners"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr></tbody>';
  var html2 = '<tbody><tr><th id="bases_events" width="10%"><a href="empire.aspx?view=bases_events">Events</a></th><th id="bases_production" width="10%"><a href="empire.aspx?view=bases_production">Production</a></th><th id="economy" width="10%"><a href="empire.aspx?view=economy">Economy</a></th><th id="trade" width="10%"><a href="empire.aspx?view=trade">Trade</a></th><th id="scanners" width="10%"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr><tr><th id="bases_capacities" width="10%"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th id="structures" width="10%"><a href="empire.aspx?view=structures">Structures</a></th><th id="fleets" width="10%"><a href="empire.aspx?view=fleets">Fleets</a></th><th id="'+unitsid+'" width="10%"><a href="empire.aspx?view=units">Units</a></th><th id="technologies" width="*"><a href="empire.aspx?view=technologies">Technologies</a></th></tr></tbody>';
  var html3 = '<tbody><tr><th width="17%" id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th width="17%" id="bases_production"><a href="empire.aspx?view=bases_production">Production</a></th><th width="17%" id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th width="16%" id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th width="16%" id="'+unitsid+'"><a href="empire.aspx?view=units">Units</a></th><th width="17%" id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th></tr></tbody>';
  if (menu) {
    if (getFlag("freeAccountEmpireMenu") && !getFlag("upgradedAccount"))
      menu.innerHTML = html3;
    else if (getFlag("classicEmpireMenu"))
      menu.innerHTML = html1;
  }
  else if(getFlag("insertEmpireMenu")) {
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      if (t.getAttribute("class") == "top") {
	menu = document.createElement("table");
	menu.setAttribute("width", twidth);
	menu.setAttribute("height", 25);
	menu.setAttribute("align", "center");
	menu.setAttribute("class", "header");
	menu.setAttribute("id", "empire_menu");
	if (getFlag("freeAccountEmpireMenu") && !getFlag("upgradedAccount"))
	  menu.innerHTML = html3;
	else if (getFlag("classicEmpireMenu"))
	  menu.innerHTML = html1;
	else
	  menu.innerHTML = html2;
	t.parentNode.insertBefore(menu, t.nextSibling);
	var br = document.createElement("br");
	t.parentNode.insertBefore(br, menu);
	return;
      }
    }
  }
}

quoteColor="BBBBBB";

function insertQuoteLink(row)
{
  var post = "[color='" + quoteColor + "'][quote][b][u]" +
    row.cells[1].textContent +
    ", " + row.cells[3].textContent + "[/u][/b]\n" +
    getPostContent(row.nextSibling.firstChild) + "[/quote][/color]\n\n";
  post = post.replace(/\'/g, "\\\'");
  post = post.replace(/\n/g, "\\n");
  post = post.replace(/\r/g, "\\r");
  var code = "n=document.getElementById('body');n.value='"+post+"';n.focus();";
  var td = document.createElement("td");
  td.setAttribute("width", "200");
  var link = document.createElement("a");
  link.setAttribute("href", "javascript:;");
  link.setAttribute("onclick", "javascript:" + code);
  link.textContent = "Quote";
  td.appendChild(link);
  td.appendChild(document.createTextNode(nbsp(1)));
  row.appendChild(td);
}

function insertTradeLinks(row, trades)
{
  var tmp = row.innerHTML;
  var r = />([a-z]\d\d):(\d\d:\d\d:\d\d)<\/a>\s*(\d+)\s*\/\s*(\d+)\s+(\d\s*\/\s*\d)/gi;
  var s = "><b>$1</b>:$2</a> $3 / <b>$4</b> $5 &nbsp; <select>";
  s += "<option>Send a trade</option>";
  for (var i = 0; i < trades.length; i++) {
    var action = "base.aspx?base=" + trades[i][0]
      + "&view=trade&action=new";
    var onclick = "document.tradeForm.action='"+action+"';";
    onclick += "document.tradeForm.destination.value='$1:$2';";
    onclick += "window.submitTradeForm();";
    s += '<option onclick="'+onclick+'">';
    s += "From "+trades[i][1];
    s += " ("+trades[i][2]+"/"+trades[i][3]+" econ)</option>";
  }
  s += "</select><br/>";
  tmp = tmp.replace(r, s);
  row.innerHTML = tmp;
}

function disableBoardRedirects(row)
{
  var x = xpath("//a[starts-with(@href, 'redirect.aspx?')]", row);
  for (var i = 0; i < x.length; i++) {
    var href = x[i].getAttribute("href");
    href = href.replace(/^redirect\.aspx\?/, "");
    x[i].setAttribute("href", href);
  }
}

function insertTradeForm()
{
  var tmp = '<form id="tradeForm" name="tradeForm" method="POST" action="">';
  tmp += '<input type="hidden" name="destination" value="" />';
  tmp += '<input id="tradeFormNewSubmit" type="hidden" name="newSubmit" value="Calculate Profit" />';
  tmp += '</form>';
  var div = document.createElement("div");
  div.style.display = "none";
  div.innerHTML = tmp;
  document.body.appendChild(div);
  var f = document.getElementById("tradeForm");
  f.realSubmit = f.submit;
  document.getElementById("tradeFormNewSubmit").setAttribute("name", "submit");
  unsafeWindow.submitTradeForm = function() { f.realSubmit(); }
}

function recordOpenTrades()
{
  var trades = [];
  var t = document.getElementById("empire_trade_bases");
  var rows = t.rows[1].cells[0].firstChild.rows;
  for (var i = 1; i < rows.length; i++) {
    var tmp = rows[i].innerHTML;
    m = tmp.match(/base\.aspx\?base=(\d+).*<td.*>.*map\.aspx\?loc=([a-z]\d\d:\d\d:\d\d:\d\d).*<td.*>(\d+)\s*<small>\/(\d+)<\/small>.*<td.*>.*(\d+)\s*\/\s*(\d+)/i);
    if (m && parseInt(m[5]) < parseInt(m[6])) {
      trades.push(m.slice(1,5).join("/"));
    }
  }
  setSetting("openTrades", trades.join(";"));
}

function getOpenTrades()
{
  var s = getSetting("openTrades");
  if (!s)
    return s;
  var trades = s.split(";");
  trades = trades.map(function(x) { return x.split("/"); });
  return trades;
}

function processBoardPosts()
{
  if (getFlag("insertTradeLinks"))
    insertTradeForm();
  var trades = getOpenTrades();
  var t = document.getElementById("board_main");
  if (!t) return;
  t = t.rows[0].cells[0].firstChild.firstChild;
  t.rows[0].cells[1].setAttribute("colspan", "3");
  var r = t.rows[t.rows.length-1];
  if (r.cells.length > 1 && r.cells[1].textContent.match(/Next/))
    r.cells[1].setAttribute("colspan", "3");
  for (var j = 2; j < t.rows.length-1; j += 2) {
    r = t.rows[j];
    if (r.cells.length == 4) {
      n = r.cells[1].firstChild;
      if (n != null && n.nodeName == "A" &&
	  n.getAttribute("href").match(/profile\.aspx\?player=\d{1,20}$/)) {
	if (getFlag("insertQuoteLinks"))
	  insertQuoteLink(r);
	if (trades && getFlag("insertTradeLinks"))
	  insertTradeLinks(t.rows[j+1], trades);
	if (getFlag("disableBoardRedirects"))
	  disableBoardRedirects(r);
      }
    }
  }    
  parseMMLinks(t);
}

function getPostContent(root)
{
  // Custom textContent replacement
  var txt = "";

  function visit(elem) {
    var c = elem.childNodes;
    for (var i = 0; i < c.length; i++) {
      visit(c[i]);
    }
    switch (elem.nodeName) {
    case "#text":
      txt += elem.textContent;
      break;
    case "IMG":
      txt += elem.getAttribute("alt") || elem.getAttribute("title") || "";
      break;
    }
  }

  visit(root);
  return txt;
}

function insertReplyQuote()
{
  if (!getFlag("insertQuoteLinks")) {
    return;
  }
  var body = document.getElementById("body");
  if (body && body.value != "") {
    // preview, don't insert quote
    return;
  }
  var tables = document.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    var t = tables[i];
    if (t.getAttribute("class") == "no_back") {
      if (!t.parentNode.textContent.match(/original message/i))
	continue;
      var post = getPostContent(t.rows[1]);
      post = "[color='" + quoteColor + "'][quote]" +
	post + "[/quote][/color]\n\n";
      body.value = post;
      body.focus();
    }
  }
}

function getGuildTag(name)
{
  var regex = /\[.*?\]/;
  var result = regex.exec(name);
  if (result)
    return result[0];
  else
    return name;
}

function decimalFormat(n, decimals)
{
  var p = Math.pow(10, decimals);
  var s = "" + (Math.round(n*p)/p);
  if (s.indexOf('.') == -1) {
    s += '.';
  }
  while (s.indexOf('.') >= s.length - decimals) {
    s += '0';
  }
  return s;
}

function commaFormat(amount)
{
  var delimiter = ",";
  amount = ""+amount;
  var a = amount.split('.',2);
  var d = a[1];
  var i = parseNum(a[0]);
  if (isNaN(i)) {
    GM_log("Could not comma-format number: " + amount);
    return ""+amount;
  }
  var minus = '';
  if (i < 0) { minus = '-'; }
  i = Math.abs(i);
  var n = new String(i);
  var a = [];
  while(n.length > 3) {
    var nn = n.substr(n.length-3);
    a.unshift(nn);
    n = n.substr(0,n.length-3);
  }
  if (n.length > 0) { a.unshift(n); }
  n = a.join(delimiter);
  if (d==undefined || d.length < 1) { amount = n; }
  else { amount = n + '.' + d; }
  amount = minus + amount;
  return amount;
}

function sumFleets()
{
  var fleetData = []; //[guild, incoming, landed, incoming today]

  function addFleetSize(guild, size, incomingSize, incomingTodaySize)
  {
    for (var i = 0; i < fleetData.length; i++)
    {
      if (fleetData[i][0] == guild) {
	if (incomingSize == 0)
	  fleetData[i][1] += size;
	fleetData[i][2] += incomingSize;
	fleetData[i][3] += incomingTodaySize;
	return;
      }
    }
    if (incomingSize == 0) {
      fleetData[fleetData.length] = [guild, size, 0, 0];
    }
    else {
      fleetData[fleetData.length] = [guild, 0, incomingSize, incomingTodaySize];
    }
  }

  function insertFleetSummary()
  {
    var html = "<tr><td><table class='layout listing'><tr class='listing-header'><th colspan='5'>Fleet Summary</th></tr><tr class='listing-header'><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>";
    var style = "";
    var incoming, arrived, incomingToday, total;
    var formatNumbers = true;
    for (var i = 0; i < fleetData.length; i++) {
      incoming = fleetData[i][2];
      arrived = fleetData[i][1];
      total = fleetData[i][1] + fleetData[i][2];
      incomingToday = fleetData[i][3];
      if (formatNumbers) {
	incoming = commaFormat(incoming);
	arrived = commaFormat(arrived);
	incomingToday = commaFormat(incomingToday);
	total = commaFormat(total);
      }
      html += "<tr align='center' "+style+"><td>"+fleetData[i][0]+"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived+"</td><td>"+total+"</td><td><a id='showHide"+fleetData[i][0]+"' href='javascript:;'>Hide</a></td></tr>";
    }
    html += "</td></tr></table>";
    var newTable = document.createElement("table");
    newTable.setAttribute("width","600");
    newTable.setAttribute("align","center");
    newTable.innerHTML = html;
    var table = document.getElementById("base_fleets");
    if (!table)
      table = document.getElementById("map_fleets");
    document.body.insertBefore(newTable,table);
    var br = document.createElement("br");
    document.body.insertBefore(br,table);
    for (var i = 0; i < fleetData.length; i++) {
      var link = document.getElementById("showHide"+fleetData[i][0]);
      link.addEventListener('click', getShowHideFleetClosure(fleetData[i][0]), false);
    }
  }

  function getShowHideFleetClosure(guild)
  {
    function func() {
      toggleFleetVisibility(guild);
    }
    return func;
  }

  function toggleFleetVisibility(guild)
  {
    var guildRows = xpath("//tr[@guild='"+guild+"']");
    for (var i = 0; i < guildRows.length; i++) {
      var row = guildRows[i];
      row.style.display = (row.style.display=="none")? "":"none";
      row.style.visibility = (row.style.visibility=="hidden")? "":"hidden";
    }
    var link = document.getElementById("showHide"+guild);
    link.textContent= (link.textContent=="Show")? "Hide":"Show";
    //document.body.scrollTop += 200;
  }

  var t = document.getElementById("base_fleets");
  if (!t)
    t = document.getElementById("map_fleets");
  if (!t)
    return;

  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows)
    return;
    
  var now = new Date(), future = new Date();
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var size = parseNum(row.childNodes[3].firstChild.textContent);
    var player = row.childNodes[1].firstChild.textContent;
    var arrivalTimeCell = row.childNodes[2];
    var guild = getGuildTag(player);
    var incoming = (arrivalTimeCell.childNodes.length > 0);
    var incomingToday = false;
    row.setAttribute("guild",guild);
    if ((arrivalTimeCell.id.indexOf('time') != -1
	 || arrivalTimeCell.id.indexOf('checked') != -1)
	&& (parseNum(arrivalTimeCell.title) >= 0)) {
      var time = arrivalTimeCell.title;
      future.setTime(now.getTime() + (time * 1000));
      incomingToday = (future.getDate() - now.getDate() == 0);
    }
    var incomingSize = incoming? size:0;
    var incomingTodaySize = incomingToday? size:0;
    addFleetSize(guild, size, incomingSize, incomingTodaySize);
  }
  if (rows.length > 2) {
    insertFleetSummary();
  }
}

function hideDiv(divID)
{
  var div = document.getElementById(divID);
  if (div) {
    var style = div.getAttribute("style");
    div.setAttribute("style", style + " visibility: hidden;");
  }
}

function showDiv(divID)
{
  var div = document.getElementById(divID);
  if (div) {
    var style = div.getAttribute("style");
    style = style.replace(/visibility:\s*hidden;?/gi, '');
    div.setAttribute("style", style);
  }
}

function extractBody(html)
{
  var i = html.indexOf("<body>");
  if (i == -1)
    return "";
  var j = html.indexOf("</body>", i+6);
  return html.slice(i+6, j);
}

function addScriptSource(url)
{
  var script = document.createElement("script");
  script.setAttribute("src", url);
  document.body.appendChild(script);
}

function addScript(code)
{
  var script = document.createElement("script");
  script.textContent = code;
  document.body.appendChild(script);
}

function fixLinks(root, from, to)
{
  function visit(elem) {
    var c = elem.childNodes;
    for (var i = 0; i < c.length; i++) {
      visit(c[i]);
    }
    if (elem.nodeName == "A") {
      var href = elem.getAttribute("href");
      if (href) {
	href = href.replace(from, to);
	elem.setAttribute("href", href);
      }
    }
  }
  visit(root);
}

function getPage(url, callback)
{
  var loaded = function(details) {
    var div = newElement("div", { style: "display:none; visibility:hidden; position:absolute; left:0px; top:0px;" });
    div.innerHTML = extractBody(details.responseText);
    document.body.appendChild(div);
    callback(div);
  }
  var req = { method: "GET", url: url, onload: loaded };
  GM_xmlhttpRequest(req);
}

function makeSortable(id)
{
  addScript("sorttable.init(); sorttable.makeSortable(document.getElementById('" + id + "')); document.getElementById('" + id + "').tHead.setAttribute('style', 'color:gold;font-weight:bold;cursor:pointer');");
}

function addLocationSearchFrame(loc)
{
  var inRegion = loc.match(/^[A-Z]\d\d:\d\d$/);
  var inSystem = loc.match(/^[A-Z]\d\d:\d\d:\d\d$/);
  if (!inRegion) {
    // Don't search if we have eyes on the system / astro
    if (!document.body.innerHTML.match(/\/images\/astros\/(unknown|asteroid)\.jpg/i)) {
      return;
    }
    if (document.body.innerHTML.match(/\d+ Debris/)) {
      return;
    }
  }

  if (getFlag("searchUsingGenome")) {
    var url = "http://genome.aeonanon.com/data/search/location/?location=" + encodeURIComponent(loc);
    var dbName = "Genome";

    function onLoad(div)
    {
      fixLinks(div, /\/data\/view/, "http://genome.aeonanon.com/data/view");
      var src = document.getElementById("base-table");
      var dst = document.getElementById("searchResults");
      if (src && dst) {
	var tmp = '<table align="center" width="'+twidth+'"';
	tmp += ' class="sortable" id="resultTable" cellpadding="2">';
	tmp += src.innerHTML + '</table>';
	dst.innerHTML = tmp;
	makeSortable("resultTable");
      }
    };
  }
  else if (getFlag("searchUsingRubyFARM")) {
    var url = "http://rubyfarm.dontexist.net/search/base?location=" + encodeURIComponent(loc) + "&commit=Search"
    var dbName = "RubyFARM";

    function onLoad(div)
    {
      fixLinks(div, /\/base\/view/, "http://rubyfarm.dontexist.net/base/view");
      fixLinks(div, /\/player\/view/, "http://rubyfarm.dontexist.net/player/view");
      var m = div.innerHTML.match(/<table class=.sortable.>((\n|\r|.)*?)<\/table>/gi);
      var dst = document.getElementById("searchResults");
      if (m && dst) {
	var tmp = '<table align="center" width="'+twidth+'"';
	tmp += ' class="sortable" id="resultTable" cellpadding="2">';
	tmp += RegExp.$1 + '</table>';
	dst.innerHTML = tmp;
	makeSortable("resultTable");
      }
    };
  }
  else {
    return;
  }

  var content = '<a target="_blank" href="' + url + '">View location in ' + dbName + '</a>';
  displayData(0, newTable(content));
  
  if (!opera) {
    var content = '<span id="searchResults"></span><br/>';
    if (inRegion) {
      content = '<br/><br/>' + content;
    }
    else if (inSystem) {
      content = '<br/>' + content;
    }
    displayData(-100, content);
    getPage(url, onLoad);
  }
}

function jgRadius(level)
{
  var i = parseInt(level);
  return 5 + i/3;
}

function jgColor(level)
{
  var i = parseInt(level);
  if (i > 14) i = 14;
  ch = "899aabbccddeeff".charAt(i);
  return "#22"+ch+ch+"22";
}

function friendlyColor(level)
{
  var i = parseInt(level);
  if (i > 14) i = 14;
  ch = "899aabbccddeeff".charAt(i);
  return "#4444"+ch+ch;
}

function hostileColor(level)
{
  var i = parseInt(level);
  if (i > 14) i = 14;
  ch = "899aabbccddeeff".charAt(i);
  return "#"+ch+ch+"55"+ch+ch;
}

function enemyColor(level)
{
  var i = parseInt(level);
  if (i > 14) i = 14;
  ch = "899aabbccddeeff".charAt(i);
  return "#"+ch+ch+"2222";
}

function round256(x)
{
  x = Math.round(x);
  if (x < 0) x = 0;
  if (x > 255) x = 255;
  return x;
}

function hex256(x)
{
  var s = round256(x).toString(16);
  if (s.length == 1)
    s = "0"+s;
  return s;
}

function rgb(r, g, b)
{
  return "#"+hex256(r)+hex256(g)+hex256(b);
}

function parseDays(time)
{
  if (time.match(/(\d+) year/i)) {
    return parseInt(RegExp.$1) * 365.25;
  }
  else if (time.match(/(\d+) month.*(\d+) week/i)) {
    return parseInt(RegExp.$1) * 30.5 + parseInt(RegExp.$2) * 7;
  }
  else if (time.match(/(\d+) month/i)) {
    return parseInt(RegExp.$1) * 30.5;
  }
  else if (time.match(/(\d+) week.*(\d+) day/i)) {
    return parseInt(RegExp.$1) * 7 + parseInt(RegExp.$2);
  }
  else if (time.match(/(\d+) week/)) {
    return parseInt(RegExp.$1) * 7;
  }
  else if (time.match(/(\d+) day.*(\d+) hour/i)) {
    return parseInt(RegExp.$1) + parseInt(RegExp.$2) / 24.0;
  }
  else if (time.match(/(\d+) day/i)) {
    return parseInt(RegExp.$1);
  }
  else if (time.match(/(\d+) hour.*(\d+) minute/i)) {
    return parseInt(RegExp.$1) / 24.0 + parseInt(RegExp.$2) / 1440.0;
  }
  else if (time.match(/(\d+) hour/i)) {
    return parseInt(RegExp.$1) / 24.0;
  }
  else if (time.match(/(\d+) minute/i)) {
    return parseInt(RegExp.$1) / 1440.0;
  }
  else {
    GM_log("Could not parse time '"+time+"'");
    return 100000;
  }
}

function addMapOverlays()
{
  if (opera)
    return;
  var canvas = document.getElementById("myCanvas");
  if (!canvas)
    return;
  var img = canvas.firstChild.rows[0].cells[0].firstChild;
  var gal = img.getAttribute("alt").match(/Galaxy Alpha-(\d\d)/)[1];
  var style = "position: absolute; left: "+canvas.offsetLeft+"px;";
  canvas.setAttribute("style", style);

  function newCanvas(canvasID)
  {
    var c = newElement("div", { id: canvasID, style: style + " visibility: hidden; z-index: 0;" });
    c.innerHTML = canvas.innerHTML;
    return c;
  }

  function fillRegion(canvas, row, col, caption, color)
  {
    var y = row*60 + 3;
    var x = col*60 + 3 - 300;
    var canvasID = canvas.getAttribute("id");
    var code = "g = new jsGraphics('" + canvasID + "'); ";
    code += "g.setColor('"+color+"'); ";
    code += "g.fillRect("+x+", "+y+", 60, 60); ";
    code += "g.paint();";
    addScript(code);
    var style = "position: absolute; left: " + x + "px; top: " + y + "px;";
    var div = newElement("div", { style: style });
    var region = "A"+gal+":"+row+col;
    var a = newElement("a", { href: "map.aspx?cmp=2&loc="+region });
    var img = newElement("img", { src: "/images/point.gif", alt: caption, title: caption, id: canvasID+row+col, width: "60", height: "60" });
    img.style.zIndex = "2";
    img.style.position = "absolute";
    a.appendChild(img);
    div.appendChild(a);
    canvas.appendChild(div);
  }

  function paintDot(canvas, loc, caption, color, radius)
  {
    var m = loc.match(/A\d\d:(\d)(\d):(\d)(\d)/);
    var y = parseInt(m[1])*10 + parseInt(m[3]);
    var x = parseInt(m[2])*10 + parseInt(m[4]);
    var minx = -293;
    var miny = 7;
    var w = 600;
    var h = 600;
    var skewx = (y%2) * 0;
    var skewy = (x%2) * 0;
    x = x * w / 100 + minx + skewx;
    y = y * h / 100 + miny + skewy;
    var canvasID = canvas.getAttribute("id");
    var code = "g = new jsGraphics('" + canvasID + "'); ";
    code += "g.setColor('"+color+"'); ";
    //code += "g.drawRect("+minx+", "+miny+", "+w+", "+h+"); ";
    code += "g.fillEllipse("+(x-radius/2)+", "+(y-radius/2)+", "+radius+", "+radius+"); ";
    code += "g.paint();"
    addScript(code);
    var style = "position: absolute; left: " + (x-4) +"px; top: " + (y-4) + "px;";
    var div = newElement("div", { style: style });
    var a = newElement("a", { href: "map.aspx?loc="+loc });
    var img = newElement("img", { src: "/images/point.gif", alt: caption, title: caption, id: canvasID+loc, width: "9", height: "9" });
    img.style.zIndex = "1";
    img.style.position = "absolute";
    a.appendChild(img);
    div.appendChild(a);
    canvas.appendChild(div);
  }

  var bestAllied = [];
  var bestFriendly = [];
  var bestHostile = [];
  var bestEnemy = [];

  function addBase(stance, name, owner, loc, level)
  {
    var tag = getGuildTag(owner);
    if (!tag) return;
    var system = loc.match(/A\d\d:(\d\d:\d\d):\d\d/);
    if (!system) return;
    system = system[1];
    var desc = name + " (" + tag + ", level " + level + ")";
    if (stance == "allied") {
      if (!bestAllied[system] || bestAllied[system] < level) {
	bestAllied[system] = level;
	paintDot(jgCanvas, loc, desc, jgColor(level), jgRadius(level));
	paintDot(allGatesCanvas, loc, desc, jgColor(level), jgRadius(level));
      }
    }
    else if (stance == "friendly") {
      if (!bestAllied[system]) {
	if (!bestFriendly[system] || bestFriendly[system] < level) {
	  bestFriendly[system] = level;
	  paintDot(jgCanvas, loc, desc, friendlyColor(level), jgRadius(level));
	  paintDot(allGatesCanvas, loc, desc, friendlyColor(level), jgRadius(level));
	}
      }
    }
    else if (stance == "hostile") {
      if (!bestEnemy[system]) {
	if (!bestHostile[system] || bestHostile[system] < level) {
	  bestHostile[system] = level;
	  paintDot(enemyCanvas, loc, desc, hostileColor(level), jgRadius(level));
	  paintDot(allGatesCanvas, loc, desc, hostileColor(level), jgRadius(level));
	}
      }
    }
    else if (stance == "enemy") {
      if (!bestEnemy[system] || bestEnemy[system] < level) {
	bestEnemy[system] = level;
	paintDot(enemyCanvas, loc, desc, enemyColor(level), jgRadius(level));
	paintDot(allGatesCanvas, loc, desc, enemyColor(level), jgRadius(level));
      }
    }
  }

  function genomeGatesLoaded(div)
  {
    var homeTag = getSetting("homeTag", "");
    var tables = div.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      if (tables[i].getAttribute("class") == "sortable") {
	var rows = tables[i].rows;
	for (var j = 1; j < rows.length; j++) {
	  var name = rows[j].cells[1].textContent;
	  var owner = rows[j].cells[2].textContent;
	  var loc = rows[j].cells[3].textContent;
	  var level = rows[j].cells[4].textContent;
	  if (getGuildTag(owner) == homeTag) {
	    addBase("allied", name, owner, loc, level);
	  }
	}
      }
    }
  }

  function genomeBasesLoaded(stance, div)
  {
    var t = document.getElementById("base-table");
    if (!t) return;
    t.setAttribute("id", "");
    for (var i = 1; i < t.rows.length; i++) {
      var name = t.rows[i].cells[1].textContent;
      var owner = t.rows[i].cells[2].textContent;
      var loc = t.rows[i].cells[7].textContent;
      var level = parseInt(t.rows[i].cells[12].textContent);
      addBase(stance, name, owner, loc, level);
    }
  }

  function genomeAlliedBasesLoaded(div)
  {
    genomeBasesLoaded("allied", div);
  }

  function genomeFriendlyBasesLoaded(div)
  {
    genomeBasesLoaded("friendly", div);
  }

  function genomeHostileBasesLoaded(div)
  {
    genomeBasesLoaded("hostile", div);
  }

  function genomeEnemyBasesLoaded(div)
  {
    genomeBasesLoaded("enemy", div);
  }

  function farmBasesLoaded(stance, div)
  {
    var homeTag = getSetting("homeTag", "");
    var tables = div.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      if (tables[i].getAttribute("class") == "sortable") {
	var rows = tables[i].rows;
	for (var j = 1; j < rows.length; j++) {
	  var name = rows[j].cells[1].textContent;
	  var owner = rows[j].cells[2].textContent;
	  var loc = rows[j].cells[3].textContent;
	  var level = rows[j].cells[9].textContent;
	  if (stance != "allied" || getGuildTag(owner) == homeTag) {
	    addBase(stance, name, owner, loc, level);
	  }
	}
      }
    }
  }

  function farmAlliedBasesLoaded(div)
  {
    farmBasesLoaded("allied", div);
  }

  function farmFriendlyBasesLoaded(div)
  {
    farmBasesLoaded("friendly", div);
  }

  function farmHostileBasesLoaded(div)
  {
    farmBasesLoaded("hostile", div);
  }

  function farmEnemyBasesLoaded(div)
  {
    farmBasesLoaded("enemy", div);
  }

  function genomeRowLoaded(div)
  {
    var r = new RegExp("<h2>A"+gal+":(\\d)0-\\d9</h2>", "i");
    var row = div.innerHTML.match(r);
    if (!row) return;
    row = parseInt(row[1]);
    var tables = div.getElementsByTagName("table");
    var maxDaysAgo = 0;
    var maxTime = "";
    for (var i = 0; i < tables.length; i++) {
      if (tables[i].getAttribute("class") == "sortable") {
	var rows = tables[i].rows;
	for (var j = 1; j < rows.length; j++) {
	  var sys = rows[j].cells[0].textContent;
	  var time = rows[j].cells[1].textContent;
	  var days = parseDays(time);
	  if (days > maxDaysAgo) {
	    maxDaysAgo = days;
	    maxTime = time;
	  }
	  paintDot(scoutedCanvas3, sys, time, "#ffffff", 10);
	}
	var f = maxDaysAgo / 56.0;
	if (f > 1.0) f = 1.0;
	var color = rgb(255 * f, 255 * (1 - f), 0);
	for (var col = 0; col < 10; col++) {
	  var caption = "Region A"+gal+":"+row+col+" ("+maxTime+" ago)";
	  fillRegion(scoutedCanvas2, row, col, caption, color);
	}	
      }
    }
  }

  function loadFriendlyGates()
  {
    var homeGuild = getSetting("homeGuild", "");
    if (getFlag("uploadToGenome")) {
      if (homeGuild) {
	// Search for allied jump gates using the jump gate search
	var url = "http://genome.aeonanon.com/data/search/gate/?galaxy=" + gal;
	getPage(url, genomeGatesLoaded);
	// Search for allied gates using the regular search
	url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+homeGuild;
	getPage(url, genomeAlliedBasesLoaded);
      }
      // Search for configured friendly guilds
      var friends = getFriendlyGuilds();
      for (var i in friends) {
	url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+friends[i];
	getPage(url, genomeFriendlyBasesLoaded);
      }
    }
    if (getFlag("uploadToRubyFARM")) {
      if (homeGuild) {
	// Search for allied jump gates using the jump gate search
	var url = "http://rubyfarm.dontexist.net/search/jumpgate?location="+gal+"&commit=Search";
	getPage(url, farmAlliedBasesLoaded);
	// Search for allied jump gates using the regular search
	var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+homeGuild+"&commit=Search";
	getPage(url, farmAlliedBasesLoaded);
      }
      // Search for configured friendly guilds
      var friends = getFriendlyGuilds();
      for (var i in friends) {
	var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+friends[i]+"&commit=Search";
	getPage(url, farmFriendlyBasesLoaded);
      }
    }
  }

  function loadEnemyGates()
  {
    if (getFlag("uploadToGenome")) {
      // Search for configured hostile guilds
      var hostiles = getHostileGuilds();
      for (var i in hostiles) {
	url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+hostiles[i];
	getPage(url, genomeHostileBasesLoaded);
      }
      // Search for configured enemy guilds
      var enemies = getEnemyGuilds();
      for (var i in enemies) {
	url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+enemies[i];
	getPage(url, genomeEnemyBasesLoaded);
      }
    }
    if (getFlag("uploadToRubyFARM")) {
      // Search for configured hostile guilds
      var hostiles = getHostileGuilds();
      for (var i in hostiles) {
	var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+hostiles[i]+"&commit=Search";
	getPage(url, farmHostileBasesLoaded);
      }
      // Search for configured enemy guilds
      var enemies = getEnemyGuilds();
      for (var i in enemies) {
	var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+enemies[i]+"&commit=Search";
	getPage(url, farmEnemyBasesLoaded);
      }
    }
  }

  function loadLastScoutedTimes()
  {
    if (getFlag("uploadToGenome")) {
      for (var row = 0; row < 10; row++) {
	var r = parseInt(gal)*10 + row + 1;
	var url = "http://genome.aeonanon.com/claims/row/"+r+"/";
	getPage(url, genomeRowLoaded);
      }
    }
  }

  var friendlyGatesLoading = false;
  var enemyGatesLoading = false;
  var lastScoutedTimesLoading = false;

  function selectMapOverlay(divID)
  {
    divIDs = ["myCanvas", "jgCanvas", "enemyCanvas", "allGatesCanvas", "scoutedCanvas"];
    for (var x = 0; x < divIDs.length; x++) {
      hideDiv(divIDs[x]);
      hideDiv(divIDs[x]+"2");
      hideDiv(divIDs[x]+"3");
      document.getElementById("select_"+divIDs[x]).setAttribute("style", "");
    }
    showDiv(divID);
    showDiv(divID+"2");
    showDiv(divID+"3");
    document.getElementById("select_"+divID).setAttribute("style", "background: #333399;");
    if (divID == "jgCanvas" || divID == "allGatesCanvas") {
      if (!friendlyGatesLoading) {
	friendlyGatesLoading = true;
	window.setTimeout(loadFriendlyGates, 0);
      }
    }
    if (divID == "enemyCanvas" || divID == "allGatesCanvas") {
      if (!enemyGatesLoading) {
	enemyGatesLoading = true;
	window.setTimeout(loadEnemyGates, 0);
      }
    }
    if (divID == "scoutedCanvas" && !lastScoutedTimesLoading) {
      lastScoutedTimesLoading = true;
      window.setTimeout(loadLastScoutedTimes, 0);
    }
  }

  function overlayMenuItem(canvasID, caption)
  {
    return '<th id="select_'+canvasID+'">' +
      '<a style="cursor:pointer;" onclick="selectMapOverlay(\''
      + canvasID + '\');"><font color="gold">' + caption + '</font></a></th>';
  }

  // Create canvases
  var jgCanvas = newCanvas("jgCanvas");
  var enemyCanvas = newCanvas("enemyCanvas");
  var allGatesCanvas = newCanvas("allGatesCanvas");
  var scoutedCanvas = newCanvas("scoutedCanvas");
  var scoutedCanvas2 = newCanvas("scoutedCanvas2");
  scoutedCanvas2.style.zIndex = "1";
  scoutedCanvas2.style.opacity = ".15";
  var scoutedCanvas3 = newCanvas("scoutedCanvas3");
  scoutedCanvas3.style.zIndex = "2";
  scoutedCanvas3.style.opacity = ".15";
  var br = canvas.previousSibling;
  if (br.nodeName != "BR") {
    br = null;
  }
  // Insert the map overlay menu
  var menu = newElement("div", { style: "position: relative; left: 50%" });
  var tmp = '<table style="position: relative; left: -300px; top: 2px;" ';
  tmp += 'class="header" width="606"><tr align="center">';
  tmp += overlayMenuItem("myCanvas", "Bare Map");
  tmp += overlayMenuItem("jgCanvas", "Friendly Gates");
  tmp += overlayMenuItem("enemyCanvas", "Enemy Gates");
  tmp += overlayMenuItem("allGatesCanvas", "All Gates");
  tmp += overlayMenuItem("scoutedCanvas", "Last Scouted");
  tmp += '</tr></table>';
  menu.innerHTML = tmp;
  document.body.appendChild(menu);
  // Move all the canvases to the end of the body and they'll overlap
  document.body.appendChild(canvas);
  document.body.appendChild(jgCanvas);
  document.body.appendChild(enemyCanvas);
  document.body.appendChild(allGatesCanvas);
  document.body.appendChild(scoutedCanvas);
  document.body.appendChild(scoutedCanvas2);
  document.body.appendChild(scoutedCanvas3);
  // Finally the <BR>
  if (br) document.body.appendChild(br);
  // Select the bare map overlay
  unsafeWindow.selectMapOverlay = selectMapOverlay;
  selectMapOverlay("myCanvas");
}

function removeAdvertising()
{
  var t = document.getElementById("advertising");
  if (t) {
    var br = t.nextSibling;
    t.parentNode.removeChild(t);
    if (br && br.tagName == "BR") {
      br.parentNode.removeChild(br);
    }
  }
  var ns = document.getElementsByTagName("iframe");
  for (var i = 0; i < ns.length; i++) {
    n = ns[i].parentNode.parentNode;
    if (n.tagName == "TR") {
      n.parentNode.removeChild(n);
    }
  }
  var x = xpath("//tr/th/script[contains(@src, '/ads/')]");
  for (var i = 0; i < x.length; i++) {
    var n = x[i].parentNode.parentNode;
    n.parentNode.removeChild(n);
  }
}

function getHomeGuildLink()
{
  var tag = getSetting("homeTag");
  var guild = getSetting("homeGuild");
  if (tag && guild) {
    return "<a style='color:"+getAlliedPlayerColor()
      +"' href='guild.aspx?guild="+guild+"'>"+tag+"</a>";
  }
  else {
    return "<b><font color='red'>Unknown</font></b>";
  }
}

function recordHomeGuild()
{
  var html = document.body.innerHTML;
  if (html.match(/<br><b>Tag:<\/b>\s*(\[.*?\])\s*<br><b>Guild #:<\/b>\s*(\d+)<br>/i)) {
    setSetting("homeTag", RegExp.$1);
    setSetting("homeGuild", RegExp.$2);
  }
}

function recordGuildMates()
{
  var t = document.getElementById("guild_members");
  if (!t) return;
  var players = [];
  var rows = t.rows[1].cells[0].firstChild.rows;
  for (var i = 1; i < rows.length; i++) {
    var html = rows[i].cells[2].innerHTML;
    if (html.match(/<a href=.profile\.aspx\?player=(\d+).>(.*?)<\/a>/)) {
      var player = RegExp.$1;
      var name = getSetting("homeTag", "") + " " + RegExp.$2;
      setPlayerName(player, name);
      players.push(player);
    }
  }
  setGuildMates(players);
}

function recordContacts()
{
  var t = document.getElementById("contacts-table");
  if (!t) return;
  var players = [];
  var blocked = [];
  var rows = t.rows[1].cells[0].firstChild.firstChild.rows;
  for (var i = 1; i < rows.length; i++) {
    var html = rows[i].cells[1].innerHTML;
    if (html.match(/<a href=.profile\.aspx\?player=(\d+).>(.*?)<\/a>/)) {
      var player = RegExp.$1;
      var name = RegExp.$2;
      setPlayerName(player, name);
      var t = rows[i].cells[6].textContent;
      if (t == "Block") {
	players.push(player);
      }
      else if (t == "Unblock") {
	blocked.push(player);
      }
    }
  }
  setContacts(players);
  setBlockedContacts(blocked);
}

function recordGuildTag(guild)
{
  var html = document.body.innerHTML;
  if (html.match(/<center class=.error.>Invalid guild<\/center>/i)) {
    setNeutralGuild(guild);
  }
  else if (html.match(/<br><b>Tag:<\/b>\s*(\[.*?\])\s*<br><b>Guild #:<\/b>\s*(\d+)<br>/i)) {
    if (RegExp.$2 == guild) {
      setSetting("tag"+guild, RegExp.$1);
    }
  }
}

var alliedPlayerColor = '#44ee44';
var friendlyPlayerColor = '#88aaff';
var neutralPlayerColor = "#ffffaa";
var hostilePlayerColor = '#ee99ff';
var enemyPlayerColor = '#ee5577';

function getAlliedPlayerColor() {
  return getSetting("alliedPlayerColor", alliedPlayerColor);
}

function getFriendlyPlayerColor() {
  return getSetting("friendlyPlayerColor", friendlyPlayerColor);
}

function getNeutralPlayerColor() {
  return getSetting("neutralPlayerColor", neutralPlayerColor);
}

function getHostilePlayerColor() {
  return getSetting("hostilePlayerColor", hostilePlayerColor);
}

function getEnemyPlayerColor() {
  return getSetting("enemyPlayerColor", enemyPlayerColor);
}

function getPlayerColor(stance) {
  switch (stance.toLowerCase()) {
  case "allied":
    return getAlliedPlayerColor();
  case "friendly":
    return getFriendlyPlayerColor();
  case "hostile":
    return getHostilePlayerColor();
  case "enemy":
    return getEnemyPlayerColor();
  }
  return getNeutralPlayerColor();
}

function setPlayerColor(stance, color) {
  setSetting(stance.toLowerCase()+"PlayerColor", color);
}

function revertToDefaultPlayerColor(stance) {
  switch (stance.toLowerCase()) {
  case "allied":
    return setPlayerColor(stance, alliedPlayerColor);
  case "friendly":
    return setPlayerColor(stance, friendlyPlayerColor);
  case "hostile":
    return setPlayerColor(stance, hostilePlayerColor);
  case "enemy":
    return setPlayerColor(stance, enemyPlayerColor);
  case "neutral":
    return setPlayerColor(stance, neutralPlayerColor);
  }
}

function stanceChanged(guild)
{
  function f() {
    var elem = document.getElementById('stance'+guild);
    if (elem) {
      elem.style.color = getPlayerColor(elem.value);
      switch (elem.value) {
      case "friendly":
	setFriendlyGuild(guild);
	break;
      case "neutral":
	setNeutralGuild(guild);
	break;
      case "hostile":
	setHostileGuild(guild);
	break;
      case "enemy":
	setEnemyGuild(guild);
	break;
      }
    }
  }
  window.setTimeout(f, 0);
}

function stanceSelector(guild)
{
  var friendly = isFriendlyGuild(guild);
  var hostile = isHostileGuild(guild);
  var enemy = isEnemyGuild(guild);
  var neutral = !(friendly || hostile || enemy);
  var selectedColor = getNeutralPlayerColor();
  if (friendly) selectedColor = getFriendlyPlayerColor();
  else if (hostile) selectedColor = getHostilePlayerColor();
  else if (enemy) selectedColor = getEnemyPlayerColor();

  function option(value, caption, selected)
  {
    var html = "<option value='"+value+"'";
    html += " style='color:"+getPlayerColor(value)+";background:#030303;'";
    if (selected) html += " selected";
    return html+">&nbsp;"+caption+"&nbsp;</option>";
  }

  var html = "<select name='stance' id='stance"+guild+"'";
  html += "onchange='stanceChanged("+guild+")'";
  html += "style='color:" + selectedColor + ";background:#030303;'>";
  html += option("friendly", "Friendly", friendly);
  html += option("neutral", "Neutral", neutral);
  html += option("hostile", "Hostile", hostile);
  html += option("enemy", "Enemy", enemy);
  return html + "</select>";
}

function insertGuildStance(guild)
{
  if (guild == getSetting("homeGuild"))
    return;
  var t = document.getElementById("profile_show");
  if (!t) return;
  var cell = t.rows[0].cells[0].firstChild.rows[1].cells[0];
  if (!cell) return;
  unsafeWindow.stanceChanged = stanceChanged;

  var html = "<b>Diplomatic Stance:</b> " + stanceSelector(guild);
  html += "<br/><span class='gray'>Gates from Friendly, Hostile and Enemy";
  html += "<br/>guilds appear on the map overlays.</span>";
  cell.innerHTML += html;
}

function insertStancesInRanks()
{
  var t = document.getElementById("ranks_table-guilds");
  if (!t) return;
  unsafeWindow.stanceChanged = stanceChanged;

  var rows = t.rows[1].cells[0].firstChild.rows;
  var td = document.createElement("th");
  td.innerHTML = "Stance";
  insertCell(td, rows[0].cells[2]);
  for (var i = 1; i < rows.length; i++) {
    var tmp = rows[i].cells[1].innerHTML;
    if (tmp.match(/<a href=.guild\.aspx\?guild=(\d+).>(.*?)<\/a>/)) {
      // Record guild tag
      var guild = RegExp.$1;
      setSetting("tag"+guild, RegExp.$2);
      // Insert stance selector
      td = document.createElement("td");
      if (guild == getSetting("homeGuild")) {
	td.innerHTML = "&nbsp;";
      }
      else {
	td.innerHTML = stanceSelector(guild);
      }
      insertCell(td, rows[i].cells[2]);
    }
  }
}

function getMyPlayerID()
{
  var elem = document.getElementById("account");
  if (elem) {
    var s = elem.nextSibling.textContent+"";
    if (s.match(/^[A-Z]\.(\d+)$/))
      return Number(RegExp.$1);
  }
  return 0;
}

function insertAddressListLink(player)
{
  var html = document.body.innerHTML;
  if (html.match(/<center class=.error.>Invalid Player<\/center>/i)) {
    removeFromAddressList(player);
    return;
  }
  if (player == getMyPlayerID())
    return;
  var t = document.getElementById("profile_show");
  if (!t) return;
  var rows = t.rows[0].cells[0].firstChild.rows;
  if (!rows) return;
  var nameCell = rows[0].cells[1];
  if (!nameCell) return;
  var cell = rows[1].cells[0];
  if (!cell) return;
  player = Number(player);
  var addText = "Add this player to your address list.";
  var removeText = "Remove this player from your address list.";
  var html = "";
  if (arrayContains(getBlockedContacts(), player)) {
    html += "This player has been <a href='contacts.aspx'>blocked</a> ";
    html += "and<br/>will not be included in your address list.";
  }
  else if (getFlag("alwaysIncludeContacts") &&
	   arrayContains(getContacts(), player)) {
    html += "This player is one of your ";
    html += "<a href='contacts.aspx'>contacts</a> ";
    html += "and<br/>therefore included in your address list.";
  }
  else if (getFlag("alwaysIncludeGuildMates") && 
	   arrayContains(getGuildMates(), player)) {
    html += "This player is in your ";
    html += "<a href='guild.aspx'>guild</a> ";
    html += "and<br/>therefore included in your address list.";
  }
  else {
    html += "<a id='addressListLink' style='color:gold;cursor:pointer;'>";
    if (arrayContains(getAddressList(), player)) {
      html += removeText+"</a>";
    }
    else {
      html += addText+"</a>";
    }
  }
  html += "<br/><small><span class='gray'>When sending PMs, players in your ";
  html += "address list<br/>may be selected as additional recipients.</span></small>";
  cell.innerHTML += html;

  function listener(e) {
    var html = e.target.innerHTML;
    if (html == addText) {
      setPlayerName(player, nameCell.textContent);
      addToAddressList(player);
      e.target.innerHTML = removeText;
    }
    else if (html == removeText) {
      removeFromAddressList(player);
      e.target.innerHTML = addText;
    }
  }
  var link = document.getElementById("addressListLink");
  if (link) {
    link.addEventListener("click", listener, false);
  }    
}

function bbPlayerLink(p)
{
  return "[url='profile.aspx?player="+p+"']"+getPlayerName(p)+"[/url]";
}

function enhanceNewMessage(to, reply)
{
  var body = document.getElementById("body");
  if (!body) return;
  var t = document.getElementById("messages_new-message");
  if (!t) return;
  var form = t.rows[1].cells[0].firstChild;
  var rows = form.firstChild.rows;
  // Find the row containing the To: text
  var row = rows[reply?1:0];
  if (row.cells[0].firstChild.nodeName == "TABLE") {
    row = row.nextSibling;
  }
  var m = row.cells[0].textContent.match(/^To: (.*?)$/);
  if (!m) return;
  var toName = m[1];
  to = Number(to);
  setPlayerName(to, toName);
  addToAddressList(to);
  // Find the preview and submit buttons
  var preview = rows[rows.length-1].cells[0].firstChild;
  var submit = preview.nextSibling.nextSibling;
  if (preview.nodeName != "INPUT" || submit.nodeName != "INPUT")
    return;

  var recipients = [to];
  var ccs = [];
  var bccs = [];
  var sendInProgress = false;

  function disable(id)
  {
    var elem = document.getElementById(id);
    if (elem) {
      elem.disabled = true;
    }
  }

  function enable(id)
  {
    var elem = document.getElementById(id);
    if (elem) {
      elem.disabled = false;
    }
  }

  function parsePlayerList(s)
  {
    var p = [];
    var rex = /\[url=.profile\.aspx\?player=\d+.\].+?\[\/url\]/g;
    var m = s.match(rex);
    if (!m) return p;
    for (var i = 0; i < m.length; i++) {
      var x = m[i].match(/profile\.aspx\?player=(\d+).\]/);
      if (x) {
	p[p.length] = Number(x[1]);
      }
    }
    return p;
  }

  function parseHeader()
  {
    var lines = body.value.split("\n");
    if (!lines) return;
    var parsed = 0;
    if (lines.length > parsed && startsWith(lines[parsed], "[i]To:")) {
      recipients = parsePlayerList(lines[parsed++]);
    }
    if (lines.length > parsed && startsWith(lines[parsed], "[i]CC:")) {
      ccs = parsePlayerList(lines[parsed++]);
    }
    if (lines.length > parsed && startsWith(lines[parsed], "[i]BCC:")) {
      bccs = parsePlayerList(lines[parsed++]);
    }
    var players = recipients.concat(ccs, bccs);
    for (var i = 0; i < players.length; i++) {
      disable('recipient'+players[i]);
      disable('cc'+players[i]);
      disable('bcc'+players[i]);
    }
  }

  function updateHeader(withBCCs)
  {
    var lines = body.value.split("\n");
    if (!lines) lines = [];
    if (lines && startsWith(lines[0], "[i]To:")) {
      lines.shift();
    }
    if (lines && startsWith(lines[0], "[i]CC:")) {
      lines.shift();
    }
    if (lines && startsWith(lines[0], "[i]BCC:")) {
      lines.shift();
    }
    if (lines && lines[0] == "") {
      lines.shift();
    }
    if ((withBCCs && bccs.length > 0) || ccs.length > 0 ||
	recipients.length > 1) {
      lines.unshift("");
      if (withBCCs && bccs.length > 0) {
	var line = "[i]BCC: " + bccs.map(bbPlayerLink).join(", ") + "[/i]";
	lines.unshift(line);
      }
      if (ccs.length > 0) {
	var line = "[i]CC: " + ccs.map(bbPlayerLink).join(", ") + "[/i]";
	lines.unshift(line);
      }
      var line = "[i]To: " + recipients.map(bbPlayerLink).join(", ") + "[/i]";
      lines.unshift(line);
    }
    body.value = lines.join("\n");
    body.focus();
  }

  function playerLink(player, mayRemove)
  {
    var html = getPlayerLink(player);
    if (mayRemove) {
      html += "&nbsp<a onclick='removeRecipient("+player+")'";
      html += " style='color:white;cursor:pointer'>(-)</a> ";
    }
    else {
      html += " ";
    }
    return html;
  }

  function updatePlayerList(id, players, mayBeEmpty)
  {
    var elem = document.getElementById(id);
    if (elem) {
      if (players.length == 0) {
	elem.innerHTML = "&nbsp;";
      }
      else {
	var mayRemove = mayBeEmpty || (players.length > 1);
	players = players.map(function (p) {return playerLink(p, mayRemove);})
	elem.innerHTML = players.join(", ");
      }
    }
  }

  function updateRecipients()
  {
    updatePlayerList('recipients', recipients, false);
  }

  function updateCCs()
  {
    updatePlayerList('ccs', ccs, true);
  }

  function updateBCCs()
  {
    updatePlayerList('bccs', bccs, true);
  }

  function updateAll()
  {
    window.setTimeout(updateRecipients, 0);
    window.setTimeout(updateCCs, 0);
    window.setTimeout(updateBCCs, 0);
    window.setTimeout(function () { updateHeader(false); }, 0);
  }

  function addRecipient(player)
  {
    if (sendInProgress)
      return;
    if (!arrayContains(recipients, player)) {
      recipients[recipients.length] = player;
      arrayRemove(ccs, player);
      arrayRemove(bccs, player);
      disable('recipient'+player);
      disable('cc'+player);
      disable('bcc'+player);
      updateAll();
    }
    document.getElementById('addRecipient').value = '';
  }

  function addCC(player)
  {
    if (sendInProgress)
      return;
    if (!arrayContains(ccs, player)) {
      ccs[ccs.length] = player;
      arrayRemove(recipients, player);
      arrayRemove(bccs, player);
      disable('recipient'+player);
      disable('cc'+player);
      disable('bcc'+player);
      updateAll();
    }
    document.getElementById('addCC').value = '';
  }

  function addBCC(player)
  {
    if (sendInProgress)
      return;
    if (!arrayContains(bccs, player)) {
      bccs[bccs.length] = player;
      arrayRemove(recipients, player);
      arrayRemove(ccs, player);
      disable('recipient'+player);
      disable('cc'+player);
      disable('bcc'+player);
      updateAll();
    }
    document.getElementById('addBCC').value = '';
  }

  function removeRecipient(player)
  {
    if (sendInProgress)
      return;
    arrayRemove(recipients, player);
    arrayRemove(ccs, player);
    arrayRemove(bccs, player);
    enable('recipient'+player);
    enable('cc'+player);
    enable('bcc'+player);
    updateAll();
  }

  function sendMessage(toPlayer, message, inFrame)
  {
    var div = document.createElement("div");
    div.style.display = "none";
    var html = "";
    if (inFrame) {
      html += "<iframe name='sendFrame"+toPlayer;
      html += "' id='sendFrame"+toPlayer+"'></iframe>";
    }
    html += "<form id='sendForm"+toPlayer+"' method='POST'";
    if (inFrame) {
      html += " target='sendFrame"+toPlayer+"'";
    }
    html += " action='messages.aspx?msg="+toPlayer+"&reply=0'>";
    html += "<input type='hidden' name='submit' value='Send'/>";
    html += "<textarea name='body'>";
    var txt = message;
    txt = txt.replace(/</g, "&lt;");
    txt = txt.replace(/>/g, "&gt;");
    html += txt + "</textarea></form>";
    div.innerHTML = html;
    document.body.appendChild(div);
    document.getElementById("sendForm"+toPlayer).submit();
  }

  function sendMessages()
  {
    if (sendInProgress)
      return;
    if (recipients.length == 0) {
      alert("No recipients selected!");
    }
    else {
      sendInProgress = true;
      var message = body.value;
      body.disabled = true;
      body.readonly = true;
      document.getElementById("addRecipient").disabled = true;
      document.getElementById("addCC").disabled = true;
      document.getElementById("addBCC").disabled = true;
      document.getElementById("newSendButton").disabled = true;
      document.getElementById("newPreviewButton").disabled = true;
      var p = recipients.concat(ccs, bccs);
      var i = 0;

      if (p.length > 1) {
	// Display a progress message
	var div = document.createElement("div");
	div.style.position = "fixed";
	div.style.top = 250;
	div.style.left = 0;
	div.style.width = "100%";
	var html = "<center><table width='96%' ";
	html += "style='border-width:5;border-color:gray;";
	html += "background:black;color:red;padding:5'>";
	html += "<tr><th align='center'><b><font size='6'>";
	html += "Sending messages... <span id='numRemaining'></span> ";
	html += "remaining</font></b></th></tr></table></center>";
	div.innerHTML = html;
	document.body.appendChild(div);
      }

      function send()
      {
	if (i == p.length-1) {
	  // Send the last message and leave this page through the form submit
	  sendMessage(p[i], message, false);
	}
	else {
	  // Send a message in a separate frame, then wait a bit
	  document.getElementById("numRemaining").innerHTML = p.length-i;
	  sendMessage(p[i], message, true);
	  i++;
	  document.getElementById("numRemaining").innerHTML = p.length-i;
	  var delay = 3000 + Math.floor(Math.random()*2000);
	  window.setTimeout(send, delay);
	}
      }
      window.setTimeout(send, 0);
    }
  }

  function previewMessage()
  {
    if (sendInProgress)
      return;
    if (recipients.length == 0) {
      alert("No recipients selected!");
    }
    else {
      sendInProgress = true;

      function f() {
	updateHeader(true);
	submitMessagePreview(recipients, ccs, bccs, body.value, false);
      }
      window.setTimeout(f, 0);
    }
  }

  unsafeWindow.addRecipient = addRecipient;
  unsafeWindow.addCC = addCC;
  unsafeWindow.addBCC = addBCC;
  unsafeWindow.removeRecipient = removeRecipient;
  unsafeWindow.sendMessages = sendMessages;
  unsafeWindow.previewMessage = previewMessage;

  // Resize the body textarea to use the full width but make it less tall
  var x =  body.parentNode.offsetWidth - body.offsetWidth;
  body.cols += Math.floor(x/8);
  body.rows = 26;

  // Replace the To: row with a menu to select multiple recipients
  var players = getAddressList();
  players = players.map(function (x) { return [x, getPlayerName(x)]; });
  players.sort(function (x, y) { return (x[1].toLowerCase() > y[1].toLowerCase()); });
  var html = "<td>&nbsp;</td><td>";
  html += "<table class='no_back' width='"+body.offsetWidth+"'>";
  html += "<tr><th align='right' width='30' valign='top'>To:&nbsp;</th>";
  html += "<td id='recipients'></td>";
  html += "<td align='right' valign='top'><select id='addRecipient'>";
  html += "<option value=''>Add recipient...</option>";
  for (var i = 0; i < players.length; i++) {
    html += "<option id='recipient"+players[i][0]+"' value='"+players[i][0];
    html += "' onClick='addRecipient("+players[i][0]+")'>";
    html += players[i][1]+"</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><th align='right' valign='top'>CC:&nbsp;</th>";
  html += "<td id='ccs'>&nbsp;</td>";
  html += "<td align='right' valign='top'><select id='addCC'>";
  html += "<option value=''>Add CC...</option>";
  for (var i = 0; i < players.length; i++) {
    html += "<option id='cc"+players[i][0]+"' value='"+players[i][0];
    html += "' onClick='addCC("+players[i][0]+")'>";
    html += players[i][1]+"</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><th align='right' valign='top'>BCC:&nbsp;</th>";
  html += "<td id='bccs'>&nbsp;</td>";
  html += "<td align='right' valign='top'><select id='addBCC'>";
  html += "<option value=''>Add BCC...</option>";
  for (var i = 0; i < players.length; i++) {
    html += "<option id='bcc"+players[i][0]+"' value='"+players[i][0];
    html += "' onClick='addBCC("+players[i][0]+")'>";
    html += players[i][1]+"</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><td colspan='3' align='right' class='gray'>";
  html += "Missing someone from the drop-down lists?  Visit his profile and ";
  html += "add him to your address list.</td></tr>";
  html += "</table></td>";
  row.innerHTML = html;
  parseHeader();
  updateAll();

  // Hide the real preview and submit buttons and add new ones
  // triggering our own preview/submit code
  var parent = preview.parentNode;
  preview.style.display = "none";
  submit.style.display = "none";
  html = "<input class='input-button' type='button' ";
  html += "onclick='previewMessage()' value='Preview' id='newPreviewButton'/>";
  html = html + parent.innerHTML;
  html += "<input class='input-button' type='button' onclick='sendMessages()'";
  html += " value='Send' id='newSendButton'/>";
  parent.innerHTML = html;
}

function submitMessagePreview(recipients, ccs, bccs, txt, addHeader)
{
  if (recipients.length < 1)
    return;
  var toPlayer = recipients[0];
  var div = document.createElement("div");
  div.style.display = "none";
  var html = "<form id='sendForm"+toPlayer+"' method='POST'";
  html += " action='messages.aspx?msg="+toPlayer+"&reply=0'>";
  html += "<input type='hidden' name='submit' value='Preview'/>";
  html += "<textarea name='body'>";
  if (addHeader) {
    html += "[i]To: " + recipients.map(bbPlayerLink).join(", ") + "[/i]\n";
    if (ccs.length > 0)
      html += "[i]CC: " + ccs.map(bbPlayerLink).join(", ") + "[/i]\n";
    if (bccs.length > 0)
      html += "[i]BCC: " + bccs.map(bbPlayerLink).join(", ") + "[/i]\n";
    html += "\n";
  }
  if (txt) {
    txt = txt.replace(/</g, "&lt;");
    txt = txt.replace(/>/g, "&gt;");
    html += txt;
  }
  html += "</textarea></form>";
  div.innerHTML = html;
  document.body.appendChild(div);
  document.getElementById("sendForm"+toPlayer).submit();
}

function massMessage(players, txt)
{
  function f() {
    submitMessagePreview(players, [], [], txt, true);
  }
  window.setTimeout(f, 0);
}

function parseMMLinks(elem)
{
  if (elem && getFlag("parseMMLinks") && getFlag("enhancePrivateMessages")) {
    var rex = /mmlink\((\d{1,10}(,\d{1,10}){0,99})\)\((.*?)\)/gi;
    var s = "<a style='color:gold;cursor:pointer' ";
    s += "onClick='massMessage([$1])'>$3</a>";
    var html = elem.innerHTML;
    var newHTML = html.replace(rex, s);
    if (html != newHTML)
      elem.innerHTML = newHTML;
    unsafeWindow.massMessage = massMessage;
  }
}

function insertLocationMassMessageLink(location)
{
  var t = document.getElementById("base_fleets");
  if (!t)
    t = document.getElementById("map_fleets");
  if (!t)
    return;
  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows)
    return;
  var homeTag = getSetting("homeTag");
  if (!homeTag)
    return;
  unsafeWindow.massMessage = massMessage;

  var players = [];
  for (var i = 1; i < rows.length; i++) {
    var html = rows[i].cells[1].innerHTML;
    if (html.match(/<a .*?href=.profile\.aspx\?player=(\d+)..*?>(.*?)<\/a>/i)) {
      var player = RegExp.$1;
      var name = RegExp.$2;
      if (getGuildTag(name) == homeTag) {
	arrayInsertSorted(players, Number(player));
      }
    }
  }
  if (players.length > 1) {
    var link = document.getElementById('link_show_fleets_summary');
    if (!link) return;
    var message = "To everybody with fleets at " + location + ".";
    html = "<a style='color:gold;cursor:pointer' ";
    html += "onClick='massMessage([" + players.join(",") + "],";
    html += "\""+message+"\")'>";
    html += "Message all "+homeTag+" players here</a>";
    html += " &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ";
    link.parentNode.parentNode.setAttribute("style", "padding-top:3px;");
    link.parentNode.innerHTML = 
      html + link.parentNode.innerHTML + " &nbsp; &nbsp;";
  }
}

function addProductionTooltips()
{
  var x = xpath("//table[@id='base_production']//tr[starts-with(@id, 'row')]");
  if (x.length == 0) return;

  var realProd = Number(document.getElementById('base_prod').title);
  for (var i = 0; i < x.length; i++) {
    // Add title attribute to production input boxes
    var unit = x[i].cells[1].firstChild.textContent;
    var cost = unitStats[unit].cost;
    if (cost <= realProd) {
      var tip = plural(2,unit) + ": " 
	+ Math.round(realProd/cost*100)/100 + "/hour";
    }
    else if (cost <= realProd*24) {
      var tip = plural(2,unit) + ": "
	+ Math.round(realProd/cost*24*100)/100 + "/day";
    }
    else {
      var tip = unit + ": " + Math.round(cost/realProd/24*100)/100 + " days";
    }
    x[i].cells[4].setAttribute("title", tip);
    x[i].cells[5].setAttribute("title", tip);
  }
}

function childForm(elem)
{
  if (!elem)
    return null;
  var e = elem.firstChild;
  while (e) {
    if (e.nodeName == "FORM")
      return e;
    e = e.nextSibling;
  }
  return elem;
}

function childTable(elem)
{
  if (!elem)
    return null;
  var e = elem.firstChild;
  while (e) {
    if (e.nodeName == "TABLE")
      return e;
    e = e.nextSibling;
  }
  return elem;
}

function parentRow(elem)
{
  while (elem && elem.nodeName != "TR") {
    elem = elem.parentNode;
  }
  return elem;
}

function hideDescriptions()
{
  var t = false;
  if (!t && getFlag("hideUnitDescriptions")) {
    t = document.getElementById("base_production");
  }
  if (!t && getFlag("hideTurretDescriptions")) {
    t = document.getElementById("base_defenses");
  }
  if (!t && getFlag("hideStructureDescriptions")) {
    t = document.getElementById("base_structures");
  }
  if (!t && getFlag("hideTechDescriptions")) {
    t = document.getElementById("base_reseach"); // AE typo: reseach
  }
  if (!t) return;
  t = childForm(t.rows[1].cells[0]);
  if (t.nodeName == "FORM") t = t.firstChild;
  t = childTable(t);
  if (t.nodeName != "TABLE") return;

  function listener(e)
  {
    var row = parentRow(e.target);
    if (row) {
      row = row.nextSibling;
      if (row.style.display == "none") {
	row.style.display = "";
	row.setAttribute("rowType", "");
      }
      else {
	row.style.display = "none";
	row.setAttribute("rowType", "notDisplayed");
      }
    }
  }

  for (var i = 1; i < t.rows.length; i++) {
    if (t.rows[i].cells.length == 2 &&
	t.rows[i].cells[1].getAttribute("class") == "help comment") {
      t.rows[i-1].addEventListener("click", listener, false);
      t.rows[i].style.display = "none";
      t.rows[i].setAttribute("rowType", "notDisplayed");
      t.rows[i].setAttribute("class", t.rows[i].getAttribute("class") + " nohighlight");
    }      
  }
}

function getTechLevel(techString, tech)
{
  var rex = new RegExp(" "+tech+"(\\d+) ");
  if ((" "+techString+" ").match(rex)) {
    return Number(RegExp.$1);
  }
  else {
    GM_log("Could not find tech "+tech+" in "+techString);
    return 0;
  }
}

var techName = {};
techName['A'] = "Armor";
techName['L'] = "Laser";
techName['M'] = "Missiles";
techName['PL'] = "Plasma";
techName['SH'] = "Shielding";
techName['I'] = "Ion";
techName['PH'] = "Photon";
techName['D'] = "Disruptor";

function UnitStats(unit, shortName, cost, drive, weapon, power,
		   armor, shielding, hangars, speed, ion, bonus, noJG)
{
  this.name = unit;
  this.unit = unit;
  this.cost = cost;
  this.drive = drive;
  this.weapon = weapon;
  this.power = power;
  this.armor = armor;
  this.shielding = shielding;
  this.hangars = hangars;
  this.speed = speed;
  this.crossShield = ion || 0.01;
  this.bonus = bonus || 0;
  this.noJG = noJG? true : false;

  this.adjustedSpeed = function(techs, jg, logistics) {
    if (this.drive == "Warp") {
      var t = "WD";
    }
    else if (this.drive == "Stellar") {
      var t = "SD";
    }
    else {
      return 0;
    }
    var m = (" "+techs+" ").match(new RegExp(" "+t+"(\\d+) "));
    if (!m)
      return 0;
    var s = this.speed * (1 + 0.05*Number(m[1])) / (1 - 0.01*logistics);
    if (!this.noJG)
      s *= (jg+1);
    return s;
  }

  this.adjustedStats = function(techs, bonus, ccs, tactical) {
    var weaponTech = getTechLevel(techs, this.weapon);
    var armorTech = getTechLevel(techs, "A");
    var shieldingTech = getTechLevel(techs, "SH");
    bonus = Math.max(bonus || 0, this.bonus);

    var power = this.power * (1 + weaponTech*0.05) * (1 + bonus);
    power *= 1 + (ccs || 0)*0.05 + (tactical || 0)*0.01;
    var armor = this.armor * (1 + armorTech*0.05) * (1 + bonus);
    var shielding = this.shielding * (1 + shieldingTech*0.05);
    power = Math.round(power*100)/100;
    armor = Math.round(armor*100)/100;
    shielding = Math.round(shielding*100)/100;
    return new AdjustedUnitStats(this.unit, this.weapon,
				 power, armor, shielding,
				 this.crossShield, this.bonus,
				 this.cost, this.hangars,
				 weaponTech, armorTech, shieldingTech);
  }
}

function TurretStats(turret, weapon, power, armor, shielding)
{
  this.name = turret;
  this.turret = turret;
  this.weapon = weapon;
  this.power = power;
  this.armor = armor;
  this.shielding = shielding;

  this.adjustedStats = function(techs, defense) {
    var weaponTech = getTechLevel(techs, this.weapon);
    var armorTech = getTechLevel(techs, "A");
    var shieldingTech = getTechLevel(techs, "SH");

    defense = defense || 0;
    var power = this.power * (1 + weaponTech*0.05) * (1 + defense*0.01);
    var armor = this.armor * (1 + armorTech*0.05) * (1 + defense*0.01);
    var shielding = this.shielding * (1 + shieldingTech*0.05);
    power = Math.round(power*100)/100;
    armor = Math.round(armor*100)/100;
    shielding = Math.round(shielding*100)/100;
    return new AdjustedTurretStats(this.turret, weapon, power, armor, shielding);
  }
}

function AdjustedStats(name, weapon, power, armor, shielding, crossShield)
{
  this.name = name;
  this.weapon = weapon;
  this.power = power;
  this.armor = armor;
  this.shielding = shielding;
  this.crossShield = crossShield || 0.01;

  this.singleAttackDamage = function(d) {
    if (this.power > d.shielding) {
      // Cross-shield and regular damage
      return this.power - d.shielding * (1-this.crossShield);
    }
    // Cross-shield damage only
    return this.power * this.crossShield;
  }

  this.targetWeight = function(d) {
    return Math.pow(this.singleAttackDamage(d), 0.85);
  }
}

function AdjustedUnitStats(unit, weapon, power, armor, shielding,
			   crossShield, bonus, cost, hangars,
			   weaponTech, armorTech, shieldingTech)
{
  this.inheritFrom = AdjustedStats;
  this.inheritFrom(unit, weapon, power, armor, shielding, crossShield);
  this.unit = unit;
  this.bonus = bonus;
  this.cost = cost;
  this.hangars = hangars;
  this.weaponTech = weaponTech;
  this.armorTech = armorTech;
  this.shieldingTech = shieldingTech;
}

function AdjustedTurretStats(turret, weapon, power, armor, shielding)
{
  this.inheritFrom = AdjustedStats;
  this.inheritFrom(turret, weapon, power, armor, shielding, 0);
  this.turret = turret;
}

unitStats = {
  'Fighters':      new UnitStats("Fighters", "FT", 5, "Inter",
				 "L", 2, 2, 0, -1, 0),
  'Bombers':       new UnitStats("Bombers", "BO", 10, "Inter",
				 "M", 4, 2, 0, -1, 0),
  'Heavy Bombers': new UnitStats("Heavy Bombers", "HB", 30, "Inter",
				 "PL", 10, 4, 0, -2, 0),
  'Ion Bombers':   new UnitStats("Ion Bombers", "IB", 60, "Inter",
				 "I", 12, 4, 1, -2, 0, 0.5),
  'Corvette':      new UnitStats("Corvette", "CV", 20, "Stellar",
				 "L", 4, 4, 0, 0, 8),
  'Recycler':      new UnitStats("Recycler", "RC", 30, "Stellar",
				 "L", 2, 2, 0, 0, 5),
  'Destroyer':     new UnitStats("Destroyer", "DE", 40, "Stellar",
				 "PL", 8, 8, 0, 0, 5),
  'Frigate':       new UnitStats("Frigate", "FR", 80, "Stellar",
				 "M", 12, 12, 0, 4, 5),
  'Ion Frigate':   new UnitStats("Ion Frigate", "IF", 120, "Stellar",
				 "I", 14, 12, 1, 4, 5, 0.5),
  'Scout Ship':    new UnitStats("Scout Ship", "SS", 40, "Warp",
				 "L", 1, 2, 0, 0, 12),
  'Outpost Ship':  new UnitStats("Outpost Ship", "OS", 100, "Warp",
				 "L", 2, 4, 0, 0, 3),
  'Cruiser':       new UnitStats("Cruiser", "CR", 200, "Warp",
				 "PL", 24, 24, 2, 4, 4),
  'Carrier':       new UnitStats("Carrier", "CA", 400, "Warp",
				 "M", 12, 24, 2, 60, 4),
  'Heavy Cruiser': new UnitStats("Heavy Cruiser", "HC", 500, "Warp",
				 "PL", 48, 48, 4, 8, 3),
  'Battleship':    new UnitStats("Battleship", "BB", 2000, "Warp",
				 "I", 168, 128, 10, 40, 3),
  'Fleet Carrier': new UnitStats("Fleet Carrier", "FC", 2500, "Warp",
				 "I", 64, 96, 8, 400, 3),
  'Dreadnought':   new UnitStats("Dreadnought", "DN", 10000, "Warp",
				 "PH", 756, 512, 20, 200, 2),
  'Titan':         new UnitStats("Titan", "TN", 50000, "Warp",
				 "D", 3402, 2048, 30, 1000, 1),
  'Leviathan':     new UnitStats("Leviathan", "LE", 200000, "Warp",
				 "PH", 10000, 6600, 40, 4000, 1, 0, 0.05),
  'Death Star':    new UnitStats("Death Star", "DS", 500000, "Warp", "D",
				 25500, 13500, 60, 10000, 1, 0, 0.1, true),
  'Goods':         new UnitStats("Goods", "Goods", 20, "",
				 "", 0, 0, 0, 0, 0)
};

var turretStats = {
  'Barracks':          new TurretStats("Barracks", "L", 4, 4, 0),
  'Laser Turrets':     new TurretStats("Laser Turrets", "L", 8, 8, 0),
  'Missile Turrets':   new TurretStats("Missile Turrets", "M", 16, 16, 0),
  'Plasma Turrets':    new TurretStats("Plasma Turrets",  "PL", 24, 24, 0),
  'Ion Turrets':       new TurretStats("Ion Turrets", "I", 32, 32, 2),
  'Photon Turrets':    new TurretStats("Photon Turrets", "PH", 64, 64, 6),
  'Disruptor Turrets': new TurretStats("Disruptor Turrets", "D", 256, 256, 8),
  'Deflection Shields':new TurretStats("Deflection Shields", "I", 2, 512, 16),
  'Planetary Shield':  new TurretStats("Planetary Shield", "I", 4, 2048, 20),
  'Planetary Ring':    new TurretStats("Planetary Ring", "PH", 2048, 1024, 12)
};

function copyProperties()
{
  var propertyNames = [];
  for (var i = 0; i < arguments.length; i++)
    propertyNames.push(arguments[i]);

  return function(object) {
    var copy = {};
    for (var i = 0; i < propertyNames.length; i++) {
      copy[propertyNames[i]] = object[propertyNames[i]];
    }
    return copy;
  }
}

function set()
{
  var p = {};
  for (var i = 0; i < arguments.length; i++)
    p[arguments[i]] = true;
  return p;
}

function combat(_attackers, _defenders)
{
  // Make two copies of both attackers and defenders
  var copy = copyProperties("unit", "turret", "count", "stats");
  var _attackers = _attackers.map(copy);
  var _defenders = _defenders.map(copy);
  var attackers = _attackers.map(copy);
  var defenders = _defenders.map(copy);
  var everybody = attackers.concat(defenders);

  // Initialize the number of remaining attacks for each unit
  for (var i = 0; i < everybody.length; i++) {
    everybody[i].attacks = everybody[i].count;
  }
  // Tag attackers and defenders with names for logging purposes
  for (var a = 0; a < attackers.length; a++) {
    attackers[a].name = "Attacking "+plural(2, attackers[a].stats.name);
  }
  for (var d = 0; d < defenders.length; d++) {
    defenders[d].name = "Defending "+plural(2, defenders[d].stats.name);
  }

  function hasRemainingAttacks(fleet) {
    for (var i = 0; i < fleet.length; i++) {
      if (fleet[i].attacks > 0)
	return true;
    }
    return false;
  }

  var logEntries = [];
  function log(txt) {
    logEntries.push(txt);
  }

  while ((hasRemainingAttacks(attackers) && fleetIsAlive(defenders)) ||
	 (hasRemainingAttacks(defenders) && fleetIsAlive(attackers))) {
    // Initialize per-unit variables
    for (var i = 0; i < everybody.length; i++) {
      everybody[i].totalTargetWeight = 0;
      everybody[i].damageTaken = 0;
      everybody[i].attackedBy = [];
    }

    // Sum up the target weights from each unit with remaining attacks
    for (var a = 0; a < attackers.length; a++) {
      var as = attackers[a].stats;
      for (var d = 0; d < defenders.length; d++) {
	var ds = defenders[d].stats;
	if (attackers[a].attacks > 0 && defenders[d].count > 0) {
	  attackers[a].totalTargetWeight += as.targetWeight(ds);
	}
	if (defenders[d].attacks > 0 && attackers[a].count > 0) {
	  defenders[d].totalTargetWeight += ds.targetWeight(as);
	}
      }
    }

    // Calculate attack shares (who will target who) and damage dealt
    for (var a = 0; a < attackers.length; a++) {
      var as = attackers[a].stats;
      for (var d = 0; d < defenders.length; d++) {
	var ds = defenders[d].stats;
	if (attackers[a].attacks > 0 && defenders[d].count > 0) {
	  var share = as.targetWeight(ds) / attackers[a].totalTargetWeight;
	  var attacks = attackers[a].attacks * share;
	  defenders[d].damageTaken += attacks * as.singleAttackDamage(ds);
	  defenders[d].attackedBy.push([attackers[a], attacks]);
	  log(attackers[a].name + " make "
	      + commaFormat(decimalFormat(attacks,3))
	      + " attacks on " + defenders[d].name);
	}
      }
    }
    for (var d = 0; d < defenders.length; d++) {
      var ds = defenders[d].stats;
      for (var a = 0; a < attackers.length; a++) {
	var as = attackers[a].stats;
	if (defenders[d].attacks > 0 && attackers[a].count > 0) {
	  var share = ds.targetWeight(as) / defenders[d].totalTargetWeight;
	  var attacks = defenders[d].attacks * share;
	  attackers[a].damageTaken += attacks * ds.singleAttackDamage(as);
	  attackers[a].attackedBy.push([defenders[d], attacks]);
	  log(defenders[d].name + " make "
	      + commaFormat(decimalFormat(attacks,3))
	      + " attacks on " + attackers[a].name);
	}
      }
    }
    
    // At this point there are no remaining attacks
    for (var i = 0; i < everybody.length; i++) {
      everybody[i].attacks = 0;
    }

    // Adjust unit counts, and translate overflow damage into additional
    // attacks that will be resolved in the next iteration
    for (var i = 0; i < everybody.length; i++) {
      if (everybody[i].count > 0) {
	var armor = everybody[i].count * everybody[i].stats.armor;
	if (everybody[i].damageTaken <= armor) {
	  var oldCount = everybody[i].count;
	  everybody[i].count *= (1 - (everybody[i].damageTaken / armor));
	  var k = commaFormat(decimalFormat(oldCount - everybody[i].count, 3));
	  log(k + " " + everybody[i].name + " killed");
	}
	else {
	  // Translate overflow damage back into additional attacks
	  everybody[i].count = 0;
	  var overkill = everybody[i].damageTaken / armor;
	  log("All " + everybody[i].name + " killed: "
	      + commaFormat(decimalFormat(overkill*100 - 100, 3))
	      + "% overflow damage");
	  for (var j = 0; j < everybody[i].attackedBy.length; j++) {
	    var by = everybody[i].attackedBy[j];
	    var refund = by[1] - by[1] / overkill;
	    by[0].attacks += refund;
	    log(by[0].name + " are compensated with "
		+ commaFormat(decimalFormat(refund, 3))
		+ " additional attacks");
	  }
	}
      }
    }
  }
  for (var i = 0; i < everybody.length; i++) {
    if (everybody[i].stats.cost < 200) {
      everybody[i].count = Math.ceil(everybody[i].count);
    }
    else if (everybody[i].stats.cost < 10000) {
      everybody[i].count = Math.ceil(everybody[i].count*10)/10;
    }
    else {
      everybody[i].count = Math.ceil(everybody[i].count*100)/100;
    }
  }
  var attLoss = fleetSize(_attackers) - fleetSize(attackers);
  var defLoss = fleetSize(_defenders) - fleetSize(defenders);
  var attArmor = fleetArmorTech(attackers);
  var defArmor = fleetArmorTech(defenders);
  var debris = Math.floor(attLoss*attArmor*0.02 + defLoss*defArmor*0.02);
  return { "_attackers": _attackers,
      "_defenders": _defenders,
      "attackers": attackers,
      "defenders": defenders,
      "attLoss": attLoss,
      "defLoss": defLoss,
      "debris": debris,
      "log": logEntries};
}

function singleAttackerCombat(attackerStats, defenders)
{
  var required = 0;
  var lost = 0;
  for (var i = 0; i < defenders.length; i++) {
    var count = defenders[i].count;
    var defStats = defenders[i].stats;
    // Calculate # of units required to kill this
    var damage = attackerStats.singleAttackDamage(defStats);
    required += count * defStats.armor / damage;
    // Calculate how much we lose from this
    var damage = defStats.singleAttackDamage(attackerStats);
    lost += count * damage / attackerStats.armor;
  }
  required = Math.ceil(required);
  var cost = attackerStats.cost;
  if (cost >= 10000) {
    lost = Math.ceil(lost*100)/100;
  }
  else if (cost >= 200) {
    lost = Math.ceil(lost*10)/10;
  }
  else {
    lost = Math.ceil(lost);
  }
  return { "required": required, "lost": lost };
}

function noOverflowCombat(a, d)
{
  var damage = [];
  for (var i = 0; i < a.length; i++) {
    damage[i] = 0;
  }
  for (var i = 0; i < d.length; i++) {
    var totalWeight = 0;
    for (var j = 0; j < a.length; j++) {
      totalWeight += d[i].stats.targetWeight(a[j]);
    }
    for (var j = 0; j < a.length; j++) {
      var share = d[i].stats.targetWeight(a[j]) / totalWeight;
      damage[j] += d[i].stats.singleAttackDamage(a[j]) * d[i].count * share;
    }
  }
  required = [];
  for (var i = 0; i < a.length; i++) {
    var n = Math.ceil(damage[i] / a[i].armor);
    required.push({"unit": a[i].unit, "count": n, "stats": a[i]});
  }
  return required;
}

function fleetArmorTech(fleet)
{
  for (var i = 0; i < fleet.length; i++) {
    if (fleet[i].stats.armorTech)
      return fleet[i].stats.armorTech;
  }
  return 0;
}

function fleetIsAlive(fleet) {
  for (var i = 0; i < fleet.length; i++) {
    if (fleet[i].count > 0)
      return true;
  }
  return false;
}

function fleetSize(fleet)
{
  var size = 0;
  for (var i = 0; i < fleet.length; i++) {
    if (fleet[i].unit) {
      size += Math.ceil(fleet[i].count) * fleet[i].stats.cost;
    }
  }
  return size;
}

function fleetMeatArmor(fleet)
{
  var armor = 0;
  for (var i = 0; i < fleet.length; i++) {
    if (!fleet[i].turret && fleet[i].stats.shielding == 0) {
      armor += fleet[i].count * fleet[i].stats.armor;
    }
  }
  return armor;
}

function fleetFighterArmor(fleet)
{
  for (var i = 0; i < fleet.length; i++) {
    if (fleet[i].unit == "Fighters") {
      return fleet[i].count * fleet[i].stats.armor;
    }
  }
  return 0;
}

function fleetRepairCost(fleet)
{
  var repairs = 0;
  for (var i = 0; i < fleet.length; i++) {
    repairs += (Math.ceil(fleet[i].count) - fleet[i].count)
      * fleet[i].stats.cost / 2;
  }
  return Math.round(repairs);
}

function repairedFleet(fleet)
{
  fleet = fleet.map(copyProperties("unit", "count", "stats"));
  for (var i = 0; i < fleet.length; i++) {
    fleet[i].count = Math.ceil(fleet[i].count);
  }
  return fleet;
}

function formatFleet(fleet)
{
  function formatUnit(x) {
    return "<td align='center' style='padding-left:4; padding-right:4'><small>"
      + commaFormat(x.count)
      + "<br/>" + x.unit.replace(/ /g, "&nbsp;") + "<br/>" + x.stats.power
      + "/" + x.stats.armor
      + (x.stats.shielding > 0 ? "&nbsp;("+x.stats.shielding+")" : "")
      + "</small></td>";
  }

  return fleet.map(formatUnit).join("");
}

function newFleet(text, techs, ccs, tactical)
{
  if (!text)
    return [];
  var bonus = 0;
  var units = text.split(/,/g).map(trim);
  var fleet = [];
  for (var i = 0; i < units.length; i++) {
    if (units[i].match(/^([\.\d]+) (.*)$/)) {
      var count = Number(RegExp.$1);
      if (count > 0) {
	var unit = RegExp.$2;
	var stats = unitStats[unit];
	bonus = Math.max(bonus, stats.bonus);
	fleet.push({"unit": unit, "count": count, "stats": stats});
      }
    }
  }
  // Calculate adjusted stats for each unit
  for (var i = 0; i < fleet.length; i++) {
    fleet[i].stats = fleet[i].stats.adjustedStats(techs, bonus, ccs, tactical);
  }
  return fleet;
}

function fleetString(fleet)
{
  var s = [];
  for (var i = 0; i < fleet.length; i++) {
    if (fleet[i].unit && fleet[i].count > 0) {
      s.push(fleet[i].count+" "+fleet[i].unit);
    }
  }
  return s.join(", ");
}

function getMyTech()
{
  return getSetting("techs", "L30 A32 SH20 M25 PL25 I18 PH15 D10 SD20 WD20");
}

function getMyLevel()
{
  return getSetting("level", 70);
}

function addFleetDetails()
{
  var rows = xpath("//table[@id='fleet_overview']//table[@class='layout listing']//tr");
  if (rows.length == 0)
    return;

  // Get recorded tech levels
  var techs = getMyTech();

  // Get the total fleet size
  var m = rows[rows.length-1].textContent.match(/^Fleet Size: (.*)$/i);
  if (!m) return;
  var fleetSize = parseNum(m[1]);

  // Parse units and calculate the armor/power bonus
  var fleet = [];
  var bonus = 0;
  for (var i = 1; i < rows.length-2; i++) {
    var unit = rows[i].cells[0].textContent;
    var count = parseNum(rows[i].cells[1].textContent);
    var stats = unitStats[unit];
    bonus = Math.max(bonus, stats.bonus);
    fleet.push({'unit': unit, 'count': count, 'stats': stats, 'row': rows[i]});
  }
  // Calculate adjusted stats for each unit, and total armor and hangar space
  var totalArmor = 0;
  var totalHangars = 0;
  for (var i = 0; i < fleet.length; i++) {
    fleet[i].stats = fleet[i].stats.adjustedStats(techs, bonus, 0, 0);
    totalArmor += fleet[i].count * fleet[i].stats.armor;
    totalHangars += fleet[i].count * fleet[i].stats.hangars;
  }

  var html = "<td class='help comment' align='center'><small>"
    + "Fleet&nbsp;Size:&nbsp;" + commaFormat(fleetSize) + "</small></td>"
    + "<td align='right'><small><a onClick='showDetails()'"
    + "href='javascript:;'>Details...</a></small></td>";
  rows[rows.length-1].innerHTML = html;
  rows[rows.length-1].setAttribute("class", "nohighlight");
  rows[rows.length-2].setAttribute("class", "nohighlight");
  var table = rows[0].parentNode.parentNode;
  var noDetailsHTML = table.innerHTML;

  var html = "<td align='right'><small>"
    + "Fleet&nbsp;Size:&nbsp;" + commaFormat(fleetSize) + "</small></td>"
    + "<td colspan='7' align='center'><small><a onClick='hideDetails()'"
    + "href='javascript:;'>Hide details</a></small></td>";
  rows[rows.length-2].cells[0].setAttribute("colspan", 8);
  rows[rows.length-1].innerHTML = html;
  var html = "<th align='right' width='120'>Hangars</th>"
    + "<th align='right' width='120'>Size</th>"
    + "<th align='right' width='90'>Size %</th>"
    + "<th align='right' width='90'>Armor %</th>"
    + "<th align='right' width='190'>Power/Armor (Shielding)</th>";
  rows[0].innerHTML += html;

  var hangarTip = "Total hangar space: " + commaFormat(totalHangars) + " ";
  if (totalHangars < 0)
    hangarTip += "(shortage)";
  else if (totalHangars == 0)
    hangarTip += "(sufficient)";
  else
    hangarTip += "(surplus)";

  for (var i = 0; i < fleet.length; i++) {
    var count = fleet[i].count;
    var stats = fleet[i].stats;

    var html = "<td align='right' title='"+hangarTip+"'>"
      +commaFormat(count * stats.hangars)+"</td>";
    html += "<td align='right'>"+commaFormat(count * stats.cost)+"</td>";
    var percent = decimalFormat(count * stats.cost / fleetSize * 100, 2);
    html += "<td align='right'>"+percent+"%</td>";
    var percent = decimalFormat(count * stats.armor / totalArmor * 100, 2);
    html += "<td align='right'>"+percent+"%</td>";
    var techTip = "Assuming "+techName[stats.weapon]+" "
      +stats.weaponTech+", Armor "+stats.armorTech;
    if (stats.shielding > 0) {
      techTip += ", Shielding "+stats.shieldingTech;
    }
    html += "<td align='center' title='"+techTip+"'>"
      +stats.power+" / "+stats.armor;
    if (stats.shielding > 0) {
      html += " ("+stats.shielding+")";
    }
    html += "</td>";
    fleet[i].row.innerHTML += html;
  }
  var detailsHTML = table.innerHTML;

  function singleUnitAttackMethod(attackUnit, name)
  {
    var attackStats = unitStats[attackUnit].adjustedStats(techs, 0, 0, 0);
    var result = singleAttackerCombat(attackStats, fleet);
    var creditsLost = Math.floor(result.lost) * attackStats.cost;
    var repairs = Math.round((result.lost - Math.floor(result.lost))
			     * attackStats.cost / 2);
    var u = attackUnit;
    var reqStr = commaFormat(result.required)+" "+plural(result.required, u);
    var lostStr = commaFormat(result.lost)+" "+plural(result.lost, u);
    
    if (getFlag("insertBattleCalculator")) {
      function onClick() {
	attackers = [{"unit": attackUnit, "count": result.required,
		      "stats": attackStats}];
	openBattleCalculator(attackers, fleet, techs, techs, "", getMyLevel());
      }
    }
    else {
      var onClick = undefined;
    }

    return { "name": name,
	"required": reqStr,
	"lost": lostStr,
	"creditsLost": creditsLost,
	"repairCost": repairs,
	"onClick": onClick };
  }

  function fighterComboAttackMethod(topUnit)
  {
    var topStats = unitStats[topUnit].adjustedStats(techs, 0, 0, 0);
    var ftStats = unitStats['Fighters'].adjustedStats(techs, topStats.bonus,
						      0, 0);
    var name = "Fighters/"+plural(2, topUnit);
    var required = 0;
    var lostFts = 0;
    var lostTopUnits = 0;
    for (var i = 0; i < fleet.length; i++) {
      var unit = fleet[i].unit;
      var count = fleet[i].count;
      var defStats = fleet[i].stats;
      // Calculate # of top units required to kill this
      // TODO: Factor in FT damage too so we do not overestimate
      // the number of required units
      var damage = topStats.singleAttackDamage(defStats);
      required += count * defStats.armor / damage;
      // Calculate how much we lose from this
      var ftWeight = defStats.targetWeight(ftStats);
      var topWeight = defStats.targetWeight(topStats);
      var ftShare = ftWeight / (ftWeight + topWeight);
      var topShare = topWeight / (ftWeight + topWeight);
      var ftDamage = defStats.singleAttackDamage(ftStats);
      var topDamage = defStats.singleAttackDamage(topStats);
      lostFts += count * ftShare * ftDamage / ftStats.armor;
      lostTopUnits += count * topShare * topDamage / topStats.armor;
    }
    required = Math.ceil(required);
    lostFts = Math.ceil(lostFts);
    lostTopUnits = Math.ceil(lostTopUnits);
    var u = topUnit;//.toLowerCase();
    var reqStr = commaFormat(lostFts)+" "+plural(lostFts, "Fighter")+" and "
      +commaFormat(required)+" "+plural(required, u);
    var lostStr = commaFormat(lostFts)+" "+plural(lostFts, "Fighter")+" and "
      +commaFormat(lostTopUnits)+" "+plural(lostTopUnits, u);
    var creditsLost = ftStats.cost * lostFts + topStats.cost * lostTopUnits;

    if (getFlag("insertBattleCalculator")) {
      function onClick() {
	attackers = [{"unit": "Fighters", "count": lostFts, "stats": ftStats},
	  {"unit": topUnit, "count": required, "stats": topStats}];
	openBattleCalculator(attackers, fleet, techs, techs, "", getMyLevel());
      }
    }
    else {
      var onClick = undefined;
    }

    return { "name": name,
	"required": reqStr,
	"lost": lostStr,
	"creditsLost": creditsLost,
	"repairCost": 0,
	"onClick": onClick };
  }

  var attackMethods = [];
  attackMethods.push(singleUnitAttackMethod("Fighters", "Fighter Swarm"));
  attackMethods.push(singleUnitAttackMethod("Cruiser", "Straight Cruisers"));
  attackMethods.push(singleUnitAttackMethod("Heavy Cruiser", "Heavy Cruiser Rape"));
  attackMethods.push(singleUnitAttackMethod("Battleship", "Battleship Rape"));
  attackMethods.push(singleUnitAttackMethod("Dreadnought", "Dreadnought Rape"));
  attackMethods.push(singleUnitAttackMethod("Titan", "Titan Rape"));
  attackMethods.push(singleUnitAttackMethod("Leviathan", "Leviathan Rape"));
  attackMethods.push(singleUnitAttackMethod("Death Star", "Death Star Rape"));
  attackMethods.push(fighterComboAttackMethod("Destroyer"));
  attackMethods.push(fighterComboAttackMethod("Frigate"));
  attackMethods.push(fighterComboAttackMethod("Cruiser"));
  attackMethods.push(fighterComboAttackMethod("Heavy Cruiser"));
  attackMethods.push(fighterComboAttackMethod("Battleship"));
  attackMethods.push(fighterComboAttackMethod("Ion Frigate"));
  var cmp = function(x, y) {
    return (x.creditsLost+x.repairCost-y.creditsLost-y.repairCost);
  };
  attackMethods.sort(cmp);

  if (attackMethods.length > 0) {
    var html = "<table align='center'><tr><td>"
      + "<table class='layout listing'>"
      + "<tr class='listing-header'>"
      + "<th align='center'>Attack Method</th>"
      + "<th align='center'>Units Required</th>"
      + "<th align='center'>Units Lost</th>"
      + "<th align='center'>Credits Lost</th>"
      + "<th align='center'>Repair Cost</th>";
    for (var i = 0; i < attackMethods.length; i++) {
      var am = attackMethods[i];
      html += "<tr>";
      if (am.onClick)
	var name = "<a href='javascript:;' id='amLink"+i+"'>"+am.name+"</a>";
      else
	var name = am.name;
      var cols = [name, am.required, am.lost,
		  commaFormat(am.creditsLost)+" credits",
		  am.repairCost ? commaFormat(am.repairCost)+" credits" : ""];
      for (var j = 0; j < cols.length; j++) {
	html += "<td align='center' style='padding: 2 10 2 10'>"
	  +cols[j]+"</td>";
      }
      html += "</tr>";
    }
    html += "<tfoot><tr align='center'><td colspan='5' style='padding: 5 5 2 5'><small><b>Important note:</b> Technology levels, planetary defenses and command centers may affect these numbers.<br/>Always double-check with a proper battle calculator before choosing your attack method.</small></td></tr></tfoot></table></td></tr></table>";

    var div = document.createElement("div");
    div.setAttribute("id", "attackMethods");
    div.style.display = "none";
    div.innerHTML = html;
    var n = table.parentNode.parentNode.parentNode.parentNode;
    n.parentNode.insertBefore(div, n.nextSibling.nextSibling);

    function clickListener(onClick)
    {
      return function(e) { onClick(); };
    }

    for (var i = 0; i < attackMethods.length; i++) {
      var am = attackMethods[i];
      var elem = document.getElementById("amLink"+i);
      if (am.onClick && elem) {
	elem.addEventListener("click", clickListener(am.onClick), false);
      }
    }
  }

  if (!getFlag("fleetDetailsOnByDefault")) {
    table.innerHTML = noDetailsHTML;
  }
  else {
    div.style.display = "";
  }

  unsafeWindow.hideDetails = function() {
    function f() {
      table.innerHTML = noDetailsHTML;
      if (getFlag("highlightTableRows")) {
	highlightTableRows();
      }
      div.style.display = "none";
    }
    window.setTimeout(f, 0);
  };
  unsafeWindow.showDetails = function() {
    function f() {
      table.innerHTML = detailsHTML;
      if (getFlag("highlightTableRows")) {
	highlightTableRows();
      }
      div.style.display = "";
    }
    window.setTimeout(f, 0);
  };
}

function parseDuration(t)
{
  var h = 0;
  var m = 0;
  var s = 0;
  if (t.match(/(\d+)h/))
    h = Number(RegExp.$1);
  if (t.match(/(\d+)m/))
    m = Number(RegExp.$1);
  if (t.match(/(\d+)s/))
    s = Number(RegExp.$1);
  return h * 3600 + m *60 + s;
}

function addRecallTime()
{
  if (!xpath1("//input[@value='Recall Fleet']"))
    return;
  var html = document.body.innerHTML;
  if (html.match(/<center><b>Travel Duration:(.*?)<\/b><\/center>/)) {
    var duration = parseDuration(RegExp.$1);
    var time1 = document.getElementById("time1");
    var arrival = Number(time1.getAttribute("title"));
    var newHtml = "<b>Recall Time: <span id='newtime2' "
      + "timeDisplay='countup' seconds='" + (duration-arrival)
      + "' maxSeconds='" + duration + "' style='cursor:pointer' "
      + "onClick='toggleTimeDisplay(this)'> </span></b>";
    html = html.replace(/(<b>Travel Duration:.*?<\/b>)/g,
			"$1<br/>"+newHtml);
    document.body.innerHTML = html;
    updateTimer(document.getElementById("newtime2"));
  }
}

function makeBattleCalculatorDiv()
{
  function techSelector(cssClass, id)
  {
    var html = "<select class='"+cssClass+"' id='"+id+"'>";
    for (var lvl = 0; lvl <= 40; lvl++) {
      html += "<option value='"+zeroPad(lvl,2)+"'>"
	+zeroPad(lvl,2)+"</option>";
    }
    html += "</select>";
    return html;
  }

  function techTable()
  {
    var html = "<table class='bcTable'>"
      + "<tr><th class='bcHeading2' colspan='3'>Technology Levels</th></tr>"
      + "<tr><th class='bcHeading3'>Attacker</th>"
      + "<th class='bcHeading3'>Tech</th>"
      + "<th class='bcHeading3'>Defender</th>";
    for (var tech in techName) {
      html += "<tr><td align='center'>"
	+techSelector("bcAttackerSelect", "bcAttTech"+tech)+"</td>"
	+"<td class='bcTech' align='center'>"+techName[tech]+"</td>"
	+"<td align='center'>"
	+techSelector("bcDefenderSelect", "bcDefTech"+tech)+"</td></tr>";
    }
    html += "</table>";
    return html;
  }

  function playerLevelsTable()
  {
    var html = "<table class='bcTable'>"
      + "<tr><th class='bcHeading3'>Attacker Level</th>"
      + "<td align='right'>"
      + "<input class='bcAttackerInput' id='bcAttackerLevel' "
      + "size='6' maxlength='6' type='text' value=''></td></tr>"
      + "<tr><th class='bcHeading3'>Defender Level</th>"
      + "<td align='right'>"
      + "<input class='bcDefenderInput' id='bcDefenderLevel' "
      + "size='6' maxlength='6' type='text' value=''></td></tr>"
      + "<tr><td colspan='2' align='center'>"
      + "<span class='bcNote' id='bcFighterChoke'>No fighter choking.</span>"
      + "</td></tr></table>";
    return html;
  }

  function fleetInput(cssClass, id)
  {
    return "<input class='"+cssClass+"' id='"+id
      +"' size='10' maxlength='10' type='text'>";
  }

  function fleetCompositionsTable()
  {
    var html = "<table class='bcTable'>"
      + "<tr><th class='bcHeading2' colspan='3'>Fleet Compositions</th></tr>"
      + "<th class='bcHeading3' align='left'>&nbsp;Attacker</th>"
      + "<th class='bcHeading3'></th>"
      + "<th class='bcHeading3' align='right'>Defender&nbsp;</th></tr>";
    for (var unit in unitStats) {
      if (unit != "Goods") {
	html += "<tr><td align='left'>"
	  +fleetInput("bcAttackerInput", "bcAttUnit"+unit)+"</td>"
	  +"<td class='bcUnit' align='center'>"+plural(2, unit)+"</td>"
	  +"<td align='right'>"
	  +fleetInput("bcDefenderInput", "bcDefUnit"+unit)+"</td></tr>";
      }
    }
    html += "<tr id='bcFollowUpRow'><td colspan='3' align='center'>"
      + "<input class='bcCheckbox' id='bcFollowUpAttack' type='checkbox'>"
      + " Follow-up from previous attack</td></tr>";
    html += "<tr id='bcClearFleetRow'><td colspan='3' align='center'>"
      + "<a class='bcLink' id='bcClearFleet'>"
      + "Clear fleet</td></tr>";
    html += "</table>";
    return html;
  }

  function baseOwnerTable()
  {
    var html = "<table class='bcTable'><tr><td/><td/><td/></tr><tr>"
      + "<th class='bcHeading3' align='left'>Base Owner</th>"
      + "<td align='right' colspan='2'>"
      + "<select class='bcSelect' id='bcBaseOwner'>"
      + "<option value=''>Neither</option>"
      + "<option value='Attacker'>Attacker</option>"
      + "<option value='Defender'>Defender</option>"
      + "</select></td></tr>"
      + "<tr><th class='bcHeading3' align='left'>Commander</th>"
      + "<td align='right' colspan='2'>"
      + "<select class='bcSelect' id='bcCommander'>"
      + "<option value='None'>None</option>";
    for (var i = 1; i <= 20; i++) {
      html += "<option value='T"+i+"'>Tactical "+i+"</option>";
    }
    for (var i = 1; i <= 20; i++) {
      html += "<option value='D"+i+"'>Defense "+i+"</option>";
    }
    html += "</select></td></tr>"
      + "<tr><th class='bcHeading3' align='left' colspan='2'>"
      + "Command Centers</th><td align='right'>"
      + "<select class='bcSelect' id='bcCommandCenters'>";
    for (var i = 0; i <= 30; i++) {
      html += "<option value='"+i+"'>"+zeroPad(i, 2)+"</option>";
    }
    html += "</select></td></tr></table>";
    return html;
  }

  function defensesTable()
  {
    var html = "<table class='bcTable'><tr>"
      + "<th class='bcHeading3' align='left'>Base Defenses</th>"
      + "<td align='right'><input class='bcInput' id='bcDefensePercent' "
      + "size='5' maxlength='5' type='text' value='100' /><b>%</b></td></tr>";
    for (var turret in turretStats) {
      html += "<tr><td class='bcTurret'>"+turret+"</td>"
	+ "<td align='center'>"
	+ "<select class='bcDefenderSelect' id='bcTurret"+turret+"'>";
      for (var n = 0; n <= 95; n += 5) {
	html += "<option value='"+n+"'>"+zeroPad(n, 2)+"</option>";
      }
      html += "</select></td></tr>";
    }
    html += "</table>";
    return html;
  }

  function combatResultTable()
  {
    var html = "<table class='bcTable'>"
      + "<tr><th class='bcHeading2'>Projected Combat Result</th></tr>"
      + "<tr><td id='bcCombatResult' align='center'>"
      + "</td></tr></table>";
    return html;
  }

  function combatWizardTable()
  {
    var html = "<table class='bcTable'>"
      + "<tr><th class='bcHeading2' colspan='4'>Combat Wizard</th></tr>"
      + "<tr><th class='bcHeading3' colspan='2' align='left'>Fighter drop</th>"
      + "<td align='center'><a class='bcLink' id='bcFullFighterDrop'>Full drop</a></td>"
      + "<td align='center'><a class='bcLink' id='bcPartialFighterDrop'>Leave fighters</a></td></tr>"
      + "<tr><th class='bcHeading3' colspan='2' align='left'>Bomber drop</th>"
      + "<td align='center'><a class='bcLink' id='bcFullBomberDrop'>Full drop</a></td>"
      + "<td align='center'><a class='bcLink' id='bcPartialBomberDrop'>Leave fighters</a></td></tr>"
      + "<tr><th class='bcHeading3' colspan='2' align='left'>Heavy bomber drop</th>"
      + "<td align='center'><a class='bcLink' id='bcFullHBDrop'>Full drop</a></td>"
      + "<td align='center'><a class='bcLink' id='bcPartialHBDrop'>Just kill carriers</a></td></tr>"
      + "<tr><th class='bcHeading3' align='left'>Finish</th>"
      + "<td align='center'><a class='bcLink' id='bcShieldRape'>Shield rape</a></td>"
      + "<td align='center'><a class='bcLink' id='bcFighterSwarm'>FT swarm</a></td>"
      + "<td align='center'><a class='bcLink' id='bcFinisherAttack'>Conventional</a></td></tr>"
      + "</table>";
    return html;
  }
  
  function combatSummaryTable()
  {
    var html = "<br/><table class='bcTable' width='100%'>"
      + "<tr><th class='bcHeading3' width='35%'>Total Attacker Losses</th>"
      + "<td align='center' width='10%' id='bcTotalAttLoss'></td>"
      + "<th class='bcHeading3' width='35%'>Total Repair Costs</th>"
      + "<td align='center' width='10%' id='bcTotalRepairs'></td><td width='10%'></td></tr>"
      + "<tr><th class='bcHeading3' width='35%'>Total Defender Losses</th>"
      + "<td align='center' width='10%' id='bcTotalDefLoss'></td>"
      + "<th class='bcHeading3' width='35%'>Credits Earned</th>"
      + "<td align='center' width='10%' id='bcProfit'></td></tr>"
      + "<tr><th class='bcHeading3' width='35%'>Debris Created</th>"
      + "<td align='center' width='10%' id='bcTotalDebris'></td>"
      + "<th class='bcHeading3' width='35%'>Profit Margin</th>"
      + "<td align='center' width='10%' id='bcProfitMargin' style='font-weight:bold'></td></tr>"
      + "</table>";
    return html;
  }

  var div = document.createElement("div");
  var paneBody = "<table class='bcLayout'><tr>"
    + "<td align='center' valign='center'>"
    + fleetCompositionsTable()+"<br/>"+combatWizardTable()+"</td>"
    + "<td align='center' valign='center'><table class='bcLayout'>"
    + "<tr><td align='center'><br/>" + baseOwnerTable()+"</td>"
    + "<td align='center'><br/>"+playerLevelsTable()+"</td></tr>"
    + "<tr><td align='center'>"+defensesTable()+"</td>"
    + "<td align='center'>"+techTable()+"</td></tr>"
    + "</table><br/>"+combatResultTable()+"</td></tr>"
    + "<tr><td colspan='100'>"+combatSummaryTable()+"</td></tr></table>";
  var html = "<br/><table align='center' width='"+twidth+"'>"
    + "<tr><th class='bcHeading1'>Battle Calculator</th></tr>"
    + "<tr><td align='center'><table class='bcLayout'><tr id='bcPaneRow'>"
    + "</tr></tr><th class='bcPaneBody' colspan='100' align='center'>"+paneBody
    + "</th></tr></table></td></tr><tr><td>&nbsp;</td></tr></table>";
  div.innerHTML = html;

  // Add CSS styles
  var colors = ["gold", "white", "white", "gold", "black", "orange"];
  var bgColors = ["#444455", "#333344", "#B89956", "#96BE67", "#FA5858"];
  var style
    = "table.bcTable { background: "+bgColors[0]+"; border:0px; } "
    + "table.bcTable td { border: 0px; padding-top: 1px; padding-bottom: 1px; padding-left:6px; padding-right:4px } "
    + "th.bcHeading1 { font-weight: bold; font-size: 24; font-variant: small-caps; border: 0px; padding-bottom: 6px; color: "+colors[0]+"; } "
    + "th.bcHeading2 { font-weight: bold; border: 0px; padding-top: 1px; padding-bottom: 1px; padding-left:6px; padding-right:4px; color:"+colors[1]+"; text-decoration: underline; } "
    + "th.bcHeading3 { font-weight: bold; border: 0px; padding-top: 1px; padding-bottom: 1px; padding-left:6px; padding-right:4px; color:"+colors[2]+"; } "
    + "table.bcLayout { background: transparent; border:0px } "
    + "table.bcLayout td { border:0px } "
    + "th.bcPane { background: "+bgColors[1]+"; border-left:2px solid; border:2px solid; padding-top:10px; padding-bottom:5px; padding-left:10px; padding-right:10px; cursor:pointer; } "
    + "th.bcSelectedPane { background: "+bgColors[0]+"; border-left:2px solid; border-top:2px solid; border-right:2px solid; border-bottom:0px; padding-top:10px; padding-bottom:5px; padding-left:10px; padding-right:10px } "
    + "th.bcPaneRemainder { background: transparent; border-left:0px; border-top:0px; border-right:0px; border-bottom:2px solid } "
    + "th.bcPaneBody { background: "+bgColors[0]+"; border-top:0px; border-left:2px solid; border-right:2px solid; border-bottom:2px solid; padding-left:25px; padding-right:25px; padding-top: 10px; padding-bottom:10px } "
    + "input.bcInput { background: "+bgColors[2]+"; color: "+colors[4]+"; text-align: center; border-color:gray } "
    + "input.bcAttackerInput { background: #293329; color: white; text-align: center; border-color: gray } "
    + "input.bcDefenderInput { background: #332929; color: white; text-align: center; border-color: gray } "
    + "select.bcSelect { background: "+bgColors[2]+"; color: "+colors[4]+"; border-color: gray } "
    + "select.bcAttackerSelect { background: "+bgColors[3]+"; color: "+colors[4]+"; border-color: gray } "
    + "select.bcDefenderSelect { background: "+bgColors[4]+"; color: "+colors[4]+"; border-color: gray } "
    + "input.bcCheckbox { cursor:pointer; } "
    + ".bcTech { color: "+colors[3]+"; font-variant: small-caps; } "
    + ".bcUnit { color: "+colors[3]+"; font-variant: small-caps; } "
    + ".bcTurret { color: "+colors[3]+"; font-variant: small-caps; } "
    + ".bcNote { color: "+colors[3]+"; } "
    + "a.bcLink { cursor:pointer; color: "+colors[5]+"; } ";
  GM_addStyle(style);
  return div;
}

function initBattleCalculator()
{
  var numAttacks = Number(getSetting("bcNumAttacks", 1));
  var currentAttack = Number(getSetting("bcCurrentAttack", 0));
  var maxAttacks = 20;
  var myTech = getMyTech();
  var defTech = getSetting("bcDefTech", myTech);
  var defFleet = [getSetting("bcDefFleet", "")];
  var attTech = [];
  var attFleet = [];
  var baseOwner = [];
  var followUp = [];
  var attackerLevel = [];
  var myLevel = Number(getSetting("level", 70));
  var defenderLevel = Number(getSetting("bcDefenderLevel", myLevel));
  for (var i = 0; i < numAttacks; i++) {
    attTech[i] = getSetting("bcAttTech"+i, myTech);
    attFleet[i] = getSetting("bcAttFleet"+i, "");
    baseOwner[i] = getSetting("bcBaseOwner"+i, "");
    followUp[i] = getSetting("bcFollowUp"+i, "");
    attackerLevel[i] = Number(getSetting("bcAttackerLevel"+i, myLevel));
  }
  var result = [];
  var ccs = Number(getSetting("bcCommandCenters", 0));
  var tacticalCommander = Number(getSetting("bcTacticalCommander", 0));
  var defenseCommander = Number(getSetting("bcDefenseCommander", 0));
  var defensePercent = [Number(getSetting("bcDefensePercent", 100))];
  var totalRepairCost = 0;
  var totalAttLoss = 0;
  var totalDefLoss = 0;
  var totalDebris = 0;

  function attackerStats(unit)
  {
    if (baseOwner[currentAttack] == "Attacker") {
      var f = newFleet("1 "+unit, attTech[currentAttack],
		       ccs, tacticalCommander);
    }
    else {
      var f = newFleet("1 "+unit, attTech[currentAttack], 0, 0);
    }
    return f[0].stats;
  }

  function singleAttack(i)
  {
    if (baseOwner[i] == "Attacker") {
      var attackers = newFleet(attFleet[i], attTech[i],
			       ccs, tacticalCommander);
    }
    else {
      var attackers = newFleet(attFleet[i], attTech[i], 0, 0);
    }
    if (baseOwner[i] == "Defender") {
      var defenders = newFleet(defFleet[i], defTech, ccs, tacticalCommander);
      for (var turret in turretStats) {
	var elem = document.getElementById("bcTurret"+turret);
	if (elem && elem.value > 0) {
	  var count = Math.round(Number(elem.value)*defensePercent[i])/100;
	  var stats = turretStats[turret];
	  stats = stats.adjustedStats(defTech, defenseCommander);
	  defenders.push({"turret": turret, "count": count, "stats": stats});
	}
      }
    }
    else {
      var defenders = newFleet(defFleet[i], defTech, 0, 0);
    }
    return combat(attackers, defenders);
  }

  function calculate()
  {
    var totalDefenseArmor = 0;
    for (var turret in turretStats) {
      var elem = document.getElementById("bcTurret"+turret);
      if (elem && elem.value > 0) {
	var stats = turretStats[turret];
	stats = stats.adjustedStats(defTech, defenseCommander);
	totalDefenseArmor += stats.armor * Number(elem.value);
      }
    }
    totalRepairCost = totalAttLoss = totalDefLoss = totalDebris = 0;
    for (var i = 0; i < numAttacks; i++) {
      result[i] = singleAttack(i);
      totalRepairCost += fleetRepairCost(result[i].attackers);
      totalAttLoss += result[i].attLoss;
      totalDefLoss += result[i].defLoss;
      totalDebris += result[i].debris;
      defFleet[i+1] = fleetString(result[i].defenders);
      if (followUp[i+1]) {
	attFleet[i+1] = fleetString(repairedFleet(result[i].attackers));
	setSetting("bcAttFleet"+(i+1), attFleet[i+1]);
      }
      if (baseOwner[i] == "Defender") {
	// Calculate resulting defenses level
	if (totalDefenseArmor == 0) {
	  defensePercent[i+1] = 0;
	}
	else {
	  var d = result[i].defenders;
	  var armor = 0;
	  for (var j = 0; j < d.length; j++) {
	    if (d[j].turret) {
	      armor += d[j].stats.armor * d[j].count;
	    }
	  }
	  defensePercent[i+1] = Math.round(10000*armor/totalDefenseArmor)/100;
	}
      }
      else {
	defensePercent[i+1] = defensePercent[i];
      }
    }
    attFleet[numAttacks] = fleetString(result[numAttacks-1].attackers);
  }

  function selectAttack(attack)
  {
    currentAttack = attack;
    updatePanes();
    updateFleet();
    updateFollowUp();
    updateBaseOwner();
    updateBaseDefenses();
    updateLevels();
    updateAttTech();
    updateCombatResult();
    setSetting("bcCurrentAttack", currentAttack);
  }

  function addAttack()
  {
    if (numAttacks < maxAttacks) {
      calculate();
      attTech[numAttacks] = attTech[numAttacks-1];
      setSetting("bcAttTech"+numAttacks, attTech[numAttacks]);
      setSetting("bcAttFleet"+numAttacks, attFleet[numAttacks]);
      baseOwner[numAttacks] = baseOwner[numAttacks-1];
      setSetting("bcBaseOwner"+numAttacks, baseOwner[numAttacks]);
      followUp[numAttacks] = "";
      setSetting("bcFollowUp"+numAttacks, "");
      attackerLevel[numAttacks] = attackerLevel[numAttacks-1];
      setSetting("bcAttackerLevel"+numAttacks, ""+attackerLevel[numAttacks]);
      numAttacks++;
      setSetting("bcNumAttacks", numAttacks);
      calculate();
      selectAttack(numAttacks-1);
    }
  }

  function paneClicked(e)
  {
    var paneRow = document.getElementById("bcPaneRow");
    for (var i = 0; i < numAttacks; i++) {
      if (e.target == paneRow.cells[i]) {
	if (currentAttack != i) {
	  selectAttack(i);
	}
	return;
      }
    }
    if (e.target == paneRow.cells[numAttacks]) {
      addAttack();
    }
  }

  function removeAttack(e)
  {
    numAttacks--;
    if (currentAttack >= numAttacks) {
      selectAttack(numAttacks-1);
    }
    else {
      updatePanes();
    }
    setSetting("bcNumAttacks", numAttacks);
  }

  function updatePanes()
  {
    var paneRow = document.getElementById("bcPaneRow");
    var paneWidth = Math.min(20, Math.floor(100 / (numAttacks + 2)));
    var html = "";
    for (var i = 0; i < numAttacks; i++) {
      html += "<th width='"+paneWidth+"%' class='";
      if (i == currentAttack) {
	html += "bcSelectedPane";
      }
      else {
	html += "bcPane";
      }
      html += "'>Attack&nbsp;#"+(i+1)+"/"+numAttacks;
      if (i == numAttacks-1) {
	html += "&nbsp;&nbsp;<a class='bcLink' id='bcRemoveAttack'>[X]</a>";
      }
      html += "</th>";
    }
    html += "<th width='"+paneWidth+"%' class='bcPane'>"
      +"New&nbsp;Attack</th>";
    html += "<th width='"+(100-paneWidth*(numAttacks+1))+"%' "
      +" class='bcPaneRemainder'></th>";
    paneRow.innerHTML = html;
    for (var i = 0; i <= numAttacks; i++) {
      var cell = paneRow.cells[i];
      cell.addEventListener("click", paneClicked, false);
    }
    var link = document.getElementById("bcRemoveAttack");
    link.addEventListener("click", removeAttack, true);
  }

  function updateLevels()
  {
    var elem = document.getElementById("bcAttackerLevel");
    if (elem) {
      elem.value = attackerLevel[currentAttack];
    }
    var elem = document.getElementById("bcDefenderLevel");
    if (elem) {
      elem.value = defenderLevel;
    }
    updateFighterChoke();
  }

  function updateDefTech()
  {
    for (var tech in techName) {
      var id = "bcDefTech"+tech;
      var select = document.getElementById(id);
      if (select) {
	select.value = getTechLevel(defTech, tech);
      }
    }
  }

  function updateAttTech()
  {
    for (var tech in techName) {
      var id = "bcAttTech"+tech;
      var select = document.getElementById(id);
      if (select) {
	select.value = getTechLevel(attTech[currentAttack], tech);
      }
    }
  }    

  function getUnitCount(fleet, unit)
  {
    for (var i = 0; i < fleet.length; i++) {
      if (fleet[i].unit == unit) {
	return fleet[i].count;
      }
    }
    return 0;
  }

  function updateFleet()
  {
    var attackers = result[currentAttack]._attackers;
    var defenders = result[currentAttack]._defenders;
    for (var unit in unitStats) {
      var elem = document.getElementById("bcAttUnit"+unit);
      if (elem) {
	elem.value = getUnitCount(attackers, unit) || "";
	elem.readOnly = followUp[currentAttack];
	elem.disabled = followUp[currentAttack];
      }
      var elem = document.getElementById("bcDefUnit"+unit);
      if (elem) {
	elem.value = getUnitCount(defenders, unit) || "";
	elem.readOnly = (currentAttack > 0);
	elem.disabled = (currentAttack > 0);
      }
    }
  }

  function updateFollowUp()
  {
    var row1 = document.getElementById("bcFollowUpRow");
    var row2 = document.getElementById("bcClearFleetRow");
    var checkbox = document.getElementById("bcFollowUpAttack");
    if (row1 && row2 && checkbox) {
      if (currentAttack == 0) {
	checkbox.checked = false;
	checkbox.disabled = true;
	row1.style.display = "none";
	row2.style.display = "";
      }
      else {
	checkbox.checked = followUp[currentAttack];
	checkbox.disabled = false;
	row1.style.display = "";
	row2.style.display = "none";
      }
    }
  }

  function combatFleetTable(title, fleet, fleetLeft)
  {
    var html = "<table width='420'>"
      + "<tr><th colspan='6'><small>"+title+"</th></tr><tr>"
      + "<th width='23%'><small>Unit</th>"
      + "<th width='22%'><small>Start Quant.</th>"
      + "<th width='22%'><small>End Quant.</small></th>"
      + "<th width='11%'><small>Power</small></th>"
      + "<th width='11%'><small>Armour</small></th>"
      + "<th width='11%'><small>Shield</small></th></tr>";
    for (var i = 0; i < fleet.length; i++) {
      var f = fleet[i];
      if (f.count > 0) {
	var left = 0;
	for (var j = 0; j < fleetLeft.length; j++) {
	  if (f.stats.name == fleetLeft[j].stats.name) {
	    left = fleetLeft[j].count;
	  }
	}
	html += "<tr align='center'><td><small>"
	  + f.stats.name.replace(/ /g, "&nbsp;")+"</small></td>"
	  + "<td><b><small>"+f.count+"</small></b></td>"
	  + "<td class='orange hilite'><b><small>"+left+"</small></b></td>"
	  + "<td><b><small>"+f.stats.power+"</small></b></td>"
	  + "<td><b><small>"+f.stats.armor+"</small></b></td>"
	  + "<td><b><small>"+f.stats.shielding+"</small></b></td></tr>";
      }
    }
    html += "</table>";
    return html;
  }

  function calcXP(myLevel, hisLevel, losses)
  {
    if (myLevel > hisLevel) {
      return Math.floor(Math.pow(hisLevel/myLevel, 2) / 20 * losses);
    }
    else {
      return Math.floor(Math.min(losses/10, hisLevel/myLevel/20 * losses));
    }
  }

  function updateCombatResult()
  {
    var elem = document.getElementById("bcCombatResult");
    if (!elem) return;
    
    var r = result[currentAttack];
    var attXP = calcXP(attackerLevel[currentAttack], defenderLevel,
		       r.attLoss+r.defLoss);
    var defXP = calcXP(defenderLevel, attackerLevel[currentAttack],
		       r.attLoss+r.defLoss);

    var html = combatFleetTable("Attack Force", r._attackers, r.attackers)
      + "<br/>"
      + combatFleetTable("Defensive Force", r._defenders, r.defenders)
      + "<br/><small><center>Total cost of units destroyed: "
      + commaFormat(r.attLoss+r.defLoss) + " <small>( Attacker: "
      + commaFormat(r.attLoss) + "; Defender: "
      + commaFormat(r.defLoss) + " )</center>"
      + "<center>Experience: ( Attacker: +" + commaFormat(attXP)
      + "; Defender: +" + commaFormat(defXP) + " )</center>"
      + "<center>New debris in space: "
      + commaFormat(r.debris) + "</center></small>";
    if (false) {
      for (var i = 0; i < r.log.length; i++) {
	html += "<br/><small>"+r.log[i]+"</small>";
      }
    }
    elem.innerHTML = html;
    
    var elem = document.getElementById("bcTotalAttLoss");
    elem.innerHTML = commaFormat(totalAttLoss);
    var elem = document.getElementById("bcTotalDefLoss");
    elem.innerHTML = commaFormat(totalDefLoss);
    var elem = document.getElementById("bcTotalDebris");
    elem.innerHTML = commaFormat(totalDebris);
    var elem = document.getElementById("bcTotalRepairs");
    elem.innerHTML = commaFormat(totalRepairCost);
    var loss = totalAttLoss + totalRepairCost;
    var profit = totalDebris - loss;
    if (loss <= 0) {
      var profitMargin = totalDefLoss == 0? "" : "Pure&nbsp;profit";
    }
    else if (profit > 0) {
      var profitMargin = (Math.round((totalDebris / loss - 1)
				     * 10000) / 100) + "%";
    }
    else {
      var profitMargin = "-" + (Math.round((1 - totalDebris / loss)
					   * 10000) / 100) + "%";
    }
    var elem = document.getElementById("bcProfit");
    elem.innerHTML = commaFormat(profit);
    var elem = document.getElementById("bcProfitMargin");
    elem.innerHTML = profitMargin;
  }

  function updateBaseOwner()
  {
    var elem = document.getElementById("bcBaseOwner");
    if (!elem) return;
    elem.value = baseOwner[currentAttack];
    elem.setAttribute("class", "bc"+baseOwner[currentAttack]+"Select");
  }

  function updateBaseInfo()
  {
    var elem = document.getElementById("bcCommander");
    if (elem) {
      if (tacticalCommander > 0) {
	elem.value = "T"+tacticalCommander;
      }
      else if (defenseCommander > 0) {
	elem.value = "D"+defenseCommander;
      }
      else {
	elem.value = "";
      }
    }
    var elem = document.getElementById("bcCommandCenters");
    if (elem) {
      elem.value = ccs;
    }
  }

  function updateBaseDefenses()
  {
    var elem = document.getElementById("bcDefensePercent");
    if (elem) {
      elem.value = defensePercent[currentAttack];
      var readOnly = (currentAttack > 0) || (baseOwner[0] != "Defender");
      elem.readOnly = readOnly;
      elem.disabled = readOnly;
    }
    for (var turret in turretStats) {
      var elem = document.getElementById("bcTurret"+turret);
      if (elem) {
	elem.value = getSetting("bcTurret"+turret, "0");
	elem.disabled = (baseOwner[0] != "Defender");
      }
    }
  }

  function getFleetString(side)
  {
    var s = [];
    for (var unit in unitStats) {
      var elem = document.getElementById("bc"+side+"Unit"+unit);
      if (elem) {
	s.push(elem.value + " " + unit);
      }
    }
    return s.join(", ");
  }

  function attFleetChanged(e)
  {
    e.target.value = e.target.value.replace(/[^0-9\.]/g, "");
    var s = getFleetString("Att");
    attFleet[currentAttack] = s;
    setSetting("bcAttFleet"+currentAttack, s);
    calculate();
    updateCombatResult();
  }

  function defFleetChanged(e)
  {
    e.target.value = e.target.value.replace(/[^0-9\.]/g, "");
    var s = getFleetString("Def");
    defFleet[0] = s;
    setSetting("bcDefFleet", s);
    calculate()
    updateCombatResult();
  }

  function followUpChanged(e)
  {
    followUp[currentAttack] = e.target.checked;
    setSetting("bcFollowUp"+currentAttack, e.target.checked ? "1": "");
    if (currentAttack > 0 && followUp[currentAttack]) {
      var s = getFleetString(repairedFleet(result[currentAttack-1].attackers));
      attFleet[currentAttack] = s;
      setSetting("bcAttFleet"+currentAttack, s);
      calculate();
      updateFleet();
      updateCombatResult();
    }
    else {
      updateFleet();
    }
  }

  function clearFollowUp()
  {
    if (currentAttack > 0) {
      var elem = document.getElementById("bcFollowUpAttack");
      if (!elem) return;
      elem.checked = false;
      followUp[currentAttack] = false;
      setSetting("bcFollowUp"+currentAttack, "");
    }
  }

  function clearFleet(e)
  {
    attFleet[0] = "";
    setSetting("bcAttFleet"+currentAttack, "");
    defFleet[0] = "";
    setSetting("bcDefFleet", "");
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function baseOwnerChanged(e)
  {
    var v = e.target.value;
    e.target.setAttribute("class", "bc"+v+"Select");
    if (v == "Defender") {
      for (var i = 0; i < numAttacks; i++) {
	baseOwner[i] = v;
      }
    }
    else {
      for (var i = 0; i < numAttacks; i++) {
	if (baseOwner[i] == "Defender")
	  baseOwner[i] = "";
      }
    }
    baseOwner[currentAttack] = v;
    for (var i = 0; i < numAttacks; i++) {
      setSetting("bcBaseOwner"+i, baseOwner[i]);
    }
    updateBaseDefenses();
    calculate();
    updateCombatResult();
  }

  function commanderChanged(e)
  {
    var v = e.target.value;
    tacticalCommander = 0;
    defenseCommander = 0;
    if (startsWith(v, "T")) {
      tacticalCommander = Number(v.substring(1));
    }
    else if (startsWith(v, "D")) {
      defenseCommander = Number(v.substring(1));
    }
    setSetting("bcTacticalCommander", tacticalCommander);
    setSetting("bcDefenseCommander", defenseCommander);
    calculate();
    updateCombatResult();
  }

  function ccsChanged(e)
  {
    var v = e.target.value;
    ccs = Number(v);
    setSetting("bcCommandCenters", ccs);
    calculate();
    updateCombatResult();
  }

  function defensePercentChanged(e)
  {
    var v = e.target.value;
    v = v.replace(/[^0-9\.]/g, "");
    var nv = Number(v);
    if (nv > 100) {
      nv = 100; v = "100";
    }
    e.target.value = v;
    setSetting("bcDefensePercent", v);
    defensePercent[currentAttack] = nv;
    calculate();
    updateCombatResult();
  }

  function turretChanged(e)
  {
    var id = e.target.getAttribute("id");
    var v = e.target.value;
    setSetting(id, v);
    calculate();
    updateCombatResult();
  }

  function updateFighterChoke()
  {
    var elem = document.getElementById("bcFighterChoke");
    if (elem) {
      if (defenderLevel / attackerLevel[currentAttack] < 0.65) {
	elem.innerHTML = "Fighter damage choked!";
	elem.title = "TODO.  Fighter damage choking not implemented yet.";
      }
      else {
	elem.innerHTML = "No fighter damage choking.";
      }
    }
  }

  function attackerLevelChanged(e)
  {
    var v = e.target.value;
    v = v.replace(/[^0-9\.]/g, "");
    e.target.value = v;
    setSetting("bcAttackerLevel", v);
    attackerLevel[currentAttack] = Number(v);
    updateFighterChoke();
    calculate();
    updateCombatResult();
  }

  function defenderLevelChanged(e)
  {
    var v = e.target.value;
    v = v.replace(/[^0-9\.]/g, "");
    e.target.value = v;
    setSetting("bcDefenderLevel", v);
    defenderLevel = Number(v);
    updateFighterChoke();
    calculate();
    updateCombatResult();
  }

  function techChanged(side)
  {
    var techs = [];
    for (var tech in techName) {
      var elem = document.getElementById("bc"+side+"Tech"+tech);
      if (elem) {
	techs.push(tech+elem.value);
      }
    }
    techs = techs.join(" ");
    setSetting("bc"+side+"Tech"+currentAttack, techs);
    return techs;
  }

  function attTechChanged(e)
  {
    attTech[currentAttack] = techChanged("Att");
    calculate();
    updateCombatResult();
  }

  function defTechChanged(e)
  {
    defTech = techChanged("Def");
    calculate();
    updateCombatResult();
  }

  function computeFullDrop(unit)
  {
    clearFollowUp();
    var t = new Date().getTime();
    var p = attackerStats(unit).power;
    var a = fleetMeatArmor(result[currentAttack]._defenders);
    var min = Math.ceil(a / p);
    var max = min*4;
    var i = 0;
    while (min < max && i++ < 50) {
      var mid = Math.floor((min+max)/2);
      var s = mid + " "+unit;
      attFleet[currentAttack] = s;
      var r = singleAttack(currentAttack);
      var a = fleetMeatArmor(r.defenders);
      if (a > 0) {
	min = mid+1;
      }
      else {
	max = mid;
      }
    }
    var t = new Date().getTime() - t;
    if (false) {
      GM_log("Computed full drop in "+i+" iterations and "
	     +t+" milliseconds: "+min+" "+plural(min, unit));
    }
    var s = min + " " + unit;
    attFleet[currentAttack] = s;
    setSetting("bcAttFleet"+currentAttack, s);
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function computePartialDrop(unit)
  {
    clearFollowUp();
    var t = new Date().getTime();
    var p = attackerStats(unit).power;
    var a = fleetMeatArmor(result[currentAttack]._defenders);
    var b = fleetFighterArmor(result[currentAttack]._defenders);
    var min = Math.ceil((a-b)/p);
    var max = Math.ceil(a/p)*4;
    var i = 0;
    while (min < max && i++ < 50) {
      var mid = Math.floor((min+max)/2);
      var s = mid + " " + unit;
      attFleet[currentAttack] = s;
      var r = singleAttack(currentAttack);
      var a = fleetMeatArmor(r.defenders) - fleetFighterArmor(r.defenders);
      if (a > 0) {
	min = mid+1;
      }
      else {
	max = mid;
      }
    }
    var t = new Date().getTime() - t;
    if (false) {
      GM_log("Computed partial drop in "+i+" iterations and "
	     +t+" milliseconds: "+min+" "+plural(min, unit));
    }
    var s = min + " " + unit;
    attFleet[currentAttack] = s;
    setSetting("bcAttFleet"+currentAttack, s);
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function fullFighterDrop(e)
  {
    computeFullDrop("Fighters");
  }

  function partialFighterDrop(e)
  {
    computePartialDrop("Fighters");
  }

  function fullBomberDrop(e)
  {
    computeFullDrop("Bombers");
  }

  function partialBomberDrop(e)
  {
    computePartialDrop("Bombers");
  }

  function computeHBDrop(justCarriers)
  {
    clearFollowUp();

    function unitsRequired(stats, fleet)
    {
      var r = 0;
      for (var i = 0; i < fleet.length; i++) {
	if (!fleet[i].turret && fleet[i].count > 0) {
	  if (fleet[i].stats.shielding > 0 &&
	      fleet[i].stats.shielding < stats.power) {
	    if (!justCarriers || fleet[i].unit == "Carrier") {
	      var damage = stats.singleAttackDamage(fleet[i].stats);
	      r += fleet[i].count * fleet[i].stats.armor / damage;
	    }
	  }
	}
      }
      return r;
    }

    var t = new Date().getTime();
    var unit = "Heavy Bombers";
    var stats = attackerStats(unit);
    var min = unitsRequired(stats, result[currentAttack]._defenders);
    var max = min*20;
    var i = 0;
    while (min < max && i++ < 50) {
      var mid = Math.floor((min+max)/2);
      var s = mid + " "+unit;
      attFleet[currentAttack] = s;
      var r = singleAttack(currentAttack);
      var a = unitsRequired(stats, r.defenders);
      if (a > 0) {
	min = mid+1;
      }
      else {
	max = mid;
      }
    }
    var t = new Date().getTime() - t;
    if (false) {
      GM_log("Computed full drop in "+i+" iterations and "
	     +t+" milliseconds: "+min+" "+plural(min, unit));
    }
    var s = min + " " + unit;
    attFleet[currentAttack] = s;
    setSetting("bcAttFleet"+currentAttack, s);
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function fullHBDrop(e)
  {
    computeHBDrop(false);
  }

  function partialHBDrop(e)
  {
    computeHBDrop(true);
  }

  function shieldRape(e)
  {
    clearFollowUp();
    var maxPower = 0;
    var d = result[currentAttack]._defenders;
    for (var i = 0; i < d.length; i++) {
      maxPower = Math.max(maxPower, d[i].stats.power);
    }
    var rapeUnit = false;
    for (var unit in set("Cruiser", "Heavy Cruiser", "Battleship",
			 "Dreadnought", "Titan", "Leviathan", "Death Star")) {
      var stats = attackerStats(unit);
      if (maxPower < stats.shielding) {
	var rapeUnit = unit;
	break;
      }
    }
    if (rapeUnit) {
      // Pure shield rape
      var r = singleAttackerCombat(attackerStats(rapeUnit), d);
      attFleet[currentAttack] = r.required + " " + rapeUnit;
    }
    else {
      // No pure shield rapes are possible - try all of them
      // and see which gets the best ratio
      var bestUnit = false;
      var lowestLoss = 0;
      var required = 0;
      for (var unit in set("Cruiser", "Heavy Cruiser", "Battleship",
			   "Dreadnought", "Titan", "Leviathan",
			   "Death Star")) {
	var stats = attackerStats(unit);
	var r = singleAttackerCombat(stats, d);
	var loss = Math.floor(r.lost) * stats.cost
	  + Math.round(r.lost - Math.floor(r.lost)) * stats.cost / 2;
	if (!bestUnit || loss < lowestLoss) {
	  bestUnit = unit;
	  lowestLoss = loss;
	  required = r.required;
	}
      }
      attFleet[currentAttack] = required + " " + bestUnit;
    }
    setSetting("bcAttFleet"+currentAttack, attFleet[currentAttack]);
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function fighterSwarm(e)
  {
    clearFollowUp();
    var r = singleAttackerCombat(attackerStats("Fighters"),
				 result[currentAttack]._defenders);
    attFleet[currentAttack] = r.required + " Fighters";
    setSetting("bcAttFleet"+currentAttack, attFleet[currentAttack]);
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function finisherAttack(e)
  {
    clearFollowUp();
    var maxShielding = 0;
    var d = result[currentAttack]._defenders;
    for (var i = 0; i < d.length; i++) {
      maxShielding = Math.max(maxShielding, d[i].stats.shielding);
    }
    var topUnit = false;
    for (var unit in set("Fighters", "Destroyer", "Frigate", "Cruiser",
			 "Heavy Cruiser", "Battleship", "Dreadnought")) {
      var stats = attackerStats(unit);
      if (maxShielding < stats.power) {
	var topUnit = unit;
	break;
      }
    }
    if (!topUnit) {
      return;
    }
    else if (topUnit == "Fighters") {
      var meat = [];
    }
    else if (topUnit == "Destroyer" || topUnit == "Frigate") {
      var meat = ["Fighters"];
    }
    else {
      var meat = ["Fighters", "Bombers", "Corvette", "Destroyer"];
      if (topUnit == "Dreadnought") {
	meat.push("Frigate");
      }
    }
    meat.push(topUnit);
    var a = meat.map(attackerStats);
    var best = noOverflowCombat(a, d);
    var lowestLoss = fleetSize(best);
    var topUnitCost = unitStats[topUnit].cost;

    for (var unit in set("Cruiser", "Heavy Cruiser",
			 "Battleship", "Dreadnought")) {
      var stats = attackerStats(unit);
      if (stats.cost >= topUnitCost) {
	var a = [attackerStats("Fighters"), attackerStats(unit)];
	var f = noOverflowCombat(a, d);
	var loss = fleetSize(f);
	if (loss < lowestLoss) {
	  best = f;
	  lowestLoss = loss;
	  topUnit = unit;
	}
      }
    }

    var min = best[best.length-1].count;
    var max = singleAttackerCombat(attackerStats(topUnit), d).required;
    var i = 0;
    while (min < max && i++ < 50) {
      var mid = Math.floor((min+max)/2);
      best[best.length-1].count = mid;
      attFleet[currentAttack] = fleetString(best);
      var r = singleAttack(currentAttack);
      if (fleetIsAlive(r.defenders)) {
	min = mid+1;
      }
      else {
	max = mid;
      }
    }
    best[best.length-1].count = min;
    attFleet[currentAttack] = fleetString(best);
    setSetting("bcAttFleet"+currentAttack, attFleet[currentAttack]);
    calculate();
    updateFleet();
    updateCombatResult();
  }

  function keyUpListener(onChange)
  {
    var count = 0;
    var event = null;
    
    function timeout() {
      if (--count == 0) {
	onChange(event);
      }
    }

    function listener(e) {
      count++;
      event = e;
      window.setTimeout(timeout, 300);
    }

    return listener;
  }

  function addListeners()
  {
    for (var unit in unitStats) {
      var elem = document.getElementById("bcAttUnit"+unit);
      if (elem) {
	elem.addEventListener("keyup", keyUpListener(attFleetChanged), false);
	elem.addEventListener("change", attFleetChanged, false);
      }
      var elem = document.getElementById("bcDefUnit"+unit);
      if (elem) {
	elem.addEventListener("keyup", keyUpListener(defFleetChanged), false);
	elem.addEventListener("change", defFleetChanged, false);
      }
    }
    var elem = document.getElementById("bcFollowUpAttack");
    if (elem) {
      elem.addEventListener("change", followUpChanged, false);
    }
    var elem = document.getElementById("bcClearFleet");
    if (elem) {
      elem.addEventListener("click", clearFleet, false);
    }
    var elem = document.getElementById("bcBaseOwner");
    if (elem) {
      elem.addEventListener("change", baseOwnerChanged, false);
    }
    var elem = document.getElementById("bcCommander");
    if (elem) {
      elem.addEventListener("change", commanderChanged, false);
    }
    var elem = document.getElementById("bcCommandCenters");
    if (elem) {
      elem.addEventListener("change", ccsChanged, false);
    }
    var elem = document.getElementById("bcDefensePercent");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(defensePercentChanged), false);
      elem.addEventListener("change", defensePercentChanged, false);
    }
    for (var turret in turretStats) {
      var elem = document.getElementById("bcTurret"+turret);
      if (elem) {
	elem.addEventListener("change", turretChanged, false);
      }
    }
    var elem = document.getElementById("bcAttackerLevel");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(attackerLevelChanged), false);
      elem.addEventListener("change", attackerLevelChanged, false);
    }
    var elem = document.getElementById("bcDefenderLevel");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(defenderLevelChanged), false);
      elem.addEventListener("change", defenderLevelChanged, false);
    }
    for (var tech in techName) {
      var elem = document.getElementById("bcAttTech"+tech);
      if (elem) {
	elem.addEventListener("change", attTechChanged, false);
      }
      var elem = document.getElementById("bcDefTech"+tech);
      if (elem) {
	elem.addEventListener("change", defTechChanged, false);
      }
    }
    var elem = document.getElementById("bcFullFighterDrop");
    if (elem) {
      elem.addEventListener("click", fullFighterDrop, false);
    }
    var elem = document.getElementById("bcPartialFighterDrop");
    if (elem) {
      elem.addEventListener("click", partialFighterDrop, false);
    }
    var elem = document.getElementById("bcFullBomberDrop");
    if (elem) {
      elem.addEventListener("click", fullBomberDrop, false);
    }
    var elem = document.getElementById("bcPartialBomberDrop");
    if (elem) {
      elem.addEventListener("click", partialBomberDrop, false);
    }
    var elem = document.getElementById("bcFullHBDrop");
    if (elem) {
      elem.addEventListener("click", fullHBDrop, false);
    }
    var elem = document.getElementById("bcPartialHBDrop");
    if (elem) {
      elem.addEventListener("click", partialHBDrop, false);
    }
    var elem = document.getElementById("bcShieldRape");
    if (elem) {
      elem.addEventListener("click", shieldRape, false);
    }
    var elem = document.getElementById("bcFighterSwarm");
    if (elem) {
      elem.addEventListener("click", fighterSwarm, false);
    }
    var elem = document.getElementById("bcFinisherAttack");
    if (elem) {
      elem.addEventListener("click", finisherAttack, false);
    }
  }

  updateBaseInfo();
  updateBaseDefenses();
  updateDefTech();
  calculate();
  selectAttack(currentAttack);
  addListeners();
}

function displayBattleCalculator()
{
  var link = document.getElementById("battleCalculatorLink");
  var row = link.parentNode.parentNode;
  var topTable = parentTable(row);
  var empireMenu = false;
  if (getFlag("insertEmpireMenu"))
    empireMenu = document.getElementById("empire_menu");
  var seenTheMenu = false;
  var n = topTable.nextSibling;
  while (n) {
    if (!empireMenu || seenTheMenu) {
      n.style.display = "none";
    }
    if (n == empireMenu) {
      seenTheMenu = true;
    }
    n = n.nextSibling;
  }
  for (var i = 0; i < row.cells.length; i++) {
    var color = (i == row.cells.length-1) ? "#333399": "transparent";
    row.cells[i].setAttribute("style", "background-color: "+color);
  }
  var ids = ["account", "messages", "credits", "board"];
  for (var i = 0; i < ids.length; i++) {
    var elem = document.getElementById(ids[i]);
    elem.setAttribute("style", "background-color: transparent");
  }
  if (empireMenu) {
    var cells = empireMenu.rows[0].cells;
    for (var i = 0; i < cells.length; i++) {
      cells[i].setAttribute("style", "background-color: transparent");
    }
  }
  document.title = "Battle Calculator";
  var div = makeBattleCalculatorDiv();
  document.body.appendChild(div);
  initBattleCalculator();
}

function insertBattleCalculator()
{
  var elem = document.getElementById("bookmarks");
  if (elem && elem.nodeName == "TH") {
    var row = elem.parentNode;
    var account = document.getElementById("account");
    if (account) {
      var t = parentTable(account);
      if (t) {
	t.parentNode.setAttribute("colspan", "5");
	for (var i = 0; i < row.cells.length; i++) {
	  row.cells[i].setAttribute("width", "11%");
	}
	row.innerHTML += "<th width='12%'><a href='javascript:;' "
	  +"id='battleCalculatorLink'>Battle&nbsp;Calc</a></th>";
      }
    }
  }
  var link = document.getElementById("battleCalculatorLink");
  var shown = false;

  function showBattleCalculator(e)
  {
    if (shown) {
      return;
    }
    shown = true;
    displayBattleCalculator();
  }

  link.addEventListener("click", showBattleCalculator, false);
}

function openBattleCalculator(attackers, defenders, attTech, defTech,
			      baseOwner, attackerLevel, defenderLevel, ccs,
			      tacticalCommander, defenseCommander,
			      defensePercent)
{
  setSetting("bcNumAttacks", 1);
  setSetting("bcCurrentAttack", 0);
  setSetting("bcAttFleet0", fleetString(attackers));
  setSetting("bcDefFleet", fleetString(defenders));
  setSetting("bcAttTech0", attTech);
  setSetting("bcDefTech", defTech);
  setSetting("bcBaseOwner0", baseOwner);
  if (attackerLevel != undefined)
    setSetting("bcAttackerLevel0", decimalFormat(attackerLevel, 2));
  if (defenderLevel != undefined)
    setSetting("bcDefenderLevel", decimalFormat(defenderLevel, 2));
  if (ccs != undefined)
    setSetting("bcCommandCenters", ccs);
  if (tacticalCommander != undefined)
    setSetting("bcTacticalCommander", tacticalCommander);
  if (defenseCommander != undefined)
    setSetting("bcDefenseCommander", defenseCommander);
  if (defensePercent != undefined)
    setSetting("bcDefensePercent", decimalFormat(defensePercent, 2));
  if (baseOwner == "Defender") {
    for (var turret in turretStats) {
      setSetting("bcTurret"+turret, 0);
    }
    for (var i = 0; i < defenders.length; i++) {
      if (defenders[i].turret) {
	var n = defenders[i].count * 100 / defensePercent;
	n = Math.round(n/5)*5;
	setSetting("bcTurret"+defenders[i].turret, n);
      }
    }
  }
  displayBattleCalculator();
}

function projectCombatResult()
{
  var info = xpath1("//div[@class='battle-report']//table[@class='battle-report_info']");
  var attack = xpath1("//div[@class='battle-report']//table[@class='battle-report_attack']");
  var defense = xpath1("//div[@class='battle-report']//table[@class='battle-report_defense']");
  if (!info || !attack || !defense)
    return;

  var attackerLevel = 0;
  var defenderLevel = 0;
  var baseOwner = "";
  var defensePercent = 0;
  var commandCenters = 0;
  var tacticalCommander = 0;
  var defenseCommander = 0;

  for (var i = 0; i < info.rows.length; i++) {
    var cells = info.rows[i].cells;
    if (cells.length == 0) continue;
    var txt = cells[0].textContent;
    if (txt == "Attack Force") {
      var txt = info.rows[i+1].cells[1].textContent;
      if (txt.match(/lvl (.*?)$/)) {
	attackerLevel = Number(RegExp.$1);
      }
    }
    else if (txt == "Defensive Force") {
      var txt = info.rows[i+1].cells[1].textContent;
      if (txt.match(/lvl (.*?)$/)) {
	defenderLevel = Number(RegExp.$1);
      }
    }
    else if (txt == "Base") {
      if (defenderLevel == 0) {
	baseOwner = "Attacker";
      }
      else {
	baseOwner = "Defender";
      }
    }
    else if (txt == "Start Defenses") {
      var txt = cells[1].textContent;
      if (txt.match(/^([\d\.]+)%$/)) {
	defensePercent = Number(RegExp.$1);
      }
    }
    else if (txt == "Command Centers") {
      commandCenters = Number(cells[1].textContent);
    }
    else if (txt == "Commander") {
      var txt = cells[1].textContent;
      if (txt.match(/\(Tactical (\d+)\)/)) {
	tacticalCommander = Number(RegExp.$1);
      }
      else if (txt.match(/\(Defense (\d+)\)/)) {
	defenseCommander = Number(RegExp.$1);
      }
    }
  }

  var attackers = [];
  var bonus = 0;
  for (var i = 2; i < attack.rows.length; i++) {
    var cells = attack.rows[i].cells;
    var unit = cells[0].textContent;
    var count = Number(cells[1].textContent);
    var stats = unitStats[unit];
    if (stats) {
      bonus = Math.max(bonus, stats.bonus);
      attackers.push({"unit": unit, "count": count, "stats": stats});
    }
  }
  var myTech = getMyTech();
  if (baseOwner == "Attacker") {
    var ccs = commandCenters;
    var tac = tacticalCommander;
  }
  else {
    var ccs = 0;
    var tac = 0;
  }
  for (var i = 0; i < attackers.length; i++) {
    attackers[i].stats
      = attackers[i].stats.adjustedStats(myTech, bonus, ccs, tac);
  }

  var defenders = [];
  var bonus = 0;
  for (var i = 2; i < defense.rows.length; i++) {
    var cells = defense.rows[i].cells;
    var unit = cells[0].textContent;
    var count = Number(cells[1].textContent);
    var power = Number(cells[3].textContent);
    var armor = Number(cells[4].textContent);
    var shielding = Number(cells[5].textContent);
    var stats = unitStats[unit];
    if (stats) {
      bonus = Math.max(bonus, stats.bonus);
      defenders.push({"unit": unit, "count": count, "stats": stats,
			 "power": power, "armor": armor,
			 "shielding": shielding});
    }
    else {
      var stats = turretStats[unit];
      if (stats) {
	defenders.push({"turret": unit, "count": count, "stats": stats,
			   "power": power, "armor": armor,
			   "shielding": shielding});
      }
    }
  }

  if (baseOwner == "Defender") {
    var ccs = commandCenters;
    var tac = tacticalCommander;
    var def = defenseCommander;
  }
  else {
    var ccs = 0;
    var tac = 0;
    var def = 0;
  }
  var defTechLevel = {};
  for (var tech in techName) {
    defTechLevel[tech] = 0;
  }
  for (var i = 0; i < defenders.length; i++) {
    var d = defenders[i];
    if (d.shielding > 0) {
      var sh = (d.shielding / d.stats.shielding - 1) / 0.05;
      defTechLevel["SH"] = Math.round(sh);
    }
    if (d.unit) {
      var a = (d.armor / (1+bonus) / d.stats.armor - 1) / 0.05;
      defTechLevel["A"] = Math.round(a);
      var w = (d.power / (1+bonus) / d.stats.power /
	       (1 + ccs*0.05 + tac*0.01) - 1) / 0.05;
      defTechLevel[d.stats.weapon] = Math.round(w);
    }
    else {
      var a = (d.armor / d.stats.armor / (1+def*0.01) - 1) / 0.05;
      defTechLevel["A"] = Math.round(a);
      var w = (d.power / d.stats.power / (1+def*0.01) - 1) / 0.05;
      defTechLevel[d.stats.weapon] = Math.round(w);
    }
  }
  var defTech = [];
  for (var t in defTechLevel) {
    defTech.push(t + defTechLevel[t]);
  }
  defTech = defTech.join(" ");
  for (var i = 0; i < defenders.length; i++) {
    if (defenders[i].unit) {
      defenders[i].stats = defenders[i].stats.adjustedStats(defTech, bonus,
							    ccs, tac);
    }
    else {
      defenders[i].stats = defenders[i].stats.adjustedStats(defTech, def);
    }
  }
  var div = document.createElement("div");
  div.innerHTML = "<br/><center><small>Defender's technology levels: "
    +defTech+"</small><br/><a href='javascript:;' id='openInBCLink'>"
    +"Open in Battle Calculator</a></center>";
  document.body.appendChild(div);

  function listener(e) {
    openBattleCalculator(attackers, defenders, myTech, defTech, baseOwner,
			 attackerLevel, defenderLevel, commandCenters,
			 tacticalCommander, defenseCommander, defensePercent);
  }
  var link = document.getElementById("openInBCLink");
  link.addEventListener("click", listener, true);
}

function plural(n, s)
{
  if (!s) {
    return ""+n;
  }
  if (n == 1) {
    if (endsWith(s, "s"))
      return s.substring(0, s.length-1);
    else
      return s;
  }
  else {
    if (endsWith(s, "s"))
      return s;
    else
      return s + "s";
  }
}

function insertProductionWizard(base)
{
  var outerTable = document.getElementById("base_production");
  if (!outerTable) return;
  var form = childForm(outerTable.rows[1].cells[0]);
  if (form.nodeName != "FORM") return;
  var t = form.firstChild;
  if (t.nodeName != "TABLE") return;
  var realProd = Number(document.getElementById('base_prod').title);
  var credits = document.getElementById("credits");
  if (!credits) return;
  credits = parseNum(credits.nextSibling.textContent);
  
  // Find the completion time of the last item currently in the queue,
  // a.k.a. the time at which the next production item will start
  var startTime = false;
  var x = xpath("//table[@id='base_events-production']//td[starts-with(@id, 'time')]");
  if (x.length > 0) {
    var seconds = x[x.length-1].getAttribute("title");
    startTime = new Date(pageLoadTime.getTime() + seconds*1000);
  }

  // Find all units that we can produce at this base
  var available = {};
  var x = xpath("//table[@id='base_production']//tr[starts-with(@id, 'row')]/td[@class='dropcap']/b/a");
  for (var i = 0; i < x.length; i++) {
    var href = x[i].getAttribute("href");
    if (href) {
      if (href.match(/base\.aspx\?base=\d{1,20}&view=production&info=(.*)$/)) {
	var unit = RegExp.$1;
	var text = x[i].parentNode.parentNode.textContent;
	if (text.match(/\((.*?) Available\)/i)) {
	  var n = parseNum(RegExp.$1);
	  available[unit] = n;
	}
	else {
	  available[unit] = 0;
	}
      }
    }
  }

  var html = "<tr class='nohighlight'>";
  html += "<td style='padding-bottom:10px' colspan='6' align='center'>";
  html += "<small><a href='javascript:;' id='toggleProductionWizard'></a>";
  html += "</small></td></tr>";
  t.firstChild.innerHTML = html + t.firstChild.innerHTML;

  html = "<tr class='nohighlight' rowType='wizard' style='display:none'>";
  html += "<td colspan='6' align='center'>";
  html += "<table style='background:none;border:0px' cellpadding='2'>";

  // Step 1
  html += "<tr><td width='60'><b>Step 1.</b></td>";
  html += "<td width='210'><b>Select units to produce:</b></td>";
  html += "<td width='160' align='right'>";
  html += "<select id='prodWizardUnit' onChange='updateWizard()'>";
  for (var unit in available) {
    var n = available[unit];
    if (n == 0) {
      a = "";
    }
    else {
      a = " ("+commaFormat(n)+" available)";
    }
    html += "<option value='"+unit+"'>"+plural(2, unit)+a+"</option>";
  }
  html += "</select></td><td></td></tr>";
  html += "<tr id='prodWizardFillHangarsText'><td></td><td><b>";
  html += "Fill hangars?</b></td>";
  html += "<td align='right'><select id='prodWizardHangarUnit' onChange='updateWizard()'>";
  html += "<option value=''>No</option>";
  for (var unit in available) {
    if (unitStats[unit].hangars < 0) {
      html += "<option value='"+unit+"'>With "+plural(2, unit)+"</option>";
    }
  }
  html += "</select></td><td></td></tr>";
  html += "<tr><td>&nbsp;</td></tr>";

  // Step 2
  html += "<tr><td><b>Step 2.</b></td>";
  html += "<td><span id='prodWizardQuantityText'>";
  html += "<input type='radio' value='true' ";
  html += "id='prodWizardByQuantity' onClick='toggleByQuantity(true)' ";
  html += "style='cursor:pointer' />";
  html += "<b><a onClick='toggleByQuantity(true)' style='cursor:pointer'>";
  html += "Enter quantity to produce:</a></b></span></td><td colspan='2'>";
  html += "<input size='5' maxlength='5' class='input-numeric quant' ";
  html += "type='text' id='prodWizardQuantity' onKeyUp='updateWizard()' />";
  html += " <small><span id='prodWizardPlusLinks' style='display:none'>";
  for (var i = 1; i <= 10000; i *= 10) {
    var txt = (i >= 1000) ? (i/1000)+"k" : i;
    var code = 'var e = document.getElementById("prodWizardQuantity");';
    code += ' e.value = Math.min(99999, Number(e.value)+'+i+');';
    code += ' updateWizard();';
    html += "&nbsp;<a href='javascript:;' onClick='"+code+"'>+"+txt+"</a>";
  }
  var code = 'document.getElementById("prodWizardQuantity").value="";';
  code += ' updateWizard();';
  html += "&nbsp;<a href='javascript:;' onClick='"+code+"'>reset</a> ";
  html += "</span><span id='prodWizardGrayPlusLinks' style='color:gray'>";
  for (var i = 1; i <= 10000; i *= 10) {
    var txt = (i >= 1000) ? (i/1000)+"k" : i;
    html += "&nbsp;+"+txt;
  }
  html += "&nbsp;reset</div></small>";
  html += "</td></tr><tr id='prodWizardDeadlineText'><td></td><td>";
  html += "<input type='radio' value='false' ";
  html += "id='prodWizardByDeadline' onClick='toggleByQuantity(false)' ";
  html += "style='cursor:pointer' />";
  html += "<b><a onClick='toggleByQuantity(false)' style='cursor:pointer'>";
  html += "OR production deadline:</a></b></td><td colspan='2'>";
  html += "<select id='prodWizardDeadlineDay' onChange='updateWizard()'>";
  html += "<option value='0'>Set deadline...</option>";
  var time = new Date(startTime? startTime.getTime() : pageLoadTime.getTime());
  time.setUTCHours(0);
  time.setUTCMinutes(0);
  time.setUTCSeconds(0);
  time.setUTCMilliseconds(0);
  for (var i = 0; i < 100; i++) {
    html += "<option value='"+time.getTime()+"'>"+formatDate(time)+"</option>";
    time.setUTCDate(time.getUTCDate()+1);
  }
  html += "</select><b>@</b>";
  html += "<select id='prodWizardDeadlineHour' onChange='updateWizard()'>";
  for (var i = 0; i < 24; i++) {
    html += "<option value='"+i+"'>"+zeroPad(i,2)+"</option>";
  }
  html += "</select><b>:</b>";
  html += "<select id='prodWizardDeadlineMinute' onChange='updateWizard()'>";
  for (var i = 0; i < 60; i += 5) {
    html += "<option value='"+i+"'>"+zeroPad(i,2)+"</option>";
  }
  html += "</select></td></tr>";
  html += "<tr><td></td>";
  html += "<td colspan='3'><input type='checkbox' style='cursor:pointer' ";
  html += "id='prodWizardFast' onChange='updateWizard()' /> ";
  html += "Fast production - pay <b>double</b> to cut the production ";
  html += "time in half</td></tr>";
  html += "<tr><td>&nbsp;</td></tr>";

  // Step 3
  html += "<tr><td><b>Step 3.</b></td>";
  html += "<td colspan='3'><b>Review the production order:</b></td></tr>";
  html += "<tr id='prodWizardHangarRow'><td></td>";
  html += "<td id='prodWizardHangarCell'></td>";
  html += "<td id='prodWizardHangarCostCell' align='right'></td>";
  html += "<td></td></tr>";
  html += "<tr><td></td><td id='prodWizardUnitCell'></td>";
  html += "<td id='prodWizardUnitCostCell' align='right'></td><td></td></tr>";
  html += "<tr id='prodWizardFastProdRow'><td></td>";
  html += "<td>Fast production fee:</td>";
  html += "<td id='prodWizardFastProdCell' align='right'><td></td></tr>";
  html += "<tr id='prodWizardTotalRow'><td></td>";
  html += "<td style='padding-bottom:12px'>Total cost:</td>";
  html += "<td id='prodWizardTotalCostCell' align='right' ";
  html += "style='padding-bottom:12px'></td><td></td></tr>";
  html += "<tr><td></td><td>Total production time:</td>";
  html += "<td id='prodWizardTimeCell' align='right'></td><td></td></tr>";
  html += "<tr><td></td><td>Start time:</td>";
  html += "<td id='prodWizardStartTimeCell' align='right'></td><td></td></tr>";
  html += "<tr><td></td><td>Completion time:</td>";
  html += "<td id='prodWizardEndTimeCell' align='right'></td><td></td></tr>";
  html += "<tr><td colspan='4'>&nbsp;</td></tr>";

  // Step 4
  html += "<tr><td><b>Step 4.</b></td><td><b>Confirm your order:</b></td>";
  html += "<td colspan='2'><input type='submit' value='Confirm' /> ";
  html += "&nbsp; <b><span id='prodWizardTotalCostSpan'></span></b></td></tr>";
  html += "<tr><td colspan='3' align='right' id='prodWizardFastWarning' ";
  html += "style='padding-top:0px;padding-bottom:5px;color:yellow'>";
  html += "<small>Fast production is checked!</small></td><td></td></tr>";
  html += "<tr><td colspan='4' align='center'>";
  html += "Effective production capacity: "
    + Math.round(realProd*10)/10 + " credits/hour - "
    + commaFormat(Math.round(realProd*24)) + " credits/day - "
    + commaFormat(Math.round(realProd*24*7)) + " credits/week";
  html += "</td></tr></table></td></tr>";
  t.firstChild.innerHTML += html;
  
  var unitSelect = document.getElementById("prodWizardUnit");
  var hangarUnitSelect = document.getElementById("prodWizardHangarUnit");
  var fastCheckbox = document.getElementById("prodWizardFast");
  var quantityInput = document.getElementById("prodWizardQuantity");
  var daySelect = document.getElementById("prodWizardDeadlineDay");
  var hourSelect = document.getElementById("prodWizardDeadlineHour");
  var minuteSelect = document.getElementById("prodWizardDeadlineMinute");

  // Initialize wizard from saved settings
  var unit = getSetting("prodWizardUnit", "");
  if (available[unit] != undefined) {
    unitSelect.value = unit;
  }    
  var hangarUnit = getSetting("prodWizardHangarUnit", "");
  if (available[hangarUnit] != undefined) {
    hangarUnitSelect.value = hangarUnit;
  }
  fastCheckbox.checked = getSetting("prodWizardFast", false);
  var byQuantity = getSetting("prodWizardByQuantity", true);
  document.getElementById("prodWizardByQuantity").checked = byQuantity;
  document.getElementById("prodWizardByDeadline").checked = !byQuantity;
  if (byQuantity) {
    var q = getSetting("prodWizardQuantity", "");
    quantityInput.value = (q == 0) ? "" : q;
  }
  else {
    var day = Number(getSetting("prodWizardDeadlineDay", 0));
    var dayValue = 0;
    for (var i = 0; i < daySelect.options.length; i++) {
      var v = Number(daySelect.options[i].value);
      if (v <= day) {
	dayValue = v;
      }
      else {
	break;
      }
    }
    daySelect.value = dayValue;
    hourSelect.value = getSetting("prodWizardDeadlineHour", 0);
    minuteSelect.value = getSetting("prodWizardDeadlineMinute", 0);
  }
  // Assign rowTypes to prepare for hide/show magic
  var link = document.getElementById("toggleProductionWizard");
  for (var i = 1; i < t.rows.length; i++) {
    if (!t.rows[i].getAttribute("rowType")) {
      if (t.rows[i].style.display == "none") {
	t.rows[i].setAttribute("rowType", "notDisplayed");
      }
    }
  }

  function toggleWizard(event) {
    showWizard = !showWizard;
    for (var i = 1; i < t.rows.length; i++) {
      var a = t.rows[i].getAttribute("rowType");
      if (a && a == "notDisplayed") {
	t.rows[i].style.display = "none";
      }
      else if (a && a == "wizard") {
	t.rows[i].style.display = showWizard? "" : "none";
      }
      else {
	t.rows[i].style.display = showWizard? "none" : "";
      }
    }
    if (showWizard) {
      outerTable.rows[0].cells[0].textContent = "PRODUCTION WIZARD";
      link.textContent = "Show classic view";
    }
    else {
      outerTable.rows[0].cells[0].textContent = "PRODUCTION";
      link.textContent = "Show production wizard";
    }
    updateWizard();
  }
  link.addEventListener("click", toggleWizard, false);
  toggleWizard();

  function toggleByQuantity(on)
  {
    document.getElementById("prodWizardByQuantity").checked = on;
    document.getElementById("prodWizardByDeadline").checked = !on;
    updateWizard();
  }

  unsafeWindow.toggleByQuantity = function(on) {
    window.setTimeout(function() { toggleByQuantity(on); }, 0);
  };

  // Production time is calculated by updateWizard()
  // and also accessed by updateEndTime()
  var prodTime = 0;

  function updateWizard()
  {
    var fillHangarsText = document.getElementById("prodWizardFillHangarsText");
    var byQuantityRadio = document.getElementById("prodWizardByQuantity");
    var byDeadlineRadio = document.getElementById("prodWizardByDeadline");
    var quantityText = document.getElementById("prodWizardQuantityText");
    var deadlineText = document.getElementById("prodWizardDeadlineText");
    var plusLinks = document.getElementById("prodWizardPlusLinks");
    var grayPlusLinks = document.getElementById("prodWizardGrayPlusLinks");
    var unitCell = document.getElementById("prodWizardUnitCell");
    var unitCostCell = document.getElementById("prodWizardUnitCostCell");
    var hangarRow = document.getElementById("prodWizardHangarRow");
    var hangarCell = document.getElementById("prodWizardHangarCell");
    var hangarCostCell = document.getElementById("prodWizardHangarCostCell");
    var fastRow = document.getElementById("prodWizardFastProdRow");
    var fastCell = document.getElementById("prodWizardFastProdCell");
    var totalRow = document.getElementById("prodWizardTotalRow");
    var totalCostCell = document.getElementById("prodWizardTotalCostCell");
    var totalCostSpan = document.getElementById("prodWizardTotalCostSpan");
    var timeCell = document.getElementById("prodWizardTimeCell");
    var startTimeCell = document.getElementById("prodWizardStartTimeCell");
    var endTimeCell = document.getElementById("prodWizardEndTimeCell");
    var fastWarning = document.getElementById("prodWizardFastWarning");

    var unit = unitSelect.value;
    var hangarUnit = false;
    var quantity = 0;
    var fast = fastCheckbox.checked;
    if (fast) {
      fastRow.style.display = "";
    }
    else {
      fastRow.style.display = "none";
    }
    
    if (unitStats[unit].hangars > 0) {
      fillHangarsText.style.color = '';
      hangarUnitSelect.style.color = '';
      hangarUnitSelect.disabled = false;
      hangarUnit = hangarUnitSelect.value;
      if (hangarUnit.length == 0) {
	hangarUnit = false;
	hangarRow.style.display = "none";
      }
      else {
	hangarRow.style.display = "";
      }
    }
    else {
      fillHangarsText.style.color = 'gray';
      hangarUnitSelect.style.color = 'gray';
      hangarUnitSelect.value = '';
      hangarUnitSelect.disabled = true;
      hangarRow.style.display = "none";
    }
    if (hangarUnit || fast) {
      totalRow.style.display = "";
    }
    else {
      totalRow.style.display = "none";
    }
    if (!byQuantityRadio.checked && !byDeadlineRadio.checked) {
      byQuantityRadio.checked = true;
    }
    var hangarUnitsPerUnit = 0;
    if (hangarUnit) {
      hangarUnitsPerUnit
	= unitStats[unit].hangars / (-unitStats[hangarUnit].hangars);
    }
    if (byQuantityRadio.checked) {
      // Manually entered quantity
      deadlineText.style.color = 'gray';
      daySelect.style.color = 'gray';
      hourSelect.style.color = 'gray';
      minuteSelect.style.color = 'gray';
      daySelect.value = 0;
      hourSelect.value = 0;
      minuteSelect.value = 0;
      daySelect.disabled = true;
      hourSelect.disabled = true;
      minuteSelect.disabled = true;

      quantityText.style.color = '';
      quantityInput.disabled = false;
      quantityInput.readOnly = false;
      grayPlusLinks.style.display = 'none';
      plusLinks.style.display = '';

      quantity = Number("0"+quantityInput.value);
    }
    else {
      // Compute quantity from deadline
      deadlineText.style.color = '';
      daySelect.style.color = '';
      hourSelect.style.color = '';
      minuteSelect.style.color = '';
      daySelect.disabled = false;
      hourSelect.disabled = false;
      minuteSelect.disabled = false;

      quantityText.style.color = 'gray';
      quantityInput.disabled = true;
      quantityInput.readOnly = true;
      plusLinks.style.display = 'none';
      grayPlusLinks.style.display = '';

      var deadline = Number(daySelect.value);
      if (deadline > 0) {
	deadline += Number(hourSelect.value)*60*60*1000 +
	  Number(minuteSelect.value)*60*1000;

	if (startTime) {
	  var time = deadline - startTime.getTime();
	}
	else {
	  var time = deadline - currentTime.getTime();
	}
	if (time > 0) {
	  var hours = time / (1000 * 60 * 60);
	  var oneCost = unitStats[unit].cost;
	  if (hangarUnit) {
	    oneCost += hangarUnitsPerUnit*unitStats[hangarUnit].cost;
	  }
	  quantity = Math.floor(realProd * hours / oneCost * (fast? 2:1));
	  if (quantity == 0)
	    quantity = 1;
	}
      }
      quantityInput.value = (quantity == 0) ? "" : quantity;
    }
    var hangarQuantity = quantity * hangarUnitsPerUnit;
    var cost = unitStats[unit].cost * quantity;
    var hangarCost = 0;
    if (hangarUnit) {
      hangarCost = unitStats[hangarUnit].cost * hangarQuantity;
    }
    var totalCost = cost + hangarCost;
    if (fast) {
      fastCell.innerHTML = commaFormat(totalCost) + " credits";
      totalCost *= 2;
      fastWarning.style.visibility="";
    }
    else {
      fastWarning.style.visibility="hidden";
    }

    unitCell.innerHTML = commaFormat(quantity)+" "+plural(quantity, unit);
    unitCostCell.innerHTML = commaFormat(cost) + " credits";
    if (hangarUnit) {
      hangarCell.innerHTML = commaFormat(hangarQuantity)+" "
	+plural(hangarQuantity, hangarUnit);
      hangarCostCell.innerHTML = commaFormat(hangarCost) + " credits";
    }
    totalCostCell.innerHTML = commaFormat(totalCost) + " credits";
    var html = "Costs " + commaFormat(totalCost) + " credits";
    if (totalCost > credits) {
      html = "<font color='red'>"+html+"</font>";
    }
    totalCostSpan.innerHTML = html;

    prodTime = Math.ceil(totalCost * 3600 / realProd / (fast? 4:1));
    timeCell.innerHTML = formatCountdown(prodTime);
    if (startTime) {
      startTimeCell.innerHTML = formatUTC(startTime);
      var endTime = new Date(startTime.getTime() + prodTime*1000);
    }
    else {
      startTimeCell.innerHTML = "Right away";
      var endTime = new Date(currentTime.getTime() + prodTime*1000);
    }
    endTimeCell.innerHTML = formatUTC(endTime);

    // Update all the actual form elements in the "classic view"
    var elem = document.getElementById("fast");
    if (elem) {
      if (fast && !elem.checked) {
	elem.checked = true;
	unsafeWindow.change_fast();
      }
      if (!fast && elem.checked) {
	elem.checked = false;
	unsafeWindow.change_fast();
      }
    }
    for (var u in available) {
      var elem = document.getElementById("quant"+u);
      if (elem) {
	if (u == unit) {
	  elem.value = (quantity == 0) ? "" : quantity;
	}
	else if (u == hangarUnit) {
	  elem.value = (hangarQuantity == 0) ? "" : hangarQuantity;
	}
	else {
	  elem.value = '';
	}
	unsafeWindow.update(u);
      }
    }

    // Save settings
    setSetting("prodWizardUnit", unit);
    setSetting("prodWizardHangarUnit", hangarUnit);
    setSetting("prodWizardFast", fast);
    setSetting("prodWizardByQuantity", byQuantityRadio.checked);
    setSetting("prodWizardQuantity", quantity);
    setSetting("prodWizardDeadlineDay", daySelect.value);
    setSetting("prodWizardDeadlineHour", hourSelect.value);
    setSetting("prodWizardDeadlineMinute", minuteSelect.value);
  }

  function updateEndTime()
  {
    if (!startTime) {
      var endTimeCell = document.getElementById("prodWizardEndTimeCell");
      var endTime = new Date(currentTime.getTime() + prodTime*1000);
      endTimeCell.innerHTML = formatUTC(endTime);
    }
  }

  unsafeWindow.updateWizard = function() {window.setTimeout(updateWizard, 0);};
  updateWizard();
  // The end time may change continously
  if (!startTime) {
    window.setInterval(updateEndTime, 200);
  }
}

function zeroPad(n, digits)
{
  var s = n+"";
  while (s.length < digits)
    s = "0"+s;
  return s;
}

var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var longDayName = ["Sunday", "Monday", "Tuesday", "Wednesday",
		   "Thursday", "Friday", "Saturday"];
var monthName = ["Jan", "Feb", "March", "April", "May", "June",
		 "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function isToday(now, future)
{
  return (future.getUTCFullYear() == now.getUTCFullYear()) &&
    (future.getUTCMonth() == now.getUTCMonth()) &&
    (future.getUTCDate() == now.getUTCDate());
}

function isTomorrow(now, future)
{
  return isToday(now, new Date(future.getTime() - 24*60*60*1000));
}

function daysUntil(now, future, maxDays)
{
  var days = 0;
  var t = now.getTime();
  while (days < maxDays && !isToday(new Date(t), future)) {
    t += 24*60*60*1000;
    days++;
  }
  return days;
}

function formatDate(future)
{
  var now = pageLoadTime;
  if (isToday(now, future)) {
    return "Today";
  }
  else if (isTomorrow(now, future)) {
    return "Tomorrow";
  }
  return dayName[future.getUTCDay()]+" "
    +zeroPad(future.getUTCDate(),2)+" "
    +monthName[future.getUTCMonth()];    
}

function formatUTC(future)
{
  var now = pageLoadTime;
  if (isToday(now, future)) {
    return "Today @"+zeroPad(future.getUTCHours(),2)+":"+
      zeroPad(future.getUTCMinutes(),2)+":"+
      zeroPad(future.getUTCSeconds(),2);
  }
  else if (isTomorrow(now, future)) {
    return "Tomorrow @"+zeroPad(future.getUTCHours(),2)+":"+
      zeroPad(future.getUTCMinutes(),2)+":"+
      zeroPad(future.getUTCSeconds(),2);
  }
  else {
    var days = daysUntil(now, future, 7);
    var txt = "";
    if (days < 7) {
      txt += longDayName[future.getUTCDay()];
    }
    else {
      txt += dayName[future.getUTCDay()]+" "
	+zeroPad(future.getUTCDate(),2)+" "
	+monthName[future.getUTCMonth()];
      if (future.getUTCFullYear() != now.getUTCFullYear()) {
	txt += " "+future.getUTCFullYear();
      }
    }
    if (days < 90) {
      txt += " @"+zeroPad(future.getUTCHours(),2)+":"+
	zeroPad(future.getUTCMinutes(),2);
    }
    return txt;
  }
}

function formatCountdown(seconds)
{
  if (seconds < 1) {
    return "-";
  }
  seconds = Math.round(seconds);
  var minutes = Math.floor(seconds / 60); seconds = seconds % 60;
  var hours = Math.floor(minutes / 60); minutes = minutes % 60;
  var days = Math.floor(hours / 24); hours = hours % 24;
  if (days > 2) {
    return days+" days "+
      zeroPad(hours,2)+"h "+
      zeroPad(minutes,2)+"m "+
      zeroPad(seconds,2)+"s";
  }
  else if (days > 0) {
    return zeroPad(hours+days*24,2)+"h "+
      zeroPad(minutes,2)+"m "+
      zeroPad(seconds,2)+"s";
  }
  else if (hours > 0) {
    return zeroPad(hours,2)+"h "+
      zeroPad(minutes,2)+"m "+
      zeroPad(seconds,2)+"s";
  }
  else if (minutes > 0) {
    return zeroPad(minutes,2)+"m "+
      zeroPad(seconds,2)+"s";
  }
  else {
    return zeroPad(seconds,2)+"s";
  }
}

function formatClock(seconds, max24hours)
{
  if (seconds < 1) {
    return "-";
  }
  seconds = Math.round(seconds);
  var minutes = Math.floor(seconds / 60); seconds = seconds % 60;
  var hours = Math.floor(minutes / 60); minutes = minutes % 60;
  if (max24hours) {
    hours = hours % 24;
  }
  return zeroPad(hours,2)+":"+zeroPad(minutes,2)+":"+zeroPad(seconds,2);
}

function formatCountdown1(seconds)
{
  if (getFlag("countdownFormat1"))
    return formatClock(seconds, false);
  else
    return formatCountdown(seconds);
}

function formatCountdown2(seconds)
{
  if (getFlag("countdownFormat1"))
    return formatCountdown(seconds);
  else
    return formatClock(seconds, false);
}

function timerTick()
{
  secondsElapsed++;
  currentTime.setTime(pageLoadTime.getTime() + secondsElapsed*1000);
  for (var i = 0; ; i++) {
    var elem = document.getElementById('newtime'+i);
    if (elem) {
      updateTimer(elem);
    }
    else if (i > 5) {
      // Always check the first few timers, for convenience,
      // since we may want to add a few conditional timers here and there
      return;
    }
  }
}

function updateTimer(elem)
{
  var display = elem.getAttribute("timeDisplay");
  var time = elem.getAttribute("time");
  var seconds = Number(elem.getAttribute("seconds"));
  var title = "";
  var text = "";
  if (display == "clock24") {
    text = formatClock(seconds++, true);
    elem.setAttribute("seconds", seconds);
  }
  else if (display == "duration") {
    text = formatCountdown1(seconds);
    title = formatUTC(new Date(currentTime.getTime() + seconds*1000));
  }
  else if (display == "countup") {
    var max = elem.getAttribute("maxSeconds");
    var s = seconds + secondsElapsed;
    if (max && s >= max) s = 0;
    text = formatCountdown1(s);
    title = formatUTC(new Date(currentTime.getTime() + s*1000));
  }
  else if (display == "countup_time") {
    var max = elem.getAttribute("maxSeconds");
    var s = seconds + secondsElapsed;
    if (max && s >= max) {
      s = 0;
      text = "-";
    }
    else {
      text = formatUTC(new Date(currentTime.getTime() + s*1000));
    }
    title = formatCountdown1(s);
  }
  else if (display == "countdown1") {
    text = formatCountdown1(seconds - secondsElapsed);
    title = time;
  }
  else if (display == "countdown2") {
    text = formatCountdown2(seconds - secondsElapsed);
    title = time;
  }
  else if (display == "time") {
    text = time;
    title = formatCountdown1(seconds - secondsElapsed);
  }    
  elem.setAttribute("title", title);
  elem.innerHTML = text.replace(/ /g, "&nbsp;");
}

function parseMonth(s)
{
  for (var i = 0; i < monthName.length; i++) {
    if (s.substring(0,3).toLowerCase() ==
	monthName[i].substring(0,3).toLowerCase())
      return i;
  }
  GM_log("Could not parse month: "+s);
  return 0;
}

function parseDate(s)
{
  var t = new Date();
  t.setUTCHours(0);
  t.setUTCMinutes(0);
  t.setUTCSeconds(0);
  t.setUTCMilliseconds(0);
  var m = s.match(/^([a-z]+) (\d\d) (\d\d\d\d)$/i);
  if (m) {
    t.setUTCFullYear(Number(m[3]));
    t.setUTCMonth(parseMonth(m[1]));
    t.setUTCDate(Number(m[2]));
    return t;
  }
  m = s.match(/^(\d\d) ([a-z]+) (\d\d\d\d)$/i);
  if (m) {
    t.setUTCFullYear(Number(m[3]));
    t.setUTCMonth(parseMonth(m[2]));
    t.setUTCDate(Number(m[1]));
    return t;
  }
  m = s.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/i);
  if (m) {
    t.setUTCFullYear(Number(m[1]));
    t.setUTCMonth(Number(m[2])-1);
    t.setUTCDate(Number(m[3]));
    return t;
  }
  GM_log("Could not parse date: " + s);
  return t;
}

function animateTimer()
{
  unsafeWindow.toggleTimeDisplay = toggleTimeDisplay;
  var small = xpath1("//body/div[@align='center']/small");
  if (!small) return;
  var html = small.innerHTML;
  var m = html.match(/Server Time: (.*?)(,?) ((\d\d):(\d\d):(\d\d))/i);
  if (!m) {
    return;
  }
  var t = parseDate(m[1]);
  t.setUTCHours(Number(m[4]));
  t.setUTCMinutes(Number(m[5]));
  t.setUTCSeconds(Number(m[6]));
  var s = t.getUTCHours()*3600 + t.getUTCMinutes()*60 + t.getUTCSeconds();
  pageLoadTime = t;
  currentTime = new Date(t.getTime());
  if (getFlag("animateTimer")) {
    var html = "Server time: "+dayName[t.getUTCDay()];
    html += " "+m[1]+m[2]+" ";
    html += "<span id='newtime0' seconds='"+s;
    html += "' timeDisplay='clock24'>"+m[3]+"</span>";
    html += " &nbsp; &nbsp; (Page loaded at "+m[3]+")";
    small.innerHTML = html;
  }
  setInterval(timerTick,999);
}

function toggleTimeDisplay(span)
{
  var seconds = span.getAttribute("title");
  var display = span.getAttribute("timeDisplay");
  if (display == "countup") {
    display = "countup_time";
  }
  else if (display == "countup_time") {
    display = "countup";
  }
  else if (display == "countdown1") {
    display = "time";
  }
  else if (display == "time") {
    display = "countdown2";
  }
  else if (display == "countdown2") {
    display = "countdown1";
  }
  span.setAttribute("timeDisplay", display);
  window.setTimeout(function() { updateTimer(span); }, 0);
}

function getCountdownCutoff()
{
  var cutoff = 0;
  if (getFlag("countdownCutoff72")) {
    cutoff = 72;
  }
  else if (getFlag("countdownCutoff48")) {
    cutoff = 48;
  }
  else if (getFlag("countdownCutoff24")) {
    cutoff = 24;
  }
  return cutoff * 60 * 60;
}



function addQueueWarnings(hours)
{
  var t = document.getElementById("empire_events");
  if (!t) return;
  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows) return;

  for (var i = 1; i < rows.length; i++) {
    for (var j = 5; j < 8; j++) {
      var cell = rows[i].cells[j];
      var seconds = Number(cell.getAttribute("sorttable_customkey") || "0");
      var txt = cell.textContent;
      if (seconds > 0 && seconds < 3600 * hours && txt.match(/\(0\)/)) {
	cell.setAttribute("style", "border: 2px dashed; "
			  +"border-color: #990000; "
			  +"background-color: #330000;");
      }
    }
  }
}

function recordEmpireBasesAndProductionQueues()
{
  var t = document.getElementById("empire_events");
  if (!t) return;
  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows) return;

  var bases = [];
  for (var i = 1; i < rows.length; i++) {
    var a = rows[i].cells[0].firstChild;
    if (a && a.nodeName == "A") {
      var href = a.getAttribute("href");
      if (href.match(/base\.aspx\?base=(\d+)$/)) {
	var base = Number(RegExp.$1);
	bases.push(base);
      }
    }
    var a = rows[i].cells[6].firstChild;
    if (a && a.nodeName == "A") {
      var href = a.getAttribute("href");
      if (href.match(/base\.aspx\?base=\d+&view=production$/)) {
	var txt = a.textContent;
	if (txt.match(/^\s*\(0\)\s*$/)) {
	  setSetting("prod"+base, "empty");
	}
	else if (txt.match(/^(\d+)\s+(.*?)\s+\(0\)$/)) {
	  var n = Number(RegExp.$1);
	  var unit = RegExp.$2;
	  var s = a.nextSibling;
	  while (s && s.nodeName != "SPAN")
	    s = s.nextSibling;
	  if (s && startsWith(s.getAttribute("id") || "", "time")) {
	    var seconds = Number(s.getAttribute("title"));
	    var time = pageLoadTime.getTime() + seconds*1000;
	    var prod = n + " @" + time + " " + unit;
	    setSetting("prod"+base, prod);
	    //GM_log("Recorded production at base " + base + ": " + prod);
	  }
	}
      }
    }
  }
  bases.sort();
  setSetting("bases", bases.join(","));
}

function recordProductionQueue(base)
{
  var t = document.getElementById("base_events")
    || document.getElementById("base_events-production");
  if (!t) return;
  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows) return;

  var prod = [];
  for (var i = 0; i < rows.length; i++) {
    var timeCell = rows[i].cells[0];
    var prodCell = rows[i].cells[1];
    if (startsWith(timeCell.getAttribute("id") || "", "time")) {
      var seconds = Number(timeCell.getAttribute("title"));
      var time = pageLoadTime.getTime() + seconds*1000;
      var txt = prodCell.textContent;
      if (txt.match(/^Production of\s+([\d\.\,]+)\s+(.*)$/)) {
	var unit = RegExp.$2;
	var n = parseNum(RegExp.$1);
	prod.push(n + " @" + time + " " + unit);
      }
    }
  }
  setSetting("prod"+base, prod.join(", "));
  //GM_log("Recorded production at base " + base + ": " + prod.join(", "));
}

function recordBaseCountAndAccountType()
{
  // On account page
  var html = document.body.innerHTML;
  if (html.match(/<br>Bases: <b>(\d+)<\/b><br>/)) {
    setSetting("baseCount", Number(RegExp.$1));
  }
  var free = html.match(/<br>Account Type: <b>Free<\/b><br>/);
  setFlag("upgradedAccount", free ? false : true);
  if (html.match(/<br>Level: <b>(.*?)<\/b>/)) {
    setSetting("level", RegExp.$1);
  }
}

function insertUnitsInProductionColumn()
{
  var t = document.getElementById("empire_units_units");
  if (!t) return;
  var rows = t.rows[0].cells[0].firstChild.rows;
  if (!rows) return;

  var baseCount = Number(getSetting("baseCount", 0));
  if (baseCount == 0) return;
  var bases = getNumberList(getSetting("bases", ""));
  if (bases.length != baseCount) return;

  var missingBases = 0;
  var allProd = [];
  for (var i = 0; i < bases.length; i++) {
    var prod = getSetting("prod"+bases[i], "");
    if (prod.length == 0) {
      GM_log("Production not yet recorded for base " + bases[i]);
      missingBases++;
    }
    else {
      allProd.push(prod);
    }
  }
  allProd = ", "+allProd.join(", ")+", ";

  var th = document.createElement("th");
  th.innerHTML = "In Production";
  insertCell(th, rows[0].cells[1]);
  for (var i = 1; i < rows.length; i++) {
    var td = document.createElement("td");
    if (missingBases > 0) {
      td.innerHTML = "n/a";
      td.title = "This feature will become available once "
	+ "you have viewed all of your bases.";
    }
    else {
      var unit = rows[i].cells[0].textContent;
      var n = 0;
      // Old format did not include completion time, new one does
      var rex1 = new RegExp(", \\d+ "+unit, "gi");
      var rex2 = new RegExp(", \\d+ @\\d+ "+unit, "gi");
      var m = allProd.match(rex1) || [];
      for (var j = 0; j < m.length; j++) {
	n += Number(m[j].match(/\d+/));
      }
      var m = allProd.match(rex2) || [];
      for (var j = 0; j < m.length; j++) {
	if (m[j].match(/, (\d+) @(\d+) /)) {
	  var time = Number(RegExp.$2);
	  if (time > pageLoadTime.getTime()) {
	    n += Number(RegExp.$1);
	  }
	}
      }
      td.innerHTML = commaFormat(n);
    }
    insertCell(td, rows[i].cells[1]);
  }
}

function insertHangarSpaceColumn()
{
  var t = document.getElementById("empire_units_units");
  if (!t) return;
  var rows = t.rows[0].cells[0].firstChild.rows;
  if (!rows) return;

  var col = 5;
  var totalHangars = 0;
  var th = document.createElement("th");
  th.innerHTML = "Hangars";
  insertCell(th, rows[0].cells[col]);
  for (var i = 1; i < rows.length; i++) {
    var td = document.createElement("td");
    var unit = rows[i].cells[0].textContent;
    var n = parseNum(rows[i].cells[1].textContent);
    var hangars = unitStats[unit].hangars * n;
    totalHangars += hangars;
    td.innerHTML = commaFormat(hangars);
    insertCell(td, rows[i].cells[col]);
  }
  var tip = "Total hangar space: " + commaFormat(totalHangars) + " ";
  if (totalHangars < 0)
    tip += "(shortage)";
  else if (totalHangars == 0)
    tip += "(sufficient)";
  else
    tip += "(surplus)";
  for (var i = 1; i < rows.length; i++) {
    rows[i].cells[col+1].title = tip;
  }
}

function contentEval(source)
{
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

// This function will be added in a <script> node to escape the greasemonkey
// sandbox and get access to all of the sorttable variables
function unsafeSortByColumn(th_id, up)
{
  var th = document.getElementById(th_id);
  if (!th) return;
  var row_array = [];
  var col = th.sorttable_columnindex;
  var rows = th.sorttable_tbody.rows;
  for (var j = 0; j < rows.length; j++) {
    if (rows[j].className.match(/sorttable_nosort/)) {
      row_array[row_array.length] = [rows[j].innerHTML, rows[j]];
    }
    else {
      row_array[row_array.length]
	= [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
    }
  }
  sorttable.shaker_sort(row_array, th.sorttable_sortfunction);
  //row_array.sort(th.sorttable_sortfunction);
  var tb = th.sorttable_tbody;
  for (var j = 0; j < row_array.length; j++) {
    tb.appendChild(row_array[j][1]);
  }
  if (up) {
    sorttable.reverse(tb);
    sorttable.setArrow(th, 'up');
  }
  else {
    sorttable.setArrow(th, 'down');
  }
}

// Calls unsafeSortByColumn via a <script> node
function sortByColumn(th, up)
{
  //GM_log("Sorting " + (up? "up" : "down") + " by column " + th.textContent);
  if (sortByColumn.firstCall) {
    addScript(unsafeSortByColumn);
    sortByColumn.firstCall = false;
  }
  contentEval("unsafeSortByColumn('"+getOrSetID(th)+"', "+up+");");
}
sortByColumn.firstCall = true;

function getOrSetID(elem)
{
  var id = elem.getAttribute("id");
  if (!id) {
    do {
      id = elem.nodeName + (getOrSetID.counter++);
    }
    while (document.getElementById(id) != undefined);
    elem.setAttribute("id", id);
  }
  return id;
}
getOrSetID.counter = 1;

function getSortDirection(cell)
{
  var className = cell.getAttribute("class");
  if (!className) return "";
  return className.match(/\bsorttable_aup\b/) ? "up" : "down";  
}

function addCellListener(tableName, cell)
{
  function listener(e) {
    var dir = getSortDirection(cell);
    setSetting("sort"+tableName, dir+"_"+cell.textContent);
  }
  cell.addEventListener("click", listener, false);
}

function addResetSortOption(tableName, t)
{
  var tbody = t.tBodies[0];
  var headRow = t.rows[0].cells;
  var originalClasses = [];
  for (var i = 0; i < headRow.length; i++) {
    originalClasses.push(headRow[i].getAttribute("class"));
  }
  var th = document.createElement("th");
  th.setAttribute("align", "right");
  th.innerHTML = "<small>x</small>";
  t.rows[0].appendChild(th);
  var originalRows = [];
  for (var i = 0; i < tbody.childNodes.length; i++) {
    var row = tbody.childNodes[i];
    originalRows.push(row);
  }
  for (var i = 1; i < t.rows.length; i++) {
    var row = t.rows[i];
    if (row.cells.length > 0) {
      var td = row.cells[row.cells.length-1];
      var colSpan = Number(td.getAttribute("colspan") || "1");
      td.setAttribute("colspan", colSpan+1);
    }
  }

  function listener(event) {
    setSetting("sort"+tableName, "");
    for (var i = 0; i < originalClasses.length; i++) {
      if (originalClasses[i]) {
	headRow[i].setAttribute("class", originalClasses[i]);
      }
    }
    for (var i = 0; i < originalRows.length; i++) {
      tbody.appendChild(originalRows[i]);
    }
  }
  th.addEventListener("click", listener, false);
}

function persistSortOptions(url)
{
  var page = url.match(/astroempires\.com\/(.*?)\.aspx/);
  if (!page) return;
  page = page[1];
  if (url.match(/view=([a-z_]+)/)) {
    if (RegExp.$1 != "bases_events")
      page += RegExp.$1;
  }
  var x = xpath("//table[contains(@class, 'sorttable')]");
  for (var i = 0; i < x.length; i++) {
    var t = x[i];
    var tableName = page+i;
    var id = t.getAttribute("id");
    if (id) {
      tableName += id;
    }
    addResetSortOption(tableName, t);
    if (t.rows.length > 0) {
      var cells = t.rows[0].cells;
      for (var j = 0; j < cells.length; j++) {
	addCellListener(tableName, cells[j]);
	var txt = cells[j].textContent;
	var s = getSetting("sort"+tableName, "");
	if (s == "up_"+txt) {
	  sortByColumn(cells[j], true);
	}
	else if (s == "down_"+txt) {
	  sortByColumn(cells[j], false);
	}
      }
    }
  }
}

function parentForm(elem)
{
  var t = elem.parentNode;
  while (t && t.nodeName != "FORM") {
    t = t.parentNode;
  }
  return t;
}

function parentTable(elem)
{
  var t = elem.parentNode;
  while (t && t.nodeName != "TABLE") {
    t = t.parentNode;
  }
  return t;
}

function highlightTableRows()
{
  var x = xpath("//table[contains(@class, 'listing')]");
  for (var i = 0; i < x.length; i++) {
    var t = x[i];
    if (!t.tBodies[0]) continue;
    var rows = t.tBodies[0].childNodes;
    var startRow = 0;
    var endRow = rows.length-1;
    var parent = parentTable(t);
    if (parent && parent.getAttribute("id") == "empire_structures") {
      startRow++;
    }
    if (parent && parent.getAttribute("id") == "notes_list") {
      endRow--;
    }
    if (parent && parent.getAttribute("id") == "base_reseach") {
      endRow--;
    }
    if (parent && parent.getAttribute("id") == "base_production") {
      endRow -= 6;
    }
    if (parent && parent.getAttribute("id") == "bookmarks-table") {
      continue;
    }
    for (var j = startRow; j <= endRow; j++) {
      var row = rows[j];
      var rowClass = row.getAttribute("class") || "";
      if (!rowClass.match(/listing-header|nohighlight/)) {
	row.setAttribute("onMouseOver", "this.style.background='#222222';");
	row.setAttribute("onMouseOut", "this.style.background='';");
      }
    }
  }
}

function hideOccupiedByColumn()
{
  var t = document.getElementById("empire_events");
  if (!t) return;
  var rows = t.rows[1].cells[0].firstChild.rows;
  if (!rows) return;

  var notOccupied = /<a href=.profile.aspx\?player=0.><\/a>/;
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i].cells[3].innerHTML.match(notOccupied)) {
      return;
    }
  }
  for (var i = 0; i < rows.length; i++) {
    rows[i].cells[3].style.display = "none";
    rows[i].cells[3].style.visibility = "hidden";
  }
}

function highlightPlayers()
{
  var tags = [];
  var homeTag = getSetting("homeTag", "");
  if (homeTag && getFlag("highlightAllies")) {
    tags.push([homeTag, getAlliedPlayerColor()]);
  }
  if (getFlag("highlightFriends")) {
    var friends = getFriendlyGuilds();
    for (var i = 0; i < friends.length; i++) {
      var tag = getGuildTag(getSetting("tag"+friends[i], ""));
      if (tag) {
	tags.push([tag, getFriendlyPlayerColor()]);
      }
    }
  }
  if (getFlag("highlightHostiles")) {
    var hostiles = getHostileGuilds();
    for (var i = 0; i < hostiles.length; i++) {
      var tag = getGuildTag(getSetting("tag"+hostiles[i], ""));
      if (tag) {
	tags.push([tag, getHostilePlayerColor()]);
      }
    }
  }
  if (getFlag("highlightEnemies")) {
    var enemies = getEnemyGuilds();
    for (var i = 0; i < enemies.length; i++) {
      var tag = getGuildTag(getSetting("tag"+enemies[i], ""));
      if (tag) {
	tags.push([tag, getEnemyPlayerColor()]);
      }
    }
  }
  var highlightNeutrals = getFlag("highlightNeutrals");
  if (tags.length == 0 && !highlightNeutrals)
    return;

  var x = xpath("//a[starts-with(@href, 'profile.aspx?player=')]");
  for (var i = 0; i < x.length; i++) {
    var a = x[i];
    var txt = a.textContent;
    var m = txt.match(/^(\[.*?\])\s+(.*)$/);
    if (m) {
      var tag = m[1];
      var name = m[2];
      for (var j = 0; j < tags.length; j++) {
	if (tag == tags[j][0]) {
	  a.style.color = tags[j][1];
	  break;
	}
      }
      if (j == tags.length && highlightNeutrals) {
	a.style.color = getNeutralPlayerColor();
      }
    }
    else {
      var p = parentTable(a);
      p = p && parentTable(p);
      if (p && p.getAttribute("id") == "board_main") {
	// Actually an allied player making a board post
	if (false && getFlag("highlightAllies")) {
	  a.style.color = getAlliedPlayerColor();
	}
      }
      else if (highlightNeutrals) {
	a.style.color = getNeutralPlayerColor();
      }
    }
  }
}

function shortcutProductionBaseLinks()
{
  var t = document.getElementById("empire_ production");
  if (!t) return;
  t = t.rows[1].cells[0].firstChild.firstChild;
  if (!t || t.nodeName != "TABLE") return;

  var rows = t.rows;
  for (var i = 0; i < rows.length; i++) {
    var a = rows[i].cells[0].firstChild;
    if (a && a.nodeName == "A") {
      var href = a.getAttribute("href");
      if (href.match(/^base\.aspx\?base=(\d+)$/)) {
	a.setAttribute("href", href+"&view=production");
      }
    }
  }
}

function addEconomyStats()
{
  var t = document.getElementById("empire_economy_summary");
  if (!t) return;
  t = t.rows[1].cells[0].firstChild;
  if (!t || t.nodeName != "TABLE") return;

  var income = parseNum(t.rows[4].cells[2].textContent);
  var html = "<tr><th>Daily Income</th><th></th><th>"
    +commaFormat(income*24)+"</th></tr>";
  html += "<tr><th>Weekly Income</th><th></th><th>"
    +commaFormat(income*24*7)+"</th></tr>";
  t.innerHTML += html;
}

function recordBookmarks()
{
  var t = document.getElementById("bookmarks-table");
  if (!t) return;
  t = t.rows[1].cells[0].firstChild.firstChild;
  if (!t || t.nodeName != "TABLE") return;

  var bookmarks = [];
  for (var i = 1; i < t.rows.length; i++) {
    var cell = t.rows[i].cells[0];
    var txt = cell.textContent;
    if (txt.match(/^[A-Z]\d\d:\d\d:\d\d:\d\d$/))
      bookmarks.push(txt);
  }
  setSetting("bookmarks", bookmarks.join(";"));
}

function getBookmarks()
{
  return getSetting("bookmarks", "").split(";") || [];
}

function init()
{
  if (!document.body)
    return;
  var url = document.location.href;
  uploadBody(url);
  animateTimer();
  removeAdvertising();  
  //  if (url.match(/scanners/)) {
  //    if (server == "alpha") {
  //      enhanceScanners();
  //    }
  //  }
  if (url.match(/account\.aspx$/)) {
    recordBaseCountAndAccountType();
    showConfigOnAccountPage();
  }
  if (url.match(/empire\.aspx\?view=technologies/)) {
    recordTechs();
  }
  if (url.match(/loc=[A-Z]\d{2}:\d{2}:\d{2}$/)) {
    showTheDebris();
  }
  if (url.match(/empire\.aspx\?view=bases_capacities/)) {
    if (getFlag("showEffectiveCapacities")) {
      showEffectiveCapacities();
    }
  }
  if (url.match(/notes\.aspx\?act=view&note=\d{1,20}$/) ||
      url.match(/messages\.aspx(\?view=(sentbox|savebox))?$/)) {
    parseMMLinks(document.body);
  }
  else if (url.match(/guild\.aspx(\?info=\d)?$/)) {
    parseMMLinks(document.getElementById("guild_internal"));
  }
  if (url.match(/base\.aspx\?base=\d{1,20}$/) ||
      url.match(/profile\.aspx\?player=\d{1,20}$/) ||
      url.match(/guild\.aspx\?guild=\d{1,20}$/)) {
    if (server == "alpha") {
      insertDatabaseLink(url);
    }
  }
  if (url.match(/map\.aspx\?loc=([A-Z]\d\d:\d\d:\d\d:\d\d)$/)) {
    if (!opera && getFlag("cacheLocations")) {
      updateLocationCacheFromMapPage(RegExp.$1);
    }
    if (getFlag("addCapacityTooltips")) {
      addPillageTooltip();
    }
  }
  if (url.match(/base\.aspx\?base=\d{1,20}$/)) {
    if (!opera && getFlag("cacheLocations")) {
      updateLocationCacheFromBasePage();
    }
    if (getFlag("addCapacityTooltips")) {
      addPillageTooltip();
      addFTSwarmTooltip();
      addCapacityTooltips();
    }
  }
  if (getFlag("addTravelPlanner")) {
    if (url.match(/base\.aspx\?base=\d{1,20}$/)) {
      addTravelPlanner(findBaseLocation());
    }
    else if (url.match(/map\.aspx\?loc=([A-Z]\d\d:\d\d:\d\d:\d\d)/)) {
      addTravelPlanner(RegExp.$1);
    }
  }
  if (url.match(/fleet\.aspx\?fleet=\d{1,20}&view=move$/)) {
    if (!opera && getFlag("cacheLocations")) {
      addCachedLocationsMoveMenu();
    }
    if (getFlag("addOneScoutLink")) {
      addOneScoutLink();
    }
    if (getFlag("addInvertLink")) {
      addInvertLink();
    }
    if (!opera && server == "alpha" &&
	(getFlag("searchUsingGenome") || getFlag("searchUsingRubyFARM"))) {
      addFindJGLink();
    }
  }
  if ((url.match(/fleet\.aspx$/) ||
       url.match(/fleet\.aspx\?fleet=\d+&view=move_start$/) ||
       url.match(/map\.aspx$/) ||
       url.match(/map\.aspx\?map=/) ||
       url.match(/empire\.aspx\?view=fleets$/))
      && getFlag("shortcutFleetLinks")) {
    shortcutFleetLinks();
  }
  if (getFlag("insertEmpireMenu")
      || getFlag("classicEmpireMenu") || getFlag("freeAccountEmpireMenu")) {
    insertEmpireMenu();
  }
  if (url.match(/empire\.aspx(\?view=bases_events)?$/)) {
    if (!opera) {
      recordEmpireBasesAndProductionQueues();
    }
    if (getFlag("hideOccupiedByColumn")) {
      hideOccupiedByColumn();
    }
    if (getFlag("queueWarnings24")) {
      addQueueWarnings(24);
    }
    else if (getFlag("queueWarnings12")) {
      addQueueWarnings(12);
    }
  }
  if (!opera && url.match(/base\.aspx\?base=(\d+)(&view=production.*)?$/)) {
    recordProductionQueue(Number(RegExp.$1));
  }
  if (!opera && url.match(/empire\.aspx\?view=units/)) {
    if (getFlag("trackProduction")) {
      insertUnitsInProductionColumn();
    }
    if (getFlag("insertHangarSpaceColumn")) {
      insertHangarSpaceColumn();
    }
  }
  if (!opera && url.match(/bookmarks\.aspx/)) {
    recordBookmarks();
  }
  if (!opera && url.match(/empire\.aspx\?view=trade/)) {
    recordOpenTrades();
  }
  if (url.match(/empire\.aspx\?view=economy/)) {
    addEconomyStats();
  }
  if (url.match(/board\.aspx/)) {
    processBoardPosts();
  }
  if (url.match(/messages\.aspx\?msg=(\d{1,20})&reply=(\d{1,20})/)) {
    var to = RegExp.$1;
    var reply = RegExp.$2;
    insertReplyQuote();
    if (getFlag("enhancePrivateMessages")) {
      enhanceNewMessage(to, reply);
    }
  }
  if (url.match(/messages\.aspx\?msg=(\d{1,20})$/)) {
    if (getFlag("enhancePrivateMessages")) {
      enhanceNewMessage(RegExp.$1, 0);
    }
  }
  if (url.match(/base\.aspx\?base=/) || url.match(/map\.aspx\?loc=/)) {
    if (getFlag("sumFleets")) {
      sumFleets();
    }
  }
  if (url.match(/map\.aspx\?.*loc=([A-Z]\d\d:[\d:]+)$/)) {
    var location = RegExp.$1;
    if (server == "alpha") {
      addLocationSearchFrame(location);
    }
    if (getFlag("enhancePrivateMessages")) {
      insertLocationMassMessageLink(location);
    }
  }
  if (url.match(/base\.aspx\?base=\d{1,20}$/)) {
    if (getFlag("enhancePrivateMessages")) {
      var location = findBaseLocation();
      if (location) {
	insertLocationMassMessageLink(location);
      }
    }
  }
  if (url.match(/map\.aspx$/) ||
      url.match(/map\.aspx\?loc=A\d\d$/) ||
      url.match(/map\.aspx\?map=A\d\d$/) ||
      url.match(/bookmarks\.aspx/) ||
      url.match(/fleet\.aspx/)) {
    if (server == "alpha" && getFlag("addMapOverlays") && (getFlag("searchUsingGenome") || getFlag("searchUsingRubyFARM"))) {
      addMapOverlays();
    }
  }
  if (url.match(/guild\.aspx$/)) {
    recordHomeGuild();
    recordGuildMates();
  }
  if (url.match(/guild\.aspx\?guild=(\d+)$/)) {
    var guild = RegExp.$1;
    recordGuildTag(guild);
    insertGuildStance(guild);
  }
  if (url.match(/ranks\.aspx\?view=guilds_/)) {
    insertStancesInRanks();
  }
  if (url.match(/contacts\.aspx/)) {
    recordContacts();
  }
  if (url.match(/profile\.aspx\?player=(\d{1,20})$/)) {
    var player = RegExp.$1;
    insertAddressListLink(player);
  }
  if (url.match(/fleet\.aspx\?fleet=\d{1,20}$/)) {
    if (getFlag("addRecallTime")) {
      addRecallTime();
    }
    if (getFlag("fleetDetails")) {
      addFleetDetails();
    }
  }
  if (url.match(/base\.aspx\?base=\d{1,20}(&view=[a-z]+)?$/)) {
    if (getFlag("expandBaseLocations")) {
      expandBaseLocations();
    }
  }
  if (url.match(/base\.aspx\?base=(\d{1,20})&view=production/)) {
    if (getFlag("insertProductionWizard")) {
      insertProductionWizard(Number(RegExp.$1));
    }
    if (getFlag("addProductionTooltips")) {
      addProductionTooltips();
    }
  }
  if (url.match(/base\.aspx\?base=\d{1,20}&view=(structures|defenses|production|research)/)) {
    hideDescriptions();
  }
  if (getFlag("insertBattleCalculator")) {
    insertBattleCalculator();
    if (url.match(/combat\.aspx\?fleet=\d+&attack/)) {
      projectCombatResult();
    }
  }
  if (getFlag("persistSortOptions")) {
    // TODO: Restrict to relevant pages? (but there are many)
    persistSortOptions(url);
  }
  if (getFlag("highlightTableRows")) {
    if (!url.match(/board\.aspx/) && 
	!url.match(/messages\.aspx/) && 
	!url.match(/contacts\.aspx/)) {
      // TODO: Restrict to relevant pages? (but there are many)
      highlightTableRows();
    }
  }
  if (getFlag("addCompletionTimes")) {
    // TODO: Restrict to relevant pages? (but there are many)
    addCompletionTimes();
  }
  // TODO: Restrict to relevant pages? (but there are many)
  highlightPlayers();
}

init();


// Copyright (C) 2008  dave@mindkeep.org
var NAME_INDEX = 0;
var START_QUANT_INDEX = 1;
var END_QUANT_INDEX = 2;
var POWER_INDEX = 3;
var ARMOR_INDEX = 4;
var SHIELD_INDEX = 5;

var DEBUG_OFF = 0;
var DEBUG_TIMING = 1;
var DEBUG_VERBOSE = 2;

var bc_debug_level = DEBUG_TIMING;

function debugBC(output)
{
        if (bc_debug_level > DEBUG_OFF)
        {
                console.log(output);
        }
}

function debugBC_V(output)
{
        if (bc_debug_level >= DEBUG_VERBOSE)
        {
                console.log(output);
        }
}

function initEndQuants(rows)
{
        for (var i = 0; i < rows.snapshotLength; i++)
        {
                var row = rows.snapshotItem(i);

                // end quant = start quant
                row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue =
                        row.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue;
        }
        debugBC_V("initEndQuants("+rows+") complete.");
}

function calcDamagePerUnit(power, shield, over)
{
        var damagePerUnit = 0;
        if (power > shield)
        {
                damagePerUnit = (power - shield) + (shield * over);
        }
        else
        {
                damagePerUnit = (power * over);
        }
        debugBC_V("calcDamagePerUnit("+power+", "+shield+", "+over+") returned "+damagePerUnit+", complete.");
        return damagePerUnit;
}

function attackOneWay(aRows, dRows)
{
        for (var i = 0; i < aRows.snapshotLength; i++)
        {
                var aRow = aRows.snapshotItem(i);
                var aUnits = aRow.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
                var aPower = aRow.childNodes[POWER_INDEX].firstChild.nodeValue - 0;
                var aName = aRow.childNodes[NAME_INDEX].firstChild.nodeValue;

                //find power over shields
                var aOverShields = 0.01;
                if (aName == "Ion Bombers" || aName == "Ion Frigates")
                {
                        aOverShields = 0.50;
                }

                // is this a turret structure?
                // this means use not so intelligent damage distribution, interesting...
                var aIsTurret = false;
                if (aName == "Barracks" ||
                                aName == "Laser Turrets" ||
                                aName == "Missle Turrets" ||
                                aName == "Plasma Turrets" ||
                                aName == "Ion Turrets" ||
                                aName == "Photon Turrets" ||
                                aName == "Disruptor Turrets" ||
                                aName == "Deflection Shields" ||
                                aName == "Planetary Shield" ||
                                aName == "Planetary Ring")
                {
                        aIsTurret = true;
                }

                debugBC_V("aRow = aRows.snapshotItem("+i+")\n"+
                                "\taName = "+aName+"\n"+
                                "\taUnits = "+aUnits+"\n"+
                                "\taPower = "+aPower+"\n"+
                                "\taOverShields = "+aOverShields+"\n"+
                                "\taIsTurret = "+aIsTurret);

                while (aUnits > 0.0001) // prevent spinning
                {
                        //find total defense size
                        var dFleetTypeCount = 0;
                        var totalDamagePerUnit = 0;
                        for (var j = 0; j < dRows.snapshotLength; j++)
                        {
                                var dRow = dRows.snapshotItem(j);
                                var dUnits = dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
                                var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;
                                if (dUnits > 0)
                                {
                                        totalDamagePerUnit = totalDamagePerUnit +
                                                calcDamagePerUnit(aPower, dShield, aOverShields);
                                        dFleetTypeCount++;
                                }
                        }

                        debugBC_V("dFleetTypeCount = "+dFleetTypeCount);
                        if (dFleetTypeCount <= 0)
                        {
                                debugBC_V("All Fleet Destroyed!");
                                break;
                        }
                        debugBC_V("totalDamagePerUnit = "+totalDamagePerUnit);

                        var aUnitsUsed = 0;

                        for (var j = 0; j < dRows.snapshotLength; j++)
                        {
                                var dRow = dRows.snapshotItem(j);
                                var dName = dRow.childNodes[NAME_INDEX].firstChild.nodeValue;
                                var dUnits = dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
                                if (dUnits == 0)
                                {
                                        debugBC_V(dName+" group is destroyed, skipping.");
                                        continue;
                                }
                                var dArmor = dRow.childNodes[ARMOR_INDEX].firstChild.nodeValue - 0;
                                var dHp = dUnits * dArmor;
                                var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;

                                debugBC_V("dRow = dRows.snapshotItem("+j+")\n"+
                                                "\tdName = "+dName+"\n"+
                                                "\tdUnits = "+dUnits+"\n"+
                                                "\tdArmor = "+dArmor+"\n"+
                                                "\tdHp = "+dHp+"\n"+
                                                "\tdShield = "+dShield);

                                var damagePerUnit = calcDamagePerUnit(aPower, dShield, aOverShields);
                                //attackers for this defender group
                                var attackingUnits = aUnits * damagePerUnit / totalDamagePerUnit;
                                if (aIsTurret)
                                {
                                        attackingUnits = aUnits / dFleetTypeCount;
                                }
                                var damage = attackingUnits * damagePerUnit; //max damage
                                debugBC_V(aName+" attackingUnits("+attackingUnits+") * damagePerUnit("+damagePerUnit+") = damage("+damage+")");

                                if (damage >= dHp)
                                {
                                        dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue = 0;
                                        aUnitsUsed = aUnitsUsed + dHp / damagePerUnit;
                                        debugBC_V(dName+" units destroyed!\n"+
                                                        "\tdHp / damagePerUnit = "+(dHp/damagePerUnit)+"\n"+
                                                        "\taUnitsUsed = "+aUnitsUsed);
                                }
                                else
                                {
                                        dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue =
                                                (dHp - damage) / dArmor;
                                        aUnitsUsed = aUnitsUsed + attackingUnits;
                                        debugBC_V(dName+" units remaining = "+((dHp-damage)/dArmor)+"\n"+
                                                        "\taUnitsUsed = "+aUnitsUsed);
                                }
                        }
                        aUnits = aUnits - aUnitsUsed;
                        debugBC_V("aUnits remaining = "+aUnits);
                }
        }
        debugBC_V("attackOneWay("+aRows+", "+dRows+") complete.");
}

function findScale(name)
{
        var scale;

        if (name == "Fighters" ||
                        name == "Bombers" ||
                        name == "Heavy Bombers" ||
                        name == "Ion Bombers" ||
                        name == "Corvette" ||
                        name == "Recycler" ||
                        name == "Destroyer" ||
                        name == "Frigate" ||
                        name == "Ion Frigate" ||
                        name == "Scout Ship" ||
                        name == "Outpost Ship")
        {
                scale = 0;
        }
        else if (name == "Cruiser" ||
                        name == "Carrier" ||
                        name == "Heavy Cruiser")
        {
                scale = 1;
        }
        else
        {
                scale = 2;
        }

        debugBC_V("findScale("+name+") returned "+scale+", complete.");
        return scale;
}

function roundUp(value, scale)
{
        var mult = Math.pow(10,scale);
        var rounded = Math.ceil(value*mult) / mult;
        debugBC_V("roundUp("+value+", "+scale+") returned "+rounded+", complete.");
        return rounded;
}

function roundEndQuants(rows)
{
        for (var i = 0; i < rows.snapshotLength; i++)
        {
                var row = rows.snapshotItem(i);
                var scale = findScale(row.childNodes[NAME_INDEX].firstChild.nodeValue);
                var roundedValue = roundUp(row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue, scale);
                row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue = roundedValue;

                if (row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue !=
                                row.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue)
                {
                        row.childNodes[END_QUANT_INDEX].style.color = "magenta";
                }
                else
                {
                        row.childNodes[END_QUANT_INDEX].style.color = "lime";
                }

        }
        debugBC_V("roundEndQuants("+rows+") complete.");
}


function runBattleCalc()
{
        var startTime = new Date();

        var attackerRows = document.evaluate(
                        "//table//th[contains(text(),'Attack Force') and @colspan='6']/../..//tr[@align='center']",
                        document,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null);
        var defenderRows = document.evaluate(
                        "//table//th[contains(text(),'Defensive Force') and @colspan='6']/../..//tr[@align='center']",
                        document,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null);

        initEndQuants(attackerRows);
        initEndQuants(defenderRows);

        attackOneWay(attackerRows, defenderRows);
        attackOneWay(defenderRows, attackerRows);

        roundEndQuants(attackerRows);
        roundEndQuants(defenderRows);

        var endTime = new Date();
        var runSeconds = endTime.getTime() - startTime.getTime();

        debugBC("AE Battle Calc Completed Successfully!\n" +
                        "\tCalc Duration: " + runSeconds / 1000 + " seconds\n" +
                        "\tEnd Time: " + endTime.toString());
        debugBC_V("runBattleCalc() complete.");
}

function isConfirmPage()
{
        var temp = false;
        var confirmTitle = document.evaluate(
                        "//center//b[contains(text(),'Confirm Attack')]",
                        document,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null);
        if (confirmTitle.snapshotLength >= 1)
        {
                temp = true;
        }
        debugBC_V("isConfirmPage() returned "+temp+", complete.");
        return temp;
}


//main
if (isConfirmPage())
{
        runBattleCalc();
}


unitCreditValue = {};
unitCreditValue['Fighters']=5
unitCreditValue['Bombers']=10
unitCreditValue['Heavy Bombers']=30
unitCreditValue['Ion Bombers']=60
unitCreditValue['Corvette']=20
unitCreditValue['Recycler']=30
unitCreditValue['Destroyer']=40
unitCreditValue['Frigate']=80
unitCreditValue['Ion Frigate']=120
unitCreditValue['Scout Ship']=40
unitCreditValue['Outpost Ship']=100
unitCreditValue['Cruiser']=200
unitCreditValue['Carrier']=400
unitCreditValue['Heavy Cruiser']=500
unitCreditValue['Battleship']=2000
unitCreditValue['Fleet Carrier']=2500
unitCreditValue['Dreadnought']=10000
unitCreditValue['Titan']=50000
unitCreditValue['Leviathan']=200000

//Fetching the rows
rows = document.evaluate("//td[@class='events-production']",
document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
if(rows.snapshotLength==0)
	return;

TotalProd = 0;
for(i=0; i < rows.snapshotLength; i++)
{
	productionrow = rows.snapshotItem(i);
	fieldArray = productionrow.innerHTML.split("Production of ")[1].split(" ");
	productionQuan = fieldArray[0];
	productionType = fieldArray[1];
	if(fieldArray.length>2)
		productionType += " " +fieldArray[2];	
	total = unitCreditValue[productionType] * productionQuan 
	TotalProd += total;
	totalTD = document.createElement("td");
	totalTD.setAttribute("align","right");
	totalTD.innerHTML = total;
	productionrow.parentNode.appendChild(totalTD);
}
totalTR = document.createElement("tr");
cell1 = document.createElement("td");
cell1.innerHTML = "Production Queue Size"

cell2 = document.createElement("td");
cell2.innerHTML = TotalProd;
cell2.setAttribute("align","right");

totalTR.appendChild(document.createElement("td"));
totalTR.appendChild(cell1);
if(window.location.href.indexOf('&view=production')!=-1){
	totalTR.appendChild(document.createElement("td"));
	totalTR.setAttribute("align","center");
}
totalTR.appendChild(cell2);
rows.snapshotItem(0).parentNode.parentNode.appendChild(totalTR);

// ==/UserScript==

//---Variables---
var listBoxes = document.evaluate("//select[contains(@id,'select_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var inputBoxes = document.evaluate("//input[contains(@id,'quant_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var width = document.getElementById('empire_ production').getAttribute('width');
var sever = document.getElementById('account').nextSibling.innerHTML.charAt(0);
var names = eval(GM_getValue(sever + 'names', "[]"));

var start = []
for (var i = 1; i <= listBoxes.snapshotLength; i++) {
    start[i] = Math.round(document.getElementById('time' + i).title / 36)/100;
    inputBoxes.snapshotItem(i - 1).setAttribute('onKeyUp', "update_row(" + i + ");");
    inputBoxes.snapshotItem(i - 1).addEventListener('change', boxChange, true);
}

//---Main Line---
intiateDisplay();

//---Functions---
function intiateDisplay() {
    var master = document.createElement('td');
    master.setAttribute('colspan', '4');
    master.setAttribute('align', 'center');
    master.innerHTML = "<select name='masterList' id='masterList'><option value='Fighters'>Fighters</option><option value='Bombers'>Bombers</option><option value='Heavy Bombers'>Heavy Bombers</option><option value='Ion Bombers'>Ion Bombers</option><option value='Corvette'>Corvette</option><option value='Recycler'>Recycler</option><option value='Destroyer'>Destroyer</option><option value='Frigate'>Frigate</option><option value='Ion Frigate'>Ion Frigate</option><option value='Scout Ship'>Scout Ship</option><option value='Outpost Ship'>Outpost Ship</option><option value='Cruiser'>Cruiser</option><option value='Carrier'>Carrier</option><option value='Heavy Cruiser'>Heavy Cruiser</option><option value='Battleship'>Battleship</option><option value='Fleet Carrier'>Fleet Carrier</option><option value='Dreadnought'>Dreadnought</option><option value='Titan'>Titan</option><option value='Leviathan'>Leviathan</option><option value='Death Star'>Death Star</option><option value='Goods'>Goods</option></select>";

    var masterCount = document.createElement('input');
    masterCount.setAttribute('type', 'text')
    masterCount.setAttribute('maxLength', 5);
    masterCount.setAttribute('size', 5);
    masterCount.setAttribute('id', 'masterCount');
    master.appendChild(masterCount);

    var masterButton = document.createElement("input");
    masterButton.setAttribute("type", "button");
    masterButton.setAttribute("id", "masterButton");
    masterButton.value = "Submit";
    masterButton.addEventListener("click", masterSubmit, true);
    master.appendChild(masterButton);

    var masterHeading = document.createElement('td');
    masterHeading.setAttribute('colspan', '4');
    masterHeading.setAttribute('align', 'center');
    masterHeading.innerHTML = "Master Control";

    a = document.createElement('table');
    a.setAttribute('align', 'center');
    a.setAttribute('width', width);
    document.getElementById("empire_ production").parentNode.insertBefore(a, document.getElementById("empire_ production"));
    document.getElementById("empire_ production").parentNode.insertBefore(document.createElement('br'), document.getElementById("empire_ production"));

    var comment = document.getElementById("empire_ production").firstChild.lastChild.lastChild.appendChild(document.createElement('span'));
    comment.setAttribute('class', 'help comment');
    comment.innerHTML = "It is also possible to use the 'f' keyword (finish), e.g. 15f will have the base prod finish in 15 hours.<BR>Inorder to set a preset by time use capital letters, e.g. M,H,D,F." 
    var b = a.appendChild(document.createElement('tr'));
    var c = a.appendChild(document.createElement('tr'));
    var d = a.appendChild(document.createElement('tr'));
    c.setAttribute('align', 'center');
    c.setAttribute('id', 'c');
    b.appendChild(masterHeading);
    d.appendChild(master);

    for (var i = 0; i < 4; i++) {
        c.appendChild(document.createElement('td'))
        c.childNodes[i].appendChild(document.createElement('a'));
        c.childNodes[i].setAttribute('align', 'center');
        c.childNodes[i].setAttribute('width', '25%');
        c.childNodes[i].firstChild.innerHTML = "Set Preset " + (1 + i);
        c.childNodes[i].firstChild.name = "Preset" + (i + 1);
        c.childNodes[i].firstChild.setAttribute('id', "Preset" + (i + 1));
        c.childNodes[i].firstChild.href = 'javascript:void(1)';
        c.childNodes[i].firstChild.addEventListener('click', presetButton, true);
        var g = document.createElement('a');
        g.href = 'javascript:void(1)';
        g.innerHTML = "*";
        g.name = i+1;
        g.addEventListener('click', clearPreset, true);
        c.childNodes[i].appendChild(g);
    }
    updatePresetNames();

    for (var i = 0; i < inputBoxes.snapshotLength; i++) {
        var reset = document.createElement('a');
        reset.href = 'javascript:void(1)';
        inputBoxes.snapshotItem(i).parentNode.appendChild(reset);
        reset.name = reset.previousSibling.name;
        reset.addEventListener('click', resetInput, true);
        reset.innerHTML = 'reset';
    }
}

function clearPreset() {
    if (confirm("Clear Preset " + this.name + "?")) {
        var temp = this.name;
        temp -= 1;
        GM_setValue(sever + 'Preset' + this.name, "[]");
        names[temp] = 'Set Preset ' + this.name;
        updatePresetNames();
        GM_setValue(sever + 'names', uneval(names));
    }
}

function presetButton() {
    var info = eval(GM_getValue(sever + this.name, "[]"));
    if (info != "") {
        for (var i = 0; i < listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i).value = info[0][i];
            inputBoxes.snapshotItem(i).value = info[1][i];
            if (inputBoxes.snapshotItem(i).value.search('f')!=-1) {
                var needed = inputBoxes.snapshotItem(i).value.replace('f', "") - start[i + 1];
                if (needed < 0) {
                    needed = 0;
                }
                inputBoxes.snapshotItem(i).value = needed + 'h';
            }
            var row = i + 1;
            location.href = "javascript:void(update_row(" + row + "));"
        }
    } else {
        var info = [];
        info[0] = [];
        info[1] = [];

        for (var i = 0; i < listBoxes.snapshotLength; i++) {
            info[0][i] = listBoxes.snapshotItem(i).value;
            info[1][i] = inputBoxes.snapshotItem(i).value.toLowerCase();
        }
        GM_setValue(sever + this.name, uneval(info));

        var name = prompt("Enter a custom name for the preset. (optional)", this.name);
        var temp = this.name.replace("Preset", "") - 1;
        names[temp] = name;
        this.innerHTML = name;
        GM_setValue(sever + 'names', uneval(names));
    }
}

function masterSubmit() {
    if (document.getElementById('masterCount').value.search('f')==-1) {
        for (var i = 1; i <= listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i - 1).value = document.getElementById('masterList').value;
            if (listBoxes.snapshotItem(i - 1).value == document.getElementById('masterList').value) {
                inputBoxes.snapshotItem(i - 1).value = document.getElementById('masterCount').value;
            }
            location.href = "javascript:void(update_row(" + i + "));"
        }
    } else {
        for (var i = 1; i <= listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i - 1).value = document.getElementById('masterList').value;
            if (listBoxes.snapshotItem(i - 1).value == document.getElementById('masterList').value) {
                var needed = document.getElementById('masterCount').value.replace('f', "") - start[i];
                if (needed < 0) {
                    needed = 0;
                }
                inputBoxes.snapshotItem(i - 1).value = needed + 'h';
            } location.href = "javascript:void(update_row(" + i + "));"
        }
    }
}

function updatePresetNames() {
    for(var i = 0; i < names.length; i++) {
        if (names[i]) {
            document.getElementById('c').childNodes[i].firstChild.innerHTML = names[i];
        }
    }
}


function resetInput() {
    document.getElementById(this.name).value = "";
    location.href = "javascript:void(update_row(" + this.name.replace("quant_", "") + "));";
}

function boxChange() {
    GM_log(this.value.search(/f/));
    if (this.value.search('f')!=-1) {
        var needed = this.value.replace('f', "")
        needed -= start[this.name.replace("quant_", "")];
        if (needed < 0) {
            needed = 0;
        }
        this.value = needed + 'h';
        location.href = "javascript:void(update_row(" + this.name.replace("quant_", "") + "));";
    }
}
var oldtime = GM_getValue('time', 0);
var newtime = "";
timer();
var difference = newtime - oldtime;
var delay = GM_getValue('delay', 1500);
GM_log("Load timer: " + difference);


if ((newtime - oldtime) < delay) {
    document.getElementById('reportfield').value = GM_getValue('br', "");
    document.getElementById('masktech').checked = GM_getValue('mask', false);
    document.getElementById('ispublic').checked = GM_getValue('public', true);
    document.getElementById('reportform').submit();
} else {
    BRs = document.evaluate("//div[@class='battle-report']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < BRs.snapshotLength; i++) {
        try {
            var target = BRs.snapshotItem(i).parentNode.parentNode.parentNode.previousSibling.lastChild.previousSibling
            target.appendChild(document.createTextNode(" - "));
            target.appendChild(document.createElement('br'));
        } catch (err) {
            var target = document.createElement('center');
            if (GM_getValue('scout', true)) {
                BRs.snapshotItem(i).parentNode.parentNode.insertBefore(target, BRs.snapshotItem(i).parentNode.previousSibling);
            }
        }
        target.appendChild(document.createElement('a'));
        target.lastChild.innerHTML = 'Copy to battlepaste';
        target.lastChild.name = i;
        target.lastChild.href = "javascript:void(1);";
        target.lastChild.addEventListener('click', pasteBR, true);
    }
    try {
        var header = document.getElementById("messages_menu").firstChild.firstChild;
        var options = header.appendChild(document.createElement('th'));
        options.appendChild(document.createElement('a'));
        options.firstChild.innerHTML = 'Battlepaste Options';
        options.firstChild.href = "javascript:void(1);";
        options.firstChild.addEventListener('click', optionsMenu, true);
        header.firstChild.setAttribute('width', '15%');
        for (var i = 1; i < header.childNodes.length; i++) {
            header.childNodes[i].setAttribute('width', '17%');
        }
    } catch (err) { }
}

function pasteBR() {
    br = BRs.snapshotItem(this.name).innerHTML;
    br = br.replace(/<\/tr>|<\/table>/g, "\r").replace(/<\/td>|<\/th>|<\/b>/g, "\t").replace(/<small>/g, "\r").
        replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;&nbsp;\r|/g, "").replace("\r(", "(").replace(")N", ")\rN")

    GM_setValue('br', br);
    timer();
    var battlePaste = window.open("http://battlepaste.nullnetwork.net/paste");
}

function timer() {
    var date = new Date();
    var time = date.getTime();
    newtime += time;
    GM_setValue('time', newtime);
}

function optionsMenu() {
    if (!document.getElementById('menu')) {
        var menu = document.createElement('table');
        try {
            menu.style.width = document.getElementById('messages_inbox').width;
            menu.align = 'center';
            menu.id = 'menu';
            document.getElementById('messages_inbox').parentNode.insertBefore(menu, document.getElementById('messages_inbox'));
            document.getElementById('messages_inbox').parentNode.insertBefore(document.createElement('br'), document.getElementById('messages_inbox'));
        } catch (err) {
            menu.style.width = document.getElementById('messages_savebox').width;
            menu.align = 'center';
            menu.id = 'menu';
            document.getElementById('messages_savebox').parentNode.insertBefore(menu, document.getElementById('messages_savebox'));
            document.getElementById('messages_savebox').parentNode.insertBefore(document.createElement('br'), document.getElementById('messages_savebox'));
        }
        var row = menu.appendChild(document.createElement('tr'));

        row.appendChild(document.createElement('th'));
        row.lastChild.innerHTML = "Options";

        row.appendChild(document.createElement('th'));
        var mask = row.lastChild.appendChild(document.createElement('input'));
        mask.setAttribute('type', 'checkbox');
        mask.id = 'mask';
        row.lastChild.appendChild(document.createElement('code')); 
        row.lastChild.lastChild.innerHTML = 'Mask Technology?';

        row.appendChild(document.createElement('th'));
        var public = row.lastChild.appendChild(document.createElement('input'));
        public.setAttribute('type', 'checkbox');
        public.id = 'public';
        row.lastChild.appendChild(document.createElement('code'));
        row.lastChild.lastChild.innerHTML = 'Make Public?';

        row.appendChild(document.createElement('th'));
        var scout = row.lastChild.appendChild(document.createElement('input'));
        scout.setAttribute('type', 'checkbox');
        scout.id = 'scout';
        row.lastChild.appendChild(document.createElement('code'));
        row.lastChild.lastChild.innerHTML = 'Scout Reports?';

        row.appendChild(document.createElement('th'));
        row.lastChild.appendChild(document.createElement('code'));
        row.lastChild.lastChild.innerHTML = 'Paste Delay:';
        var delay = row.lastChild.appendChild(document.createElement('input'));
        delay.id = 'delay';
        delay.size = 5;
                
        row.appendChild(document.createElement('th'));
        row.lastChild.appendChild(document.createElement('input'));
        row.lastChild.firstChild.setAttribute('type', 'button');
        row.lastChild.firstChild.setAttribute('class', "input-button");
        row.lastChild.firstChild.value = 'Save';
        row.lastChild.firstChild.addEventListener('click', save, true);

        mask.checked = GM_getValue('mask', false);
        public.checked = GM_getValue('public', true);
        scout.checked = GM_getValue('scout', true);
        delay.value = GM_getValue('delay', 1500);
       
    }
}

function save() {
    GM_setValue('mask', document.getElementById('mask').checked);
    GM_setValue('public', document.getElementById('public').checked);
    GM_setValue('scout', document.getElementById('scout').checked);
    GM_setValue('delay', document.getElementById('delay').value);
    
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu').nextSibling);
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu'));
}

//---Variables---
var listBoxes = document.evaluate("//select[contains(@id,'select_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var inputBoxes = document.evaluate("//input[contains(@id,'quant_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var width = document.getElementById('empire_ production').getAttribute('width');
var sever = document.getElementById('account').nextSibling.innerHTML.charAt(0);
var names = eval(GM_getValue(sever + 'names', "[]"));

var start = []
for (var i = 1; i <= listBoxes.snapshotLength; i++) {
    start[i] = Math.round(document.getElementById('time' + i).title / 36)/100;
    inputBoxes.snapshotItem(i - 1).setAttribute('onKeyUp', "update_row(" + i + ");");
    inputBoxes.snapshotItem(i - 1).addEventListener('change', boxChange, true);
}

//---Main Line---
intiateDisplay();

//---Functions---
function intiateDisplay() {
    var master = document.createElement('td');
    master.setAttribute('colspan', '4');
    master.setAttribute('align', 'center');
    master.innerHTML = "<select name='masterList' id='masterList'><option value='Fighters'>Fighters</option><option value='Bombers'>Bombers</option><option value='Heavy Bombers'>Heavy Bombers</option><option value='Ion Bombers'>Ion Bombers</option><option value='Corvette'>Corvette</option><option value='Recycler'>Recycler</option><option value='Destroyer'>Destroyer</option><option value='Frigate'>Frigate</option><option value='Ion Frigate'>Ion Frigate</option><option value='Scout Ship'>Scout Ship</option><option value='Outpost Ship'>Outpost Ship</option><option value='Cruiser'>Cruiser</option><option value='Carrier'>Carrier</option><option value='Heavy Cruiser'>Heavy Cruiser</option><option value='Battleship'>Battleship</option><option value='Fleet Carrier'>Fleet Carrier</option><option value='Dreadnought'>Dreadnought</option><option value='Titan'>Titan</option><option value='Leviathan'>Leviathan</option><option value='Death Star'>Death Star</option><option value='Goods'>Goods</option></select>";

    var masterCount = document.createElement('input');
    masterCount.setAttribute('type', 'text')
    masterCount.setAttribute('maxLength', 5);
    masterCount.setAttribute('size', 5);
    masterCount.setAttribute('id', 'masterCount');
    master.appendChild(masterCount);

    var masterButton = document.createElement("input");
    masterButton.setAttribute("type", "button");
    masterButton.setAttribute("id", "masterButton");
    masterButton.value = "Submit";
    masterButton.addEventListener("click", masterSubmit, true);
    master.appendChild(masterButton);

    var masterHeading = document.createElement('td');
    masterHeading.setAttribute('colspan', '4');
    masterHeading.setAttribute('align', 'center');
    masterHeading.innerHTML = "Master Control";

    a = document.createElement('table');
    a.setAttribute('align', 'center');
    a.setAttribute('width', width);
    document.getElementById("empire_ production").parentNode.insertBefore(a, document.getElementById("empire_ production"));
    document.getElementById("empire_ production").parentNode.insertBefore(document.createElement('br'), document.getElementById("empire_ production"));

    var comment = document.getElementById("empire_ production").firstChild.lastChild.lastChild.appendChild(document.createElement('span'));
    comment.setAttribute('class', 'help comment');
    comment.innerHTML = "It is also possible to use the 'f' keyword (finish), e.g. 15f will have the base prod finish in 15 hours.<BR>Inorder to set a preset by time use capital letters, e.g. M,H,D,F." 
    var b = a.appendChild(document.createElement('tr'));
    var c = a.appendChild(document.createElement('tr'));
    var d = a.appendChild(document.createElement('tr'));
    c.setAttribute('align', 'center');
    c.setAttribute('id', 'c');
    b.appendChild(masterHeading);
    d.appendChild(master);

    for (var i = 0; i < 4; i++) {
        c.appendChild(document.createElement('td'))
        c.childNodes[i].appendChild(document.createElement('a'));
        c.childNodes[i].setAttribute('align', 'center');
        c.childNodes[i].setAttribute('width', '25%');
        c.childNodes[i].firstChild.innerHTML = "Set Preset " + (1 + i);
        c.childNodes[i].firstChild.name = "Preset" + (i + 1);
        c.childNodes[i].firstChild.setAttribute('id', "Preset" + (i + 1));
        c.childNodes[i].firstChild.href = 'javascript:void(1)';
        c.childNodes[i].firstChild.addEventListener('click', presetButton, true);
        var g = document.createElement('a');
        g.href = 'javascript:void(1)';
        g.innerHTML = "*";
        g.name = i+1;
        g.addEventListener('click', clearPreset, true);
        c.childNodes[i].appendChild(g);
    }
    updatePresetNames();

    for (var i = 0; i < inputBoxes.snapshotLength; i++) {
        var reset = document.createElement('a');
        reset.href = 'javascript:void(1)';
        inputBoxes.snapshotItem(i).parentNode.appendChild(reset);
        reset.name = reset.previousSibling.name;
        reset.addEventListener('click', resetInput, true);
        reset.innerHTML = 'reset';
    }
}

function clearPreset() {
    if (confirm("Clear Preset " + this.name + "?")) {
        var temp = this.name;
        temp -= 1;
        GM_setValue(sever + 'Preset' + this.name, "[]");
        names[temp] = 'Set Preset ' + this.name;
        updatePresetNames();
        GM_setValue(sever + 'names', uneval(names));
    }
}

function presetButton() {
    var info = eval(GM_getValue(sever + this.name, "[]"));
    if (info != "") {
        for (var i = 0; i < listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i).value = info[0][i];
            inputBoxes.snapshotItem(i).value = info[1][i];
            if (inputBoxes.snapshotItem(i).value.search('f')!=-1) {
                var needed = inputBoxes.snapshotItem(i).value.replace('f', "") - start[i + 1];
                if (needed < 0) {
                    needed = 0;
                }
                inputBoxes.snapshotItem(i).value = needed + 'h';
            }
            var row = i + 1;
            location.href = "javascript:void(update_row(" + row + "));"
        }
    } else {
        var info = [];
        info[0] = [];
        info[1] = [];

        for (var i = 0; i < listBoxes.snapshotLength; i++) {
            info[0][i] = listBoxes.snapshotItem(i).value;
            info[1][i] = inputBoxes.snapshotItem(i).value.toLowerCase();
        }
        GM_setValue(sever + this.name, uneval(info));

        var name = prompt("Enter a custom name for the preset. (optional)", this.name);
        var temp = this.name.replace("Preset", "") - 1;
        names[temp] = name;
        this.innerHTML = name;
        GM_setValue(sever + 'names', uneval(names));
    }
}

function masterSubmit() {
    if (document.getElementById('masterCount').value.search('f')==-1) {
        for (var i = 1; i <= listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i - 1).value = document.getElementById('masterList').value;
            if (listBoxes.snapshotItem(i - 1).value == document.getElementById('masterList').value) {
                inputBoxes.snapshotItem(i - 1).value = document.getElementById('masterCount').value;
            }
            location.href = "javascript:void(update_row(" + i + "));"
        }
    } else {
        for (var i = 1; i <= listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i - 1).value = document.getElementById('masterList').value;
            if (listBoxes.snapshotItem(i - 1).value == document.getElementById('masterList').value) {
                var needed = document.getElementById('masterCount').value.replace('f', "") - start[i];
                if (needed < 0) {
                    needed = 0;
                }
                inputBoxes.snapshotItem(i - 1).value = needed + 'h';
            } location.href = "javascript:void(update_row(" + i + "));"
        }
    }
}

function updatePresetNames() {
    for(var i = 0; i < names.length; i++) {
        if (names[i]) {
            document.getElementById('c').childNodes[i].firstChild.innerHTML = names[i];
        }
    }
}


function resetInput() {
    document.getElementById(this.name).value = "";
    location.href = "javascript:void(update_row(" + this.name.replace("quant_", "") + "));";
}

function boxChange() {
    GM_log(this.value.search(/f/));
    if (this.value.search('f')!=-1) {
        var needed = this.value.replace('f', "")
        needed -= start[this.name.replace("quant_", "")];
        if (needed < 0) {
            needed = 0;
        }
        this.value = needed + 'h';
        location.href = "javascript:void(update_row(" + this.name.replace("quant_", "") + "));";
    }
}
        

// Fleet Launcher
function stringToUnixTime(time){

	var time_array = time.split(/[^0-9]/);
	var time_arr = [];
	for(i in time_array)
		if(time_array[i].length > 0)
			time_arr.push(time_array[i]);
	if(time_arr.length != 6)
		return 0;
	return Date.UTC(time_arr[2], time_arr[1] - 1, time_arr[0], time_arr[3], time_arr[4], time_arr[5], 0);
}
function setupLauncher(){
	var body = document.getElementsByTagName('body')[0];
	var small_text = /<small>Server time: (\d+-\d+-\d+ \d+:\d+:\d+)<\/small>/.exec(document.body.innerHTML);
	var HOUR_DIFFERENCE = 2;
	if(small_text && small_text.length > 0)
		var server_time = stringToUnixTime(small_text[0]);
	else
		var server_time = page_load_time + HOUR_DIFFERENCE * 3600 * 1000;
	var oriDiv = document.createElement('div');
		// oriDiv.setAttribute('style','position: relative; left: 50%;');
	    oriDiv.setAttribute('id','myORILaunch');
	oriDiv.innerHTML = "<center><fieldset class='th_header2 dropcap' style='width:400'><legend>Fleet Launcher</legend><input type='text' id='launchland_time' /> <input class='input-button' type='button' id='launcher_button' value='Submit Auto Launch' /><br><input type='radio' id='radioLaunch' name='radioSelect' value='Launch Time' checked='checked'/>Launch Time<input type='radio' id='radioLand' name='radioSelect' value='Land Time' />Land Time<br><div id='launch_timer_div' style='display:none;'>Launching in: <span id='launch_timer'>00</span></div></fieldset></center>";
	body.appendChild(oriDiv);
	document.getElementById('launcher_button').addEventListener("click", launcher_button, true);
	function launcher_button(){
		if (document.getElementById("radioLaunch").checked == true) {
			var lbtime = document.getElementById('launchland_time').value;
			launch_time = stringToUnixTime(lbtime);
			// alert(lbtime+' '+launch_time);
			if(launch_time == 0){
				notify('Invalid launch time');
				return false;
			}
			launch_time = launch_time - server_time + page_load_time;
			// alert(lbtime+' '+launch_time+' ST='+server_time+' plt='+page_load_time);
			prepareLauncher();
			return false;
		} else {
			var latime = document.getElementById('launchland_time').value;
			launch_time = stringToUnixTime(latime);
			if(launch_time == 0){
				notify('Invalid land time');
				return false;
			}
			var log_level = document.getElementById('logistics').getAttribute('title');
			var max_speed = Number(document.getElementById('maxspeed').innerHTML);
			var distance = Number(document.getElementById('distance').innerHTML);
			// alert('ll='+log_level+' ms='+max_speed+' distance='+distance);
			if(isNaN(max_speed) || isNaN(distance) || max_speed < 1 || distance <= 0 || isNaN(log_level)){
				notify('Invalid distance/speed/log');
				return false;
			}
			var duration = calculateDuration(distance, max_speed, log_level);
			launch_time = launch_time - duration - server_time + page_load_time;
	
			prepareLauncher();
			return false;
		}
	}
}
function launchFleet(){
	var remaining_time = Math.floor((launch_time - getTime()) / 1000);
	if(remaining_time < 0) {
		// $('Move]').click();
		document.getElementsByClassName('input-button')[0].click();
	} else {
		updateLaunchTimer(remaining_time);
	}
	return false;
}
function updateLaunchTimer(time){
	if(time > 0){
		var secs = time % 60;
		time = Math.floor((time - secs) / 60);
		var mins = time % 60;
		var hrs = Math.floor((time - mins) / 60);
		if(mins < 10)
			mins = '0' + mins;
		if(secs < 10)
			secs = '0' + secs;
		var dday = hrs + ':' + mins + ':' + secs;
		document.getElementById('launch_timer').innerHTML = dday;
	}
}
function prepareLauncher(){
	//$('#launch_timer_div').show();
	document.getElementById('launch_timer_div').style.display = "";
	document.getElementById('launch_timer').text = 'hi';
	launchFleet();
	if(typeof interval_ID != 'undefined' && !isNaN(interval_ID))
		window.clearInterval(interval_ID);
	interval_ID = window.setInterval(launchFleet, 1000);
}
function getTime(){
	return (new Date()).getTime();
}
function calculateDuration(distance, speed, logistics){
	if ((distance>0) && (speed>0)){
		var duration=(distance / speed) * 3600;
		return Math.ceil(duration * (1 - logistics * 0.01) * 1000)
	}
	return 0;
}
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
			if(parent.lastchild == targetElement) {
				parent.appendChild(newElement);
			} else {
				// else the target has siblings, insert the new element between the target and it's next sibling.
				parent.insertBefore(newElement, targetElement.nextSibling);
			}
}


///// End of script /////
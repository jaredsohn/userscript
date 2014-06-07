 
// ==UserScript==
// @name	AE Helper Munkay
// @namespace 	aehelpermunk
// @description	Astro Empires helper, Munkay's version
// @include	http://*.astroempires.com/*
// @exclude	http://www.astroempires.com/
// @exclude	http://forum.astroempires.com/*
// @exclude	http://*.astroempires.com/login.aspx*
// @exclude	http://*.astroempires.com/home.aspx*
// @exclude	http://*.astroempires.com/profile.aspx?action=*
// @exclude     http://ceti.astroempires.com/*
// @exclude     http://*.astroempires.com/smilies.aspx
// @include        http://battlepaste.nullnetwork.net/paste
// ==/UserScript==

// Thanks to Kahar for his battle calc algorithm work! awesomesauce

// TODO:

// - blob watcher
// - hide fleets from scanners
// - Fighter drop stats in fleet details 
// - alliance board
// - Reply To All
// - fix prod page
// - db auto highlighting of allies/enemies
// - click buttons for queues instead of using the dropdown
// - fix overlays
// - higlighting best constructions of each type without clicking the advisor
// - buttons to go to next system while scouting

var changeLog =[["Feb 12, 2011","Finally got round to looking at mmlink should now work - munkay"],["Feb 02, 2011","Farewell. I'm quiting AE. I wish tons of debris for all the script users! - SurueN"],
   ["Jan 26, 2011","Several upgrades and fixes in BC, Units, Profile, Travel planner, etc.  - SurueN"],["Nov 15, 2010","Several bugs fixed - SurueN"],
   ["Nov 09, 2010","UCs and Drekons are now highlighted - SurueN"],["Nov 04, 2010","Scan defense fleet for BC - SurueN"],
   ["Oct 31, 2010","Base reports: BBC formated, quick report option (without fleet composition) - SurueN"],
   ["Oct 31, 2010","Completion times fixed (partially) with the addition of local time - SurueN"],["Oct 03, 2010","Prod page fix - SurueN"],
   ["Sep 29, 2010","Dialy production report (see Units) now provides Daily/Weekly/Monthly/Bases reports - SurueN"],
   ["Sep 11, 2010","Animated time (fixed) - SurueN"],
   ["Sep 07, 2010","added embedded swf - munkay"],["Set 01, 2010","Lock target fleets - SurueN"],["Set 01, 2010","Persistent hide of guild groups- SurueN"],
   ["Set 01, 2010","Own fleet always on top of the lists - SurueN"],
   ["Set 01, 2010","Attack/Move shortcuts - SurueN"],["Set 01, 2010","Several bug fixes - SurueN"],
   ["Ago 13, 2010","Map overlay fix (now works in galaxies and regions) - SurueN"], ["Ago 13, 2010","Add Base report for posting in boards - SurueN"],
   ["Ago 13, 2010","Add daily production report in Units - SurueN"], ["Ago 13, 2010","Bugs fix"],
   ["Jul 20, 2010","Prod page fix - suruen"],["Jul 19, 2010","delta bugfix jumpgate search"],
   ["Jul 16, 2010","allow jg search of other galaxies -suruen"],
   ["Jul 16, 2010","trade board update - highlights red players you have trades with -suruen"],
   ["Jul 16, 2010","prod page unit totals -suruen"],["jul 01, 2010","eddie links"],
   ["Jun 30, 2010","added next cyber effect on capacities tooltip"],
   ["Jun 24, 2010","delta bugfix in empty astro scouting"],
   ["Jun 22, 2010","added delta support inc database"],
   ["Jun 14, 2010","Fixed tech editor and travel planned allows the calculation of a trip with several jumps (worm holes included)-Suruen"],
   ["Jun 10, 2010","edit profit to highlight green or red per profit"],["Jun 10, 2010","integrate extra features from SurueN"],
   ["Jun 07, 2010","bbcode on travel planner fix"],
   ["Jun 02, 2010","guild highlight fix"],
   ["May 31, 2010","Bug Fix"],["May 20, 2010","munkay made booboo, munkay fix booboo"],
   ["May 20, 2010","bugfixed prod wizard and combat board battlepaste"],["May 13, 2010","drakeproofing disable option"],
   ["May 13, 2010","nullnetwork battle paste"],["May 13, 2010","fixed message reply quote"],
   ["May 06, 2010","fixed qb bug and bcc bug"],["Apr 28, 2010","fixed logistics bug"],
   ["Apr 27,2010","rename of script for Aldbeign - please disable old script"],["Apr 27,2010","bug fix fleet page"],
   ["Apr 26, 2010", "fix opera bug spotted by alucard."],["Apr 21, 2010", "excluded ceti for bagel - munkay."],
   ["Apr 21, 2010", "added commander effect to base screens - munkay."],["Apr 21, 2010", "bugfix on events page - munkay."],
   ["Apr 14, 2010", "added +500 to prod page - munkay."],["Apr 14, 2010", "added distance to trades - the.wired."],
   ["Apr 13, 2010", "Integrated AEredisplay <3 n00bish - munkay."],["Apr 13, 2010", "Added Min utils links - munkay."],
   ["Apr 13, 2010", "Added Capitals to structure advisor - munkay."],["Mar 24, 2010", "(MAJOR) Added an integrated and sophisticated battle calculator."],
   ["Mar 18, 2010", "Added a travel planner that calculates travel and launch times."],
   ["Mar 16, 2010", "Queues about to run dry are now highlighted on the empire page."],
   ["Mar 15, 2010", "Fleet details now include rough estimates for various attack methods."],
   ["Mar 13, 2010", "New animated timer showing the recall time for fleets in transit."],
   ["Mar 12, 2010", "Highlight colors for diplomatic stances are now configurable."],
   ["Mar 12, 2010", "Reliably remove ads, and adapt the empire sub-menu to free accounts."],
   ["Mar 12, 2010", "Display daily and weekly income, and capacities per hour/day/week."],
   ["Mar 11, 2010", "Enhanced mouse-friendly production page, with support for deadlines."],
   ["Mar 10, 2010", "Production wizard unbroken, and empire sub-menu adapted to the recent in-game changes."],
   ["Mar 10, 2010", "New options to highlight player links according to diplomatic stances."],
   ["Mar 10, 2010", "Hangar space is now included on the units page and in fleet details."],
   ["Mar 09, 2010", "The \"occupied by\" column on the empire page is now hidden if none of your bases are actually occupied."],
   ["Mar 09, 2010", "New option to highlight table rows on mouse-over."],
   ["Mar 08, 2010", "Table sort options now persist across page loads."],
   ["Mar 08, 2010", "Configuration sections may now individually be hidden or shown."],
   ["Mar 07, 2010", "New column on the Units page showing the number of units currently in production.  View each of your bases once to activate the feature."],
   ["Mar 06, 2010", "New mouse-over tooltips on base overview pages, and the commander effect and construction advisor features are now configurable."],
   ["Mar 05, 2010", "Option to disable redirection warnings for off-site links on the boards."],
   ["Mar 05, 2010", "New production wizard and production tooltips."],
   ["Mar 03, 2010", "Countdown timers are now clickable, to display the actual time of completion/arrival."],
   ["Mar 02, 2010", "Expanded location fields on base pages."],
   ["Mar 02, 2010", "New move option to \"invert\" the current selection (for making drops)."],
   ["Mar 01, 2010", "New detailed view with per-unit stats on fleet overview pages."],
   ["Feb 28, 2010", "Configurable address list and BCC support for private messages."],
   ["Feb 26, 2010", "New links to message all guild mates at crowded locations."],
   ["Feb 26, 2010", "Parse and display embedded mass message links in your notes, inbox, sentbox, and savebox, and on the boards and internal guild pages."],
   ["Feb 26, 2010", "Enhanced private messaging, allowing multiple recipients per PM."],
   ["Feb 25, 2010", "New options to hide help comments on structures/turrets/units/techs."],
   ["Feb 24, 2010", "Four different guild stances may now be set from individual guild profiles and from the rankings."],
   ["Feb 23, 2010", "Jump gate finder added to the fleet move page."],
   ["Feb 22, 2010", "Helper function on base structure page fixed/reimplemented.  Click the helper link in the top left corner for advice on what to build next."],
   ["Feb 22, 2010", "Support for RubyFARM implemented."],
   ["Feb 22, 2010", "Various options may now be configured from the account page."]
   ];

var pageLoadTime = new Date(); // Will be initialized from the game clock
var secondsElapsed = 0;        // Seconds elapsed since the page was loaded
var currentTime = new Date();  // Page load time + seconds elapsed

var scriptName = "ae_helper_mun";
var scriptLink = "http://www.hehe0wned.co.uk/ae/ae_helper_mun.user.js";
var revision = Number("$Revision: 4068$".match(/\d+/))
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
  return GM_getValue(server + "_aehelpermun_"+key, defaultValue);
}

function setSetting(key, value)
{
  if (!opera) {
    return GM_setValue(server + "_aehelpermun_"+key, value);
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

function getGuildTags(stance)
{
  return getSetting(stance+"GuildTags", "").split(",");
}

function getGuildIds(stance)
{
  var x = getNumberList(getSetting(stance+"Guilds", ""));  
  return (stance=="friendly")?arrayRemove(x, Number(getSetting("homeGuild", 0))):x;;
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

function getAlliedGuilds()
{
  return getNumberList(getSetting("alliedGuilds", ""));
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

function arraySwap(array,i,j)
{
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

function isInGuild(stance,guild)
{
  if (guild.indexOf("[")!=-1){
     return  arrayContains(getGuildTags(stance), guild)
	 }
  else 
	 return arrayContains(getGuildIds(stance), guild);
	 
}

function isFriendlyGuild(guild)
{
//   return arrayContains(getFriendlyGuilds(), guild);
   return isInGuild("friendly",guild)
}

function isAlliedGuild(guild)
{
   return isInGuild("allied",guild)
// return arrayContains(getAlliedGuilds(), guild)
}

function isHostileGuild(guild)
{
   return isInGuild("hostile",guild)
//  return arrayContains(getHostileGuilds(), guild);
}

function isEnemyGuild(guild)
{
   return isInGuild("enemy",guild)
//return arrayContains(getEnemyGuilds(), guild);
}

function tagsString(stance)
{
  var tag = [];
  for (var i in stance)
   tag.push(getSetting("tag"+stance[i], "#"+stance[i]).trim());
  return tag.join(",")
}

function setStances(friendlyGuilds, alliedGuilds, hostileGuilds, enemyGuilds)
{
  setSetting("friendlyGuilds", friendlyGuilds.join(","));
  setSetting("friendlyGuildTags", tagsString(friendlyGuilds));
  setSetting("alliedGuilds", alliedGuilds.join(","));
  setSetting("alliedGuildTags", tagsString(alliedGuilds));
  setSetting("hostileGuilds", hostileGuilds.join(","));
  setSetting("hostileGuildTags", tagsString(hostileGuilds));
  setSetting("enemyGuilds", enemyGuilds.join(","));
  setSetting("enemyGuildTags", tagsString(enemyGuilds));
}

function setFriendlyGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var allied = getAlliedGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayInsertSorted(friendly, guild);
  arrayRemove(hostile, guild);
  arrayRemove(enemy, guild);
  setStances(friendly, allied, hostile, enemy);
}

function setAlliedGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var allied = getAlliedGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayInsertSorted(allied, guild);
  arrayRemove(friendly, guild);
  arrayRemove(hostile, guild);
  arrayRemove(enemy, guild);
  setStances(friendly, allied, hostile, enemy);
}

function setNeutralGuild(guild)
{
  var friendly = getFriendlyGuilds();
var allied = getAlliedGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayRemove(friendly, guild);
arrayRemove(allied, guild);
  arrayRemove(hostile, guild);
  arrayRemove(enemy, guild);
setStances(friendly, allied, hostile, enemy);
}

function setHostileGuild(guild)
{
  var friendly = getFriendlyGuilds();
var allied = getAlliedGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayRemove(friendly, guild);
arrayRemove(allied, guild);
  arrayInsertSorted(hostile, guild);
  arrayRemove(enemy, guild);
  setStances(friendly, allied, hostile, enemy);
}

function setEnemyGuild(guild)
{
  var friendly = getFriendlyGuilds();
  var allied = getAlliedGuilds();
  var hostile = getHostileGuilds();
  var enemy = getEnemyGuilds();
  arrayRemove(friendly, guild);
  arrayRemove(allied, guild);
  arrayRemove(hostile, guild);
  arrayInsertSorted(enemy, guild);
  setStances(friendly, allied, hostile, enemy);
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
  return getGuildLinks(getFriendlyGuilds(), getPlayerColor("Friendly"));
}

function getAlliedGuildLinks()
{
  return getGuildLinks(getAlliedGuilds(), getPlayerColor("Allied"));
}

function getHostileGuildLinks()
{
  return getGuildLinks(getHostileGuilds(), getPlayerColor("Hostile"));
}

function getEnemyGuildLinks()
{
  return getGuildLinks(getEnemyGuilds(), getPlayerColor("Enemy"));
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

// Look for a name in the Greasemonkey register
function findPlayerID(player)
{
  for each (var val in GM_listValues()) {
    var value = String(GM_getValue(val));
         if ((val.indexOf(server + "_aehelpermun_" +"player") != -1) && (value.indexOf(player) != -1)) { 
	     return val.replace(server + "_aehelpermun_" + "player","");
		 }	 
    }
}

// Each player setting includes the level and the techstring 
function changePlayerAttrib(player, order, newvalue)
{
  var attribStr = getSetting("player"+player, "Player #"+player);
  var attrib = attribStr.split(";");
  attrib[order] = String(newvalue);
  return setSetting("player"+player, attrib.join(";"));
}

function getPlayerAttrib(player, order)
{
  var attribStr = getSetting("player"+player, "Player #"+player);
  if (attribStr.match(/Player #/))
    return;
  var attrib = attribStr.split(";");
  return attrib[order];
}

function setPlayerName(player, name)
{
  name = name.replace(/^\s+/, "");
  name = name.replace(/\s+$/, "");

  return changePlayerAttrib(player, 0,name);
}

function getPlayerName(player)
{

  return getPlayerAttrib(player, 0);
}

function getTechLevel(techString, tech)
{
 var rex = new RegExp(" "+tech+"(\\d+) ");
  if ((" "+techString+" ").match(rex)) {
     var tn = Number(RegExp.$1);
     return tn;
  }
  else {
    return 0;
  }
}

function setTechLevel(techString, tech, lvl)
{
 var rex = new RegExp(" "+tech+"(\\d+) ");
 if ((" "+techString+" ").match(rex)) {
     return techString.replace(tech+RegExp.$1,tech+lvl);
  }
  else {
    return techString+" "+tech+lvl;
  }
}

function setPlayerTech(player, techstring)
{
   var lvl = 0;
   var playerTech = [];

   for (var i =0; i<15; i++){
     var t = techAbbr[i];
     lvl = getTechLevel(techstring, t);
     if (lvl != 0) playerTech.push(t + lvl);
   }

   changePlayerAttrib(player,2,playerTech.join(" "));
 }

function getPlayerTech(player)
{
  return getPlayerAttrib(player, 2);
}

function setPlayerLevel(player, playerLevel)
{
  changePlayerAttrib(player,1,playerLevel);
}

function getPlayerLevel(player)
{
  return getPlayerAttrib(player, 1);
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

function getMyPlayerName()
{
  return extractPlayerName(getPlayerName(getMyPlayerID()));
}

function extractPlayerName(name)
{
    var regex = /(\[.*?\])(.*)/;
    result = regex.exec(name);
    if(result != null)
    return result[2].substring(1);
    else return name;
}

function extractGuild(name)
{
    var regex = /\[.*?\]/;
    result = regex.exec(name);
    if(result)
    return result[0];
    else return name;
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

var stances = [
		["Home", "#44ee44", 80, 180],
		["Allied",  "#009999", 80, 180],
		["Friendly", "#0066ff", 180, 280],
		["Hostile", "#ee99ff",  250, 350],
		["Enemy",   "#ee5577",    310,  50],
		["UC",   "#00ffff",    180, 280],
		["Drekons",   "#ff8000",    310,  50],
		["Neutral",  "#ffffaa",    0, 100]
		];
		
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

  var url = "http://www.hehe0wned.co.uk/ae/ae_helper_mun.user.js";
  var html = "<table class='no_back' width='590' ";
  html += "style='background:"+bgColor+";' id='aeHelperConfig'>";
  html += "<tr><th align='center' colspan='2' style='padding-bottom:10px;'><font size='+1'>AE Helper Munkay Edition</font> &nbsp; &nbsp;</th></tr>";
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
  html += "<tr section='stances'><th align='left' style='padding-left:5px;'>Allied guilds:&nbsp;</th>";
  html += "<td align='left' id='alliedGuildLinks'></td></tr>";
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
 
  for (i=0;i<stances.length;i++){
	html += "<input type='checkbox' id='config_highlight"+stances[i][0]+"'/>";
	html += "&nbsp;<a href='javascript:;' id='change"+stances[i][0]+"Color'>"+stances[i][0]+"</a>&nbsp;&nbsp;"; 
	if (i==4) html += "<br/>";
  }
 
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
    html += "<td align='left'><input type='checkbox' id='config_searchUsingGenome'/>Genome &nbsp;&nbsp; <input type='checkbox' id='config_searchUsingRubyFARM'/>RubyFARM</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Preferred database used to retrieve jump gate locations etc.</td></tr>";
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Add map overlays:&nbsp;</th>";
    html += "<td align='left'><input type='checkbox' id='config_addMapOverlays'/>Yes</td></tr>";
/*     html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Search region/system/astro.</td></tr>";
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Search astros/systems/regions:&nbsp;</th>";
    html += "<td align='left'><input type='checkbox' id='config_mapRegionSearch'/>Yes</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Add a bottom frame with the bases in astro/system/region located using the database.</td></tr>";
 */  } 
 if (server == "delta") {
    html += heading("Database Settings", "db");
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Upload data to:&nbsp;</th>";
    html += "<td align='left'><input type='checkbox' id='config_uploadTodeltaFARM'/>deltaFARM</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>ensure deltaFARM is ticked</td></tr>";
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Search provider:&nbsp;</th>";
    html += "<td align='left'><input type='radio' id='config_searchUsingdeltaFARM' name='searchProvider' value='deltaFARM'> deltaFARM <input type='radio' id='config_searchDisabled' name='searchProvider' value='None'> None&nbsp;(disabled)</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Preferred database used to retrieve jump gate locations etc.</td></tr>";
    html += "<tr section='db'><th align='left' style='padding-left:5px;'>Add map overlays:&nbsp;</th>";
    html += "<td align='left'><input type='checkbox' id='config_addMapdeltaOverlays'/>Yes</td></tr>";
    html += "<tr section='db'><td colspan='2' class='gray' style='padding-left:5px;'>Add map overlays with friendly/enemy gates and last scouted times.</td></tr>";
  } 

  // Time and Display Options
  html += heading("Time and Display Options", "time");
//  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Animate game clock:&nbsp;</th>";
//  html += "<td align='left'><input type='checkbox' id='config_animateTimer'/>Yes</td></tr>";
//  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Animate the game clock that shows the current server time, so it counts up in real time.</td></tr>";
  html += "<tr section='time'><th align='left' style='padding-left:5px;'>Min Utils:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_minutils'/>Yes</td></tr>";
  html += "<tr section='time'><td colspan='2' class='gray' style='padding-left:5px;'>Add the min utils menu</td></tr>";
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
  html += "<td align='left'><input type='checkbox' id='config_insertProductionWizard'/>Yes &nbsp; &nbsp; &nbsp; &nbsp; <input type='checkbox' id='config_showProductionWizardByDefault'/> Display the wizard by default</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>The production wizard is a mouse-friendly interface for submitting production orders on a single base, and allows you to specify either an explicit quantity or a production deadline.</td></tr>";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Enhance production page:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_enhanceProductionPage'/>Yes</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>The enhanced empire production page is mouse-friendly and allows you to fill all of your queues up to a specified production deadline.</td></tr>";
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Add construction advisor:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addConstructionAdvisor'/>Yes</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Add a link to the construction advisor from base construction pages.  The advisor displays detailed statistics and lets you determine the most cost-effective structures to build next.</td></tr>";
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
  html += "<tr section='empire'><th align='left' style='padding-left:5px;'>Insert fleet summary:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_unitFleetSummary'/>Yes</td></tr>";
  html += "<tr section='empire'><td colspan='2' class='gray' style='padding-left:5px;'>Insert fleet summary in the Units page.</td></tr>";

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
  html += "<tr section='navigation'><th align='left' style='padding-left:5px;'>Quick Bookmarks:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_quickbookmarks'/>Yes</td></tr>";
  html += "<tr section='navigation'><td colspan='2' class='gray' style='padding-left:5px;'>turns on/off quickbookmarks.</td></tr>";


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
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Enable base reports:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_addBaseReport'/>Yes&nbsp;&nbsp;&nbsp;";
  html += "<input type='radio' id='config_shortReport' name='baseReport' value='short'> Short <input type='radio' id='config_detailedReport' name='baseReport' value='detailed'> Detailed </td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Generate a base report listing defenses and fleets. Short report does not list fleet composition</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Enable battle calculator:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertBattleCalculator'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>The integrated battle calculator may be opened from fleet overview pages, attack confirmation pages, base pages, or from the top menu.</td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Hide guild groups :&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_hideGuildGroups'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Hide players according to the diplomatic stances of their guilds or by locking one player in fleet lists and attack confirmation page.<td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Auto scan defnse fleet :&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_scanDefenseFleet'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Set automatically the defense fleet in the BC.<td></tr>";
  html += "<tr section='fleet'><th align='left' style='padding-left:5px;'>Own fleet on top :&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_ownFleetOnTop'/>Yes</td></tr>";
  html += "<tr section='fleet'><td colspan='2' class='gray' style='padding-left:5px;'>Move the own landed fleet to the top of fleet lists. Add move/attack shortcuts.<td></tr>";

  // Board and Messaging Features
  html += heading("Board and Messaging Features", "board");
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Insert quote links:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertQuoteLinks'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>quote the original message when replying to PMs.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Insert Profit and tech to combat board:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertCombatProfit'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>remove comnbat profit from combat board.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Insert trade links:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_insertTradeLinks'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Replace open trades pasted on the boards with quick in-line menus for initiating trades.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Highlight trade partners :&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_colorTradePartners'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Players with existing trade routes appear in red in the trade board.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Disable redirects:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_disableBoardRedirects'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Disable the redirection warning for off-site links in board posts.</td></tr>";
  html += "<tr section='board'><th align='left' style='padding-left:5px;'>Disable DrakeproofingSWF:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_disableDrakeProofingSWF'/>Yes</td></tr>";
html += "<tr section='board'><th align='left' style='padding-left:5px;'>Disable Drakeproofing:&nbsp;</th>";
  html += "<td align='left'><input type='checkbox' id='config_disableDrakeProofing'/>Yes</td></tr>";
  html += "<tr section='board'><td colspan='2' class='gray' style='padding-left:5px;'>Disable the drakeproofing of links in board posts.</td></tr>"; 
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


  for (var i = 0; i < stances.length; i++) {
		var s = stances[i][0];
		var link = document.getElementById("change"+s+"Color");
		link.style.color = getPlayerColor(s);
		var minHue = stances[i][2];
		var maxHue = stances[i][3];
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
    document.getElementById("alliedGuildLinks").innerHTML = getAlliedGuildLinks();
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

  for (i=0;i<stances.length;i++)
    addFlagListener("highlight"+stances[i][0]);

  
  if (server == "alpha") {
    addFlagListener("uploadToGenome");
    addFlagListener("uploadToRubyFARM");
//    addRadioListeners(["searchUsingGenome", "searchUsingRubyFARM", "searchDisabled"]); 
    addFlagListener("searchUsingGenome");
    addFlagListener("searchUsingRubyFARM");
    addFlagListener("addMapOverlays");
//    addFlagListener("mapRegionSearch");
  }


  if (server == "delta") {
    addFlagListener("uploadTodeltaFARM");
    addRadioListeners(["searchUsingdeltaFARM", "searchDisabled"]); 
    addFlagListener("addMapdeltaOverlays");
  }

//  addFlagListener("animateTimer");
  addFlagListener("minutils");
  addFlagListener("addCompletionTimes");
  addRadioListeners(["countdownCutoff72", "countdownCutoffNone",
		     "countdownCutoff24", "countdownCutoff48"]);
  addRadioListeners(["countdownFormat1", "countdownFormat2"]);
  addFlagListener("highlightTableRows");

  addFlagListener("insertProductionWizard");
  addFlagListener("showProductionWizardByDefault", "insertProductionWizard");
  addFlagListener("enhanceProductionPage");
  addFlagListener("addConstructionAdvisor");
  addRadioListeners(["queueWarnings24", "queueWarnings12", "queueWarningsDisabled"]);
  addFlagListener("addProductionTooltips");
  addFlagListener("addCapacityTooltips");
  addFlagListener("showEffectiveCapacities");
  addFlagListener("trackProduction");
  addFlagListener("insertHangarSpaceColumn");
  addFlagListener("unitFleetSummary");

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
  addFlagListener("addBaseReport");
  addRadioListeners(["shortReport", "detailedReport"]); 

  addFlagListener("insertBattleCalculator");
  addFlagListener("hideGuildGroups");
  addFlagListener("ownFleetOnTop");
  addFlagListener("scanDefenseFleet");

  addFlagListener("insertQuoteLinks");
  addFlagListener("insertTradeLinks");
  addFlagListener("colorTradePartners");
  addFlagListener("disableBoardRedirects");
  addFlagListener("disableDrakeProofing");
  addFlagListener("disableDrakeProofingSWF");
  addFlagListener("enhancePrivateMessages");
  addFlagListener("parseMMLinks", "enhancePrivateMessages");
  addFlagListener("alwaysIncludeContacts");
  addFlagListener("alwaysIncludeGuildMates");
  addFlagListener("quickbookmarks");
  addFlagListener("insertCombatProfit");

  // Load version.txt to see if the script is out of date
  var url = "http://www.hehe0wned.co.uk/ae/version.txt";
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
function deltafarmUpload(url, html)
{
   if (!getFlag("uploadTodeltaFARM"))
    return;
  var postURL = "http://deltafarm.dontexist.net/submit";
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
    div.innerHTML = "<div style='display:block;background:#333;position:fixed;top:25;right:0;padding:3px;text-align:center;border:1px solid #000;border-width: 0 0 2px 2px;' id='deltaFARMLink'>Uploading...</div>";
    document.body.appendChild(div);
    var data = encodeURIComponent(html);
    var datalen = data.length;
    data = "length=" + datalen + "&url=" + encodeURIComponent(url)
      + " &text=" + data;
    var headers = { "Content-Type": "application/x-www-form-urlencoded" };
    var loaded = function(details) {
      document.getElementById("deltaFARMLink").innerHTML=details.responseText;
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
    url.match(/empire\.aspx\?view=units/) ||
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
if (server == "delta"){ deltafarmupload(url, html);}
      }
    }
  }
 if (server == "delta") {
    if (url.match(/base\.aspx\?base=\d{1,10}$/) ||
	url.match(/loc=D\d{2}:\d{2}:\d{2}/) ||
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
	
	deltafarmUpload(url, html);
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
  var totalConex = 0;
  var totalProdex = 0;
var techstring = getSetting("techs");
  
  var cyberlvl = Number(techstring.slice(60,62));
  
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
    var oldX = x;
    totalConex += oldX;
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
    var oldX = x
    var newX = x / (1 - level * 0.01);
    totalProdex += oldX;
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
    + commaFormat(Math.round(totalCons*24*7)) + " /week"
    + " Next Cyber "
    
+  (Math.round((((((totalConex/(100+(cyberlvl*5)))*100)/100)*((cyberlvl+1)*5))+((totalConex/(100+(cyberlvl*5)))*100))))

+ "("
+  Math.round((((((totalCons/(100+(cyberlvl*5)))*100)/100)*((cyberlvl+1)*5))+((totalCons/(100+(cyberlvl*5)))*100)))
+ ")";


  last.cells[4].title = tip;
  last.cells[5].innerHTML += " <span class='help'>("
    +commaFormat(Math.round(totalProd))+")</span>";
  var tip = "Total effective production: "
    + commaFormat(Math.round(totalProd)) + " /hour - "
    + commaFormat(Math.round(totalProd*24)) + " /day - " 
    + commaFormat(Math.round(totalProd*24*7)) + " /week"
+" Next Cyber "
+  Math.round((((((totalProdex/(100+(cyberlvl*5)))*100)/100)*((cyberlvl+1)*5))+((totalProdex/(100+(cyberlvl*5)))*100)))
+ "("
+  Math.round((((((totalProd/(100+(cyberlvl*5)))*100)/100)*((cyberlvl+1)*5))+((totalProd/(100+(cyberlvl*5)))*100)))
+ ")";
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

function addConstructionAdvisor()
{
  var t = document.getElementById("base_structures");
  if (!t) return;
  t = childTable(t.rows[1].cells[0]);
  if (!t || t.nodeName != "TABLE") return;
  var html = "<tr class='nohighlight'>";
  html += "<td style='padding-bottom:10px' colspan='7' align='center'>";
  html += "<small><a href='javascript:;' id='toggleConstructionAdvisor'>";
  html += "Show construction advisor</a></small></td></tr>";
  t.firstChild.innerHTML = html + t.firstChild.innerHTML;

  var link = document.getElementById("toggleConstructionAdvisor");
  link.addEventListener("click", showConstructionAdvisor, false);
}

function showConstructionAdvisor()
{
  if (document.getElementById("adviceTable"))
    return;
  var html = document.body.innerHTML;
  if (html.match(/base fertility\.\((\d{1,2})\)/i)) {
    var fertility = parseInt(RegExp.$1);
  } else {
    GM_log("Could not determine base fertility.");
    return;
  }
  if (html.match(/base metal resource\.\((\d{1,2})\)/i)) {
    var metal = parseInt(RegExp.$1);
  } else {
    GM_log("Could not determine base metal resource.");
    return;
  }
  if (html.match(/>Solar Plants<\/a><\/b>.*?\+(\d{1,2})/i)) {
    var solarPower = parseInt(RegExp.$1);
  } else {
    GM_log("Could not determine solar plant power output.");
    return;
  }
  if (html.match(/>Gas Plants<\/a><\/b>.*?\+(\d{1,2})/i)) {
    var gasPower = parseInt(RegExp.$1);
  } else {
    GM_log("Could not determine gas plant power output.");
    return;
  }
  if (html.match(/<a href=.map.aspx\?loc=.*?>[A-Z]\d\d:\d\d:\d\d:\d(\d)<\/a>.*?<\/td><td>\d{1,4}\/(\d{1,4})<\/td><td>\d{1,4}\/(\d{1,4})<\/td><td>\d{1,4}\/(\d{1,4})<\/td>/i)) {
    var moon = parseInt(RegExp.$1) > 0;
    var totalArea = parseInt(RegExp.$2);
    var totalEnergy = parseInt(RegExp.$3);
    var totalPop = parseInt(RegExp.$4);
  }
  else {
    GM_log("Could not determine total area, energy and population.");
    return;
  }
  if (html.match(/base crystals resource\.\((\d{1,2})\)/i)) {
    var crystals = parseInt(RegExp.$1);
  }
  else {
    var crystals = 0;
  }

  function structureLevel(s) {
    var rex = new RegExp(">"+s+"<\\/a><\\/b> \\(Level (\\d{1,2})", "i");
    if (html.match(rex)) {
      var n = parseInt(RegExp.$1);
      return n;
    }
    else {
      return 0;
    }
  }

  function structureCost(s) {
    var rex = new RegExp(">"+s+"<\\/a><\\/b>.*?<\\/td><td align=.center.>([\\d\\.\\,]{1,10})", "i");
    if (html.match(rex)) {
      var n = parseNum(RegExp.$1);
      return n;
    }
    else {
      return 0;
    }
  }

  var urbans = structureLevel("Urban Structures");
  var orbitals = structureLevel("Orbital Base");
  var biomods = structureLevel("Biosphere Modification");
  var terraforms = structureLevel("Terraform");
  var mlps = structureLevel("Multi-Level Platforms");
  var solarPlants = structureLevel("Solar Plants");
  var gasPlants = structureLevel("Gas Plants");
  var fusions = structureLevel("Fusion Plants");
  var antimatters = structureLevel("Antimatter Plants");
var capitals = structureLevel("Capital");
  var baseBiomodCost = 20000;
  if (crystals == 2) {
    // Crystals 2 => asteroid => 50% biomod cost
    baseBiomodCost *= 0.5;
  }
  else if (moon) {
    // Moons get 75% biomod cost
    baseBiomodCost *= 0.75;
  }
var capital = 0;
for (var i = 0; i < capitals; i++)
{ capital += 1; }

  var areaCost = 0;
  for (var i = 0; i < terraforms; i++){
    areaCost += 80*Math.pow(1.5,i);
  }
  for (var i = 0; i < mlps; i++) {
    areaCost += 10000*Math.pow(1.5,i);
  }
  areaCost /= totalArea;

  var popCost = 0;
  for (var i = 0; i < urbans; i++){
    popCost += 1*Math.pow(1.5,i);
  }
  for (var i = 0; i < orbitals; i++) {
    popCost += 2000*Math.pow(1.5,i);
  }
  for (var i = 0; i < biomods; i++) {
    popCost += baseBiomodCost*Math.pow(1.5,i);
  }
  var rawPopCost = popCost / totalPop;
  popCost += (urbans + biomods) * areaCost;
  popCost /= totalPop;

  var energyCost = 0;
  for (var i = 0; i < solarPlants; i++){
    energyCost += 1*Math.pow(1.5,i);
  }
  for (var i = 0; i < gasPlants; i++) {
    energyCost += 1*Math.pow(1.5,i);
  }
  for (var i = 0; i < fusions; i++) {
    energyCost += 20*Math.pow(1.5,i);
  }
  for (var i = 0; i < antimatters; i++) {
    energyCost += 2000*Math.pow(1.5,i);
  }
  var rawEnergyCost = energyCost / totalEnergy;
  energyCost += (solarPlants + gasPlants + fusions + antimatters) * (areaCost + popCost);
  energyCost /= totalEnergy;

  var terraformRatio = structureCost("Terraform") / 5;
  var mlpRatio = structureCost("Multi-Level Platforms") / 10;
  var urbanCost = structureCost("Urban Structures");
  var orbitalCost = structureCost("Orbital Base");
  var biomodCost = structureCost("Biosphere Modification");
  var rawUrbanRatio = urbanCost / fertility;
  var urbanRatio = (areaCost + urbanCost) / fertility;
  var orbitalRatio = orbitalCost / 10;
  var rawBiomodRatio = biomodCost / urbans;
  var biomodRatio = (areaCost + popCost + energyCost*24 + biomodCost) / (urbans-1);
  var solarCost = structureCost("Solar Plants");
  var rawSolarRatio = solarCost / solarPower;
  var solarRatio = (areaCost + popCost + solarCost) / solarPower;
  var gasCost = structureCost("Gas Plants");
  var rawGasRatio = gasCost / gasPower;
  var gasRatio = (areaCost + popCost + gasCost) / gasPower;
  var fusionCost = structureCost("Fusion Plants");
  var rawFusionRatio = fusionCost / 4;
  var fusionRatio = (areaCost + popCost + fusionCost) / 4;
  var antimatterCost = structureCost("Antimatter Plants");
  var rawAntimatterRatio = antimatterCost / 10;
  var antimatterRatio = (areaCost + popCost + antimatterCost) / 10;
  var spaceportCost = structureCost("Spaceports");
  var rawSpaceportRatio = spaceportCost / 2;
  var spaceportRatio = (areaCost + popCost + energyCost + spaceportCost) / 2;
  var econCenterCost = structureCost("Economic Centers");
  var rawEconCenterRatio = econCenterCost / 3;
  var econCenterRatio = (areaCost + popCost + energyCost*2 + econCenterCost) / 3;
 if (capital) {
var baseCount = Number(getSetting("baseCount", 0));
var capCost = structureCost("Capital");
  var rawcapRatio = capCost / (10 + baseCount);
  var capRatio = (areaCost + popCost + energyCost*12 + capCost) / 10;
}

  if (crystals) {
    var crystalMineCost = structureCost("Crystal Mines");
    var rawCrystalMineRatio = crystalMineCost / crystals;
    var crystalMineRatio = (areaCost + popCost + energyCost + crystalMineCost) / crystals;
  }
  var metalCost = structureCost("Metal Refineries");
  var rawMetalRatio = metalCost / metal;
  var metalRatio = (areaCost + popCost + energyCost + metalCost) / metal;
  var roboticCost = structureCost("Robotic Factories");
  var rawRoboticRatio = roboticCost / 2;
  var roboticRatio = (areaCost + popCost + energyCost + roboticCost) / 2;
  var naniteCost = structureCost("Nanite Factories");
  var rawNaniteRatio = naniteCost / 4;
  var naniteRatio = (areaCost + popCost + energyCost*2 + naniteCost) / 4;
  var androidCost = structureCost("Android Factories");
  var rawAndroidRatio = androidCost / 6;
  var androidRatio = (areaCost + popCost + energyCost*4 + androidCost) / 6;
  var shipyardCost = structureCost("Shipyards");
  var rawShipyardRatio = shipyardCost / 2;
  var shipyardRatio = (areaCost + popCost + energyCost + shipyardCost) / 2;
  var orbitalShipyardCost = structureCost("Orbital Shipyards");
  var rawOrbitalShipyardRatio = orbitalShipyardCost / 8;
  var orbitalShipyardRatio = (popCost + energyCost*12 + orbitalShipyardCost) / 8;

  var bestAreaRatio = lowest([terraformRatio, mlpRatio]);
  var bestPopRatio = lowest([urbanRatio, orbitalRatio, biomodRatio]);
  var bestEnergyRatio = lowest([solarRatio, gasRatio, fusionRatio, antimatterRatio]);
  var bestEconRatio = lowest([spaceportRatio, econCenterRatio]);
  
if (capital) {
  txt += row("Capital cost/econ", bestEconRatio, capRatio, rawcapRatio);
 }
  else {
    txt += "<tr><td align='center'>Capitals unavailable.</td></tr>";
  }

if (crystals) {
    bestEconRatio = lowest([bestEconRatio, crystalMineRatio]);
  }
  var bestConsRatio = lowest([metalRatio, roboticRatio, naniteRatio, androidRatio]);
  var bestProdRatio = lowest([bestConsRatio, shipyardRatio, orbitalShipyardRatio]);

  function num(x) {
    return commaFormat(Math.floor(x));
  }

  function row(caption, bestValue, value, rawValue) {
    var x = "<tr><td align='center'>" + caption + ": ";
    if (value == bestValue) {
      x += "<b>" + num(value) + "</b>";
    }
    else {
      x += num(value);
    }
    if (rawValue) {
      x += " (" + num(rawValue) + ")";
    }
    return x + "</td></tr>";
  }

  var txt = "<table width='100%' id='adviceTable' ";
  txt += "style='background-image:none;border:0;position:fixed;top:0;left:0;z-index:50'><tr>";
  txt += "<td><table width='315' align='right'><th style='color:yellow'>Building Statistics:</th>";
  txt += row("Average Area Cost", 0, areaCost);
  txt += row("Average Population Cost", 0, popCost);
  txt += row("Average Energy Cost", 0, energyCost, rawEnergyCost);
  txt += "<th style='color:yellow'>Area Statistics:</th>";
  txt += row("Terraform cost/area", bestAreaRatio, terraformRatio);
  txt += row("Multi-Level Platform cost/area", bestAreaRatio, mlpRatio);
  txt += "<th style='color:yellow'>Population Statistics:</th>";
  txt += row("Urban Structure cost/pop", bestPopRatio, urbanRatio, rawUrbanRatio);
  txt += row("Orbital Base cost/pop", bestPopRatio, orbitalRatio);
  txt += row("Biosphere Modification cost/pop", bestPopRatio, biomodRatio, rawBiomodRatio);
  txt += "</table></td>";
  txt += "<td><table width='310' align='center'><th style='color:yellow'>Energy Statistics:</th>";
  txt += row("Solar Plant cost/energy", bestEnergyRatio, solarRatio, rawSolarRatio);
  txt += row("Gas Plant cost/energy", bestEnergyRatio, gasRatio, rawGasRatio);
  txt += row("Fusion Plant cost/energy", bestEnergyRatio, fusionRatio, rawFusionRatio);
  txt += row("Antimatter Plant cost/energy", bestEnergyRatio, antimatterRatio, rawAntimatterRatio);
  txt += "<th style='color:yellow'>Production Statistics:</th>";
  txt += row("Shipyard cost/prod", bestProdRatio, shipyardRatio, rawShipyardRatio);
  txt += row("Orbital Shipyard cost/prod", bestProdRatio, orbitalShipyardRatio, rawOrbitalShipyardRatio);
  txt += "<tr><td><div style='visibility:hidden'>.</div></td></tr>";
  txt += "<tr><th style='color:orange'>Values in () don't include area/pop/energy</th></tr>";
  txt += "<tr><th style='color:orange'>Other values include area/pop/energy cost</th></tr>";
  txt += "</table></td>";
  txt += "<td><table width='300' align='left'>";
  txt += "<th style='color:yellow'>Economic Statistics:</th>";
  txt += row("Spaceport cost/econ", bestEconRatio, spaceportRatio, rawSpaceportRatio);
  txt += row("Economic Center cost/econ", bestEconRatio, econCenterRatio, rawEconCenterRatio);
if (capital) {
  txt += row("Capital cost/econ", bestEconRatio, capRatio, rawcapRatio);
 }
  else {
    txt += "<tr><td align='center'>Capitals unavailable.</td></tr>";
  }
  if (crystals) {
    txt += row("Crystal Mine cost/econ", bestEconRatio, crystalMineRatio, rawCrystalMineRatio);
  }
  else {
    txt += "<tr><td align='center'>Crystal Mines unavailable.</td></tr>";
  }
  txt += "<th style='color:yellow'>Construction/Production Statistics:</th>";
  txt += row("Metal Refinery cost/prod", bestConsRatio, metalRatio, rawMetalRatio);
  txt += row("Robotic Factory cost/prod", bestConsRatio, roboticRatio, rawRoboticRatio);
  txt += row("Nanite Factory cost/prod", bestConsRatio, naniteRatio, rawNaniteRatio);
  txt += row("Android Factory cost/prod", bestConsRatio, androidRatio, rawAndroidRatio);
  txt += "<tr><td><div style='visibility:hidden'>.</div></td></tr>";
  txt += "<th style='color:yellow'><a id='closeLink' style='cursor:pointer'>Close Advisor</a></th>";
  txt += "</table></td></tr></table><br/>";
  displayData(0, txt);

  var adviceTable = document.getElementById("adviceTable");
  var closeLink = document.getElementById("closeLink");
  function listener(event) {
    adviceTable.innerHTML = "";
    var n = adviceTable.nextSibling;
    adviceTable.parentNode.removeChild(n);
    adviceTable.parentNode.removeChild(adviceTable);
  }
  closeLink.addEventListener("click", listener, false);
}

function insertTopLink(url)
{
 
  var linkG = "http://genome.aeonanon.com/data/";
  var linkR = "http://rubyfarm.dontexist.net/";
  var linkE = "http://faboo.org/eddie/alpha/";
  var hideDetails = "<span id='hideDetails'></span>";
  if (server == "delta"){
		linkE = "http://faboo.org/eddie/delta/";
		linkR = "http://deltafarm.dontexist.net/";
	}
  var caption = "";

  var offset = 2;
  if (url.match(/base\.aspx\?base=(\d{1,20})$/)) {
    linkG += "view/base/" + RegExp.$1 + "/";
    linkR += "base/view/" + RegExp.$1;
	linkE = "";
    var caption = "View base in";
  }
  else if (url.match(/profile\.aspx\?player=(\d{1,20})/)) {
    linkG += "view/player/" + RegExp.$1 + "/";
    linkR += "player/view/" + RegExp.$1;
    linkE += "publicPlayer/playerid/" + RegExp.$1 + "/";
    caption = "View player in";
  }
  else if (url.match(/guild\.aspx\?guild=(\d{1,20})$/)) {
    linkG += "view/guild/" + RegExp.$1 + "/";
    linkR = "";
    linkE += "publicGuild/guildid/" + RegExp.$1 + "/";
    caption = "View guild in";
  }
  else if (url.match(/map\.aspx\?.*loc=([A-Z]\d\d:[\d:]+)$/)) {
    linkG += "search/location/?location=" + encodeURIComponent(RegExp.$1) + "/";
    linkE = "";
    linkR += "search/base?location=" + encodeURIComponent(RegExp.$1) + "&commit=Search/";
    caption = "Search using ";
  }
 
  if (caption == "") return;
  
  var content = "";
  if (linkE)   
    content += "<a target='_blank' href='" + linkE + "'> Eddie </a>";

  if (content != "") content += " - ";	
  if ((linkG) &&  getFlag("searchUsingGenome"))
    content += "<a target='_blank' href='" + linkG + "'> Genome </a>";

  if (content != "") content += " - ";	
  if ((linkR) && getFlag("searchUsingRubyFARM")) 
    content += "<a target='_blank' href='" + linkR + "'> RubyFarm </a>";

  var tab = newTable(caption + content + hideDetails);	
//  tab.setAttribute("id", "topLinks");

  displayData(offset, tab);
  hidebaseDetails();
}

function insertdeltaeddieLink(url)
{

    var link1 = "http://faboo.org/eddie/delta/";
    var caption1 = "in Eddie";
var offset = 2;
if (url.match(/profile\.aspx\?player=(\d{1,20})/)) {
    
      link1 += "publicPlayer/playerid/" + RegExp.$1 + "/";
    
    caption1 = "View player " + caption1;
  }
  else if (url.match(/guild\.aspx\?guild=(\d{1,20})$/)) {
    
      link1 += "publicGuild/guildid/" + RegExp.$1 + "/";
    caption1 = "View guild " + caption1;
  }
if (link1) {
    var content1 = "<br /><a target='_blank' href='" + link1 + "'>" + caption1 + "</a>";
    displayData(offset, newTable(content1));
  }


}

function insertdeltaDatabaseLink(url)
{
  if (getFlag("searchUsingdeltaFARM")) {
    var link = "http://deltafarm.dontexist.net/";
    var genome = false;
    var caption = "in deltaFARM";
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
	  return Number(levels[i].split("<")[0]);
	}
      }
    }
  }
  return 0;
}

function getCommandCenters()
{
  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[1].cells;
    if (cells) {
      var structs = cells[2].innerHTML.split(/<br>/g);
      var levels = cells[3].innerHTML.split(/<br>/g);
      for (var i = 0; i < structs.length; i++) {
    if (structs[i] == "Command Centers") {
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

function getBaseTurrets()
{
  // Defense commander assigned?
  var commander = getBaseCommander();
  var defCommander = 0;
  if (commander[0] == "Defense") {
    defCommander = commander[1];
  }

  var turrets = [];
  var tech = getMyTech();
  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[1].cells;
    if (cells) {
      var percent = getBaseDefensePercent();
      var defs = cells[4].innerHTML.split(/<br>/g);
      var levels = cells[5].innerHTML.split(/<br>/g);
      for (var i = 0; i < defs.length; i++) {
	if (defs[i]) {
	  var d = turretStats[defs[i]];
	  if (d == undefined) {
	    GM_log("Ignoring "+defs[i]+" in FT swarm calculation");
	  }
	  else {
	    d = d.adjustedStats(tech, defCommander);
	    var n = parseNum(levels[i].split("/")[1]) * percent / 100;
		
	    turrets.push({"turret": defs[i], "count": n, "stats": d});
	  }
	}
      }
    }
  }
  return turrets;
}

function getBaseDefensePercent()
{
  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[0].cells;
    if (cells) {
      var txt = cells[4].textContent;
      if (txt.match(/Defenses \((.*?)%\)/)) {
	return Number(RegExp.$1);
      }
    }
  }
  return 0;
}

function getBaseOwnerLevel()
{
  var t = document.getElementById('base_processing-capacities');
  if (t) {
    var rows = t.rows[1].cells[0].firstChild.rows;
    if (rows) {
      var html = rows[7].cells[1].innerHTML;
      if (html.match(/title=[\'\"]Player level ([\d\.]+) \(/))
	return Number(RegExp.$1);
    }
  }
  return getMyLevel();
}

function addFTSwarmTooltip()
{
  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[1].cells;
    if (cells) {
      var turrets = getBaseTurrets();
      if (turrets.length > 0) { 
	var tech = getPlayerTech(getBaseOwner());
    if (!tech) tech = getMyTech();
	var ftStats = unitStats["Fighters"].adjustedStats(tech, 0, 0, 0);
	var laserTech = getTechLevel(tech, "L");
	var armorTech = getTechLevel(tech, "A");
	var r = singleAttackerCombat(ftStats, turrets);
	var tip = commaFormat(r.required) + " FTs needed to level defenses "
	  + "with laser " + laserTech + " vs. armor " + armorTech
	  + " (loss: " + commaFormat(r.lost*ftStats.cost) + " credits)";
	cells[4].title = tip;
	cells[5].title = tip;
      }
    }
  }
}

function addBaseBCLink()
{
   var t = document.getElementById("base_fleets");
   if (!t)   return;
   var rows = t.rows[1].cells[0].firstChild.rows;
   if (!rows) return;
	
   var owner = getBaseOwner();
   var fleetid = "";	
	for (var i = 1; i < rows.length; i++) {
		var row = rows[i];
		var player = row.childNodes[1].innerHTML.match(/profile\.aspx\?player\=(\d+)/)[1];
		if (player == owner) {
			var size = parseNum(row.childNodes[3].firstChild.textContent);
			if (row.childNodes[2].title=="") 
				if(row.childNodes[0].innerHTML.match(/fleet\.aspx\?fleet\=(\d+).>/))
					fleetid = RegExp.$1;
		} 
	}
	
 function openBCLink(){
 	var defenders = newFleet(getSetting("cDefenseFleet",""), deftech, ccs, tac);
	for (var i = 0; i < turrets.length; i++) {
	    defenders.push(turrets[i]);
	}
	defenders[0].id = owner;
	defenders[0].level = defLevel;
	var attackers = [{"id": getMyPlayerID(), "level":getMyLevel()}];
	openBattleCalculator(attackers, defenders, tech, deftech , "Defender",
	    getMyLevel(), defLevel, ccs, tac, def, percent);
  }

	function scanFleet(fleetid)	{

		function fleetContent(div){
			var rowinfo = div.getElementsByTagName("tbody");
			if(rowinfo[2].innerHTML.match(/profile\.aspx\?player=(\d+).>(.*?)<\/a><\/td>/)) {
				var player = RegExp.$2;
			}

			var rowinfo = div.getElementsByTagName("table");
			var tableFleet = rowinfo[4];
		
			var fleetC = [];
			for (var i = 1; i < tableFleet.rows.length-2; i++) {
				var unit = tableFleet.rows[i].cells[0].textContent;
				var count = parseNum(tableFleet.rows[i].cells[1].textContent);
				fleetC.push(count+" "+unit);
			}

			setSetting("cDefenseFleet",fleetC.join(", "));
			openBCLink();

			document.getElementById("processStatus").innerHTML="";
		}

		function f() {
			var url = "http://alpha.astroempires.com/fleet.aspx?fleet="+fleetid;
			getPage(url, fleetContent);
		}
		document.getElementById("processStatus").innerHTML="Reading defense fleet...";
		window.setTimeout(f, 0);
	}	

  var t = document.getElementById("base_resume-structures");
  if (t) {
    var cells = t.rows[0].cells[0].firstChild.rows[1].cells;
    if (cells) {
      var turrets = getBaseTurrets();
      var tech = getMyTech();
      var defLevel = getBaseOwnerLevel();
      var ccs = getCommandCenters();
      var commander = getBaseCommander();
      var tac = (commander[0] == "Tactical" ? commander[1] : 0);
      var def = (commander[0] == "Defense" ? commander[1] : 0);
      var percent = getBaseDefensePercent();

      var deftech = getPlayerTech(getBaseOwner());
 	  if (!deftech) {deftech = ""}

      setSetting("cBaseLocation", findBaseLocation());
	  setSetting("cBaseOwner", getBaseOwner());
	  setSetting("cBaseOwnerLevel", String(defLevel));
      setSetting("cBasePercent", String(percent)); 
      setSetting("cBaseTurrets", turretsString(turrets));
      setSetting("cBaseccs",ccs);
      setSetting("cBasetac",tac);
      setSetting("cBasedef",def);

	  function listener(e) {
		if (getFlag("scanDefenseFleet") && (fleetid!="") )
			scanFleet(fleetid)			
		else {
			setSetting("cDefenseFleet","");
			openBCLink();
		}
	  }
  
	  var cells = t.rows[0].cells[0].firstChild.rows[0].cells;
	  if (cells) {
		var txt = cells[4].textContent;
		var html = "<a href='javascript:;' id='baseBCLink'>"+txt+"</a>";
		cells[4].innerHTML = html;
		var link = document.getElementById("baseBCLink");
		link.addEventListener("click", listener, false);
	  }  
    }
  }  
}

function addTravelPlanner(loc)
{
	var longTrip=[];
	var currentJump = Number(0);
	
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
 
  longTrip[currentJump] = newJump(loc,"",jg,log);

  var html = "<br/><table class='no_back' align='center' cellpadding='6' "
    + "width='"+twidth+"'>"
    + "<tr><td align='center' colspan='2' style='border-bottom:0'>"
    + "<b>Travel Planner</b> ";
  html += "<small>(<a href='javascript:;' id='travelPlannerCloseLink'>";
  html += "Close</a>)</small></td></tr>";
  html += "<tr><td align='right' style='padding-right:20; border-bottom:0'>";
  html += "<table  class='no_back' cellpadding='2' style='border:0;'>";
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
  html += "<option value='-1'>WH</option>";
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
  html += "</select></td></tr></table></td>";
	
  html += "<td align='left' style='border-bottom:0'>"
    + "<table class='no_back' style='border:0'>"
    + "<tr><td style='border-bottom:0'>"
    + "<table class='layout listing' id='travelTimes' cellpadding='2'></table>"
    + "</td></tr></table></td></tr>";
 
  html += "<tr>"
    +  "<td align='center' colspan='3'> <table class='no_back' style='border:0'><tr>"
    +  "<td width='100' align='center'><select id='selectJump' onChange='changeJump()'></select></td>"
    +  "<td width='100' align='center'><input class='input-button' type='button' onclick='addJump()' value='Add Jump' id='addJumpbutton'/></td>"
    +  "<td width='100' align='center'><input class='input-button' type='button' onclick='deleteJump()' value='Delete last Jump' id='delJumpbutton'/></td>"
	  +  "</tr></table></td></tr>";

  html += "<tr><td align='center' colspan='2' style='border-bottom:0'>"
    + "<table class='no_back' style='border:0'>"
    + "<tr><td align='right' valign='top'><table id='longTripTable' class='no_back' style='border:0'> </table></td>"
    + "<td align='rigth'><table id='totaltravelTimes' class='no_back' style='border:0'> </table></td>"
    + "</tr></table'>";
	
  html += "<tr><td align='left' colspan='2' style='border-bottom:0'>"
    + "<table class='layout listing' id='travelLaunchTimes' cellpadding='2'></table>"
    + "</td></tr></table></td></tr></table>";

       
  var div = document.createElement("div");
  div.style.display = "none";
  div.innerHTML = html;
  
   
  function newJump( from, to, jg, log)
  {
     var jump = [];
     jump.push({"from": from, "to": to,   
     	           "jg": jg, "log": log,
     	           "distance" : 0});
     	          
  	 jump.from = from;              
  	 jump.to = to;
  	 jump.jg = jg;
  	 jump.log = log;
  	 jump.distance = 0;

  	 return jump;              
  }
	
	function setJumpSelector() 
	{
 	  var html = "<option value='0'> 1 </option>";
    for (var i = 1; i < longTrip.length; i++) {
      html += "<option value='" + i + "'>" + Number(i+1) + "</option>";
    } 
    document.getElementById("selectJump").innerHTML = html; 
 	
  } 
 
  function addJump() 
  {
  	var l = longTrip.length;
    longTrip[l] = newJump(longTrip[l-1].to,"",0,0);
    updatelongTrip();
    updatePlanner();
 	}
  
  function deleteJump() 
  {
  	var l = longTrip.length;
    if (l<2) return;
    longTrip.length = l-1;
    if (currentJump > longTrip.length) currentJump = longTrip.length;
    updatelongTrip();
    updatePlanner();
  }
  	
  function changeJump()
  {
    currentJump = Number(document.getElementById("selectJump").value);

    var jg = longTrip[currentJump].jg;
    document.getElementById("travelJG").value = jg;

    var log = longTrip[currentJump].log;
    document.getElementById("travelLog").value = Number	(log);

    var from = longTrip[currentJump].from;
    document.getElementById("travelFrom").value = from;

    var to = longTrip[currentJump].to;    
    document.getElementById("travelTo").value = to;
    
    updatePlanner()
  }; 

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
  
    longTrip[currentJump].jg       = Number(travelJG.value);     
    longTrip[currentJump].log      = Number(travelLog.value);    
    longTrip[currentJump].from     = travelFrom.value;   
    longTrip[currentJump].to       = travelTo.value;     

    if (currentJump < longTrip.length-1) 
 	        longTrip[currentJump+1].from = longTrip[currentJump].to;     

    if (currentJump > 0) 
 	        longTrip[currentJump-1].to = longTrip[currentJump].from;     

  
    var d = distance(from, to);
    longTrip[currentJump].distance = d;

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
      if (jg==-1) {
      	 var speed = 0; 
         var time = 12 * 3600;
      }   
      else {
         var stats = unitStats[units[i]];
         var speed = stats.adjustedSpeed(techs, jg, log);
         var time = d / speed * 3600;
      }
      html += "<td align='right' style='padding-left:20'>"
	         + decimalFormat(speed, 2) + "</td>";
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
      
      var bbcode = "[b][u][color=red]MOVE ORDERS[/color][/u]\n\n"
		+ "[color=yellow]Origin: " + travelFrom.value
		+ "\nDestination: " + travelTo.value
		+ "\nArrival time:[/color] [color=white]"
		+ formatLaunchTime(new Date(arrival))
		+ "[/color][/b]\n";
     
    function launchRow(unit, minTech, maxTech, myTech, addBBcode)
      {
		var stats = unitStats[unit];
		var html = "<tr><th align='right' height='25' "
			+ "style='padding-right:10'>"
			+ plural(2, unit).replace(/ /g, '&nbsp;') + ":</th>";
		if (addBBcode)
			bbcode += "\n[color=white][b]" + unit 
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
				bbcode += "[color="+(tech%2 == 0 ? "#AAAAAA" : "#EEEEEE")
					+ "]" + stats.drive + " " + tech + ": Launch "
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
		+ "<td colspan='11' align='center' style='padding-top:10'>";
		
	  var bbcodeMsg = bbcode;
	  bbcodeMsg = bbcodeMsg.split("\n").join("\\n");  
	  bbcodeMsg = bbcodeMsg.split("\/").join("\\\/");
 		
	  html += insertMassMessageLink(loc, bbcodeMsg) + "<br/><small>BBCode version: (right-click to copy)</small><br/>";
	
	  html += "<textarea cols='120' rows='1' readonly style='background:#000000' "
		+ "onMouseOver='this.select()'>"
		+ bbcode + "</textarea></td></tr>";
      travelLaunchTimes.innerHTML = html;
    }
    if (getFlag("highlightTableRows")) {
      highlightTableRows();
    }
    
    updatelongTrip();
  };
  
  function insertMassMessageLink(location, bbcodeMsg)
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
    var message = "To everybody with fleets at " + location + ".\\n\\n" + bbcodeMsg;
    html = "</br><a style='color:gold;cursor:pointer' ";
    html += "onClick='massMessage([" + players.join(",") + "],";
    html += "\""+message+"\")'>";
    html += "Message travel planner to all "+homeTag+" players here</a>";
//    link.parentNode.parentNode.setAttribute("style", "padding-top:3px;");
//    link.parentNode.innerHTML = 
//      html + link.parentNode.innerHTML + " &nbsp; &nbsp;";
	return html;
  }
}
      
  function updatelongTrip()
  {
    setJumpSelector();
    document.getElementById("selectJump").value = currentJump;
    
    if (longTrip.length == 1){ 
       document.getElementById("longTripTable").innerHTML = ""; 
       document.getElementById("totaltravelTimes").innerHTML = ""; 
      return; 
    }   
	  var html = "<tr >"
   		+ "<td width='20'  align='center' ></td>"
    	+ "<td width='100' align='center'/><b>From</b></td>"
    	+ "<td width='100' align='center'/><b>to</b></td>"
    	+ "<td width='50'  align='center'/><b>JG</b></td>"
    	+ "<td width='50'  align='center'/><b>log</b></td>"
    	+ "<td width='100' align='center'/><b>Distance</b></td>"
    	+ "</tr>";
  
    for (var i=0; i<longTrip.length; i++) {
    	html += "<tr>"
        + "<td width='20' align='center' >"+Number(i+1)+"</td>"
        + "<td width='100' align='center' id='from"+i+"'>"+longTrip[i].from+"</td>"
        + "<td width='100' align='center' id='to"+i+"'>"+longTrip[i].to+"</td>";
      if (longTrip[i].jg==-1) {  
          html += "<td width='50'  align='center' id='jg"+i+"'>WH</td>"
          		+ "<td width='50'  align='center' id='log"+i+"'>-</td>"
              + "<td width='100'  align='center' id='distance"+i+"'>-</td></tr>";
       }
       else {
          html += "<td width='50'  align='center' id='jg"+i+"'>"+longTrip[i].jg+"</td>"
          		+ "<td width='50'  align='center' id='log"+i+"'>"+longTrip[i].log+"</td>"
              + "<td width='100'  align='center' id='distance"+i+"'>"+longTrip[i].distance+"</td></tr>";
       	} 
      } 
    document.getElementById("longTripTable").innerHTML = html; 
     
    var html = "<tr class='listing-header'><td align='center' colspan='2'><b>Total travel time</b></td></tr>";
    var units = ["Scout Ship", "Corvette", "Frigate", "Cruiser",
		 "Heavy Cruiser", "Dreadnought", "Leviathan", "Death Star"];
		
		var unitTime = [0,0,0,0,0,0,0,0]; 
    var techs = "WD"+document.getElementById("travelWarp").value+" SD"+document.getElementById("travelStellar").value;
    for (var j=0; j<longTrip.length ; j++){
    	var jg = longTrip[j].jg;
    	var log = longTrip[j].log;
      for (var i = 0; i < units.length; i++) {
      	if (jg==-1) {
      	   var speed = 0; 
           unitTime[i] += 12 * 3600;
      	}   
      	else {
           var stats = unitStats[units[i]];
           var speed = stats.adjustedSpeed(techs, jg, log );
           unitTime[i] += longTrip[j].distance / speed * 3600;
        }    
      }
    }

    for (var i = 0; i < units.length; i++) {
          html += "<tr><td>" + plural(2, units[i]) + "</td>";
          html += "<td align='right' style='padding-left:20'>"
	                + formatCountdown1(unitTime[i]) + "</td></tr>";
    }
    document.getElementById("totaltravelTimes").innerHTML = html; 
        
  }
  
  unsafeWindow.massMessage = massMessage;

  unsafeWindow.addJump = function(e) {
    window.setTimeout(addJump, 0);
  };
  unsafeWindow.deleteJump = function(e) {
    window.setTimeout(deleteJump, 0);
  };
  unsafeWindow.changeJump = function(e) {
    window.setTimeout(changeJump, 0);
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

function addBaseReport(loc)
{
  if (!loc) return;
  
  var t = document.getElementById('base_processing-capacities');
  if (!t) return;

  if (t) {
    var rows = t.rows[1].cells[0].firstChild.rows;
    if (!rows) return;
    var maxEcon = Number(rows[4].cells[1].textContent);
    var curEcon = Number(rows[5].cells[1].textContent);
    var minPillage = Math.floor(6 * Math.pow(curEcon - (maxEcon * .7),2));
  }
 
  var link = document.createElement("a");
  link.appendChild(document.createTextNode("Base report"));
  link.setAttribute("style", "color:gold;cursor:pointer; border:0; background:#333333;");
  link.innerHTML = "<br/><center><small>" + link.innerHTML + "</small></center>";
  t.parentNode.appendChild(link); 
 
//  var insertAfter = xpath1("//table[@class='base']");
 
  var jg = getJumpGateLevel();
  var commander = getBaseCommander();
  var turrets = getBaseTurrets();
  var ccs = getCommandCenters();
  var fleetStr = "";
  var pendingSearches = 0;
  var scannedGroup = 0;
  var fleets = [];
  var quickReport = true;
  
  var owner = t.innerHTML.match(/.profile\.aspx\?player=(\d+)..*?>(.*?)<\/a>/i); 

  var div = document.createElement("div");
  div.id = "baseReport";
  div.style.visilibity = "hidden";
  t.parentNode.appendChild(div);
  var showBaseReport = false;
 
  
  function ShowReport(e)
  {
  
    if(showBaseReport) {
	   div.style.display = "none";
	   hideDiv("showBaseReport");
	   showBaseReport = false;
	   fleets = [];
	   pendingSearches = 0;
	   scannedGroup = 0;
  	   return;
	}
	
    div.style.display = "block";
    div.style.background = "#000";
    div.style.position = "absolute";
    var x = e.pageX + 40;
    div.style.left = x - x%100;
    var y = e.pageY + 30;
    div.style.top = y - y%20;
    div.style.padding = 5;
    div.style.cellpadding = 5;
    var html = "<table width='300' class='no_back'>";
    html += "<tr><td><small>&nbsp;</small></td></tr>";
    html += "<tr><td>";
	html += loc + "&nbsp;&nbsp;&nbsp;" + owner[2];
    html += "</td></tr><tr><td>";
	html += "eco " + maxEcon + "; Pillage " + commaFormat(minPillage) + "<br/>";
	html += "JG " + jg + "; CC " + ccs + ((commander[0]=="")?"":("; "+commander.join(" "))) + "<br/>";
    html += "</td></tr><tr><td>";
	html += turretsString(turrets) + "<br/>";
    html += "</td></tr><tr><td>";
	html += writeSummary();
	html += "<small><div id='fleetDetails'></div></small>";
    div.innerHTML = html;
    recordFleets();

    showDiv("showBaseReport");
	if (getFlag("shortReport")) writeFleetReport();
    showBaseReport = true;
  }

  function writeSummary(){
	if (!document.getElementById("map_fleets_guilds")) return ""; 
	var sf = document.getElementById("map_fleets_guilds").firstChild.rows[1].firstChild.firstChild.rows;
    var ht = "<tr> <small><small> guild : landed / incoming / total</small></small></tr>"
    for (var i=1; i < sf.length; i++){
		ht +=  "<tr> <small> <small>" + sf[i].cells[0].textContent + " : " 
		  + ((sf[i].cells[1].innerHTML.match(/(.*?).<small>/))? sf[i].cells[1].innerHTML.match(/(.*?).<small>/)[1] :"0" )+ " / " 
		  + ((sf[i].cells[2].innerHTML.match(/(.*?).<small>/))? sf[i].cells[2].innerHTML.match(/(.*?).<small>/)[1] :"0" )+ " / " 
		  + ((sf[i].cells[3].innerHTML.match(/(.*?).<small>/))? sf[i].cells[3].innerHTML.match(/(.*?).<small>/)[1] :"0" )
		  + "</small></small></tr>";
    	}
		ht += "<tr>&nbsp;</tr>"
	return ht;
	}
  
  
  function recordFleets(){  

    var t = document.getElementById("base_fleets");
	if (!t)
		return;
	var rows = t.rows[1].cells[0].firstChild.rows;
	if (!rows)
		return;

	fleets = [];
	var now = new Date();
	var future = new Date();
	for (var i = 1; i < rows.length; i++) {
		var row = rows[i];
		if(row.childNodes[0].innerHTML.match(/fleet\.aspx\?fleet\=(\d+).>/))
		    var fleetid = RegExp.$1;
		var size = parseNum(row.childNodes[3].firstChild.textContent);
		var player = row.childNodes[1].firstChild.textContent;
    	var time = row.childNodes[2].title;
		if (time!= "") {
			future.setTime(now.getTime() + (time * 1000));
        	fleets.push({"fleetid" : fleetid, "player" : player, "size" : size, "arrival" : future, "landed" : false, "fleetStr" : ""});	
		} else	
        	fleets.push({"fleetid" : fleetid, "player" : player, "size" : size, "arrival" : future, "landed" : true, "fleetStr" : ""});	
	}

	if (getFlag("shortReport")) return;
 	scannedGroup = 0;
	
	document.getElementById("processStatus").innerHTML="Scanning fleets...";
 	for (var i=0; i<10; i++) {	
	   if ((10*scannedGroup+i)<fleets.length)
		  scanFleet(fleets[10*scannedGroup+i].fleetid);
	} 
  } 
  
  link.addEventListener('click', ShowReport , false );
	
  function scanFleet(fleetid)	{
		function f() {
			pendingSearches++;
			var url = "http://alpha.astroempires.com/fleet.aspx?fleet="+fleetid;
			getPage(url, fleetContent);
		}
		var delay = 1000 + Math.floor(Math.random()*1000);
		window.setTimeout(f, delay);
	}
	
  function fleetContent(div)
  {
        var rowinfo = div.getElementsByTagName("tbody");
		if(rowinfo[2].innerHTML.match(/profile\.aspx\?player=(\d+).>(.*?)<\/a><\/td>/)) {
			var player = RegExp.$2;
        }

        var rowinfo = div.getElementsByTagName("table");
		var tableFleet = rowinfo[4];
		
		var fleetC = [];
		for (var i = 1; i < tableFleet.rows.length-2; i++) {
			var unit = tableFleet.rows[i].cells[0].textContent;
			var count = parseNum(tableFleet.rows[i].cells[1].textContent);
			fleetC.push(unitStats[unit].shortName + " " + commaFormat(count));
		}
        var m = tableFleet.rows[tableFleet.rows.length-1].textContent.match(/^Fleet Size: (.*)$/i);
        if (!m) return;
        var fleetSize = parseNum(m[1]);

	    fleetStr = fleetC.join("; ");
		for (var i in fleets) 
		   if ((fleets[i].player == player) && (fleets[i].size == fleetSize))
		       fleets[i].fleetStr = fleetStr;

	    if (--pendingSearches == 0) {
	        fleetsLoaded();
        }

	}

  function fleetsLoaded(){
    scannedGroup++;
	document.getElementById("processStatus").innerHTML="Scanned "+10*scannedGroup+"/"+fleets.length;
    if (10*scannedGroup < fleets.length){ 
		for (var i=0; i<10; i++) {	
			if (10*scannedGroup+i<fleets.length)
				scanFleet(fleets[10*scannedGroup+i].fleetid);
		}	 
	}
	else {
        writeFleetReport()
	}
  }
  
  function writeFleetReport(){
	fList = document.getElementById("fleetDetails");
	var html = "[list]";
	for (i in fleets){
		html += "[*]" + fleets[i].player + "&nbsp;&nbsp;[color=yellow]" + commaFormat(fleets[i].size) + "[/color]&nbsp;&nbsp;";
		if (!fleets[i].landed) html += "(" + formatUTC(fleets[i].arrival) + ")"; 
		html +=  "<br/>" + fleets[i].fleetStr+"<br/><br/>" ; 
	}
	fList.innerHTML += html+"[/list]";
	document.getElementById("processStatus").innerHTML="";
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
	var s = s-1;
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
  var galUrl = "map.aspx?gal="+loc.substring(0,3);
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

  var newTab = document.createElement("table");
  newTab.setAttribute("class","layout listing");

  var link = document.createElement("a");
  link.appendChild(document.createTextNode("Find " + homeTag + " JGs "));
  link.setAttribute("style", "color:gold;cursor:pointer");

  var newCell = document.createElement("td");
  newCell.appendChild(link);
  newTab.appendChild(newCell);
  
  var link2 = document.createElement("input");
  link2.appendChild(document.createTextNode(gal));
  link2.setAttribute("id", "jgGalaxy");
  link2.setAttribute("size", "1");
  link2.setAttribute("type", "text");
  link2.setAttribute("value", gal);

  var div = document.createElement("div");
  div.id = "jumpGateResults";
  div.style.visilibity = "hidden";

  var newCell = document.createElement("td");
  newCell.appendChild(link2);
  newTab.appendChild(newCell);
  
  var newCell = document.createElement("td");
  newCell.appendChild(newTab);

  newCell.appendChild(div);

  var prevCell = document.getElementById("destination").parentNode;
  insertCell(newCell, prevCell);

  newCell = document.createElement("th");
  newCell.appendChild(document.createTextNode(nbsp(1)));
  prevCell = prevCell.parentNode.previousSibling.cells[1];
  insertCell(newCell, prevCell);
 
  //document.body.appendChild(div);
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
	  if (server == "alpha")
	  {
         var url = "http://rubyfarm.dontexist.net/search/jumpgate?location="+gal+"&commit=Search";}
	  else{
	    var url = "http://deltafarm.dontexist.net/search/jumpgate?location="+gal+"&commit=Search";}

        getPage(url, farmBasesLoaded);
        pendingSearches++;
      // Search for the home guild id
        pendingSearches++;
        var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+homeGuild+"&commit=Search";
        getPage(url, farmBasesLoaded);
    }
	jumpGatesLoading = false;

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
      if (gates[i][2]!="") 
      html += "<td align='right'><small><a href='base.aspx?base="+gates[i][2]
	    else html += "<td align='right'><small><a href='map.aspx?loc="+gates[i][0];
      html += "'>"+gates[i][1]+"</a></small></td></tr>";
    }
    //html += "<tr><td colspan='3'>&nbsp;</td></tr>";
    html += "<tr><td align='center' colspan='3'><b><a id='closeJumpGateResults' style='color:gold;cursor:pointer'>Close</a></b></td><tr>";
    html += "</table>";
    div.innerHTML = html;
    var closeLink = document.getElementById("closeJumpGateResults");
    closeLink.addEventListener('click', closeJumpGateResults, false);
  }

  function galaxyChanged(e)
  {
    var v = e.target.value;
    v = v.replace(/[^0-9\.]/g, "");
    e.target.value = v;
    gal = v;
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

 
  var elem = document.getElementById("jgGalaxy");
  if (elem) {
      elem.addEventListener("keyup", keyUpListener(galaxyChanged), false);
      elem.addEventListener("change", galaxyChanged, false);
  }
  
  link.addEventListener('click', findJumpGates, false);
}

function addFindLZ()
{
  if (!getFlag("searchUsingGenome") /* || !getFlag("searchUsingRubyFARM") */) return;
  
  var t = document.getElementById('fleet_move');
  if (!t) return;
  var form = t.rows[1].cells[0].firstChild;
  form.setAttribute("id", "moveForm");
  t = form.firstChild;
  var r = t.rows[t.rows.length-3];
  var c = r.cells[0];
   
  var start = document.getElementById('start');
  if (!t || !start)
    return;
  var startLoc = start.textContent;
  if (!startLoc.match(/^[A-Z](\d\d)\:(\d\d)\:(\d\d)\:\d\d$/))
    return;
  var gal = RegExp.$1;
  var reg = RegExp.$2;
  var sys = RegExp.$3;

  var div = document.createElement("div");
  div.id = "emptyAstrosResults";
  div.style.visilibity = "hidden";

  var link = document.createElement("a");
  link.appendChild(document.createTextNode("Find LZ: "));
  link.setAttribute("style", "color:gold;cursor:pointer");
  
  var link2 = document.createElement("input");
  link2.appendChild(document.createTextNode(gal));
  link2.setAttribute("id", "mvEmptyAstros");
  link2.setAttribute("size", "7");
  link2.setAttribute("type", "text");
  link2.setAttribute("value", gal+":"+reg+":"+sys);

  var newCell = document.createElement("td");
  newCell.appendChild(link2);
  newCell.appendChild(div);
  insertCell(newCell, c);

  var newCell = document.createElement("td");
  newCell.appendChild(link);
  insertCell(newCell, c);

  var emptyAstrosLoading = false;

  function closeEmptyAstrosResults()
  {
    hideDiv("emptyAstrosResults");
  }

  function emptyAstrosLoaded(planets)
  {
    // Sort by distance and cap the list after the 15 closest gates
    planets.sort(function (x, y) { return x[2]-y[2]; });
    planets = planets.slice(0,20);
    var html = "<table width='220' class='no_back'>";
    html += "<tr style='color:gold'><th align='center'>Location</th>";
    html += "<th align='center'>Type</th>";
    html += "<th align='center'>Dist.</th></tr>";
    for (var i = 0; i < planets.length; i++) {
      var href = '"javascript:fastloc(\'' + planets[i][0] + '\');"';
      html += "<tr><td align='center'><small>";
      html += "<a href="+href+">"+planets[i][0]+"</a></small></td>";
      html += "<td align='center'><small>"+planets[i][1]+"</small></td>";
      html += "<td align='center'><small><a href='map.aspx?loc="+planets[i][0];
      html += "'>"+planets[i][2]+"</a></small></td></tr>";
    }
    //html += "<tr><td colspan='3'>&nbsp;</td></tr>";
    html += "<tr><td align='center' colspan='3'><b><a id='closeEmptyAstrosResults' style='color:gold;cursor:pointer'>Close</a></b></td><tr>";
    html += "</table>";
    div.innerHTML = html;
    var closeLink = document.getElementById("closeEmptyAstrosResults");
    closeLink.addEventListener('click', closeEmptyAstrosResults, false);
  }

  function galaxyChanged(e)
  {
    var v = e.target.value;
    v = v.replace(/[^0-9\.]\:[^0-9\.]/g, "");
    e.target.value = v;

    if (v.match(/(\d\d)\:(\d\d)\:(\d\d)$/)){ 
         gal = RegExp.$1;
		 reg = RegExp.$2;
		 sys = RegExp.$3;
		}
    else 		
      if (v.match(/(\d\d)\:(\d\d)$/)){ 
	     gal = RegExp.$1;
	     reg = RegExp.$2;
		 sys = "";
		 }
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

  var elem = document.getElementById("mvEmptyAstros");
  if (elem) {
      elem.addEventListener("keyup", keyUpListener(galaxyChanged), false);
      elem.addEventListener("change", galaxyChanged, false);
  }
  
  link.addEventListener('click', findEmptyAstros, false);
  
   function findEmptyAstros(e)
  {
    if (emptyAstrosLoading) {
      showDiv("emptyAstrosResults");
      return;
    }
    emptyAstrosLoading = true;
    div.style.display = "block";
    div.style.background = "#000";
    div.style.position = "absolute";
    var x = e.pageX + 50;
    div.style.left = x - x%100;
    var y = e.pageY + 40;
    div.style.top = y - y%20;
    div.style.padding = 5;
    var html = "<table width='220' class='no_back'>";
    html += "<tr><th>Searching DB...</th></tr>";
    html += "<tr><td><small>&nbsp;</small></td></tr>";
    html += "<tr><td align='center' colspan='3'><b><a id='abortEmptyAstrosSearch' style='color:gold;cursor:pointer'>Abort</a></b></td><tr></table>";
    div.innerHTML = html;
    var abortLink = document.getElementById("abortEmptyAstrosSearch");
    abortLink.addEventListener('click', closeEmptyAstrosResults, false);
    showDiv("emptyAstrosResults");
    var pendingSearches = 0;
    var planets = [];
    
    function addPlanet(loc, type){
		for (var i = 0; i < planets.length; i++) 
			if (planets[i][0] == loc) return;
  		planets[planets.length] = [loc, type, distance(startLoc, loc)];
	}

    function genomeEmptyAstrosLoaded(div){
		var tables = div.getElementsByTagName("table");
		for (var i = 0; i < tables.length; i++) {
			if (tables[i].getAttribute("class") == "sortable") {
				var rows = tables[i].rows;
				for (var j = 1; j < rows.length; j++) {
					if (!rows[j].cells[0].innerHTML.match(/color\: red/)){
						var loc = rows[j].cells[0].textContent;
						if (loc.match(/^[A-Z](\d\d)\:(\d\d)\:(\d\d)\:\d\d$/) && (RegExp.$1 == gal) && (RegExp.$2 == reg) && ((sys=="") || (sys==RegExp.$3))){
							var terrain = rows[j].cells[1].textContent;
							var type = rows[j].cells[3].textContent;
							addPlanet(loc, terrain, type);
						}
					}
				}
			}
		}
		if (--pendingSearches == 0) {
			emptyAstrosLoaded(planets);
		}
    }

    if (getFlag("searchUsingGenome")) {
      pendingSearches++;
      var url = "http://genome.aeonanon.com/data/search/astro/?galaxy="+gal
            + "&size=Planet&size=Moon&terrain=Arid&terrain=Asteroid&terrain=Crystalline&terrain=Craters&terrain=Earthly&terrain=Gaia&terrain=Glacial&terrain=Magma&terrain=Metallic&terrain=Oceanic&terrain=Radioactive&terrain=Rocky&terrain=Toxic&terrain=Tundra&terrain=Volcanic&slot=1&slot=2&slot=3&slot=4&slot=5"	  
      getPage(url, genomeEmptyAstrosLoaded);
    }

	loadFriendlyLZ();
	emptyAstrosLoading = false;
  
 
  function genomeGatesLoaded(div){
    var homeTag = getSetting("homeTag", "");
    var tables = div.getElementsByTagName("table");
	var color = getPlayerColor("Home");
	var lzLoc = gal + ((reg=="")?"":(":"+reg)) + ((sys=="")?"":(":"+sys))
    for (var i = 0; i < tables.length; i++) {
		if (tables[i].getAttribute("class") == "sortable") {
			var rows = tables[i].rows;
			for (var j = 1; j < rows.length; j++) {
				var owner = rows[j].cells[2].textContent;
				var loc = rows[j].cells[3].textContent;
				var tag = "<font color='"+color+"'>"+getGuildTag(owner)+"</font>"
				if (loc.match(lzLoc))
					addPlanet(loc, tag);
			}
		}
    }
  	if (--pendingSearches == 0) 
			emptyAstrosLoaded(planets);
  }

  function genomeBasesLoaded(stance, div){
    var t = document.getElementById("base-table");
    if (!t) return;
    t.setAttribute("id", "");
	var color = getPlayerColor(stance);
	var lzLoc = gal + ((reg=="")?"":(":"+reg)) + ((sys=="")?"":(":"+sys))
    for (var i = 1; i < t.rows.length; i++) {
		var owner = t.rows[i].cells[2].textContent;
		var loc = t.rows[i].cells[7].textContent;
		var tag = "<font color='"+color+"'>"+getGuildTag(owner)+"</font>"
		if (loc.match(lzLoc))
			addPlanet(loc, tag);
	}
  	if (--pendingSearches == 0) 
			emptyAstrosLoaded(planets);
  }

  function genomeHomeBasesLoaded(div){
    genomeBasesLoaded("Home", div);
  }

  function genomeAlliedBasesLoaded(div){
    genomeBasesLoaded("allied", div);
  }

  function genomeFriendlyBasesLoaded(div){
    genomeBasesLoaded("friendly", div);
  }

  function farmBasesLoaded(stance, div){
    var homeTag = getSetting("homeTag", "");
    var tables = div.getElementsByTagName("table");
	var color = getPlayerColor(stance);
	var lzLoc = gal + ((reg=="")?"":(":"+reg)) + ((sys=="")?"":(":"+sys))
    for (var i = 0; i < tables.length; i++) {
		if (tables[i].getAttribute("class") == "sortable") {
			var rows = tables[i].rows;
			for (var j = 1; j < rows.length; j++) {
				var owner = rows[j].cells[2].textContent;
				var loc = rows[j].cells[3].textContent;
				var tag = "<font color='"+color+"'>"+getGuildTag(owner)+"</font>"
				if (loc.match(lzLoc))
					addPlanet(loc, tag);
			}
		}
	}
  	if (--pendingSearches == 0) 
			emptyAstrosLoaded(planets);
  }

  function farmHomeBasesLoaded(div){
    farmBasesLoaded("home", div);
  }
 
  function farmAlliedBasesLoaded(div){
    farmBasesLoaded("allied", div);
  }

  function farmFriendlyBasesLoaded(div) {
    farmBasesLoaded("friendly", div);
  }


  function loadFriendlyLZ(){
    var homeGuild = getSetting("homeGuild","");
    if (getFlag("uploadToGenome")) {
      if (homeGuild) {
	// Search for home jump gates using the jump gate search
		var url = "http://genome.aeonanon.com/data/search/gate/?galaxy=" + gal;
		pendingSearches++;	
		getPage(url, genomeGatesLoaded);
	// Search for allied gates using the regular search
		url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+homeGuild;
		pendingSearches++;	
		getPage(url, genomeHomeBasesLoaded);
      }
    // Search for configured friendly guilds
		var allies = getAlliedGuilds().join(",");
		url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+allies;		
		pendingSearches++;	
		getPage(url, genomeAlliedBasesLoaded);
    // Search for configured friendly guilds
		var friends = getFriendlyGuilds().join(",");		
		url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+friends;
		pendingSearches++;	
		getPage(url, genomeFriendlyBasesLoaded);
    }
	
    if (getFlag("uploadToRubyFARM")) {
	  var lzLoc = gal + ((reg=="")?"":(":"+reg)) + ((sys=="")?"":(":"+sys))
      if (homeGuild) {
  	// Search for allied jump gates using the jump gate search
		var url = "http://rubyfarm.dontexist.net/search/jumpgate?location="+lzLoc+"&commit=Search";
//		pendingSearches++;	
//		getPage(url, farmHomeBasesLoaded);
	// Search for allied jump gates using the regular search
		var url = "http://rubyfarm.dontexist.net/search/base?location="+lzLoc+"&guildid="+homeGuild+"&commit=Search";
//		pendingSearches++;	
//		getPage(url, farmHomeBasesLoaded);
      }
      // Search for configured allied guilds
      var allies = getAlliedGuilds().join(",");
		var url = "http://rubyfarm.dontexist.net/search/base?location="+lzLoc+"&guildid="+allies+"&commit=Search";
//		pendingSearches++;	
//		getPage(url, farmAlliedBasesLoaded);
      // Search for configured friendly guilds
        var friends = getFriendlyGuilds().join(",");
		var url = "http://rubyfarm.dontexist.net/search/base?location="+lzLoc+"&guildid="+friends+"&commit=Search";
//		pendingSearches++;	
//		getPage(url, farmFriendlyBasesLoaded);
    }
  }
 }
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
  var post = "[i][color='" + quoteColor + "'][code][b][u]" +
    row.cells[1].textContent +
    ", " + row.cells[3].textContent + "[/u][/b]\n" +
    getPostContent(row.nextSibling.firstChild) + "[/code][/color][/i]\n\n";
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
var location = '$1:$2';
 var action = "base.aspx?base=" + trades[i][0]
      + "&view=trade&action=new";
    var onclick = "document.tradeForm.action='"+action+"';";
    onclick += "document.tradeForm.destination.value='$1:$2';";
    onclick += "window.submitTradeForm();";
    s += '<option onclick="'+onclick+'">';
    s += "From "+trades[i][1];
    s += " ("+trades[i][2]+"/"+trades[i][3]+" econ) ";
    s += "distancePairStr"+trades[i][1]+"-"+location;
    s += " Distance</option>";

}
  s += "</select><br/>";
tmp = tmp.replace (r, s);
while (tmp.indexOf("distancePairStr")>0){
locpair=tmp.slice(tmp.indexOf("distancePairStr")+15,tmp.indexOf("distancePairStr")+40);

locpairarray = locpair.split("-");

distancestring = distance(locpairarray[0],locpairarray[1]);

strToReplace=tmp.slice(tmp.indexOf("distancePairStr"),tmp.indexOf("distancePairStr")+40);

tmp = tmp.replace(strToReplace,distancestring);

}


row.innerHTML = tmp;
}

function colorTradePartners(row, partners)
{
  var tmp = row.innerHTML;
   for (var i = 0; i < partners.length; i++) { 
     if (tmp.indexOf(partners[i]) > 0)
       tmp = tmp.replace(partners[i], "<font color='red'>" + partners[i] + "</font>");
	 else 
       if (partners[i].match(/\[(.*?)\](.*?)$/)) {
          tmp = tmp.replace(RegExp.$2.trim(), "<font color='red'>" + RegExp.$2 + "</font>");
        }
   	 }
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
  var partners = [];
  var t = document.getElementById("empire_trade_trade-routes");
  var rows = t.rows[1].cells[0].firstChild.rows;
  for (var i = 1; i < rows.length; i++) {
    var tmp = rows[i].cells[1].innerHTML;
    if (tmp.match(/\"gray\"\>(.*?)\<\/small/i))
      partners.push(RegExp.$1);
    }
   
  setSetting("openTrades", trades.join(";"));
  setSetting("tradePartners", partners.join(";"));
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

function getPartnerTrades()
{
  var s = getSetting("tradePartners");
  if (!s)
    return s;
  var partners = s.split(";");
  return partners;
}

function processBoardPosts()
{
  if (getFlag("insertTradeLinks"))
    insertTradeForm();
  var trades = getOpenTrades();
  var partners = getPartnerTrades();
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
	 //insertQuoteLink(r);
	if (trades && getFlag("insertTradeLinks")){
	  insertTradeLinks(t.rows[j+1], trades);
	  }
	if (partners  && getFlag("colorTradePartners") ){
   	  if (document.location.href.match(/board\.aspx\?folder=3/)){ 
	     colorTradePartners(t.rows[j], partners);
   	     colorTradePartners(t.rows[j+1], partners);
		} 
	  }
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
      post = "[quote]" +
	post + "[/quote]\n\n";
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
// Adapted from Astro Empire Tools
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
    var player = row.cells[1].innerHTML.match(/\">(.*?)<\/a>/)[1];
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

 function jgRadius(level)
{
  var i = parseInt(level);
  if (i > 15) i = 15; 
  return 5 + i/3;
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
 if (opera) return;
 
 if (document.getElementById('map2_FloatBox')){ 
	addMapOverlaysNew();
	return;
} 

 if (!getFlag("sarchUsingGenome") && !getFlag("searchUsingRubyFARM")) return;
 
 if (document.location.href.match(/map\.aspx\?.*loc=[A-Z]\d\d:\d\d:[\d:]+$/)){
	    addLocationSearchFrame();
		return;
 }
  
  var mycanvas = document.getElementById("myCanvas");
  if (!mycanvas){ 
	var region = xpath("//div[@style='position: relative; width: 484px; height: 484px;']");
	if(region==""){
	    addLocationSearchFrame();
		return;
	}
    var mycanvas = region[0];
    if (!mycanvas) return;
    if(mycanvas.innerHTML.match(/loc\=A(\d\d):(\d\d)/)){ 
		var gal = RegExp.$1
		var reg = RegExp.$2;
		} 

	var systemList = mycanvas.getElementsByTagName("a");
	var cList = [];
    for (var i in systemList) {
        if (systemList[i].innerHTML.match(/left\:.(\d+)px;.top\:.(\d+)px;\".alt\=\"Star.\(A(.*?)\)/))
          cList.push({"loc" : RegExp.$3, "x" : RegExp.$1, "y" : RegExp.$2});	    
		  }
	}
  else { 
    var gal = mycanvas.innerHTML.match(/loc\=A(\d\d):/)[1];
    var reg = "00"; 
	}  
	
 function newCanvas(canvasID)
  {
    var c = newElement("div", { id: canvasID, style: " z-index: 0; visibility: hidden;" });
    mycanvas.appendChild(c);
    return c;
  }

  function findMapCoord(loc){
     for (var i in cList) { 
      if (cList[i].loc == loc.substring(1,9)) 
         return { "x" : cList[i].x, "y" : cList[i].y};
	}
	 return { "x" : 0, "y" : 0}
  }
  
  function fillRegion(canvas, row, col, caption, color)
  {
    var y = row*60;
    var x = col*60;
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
    img.style.zIndex = "1";
    img.style.position = "absolute";
    a.appendChild(img);
    div.appendChild(a);
    canvas.appendChild(div);
  }

  function paintDot(canvas, loc, caption, color, radius)
  {

    if (reg!="00") {
	     var xy =  findMapCoord(loc);
		 if (x+y==0) return;
		 var x = Number(xy.x);
		 var y = Number(xy.y);
		 var dx = 4;
		 var dy = -9;
	}
    else {
		var m = loc.match(/A\d\d:(\d)(\d):(\d)(\d)/);
		var y = parseInt(m[1])*10 + parseInt(m[3]);
		var x = parseInt(m[2])*10 + parseInt(m[4]);
		var minx = 2.5;
		var miny = 2;
		var w = 600;
		var h = 600;
		var skewx = (y%2) * 0;
		var skewy = (x%2) * 0;
		x = x * w / 100 + minx + skewx;
		y = y * h / 100 + miny + skewy;
		var dx = -5;
		var dy = -5;
		var canvasID = canvas.getAttribute("id");
		var code = "g = new jsGraphics('" + canvasID + "'); ";
		code += "g.setColor('"+color+"'); ";
		code += "g.fillEllipse("+(x-radius/2)+", "+(y-radius/2)+", "+radius+", "+radius+"); ";
		code += "g.paint();"
		addScript(code);		

        /* var stats = unitStats["Fleet Carrier"];
		var time = 7;
		var techs = " SD 20 WD 20 ";
//        var speed = stats.adjustedSpeed(techs, radius, 0 );
        var speed = stats.speed;

        var cRadius = time * speed *(1+radius) * w / 100;

		var code = "gr = new jsGraphics('" + canvasID + "'); ";
		code += "gr.setColor('"+color+"'); ";
		code += "gr.drawEllipse("+(x-cRadius/2)+", "+(y-cRadius/2)+", "+cRadius+", "+cRadius+"); ";
		code += "gr.paint();"
		addScript(code);		  */
	}

    var style = "position: absolute; left: " + (x+dx) +"px; top: " + (y+dy) + "px; color:" + color +"; font-size:xx-large;" ;
    var div = newElement("div", { style: style });
    var a = newElement("a", { href: "map.aspx?loc="+loc });
    if (reg!="00") {
		a.textContent = "\u2022";
		a.alt = caption;
		a.title = caption;
		a.setAttribute("style","text-decoration : none; color:" + color);
		}
	else {	
		var img = newElement("img", { src: "/images/point.gif", alt: caption, title: caption, id: canvasID+loc, width: "9", height: "9" });
		img.style.zIndex = "1";
		img.style.position = "absolute";
		a.appendChild(img);
	} 
    div.appendChild(a);
	canvas.appendChild(div);
  }

 function paintJGrange(canvas, loc, color, radius)
  {

    if (reg!="00") return;
	var m = loc.match(/A\d\d:(\d)(\d):(\d)(\d)/);
	var y = parseInt(m[1])*10 + parseInt(m[3]);
	var x = parseInt(m[2])*10 + parseInt(m[4]);
	var minx = 2.5;
	var miny = 2;
	var w = 600;
	var h = 600;
	var skewx = (y%2) * 0;
	var skewy = (x%2) * 0;
	x = x * w / 100 + minx + skewx;
	y = y * h / 100 + miny + skewy;
	var dx = -5;
	var dy = -5;

	var stats = unitStats["Frigate"];
	var time = 60/60;
	var techs = " SD 20 WD 20 ";
//        var speed = stats.adjustedSpeed(techs, radius, 0 );
    var speed = stats.speed;

    var cRadius = radius * w / 100;

	var code = "gr = new jsGraphics('" + canvasID + "'); ";
	code += "gr.setColor('"+color+"'); ";
	code += "gr.drawEllipse("+(x-cRadius/2)+", "+(y-cRadius/2)+", "+cRadius+", "+cRadius+"); ";
	code += "gr.paint();"
	addScript(code);		 

    div.appendChild(a);
	canvas.appendChild(div);
  }
    
  var bestGuild = [];
  var bestAllied = [];
  var bestFriendly = [];
  var bestHostile = [];
  var bestEnemy = [];
  var idGildsBases = [];
  var idPlayersBases = [];
  var units = ["Scout Ship", "Corvette", "Frigate", "Cruiser",
		 "Heavy Cruiser", "Dreadnought", "Leviathan", "Death Star"];
		 
  var homeColor = getPlayerColor("Home");	 
  var alliedColor = getPlayerColor("Allied");	 
  var friendlyColor = getPlayerColor("Friendly");	 
  var hostileColor = getPlayerColor("Hostile");	 
  var enemyColor = getPlayerColor("Enemy");	 
  var idPlayerColor = "#22FFFF";	 
  var idGuildColor = "#FF00FF";	 

  function addBase(stance, name, owner, loc, level)
  {
    var tag = getGuildTag(owner);
    if (!tag) return;
    var system = loc.match(/A\d\d:(\d\d:\d\d:\d\d)/);
    if (!system) return;
    system = system[1];

    var desc = name + " (" + owner + ", level " + level + ")";

    if (stance == "guild") {
      if (!bestGuild[system] || bestGuild[system] < level) {
		bestGuild[system] = level;
		paintDot(homeCanvas, loc, desc, homeColor, jgRadius(level));
      }
    }
    else if (stance == "allied") {
      if (!bestAllied[system] || bestAllied[system] < level) {
		bestAllied[system] = level;
		paintDot(alliedCanvas, loc, desc, alliedColor, jgRadius(level));
      }
    }
    else if (stance == "friendly") {
      if (!bestAllied[system]) {
		if (!bestFriendly[system] || bestFriendly[system] < level) {
			bestFriendly[system] = level;
			paintDot(friendlyCanvas, loc, desc, friendlyColor, jgRadius(level));
		}
      }
    }
    else if (stance == "hostile") {
      if (!bestHostile[system]) {
		if (!bestHostile[system] || bestHostile[system] < level) {
			bestHostile[system] = level;
			paintDot(hostileCanvas, loc, desc, hostileColor, jgRadius(level));
		}
       }
    }
    else if (stance == "enemy") {
      if (!bestEnemy[system] || bestEnemy[system] < level) {
		bestEnemy[system] = level;
		paintDot(enemyCanvas, loc, desc, enemyColor, jgRadius(level));
      }
    }
    else if (stance == "idGuilds") {
      if (!idGildsBases[system] || idGildsBases[system] < level) {
		idGildsBases[system] = level;
		paintDot(idGuildsCanvas, loc, desc, idGuildColor, jgRadius(level));
      }
    }
    else if (stance == "idPlayers") {
      if (!idPlayersBases[system] || idPlayersBases[system] < level) {
		idPlayersBases[system] = level;
		paintDot(idPlayersCanvas, loc, desc, idPlayerColor, jgRadius(level));
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
				if ((getGuildTag(owner) == homeTag) && ((reg == "00") || (reg == loc.substring(4,6)))) {
					addBase("guild", name, owner, loc, level);
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
      if ((loc.substring(1,3)==gal) && ((reg == "00") || (reg == loc.substring(4,6))))
           addBase(stance, name, owner, loc, level);
	  }
//	selectJGrangeCanvas(bestEnemy); 
  }

  function genomeHomeBasesLoaded(div)
  {
    genomeBasesLoaded("guild", div);
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

  function genomeidGuildsLoaded(div)
  {
    genomeBasesLoaded("idGuilds", div);
  }

  function genomeidPlayersLoaded(div)
  {
    genomeBasesLoaded("idPlayers", div);
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
//				if (stance != "allied" || getGuildTag(owner) == homeTag) {
				if ((loc.substring(1,3)==gal) && ((reg == "00") || (reg == loc.substring(4,6))))
						addBase(stance, name, owner, loc, level);
//				}
			}
		}
	}
  }

  function farmHomeBasesLoaded(div)
  {
    farmBasesLoaded("guild", div);
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

  function farmidGuildsLoaded(div)
  {
    farmBasesLoaded("idGuilds", div);
  }

  function farmidPlayersLoaded(div)
  {
    farmBasesLoaded("idPlayers", div);
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
			if ((reg == "00") || (reg == sys.substring(4,6)))
				paintDot(scoutedCanvas, sys, time, "#ffffff", 10);
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
    var homeGuild = getSetting("homeGuild","");
    if (getFlag("searchUsingGenome")) {
      if (homeGuild) {
	// Search for home jump gates using the jump gate search
		var url = "http://genome.aeonanon.com/data/search/gate/?galaxy=" + gal;
		getPage(url, genomeGatesLoaded);
	// Search for allied gates using the regular search
		url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+homeGuild;
		getPage(url, genomeHomeBasesLoaded);
      }
    // Search for configured friendly guilds
      var allies = getAlliedGuilds();
      for (var i in allies) {
		url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+allies[i];
		getPage(url, genomeAlliedBasesLoaded);
      }
    // Search for configured friendly guilds
      var friends = getFriendlyGuilds();
      for (var i in friends) {
		url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+friends[i];
		getPage(url, genomeFriendlyBasesLoaded);
      }
    }
	
    if (getFlag("seacrhUsingRubyFARM")) {
      if (homeGuild) {
  	// Search for allied jump gates using the jump gate search
		var url = "http://rubyfarm.dontexist.net/search/jumpgate?location="+gal+"&commit=Search";
		getPage(url, farmHomeBasesLoaded);
	// Search for allied jump gates using the regular search
		var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+homeGuild+"&commit=Search";
		getPage(url, farmHomeBasesLoaded);
      }
      // Search for configured allied guilds
      var allies = getAlliedGuilds();
      for (var i in allies) {
		var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+allies[i]+"&commit=Search";
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
    if (getFlag("searchUsingGenome")) {
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
    if (getFlag("searchUsingRubyFARM")) {
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

  function loadidGuilds()
  {
       var guilds = document.getElementById("guildIDs").value.split(",");
       for (var i in guilds) {
			if (getFlag("searchUsingGenome")) {
				var url = "http://genome.aeonanon.com/data/search/base/?galaxy=" + gal + "&econ=0&guild="+guilds[i];
				getPage(url, genomeidGuildsLoaded);
			} 
			if (getFlag("searchUsingRubyFARM")) {
				var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&guildid="+guilds[i]+"&commit=Search";
				getPage(url, farmidGuildsLoaded);
			} 
		}
    
  }
    
  function loadidPlayers()
  {
    var players = document.getElementById("playerIDs").value.split(",");
    for (var i in players) {
	    if (getFlag("searchUsingGenome")) {
			var url = "http://genome.aeonanon.com/data/view/player/" + players[i];
			getPage(url, genomeidPlayersLoaded);
		}
	    if (getFlag("searchUsingRubyFARM")) {
			var url = "http://rubyfarm.dontexist.net/search/base?location="+gal+"&ownerid="+players[i]+"&commit=Search";
			getPage(url, farmidPlayersLoaded);
		}
    }
    
  }

  function loadLastScoutedTimes()
  {
    if (getFlag("searchUsingGenome")) {
      for (var row = 0; row < 10; row++) {
	var r = parseInt(gal)*10 + row + 801;
	var url = "http://genome.aeonanon.com/claims/row/"+r+"/";
	getPage(url, genomeRowLoaded);
      }
    }
  }

  var guildGatesLoading = false;
  var alliedGatesLoading = false;
  var hostileGatesLoading = false;
  var friendlyGatesLoading = false;
  var enemyGatesLoading = false;
  var lastScoutedTimesLoading = false;
  var idGuildsLoading = false;
  var idPlayersLoading = false;

  function selectMapOverlay(divID)
  {
  var color = "#333399";
  if (document.getElementById("select_"+divID).getAttribute("style")==""){
      if (divID == "homeCanvas") {
	    color = homeColor;
        if (!guildGatesLoading) {
			guildGatesLoading = true;
			window.setTimeout(loadFriendlyGates, 0);
		}
	  }
      if (divID == "alliedCanvas") {
	    color = alliedColor;
        if (!alliedGatesLoading) {
			alliedGatesLoading = true;
			window.setTimeout(loadFriendlyGates, 0);
		}
	  }
      if (divID == "friendlyCanvas") {
	    color = friendlyColor;
		if (!friendlyGatesLoading) {
			friendlyGatesLoading = true;
			window.setTimeout(loadFriendlyGates, 0);
		}
      }
      if (divID == "enemyCanvas") {
	    color = enemyColor;
		if (!enemyGatesLoading) {
			enemyGatesLoading = true;
			window.setTimeout(loadEnemyGates, 0);
        }
      }
      if (divID == "hostileCanvas") {
	    color = hostileColor;
		if (!hostileGatesLoading) {
			hostileGatesLoading = true;
			window.setTimeout(loadEnemyGates, 0);
		}
      }
      if (divID == "scoutedCanvas" && !lastScoutedTimesLoading) {
		lastScoutedTimesLoading = true;
		window.setTimeout(loadLastScoutedTimes, 0);
	  }
      if (divID == "scoutedCanvas2" && !lastScoutedTimesLoading) {
		lastScoutedTimesLoading = true;
		window.setTimeout(loadLastScoutedTimes, 0);
	  }
  
      if (divID == "idGuildsCanvas"){
	     color = idGuildColor;
	     if (!idGuildsLoading) {
			idGuildsLoading = true;
			window.setTimeout(loadidGuilds, 0);
		}
	  }

      if (divID == "idPlayersCanvas"){
	     color = idPlayerColor;
	     if (!idPlayersLoading) {
			idPlayerssLoading = true;
			window.setTimeout(loadidPlayers, 0);
		}
	  }
	  
      showDiv(divID);
      document.getElementById("select_"+divID).setAttribute("style", "background: "+color+";");
	}
   else { 
      hideDiv(divID);
      document.getElementById("select_"+divID).setAttribute("style", "");
    }

  }

  function cleanidPlayersCanvas()
  {
    idPlayersCanvas.innerHTML = "";
	idPlayersLoading = false;
    idPlayersBases = [];
      hideDiv(idPlayersCanvas);
      document.getElementById("select_idPlayersCanvas").setAttribute("style", "");
 }	

  function cleanidGuildsCanvas()
  {
	idGuildsCanvas.innerHTML = "";
	idGuildsLoading = false;
    idGildsBases = [];
    hideDiv(idGuildsCanvas);
    document.getElementById("select_idGuildsCanvas").setAttribute("style", "");
  }	
  
  function stanceCheckbox(canvasID,stance){
   var tag = (stance == "Home")?getSetting("homeTag"):stance;
   return "<span id= show"+stance+">"
	 + "<font size='small'><input type='checkbox' id='setMap"+ stance +"'>"
	 + tag + "<span id='count" + stance + "'></span>"
	 +"</font></span>"
 }

  function overlayMenuItem(canvasID, caption)
  {
    return '<th id="select_'+canvasID+'" style="">' +
      '<a style="cursor:pointer;" onclick="selectMapOverlay(\''
      + canvasID + '\');"><font color="gold">' + ((caption == "Home")?getSetting("homeTag"):caption) + '</font></a></th>';
  }

  function selectJGrangeCanvas(jgList)
  {   
    return;
    var html = '<table style="position: relative; left: -300px; top: 2px;" > <tr>';

	html += "<select id='idGates' onChange='updateRanges()'>";
	html += "<option value=''>Gates</option>";   
 	for (var system in jgList) {
      html += "<option value='"+system+"'>"+system+"</option>";
    }
 	html += "</select>";

	html += "<small>Time: <input id='travelTime' onChange='updateRanges()' onKeyUp='updateRanges()' size='6' class='quant input-numeric' type='text'>";
	
	html += "Log:";
	html += "<input id='travelLog' onChange='updateRanges()' size='6' type='text'>";
	html += "SD:";
	html += "<input id='travelStellar' onChange='updateRanges()' size='6' type='text'>";
	html += "SD:";
	html += "<input id='travelWarp' onChange='updateRanges()' size='6' type='text'>";
	
	html += "</small></tr></table>";


	var div = document.getElementById("jgRangeMenu");
	div.innerHTML = html;
	}
  
  var menu = newElement("div", { style: "position: relative; left: 50%; top:40px" });
  var tmp = '<table style="position: relative; left: -300px; top: 2px;" ';
  tmp += 'class="header" width="606"><tr align="center">';
  tmp += overlayMenuItem("homeCanvas", "Home");
  tmp += overlayMenuItem("alliedCanvas", "Allied");
  tmp += overlayMenuItem("enemyCanvas", "Enemy");
  tmp += overlayMenuItem("friendlyCanvas", "Friendly");
  tmp += overlayMenuItem("hostileCanvas", "Hostile");
  tmp += overlayMenuItem("scoutedCanvas", "Scouted bases");
  tmp += '</tr><tr>';
  tmp += overlayMenuItem("idGuildsCanvas", "Guilds:");
  tmp += "<td><input id='guildIDs' onChange='cleanidGuildsCanvas()' onKeyUp='cleanidGuildsCanvas()' size='13' class='quant input-numeric' type='text'></td>";
  tmp += overlayMenuItem("idPlayersCanvas", "Players:");
  tmp += "<td><input id='playerIDs' onChange='cleanidPlayersCanvas()' onKeyUp='cleanidPlayersCanvas()' size='13' class='quant input-numeric' type='text'></td>";
  tmp += "<td><span id= showBaseList><font color='gold'><input type='checkbox' id='serachBases'"+(getFlag("mapRegionSearch")?" checked":"") + ">List bases</font></span></td>"
  tmp += overlayMenuItem("scoutedCanvas2", "Scouted rows");
  tmp += '</tr><tr>';
  tmp += '</tr></table>';
  tmp += "<div id='jgRangeMenu'></div>";
  menu.innerHTML = tmp;
  document.body.appendChild(menu);

  // Create canvases
  var homeCanvas = newCanvas("homeCanvas");
  var alliedCanvas = newCanvas("alliedCanvas");
  var enemyCanvas = newCanvas("enemyCanvas");
  var friendlyCanvas = newCanvas("friendlyCanvas");
  var hostileCanvas = newCanvas("hostileCanvas");
  var idGuildsCanvas = newCanvas("idGuildsCanvas");
  var idPlayersCanvas = newCanvas("idPlayersCanvas");
  var scoutedCanvas = newCanvas("scoutedCanvas");
  
  var scoutedCanvas2 = newCanvas("scoutedCanvas2");

  scoutedCanvas.style.zIndex = "2";
  scoutedCanvas.style.opacity = ".5";
  scoutedCanvas2.style.zIndex = "2";
  scoutedCanvas2.style.opacity = ".15";

  var jgRangeCanvas = newCanvas("jgRangeCanvas");

  var listener = function (e) {setFlag('mapRegionSearch', e.target.checked);addLocationSearchFrame(); };
  document.getElementById('showBaseList').addEventListener("change", listener, false);

  unsafeWindow.selectMapOverlay = selectMapOverlay;
  
  unsafeWindow.cleanidPlayersCanvas = function(e) {
    window.setTimeout(cleanidPlayersCanvas, 0);
  };
  unsafeWindow.cleanidGuildsCanvas = function(e) {
    window.setTimeout(cleanidGuildsCanvas, 0);
  };

  addLocationSearchFrame();
  
  function addLocationSearchFrame(){
  if (opera) return;
  if (!getFlag("mapRegionSearch")){ 
	if (document.getElementById("searchResultsG")){document.getElementById("searchResultsG").innerHTML = ""}
	if (document.getElementById("searchResultsR")){document.getElementById("searchResultsR").innerHTML = ""}
	return;
  }

  document.location.href.match(/map\.aspx\?.*loc=([A-Z]\d\d:[\d:]+)$/)
  var loc = RegExp.$1;
  var inRegion = loc.match(/^[A-Z]\d\d:\d\d$/);
  var inSystem = loc.match(/^[A-Z]\d\d:\d\d:\d\d$/);
  var inAstro  = loc.match(/^[A-Z]\d\d:\d\d:\d\d:\d\d$/);
  if (!inRegion) {
    // Don't search if we have eyes on the system / astro
    if ((document.body.innerHTML.match(/\d\d\:\d\d\:\d\d\:\d\d_b/)) ||
		(!document.body.innerHTML.match(/\/images\/astros\/(unknown|asteroid)\.jpg/i)) ||
	    (document.body.innerHTML.match(/base\.aspx\?base=\d+/))){
			return;
    }
  }
  
  var urlG = "";
  var urlR = "";

  if (getFlag("searchUsingGenome")) {
    var urlG = "http://genome.aeonanon.com/data/search/location/?location=" + encodeURIComponent(loc);

    function onLoadG(div)
    {
      fixLinks(div, /\/data\/view/, "http://genome.aeonanon.com/data/view");
      var src = document.getElementById("base-table");
      var dst = document.getElementById("searchResultsG");
      if ((src && dst) && (src.rows.length>1))	 {
		var tmp = '<table align="center" width="'+twidth+'"';
		tmp += ' class="sortable" id="resultTableG" cellpadding="2">';
		tmp += src.innerHTML + '</table>';
		dst.innerHTML = tmp;
		makeSortable("resultTableG");
      }
    };
  }

  if (getFlag("searchUsingRubyFARM")) {
    var urlR = "http://rubyfarm.dontexist.net/search/base?location=" + encodeURIComponent(loc) + "&commit=Search"

    function onLoadR(div)
    {
      fixLinks(div, /\/base\/view/, "http://rubyfarm.dontexist.net/base/view");
      fixLinks(div, /\/player\/view/, "http://rubyfarm.dontexist.net/player/view");
      var m = div.innerHTML.match(/<table class=.sortable.>((\n|\r|.)*?)<\/table>/gi);
	  var tableContent = RegExp.$1;
	  if (!tableContent.match(/<td>/)) tableContent = "";
      var dst = document.getElementById("searchResultsR");
   
      if (m && dst) {
		if (tableContent!="") { 
			var tmp = '<table align="center" width="'+twidth+'"';
			tmp += ' class="sortable" id="resultTableR" cellpadding="2">';
			tmp += tableContent + '</table>';
			dst.innerHTML = tmp;
			makeSortable("resultTableR");
		}
      }
    };
  }
  else {
    return;
  }
  
  var content = '<br/><br/><span id="searchResultsG"></span><br/><span id="searchResultsR"></span><br/>';
  if (inRegion) {
      content = '<br/><br/>' + content;
    }
  else if (inSystem) {
      content = '<br/>' + content;
    }
  displayData(-100, content);
  if (getFlag("searchUsingRubyFARM")) getPage(urlR, onLoadR);
  if (getFlag("searchUsingGenome")) getPage(urlG, onLoadG);
  
/*   if (inSystem) {
	if (document.getElementById("searchResultsG")){
	}
	if (document.getElementById("searchResultsR")){
	
	}
  }  
 */  
  if (server == "delta"){  
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

	if (getFlag("searchUsingdeltaFARM")) {
		var url = "http://deltafarm.dontexist.net/search/base?location=" + encodeURIComponent(loc) + "&commit=Search"
		var dbName = "deltaFARM";

		function onLoad(div){
			fixLinks(div, /\/base\/view/, "http://deltafarm.dontexist.net/base/view");
			fixLinks(div, /\/player\/view/, "http://deltafarm.dontexist.net/player/view");
			var m = div.innerHTML.match(/<table class=.sortable.>((\n|\r|.)*?)<\/table>/gi);
			var dst = document.getElementById("searchResults");
			if (m && dst) {
				var tmp = '<table align="center" width="'+twidth+'"';
				tmp += ' class="sortable" id="resultTableR" cellpadding="2">';
				tmp += RegExp.$1 + '</table>';
				dst.innerHTML = tmp;
				makeSortable("resultTableR");
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
}
 
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
    return "<a style='color:"+getPlayerColor("Home")
      +"' href='guild.aspx?guild="+guild+"'>"+tag+"</a>";
  }
  else {
    return "<b><font color='red'>Unknown</font></b>";
  }
}

function recordHomeGuild()
{
  var html = document.body.innerHTML;
  if (html.match(/<br><b>Guild:<\/b>\s*(\d+)<br><br><b>Tag:<\/b>\s*(\[.*?\])\s*<br><br>/i)) {
    setSetting("homeTag", RegExp.$2);
    setSetting("homeGuild", RegExp.$1);
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
      setSetting("tag"+guild, RegExp.$1.trim());
    }
  }
}

function getPlayerColor(stance)
{
  if(getSetting("stanceColors","")){ 
	var recStances = getSetting("stanceColors","").split(";");
	for (var i in recStances){ 
		var st = recStances[i].split(",");
		if (st[0].toLowerCase() == stance.toLowerCase()) {
			return st[1]
		}
	} 
	return revertToDefaultPlayerColor(stance);
  }
  return revertToDefaultPlayerColor(stance);
}

function setPlayerColor(stance, color)
{
  if(getSetting("stanceColors","")){ 
	var recStances = getSetting("stanceColors","").split(";");
	for (var i in recStances){ 
		var st = recStances[i].split(",");
		if (st[0].toLowerCase() == stance.toLowerCase()) {
			st[1] = color;
			recStances[i] = st.join(",");
			setSetting("stanceColors", recStances.join(";"));
			return color;
		}
	} 
	recStances.push(stance+","+color);
	setSetting("stanceColors", recStances.join(";"));
	return color;
  }
  setSetting("stanceColors", stance+","+color);
}

function revertToDefaultPlayerColor(stance)
{
	for (i=0; i< stances.length; i++){ 
		if (stances[i][0]==stance)
			return setPlayerColor(stance, stances[i][1]);
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
      case "allied":
		setAlliedGuild(guild);
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
  var allied = isAlliedGuild(guild);
  var hostile = isHostileGuild(guild);
  var enemy = isEnemyGuild(guild);
  var neutral = !(allied || friendly || hostile || enemy);
  var selectedColor = getPlayerColor("Neutral");
  if (friendly) selectedColor = getPlayerColor("Friendly");
  else if (allied) selectedColor = getPlayerColor("Allied");
  else if (hostile) selectedColor = getPlayerColor("Hostile");
  else if (enemy) selectedColor = getPlayerColor("Enemy");

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
  html += option("allied", "Allied", allied);
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
      setSetting("tag"+guild, RegExp.$2.trim());
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
  return "[url=profile.aspx?player="+p+"]"+getPlayerName(p)+"[/url]";
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
	  sendMessage(p[i], parseSecurityCode(message,i), false);
	}
	else {
	  // Send a message in a separate frame, then wait a bit
	  document.getElementById("numRemaining").innerHTML = p.length-i;
	  sendMessage(p[i], parseSecurityCode(message,i), true);
	  i++;
	  document.getElementById("numRemaining").innerHTML = p.length-i;
	  var delay = 3000 + Math.floor(Math.random()*2000);
	  window.setTimeout(send, delay);
	}
      }
      window.setTimeout(send, 0);
    }
  }

  function parseSecurityCode(txt,order) {
	if (txt.match('[SC]')){ 
		txt = txt.replace('[SC]',String.fromCharCode(65+order));
		}
		
	if (txt.match('[sc]'))
		txt = txt.replace('[sc]',String.fromCharCode(97+order));
		
	if (txt.match('[NSC]'))
		txt = txt.replace('[NSC]',order);
		
	return txt;
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
	submitMessagePreview(recipients, ccs, bccs, parseSecurityCode(body.value,0), false);
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
  txt = txt.split("\\n").join("\n")

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
    s += "onClick='massMessage([$1],";
    s += "\"\"";
    s += ")'>$3</a>";
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

var techName = {};
techName['A'] = "Armor";
techName['L'] = "Laser";
techName['M'] = "Missiles";
techName['PL'] = "Plasma";
techName['SH'] = "Shielding";
techName['I'] = "Ion";
techName['PH'] = "Photon";
techName['D'] = "Disruptor";

var techSupportName = {};
techSupportName['E'] = "Energy";
techSupportName['C'] = "Computer";
techSupportName['AI'] = "Artificial Inteligence";
techSupportName['CN'] = "Cybernetics";
techSupportName['TC'] = "Tachion Communications";

var techTravelName = {};
techTravelName['SD'] = "Stellar Drive";
techTravelName['WD'] = "Warp Drive";

var techAbbr = ["E","C","A","L","M","SD","PL","WD","SH",
		  "I","PH","AI","D","CN","TC"];
		   
 //-- Add a tech editor in profile pages and saves name and level in the player name string
function makeTechDiv()
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
    var techwidth = twidth - 50;
    var html = "<table class='layout listing' width='"+techwidth+"' align='center' id='techEditor'><tr>"
      +"<th class='bcHeading2' colspan='2' style='color:gold'>Attack/Defense</th>"
	  +"<th class='bcHeading2' colspan='2' style='color:gold'>Infrastructure</th>"
	  +"<th class='bcHeading2' colspan='2' style='color:gold'>Travel</th>"
	  +"</tr>";
    
	var listT = [];
	var k = 0;
    for (var tech in techName) {
		listT[k] = "<tr><td class='pfTech' align='center' width='180'>"
	              +techName[tech]+"</td>"
	              +"<td align='center' width='50'>"
	              +techSelector("pfTechSelect", "pfTech"+tech)+"</td>";
		k++;
	}
	var listS = [];
 	var k = 0;
    for (var tech in techSupportName) {
		listS[k] = "<td class='pfTech' align='center'  width='180'>"
	          +techSupportName[tech]+"</td>"
	          +"<td align='center'  width='50'>"
	          +techSelector("pfTechSelect", "pfTech"+tech)+"</td>";
		k++;
	}
	var listV = [];
 	var k = 0;
    for (var tech in techTravelName) {
		listV[k] =	"<td class='pfTech' align='center' width='180'>"
	          +techTravelName[tech]+"</td>"
	          +"<td align='center'  width='50'>"
	          +techSelector("pfTechSelect", "pfTech"+tech)+"</td>";
		k++;
	}
			 
    for (var k=0; k < 8; k++){
        html += listT[k];
		if (k < 5) html += listS[k];
		if (k < 2) html += listV[k];
     }		
    
    html += "</tr><tr><td colspan='6' align='center' style='padding-top:12px'>";
    html += "<small>Abbreviated tech list: <input id='pfParseTech' title='Paste tech string (A30 L30...)'"
      + "size='60' maxlength='256' type='text' value=''></small></td></tr>";
	  
    html += "</tr></table>";
    return html;
  }

  var div = document.createElement("div");
  var html = "<br>"+techTable()+"<br/>";

  div.innerHTML = html;
 
  return div;
}
   
function addTechProfile()
{
  var playerTech = "";
  var playerName = "";
  var playerLevel = "";
  var playerID = "";
  var showTechEditor = false;
 
  function updateTech()
  {
   var plTech =  getPlayerTech(playerID);
   for (var i =0; i<15; i++){
      var tech = techAbbr[i];
      var id = "pfTech"+tech;
      var select = document.getElementById(id);
      if (select) {
	     select.value = zeroPad(getTechLevel(plTech, tech),2);
        }
    }
 	document.getElementById('pfParseTech').value = plTech; 
  }

  function techChanged()
  {
    var techs = [];
    for (var i =0; i<15; i++){
      var tech = techAbbr[i];
      var elem = document.getElementById("pfTech"+tech);
      if (elem) {
	     techs.push(tech+elem.value);
       }
	}
	var plTech = techs.join(" ");
	setPlayerTech(playerID,plTech);
 	document.getElementById('pfParseTech').value = plTech; 
	  
	updateTech()
    return plTech;
  } 
  
 function parseTechChanged(e)
  {
	setPlayerTech(playerID,e.target.value);
	updateTech()
  }  

  function checkTech(techstring)
  {
	var oldtechstr = getPlayerTech(playerID);
	var newt = 0;
	var TechLevel = [];
	for (var i =0; i<15; i++){
		var t = techAbbr[i];
		newt = getTechLevel(techstring,t);
		TechLevel[t] = getTechLevel(oldtechstr, t);
		if (newt != 0){
			if (newt > TechLevel[t])
				TechLevel[t] = newt;
		}
	}

	var playerTech = [];
	for (var i =0; i<15; i++){
		var t = techAbbr[i]; 
		if (TechLevel[t] != 0) playerTech.push(t + TechLevel[t]);
	}
	return playerTech.join(" ");
  }
  
  function genomeTechLoaded(div)
  {
       genometech = "";
       var t = div.getElementsByTagName("table");
       if (t.item(1)) {
     		var techrows = t.item(1).rows;
			for (var i = 1; i < techrows.length; i++){
                if(techrows[i].innerHTML.match(/<td>(.*?)<\/td><td>(\d+)<\/td>/)) {
					var techstr = RegExp.$1;	        	
					var techlvl = RegExp.$2;	
				}   
			    for (var tech in techName) {
                   if (techstr.substring(0,4)==techName[tech].substring(0,4)) 
                      genometech += " "+tech+techlvl ;
  				}
			}
		}
    if (genometech!="") setPlayerTech(playerID,checkTech(genometech));
    updateTech();
  }
  
  var t = document.getElementById("profile_show");
  if (!t) return;
  
  var rows = t.rows[0].cells[0].firstChild.rows;
  if (!rows) return;
  var nameCell = rows[0].cells[1];
  if (!nameCell) return;
  var cell = rows[1].cells[0];
  if (!cell) return;  

  var div = makeTechDiv();
  div.style.display = "none";
  t.appendChild(div);

  var html = cell.innerHTML;
  
  playerName = nameCell.textContent;
  if (html.match(/<b>Player:<\/b> (.*?)<br><br>/)) {
     var playerID = RegExp.$1;    
  }
  if (playerID == getMyPlayerID()) 
      playerTech = getMyTech()
	else {
      var url = "http://genome.aeonanon.com/meta/view/player/extras/"+playerID;
      getPage(url,genomeTechLoaded);   		 
      playerTech =  getPlayerTech(playerID);
	  updateTech();
  }   
  
  t.insertRow(t.rows.length);
  t.rows[t.rows.length-1].innerHTML = "<td style='padding-left:20'><small>Abbreviated tech: <input id='pfParseTech' title='Paste tech string (A30 L30...)' size='50' maxlength='256' type='text' value=''></small></td>";

  if (html.match(/<b>Level:<\/b> (.*?)\(Rank/)) {
    var playerLevel = RegExp.$1;    
  }

  if (playerTech!="") {
     setPlayerName(playerID, playerName);
     setPlayerLevel(playerID, playerLevel);
     setPlayerTech(playerID, playerTech);
   }
   
  var linkHTML = "<br><br><center>"+
       "<small><a id='techLink' style='color:gold;cursor:pointer;'>Open tech editor</a></small><br/><br/></center>";  
   cell.innerHTML += linkHTML;
   
 function listener(e) {
 
    if (div.style.display == "none") {
        div.style.display = "";		
	    updateTech();
	    for (var i =0; i<15; i++){
           var tech = techAbbr[i];
           var elem = document.getElementById("pfTech"+tech);
           if (elem) 
	          elem.addEventListener("change", techChanged, false);
        }
		
		var elem = document.getElementById("pfParseTech");
		if (elem) {
			elem.addEventListener("keyup", keyUpListener(parseTechChanged), false);
			elem.addEventListener("change", parseTechChanged, false);
		}
	  } 
	  else 
       div.style.display = "none";      
	}
    
  var link = document.getElementById("techLink");
  if (link) {
    link.addEventListener("click", listener, false);
  }    
 }

function UnitStats(unit, shortName, cost, drive, weapon, power,
		   armor, shielding, hangars, speed, ion, bonus, noJG)
{
  this.name = unit;
  this.shortName = shortName;
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
				 weaponTech, armorTech, shieldingTech,shortName);
  }
}

function TurretStats(turret, weapon, power, armor, shielding, shortName)
{
  this.name = turret;
  this.turret = turret;
  this.weapon = weapon;
  this.power = power;
  this.armor = armor;
  this.shielding = shielding;
  this.shortName = shortName;

  this.adjustedStats = function(techs, defense) {
    var weaponTech = getTechLevel(techs, this.weapon);
    var armorTech = getTechLevel(techs, "A");
    var shieldingTech = getTechLevel(techs, "SH");

    defense = defense || 0;
    var power = this.power * (1 + weaponTech*0.05 + defense*0.01);
    var armor = this.armor * (1 + armorTech*0.05 + defense*0.01);
    // TODO: Verify that defense commander bonus is applied correctly
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
			   weaponTech, armorTech, shieldingTech, shortName)
{
  this.inheritFrom = AdjustedStats;
  this.inheritFrom(unit, weapon, power, armor, shielding, crossShield);
  this.unit = unit;
  this.shortName = shortName;
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
  'Battleship':    new UnitStats("Battleship", "BS", 2000, "Warp",
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

var supportShips = ["Recycler","Scout Ship","Outpost Ship","Carrier","Fleet Carrier"];

var turretStats = {
  'Barracks':          new TurretStats("Barracks", "L", 4, 4, 0, "BKS"),
  'Laser Turrets':     new TurretStats("Laser Turrets", "L", 8, 8, 0, "LT"),
  'Missile Turrets':   new TurretStats("Missile Turrets", "M", 16, 16, 0, "MT"),
  'Plasma Turrets':    new TurretStats("Plasma Turrets",  "PL", 24, 24, 0, "PLT"),
  'Ion Turrets':       new TurretStats("Ion Turrets", "I", 32, 32, 2, "IT"),
  'Photon Turrets':    new TurretStats("Photon Turrets", "PH", 64, 64, 6, "PHT"),
  'Disruptor Turrets': new TurretStats("Disruptor Turrets", "D", 256, 256, 8, "DT" ),
  'Deflection Shields':new TurretStats("Deflection Shields", "I", 2, 512, 16, "DFS"),
  'Planetary Shield':  new TurretStats("Planetary Shield", "I", 4, 2048, 20, "PS"),
  'Planetary Ring':    new TurretStats("Planetary Ring", "PH", 2048, 1024, 12, "PR")
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
//GM_log(logEntries);  
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

function turretsString(turrets)
{
  if (turrets.length==0){
     return "";
  }
  var s = [];
  for (var i = 0; i < turrets.length; i++) {
    if (turrets[i].turret && turrets[i].count > 0) {
      s.push(turrets[i].count+" "+turrets[i].turret);
    }
  }
  return s.join(", ");
}

function newTurrets(text, techs, ccs, tactical)
{
  if (!text)
    return [];
  var bonus = 0;
  var t = text.split(/,/g).map(trim);
  var Turrets = [];
  for (var i = 0; i < t.length; i++) {
     if (t[i].match(/^([\.\d]+) (.*)$/)) {
      var count = Number(RegExp.$1);
      if (count > 0) {
	   var turret = RegExp.$2;
	   var stats = turretStats[turret];
	   bonus = Math.max(bonus, stats.bonus);
	   Turrets.push({"turret": turret, "count": count, "stats": stats});
      }
    }
  }
  
  // Calculate adjusted stats for each unit
  //for (var i = 0; i < turrets.length; i++) {
  //  turrets[i].stats = turrets[i].stats.adjustedStats(techs, bonus, ccs, tactical);
  // }
  return Turrets; 
}

function getMyTech()
{
  return getSetting("techs", "L30 A32 SH20 M25 PL25 I18 PH15 D10 SD20 WD20");
}

function getMyLevel()
{
  return getSetting("level", 70);
}

function getBaseOwner()
{
  var t = document.getElementById('base_processing-capacities');
  if (t) {
    var rows = t.rows[1].cells[0].firstChild.rows;
    if (rows) {
		 var html = rows[7].cells[1].innerHTML;
		 if (html.match(/.profile\.aspx\?player=(\d+)..*?>(.*?)<\/a>/i)) {
			return RegExp.$1;
		}
	}
  }

  return null;
  }    

function addFleetDetails()
{
  var rows = xpath("//table[@id='fleet_overview']//table[@class='layout listing']//tr");
  if (rows.length == 0)
    return;

  var player = "";
  var loc = "";
  var cell = xpath1("//table//tr/th[text()='Player' and position()=1]");
  if (cell) {
    rowinfo = cell.parentNode.nextSibling;
    if(rowinfo.innerHTML.match(/profile\.aspx\?player=(\d+).>/))
			player = RegExp.$1;
	if(rowinfo.innerHTML.match(/loc=(.*?)">/)) 
			loc = RegExp.$1;
    }
  	
	// Get recorded tech levels
//  var techs = getMyTech();
   var techs = getPlayerTech(player);
   if (techs == "") techs = getMyTech(); 

	 
  // Get the total fleet size
  var m = rows[rows.length-1].textContent.match(/^Fleet Size: (.*)$/i);
  if (!m) return;
  var fleetSize = parseNum(m[1]);

  // Parse units and calculate the armor/power bonus
  var fleet = [];
  var bonus = 0;
  var fleetStr = [];
  for (var i = 1; i < rows.length-2; i++) {
    var unit = rows[i].cells[0].textContent;
    var count = parseNum(rows[i].cells[1].textContent);
    var stats = unitStats[unit];
    bonus = Math.max(bonus, stats.bonus);
    fleet.push({'unit': unit, 'count': count, 'stats': stats, 'row': rows[i]});
	fleetStr[fleetStr.length] =  unitStats[unit].shortName + " " + commaFormat(count);
  }
    fleetStr = fleetStr.join("; ");

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
    + "<td colspan='3' align='center'><small><a onClick='hideDetails()'"
    + "href='javascript:;'>Hide details</a></small></td>"
	+ "<td align='left' colspan='5'><small>" + fleetStr + "</small></td>";

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

// Read the defense information of the current base
// Set the fleet owner's tech if it is available
//  Define the base dense fleet to be included if the battle cal is open from the base page
//

	 if ((getSetting("cBaseLocation", "") == loc)
	    	&&  (player == getSetting("cBaseOwner", 0))) 
          setSetting("cDefenseFleet", fleetString(fleet));
	    	
  function insertBattleCalculator(attackers)
  {
	 var defense = fleet;
     var ccs = 0;
	 var tacticalCommander = 0;
	 var defenseCommander = 0;
	 var defensePercent = 100;
	 var deflevel = getPlayerLevel(player);
	 var defTech = getPlayerTech(player); 
	 if (!defTech) defTech = "";
	 
	 if ((getSetting("cBaseLocation", "") == loc)
	    	&&  (player == getSetting("cBaseOwner", 0))){
 		   var ccs = Number(getSetting("cBaseccs", 0));
		   var tacticalCommander = Number(getSetting("cBasetac", 0));
		   var defenseCommander = Number(getSetting("cBasedef", 0));
		   var defensePercent = [Number(getSetting("cBasePercent", 100))];
		   var deflevel = Number(getSetting("cBaseOwnerLevel", 0));
		   var turrets = newTurrets(getSetting("cBaseTurrets", ""), techs, ccs, tacticalCommander);		   
           for (var i = 0; i < turrets.length; i++) {
		        defense.push(turrets[i]);
		   }
	  }

	attackers[0].id = getMyPlayerID();
	attackers[0].level = getMyLevel();
	defense[0].id = player;
	defense[0].level = getPlayerLevel(player);
	   
	openBattleCalculator(attackers, defense, getMyTech(), defTech, "Defender", getMyLevel()
				 , deflevel, ccs, tacticalCommander, defenseCommander, defensePercent
				   );
    }
//---------------------------------------------------------------------------  
  
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

			insertBattleCalculator(attackers);  
 
			 //	openBattleCalculator(attackers, fleet, techs, techs, "", getMyLevel());
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
	  insertBattleCalculator(attackers);
//	openBattleCalculator(attackers, fleet, techs, techs, "", getMyLevel());
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
    var time1 = document.getElementById("timer1");
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

      + "<tr><th class='bcHeading3'>Attacker </th>"
      + "<td align='right'>"
      + "<input class='bcAttackerName' id='bcAttackerName' "
      + "size='6'  type='text' value=''></td></tr>"
      + "<tr><th class='bcHeading3'>Attacker ID</th>"
      + "<td align='right'>"
      + "<input class='bcAttackerID' id='bcAttackerID' "
      + "size='6' maxlength='6' type='text' value=''></td></tr>"
      + "<tr><th class='bcHeading3'>Attacker Level</th>"
      + "<td align='right'>"
      + "<input class='bcAttackerInput' id='bcAttackerLevel' "
      + "size='6' maxlength='6' type='text' value=''></td></tr>"

      + "<tr><th class='bcHeading3'>Defender </th>"
      + "<td align='right'>"
      + "<input class='bcDefenderName' id='bcDefenderName' "
      + "size='6'  type='text' value=''></td></tr>"
      + "<tr><th class='bcHeading3'>Defender ID</th>"
      + "<td align='right'>"
      + "<input class='bcDefenderID' id='bcDefenderID' "
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
	  
 	html += "<tr>"
	  + "<small><input type='radio' id='bcParseAtt' name='bcParseSelect' value='A' checked=true title='Select (A) Attacker (D) Defender'> A <input type='radio' id='bcParseDef' name='bcParseSelect' value='D' title='Select (A) Attacker (D) Defender'> D </small>"
      + "<td align='right' colspan='2'>"
      + "<input class='bcParseFleet' id='bcParseFleet' title='Paste fleet string (FT 10000; BO 10,000; HB 10,000...)'"
      + "size='30' maxlength='256' type='text' value=''></td></tr>"  
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

  function campaignSummaryTable()
  {
    var html = "<br/><table id='campaignSummary' class='bcTable' width='100%'>"
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
    + "<tr><td colspan='100'>"+combatSummaryTable() +"</td></tr>"
    + "<tr><td colspan='100'>"+campaignSummaryTable() +"</td></tr>"
	+"</td></tr></table>";
	
  var html = "<br/><table align='center' width='"+twidth+"'>"
    + "<tr><th class='bcHeading1'>Battle Calculator</th></tr>"
    + "<tr><td align='center'><table class='bcLayout'><tr id='bcPaneRow'>"
    + "</tr></tr><th class='bcPaneBody' colspan='100' align='center'>"+paneBody
    + "</th></tr>"
	+ "</table></td></tr><tr><td>&nbsp;</td></tr>"
	+ "</td></tr></table>";
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
  var defTech = getSetting("bcDefTech", "");

  var defFleet = [getSetting("bcDefFleet", "")];
  var attTech = [];
  var attFleet = [];
  var baseOwner = [];
  var followUp = [];
  var attackerLevel = [];
  var myLevel = Number(getSetting("level", 70));
  
  var defenderLevel = Number(getSetting("bcDefenderLevel", myLevel));
  var defenderID = getSetting("bcDefenderID", myID);
  var defenderName = String(getSetting("bcDefenderName", myName));
 
// For every wave the attacker is identified by ID and name
// if the techstring is vailable in the register, it is automatically updated
  
  var myID = getMyPlayerID();
  var myName = getMyPlayerName();
  var attackerID = [];
  var attackerName = [];
  for (var i = 0; i < numAttacks; i++) {
    attackerID[i] = Number(getSetting("bcAttackerID"+i, myID));
    attackerName[i] = String(getSetting("bcAttackerName"+i, myName));
  }
  
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
    updateAttName();
    updateAttID()
    updateCombatResult();
    setSetting("bcCurrentAttack", currentAttack);
  }

  function addAttack()
  {
    if (numAttacks < maxAttacks) {
      calculate();

      attackerID[numAttacks] = attackerID[numAttacks-1];
      attackerName[numAttacks] = attackerName[numAttacks-1];
      attackerLevel[numAttacks] = attackerLevel[numAttacks-1];
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

  function updateAttID()
  {
    var elem = document.getElementById("bcAttackerID");
    if (elem) {
      elem.value = attackerID[currentAttack];
    }
  }

  function updateAttName()
  {
    var elem = document.getElementById("bcAttackerName");
    if (elem) {
      elem.value = attackerName[currentAttack];
    }
  }
 
  function updateDefID()
  {
    var elem = document.getElementById("bcDefenderID");
    if (elem) {
      elem.value = defenderID;
    }
  }

  function updateDefName()
  {
    var elem = document.getElementById("bcDefenderName");
    if (elem) {
      elem.value = defenderName;
    }
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
	  var tc = getTechLevel(defTech, tech);
	  if (tc == 0) {
			tc = getTechLevel(getMyTech(), tech);
			defTech = setTechLevel(defTech,tech,tc);
			select.setAttribute("class", "bcAttackerSelect");		
		}
		else 
			select.setAttribute("class", "bcDefenderSelect");		
      if (select) {
		 select.value = zeroPad(tc,2);
      }
    }
  }

  function updateAttTech()
  {
    for (var tech in techName) {
      var id = "bcAttTech"+tech;
      var select = document.getElementById(id);
	  var tc = getTechLevel(attTech, tech);
	  if (tc == 0) {
			tc = getTechLevel(getMyTech(), tech);
			attTech = setTechLevel(attTech,tech,tc);
			select.setAttribute("class", "bcDefenderSelect");		
		}
		else 
			select.setAttribute("class", "bcAttackerSelect");		
      if (select) {
		 select.value = zeroPad(getTechLevel(attTech[currentAttack], tech),2);
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

  function parseFleet(fleetStr)
  {
	var units = fleetStr.split(/;/g).map(trim);
	if (document.getElementById("bcParseAtt").checked)
		var stance = "Att"
	else
		var stance = "Def";
	if (units.length>0) {
		for (var i = 0; i < units.length; i++) {
			var count = units[i].split(" ")[1];
			if (!count) continue;
			count = Number(count.replace(/[^0-9\.]/g, ""));
			var unit = units[i].split(" ")[0];
			for (var u in unitStats) {
				if ( unit == unitStats[u].shortName) { 
					var elem = document.getElementById("bc"+stance+"Unit"+u);
					if (elem) {
						elem.value = count || "";
						elem.readOnly = followUp[currentAttack];
						elem.disabled = followUp[currentAttack];
					}			
				}
			}
		}
	}
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
	
	updateCampaign();
  }

  function updateCampaign()
  {
   var totalDebris = 0; 
   var totalLoss = 0; 
   var troop = [];
   
   troop.push({"name": attackerName[0], "loss" : 0, "repairs": 0, "debris" : 0, "profit" : 0, "fleet" : []});

   for(var i = 0; i< numAttacks; i++){
      var j=0;
	  while ((j<troop.length) && (attackerName[i] != troop[j].name)) j++;

 	  if (j==troop.length) 
		troop.push({"name": attackerName[i], "loss" : 0, "repairs": 0, "debris" : 0, "profit" : 0, "fleet" : []});

   	  troop[j].loss += result[i].attLoss;
   	  troop[j].repairs += fleetRepairCost(result[i].attackers);
      totalDebris += result[i].debris;
	  totalLoss += result[i].attLoss + fleetRepairCost(result[i].attackers);
		  
      for (var k = 0; k < result[i]._attackers.length; k++) {
        if (result[i]._attackers[k].unit && result[i]._attackers[k].count > 0) {
 		  if (troop[j].fleet.length==0)  
		      troop[j].fleet.push({"unit" : result[i]._attackers[k].unit , 
			     "count" : result[i]._attackers[k].count-Math.ceil(result[i].attackers[k].count), 
			     "last" : Math.ceil(result[i].attackers[k].count), 
				 "shortName" : unitStats[result[i]._attackers[k].unit].shortName});
		  else {
   		      var l=0;
	          while ((l<troop[j].fleet.length) && (troop[j].fleet[l].unit != result[i]._attackers[k].unit)) l++;

		      if (l<troop[j].fleet.length){ 
		          troop[j].fleet[l].count += result[i]._attackers[k].count - Math.ceil(result[i].attackers[k].count);
		          troop[j].fleet[l].last  = Math.ceil(result[i].attackers[k].count);
				}
    	      else 
		         troop[j].fleet.push({"unit" : result[i]._attackers[k].unit , 
				    "count" : result[i]._attackers[k].count-Math.ceil(result[i].attackers[k].count), 
					"last" : Math.ceil(result[i].attackers[k].count), 
					"shortName" : unitStats[result[i]._attackers[k].unit].shortName});
			}
        }
     }
    }
		
	var totalFleet = ""; 
	for (unit in unitStats){
	  var sum = 0;
	  for(var i = 0; i< troop.length; i++)
        for(var j = 0; j< troop[i].fleet.length; j++)
	       if (unit == troop[i].fleet[j].unit){
     		   sum += troop[i].fleet[j].count+troop[i].fleet[j].last;
		    }
	  if (sum!=0) totalFleet += commaFormat(sum) + " " + unitStats[unit].shortName + " ";
	}
	
	var t = document.getElementById("campaignSummary")   
	t.innerHTML = "<tr><td colspan=5 align='center'> <b>Total fleet:</b> " + totalFleet + "</br></br></td></tr>";

    if (troop.length>2) {
		var header = "<tr><th class='bcHeading3' width='20%'>Attacker</th>"
			+ "<th class='bcHeading3' width='20%'>Losses</th>"
			+ "<th class='bcHeading3' width='20%'>Debris</th>"
			+ "<th class='bcHeading3' width='20%'>Profit</th>"
			+ "<th class='bcHeading3' width='20%'>Fleet</th></tr>"
			+ "<tr > </tr>";
   
		var body = "";
		for(var i = 0; i< troop.length; i++){
   
			var fleet = "";   
			for(var j = 0; j< troop[i].fleet.length; j++){
				fleet += commaFormat(troop[i].fleet[j].count+troop[i].fleet[j].last) + " " + troop[i].fleet[j].shortName+" "; 
			}	  
 
			var relLoss = 0;
			if (totalLoss!=0) 
				relLoss = (Math.round(((troop[i].loss+troop[i].repairs)/totalLoss)
				     * 10000) / 100);
			troop[i].debris = Math.round(totalDebris*relLoss/100);
	  
			body += "<tr>"
				+ "<td align='center'>" + troop[i].name + "</td>"
				+ "<td align='center'>" + commaFormat(troop[i].loss+troop[i].repairs) + " (" + relLoss + "%)</td>"
				+ "<td align='center'>" + commaFormat(troop[i].debris) + "</td>"
				+ "<td align='center'>" + commaFormat(troop[i].debris-troop[i].loss-troop[i].repairs) + "</td>"
				+ "<td align='center' align	='absmiddle'> <small>"+ fleet + "</small></br></br></td>"
				+ "</tr>";
		}

		t.innerHTML += header + body;
	}
   
	 updateCampaignReport()   
  }
  
  function updateCampaignReport()
  {	
	
   var totalDebris = 0; 
   var totalAttLoss = 0; 
   var totalDefLoss = 0; 

   var htmlWave = [];
   for(var i = 0; i< numAttacks; i++){
		htmlWave[i] = "<b>Wave " + (i+1) + ": </b> "+ attackerName[i] + "<br/>"
			+ "<b>Tech : </b>" + getSetting("bcAttTech"+i) + "<br/>"
			+ "<b>Fleet : </b> ";

		for (var k = 0; k < result[i]._attackers.length; k++) 
			if (result[i]._attackers[k].unit)
				htmlWave[i] += unitStats[result[i]._attackers[k].unit].shortName + " " + commaFormat(result[i]._attackers[k].count) + " ";
		
		htmlWave[i] += "<br/><b>Defender final fleet : </b> ";
		for (var k = 0; k < result[i].defenders.length; k++) {
			if (result[i].defenders[k].unit)
				if (result[i].defenders[k].count!=0) 
					htmlWave[i] += unitStats[result[i].defenders[k].unit].shortName + " " + commaFormat(result[i].defenders[k].count) + " ";
		}
		htmlWave[i] += "<br/><b>Attacker loss : </b> " + commaFormat(result[i].attLoss)
			+ "<b> - Defender loss : </b> " + commaFormat(result[i].defLoss)
			+ "<b> - Debris : </b> " +  commaFormat(result[i].debris)
			+ "<br/><br/>";
		
		totalAttLoss += result[i].attLoss;
		totalDefLoss += result[i].defLoss;
		totalDebris += result[i].debris;		
    }
	
	var t = document.getElementById("campaignSummary")   

	var header = "<tr><th class='bcHeading3' colspan=5 align='left'></br></br>Mission details</br></br></th><tr > </tr>"
		+ "<tr><td colspan=5 align='left'> <b>Defender: </b>" + defenderName + "<br/>"
		+ "<b>Tech : </b>" + getSetting("bcDefTech0") + "<br/>"
		+ "<b>Fleet : </b> ";
	
	for (var k = 0; k < result[0]._defenders.length; k++) {
		if (result[0]._defenders[k].unit)
			header += unitStats[result[0]._defenders[k].unit].shortName + " " + commaFormat(result[0]._defenders[k].count) + " ";
		}
	header += "<br/><br/></td></tr>";
   
	var body = "";
	for(var i = 0; i< numAttacks; i++){ 
      body += "<tr><td colspan=5 align='left'>" + htmlWave[i] + "</td></tr>"
   }

   	body += "<tr><td colspan=5 align='left'>"
		+ "<b>Total attacker loss : </b> " + commaFormat(totalAttLoss)
		+ "<b> - Total defender loss : </b> " + commaFormat(totalDefLoss)
		+ "<b> - Total debris : </b> " +  commaFormat(totalDebris)
		+ "</td></tr>";
		
   t.innerHTML += header + body;   
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
  
  function attackerNameChanged(e)
  {
    var v = e.target.value;
    e.target.value = v;
    setSetting("bcAttackerName", v);
    attackerName[currentAttack] = String(v);
    attackerID[currentAttack] = Number(findPlayerID(v));
//    attackers[0].id = Number(findPlayerID(v));
 	attTech[currentAttack] = getPlayerTech(attackerID[currentAttack]);
    updateAttID();
    updateAttTech();
 	techChanged("Att")
    updateFighterChoke();
    calculate();
    updateCombatResult();
 }

  function attackerIDChanged(e)
  {
	var v = e.target.value;
    v = v.replace(/[^0-9\.]/g, "");
    e.target.value = v;
    setSetting("bcAttackerID", v);
    attackerID[currentAttack] = Number(v);
    attackerName[currentAttack] = extractPlayerName(getPlayerName(v));
	attTech[currentAttack] = getPlayerTech(attackerID[currentAttack]);
    updateAttName();
    updateAttTech();
 	techChanged("Att")
    updateFighterChoke();
    calculate();
    updateCombatResult();
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

  function defenderNameChanged(e)
  {
    var v = e.target.value;
    e.target.value = v;
    setSetting("bcDefenderName", v);
    defenderName = String(v);
    defenderID = Number(findPlayerID(v));
 	defTech = getPlayerTech(defenderID);
    updateDefID();
    updateDefTech();
 	techChanged("Def")
    updateFighterChoke();
    calculate();
    updateCombatResult();
 }

  function defenderIDChanged(e)
  {
	var v = e.target.value;
    v = v.replace(/[^0-9\.]/g, "");
    e.target.value = v;
    setSetting("bcDefenderID", v);
    defenderID = Number(v);
    defenderName = extractPlayerName(getPlayerName(v));
	defTech = getPlayerTech(defenderID);
    updateDefName();
    updateDefTech();
	techChanged("Def")
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

  function parseFleetChanged(e)
  {
    var v = e.target.value;
    e.target.value = v;
    parseFleet(v);
	
	if (document.getElementById("bcParseAtt").checked){
		var s = getFleetString("Att");
		attFleet[currentAttack] = s;
		setSetting("bcAttFleet"+currentAttack, s);
	}
	else {
	    var s = getFleetString("Def");
		defFleet[0] = s;
		setSetting("bcDefFleet", s);
	}

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

  function customAttack(e)
  {
    var v = e.target.value;
    clearFollowUp();
	var fl = v.split(";");
/*     var maxShielding = 0;
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
 */  }
   
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
   var elem = document.getElementById("bcAttackerID");
   if (elem) {
      elem.addEventListener("keyup", keyUpListener(attackerIDChanged), false);
      elem.addEventListener("change", attackerIDChanged, false);
    }
    var elem = document.getElementById("bcAttackerName");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(attackerNameChanged), false);
      elem.addEventListener("change", attackerNameChanged, false);
    }

   var elem = document.getElementById("bcDefenderID");
   if (elem) {
      elem.addEventListener("keyup", keyUpListener(defenderIDChanged), false);
      elem.addEventListener("change", defenderIDChanged, false);
    }
    var elem = document.getElementById("bcDefenderName");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(defenderNameChanged), false);
      elem.addEventListener("change", defenderNameChanged, false);
    }

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
	
    var elem = document.getElementById("bcParseFleet");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(parseFleetChanged), false);
      elem.addEventListener("change", parseFleetChanged, false);
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
	var elem = document.getElementById("bcCustomAttack");
    if (elem) {
      elem.addEventListener("keyup", keyUpListener(customAttack), false);
      elem.addEventListener("change", customAttack, false);
    }

  }

  updateBaseInfo();
  updateBaseDefenses();

  updateAttID();
  updateAttName();
  updateAttTech();
  updateDefID();
  updateDefName();
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
  // Remove all forms to make sure nothing is accidentally submitted
  // while using the battle calculator
  var forms = document.getElementsByTagName("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].parentNode.removeChild(forms[i]);
  }
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
  if (!link) return;
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

  setSetting("bcAttackerID", getMyPlayerID());
  setSetting("bcAttackerName", getMyPlayerName());
  setSetting("bcAttackerID0", getMyPlayerID());
  setSetting("bcAttackerName0", getMyPlayerName());

  setSetting("bcDefenderID", defenders[0].id);
  setSetting("bcDefenderName", extractPlayerName(getPlayerName(defenders[0].id)));

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
			if (defensePercent!=0)
				var n = defenders[i].count / defensePercent * 100;		
			else
				var n = 0;
//			var n = defenders[i].count * defensePercent / 100;		
			n = Math.round(n/5)*5;
			setSetting("bcTurret"+defenders[i].turret, n);
		}
    }
  }

  displayBattleCalculator();
}

//  calcTech(fleet, bonus, ccs, tec, def) : returns a tech string based on units and turrets
//  BattleReport(battlereport, info, attack, defense) : process the battlereport calculating tech and profit 
//  projectCombatResult : similar to the original, but based on the previous  function. It also run combat(,) and shows 
//                        the  estimated results.
//  processCombatBoard : similar to projectCombatResult to be used in Combat board and Messages
//
 
function calcTech(fleet, bonus, ccs, tac, def)
{
  var TechLevel = {};
//GM_log(ccs)  
  for (var tech in techName) {
    TechLevel[tech] = 0;
  }
  for (var i = 0; i < fleet.length; i++) {
    var d = fleet[i];
    if (d.shielding > 0) {
      var sh = (d.shielding / d.stats.shielding - 1) / 0.05;
      TechLevel["SH"] = Math.round(sh);
    }
    if (d.unit) {
      var a = (d.armor / (1+bonus) / d.stats.armor - 1) / 0.05;
      TechLevel["A"] = Math.round(a);
      var w = (d.power / (1+bonus) / d.stats.power /
	       (1 + ccs*0.05 + tac*0.01) - 1) / 0.05;
      TechLevel[d.stats.weapon] = Math.round(w);
    }
    else {
      var a = (d.armor / d.stats.armor / (1+def*0.01) - 1) / 0.05;
      TechLevel["A"] = Math.round(a);
      var w = (d.power / d.stats.power / (1+def*0.01) - 1) / 0.05;
      TechLevel[d.stats.weapon] = Math.round(w);
    }
  }
  
  var playerTech = [];
  for (var t in TechLevel) {
    playerTech.push(t + TechLevel[t]);
  }
 return playerTech.join(" ");

}

function BattleReport(battlereport, info, attack, defense, finalreport)
{
 if (!info || !attack || !defense)
    return;

  var attname = "";
  var defTech = "";
  var defname = "";
  var attplayer = "";
  var defplayer = "";
  var attTech = "";

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
      var html = info.rows[i+1].cells[1].innerHTML;
     if (txt.match(/lvl (.*?)$/)) {
    	attackerLevel = Number(RegExp.$1);
      }
      if (html.match(/.profile\.aspx\?player=(\d+)..*?>(.*?)<\/a>/i)) {
        attplayer = RegExp.$1;
        attname = RegExp.$2;
		}    

    }
    else if (txt == "Defensive Force") {
      var txt = info.rows[i+1].cells[1].textContent;
      var html = info.rows[i+1].cells[1].innerHTML;
      if (txt.match(/lvl (.*?)$/)) {
    	defenderLevel = Number(RegExp.$1);
      }
      if (html.match(/.profile\.aspx\?player=(\d+)..*?>(.*?)<\/a>/i)) {
        defplayer = String(RegExp.$1);
        defname = String(RegExp.$2);
		}
    }
    else if (txt == "Base") {
      if ((defenderLevel != 0) || ((defplayer=="2066") || (defplayer=="2047"))){
	baseOwner = "Defender";
      }
      else {
	baseOwner = "Attacker";
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
	var left = Number(cells[2].textContent);
	var loss =  Math.round(100*(count - left))/100;
	if ((left!=0) && (loss!=0)) cells[2].innerHTML += "<font color='red'><b> ("+ loss +")</font></b>"; 
    var power = Number(cells[3].textContent);
    var armor = Number(cells[4].textContent);
    var shielding = Number(cells[5].textContent);
    var stats = unitStats[unit];
    if (stats) {
      bonus = Math.max(bonus, stats.bonus);
 /* 	  if (attackers.length == 0)
		attackers.push({"id": attplayer, "level": attackerLevel, "unit": unit, "count": count, "stats": stats,
			 "power": power, "armor": armor,
			 "shielding": shielding});
	  else
  */		attackers.push({"unit": unit, "count": count, "stats": stats,
			 "power": power, "armor": armor,
			 "shielding": shielding});
    }
  }
  if (attackers.length>0) { 
	attackers[0].id = attplayer;
	attackers[0].level = attackerLevel;
  }
 
 
  if (baseOwner == "Attacker") {
    var ccs = commandCenters;
    var tac = tacticalCommander;
	var def = 0;
  }
  else {
    var ccs = 0;
    var tac = 0;
	var def = 0;
  }
 
  attTech = calcTech(attackers, bonus, ccs, tac, def)

  for (var i = 0; i < attackers.length; i++) {
    attackers[i].stats
      = attackers[i].stats.adjustedStats(attTech, bonus, ccs, tac);
  }

  var defenders = [];
  var bonus = 0;
  for (var i = 2; i < defense.rows.length; i++) {
    var cells = defense.rows[i].cells;
    var unit = cells[0].textContent;
    var count = Number(cells[1].textContent);
	var left = Number(cells[2].textContent);
	var loss =  Math.round(100*(count - left))/100;
	if ((left!=0) && (loss!=0)) cells[2].innerHTML += "<font color='red'><b> ("+ loss +")</font></b>"; 
    var power = Number(cells[3].textContent);
    var armor = Number(cells[4].textContent);
    var shielding = Number(cells[5].textContent);
    var stats = unitStats[unit];
    if (stats) {
      bonus = Math.max(bonus, stats.bonus);
/*  	  if (defenders.length == 0)
		defenders.push({"id": defplayer, "level": defenderLevel,"unit": unit, "count": count, "stats": stats,
			 "power": power, "armor": armor,
			 "shielding": shielding});
	  else
 */		defenders.push({"unit": unit, "count": count, "stats": stats,
			 "power": power, "armor": armor,
			 "shielding": shielding});
    }
    else {
      var stats = turretStats[unit];
      if (stats) {
/*  	  if (defenders.length == 0)
		defenders.push({"id": defplayer, "level": defenderLevel,"turret": unit, "count": count, "stats": stats,
			   "power": power, "armor": armor,
			   "shielding": shielding});
	  else
 */        defenders.push({"turret": unit, "count": count, "stats": stats,
			   "power": power, "armor": armor,
			   "shielding": shielding});}
    }
  }
 if (defenders.length>0) { 
	defenders[0].id = defplayer;
	defenders[0].level = defenderLevel;
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
  
  var defTech = calcTech(defenders, bonus, ccs, tac, def)

  var totalDefenseArmor = 0;
  for (var i = 0; i < defenders.length; i++) {
    if (defenders[i].unit) {
      defenders[i].stats = defenders[i].stats.adjustedStats(defTech, bonus,
							    ccs, tac);
    }
    else {
      defenders[i].stats = defenders[i].stats.adjustedStats(defTech, def);
      totalDefenseArmor += defenders[i].stats.armor * defenders[i].count;
    }
  }

  results = combat(attackers, defenders);


  // Calculate resulting defenses level
	if (totalDefenseArmor == 0) {
	  finaldefensePercent = 0;
	}
	else {
	  var d = results.defenders;
	  var armor = 0;
	  for (var j = 0; j < d.length; j++) {
	    if (d[j].turret) {
	      armor += d[j].stats.armor * d[j].count;
	    }
	  }
	  finaldefensePercent = Math.round(10000*armor/totalDefenseArmor*defensePercent/100)/100;
	}  
   
  setPlayerName(attplayer,attname);
  setPlayerLevel(attplayer,attackerLevel);
  setPlayerTech(attplayer,attTech);
  
  setPlayerName(defplayer,defname);
  setPlayerLevel(defplayer,defenderLevel);
  setPlayerTech(defplayer,defTech);
  
  var brtxt = battlereport.textContent;
  
  var totloss = 0; 
  var attloss = 0; 
  var defloss = 0; 
  var isFinal = false;
  
  if (brtxt.match(/Total cost of units destroyed: (\d+)...Attacker: (\d+) ; Defender: (\d+)../)) {
     isFinal = true;
     totloss = Number(RegExp.$1);
     attloss = Number(RegExp.$2);
     defloss = Number(RegExp.$3);
    }

  var attexp = 0; 
  var defexp = 0; 
  if (brtxt.match(/Experience: . Attacker:..(\d+) ; Defender:..(\d+) ./)) {
     attexp = Number(RegExp.$1);
     defexp = Number(RegExp.$1);
    }

	var debris = 0; 
  if (brtxt.match(/New debris in space: (\d+)/)) {
     debris = Number(RegExp.$1);
    }

  var pillage = 0; 
  if (brtxt.match(/Attacker got (\d+)..*?/)) {
     pillage = Number(RegExp.$1);
    }

  var profit = debris+pillage-attloss;	

  if (document.location.href.match(/combat\.aspx\?fleet\=(\d+)&attack/)) {
        var fleetLink = "http://alpha.astroempires.com/fleet.aspx?fleet="+RegExp.$1;
//        var fleetLink = "http://alpha.astroempires.com/fleet.aspx?fleet="+document.location.href.match(/combat\.aspx?fleet\=(\d+)\&attack/i)[1];
		var div = document.createElement("div");
		div.innerHTML += "<center><br/>"
			+"Fleet: <a href='"+fleetLink+"'>Overview</a> - "
			+"<a href='"+fleetLink+"&view=move'>Move</a>"
			+(isFinal?" - <a href='"+fleetLink+"&view=attack'>Attack</a>":"")
			+"</center>";
		document.body.appendChild(div);
	}

  if (!isFinal) {
     var div = document.createElement("div");
     div.innerHTML += "<center><br/><a href='javascript:;' id='openInBCLink'>"
         +"Open in Battle Calculator</a></center>";
     document.body.appendChild(div);

     function listener(e) {
        openBattleCalculator(attackers, defenders, attTech, defTech, baseOwner,
			 attackerLevel, defenderLevel, commandCenters,
			 tacticalCommander, defenseCommander, defensePercent);
     }
     var link = document.getElementById("openInBCLink");
     link.addEventListener("click", listener, true);
	}
  
  return { "combat" : results,
		"defensePercent" : finaldefensePercent,
        "attTech" : attTech,
		"defTech" : defTech,
        "totalLoss" : totloss,
        "attLoss" : attloss,
		"defLoss" : defloss,
        "attexp" : attexp,
		"defexp" : defexp,
		"debris"  : debris, 
		"pillage" : pillage,
		"profit"  : profit,
		"isFinal" : isFinal}
}

function projectCombatResult()
{
  var battlereport = xpath1("//div[@class='battle-report']");
  var info = xpath1("//div[@class='battle-report']//table[@class='battle-report_info']");
  var attack = xpath1("//div[@class='battle-report']//table[@class='battle-report_attack']");
  var defense = xpath1("//div[@class='battle-report']//table[@class='battle-report_defense']");

  var results = BattleReport(battlereport, info, attack, defense);
  
  if (results.isFinal){
		return;
	}
/*   for (var i = 0; i < info.rows.length; i++) {
    var cells = info.rows[i].cells;
    if (cells.length == 0) continue;
    var txt = cells[0].textContent;
    if (txt == "End Defenses") {
        cells[1].innerHTML = "<font color='red'><b>" + results.defensePercent + "%</b></font>";
      }
   }
 */   
  for (var i = 2; i < attack.rows.length; i++) {
    var cells = attack.rows[i].cells;

    var count = Number(cells[1].textContent);
	var left = results.combat.attackers[i-2].count;
	var loss =  Math.round(100*(count - left))/100;
	 
    cells[2].innerHTML = "<font color='red'> <b>" + left;
	if ((left!=0) && (loss!=0)) 
		cells[2].innerHTML += " ("+ loss +")</b></font>"; 
	else 
		cells[2].innerHTML += "</b></font>";

	 for (var j in supportShips)
	    if (supportShips[j] == cells[0].textContent)
	     cells[0].setAttribute("style", "background-color: #FF0011; font-weight: bold;")
    }
  for (var i = 2; i < defense.rows.length; i++) {
     var cells = defense.rows[i].cells;
     cells[2].innerHTML = "<font color='red'><b>" + results.combat.defenders[i-2].count + "</b></font>";
    }
 
  var div = document.createElement("div");
  var totalLoss = results.combat.attLoss + results.combat.defLoss;
  div.innerHTML = "<br/><center>Estimated cost of units destroyed: " 
     + totalLoss 
	 + " ( Attacker: " + results.combat.attLoss
	 + "; Defender: " + results.combat.defLoss
	 + ")</center><br>"
	 + "<center>Estimated new debris in space: " + results.combat.debris + "</center><br/>";

	var profit = results.combat.debris-results.combat.attLoss; 
	if(profit >= 0){
	    div.innerHTML += "<center><b><font color='green'>Estimated profit: " + commaFormat(profit)
        +"</b></font><br/>";
		}
	else{
        div.innerHTML += "<center><b><font color='red'>Estimated profit: " + commaFormat(profit)
        +"</b></font><br/>";
		}
	 
   div.innerHTML += "</br><center><small>Defender's technology levels: " + results.defTech + "</small></center>";
   
   document.body.appendChild(div);

  }

function processCombatBoard()
{
 var allBattleReports, allinfo, allattack, alldefense;
   allBattleReports = document.evaluate("//div[@class='battle-report']",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   allinfo = document.evaluate("//div[@class='battle-report']//table[@class='battle-report_info']",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   allattack = document.evaluate("//div[@class='battle-report']//table[@class='battle-report_attack']",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   alldefense = document.evaluate("//div[@class='battle-report']//table[@class='battle-report_defense']",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

 for (var kk = 0; kk < allinfo.snapshotLength; kk++) {

     var battlereport = allBattleReports.snapshotItem(kk);
     var info = allinfo.snapshotItem(kk);
     var attack = allattack.snapshotItem(kk);
     var defense = alldefense.snapshotItem(kk);
     var battlereport = allBattleReports.snapshotItem(kk);
 
     var results = BattleReport(battlereport,info,attack,defense);

// Set true for testing pourposes. The results of the calculation are compared with the real ones 	 
     if (false) {
       for (var i = 0; i < info.rows.length; i++) {
           var cells = info.rows[i].cells;
           if (cells.length == 0) continue;
           var txt = cells[0].textContent;
           if (txt == "End Defenses") {
            cells[1].innerHTML += "  <font color='red'><b>(" + results.defensePercent + "%)</b></font>";
           }
        }
   
        for (var i = 2; i < attack.rows.length; i++) {
             var cells = attack.rows[i].cells;
             cells[2].innerHTML += "  <font color='red'> <b>(" + results.combat.attackers[i-2].count + ")</b></font>";
            }
        for (var i = 2; i < defense.rows.length; i++) {
             var cells = defense.rows[i].cells;
             cells[2].innerHTML += "  <font color='red'><b>(" + results.combat.defenders[i-2].count + ")</b></font>";
        }
	  }
	 
	 
	 var div = document.createElement("div");
	 if(results.profit >= 0){
	    div.innerHTML = "<br/><center><b><font color='green'>Profit: " + commaFormat(results.profit)
        +"</b></font><br/><br/>";
		}
	else{
        div.innerHTML = "<br/><center><b><font color='red'>Profit: " + commaFormat(results.profit)
        +"</b></font><br/><br/>";
		}
	div.innerHTML += "<center><small>Attacker's technology levels: "
        +results.attTech+"</small><br/><br/><center><small>Defender's technology levels: "
        +results.defTech+"<br/><br/></small></center>";
  
     battlereport.parentNode.appendChild(div);
 
 }
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
      if (href.match(/base\.aspx\?base=\d{1,20}&view=production&action=info&item=(.*)$/)) {

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

  // Initially show the wizard?
  var showWizard = !getFlag("showProductionWizardByDefault");

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

   var prodTable = document.getElementById("base_events-production").firstChild.rows[1].cells[0].firstChild;
   for (var i in prodTable.rows){
       var prod = prodTable.rows[i].cells[1].textContent.match(/Production of (.*?)$/)[1].split(" ");
	   var count = parseNum(prod[0]);
	   var unit = (prod.length==2)?prod[1]:(prod[1]+" "+prod[2]);
	   var newCell = document.createElement("td");
	   var credits = count*unitStats[unit].cost;
       newCell.appendChild(document.createTextNode(commaFormat(credits)));
	   newCell.title= "Cancel: " + commaFormat(Math.round(credits * 75 / 100))+" credits";
       prodTable.rows[i].cells[1].parentNode.insertBefore(newCell, prodTable.rows[i].cells[1].nextSibling);
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

function isTodayLoc(now, future)
{
  return (future.getFullYear() == now.getFullYear()) &&
    (future.getMonth() == now.getMonth()) &&
    (future.getDate() == now.getDate());
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

function formatLOC(future)
{
  var now = pageLoadTime;
GM_log(now+"   "+future)  
  if (isTodayLoc(now, future)) {
    return "Today @"+zeroPad(future.getHours(),2)+":"+
      zeroPad(future.getMinutes(),2)+":"+
      zeroPad(future.getSeconds(),2)+" (LC)";
  }
  else if (isTodayLoc(now, new Date(future.getTime() - 24*60*60*1000))) {
    return "Tomorrow @"+zeroPad(future.getHours(),2)+":"+
      zeroPad(future.getMinutes(),2)+":"+
      zeroPad(future.getSeconds(),2)+" (LC)";
  }
  else {
    var days = daysUntil(now, future, 7);
    var txt = "";
    if (days < 7) {
      txt += longDayName[future.getDay()];
    }
    else {
      txt += dayName[future.getDay()]+" "
	+zeroPad(future.getDate(),2)+" "
	+monthName[future.getMonth()];
      if (future.getFullYear() != now.getFullYear()) {
	txt += " "+future.getFullYear();
      }
    }
    if (days < 90) {
      txt += " @"+zeroPad(future.getHours(),2)+":"+
	zeroPad(future.getMinutes(),2);
    }
    return txt+" (LC)";
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
    title = formatLOC(new Date(currentTime.getTime() + seconds*1000));
  }    
  else if (display == "localtime") {
    text = formatLOC(new Date(currentTime.getTime() + seconds*1000));
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
  if (getFlag("animateTimer")) {
  
//Server time: <span id="server-time" title="2010/09/11 07:36:03">2010-09-11 07:36:03</span><br>Local time: <span id="local-time">2010-09-11 02:35:52</span>  
	var m = html.match(/Server Time: <span.*\">(.*?)(,?) ((\d\d):(\d\d):(\d\d))/i);
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

/*     var html = "Server time: "+dayName[t.getUTCDay()];
    html += " "+m[1]+m[2]+" ";
    html += "<span id='newtime0' seconds='"+s;
    html += "' timeDisplay='clock24'>"+m[3]+"</span>";
 */    html += " &nbsp; &nbsp; (Page loaded at "+m[3]+")&nbsp;";
   }
  small.innerHTML = html;
//  setInterval(timerTick,999);
}
 
function minutils(){
  if (getFlag("minutils")) {
	var small = xpath1("//body/div[@align='center']/small");
	if (!small) return;
	var html = small.innerHTML;

// <small>Server time: <span id='server-time' title='2010/10/02 13:35:43'>2010-10-02 13:35:43</span><br />Local time: <span id='local-time'></span></small>

	var m  = html.match(/Server Time:.*?server-time.*?>(.*?)(,?) ((\d\d):(\d\d):(\d\d))/i);
	var LT = html.match(/Local Time:.*?time\">(.*?)(,?) ((\d\d):(\d\d):(\d\d))/i);

	html = html.replace(/<br>/,"&nbsp;&nbsp;")
	html = html.replace(/local-time\">\d\d\-\d\d\-\d\d/,/local-time\">/)
	if (LT) html += "&nbsp;(Loaded at "+LT[3]+")&nbsp;"
		else html += "&nbsp;(Loaded at "+m[3]+")&nbsp;"

    var guildtag = getSetting("homeTag","");
    var guild = getSetting("homeGuild","");
	var forum = "";
	var chat = "";

	switch (guild) {
	  case '2182' : {
			forum = "href=\"http://rangerconfederacy.darkbb.com/\" target=\"_blank\" id=\"header-purple\"";
//			chat = "href=\"http://widget.mibbit.com/?settings=acf3b5a108b295e6da120e4d4304bb12&server=irc.mibbit.net&channel=%23rangers\""
			chat = "href=\"http://widget.mibbit.com/?settings=acf3b5a108b295e6da120e4d4304bb12&server=irc.mibbit.net&channel=%23rangers&nick="+ encodeURI(getMyPlayerName()) +"\""
			break;
			}
	  case '1738' : {
			forum = "href=\"http://lueshi.dontexist.net/minforums/\" target=\"_blank\" id=\"header-purple\"";
			chat = "href=\"http://widget.mibbit.com/?server=irc.lucidchat.net&channel=%23min&forcePrompt=true&promptPass=true&settings=39dcaae8764ad49e5e36ebd62c57cd83\" target=\"_blank\" id=\"header-purple\""
			break;
			}
	  case '304' : {
			forum = "href=\"http://z9.invisionfree.com/TheImperium\" target=\"_blank\" id=\"header-purple\"";
			chat = "href=\"http://widget.mibbit.com/?server=irc.lucidchat.net&channel=%23min&forcePrompt=true&promptPass=true&settings=39dcaae8764ad49e5e36ebd62c57cd83\" target=\"_blank\" id=\"header-purple\""
			break;
			}
	  case '1212' : {
			forum = "href=\"http://s7.zetaboards.com/SIRAE/index/\" target=\"_blank\" id=\"header-purple\"";
			chat = "href=\"http://widget.mibbit.com/?server=irc.lucidchat.net&channel=%23min&forcePrompt=true&promptPass=true&settings=39dcaae8764ad49e5e36ebd62c57cd83\" target=\"_blank\" id=\"header-purple\""
			break;
			}

	}

	if (forum != "") html += " <a "+ forum + ">" + guildtag+" Forums</a>";
	if (chat != "") html += " - <a "+ chat +" target=_blank> Chat Room</a>";
	

  if (getFlag("uploadToGenome")) 
     html += " - <a href=\"http://genome.aeonanon.com/\" target=\"_blank\" id=\"header-purple\">Genome</a>";
  
  if (getFlag("uploadToRubyFARM"))
	 html += " - <a href=\"http://rubyfarm.dontexist.net/\" target=\"_blank\" id=\"header-purple\">RubyFARM</a>";
  
  
  if (guild == '1738'){
		html = "<br /><br />Minbari Utils: <span class=\"minbariMenu\">" + html + "</span>";
	}
	
  small.innerHTML = html;
  GM_addStyle('.minbariMenu { border-width: 1px; border-style: solid; background-color: #333; border-color: #FFF; font-size:12px;}'); 
		//This style changes the color of the Minbari menu bar.
 }


}

function wait(millis)
{
var date = new Date();
var curDate = null;
do { curDate = new Date();}
while(curDate-date < millis);
}
 
function toggleTimeDisplay(span)
{
  var seconds = span.getAttribute("title");
  var display = span.getAttribute("timeDisplay");
GM_log(display)  
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
    display = "localtime";
  }
   else if (display == "localtime") {
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

function addCompletionTimes()
{
  // Disable AE timers:
  contentEval("q=0;");
  var cutoff = getCountdownCutoff();
//  var x = xpath("span[@class='help comment' and starts-with(@id, 'time')]");
  var x = xpath("//span[starts-with(@id, 'timer')]");
  for (var i = 0; i < x.length; i++) {
    var span = x[i];
    var seconds = span.getAttribute("title");
    if (seconds) {
      seconds = Number(seconds);
      if (seconds < 1)
	seconds = 0;
      var t = new Date(pageLoadTime.getTime() + seconds * 1000);
      var time = formatUTC(t);
      var id = span.getAttribute("id");
      if (cutoff == 0 || seconds < cutoff) {
	var display = "countdown1";
	var title = time;
	var text = formatCountdown1(seconds);
      }
      else {
	var display = "time";
	var title = formatCountdown1(seconds);
	var text = time;
      }
      text = text.replace(/ /g, "&nbsp;");
      var html = "<span class='help comment' id='new"+id+"' ";
      html += "time='"+time+"' seconds='"+seconds+"' title='"+title+"' ";
      html += "style='cursor:pointer' timeDisplay='"+display+"' ";
      html += "onClick='toggleTimeDisplay(this)'>"+text+"</span>";
      var div = document.createElement("div");
      div.innerHTML = html;
      span.parentNode.insertBefore(div, span.nextSibling);
      span.style.display="none";
      span.style.visilibity="hidden";
    }
  }
  var x = xpath("//td[starts-with(@id, 'timer')]");
  for (var i = 0; i < x.length; i++) {
    var td = x[i];
    var seconds = td.getAttribute("title");
    if (seconds) {
      seconds = Number(seconds);
      if (seconds < 1)
		seconds = 0;
	
      var t = new Date(pageLoadTime.getTime() + seconds * 1000);
      var time = formatUTC(t);
      var id = td.getAttribute("id");
      if (cutoff == 0 || seconds < cutoff) {
		var display = "countdown1";
		var title = time;
		var text = formatCountdown1(seconds);
      }
      else {
		var display = "time";
		var title = formatCountdown1(seconds);
		var text = time;
      }
      text = text.replace(/ /g, "&nbsp;");
      var html = "<small><span id='new"+id+"' ";
      html += "time='"+time+"' seconds='"+seconds+"' title='"+title+"' ";
      html += "style='cursor:pointer' timeDisplay='"+display+"' ";
      html += "onClick='toggleTimeDisplay(this)'>"+text+"</span></small>";
      td.innerHTML = html;
    }
  }
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
	var baseName = a.textContent.replace(",","");
	var baseName = baseName.replace(";","");
	bases.push(base+";"+baseName);
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

 //alert("Recorded production at base " + base + ": " + prod.join(", "));
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

/**
* Returns the week number for this date. dowOffset is the day of week the week
* "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
* the week returned is the ISO 8601 week number.
* @param int dowOffset
* @return int
*/
Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
var newYear = new Date(this.getFullYear(),0,1);
var day = newYear.getDay() - dowOffset; //the day of week the year begins on
day = (day >= 0 ? day : day + 7);
var daynum = Math.floor((this.getTime() - newYear.getTime() -
(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
var weeknum;
//if the year starts before the middle of a week
if(day < 4) {
weeknum = Math.floor((daynum+day-1)/7) + 1;
if(weeknum > 52) {
nYear = new Date(this.getFullYear() + 1,0,1);
nday = nYear.getDay() - dowOffset;
nday = nday >= 0 ? nday : nday + 7;
/*if the next year starts before the middle of
the week, it is week #1 of that year*/
weeknum = nday < 4 ? 1 : 53;
}
}
else {
weeknum = Math.floor((daynum+day-1)/7);
}
return weeknum;
};  

function cleanNumbers(n,f){
 n=''+n;
 var c;
 if(n.match(/\.\d\d$/)!=null){
   c=/\.\d\d$/.exec(n);
   n=n.split(/\.\d\d$/)[0];
 }else if(n.match(/\.\d$/)!=null){
   c=/\.\d$/.exec(n);
   n=n.split(/\.\d$/)[0];
 }else if(n.match(/\,\d\d$/)!=null){
   c=/\,\d\d$/.exec(n);
   n=n.split(/\,\d\d$/)[0];
 }else if(n.match(/\,\d$/)!=null){
   c=/\,\d$/.exec(n);
   n=n.split(/\,\d$/)[0];
 }
 else c='';
 if(c!='') c=((f)?'.':unescape(getSetting('config_numberDecimal',".")))+c.toString().substr(1);
 n=n.replace(/[^\d-]/g,'')+c;
 return n;
}

function fleetSummary(){
 if(!document.getElementById('empire_units_summary')) return;
 document.getElementById('empire_units_summary').width='350px';
 
 var t=document.getElementById('empire_units_summary').parentNode.insertBefore(document.createElement('table'),document.getElementById('empire_units_summary'));
 t.setAttribute('style','width:'+document.getElementById('empire_units_units').width+';border:0;background:transparent none;align:center;');
 t.setAttribute('align','center');
 t=t.insertRow(0);
 t.insertCell(0);
 t.insertCell(1);
 t.firstChild.appendChild(document.getElementById('empire_units_summary'));
 t.firstChild.firstChild.setAttribute('style','position:relative;left:-5%;');
 t=t.lastChild.appendChild(document.getElementById('empire_units_summary').cloneNode(true));
 t.setAttribute('style','position:relative;right:-5%;');
 t.id='aetEUS';
 var d=document.evaluate("//table[@id='empire_units_units']//table//tr",document,null,7,null);
 var r=document.evaluate("//table[@id='aetEUS']//table//td",document,null,7,null);
 r.snapshotItem(0).innerHTML="<b>Available Fleets</b>";
 r.snapshotItem(1).innerHTML=parseInt(document.getElementById('empire_units_summary').firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[5].lastChild.textContent)-parseInt(r.snapshotItem(1).innerHTML);
 r.snapshotItem(2).innerHTML="<b>Empty Hanger Space</b>";
 r.snapshotItem(3).innerHTML=0;
 r.snapshotItem(4).innerHTML="<b>Hanger Capacity</b>";
 r.snapshotItem(5).innerHTML=0;
 r.snapshotItem(6).innerHTML="<b>Recycling Capacity</b>";
 r.snapshotItem(7).innerHTML=0;
 r.snapshotItem(8).innerHTML="<b>Fighting Fleet</b>";
 r.snapshotItem(9).innerHTML=0;
 r.snapshotItem(10).innerHTML="<b>Utility Fleet</b>";
 r.snapshotItem(11).innerHTML=0;
 var h={5:1,10:1,30:2,60:2},c={80:4,120:4,200:4,400:60,500:8,2000:40,2500:400,10000:200,50000:1000,200000:4000,500000:10000},a=0;
 for(var i=1;i<d.snapshotLength;i++){
  a=cleanNumbers(d.snapshotItem(i).childNodes[2].textContent);
  if(h[a] && (a==5 || d.snapshotItem(i).lastChild.textContent!=d.snapshotItem(1).lastChild.textContent)) r.snapshotItem(3).innerHTML=parseInt(cleanNumbers(r.snapshotItem(3).innerHTML))-(parseInt(cleanNumbers(d.snapshotItem(i).childNodes[1].textContent))*h[a]);
  else if(a==30){
   r.snapshotItem(7).innerHTML=commaFormat(parseInt(cleanNumbers(d.snapshotItem(i).childNodes[1].textContent))*10)+' /hr';
   r.snapshotItem(11).innerHTML=parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
   continue;
  }
  if(c[a]) r.snapshotItem(5).innerHTML=parseInt(cleanNumbers(r.snapshotItem(5).innerHTML))+(parseInt(cleanNumbers(d.snapshotItem(i).childNodes[1].textContent))*c[a]);
  if(a==100 || a==400 || a==2500) r.snapshotItem(11).innerHTML=parseInt(r.snapshotItem(11).innerHTML)+parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
  else if(a==40 && d.snapshotItem(i).lastChild.textContent.split('/')[1]==d.snapshotItem(1).lastChild.textContent.split('/')[1]) r.snapshotItem(11).innerHTML=parseInt(r.snapshotItem(11).innerHTML)+parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
  else r.snapshotItem(9).innerHTML=parseInt(r.snapshotItem(9).innerHTML)+parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
 } 
 r.snapshotItem(3).innerHTML=commaFormat(parseInt(r.snapshotItem(5).innerHTML)+(r.snapshotItem(3).innerHTML*1));
 r.snapshotItem(5).innerHTML=commaFormat(r.snapshotItem(5).innerHTML);
 r.snapshotItem(9).innerHTML=commaFormat(r.snapshotItem(9).innerHTML);
 r.snapshotItem(11).innerHTML=commaFormat(r.snapshotItem(11).innerHTML);
}

function insertUnitsInProductionColumn()
{
  var t = document.getElementById("empire_units_units");
  if (!t) return;
  var rows = t.rows[0].cells[0].firstChild.rows;
  if (!rows) return;

  var baseCount = Number(getSetting("baseCount", 0));

  if (baseCount == 0) return;
  var bases = getSetting("bases", "").split(",");

  if (bases.length != baseCount) return;

  var missingBases = 0;
  var allProd = [];

  for (var i = 0; i < bases.length; i++) {
    var prod = getSetting("prod"+bases[i].split(";")[0], "");
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
  
  var inProdHangarSpace = 0;
  var inProdHangarFleet = 0;

  for (var i = 1; i < rows.length; i++) {
    var td = document.createElement("td");
    if (missingBases > 0) {
      td.innerHTML = "n/a";
      td.title = "This feature will become available once "
		+ "you have viewed all of your bases.";
	  return;	  
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
      if (unitStats[unit].hangars>=0)
			inProdHangarSpace += unitStats[unit].hangars * n;
	  else 	
			inProdHangarFleet += unitStats[unit].hangars * n;
    }
    insertCell(td, rows[i].cells[1]);
  }
  var tip = "In production hangar space: " + commaFormat(inProdHangarSpace) + " - hangar fleet: " + commaFormat(inProdHangarFleet) + " (" + commaFormat(inProdHangarSpace+inProdHangarFleet) ;
  if ((inProdHangarSpace+inProdHangarFleet) < 0)
    tip += " shortage)";
  else if ((inProdHangarSpace+inProdHangarFleet) == 0)
    tip += " sufficient)";
  else
    tip += " surplus)";
  for (var i = 1; i < rows.length; i++) {
    rows[i].cells[2].title = tip;
  }
  
    var div= document.createElement("table")
	div.setAttribute("id","prodReport");
	div.align = "center";
	div.width = twidth + " px";
	div.setAttribute("class","layout_listing");
    document.body.appendChild(div);

	var reportTypes = ["Date","Week","Month","Base"];
    var reportStyle = Number(getSetting("reportStyle",0));
	createReport();

	function refreshReport(){
	   reportStyle = (reportStyle+1) % 4;
	   setSetting("reportStyle",reportStyle);
	   createReport();
	}
	unsafeWindow.refreshReport = function() {
		window.setTimeout(refreshReport, 0);
	};

 function createReport(){  
    var prodReport = [];
    var cTime = pageLoadTime.getTime();	
    for (var i = 0; i < bases.length; i++) {
        var prod = getSetting("prod"+bases[i].split(";")[0], "").split(",");
		for (var j=0; j<prod.length; j++) 
    	   if (prod[j].match(/(\d+) @(\d+) (.*?)$/)) {
		    var time = new Date(Number(RegExp.$2));
			if (time > cTime) {
				switch (reportStyle){
					case 0  : 
						var timeStr = time.toString().substring(0,11);
						break;
					case 1 : 
						var timeStr = "Week "+time.getWeek();
						break;
					case 2 : 
						var timeStr = time.toString().substring(4,7);
						break;
					case 3  : 
						var timeStr = bases[i].split(";")[1];
						break;
				} 
				var prodStr = RegExp.$1 + " " + RegExp.$3 + ", ";
				for(var kmax=0; kmax < prodReport.length; kmax++) 
					if (timeStr == prodReport[kmax].date) break;
				if ((prodReport.length==0) || (prodReport.length==kmax)){  
					if (reportStyle == 3)
						prodReport.push({"ptime" : i, "date" : timeStr, "prod" : prodStr})
					else
						prodReport.push({"ptime" : Number(RegExp.$2), "date" : timeStr, "prod" : prodStr})
					} 
				else
					prodReport[kmax].prod += prodStr;
			}
	         
        }
    }		

    
	prodReport.sort(function (a,b) { 
			var x = a.ptime;
			var y = b.ptime;
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			}
		);
	
    var html = "<tr><th align='left' style='padding-left:10px'><a style='color:gold;cursor:pointer;' onClick='refreshReport()'>"+ reportTypes[reportStyle] 
		+"</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th> <th align='center'>In production</th> <th align='right' style='padding:0px 5px 0px 10px;'>Hangars</th><th align='right' style='padding:0px 10px 0px 10px;'>Cost</th></tr>";
	var totalcost = 0;
	var totalHangars = 0;
 	for (var i=0; i<prodReport.length; i++){
	    var dProd = prodReport[i].prod.split(", ");
		var prodStr = "";
		var cost = 0;
		var hangars = 0;
	    for (var unit in unitStats) {
		    var count = 0;
			for (var j=0; j< dProd.length; j++)
			    if (dProd[j].match(/(\d+).(.*?)$/)){
				   if( RegExp.$2 == unit){
						count += Number(RegExp.$1);
						hangars += unitStats[unit].hangars * Number(RegExp.$1);
					   }
				}
			if (count !=0) {
			    totalHangars += unitStats[unit].hangars * count;
				prodStr += unit + "&nbsp;&nbsp;" + commaFormat(count) + "&nbsp;&nbsp;&nbsp;&nbsp;";
				cost += count * unitStats[unit].cost;
			}
		}
		totalcost += cost;
		html += "<tr><td align='left' style='padding-left:10px'>" +  prodReport[i].date 
			+ "</td> <td align='center' style='padding:0px 20px 0px 20px;' > " + prodStr 
 			+ "</td> <td align='right' style='padding:0px 5px 0px 10px;'>" + commaFormat(hangars) 
			+ "</td> <td align='right' style='padding:0px 10px 0px 20px;'>" + commaFormat(cost) 
			+ "</td> </tr>";
    }
	
    html += "<tr><th align='center'> Total : </th> <th> </th><th align='right' style='padding:0px 5px 0px 10px;'>"+ commaFormat(totalHangars)
		+ "</th> <th align='right' style='padding:0px 10px 0px 10px;'>"+ commaFormat(totalcost) +"</th></tr>";
	document.getElementById("prodReport").innerHTML = html;
 	}
 
 //M_log(t.innerHTML); 
}

function insertHangarSpaceColumn()
{
  var t = document.getElementById("empire_units_units");
  if (!t) return;
  var rows = t.rows[0].cells[0].firstChild.rows;
  if (!rows) return;

  var col = 5;
  var totalHangarSpace = 0;
  var totalHangarFleet = 0;
  var th = document.createElement("th");
  th.innerHTML = "Hangars";
  insertCell(th, rows[0].cells[col]);
  for (var i = 1; i < rows.length; i++) {
    var td = document.createElement("td");
    var unit = rows[i].cells[0].textContent;
    var n = parseNum(rows[i].cells[1].textContent);
    var hangars = unitStats[unit].hangars * n;
    if (hangars>=0)
		totalHangarSpace += hangars;
	else 
		totalHangarFleet += hangars;	
    td.innerHTML = commaFormat(hangars);
    insertCell(td, rows[i].cells[col]);
  }

  var tip = "Total hangar space: " + commaFormat(totalHangarSpace) + " - hangar fleet: " + commaFormat(totalHangarFleet) + " (" + commaFormat(totalHangarSpace+totalHangarFleet) ;
  if ((totalHangarSpace+totalHangarFleet) < 0)
    tip += " shortage)";
  else if ((totalHangarSpace+totalHangarFleet) == 0)
    tip += " sufficient)";
  else
    tip += " surplus)";
  for (var i = 1; i < rows.length; i++) {
    rows[i].cells[col+1].title = tip;
  }

/* 
  var tip = "Total hangar space: " + commaFormat(totalHangars) + " ";
  if (totalHangars < 0)
    tip += "(shortage)";
  else if (totalHangars == 0)
    tip += "(sufficient)";
  else
    tip += "(surplus)"; */
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

function highlightTags()
{
  var tags = [];
  var homeTag = getSetting("homeTag", "");
  if (homeTag && getFlag("highlightHome")) {
    tags.push([homeTag, getPlayerColor("Home")]);
  }
  
  if (getFlag("highlightFriends")) {
    var friends = getFriendlyGuilds();
    for (var i = 0; i < friends.length; i++) {
      var tag = getGuildTag(getSetting("tag"+friends[i], ""));
      if (tag) {
		tags.push([tag, getPlayerColor("Friendly")]);
      }
    }
  }
  
  if (getFlag("highlightAllies")) {
    var allies = getAlliedGuilds();
    for (var i = 0; i < allies.length; i++) {
      var tag = getGuildTag(getSetting("tag"+allies[i], ""));
      if (tag) {
		tags.push([tag, getPlayerColor("Allied")]);
      }
    }
  }

  if (getFlag("highlightHostiles")) {
    var hostiles = getHostileGuilds();
    for (var i = 0; i < hostiles.length; i++) {
      var tag = getGuildTag(getSetting("tag"+hostiles[i], ""));
      if (tag) {
		tags.push([tag, getPlayerColor("Hostile")]);
      }
    }
  }
  
  if (getFlag("highlightEnemies")) {
    var enemies = getEnemyGuilds();
    for (var i = 0; i < enemies.length; i++) {
      var tag = getGuildTag(getSetting("tag"+enemies[i], ""));
      if (tag) {
		tags.push([tag, getPlayerColor("Enemy")]);
      }
    }
  }
  
  var highlightNeutrals = getFlag("highlightNeutrals");
  if (tags.length == 0 && !highlightNeutrals) 
     return
  else 
     return tags;
}
	
function highlightPlayers()
{
  var tags = highlightTags();
  if (!tags) return;
  
  var highlightNeutrals = getFlag("highlightNeutrals");
  var highlightUCs = getFlag("highlightUC");
  var highlightDrekons = getFlag("highlightDrekon");

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
		a.style.color = getPlayerColor("Neutral");
      }
    }
    else {
      var p = parentTable(a);
      p = p && parentTable(p);
      if (p && p.getAttribute("id") == "board_main") {
	// Actually an allied player making a board post
		if (false && getFlag("highlightAllies")) {
			a.style.color = getPlayerColor("Allied");
		}
      }
      else 
	    if (highlightUCs && (txt=="United Colonies"))
			a.style.color = getPlayerColor("UC");
      else 
	    if (highlightDrekons && (txt=="Drekons"))
			a.style.color = getPlayerColor("Drekons");
	  else
	    if (highlightNeutrals) {
			a.style.color = getPlayerColor("Neutral");
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

function enhanceProductionPage()
{
  var t = document.getElementById("empire_ production");
  if (!t) return;
  t = t.rows[1].cells[0].firstChild.firstChild;
  if (!t || t.nodeName != "TABLE") return;
  var rowCount = document.getElementById("t_rows");
  rowCount = rowCount && Number(rowCount.getAttribute("title"));
  if (!rowCount) return;
  var credits = document.getElementById("credits");
  if (!credits) return;
  credits = parseNum(credits.nextSibling.textContent);

//  var row = t.tFoot.firstChild;
  var row = t.tFoot;

  if (!row.innerHTML.match(/<th>Total<\/th><th>(\d+) \[(\d+)\]<\/th>/))
    return;
  var totalProd = Number(RegExp.$1);
  var totalRealProd = Number(RegExp.$2);
  var rex = new RegExp(totalProd+" \\["+totalRealProd+"\\]");
  var txt = commaFormat(totalProd)+" ["+commaFormat(totalRealProd)+"]";
  row.innerHTML = row.innerHTML.replace(rex, txt);
  var html = "<tr><td style='padding-top:10px' align='center' colspan='7'>";
  html += "<small>Total effective production: "
    + commaFormat(totalRealProd*24)+" credits/day - "
    + commaFormat(totalRealProd*24*7) + " credits/week</small> "
    + "&nbsp; &nbsp; &nbsp; &nbsp; ";
  html += "<br/><br/> ";
  html += "<b>Fill production queues until:</b> ";
  html += "<select id='productionDeadlineDay' onChange='setQuantities()'>";
  html += "<option value='0'>Set deadline...</option>";
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
  html += "<select id='productionDeadlineHour' onChange='setQuantities()'>";
  for (var i = 0; i < 24; i++) {
    html += "<option value='"+i+"'>"+zeroPad(i,2)+"</option>";
  }
  html += "</select><b>:</b>";
  html += "<select id='productionDeadlineMinute' onChange='setQuantities()'>";
  for (var i = 0; i < 60; i += 5) {
    html += "<option value='"+i+"'>"+zeroPad(i,2)+"</option>";
  }
  html += "</select> <small>";
  html += "<a onClick='setQuantities()' href='javascript:;'>Update</a>";
  html += "</small></td></tr>";
  t.tFoot.innerHTML += html;

   function plusLink(row, amount)
  {
    var code = 'var e = document.getElementById("quant_'+row+'"); '
    if (amount == 0) {
      var txt = "reset";
      code += 'e.value=""; ';
    }
    else {
      var txt = "+" + ((amount >= 1000) ? ((amount/1000)+"k") : amount);
      code += 'e.value=Math.min(99999, Number(e.value)+'+amount+'); '
    }
    code += 'update_row('+row+');';
    return "<small><a href='javascript:;' onClick='"
      +code+"'>"+txt+"</a></small>";
  }

  for (var row = 1; row <= rowCount; row++) {
    var tr = document.getElementById("row"+row);
    var oldHTML = tr.cells[4].innerHTML;
    var html = " <table style='background:transparent;border:0px'>";
    html += "<tr><td width='70' align='right'>";
    html += oldHTML + "</td><td>";
    html += "<table style='background:transparent;border:0px'>";
    html += "<tr><td align='center'>";
    html += plusLink(row, 1)+"&nbsp;";
    html += plusLink(row, 10)+"&nbsp;";
    html += plusLink(row, 100)+"</td></tr>";
    html += "<tr><td align='center'>"+plusLink(row, 500)+"&nbsp;";
    html += plusLink(row, 1000)+"&nbsp;";
    html +=plusLink(row, 10000)+"</td></tr>";
       html += "</table>";
    tr.cells[4].innerHTML = html;

    var a = tr.cells[0].firstChild;
    if (a && a.nodeName == "A") {
      var href = a.getAttribute("href");
      if (href.match(/^base\.aspx\?base=(\d+)/)) {
	var base = RegExp.$1;
	var unit = getSetting("prodUnit"+base, "");
	if (unit) {
	  document.getElementById("select_"+row).value = unit;
	}
      }
    }
  }


  function saveSettings(event)
  {
    for (var row = 1; row <= rowCount; row++) {
      var tr = document.getElementById("row"+row);
      var a = tr.cells[0].firstChild;
      if (a && a.nodeName == "A") {
	var href = a.getAttribute("href");
	if (href.match(/^base\.aspx\?base=(\d+)/)) {
	  var base = RegExp.$1;
	  var quant = document.getElementById("quant_"+row).value;
	  var unit = document.getElementById("select_"+row).value;
	  if (quant) {
	    setSetting("prodUnit"+base, unit);
	  }
	}
      }
    }
  }

  var form = parentForm(t);
  form.addEventListener("submit", saveSettings, false);

  function update_row(row)
  {
    var unit = document.getElementById("select_"+row).value;
    var prod = Number(document.getElementById("prod_"+row).title);
    var price = unsafeWindow.unit_cost(unit);
    var quant_str = document.getElementById("quant_"+row).value;
    var start_time = Number(document.getElementById("cred_"+row).title);
    var fast = document.getElementById("fast").checked;

    quant_str = trim(quant_str);
    if (quant_str.match(/^\d+[mhd]$/)) {
      unsafeWindow.process_date(row,quant_str,prod,price);
      quant_str = document.getElementById("quant_"+row).value;
    }
    if (!quant_str.match(/^\d+$/)) {
      document.getElementById("quant_"+row).value = "";
      document.getElementById("cred_"+row).innerHTML = "";
      document.getElementById("prod_time_"+row).title = 0;
      document.getElementById("prod_time_"+row).innerHTML = "";
      update_time(row, start_time, start_time > 0);
    }
    else {
      var quant = Number(document.getElementById("quant_"+row).value);
      var cost = quant*price*(fast? 2:1);

      if (cost == 0) {
	document.getElementById("cred_"+row).innerHTML = "";
	document.getElementById("prod_time_"+row).title = 0;
	document.getElementById("prod_time_"+row).innerHTML = "";
	update_time(row, start_time, start_time > 0);
      }
      else {
	var time = Math.ceil(cost*3600 / prod / (fast? 4:1));
	var total_time = start_time + time;
	document.getElementById("cred_"+row).innerHTML = commaFormat(cost);
	document.getElementById("prod_time_"+row).title	= time;
	document.getElementById("prod_time_"+row).innerHTML
	  = unsafeWindow.time_txt(time);
	update_time(row, total_time, start_time > 0);
      }
    }
    var total = 0;
	var prodUnits = [];
    for (var i = 1; i <= rowCount; i++) {
      total += parseNum(document.getElementById("cred_"+i).innerHTML);
	  prodUnits.push({ "unit" : document.getElementById("select_"+i).value,
						"count" : document.getElementById("quant_"+i).value});
    }
	
    var html = commaFormat(total);
    if (total > credits) {
      html = "<font color='red'>"+html+"</font>";
    }
    document.getElementById("t_cred").innerHTML = html;
	
 	var totalUnits = "";
	for (u in unitStats){
	  var sum = 0;
	  for(var i = 0; i< prodUnits.length; i++)
	       if (u == prodUnits[i].unit) sum += Number(prodUnits[i].count);
	  if (sum!=0) totalUnits += commaFormat(sum) + " " + unitStats[u].shortName + " ";
	}	

	html = t.rows[rowCount+2].innerHTML;
	
	html = html.replace(/<th><\/th><th><\/th><th id=\"t_cred\">/,
	     "<th colspan=2 align='center'> Units: </th><th id=\"t_cred\">");	

	html = html.replace(/Units\:.*?</, "Units: " + totalUnits+"<");	
 
	t.rows[rowCount+2].innerHTML = html;
 	
  }
  

  function update_time(row, seconds, countdown)
  {
    seconds = Number(seconds);
    document.getElementById("timer"+row).title = seconds;
    var elem = document.getElementById("newtime"+row);
    if (elem) {
      if (Number(elem.getAttribute("seconds")) != seconds) {
	elem.setAttribute("seconds", seconds);
	if (!countdown) {
	  elem.setAttribute("timeDisplay", "duration");
	  var time = new Date(currentTime.getTime() + seconds*1000);
	  elem.title = formatUTC(time);
	  elem.innerHTML = formatCountdown1(seconds).replace(/ /g, "&nbsp;");
	}
	else {
	  var time = new Date(pageLoadTime.getTime() + seconds * 1000);
	  time = formatUTC(time);
	  elem.setAttribute("time", time);
	  var cutoff = getCountdownCutoff();
	  if (cutoff == 0 || seconds < cutoff) {
	    elem.setAttribute("timeDisplay", "countdown1");
	    elem.setAttribute("title", time);
	    elem.innerHTML = formatCountdown1(seconds).replace(/ /g, "&nbsp;");
	  }
	  else {
	    elem.setAttribute("timeDisplay", "time");
	    elem.setAttribute("title", formatCountdown1(seconds));
	    elem.innerHTML = time.replace(/ /g, "&nbsp;");
	  }
	}
      }
    }
  }

  function change_fast()
  {
    for (var i = 1; i <= rowCount; i++) {
      update_row(i);
    }
  }

  function setQuantities()
  {
    var fast = document.getElementById("fast").checked;
    var daySelect = document.getElementById("productionDeadlineDay");
    var hourSelect = document.getElementById("productionDeadlineHour");
    var minuteSelect = document.getElementById("productionDeadlineMinute");
    var deadline = Number(daySelect.value);
    if (deadline > 0) {
      deadline += Number(hourSelect.value)*60*60*1000 +
	Number(minuteSelect.value)*60*1000;
    }
	
    for (var row = 1; row <= rowCount; row++) {
      var unitSelect = document.getElementById("select_"+row);
      var unit = unitSelect.value;
      var cost = unsafeWindow.unit_cost(unit);
      if (!cost) continue;
      var quantInput = document.getElementById("quant_"+row);
      var timeCell = document.getElementById("timer"+row);
      var seconds = Number(timeCell.getAttribute("sorttable_customkey"));
      var prodCell = document.getElementById("prod_"+row);
      var realProd = Number(prodCell.getAttribute("sorttable_customkey"));
      
      var startTime = pageLoadTime.getTime() + seconds*1000;
      var time = deadline - startTime;
      var hours = time / (1000 * 60 * 60);
      var quantity = Math.floor(realProd * hours / cost * (fast? 2:1));
      quantInput.value = (quantity <= 0) ? "" : quantity;
      update_row(row);
    }
  }

  unsafeWindow.update_row = function(row) {
    window.setTimeout(function() { update_row(row); }, 0);
  };
  unsafeWindow.change_fast = function() {
    window.setTimeout(change_fast, 0);
  };

  unsafeWindow.setQuantities = function() {
    window.setTimeout(setQuantities, 0);
  };
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
 highlightPlayers();
 if (getFlag("quickbookmarks")) {
	initRightMenu();}
}
  if (!document.body)
    return;
  var url = document.location.href;
  uploadBody(url);
  removeAdvertising(); 
  unsafeWindow.toggleTimeDisplay = toggleTimeDisplay;

  var div = document.createElement("div");
  div.innerHTML = "<div style='display:block;background:#333;position:fixed;top:50;right:0;padding:3px;text-align:center;border:1px solid #000;border-width: 0 0 2px 2px;' id='processStatus'> </div>";
  document.body.appendChild(div);
  
  if (getFlag("minutils")) minutils();

 
 if (getFlag("insertEmpireMenu")
      || getFlag("classicEmpireMenu") || getFlag("freeAccountEmpireMenu")) {

    insertEmpireMenu();
  }
 if (getFlag("insertBattleCalculator")) {
    insertBattleCalculator();
    if (url.match(/combat\.aspx\?fleet=\d+&attack/)) {
      projectCombatResult();
    }
  }
 if (url.match(/board\.aspx/)) {
    processBoardPosts();
  }
main();
  //  if (url.match(/scanners/)) {
  //    if (server == "alpha") {
  //      enhanceScanners();
  //    }
  //  }
  
 if (url.match(/board\.aspx\?folder=2/) || url.match(/messages\.aspx/)) {
  if (getFlag("insertCombatProfit")){  processCombatBoard();
  }}
 
  if (url.match(/account\.aspx$/)) {
    recordBaseCountAndAccountType();
    showConfigOnAccountPage();
  }
  if (url.match(/empire\.aspx\?view=technologies/)) {
    recordTechs();
  }
  if (url.match(/base\.aspx\?base=\d{1,20}&view=structures/)) {
    addConstructionAdvisor();
  }
if (!url.match(/board\.aspx\?folder=\d{1,20}/)) {

  if (url.match(/base\.aspx\?base=\d{1,20}$/) ||
      url.match(/profile\.aspx\?player=\d{1,20}$/) ||
      url.match(/guild\.aspx\?guild=\d{1,20}$/)) {
    if (server == "alpha") {
      insertTopLink(url);
    }
  if (server == "delta") {
      insertdeltaDatabaseLink(url);
      insertdeltaeddieLink(url);
    }
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
  
  if (url.match(/map\.aspx\?loc=([A-Z]\d\d:\d\d:\d\d:\d\d)$/)) {
    if (!opera && getFlag("cacheLocations")) {
      updateLocationCacheFromMapPage(RegExp.$1);
    }
    if (getFlag("addCapacityTooltips")) {
      addPillageTooltip();
    }
//	hidebaseDetails();
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
    if (getFlag("insertBattleCalculator")) {
      addBaseBCLink();
    }
//	hidebaseDetails();
  }
  if (getFlag("addTravelPlanner")) {
    if (url.match(/base\.aspx\?base=\d{1,20}$/)) {
      addTravelPlanner(findBaseLocation());
    }
    else if (url.match(/map\.aspx\?loc=([A-Z]\d\d:\d\d:\d\d:\d\d)/)) {
      addTravelPlanner(RegExp.$1);
   }
  }
  if (getFlag("addBaseReport")) 
    if (url.match(/base\.aspx\?base=\d{1,20}$/)) {
      addBaseReport(findBaseLocation());
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
	getFlag("searchUsingGenome"))  {
      addFindLZ();
    }
    if (!opera && server == "alpha" &&
	(getFlag("searchUsingGenome") || getFlag("searchUsingRubyFARM"))) {
      addFindJGLink();
    }
if (!opera && server == "delta" &&
	(getFlag("searchUsingdeltaFARM"))) {
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
  if (url.match(/empire\.aspx\?view=bases_production/)) {
    if (getFlag("enhanceProductionPage")) {
      shortcutProductionBaseLinks();
      enhanceProductionPage();
    }
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
    if (getFlag("unitFleetSummary")) {
		fleetSummary();
    }
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
  if (url.match(/base\.aspx\?base=/) || url.match(/map\.aspx\?loc=([A-Z]\d\d:\d\d:\d\d:\d\d)/)) {
    if (getFlag("sumFleets")) {
      sumFleets();
    }
	if(getFlag("hideGuildGroups")) fleetListTools();
  }
  
  if (url.match(/fleet\.aspx\?fleet=.*?attack/)) {
	if(getSetting('hideFleets',true)) fleetListTools();
  }

  if (url.match(/view=scanners/)) {
	if(getSetting('hideFleets',true)) fleetListTools();
  }
  
  if (url.match(/map\.aspx\?.*loc=([A-Z]\d\d:[\d:]+)$/)) {
    var location = RegExp.$1;
    if (server == "alpha") {
      insertTopLink(url);
//      addLocationSearchFrame()    
    }
	if (server == "delta") {
      insertTopLink(url);

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
  if (url.match(/map\.aspx/) ||
//      url.match(/map\.aspx\?loc=A\d\d\:\d\d$/) ||
//	  url.match(/map\.aspx\?.*loc=([A-Z]\d\d:[\d:]+)$/) ||
/*  	  url.match(/map\.aspx\?.*loc=([A-Z][\d:]+)$/) ||
      url.match(/map\.aspx\?(cmp=\d+&)?loc=A\d\d$/) ||
      url.match(/map\.aspx\?cmp=\d\&loc\=A\d\d\:\d\d$/) ||
      url.match(/map\.aspx\?map=A\d\d$/) ||
      url.match(/map\.aspx\?gal=A\d\d$/) ||
 */ 
	  url.match(/bookmarks\.aspx/) ||
      url.match(/fleet\.aspx/)) {
        if (server == "alpha" && getFlag("addMapOverlays") && (getFlag("searchUsingGenome") || getFlag("searchUsingRubyFARM"))) {
			addMapOverlays();
		}
		if (server == "delta" && getFlag("addMapOverlays") && getFlag("searchUsingRubyFARM")) {
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
	//getTechGuildmembers();
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
	addTechProfile();
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
 
}
currentpage = document.location.href;

function auditStructures() {
    table = document.getElementsByTagName("table");
    for(x=0;x<table.length;x++) {
	if(table[x].innerHTML.match(/verdana/i)) {
	    //table = table[x].childNodes[0];
	    table = table[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
	}
    }
    for(x=0;x<table.childNodes.length;x++){
	base  = 	table.childNodes[x].childNodes[0].innerHTML;
	urban = 	table.childNodes[x].childNodes[1].innerHTML;
	solar = 	table.childNodes[x].childNodes[2].innerHTML;
	gas = 		table.childNodes[x].childNodes[3].innerHTML;
	fusion = 	table.childNodes[x].childNodes[4].innerHTML;
	antimatter = 	table.childNodes[x].childNodes[5].innerHTML;
	labs = 		table.childNodes[x].childNodes[6].innerHTML;
	mf = 		table.childNodes[x].childNodes[7].innerHTML;
	mines = 	table.childNodes[x].childNodes[8].innerHTML;
	rf = 		table.childNodes[x].childNodes[9].innerHTML;
	sy =		table.childNodes[x].childNodes[10].innerHTML;
	osy =		table.childNodes[x].childNodes[11].innerHTML;
	spaceport =	table.childNodes[x].childNodes[12].innerHTML;
	cc =		table.childNodes[x].childNodes[13].innerHTML;
	nf = 		table.childNodes[x].childNodes[14].innerHTML;
	af = 		table.childNodes[x].childNodes[15].innerHTML;
	econ =		table.childNodes[x].childNodes[16].innerHTML;
	terra = 	table.childNodes[x].childNodes[17].innerHTML;
	mlp = 		table.childNodes[x].childNodes[18].innerHTML;
	orbital	=	table.childNodes[x].childNodes[19].innerHTML;
	jg = 		table.childNodes[x].childNodes[20].innerHTML;
	bio = 		table.childNodes[x].childNodes[21].innerHTML;
	capital = 	table.childNodes[x].childNodes[22].innerHTML;
	table.childNodes[x].childNodes[0].innerHTML = base.replace("\">","&view=structures\">"); 	
	table.childNodes[x].childNodes[1].innerHTML = "<div style='color:green;font-weight:bold'>" + mf + "</div>";
	table.childNodes[x].childNodes[2].innerHTML = "<div style='color:green;font-weight:bold'>" + rf + "</div>";
	table.childNodes[x].childNodes[3].innerHTML = "<div style='color:green;font-weight:bold'>" + nf + "</div>";
	table.childNodes[x].childNodes[4].innerHTML = "<div style='color:green;font-weight:bold'>" + af + "</div>";
	table.childNodes[x].childNodes[5].innerHTML = "<div style='color:red;font-weight:bold'>" + sy + "</div>";
	table.childNodes[x].childNodes[6].innerHTML = "<div style='color:red;font-weight:bold'>" + osy + "</div>";
	table.childNodes[x].childNodes[7].innerHTML = "<div style='color:#b0b000;font-weight:bold'>" + econ + "</div>";
	table.childNodes[x].childNodes[8].innerHTML = "<div style='color:#b0b000;font-weight:bold'>" + mines + "</div>";
	table.childNodes[x].childNodes[9].innerHTML = "<div style='color:#b0b000;font-weight:bold'>" + spaceport + "</div>";
	table.childNodes[x].childNodes[10].innerHTML = "<div style='color:#b0b000;font-weight:bold'>" + capital + "</div>";
	table.childNodes[x].childNodes[11].innerHTML = "<div stABCD-DEFG-HIJK-LMNOyle='color:yellow;font-weight:bold'>" + labs + "</div>";
	table.childNodes[x].childNodes[12].innerHTML = "<div style='color:violet;font-weight:bold'>" + urban + "</div>";
	table.childNodes[x].childNodes[13].innerHTML = "<div style='color:violet;font-weight:bold'>" + orbital + "</div>";
	table.childNodes[x].childNodes[14].innerHTML = "<div style='color:violet;font-weight:bold'>" + bio + "</div>";
	table.childNodes[x].childNodes[15].innerHTML = "<div style='color:orange;font-weight:bold'>" + solar + "</div>";
	table.childNodes[x].childNodes[16].innerHTML = "<div style='color:orange;font-weight:bold'>" + gas + "</div>";
	table.childNodes[x].childNodes[17].innerHTML = "<div style='color:orange;font-weight:bold'>" + fusion + "</div>";
	table.childNodes[x].childNodes[18].innerHTML = "<div style='color:orange;font-weight:bold'>" + antimatter + "</div>";
	table.childNodes[x].childNodes[19].innerHTML = "<div style='color:#00ff00;font-weight:bold'>" + terra + "</div>";
	table.childNodes[x].childNodes[20].innerHTML = "<div style='color:#00ff00;font-weight:bold'>" + mlp + "</div>";
	table.childNodes[x].childNodes[21].innerHTML = "<div style='color:#00c0ff;font-weight:bold'>" + cc + "</div>";
	table.childNodes[x].childNodes[22].innerHTML = "<div style='color:#00c0ff;font-weight:bold'>" + jg + "</div>";
    }
}

function streamlineProduction() {
    table = document.getElementById('base_prod').parentNode.parentNode;
    for(x=0;x<table.childNodes.length;x++) {
	if(table.childNodes[x].innerHTML.match(/help/i)) {
	    table.childNodes[x].style.display = "none";
	}
	if(table.childNodes[x].innerHTML.match(/onkeyup/)) {
//	    table.childNodes[x].onFocus = 'alert("hi!")';
//	    table.childNodes[x].innerHTML = table.childNodes[x].innerHTML.replace(/onkeyup/,"onFocus='this.parentNode.parentNode.bgColor=\"green\"' onBlur='this.parentNode.parentNode.bgColor=null' onkeyup");
//	    table.childNodes[x].innerHTML = table.childNodes[x].innerHTML.replace(/onkeyup/,"onFocus='this.parentNode.parentNode.bgColor=\"green\"' onBlur='this.parentNode.parentNode.bgColor=null' onkeyup");
	}
    }
}

function streamlineConstruction() {
    table = document.getElementsByTagName("table");
    for(x=0;x<table.length;x++) {
	if(table[x].innerHTML.match(/(Construction|barracks)/i)) {
	    table = table[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
	}
    }
    for(x=0;x<table.childNodes.length;x++) {
	if(table.childNodes[x].innerHTML.match(/help/i)) {
	    table.childNodes[x].style.display = "none";
	}
    }
    for(x=0;x<table.childNodes.length;x++) {
	if(table.childNodes[x].innerHTML.match(/(working|out cred\.|out area|out popul\.)/i)){
	    options = document.getElementsByName("add_stack");
	    if(options.length > 0) {
		options = options[0].options;
	    } else break;
	    for(y=0;y<options.length;y++){
		value = options[y].value.replace(/ /,"%20");
		value = options[y].value;
		if(table.childNodes[x].innerHTML.match("info="+value)) {
		    table.childNodes[x].lastChild.innerHTML = "<a href='javascript:document.getElementsByName(\"add_stack\")[0].options["+y+"].selected=\"true\";document.getElementsByTagName(\"form\")[1].submit();'>Queue</a>";
		}
	    }
	}
	if(table.childNodes[x].innerHTML.match(/time/i)){
	    options = document.getElementsByName("add_stack");
	    if(options.length > 0) {
		options = options[0].options;
	    } else break;
	    for(y=0;y<options.length;y++){
		value = options[y].value.replace(/ /,"%20");
		value = options[y].value;
		if(table.childNodes[x].innerHTML.match("info="+value)) {
		    trick = document.createElement("div");
		    trick.appendChild(table.childNodes[x].lastChild);
		    insert = document.createElement("td");
		    insert.align = "center";
		    insert.innerHTML = "<a href='javascript:document.getElementsByName(\"add_stack\")[0].options["+y+"].selected=\"true\";document.getElementsByTagName(\"form\")[1].submit();'>Queue</a>";
		    insert.appendChild(trick);
		    table.childNodes[x].appendChild(insert);
		}
	    }
	}
    }
    for(x=0;x<table.childNodes.length;x++) {
	if(table.childNodes[x].innerHTML.match(/working/i)){
	    table.childNodes[x].lastChild.innerHTML = "-";
	}
    }
}

function moveableFleets() {
  table = document.getElementsByTagName("table");
  for(x=0;x<table.length;x++) {
    if(table[x].innerHTML.match(/Location/i)) {
      table = table[x].childNodes[0];

      //table = table[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[1];
    }
  }
  for(x=0;x<table.childNodes.length;x++){
    table.childNodes[x].addEventListener('mouseover', function() {
      this.style.background = "transparent";
    //this.style.background = "#008";
    }, false)
    table.childNodes[x].addEventListener('mouseout', function() {
     //this.style.background = "transparent";
      // this.style.background = "#008";
    }, false)
    if(table.childNodes[x].childNodes[0].innerHTML.match(/fleet\.aspx/)) {
      table.childNodes[x].childNodes[0].childNodes[0].childNodes[0].href = table.childNodes[x].childNodes[0].childNodes[0].childNodes[0].href + "&view=move";
    }
  }
}
function clickableFleet() {
    table = document.getElementsByTagName("table");
    for(x=0;x<table.length;x++) {
	if(table[x].innerHTML.match(/Comment/i)) {
	    table = table[x].childNodes[0];
	}
    }
    table.childNodes[0].childNodes[0].innerHTML = "<a href=empire.aspx?view=fleets>" + table.childNodes[0].childNodes[0].innerHTML + "</a>";
}

function hilightQueue() {
    table = document.getElementsByTagName("table");
    for(x=0;x<table.length;x++) {
	if(table[x].innerHTML.match(/location/i)) {
	    //table = table[x].childNodes[0];
	    table = table[x].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
	}
    }
    lowtimer = 99999;
    lowx = 0;
    lowy = 0;
    for(x=0;x<table.childNodes.length;x++){
	if(!(table.childNodes[x].innerHTML.match(/\(\d\)/))) continue;
	for(y=0;y<table.childNodes[x].childNodes.length;y++){
	    if(table.childNodes[x].childNodes[y].innerHTML.match(/\(0\)/)){
		time = table.childNodes[x].childNodes[y-2].innerHTML;
		time = time.split(":")[0];
		if(parseInt(time) < 24) {
		    table.childNodes[x].childNodes[y].childNodes[0].innerHTML = "<div style='color:red'>" + table.childNodes[x].childNodes[y].childNodes[0].innerHTML + "</div>";
		} else if(parseInt(time) < lowtimer && y == 5) {
		    lowtimer = parseInt(time);
		    lowx = x;
		    lowy = y;
		}
	    }
	}
    }
    if(lowtimer != 99999) {
	table.childNodes[lowx].childNodes[lowy].childNodes[0].innerHTML = "<div style='color:magenta'>" + table.childNodes[lowx].childNodes[lowy].childNodes[0].innerHTML + "</div>";
    }
}

if(currentpage.match(/empire.aspx\?view=structures/)) {
    auditStructures();
}

if(currentpage.match(/base.aspx\?base=\d{1,20}$/)){
	calculateBaseCommanderEffect();
}

if(currentpage.match(/base.aspx\?base=\d{1,20}&view=production/)){
    streamlineProduction();
}
if(currentpage.match(/base.aspx\?base=\d{1,20}&view=(structures|defenses)/)){
    streamlineConstruction();
}
if(currentpage.match(/empire.aspx\?view=fleets/)) {
   moveableFleets();
}
if(currentpage.match(/fleet.aspx$/)){
    clickableFleet();
}
if(currentpage.match(/(empire.aspx$|bases_events)/)){
    hilightQueue();
}

function insertSystemBaseList(){
	var playersInSystem = document.evaluate(
	    '//a[@title][not(contains(@id,"_c"))]/text()',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	var basesInSystem = document.evaluate(
	    '//a[starts-with(@href,"base.aspx?")]/@href',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);    
	var coordsInSystem = document.evaluate(
	    '//a[@title][not(contains(@id,"_c"))]/@id',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);   
	var uninhabitedPlanetsInSystem = document.evaluate(
	    '//span[@id and @style]/@id',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);   
	var uninhabitedLinks = document.evaluate(
	    '//span[@id and @style]/@id',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null); 

	var totalBases = basesInSystem.snapshotLength; 
	var totalPlanets = uninhabitedPlanetsInSystem.snapshotLength;
	var x;
	var html = "<tr><td><b>Players with bases in System</b></td><td>"
		+"<b>Uninhabited Planets</b></td></tr>";
	var mapPage = currentPage.match(/map\.aspx\?.+/);
	var systemPage = currentPage.match(/A.+:.+:.+:.+/);


	if (mapPage && !systemPage ){

		if (totalBases || totalPlanets){
		
	
			for (x = 0; x < totalBases || x < totalPlanets; x++){
				if (x >= totalBases) {
					var playerName = ""
					var baseLink = ""
					var coords = ""
				}
				else {
					var playerName = playersInSystem.snapshotItem(x).textContent;
					var baseLink = basesInSystem.snapshotItem(x).textContent;
					var coords = coordsInSystem.snapshotItem(x).textContent;
					coords = ' (' + coords.slice(0,12) + ')';trade
				}

				if (x < uninhabitedPlanetsInSystem.snapshotLength) {
					var uninhabitedPlanets = uninhabitedPlanetsInSystem.snapshotItem(x).textContent;
					uninhabitedPlanets = uninhabitedPlanets.slice(0,12);
					var unihabitedPlanetLinks = 'map.aspx?loc=' + uninhabitedLinks.snapshotItem(x).textContent.slice(0,12);
					html = html + '<tr><td><a href="' + baseLink + '">'
						+ playerName + coords + '</a></td><td><a href="' + unihabitedPlanetLinks + '">'
						+ uninhabitedPlanets + '</a></td></tr>';
				}
				else {
				html = html + '<tr><td><a href="' + baseLink + '">' + playerName 
				+ coords + '</a></td></tr>';
				}
			}
	

		var tables = document.evaluate(
	    		"//table[@class='system']",
	    		document,
	    		null,
	    		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    		null);
	    		if(tables.snapshotLength==0)
	    			return;
	    	var systemTable = document.evaluate(
	    		"//body",
	    		document,
	    		null,
	    		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    		null);
	    		var newTable = document.createElement('table');
	    		newTable.setAttribute('width',(tables.snapshotItem(0).getAttribute("width")/2));
	    		newTable.setAttribute('align','center');
	    		newTable.setAttribute('class','system');
	    		newTable.innerHTML = html;
		systemTable = systemTable.snapshotItem(0);
	    		if(systemTable){
				systemTable.appendChild(newTable);
	        		var lineBreak = document.createElement('br');
	        		newTable.parentNode.insertBefore(lineBreak,newTable);
            		}
		}
	}
}

function drakeProof(){
	var urlRegex = /\b(https?:\/\/[^\s+\"\<\>]+)/ig;
	var snapTextElements = document.evaluate("//text()[not(ancestor::a) " + 
		"and not(ancestor::script) and not(ancestor::style) and not(ancestor::textarea) and " + 
		"contains(translate(., 'HTTP', 'http'), 'http')]", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapTextElements.snapshotLength - 1; i >= 0; i--) {
		var elmText = snapTextElements.snapshotItem(i);
		if (urlRegex.test(elmText.nodeValue)) {
			var elmSpan = document.createElement("span");
			var sURLText = elmText.nodeValue;
			elmText.parentNode.replaceChild(elmSpan, elmText);
			urlRegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0;
				 (match = urlRegex.exec(sURLText)); ) { 
				
var checkswf = new RegExp("(\.swf)$","i");
var checkswf1 = checkswf.exec(match[0]); 
if (!getFlag("disableDrakeProofingSWF")){
checkswf1="";}
if(checkswf1)
{
elmSpan.appendChild(document.createTextNode(
				sURLText.substring(lastLastIndex, match.index))); 
				var elmLink = document.createElement("iframe");

// elmLink.setAttribute("height", "450px");
// elmLink.setAttribute("width", "400px");
elmLink.setAttribute("align", "center");
elmLink.setAttribute("src", match[0]);
				elmLink.appendChild(document.createTextNode(match[0])); 
				elmSpan.appendChild(elmLink); 
				lastLastIndex = urlRegex.lastIndex;
 }
else
{elmSpan.appendChild(document.createTextNode(
				sURLText.substring(lastLastIndex, match.index))); 
				var elmLink = document.createElement("a");
				elmLink.title = 'DCR-proofed by MinbariMenu GM script!';
				elmLink.style.textDecoration = 'none';
				elmLink.style.borderBottom = '1px dotted red';
				elmLink.setAttribute("href", match[0]); 
				elmLink.setAttribute("target", "_blank");
				elmLink.appendChild(document.createTextNode(match[0])); 
				elmSpan.appendChild(elmLink); 
				lastLastIndex = urlRegex.lastIndex;};

			}
			elmSpan.appendChild(document.createTextNode(
				sURLText.substring(lastLastIndex)));
			elmSpan.normalize();
		}
	}

}
function node(opt)
    {
    if (!opt) return;
//  console.log("node("+c+")");
    function attr(name)
    {
        var value = opt[name];
        delete opt[name];
        return value;
    }
    var expandos = { id: 1, className: 1, title: 1, type: 1, checked: 1 };
    var id = opt.id;
    var n = $(id);
    if(!n)
    {
        var tag = attr("tag") || "div";
        if ("string" == typeof tag) n = document.createElement(tag);
        else
        {
            var t=document.createElement("div");
            t.innerHTML = tag.toXMLString();
            var ids = {};
            for each( var n in $x('.//*[@id]', t) ) ids[n.id]=1;
            if (!n) ids = null;
            var r = document.createRange();
            r.selectNodeContents(t);
            n = r.extractContents();
            if (n.childNodes.length == 1) n = n.firstChild;
        }
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
    for (var prop in style) n.style[prop] = style[prop];
    for (prop in opt)
        if (expandos[prop]) n[prop] = opt[prop];
        else n.setAttribute(prop, opt[prop]+"");
    if (ids)
        for (var id in ids)
            ids[id] = $(id);
    return ids || n;
}

var EventManager=
{
    _registry:null,Initialise:
    function()
    {
        if(this._registry==null)
        {
            this._registry=[];
            EventManager.Add(window,"unload",this.CleanUp)
        }
    }
    ,Add:
    function(a,b,c,d)
    {
//      console.log("EventManager.function("+a+","+b+","+c+","+d+")");
        this.Initialise();
        if(typeof a=="string")
        {
            if (!a) return false;
            a=$(a)
        }
        if(a==null||c==null)
        {
            return false
        }
        if(a.addEventListener)
        {
            a.addEventListener(b,c,d);
            this._registry.push({obj:a,type:b,fn:c,useCapture:d});
            return true
        }
        return false
    }
    ,CleanUp:
    function()
    {
        for(var i=0;i<EventManager._registry.length;i++)
        {
            with(EventManager._registry[i])
            {
                obj.removeEventListener(type,fn,useCapture)
            }
        }
        EventManager._registry=null
    }
};
function $(variable)
{
    if(!variable) return;
//  console.log("$("+variable+")");
    if (document.getElementById(variable)) return document.getElementById(variable);
}

function setState(id, value) {
  GM_setValue(id, value);
  return value;
}

function getState(id, def) {
  return GM_getValue(id, def);
}

function initRightMenu() {
    rmenu = node({className: 'helperMenu', style: {position: 'absolute'}});
    rmenu.style.right = '2px';
    rmenu.style.top = '75px';
    rmenu.style.position = "fixed";
    document.body.appendChild(rmenu);
//  rmenu.appendChild(createMenuLink(0,'Options',popupOptions));
    rmenu.appendChild(node({className: 'helperMenu', html: 'Quick Bookmarks', style: {textDecoration: 'underline'}}));
    addMarkLocations();

    displayQuickMarks();
}

function displayQuickMarks() {
    var markslist = $("QuickMarkList");
    if (!markslist) {
        markslist = document.createElement('div');
        markslist.id = "QuickMarkList";
        rmenu.appendChild(markslist);
    }
    if (markslist.hasChildNodes()) {
        while (markslist.childNodes.length >= 1) {
            markslist.removeChild(markslist.firstChild);
        }
    }

    var marks = listMarks();

    for (var i = 1; i < marks.length; i++) {
        url = marks[i][0];
        display = marks[i][1];
        data = marks[i][2];

        var e = document.createElement('div');
        if(((document.location.href.match(/fleet.aspx\?fleet=[0-9]{1,}&view=move/) && (url.match(/[\w]\d{2}:\d{2}:\d{2}:\d{2}$/)))) ||
           ((document.location.href.match(/view=trade\&action=new/))) && (url.match(/[\w]\d{2}:\d{2}:\d{2}:\d{2}$/)) || (document.location.href.match(/base\.aspx\?base=\d{1,20}$/))) {
            var striploc = url.match(/([\w]\d{2}:\d{2}:\d{2}:\d{2})$/)
            var l = createLink("javascript:fastloc\('"+striploc[1]+"'\)",'* ');
            l.style.color = 'Red';
            l.className='PasteMark';
            l.name=marks[i];
            l.title['Paste Bookmark into Field'];
        } else {
            var l = createLink(0,'- ');
            l.className='RemoveMark';
            l.name=marks[i];
            l.title['Remove Bookmark'];
            EventManager.Add(l,'click',(function(mark){return function(){delMark(mark)}})(url));
        }
        e.appendChild(l);
        u = createLink(url,display);
        u.name='markurl';
        e.appendChild(u);
        markslist.appendChild(e);

        var d = node({className: 'MarkData',
                      html: data,
                      style: { textIndent: '15', verticalAlign: '3', fontSize: 'x-small', color: "white"}})
        markslist.appendChild(d);
        EventManager.Add(d,'dblclick',(function(url,data){return function(){promptRename(url,data)}})(url,d));
    }
}

function createLink(url, text, onclick) {
    var link = node({tag: 'a', href: url ? url : 'javascript:void(1);', text: text, style: { color: 'gold'}});
    if (onclick)
        EventManager.Add(link, 'click', onclick);
    return link;
}

function createMenuLink(url, text, onclick) {
    var wrap = document.createElement('div');
    var link = node({tag: 'a', href: url ? url : 'javascript:void(1);', text: text, append: wrap});
    if (onclick)
        EventManager.Add(link, 'click', onclick);
    node({tag: 'br', append: wrap});
    wrap.link = link;
    return wrap;
}

function createImageLink(url, imagesrc, size, onclick) {
    var link = createLink(url, '', onclick);
    node({tag: 'img', src: imagesrc, append: link, width: size, height: size});
    return link;
}

function promptRename(url,data) {
    var input = prompt('Please enter desired text:',data.innerHTML);
    if (input) {
        data.innerHTML = input;
        var bmarklist = getState(server+'_QuickMarks','').split('###');
        console.log(bmarklist);
        for (var i = 0; i < bmarklist.length; i++) {
            var bmark = bmarklist[i].split('##');
            if (url == bmark[0]) {
                bmark[2] = input;
            }
            bmarklist[i] = bmark.join('##');
        }
        setState(server+'_QuickMarks',bmarklist.join('###'));
    }
}

function addMark(url) {
    console.log("Add: "+url);
    // JUST to make sure it's a real location. Probably not needed.
    if (!String(url).match(/[A-Z0-9:]+$/)) {
        return;
    }
//  console.log("Add2: "+url.innerHTML);
//  console.log("Add3: "+url.parentNode.innerHTML);
//  console.log("Add4: "+url.parentNode.parentNode.innerHTML);
//  console.log("Add5: "+url.parentNode.parentNode.parentNode.innerHTML);

    if ((String(url).match(/loc=/)) || (String(url).match(/astro=/))) {
        var display = String(url).match(/[A-Z0-9:]+$/);
        // Try and deduce data
        var tempregexp = url.innerHTML+'.+(\\s+\\d+\\s*\\/\\s*\\d+\\s+\\d+\\s*\\/\\s*\\d+)';
        var data =  url.innerHTML.match(/(.*?) \([A-Z0-9:]+\)$/) ||             // fleets, viewing base page
                url.parentNode.parentNode.innerHTML.match(/<td><a href=.+?>(.+?)</) ||  // bases page, economy page
                url.parentNode.innerHTML.match(tempregexp) ||  // trade page, add "123/123 1/2" econ/open trades
                "notfound";
//      console.log("Data: "+data);
    } else if (String(url).match(/base=/)) {
        var display = url.innerHTML;
        // Try and deduce base owner
        var data =  url.parentNode.parentNode.innerHTML.match(/player=\d+\">(\[.*?\] .*?)</) || // location page
                url.parentNode.parentNode.innerHTML.match(/loc=.+?>(.+?)</) ||          // bases page, economy page
                "notfound";
//      console.log("Data: "+data);
    }
    if (data && data[1] && (data[1] != 'o')) {
        data = data[1];
    } else {
        data = "[Add Note]";
    }

    // convert the 'bookmark' button into a normal LOC
    if (String(url).match(/astro=/)) {
        console.log("BEFORE:"+url);
        url = String(url).replace(/bookmarks\.aspx\?action=add&astro=/,"map.aspx?loc=");
        console.log("AFTER:"+url);
    }

    var bmarklist = getState(server+'_QuickMarks','').split('###');

    var dup = 0;
    for (var i = 0; i < bmarklist.length; i++) {
        var bmark = bmarklist[i].split('##');
        if (url == bmark[0]) {
            dup = 1;
        }
    }
    if (dup == 0) {
        var add = [url,display,data];
        console.log("AddData: URL: "+url+" Display: "+display+" Data: "+data);
        bmarklist.push(add.join('##'));
        setState(server+'_QuickMarks',bmarklist.join('###'));
        displayQuickMarks();
    } else {
        var h = document.getElementsByName('markurl');
        for(i=0; i<h.length; i++){
            if (h[i].innerHTML == display) {
                h[i].style.color = 'Red'
            }
        }
        // Javascript fucking sucks. This is retarded.
        window.setTimeout(function() {
                var h = document.getElementsByName('markurl');
                    for(i=0; i<h.length; i++){
                        h[i].style.color = '';
                    }
            },500);
    }
}

function delMark(url) {
    console.log("Delete: "+url);
    var bmarklist = getState(server+'_QuickMarks','').split('###');
    for (var i = 0; i < bmarklist.length; i++) {
        var bmark = bmarklist[i].split('##');
        if (url == bmark[0]) {
            bmarklist.splice(i,1);
        }
    }
    setState(server+'_QuickMarks',bmarklist.join('###'));
    displayQuickMarks();
}

function listMarks() {
//  console.log("Listing Marks");
    var bmarklist = getState(server+'_QuickMarks','').split('###');
    var returnlist = new Array();
    for (var i = 0; i < bmarklist.length; i++) {
        var bmark = bmarklist[i].split('##');
        returnlist.push(bmark);
    }
    return returnlist;
}

function addMarkLocations() {
    // skip the map window. Images inserted onto map are ugly and useless.
    if ((document.location.href.match(/map\.aspx$/)) || (document.location.href.match(/loc=[A-Z]\d{2}:\d{2}?:?\d{2}?$/))) {
        return 0
    }
    allLinks = document.evaluate("//a",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (i=0; i<allLinks.snapshotLength; i++) {
        if (allLinks.snapshotItem(i).textContent == "Bookmark") {
            var l = createImageLink(0,'http://graphics2.astroempires.com/skins/darkAstros/images/stars/Red Giant.jpg','15px');
            allLinks.snapshotItem(i).parentNode.insertBefore(l, allLinks.snapshotItem(i));
            EventManager.Add(l,'click',(function(mark){return function(){addMark(mark)}})(allLinks.snapshotItem(i)));
        } else if (allLinks.snapshotItem(i).textContent.match(/\w\d{2}:\d{2}:\d{2}:\d{2}/)) {
            var l = createImageLink(0,'http://graphics2.astroempires.com/skins/darkAstros/images/stars/Red Giant.jpg','10px');
            allLinks.snapshotItem(i).parentNode.insertBefore(l, allLinks.snapshotItem(i).nextSibling);
            EventManager.Add(l,'click',(function(mark){return function(){addMark(mark)}})(allLinks.snapshotItem(i)));
        }
    }
}
if (getFlag("disableDrakeProofing")){
drakeProof();
}


init();

function addCommanderValue(CommanderArray, fieldHTML, totalArray){
	CommanderLevel = CommanderArray[1];
	fieldValue = parseNum(fieldHTML.innerHTML.split("(")[0]);
	commanderEffValue = fieldValue / ((100-CommanderLevel)/100);
	fieldHTML.innerHTML = fieldHTML.innerHTML + "<font color='green'> {"+commaFormat(Math.round(commanderEffValue))+"}";
	fieldHTML.setAttribute("sorttable_customkey", Math.round(commanderEffValue));
	totalArray[CommanderArray[0]] = totalArray[CommanderArray[0]] + Math.round(commanderEffValue);
}

//Empire Capacity Function
function calculateEmpireCapacities(){
var baserows = document.evaluate( "//table[@class='layout listing sorttable']//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

var Totals = [];
Totals['Production'] = 0;
Totals['Construction'] = 0;

i=0;
var baseRow = baserows.snapshotItem(i);

//Helper function
function addNormalProduction(){
	Totals['Production'] = Totals['Production'] + Math.round(baseRow.childNodes[5].innerHTML.split("(")[0]);
}
//Helper function
function addNormalConstruction(){
	Totals['Construction'] = Totals['Construction'] + Math.round(baseRow.childNodes[4].innerHTML.split("(")[0]);

}


while(baseRow){	
	if(baseRow.innerHTML.indexOf("map.aspx?loc=") != -1){

		commanderHTML = baseRow.childNodes[7].innerHTML;
		CommanderArray = [];
		if(commanderHTML.indexOf("<small>") != -1){


			commanderHTML  = commanderHTML .split("<small>")[1].split("<\/small>")[0];
			CommanderArray = commanderHTML .split(" ");
		} else {
			CommanderArray = null;
		}
		if(CommanderArray){
			if(CommanderArray[0] == "Production"){
				fieldHTML = baseRow.childNodes[5];

				addNormalConstruction();
				addCommanderValue(CommanderArray, fieldHTML, Totals)
			} else if(CommanderArray[0] == "Construction"){
				fieldHTML = baseRow.childNodes[4];
				addNormalProduction();
				addCommanderValue(CommanderArray, fieldHTML, Totals)
			} else { //Research or other commander;
				addNormalProduction();
				addNormalConstruction();
			}
		} else { // No Commander
			addNormalProduction();
			addNormalConstruction();
		}
	}
	i++;
	baseRow = baserows.snapshotItem(i);
}
var sumHTMLCon = document.evaluate("td[4]", baserows.snapshotItem(baserows.snapshotLength-1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
var sumHTMLProd = document.evaluate("td[5]", baserows.snapshotItem(baserows.snapshotLength-1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
sumHTMLProd.innerHTML = sumHTMLProd .innerHTML +"<font color='green'>{"+Math.round(Totals['Production'])+"}";
sumHTMLCon.innerHTML = sumHTMLCon.innerHTML +"<font color='green'>{"+Math.round(Totals['Construction'])+"}";
}

//Base commander function
function calculateBaseCommanderEffect(){
	var commanderHTML = document.evaluate( "//table[@class='base']//tr[2]//td[@align='center']//small", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(commanderHTML.snapshotLength == 0)
		commanderHTML = document.evaluate( "//td[@class='astro-details_box-status-center box-status-center']//small", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(commanderHTML.snapshotLength == 0)
		return;
	commanderHTML = commanderHTML.snapshotItem(0).innerHTML;
	commanderHTML  = commanderHTML.split("(")[1].split(")")[0];
	CommanderArray = commanderHTML.split(" ");
	

	//Construction, Production and Research Commander
	capacityHTML = document.evaluate("//table[@class='layout listing3']//tr[@align='center']//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0; i < capacityHTML .snapshotLength-1; i++){
		rowHTML = capacityHTML.snapshotItem(i).innerHTML;
		if(rowHTML == CommanderArray[0])
		{
			fieldHTML = capacityHTML.snapshotItem(i+1);
			addCommanderValue(CommanderArray, fieldHTML, [])
			break;
		}
	}

//Logistic Commander
	buildings = document.evaluate("//table[@id='base_resume-structures']//table[@class='layout']//tr[@align='center']//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	type = buildings.snapshotItem(2).innerHTML;
	level = buildings.snapshotItem(3);
	if(type.indexOf("Jump Gate")!=-1 && CommanderArray[0]=="Logistics"){
		types = type.split("<br>")
		levels = level.innerHTML.split("<br>")
		i = 0;
		while(types[i]!="Jump Gate" && i < types.length)
		i++;
		jglevel = parseInt(levels[i]);
		clevel = parseInt(CommanderArray[1]);
		ed = (1/(jglevel+1)*(100-clevel)/100)
		jg = (1/ed)-1
		jg = Math.round(jg*100)/100

		levels[i] = levels[i]+"<font color='green'> {"+jg+"}</font>";
		s = ""
		y=0
		while(levels[y] != "" && y < levels.length)
			{
   		 	s+= levels[y]+"<br>"
   		 	y++;
			}
		level.innerHTML = s;
	}

	


}
// shamelessly ripped C2isCool

function main() {
    BRs = document.evaluate("//div[@class='battle-report']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < BRs.snapshotLength; i++) {
        if (window.location.href.match("messages.aspx?")) {
            var target = BRs.snapshotItem(i).parentNode.parentNode.parentNode.previousSibling.lastChild.previousSibling
            target.appendChild(document.createTextNode(" - "));
            target.appendChild(document.createElement('br'));
        } else if (window.location.href.match("combat.aspx?")) {
            var target = document.createElement('center');
            if (GM_getValue('scout', true)) {
                BRs.snapshotItem(i).parentNode.parentNode.insertBefore(target, BRs.snapshotItem(i).parentNode.previousSibling);
            }
        }
else if (window.location.href.match("board.aspx?")) {

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
        row.lastChild.appendChild(document.createElement('input'));
        row.lastChild.firstChild.setAttribute('type', 'button');
        row.lastChild.firstChild.setAttribute('class', "input-button");
        row.lastChild.firstChild.value = 'Save';
        row.lastChild.firstChild.addEventListener('click', save, true);

        mask.checked = GM_getValue('mask', false);
        public.checked = GM_getValue('public', true);
        scout.checked = GM_getValue('scout', true);
       
    } else {
        save();
    }
}

function save() {
    GM_setValue('mask', document.getElementById('mask').checked);
    GM_setValue('public', document.getElementById('public').checked);
    GM_setValue('scout', document.getElementById('scout').checked);
    
    var public = 0 + GM_getValue('public', true);
    var mask = 0 + GM_getValue('mask', false);
    
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu').nextSibling);
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu'));
}

function pasteBR() {

    br = BRs.snapshotItem(this.name).innerHTML;
    br = br.replace(/<\/tr>|<\/table>/g, "\r").replace(/<\/td>|<\/th>|<\/b>/g, "\t").replace(/<small>/g, "\r").
        replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;&nbsp;\r|/g, "").replace("\r(", "(").replace(")N", ")\rN");
        
        var temp = "report="+ br
        if (GM_getValue('public', true)) { temp += "&ispublic=1"; }
        if ((GM_getValue('mask', false)) && (!window.location.href.match("combat.aspx?"))) { temp += "&masktech=1"; }
      
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://battlepaste.nullnetwork.net/dopaste.php',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-type': 'application/x-www-form-urlencoded;',
            },
            data: temp,
            onload: function (response) {
                window.open(response.finalUrl);
            }
        });
}

function notify(m,c){
    if($('Message'))
    {
        document.body.removeChild($('Message'));
    }

    var b=document.createElement('div');
    b.id='Message';
    b.className=c||'';
    b.style.cssText='position:absolute;white-space:nowrap;z-index:10;';
    if(b.className.length==0){
        b.className = "notifier";
    }
//  insert block in to body
    b=document.body.insertBefore(b,document.body.firstChild);
//  write HTML fragment to it
    b.innerHTML=m;
//  save width/height before hiding
    var bw=b.offsetWidth;
    var bh=b.offsetHeight;
//  hide, move and then show
    b.style.display='none';

    b.style.top = document.body.clientHeight/2 + document.body.scrollTop - bh/2;
    b.style.left = document.body.clientWidth/2 + document.body.scrollLeft - bw/2;

    b.style.display='block';
}
   
function fleetListTools(){
// Adapted from Astro Empire Tools

 var guildSet = ["Home","Allied","Friendly","Other","Unguilded","Hostile","Enemy"]
 var players = [];
 var tableID = "";
 var isAttack = false;

	if(document.getElementById('fleets_attack-list')) {
        if (document.getElementById('fleets_attack-list').innerHTML.indexOf("There are no targets at this location")!=-1) return;
		tableID = 'fleets_attack-list';
		var isAttack = true;
		var fleetTable=document.getElementById(tableID).firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
	}
	else 
	if (document.getElementById('base_fleets')) {
	    tableID = 'base_fleets';
		fleetTable = document.getElementById('base_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].rows;
		}
	else
	if (document.getElementById('map_fleets')) {
			tableID = 'map_fleets';
			fleetTable = document.getElementById(tableID).firstChild.childNodes[1].firstChild.firstChild.childNodes[1].rows;
		}
	else
	if (document.getElementById('empire_scanners')) {
			tableID = 'empire_scanners';
			var fleetTable = xpath1("//table[@class='layout listing sorttable']").rows;
//			fleetTable = document.getElementById(tableID).firstChild.childNodes[1].firstChild.firstChild.childNodes[1].rows;
		}
	else
		return;

 if ((!fleetTable) || (fleetTable.length<2)) return;
 
 function inGuild(stance, guild){
  switch (stance) {
	 case "Home" : 
	     return (getSetting("homeTag")==guild);
     case "Allied" : 
		 return isAlliedGuild(guild);
     case "Friendly" : 
		 return isFriendlyGuild(guild);
     case "Hostile" : 
		 return isHostileGuild(guild);
     case "Enemy" : 
		 return isEnemyGuild(guild);
     case "Unguilded" :
		 return (guild == "unguilded");
     case "Other" : 
		 return !(isAlliedGuild(guild) || isFriendlyGuild(guild) || isEnemyGuild(guild)  || isHostileGuild(guild) || (guild == "unguilded") || (getSetting("homeTag")==guild));
 	}
  }

 function addPlayer(html){
	var player = html.match(/aspx\?player=(\d*)\".*>(.*?)<\/a>/);
	if (!player) return;
	
	var guild=/^(\[[^\]]+\])/.exec(player[2]);
	
	if(!guild)
			guild = "unguilded";
	else guild=guild[1];

    for (var i in players)
	   if (players[i].id == player[1]) 
			return { "id" : player[1], "name" : player[2], "guild" : guild};

	players.push({ "id" : player[1], "name" : player[2], "guild" : guild} );

 	players.sort(function (a,b) { 
			var x = a.name;
			var y = b.name;
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			}
		);
		
	return { "id" : player[1], "name" : player[2], "guild" : guild} 	
 } 
  
 function hideFleets(){
//	if (fleetTable.length<2) return;
	var hiddenFleets = 0;
	var hideGuildFleets = [0,0,0,0,0,0,0];

	for(var i=isAttack?1:0;i<fleetTable.length;i++){
		if(fleetTable[i].childNodes[1]==undefined /* || fleetTable[i].childNodes[1].firstChild.href==undefined */) continue;

		var player = addPlayer(fleetTable[i].childNodes[1].innerHTML);	
		if (!player) continue;
		
		if (player.id == getMyPlayerID()){
			if (getFlag("ownFleetOnTop")){
				var fleet = fleetTable[i].cells[0].innerHTML.match(/href=\"fleet.aspx\?fleet=(\d*)\"/)[0];
				if (!fleetTable[i].innerHTML.match(/id=\"tim/)) {
					fleetTable[i].cells[2].innerHTML = 
						"<a href='"+fleetTable[i].cells[0].firstChild.href 
						+ "&view=move'>Move</a> - <a href='"+fleetTable[i].cells[0].firstChild.href+"&view=attack'>Attack</a>";
					var tempRow = fleetTable[i].innerHTML
					fleetTable[0].display = 'table-row';			
					for (var j=i; j>0; j--){
						fleetTable[j].innerHTML = fleetTable[j-1].innerHTML;
						fleetTable[j].style.display = fleetTable[j-1].style.display;
					}	
					fleetTable[0].innerHTML = tempRow;
					fleetTable[0].style.display = 'table-row';
				}
			}
			continue;
		}

		var display = 'table-row';
		if (getSetting('cg_lockedFleets',"") != "") {
		   if (getSetting('cg_lockedFleets',"") != player.id) display='none';		   
		   }
		else
		for (var j= isAttack?1:0; j<guildSet.length; j++){
			if (getSetting('cg_hide'+guildSet[j],false) && inGuild(guildSet[j],player.guild)){ 	
				display='none';
				hideGuildFleets[j]++;
			}
		}
		fleetTable[i].style.display=display;	
	
		hiddenFleets += (fleetTable[i].style.display=='none')? 1: 0;
	}
	document.getElementById("hidenFleets").innerHTML = "<b><font color="+((hiddenFleets==0)?"white":"red")+"> ("+hiddenFleets + "/" 
		+ (fleetTable.length-(isAttack?1:0))+")</font> : </b>"; 

	for (var j= isAttack?1:0; j<guildSet.length; j++){
		document.getElementById("hiden"+guildSet[j]).setAttribute("style","color:"+(getSetting('cg_hide'+guildSet[j],false)?"red":"white"));
		document.getElementById("count"+guildSet[j]).innerHTML =  "&nbsp;("+hideGuildFleets[j] +")&nbsp;" ;	
		document.getElementById("count"+guildSet[j]).setAttribute("style","color:"+(getSetting('cg_hide'+guildSet[j],false)?"red":"white"));	
	}
  }

 function hideCheckbox(stance){
   var tag = (stance == "Home")?getSetting("homeTag"):stance;
   return  	"<span id= hiden"+stance+">"
	 + "<input type='checkbox' id='setHide"+ stance +"'"+((getSetting('cg_hide'+stance,true))?" checked":"") + ">"
	 + tag + "<span id='count" + stance + "'></span>"
	 +"</span>"
 }

 var html = (tableID == 'empire_scanners')?"<br/>":"&nbsp;-&nbsp;";
 html += "<span style='font-size:12px;font-weight:500;'><b>Hide </b> "
	 + "<span id='hidenFleets'></span>";
 
 for (var i= isAttack?1:0; i<guildSet.length; i++){
	 html += hideCheckbox(guildSet[i]);
 }
 html += "</span> <br/><br/>";

 document.getElementById(tableID).firstChild.firstChild.firstChild.innerHTML += html;

 hideFleets();

 html = "<span id= showLocked> Locked fleet : ";

 html += "<select id='lockedFleets' '>";
 html += "<option value=''>none</option>";
 for (var i = 0; i < players.length; i++) {
    if (players[i]) {
      html += "<option value='"+players[i].id+"'>"+players[i].name+"</option>";
    }
  }
 html += "</select>";
 html += "</span><br/><br/>";
 
 document.getElementById(tableID).firstChild.firstChild.firstChild.innerHTML += html;
 
 document.getElementById('lockedFleets').value = getSetting('cg_lockedFleets',"");
 if ((getSetting('cg_lockedFleets',"")!="") && (document.getElementById('lockedFleets').value=="")){
     setSetting('cg_lockedFleets',"");
	 hideFleets();
 }
 
 if (!isAttack) document.getElementById('setHideHome').addEventListener('change',function(){setSetting('cg_hideHome',this.checked);hideFleets();},false);
 document.getElementById('setHideAllied').addEventListener('change',function(){setSetting('cg_hideAllied',this.checked);hideFleets();},false);
 document.getElementById('setHideFriendly').addEventListener('change',function(){setSetting('cg_hideFriendly',this.checked);hideFleets();},false);
 document.getElementById('setHideEnemy').addEventListener('change',function(){setSetting('cg_hideEnemy',this.checked);hideFleets();},false);
 document.getElementById('setHideHostile').addEventListener('change',function(){setSetting('cg_hideHostile',this.checked);hideFleets();},false);
 document.getElementById('setHideOther').addEventListener('change',function(){setSetting('cg_hideOther',this.checked);hideFleets();},false);
 document.getElementById('setHideUnguilded').addEventListener('change',function(){setSetting('cg_hideUnguilded',this.checked);hideFleets();},false);
 
 document.getElementById('lockedFleets').addEventListener('change',function(){setSetting('cg_lockedFleets',document.getElementById('lockedFleets').value); hideFleets();},"");
 }

 function checkTimers(){
 
 }
 
/**** Show / Hide Links ****/
var wlh =  currentpage;
if(currentpage.indexOf('empire.aspx?view=')!=-1){
 hideEmpireFirstTable('economy_bases');
 hideEmpireFirstTable('trade_bases');
 hideEmpireFirstTable('technologies');
}

if(currentpage.indexOf('guild.aspx')!=-1){
 hideGuildInternals();
}

function hideEmpireFirstTable(stance){
// Adapted from Astro Empire Tools
	if(!getSetting('config_toggleEmpire'+stance,true) || !document.getElementById('empire_'+stance)) return;
		document.getElementById('empire_'+stance).firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
		document.getElementById('empire_'+stance).firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleEmpire'+ stance +'">'+((getSetting('hide_empire'+stance,false))?'Show':'Hide')+'</a>';
		document.getElementById('empire_'+stance).firstChild.lastChild.style.display=(document.getElementById('toggleEmpire'+stance).innerHTML=='Hide')?'table-row':'none';
		document.getElementById('toggleEmpire'+stance).addEventListener('click',function(){
   document.getElementById('toggleEmpire'+stance).innerHTML=(document.getElementById('toggleEmpire'+stance).innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('empire_'+stance).firstChild.lastChild.style.display=(document.getElementById('toggleEmpire'+stance).innerHTML=='Hide')?'table-row':'none';
   setSetting('hide_empire'+stance,(document.getElementById('toggleEmpire'+stance).innerHTML=='Hide')?false:true);
 },true);
}
 
function hideGuildInternals(){
	if( !document.getElementById('guild-internal_container')) return;
        guildInfo = document.getElementById('profile_show').firstChild.firstChild.firstChild.firstChild.rows[2].cells[0].innerHTML +=
			'<div align="center"><small><br><b><a href="javascript:void(1)" id="hideGuildInternals">'+((getSetting('hide_GuildInternals',false))?'Show Internal':'Hide Internal')+'</a></b></small></div>';
 	
		document.getElementById('guild-internal_container').style.display=(document.getElementById('hideGuildInternals').innerHTML=='Hide Internal')?'':'none';
		
		document.getElementById('hideGuildInternals').addEventListener('click',
			function(){
				document.getElementById('hideGuildInternals').innerHTML=(document.getElementById('hideGuildInternals').innerHTML=='Hide Internal')?'Show Internal':'Hide Internal';
				document.getElementById('guild-internal_container').style.display=(document.getElementById('hideGuildInternals').innerHTML=='Hide Internal')?'':'none';
				setSetting('hide_GuildInternals',(document.getElementById('hideGuildInternals').innerHTML=='Hide Internal')?false:true);
			},true);
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
      window.setTimeout(timeout, 2000);
    }

    return listener;
  }
  
function getTechGuildmembers()
{
  var playerTech = [];
  var pendingSearches = 0;
  var playerID = "";
  
  function genomeTechLoaded(div)
  {
    genometech = "";
    var t = div.getElementsByTagName("table");
	if (t.item(0).rows[8].innerHTML.match(/.profile\.aspx\?player=(\d+)..*?>(.*?)<\/a>/i))
	   var id = RegExp.$1;
	   
    if (t.item(1)) {
    	var techrows = t.item(1).rows;
		for (var i = 1; i < techrows.length; i++){
            if(techrows[i].innerHTML.match(/<td>(.*?)<\/td><td>(\d+)<\/td>/)) {
				var techstr = RegExp.$1;	        	
				var techlvl = RegExp.$2;	
			}   
			if (techstr)
				for (var tech in techName) {
					if (techstr.substring(0,4)==techName[tech].substring(0,4)) 
						genometech += " "+tech+techlvl ;
				}
		}
	}
	playerTech.push({"id" : id, "tech" : genometech});
    if (--pendingSearches == 0) {
   	    techLoaded(playerTech);
    }
  }
 
  var guild = document.getElementById('guild_members').rows[1].cells[0].firstChild;
  if (!guild) return;
//  var guild = t.item(2);
  for (var i=1; i<guild.rows.length; i++) {
      playerID = guild.rows[i].cells[0].textContent;
      var url = "http://genome.aeonanon.com/meta/view/player/extras/"+playerID;
	  pendingSearches++;
      getPage(url,genomeTechLoaded);   		 
  }

  function techLoaded(tech)
  {
   var tCell = document.createElement("th");
   tCell.appendChild(document.createTextNode("Technology"));
   tCell.width = 'auto';
   guild.rows[0].cells[4].parentNode.insertBefore(tCell, guild.rows[0].cells[3].nextSibling);
   
   for (var j=1; j<guild.rows.length; j++){
      for (var i=0; i<tech.length; i++) 
        if (tech[i].id== guild.rows[j].cells[0].textContent)
	       var techStr = tech[i].tech;

	  var tCell = document.createElement("td");
      tCell.appendChild(document.createTextNode(techStr));
      guild.rows[j].cells[4].parentNode.insertBefore(tCell, guild.rows[j].cells[3].nextSibling);
   }
  }  
 }
 
function hidebaseDetails(){
	var t = xpath1("//table[@class='base']");
	if (!t) t = xpath1("//table[@class='astro']")
	if(!t) return;
	
	var status = document.getElementById('hideDetails');
	if (!status) return;
	
    status.innerHTML = '<div align="center"><small><br><b><a href="javascript:void(1)" id="hideBaseDetails">'+((getSetting('hide_baseDetails',false))?'Show base details':'Hide base details')+'</a></b></small></div>';	
 	
	t.style.display=(status.innerHTML.match('Hide'))?'':'none';
	
	
	if (document.getElementById('base_events')) 
		document.getElementById('base_events').style.display=(status.innerHTML.match('Hide'))?'':'none';
	if (document.getElementById('base_resume-structures')) 
		document.getElementById('base_resume-structures').style.display=(status.innerHTML.match('Hide'))?'':'none';
		
	status.addEventListener('click',
		function(){
			status.innerHTML = status.innerHTML.replace((status.innerHTML.match('Hide')?'Hide':'Show'),(status.innerHTML.match('Hide')?'Show':'Hide'));
				t.style.display=(status.innerHTML.match('Hide'))?'':'none';
				if (document.getElementById('base_events')) 
					document.getElementById('base_events').style.display=(status.innerHTML.match('Hide'))?'':'none';
				if (document.getElementById('base_resume-structures')) 
					document.getElementById('base_resume-structures').style.display=(status.innerHTML.match('Hide'))?'':'none';
				setSetting('hide_baseDetails',(status.innerHTML.match('Hide'))?false:true);
			},true);
}
 
function addMapOverlaysNew()
{
   var sep = String.fromCharCode(95);
   var list = document.getElementById('map2_Cell-4').firstChild.firstChild;
   var fields = list.innerHTML.split(";")
   var mapPlayer = [];
   for (i in fields)
        if (fields[i].match(/mapPlayer\[\d*\]=(.*)/)) 
		   mapPlayer.push(RegExp.$1)
  
	
	fields[mapPlayer.length] = '0'+sep+'base344812'+sep+'D       '+sep+'A73:44:15:11'+sep+'white'+sep+'base.aspx?base=344812'+sep+'';
			
//	var objGFX = document.getElementById('map2_ObjGFX0');
			
	document.getElementById('map2_Cell-4').firstChild.firstChild.innerHTML = fields.join(";");

	unsafeWindow.setMapSize();
	unsafeWindow.set_favourites();
	unsafeWindow.load_map_galaxy('galaxies_xml/Alpha-75.xml');
//	window.onunload = function()
}
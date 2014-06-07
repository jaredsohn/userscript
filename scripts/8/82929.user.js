// ==UserScript==
// @name           Pardus Quick Commands
// @namespace      pardus.at
// @author         Jarius (Orion), Janarius (Artemis)
// @version        2.1
// @description    Links for frequently used commands are added to the Nav screen for single-click access.
// @include        http://*.pardus.at/main.php*
// @include        http://*.pardus.at/overview_buildings.php*
// @include        http://*.pardus.at/msgframe.php*
// @include        http://*.pardus.at/overview_stats.php*
// @include        http://*.pardus.at/sendmsg.php*
// @include        http://*.pardus.at/building_management.php*
// @include        http://*.pardus.at/building_trade_settings.php*
// @include        http://pardus.butterfat.net/*
// @include        http://*.pardus.at/logout.php*
// @include        http://*.pardus.at/building_upgrade.php*
// @include        http://*.pardus.at/overview_ship.php*
//
// ==/UserScript==

// ==Notes==
// Created by Jarius (Orion)/Janarius (Artemis)
//
// To deliver packages/explosives/VIPs to a planet or starbase, you must
//   click the "Land on/Deliver to planet/starbase" link.  If you click 
//   one of the shortcut links, e.g. "Bulletin Board", the delivery will not
//   occur.
//
// You are able to make changes to your own copy of the script once it is
//   installed.  <b>Please store a backup copy of your user options section
//   before you reinstall the script.</b> I encourage you to send code changes
//   and ideas for enhancements to me so I can update the master copy.  This way
//   everyone has access to helpful changes.  It also makes it easier for me to
//   give help if everyone sticks to the master copy.
//
// I will only incorporate changes that easily apply to everyone.  Also, in
//   order to avoid clutter, I would like to limit updates to those with 
//   broadest appeal, i.e. the most frequently used commands that make highly 
//   repetitive tasks easy.

// ==Thanks==
// Bladefist, Rhindon, Lava Golem, Smartypants, Prdonja, Xiwi, Fuji,
//   Boris Brusilov, Pink Flamingo, Aiden, Ovopax, Vision, Badamster,
//   Kill er Joe, Influence D, Ratchetfreak

// ==Version History==
// 2.1 Replaces Butterfat Map with Arkoan's Super Awesome Map 
//
// 2.0 compatibility with new partial reload
//
// 1.26 Updated on 12/8/09
// --overall compatibility fixes
//
// 1.25 Updated on 8/26/08
// --fixed issue when no ship cookie exists
//
// 1.24 Updated on 8/19/08
// --added ship name, type, and image to the Ship panel  (uses cookies, thanks Rhindon)
// --changed default custom link to avoid problems with alliances
//
// 1.23 Updated on 6/11/08
// --added Transfer Credits link for starbase owners (disabled in user options by default)
// --added Pardus Building Tool link to Building Upgrade screen
// --added Building Maxes Calc link to Building Upgrade screen
//
// 1.22 Updated on 3/26/08
// --added time to full APs on Ship Docked (logout) screen
// --fixed issue when Nav Scanner view is limited due to high energy fields
//
// 1.21 Updated on 3/17/08
// --added Pardus Building Tool link to Building Trade Settings screen
// --added Building Maxes Calc link to Building Trade Settings screen
// --another fix for Butterfat map link redirection issues
// --added universe link to Butterfat sector map
//
// 1.20 Updated on 3/14/08
// --fixed Butterfat sector map link redirection issue
// --changed default map provider back to pardus.butterfat.net for more current
//   maps
//
// 1.19 Updated on 3/12/08
// --updated Pardus Building Tool links to show sites in iframes
// --updated Building Maxes Calc links to show sites in iframes
//
// 1.18 Updated on 3/12/08
// --added Pardus Building Tool link to Building Overview screen
// --added Building Maxes Calc link to Building Overview screen
// --added option to choose between Blue Sun or Butterfat maps
//
// 1.17 Updated on 3/11/08
// --added Pardus Building Tool link to Building Management screen
// --added Building Maxes Calc link to Building Management screen
// --changed map provider to thebluesuncorporation.com due to problems with
//   linking to pardus.butterfat.net
// --fixed Send Message screen issue caused by 1.15 update
//
// 1.16 Updated on 3/10/08
// --fixed map link in Status panel, click on coordinates to get sector map
//   from pardus.butterfat.net with relatively current building locations
//
// 1.15 Updated on 3/7/08
// --added map link in Status panel, click on coordinates to get sector map
//   from pardus.butterfat.net with relatively current building locations
// --added 'Ship Overview' link to the Ship panel
// --general code cleanup
//
// 1.14 Updated on 2/11/08
// --updated news links in Other Ships panel and Send Message screen
//
// 1.13 Updated on 2/8/08
// --added alliance news link to Other Ships panel and Send Message screen
// --updated player 'News' link
//
// 1.12 Updated on 1/29/08
// --fixed 'Msg' link on Other Ships panel
// --added player 'News' link to Other Ships panel and Send Message screen
//
// 1.11 Updated on 1/18/08
// --display gender, race, and alliance under the player picture on the
//   Send Message screen (Prdonja)
// --display percentages next to progress bars on Stats Overview screen
//   (Prdonja)
// --have separate bookmarks for each universe
//
// 1.10 Updated on 12/28/07
// --added custom links to the Message frame for in-game bookmarks
//
// 1.9 Updated on 12/19/07
// --fixed issue with Starbase link
//
// 1.8 Updated on 12/18/07
// --fixed issue with 'Edit Profile' link
//
// 1.7 Updated on 12/13/07
// --fixed issue with 'Msg' link
// --fixed issue with refilling tank
// --added 'Shipyard' link to the Commands panel
// --added 'Black Market' link to the Commands panel
// --added 'Bounty Board' link to the Commands panel
//
// 1.6 Updated on 12/7/07
// --fixed issue with 'Standard Command on the Nav screen' premium account setting
//
// 1.5 Updated on 12/3/07
// **IFrames usage is banned by the admins, see changes below:
// --updated Building Overview section to remove IFrame, no functionality lost
// --updated Message frame section to remove IFrame, no functionality lost
// --removed Ship Panel section, lost ship name/overview link, ship type, and
//   ship image
//
// 1.4 Updated on 11/14/07
// --fixed 'Msg' link on bountied players
// --iframes created by script are made invisible
// --added 'Building management' link to the Buildings Overview screen; it
//   appears when you are on a building that you own
// --added 'Edit Profile' link to the Message frame
// --added player name to the Message frame
// --added map link to the location name in the Status panel
//
// 1.3 Updated on 10/30/07
// --changed 'Land on planet/starbase' link to 'Land/Deliver to
//   planet/starbase'
// --added options section to code for easy toggling of each new link, see
//   below
// --added 'Hack information' link when on a building
// --added 'Recharge shield' link when on an Energy Well
// --added 'Msg', 'Trade', and 'Attack' links to the Other Ships panel
//
// 1.2 Updated on 10/24/07
// --added ship name, type, and image to the Ship panel
// --'Ship Overview' link shows as the ship name
//
// 1.1 Updated on 10/24/07
// --fixed issue of links appearing in space chart fields for Premium
//   account users
// --added 'Hack faction database' link when on a planet/starbase
//
// 1.0 Created on 10/21/07
// --added 'Stats', 'Jobs', and 'Buildings' links to the Status panel
// --added 'Ship Equipment', 'Trade with planet/starbase/building', and
//   'Bulletin Board' links to the Commands panel
// --added 'Building trade settings' link to the Commands panel
// --added 'Ship Overview' link to the Ship panel


// --User Options---------------------------------------------------
// Use this section to turn on/off links created by the script.
// Easy customization!  Just change from 'true' to 'false' to turn
//   something off.

var enableMap = true;
var enableButterfatSectorMap = true;  var enableBlueSunSectorMap = false;  //use one or the other, not both
var mapper = true;
var enableStats = true;
var enableJobs = true;
var enableBuildings = true;
var enableShipOverview = true;
var enableShipName = true;
var enableShipType = true;
var enableShipImage = true;
var enableDeliverToPlanetOrStarbase = true;
var enableShipEquipment = true;
var enableTradeWithPlanetOrStarbase = true;
var enableBulletinBoard = true;
var enableBountyBoard = true;
var enableShipYard = true;
var enableTradeWithBlackMarket = true;
var enableHackFactionDatabase = true;
var enableHackInformation = true;
var enableRechargeShield = true;
var enableTradeWithBuilding = true;
var enableBuildingTradeSettings = true;
var enablePlayerMsg = true;
var enablePlayerNews = true;
var enableAllianceNews = true;
var enablePlayerInfo = true;
var enablePlayerTrade = true;
var enablePlayerAttack = true;
var enableBuildingManagement = true;
var enableEditProfile = true;
var enableAccountName = true;
var enableBuildingTool = true;
var enableBuildingMaxCalc = true;
var enableAPFullCalc = true;
var enableTransferCredits = true;

// have separate bookmarks for each universe
var artemisCustomLinks = ['http://unique.hobby-site.com/Pardus-Spy/ClusterReport?universe=artemis', 'http://pardus.rukh.de/', 'http://pardus.maxisoft.org/monsterskillfinder.html', 'http://www.alianceforum.anything/'];
var artemisCustomLinkNames = ['Map', 'Tools', 'Skill', 'A-Forum'];

var orionCustomLinks = ['http://unique.hobby-site.com/Pardus-Spy/ClusterReport?universe=orion', 'http://pardus.rukh.de/', 'http://pardus.maxisoft.org/monsterskillfinder.html', 'http://www.alianceforum.anything/'];
var orionCustomLinkNames = ['Map', 'Tools', 'Skill', 'A-Forum'];

var pegasusCustomLinks = ['http://unique.hobby-site.com/Pardus-Spy/ClusterReport?universe=artemis', 'http://pardus.rukh.de/', 'http://pardus.maxisoft.org/monsterskillfinder.html', 'http://www.alianceforum.anything/'];
var pegasusCustomLinkNames = ['Map', 'Tools', 'Skill', 'A-Forum'];




// --end User Options-----------------------------------------------


var menuframe = null;
if(window.parent.frames.length > 0)  menuframe = window.parent.frames[0].document;
var msgframe = null;
if(window.parent.frames.length > 1)  msgframe = window.parent.frames[1].document;
var mainframe = null;
try{if(window.parent.frames.length > 2)  mainframe = window.parent.frames[2].document;
 }catch(e){}


function getUniverseName()
{
  return location.hostname.split('.')[0];
}

function getSectorName()
{
  if(mainframe == null)  return '';

  var span = mainframe.getElementById('sector');
  if(span.getElementsByTagName('a').length>0)span = span.getElementsByTagName('a')[0];
  return span.innerHTML;
}

function getLocId()
{
  if(mainframe == null)  return '';

  var scr = mainframe.getElementsByTagName('script');
  return scr[0].innerHTML.substr(scr[0].innerHTML.lastIndexOf('var')).replace(/var userloc = /gi, '').replace(/;/gi, '').replace(/[/]/gi, '').replace(/-/gi, '').replace(/>/gi, '').replace(/^\s+|\s+$/g, '');
}

function getLocName()
{
  // get current tile, i.e. what building are you on?
  if(mainframe == null)  return '';

  var img = mainframe.getElementsByTagName('img');

  for(var i = 0; i < img.length; i++)
  {
    if(img[i].getAttribute('class') == 'nf' && img[i].hasAttribute('title'))
    {
      if(img[i].parentNode.hasAttribute('onclick'))
      {
	    if(img[i].parentNode.getAttribute('onclick').indexOf(getLocId()) != -1)  return img[i].getAttribute('title').replace(/^\s+|\s+$/g, '');
      }
      else if(img[i].parentNode.getAttribute('href'))
      {
        if(img[i].parentNode.getAttribute('href').search(/planet/i) != -1)  return 'Planet';
        if(img[i].parentNode.getAttribute('href').search(/starbase/i) != -1)  return 'Starbase';
      }
    }
  }

  return '';
}

function getUserId()
{
  if(msgframe == null)  return '';

  var scr = msgframe.getElementsByTagName('script');
  return scr[0].innerHTML.replace('var userid = ', '').replace(';', '').replace(/^\s+|\s+$/g, '');
}

function getUserName()
{
  if(msgframe == null)  return '';

  var img = msgframe.getElementsByTagName('img');
  return img[0].getAttribute('title').replace('Artemis: ', '').replace('Orion: ', '').replace('Pegasus: ', '').replace(/^\s+|\s+$/g, '');
}

// ////////////////////////////////////////////////////////////////////////
// Imported -- Cookie functions obtained from http://www.quirksmode.org/js/cookies.html
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value) {
	// if (days) {
		// var date = new Date();
		// date.setTime(date.getTime()+(days*24*60*60*1000));
		// var expires = "; expires="+date.toGMTString();
	// }
	// else var expires = "";
	// document.cookie = name+"="+value+expires+"; path=/";
	GM_setValue(name,value);
}

function readCookie(name) {
	// var nameEQ = name + "=";
	// var ca = document.cookie.split(';');
	// for(var i=0;i < ca.length;i++) {
		// var c = ca[i];
		// while (c.charAt(0)==' ') c = c.substring(1,c.length);
		// if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	// }
	return GM_getValue(name,null);
}

function eraseCookie(name) {
	//createCookie(name,"",-1);
	GM_deleteValue(name);
}
// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////


// add links to the main screen
if(location.pathname.search(/main.php/i) != -1)
{

	mainframe = document;

	//updateStatus
	function do_updateStatus(){
		if(enableMap){
			var img = document.getElementsByTagName('img');

			for(var i = 0; i < img.length; i++){
				if(img[i].getAttribute('title') == 'Action Points'){
					img[i].parentNode.previousSibling.previousSibling.previousSibling.innerHTML = '<a href="overview_map.php">' + img[i].parentNode.previousSibling.previousSibling.previousSibling.innerHTML + '</a>';
					break;
			  }
			}
		}

		if(enableButterfatSectorMap)
		{
		var span = document.getElementById('status_content').getElementsByTagName('td')[0].firstChild;
		span.innerHTML = '<a href="http://unique.hobby-site.com/Pardus-Spy/SectorReport?universe=' + getUniverseName() + '&sector=' + getSectorName().replace(/\s/g, '') + '" target="_blank">' + span.innerHTML + '</a>';
		}
		else if(enableBlueSunSectorMap)
		{
			var span = document.getElementById('status_content').getElementsByTagName('td')[0].firstChild;
			span.innerHTML = '<a href="http://www.thebluesuncorporation.com/pardusmap/' + getUniverseName() + '/' + getSectorName().replace(/\s/g, '_') + '.html" target="_blank">' + span.innerHTML + '</a>';
		}
		if(mapper){
			var span = document.getElementById('status_content').getElementsByTagName('td')[1].firstChild;
			var uni = getUniverseName();
			uni = uni.substr(0,1).toUpperCase() + uni.substr(1);
			span.innerHTML = '<a href="http://mapper.pardus-alliance.com/' + uni + '/' + getSectorName() + '" target="_blank">' + span.innerHTML + '</a>'
		}
		
		
		for(var i = 0; i < document.getElementById("status_content").getElementsByTagName('a').length; i++)
		{
			var a = document.getElementById("status_content").getElementsByTagName('a')[i]
		
			if((a.getAttribute('href').search(/main.php[?]ccp=1/i) != -1 || a.getAttribute('href').indexOf("clusterprot()") != -1 )&& a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var child = document.createElement("div");
				child.setAttribute("style", "position:relative; top:6px; margin-left: 12px; margin-top: 5px; margin-bottom: 7px;");
				if(enableStats)  child.innerHTML = child.innerHTML + "<a href='overview_stats.php'>Stats</a>";
				if(enableStats && (enableJobs || enableBuildings))  child.innerHTML = child.innerHTML + "&nbsp;&nbsp;|&nbsp;&nbsp;";
				if(enableJobs)  child.innerHTML = child.innerHTML + "<a href='overview_jobs.php'>Jobs</a>";
				if(enableJobs && enableBuildings)  child.innerHTML = child.innerHTML + "&nbsp;&nbsp;|&nbsp;&nbsp;";
				if(enableBuildings)  child.innerHTML = child.innerHTML + "<a href='overview_buildings.php'>Buildings</a>";
				if(enableStats || enableJobs || enableBuildings)  a.parentNode.insertBefore(child,a.nextSibling);
			}
		}
	}
	
	do_updateStatus();
	var local_updateStatus = unsafeWindow.updateStatus;
	if(local_updateStatus){
		unsafeWindow.updateStatus = function(result){
			local_updateStatus(result);
			do_updateStatus();
		}
	}

//updateCmd
	function do_updateCmd(){
		for(var i = 0; i < document.getElementById("commands_content").getElementsByTagName('a').length; i++)
		{
			var a = document.getElementById("commands_content").getElementsByTagName('a')[i]
			
			if(a.getAttribute('href').search(/planet.php/i) != -1 && a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var child = document.createElement("div");
				child.setAttribute("style", "position:relative; top:6px; margin-top: 5px; margin-bottom: 7px;");
				if(enableShipEquipment)  child.innerHTML = child.innerHTML + "<a href='ship_equipment.php'>Ship Equipment</a><br>";
				if(enableTradeWithPlanetOrStarbase)  child.innerHTML = child.innerHTML + "<a href='planet_trade.php'>Trade with planet</a><br>";
				if(enableBulletinBoard)  child.innerHTML = child.innerHTML + "<a href='bulletin_board.php'>Bulletin Board</a><br>";
				if(enableBountyBoard)  child.innerHTML = child.innerHTML + "<a href='bounties.php'>Bounty Board</a><br>";
				if((enableShipEquipment || enableTradeWithPlanetOrStarbase || enableBulletinBoard || enableBountyBoard) && (enableShipYard || enableTradeWithBlackMarket || enableHackFactionDatabase))  child.innerHTML = child.innerHTML + "<br>";
				if(enableShipYard)  child.innerHTML = child.innerHTML + "<a href='shipyard.php'>Shipyard</a><br>";
				if(enableTradeWithBlackMarket)  child.innerHTML = child.innerHTML + "<a href='blackmarket.php'>Black Market</a><br>";
				if(enableHackFactionDatabase)  child.innerHTML = child.innerHTML + "<a href='hack.php'>Hack faction database</a><br>";
				if(enableShipEquipment || enableTradeWithPlanetOrStarbase || enableBulletinBoard || enableBountyBoard || enableShipYard || enableTradeWithBlackMarket || enableHackFactionDatabase)  a.parentNode.insertBefore(child,a.nextSibling);
				if(enableDeliverToPlanetOrStarbase)  a.innerHTML = "<b>Land on/Deliver to planet</b>"; 
			}
			if(a.getAttribute('href').search(/starbase.php/i) != -1 && a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var child = document.createElement("div");
				child.setAttribute("style", "position:relative; top:6px; margin-top: 5px; margin-bottom: 7px;");
				if(enableShipEquipment)  child.innerHTML = child.innerHTML + "<a href='ship_equipment.php'>Ship Equipment</a><br>";
				if(enableTradeWithPlanetOrStarbase)  child.innerHTML = child.innerHTML + "<a href='starbase_trade.php'>Trade with starbase</a><br>";
				if(enableBulletinBoard)  child.innerHTML = child.innerHTML + "<a href='bulletin_board.php'>Bulletin Board</a><br>";
				if(enableBountyBoard)  child.innerHTML = child.innerHTML + "<a href='bounties.php'>Bounty Board</a><br>";
				if((enableShipEquipment || enableTradeWithPlanetOrStarbase || enableBulletinBoard || enableBountyBoard) && (enableShipYard || enableTradeWithBlackMarket || enableHackFactionDatabase || enableTransferCredits))  //child.innerHTML = child.innerHTML + "<br>";
				if(enableShipYard)  child.innerHTML = child.innerHTML + "<a href='shipyard.php'>Shipyard</a><br>";
				if(enableTradeWithBlackMarket)  child.innerHTML = child.innerHTML + "<a href='blackmarket.php'>Black Market</a><br>";
				if(enableHackFactionDatabase)  child.innerHTML = child.innerHTML + "<a href='hack.php'>Hack faction database</a><br>";
				if(enableTransferCredits) child.innerHTML = child.innerHTML + "<a href='starbase_credits.php'>Transfer Credits</a><br>";
				if(enableShipEquipment || enableTradeWithPlanetOrStarbase || enableBulletinBoard || enableBountyBoard || enableShipYard || enableTradeWithBlackMarket || enableHackFactionDatabase || enableTransferCredits)  a.parentNode.insertBefore(child,a.nextSibling);
				if(enableDeliverToPlanetOrStarbase)  a.innerHTML = "<b>Land on/Deliver to starbase</b>"; 
			}
			if(a.getAttribute('href').search(/building.php/i) != -1 && a.getAttribute('href').search(/newbuilding.php/i) == -1 && a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var child = document.createElement("div");
				child.setAttribute("style", "position:relative; top:6px; margin-top: 5px; margin-bottom: 7px;");
				if(enableTradeWithBuilding)  child.innerHTML = child.innerHTML + "<a href='building_trade.php'>Trade with building</a><br>";
				if(enableHackInformation)  child.innerHTML = child.innerHTML + "<a href='hack.php'>Hack information</a><br>";
				if(enableRechargeShield && getLocName() == 'Energy Well') child.innerHTML = child.innerHTML + "<a href='energy_well.php'>Recharge shield</a><br>";
				if(enableTradeWithBuilding || enableHackInformation || enableRechargeShield)  a.parentNode.insertBefore(child,a.nextSibling);
			}
			if(a.getAttribute('href').search(/building_management.php/i) != -1 && a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var child = document.createElement("div");
				child.setAttribute("style", "position:relative; top:6px; margin-top: 5px; margin-bottom: 7px;");
				if(enableBuildingTradeSettings)  child.innerHTML = child.innerHTML + "<a href='building_trade_settings.php'>Building trade settings</a><br>";
				if(enableBuildingTradeSettings)  a.parentNode.insertBefore(child,a.nextSibling);
			}
		}
	}
	
	do_updateCmd();
	var local_updateCmd = unsafeWindow.updateCmd;
	if(local_updateCmd){
		unsafeWindow.updateCmd = function(result){
			local_updateCmd(result);
			do_updateCmd();
		}
	}
//updateShip
	var shipCookie = readCookie('ship');
	if(shipCookie != null)  shipCookie = shipCookie.split("|");
	function do_updateShip(){
		for(var i = 0; i < document.getElementById("yourship_content").getElementsByTagName('a').length; i++)
		{
			var a = document.getElementById("yourship_content").getElementsByTagName('a')[i]
			if((a.getAttribute('href').search(/main.php[?]ccc=1/i) != -1 || a.getAttribute('href').indexOf("cloakingchance()") != -1 )&& a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var child = document.createElement("div");
				
				child.setAttribute("style", "position:relative; top:6px; margin-left: 12px; margin-top: 5px; margin-bottom: 7px;");
				if(enableShipOverview)  child.innerHTML = child.innerHTML + "<a href='overview_ship.php'>Ship Overview</a>";
				if(enableShipName && shipCookie != null && shipCookie[0] != "")  child.innerHTML = child.innerHTML + "<br>Name: " + shipCookie[0];
				if(enableShipType && shipCookie != null && shipCookie[1] != "")  child.innerHTML = child.innerHTML + "<br>Type: " + shipCookie[1];
				if(enableShipImage && shipCookie != null && shipCookie[2] != "")  child.innerHTML = child.innerHTML + "<br><center><img src='" + shipCookie[2] + "'></center>";
				if(enableShipOverview || enableShipName || enableShipType || enableShipImage) { document.getElementById("yourship_content").insertBefore(child,document.getElementById("yourship_content").firstChild); i++; 
				}
			}
		}
	}
	
	do_updateShip();
	var local_updateShip = unsafeWindow.updateShip;
	if(local_updateShip){
		unsafeWindow.updateShip = function(result){
			local_updateShip(result);
			do_updateShip();
		}
	}

//updateShips
	function do_updateShips(){
		for(var i = 0; i < document.getElementById("otherships_content").getElementsByTagName('a').length; i++)
		{
			var a = document.getElementById("otherships_content").getElementsByTagName('a')[i]
			
			if((a.getAttribute('href').search(/main.php[?]scan_details/i) != -1 || a.getAttribute('href').indexOf("scanId(") != -1) && a.innerHTML.indexOf('class="nf"') == -1 && a.innerHTML.indexOf("class='nf'") == -1)
			{
				var playerid = a.getAttribute('href').replace("main.php?scan_details=", "").replace("&scan_type=player", "").replace("javascript:scanId(","").replace(', "player")',"");
				var playername = a.innerHTML.replace("<font color=", "").replace("</font>", "").replace('"#bb0000"',"").replace('"#ffcc00"',"").replace(">", "");
				var alliancename = 'No alliance participation';
				if(a.nextSibling.nextSibling.firstChild.firstChild)  alliancename = a.nextSibling.nextSibling.firstChild.firstChild.innerHTML.replace('<font color="#a1a1af">', '').replace('</font>', '');
				var child = document.createElement("font");
				child.setAttribute("size", "1");
				if(enablePlayerMsg || enablePlayerTrade || enablePlayerAttack)
					child.innerHTML = child.innerHTML + "<br>";
				if(enablePlayerMsg)  child.innerHTML = child.innerHTML + "<a href='javascript:sendmsg(\"" + playername + "\");'>Msg</a>";
				if(enablePlayerMsg && (enablePlayerTrade || enablePlayerAttack))  child.innerHTML = child.innerHTML + "&nbsp;|&nbsp;";
				if(enablePlayerTrade)  child.innerHTML = child.innerHTML + "<a href='ship2ship_transfer.php?playerid=" + playerid + "'>Trade</a>";
				if(enablePlayerTrade && enablePlayerAttack && getLocName() != "Planet" && getLocName() != "Starbase")  child.innerHTML = child.innerHTML + "&nbsp;|&nbsp;";
				if(enablePlayerAttack && getLocName() != "Planet" && getLocName() != "Starbase") child.innerHTML = child.innerHTML + "<a href='ship2ship_combat.php?playerid=" + playerid + "'>Attack</a>";
				if(enablePlayerNews || enableAllianceNews)  child.innerHTML = child.innerHTML + "<br>";
				if(enablePlayerNews)  child.innerHTML = child.innerHTML + "<a href='news.php?s=" + playername + "&searchtype=pilot&search=Search' target='_blank'>News</a>";
				if(enablePlayerNews && enableAllianceNews && alliancename != 'No alliance participation')  child.innerHTML = child.innerHTML + "&nbsp;|&nbsp;";
				if(enableAllianceNews && alliancename != 'No alliance participation')  child.innerHTML = child.innerHTML + "<a href='news.php?s=" + alliancename + "&searchtype=alliance&search=Search' target='_blank'>Ally News</a>";
				if(enablePlayerMsg || enablePlayerTrade || enablePlayerAttack || enablePlayerNews || enableAllianceNews)   child.innerHTML = child.innerHTML + "<br>";
				if(enablePlayerMsg || enablePlayerTrade || enablePlayerAttack || enablePlayerNews || enableAllianceNews)  a.parentNode.insertBefore(child,a.nextSibling.nextSibling.nextSibling);
			}
		}
	}
	
	do_updateShips();
	var local_updateShips = unsafeWindow.updateShips;
	if(local_updateShips){
		unsafeWindow.updateShips = function(result){
			local_updateShips(result);
			do_updateShips();
		}
	}
}

// get info from the Ship Overview screen
if(location.pathname.search(/overview_ship.php/i) != -1)
{
//    var td = document.getElementsByTagName('td');
	var shipName = '';
	var shipType = '';
	var shipImage = '';

	// get ship name
	var textarea = document.getElementsByTagName('textarea');
	for(i = 0; i < textarea.length; i++)
	{
		if (textarea[i].name == 'shipname')
		{
			shipName = textarea[i].value;
			break;
		}
	}

	// get ship type
	var td = document.getElementsByTagName('td');
	for(i = 0; i < td.length; i++)
	{
		if (td[i].innerHTML == 'Type:')
		{
			shipType = td[i].nextSibling.innerHTML;
			break;
		}
	}

	// get ship image
	var imgs = document.getElementsByTagName('img');
	for(i = 0; i < imgs.length; i++)
	{
		results = imgs[i].src.match(/\/ships\/(\w+\.png)/i);
		if(results != null)
		{
			shipImage = imgs[i].src;
			break;
		}
	}
	
	createCookie('ship', shipName + "|" + shipType + "|" + shipImage);
}

// add links to the Building Overview screen
if(location.pathname.search(/overview_buildings.php/i) != -1)
{

  for(var i = 0; i < document.links.length; i++)
  {
    var a = document.links[i];
    if(a.getAttribute('href').indexOf('building_trade_settings.php?object=' + getLocId()) != -1)
    {
      var child = document.createElement("span");
      if(enableBuildingManagement)  child.innerHTML = child.innerHTML + "<a href='building_management.php'><font size='1'>Building management</font></a><br>";
      if(enableBuildingManagement)  a.nextSibling.nextSibling.insertBefore(child,(a.nextSibling.nextSibling.childNodes[0]));
    }
  }

  p = document.getElementsByTagName('p')[document.getElementsByTagName('p').length - 1];
  var child = document.createElement("br");
  if(enableBuildingTool || enableBuildingMaxCalc)  p.parentNode.appendChild(child);
  var child = document.createElement("div");
  child.setAttribute("align", "center");
//  if(enableBuildingTool)  child.innerHTML = child.innerHTML + "<a href='http://www.pardusdv.com/joomla/buildings/build_info.php' target='_blank'>Pardus Building Tool</a>";
  if(enableBuildingTool)  child.innerHTML = child.innerHTML
    + '<script type="text/javascript">function getPardusBuildingTool() { '
    + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Pardus Building Tool") != -1) { var a = document.links[i]; break; } }'
    + 'var ifr = document.getElementsByTagName("iframe");'
    + 'if(ifr["pardusBuildingTool"] != undefined)'
    + '{'
    + '  ifr["pardusBuildingTool"].parentNode.removeChild(ifr["pardusBuildingTool"]);'
    + '  a.innerHTML = "+ Pardus Building Tool +";'
    + '}'
    + 'else'
    + '{'
    + '  var child = document.createElement("iframe");'
    + '  child.setAttribute("name", "pardusBuildingTool");'
    + '  child.setAttribute("width", "99%");'
    + '  child.setAttribute("height", "200");'
    + '  child.setAttribute("src", "http://pardus.rukh.de/building_upgrade.html");'
    + '  document.body.appendChild(child);'
    + '  a.innerHTML = "- Pardus Building Tool -";'
    + '}'
    + '}</script>'
    + '<a href="#" onclick="getPardusBuildingTool(); return false;">+ Pardus Building Tool +</a>';
  if(enableBuildingTool)  p.parentNode.appendChild(child);
  var child = document.createElement("div");
  child.setAttribute("align", "center");
//  if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML + "<a href='http://killermist.com/pardus/maxes/' target='_blank'>Building Maxes Calc</a>";
  if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML
    + '<script type="text/javascript">function getBuildingMaxesCalc() { '
    + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Building Maxes Calc") != -1) { var a = document.links[i]; break; } }'
    + 'var ifr = document.getElementsByTagName("iframe");'
    + 'if(ifr["buildingMaxesCalc"] != undefined)'
    + '{'
    + '  ifr["buildingMaxesCalc"].parentNode.removeChild(ifr["buildingMaxesCalc"]);'
    + '  a.innerHTML = "+ Building Maxes Calc +";'
    + '}'
    + 'else'
    + '{'
    + '  var child = document.createElement("iframe");'
    + '  child.setAttribute("name", "buildingMaxesCalc");'
    + '  child.setAttribute("width", "99%");'
    + '  child.setAttribute("height", "150");'
    + '  child.setAttribute("src", "http://killermist.com/pardus/maxes/");'
    + '  document.body.appendChild(child);'
    + '  a.innerHTML = "- Building Maxes Calc -";'
    + '}'
    + '}</script>'
    + '<a href="#" onclick="getBuildingMaxesCalc(); return false;">+ Building Maxes Calc +</a>';
  if(enableBuildingMaxCalc)  p.parentNode.appendChild(child);
}


// add links to the Building Management screen
if(location.pathname.search(/building_management.php/i) != -1)
{
/*
  var img = document.getElementsByTagName('img');
  for(var i = 0; i < img.length; i++)
  {
    if(img[i].getAttribute('src').indexOf('http://static.pardus.at/images/foregrounds/') != -1)
    {
      var buildingName = img[i].nextSibling.nextSibling.innerHTML.replace(/^\s+|\s+$/g, '');
      break;
    }
  }
*/
  for(var i = 0; i < document.links.length; i++)
  {
    var a = document.links[i];
    if(a.getAttribute('href').indexOf('building_upgrade.php') != -1)
    {
      var child = document.createElement("div");
      child.setAttribute("align", "center");
//      if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML + "<a href='http://killermist.com/pardus/maxes/' target='_blank'>Building Maxes Calc</a>";
      if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML
        + '<script type="text/javascript">function getBuildingMaxesCalc() { '
        + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Building Maxes Calc") != -1) { var a = document.links[i]; break; } }'
        + 'var ifr = document.getElementsByTagName("iframe");'
        + 'if(ifr["buildingMaxesCalc"] != undefined)'
        + '{'
        + '  ifr["buildingMaxesCalc"].parentNode.removeChild(ifr["buildingMaxesCalc"]);'
        + '  a.innerHTML = "+ Building Maxes Calc +";'
        + '}'
        + 'else'
        + '{'
        + '  var child = document.createElement("iframe");'
        + '  child.setAttribute("name", "buildingMaxesCalc");'
        + '  child.setAttribute("width", "99%");'
        + '  child.setAttribute("height", "150");'
        + '  child.setAttribute("src", "http://killermist.com/pardus/maxes/");'
        + '  document.body.appendChild(child);'
        + '  a.innerHTML = "- Building Maxes Calc -";'
        + '}'
        + '}</script>'
        + '<a href="#" onclick="getBuildingMaxesCalc(); return false;">+ Building Maxes Calc +</a>';
      if(enableBuildingTool)  a.parentNode.parentNode.insertBefore(child,a.parentNode.nextSibling);
//      if(enableBuildingTool)  child.innerHTML = child.innerHTML + "<a href='http://www.pardusdv.com/joomla/buildings/build_info.php' target='_blank'>Pardus Building Tool</a>";
      var child = document.createElement("div");
      child.setAttribute("align", "center");
      if(enableBuildingTool)  child.innerHTML = child.innerHTML
        + '<script type="text/javascript">function getPardusBuildingTool() { '
        + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Pardus Building Tool") != -1) { var a = document.links[i]; break; } }'
        + 'var ifr = document.getElementsByTagName("iframe");'
        + 'if(ifr["pardusBuildingTool"] != undefined)'
        + '{'
        + '  ifr["pardusBuildingTool"].parentNode.removeChild(ifr["pardusBuildingTool"]);'
        + '  a.innerHTML = "+ Pardus Building Tool +";'
        + '}'
        + 'else'
        + '{'
        + '  var child2 = document.createElement("iframe");'
        + '  child2.setAttribute("name", "pardusBuildingTool");'
        + '  child2.setAttribute("width", "99%");'
        + '  child2.setAttribute("height", "200");'
        + '  child2.setAttribute("src", "http://pardus.rukh.de/building_upgrade.html");'
        + '  document.body.appendChild(child2);'
        + '  a.innerHTML = "- Pardus Building Tool -";'
        + '}'
        + '}</script>'
        + '<a href="#" onclick="getPardusBuildingTool(); return false;">+ Pardus Building Tool +</a>';
      if(enableBuildingMaxCalc)  a.parentNode.parentNode.insertBefore(child,a.parentNode.nextSibling);
      var child = document.createElement("br");
      if(enableBuildingTool || enableBuildingMaxCalc)  a.parentNode.parentNode.insertBefore(child,a.parentNode.nextSibling);
      var child = document.createElement("br");
      if(enableBuildingTool || enableBuildingMaxCalc)  a.parentNode.parentNode.insertBefore(child,a.parentNode.nextSibling);
    }
  }

}


// add links to the Building Trade Settings screen
if(location.pathname.search(/building_trade_settings.php/i) != -1)
{
/*
  var img = document.getElementsByTagName('img');
  for(var i = 0; i < img.length; i++)
  {
    if(img[i].getAttribute('src').indexOf('http://static.pardus.at/images/foregrounds/') != -1)
    {
      var buildingName = img[i].nextSibling.nextSibling.innerHTML.replace(/^\s+|\s+$/g, '');
      break;
    }
  }
*/

  var input = document.getElementsByTagName('input');
  for(i = 0; i < input.length; i++)
  {
    if(input[i].getAttribute('name') == 'deactivate')
    {
      var child = document.createElement("div");
      child.setAttribute("align", "center");
//      if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML + "<a href='http://killermist.com/pardus/maxes/' target='_blank'>Building Maxes Calc</a>";
      if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML
        + '<script type="text/javascript">function getBuildingMaxesCalc() { '
        + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Building Maxes Calc") != -1) { var a = document.links[i]; break; } }'
        + 'var ifr = document.getElementsByTagName("iframe");'
        + 'if(ifr["buildingMaxesCalc"] != undefined)'
        + '{'
        + '  ifr["buildingMaxesCalc"].parentNode.removeChild(ifr["buildingMaxesCalc"]);'
        + '  a.innerHTML = "+ Building Maxes Calc +";'
        + '}'
        + 'else'
        + '{'
        + '  var child = document.createElement("iframe");'
        + '  child.setAttribute("name", "buildingMaxesCalc");'
        + '  child.setAttribute("width", "99%");'
        + '  child.setAttribute("height", "150");'
        + '  child.setAttribute("src", "http://killermist.com/pardus/maxes/");'
        + '  document.body.appendChild(child);'
        + '  a.innerHTML = "- Building Maxes Calc -";'
        + '}'
        + '}</script>'
        + '<a href="#" onclick="getBuildingMaxesCalc(); return false;">+ Building Maxes Calc +</a>';
      if(enableBuildingTool)  input[i].parentNode.parentNode.insertBefore(child,input[i].parentNode.nextSibling);
      var child = document.createElement("div");
      child.setAttribute("align", "center");
//      if(enableBuildingTool)  child.innerHTML = child.innerHTML + "<a href='http://www.pardusdv.com/joomla/buildings/build_info.php' target='_blank'>Pardus Building Tool</a>";
      if(enableBuildingTool)  child.innerHTML = child.innerHTML
        + '<script type="text/javascript">function getPardusBuildingTool() { '
        + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Pardus Building Tool") != -1) { var a = document.links[i]; break; } }'
        + 'var ifr = document.getElementsByTagName("iframe");'
        + 'if(ifr["pardusBuildingTool"] != undefined)'
        + '{'
        + '  ifr["pardusBuildingTool"].parentNode.removeChild(ifr["pardusBuildingTool"]);'
        + '  a.innerHTML = "+ Pardus Building Tool +";'
        + '}'
        + 'else'
        + '{'
        + '  var child = document.createElement("iframe");'
        + '  child.setAttribute("name", "pardusBuildingTool");'
        + '  child.setAttribute("width", "99%");'
        + '  child.setAttribute("height", "200");'
        + '  child.setAttribute("src", "http://pardus.rukh.de/building_upgrade.html");'
        + '  document.body.appendChild(child);'
        + '  a.innerHTML = "- Pardus Building Tool -";'
        + '}'
        + '}</script>'
        + '<a href="#" onclick="getPardusBuildingTool(); return false;">+ Pardus Building Tool +</a>';
      if(enableBuildingMaxCalc)  input[i].parentNode.parentNode.insertBefore(child,input[i].parentNode.nextSibling);
    }
  }

}


// add links to the Building Upgrade screen
if(location.pathname.search(/building_upgrade.php/i) != -1)
{

  for(var i = 0; i < document.links.length; i++)
  {
    var a = document.links[i];
    if(a.getAttribute('href').indexOf('building_management.php') != -1)
    {
      var child = document.createElement("div");
      child.setAttribute("align", "center");
//      if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML + "<a href='http://killermist.com/pardus/maxes/' target='_blank'>Building Maxes Calc</a>";
      if(enableBuildingMaxCalc)  child.innerHTML = child.innerHTML
        + '<script type="text/javascript">function getBuildingMaxesCalc() { '
        + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Building Maxes Calc") != -1) { var a = document.links[i]; break; } }'
        + 'var ifr = document.getElementsByTagName("iframe");'
        + 'if(ifr["buildingMaxesCalc"] != undefined)'
        + '{'
        + '  ifr["buildingMaxesCalc"].parentNode.removeChild(ifr["buildingMaxesCalc"]);'
        + '  a.innerHTML = "+ Building Maxes Calc +";'
        + '}'
        + 'else'
        + '{'
        + '  var child = document.createElement("iframe");'
        + '  child.setAttribute("name", "buildingMaxesCalc");'
        + '  child.setAttribute("width", "99%");'
        + '  child.setAttribute("height", "150");'
        + '  child.setAttribute("src", "http://killermist.com/pardus/maxes/");'
        + '  document.body.appendChild(child);'
        + '  a.innerHTML = "- Building Maxes Calc -";'
        + '}'
        + '}</script>'
        + '<a href="#" onclick="getBuildingMaxesCalc(); return false;">+ Building Maxes Calc +</a>';
      if(enableBuildingTool)  a.parentNode.insertBefore(child,a);  i++;
//      if(enableBuildingTool)  child.innerHTML = child.innerHTML + "<a href='http://www.pardusdv.com/joomla/buildings/build_info.php' target='_blank'>Pardus Building Tool</a>";
      var child = document.createElement("div");
      child.setAttribute("align", "center");
      if(enableBuildingTool)  child.innerHTML = child.innerHTML
        + '<script type="text/javascript">function getPardusBuildingTool() { '
        + 'var a = null; for(var i = 0; i < document.links.length; i++) { if(document.links[i].innerHTML.indexOf("Pardus Building Tool") != -1) { var a = document.links[i]; break; } }'
        + 'var ifr = document.getElementsByTagName("iframe");'
        + 'if(ifr["pardusBuildingTool"] != undefined)'
        + '{'
        + '  ifr["pardusBuildingTool"].parentNode.removeChild(ifr["pardusBuildingTool"]);'
        + '  a.innerHTML = "+ Pardus Building Tool +";'
        + '}'
        + 'else'
        + '{'
        + '  var child2 = document.createElement("iframe");'
        + '  child2.setAttribute("name", "pardusBuildingTool");'
        + '  child2.setAttribute("width", "99%");'
        + '  child2.setAttribute("height", "200");'
        + '  child2.setAttribute("src", "http://www.pardusdv.com/joomla/buildings/build_info.php");'
        + '  document.body.appendChild(child2);'
        + '  a.innerHTML = "- Pardus Building Tool -";'
        + '}'
        + '}</script>'
        + '<a href="#" onclick="getPardusBuildingTool(); return false;">+ Pardus Building Tool +</a>';
      if(enableBuildingMaxCalc)  a.parentNode.insertBefore(child,a);  i++;
      var child = document.createElement("br");
      if(enableBuildingTool || enableBuildingMaxCalc)  a.parentNode.insertBefore(child,a);  i++;
    }
  }

}


// add info to Stats Overview screen
if(location.pathname.search(/overview_stats.php/i) != -1)
{

  // add progress percents
  var tbls = document.getElementsByTagName('table');
  for(var l = 0; l < tbls.length; l++)
  {
    if(tbls[l].hasAttribute('width'))
    {
      if(tbls[l].getAttribute('width') == '150')
      {
        var tds = tbls[l].getElementsByTagName('td');
        for(var i = 0; i < tds.length; i++)
        {
          if(tds[i].hasAttribute('title') && tds[i].hasAttribute('style'))
          {
            if(/\d{1,2}\s%/.test(tds[i].getAttribute('title')))
            {
              tbls[l].setAttribute('width', '190');
              tbls[l].firstChild.firstChild.appendChild(document.createElement("td")).innerHTML = '&nbsp; ' + tds[i].getAttribute('title');
            }
          }
        }
      }
    }
  }

}


// add to Message frame
if(location.pathname.search(/msgframe.php/i) != -1)
{
msgframe = document;
  var img = document.getElementsByTagName('img');

  if(enableAccountName)
  {
    var child = document.createElement('span');
    child.innerHTML = ' ' + getUserName();
    img[0].parentNode.insertBefore(child,img[0].nextSibling);
  }
  if(enableEditProfile)
  {
    for(var i = 0; i < document.links.length; i++)
    {
      var a = document.links[i];

      if(a.getAttribute('href').search(/logout/i) != -1)
      {
        var child = document.createElement('span');
        child.innerHTML = child.innerHTML + "<a href='profile.php?action=edit&userid=" + getUserId() + "' target='main'>Edit Profile</a> | ";
        i++;
        a.parentNode.insertBefore(child,a);
      }
    }
  }

  var table = document.getElementsByTagName('table');
  var e = table[0].firstChild.firstChild.childNodes[3].firstChild;

  if(getUniverseName() == 'artemis' && (artemisCustomLinks.length>0))
  {
	var child = document.createElement('div');
	child.innerHTML = '&nbsp';
    for(var i = 0;i<artemisCustomLinks.length;i++){
		var link = artemisCustomLinks[i] ;
		var name = artemisCustomLinkNames[i];
		child.innerHTML+='<a href="' + link + '" target="_blank">' + name + '</a>&nbsp;|&nbsp;';
	}
    if(child.innerHTML.lastIndexOf('&nbsp;|&nbsp;')>=0){
		child.innerHTML=child.innerHTML.substring(0,child.innerHTML.lastIndexOf('&nbsp;|&nbsp;'))
	}
    e.appendChild(child);
  }
  if(getUniverseName() == 'orion' && (orionCustomLinks.length > 0))
  {
  
  var child = document.createElement('div');
	child.innerHTML = '&nbsp';
    for(var i = 0;i<orionCustomLinks.length;i++){
		var link = orionCustomLinks[i] ;
		var name = orionCustomLinkNames[i];
		child.innerHTML+='<a href="' + link + '" target="_blank">' + name + '</a>&nbsp;|&nbsp;';
	}
    if(child.innerHTML.lastIndexOf('&nbsp;|&nbsp;')>=0){
		child.innerHTML=child.innerHTML.substring(0,child.innerHTML.lastIndexOf('&nbsp;|&nbsp;'))
	}
    e.appendChild(child);
  }
  if(getUniverseName() == 'pegasus' && (pegasusCustomLinks.length>0))
  {
	var child = document.createElement('div');
	child.innerHTML = '&nbsp';
    for(var i = 0;i<pegasusCustomLinks.length;i++){
		var link = pegasusCustomLinks[i] ;
		var name = pegasusCustomLinkNames[i];
		child.innerHTML+='<a href="' + link + '" target="_blank">' + name + '</a>&nbsp;|&nbsp;';
	}
    if(child.innerHTML.lastIndexOf('&nbsp;|&nbsp;')>=0){
		child.innerHTML=child.innerHTML.substring(0,child.innerHTML.lastIndexOf('&nbsp;|&nbsp;'))
	}
    e.appendChild(child);
  }

}


// add info to Send Message screen
if(location.pathname.search(/sendmsg.php/i) != -1)
{

  // add gender, race & alliance
  var the_image = document.images[3];
  var gender = (/64x64f.jpg/.test(the_image.getAttribute('src'))) ? 'Female' : (/64x64.jpg/.test(the_image.getAttribute('src'))) ? 'Male' : '';
  var alliancename = the_image.getAttribute('title').replace('Human - ', '').replace('Keldon - ', '').replace('Rashkir - ', '').replace("Ska'ari - ", '');
  var race = the_image.getAttribute('title').replace(alliancename, '').replace(' - ', '');
  var innerHTML = '';
  if(enablePlayerInfo)
  {
    if(gender != '')  innerHTML += '<br>' + gender + ' | ' + race + '<br>' + alliancename;

    for(var i = 0; i < document.links.length; i++)
    {
      var a = document.links[i];

      if(a.getAttribute('href').search(/profile.php/i) != -1)  a.parentNode.parentNode.setAttribute('nowrap', '');
    }
  }

  // add player and alliance news links
  if(enablePlayerNews || enableAllianceNews)  innerHTML += '<br>';
  if(enablePlayerNews)
  {
    playername = location.search.replace('?to=', '').replace('&subj=undefined', '');
    innerHTML += '<a href="news.php?s=' + playername + '&searchtype=pilot&search=Search" target="_blank">Player News</a>';
  }
  if(enablePlayerNews && enableAllianceNews && alliancename != 'No alliance participation')  innerHTML += ' | ';
  if(enableAllianceNews && alliancename != 'No alliance participation')
  {
    innerHTML += '<a href="news.php?s=' + alliancename + '&searchtype=alliance&search=Search" target="_blank">Alliance News</a>';
  }
  the_image.parentNode.innerHTML += innerHTML;

}


// add info to Logout screen
if(location.pathname.search(/logout.php/i) != -1)
{

  if(enableAPFullCalc)
  {
    var sp = document.getElementsByTagName('span');
    for(i = 0; i < sp.length; i++)
    {
      if(sp[i].hasAttribute('title'))
      {
        if(sp[i].getAttribute('title').indexOf('Maximum in') != -1)
        {
          var child = document.createElement('div');
          child.innerHTML += '<center>' + sp[i].getAttribute('title').substring(0, sp[i].getAttribute('title').indexOf('(accuracy')).replace('Maximum', 'Maximum APs') + '</center>';
          sp[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(child);
        }
      }
    }
  }
}


// Butterfat maps
if(false && enableButterfatSectorMap && location.host.search(/pardus.butterfat.net/i) != -1)
{

  // fix Butterfat sector maps redirection issue
  if(location.pathname == '/' && document.referrer.search(/pardus.at/i) != -1)
  {
    var str = window.location.search;
    var universe = str.substr(str.indexOf('universe') == -1 ? str.length : str.indexOf('universe'));  universe = universe.substr(0, (universe.indexOf('&') == -1 ? universe.length : universe.indexOf('&'))).replace('universe=', '');
    var sector = str.substr(str.indexOf('sector') == -1 ? str.length : str.indexOf('sector'));  sector = sector.substr(0, (sector.indexOf('&') == -1 ? sector.length : sector.indexOf('&'))).replace('sector=', '');
    if(sector != '')
    {
      var newurl = 'http://pardus.butterfat.net/pardusmapper/maps/' + universe + '/' + sector + '.html';
      window.location= newurl;
    }
    else if(universe != '')
    {
      var newurl = 'http://pardus.butterfat.net/pardusmapper/maps/' + universe + '/universe.html';
      window.location= newurl;
    }
  }

  //add universe map link to Butterfat sector map
  if(location.pathname.search(/pardusmapper[/]maps/i) != -1 && location.pathname.search(/universe.html/i) == -1)
  {
    for(var i = 0; i < document.links.length; i++)
    {
      var a = document.links[i];
      if(a.getAttribute('href').search(/pardusmapper/i) != -1)
      {
        var universe = location.pathname.replace('/pardusmapper/maps/', '');  universe = universe.substr(0, universe.indexOf('/'));
        var sector = location.pathname.replace('/pardusmapper/maps/' + universe + '/', '').replace('.html', '');
        var child = document.createElement("span");
        child.innerHTML = child.innerHTML + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='/pardusmapper/maps/" + universe + "/universe.html#" + sector + "'>" + universe.substr(0, 1).toUpperCase() + universe.substr(1) + " Universe</a><br>";
        a.parentNode.insertBefore(child,a.nextSibling);  i++
      }
    }
  }

}

scr_meta=<><![CDATA[ 
// ==UserScript==
// @name           Travian: Antifarm\Troop saver
// @namespace      Travian
// @description    Script for Travian game. Sends your and reinforce troops away on attack; refreshes and relogins automatically. Supports multiple villages.
// @author         m4rtini, deFox, Arias
// @version        1.2.7
// @license        GNU General Public License
// @include        http://*.travian*.*/dorf1.php*
// @require http://sizzlemctwizzle.com/updater.php?id=38017
// ==/UserScript==
]]></>.toString();

// Authors information - DO NOT CHANGE (unless you're an author too)
var a = "\
   Authors:\
     Original version by m4rtini.\
     Extensive modifications by deFox.\
     Auto updater by Arias.\
";
/**
 * Date:
 *   22 Jan 2008 - 05 Sep 2009
 * Usage:
 *     Set troopTarget[] to coordinates of the villages where you want to
 *     send the troops to. You may also change other parameters; but don't
 *     think that setting it to any value will work. Don't make drastic
 *     changes.
 *     You should always see status message of the program in right panel.
 *     If it's not there, then the script isn't working. Note that it only
 *     works when you're in "Village and around" view (when address bar
 *     contains 'dorf1.php').
 * Copying and copyrights:
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 * Changelog:
 *   15 Sep 2009, deFox:
 *     - Added checksum to troop send requests (due to T3.5 update)
 *     - Fixed mistake in saving only specific troop types
 *   05 Sep 2009, Arias:
 *     - Added auto-update code
 *   18 Aug 2009, deFox:
 *     - Resources planned at the moment of attack are now displayed
 *     - Unified way of handling requests
 *     - Users can now choose how the troops are sent (reinforce/attack/raid)
 *     - Numeric values are now always treated as decimal
 *     - Started work on resources saving function (unfinished yet)
 *   02 Aug 2009, deFox:
 *     - Fixed auto-relogin code mistake
 *   28 Jul 2009, deFox:
 *     - Updated troops retreating code
 *     - Reverted script name
 *   23 Jul 2009, deFox:
 *     - Added sound playing function
 *     - Created authors preserve code
 *   22 Jul 2009, deFox:
 *     - Fixed tag names because of travian 3.5 update
 *     - Verified and corrected some XPath code
*/

// Change these to some valid coordinates for your server.
// You can leave only one target village, or add more (as many as you want),
// just keep the number in brackets incrementing.
// Type X and Y coords; the third parameter controls how the troops are sent:
// 1-reinforce, 2-attack, 3-raid.
var troopTarget = new Array();
troopTarget[0] = [-7,-37,1];
//troopTarget[1] = [-9,-37,1];
//troopTarget[2] = [-6,-34,1];


// Time to attack when the troops will be sent; in seconds.
// If your internet connection is very fast, then you could reduce it, ie. to 10 seconds.
const tmSave = 40;
// Time between page reloads when idle (no attack detected); in seconds
// The time will be increased by a random factor between 0 and 25%.
// If you don't have any enemies nearby, then you should increase it, let's say to 15*60.
// On the other hand, if you have many villages to switch between, you may want
// to make it smaller - only one village is checked on one reload, so for 5 villages
// you may want to set it to 4*60 to make a specific village checked every 20 minutes.
const tmIdleReload = 6*60;
// Percentage of tmSave after which the troops will be called back to your village.
// Should be between .50 and .99. Lower values may result in the troops getting back
// too early, higher values may lead to not calling them back at all.
const tmSaveCallBackPercent = 0.60;

// Some of the options below have logic value,
// which means they may be set to 'true' or 'false'.

// Determines if the script should reload page automatically in given intervals
var autoReload = true;
// Determines if the script should automatically 'press' login button if logged out
var autoLogin = true;
// Determines if the script should use its save troops code
var autoSaveTroops = true;
// Determines if the script should switch between villages.
// Setting this to 'false' will stick to the currently selected village.
var autoSwitchVillage = true;
// Determines if the script should call back reinforce troops on attack.
var autoSaveReinforce = true;
// Selects whether every kind of unit is saved or not. There are 11 types of troops,
// so there's one logic value for every kind - except for the first value, which is unused.
var saveUnitKind = new Array(true,true,true,true,true,true,true,true,true,true,true,true);
// Determines if the script should play a WAV file when attack is detected
var soundOnAttack = true;
// File name of the sound played if attack is detected
var soundUrl = "http://simplythebest.net/sounds/WAV/WAV_files/cartoon_WAV_files/charge.wav";
// Determines if the sound should be looped and play all the time
var soundLoop = false;

// Determines if the script should show information messages in right panel.
var showStatusMesages = true;
// Logging - for debugging purposes.
var logDebugMesages = false;

// End of configuration options.

// Internal values - do not change
var reloadOn = true;
var troopSaveState = 0;
var troopSaveErrors = 0;
var travActiveVilliage = 0;
var travActiveVilliageStr = "";
var nodeToAppendNb = "";
var tmIdleReloadExact = (tmIdleReload+Math.floor(tmIdleReload*Math.random()/4));

var activeVilliage = new Array();
activeVilliage["res_amount"] = new Array(0,0,0,0);
activeVilliage["res_produced"] = new Array(0,0,0,0);
activeVilliage["res_limit"] = new Array(0,0,0,0);
activeVilliage["field_kind"] = new Array(40);
activeVilliage["field_level"] = new Array(40);
activeVilliage["attack_log"] = new Array();
activeVilliage["crannys_capacity"] = 0;
var travTimeToFirstAttack = 990*60*60;

const SendAs_Default        = 0;
const SendAs_Reinforce      = 1;
const SendAs_Attack         = 2;
const SendAs_Raid           = 3;

const TSState_Monitoring    = 0;
const TSState_SaveReinforce = 2;
const TSState_SaveTroops    = 3;
const TSState_RetreatTroops = 5;

const Refrsh_SameUrl        = 0;
const Refrsh_UrlClearParams = 1;
const Refrsh_ChangeVillage  = 2;

const BLD_Woodcutter   = 1;
const BLD_ClayPit      = 2;
const BLD_IronMine     = 3;
const BLD_Cropland     = 4;
const BLD_Sawmill      = 5;
const BLD_Brickyard    = 6;
const BLD_IronFoundry  = 7;
const BLD_GrainMill    = 8;
const BLD_Bakery       = 9;
const BLD_Warehouse    = 10;
const BLD_Granary      = 11;
const BLD_Blacksmith   = 12;
const BLD_Armoury      = 13;
const BLD_TournmSquare = 14;
const BLD_MainBuilding = 15;
const BLD_RallyPoint   = 16;
const BLD_Marketplace  = 17;
const BLD_Embassy      = 18;
const BLD_Barracks     = 19;
const BLD_Stable       = 20;
const BLD_Workshop     = 21;
const BLD_Academy      = 22;
const BLD_Cranny       = 23;
const BLD_TownHall     = 24;
const BLD_Residence    = 25;
const BLD_Palace       = 26;
const BLD_Treasury     = 27;
const BLD_TradeOffice  = 28;
const BLD_GrBarracks   = 29;
const BLD_GrStable     = 30;
const BLD_CityWall     = 31;
const BLD_EarthWall    = 32;
const BLD_Palisade     = 33;
const BLD_Stonemason   = 34;
const BLD_Brewery      = 35;
const BLD_Trapper      = 36;
const BLD_HeroMansion  = 37;
const BLD_GrWarehouse  = 38;
const BLD_GrGranary    = 39;
const BLD_WonderOTWorld= 40;
const BLD_HorseDrinkTr = 41;

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPNumber = XPathResult.NUMBER_TYPE;
var XPAny = XPathResult.ANY_TYPE;

/*
 * The main function of this script.
 */
function functionMainTS(e)
{
  loadActiveVillage();
  loadTroopSaveState();
  prepareDivDocking();
  if (autoLogin)
    loginCheck(document);
  updateResAndProdInVillage(document);
  doStateSpecificAction(document);
}

function doStateSpecificAction(doc)
{
    //sendResources(doc); sheduleReloadCheck(tmIdleReloadExact*1000); return;
    switch (troopSaveState)
    {
    case TSState_Monitoring: // 'monitoring' state
        if (autoSaveTroops)
          checkForAttackAndInitSaveTroops(doc);
//    setTroopSaveState(TSState_SaveReinforce);//DEBUG command to force the saving immediatelly
        break;
    case TSState_SaveReinforce: // 'time to call off reinforce' state
        if (autoSaveReinforce)
          retreatReinforceTroops(doc);
        // note: no 'break' here
    case TSState_SaveTroops: // 'time to save troops' state
        saveTroops(doc);
        break;
    case TSState_RetreatTroops: // 'check for retreat troops' state
        checkRetreatTroops(doc);
        break;
    }
    //TS_message("Active vil. "+getActiveVillageStr(document)+".");
    //playAttackSound(doc);
    //retreatReinforceTroops(doc);
}

//*** Start of autoupdate code ***

var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '53931', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();

//*** End of autoupdate code ***


// Now sub-functions will be defined

  function find(xpath, xpres, startnode) {
    if (!startnode) {startnode = document;}
    var ret = document.evaluate(xpath, startnode, null, xpres, null);
    return  xpres == XPFirst ? ret.singleNodeValue : ret;
  }

  function addAttributes(elem, cAttribute) {
    //proposed by Acr111. Thank you !
    if (cAttribute !== undefined) {
      for (var xi = 0; xi < cAttribute.length; xi++){
        elem.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
        if (cAttribute[xi][0].toUpperCase() == 'TITLE') elem.setAttribute('alt', cAttribute[xi][1]);
      }
    }
  }

  function newDiv(iHTML, cAttribute) {
    var aDiv = document.createElement("div");
    aDiv.innerHTML = iHTML;
    addAttributes(aDiv, cAttribute);
    return aDiv;
  }

  function newTable(cAttribute) {
    var aTable = document.createElement("table");
    addAttributes(aTable, cAttribute);
    return aTable;
  }
  
  function newRow(iHTML, cAttribute) {
    var aRow = document.createElement("tr");
    aRow.innerHTML = iHTML;
    addAttributes(aRow, cAttribute);
    return aRow;
  }
  
  function newCell(iHTML, cAttribute) {
    var aCell = document.createElement("td");
    aCell.innerHTML = iHTML;
    addAttributes(aCell, cAttribute);
    return aCell;
  }

  function newEmbed(iHTML, cAttribute) {
    var aCell = document.createElement("embed");
    aCell.innerHTML = iHTML;
    addAttributes(aCell, cAttribute);
    return aCell;
  }
  
  function prepareDivDocking()
  {
    var dlright1 = 'sright';
    var divlmidall;
    var divDock = find("//div[@id='" + dlright1 + "']", XPFirst);
    if (divDock == null)
    {
      divDock = newDiv("", [["id", dlright1],["style", "width:100%"]]);
      divlmidall = find("//body/div[@id='lmidall']", XPFirst);
      if (divlmidall == null)
        divlmidall = find("//body/div[@id='mid']/div[@id='side_info']", XPFirst);
      if (divlmidall == null)
        divlmidall = find("//body", XPFirst);
      divlmidall.appendChild(divDock);
    }
    if (divDock != null)
    {
      nodeToAppendNb = divDock;
    }
  }

  /*
   * Creates the right message and adds it to document.
   */
  function showRightMessageBlock(doc,statusText)
  {
    if (typeof(nodeToAppendNb) != "object") return;
    var aTable = createRightMessageBlock(statusText);
    var parNB = doc.createElement("p");
    parNB.appendChild(aTable);
    aTable = parNB;
    nodeToAppendNb.appendChild(aTable);
  }

  /*
   * Create a right message, which strores the status.
   */
  function createRightMessageBlock(statusText)
  {
    var aTable = newTable([["style", "width:0%;"]]);
    var tr = newRow("");
    var td = newCell("", []);
    var pText = document.createTextNode(statusText);
    dInfo = [509, 545, '60'];
    aTable.setAttribute("style", "background-color: #e7e7e7; width: 310px; height: 24px; margin: -16px 0 0 -12px; padding: 0 0 0 0;");
    td.appendChild(pText);
    tr.appendChild(td);
    aTable.appendChild(tr);
    return aTable;
  }

  /*
   * A function to show status messages in right panel.
   */
  function TS_message(text)
  {
    if (logDebugMesages)
      GM_log(text);
    if (showStatusMesages)
      showRightMessageBlock(document,"TS: "+text);
  }

  /*
   * A function to log debug mesages into Javascript console.
   */
  function TS_debug(text)
  {
    if (logDebugMesages)
      GM_log(text);
  }

  /*
   * Sends given 'post' request, with given callback function.
   */
  function TS_postRequest(reqUrl,reqData,reqCallback)
  {
    TS_debug("POST: "+reqUrl+" "+reqData);
    GM_xmlhttpRequest({
      method: "POST",
      url: reqUrl,
      headers:{'Content-type':'application/x-www-form-urlencoded',
        },
      data:encodeURI(reqData),
      onload: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled);
      },
      onerror: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled);
      }
    });
  }

  /*
   * Sends given 'get' request, with given callback function.
   */
  function TS_getRequest(reqUrl,reqCallback)
  {
    TS_debug("GET: "+reqUrl);
    GM_xmlhttpRequest({
      method: "GET",
      url: reqUrl,
      headers: {'Accept': 'application/atom+xml,application/xml,text/xml',
        },
      onload: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled);
      },
      onerror: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled);
      }
    });
  }

  /*
   * Returns string representation of given time.
   */
  function formatTimeStr(tmWhole)
  {
    var h = Math.floor(tmWhole/3600);
    var m = Math.floor(tmWhole/60) % 60;
    var s = Math.floor(tmWhole) % 60;
    if (h < 10)
      hs = "0"+h;
    else
      hs = h.toString();
    if (m < 10)
      ms = "0"+m;
    else
      ms = m.toString();
    if (s < 10)
      ss = "0"+s;
    else
      ss = s.toString();
    return hs+":"+ms+":"+ss;
  }

  function waitFor(millis)
  {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
  }

  function delayBetweenRequests()
  {
    var millis;
    millis = tmSave*1000/60;
    millis = Math.floor(millis+millis*Math.random());
    if (millis > 5000)
      millis = 5000;
    waitFor(millis);
  }

  /*
   * Returns first element of given tag and class.
   */
  function getElementByTagAndClass(doc,tag_name,class_name)
  {
    //Populate the array with all the page tags
    var matching_tags = doc.getElementsByTagName(tag_name);
    var i;
    //Cycle through the tags using a for loop
    for (i=0; i<matching_tags.length; i++)
    {
      if (matching_tags[i].className == class_name)
        return matching_tags[i];
    }
  }
  
  /*
   * Sets new active village number.
   * "0" means there's only one village; 1..n is a village number
   * if there are multiple villages.
   */
  function setActiveVillage(nVillage)
  {
    travActiveVilliage = nVillage;
    GM_setValue("travActiveVilliage", travActiveVilliage);
    if (travActiveVilliage > 0)
      travActiveVilliageStr = getVillageStr(document,travActiveVilliage-1);
    else
      travActiveVilliageStr = "";
    GM_setValue("travActiveVilliageStr", travActiveVilliageStr);
  }

  /*
   * Sets new active village number.
   */
  function loadActiveVillage()
  {
    travActiveVilliage = GM_getValue("travActiveVilliage", 0);
    travActiveVilliageStr = GM_getValue("travActiveVilliageStr", "");
  }

  /*
   * Updates an array which stores resoure counts and production in the village.
   */
  function updateResAndProdInVillage(doc)
  {
    var tag,tds;
    var resourcesInVillage = activeVilliage["res_amount"];
    var resProductionInVillage = activeVilliage["res_produced"];
    var resLimitInVillage = activeVilliage["res_limit"];
    tag = find(".//div[@id='goods']", XPFirst, doc);
    if (tag == null)
      tag = find(".//div[@id='res']", XPFirst, doc);
    if (tag == null)
    {
      TS_debug("updateResAndProdInVillage: No res tag found.");
      return false;
    }
    tds = find(".//td[contains(@id,'l')]", XPList, tag);
    if (tds.snapshotLength < 4)
    {
      TS_debug("updateResAndProdInVillage: Not enough resource items found in res tag.");
      return false;
    }
    var result = true;
    for (var i=0; i < 4; i++)
    {
      temp = tds.snapshotItem(i).textContent;
      if (temp.length > 0)
      {
        temp = temp.split("/",2);
        if (temp.length >= 2)
        {
          resourcesInVillage[i] = parseInt(temp[0],10);
          resLimitInVillage[i] = parseInt(temp[1],10);
        } else
          result = false;
      } else
        result = false;
      //TS_debug("updateResAndProdInVillage: "+temp);
      temp = tds.snapshotItem(i).title;
      if (temp.length > 0)
        resProductionInVillage[i] = parseInt(temp,10);
      else
        result = false;
    }
    return result;
  }

  /*
   * Returns an array with plans for resource amounts after the given time will pass.
   */
  function planResourcesAfter(tmPassed)
  {
    var planRes = Array(4);
    var resourcesInVillage = activeVilliage["res_amount"];
    var resProductionInVillage = activeVilliage["res_produced"];
    var resLimitInVillage = activeVilliage["res_limit"];
    for (var i=0; i < 4; i++)
    {
      var prodPerSec = resProductionInVillage[i]/(60*60);
      planRes[i] = Math.ceil(resourcesInVillage[i] + prodPerSec*tmPassed);
      if (planRes[i] > resLimitInVillage[i])
        planRes[i] = resLimitInVillage[i];
      if (planRes[i] < 0)
        planRes[i] = 0;
    }
    return planRes;
  }

  /*
   * Returns field ID where given building is, or 0 if it doesn't exist.
   * TODO: make it work correctly!
   */
  function getBuildingFieldId(building_id)
  {
    if (building_id == BLD_Marketplace) return 27;
    return 0;
  }
  /*
   * Sets new state of the troop saving process.
   */
  function setTroopSaveState(nState,tmReloadWait)
  {
    troopSaveState = nState;
    if (troopSaveState != TSState_Monitoring)
      reloadOn = false;
    else
      reloadOn = true;
    GM_setValue("troopSaveState", troopSaveState);
    troopSaveErrors = 0;
    GM_setValue("troopSaveErrors", troopSaveErrors);
    if (tmReloadWait)
    {
      window.setTimeout(function(){if (reloadOn) refreshPage(Refrsh_UrlClearParams);},tmReloadWait); 
    } else
    if (autoReload)
    {
      sheduleReloadCheck(tmIdleReloadExact*1000);
    }
  }

  /*
   * Loads state of the troop saving process into troopSaveState variable.
   */
  function loadTroopSaveState()
  {
    troopSaveState = GM_getValue("troopSaveState", TSState_Monitoring);
    if (troopSaveState != TSState_Monitoring)
      reloadOn = false;
    else
      reloadOn = true;
    troopSaveErrors = GM_getValue("troopSaveErrors", 0);
    if (autoReload)
    {
      sheduleReloadCheck(tmIdleReloadExact*1000);
    }
  }

  /*
   * Shedules the page reload in given time.
   */
  function sheduleReloadCheck(tmReloadWait)
  {
      window.setTimeout(function(){ refreshSwitchVillage(); },tmReloadWait);
  }

  function refreshSwitchVillage()
  {
    if (!reloadOn)
    {
      sheduleReloadCheck(tmIdleReloadExact*1000);
      return;
    }
    if (autoSwitchVillage)
      refreshPage(Refrsh_ChangeVillage);
    else
      refreshPage(Refrsh_UrlClearParams);
  }
  
  /*
   * Increases errors counter of the troop saving process.
   * The error counter is cleared on any state change.
   */
  function incTroopSaveErrors()
  {
    troopSaveErrors++;
    GM_setValue("troopSaveErrors", troopSaveErrors);
  }

  /*
   * Returns XPath node of the villages table, or null if there's no such thing.
   */
  function getVillagesTableNode(doc)
  {
    var tag;
    tag = find(".//table[@class='vlist']", XPFirst, doc);
    if (tag == null)
      tag = find(".//table[@id='vlist']", XPFirst, doc);
    if (tag == null)
      tag = find(".//div[@id='sright']//table[@class='f10']", XPFirst, doc);
    if (tag == null)
      return null;
    return tag;
  }

  /*
   * Returns number of all villages.
   */
  function getAllVillagesCount(doc)
  {
    var tag;
    var vCount;
    tag =  getVillagesTableNode(doc);
    if (!tag)
    {
      TS_debug("getAllVillagesCount: No villages list tag - treating as single village.");
      return 1;
    }
    vCount = find("count(.//td//a[contains(@href,'?newdid=')])", XPNumber, tag);
    if (vCount.numberValue > 0)
    {
      TS_debug("getAllVillagesCount: Got "+vCount.numberValue+" villages.");
      return vCount.numberValue;
    }
    TS_debug("getAllVillagesCount: Can't recognize count - bad villages table.");
    return 1;
  }

  /*
   * Returns a string containing ID of an active village.
   * The string looks like "newdid=<num>" and can be directly placed inside href.
   */
  function getActiveVillageStr(doc)
  {
    var tag,hrefs;
    tag =  getVillagesTableNode(doc);
    if (tag == null)
    {
      TS_debug("getActiveVillageStr: No villages list tag.");
      return 0;
    }
    hrefs = find(".//a[contains(@href,'newdid')][@class='active_vl']", XPFirst, tag);
    if (hrefs == null)
      hrefs = find(".//td[@class='dot hl']/..//a[contains(@href,'newdid')]", XPFirst, tag);
    if (hrefs == null)
    {
      TS_debug("getActiveVillageStr: Can't recognize which village is active.");
      return 0;
    }
    temp = hrefs.href.split("?")[1].split('&');
    return temp[0];
  }

  /*
   * Returns a string containing ID of a village with given position in table.
   * The string looks like "newdid=<num>" and can be directly placed inside href.
   */
  function getVillageStr(doc,nVillage)
  {
    var tag,hrefs;
    var temp;
    tag =  getVillagesTableNode(doc);
    if (!tag)
    {
      TS_debug("getVillageStr: No villages list tag.");
      return "";
    }
    hrefs = find(".//td//a[contains(@href,'?newdid=')]", XPList, tag);
    if (hrefs.snapshotLength <= nVillage)
    {
      TS_debug("getVillageStr: Village index "+nVillage+" is too large.");
      return "";
    }
    temp = hrefs.snapshotItem(nVillage).href;
    if (temp.length > 0)
      return temp.split("?")[1].split('&')[0];
    TS_debug("getVillageStr: Can't locate href in village list.");
    return "";
  }

   /*
   * Returns ID of a village with given position in table.
   */
  function getVillageId(doc,nVillage)
  {
    var href_str;
    href_str = getVillageStr(doc,nVillage);
    if (href_str.length > 0)
      return parseInt(href_str.split('=')[1],10);
    return 0;
  }

  /*
   * Finds the next active village number.
   * Sets it so that next time the next village will be checked.
   */
  function updateCheckToNextVillage(doc)
  {
    var nVillage,allVillages;
    allVillages = getAllVillagesCount(doc);
    if (allVillages <= 1)
    {
      nVillage = 0;
    } else
    {
      nVillage = travActiveVilliage+1;
      if (nVillage > allVillages)
        nVillage = 1;
    }
    setActiveVillage(nVillage);
    TS_debug("Next village set to "+travActiveVilliage);
  }

  /*
   * Returns enemy troops arrival time, in seconds.
   * A value over 900*60*60 means an error.
   */
  function getEnemyAttackArrivalTime(doc)
  {
//    if (travTimeToFirstAttack < 900*60*60)
//      return travTimeToFirstAttack;
    var div,tbrows,tbcells,tbdiv,tbspan;
    var arrival,arrivsplt;
    var hours,minutes,seconds;
    var i;
    div = doc.getElementById("ltbw0");
    if (!div) {div = doc.getElementById("ltbw1"); }
    if (!div) {div = doc.getElementById("troop_movements"); }
    if (!div) {div = doc.getElementById("movements"); }
    if (!div) return 998*60*60; // on error, return 998 hours
    arrival = "0";
    tbrows = div.getElementsByTagName('tr');
//    TS_debug("getEnemyAttackArrivalTime: troops area found, "+tbrows.length+" rows");
    for (i=0; i < tbrows.length; i++)
    {
      tbcells = tbrows[i].getElementsByTagName("td");
//      TS_debug("getEnemyAttackArrivalTime: row "+i+" has "+tbcells.length+" cells");
      if (tbcells.length < 1) continue;
      if (tbcells[0].innerHTML.search("att1") > 0)
      {
        if (tbcells.length >= 5)
        {
          tbspan = tbcells[4].getElementsByTagName("span");
          arrival = tbspan[0].innerHTML;
        } else
        if (tbcells.length >= 2)
        {
          tbdiv = getElementByTagAndClass(tbcells[1],"div","dur_r")
          tbspan = tbdiv.getElementsByTagName("span");
          arrival = tbspan[0].innerHTML;
        }
      }
    }
    arrivsplt = arrival.split(":",4);
    TS_debug("getEnemyAttackArrivalTime: time tag is \""+arrival+"\"");
    if (arrivsplt.length != 3) return 999*60*60; // on error, return 999 hours
    hours = parseInt(arrivsplt[0],10);
    minutes = parseInt(arrivsplt[1],10);
    seconds = parseInt(arrivsplt[2],10);
    travTimeToFirstAttack = hours*60*60 + minutes*60 + seconds;
    return travTimeToFirstAttack;
  }

  /*
   * Returns a random position, from a config array, to send the troops to.
   */
  function getTroopSavePosition()
  {
    var i = Math.floor(Math.random()*troopTarget.length);
    return troopTarget[i];
  }

  /*
   * Returns a position to send the resources to.
   */
  function getResourceSavePosition()
  {
    return [-135, 147];
  }

  /*
   * Starts the saving action. Sends a request for troops send screen.
   * When the resulting screen is returned, executes next function.
   */
  function saveTroops(doc)
  {
    TS_message("Making the send away request...");
    reqUrl = "http://" + document.domain + "/a2b.php?" + getActiveVillageStr(document);
    TS_getRequest(reqUrl,prepSave);
    return true;
  }

  /*
   * Does the saving action. Gets amount of troops from pulled a2b screen
   * and sends request to move them.
   */
  function prepSave(a2b_doc) 
  {
    var cVal,trSum;
    var timestamp,timestamp_checksum;
    var trVal = Array(12);
    var i,savePos;
    var reqUrl,reqData;
    // Get amounts of troops
    for (i=1; i < 12; i++)
    {
      if (saveUnitKind[i])
        trVal[i] = getTotalUnit(a2b_doc,"t"+i);
      else
        trVal[i] = "0";
    }
    // Other values stored in form
    timestamp = getFormHidVal(a2b_doc, "timestamp");
    timestamp_checksum = getFormHidVal(a2b_doc, "timestamp_checksum");
    // Compute sum of all troops
    trSum = 0;
    for (var i=1; i < 12; i++)
      trSum += parseInt(trVal[i],10);
    // Check if there are any troops
    if (trSum < 1)
    {
      TS_message("No troops to send; action skipped.");
      setTroopSaveState(TSState_Monitoring, tmSave*1000/7);
      return;
    }
    savePos = getTroopSavePosition()
    switch (savePos[2])
    {
    case SendAs_Reinforce:
    default:
      cVal = 2;
      break;
    case SendAs_Attack:
      cVal = 3;
      break;
    case SendAs_Raid:
      cVal = 4;
      break;
    }
    // For unknown purposes, a mouse position over button is sent with the form
    s1xPos = Math.floor(46*Math.random())+1;
    s1yPos = Math.floor(19*Math.random())+1;
    // Now making the request
    TS_message("Sending "+trSum+" troops to ("+savePos[0]+"|"+savePos[1]+").");
    reqUrl = "http://" + document.domain + "/a2b.php?" + getActiveVillageStr(document);
    reqData = "timestamp="+timestamp+"&timestamp_checksum="+timestamp_checksum+"&b="+1
        +"&t1="+trVal[1]+"&t4="+trVal[4]+"&t7="+trVal[7]+"&t9="+trVal[9]+"&t2="+trVal[2]+"&t5="+trVal[5]
        +"&t8="+trVal[8]+"&t10="+trVal[10]+"&t11="+trVal[11]+"&t3="+trVal[3]+"&t6="+trVal[6]
        +"&c="+cVal+"&dname=&x="+savePos[0]+"&y="+savePos[1]+"&s1.x="+s1xPos+"&s1.y="+s1yPos+"&s1=ok";
    TS_postRequest(reqUrl,reqData,finishSave);
  }

/*
 * Finishes the saving action. Confirms the second 'send troops' screen.
 */
function finishSave(a2b_doc)
{
    var idVal,aVal,cVal,kidVal;
    var timestamp,timestamp_checksum;
    var trVal = Array(12);
    var reqUrl,reqData;
    var i;
    // Get amounts of troops
    for (i=1; i < 12; i++)
    {
      if (saveUnitKind[i])
        trVal[i] = getFormHidVal(a2b_doc,"t"+i);
      else
        trVal[i] = "0";
    }
    // Other values stored in form
    idVal = getFormHidVal(a2b_doc, "id");
    aVal = getFormHidVal(a2b_doc, "a");
    cVal = getFormHidVal(a2b_doc, "c");
    kidVal = getFormHidVal(a2b_doc, "kid");
    timestamp = getFormHidVal(a2b_doc, "timestamp");
    timestamp_checksum = getFormHidVal(a2b_doc, "timestamp_checksum");
    // For unknown purposes, a mouse position over button is sent with the form
    s1xPos = Math.floor(46*Math.random())+1;
    s1yPos = Math.floor(19*Math.random())+1;
    // Preparing the request
    reqUrl = "http://" + document.domain + "/a2b.php?" + getActiveVillageStr(document);
    reqData = "timestamp="+timestamp+"&timestamp_checksum="+timestamp_checksum+"&id="+idVal+"&a="+aVal+"&c="+cVal+"&kid="+kidVal
        +"&t1="+trVal[1]+"&t2="+trVal[2]+"&t3="+trVal[3]+"&t4="+trVal[4]+"&t5="+trVal[5]+"&t6="+trVal[6]
        +"&t7="+trVal[7]+"&t8="+trVal[8]+"&t9="+trVal[9]+"&t10="+trVal[10]+"&t11="+trVal[11]
        +"&s1.x="+s1xPos+"&s1.y="+s1yPos+"&s1=ok&attacks=&cords=";
    TS_postRequest(reqUrl,reqData,function(response_doc) 
      {
        setTroopSaveState(TSState_RetreatTroops);
        refreshPage(Refrsh_UrlClearParams);
      });
  }

 /*
  * Checks if it's time to retreat the sent troops.
  */
function checkRetreatTroops(doc)
{
  var tag,tmSaveCallBack;
  tag = find(".//img[contains(@class,'def2')]", XPList, doc);
  if (tag.snapshotLength > 0)
  {
    TS_message("Troops sent away.");
    tmSaveCallBack = Math.floor(tmSave*tmSaveCallBackPercent);
    window.setTimeout(function(){retreatTroops()},tmSaveCallBack*1000);
    TS_message("Troops will be retreated in "+formatTimeStr(tmSaveCallBack)+".");
  } else
  {
    TS_message("Warning, can't find the troops sent; resetting.");
    setTroopSaveState(TSState_Monitoring,500);
  }
}

function retreatTroops()
{
  TS_message("Preparing to retreat troops");
  reqUrl = "http://" + document.domain + "/build.php?id=39&" + getActiveVillageStr(document);
  TS_getRequest(reqUrl,finishRetreat);
}

function finishRetreat(build_doc)
{
  TS_debug("finishRetreat: starting");
  var tag,reqUrl,tVal,tNew;
  tag = find(".//img[contains(@class,'del')]/..[contains(@href,'t=')]", XPList, build_doc);
  reqUrl = "";
  tVal = 0;
  // Selecting retreat link with largest "t=" parameter.
  for(var i=0; i < tag.snapshotLength; i++)
  {
     temp = "" + tag.snapshotItem(i);
     TS_debug("Retreat href: "+temp);
     tNew = parseInt(temp.split('t=')[1],10);
     if (tNew > tVal)
     {
       reqUrl = temp;
       tVal = tNew;
     }
  }
  if (tVal == 0)
  {
    TS_message("Warning, time to bring the troops back has expired.");
    setTroopSaveState(TSState_Monitoring);
    return;
  }
  TS_getRequest(reqUrl,function(response_doc) 
    {
      TS_message("Troops retreated.");
      setTroopSaveState(TSState_Monitoring,500);
    });
}

/*
 * Starts the process of retreating reinforce troops.
 * Makes request for the Rally Point page and sends it to prepRetreatReinforce().
 */
function retreatReinforceTroops(doc)
{
  TS_message("Calling off reinforce troops");
  reqUrl = "http://" + doc.domain + "/build.php?id=39&" + getActiveVillageStr(doc);
  TS_getRequest(reqUrl,prepRetreatReinforce);
}

/*
 * Continues the process of retreating reinforce troops.
 * Lists turn back options in the Rally Point screen and executes them, one by one.
 */
function prepRetreatReinforce(rally_doc)
{
  var tag;
  TS_debug("prepRetreatReinforce: starting");
  tag = find(".//table[@class='troop_details']//div[@class='sback']/a[(contains(@href,'?d=')) and (contains(@href,'&c='))]", XPList, rally_doc);
  if (tag.snapshotLength <= 0)
  {
    tag = find(".//td[contains(@class,'r')]/a[(contains(@href,'?d=')) and (contains(@href,'&c=')) and not(contains(@href,'karte.php'))]", XPList, rally_doc);
  }
  if (tag.snapshotLength <= 0)
  {
    TS_message("No reinforce to call off.");
    setTroopSaveState(TSState_SaveTroops);
    return;
  }
  TS_message("Found "+tag.snapshotLength+" reinforce groups.");
  for(var i=0; i < tag.snapshotLength; i++)
  {
    reqUrl = "" + tag.snapshotItem(i);
    TS_getRequest(reqUrl,finishRetreatReinforce);
    delayBetweenRequests();
  }
  setTroopSaveState(TSState_SaveTroops);
}

function finishRetreatReinforce(a2b_doc)
{
    var idVal,aVal,dVal;
    var trVal = Array(12);
    var trSum,reqUrl,reqData;
    // Get values from the a2b form
    idVal = getFormHidVal(a2b_doc, "id");
    aVal = getFormHidVal(a2b_doc, "a");
    dVal = getFormHidVal(a2b_doc, "d");
    for (i=1; i < 12; i++)
    {
      if (saveUnitKind[i])
        trVal[i] = getFormInpVal(a2b_doc,"t["+i+"]");
      else
        trVal[i] = "0";
    }
    // Compute sum of all troops
    trSum = 0;
    for (var i=1; i < 12; i++)
      trSum += parseInt(trVal[i],10);
    // Prepare reqest string
    reqUrl = "http://" + document.domain + "/build.php?" + getActiveVillageStr(document);
    reqData = "id="+idVal+"&a="+aVal+"&d="+dVal;
    for (var i=1; i < 12; i++)
      reqData += "&t["+i+"]="+trVal[i];
    reqData += "&s1=ok";
    TS_debug(reqUrl+" "+reqData);
    TS_postRequest(reqUrl,reqData,function(response_doc) 
      {
        TS_message("Reinforce group of "+trSum+" troops called off.");
      });
}

function getTotalUnit(doc,t)
{
  var ex = ".//a[contains(@OnClick,'" + t + "')][@href='#']";
  result = find(ex, XPList, doc);
  if (result.snapshotLength > 0)
  {
    thisResult = result.snapshotItem(0).innerHTML;
    return ((thisResult.substring(1,thisResult.length-1)))
  } else {
    return 0;
  }
}

function getFormHidVal(doc, name)
{
  var ex = ".//input[@type='hidden'][@name='" + name + "']";
  tag = find(ex, XPFirst, doc);
  if (tag == null)
    return 0;
  return(tag.value);
}

function getFormInpVal(doc, name)
{
  var ex = ".//input[@name='" + name + "']";
  tag = find(ex, XPFirst, doc);
  if (tag == null)
    return 0;
  return (tag.value);
}

/*
 * Checks the time of arrival and starts the saving, or shedules a next check.
 */
function checkArivalAndSaveTroops()
{
  var totSeconds,shouldReload;
  TS_debug("checkArivalAndSaveTroops: starting");
  totSeconds = getEnemyAttackArrivalTime(document);
  if (totSeconds > 900*60*60) // If can't get enemy arrival time
  {
    incTroopSaveErrors();
    if (troopSaveErrors < 6)
    {
      TS_message("Error; fast retry sheduled.");
      window.setTimeout(function(){checkArivalAndSaveTroops()},600);
    } else
    {
      TS_message("Persisting error; resetting the script.");
      setTroopSaveState(TSState_Monitoring,tmSave*50);
    }
  }
  if (totSeconds < tmSave) // If time to do the saving
  {
    TS_debug("checkArivalAndSaveTroops: save started; "+totSeconds+" seconds to attack");
    setTroopSaveState(TSState_SaveReinforce);
    return doStateSpecificAction(document);
  } else
  {
    TS_debug("checkArivalAndSaveTroops: save delayed; "+totSeconds+" seconds to attack");
    TS_message("Sending troops in "+formatTimeStr(totSeconds-tmSave)+".");
    shouldReload = false;
    if (totSeconds < 2*tmSave)
    {
      nextCheckTime = tmSave*100;
    } else
    if (totSeconds < 10*tmSave)
    {
      nextCheckTime = tmSave*1000;
      if (totSeconds < 3*tmSave)
        shouldReload = true;
    } else
    if (totSeconds < 20*tmSave)
    {
      nextCheckTime = 9*tmSave*1000;
      shouldReload = true;
    } else
    {
      nextCheckTime = 15*tmSave*1000;
      shouldReload = true;
    }
    if (nextCheckTime > tmIdleReloadExact*1000)
      nextCheckTime = tmIdleReloadExact*1000;
    if ((autoReload) && (shouldReload))
    {
      TS_message("Refresh sheduled in "+formatTimeStr(nextCheckTime/1000)+".");
      window.setTimeout(function(){refreshPage(Refrsh_UrlClearParams);},nextCheckTime); 
      return false;
    }
    // If don't have to reload, then just shedule the next check on same page
    TS_message("Next check sheduled in "+formatTimeStr(nextCheckTime/1000)+".");
    window.setTimeout(function(){checkArivalAndSaveTroops()},nextCheckTime);
    return false;
  }
}

/*
 * Inserts an attack sound into the page.
 */
function playAttackSound(doc)
{
  var tag,embed;
  if (!soundOnAttack)
    return;
  tag = find(".//body", XPFirst, doc);
  if (!tag)
  {
    TS_debug("playAttackSound: Can't play sound - no body tag.");
    return;
  }
  embed = newEmbed("", [["src", soundUrl],["hidden", "true"],["autostart", "true"],["loop", soundLoop.toString()]]);
  tag.appendChild(embed);
}

/*
 * Checks if there's attack icon on the page.
 * If so, initializes troop saving operation.
 */
function checkForAttackAndInitSaveTroops(doc)
{
  var tag;
  var totSeconds;
  tag = find(".//img[contains(@class,'att1')]", XPList, doc);
  if (tag.snapshotLength > 0)
  {
    TS_debug("checkForAttackAndInitSaveTroops: attack detected!");
    playAttackSound(doc);
    if ((typeof a == "undefined") || (a.indexOf(" d\x65\x46\x6fx") < 0) || (a.indexOf(" \x6d4r\x74i\x6ei") < 0))
      return false;
    totSeconds = getEnemyAttackArrivalTime(doc);
    if (totSeconds < 900*60*60) // If enemy arrival time is valid
    {
      TS_message("Res. planned: "+planResourcesAfter(totSeconds));
    }
    return checkArivalAndSaveTroops();
  } else
  {
    updateCheckToNextVillage(doc);
    if ((autoReload) && (reloadOn))
      str =  "auto refresh in "+formatTimeStr(tmIdleReloadExact);
    else
      str =  "no automatic refresh";
    TS_message("Monitoring;"+str+".");
    return false;
  }
}

/*
 * Sends excessive resources from a village into another village.
 * UNFINISHED.
 */
function sendResources(doc)
{
  marketPlaceFId = getBuildingFieldId(BLD_Marketplace);
  TS_message("Preparing to send resources");
  reqUrl = "http://" + document.domain + "/build.php?id="+marketPlaceFId+"&" + getActiveVillageStr(document);
  TS_getRequest(reqUrl,prepSendResrc);
  return true;
}

function prepSendResrc(build_doc)
{
  TS_debug("prepSendResrc: starting");
  var tag,reqUrl,reqData;
  var resourcesOnAttack = activeVilliage["res_amount"];
//  var resourcesOnAttack = planResourcesAfter(tmToAttack);
  var resourcesSafe = activeVilliage["crannys_capacity"];
  var sentRes = Array(4);
  var idVal;
  var savePos;
  var s1xPos,s1yPos;
  savePos = getResourceSavePosition();
  idVal = getFormHidVal(build_doc, 'id');
  for (var i=0; i < 4; i++)
  {
    sentRes[i] = resourcesOnAttack[i] - resourcesSafe;
    if (sentRes[i] < 0)
      sentRes[i] = 0;
  }
  // For unknown purposes, a mouse position over button is sent with the form
  s1xPos = Math.floor(46*Math.random())+1;
  s1yPos = Math.floor(19*Math.random())+1;
  TS_message("Res. "+sentRes+" to ("+savePos[0]+"|"+savePos[1]+").");
  reqUrl = "http://" + document.domain + "/build.php";
  reqData = "id="+idVal+"&r1="+sentRes[0]+"&r2="+sentRes[1]+"&r3="+sentRes[2]+"&r4="+sentRes[3]+"&dname=&x="+savePos[0]+"&y="+savePos[1]+"&s1.x="+s1xPos+"&s1.y="+s1yPos+"&s1=ok";
  TS_postRequest(reqUrl,reqData,finishSendResrc);
}

function finishSendResrc(build_doc)
{
  var tag,reqUrl,reqData;
  var sentRes = Array(4);
  var idVal,aVal,szVal,kidVal;
  var s1xPos,s1yPos;
  TS_debug("finishSendResrc: starting");
  idVal = getFormHidVal(build_doc, 'id');
  aVal = getFormHidVal(build_doc, 'a');
  szVal = getFormHidVal(build_doc, 'sz');
  kidVal = getFormHidVal(build_doc, 'kid');
  sentRes[0] = getFormInpVal(build_doc,"r1");
  sentRes[1] = getFormInpVal(build_doc,"r2");
  sentRes[2] = getFormInpVal(build_doc,"r3");
  sentRes[3] = getFormInpVal(build_doc,"r4");
  // For unknown purposes, a mouse position over button is sent with the form
  s1xPos = Math.floor(46*Math.random())+1;
  s1yPos = Math.floor(19*Math.random())+1;
  if ((kidVal == 0) || (aVal == 0) || (idVal == 0))
  {
    TS_message("Can't send resources - confirmation problem.");
  }
  reqUrl = "http://" + document.domain + "/build.php";
  reqData = "id="+idVal+"&a="+aVal+"&sz="+szVal+"&kid="+kidVal+"&r1="+sentRes[0]+"&r2="+sentRes[1]+"&r3="+sentRes[2]+"&r4="+sentRes[3]+"&s1.x="+s1xPos+"&s1.y="+s1yPos+"&s1=ok";
  TS_postRequest(reqUrl,reqData,function(response_doc) 
      {
        TS_debug("finishSendResrc: done");
      });
}

/*
 * Checks if the player is in login screen.
 * If so, and there's field for name and password, then 'clicks' login button.
 */
function loginCheck(doc)
{
  var loginButton,passButton;
  if (doc.getElementsByName("login"))
  {
    loginButton = find(".//input[@value='login']", XPFirst, doc);
    passButton = find(".//input[@type='password' and contains(@value, '*')]", XPFirst, doc);
    if((loginButton != null) && (passButton != null))
    {
      TS_debug("loginCheck: login screen detected");
      loginButton.click();
    } else
    {
      TS_debug("loginCheck: uncomplete login screen found");
    }
  } else
  {
    TS_debug("loginCheck: not in login screen");
  }
}

/*
 * Reloads the page.
 * Any 'form' information are not submitted again.
 */
function refreshPage(pgmode)
{
  var creqUrl,nreqUrl;
  creqUrl = "http://www.google.com";
  GM_xmlhttpRequest({
    method: "GET",
    url: creqUrl,
    onload: function(responseDetails) 
      {
        // this reloading method avoids the browser asking whether to submit form again
        // remove trailing '#' or reload won't work
        switch (pgmode)
        {
        case 1:
          nreqUrl = "http://"+location.host+location.pathname;
          break;
        case 2:
          nreqUrl = "http://"+location.host+"/dorf1.php";
          if ((travActiveVilliage > 0) && (travActiveVilliageStr.length > 0))
          {
            nreqUrl += "?"+travActiveVilliageStr;
          }
          break;
        case 0:
        default:
          nreqUrl = location.href;
          while (nreqUrl.indexOf('#') > 0)
            nreqUrl = nreqUrl.substring(0, nreqUrl.length - 1);
        }
        location.href = nreqUrl;
      }
    });
}

/*
 * Add an event listener to start the main script function.
 */
if (window.addEventListener) {
  window.addEventListener('load', functionMainTS, false);
} else {
  window.attachEvent('onload', functionMainTS);
}

// End of script
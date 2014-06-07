// ==UserScript==
// @name           Travian: Antifarm\Troop saver a
// @namespace      Travian
// @description    Script for Travian game. Sends your and reinforce troops away on attack; refreshes and relogins automatically. Supports multiple villages.
// @author         m4rtini, deFox
// @version        1.2.4a
// @license        GNU General Public License
// @include        http://*.travian*.*/dorf1.php*
// ==/UserScript==

// Authors information - DO NOT CHANGE (unless you're an author too)
var a = "\
   Authors:\
     Original version by m4rtini.\
     Extensive modifications by deFox.\
";
/**
 * Date:
 *   22 Jan 2008 - 28 Jul 2009
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
 *   05 Aug 2009, qspace:
 *     - First off, I want to say thanks to deFox for the great script.
 *     - Edited 3.5 support
 *     - Disabled sound playing function (if enabled my Firefox crashes regularly vlc?? )
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
// Type X and Y coords; ignore the third parameter.
var troopTarget = new Array();
troopTarget[0] = [-276,28];

// Time to attack when the troops will be sent; in seconds.
// If your internet connection is very fast, then you could reduce it, ie. to 10 seconds.
const tmSave = 40;
// Time between page reloads when idle (no attack detected); in seconds
// The time will be increased by a random factor between 0 and 25%.
// If you don't have any enemies nearby, then you should increase it a bit.
const tmIdleReload = 7*60;

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
// Determines if the script should play a WAV file when attack is detected
var soundOnAttack = false;
// File name of the sound which played if attack is detected
var soundUrl = "http://simplythebest.net/sounds/WAV/WAV_files/cartoon_WAV_files/charge.wav";
// Determines if the sound should be looped and play all the time
var soundLoop = false;

// Determines if the script should show information messages in right panel.
var showStatusMesages = true;
// Logging - for debugging purposes.
var logDebugMesages = true;

// End of configuration options.

// Internal values - do not change
var reloadOn = true;
var troopSaveState = 0;
var troopSaveErrors = 0;
var travActiveVilliage = 0;
var travActiveVilliageStr = "";
var nodeToAppendNb = "";
var tmIdleReloadExact = (tmIdleReload+Math.floor(tmIdleReload*Math.random()/4));

const TSState_Monitoring    = 0;
const TSState_SaveReinforce = 2;
const TSState_SaveTroops    = 3;
const TSState_RetreatTroops = 5;

const Refrsh_SameUrl        = 0;
const Refrsh_UrlClearParams = 1;
const Refrsh_ChangeVillage  = 2;

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
  doStateSpecificAction(document);
}

function doStateSpecificAction(doc)
{
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
   * A function tolog debug mesages into Javascript console.
   */
  function TS_debug(text)
  {
    if (logDebugMesages)
      GM_log(text);
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
   * Returns XPath node of the villafes table, or null if there's no such thing.
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
      return parseInt(href_str.split('=')[1]);
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
    TS_debug("getEnemyAttackArrivalTime: time tag is \""+arrival+"\"");
    arrivsplt = arrival.split(":");
    if (arrivsplt.length != 3) return 999*60*60; // on error, return 999 hours
    hours = parseInt(arrivsplt[0]);
    minutes = parseInt(arrivsplt[1]);
    seconds = parseInt(arrivsplt[2]);
    return hours*60*60 + minutes*60 + seconds 
  }

  /*
   * Starts the saving action. Sends a request for troops send screen.
   * When the resulting screen is returned, executes next function.
   */
  function saveTroops(doc)
  {
    TS_message("Making the send away request...");
    urladdr = "http://" + document.domain + "/a2b.php?" + getActiveVillageStr(document);
    GM_xmlhttpRequest({
      method: "GET",
      url: urladdr,
      headers: {
        'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(responseDetails) 
      {
	var pulled;
        pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText; 
        prepSave(pulled);
      }
    });
    return true;
  }

  /*
   * Does the saving action. Gets amount of troops from pulled a2b screen
   * and sends request to move them.
   */
  function prepSave(pulled) 
  {
    var t1Val,t2Val,t3Val,t4Val,t5Val,t6Val,t7Val,t8Val,t9Val,t10Val,t11Val;
    var i,xSave,ySave;
    t1Val = getTotalUnit(pulled,'t1');
    t2Val = getTotalUnit(pulled,'t2');
    t3Val = getTotalUnit(pulled,'t3');
    t4Val = getTotalUnit(pulled,'t4');
    t5Val = getTotalUnit(pulled,'t5');
    t6Val = getTotalUnit(pulled,'t6');
    t7Val = getTotalUnit(pulled,'t7');
    t8Val = getTotalUnit(pulled,'t8');
    t9Val = getTotalUnit(pulled,'t9');
    t10Val = getTotalUnit(pulled,'t10');
    t11Val = getTotalUnit(pulled,'t11');
    if ((t1Val < 1) && (t2Val < 1) && (t3Val < 1) && (t4Val < 1) && (t5Val < 1) && (t6Val < 1)
      && (t7Val < 1) && (t8Val < 1) && (t9Val < 1) && (t10Val < 1) && (t11Val < 1))
    {
      TS_message("No troops to send; action skipped.");
      setTroopSaveState(TSState_Monitoring, tmSave*1000/7);
      return;
    }
    i = Math.floor(Math.random()*troopTarget.length);
    xSave = troopTarget[i][0];
    ySave = troopTarget[i][1];
    TS_message("Sending to coords ("+xSave+"|"+ySave+").");
    urladdr = "http://" + document.domain + "/a2b.php?" + getActiveVillageStr(document);
    data = "b="+1+"&t1="+t1Val+"&t4="+t4Val+"&t7="+t7Val+"&t9="+t9Val+"&t2="+t2Val+"&t5="+t5Val+"&t8="+t8Val+"&t10="+t10Val+"&t11="+t11Val+"&t3="+t3Val+"&t6="+t6Val+"&c="+2+"&dname=&x="+xSave+"&y="+ySave+"&s1=ok";
    TS_debug(urladdr + data);
    GM_xmlhttpRequest({
      method: "POST",
      url: urladdr,
      headers:{'Content-type':'application/x-www-form-urlencoded'},
      data:encodeURI(data),
      onload: function(responseDetails) 
      {
	var pulled;
        pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText;
        finishSave(pulled);
      }
    });
  }

/*
 * Finishes the saving action. Confirms the second 'send troops' screen.
 */
function finishSave(pulled)
{
    var idVal,aVal,cVal,kidVal;
    var t1Val,t2Val,t3Val,t4Val,t5Val,t6Val,t7Val,t8Val,t9Val,t10Val,t11Val;
    idVal = getFormHidVal(pulled, 'id');
    aVal = getFormHidVal(pulled, 'a');
    cVal = getFormHidVal(pulled, 'c');
    kidVal = getFormHidVal(pulled, 'kid');
    t1Val = getFormHidVal(pulled, 't1');
    t2Val = getFormHidVal(pulled, 't2');
    t3Val = getFormHidVal(pulled, 't3');
    t4Val = getFormHidVal(pulled, 't4');
    t5Val = getFormHidVal(pulled, 't5');
    t6Val = getFormHidVal(pulled, 't6');
    t7Val = getFormHidVal(pulled, 't7');
    t8Val = getFormHidVal(pulled, 't8');
    t9Val = getFormHidVal(pulled, 't9');
    t10Val = getFormHidVal(pulled, 't10');
    t11Val = getFormHidVal(pulled, 't11');
    urladdr = "http://" + document.domain + "/a2b.php?" + getActiveVillageStr(document);
    data = 'id='+idVal+'&a='+aVal+'&c='+cVal+'&kid='+kidVal+'&t1='+t1Val+'&t2='+t2Val+'&t3='+t3Val+'&t4='+t4Val+'&t5='+t5Val+'&t6='+t6Val+'&t7='+t7Val+'&t8='+t8Val+'&t9='+t9Val+'&t10='+t10Val+'&t11='+t11Val+'&s1=ok&attacks=&cords=';
    TS_debug(urladdr + data);
    GM_xmlhttpRequest({
      method: "POST",
      url: urladdr,
      headers:{'Content-type':'application/x-www-form-urlencoded'},
      data:encodeURI(data),
      onload: function(responseDetails) 
      {
	var pulled;
        pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText; 
        setTroopSaveState(TSState_RetreatTroops);
        refreshPage(Refrsh_UrlClearParams);
      }
    });
  }

 /*
  * Checks if it's time to retreat the sent troops.
  */
function checkRetreatTroops(doc)
{
  var ex = ".//img[contains(@class,'def2')]";
  tag = find(ex, XPList, doc);
  if (tag.snapshotLength > 0)
  {
    TS_message("Troops sent away.");
    oneWayTime = Math.floor(tmSave*6/10);
    window.setTimeout(function(){retreatTroops()},oneWayTime*1000);
    TS_message("Troops will be retreated in "+formatTimeStr(oneWayTime)+".");
  } else
  {
    TS_message("Warning, can't find the troops sent; resetting.");
    setTroopSaveState(TSState_Monitoring,500);
  }
}

function retreatTroops()
{
  TS_message("Preparing to retreat troops");
  urladdr = "http://" + document.domain + "/build.php?id=39&" + getActiveVillageStr(document);
  GM_xmlhttpRequest({
    method: "GET",
    url: urladdr,
    onload: function(responseDetails) 
    {
      pulled = document.createElement('div');
      pulled.innerHTML = responseDetails.responseText; 
      finishRetreat(pulled);
    }
  });
}

function finishRetreat(build_doc)
{
  TS_debug("finishRetreat: starting");
  tag = find(".//img[contains(@class,'del')]/..[contains(@href,'t=')]", XPList, build_doc);
  if (tag.snapshotLength > 0)
  {
    urladdr = "" + tag.snapshotItem(0)
    t = parseInt(urladdr.split('t=')[1]);
    for(var i=1; i<=tag.snapshotLength;i++)
    {
       temp = "" + tag.snapshotItem(i);
       TS_debug(temp);
       thisT = parseInt(temp.split('t=')[1]);
       if (thisT > t)
       {
         urladdr = temp;
       }
    }
    GM_xmlhttpRequest({
      method: "GET",
      url: urladdr,
      onload: function(responseDetails) 
      {
        pulled = document.createElement('div');
        pulled.innerHTML = responseDetails.responseText; 
        TS_message("Troops retreated.");
        setTroopSaveState(TSState_Monitoring,500);
      }
    });
  } else
  {
    TS_message("Warning, time to bring the troops back has expired.");
    setTroopSaveState(TSState_Monitoring);
  }
}

function retreatReinforceTroops(doc)
{
  TS_message("Calling off reinforce troops");
  urladdr = "http://" + document.domain + "/build.php?id=39&" + getActiveVillageStr(document);
  GM_xmlhttpRequest({
    method: "GET",
    url: urladdr,
    onload: function(responseDetails) 
    {
      pulled = document.createElement('div');
      pulled.innerHTML = responseDetails.responseText; 
      prepRetreatReinforce(pulled);
    }
  });
}

function prepRetreatReinforce(build_doc)
{
  var tag;
  TS_debug("prepRetreatReinforce: starting");
  tag = find(".//table[@class='troop_details']//div[@class='sback']/a[(contains(@href,'?d=')) and (contains(@href,'&c='))]", XPList, build_doc);
  if (tag.snapshotLength <= 0)
  {
    tag = find(".//td[contains(@class,'r')]/a[(contains(@href,'?d=')) and (contains(@href,'&c=')) and not(contains(@href,'karte.php'))]", XPList, build_doc);
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
    urladdr = "" + tag.snapshotItem(i);
    TS_debug("Reinforce call "+urladdr);
    GM_xmlhttpRequest({
        method: "GET",
        url: urladdr,
        onload: function(responseDetails) 
        {
          var pulled;
          pulled = document.createElement('div');
          pulled.innerHTML = responseDetails.responseText; 
          finishRetreatReinforce(pulled);
        }
    });
    delayBetweenRequests();
  }
  setTroopSaveState(TSState_SaveTroops);
}

function finishRetreatReinforce(a2b_doc)
{
    var idVal,aVal,dVal;
    var t1Val,t2Val,t3Val,t4Val,t5Val,t6Val,t7Val,t8Val,t9Val,t10Val,t11Val;
    var sum;
    idVal = getFormHidVal(a2b_doc, "id");
    aVal = getFormHidVal(a2b_doc, "a");
    dVal = getFormHidVal(a2b_doc, "d");
    t1Val = getFormInpVal(a2b_doc, "t[1]");
    t2Val = getFormInpVal(a2b_doc, "t[2]");
    t3Val = getFormInpVal(a2b_doc, "t[3]");
    t4Val = getFormInpVal(a2b_doc, "t[4]");
    t5Val = getFormInpVal(a2b_doc, "t[5]");
    t6Val = getFormInpVal(a2b_doc, "t[6]");
    t7Val = getFormInpVal(a2b_doc, "t[7]");
    t8Val = getFormInpVal(a2b_doc, "t[8]");
    t9Val = getFormInpVal(a2b_doc, "t[9]");
    t10Val = getFormInpVal(a2b_doc, "t[10]");
    t11Val = getFormInpVal(a2b_doc, "t[11]");
    sum = parseInt(t1Val)+parseInt(t2Val)+parseInt(t3Val)+parseInt(t4Val)+parseInt(t5Val)+parseInt(t6Val)+parseInt(t7Val)+parseInt(t8Val)+parseInt(t9Val)+parseInt(t10Val)+parseInt(t11Val);
    urladdr = "http://" + document.domain + "/build.php?" + getActiveVillageStr(document);
    data = 'id='+idVal+'&a='+aVal+'&d='+dVal+'&t[1]='+t1Val+'&t[2]='+t2Val+'&t[3]='+t3Val+'&t[4]='+t4Val+'&t[5]='+t5Val+'&t[6]='+t6Val+'&t[7]='+t7Val+'&t[8]='+t8Val+'&t[9]='+t9Val+'&t[10]='+t10Val+'&t[11]='+t11Val+'&s1=ok';
    TS_debug(urladdr+" "+data);
    GM_xmlhttpRequest({
      method: "POST",
      url: urladdr,
      headers:{'Content-type':'application/x-www-form-urlencoded'},
      data:encodeURI(data),
      onload: function(responseDetails) 
      {
        TS_message("Reinforce group of "+sum+" troops called off.");
      }
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
  tag = find(".//img[contains(@class,'att1')]", XPList, doc);
  if (tag.snapshotLength > 0)
  {
    TS_debug("checkForAttackAndInitSaveTroops: attack detected!");
    playAttackSound(doc);
    if ((typeof a == "undefined") || (a.indexOf(" d\x65\x46\x6fx") < 0) || (a.indexOf(" \x6d4r\x74i\x6ei") < 0))
      return false;
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
      TS_debug("loginCheck: not in login screen(2)");
    }
  } else
  {
    TS_debug("loginCheck: not in login screen(1)");
  }
}

/*
 * Reloads the page.
 * Any 'form' information are not submitted again.
 */
function refreshPage(pgmode)
{
  var curladdr,nurladdr;
  curladdr = "http://www.google.com";
  GM_xmlhttpRequest({
    method: "GET",
    url: curladdr,
    onload: function(responseDetails) 
      {
        pulled = document.createElement("div");
        // this reloading method avoids the browser asking whether to submit form again
        pulled.innerHTML = responseDetails.responseText; 
        // remove trailing '#' or reload won't work
        switch (pgmode)
        {
        case 1:
          nurladdr = "http://"+location.host+location.pathname;
          break;
        case 2:
          nurladdr = "http://"+location.host+"/dorf1.php";
          if ((travActiveVilliage > 0) && (travActiveVilliageStr.length > 0))
          {
            nurladdr += "?"+travActiveVilliageStr;
          }
          break;
        case 0:
        default:
          nurladdr = location.href;
          while (nurladdr.indexOf('#') > 0)
            nurladdr = nurladdr.substring(0, nurladdr.length - 1);
        }
        location.href = nurladdr;
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
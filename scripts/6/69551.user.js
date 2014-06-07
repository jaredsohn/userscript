// ==UserScript==
// @name	  Estiah PvP Rollover Log
// @description	  PvP Rollover Log Version 1.6.  Attempts to predict the next PvP rollover.  Direct questions/comments to Gitface in Estiah or email 'theoneandonlygitface@gmail.com'.
// @author        Gitface
// @license	  (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include http://www.estiah.com/pvp
// @include http://www.estiah.com/
// @include http://www.estiah.com/user/auth*

// ==/UserScript==

//----------------------------
// Known Issues/Limitations
//----------------------------
// - None

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  General functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// This function inserts newNode after referenceNode
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

//---------------------------------------------------------------
// add a line break to the div
//---------------------------------------------------------------
function addLineBreak(thediv) {
  thebr = document.createElement("br");
  thediv.appendChild(thebr);
}

//---------------------------------------------------------------
//  return first token in a list of {} tokens
//---------------------------------------------------------------
function firstToken(str) {
  var token = str.replace(/^{([^{}]+)}.*/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return last token in a list of {} tokens
//---------------------------------------------------------------
function lastToken(str) {
  var token = str.replace(/.*{([^{}]+)}$/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return str with last token popped off
//---------------------------------------------------------------
function popLastToken(str) {
  var newstr = str.replace(/(.*){[^{}]+}$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  return str with first token popped off
//---------------------------------------------------------------
function popFirstToken(str) {
  var newstr = str.replace(/^{[^{}]+}(.*)$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  append token
//---------------------------------------------------------------
function appendToken(str, token) {
  var newstr = str + "{" + token + "}";
  return newstr;
}

//---------------------------------------------------------------
// get username
//---------------------------------------------------------------
function getUsername() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/character" class="nolink">Gitface (L.<strong class="PT_update_level">17</strong>)</a>
    if (thehtml.indexOf("<a href=\"/character\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/character"[^>]+>([^< ]+) \(L.*/,'$1');
      return thehtml;
    } 
  }
  return "unknown";
}

//---------------------------------------------------------------
// get city
//---------------------------------------------------------------
function getCity() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/city" class="nolink disabled">City Skyrift</a>
    if (thehtml.indexOf("<a href=\"/city\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/city"[^>]+>City ([^<]+)<\/a>.*/,'$1');
      return thehtml;
    } 
  }
  return "unknown";
}

//---------------------------------------------------------------
// Get the last rollover time from the log
//---------------------------------------------------------------
function getLastRolloverFromStr(thelog) {
  var currentstatus = "";
  var currenttoken = "";

  while (thelog.length > 0) {
    var nexttoken = lastToken(thelog);
    var nextstatus = getRollStatusFromToken(nexttoken);
    if ((nextstatus == "no") && (currentstatus == "yes")) {
       return getCityFromToken(nexttoken) + " " + getDateFromToken(nexttoken) + " <--> " + getCityFromToken(currenttoken) + " " + getDateFromToken(currenttoken);
    }
    thelog = popLastToken(thelog);
    currenttoken = nexttoken;
    currentstatus = nextstatus;
  }
  return "";
}

//---------------------------------------------------------------
// get all the rollovers
//---------------------------------------------------------------
function getAllRollovers(thelog) {
  var str = "";
  while (thelog.length > 0) {
    var answer = getLastRolloverFromStr(thelog);
    if (answer == "") {
      return str;
    }
    str = str + answer + "<br>";
    
    // strip off last rollover and repeat.
    search = answer.replace(/([^\d]+ \d+:\d+:\d+:\d+:\d+).*/,'{$1 no}');
    idx = thelog.indexOf(search);
    if (idx == 0) {
      return str;
    }
    thelog = thelog.substr(0,idx);
  }
  return str;
}

//---------------------------------------------------------------
function getRolloverLogToken() {
  return "estiah_pvp_rollover_log_" + getUsername();
}
function getStatusToken() {
  return "estiah_pvp_rollover_status_" + getUsername();
}
function getPredictionToken() {
  return "estiah_pvp_rollover_pred_" + getUsername();
}
function getLastPredictionToken() {
  return "estiah_pvp_rollover_last_pred_" + getUsername();
}
function getLoginLogToken() {
  return "estiah_pvp_last_login";
}

//---------------------------------------------------------------
// update all the rollovers
//---------------------------------------------------------------
function updateAllRollovers(alldiv) {
  var name = getRolloverLogToken();
  var thelog = GM_getValue(name, "");
  var str = getAllRollovers(thelog);
  if (str == "") {
    str = "Unknown";
  }
  alldiv.innerHTML = "<p>" + str + "<\p>";
}

//---------------------------------------------------------------
// toggle the full report
//---------------------------------------------------------------
function estiahToggleAllRollovers() {
  var i = document.getElementById("pvp_all_rollover");
  if (i.style.display == "") {
    i.style.display = "none";
  }
  else {
    updateAllRollovers(i);
    i.style.display = "";
  }
}

//---------------------------------------------------------------
// Display the log
//---------------------------------------------------------------
function estiahDisplayLog() {
  var name = getRolloverLogToken();
  var thelog = GM_getValue(name, "");
  alert(thelog);
}

//---------------------------------------------------------------
// Reset the log
//---------------------------------------------------------------
function estiahResetLog() {
  var answer = confirm("Are you sure you want to reset the log?");
  if (answer) {
    GM_setValue(getRolloverLogToken(), "");
    GM_setValue(getLoginLogToken(), "");
    GM_setValue(getStatusToken(), "");
    GM_setValue(getPredictionToken(), "");
    GM_setValue(getLastPredictionToken(), "");
  }
}

//---------------------------------------------------------------
// create links to display/reset the log
//---------------------------------------------------------------
function addLinks(pvpLogDiv) {
  var linksdiv = document.createElement("div");
  linksdiv.id = "pvp_log_links_mod";
  linksdiv.style.width = "100%";
  linksdiv.style.cssFloat = "none";
  linksdiv.style.margin = "5px 4px 5px 4px";

  thediv = document.createElement("div");
  thediv.style.align = "left";
  thediv.style.margin = "5px 4px 5px 4px";
  thediv.style.cssFloat = "none";
  thediv.className = "functions";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Clear PvP Rollover Log\">[Reset Log]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahResetLog,false);

  var thediv = document.createElement("div");
  thediv.style.align = "left";
  thediv.style.margin = "5px 4px 5px 4px";
  thediv.style.cssFloat = "none";
  thediv.className = "functions";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Display PvP Rollover Log\">[Display Log]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahDisplayLog,false);

  var thediv = document.createElement("div");
  thediv.style.align = "left";
  thediv.style.margin = "5px 4px 5px 4px";
  thediv.className = "functions";
  thediv.style.cssFloat = "none";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Show/Hide All Rollovers\">[Show/Hide All Rollovers]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahToggleAllRollovers,false);
 
  pvpLogDiv.appendChild(linksdiv);
}

//---------------------------------------------------------------
// refresh functions
//---------------------------------------------------------------
// Javascript 1.0
    //  This version of the refresh function will cause a new
    //  entry in the visitor's history.  It is provided for
    //  those browsers that only support JavaScript 1.0.
function refresh1p0() { 
  window.location.href = "http://www.estiah.com/pvp";
}
// Javascript 1.1
    //  This version does NOT cause an entry in the browser's
    //  page view history.  Most browsers will always retrieve
    //  the document from the web-server whether it is already
    //  in the browsers page-cache or not.
function refresh1p1() { 
  window.location.replace( "http://www.estiah.com/pvp" );
}
// Javascript 1.2
    //  This version of the refresh function will be invoked
    //  for browsers that support JavaScript version 1.2
    //  The argument to the location.reload function determines
    //  if the browser should retrieve the document from the
    //  web-server.  In our example all we need to do is cause
    //  the JavaScript block in the document body to be
    //  re-evaluated.  If we needed to pull the document from
    //  the web-server again (such as where the document contents
    //  change dynamically) we would pass the argument as 'true'.
function refresh1p2() { 
  window.location.reload( false );
}

//---------------------------------------------------------------
// get skirmish count
//---------------------------------------------------------------
function getSkirmishCount() {
  //<strong class="c2 PT_update_skirmish">39</strong> left today)
  var e = document.evaluate("//strong[@class='c2 PT_update_skirmish']", 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return e.singleNodeValue.innerHTML.replace(/>(\d+)</,"$1");
}

//---------------------------------------------------------------
// get elements from token
//---------------------------------------------------------------
function getCityFromToken(token) {
  return token.replace(/^([^\d]+) .*/,'$1');
}
function getDateFromToken(token) {
  return token.replace(/^[^\d]+ ([^ ]+).*/,'$1');
}
function getRollStatusFromToken(token) {
  return token.replace(/.* ([^ ]+)$/,'$1');
}

//---------------------------------------------------------------
// decide whether to append or modify the last entry
//---------------------------------------------------------------
function decideUpdate(thelog, munge) {
  if (thelog.length == 0) {
    // empty log - return munge
    return appendToken("", munge);
  }
  if (! (thelog.indexOf("}{") >= 0)) {
    // only one entry - append
    return appendToken(thelog, munge);
  }

  // extract out last 2 entries
  entry1 = lastToken(popLastToken(thelog));
  entry2 = lastToken(thelog);
  entry3 = munge;

  //DEBUG alert("1 '" + entry1 + "' 2 '" + entry2 + "' 3 '" + entry3 + "'");

  city1 = getCityFromToken(entry1);
  date1 = getDateFromToken(entry1);
  status1 = getRollStatusFromToken(entry1);

  city2 = getCityFromToken(entry2);
  date2 = getDateFromToken(entry2);
  status2 = getRollStatusFromToken(entry2);

  city3 = getCityFromToken(entry3);
  date3 = getDateFromToken(entry3);
  status3 = getRollStatusFromToken(entry3);

  
  //DEBUG alert("1 '" + city1 + "' '" + date1 + "' '" + status1 + "'");
  //DEBUG alert("2 '" + city2 + "' '" + date2 + "' '" + status2 + "'");
  //DEBUG alert("3 '" + city3 + "' '" + date3 + "' '" + status3 + "'");

  if ((city1 != city2) ||
      (status1 != status2) ||
      (city2 != city3) ||
      (status2 != status3)) {
    // append
    return appendToken(thelog, munge);
  }

  // replace last entry
  return appendToken(popLastToken(thelog), munge);
}


//---------------------------------------------------------------
function prettyDate() {
  var date = new Date();

  //Fri Jan 01 2010 17:17:30 GMT-0800 (Pacific Standard Time)
  var munge = date.toString();
  munge = munge.replace(/^[^ ]+ /,'');
  munge = munge.replace(/ GMT.*$/,'');
  munge = munge.replace(/Jan/,'01');
  munge = munge.replace(/Feb/,'02');
  munge = munge.replace(/Mar/,'03');
  munge = munge.replace(/Apr/,'04');
  munge = munge.replace(/May/,'05');
  munge = munge.replace(/Jun/,'06');
  munge = munge.replace(/Jul/,'07');
  munge = munge.replace(/Aug/,'08');
  munge = munge.replace(/Sep/,'09');
  munge = munge.replace(/Oct/,'10');
  munge = munge.replace(/Nov/,'11');
  munge = munge.replace(/Dec/,'12');
  munge = munge.replace(/^(\d+) (\d+) (\d+) /,'$3:$1:$2:');
  munge = munge.replace(/:\d+$/,'');
  return munge;
}

//---------------------------------------------------------------
function skirmishMax() {
  return 40;
}

//---------------------------------------------------------------
// append status to the log
//---------------------------------------------------------------
function appendToLog() {
  var count = getSkirmishCount();
  var reset = "no";
  if (count >= skirmishMax()) {
    reset = "yes";
  }
  var city = getCity();

  var name = getRolloverLogToken();
  var thelog = GM_getValue(name, "");
  
  var munge = prettyDate();

  munge = city + ' ' + munge + ' ' + reset;

  //DEBUG alert(munge); //DEBUG

  // decide whether to append or modify the last entry
  thelog = decideUpdate(thelog, munge);
  GM_setValue(name, thelog);
}

//---------------------------------------------------------------
// Get the last rollover time
//---------------------------------------------------------------
function getLastRollover() {
  var name = getRolloverLogToken();
  var thelog = GM_getValue(name, "");

  var answer = getLastRolloverFromStr(thelog);
  if (answer == "") {
    return "Unknown";
  }
  answer = answer.replace(/(\d+:\d+:\d+):(\d+:\d+)/g,'$1 $2');
  return answer;
}

//---------------------------------------------------------------
function updatePrediction() {
  var name = getLoginLogToken();
  var login = GM_getValue(name, "");
  if (login == "") {
    return;
  }
  login = login.replace(/(\d+):(\d+):(\d+):(\d+:\d+)/g,'$1,$2,$3,$4');
  var vals = login.split(',');
  var newday = parseInt(vals[2],10) + 1;
  var newmonth = parseInt(vals[1],10);
  var newyear = parseInt(vals[0],10);
  var bumpmonth = 31;
  if ((newmonth == 1) ||
      (newmonth == 3) ||	
      (newmonth == 5) ||	
      (newmonth == 7) ||	
      (newmonth == 8) ||	
      (newmonth == 10) ||	
      (newmonth == 12)) {
    bumpmonth = 32;
  }
  else if (newmonth == 2) {
   bumpmonth = 29;
  }


  if (bumpmonth == newday) {
    newmonth = newmonth + 1;
    newday = 1;
  }
  if (newmonth == 13) {
    newmonth = 1;
    newyear = newyear + 1;
  }

  var pred = newyear + ":" + newmonth + ":" + newday + " " + vals[3];
  GM_setValue(getLastPredictionToken(), GM_getValue(getPredictionToken(), ""));
  GM_setValue(getPredictionToken(), pred);
}

//---------------------------------------------------------------
// Update the status
//---------------------------------------------------------------
function updateStatus() {
  // update rollover status
  var count = getSkirmishCount();
  var i = document.getElementById("pvp_rollover_status"); 

  var statname = getStatusToken();
  var status = GM_getValue(statname, "");

if (count >= skirmishMax()) {
    i.innerHTML = "<p style=\"color: #8A2BE2\">PvP rollover occurred.  Please do a skirmish and then reload this page.</p>";

    if (status == "notreset") {
      // prior status is notreset, but it is reset now!  set prediction
      updatePrediction();
      GM_setValue(statname, "reset");
    }
  }  
  else {
    i.innerHTML = "<p style=\"color: #FF0000\">PvP rollover has NOT occurred.</p>";
    GM_setValue(statname, "notreset");
  }

  // update last rollover text
  var i = document.getElementById("pvp_last_rollover");
  var last = getLastRollover();
  i.innerHTML = "<p style=\"color: #FFDEAD\">Last PvP rollover between: " + last + "</p>";


  // update prediction text
  var i = document.getElementById("pvp_rollover_prediction");
  var predname = getPredictionToken(); 
  var text = GM_getValue(predname, "");
  i.innerHTML = "<p style=\"color: #ADFF2F\">Best prediction of next rollover is: " + text + "</p>"

  // update prediction text
  var i = document.getElementById("pvp_rollover_lastprediction");
  var predname = getLastPredictionToken(); 
  var text = GM_getValue(predname, "");
  i.innerHTML = "<p>Last prediction of rollover was: " + text + "</p>"
}

//---------------------------------------------------------------
// Add interface for the log
//---------------------------------------------------------------
function estiahPvpLogSetup() {

  if ((window.location.href == "http://www.estiah.com/") ||
      (window.location.href == "http://www.estiah.com") ||
      (window.location.href.indexOf("www.estiah.com/user/auth") >= 0)) {

    var i = document.getElementById("AuthForm");
    if (i) {
      var date = prettyDate();
      var name = getLoginLogToken();
      GM_setValue(name, date);
    }
    return;
  }

  var pvpLogDiv = document.createElement("div");
  pvpLogDiv.style.border = "1px solid #aa7711";
  pvpLogDiv.style.margin = "15px 0px 0px 0px";
  pvpLogDiv.style.padding = "5px 3px 5px 3px";
  pvpLogDiv.id = "pvp_log_mod";
  var e = document.evaluate("//div[@class='heading_text']", 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //e.singleNodeValue.parentNode.insertBefore(pvpLogDiv, e.singleNodeValue);
  e.singleNodeValue.appendChild(pvpLogDiv);

  // create status div
  thediv = document.createElement("div");
  thediv.style.margin = "1px 10px 1px 10px";
  thediv.id = "pvp_rollover_status";
  thediv.style.width = "100%";
  thediv.innerHTML = "<p>Checking status...</p>";
  pvpLogDiv.appendChild(thediv);

  // create prediction div
  thediv = document.createElement("div");
  thediv.style.margin = "1px 10px 1px 10px";
  thediv.style.width = "100%";
  thediv.id = "pvp_rollover_prediction";
  pvpLogDiv.appendChild(thediv);

  // create last rollover div
  thediv = document.createElement("div");
  thediv.style.margin = "1px 10px 1px 10px";
  thediv.style.width = "100%";
  thediv.id = "pvp_last_rollover";
  thediv.innerHTML = "<p>Updating last rollover...</p>";
  pvpLogDiv.appendChild(thediv);

  // create prediction div
  thediv = document.createElement("div");
  thediv.style.margin = "1px 10px 1px 10px";
  thediv.style.width = "100%";
  thediv.id = "pvp_rollover_lastprediction";
  pvpLogDiv.appendChild(thediv);

//  addLineBreak(pvpLogDiv);

  // add links
  addLinks(pvpLogDiv);

  addLineBreak(pvpLogDiv);

  // create all rollover div
  thediv = document.createElement("div");
  thediv.style.margin = "1px 10px 1px 10px";
  thediv.align = "left";
  thediv.id = "pvp_all_rollover";
  thediv.style.display = "none";
  thediv.innerHTML = "<p>Updating all rollovers...</p>";
  pvpLogDiv.appendChild(thediv);

  // update status
  updateStatus();

  // append status to log
  appendToLog();

  // set the refresh timer
  //  var minutes = 15; // to be less than logout timeout
  //  var timer = minutes*60*1000; // milliseconds
  //  setTimeout(refresh1p2, timer);
}

//---------------------------------------------------------------
// Execute script
//---------------------------------------------------------------
window.addEventListener('load',estiahPvpLogSetup,false);

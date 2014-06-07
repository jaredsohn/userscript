// Familiar drop tracker by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Familiar drop tracker
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.2 - Tracks limited daily familiar drops
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://*kingdomofloathing.com/charpane.php*
// ==/UserScript==

/*
Counts end-of-combat drops from familiars.  Displays number of dropped items in character pane (though not in compact mode).  Displays alerts in pop-up window or in combat when familiar is done with drops for the day (configurable).  Resets on rollover or ascension.

Big thanks to antimarty's fortune cookie counter script, both because it's outrageously useful, and because it was a major jumping-off point to get this script written.
 */

// Version 0.0	07/13/2012	IT BEGINS!
// Version 0.4  07/13/2012	Mostly presentable
// Version 0.9  07/15/2012	Extra bells and whistles
// Version 1.0  07/18/2012	All basic features complete
// Version 1.1  07/22/2012	Familiars complaining don't mess up combat action bar, not that it matters that much since combat is over, but, hey
// Version 1.2  08/02/2012	More title texts for the box, somewhat more sensible way of building the styles for the list

// TODO: get player ID, rollover, turns left without using unsafeWindow
// TODO: support compact character pane
// TODO: personalize complaints by familiar type?
// TODO: count combats with familiar, say, got drop on fight #4, 9, 14, etc.

var familiarItems = [
["1622", "astral mushroom", 5, "Astral Badger"],
["2655", "tiny bottle of absinthe", 5, "Green Pixie"],
["3353", "llama lama gong", 5, "Llama Lama"],
["4001", "agua de vida", 5, "Baby Sandworm"],
["4621", "Game Grid token", 5, "Rogue Program"],
["5170", "transporter transponder", 5, "Li'l Xenomorph"],
["5379", "groose grease", 5, "Bloovian Groose"],
["5444", "devilish folio", 5, "Blavious Kloop"]
];

function doFightPane() {
  //  alert("Fam drops - fight!");
  if (document.body.innerHTML.indexOf("<!--WINWINWIN-->")>0) {
    var playerId = GM_getValue("playerId", 0);
    var complaints = GM_getValue("complaints_" + playerId, "ALL");

    var gotDrop = doAlerts();
    if (complaints!='NONE') doComplaints(gotDrop);
  }
}

function doAlerts() {
  var playerId = GM_getValue("playerId", 0);

  //alert("You win!");
  var alerts = GM_getValue("alerts_" + playerId, "LAST");
  var gotDrop = false;

  var items = document.body.innerHTML.match(/<table class="item".*?>/g);
  for (var i=0; i<items.length; i++) {
    var idNum = items[i].replace(/^.*id=(\d+).*$/, '$1');
    //      alert ("Item Get - " + idNum);

    for (var j=0; j<familiarItems.length; j++) {
      if (familiarItems[j][0] == idNum) {
	gotDrop = true;
	var itemCount = GM_getValue("familiarItem_" + idNum + "_" + playerId, 0);
	itemCount = 1 + new Number(itemCount);
	GM_setValue("familiarItem_" + idNum + "_" + playerId, itemCount);
	if (itemCount==familiarItems[j][2]) {
	  if (alerts=='ALL' || alerts=='LAST') alert("Got all " + familiarItems[j][2] + " " + familiarItems[j][1] + "s for today!");
	} else {
	  if (alerts=='ALL') alert ("Got " + familiarItems[j][1] + " #" + itemCount + "!");
	}
      }
    }
  }

  //  alert("Returning " + gotDrop);
  return gotDrop;
}

function doComplaints(gotDrop) {
  var playerId = GM_getValue("playerId", 0);
  //alert("Fam drops, do complaints, " + playerId);

  var complaints = GM_getValue("complaints_" + playerId, "ALL");
  var famType = GM_getValue("familiarType_" + playerId, "X");
  var famName = GM_getValue("familiarName_" + playerId, "X");
  var famImage = GM_getValue("familiarImage_" + playerId, "X");
  for (var j=0; j<familiarItems.length; j++) {
    var itemCount = new Number(GM_getValue("familiarItem_" + familiarItems[j][0] + "_" + playerId, 0));
    //    alert(famType + ", " + familiarItems[j][3] + ", " +  itemCount + ", " + familiarItems[j][2]);
    if (famType==familiarItems[j][3] && itemCount>=familiarItems[j][2]) {
      //    alert('found it!');
      //alert(famType + ", " + familiarItems[j][3] + ", " +  itemCount + ", " + familiarItems[j][2] + " - found it!");
      if (gotDrop) {
        //alert("A " + complaints);
	var addedText = "";
	if (complaints=='ALL' || complaints=='LAST') {
	  //var anchorText = 'You acquire an item: <b>' + familiarItems[j][1] + '</b></td></tr></tbody></table></center>';
	  var texxxt = famName + ' says, "<b>Quittin\' time!  I\'m done for the day.</b>"';
	  addedText = '<!--familiarmessage--><center><table><tbody><tr><td align="center" valign="center"><img src="http://images.kingdomofloathing.com/itemimages/' + famImage + '.gif" height="30" width="30"></td><td valign="center">' + texxxt + '</td></tr></tbody></table></center>';

	  /*
	  var complaintDiv = document.createElement("DIV");
	  complaintDiv.innerHTML = addedText;
	  anchorNode.insertBefore(complaintDiv, anchorNode);
	  */

//	  document.body.innerHTML = document.body.innerHTML.replace(anchorText, anchorText + addedText);
	}
      } else {
        //alert("B " + complaints);
	if (complaints=='ALL' || complaints=='OVER') {
	  //var anchorText = '<!--WINWINWIN-->';
	  var texxxt = famName + ' says, "<b>Wait, why am I still here?</b>"';
	  addedText = '<!--familiarmessage--><center><table><tbody><tr><td align="center" valign="center"><img src="http://images.kingdomofloathing.com/itemimages/' + famImage + '.gif" height="30" width="30"></td><td valign="center">' + texxxt + '</td></tr></tbody></table></center>';
	  /*
	  var complaintDiv = document.createElement("DIV");
	  complaintDiv.innerHTML = addedText;
	  anchorNode.insertBefore(complaintDiv, anchorNode);
	  */
//	  document.body.innerHTML = document.body.innerHTML.replace(anchorText, anchorText + addedText);
	}
      }
      var x = document.evaluate("//p/a[@name='end']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      //alert (x.singleNodeValue.parentNode);
      var anchorNode = x.singleNodeValue.parentNode;
      anchorNode.innerHTML = addedText + anchorNode.innerHTML;
    }
  }
}

function resetAll() {
  resetAllWithMessage("Clear familiar drop list?");
}

function resetAllWithMessage(message) {
  var playerId = GM_getValue("playerId", 0);

//  alert ("Fam drops - reset");
  var tf = false;
  if (message!=undefined && message!=null && message.length>0) {
    tf = confirm(message);
  } else {
    tf = true;
  }
  if (tf==true) {
    for (var i=0; i<familiarItems.length; i++) {
      GM_deleteValue("familiarItem_" + familiarItems[i][0] + "_" + playerId);
    }
    top.frames[1].location.reload();
  }
}

function toggleAlerts() {
  var playerId = GM_getValue("playerId", 0);

  var alerts = GM_getValue("alerts_" + playerId, "LAST");
  if (alerts=='ALL') {
    GM_setValue("alerts_" + playerId, "LAST");
  } else if (alerts=='LAST') {
    GM_setValue("alerts_" + playerId, "NONE");
  } else if (alerts=='NONE') {
    GM_setValue("alerts_" + playerId, "ALL");
  } else {
    GM_setValue("alerts_" + playerId, "LAST");
  }
  top.frames[1].location.reload();
}

function toggleComplaints() {
  var playerId = GM_getValue("playerId", 0);

  var complaints = GM_getValue("complaints_" + playerId, "ALL");
  if (complaints=='ALL') {
    GM_setValue("complaints_" + playerId, "OVER");
  } else if (complaints=='OVER') {
    GM_setValue("complaints_" + playerId, "NONE");
  } else if (complaints=='NONE') {
    GM_setValue("complaints_" + playerId, "ALL");
  } else {
    GM_setValue("complaints_" + playerId, "ALL");
  }
  top.frames[1].location.reload();
}

function toggleShowHide() {
  var playerId = GM_getValue("playerId", 0);

  //  alert(unsafeWindow.turnsthisrun);
  var hideList = GM_getValue("hideList_" + playerId, "");
  if (hideList=="Y") {
    GM_setValue("hideList_" + playerId, "");
  } else {
    GM_setValue("hideList_" + playerId, "Y");
  }
  top.frames[1].location.reload();
}

function doCharPane() {
  var playerOk = checkPlayerAndDate();
  //  alert(playerOk);
  if (playerOk) {
    getFamiliarInfo();
    insertFamDropBox();
  }
}

function checkPlayerAndDate() {
  var playerId = unsafeWindow.playerid;
  if (playerId==undefined) return false;
  //  alert("Fam - Player: " + playerId);
  GM_setValue("playerId", playerId);

  var itemCount = 0;
  for (var i=0; i<familiarItems.length; i++) {
    itemCount += GM_getValue("familiarItem_" + familiarItems[i][0] + "_" + playerId, 0);
  }
  //  alert("Fam - Item count: " + itemCount);

  var nextRollover = unsafeWindow.rollover;
  var prevRollover = GM_getValue("nextRollover_" + playerId, -1);
  //  alert("Rollover - (" + new Date(1000*nextRollover) + ", " + new Date(1000*prevRollover) + ", " + (nextRollover-prevRollover) + ")");

  var turnsThisRun = unsafeWindow.turnsthisrun;
  var prevTurns = GM_getValue("turnsThisRun_" + playerId, -1);

  if (itemCount>0) {
    if (prevRollover>=0 && nextRollover>prevRollover) {
      resetAllWithMessage("");
      //      resetAllWithMessage("It's a new day! Reset all familiar drop data? (" + new Date(1000*nextRollover) + ", " + new Date(1000*prevRollover) + ", " + (nextRollover-prevRollover) + ")");
    } else if (prevTurns>=0 && turnsThisRun<prevTurns) {
      resetAllWithMessage("");
    }
  }

  GM_setValue("nextRollover_" + playerId, nextRollover+60);
  GM_setValue("turnsThisRun_" + playerId, turnsThisRun);

  return true;
}


function getFamiliarInfo() {
  var playerId = GM_getValue("playerId", 0);

  var regex = /<a target="mainpane" href="familiar.php" class="familiarpick"><img src="http:\/\/images.kingdomofloathing.com\/itemimages\/(.*?).gif" border="0" height="30" width="30">.*<a target="mainpane" href="familiar.php" class="familiarpick"><b><font size="2">(.*?)<\/font><\/b><\/a><font size="2">, the  <b>([0-9]+)<\/b> pound ([^<]+)</g;

  var items = document.body.innerHTML.match(regex);
  if (items==null || items.length==0) {
    GM_setValue("familiarImage_" + playerId, "");
    GM_setValue("familiarName_" + playerId, "");
    GM_setValue("familiarType_" + playerId, "");
  } else {
    var famImage = items[0].replace(regex, '$1');
    var famName = items[0].replace(regex, '$2');
    var famWeight = items[0].replace(regex, '$3');
    var famType = items[0].replace(regex, '$4').replace(/, Chameleon/, '');
    
    //    alert (i + ' [' + famImg + '], [' + famName + '], [' + famWeight + '], [' + famType + ']');
    GM_setValue("familiarImage_" + playerId, famImage);
    GM_setValue("familiarName_" + playerId, famName);
    GM_setValue("familiarType_" + playerId, famType);
  }
}

function insertFamDropBox() {
  var playerId = GM_getValue("playerId", 0);

//  alert ("Fam drops - char");
  var hideList = GM_getValue("hideList_" + playerId, "");
  var alerts = GM_getValue("alerts_" + playerId, "LAST");
  var complaints = GM_getValue("complaints_" + playerId, "ALL");
  var famType = GM_getValue("familiarType_" + playerId, "");

  var topTitle = "";
  for (var i=0; i<familiarItems.length; i++) {
    if (familiarItems[i][3]==famType) {
      var itemCount = new Number(GM_getValue("familiarItem_" + familiarItems[i][0] + "_" + playerId, 0));
      topTitle = "Current familiar has dropped " + itemCount + " out of " + familiarItems[i][2] + " " + familiarItems[i][1] + "(s) today.";
    }
  }
  if (topTitle=="") topTitle = "Current familiar does not drop any monitored items.";

  var objHtml = '<table width="95%"><tr><td colspan="2"><div title="' + topTitle + '"><font size=2><b>Familiar Drop Monitor:</b></font></div></td></tr><tr><td colspan="2"><table><tr>';

  var alertTitle = 'Huh?';
  var alertBox = 'Huh?';
  if (alerts=='ALL') {
    alertBox = 'A: All';
    alertTitle = 'Alert box will pop up any time familiar drops an item.';
  } else if (alerts=='LAST') {
    alertBox = 'A: Last'; 
    alertTitle = 'Alert box will pop up when familiar drops its last item of the day.';
  } else if (alerts=='NONE') {
    alertBox = 'A: Off'; 
    alertTitle = 'No alert boxes.';
  }
  objHtml = objHtml + '<td><div title="' + alertTitle + '" id="famdropMonitorAlerts"><font size="2"><b>[</b>'+ alertBox + '<b>]</b></font></div></td>';

  var complaintTitle = 'Huh?';
  var complaintBox = 'Huh?';
  if (complaints=='ALL') {
    complaintTitle = 'Familiars will complain at the end of combat when they hit or are over their item limit for the day.';
    complaintBox = 'C: All';
  } else if (complaints=='OVER') {
    complaintTitle = 'Familiars will complain at the end of combat when they are over their item limit for the day.';
    complaintBox = 'C: Over';
  } else if (complaints=='NONE') {
    complaintTitle = 'Familiars will not complain in combat.';
    complaintBox = 'C: Off';
  }
  objHtml = objHtml + '<td><div title="' + complaintTitle + '" id="famdropMonitorComplaints"><font size="2"><b>[</b>' + complaintBox + '<b>]</b></font></div></td>';

  objHtml = objHtml + '<td><div title="Click to show/hide item list." id="famdropMonitorShowHide"><font size="2"><b>[</b>' + ( (hideList=='Y')?'+':'-') + '<b>]</b></font></div></td>';

  objHtml = objHtml + '<td><div title="Click to clear item list." id="famdropMonitorReset"><font size="2"><b>[</b>X<b>]</b></font></div></td>';

  objHtml = objHtml + '</tr></table></td></tr>';

  if (hideList=='Y') {
    // do nothing
  } else {
    var foundItem = false;

    for (var i=0; i<familiarItems.length; i++) {
      var itemCount = new Number(GM_getValue("familiarItem_" + familiarItems[i][0] + "_" + playerId, 0));
      if (itemCount>0 || familiarItems[i][3]==famType) {
	foundItem = true;
	var style = "";
	if (familiarItems[i][3]==famType) {
	  if (itemCount>=familiarItems[i][2]) {
	    style = "font-size:x-small;color:#800000;font-weight:bold;text-decoration:line-through";
	  } else {
	    style = "font-size:x-small;color:#000080;font-weight:bold;text-decoration:normal";
	  }
	} else {
	  if (itemCount>=familiarItems[i][2]) {
	    style = "font-size:x-small;color:#808080;font-weight:normal;text-decoration:line-through";
	  } else {
	    style = "font-size:x-small;color:#000000;font-weight:normal;text-decoration:normal";
	  }
	}
	objHtml = objHtml + '<tr style="' + style + '"><td>' + itemCount + '</td><td>' + familiarItems[i][1] + '</td></tr>';
      }
    }

    if (foundItem==false) {
      objHtml = objHtml + '<tr style="font-size:small"><td rowspan="2">No items found.</td></tr>';
    }
  }

  objHtml = objHtml + '</table><br/>';

  var box = document.getElementById("famdropTrackerDiv");
  if (box!=null) {
    box.innerHTML = objHTML;
  } else {
    var newElement = document.createElement("DIV");
    newElement.innerHTML = objHtml;
    newElement.setAttribute("id", 'famdropTrackerDiv');

    var elements = document.getElementsByTagName( "FONT" );
    for (var i = 0; i < elements.length; ++i ) {
      if ( elements[i].innerHTML.indexOf( "Last Adventure" ) != -1 ){
	// insert our before this one
	elements[i].parentNode.insertBefore(newElement,elements[i]);
	break;
      }
    }
  }

  var headerDiv = document.getElementById('famdropMonitorReset');
  if (headerDiv!=null) headerDiv.addEventListener("click", resetAll);

  var alertsDiv = document.getElementById('famdropMonitorAlerts');
  if (alertsDiv!=null) alertsDiv.addEventListener("click", toggleAlerts);

  var complaintsDiv = document.getElementById('famdropMonitorComplaints');
  if (complaintsDiv!=null) complaintsDiv.addEventListener("click", toggleComplaints);

  var showhideDiv = document.getElementById('famdropMonitorShowHide');
  if (showhideDiv!=null) showhideDiv.addEventListener("click", toggleShowHide);
}

if (document.location.pathname.indexOf("fight.php") > 0 ) {
  doFightPane();
} else if ( document.location.pathname.indexOf("charpane.php") > 0 ) {
  doCharPane();
}

// Camp Scout backpack tracker by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Camp Scout backpack tracker
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.1 - Tracks drops from Camp Scout backpack
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://*kingdomofloathing.com/charpane.php*
// ==/UserScript==

/*
Tracks drops from Camp Scout backpack.  Displays dropped items in character pane (though not in compact mode).  Predicts next drop +/- 1 combat.  Resets on rollover or ascension.

Big thanks to antimarty's fortune cookie counter script, both because it's outrageously useful, and because it was a major jumping-off point to get this script written.
 */

// Version 0.0	07/13/2012	IT BEGINS!
// Version 0.9  07/13/2012	First presentable version
// Version 1.0  07/18/2012	All basic features complete
// Version 1.1  08/06/2012	Extra chatter

// TODO: link to wiki, maybe
// TODO: get player ID, rollover, turns left without using unsafeWindow
// TODO: support compact character pane
// TODO REALLY MAYBE: check to see if backpack is equipped (or in Hangk's if hardcore)

var backpackItems = [
["5740", "bag of GORP"], 
["5741", "water purification pills"], 
["5742", "Camp Scout pup tent"], 
["5739", "CSA fire-starting kit"], 
["5743", "CSA scoutmaster's \"water\""], 
["5744", "bag of GORF"], 
["5750", "CSA obedience grenade"], 
["5749", "CSA cheerfulness ration"], 
["5745", "CSA discount card"], 
["5747", "CSA bravery badge"], 
["5748", "CSA all-purpose soap"], 
["5746", "bag of QWOP"]
];

function doFightPane() {
  //  alert("Fight!");
  var playerId = GM_getValue("playerId", 0);
  var suspendCounter = GM_getValue("suspendCounter_" + playerId, "");
  var announceDrops = GM_getValue("announceDrops_" + playerId, "");
  var extraChatter = GM_getValue("extraChatter_" + playerId, "");
  if (suspendCounter=="Y") return;

  if (document.body.innerHTML.indexOf("<!--WINWINWIN-->")>0) {
    var fightCount = 1 + new Number(GM_getValue("fightCount_" + playerId, 0));
    var nextTurn = GM_getValue("nextDrop_" + playerId, 0);
    var gotDrop = false;
    GM_setValue("fightCount_" + playerId, fightCount);
    //alert("You win! Fight #" + fightCount);

    var items = document.body.innerHTML.match(/<table class="item".*?>/g);
    if (items==null) items = [];
    for (var i=0; i<items.length; i++) {
      var idNum = items[i].replace(/^.*id=(\d+).*$/, '$1');
      //      alert ("Item Get - " + idNum);

      for (var j=0; j<backpackItems.length; j++) {
	if (backpackItems[j][0] == idNum) {
	  gotDrop = true;
	  if (announceDrops=='Y') alert ("Camp Scout backpack dropped - " + backpackItems[j][1] + "!");

	  var itemCount = new Number(GM_getValue("itemCount_" + playerId, 0));
	  GM_setValue("backpackItemId_" + itemCount + "_" + playerId, idNum);
	  GM_setValue("backpackItemName_" + itemCount + "_" + playerId, backpackItems[j][1]);
	  GM_setValue("backpackItemTurn_" + itemCount + "_" + playerId, fightCount);

	  var prevTurn = GM_getValue("backpackItemTurn_" + (itemCount-1) + "_" + playerId, 0);
	  nextTurn = (fightCount * 2) + 2 - prevTurn;
	  GM_setValue("nextDrop_" + playerId, nextTurn);

	  itemCount++;
	  GM_setValue("itemCount_" + playerId, itemCount);
	}
      }
    }

    if (extraChatter=='Y') {
    try {
      if (!gotDrop) {
	var baseRoll = Math.random();
	var roll = baseRoll;
	switch (Math.abs(nextTurn-fightCount)) {
	case 1: // 72%
	  roll /= 2;
	  //fall through
	case 2: // 36%
	  roll /= 3;
	  //fall through
	case 3: // 12%
	  roll /= 4;
	  //fall through
	default: // 3%
	  //do nothing
	}
	var extraText = "<!-- " + Math.abs(nextTurn-fightCount) + ", " + baseRoll + ", " + roll + " -->";
	//      alert ('backpack - ' + Math.abs(nextTurn-fightCount));
	//      alert ('backpack - ' + roll);
	if (Math.abs(nextTurn-fightCount)<=1 || roll<0.03) {
	  var messStarts = ['Your backpack says - ', 'You hear a voice from behind you - ', 'The tinny voice from your backpack says - ', 'A hollow voice from your backpack says - '];
	  var messages = [
			  'Please stand by to receive sandwiches from my compartment.',
			  'All Camp Scouts be on the alert.  Repeat, all Camp Scouts on alert.',
			  'Attention: munitions drop scheduled for ' + nextTurn + (nextTurn<10?'0':'') + (nextTurn<100?'0':'') + (nextTurn<1000?'0':'') + ' hours.',
			  'Nikolaj Anna Ivan Mihail Ivan Nikolaj Anna 7 4 1 4 3 5 7 4',
			  randomNumbers(), randomNumbers()
			  ];
	  extraText = extraText + "<!-- " + messages[4] + ", " + messages[5] + " -->";
	  var statics = ['<i>static</i>', '<i>click</i>', '<i>static</i>', '<i>click</i>', '<i>static</i>', '<i>click</i>', '<i>beep</i>', '<i>buzz</i>'];
	  
	  var messStart = messStarts[Math.floor(Math.random()*messStarts.length)];
	  var message = messages[Math.floor(Math.random()*messages.length)].split(" ");
	  var done = false;
	  var used = new Array();
	  var count = 0;
	  while (!done && count<10) {
	    var which = Math.floor(Math.random()*message.length);
	    if (used[which]==true) {
	      done = true;
	    } else {
	      message[which] = statics[Math.floor(Math.random()*statics.length)];
	      var radius = Math.floor(Math.random()*3);
	      for (var k=-radius; k<=radius; k++) {
		used[which+k] = true;
	      }
	    }
	    count++;
	  }
	  //	alert (message.join(" "));
	  //	alert('Your backpack says - "' + message.join(" ") + '"');
	  extraText = extraText + messStart + '"' + message.join(" ") + '"';
	}
	var x = document.evaluate("//p/a[@name='end']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	//alert (x.singleNodeValue.parentNode);
	var anchorNode = x.singleNodeValue.parentNode;
	anchorNode.innerHTML = extraText + anchorNode.innerHTML;
      }
    } catch (err) {
      alert(err);
    }
    }
  }
}

function randomNumbers() {
  var prefixes = ['', 'Attention! ', 'All operatives - ', 'Hello! ', '1 2 3 4 5. '];
  var prefix = prefixes[0];
  if (Math.random()<0.5) prefix = prefixes[Math.floor(Math.random()*prefixes.length)];
  var alphabets = [
    ['Arcade', 'Goat', 'Lemon', 'Hovel', 'Alley', 'Gourd', 'Arena', 'Malus', 'Wok', 'Pantry', 'Porko', 'Fax', 'Sewer', 'Burnbarrel', 'Esplanade', 'Heap', 'Bucket', 'Leggery', 'Toaster', 'Noob', 'Chasm', 'Sassafrass', 'eXtreme', 'Greater-Than', 'Huggler', 'Hermit', 'Deepers', 'Knob', 'Plunger', 'Cranny', 'Guano', 'Pickle', 'Salad', 'Permery', 'Inexplicable', 'Stupor'],
    ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'Xray', 'Yankee', 'Zulu'],
    ['Anna', 'Boris', 'Vasily', 'Igor', 'Dimitri', 'Yelena', 'Zhenya', 'Zinaida', 'Ivan', 'Konstantin', 'Leonid', 'Mikhail', 'Nikolai', 'Olga', 'Pavel', 'Roman', 'Simon', 'Tatyana', 'Ulyana', 'Fyodor', 'Khariton', 'Tsaplya', 'Chelovek', 'Shura', 'Shchuka', 'Yuri', 'Yakov'],
    ['Asahi', 'Iroha', 'Ueno', 'Eigo', 'Osaka', 'Kawase', 'Kitte', 'Kurabu', 'Keshiki', 'Kodomo', 'Sakura', 'Shinbun', 'Suzume', 'Sekai', 'Soroban', 'Tabako', 'Chidoro', 'Tsurukame', 'Tegami', 'Tokyo', 'Nagoya', 'Nippon', 'Numazu', 'Nezumi', 'Nohara', 'Hagaki', 'Hikoki', 'Fujisan', 'Heiwa', 'Hoken', 'Matchi', 'Mikasa', 'Musen', 'Meiji', 'Momiji', 'Yamato', 'Yumiya', 'Yoshino', 'Raijo', 'Ringo', 'Rusui', 'Renge', 'Roma', 'Warabi', 'Ido', 'Kagi', 'Owari']
  ];
  var alphabet = alphabets[0];
  if (Math.random()<0.5) alphabet = alphabets[Math.floor(Math.random()*alphabets.length)];
  var len = 3 + Math.floor(Math.random()*7);
  var text = "";
  for (var i=0; i<len; i++) {
    text = text + alphabet[Math.floor(Math.random()*alphabet.length)] + " ";
  }
  text = text.replace(/ $/, '. ');
  var doubleLen = 3 + (Math.random()*3);
  if (doubleLen>=len) text = text + "Repeat, " + text;
  text = text.replace(/ $/, '');
  //alert(text);
  return prefix + text;
}

function resetAll() {
  resetAllWithMessage("Reset all backpack monitor info?  Are you super duper ultra sure?");
}

function resetAllWithMessage(message) {
  var playerId = GM_getValue("playerId", 0);

  var tf = false;
  if (message!=undefined && message!=null && message.length>0) {
    tf = confirm(message);
  } else {
    tf = true;
  }
  if (tf==true) {
    GM_setValue("fightCount_" + playerId, 0);
    GM_setValue("nextDrop_" + playerId, 0);
    //    GM_setValue("suspendCounter_" + playerId, "");
    //    GM_setValue("hideList_" + playerId, "");
    var itemCount = GM_getValue("itemCount_" + playerId, 0);
    for (var i=0; i<itemCount; i++) {
      GM_deleteValue("backpackItemId_" + i + "_" + playerId);
      GM_deleteValue("backpackItemName_" + i + "_" + playerId);
      GM_deleteValue("backpackItemTurn_" + i + "_" + playerId);
    }
    GM_setValue("itemCount_" + playerId, 0);
    
    top.frames[1].location.reload();
  }
}

function setCount() {
  var playerId = GM_getValue("playerId", 0);

  var fightCount = GM_getValue("fightCount_" + playerId, 0);
  var newCount = prompt("Set backpack monitor fight count?", fightCount);
  if (!isNaN(new Number(newCount)) && fightCount!=newCount) {
    GM_setValue("fightCount_" + playerId, newCount);
    GM_setValue("nextDrop_" + playerId, 0);
    top.frames[1].location.reload();
  }
}

function toggleOnOff() {
  var playerId = GM_getValue("playerId", 0);

  var suspendCounter = GM_getValue("suspendCounter_" + playerId, "");
  if (suspendCounter=="Y") {
    tf = confirm("Turn backpack monitor on?");
    if (tf==true) {
      GM_setValue("suspendCounter_" + playerId, "");
      top.frames[1].location.reload();
    }
  } else {
    tf = confirm("Turn backpack monitor off?");
    if (tf==true) {
      GM_setValue("suspendCounter_" + playerId, "Y");
      top.frames[1].location.reload();
    }
  }
}

function toggleAnnounce() {
  var playerId = GM_getValue("playerId", 0);

  var announceDrops = GM_getValue("announceDrops_" + playerId, "");
  if (announceDrops=="Y") {
    GM_setValue("announceDrops_" + playerId, "");
    top.frames[1].location.reload();
  } else {
    GM_setValue("announceDrops_" + playerId, "Y");
    top.frames[1].location.reload();
  }
}

function toggleShowHide() {
  var playerId = GM_getValue("playerId", 0);

  var hideList = GM_getValue("hideList_" + playerId, "");
  if (hideList=="Y") {
    GM_setValue("hideList_" + playerId, "");
    top.frames[1].location.reload();
  } else {
    GM_setValue("hideList_" + playerId, "Y");
    top.frames[1].location.reload();
  }
}

function toggleChatter() {
  var playerId = GM_getValue("playerId", 0);

  var extraChatter = GM_getValue("extraChatter_" + playerId, "");
  if (extraChatter=="Y") {
    GM_setValue("extraChatter_" + playerId, "");
    top.frames[1].location.reload();
  } else {
    GM_setValue("extraChatter_" + playerId, "Y");
    top.frames[1].location.reload();
  }
}

function clearList() {
  var playerId = GM_getValue("playerId", 0);

  var tf = confirm("Clear backpack item list?");
  if (tf==true) {
    //    GM_setValue("backpackItemList", "");
    var itemCount = GM_getValue("itemCount_" + playerId, 0);
    for (var i=0; i<itemCount; i++) {
      GM_deleteValue("backpackItemId_" + i + "_" + playerId);
      GM_deleteValue("backpackItemName_" + i + "_" + playerId);
      GM_deleteValue("backpackItemTurn_" + i + "_" + playerId);
    }
    GM_setValue("itemCount_" + playerId, 0);
    top.frames[1].location.reload();
  }
}

function doCharPane() {
  var playerOk = checkPlayerAndDate();
  if (playerOk) insertBackpackBox();
}

function checkPlayerAndDate() {
  var playerId = unsafeWindow.playerid;
  if (playerId==undefined) return false;
  //  alert("Player: " + playerId);
  GM_setValue("playerId", playerId);

  var fightCount = GM_getValue("fightCount_" + playerId, 0);
  var itemCount = GM_getValue("itemCount_" + playerId, 0);

  var nextRollover = unsafeWindow.rollover;
  var prevRollover = GM_getValue("nextRollover_" + playerId, -1);
  //  alert("Rollover - (" + new Date(1000*nextRollover) + ", " + new Date(1000*prevRollover) + ", " + (nextRollover-prevRollover) + ")");

  var turnsThisRun = unsafeWindow.turnsthisrun;
  var prevTurns = GM_getValue("turnsThisRun_" + playerId, -1);

  if (fightCount>0 || itemCount>0) {
    if (prevRollover>=0 && nextRollover>prevRollover) {
      //      resetAllWithMessage("It's a new day! Reset all backpack data? (" + new Date(1000*nextRollover) + ", " + new Date(1000*prevRollover) + ", " + (nextRollover-prevRollover) + ")");
      resetAllWithMessage("");
    } else if (prevTurns>=0 && turnsThisRun<prevTurns) {
      resetAllWithMessage("");
    }
  }

  GM_setValue("nextRollover_" + playerId, nextRollover+60);
  GM_setValue("turnsThisRun_" + playerId, turnsThisRun);

  return true;
}

function guessNextItemDrop(playerId, itemCount) {
  if (itemCount>=backpackItems.length) return "???";
  if (itemCount>0) {
    var prevId = GM_getValue("backpackItemId_" + (itemCount-1) + "_" + playerId, "X");
    for (var i=0; i<backpackItems.length-1; i++) {
      if (backpackItems[i][0]==prevId) return backpackItems[i+1][1] + "?";
    }
  }
  return "???";
}

function insertBackpackBox() {
  var playerId = GM_getValue("playerId", 0);

  var fightCount = GM_getValue("fightCount_" + playerId, 0);
  var nextDrop = GM_getValue("nextDrop_" + playerId, 0);
  var itemCount = GM_getValue("itemCount_" + playerId, 0);
  var suspendCounter = GM_getValue("suspendCounter_" + playerId, "");
  var hideList = GM_getValue("hideList_" + playerId, "");
  var announceDrops = GM_getValue("announceDrops_" + playerId, "");
  var extraChatter = GM_getValue("extraChatter_" + playerId, "");

  //  alert ("Doing CP, fightCount = " + fightCount);

  var objHtml = '<table><tr>';

  objHtml = objHtml + '<td colspan="5"><div id="backpackMonitorHeader"><b><font size=2>Backpack Monitor:</font></b></div></td>';

  objHtml = objHtml + '</tr><tr style="font-size:small">';

  objHtml = objHtml + '<td><div id="backpackMonitorCount" title="' + (nextDrop>fightCount?('Predicted Next Drop - ' + nextDrop + '. '):'') + 'Click to set fight count."><b>[</b>' + fightCount + '<b>]</b></div></td>';

  objHtml = objHtml + '<td><div id="backpackMonitorOnOff" title="Backpack monitor is ' + ( (suspendCounter=='Y')?'not ':'') + 'counting fights and looking for item drops."><b>[</b>' + ( (suspendCounter=='Y')?'Off':'On') + '<b>]</b></div></td>';

  objHtml = objHtml + '<td><div id="backpackMonitorLoudQuiet" title="Alert box will ' + ( (announceDrops=='Y')?'':'not ') + 'pop up when backpack drops an item."><b>[</b>' + ( (announceDrops=='Y')?'A':'<font color="#808080">A</font>') + '<b>]</b></div></td>';

  objHtml = objHtml + '<td><div id="backpackMonitorChatty" title="Backpack monitor will ' + ( (extraChatter=='Y')?'':'not ') + 'add extra chatter in combat."><b>[</b>' + ( (extraChatter=='Y')?'C':'<font color="#808080">C</font>') + '<b>]</b></div></td>';

  objHtml = objHtml + '<td><div id="backpackMonitorShowHideList" title="Click to show/hide item list."><b>[</b>' + ( (hideList=='Y')?'+':'-') + '<b>]</b></div></td>';

  objHtml = objHtml + '<td><div id="backpackMonitorClearList" title="Click to clear item list."><b>[</b>' + 'X' + '<b>]</b></div></td>';

  objHtml = objHtml + '</tr><tr>';

  if (hideList=='Y') {
    // do nothing;
  } else if (itemCount==0) {
    objHtml = objHtml + '<td colspan="5"><table style="font-size:small"><tr><td>No items found.</td></tr></table></td>';
  } else {
    objHtml = objHtml + '<td colspan="5"><table style="font-size:x-small">';
    for (var i=0; i<itemCount; i++) {
      objHtml = objHtml + '<tr><td>' + GM_getValue("backpackItemTurn_" + i + "_" + playerId, 0) + '</td><td>' + GM_getValue("backpackItemName_" + i + "_" + playerId, "huh?") + '</td></tr>'
    }
    if (nextDrop>0) {
      objHtml = objHtml + '<tr style="font-size:x-small;color:#808080"><td>' + Math.max(nextDrop, 1+fightCount) + '?</td><td>' + guessNextItemDrop(playerId, itemCount) + '</td></tr>';
    }
    objHtml = objHtml + '</table></td>';
    //    objHtml = objHtml + '<td colspan="4"><table style="font-size:small">' + itemList + '</table></td>';
  }

  objHtml = objHtml + '</tr></table>';

  objHtml = objHtml + '<br/>';

  var box = document.getElementById("backpackTrackerDiv");
  if (box!=null) {
    box.innerHTML = objHTML;
  } else {
    var newElement = document.createElement("DIV");
    newElement.innerHTML = objHtml;
    newElement.setAttribute("id", 'backpackTrackerDiv');

    var elements = document.getElementsByTagName( "FONT" );
    for (var i = 0; i < elements.length; ++i ) {
      if ( elements[i].innerHTML.indexOf( "Last Adventure" ) != -1 ){
	// insert our before this one
	elements[i].parentNode.insertBefore(newElement,elements[i]);
	break;
      }
    }
  }

  var headerDiv = document.getElementById('backpackMonitorHeader');
  if (headerDiv!=null) headerDiv.addEventListener("click", resetAll);

  var countDiv = document.getElementById('backpackMonitorCount');
  if (countDiv!=null) countDiv.addEventListener("click", setCount);

  var loudDiv = document.getElementById('backpackMonitorLoudQuiet');
  if (loudDiv!=null) loudDiv.addEventListener("click", toggleAnnounce);

  var chatterDiv = document.getElementById('backpackMonitorChatty');
  if (chatterDiv!=null) chatterDiv.addEventListener("click", toggleChatter);

  var onoffDiv = document.getElementById('backpackMonitorOnOff');
  if (onoffDiv!=null) onoffDiv.addEventListener("click", toggleOnOff);

  var showhideDiv = document.getElementById('backpackMonitorShowHideList');
  if (showhideDiv!=null) showhideDiv.addEventListener("click", toggleShowHide);

  var clearListDiv = document.getElementById('backpackMonitorClearList');
  if (clearListDiv!=null) clearListDiv.addEventListener("click", clearList);
}

if (document.location.pathname.indexOf("fight.php") > 0 ) {
  doFightPane();
} else if ( document.location.pathname.indexOf("charpane.php") > 0 ) {
  doCharPane();
}

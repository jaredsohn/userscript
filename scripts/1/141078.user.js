// Zombie Defacer by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Zombie Defacer
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.1 - Defaces zombie character sheets
// @include        http://*kingdomofloathing.com/showplayer.php*
// @include        http://*127.0.0.1:*/showplayer.php*
// @include        http://*localhost:*/showplayer.php*
// ==/UserScript==

// Version 1.0	08/16/2012	IT BEGINS!
// Version 1.1  08/16/2012	More braaaaaains, Mafia support

function brainsTxt() {
  var letters = "gggrrrrrraaaaaaaangghhhz";
  var x = 4 + Math.floor(Math.random()*4) + Math.floor(Math.random()*4);
  var toRet = "";
  for (var i=0; i<x; i++) {
    var y = 2 + Math.floor(Math.random()*4) + Math.floor(Math.random()*4);
    for (var j=0; j<y; j++) {
      toRet += letters.charAt(Math.floor(Math.random()*letters.length));
    }
    var z = Math.random();
    if (z<.1) toRet += "?"; else if (z<.2) toRet += "!";
    toRet += " ";
  }
  return toRet;
}

function doCharSheet() {
  if (document.body.innerHTML.match('<td align="right"><b>Path:</b></td><td>Zombie Slayer</td>')) {
    //    alert ('Found it!');
    document.body.innerHTML = document.body.innerHTML.replace("<b>Sign:</b></td><td>The", "<b>Sign:</b></td><td>Zombie");
    document.body.innerHTML = document.body.innerHTML.replace('<center>Profile:</center><table width="70%"><tbody><tr><td colspan="2" bgcolor="black" height="1"></td></tr>', '<center>Profile:</center><table width="70%"><tbody><tr><td colspan="2" bgcolor="black" height="1"></td></tr><tr><td align="right" valign="top"><b>Brains:</b></td><td>' + brainsTxt() + '</td></tr>');

    var favFood = document.body.innerHTML.match('<b>Favorite Food:</b></td><td>(.*?)</td>');
    if (favFood!=null) {
      //      alert(favFood[1]);
      var foodArray = favFood[1].split(" ");
      var which = Math.floor(Math.random()*(foodArray.length+1));
      //      alert(which);
      if (which==foodArray.length) which = Math.floor(Math.random()*(foodArray.length+1));
      if (which<foodArray.length) {
	var replacement = "Brains";
	if (foodArray[which]==foodArray[which].toLowerCase()) replacement = "brains";
	if (foodArray[which]==foodArray[which].toUpperCase()) replacement = "BRAINS";
	foodArray[which] = replacement;
	//      alert(foodArray.join(" "));
	document.body.innerHTML = document.body.innerHTML.replace(favFood[1], '<div title="' + favFood[1] + '">' + foodArray.join(" ") + '</div>');
      }
    }

    var favBooz = document.body.innerHTML.match('<b>Favorite Booze:</b></td><td>(.*?)</td>');
    if (favBooz!=null) {
      //      alert(favBooz[1]);
      var boozArray = favBooz[1].split(" ");
      var which = Math.floor(Math.random()*(boozArray.length+1));
      if (which==boozArray.length) which = Math.floor(Math.random()*(boozArray.length+1));
      //      alert(which);
      if (which<boozArray.length) {
	var replacement = "Brains";
	if (boozArray[which]==boozArray[which].toLowerCase()) replacement = "brains";
	if (boozArray[which]==boozArray[which].toUpperCase()) replacement = "BRAINS";
	boozArray[which] = replacement;
	//      alert(boozArray.join(" "));
	document.body.innerHTML = document.body.innerHTML.replace(favBooz[1], '<div title="' + favBooz[1] + '">' + boozArray.join(" ") + '</div>');
      }
    }

    var x = document.evaluate("//table/tbody/tr/td/img[@class='hand']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (x.snapshotLength>0 && Math.random()>0.4) {
      var tableNode = x.snapshotItem(0).parentNode.parentNode.parentNode;
      var trs = tableNode.childNodes;
//      alert(trs.length + ", " + trs.item(1) + ", " + trs.item(1).innerHTML);
      if (trs.length>0) {
	var newElement = document.createElement("TR");
	newElement.innerHTML = '<td height="30" width="30"><img src="http://images.kingdomofloathing.com/itemimages/realbrain.gif" ></td><td valign="center"><b>insatiable hunger for human brains</b></td>';
	newElement.setAttribute("height", '30');
	newElement.setAttribute("width", '30');
	var which = 1+Math.floor(Math.random()*(trs.length-1));
//	alert(trs.length + ", " + which);
	tableNode.insertBefore(newElement, trs[which]);
      }      
//      alert(tableNode + ", " + tableNode.innerHTML);
    }

  } else {
    //    alert ('Nope.');
  }
}

if ( document.location.pathname.indexOf("showplayer.php") > 0 ) {
  doCharSheet();
}

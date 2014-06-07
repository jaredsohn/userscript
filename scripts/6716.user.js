// ==UserScript==
// @name        Yahoo Fantasy NBA Bench All
// @namespace   http://mattandchristy.net/benchall
// @description Provides a button to bench all players without a game
// @include     http://basketball.fantasysports.yahoo.com/nba/*/*?date=*
// @include     http://basketball.fantasysports.yahoo.com/nba/*/*/editroster
// ==/UserScript==
//
// Change log:
//  2006-12-10  Initial version of script; used Yahoo Fantasy NBA Game Log Link
//              as a base to start developing

var doBench = function(event) {

  var allElements;
  var thisElement;
  var playerLink = "http://sports.yahoo.com/nba/players/"
  var gameLogLink;
  
  
  allElements = document.evaluate(
    "//*[contains(@class, 'player')]/..",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  
  // burn the first two rows; they are headers, not players
  for (var i = 2; i < allElements.snapshotLength; i++) {

    thisElement = allElements.snapshotItem(i);

    tds = thisElement.getElementsByTagName('td');
    nameNode = tds[1];
    if(nameNode) {
          // td       div        a          textnode   value
      name = nameNode.firstChild.firstChild.firstChild.nodeValue;
      
      // get the opponent TD's innerHTML; text node won't work because
      // the &nbsp; for 'no opponent' gets translated to a character =/
      opp  = tds[3].innerHTML;
      
      if(opp == '&nbsp;') {
        
        newPosSelectNode = tds[2].firstChild;
        // select the 'BN' node for these guys (last option)
        newPosSelectNode.selectedIndex = newPosSelectNode.length-1;
        
        GM_log("Benching " + name);
      }
    }  
  }
  
  // stop event propagation, if this was a click
  if(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}

/* 	    gameLogLink = document.createElement('a'); */
/*       gameLogLink.setAttribute("href",thisElement.href + "/gamelog") */
/*       //gameLogLink.setAttribute("class","cellindent") */
/*       gameLogLink.setAttribute("target","_blank") */
/*       gameLogLink.setAttribute("title","game log link") */
/*       gameLogLink.innerHTML = "<img border='0' src='" + gameLogLinkGraphic +"'>"  */
/*       thisElement.parentNode.insertBefore(gameLogLink, thisElement.nextSibling.nextSibling); */

var BENCHBUTTON_ID   = "bencherButton";
var BENCHBUTTON_TEXT = "[Bench players with no game]";

// create the bench button
var bencher = document.createElement("A");
bencher.addEventListener("click", doBench, true);
bencher.href = "#";
bencher.innerHTML = BENCHBUTTON_TEXT;
bencher.className = 'button';
/* bencher.style.backgroundColor = "#D8D9D5"; */
/* bencher.style.borderTopColor = "#A8A8A8"; */
/* bencher.style.borderBottomColor = "#A8A8A8"; */
/* bencher.style.borderLeftColor = "#A8A8A8"; */
/* bencher.style.borderRightColor = "#A8A8A8"; */
/* bencher.style.borderTopStyle = "outset"; */
/* bencher.style.borderBottomStyle = "outset"; */
/* bencher.style.borderLeftStyle = "outset"; */
/* bencher.style.borderRightStyle = "outset"; */
/* bencher.style.borderTopWidth = "1px"; */
/* bencher.style.borderBottomWidth = "1px"; */
/* bencher.style.borderLeftWidth = "1px"; */
/* bencher.style.borderRightWidth = "1px"; */
bencher.style.paddingTop = "2px";
bencher.style.paddingBottom = "5px";
bencher.style.paddingLeft = "5px";
bencher.style.paddingRight = "5px";
bencher.style.color = "#FFFFFF";
bencher.id = BENCHBUTTON_ID;

// attach the bench button right before the "submit changes" button
// at the bottom of the screen
var buttonBar = document.getElementById('buttonbar');
var inputs = buttonBar.getElementsByTagName('input');
var submitButton = inputs[inputs.length-1]
buttonBar.insertBefore(bencher, submitButton);
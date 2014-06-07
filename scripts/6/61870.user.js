// ==UserScript==
// @name           Yahoo Fantasy NBA Bench 'Em All
// @namespace      http://userscripts.org/users/Trecetratops/benchemall
// @description    Provides a couple of buttons next to "Submit Changes" ones to bench every player with night off
// @include        http://basketball.fantasysports.yahoo.com/nba/*

// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0 España License
// @author         Trecetratops
// @version        0.7
// @date           2010-Dec-04

// ==/UserScript==

/*
   I'm not a Javascript guy at all and this is my first try so don't be cruel with your comments :)

   Change log:
      2010-Dec-04   There were problems under circumstances when most of the players were playing.
      2010-Nov-21   Still some positions weren't filled under determined circumstances. Now every player with opponent should fill one starting sport if enough of them are free.
      2010-Nov-19   Further improvement of benching algorithm.
      2010-Sep-26   Slight changes to adapt it to new layout and minor tweaks to improve benching algorithm.
      2009-Dec-19   Added new feature to restore players from bench into the starting lineup if they have opponent.
      2009-Dec-06   Corrected minor bug to avoid inserting Bench button on days with games already played.
      2009-Nov-09  Initial version. This is totally based on "Yahoo Fantasy NBA Bench All" but as the team roster page changed it stopped working, so after some time
                                I decided to try and fix it.
  
   Known issues:
       I was unable to use new Yahoo skin (related to CTA) for Bench buttons. If used, I couldn't capture Click event. I'd be more than glad if anoyne cared to share how to do it. 

   Credits:
       Matt Cooper original developer
       A. Martin who showed me the basics of the DOM world
*/

var doBench = function(event) {

  var allElements;
  var thisElement;
  var myLineup = { "PG":1, "SG":1, "G":1, "SF":1, "PF":1, "F":1, "C":2, "Util":2 };
  var pos, opp, action, candidatePos, candidateIndex;
  var totElmnts = 0, totStarting = 0, numIterations = 0;
  
  allElements = document.evaluate(
    "//*[contains(@class, 'player')]/..",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  totElmnts = allElements.snapshotLength;

  do {
  numIterations++;
    // burn the first two rows; they are headers, not players
  for (var i = 2; i < totElmnts ; i++) {

    thisElement = allElements.snapshotItem(i);
	tds = thisElement.getElementsByTagName('td');
    nameNode = tds[2];

    if(nameNode) {
          // td       div        a          textnode   value
      if(nameNode.childNodes.length > 1) {
      name = nameNode.firstChild.firstChild.firstChild.nodeValue;
      // get the opponent TD's innerHTML; text node won't work because
      // the &nbsp; for 'no opponent' gets translated to a character =/
      opp = tds[4].innerHTML;
	  newPosSelectNode = tds[3].firstChild;
	  lastNodePos = newPosSelectNode.length-1;
	  // first iteration for players with a nominal position, then the ones who can play several of them
	  if(lastNodePos>(numIterations-1)*3 && lastNodePos<=numIterations*3) {
        if(opp == '&nbsp;') {
	      action = "Benching ";
          // select the 'BN' node for these guys (last option)
          newPosSelectNode.selectedIndex = lastNodePos;
	    }
	    else {
          currentPos = tds[0].firstChild.nodeValue;
          action = "Leaving benched ";
          candidateIndex = lastNodePos;
          for (var j = 0; j <= lastNodePos-1; j++) {
              pos = newPosSelectNode.options[j].value;
              if(myLineup[pos]>0) {
                 if (candidateIndex==lastNodePos) {
                   candidatePos = pos;
                   candidateIndex = j;
                   action = "Starting @ " + candidatePos + " ";
                 }
                 // if there's a posibility of playing at C, put him there
			     else if(candidateIndex<lastNodePos && pos == 'C') {
                   candidatePos = pos;
                   candidateIndex = j;
                   action = "Starting @ " + candidatePos + " ";
				 }
              }
          }
        if (candidateIndex<lastNodePos) {
           myLineup[candidatePos] = myLineup[candidatePos]-1;
           totStarting++;
		}   
        newPosSelectNode.selectedIndex = candidateIndex;
        }
        GM_log(action + name);
      }
     }
    }  
   }
  } while (totStarting < 10 && numIterations < 2);
  // two iterations because there's no player able to play in more than 6 positions
  
  // stop event propagation, if this was a click
  if(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // As of 2010-2011 season, button class doesn't do auto-submit hence it has to be done explicitly
  document.getElementById('yspglobalform').submit();
  
}

benchAllowed = (document.getElementById('statsubnav').getElementsByClassName('first last selected').length==1) ? false : true;
if(benchAllowed) {
	// create the bencher1 button for btnbar-1 div
	var bencher1 = document.createElement("INPUT");
	bencher1.addEventListener("click", doBench, true);	
	bencher1.value = 'Bench';
    bencher1.className = 'submit-button';
	bencher1.type = 'submit';

	// Insert it on top navigation bar after Submit Changes button
	var btnbar1 = document.getElementById('btnbar-1');
	btnbar1.appendChild(bencher1);
	
	// create the bencher2 button for buttonbar div
 	var bencher2 = document.createElement("INPUT");
 	bencher2.addEventListener("click", doBench, true);
 	bencher2.value = 'Bench';
 	bencher2.className = 'submit-button';
 	bencher2.type = 'submit';
 	bencher2.name = 'jsubmit';

	// Insert it on bottom navigation bar between Submit Changes & Cancel button
 	var btnbar2 = document.getElementById('buttonbar');
	//em section wasn't allowing me to insert button so I had to clone it to be able to insert it
 	var emclone = btnbar2.childNodes[9].cloneNode(true);
 	var inputs = emclone.getElementsByTagName('input');
 	emclone.insertBefore(bencher2,inputs[inputs.length-1]);
	//and then replace the node
 	btnbar2.replaceChild(emclone, btnbar2.childNodes[9]);
}
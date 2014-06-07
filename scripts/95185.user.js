//
// Shows the bounty set on players on the Estiah PvP pages
//
// Extracted from Gitface's PvP Fight Log script http://userscripts.org/scripts/show/69552
//
// Thanks and credits go to Gitface!
//
// ==UserScript==
// @name	  Estiah - Show bounty
// @description	  Shows the bounty set on players on the Estiah PvP pages
// @include       http://www.estiah.com/pvp
// ==/UserScript==

function getBountyAmount(userid) {
  var e = document.evaluate("//div[@id='SystemInfoCharacter" + userid + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (! e) return 0;
  var thehtml = e.singleNodeValue.innerHTML.replace(/\n/g, '');
  if (thehtml.indexOf("WANTED") >= 0) {
    return parseInt(thehtml.replace(/.*WANTED\!\s*(\d+)g.*/,'$1'));
  }
  return 0;
}

function addBountyToMobList() {
  var mobnodes = document.getElementsByClassName("mob opacity outline BV_system_highlight");
  for (var i = 0; i < mobnodes.length; i++) {
    var thehtml = mobnodes[i].innerHTML.replace(/\n/g, '');
    var charid = thehtml.replace(/.*character\/(\d+).*/,'$1');
    var charname = thehtml.replace(/.*<a[^>]*character\/[^>]+>([^<]+).*/,'$1');

    bounty = getBountyAmount(charid);
    if (bounty != 0) {
      var classdiv = mobnodes[i].getElementsByClassName("name");
      if (classdiv.length != 1) continue;

      var text = document.createElement("text");
      text.className = "pow"; // red
      text.style.fontSize = "smaller";
      text.innerHTML = "(" + bounty + "g)";
      classdiv[0].appendChild(text);
    }
  }
}

function ShowBounty() {
  var thediv = document.getElementById("VsMobList");
  delay = 100; // milliseconds

  if (!thediv) return; // not the PvP page

  // cache a pointer to the original VsList.change function
  var origVsListChangeFunction = unsafeWindow.VsList.change;

  // create my new VsList.change function
  var myVsListChangeFunction = function() {
    // call the original change function then do my stuff
    origVsListChangeFunction();

    // Wait for moblist to get cleared and says 'loading'
    // Then call the next function after that happens
    setTimeout(myVsListChangeFunctionMid, delay)
  };

  // second part of my new VsList.change function
  var myVsListChangeFunctionMid = function() {
    // poll the VsMoblist to see if it still says "loading..."
    var thediv = document.getElementById("VsMobList");
    if (thediv.innerHTML.indexOf("loading...") >= 0) {
      setTimeout(myVsListChangeFunctionMid, delay);
      return;
    }
    // give a delay to finish update of moblist
    setTimeout(myVsListChangeFunctionEnd, delay);
  }

  // last part of my new VsList.change function
  var myVsListChangeFunctionEnd = function() {
    // VsMoblist has updated - add my stuff to the mob list
    addBountyToMobList();
  }

  // overwrite existing VsList.change to point to mine
  unsafeWindow.VsList.change = myVsListChangeFunction;

  addBountyToMobList();
}

// Execute script
window.addEventListener('load',ShowBounty,false);

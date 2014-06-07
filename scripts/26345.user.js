// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// THANK YOU TO http://blog.persistent.info/2007/11/macros-for-new-version-of-gmail.html for keyboard listening script
//
// e - Explore
// b - Battle
// f - Flee
// i - Inventory
// a - First Aid
// c - Chat
// h - Fishing
//
// MADE BY AZNCHONG91
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DicingDangers Shortcuts
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       http://92.48.103.52/*
//
// ==/UserScript==

document.addEventListener('keydown', keyHandler, false);
function keyHandler(event) {

  if (event.altKey || event.ctrlKey || event.metaKey) return;
  
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         (event.target.type.toLowerCase() == "text" ||
          event.target.type.toLowerCase() == "file"))) {
      return;
    }
  }

  var k = event.keyCode;
  
  if (k == 71) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=Rest";
  }
  else if(k==86) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=EXPLORING";
  }
  else if(k==66) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=COMBAT";
  }
  else if(k==70) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=Flee";
  }
  else if(k==73) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=INVENTORY";
  }
  else if(k==67) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=CHAT";
  }
  else if(k==78) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=TEMPLES&command=pray&var1=Eluvir";
  }
  else if(k==75) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=COMBAT&command=fightboss";
  }
  else if(k==77) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=SCROLLS";
  }
  else if(k==76) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=LOCATION";
  }
  else if(k==79) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=OTHERS";
  }
  else if(k==72) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=FISHING";
  }
  else if(k==49) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=ALCHEMY&command=mix&var1=Lesser%20Healing%20Potion";
  }
  else if(k==50) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=ALCHEMY&command=mix&var1=Healing%20Potion";
  }
  else if(k==51) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=ALCHEMY&command=mix&var1=Greater%20Healing%20Potion";
  }
  else if(k==52) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=ALCHEMY&command=mix&var1=Fish%20Stew";
  }
  else if(k==89) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=INVENTORY&command=equip&var1=Lesser%20Healing%20Potion";
  }
  else if(k==88) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=Prayer";
  }

}
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
// 1 - God of man
// 2 - God of el
// 3 - Lesser Shield
// 4 - Lesser Focus
// 5 - Skeleton
// 6 - Lesser HP
// 9 - Alanqa
// 0 - XxExplorerxX
// a - First Aid
// b - Battle
// c - Chat
// e - Explore
// f - Flee
// h - Fishing
// i - Inventory
// l - location
// m - Magic
// n - Clan
// o - others
// p - pray
// r - battle rules
// s - statistic
// t - temple
// z - boss fight
//
// MADE BY AZNCHONG91
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DicingDangers Shortcuts
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include      http://92.48.103.52/fantasy/*
// @include       http://forestrowproperty.co.uk/fantasy/*
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
  
  if(k==49)      {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=TEMPLES&command=pray&var1=Hurn";
  }
  else if(k==50) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=TEMPLES&command=pray&var1=Eluvir";
  }
  else if(k==51) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?var5=2854&var1=Lesser+Shield+Scroll&command=use&screen=SCROLLS";
  } 
  else if(k==52) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?var5=2854&var1=Lesser+Focus+Scroll&command=use&screen=SCROLLS";
  } 
  else if(k==53) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?var5=2854&var1=Summon+Skeleton&command=use&screen=SCROLLS";
  }
  else if(k==54) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=INVENTORY&command=equip&var1=Lesser%20Healing%20Potion";
  }
  else if(k==57) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=1963";
  }
  else if(k==48) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=swapcharacter&var1=2854";
  }
  else if(k==65) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=Rest";
  }
  else if(k==66) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=COMBAT";
  }
  else if(k==67) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=CHAT";
  }
  else if(k==69) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=EXPLORING";
  }
  else if(k==70) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=Flee";
  }
  else if(k==72) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=FISHING";
  }
  else if(k==73) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=INVENTORY";
  }
  else if(k==76) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=LOCATION";
  }
  else if(k==77) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=SCROLLS";
  }
  else if(k==78) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=CLAN";
  }
 else if(k==79)  {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=OTHERS";
  }
 else if(k==80) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?command=Prayer";
  }
 else if(k==82) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=ADVANCEDCOMBAT";
  }
 else if(k==83) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=STATS";
  }
 else if(k==84) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=TEMPLES";
  }
 else if(k==90) {
    document.location.href = "http://92.48.103.52/fantasy/game.php?screen=COMBAT&command=fightboss";
  }
}
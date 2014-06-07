// ==UserScript==
// @name          Autotask ticket refresh
// @namespace     http://userscripts.org/users/597255
// @description   Refresh Autotask ticket page every x seconds
// @include       https://*.autotask.net/serviceDesk/TicketsList/*
// @CodedBy       F34RInc based on AyoobAli's Auto Refresh
// @version       1.0.1
// @licence       GNU General Public License
// @grant         none
// @downloadURL   http://userscripts.org/scripts/source/399640.user.js
// @updateURL     http://userscripts.org/scripts/source/399640.meta.js
// ==/UserScript==


//===[Settings]===\\
var StRefTime = '120';  //==[Set time by seconds]
var today = new Date();
var UTCstring = today.toLocaleString("en-US", {hour12: true});
//===[/Settings]===\\


top.document.title = "Autotask - " + UTCstring;

if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000)
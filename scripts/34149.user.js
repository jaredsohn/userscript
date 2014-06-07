// ==UserScript==
// @name           BUX.TO any Domain wwww,www3 or any random! [WORKING] 
// @copyright         Prashant Patil
// @description    orkutfans.com bux.to auto clicker! 100% working! Dont play with source! :P
// @version        1.2.21.09.08
// @include        http://*.bux.to/surf.php
// @include        http://*.bux.to/surf.*
// @include        http://*.*.*/surf.php
// ==/UserScript==

// Enhanced by JoeSimmons

var tim,aurl,i=0,xid,ifr,atim;

tim = prompt('Input time including time to load page\n Normally 35 (in seconds)','35').match(/\d+/);
aurl = window.document.domain;
xid = document.evaluate("//a[contains(@href, 'view.php?ad')]", document, null, 7, null);
alert("Wait for "+Math.ceil((xid.snapshotLength*tim)/60)+" minutes to surf all ads. \nAnd take your time to surf our website.\nwww.orkutfans.com");

ifr = document.createElement('iframe');
ifr.setAttribute('name', 'phrash');
//ifr.setAttribute('style', 'display:none;');
ifr.width=800;
ifr.height=600;
document.body.appendChild(ifr);

function a() {
  window[0].location.href = xid.snapshotItem(i).href;
  i++;
  if (i == xid.snapshotLength+1) {
    alert("We did today's ads! Happy?\nCheck once from your status!\nOr surf ads section.");
    window[0].location="http://www.filmyaishwarya.com";
   }
 }

if(xid.snapshotLength > 0) {a();setInterval(a,tim*1000);} else {return;}
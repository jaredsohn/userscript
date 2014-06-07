// ==UserScript==
// @name          MySpace Clean Bulletins
// @version       12
// @date          2009-11-22
// @description   Cleans up bulletin pages to make better use of the space.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2006-2009 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/5609.js?maxage=5
// @include       http://bulletins.myspace.com/index.cfm?*fuseaction=bulletin.read*
// @include       http://bulletins.myspace.com/index.cfm?*fuseaction=bulletin
// @include       http://bulletins.myspace.com/index.cfm?*fuseaction=bulletin&*
// @include       http://bulletins.myspace.com/Modules/Bulletins/Pages/Index.aspx?*
// @include       http://bulletins.myspace.com/index.cfm?*fuseaction=bulletin.ShowMyBulletins*
// ==/UserScript==

// OPTION: Remove annoying HTML tags from bulletins (big, font, h1-6, small, style).
// Default: true.

var removeAnnoyingTags = true;

// Don't edit below this line unless you know what you're doing.

var location = window.location.href;
if (location.indexOf('bulletin.read') > -1) {

   var wideBulletinTable = document.getElementById('bulletin_columns');
   if (wideBulletinTable && wideBulletinTable.rows[0].cells[1]) {
      wideBulletinTable.rows[0].deleteCell(1); // this has some ads in it. they make the page too wide. good going, myspace.
   }
   
   var readBulletin = document.getElementById('betterb');
   readBulletin.setAttribute('style','width: 930px !important; margin: 0 10px 0 10px');
   if (removeAnnoyingTags == true) {
      var bulletinText = readBulletin.rows[3].cells[1];
      // let's create a dummy variable to do our transformations and reinsert them all at the end. this prevents Firefox from closing tags we haven't closed yet.
      var lala = bulletinText.innerHTML.replace(/<\/?(big|font|small|style)[^>]*>/ig,'') + '';
      // replace h1-6 with block elements
      lala = lala.replace(/<h[1-6][^>]*>/ig,'<span style="display: block !important">') + '';
      lala = lala.replace(/<\/h[1-6][^>]*>/ig,'</span>') + '';
      bulletinText.innerHTML = lala;
      bulletinText.setAttribute('style','font-size: 9pt !important');
   }
   var bulletinTextContainer = document.getElementById('ctl00_ctl00_cpMain_cpMain_BulletinRead_ltl_body');
   if (bulletinTextContainer) {
      bulletinTextContainer.setAttribute('style','width: 100% !important; line-height: normal !important');
   }
   
}
else {

   var ad = document.getElementById('narrow_ad');
   if (ad) {
      ad.parentNode.removeChild(ad);
   }
   
   var bulletinTableWrap = document.evaluate("//div[@class='bulletin_wrap']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
   if (bulletinTableWrap) {
      bulletinTableWrap.setAttribute('style','width: 919px !important');
      var tables = bulletinTableWrap.getElementsByTagName('table');
      if (tables) { // probably will be tables
         for (i = 0; i < tables.length; i++) {
            tables[i].setAttribute('style','width: 919px !important');
         }
      }
   }
}

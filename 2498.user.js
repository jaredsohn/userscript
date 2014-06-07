// Yahoo Finance Enhancer
// version 0.2 BETA!
// 2005-12-30
// Copyright (c) 2005, Steve Zhou
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script default Yahoo charts to the "TA" charts; and add the 
// following links when approriate:
// 
// - stockcharts, big charts for additional charting
// - msn.money, morningstar, and etf-connect for additional info
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Y! finance enhancement
// @namespace       http://sxz.org
// @include         http://finance.yahoo.com/q?s=*
// ==/UserScript==
//
// --------------------------------------------------------------------

(function() {
   var allLinks, thisLink;
   var scLink, mbLink, piLink, rkLink;
   var sym;
      
   var leftNavTbl = document.getElementById('leftNavTable');
   allLinks = document.evaluate(
      '//a[@href]',
      leftNavTbl,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
   for (var i = 0; i < allLinks.snapshotLength; i++) {
      thisLink = allLinks.snapshotItem(i);
      if (thisLink.href.match(/\/q\/mb\?s=(\w*)/i)) {
         sym = RegExp.$1
         mbLink = thisLink;
         GM_log('MB after: '+mbLink.href);
      }      
      else if (thisLink.href.match(/\/q\/pi\?s=(\w*)/i)) {
         sym = RegExp.$1
         piLink = thisLink;
         GM_log('PI after: '+piLink.href);
      }         
      else if (thisLink.href.match(/\/q\/rk\?s=(\w*)/i) && !rkLink) {
         sym = RegExp.$1
         rkLink = thisLink;
      }        
   }   
   
   allLinks = document.evaluate(
      '//a[@href]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
   for (var i = 0; i < allLinks.snapshotLength; i++) {
      thisLink = allLinks.snapshotItem(i);
      //GM_log('running inside loop'+thisLink.href);
      if (thisLink.href.match(/\/q\/bc\?s=/i)) {
         thisLink.href = thisLink.href.replace(/\/q\/bc/g,'/q/ta');
         if (piLink)
            thisLink.href += '&l=on&z=l&q=l&p=e50,e100&a=ss,m26-12-9,p12,r14&c=';
         else
            thisLink.href += '&l=on&z=l&q=c&p=e50,e100,v&a=ss,m26-12-9,p12,r14&c=';
         //GM_log('running inside after: '+thisLink.href);   
      }   
      else if (thisLink.href.match(/\/q\/ta\?s=(\w*)/i)) {
         sym = RegExp.$1
         GM_log('TA to stkcharts: '+sym);
         scLink = document.createElement("sc");
         scLink.innerHTML = '<a href="http://stockcharts.com/def/servlet/SC.web?c=' + sym + ',uu[h,a]daclyyay[pb50!b150][vc60][iLh14,3!La12,26,9]&pref=G">Stockcharts</a>';
         thisLink.parentNode.replaceChild(scLink, thisLink);
         GM_log('TA to stkcharts after: '+scLink.href);
      }    
   }
   
   if (scLink) {
      var bcLink = document.createElement("bc");
      bcLink.innerHTML = '<br><a href="http://bigcharts.marketwatch.com/intchart/frames/frames.asp?symb=' + sym + '">Big Chart</a>';
      scLink.parentNode.insertBefore(bcLink, scLink.nextSibling);               
   }
   
   if (mbLink) {
         var msnLink = document.createElement("msn");
         msnLink.innerHTML = '<br><br><a href="http://moneycentral.msn.com/investor/invsub/advisor/advisor.asp?Symbol=' + sym + '">MSN Money</a>';
         mbLink.parentNode.insertBefore(msnLink, mbLink.nextSibling);         
   }
   
   if (piLink) {
         var mstarLink = document.createElement("mstar");
         mstarLink.innerHTML = '<br><br><a href="http://quicktake.morningstar.com/Fund/Snapshot.asp?Country=USA&pgid=hetopquote&Symbol=' + sym + '">Morningstar</a>';
         piLink.parentNode.insertBefore(mstarLink, piLink.nextSibling);         
         
         var msnLink = document.createElement("msn");
         msnLink.innerHTML = '<br><a href="http://moneycentral.msn.com/investor/invsub/advisor/advisor.asp?Symbol=' + sym + '">MSN Money</a>';
         piLink.parentNode.insertBefore(msnLink, mstarLink.nextSibling);                 
   }
   
   if (!mbLink && !piLink && rkLink) {  
         var mstarLink = document.createElement("mstar2");
         mstarLink.innerHTML = '<br><br><a href="http://quicktake.morningstar.com/Fund/Snapshot.asp?Country=USA&pgid=hetopquote&Symbol=' + sym + '">Morningstar</a>';
         rkLink.parentNode.insertBefore(mstarLink, rkLink.nextSibling);         
         
         var msnLink = document.createElement("msn2");
         msnLink.innerHTML = '<br><a href="http://moneycentral.msn.com/investor/invsub/advisor/advisor.asp?Symbol=' + sym + '">MSN Money</a>';
         rkLink.parentNode.insertBefore(msnLink, mstarLink.nextSibling);    
         
         var etfLink = document.createElement("etfc");
         etfLink.innerHTML = '<br><a href="http://www.etfconnect.com?tick=' + sym + '">ETF Connect</a>';
         rkLink.parentNode.insertBefore(etfLink, msnLink.nextSibling);        
         GM_log('ETF stuff: '+mstarLink.nodeName+",  "+rkLink.parentNode.nodeName);         
   }
   
})()

//window.addEventListener("load", function() { doit() }, false);


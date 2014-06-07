// ==UserScript==
// @name           MyNEU javascript remover
// @namespace      tag:brainonfire.net,2008-07-27:myneu-less-script
// @description    Replace Javascript popup links with real links & target=_blank
// @include        *myneu*
// @include        *nuapps*.nsf*
// @version        1.0
// ==/UserScript==


/* Adapted from http://wiki.greasespot.net/XPath_Helper */
function $xpath(p, context) {
   var doc = document;
   if(!context) {
      context = document;
   } else if(context instanceof Document) {
      doc = context;
   }
   var arr = [];
   var xpr = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for(var i = 0; item = xpr.snapshotItem(i); i++)
      arr.push(item);
   return arr;
}

function makeSimpleLink(el, href) {
   el.setAttribute('href', href);
   el.setAttribute('target', '_blank');
}

//modules
function loc_generic() {
   var re_tabs = /^javascript:(?:Open(?:Win)?(?:NEU)?[0-9]*|OpenBB)\s*\('https?:(([^']|\\')+?)'.*\);*$/i;

   var tabs = $xpath('//a[starts-with(@href, "javascript:")]');
   tabs.forEach(function(link) {
      var oldHref = link.getAttribute('href');
      var newHref = oldHref.replace(re_tabs, '$1');
      if(oldHref !== newHref) {
         makeSimpleLink(link, newHref);
      }
   });
	
   var map_openwin = {
      email: "https://myneu.neu.edu/jsp/email/emailCenter.jsp?force=true",
      myfiles: "http://myneu.neu.edu/cp/ip/login?sys=xythos&url=https://myfiles.neu.edu/xythoswfs/webview/fileManager.action?x=y%26shareLogin=false%26stk=${_MYID}",
      shopcart: "http://myneu.neu.edu/cp/ip/login?sys=cshnet&url=https://commerce.cashnet.com/cashnet${_REV}/selfserve/youraccount.aspx",
      mua: "http://myneu.neu.edu/cp/wu/mua",
      calendar: "http://myneu.neu.edu/cp/wu/calendar_redirect",
      admin: "https://myneu.neu.edu/jsp/admin/Admin.jsp",
      helpAdmit: "http://myneu.neu.edu/myneu/icons/help-admitted.html",
      helpFS: "http://myneu.neu.edu/myneu/icons/help-FS.html",
      acctadmin: "http://myneu.neu.edu/cp/ip/login?sys=was&url=https://nuapps1.neu.edu/applications/manageaccount2.nsf/LDAPAccAdministration%3FOpenForm"
   };
   var re_openwin = /^javascript:OpenWin\('([a-z0-9_\-]+)'\);$/i;

	var openwin = $xpath('//a[starts-with(@href, "javascript:OpenWin")]');
	openwin.forEach(function(link) {
	   var id = re_openwin.exec(link.getAttribute('href'))[1];
	   var dest = map_openwin[id];
	   if(dest) {
         makeSimpleLink(link, dest);
	   }
	});
}

// Put in modules here, to be called in different URL contexts

function loc_announcements() {
   var inner = document.getElementById('trumba.spud.0.iframe').contentDocument;
   $xpath('//a[starts-with(@href, "javascript:Nav(")]', inner).forEach(function(link) {
      makeSimpleLink(link, 'http://www.northeastern.edu/studentlife/calendar/?trumbaEmbed=eventid%3D'+link.getAttribute('eventid')+'%26view%3Devent%26-childview%3D');
   });
}

function loc_lotusListing(appID, listingID, listingView) {
   var lotusDesignDict = {
      coopannounce2:{recent:'Type', archive:'TypeArchive'},
      infoannounce:{recent:'Type', archive:'TypeArchive'},
      libannounce:{recent:'AnnouncementHeadlines', archive:'AnnouncementArchive'}
   };
   var lotusDesign = lotusDesignDict[listingID];
   if(!lotusDesign) { return; }
   
   var re_popAnnounce = /^javascript:showPopUp\('([a-f0-9]+)'\);*$/i;

   var links = $xpath('//a[starts-with(@href, "javascript:showPopUp(")]');
   links.forEach(function(link) {
      var oldHref = link.getAttribute('href');
      var newHref = oldHref.replace(re_popAnnounce, location.href.replace(/\.nsf\/\([a-z]+\)\?.*$/i, '.nsf/('+lotusDesign.archive+')/')+'$1?opendocument');
      if(oldHref !== newHref) {
         makeSimpleLink(link, newHref);
      }
   });
   
   var archives = $xpath('//a[starts-with(@href, "javascript:showPopUpArchive()")]');
   archives.forEach(function(archive) {
      makeSimpleLink(archive, location.href.replace(/\.nsf\/\([a-z]+\)\?openview/i, '.nsf/('+lotusDesign.archive+')?Openview'));
   });
}

// Main sections

loc_generic();

// Put in the URL-switched module calls here

if(location.href == 'http://myneu.neu.edu/myneu/if/NUannouncementsStudent.html') {
   //TODO setTimeout(loc_announcements, 1000);
}

var checkLotusListing = /^http:\/\/nuapps([0-9]+)\.neu\.edu\/applications\/(coopannounce2|infoannounce|libannounce)\.nsf\/\(([a-z]+)\)\?OpenView/i.exec(location.href);
if(checkLotusListing) {
   var appID = checkLotusListing[1];
   var listingID = checkLotusListing[2];
   var listingView = checkLotusListing[3];
   loc_lotusListing(appID, listingID, listingView);
}

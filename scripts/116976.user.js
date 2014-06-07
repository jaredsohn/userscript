// ==UserScript==
// @name            GC Challenge Killer
// @namespace       http://www.cryotest.com/
// @description     Remove all references to challenges on geocaching.com.
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include         http://www.geocaching.com/*
// @include         https://www.geocaching.com/*
// @version         0.09
// @require         http://usocheckup.redirectme.net/116976.js?maxage=7
// @icon            http://s7.postimage.org/ueob3yus7/gc_challenge_killer.png
// ==/UserScript==

//**************************************************
// Change Log
// ----------
// V 0.01
// -First release.
// 
// V 0.02
// -Added https include.
// -Avoided some errors on loading elements.
// -Now works on the home page when logged out.
// -Added updater.
// 
// V 0.03
// Added icon. 
// 
// V 0.04
// Removed a stray debug statement. 
//
// V 0.05
// Remove the challenges tab on the public profile page. 
// Remove challenge totals in the friends list.
//
// V 0.06
// The menus on the profile page are different for non-premium members. 
//
// V 0.07
// Fixed the menus on the profile page after site changes. The code is now the same for basic and premium members.
//
// V 0.08
// Removed the Challenges Completed panel on users' profile tab.
//
// V 0.09
// Changed the updater as the previous one is now dead. Scripts that had already downloaded the updater
//  would be unaffected but new downloads would be corrupted by the failing updater.
//**************************************************

(function() 
{
  // Find out where we are.
  var sPath = window.location.pathname;
  // ** Main menu **
  var elMenu = document.getElementById("Navigation");
  if(elMenu != null){
    // Play/Find Challenges menu item.
    var elmWidget = document.getElementById("ctl00_hlSubNavChallenges");
    if(elmWidget){
      elmWidget.parentNode.removeChild(elmWidget);
    }
    // Your Profile/Challenges menu item.
    elmWidget = document.getElementById("ctl00_hlSubNavProfileChallenges");
    if(elmWidget){
      elmWidget.parentNode.removeChild(elmWidget);
    }
  }
  
  // ** Front page **
  if(sPath == '/default.aspx'){
    var elmWidget = document.evaluate("//div[@class='HomeChallengesWidget']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(elmWidget != null){
      elmWidget.setAttribute("style", "display: none;");
    }
  }
  
  // ** Profile page **
  if(sPath == '/profile/'){
    // Challenges tab on profile page..
    elmWidget = document.evaluate("//li[@id='liUserChallengesStats']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(elmWidget != null){
      elmWidget.setAttribute("style", "display: none;");
    }
    // Challenges completed box on any user's profile page
    elmWidget = document.evaluate("//div[@id='ctl00_ContentBody_ProfilePanel1_Panel_ChallengesStatBox']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(elmWidget != null){
      elmWidget.setAttribute("style", "display: none;");
    }
  }
  if(sPath == '/my/' || sPath == '/my/default.aspx' || sPath == '/my/lists.aspx' || sPath == '/my/geocaches.aspx' || sPath == '/my/travelbugs.aspx' || sPath == '/my/owned.aspx'){
    // Top link.
    elmWidget = document.evaluate("//div[@id='ctl00_divContentMain']//p", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    elmWidget2 = document.evaluate("//div[@id='ctl00_divContentMain']//p//a[@href='challenges.aspx']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    elmWidget2.setAttribute("style", "display: none;");
    elmWidget.innerHTML = elmWidget.innerHTML.replace('&nbsp;| <!-- same here -->','');
  }
  if(sPath == '/my/default.aspx' || sPath == '/my/'){
    // Search Options side menu.
    elmWidget = document.evaluate("//li//a[@id='ctl00_ContentBody_hlNearbyChallenges']//ancestor::ul", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(elmWidget != null){
      var child = elmWidget.childNodes[5];
      elmWidget.removeChild(child);
    }
    
    // Premium Features side menu.
    elmWidget = document.evaluate("//li//a[@id='ctl00_ContentBody_hlCreateChallenge']//ancestor::ul", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(elmWidget != null){
      child = elmWidget.childNodes[9];
      elmWidget.removeChild(child);
    }
  }
  if(sPath == '/my/myfriends.aspx'){
    // Challenge totals in friend list.
    var elChallenges = document.evaluate("//dl[@class='FriendList']//dt[7]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var elNumChallenges = document.evaluate("//dl[@class='FriendList']//dd[7]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < elChallenges.snapshotLength; i++) {
      elChallenges.snapshotItem(i).setAttribute("style", "display: none;");
      elNumChallenges.snapshotItem(i).setAttribute("style", "display: none;");
    }
  }
   
  // ** Cache pages*
  if(sPath == '/seek/cache_details.aspx'){
    // Remove challenge stats in the profile block.
    var logTable = document.getElementById ("cache_logs_container");
    logTable.addEventListener('DOMNodeInserted', function(e) {
      var elmWidget = document.evaluate("//img[@src='/images/challenges/types/sm/challenge.png']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (elmWidget) {
        var stats = elmWidget.parentNode.innerHTML;
        var i = stats.indexOf('&nbsp;');
        elmWidget.parentNode.innerHTML = stats.substr(0, i);
      } 
    }, false);
  }

})();



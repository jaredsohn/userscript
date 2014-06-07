// ==UserScript==
// @name Remove MuchoSucko Ads and make comments scrollable
// @namespace      http://www.muchosucko.com/show/

// @description Removes adult ads, Adds scrollable field to comments
// @include http://www.muchosucko.com/show/*

// ==/UserScript==

// CHANGELOG v0.1 created initial script


function removeAds() 
{
  //remove Dumb ad divs
  var adSidebar = document.getElementById('friendslist');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('recent_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('more_recent_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('popular_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('more_popular_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('bottom_friends');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('bottom_menu');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('comment-invite');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}

  //remove all iframes
  var alliFrames, thisiFrame;
  alliFrames = document.getElementsByTagName('iframe');
  for (var i = 0; i < alliFrames.length; i++) 
  {
    thisiFrame = alliFrames[i];
    // do something with iFrame
    thisiFrame.width = 0;
    thisiFrame.height = 0;
  }
}

function addScroll()
{
  //Comments area 
  var adSidebar = document.getElementById('comments_0');
  adSidebar.style.width = '468px';
  adSidebar.style.height = '200px';
  adSidebar.style.overflow = 'scroll'; 

}


removeAds();
addScroll();

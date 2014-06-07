// ==UserScript==
// @name           Remove SitePoint Forums Sponsor Ads
// @description    Removes the SitePoint sponsor advertisements on the forums
// @include        http://www.sitepoint.com/forums/*
// ==/UserScript==

(function () {
  var adDiv = document.getElementById('forum_ads_pic');
  adDiv.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
  return true;
})();
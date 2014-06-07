// ==UserScript==
// @name         UserStyles.org Ad Remover
// @namespace    userstylesOrgRemoveAds
// @include      http://userstyles.org/*
// @include      https://userstyles.org/*
// @match        http://userstyles.org/*
// @match        https://userstyles.org/*
// @datecreated  2010-03-20
// @lastupdated  2010-03-20
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscripts removes all of the advertisement parts of the DOM at userstyles.org, even if you use Adblocker or NoScript to block the ads, the DOM fragments still remain, this userscript will get rid of them.
// ==/UserScript==

(function(d){
  var ad,ads=d.getElementsByClassName("ad");
  for(var i=ads.length-1;i>=0;i--){
    ad=ads[i];
    ad.parentNode.removeChild(ad);
  }
  ad=d.getElementById('donate');
  if(ad) ad.parentNode.removeChild(ad);
})(document);

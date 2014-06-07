// ==UserScript==
// @name         Stack Overflow Hide Job Ads
// @namespace    stackoverflowHideJobAds
// @include      http://stackoverflow.com/*
// @include      http://superuser.com/*
// @match        http://stackoverflow.com/*
// @match        http://superuser.com/*
// @datecreated  2010-03-12
// @lastupdated  2010-03-22
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will hide job ads at Stack Overflow.
// ==/UserScript==

(function(d){
  var ele, eles = d.evaluate("//div[contains(@class,'everyonelovesstackoverflow') or contains(@class,'welovestackoverflow')]",d,null,7,null);
  for(var i=0; i < eles.snapshotLength; i++){
    ele = eles.snapshotItem(i);
    ele.parentNode.removeChild(ele);
  }
})(document);

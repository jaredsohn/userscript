// ==UserScript==
// @id             reports.adblockplus.org-d929a543-a30d-4c8a-a7c9-a4ee619a91ff@http://d.hatena.ne.jp/k2jp/
// @name           Reset the default to unlimit LAST 24 HOURS
// @version        1.2
// @namespace      http://d.hatena.ne.jp/k2jp/
// @author         k2jp
// @description    Switch the default config of digest page at reports.adblockplus.org for subscription authors to reset the default to unlimit LAST 24 HOURS.
// @match          *://reports.adblockplus.org/digest?id=*
// @exclude        about:blank
// @run-at         document-start
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// @require        https://code.jquery.com/jquery-latest.min.js
// @grant          none
// ==/UserScript==
// ChangeLog
//   1.2  : Initial Release, forked from https://userscripts.org/scripts/show/131271
(function(){
  var self = this;
  
  // Avoid conflict
  self.$ = self.jQuery = jQuery.noConflict(true);

  localStorage &&
    localStorage.setItem('time', '8760') &&
    $('#reports').listview('refresh');
}) ();
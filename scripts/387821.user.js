// ==UserScript==
// @id             reports.adblockplus.org-e6209be3-0ed2-4496-99d7-453ce3b603de@http://d.hatena.ne.jp/k2jp/
// @name           Reset the default to hide issue reports with STATUS
// @version        1.2
// @namespace      http://d.hatena.ne.jp/k2jp/
// @author         k2jp
// @description    Switch the default config of digest page at reports.adblockplus.org for subscription authors to hide issue reports with STATUS.
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
    localStorage.setItem('status', '0') &&
    $('#reports').listview('refresh');
}) ();
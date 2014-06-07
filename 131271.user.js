// ==UserScript==
// @id             reports.adblockplus.org-23240656-42ba-4bbe-81da-a9e7ce0e1309@http://d.hatena.ne.jp/k2jp/
// @name           Reset the default to hide KNOWN issue reports
// @version        1.2
// @namespace      http://d.hatena.ne.jp/k2jp/
// @author         k2jp
// @description    Switch the default config of digest page at reports.adblockplus.org for subscription authors to hide KNOWN issues reports.
// @match          *://reports.adblockplus.org/digest?id=*
// @exclude        about:blank
// @run-at         document-start
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// @require        https://code.jquery.com/jquery-latest.min.js
// @grant          none
// ==/UserScript==
// ChangeLog
//   1.2  : Eliminated redundant window object and use jQuery listview('refresh') instead of location.reload(true).
//   1.1.4: Use match metadata instead of include for better scheme support.
//   1.1.3: Use document instead of window
//   1.1.2: Use reload(true) instead of reload().
//   1.1.1: Eliminated unsafeWindow
//   1.1  : Added myWindow as global object
//   1.0  : Initial Release
(function(){
  var self = this;
  
  // Avoid conflict
  self.$ = self.jQuery = jQuery.noConflict(true);

  localStorage &&
    localStorage.setItem('known', '0') &&
    $('#reports').listview('refresh');
}) ();
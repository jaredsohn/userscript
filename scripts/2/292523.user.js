// ==UserScript==
// @name           Plugwoot
// @namespace      Tawi jordan
// @include        http://plug.dj/
// @updateURL      http://userscripts.org/scripts/source/167986.user.js
// @downloadURL    http://userscripts.org/scripts/source/167986.user.js
// @version        2.0.20
// @description    Plugwoot (autowoot) for plug.dj
// @copyright      2017+ ๖ۣۜĐل - ɴᴇᴏɴ - TFL 
// ==/UserScript==

var path = 'http://pastebin.com/raw.php?i=';

var scriptFail = window.setTimeout(function() {
  message('Oops! An Error Occurred');
  }, 2000);

(function(){
$.getScript(path + 'NPqKyJwy', function() {
 message("version "+ PlugStation.version +" is now available!");
 console.log("Plugwoot "+ PlugStation.version +" - Created by ๖ۣۜĐل - ɴᴇᴏɴ - TFL");
 window.clearTimeout(scriptFail);
 });});
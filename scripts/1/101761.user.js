// ==UserScript==
// @name           Skip the opening AD page at gihyo.jp
// @description    Skip the annoying opening AD page which is shown when you don't have cookie for gihyo.jp .
// @license        GNU GPL v3: http://www.gnu.org/licenses/gpl.html
// @version        1.1.1
// @author         k2jp
// @namespace      http://d.hatena.ne.jp/k2jp/
// @match          *://gihyo.jp/*
// @exclude        about:blank
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// @grant          none
// ==/UserScript==
// ChangeLog
//              1.1.1: Use match metadata instead of include for better scheme support.
//              1.1  : Use "DOMContentLoaded" event instead of deprecated "DOMNodeInserted"
//                     Use document object instead of window
//                     Added "grant none" into Metadata Block
//              1.0  : Event switched to from "load" to "DOMNodeInserted".
//              0.1  : Initial Release.
(function(){
  document.addEventListener(
    'DOMContentLoaded', 
    function(){ document.getElementById('skip') && document.location.reload(true); },
    true
  );
})();
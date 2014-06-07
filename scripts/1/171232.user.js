// ==UserScript==
// @name        Hackforums Exit Post Warning Script
// @namespace   +Cloud
// @description This will give you a warning if your posting something
// @include     http://www.hackforums.net/newreply.php*
// @include     https://www.hackforums.net/newreply.php*
// @include     www.hackforums.net/newreply.php*
// @include     https://www.hackforums.net/editpost.php*
// @include     http://www.hackforums.net/editpost.php*
// @include     www.hackforums.net/editpost.php*
// @grant       none
// @version     1.0
// ==/UserScript==
      var hook = true;
      window.onbeforeunload = function() {
        if (hook) {
          return "Are you finished here?"
        }
      }
      function unhook() {
        hook=false;
      }
   1. // ==UserScript==
   2. // @name               Auto Deny Friend Request
   3. // @namespace         http://softwareorkut.blogspot.com
   4. // @description     Auto Deny Friend Request on Orkut
   5. // @include            http://www.orkut.com/*
   6. // @exclude    http://www.orkut.com/Friens.aspx
   7. // @exclude    http://www.orkut.com/Home.aspx
   8. // ==/UserScript==
   9.
  10. window.addEventListener(
  11.     'load',
  12.     function() {
  13.     if ( window.location.href.match("FriendAdd") == ("FriendAdd") ) {
  14.         window.location.href = "javascript: _submitForm(document.getElementById('b1'),'no');"
  15.         }
  16.     },
  17.     true);
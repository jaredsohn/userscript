// ==UserScript==
// @author	  Paul Downey http://blog.whatfettle.com
// @name          Flickr Edit Profile Big Box
// @description	  Enlarges the Flickr Describe Yourself.. edit box
// @namespace     http://whatfettle.com/GreaseMonkey/flickrprofilebigbox.user
// @include       http://www.flickr.com/profile_edit.gne
// @version 0.1
// ==/UserScript==

// Tested with:
//    Firefox 1.5 Beta 2 OSX
//    Firefox 1.0.7/GM 0.5.3 Windows XP
//
// Version History:
// 0.1 initial version

(function()
{

    GM_addStyle('#Main, #Main2 {margin-left: 20px; width: auto;}')
    var nodes = document.getElementsByTagName("textarea");

    nodes[0].cols = 180;
    nodes[0].rows = 40;

})();

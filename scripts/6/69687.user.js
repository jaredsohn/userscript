/*
 YouTube Popout
 version 0.1
 20010-02-22
 Copyright (c) 2010, dividtechnology.com
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script.
 http://greasemonkey.mozdev.org/

*/

// ==UserScript==
// @name          YouTube Popout
// @description   Automatically redirects to youtube popout sometimes
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// ==/UserScript==

(function() {

// Grabbing Video Id
    function gup( name ) {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
      if( results == null )
        return "";
      else
        return results[1];
    };
    
    var ytvidid
    ytvidid = gup( 'v' );

		if (ytvidid != null) {
      var link = "http://www.youtube.com/watch_popup?v=";
      var flink = link+ytvidid;
      var lcheck = location.href;
      if(lcheck != flink){window.location = flink;}
		}
	
})();

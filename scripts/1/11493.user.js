// ==UserScript==
// @name           YouTube Pure Video Pages v0.3
// @namespace      http://www.timeblog.net
// @description    YouTube video pages are cleared of EVERYTHING! Use addresses starting with www.youtube for removed and without www. to see unstripped version. Configure flags in script header.
// @include        http://www.youtube.com/watch*
// ==/UserScript==

//Each element will be removed only if its flag is set to 1
var flagArray = new Array();
flagArray['masthead'] = 1; //The header with the YouTube logo and Menu
flagArray['util-links'] = 1; //The small top-right menu with Login etc.
flagArray['watch-ratings-views'] = 0;  //The box with Rating and Viewcount
flagArray['watch-actions-area'] = 1; //Watch Actions: Share, facebook etc.
flagArray['watch-comments-stats'] = 1; //Comment and Stats area
flagArray['watch-other-vids'] = 1; //watch other vids box
flagArray['footer'] = 1; //Footer


(function() {

	for (var flagKey in flagArray){

		if (flagArray[flagKey] == 1){
    			var myNode = document.getElementById(flagKey);
    			if (myNode!=null) {
          			myNode.parentNode.removeChild(myNode);
    			}
		}
	}
	

})();
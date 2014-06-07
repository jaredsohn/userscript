// # Author: Xiao.L ( http://twitter.com/xiaoliulx )

// ==UserScript==
// @name        Brizzly Fluid WebApp Badge
// @namespace   http://fluidapp.com
// @description This little Userscript Snippet adds the number of newly arrived tweets (from Home Section) as a dock badge if you setup Brizzly as a Fluid WebApp.
// @include     *
// @author      Xiao Liu
// @version     0.1 (18-Mar-2010)
// ==/UserScript==

(function () {
    if (window.fluid) {
		function updateBrizzlyBadges() {
			var tweetcontainer=document.getElementsByClassName('notification-bar-container');
			var tweetcount=tweetcontainer.length;
			var newtweetcount=0;
			for(var i=0;i<tweetcount;i++){
				if((tweetcontainer[i].firstChild.firstChild.attributes['class'].value)=='notification-bar-contents new-item'){
					newtweetcount++;
				}
			}
			window.fluid.dockBadge = (newtweetcount>0)?newtweetcount.toString():'';
			setTimeout(updateBrizzlyBadges, 500);
		}
		updateBrizzlyBadges();
    }
})();
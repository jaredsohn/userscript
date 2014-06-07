// ==UserScript==
// @name        ffbadge
// @namespace   http://fluidapp.com
// @description Populates the badge for FriendFeed.com
// @include     *
// @author      Andrew McHarg
// ==/UserScript==

(function () {
    if (window.fluid) {
      var realtime = window.realtime;
      var oldPush = realtime.queuePush;

      var unreadCount = 0;
      var pageFocused = false;
     
      function updateUnread(count) {
	window.fluid.dockBadge = (count == 0) ? "" : count;	  
      }
      
      window.addEventListener("mouseover", function(e) {
	  var oldUnread = unreadCount;
	  unreadCount = 0;

	  if (oldUnread != 0)
	    updateUnread(unreadCount);

	  pageFocused = true;
	},false);
      
      window.addEventListener("mouseout", function(e) {
	  pageFocused = false;
	},false);
      
      realtime.queuePush = function (update) {
	oldPush(update);
	unreadCount++;
	
	if (!pageFocused) {
	  updateUnread(unreadCount);
	}
      }
    }        
})();


// ==UserScript==
// @name        Facebook New Posts
// @namespace   http://fluidapp.com
// @description What does this do?
// @include     http://*.facebook.com
// @author      Someone
// ==/UserScript==

(function () {
    if (window.fluid) {
		updateBadge();
	    window.setInterval(updateBadge, 5000);

    }
})();

function updateBadge() {
	
	streamDiv = document.getElementById('home_stream')
	if (streamDiv) {
		streamDiv2 = streamDiv.childNodes[2]
		badgeSet = false
		
		if (streamDiv2) {
			possibleNewMessages = streamDiv2.childNodes[0]
			
			if (possibleNewMessages && possibleNewMessages.className.search(/UIIntentionalStream_ShowNewStories/) != -1 && possibleNewMessages.style.display != 'none') {
				countText = possibleNewMessages.childNodes[0].innerHTML
				count = countText.split(' ')[1]
				if (count) {
					window.fluid.dockBadge = count
					badgeSet = true
				}
			}

		}
		if (!badgeSet) {
			window.fluid.dockBadge = ''
		}
	}
	
}
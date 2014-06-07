// ==UserScript==
// @name        MiniTumblr
// @namespace   http://osxautomation.tumblr.com
// @description Use with Tumblr's iPhone view. Adds auto/manual refresh.
// @include     *
// @author      Chad Ross
// ==/UserScript==

(function () {
    if (window.fluid) {
		
		window.fluid.addDockMenuItem("Refresh", onclickHandlerRefresh)
				
		if (window.fluid.title = "Tumblr"){
		
			var refreshDelaySeconds = 180; //Change this number to alter duration
		
			setInterval(function () {
				window.location.reload()
			}, 1000 * refreshDelaySeconds)
		
		}
		
		function onclickHandlerRefresh(){
			
			if (window.fluid.title = "Tumblr"){
				window.location.reload()
			}
			
		}		
					
    }
})();
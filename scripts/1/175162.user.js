// ==UserScript==
// @name          YouTube - Add 'Stop Download' Button
// @description   Adds button to stop the video download in YouTube. I made this because the one I was using stopped working.
// @version       1.3
// @author        Bruno Barbieri
// @include       http://*.youtube.com/*watch*
// @include       http://youtube.com/*watch*
// @include       https://*.youtube.com/*watch*
// @include       https://youtube.com/*watch*
// @namespace     http://userscripts.org/scripts/show/175162
// @updateURL     http://userscripts.org/scripts/source/175162.meta.js
// @downloadURL   http://userscripts.org/scripts/source/175162.user.js
// ==/UserScript==

/*
 * ===== Changelog =====
 *
 * v1.0: Initial version
 * v1.1: Removed unneeded conditional checks and made tooltip text less obnoxious
 * v1.2: Added update URL
 * v1.3: Check if button/div already exists before adding it
 *
 */

// A function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	// Stolen from YousableTubeFix
	jQ("<style type='text/css'> \
		#stop-download-div {border-color: #E6E6E6 !important; border-style: solid !important; border-width: 0px 1px !important; padding: 15px 20px 9px !important;} \
		#stop-download-btn {margin-right: 5px !important;} \
		</style>").appendTo("head");
	
	if (jQ('#stop-download-div').length == 0) {
		jQ('<div/>', {
			id: 'stop-download-div'
		}).prependTo('#watch7-content');

		jQ('<button/>', {
			id: 'stop-download-btn',
			title: 'Stop video download',
			type: 'button',
			role: 'button',
			class: 'yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-tooltip-reverse', // Also stolen from YousableTubeFix
			
			click: function() {
				jQ('#movie_player').each(function(){
					this.pauseVideo();
					this.stopVideo();
				});
				
				jQ('#movie_player-flash').each(function(){
					this.pauseVideo();
					this.stopVideo();
				});
			}
		}).appendTo('#stop-download-div');
		
		jQ('<span/>', {
			class: 'yt-uix-button-content',
			text: 'Stop Download'
		}).appendTo('#stop-download-btn');
	}
}

// Load jQuery and execute the main function
addJQuery(main);
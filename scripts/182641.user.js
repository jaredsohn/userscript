// ==UserScript==
// @name          YouTube - Add 'Stop Download' Button (YouTube Center add-on)
// @description   Adds button to stop the video download in YouTube next to the other YouTube Center buttons.
// @version       1.0
// @author        Bruno Barbieri
// @include       http://*.youtube.com/*watch*
// @include       http://youtube.com/*watch*
// @include       https://*.youtube.com/*watch*
// @include       https://youtube.com/*watch*
// @namespace     http://userscripts.org/scripts/show/182641
// @updateURL     http://userscripts.org/scripts/source/182641.meta.js
// @downloadURL   http://userscripts.org/scripts/source/182641.user.js
// ==/UserScript==

/*
 * ===== Changelog =====
 *
 * v1.0: Initial version
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
	// Source: https://gist.github.com/buu700/4200601
	jQ.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
		var found = 'found';
		var jQthis = jQ(this.selector);
		var jQelements = jQthis.not(function () {
			return jQ(this).data(found);
		}).each(handler).data(found, true);

		if (!isChild) {
			(window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
				window.setInterval(function () {
					jQthis.waitUntilExists(handler, shouldRunHandlerOnce, true);
				}, 500);
		} else if (shouldRunHandlerOnce && jQelements.length) {
			window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
		}

		return jQthis;
	}
		
	jQ('#watch7-ytcenter-buttons').waitUntilExists(function() {
		if (jQ('#stop-download-btn').length == 0) {
			jQ('<button/>', {
				id: 'stop-download-btn',
				title: 'Stop video download',
				type: 'button',
				role: 'button',
				class: 'yt-uix-button yt-uix-tooltip yt-uix-button-text yt-uix-tooltip-reverse',
				
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
			}).appendTo('#watch7-ytcenter-buttons');
			
			jQ('<span/>', {
				class: 'yt-uix-button-content',
				text: 'Stop Download'
			}).appendTo('#stop-download-btn');
		}
	});
}

// Load jQuery and execute the main function
addJQuery(main);
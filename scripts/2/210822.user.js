// ==UserScript==
// @name          YouTube - Combined Script
// @version       1.0.0.1
// @author        Bruno Barbieri
// @description   Combines "Add 'Stop Download' Button (YouTube Center add-on)", "Restore Keywords" and "Hide related videos & expand comments" into a single script
// @include       http://*.youtube.com/*watch*
// @include       http://youtube.com/*watch*
// @include       https://*.youtube.com/*watch*
// @include       https://youtube.com/*watch*
// @namespace     https://github.com/BrunoReX/userscripts
// @updateURL     https://raw.github.com/BrunoReX/userscripts/master/YouTube/combined_script.user.js
// @downloadURL   https://raw.github.com/BrunoReX/userscripts/master/YouTube/combined_script.user.js
// ==/UserScript==

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
	
	/* Add 'Stop Download' Button (YouTube Center add-on) - Start */
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
	/* Add 'Stop Download' Button (YouTube Center add-on) - End */
	
	/* Restore Keywords - Start */
	jQ('ul.watch-extras-section').waitUntilExists(function() {
		if (jQ('#xyt-keyword-li').length == 0) {
			jQ('<li/>', {
				id: 'xyt-keyword-li'
			}).appendTo('ul.watch-extras-section');
			
			jQ('<h4/>', {
				id: 'xyt-keyword-h4',
				class: 'title',
				text: 'Keywords'
			}).appendTo('#xyt-keyword-li');
			
			jQ('<div/>', {
				id: 'xyt-keyword-div',
				class: 'content'
			}).appendTo('#xyt-keyword-li');
			
			var page = jQ("html").html();
			var idx1 = page.indexOf("ytplayer.config");
			var idx2 = page.indexOf("{", idx1);
			var idx3 = page.indexOf("};", idx2)+1;
			var json = page.substring(idx2, idx3);
			var jsonObj = jQ.parseJSON(json);
			var keywords = jsonObj.args.keywords;
			
			// Fall back to previous method
			if (typeof(keywords) == "undefined" || keywords == null) {
				var keywords = jQ('meta[name=keywords]').attr('content');
			} else {
				keywords = keywords.replace(/,/g, ", ");
			}
			jQ('<p/>', {
				id: 'xyt-keyword-p',
				text: keywords
			}).appendTo('#xyt-keyword-div');
		}
	});
	/* Restore Keywords - End */

	/* Hide related videos & expand comments - Start */

	jQ('.watch-sidebar').remove();
	jQ('.watch-content').width('100%');
	jQ('#action-panel-details').width('96%');
	jQ('#watch-description-clip').width('100%');

	/* Hide related videos & expand comments - End */
}

window.addEventListener('load', function() {
	addJQuery(main);
}, false);

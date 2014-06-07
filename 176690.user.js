// ==UserScript==
// @name          YouTube - Restore Keywords
// @description   Restore keyword list in YouTube videos
// @version       1.2
// @author        Bruno Barbieri
// @include       http://*.youtube.com/*watch*
// @include       http://youtube.com/*watch*
// @include       https://*.youtube.com/*watch*
// @include       https://youtube.com/*watch*
// @namespace     http://userscripts.org/scripts/show/176690
// @updateURL     http://userscripts.org/scripts/source/176690.meta.js
// @downloadURL   http://userscripts.org/scripts/source/176690.user.js
// ==/UserScript==


/*
 * ===== Changelog =====
 *
 * v1.0: Initial version
 * v1.1: Wait for the extra info section of the video to actually load,
 *       since the keywords wouldn't get added sometimes
 * v1.2: Now the script tries to get the complete keyword list, not
 *       the reduced version
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
}

// Load jQuery and execute the main function
addJQuery(main);
// ==UserScript==
// @name           Facebook Home Page Application News Feed Hider
// @description    Hides application news feeds that match specified regular expression.
// @include        http://www.facebook.com/*
// @copyright      2009, Michael Wong
// @version        1.0.4
// ==/UserScript==

var regEx = /t(ake|ook)\s*th(e|is)\s*quiz|測驗/i; /* edit this regular expression to hide other types of application news feeds */

function hideApplicationNewsFeeds(node) {
	var newsFeeds;

	if (node && node.getElementsByClassName && (newsFeeds = node.getElementsByClassName("UIIntentionalStory"))) { /* some nodes do not have getElementsByClassName method */
		for (var i = 0; i < newsFeeds.length; i++) { /* loop through all news feed stories */
			var newsFeed = newsFeeds[i];

			if (newsFeed.style.display != "none") { /* skip news feeds that are already hidden */
				const APP_A_HREF_SEARCH_STR = "/apps/application.php?id=";
				var   applicationId         = /* check if this is application news feed & get its application id */
					(x = newsFeed.getElementsByClassName("UIIntentionalStory_Icon")).length > 0 ?
						(x = x[0].parentNode).tagName.toLowerCase() == "a" ?
							(y = (x = x.href).indexOf(APP_A_HREF_SEARCH_STR) + APP_A_HREF_SEARCH_STR.length) >= APP_A_HREF_SEARCH_STR.length ?
								decodeURIComponent(x.substring(
									y,
									(z = x.indexOf("&", y)) != -1 ?
										z :
										(z = x.indexOf("#", y)) != -1 ?
											z :
											x.length
									)) :
								null :
							null :
						null;

				if (applicationId != null && regEx.test(newsFeed.innerHTML)) {
					document.body.appendChild(document.createElement("script")).innerHTML = /* append a script to call Facebook's UIIntentionalStream.unfollow() function safely */
						 "if (UIIntentionalStream && UIIntentionalStream.instance) {"
							+ "UIIntentionalStream.instance.unfollow({"
								+ "storyID   :\"" + newsFeed.id   + "\","
								+ "id        :"   + applicationId +   ","
								+ "name      :\"\","
								+ "hideString:\"\","
								+ "isApp     :true"
								+ "});"
							+ "}";

					var unfollowMessage = newsFeed.previousSibling; /* hide unfollow message */

					if (unfollowMessage && unfollowMessage.className && unfollowMessage.className == "unfollow_message") {
						unfollowMessage.style.display = "none";
					}
				}
			}
		}
	}
}

hideApplicationNewsFeeds(document);

document.addEventListener( /* add event listener to watch for new news feeds */
	"DOMNodeInserted",
	function(ev) {
		hideApplicationNewsFeeds(ev.target);
	},
	false
	);

window.addEventListener( /* add event listener to run one more time when window loads */
	"load",
	function() {
		hideApplicationNewsFeeds(document);
	},
	false
	);


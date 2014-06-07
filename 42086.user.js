// ==UserScript==
// @name        TwitterSearch
// @namespace   http://fluidapp.com
// @description Refresh+Growl Notifications for Twitter Search SERPs
// @include     *search.twitter.com*
// @author      Todd Ditchendorf
// ==/UserScript==

(function () {
    if (!window.fluid) return;

	var newKey = "__new";

	function getNewCountFromUrl() {
		var queryString = window.location.search;
		var args = queryString.split("&");
		for (var i = 0; i < args.length; i++) {
			var arg = args[i];
			if (arg.startsWith(newKey)) {
				var start = newKey.length + 1; // add 1 for the "="
				return parseInt(arg.substring(start));
			}
		}
	}

	function showGrowlNotificationsForNewTweets() {
		var newCount = getNewCountFromUrl();
		if (isNaN(newCount)) return;
		if (newCount <= 0) return;

		var resultDiv = document.getElementById("results");
		var resultLis = resultDiv.getElementsByTagName("li");

		var len = resultLis.length < newCount ? resultLis.length : newCount;
		for (var i = 0; i < len; i++) {
			showGrowlNotificationForLi(resultLis[i]);
		}
	}
	
	function showGrowlNotificationForLi(li) {
		var msgEls = li.getElementsByClassName("msg");
		if (!msgEls || !msgEls.length) return;

		var msgEl = msgEls[0];
		var titleEls = msgEl.getElementsByTagName("a");
		var title = "";
		if (titleEls && titleEls.length) title = titleEls[0].textContent;
		
		var descEls = msgEl.getElementsByTagName("span");
		var desc = "";
		if (descEls && descEls.length) desc = descEls[0].textContent;
		
		var avatarEls = li.getElementsByClassName("avatar");
		var imgEl = null;
		if (avatarEls && avatarEls.length) {
			var avatarEl = avatarEls[0];
			var imgEls = avatarEl.getElementsByTagName("img");
			if (imgEls && imgEls.length) imgEl = imgEls[0];
		}
		
		fluid.showGrowlNotification({
			title: title,
			description: desc,
			priority: 1,
			sticky: false,
			icon: imgEl
		});
	}

	function refreshSerpIfNeeded() {
		var resUpdateEl = document.getElementById("res-update");
		if (!resUpdateEl) return;
		
		if (resUpdateEl.style.display != "none") {
			var newResCountEl = document.getElementById("new-res-count");
			var count = parseInt(newResCountEl.textContent);
			var url = "" + window.location; // convert to string. yes, I'm paranoid.
			var i = url.indexOf(newKey) - 1; // subtract 1 fo "="
			if (i > -1) {
				url = url.substring(0, i);
			}
			window.location = url + "&" + newKey + "=" + count;
		}
	}
	
	setTimeout(showGrowlNotificationsForNewTweets, 500); // pause slightly before running to allow avatar images to load first. 
														 // that ensures they are displayed in the Growl notifications
	setInterval(refreshSerpIfNeeded, 5000);
})();
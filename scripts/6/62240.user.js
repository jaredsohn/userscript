// ==UserScript==
// @name           Show More Icons Following On Twitter
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    Add link to show more icons following on Twitter at ID page.
// @version        1.0.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function(){
	const LAST_UPDATE = "2010.02.16";
	const username = "";
	const password = "";
	var userid = document.getElementById("me_name") ? document.getElementById("me_name").textContent : location.pathname.split("/")[1];
	if (!userid) return;
	var fl = document.getElementById("following_list");
	if (!fl) return;
	var getTwitterFollowings = function(evt){
		var aElm = document.getElementById("friends_view_next_a");
		var nextElm = document.getElementById("friends_view_next");
		if (!(aElm && nextElm)) return;
		aElm.textContent = "Now Loading\u2026";
		nextElm.style.backgroundImage = "url('http://a1.twimg.com/a/1256597179/images/spinner.gif')";
		nextElm.style.backgroundRepeat = "no-repeat";
		nextElm.style.backgroundPosition = "171px 0";
		aElm.removeEventListener("click", getTwitterFollowings, false);
		var url = aElm.href;
		try {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					aElm.addEventListener("click", getTwitterFollowings, false);
					if (!(xhr.status <= 200 && xhr.status < 300)) {
						aElm.textContent = "Try Again\u2026";
						nextElm.style.backgroundImage = "none";
						return;
					}
					var res = JSON.parse(xhr.responseText);
					j = res.users;
					var len = fl.getElementsByTagName("span").length;
					var start = (len <= 36) ? len : 1;
					var end = j.length;
					for (var i = start; i < end; i++) {
						if (!j[i].screen_name) continue;
						var imgElm = document.createElement("img");
						imgElm.className = "photo fn";
						imgElm.width = "24";
						imgElm.height = "24";
						var imgurl = j[i].profile_image_url.replace("_normal\.", "_mini\.");
						imgElm.src = imgurl;
						imgElm.alt = j[i].name;
						var aElm2 = document.createElement("a");
						aElm2.className = "url";
						aElm2.title = j[i].name;
						if (aElm2.rel) aElm2.rel = "contact";
						if (aElm2.hreflang) aElm2.hreflang = "en";
						aElm2.href = "/" + j[i].screen_name;
						aElm2.appendChild(imgElm);
						var spanElm = document.createElement("span");
						spanElm.className = "vcard";
						spanElm.appendChild(aElm2);
						fl.appendChild(spanElm);
					}
					if (res.next_cursor == 0) {
						nextElm.parentNode.removeChild(nextElm);
					}
					else {
						aElm.href = "http://twitter.com/statuses/friends.json?screen_name=" + userid + "&cursor=" + res.next_cursor;
						aElm.textContent = "View Next\u2026";
						nextElm.style.backgroundImage = "none";
					}
				}
			};
			xhr.open("GET", url, true, username, password);
			xhr.send(null);
		} catch (err) {
			// error
		}
		return;
	};
	var makeGetFollowingsButton = function(){
		var alllink = document.getElementById("friends_view_all");
		if (!alllink) return;
		var aElm = document.createElement("a");
		aElm.style.cursor = "pointer";
		aElm.style.fontSize = "0.9em";
		aElm.style.padding = "0 14px";
		aElm.textContent = "View Next\u2026";
		aElm.id = "friends_view_next_a";
		aElm.href = "http://twitter.com/statuses/friends.json?screen_name=" + userid + "&cursor=-1";
		aElm.addEventListener("click", function(e){e.preventDefault();}, false);
		aElm.addEventListener("click", getTwitterFollowings, false);
		var nextElm = document.createElement("div");
		nextElm.id = "friends_view_next";
		nextElm.appendChild(aElm);
		alllink.parentNode.insertBefore(nextElm, alllink);
	};
	makeGetFollowingsButton();
})();
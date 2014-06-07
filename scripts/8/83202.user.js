// ==UserScript==
// @name           Facepunch Ticker Auto-Opener
// @namespace      xyzzy
// @description    Automatically opens posts that mention your username
// @include        http://www.facepunch.com/fp_ticker.php
// ==/UserScript==



window.addEventListener("load", function() {

	auto_opener_enabled     = false;
	auto_opener_mentioned   = GM_getValue("mentioned", true);
	auto_opener_yourthread  = GM_getValue("yourthread", false);
	auto_opener_lastread    = GM_getValue("lastread", false);
	auto_opener_windows     = new Array();
	auto_opener_max_windows = GM_getValue("max_windows", 10);

	function remove_closed_windows() {
		var i = 0;
		while (i < auto_opener_windows.length) {
			var window = auto_opener_windows[i];
			if (window.closed) {
				auto_opener_windows.splice(i, 1);
			} else {
				i++;
			}
		}
	}	
	function open_post(post) {

		if (!auto_opener_enabled) { return; }

		if ( (post.mentioned  && auto_opener_mentioned)  ||
		     (post.yourthread && auto_opener_yourthread) ||
                     (post.lastread   && auto_opener_lastread)   )
		{
			remove_closed_windows();
			if (auto_opener_windows.length >= auto_opener_max_windows) { return; }

			var window = GM_openInTab("http://www.facepunch.com/showthread.php?p="+post.postid+"#post"+post.postid+"&ref=ticker");
			auto_opener_windows.push(window);
		}
	}

	/* Hook AddPost */

	var old_addpost = unsafeWindow.AddPost;

	var new_addpost = function(post, iPostCount) {

		old_addpost(post, iPostCount);

		setTimeout(function() { open_post(post); }, 0);

	}

	unsafeWindow.AddPost = new_addpost;

	/* Add toggle button */

	var toggle = document.getElementById("lastelement").appendChild(document.createElement("span"));

	toggle.style.fontSize = "12pt";
	toggle.style.padding  = "4px";

	toggle.style.color    = "#2020A0";

	toggle.innerHTML = "[auto-opener: disabled]";

	toggle.addEventListener("click", function () {
		auto_opener_enabled = !auto_opener_enabled;

		if (auto_opener_enabled) {

			this.style.color = "#20A020";

			this.innerHTML   = "[auto-opener: enabled]";

		} else {

			this.style.color = "#2020A0";

			this.innerHTML   = "[auto-opener: disabled]";

		}

	}, false);
	/* Add mentioned button */

	var mentions = document.getElementById("lastelement").appendChild(document.createElement("span"));

	mentions.style.fontSize = "8pt";
	mentions.style.padding  = "4px";

	if (auto_opener_mentioned) {

		mentions.style.color = "#20A020";

		mentions.innerHTML   = "[auto-open mentions: enabled]";

	} else {

		mentions.style.color = "#2020A0";

		mentions.innerHTML   = "[auto-open mentions: disabled]";

	}

	mentions.addEventListener("click", function () {
		auto_opener_mentioned = !auto_opener_mentioned;

		if (auto_opener_mentioned) {

			this.style.color = "#20A020";

			this.innerHTML   = "[auto-open mentions: enabled]";

		} else {

			this.style.color = "#2020A0";

			this.innerHTML   = "[auto-open mentions: disabled]";

		}
		GM_setValue("mentioned", auto_opener_mentioned);

	}, false);
	/* Add yourthread button */
	var yourthread = document.getElementById("lastelement").appendChild(document.createElement("span"));

	yourthread.style.fontSize = "8pt";
	yourthread.style.padding  = "4px";

	if (auto_opener_yourthread) {

		yourthread.style.color = "#20A020";

		yourthread.innerHTML   = "[updates to your threads: enabled]";

	} else {

		yourthread.style.color = "#2020A0";

		yourthread.innerHTML   = "[updates to your threads: disabled]";

	}

	yourthread.addEventListener("click", function () {
		auto_opener_yourthread = !auto_opener_yourthread;

		if (auto_opener_yourthread) {

			this.style.color = "#20A020";

			this.innerHTML   = "[updates to your threads: enabled]";

		} else {

			this.style.color = "#2020A0";

			this.innerHTML   = "[updates to your threads: disabled]";

		}
		GM_setValue("yourthread", auto_opener_yourthread);

	}, false);
	/* Add lastread button */
	var lastread = document.getElementById("lastelement").appendChild(document.createElement("span"));

	lastread.style.fontSize = "8pt";
	lastread.style.padding  = "4px";

	if (auto_opener_lastread) {

		lastread.style.color = "#20A020";

		lastread.innerHTML   = "[updates to viewed threads: enabled]";

	} else {

		lastread.style.color = "#2020A0";

		lastread.innerHTML   = "[updates to viewed threads: disabled]";

	}

	lastread.addEventListener("click", function () {
		auto_opener_lastread = !auto_opener_lastread;

		if (auto_opener_lastread) {

			this.style.color = "#20A020";

			this.innerHTML   = "[updates to viewed threads: enabled]";

		} else {

			this.style.color = "#2020A0";

			this.innerHTML   = "[updates to viewed threads: disabled]";

		}
		GM_setValue("lastread", auto_opener_lastread);

	}, false);
	/* Add max windows control */
	var maxwin = document.getElementById("lastelement").appendChild(document.createElement("span"));

	maxwin.style.fontSize = "8pt";
	maxwin.style.padding  = "4px";

	maxwin.style.color    = "#2020A0";

	maxwin.innerHTML = "[max tabs: "+auto_opener_max_windows.toString()+"]";
	maxwin.addEventListener("click", function() {
		do {
			var choice              = prompt("Enter the maximum number of tabs Auto-Opener can use", auto_opener_max_windows.toString());
			auto_opener_max_windows = parseInt(choice);
		} while (isNaN(auto_opener_max_windows));

		this.innerHTML = "[max tabs: "+auto_opener_max_windows.toString()+"]";
		GM_setValue("max_windows", auto_opener_max_windows);
	}, false);

}, false);
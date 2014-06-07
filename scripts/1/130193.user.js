// ==UserScript==
// @name           FishTime
// @namespace      FishBike
// @description    Displays countdown timers on top of working factories in EoS
// @include        http://www.ratjoy.com/eos/*
// @include        http://ratjoy.com/eos/*
// ==/UserScript==

// Major contributions by Mr. Pokeylope --Thanks!!!

// Opera doesn't define unsafeWindow
if (!window.unsafeWindow) {
	window.unsafeWindow = window;
}

(function () {
	/*************************/
	/* Configuration options */
	/*************************/
	var disable_icons = false;
	var show_status_text = true;
	var set_title = true;
	/*************************/

	var cd_on = unsafeWindow.cd_on;
	var cd_remaining = unsafeWindow.cd_remaining;
	var cd_total = unsafeWindow.cd_total;
	var statuses = unsafeWindow.fact_status || unsafeWindow.store_status || unsafeWindow.rnd_status;
	var ftype;

	if (set_title) {
		if (unsafeWindow.fact_status)
			ftype = "Factories";
		else if (unsafeWindow.rnd_status)
			ftype = "Research";
	}

	function update_timer(i, text) {
		document.getElementById("timer_"+i).innerHTML = text;
	}

	function update_status(i, text) {
		document.getElementById("status_"+i).innerHTML = text;
	}

	function UpdateTimers() {
		setTimeout(UpdateTimers, 1000);

		var idlers = 0;
		var runners = 0;
		var lowtime = (99*3600)+(59*60)+59;

		for (var i = 1; i < cd_on.length; i++) {
			if (cd_on[i]) {
				var length;
				var remaining = cd_remaining[i];
				if (remaining < 600) {
					length = "short";
				} else if (remaining < 3600) {
					length = "med";
				} else {
					length = "long";
				}
				update_timer(i, "<span class='timer_"+length+"'>"+unsafeWindow.sec2hms(remaining)+"</span>");

				if (show_status_text) {
					var percentage = unsafeWindow.percentComp(cd_remaining[i], cd_total[i]);
					update_status(i, statuses[i].replace(/^(Producing|Researching) /, "").replace(/( \(Q\d+\))?$/, " ("+percentage+"%)"));
				}

				if (remaining < lowtime) {
					lowtime = remaining;
				}

				runners++;
			} else {
				update_timer(i, "");
				if (show_status_text)
					update_status(i, "");

				if (statuses[i] == "Ready")
					idlers++;
			}
		}

		if (ftype) {
			if (idlers > 0) {
				if (runners > 0) {
					document.title = idlers+" idle ["+unsafeWindow.sec2hms(lowtime)+"] - "+ftype;
				} else {
					document.title = "All Stopped - "+ftype;
				}
			} else {
				document.title = "["+unsafeWindow.sec2hms(lowtime)+"] - "+ftype;
			}
		}
	}

	var css_rules = "                         \
		.timer_long {                         \
			color: black;                     \
			text-shadow: -2px  0px 5px white, \
			              2px  0px 5px white, \
			              0px  2px 5px white, \
			              0px -2px 5px white; \
		}                                     \
		                                      \
		.timer_med {                          \
			color: yellow;                    \
			text-shadow: -2px  0px 5px black, \
			              2px  0px 5px black, \
			              0px  2px 5px black, \
			              0px -2px 5px black; \
		}                                     \
		                                      \
		.timer_short {                        \
			color: red;                       \
			text-shadow: -2px  0px 5px black, \
			              2px  0px 5px black, \
			              0px  2px 5px black, \
			              0px -2px 5px black; \
		}                                     \
		                                      \
		div.spacer {                          \
			height: 9px;                      \
		}                                     \
		                                      \
		div.timer,div.status {                \
			font-family:sans-serif;           \
			font-weight:bold;                 \
			position: relative;               \
			left: 50%;                        \
			width: 200px;                     \
			margin-left: -100px;              \
			text-align: center;               \
			z-index: 800;                     \
		}                                     \
		                                      \
		div.timer {                           \
			font-size:16px;                   \
			top: 3px;                         \
		}                                     \
		                                      \
		div.status {                          \
			font-size:14px;                   \
			text-shadow: -2px  0px 5px white, \
			              2px  0px 5px white, \
			              0px  2px 5px white, \
			              0px -2px 5px white; \
			top: -2px;                        \
		}                                     \
		                                      \
		div.status img {                      \
			vertical-align: middle;           \
		}                                     \
	";

	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = css_rules;
	(document.head || document.getElementsByTagName( "head" )[0] || document.documentElement).appendChild(css);

	if (cd_on) {
		for (var i = 1; i < cd_on.length; i++) {
			var icon = document.getElementById("building_icon_"+i);

			if (disable_icons) {
				icon.firstChild.innerHTML="<div id='cd_icon_"+i+"' style='display: none'/><div id='cd_icon_back_"+i+"' style='display: none'/>";
			}

			if (!show_status_text)
				icon.firstChild.innerHTML += "<div class='spacer'/>";
			icon.firstChild.innerHTML += "<div id='timer_"+i+"' class='timer'/>";
			icon.firstChild.innerHTML += "<div id='status_"+i+"' class='status'/>";

			if (disable_icons) {
			}
		}

		UpdateTimers();
	}

	if (/\/warehouse/.test(window.location.pathname)) {
		for (var i = 0; ; i++) {
			var row = document.getElementById("wh_display_"+i);
			if (!row)
				break;

			var pid = /\?pid=(\d+)/.exec(row.firstChild.firstChild.href)[1];
			var name = row.children[1].innerHTML;
			row.children[1].innerHTML = "<a href='/eos/market-prod.php?pid="+pid+"'>"+name+"</a>";
		}
	}
})();

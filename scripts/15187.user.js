// ==UserScript==
// @name           Blogger: Enhanced Post Editor
// @namespace      http://gecko.535design.com/grease/
// @description    Adds editor options to always show post options, always show labels, keep date current for drafts, and togglable labels.  Also imports del.icio.us tags for use as labels.
// @include        http://www.blogger.com/*
// @include        http://blogger.com/*
// ==/UserScript==

// HACK: using form fields screws with Blogger's form sanitizing
// code, so this script uses "simulated" checkboxes instead

var dataScript = "data:text/javascript,function%20EPE_autoDate()%20{%0A%09var%20now%20=%20new%20Date();%0A%09var%20date%20=%20document.getElementById(%22date-input%22);%0A%09var%20time%20=%20document.getElementById(%22time-input%22);%0A%0A%09if%20(date)%20date.value%20=%20now.toLocaleFormat(%22%m/%d/%y%22);%0A%09if%20(time)%20time.value%20=%20now.toLocaleFormat(%22%I:%M%20%p%22).replace(/%20([ap])%5C.m%5C.$/,%20%22$1m%22);%0A}";
var dataStyle = "data:text/css,.EPE_checkbox%20{%0A%09background:%20url(data:image/gif;base64,R0lGODdhDQANAKEAAAAAAHuevf///wAAACwAAAAADQANAAACGYyPKMst5iKMbdJlb6Zbhst0jlh94JOkRgEAOw==)%20no-repeat%205px%202px;%0A%09cursor:%20default;%0A%09padding-left:%2025px;%0A}%0A%0A.EPE_checked%20{%0A%09background-image:%20url(data:image/gif;base64,R0lGODdhDQANAKEAAAAAAHuevf///wAAACwAAAAADQANAAACI4yPKMst5iKMAqzpgH1h7apdHQh+k4Y2WKqOnuRSnMwk9lEAADs=);%0A}%0A%0Aa.clickable-label%20{%0A%09border:%201px%20solid%20#E1D4C0;%0A%09cursor:%20pointer;%0A%09line-height:%201.7em;%0A%09margin-right:%200;%0A%09padding:%200%202px;%0A%09text-decoration:%20none;%0A}%0A%0Aa.clickable-label.EPE_active%20{%0A%09background:%20#C9C4C7;%0A%09border-color:%20#3366CC;%0A}%0A%0Aa.clickable-label:hover%20{%0A%09background:%20#EBC4A5;%0A%09border-color:%20#FF6500;%0A}";

var rxTagsJSON = /^\s*{(?:"[^"]+":\d+(?:,"[^"]+":\d+)*)?}\s*$/;

var autoDate          = GM_getValue("autoDate", true);
var delAtLeast        = GM_getValue("delAtLeast", 5);
var delCount          = GM_getValue("delCount", 20);
var delUser           = GM_getValue("delUser", "");
var redirectTab       = GM_getValue("redirectTab", true);
var showEditorOptions = GM_getValue("showEditorOptions", true);
var showLabels        = GM_getValue("showLabels", true);
var showOptions       = GM_getValue("showOptions", true);

var hashActive = {};
var hashLabels = {"del.icio.us":{}, "Blogger":{}};
var intervalAutoDate = false;
var timerActivateLabels = false;
var widthLabelBox = 300;

function activateLabels(event) {
	if (event && event.preventDefault) event.preventDefault();
	if (event && event.stopPropagation) event.stopPropagation();

	var listLabels = miniTrim(document.getElementById("post-labels").value);
	var newHashActive = {};

	if (listLabels == "") {
		listLabels = [];
	} else {
		listLabels = listLabels.split(",");
	}

	for (var i = 0; i < listLabels.length; i++) {
		var label = miniTrim(listLabels[i]);

		if (!label) continue;

		if (!hashActive[label]) {
			for (cat in hashLabels) {
				if (hashLabels[cat][label]) {
					hashLabels[cat][label].className = "clickable-label EPE_active";
				}
			}

			hashActive[label] = true;
		}

		newHashActive[label] = true;
	}

	for (label in hashActive) {
		if (!newHashActive[label]) {
			for (cat in hashLabels) {
				if (hashLabels[cat][label]) {
					hashLabels[cat][label].className = "clickable-label";
				}
			}
		}
	}

	hashActive = newHashActive;
}

function addTags(details) {
	if (details.status != 200) return;

	if (!rxTagsJSON.test(details.responseText)) return;

	eval('var json = ' + details.responseText);

	var tags = document.getElementById("EPE_tags");

	tags.innerHTML = 'del.icio.us Tags:';

	tags = tags.appendChild(document.createElement("span"));
	tags.className = "label-list";

	hashLabels["del.icio.us"] = {};

	eval('var json = ' + details.responseText + ';');

	for (var tag in json) {
		tags.appendChild(document.createTextNode(" "));
		tags.appendChild(createLabel("del.icio.us", tag));
	}

	// force update of highlighting
	hashActive = {};

	activateLabels();
}

function createLabel(cat, label) {
	if (hashLabels[cat][label]) return hashLabels[cat][label];

	hashLabels[cat][label] = document.createElement("a");
	hashLabels[cat][label].className = "clickable-label";
	hashLabels[cat][label].innerHTML = label;
	hashLabels[cat][label].addEventListener("click", selectLabel, false);

	return hashLabels[cat][label];
}

function delayActivateLabels(event) {
	if (timerActivateLabels) window.clearTimeout(timerActivateLabels);

	timerActivateLabels = window.setTimeout(activateLabels, 250);
}

function doRedirectTab() {
	var tab = document.evaluate('//li[@id="nav-posting"]/span/a', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	if (!tab) return;

	var id = tab.href.match(/blogID=(\d+)/)[1];

	if (redirectTab) {
		tab.href = "/posts.g?blogID=" + id;
	} else {
		tab.href = "/post-create.g?blogID=" + id;
	}
}

function doShowLabels() {
	var show = document.getElementById("show-labels-link");
	var hide = document.getElementById("hide-labels-link");

	if (showLabels) {
		if (show.style.display != "none" || hide.style.display != "none") {
			var all = document.getElementById("all-labels");

			// HACK: show.clientWidth always seems to be 0 here; not
			// terribly important anyway, as the table cells resize
			// based on their contents...
			widthLabelBox += 50;

			show.style.display = "none";
			hide.style.display = "none";
			all.style.display = "";
		}
	} else {
		if (show.style.display == "none" && hide.style.display == "none") {
			var all = document.getElementById("all-labels");

			widthLabelBox -= 50;

			if (all.style.display == "none") {
				show.style.display = "";
			} else {
				hide.style.display = "";
			}
		}
	}

	document.getElementById("post-labels").style.width = widthLabelBox + "px";
}

function doShowOptions() {
	var toggler = document.getElementById("togglePostOptions");

	if (showOptions) {
		if (toggler.style.display != "none") {
			var options = document.getElementById("postoptions");

			widthLabelBox += toggler.clientWidth;

			toggler.style.display = "none";
			toggler.className = "expanded";
			options.style.display = "";
		}
	} else {
		if (toggler.style.display == "none") {
			// HACK: default is 300 and we're using 50 for the label toggler
			widthLabelBox = showLabels ? 350 : 300;

			toggler.style.display = "";
			toggler.className = "expanded";
		}
	}

	document.getElementById("post-labels").style.width = widthLabelBox + "px";
}

function getTags() {
	var tags = document.getElementById("EPE_tags");

	if (!tags) {
		var labels = document.getElementById("all-labels").parentNode;

		if (labels) {
			tags = document.createElement("div");
			tags.id = "EPE_tags";
			tags.style.fontSize = "95%";

			labels.appendChild(tags);
		} else {
			return;
		}
	}

	if (!delUser) {
		tags.innerHTML = "";

		hashLabels["del.icio.us"] = {};

		activateLabels();

		return;
	}

	var url = "http://del.icio.us/feeds/json/tags/" + encodeURIComponent(delUser) + "?raw";
	if (delCount > 0) url += "&count=" + delCount;
	if (delAtLeast > 1) url += "&atleast=" + delAtLeast;

	GM_xmlhttpRequest({method:"GET", url:url, onload:addTags});
}

function miniTrim(str) {
	// "This is generally the fastest with very short strings which contain
	// both non-space characters and edge whitespace."
	// http://blog.stevenlevithan.com/archives/faster-trim-javascript

	return str.replace(/^\s*([\S\s]*?)\s*$/, '$1');
}

function selectLabel(event) {
	if (event) {
		event.preventDefault();
		event.stopPropagation();
	}

	var newLabel = miniTrim(event.originalTarget.innerHTML);
	var labelBox = document.getElementById("post-labels");
	var oldLabels = miniTrim(labelBox.value);

	if (oldLabels == "") {
		labelBox.value = newLabel;
	} else {
		var newLabels = [];
		var found = false;

		oldLabels = oldLabels.split(",");

		for (var i = 0; i < oldLabels.length; i++) {
			oldLabels[i] = miniTrim(oldLabels[i]);

			if (oldLabels[i] == newLabel) {
				found = true;
			} else {
				newLabels[newLabels.length] = oldLabels[i];
			}
		}

		if (!found) newLabels[oldLabels.length] = newLabel;

		labelBox.value = newLabels.join(", ");
	}

	activateLabels();
}

function toggleAutoDate() {
	if (intervalAutoDate) {
		window.clearInterval(intervalAutoDate);
		intervalAutoDate = false;

		document.getElementById("EPE_autoDate").className = "EPE_checkbox";
	} else {
		// EPE_autoDate() is included in dataScript above, but hasn't been read yet, so call with setTimeout(, 0)
		window.setTimeout("EPE_autoDate()", 0);
		intervalAutoDate = window.setInterval("EPE_autoDate()", 15000);

		document.getElementById("EPE_autoDate").className = "EPE_checkbox EPE_checked";
	}
}

function toggleEditorOption(event) {
	var target = event.originalTarget;

	switch (target.id) {
		case "EPE_toggler":
			showEditorOptions = !showEditorOptions;
			GM_setValue("showEditorOptions", showEditorOptions);

			document.getElementById("EPE_options").style.display = showEditorOptions ? "" : "none";
			document.getElementById("EPE_delOptions").style.display = showEditorOptions ? "" : "none";
			document.getElementById("EPE_toggler").innerHTML = showEditorOptions ? "[&ndash;]" : "[+]";
		break;

		case "EPE_optShowOptions":
			showOptions = !showOptions;
			GM_setValue("showOptions", showOptions);
			target.className = "EPE_checkbox" + (showOptions ? " EPE_checked" : "");

			doShowOptions();
		break;

		case "EPE_optShowLabels":
			showLabels = !showLabels;
			GM_setValue("showLabels", showLabels);
			target.className = "EPE_checkbox" + (showLabels ? " EPE_checked" : "");

			doShowLabels();
		break;

		case "EPE_optAutoDate":
			autoDate = !autoDate;
			GM_setValue("autoDate", autoDate);
			target.className = "EPE_checkbox" + (autoDate ? " EPE_checked" : "");

			if (autoDate && !intervalAutoDate) toggleAutoDate();
		break;

		case "EPE_optRedirectTab":
			redirectTab = !redirectTab;
			GM_setValue("redirectTab", redirectTab);
			target.className = "EPE_checkbox" + (redirectTab ? " EPE_checked" : "");

			doRedirectTab();
		break;

		case "EPE_delUser":
			var oldUser = delUser;

			delUser = window.prompt("Enter your del.icio.us username.  (Leave blank do disable.)", delUser);

			if (delUser == null || isNaN(delUser)) {
				delUser = oldUser;
			} else if (oldUser != delUser) {
				target.innerHTML = delUser ? delUser : "[not set]";

				GM_setValue("delUser", delUser);

				getTags();
			}
		break;

		case "EPE_delCount":
			var oldCount = delCount;

			delCount = parseInt(window.prompt("Enter maximum tags to display.  (0 = all)", delCount));

			if (delCount == null || isNaN(delCount)) {
				delCount = oldCount;
			} else {
				if (delCount < 1) delCount = 0;

				if (oldCount != delCount) {
					target.innerHTML = delCount ? delCount : "[all]";

					GM_setValue("delCount", delCount);

					getTags();
				}
			}
		break;

		case "EPE_delAtLeast":
			var oldAtLeast = delAtLeast;

			delAtLeast = parseInt(window.prompt("Only display tags with at least this many posts.  (0 = all)", delAtLeast));

			if (delAtLeast == null || isNaN(delAtLeast)) {
				delAtLeast = oldAtLeast;
			} else {
				if (delAtLeast < 2) delAtLeast = 0;

				if (oldAtLeast != delAtLeast) {
					target.innerHTML = delAtLeast ? delAtLeast : "[all]";

					GM_setValue("delAtLeast", delAtLeast);

					getTags();
				}
			}
		break;
	}

	event.preventDefault();
	event.stopPropagation();
}

window.addEventListener("load", function() {
	doRedirectTab();

	// the rest of this script only applies to the post editor
	if (document.getElementsByTagName("body")[0].id != "posting") return;

	// start async early
	getTags();

	var head = document.getElementsByTagName("head")[0];

	head.appendChild(document.createElement("link"));
	head.lastChild.setAttribute("rel", "stylesheet");
	head.lastChild.setAttribute("type", "text/css");
	head.lastChild.setAttribute("href", dataStyle);

	head.appendChild(document.createElement("script"));
	head.lastChild.setAttribute("type", "text/javascript");
	head.lastChild.setAttribute("src", dataScript);

	var curLabels = document.getElementById("post-labels");

	curLabels.addEventListener("keyup", delayActivateLabels, false);

	var labels = document.evaluate('//a[contains(@class,"clickable-label")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < labels.snapshotLength; i++) {
		var label = labels.snapshotItem(i);

		label.parentNode.replaceChild(createLabel("Blogger", miniTrim(label.innerHTML)), label);
	}

	var options = document.getElementById("postoptions");

	if (options) {
		var editopts = document.createElement("div");

		editopts.style.cssFloat = "left";
		editopts.style.marginLeft = "10px";
		editopts.style.marginTop = "10px";
		editopts.style.width = "200px";

		var html = '<b>Editor options</b>';
		html += ' <a id="EPE_toggler" style="cursor:pointer">[' + (showEditorOptions ? '&ndash;]</a><div' : '+]</a><div style="display:none"') + ' id="EPE_options">';
		html += '<div id="EPE_optShowOptions" class="EPE_checkbox' + (showOptions ? " EPE_checked" : "") + '">Always show post options</div>';
		html += '<div id="EPE_optShowLabels" class="EPE_checkbox' + (showLabels ? " EPE_checked" : "") + '">Always show all labels</div>';
		html += '<div id="EPE_optAutoDate" class="EPE_checkbox' + (autoDate ? " EPE_checked" : "") + '">Automatically keep date current for drafts</div>';
		html += '<div id="EPE_optRedirectTab" class="EPE_checkbox' + (redirectTab ? " EPE_checked" : "") + '">Redirect the "Posting" tab to the Edit Posts list</div>';

		editopts.innerHTML = html + '</div>';

		editopts.addEventListener("click", toggleEditorOption, false);

		options.appendChild(editopts);

		var delopts = document.createElement("div");

		delopts.id = "EPE_delOptions";
		delopts.style.cssFloat = "left";
		delopts.style.display = showEditorOptions ? "" : "none";
		delopts.style.marginLeft = "10px";
		delopts.style.marginTop = "10px";
		delopts.style.width = "200px";

		html = '<b>del.icio.us</b>';
		html += '<div><a id="EPE_delUser" style="cursor:pointer;float:right">' + (delUser ? delUser : "[not set]") + '</a>User name:</div>';
		html += '<div><a id="EPE_delCount" style="cursor:pointer;float:right">' + (delCount ? delCount : "[all]") + '</a>Max tags:</div>';
		html += '<div><a id="EPE_delAtLeast" style="cursor:pointer;float:right">' + (delAtLeast ? delAtLeast : "[all]") + '</a>Min posts/tag:</div>';

		delopts.innerHTML = html;

		delopts.addEventListener("click", toggleEditorOption, false);

		options.appendChild(delopts);

		options.appendChild(document.createElement("div"));
		options.lastChild.className = "clear";
	}

	doShowOptions();
	doShowLabels();

	var before = document.getElementById("postDateTimeMsgDiv");

	if (before) {
		var isDraft = null != document.getElementById("autosaveButton");
		var check = document.createElement("div");

		check.id = "EPE_autoDate";
		check.className = "EPE_checkbox";
		check.addEventListener("click", toggleAutoDate, false);
		check.appendChild(document.createTextNode("Keep date current"));
		before.parentNode.insertBefore(check, before);

		if (isDraft && autoDate) {
			check.checked = "true";
			toggleAutoDate();
		}
	}
}, false);

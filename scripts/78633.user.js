// ==UserScript==
// @name           mitbbs
// @namespace      smalltalk80.cn
// @description    mitbbs
// @include        http://www.mitbbs.com/*
// @include        http://mitbbs.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var STORAGE_KEY = "mitbbs.blacklist";
var HIDE_BUTTON_TEXT = "x";

/** Retrieves an array of names from browser storage. */
function loadBlacklist() {
	var s = localStorage.getItem(STORAGE_KEY);
	if (s) {
		var names = s.split(" ");
		return names;
	}
	return new Array();
}

/** Stores an array of names to browser storage. */
function saveBlacklist(names) {
	var s = names.join(" ");
	localStorage.setItem(STORAGE_KEY, s);
}

/** Retrieves the Y/N flag from browser storage. */
function loadBlacklistFlag() {
	var s = localStorage.getItem(STORAGE_KEY + ".flag");
	if (s) {
		return s;
	}
	return "Y";
}

/** Saves the Y/N flag to browser storage. */
function saveBlacklistFlag(flag) {
	localStorage.setItem(STORAGE_KEY + ".flag", flag);
}

/** Show/hide posts from people in the blacklist. */
function showHidePosts(names) {
	var flag = loadBlacklistFlag();
	if (flag == "N") {
		// Blacklist disabled; show everything.
		$("td.taolun_leftright tr").show();
		return;
	}
	// Find the links that point to posters.
	$("td.taolun_leftright tr").find("a.news:first").each(function() {
		var name = $(this).text();
		var match = false;
		for (var i = 0; i < names.length; ++ i) {
			if (name == names[i]) {
				match = true;
				break;
			}
		}
		if (match) {
			// Get lost!
			$(this).parent().parent().hide();
		}
		else {
			$(this).parent().parent().show();
		}
	});
}

/** Prepares at page load. */
function preparePage() {
	// Add a clickable "x" before every poster.
	$(".taolun_leftright tr").find("a.news:first").each(function() {
		$(this).before("<span class=\"hide_button\">" + HIDE_BUTTON_TEXT + "</span>");
	});
	$(".hide_button")
		.css("margin-right", "10px")
		.css("color", "#909090")
		.css("cursor", "pointer")
		.click(function() {
			var name = $(this).nextAll("a").text();
			if (confirm("Block " + name + "?")) {
				// After the user confirms blocking a poster.
				var names = loadBlacklist();
				names.push(name);
				saveBlacklist(names);
				showHidePosts(names);
			}
		});

	// Add a text area that shows all blocked posters.
	$(".taolun_leftright").parents("table:first").before("<div id=\"blacklist\"><textarea></textarea><br /><button id=\"updateBlacklist\">Update</button><button id=\"closeBlacklist\">Close</button></div>");
	// The text area is initially hidden.
	$("#blacklist").hide().find("textarea").attr("rows", "20").attr("cols", "100");
	// The "Update" button saves user edited content and hides the text area when clicked.
	$("#updateBlacklist").click(function() {
		var names =	$("#blacklist textarea").val().split(" ");
		saveBlacklist(names);
		showHidePosts(names);
		$("#blacklist").hide();
	});
	// The "Close" button just hides the text area when clicked.
	$("#closeBlacklist").click(function() {
		$("#blacklist").hide();
	});

	// Replace that ad marquee with my buttons. Sorry mitbbs.
	$("marquee").replaceWith("<button id=\"showBlacklist\">黑名单</button><input type=\"checkbox\" id=\"enableBlacklist\" />");
	// The "Blacklist" button shows the text area when clicked.
	$("#showBlacklist")
		.click(function() {
			var names = loadBlacklist();
			$("#blacklist").show().find("textarea").val(names.join(" "));
		});
	// The checkbox on the right side controls whether to show/hide blocked posters.
	var flag = loadBlacklistFlag();
	$("#enableBlacklist")
		.attr("checked", flag == "Y")
		.click(function() {
			var flag = $(this).attr("checked") ? "Y" : "N";
			saveBlacklistFlag(flag);
			var names = loadBlacklist();
			showHidePosts(names);
		});

	// Initial run.
	var names = loadBlacklist();
	showHidePosts(names);
}

$(document).ready(function() {
	preparePage();
});

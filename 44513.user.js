// ==UserScript==
// @name           Stack Overflow: Time stamp converter
// @namespace      http://gecko.535design.com/grease/
// @description    Changes relative times to absolute (e.g. "Four hours ago" to "today at 11:23").
// @include        http://meta.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// ==/UserScript==

var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
var rxDate = /(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)Z UTC/;
var xpSpans = "//span[@class='comment-date']/span[@title]|//span[@class='relativetime']";

function formatStamp(elm) {
	if (!elm.title) return;

	// 2009-07-20 17:58:06Z UTC
	var match = rxDate.exec(elm.title);

	if (!match) return;

	var stamp = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
	var stamp_y = stamp.getYear();
	var stamp_m = stamp.getMonth();
	var stamp_d = stamp.getDate();
	var stamp_M = stamp.getMinutes();
	var date;

	if (stamp_y == today_y && stamp_m == today_m && stamp_d == today_d) {
		date = "today";
	} else if (stamp_y == yesterday_y && stamp_m == yesterday_m && stamp_d == yesterday_d) {
		date = "yesterday";
	} else {
		date = months[stamp_m] + " " + stamp_d;

		if (stamp_y <= sixmonths_y && stamp_m <= sixmonths_m && stamp_d <= sixmonths_d) {
			date += " " + (stamp_y + ((stamp_y < 1900) ? 1900 : 0));
		}
	}

	elm.innerHTML = date + " at " + stamp.getHours() + ":" + (stamp_M < 10 ? "0" : "") + stamp_M;
}

function onDOMNodeInserted(event) {
	target = event.target;

	// Using literal "1" because Node.ELEMENT_NODE is undefined here (not sure why).
	if (target.nodeType == 1) {
		var spans = xpath(xpSpans, document);

		for (var i = 0; i < spans.snapshotLength; i++) {
			formatStamp(spans.snapshotItem(i));
		}
	}
}

function xpath(expr, context) {
	return document.evaluate(expr, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var date = new Date();
var today_y = date.getYear();
var today_m = date.getMonth();
var today_d = date.getDate();

date.setDate(today_d - 1);
var yesterday_y = date.getYear();
var yesterday_m = date.getMonth();
var yesterday_d = date.getDate();

date.setDate(today_d);
date.setMonth(today_m - 6);
var sixmonths_y = date.getYear();
var sixmonths_m = date.getMonth();
var sixmonths_d = date.getDate();

var spans = xpath(xpSpans, document);

for (var i = 0; i < spans.snapshotLength; i++) {
	formatStamp(spans.snapshotItem(i));
}

document.body.addEventListener("DOMNodeInserted", onDOMNodeInserted, false);

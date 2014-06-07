"use strict";

// ==UserScript==
// @name			IltaSaatana
// @version			1.4
// @namespace		http://aleksi.me
// @description		SAATANA
// @require			http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include			http://www.iltalehti.fi/*
// @include			http://www.iltasanomat.fi/*
// @include			http://www.hs.fi/*
// @include			http://ltky.fi/*
// ==/UserScript==

// Will be upcased if needed
var curses = [", saatana!", ", perkele!", ", vittu!", ", jumalauta!", ", helvetti!"];

// Which characters to ignore
var reStop = /([!\?\"\”\s\.]*)$/
var reLastLetter = /([a-zA-ZåäöÅÄÖ])[^a-zA-ZåäöÅÄÖ]*$/

function addCurse(text) {
	var curse = curses[Math.floor(Math.random() * curses.length)];

	var matches = text.match(reStop);
	if (matches == null) { return; }

	var lastLetter = text.match(reLastLetter);

	if (lastLetter && lastLetter[1] == lastLetter[1].toUpperCase()) {
		curse = curse.toUpperCase();
	}

	if (matches[1] != "") {
		if (matches[1].indexOf('!') > -1 || matches[1].indexOf('?') > -1 || matches[1].indexOf('.') > -1) {
			curse = curse.replace('!', '').replace('?', '');
		}
		return text.replace(reStop, curse) + matches[1];
	} else {
		return text + curse;
	}
}

// IltaLehti

if (window.location.href.indexOf("iltalehti.fi") > -1) {
	$("h1.juttuotsikko").each(function() {
		var last = $(this).find("span:last");

		if (last.length == 0) { last = $(this); }

		last.text(addCurse(last.text()));
	});

	$(".vasen>p>a").each(function() {
		var timeNode;
		var children = $(this).children("span");
		if (children[0]) {
			timeNode = children.detach();
		}
		
		var text = $(this).clone().children().remove().end().text();

		$(this).text(addCurse(text));

		if (timeNode) {
			$(this).append(timeNode);
		}
	});

	$(".list-title").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$(".site-links>p>a").each(function() {
		if ($(this).text() != "") {
			$(this).text(addCurse($(this).text()));
		}
	});

	$(".link-list>p>a").each(function() {
		if ($(this).text() != "") {
			$(this).text(addCurse($(this).text()));
		}
	});
}

// IltaSanomat
if (window.location.href.indexOf("iltasanomat.fi") > -1) {
	$(".lane-list-v>.teaser>:header>a").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$(".lane-list-v>.teaser>.indent>.teaser>:header>a").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$(".lane-list-h>div>.teaser>:header>a").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$(".lane-list-v>.link-list>.numberbullet-list>ul>li>a").each(function() {
		var timeNode;
		var numNode;
		var children = $(this).children("span");
		if (children[0]) {
			timeNode = children.detach();
		}
		children = $(this).children("div");
		if (children[0]) {
			numNode = children.detach();
		}
		
		var text = $(this).clone().children().remove().end().text();

		$(this).text(addCurse(text));

		if (numNode) {
			$(this).prepend(numNode);
		}
		if (timeNode) {
			$(this).append(timeNode);
		}
	});

	$(".lane-list-v>.link-list>ul>li>a").each(function() {
		var timeNode;
		var children = $(this).children("span");
		if (children[0]) {
			timeNode = children.detach();
		}
		
		var text = $(this).clone().children().remove().end().text();

		$(this).text(addCurse(text));

		if (timeNode) {
			$(this).prepend(timeNode);
		}
	});

	$("#main>h1").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$("#breaking-news>ul>li>a").each(function() {
		$(this).text(addCurse($(this).text()));
	});
}

// HS

if (window.location.href.indexOf("hs.fi") > -1) {
	$("a.article-link").each(function() {
		var len = $(this).children().length;

		if (len != 0 && $(this).children("b").length != len) { return; }

		$(this).text(addCurse($(this).text()));
	});

	$(".full-article-top>:header").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$(".article-list>li>:header").each(function() {
		$(this).text(addCurse($(this).text()));
	});
}

// LTKY

if (window.location.href.indexOf("ltky.fi") > -1) {
	$(".art-postheader>a").each(function() {
		$(this).text(addCurse($(this).text()));
	});

	$(".art-postheader").each(function() {
		if ($(this).children().length != 0) { return; }

		$(this).text(addCurse($(this).text()));
	});
}
// ==UserScript==
// @name          Google Calendar : Remove logo & shrink search container height
// @namespace     http://msp-story.blogspot.com/userscript
// @description	  Remove logo & shrink search container height
// @author        Vince Chang
// @homepage      http://msp-story.blogspot.com
// @include       http://calendar.google.com/*
// @include       https://calendar.google.com/*
// @include       http://www.google.com/calendar/*
// @include       https://www.google.com/calendar/*
// @match		http://calendar.google.com/*
// @match       https://calendar.google.com/*
// @match       http://www.google.com/calendar/*
// @match       https://www.google.com/calendar/*
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	script.async = true;
	document.body.appendChild(script);
}

function main() {
	var unsafeWindow = unsafeWindow || window;
	var $jq = unsafeWindow.jQuery.noConflict(true);
	
	var $sidebar = $jq('#sidebar').remove();
	$sidebar.css('padding', 0);
	$jq('#mainlogo').replaceWith($sidebar);
	
	$jq('#vr-proto-header').css({
		height: 34,
		border: 'none',
		background: 'none'
	});
	$jq('.domainlogoparent').remove();
	$jq('#srreg').css({
		left: 44,
		top: 5
	});
	$jq('#ntowner').css('top', 65);
	
	// toggle header
	$jq('#vr-header').toggle();
	$jq('#swHeader').remove();
	var aBtn = $jq('<a href="#" id="swHeader">s/w Header</a>');
	aBtn.click(function(){
		$jq('#vr-header').toggle();
	});
	$jq('#nav').prepend(aBtn);
}

addJQuery(main);
// Copyright (c) 2013, LeroyLeroy
// Released under the GPL license
// ******************************
// ==UserScript==
// @name          FarkNoAdBlockPlea
// @namespace     http://www.fark.com/*
// @description   waits for the AdBlockPlea to arrive, then removes it. Sorry Fark.
// @include       http://www.fark.com/*
// @include       http://fark.com/*
// @include       http://totalfark.com/*
// @include       https://totalfark.com/*
// @include       http://www.totalfark.com/*
// @include       https://www.totalfark.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	}, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {

    var timer; // Variable to start and stop updating timer

    function hideit() {
    if ($("#abPleaBar").is(":visible"))
	{
	    clearInterval(timer);
	    jQ("#abPleaBar").hide();
	} else
	{
	    timer = setTimeout(hideit, 100);
	}
    };
    hideit();
}

// load jQuery and execute the main function
addJQuery(main);

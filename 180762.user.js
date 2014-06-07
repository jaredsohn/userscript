// ==UserScript==
// @name     Remove related youtubes prototype 001
// @include  http://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var observer = null;

function action () {
    var playerapi = document.getElementById("player-api");
    playerapi.innerHTML = playerapi.innerHTML.replace(/title%3D(.(?!%26))*?ryse(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D');
    playerapi.innerHTML = playerapi.innerHTML.replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?ryse)/ig, 'id%3D');
    document.getElementById("body").classList.add("canary");
}

function mutations() {
		if (document.getElementsByClassName("canary").length === 0) {
			action();
		}
	}

unsafeWindow._spf_state.config["navigate-limit"] = 0;
if (document.defaultView.self === document.defaultView.top && document.getElementById("unavailable-message") === null) {
	action();
	observer = new MutationObserver(mutations);
	observer.observe(document.getElementById("body"), { attributes: true, attributeFilter: ["class"], subtree: true });
}
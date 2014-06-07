// ==UserScript==
// @name Twitter suggestion box remover
// @namespace vanger.ru
// @include http://twitter.com/* 
// @include https://twitter.com/*
// ==/UserScript==

	//note console.log not working on twitter's page ;(
    var interval = window.setInterval(function() {
		$(".content-main").filter("[id!=timeline]").hide();
		if (interval) {
			clearInterval(interval);
		}
	}, 1000);
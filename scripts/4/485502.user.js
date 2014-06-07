// ==UserScript==
// @name        Shuffle links in Get Pocket
// @author      swistak35
// @version     0.2
// @include     http://getpocket.com/a/*
// @include     https://getpocket.com/a/*
// ==/UserScript==

var loaded = false;
var prev = 0;

function shuffle_queue() {
	var ul = document.getElementById("queue");
	for (var i = ul.children.length; i >= 0; i--)
		ul.appendChild(ul.children[Math.random() * i | 0]);
}

function load_all() {
	//console.log("dupa");
	curr = document.body.scrollHeight;

	if (prev != curr) {
	  //console.log("dupa1");
		window.scrollTo(0, curr);

		prev = curr;
		setTimeout(load_all, 2000);
	} else {
	  //console.log("dupa2");
		loaded = true;
		window.scrollTo(0, 0);
	}
}

$("body").ready(function() {
	$(".pkt-nav ul.icons").append("<li id='pagenav_shuffle'><a class='hint-item' data-intro='Zapisz adres URL' data-position='bottom' href='#'>Przetasuj</a></li>");
	$("#pagenav_shuffle").click(shuffle_queue);

	//$(".pkt-nav ul.icons").append("<li id='pagenav_load_all'><a class='hint-item' data-intro='Zapisz adres URL' data-position='bottom' href='#'>Przetasuj</a></li>");
	//$("#pagenav_load_all").click(load_all);
});
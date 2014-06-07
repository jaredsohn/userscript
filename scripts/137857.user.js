// ==UserScript==
// @name          MAL Highlighter
// @description   Highlights seiyuu's roles from anime you've seen and previews full pictures when you click on a thumbnail.
// @namespace     imux16
// @include       http://myanimelist.net/people/*/*
// @include       http://myanimelist.net/anime/*/*
// @include       http://myanimelist.net/character/*/*
// @version       1.1
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	$("a[title='Edit this entry']").closest("tr").css("background", "#E1E7F5");

	$("body").append("<div id='pic_holder'></div>");
	$("#pic_holder").hide().css('position', 'absolute').css('z-index', '1000')

	var pic_urls = new Array();
	var anime_urls = new Array();
	var pic_holder = $("#pic_holder")
	var i = ""
	var si = ""
	var pos = ""
	$(".picSurround a:first-child").mouseenter(function() {
		pic_holder.appendTo(this);
		i = $(".picSurround a:first-child").index(this);
		if ($(this).attr("href") !== "##")
			anime_urls[i] = $(this).attr("href").toString();
		$(this).attr("href", "##");

	}).click(function(e) {
		si = $(".picSurround a:first-child").index(this);
		pos = $(this).position();
		if (e.pageX > ($(window).width() / 2)) {
			pic_holder.css("top", pos.top).css("left", pos.left - 200)
		} else {
			pic_holder.css("top", pos.top).css("left", pos.left)
		}

		if (pic_urls[si] == null) {
			pic_holder.html("");
			var showpic = anime_urls[i] + "#content img:first"
			pic_holder.load(showpic, function(data) {
				pic_urls[si] = $(data).find("#content img:first").attr("src");
				$(this).show();
			})
		} else {
			pic_holder.html('<img src="' + pic_urls[i] + '">').show();
		}

	}).mouseleave(function() {
		pic_holder.hide("", function() {
			$(this).html("")
		});

	});

};

addJQuery(main);
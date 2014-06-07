// ==UserScript==
// @name			ExHentai & g.E-Hentai Tags Preview
// @namespace			fyde90
// @version			0.3
// @description			When you hover over a gallery it shows the tags.
// @include			http://exhentai.org/
// @include			http://exhentai.org/?*
// @include			http://exhentai.org/tag/*
// @include			http://exhentai.org/favorites.php
// @include			http://exhentai.org/favorites.php?*
// @include			http://exhentai.org/uploader/*
// @include			http://g.e-hentai.org/
// @include			http://g.e-hentai.org/?*
// @include			http://g.e-hentai.org/tag/*
// @include			http://g.e-hentai.org/favorites.php
// @include			http://g.e-hentai.org/favorites.php?*
// @include			http://g.e-hentai.org/uploader/*
// ==/UserScript==
		
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	$('body').append('<div id="info_div">Loading...</div>');
	$('#info_div').hide()
	.css('position', 'absolute')
	.css('padding', '5px')
	.css('z-index', '1000')
	.css('max-width', '250px')
	if (window.location.toString().indexOf('g.e-hentai.org') >= 0) {
		var color = "#5c0d11";
		$('#info_div').css('background-color', '#edebdf')
		.css('color', color)
		.css('border', '1px solid ' + color);
	} else {
		var color = "#dddddd";
		$('#info_div').css('background-color', '#4f535b')
		.css('color', color)
		.css('border', '1px solid ' + color);
	}
	var tags = new Array();
	var titles = new Array();
	$('.it5,.id3').css('z-index', '100'); //Semi-fix for EH Plus
	$('.it5,.id3').mouseover(function() {
		var index = parseInt($('.it5,.id3').index(this));
		$(this).children().children().attr("title", "");
		if (tags[index] == null) {
			var gal_url = $(this).find('a:last').attr('href');
			$.ajax({
				url:gal_url,
				type:'get',
				dataType:'html',
				success:function(data)
				{ 
					var _html= $(data);
					tags[index] = _html.find('#taglist').text().replace(/\)/g,") ").replace(/You can enter some tags below to make this gallery less sad./g,"");
					titles[index] = _html.find('#gn').text();
					insertStuff(titles[index], tags[index]);
				}
			});
		} else {
			insertStuff(titles[index], tags[index]);
		}
	}).mousemove(function(pos) {
		$('#info_div').show()
		.css('top', pos.pageY+10).css('left', pos.pageX+10);
	}).mouseout(function() {
		$('#info_div').html("Loading...");
		$('#info_div').hide();
	});

	function insertStuff(title, index) {
		$('#info_div').html("<span style='font-weight: bold;'>" + title + "</span><div style='height: 1px; background-color: " + color + "; margin: 5px 0 2px 0;'></div>" + index);
	}
}

addJQuery(main);
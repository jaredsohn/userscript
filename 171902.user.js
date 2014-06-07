// ==UserScript==
// @name           Shana Project MAL
// @description    Add MyAnimeList search links to shows in the season pages
// @namespace      shanaProjectMAL
// @include    http://www.shanaproject.com/series/*
// @include    http://www.shanaproject.com/season/*
// @version     0.1
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.$=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var title;
	var link;
	var boxStyle = "background:#bfd255;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JmZDI1NSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzhlYjkyYSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUxJSIgc3RvcC1jb2xvcj0iIzcyYWEwMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5ZWNiMmQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(191,210,85,1) 0,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(191,210,85,1)),color-stop(50%,rgba(142,185,42,1)),color-stop(51%,rgba(114,170,0,1)),color-stop(100%,rgba(158,203,45,1)));background:-webkit-linear-gradient(top,rgba(191,210,85,1) 0,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);background:-o-linear-gradient(top,rgba(191,210,85,1) 0,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);background:-ms-linear-gradient(top,rgba(191,210,85,1) 0,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);background:linear-gradient(to bottom,rgba(191,210,85,1) 0,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#bfd255',endColorstr='#9ecb2d',GradientType=0);padding:3px 5px 3px 5px;border:solid #323232;border-width:1px 1px 0 0;font-weight:bold;display:inline-block;margin:0 51px -3px 0;float:right";
	var linkStyle = "border:none";
	$(document).ready(function() {
		$('.header_display_box').each(function() {
			title = $(this).find('.header_info_block h3 a').text();
			link = '<span class="header_info_block" style="'+boxStyle+'"><a style="'+linkStyle+'" href="http://myanimelist.net/anime.php?q='+encodeURIComponent(title)+'">MAL</a></span>';
			$(this).find('.header_info_block').last().after(link);
		});
	});
}

// load jQuery and execute the main function
addJQuery(main);
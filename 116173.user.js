// ==UserScript==
// @name           HobbySearch Image Wall Pre-loader
// @version        0.7.0
// @namespace      hobbysearch
// @description    Display product images as a wall.
// @include        http://www.1999.co.jp/eng/image/*
// @include        http://www.1999.co.jp/image/*
// @icon           http://www.1999.co.jp/images/banner/favicon.ico
// @updateURL      https://raw.github.com/Goosk/Hobbysearch/master/hobbysearch.user.js
// ==/UserScript==

(function () {
	var width = parseInt(document.body.offsetWidth);
	var images = new Array();
	var html = "";
	var css = "";

	css = css + "<style type='text/css'>\n";
	css = css + ".product_image{ width: "+ (width/3 - 30) +"px; float: left; margin: 10px; text-align: center; }\n";
	css = css + ".product_image:nth-child(3n+4){ clear: left; }";
	css = css + ".product_image img{ max-width: 100%; max-height: 100%; }\n";
	css = css + "</style>";

	var thumbnails = document.body.getElementsByTagName('span')[0];

	if(thumbnails != undefined){
		thumbnails = thumbnails.getElementsByTagName("img");
		
		if(thumbnails.length > 0){
			for(var i = 0; i < thumbnails.length; i++) {
				images[i] = thumbnails[i].src;
				images[i] = images[i].replace("_s", "");
			}

			for(var i = 0; i < images.length; i++) {
				html = html + "<div class='product_image'>";
				html = html + "<a href='"+ images[i] +"'>";
				html = html + "<img src='"+ images[i] +"' alt='' />";
				html = html + "</a>";
				html = html + "</div>";
			}

			document.head.innerHTML = document.head.innerHTML + css;
			document.body.innerHTML = html;
		}
	}
})();

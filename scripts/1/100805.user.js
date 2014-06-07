// ==UserScript==
// @name           Flickr Show All Large Photos
// @namespace      yuripave
// @description    

// @include        http://*.flickr.com/photos/*
// ==/UserScript==

function init() {
	if (typeof jQuery == 'undefined') {
		window.setTimeout(init, 100);
	} else {
		main();
	}
}

function main() {
	jQuery(".LinksNew > a").wrap("<span />");
	jQuery("<a href='#' />").text("Show All").click(showAll).appendTo(".LinksNew");
	jQuery("<style />").text(".fbfPopup{background:none repeat scroll 0 0 #F6F6F6;border:3px double #666;border-radius:5px 5px 5px 5px;padding:10px;}.fbfPopupContainer{bottom:0;display:none;left:0;right:0;top:0;}#FBFBigAlbumContainer{padding:0 0 40px;}#FBFBigAlbum{position:relative;text-align:center;margin:10px;padding:15px 3px;}#FBFBigAlbum a{padding:1px;}#FBFBigAlbum img{background:none repeat scroll 0 0 #FFF;border:1px solid #CCC;min-height:20px;min-width:20px;}.FBFBigAlbumClose{color:red;cursor:pointer;font-weight:700;padding:0 10px;}#FBFBigAlbumClose1{position:absolute;right:0;top:0;}#FBFBigAlbumClose2{bottom:0;position:absolute;right:0;}").appendTo("body");
	jQuery("body").keypress(function(e) {
		if(e.keyCode==27) {
			jQuery("#fbfPopupContainer").remove();
		}
	});
}

function showAll() {
	jQuery("body").append("<div id='fbfPopupContainer' class='fbfPopupContainer' style='z-index: 1001; position: absolute; display: block;'><div id='FBFBigAlbumContainer'><div class='fbfPopup' id='FBFBigAlbum'><div class='FBFBigAlbumClose' id='FBFBigAlbumClose1'>Close</div><div class='FBFBigAlbumClose' id='FBFBigAlbumClose2'>Close</div></div></div></div>");
	jQuery(".FBFBigAlbumClose").click(function() {
		jQuery("#fbfPopupContainer").remove();
	});
	jQuery(".pc_img").each(function() {
		var idx;
		if ((idx = this.src.indexOf("_s")) != -1 || (idx = this.src.indexOf("_m")) != -1 || (idx = this.src.indexOf("_t")) != -1 ) {
			var img = this.src.slice(0, idx) + "_b" + this.src.substr(idx + 2);
			jQuery("#FBFBigAlbum").append("<a href='"+img+"' target='_blank'><img src='"+img+"' /></a>");
		}
	});
}

var script = document.createElement("script");
script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js";
(document.body || document.head || document.documentElement).appendChild(script);

var script = document.createElement("script");
script.appendChild(document.createTextNode("("+ init +")();\n"+main+"\n"+showAll));
(document.body || document.head || document.documentElement).appendChild(script);
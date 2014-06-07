// ==UserScript==
// @name        browsePreview
// @namespace   ptPicOpener
// @include     http://www.pussytorrents.org/torrents/browse*
// @version     1
// @description shows the pictures in the browse page so you don't have to open the torrent details pages.
// ==/UserScript==
var maxImagesPerTorrent = 3;

$("#siteContainer").css("width","95%");

function showImages() {
	$("#torrenttable td.name").each(function() {
		var td = $(this);
		var url = td.find("a").attr("href");
		$.ajax({
			url: url,
			datatype: 'xml' 
			}).done(function(data) {
				var torrentURL = $(data).find("#downloadButton").parent().attr("action");
				var a = $(document.createElement("a")); 
				a.attr("href",torrentURL);
				a.text("download");
				td.append("&#160;");
				td.append(a);
			
				td.append("<br/>");
				var imgCounter = 0;
				var imgHref = $(data).find(".lightbox").each(function() {				
					if(imgCounter >= maxImagesPerTorrent) {
						td.append("... ")
						return;
					}
					var imgSrc = $(this).attr("href");
									
					var a = $(document.createElement("a"));				
					//a.attr("href", imgSrc);	
					a.click(function() {
						var img = $(this).find("img");
						var clicked = (img.data("clicked") === true);
						clicked = !clicked;					
						if(clicked) {
							img.css("max-width", "" + (td.width() - 10) + "px");					
							img.css("max-height", "");
						}
						else {
							img.css("max-width", "33%");
							img.css("max-height", "250px");
						}
						
						img.data("clicked", clicked);					
					});
					
					var img = $(document.createElement("img"));
					img.attr("src", imgSrc);
					img.css("max-width", "33%");
					img.css("max-height", "250px");
					img.css("border-right", "3px solid transparent");
					img.css("display: inline");				
					img.attr("title","bla");				
					a.append(img);
					td.append(a);							
					imgCounter++;
				});
			});
	});
}

showImages();

var oldJQueryGet = $.get;
$.get = function(url,options, callback) {
	if(url.indexOf("/torrents/browse") === 0) {
		oldJQueryGet(url,options,function(data) {
			callback(data);
			showImages();
		});
	}
	else {
		oldJQueryGet(url,options,callback);
	}
}

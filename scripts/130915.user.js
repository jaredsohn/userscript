// ==UserScript==
// @name           Liquipedia Tooltip Helper
// @namespace      http://pylonpants.blogspot.com/
// @description    Adds hover info on links for the Liquipedia
// @include        http://wiki.teamliquid.net/*
//
//					The amazing jQuery libray
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
//
//					hoverIntent for jQuery, allows us a smoother hover
// @require			http://cherne.net/brian/resources/jquery.hoverIntent.minified.js
// ==/UserScript==


var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if (is_chrome) {

	// Chrome Require fix, as explained here http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey
	var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
	
	loadAndExecute(
		"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
		loadAndExecute("http://cherne.net/brian/resources/jquery.hoverIntent.minified.js",go)
	);
	
} else {
	$(go);
}




function go() {
	
	// Mouse location tracking
	var mouse = {"x":0,"y":0};
	
	// Updates mouse coordinates
	$("body").mousemove(function(event) {
		mouse["x"] = event.pageX;
		mouse["y"] = event.pageY;
	});

	// This scary looking block of code is simply an animated .gif, we use this format (instead of an url) so we don't have to hit a server each time we use liquidpedia.
	// If you wish, you can change it to an url, or simply to "" if you find it uneasing, but I assure you, it's a harmless .gif
	var loader_img_src = "data:image/gif;base64,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";
	var loader_img = $("<img>").attr("src", loader_img_src).css("padding", "10px");
	
	// Get all links
	var links = $('[href^="/"]').each(function(i) {
	
		// Scope
		var div;
	
		// Using hoverIntent instead of built-in hover, since it's more smooth, it will allow you to mouse past a link and not having it pop up
		$(this).hoverIntent(function() {
		
			// Removes the tooltip when you move your mouse
			$("body").mousemove(function(event) {
				div.remove();
			});
			
			// CSS to make the tooltip look a bit snazzy
			div = $("<div>").css({
				"background-color":"#0055a8",
				"border-radius":"10px 10px 10px 10px",
				"box-shadow":"5px 5px 5px rgba(1,1,1,0.5)",
				"margin":"0",
				"padding":"0",
				"position":"absolute",
				"top":mouse["y"]+10,
				"left":mouse["x"]+10,
				"z-index":"3"
			}).append(loader_img).appendTo("body");
			
			// AJAX call
			$.get($(this).attr("href"), function(data) {
				
				// This 'if' makes sure if the tooltip is removed, before the content is loaded, it will not show
				if (div) {
				
					// Find the content we need...
					// This is a player, tourney or team
					var box = $(data).find('[style*="font-size: large; background-color:#b0c4de"]').parents("table").first();
					
					// This is a map, get the image
					if (!box[0]) box = $(data).find('#bodyContent img[height=400], #bodyContent img[width=400]').first();
					
					// This is a unit
					if (!box[0]) box = $(data).find('.infobox').first();
					
					// Add content to box
					div.html(box);
					
					// Reposition the tooltip if it's out of bounds ...
					// ... Too far to the right
					if (div.width()+div.offset().left > $(window).width()) {
						// Align with right edge
						div.css("left", $(window).width()-div.width());
					}
					// ... Too tall
					if (div.height() > $(window).height()) {
						// Align with top edge
						div.css("top", $(window).scrollTop());
					// ... Too low
					} else if (div.height()+div.offset().top > $(window).scrollTop()+$(window).height()) {
						// Align with bottom edge
						div.css("top", $(window).scrollTop()+$(window).height()-div.height());
					}
					
				}
				
			});
	
		},function() {});
		
		
	})
	// Remove title tag on links, or else the title tooltip will lay ontop of the tooltip, pretty annoying.
	.removeAttr("title");
	
}

// ==UserScript==
// @name           IDG.se Enhanced
// @description    Ett script som förbättrar IDG.se på flera sätt. Bland annat görs bildspelet till AJAX och textlänkar blir klickbara.
// @version        1.0.0
// @namespace      http://tapiren.se/category/userscripts
// @include        http://idg.se/*
// @include        http://*.idg.se/*
// @require        http://sizzlemctwizzle.com/updater.php?id=105053&days=7
// ==/UserScript==


// Load the jQuery script and append it to <body>
function addJQuery(callback)
{
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// And here comes the userscript! :D
function main()
{
	var slideshowImages = new Array();
	var slideshowTexts = new Array();
	var slideshowSelected = 0;
	var slideshowTotal = 0;
	
	// Get a list of all the images and texts in this slideshow
	function getSlideshowImages(url)
	{
		$.ajax({
			type: "GET",
			url: url,
			error: function(xhr, desc, exceptionobj) {
				return true;
			},
			success: function(responseText, responseCode) {
				var i = 0;
				var divs = $(responseText).find("div.picture_wrapper");
				$(divs).each(function() {
					slideshowTexts[i] = $(this).find("div.text").text();
					slideshowImages[i] = $(this).find("img").attr("src");
					
					i++;
				});
				slideshowTotal = i;
				
				var index = querySt("img");
				if (index > 0) {
					slideshowSelected = querySt("img")-1;
				}
				
				setSlideshowLinks();
			}
		});
	}

	// Hook on to the links in the slideshow and make them do what we want
	function setSlideshowLinks()
	{
		$('.next a').live('click', function() {
			if ((slideshowSelected+1) < slideshowTotal) {
				setSlideshowImage(++slideshowSelected);
			}
			return false;
		});
		
		$('.previous a').live('click', function() {
			if (slideshowSelected > 0) {
				setSlideshowImage(--slideshowSelected);
			}
			return false;
		});
		
		$('.picture a').live('click', function() {
			if ((slideshowSelected+1) < slideshowTotal) {
				setSlideshowImage(++slideshowSelected);
			}
			return false;
		});
		
		$("#mycarousel li a").live('click', function() {
			slideshowSelected = $("#mycarousel li a").index(this);

			setSlideshowImage(slideshowSelected);
			
			return false;
		});
	}

	// Show the selected image
	function setSlideshowImage(imageid)
	{
		if ((slideshowSelected+1) == slideshowTotal) {
			$('div.next').html('');
		}
		else if (slideshowSelected == 0) {
			$('div.previous').html('');
		}
		else {
			$('div.previous').html('<a href="'+document.location.href+'">&laquo;</a>');
			$('div.next').html('<a href="'+document.location.href+'">&raquo;</a>');
			setSlideshowLinks();
		}

		$("#mycarousel li a img").removeClass('selected');
		$("#mycarousel li a").eq(slideshowSelected).find('img').addClass('selected');

		$(".jcarousel-big-picture .picture img").attr("src", slideshowImages[imageid]);
		$(".jcarousel-big-picture div.text").text(slideshowTexts[imageid]);
		$(".counter").html((imageid+1)+"/"+slideshowTotal);
	}

	// Get a parameter from the query string
	function querySt(ji) {
		var hu = document.location.href;
		var gy = hu.split("&");
		for (i=0;i<gy.length;i++) {
			var ft = gy[i].split("=");
			if (ft[0] == ji) {
				return ft[1].split("#")[0];
			}
		}
	}

	// Convert text links to clickable links
	function text2links(text)
	{
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp,"<a href='$1'>$1</a>");
	}
	
	// Process all the comments
	$('.commentContainer .commentBodyContent').each(function() {
		var text = $(this).html();
		text = text2links(text);
		$(this).html(text);
	});
	
	// Process the slideshow
	$('.jcarousel-wrapper').each(function() {
		var data = document.location.href.split("?");
		var galleryurl = data[0]+"?showGallery=true&allimages=true";
		
		$('.allpicturesLink').css('float', 'left');
		$('.allpicturesLink').after('<div style="text-align: right; color: #ffffff; padding: 6px 10px 0 10px; font-weight: bold;">Bildspelet fixat!</div><br style="clear: both;" />');

		getSlideshowImages(galleryurl);
	});
}

// Load jQuery and execute the main function
addJQuery(main);

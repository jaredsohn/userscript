// ==UserScript==
// @name           Old GotSars
// @description    Modifies the new GotSars layout to be more like the old.
// @namespace      oldgotsars.
// @version        0.6
// @include        http://www.gotsars.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	// Redirect if page doesn't have trailing slash.
	var this_url = document.URL;
	if(this_url.indexOf("/image/") != -1) {
		if(this_url.charAt(this_url.length-1) != '/') {
			window.location = this_url + '/';
		}
	} else if(this_url.indexOf("/p/") != -1) {
		page_number = parseInt(this_url.split('/')[4]);
	} else {
		page_number = 1;
	}

	// Function to edit css.
	function add_css(selector, rule) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = selector + "{" + rule + "}";
		head.appendChild(style);
	}

	// Make some new styles.
	add_css('html, body','background-color: #FFF !important;');
	add_css('div#wrap','border: none !important; width: 100% !important;');
	add_css('.container','width: 100% !important;');
	add_css('div#header','text-align: left !important;');
	add_css('div#images','width: 100% !important;');
	add_css('div#show-image','width: 100% !important; text-align: center;');
	add_css('#old_images a:visited','color: #800080 !important;');
	add_css('#old_images','text-align: left !important;');
	add_css('#old_images_list','list-style: none !important;');
	add_css('.theend','padding: 7px 0;');
	add_css('.theend a','cursor: pointer;');

	// Hide the new style images.
	$("#images").css("display","none");
	$("#image_tags").css("display","none");
	$("#login").css("display","none");
	$("#pagination").css("display","none");

	// Check if it is an image page, and if so, embed the real image.
	if(this_url.indexOf("/image/") != -1) {
		// Does the image have a hyperlink?
		if($('#show-image a.popup').length) {
			// Set the new image.
			$('#show-image').html('<a href="' + $('#show-image a.popup').attr('href') + '"><img src="' + $('#show-image a.popup').attr('href') + '" /></a>');
		}
		// Hide the "this is a gif" message
		$(".alert-message").css("display","none");
	} else {
		// Create a new element before the original images.
		$("#images").before('<div id="old_images"><ul id="old_images_list"></ul></div>');
		
		// Function to list-ify the images.
		function grab_images(where) {
			$(".image-box", where).each(function(index) {
				nice_gotsars_url = $(".image a", this).attr('href');
				thumb_url = $(".image img", this).attr('src');
				real_url = $(".image img", this).attr('title');
				gotsars_url = thumb_url.split('/')[3];
				added_when_html = $(".comment-total", this).html();
				added_when = added_when_html.split('<')[0];
				added_when = added_when.replace('Added about ','');
				added_when = added_when.replace('Added ','');

				// Add to the list.
				$("ul#old_images_list").append('<li><span>' + added_when + '</span> - <a href="' + nice_gotsars_url + '">' + real_url + "</a></li>");
			});
			// Add a blank.
			$("ul#old_images_list").append('<li class="theend" id="theend' + page_number + '"><strong>End of page ' + page_number + '. Load <a>moar</a>?</strong></li>');
			// Add a hook
			$(".theend a").click(function() {
				$("#theend" + page_number).html("<strong>End of page " + page_number + ".</strong>");
				grab_next_images();
			});
		}
		
		// Function to grab the next page worth of links.
		function grab_next_images() {
			next_page = "";
			page_number = page_number+1;
			$.get("/p/" + page_number + "/", '', function(next_page){
			grab_images(next_page);
			}, 'html');
		}
		
		// Call it to grab the first page of links.
		grab_images(document.body);
	}
}

// load jQuery and execute the main function
addJQuery(main);
// ==UserScript==
// @name	BBC News Update Check
// @namespace	http://danbo.me
// @copyright	2013+, Dan Atkinson
// @version	1.1
// @description	Checks the BBC News article every x seconds to determine whether there's a newer version. Useful when keeping an eye on breaking news stories.
// @match	http://*.bbc.co.uk/news/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

//Adjust this as necessary. Default is 60 seconds.
var seconds = 60;

$(function() {
	var timer = seconds * 1000,
		page = location.href,
		$time = $("span.story-date span.time:first"),
		timeout = setInterval(checkNewsArticle, timer),
		tabIsActive = true;

	if($time.length) {
		$time = $time.text();
		console.log("Monitoring the news article for updates from its last update at " + $time);
	} else {
		error();
	}

	$(window).on("blur focus", function(e) {
		var prevType = $(this).data("prevType");

		if (prevType != e.type) {
			//  reduce double fire issues
			switch (e.type) {
				case "blur":
					// do work
					tabIsActive = false;
					break;
				case "focus":
					// do work
					tabIsActive = true;
					break;
			}
		}

		$(this).data("prevType", e.type);
	});

	function checkNewsArticle() {
		try {
			$.ajax({
				url: page,
				dataType: "html",
				error: error,
				success: success
			});
		} catch(err) {
			error();
		}
	}

	function error(jqXHR, textStatus, errorThrown) {
		console.log("There was an error, so we're aborting the script in order to prevent any more problems occuring.", jqXHR, textStatus, errorThrown);
		clearInterval(timeout);
	}

	function success (data) {
		data = $.parseHTML(data);
		var $storyDate = $(data).find("span.story-date span.time:first");

		if(!$storyDate.length) {
			//Can't find the story date so this is either not a news story, or we don't have a reliable way of determining the last update date.
			error();
		} else {
			$storyDate = $storyDate.text();

			if($storyDate !== $time) {
				//We know the story has been updated, so stop checking and tell the user.
				clearInterval(timeout);

				if(tabIsActive) {
					if(confirm("This news story was updated at " + $storyDate + ".\nYou are reading an older version of the story from " + $time + ".\n\nWould you like to reload the page?")) {
						location.reload();
					}
				} else {
					//Quietly reload.
					location.reload();
				}
			}
		}
	}
});
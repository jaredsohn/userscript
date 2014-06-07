// ==UserScript==
// @name           Gametrailers Spam Killer
// @namespace      www.example.com
// @description    Tired of endless spam promoting crappy online stores? I know I am. Use this script!
// @include        http://www.gametrailers.com/*
// @include        http://gametrailers.com/*
// @include        https://www.gametrailers.com/*
// @include        https://gametrailers.com/*
// ==/UserScript==

// Don't inject script for iframes
if (location.href == top.location.href)
    (function($){

	// A cached list of comments that are spam
	var spam = [];

	function randID(){
	    var id = "";
	    for (var i = 1; i <= 10; i++)
		id += (Math.floor(Math.random() * 10) + 1);
	    return id;
	}

	// Loading animation
	var loadIcon = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";

	// Function stack
	var stack = [];
	var stackID = randID();
	var i = 0;
	var tot = 0;
	    
	function invalidateStack(){
	    stackID = randID();
	    stack = [];
	    i = 0;
	    tot = 0;
	    $("#comment_block > div.processing").removeClass("processing").find(".loading").remove();
	}

	// Removes the comment and marks it as spam in the cache
	function removeComment($element){
	    var id = $element.attr("id").substring("comment_".length);
	    spam[id] = 3;
	    $element.remove();
	}

	function spamCheck(){
	    // Copy the stack ID
	    var localStackID = stackID.valueOf();

	    // Prevent synchronization issues
	    if (localStackID != stackID){
		invalidateStack()
		return;
	    }

	    // Filter the comments before reputation checking
	    $("#comment_block > div").each(function(){
		var $comment = $(this);

		// Remove cached spam
		var id = $comment.attr("id").substring("comment_".length);
		if (spam[id] == 3)
		    $comment.remove();
		
		// Remove comments that moderators have already removed
		if ($comment.find(".comment_body font").size() == 1){
		    removeComment($comment);
		    return;
		}

		// Remove blank comments
		var bodyText = $.trim($(".comment_body").text());

		if (bodyText == ""){
		    removeComment($comment);
		    return;
		}
	    });

	    // Find the comment block
	    var $comments = $("#comment_block > div");

	    if ($comments.size() != 0)
		$comments.each(function(){
		    // Get the comment
		    var $comment = $(this);

		    var bodyText = $.trim($(".comment_body").text());

		    // Skip comments that have already been processed
		    if (!$comment.hasClass("processing")){
			// Prevent synchronization issues
			$comment.addClass("processing");

			// Add a nice loading indicator
			$comment.find(".comment_username a").after("<img class='loading' src='" + loadIcon + "'/>");

			stack.push(function(){
			    if (localStackID == stackID){
				// Get the user's gamepad
				var gamepad = $comment.find(".comment_avatar_container a").attr("href");

				$.get(gamepad, function(r){
				    var $r = $(r);

				    // Collect information about the user

				    var dateString = $r.find(".info_row:eq(1) .info_data").text().split(/-/);
				    var joinDate = new Date();
				    // Parse the join date
				    joinDate.setFullYear(dateString[2], dateString[0] - 1, dateString[1]);

				    var GTP = parseInt($r.find(".info_row:eq(3) .info_data").text(), 10);

				    // Get a new date object which is todays date
				    var todaysDate = new Date();
				    
				    // Banned?
				    var banned = $r.find(".ban_alert").size() != 0;

				    // Did the user join today
				    var joinedToday = (joinDate.toLocaleDateString() == todaysDate.toLocaleDateString());


				    // What is the user's level?
				    var level = parseInt($r.find(".gamepad_leftnav_level").text().match(/\d+/), 10);

				    // Calculate percentage of down votes recieved
				    var upThumbs = parseInt($r.find(".info_row:eq(7) .info_data").text().replace(",", ""), 10);
				    var downThumbs = Math.abs(parseInt($r.find(".info_row:eq(8) .info_data").text().replace(",", ""), 10));

				    // Ignore comments where the user information is not available
				    if (!isNaN(upThumbs) && !isNaN(downThumbs)){
					(function(){
					    // Calculate the total number of recieved thumbs
					    var totalThumbs = upThumbs + downThumbs;

					    // Calculate the percentage of down thumbs recieved
					    var percentDown = (downThumbs / totalThumbs) * 100;

					    var dermits = 0;

					    // People that just joined are suspicious
					    if (joinedToday)
						dermits += 1;

					    // Detect people who leave crappy comments
					    if (percentDown >= 75)
						dermits += 1;

					    // You are done
					    if (percentDown >= 95 && totalThumbs > 20){
						removeComment($comment);
						return;
					    }

					    // People who got banned are likely no good
					    if (banned)
						dermits += 2;

					    // People with a low level
					    if (level < 1)
						dermits += 1;

						if (GTP < 20)
						    dermits += 1;

					    // Designed not to detect people who just joined
					    if (dermits > 2)
						removeComment($comment);
					})();
				    }

				    // Remove the loading indicator and add the processing
				    // flag
				    $comment.addClass("processed").find(".loading").remove();

				    // Execute the next function in the stack
				    execStack(i);
				});
			    }
			});
		    }
		    tot++;
		});

	    // Execute the next function in the stack
	    function execStack(){
		if ($.isFunction(stack[i]))
		    stack[i]();
		i++;
	    }

	    // Prevent synchronization issues
	    if (localStackID != stackID){
		invalidateStack()
		return;
	    }

	    // Begin executing the stack
	    execStack(i);
	}

	spamCheck();

	// Bind a Gametrailers function to run spam check on
	// comment page change
	var uw = unsafeWindow;

	// Store a copy of comments_post_load_page
	uw.cplp = uw.comments_post_load_page;

	// Modify comments_post_load_page to spam check after comments are loaded
	uw.comments_post_load_page = function (a,b,c,d,e,f){
	    uw.cplp(a,b,c,d,e,f);
	    invalidateStack();
	    spamCheck();
	}
    })(unsafeWindow.$j);
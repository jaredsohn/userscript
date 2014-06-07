// ==UserScript==
// @name           WBB User Blocker
// @namespace      http://userscripts.org/users/253463
// @description    Blocks certain users posts from appearing in topics
// @include        http://www.warez-bb.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var optionsMarkup = '<div id="blocker_options" style="display:none;padding:5px;box-shadow:0 0px 8px #111;background:#fff;border:1px solid #000;border-radius:5px;position:absolute;top:100px;left:50%;"><span id="close_box" style="float:right;padding:3px;cursor:pointer;">X</span><h2 style="text-align:center;margin:0px;">User blocker</h2><p style="color:#9D0D15;font-weight:bold;padding:5px 0px;">Block a user</p><label for="block_username" style="padding-right:5px;">Username:</label><input style="border:1px solid #ccc;border-radius:2px;padding:2px;margin-right: 3px;" type="text" name="block_username"><button type="button" id="add_button">Add</button><p style="color:#9D0D15;font-weight:bold;padding:5px 0px;">Blocked users</p></div>';

$(document).ready(function() {
	
	// Append blocker options markup to page
	$('body').append(optionsMarkup);
	
	// Append menu item
	$('a[href="http://readthescene.org/"]').parent().after('&nbsp; &#8226; &nbsp;<a href="#" id="user_blocker">Blocker</a>');
	
	$('#close_box').live('click', function() {
		$('#blocker_options').css('display', 'none');
	});
	
	$('#user_blocker').live('click', function() {
		$('#blocker_options').css('display', 'block');
		$('#blocker_options').css('left', (window.innerWidth / 2) - ($('#blocker_options').width() / 2));
		// Populate blocked list
		for each(var val in GM_listValues()) {
			$('#blocker_options').append('<span class="blocked_user" username="' + GM_getValue(val) + '">' + GM_getValue(val) + ' <button type="button" class="button_remove">Remove</button><br /></span>');
		}
	});
	
	$('#add_button').live('click', function() {
		var username = $('input[name="block_username"]').val();
		if(username === '') {
			alert('Please enter a user to block');
		} else {
			// Check if user is already blocked
			for each(var val in GM_listValues()) {
				if(username == GM_listValues(val)) {
					alert("User is already blocked");
					return false;
				}
			}
			GM_setValue(username, username);
			$('#blocker_options').append('<span class="blocked_user" username="username">' + username + ' <button type="button" class="button_remove">Remove</button><br /></span>');
		}
	});
	
	$('.button_remove').live('click', function() {
		var username = $(this).parent().attr('username');
		// Remove user from blocked list
		GM_deleteValue(username);
		$(this).parent().remove();
	});
	
	// Check if we're on viewtopic.php
	var location = window.location.href;
	if(location.indexOf('viewtopic.php') != -1) {
		// We are
		// Loop through all blocked users checking if they're on the page
		$('span.name strong').each(function() {
			var username = $(this).html();
			for each(var val in GM_listValues()) {
				if(username == GM_getValue(val)) {
					// We found a blocked user, remove their post from the DOM
					var ele = $(this).parent().parent().parent();
					$(ele).next().next().remove();
					$(ele).next().remove();
					$(ele).remove();
				}
			}
		});
	}
});
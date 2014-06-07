// ==UserScript==
// @name           Quick_Del
// @namespace      MAL_Admin
// @description    Adds quick delete checkboxes beside posts. Adding auto-warning features should be investigated.
// @include        http://myanimelist.net/forum/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

function add_checkbox(messageID) {
	/* Creates a form with a single checkbox for a particular messageID.
	 */
	var form = '<form name="postForm" id="form_' + messageID + '" method="post" action="?action=message&msgid=' + messageID + '">'
				+ '<label for="delete">Delete:</label>'
				+ '<input name="' + messageID + '" type="checkbox" value="Delete"/>'
				+ '<textarea class="textarea" name="msg_text" class="hidden_input" rows="10" cols="80">'
				+ '</textarea>'
				+ '<input type="submit" name="submit" value="Edit Message" class="inputButton hidden_input">'
				+ '<input name="delete" type="submit" class="inputButton" onclick="return confirm(\'Are you sure you want to remove this post?\');" value="Delete"/></form>';

	//Add the form.
	$('#message' + messageID + ' ~ div:not(.sig) div').prepend(form);
}

function build_post_list() {
	/* Creates an array of post message IDs.
	 */
	//Create the array
	var list = [];

	$('td.forum_boardrow2 > div').each(function () {
		//Get the current length of list
		var currLength = list.length;

		//Add the current div id to list
		list[currLength] = ($(this).attr('id')).substring(11);
	});

	//Now return the array
	return list;
}

function add_quick_del_form() {
	//Wrapper function for adding the quick delete checkboxes to each post

	//Get the post list
	var postList = build_post_list();

	//alert(postList.length);
	//For each post, add the checkbox form
	for (i = 0; i < postList.length; i++) {
		add_checkbox(postList[i]);
	}
}
function activate_del() {
	//This function runs from a single button and sends the form data to delete each post.

	//For each checkbox, submit the form.
	$('input[type="checkbox"]:checked + input').each(function () {
		alert("Deleting!!!");
		$(this).children('input[type="submit"]').submit();
		//$.post($(this).parent().attr('action'), $(this).serialize());
	});
}
function add_quick_del_button() {
	//Adds the link for deleting marked posts.
	button = '<li><span id="quick_del"><a href="javascript:void(0);">Delete Posts marked as Spam</a></span></li>';
	$('#forum_options_container ul').prepend(button);
	
	//Set the onclick function of the button
	$('#quick_del').bind('click', function(){activate_del();});
}
function save_data() {
	//When a checkbox is checked this function must run. It saves the checkbox messageID to a cookie
}

function recheck_from_data() {
	//Traverses our cookie data to check if a del_form checkbox has been checked, if so it sets the state to checked.
}

//Add the delete buttons
$(document).ready(add_quick_del_form);

//Add the submit button
$(document).ready(add_quick_del_button);
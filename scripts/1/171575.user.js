// ==UserScript==
// @name        Exothank
// @namespace   http://userscripts.org/users/274735
// @description Adds an external "thanking" system to the white-wolf.com forum to replace the official one that was removed.
// @include     http://forums.white-wolf.com/*
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @version     0.1.2
// @updateURL   https://userscripts.org/scripts/source/171575.meta.js
// @downloadURL https://userscripts.org/scripts/source/171575.user.js
// ==/UserScript==
function natural_list(arr) {
	var result = '';
	for (var i = 0; i < arr.length; i += 1) {
		if (i == 0) result += '<i>'+arr[0]+'</i>';
		else if (i == arr.length - 1) result += " and <i>" + arr[i]+'</i>';
		else result += ", <i>" + arr[i]+'</i>';
	}
	return result;
}

var username;
var thread_id;

var exothank_style_e = $('<style type="text/css">').appendTo($('head'))


try {
	// determine username
	{
		var username_e = $('#login_loginView_loginName')
		if (username_e) {
			username = username_e.text()
		}
	}
	
	// determine thread id
	{
		var favour_button_href = $('#dvFavorite1 a').attr('href')
		if (favour_button_href !== undefined) {
			thread_id = favour_button_href.match(/javascript\:(?:add|remove)FavoriteTopic\(([0-9]*)\)/)[1]
		}
	}
	
	// if in a thread then use exothank service
	if (thread_id !== undefined) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://exothank-barefootmonkey.rhcloud.com/api/thread/'+thread_id,
			onreadystatechange:function(response) {
			},
			onload:function(response) {
				if (response.status == 200) try {
					// apply to each post
					var posts = $.parseJSON(response.responseText)
					update_posts(posts)
				} catch (e) { console.log(e) }
			},
			onerror:function() {
				console.log('error')
			}
		})
	}

} catch (e) { console.log(e) }

function update_posts(posts) {
	$('.postContainer, .postContainer_Alt').each(function() {
		// find post id
		var postlink = $(this).find('.postheader .postPosted .rightItem a')
		var post_id = postlink.attr('href').match(/#post([0-9]*)$/)[1]
						
		var user_concured = false, user_thanked = false
					
		// find poster name
		var poster_name = $(this).find('.postUser').text().trim()
					
		// if there are thanks or other mentions for this post, display them
		var post = posts[post_id]
		var thanks_container = $(this).find('#dvThanks'+post_id)
		thanks_container.empty()
		if (post !== undefined) {
			
			var concurs = post['concur']
			if (concurs !== undefined) {
				thanks_container.append($('<p>').html(natural_list(concurs) + ((concurs.length > 1) ? " agree" : " agrees") + "."))
				if (concurs.indexOf(username) >= 0) user_concured = true
			}
			var thanks = post['thank']
			if (thanks !== undefined) {
				thanks_container.append($('<p>').html(natural_list(thanks) + " thanked " + ((poster_name == username)?'you':poster_name) + " for this useful post."))
				if (thanks.indexOf(username) >= 0) user_thanked = true
			}
		}
					
		// add controls to the post
		if (username != poster_name) {
			var thank_box = $(this).find('#dvThankBox'+post_id)
		
			thank_box.empty()
					
			if (!user_concured) thank_box.append(
				$('<span class="exothank-box">')
				.text(user_thanked ? 'UNTHANK' : 'THANK')
				.data('post_id', post_id)
				.data('exothank_action', user_thanked ? 'unthank' : 'thank')
				.click(exothank_action)
			)
			if (!user_thanked) thank_box.append(
				$('<span class="exothank-box">')
				.text(user_concured ? 'UNCONCUR' : 'CONCUR')
				.data('post_id', post_id)
				.data('exothank_action', user_concured ? 'unconcur' : 'concur')
				.click(exothank_action)
			)
		}
	})
}

function exothank_action(post_element) {
	var action = $(this).data('exothank_action')
	var post_id = $(this).data('post_id')

	$('#dvThankBox'+post_id).empty().html('<span class="exothank-message">Please wait&hellip;</span>')

	GM_xmlhttpRequest({
		method: 'POST',
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
		data: JSON.stringify({
			username: username,
			thread_id: thread_id,
			post_id: post_id
		}),
		url: 'https://exothank-barefootmonkey.rhcloud.com/api/action/' + action,
		onreadystatechange:function(response) {
		},
		onload:function(response) {
			posts = $.parseJSON(response.responseText)
			update_posts(posts)
		},
		onerror:function(response) {
			console.log('error')
		}
	})
}

function add_style_rule(selector, declarations) {
	var properties = Object.keys(declarations)
	
	var rule = selector + " { "
	for (var i = 0; i < properties.length; i += 1) {
		var property = properties[i]
		var value = declarations[property]
		rule += property + ":" + value + ";"
	}
	rule += " } ";
	exothank_style_e.text(exothank_style_e.text() + rule)
}

add_style_rule('.exothank-box:active', {
	'background': 'url("/Themes/whitewolf/ButtonEnd.gif") no-repeat scroll right bottom, url("/Themes/whitewolf/ButtonBack.gif") no-repeat scroll left bottom transparent',
	'padding': '2px 8px 0',
	'color': '#000000'
})
add_style_rule('.exothank-box', {
	'background': 'url("/Themes/whitewolf/ButtonEnd.gif") no-repeat scroll right top, url("/Themes/whitewolf/ButtonBack.gif") no-repeat scroll left top transparent',
	'color': '#FFFFFF',
	'display': 'inline-block',
	'font-family': 'Arial,Sans-serif',
	'font-size': '9px',
	'font-weight': 'bold',
	'line-height': '17px',
	'padding': '1px 8px',
	'margin': '2px 0 2px 7px',
	'vertical-align': 'top',
	'cursor': 'pointer',
	'-moz-user-select': 'none',
	'-webkit-user-select': 'none',
	'-ms-user-select': 'none',
	'-o-user-select': 'none',
	'user-select': 'none'
})
add_style_rule('.exothank-box:hover', {
	'color': '#000000'
})
add_style_rule('.exothank-message', {
	'display': 'inline-block',
	'margin': '2px',
	'line-height': '19px'
})
add_style_rule('.yafnet a.yaflittlebutton', {
	'display': 'inline-block',
	'vertical-align': 'top',
	'float': 'none'
})
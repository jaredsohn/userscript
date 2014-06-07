// ==UserScript==
// @name        alpha.app.im
// @namespace   appdotnet
// @description app dot net enhancements, poll for new posts
// @include     https://alpha.app.net/*
// @exclude     https://alpha.app.net/*/post/*
// @version     0.1.7
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var new_post_message_style = 'background-color: #F5F5F5; color: #aaa; width: 100%; text-align: center; padding: 5px 0; cursor: pointer; border-radius: 5px;',
    new_post_message = '<div id="new-posts-link" style="'+new_post_message_style+'">New posts</div>',
	new_posts = false,
	post_check = null,
	interval = 30000,
	latest = 0,
	done = true,
	new_post_check = function(){
		if(!new_posts){
			done = false;
			var url = window.location.href;
			latest = $('.post-stream:first .post-container:first').attr('data-post-id');
			$.get(url, function(data){
				var new_id = $(".post-stream:first  .post-container:first", data).attr('data-post-id');
				if(new_id != latest){
					new_posts = true;
					$(".stream-container").prepend($(new_post_message).click(function(){
						window.location = window.location;
					}).fadeIn('slow'));
					clearTimeout(post_check);
				} else {
					post_check = setTimeout(new_post_check, interval);
				}
				done = true;
			});
		}
	};

$().ready(function(){
	//restart the timer
	$('button').click(function(){
		new_posts = false;
		$('#new-posts-link').remove();
		clearTimeout(post_check);
		post_check = setTimeout(new_post_check, interval);
	});
	$(".post-container").each(function() {
        process_post(this);
    });
    post_check = setTimeout(new_post_check, interval);
});
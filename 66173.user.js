// ==UserScript==
// @name		 Tumblr Don't Ask
// @namespace	 http://rcboyce.com
// @description	 Collapses "Ask me anything" posts and replies on Tumblr. 
// @include		 http://www.tumblr.com/dashboard*
// @include		 http://www.tumblr.com/tagged*
// @match		 http://www.tumblr.com/dashboard*
// @match		 http://www.tumblr.com/tagged*
// @require		 http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
	// inject jQuery if @require isn't supported
	if(unsafeWindow === undefined) {
		unsafeWindow = window;
	}
	var script = document.createElement('script');
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
	script.type = 'text/javascript';
	script.addEventListener("load", function() {
		unsafeWindow.jQuery.noConflict();
		ready(unsafeWindow.jQuery);
	}, false);
	document.getElementsByTagName('head')[0].appendChild(script);

	// called once jquery is loaded
	function ready(jQuery) {
		function url_from_css(css_syntax) {
			if(css_syntax.length < 10) {
				return '';
			}
			return css_syntax.substring(5, css_syntax.length-2);
		}
	
		function collapse_questions(i) {
			// load in others' posts
			var posts = jQuery('#posts li.post.not_mine');
			
			var prev_was_collapsed = false;
			
			// applies CSS classes to consecutive notifications
			var set_notfication_class = function(x) {
				if(jQuery('#c'+posts[x-1].id).hasClass('single_notification')) {
					jQuery('#c'+posts[x-1].id).removeClass('single_notification').addClass('first_notification');
				}
				else if(jQuery('#c'+posts[x-1].id).hasClass('last_notification')) {
					jQuery('#c'+posts[x-1].id).removeClass('last_notification').addClass('alt');
				}
				jQuery('#c'+posts[x].id).removeClass('single_notification').addClass('last_notification');
			};
			
			// gets tumblr user info from a post
			var get_tumblr_info = function(x) {
				// get user icon
				var tumblr_icon = url_from_css(jQuery(posts[x]).find('.post_avatar').css('background-image'));
				if(!tumblr_icon) {
					tumblr_icon = url_from_css(jQuery(posts[x]).find('.avatar').css('background-image'));
				}
				
				// get user info
				while(jQuery(posts[x]).hasClass('same_user_as_last')) {
					x--;
				}
				var tumblr_url = jQuery(posts[x]).find('.post_info a:first').attr('href');
				var tumblr_name = jQuery(posts[x]).find('.post_info a:first').text();
				
				return {icon: tumblr_icon, url: tumblr_url, name: tumblr_name};
			};
			
			// click handler to show original full post
			var add_show_handler = function(i) {
				jQuery('#c'+posts[i].id+' a.show').click(function() {
					// show original
					jQuery('#c'+posts[i].id).hide(300, function() {
						jQuery('#'+posts[i].id).show(300);
					});
					// adjust classes as needed
					if(jQuery('#c'+posts[i-1].id).hasClass('alt')) {
						jQuery('#c'+posts[i-1].id).removeClass('alt').addClass('last_notification');
					}
					else if(jQuery('#c'+posts[i-1].id).hasClass('first_notification')) {
						jQuery('#c'+posts[i-1].id).removeClass('first_notification').addClass('single_notification');
					}
					if(jQuery('#c'+posts[i+1].id).hasClass('alt')) {
						jQuery('#c'+posts[i+1].id).removeClass('alt').addClass('first_notification');
					}
					else if(jQuery('#c'+posts[i+1].id).hasClass('last_notification')) {
						jQuery('#c'+posts[i+1].id).removeClass('last_notification').addClass('single_notification');
					}
					return false;
				});
			};
			
			while(i < posts.length) {
				// filter "ask me anything" posts
				if(jQuery(posts[i]).hasClass('link')) {
					// test for formspring or ask in the URL
					var url = jQuery(posts[i]).find('.post_title a').attr('href');
					if(url.indexOf('formspring.') > -1 || url.indexOf('/ask') > url.length-6) {
						// get rest of post content
						var name = jQuery(posts[i]).find('.post_title a').text();
						var description = jQuery(posts[i]).find('.post_content div:eq(1)').text();
											
						var user = get_tumblr_info(i);
		
						// convert to notification style
						jQuery(posts[i]).after(' \
							<li id="c'+posts[i].id+'" class="ask_request notification single_notification"> \
								<a href="#" class="block show">show</a> \
								<img src="http://daedalus.rcboyce.com/userscripts/tumblr/notification_ask.png" class="ask_icon follow_icon notification_type_icon" alt="?"/> \
								<a href="'+user.url+'" style="border-width:0px;"><img alt="" src="'+user.icon+'" class="avatar" height="16" width="16" /></a> \
								<b style="margin-right:5px;"><a href="'+user.url+'">'+user.name+'</a>:</b> \
								<b><a href="'+url+'">'+name+'</a></b> \
								<p style="margin:3px 0 0 0;"><em>'+description+'</em></p> \
							</li>');
							
						if(prev_was_collapsed) {
							set_notfication_class(i);
						}
						
						add_show_handler(i);
						
						jQuery(posts[i]).hide();
						
						prev_was_collapsed = true;
					}
					else {
						prev_was_collapsed = false;
					}
				}
				
				// filter answers
				else if(jQuery(posts[i]).hasClass('note')) {
					if(jQuery(posts[i]).find('.post_question')) {
						var asker = {
							name: jQuery(posts[i]).find('.post_question_asker').text(),
							url: jQuery(posts[i]).find('a.post_question_asker').attr('href'),
							icon: jQuery(posts[i]).find('.post_content div:eq(3) img:first').attr('src')
						};
					
						var question = jQuery(posts[i]).find('.post_question').text();
						
						var response = jQuery(posts[i]).find('.post_content div:eq(4)').text();
					
						var user = get_tumblr_info(i);
		
						// convert to notification style
						jQuery(posts[i]).after(' \
							<li id="c'+posts[i].id+'" class="ask_reply notification single_notification"> \
								<a href="#" class="block show">show</a> \
								<img src="http://daedalus.rcboyce.com/userscripts/tumblr/notification_ask.png" class="ask_icon follow_icon notification_type_icon" alt="?"/> \
								<p style="margin:0;"> \
									<a href="'+asker.url+'" style="border-width:0px;"><img alt="" src="'+asker.icon+'" class="avatar" height="16" width="16" /></a> \
									<b style="margin-right:5px;"><a href="'+asker.url+'">'+asker.name+'</a> asked <a href="'+user.url+'">'+user.name+'</a>:</b> '+question+' \
								</p> \
								<p style="margin:.35em 0 0 0;"> \
									<a href="'+user.url+'" style="border-width:0px;"><img alt="" src="'+user.icon+'" class="avatar" height="16" width="16" /></a> \
									<b style="margin-right:5px;"><a href="'+user.url+'">'+user.name+'</a> replied</a>:</b> '+response+' \
								</p> \
							</li>');
							
						if(prev_was_collapsed) {
							set_notfication_class(i);
						}
						
						add_show_handler(i);
						jQuery(posts[i]).hide();
						
						prev_was_collapsed = true;
					}
					else {
						prev_was_collapsed = false;
					}
				}
				
				else {
					if(prev_was_collapsed) {
						jQuery(posts[i]).removeClass('same_user_as_last')
					}
					prev_was_collapsed = false;
				}
				
				i++;
			}
			return i;
		}
		
		
		
		var checked = collapse_questions(0);
		
		// check for new posts from infinite scrolling
		setInterval(function() {
			checked = collapse_questions(checked);
		}, 100);
	}
}());
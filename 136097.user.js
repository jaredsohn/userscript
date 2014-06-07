// ==UserScript==
// @name        Moonreader
// @description Viewer for Lunar Quest and other quests on tgchan.org
// @namespace   http://userscripts.org/users/274735
// @include     http://tgchan.org/kusaba/quest/res/*
// @include     http://tgchan.org/kusaba/questarch/res/*
// @version     1.3.1
// @updateURL   https://userscripts.org/scripts/source/136097.meta.js
// @downloadURL https://userscripts.org/scripts/source/136097.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
try {
	// constants_milliseconds
	const fade_in_milliseconds = 500
	const fade_out_milliseconds = 600

	// find the opening post
	var title = $('#delform>.postwidth .filetitle').text().trim()
	var mainposter = $('#delform>.postwidth .postername').text().trim()
	var mainuid = $('#delform>.postwidth .uid').text().trim()
	
	var chooser = {
		names: [$('#delform>.postwidth .postername').text().trim()],
		uids: [$('#delform>.postwidth .uid').text().trim()],
		test: function(name, uid) {
			var name_found = false, uid_found = false
			
			for (var i = 0; i < this.names.length; i += 1) {
				if (this.names[i] == name) {
					name_found = true
					break
				}
			}
			
			for (var i = 0; i < this.uids.length; i += 1) {
				if (this.uids[i] == uid) {
					uid_found = true
					break
				}
			}
			
			if (name_found && !uid_found) {
				this.uids.push(uid)
			} else if (!name_found && uid_found && name != 'Anonymous') {
				this.names.push(name)
			}
			
			return name_found || uid_found
		}
	}
	
	// add styles
	$('<style>')
		.attr('type', 'text/css')
		.appendTo($('head'))
		.text('\
.reflinkpreview {\
	z-index: 1;\
}\
.moonreader_overlay {\
	height: 100%;\
	width:100%;\
	position:fixed;\
	left: 0;\
	top: 0;\
	padding: 0;\
	margin: 0;\
	overflow-y: scroll;\
	background: #000;\
}\
.moonreader_overlay table {\
	border-collapse: collapse;\
	height: 100%;\
	margin: 0 auto;\
}\
.moonreader {\
	vertical-align: middle;\
	max-height: 100%;\
    font-family: sans-serif;\
}\
.moonreader a {\
/*    color: #990;*/\
    text-decoration: none;\
}\
.moonreader>img {\
	display: block;\
	margin: 0.5em auto;\
	border-radius: 15px;\
}\
.moonreader>blockquote {\
	max-width: 50em;\
/*    color: #d00;*/\
    background-color: #F0E0D6;\
    border-radius: 0.5em;\
    padding: 0.5em;\
}\
.refpreview {\
	margin: 0.5em;\
	padding: 10px;\
	border: 1px solid #811;\
	border-radius: 8px;\
	;\
}\
		')
	// create background
	var overlay = 
		$('<div>')
		.hide()
		.addClass('moonreader_overlay')
		.appendTo(document.body)
		
	var oc = $('<div>')
		.addClass('moonreader')
		.appendTo($('<td>').appendTo($('<tr>').appendTo($('<table>').appendTo(overlay))))
		
	var overlay_visible = false;
	
	// collect posts
	var posts = []
	{
		var allposts = $('#delform,.reply')
		for (i = 0; i < allposts.length; i += 1) {
			var post = allposts[i]
			// is this post from the author of the quest?
			// if so, add to posts list
			if (chooser.test(
				$(post).children('.postwidth').find('.postername').text().trim(),
				$(post).children('.postwidth').children('.uid').text().trim()
			)) posts.push(post)
		}
	}
	
	var current_post = 0
	var preloaded_bigimg;
	
	function showpost(i, posts, canvas) {
		if (i < 0 || i >= posts.length) return
		canvas.empty()
		var post = $(posts[i])
		
		window.scrollTo(0, post.offset().top)
		
		// add image
		try {
			var bigimg_src = post.children('.postwidth').find('img.thumb').closest('a').attr('href')
			canvas.append($('<img>').attr('src', bigimg_src))
		} catch (error) {}		
		
		// add text
		canvas.append(post.children('blockquote').clone(true, false))
		
		// add preview support to links
		canvas.find('a[class^="ref|quest|"]').each(function() {
			var e = $(this)
			e.css('color', '#0f0')
			var ref = e.attr('class').split("|")[3]
			e.removeAttr('onclick')
			
			var show_post_function = function(post_number) {
				return function(event) {
					var preview = $('#reply'+post_number+'>blockquote').clone().addClass('refpreview')
					preview
						.prepend($('<br>'))
						.prepend($('<a>').text('>>'+post_number).attr('href', '#'+post_number).click(function(){overlay.fadeOut(fade_out_milliseconds)}))
					$(event.target).after(preview).remove()
					event.preventDefault()
					return false
				}
			}
			e.click(show_post_function(ref))
		})

		// preload next post image
		if (i < posts.length - 1) {
			var next_post = i + 1
			var bigimg_src = $(posts[next_post]).children('.postwidth').find('img.thumb').closest('a').attr('href')
			preloaded_bigimg = ($('<img>').attr('src', bigimg_src))
		}

		// store position
		GM_setValue(location.pathname, i)
	}
	
	// retrieve stored position
	{
		var last_position = GM_getValue(location.pathname)
		if (last_position > 0) {
			current_post = last_position
		}
	}
	
	showpost(current_post, posts, oc)

	// handle keypresses
	$(document).keydown(function(event) {
		try {
			var active_element = document.activeElement.tagName.toUpperCase()
			var typing = (active_element == 'TEXTAREA' || active_element == 'INPUT')			
		
			 // alt+`
			if ((event.keyCode == 192) && (event.altKey || !typing)) {
				if (overlay_visible = !overlay_visible) {
			
					var scrolltop = $(window).scrollTop()
					var scrollbottom = $(window).height() + scrolltop
					var highest = 0
					
					// find the appropriate post
					for (var i = posts.length - 1; i >= 0; i -= 1) {
						var post = $(posts[i])
						var top = post.offset().top
						var bottom = post.height() + top
						
						if (top < scrollbottom && bottom > scrolltop) {
							highest = i
						}
						
						if (bottom < scrolltop) {
							if (highest == 0) highest = i
							break
						}
					}
					current_post = highest
				
					// display the post and show the overlay
					showpost(current_post, posts, oc)
					overlay.fadeIn(fade_in_milliseconds)
					overlay.attr('tabindex', 0)
					overlay.focus()
				} else {
					overlay.fadeOut(fade_out_milliseconds)
					window.scrollTo(0, $(posts[current_post]).offset().top)
				}
		
			// left
			} else if (event.keyCode == 37 && overlay_visible) {
				if (current_post > 0) {
					current_post -= 1
					showpost(current_post, posts, oc)
				}
			
			// right
			} else if (event.keyCode == 39 && overlay_visible) {
				if (current_post < posts.length - 1) {
					// select the next post
					current_post += 1
					showpost(current_post, posts, oc)
				}
			} else return;
		
			event.preventDefault();
		} catch (error) {
			console.log(error)
		}
	})
} catch (error) {
	console.log(error)
}

// ==UserScript==
// @name        Steamgifts - In the Name of the Creator
// @namespace   http://userscripts.org/users/274735
// @description For steamgifts.com. In the comment box of every giveaway for forum, press alt+o to paste the name of the OP or the creator of the giveaway. Press alt+p to insert the name of the parent poster when you're replying to another comment.
// @include     http://www.steamgifts.com/giveaway/*
// @include     http://www.steamgifts.com/support/*
// @include     http://www.steamgifts.com/forum/*
// @match       http://www.steamgifts.com/support/*
// @match       http://www.steamgifts.com/giveaway/*
// @match       http://www.steamgifts.com/forum/*
// @version     1.4.4
// ==/UserScript==
try {
	// get OP/giveaway-creator's name
	var OP_name = null
	{
		var OP_e = null
		if (window.location.pathname.substring(0, 7) == '/forum/' || window.location.pathname.substring(0, 9) == '/support/') {
			OP_e = document.querySelector('.author a:nth-child(2)')
		} else if (window.location.pathname.substring(0, 10) == '/giveaway/') {
			OP_e = document.querySelector('.hosted_by a')
		}
		if (OP_e) OP_name = OP_e.textContent
	}
	
	// catch keypress events
	document.addEventListener("keydown", function(event) {

		var active = document.activeElement
		if (active === document.querySelector('#comment_form form textarea')) {

			var which = event.which|32

			// alt+o = original poster's name
			if (event.altKey && !event.repeat && (which == 111)) {

				// insert OP's name it into the comment
				if (OP_name) {
					var text = active.value
					active.value = (text.substring(0, active.selectionStart) + OP_e.textContent + text.substring(active.selectionEnd))
				}

			// alt+p = parent poster's name
			} else if (event.altKey && !event.repeat && (which == 112 || which == 114)) {

				if (event.ctrlKey && event.altKey && which == 112) return; // prevent ctrl+alt+p because of reported conflict with Puush

				// find the parent poster's name
				var PP_e = document.querySelector('#comment_form').previousElementSibling.querySelector('.author_name a')

				// if found, insert it into the comment
				if (PP_e) {
					var text = active.value
					active.value = (text.substring(0, active.selectionStart) + PP_e.textContent + text.substring(active.selectionEnd))
				}

			}
		}

	}, true)
	
	// cause replying to auto-focus the comment textbox
	{
		var comment_links = document.querySelectorAll('.reply_link>a')

		function focus_comment_textbox() {
			document.querySelector('#comment_form form textarea').focus()
		}
		function schedule_focus_comment_textbox() {
			if (window.setTimeout) setTimeout(focus_comment_textbox, 1)
		}

		for (var i = 0; i < comment_links.length; i += 1) {
			var e = comment_links[i]
			e.addEventListener("click", schedule_focus_comment_textbox, false)
		}
	}

} catch (e) { console.log(e.name + ': ' + e.message) }

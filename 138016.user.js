// ==UserScript==
// @name        SteamGifts Thanks button & Hider
// @description Edited scripts to my preferences, that you may like
// @updateURL      http://userscripts.org/scripts/source/138016.meta.js
// @downloadURL    https://userscripts.org/scripts/source/138016.user.js
// @include      http://*steamgifts.com/giveaway/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// Change these messages to suit your needs.
var thanks = ["Thanks", "Thank you", "Thanks for this", "Thanks for the giveaway", "Great giveaway, thanks"];
var punc = ["", ".", "!"];
// Stop suiting your needs here.

var cf = document.getElementById("comment_form");
if (cf) {
	cf = cf.getElementsByTagName("form")[0];

	var postBody = cf.elements.body;

	var thx = document.createElement("input");
	thx.type = "submit";
	thx.value = "Thanks";
	thx.addEventListener("click", function(ev) {
		postBody.value = thanks[Math.floor(Math.random() * thanks.length)] + punc[Math.floor(Math.random() * punc.length)];

		// this is stupid
		var s = document.createElement("input");
		s.type = "hidden";
		s.name = "submit_comment";
		s.value = "Submit Comment";
		cf.appendChild(s);
	});

	var p = cf.elements.submit_comment.parentNode;
	p.appendChild(document.createTextNode(" "));
	p.appendChild(thx);
}

var creator_e = $('.hosted_by a')
var creator = creator_e.text().trim()
var creator_url = creator_e.attr('href')

var thankers = []
$('.comment_body:not(.child_container *)').each(function() {
    var b = $(this)
	var text = b.text().toUpperCase().replace(/\:./g, '').replace(/[!.:';)(\s\t^=~,/_]/g, '')//'
	switch (text) {
		case 'THANKYOU':
		case 'THANKYUO':
		case 'THANKYOUMAN':
		case 'THANKYOUSOMUCH':
		case 'THANKYOUVERYMUCH':
		case 'THANX':
		case 'THNX':
		case 'THX':
		case 'THXMAN':
		case 'TNX':
		case 'TANKS':
		case 'TY':
		case 'THANK':
		case 'THANKS':
		case 'THANKSFORSKYRIM':
		case 'THANKSMAN':
		case 'THANKSALOT':
		case 'THANKSFORTHEGIVEAWAY':
		{
			var container = b.parents('.parent_container')
			if (b.find('a').length == 0 && container.find('.child_container').length == 0 && container.find('.edit_comment').length == 0) {
				var author = container.find('.author_name a')
				thankers.push({name:author.text().trim(), url:author.attr('href')})
				
				container.addClass('simple-thank').css({display: 'none'})
			}
			break
		}
	}
})

if (thankers.length > 0) {
	var s = $('<p>').addClass('parent_container')
	.css({
		padding: '1em'
	})
	.prependTo($('.comment_container'))

	for (var i = 0; i < thankers.length; i += 1) {
		if (i > 0) {
			if (i == thankers.length - 1) s.append(' and ')
			else s.append(', ')
		}

		s.append(
			$('<a>')
			.text(thankers[i].name)
			.attr('href', thankers[i].url)
			.css('color', '#4F565A')
		)
	}

	s
	.append(' thanked ')
	.append($('<a>').attr('href', creator_url).text(creator).css('color', '#4F565A'))
	.append(' for creating this giveaway.')
	.append(
		$('<span>')
		.css({
			'font-size': '10px',
			'text-decoration': 'none',
			'margin-left':'1em',
			'color': '#7F868A',
			cursor: 'pointer'
		})
		.attr('href', 'javascript:')
		.text('show all')
		.click(function() {
			$('.simple-thank').css('display', 'block')
			s.remove()
		})
	)
}
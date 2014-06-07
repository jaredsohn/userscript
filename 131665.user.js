// ==UserScript==
// @name           steamgifts.com thank filter for Google Chrome
// @version        1.3
// @description    Removes simple "thank you" comments from steamgifts.com giveaways, giving a special mention for thankers instead. This makes other comments more visible.
// @namespace      http://userscripts.org/users/274735
// @match          http://www.steamgifts.com/giveaway/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
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
}

// load jQuery and execute the main function
addJQuery(main);
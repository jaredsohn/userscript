// ==UserScript==
// @name          VertcoinTipBot Button
// @namespace     http://hamaluik.com/gmscripts
// @version       0.1
// @description   Adds a button on Reddit comments to enable easily tipping that comment using Vertcoins
// @match         http://www.reddit.com/r/*/comments/*
// @copyright     2014 Kenton Hamaluik
// @grant         none
// ==/UserScript==

/********************************************************************************
The MIT License (MIT)

Copyright (c) 2014 Kenton Hamaluik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
********************************************************************************/

window.vtcTipCommand = '+/u/vertcointipbot $numVTC vertcoins';
window.vtcCurrentLink = null;
window.vtcDropdownTimeout = null;

// modified default reply function
window.vtcTipReply = function(a, tipAmount) {
	// hide the drop down
	$('#vtcTipDropdown').css('display', 'none');
	window.vtcDropdownTimeout = null;

	// prompt the user for an amount if thye didn't choose a standard option
	if(tipAmount == '?')
		tipAmount = prompt('How much VTC do you want to tip?', '0.1');

	var b = comment_reply_for_elem(a),
		c = b.find("textarea");

	// insert the tip into the textbox
	c.val(window.vtcTipCommand.replace('$numVTC', tipAmount));

	// continue on as normal
	if (window.getSelection && c.val().length == 0) {
		var e = window.getSelection(),
			i = $(e.focusNode).parents(".md").first(),
			j = $(e.anchorNode).parents(".md").first();
		i.length && i.is(j) && (e = e.toString(), e.length > 0 && (e = e.replace(/^/gm, "> "), c.val(e + "\n\n"), c.scrollTop(c.scrollHeight)))
	}
	show_edit_usertext(b);
	b.show();
	b.find(".cancel").get(0).onclick = function() {
		b.hide()
	};
	$(a).thing().find(".showreplies:visible").click();
	return !1
}

// add html elements to the page
function vtcAddButtons() {
	// add a link with a dropdown menu in the line of links below each comment
	$('.flat-list').each(function() {
		$(this).find('li:last-child').before('<li class="vtcTipLi"><a href="javascript:void(0)" class="vtcTipLink" onclick="return window.vtcTipReply(this, \'?\')">tip VTC</a></li>');
	});

	// when we hover the link, show the dropdown menu
	// the drop-down menu is a single object that goes where
	// it is needed
	$('.vtcTipLi').mouseenter(function() {
		$('#vtcTipDropdown').css('display', 'block');
		$('#vtcTipDropdown').css('position', 'absolute');
		$('#vtcTipDropdown').css('top', $(this).offset().top + $(this).height());
		$('#vtcTipDropdown').css('left', $(this).offset().left);
		$('.vtcTipSubDropdown').css('left', $('#vtcTipDropdown').width());

		// we need to save where we're coming from so the
		// links know which reply box to paste into
		window.vtcCurrentLink = $(this).find('.vtcTipLink');
	});

	// we want the menu to disappear when we stop hovering over it
	// the easiest way to do this is to hack a timeout so that
	// 200 ms after we mouse over, the dropdown becomes invisible
	$('.vtcTipLi').mouseleave(function() {
		window.vtcDropdownTimeout = window.setTimeout(function() {
			$('#vtcTipDropdown').css('display', 'none');
			window.vtcDropdownTimeout = null;
		}, 200);
	});

	// however, we want the user to be able to use the dropdown
	// so if they mouseover it before the 200 ms (defined above)
	// is up, cancel the drop-down hiding
	$('#vtcTipDropdown').mouseenter(function() {
		if(window.vtcDropdownTimeout !== null) {
			window.clearTimeout(window.vtcDropdownTimeout);
			window.vtcDropdownTimeout = null;
		}
	});

	// always hide when we leave the dropdown
	$('#vtcTipDropdown').mouseleave(function() {
		$('#vtcTipDropdown').css('display', 'none');
	});

	// add a tip button beside the "Cancel" button when replying
	$('.usertext-buttons').each(function() {
		if($(this).find('.tipVTCButton').length == 0) {
			$(this).find('.cancel').after('<button class="tipVTCButton" type="button">Tip VTC</button>');
		}
	});

	// add an event handle for the above button
	$('.tipVTCButton').click(function() {
		var tipAmount = prompt('How much VTC do you want to tip?', '0.1');
		var textarea = $(this).closest('.usertext-edit').find('textarea');
		textarea.val(textarea.val() + '\n\n' + window.vtcTipCommand.replace('$numVTC', tipAmount));
	});
}

// spawn the drop-down menu on the page
// it will be hidden by default and get displayed
// and moved around as is needed
function vtcCreateDropdown() {
	$('body').append('\
		<div id="vtcTipDropdown">\
			<ul>\
				<li onclick="return window.vtcTipReply(window.vtcCurrentLink, 0.1)">0.1 VTC</li>\
				<li onclick="return window.vtcTipReply(window.vtcCurrentLink, 0.5)">0.5 VTC</li>\
				<li onclick="return window.vtcTipReply(window.vtcCurrentLink, 1.0)">1.0 VTC</li>\
				<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'?\')">Custom</li>\
				<li>Keywords\
					<ul class="vtcTipSubDropdown">\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'all\')">All</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'upvote\')">Upvote (0.1)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'cookie\')">Cookie (0.33)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'coffee\')">Coffee (1.0)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'nothing\')">Nothing (0.01)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'fart\')">Fart (0.05)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'gum\')">Gum (1.5)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'beer\')">Beer (3.5)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'nicebeer\')">Nicebeer (5.0)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'hug\')">Hug (0.5)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'kiss\')">Kiss (1.0)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'highfive\')">Highfive&nbsp;(0.25)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'nyan\')">Nyan (1.1111)</li>\
					</ul>\
				</li>\
				<li>Random\
					<ul class="vtcTipSubDropdown">\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'flip\')">Flip (min tip * 1..2)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'megaflip\')">Megaflip (min tip * 1..20)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'gigaflip\')">Gigaflip (min tip * 1..200)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'roll\')">Roll (min tip * 1..6)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'megaroll\')">Megaroll (min tip * 1..60)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'gigaroll\')">Gigaroll&nbsp;(min&nbsp;tip&nbsp;*&nbsp;1..600)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random01\')">Random01 (0..0.1)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random05\')">Random05 (0..0.5)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random1\')">Random1 (0..1)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random3\')">Random3 (0..3)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random5\')">Random5 (0..5)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random10\')">Random10 (0..10)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random15\')">Random15 (0..15)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random25\')">Random25 (0..25)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random50\')">Random50 (0..50)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random100\')">Random100 (0..100)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random250\')">Random250 (0..250)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random500\')">Random500 (0..500)</li>\
						<li onclick="return window.vtcTipReply(window.vtcCurrentLink, \'random1000\')">Random1000 (0..1000)</li>\
					</ul>\
				</li>\
			</ul>\
		</div>\
	');
}

// function to add css to the document
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// add our drop-down menu css
addGlobalStyle('\
	#vtcTipDropdown, .vtcTipSubDropdown {\
		display: none;\
		background-color: white;\
		border: 1px solid #006600;\
		border-radius: 2px;\
		cursor: pointer;\
	}\
	\
	#vtcTipDropdown li, .vtcTipSubDropdown li {\
		list-style-type: none;\
		display: block;\
		margin: 0;\
		padding: 0.5em;\
		font-size: 1em;\
	}\
	#vtcTipDropdown li {\
		position: relative;\
	}\
	.vtcTipSubDropdown {\
		position: absolute;\
		top: 0px;\
		left: 75px;\
	}\
	\
	#vtcTipDropdown li:hover .vtcTipSubDropdown {\
		display: block;\
	}\
	\
	#vtcTipDropdown li:hover {\
		background-color: #3f824d;\
		color: #fff;\
	}\
	#vtcTipDropdown li:hover .vtcTipSubDropdown li {\
		background-color: #fff;\
		color: #000;\
	}\
	#vtcTipDropdown li:hover .vtcTipSubDropdown li:hover {\
		background-color: #3f824d;\
		color: #fff;\
	}');

// actually create the dropdown
vtcCreateDropdown();

// and add the buttons and whatnot to the page
vtcAddButtons();
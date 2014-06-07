// ==UserScript==
// @name           Twitter Retweet Button
// @namespace      none
// @description    Adds retweet button next to the actions area of a tweet on Twitter. Period.
// @verion         0.3.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


/* USER SETTINGS */
/**
 * The retweet icon.
 */
var rtIcon = "data:image/gif;base64,R0lGODlhEAAQAKIFAM/Pz9vb2+jo6MXFxcPDw////wAAAAAAACH5BAEAAAUALAAAAAAQABAAAAMmWLrc/rCR6Miky16sdxEB0I0bKJKdYqLpF7IWp2HFTA8eldM8lAAAOw==";
/**
 * Title of the retweet link.
 */
var rtTitle = "retweet this update";
/**
 * The retweet message pattern.
 * %a = author; %m = update message
 * The most used ones are:
 *   RT @%a: %m
 *   %m (via @%a)
 */
var rtPattern = "RT @%a: %m ";

/* MAIN LOOP */
var $ = unsafeWindow.jQuery;

$(".hentry:not(.mine) .actions").livequery(function() {
	if($(this).children("div").size() != 0)
		$this = $(this).children("div");
	else
		$this = $(this);
	var author = $this.parents(".hentry").attr('class').match(/u-([^\s]+)/)[1];
	var content = ($this.is("div"))
		? $this.parents(".hentry").find(".entry-content").text()
		: $this.parents(".hentry").find(".msgtxt").text();
	var href = location.protocol+'//'+location.hostname+'/home?status='+encodeURIComponent(rtPattern.replace(/%a/g, author).replace(/%m/g, content));

	var rtButton = $("<a />")
		.addClass('retweet')
		.attr('href', href)
		.attr('title', rtTitle)
		.html('&nbsp;&nbsp;')
		.click(function()
		{
			/* We're on the main page */
			if($("#status").size() !== 0)
			{
				/* The ".change()" is sort of workaround because ".trigger('update')" didn't seem to work */
				$("#status").val(rtPattern.replace(/%a/g, author).replace(/%m/g, content)).change();
				window.scroll(0, 0);
				return false;
			}
			/* else: Do nothing => go to the home page to change the status */
		});
	$this.append(rtButton);
});

GM_addStyle(".hentry .actions .retweet { background-image: url(" + rtIcon + "); margin-top: -6px; }");
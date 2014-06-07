// ==UserScript==
// @name        QuickTip
// @description  Easy tip script for Reddcoin (RDD)
// @include     http://www.reddit.com/r/*/comments/*
// @include     http://www.twitch.tv/*
// @include		https://twitter.com/*
// @include		http://twitter.com/*
// @version     1.3
// @grant		none
// ==/UserScript==



/**
 * 
 * Changelog
 * 
 * v1.3
 * Twitter support added
 * 
 * v1.2
 * Bug fixes
 * Cleaner code
 * 
 * v1.1
 * Twitch support added
 * 
 * v1
 * Reddit support added
 * 
 */



// REDDIT

// Variables
redditHtml = '<button class="tip" type="button">tip</button>';
redditTipCommand = '+/u/reddtipbot {AMOUNT} RDD';

// Functions
function redditAddTip ()
{
	// What happens when the user clicks the tip button
	$('.tip').click(function(){
		var tipAmount = prompt ('How much do you want to tip?', '100');
		var textarea = $(this).closest('.usertext-edit').find('textarea');
		textarea.val(textarea.val() + '\n\n' + redditTipCommand.replace ('{AMOUNT}', tipAmount));
	});
}

function redditAddButtons ()
{
	// Add buttons for all areas where there should be one
	
	$('.usertext-buttons').each(function(){
		if ($(this).find('.tip').length == 0)
		{
			$(this).find('.cancel').after(redditHtml);
		}
	});
	
	redditAddTip ();
}

function redditAddButtonsOnReply ()
{
	// Add new buttons when the user makes a reply
	
	$('.noncollapsed > .flat-list > li:eq(4)').click(function(){
		redditAddButtons ();
	});
}

function redditInitialize ()
{
	redditAddButtons();
	redditAddButtonsOnReply();
}



// TWITCH

// Variables
twitchHtml = '<button class="button-simple primary tip" style="width: 90px;">Tip</button>';
twitchTipCommand = '@tipreddcoin +tip {RECIPIENT}{AMOUNT} RDD';

// Functions
function twitchAddTip ()
{
	// What happens when the user clicks the tip button
	$('.tip').click(function(){
		var tipRecipient = prompt ('Who do you want to tip? Leave empty to tip the streamer.', '');
		if (tipRecipient.length > 0)
		{
			tipRecipient = '@' + tipRecipient + ' ';
		}
		
		var tipAmount = prompt ('How much do you want to tip?', '100');
		var textArea = $(this).closest('.chat-interface').find('textarea');
		textArea.val(textArea.val() + ' ' + twitchTipCommand.replace('{RECIPIENT}', tipRecipient).replace ('{AMOUNT}', tipAmount));
	});
}

function twitchAddButton ()
{
	// Add a button to the Twitch chat
	$('.send-chat-button').append(twitchHtml);
	$('.send-chat-button .primary:first').width($('.send-chat-button > .primary').width() - 100);
}

function twitchCheckWidth (waitTime)
{
	// Don't start the script until the page has been loaded correctly
	if ($('.send-chat-button .primary:first').width() > 120)
	{
		twitchAddButton();
		twitchAddTip();
	}
	else if (waitTime <= 4096)
	{
		setTimeout(function(){
			twitchCheckWidth(waitTime * 2);
		}, waitTime);
	}
}

function twitchInitialize ()
{
	$(document).ready(function(){
		if ($('.chat-option-buttons').length != 0)
		{
			twitchCheckWidth(16);
		}
	});
}



// TWITTER

// Variables
twitterHtml = '<button class="btn primary-btn tip-action tip-btn js-tip-btn" type="button">\
	<span class="button-text tip-text">\
		Tip\
	</span>\
</button>';
twitterMessageTipCommand = '+tip @{RECIPIENT} {AMOUNT} RDD';
twitterTweetTipCommand = ' @tipreddcoin +tip @{RECIPIENT} {AMOUNT} RDD';

// Functions
function twitterCheckJquery (waitTime)
{
	if (typeof window.jQuery !== 'undefined')
	{
		twitterAddButtons ();
	}
	else if (waitTime <= 4096)
	{
		setTimeout(function(){
			twitterCheckJquery(waitTime * 2);
		}, waitTime);
	}
	else
	{
		var jQueryHtml = document.createElement('script');
		jQueryHtml.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js')
		document.getElementsByTagName('head')[0].appendChild(jQueryHtml)
		twitterAddButtons ();
	}
}

function twitterTip (button)
{
	//var tipMessage = confirm ('Press OK if you are sending this in a message to @tipreddcoin. If this is a tweet and not a message, do NOT click OK.')
	var tipMessage = button.closest('.tweet-button').find('.tweet-btn').find('.messaging-text').is(':visible');
	var tipRecipient = prompt ('Who do you want to tip?', '');
	var tipAmount = prompt ('How much do you want to tip?', '100');
	var textArea = button.closest('form').find('.tweet-box');
	textArea.text(textArea.text() + ((tipMessage) ? twitterMessageTipCommand : twitterTweetTipCommand).replace('{RECIPIENT}', tipRecipient).replace ('{AMOUNT}', tipAmount));
}

function twitterFixButtons ()
{
	jQuery('.tip-btn').off('click').click(function(){
		twitterTip ($(this));
	});
}

function twitterAddButtons ()
{
	// Add buttons to tweets
	jQuery('.tweet-button').append(twitterHtml);
	jQuery('.tip-btn').height(38);
	
	// Now fix the height of the buttons and fix the onclick function (add tip)
	twitterFixButtons ();
	
	// The onClick needs to be reapplied sometimes (ugly fix but it works) :(
	$(document).mouseup(function(){
		twitterFixButtons ();
	});
}

function twitterInitialize ()
{
	// BETA
	twitterCheckJquery (16);
}



// OTHER SITES (Facebook? Youtube? Disqus?)



// Initialize
if (document.domain == 'www.reddit.com' || document.domain == 'reddit.com')
{
	// Initialize Reddit
	redditInitialize ();
}
else if (document.domain == 'www.twitch.tv' || document.domain == 'twitch.tv')
{
	// Initialize Twitch
	twitchInitialize ();
}
else if (document.domain == 'www.twitter.com' || document.domain == 'twitter.com')
{
	twitterInitialize ();
}

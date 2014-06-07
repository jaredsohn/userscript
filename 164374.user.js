// ==UserScript==
// @name           PostTwo's & 1RV34's Funnyjunk Tool
// @description    Provides some additional features, i.a. buttons to thumb and reply.
// @author         posttwo (Post15951)
// @author         irvea (1RV34)
// @include        *funnyjunk.com*
// @version        6.5
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js

// ==/UserScript==
/*

        Changelog

        6.5     [*] Updating...

        4.5     [*] ENOUGH OF THIS SHIT - UNBAN IRVEA

        4.2
        		[*] Added flag button

        4.1
                [*] Optimized code for user and anon specific thumbing
                [*] Corrected the prompt for user specific thumbing

        4.0
                [*] More user friendly prompt for username
                [*] You can now hide the logo by changing the dontDisplayLogo variable below

                [+] Hotkey (Ctrl + R) for our Reply function

        3.2
                [*] Rewrite of script

        3.1
                [+] Anon thumbing

        3.0 - 1RV34 joined the production
                [+] User specific thumbing

*/

$(document).ready(function ()
{
	// I see you checked the code! You may now change the following variable to true.

	var dontDisplayLogo = false; // Change this to true to hide the logo

	// Remove Thumbs

	$("<a>",
	{
		"class": "wheatButton",
		text: "Remove Thumbs \xa0 \xa0 \xa0 \xa0 \xa0 \xa0",
		onclick: '$("a.thUp_i").click();$("a.thDn_i").click()',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 309px;"
	}).appendTo("body");

	// Thumbs Up

	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Thumbs Up \xa0 \xa0 \xa0 \xa0 \xa0 \xa0",
		onclick: '$("a.thUp").click()',
		value: "up",
		type: "button",
		style: "position: fixed; top: 40px; right: 193px;"
	}).appendTo("body");

	// Thumbs Down

	$("<a>",
	{
		"class": "pinkButton",
		text: "Thumbs Down \xa0 \xa0 \xa0 \xa0 \xa0 \xa0",
		onclick: '$("a.thDn").click()',
		value: "Thumbs Down",
		type: "button",
		style: "position: fixed; top: 40px; right: 60px;"
	}).appendTo("body");

	// Reply

	$("<a>",
	{
		"class": "skyblueButton",
		text: "Reply",
		onclick: 'comments.reply(currentCommentId,contentId,this,3918937,"Deleted Comment",0)',
		value: "Reply",
		type: "button",
		style: "position: fixed; top: 40px; right: 15px;"
	}).appendTo("body");

	//Flag
	$("<a>",
	{
		"class": "skyblueButton",
		text: "Flag",
		onclick: ' dialog.flagCommentPicture(currentCommentId,contentId)',
		value: "Flag",
		type: "button",
		style: "position: fixed; top: 40px; right: 456px;"
	}).appendTo("body");
	// Reply hotkey (Ctrl + R)

	$("body").keydown(function (event)
	{
		if (event.keyCode == 82 &&
			event.ctrlKey) // Ctrl + R
		{
			event.preventDefault(); // Prevents the browser to reload the page, the default behavior of Ctrl + R
			unsafeWindow.comments.reply(unsafeWindow.currentCommentId, unsafeWindow.contentId, unsafeWindow.this, 3918937, "somebody", 0); // Use unsafeWindow to break into the browser's window object. This will cause the script to be marked as having full access to the webpage tho.
		}
	});

	// This was moved, look at the variable at the top of this script
	if (!dontDisplayLogo)
	{
		$("<img>",
		{
			src: "http://fjscripts.uphero.com/logo.png",
			style: "position: fixed; top: 40px; left: 0px;"
		}).appendTo("body");
	}

	// Added by irvea:

	// yeah it's overkill, deal with it
	// I'll shorten it some time soon

	// User Remove Thumbs

	$("<a>",
	{
		"class": "yellowButton",
		text: "U",
		onclick: 'var userToThumb=prompt("Please type the username of the user you wish to remove thumbs from.");if(userToThumb){var uName=$(".uName:contains("+userToThumb+")");var uComments=uName.parent(".com").children(".r").children(".cmn_thumb");var uReplies=uName.parent().parent(".com").children(".response").children(".r").children(".cmn_thumb");uComments.children(".thUp_i").parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});uReplies.children(".thUp_i").parent().parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});uComments.children(".thDn_i").parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});uReplies.children(".thDn_i").parent().parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});}',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 329px;"
	}).appendTo("body");

	// User Thumbs Up

	$("<a>",
	{
		"class": "yellowButton",
		text: "U",
		onclick: 'var userToThumbUp=prompt("Please type the username of the user you wish to thumb up.");if(userToThumbUp){var uName=$(".uName:contains("+userToThumbUp+")");uName.parent(".com").children(".r").children(".cmn_thumb").children(".thUp").parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});uName.parent().parent(".com").children(".response").children(".r").children(".cmn_thumb").children(".thUp").parent().parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});}',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 213px;"
	}).appendTo("body");

	// User Thumbs Down

	$("<a>",
	{
		"class": "yellowButton",
		text: "U",
		onclick: 'var userToThumbDown=prompt("Please type the username of the user you wish to thumb down.");if(userToThumbDown){var uName=$(".uName:contains("+userToThumbDown+")");uName.parent(".com").children(".r").children(".cmn_thumb").children(".thDn").parent().parent().parent().each(function(){comments.thumbsVote("down",$(this).attr("id").replace("cc",""));});uName.parent().parent(".com").children(".response").children(".r").children(".cmn_thumb").children(".thDn").parent().parent().parent().parent().each(function(){comments.thumbsVote("down",$(this).attr("id").replace("cc",""));});}',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 80px;"
	}).appendTo("body");

	// Anon Remove Thumbs

	$("<a>",
	{
		"class": "yellowButton",
		text: "A",
		onclick: 'var date=$(".date").find("i:contains("+ANON_LABEL+")").parent();var aComments=date.parent(".com").children(".r").children(".cmn_thumb");var aReplies=date.parent().children(".r").children(".cmn_thumb");aComments.children(".thUp_i").parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});aReplies.children(".thUp_i").parent().parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});aComments.children(".thDn_i").parent().parent().parent().each(function(){comments.thumbsVote("down",$(this).attr("id").replace("cc",""));});aReplies.children(".thDn_i").parent().parent().parent().parent().each(function(){comments.thumbsVote("down",$(this).attr("id").replace("cc",""));});',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 309px;"
	}).appendTo("body");

	// Anon Thumbs Up

	$("<a>",
	{
		"class": "yellowButton",
		text: "A",
		onclick: 'var date=$(".date").find("i:contains("+ANON_LABEL+")").parent();date.parent(".com").children(".r").children(".cmn_thumb").children(".thUp").parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});date.parent().children(".r").children(".cmn_thumb").children(".thUp").parent().parent().parent().parent().each(function(){comments.thumbsVote("up",$(this).attr("id").replace("cc",""));});',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 193px;"
	}).appendTo("body");

	// Anon Thumbs Down

	$("<a>",
	{
		"class": "yellowButton",
		text: "A",
		onclick: 'var date=$(".date").find("i:contains("+ANON_LABEL+")").parent();date.parent(".com").children(".r").children(".cmn_thumb").children(".thDn").parent().parent().parent().each(function(){comments.thumbsVote("down",$(this).attr("id").replace("cc",""));});date.parent().children(".r").children(".cmn_thumb").children(".thDn").parent().parent().parent().parent().each(function(){comments.thumbsVote("down",$(this).attr("id").replace("cc",""));});',
		value: "re!",
		type: "button",
		style: "position: fixed; top: 40px; right: 60px;"
	}).appendTo("body");
});
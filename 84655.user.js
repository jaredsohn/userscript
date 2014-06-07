// See http://earthgaming.com/?page_id=152 for more details.
// 
// ==UserScript==
// @name           Reddit Top Comments Sidebar
// @namespace      http://www.earthgaming.com/
// @description    Display the top comments for a post based on points in a sidebar.
// @include        *reddit.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright      2010+, Kris Arndt (http://www.earthgaming.com/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author         Kris Arndt
// @created        2010-08-27
// @revised        2010-08-27
// @version        0.5.0
// ==/UserScript==
//
// Changelog:
//
// 2010-08-27  Version 0.5.0
//   - Script created.
//

/****************************************************************************/

var RTC_SETTING_TOP_COMMENT_AMOUNT = 10;
var RTC_SETTING_SCROLL_TO_COMMENT_TIME = 500;  // In milliseconds.
var RTC_SETTING_COMMENT_BLURB_SIZE = 100;  // In characters.

var rtcTopComments = new Array ();
var rtcTopCommentCount = RTC_SETTING_TOP_COMMENT_AMOUNT;

/****************************************************************************/

window.redditTopCommentMore = function()
{
	rtcTopCommentCount += 10;
	
	var i = 0;
	$("div.rtc-top-comments div.reddit-link").each (function()
	{
		if (i++ >= rtcTopCommentCount)
			return false;
		$(this).show ();
	});
	
	if (i == rtcTopComments.length)
		$(".rtc-more-link").hide ();
	
	return false;
}

/****************************************************************************/

window.redditTopCommentLinkClick = function()
{
	return window.redditTopCommentScrollTo ($(this).attr("gotoDiv"));
}

/****************************************************************************/

window.redditTopCommentBackClick = function()
{
	return window.redditTopCommentScrollTo ($(this).attr("gotoDiv"));
}

/****************************************************************************/

window.redditTopCommentScrollTo = function(id)
{
	var target = $('.' + id);
	if (target.length)
	{
		var top = target.offset().top;
		$('html,body').animate({scrollTop: top}, RTC_SETTING_SCROLL_TO_COMMENT_TIME);
	}

	return false;
}

/****************************************************************************/

if ($("div.side").get(0))
{
	var i = 0;
	
	$("div.sitetable div.entry div.noncollapsed p.tagline span.unvoted").each (function() 
	{
		var points = $(this).html();
		if (!points)
			return true;
		
		points = points.replace (" points", "");
		
		var id = "rtc-top-comment-" + i;
		var comment = $(this).parent().parent().find("form.usertext div.usertext-body div.md").html();
		var author = $(this).parent().find("a.author").html();
		
		// Insert click back links to get back to the top comments sidebar.
//		$(this).parent().parent().find("ul.flat-list li:nth-child(2)").parent().append (
		$(this).parent().parent().find("ul.flat-list").append (
			'<li><a href="#" gotoDiv="' + id + '-div" class="rtc-top-comment-div-links">top comments</a></li>');
		
		// Strip the HTML.
		comment = comment.replace (/<Sbr[^>]*>/g, "\n");
		comment = comment.replace (/<\S\/p[^>]*>/g, "<\\p>\n\n");
		comment = comment.replace (/<\S[^><]*>/g, "");
		comment = comment.substring (0, RTC_SETTING_COMMENT_BLURB_SIZE);
		comment = comment.replace ("\n", "<br />");
		comment += "<br />";

		// Add a class for reference later.
//		$(this).parent().parent().attr ("id", id);
		$(this).parent().parent().addClass (id);
		
		rtcTopComments[i] = [parseInt(points), comment, id, author];
		
		i++;
	});
	
	rtcTopComments.sort (function(a,b) 
	{
		return (a[0] < b[0]);
	});

	var s = "";
	
//	alert (rtcTopComments.length);
	for (i = 0; i < rtcTopComments.length; i++)
	{
		var id = rtcTopComments[i][2];

		var hide = (i > rtcTopCommentCount)? ' style="display: none;"' : '';
		
//		alert (rtcTopComments[i][0]);
		s += 
		'						<div class="reddit-link even first-half thing ' + id + '-div" ' + hide + '>' +
	//	'							<div class="midcol unvoted">' +
	//	'								<div class="arrow up" onclick="$(this).vote(\'53f29b5e005cf170f98604a2922292ea361ffd5f\', null, event)"></div>' +
	//	'								<div class="arrow down" onclick="$(this).vote(\'53f29b5e005cf170f98604a2922292ea361ffd5f\', null, event)"></div>' +
	//	'							</div>' +
		'							<div class="reddit-entry entry unvoted">' +
		'								<a href="#" gotoDiv="' + id + '" class="rtc-top-comment-links">' + 
		rtcTopComments[i][3] + ":<br />" + rtcTopComments[i][1] + '</a>' +
		'								<small><span class="score unvoted">' + rtcTopComments[i][0] + ' points</span></small>' +
		'							</div>' +
		'							<div class="reddit-link-end"><!--IE6sux--></div>' +
		'						</div>';
	}

	$("div.side").append (
	'<div class="spacer">' +
	'	<div class="sidecontentbox rtc-top-comments">' +
	'		<h1>TOP COMMENTS</h1>' +
	'		<div class="content">' +
	'			<div class="gadget">' +
	'				<div class="click-gadget">' +
	'					<div>' + s +
	'					<div class="right"><a href="#" class="rtc-more-link">more</a></div>' +
	'					</div>' +
	'				</div>' +
	'			</div>' +
	'		</div>' +
	'	</div>' +
	'</div>');
	
	$(".rtc-top-comment-links").click (redditTopCommentLinkClick);
	$(".rtc-top-comment-div-links").click (redditTopCommentBackClick);
	$(".rtc-more-link").click (redditTopCommentMore);
}

/****************************************************************************/

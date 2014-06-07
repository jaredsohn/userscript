// ==UserScript==
// @name           Twitter/Facebook sharing for Reddit
// @namespace      http://reddit.com/
// @description    Adds twitter and facebook links to the "share" menu
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

/*
see http://www.reddit.com/r/ideasfortheadmins/comments/atisr/retweet_button_for_reddit_posts/
for details
*/

$ = unsafeWindow.jQuery;
$(function(){
	var shortUrl = $('.reddit-link-title').attr('href');
	var docTitle = $('.reddit-link-title').html();
	var tweet = docTitle+' - '+shortUrl+' (via @reddit)';
	var fbUrl = 'http://facebook.com/sharer.php?u='+shortUrl;
	var shareStr = '<tr class=""><th><label for="share_to_">share on</label></th><td colspan="2"><a href="http://twitter.com/?status='+ escape(tweet) +'" target="_blank">twitter</a> or <a href="'+fbUrl+'" target="_blank">facebook</a></td></tr>';
	$('.sharetable').prepend( shareStr );
});
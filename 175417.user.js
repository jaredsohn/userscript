// ==UserScript==
// @name            Hack Forums Add 10 stars
// @namespace       Snorlax
// @description		Installing this will give you 10 stars, like you have 25000 posts
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include			*hackforums.net/showthread.php?tid=*
// @run-at          document-end
// @grant           metadata
// @version         1.0
// ==/UserScript==

var uid = $("#panel").find('a').attr('href').replace(/[^0-9]/g, '');
$('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author').find(".smalltext > img:not(:last)").remove();
for(i=0;i<10;i++){
    $('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first)').parentsUntil('tbody').find('.post_author').find(".smalltext > br:not(':first')").before("<img src='http://x.hackforums.net/images/blackreign/star.gif' />");
}
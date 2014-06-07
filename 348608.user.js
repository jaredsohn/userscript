// ==UserScript==
// @name        Preview | Accept
// @author              Kerek
// @version             0.1
// @description         Splits Preview link into Preview | Accept links.
// @include             https://www.mturk.com/mturk/findhits*
// @include             https://www.mturk.com/mturk/preview*
// @include             https://www.mturk.com/mturk/searchbar*
// @include             https://www.mturk.com/mturk/sorthits*
// @include             https://www.mturk.com/mturk/sortsearchbar*
// @include             https://www.mturk.com/mturk/viewhits*
// @include             https://www.mturk.com/mturk/viewsearchbar*
// ==/UserScript==

$(document).ready(function()
{
    $preview_links = $("a[href^='/mturk/preview?']");
	$preview_links.each(function()
    {
        var preview_link=$(this).attr('href').replace("preview?", "previewandaccept?");
		var link_html = "<a href='" + preview_link + "'>Accept</a>";
		$(this).parent().append (" | " + link_html);
        $(this).html($(this).html().replace(/View a HIT in this group/g, 'Preview'));
        
    });
});
// ==UserScript==
// @name        The Kickass Torrents Cleaner
// @description Currently cleans up Kickass.to to make it more aesthetically usuable. If more features are required, you find a bug/fix then please comment!
// @namespace   https://userscripts.org/users/boku/182931
// @updateURL   https://userscripts.org/scripts/source/182931.meta.js
// @downloadURL https://userscripts.org/scripts/source/182931.user.js
// @include     *kickass.to*
// @license 	The Kickass Torrents Cleaner is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// @version     1.0
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==
$(".headmenu ul").remove();
$('#tagcloud').remove();
$('a[title$="hide tagcloud"]').remove();
$('.sidebarCell').remove();
$('#feedback').remove();
$('footer ul').remove();
$('div[class$="sharingWidgetBox"]').remove();
$('div[class$="floatleft"]').remove();
$('h2').each(function() {
    if($(this).text().match(/Related Torrents|Sharing Widget|Online Friends/g)){
		$(this).remove();
	}
});
$('#tab-main .buttonsline').remove();
$('#tab-main table[class$="data"]').remove();
$('.rsssign').remove();
$('.tabNavigation a[href*="friends"]').remove();
$('.tabNavigation a[href*="blog"]').remove();
$('.tabNavigation a[href*="threads"]').remove();
$('.tabNavigation a[href*="comment"]').remove();
$('a[href*="bookmarks"]').remove();
$('.icomment').remove();
$('.partner1Button').remove();
$('.doublecelltable .botmarg10px').remove();
$('.doublecelltable .comments').remove();
$('#desc img').remove();
$('#desc br').replaceWith('<div>');
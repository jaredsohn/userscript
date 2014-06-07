// ==UserScript==
// @name            Hack Forums Imgur Album Inline
// @namespace       Snorlax
// @description     Embeds Imgur albums right into the page
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php*
// @include			*hackforums.net/private.php*
// @version         1.0
// ==/UserScript==


$("a[href*='imgur.com/a']").not("blockquote > a").each(function(){
    url = $(this).attr('href');
    regex = url.match(/a\/(.*?)[#]?[0-9]*$/);
    $(this).after('<iframe class="imgur-album" width="100%" height="550" frameborder="0" src="http://imgur.com/a/' + regex[1] + '/embed"></iframe>');
});
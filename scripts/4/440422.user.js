// ==UserScript==
// @name        mmmturkeybacon April Fools
// @author      mmmturkeybacon
// @description Changes all of the avatars on mturkgrind.com to robots.
// @namespace   http://userscripts.org/users/523367
// @match       http://www.mturkgrind.com/threads/*
// @match       http://www.mturkgrind.com/showthread.php?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/440422.user.js
// @updateURL   http://userscripts.org/scripts/source/440422.meta.js
// @version     1.11
// @grant       none
// ==/UserScript==

$(document).ready(function()
{
/*
    $('img[src^="customavatars"]').each(function()
    {
        $(this).remove();
    });
*/
    $('img[src^="customavatars"]').remove();

    $('a[id][title][href^="member.php"]').each(function()
    {
        var new_avatar = 'http://robohash.org/'+$(this).text()+'png?size=100x100';
        $(this).parent().parent().next().after('<a class="postuseravatar"><img src="'+new_avatar+'"></a>');
    });

});

// ==UserScript==
// @name        Halo4 SpoilerFree
// @namespace   HaloWaypointURLReplace
// @description Stay spoiler free for Halo 4.
// @include     https://forums.halowaypoint.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1.1
// ==/UserScript==
(function() {
    $('#ctl00_MainContent_forum_ctl03_ForumCategoryList_UpdatePanelCategory').find('tr').each(function() {
        if ($(this).find('.subforumheading').text().search('Halo 4') != -1)
            $(this).hide();
    });
})();
(function() {
    $('#ctl00_MainContent_forum_ctl03_ForumCategoryList_UpdatePanelCategory').find('tr').each(function() {
        if ($(this).find('.subforumheading').text().search('Halo Universe') != -1)
            $(this).hide();
    });
})();
// ==UserScript==
// @name        Header hacks
// @namespace   https://userscripts.org/users/600032
// @description What-x Header customization
// @grant       GM_getValue
// @grant       GM_setValue
// @include     http*://what.cd/*
// @version     0.3 alpha
// ==/UserScript==

//alert($().jquery);
//This will be updated so that GM_setValue will not be pointless

var $ = unsafeWindow.jQuery;

//Menu
//
//
//-------------------------------------------------~

//Home
GM_setValue('remove_home_menu', true);
//GM_setValue('remove_home_menu_menu', false);

//Torrents
//GM_setValue('remove_torrents_menu', true);
GM_setValue('remove_torrents_menu', false);

//Collages (see collages in searchbar)
GM_setValue('remove_collages_menu', true);
//GM_setValue('remove_collages_menu', false);

//Requests
//GM_setValue('remove_requests_menu', true);
GM_setValue('remove_requests_menu', false);

//Forums
//GM_setValue('remove_forums_menu', true);
GM_setValue('remove_forums_menu', false);

//IRC
GM_setValue('remove_irc_menu', true);
//GM_setValue('remove_irc_menu', false);

//Top 10
//GM_setValue('remove_top10_menu', true);
GM_setValue('remove_top10_menu', false);

//Rules
//GM_setValue('remove_rules_menu', true);
GM_setValue('remove_rules_menu', false);

//Wiki
GM_setValue('remove_wiki_menu', true);
//GM_setValue('remove_wiki_menu', false);

//Staff
GM_setValue('remove_staff', true);
//GM_setValue('remove_staff', false);

//Searchbar
//
//
//-------------------------------------------------~

//Torrents
//GM_setValue('remove_torrent_search', true);
GM_setValue('remove_torrent_search', false);

//Artists
//GM_setValue('remove_artist_search', true);
GM_setValue('remove_artist_search', false);

//Requests
GM_setValue('remove_request_search', true);
//GM_setValue('remove_request_search', false);

//Forums
//GM_setValue('remove_forum_search', true);
GM_setValue('remove_forum_search', false);

//Log
GM_setValue('remove_log_search', true);
//GM_setValue('remove_log_search', false);

//Users
GM_setValue('remove_user_search', true);
//GM_setValue('remove_user_search', false);

//Collage search
GM_setValue('enable_collage_search', true);
//GM_setValue('enable_collage_search', false);
GM_setValue('collage_search_offset_from_right', 1); //Use this to set location
                                    //of box in relation to other items in searchbar
                                    //note: first box = 0

                                    
//Removes

//Menu
//Remove home
if (GM_getValue('remove_home_menu', true) == true) {
    $('#nav_index').remove();
}
//Remove torrents
if (GM_getValue('remove_torrents_menu', true) == true) {
    $('#nav_').remove();
}
//Remove collages
if (GM_getValue('remove_collages_menu', true) == true) {
    $('#nav_collages').remove();
}
//Remove requests
if (GM_getValue('remove_requests_menu', true) == true) {
    $('#nav_requests').remove();
}
//Remove forums
if (GM_getValue('remove_forums_menu', true) == true) {
    $('#nav_forums').remove();
}
//Remove IRC
if (GM_getValue('remove_irc_menu', true) == true) {
    $('#nav_irc').remove();
}
//Remove top 10
if (GM_getValue('remove_top10_menu', true) == true) {
    $('#nav_top10').remove();
}
//Remove rules
if (GM_getValue('remove_rules_menu', true) == true) {
    $('#nav_rules').remove();
}
//Remove wiki
if (GM_getValue('remove_wiki_menu', true) == true) {
    $('#nav_wiki').remove();
}
//Remove staff
if (GM_getValue('remove_staff', true) == true) {
    $('#nav_staff').remove();
}

//Searchbars
//Remove 
if (GM_getValue('remove_torrent_search', true) == true) {
    $('#searchbar_torrents').remove();
}
//Remove artists
if (GM_getValue('remove_artist_search', true) == true) {
    $('#searchbar_artists').remove();
}
//Remove requests
if (GM_getValue('remove_request_search', true) == true) {
    $('#searchbar_requests').remove();
}
//Remove forums
if (GM_getValue('remove_forum_search', true) == true) {
    $('#searchbar_forums').remove();
}
//Remove logs
if (GM_getValue('remove_log_search', true) == true) {
    $('#searchbar_log').remove();
}
//Remove Users
if (GM_getValue('remove_user_search', true) == true) {
    $('#searchbar_').remove();
}

if(GM_getValue('enable_collage_search', true) == true) { $('#searchbars ul li:eq('+GM_getValue('collage_search_offset_from_right', 1).toString()+')').after('<li id="searchbar_collages"> '
            + '<span class="hidden">Collages: </span>'
            + '<form class="search_form" name="collages" action="collages.php" method="get">'
            + '<input value="search" type="hidden" name="action" />'
            + '<input id="collagesearch"'
                + 'value="Collages" placeholder="Collages" type="text" name="search" size="17" />'
            + '</form>'
            + '</li>');

$('#collagesearch').focus(function() {
    if ($(this).val() == 'Collages') { $(this).val(''); }
});
$('#collagesearch').blur(function() {
    if ($(this).val() == '') { $(this).val('Collages'); }
});
}

//I've been a baaad boy
$('div > a[href="rules.php?p=ratio"]').parent().remove();
// ==UserScript==
// @name        AnimeUltima Remove Comments from videos
// @namespace   http://myanimelist.net/profile/Kingorgg
// @description Removes Comments from anime ultima
// @match http://www.animeultima.tv/*
// @version     1
// ==/UserScript==

GM_addStyle ( "                                     \
    .comment-item, #commentform { display:none !important; }                                               \
" ); 
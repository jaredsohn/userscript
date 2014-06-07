// ==UserScript==
// @name        YouTube XL
// @description YouTube's "large mode" fills the whole window
// @namespace   me.bck.userscripts.youtubexl
// @include     https://www.youtube.com/watch*
// @include     http://www.youtube.com/watch*
// @version     0.3
// ==/UserScript==



var ytxl_div = document.createElement('style');



ytxl_div.innerHTML = '                       \
                                             \
    .watch-medium #player-api ,              \
    .watch-large  #player-api                \
    {                                        \
        position: fixed        !important;   \
        left:     0px          !important;   \
        top:      0px          !important;   \
        width:    100%         !important;   \
        height:   100%         !important;   \
        z-index:  999999999999 !important;   \
    }                                        \
                                             \
    #watch7-container.watch-wide             \
    {                                        \
        position: fixed !important;          \
    }                                        '



document.body.appendChild(ytxl_div);

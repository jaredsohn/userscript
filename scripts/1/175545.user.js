// ==UserScript==
// @name        GOG Gamecard Cleaner
// @namespace   gog_game
// @description Rearranges and widens the game overview in gamecard on GOG.com.
// @include     http://www.gog.com/game/*
// @include     https://secure.gog.com/game/*
// @include     http://www.gog.com/*/game/*
// @include     https://secure.gog.com/*/game/*
// @version     1.0
// ==/UserScript==

// CSS to stetch the overview div and to maintain the youtube iframe sizes.
$('<style>').attr("type", "text/css").appendTo($("head")).text("\
    div.module.overview {\n\
        width: 953px !important;\n\
    }\n\
    div.iframe-youtube {\n\
        width: 640px;\n\
        height: 390px;\n\
        padding-bottom: 0px;\n\
        margin-left: 135px;\n\
    }\n\
    div.iframe-youtube iframe {\n\
        width: 640px;\n\
        height: 390px;\n\
    }\n"
);

// Move the overview div on top of the left column.
$('div.column-left').before($('div.overview'));

// ==UserScript==
// @name           Digg Story Page Widener
// @namespace      Your Mom
// @description    Makes the story details page wider. Removes the sidebar on the page as well as the ad.
// @include        http://digg.com/baseball/*
// @include        http://digg.com/extreme_sports/*
// @include        http://digg.com/movies/*
// @include        http://digg.com/gaming_news/*
// @include        http://digg.com/health/*
// @include        http://digg.com/comedy/*
// @include        http://digg.com/world_news/*
// @include        http://digg.com/xbox/*
// @include        http://digg.com/playable_web_games/*
// @include        http://digg.com/general_sciences/*
// @include        http://digg.com/space/*
// @include        http://digg.com/gadgets/*
// @include        http://digg.com/political_opinion/*
// @include        http://digg.com/tech_news/*
// @include        http://digg.com/pc_games/*
// @include        http://digg.com/olympics/*
// @include        http://digg.com/2008_us_elections/*
// @include        http://digg.com/environment/*
// @include        http://digg.com/politics/*
// @include        http://digg.com/travel_places/*
// @include        http://digg.com/music/*
// @include        http://digg.com/playstation/*
// @include        http://digg.com/people/*
// @include        http://digg.com/football/*
// @include        http://digg.com/odd_stuff/*
// @include        http://digg.com/autos/*
// @include        http://digg.com/other_sports/*
// @include        http://digg.com/nintendo/*
// @include        http://digg.com/linux_unix/*
// @include        http://digg.com/television/*
// @include        http://digg.com/business_finance/*
// @include        http://digg.com/comics_animation/*
// @include        http://digg.com/security/*
// @include        http://digg.com/arts_culture/*
// @include        http://digg.com/software/*
// @include        http://digg.com/apple/*
// @include        http://digg.com/pets_animals/*
// @include        http://digg.com/food_drink/*
// @include        http://digg.com/microsoft/*
// @include        http://digg.com/basketball/*
// @include        http://digg.com/educational/*
// @include        http://digg.com/celebrity/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.main {width:100% !important;} .sidebar {display:none !important;}');
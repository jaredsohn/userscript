// ==UserScript==
// @name           Pandora - Remove Ads and Center Player
// @author         Jeff Dorenbush jdorenbush@gmail.com
// @description    This removes the ads on Pandora.com. It also centers the player, adds rounded corners, adjust the footer postion/size and stops the footer link colors from changing to match the color of ads, and uses a solid background.
// @include        http://www.pandora.com/*
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

addGlobalStyle('#enhanced_skin_container,#skinSponsorImage,#promotional_ticker_container,#advertisement,.advertisement_double_wide,.advertisement_double_wide_short #google_adwords,#google_companion_ad_div_container,#leaderboard_container, #bottom_leaderboard_container{display: none!important; visibility: hidden!important}body {background:#e9eef1 none}html,body,div,h1,h2,h3,h4,h5,h6,p,em,span{font-family: Helvetica, Arial, sans-serif!important}#container {background-image:none; height:auto}.tuner #content { background:#fff url(http://img140.imageshack.us/img140/3540/pandoratop.png) no-repeat center top;border:1px solid #ccc; border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px;margin:50px auto;position:static; padding-top:4px;width:640px;}.tuner #footer {margin:5px 50px; width:auto}.tuner #footer a {color: #888!important;}.tuner #footer a:hover {color: #DDD!important;}#container_a, #container_c, #logo_div, #top_left, #top_right, #bottom, #footer {background:#fff none;}#container_c {top:80px;width:100%}#logo_div {top:5px}#search_box, #nav_community {top:45px}#logo, #powered {visibility:hidden}#bottom #footer {margin-left:265px;padding:15px 0;width:auto;}');

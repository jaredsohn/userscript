// ==UserScript==
// @name           TF2Center Profile Enhancer
// @version        1.0
// @description    Adds some extras to TF2Center profiles
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include        http*://rc.tf2center.com/profile/*
// @include        http*://tf2center.com/profile/*
// ==/UserScript==

(function(){
    
    //Steam ID from profile URL
    var steam_id = window.location.href.slice(-17);
    
    //Gets correct div, whoever wrote this website did a shit job at naming classes
    var log_block = $('div.ym-g1220-4.ym-gl').not('.logoTop, .playerTopMenu, .userProfileText, .footerLogo, .footerPlayer, .footerSupport');
    var ss_profile_html = "<div class='userProfileLink ym-clearfix'><a href='http://sizzlingstats.com/player/$ID'><img src='http://i.imgur.com/TNd9nTd.png' width='94' height='41' alt=''/><span>SizzlingStats</span></a></div>".replace('$ID',steam_id);
    
    //Appends the added link to the profile
    var ss = $(ss_profile_html);
    log_block.append(ss);
    
})();
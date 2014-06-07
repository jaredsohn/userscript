// ==UserScript==
// @name       TinyPaste hack
// @namespace  hchost.blogspot.com
// @version    0.1
// @description  Retira senha de posts bloqueados
// @match      http://tny.cz/*
// @include    http://tny.cz/*
// @copyright  2013+, Guilherme Mauro
// ==/UserScript==


if (document.getElementById("pasteFrame").src != null) {
    document.getElementById('promo-followshows').style.display = 'none';
    document.getElementById('promo-overlay').style.display = 'none';
    document.getElementById('bsap_1278060').style.display = 'none';
    document.getElementById('google_ads_div_MYB_TP_728x90_ROS_ad_container').style.display = 'none';
    
    
    
} else {}
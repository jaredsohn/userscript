// ==UserScript==
// @name           arseblog oleole remover
// @namespace      arseblog-oleole
// @description    Removing the oleole stuff from arseblog
// @include        http://www.oleole.com/*
// ==/UserScript==
GM_addStyle("#header_nav { background: none !important; width: auto !important; position:absolute; top: 75px; margin-left: 50px;");
GM_addStyle("#oleole_blog_footer { display: none !important; }");
GM_addStyle("#sso { display: none !important; }");
GM_addStyle("#header_bc { display: none !important; }");
GM_addStyle(".loginbox { display: none !important; }");
GM_addStyle("#oleole_blogheader_fav { display: none !important; }");
GM_addStyle("#reasons_to_join { display: none !important; }");
GM_addStyle(".ad_lb { display: none !important; }");
GM_addStyle("#blog_leaderboard { display: none !important; }");
GM_addStyle("#text_ad { display: none !important; }");
GM_addStyle("#square_ad { display: none !important; }");
GM_addStyle("#rtj { display: none !important; }");
GM_addStyle("#blog_skyscraper { display: none !important; }");


// Let's insert our favorite tag-line back into the page
newElement = document.getElementById('header_nav');
newElement.innerHTML = "<h4 style='color:#ffffff;'>It's Fuckin Excellent!</h4>";

// Let's also put back our old title
document.title = "Arseblog - It's fuckin excellent!";
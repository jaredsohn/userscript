// ==UserScript==
// @name Facebook Wood By Solidjeuh
// @description Facebook Wood
// @include http://www.zeverhoekske.be/*
// ==/UserScript==

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("facebook.com") {
.adcolumn, profile_sidebar_ads{display:none!important}
#feedwall_with_composer,#info_tab,#info_edits_div,#info_section_1{width:700px!important}
#home_container,.home_welcome_info, .home_main_item, body{background-color:transparent!important;}

#facebook {background-image: url(http://www.presents4you.net/images/facebooksolidjeuh.png)!important; background-attachment: fixed !important;}

#left_column, .right_column,.message_rows{background-color:#FFFFFF !important;
-moz-border-radius: 0px 0 8px 8px;}

/*#profile_top_bar {background-color:#110000 !important}*/

.right_column_container {background-color:#ffffff !important}

.tab_content {background:transparent !important}

*[id="fb_menubar"] {background-image:none!important;
background-color:#000000 !important;
-moz-border-radius: 0px 0 8px 8px;}

#newsfeed_wrapper *, #profileimage, #profile_pic {background-color:transparent!important; -moz-border-radius:8px;color:#000!important}

}
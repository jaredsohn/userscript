// ==UserScript==
// @name           Dark TRiBot Forums IPB Theme 0.01
// @description    Forces a dark skin for Invision Power Board
// @include        https://tribot.org/*
// @version        0.0.1
// ==/UserScript==

GM_addStyle(<><![CDATA[
    .statistics,
    .ipbfs_titlebox,
    .statistics_head.clearfix
    { background: #202020  !important; color: #DEDEDE !important; }
    #index_stats
    { background: #202020  !important; color: #DEDEDE !important; }
    
    body
    {
    color: #BCBCBC;
    }
    .ipsSideBlock.clearfix.__xXrecent20topics,
    body1
    { background: #202020 !important; color: #DEDEDE !important; background-image: none !important; 
    }
    .forumHover
    { background: #202020  !important; color: #DEDEDE !important; }
    table
    { color: #202020 !important; }
    .ipsType_small
    { color: #ffffff !important; text-decoration: none !important; text-shadow: none; !important; }
    a:link
    { color: #FFFFFF !important; text-decoration: none !important; text-shadow: none; !important; }
    a:visited,
    a:active,
    #navstrip a:hover
    { color: #FFFFFF !important; text-decoration: none !important; text-shadow: none; !important; }
    a:hover
    { color: #B7E7FD !important; text-decoration: none !important; text-shadow: none; !important; }
    tr,
    td
    { background: #181818 !important; color: #ffff !important; }
    .plainborder,
    .tableborder
    { background-color: #000000 !important; border: 1px solid #000000 !important; }
    .tablefill,
    #ucpmenu,
    #ucpcontent
    { border: 1px solid #000000 !important; background-color: #343434 !important; }
    .forminput,
    .textinput,
    .radiobutton,
    .checkbox
    { border: 1px solid #000000 !important; background-color: #383838 !important; color: #DEDEDE !important; }
    #logostrip
    { background: #2C2C2C !important; background-image: none !important;}
    #userlinks
    { border: 1px solid #000000 !important; background: #303030 !important; background-image: none !important; color: #DEDEDE !important; }
    #userlinks a:link,
    #userlinks a:visited,
    #userlinks a:active,
    .titlemedium a:link,
    .titlemedium a:visited,
    .titlemedium a:active
    { font-weight: bold !important; font-size: 10px !important; text-decoration: none !important; color: #DEDEDE !important; }
    #secondary_navigation 
    {
    background: #1C1C1C url('http://cdn.powerbot.org/community//public/style_images/animate/secondary_nav_bg.png') repeat-x 0 0;
    border: 1px solid #2D2D2D;
    text-shadow: rgba(0, 0, 0, 0.8) 0px -1px 0px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    overflow: hidden;
    line-height: 37px;
    margin-bottom: 15px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    #submenu
    { background: #303030 !important; border: 1px solid #000000 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00D%08%02%00%00%00%C6%09h%7B%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%EEIDATx%DA%ACS%D1%0E%83%20%0C%14%A8%A8%D1%AF%F2%FF%3F%C5g%A3Fa%87g%98%C3L%B2%CC%3E%D4%D6%5E%8F%C3V%D5%B6mq2%E9%FB%BE%AA*%26%F3%3C%CB0%0CZk%E6%CE9m%8C%F1%DE%2B%A5%E0%11%8B%B5%16%95u%5D%19%E8%B2%2C%F1h%9A%06%1E%B1l%DBV%D75%12%80%97e%11%BF%1B%F9%10%04%3C%8EA%04%8FX%23%E2%2B%F8P%C7%99%D34%89%08%7C8%1F%1C%3C%09%3E%F0%B9%DD%DE%FA~%E5%8B%15%A2%B2%FA%D0%C3f%F8%D0%1F%2BD%5D%F8r%FAr%7C%B1r%A0%FE%FD~%B9%FBF%24%BB.%7C%89%3E%D3u%1D%E7%F1e%BE)_%9C%DC%B1%2F%89%3E%83%CD9%F3%E9%E2%D3%B2%F7M%F5a%F9n%F5Q%0C%12J%BA%F0%C5%0AQ%06%3F%C7%AD%BE%94%2F%BDo%CAgw%7B%8E%0F%B2%9F%E4%0B%9B%87%11%13%15%06%85%7C%1C%C7%C8%F7%12%60%00%B6%B0%D3%FC%E9%D6%C1%5B%00%00%00%00IEND%AEB%60%82") !important; }
    #submenu a:link,
    #submenu a:visited,
    #submenu a:active
    { font-weight: bold !important; font-size: 10px !important; text-decoration: none !important; color: #48a6e6 !important; }
    .maintitle
    { background-color: #212121 !important;) !important; color: 202020 !important; 
    text-shadow: none;}
    .maintitle a:link,
    .maintitle a:visited,
    .maintitle a:active,
    .maintitle a:hover
    { color: 202020 !important; text-decoration: none !important; }
    .titlemedium
    { background-color: #303030 !important; ) !important; color: #F5F5F5 !important; }
    .hlight,
    .row3,
    .helprow,
    .tablepad,
    .plain,
    .tdrow1,
    .catrow2
    { background-color: #343434 !important; }
    .row2
    { background-color: #303030 !important; padding: 3px 5px 3px 5px !important; }
    .dlight,
    .tdrow2,
    .catrow1
    { background-color: #383838 !important; }
    .darkrow3,
    .row4
    { background-color: #383838 !important; border-color: #000000 !important; }
    .caldate
    { background-color: #303030 !important; color: #DEDEDE !important; }
    .desc
    { color: #DEDEDE !important; }
    .darkrow1,
    .darkrow2
    { background-color: #343434 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%1A%08%02%00%00%00%F0%8D%01%FC%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%9AIDATx%DAd%90%89%0A%C4%20%0CDK%9Aj%A1%FF%FF%AF%9E%B8%2F%0C%C8%EEVp%9C%CBT%EA%CF%F3%1C_%CB%EF%FB%CE9K%D4Z%0DQJA%80p%5Bk%C9%02%E1%A1%A9%A5%94%C0%D0%12%F4e9%0C%7B%CF7%EC%D6%1A%0C%84%9B%9A%12%91SF%5C%D7%05%C6%3C%0Ew%87%81p%3B~%97a%F7%DE%C9Ax%E4%1Cc%0C0r%B6%04%18Z5%B5%82%FF%BFo7u%EB5%8F2%E2%3CO0%DE7%E7D%90%80%F0%D7%FBd%C3T%B4%DD%D4-%DB%89Z%CE%3F%D3%C7%85%1F%01%06%00%3FD%92%F7%26%B2U%2C%00%00%00%00IEND%AEB%60%82") !important; color: #FEFEFE !important; }
    .postcolor
    { padding-left: 5px !important; }
    .post1
    { background-color: #343434 !important; color: #DEDEDE !important; padding: 3px !important; }
    .post2
    { background-color: #303030 !important; color: #DEDEDE !important; padding: 3px !important; }
    .postlinksbar
    { background-color: #303030 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%1A%08%02%00%00%00%F0%8D%01%FC%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%9AIDATx%DAd%90%89%0A%C4%20%0CDK%9Aj%A1%FF%FF%AF%9E%B8%2F%0C%C8%EEVp%9C%CBT%EA%CF%F3%1C_%CB%EF%FB%CE9K%D4Z%0DQJA%80p%5Bk%C9%02%E1%A1%A9%A5%94%C0%D0%12%F4e9%0C%7B%CF7%EC%D6%1A%0C%84%9B%9A%12%91SF%5C%D7%05%C6%3C%0Ew%87%81p%3B~%97a%F7%DE%C9Ax%E4%1Cc%0C0r%B6%04%18Z5%B5%82%FF%BFo7u%EB5%8F2%E2%3CO0%DE7%E7D%90%80%F0%D7%FBd%C3T%B4%DD%D4-%DB%89Z%CE%3F%D3%C7%85%1F%01%06%00%3FD%92%F7%26%B2U%2C%00%00%00%00IEND%AEB%60%82") !important; color:#000000 !important; padding: 2px 2px 2px 2px !important; }
    .postlinksbar a:link,
    .postlinksbar a:visited,
    .postlinksbar a:active
    { font-weight: bold !important; font-size: 10px !important; text-decoration: none !important; }
    .signature
    { color: #DEDEDE !important; padding-left: 5px !important; border-top: 1px solid #252525; }
    .activeuserstrip
    { background-color: #303030 !important; background-image: none !important; color:#DEDEDE !important; }
    .thin
    { border-bottom: 1px solid #000000 !important; border-top: 1px solid #000000 !important; }
    .pformstrip
    { background-color: #303030 !important; background-image: none !important; border-bottom: 1px solid #000000 !important; color: #F5F5F5 !important; }
    .row1
    { background-color: #303030 !important; }
    .pformleft,
    .pformleftw,
    .pformright
    { background-color: #303030 !important; border-bottom:1px solid #000000 !important; border-top: none !important; border left: none !important; border-right: none !important;  }
    #QUOTE,
    #CODE
    { background-color: #404040 !important; color: #DEDEDE !important; }
    .signaturetab
    { background-color: #404040 !important; color: #DEDEDE !important; max-width: 600px !important; }
    
    .post_wrap
    { background-color: #101010 !important; color: #DEDEDE !important;  }
    
    .post_controls.clear.clearfix
    { background-color: #101010 !important; color: #DEDEDE !important; border-top: 1px solid #252525; }
    
    .post_body
    { background-color: #181818 !important; color: #DEDEDE !important;
    border-left: 1px solid #252525 !important;
    border-right: 1px solid #252525 !important;}
    
    .ipsType_pagetitle,
    .desc.lighter.blend_links,
    .creator
    { color: #FFFFFF !important; padding-left: 5px !important; }
    
    #anonymous_element_1
    { color: #FFFFFF !important; padding-left: 5px !important; }
    
    #logo
    {  background url(http://puu.sh/2ZsgW/7bc2b51d6d.png); position: relative; z-index: 50; }
    
    
    
    .presentation
    { background-color: #202020 !important; color: #DEDEDE !important; }
    
    #cke_show_borders
    { background-color: #202020 !important; color: #DEDEDE !important; }
    
    #secondary_navigation 
    { text-shadow: none; !important; }
    
    #ipsTag
    { text-shadow: none; !important; }
    
    .highlight_unread
    { color: #FFFFFF !important; text-decoration: none !important; }
    .maintitle
    { background-color: #202020 !important; color: #DEDEDE !important; }
    #anonymous_element_7
    { background-color: #202020 !important; color: #DEDEDE !important; background-image: none !important;}
    ul.post_controls li.report a, 
    ul.post_controls li.top a,
    ul.post_controls a, 
    ul.post_controls a.ipsButton_secondary
    { text-shadow: none; !important; }
    
    .ipsButton_secondary,  
    .user_controls li a
    { background: #393939 url('http://puu.sh/2ZOxD/c1a56734f9.png') repeat-x 0 0} 
    
    .bbc_spoiler_show
    { font-color: white background: #393939 url('http://puu.sh/2ZOxD/c1a56734f9.png') repeat-x 0 0}
    
    ul.post_controls li.report a, 
    ul.post_controls li.top a
    { border-right: 1px solid #252525; }
    
    .post_block h3
    { background: #202020; 
    border-left: 1px solid #252525; 
    border-right: 1px solid #252525;}
    .post_block:first-of-type h3
    { border-top: 0px }
    
    .author_info.clearfix
    { border-left: 1px solid #252525; }
    
    .border, 
    .statistics, 
    .post_block, 
    .ipsComment, 
    .popupInner, 
    .no_messages, 
    .poll_question ol, 
    .ipsBox_container, 
    .ipsFloatingAction, 
    .column_view 
    .post_body
    { background: #181818; }
    
    .cke_editor iframe
    { border: 1px solid #494949 !important }
    
    .blurBox {
    background: #1F1F1F url("http://cdn.powerbot.org/community//public/style_images/animate/box_pattern.png") repeat;
    border: 1px solid #282828;
    border-top: 1px solid #363636;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 5px;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    
    }
    
    .cbe .maintitle, .cbe .blurBox, .cbe .ipsBox, .cbe #secondary_navigation, .cbe .pagination .page a, .cbe .pagination .back a, .cbe .pagination .forward a, .cbe .ipsSideBlock h3, .cbe .general_box h3, .cbe .statistics_head, .cbe .ipbfs_titlebox
    
    { background-color: #1F1F1F;
    background-image: none;
    color: #FFF;
    
    }
    
    #recentajaxcontent li, #idm_categories a, #idm_categories li.with_sub.open li, #index_stats .status_list li, #panel_files .file_listing li, #panel_screenshots #ss_linked li, .file_listing, #cart_totals td, div#member_filters li, #files li, .ipsType_sectiontitle, #order_review td, #package_details .package_info, .block_list li, .package_view_top, .member_entry, #help_topics li, .ipsBox_container .ipsType_pagetitle, .userpopup dl, #announcements td, .sideVerticalList li, fieldset.with_subhead ul, .ipsList_data li, .ipsList_withminiphoto li, .ipsList_withmediumphoto li, table.ipb_table td, .store_categories li, #mini_cart li, #index_stats div[id*="statusReply"], #ipg_category .ipg_category_row, .block_inner .ipb_table td, .gallery_pane h2, .status_feedback li[id*="statusReply"], .ipsSideMenu ul li, #usercp_content .ipsType_subtitle, .ipbfs_login_row, .articles .block-1, .articles .type-1x2x2 .article_row, #idm_category .idm_category_row, #category_list li a, .ipsComment, #forum_table.ipb_table tr:last-of-type td
    
    {
    border-top: 3px solid #252525;
    border-bottom: 3px solid #252525;
    }
    
    p.citation
    {
    background: #282828 url('https://tribot.org/forums/public/style_images/Snapshot_Images/highlight.png') repeat-x 0 0;
    text-shadow: rgba(0,0,0,0.8) 0px -1px 0px;
    color: #DDD;
    border-bottom: none;
    border: 1px solid #3b3b3b;
    }
    
    blockquote.ipsBlockquote
    {
    background: #262626;
    color: #9f9f9f;
    border: 1px solid #3b3b3b;
    }
    
    #logo a.textLogo
    {
    font-size: 0px;
    background-image: url(http://puu.sh/31yTw/abc3a86577.png);
    padding: 0 66px;
    margin-top: 10px;
    background-repeat:no-repeat;
    }
    .ipsTag
    {
    background-image: url(http://puu.sh/31zek/9c2138ecb6.png);
    }
    
    div.bbc_spoiler_content
    
    {
    background: #313131;
    }
    
    pre.prettyprint, code.prettyprint
    {
    background-color: #818181 !important;
    }
    
    #user_bar
    {
    background-color: #000 
    }
    
    #idm_category .idm_category_row, .store_categories li, #idm_categories a, .ipsList_data li, .ipsList_withminiphoto li, .ipsList_withmediumphoto li, table.ipb_table tr td
    {
    background-image: none;
    background-color: #181818 !important;
    }
    
    
    
    ul.post_controls
    {
    background-color: #101010;
    background-image: none;
    padding: 7px;
    }
    
    ul.post_controls a
    {
    background: #363636 url('http://cdn.powerbot.org/community//public/style_images/animate/highlight_faint.png') repeat-x 0 0;
    margin-left: 4px;
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-left: none;
    }
    
    .ipsLikeButton.ipsLikeButton_enabled
    
    {
    background-color: #363636;
    border: none;
    color: #fff !important;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    }
    .col_c_forum
    {
    padding: 10px 0px 10px 10px;
    margin-bottom: 5px;
    }
    
    .ipsSideBlock h3, .general_box h3, .statistics_head
    
    {
    text-shadow: none;
    }
    
    .ipsHeaderMenu
    {
    background: #181818;
    }
    
    #user_navigation a#user_link.menu_active, #user_navigation a#notify_link.menu_active, #user_navigation a#inbox_link.menu_active
    {
    background-color: #4E4E4E;
    }
    
    #secondary_navigation #breadcrumb li span
    {
    background: url('http://cdn.powerbot.org/community//public/style_images/animate/secondary_nav.png') no-repeat 100% 0;
    }
    
    .edit
    {
    background: #5F5F5F url('https://tribot.org/forums/public/style_images/Snapshot_Images/comment_edit.png') no-repeat 6px 10px;
    border: 1px solid #CECECE;
    color: #FFF;
    text-shadow: none;
    font-weight:normal;
    }
    
    .ipbfs_titlebox .ipsType_pagedesc, .ipbfs_titlebox .desc, .ipbfs_titlebox .desc a
    {
    color: #BBB !important;
    }
    
    .pagination .pagejump a {
    background: rgba(0, 0, 0, 0.56);
    }
    
    .pagination .page a:hover, .pagination .back a:hover, .pagination .forward a:hover
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    .pagination .page a, .pagination .back a, .pagination .forward a
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    .pagination .pages li.active
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    .post_block h3
    {
    background: #202020 url('http://cdn.powerbot.org/community//public/style_images/animate/highlight_reallyfaint.png') repeat-x 0 -1px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #2D2D2D;
    }
    
    .post_block:first-of-type h3
    {
    border-top: 0;
    }
    
    .ipsSideBlock h3, .general_box h3, .statistics_head
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    .ipbfs_titlebox
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    #branding
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    #user_bar
    {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    }
    
    #secondary_navigation a
    {
    color: #D7D7D7;
    }
    
.border, .statistics, .post_block, .ipsComment, .popupInner, .no_messages, .poll_question ol, .ipsBox_container, .ipsFloatingAction, .column_view .post_body
    (
    background: #181818;
    }
    
    
    .removeDefault .ipsBox, .removeDefault.ipsBox
    {
    padding: 0;
background: none rgba(0, 0, 0, 0);
    }
    
    body .blurBox>.border
    {
    background: #181818;
-webkit-box-shadow: inset rgba(0, 0, 0, 0.4) 0px 1px 5px;
-moz-box-shadow: inset rgba(0,0,0,0.4) 0px 1px 5px;
box-shadow: inset rgba(0, 0, 0, 0.4) 0px 1px 5px;
border: 1px solid #282828;
border-bottom: 1px solid #343434;
    }
    
    
    

   body .border .ipsBox
    {
    background: #1F1F1F;
    }
    .border .ipsBox_container
    {
    border: 1px solid #464646;
    }
    

   .ipsVerticalTabbed_tabs li {
background: #3F4041;
    border-bottom: 1px solid #7C7C7C;
    }
    
    .ipsVerticalTabbed_tabs li.active a {
    background: #7C7C7C;
    }
    
    .ipsVerticalTabbed_tabs>ul {
        border: 1px solid #464646;
    }
    
    .ipsBox .general_box, .ipsBox .ipsSideBlock
    {
    border: 1px solid #464646;
    
    }
    
    .general_box
    {
    background: none;
    )
]]></>);
// ==UserScript==

// @name      Facebook LSU Colors

// @version    0.2

// @author     Savannah R.

// @namespace   http://gmu.facebook.com/group.php?gid=2313608018

// @description  Makes Facebook LSU Colors

// @include    *.facebook.com/*

// ==/UserScript==

 

/*

Copyright (C) 2007 by Alan Kelly Modified for Louisiana State University by Savannah R.

Contact: alan@swampmedia.com

 

This program is free software; you can redistribute it and/or

modify it under the terms of the GNU General Public License

as published by the Free Software Foundation; either version 2

of the License, or (at your option) any later version.

 

You may distribute the program, with or without changes, as long

as the original creator (Alan Kelly) is credited and this notice

remains intact. You may not sell any portion of this script.

 

This program is distributed in the hope that it will be useful,

but WITHOUT ANY WARRANTY; without even the implied warranty of

MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the

GNU General Public License for more details.

*/

 

/************************************************/

 

// GLOBAL COLOR DEFINITIONS -------------------

dark1 = "#8D0C33";

light1 = "#EB7B3C";

light2 = "#F3C45C";

 

// TOP LOGO IMAGE LOCATIONS -------------------

toplogo = "http://www.capsinfo.com/graphics/col/9-04/lsu.gif";

tophover = toplogo;

 

/*Turn this line on if you want to have a rollover image for the logo*/

//tophover = "http://photos-420.ak.facebook.com/ip002/v71/179/40/812910436/n812910436_321420_9597.jpg";

 

 

/************************************************/

 

// STYLE DEFINITIONS

GM_addStyle("a {color: "+dark1+";} select{ border:1px solid #BDC7D8;}/* ------| GLOBAL CLASSES |------ */#error { border: solid 1px #dd3c10; background: #ffebe8; }#error a { color: #dd3c10; }.status { border: solid 1px #ffe222; background: #fffbe2; }/* ------| PAGE FRAME |------ */ #sidebar h2 a:hover {color: "+dark1+";} #sidebar a.go_home {background-color: "+dark1+";} #qsearch.hourglass #q { border-color: #95a5c6;} #qsearch .search_arrow:hover,#qsearch .global_menu_arrow_active{background: "+light1+" url(/images/down_arrow.gif) no-repeat -13px center; } #qsearch .global_menu_arrow_active { border-top: solid 1px "+light1+"; border-right: solid 1px "+light1+"; } #qsearch #global_search_link:hover { background: "+light1+"; } #qsearch #global_search_link.active, #qsearch #global_search_link.active:hover { background: "+light1+"; } #qsearch #global_search_link.active, #qsearch #global_search_link.active:hover { border-top: solid 1px "+light1+"; border-left: solid 1px "+light1+"; }#search_options_menu { border: solid 1px "+light1+"; }#search_options_menu a { color: "+dark1+";}#search_options_menu a:hover { background: "+light1+"; border-right: solid 1px "+light1+"; border-left: solid 1px "+light1+"; } #navigator .main_set li a.active, #navigator .main_set li a:hover { background: "+light1+"; } #navigator .main_set li a.edit_link { color: #d8dfea; } #navigator .secondary_set li a { color: #c3cddf; } #content { border-bottom: solid 1px "+dark1+"; } #navigator .main_set li a.global_menu_arrow_active, #navigator .main_set li a.global_menu_arrow:hover, #navigator .main_set li a.global_menu_arrow_active:hover { background-color: "+light1+"; }/* Navigator Drop Menus ==== */#navigator .navigator_menu { background: white; border: solid 1px "+dark1+";}#navigator .navigator_menu li a {color: "+dark1+"; } #navigator .navigator_menu a:hover {background: "+dark1+"; border-right: solid 1px "+light1+"; border-left: solid 1px "+light1+";}/* ------| FORMS |------ *//* FORM INPUTS */.inputtext,.inputpassword { border: 1px solid #BDC7D8; }textarea { border: 1px solid #bdc7d8;} .inputbutton,.inputsubmit { border-top-color: #D9DFEA; border-left-color: #D9DFEA; border-bottom-color: #0e1f5b; border-right-color: #0e1f5b; background-color: "+dark1+";}#inline_flyer { border-bottom: 1px solid #d8dfea;}#inline_flyer .external_link a { border-bottom: 1px dotted "+dark1+";}#inline_flyer_content { background-color: #efeded; border-bottom: 1px solid #d8dfea;}/* ------| TABS |------ */#tabs { border-bottom: solid 1px "+light1+"; }#tabs .activetab a { background: "+light1+"; }#tabs .inactivetab a:hover {background: #D8DFEA;}/* ------| PAGER PRO |------ */.pagerpro a:hover { background: "+dark1+"; border-color: "+dark1+"; border-bottom: 1px solid "+dark1+"; color: white;}.pagerpro .current a,.pagerpro .current a:hover { border-color: "+dark1+"; border-bottom: 2px solid "+dark1+"; color: "+dark1+";}/* ------| BARS |------ */.summary_bar { border-bottom: 1px solid "+dark1+";}.tab_bar { border-bottom: solid 1px "+light1+"; }.footer_bar { border-top: 1px solid "+dark1+"; }.footer_bar .pagerpro a:hover { border-bottom: 2px solid "+dark1+"; border-top: 2px solid "+dark1+"; }.footer_bar .pagerpro .current a,.footer_bar .pagerpro .current a:hover { border-top: 2px solid "+dark1+"; }/* ------| ACTIONS PRO |------ */.actionspro li { border-bottom: 1px solid #D8DFEA; }.actionspro a:hover { background: "+dark1+"; }/* ------| SHARE | HIDE |------ */ .share_and_hide a { border: solid 1px #7f93bc; } .share_and_hide a:hover { border-color: "+light1+"; } .s_and_h_big a:hover { background-color: "+light1+"; } .share_and_hide a.x_to_hide:hover { background-color: "+light1+"; }.quail { color: "+dark1+";}/* ------| SQUARE BULLETS |------ */ul.square_bullets { color: "+light1+"; }/* ------| WELCOME BUTTONS |------ */html #content .welcome_buttons a:hover { background:#d8dfea; border-top:1px solid "+dark1+"; border-bottom:1px solid "+dark1+"; }html #book .under_login_tour a:hover { background:#d8dfea; border-top:1px solid "+dark1+"; border-bottom:1px solid "+dark1+"; }/* ------| APP SWITCHER |------ */ #app_switcher .app_switcher_selected .app_switcher_button { background: "+light1+"; border: solid 1px "+light1+"; }#app_switcher_menu { border: solid 1px "+light1+";} #app_switcher_menu .menu_list_header { border-bottom: solid 1px #d8dfea;} #app_switcher_menu a:hover, #app_switcher_menu a:hover .menu_item { background: "+light1+"; }/* ------| FLYERS |------ */#announce .advert { border: solid 1px #D8DFEA; border-bottom: solid 1px "+light1+";}#announce h4 { border-bottom:1px solid #D8DFEA; color:"+light1+";}/* ------| DROP-DOWN MENUS |------ */.drop_down_menu { border: solid 1px "+light1+";}.drop_down_menu .menu_element:hover { color: white; background: "+light1+";}/* ------| NOTES |------ */#dialog { border: solid 10px #D8DFEA; }#dialog td.dialog { border: solid 1px "+light1+"; }#dialog h4 { border-bottom: solid 1px #D8DFEA; }div.notice { border: solid 3px "+light1+"; }/* ------ Facebook | Discussions ------ *//* ------| PROFILE |------ */.discussions .board_topic .topic_pager a:hover { background: "+dark1+";}/* ------| BOARD |------ */.board .filter_bar { border-bottom: 1px solid #D8DFEA;}.board .column_header { border-bottom: 1px solid #d8dfea;}.board .footer_bar {       border-top: 1px solid #d8dfea;}/* ------| TOPIC |------ */.topic .topic_bar { border-bottom: solid 1px #D8DFEA;} .topic .topic_bar h2 span { color: "+light1+"; }.topic .post { border-bottom: solid 1px #D8DFEA; }.topic .post .info .post_index a:hover { color: "+dark1+"; }.topic .post .post_header { background: #fafaf7; border-bottom: 1px solid #d8dfea; border-top: 1px solid "+dark1+"; }.post_editor { border-bottom: 1px solid #d8dfea;}/*------| Toggle Tabs |------*/.toggle_tabs li a.selected { background:"+light1+"; border:1px solid "+dark1+"; border-left:1px solid #a97359; border-right:1px solid #a97359;}.toggle_tabs .last a.selected { border-left:1px solid #a97359; border-right:1px solid #36538f;}.toggle_tabs .first a.selected { border-left:1px solid #86533f; border-right:1px solid #a97359;}.toggle_tabs .first.last a.selected { border:1px solid #86533f;} /*------| Core Inbox Styles |------*//*------| Inbox Menu Controls |------*/.inbox_menu .pagerpro li.current a { border-bottom-color:"+dark1+";}.inbox_footer .pagerpro .current a { border-top:2px solid "+dark1+";}/*------| Message Row |------*/.message_rows .name_and_participants .name span { color:"+light1+";}.message_rows .subject .snippet { color:"+light1+" !important;}.message_rows .delete_msg a:hover { background-color: "+light1+";}/*------| Composer Fields |------*/.share_link #share_link,.composer_fields .field input,.composer_fields .field textarea,#compose_message div.tokenizer { border:1px solid #BDC7D8;}/*------| Attachments |------*/.attached_item { border-left:2px solid #e8dfda;} td.pop_content h2 { background: "+light1+"; border: 1px solid "+dark1+";}td.pop_content h2 span { border-top: 1px solid #788d8a;}.contextual_dialog .contextual_dialog_content { border-bottom: 1px solid "+dark1+";} /* ------ Facebook | The Sharer ------ */.share_pop_dialog div.tokenizer { border: 1px solid #a4768a;}.share_pop_dialog .status { margin: 0px;}.share_pop_dialog .status h2 { background: #fffbe2;}/* attachments */a.inline_edit:hover { background:#99ddff; text-decoration: none;} /* ------ Facebook | Share Media ------ *//* ------| NOTE |------ */.share_media .note_with_thumb .thumb a:hover { border-color: #6d84b4;}/* ------| VIDEO |------ */.video_fallback a:hover { color: "+dark1+"; text-decoration: none;}.share_footer .add_comment_label { color: "+dark1+";}.share_footer .dshare_add_another_comment { border-top: 1px solid "+light1+";}/* SHARE OTHER COMMENTS - MINI WALL */.miniwall .share_other_comment .other_comment_byline { border-bottom: 1px solid "+light1+"; border-top: 1px solid #bd8464;}.miniwall .share_other_comment.new_comment .other_comment_byline { background: #f4e9e0; border-bottom: 1px solid #d8dfea; border-top: 1px solid "+dark1+";} .typeahead_list { border: 1px solid #bdc7d8;}.typeahead_list .typeahead_suggestion em { background: "+light2+";}.typeahead_list .typeahead_selected { background: "+light1+";}.typeahead_list .typeahead_selected em { background: #5670a6;}input.typeahead_found { background: #e1e9f6;}/*------| Inbox Menu Controls |------*/.inbox_menu .pagerpro li.current a { border-bottom-color:"+dark1+";}.inbox_footer .pagerpro .current a { border-top:2px solid "+dark1+";border-bottom:1px solid white;}/*----------| Message Row |---------*/.message_rows .name_and_participants .name span { color:"+light1+";}.message_rows .subject .snippet { font-weight:normal; color:#8d9ccf;}.message_rows .delete_msg a:hover { background-color: "+light1+";}/*------| Composer Fields |------*/.share_link #share_link,.composer_fields .field input,.composer_fields .field textarea,#compose_message div.tokenizer { border:1px solid #BDC7D8;}/*------| Thread View |------*//*--Thread Header--*/.message.unread .author_info .name { background-color:#eff2f7; border-top:1px solid "+light2+";}/*------| Attachments |------*/.attached_item { border-left:2px solid "+light2+";}/*------ BASE HOMEPAGE CSS - Defines core attributes for objects ------*/.sidebar_item_header .option a { color: "+dark1+";}.announcement_title { border-bottom:1px solid "+dark1+";}/*------ Rooster Announcements CSS ------*/.rooster_info { border-bottom: solid 1px "+dark1+";}.rooster_error h4 { color: #d85d01;}.actually_important { background-color: #ceffff;} .actually_important .read_this { color: #d85d01; } .actually_important .important_text { color: #391800;}.actually_important .important_text a { color: #391800;}/*----*/h5 { border-bottom: solid 1px "+dark1+";}h4 { border-bottom: solid 1px "+light2+";}/*----*/#profileActions a { border-bottom: 1px solid #cccccc; }#profileActions a:hover { background: "+dark1+"; }#profileActions .inactive { border-bottom: solid 1px "+light2+";}#no_picture_orientation, .replaced { border-bottom: solid 1px "+dark1+"; background: #fff8cc; }.profile .orientation_text { background: #fff8cc; border-bottom: solid 1px "+dark1+";}.profileheader h2 { color: "+dark1+"; font-size: 11px; }.profileheader { background: "+light2+"; border-top: solid 1px "+dark1+"; color: "+dark1+";}.profilesubheader { color: "+dark1+";} h4.info_section .edit a:hover { color: "+light1+"; }.networks_with_friends h5 { border-bottom: solid 1px "+dark1+"; }.profilecourses { color: "+light1+"; }#wallpagerbar { border-top: solid 1px "+light1+"; color: "+light1+"; }#photos .added .album { border-bottom: solid 1px "+dark1+"; background: #fff8cc; }/* ------| FLEX |------ *//* === Header */.flex_header { border-top: solid 1px "+dark1+"; background: "+light2+"; }.flex_header h2 { color: "+dark1+"; }.when_open .flex_header { border-top: solid 1px "+dark1+";}/* -------||------ */.box_head { border-top: solid 1px "+dark1+"; background: "+light2+"; }.moveable:hover { background: #cfd7e4; } .box_head h2 { color: "+dark1+";}/* ------||------- */.profile .view_explanation { background: #ccf8ff; } .highlight, .inserted { background: #fff8cc; border-bottom: solid 1px "+dark1+";} a:hover.highlight, .inserted a:hover { border-bottom: 1px solid "+dark1+";}/* ------| WORK INFORMATION |------ */h4.details_toggle a:hover { color: "+dark1+"; }/* --- Friends --- */.profile .friends_section h4 {border-bottom: solid 1px "+dark1+";} #status_editor_menu { border-color: "+dark1+"; }/* ------| SAVED |------ */ .saved .added { background: #fff8cc; border-bottom: solid 1px "+dark1+";} /* ------| NOTES |------ */ .notes_titles .added { border-bottom: solid 1px "+dark1+"; background: #fff8cc;} /* ------| ELECTION 2006 |------ */.election_header h2 { color: "+light1+";}.election_subheader {border-top: 1px solid "+light2+";}.profile_long_name h2 { color: #8doc33;}.profile_long_name {color: "+dark1+";}/*------ Feed CSS ------*/feed_story_wrapper {border-bottom:1px solid "+light2+";}.feed_story_wrapper .rate_link { background:"+light1+";}.bumper { color:#D8DFEA; background:#D8DFEA;}.one_liner h2 a { color:"+dark1+";}/* Photo Widget Styles */.photo_widget a:hover img { border:1px solid "+light1+";}/* Individual Story Styles */.profile_picture .pic_container:hover { border:1px solid "+light1+";}.profile_picture .pic_container a:hover { border:1px solid "+light1+";}.share .comment strong a { color:"+light1+";}/* Filter Page Styles */.newsfeed_header { border-bottom:1px solid "+light2+";}.archive_header { border-bottom:1px solid "+light2+";}.recent_stories { border-top:1px solid "+light2+";}/*----- Feedback -----*/.feedback #feedback_status { border:1px solid #dd3c10; background:#ffebe8;}.feedback #feedback_status a { color:#dd3c10;}.feedback .mixer_panel .saved_notification { background:#fef6c7; border:1px solid "+dark1+";}.feedback .friend_priorities h3 { border-bottom:1px solid "+light2+";}.friend_priorities .friend_bucket { margin-top:15px;}/*-----*/.ad_capsule .photo_widget a:hover img { border:1px solid "+light1+";}.ad_capsule .photo_widget a:hover img { border:1px solid "+light1+";}.ad_capsule .external_link { border-bottom:1px dotted "+light1+"; }#book .ad_capsule a:hover .external_image { border:1px dotted "+light1+";}/*---*/#status_content #su_placeholder { color: "+light1+"; }#edit_status_toggle { background-color:"+light2+";}#edit_status_select a:hover { background: "+light1+";}/*----*/.default-dropdown { border-bottom: 1px solid "+light1+"; }.typeahead_header { background-color: #7888a2; }.dropdown .list_element_container_selected, .default-dropdown .list_element_container_selected { background-color: "+light1+"; }.dropdown .list_element_loc_selected { color: "+light2+"; }.dropdown .list_element_name .suggest, .default-dropdown .list_element_name .suggest, .dropdown .list_element_loc .suggest { background: "+light2+"; }.dropdown .list_element_name_selected .suggest, .default-dropdown .list_element_name_selected .suggest, .dropdown .list_element_loc_selected .suggest { background: #5670A6; } ");

 

 

GM_addStyle("body { margin-top: -1em; } #sidebar { z-index: 2; } #navigator { background: "+dark1+" none repeat scroll 0%; height: 37px; width: 649px; margin: 0 !important; padding: 9px 0 4px 0 !important; z-index: 3 !important; position: relative; left: -1px; border-bottom: 5px solid "+light1+"; border-right: 1px solid #E5E5E5; } #nav_unused_1 { position: relative; left: 17px; top: 12px; } #nav_unused_2 { position: relative; left: 5px; top: 13px; } #sidebar_content { background-color: #fafaf7; border-left: 1px solid #CCCCCC; } #publicity { border-left: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; background-color: #fafaf7; padding: 10px 12px 12px 12px; height: auto; } #publicity h5 { line-height: 120%; } .profileimage { background-color: transparent; } .navigator_menu { width: 100%; }");

 

GM_addStyle(".secondary_set li a,#navigator .main_set li a.edit_link,.group_dashboard .group_lists th a {color: #fff!important;}.profile .header h2,.profile .info_table caption,.controls h2, .header h2,.minifeed .headline h2 a,.search_type h2,.ubersearch .basic_search .bar_header,#embedded_store #store_pager #summary {color:"+dark1+";} .profile .header, .header,.search_type h2,.ubersearch .basic_search .bar_header{background: "+light2+";border-top-color: "+dark1+" !important;}.wallpost .wallinfo,.share_contents .share_header ,.search_type,#linkeditor .border,.note .note_header {border-top-color: "+dark1+" !important;} .inputtext, .inputpassword, #q {border-color: #BDC7D8 !important;} .friendtable .actions a:hover{background-color: "+dark1+";} #sidebar a.go_home {background: "+dark1+" url('"+toplogo+"') no-repeat scroll center bottom; border-bottom: 5px solid "+light1+"; height: 21px; color: #ffffff!important; font-family: Comic Sans MS; text-align: center; text-vertical-align: middle; font-size: 24pt} #sidebar a.go_home:hover {background:"+dark1+" url('"+tophover+"') no-repeat scroll center bottom;} .profile .photos img:hover,#album img:hover{border-color: "+light1+"}.group_dashboard .group_lists th{background-color: "+dark1+";} html #content .welcome_buttons a:hover, #linkeditor{background-color: "+light2+";} .profile .account_info,.box_subhead,.profile #inline_wall_post,.wallpost .wallinfo .wallheader,#profileActionsSecondary,.group_dashboard .panel,.grayheader,.profile .subheader {background-color:#fafaf7} .share_and_hide a {background-color: white;border-color:"+dark1+"} .share_and_hide a:hover, .message_rows .delete_msg a:hover {background-color: "+light1+"}.message.unread .author_info .name{background-color: "+light2+"}.message_rows .new_message .msg_icon, .message_rows .msg_icon.replied, .message_rows .new_message .msg_icon.replied,.message_rows tr td{background-color: #fafaf7} .message_rows .new_message .msg_icon, .message.unread .author_info .name {background: "+light2+"; background-image: none} .message_rows .delete_msg a:hover {background-image: url(/images/x_to_hide.gif); text-decoration: none}");
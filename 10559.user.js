// ==UserScript==

// @name      UMiami Facebook Scheme

// @version    1.0

// @author     Sam B

// @namespace   http://gmu.facebook.com/group.php?gid=2313608018

// @description  Facebook Colors of the University of Miami

// @include    *.facebook.com/*

// ==/UserScript==



/*

Copyright (C) 2007 by Alan Kelly Modified for the University of Miami by Sam B.

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

 toplogo = "http://img220.imageshack.us/img220/2407/miamihoverbeforefw3.jpg";



 /*Turn this line on if you want to have a rollover image for the logo*/

 tophover = "http://img237.imageshack.us/img237/5387/miamihoverafterus4.jpg";





 /************************************************/



 // STYLE DEFINITIONS

GM_addStyle("a {color: #004725;} select{ border:1px solid #BDC7D8;}/* ------| GLOBAL CLASSES |------ */#error { border: solid 1px #dd3c10; background: #ffebe8; }#error a { color: #dd3c10; }.status { border: solid 1px #F84F10; background: #fffbe2; }/* ------| PAGE FRAME |------ */  #sidebar h2 a:hover {color: #004725;}  #sidebar a.go_home {background-color: #004725;} #qsearch.hourglass #q {   border-color: #95a5c6;} #qsearch .search_arrow:hover,#qsearch .global_menu_arrow_active{background: #F84F10 url(/images/down_arrow.gif) no-repeat -13px center; }    #qsearch .global_menu_arrow_active {   border-top: solid 1px #F84F10 ;   border-right: solid 1px #F84F10 ; }  #qsearch #global_search_link:hover {   background: #F84F10;   }  #qsearch #global_search_link.active, #qsearch #global_search_link.active:hover {      background: #F84F10;   }  #qsearch #global_search_link.active, #qsearch #global_search_link.active:hover {   border-top: solid 1px #F84F10 ;   border-left: solid 1px #F84F10 ; }#search_options_menu { border: solid 1px #F84F10 ; }#search_options_menu a { color: #004725;}#search_options_menu a:hover { background: #F84F10; border-right: solid 1px #F84F10; border-left: solid 1px #F84F10; } #navigator .main_set li a.active,   #navigator .main_set li a:hover { background: #F84F10; } #navigator .main_set li a.edit_link {    color: #d8dfea; }  #navigator .secondary_set li a {   color: #c3cddf; } #content {  border-bottom: solid 1px #004725; } #navigator .main_set li a.global_menu_arrow_active, #navigator .main_set li a.global_menu_arrow:hover,  #navigator .main_set li a.global_menu_arrow_active:hover { background-color: #F84F10; }/* Navigator Drop Menus ==== */#navigator .navigator_menu { background: white; border: solid 1px #004725;}#navigator .navigator_menu li a {color: #004725;   }  #navigator .navigator_menu a:hover {background: #004725;   border-right: solid 1px #F84F10;   border-left: solid 1px #F84F10;}/* ------| FORMS |------ *//* FORM INPUTS */.inputtext,.inputpassword { border: 1px solid #BDC7D8; }textarea { border: 1px solid #bdc7d8;}   .inputbutton,.inputsubmit { border-top-color: #D9DFEA; border-left-color: #D9DFEA; border-bottom-color: #0e1f5b; border-right-color: #0e1f5b; background-color: #004725;}#inline_flyer {  border-bottom: 1px solid #d8dfea;}#inline_flyer .external_link a {   border-bottom: 1px dotted #004725;}#inline_flyer_content {   background-color: #efeded;  border-bottom: 1px solid #d8dfea;}/* ------| TABS |------ */#tabs {    border-bottom: solid 1px #F84F10 ; }#tabs .activetab a {    background: #F84F10; }#tabs .inactivetab a:hover {background: #D8DFEA;}/* ------| PAGER PRO |------ */.pagerpro a:hover { background: #004725; border-color: #004725; border-bottom: 1px solid #004725; color: white;}.pagerpro .current a,.pagerpro .current a:hover { border-color: #004725; border-bottom: 2px solid #004725; color: #004725;}/* ------| BARS |------ */.summary_bar { border-bottom: 1px solid #004725;}.tab_bar { border-bottom: solid 1px #F84F10 ; }.footer_bar { border-top: 1px solid #004725; }.footer_bar .pagerpro a:hover { border-bottom: 2px solid #004725; border-top: 2px solid #004725; }.footer_bar .pagerpro .current a,.footer_bar .pagerpro .current a:hover { border-top: 2px solid #004725; }/* ------| ACTIONS PRO |------ */.actionspro li { border-bottom: 1px solid #D8DFEA; }.actionspro a:hover { background: #004725; }/* ------| SHARE | HIDE |------ */ .share_and_hide a {  border: solid 1px #7f93bc; } .share_and_hide a:hover {  border-color: #F84F10 ;  }  .s_and_h_big a:hover {   background-color: #F84F10 ; } .share_and_hide a.x_to_hide:hover {  background-color: #F84F10 ; }.quail { color: #F84F10 ;}/* ------| SQUARE BULLETS |------ */ul.square_bullets { color: #F84F10 ; }/* -----------------------| WELCOME BUTTONS |------ */html #content .welcome_buttons a:hover { background:#d8dfea; border-top:1px solid #004725; border-bottom:1px solid #004725; }html #book .under_login_tour a:hover { background:#d8dfea; border-top:1px solid #004725; border-bottom:1px solid #004725; }/* ------| APP SWITCHER |------ */    #app_switcher .app_switcher_selected .app_switcher_button {   background: #F84F10;   border: solid 1px #F84F10 ; }#app_switcher_menu { border: solid 1px #F84F10 ;}   #app_switcher_menu .menu_list_header {  border-bottom: solid 1px #d8dfea;}  #app_switcher_menu a:hover, #app_switcher_menu a:hover .menu_item {  background: #F84F10;  }/* ------| FLYERS |------ */#announce .advert { border: solid 1px #D8DFEA; border-bottom: solid 1px #F84F10 ;}#announce h4 { border-bottom:1px solid #D8DFEA; color:#F84F10 ;}/* ------| DROP-DOWN MENUS |--------------------------- */.drop_down_menu { border: solid 1px #F84F10 ;}.drop_down_menu .menu_element:hover { color: white; background: #F84F10 ;}/* ------| NOTES |------ */#dialog { border: solid 10px #D8DFEA; }#dialog td.dialog { border: solid 1px #F84F10 ; }#dialog h4 { border-bottom: solid 1px #D8DFEA; }div.notice { border: solid 3px #F84F10 ; }/* ------ Facebook | Discussions  ------ *//* ------| PROFILE |------ */.discussions .board_topic .topic_pager a:hover { background: #004725;}/* ------| BOARD |------ */.board .filter_bar { border-bottom: 1px solid #D8DFEA;}.board .column_header { border-bottom: 1px solid #d8dfea;}.board .footer_bar {    border-top: 1px solid #d8dfea;}/* ------| TOPIC |------ */.topic .topic_bar { border-bottom: solid 1px #D8DFEA;}  .topic .topic_bar h2 span {  color: #F84F10 ; }.topic .post { border-bottom: solid 1px #D8DFEA; }.topic .post .info .post_index a:hover { color: #004725; }.topic .post .post_header { background: #f7f7f7; border-bottom: 1px solid #d8dfea; border-top: 1px solid #004725;  }.post_editor { border-bottom: 1px solid #d8dfea;}/*--| Toggle Tabs |--------------------------------------------------------------|==================================================================================*/.toggle_tabs li a.selected { background:#F84F10; border:1px solid #004725; border-left:1px solid #a97359; border-right:1px solid #a97359;}.toggle_tabs .last a.selected { border-left:1px solid #a97359; border-right:1px solid #36538f;}.toggle_tabs .first a.selected { border-left:1px solid #86533f; border-right:1px solid #a97359;}.toggle_tabs .first.last a.selected { border:1px solid #86533f;} /*-------------------------| Core Inbox Styles |-------------------------*//*------------------------| Inbox Menu Controls |------------------------*/.inbox_menu .pagerpro li.current a { border-bottom-color:#004725;}.inbox_footer .pagerpro .current a { border-top:2px solid #004725;}/*----------------------------| Message Row |----------------------------*/.message_rows .name_and_participants .name span { color:#F84F10 ;}.message_rows .subject .snippet { color:#db6b2c;}.message_rows .delete_msg a:hover { background-color: #F84F10;}/*-------------------------| Composer Fields |--------------------------*/.share_link #share_link,.composer_fields .field input,.composer_fields .field textarea,#compose_message div.tokenizer { border:1px solid #BDC7D8;}/*----------------------------| Attachments |----------------------------*/.attached_item { border-left:2px solid #e8dfda;} td.pop_content h2 { background: #F84F10; border: 1px solid #004725;}td.pop_content h2 span { border-top: 1px solid #788d8a;}.contextual_dialog .contextual_dialog_content { border-bottom: 1px solid #004725;} /* ------------------------------------------------------------------------               Facebook | The Sharer  ------------------------------------------------------------------------ */.share_pop_dialog div.tokenizer { border: 1px solid #a4768a;}.share_pop_dialog .status { margin: 0px;}.share_pop_dialog .status h2 { background: #fffbe2;}/* attachments */a.inline_edit:hover { background:#99ddff; text-decoration: none;} /* ------ Facebook | Share Media ------ *//* ------| NOTE |------ */.share_media .note_with_thumb .thumb a:hover { border-color: #6d84b4;}/* ------| VIDEO |------ */.video_fallback a:hover { color: #004725; text-decoration: none;}.share_footer .add_comment_label { color: #004725;}.share_footer .dshare_add_another_comment { border-top: 1px solid #F84F10;}/* SHARE OTHER COMMENTS - MINI WALL */.miniwall .share_other_comment .other_comment_byline { border-bottom: 1px solid #F84F10; border-top: 1px solid #bd8464;}.miniwall .share_other_comment.new_comment .other_comment_byline { background: #f4e9e0; border-bottom: 1px solid #d8dfea; border-top: 1px solid #004725;} .typeahead_list { border: 1px solid #bdc7d8;}.typeahead_list .typeahead_suggestion em { background: #FBA029;}.typeahead_list .typeahead_selected { background: #F84F10 ;}.typeahead_list .typeahead_selected em { background: #5670a6;}input.typeahead_found { background: #e1e9f6;}/*------| Inbox Menu Controls |------*/.inbox_menu .pagerpro li.current a { border-bottom-color:#F84F10 ;}.inbox_footer .pagerpro .current a { border-top:2px solid #F84F10 ;}/*----------| Message Row |---------*/.message_rows .name_and_participants .name span { color:#F84F10 ;}.message_rows .subject .snippet { font-weight:normal; color:#8d9ccf;}.message_rows .delete_msg a:hover { background-color: #F84F10 ;}/*------| Composer Fields |------*/.share_link #share_link,.composer_fields .field input,.composer_fields .field textarea,#compose_message div.tokenizer { border:1px solid #BDC7D8;}/*------| Thread View |------*//*--Thread Header--*/.message.unread .author_info .name { background-color:#eff2f7; border-top:1px solid #FBA029;}/*------| Attachments |------*/.attached_item { border-left:2px solid #FBA029;}/*------ BASE HOMEPAGE CSS - Defines core attributes for objects ------*/.sidebar_item_header .option a { color: #004725 ;}.announcement_title { border-bottom:1px solid #004725;}/*------ Rooster Announcements CSS ------*/.rooster_info { border-bottom: solid 1px #004725;}.rooster_error h4 { color: #d85d01;}.actually_important { background-color: #ceffff;} .actually_important .read_this { color: #d85d01; }  .actually_important .important_text { color: #391800;}.actually_important .important_text a { color: #391800;}/*----*/h5 { border-bottom: solid 1px #004725;}h4 { border-bottom: solid 1px #FBA029;}/*----*/#profileActions a { border-bottom: 1px solid #cccccc; }#profileActions a:hover { background: #004725; }#profileActions .inactive { border-bottom: solid 1px #FBA029;}#no_picture_orientation, .replaced { border-bottom: solid 1px #004725; background: #fff8cc; }.profile .orientation_text {  background: #fff8cc;  border-bottom: solid 1px #004725;}.profileheader h2 { color: #004725 ; font-size: 11px; }.profileheader { background: #FBA029; border-top: solid 1px #004725; color: #004725;}.profilesubheader { color: #004725;} h4.info_section .edit a:hover { color: #F84F10; }.networks_with_friends h5 {  border-bottom: solid 1px #004725; }.profilecourses { color: #F84F10; }#wallpagerbar {    border-top: solid 1px #F84F10; color: #F84F10 ; }#photos .added .album { border-bottom: solid 1px #004725;  background: #fff8cc; }/* ------| FLEX |------ *//* === Header */.flex_header {  border-top: solid 1px #004725;  background: #FBA029;  }.flex_header h2 { color: #004725; }.when_open .flex_header { border-top: solid 1px #004725;}/* -------||------ */.box_head { border-top: solid 1px #004725; background: #FBA029; }.moveable:hover { background: #cfd7e4;  } .box_head h2 {  color: #004725;}/* ------||------- */.profile .view_explanation { background: #ccf8ff; } .highlight, .inserted { background: #fff8cc;   border-bottom: solid 1px #004725;} a:hover.highlight, .inserted a:hover { border-bottom: 1px solid #004725;}/* ------| WORK INFORMATION |------ */h4.details_toggle a:hover { color: #004725; }/* --- Friends --- */.profile .friends_section h4 {border-bottom: solid 1px #004725;} #status_editor_menu { border-color: #004725; }/* ------| SAVED |------ */ .saved .added { background: #fff8cc;  border-bottom: solid 1px #004725;} /* ------| NOTES |------ */ .notes_titles .added { border-bottom: solid 1px #004725; background: #fff8cc;} /* ------| ELECTION 2006 |------ */.election_header h2 { color: #F84F10;}.election_subheader {border-top: 1px solid #FBA029;}.profile_long_name h2 { color: #8doc33;}.profile_long_name {color: #004725;}/*------ Feed CSS ------*/feed_story_wrapper {border-bottom:1px solid #FBA029;}.feed_story_wrapper .rate_link { background:#F84F10;}.bumper { color:#D8DFEA; background:#D8DFEA;}.one_liner h2 a { color:#004725;}/* Photo Widget Styles */.photo_widget a:hover img { border:1px solid #F84F10 ;}/* Individual Story Styles */.profile_picture .pic_container:hover { border:1px solid #F84F10 ;}.profile_picture .pic_container a:hover { border:1px solid #F84F10 ;}.share .comment strong a { color:#F84F10 ;}/* Filter Page Styles */.newsfeed_header { border-bottom:1px solid #FBA029;}.archive_header { border-bottom:1px solid #FBA029;}.recent_stories { border-top:1px solid #FBA029;}/*----- Feedback -----*/.feedback #feedback_status { border:1px solid #dd3c10; background:#ffebe8;}.feedback #feedback_status a { color:#dd3c10;}.feedback .mixer_panel .saved_notification { background:#fef6c7; border:1px solid #004725;}.feedback .friend_priorities h3 { border-bottom:1px solid #FBA029;}.friend_priorities .friend_bucket { margin-top:15px;}/*-----*/.ad_capsule .photo_widget a:hover img { border:1px solid #F84F10 ;}.ad_capsule .photo_widget a:hover img { border:1px solid #F84F10 ;}.ad_capsule .external_link { border-bottom:1px dotted #F84F10 ; }#book .ad_capsule a:hover .external_image { border:1px dotted #F84F10 ;}/*---*/#status_content #su_placeholder { color: #F84F10 ; }#edit_status_toggle {  background-color:#FBA029;}#edit_status_select a:hover {  background: #F84F10 ;}/*----*/.default-dropdown { border-bottom: 1px solid #F84F10 ; }.typeahead_header { background-color: #7888a2; }.dropdown .list_element_container_selected, .default-dropdown .list_element_container_selected { background-color: #F84F10 ; }.dropdown .list_element_loc_selected { color: #FBA029; }.dropdown .list_element_name .suggest, .default-dropdown .list_element_name .suggest, .dropdown .list_element_loc .suggest { background: #FBA029; }.dropdown .list_element_name_selected .suggest, .default-dropdown .list_element_name_selected .suggest, .dropdown .list_element_loc_selected .suggest { background: #5670A6; }  ");



GM_addStyle("body { margin-top: -1em; } #sidebar { z-index: 2; } #navigator { background: #004725 none repeat scroll 0%; height: 37px; width: 649px; margin: 0 !important; padding: 9px 0 4px 0 !important; z-index: 3 !important; position: relative; left: -1px; border-bottom: 5px solid #F84F10; border-right: 1px solid #E5E5E5; } #nav_unused_1 { position: relative; left: 17px; top: 12px; } #nav_unused_2 { position: relative; left: 5px; top: 13px; } #sidebar_content { background-color: #F7F7F7; border-left: 1px solid #CCCCCC; } #publicity { border-left: 1px solid #CfCCCC; border-bottom: 1px solid #CfCCCC; background-color: #F7F7F4; padding: 10px 12px 12px 12px; height: auto; } #publicity h5 { line-height: 120%; } .profileimage { background-color: transparent; } .navigator_menu { width: 100%; }");


GM_addStyle(".secondary_set li a,#navigator .main_set li a.edit_link,.group_dashboard .group_lists th a {color: #fff!important;}.profile .header h2,.profile .info_table caption,.controls h2, .header h2,.minifeed .headline h2 a,.search_type h2,.ubersearch .basic_search .bar_header  {color:#004725;} .profile .header, .header,.search_type h2,.ubersearch .basic_search .bar_header{background: #FBA029;border-top-color: #004725!important;}.wallpost .wallinfo,.share_contents .share_header {border-top-color: #004725!important;} .inputtext, .inputpassword, #q {border-color: #BDC7D8 !important;} .friendtable .actions a:hover{background-color: #004725;} #sidebar a.go_home, #sidebar a.go_home:hover {background: #004725 url('"+toplogo+"') no-repeat scroll center 12px; border-bottom: 5px solid #F84F10; height: 21px; color: #ffffff!important; font-family: Comic Sans MS; text-align: center; text-vertical-align: middle; font-size: 24pt} #sidebar a.go_home:hover {background:#004725 url('"+tophover+"') no-repeat scroll center bottom;} .profile .photos img:hover,#album img:hover{border-color: #F84F10}.group_dashboard .group_lists th{background-color: #004725;} html #content .welcome_buttons a:hover{background-color: #FBA029;}");

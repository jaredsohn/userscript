// ==UserScript==
// @name           zAlbee's Kongregate Night Mode
// @namespace      eby48yf8f82307blather
// @description    UserScript adaptation of zAlbee's bookmarklet: http://zalbee.intricus.net/kong-nightmode.html
// @version	   3.0	
// @include        http://www.kongregate.com/games/*/*
// @exclude        http://www.kongregate.com/games/*/*/*
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==

	GM_addStyle(
		'#floating_game_holder,.maincontent,#skin_left_of_game,#skin_right_of_game{background-color:#000;}'+
		'.game_comments .game_comment_form_lower, .game_discussions .game_discussions_links{background-image:linear-gradient(to bottom, #000000 0px, #000000 4px);background-color:#000;}'+
		'#kong_game_ui .users_in_room,#kong_game_ui .tabpane,chat_tabpane users_in_room clear,#kong_game_ui .chat_message_window{background-color:#000;}'+
		'chat_tabpane users_in_room clear{border:none;}'+
		'.user_row,.chat_room_template{background-color:#111;}'+
		'p.even{background:#111!important;}'+
		'#primarywrap{background-color:#000;color:#ccc;}'+
		'#secondary_wrap{background-color:#111;color:#ccc;}'+
		'#subwrap,#footer,#footer a{background-color:#000;color:#ccc;}'+
		'#maingame,#quicklinks li,#kong_game_ui ul.main_tabs{background-color:#111;color:#ccc;}'+
		'#kong_game_ui ul.main_tabs li.tab a.active{background-color:#000;color:#ccc;}'+
		'#chat_container,.tabpane{background-color:#000;color:#ccc;}'+
		'#kong_game_ui .room_name_container .room_name{color:#eee!important;}'+
		'#kong_game_ui .chat_room_tab.active a{background:#111;color:#ccc;}'+
		'#kong_game_ui .chat_room_tab a{background-color:#000;color:#ccc;}'+
		'.chat_message_window,.users_in_room{background-color:#111;color:#ccc;}'+		
		'#kong_game_ui .user_row .username{color:#ccc}'+
		'#kong_game_ui .chat_message_window .whisper{background-color:#113;color:#ccc;}'+
		'#kong_game_ui .chat_message_window .even{background-color:#000;color:#ccc;}'+
		'#kong_game_ui .chat_message_window .error_msg{background-color:#311;}'+
		'.chat_input{background-color:#111;color:#ccc;}'+
		'.cntrToggle{background:#111;color:#ccc;}'+
		'.panel_handle a{color:#ccc}'+
		'#kong_game_ui .accomplishment_vtabpane_content{background:#111;color:#ccc;border-color:#333;}'+
		'#kong_game_ui ul.accomplishment_vtabs li.vtab a{background:#111;color:#ccc;}'+
		'#kong_game_ui ul.accomplishment_vtabs li.vtab a.active{background:#111;color:#ccc;border-color:#333;}'+
		'#kong_game_ui .chat_promotion{background:#111;color:#ccc;}'+
		'#kong_game_ui .game_accomplishment .accomplishment_header .part_of_quest{background-color:#000;color:#ccc;}'+
		'#kong_game_ui .tabpane .contents_inner{background:#111;color:#ccc;}'+	
		'.cntrNotify{background-color:#000;color:#ccc;}'+
		'.regtext{background:#111;color:#ccc;}'+
		'#kong_game_ui .accomplishment_completed .check_tomorrow{background-color:#000;color:#ccc;}'+
		'#kong_game_ui .chat_actions_container select{background:#111;color:#ccc;}'+
		'select{background:#111;color:#ccc;border-color:#333;}'+
		'#high_scores_container .bucket,#high_scores_container table,#high_scores_container ul.high_score_tabs li.high_score_panel_tab a.active,#high_scores_container .pagination{background:#111;color:#ccc;}'+
		'#high_scores_container table td.username a{color:#ccc;}'+
		'#high_scores_container table tr.myscore td{background-color:#113;color:#ccc;}'+
		'#kong_game_ui #chat_room_chooser .rooms_list{background:#111;color:#ccc;}'+
		'#kong_game_ui #chat_room_chooser .rooms .room.even{background-color:#000;color:#ccc;}'+
		'#play.new_gamepage .game_page_wrap{background-color:#000;color:#ccc;}'+
		'.game_details_outer{background:#000;color:#ccc}'+
		'.game_tab_content{background-color:#111;color:#ccc;}'+
		'.game_comments .comments_type{background-color:#000;color:#ccc;}'+
		'.game_comments .comment .sender_name_link{background-color:#111;color:#ccc;}'+
		'.game_tabs_list{background-color:#000;color:#ccc;}'+
		'.game_tabs_item .game_tabs_link{background-color:#E8E8E8}'+
		'.pod_header{background-color:#111;color:#ccc;}'+
		'.game_comment_form_lower,.game_discussions_links{background:#111;color:#ccc}'+
		'.tag a{background-color:#000;color:#ccc;}'+
		'.post_tagline,.post_author{background-color:#000;color:#ccc;}'+
		'.post_message a{background-color:#111;color:#ccc;}'+
		'#gamespotlight_container{background-color:#000;color:#ccc;}'+
		'.game{color:#ccc}'+
		'#comment_content_0, #comment_content_1{background-color:#222;color:#ccc;border-color:#333;}'+
		'.comment_reply{background-color:#000;color:#ccc;}'
	);
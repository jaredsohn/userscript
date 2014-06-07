// ==UserScript== 

// @name         facebook chat 3.0
@namespace     Anonymoys

// @description  facebook chat 3.0

// @include         http://www.facebook.com/home.php?

// ==UserScript==

@name value


@-moz-document domain("facebook.com") {







/*### Customize Bar's opacity! ###*/







#presence{



opacity: 0.92 !important;



}







/*###  Values from 0.1 to 1 ! ####*/



/*################################*/











/*



______________________



1. IMAGES REDESIGNMENT



¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯



*/







/*1.1 Orb Redesignment*/







#presence .inner_button{



border: none !important;



}







#presence_applications_tab{



border: none !important; width: 50px !important;



height: 45px !important; margin-top: -15px !important;



z-index: 50 !important;



font-size: 0px !important;



background: transparent url("http://img156.imageshack.us/img156/9441/topfacebook.png") bottom left no-repeat !important;



}







#presence_applications_tab:hover{



background: transparent url("http://img156.imageshack.us/img156/9441/topfacebook.png") top left no-repeat !important;



}







#presence_applications_tab img{



display: none !important;



}







#presence_applications_tab span {



font-size: 0px !important;



background: none !important;



}









/*Balloon*/





#chat .tab_count,



#presence .presence_section .slider_num_missed,



#presence_bar #presence_notifications_count strong {



background: url(http://i865.photobucket.com/albums/ab218/Heartripper/Bgs/popB.png) top left no-repeat !important;



}







#presence .presence_section .slider_num_missed,



#presence_bar #presence_notifications_count strong{



right: 2px !important;



width: 20px !important;



}







/*Fixes*/







.icon_garden_elem {



width: 25px !important;



margin-top: -1px !important;



padding-top: 3px !important;



}







.icon_garden_elem:hover a {



background: none !important;



}







.icon_garden_elem:hover {



height: 30px !important;



background: url("http://img25.imageshack.us/img25/7014/barraazul2.png") top left no-repeat !important;



margin-top: -1px !important;



}







/*1.3 Chat icon Redesignment*/







#buddy_list_parent .available_dot,



#chat_tab_bar .tab_button_div .tab_name{



background: url("http://i865.photobucket.com/albums/ab218/Heartripper/Icons/chatOnline.png") center left no-repeat !important;



padding: 3px 0px 0px 19px !important;



}







#chat_tab_bar .disabled .tab_button_div .tab_name{



background: url("http://i865.photobucket.com/albums/ab218/Heartripper/Icons/chatOffline.png") center left no-repeat !important;



padding: 3px 0px 0px 19px !important;



}







#buddy_list_parent .idle .available_dot,



#chat_tab_bar .idle .tab_button_div .tab_name {



background: url("http://i865.photobucket.com/albums/ab218/Heartripper/Icons/chatIdleS.png") center left no-repeat !important;



padding: 3px 0px 0px 19px !important;



}







#chat_tab_bar .typing .tab_name {



background: url("http://img156.imageshack.us/img156/9441/topfacebook.png") center left no-repeat !important;



padding: 3px 0px 0px 19px !important;



}







#presence_notifications_tab>* {



background: transparent !important;



}







#chat_status_control_tab img{



width: 0 !important;



height: 51px !important;



margin-top: -2px !important;



padding-left: 135px !important;



}







#presence_popout_section,



#presence_error_section{



height: 29px !important; width: 35px !important; 



background: transparent url("http://img156.imageshack.us/img156/9441/topfacebook.png") top left no-repeat !important;



margin: 0px !important;



border: 0px !important;



}







#presence_popout_section:hover,



#presence_error_section:hover{



background: transparent url("http://img156.imageshack.us/img156/9441/topfacebook.png") top left no-repeat !important;



}







#presence_popout_section:hover .presence_bar_button{



background: none !important;



}







#presence_popout_section .sx_icons_popout_window{



margin: 6px 0px 0px 3px !important;



}







#presence_popout_section .sx_icons_im{



margin: 8px 0px 0px 3px !important;



}







.presence_bar_button{



border: none !important;



}







/*



___________________



2. BAR REDESIGNMENT



¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯



*/







/*### 2.1 General BG ###*/







#presence{



height: 30px !important;



width: 100%;



margin-left: 0px !important;



}







#presence_ui{



width: 100%;



margin-left: 0px !important;



}







#presence_bar{



height: 60px !important;



background: transparent url(http://img156.imageshack.us/img156/9441/topfacebook.png) top left repeat-x !important;



z-index: 40;



}







.UITooltip_Wrap,



.titletip{



margin-bottom: 0px !important;



background: transparent !important;



}







.UITooltip_Text,



.titletip strong{



height: 12px !important;



padding-top: 2px !important;



border: 1px solid #767676 !important;



-moz-border-radius: 3px;



background: #fefefe !important;



color: #575776 !important;



}











/*### 2.3 Right Bar ###*/



#chat_tab_bar .chat_shadow_input, #chat_tab_bar .chat_window .chat_input{



background: url('http://i865.photobucket.com/albums/ab218/Heartripper/Icons/iconMail16.png') 4px center no-repeat !important;



}



#buddy_list .buddy_list_typeahead #buddy_list_typeahead_input {



-moz-appearance: none !important;



background: url('http://i865.photobucket.com/albums/ab218/Heartripper/Icons/iconFind16.png') 4px center no-repeat !important;



border: none !important;



}







#buddy_list_tab{



background: transparent url("http://img156.imageshack.us/img156/9441/topfacebook.png") top left no-repeat !important;



height: 30px !important; width: auto !important;



color: white !important;



border: none !important;



position: relative !important;



margin: 0px 8px 0px 0px !important;



padding: 0px !important;



}







#buddy_list_tab img{



display: none !important;



}







#buddy_count{



background: url("http://img156.imageshack.us/img156/9441/topfacebook.png") top right no-repeat !important;



line-height: 24px !important;



display: block !important;



margin-top: -3px !important;



padding: 3px 14px 9px 11px !important;



}







.focused #buddy_count{



margin-top: -4px !important;



}







#buddy_count .buddy_count_num{



background: url(http://img156.imageshack.us/img156/9441/topfacebook.png) center left no-repeat !important;



padding-left: 20px !important;



}







body:not(.presence_popout) .tab_handle{



height: 30px !important; 



background: url("http://img156.imageshack.us/img156/9441/topfacebook.png") top left no-repeat !important;



color: white !important;



border: none !important;



margin: 0px 4px 0px 0px !important;



}







body:not(.presence_popout) .tab_button_div{



height: 30px !important; 



background: transparent url("http://img156.imageshack.us/img156/9441/topfacebook.png") top right no-repeat !important;



color: white !important;



border: none !important;



position: fixed !important;



bottom: 0px !important;



}







#buddy_list_tab:hover,



body:not(.presence_popout) #chat_tab_bar .tab_handle.focused,



body:not(.presence_popout) #chat_tab_bar .tab_handle:hover { 



background: url("http://img651.imageshack.us/img651/1033/barragris.png") top left no-repeat !important;



}







#buddy_list_tab:hover #buddy_count,



body:not(.presence_popout) #chat_tab_bar .tab_handle:hover .tab_button_div,



body:not(.presence_popout) #chat_tab_bar .tab_handle.focused .tab_button_div{ 



background: url("http://img156.imageshack.us/img156/9441/topfacebook.png") top right no-repeat !important;



}







.tab_button_div .tab_x{



background: none !important;



padding-right: 4px !important;



margin-top: 6px !important;



}







.tab_button_div .tab_x:after{



content: "x" !important;



font-family: tahoma !important;



font-size: 13px !important;



}







#chat_tab_bar .tab_count {



right: 5px !important;



top: -10px !important;



background: url('http://i865.photobucket.com/albums/ab218/Heartripper/Bgs/popB.png') top center no-repeat !important;



width: 16px !important;



padding-right: 2px !important;



}







.tab_button_div .tab_x:hover:after{



content: "x" !important;



color: red !important;



}







.tab_name{



margin-top: 2px !important;



}







.tab_availability{



display: none !important;



}







#buddy_list_tab span span strong {



color: white !important;



}







#buddy_list_tab,



#presence_applications_icon_garden {



border-color: transparent !important;



}







#chat_status_control_tab,



#presence_notifications_tab{



height: 29px !important;



margin-right: 0px !important;



border: none !important;



background: transparent url("") top left no-repeat !important;



}







#presence_notifications_tab{



margin-top: 0px !important;



width:35px !important;



}







#chat_status_control_tab{



border: none !important;



margin: 0px !important;



padding: 6px 0px 0px 10px !important;



width: 25px !important;



}







#presence_notifications_tab .inner_button{



margin: 3px 0px 0px 0px !important;



background: url("http://img25.imageshack.us/img25/7014/barraazul2.png") center center no-repeat !important;



width: 24px !important;



}







#chat_status_control_tab:hover,



#presence_notifications_tab:hover{



background: transparent url("") top left no-repeat !important;



}







#presence_notifications_tab .sx_icons_notifications{



visibility: hidden !important;



}







#chat_status_control_tab .titletip{



margin-bottom: -6px !important;



}







#prev_count, #next_count{display: none !important;}







#chat_next_tab, #chat_previous_tab{



height: 30px !important;



margin-top: -5px !important;



border: 0px !important;



}







#chat_previous_tab{



background: url("http://img175.imageshack.us/img175/6571/derecha.png") center center no-repeat !important;



}







#chat_next_tab{



background: url("http://img85.imageshack.us/img85/5731/izquierda.png") center center no-repeat !important;



}







#chat_previous_tab:hover{



background: url("http://img175.imageshack.us/img175/6571/derecha.png") center center no-repeat !important;



}







#chat_next_tab:hover{



background: url("http://img85.imageshack.us/img85/5731/izquierda.png") center center no-repeat !important;



}







#chat_previous_tab,



#chat_next_tab{



margin-top: 0px !important;



}







#chat_previous_tab span,



#chat_next_tab span{



display: none !important;



}







/*



____________________________



3. FLYOUT MENUS REDESIGNMENT



¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯



*/







/*## 3.1 General ##*/







.presence_menu_opts_wrapper{



margin-bottom: 34px !important;



z-index: 30 !important;



}







body:not(.presence_popout) .chat_window,



body:not(.presence_popout) .presence_menu_opts{



border: 1px solid #484a4c !important;



border-width: 0px 1px 0px 1px !important;



background: #404448 url("http://img156.imageshack.us/img156/9441/topfacebook.png") top left repeat-x !important;



color: #ffffff !important;



border: 2px solid transparent !important;



-moz-border-bottom-colors: transparent transparent !important;



-moz-border-left-colors: #282b2e rgba(255,255,255,0.6) !important;



-moz-border-right-colors: #282b2e rgba(255,255,255,0.6) !important;



-moz-border-top-colors: #282b2e  rgba(255,255,255,0.6) !important;



-moz-border-radius: 10px 10px 0px 0px !important;



}







#presence_bar .presence_menu_opts h2{



background: url(http://www.facebook.com/images/chat/minimize.gif) no-repeat scroll right top !important;



border: none !important;



padding: 3px !important;



margin-right: 10px !important;



width: auto !important;



}







#presence_bar .presence_menu_opts h2:hover{



background-position:right -16px !important;



}







/*### 3.2 Applications Menu ###*/







#presence_bar .application_menu_divider{



color: black !important;



border: none !important;



font-size: 12px !important;



font-family: verdana;



}







#presence_applications .presence_menu_content_wrapper:after{



content: "• VUS4FB |@Taskbar - v0.8.1| •";



margin-left: 38px !important;



color: #a1a1a1 !important;



}







.flyout,



#presence_applications .presence_menu_content_wrapper{



background: white !important;



margin: 5px !important;



border: 2px solid transparent !important;



-moz-border-bottom-colors: transparent transparent !important;



-moz-border-left-colors: #bababa #3a3a3a !important;



-moz-border-right-colors: #bababa #3a3a3a !important;



-moz-border-top-colors: #bababa #3a3a3a !important;



-moz-border-bottom-colors: #bababa #3a3a3a !important;



-moz-border-radius: 2px !important;



}







#presence_applications .presence_menu_content_wrapper a{



color: #5a5a5a !important;



}







.application_menu_header .right,



.application_menu_header .left{



width: 210px !important;



float: left !important;



text-align: center !important;



}







.application_menu_header .right a{



color: #afe9ff !important;



}







.application_menu_header{



background: none !important;



}







.application_menu_logoless_item a{



color: white !important;



}







/*### 3.3 Chat Panel ###*/







#buddy_list_panel{



-moz-appearance: -moz-win-communications-toolbox !important;



border: none !important;



}







#buddy_list_panel a.panel_item span{



text-shadow: none !important;



font-weight: normal !important;



font-size: 11px !important;



padding: 2px 4px 5px 4px !important;



}







#buddy_list_panel .flyout_open a.panel_item span{



background: rgba(0,0,0,0.3) !important;



}







#options_item, #lists_item,



#buddy_list_panel .lists,



#buddy_list_panel .settings,



#buddy_list_panel .panel_item{



background: none !important;



border: none !important;



}







#buddy_list_all .friendlist_status,



#buddy_list_all .friendlist_status a{



background: none !important;



}







#options_item,



#lists_item{



color: white !important;



}







#buddy_list_panel .panel_icon{



display: none !important;



}







#buddy_list_typeahead{



background: none !important;



}







#buddy_list_typeahead_input,



#buddy_list_empty_search{



-moz-appearance: none !important;



background: url(http://img651.imageshack.us/img651/1033/barragris.png) top left repeat-x !important;



border: 1px solid #1e1e1e!important;



-moz-border-radius: 5px !important;



}







.friend_status strong{



color: #afe9ff !important;



font-weight: bold !important;



}







.friend_status span{



color: rgba(255,255,255, 0.7) !important;



}







.online_status_container{



background: none !important;



}











#buddy_list_parent .idle .available_dot,



#buddy_list_parent .available_dot{



padding: 3px 0px 0px 10px !important;



}







/*FriendLists*/







#buddy_list_parent .friend_list{



background: rgba(0,0,0,0.3) !important;



-moz-border-radius: 3px !important;



margin: 3px !important;



}







#buddy_list_parent .friend_list_container li{



background: none !important;



}







.presence_menu_opts .list_select li>a:hover{



background: rgba(0,0,0,0.2) !important;



} 







#buddy_list_all .friendlist_status a{



color: white !important;



}







#buddy_list_all .friendlist_status{



border: none !important;



}







#reorder_fl_alert{



background: none !important;



}







#buddy_list_empty_item{



color: white !important;



}







/*### 3.4 Conversations ##*/







body:not(.presence_popout) #chat{



margin-right: 10px !important;



}







body:not(.presence_popout) .chat_window_wrapper{



background: none !important;



}







body:not(.presence_popout) .chat_window {



margin-bottom: 6px !important;



}







body:not(.presence_popout) .chat_info_pic{



width: 48px !important;



height: 48px !important;



padding: 10px !important; padding-left: 8px !important;



margin-top: -13px !important; margin-left: 5px !important;



background: transparent url("http://img651.imageshack.us/img651/1033/barragris.png") -2px 3px no-repeat !important;



}







body:not(.presence_popout) .idle .chat_info_pic{



background-position: -67px 3px !important; 



}







body:not(.presence_popout) .disabled .chat_info_pic{



background-position: -133px 4px !important; 



}







body:not(.presence_popout) .chat_header{



height: 5px !important;



}







body:not(.presence_popout) .chat_header_name{



margin-left: 70px !important;



}







.chat_header_name a{



color: #afe9ff !important;



}







.chat_header, .chat_info, .chat_conv, .chat_conv_content .visibility_change{



background: none !important;



border: none !important;



}







body:not(.presence_popout) .chat_conv_content .visibility_change{



color: white !important;



margin: 0px 10px 0px 8px !important;



}







body:not(.presence_popout) .chat_info{



float: left !important;



width: 200px !important;



margin: 1px 10px 5px 13px !important;



padding: 0px !important;



}







body:not(.presence_popout) .chat_window .toolbox{



background: none !important;



margin-top: 20px !important;



border: none !important;



}







body:not(.presence_popout) .chat_window .toolbox .chat_actions{



border: none !important;



}







body:not(.presence_popout) .chat_window .toolbox .action{



color: white !important;



}







body:not(.presence_popout) .chat_conv_content .body a{



color: #afe9ff !important;



}







body:not(.presence_popout) .chat_info_status{



color: white !important;



}







.chat_info_status_time{



color: #afe9ff !important;



margin: 0px !important;



}







body:not(.presence_popout) .chat_conv{



border-top: 1px solid rgba(255,255,255,0.6) !important;



margin-left: 0px !important;



}







body:not(.presence_popout) .p_other,



body:not(.presence_popout) .chat_info_clear_history,



body:not(.presence_popout) .chat_conv .other,



body:not(.presence_popout) .chat_conv .other a{



border: none !important;



color: orange !important;



}







body:not(.presence_popout) .p_self,



body:not(.presence_popout) .chat_conv .self {



color: #afe9ff !important;



border: none !important;



}







body:not(.presence_popout) .chat_input_div{



margin: 8px 4px 2px 4px !important;



width: 216px !important;



background: white url(http://img651.imageshack.us/img651/1033/barragris.png) bottom left repeat-x !important;



border: 1px solid #1e1e1e!important;



-moz-border-radius: 5px !important;



}











body:not(.presence_popout) .chat_input_border{



background: none !important;



}







body:not(.presence_popout) .chat_input_div textarea{



-moz-appearance: none !important;



border: none !important;



}







.minifeed{



background: none !important;



border: none !important;



}







.minifeed .UIStory{



-moz-border-radius: 4px !important;



padding: 4px !important;



}







.msg_error,



.chat_notice{



background: rgba(255,255,255,0.2) !important;



border: none !important;



}















/*### 3.5 Notifies ###*/







#presence_notifications_content .notification,



#presence_notifications_content .notification .body{



border: none !important;



background: none !important;



color: rgba(255,255,255,0.7) !important;



}







#presence_notifications_content .notification:hover{



background: rgba(255,255,255,0.1) !important;



}







.presence_notifications_see_all,



#presence_notifications_content .notification .body a{



color: #afe9ff !important;



font-weight: bold !important;



}







.notif_del{



background: none !important;



}







.notif_del:before{



content: "x" !important;



font-family: tahoma !important;



font-size: 12px !important;



color: white !important;



}







.notif_del:hover:before{



content: "x" !important;



color: red !important;



}







/*### THE END ###*/



}


// ==/UserScript==
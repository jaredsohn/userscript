// ==UserScript==
// @name        ForumFree WebChat Mini
// @namespace   FF
// @description Include la webchat in tutte le pagine
// @include     http*://*.forumcommunity.net/*
// @include     http*://*.blogfree.net/*
// @include     http*://*.forumfree.it/*
// @exclude     http*://*.forumcommunity.net/?act=Msg*
// @exclude     http*://*.forumcommunity.net/?act=UserCP*
// @exclude     http*://*.forumcommunity.net/*cid=*
// @exclude     http*://*.forumfree.it/?act=Msg*
// @exclude     http*://*.forumfree.it/?act=UserCP*
// @exclude     http*://*.forumfree.it/*cid=*
// @exclude     http*://*.blogfree.net/?act=Msg*
// @exclude     http*://*.blogfree.net/?act=UserCP*
// @exclude     http*://*.blogfree.net/*cid=*
// @version     1.0
// ==/UserScript==
/**
 @creator: IAL32
 @company: ffmagazine.forumfree.it
 @website: http://ffmagazine.forumfree.it/
 */
if(null == document.getElementById("chat_show")) { //questa linea non e' da modificare
    //Potete scegliere se aprire la chat al caricamento della pagina oppure no cambiando da true( mostra ) false ( nascondi )
    window["chatShowOnStart"] = false;
    /* CSS per la chat in stile Facebook */
    var daCSS = document.createElement("style");
    daCSS.type = "text/css";
    daCSS.innerHTML = "\
    #chat_show,#chat_main{width:240px !important;background:#ebeef4 !important;box-shadow:0 0 2px rgba(0,0,0,.5) !important;border-radius:2px !important}\
    .chat_start_button,.chat_start_button:hover{color:#333 !important}\
    #chat_window,#chat_status{width:240px !important}\
    .chat_page{position:absolute;width:420px !important;right:340px;top:-30px;box-shadow:0 0 3px rgba(0,0,0,.5) !important;height:431px !important;background:#FFF;display:none}\
    #chat_window{top:30px;box-shadow:none !important}\
    #chat_main{height:430px !important;z-index:9 !important}\
    #chat_status{background:#FFF !important;box-shadow:none !important}\
    #chat_friends_header{border-bottom:1px solid #c4c4c4;border-top:0;background:#ebebeb;background:-moz-linear-gradient(top,#f6f6f6 0,#ebebeb 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0,#f6f6f6),color-stop(100%,#ebebeb));background:-webkit-linear-gradient(top,#f6f6f6 0,#ebebeb 100%);background:-o-linear-gradient(top,#f6f6f6 0,#ebebeb 100%);background:-ms-linear-gradient(top,#f6f6f6 0,#ebebeb 100%);background:linear-gradient(to bottom,#f6f6f6 0,#ebebeb 100%);filter:progid:dximagetransform.microsoft.gradient(startcolorstr='#F6F6F6',endColorstr='#EBEBEB',GradientType=0)}\
    #chat_audio_button{position:absolute !important;right:6px;top:32px;z-index:1;float:none !important}\
    .chat_unread_messages{background-color:rgba(151,210,224,.4) !important;right:0 !important;border-radius:0 !important}\
    .chat_nick_list a{color:#333 !important}\
    .chat_nick_list a:hover{color:#333 !important}\
    .chat_friend_offline_list a{color:#848484 !important}\
    #chat_conversations{width:0 !important;height:0 !important;margin:0 !important;padding:0 !important;right:-90px}\
    #chat_hide>.chat_start_button>span::after{content:'' !important;background:url(http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png) no-repeat !important;padding:8px 9px !important;display:inline-block;background-position:-155px 1px !important}\
    #chat_show{text-align:right !important}\
    #chat_show>.chat_start_button{margin-right:8px}\
    #chat_show>.chat_start_button>span::after{content:'' !important;background:url(http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png) no-repeat !important;padding:8px 9px !important;display:inline-block;background-position:-169px 1px !important}\
    #chat_friends_header p::before{content:'' !important;background:url(http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png) no-repeat !important;padding:8px 9px !important;display:inline-block;background-position:-18px 1px !important}\
    .chat_conversation_input_options_emoticons_box{bottom:45px !important;right:0 !important;left:auto !important;padding:0 !important;border:1px solid #3b5998 !important;border-bottom:2px solid #293e6a !important;width:270px !important;box-shadow:none !important;border-radius:0 !important;background:#FFF !important}\
    .chat_conversation_input_options_emoticons_box>ul{padding:0}\
    .chat_time{background:none !important;color:#999 !important}\
    .chat_nick{color:#333 !important;font-weight:bold;font-size:16px !important}\
    .chat_conversation_main::-webkit-scrollbar-thumb,#chat_friends_list::-webkit-scrollbar-thumb{border-radius:15px;border:1px solid #999 !important;box-shadow:inset 1px 1px 1px rgba(255,255,255,0.35);background:-webkit-linear-gradient(left,#CCC 0,#999 100%)}\
    #chat_friends_list::-webkit-scrollbar-track,.chat_conversation_main::-webkit-scrollbar-track{background-color:#FFF !important;border:0 !important}\
    #chat_friends_list>div:hover{background-color:#e0e4ee !important}\
    .chat_conversation_input{border-top:1px solid rgba(0,0,0,.3)}\
    .chat_conversation_input>textarea{border:0 !important;outline:none !important}\
    .chat_conversation_header{background:#6d84b4;border:1px solid #3d5a99}\
    .chat_conversation_header span{color:#FFF !important;font-weight:bold;font-size:14px !important;line-height:36px !important;height:37px !important;margin:0 !important;padding-left:10px !important}\
    .chat_conversation_main:before{display:none}\
    .chat_discussion{padding:5px !important}\
    #chat_friends{padding-top:0 !important}\
    .chat_friend_list>.chat_avatar{border-radius:0}\
    #chat_friends_header p{font-size:11pt !important;padding-left:10px}\
    .chat_conversation_input_options{height:45px !important;width:30px !important}\
    .chat_conversation_input_options:active{background:#6d84b4}\
    .chat_conversation_input_options_emoticons{background:url(\"http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png\")no-repeat !important;background-position:-37px -1px !important;width:14px !important;height:14px !important;margin:14px 7px}\
    .chat_conversation_input_options_emoticons:active{background-position:-51px -1px !important}\
    .chat_conversation_close{margin:0 !important;height:38px;width:28px}\
    .chat_conversation_close:hover{background:#4a6399}\
    .chat_conversation_close span{background:url(\"http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png\")no-repeat !important;padding:5px !important;height:1px !important;background-position:-67px -2px !important;font-size:0 !important;margin:auto !important}\
    .chat_conversation_close:hover span{background-position:-78px -2px !important;font-size:0 !important}\
    .chat_conversation_toolbox{position:absolute;right:30px}\
    .chat_conversation_toolbox>li{border-radius:0 !important;padding:0 !important;margin-left:0 !important;background:transparent !important;border:0 !important;height:38px;width:28px;text-align:center;vertical-align:middle;line-height:35px}\
    .chat_conversation_toolbox>li:hover{background:#4a6399 !important}\
    .chat_conversation_toolbox_profile_forumfree a,.chat_conversation_toolbox_profile_forumcommunity a,.chat_conversation_toolbox_profile_blogfree:hover a,.chat_conversation_toolbox_ignore a{font-size:0 !important;background:url(http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png) no-repeat;height:14px;width:14px;padding:9px;margin:auto;background-position:-89px 3px}\
    .chat_conversation_toolbox_profile_forumfree:hover a,.chat_conversation_toolbox_profile_forumcommunity:hover a,.chat_conversation_toolbox_profile_blogfree:hover a{background-position:-107px 3px}\
    .chat_conversation_toolbox_ignore a{background-position:-124px 2px !important;padding:8px !important}\
    .chat_conversation_toolbox_ignore:hover a{background-position:-138px 2px}\
    .chat_discussion a,.chat_contacts_incoming a{color:#6d84b4 !important}\
    .chat_discussion a:hover,.chat_contacts_incoming a:hover{color:#3d5a99 !important}\
    #chat_contacts_manager{text-align:center}\
    #chat_contacts_requests,#chat_contacts_incomings{text-align:left !important}\
    #chat_contacts_request_button{width:50% !important;margin:5px auto !important;background:#d5d5d5 !important;color:#666 !important}\
    #chat_contacts_request_button:hover{width:50% !important;margin:5px auto !important;background:#CCC !important;color:#666 !important}\
    #chat_contacts_incomings_header>span:before,#chat_contacts_requests_header>span:before{content:'' !important;background:url(http://digilander.libero.it/ffmagazine/webchat_fb/sprite_fb.png) no-repeat !important;padding:9px !important;display:inline-block;background-position:-188px 4px !important;margin:0 5px !important}\
    #chat_request_counter{color:#3d5a99 !important}\
    #chat_contacts_manager h3{color:#FFF !important}\
    #chat_friends_header{padding:0 !important}\
    #chat_hide,#chat_contacts_manager h3{background:#6d84b4;padding-right:9px;border:1px solid #3d5a99;margin-right:0 !important;padding-bottom:1px}\
    #chat_hide .chat_start_button{color:#FFF !important}\
    .chat_conversation_active{background:#e0e4ee !important}\
    .chat_conversation_input_options_emoticons_box>ul>li{display:inline-block !important;float:none !important}\
    #chat_notification{right:14px !important;bottom:8px !important}\
    #chat_notify_message{right:245px !important}\
    .chat_message_avatar{display:block !important;width:30px !important;height:30px !important;border-radius:2px}";
    document.getElementsByTagName('head')[0].appendChild(daCSS);
    /* NON MODIFICARE OLTRE QUESTO PUNTO */
    var execute=function(body){if(typeof body==="function"){body="("+body+")();";}var el=document.createElement("script");el.textContent=body;document.body.appendChild(el);return el;};execute(function(){var getScript=window.jQuery.getScript;jQuery.getScript=function(resources,callback){var length=resources.length,handler=function(){counter++},deferreds=[],counter=0,idx=0;for(;idx<length;idx++){deferreds.push(getScript(resources[idx],handler))}jQuery.when.apply(null,deferreds).then(function(){callback && callback()})};var wCMiniUrls=["http://irc.forumfree.it/chat/Scripts/Protocol.js","http://irc.forumfree.it/chat/Scripts/ChatEngine.js"];$.getScript( wCMiniUrls );});
}
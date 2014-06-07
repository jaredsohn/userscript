// ==UserScript==
// @name        Tickler chat
// @namespace   tag://kongregate
// @description Chat for the ticklers guilds (requires Chilly Foundation)
// @author      Chillyskye
// @version     0.1.1
// @date        08.03.2014
// @grant       none
// @include     http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// ==/UserScript==

function init_ticklerChat() {
    TicklerChat = {
        init: function() {
            console.log("[Tickler Chat] Initializing");
            TicklerChat.loadHTML();
            TicklerChat.loadCSS();
            TicklerChat.loadTriggers();
            Chilly.loadWhenHolodeckReady('TicklerChat.loadChat()');
        },
        loadHTML: function() {
			jQuery('<div/>', {id: 'tickler_chat'}).insertAfter('#flashframecontent');
            jQuery('<div/>', {id: 'tickler_chat_head', text: 'Tickler\'s Chat'}).appendTo('#tickler_chat');
            jQuery('<div/>', {id: 'tickler_chat_container'}).appendTo('#tickler_chat');
            jQuery('<div/>', {id: 'tickler_chat_tabs'}).appendTo('#tickler_chat_container');
            jQuery('<div/>', {id: 'tickler_chat_window'}).appendTo('#tickler_chat_container');
            jQuery('<div/>', {id: 'tickler_chat_log'}).appendTo('#tickler_chat_window');
            jQuery('<div/>', {id: 'tickler_chat_input_container'}).appendTo('#tickler_chat_window');
            jQuery('<textarea/>', {id: 'tickler_chat_input'}).appendTo('#tickler_chat_input_container');
        },
        loadChat: function() {
            TicklerChat.username = holodeck.username();
            TicklerChat.autoLogin();
        },
        loadTriggers: function() {
            jQuery('#tickler_chat_input').bind('keypress',function(e) {
                var code = e.keyCode || e.which;
                if(code == 13) {
                    e.preventDefault();
                    TicklerChat.sendMessage(jQuery('#tickler_chat_input').val());
                    jQuery('#tickler_chat_input').val('');
                    
                }
            });
        },
        autoLogin: function() {
            TicklerChat.login({'hash': 'something'});
        },
        login: function(d) {
            jQuery.ajax({
                url:"http://dotd.chillyskye.dk/tickler/chat/login.php",
                dataType: 'jsonp',
                data: {'username': TicklerChat.username, 'hash': d.hash, 'password': d.password},
                success:function(json){
                    console.log('[Tickler Chat] Logged in');
                    TicklerChat.getMessages();
                }
            });
        },
        sendMessage: function(message) {
            jQuery.ajax({
                url:"http://dotd.chillyskye.dk/tickler/chat/sendmessage.php",
                dataType: 'jsonp',
                data: {'message': message}
            });
        },
        getMessages: function() {
            jQuery.ajax({
                url:"http://dotd.chillyskye.dk/tickler/chat/getmessages.php",
                dataType: 'jsonp',
                data: {'lastpost':TicklerChat.lastPost},
                success:function(json){
                    jQuery.each(json.messages, function(index, message) {
                        TicklerChat.displayMessage(message);
                        TicklerChat.lastPost = message.id;
                    });
                    setTimeout(TicklerChat.getMessages,100);
                }
            });
        },
        displayMessage: function(message) {
            var scroll = false;
            if (jQuery('#tickler_chat_log').height()+jQuery('#tickler_chat_log').scrollTop() == jQuery('#tickler_chat_log')[0].scrollHeight) {
            	scroll = true;
            }
            var messageDom = jQuery('<div/>', {class: 'tickler_chat_message'}).appendTo('#tickler_chat_log');
            jQuery('<div/>', {class: 'tickler_chat_message_timestamp', text: '['+Chilly.timestamp(message.timestamp)+']'}).appendTo(messageDom);
            jQuery('<div/>', {class: 'tickler_chat_message_username', text: message.username}).appendTo(messageDom);
            jQuery('<div/>', {class: 'tickler_chat_message_spacer', text: ':'}).appendTo(messageDom);
            jQuery('<div/>', {class: 'tickler_chat_message_text', text: message.message}).appendTo(messageDom);
            if (scroll) {
            	jQuery('#tickler_chat_log').scrollTop(jQuery('#tickler_chat_log')[0].scrollHeight);
            }
        },
        loadCSS: function() {
var css = '\
#tickler_chat {width:250px; height:100%; float:left; padding-left:3px; text-align: left;}\
#tickler_chat_head {color:#fff; height:26px;}\
#tickler_chat_container {height:690px}\
#tickler_chat_tabs {height: 25px;}\
#tickler_chat_tab {height: 25px; float:right; display:inline-block; background-color:#dedede; line-height:25px; padding-left:7px; padding-right:7px;}\
#tickler_chat_tab.active {margin: 1px}\
#tickler_chat_window {background-color:#999; height:655px; padding:5px}\
#tickler_chat_log {background-color:#fff; height:600px; margin-bottom:5px; overflow-y:scroll}\
#tickler_chat_input_container {height:50px}\
#tickler_chat_input {background-color:#eee; border:0; padding:5px; width:-moz-calc(100% - 10px); width:-webkit-calc(100% - 10px); width:calc(100% - 10px); height:40px; resize: none}\
.tickler_chat_message {clear:both; padding:5px; border-bottom: 1px solid #ddd; float:left; width:-moz-calc(100% - 10px); width:-webkit-calc(100% - 10px); width:calc(100% - 10px);}\
.tickler_chat_message > div {float:left}\
.tickler_chat_message_timestamp {color: #ccc; margin-right: 2px}\
.tickler_chat_message_username {color: #77f;}\
.tickler_chat_message_spacer {margin-right: 4px}\
';
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            
            style.type = 'text/css';
            if (style.styleSheet){
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }
            
            head.appendChild(style);
        }
    }
    TicklerChat.init();
}

function ChillyCheck(){
    var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
	if (window.Chilly) {
		var script = document.createElement('script');
        script.appendChild(document.createTextNode('('+ init_ticklerChat +')();'));
        (document.body || document.head || document.documentElement).appendChild(script);
	} else {
		console.log('[Tickler Chat] Missing Chilly Foundation');
	}
}

setTimeout(ChillyCheck, 0);
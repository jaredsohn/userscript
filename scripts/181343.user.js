// ==UserScript==
// @name       Chat Syncer
// @namespace  http://careers.stackoverflow.com/boris-churzin
// @version    1.4
// @updateURL  http://userscripts.org/scripts/source/181343.user.js
// @description  Syncs tiberium alliances (for now) chat with gtalk (for now)
// @include	https://www.tiberiumalliances.com/*
// @include	https://*.alliances.commandandconquer.com/*
// @copyright  2012+, Boris Churzin
// ==/UserScript==

GROUP_TOKEN = 'beehive';

messages_done = {};
setInterval(check_messages, 1000);   

function check_messages() {
    messages = [];
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; ++i) {
 		if (spans[i].id.match("CHAT_SENDER")) {
            messages.push(spans[i].parentNode);
		}
	}
    for(var i = 0; i < messages.length; i++) {
        if(messages[i].innerHTML.match("\\[Alliance\\]") || messages[i].innerHTML.match("\\[Officers\\]")) {
            if(!messages_done[messages[i].innerHTML]) {
                messages_done[messages[i].innerHTML] = true;
                console.log("Chat Syncer, sent from: " + messages[i].children[0].innerHTML);
                console.log("Chat Syncer, message: " + messages[i].children[1].innerHTML);
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "http://chat-syncer.herokuapp.com/message/" + GROUP_TOKEN + "/" + messages[i].children[0].innerHTML + "/" + escape(messages[i].children[1].innerHTML)
                }); 
            }
        }
    }
}
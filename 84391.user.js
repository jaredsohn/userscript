// ==UserScript==
// @name			JTV Chatroom Catcher For NicoLime
// @author			frank38
// @version			0.8
// @namespace		
// @description		For NicoLime only
// @include			http://*.justin.tv/*
// ==/UserScript==

// v0.6 support multi channels
// v0.7 ..
// v0.8 support custom name script (0.4).

jScript = function () {
	if (!document.getElementById('chat_line_list'))
		return
	
	/*for custom name*/
	if (!localStorage["JTV_CUSTOM_NAME"] ) 
		localStorage.setItem("JTV_CUSTOM_NAME", JSON.stringify({}));

	var cNameList = JSON.parse(localStorage.getItem("JTV_CUSTOM_NAME"));
	/***************/
	
	var config = getCookie('jtvcc_config');

	//first use
	if(!config) {
		var targetChannel = prompt('Target channel name:\nComma Delimited Format\n(ex: CH1,aa2,Channel3....)','');
		if (targetChannel) {
			addCookie('jtvcc_config', targetChannel);
		}
		else
			return;
	}

	var chatRoom = document.getElementById('chat_line_list');
	var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	
	b = document.createElement('button');
	b.className = 'pretty_button spacer small';
	b.innerHTML = '<span class="main" title="change target channel.">NicoLime</span>';
	b.setAttribute('onclick', 'javascript:(function(){'+ setConfig.toString() + addCookie.toString() + getCookie.toString() + ' setConfig();})();');

	document.getElementById('chat_section_chatroom').appendChild(b);
	
	//in broadcasting or popout page
	if (config.match(window.location.pathname.substring(1)) || config.match(window.location.search.substring(1).match(/channel=([^&]+)/)[1])) {
		chatRoom.addEventListener("DOMNodeInserted", newChat, false);
	}
	
	function newChat(event) {
		var msg = '';
		var nickName = '';
		var	newChat = document.evaluate('//*[@id="chat_line_list"]/*[last()]', this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if (newChat.snapshotLength == 0)
			return;
		if(newChat.className.match('fromjtv'))
			return;
		
		if(newChat.getElementsByClassName('chat_line').length < 2) {
			msg = newChat.getElementsByClassName('chat_line')[0].textContent;
		}
		else {
			msg = newChat.getElementsByClassName('chat_line')[newChat.getElementsByClassName('chat_line').length-1].textContent.substring(1);
		}
		nickName = newChat.getElementsByClassName('nick')[0].textContent;

		sendChat(nickName, msg);
	}

	function sendChat(nickName, msg) {
			
			cNameList = JSON.parse(localStorage.getItem("JTV_CUSTOM_NAME"));
			
			if(cNameList[nickName]) {
				nickName = cNameList[nickName];
			}
			w.setTimeout(function() {
				try {
					jQuery.ajax({
						type: 'GET',
						url: 'http://localhost:6225/?c=' + escape('what') + '&n=' + escape(nickName) + '&m=' + escape(nickName) + ' : ' + escape(msg),
						//url: 'http://localhost:6225/?c=' + escape('what') + '&n=' + escape(nickName) + '&m=' + escape(msg),
						success:function(msg) {
						}
					});
				}catch(x){}
			}, 0);
	}
	
	function setConfig() {
		targetChannel = prompt('Target channel name:\nComma Delimited Format\n(ex: CH1,aa2,Channel3....)',getCookie('jtvcc_config'));
		if (targetChannel)
			addCookie('jtvcc_config', targetChannel);
		else
			return;
	}

	function addCookie(key, value) {
        if ( !key ) {
            return false;
        }
        document.cookie
            = key + '=' + escape(value) + '; '
            + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
            + 'path=/; ';
    };

	function getCookie(key) {
        var cookies = document.cookie.split(';');
        for ( var i=0; i<cookies.length; i++ ) {
            if ( cookies[i].indexOf('=') < 0 ) continue;
            key_value  = cookies[i].replace(/(^[\s]+|;)/g,'');
            deli_index = key_value.indexOf('=');
            if ( key_value.substring(0,deli_index) == key ) {
                return unescape(key_value.substring(deli_index+1,key_value.length));
            }
        }
        return '';
    };
	
};

document.body.appendChild(document.createElement("script")).innerHTML = "("+jScript+")()";
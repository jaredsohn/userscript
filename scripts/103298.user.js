// ==UserScript==
// @name           YaggPowerKitty
// @namespace      ypk
// @description    Various improvements for the alternate chat on Yagg.com
// @include http://blogdelacommunaute.yagg.com/*
// @include http://localhost/~ayin/wordpress/*
// ==/UserScript==

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  //document.body.removeChild(script);
}


GM_addStyle(" \
#chat-sound { \
	float:right; \
	margin-right: 5px; \
	border: 1px solid #ccc; \
	-moz-border-radius: 5px !important; \
	-webkit-border-radius: 5px !important; \
	padding: 0.3em; \
	font-size: 80%; \
} \
#chat-block-site { \
    border-top-left-radius: 5px !important; \
    border-top-right-radius: 5px !important; \
    bottom: 0 !important; \
    font-size: 12px !important; \
    overflow: auto !important; \
    padding: 2px 3px 0 !important; \
    position: fixed !important; \
    left: 0 !important; \
    right: auto !important; \
    width: 450px !important; \
} \
#chat-block-inner { \
    height: 480px !important; \
} \
");

contentEval(function() {
	jQuery("#chat-wrap-1").after('<p id="chat-sound">Sound</p>');
	
	if (chat_localized.sound_1 == "disabled") {
		jQuery("#chat-sound").text("Sound Off");
	} else {
		jQuery("#chat-sound").text("Sound On");
	}
	
	jQuery("#chat-sound").click(function(e) {
		if (chat_localized.sound_1 == "disabled") {
			chat_localized.sound_1 = "enabled";
			jQuery("#chat-sound").text("Sound On");
		} else {
			chat_localized.sound_1 = "disabled";
			jQuery("#chat-sound").text("Sound Off");
		}
	});
	
	window.loadUsers = function(query) {
		query.find('.name').each(function(index, e) {
			window.chat.knownUsers[e.textContent] = true;	
		});		
	}
	
	function updateChat(sounds){
		if(!instanse){
			jQuery('.chat-post-id').each(function () {
				var instanse = true;
				var pid = jQuery(this).val();
				if (!lastCheck[pid]) {
					lastCheck[pid] = 0;
					last_mid[pid] = 0;
					lastUpdate[pid] = new Date().getTime();
				}
				if (!(pid == 1 && jQuery('#chat-block-site').hasClass('closed'))) {
					jQuery.ajax({
						type: "POST",
						url: chat_localized["url"],
						data: {
							'function': 'update',
							'cid': pid,
							'file': file,
							'action': 'chatProcess',
							'avatar': chat_localized["avatar_"+pid],
							'emoticons': chat_localized["avatar_"+pid],
							'date_color': chat_localized["date_color_"+pid],
							'name_color': chat_localized["name_color_"+pid],
							'moderator_name_color': chat_localized["moderator_name_color_"+pid],
							'text_color': chat_localized["text_color_"+pid],
							'date_show': chat_localized["date_show_"+pid],
							'time_show': chat_localized["time_show_"+pid],
							'since': lastCheck[pid],
							'since_id': last_mid[pid],
							'moderator_roles': chat_localized["moderator_roles_"+pid]
						},
						dataType: "json",
						success:
							function(data) {
								if(data && data.text){
									var updateContent = '';
									for (i in data.text) {
										updateContent = updateContent + "<p>"+data.text[i]+"</p>";
										last_mid[pid] = i;
									}
									lastCheck[pid] = Math.max(data.time, lastCheck[pid]);
									
									if ( currentContent[pid] !== updateContent ) {
										updateContent = updateContent.replace(/@(\w+)/g, "@<a href=\"http://yagg.com/membres/$1/profile/public/\">$1</a>");
										console.log(updateContent);
										
										if ( updateContent !== '' ) {
											var mustScroll = false;
											var scrollPosition = jQuery("#chat-wrap-1").innerHeight() - (jQuery("#chat-area-1").attr("scrollHeight") -jQuery("#chat-area-1").scrollTop());
											if (scrollPosition >= 0) {
												mustScroll = true;
											}
											console.log(scrollPosition);
											
											var lastElement;
											var chatWasEmpty = false;
											if (jQuery('#chat-area-1').children().size() == 0) {
												chatWasEmpty = true;
											} else {
												lastElement = jQuery('#chat-area-'+pid).children().last();
											}

											jQuery('#chat-area-'+pid).append(jQuery(updateContent.replace(currentContent[pid], '')));
											currentContent[pid] = updateContent;
											
											if (chatWasEmpty) {
												loadUsers(jQuery('#chat-area-1'));	
											} else {
												var newElements = lastElement.nextAll();
												loadUsers(newElements);
											}
											
											
											if (mustScroll) {
												jQuery('#chat-area-'+pid).animate({ scrollTop: jQuery('#chat-area-'+pid).attr("scrollHeight") }, 2000);	
											}
											if ( sounds !== 'disabled' && chat_localized['sound_'+pid] !== 'disabled' && pingSound ) {
												pingSound.play('notify');
											}
										}
									}
								}
								instanse = false;
								lastUpdate[pid] = new Date().getTime();
							}
						}
					);
					if (new Date().getTime() > lastUpdate[pid]+(chat_localized["interval"]*1000)*60) {
						jQuery('#chat-send-'+pid).attr('disabled', true);
					} else {
						jQuery('#chat-send-'+pid).attr('disabled', false);
					}
				}
			});
		} else {
			//setTimeout(updateChat, 1500);
		}
	}
	
	function sendChat(pid, message, name, vip, sounds, type)
	{
		message = base64_encode(jQuery.trim(message));
		name = base64_encode(jQuery.trim(name));
		jQuery.ajax({
			type: "POST",
			url: chat_localized["url"],
			data: {
				'function': 'send',
				'cid': pid,
				'message': message,
				'name': name,
				'type': type,
				'vip': vip,
				'file': file,
				'action': 'chatProcess',
				'moderator_roles': chat_localized["moderator_roles_"+pid]
			},
			dataType: "json",
			success: function(data){
				updateChat(sounds);
			}
		});
	}
	
	function initialChatLoad() {
		if (jQuery('#chat-area-1').children().size() != 0) {
			loadUsers(jQuery('#chat-area-1'));
		} else {
			console.log("Chat empty, retrying");
			setTimeout(initialChatLoad, 500);
			
		}
		
	}
	
	jQuery(".chat-send").keydown(function(e) {
		var key = e.which;
		if (key >= 33) {
			var maxLength = 2000;
			var length = this.value.length;
			if (length >= maxLength) {
				return false;
			}
		}
			
		if (key == 9) {
			// Find the characters before the cursor
			var cursorPosition = this.selectionStart;
			var textBefore = this.value.substr(0, cursorPosition);
			var lastSpace = textBefore.lastIndexOf(' ');
			
			if (lastSpace < (textBefore.length-1)) {
				var lastWord = textBefore.substr(lastSpace+1, textBefore.length - (lastSpace+1));
				var userList = new Array();

				if (lastWord[0] == '@' && lastWord.length > 1) {
					lastWord = lastWord.substr(1, lastWord.length-1);
				}
				// Find users whose name start by lastWord
				for (var i in chat.knownUsers) {			
					var re = new RegExp('^' + lastWord + '.*', "i");
					
					if (i.match(re)) {
						console.log('matches');
						userList.push(i);
					}
				}
				
				if (userList.length == 1) {
					this.value = this.value.substr(0, lastSpace + 1) + '@' + userList[0] + this.value.substr(cursorPosition, this.value.length - cursorPosition);
					this.selectionStart = this.selectionEnd = lastSpace + 2 + userList[0].length;
				}
			}
			
			return false;
		}
		
	});
	
	chat.knownUsers = new Array();
	chat.update = updateChat;
	chat.send = sendChat;
	
	clearInterval(chat_refresh_timer[post_id]);
	chat_refresh_timer[post_id] = setInterval("chat.update(sounds)",chat_localized["interval"]*1000);
	
});

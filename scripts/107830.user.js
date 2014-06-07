// ==UserScript==
// @name              FB-Chat Scroll
// @namespace         *FacebookScroll*
// @description       Adds a Scrollfunction to the new Chat
// @version           1.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @require           http://code.jquery.com/jquery-1.6.2.min.js

// ==/UserScript==

(function(){
	var online				= [];
	var onlinenew			= [];
	var sorted_online_list 	= [];
    var timer			= setInterval (function() { load(); }, 5000);
	var user_list = { 1: $('<ul></ul>'), 2: $('<ul></ul>') };
	var user, status, classname, val;
	
	
	function load() 
	{
		if($('.fbChatSidebarBody'))
		{
			onlinenew = unsafeWindow.AvailableList.getAvailableIDs();
			if(onlinenew != [])
			if(onlinenew != online)
			{
				online = onlinenew;
				
				sorted_online_list 	= [];
				for (var i = 0; i < online.length; i++) 
				{
					sorted_online_list.push([online[i], unsafeWindow.ChatUserInfos[online[i]].name]);
				}
				sorted_online_list.sort(function(a, b) {return (a[1] < b[1]) ? -1 : 1; });
				
				user_list = { 1: $('<ul class="fbChatOrderedList" style="position:relative"></ul>'), 2: $('<ul class="fbChatOrderedList" style="position:relative"></ul>') };
				// Loop over online IDs and generate list HTML
				for (var i = 0; i < sorted_online_list.length; i++) {
					val = sorted_online_list[i];
					user = unsafeWindow.ChatUserInfos[val[0]];
					status = unsafeWindow.AvailableList.get(val[0]);
					classname = (status == 1) ? 'idle' : 'active';
					
					user_item = $
					(
						'<li class="item">'+
							'<a class="clearfix" rel="ignore">' +
								'<img class="pic" />' +
								'<span class="name"></span>' +
								'<i class="status img sp_3xd8gf sx_94f6be"></i>' +
							'</a>' +
						'</li>'
					)
					.addClass(classname)
					.attr('uid', val[0])
					.find('img').attr('src', user.thumbSrc).end()
					.find('span').text(user.name).end();

					user_list[status].append(user_item);
				}
				
				//Clear Chatlist
				$('.fbChatSidebarBody').children().remove();
				
				// Append the list HTML to the chat
				$('.fbChatSidebarBody')
					.append(user_list[2])
					.append(user_list[1]);
			}
		}
	}
    
})();
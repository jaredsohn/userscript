// ==UserScript==
// @name              FB-Chat Scroll
// @namespace         *FacebookScroll*
// @description       Adds a Scrollfunction to the new Chat
// @version           0.0.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @require           http://code.jquery.com/jquery-1.6.2.min.js

// ==/UserScript==

(function(){
	unsafeWindow.console.debug("Skript gestartet");
	var online				= [];
	var sorted_online_list 	= [];
    var load_timer			= setInterval (function() { load(); }, 5000);
	function load() 
	{
		unsafeWindow.console.debug("Load() aufgerufen");
		if($('.fbChatSidebarBody'))
		{
			online = unsafeWindow.AvailableList.getAvailableIDs();
			unsafeWindow.console.debug(online);
			
			for (var i = 0; i < online.length; i++) {
				sorted_online_list.push([online[i], unsafeWindow.ChatUserInfos[online[i]].name]);
			}
			sorted_online_list.sort(function(a, b) {return (a[1] < b[1]) ? -1 : 1; });
			
			var user_list = { 1: $('<ul></ul>'), 2: $('<ul></ul>') };
			var user, status, classname, val;
			
			
			// Loop over online IDs and generate list HTML
			for (var i = 0; i < sorted_online_list.length; i++) {
				val = sorted_online_list[i];
				user = unsafeWindow.ChatUserInfos[val[0]];
				status = AvailableList.get(val[0]);
				classname = (status == 1) ? 'idle' : 'active';
				
				user_item = $(
					'<li class="item ">'+
						'<a rel="ignore" class="clearfix">' +
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

				//user_list[status].append(user_item);
			}
			
			// Append the list HTML to the chat
			$('.fbChatSidebarBody')
				.children().remove();
				.append(user_list[2])
				.append(user_list[1]);
			if(user_list[2])
			{
				unsafeWindow.console.debug("Erfolgreich!");
			}
		}
	}
    
})();
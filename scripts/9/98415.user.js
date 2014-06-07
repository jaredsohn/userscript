// ==UserScript==
// @name           Chat audible notification for unicorns
// @namespace      http://okhaveanamespacethenyoustupidmonkey.com
// @description    Chat audible notification for unicorns
// @include        http://chat.meta.stackoverflow.com/*
// @include        http://chat.stackoverflow.com/*
// ==/UserScript==
/*
 * Thanks a lot to Josh Gitlin for providing the ThirdPlace classes
 */
/*
 * Injects functions into the page so they can freely interact with existing code
 */
function inject() {
	for (var i = 0; i < arguments.length; ++i) {
		if (typeof(arguments[i]) == 'function') {
			var script = document.createElement('script');

			script.type = 'text/javascript';
			script.textContent = '(' + arguments[i].toString() + ')(jQuery)';

			document.body.appendChild(script);
		}
	}
}

inject(function($)
{
	window.ThirdPlace = (function()
	{
		var ThirdPlace = {};
		
		var myThirdPlaceEventHandlers = {
			newMessage: []
		}
		
		var myThirdPlaceRoomsById = {};
		var myThirdPlaceUsersById = {};
		
		var myLastSeenEventTimestamp = 0;
		
		
		var myDebugLog = function()
		{
			//if(console && (typeof console.log == 'function'))
			//	console.log.apply(console,arguments);
		}
		
		ThirdPlace.Event = function() {
			this.eventType=false;
			this.room=false;
		}
		
		ThirdPlace.User = function() {
			this.id = false;
			this.name = false;
		}
		
		ThirdPlace.Message = function() {
			this.id = false;
			this.content = false;
			this.user_id = false;
		}
		
		ThirdPlace.Message.prototype.room = function() { return myGetChatRoomById(this.user_id); }
		ThirdPlace.Message.prototype.user = function() { return myGetChatUserById(this.user_id); }
		
		
		ThirdPlace.Room = function() {
			this.id = false;
			this.messages = [];
			this.presentUsers = [];
		}
		
		ThirdPlace.Event.newMessage = function() {
			this.eventType = 'newMessage';
			this.room = 0;
			this.message = false;
		}
		
		ThirdPlace.Event.newMessage.prototype.fire = function() {
			var i,len = myThirdPlaceEventHandlers.newMessage.length;
			
			//DEBUG:
			myDebugLog('firing chat event',this);
			
			for(i=0;i<len;++i)
			{
				try {
					myThirdPlaceEventHandlers.newMessage[i](this);
				} catch(ex) {
					if(console && (typeof console.log == 'function'))
						console.log("ThirdPlace.Event.newMessage handler caught an exception:",ex);
				}
			}
		}
		
		ThirdPlace.Event.newMessage.prototype.room = function()
		{
			return myGetChatRoomById(this.room_id);
		}
		
		
		
		
		var myAddObserver = function(event,handler)
		{
			if(typeof handler != "function")
				throw new TypeError("handler must be a function");
			
			if(typeof myThirdPlaceEventHandlers[event] == "undefined")
				throw new TypeError("invalid event type");
			
			myThirdPlaceEventHandlers[event].push(handler);
		}
		
		ThirdPlace.observe = function(event,handler) { return myAddObserver(event,handler); }
		
		
		
		
		var myGetChatRoomById = function(id)
		{
			if(typeof id != "number")
				throw new TypeError("ID must be numeric");
			
			if(typeof myThirdPlaceRoomsById[id] != "object")
			{
				myThirdPlaceRoomsById[id] = new ThirdPlace.Room();
				myThirdPlaceRoomsById[id].id = id;
			}
			
			return myThirdPlaceRoomsById[id];
		}
		
		var myGetChatUserById = function(id)
		{
			if(typeof id != "number")
				throw new TypeError("ID must be numeric");
			
			if(typeof myThirdPlaceUsersById[id] != "object")
			{
				myThirdPlaceUsersById[id] = new ThirdPlace.User();
				myThirdPlaceUsersById[id].id = id;
			}
			
			return myThirdPlaceUsersById[id];
		}
		
		ThirdPlace.getRoomById = function(id) { return myGetChatRoomById(id); }
		
		ThirdPlace.getUserById = function(id) { return myGetChatUserById(id); }
		
		var myPollLocalStorage = function(){
			
		}
		
		var myParThirdPlaceEventAndCreateObject = function(chatEventData)
		{
			var event = false;
			
			if(chatEventData.event_type == 1)
			{
				//DEBUG:
				myDebugLog('creating a new message event',chatEventData);
				
				// this is a new message being posted
				event = new ThirdPlace.Event.newMessage;
				event.message = new ThirdPlace.Message();
				
				event.message.user_id = chatEventData.user_id;
				event.message.content = chatEventData.content;
				event.message.room_id = chatEventData.room_id;
				
				var room = myGetChatRoomById(event.message.room_id)
				room.name = chatEventData.room_name;
				
				var user = myGetChatUserById(event.message.user_id)
				user.name = chatEventData.user_name;
			}
			
			return event;
		}
		
		var myGetNewChatEvents = function()
		{
			var chatEvents = queueObj, chatEventCount = chatEvents.length, queueIndex, roomEventCount, roomIndex;
			
			var result = [];
			
			for(queueIndex=0; queueIndex<chatEventCount; ++queueIndex)
			{
				if(chatEvents[queueIndex].time > myLastSeenEventTimestamp)
				{
					for(roomKey in chatEvents[queueIndex].content.data)
					{
						if(chatEvents[queueIndex].content.data[roomKey].e instanceof Array)
						{
							var roomId = parseInt(roomKey.substr(1));
							
							roomEventCount = chatEvents[queueIndex].content.data[roomKey].e.length;
							
							// DEBUG:
							myDebugLog("parsing",roomEventCount,"chat events for room ID:",roomId,chatEvents[queueIndex].content.data[roomKey]);
							
							for(roomIndex=0; roomIndex<roomEventCount; ++roomIndex)
							{
								//DEBUG:
								myDebugLog('parse event #'+roomIndex,chatEvents[queueIndex].content.data[roomKey].e[roomIndex]);
								
								result.push(myParThirdPlaceEventAndCreateObject(chatEvents[queueIndex].content.data[roomKey].e[roomIndex]))
							}
						}
					}
					
					
					myLastSeenEventTimestamp = chatEvents[queueIndex].time;
					
					//DEBUG:
					myDebugLog('myLastSeenEventTimestamp=',myLastSeenEventTimestamp);
				}
			}
			
			return result;
		}
		
		var myLocalStorageOnStorageHandler = function(event)
		{
			if(event.key == "chat:broadcastQueue")
			{
				// We have a chat event.
				var newEvents = myGetNewChatEvents();
				
				var eventCount = newEvents.length;
				
				//DEBUG:
				myDebugLog('myLocalStorageOnStorageHandler received '+eventCount+' events:',newEvents);
				
				for(var i = 0; i < eventCount; i++)
					newEvents[i].fire();
			}
		}
		
		var myGlobalAjaxCompleteHandler = function(event, XMLHttpRequest, ajaxOptions)
		{
			if(ajaxOptions.url == '/events')
			{
				var newEvents = myGetNewChatEvents();
				
				var eventCount = newEvents.length;
				
				//DEBUG:
				myDebugLog('myGlobalAjaxCompleteHandler received '+eventCount+' events:',newEvents);
				
				for(var i = 0; i < eventCount; i++)
					newEvents[i].fire();
			}
		}
		
		window.addEventListener('storage', myLocalStorageOnStorageHandler, false);
		
		$(document).ajaxComplete(myGlobalAjaxCompleteHandler);
		
		return ThirdPlace;
		
	})();
});

inject(function($)
{
	function init()
	{
		var newPlayer = $('<div/>').attr('id', 'unicornplayer');
		$('#chat-buttons').append(newPlayer);
		newPlayer.jPlayer({
        	swfPath: "http://or.sstatic.net/chat",
        	warningAlerts: true,
        	nativeSupport: false,
        	ready: function () {
            	this.setFile("http://asinex.es/asinex/static/unicorn.mp3");
            	this.volume(50);
            	$.unicorn_ready = true;
    		}
    	});
    
    	ThirdPlace.observe('newMessage',function(event)
		{
			if ($.unicorn_ready && event.message.content.match(/[Uu]nicorn/)) { 
				$("#unicornplayer").trigger("jPlayer.play");
			}
		});
	}

	init();
});


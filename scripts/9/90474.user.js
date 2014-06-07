// ==UserScript==
// @name           Pip.io on Fluid
// @namespace      http://pip.io/
// @description    Fluid userscript for Pip.io
// @include        http://pip.io/*
// @author         YungSang
// @version        0.7.2
// ==/UserScript==
// 0.1 : 2010/11/13 : First release
// 0.2 : 2010/11/15 : Capitalize the presences to recognise easily
// 0.3 : 2010/11/15 : Supported Chat and Video Chat messages
// 0.4 : 2010/11/16 : Added priority and sticky options
// 0.5 : 2010/11/17 : Patched updateTimestamps in v2.13057
// 0.6 : 2010/11/17 : Added DockMenuItem to change a presence
// 0.7 : 2010/11/17 : Patched the Global Search in v2.13057

(function() {
	if (typeof fluid == 'undefined') return;
	if (typeof pipio == 'undefined') return;

log('start');

	Logger().disable();

	var _UI = pipio.activeModules.ui;

	_UI.registerHandler('alertUpdated_all', function(x) {
log('alertUpdated_all');

		_UI.alertUpdated.apply(_UI, arguments);

		if (_UI.titleCount > 0) {
			fluid.dockBadge = _UI.titleCount;
		}
		else {
			fluid.dockBadge = '';
		}
	});

	function GrowlNotification(title, user, message, priority, sticky) {
		if (user.user_id != pipio.currentUser.user_id) {
			var notification = {
				title       : 'Pip.io ' + title + ' from ' + user.username,
				description : message,
				priority    : priority || 0,
				sticky      : sticky || false,
				identifier  : user.user_id,
				onclick     : function(){ window.focus(); },
				icon        : UserUtility.getProfilePic(user.user_hash, user.user_id, 42)
			};
			fluid.showGrowlNotification(notification);
		}
	}

	var _UserPresences = {};

	_UI.registerHandler('userPresenceUpdated', function(username, show, online) {
log(username + ':' + show + ':' + online);

		var notify  = false;
		var message = '';

		if (online) {
			if (show == '') {
				message = 'ONLINE';
				if (_UserPresences[username] != 'online') notify = true;
				_UserPresences[username] = 'online';
			}
			else if (show == 'away') {
				message = 'AWAY';
				if (_UserPresences[username] != 'away') notify = true;
				_UserPresences[username] = 'away';
			}
			else if (show == 'xa') {
				message = 'LEAVING it open';
				if (_UserPresences[username] != 'xa') notify = true;
				_UserPresences[username] = 'xa';
			}
			else if (show == 'dnd') {
				message = 'BUSY';
				if (_UserPresences[username] != 'dnd') notify = true;
				_UserPresences[username] = 'dnd';
			}
		}
		else {
			message = 'OFFLINE';
			if (_UserPresences[username] != 'offline') notify = true;
			_UserPresences[username] = 'offline';
		}

		if (notify) {
			var user = pipio.getContact(username);
			GrowlNotification('Presence', user, message, -1);
		}

		_UI.userPresenceUpdated.apply(_UI, arguments);
	});

	var _Home = pipio.runningApps[1];

	_Home.registerHandler('postAdded', function(data) {
log('postAdded');
		if (data.post && data.post.content.body) GrowlNotification('Post', data.post.creator, data.post.content.body);
	});

	_Home.registerHandler('postReplyAdded', function(data) {
log('postReplyAdded');
		if (data.post) GrowlNotification('Reply', data.post.creator, data.post.content.body);
	});

	_Home.registerHandler('targetedPostAdded', function(data) {
log('postAdded');
		if (data.post) GrowlNotification('Post', data.post.creator, data.post.content.body);
	});

	_Home.registerHandler('targetedPostReplyAdded', function(data) {
log('postReplyAdded');
		if (data.post) GrowlNotification('Reply', data.post.creator, data.post.content.body);
	});

	if (pipio.activeModules.chat) {
log('chat active');
		var _Chat = pipio.activeModules.chat;
	
		_Chat.registerHandler('chatReceived', function(msg) {
log('chatReceived');
			if (!msg.outbound) GrowlNotification('Chat', msg.user, msg.body, 1);
			_Chat.chatReceived.apply(_Chat, arguments);
		});
	}

	if (pipio.activeModules.videochat) {
log('videochat active');
		var _VideoChat = pipio.activeModules.videochat;

		_VideoChat.registerHandler('videoChatRequestReceived', function(username, stratusId) {
log('videoChatRequestReceived');
			var user = pipio.getContact(username);
			GrowlNotification('Video Chat', user, 'Request is Received', 1, true);
			_VideoChat.videoChatRequestReceived.apply(_VideoChat, arguments);
		});
	
		_VideoChat.registerHandler('videoChatRequestAccepted', function(username, stratusId) {
log('videoChatRequestAccepted');
			var user = pipio.getContact(username);
			GrowlNotification('Video Chat', user, 'Request is Accepted');
			_VideoChat.videoChatRequestAccepted.apply(_VideoChat, arguments);
		});
	}

	fluid.addDockMenuItem("Available", function() {
		setTimeout(function() {
			_Home.setAvailable.call(_Home, false);
		}, 0);
	});
	fluid.addDockMenuItem("Away", function() {
		setTimeout(function() {
			_Home.setAway.call(_Home, false);
		}, 0);
	});
	fluid.addDockMenuItem("Invisible", function() {
		setTimeout(function() {
			_Home.setInvisible.call(_Home);
		}, 0);
	});

//--============================================================================
//-- Patches
//--============================================================================
	_UI.updateTimestamps = function () {
log('updateTimestamps');
		$$(".timestamp").each(function (el) {
			if ($defined(el.getParent(".date").get("ts"))) {
				var ts = el.getParent(".date").get("ts");
				var timeStr = DateUtility.getTimestamp(ts);
				el.set("text", timeStr);
			}
		});
	};
	_UI.updateTimestamps.periodical(1000 * 60, _UI);

	GlobalsSearchContent.implement({
		parseLocation : function (location) {
log("parseLocation");
			var place = {};
			place.name = location.formatted_address;
			location.address_components.each(function (address) {
				if ($defined(address.types[0])) {
					switch (address.types[0]) {
					case "locality":
					case "street_number":
						place.address = $defined(place.address) ? place.address : "" + " " + address.long_name;
						break;
					case "administrative_area_level_2":
						place.city = address.long_name;
						break;
					case "administrative_area_level_1":
						place.region = address.long_name;
						break;
					case "country":
						place.country_code = address.short_name;
						place.country = address.long_name;
						break;
					}
				}
			}, this);
			place.lat = location.geometry.location.lat();
			place.lon = location.geometry.location.lng();
			place.geohash = GeoHash.encodeGeoHash(place.lat, place.lon);
			return place;
    }
	});

log('end');

//--============================================================================
//-- Logger
//--============================================================================
	function log(str) {
		if ((typeof console != 'undefined') && (typeof console.log == 'function')) console.log(str);
	}
})();
// ==UserScript==
// @name			Twitter DM
// @author			Patrick Corcoran -- @pcorcoran
// @namespace		http://pcorcoran.myopenid.com/gm-scripts/twitter-dm
// @include			http://twitter.tld/*
// @include			http://*.twitter.tld/*
// ==/UserScript==


/*
	Some Known Issues:

		* Basic auth login prompt raised on first load of every browser session.
		* Some "unsafe" access of the main Twitter window.
		* Subject to normal Twitter API usage limits.
		* Status links to DM do not discriminate between followers and non-followers.
		* Status links are not added to status messages loaded after window.onload.
		* Not localized or internationalized.
		* Only tested on Greasemonkey 0.8.20100211.5:
							Firefox 3.6 vs. Windows XP SP3
							Firefox 3.5 vs. Mac OS X 10.5.8
		* Code was written really fast-n-jank-like.  Mea culpa.
		* Spent exactly 11.37 seconds reading jQuery docs... mighta missed some nice shortcuts.

*/


// Unsafe.  Remove when porting script away from GreaseMonkey.
var $			= unsafeWindow.$;
var jQuery		= unsafeWindow.jQuery;


var MAX_MSG_LENGTH		= 140;
var MIN_POLL_INTERVAL	= 15000; // in ms


var apiCallRem			= 0;
var apiResetTime		= null;
var dms					= [];
var friends				= {};
var lastMsgID			= 0;
var messageBox			= null;
var recipient			= '';
var requests			= [];
var updater				= 0;
var username			= '';


var init = function() {
    var un = $('meta[name=session-user-screen_name]', document.body.parentNode)[0];
    if (!un) { return; }
	username = un.content;
	draw();
	load.rateLimit();
	load();
};
window.addEventListener('load', init, true);


var draw = function() {

	var dbg		= 'rgba(0,0,0,0.08)';
	var dbrd	= 'rgba(0,0,0,0.11)';
	var lbg		= 'rgba(255,255,255,0.47)';
	var slbg	= 'rgba(255,255,255,0.84)';
	var txtc	= '#3E4415';

	var pn = $('<div id="pbc_dm" class="collapsible" style="padding: 0 5px 0 3px;"></div>');
	pn.append('<h2 class="sidebar-title">Direct Messages</h2>');

	var pnb = $('<div class="sidebar-menu" style="background-color: ' + dbg + '; border: 1px solid ' + dbrd + '; margin: 0 0 0 3px; padding: 5px 5px 0 0; position: relative; -moz-border-radius: 5px;"></div>');
	pn.append(pnb);

	var ci = $('<div style="padding: 5px 16px 0 14px;"></div>');
	ci.append(
		'<div style="background-color: ' + lbg + '; border: 1px solid ' + dbrd + '; font-size: 93%; padding: 4px 0 2px 6px; width: 100%;">' +
		'DM with: <select id="friends" style="background-color: ' + lbg + '; font-size: 93%; margin: 0 0 2px 0;"></select>' +
		'</div>'
	);
	ci.append(
		'<div style="background-color: ' + slbg + '; border: 1px solid ' + dbrd + '; font-size: 93%; height: 13em; margin: 0; overflow: auto; padding: 1px 0 0 5px; width: 100%;">' +
		'<ul id="messages"></ul>' +
		'</div>'
	);
	ci.append('<textarea id="message" style="border: 1px solid ' + dbrd + '; font: .9em/1.1 \'Lucida Grande\',sans-serif; padding: 2px 4px 2px 1px; width: 100%;"></textarea>');
	ci.append(
		'<div style="height: 2.5em; margin: 3px 0 0 0; padding: 0 1px 0 5px; text-align: right; width: 100%;">' +
		'<div id="charcount" style="color: ' + txtc + '; float: left; font-size: 100%; font-weight: bold; padding: 6px 0 0 0;">' +
		MAX_MSG_LENGTH + '</div>' +
		'<input id="send" type="button" style="background-color: ' + lbg + '; border-color: ' + dbrd + '; color: ' + txtc + '; float: right; font-size: 73%;" value="send">' +
		'</div>'
	);
	ci.append('<div style="font-size: 73%; padding: 3px 3px 4px 3px;"><input id="dm_poll" type="checkbox" checked="true" style="margin: 0 0 0 4px;"> <div style="float: right; position: relative; top: 0px;">Auto-Load New Messages</div></div>');
	ci.append('<div style="padding: 0 3px 5px 3px; text-align: center; width: 100%;"><a href="/inbox" style="color: ' + txtc + '; font-size: 73%; font-weight: bold;">View Inbox</a></div>');
	pnb.append(ci);
	pn.append('<hr>');

	pn.isCollapsibleMenu();
	pn.insertBefore('#primary_nav');

	var css = '.hentry .actions .dm-link { background-image:url("http://s.twimg.com/a/1266879478/images/sprite-icons.png"); cursor:pointer; display:block; line-height: 16px; visibility:hidden; }\n';
	css += '.hentry .actions-hover .dm-icon { background-position: -32px -32px; float: left; cursor: pointer; height: 13px; margin: 2px 2px 0 0; width: 15px; }\n';
	css += '.hentry .actions-hover .dm-link:hover .dm-icon { background-position: -48px -32px; }\n';
	css += '.hentry .actions-hover .dm-link:hover a { text-decoration: underline; }\n';
	addGlobalStyle(css);

	// Add hover actions to status messages.
	var msgs = $('li.status');
	for (var i = 0, n = msgs.length; i < n; i++) {
		var msg = msgs[i];
		var scrn = $('.screen-name', msg)[0];
		if (!scrn) { continue; }
		var uname = scrn.innerHTML;
		var html = '<li><span class="dm-link"><span class="dm-icon icon"></span>' +
			'<a title="Direct Message to ' + uname + '" href="#" class="dm-anchor" data="' + uname + '">Direct Message</a></span></li>';
		var hovers = $('.actions-hover', msg)[0];
		$(hovers).append(html);
	}
	var dmhs = $('li a.dm-anchor');
	for (var i = 0, n = dmhs.length; i < n; i++) {
		var dmh = dmhs[i];
		var uname = dmh.getAttribute('data');
		var func = function(u) {
			return function() { update.newuser(u); };
		};
		dmh.addEventListener('click', func(uname), true);
	}

	messageBox = $('#message')[0];
	messageBox.addEventListener('keyup', update.charCount, true);
	messageBox.addEventListener('input', update.charCount, true);
	$('#friends')[0].addEventListener('change', update.user, true);
	$('#send')[0].addEventListener('click', send, true);
	$('#dm_poll')[0].addEventListener('change', load.autopoll, false);
};

draw.user = function(uname, selected) {
	var friends = $('#friends')[0];
	var opts = $('option', friends);
	var lcn = uname.toLowerCase();
	if (uname !== username && !friends[uname]) {
		friends[uname] = true;
		var html = '<option value="' + uname + '">' + uname + '</option>';
		for (var j = 0, jn = opts.length; j < jn; j++) {
			var o = opts[j];
			if (o.value.toLowerCase() > lcn) {
				$(html).insertBefore(o);
				if (selected) { friends.selectedIndex = j; }
				return;
			}
		}
		$('#friends').append(html);
		if (selected) { friends.selectedIndex = friends.options.length - 1; }
	} else {
		for (var j = 0, jn = opts.length; j < jn; j++) {
			var o = opts[j];
			if (o.value.toLowerCase() === uname) {
				if (selected) { friends.selectedIndex = j; }
				return;
			}
		}
	}
};


var load = function() {
	if (updater) {
		window.clearInterval(updater);
		updater = 0;
	}
	var cb = $('#dm_poll')[0];

	var interval = (apiCallRem <= 0) ? 60000 : (function() {
		var numCalls = 2;
		var sur = load.rateLimit.secondsUntilReset();
		var int = Math.ceil((sur * 1000) / apiCallRem) + 10000;
		console.log('API Reset in %s.', update.timeDelta(Math.ceil(sur) * 1000));
		return Math.max(int, MIN_POLL_INTERVAL) * numCalls;
	})();
	if (cb.checked) {
		updater = window.setInterval(load, interval);
	}
	console.log('Polling updates every %s.', update.timeDelta(interval));

	if (cb.checked) {
		var since = (lastMsgID) ? '&t=' + (new Date()).getTime() : '&since_id=' + lastMsgID;
		ajax({
			'dataType':	'json',
			'error':	load.error,
			'success':	load.success,
			'url':		'/direct_messages.json?count=200' + since
		});
		ajax({
			'dataType':	'json',
			'error':	load.error,
			'success':	load.success,
			'url':		'/direct_messages/sent.json?count=200' + since
		});
	}
};

load.autopoll = function(event) {
	var cb = $('#dm_poll')[0];
	if (cb.checked) { load(); }
};

load.error = function() {
	if (updater) { window.clearInterval(updater); }
	messageBox.setAttribute('disabled', 'true');
	var sur = load.rateLimit.secondsUntilReset();
	var mur = Math.ceil(sur / 60);
	$('#pbc_dm')[0].setAttribute('title', 'A server error occurred.  You have likely exceeded your hourly API limit.  Reloading the page might help; otherwise wait about ' + mur + ' minutes.');
};

load.success = function(response) {
	if (!recipient) {
		var rc = response[0].sender.screen_name;
		if (rc !== username) { recipient = rc; }
	}
	var r;
	while (r = response.shift()) { dms.push(r); }
	dms.sort(load.sort);
	MESSAGES:
	for (var i = 0, n = dms.length; i < n; i++) {
		lastMsgID = Math.max(dms[i].id, lastMsgID);
		var s = dms[i].sender;
		var sid = s.id, sname = s.screen_name;
		draw.user(sname, (sname === recipient));
	}
	update();
};

load.sort = function(a, b) { return (a.id > b.id) ? -1 : 1; };

load.rateLimit = function() {
	ajax({
		'dataType':	'json',
		'success':	load.rateLimit.success,
		'url':		'/account/rate_limit_status.json'
	});
};

load.rateLimit.callsLeft = function(newLimit) {
	if (!isNaN(newLimit)) {
		apiCallRem = newLimit;
	}
	if (apiCallRem >= 0) {
		console.log('API Calls Remaining: %s', apiCallRem);
	}
	return apiCallRem;
};

load.rateLimit.secondsUntilReset = function() {
	var now = new Date();
	var timeLeft = apiResetTime - now;
	var td = Math.ceil(timeLeft / 1000);
	return td;
};

load.rateLimit.success = function(response) {
	apiCallRem		= load.rateLimit.callsLeft(response.remaining_hits);
	apiResetTime	= new Date((new Date(response.reset_time)).getTime() + 300000);	// Add 5 minutes, as insurance.
	var sur = load.rateLimit.secondsUntilReset();
	window.setTimeout(load.rateLimit, (sur * 1000) + 120000);
	console.log('API Reset in %s.', update.timeDelta(Math.ceil(sur) * 1000));
};


var update = function() {
	var now = new Date();
	UPDATE:
	for (var i = 0, n = dms.length; i < n; i++) {
		var m = dms[i];
		if (m.sender.screen_name === recipient || m.recipient.screen_name === recipient) {
			var mid = 'm' + m.id;
			if ($('#' + mid).length > 0) { continue; }
			var imgUrl = m.sender.profile_image_url;
			var uname = m.sender.screen_name;
			var text = m.text;
			var createdAt = m.created_at;
			var createdOn = new Date(createdAt);
			var ts = update.timeSince(now - createdOn);
			text = text.replace(/\bhttps?:\/\/\S+\b/g, update.linkify);
			text = text.replace(/(\W@)(\w+)\b/g, update.twittify);
			text = text.replace(/\W#(\w+)\b/g, update.searchify);
			var html =
				'<li id="' + mid + '" ' +
				'style="border-bottom: 1px solid #EEE; clear: both; margin: 0 0 5px 0;padding: 0 2px 8px 2px; position: relative;">' +
				'<a href="/' + uname + '"><img src="' + imgUrl + '" width="32" height="32" align="left" style="margin: 4px 7px 0 0;" border="0"></a>' +
				'<h5 style="display: inline; font-weight:bold; margin: 0 0 0 0px;">' +
				'<a href="/' + uname + '">' + uname + '</a></h5><br> ' +
				'<span style="font-size: 93%; margin-left: 0px;">' + text + '</span>' +
				'<div style="color: #AAA; cursor: default; font-size: 77%; margin-top: 1px;" class="time-delta" data="' + createdAt + '" title="' + update.timestamp(createdOn) + '">' + ts + '</div>' +
				'</li>';
			var items = $('#messages li');
			for (var j = 0, jn = items.length; j < jn; j++) {
				var itmid = Number(items[j].id.substr(1));
				if (m.id > itmid) {
					$(html).insertBefore(items[j]);
					continue UPDATE;
				} else if (m.id === itmid) {
					continue UPDATE;
				}
			}
			$('#messages').append(html);
		}
	}

	// Update existing timestamps
	var tds = $('#messages .time-delta');
	for (var i = 0, n = tds.length; i < n; i++) {
		var td = tds[i];
		var ts = update.timeSince(now - new Date(td.getAttribute('data')));
		td.innerHTML = ts;
	}
};

update.timestamp = function(date) {
	var month = [	'January', 'February', 'March',
					'April', 'May', 'June',
					'July', 'August', 'September',
					'October', 'November', 'December' ][date.getMonth()];
	var hours = date.getHours(), ampm = 'am';
	if (hours > 11) {
		hours -= 12;
		ampm = 'pm';
	} else if (hours == 0) {
		hours = 12;
	}
	var mins = date.getMinutes();
	if (mins < 10) { mins = '0' + mins; }
	return month + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + hours + ':' + mins + ampm;
};

update.linkify = function(str) {
	return '<a href="' + str + '" target="_blank">' + str + '</a>';
};

update.twittify = function() {
	return '@<a href="/' + arguments[2] + '">' + arguments[2] + '</a>';
};

update.searchify = function() {
	return '<a href="http://twitter.com/search?q=%23' + arguments[1] + '">' + arguments[0] + '</a>';
};

update.timeDelta = function(delta) {
	var secs = Math.ceil(delta / 1000) || '1';
	if (secs < 60) { return secs + ' second' + (secs > 1 ? 's' : ''); }
	var mins = Math.round(secs / 60);
	if (mins < 60) { return mins + ' minute' + (mins > 1 ? 's' : ''); }
	var hours = Math.round(mins / 60);
	if (hours < 24) { return hours + ' hour' + (hours > 1 ? 's' : ''); }
	var days = Math.round(hours / 24);
	if (days < 30) { return days + ' day' + (days > 1 ? 's' : ''); }
	var months = Math.round(days / 30);
	if (months < 12) { return months + ' month' + (months > 1 ? 's' : ''); }
	var years = Math.round(months / 12);
	return years + ' year' + (years > 1 ? 's' : '');
	// TODO: Add decades, centuries, millenia, etc.  :)
};

update.timeSince = function(delta) {
	return 'about ' + update.timeDelta(delta) + ' ago';
};

update.user = function(user) {
	recipient = (typeof user === 'string' && user) || $('#friends')[0].value;
	$('#messages')[0].innerHTML = '';
	update();
	load();
};

update.newuser = function(uname) {
	draw.user(uname, true);
	update.user(uname);
	$('#message')[0].focus();
};

update.charCount = function(count) {
	var msg = messageBox.value;
	if (!count || isNaN(count)) { count = MAX_MSG_LENGTH - msg.length; }
	var cc = $('#charcount')[0];
	cc.innerHTML = count;
	cc.style.color = (count < 0) ? '#B00' : '#3E4415';
};

update.clearText = function() {
	messageBox.value = '';
	update.charCount(MAX_MSG_LENGTH);
};


var send = function() {
	var msg = messageBox.value.substr(0, MAX_MSG_LENGTH);
	var rcpt = $('#friends')[0].value;
	var data = {
		'text': msg,
		'user': rcpt
	};
	ajax({
		'data':		data,
		'error':	send.error,
		'success':	send.success,
		'type':		'POST',
		'url':		'/direct_messages/new.json'
	});
};

send.success = function() {
	update.clearText();
	load();
};

send.error = function() {
	alert(	'An error occurred on send.\n\n' +
			'(If this recipient a follower?  You can\n' +
			'only send direct messages to followers.)');
};


var ajax = function(obj) {
	requests.push({
		'time': new Date(),
		'data': obj
	});
	apiCallRem -= 1;
	load.rateLimit.callsLeft();
	jQuery.ajax(obj);
};


// This function swiped wholesale from:
//   http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Avoid_Common_Pitfalls
// Thanks!
var addGlobalStyle = function(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
};

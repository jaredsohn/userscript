// ==UserScript==
// @id             google+enhancer
// @name           Google+ Enhancer
// @description    Enhances the user experience on Google+ and adds some additional features to it. It also makes the Google top bar display notifications for Gmail, Reader and Calendar, no matter what Google-website you're on.
// @namespace      http://benpesso.com/gm/
// @version        1.0.7
// @date           2011-07-11
// @creator        Ben Pesso
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

/******************************************

v1.0.0
- Initial Release

v1.0.1
- Fix Chrome compatibility issues.

v1.0.2
- Forgot to remove the GreaseMonkey-specific code.

v1.0.3
- Wrong version was uploaded before. This should now work properly on Firefox.

v1.0.4
- Added support for iGoogle, Web, Images, Videos, News and Maps.

v1.0.5
- Fixed issue with none ".com" websites.

v1.0.6
- Applied Ryan Conrad's modifications. (http://userscripts.org/scripts/show/106399)
- Simplified @include rules. Should work on all Google websites now.

v1.0.7
- Finally got around Gmail's cumbersome code and managed to make the script work on Gmail as well.
- Optimized code and reduced script size.
- Reduced check interval from 3 minutes to 2 minutes.

*******************************************/


(function() {
var gpe = {
	CONTEXT: document,
	EMALI_MAX_ATTEMPTS: 10,
	EMAIL_ATTEMPTS: 0,
	COLORS: {
		BACKGROUND_READ: '#666666', 
		BACKGROUND_UNREAD: '#CC3C29', 
		FOREGROUND_READ: '#999999', 
		FOREGROUND_UNREAD: '#FFFFFF'
	},
	pad: function(n) {
		return (n < 10) ? '0' + n: '' + n;
	},
	dateToString: function(date) {
		// If d not supplied, use current date
		var date = date || new Date();
		
		return date.getFullYear() + '-' + gpe.pad(date.getMonth() + 1) + '-' + gpe.pad(date.getDate()) + 'T00:00:00Z';
		//+ gpe.pad(date.getHours()) + ':' + gpe.pad(date.getMinutes()) + ':' + gpe.pad(date.getSeconds());
	}, 
	checkUnreadCount: function() {
		// Get Reader Count.
		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'https://www.google.com/reader/api/0/unread-count?all=true&output=json', 
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'text/xml', 
			}, 
			onload: function(response) {
				var count = 0;
				var feeds = $.parseJSON(response.responseText).unreadcounts;
				$(feeds).each(function(i, feed) {
					if (feed.id.match('reading-list$')) {
						count = feed.count;
						//console.log('Reader count: ' + count);
						return;
					}
				});
				gpe.showReaderCount(count);
			}
		});
		
		// Get Gmail Count.
		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'https://mail.google.com/mail/feed/atom', 
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'text/xml', 
			}, 
			onload: function(response) {
				var xml = $.parseXML(response.responseText);
				var count = $(xml).find('fullcount').text();
				gpe.showGmailCount(count);
			}
		});
		
		// Get Calendar Count.
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate()+1);
		GM_xmlhttpRequest({
			method: 'GET', 
			url: 'https://www.google.com/calendar/feeds/' + gpe.email_address + '/private/full?fields=link, entry(title)&start-min=' + gpe.dateToString() + '&start-max=' + gpe.dateToString(tomorrow), 
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'text/xml', 
			}, 
			onload: function(response) {
				var xml = $.parseXML(response.responseText);
				var count = $(xml).find('entry').length;
				gpe.showCalendarCount(count);
			}
		});
	},
	showReaderCount: function(count) {
		// Reader Count Box.
		var color = count > 0 ? gpe.COLORS.FOREGROUND_UNREAD : gpe.COLORS.FOREGROUND_READ;
		var background = count > 0 ? gpe.COLORS.BACKGROUND_UNREAD : gpe.COLORS.BACKGROUND_READ;
		var reader_count_box = $(gpe.CONTEXT).find('#gpe_reader_count')[0];
		
		if (!reader_count_box) {
			var reader_count_box = gpe._makeCountBox('gpe_reader_count');
			var host = $(gpe.CONTEXT).find('#gbz a[href*="/reader/"] .gbts');
			gpe._append(reader_count_box, host);
		} else {
			if ($(reader_count_box).html() == count) return;
		}
		gpe._updateCountBox(reader_count_box, count, color, background);
	}, 
	showGmailCount: function(count) {
		// Gmail Count Box.
		var color = count > 0 ? gpe.COLORS.FOREGROUND_UNREAD : gpe.COLORS.FOREGROUND_READ;
		var background = count > 0 ? gpe.COLORS.BACKGROUND_UNREAD : gpe.COLORS.BACKGROUND_READ;
		var gmail_count_box = $(gpe.CONTEXT).find('#gpe_gmail_count')[0];
		
		if (!gmail_count_box) {
			 var gmail_count_box = gpe._makeCountBox('gpe_gmail_count');
			 var host = $(gpe.CONTEXT).find('#gbz a[href*="/mail/"] .gbts');
			gpe._append(gmail_count_box, host);
		} else {
			if ($(gmail_count_box).html() == count) return;
		}
		gpe._updateCountBox(gmail_count_box, count, color, background);
	},
	showCalendarCount: function(count, bgcolor, color) {
		// Calendar Count Box.
		var color = count > 0 ? gpe.COLORS.FOREGROUND_UNREAD : gpe.COLORS.FOREGROUND_READ;
		var background = count > 0 ? gpe.COLORS.BACKGROUND_UNREAD : gpe.COLORS.BACKGROUND_READ;
		var calendar_count_box = $(gpe.CONTEXT).find('#gpe_calendar_count')[0];
		
		if (!calendar_count_box) {
			var calendar_count_box = gpe._makeCountBox('gpe_calendar_count');
			var host = $(gpe.CONTEXT).find('#gbz a[href*="/calendar"] .gbts');
			gpe._append(calendar_count_box, host);
		} else {
			if ($(calendar_count_box).html() == count) return;
		}
		gpe._updateCountBox(calendar_count_box, count, color, background);
	},
	init: function () {
		gpe.CONTEXT = $('#canvas_frame').contents()[0] || gpe.CONTEXT;
		
		// Get Email address of the account.
		gpe.email_address = $(gpe.CONTEXT).find('#gbd4 .gbps2').html();
		if (!gpe.email_address) {
			if (gpe.EMAIL_ATTEMPTS < gpe.EMALI_MAX_ATTEMPTS) {
				setTimeout(gpe.init, 3*1000);
				gpe.EMAIL_ATTEMPTS = gpe.EMALI_MAX_ATTEMPTS + 1;
				return;
			} else {
				console.error('Could not retrieve Email address from UI.');
			}
		}
		
		gpe._addReaderItem();
		gpe._addCalenderItem();
		gpe.checkUnreadCount();
		//gpe._addTranslatePost();
	},
	_addTranslatePost: function () {
		var menu = $(gpe.CONTEXT).find('div.a-f-i-Ia-D.d-D[role=menu]');
		//console.log('Menu size: '+ menu.size());
		var exists = menu.size() > 0;
		if (!exists) return;
		
		//console.log('Adding Translate Post...');
		menu.each(function() {
		$(this).append($('<div />').addClass('a-Ja-h d-ra a-Ja-h-Nt1BRe a-b-f-i-Ii-u').attr('role', 'menu').css('-webkit-user-select', 'none').attr('id', ':bt').mouseover(function() {
			$(this).addClass('d-ra-Od');
		}).mouseout(function() {
			$(this).removeClass('d-ra-Od');
		}).append($('<div />').addClass('d-ra-p').css('-webkit-user-select', 'none').html('Translate Post').click(function() {
			//alert('translate');
		})));
		});
	},
	_makeCountBox: function (id) {
		return $('<span id="' + id + '" />').css({'display': 'none', 'position': 'relative', 'top': '-2px', 'margin-left': '6px', 'padding': '2px 8px 2px', 'font-size': '11px', 'font-weight': 'bold', '-moz-border-radius': '2px', 'border-radius': '2px'});
	}, 
	_append: function (box, where) {
		$(box).appendTo(where);
	}, 
	_updateCountBox: function (id, count, color, background) {
		$(id).fadeOut(400, function() {
			$(this).html(count).css({'color': color, 'background-color': background}).fadeIn(300);
		});
	},
	_addReaderItem: function () {
		var exists = $(gpe.CONTEXT).find('#gbz a[href*="/reader/"] .gbts').size() >= 1;
		if (exists) { return; }
		gpe._addListItem('http://www.google.com/reader/?tab=Xy', 'Reader');
		$(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/reader/"]').parent().remove();
	}, 
	_addCalenderItem: function () {
		var exists = $(gpe.CONTEXT).find('#gbz a[href*="/calendar"] .gbts').size() >= 1;
		if (exists) { return; }
		gpe._addListItem('http://www.google.com/calendar/?tab=Xy', 'Calendar');
		$(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/calendar"]').parent().remove();
	}, 
	_addListItem: function (url, text) {
		var link = $('<a />').attr('href', url).addClass('gbzt').attr('target', '_blank').append($('<span/>').addClass('gbtb2')).append($('<span />').addClass('gbts').html(text));
		var item = $('<li />').addClass('gbt').append(link);
		$(gpe.CONTEXT).find('#gbz ol.gbtc li.gbt:last-child').before(item);
	}

}

// Run the script.
if (window.top == window.self) {
	$(function () {
	//console.log('Script is running');
	gpe.init();
	// Set an interval to refresh the count every few minutes.
	setInterval(gpe.checkUnreadCount, 2*60*1000);
	});
}
})();
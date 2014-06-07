// ==UserScript==
// @id             google+enhancerModBeta
// @name           Google+ Enhancer Mod Experimental
// @description    Enhances the user experience on Google+ and adds some features that are missing from the site, thus far. - This is a modification, it fixes the issue where the original g+e does not work
// on google.* search sites. It also adds "Reader" & "Calendar" to the bar if they do not exist.
// @namespace      http://twimager.com/gpeme/
// @version        1.0.7.1
// @date           2011-07-08
// @creator        Ryan Conrad
// @include        http://www.google.*/
// @include        http://www.google.*/ig?*
// @include        http://www.google.*/webhp?*
// @include        http://www.google.*/imghp?*
// @include        http://maps.google.*/maps?*
// @include        http://video.google.*/*
// @include        http://news.google.*/*
// @include        https://docs.google.*/*
// @include        https://mail.google.*/*
// @include        https://plus.google.*/*
// @include        https://www.google.*/calendar/*
// @include        https://www.google.*/reader/*
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
- initial branch from original g+e

v1.0.6.1
- fixed bug with reader having no unread items

v1.0.7
- EXPERIMENTAL TRANSLATE: Requires a Transate API key: get it at https://code.google.com/apis/console and change "YOUR_TRANSLATE_API_KEY" to your Key

v1.0.7.1
- updated when the counts are updated so they transition better

*******************************************/


(function() {
var gpe = {
		TRANSLATE : {
			LANGUAGE : "en",
			KEY : "YOUR_TRANSLATE_API_KEY", // visit https://code.google.com/apis/console and get your translate key
		},


		initialized : false,
		COLORS : {
			BACKGROUND_READ : "#666",
			BACKGROUND_UNREAD : "#cc3c29",
			FOREGROUND_READ : "#999",
			FOREGROUND_UNREAD : "#fff"
		},
		pad: function(n) {
				return (n < 10) ? '0' + n : '' + n;
		},
		dateToString: function(date) {
				// If d not supplied, use current date
				var date = date || new Date();
				
		return date.getFullYear() + '-' + gpe.pad(date.getMonth() + 1) + '-' + gpe.pad(date.getDate()) + 'T00:00:00Z';
				//+ gpe.pad(date.getHours()) + ':' + gpe.pad(date.getMinutes()) + ':' + gpe.pad(date.getSeconds());
		},
		checkUnreadCount: function() {
				// Get Email address of the account.
				var email = $('#gbmpdv .gbps2').html();
				if (!email) return;
				
				// Get Reader Count.
				GM_xmlhttpRequest({
						method: 'GET',
						url: 'https://www.google.com/reader/api/0/unread-count?all=true&output=json',
						headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
								'Accept': 'text/xml',
						},
						onload: function(response) {
								var feeds = $.parseJSON(response.responseText).unreadcounts;
								var found = false;
								$(feeds).each(function(i, feed) {
										if (feed.id.match('reading-list$')) {
												//console.log('Reader count: ' + feed.count);
														var count = 0;
														if ( feed.count ) {
															count = feed.count;
														}
														found = true;
														gpe.showReaderCount(count, count <= 0 ? gpe.COLORS.BACKGROUND_READ : gpe.COLORS.BACKGROUND_UNREAD ,count <= 0 ? gpe.COLORS.FOREGROUND_READ : gpe.COLORS.FOREGROUND_UNREAD);
										}
								});

								if ( !found ) {
									gpe.showReaderCount(0, gpe.COLORS.BACKGROUND_READ,gpe.COLORS.FOREGROUND_READ);
								}
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
								gpe.showGmailCount(count, count <= 0 ? gpe.COLORS.BACKGROUND_READ : gpe.COLORS.BACKGROUND_UNREAD ,count <= 0 ? gpe.COLORS.FOREGROUND_READ : gpe.COLORS.FOREGROUND_UNREAD );
						}
				});
				
				// Get Calendar Count.
				var tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate()+1);
				GM_xmlhttpRequest({
						method: 'GET',
						url: 'https://www.google.com/calendar/feeds/' + email + '/private/full?fields=link,entry(title)&start-min=' + gpe.dateToString() + '&start-max=' + gpe.dateToString(tomorrow),
						headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
								'Accept': 'text/xml',
						},
						onload: function(response) {
								var xml = $.parseXML(response.responseText);
								var count = $(xml).find('entry').length;
										gpe.showCalendarCount(count, count <= 0 ? gpe.COLORS.BACKGROUND_READ : gpe.COLORS.BACKGROUND_UNREAD ,count <= 0 ? gpe.COLORS.FOREGROUND_READ : gpe.COLORS.FOREGROUND_UNREAD);
						}
				});
		},
		showReaderCount: function(count, bgcolor, fcolor) {
				
				//console.log('reader');
				var reader_count_box = $('#gpe_reader_count')[0];
				if ( !reader_count_box ) {
					var reader_count_box = gpe._makeCountBox("gpe_reader_count",count,bgcolor,fcolor);
				} else {
					reader_count_box.html(count).css("color",fcolor).css("background-color",bgcolor);
				}
				
				
				var host = $('#gbz a[href*="/reader/"] .gbts');
				gpe._append(reader_count_box,host);
				$(reader_count_box).fadeIn(300);
		},
		showGmailCount: function(count, bgcolor, fcolor ) {
				//console.log('gmail');
				var gmail_count_box = $('#gpe_gmail_count')[0];
				if ( !gmail_count_box ) {
					var gmail_count_box = gpe._makeCountBox("gpe_gmail_count",count,bgcolor,fcolor);
				} else {
					gmail_count_box.html(count).css("color",fcolor).css("background-color",bgcolor);
				}
				gpe._append(gmail_count_box,'#gbz a[href*="/mail/"] .gbts');
				$(gmail_count_box).fadeIn(300);
		},
		showCalendarCount: function(count, bgcolor, fcolor) {
				//console.log('calendar');
				var calendar_count_box = $('#gpe_calendar_count')[0];

				if ( !calendar_count_box ) {
					var calendar_count_box = gpe._makeCountBox("gpe_calendar_count",count,bgcolor,fcolor);
				} else {
					calendar_count_box.html(count).css("color",fcolor).css("background-color",bgcolor);
				}
				gpe._append(calendar_count_box,'#gbz a[href*="/calendar"] .gbts');
				$(calendar_count_box).fadeIn(300);
		},
		init : function ( ) {
			$("body").live("DOMNodeInserted",function ( ) {
				if ( gpe.initialized ) {
					//console.log("do check");
					gpe._addTranslatePost();
				}
			});
			
			gpe._addReaderItem();
			gpe._addCalenderItem();
			gpe.checkUnreadCount();
			
			$(document).live("DOMContentLoaded",function ( ) {
				console.log("dom loaded");
			});
			//gpe.initialized = true;
		},
		
		getTranslation : function ( text, lang, where ) {
			if ( !gpe._hasTranslateKey() ) {
				if ( !gpe._setUpTranslateKey() ) {
					return;
				}
			}

			if ( lang == null ) {
				lang = "en";
			}
			GM_xmlhttpRequest({
						method: 'GET',
						url: 'https://www.googleapis.com/language/translate/v2?target=' + lang + '&q=' + encodeURI(text) + '&key=' + gpe.TRANSLATE.KEY,
						headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
								'Accept': '*',
						},
						onload: function(response) {
								var result = $.parseJSON(response.responseText);
								if ( result != null ) {
									if ( result.data.translations != null && result.data.translations.length > 0 ) {
										var trans = result.data.translations[0].translatedText;
										where.html("<b>translated:</b>" + trans);
									}
								}
						}
			});
		},

		_setUpTranslateKey : function ( ) {
			alert("you need to set the API KEY in the script - see https://code.google.com/apis/console for the key");
			return false;
		},

		_hasTranslateKey : function ( ) {
			var def = "YOUR_TRANSLATE_API_KEY";

			return gpe.TRANSLATE.KEY !== def;
		},

		_addTranslatePost : function ( ) {
			var menu = $("div.a-f-i-Ia-D.d-D[role=menu]");
			var exists = menu.size() > 0;
			if ( !exists ) { return; }
			menu.each(function() {
				var $t = $(this);
				if ( $(".t-r-a-n-sl-a-t-e",$t).size() >= 1 ) {
					return $t;
				}
				$t.append($("<div />").addClass("a-Ja-h d-ra a-Ja-h-Nt1BRe a-b-f-i-Ii-u t-r-a-n-sl-a-t-e").attr("role","menu").css("-webkit-user-select","none").attr("id",":bt").mouseover(function() {
					$(this).addClass("d-ra-Od");
				}).mouseout(function() {
					$(this).removeClass("d-ra-Od");
				}).append($("<div />").addClass("d-ra-p").css("-webkit-user-select","none").html("Translate Post").click(function() {
					var h = $(this).parent().parent().parent().find(".a-b-f-i-p-R");
					var content = h.html();
					gpe.getTranslation(content,gpe.TRANSLATE.LANGUAGE,h);
					$(this).parent().parent().fadeOut(400);
				})));
			});
		},


		_makeCountBox : function ( id, count, bgcolor, fcolor ) {
			if ( !bgcolor || bgcolor.length == 0 ) {
				 bgcolor =  gpe.COLORS.BACKGROUND_READ;  
			}
			if ( !fcolor || fcolor.length == 0 ) {
				 fcolor =  gpe.COLORS.FOREGROUND_READ;  
			}
			return $("<span id=\""+id+"\" />").css("display","none").css("position","relative")
				.css("top","-2px").css("margin-left","6px").css("padding","2px 8px 2px")
				.css("color",fcolor).css("background-color",bgcolor).css("font-size","11px")
				.css("font-weight","bold").css("-moz-border-radius", "2px").css("border-radius", "2px").html(count);
		},
		_append : function ( box, where ) {
			$(box).appendTo(where);
		},
		_addReaderItem : function ( ) {
			var exists = $("#gbz a[href*=\"/reader/\"] .gbts").size() >= 1;
			if ( exists ) { return; }
			gpe._addListItem("http://www.google.com/reader/?tab=Xy","Reader");
			$("#gbz ol.gbmcc li.gbmtc a[href*=\"/reader/\"]").parent().remove();
		},
		_addCalenderItem : function ( ) {
			var exists = $("#gbz a[href*=\"/calendar\"] .gbts").size() >= 1;
			if ( exists ) { return; }
			gpe._addListItem("http://www.google.com/calendar/?tab=Xy","Calendar");
			$("#gbz ol.gbmcc li.gbmtc a[href*=\"/calendar\"]").parent().remove();
		},
		_addListItem : function ( url, text ) {
			var link = $("<a />").attr("href",url).addClass("gbzt").attr("target","_blank").append($("<span/>").addClass("gbtb2")).append($("<span />").addClass("gbts").html(text));
			var item = $("<li />").addClass("gbt").append(link);
			$("#gbz ol.gbtc li.gbt:last-child").before(item);
		}

}

// Run the script.
if (window.top == window.self)  {
	$(function ( ) {
		//console.log('Script is running');
		gpe.init();
		// Set an interval to refresh the count every few minutes.
		setInterval(gpe.checkUnreadCount, 3*60*1000);
		document.addEventListener("DOMContentLoaded", function ( ) {
			console.log("initialized");
			gpe.initialized = true;
		},false);
	});
}
})();
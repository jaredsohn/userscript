// ==UserScript==
// @id             googlebarenhancer
// @name           Google Bar Enhancer
// @namespace      http://userscripts.org/users/373252
// @description    Enhances the user experience of the Google Bar and adds some additional features to it. It adds notifications for Gmail, Reader and Calendar, no matter what Google-website you're on. 
// @version        1.2.3
// @date           2011-08-26
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/106368.user.js

 
// ==/UserScript==
/******************************************
 
 v1.2.3 - moved the gmail, calendar, and reader bar links over to show up after the +Name link in the bar. moved the config link into the config drop down
 v1.2.2 - switched back to Script options because it added Text inputs. Added Google+ notification to show/hide options
 v1.2.1 - Active header link no longer turns grey when the page is clicked
 v1.2.0 - change the option page to the GM_config script as it allows for more functionality. Also added the option to add a username and password
 v1.1.1 - fixed the gmail z-index issue
 v1.1.0 - added Google Reader popup and added option to turn off popups
 v1.0.5 - fixed popups not closing in Gmail
 v1.0.4 - fixed the Gmail popup and missing options button issues
 v1.0.3 - added images to the mail and calendar entries
 v1.0.2 - validated the code with JSLint and cleaned up formatting
 v1.0.1 - Added the options page using the Script Options userscript located here : http://userscripts.org/scripts/show/106223
 v1.0.0 - Initial Release
 
 *******************************************/

// require        http://userscripts.org/scripts/source/49700.user.js

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
            return (n < 10) ? '0' + n : '' + n;
        },
        dateToString: function(date) {
            // If d not supplied, use current date
            date = date || new Date();

            return date.getFullYear() + '-' + gpe.pad(date.getMonth() + 1) + '-' + gpe.pad(date.getDate()) + 'T00:00:00Z';
            //+ gpe.pad(date.getHours()) + ':' + gpe.pad(date.getMinutes()) + ':' + gpe.pad(date.getSeconds());
        },
        checkUnreadCount: function() {
            // Get Reader Count.
            if (Config.get('readerCount')) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'https://www.google.com/reader/api/0/unread-count?all=true&output=json',
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                        'Accept': 'text/xml'
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
						if (Config.get('readerPopup')){
							gpe.showReaderPopup(feeds);
						}
                    }
                });
            }

            // Get Gmail Count.
			var gmailUrl = 'https://mail.google.com/mail/feed/atom';
			if (Config.get('username') !== '' && Config.get('password') !== ''){
				gmailUrl = 'https://'+Config.get('username')+':'+Config.get('password')+'@mail.google.com/mail/feed/atom';
			}
			
            if (Config.get('gmailCount')) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: gmailUrl,
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                        'Accept': 'text/xml'
                    },
                    onload: function(response) {
                        var xml = $.parseXML(response.responseText);
                        var count = $(xml).find('fullcount').text();
                        gpe.showGmailCount(count);
						if (Config.get('gmailPopup')){
							gpe.showGmailPopup(xml);
						}
                    }
                });
            }

            // Get Calendar Count
            if (Config.get('calendarCount')) {
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'https://www.google.com/calendar/feeds/' + gpe.email_address + '/private/full?fields=link, entry(title)&start-min=' + gpe.dateToString() + '&start-max=' + gpe.dateToString(tomorrow),
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                        'Accept': 'text/xml'
                    },
                    onload: function(response) {
                        var xml = $.parseXML(response.responseText);
                        var count = $(xml).find('entry').length;
                        gpe.showCalendarCount(count);
						if (Config.get('calendarPopup')){
							gpe.showCalendarPopup(xml);
						}
                    }
                });
            }
        },
        showReaderCount: function(count) {
            // Reader Count Box.
            var color = count > 0 ? gpe.COLORS.FOREGROUND_UNREAD : gpe.COLORS.FOREGROUND_READ;
            var background = count > 0 ? gpe.COLORS.BACKGROUND_UNREAD : gpe.COLORS.BACKGROUND_READ;
            var reader_count_box = $(gpe.CONTEXT).find('#gpe_reader_count')[0];

            if (!reader_count_box) {
                reader_count_box = gpe._makeCountBox('gpe_reader_count');
                var host = $(gpe.CONTEXT).find('#gbz a[href*="/reader/"] .gbts');
                gpe._append(reader_count_box, host);
				
				// Mod
				if (Config.get('readerPopup')){
					var gpe_reader_count = $(gpe.CONTEXT).find('#gpe_reader_count');
					$(gpe_reader_count).click(function(e) {
						
						gpe.popupToggle('#gpe_reader_popup','#gbz a[href*="/reader/"] .gbts');
						
						return false;
					});
				}
                // End Mod
            } else {
                if ($(reader_count_box).html() == count) {
                    return;
                }
            }
            gpe._updateCountBox(reader_count_box, count, color, background);
        },
        showGmailCount: function(count) {
            // Gmail Count Box.
            var color = count > 0 ? gpe.COLORS.FOREGROUND_UNREAD : gpe.COLORS.FOREGROUND_READ;
            var background = count > 0 ? gpe.COLORS.BACKGROUND_UNREAD : gpe.COLORS.BACKGROUND_READ;
            var gmail_count_box = $(gpe.CONTEXT).find('#gpe_gmail_count')[0];

            if (!gmail_count_box) {
                gmail_count_box = gpe._makeCountBox('gpe_gmail_count');
                var host = $(gpe.CONTEXT).find('#gbz a[href*="/mail/"] .gbts');
                gpe._append(gmail_count_box, host);

                // Mod
				if (Config.get('gmailPopup')){
					var gpe_gmail_count = $(gpe.CONTEXT).find('#gpe_gmail_count');
					$(gpe_gmail_count).click(function(e) {
						
						gpe.popupToggle('#gpe_gmail_popup','#gbz a[href*="/mail/"] .gbts');
						
						return false;
					});
				}
                // End Mod
            } else {
                if ($(gmail_count_box).html() == count) {
                    return;
                }
            }
            gpe._updateCountBox(gmail_count_box, count, color, background);
        },
        showCalendarCount: function(count, bgcolor, color) {
            // Calendar Count Box.
            color = count > 0 ? gpe.COLORS.FOREGROUND_UNREAD : gpe.COLORS.FOREGROUND_READ;
            var background = count > 0 ? gpe.COLORS.BACKGROUND_UNREAD : gpe.COLORS.BACKGROUND_READ;
            var calendar_count_box = $(gpe.CONTEXT).find('#gpe_calendar_count')[0];

            if (!calendar_count_box) {
                calendar_count_box = gpe._makeCountBox('gpe_calendar_count');
                var host = $(gpe.CONTEXT).find('#gbz a[href*="/calendar"] .gbts');
                gpe._append(calendar_count_box, host);

                // Mod
				if (Config.get('calendarPopup')){
					var gpe_calendar_count = $(gpe.CONTEXT).find('#gpe_calendar_count');
					$(gpe_calendar_count).click(function(e) {
						
						gpe.popupToggle('#gpe_calendar_popup','#gbz a[href*="/calendar"] .gbts');
						
						return false;
					});
				}
                // End Mod
            } else {
                if ($(calendar_count_box).html() == count) {
                    return;
                }
            }
            gpe._updateCountBox(calendar_count_box, count, color, background);
        },
        showGmailPopup: function(xml) {
            // Gmail Popup Box.
            //console.log("showGmailPopup");
            var today = new Date();
            var offset = (today.getTimezoneOffset() / 60);
            today.setDate(today.getDate());
            var dateDiff;

            var content = '<div style="padding: 12px 19px 12px 19px; vertical-align:middle; display: block; color:#000;"><a href="https://www.gmail.com" style="float:right; text-decoration:none;" target="_blank">View All »</a><div style="display:inline; font-size:110%; font-weight:bold;">Mail</div></div>';
            $(xml).find("entry").each(function() {
                dateDiff = $(this).find("issued").text();
                dateDiff = new Date(dateDiff.substr(0, 4), dateDiff.substr(5, 2) - 1, dateDiff.substr(8, 2), dateDiff.substr(11, 2) - offset, dateDiff.substr(14, 2), dateDiff.substr(17, 2), 0); //new Date(year, month, day, hours, minutes, seconds, milliseconds)
                dateDiff = gpe._timeDifference(today, dateDiff);

                content += '<a style="border-top: 1px solid #dedfe4;  background-color:#edf0f9;padding: 10px 19px 10px 19px;  display:block; text-decoration:none; color:#666;" href="' + $(this).find("link").attr("href") + '" target="_blank"><img src="data:image/gif;base64,R0lGODlhIwAjANUAAJ+fn6amprUuLrdcXLgvL7hJSbiFhbswMLy8vL86OsE7O8MyMss0NMw+PsxOTs1jY86FhdM2NtRBQddWVtg2Ntk4ONtCQtuUlNxubt1MTN3d3d5TU95ZWd7U0+CNjeDV1eFhYeHh4eJpaeNeXuRzc+Wbm+Z6euiEhOqLi+uWluudne2goO7u7u+rq/CiovG0tPO9vfTGxvT09PXNzffV1fjc3PvJyfzq6v2zs/3U1P3y8v66uv7Fxf7j4/7+/gAAACH5BAkKAD8ALAAAAAAjACMAAAb/wJ9wSCwaj8ikcslsOp/QqBRZqbh62Kx2q7VZKGAjuFpR+c7otPocs5ApFQQRTq6c1vhzq161BIYcfFUiOnlpKIIVfiFCgVUZdRs9hjoikWSLjWQkiJgzeD0bdScqmAGMP44VJD57dS9qbXUrPitVEZmpm2xuZClormQwZ7YUERKnmlWsZzWQZCY6nY80aLYRx8m6y2k3IHW9VSA3adfZqKrMaSSJJmsr2OfKq3gnfCh4KtgMDdrpazlwlKriAkeONfoY8PO3C42OHTwKxcjwyYcNHOTQJFzQD11DHwEn5elhUCODBQsUMOT2kIehNDZ2FCpx8oBKj8tCvlRzwyDNdgU2V1YYYWNnHhskgAZFF0+E0TwyPCi92SgeBhlYs2rdyvXCVG0TrHIdO5aF1wNLhThAueDBh7dw48qF26EuhAMECCTQ9kNA3gIGAgseTLjwAAGID/wZgiAAgMeQI0uePDmAnCIaMmvezLlz5ymgQ4seTbp06SAAOw==" style="width:35px;height:35px;padding-right:5px;float:left;"><div style="display:table-cell; line-height:1.4; overflow:hidden; vertical-align:middle; padding: 1px 0; width:330px; float:left; white-space:normal;">' + $(this).find("author").find("name").text() + ' » ' + $(this).find("title").text() + '</div><div style="line-height:1.4; white-space:normal; font: normal 11px arial,sans-serif;">' + dateDiff + '</div><div style="clear:both"></div></a>';

                //console.log($(this).find("link").attr("href"));
            });

            var gmail_popup_box = $(gpe.CONTEXT).find('#gpe_gmail_popup')[0];

            if (!gmail_popup_box) {
                gmail_popup_box = gpe._makePopupBox('gpe_gmail_popup');
                var host = $(gpe.CONTEXT).find('#gbz');
                gpe._append(gmail_popup_box, host);
            } else {
                if ($(gmail_popup_box).html() == content) {
                    return;
                }
            }
            gpe._updatePopupBox(gmail_popup_box, content);
        },
        showCalendarPopup: function(xml) {
            // Calendar Popup Box.
            //console.log("showCalendarPopup");
            var content = '<div style="padding: 12px 19px 12px 19px; vertical-align:middle; display: block; color:#000;"><a href="https://www.google.com/calendar" style="float:right; text-decoration:none;" target="_blank">View All »</a><div style="display:inline; font-size:110%; font-weight:bold;">Calendar</div></div>';
            $(xml).find("entry").each(function() {
                content += '<a style="border-top: 1px solid #dedfe4;  background-color:#edf0f9;padding: 10px 19px 10px 19px; cursor:pointer; display:block; text-decoration:none; color:#666;" href="' + $(this).find("link").attr("href") + '" target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE3MjE0RDJBQ0NDMTFERjk1RkZFNEJFOUEwMkFGODUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjE3MjE0RDNBQ0NDMTFERjk1RkZFNEJFOUEwMkFGODUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRDE1NEQ2QkFDQ0MxMURGOTVGRkU0QkU5QTAyQUY4NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRDE1NEQ2Q0FDQ0MxMURGOTVGRkU0QkU5QTAyQUY4NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgse+iIAAAWmSURBVHjazFjdT1xFFD97d2EX2F2hfKNQigXE8iAfVaqJpomVh1ajffPBB9/8C9QUpdHEpEYTH0yTRpM2aaSVqiRqMYVGYxtbSilNjFK+tsjXAnEXShfYhb1773jO7J1xgEU3QBtuMnvn4945v3t+vzlzZm2MMdgplwY76NpRYBz0Y7PZNj3B8eamLQH44MOPZN1GmlHA2Kyytv4gLmYVWXeolDW/f+wkAnvrYVCCTrgajUa/OPHxp63YNCVNwgsEJFj86kPRR8pK8HnPzFXSbBuWGBZDBcPFvLwcfShgmK6DaZpkMzUhTRzMShzM0WdLoX9intfTnQ5YWo4BSYvqu/PckON1Qdv1UQiGljcFxhaLEVV2rDotmsz1nonGIAMNDvvvQ1FWGgTuL8P84grvo4vqmekpMDW7BJPBxU17xm4aqmfIA9o6MCsIhspvfdMbTnTbF9gyTanMEHYJA3nIptLEl/G+ksx16++/OtaPs4T9TOmkm30FaRpnmgCyFgy/TrzZsKExbkcxJprCULytjDMxzsBk8THRPzk+Ci1nfhVa1f53O3hQQERJem+6dOmirPuGh6Cn+7o01IFjc7OzvD43NwudHRclkJ6eLv68ANLZ0S6BjPiG4XbPDetjWOK9KZFH9j99QHqkqOgxyM3Llx6p338A3F4vb3g8Xqirb5DvVVTuA7vdIT1SW/+M9EgBzpOdm8/Bmcns2htRA2uoYQo1bA01dAlqgK2mhgNhYgNIkqab3V1yZr9/Agb6+ySAnptdsBAK8YlDeL+F1AhjgwN9MInPC5C9RIv13tTUBAwO3vlXa0nRhE82Nh6W3ijbWwF7FLEeajwiNZK1KxtefOmI1EgNUqaK9eChw9KDJXvKoaS0PB5ukxGwoMbnG5LuJ7H6/ZNy1dz1DUIkEuH1cDiC7SGpkSn0yj0UtfCUb3gAIy2DGCIIBP6G8YkxCwhLgibri/mEVjOIq2Dk8mVYmvTzL6QVpMd0PqbjhkdtoZGFhRAshcMIALdh7JuemUYgCAYb9+ZDEAwEODgz2aVNz9XhaiJjY9+1wR+vvwFm58/wy8uvQNjvhzpaTW4vH3d7PKuo2VvxJBQUFiMQBoZhQn3DCxyMjuCKSsqgsroWDGwnFWcENSTSKIqz9+13oPLUSch97114pKoKAje6+RgJl8zTvZcEbHlxAAVMVBgcAIOOn36AmEXZX+jhP3+/hV5J0jNi0kwUZhhpcWA8ya+pBXNyCub7+8GLgLKyssHhcPAJKaZkYltoJD3DA6lOF4JBCk0b7MothJGZIISWFsCOO78zI4PTSLuSpmkeNf10JJIMjTxeVsHv6UWPwhWkjEBVNx0D7xNV4FFCvDMtDUrLyq02BbZi0HFD1lGx1FddUw/jwVl4anc2ABXrGr47TynEgrq7JA56+CNC/MEfv4dqDP95pz6H4teOyhA/Nxdct9cYqFodOSEgYfRMBD1Dq4gZq/P6MfTyN63ncIVOXaB00wqBzJFIvVzASogvxK/NyS1YFeLdHq8EEY8b8eVrkFfoSR2B0AimhzqLrQLScvY0BseBT75qOd8u8t+EYESAomAmvtzlSgOnyyWpUTUinhc0GRplcRrYNaSJ0hQbA7t1FBJA7vT1fdZy7ms6FSxbWZ6hpp18OzEM49rY6MhzqpBleqCkCGIlyBSB6gZ5iHHh0jgHZ8bfi8aiqJEop8YCch67l7BELDAxFQy3tbi4ePrsmS81BOWgZJlyVLxrWzzMsdTU1Jwruh4YH59oa73wbbsFZFEBw2kSJ0oymGJl6i4sbixpVrKcsg1nctP6+qhFTcQqKyoYlSbq0BUvRJVkeStgBMuGAkgUXQBRwTAFvahHlWR5O8CYlmFDWUFGoqDHFO+IF7VtPvybytymGuwS5TMqIFM9vmzjvw7yfry5ia39S+QfAQYA8w/Hli82svMAAAAASUVORK5CYII=" style="width:35px;height:35px;padding-right:5px;float:left;"><div style="display:table-cell; line-height:1.4; overflow:hidden; vertical-align:middle; padding: 1px 0; width:360px; float:left; white-space:normal;">' + $(this).find("title").text() + '</div><div style="clear:both"></div></a>';

                //console.log($(this).find("link").attr("href"));
            });

            var calendar_popup_box = $(gpe.CONTEXT).find('#gpe_calendar_popup')[0];

            if (!calendar_popup_box) {
                calendar_popup_box = gpe._makePopupBox('gpe_calendar_popup');
                var host = $(gpe.CONTEXT).find('#gbz');
                gpe._append(calendar_popup_box, host);
            } else {
                if ($(calendar_popup_box).html() == content) {
                    return;
                }
            }
            gpe._updatePopupBox(calendar_popup_box, content);
        },
		showReaderPopup: function(json) {
            // Reader Popup Box.
            //console.log("showReaderPopup");
			var label = '';
            var content = '<div style="padding: 12px 19px 12px 19px; vertical-align:middle; display: block; color:#000;"><a href="https://www.google.com/reader" style="float:right; text-decoration:none;" target="_blank">View All »</a><div style="display:inline; font-size:110%; font-weight:bold;">Reader</div></div>';
            
			$(json).each(function(i, feed) {
				if (feed.id.match('label')) {
					label = feed.id.split("/");
					label = label[label.length - 1];
					content += '<a style="border-top: 1px solid #dedfe4;  background-color:#edf0f9;padding: 10px 19px 10px 19px;  display:block; text-decoration:none; color:#666;" href="https://www.google.com/reader/view/user%2F-%2Flabel%2F' + label + '" target="_blank"><img src="data:image/gif;base64,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" style="width:35px;height:35px;padding-right:5px;float:left;"><div style="display:table-cell; line-height:1.4; overflow:hidden; vertical-align:middle; padding: 1px 0; width:330px; float:left; white-space:normal; min-height:30px;">' + label + '</div><div style="line-height:1.4; white-space:normal; ">' + feed.count + '</div><div style="clear:both"></div></a>';
					
				}
			});
			
            var reader_popup_box = $(gpe.CONTEXT).find('#gpe_reader_popup')[0];

            if (!reader_popup_box) {
                reader_popup_box = gpe._makePopupBox('gpe_reader_popup');
                var host = $(gpe.CONTEXT).find('#gbz');
                gpe._append(reader_popup_box, host);
            } else {
                if ($(reader_popup_box).html() == content) {
                    return;
                }
            }
            gpe._updatePopupBox(reader_popup_box, content);
        },
        init: function() {
            gpe.CONTEXT = $('#canvas_frame').contents()[0] || gpe.CONTEXT;
			
            // Get Email address of the account.
            gpe.email_address = $(gpe.CONTEXT).find('#gbd4 .gbps2').html();
            if (!gpe.email_address) {
                if (gpe.EMAIL_ATTEMPTS < gpe.EMALI_MAX_ATTEMPTS) {
                    setTimeout(gpe.init, 3 * 1000);
                    gpe.EMAIL_ATTEMPTS = gpe.EMALI_MAX_ATTEMPTS + 1;
                    return;
                } else {
                    console.error('Could not retrieve Email address from UI.');
                }
            }
			
            // Options
			gpe.createOptions();
            gpe.insertOptionsLink();
			
            gpe._addReaderItem();
            gpe._addCalenderItem();
			gpe._addGMailItem();
            gpe.checkUnreadCount();
			
			if (!Config.get('plusCount')) {
				$(gpe.CONTEXT).find('#gbgs1').css({'display':'none'});
			};

            //gpe._addTranslatePost();
			
			var gbg1 = $(gpe.CONTEXT).find('#gbg1');
			$(gpe.CONTEXT).add(gbg1).click(function() {
				gpe.popupToggle();
			});

        },
        _addTranslatePost: function() {
            var menu = $(gpe.CONTEXT).find('div.a-f-i-Ia-D.d-D[role=menu]');
            //console.log('Menu size: '+ menu.size());
            var exists = menu.size() > 0;
            if (!exists) {
                return;
            }

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
        _makeCountBox: function(id) {
            return $('<span id="' + id + '" />').css({
                'display': 'none',
                'position': 'relative',
                'top': '-2px',
                'margin-left': '6px',
                'padding': '2px 8px 2px',
                'font-size': '11px',
                'font-weight': 'bold',
                '-moz-border-radius': '2px',
                'border-radius': '2px'
            });
        },
        _makePopupBox: function(id) {
            return $('<div id="' + id + '" />').css({
                'display': 'none',
                'position': 'relative',
                'top': '-1px',
                'font': 'normal 13px arial,sans-serif',
                'background-color': 'white',
                'color': '#666',
                'border': '1px solid #A9A9A9',
                'width': '450px',
                'max-width': '450px',
                '-moz-box-shadow': '0 0 5px #888',
                '-webkit-box-shadow': '0 0 5px#888',
                'box-shadow': '0 0 5px #888'
            });
        },
        _append: function(box, where) {
            $(box).appendTo(where);
        },
        _updateCountBox: function(id, count, color, background) {
            $(id).fadeOut(400, function() {
                $(this).html(count).css({
                    'color': color,
                    'background-color': background
                }).fadeIn(300);
            });
        },
        _updatePopupBox: function(id, content) {
            $(id).html(content);
        },
        _addReaderItem: function() {
            /*var exists = $(gpe.CONTEXT).find('#gbz a[href*="/reader/"] .gbts').size() >= 1;
            if (exists) {
                return;
            }
            gpe._addListItem('http://www.google.com/reader/?tab=Xy', 'Reader');
            $(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/reader/"]').parent().remove();*/
			var exists = $(gpe.CONTEXT).find('#gbz a[href*="/reader"] .gbts').size() >= 1;
			if (!exists) {
				$(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/reader"]').parent().remove();
			} else {
				$(gpe.CONTEXT).find('#gbz a[href*="/reader"] .gbts').parent().remove();
			}
			
			gpe._addListItem('https://www.google.com/reader/?tab=Xy', 'Reader');
        },
        _addCalenderItem: function() {
            /*var exists = $(gpe.CONTEXT).find('#gbz a[href*="/calendar"] .gbts').size() >= 1;
            if (exists) {
                return;
            }
            gpe._addListItem('http://www.google.com/calendar/?tab=Xy', 'Calendar');
            $(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/calendar"]').parent().remove();*/
			var exists = $(gpe.CONTEXT).find('#gbz a[href*="/calendar"] .gbts').size() >= 1;
			if (!exists) {
				$(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/calendar"]').parent().remove();
			} else {
				$(gpe.CONTEXT).find('#gbz a[href*="/calendar"] .gbts').parent().remove();
			}
			
			gpe._addListItem('https://www.google.com/calendar/?tab=Xy', 'Calendar');
        },
		_addGMailItem: function() {
            var exists = $(gpe.CONTEXT).find('#gbz a[href*="/mail"] .gbts').size() >= 1;
				if (!exists) {
					$(gpe.CONTEXT).find('#gbz ol.gbmcc li.gbmtc a[href*="/mail"]').parent().remove();
				} else {
					$(gpe.CONTEXT).find('#gbz a[href*="/mail"] .gbts').parent().remove();
				}
				
				gpe._addListItem('https://mail.google.com/mail/?tab=Xy', 'GMail');
        },
        _addListItem: function(url, text) {
            /*var link = $('<a />').attr('href', url).addClass('gbzt').attr('target', '_blank').append($('<span/>').addClass('gbtb2')).append($('<span />').addClass('gbts').html(text));
            var item = $('<li />').addClass('gbt').append(link);
            $(gpe.CONTEXT).find('#gbz ol.gbtc li.gbt:last-child').before(item);*/
			var link = $('<a />').attr('href', url).addClass('gbzt').attr('target', '_blank').append($('<span/>').addClass('gbtb2')).append($('<span />').addClass('gbts').html(text));
				var item = $('<li />').addClass('gbt').append(link);
				//$(gpe.CONTEXT).find('#gbz ol.gbtc li.gbt:last-child').before(item);
				$(gpe.CONTEXT).find('#gbz ol.gbtc li.gbt:first-child').after(item);
        },
        _timeDifference: function(laterdate, earlierdate) {
            var difference = laterdate.getTime() - earlierdate.getTime();
            var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
            difference -= daysDifference * 1000 * 60 * 60 * 24;
            var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
            difference -= hoursDifference * 1000 * 60 * 60;
            var minutesDifference = Math.floor(difference / 1000 / 60);
            difference -= minutesDifference * 1000 * 60;
            var secondsDifference = Math.floor(difference / 1000);
            if (daysDifference > 1) {
                return daysDifference + ' days ago';
            } else if (daysDifference == 1) {
                return daysDifference + ' day ago';
            } else if (daysDifference < 1 && hoursDifference > 1) {
                return hoursDifference + ' hours ago';
            } else if (hoursDifference == 1) {
                return hoursDifference + ' hour ago';
            } else if (hoursDifference < 1 && minutesDifference > 1) {
                return minutesDifference + ' mins ago';
            }
            if (minutesDifference == 1) {
                return minutesDifference + ' min ago';
            } else {
                return secondsDifference + ' sec ago';
            }
        },
		
		popupToggle: function(box, parent){
			// hide inactive popup(s)
			var iParents = $(gpe.CONTEXT).find('#gbz .gbts');
			var iActive = $(gpe.CONTEXT).find('.gbz0l .gbts');
			$(iParents).not(iActive).css({
				'background-color': 'transparent',
				'color': '#cccccc'
			});
			
			var gpe_popup = $(gpe.CONTEXT).find('div:visible[id*="_popup"]');
			$(gpe_popup).hide();
			
			// show active popup
			if ( box !== undefined && parent !== undefined) {
				var aParent = $(gpe.CONTEXT).find(parent);
				$(aParent).css({
					'background-color': '#fff',
					'color': '#2d2d2d'
				});
				gpe_popup = $(gpe.CONTEXT).find(box);
				$(gpe_popup).show();
			

				// hide the google+ notification popup
				var gbto = $(gpe.CONTEXT).find('li.gbto');
				$(gbto).removeClass('gbto');
				var gbd1 = $(gpe.CONTEXT).find('#gbd1');
				$(gbd1).css({
					'visibility': 'hidden'
				});
				var gbs = $(gpe.CONTEXT).find('#gbs');
				$(gbs).css({
					'visibility': 'hidden'
				});
				var gbwc = $(gpe.CONTEXT).find('#gbwc');
				$(gbwc).hide();
			}
		},

        // Options Page Code
		createOptions: function() {
		
			Config.scriptName = 'Google+ Enhancer (Mod)';
			Config.dialogConfig = {
				draggable: false,
				modal: true,
				width: 600
			};
			Config.lang = {
				'en': {
				Cancel: 'Cancel',
				Save: 'OK',
				Options: 'Options'
				}
			};

			Config.buttons = {};
			Config.buttons[Config.getText('Save')] = function() {
				Config.save();
				Config.close();
				// Changed the reload to history.go so that it would work in gmail.
				document.location = document.location;
				history.go(0);
			}; 
			
			Config.options = {
				"General": {
					username: {
						section: ['Login Info'],
						label: 'Userame',
						type: 'text',
						"default": ''
					},
					password: {
						label: 'Password',
						type: 'password',
						"default": ''
					},
					gmailCount: {
						section: ['Notification Settings'],
						label: 'Gmail',
						type: 'checkbox',
						description: 'Counter',
						"default": true
					},
					gmailPopup: {
						label: '',
						type: 'checkbox',
						description: 'Popup',
						"default": true
					},
					readerCount: {
						label: 'Reader',
						type: 'checkbox',
						description: 'Counter',
						"default": true
					},
					readerPopup: {
						label: '',
						type: 'checkbox',
						description: 'Popup',
						"default": true
					},
					calendarCount: {
						label: 'Calendar',
						type: 'checkbox',
						description: 'Counter',
						"default": true
					},
					calendarPopup: {
						label: '',
						type: 'checkbox',
						description: 'Popup',
						"default": true
					},
					plusCount:{
						label: 'Google+',
						type: 'checkbox',
						description: 'Counter',
						"default": true
					}
				},
				"About": {
					'about': {
						type: 'html',
						text: '<p>A modified version of senseBOPs <a href="http://userscripts.org/scripts/show/106067">Google+ Enhancer</a> script.</p>'
					}
				}
			};
		},
	
		insertOptionsLink: function() {
			//var host = $(gpe.CONTEXT).find('a[href*="/preferences"].gbgt + div div ol.gbmcc li:eq(1)');
			var host = $(gpe.CONTEXT).find('#gbw #gbmpdv div div');
			
			//$('a[href*="/preferences"].gbgt + div div ol.gbmcc li:eq(1)').after('<li class="gbkc gbmtc"><a class="gbmt" href="javascript:void(0)" id="bcGEnhancerOptLnk">Google+ Enhancer (Mod)</a></li>');
			//gpe._append('<li class="gbkc gbmtc"><a class="gbmt" href="javascript:void(0)" id="bcGEnhancerOptLnk">Google Bar Enhancer</a></li>', host);
			gpe._append('<br/><a class="gbmlb" href="javascript:void(0)" id="bcGEnhancerOptLnk">Google Bar Enhancer</a>', host)
			var optLnk = $(gpe.CONTEXT).find('#bcGEnhancerOptLnk');
			$(optLnk).click(function() {
                Config.open();
            });
        }
	
	};

    // Run the script.
    if (window.top == window.self) {
        $(function() {
			//console.log('Script is running');
            gpe.init();
			
            // Set an interval to refresh the count every few minutes.
            setInterval(gpe.checkUnreadCount, 2 * 60 * 1000);
        });
    }
	
// Add style to remove the z-index on the sidebar in gmail
GM_addStyle('.n3 { z-index:1 ! important; }');

////////////////////////
// Options
///////////////////////
var Config = {
	dialog:null,
	buttons:null,
	title:null,
	scriptName:null,
	options:{},
	dialogConfig:{
		draggable:true,
		modal:true,
		width:600
	},
	lang:{
		'en':{
			Cancel:'Cancel',
			Save:'Save & Reload',
			Options:'Options'
		}
	},
	open:function() {
		if(Config.dialog === null) {
			
			Config.dialog = document.createElement('div');
			
			var html = '<div class="bcConfigDialog"><div id="bcScriptOptionContent' + Config._guid + '" style="">';
			
			var tabHtml = '';
			var contentHtml = '';
			
			// create tabs
			var i = 0;
			for(var tabLabel in Config.options) {
				tabHtml += '<li><a href="#tabs-' + i + Config._guid + '">' + tabLabel + '</a></li>';
				contentHtml += '<div id="tabs-' + i + Config._guid + '">' +
									'<table class="bcOptionsFields">';
					
				// insert options
				for(var optionKey in Config.options[tabLabel]) {
					var option = Config.options[tabLabel][optionKey];
					var name = 'bcOpt_' + optionKey + Config._guid;
					contentHtml += '<tr>';

					if(option.type == 'html') {
						contentHtml += '<td colspan="2">' + option.text;
						
					} else {
						contentHtml += '<td class="label"><label for="' + name + '">' + 
							(typeof(option.label) == 'string' ? option.label : '&nbsp;') + '</label></td>' +
							'<td><label for="' + name + '">';
						switch(option.type) {
							case 'checkbox':
								contentHtml += '<input type="checkbox" name="' + name + '"' +
								(Config.get(optionKey) ? 'checked' : '') + '/>';
								break;
							case 'text':
								contentHtml += '<input type="text" name="' + name + '" value="' +
								(Config.get(optionKey) ? unescape(Config.get(optionKey)) : '') + '"/>';
								break;
							case 'password':
								contentHtml += '<input type="password" name="' + name + '" value="' +
								(Config.get(optionKey) ? unescape(Config.get(optionKey)) : '') + '"/>';
								break;
							case 'select':
								contentHtml += '<select name="' + name + '">';
								for(var val in option.options) {
									contentHtml += '<option value="' + val + '"' +
										(Config.get(optionKey) == val ? ' selected' : '') + 
										'>' + option.options[val] + '</option>';
								}
								contentHtml += '</select>';
								break;
						}
						if(typeof(option.description) == 'string') {
							contentHtml += ' &nbsp; ' + option.description;
						}
						contentHtml += '</label>';
					}
					contentHtml += '</td></tr>';
				}
				
				contentHtml += '</table></div>';
				i++;
			}
			
			if(tabHtml != '') {
				html += '<ul>' + tabHtml + '</ul>';
				html += contentHtml;
			}
			
			html += '</div></div>';
			
			Config.dialog.innerHTML = html;
					
			// set up dialog title
			Config.dialog.title = Config.title == null ? Config.getText('Options') : Config.title;
			if(Config.scriptName != null) {
				Config.dialog.title = Config.scriptName + ' ' + Config.dialog.title;
			}
			
			if(Config.buttons == null) {
				Config.buttons = {};
				Config.buttons[Config.getText('Save')] = function() {
					Config.save();
					document.location = document.location;
				};
				Config.buttons[Config.getText('Cancel')] = function() {
					$( this ).dialog("close" );
				};
			}
			
			Config.dialogConfig.closeText = Config.getText('Cancel');
			Config.dialogConfig.buttons = Config.buttons;
			
			
			
		}
		try {	// suppress any stupid errors so we can keep going
			$(Config.dialog).dialog(Config.dialogConfig);
		} catch(e) { }
		// show footer text
		if(typeof(Config.footer) != 'undefined') {
			$('.ui-dialog-buttonpane').css('position', 'relative');
			$('.ui-dialog-buttonpane').append('<table style="position:absolute; top:0; left:10px; width:330px;"><tr valign="middle"><td style="height:45px;">' + Config.footer + '</tr></tr></table>');
		}
		// implement option tabs
		try {
			$("#bcScriptOptionContent" + Config._guid).tabs();
		} catch(e) {}
		
	},
	close:function() {
		$(Config.dialog).dialog("close");
	},
	save:function() {
		
		for(var tabLabel in Config.options) {
			// insert options
			for(var optionKey in Config.options[tabLabel]) {
				var option = Config.options[tabLabel][optionKey];
				var name = 'bcOpt_' + optionKey + Config._guid;
				var val = null;
				switch(option.type) {
					case 'checkbox':
						val = $('input[name="' + name + '"]').attr('checked') ? true : false;
						Config.set(optionKey, val);
						break;
					case 'select':
						val = $('select[name="' + name + '"]').val();
						Config.set(optionKey, val);
						break;
					case 'password': case 'text':
						val = $('input[name="' + name + '"]').val();
						Config.set(optionKey, escape(val));
						break;
				}
			}
		}
	},
	get:function(optionKey) {
		// find the config option in question
		for(var tabLabel in Config.options) {
			// insert options
			for(var k in Config.options[tabLabel]) {
				if(k == optionKey) {
					var option = Config.options[tabLabel][k];
					// get stored value
					var val = GM_getValue(optionKey, null);
					if(val == null || typeof(val) == 'undefined') {
						if(typeof(option['default']) != 'undefined') {
							return(option['default']);
						} else {
							return (type == 'text' || type == 'password') ? '' : null;
						};
					} else {
						return (option.type == 'text' || option.type == 'password') ? unescape(val) : val; 
					}
					  
				}
			}
		}
		alert(optionKey + ' is not a valid option');
		
	},
	set:function(optionKey, val) {
		GM_setValue(optionKey, val);
	},
	getText:function(key) {
		return Config.lang.en[key];
	},
	_guid:''
};

GM_addStyle(
	'.bcConfigDialog .ui-tabs .ui-tabs-nav li a { padding:0.25em 0.75em !important; }' +
	'.bcConfigDialog .ui-tabs > .ui-widget-header { background:none; border-width:0 0 1px 0; border-radius:0; }' +
	'.bcConfigDialog .ui-tabs .ui-tabs-nav { padding-left:0; }' +
	'.bcConfigDialog .ui-widget-content { border:none; }' +
	'.bcConfigDialog .ui-tabs-panel { border:1px solid #aaa; border-width:0 1px 1px; }' +
	'.ui-dialog-buttonpane { border:none !important; }' +
	'.ui-dialog .ui-dialog-content { padding:0; }' +
	'.bcOptionsFields .label { font-weight:bold; }' +
	'.bcOptionsFields a { text-decoration:underline; }'
);




})();
// ==UserScript==
// @name         Facepunch Auto-Update
// @namespace    https://deadworks.me
// @version      0.6
// @description  Notifies you of new posts in the currently viewed thread.
// @match        http://*facepunch.com/showthread.php?t=*
// @license      WTFPL
// @run-at		 document-end
// @downloadURL	 http://userscripts.org/scripts/source/166339.user.js
// @updateURL	 http://userscripts.org/scripts/source/166339.user.js
// ==/UserScript==

// This utilizes Desktop Notifications
// Webkit users have this feature already
// Firefox users may have to install plugins to gain this feature

// Obviously I started this rather awake, but I must've done the bulk
// of this at like 3 AM, I have no idea what's going on half the time

(function($, window) {
	if (!localStorage.hasOwnProperty('FPAutoUpdate_Enabled')) {
		// Enable by default
		localStorage.FPAutoUpdate_Enabled = true;
	}
	if (!localStorage.hasOwnProperty('FPAutoUpdate_Notify')
		||!window.hasOwnProperty('webkitNotifications')
		||window.webkitNotifications.checkPermission()!=0) {
		// Desktop notifications are disabled by default
		// Do we support notifications?
		// Do we have permission?
		localStorage.FPAutoUpdate_Notify = false;
	}

	// Append a setting to the 'More' menu
	// Gee, this is an original idea
	$('.navbarlink a[href=#]').click(function() {
		if (!document.getElementById('FPAutoUpdate_Notify')) {
			var toomany = 0;
			// We gotta wait for the "more.html" to be fetched and displayed
			setTimeout(function checkDone() {
				if ($('#more div').length == 0) {
					// not loaded, try again
					toomany++;
					if (toomany < 30) {
						setTimeout(checkDone, Math.round(Math.log(toomany * 2)*100));
					}
					return;
				}
				$('#more div:eq(1)').append("<br><h2>Thread Auto Update</h2><br>"+
					'<input type="checkbox"'+
					(localStorage.FPAutoUpdate_Enabled=='true'?' checked':'')+
					' id="FPAutoUpdate_Enabled" style="margin-right:16px">'+
					'<label for="FPAutoUpdate_Enabled">Enable/Disable</label>'+
					'<br>'+
					'<input type="checkbox"'+
					(localStorage.FPAutoUpdate_Notify=="true"?' checked':'')+
					(window.hasOwnProperty('webkitNotifications')?'':' disabled')+
					' id="FPAutoUpdate_Notify" style="margin-right:16px">'+
					'<label for="FPAutoUpdate_Notify">Desktop Notifications</label>');

				$('#FPAutoUpdate_Enabled, label[for="FPAutoUpdate_Enabled"]').click(function(e) {
					e.stopPropagation(); // Do not close the menu
					localStorage.FPAutoUpdate_Enabled = $('#FPAutoUpdate_Enabled').is(':checked');
				});

				$('#FPAutoUpdate_Notify, label[for="FPAutoUpdate_Notify"]').click(function(e) {
					if ($('#FPAutoUpdate_Notify').is(':checked')&&window.webkitNotifications.checkPermission()!=0) {
						window.webkitNotifications.requestPermission();
					}
					e.stopPropagation(); // Do not close the menu
					if (window.webkitNotifications.checkPermission() == 0) {
						localStorage.FPAutoUpdate_Notify = $('#FPAutoUpdate_Notify').is(':checked');
					}
				});
			}, 100);
		}
	});
	var lasttime = Math.floor(new Date().getTime()/1000),
        thisthread = location.href.match(/t=([0-9]*)&?.*/)[1],
        tags = {'&lt;':'<','&gt;':'>','&amp;':'&'},
        notification,
        numnew = 0,
        isMaster,
        masterTries = 0;

	// Now this is a story all about how my script got flipped, turned upside-down
	window.setInterval(function() {
		if (isMaster === true) {
			// Keep dominance
			localStorage.FPAutoUpdate_MasterCheck = null;
		} else {
			// Challenge dominance
			if (localStorage.FPAutoUpdate_MasterCheck == thisthread) {
				if (masterTries == 0) {
					masterTries++
					return;
				} else {
					// We are the new master!
					isMaster = true;
				}
			} else {
				localStorage.FPAutoUpdate_MasterCheck = thisthread;
			}
		}
	}, 4000+(1000*Math.random()));
	// Now it's time to listen, both the master and the slave do this for simplicity
	window.setInterval(function() {
		// Fucking outdated jQuery
		var tickerContents = $(localStorage.tickerContents);
		$(tickerContents).find('post').each(function(i, elem) {
			lasttime = Math.max(lasttime,
				parseInt($(this).attr('date'), 10));
			var a = $(elem).attr('html')
					.replace(/&lt;|&gt;|&amp;/g, function(match) {
						return tags[match];
					}),
				threadLinks = $(a).find('a');
			if (threadLinks.length == 3 || threadLinks.length == 4) {
				// We got a new post entry
				var thatthread = $(threadLinks[2]).attr('href').match(/t=([0-9]*)&?.*/);
				if (thatthread !== undefined&&thatthread!=null&&thatthread[1] !== undefined) {
					var thatthreadid = thatthread[1];
					if (thatthreadid == thisthread) {
						//-----------------------------
						//      We got an update!
						//-----------------------------
						numnew++;
						if (localStorage.FPAutoUpdate_Notify=="true") {
							if (notification) {
								// Close existing notification, re-create and re-notify
								notification.cancel();
							}
							if (window.webkitNotifications.checkPermission() == 0) {
								// We are authorized to show the noification
								notification = window.webkitNotifications.createNotification(
									'/fp/forums/6.png',
									'Thread Update!',
									numnew+' new post'+(numnew>1?'s':'')+' in '+$("#lastelement").text()
								);
								notification.onclick = function() {
									// Load new posts?
									window.focus();
									this.cancel();
									notification = null;
									numnew = 0;
								}
								notification.show();
							}
						} else {
							$('.FPAUNewPost').remove();
							$('<div>').css({
								'margin-bottom': '-2px',
								'border': '1px solid black',
								'border-top-right-radius': '5px',
								'position': 'fixed',
								'bottom': 0,
								'left': 0,
								'width': '150px',
								'height': '30px',
								'background': '#FFFFFF',
								'margin-left': '-2px',
								'text-align': 'center',
								'font-weight': 'bold',
								'line-height': '30px',
								'font-size': '15px'
							}).text(numnew+' new post'+(numnew>1?'s!':'!'))
							.addClass('FPAU_NewPost')
							.click(function() {
								// Cheap way out
								window.reload();	
							}).appendTo('body');
						}
					}
				}
			}
		});
		if (isMaster&&localStorage.FPAutoUpdate_Enabled=="true") {
			$.ajax({
				url			: "/fp_ticker.php?aj=1&lasttime="+lasttime,
				dataType	: "text",
				success		: function(data) {
					localStorage.setItem('tickerContents', data);
				}
			});	
		}
	}, 500);
	// Let's expose some functions to window, so that users may interact through the JS console
	window.FPAutoUpdate = {
		disable: function() {
			localStorage.FPAutoUpdate_Enabled = false;
		},
		enable: function() {
			localStorage.FPAutoUpdate_Enabled = true;
		},
		isMaster: function() {
			return isMaster;
		},
		debug: {
			threadid: thisthread,
			initlasttime: lasttime,
			lasttime: lasttime
		}
	}
}(unsafeWindow.jQuery, unsafeWindow));

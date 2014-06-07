// ==UserScript==
// @name		Mod User Notes - /r/bitcoinbeg version
// @namespace	http://www.reddit.com/r/toolbox
// @author 		agentlame, creesch, EnigmaBlade
// @description	Create and display user notes for mods. Modified specifically for /r/bitcoinbeg mods.
// @include		*://www.reddit.com/*
// @include		*://reddit.com/*
// @include		*://*.reddit.com/*
// @version		2.0.1
// ==/UserScript==

function usernotes() {
	var subs = [],
		mySubs = [],
		notEnabled = [],
		schemaVer = 2,
		modMineURL = 'http://www.reddit.com/subreddits/mine/moderator.json?count=100',
		lastget = JSON.parse(localStorage['Toolbox.cache.lastget'] || -1),
		cachename = localStorage['Toolbox.cache.cachename'] || '',
		modmail = location.pathname.match(/\/message\/(?:moderator)\/?/),
		modpage = location.pathname.match(/\/about\/(?:reports|modqueue|spam|unmoderated|trials)\/?/),
		subreddit = ''; //reddit.post_site || $('.titlebox h1.redditname a').text();
	
	var config = {
			ver: 1,
			types: []
		};
	
	var notes = {
		ver: schemaVer,
		users: [] //typeof userNotes
	};
	
	//initSettings();
	
	// Prevent page lock while parsing things.  (stolen from RES)

	function forEachChunked(array, chunkSize, delay, call, callback) {
		if (array == null) return;
		if (chunkSize == null || chunkSize < 1) return;
		if (delay == null || delay < 0) return;
		if (call == null) return;
		var counter = 0;
		var length = array.length;

		function doChunk() {
			for (var end = Math.min(array.length, counter + chunkSize); counter < end; counter++) {
				var ret = call(array[counter], counter, array);
				if (ret === false) return;
			}
			if (counter < array.length) {
				window.setTimeout(doChunk, delay);
			} else {
				if (callback) callback();
			}
		}
		window.setTimeout(doChunk, delay);
	}

	// Because normal .sort() is case sensitive.

	function saneSort(arr) {
		return arr.sort(function (a, b) {
			if (a.toLowerCase() < b.toLowerCase()) return -1;
			if (a.toLowerCase() > b.toLowerCase()) return 1;
			return 0;
		});
	}

	if (localStorage['Toolbox.cache.moderatedsubs']) {
		mySubs = JSON.parse(localStorage['Toolbox.cache.moderatedsubs']);
	}

	// If it has been more than ten minutes, refresh mod cache.
	if (mySubs.length < 1 || (new Date().getTime() - lastget) / (1000 * 60) > 30 || cachename != reddit.logged) {
		mySubs = []; //resent list.
		getSubs(modMineURL);
	} else {
		mySubs = saneSort(mySubs);

		// Go!
		run();
	}

	function getSubs(URL) {
		$.getJSON(URL, function (json) {
			getSubsResult(json.data.children, json.data.after);
		});
	}

	// Callback because reddits/mod/mine is paginated.

	function getSubsResult(subs, after) {
		$(subs).each(function (sub) {
			mySubs.push(this.data.display_name.trim());
		});

		if (after) {
			var URL = modMineURL + '&after=' + after;
			getSubs(URL);
		} else {
			// We have all our subs.  Start adding ban links.
			lastget = new Date().getTime();
			cachename = reddit.logged;

			mySubs = saneSort(mySubs);

			// Update the cache.
			localStorage['Toolbox.cache.moderatedsubs'] = JSON.stringify(mySubs);
			localStorage['Toolbox.cache.lastget'] = JSON.stringify(lastget);
			localStorage['Toolbox.cache.cachename'] = cachename;

			// Go!
			run();
		}
	}

	function postToWiki(sub, json) {
		$.post('/r/' + sub + '/api/wiki/edit', {
			content: JSON.stringify(json/*, undefined, 0*/),
			page: 'usernotes',
			reason: 'updated via user notes',
			uh: reddit.modhash
		})

		.error(function (err) {
			console.log('postToWiki(): ' + err.responseText);
		})

		.success(function () {
			setTimeout(function () {

				// hide the page
				$.post('/r/' + sub + '/wiki/settings/usernotes', {
					permlevel: 2,
					uh: reddit.modhash
				})

				// Super extra double-secret secure, just to be safe.
				.error(function (err) {
					alert('error setting wiki page to mod only access');
					window.location = 'http://www.reddit.com/r/' + sub + '/wiki/settings/usernotes';
				});

				// Re-run init.
				run();

			}, 500);
		});
	}

	// RES NER support.
	$('div.content').on('DOMNodeInserted', function (e) {
		if (e.target.parentNode.id && e.target.parentNode.id === 'siteTable' && e.target.className.match(/sitetable/)) {
			run();
		}

		// Fixes expanding bug in mod mail.
		if ($(e.target).hasClass('clearleft')) {
			setTimeout(function () {
				run();
			}, 1000);
		}
	});

	function getThingInfo(thing) {

		var user = $(thing).find('.author:first').text(),
			subreddit = $('.titlebox h1.redditname a').text(),
			link = $(thing).closest('.entry').find('a.bylink').attr('href');

		// Try again.
		if (!user) {
			user = $(thing).closest('.entry').find('.author:first').text();
		}

		// Might be a submission.
		if (!link) {
			link = $(thing).closest('.entry').find('a.comments').attr('href');
		}

		if (!subreddit) {
			subreddit = $(thing).closest('.entry').find('.subreddit').text();
		}

		if (!subreddit) {
			subreddit = $(thing).closest('.thing').find('.subreddit').text();
		}

		// If we still don't have a sub, we're in mod mail
		if (!subreddit) {
			subreddit = $(thing).find('.head a:last').text().replace('/r/', '').replace('/', '').trim();

			//user: there is still a chance that this is mod mail, but we're us.
			//This is a weird palce to go about this, and the conditions are strange,
			//but if we're going to assume we're us, we better make damned well sure that is likely the case.
			if (!user && $(thing).find('.remove-button').text() === '') {
				user = reddit.logged;

				if (!subreddit) {
					// Find a better way, I double dog dare ya!
					subreddit = $(thing).closest('.message-parent').find('.correspondent.reddit.rounded a').text()
						.replace('/r/', '').replace('[-]', '').replace('[+]', '').trim();
				}
			}
		}

		// Not a mod, reset current sub.
		if ($.inArray(subreddit, mySubs) === -1) {
			subreddit = '';
		}

		if (user == '[deleted]') {
			user = '';
		}

		return {
			subreddit: subreddit,
			user: user,
			link: link
		};
	}

	function processThing(thing) {

		if ($(thing).hasClass('ut-processed')) {
			return;
		}
		$(thing).addClass('ut-processed');

		var subreddit = getThingInfo(thing).subreddit;

		if (!subreddit) return;

		var tag = '<span style="color:#888888; font-size:x-small;">&nbsp;[<a class="add-user-tag-' +
			subreddit + '" id="add-user-tag" "href="javascript:;">N</a>]</span>';

		$(thing).attr('subreddit', subreddit);

		// More mod mail hackery... all this to see your own tags in mod mail.  It's likely not worth it.
		var userattrs = $(thing).find('.userattrs');
		if ($(userattrs).html() != null) {
			$(userattrs).after(tag);
		} else {
			$(thing).find('.head').after(tag);
		}

		if ($.inArray(subreddit, subs) == -1) {
			subs.push(subreddit);
		}
	}

	function processSub(currsub) {
		if (!currsub || notEnabled.indexOf(currsub) != -1) return;

		$.getJSON('http://www.reddit.com/r/' + currsub + '/wiki/usernotes.json', function (json) {
			var things = $('div.thing .entry[subreddit=' + currsub + ']')

			if (json.data.content_md) {

				var subNotes = JSON.parse(json.data.content_md);
				if (!subNotes || subNotes.length < 1) return;

				forEachChunked(things, 20, 500, function (thing) {
					var user = getThingInfo(thing).user;

					$.grep(subNotes.users, function (u) {

						if (u.name == user) {
							var usertag = $(thing).find('.add-user-tag-' + currsub);

							// Only happens if you delete the last note.
							if (u.notes.length < 1) {
								$(usertag).css('color', '');
								$(usertag).text('N');
								return;
							}

							//Set note text
							$(usertag).text(unescape(u.notes[0].note));
							
							//Set note style
							var type = u.notes[0].type;
							if(type === undefined)
								type = 'none';
							console.log("Loaded note type: "+type);
							
							var color = typeToColor(type);
							$(usertag).css('color', color);
						}
					});
				});
			}
		}).error(function (e) {
			if (JSON.parse(e.responseText).reason == 'PAGE_NOT_CREATED') {
				notEnabled.push(this);
			}
		});
	}
	
	function typeToColor(type) {
		switch(type) {
			case 'spamwatch': return 'fuchsia';
			case 'spamwarn': return 'purple';
			case 'abusewarn': return 'orange';
			case 'ban': return 'red';
			case 'permban': return 'darkred';
			default: return 'black';
		}
	}
	
	function typeToText(type) {
		switch(type) {
			case 'spamwatch': return 'Watching';
			case 'spamwarn': return 'Warned';
			case 'abusewarn': return 'Warned';
			case 'ban': return 'Banned';
			case 'permban': return 'Perma-banned';
			default: return '';
		}
	}
	
	function run() {
		var things = $('div.thing .entry:not(.ut-processed)');

		forEachChunked(things, 20, 500, processThing, function () {
			forEachChunked(subs, 10, 1000, processSub);
		});
	}

	$('body').delegate('#add-user-tag', 'click', function (e) {
		console.log("Note button clicked");
		console.log(config);
		
		var thing = $(e.target).closest('.thing .entry'),
			info = getThingInfo(thing),
			subreddit = info.subreddit,
			user = info.user,
			link = info.link;

		// Make box & add subreddit radio buttons
		var popup = $(
				'<div class="utagger-popup">\
					<span>\
						<a href="http://reddit.com/u/' + user + '" id="utagger-user-link">/u/' + user + '</a>:\
						<input type="text" id="utagger-user-note" link="' + link + '" subreddit="' + subreddit + '" user="' + user + '">\
						<input type="checkbox" name="include-link-group" id="utagger-include-link-checkbox" checked="">\
						<label id="utagger-include-link-label" for="utagger-include-link-checkbox">include link</label>\
						<input type="button" id="utagger-save-user" value="save">\
						<input type="button" id="utagger-cancel-user" value="cancel">\
					</span>\
					<table class="utagger-type"><tbody><tr>\
						<td><input type="radio" name="type-group" class="utagger-type-input" id="utagger-type-none" value="none" checked="" /><label class="" for="utagger-type-none" style="color: black;">None</label></td>\
						<td><input type="radio" name="type-group" class="utagger-type-input" id="utagger-type-spamwatch" value="spamwatch" /><label for="utagger-type-spamwatch" style="color: fuchsia;">Spam Watch</label></td>\
						<td><input type="radio" name="type-group" class="utagger-type-input" id="utagger-type-spamwarn" value="spamwarn" /><label for="utagger-type-spamwarn" style="color: purple;">Spam Warning</label></td>\
						<td><input type="radio" name="type-group" class="utagger-type-input" id="utagger-type-abusewarn" value="abusewarn" /><label for="utagger-type-abusewarn" style="color: orange;">Abuse Warning</label></td>\
						<td><input type="radio" name="type-group" class="utagger-type-input" id="utagger-type-ban" value="ban" /><label for="utagger-type-ban" style="color: red;">Ban</label></td>\
						<td><input type="radio" name="type-group" class="utagger-type-input" id="utagger-type-permban" value="permban" /><label for="utagger-type-permban" style="color: darkred;">Permanent Ban</label></td>\
					</tr></tbody></table>\
					<br />\
					<table class="utagger-notes"><tbody><tr>\
						<td class="utagger-notes-td1">Author</td>\
						<td class="utagger-notes-td2">Note</td>\
						<td class="utagger-notes-td3"></td>\
					</tr></tbody></table>\
				</div>'
			)
			.appendTo('body')
			.css({
				left: e.pageX - 50,
				top: e.pageY - 10,
				display: 'block'
			});

		$.getJSON('http://www.reddit.com/r/' + subreddit + '/wiki/usernotes.json', function (json) {

			if (json.data.content_md) {

				notes = JSON.parse(json.data.content_md);
				if (!notes || notes.length < 1)
					return;

				$.grep(notes.users, function (u) {
					if (u.name == user) {

						var i = 0;
						$(u.notes).each(function () {
							if(this.type === undefined)
								this.type = 'none';
							var color = typeToColor(this.type);
							
							var typeAddition = typeToText(this.type);
							if(typeAddition.length > 0)
								typeAddition = '<span style="color: ' + color + ';">[' + typeAddition + ']</span> ';
							
							popup.find('table.utagger-notes').append('<tr><td class="utagger-notes-td1">' + this.mod + ' <br> <span class="utagger-date" id="utagger-date-' + i + '">' + new Date(this.time).toLocaleString() + '</span></td><td lass="utagger-notes-td2">' + typeAddition + unescape(this.note) + '</td><td class="utagger-notes-td3"><a class="utagger-remove-note" noteid="' + this.time + '" href="javascript:;">X</a></td></tr>');
							if (this.link) {
								popup.find('#utagger-date-' + i).wrap('<a href="' + this.link + '">');
							}
							i++;
						});
					}
				});
			}
		});
	});

	$('body').delegate('#utagger-save-user, .utagger-remove-note', 'click', function (e) {
		var popup = $(this).closest('.utagger-popup'),
			subreddit = popup.find('#utagger-user-note').attr('subreddit'),
			user = popup.find('#utagger-user-note').attr('user'),
			noteid = $(e.target).attr('noteid'),
			noteText = popup.find('#utagger-user-note').val(),
			deleteNote = (e.target.className == 'utagger-remove-note'),
			link = '';
		
		var type = popup.find('.utagger-type-input:checked').val();
		console.log("Type: "+type);
		
		if (popup.find('#utagger-include-link-checkbox').is(':checked')) {
			link = popup.find('#utagger-user-note').attr('link');
		}
		
		if ((!user || !subreddit || !noteText) && !deleteNote) return;

		// Important, if we do not reset notes we will leak tags across subs, if the wiki is a 404.
		notes = {
			ver: schemaVer,
			users: []
		};

		var note = {
			note: escape(noteText),
			type: type,
			time: new Date().getTime(),
			mod: reddit.logged,
			link: link
		};

		var userNotes = {
			name: user,
			notes: []
		};

		userNotes.notes.push(note);

		$(popup).remove();

		$.getJSON('http://www.reddit.com/r/' + subreddit + '/wiki/usernotes.json', function (json) {

			if (json.data.content_md) {
				notes = JSON.parse(json.data.content_md);
			}

			if (notes) {
				var results = $.grep(notes.users, function (u) {
					if (u.name == user) {
						// Delete. 
						if (deleteNote) {
							$(u.notes).each(function (idx) {

								if (this.time == noteid) {
									u.notes.splice(idx, 1);
								}
							});

							postToWiki(subreddit, notes);
							return true;
						}
						// Add.
						else {
							u.notes.unshift(note);
							postToWiki(subreddit, notes);
							return u;
						}
					}
				});

				if ((!results || results.length < 1) && !deleteNote) {
					notes.users.push(userNotes);
					postToWiki(subreddit, notes);
				}
			}
			else {
				notes.users.push(userNotes);
				postToWiki(subreddit, notes);
			}
		})
			.error(function (e) {
				if (JSON.parse(e.responseText).reason == 'PAGE_NOT_CREATED') {
					notes.users.push(userNotes);
					postToWiki(subreddit, notes);
				}
			});
	});

	$('body').delegate('#utagger-cancel-user', 'click', function () {
		var popup = $(this).closest('.utagger-popup');
		$(popup).remove();
	});
	
	//Settings
	function initSettings() {
		//Data
		var icon = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHaSURBVDjLlZO7a1NRHMfzfzhIKQ5OHR1ddRRBLA6lg4iT\
					d5PSas37YR56Y2JiHgg21uoFxSatCVFjbl5iNBBiMmUJgWwZhCB4pR9/V4QKfSQdDufF5/v7nu85xwJYprV0Oq0kk8luIpEw4vG48f/eVDiVSikCTobDIePxmGg0yokEBO4OBgNGoxH5fJ5wOHwygVgsZpjVW60WqqqWz\
					bVgMIjf78fn8xlTBcTy736/T7VaJRQKfQoEArqmafR6Pdxu9/ECkUjkglje63Q6NBoNisUihUKBcrlMpVLB6XR2D4df3VQnmRstsWzU63WazSZmX6vV0HWdUqmEw+GY2Gw25SC8dV1l1wrZNX5s3qLdbpPL5fB6vXumZal\
					q2O32rtVqVQ6GuGnCd+HbFnx9AZrC+MkSHo/np8vlmj/M7f4ks6yysyawgB8fwPv70HgKG8v8cp/7fFRO/+AllewqNJ/DhyBsi9A7J1QTkF4E69mXRws8u6ayvSJwRqoG4K2Md+ygxyF5FdbPaMfdlIXUZfiyAUWx/OY25O\
					4JHBP4CtyZ16a9EwuRi1CXs+5K1ew6lB9DXERX517P8tEsPDzfNIP6C5YeQewSrJyeCd4P0bnwXYISy3MCn5oZNtsf3pH46e7XBJcAAAAASUVORK5CYII=';
		
		var configLink = '<li id="toolbox-config"><img src="data:image/png;base64,'+ icon +'" style="margin-right: 5px;" /><span class="separator"></span><a href="javascript:;" id="toolbox-config-open">toolbox configuration</a></li>';
		
		//Get subreddit
		var subreddit = reddit.post_site || $('.titlebox h1.redditname a').text();
		if (!subreddit) return;
		
		//Add settings UI if it doesn't exist
		var toolbox = $('#moderation_tools > .content .icon-menu');
		var link = toolbox.find('li#toolbox-config');
		if(link.length == 0) {
			$(toolbox).append(configLink);
		}
	}
}

// Add script to page
(function () {
	if (!reddit.logged) return;
	
	var css = '\
		#add-user-tag { cursor: pointer; }\
		.add-user-tag:hover {text-decoration:underline}\
		.utagger-popup { max-width:900px;padding:10px 15px;background-color: #FAFAFA;border: 1px solid #808080 ;position:absolute;z-index:10000; box-shadow: 0px 1px 3px 1px #D6D6D6;} \
		.utagger-popup .right{ float:right }\
		.utagger-popup .left{ float:left }\
		.utagger-popup .status{ display:none; }\
		.utagger-popup .buttons{ padding-top:10px }\
		#utagger-user-note { width: 200px; }\
		#utagger-include-link-label { vertical-align: middle; }\
		.utagger-type { border: 1px solid #C1BFBF; margin-top: 2px; width: 100%; }\
		.utagger-type td { padding: 1px 3px 3px; }\
		.utagger-popup input { margin-top: 0; vertical-align: middle; }\
		.utagger-type label { margin-left: 1px; margin-bottom: -1px; vertical-align: middle; }\
		.utagger-date { font-size: 80%;}\
		.utagger-notes { width: 100%; } \
		.utagger-notes td { padding: 2px; border: solid 1px #C1BFBF; vertical-align: top; }\
		.utagger-notes-td1 { width: 65px; }\
		.utagger-notes-td3 { width: 5px; }\
		.utagger-notes-td3 a { color: #C92A2A; font-weight: bold; }\
		.utagger-notes .utagger-notes-td3 { border: 0; }\
	';
	
	// Add CSS
	var style = document.createElement('style');
	style.type = "text/css";
	style.textContent = css;
	document.head.appendChild(style);
	
	// Add script
	var s = document.createElement('script');
	s.textContent = "(" + usernotes.toString() + ')();';
	document.head.appendChild(s);
})();
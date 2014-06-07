// ==UserScript==
// @name			HackForums Utility Pack
// @namespace		xerotic/hfup
// @description		Utility pack that adds many features to HackForums.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include			*hackforums.net*
// @grant 			GM_info
// @grant 			GM_addStyle
// @grant 			GM_setValue
// @grant 			GM_getValue
// @run-at 			document-start
// @version			0.102
// ==/UserScript==


/* Debug Functions */
function show_settings() {
	$.each(hfup_settings, function(name, value) {
		console.log(name + ", " + value);
	});
}

/* Start Script */
String.prototype.contains = function (arg) {
	return (this.indexOf(arg) >= 0) ? true : false;
}

Array.prototype.contains = function (arg) {
	return (this.indexOf(arg) >= 0) ? true : false;
}

function get_default_settings() {
	var default_settings = {
		'hfup_version' : GM_info.script.version,
		'threadRatings' : 1,
		'enhancedSYT' : 1,
		'pmCountdownTimer' : 1,
		'searchAddNewPosts' : 1,
		'indexAddNewPosts' : 1,
		'countStatistics' : 1,
		'forceUnknownLocation' : 0,
		'postLinkToActivity' : 1,
		'removeLogo' : 0,
		'getProfileBan' : 0,
		'threadToBottom' : 1,
		'previewThread' : 1,
		'profileTagging' : 1,
		'characterCounter' : 1,
		'multiQuote' : 1,
		'clickableRepLinks' : 1,
		'betterPMs' : 0,
		'quickReplyPM' : 1,
		'presetPost' : '',
		'topLinks' : '[["bans.php","Bans"],["negreplog.php","Neg Rep Log"],["showstaff.php","Staff"],["usercp.php?action=options","HFUP Settings"]]',
		'profileTags' : '{"175033":"HFUP Developer"}'
	};
	
	return default_settings;
}

function install_hfup() {
	var install_settings = get_default_settings();
	
	$.each(install_settings, function(name, value) {
		localStorage.setItem(name, value);
		localStorage.getItem(name);
	});
	
	GM_setValue('hfup_installed', 1);
	
	load_settings();
}

function update_hfup() {
	var update_settings = get_default_settings(); //this var holds default settings
	
	load_settings(); //hfup_settings holds current settings
	
	$.each(hfup_settings, function(name, value) {
		update_settings[name] = value; //loop through current settings and assign to default settings
	});
	
	//Override the script version to current
	update_settings["hfup_version"] = GM_info.script.version;
	
	$.each(update_settings, function(name, value) {
		localStorage.setItem(name, value); //loop through default
		localStorage.getItem(name);
	});
	
	load_settings();
}

function load_settings() {
	var settings = get_default_settings();
	$.each(settings, function(name, value) {
		if(localStorage.getItem(name) == null) {
			
		} else if(localStorage.getItem(name) == '0' || localStorage.getItem(name) == '1') {
			hfup_settings[name] = parseInt(localStorage.getItem(name));
		} else {
			hfup_settings[name] = localStorage.getItem(name);
		}
	});
}


/* Main Functions */
function settings_page() {
	settings = {
		'threadRatings' : {
			'label' : 'Shows the number of ratings and the average for threads.',
			'type' : 'checkbox'
		},
		'enhancedSYT' : {
			'label' : 'Allows you to use the SYT feature for any member.',
			'type' : 'checkbox'
		},
		'pmCountdownTimer' : {
			'label' : 'The time between PM\'s becomes a countdown timer and will automatically send at 0.',
			'type' : 'checkbox'
		},
		'searchAddNewPosts' : {
			'label' : 'When searching your posts, threads with new posts will have a link to latest unread post.',
			'type' : 'checkbox'
		},
		'indexAddNewPosts' : {
			'label' : 'Threads on homepage will have a link to latest unread post.',
			'type' : 'checkbox'
		},
		'countStatistics' : {
			'label' : 'Counts number of bans, neg reps, paidstickies, etc on the appropriate page for each.',
			'type' : 'checkbox'
		},
		'forceUnknownLocation' : {
			'label' : 'Always give your profile "Unknown Location" when browsing HF.',
			'type' : 'checkbox'
		},
		'postLinkToActivity' : {
			'label' : 'Postcount in posts is linked to post activity.',
			'type' : 'checkbox'
		},
		'removeLogo' : {
			'label' : 'Remove the logo from header.',
			'type' : 'checkbox'
		},
		'getProfileBan' : {
			'label' : 'See ban information on profile (Ub3r only).',
			'type' : 'checkbox'
		},
		'threadToBottom' : {
			'label' : 'Every post has a link to the bottom of the page.',
			'type' : 'checkbox'
		},
		'previewThread' : {
			'label' : 'Add a preview thread button when viewing forums.',
			'type' : 'checkbox'
		},
		'profileTagging' : {
			'label' : 'Allows you to add a note to each user\'s profile.',
			'type' : 'checkbox'
		},
		'characterCounter' : {
			'label' : 'Tells you when you have enough characters to make a post.',
			'type' : 'checkbox'
		},
		'multiQuote' : {
			'label' : 'Use multi quote feature when viewing threads.',
			'type' : 'checkbox'
		},
		'clickableRepLinks' : {
			'label' : 'Links in reputation are clickable.',
			'type' : 'checkbox'
		},
		'betterPMs' : {
			'label' : 'Make the PM system easier to use. (NOT IN EFFECT YET)',
			'type' : 'checkbox'
		},
		'quickReplyPM' : {
			'label' : 'Quick reply box when reading PM\'s.',
			'type' : 'checkbox'
		}
	};
	
	var settingsPage = '<br><table border="0" cellspacing="1" cellpadding="4" class="tborder" id="hfupsettings"><tbody><tr><td class="thead" colspan="2"><strong>HackForums Utility Pack Options</strong></td></tr><tr><td width="50%" class="trow1" valign="top"><fieldset class="trow2"><legend><strong>Settings</strong></legend><table cellspacing="0" cellpadding="2"><tbody><tr>';

	$.each(settings, function(key, value) {
		settingsPage = settingsPage + '<tr>';
		if(value.type == "checkbox") {
			if(hfup_settings[key] == 1) { value.checked = "checked='checked'"; }
			settingsPage = settingsPage + '<td valign="top" width="1"><input type="checkbox" class="checkbox" name="' + key + '" id="' + key + '" value="1" ' + value.checked + '"></td><td><span class="smalltext"><label for="' + key + '">' + value.label + '</label></span></td>';
		} else if(value.type == "text") {
			
		}
		settingsPage = settingsPage + '</tr>';
	});
	
	
	/* Settings for top link */
	settingsPage = settingsPage + '</tbody></table></fieldset></td><td width="50%" class="trow1" valign="top"><fieldset class="trow2"><legend><strong>Header Links</strong></legend><table cellspacing="0" cellpadding="2"><tbody>';
	
	$.each(JSON.parse(hfup_settings['topLinks']), function(key, value) {
		settingsPage = settingsPage + '<tr><td><span class="smalltext"><label for="link' + key + '">URL: </label></span></td><td valign="top"><input type="text" class="textbox" id="link' + key + '" name="link' + key + '" size="40" value="' + value[0] + '" tabindex="3"></td><td style="padding-left:20px;"><span class="smalltext"><label for="linkname' + key + '">Link Name: </label></span></td><td valign="top"><input type="text" class="textbox" id="linkname' + key + '" name="linkname' + key + '" size="40" value="' + value[1] + '" tabindex="3"></td></tr>';
	});
	
	settingsPage = settingsPage + '<tr><td colspan="2"><input type="button" class="button" name="addtoplink" id="addtoplink" value="Add Link"></td></tr></tbody></table></fieldset>';
	
	if(!JSON.parse(hfup_settings['topLinks']).length) {
		$('#addtoplink').parent().parent().before('<tr><td><span class="smalltext"><label for="link0">URL: </label></span></td><td valign="top"><input type="text" class="textbox" id="link0" name="link0" size="40" value="" tabindex="3"></td><td style="padding-left:20px;"><span class="smalltext"><label for="linkname0">Link Name: </label></span></td><td valign="top"><input type="text" class="textbox" id="linkname0" name="linkname0" size="40" value="" tabindex="3"></td></tr>');
	}
	
	
	/* Settings for post preset */
	settingsPage = settingsPage + '<br /><fieldset class="trow2"><legend><strong>Post Preset</strong></legend><table cellspacing="0" cellpadding="2"><tbody><tr><td><span class="smalltext"><label for="setpost">Here you can make a preset post style for all of your posts across the forum. Example usage would be BBCode to make your post stand out or to add a signature to the end of every post. Currently only supported for quick reply.</label></span></td></tr><tr><td valign="top"><textarea id="presetpost" name="presetpost" style="width:100%" rows="8" tabindex="3">' + hfup_settings['presetPost'] + '</textarea></td></tr></tbody></table></fieldset></td></tr></tbody></table>';
	
	
	/* Add the settings to the page */
	$('td[valign="top"]:eq(1)').children().first().after(settingsPage);
	
	/* Change submit to regular button */
	// $('input[name="regsubmit"]').attr('type', 'button');
	
	
	$('#addtoplink').click(function(e) {
		var newLinkNum = $('input[name^="linkname"]').length;
		$('input[name="linkname' + (newLinkNum - 1) + '"]').parent().parent().after('<tr><td><span class="smalltext"><label for="link' + newLinkNum + '">URL: </label></span></td><td valign="top"><input type="text" class="textbox" id="link' + newLinkNum + '" name="link' + newLinkNum + '" size="40" value="" tabindex="3"></td><td style="padding-left:20px;"><span class="smalltext"><label for="linkname' + newLinkNum + '">Link Name: </label></span></td><td valign="top"><input type="text" class="textbox" id="linkname' + newLinkNum + '" name="linkname' + newLinkNum + '" size="40" value="" tabindex="3"></td></tr>');
	});
	
	/* Settings being submitted and changed */
	$('form').submit(function(event) {
		/* Insert settings for regular options */
		$('#hfupsettings :input').each(function() {
			if($(this).attr('type') == "checkbox") {
				if($(this).is(':checked')) {
					localStorage.setItem($(this).attr('name'), 1);
				} else {
					localStorage.setItem($(this).attr('name'), 0);
				}
			}
		});
		

		/* Insert settings for toplink */
		var topLinks = [];
		var badList = [];
		$('input[name^="link"]').filter(":even").each(function(i) {
			if(!$(this).val()) {
				badList.push(i);
			} else {
				topLinks.push([$(this).val()]);
			}
		});
		
		var offset = 0;
		$('input[name^="link"]').filter(":odd").each(function(i) {
			if(!badList.contains(i)) {
				if(!$(this).val()) {
					topLinks[i - offset][1] = "Undefined";
				} else {
					topLinks[i - offset][1] = $(this).val();
				}
			} else {
				offset++;
			}
		});
		
		localStorage.setItem('topLinks', JSON.stringify(topLinks));
		
		/*Insert settings for preset post */
		localStorage.setItem('presetPost', $('#presetpost').val());

		return;
	});
}

function negRepLog() {
	$("td.thead").append("<span class='smalltext'> - " + ($("tr").length - 2) + " negative reputations in the past 24 hours</span>");
}

function showthreadRatings() {
	var rating = $(".current_rating").html();
	var ratingSplit = rating.split(' - ');
	var avg = ratingSplit[1].split(' out')[0];
	$(".current_rating").parent().parent().parent().append('<br /><span style="font-size:x-small;">' + ratingSplit[0] + ' - ' + avg + '</span>');
}

function enhancedSYT() {
	$("input[name='author']").clone().attr({"class": "textbox", "id": "author", "type": "text"}).insertAfter('input[name=author]').prev().remove();
}

function pmCountdownTimer() {
	function timeMsg() {
		var num = parseInt($('#xerocount').html());
		switch(num) {
			case 0:
				$("input[value='Send Message']").trigger('click');
				break;
			default:
				$('#xerocount').html(num - 1);
				setTimeout(function() { timeMsg(); },1000);
		}
	}

	if($("div.error:contains(e too quickly a)").length) {
		$("div.error").find('li').html($("div.error").find('li').html().replace(/wait (\d{1,2}) more/, "wait <span id='xerocount'>$1</span> more"));
		setTimeout(function() { timeMsg(); },1000);
	}
}

function searchAddNewPosts() {
	$("img[src*='folder'][src*='new']").each(function(i) {
		var $current = $(this).parent().next().next().children().first();
		$current.prepend('<a href="showthread.php?tid=' + $current.html().match(/tid\=(\d*)/)[1] + '&amp;action=newpost" title="Go to first unread post" class="quick_jump">►</a>');
	});
}

function indexAddNewPosts() {
	$("a[href*='action=lastpost']").each(function(i) {
		$(this).before('<a href="showthread.php?tid=' + $(this).attr('href').match(/tid\=(\d*)/)[1] + '&amp;action=newpost" title="Go to first unread post" class="quick_jump">►</a>&nbsp;');
	});
}

function countBannedMembers() {
	$("td.thead").append("<span class='smalltext'> - " + ($("tr").length - 3) + " total banned members - " + ($("td.trow2").filter(function() { return $(this).text() === "Today"; }).length) + " banned today - " + ($("td.trow1").filter(function() { return $(this).text() === "Today"; }).length) + " will be unbanned today</span>");
}

function countPaidStickies() {
	$("td.thead").append("<span class='smalltext'> - " + ($("tr").length - 3) + " current paid stickies</span>");
}

function countGroups() {
	$("td.thead").append("<span class='smalltext'> - " + (($("tr").length - 2) / 2) + " custom groups</span>");
}

function countStaffAndAdmins() {
	$("td.thead").append("<span class='smalltext'> - " + ($("tr").length - 2) + " total staff members</span>");
}

function countForumMods() {
	$("td.thead").append("<span class='smalltext'> - " + ($("tr").length - 2) + " forums moderators</span>");
}

function forceUnknownLocation() {
	$.get( "misc.php");
}

function postLinkToActivity() {
	$('span.largetext a').each(function(index) {
		var uid = $(this).attr('href').match(/uid\=(\d*)/)[1];
		$(this).parent().parent().parent().next().html(function(index, oldHTML) {
			return oldHTML.replace(/Posts\: (.*?)</, "Posts: <a href='postactivity.php?uid=" + uid + "'>$1</a><");
		});
	});
}

function forumDisplayRatings() {
	$(".current_rating").each(function() {
		var rating = $(this).html();
		var ratingSplit = rating.split(' - ');
		if(ratingSplit[0] == '0 Vote(s)') {
			var ratingHTML = 'No Votes';
		} else {
			var ratingHTML = ratingSplit[0] + '</br >' + ratingSplit[1].split(' out')[0] + ' Average</span>';
		}
		$(this).parent().parent().append('<span style="font-size:x-small;">' + ratingHTML);
	});
}

function removeLogo() {
	GM_addStyle(".logo { display:none; }");
}

function getProfileBan() {
	if($("span[class='group7']").length) {
		$("td[width='50%']:eq(1)").prepend('<table border="0" cellspacing="1" cellpadding="4" class="tborder"><tbody><tr><td colspan="2" class="thead"><strong>Ban Info</strong></td></tr><tr><td class="trow1" width="20%"><strong>Reason:</strong></td><td class="trow1" id="banreason"></td></tr><tr><td class="trow2" width="20%"><strong>Ban Date:</strong></td><td class="trow2" id="bandate"></td></tr><tr><td class="trow1" width="20%"><strong>Unban Date:</strong></td><td class="trow1" id="unbandate"></td></tr><tr><td class="trow2" width="20%"><strong>Banned By:</strong></td><td class="trow2" id="bannedby"></td></tr></tbody></table>');
		var uid = $("a[href*='myawards.php?uid']").attr('href').match(/uid\=(\d*)/)[1];
		$.get("bans.php", function(data) {
			var result = $(data).find("a[href$='uid=" + uid + "']").parent();
			$("#banreason").html($(result).next().html());
			$("#bandate").html($(result).next().next().next().html());
			$("#unbandate").html($(result).next().next().next().next().html());
			$("#bannedby").html($(result).next().next().html());
		});
	}
}

function threadToBottom() {
	$('div[style*="float: right"]').each(function() {
		$(this).children().children().prepend('<a href="javascript:void(0);">Junk</a> - <a href="#copyright">Down</a> - ');
	});
}

function topLinks() {
	$.each(JSON.parse(hfup_settings['topLinks']), function(key, value) {
		$('#panel').append(' | <a href="' + value[0] + '">' + value[1] + '</a>');
	});
}

function previewThread() {
	$('a[id^="tid_"]').each(function() {
		$(this).parent().append('<span id="preview_' + $(this).attr('id').split('tid_')[1] + '" class="quick_jump previewButton" data-open="0">▼</span>');
	});
	
	$('.previewButton').click(function(e) {
		if(parseInt($(e.target).attr('data-open')) == 0) {
			var tid = e.target.id.split('preview_')[1];
			$.get("showthread.php?tid=" + tid, function(data) {
				if($(e.target).parent().children('a').first().attr('href').contains('action=newpost')) {
					var subject = $(e.target).parent().children('a').eq(1).html();
				} else {
					var subject = $(e.target).parent().children('a').first().html();
				}
			
				var pmForm = '<form action="private.php" method="post" name="input" data-pm="' + tid + '" style="display:none;"><input type="hidden" name="my_post_key" value="' + $(data).find('input[name="my_post_key"]').val() + '" /><input type="hidden" name="to" value="' + $(data).find('.post_author span[class^="group"]').first().html() + '" /><input type="hidden" name="action" value="do_send" /><input type="hidden" name="pmid" value="" /><input type="hidden" name="do" value="" /><strong>Subject:</strong>&nbsp;&nbsp;<input type="text" class="textbox" name="subject" size="40" maxlength="85" value="' + subject + '" tabindex="3" /><textarea style="width: 98%; padding: 4px; margin-top:5px;" rows="8" cols="80" name="message" id="message" tabindex="1"></textarea><input type="submit" class="button" name="submit" value="Send Message" tabindex="9"><input type="submit" class="button" name="preview" value="Preview" tabindex="11"></form>';
				
				var postForm = '<form method="post" action="newreply.php?tid=' + tid + '&amp;processed=1" name="quick_reply_form" id="quick_reply_form" data-post="' + tid + '" style="display:none;">';
				
				$(data).find('#quick_reply_form :input[type="hidden"]').each(function() {
					postForm = postForm + '<input type="hidden" name="' + $(this).attr('name') + '" value="' + $(this).val() + '" />';
				});
				
				postForm = postForm + '<div style="text-align:center;"><textarea style="width: 98%; padding: 4px; margin-top:5px;" rows="8" cols="80" name="message" id="message" tabindex="1"></textarea></div><input type="submit" class="button" name="submit" value="Post Reply" tabindex="3" /><input type="submit" class="button" name="previewpost" value="Preview Post" tabindex="4" /></form>';

			
				$(e.target).after('<div class="previewThread" style="display:none;" id="prethread_' + e.target.id.split('preview_')[1] + '">' + $($(data).find('.post_body')[0]).html() + '<div style="padding-top:6px;margin-top:10px;border-top:1px solid #4e3c66;"><button class="bitButton" data-pmbutton="' + tid + '">PM</button><button class="bitButton" data-reply="' + tid + '">Reply</button></div>' + pmForm + postForm + '</div>');
				$('#prethread_' + e.target.id.split('preview_')[1]).slideDown(300);
				$(e.target).html('▲');
				$(e.target).attr('data-open', 1);
				
				$('button[data-reply]').click(function(e) {
					$('form[data-pm="' + $(e.target).attr('data-reply') + '"]').slideUp(300, function() {
						$('form[data-post="' + $(e.target).attr('data-reply') + '"]').slideToggle(300);
					});
				});
				
				$('button[data-pmbutton]').click(function(e) {
					$('form[data-post="' + $(e.target).attr('data-pmbutton') + '"]').slideUp(300, function() {
						$('form[data-pm="' + $(e.target).attr('data-pmbutton') + '"]').slideToggle(300);
					});
				});
			});
		} else if(parseInt($(e.target).attr('data-open')) == 1) {
			$('#prethread_' + e.target.id.split('preview_')[1]).slideUp(300);
			$(e.target).attr('data-open', 2);
			$(e.target).html('▼');
		} else {
			$('#prethread_' + e.target.id.split('preview_')[1]).slideDown(300);
			$(e.target).attr('data-open', 1);
			$(e.target).html('▲');
		}
	});
}

function threadProfileTagging() {
	var profileTags = JSON.parse(hfup_settings['profileTags']);
	if($('table[id^="post_"]').find('td[class="tcat"]').length) {
		$('.post_author').each(function() {
			var uid = $(this).find('a').attr('href').split('uid=')[1];
			var childFix = 1;
			if(parseInt(uid) == 1) { childFix = 0; }
			if(profileTags[uid]) {
				$($(this).children()[childFix]).after('<span data-uid="' + uid + '" class="profileTag">' + profileTags[uid] + '</span>');
			} else {
				$($(this).children()[childFix]).after('<span data-uid="' + uid + '" class="profileTag noProfileTag">+</span>');
			}
		});
	} else {
		$('a[name^="pid"]').each(function() {
			var uid = $(this).parent().find('a[href*="uid="]').attr('href').split('uid=')[1];
			if(profileTags[uid]) {
				$(this).parent().find('span[class="smalltext"]').prepend('<span data-uid="' + uid + '" class="profileTag">' + profileTags[uid] + '</span><br />');
			} else {
				$(this).parent().find('span[class="smalltext"]').prepend('<span data-uid="' + uid + '" class="profileTag noProfileTag">+</span><br />');
			}
		});
	}
	
	$('.profileTag').click(function(e) {
		if($(e.target).hasClass('noProfileTag')) {
			var promptText = '';
		} else {
			var promptText = e.target.innerHTML;
		}
		var newTag = prompt("Add a tag to this user", promptText);
		if(newTag.length) {
			$(e.target).removeClass('noProfileTag');
			$(e.target).html(newTag);
			profileTags[$(e.target).attr('data-uid')] = newTag;
			localStorage.setItem('profileTags', JSON.stringify(profileTags));
		} else {
			$(e.target).addClass('noProfileTag');
			$(e.target).html('+');
			delete profileTags[$(e.target).attr('data-uid')];
			localStorage.setItem('profileTags', JSON.stringify(profileTags));
		}
	});
}

function userProfileTagging() {
	var profileTags = JSON.parse(hfup_settings['profileTags']);
	var uid = $('.quick_keys').find('a[href*=uhuid]').attr('href').split('uid=')[1];
	if(profileTags[uid]) {
		$('span[class^="group"]').parent().parent().after('<span data-uid="' + uid + '" class="profileTag">' + profileTags[uid] + '</span>');
	} else {
		$('span[class^="group"]').parent().parent().after('<span data-uid="' + uid + '" class="profileTag noProfileTag">+</span>');
	}
	
	$('.profileTag').click(function(e) {
		if($(e.target).hasClass('noProfileTag')) {
			var promptText = '';
		} else {
			var promptText = e.target.innerHTML;
		}
		var newTag = prompt("Add a tag to this user", promptText);
		if(newTag.length) {
			$(e.target).removeClass('noProfileTag');
			$(e.target).html(newTag);
			profileTags[$(e.target).attr('data-uid')] = newTag;
			localStorage.setItem('profileTags', JSON.stringify(profileTags));
		} else {
			$(e.target).addClass('noProfileTag');
			$(e.target).html('+');
			delete profileTags[$(e.target).attr('data-uid')];
			localStorage.setItem('profileTags', JSON.stringify(profileTags));
		}
	});
}

function quickCharacterCounter() {
	$('#quickreply_e').children().children().children().eq(2).children().eq(0).after('Characters: <span style="color:#E66A6C;" id="ccounter">0</span><br />');
	
	$('#message').bind('input propertychange', function() {
		if($('#message').val().length >= 35 && $('#message').val().length <= 18000) {
			$('#ccounter').css('color', '#74E66A');
		} else {
			$('#ccounter').css('color', '#E66A6C');
		}
		$('#ccounter').html($('#message').val().length);
	});
}

function fullCharacterCounter() {
	//This feature doesn't work.
	
	// $('a[href^="member.php?action=logout"]').after('Characters: <span style="color:#E66A6C;" id="ccounter">0</span><br />');

	// $('#message_new').bind('input propertychange', function() {
		// console.log('changed');
		// if($('#message_old').val().length >= 35 && $('#message_old').val().length <= 18000) {
			// $('#ccounter').css('color', '#74E66A');
		// } else {
			// $('#ccounter').css('color', '#E66A6C');
		// }
		// $('#ccounter').html($('#message_old').val().length);
	// });
}

function quickPresetPost() {
	$('#message').val(hfup_settings['presetPost']);
}

function multiQuote() {
		$('a[class="bitButton"][href*="replyto="]').each(function() {
			var pid = $(this).attr('href').split('replyto=')[1];
			$(this).before('<a href="javascript:Thread.multiQuote(' + pid + ');" class="bitButton" id="multiquote_link_' + pid + '">Multi Quote <span id="multiplus_' + pid + '">+</span><img style="display:none;" src="images/english/postbit_multiquote.gif" alt="Quote this post" title="Quote this post" id="multiquote_' + pid + '"></a>&nbsp;');
		});
	
	$('a[id^="multiquote_link_"]').click(function(e) {
		if($(e.target).children().last().attr('src').contains('_on')) {
			$('#multiplus_' + e.target.id.split('_link_')[1]).html('+');
		} else {
			$('#multiplus_' + e.target.id.split('_link_')[1]).html('-');
		}
	});
}

function clickableRepLinks() {
	$('.repvotemid').each(function() {
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		$(this).children(':eq(1)').html($(this).children(':eq(1)').html().replace(exp, "<a href='$1' target='_blank'>$1</a>"));
		$(this).find('img').each(function() {
			$(this).attr('src', $(this).attr('src').split("'_blank'>")[1].split('</a>')[0]);
		});
	});
}

function betterPMs() {
	var $pbody = $('.post_body');
	$pbody.find('blockquote').each(function() {
		$current = $(this);
		while($current.find('blockquote').first().length) {
			$current = $current.find('blockquote').first();
		}
		
		var text = '<blockquote>' + $current.html() + '</blockquote>';
		
		while($current.parent().is('blockquote')) {
			$current = $current.parent();
			$($current.find('blockquote')).remove('blockquote');
			text = text + '<blockquote>' + $current.html() + '</blockquote>';
		}
		
		$current.replaceWith(text);
	});
}

function quickReplyPM() {
	function moveCaretToEnd(el) {
		if (typeof el.selectionStart == "number") {
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange != "undefined") {
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
	}
	
	var postkey = $('a[href*="my_post_key"]').attr('href').split('my_post_key=')[1];
	var user = $('span[class^="group"]').html();
	var pmid = $('a[href*="pmid="').first().attr('href').split('pmid=')[1].split('&')[0]
	var subject = $('title').html().split('Viewing PM: ')[1];
	
	if(subject.indexOf('Re: ') === 0) {
		subject = subject;
	} else {
		subject = "Re: " + subject.trim().substring(0,81);
	}
	
	var pmForm = '<form action="private.php" method="post" name="input"><input type="hidden" name="my_post_key" value="' + postkey + '" /><input type="hidden" name="to" value="' + user + '" /><input type="hidden" name="action" value="do_send" /><input type="hidden" name="pmid" value="' + pmid + '" /><input type="hidden" name="do" value="reply" /><strong>Subject:</strong>&nbsp;&nbsp;<input type="text" class="textbox" name="subject" size="40" maxlength="85" value="' + subject + '" tabindex="3" /><textarea style="display:block; width: 75%; padding: 4px; margin-top:5px;" rows="12" cols="80" name="message" id="message" tabindex="1"></textarea><span class="smalltext"><label><input type="checkbox" class="checkbox" name="options[savecopy]" value="1" tabindex="7" checked="checked"><strong>Save a Copy:</strong> save a copy of this message in your Sent Items folder.</label><br /><label><input type="checkbox" class="checkbox" name="options[readreceipt]" value="1" tabindex="8" checked="checked"><strong>Request Read Receipt:</strong> receive a message when this message is read.</label><br /></span><input type="submit" class="button" name="submit" value="Send Message" tabindex="9"><input type="submit" class="button" name="preview" value="Preview" tabindex="11"></form>';
	
	$('#post_meta_').parent().parent().after('<tr><td class="trow2">' + pmForm + '</td></tr>');
	
	$.get($('a[href*="do=reply"]').attr('href'), function(data) {
		$('#message').val($(data).find('textarea').last().val());
		moveCaretToEnd($('#message').get(0));
	});
}


/* Add any styles */
GM_addStyle(".previewThread {border: 2px solid #4e3c66; margin: 5px; padding: 6px; box-shadow: 0px 0px 5px 4px #1E1E1E;}");
GM_addStyle(".previewButton {font-size: 12px !important; margin-left: 5px; cursor: pointer;}");
GM_addStyle(".previewButton {font-size: 12px !important; margin-left: 5px; cursor: pointer;}");
GM_addStyle(".profileTag {position: relative; top: -2px; margin-left: 3px; padding: 1px 3px 1px 3px; border: 1px solid black; border-radius: 4px; color: black; background-color: #D1B6E5; font-size: 12px;}");
GM_addStyle(".noProfileTag {font-style: italic; font-weight: bold; background-color: #B6E0E5 !important}");
GM_addStyle("#quickreply_multiquote {color:black !important;}");
GM_addStyle("#quickreply_multiquote a {color:#105799 !important;}");


/* All the init magic! */
var script_version = parseFloat(GM_info.script.version);
var installed_version = parseFloat(localStorage.getItem("hfup_version"));
var installed = GM_getValue("hfup_installed");
hfup_settings = {};

if(!installed) {
	console.log('[HFUP] Installing.');
	install_hfup();
} else if(installed_version < script_version) {
	console.log('[HFUP] Updating.');
	update_hfup();
} else {
	console.log('[HFUP] Loading settings.');
	load_settings();
}

/* This is ran before DOM is ready */
console.log('[HFUP] Running before DOM functions.');
if(hfup_settings['removeLogo']) { removeLogo(); }
if(hfup_settings['betterPMs']) {
	//GM_addStyle("blockquote {color:black !important; background-color:#B6E4E5 !important; border-radius: 4px !important; margin-bottom:5px !important;}");
	//GM_addStyle("blockquote a {color:#105799 !important;}");
}

/* This is ran after DOM is ready */
function mainContentLoaded() {
	console.log('[HFUP] Running after DOM functions.');
	/* Global alterations */
	if(JSON.parse(hfup_settings['topLinks']).length) { topLinks(); }

	pageTitle = location.href;
	if(pageTitle.contains("showthread.php")) {
		if(hfup_settings['profileTagging']) { threadProfileTagging(); }
		if(hfup_settings['multiQuote']) { multiQuote(); }
		if(hfup_settings['postLinkToActivity']) { postLinkToActivity(); }
		if(hfup_settings['threadToBottom']) { threadToBottom(); }
		if(hfup_settings['threadRatings']) { showthreadRatings(); }
		if(hfup_settings['characterCounter']) { quickCharacterCounter(); }
		if(hfup_settings['presetPost'].length) { quickPresetPost(); }
	} else if(pageTitle.contains("newreply.php")) {
		//if(hfup_settings['characterCounter']) { fullCharacterCounter(); }
	} else if(pageTitle.contains("private.php") && pageTitle.contains("action=read")) {
		if(hfup_settings['profileTagging']) { threadProfileTagging(); }
		if(hfup_settings['quickReplyPM']) { quickReplyPM(); }
		if(hfup_settings['betterPMs']) { betterPMs(); }
	} else if(pageTitle.contains("private.php")) {
		if(hfup_settings['pmCountdownTimer']) { pmCountdownTimer(); }
	} else if(pageTitle.contains("private.php") && pageTitle.contains("action=send")) {
		//if(hfup_settings['']) { run_private(); }
	} else if(pageTitle.contains("search.php")) {
		if($("td span strong a:contains('Post')").html().length == 4) {
			if(hfup_settings['searchAddNewPosts']) { searchAddNewPosts(); }
		}
		if(hfup_settings['previewThread']) { previewThread(); }
	} else if(pageTitle.contains("forumdisplay.php")) {
		if(hfup_settings['enhancedSYT']) { enhancedSYT(); }
		if(hfup_settings['threadRatings']) { forumDisplayRatings(); }
		if(hfup_settings['previewThread']) { previewThread(); }
	} else if(pageTitle.contains("bans.php")) {
		if(hfup_settings['countStatistics']) { countBannedMembers(); }
	} else if(pageTitle.contains("negreplog.php")) {
		if(hfup_settings['countStatistics']) { negRepLog(); }
	} else if(pageTitle.contains("reputation.php")) {
		if(hfup_settings['clickableRepLinks']) { clickableRepLinks(); }
	} else if(pageTitle.contains("paidstickies.php")) {
		if(hfup_settings['countStatistics']) { countPaidStickies(); }
	} else if(pageTitle.contains("showgroups.php")) {
		if(hfup_settings['countStatistics']) { countGroups(); }
	} else if(pageTitle.contains("showstaff.php")) {
		if(hfup_settings['countStatistics']) { countStaffAndAdmins(); }
	} else if(pageTitle.contains("showmods.php")) {
		if(hfup_settings['countStatistics']) { countForumMods(); }
	} else if(pageTitle.contains("misc.php")) {
		//if(hfup_settings['']) { run_misc(); }
	} else if(pageTitle.contains("member.php") && pageTitle.contains("action=profile")) {
		if(hfup_settings['getProfileBan']) { getProfileBan(); }
		if(hfup_settings['profileTagging']) { userProfileTagging(); }
	} else if(pageTitle.contains("myawards.php")) {
		//if(hfup_settings['']) { run_myawards(); }
	} else if(pageTitle.contains("index.php") || document.title == "Hack Forums") {
		if(hfup_settings['indexAddNewPosts']) { indexAddNewPosts(); }
	} else if(pageTitle.contains("usercp.php") && pageTitle.contains("action=options")) {
		settings_page();
	} else if(pageTitle.contains("usercp.php")) {
		//if(hfup_settings['']) { run_usercp(); }
	} else {
		//if(hfup_settings['']) { run_generic(); }
	}
	
	if(hfup_settings['forceUnknownLocation']) { forceUnknownLocation(); } //Do this last just in case other page loads add to status
	
	console.log('[HFUP] All done!');
}


/* Triggers all after-DOM functions */
$(document).on('DOMContentLoaded', mainContentLoaded);
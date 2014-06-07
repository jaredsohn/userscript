// ==UserScript==
// @name           The Family (dynamic)
// @namespace      Bogleg
// @version        1.9.0
// @date           2010-08-07
// @include        http://goallineblitz.com/game/forum*
// @include        http://goallineblitz.com/game/inbox.p*
// @include        http://goallineblitz.com/game/outbox.p*
// @include        http://goallineblitz.com/game/message.p*
// @include        http://goallineblitz.com/game/home.pl?user_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==

// update code from http://userscripts.org/scripts/show/2296
var SCRIPT = {
	name: 'The Family (dynamic)',
	namespace: 'Bogleg',
	source: 'http://userscripts.org/scripts/show/73907',
	identifier: 'http://userscripts.org/scripts/source/73907.user.js',
	meta: 'http://userscripts.org/scripts/source/73907.meta.js',
	version: '1.9.0',
	date: '2010-08-07',
};

var threadURL = 'http://goallineblitz.com/game/forum_thread.pl?thread_id=3986785';
var postId = '35627658';
// Debug location, top of page 2:
// var threadURL = 'http://goallineblitz.com/game/forum_thread.pl?thread_id=3986785&page=2';
// var postId = '37713898';
var forumAccessURL = 'http://goallineblitz.com/game/forum_private_access.pl?forum_id=358';
var cacheTime = 1000 * 3600; // 1 hour
var PAGE_TYPE = window.location.href.match(/\/game\/forum_thread.pl/) ? 'forum_thread'
	: window.location.href.match(/\/game\/forum_/) ? 'forum_index'
	: window.location.href.match(/\/game\/home\.pl/) ? 'home'
	: window.location.href.match(/\/game\/(?:in|out)box\.pl/) ? 'msgbox'
	: window.location.href.match(/\/game\/message\.pl/) ? 'msg'
	: 'UNKNOWN';
var pref = {};

var getValue = (typeof(GM_getValue)!='undefined' && GM_getValue) || function(n,d){return d;};
var setValue = (typeof(GM_setValue)!='undefined' && GM_setValue) || function(n,v){return v;};
var deleteValue = (typeof(GM_deleteValue)!='undefined' && GM_deleteValue) || function(n){return n;};
var listValues = (typeof(GM_listValues)!='undefined' && GM_listValues) || function(){return [];};
var httpRequest = (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){};

var UPDATE = {
	lastCheck: 0,
	script: {},
	init: function(objScript) {
		for (var name in objScript) { if (!(name in this)) {
			this[name] = this.script[name] = getValue('_UPDATE_' + name, objScript[name]);
		} }
		this.lastCheck = getValue('_UPDATE_' + 'lastCheck', 0);
	},
	check: function(intCheckDays, strUrl, objScript, fnOnNewer, fnIsNewer, blnForce) {
		this.init(objScript);
		var interval = Math.max(parseFloat(intCheckDays) * 24 * 60 * 60 * 1000, 0) || Infinity;
		var diff = (new Date()) - parseInt(this.lastCheck,10);
		if(!blnForce && !this.isNewer(this, objScript, fnIsNewer) && !(diff > interval)){ return false; }
		if (blnForce || (diff > interval)) {
			var t = this;
			return httpRequest({method: 'GET', url: strUrl, onload: function(r){
				setValue('_UPDATE_' + 'lastCheck', t.lastCheck = '' + (new Date()).getTime());
				t.parse(r.responseText, [intCheckDays, strUrl, objScript, fnOnNewer, fnIsNewer, false]);
			}});
		}
		try{ fnOnNewer(this, objScript); }catch(x){}
	},
	parse: function(strResponse, arrCheckArgs) {
		var re = /\/\/\s*(?:@(\S+)\s+(.*?)\s*(?:$|\n)|(==\/UserScript==))/gm, match = true, name;
		while (match && (match = re.exec(strResponse))) {
			if(match[3]){ match = null; continue; }
			name = match[1];
			if(name in this.script){ setValue('_UPDATE_' + name, this[name] = match[2]); }
			else if(!(name in this)){ this[name] = match[2]; }
		}
		this.check.apply(this, arrCheckArgs || []);
	},
	isNewer: function(objUpdate, objScript, fnIsNewer) {
		if(!objUpdate){ objUpdate = this; }
		if(!objScript || (objUpdate.date > objScript.date)){ return true; }
		try {
			return fnIsNewer(objUpdate, objScript);
		}
		catch (x) {
			return (!(objUpdate.date < objScript.date) && (objUpdate.version != objScript.version));
		}
	}
};

var listVersion = 0;
var listNames = ['family', 'apprentice', 'promoteme', 'waitlist', 'hitlist'];
var list = {
	family: {
		member: {},
		title: 'GLB Addicts',
		style: 'color: blue;',
		agentTitle: function(id, name) { return list.family.member[id]; },
		forumAccess: 1,
	},
	apprentice: {
		member: {},
		title: 'APPRENTICE',
		style: 'color: green;',
		agentTitle: function(id, name) { return 'Apprentice'; },
		forumAccess: 1,
	},
	promoteme: {
		member: {},
		title: 'MEMBERS',
		style: 'color: red;',
		agentTitle: function(id, name) { return 'Promote Me?'; },
		forumAccess: 1,
	},
	waitlist: {
		member: {},
		title: 'WAITLIST',
		style: 'color: green;',
		agentTitle: function(id, name) { return 'WaitList'; },
		forumAccess: 0,
	},
	hitlist: {
		member: {},
		title: 'HITLIST',
		style: 'color: white; background-color: #a03c19; padding: 0px 3px 0px 3px;',
		agentTitle: function(id, name) { return '!! HIT LIST !!'; },
		forumAccess: 0,
	},
};
var listName = {};
$.each(listNames, function() { listName[ list[this].title ] = this; });
var names = {num: 0};
var nameToId = {};
var idToList = {};

var inserted = 0;
function insertTitles() {
	switch (PAGE_TYPE) {
	case 'forum_thread':
		if (inserted) {
			$('span[id^="family_title_"]').remove();
			inserted = 0;
		}
		var chunk = function(id, name, suffix) {
			return '<span id="family_title_' + id + '">'
				+ (suffix ? '<br>' + suffix : '')
				+ ((pref.pmLink.val || pref.postsLink.val) ? '<br>' + (
					pref.pmLink.val ? '<span style="font-size: 8px;"> (<a style="text-decoration: none;" href="/game/new_message.pl?to='
						+ id + '">PM</a>)</span>' : '') + (
					pref.postsLink.val ? '<span style="font-size: 8px;"> (<a style="text-decoration: none;" href="/game/search_forum.pl?user_name='
					+ name + '&age=90&forum_id=0&action=Search">Posts</a>)</span>' : '') : '')
				+ '</span>';
		};
		$('.user_name a[id^=user_name_]').each(function() {
			var me = this;
			$(me).parent().parent().css('height', 'auto');
			var id = parseInt(this.href.match(/user_id=(\d+)/)[1]);
			var name = $(me).text();
			var found = 0;
			$.each(listNames, function() {
				if (list[this].member[id]) {
					$(me).after(chunk(id, name, '<b style="' + list[this].style + '">' + list[this].agentTitle(id, name) + '</b>'));
					found = 1;
				}
			});
			if (!found) $(me).after(chunk(id, name, 0));
		});
		break;
	case 'forum_index':
		if (inserted) {
			$('#content table.forums span.last_post_user b').before(function() { return $(this).html(); }).remove();
			$('#threads span.thread_starter b').before(function() { return $(this).html(); }).remove();
			$('#threads span.last_post_user b').before(function() { return $(this).html(); }).remove();
			inserted = 0;
		}
		if (pref.indexHilite.val) {
			$('#content table.forums span.last_post_user').each(function() {
				var parts = $(this).html().split('<br>');
				var id = nameToId[parts[1]];
				if (list.family.member[id]) {
					$(this).html(parts[0] + '<br><b style="color: blue;">' + parts[1] + '</b>');
				}
			});
			$('#threads span.thread_starter').each(function() {
				var name = $(this).text().match(/^Started by: (.+)$/i)[1];
				var id = nameToId[name];
				if (list.family.member[id]) {
					$(this).html('Started by: <b style="color: blue;">' + name + '</b>');
				}
			});
			$('#threads span.last_post_user').each(function() {
				var name = $(this).html();
				var id = nameToId[name];
				if (list.family.member[id]) {
					$(this).html('<b style="color: blue;">' + name + '</b>');
				}
			});
		}
		break;
	case 'home':
		if (inserted) {
			$('tr[id="family_title"]').remove();
			inserted = 0;
		}
		if (pref.homeHilite.val) {
			var id = parseInt($('#user_avatar img').attr('src').match(/user_id=(\d+)/)[1]);
			var found = 0;
			$.each(listNames, function() {
				if (list[this].member[id]) {
					$('#my_account_content tr').eq(0).after('<tr id="family_title"><td colspan="2" style="font-weight: bold; ' + list[this].style + '">' + list[this].agentTitle(id, $('#my_account_content tr td.account_value').eq(0).text()) + '</td></tr>');
					found = 1;
					return false;
				}
			});
		}
		break;
	case 'msgbox':
		if (inserted) {
			$('span[id^="family_title_"]').remove();
			inserted = 0;
		}
		if (pref.msgTitle.val) {
			var numChunks = 0;
			var chunk = function(id, name, suffix) {
				return '<span id="family_title_' + id + '_' + numChunks++ + '">' + (suffix ? '<br>' + suffix : '') + '</span>';
			};
			$('td.from:gt(0) a').each(function() {
				var me = this;
				$(me).parent().css('height', 'auto');
				var id = parseInt(this.href.match(/user_id=(\d+)/)[1]);
				var name = $(me).text();
				var found = 0;
				$.each(listNames, function() {
					if (list[this].member[id]) {
						$(me).after(chunk(id, name, '<b style="' + list[this].style + '">' + list[this].agentTitle(id, name) + '</b>'));
						found = 1;
						return false;
					}
				});
				if (!found) $(me).after(chunk(id, name, 0));
			});
		}
		break;
	case 'msg':
		if (inserted) {
			$('span[id^="family_title_"]').remove();
			inserted = 0;
		}
		if (pref.msgTitle.val) {
			var numChunks = 0;
			var chunk = function(id, name, suffix) {
				return '<span id="family_title_' + id + '_' + numChunks++ + '">' + (suffix ? ' (' + suffix + ')' : '') + '</span>';
			};
			$('#from a').each(function() {
				var me = this;
				var id = parseInt(this.href.match(/user_id=(\d+)/)[1]);
				var name = $(me).text();
				var found = 0;
				$.each(listNames, function() {
					if (list[this].member[id]) {
						$(me).after(chunk(id, name, '<b style="' + list[this].style + '">' + list[this].agentTitle(id, name) + '</b>'));
						found = 1;
						return false;
					}
				});
				if (!found) $(me).after(chunk(id, name, 0));
			});
		}
		break;
	default:
		console.error('unknown PAGE_TYPE in insertTitles: ', PAGE_TYPE);
		return;
	}
	inserted = 1;
}

function needScriptUpdate() {
	if ($('#update_script').length != 0) return;
	$('head').append('<link rel="stylesheet" type="text/css" href="/css/tooltip.css" />');
	$('div.content_header').after('<div id="update_script" class="tip"><div class="tt_rounded"> <div class="tt_top"><div><center><p>&nbsp;</p></center></div></div> <div class="tt_content" id="update_content">'
		+ '<a style="color: #ffff00;" href="' + SCRIPT.source + '" title="' + SCRIPT.name + '">' + SCRIPT.name + '</a> has been updated; <a style="color: #ffff00;" href="' + SCRIPT.identifier + '" title="' + SCRIPT.name + '">upgrade now</a>.'
		+ '</div><div class="tt_bot"><div><center><p>&nbsp;</p></center></div></div></div></div>');
}

var now = new Date().getTime();
function storeCache() {
	setValue('listVersion', listVersion);
	setValue('expires', now + cacheTime + '');
	$.each(listNames, function() {
		setValue(this, list[this].member.toSource());
	});
	setValue('nameToId', nameToId.toSource());
}

function flushCache() {
	var keys = listValues();
	$.each(keys, function() {
		if (this.indexOf('cfg_') != 0 && this.indexOf('_UPDATE_') != 0) {
			deleteValue(this);
		}
	});
	$.each(listNames, function() {
		list[this].member = {};
	});
	nameToId = {};
}

function loadFromCache() {
	var tmp = getValue('expires', 0);
	if (now > tmp) {
		insertTitles();
		flushCache();
		return 0;
	}
	tmp = getValue('listVersion', 0);
	if (tmp && tmp > SCRIPT.version) {
		needScriptUpdate();
	}
	for (var i = 0; i < listNames.length; i++) {
		var l = listNames[i];
		var tmp = getValue(l, 0);
		eval ('list.' + l + '.member = ' + tmp);
		if (!list[l].member) {
			if (l  == 'family') {
				insertTitles();
				flushCache();
				return 0;
			}
			list[l].member = {};
			return 0;
		}
	}
	if (PAGE_TYPE == 'forum_index') { // don't always need nameToId, and it's big, so don't load it if unnecessary
		tmp = getValue('nameToId', 0);
		eval ('nameToId = ' + tmp);
		if (!nameToId) {
			insertTitles();
			flushCache();
			return 0;
		}
	}
	insertTitles();
	return 1;
}

function loadFromThisContent(data) {
	// Change all lines from "content<br>" to "#SL#content#EL#" (start-line, end-line) to ease regexp matching
	var dataText = '#SL#' + $(data).html()
		.replace(/\/\/\/.*?version.*?([0-9.]+)\s*\/\/\//i, function(m, ver) {
			listVersion = ver;
			if (listVersion > SCRIPT.version) {
				needScriptUpdate();
			}
			return ' <span style="color: #757575; font-size: 10px;">' + m + '</span>';
		})
		.replace(/<br>/g, "#EL##SL#").replace(/#SL#$/, '')
		.replace(/<(\/?[bi])>/gi, function(m, tag) { return '#'+tag+'#'; })
	;
	names = {num: 0};
	nameToId = {};
	$.each(listNames, function() {
		var l = this;
		var cur_title = 0;
		var tmp = dataText.match(new RegExp('~~~ ' + list[l].title + ' ~~~#\/b##EL##SL#(.+?)#EL##SL##b#~~~ END ~~~'));
		list[l].member = {};
		if (!tmp) return true;
		$.each(tmp[1].split('#EL##SL#'), function() {
			if (tmp = this.match(/^#b#### (.+)#\/b#$/)) {
				cur_title = tmp[1];
			} else if (tmp = parseInt(this)) {
				if (list[l].member[tmp]) {
					console.warn('Duplicate agent: ' + this + ' on list ' + l + ' (title = ' + list[l].member[tmp] + ')');
				} else {
					var found = 0;
					for (var i = 0; i < listNames.length; i++) {
						if (listNames[i] == l) break;
						if (list[listNames[i]].member[tmp]) {
							console.warn('Agent ' + this + ' on multiple lists (' + listNames[i] + ' and ' + l + ')');
							found = 1;
							break;
						}
					}
					if (!found) {
						list[l].member[tmp] = cur_title || 1;
						names[tmp] = this.replace(tmp + ' ', '').replace(/\s+\/\/.+/, '');
						nameToId[names[tmp]] = tmp;
						idToList[tmp] = l;
						names.num++;
					}
				}
			}
		});
	});
//	console.log(list);
	insertTitles();
	storeCache();
	return dataText;
}

function loadFromCurPage() {
	var data = $('#post_content_' + postId);
	if (data.length == 0) return false;
	flushCache();
	data.prepend('<div id="fam_check_access_status" class="quote"></div><br />');
	$('#fam_check_access_status').hide();
	var dataText = loadFromThisContent(data);
	data.html(dataText
		.replace(/#SL##b#~~~ (.+?) ~~~#\/b##EL#(.+?)#SL##b#~~~ END ~~~#\/b##EL#(?:#SL##EL#)*/g, function(matched, ltitle, content) {
			var l = listName[ltitle] || ltitle;
			if (list[l]) ltitle = list[l].title;
			var newContent = content.replace(/(.*?)#SL##b#### (.+?)#\/b##EL#/g, function(matched, pre, title) {
				return pre.replace(/#EL#((?:#SL##EL#)*)$/, function(matched, end) { return '#EL#</fieldset>' + end; })
					+ '#SL#<fieldset id="fam_list_' + l + '_' + title.replace(/[ \t"']+/g, '_') + '" style="padding: 2px 4px; border: 1px solid #d0d0d0;">'
					+ '<legend style="font-weight: bold;">' + title + '</legend>';
			});
			if (content != newContent) newContent += '</fieldset>';
			return '<fieldset id="fam_list_' + l + '" style="'
				+ (ltitle.match(/ChangeLog|TODO/) ? '' : 'max-width: 410px; ') + 'margin: 2px 4px 2px 0px; padding: 2px 4px; border: 1px solid #a0a0a0; display: '
				+ (ltitle.match(/ChangeLog|TODO/) ? 'block' : 'inline') + '; vertical-align: top;">'
				+ '<legend style="font-weight: bold; padding: 0 3px 0 3px;' + (list[l] ? list[l].style : '') + '">' + ltitle + '</legend>'
				+ newContent
				+ '</fieldset>';
		})
		.replace(/#SL#(\d+) (.+?)(\s+\/\/\s+.+?)?#EL#/g, function(matched, id, name, errata) {
			return '#SL#<a href="/game/home.pl?user_id=' + id + '">' + name + '</a> (<a href="/game/new_message.pl?to=' + id + '">PM</a>)' + errata + '#EL#';
		})
		.replace(/\s+\/\/\s+(.+?)#EL#/g, function(matched, content) {
			return ' <span style="color: #757575; font-size: 10px;">('
				+ content.replace(/(<a .+?>)(.+?)<\/a>/gi, function(matched, link, linked) { return link + 'link</a>'; })
				.replace(/<u>(\d+) (.+?)<\/u>/gi, function(matched, id, name) { return '<a href="/game/home.pl?user_id=' + id + '">' + name + '</a>'; })
				+ ')</span>#EL#';
		})
		.replace(/#(\/?[bi])#/gi, function(matched, tag) { return '<'+tag+'>'; })
		.replace(/#EL#/g, '<br />')
		.replace(/#SL#/g, '')
	);
	(function() {
		var me = this;
		(me.CAStatusPane = $('#fam_check_access_status')).html('<b>Status:</b> Checking forum access...').show();
		$.get(forumAccessURL, function(forumAccessData) {
			if (forumAccessData.indexOf('window.location.replace("/game/home.pl")') != -1) {
				me.CAStatusPane.html('<b>Status:</b> No access to <a href="' + forumAccessURL + '">Forum Access page</a>; won\'t check access');
				return;
			}
			var unknown = [];
			var unknownPanel = null;
			var members = 0;
			var membersWithTitles = 0;
			var membersApprentice = 0;
			var membersPromoteMe = 0;
			var membersWaitList = 0;
			var membersHitList = 0;
			var membersMisnamed = 0;
			$('#content div.content_container tbody:eq(0) tr:not(.nonalternating_color)', forumAccessData).find('td:eq(0) a').each(function() {
				var id = parseInt(this.href.match(/=(\d+)/)[1]);
				var realName = $(this).text();
				++members;
				if (list.hitlist.member[id]) {
					++membersHitList;
					console.warn('Hitlisted agent found on forum access list: ' + id + ' ' + realName + ' (listed as ' + names[id] + ')');
					delete names[id];
					names.num--;
				} else if (list.waitlist.member[id]) {
					++membersWaitList;
					console.warn('Waitlisted agent found on forum access list: ' + id + ' ' + realName + ' (listed as ' + names[id] + ')');
					delete names[id];
					names.num--;
				} else if (list.promoteme.member[id] || list.apprentice.member[id] || list.family.member[id]) {
					if (list.family.member[id]) {
						++membersWithTitles;
					} else if (list.apprentice.member[id]) {
						++membersApprentice;
					} else if (list.promoteme.member[id]) {
						++membersPromoteMe;
					}
					var n = names[id].replace(/\s+\/\/\s+.+/, '');
					if (realName != n) {
						console.log('id = ' + id + '; name = ' + names[id] + '; realName = ' + realName);
						data.find('a[href$="user_id=' + id + '"]').after(' (real name: ' + realName.replace('(banned)', '<b><i>(banned)</i></b>') + ')');
//						data.html(data.html().replace(n + '</a>', n + '</a> (real name: ' + realName.replace('(banned)', '<b><i>(banned)</i></b>') + ')'));
						++membersMisnamed;
					} // else all good
					delete names[id];
					names.num--;
				} else {
					unknown.push([id, realName]);
					if (unknownPanel == null) {
						$('#fam_list_family').after(
							'<fieldset id="fam_list_UNKNOWN" style="max-width: 410px; margin: 2px 4px 2px 0px; padding: 2px 4px; border: 1px solid #a0a0a0; display: inline; vertical-align: top;">'
							+ '<legend style="font-weight: bold; padding: 0 3px 0 3px;">UNKNOWN W/ACCESS</legend>'
							+ '(Forum members with no title)<br />'
							+ '<a href="/game/home.pl?user_id=' + id + '">' + realName + '</a> (<a href="/game/new_message.pl?to=' + id + '">PM</a>)'
							+ '</fieldset>');
						unknownPanel = $('#fam_list_UNKNOWN');
					} else {
						unknownPanel.append('<br /><a href="/game/home.pl?user_id=' + id + '">' + realName + '</a> (<a href="/game/new_message.pl?to=' + id + '">PM</a>)');
					}
				}
			});
			var nonMemberAddicts = 0;
			$.each(names, function(id, name) {
				if (!(id = parseInt(id))) return;
				else if (list.family.member[id]) {
					++nonMemberAddicts;
					$('#fam_list_family a[href$="/new_message.pl?to=' + id + '"]').after(') (<a href="/game/forum_private_access.pl?forum_id=358&action=Invite&user_name=' + escape(name) + '"><b style="color: #008787;">invite</b></a>');
				} else if (list.apprentice.member[id]) {
					$('#fam_list_apprentice a[href$="/new_message.pl?to=' + id + '"]').after(') (<a href="/game/forum_private_access.pl?forum_id=358&action=Invite&user_name=' + escape(name) + '"><b style="color: #008787;">invite</b></a>');
				} else if (list.waitlist.member[id]) {
					$('#fam_list_waitlist a[href$="/new_message.pl?to=' + id + '"]').after(') (<a href="/game/forum_private_access.pl?forum_id=358&action=Invite&user_name=' + escape(name) + '"><b style="color: #008787;">invite</b></a>');
				} else if (list[idToList[id]].forumAccess == 1) {
					$('#post_content_' + postId + ' a[href$="/new_message.pl?to=' + id + '"]').after(') (<a href="/game/forum_private_access.pl?forum_id=358&action=Invite&user_name=' + escape(name) + '"><b style="color: #008787;">invite</b></a>');
				}
			});
			var prefix = ' (';
			var statusMsg = members + ' members';
			if (membersMisnamed) {
				statusMsg += prefix + membersMisnamed + ' listed by the wrong name';
				prefix = ', ';
			}
			if (membersWithTitles) {
				statusMsg += prefix + '<b style="color: blue;">' + membersWithTitles + ' with titles</b>';
				prefix = ', ';
			}
			if (membersApprentice) {
				statusMsg += prefix + '<b style="color: green;">' + membersApprentice + ' apprentices</b>';
				prefix = ', ';
			}
			if (membersPromoteMe) {
				statusMsg += prefix + '<b style="color: red;">' + membersPromoteMe + ' without</b>';
				prefix = ', ';
			}
			if (membersWaitList) {
				statusMsg += prefix + '<b style="color: green;">' + membersWaitList + ' waitlisted</b>';
				prefix = ', ';
			}
			if (membersHitList) {
				statusMsg += prefix + '<b style="color: white; background-color: #a03c19; padding: 0px 3px 0px 3px;">' + membersHitList + ' hitlisted</b>';
				prefix = ', ';
			}
			if (unknown.length) {
				statusMsg += prefix + ' <b style="color: red;">' + unknown.length + ' unknown</b>';
				prefix = ', ';
			}
			statusMsg += ')';
			if (nonMemberAddicts) {
				statusMsg += ', ' + nonMemberAddicts + ' non-member Addicts';
			}
			me.CAStatusPane.html('<b>Forum Access Summary:</b> ' + statusMsg + '<span id="fam_check_names_status"></span>');
			$('#post_' + postId + ' div.post_buttons').find('a:has(span:contains(Edit))').before('<a class="buttonSmall" href="javascript:;" id="fam_check_names"><span>Check Names</span></a>');
			$('#fam_check_names').click(function() {
				me.CNStatusPane = $('#fam_check_names_status');
				me.outstanding = 0;
				me.badNames = 0;
				me.curName = 0;
				me.checkedNames = 0;
				$('#fam_check_names').hide();
				me.CNStatusPane.html('<br /><b>Status:</b> Checking names...');
				me.namesArr = [];
				$.each(names, function(id, name) {
					if (!(id = parseInt(id))) return;
					me.namesArr.push([id, names[id].replace(/#(\/?[bi])#/gi, function(matched, tag) { return '<'+tag+'>'; })]);
				});
				me.checkNames = function() {
					if (me.outstanding > 12) { // Only allow 12 simultaneous requests
						window.setTimeout(me.checkNames, 500);
						return;
					}
					me.CNStatusPane.html('<br /><b>Name Check Status:</b> Checked ' + me.checkedNames + '/' + names.num + ' names' + (me.outstanding ? ' (' + me.outstanding + ' in progress)' : '') + (me.badNames ? ', found ' + me.badNames + ' mis-named agents' : ''));
					if (me.curName >= me.namesArr.length) { // All done!
						// Allow rechecks? No, why?
						return;
					}
					me.outstanding++;
					var cur = me.namesArr[me.curName++] // [id, name]
					$.get('/game/home.pl?user_id=' + cur[0], function(agent) {
						me.outstanding--;
						if (!(agent = agent.match(/<td class="account_value">(.+?)<\/td>/))) return;
						var realName = agent[1];
						var n = cur[1].replace(/\s+\/\/\s+.+/, '');
						if (realName != n) {
							me.badNames++;
							console.log('id = ' + cur[0] + '; name = ' + cur[1] + '; realName = ' + realName);
							data.find('a[href$="user_id=' + cur[0] + '"]').after(' (real name: ' + realName.replace('(banned)', '<b><i>(banned)</i></b>') + ')');
//							data.html(data.html().replace(n + '</a>', n + '</a> (real name: ' + realName.replace('(banned)', '<b><i>(banned)</i></b>') + ')'));
						}
						me.checkedNames++;
						me.CNStatusPane.html('<br /><b>Name Check Status:</b> Checked ' + me.checkedNames + '/' + names.num + ' names' + (me.outstanding ? ' (' + me.outstanding + ' in progress)' : '') + (me.badNames ? ', found ' + me.badNames + ' mis-named agents' : ''));
					});
					window.setTimeout(me.checkNames, 0);
				};
				me.checkNames();
			});
		});
	})();
	return true;
}

function loadFromForum() {
	$.get(threadURL, function(data) {
		loadFromThisContent($('#post_content_' + postId, data));
	});
}

function setupPrefs() {
	// clean up legacy stuff
	deleteValue('splitters');
	// some utilities
	function prefMakeDiv(i, key) {
		return '<div style="float: left; border: 1px solid #cccccc; background-color: #eeeeee; font-size: 10px; font-weight: bold; height: 22px; line-height: 22px; text-align: center;">'
			+ '<input id="cfg_' + key + '_' + i + '" type="checkbox" style="vertical-align: top; margin-top: 5px; margin-left: 5px; margin-right: 5px;"' + (pref[key].val ? ' checked' : '') + ' />'
			+ '<span style="vertical-align: text-bottom; margin-right: 5px;">' + pref[key].desc + '</span>'
		+ '</div>'
	}
	var numPrefDivs = 0;
	function prefMakeDivAll() {
		var out = '<div id="family_prefs_' + numPrefDivs + '" style="color: black; float: right; height: 22px; margin: 6px 1px 6px 0px;">'; // class: page_selectors
		$.each(pref, function(key) {
			out += prefMakeDiv(numPrefDivs, key);
		})
		out += '</div>';
		++numPrefDivs;
		return out;
	}
	function prefSet() {
		var me = this;
		var p = this.id.match(/^cfg_(.+)_[0-9]+$/);
		if (!p || !pref[p = p[1]]) {
			console.warn('unknown input in prefSet: ', this);
			return;
		}
		pref[p].val = this.checked ? 1 : 0;
		$('input[id^="cfg_' + p + '_"]').each(function() {
			this.checked = me.checked;
		});
		if (pref[p].val == pref[p].dflt) {
			deleteValue('cfg_' + p);
		} else {
			setValue('cfg_' + p, pref[p].val);
		}
		insertTitles();
//		setupPrefs();
	}
	// load saved values
	function prefLoadAll() {
		$.each(pref, function(key, p) {
			p.val = getValue('cfg_' + key);
			if (p.val == undefined) {
				p.val = p.dflt;
			} else if (p.val == p.dflt) {
				deleteValue('cfg_' + key);
			}
		});
	}
	switch (PAGE_TYPE) {
		case 'forum_index':
			pref.indexHilite = {
				desc: 'Family on thread index',
				dflt: 1,
				val: 1,
			};
			prefLoadAll();
			break;
		case 'forum_thread':
			pref.pmLink = {
				desc: 'PM links',
				dflt: 1,
				val: 1,
			};
			pref.postsLink = {
				desc: 'Posts links',
				dflt: 1,
				val: 1,
			};
			prefLoadAll();
			break;
		case 'home':
			pref.homeHilite = {
				desc: 'Family on Homepage',
				dflt: 1,
				val: 1,
			};
			prefLoadAll();
			break;
		case 'msgbox':
		case 'msg':
			pref.msgTitle = {
				desc: 'Family on PMs/Alerts',
				dflt: 1,
				val: 1,
			};
			prefLoadAll();
			break;
		default:
			console.error('unknown PAGE_TYPE in setupPrefs(): ', PAGE_TYPE);
			return;
	}
	if (PAGE_TYPE.match(/^forum_/)) {
		if ($('div.page_selector_title').length > 0) {
			$('div.page_selectors + div.clear').before(prefMakeDivAll);
		} else if ($('#content div.outer_post').length > 0) {
			$('#content div.content_header').after('<div class="clear" />').after(prefMakeDivAll);
			$('#content div.outer_post:last').after(prefMakeDivAll);
		} else {
			$('#content div.medium_head').append(prefMakeDivAll);
		}
	} else if (PAGE_TYPE == 'home') {
		$('#tab_players_teams').before(prefMakeDivAll);
		$('#family_prefs_0').css('margin', '0px');
	} else if (PAGE_TYPE == 'msgbox') {
		$('#count_bar_container').after(prefMakeDivAll);
	} else if (PAGE_TYPE == 'msg') {
		$('#content div.content_header').after(prefMakeDivAll);
	} else {
		console.warn('unknown PAGE_TYPE in setupPrefs: ', PAGE_TYPE);
		return;
	}
	$('div[id^="family_prefs_"] input').change(prefSet);
}

UPDATE.check(2.5, SCRIPT.meta, SCRIPT, needScriptUpdate);

setupPrefs();

loadFromCurPage() || loadFromCache() || loadFromForum();

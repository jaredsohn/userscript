// ==UserScript==
// @name           dAmn Friends
// @namespace      http://djordjeungar.com/js/damnfriends/
// @description    Highlights friends in the members column of the dAmn chat
// @include        http://chat.deviantart.com*
// @creator        http://artbit.deviantart.com
// ==/UserScript==
// Creating the script node and adding to the head of the page, thus avoiding the use of unsafeWindow
// Thanks userscripts.org
function wrapper_function() {
	function initDamnFriends() {
		//Catch and rewire(tm) dAmn functions
		var SCRIPT_NAME = "dAmn Friends";
		var SCRIPT_VERSION = "0.52";
		var SCRIPT_DECRIPTION = "Sets the color of the deviants listed in the members column of the dAmn chat.";
		var dAmnFriendGroups = [];
		var dAmnFriends = [];
		var dAmnFriends_trim = function(stringToTrim) {
			return stringToTrim.replace(/^\s+|\s+$/g, "");
		};
		var dAmnFriends_sSuffix = function(num) {
			return ((num % 10 != 1) || (num % 100 == 11)) ? "s": "";
		};
		var dAmnFriends_setCookie = function(name, value) {
			d = new Date();
			d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
			document.cookie = name + "=" + escape(value) + "; expires=" + d.toGMTString() + "; path=/; domain=deviantart.com";
		};
		var dAmnFriends_deleteCookie = function(name, path) {
			if (dAmnFriends_getCookie(name)) {
				document.cookie = name + "=; path=/; domain=deviantart.com; expires=Thu, 01-Jan-70 00:00:01 GMT";
			}
		};
		var dAmnFriends_getCookie = function(name) {
			var cookies = document.cookie.split(/; /);
			for (var i = 0; i < cookies.length; i++) {
				var d = cookies[i].split('=');
				if (d[0] == name) {
					return unescape(d[1]);
				}
			}
			return null;
		};
		var dAmnFriends_storeFriends = function() {
			var allFriends = '',
			friendsInGroup = '';
			var i = dAmnFriendGroups.length;
			while (i--) {
				friendsInGroup = dAmnFriendGroups[i].name + ";" + dAmnFriendGroups[i].col + ";" + dAmnFriendGroups[i].list.join(',');
				allFriends += friendsInGroup + "|";
			}
			dAmnFriends_setCookie("friendList", allFriends);
			dAmnFriends_Refresh();
		};
        var loadDeviantFriends = function() {
            DiFi.pushPost('Friends', 'getFriendsMenu', [1], function(success, data){
				var usersinfo = data.response.content;
				var users = [];
				for (var i = 0; i < usersinfo.length; i++) {
					users.push(usersinfo[i].username);
				}
				dAmnFriendGroups.push({
					name: 'dAfriends',
					col: '#FF0',
					list: users
				});
                dAmnFriends_Refresh();
			});
            DiFi.send();
        }
		var dAmnFriends_loadFriends = function() {
			dAmnFriendGroups = [];
			var cookieVal = dAmnFriends_getCookie("friendList");
			if (!cookieVal) return;
			var groupsData = cookieVal.split("|");
			var i = groupsData.length;
			while (i--) {
				if (groupsData[i] !== "") {
					var group = groupsData[i].split(";");
					dAmnFriendGroups.push({
						name: group[0],
						col: group[1],
						list: group[2].split(',')
					});
				}
			}
            loadDeviantFriends();
			dAmnFriends_Refresh();
		};
		var dAmnFriends_findFriendInGroup = function(deviant, group) {
			deviant = String(deviant).toLowerCase();
			var i = group.list.length;
			while (i--) {
				if (group.list[i] == deviant) {
					return i;
				}
			}
			return - 1;
		};
		var dAmnFriends_friendExists = function(deviant) {
			if (deviant != '' && deviant != ',' && deviant != ' ') {
				var i = dAmnFriendGroups.length;
				while (i--)
				if (dAmnFriends_findFriendInGroup(deviant, dAmnFriendGroups[i]) >= 0) return i;
			}
			return - 1;
		};
		dAmnFriends_findGroup = function(group) {
			group = String(group).toLowerCase();
			var i = dAmnFriendGroups.length;
			while (i--)
			if (dAmnFriendGroups[i].name == group) {
				return i;
			}
			return - 1;
		};
		var dAmnFriends_groupCheck = function(usr) {
			var deviant = String(dAmnFriends_trim(usr)).toLowerCase();
			var grpID = dAmnFriends_friendExists(deviant);
			var msg;
			if (grpID >= 0) {
				var spanstart = "<span style='color:" + dAmnFriendGroups[grpID].col + "'>";
				var spanend = "</span>";
				msg = "User '" + spanstart + deviant + spanend + "' found in group [" + spanstart + dAmnFriendGroups[grpID].name + spanend + "</span>].";
			} else msg = "User '" + deviant + "' does not belong to any group.";
			dAmnFriends_showInfoBox(msg);
		};
		var dAmnFriends_addGroup = function(name, colour) {
			//check if group already exists
			name = String(name).toLowerCase();
			if (!colour) colour = "#333333";
			colour = String(colour).toUpperCase();
			var re = new RegExp(/^#[0-9ABCDEF]{3,6}$/);
			var m = re.exec(colour);
			if (m == null) {
				dAmnFriends_showError("Invalid colour", colour, "should be a HTML colour (e.g. #ffffff)");
				return;
			}
			var grpID = dAmnFriends_findGroup(name);
			if (grpID >= 0) {
				//group exists, just update the colour
				dAmnFriends_updateGroup(name, colour);
				return;
			}
			dAmnFriendGroups.push({
				name: name,
				col: colour,
				list: []
			});
			dAmnFriends_showResult("Group <b>" + name + "</b> [" + colour + "] successfully created.");
			dAmnFriends_storeFriends();
		};
		var dAmnFriends_updateGroup = function(name, colour) {
			//check if group already exists
			name = String(name).toLowerCase();
			if (!colour) colour = "#333333";
			colour = String(colour).toUpperCase();
			var re = new RegExp(/^#[0-9ABCDEF]{3,6}$/);
			var m = re.exec(colour);
			if (m == null) {
				dAmnFriends_showError("Invalid colour", colour, "should be a HTML colour (e.g. #ffffff)");
				return;
			}
			var grpID = dAmnFriends_findGroup(name);
			if (grpID < 0) {
				dAmnFriends_showError("Unknown group", name);
				return;
			}
			dAmnFriendGroups[grpID].col = colour;
			dAmnFriends_showResult("Color for the group '" + name + "' successfully updated to " + colour + ".");
			dAmnFriends_storeFriends();
			dAmnFriends_highlightFriends();
		};
		var dAmnFriends_removeGroup = function(name) {
			//check if group already exists
			name = String(name).toLowerCase();
			var grpID = dAmnFriends_findGroup(name);
			if (grpID < 0) {
				dAmnFriends_showError("Unknown group", name);
				return;
			}
			var user;
			while (user = dAmnFriendGroups[grpID].list.pop()) dAmnFriends_highlightFriend(user, "#000000");
			dAmnFriends_showResult("Removed group '" + name + "' from your group list.")
			dAmnFriendGroups.splice(grpID, 1);
			dAmnFriends_storeFriends();
		};
		var dAmnFriends_mergeGroups = function(sourceGroup, destinationGroup) {
			sourceGroup = String(sourceGroup).toLowerCase();
			var srcGroup = dAmnFriends_findGroup(sourceGroup);
			if (srcGroup < 0) {
				dAmnFriends_showError("Unknown group", sourceGroup);
				return;
			}
			destinationGroup = String(destinationGroup).toLowerCase();
			var destGroup = dAmnFriends_findGroup(destinationGroup);
			if (destGroup < 0) {
				dAmnFriends_showError("Unknown group", destinationGroup);
				return;
			}
			var user;
			while (user = dAmnFriendGroups[srcGroup].list.pop()) dAmnFriends_addFriend(destinationGroup, user);
			//show info
			dAmnFriendGroups.splice(srcGroup, 1);
			dAmnFriends_storeFriends();
		};
		var dAmnFriends_listGroup = function(name) {
			var grpID = dAmnFriends_findGroup(name);
			if (grpID < 0) {
				dAmnFriends_showError("Unknown group", group);
				return;
			}
			var msg = "You have no group by that name.";
			var i = dAmnFriendGroups[grpID].list.length;
			msg = "The group '" + name + "' contains " + i + " deviant" + dAmnFriends_sSuffix(i) + ": <br />--<br />";
			var usrs = String(dAmnFriendGroups[grpID].list.join(', '));
			usrs = usrs.substr(0, usrs.length);
			msg += usrs;
			dAmnFriends_showInfoBox(msg);
		};
		var dAmnFriends_listGroups = function() {
			var msg = "You have the following groups created: <br />--<br />";
			var len = dAmnFriendGroups.length;
			var i = len;
			if (len) msg += "<table cellpadding='2px' cellspacing='5px' style='padding:5px;'><thead><tr><td><b>Name</b></td><td><b>Color</b></td><td><b>Count</b></td><td><b>User list</b></td></tr></thead><tbody>";
			while (i--) {
				var usrs = String(dAmnFriendGroups[i].list.join(', '));
				len = usrs.length;
				usrs = (len < 100) ? usrs.substr(0, len) : (usrs.substr(0, 100) + "...");
				msg += "<tr><td>" + dAmnFriendGroups[i].name + "</td><td><code><span style='color:" + dAmnFriendGroups[i].col + "'>" + String(dAmnFriendGroups[i].col).toUpperCase() + "</span></code></td><td>" + dAmnFriendGroups[i].list.length + "</td><td>" + usrs + "</td></tr>";
			}
			if (len) msg += "</tbody></table>";
			dAmnFriends_showInfoBox(msg);
		};
		var dAmnFriends_noteGroup = function(group, subj) {
			group = String(group).toLowerCase();
			var grpID = dAmnFriends_findGroup(group);
			if (grpID < 0) {
				dAmnFriends_showError("Unknown group", group);
				return;
			}
			if (dAmnFriendGroups[grpID].list.length > 10) dAmnFriends_showResult("Your conscience: 'Spamming is a cardinal sin.'");
			var link = "http://my.deviantart.com/notes/?to=" + dAmnFriendGroups[grpID].list.join(', ');
			subj = dAmnFriends_trim(subj);
			if (subj) link += "&subject=" + subj;
			window.open(link);
		};
		var dAmnFriends_addFriend = function(group, deviants) {
			//if the group doesn't exist - display error and exit
			group = String(group).toLowerCase();
			var groupID = dAmnFriends_findGroup(group);
			if (groupID == - 1) {
				//group doesn't exists
				dAmnFriends_showError("Unknown group", group);
				return;
			}
			var deviantsString = String(dAmnFriends_trim(deviants)).toLowerCase();
			deviants = deviantsString;
			deviants = deviants.split(' ');
			var num = deviants.length;
			for (var i = 0; i < deviants.length; i++) {
				var deviant = deviants[i];
				if (deviant != '' && deviant != ',' && deviant != ' ') {
					if (dAmnFriends_friendExists(deviant) >= 0) dAmnFriends_removeFriend(deviant);
					dAmnFriendGroups[groupID].list.push(deviant);
				}
			}
			dAmnFriends_showResult("Added " + num + " deviant" + dAmnFriends_sSuffix(num) + " (" + deviantsString + ") to the group '" + group + "'.");
			dAmnFriends_storeFriends();
			dAmnFriends_highlightFriends();
		};
		var dAmnFriends_removeFriend = function(deviants) {
			var deviantsString = String(dAmnFriends_trim(deviants)).toLowerCase();
			deviants = deviantsString.split(' ');
			var num = deviants.length;
			for (var i = 0; i < deviants.length; i++) {
				var deviant = deviants[i];
				if (deviant != '' && deviant != ',' && deviant != ' ') for (var j = 0; j < dAmnFriendGroups.length; j++) {
					var group = dAmnFriendGroups[j];
					var friendID = dAmnFriends_findFriendInGroup(deviant, group);
					if (friendID >= 0) {
						dAmnFriends_highlightFriend(group.list[friendID], "#000000");
						group.list.splice(friendID, 1);
					}
				}
			}
			dAmnFriends_showResult("Removed " + num + " deviant" + dAmnFriends_sSuffix(num) + " from your groups. (" + deviantsString + ").");
			dAmnFriends_storeFriends();
		};
		var dAmnFriends_highlightFriend = function(user) {
			var damnChatSpace = document.getElementById("damn-chatspace");
			var members, member;
			members = document.evaluate("//dd[@class='dAmnChatMember']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < members.snapshotLength; i++) {
				member = members.snapshotItem(i);
				user = String(member.innerHTML).toLowerCase();
				user = user.replace(/\[\d+\]/, "");
				user = user.match(/[a-z0-9_\-]+$/)
				member.style.color = dAmnFriends_userColour(user);
			}
		};
		var dAmnFriends_Refresh = function() {
			var a = [];
			var i = dAmnFriendGroups.length;
			while (i--) {
				var colour = dAmnFriendGroups[i].col;
				var j = dAmnFriendGroups[i].list.length;
				while (j--) a[dAmnFriendGroups[i].list[j]] = colour;
			}
			a.sort();
			dAmnFriends = a;
		};
		var dAmnFriends_userColour = function(user) {
			user = String(user).toLowerCase();
			if (dAmnFriends[user]) return dAmnFriends[user];
			return '#000000';
		};
		var dAmnFriends_highlightFriends = function() {
			var damnChatSpace = document.getElementById("damn-chatspace");
			var members, member;
			members = document.evaluate("//dd[@class='dAmnChatMember']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < members.snapshotLength; i++) {
				member = members.snapshotItem(i);
				var user = String(member.innerHTML).toLowerCase();
				user = user.replace(/\[\d+\]/, "");
				user = user.match(/[a-z0-9_\-]+$/)
				member.style.color = dAmnFriends_userColour(user);
			}
		};
		var dAmnFriends_showDamnFriendsHelp = function() {
			dAmnFriends_showInfoBox('<span style="font-size:1.1em;"><a href="http://djordje.ungar.on.neobee.net/js/damnfriends/damnfriends.user.js"><b>' + SCRIPT_NAME + '</b> v' + SCRIPT_VERSION + '</a> by <a href="http://artbit.deviantart.com">ArtBIT</a></span> - ' + SCRIPT_DECRIPTION + '<br /><br />' + '<b>Here is the list of commands: </b><br />' + '<table style="padding:5px;"><thead></thead>' + '<tr><td><b>/groupadd <i>name</i> <i>color</i> </b> - creates a new friend group. <b><i>color</i></b> must be in HTML format (#000000 - #FFFFFF)</td></tr>' + '<tr><td><b>/groupdel <i>name</i> </b> - deletes the group with the given <i>name</i> and removes all users that belonged to it.</td></tr>' + '<tr><td><b>/groupupdate <i>name</i> <i>color</i> </b> - sets the new color for the group</td></tr>' + '<tr><td><b>/groupmerge <i>group1</i> <i>group2</i> </b> - adds all the users from <i>group1</i> to <i>group2</i> and removes the <i>group1</i> </td></tr>' + '<tr><td><b>/groupinfo <i>group</i></b> - Shows info for the <i>group</i> or if <i>group</i> is not specified, for all the groups you created.</td></tr>' + '<tr><td><b>/groupcheck <i>user</i></b> - Checks if the <i>user</i> belongs to any group.</td></tr>' + '<tr><td><b>/groupadduser <i>group</i> <i>user1 (user2 user3 ... userN)</i> </b> - adds the specified user(s) to the <i>group</i>.</td></tr>' + '<tr><td><b>/groupdeluser <i>user1 (user2 user3 ... userN)</i> </b> - deletes the specified user(s) from all the groups</td></tr>' + '<tr><td><b>/groupsay <i>group</i> <i>message</i> </b> - highlights all the members of the group with your message.</td></tr>' + '<tr><td><b>/groupnote <i>group</i> <i>(subject)</i> </b> - opens the dA note page and sets all the group members as recipients.</td></tr>' + '<tr><td><b>/grouphelp </b> - This screen</td></tr>' + '</tbody></table>');
		}
		dAmnFriends_loadFriends();
		var lastGroupSay = 0;
		dAmnFriends_sayGroup = function(group, msg) {
			var now = new Date().getTime();
			if (now - lastGroupSay < 60000) {
				dAmnFriends_showResult("Wait at least 1 minute before using /groupsay again.");
				return;
			}
			group = String(group).toLowerCase();
			var grpID = dAmnFriends_findGroup(group);
			if (grpID < 0) {
				dAmnFriends_showError("Unknown group", group);
				return;
			}
			var i = dAmnFriendGroups[grpID].list.length;
			if (i > 10) dAmnFriends_showResult("Your conscience: 'Please avoid highlighting many people at once. Thanks.'");
			var users = "<abbr title='";
			while (i--) {
				users += dAmnFriendGroups[grpID].list[i] + " ";
			}
			users += "'></abbr>";
			dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg', 'main', users + msg)
			lastGroupSay = now;
		};
		var dAmnFriends_showInfoBox = function(body) {
			var channel = dAmnChats[dAmnChatTab_active].channels.main;
			var o = dAmn_MakeDiv("userinfo-outer")
			var i = dAmn_AddDiv(o, "userinfo-inner");
			var u = dAmn_AddDiv(i, "userinfo alt0");
			var t = this;
			dAmnChat_AddImgBox(u, "damncr-close", 'close', 'close', function(el) {
				dAmn_DeleteSelf(el);
				t.scroll_once = true;
				dAmn_InvalidateLayout();
			},
			o);
			var r = dAmn_AddDiv(u, 'bodyarea alt1-left-border');
			var b = dAmn_AddDiv(r, 'b read pcusers');
			dAmn_AddDiv(b, 'read', body);
			channel.addDiv(o, null, 0);
		};
		var dAmnFriends_showResult = function(msg) {
			dAmn_addTimedDiv(dAmnChats[dAmnChatTab_active].channels.main.info_el, "dAmnFriends_Result", msg);
		};
		var dAmnFriends_showError = function(ev, arg1, arg2) {
			dAmnChats[dAmnChatTab_active].channels.main.onErrorEvent(ev, arg1, arg2);
		};
		dAmnChanChat.prototype.dAmnFriends_Init = dAmnChanChat.prototype.Init;
		dAmnChanChat.prototype.Init = function(cr, name, parent_el) {
			this.dAmnFriends_Init(cr, name, parent_el);
			var cie = this.input;
			cie.cmds['groupadduser'] = [0, ''];
			cie.cmds['groupdeluser'] = [0, ''];
			cie.cmds['groupadd'] = [0, ''];
			cie.cmds['groupdel'] = [0, ''];
			cie.cmds['groupupdate'] = [0, ''];
			cie.cmds['groupinfo'] = [0, ''];
			cie.cmds['groupmerge'] = [0, ''];
			cie.cmds['grouphelp'] = [0, ''];
			cie.cmds['groupsay'] = [0, ''];
			cie.cmds['groupnote'] = [0, ''];
			cie.cmds['groupcheck'] = [0, ''];
			cie.cmds['test'] = [0, ''];
		};
		dAmnFriends_dAmnFriends_onKey = dAmnChatInput_onKey;
		dAmnChatInput_onKey = function(e, kc, force) {
			var didsmth = false;
			var el = this.chatinput_el;
			var prms, users, grp, usr, msg;
			if (kc == 13 && (force || ! this.multiline || e.shiftKey || e.ctrlKey)) {
				var input = el.value;
				var rex = /^\/(\S*)\s*(.*)$/i.exec(input);
				if (rex) {
					var cmd = rex[1];
					var param = rex.slice(2).join(' ');
					var link = "";
					if (cmd) {
						switch (cmd) {
						case 'groupadduser':
							prms = param.split(' ');
							grp = prms[0];
							prms[0] = '';
							users = prms.join(' ');
							dAmnFriends_addFriend(grp, users);
							didsmth = true;
							break;
						case 'groupdeluser':
							dAmnFriends_removeFriend(param);
							didsmth = true;
							break;
						case 'groupadd':
							prms = param.split(' ');
							dAmnFriends_addGroup(prms[0], prms[1]);
							didsmth = true;
							break;
						case 'groupupdate':
							prms = param.split(' ');
							dAmnFriends_updateGroup(prms[0], prms[1]);
							didsmth = true;
							break;
						case 'groupdel':
							dAmnFriends_removeGroup(param);
							didsmth = true;
							break;
						case 'groupinfo':
							if (param) dAmnFriends_listGroup(param);
							else dAmnFriends_listGroups();
							didsmth = true;
							break;
						case 'groupmerge':
							prms = param.split(' ');
							dAmnFriends_mergeGroups(prms[0], prms[1]);
							didsmth = true;
							break;
						case 'grouphelp':
							dAmnFriends_showDamnFriendsHelp();
							didsmth = true;
							break;
						case 'groupsay':
							prms = param.split(' ');
							group = prms[0];
							prms[0] = '';
							msg = prms.join(' ');
							dAmnFriends_sayGroup(group, msg);
							didsmth = true;
							break;
						case 'groupnote':
							prms = param.split(' ');
							group = prms[0];
							prms[0] = '';
							msg = prms.join(' ');
							dAmnFriends_noteGroup(group, msg);
							didsmth = true;
							break;
						case 'groupcheck':
							prms = param.split(' ');
							usr = prms[0];
							dAmnFriends_groupCheck(usr);
							didsmth = true;
							break;
						} //end case
						if (didsmth) {
							if (el.value) {
								//add to history array
								if (this.history_pos != - 1 && this.history[this.history_pos] == el.value) { // posting from history.. move to the end
									var before = this.history.slice(0, this.history_pos);
									var after = this.history.slice(this.history_pos + 1);
									this.history = before.concat(after).concat(this.history[this.history_pos]);
								} else {
									// add to history -- limit to 300
									this.history = this.history.concat(el.value);
									if (this.history.length > 300) this.history = this.history.slice(1);
								}
								//alert(this.history);
								this.history_pos = - 1;
								el.value = '';
								if (link) window.open(link);
								el.focus();
							}
						}
					}
				}
			}
			if (!didsmth) return this.dAmnFriends_dAmnFriends_onKey(e, kc, force) ? true: false;
			else return false;
		};
		dAmnChatInput.prototype.onKey = dAmnChatInput_onKey;
		dAmnChatInput.prototype.dAmnFriends_dAmnFriends_onKey = dAmnFriends_dAmnFriends_onKey;
		dAmnFriends_dAmnChatMembers_AddMember = dAmnChatMembers.prototype.AddMember;
		dAmnChatMembers_AddMember = function(name, info, updatedisplay, count) {
			dAmnFriends_dAmnChatMembers_AddMember.call(this, name, info, updatedisplay, count);
			dAmnFriends_highlightFriend(name);
		};
		dAmnChatMembers.prototype.AddMember = dAmnChatMembers_AddMember;
		dAmnFriends_dAmnChatMembers_Refresh = dAmnChatMembers.prototype.Refresh;
		dAmnChatMembers_Refresh = function() {
			dAmnFriends_dAmnChatMembers_Refresh.call(this);
			dAmnFriends_highlightFriends();
		};
		dAmnChatMembers.prototype.Refresh = dAmnChatMembers_Refresh;
	}
	var tries = 0;
	var maxTries = 100;
	function tryInit() {
		//alert(unsafeWindow.dAmnChanChat.prototype);
		if (dAmnChanChat && dAmnChanChat.prototype) {
			initDamnFriends();
		} else {
			if (tries++ < maxTries) setTimeout(tryInit, 100);
		}
	}
	tryInit();
} // end wrapper_function
var daway_script = document.createElement('script')
daway_script.appendChild(document.createTextNode('(' + wrapper_function + ')();'));
document.body.appendChild(daway_script);

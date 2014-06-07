// ==UserScript==
// @name           Quake Live Friend Commands
// @namespace      http://userscripts.org/users/469998
// @description    Send friend and server invites from the Quake Live console
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// ==/UserScript==

// contentEval taken from http://userscripts.org/scripts/show/100842
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function () {
	if (typeof quakelive != 'object') { return; }
	var commands = {
		invite:{
			params:true,
			dft:'a ^1PRO^7 command to invite someone to the current server',
			fn:function (val) {
				if (!quakelive.currentServerId) {
					qz_instance.SendGameCommand("echo Can't invite to a practice match!;");
				} else {
					jQuery.ajax({
						url:'/request/invite',
						type:'post',
						dataType:'json',
						data:{
							user:val,
							server_id:quakelive.currentServerId
						},
						success:function (data) {
							qz_instance.SendGameCommand('echo ' + val + (data.ECODE ? ' could not be invited.;' : ' has been invited to the server.;'));
						}
					});
				}
			}
		},
		addfriend:{
			params:true,
			dft:'a command to accept or send a friend invite',
			fn:function (val) {
				var incoming = quakelive.mod_friends.roster.pendingRequests,found,i;
				for (i in incoming) {
					if (incoming[i].username.toLowerCase() == val.toLowerCase()) {
						quakelive.mod_friends.AnswerSubscriptionRequest(incoming[i].bare, true);
						qz_instance.SendGameCommand('echo Accepted friend invite from ' + val + '.;');
						found = 1;
						break;
					}
				}
				var friend = quakelive.mod_friends.roster.GetIndexByName(val)
				if (friend >= 0) {
					if (quakelive.mod_friends.roster.fullRoster[friend].IsInvited()) {
						qz_instance.SendGameCommand('echo ' + val + ' has already been added.;');
					} else { qz_instance.SendGameCommand('echo ' + val + ' is already your friend <3;'); }
				} else if (!found) {
					if (val.toLowerCase() != quakelive.username.toLowerCase()) {
						jQuery.ajax({
							type:'post',
							url:'/register/verify/nametag',
							dataType:'json',
							data:{
								value:val
							},
							success:function (data) {
								if (data.ECODE == -1) {
									qz_instance.IM_Subscribe(val);
									qz_instance.SendGameCommand('echo Sent a friend invite to ' + val + '.;');
								} else {
									qz_instance.SendGameCommand("echo Couldn't find player " + val + ".;");
								}
							}
						});
					} else {
						qz_instance.SendGameCommand("echo Can't add yourself!;");
					}
				}
			}
		},
		accept:{
			params:true,
			dft:'a command to accept a friend invite (use /pending to list)',
			fn:function (val) {
				var incoming = quakelive.mod_friends.roster.pendingRequests,
				p = parseInt(val);
				if (!incoming.length) {
					qz_instance.SendGameCommand('echo No pending friend invites.;');
				} else if (isNaN(p) || p < 1 || p > incoming.length) {
					qz_instance.SendGameCommand('echo Please enter a number between 1 and ' + incoming.length + '.;');
				} else {
					quakelive.mod_friends.AnswerSubscriptionRequest(incoming[p - 1].bare, true);
					qz_instance.SendGameCommand('echo Accepted friend invite from ' + incoming[p - 1].username + '.;');
				}
			}
		},
		clantag:{
			params:true,
			dft:'a command to activate a clantag (use /clans to list)',
			fn:function (val) {
				var i,j = 0,p = parseInt(val);
				for (i in quakelive.clandb) {
					j++;
					if (p == j) {
						quakelive.mod_clans.ActivateClan(i);
						qz_instance.SendGameCommand('echo Activated clantag ' + quakelive.clandb[i].pretty_tag + '^7, please /reconnect in 5 seconds.;');
						break;
					}
				}
				if (!j) {
					qz_instance.SendGameCommand("echo You're not in any clans.;");
				} else if (isNaN(p) || p < 1 || p > j) {
					qz_instance.SendGameCommand('echo Please enter a number between 1 and ' + j + '.;');
				}
			}
		},
		pending:{
			params:false,
			dft:0,
			fn:function () {
				var incoming = quakelive.mod_friends.roster.pendingRequests,i;
				for (i in incoming) {
					qz_instance.SendGameCommand('echo ' + (parseInt(i) + 1) + ' ' + incoming[i].username + ';');
				}
				if (!i) {
					qz_instance.SendGameCommand('echo No friend invites are pending.;');
				}
			}
		},
		clans:{
			params:false,
			dft:0,
			fn:function () {
				var i,j = 0;
				for (i in quakelive.clandb) {
					j++;
					qz_instance.SendGameCommand('echo ' + parseInt(j) + ' ' + quakelive.clandb[i].pretty_tag + ';');
				}
				if (!j) {
					qz_instance.SendGameCommand("echo You're not in any clans :(;");
				}
			}
		}
	};
	var oldLaunchGame = LaunchGame,ready;
	LaunchGame = function (params, server) {
		ready = false;
		var i;
		for (i in commands) {
			if (commands[i].params) {
				params.Append('+set ' + i + ' "^7"');
				params.Append('+set ' + i + ' "' + commands[i].dft + '"');
			} else {
				commands[i].dft = 0;
				params.Append('+set GM_qlfc_' + i + ' "0"');
				params.Append('+alias ' + i + ' "set GM_qlfc_' + i + ' 1"');
			}
		}
		return oldLaunchGame.apply(this, arguments);
	}
	var oldOnCommNotice = OnCommNotice;
	OnCommNotice = function (error, data) {
		if (error == 0) {
			var msg = quakelive.Eval(data);
			if (msg.MSG_TYPE == 'serverinfo') {
				ready = true;
			}
		}
		return oldOnCommNotice.apply(this, arguments);
	}
	var oldOnCvarChanged = OnCvarChanged;
	OnCvarChanged = function (name, value, replicate) {
		var i;
		for (i in commands) {
			if ((commands[i].params && name == i) || (!commands[i].params && name == 'GM_qlfc_' + i)) {
				if (value != commands[i].dft) {
					if (ready) {
						commands[i].fn(value);
					}
					qz_instance.SendGameCommand('set ' + name + ' "' + commands[i].dft + '";');
				}
				replicate = 0;
			}
		}
		return oldOnCvarChanged.apply(this, arguments);
	}
	var oldOnSubscribeRequest = IM_OnPresence;
	IM_OnPresence = function (info) {
		var msg = quakelive.Eval(quakelive.Eval(info).msg);
		if (msg) {
			qz_instance.SendGameCommand('echo ' + msg.FROM + ' sent you a friend invite.;');
		}
		return oldOnSubscribeRequest.apply(this, arguments);
	}
});
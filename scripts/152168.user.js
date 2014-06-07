// ==UserScript==
// @name           Quake Live ingame friend commands
// @version        0.104
// @namespace      https://github.com/rulex/ql-friends
// @author         https://github.com/rulex/
// @description    List online friends in console. Show info about friend who are ingame. Use /join <friend> to join friends game
// @include        http://*.quakelive.com/*
// ==/UserScript==



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

contentEval( function () {
	function timeago( d1, d2 ) {
		d1 = new Date( d1 );
		//d1 = new Date( '2013-03-28T11:00:00' );
		d2 = new Date(  );
		var ms = d2 - d1;
		var _d = parseInt( ms / 1000 / 60 / 60 / 24 );
		ms = ms - ( _d * 1000 * 60 * 60 * 24 );
		var _h = parseInt( ms / 1000 / 60 / 60 );
		ms = ms - ( _h * 1000 * 60 * 60 );
		var _m = parseInt( ms / 1000 / 60 );
		ms = ms - ( _m * 1000 * 60 );
		var _s = parseInt( ms / 1000 );
		var d = _d >= 1 ? _d + "d " : "";
		var h = _h >= 1 ? _h + "h " : "";
		var m = _m >= 1 ? _m + "m " : "";
		var s = _s >= 1 ? _s + "s " : "";
		return d + h + m + s + "ago";
		//console.log( d + h + m + s + "ago" );
		//return _d + "d " + _h + "h " + _m + "m " + _s + "s " + "ago";
	}
	function htmlDecode( input ) {
		var e = document.createElement( 'div' );
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}
	var Locations = {
		40: 'ARG',
		14: 'AUS',
		33: 'AUS',
		35: 'AUS',
		45: 'SGP',
		51: 'AUS',
		26: 'CAN',
		38: 'CHL',
		18: 'DE',
		28: 'ES',
		20: 'FR',
		19: 'UK',
		41: 'ISL',
		42: 'JPN',
		49: 'KOR',
		17: 'NL',
		32: 'PL',
		37: 'RO', 
		39:	'RO',
		44: 'RU',
		47: 'SRB',
		29: 'SE',
		58: 'UKR',
		6: 'TX',
		10: 'CA',
		11: 'VA',
		16: 'CA',
		21: 'IL',
		22: 'GA',
		23: 'WA',
		24: 'NY',
		25: 'CA',
		46: 'ZAF'
	};
	var invitations_sent;
	var guests;
	if( typeof quakelive != 'object' ) { return; }
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
		},
		show: {
			params: true,
			dft: "info about friends game. Use /friends",
			fn: function( val ) {
				val = val.toLowerCase();
				var found = false;
				var ip = "";
				var name = "";
				var serv;
				var ids;
				var color = "";
				var spec = "";
				jQuery.each( quakelive.mod_friends.roster.fullRoster, function() {
					name = this.name.toLowerCase();
					if( name == val ) {
						if( this.bio != null ) {
							var bio = this.bio.replace( "\n", " " ).replace( "\r", " " ).replace( "\t", " " ).replace( ";", " " );
							bio = htmlDecode( bio );
						}
						else
							var bio = "empty";
						qz_instance.SendGameCommand( 'echo ^5_ ' + this.group + ';' );
						qz_instance.SendGameCommand( 'echo ^5_ CLAN: ^7' + this.clan + ';' );
						qz_instance.SendGameCommand( 'echo ^5_ BIO: ^7' + bio + ';' );
						qz_instance.SendGameCommand( 'echo ^5_ LAST: ^7' + this.last_online_date + ';' );
						qz_instance.SendGameCommand( 'echo ^5_ COUNTRY: ^7' + this.country_name + ';' );
						if( this.inGame ) {
							ids = this.gameStatus.SERVER_ID;
							jQuery.ajax( {
								url: "/browser/details",
								data: {
									"ids": ids,
								},
								dataType: "json",
								type: "get",
								success: function( data ) {
									var prem = " ";
									var ruleset = " ";
									var needpass = " ";
									var instagib = " ";
									var textstr = "";
									var loc = data[0].location_id;
									if( data[0].g_instagib == 1 )
										instagib = "INSTA";
									if( data[0].premium )
										prem = "PREM";
									if( data[0].ruleset == 2 )
										ruleset = "PQL";
									if( data[0].g_needpass )
										needpass = "PASS";
									qz_instance.SendGameCommand( 'echo _ ' + ' ^5' + ' ^3-> ^7' + data[0].game_type_title + ' ^5' + '^7(^5' + Locations[loc] + '^7) ^4' + data[0].host_name  + '^7 on ^3' + data[0].map_title + '^7 ' + prem + ' ' + instagib + ' ' + ruleset + ' (' + data[0].num_players + '/' + data[0].max_clients + ') ' + ' ts' + data[0].teamsize + ' ' + data[0].g_gamestate + ' ' + needpass + ';' );
									qz_instance.SendGameCommand( 'echo ^7_ _ ^1RED : ^7' + data[0].g_redscore + ';' );
									qz_instance.SendGameCommand( 'echo ^7_ _ ^4BLUE: ^7' + data[0].g_bluescore + ';' );
									qz_instance.SendGameCommand( 'echo ^7_ _ SCORE  ^5 PLAYER;' );
									jQuery.each( data[0].players, function() {
										if( this.team == 2 ) {
											color = "^4";
										}
										else if( this.team == 1 ) {
											color = "^1";
										}
										else {
											color = "^7 ";
										}
										qz_instance.SendGameCommand( 'echo ^7_ _ ' + this.score + ' ' + ' ' + color + this.name + ';' );
									} );
								}
							} );
						}
						else
							qz_instance.SendGameCommand( "echo _ not ingame;" );
						return;
					}
				} );
			}
		},
		join: {
			params: true,
			dft: "join a friend who is in game. Use /friends.",
			fn: function( val ) {
				val = val.toLowerCase();
				var found = false;
				var ip = "";
				jQuery.each( quakelive.mod_friends.roster.fullRoster, function() {
					var name = this.name.toLowerCase();
					if( name == val ) {
						if( this.inGame && this.gameStatus.BOT_GAME == 0 ) {
							qz_instance.SendGameCommand( 'connect ' + this.gameStatus.ADDRESS + ';' );
						}
						else if( this.gameStatus.BOT_GAME == 1 ) {
							qz_instance.SendGameCommand( 'echo ^4practice match...;' );
						}
						else {
							qz_instance.SendGameCommand( 'echo ^4not on any server;' );
						}
					}
				} );
			}
		},
		invited: {
			params: false,
			dft: 0,
			fn: function() {
				$.ajax( {
					url: "http://www.quakelive.com/startamatch/invites/" + quakelive.currentServerId,
					dataType: "json",
					type: "get",
				} ).success( function( data ) {
					invitations_sent = data.user_invitations;
					guests = data.guests;
					var nr = 0;
					qz_instance.SendGameCommand( 'echo Sent Invites: ;' );
					jQuery.each( invitations_sent, function() {
						qz_instance.SendGameCommand( "echo " + nr++ + " ^4" + this.invitee + "^7 by ^5" + this.inviter + "^7 " + ( this.guest_invite ? "^3STANDARD" : "^7*" ) + ";" );
					} );
					qz_instance.SendGameCommand( 'echo  ;' );
					qz_instance.SendGameCommand( 'echo Active: ;' );
					jQuery.each( guests, function() {
						qz_instance.SendGameCommand( "echo ^4" + this[1]  + "^7 " + timeago( parseInt( this[0] ) * 1000 ) + ";" );
					} );
					//qz_instance.SendGameCommand( 'echo ;' );
				} );
			}
		},
		revoke: {
			params: true,
			dft: "Revoke an invite to server, use /invited to get number",
			fn: function( val ) {
				var nr = 0;
				jQuery.each( invitations_sent, function() {
					if( nr == val ) {
						$.ajax( {
							url: "http://www.quakelive.com/startamatch/revokeinvite",
							dataType: "json",
							type: "post",
							data: { spid: quakelive.currentServerId, from: this.inviter, to: this.invitee }
						} ).success( function( data ) {
							console.log( data.MSG );
						} );
					}
				} );
			}
		},
		friends: {
			params: false,
			dft: 0,
			fn: function() {
				qz_instance.SendGameCommand( 'echo _ For more server info /show <nick>, or /join <nick> to join;' );
				qz_instance.SendGameCommand( 'echo _ ^2Online Friends:;' );
				jQuery.each( quakelive.mod_friends.roster.fullRoster, function() {
					var ids = null;
					var name = "";
					var clan = "";
					//clan = this.clan;
					name = this.name;
					if( this.group == "online" ) {
						if( this.inGame ) {
							if( this.gameStatus.BOT_GAME == 0 ) {
								ids = this.gameStatus.SERVER_ID;
								jQuery.ajax( {
									url: "/browser/details",
									data: {
										"ids": ids,
									},
									dataType: "json",
									type: "get",
									success: function( data ) {
										var prem = " ";
										var ruleset = " ";
										var needpass = " ";
										var instagib = " ";
										var textstr = "";
										var loc = data[0].location_id;
										if( data[0].g_instagib == 1 )
											instagib = "INSTA";
										if( data[0].premium )
											prem = "PREM";
										if( data[0].ruleset == 2 )
											ruleset = "PQL";
										if( data[0].g_needpass )
											needpass = "PASS";
										qz_instance.SendGameCommand( 'echo _ ' + clan + ' ^5' + name + ' ^3-> ^7' + data[0].game_type_title + ' ^5' + '^7(^5' + Locations[loc] + '^7) ^4' + data[0].host_name  + '^7 on ^3' + data[0].map_title + '^7 ' + prem + ' ' + instagib + ' ' + ruleset + ' (' + data[0].num_players + '/' + data[0].max_clients + ') ' + ' ts' + data[0].teamsize + ' ' + data[0].g_gamestate + ' ' + needpass + ';' );
									}
								} );
							}
							else {
								qz_instance.SendGameCommand( "echo _ " + clan + " ^5" + name + "^7 is practesting against them BOTS;" );
							}
						}
						else {
							qz_instance.SendGameCommand( "echo _ " + clan + " ^5" + name + "^7;" );
						}
					}
				} );
			}
		},
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







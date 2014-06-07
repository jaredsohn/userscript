// ==UserScript==
// @name QL CONSOLE STREAM
// @version 0.3
// @namespace yolo
// @description Streams what happens in the console back to the QL client
// @author http://github.com/rulex
// @include http://*.quakelive.com/*
// @exclude http://*.quakelive.com/forum*
// ==/UserScript==


console.log( 'LOADING...' );

var $ = unsafeWindow.jQuery;

(function() {
	document.addEventListener('load', function(){

		function contentEval( source ) {
			if( 'function' == typeof source ) {
				source = '(' + source + ')();';
			}
			var script = document.createElement( 'script' );
			script.setAttribute( 'type', 'application/javascript' );
			script.textContent = source;
			document.body.appendChild( script );
			document.body.removeChild( script );
		}

		console.log( 'LOADING......' );

		var thediv = '<div style="background-color: red; color:black; padding: 2px; margin-top: 4px; margin-bottom: 4px; width:298px; border:1px solid black;" id="ql-cstream-div" >ql-cstream: <div id="ql-cstream-div2">disconnected</div><input id="ql-cstream-input" type="hidden" value="disconnected" /><div id="ql-cstream-counter">0</div></div>';
		var thediv_ing = '<div style="background-color: red; color:black; max-height: 400px; padding: 2px; margin-top: 4px; margin-bottom: 4px; width:298px; border:1px solid white;" id="ql-cstream-div-ing" >ql-cstream: <div id="ql-cstream-div2-ing">disconnected</div><div id="ql-cstream-counter-ing">0</div>rows</div>';

		if( $( '#ql-cstream-div' ).length == 0 ) {
			$( '#qlv_contentChat' ).prepend( thediv );
		}
		if( $( '#ql-cstream-div-ing' ).length == 0 ) {
			$( '#qlv_game_mode_chatlist' ).css( 'height', 'auto' );
			$( '#qlv_game_mode_chatlist' ).prepend( thediv_ing );
		}

		if( $('#ql-cstream-input').val() == 'disconnected' ) {
			$('#ql-cstream-input').val('connecting');

			$.getScript( 'http://localhost:8181/socket.io/socket.io.js', function( getscript_data, getscript_textstatus, getscript_jqxhr ) {
				contentEval( function() {
					console.log( 'LOADING CSTREAM...' );
					// api url
					var apiurl = 'http://10.0.0.1:8282/qlapi/';
					var passy = 'password';
					// Players/Clans that get \op <3
					var players_allowed = [ "clockwork", "_mitch", "mahou" ];
					var clans_allowed = [ "rawr:", "lewd", "indx" ];
					var _loopPlayers = Math.round( ( new Date() ).getTime() / 1000 );
					function in_Array( needle, haystack ) {
						var length = haystack.length;
						for( var i = 0; i < length; i++ ) {
							if( haystack[i].nick == needle ) {
								return i;
							}
						}
						return -1;
					}
					function looplayers( playerlist ) {
						// Players that get \kickban </3
						var players_banned = [
						{ nick: "kebapmanager", reason: "fag" }
						];
						for( var i in playerlist ) {
							if( playerlist[i].status == " " ) {
								// OPs
								if( $.inArray( playerlist[i].name.toLowerCase(), players_allowed ) != -1 ) {
									qz_instance.SendGameCommand( "op " + playerlist[i].id + ";" );
								}
								else if( $.inArray( playerlist[i].clan.toLowerCase(), clans_allowed ) != -1 ) {
									qz_instance.SendGameCommand( "op " + playerlist[i].id + ";" );
								}
							}
							// bans
							if( in_Array( playerlist[i].name.toLowerCase(), players_banned ) != -1 ) {
								var pos = in_Array( playerlist[i].name.toLowerCase(), players_banned );
								//qz_instance.SendGameCommand( "opsay " + playerlist[i].name.toLowerCase() + " is banned. Reason: " + players_banned[pos].reason + ";" );
								console.log( "pos: " + pos + " " + " name: " + playerlist[i].name.toLowerCase() + " id " + playerlist[i].id + " reason: " + players_banned[pos].reason );
								//setTimeout( function() { qz_instance.SendGameCommand( "kickban " + playerlist[i].id + ";" ); }, 1000 );
							}
						}
					}
					function loopy() {
						console.log( Math.round( new Date().getTime() / 1000 ) + " doing auto players" );
						qz_instance.SendGameCommand( "echo doing auto /players;" );
						qz_instance.SendGameCommand( "players;" );
						qz_instance.SendGameCommand( "echo SLERVER_ID _" + quakelive.currentServerId + "_;" );
					}
					function startloopy() {
						setInterval( function() {
							loopy();
						}, 20000 );
					}
					function delaysay( msg, ms ) {
						setTimeout( function() {
							qz_instance.SendGameCommand( "say " + msg + ";" );
						}, (ms + 500) );
					}
					var socket = io.connect( 'http://localhost:8181', { 'reconnect': true, 'reconnection delay': 500, 'max reconnection attempts': 100 } );
					if( !socket ) {
						console.log( "YOLOOOOOOOOOOOOO" );
						return;
					}
					var players;
					var players_time;
					var timer = null;
					startloopy();
					socket.on( 'connected', function( data ) {
						socket.emit( 'hello', { type: 'ql', passwd: passy } );
						qz_instance.SendGameCommand( "echo Connected from ql-cstream;" );
						qz_instance.SendGameCommand( "print Connected from ql-cstream;" );
						console.log( "Connected to ql-cstream!" );
						$( '#ql-cstream-input' ).val( 'connected' );
						$( '#ql-cstream-div2' ).html( 'connected!' );
						$( '#ql-cstream-div' ).css('background-color', 'green');
						$( '#ql-cstream-div2-ing' ).html( 'connected!' );
						$( '#ql-cstream-div-ing' ).css('background-color', 'green');
					} );
					socket.on( 'msg', function( data ) {
						qz_instance.SendGameCommand( data.msg );
					} );
					socket.on( 'consolestream', function( data ) {
						// console command
						console.log( data );
						$('#ql-cstream-counter').html( parseInt( $('#ql-cstream-counter').html() ) + 1 );
						$('#ql-cstream-counter-ing').html( parseInt( $('#ql-cstream-counter-ing').html() ) + 1 );
						if( data.type == "SendGameCommand" ) {
							qz_instance.SendGameCommand( data.cmd + ";" );
							qz_instance.SendGameCommand( "echo GAME CMD: " + data.cmd + ";" );
						}
						// all
						if( data.type == "all" ) {
						}
						// conn
						else if( data.type == "conn" ) {
							/*
								 setTimeout( function() {
								 qz_instance.SendGameCommand( "players;" );
								 qz_instance.SendGameCommand( "print doing /players;" );
								 qz_instance.SendGameCommand( "echo doing /players;" );
								 qz_instance.SendGameCommand( "echo SLERVER_ID _" + quakelive.currentServerId + "_;" );
								 }, 15000 );
							// do one more
							setTimeout( function() {
							qz_instance.SendGameCommand( "players;" );
							qz_instance.SendGameCommand( "print doing /players;" );
							qz_instance.SendGameCommand( "echo doing /players;" );
							qz_instance.SendGameCommand( "echo SLERVER_ID _" + quakelive.currentServerId + "_;" );
							}, 20000 );
							*/
						}
					// players
						else if( data.type == "players" ) {
							if( data.players != undefined ) {
								players = data.players;
								players_time = data.time;
								looplayers( players );
							}
						}
						// chat
						else if( data.type == "chat" ) {
							//console.log( "TYPE CHAT" );
							// only if im in spec aka idling
							if( quakelive.cvars.GetIntegerValue( "cg_spectating" ) == 1 ) {
								// if chatter is in clan ilR- or >R>, or is OPAZOR the asshole
								if( data.chat.author.clan.toLowerCase() == ">r>" ||
										data.chat.author.nick.toLowerCase() == "opazor" ||
										data.chat.author.nick.toLowerCase() == "rul3x" ||
										data.chat.author.nick.toLowerCase() == "rulex" ||
										data.chat.author.clan.toLowerCase() == "ilr-"
									) {
									//
									if( data.chat.msg == "!yes" ) {
										qz_instance.SendGameCommand( "vote yes;" );
									}
									else if( data.chat.msg == "!no" ) {
										qz_instance.SendGameCommand( "vote no;" );
									}
									else if( data.chat.msg == "!allready" ) {
										qz_instance.SendGameCommand( "allready;" );
									}
									// kb, put
									else if( data.chat.msg.match( /^!put ([A-z_0-9_]*) ([arbs])$/ ) ) {
										// nick -> player id..
										//qz_instance.SendGameCommand( "put " + ";" );
									}
								}
							}
							if( data.chat.msg.match( /!h/ ) || data.chat.msg.match( /!help/ ) ) {
								console.log( "Commands: !top !topm !topw !topd !i" );
								qz_instance.SendGameCommand( "say ^7Commands ^4!top !topm !topw !topd !i <nick> !teams" );
							}
							else if( data.chat.msg.match( /^!topm/ ) ) {
								$.ajax( {
									url: apiurl + '?top5_month',
									dataType: 'jsonp',
									success: function( data ) {
										var text = '';
										var len = data.result.length;
										console.log( "TOP5 latest 30days" );
										console.log( "#  nick  kills" );
										var out = "";
										var nr = 1;
										for( var i=0;i<len;i++ ) {
											//data[i];
											if( data.result[i].nick != "" ) {
												console.log( i+1 + ". " + data.result[i].nick + " " + data.result[i].kills );
												//delaysay( " ^7" + (i+1) + ". ^5" + data.result[i].nick + "^7 " + data.result[i].kills + ";", 500 * i );
												out = out + "^7[" + nr++ + ".^5" + data.result[i].nick + "^7:" + data.result[i].kills + "]";
											}
										}
										delaysay( out );
										//console.log(  );
									}
								} );
							}
							else if( data.chat.msg.match( /^!topw/ ) ) {
								$.ajax( {
									url: apiurl + '?top5_week',
									dataType: 'jsonp',
									success: function( data ) {
										var text = '';
										var len = data.result.length;
										console.log( "TOP5 last 7days" );
										console.log( "#  nick  kills" );
										var out = "";
										var nr = 1;
										for( var i=0;i<len;i++ ) {
											//data[i];
											if( data.result[i].nick != "" ) {
												console.log( i+1 + ". " + data.result[i].nick + " " + data.result[i].kills );
												//delaysay( " ^7" + (i+1) + ". ^5" + data.result[i].nick + "^7 " + data.result[i].kills + ";", 500 * i );
												out = out + "^7[" + nr++ + ".^5" + data.result[i].nick + "^7:" + data.result[i].kills + "]";
											}
										}
										delaysay( out );
										//console.log(  );
									}
								} );
							}
							else if( data.chat.msg.match( /^!topd/ ) ) {
								$.ajax( {
									url: apiurl + '?top5_day',
									dataType: 'jsonp',
									success: function( data ) {
										var text = '';
										var len = data.result.length;
										console.log( "TOP5 last 24h" );
										console.log( "#  nick  kills" );
										var out = "";
										var nr = 1;
										for( var i=0;i<len;i++ ) {
											//data[i];
											if( data.result[i].nick != "" ) {
												console.log( i+1 + ". " + data.result[i].nick + " " + data.result[i].kills );
												//delaysay( " ^7" + (i+1) + ". ^5" + data.result[i].nick + "^7 " + data.result[i].kills + ";", 500 * i );
												out = out + "^7[" + nr++ + ".^5" + data.result[i].nick + "^7:" + data.result[i].kills + "]";
											}
										}
										delaysay( out );
										//console.log(  );
									}
								} );
							}
							else if( data.chat.msg.match( /^!top/ ) ) {
								$.ajax( {
									url: apiurl + '?top5_alltime',
									dataType: 'jsonp',
									success: function( data ) {
										var text = '';
										var len = data.result.length;
										console.log( "TOP5 All time" );
										console.log( "#  nick  kills" );
										var out = "";
										var nr = 1;
										for( var i=0;i<len;i++ ) {
											//data[i];
											if( data.result[i].nick != "" ) {
												console.log( i+1 + ". " + data.result[i].nick + " " + data.result[i].kills );
												//delaysay( " ^7" + (i+1) + ". ^5" + data.result[i].nick + "^7 " + data.result[i].kills + ";", 500 * i );
												out = out + "^7[" + nr++ + ".^5" + data.result[i].nick + "^7:" + data.result[i].kills + "]";
											}
										}
										delaysay( out );
										//console.log(  );
									}
								} );
							}
							else if( data.chat.msg.match( /^!teams/ ) ) {
								console.log( "!teams" );
								quakelive.serverManager.RefreshServerDetails( quakelive.currentServerId, {
									cacheTime: -1,
									onSuccess: function() {
										//console.log( data );
										var server = quakelive.serverManager.GetServerInfo( quakelive.currentServerId );
										//console.log( data[0].players );
										var red, blue, spec, all, playing, playing2, rsum, bsum, team;
										all = new Array();
										playing = new Array();
										playing2 = new Array();
										spec = new Array();
										red = new Array();
										blue = new Array();
										rsum = 0;
										bsum = 0;
										for( var i in server.players ) {
											var P = server.players;
											all.push( P[i].name );
											if( P[i].team == 1 || P[i].team == 2 ) {
												team = P[i].team;
												nick = P[i].name;
												playing.push( P[i].name );
												playing2[nick] = team;
											}
											if( P[i].team == 1 ) {
												red.push( P[i].name );
												//console.log( " " + P[i].name + " " );
											}
											if( P[i].team == 2 ) {
												blue.push( P[i].name );
												//console.log( " " + P[i].name + " " );
											}
											if( P[i].team == 3 ) {
												spec.push( P[i].name );
												//console.log( " " + P[i].name + " " );
											}
										}
										console.log( "getting apiurl... " );
										//console.log( playing );
										$.ajax( {
											url: apiurl + 'qlranks/?nick=' + playing.join( '+' ),
											dataType: 'jsonp',
											success: function( data ) {
												console.log( data );
												//console.log( playing2 );
												for( var i in data.players ) {
													var P = data.players;
													console.log( P[i].nick + " " + P[i].ca.elo );
													if( red.indexOf( P[i].nick ) != -1 ) {
														rsum = rsum + P[i].ca.elo;
													}
													if( blue.indexOf( P[i].nick ) != -1 ) {
														bsum = bsum + P[i].ca.elo;
													}
												}
												//console.log( "rsum: " + rsum + " bsum: " + bsum );
												//console.log( red.join() + " -- " + blue.join() );
												//console.log( red.length + " " + blue.length );
												//console.log( "red: " + red.length + "players " + Math.round( (rsum / red.length) ) + "elo, blue: " + blue.length + "players " + Math.round( (bsum / blue.length) ) + "elo" );
												var out = "";
												//delaysay( "Current Teams: ", 0 );
												if( red.length == 0 ) {}
												rsum = Math.round( rsum/red.length );
												bsum = Math.round( bsum/blue.length );
												console.log( rsum );
												console.log( bsum );
												delaysay( "^1[RED^1:^5" + red.length + "^1players ^6" + rsum + "^1avg.ELO ^2"+ Math.round( Math.sqrt(rsum,2)*10 )/10 +"^1std.^1]^3 "+ (rsum-bsum) +" ^4[BLUE^4:^5" + blue.length + "^4players ^6" + bsum + "^4avg.ELO ^2"+ Math.round( Math.sqrt(bsum,2)*10 )/10 +"^4std.^4];", 50 );
												console.log( data.players );
												data.players.sort( function( a, b ) {
													return ( a.ca.elo - b.ca.elo );
												} );
												console.log( data.players );
												for( var i in data.players ) {
													var P = data.players;
													console.log( P[i].nick + " " + P[i].ca.elo );
												}
												//delaysay( "Ideal ELO Teams: ;", 100 );
												var bb = new Array();
												var be = 0;
												var rr = new Array();
												var re = 0;
												for( var i in data.players ) {
													var P = data.players;
													if( ( i % 2 ) === 0 ) {
														rr.push( P[i].nick );
														re = re + P[i].ca.elo;
													}
													else {
														bb.push( P[i].nick );
														be = be + P[i].ca.elo;
													}
												}
												re = Math.round( re / red.length );
												be = Math.round( be / blue.length );
												//delaysay( "^7Ideal teams: ^1" + rr.join("^7,^1") + " ^6" + re +"^7avg.ELO ^2"+ Math.round( Math.sqrt(re)*10 )/10 +"^7std. ^4" + bb.join("^7,^4") + " ^6" + be +"^7avg.ELO ^2"+ Math.round( Math.sqrt(be)*10 )/10 +"^7std.;", 500 );
												//qz_instance.SendGameCommand( out );
											}
										} );
									}
								} );
							}
							else if( data.chat.msg.match( /^!i/ ) ) {
								var nickname;
								if( data.chat.msg.match( /^!i$/ ) ) {
									//console.log( "only !i" );
									nickname = data.chat.author.nick.toLowerCase();
								}
								else {
									//console.log( "moar than !i" );
									nickname = data.chat.msg.replace( /^!i ([A-z_0-9]*)/, "$1" );
									//console.log( nickname );
								}
								$.ajax( {
									url: apiurl + '?playerinfo=' + nickname,
									dataType: 'jsonp',
									success: function( data ) {
										if( data.result.first_activity == null ) {
											qz_instance.SendGameCommand( "say Could not find " + nickname );
											console.log( "empty" );
										}
										else {
											console.log( data.result );
											var out = "";
											var rockets = 0;
											var rocketsd = 0;
											var rocketss = 0;
											delaysay( "^7[^5" + data.result.nick + "^7] " + data.result.kills + "k " + data.result.deaths + "d (" + Math.round((data.result.kills/data.result.deaths)*100)/100 + ") " + data.result.chat_rows + "c ", 50 ); 
											for( var i=0;i<data.result.weapon_kills.length;i++ ) {
												if( data.result.weapon_kills[i].type == "RAIL" ) { out = out + "[^2rg^7 " + data.result.weapon_kills[i].count + "]" }
												if( data.result.weapon_kills[i].type == "LG" ) { out = out + "[^5lg^7 " + data.result.weapon_kills[i].count + "]" }
												if( data.result.weapon_kills[i].type == "PLASMA" ) { out = out + "[^6pg^7 " + data.result.weapon_kills[i].count + "]" }
												if( data.result.weapon_kills[i].type == "GAUNTLET" ) { out = out + "[g " + data.result.weapon_kills[i].count + "]" }
												if( data.result.weapon_kills[i].type == "ROCKET" ) { rockets = rockets + data.result.weapon_kills[i].count; rocketsd = data.result.weapon_kills[i].count; }
												if( data.result.weapon_kills[i].type == "ROCKET SPLASH" ) { rockets = rockets + data.result.weapon_kills[i].count; rocketss = data.result.weapon_kills[i].count; }
											}
											out = out + "[^1rl^7 " + rockets + "(" + Math.round( (rocketsd / rocketss)*100 ) / 100 + ")" + "]";
											delaysay( " ^7[^5" + data.result.nick + "^7] wep.kills. " + out + ";", 500 * i );
											delaysay( " ^7[^5" + data.result.nick + "^7] Most killed: " + data.result.top10_victims[0].victim + " " + data.result.top10_victims[0].kills + ", " + data.result.top10_victims[1].victim + " " + data.result.top10_victims[1].kills + " deadby: " + data.result.top10_killers[0].killer + " " + data.result.top10_killers[0].kills + ", " + data.result.top10_killers[1].killer + " " + data.result.top10_killers[1].kills + ";", 1000 * i );
										}
									}
								} );
							}
						}
						//console.log( data );
					} );
					socket.on( 'disconnect', function( data ) {
						qz_instance.SendGameCommand( "echo disconnected from ql-cstream;" );
						qz_instance.SendGameCommand( "print disconnected from ql-cstream;" );
						console.log( "disconnected from ql-cstream;" );
						$('#ql-cstream-input').val('disconnected');
						$('#ql-cstream-div2').html('Disconnected');
						$( '#ql-cstream-div' ).css('background-color', 'red');
						$('#ql-cstream-div2-ing').html('Disconnected');
						$( '#ql-cstream-div-ing' ).css('background-color', 'red');
					} );
				} );
			} );
		}
	}, true );
})();



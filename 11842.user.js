// ==UserScript==
// @name               dAway System
// @namespace      http://djordjeungar.com/js/dAway/
// @description    Lets you define your own custom away message for every channel
// @include            http://chat.deviantart.com*
// @creator            http://artbit.deviantart.com
// ==/UserScript==
function script_wrapper() {
	// start script source
	var SCRIPT_NAME = "dAway System";
	var SCRIPT_VERSION = "0.5";

	function initDawaySystem() {
		//Catch and rewire(tm) dAmn functions
		var DJO_HELP_WIN_STR = '<div style="background:#88938D; color:#DAE4DA; padding: 4px; margin: 4px; font-size:1.1em;"><a href="http://www.deviantart.com/deviation/54702221/" style="color:inherit !important;"><b>' + SCRIPT_NAME + '</b> v' + SCRIPT_VERSION + '</a> by <a title="Visit ArtBIT\'s page" href="http://artbit.deviantart.com" style="color:inherit !important;">ArtBIT</a></span></div>' + '<div style="padding:10px;">'

		+ '<br /><u><b>Here is the list of commands: </b></u><br />' + '<table style="padding:5px;"><thead></thead>' + '<tr><td><b>/awayhelp</b></td><td> - This screen</td></tr>' + '<tr><td><b>/awayall</b></td><td> - Sets the away message for all channels the user is in (similar to dAx\'/setaway),</td></tr>' + '<tr><td><b>/awayhere</b></td><td> - Sets the away message for the current channel (ONLY).</td></tr>' + '<tr><td><b>/awaysummary</b></td><td> - Displays a detailed view of all the channels in which you\'re away.</td></tr>' + '<tr><td><b>/backall</b></td><td> - Clears the away message for all the channels the user is in (similar to dAx\' /setback),</td></tr>' + '<tr><td><b>/backhere</b></td><td> - Clears the away message for the current channel (ONLY).</td></tr>' + '</tbody></table>'

		+ '<br /><u><b>Here is the list of macros that can be used anywhere in your away messages: </b></u><br />' + '<table style="padding:5px;"><thead></thead>' + '<tr><td><b>%ME%</b></td><td> - your username. (similar to /me)</td></tr>' + '<tr><td><b>%TO%</b></td><td> - the username of a person who triggered the away message.</td></tr>' + '<tr><td><b>%CHANNEL%</b></td><td> - the name of the channel in which the trigger occured (i.e. #flashers).</td></tr>' + '<tr><td><b>%NO_MSGS%</b></td><td> - the number of messages (the number of times someone tried to contact you) since you started being away.</td></tr>' + '<tr><td><b>%AWAY_TIME%</b></td><td> - this is the time when you started being away (i.e. 17:08)</td></tr>' + '<tr><td><b>%AWAY_DURATION%</b></td><td> - this is the duration since you started being away (i.e. 45mins)</td></tr>' + '<tr><td><b>%RANDOMXX-YY%</b></td><td> - where XX and YY are numerical values, generates a random number betwen XX and YY.</td></tr>' + '</tbody></table>'

		+ '<br /><u><b>Example usage:</b></u><br /><br />' + '<div style="color:#555555;">' + '&nbsp;&nbsp;<span class="colblk">/awayall</span> I\'m sorry <span class="colblk">%TO%</span>, but <span class="colblk">%ME%</span> is not in the <span class="colblk">%CHANNEL%</span>. Reason: Busy.<br />' + '&nbsp;&nbsp;<i>result: I\'m sorry <span class="colblk">Someone123</span>, but <span class="colblk">ArtBIT</span> is not in the <span class="colblk">#Flashers</span>. Reason: Busy.</i><br /><br />' + '&nbsp;&nbsp;<span class="colblk">/awayall</span> <span class="colblk">%TO%</span>: I\'m sorry, but I\'m away atm. I\'ve been away since <span class="colblk">%AWAY_TIME%</span>h and I\'ll be back in <span class="colblk">%RANDOM2-5%</span>h.<br />' + '&nbsp;&nbsp;<i>result: <span class="colblk">Someone123</span>: I\'m sorry, but I\'m away atm. I\'ve been away since <span class="colblk">17:53</span>h and I\'ll be back in <span class="colblk">3</span>h.</i><br />' + '</div>'

		+ '<br /><u><b>Notes: </b></u><br />' + '<table style="padding:5px;"><thead></thead>' + '<tr><td>If you use the /awayall and /awayhere commands with no parameters, the default message will be used ("Sorry %TO%, but %ME% is away right now.")</td></tr>' + '<tr><td>If you use /awayall <b>+</b>some_message or /awayhere <b>+</b>some_message, then some_message will be applied to the end of default message as a reason ("Sorry %TO%, but %ME% is away right now. Reason: <b>some_message</b>")</td></tr>' + '</tbody></table>'

		+ '</div>';
		var trigger_time_out = 10000;
		showInfoWin = function(title, content) {
			//alert(content);
			var page = '<html>\n<head>\n\t<title>' + title + '</title>\n' + '<style type="text/css">\n' + '.colblk     {color:#000000;}\n' + '.winheader {background:#88938D; color:#DAE4DA; padding: 4px; margin: 4px; font-size:1.1em;}\n' + '.rowlight  {background-color:#C3C9C3;}\n' + '.rownorm   {background-color:#CDD2CD;}\n' + '.timestamp {color:#88938d; fontWeight:bold; fontSize:0.8em; fontStyle:normal;margin:0 5px;}\n' + 'a {color: inherit !important}\n' + 'input.button { border:1px solid; padding:0 .1em; cursor:pointer; border-radius:.4em;     -moz-border-radius:.4em    }\n' + 'input.button:hover{ background:#dddddd; } \n' + '.minimized { display:none; visibility:hidden;} \n' + '.maximized { display:block ; visibility:inherit; }\n' + '</style>\n'

			+ '<script type="text/javascript">\n' + 'toggleElementVisibility = function(elem_id) { \n' + 'var e = document.getElementById(elem_id); \n' + 'if(!e) return 0; \n' + 'var b=e.parentNode.firstChild; \n' + 'if(e.className=="minimized") {\n' + '      e.className="maximized" \n' + '    b.value="hide" \n' + '  } else {\n' + '      e.className="minimized" \n' + '    b.value="show" \n' + '  }' + '}' + '</script>\n'

			+ '</head><body style="background-color:#D2D8D2; width:100%; margin:0px auto;">' + content + '</body></html>';
			var newWindow = window.open('.', '_blank');
			newWindow.document.open();
			newWindow.document.write(page);
			newWindow.document.close();
			//newWindow.callerWindow = this.unsafeWindow;
			newWindow.focus();
		}
		//A tweak of the dAmnChanMainChat.prototype.onUserInfo( user, body ) function something like siebenzehn's (http://siebenzehn.deviantart.com/) makeResultBox from dAx
		showInfoBox = function(channel, body) {
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
		}
		randRange = function(min, max) {
			return (Math.floor(Math.random() * (max - min + 1)) + min);
		}
		parseSpecialWords = function(channel, from) {
			var msg = String(channel.away_msg);
			//alert(msg);
			msg = msg.replace(/%TO%/g, from);
			msg = msg.replace(/%ME%/g, dAmn_Client_Username);
			msg = msg.replace(/%AWAY_TIME%/g, channel.away_time);
			msg = msg.replace(/%CHANNEL%/g, dAmn_formatNS(channel.cr.ns));
			msg = msg.replace(/%NO_MSGS%/g, channel.no_missed_msgs);

			var now = new Date().getTime();
			var duration = now - channel.away_time_ms;
			msg = msg.replace(/%AWAY_DURATION%/g, milisecondsToString(duration));
			var re = new RegExp("%RANDOM(\\d+)-(\\d+)%", "g");
			var randomSet = msg.match(re);
			if (randomSet != null) {

				for (var i = 0; i < randomSet.length; i++) {
					re = new RegExp("%RANDOM(\\d+)-(\\d+)%", "g");
					var range = re.exec(randomSet[i]);
					var min = Number(range[1]);
					var max = Number(range[2]);
					var randValue = String(randRange(min, max));
					if (null != range) msg = msg.replace(/%RANDOM\d+-\d+%/, randValue);
				}
			}
			return msg;
		}
		sSuffix = function(num) {
			return ((num % 10 != 1) || (num % 100 == 11)) ? "s": "";
		}
		milisecondsToString = function(mil) {
			var period = Math.floor(mil / 1000);
			var strPeriod = "";

			if (period > 60) {
				period = Math.floor(period / 60);
				if (period > 60) {
					period = Math.floor(period / 60);
					strPeriod = "over " + period + " hour" + sSuffix(period);
				}
				else {
					strPeriod = "over " + period + " minute" + sSuffix(period);
				}

			}
			else {
				strPeriod = period + " second" + sSuffix(period);
			}
			return strPeriod;
		}

		customAwayAll = function(msg) {
			dAmn_objForEach(dAmnChats, function(chan, name) {
				customAwayHere(chan.channels.main, msg);
			});
		}
		customAwayHere = function(channel, msg) {
			var noAwayChans = [];
			noAwayChans["chat:IdleRPG"] = 1;
			noAwayChans["chat:help"] = 1;
			noAwayChans["chat:devart"] = 1;
			noAwayChans["chat:Trivia"] = 1;
			noAwayChans["debug:conn"] = 1;
			noAwayChans["chat:photographers"] = 1;
			if (msg == "" || msg == undefined) msg = "Sorry %TO%, but %ME% is away right now.";
			if (msg.charAt(0) == '+') msg = "Sorry %TO%, but %ME% is away right now. Reason: " + msg.substring(1);

			if (!noAwayChans[channel.cr.ns]) {
				channel.is_away = true;

				var d = new Date();
				var h = d.getHours();
				var m = d.getMinutes();
				var s = d.getSeconds();
				if (h < 10) h = '0' + h;
				if (m < 10) m = '0' + m;
				if (s < 10) s = '0' + s;
				channel.away_time_ms = d.getTime();
				channel.away_time = h + ':' + m + ':' + s;
				channel.away_msg = msg;
				channel.missed_messages = [];
				channel.silent_away = false;
				channel.no_missed_msgs = 0;
				var parsed_msg = parseSpecialWords(channel, 'all');
				channel.cr.Send('action', 'main', ' is now away: ' + parsed_msg);
			}

		}
		deleteAllMessages = function(channel) {
			alert("Deleting all messages for channel: " + channel);
			channel.missed_messages = [];
			channel.no_missed_msgs = 0;
		}
		timestamp = function() {
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			if (h < 10) h = '0' + h;
			if (m < 10) m = '0' + m;
			if (s < 10) s = '0' + s;

			return (h + ':' + m + ':' + s);
		}
		onAway = function(channel, from, body) {
			//alert(from);
			if (channel.silent_away) return;
			window.clearTimeout(channel.away_timeout);
			channel.silent_away = true;
			channel.away_timeout = window.setTimeout((function() {
				channel.silent_away = false;
			}), trigger_time_out);
			if (from == dAmn_Client_Username) return;
			var noAwayChans = [];
			noAwayChans["chat:IdleRPG"] = 1;
			noAwayChans["chat:help"] = 1;
			noAwayChans["chat:devart"] = 1;
			noAwayChans["chat:Trivia"] = 1;
			noAwayChans["debug:conn"] = 1;
			noAwayChans["chat:photographers"] = 1;
			if (!noAwayChans[channel.cr.ns]) {
				var msg = parseSpecialWords(channel, from);
				channel.no_missed_msgs++;

				var missed_msg = '<span class="timestamp">' + timestamp() + ' <b>&lt;<a title="Visit ' + from + '\'s page" href="http://' + from + '.deviantart.com">' + from + '</a>&gt;</b></span> ' + dAmnChanChat.prototype.FormatMsg(body, 'alpha');

				channel.missed_messages.push(missed_msg);
				channel.cr.Send('msg', 'main', msg);
			}
		}
		customBackHere = function(channel) {
			if (channel.is_away) {
				channel.is_away = false;
				channel.cr.Send('action', 'main', ' is now back.');
			}
		}
		userLink = function(da_username) {
			return '<a title="Visit ' + da_username + '\'s page" target="_blank" href="http://' + da_username + '.deviantart.com/">' + da_username + '</a>';
		}
		customBackAll = function() {
			for (var e in dAmnChats)
			//dAmn_objForEach(dAmnChats[e].channels,function(chan,name) {
			dAmn_objForEach(dAmnChats, function(chan, name) {
				customBackHere(chan.channels.main);
			});
		}
		getChannelInfo = function(channel) {
			var m = channel.missed_messages.length;
			if (channel.away_msg == '' && ! m) return '';

			var away_msg = (channel.away_msg == '') ? " is not currently away in this channel ": channel.away_msg;

			var msg = "<table><tbody>";
			msg += "<tr><td> - away since: </td><td> " + channel.away_time + "</td></tr>";
			msg += "<tr><td> - away message: </td><td> " + away_msg + "</td></tr>";
			msg += "<tr><td valign='top'> - " + channel.no_missed_msgs + " personal msg" + sSuffix(channel.no_missed_msgs) + "</td>";

			var i = 0;

			if (m) {
				var channelID = dAmn_formatNS(channel.cr.ns);
				var b = "<input value='show' type='button' class='button' onclick='toggleElementVisibility(\"" + channelID + "\")'/>";
				//var btndel = "<input value='delete all' type='button' class='button' onclick='javascript: alert(opener.document.deleteAllMessages)'/>";
				//msg+="<td>"+b+btndel+"<br />";
				msg += "<td>" + b + "<br />";
				msg += "<div id='" + channelID + "' class='minimized'>";
				while (i < m) {
					msg += channel.missed_messages[i] + "<br />";
					i++;
				}
				msg += "</div></td></tr>";
			} else {
				msg += "<td></td></tr>";
			}

			msg += "</tbody></table>"
			return msg;
		}
		getSummary = function(channel) {
			//{var info ='<span style="font-size:1.1em;">'+userlink(dAmn_Client_Username,&#8803;)+'</span> - is away in the following rooms:<br /><br />'
			var info = '<div class="winheader"><span style="font-size:1.1em;"><b>[' + userLink(dAmn_Client_Username) + ']</b></span> - is away in the following rooms:</div>' + '<table width="100%"><tbody><tr><td align="center">' + '<table style="padding:0px;" width="98%"><thead style="font-size:1.1em;font-weight:bold;"><td style="width:100px;">Channel:</td><td>Info:</td><td></td></thead><tbody>';
			var infoList = '';
			var row_id = 0;

			dAmn_objForEach(dAmnChats, function(chan, name) {
				var chan_info = getChannelInfo(chan.channels.main);
				if (chan_info != '') {
					var imgShoutbox = '';
					var rowClass = 'rowlight';
					if (row_id++ % 2 == 0) rowClass = 'rownorm';
					if (chan.channels.main.no_missed_msgs) imgShoutbox = '<br /><br /><div align="center"><img src="http://e.deviantart.com/emoticons/s/shoutbox.gif" alt="Message" /></div>';
					infoList += '<tr class="' + rowClass + '"><td valign="top"><b>&nbsp;&nbsp;' + name.match(/^chat:(.*)$/)[1] + imgShoutbox + '</b></td><td>' + chan_info + '</td></tr>'

				}
			});
			if (infoList == '') infoList = '<tr><td valign="top">none</td><td>none</td></tr>'
			info += infoList;
			info += '<tr><td colspan="3"><div style="font-size:0.8em; text-align:right; padding-right: 5px;color:#000000 !important;""><a href="http://www.deviantart.com/deviation/54702221/" title="Go to deviation page" ><b>' + SCRIPT_NAME + '</b> v' + SCRIPT_VERSION + '</a> by <a title="Visit ArtBIT\'s page" href="http://artbit.deviantart.com" >ArtBIT</a></div></td></tr>';
			info += '</tbody></table>';

			info += '</td></tr></tbody></table>'
			return info;
		}
		/***************************
      dAmn - REWIRED             
****************************/
		dAmnChanChat.prototype.Init_customAway_rewire = dAmnChanChat.prototype.Init;
		dAmnChanChat.prototype.Init = function(cr, name, parent_el) {
			this.Init_customAway_rewire(cr, name, parent_el);
			this.is_away = false;
			this.away_time_ms = this.away_time = - 1;
			this.away_msg = "";
			this.missed_messages = [];
			this.no_missed_msgs = 0;
			this.away_timeout = - 1;
			this.silent_away = false;
			var cie = this.input;
			cie.cmds['awayhere'] = [0, ''];
			cie.cmds['backhere'] = [0, ''];
			cie.cmds['awayall'] = [0, ''];
			cie.cmds['backall'] = [0, ''];
			cie.cmds['awaysummary'] = [0, ''];
			cie.cmds['awayhelp'] = [0, ''];
		}

		dAmnChanChat.prototype.onMsg_customAway_rewire = dAmnChanChat.prototype.onMsg;
		dAmnChanChat.prototype.onMsg = function(from, body) {
			//alert(from);
			if ( - 1 != body.search(RegExp("([^A-Za-z0-9]+|^)" + dAmn_Client_Username, "im")))
			//and it has awaystats word in the message, and the user is away
			if (0 == body.search(RegExp("(awaysummary)", "im")) && this.is_away) {
				showAwaySummary(this);
			}
			else {
				if (this.is_away) {
					onAway(this, from, body);
				}
			}
			this.onMsg_customAway_rewire(from, body);
		}

		dAmnChatInput_onKey_customAway_rewire = dAmnChatInput_onKey;
		dAmnChatInput_onKey = function(e, kc, force) {
			var el = this.chatinput_el;
            var didsmth = false;
			if (kc == 13 && (force || ! this.multiline || e.shiftKey || e.ctrlKey)) {
				var input = el.value;
				var rex = /^\/(\S*)\s*(.*)$/i.exec(input);
				if (rex) {
					var cmd = rex[1];
					var param = rex.slice(2).join(' ');
					var show_help = false;
					if (cmd) {
						switch (cmd) {
						case 'awayhere':
							didsmth = true;
							show_help = (param == '?');
							if (!show_help) customAwayHere(this.channel, param);
							break;
						case 'backhere':
							didsmth = true;
							show_help = (param == '?');
							if (!show_help) customBackHere(this.channel);
							break;
						case 'awayall':
							didsmth = true;
							show_help = (param == '?');
							if (!show_help) customAwayAll(param);
							break;
						case 'backall':
							didsmth = true;
							show_help = (param == '?');
							if (!show_help) customBackAll();
							break;
						case 'awaysummary':
							didsmth = true;
							show_help = (param == '?');
							//alert(getSummary(this.channel));
							if (!show_help) showInfoWin("dAmn awayMessages by ArtBIT - summary for " + dAmn_Client_Username, getSummary(this.channel));
							break;
						case 'awayhelp':
							didsmth = true;
							show_help = (param == '?');
							showInfoWin("dAmn awayMessages by ArtBIT - HELP", DJO_HELP_WIN_STR);
							//showInfoBox(this.channel,DJO_HELP_WIN_STR);                     
							break;
						} //end case
						if (didsmth) {
							//if(show_help) showInfoBox(this.channel,'Type <b>/awayhelp</b> for more info.<br />');
							if (el.value) {
								//add to history array
								if (this.history_pos != - 1 && this.history[this.history_pos] == el.value) { // posting from history.. move to the end
									var before = this.history.slice(0, this.history_pos);
									var after = this.history.slice(this.history_pos + 1);
									this.history = before.concat(after).concat(this.history[this.history_pos]);
								}
								else {
									// add to history -- limit to 300
									this.history = this.history.concat(el.value);
									if (this.history.length > 300) this.history = this.history.slice(1);
								}
								this.history_pos = - 1;
								el.value = '';
								el.focus();
							}
						}
					}
				}
			}
			if (!didsmth) return this.onKey_customAway_rewire(e, kc, force) ? true: false;
			else return false;
		}
		dAmnChatInput.prototype.onKey = dAmnChatInput_onKey;
		dAmnChatInput.prototype.onKey_customAway_rewire = dAmnChatInput_onKey_customAway_rewire;
	}
	var tries = 0;
	var maxTries = 100;
	function tryInit() {
		//alert(unsafeWindow.dAmnChanChat.prototype);
		if (dAmnChanChat && dAmnChanChat.prototype) {
			initDawaySystem();
		} else {
			if (tries++ < maxTries) setTimeout(tryInit, 100);
		}
	}
	tryInit();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + script_wrapper + ')();'));
document.body.appendChild(script);

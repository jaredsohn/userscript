// ==UserScript==
// @name             Kongregate One
// @namespace        profusiongames.com
// @author           UnknownGuardian
// @version          0.61
// @date             04/19/2013
// @include          http://www.kongregate.com/games/*/*
// @include          http://www.kongregate.com/accounts/*
// @description      Kongregate One - One script to rule them all. Everything here.
// ==/UserScript==





// Written by UnknownGuardian (http://www.kongregate.com/accounts/UnknownGuardian) 2012 - 2013
// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 2009 - 2013
// Licensed under MIT/X11 license
// Copyright (c) Ventero, UnknownGuardian
// http://www.opensource.org/licenses/mit-license.php
// All terms, licenses, credits, etc from scripts used here (documented in comments) apply




// This portion of attribution only applies to code written or modified based on MrSpontaneous' implementation
// Written by MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous) 01/03/2010




//This portion of attribution only applies to code written or modified based on skyboy's implementation.
	/**
	 *
	 * Assorted Userscripts by skyboy.
	 * Visit http://github.com/skyboy for documentation, updates
	 * and more free code.
	 *
	 *
	 * Copyright (c) 2010, skyboy
	 *    All rights reserved.
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software with
	 * restriction, with limitation the rights to use, copy, modify,
	 * merge, publish, distribute, sublicense copies of the Software,
	 * and to permit persons to whom the Software is furnished to do so,
	 * subject to the following conditions and limitations:
	 *
	 * ^ Attribution will be given to:
	 *  	skyboy, http://www.kongregate.com/accounts/skyboy;
	 *  	http://github.com/skyboy; http://skybov.deviantart.com
	 *
	 * ^ Redistributions of source code must retain the above copyright notice,
	 * this list of conditions and the following disclaimer in all copies or
	 * substantial portions of the Software.
	 *
	 * ^ Redistributions of modified source code must be marked as such, with
	 * the modifications marked and ducumented and the modifer's name clearly
	 * listed as having modified the source code.
	 *
	 * ^ Redistributions of source code may not add to, subtract from, or in
	 * any other way modify the above copyright notice, this list of conditions,
	 * or the following disclaimer for any reason.
	 *
	 * ^ Redistributions in binary form must reproduce the above copyright
	 * notice, this list of conditions and the following disclaimer in the
	 * documentation and/or other materials provided with the distribution.
	 *
	 * THE SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
	 * IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
	 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
	 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
	 * OR COPYRIGHT HOLDERS OR CONTRIBUTORS  BE LIABLE FOR ANY CLAIM, DIRECT,
	 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * OR OTHER LIABILITY,(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
	 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
	 * WHETHER AN ACTION OF IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 * NEGLIGENCE OR OTHERWISE) ARISING FROM, OUT OF, IN CONNECTION OR
	 * IN ANY OTHER WAY OUT OF THE USE OF OR OTHER DEALINGS WITH THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */






function main()
{
	console.log("KongOne Script running.");
	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
	dom.oneScriptVersion = "1.101";



	init();
	function init()
	{
		if(typeof GM_setValue === 'undefined'){
			window.GM_setValue = function(a,b){localStorage.setItem(a,b)}
			window.GM_getValue = function(a,b){var r=localStorage.getItem(a);return (r==null?b:r)}
			window.GM_deleteValue = function(a){localStorage.removeItem(a)}
		}

		var url = dom.location.href;
		url = url.substr(url.indexOf(".com/") + ".com/".length);

		if(url.indexOf("/") != -1)
			oneDirectory = url.substring(0,url.indexOf("/"));
		else
			oneDirectory = url;

		oneDirectory = oneDirectory.split("?")[0];

		dom.holodeckCheckCounter = 0
		dom.holodeckInterval = dom.setInterval(checkIfHolodeckLoaded, 100)
		dom.oneScriptsInitialize = [];
		
		useScript("this", "accounts", init_showScriptOptions, false, true);
		useScript("Chat Timestamp", "games", init_chatTimestamp, true, true);
		useScript("Chat PM Notifier", "games", init_PMNotifier, true, true);
		useScript("Chat Line Highlighting", "games", init_chatLineHighlighting, true, true);
		useScript("Chat Reply-command", "games", init_replyCommand, true, true);
		useScript("Chat Username-completion", "games", init_usernameCompletion, true, true);
		//useScript("Chat Mouseover Timestamp", "games", init_chatMouseoverTimestamp, true, true);
		useScript("Chat Character-limit", "games", init_chatCharacterLimit, true, true);
		useScript("Chat KongreLink", "games", init_kongreLink, true, true);
		useScript("Chat Resizer", "games", init_chatResizer, true, false);


		addScripts(false);
	}

	function useScript(name, page, callback, requiresHolodeck, defaultEnabled)
	{
		dom.oneScriptsInitialize.push({name:name, page:page, callback:callback, requiresHolodeck:requiresHolodeck, added:false, defaultEnabled:defaultEnabled});
	}
	
	function checkIfHolodeckLoaded()
	{
		holodeckCheckCounter++;
		console.log("[KongOne] Checking if holodeck loaded");
		if(typeof holodeck === 'undefined')
		{

		}
		else if(holodeck.ready)
		{
			dom.clearInterval(dom.holodeckInterval);
			console.log("[KongOne] Holodeck loaded");
			addScripts(true);
		}

		if(holodeckCheckCounter > 40)
		{
			dom.clearInterval(dom.holodeckInterval);
			console.log("[KongOne] Holodeck failed to load");
		}
	}

	function addScripts(onlyHolodeckRequired)
	{
		console.log("[KongOne] Adding Scripts with holodeckRequired = " + onlyHolodeckRequired);
		dom.oneScriptsInitialize.each(function(item)
		{
			if(!item.defaultEnabled && GM_getValue("onescript-" + item.name, "null") == "null")//never been touched before
				GM_setValue("onescript-" + item.name, "false");

			if(item.requiresHolodeck == onlyHolodeckRequired && !item.added)
			{
				if(item.page == oneDirectory && GM_getValue("onescript-" + item.name, "true") == "true")
				{
					console.log("[KongOne] Adding Script: " + item.name);
					item.callback();
					item.added = true;
				}
			}
		})
		console.log("[KongOne] Added Scripts");
	}













	//============
	// This script's UI
	//============

	function init_showScriptOptions()
	{
		console.log("init shot script")
		var div = new Element("div", {"style":"background-color:#FFF;padding: 8px;"}).update("<h2>Scripts</h2>Enable - Script Name<p></p>");
		$("profile_aside").down().insert(div);
		dom.oneScriptsInitialize.each(function(item)
		{
			if(item.name == "this")
				return true; //aka, continue for each loops

			var span = new Element("span", {"style":"margin-top: 5px !important;display: block;"});
			div.insert(span);

			var checkbox = new Element("input", {"type":"checkbox", "id":"onescript-" + item.name, "style":"margin-top:2px;vertical-align:top;margin-right:8px;"});
			var label = new Element("label", {"class":"pls"})
			checkbox.checked = GM_getValue(checkbox.id,item.defaultEnabled?"true":"false") == "true";
			label.update(item.name);



			span.insert(checkbox);
			span.insert(label);
			
			
			checkbox.onchange = toggleScript;
		});
		
	}

	function toggleScript()
	{
		console.log("[KongOne] Toggled script");
		GM_setValue(this.id,this.checked);
	}


















	//============
	// Chat Timestamps
	// http://userscripts.org/scripts/review/55571
	//============

	function init_chatTimestamp()
	{
		var holodeck = dom.holodeck,
			ChatDialogue = dom.ChatDialogue;
		console.log(holodeck, " h", ChatDialogue, " c");
		if(holodeck && ChatDialogue)
		{

			ChatDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

			if(!holodeck.__timestamp){
				holodeck.__timestamp = true;

				holodeck.addChatCommand("timeformat", function(l,n){
						var k = n.match(/^\/\S+\s+(\d+)/),
								m = "",
								q = l.activeDialogue();
						k && (m=k[1]);
						if(m==12 || m==24){
							l._timeFormat = m;
							window.setTimeout(function(){GM_setValue("kong_timeformat", m);}, 0);
							q.displayMessage("Timeformat", "Set to "+m+"-hour clock (hh:mm:ss"+(m==12?" AM/PM)":")"), { "class": "whisper received_whisper"}, {non_user: true});
						} else {
							q.displayMessage("Timeformat", "Allowed values: 12 and 24", { "class": "whisper received_whisper"}, {non_user: true});
						}
						return false;
					});
				
				holodeck.addChatCommand("tscolor", function(l,n){
					var k = n.match(/^\/\S+\s+([0-9a-f]{6})/i),
					z = "";
					k&&(z = "#"+k[1]);
					if (z){
						updateColor(z);
						window.setTimeout(function(){GM_setValue("kong_timestampcolor", z);}, 0);
						l.activeDialogue().displayMessage("Timestamp", "Set font-color to "+z, { "class": "whisper received_whisper"}, {non_user: true});
					} else {
						l.activeDialogue().displayMessage("Timestamp", "No valid color! Format is /hlcolor ###### (# = hex character)", {"class":"whisper received_whisper"}, {non_user: true})
					}
					return false;
				});

				holodeck.addChatCommand("toggleseconds", function(l,n){
					if(l._showSeconds){
						l._showSeconds = 0;
						l.activeDialogue().displayMessage("Timestamp", "Now hiding seconds", { "class": "whisper received_whisper"}, {non_user: true});
					}else{
						l._showSeconds = 1;
						l.activeDialogue().displayMessage("Timestamp", "Now showing seconds", { "class": "whisper received_whisper"}, {non_user: true})
					}
					window.setTimeout(function(){GM_setValue("kong_timeshowseconds", l._showSeconds);}, 0);
					return false;
				});

				var timeformat = 12, fontcolor = "#999999", seconds = 0;
				if(typeof GM_setValue !== "function"){
					GM_getValue = GM_setValue = function(){};
				} else {
					timeformat = GM_getValue("kong_timeformat", 12)||12;
					fontcolor = GM_getValue("kong_timestampcolor", "#999999")||"#999999";
					seconds = GM_getValue("kong_timeshowseconds", 0)||0;
				}
				holodeck._timeFormat = timeformat;
				holodeck._showSeconds = seconds;

				var updateColor = (function(c){
					var style = document.createElement("style");
					style.setAttribute("type", "text/css");
					function _updateColor(color){
						style.innerHTML = "span.inline_timestamp { color: " + color + " !important; }";
					};

					_updateColor(c);
					document.body.appendChild(style);

					return _updateColor;
				})(fontcolor);
				ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#{classNames}"><span style="float: left;" class="inline_timestamp">[#{time}]&nbsp;</span><span username="#{username}" class="username #{userClassNames}">#{prefix}#{username}</span><span class="separator">: </span><span class="message">#{message}</span><span class="clear"></span></p>'
				ChatDialogue.MESSAGE_TEMPLATE.old_evaluate_inline = ChatDialogue.MESSAGE_TEMPLATE.evaluate;
				ChatDialogue.MESSAGE_TEMPLATE.evaluate = function(args){
					var date = new Date();
					var hours = date.getHours();
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					var time;
					if (holodeck._timeFormat == 12){
						time = (hours<10?(hours==0?"12":"0"+hours):(hours>12?(hours>21?hours-12:"0"+(hours-12)):hours))+":"+(minutes<10?"0":"")+minutes+(holodeck._showSeconds?(":"+(seconds<10?"0":"")+seconds):"")+(hours>11?" PM":" AM");
					} else {
						time = (hours<10?"0":"")+hours+":"+(minutes<10?"0":"")+minutes+(holodeck._showSeconds?(":"+(seconds<10?"0":"")+seconds):"");
					}
					args.time = time;
					return this.old_evaluate_inline(args);
				};
			}
		}
	}

	
















	//============
	// Chat Line Highlighting
	// http://userscripts.org/scripts/review/49868
	//============

	function init_chatLineHighlighting()
	{

		var holodeck = dom.holodeck,
				CDialogue = dom.ChatDialogue,
				CRoom = dom.ChatRoom,
				CWindow = dom.ChatWindow;

		if(CRoom && CDialogue){

			CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
			CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;
			CWindow.prototype = dom.CWprototype||dom.ChatWindow.prototype;
			if(!CDialogue.prototype.searchWord){

				if(!String.prototype.trim){
					String.prototype.trim = function(){
						return this.replace(/^\s+/, "").replace(/\s+$/, "");
					}
				}

				CDialogue.prototype.searchWord = function(a, b){
					for (var i=0;i<b.length;i++){
						var r = b[i].replace(/(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g, '\\$1'),
										reg = new RegExp("\\b"+r+"\\b");
						if (reg.test(a)) return true;
					}
					return false;
				};

				CDialogue.prototype.searchUser = function(a){
					return this.searchWord(a, this._holodeck._hluser);
				};

				CDialogue.prototype.searchText = function(a){
					var l = this._holodeck,
					z = l._highlighting.concat([l._username.toLowerCase()]);
					return this.searchWord(a, z);
				}

				CWindow.prototype.hlFriend = function(a){
					return this._holodeck._hl_friends && this.isFriend(a);
				}

				CWindow.prototype.hlMod = function(a){
					if(!this._holodeck._hl_mods) return;

					return this._rooms.any(function(roomArr){
						var room = roomArr[1];
						var user = room.user(a);
						return user && room.canUserModerate(user);
					});
				}

				CWindow.prototype.friendOrMod = function(a){
					if(a.toLowerCase() == this._holodeck._username.toLowerCase()) return "";

					var colors = [];
					if(this.hlMod(a)) colors.push(" hlmod");
					if(this.hlFriend(a)) colors.push(" hlfriend");
					if(colors.length > 1)
						return colors[this._holodeck._hl_priority]


					return (colors[0] || "");
				}

				CDialogue.prototype.displayUnsanitizedMessageOldHighlight = CDialogue.prototype.displayUnsanitizedMessage;

				CDialogue.prototype.displayUnsanitizedMessage = function(user, msg, attributes, options){
					if(!attributes) attributes = {};
					var classes = attributes["class"] || "";
					var isWhisper = (classes.indexOf("whisper") >= 0);

					if(!(options && options["private"]))
						classes += this._user_manager.friendOrMod(user.toLowerCase());

					if(!isWhisper &&
						 !this._user_manager.isMuted(user.toLowerCase()) &&
					   (this.searchUser(user.toLowerCase()) ||
					   this.searchText(msg.toLowerCase()))) {
						classes += " highlight";
						if(typeof this.new_private_message === "function") {
							var oldChime = holodeck._pm_chime;
							holodeck._pm_chime = holodeck._hl_chime;
							this.new_private_message();
							holodeck._pm_chime = oldChime;
						}
					}

					attributes["class"] = classes;

					this.displayUnsanitizedMessageOldHighlight(user, msg, attributes, options);
				}

				holodeck.addChatCommand("highlight", function(l,n){
					var k = n.match(/^\/\S+\s+(.+)/),
					z = "";
					k&&(z = k[1])
					if(z){
						z = z.replace(/\s+/g, ' ').trim();
						window.setTimeout(function(){GM_setValue("kong_highlighting", z.toLowerCase());}, 0);
						l.activeDialogue().kongBotMessage("Now highlighting: "+z+" "+l._username);
						l._highlighting = z.toLowerCase().split(' ');
					}
					return false;
				});

				holodeck.addChatCommand("hluser", function(l,n){
					var k = n.match(/^\/\S+\s+(.+)/),
					z = "";
					k&&(z = k[1])
					if(z){
						z = z.replace(/\s+/g, ' ').trim();
						window.setTimeout(function(){GM_setValue("kong_highlightuser", z.toLowerCase());}, 0);
						l.activeDialogue().kongBotMessage("Now highlighting user(s): "+z);
						l._hluser = z.toLowerCase().split(' ');
					}
					return false;
				});

				function generateCallback(name, stop, start){
					return function(l, n){
						if(l["_hl_" + name]){
							l["_hl_" + name] = 0;
							l.activeDialogue().kongBotMessage(stop || "Stopped highlighting messages by " + name);
						}else{
							l["_hl_" + name] = 1;
							l.activeDialogue().kongBotMessage(start || "Now highlighting messages by " + name);
						}
						window.setTimeout(function(){GM_setValue("kong_highlight"+name, l["_hl_" + name]);}, 0);
						return false;
					}
				}

				holodeck.addChatCommand("hlmods", generateCallback("mods"));
				holodeck.addChatCommand("hlfriends", generateCallback("friends"));
				holodeck.addChatCommand("hlchime", generateCallback("chime", "Stopped playing the chime for highlighted messages",
				                                                    "Now playing the chime for highlighted messages"));
				holodeck.addChatCommand("hlpriority", generateCallback("priority", "Now prioritizing mods over friends", "Now prioritizing friends over mods"));

				function generateColorCallback(selector, rule, name, text, max){
					if(!max) max = 1;
					return function(l, n){
						var k = n.match(/^\/\S+\s+#?([0-9a-f]{6})/i),
						    z = "",
						    count = 0;
				    if(k) z = "#" + k[1];
				    if(z){
				    	for(var i = 0; i < sheet.cssRules.length; i++){
				    		if(sheet.cssRules[i].selectorText.indexOf(selector) == 0){
				    			sheet.cssRules[i].style.setProperty(rule, z, "important");
				    			if(++count == max){
					    			window.setTimeout(function(){GM_setValue("kong_" + name, z);}, 0);
					    			l.activeDialogue().kongBotMessage("New " + (text||name) + ": " + z);
				    				return false;
				    			}
				    		}
				    	}
				    } else {
							l.activeDialogue().kongBotMessage("No valid color! Format is /" + name + " XXXXXX (X = hex character)");
						}
						return false;
					}
				};

				holodeck.addChatCommand(
					"whispercolor",
					generateColorCallback("#kong_game_ui .chat_message_window .whisper",
					                      "background-color",
					                      "whispercolor")
				)

				holodeck.addChatCommand(
					"friendcolor",
					generateColorCallback("#kong_game_ui .chat_message_window .hlfriend span.chat_message_window_username",
					                      "color",
					                      "friendcolor")
				)
				holodeck.addChatCommand(
					"hlcolor",
					generateColorCallback("#kong_game_ui .chat_message_window .highlight",
					                      "background-color",
					                      "hlcolor",
					                      "highlighting-color",
					                      2)
				)
				holodeck.addChatCommand(
					"modcolor",
					generateColorCallback("#kong_game_ui .chat_message_window .hlmod span.chat_message_window_username",
					                      "color",
					                      "modcolor")
				)

				holodeck.addChatCommand("hllist", function(l, n) {
					var diag = l.activeDialogue();
					function botMessage(msg) {
						diag.displayUnsanitizedMessage("Kong Bot", msg);
					}

					botMessage("Current highlighting settings:");

					if(holodeck._hluser.length > 0) {
						botMessage('Users:');
						botMessage('Users: ' + holodeck._hluser.map(function(user) {
							return ['<a href="#" onclick="holodeck.showMiniProfile(\'', user,
				              '\'); return false;">', user, '</a>'].join("");
						}).join(" "));
					} else {
						botMessage("No users highlighted");
					}

					if(holodeck._highlighting.length > 0) {
						botMessage('Words: ' + holodeck._highlighting.join(" "));
					} else {
						botMessage("No words highlighted");
					}

					botMessage('Highlight color: <span style="color: ' + color + '">' +
					                    color + '</span>');
					botMessage('Whisper color: <span style="color: ' + wcolor + '">' +
					                    wcolor + '</span>');

					botMessage("Highlighting friends: " +
					                    (holodeck._hl_friends ? "Yes" : "No") +
					                    ' (color: <span style="color: ' + fcolor + '">' +
					                    fcolor + '</span>)');
					botMessage("Highlighting mods: " +
					                    (holodeck._hl_mods ? "Yes" : "No") +
					                    ' (color: <span style="color: ' + mcolor + '">' +
					                    mcolor + '</span>)');

					botMessage("Highlight priority: " +
					                    (holodeck._hl_priority ? "Friends over mods" : "Mods over friends"));
					botMessage("Playing chime: " +
					          (holodeck._hl_chime ?
					          	(typeof holodeck._pm_chime !== "undefined" ? "Yes" :
					          	    'No, <a href="http://userscripts.org/scripts/show/65622">script</a> not installed') :
					          	"No"));
					return false;
				});

				holodeck.addChatCommand("hlreset", function(l, n) {
					var diag = l.activeDialogue();
					diag.kongBotMessage("Resetting all highlighting preferences");

					holodeck._chat_commands.hlcolor[0](holodeck, "/color #def6ea");
					holodeck._chat_commands.whispercolor[0](holodeck, "/color #deeaf6");
					holodeck._chat_commands.friendcolor[0](holodeck, "/color #006600");
					holodeck._chat_commands.modcolor[0](holodeck, "/color #ba6328");
					holodeck._hl_priority = 1;
					holodeck._hl_friends = 1;
					holodeck._hl_mods = 1;
					holodeck._hl_chime = 1;
					holodeck._highlighting = [];
					holodeck._hluser = [];

					["highlighting", "highlightuser", "hlcolor", "whispercolor", "friendcolor",
					 "modcolor", "highlightfriends", "highlightpriority", "highlightmods",
					 "highlightchime"].forEach(function(pref) {
						window.setTimeout(function() {
							GM_deleteValue("kong_" + pref);
						}, 0);
					});

					return false;
				});

				holodeck._chat_commands.hl = holodeck._chat_commands.highlight;
				holodeck._chat_commands.hlfriend = holodeck._chat_commands.hlfriends;

				holodeck._highlighting = [];
				holodeck._hluser = [];


				var color = "#def6ea", wcolor = "#deeaf6", fcolor = "#006600", mcolor = "#ba6328", priority = 1, friends = 1, mods = 1, chime = 1;

				if(typeof GM_setValue !== "function"){
					GM_setValue = GM_getValue = function(){};
				} else {
					// migrate old value
					var temp = GM_getValue("kong_highlightcolor", "");
					if(temp){
						GM_setValue("kong_hlcolor", temp);
						if(typeof GM_deleteValue === "undefined"){
							GM_setValue("kong_highlightcolor", "");
						} else {
							GM_deleteValue("kong_highlightcolor");
						}
					}

					var list = GM_getValue("kong_highlighting"),
					    user = GM_getValue("kong_highlightuser");
					color = GM_getValue("kong_hlcolor", "#def6ea")||"#def6ea";
					wcolor = GM_getValue("kong_whispercolor", "#deeaf6")||"#deeaf6";
					fcolor = GM_getValue("kong_friendcolor", "#006600")||"#006600";
					mcolor = GM_getValue("kong_modcolor", "#ba6328")||"#ba6328";
					friends = GM_getValue("kong_highlightfriends", 1);
					priority = GM_getValue("kong_highlightpriority", 1);
					mods = GM_getValue("kong_highlightmods", 1);
					chime = GM_getValue("kong_highlightchime", 1);
					if(list){holodeck._highlighting = list.trim().split(' ')};
					if(user){holodeck._hluser = user.trim().split(' ')}
				}

				holodeck._hl_friends = friends;
				holodeck._hl_mods = mods;
				holodeck._hl_chime = chime;
				holodeck._hl_priority = priority;

				// guarantee we have a non-crossdomain stylesheet
				var style = document.createElement("style");
				var head = document.getElementsByTagName("head")[0];
				(head || document.body).appendChild(style);

				// now find it...
				var sheet = null;
				for(var s = document.styleSheets.length - 1; s >= 0; --s) {
					try{
						if(document.styleSheets[s].cssRules && document.styleSheets[s].cssRules.length) {
							sheet = document.styleSheets[s];
							break;
						}
					}catch(e){ /* no-op */ }
				}

				if(!sheet) {
					alert("Kongregate Chat Line Highlighting could not find a style sheet!\nPlease send a message to Ventero about this problem.");
					return;
				}

				sheet.insertRule('#kong_game_ui .chat_message_window .whisper { background-color: '+wcolor+' !important; }', sheet.cssRules.length);
				sheet.insertRule('#kong_game_ui .chat_message_window .highlight.even { background-color: '+color+' !important; }', sheet.cssRules.length);
				sheet.insertRule('#kong_game_ui .chat_message_window .highlight { background-color: '+color+' !important; }', sheet.cssRules.length);
				sheet.insertRule('#kong_game_ui .chat_message_window .hlfriend span.chat_message_window_username { color: '+fcolor+' !important; }', sheet.cssRules.length);
				sheet.insertRule('#kong_game_ui .chat_message_window .hlmod span.chat_message_window_username { color: '+mcolor+' !important; }', sheet.cssRules.length);
			}
		}
	}















	//============
	// Reply-Command
	// http://userscripts.org/scripts/review/47963
	//============
	function init_replyCommand()
	{

		var CDialogue = dom.ChatDialogue;

		if (CDialogue){

			CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
			if(!CDialogue.prototype.oldKeyPressReply){

				CDialogue.prototype.oldKeyPressReply = CDialogue.prototype.onKeyPress;

				if(CDialogue.prototype.reply){
					CDialogue.prototype.oldreply = CDialogue.prototype.reply
				} else {
					CDialogue.prototype.oldreply = function(a){};
				}
				CDialogue.prototype.reply = function(a){
					this._holodeck._reply = a;
					this.oldreply(a);
				}

				if(!CDialogue.prototype.showReceivedPM){
					CDialogue.prototype.showReceivedPM = CDialogue.prototype.receivedPrivateMessage;
					CDialogue.prototype.receivedPrivateMessage = function(a){
						if (a.data.success){
							this.reply(a.data.from)
						}
						this.showReceivedPM(a);
					}
				}

				CDialogue.prototype.onKeyPress = function (a) {
					var z, node = (this._input_node.wrappedJSObject || this._input_node);
					if(a.which == 32 &&
					   ((a.currentTarget.selectionStart == 2 && (z = node.getValue().match(/^\/r(.*)/i))) ||
					   (z = node.getValue().match(/^\/r\b(.*)/i)))){
						var x=z[1]||"";
						if (this._holodeck._reply) {
							this.setInput("/w "+this._holodeck._reply+" "+x);
						} else {
							this.setInput("/w ");
						}
						if(a.stop) a.stop();
						if(a.preventDefault) a.preventDefault();
					};

					this.oldKeyPressReply(a);
				}
			}
		}
	}












	//============
	// Username-Completion
	// http://userscripts.org/scripts/review/49872
	// Thanks to kaedenn for the idea of adding a colon if the username is the first word in the message
	//============
	function init_usernameCompletion()
	{
		if(typeof ChatDialogue === "undefined" ||
		   ChatDialogue.prototype.oldKeyPressTab) return;

		var isChrome = (navigator.appVersion.indexOf("Chrome") >= 0);
		if(isChrome) {
			ChatDialogue.prototype.initialize =
			ChatDialogue.prototype.initialize.wrap(function(old, p, i, h, u){
				old(p, i, h, u);
				var self = this;
				this._input_node.observe("keydown", function(event) {
					if(event.keyCode != 9 || event.ctrlKey || event.altKey || event.metaKey) return;
					self.onKeyPress(event);
				});
			})
		}

		ChatDialogue.prototype.oldKeyPressTab = ChatDialogue.prototype.onKeyPress;
		ChatDialogue.prototype.tabcnt = 0;
		ChatDialogue.prototype.done = 1;
		ChatDialogue.prototype.onKeyPress = function(a){
			if (a.keyCode != 9 || a.ctrlKey){
				this.tabcnt = 0;
				this.done = 1;
				this.oldKeyPressTab(a);
				return;
			}

			var node = (this._input_node.wrappedJSObject || this._input_node);
			if (this.tabcnt == 0 && this.done == 1){
				var inputText = node.getValue(),
				    spaceAtCaret = inputText.substr(0, node.selectionStart).lastIndexOf(' ');
				this._caretPos = node.selectionStart;
				this._start = inputText.substr(0,spaceAtCaret);
				if(this._start) this._start+=" ";

				this._currentWord = inputText.substring(spaceAtCaret+1, this._caretPos);
				this._rest = inputText.substr(this._caretPos);
			}
			this.done = 0;

			var userArray = this._holodeck.chatWindow().activeRoom()._users_list,
			    possibleMatches = [],
			    z = node.getValue();
			if (z.match(/\s+$/)) z=z.replace(/\s+$/, '')

			for (var i=0;i<userArray.length;i++){
				if(userArray[i].username.toLowerCase().indexOf(this._currentWord.toLowerCase())==0){
					possibleMatches.push(userArray[i].username);
				}
			}

			if (this.tabcnt < possibleMatches.length){
				node.setValue(this._start + possibleMatches[this.tabcnt] + (this._start?" ":": ") + this._rest);
				node.selectionStart = this._caretPos + possibleMatches[this.tabcnt].length - this._currentWord.length+(this._start?1:2);
				node.selectionEnd = node.selectionStart;
				this.tabcnt+=1;
			} else {
				node.setValue(this._start + this._currentWord + this._rest);
				node.selectionStart = this._caretPos;
				node.selectionEnd = this._caretPos;
				this.tabcnt = 0
			}
			if(a.stop) a.stop();
			if(a.preventDefault) a.preventDefault();
		}
	}



















	//============
	// Kongregate Chat Mouseover Timestamp
	// http://userscripts.org/scripts/review/50785
	//============
	function init_chatMouseoverTimestamp()
	{

		var holodeck = dom.holodeck,
			ChatDialogue = dom.ChatDialogue;

		function injectMouseover(dom, holodeck, ChatDialogue) {
			var message_rollover_template = new dom.Element("div", {id: "message_rollover_template", "class": "user_rollover_container spritesite", style: "display: none"});
			var message_rollover = new dom.Element("div", {"class": "user_rollover spritesite"});
			var message_rollover_inner = new dom.Element("div", {"class": "user_rollover_inner"});
			var rollover_private_message_holder = new dom.Element("p", {"class": "rollover_message_private_message_link_message_link_holder"});
			var rollover_private_message_link = new dom.Element("a", {id: "rollover_message_private_message_link", "class": "rollover_message_private_message_link", href: "#"}).update("Private Message");
			rollover_private_message_holder.appendChild(rollover_private_message_link);
			var rollover_time_text = new dom.Element("p", {id: "rollover_time_text"});
			message_rollover_inner.appendChild(rollover_time_text);
			message_rollover_inner.appendChild(rollover_private_message_holder);
			message_rollover.appendChild(message_rollover_inner);
			message_rollover_template.appendChild(message_rollover);
			$('chat_tab_pane').appendChild(message_rollover_template);

			var MessageRollover = dom.MessageRollover = function(chat_dialogue) {
				this.initialize(chat_dialogue);
				return this;
			}

			MessageRollover.prototype = {
				initialize: function(chat_dialogue){
					this._active_dialogue = chat_dialogue;
					this._holodeck = chat_dialogue._holodeck;
					this._rollover_template_node = $('message_rollover_template');
					this._private_message_node = $('rollover_message_private_message_link');
					this._time_node = $('rollover_time_text');

					this._private_message_observer = function(){};

					if(this._rollover_template_node){
						var rollover = this;
						this._rollover_template_node.observe('mouseover', function(event){
							rollover.stopHide();
							dom.Event.stop(event);
						});
						this._rollover_template_node.observe('mouseout', function(event){
							rollover.beginHide();
							dom.Event.stop(event);
						});
					}
				},
				show: function(time, user, event){
					if(this._hideTimer) clearTimeout(this._hideTimer);
					this.updatePrivateMessageLink(user);
					this.updateTimeText(time);
					this.setRolloverPosition(event);
					this._rollover_template_node.show();
				},
				setRolloverPosition: function(event) {
					var messagenode = event.target;
					var current_scroll_top = this._active_dialogue._message_window_node.scrollTop;
					var current_message_top = messagenode.positionedOffset()[1];
					// nudge the user rollover up a little
					current_message_top = current_message_top - 9;

					var new_top_val = current_message_top;
					if ( current_scroll_top < current_message_top ) {
						new_top_val = current_message_top - current_scroll_top;
					}

					var top_style_str = new_top_val + 'px';
					this._rollover_template_node.setStyle({ top: top_style_str });

					// set left position based on username length
					var username_width = messagenode.getWidth();
					var new_left_val = 20 + username_width;

					var left_style_str = new_left_val + 'px';
					this._rollover_template_node.setStyle({ left: left_style_str });
				},

				updatePrivateMessageLink: function(username){
					var cw = this._holodeck.chatWindow();
					// replace observer
					this._private_message_node.stopObserving('click');
					this._private_message_observer = dom.CapturesToInlineRegistration.decorate(function(event){
						// just put /w <username> in the chat input field
						cw.insertPrivateMessagePrefixFor(username);
						dom.Event.stop(event);
						return false;
					});
					this._private_message_node.observe('click', this._private_message_observer);
				},
				updateTimeText: function(time){
					this._time_node.innerHTML = time;
				},
				beginHide: function() {
					var rollover = this;
					if(this._hideTimer){ clearTimeout(this._hideTimer); }
					this._hideTimer = setTimeout(function() { rollover.hide(); }, 500);
				},
				stopHide: function() {
					clearTimeout(this._hideTimer);
				},
				hide: function() {
					this._rollover_template_node.hide();
				}
			};

			ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#{classNames}"><span username="#{username}" time="#{time}" class="username #{userClassNames}">#{prefix}#{username}</span><span class="separator">: </span><span class="message">#{message}</span><span class="clear"></span></p>';
			ChatDialogue.MESSAGE_TEMPLATE.old_evaluate = ChatDialogue.MESSAGE_TEMPLATE.evaluate;
			ChatDialogue.MESSAGE_TEMPLATE.evaluate = function(args){
				var date = new Date();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				var time;
				if (holodeck._timeFormat == 12){
					time = (hours<10?(hours==0?"12":"0"+hours):(hours>12?(hours>21?hours-12:"0"+(hours-12)):hours))+":"+(minutes<10?"0":"")+minutes+":"+(seconds<10?"0":"")+seconds+(hours>11?" PM":" AM"); // 12-hour clock
				} else {
					time = (hours<10?"0":"")+hours+":"+(minutes<10?"0":"")+minutes+":"+(seconds<10?"0":"")+seconds; //24-hour clock
				}
				args.time = time;
				return this.old_evaluate(args);
			};

			ChatDialogue.prototype.initialize =
				ChatDialogue.prototype.initialize.wrap(function(old, parent_node, onInputFunction, holodeck, user_manager){
					old(parent_node, onInputFunction, holodeck, user_manager);
					//var self = this;
					//this._input_node.observe("keydown", function(event) {
					//	if(event.keyCode != 9 || event.ctrlKey || event.altKey || event.metaKey) return;
					//	self.onKeyPress(event);
					//});
				//})
			//ChatDialogue.prototype.initialize = function(parent_node, onInputFunction, holodeck, user_manager) {
				this._messages_until_next_collection = 0;
				this._holodeck = holodeck;
				this._user_manager = user_manager;
				this._parent_node = parent_node;
				this._messages_count = 0;
				this._insertion_count = 0;
				this._onInputFunction = onInputFunction;
				this._message_rollover_manager = new MessageRollover(this);

				// Establish references to re-used nodes
				this._message_window_node = parent_node.down('.chat_message_window');
				this._input_node = parent_node.down('.chat_input');

				this._messages_to_retain = 200;

				this._message_window_node.stopObserving();

				this._message_window_node.observe('mouseover', function(event) {
				var time = event.target.getAttribute("time"),
						user = event.target.getAttribute("username");
					if (time){
						holodeck.activeDialogue().showMessageRollover(time, user, event);
						dom.Event.stop(event);
					}
				});

				this._message_window_node.observe('mouseout', function(event) {
					holodeck.activeDialogue().hideMessageRollover();
					dom.Event.stop(event);
				});

				// Bind event listeners
				var dialogue = this,
						input_node = this._input_node;
				this._input_node.observe('keypress', function(event) { dialogue.onKeyPress(event); });
				this._input_node.observe('focus', function(event) { dialogue.clearPrompt(); });

				// Trigger mini-profile for clicks on usernames in chat.
				this._message_window_node.observe('click',
					function(event) {
						if (event.target) {
							var username = event.target.getAttribute('username');
							if(username){
								event.stop();
								user_manager.showProfile(username);
							}
						}
					});
			});

			ChatDialogue.prototype.showMessageRollover = function (time, user, event){
				this._message_rollover_manager.show(time, user, event);
			}

			ChatDialogue.prototype.hideMessageRollover = function(){
				this._message_rollover_manager.beginHide();
			}
		}

		if(holodeck && ChatDialogue){
			if(!ChatDialogue.prototype && dom.CDprototype)
				ChatDialogue.prototype = dom.CDprototype;

			if(!holodeck.__mouseover){
				holodeck.__mouseover = true;

				var script = document.createElement("script");
				script.type = "text/javascript";
				script.textContent = "(" + injectMouseover.toString() + ")(window, $, holodeck, ChatDialogue);";
				document.body.appendChild(script);
				setTimeout(function(){document.body.removeChild(script);}, 100);

				holodeck.addChatCommand("timeformat", function(l,n){
						var k = n.match(/^\/\S+\s+(\d+)/),
								m = "",
								q = l.activeDialogue();
						k && (m=k[1]);
						if(m==12 || m==24){
							l._timeFormat = m;
							window.setTimeout(function(){GM_setValue("kong_timeformat", m);}, 0);
							q.displayMessage("Timeformat", "Set to "+m+"-hour clock (hh:mm:ss"+(m==12?" AM/PM)":")"), { "class": "whisper received_whisper"}, {non_user: true});
						} else {
							q.displayMessage("Timeformat", "Allowed values: 12 and 24", { "class": "whisper received_whisper"}, {non_user: true});
						}
						return false;
					});

				var timeformat = 12;

				if(typeof GM_setValue !== "undefined"){
						timeformat = GM_getValue("kong_timeformat", 12)||12;
				}else{
					GM_setValue = function(){};
				}

				holodeck._timeFormat = timeformat;
			}
		}
	}



















	//============
	// Character-limit
	// http://userscripts.org/scripts/review/48979
	//============
	function init_chatCharacterLimit(){

		var CDialogue = dom.ChatDialogue;

		if(CDialogue){
			CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

			if(!CDialogue.prototype.oldKeyPressLimit){
				CDialogue.prototype.oldKeyPressLimit = CDialogue.prototype.onKeyPress;
				CDialogue.prototype.onKeyPress = function (a) {
					var node = (this._input_node.wrappedJSObject || this._input_node);
					this.oldKeyPressLimit(a);
					if (node.getValue().length > 249) {
						z = node.getValue();
						var y = "";
						if (n=z.match(/^(\/\S+\s+\S*\s*)(.*)/)){
							y=n[2];
							if (y.length>249){
								node.setValue(n[1]+y.substr(0, 249))
							}
						}else{
							node.setValue(node.getValue().substr(0, 249))
						}
					}
				}
			}
		};
	}










	//============
	// KongreLink (skyboy attribution applies)
	// http://userscripts.org/scripts/review/72163
	//============

	function init_kongreLink()
	{
		console.log("initializing the kongrelink js");
		window.location.assign("javascript:void(holodeck.addIncomingMessageFilter(function(m,n){var REGEX=/((?:<\\S[^>]+?)?(?:>)?)?(\\b(?:(?:(ht|f)tp)s?:\\/\\/)?(((?:\\w+[.])?(?:[a-z0-9][a-z0-9\\-]{0,61}[a-z0-9]|[a-z0-9]{1,2})[.])*(a(?:c|d|e(?:ro)?|f|g|i|l|m|n|o|q|r(?:pa)?|s(?:ia)?|t|u|w|x|z)|b(?:a|b|d|e|f|g|h|i|iz|j|l|m|n|o|r|s|t|v|w|y|z)|c(?:at?|c|d|f|g|h|i|k|l|m|n|o(?:m|op)?|r|u|v|x|y|z)|d[ejkmoz]|e(?:c|du|e|g|h|r|s|t|u)|f[ijkmor]|g(?:a|b|d|e|f|g|h|i|l|m|n|ov|p|q|r|s|t|u|w|y)|h[kmnrtu]|i(?:d|e|l|m|n(?:fo|t)|o|q|r|s|t)|je|jm|jo|jobs|jp|k[eghimnprwyz]|l[abcikrstuvy]|m(?:a|c|d|e|f|g|h|i?l|k|m|n|o(?:bi)?|p|q|r|s|t|u(?:seum)?|v|w|x|y|z)|n(?:a(?:me)?|c|et?|f|g|i|l|o|p|r|u|z)|om|org|p(?:a|e|f|g|h|k|l|m|n|ro?|s|t|w|y)|qa|r[eosuw]|s(?:a|b|c|d|e|g|h|i|j|k|l|m|n|o|r|t|u|v|y|z)|t(?:c|d|e?l|f|g|th|j|k|m|n|o|p|r(?:avel)?|t|v|w|z)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\\b([.]\\B)?|\\d+[.]\\d+[.]\\d+[.]\\d+)(?::\\d+)?)(\\/+\\??(?:\\S+))?/ig,lF=/(?:<(\\S)[^>]+?href=[\"'])(?:\\b((?:(ht|f)tp)s?:\\/\\/)?(((?:\\S+[.])?(?:[a-z0-9][a-z0-9\\-]{0,61}[a-z0-9]|[a-z0-9]{1,2})[.])*(a(?:c|d|e(?:ro)?|f|g|i|l|m|n|o|q|r(?:pa)?|s(?:ia)?|t|u|w|x|z)|b(?:a|b|d|e|f|g|h|i|iz|j|l|m|n|o|r|s|t|v|w|y|z)|c(?:at?|c|d|f|g|h|i|k|l|m|n|o(?:m|op)?|r|u|v|x|y|z)|d[ejkmoz]|e(?:c|du|e|g|h|r|s|t|u)|f[ijkmor]|g(?:a|b|d|e|f|g|h|i|l|m|n|ov|p|q|r|s|t|u|w|y)|h[kmnrtu]|i(?:d|e|l|m|n(?:fo|t)|o|q|r|s|t)|je|jm|jo|jobs|jp|k[eghimnprwyz]|l[abcikrstuvy]|m(?:a|c|d|e|f|g|h|i?l|k|m|n|o(?:bi)?|p|q|r|s|t|u(?:seum)?|v|w|x|y|z)|n(?:a(?:me)?|c|et?|f|g|i|l|o|p|r|u|z)|om|org|p(?:a|e|f|g|h|k|l|m|n|ro?|s|t|w|y)|qa|r[eosuw]|s(?:a|b|c|d|e|g|h|i|j|k|l|m|n|o|r|t|u|v|y|z)|t(?:c|d|e?l|f|g|th|j|k|m|n|o|p|r(?:avel)?|t|v|w|z)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\\b([.]\\B)?|\\d+[.]\\d+[.]\\d+[.]\\d+)(?::\\d+)?)?(\\/+(?:\\S+))??(?:[\"'][^>]*?>([\\s\\S]+?)<\\/\\1>)/gi,q=function(w,c,r,l){var t,a,d;w=w.substring(0,(t=r.lastIndex)-(a=c[0]).length)+(a=(\"<a \"+(l?l[1]:'')+\" href='\"+(((d=c[3])==\"ht\"||d==\"f\")?\"\":\"http://\")+(d=a).replace(/<a[^>]+?href=([\"'])([\\s\\S]+?)\\1[^>]*?>[\\s\\S]+<\\/a>/, \"$2\")+\"' target='_blank'>\"+(c[9]||d)+\"</a>\"))+w.substring(t,w.length);REGEX.lastIndex+=a.length-d.length;return w},Q=function(b){var w=b,t=REGEX.lastIndex=0,a,c,d;while(c=REGEX.exec(w)){if(c[1]||(!c[5]&&!c[7])||(c[7]&&!(c[3]||c[8])))continue;w=q(w,c,REGEX)};while(c=lF.exec(w)){c[3]='ht';w=q(w,c,lF,c[0].match(/(class=(['\"])[^>]+?\\2)[\\s\\S]*?>/i))};return w};return n(Q(m),n)}))");
	}



















	//============
	// PM Notifier (MrSpontaneous attribution applies
	// http://userscripts.org/scripts/review/48979
	//============
	function init_PMNotifier()
	{
		var holodeck = dom.holodeck,
			CDialogue = dom.ChatDialogue;
		if (CDialogue)
		{
			CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
			console.log("pm1");
			if (!CDialogue.prototype.new_private_message) 
			{
				console.log("pm2");
				dom._animatedFav = false;
				dom._pmCount = 0;
				dom._baseTitle = document.title;
				dom._blurred = false;
				dom._chime = dom.document.createElement('audio');
				dom._chime.setAttribute('src', 'data:audio/wav;base64,UklGRi4IAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YakHAACAgIGBgYKEh4qLjIyNjY2LioqJh4aGio2QkZGRkI6Lh4B3cXJ0dnp/g4aHiImDdm1pZmVnbHR6fYGLlZuhpKOgnp2dnJGCdWldU0pEPjgyOktaaHR+homLjZWYjn9wYFJNSUZCPkNadYuitMXU2+Dn7uXRv7KnoaCkqKagpLO8wsfJyMG7uLetlYBzaF5ZVFNVVFFWYmt1fH58dm9pZl9NOy4hFQsEBAgKDRwyQ1NldICIi4+Xm5iVkId/eHR0dHN0gZWnuMna6fX6/P/979/Ova+knpybmJWZoaOlp6elopuVk4t7bF9SSUNAP0JGR0xZZXB8g4eLjod6aVdJPjEjHyUwPUlSXnKEiYF0aF1SQjIvOEdZa3iJnaqspp6WlZOLipSlus7d5vD17t/Qv7Oup5+cpbPCztHT1dTFrZN6ZVhLPjo/SVRcW1xiZFtKNiQYEAgAAg4fMkBIUV5mZV9ZVVpjZ218kanB0tzl7Ori2M/IyMrIydDd6vX49fHt4cy0nYd5cGVdXWJpb29pZmZhVEIuHRIMBQAEDhonMTY9RkxMSkVCRk9UWWV3ip6uusPLzcrFwLu7wMPFy9fj7/j6+PTs38y4o5OJgXhzdnuAhYR/endvYU87KiAaEw8SGyYxO0BGTlJQS0VAQEZKTllrf5WsvcHBwcC8s62xvcfT4+/z9vn359PEuayhm5iTi4J3alpQTkxFPjovIRYNBQIKHC0+UGFkXltbWFRXaX+UqsPZ4+fq6uHUzs7LyMvT19HGt5+Da19YVFJWW1ZNRTwvJis2QElVX1tRS05QUmF8mbHK5vn79e7j0b60rqqorLjCv7WnkHFVRDYtKzE2NDAvLysnLDlDTVpna2NdYmptdYqlu9Dn+v/68+zeyLavq6eor7i+vbeslnZcTkAzLS0uKiUmJiIdIzE6PkRMTUQ8P0ZLU2mJpLrT7Pv8+fXs28rEwr67v8vW1Mm/uLCllHdeVlJHNichIy5AXH2NjYuKhXpsaHJ6eHFoXFVWYHF2bWFVR0FETFdbV1piZ25/l7TM1tnZ0MfDwcPN1NTKtZ6Uj4iEgHRlU0I+RElSW1tZV1NTXGp/m662uLGloKCls8DCuaaMd2lgX2JeU0Y2KyszP0xSUFBQTlJfc4uisr/Hw7y8wMfS2NTHr5OAdGtpa2pmXlNNUFVaX15bWlhWW2RziJ2uvcbGwsC+wMXHw7ikjXpsY2JmZ2ZhV05LTE5RT0lFRUVKU2Fzhpajr7Owr66usrW0rqGNe25kXl9gX1xVTUtMT1RYWFdZXGFqdYSVpbG7wsK+vLm5vL26sqibj4d/enp5dW9mXFZTUFBQS0dGR0pSYHWGjY2RnK7Ayse3opOSmJaGbFFFSVRWTDwyPVd2iIh8cHWKqr++pouAh5idjGtLP0hdZ1xGOENkj6+2rKCmwOP589aznp+rq5RrQzI7UWBbSDU2T3eaqJ+NhpOwy9G/n4eDjpaIZDodGSk8PzMgGCdLdI+XkIuWstXq5syunaGtr5p0TTg6SlZTRTc3TnWarayhnarH5fPpzK6en6SehmJBMjVCRz4sHiE5X4CRj4WBjqnH1c62npOVmpV/YEU7QlBXTjwtLUJkhZeZk5GbscnVzrunnZ6jnolpSz1BUl9fUkRATmqKoKejnqCsvsnEspyNjJOWinFUPjhATVJMQDg8TmiAjZGSl6S5zNTMu6mhpKqpm4BjT0pPWFpTS0ZNXHGAh4aDhIydrbOsnIyGipSZkoFwYVZQUVRZYGdpa25sZWNpdoynur65rqKZlpaVl56ioJmLdV9SS09bZmZcTj4xMjtIU1xbVFJWWFdZXmp/ma24vbispaixvMza39rQwK6gl4yCgYOCfHBcRzs7QEpXW1ZOR0A9Q09gdo2eqK+xqZ+Zl5qltL/AuKaOeWxlYmVrbWpjWk5HRklOVl1fXVxbV1ZbZ3eMn6y0ubq1sK6vsLa9wsTAtqaViH52c3V1cWpgVU5MTk9RVFNQUVNUVVpganeIlZ6kpaGbl5eYm6Glp6ahmY2De3JtbG5vbmpiWlVWWV1jZmZjY2VnbHJ5gImSmqCmqaijn5ybnaKmqKahmZCKhYF9enh0cW5qZmRiYmJkZmdnaGhoaWtvdX2EiYyOkZKSkZGQj5CRkpOSkIqFgHt3dXNyc3R1dnl9gYOBfXh1c3Fta2xvcnV3e4CEhoaGhoiIhoSEhomNkJSan6GhnpuZlpGMiIaGhYOCg4WGhoOBfXp1cGtnZ2dnZ2hrbm9ubGtqaWdmZmltcHN2eXx9fHp6ent7e3x/g4iMj5KWmZqamZeWlJGOi4qJiYmJiouNjY2LioiFgn98e3p5eXl5ent7e3p6enp6enp6e3x8fH19fX19fn5+fn5+f39/f39/f3+AgICAgICAgICBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgABMSVNUWAAAAElORk9JQ09QHwAAAENvcHlyaWdodCCpIENpbmVtYXRyb25pY3MgMTk5NQAASVBSRCMAAABNaWNyb3NvZnQgUGx1cyEgriBmb3IgV2luZG93cyA5NSCuAAA=');
				dom._chime.load();

				//dom.document.addEventListener("blur", function() {
				window.onblur=function(){
					dom._blurred = true;
					console.log("Blur1");
				};//, false);
				console.log("pm3");
				//dom.document.addEventListener("focus", function() {
				window.onfocus=function(){
					dom._blurred = false;
					console.log("Focus 1");
					dom.pmReset();
				};//, false);
				console.log("pm4");
				dom.pmReset = function() {
					if (dom._animatedFav) {
						dom.toggleFavLink();
					}
					dom._pmCount = 0;
					document.title = dom._baseTitle;
				}
				console.log("pm5");
				dom.createFavLink = function(attr) {
					var link = document.createElement("link");
					link.type = attr['type'];
					link.rel = attr['rel'];
					link.href = attr['href'];
					return link;
				}
				console.log("pm6");
				dom.toggleFavLink = function() {
					var head = document.getElementsByTagName("head")[0];
					var links = head.getElementsByTagName("link");
					for (var i=0; i<links.length; i++) {
					  var link = links[i];
					  if (link.rel=="shortcut icon") {
						head.removeChild(link);
					  }
					}
					if (dom._animatedFav) {
						head.appendChild(dom.createFavLink(dom._staticFavLinkAttr));
					}
					else {
						head.appendChild(dom.createFavLink(dom._animatedFavLinkAttr));
					}
					dom._animatedFav = !dom._animatedFav;
				}
				console.log("p7");
				dom._staticFavLinkAttr = {'rel':'shortcut icon',  'href':'/favicon.ico', 'type':'image/x-icon'};
				dom._animatedFavLinkAttr = { 'rel':'shortcut icon', 'href':'data:image/gif;base64,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%3D', 'type':'image/gif'};
				console.log("pm8");
				CDialogue.prototype.new_private_message = function() {
					console.log("got pm 1");
					if (_blurred || (document.hidden != undefined && document.hidden) || (document.webkitHidden != undefined && document.webkitHidden)) {
						console.log("got pm blurred");
						dom._pmCount++;
						if (!dom._animatedFav) {
							dom.toggleFavLink();
						}
						document.title = "[" + dom._pmCount + "] " + dom._baseTitle;
						if (holodeck._pm_chime) {
							dom._chime.play();
						}
					}				
				}
				
				if(!CDialogue.prototype.showReceivedPM_notifier){
					CDialogue.prototype.showReceivedPM_notifier = CDialogue.prototype.receivedPrivateMessage;
					CDialogue.prototype.receivedPrivateMessage = function(a){
						if (a.data.success && !this._user_manager.isMuted(a.data.from)) {
							this.new_private_message();
						}
						this.showReceivedPM_notifier(a);
					}
				}
				
				holodeck.addChatCommand("pmchime", function (l,n){
					if(l._pm_chime) {
						l._pm_chime = 0;
						l.activeDialogue().kongBotMessage("PM chime is OFF");
					} else {
						l._pm_chime = 1;
						l.activeDialogue().kongBotMessage("PM chime is ON");
					}
					window.setTimeout(function(){GM_setValue("kong_pmchime", l._pm_chime);}, 0);
					return false;
				});
				try{
					if (GM_setValue){ 
						var pm_chime = GM_getValue("kong_pmchime", 1);
					}else{
						GM_setValue = function(a,b){};
						var pm_chime = 1;
					}
				}catch(e){
					GM_setValue = function(a,b){};
					var pm_chime = 1;
				}
				holodeck._pm_chime = pm_chime;
			}
		}
	}

















	//============
	// PM Notifier (MrSpontaneous attribution applies
	// http://userscripts.org/scripts/review/48979
	//============
	function init_chatResizer()
	{
		dom.defaultWidth = 500;
		dom.defaultHeight = 600;
		dom.spaceLeft = 200;
		dom.center = true;
		dom.userListHeight = 100;




		if(!$('maingamecontent')) return;
		var initialOffsetTop = $('maingamecontent').offsetTop + $('chat_tab_pane').offsetTop;
		var initialOffsetLeft = $('maingamecontent').offsetLeft + $('chat_tab_pane').offsetLeft;
		var minimumHeight = parseInt($("game").style.height, 10) - parseInt($('main_tab_set').clientHeight, 10) - 16;
		var minimumWidth = 300;

		if(dom.holodeck){
			var holodeck = dom.holodeck;
			holodeck.addChatCommand("size", function(l, n){
				var m = n.match(/^\/\S+\s+(\S+)/);
				var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/)

				if(m && m[1] == "reset"){
					l.activeDialogue().kongBotMessage("Resetting size for this game to defaults.");
					window.setTimeout(function(){GM_deleteValue("kong_resize_"+location.pathname)}, 0);
					setWidth(window._defaultChatWidth);
					setHeight(window._defaultChatHeight, window._defaultUserlistHeight, window._currentGameCentered);

					return false;
				} else if(m && m[1] == "show"){
					l.activeDialogue().kongBotMessage("Current chat size: width: " + window._currentChatWidth + "px, height: " + window._currentChatHeight + "px, userlist-height: " + window._currentChatUserlistHeight + "px.");
					return false;
				} else if(!o){
					l.activeDialogue().kongBotMessage("Please specify a width and a height: /size width height. Example: /size 500 500");
					return false;
				}

				var width = parseInt(o[1], 10);
				var height = parseInt(o[2], 10);
				var listHeight = parseInt(o[3]||100, 10);
				var gameHeight = parseInt($('game').style.height, 10);
				if(width < 300){
					l.activeDialogue().kongBotMessage("Minimum width is 300. Setting width to 300px.");
					width = 300;
				}

				if(height < gameHeight){
					l.activeDialogue().kongBotMessage("Minimum height is the game's height. Setting height to " + gameHeight + "px.");
					height = gameHeight;
				}

				if(listHeight > height - 200){
					l.activeDialogue().kongBotMessage("Userlist height is too large. Setting it to 100px");
					listHeight = 100;
				}

				window.setTimeout(function(){GM_setValue("kong_resize_"+location.pathname, width+"/"+height+"/"+listHeight)}, 0);
				l.activeDialogue().kongBotMessage("Resizing chat to " + width + "px/" + height + "px/" + listHeight + "px");
				setWidth(width);
				setHeight(height, listHeight, window._currentGameCentered);

				return false;
			});

			holodeck.addChatCommand("defaultsize", function(l, n){
				var m = n.match(/^\/\S+\s+(\S+)/);
				var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/)
				if(m && m[1] == "reset"){
					l.activeDialogue().kongBotMessage("Resetting default size to 500/600/100");
					window.setTimeout(function(){GM_deleteValue("kong_resize_default")}, 0);

					return false;
				}	else if(m && m[1] == "show"){
					l.activeDialogue().kongBotMessage("Current chat size: width: " + window._defaultChatWidth + "px, height: " + window._defaultChatHeight + "px, userlist-height: " + window._defaultUserlistHeight + "px.");
					return false;
				} else if(!o){
					l.activeDialogue().kongBotMessage("Syntax /defaultsize width height userlist-height. userlist-height is optional. Example: /defaultsize 500 500 100");
				}

				var width = parseInt(o[1], 10);
				var height = parseInt(o[2], 10);
				var listHeight = parseInt(o[3]||100, 10);
				if(width < 300){
					l.activeDialogue().kongBotMessage("Minimum width is 300. Setting width to 300px.");
					width = 300;
				}

				if(listHeight > height){
					l.activeDialogue().kongBotMessage("Userlist height is too large. Setting it to 100px");
					listHeight = 100;
				}

				window.setTimeout(function(){GM_setValue("kong_resize_default", width+"/"+height+"/"+listHeight)}, 0);
				l.activeDialogue().kongBotMessage("Set default values to width: " + width + "px, height: " + height + "px, userlist-height: " + listHeight + "px.");

				return false;
			});

			holodeck.addChatCommand("centergame", function(l, n){
				var center = !window._currentGameCentered;
				if(center){
					l.activeDialogue().kongBotMessage("Now centering the game");
				} else {
					l.activeDialogue().kongBotMessage("Now aligning the game to the chat's bottom");
				}
				window.setTimeout(function(){GM_setValue("kong_resize_center", center?1:0)}, 0);

				centerGame(center);

				return false;
			});

		}

		var getString = "", centerVal = -1, defaults = "";
		getString = GM_getValue("kong_resize_"+location.pathname, "");
		centerVal = GM_getValue("kong_resize_center", -1);
		defaults = GM_getValue("kong_resize_default", "");

		if(defaults){
			var splitArr = defaults.split("/");
			defaultWidth = parseInt(splitArr[0], 10)||defaultWidth;
			defaultHeight = parseInt(splitArr[1], 10)||defaultHeight;
			userListHeight = parseInt(splitArr[2], 10)||userListHeight;
		}

		window._defaultChatWidth = defaultWidth;
		window._defaultChatHeight = defaultHeight;
		window._defaultUserlistHeight = userListHeight;

		var x = defaultWidth, y = defaultHeight, l = userListHeight, cg = center, override = false;

		if(centerVal != -1){
			cg = (centerVal == 1);
		}

		if(getString){
			var splitArr = getString.split("/");
			x = parseInt(splitArr[0], 10)||defaultWidth;
			y = parseInt(splitArr[1], 10)||defaultHeight;
			l = parseInt(splitArr[2], 10)||userListHeight;
			override = true;
		}

		var gameWidth = parseInt($('game').style.width, 10);
		var gameHeight = parseInt($('game').style.height, 10);

		if(x > minimumWidth){
			if(override || gameWidth + x < screen.width - spaceLeft){ // enough place to resize to specified width
				setWidth(x);
			}else{ // resize as far as possible
				var chatWidth = screen.width - gameWidth - spaceLeft;
				if(chatWidth > minimumWidth) setWidth(chatWidth);
			}
		}

		if(y > minimumHeight && y > gameHeight){
			setHeight(y, l, cg);
		} else {
			setHeight(gameHeight, l, cg);
		}
	}

	function centerGame(center){
		window._currentGameCentered = center;
		if(center){
			var gameHeight = parseInt($('game').style.height, 10);
			var mainHeight = parseInt($("maingame").style.height, 10);
			$('game').style.top = (mainHeight - gameHeight)/2+"px"
			$('game').style.position = "relative";
		}else{
			$('game').style.bottom = "0px";
			$('game').style.top = "";
			$('game').style.position = "absolute";
		}
	}
	function setHeight(height, userListHeight, center){
		if(!userListHeight) userListHeight = 100;

		window._currentChatHeight = height;
		window._currentChatUserlistHeight = userListHeight;

		var quicklinksHeight = $('quicklinks') ? $('quicklinks').parentNode.clientHeight : 26;
		var maintabHeight = $('main_tab_set').clientHeight;

		var tabPaneHeight = height - 16;
		var mainHeight = height + quicklinksHeight + maintabHeight;
		var gameHeight = parseInt($('game').style.height, 10);

		$("maingame").style.height = mainHeight + "px";
		$("maingamecontent").style.height = mainHeight + "px";
		$("flashframecontent").style.height = mainHeight + "px";
		$("chat_container").style.height = (height + maintabHeight) + "px";
		$("user_mini_profile_container").style.height = (height - 65) + "px";
		$("user_mini_profile").style.height = (height - 65) + "px";

		var messageWindows = $$(".chat_message_window");
		for(var i = 0; i < messageWindows.length; i++){
			messageWindows[i].style.height = (tabPaneHeight - userListHeight - 93)+"px"; // 93 = roomname, users in room etc.
		}

		var usersInRoom = $$(".users_in_room");
		for(i = 0; i < usersInRoom.length; i++){
			usersInRoom[i].style.height = userListHeight + "px";
		}

		var roomsList = $$(".rooms_list");
		for(i = 0; i < roomsList.length; i++){
			roomsList[i].style.height = (height - 79)+"px";
		}

		z = $("kong_game_ui").childNodes;
		for(i=0;i<z.length;i++){
			if(z[i].nodeName=="DIV"){
				z[i].style.height = tabPaneHeight + "px";
			}
		}
		if(center != -1 && center !== undefined)
			centerGame(center);
	}

	function setWidth(width){
		window._currentChatWidth = width;
		var gameWidth = parseInt($("game").style.width, 10);
		$("maingame").style.width = (gameWidth + 3 + width) + "px";
		$("maingamecontent").style.width = (gameWidth + 3 + width) + "px";
		$("flashframecontent").style.width = (gameWidth + 3 + width) + "px";
		$("chat_container").style.width = width + "px";
		$('chat_window_spinner').style.right = width/2 - 38 + "px";
		if($('high_scores_spinner'))
			$('high_scores_spinner').style.right = width/2 - 38 + "px";
		var ui = $("kong_game_ui");
		z = ui.childNodes
		for(i=0;i<z.length;i++){
			if(z[i].tagName == "DIV")
				z[i].style.width = (width - 17) + "px";
		}
		$A(ui.querySelectorAll("textarea.chat_input")).forEach(function(el){
			el.style.width = (width - 21) + "px";
		});
	}

	function $A(c){
		return [].slice.call(c);
	}






















}




// This injects our script onto the page.
// Kinda borrowed from http://userscripts.org/scripts/review/125666
// Borrowed from: http://stackoverflow.com/a/2303228
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
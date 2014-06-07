// ==UserScript==
// @name           OmegleCustom
// @namespace      OmegleCustom
// @version        1.1
// @include        http://omegle.com/
// @include        http://www.omegle.com/
// @author         Normal Ra
// @homepage       https://github.com/NormalRa/omeglecustom
// @updateURL      https://raw.github.com/NormalRa/omeglecustom/master/src/omeglecustom.user.js
// @run-at         document-end
// @noframes
// ==/UserScript==

/*  # JavaScript OmegleCustom [omeglecustom.js] @ omegle.com #

 *  Please don't look directly at the code.
 *  Negative impacts of such action include, but are not limited to:
 *  > exploding, imploding, hysterical laughter, self-evaluation, or thinking about eating cheese.

 *  This software is released to public domain, wheeeeeeeeeeeeee!
 *  If you like being shouted at, check UNLICENSE for more information.
*/

var container = function () {

Cache = {
	_name: "Self",
	_strgname: "Stranger",
	_state: 0x10,
	_method: { r: 1, h: { n: 0xAA, c: null }, u: null },
	_token: null,
	_server: null,
	day: new Date().getDay(),
	session: 1,
	version: "1.1",
	servers: [
		"front1", "front2",
		"front3", "front4",
		"front5", "front6",
		"front7"//, "waw1"
	],

	history: [ { session: "failure", cont: [] }, { session: "init", cont: [] } ],
	count: { self: { chars: 0, lines: 0 }, stranger: { chars: 0, lines: 0, dangling: 5 }, dual: { chars: 0, lines: 0 } },

	spam: {
		g: [
			{r:"bestiality"},
			{r:"circum(s|c)is"},
			{r:"condom"},
			{r:"dildo"},
			{r:"fetish"},
			{r:"horny"},
			{r:"\\bcum\\b",c:false},
			{r:"jizz"},
			{r:"panties"},
			{r:"\\bpoo\\b"},
			{r:"porn"},
			{r:"sperm",after:[{r:"whale",v:-0.5}]},
			{r:"tampon"},
			{r:"underwear"},
			{r:"virgin"},

			{r:"anal"},
			{r:"anus"},
			{r:"ass",v:0.75,before:[{r:"baby|my|your|hole",v:0.25}]},
			{r:"balls",v:0.75,before:[{r:"my|your|someone",v:0.25}]},
			{r:"boob"},
			{r:"\\bbra\\b",v:0.99},
			{r:"breast",v:0.99},
			{r:"butt",v:0.99},
			{r:"clit"},
			{r:"cock"},
			{r:"cunt"},
			{r:"dick"},
			{r:"foreskin"},
			{r:"genital"},
			{r:"nipple"},
			{r:"penis"},
			{r:"pub(ic|es)"},
			{r:"pussy",after:[{r:"cat",v:-0.3}]},
			{r:"rectum"},
			{r:"tits"},
			{r:"vag(ina)?",v:0.99},

			{r:"bitch"},
			{r:"black",v:0.3,after:[{r:"people",v:0.69}]},
			{r:"\\bfat\\b"},
			{r:"ginger"},
			{r:"fag",v:2},
			{r:"nigg(a|er|let)",v:Infinity},
			{r:"pa?edo(phil)?"},
			{r:"prostitute"},
			{r:"slut"},
			{r:"whore"},
			{r:"job",v:0.25,before:[{r:"blow|hand|rim",v:0.75}]},

			{r:"boner"},
			{r:"dirty",v:0.2,after:[{r:"talk",v:0.8}]},
			{r:"ejaculat",v:2},
			{r:"erect",v:2},
			{r:"\\bfap(\\b|ping)",v:3},
			{r:"fart",v:0.99},
			{r:"finger(ed|ing)",v:2},
			{r:"fisting",v:2},
			{r:"flirt"},
			{r:"herpes"},
			{r:"incest"},
			{r:"jack",v:0.75,after:[{r:"off",v:0.25}]},
			{r:"jerk",v:0.97,after:[{r:"off",v:0.3}],before:[{r:"circle",v:0.3}]},
			{r:"lesbian",v:0.5},
			{r:"mast(u|e)rbat"},
			{r:"naked"},
			{r:"oral"},
			{r:"orgasm"},
			{r:"rape"},
			{r:"role",v:0.9,after:[{r:"play",v:0.1}]},
			{r:"semen"},
			{r:"sex",v:0.99,after:[{r:"ality",v:-0.25}]},
			{r:"three\\s?some"},
			{r:"\\bm((u|o)m\\b|other)"},
			{r:"boy",v:0.99},
			{r:"\\bcrack\\b"},
			{r:"marijuana"},
			{r:"gay"},
			{r:"\\b(gf|bf)\\b"},
			{r:"girl"},
			{r:"guy"},
			{r:"male"},

			{r:"9gag"},
			{r:"america"},
			{r:"4chan"},
			{r:"asia"},
			{r:"bieber"},
			{r:"\\bdating\\b"},
			{r:"dolan"},
			{r:"hitler"},
			{r:"\\bhot\\b"},
			{r:"nazi"},
			{r:"\\bnoob\\b"},
			{r:"jew"},
			{r:"\\bkik\\b"},
			{r:"one\\s?direction"},
			{r:"\\bpics\\b"},
			{r:"skype"},
			{r:"slender"},
			{r:"tumblr"},
			{r:"\\bswag\\b"},
			{r:"troll"},
			{r:"\\byolo\\b"},
			{r:"weed"},
			// Poetic justice, I don't like the zombie apocalypse motif.
			// Why? Because http://www.thebestpageintheuniverse.net/c.cgi?u=prometheus_nutshell => Zombies. That's why ._.
			{r:"zombie",v:0.5,before:[{r:"apocalypse",v:0.5}],after:[{r:"apocalypse",v:0.5}]}
		],
		q: [
			//{r: "^\\s?[a-z]",v:0.99},
			{r: "al?lah"},
			{r: "atheis"},
			{r: "bible"},
			{r: "christ"},
			{r: "\\bgod\\b",before:[{r:"zeus|greek",v:-0.9}],after:[{r:"zeus|greek",v:-0.9}]},
			{r: "islam"},
			{r: "jesus"},
			{r: "jihad"},
			{r: "muslim"},
			{r: "qur'?an"},
			{r: "religio"},
			{r: "torah"},

			{r: "(p|br)on(y|ies)"},
			{r: "rainbow\\sdash"},
			{r: "fluttershy"}
			//,{r: "furry"}
		]
	}
};


handlers = {};
modules = {};
gears = {};
handlers["initialize"] = {
	activate: function () {
		// Turning back, turning back
		// To my special place
		console.log("OmegleCustom[R] " + Cache.version);
		gears["debug"].push("OmegleCustom[R] " + Cache.version);

		Cache._server = Cache.servers[Math.floor(Math.random() * Cache.servers.length)];
		gears["debug"].push("Chosen server '" + Cache._server + "'");

		gears["graphical"].create();
		gears["debug"].push("GUI ready.");

		gears["graphical"].storage.server.set("text", Cache._server);

		Cache._state = 0x11;
		handlers["tokenize"].activate();
	},
	unravel: function () {
		if (Cache._state != 0x11) return;
		Cache.session = Cache.history.push({
			session: (Math.random() * (1 << 24) | 0).toString(16),
			cont: []
		}) - 1;
		Cache.count = { self: { chars: 0, lines: 0 }, stranger: { chars: 0, lines: 0, dangling: 5 }, dual: { chars: 0, lines: 0 } };

		gears["graphical"].clean();
		gears["debug"].push("Recycled old session objects.");

		Cache._strgname = "Stranger";

		Module(["randomservers"]).cherish();
		
		var ro = Cache._method.r + 1;
		while (--ro)
			handlers["tokenize"].activate();
	}
};
handlers["tokenize"] = {
	activate: function () {
		// Give it up, give it up
		// All the fears we share
		if (Cache._state != 0x11) return;
		Cache._token = null;
		Cache._method.u = Cache._method.h;

		var url = "http://" + Cache._server + ".omegle.com/start?rcs=1&spid=" + {
			0xAA: "&wantsspy=1",
			0xAB: "&ask=" + encodeURIComponent(Cache._method.u.c),
			0xAC: "&topics=" + encodeURIComponent(JSON.encode(Cache._method.u.c)),
			0xFF: ( Cache._method.u.c ) ? "&lang=" + encodeURIComponent(Cache._method.u.c) : ""
		}[Cache._method.u.n || 0xFF];

		gears["debug"].push("tokenize: Punching URL: " + url);

		new Request.JSON({
			url: url,
			onSuccess: function (token) {
				Cache._token = token;
				Cache._state = 0x13;
				gears["debug"].push("tokenize: Successfuly received token: " + token);

				handlers["event"].activate(token);
			},
			onFailure: function () {
				Cache._state = 0x11;
				gears["debug"].push("tokenize: Unsuccessful attempt to connect to server.");

				gears["graphical"].removetyping();
				gears["graphical"].storage.header.set("class", "z");
				gears["graphical"].info("Unable to connect.", "f");
			}
		}).post();
	}
};
handlers["event"] = {
	retry: 3,
	activate: function (token) {
		// My hovercraft is full of eels!
		var _serid = Cache.session;

		if (this.retry < 1) {
			Cache._state = 0x11;
			this.retry = 3;
			gears["debug"].push("event: Three attempts to connect failed.", null, "baron");

			gears["graphical"].removetyping();
			gears["graphical"].storage.header.set("class", "z");
			gears["graphical"].info("Unable to connect.", "f");
			return;
		}
		if (Cache._state < 0x13) return;
		if (token != Cache._token) {
			if ( Cache.session != _serid ) gears["debug"].push("event: Ancient session '" + Cache.history[_serid].session + "' collapsed.");
			return;
		}

		var _this = this;

		new Request.JSON({
			url: "http://" + Cache._server + ".omegle.com/events",
			onSuccess: function (events) {
				if (Cache._state < 0x13) return;
				if (token != Cache._token) {
					if ( Cache.session != _serid ) gears["debug"].push("event: Ancient session '" + Cache.history[_serid].session + "' collapsed.");
					return;
				}


				if (events == null) {
					Cache._state = 0x11;
					gears["debug"].push("event: Intercepted a null response from the server.", null, "baron");

					gears["graphical"].removetyping();
					gears["graphical"].storage.header.set("class", "z");
					gears["graphical"].info("Connection was terminated.", "f");
					return;
				} else if (typeof events === "object" && events.length === 0) {
					gears["debug"].push("event: Received an empty array, re-initiating connection...");
					_this.activate(token);
					return;
				}


				var rest = null;
				Cache._state = (Cache._state < 0x14) ? 0x14 : Cache._state; // 0x14;
				events.some(function (event) {
					var __break = true,
						__ename = event[0],
						__econt = ( event.slice(1).length < 2 ) ? event.slice(1)[0] : event.slice(1);

					gears["debug"].push("event: Received event: " + JSON.encode(event), event, "event"); // EVENT EVENT VENTE EVITNDMDM.nlript.adtnym

					if (Cache._state < 0x14) {
						rest = true;
						return __break;
					}

					if (!_this.methods[__ename]) {
						if (_this.methods[__ename] !== null) {
							gears["graphical"].info(
								"Unsupported event type: '" + __ename + "'"
								+ ((event.length > 1) ? ", with content(s): '" + __econt + "'" : "")
							);
						}
						return;
					}
					rest = _this.methods[__ename].ack(__econt);
					if (rest === 0xFFFF) return __break;
				});

				if (rest === 0xFFFF) return;
				_this.activate(token);
			},
			onFailure: function () {
				//FIXME: Maybe we could just be friends.
				// I'm being a bit presumptuous.
				Cache._state = 0x13;
				_this.retry--;

				if ( !(_this.retry < 1) ) gears["debug"].push("event: Failed to connect, re-trying...", null, "baron");
				_this.activate(token);
			}
		}).post({
			id: Cache._token
		});
	},
	methods: {
		//"antinudeBanned": {},
		//"count": {},
		"error": {
			ack: function (input) {
				Cache._state = 0x11;
				gears["graphical"].storage.header.set("class", "z");
				gears["graphical"].info(input, "f");
				return 0xFFFF;
			}
		},
		"statusInfo": {
			ack: function (object) {
				gears["graphical"].storage.count.set("text", object.count);
			}
		},


		//"recaptchaRequired": {},
		//"recaptchaRejected": {},


		"waiting": {
			ack: function (input) {
				gears["graphical"].storage.header.set("class", "n");
				gears["graphical"].info("Waiting...");
				return;
			}
		},
		"connected": {
			ack: function (input) {
				Cache._state = 0x15;

				gears["graphical"].storage.header.set("class", "p");
				gears["graphical"].info("Connected! ID: '" + Cache._token + "'", "w");
				return;
			}
		},
		"question": {
			ack: function (input) {
				Cache._state = 0x16;

				if ( !(Cache._method.u.n === 0xAB) ) {
					var newinput = Module(["questionfilter"]).cherish(input);
					if (newinput === 0xFCAE) return;
					if (newinput === 0xFFFF) return 0xFFFF;

					gears["graphical"].question(newinput);
					return;
				}

				gears["graphical"].question(input);
				return;
			}
		},
		//"commonLikes": {},


		"gotMessage": {
			ack: function (input) {
				gears["graphical"].removetyping(Cache._strgname);

				if (input[0] === "!") return this.attention(input);

				var newinput = Module(["strangerfilter", "soundnotification"]).cherish(input);
				if (newinput === 0xFCAE) return;
				if (newinput === 0xFFFF) return 0xFFFF;

				this.raster(newinput);

				return;
			},
			attention: function (input) {
				this.raster(input);

				Intranet(input.substr(1), function (vast) {
					handlers["send"].methods.raster(vast);
					handlers["send"].activate(vast);
				});
			},
			raster: function (text) {
				Cache.count.stranger.chars += text.length;
				Cache.count.stranger.lines++;
				if (Cache.count.stranger.dangling) {
					Cache.count.stranger.dangling--;
				}

				text = text.replace(/([<>])/g, function (match) {
					return {
						"<": "&lt;",
						">": "&gt;"
					}[match];
				});

				var _obj = {};
				_obj._class	= "strangermsg";
				_obj.identity	= Cache._strgname;
				_obj.mods	= { b: Cache.count.stranger.dangling ? "*" : "", f: ":" };
				_obj.pontau	= [ text ];
				_obj.buffer	= [];

				_obj = Module(["action", "urls", "smilies"]).cherish(_obj);
				if ( _obj === 0xFCAE || typeof _obj != "object" ) return;

				for (var xi = 0; xi < _obj.pontau.length; xi++) {
					if (typeof _obj.pontau[xi] != "number") continue;
					_obj.pontau[xi] = _obj.buffer[_obj.pontau[xi]];
				}

				_obj.text = _obj.pontau.join("");

				gears["graphical"].message(_obj);
			}
		},
		"spyMessage": {
			ack: function (input) {
				gears["graphical"].removetyping(input[0]);

				var newinput = Module(["spyfilter"]).cherish(input[1]);

				if (newinput === 0xFCAE) return;
				if (newinput === 0xFFFF) return 0xFFFF;

				this.raster(input[0], newinput);
			},
			raster: function (_identity, text) {
				Cache.count.dual.chars += text.length;
				Cache.count.dual.lines++;

				text = text.replace(/([<>])/g, function (match) {
					return {
						"<": "&lt;",
						">": "&gt;"
					}[match];
				});

				var _obj = {};
				_obj._class	= { "Stranger 1": "strangermsg", "Stranger 2": "strangeramsg" }[_identity];
				_obj.identity	= _identity;
				_obj.mods	= { b:"", f: ":"};
				_obj.pontau	= [ text ];
				_obj.buffer	= [];

				_obj = Module(["action", "urls", "smilies"]).cherish(_obj);
				if ( _obj === 0xFCAE || typeof _obj != "object" ) return;

				for (var xi = 0; xi < _obj.pontau.length; xi++) {
					if (typeof _obj.pontau[xi] != "number") continue;
					_obj.pontau[xi] = _obj.buffer[_obj.pontau[xi]];
				}

				_obj.text = _obj.pontau.join("");

				gears["graphical"].message(_obj);
			}
		},
		"serverMessage": null, // Puppies do not accept this.


		"typing": {
			ack: function () {
				gears["graphical"].typing(Cache._strgname, " is " + [
					"turtling",
					"thinking",
					"pondering",
					"typing",
					"writing"
				][Math.floor(Math.random() * 5)] + "...");
			}
		},
		"stoppedTyping": {
			ack: function () {
				gears["graphical"].typing(Cache._strgname, " has stopped typing.");
			}
		},
		"spyTyping": {
			ack: function (input) {
				gears["graphical"].typing(input);
			}
		},
		"spyStoppedTyping": {
			ack: function (input) {
				gears["graphical"].typing(input, " has stopped typing.");
			}
		},


		"strangerDisconnected": {
			ack: function (input) {
				Cache._state = 0x11;

				gears["graphical"].removetyping();

				if (Cache.count.stranger.dangling) {
					handlers["initialize"].unravel();
					return 0xFFFF;
				}

				gears["graphical"].storage.header.set("class", "z");
				gears["graphical"].info(Cache._strgname + " " + [
					"has disconnected.",
					"terminated the connection.",
					"does not like you.",
					"might come back. Pretty please?",
					"decided it would be best to part ways.",
					"has more important matters to attend to."
				][Math.floor(Math.random() * 6)], "f");

				return 0xFFFF;
			}
		},
		"spyDisconnected": {
			ack: function (input) {
				Cache._state = 0x11;

				gears["graphical"].removetyping();

				var _embl = Module(["autoreconnect"]).cherish();
				if ( _embl === 0xFCAE ) return;
				if ( _embl === 0xFFFF ) return 0xFFFF;

				gears["graphical"].storage.header.set("class", "z");
				gears["graphical"].info(input + " " + [
					"has disconnected.",
					"terminated the connection.",
					"does not like " + (["the question", "the other Stranger"][Math.floor(Math.random() * 2)]) + ".",
					"just EXPLODED! There was nothing anyone could have done.",
					"went to meditate."
				][Math.floor(Math.random() * 5)], "f");

				return 0xFFFF;
			}
		}
	}
};
handlers["send"] = {
	activate: function (text, failcallback) {
		if (typeof text != "string") return;
		if (Cache._state < 0x15) return;

		gears["debug"].push("send: Sending msg: " + text, ["send", text], "oevent");

		new Request({
			url: "http://" + Cache._server + ".omegle.com/send",
			data: {
				msg: text,
				id: Cache._token
			},
			onFailure: failcallback
		}).send();
	},
	methods: {
		raster: function (text) {
			Cache.count.self.chars += text.length;
			Cache.count.self.lines++;

			text = text.replace(/([<>])/g, function (match) {
				return {
					"<": "&lt;",
					">": "&gt;"
				}[match];
			});

			var _obj = {};
			_obj._class	= "youmsg";
			_obj.identity	= Cache._name,
			_obj.mods	= { b:"", f:":" };
			_obj.pontau	= [ text ];
			_obj.buffer	= [];

			_obj = Module(["action", "urls", "smilies"]).cherish(_obj);
			if ( _obj === 0xFCAE || typeof _obj != "object" ) return;

			for (var xi = 0; xi < _obj.pontau.length; xi++) {
				if (typeof _obj.pontau[xi] != "number") continue;
				_obj.pontau[xi] = _obj.buffer[_obj.pontau[xi]];
			}

			_obj.text = _obj.pontau.join("");

			return gears["graphical"].message(_obj);
		},
		"textarea": {
			attention: function (input) {
				//modules['handletextarea'].pushhistory(a);

				handlers["send"].methods.raster(input);
				handlers["send"].activate(input);

				Intranet(input.substr(1), function (vast) {
					handlers["send"].methods.raster(vast);
					handlers["send"].activate(vast);
				});
			},
			command: function (input) {
				var _name = input.split(" ")[0].substr(1);

				//if ( modules[_name] ) {
				//	if (modules[_name].active === undefined)
				//		return gears["graphical"].info("This module cannot be (de)activated.");
				//
				//	modules[_name].active = !modules[_name].active;
				//	return gears["graphical"].info("Module '" + _name + "' is now " + (modules[_name].active ? "activated." : "deactivated."));
				//} else
				if ( this.commands[_name] ) {
					var _cmd = input.substr(input.split(" ")[0].length + 1);
					return this.commands[_name](_cmd);
				}
				gears["graphical"].info("No such module: '" + _name.replace(/[\n\s\t]/g, "") + "'");
			},
			normal: function (input) {
				//input = modules.raport(this.modules.lowlevel, input);
				//if ( input === 0xFCAE ) return;
				var tag = handlers["send"].methods.raster(input);
				handlers["send"].activate(input, function () {
					if (tag) tag.setStyle("opacity", "0.3");
				});
			},
			commands: {
				"new": function () {
					Cache._state = 0x11;
					Cache._token = null;

					gears["graphical"].storage.status.set({
						"text": "Ready",
						"class": "sttgrn"
					});

					handlers["initialize"].unravel();
				},
				"debug": function (input) {
					gears["debug"].cast();
				},
				"demo": function () {
					var t = Cache._token;

					Cache._state = 0x11;
					Cache._token = null;

					gears["graphical"].removetyping();
					gears["graphical"].clean();

					gears["graphical"].storage.status.set({
						"text": "Ready",
						"class": "sttgrn"
					});
					gears["graphical"].storage.server.set("text", "<server>");

					gears["graphical"].info("Waiting...");
					gears["graphical"].info("Connected! ID: '" + t + "'", "w");
					handlers.event.methods.question.ack("'Tis a question is!");
					handlers.send.methods.raster("Curious.");
					handlers.event.methods.gotMessage.ack("A strange message.");
					handlers.event.methods.gotMessage.ack("That so, www.plus.org smilies: ^^ :D :] :) ;) :P ._. <3 ...")
					handlers.send.methods.raster("Exactly www.right.org you are, Strangy. :]");
					handlers.send.methods.raster("This message wasn't delivered properly.").setStyle("opacity", "0.3");
					handlers.event.methods.gotMessage.ack("*dances*");
					handlers.send.methods.raster("*rejoices*");
					gears["graphical"].info("A notification!");
					gears["graphical"].info("Stranger has disconnected.", "f");

					gears["graphical"].bubble("demomsg", {
						html: "Hello!",
						styles1: {
							bottom: "71px",
							cursor: "pointer",
							left: "0",
							margin: "0 auto",
							right: "0",
							width: "127px"
						},
						styles2: {
							left: "0",
							margin: "0 auto",
							right: "0",
							width: "0"
						}
					});

					var la = $$(".logaddition");
					for (var s = 0; s < la.length; s++) {
						la[s].set("text", "[12:00:0" + s + "]");
					}
				},
				"disconnect": function () {
					handlers["disconnect"].activate();

					Cache._state = 0x11;
					Cache._token = null;

					gears["graphical"].removetyping();
					gears["graphical"].storage.header.set("class", "");
					gears["graphical"].info("You have disconnected.");
				},
				"setmode": function (input) {
					if (!input) return gears["graphical"].info("Not enough arguments!");

					var n = parseInt(input.split(" ")[0]);
					var _cont = input.substr(input.split(" ")[0].length + 1);

					if ( typeof n != "number" || Number.isNaN(n) || n === undefined || ( n > 3 || n < 0 ) )
						return gears["graphical"].info("First argument has to be an integer. x∈ℝ⁺, x∈[0, 3]!");
					if ( (n == 2 || n == 3 ) && (!_cont || _cont.length < 1) )
						return gears["graphical"].info("You have to provide additional arguments for this mode!");

					Cache._method.h.n = [ 0xFF, 0xAA, 0xAB, 0xAC ][n] || 0xFF;

					if ( Cache._method.h.n == 0xFF ) {
						if ( _cont ) {
							Cache._method.h.c = _cont.split(" ")[0];
						} else {
							Cache._method.h.c = null;
						}
					} else if ( Cache._method.h.n == 0xAB ) {
						Cache._method.h.c = _cont;
					} else if ( Cache._method.h.n == 0xAC ) {
						Cache._method.h.c = _cont.split(/,[\s]?/);
					} else {
						Cache._method.h.c = null;
					}

					gears["graphical"].info(
						"Method has been set to: '"
						+ ( ["normal", "question answer", "question ask", "topic"][n] )
						+ "'"
					);
				}
			}
		}
	}
};
handlers["disconnect"] = {
	activate: function () {
		if (Cache._state < 0x15) return;

		gears["debug"].push("disconnect: Sending a disconnect request to the server.", ["disconnect"], "oevent");

		new Request({
			url: "http://" + Cache._server + ".omegle.com/disconnect",
			data: {
				id: Cache._token
			}
		}).send();
	}
};




var Module = function ( input ) {
	if ( !this.modules ) this.modules = {};
	if ( !input ) return;

	var _mods = this.modules;

	return {
		attach: function (object) {
			if ( !input || !(typeof input === "string") ) return;
			_mods[input] = object;
		},
		//group: function () {},
		cherish: function (query) {
			var ka = input instanceof Array ? input : [ input ];
			var placeholder = [ query || null ];

			for (var ta = 0; ta < ka.length; ta++) {
				if ( !_mods[ka[ta]] ) continue;
				if ( _mods[ka[ta]].active === false ) continue;

				var _ans = _mods[ka[ta]].core(placeholder[0]);
				if ( _ans === 0xFFFF || _ans === 0xFCAE ) return _ans;
				if (!_ans || _ans === null) continue;

				placeholder.unshift(_ans);
			}

			return placeholder[0] || query || null;
		}
	}
}

String.prototype.splitEdit = function (f, w) {
	if (!(f instanceof RegExp)) return String.split.apply(this, arguments);
	var a = this + "",
		b = [],
		c = 0,
		d, h, x;

	for (f = new RegExp(f.source, (f.ignoreCase ? "i" : "") + "g"); d = f.exec(a);) {
		if (f.lastIndex > c) {
			d.index > c && b.push(a.slice(c, d.index));
			x = (typeof w === "function") ? w(d.slice(1)) : d.slice(1);
			d.length > 1 && d.index < a.length && Array.prototype.push.apply(b, x);
			h = d[0].length;
			c = f.lastIndex;
		}
		f.lastIndex === d.index && f.lastIndex++;
	}
	if ( !(c === a.length) ) b.push(a.slice(c));
	return b;
}




Module("action").attach({
	active: true,
	core: function (_object) {
		var p = _object.pontau;

		if ( ( p[0][0] == "*" ) && ( p[p.length - 1][p[p.length - 1].length - 1] === "*" ) ) {
			p[0] = p[0].substr(1);
			p[p.length - 1] = p[p.length - 1].substr(0, p[p.length - 1].length - 1);

			_object.mods.b = "*** ";
			_object.mods.f = "";

			return _object;
		}
	}
});

Module("url").attach({
	active: true,
	core: function (_object) {
		for (var nm = 0; nm <  _object.pontau.length; nm++) {
			if ( typeof _object.pontau[nm] != "string" ) continue;
			var _ch = false;

			var line = _object.pontau[nm].splitEdit(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/, function (match) {
				_ch = true;
				var _chunk = '<a href="' + ( (match[0].indexOf("www") == 0) ? "http://" + match[0] : match[0] ) + '" target="_blank">' + match[0] + '</a>';
				var _persia = _object.buffer.indexOf(_chunk);
				return [ _persia > -1 ? _persia : _object.buffer.push(_chunk) - 1 ];
			});
			if ( !_ch ) continue;

			_object.pontau.splice(nm, 1);//[nm] = null;
			Array.prototype.splice.apply(_object.pontau, [nm, 0].concat(line));
		}
	}
});

Module("smilies").attach({
	active: true,
	storage: {
		smilies: [
			{ a: /(;\)|;-\)|;D|;-D|\(;|\(-;)/,	b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFLAEHACwAAAAADAAMAAADMXh60LCrETJEi3M2YRXIRFM9X/iJQiCBqAoMIFW5wlDaM1k7ucf9KVUEECi6IB4HJAEAIfkEBQoABwAsAwADAAIAAwAAAwMIugkAIfkEBTIABwAsAwACAAIAAQAAAwIIkAAh+QQBCgAHACwDAAIAAgABAAADAkiUADs=" },
			{ a: /(:\)|:-\)|\(:|\(-:)/,		b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQF9AEHACwAAAAADAAMAAADMnh60LCrETJEi0Q2YRXIX1M9HwhWgWSKQgoMUzyg21DaNCPYbOpxwJbPAwgYXRDiZZEAACH5BAUKAAcALAMAAgAFAAQAAAMISKoA1O25RRIAIfkEBQoABwAsAwADAAUAAwAAAwdIqiLUi4wEACH5BAEKAAcALAMAAwAFAAMAAAMHCECqvCSSBAA7" },
			{ a: /(:\(|:-\(|\):|\)-:)/,		b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMzeHrQsKsRMkSLRDZhFchfUz0fCFaBZIpCCgxTPKAb7Mwtac0DkHucYCsVAQSOLojHAUkAADs=" },
			{ a: /(:\]|:-\]|\[:|\[-:)/,		b: "R0lGODlhDAAMAMIEAAAAAPeUCP/GAP/vAP//AP//AP//AP//ACH5BAEKAAcALAAAAAAMAAwAAAMxeHrQsKsRMkSLM1erAJES531eGEiZJpzAME7u2lhafDKWA8id4P+BWwcQDF4gDAckAQA7" },
			{ a: /(0_0|O_O|o_o|o\.o)/,		b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAM0eHrQsKsRMkSLjjirQPke+DSFZ5aB85UrkAJDtr3CMFFDlTK1Awg7nsURCDJcxRek44AkAAA7" },
			{ a: /(:P|=P|:p|=p)/,			b: "R0lGODlhDAAMAMIGAAAAAL0AAPeUCP/GAP/vAP//AP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFZAAHACwAAAAADAAMAAADNXh60LCrlUJGi0W2YRXIX1M9HwhWgmSKQwoQU0wQgDvQQb6lzJ0HqEdv8GvxPABi6wJhOCAJACH5BAUUAAcALAQACQADAAIAAAMEODE8CQAh+QQFFAAHACwEAAgAAwACAAADBEhB0wkAIfkEBTIABwAsBAAHAAMAAgAAAwMISpwAIfkEBRQABwAsBAAHAAMAAgAAAwQYSkEJACH5BAEUAAcALAQACAADAAIAAAMEGDoxCQA7" },
			{ a: /(0_o|O_o|:S)/,			b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMyeHrQsKsRMkSLM1erAJFT9Xgf+QkBCJ4pMGQa2givVqWMUDp4Lvy/QI8BEAovECJSkQAAOw==" },
			{ a: /(o_O|o_0|S:)/,			b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAM0eHrQsKsRMkSLM1erQCZN9XjgFAqBVIJAlbYf5TbC8A0zYzkA+uiCYDCQigCIxAuE4YAkAAA7" },
			{ a: /(\^\^|\^_\^|\^\.\^)/,		b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgAHACwAAAAADAAMAAADNHh60LCrETJEizNXqwDxE1A9Xvl9QiBlWtoMLFWpgKUNtcpYTv7sgmAwoOsAiMQLhOGAJAAAIfkEARQABwAsAgABAAcACQAAAxgIMCMCJJImZGwExgV7thMjMc5CAqUCBAkAOw==" },
			{ a: /(:D|:-D)/,			b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH5BAEKAAcALAAAAAAMAAwAAAMweHrQsKsRMkSLM1erAPETUD1e+X1CIGVa2gxO7AJW3LhM7eC5nqoRQGCoekAYDkgCADs=" },
			{ a: /(=\)|\(=)/,			b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMxeHrQsKsRMkSLRDZhFchfUz0fCFaBZIpCCgzr227wNKGkZQOzxzmtVAQQKLogHgckAQA7" },
			{ a: /(-\.-|-_-)/,			b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMyeHrQsKsRMkSLM1erQNac901VIDmEI5jAMA5lI7gkvD6A5eRmJ/zAQK8DEAovEIYDkgAAOw==" },
			{ a: /(:O|:o)/,				b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMxeHrQsKsRMkSLM1erQNacR4heFUjfZDbD5AwrIAwOK5yMVd9PrssBXAcQDF4gDAckAQA7" },
			{ a: /(:&gt;|&lt;:)/,			b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEKAAcALAAAAAAMAAwAAAMzeHrQsKsRMkSLRDZhFchfUz0fCFaBNK2UkAJDtsLuNpQZSgp3X3scXyAVAQyHFwjDAUkAADs=" },
			{ a: /(\|:|:\|)/,			b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMzeHrQsKsRMkSLRDZhFchfUz0fCFaBZIpCCgxTPKDb4LApI8x8++icYCDnAQyHFwjDAUkAADs=" },
			{ a: /(:\/|\/:)/,			b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAAHACwAAAAADAAMAAADNHh60LCrETJEizNXq8CUDed9XhhImSacwECMVMUKbjPc6wPQt/kwgqAwcIoAiMQLhOGAJAAAIfkEBRQABwAsAgAGAAQAAwAAAwZISgAqoyUAIfkEBSgABwAsAgAHAAcAAgAAAwc4tNMyIMYEACH5BAEUAAcALAIABwAHAAIAAAMICEA0LkMpkQAAOw==" },
			{ a: /(:\\|\\:)/,			b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAAHACwAAAAADAAMAAADMnh60LCrETJEizNXqwCRTfV4nxcKgZRpaLhSQBsP2ZkywhBWNy78v0CPARAKLxAiUpEAACH5BAUUAAcALAYABgAEAAMAAAMHSDOi8ECEBAAh+QQFKAAHACwDAAcABwACAAADCEhKMwIQipAAACH5BAEUAAcALAMABwAHAAIAAAMISEoD0A6IkAAAOw==" },
			{ a: /(&lt;3|♥)/,			b: "R0lGODlhDAAMAIQUAAAAAM4AANgAAOAAAOYAAOoAAOwTE/8fH/8jI/8tLf9LS/9PT/9TU/9vb/91df+Rkf+np/+5uf/Hx//T0////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJLAEfACwAAAAADAAMAAAFQ+AnjiQJnOIJjMAUQacEOWv7LAw0I4NwOogCQtE4EHonRoFAMPYEPoBhyXwGfB/AYAsVBAKrVNcLLgG+37A5XTKpRSEAIfkEARkAHwAsAAAAAAwADAAABTfgJ45kaZoAIKYlMEGp5Kjr9DAQ5AwCDTgIhKJx4PkSBQKBFwjQPoABTyBwtprNJwmQPa203lIIADs=" },
			{ a: /(\._\.)/,				b: "R0lGODlhDAAMAMIFAAAAAPCQCP/AAP/oAP//AP///////////yH5BAEAAAcALAAAAAAMAAwAAAMxeHrQsKsRMkSLM1erQNac901VIIkZIJjAMA5lI7gkvD6qI5ud4P8BXgcQDF4gDAckAQA7" },
			{ a: /(D:)/,				b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH5BAEKAAcALAAAAAAMAAwAAAMzeHrQsKsRMkSLM1erAPETUD0g+BFCIIVSpYqf46WNEDuoylgy3Qm2SUrXAQSOL0jxskgAADs=" },
			{ a: /(:3)/,				b: "R0lGODlhDAAMAMIFAAAAAPeUCP/GAP/vAP//AP///////////yH5BAEKAAcALAAAAAAMAAwAAAMyeHrQsKsRMkSLM1erXG4cQEgTGJDZVJ3AIKaAwFrl4MpPLJkPI/zAwCkCEAovEIYDkgAAOw==" }
		]
	},
	core: function (_object) {
		for (var z = 0; z < _object.pontau.length; z++) {
			if ( typeof _object.pontau[z] != "string" ) continue;

			for (var w = 0; w < this.storage.smilies.length; w++) {
				if ( typeof _object.pontau[z] != "string" ) break;
				var xl = this.storage,
					_ch = false;

				var line = _object.pontau[z].splitEdit(this.storage.smilies[w].a, function (match) {
					_ch = true;
					var _chunk = '<img title="' + match[0] + '" src="data:image/gif;base64,' + xl.smilies[w].b + '">';
					var _persia = _object.buffer.indexOf(_chunk);
					return [ _persia > -1 ? _persia : _object.buffer.push(_chunk) - 1 ];
				});
				if ( !_ch ) continue;

				_object.pontau.splice(z, 1);//[z] = null;
				Array.prototype.splice.apply(_object.pontau, [z, 0].concat(line));
			}
		}
	}
});

Module("strangerfilter").attach({
	active: true,
	core: function (input) {
		var relevant = new Eloquence(input, {
			profanityFilter: true,
			profanityContainer: Cache.spam.g
		});

		if ( relevant.profanityScore >= 0.99 && Cache.count.stranger.dangling ) {
			Cache._state = 0x11;
			Cache._token = null;

			gears["graphical"].storage.status.set({
				"text": "Anti-Spam -> { s: " + relevant.profanityScore + " }",
				"class": ""
			});

			handlers["initialize"].unravel();
			return 0xFFFF;
		}

		if ( relevant.isASCII() ) {
			input = "[ASCII not shown]";
			return input;
		}

		return relevant.pretty;
	}
});

Module("spyfilter").attach({
	active: true,
	core: function (input) {
		var relevant = new Eloquence(input, {
			profanityFilter: true,
			profanityContainer: Cache.spam.g
		});

		if ( relevant.profanityScore >= 0.99 ) {
			input = "[inappropriate content not shown]";
			return input;
		}

		if ( relevant.isASCII() ) {
			input = "[ASCII not shown]";
			return input;
		}

		return relevant.pretty;
	}
});

Module("questionfilter").attach({
	active: true,
	core: function (input) {
		var relevant = new Eloquence(input, {
			profanityFilter: true,
			profanityContainer: Cache.spam.g.concat(Cache.spam.q)
		});

		if ( relevant.profanityScore >= 0.99 ) {
			Cache._state = 0x11;
			Cache._token = null;

			gears["graphical"].storage.status.set({
				"text": "Anti-Spam -> { q: " + relevant.profanityScore + " }",
				"class": ""
			});

			handlers["initialize"].unravel();
			return 0xFFFF;
		}
	}
});

Module("soundnotification").attach({
	active: true,
	storage: {
		message: new Audio('data:audio/ogg;base64,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\
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcTQM0UQQ0UQQAAAAAAAAATRQBUTUBTzQBAAAAAAAAQBNFQDRNQFRNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						AAAAAAAAAAAAAAAAAQAAAQ4AAAEWQqEhKwKAOAEAh+NAkiBJ8DSAY1nwPHgaTBPgWBY8D5oH0wQAAAAAAAAAAABA8jR4HjwPpgmQNA+eB8+DaQIAAAAAAAAAAAAgeR48D54H0wRIngfPg+fBNAEAAAAA\
						AAAAAADwTBOmCdGEagI804RpwjRhqgAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAQcAgAATykChISsCgDgBAIejSBIAADiSZFkAAKBIkmUBAIBlWZ4HAACSZXkeAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
						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\
						AHQNAGAT9uIg+QEADg==')
	},
	core: function () {
		this.storage.message.play();
	}
});

Module("randomservers").attach({
	active: true,
	core: function () {
		Cache._server = Cache.servers[Math.floor(Math.random() * Cache.servers.length)];
		gears["graphical"].storage.server.set("text", Cache._server);
	}
});

Module("autoreconnect").attach({
	active: true,
	core: function () {
		if ( Cache.count.dual.lines < 10 ) {
			handlers["initialize"].unravel();
			return 0xFFFF;
		}
	}
});




gears["debug"] = {
	invoke: false,
	paint: true,
	arhe: function (_session, _othsbi) {
		if ( !this.invoke ) return;
		var _container = gears["graphical"].storage.debuglogwrapper;

		if ( !this.paint && false) {
			//FIXME: New session ID not shown.
			//gears["debug"].push("debug²: Possible to inject instead of repainting.");
			if ( _othsbi instanceof Number )
				return _container.grab(this.tulips(Cache.history[Cache.session].cont[_othsbi], Cache.history[Cache.session].session));
			var _n = Cache.history[Cache.session].cont.length - 1;
			return _container.grab(this.tulips(Cache.history[Cache.session].cont[_n], Cache.history[Cache.session].session));
		}

		_container.innerHTML = '';

		for (var pli = 0; pli < Cache.history.length; pli++) {
			var _sname = Cache.history[pli].session,
				_cont = Cache.history[pli].cont;
			/*
			_container.grab(new Element("div", {
				"class": "debugitem welcome",
				"text": "New session ID is '" + key + "'."
			}));

			var test = "a"
			_container.grab(this.tulips({
				purpose: "welcome",
				text: "New session ID is '" + key + "'."
			}));

			for (var nek = 0; nek < Cache.history[key].length; nek++) {

				_container.grab(new Element("div", {
					"class": "debugitem " + Cache.history[key][nek].purpose,
					"text": "[" + key + "] " + Cache.history[key][nek].text
				}));

				var test2 = "a"
				_container.grab(this.tulips(Cache.history[key][nek], key));
			}
			*/
			pli > 0 && _container.grab(new Element("br"));
			_container.grab(this.tulips({
				purpose: "welcome",
				text: "New session ID is '" + _sname + "'."
			}));

			if ( _cont.length < 1 ) {
				_container.grab(this.tulips({
					purpose: "generic",
					text: "There doesn't seem to be anything here."
				}));
				continue;
			}

			for (var crs = 0; crs < _cont.length; crs++) {
				_container.grab(this.tulips(_cont[crs], _sname));
			}
		}

		_container.scrollTo(0, 9999999);
		this.paint = false;
	},
	tulips: function (_obj, _origin) {
		if ( !_obj ) return;
		return new Element("div", {
			"class": "debugitem " + _obj.purpose,
			"text": ( _origin ? "[" + _origin + "] " : "" ) + _obj.text
		});
	},
	cast: function (n, _sid) {
		var _debuglog = gears["graphical"].storage.debuglog;
		if ( n == 1 ) {
			this.invoke = true;
			_debuglog.setStyle("display", "block");
			this.arhe();
			return;
		} else if ( n == 0 ) {
			this.invoke = false;
			this.paint = true;
			_debuglog.setStyle("display", "none");
			return;
		}

		this.invoke = !this.invoke;
		this.paint = true;
		var _s = _debuglog.getStyle("display");
		_s === "none" ? ( _debuglog.setStyle("display", "block"), this.arhe() ) : null;
		_s === "block" ?  _debuglog.setStyle("display", "none")  : null;
	},
	push: function (_text, _store, _purpose, _point) {
		var _obj = {
			text: _text || "Call.",
			purpose: _purpose || "generic",
			point: _point || new Date().getTime()
		};

		if ( typeof _store != "undefined" && _store != null ) _obj["store"] = _store;

		if ( !Cache.history[Cache.session] ) {
			Cache.session = 0;
		}

		var _othsbi = Cache.history[Cache.session].cont.push(_obj) - 1;

		this.arhe(null, _othsbi);
	}
};

gears["graphical"] = {
	create: function () {
		$$("#adwrapper", "#appstore", "#logo", "#tagline", "#sharebuttons").forEach(Element.destroy);
		$("intro").dispose();
		$$("head")[0].grab(new Element("link", {
			rel: "icon",
			href: "data:image/ico;base64,AAABAAEAICAQAAEABADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmZmYAmZmZAMzMzAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
				AAAAAAAAAAAAAAAARCERERERERERERERERESREIQAAAAAAAAAAAAAAAAASRBAAAAAAAAAAAAAAAAAAAUIQAAAAAAAAAAAAAAAAAAEhAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAABEAAAAAAA\
				AAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAABEAAAAAAzMzADMzMAAAAAARAAAAADMzMwAzMzMAAAAAEQAAAAAzAAMzMAAzAAAAABEAAAADMwADMzAAMzAAAAARAAAAAzAAAD\
				MAAAMwAAAAEQAAAAMwAAAzAAADMAAAABEAAAADMAAAMwAAAzAAAAARAAAAAzAAADMAAAMwAAAAEQAAAAMwAAAAAAADMAAAABEAAAADMAAAAAAAAzAAAAARAAAAADMAAAAAADMAAAAAEQAAAAAzAAAAAA\
				AzAAAAABEAAAAAAzAAAAADMAAAAAARAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAA\
				AAAAASEAAAAAAAAAAAAAAAAAABJBAAAAAAAAAAAAAAAAAAAUQhAAAAAAAAAAAAAAAAABJEQhEREREREREREREREREkTAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
				AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAGAAAABwAAAAw=="
		}));
		document.title = "[ Omegle ]"
		$(document.body).addClass("inconversation");

		var __storage = this.storage;

		__storage.header.grab(__storage.status);
		__storage.header.grab(__storage.hright);
			__storage.hright.grab(
				new Element("li").grab(__storage.server)
			);
			__storage.hright.grab(
				new Element("li").grab(__storage.count)
			);


		$(document.body).grab(__storage.chatbox);
		__storage.chatbox.grab(__storage.logwrapper);
			__storage.logwrapper.grab(__storage.logbox);
			__storage.logwrapper.grab(__storage.debuglog);
				__storage.debuglog.grab(__storage.debuglogwrapper);
		__storage.chatbox.grab(__storage.controlwrapper);
			__storage.controlwrapper.grab(__storage.controltable);
				__storage.controltable.grab(
					new Element("tbody").grab(
						new Element("tr").grab(__storage.chatmsgcell)
					)
				);
				__storage.chatmsgcell.grab(__storage.chatmsgwrapper);
				__storage.chatmsgwrapper.grab(__storage.textarea);
	},
	clean: function () {
		var __storage = this.storage;
		__storage.logbox.innerHTML = '';
		__storage.typecont = [];

		this.bubbleremove();
		gears["graphical"].storage.header.set("class", "");
	},
	info: function (text, prefix) {
		var _statuslog = new Element("div", {
			"class": "statuslog" + {
				"s": "",
				"f": " fail",
				"w": " win"
			}[prefix || "s"]
		});

		_statuslog.setStyle("opacity", "0");
		_statuslog.fade("in");

		_statuslog.appendText(" " + text.split("\n")[0]);
		text.split("\n").slice(1).forEach(function (newtext) {
			_statuslog.grab(new Element("br"));
			_statuslog.appendText(newtext);
		});

		return this.storage.pushlog(_statuslog);
	},
	bubble: function (_id, _obj, per) {
		var _bl = this.storage.bubblelog;
		for (var b = 0; b < _bl.length; b++) if ( _bl[b].identity === _id) {
			_bl[b].present = true;
			return _bl[b];
		}

		var _parent = new Element("div", {
			"class": "bubble-notification",
			styles: _obj.styles1,
			events: _obj.events1
		});

		_parent.grab( new Element("div", { "class": "content", "html": _obj.html }) );
		_parent.grab( new Element("div", { "class": "arrow", styles: _obj.styles2 }) );

		$(document.body).grab(_parent);

		var res = _bl.push({
			identity: _id,
			persistent: per || false,
			element: _parent,
			storage: _obj
		});
		return _bl[res - 1];
	},
	bubbleremove: function (_id) {
		var _bl = this.storage.bubblelog;
		for (var b = 0; b < _bl.length; b++) if ( !_id || _bl[b].identity == _id ) {
			if ( !_bl[b].persistent || ( _bl[b].persistent && _id ) ) {
				_bl[b].element.dispose();
				_bl.splice(b, 1);
				if ( _bl ) break;
			}
		}
	},
	question: function (text) {
		var _elem = new Element("div", {
			"class": "questione",
			"text": text
		});

		this.storage.pushlog(_elem);
	},
	message: function (object) {
		if ( !object || !( object instanceof Object ) ) return;

		var _wrapperdiv = new Element("div", {
				"class": object._class
			}),
			_logaddition = new Element("span", {
				"class": "logaddition"
			}),
			_msgsource = new Element("span", {
				"class": "msgsource"
			});

		var _t = new Date();
		_logaddition.appendText("[" + ( Cache.day < _t.getDay() ? ( Cache.day = _t.getDay(), _t.toLocaleDateString() + " " ) : "" ) + _t.toLocaleTimeString() + "]");

		_msgsource.grab(_logaddition);
		_msgsource.appendText(" ");
		_msgsource.appendText( object.mods.b + object.identity + object.mods.f );

		_wrapperdiv.grab(_msgsource);
		//_wrapperdiv.appendText(" " + object.text.split("\n")[0]);
		_wrapperdiv.grab(new Element("span").set("html", " " + object.text.split("\n")[0]));

		object.text.split("\n").slice(1).forEach(function (newtext) {
			_wrapperdiv.grab(new Element("br"))
			_wrapperdiv.grab(new Element("span").set("html", newtext));
		});
		return this.storage.pushlog(_wrapperdiv);
	},
	typing: function (_name, method) {
		this.removetyping(_name);

		var _element = this.info(_name + (( typeof method == "string" ) ? method : " is typing..."));
		this.storage.typecont.push({
			name: _name,
			element: _element
		});
	},
	removetyping: function (_name) {
		var G = this.storage.typecont;
		for (var b = 0; b < G.length; b++) if ( !_name ||G[b].name === _name ) {
			G[b].element.dispose();
			G.splice(b, 1);
			if ( _name ) break;
		}
	},
	storage: {
		typecont: [],
		bubblelog: [],
		pushlog: function (element) {
			var __offset = this.logbox.scrollTop >= this.logbox.scrollHeight - this.logbox.clientHeight;

			var _cont = new Element("div", { "class": "logitem" }).grab(element);
			if ( this.typecont.length > 0 ) {
				_cont.inject(this.typecont[0].element, "before");
			} else {
				this.logbox.grab(_cont);
			}

			if ( __offset ) {
				gears["graphical"].bubbleremove("newmsg");
				this.logbox.scrollTop = this.logbox.scrollHeight;
			} else {
				var _logbox = gears["graphical"].storage.logbox;
				var _b = gears["graphical"].bubble("newmsg", {
					html: "0 new message!",
					styles1: {
						bottom: "71px",
						cursor: "pointer",
						left: "0",
						margin: "0 auto",
						right: "0",
						width: "127px"
					},
					events1: {
						"click": function () {
							gears["graphical"].bubbleremove("newmsg");
							_logbox.removeEvents();
							_logbox.scrollTo(0, 9999999);
						}
					},
					styles2: {
						left: "0",
						margin: "0 auto",
						right: "0",
						width: "0"
					},
					n: 0
				});

				if (!_b.present) {
					_logbox.addEvent("scroll", function () {
						if ( this.scrollTop >= (this.scrollHeight - this.clientHeight) ) {
							gears["graphical"].bubbleremove("newmsg");
							this.removeEvents();
						}
					});
				}

				_b.storage.n++;
				_b.element.children[0].set("html", '<span style="color:#FF9000;">' + _b.storage.n + "</span> new message" + (_b.storage.n > 1 ? "s" : ""));
			}
			return _cont;
		},
		"contentTop": $("intro").offsetTop,
		"header": $("header"),
		"status": new Element("div", {
			id: "status",
			text: "Ready",
			"class": "sttgrn"
		}),
		"hright": new Element("ol", {
			"class": "hright"
		}),
		"server": new Element("div", {
			id: "server",
			text: Cache._server,
			"class": "sttrd"
                }),
		"count": new Element("div", {
			id: "count",
			text: "0"
		}),
		"chatbox": new Element("div", {
			"class": "chatbox"
		}),
		"logwrapper": new Element("div", {
			"class": "logwrapper",
			styles: {
				top: this.contentTop + "px"
			}
		}),
		"logbox": new Element("div", {
			"class": "logbox"
		}),
		"debuglog": new Element("div", {
			"class": "debuglog",
			styles: {
				"display": "none"
			}
		}),
		"debuglogwrapper": new Element("div", {
			"class": "debuglogwrapper"
		}),

		"controlwrapper": new Element("div", {
			"class": "controlwrapper"
		}),
		"controltable": new Element("table", {
			"class": "controltable",
			"width": "100%",
			cellpadding: "0",
			cellspacing: "0",
			border: "0"
		}),

		"chatmsgcell": new Element("td", {
			"class": "chatmsgcell"
		}),
		"chatmsgwrapper": new Element("div", {
			"class": "chatmsgwrapper"
		}),
		"textarea": new Element("textarea", {
			"class": "chatmsg",
			disabled: false,
			events: {
				focus: function () {
					gears["graphical"].storage.chatmsgwrapper.addClass("focused");
				},
				blur: function () {
					gears["graphical"].storage.chatmsgwrapper.removeClass("focused");
				},
				keydown: function (key) {
					if (key.code == 13 && !(key.shift || key.alt || key.meta)) {
						key.preventDefault();
						this.contain = null;
						gears["graphical"].bubbleremove("sugcom");
						if (!this.value) return;

						if (this.value[0] === "/") {
							handlers["send"].methods.textarea.command(this.value);
						} else if (this.value[0] === "!") {
							handlers["send"].methods.textarea.attention(this.value);
						} else {
							handlers["send"].methods.textarea.normal(this.value);
						}

						this.value = "";
					} else {
						if (key.code == 9) key.preventDefault();
						if (key.code == 9 && this.contain) {
							console.log("test")
							this.tabcount = this.tabcount + 1 || 1;
							var complete = "",
								position = this.tabcount,
								found = false;

							for (var bg = 0; bg < this.contain.length; bg++) {
								complete += this.contain[bg].title + "</br>";

								if ( !this.contain[bg].tabulary ) {
									complete += this.contain[bg].resfer + "</br>";
									if ( (bg + 1) === this.contain.length && !found ) continue;
								} else if ( ( this.contain[bg].tabulary.length < position ) || found ) {
									position -= this.contain[bg].tabulary.length;
									complete += this.contain[bg].tabulary.join(", ") + "</br>"
								} else if ( !found ) {
									var ar = this.contain[bg].tabulary.slice(0);
									ar[ position - 1 ] = '<span style="background:#DEDCDC;color:#0B0C14;">' + ar[ position - 1 ] + "</span>";
									complete += ar.join(", ") + "</br>";

									console.log(this.contain[bg].tabulary, position, this.contain[bg].tabulary[position - 1]);
									// Bad, replaces entire textarea ._.
									//this.value = this.contain[bg].tabulary[ position - 1 ];
									var val = this.value.split(" ");
									val[val.length - 1] = this.contain[bg].tabulary[ position - 1 ];
									this.value = val.join(" ");
									found = true;
								}

								if ( ( (bg + 1) === this.contain.length ) && !found ) { this.tabcount = 1; complete = ""; bg = -1; };
							}

							var _b = gears["graphical"].bubble("sugcom");
							_b.element.children[0].set("html", complete);
							if (found) return;
						}

						this.tabcount = 0;

						setTimeout(function () {
							if ( !this.value.length ) {
								this.contain = null;
								return gears["graphical"].bubbleremove("sugcom");
							}

							this.contain = [
								(function (_this, key) {
									if ( _this.value[0] === "/" ) {
										var _clist = Object.keys(handlers.send.methods.textarea.commands).sort(),
											_cname = _this.value.toLowerCase(),
											_cres = [],
											_ctab = [];

										for (var emp = 0; emp < _clist.length; emp++) {
											var cmd = "/" + _clist[emp];
											if ( cmd.substr(0, _cname.length) != _cname ) continue;

											_cres.push('<span style="background:#DEDCDC;color:#0B0C14;">' + _cname + "</span>" + cmd.substr(_cname.length));
											_ctab.push(cmd);
										}

										return { title: '<span style="color:#CD0000;">completing <span style="color:red;font-weight:700;">commands</span></span>',
											 resfer: ( _cres.length < 1 ? "No commands." : _cres.join(", ") ),
											 tabulary: ( _ctab.length < 1 ? null : _ctab ) }
									}
								})(this, key),
								(function (_this, key) {
									if ( _this.value[0] === "/" ) {
										var _mname = _this.value.toLowerCase(),
											_mres = [],
											_mtab = [];

										for (var key in modules) {
											var mdl = "/" + key;
											if ( modules[key].active === undefined ) continue;
											if ( !(mdl.substr(0, _mname.length) === _mname) ) continue;

											_mres.push('<span style="background:#DEDCDC;color:#0B0C14;">' + _mname + "</span>" + mdl.substr(_mname.length));
											_mtab.push(mdl);
										}

										return { title: '<span style="color:#CD0000;">completing <span style="color:red;font-weight:700;">modules</span></span>',
											 resfer: ( _mres.length < 1 ? "No modules." : _mres.join(", ") ),
											 tabulary: ( _mtab.length < 1 ? null : _mtab ) }
									}
								})(this, key),
								(function (_this, key) {
									var name = _this.value.split(" ")[_this.value.split(" ").length - 1].toLowerCase();
									if ( (Cache._strgname.toLowerCase().substr(0, name.length) === name) && key.code == 9 ) {
										return { title: '<span style="color:#CD0000;">completing <span style="color:red;font-weight:700;">stranger name</span></span>',
											 resfer: '<span style="background:#DEDCDC;color:#0B0C14;">' + name + "</span>" + Cache._strgname.substr(name.length),
											 tabulary: [Cache._strgname] }
									}
								})(this, key)
							].filter(function (cow) {
								if ( typeof cow === "object" ) return true;
							});

							if ( this.contain.length < 1 ) {
								this.contain = null;
								return gears["graphical"].bubbleremove("sugcom");
							}

							var result = "";
							for (xc = 0; xc < this.contain.length; xc++) result += this.contain[xc].title + "</br>" + this.contain[xc].resfer + "</br>";

							var _b = gears["graphical"].bubble("sugcom", {
									html: result,
									styles1: {
										"background-color": "rgba(11, 12, 20, 0.95)",
										bottom: "71px",
										cursor: "pointer",
										left: "7px",
										"text-align": "left"
									},
									events1: {
										"click": function () {
											this.contain = null;
											gears["graphical"].bubbleremove("sugcom");
										}
									},
									styles2: {
										"border-top": "5px solid rgba(188, 119, 98, 0.8)",
										left: "2px",
										width: "0px"
									}
								}, true);

							_b.element.children[0].set("html", result);
						}.bind( this ), 0 );
					}
				}
			}
		})
	}
}

handlers["initialize"].activate();

}

function injectElement (elname, type, content, remove) {
	var Node = document.createElement(elname);
	Node.type = type;
	Node.textContent = content;

	var targ = document.getElementsByTagName('head')[0] || document.body || document.documentElement;
	targ.appendChild(Node);
	if (remove) targ.removeChild(Node);
}
injectElement("script", "text/javascript", container.toString().replace(/^function\s?\(\)\s?{\n?\s?|\n?}$/g, ""), true);
injectElement("style", "text/css", " " +
//@font-face{font-family: 'terminus_ttf';src: url('http://files.ax86.net/terminus-ttf/4.38/TerminusMedium-4.38.ttf') format('truetype');font-weight: normal;font-style: normal;}
//@font-face{font-family: 'terminus_ttfbold';src: url('http://misc.nybergh.net/pub/fonts/terminus/ttf/TerminusBold.ttf') format('truetype');font-weight: normal;font-style: normal;}
"#footer,#sharebuttons,#logo img,#adwrapper,#onlinecount,#mobilesitenote,#tagline img{display:none!important;}\
#header{background:none repeat scroll 0 0 #575656;height:8px;position:relative;}\
#header.n{border-bottom:3px solid #F19E24;}\
#header.p{border-bottom:3px solid #8BBC64;}\
#header.z{border-bottom:3px solid #D74A4A;}\
#intro{margin-right:1em!important;}" +
/*
#onlinecount{font-size:.6em!important;position:relative;}\
#onlinecount.tweening strong{color:inherit;}\
#onlinecount.wrp{font-size:.6em!important;position:relative;right:0;}\
*/
"#count{color:#9CF;font-size:.6em;font-weight:700;}\
#server{font-size:.6em;font-weight:700;}\
#status{color:#FFF;font-size:.7em!important;font-weight:700;left:1em;position:absolute;top:1px!important;}\
.bubble-notification{background-color:rgba(22,22,22,0.8);border-color:#D7CDCD;border-radius:4px 4px 4px 4px;border-style:solid;border-width:2px;overflow:visible;padding:3px;position:absolute;text-align:center;}\
.bubble-notification .arrow{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid rgba(112,109,181,0.8);bottom:-5px;height:0;position:absolute;width:0;}\
.bubble-notification .content{color:#DEDCDC;display:block;font-size:11px;line-height:15px;margin:0;padding:0;}\
.chatmsg{font-family:Verdana, sans-serif!important;height:56px!important;}\
.chatmsgwrapper{border-color:#A0A0A0#B9B9B9#B9B9B9;border-style:solid;border-width:1px;height:56px!important;padding:2px!important;}\
.chatmsgwrapper.focused{border-color:#D96363!important;}\
.chatmsgwrapper:hover{border-color:#999;}\
.controlwrapper{bottom:2px!important;height:62px!important;left:2px!important;margin-right:-2px!important;padding-right:0!important;right:2px!important;}\
.debugitem{font-size:.9em;margin:0;padding:0;}\
.debugitem.baron{color:#FF8989;}\
.debugitem.event{color:#83D3EE;}\
.debugitem.generic{color:#FFF;}\
.debugitem.oevent{color:#EED583;}\
.debugitem.welcome{color:#AFFC47;}\
.debuglog{background:none repeat scroll 0 0 rgba(38,34,54,0.72);border:2px solid #AEB075;bottom:74px;font-family:Monospace;height:20%;left:10px;position:fixed;right:10px;margin:0;}\
.debuglogwrapper{height:100%;margin-left:4px;overflow:auto;}\
.hright{margin:0;padding:0;position:absolute;right:1em;top:-3px;}\
.hright > li{display:inline-block;padding-left:8px;}\
.logaddition{color:#716969!important;font-weight:700;}\
.logbox{font-size:.9em;left:0!important;margin-left:2px;top:0!important;}\
.logitem{padding-bottom:0;}\
.logwrapper{background-attachment:fixed;background-image:url(http://i.imgur.com/iulOYn5.png);background-position:90% 50%;background-repeat:no-repeat;border-top-left-radius:0!important;border-top-right-radius:0!important;bottom:66px!important;margin-right:-2px!important;font-family:'Terminus (TTF)',terminus;left:2px!important;right:2px!important;top:19px!important;}\
.msgsource + span{white-space:pre-wrap;}\
.questione{background-color:#F0F3FC;font:small sans-serif,Helvetica,'dejavu sans',tahoma,fantasy;margin-bottom:3px;margin-top:3px;outline:1px dashed #888;overflow:hidden;padding:3px;}\
.statuslog{color:#777!important;font-size:.8em;}\
.statuslog.fail{color:#AB2626!important;}\
.statuslog.win{color:#207D11!important;}\
.strangeramsg .msgsource{color:#118203!important;font-weight:400!important;}\
.strangermsg .msgsource{color:blue!important;font-weight:400!important;}"+
//.sttblu{color:#6987dd!important;}
".sttgrn{color:#96dd69!important;}\
.sttrd{color:#dd696c!important;}\
.youmsg .msgsource{color:red;font-weight:700!important;}\
a{text-decoration:none;}\
a.stlink:hover{background-color:#daddef;border-radius:.01em .5em .01em .5em;font-size:1.08em;padding:2px;}\
body{background:none repeat scroll 0 0 #CBCDD7;font-family:Verdana, sans-serif!important;}\
div,ul,li,form,input,p{margin:0;padding:0;}\
h2 a:hover,.questione .buttons a:hover{text-decoration:underline;}");
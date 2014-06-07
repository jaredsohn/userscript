// ==UserScript==
// @name           Includes : WinConfig
// @namespace      http://gm.wesley.eti.br/includes
// @description    WinConfig Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        2.0.0.0
// @language       en
// @include        nowhere
// @resource       winConfigCss http://pastebin.com/download.php?i=rHDg6Nyt
// @require        http://userscripts.org/scripts/source/54389.user.js
// @history        2.0.0.0 Removed multiline strings due to recent firefox update
// ==/UserScript==

const WinConfig = function () {};
WinConfig.loadDefaultCss = function() {
	GM_addStyle(GM_getResourceText("winConfigCss"));
};
WinConfig.init = function (opts) {
	return new (function (opts) {
		this.Name = opts.name || "";
		this.Type = opts.type || "";
		this.Class = opts.class || "";
		this.LoadValues = ( typeof opts.load_values == "undefined" ? true : opts.load_values );
		this.Title = opts.title || (function (type) {
			switch (type) {
			case "prompt":
				return "Prompt Dialog";
			case "question":
				return "Question Dialog";
			case "warning":
				return "Warning Dialog";
			case "error":
				return "Error Dialog";
			case "explanation":
				return "Explanation Dialog";
			default:
				return "Settings";
			}
		})(this.Type);
		this.Description = opts.description||"";
		this.Position = opts.position||[-1,-1];
		this.Size = opts.size||["300px",0];
		this.Rendered = null;
		this.Parent = document.getElementsByTagName("body")[0];
		var buttons = (function(type) {
			switch (type) {
			case "prompt":
				return {"ok":{"value":"OK","events":{"click":opts.positiveCallback||function(win,obj){win.FadeOut();}}},"cancel":{"value":"Cancel","events":{"click":opts.negativeCallback||function(win,obj){win.FadeOut(0);}}}};
			case "warning":
			case "error":
			case "explanation":
				return {"ok":{"value":"OK","events":{"click":opts.positiveCallback||function(win,obj){win.FadeOut(0);}}}};
			case "question":
				return {"ok":{"value":"Yes","events":{"click":opts.positiveCallback||function(win,obj){win.FadeOut(0);}}},"cancel":{"value":"No","events":{"click":opts.negativeCallback||function(win,obj){win.FadeOut(0);}}}};
			default:
				return {"ok":{"value":"Save","events":{"click":opts.positiveCallback||function(win,obj){win.Save();win.FadeOut();}}},"cancel":{"value":"Cancel","events":{"click":opts.negativeCallback||function(win,obj){win.FadeOut(0);}}}};
			}
		})(this.Type);
		for ( var button_name in opts.buttons) {
			var button_obj = opts.buttons[button_name];
			if (button_name in buttons) {
				if (typeof button_obj.value != "undefined")
					buttons[button_name].value = button_obj.value;
				for ( var event_name in button_obj.events ) {
					var event_obj = button_obj.events[event_name];
					buttons[button_name].events[event_name] = event_obj;
				}
			} else {
				buttons[button_name] = button_obj;
			}
		}
		this.Button = new (function Buttons(opts) {
			this.List = {};

			this.Add = function(name, opts) {
				this.List[name] = new (function Button (opts) {
					this.Value = opts.value || "";
					this.Event = new (function Events(opts) {
						this.List = {};

						this.Add = function (name, opts) {
							if (!(name in this.List))
								this.List[name] = [];

							this.List[name].push(opts);
						}
						this.Remove = function (name, opts) {
							if (name in this.List)
								for ( var at = this.List[name].length - 1 ; ~at ; --at )
									if (this.List[name][at] == opts) {
										this.List[name] = this.List[name].splice(at,1);
										break;
									}
						}

						for ( var name in opts )
							this.Add(name, opts[name]);
					})(opts.events);
				})(opts);
			};
			this.Remove = function (name) {
				if (name in this.List)
					delete this.List[name];
			}

			for ( var name in opts)
				this.Add(name, opts[name]);
		})(buttons);

		var sessions = (function (type, prefix, load) {
			switch (type) {
				case "prompt":
					return {"default":{"fields":{"text":{"value":load && GM_getValue(prefix+"-text","")||""}}}};
				default:
					return {};
			}
		})(this.Type,this.Name,this.LoadValues);
		for ( var session_name in opts.sessions ) {
			var session_obj = opts.sessions[session_name];
			if (session_name in sessions) {
				for ( var field_name in session_obj.fields ) {
					var field_obj = session_obj.fields[field_name];
					if (field_name in sessions[session_name]) {
						if (typeof field_obj.value != "undefined")
							sessions[session_name].fields[field_name].value = field_obj.value;
					} else {
						sessions[session_name].fields[field_name] = field_obj;
					}
				}
			} else {
				sessions[session_name] = session_obj;
			}
		}

		this.Session = new (function Sessions (opts, prefix, load) {
			/* propriedades/metodos de funcionalidade comum a todas as sessoes, por exemplo: o estilo padrão, o tipo de organização em tabs ou não */
			this.List = {};

			this.Add = function(name, opts) {
				this.List[name] = new (function Session(opts) {
					this.AlternatingClasses = opts.classes || [];
					this.Title = opts.title || "";
					this.Description = opts.description || "";

					this.Field = new (function Fields(opts, prefix, load) {
						/* propriedades/metodos de funcionalidade comum a todos os campos, por exemplo: o estilo padrão */
						this.List = {};

						this.Add = function(name, opts) {
							this.List[name] = new (function Field(opts,prefix,load) {
								/* label,value,type, ... */
								this.Type = opts.type||( "list" in opts ? "array" : "string" );
								this.Label = opts.label||"";
								this.Help = opts.help||"";
								this.isHidden = (typeof opts.is_hidden == "undefined" ? false : opts.is_hidden);

								switch (this.Type) {
									case "boolean":
//										this.isChecked = opts.is_checked||false;
										break;
									case "int":
										break;
									case "string":
										this.isMulti = (typeof opts.is_multi == "undefined" ? false : opts.is_multi);
										break;
									case "array":
										this.isSelect = (typeof opts.is_select == "undefined" ? true : opts.is_select);
										this.isMulti = (typeof opts.is_multi == "undefined" ? false : opts.is_multi);
										this.List = opts.list||{};
										break;
								}
								if (this.Type == "array" && this.isMulti)
									this.Value = opts.value||load && eval(GM_getValue(prefix+"-"+name,"[]"))||opts.default||[];
								else
									this.Value = opts.value||load && GM_getValue(prefix+"-"+name,"")||opts.default||"";
							})(opts,prefix,load);
						};

						this.Remove = function(name) {
							if (name in this.List)
								delete this.List[name];
						};

						for (var name in opts)
							this.Add(name, opts[name]);
					})(opts.fields||{},prefix,load);
				})(opts);
			};

			this.Remove = function (name) {
				if (name in this.List)
					delete this.List[name];
			};

			for (var name in opts)
				this.Add(name, opts[name]);
		})(sessions,this.Name,this.LoadValues);

		this.Open = function (parent) {
			var main = document.createElement("form");
			main.style.display = "block";
			main.setAttribute("onsubmit","return false");
			main.className = "winconfig "+this.Class+" "+this.Type;
			main.style.width = this.Size[0];
			main.style.maxWidth = this.Size[0];
			if (this.Size[1]) {
				main.style.height = this.Size[1];
				main.style.maxHeight = this.Size[1];
			}
			var head = document.createElement("div");
			main.appendChild(head);
			head.className = "head";
			if (this.Title) {
				var title = document.createElement("div");
				title.className = "title";
				title.textContent = this.Title;
				head.appendChild(title);
			}
			if (this.Description) {
				var description = document.createElement("div");
				description.className = "description";
				description.innerHTML = this.Description;
				head.appendChild(description);
			}

			var body = document.createElement("div");
			body.className = "body";
			var sessions = document.createElement("div");
			sessions.className = "sessions";
			body.appendChild(sessions);
			for ( var session_name in this.Session.List ) {
				var session_obj = this.Session.List[session_name];
				var session = document.createElement("div");
				session.className = "session "+session_name;
				if (session_obj.Title) {
					var title = document.createElement("div");
					title.className = "title";
					title.textContent = session_obj.Title;
					session.appendChild(title);
				}
				if (session_obj.Description) {
					var description = document.createElement("div");
					description.className = "description";
					description.textContent = session_obj.Description;
					session.appendChild(description);
				}
				var alt_classes = 0;
				for ( var field_name in session_obj.Field.List ) {
					var field_obj = session_obj.Field.List[field_name];

					var field = document.createElement("div");
					var label = document.createElement("label");
					label.innerHTML = field_obj.Label;
					field.appendChild(label);
					var help = document.createElement("div");
					if (field_obj.Help) {
						var img = document.createElement("img");
						img.src= "data:image/gif;base64,R0lGODlhDgAOAOYAAAAckqu93jCC1QBmzN7n82iBwmCCwc3V6jFhtSVXrwBDtgCC6VzI/3aq4R5ty+/y+aLM8F2T1DOR5AA+qG+b0wBSvM3m+kh5w4mp2wBz297u/EqEzXmf11uc3COO5RdbuLLI5h+Y9f///zJ90AApnQBt1BdLp83s/0huuGCn5uf2/83c8Wid3SlyyGaLyD6C0AB156XD6ABbzXWLxS9UqeHs+EqQ13Oy62i69wCM+vn4+ZW44kCZ5gBKtypds87g9WuUxQBq5Cl70AJHrAAyp+Px+wFZv05zutnj8nWY04en1nmp4096wHWo4tn0/wZhxeTq9LvN6GSt62GKy0CM2QB77gBIvwB74ipYrOXu+K295s7Z7iN0zQBCqtfg72SEwun+/2CW1mCf3qvJ6gAzmQAgkwCB7HOv56rO8Gul3il1ynmPxkqU1vz4+Zu54ABbxnaf1P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAHEALAAAAAAOAA4AAAe9gHGCP2JCXFxqYSuCjEs2EBYaGj8xGxyMTU1OODw3N1RpRXBJcT82YCEpIm1tIhEOGhdbYmgMQQQiAlwiSAodAVNCKjlmHhJvMSJuCgpZPiNOVQswMjsiID09RFkJLycwVxlPIg8K2STcLSrhJRVRSl09E2RQWGFjUjIDRlMuQ11lvgQwsGJDEQFWPogQYQIADSgoDsTBQKEIiyFMjpApAAXIDEZKLmipscULlAAo1jAStGWKDwQJsBiQKCgQADs=";
						img.addEventListener("click",(function (field) {
							return function() {
								WinConfig.init({"type":"explanation","size":["450px",0],"title":field.Label,"description":"<pre>"+field.Help+"</pre>"}).Open().FadeIn(0);
							};
						})(field_obj), false);
						help.appendChild(img);
					}
					else help.innerHTML = "&nbsp;";
					help.className = "help";
					field.appendChild(help);
					var ac = session_obj.AlternatingClasses;
					field.className = field_name+" field "+(ac && ac.length && ac[alt_classes++ % ac.length]||"");
					var input;
					switch (field_obj.Type) {
						case "boolean":
							input = document.createElement("input");
							input.type = "checkbox";
							input.checked = !!field_obj.Value;
							field.appendChild(input);
							break;
						case "int":
							input = document.createElement("input");
							input.type = "text";
							input.value = field_obj.Value;
							field.appendChild(input);
							break;
						case "string":
							if (field_obj.isMulti)
							{
								input = document.createElement("textarea");
								input.innerHTML = field_obj.Value;
							}
							else
							{
								input = document.createElement("input");
								input.type = "text";
								input.value = field_obj.Value;
							}
							field.appendChild(input);
							break;
						case "password":
							input = document.createElement("input");
							input.type = "password";
							input.value = field_obj.Value;
							field.appendChild(input);
							break;
						case "array":
							if (field_obj.isSelect) {
								input = document.createElement("select");
								input.multiple = field_obj.isMulti;
								for ( var name in field_obj.List ) {
									var option = document.createElement("option");
									option.value = name;
									option.textContent = field_obj.List[name];
									option.selected = in_array(option.value, field_obj.Value);
									input.appendChild(option);
								}
								field.appendChild(input);
							} else {
								input = document.createElement("input");
								input.type = ( field_obj.isMulti ? "checkbox" : "radio" );
								input.name = field_name + ( field_obj.isMulti && !field_obj.isSelect ? "[]" : "" );
								for ( var name in field_obj.List ) {
									var option = input.cloneNode(true);
									option.title = field_obj.List[name];
									option.value = name;
									option.checked = in_array(name, field_obj.Value);
									field.appendChild(option);
								}
							}
							break;
					}
					input.name = field_name;
					session.appendChild(field);
				}
				sessions.appendChild(session);
			}
			main.appendChild(body);

			var foot = document.createElement("div");
			foot.className = "foot";
			foot.innerHTML = "<br />";
			var buttons = document.createElement("div");
			buttons.className = "buttons";
			for ( var button_name in this.Button.List ) {
				var button_obj = this.Button.List[button_name];

				var button = document.createElement("input");
//				button.type = ( /^ok$/i.test(button_name) ? "submit" : "button" );
				button.type = "button";
				button.name = button_name;
				if (button_obj.Value) {
					button.value = button_obj.Value;
				}
				for ( var event_name in button_obj.Event.List ) {
					var event_obj = button_obj.Event.List[event_name];
					for ( var ai = 0 , at = event_obj.length ; ai < at ; ++ai )
						button.addEventListener(event_name, (function(method, params) {
							return function(e) {
								params.push(e.target);
								method.apply(this, params);
							};
						})(event_obj[ai],[this]), false);
				}
				buttons.appendChild(button);
			}
			foot.appendChild(buttons);
			main.appendChild(foot);

			if (parent)
				this.Parent = parent;

			var o = document.createElement("div");
			o.className = "opaque";
			this.Parent.appendChild(o);
			this.Opaque = o;

			main.style.opacity = 0;
			this.Parent.appendChild(main);
			main.style.left = ( this.Position[0] == -1 ? Math.floor((window.innerWidth/2)-(main.offsetWidth/2)) : this.Position[0] ) + "px";
			main.style.top = ( this.Position[1] == -1 ? Math.floor((window.innerHeight/2)-(main.offsetHeight/2)): this.Position[1] ) + "px";
			main.addEventListener("keypress", (function(w) {
				return function(e) {
					if (e.keyCode == 27) {
						w.FadeOut(0);
					}
				}
			})(this),false);
			
			this.Rendered = main;

			return this;
		};
		this.Save = function () {
			for ( var session_name in this.Session.List ) {
				var session_obj = this.Session.List[session_name];
				for ( var field_name in session_obj.Field.List ) {
					var field_obj = session_obj.Field.List[field_name];
					var obj = this.Rendered.elements.namedItem(field_name + ( field_obj.Type=="array" && field_obj.isMulti && !field_obj.isSelect ? "[]" : "" ) );
					var sv;
					switch (field_obj.Type) {
					case "int":
						sv = parseInt(obj.value, 10);
						if (isNaN(sv)) {
							var msg = "Field '"+field_obj.Label+"' must be integer";
							WinConfig.init({"type":"error","description":"<br />"+msg}).Open().FadeIn(0);
							throw msg;
						}
						break;
					case "boolean":
						sv = obj.checked;
						break;
					case "array":
						sv = [];
						if (field_obj.isMulti) {
							if (field_obj.isSelect)
							for ( var ai = 0 , at = obj.options.length ;ai < at ; ++ai ) {
								if (obj.options[ai].selected)
									sv.push(obj.options[ai].value);
							} else {
								for ( ; obj ; obj = obj.nextSibling ) {
									if (obj.checked)
										sv.push(obj.value);
								}
							}
						}
						else if (field_obj.isSelect)
							sv.push(obj.options[obj.selectedIndex].value);
						else
							for ( ; obj ; obj = obj.nextSibling ) {
								if (obj.checked) {
									sv.push(obj.value);
									break;
								}
							}
						sv = uneval(sv);
						break;
					default:
						sv = obj.value;
						break;
					}
					GM_setValue(this.Name +"-"+ field_name,sv);
				}
			}

			return this;
		};
		this.Close = function () {
			this.Parent.removeChild(this.Rendered);
			this.Rendered = null;
			this.Parent.removeChild(this.Opaque);
			this.Opaque = null;

			return this;
		};
		this.FadeIn = function (time, interval) {
			if (typeof time == "undefined")
				time = 900;
			else if (!time)
				time = 1;
			if (typeof interval == "undefined")
				interval = 60;
			else if (!interval)
				interval = 1;
			this.Rendered.style.opacity = 0;
			this.Opaque.style.display = "block";
			(function recursive (node, time,interval) {
				node.style.opacity = 1 * node.style.opacity + 1/(time/interval);
				if (node.style.opacity < 1)
				setTimeout(recursive,interval,node,time,interval);
				else
				node.style.display = "block";
			})(this.Rendered, time, interval);

			return this;
		};
		this.FadeOut = function (time, interval) {
			if (typeof time == "undefined")
				time = 900;
			else if (!time)
				time = 1;
			if (typeof interval == "undefined")
				interval = 60;
			else if (!interval)
				interval = 1;
			this.Rendered.style.opacity = 1;
			(function recursive(obj, time, interval) {
				obj.Rendered.style.opacity -= 1/(time/interval);
				if (obj.Rendered.style.opacity > 0)
				setTimeout(recursive,interval,obj,time,interval);
				else {
					obj.Close(obj.Rendered.parentNode);
//					obj.Rendered.parentNode.removeChild(obj.Rendered);
//					obj.Opaque.parentNode.removeChild(obj.Opaque);
				}
			})(this, time, interval);

			return this;
		}
	})(opts);
};
/*
WinConfig.loadDefaultCss();
WinConfig.init({
	"type":"explanation",
	"description":"<br />Some king of explanation."
}).Open().FadeIn(0);
WinConfig.init({
	"type":"warning",
	"description":"<br />Something has happened!"
}).Open().FadeIn(0);
WinConfig.init({
	"type":"question",
	"description":"<br />Are you sure you want to proceed?"
}).Open().FadeIn(0);
WinConfig.init({
	"type":"error",
	"description":"<br />An error has occurred!"
}).Open().FadeIn(0);
WinConfig.init({
	"type":"prompt",
	"description":"<br />Type something",
	"positiveCallback":function(w,e)
	{
		alert(w.Name+"-text = "+e.form.elements.namedItem("text").value);
		w.FadeOut();
	}
}).Open().FadeIn(0);
WinConfig.init({
//	"name":"TrainingSchool-"+NeopetsDocument.Username,
	"title":"Training Shool : Configuration",
	"size":["510px",0],
	"description":"<br />",
	"sessions":{
		"default":{
			"fields":{
				"TempTrainingList":{"label":"Training List","help":"Training.All\t\tTrains everything\nTraining.Strength|Training.Defence\tTrains both Strength or Defence\nTraining.All&~(Training.Level)\tTrains everything except Level","default":"pet_name1:Training.All\r\npet_name2:Training.Strength|Training.Defence\r\npet_name3:Training.All&~(Training.Level)","is_multi":true},
				"PinNumber":{"label":"Pin Number","type":"password"},
				"SearchForCodestone":{"label":"Search for codestones?","type":"boolean","default":true},
				"WithdrawNp":{"label":"Withdraw Neopoints?","type":"boolean","default":true}
			}
		}
	},
	"positiveCallback":function(w,e)
	{
		var pets = e.form.elements.namedItem("TempTrainingList").textContent.split(/[\r\n]+/);
		var obj = {};
		for ( var ai = 0 , at =pets.length ; ai < at ; ++ai )
		{
			var pet = pets[ai].split(":",2);
			obj[pet[0]] = pet[1].replace(/:/g,"|");
		}
		GM_setValue(w.Name+"-TrainingList",uneval(obj));
		var pin = e.form.elements.namedItem("PinNumber").value;
		if (pin && !/^\d{4}$/.test(pin))
		{
			var msg = "Field 'Pin Number' must be a 4-digit number";
			WinConfig.init({"type":"error","description":"<br />"+msg}).Open().FadeIn(0);
			throw msg;
		}
		w.Save();
		w.FadeOut();
	}
}).Open().FadeIn();
*/

// ==UserScript==
// @name           Includes : WinConfig
// @namespace      http://gm.wesley.eti.br
// @description    WinConfig Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.7.0
// @language       en
// @include        nowhere
// @exclude        *
// @icon           http://gm.wesley.eti.br/icon.php?desc=163374
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_getResourceText
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

GM_addStyle(GM_getResourceText("winConfigCss"));

var WinConfig = function (params) {
	this.name = ("title" in params) && params.title.replace(/[^\w]+/g, "") || "default";
	this.type = ("type" in params) && params.type || WinConfig.WindowType.CUSTOM;
	this.description = "";
	this.position = [-1, -1];
	this.size = ["280px", 0];
	this.document = document.body;
	this.store = false;
	this.parent = null;
	this.children = [];

	this.buttons = (function (type) {
		switch (type) {
			case WinConfig.WindowType.PROMPT:
				return WinConfig.WindowButton.OK | WinConfig.WindowButton.CANCEL;
			case WinConfig.WindowType.QUESTION:
				return WinConfig.WindowButton.YES | WinConfig.WindowButton.NO;
			case WinConfig.WindowType.WARNING:
			case WinConfig.WindowType.ERROR:
			case WinConfig.WindowType.SUCCESS:
			case WinConfig.WindowType.EXPLANATION:
				return WinConfig.WindowButton.OK;
			case WinConfig.WindowType.CUSTOM:
				return WinConfig.WindowButton.SAVE | WinConfig.WindowButton.RESET | WinConfig.WindowButton.CANCEL;
		}
	}(this.type));

	this.title = (function (type) {
		switch (type) {
			case WinConfig.WindowType.PROMPT:
				return "Prompt Dialog";
			case WinConfig.WindowType.QUESTION:
				return "Question Dialog";
			case WinConfig.WindowType.WARNING:
				return "Warning Dialog";
			case WinConfig.WindowType.ERROR:
				return "Error Dialog";
			case WinConfig.WindowType.EXPLANATION:
				return "Explanation Dialog";
			case WinConfig.WindowType.SUCCESS:
				return "Success Dialog";
			case WinConfig.WindowType.CUSTOM:
				return "Settings";
		}
	}(this.type));
	
	if (WinConfig.WindowType.PROMPT == this.type) {
		this.fields = [{
			focused	: true,
			name	: "text",
		}];
	} else if (WinConfig.WindowType.CUSTOM == this.type) {
		this.store = true;
	}

	for (var p in params) {
		this[p] = params[p];
	}
	
	var _close = function () {
		if (!this.children.length) {
			if (this.parent) {
				this.parent.children.splice(this.parent.children.indexOf(this), 1);
			}

			main.parentNode.removeChild(main);
			opaque.parentNode.removeChild(opaque);

			WinConfig.__openedWindows.splice(WinConfig.__openedWindows.indexOf(this), 1);
		}
	}.bind(this),
	main = this.form = document.createElement("form"),
	opaque = document.createElement("div"),
	head = document.createElement("div"),
	body = document.createElement("div"),
	foot = document.createElement("div"),
	addEvent = function (input, event, func, _this, params) {
		input.addEventListener(event, function (e) {
			func.apply(_this, [e].concat(params));
		}, false);
	},
	focusedInput,
	buttons = [],
	vn = "version-" + this.name,
	config = {},
	_this = this,
	tmpButton = [["OK", 1, true], ["Yes", 1, true], ["Save", 1, true], ["Submit", 1, true], ["Cancel", 0], ["No", 0], ["Reset", 2]],
	drag = [false, 0, 0],
	tb = function (t) {
		return [["button", function () {
			this.close();
		}],["submit", function () {
			var _config = (function recursive (_this) {
				var cfg = {};

				for (var ai in _this.fields) {
					var field = _this.fields[ai];

					for (var bi in field.elements) {
						var elem = field.elements[bi];

						if (WinConfig.FieldType.GROUP == field.type) {
							var x = recursive(field);

							if (!(field.name in cfg)) {
								cfg[field.name] = {};
							}

							for (var ai in x) {
								cfg[field.name][ai] = x[ai];
							}
						} else if (WinConfig.FieldType.CHECK == field.type) {
							if (elem.checked) {
								if (field.multiple && field.value instanceof Array && field.value.length > 1) {
									if (WinConfig.FieldFormat.NUMBER & field.format) {
										cfg[field.name] |= elem.value;
									} else if (WinConfig.FieldFormat.BOOLEAN & field.format) {
										if (field.name in cfg) {
											cfg[field.name].push(elem.value == "true");
										} else {
											cfg[field.name] = [elem.value == "true"];
										}
									} else if (field.name in cfg) {
										cfg[field.name].push(elem.value);
									} else {
										cfg[field.name] = [elem.value];
									}
								} else {
									var o = elem.value;

									if (WinConfig.FieldFormat.BOOLEAN & field.format) {
										cfg[field.name] = (o == "true" || !isNaN(o) && !!parseInt(o, 10));
									} else if (WinConfig.FieldFormat.NUMBER & field.format) {
										cfg[field.name] = parseInt(o, 10);
									} else {
										cfg[field.name] = o;
									}
								}
							} else if (!(field.name in cfg)) {
								if ("empty" in field) {
									if (!field.multiple || (WinConfig.FieldFormat.NUMBER & field.format) || (true === field.value) || (field.value instanceof Array && 1 == field.value.length)) {
										cfg[field.name] = field.empty;
									} else {
										cfg[field.name] = [field.empty];
									}
								} else if (WinConfig.FieldFormat.NUMBER & field.format) {
									cfg[field.name] = 0;
								} else if (field.multiple) {
									cfg[field.name] = [];
								}
							}
						} else if (WinConfig.FieldType.SELECT == field.type) {
							if (~elem.selectedIndex) {
								if (field.multiple) {
									for (var ci in field.value) {
										var e = field.value[ci].elements[0];

										if (e.selected) {
											if (field.unique && (WinConfig.FieldFormat.NUMBER & field.format)) {
												cfg[field.name] |= e.value;
											} else {
												var o = e.value;
												if (WinConfig.FieldFormat.BOOLEAN & field.format) {
													o = (o == "true" || !isNaN(o) && !!parseInt(o, 10))
												} else if (WinConfig.FieldFormat.NUMBER & field.format) {
													o = parseInt(o, 10);
												}

												if (field.name in cfg) {
													cfg[field.name].push(o);
												} else {
													cfg[field.name] = [o];
												}
											}
										}
									}
								} else {
									var o = elem.options[elem.selectedIndex].value;

									if (WinConfig.FieldFormat.BOOLEAN & field.format) {
										cfg[field.name] = (o == "true" || !isNaN(o) && !!parseInt(o, 10));
									} else if (WinConfig.FieldFormat.NUMBER & field.format) {
										cfg[field.name] = parseInt(o, 10);
									} else {
										cfg[field.name] = o;
									}
								}
							} else if (!(field.name in cfg)) {
								if ("empty" in field) {
									cfg[field.name] = field.empty;
								} else if (WinConfig.FieldFormat.NUMBER & field.format) {
									cfg[field.name] = 0;
								} else if (field.multiple) {
									cfg[field.name] = [];
								}
							}
						} else if (WinConfig.FieldType.TEXT == field.type && (WinConfig.FieldFormat.ARRAY & field.format)) {
							var arr = elem.value.split("\n");
							if (WinConfig.FieldFormat.NUMBER & field.format) {
								arr = arr.map(function (v) {
									return parseInt(v, 10);
								});
							} else if (WinConfig.FieldFormat.BOOLEAN & field.format) {
								arr = arr.map(function (v) {
									return (v == "true" || !isNaN(v) && !!parseInt(v, 10));
								});
							}
							cfg[field.name] = arr;
						} else if (WinConfig.FieldType.TEXT == field.type || WinConfig.FieldType.HIDDEN == field.type || WinConfig.FieldType.PASSWORD == field.type) {
							var x;
							if (WinConfig.FieldFormat.NUMBER & field.format) {
								if (elem.value) {
									x = parseInt(elem.value, 10);
								} else if ("empty" in field) {
									x = field.empty;
								}
							} else {
								x = elem.value;
							}

							if (WinConfig.FieldFormat.ARRAY & field.format) {
								if (field.name in cfg) {
									cfg[field.name].push(x);
								} else {
									cfg[field.name] = [x];
								}
							} else {
								cfg[field.name] = x;
							}
						}
					}
				}

				if (_this.store) {
					GM_setValue(vn, GM_info.script.version);
				}
				
				return cfg;
			}(this, {}));

			var tmpConfig = JSON.parse(JSON.stringify(config)),
			xClose = true;

			if ("group" in this) {
				tmpConfig[this.group] = _config;
			} else {
				tmpConfig = _config;
			}

			if ("load" in this) {
				xClose = (false !== this.load(tmpConfig));
			}

			if (xClose) {
				if (this.store) {
					GM_setValue("config-" + this.name, JSON.stringify(config = tmpConfig));
				}

				_close();
			}
		}],["reset", function () {
		}]][t];
	};
	
	this.get = function (v, d) {
		if ("group" in this) {
			return (this.group in config && v in config[this.group]?config[this.group][v]:d);
		} else {
			return (v in config?config[v]:d);
		}
	}

	for (var ai in tmpButton) {
		var btn = tmpButton[ai],
		p2ai = Math.pow(2, ai);

		if (this.buttons & p2ai) {
			var b = tb(btn[1]),
			t = {
				type	: b[0],
				value	: btn[0],
				focused	: !!(params.focus?params.focus == p2ai:btn[2]),
				events	: {
					click	: b[1],
				},
			};

			buttons.push(t);
		}
	}
	
	main.setAttribute("class", "winconfig winConfig_" + this.name + " " + ["", "error", "explanation", "question", "prompt", "warning", "success"][this.type]);
	head.setAttribute("class", "head");
	body.setAttribute("class", "body");
	foot.setAttribute("class", "foot");
	opaque.setAttribute("class", "opaque");

	main.style.width = this.size[0];
	main.style.maxWidth = this.size[0];
	if (this.size[1]) {
		main.style.height = this.size[1];
		main.style.maxHeight = this.size[1];
	}

	if (this.title) {
		var title = document.createElement("div");
		title.setAttribute("class", "title");
		title.textContent = this.title;
		head.appendChild(title);
	}
	if (this.description) {
		var desc = document.createElement("div");
		desc.setAttribute("class", "description");
		desc.innerHTML = this.description;
		head.appendChild(desc);
	}
	
	for (var ai in buttons) {
		var button = buttons[ai],
		input = document.createElement("input");

		input.setAttribute("type", button.type);
		input.setAttribute("value", button.value);
		if (button.focused) {
			input.setAttribute("default", "default");
			focusedInput = input;
		}
		
		for (var bi in button.events) {
			addEvent(input, bi, button.events[bi], _this);
		}
		
		foot.appendChild(input);
	}

	this.open = function () {
		WinConfig.__openedWindows.push(this);

		if (this.parent) {
			this.parent.children.push(this);
		}
	
		this.document.appendChild(opaque);
		this.document.appendChild(main);

		(function recursive (_this, cfg) {
			for (var ai in _this.fields) {
				var field = _this.fields[ai];

				if (field.name in cfg) {
					var c = cfg[field.name];

					for (var bi in field.elements) {
						var elem = field.elements[bi];

						if (WinConfig.FieldType.GROUP == field.type) {
							recursive(field, c);
						} else if (WinConfig.FieldType.CHECK == field.type) {
							var tmp = elem.checked;
							if (field.unique && (WinConfig.FieldFormat.NUMBER & field.format)) {
								tmp = !(elem.value & ~(c & elem.value));
							} else if (c instanceof Array) {
								tmp = false;

								for (var ci in c) {
									if (c[ci] == elem.value) {
										tmp = true;
										break;
									}
								}
							} else {
								tmp = (String(c) == elem.value);
							}

							if (elem.checked != tmp) {
								elem.click();
//								elem.checked = tmp;
							}
						} else if (WinConfig.FieldType.SELECT == field.type) {
							for (var di in field.value) {
								var elem2 = field.value[di].elements[0],
								tmp = elem2.selected;

								if (field.unique && (WinConfig.FieldFormat.NUMBER & field.format)) {
									tmp = !(elem2.value & ~(c & elem2.value));
								} else if (c instanceof Array) {
									tmp = false;

									for (var ci in c) {
										if (c[ci] == elem2.value) {
											tmp = true;
											break;
										}
									}
								} else {
									tmp = (c == elem2.value);
								}

								if (elem2.selected != tmp) {
									elem2.selected = tmp;

//									elem2.click();
//									var evObj = document.createEvent("MouseEvents");
//									evObj.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
//									elem2.dispatchEvent(evObj);
								}
							}
						} else if (WinConfig.FieldType.TEXT == field.type && (WinConfig.FieldFormat.ARRAY & field.format)) {
							elem.value = c.join("\n");
						} else if (WinConfig.FieldType.TEXT == field.type || WinConfig.FieldType.HIDDEN == field.type || WinConfig.FieldType.PASSWORD == field.type) {
							elem.value = c;
						}
					}
				}
			}
		}(this, (this.group in config?config[this.group]:config)));
	
		main.style.left = (this.position[0] == -1 ? Math.floor((window.innerWidth / 2) - (main.offsetWidth / 2)) : this.position[0]) + "px";
		main.style.top = (this.position[1] == -1 ? Math.floor((window.innerHeight / 2) - (main.offsetHeight / 2)) : this.position[1]) + "px";

		if (focusedInput) {
			focusedInput.select();
			focusedInput.focus();
		}
	};

	this.close = function () {
		if ("unload" in this) {
			this.unload();
		}

		_close();
	};

	main.setAttribute("onsubmit", "return false");
	
	(function recursive (_parent, body) {
		for (var ai in _parent.fields) {
			var fld = _parent.fields[ai],
			field = document.createElement("div"),
			div = document.createElement("div");
			desc2 = document.createElement("div"),
			tmp = {
				class	: "default",
				type	: WinConfig.FieldType.TEXT,
				format	: WinConfig.FieldFormat.STRING,
			};
			
			if (fld.key in WinConfig.CustomField) {
				var x = new WinConfig.CustomField[fld.key](_this);
				for (var bi in fld) {
					x[bi] = fld[bi];
				}
				_parent.fields[ai] = fld = x;
			}

			for (var bi in tmp) {
				if (!(bi in fld)) {
					fld[bi] = tmp[bi];
				}
			}
			
			if (typeof _parent.default == "object" && fld.name in _parent.default) {
				fld.default = _parent.default[fld.name];
			}
			fld.parent = _parent;
			
			desc2.setAttribute("class", "description");
			desc2.innerHTML = fld.description;
			div.setAttribute("class", "fieldClass_" + fld.class + " fieldName_" + fld.name + " fieldParent_" + _parent.name + " fieldType_" + fld.type + " field");
			
			if ((WinConfig.FieldType.GROUP == fld.type && (("label" in fld) || !fld.nogroup)) || (("value" in fld) && fld.value.length > 1 && WinConfig.FieldType.CHECK == fld.type && !fld.nogroup)) {
				var fieldset = document.createElement("fieldset");
				
				if ("label" in fld && fld.label) {
					var label = document.createElement("legend");
					label.innerHTML = fld.label;
					
					fieldset.appendChild(label);
				}

				if ("description" in fld) {
					fieldset.appendChild(desc2);
				}

				fieldset.appendChild(field);

				div.appendChild(fieldset);
			} else {
				if ("label" in fld) {
					var label = document.createElement("label");

					label.innerHTML = fld.label;

					div.appendChild(label);
				}

				if (fld.help) {
					var help = document.createElement("div"),
					img = document.createElement("img");
					help.setAttribute("class", "help");
					img.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAOYAAAAckqu93jCC1QBmzN7n82iBwmCCwc3V6jFhtSVXrwBDtgCC6VzI/3aq4R5ty+/y+aLM8F2T1DOR5AA+qG+b0wBSvM3m+kh5w4mp2wBz297u/EqEzXmf11uc3COO5RdbuLLI5h+Y9f///zJ90AApnQBt1BdLp83s/0huuGCn5uf2/83c8Wid3SlyyGaLyD6C0AB156XD6ABbzXWLxS9UqeHs+EqQ13Oy62i69wCM+vn4+ZW44kCZ5gBKtypds87g9WuUxQBq5Cl70AJHrAAyp+Px+wFZv05zutnj8nWY04en1nmp4096wHWo4tn0/wZhxeTq9LvN6GSt62GKy0CM2QB77gBIvwB74ipYrOXu+K295s7Z7iN0zQBCqtfg72SEwun+/2CW1mCf3qvJ6gAzmQAgkwCB7HOv56rO8Gul3il1ynmPxkqU1vz4+Zu54ABbxnaf1P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAHEALAAAAAAOAA4AAAe9gHGCP2JCXFxqYSuCjEs2EBYaGj8xGxyMTU1OODw3N1RpRXBJcT82YCEpIm1tIhEOGhdbYmgMQQQiAlwiSAodAVNCKjlmHhJvMSJuCgpZPiNOVQswMjsiID09RFkJLycwVxlPIg8K2STcLSrhJRVRSl09E2RQWGFjUjIDRlMuQ11lvgQwsGJDEQFWPogQYQIADSgoDsTBQKEIiyFMjpApAAXIDEZKLmipscULlAAo1jAStGWKDwQJsBiQKCgQADs=");
					img.addEventListener("click", (function (field) {
						return function (e) {
							var text = [field.description];
							if ("default" in field) {
								text.push("<sub><b>Default value:</b> " + field.default + "</sub>");
							}

							WinConfig.init({
								type		: WinConfig.WindowType.EXPLANATION,
								title		: ("title" in field?field.title:field.label),
								description	: text.join("<br /><br />"),
								parent	: _this,
							});
						};
					}(fld)), false);

					help.appendChild(img);
					div.appendChild(help);
				} else if ("description" in fld) {
					div.appendChild(desc2);
				}

				div.appendChild(field);
			}

			if (WinConfig.FieldType.GROUP == fld.type) {
				fld.elements = [field];

				recursive(fld, field);
			} else if (fld.multiple && WinConfig.FieldType.TEXT == fld.type) {
				var ff = document.createElement("textarea");
				fld.elements = [ff];

				ff.setAttribute("name", fld.name);
				if ("default" in fld) {
					ff.appendChild(document.createTextNode((WinConfig.FieldFormat.ARRAY & fld.format) && fld.default instanceof Array?fld.default.join("\n"):fld.default));
				}

				field.appendChild(ff);
			} else if (WinConfig.FieldType.SELECT == fld.type) {
				var ff = document.createElement("select");
				fld.elements = [ff];
				
				ff.setAttribute("name", fld.name);
				
				if (!("events" in fld)) {
					fld.events = {};
				}

				if (fld.multiple) {
					ff.setAttribute("multiple", "multiple");

					if (fld.unique && (WinConfig.FieldFormat.NUMBER & fld.format)) {
						if (!(fld.value & ~(fld.default & fld.value))) {
							ff.setAttribute("selected", "selected");
						}

						fld.events.change = function (e) {
							for (var bi = e.target.selectedIndex; bi < e.target.options.length;++bi) {
								var opt = e.target.options[bi];

								if (opt.selected) {
									for (var ai in this.value) {
										var f = this.value[ai];

										if (opt.value & f.value) {
											f.elements[0].selected = !(f.value & ~(opt.value & f.value));
										}
									}
								}
							}
						};
					}
				}

				for (var ci in fld.events) {
					addEvent(ff, ci, fld.events[ci], fld);
				}
				
				for (var bi in fld.value) {
					var input = fld.value[bi];

					input.elements = [new Option(input.label, input.value)];
					
					if ("default" in fld) {
						if (fld.default instanceof Array) {
							for (var ci in fld.default) {
								if (fld.default[ci] == input.value) {
									input.elements[0].setAttribute("selected", "selected");
								}
							}
						} else if (fld.default == input.value) {
							input.elements[0].setAttribute("selected", "selected");
						}
					} else if (fld.empty == input.value) {
						input.elements[0].setAttribute("selected", "selected");
					}

					ff.add(input.elements[0]);
				}
				
				field.appendChild(ff);
			} else if (WinConfig.FieldType.CHECK == fld.type) {
				fld.elements = [];

				if (!("empty" in fld)) {
					fld.empty = false;
				}

				var e = document.createElement("input");
				e.setAttribute("name", fld.name);
				e.setAttribute("value", fld.empty);
				e.setAttribute("type", "hidden");
				
				fld.elements.push(e);
				
				field.appendChild(e);
				
				if (fld.value instanceof Array) {
					for (var bi in fld.value) {
						var input = fld.value[bi],
						d = document.createElement("div"),
						label = document.createElement("label"),
						ff = document.createElement("input");
						
						d.setAttribute("class", "subfield");
						label.textContent = input.label;

						input.elements = [ff];
						ff.setAttribute("name", fld.name);
						ff.setAttribute("value", input.value);
						ff.setAttribute("type", (fld.multiple?"checkbox":"radio"));
						
						if (fld.unique && fld.multiple && (WinConfig.FieldFormat.NUMBER & fld.format)) {
							if (!(input.value & ~(fld.default & input.value))) {
								ff.setAttribute("checked", "checked");
								input.default = true;
							} else if (!("default" in input)) {
								input.default = false;
							}

							if (!("events" in input)) {
								input.events = {};
							}

							input.events.change = function (e, field) {
								for each (var f in document.querySelectorAll("div.fieldParent_" + this.parent.name + " input[name = '" + e.target.name + "']")) {
									if (f != e.target) {
										var value = (field.value & f.value);

										if (!e.target.checked && value || value == f.value) {
											f.checked = e.target.checked && !(f.value & ~value);
										}
									}
								}
							};
						} else if ("default" in fld) {
							if (fld.default instanceof Array) {
								for (var ci in fld.default) {
									if (fld.default[ci] == input.value) {
										ff.setAttribute("checked", "checked");
									}
								}
							} else if (fld.default == input.value) {
								input.default = true;
								ff.setAttribute("checked", "checked");
							} else {
								input.default = false;
							}
						} else if (fld.empty == input.value) {
							ff.setAttribute("checked", "checked");
						}

						for (var ci in input.events) {
							addEvent(ff, ci, input.events[ci], fld, [input]);
						}

						fld.elements.push(ff);

						d.appendChild(label);
						d.appendChild(ff);
						
						if (_parent.events) {
							for (var bi in _parent.events) {
								ff.addEventListener(bi, _parent.events[bi], false);
							}
						}

						if (input.help) {
							var help = document.createElement("div"),
							img = document.createElement("img");
							help.setAttribute("class", "help");
							img.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAOYAAAAckqu93jCC1QBmzN7n82iBwmCCwc3V6jFhtSVXrwBDtgCC6VzI/3aq4R5ty+/y+aLM8F2T1DOR5AA+qG+b0wBSvM3m+kh5w4mp2wBz297u/EqEzXmf11uc3COO5RdbuLLI5h+Y9f///zJ90AApnQBt1BdLp83s/0huuGCn5uf2/83c8Wid3SlyyGaLyD6C0AB156XD6ABbzXWLxS9UqeHs+EqQ13Oy62i69wCM+vn4+ZW44kCZ5gBKtypds87g9WuUxQBq5Cl70AJHrAAyp+Px+wFZv05zutnj8nWY04en1nmp4096wHWo4tn0/wZhxeTq9LvN6GSt62GKy0CM2QB77gBIvwB74ipYrOXu+K295s7Z7iN0zQBCqtfg72SEwun+/2CW1mCf3qvJ6gAzmQAgkwCB7HOv56rO8Gul3il1ynmPxkqU1vz4+Zu54ABbxnaf1P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAHEALAAAAAAOAA4AAAe9gHGCP2JCXFxqYSuCjEs2EBYaGj8xGxyMTU1OODw3N1RpRXBJcT82YCEpIm1tIhEOGhdbYmgMQQQiAlwiSAodAVNCKjlmHhJvMSJuCgpZPiNOVQswMjsiID09RFkJLycwVxlPIg8K2STcLSrhJRVRSl09E2RQWGFjUjIDRlMuQ11lvgQwsGJDEQFWPogQYQIADSgoDsTBQKEIiyFMjpApAAXIDEZKLmipscULlAAo1jAStGWKDwQJsBiQKCgQADs=");
							img.addEventListener("click", (function (field) {
								return function (e) {
									var text = [field.description];
									if ("default" in field) {
										text.push("<sub><b>Default value:</b> " + field.default + "</sub>");
									}

									WinConfig.init({
										type		: WinConfig.WindowType.EXPLANATION,
										title		: ("title" in field?field.title:field.label),
										description	: text.join("<br /><br />"),
									});
								};
							}(input)), false);

							help.appendChild(img);
							d.appendChild(help);
						}
						
						field.appendChild(d);
					}
				} else {
					if (!("value" in fld)) {
						fld.value = true;
					}
					if (!("events" in fld)) {
						fld.events = {};
					}

					var ff = document.createElement("input");
					ff.setAttribute("name", fld.name);
					ff.setAttribute("value", fld.value);
					ff.setAttribute("type", (fld.multiple?"checkbox":"radio"));

					if ("default" in fld) {
						if (fld.default == fld.value) {
							ff.setAttribute("checked", "checked");
						}
					} else if (fld.empty == fld.value) {
						ff.setAttribute("checked", "checked");
					}

					fld.elements.push(ff);

					for (var ci in fld.events) {
						addEvent(ff, ci, fld.events[ci], fld);
					}

					field.appendChild(ff);
				}
			} else if (fld.multiple) {
					if (WinConfig.FieldType.FILE == fld.type) {
						var ff = document.createElement("input");
						fld.elements = [ff];
						ff.setAttribute("name", fld.name);
						ff.setAttribute("type", "file");
						ff.setAttribute("multiple", "multiple");

						field.appendChild(ff);
					} else {
						fld.elements = [];

						for (var bi in fld.value) {
							var input = fld.value[bi],
							ff = document.createElement("input");

							input.elements = [ff];
							ff.setAttribute("name", fld.name);
							ff.setAttribute("type", ["text", "hidden", "password"][fld.type] || "text");
							
							fld.elements.push(ff);
							field.appendChild(ff);
						}
					}
			} else {
				var ff = document.createElement("input");
				fld.elements = [ff];
				for (var bi in fld.attrs) {
					ff.setAttribute(bi, fld.attrs[bi]);
				}
				ff.setAttribute("name", fld.name);
				ff.setAttribute("type", ["text", "hidden", "password", "file"][fld.type] || "text");
				if ("default" in fld) {
					ff.setAttribute("value", fld.default);
				}
				if (fld.focused) {
					focusedInput = ff;
				}
				field.appendChild(ff);
			}

			body.appendChild(div);
		}
	}(this, body));

	main.appendChild(head);
	main.appendChild(body);
	main.appendChild(foot);

	title.addEventListener("mousedown", function (e) {
		drag = [true, main.offsetLeft - e.pageX, main.offsetTop - e.pageY, title.style.cursor];
		title.style.cursor = "move";

		e.preventDefault();
	}, false);
	document.body.addEventListener("mousemove", function (e) {
		if (drag[0]) {
			main.style.left = (e.pageX + drag[1]) + "px";
			main.style.top = (e.pageY + drag[2]) + "px";
		}
	}, false);
	document.body.addEventListener("mouseup", function (e) {
		if (drag[0]) {
			title.style.cursor = drag[3];
			drag[0] = false;
		}
	}, false);

	if (this.store) {	
		try {
			config = JSON.parse(GM_getValue("config-" + this.name));

			if (this.force || !params.keep && GM_getValue(vn) != GM_info.script.version) {
				this.open();
			}
		} catch (e) {
			if (!this.group) {
				this.open();
			}
		}
	} else {
		this.open();
	}
};

WinConfig.__openedWindows = [];
window.addEventListener("keyup", function (e) {
	var oWin = WinConfig.__openedWindows;
	if (!e.altKey && !e.ctrlKey && !e.metaKey && 27 == e.keyCode && oWin.length) {
		oWin[(e.shiftKey?0:oWin.length - 1)].close();
	}
}, false);

WinConfig.init = function (params) {
	if ("condition" in params) {
		var cfg = JSON.parse(GM_getValue("config-" + params.name, "{}")),
		c = params.condition(cfg);
		params.result = c;
		if (-1 == c) {
			if (!("type" in params)) {
				params.type = WinConfig.WindowType.QUESTION;
			}

			return new WinConfig(params);
		} else if (c) {
			if ("load" in params) {
				params.load(cfg);
			}
		} else if ("unload" in params) {
			params.unload();
		}
		return c;
	} else {
		return new WinConfig(params);
	}
};

WinConfig.WindowButton = {
	OK		: 0x01,
	YES		: 0x02,
	SAVE	: 0x04,
	SUBMIT	: 0x08,
	CANCEL	: 0x10,
	NO		: 0x20,
	RESET	: 0x40,
};

WinConfig.WindowType = {
	CUSTOM		: 0x0,
	ERROR		: 0x1,
	EXPLANATION	: 0x2,
	QUESTION	: 0x3,
	PROMPT		: 0x4,
	WARNING		: 0x5,
	SUCCESS		: 0x6,
};

WinConfig.FieldFormat = {
	STRING		: 0x01,
	BOOLEAN		: 0x02,
	NUMBER		: 0x04,
	ARRAY		: 0x08,
};

WinConfig.FieldType = {
	TEXT		: 0x0,
	HIDDEN		: 0x1,
	PASSWORD	: 0x2,
	FILE		: 0x3,
	CHECK		: 0x4,
	SELECT		: 0x5,
	GROUP		: 0x6,
	CUSTOM		: 0x7,
};
WinConfig.CustomField = {};
WinConfig.CustomField.hotkey = function (_window) {
	var _field = this,
	tmp = {
		label	: "Hotkey",
		class	: "hotkey",
		type	: WinConfig.FieldType.GROUP,
		fields	: [{
			name	: "keys",
			type	: WinConfig.FieldType.CHECK,
			format	: WinConfig.FieldFormat.NUMBER,
			multiple: true,
			unique	: true,
			default	: 0x7,
			nogroup	: true,
			value	: [{
				value	: 0x1,
				label	: "Alt",
			},{
				value	: 0x2,
				label	: "Ctrl",
			},{
				value	: 0x4,
				label	: "Shift",
			},{
				value	: 0x8,
				label	: "Meta",
			}]
		},{
			name	: "keyCode",
			type	: WinConfig.FieldType.SELECT,
			format	: WinConfig.FieldFormat.NUMBER,
			default : 0x53,
			value	: (function () {
				var output = [],
				opts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

				for (var ai = 0;ai < opts.length;++ai) {
					output.push({
						value	: opts.charCodeAt(ai),
						label	: opts[ai],
					});
				}

				return output;
			}()),
		}],
	};

	for (var ai in tmp) {
		this[ai] = tmp[ai];
	}

	window.addEventListener("keyup", function (e) {
		var cfg = _window.get(_field.name);

		if (cfg && cfg.keyCode == e.keyCode) {
			var keys = ["alt", "ctrl", "shift", "meta"];

			for (var ai in keys) {
				if (!(e[keys[ai] + "Key"] ^ !(cfg.keys & Math.pow(2, ai)))) {
					return;
				}
			}

			_field.callback(e, _window);
		}
	}, false);
};

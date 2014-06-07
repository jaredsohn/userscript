// ==UserScript==
// @run-at           document-start
// @name             1. Greasemonkey Emulation
// @description      It emulates the Greasemonkey GM_* functions.
// @version          1.4.5
// @author           ale5000
// @namespace        http://userjs.ale5000.altervista.org/
// @include          http://*
// @include          https://*
// @include          file://*
// @filename         aab-greasemonkey-emulation.user.js
// @filename-opera   aab-greasemonkey-emulation.js
// @uniquescriptname greasemonkey_emulation
// @license          GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function()
{
	// Internal variables, do not change
	var version = "1.4.5";
	var unique_script_name = "greasemonkey_emulation";

	// Settings, can be changed
	var open_gm_menu_on_page_load = false, override_GM_registerMenuCommand = false, use_alert_as_fallback = true;
	var enable_GM_registerMenuCommand = true, enable_opera_scriptStorage = true;

	// Internal variables, do not change
	var opera_obj = window.opera, hostname = location.hostname; 
	var rnd = ( Math.floor(Math.random() * 100) + 1 );
	var chrome = (navigator.userAgent.indexOf("Chrome") != -1), midori = (navigator.userAgent.indexOf("Midori") != -1);
	var unsfw = null, storage = null, storage_used = false, cross_domain_values = false, opera_script_storage_active = false;
	if(opera_obj && enable_opera_scriptStorage) // http://www.opera.com/docs/userjs/using/
	{
		try { storage = opera_obj.scriptStorage; opera_script_storage_active = true; } catch(e) {}
	}
	if(!storage)
	{
		opera_script_storage_active = false;

		if(window.localStorage)
		{
			storage = localStorage;
			if(opera_obj) opera_obj.postError("Go on \"opera:config#PersistentStorage|UserJSStorageQuota\" and set a quota different from 0 like for example 5120 to enable window.opera.scriptStorage");
		}
		else if(window.globalStorage)
			storage = globalStorage[hostname];
	}
	if((typeof unsafeWindow) != "undefined") unsfw = unsafeWindow; else { unsfw = window; unsafeWindow = unsfw; }

	var base_obj, userscripts;
	var default_toString = function(){ return undefined; };
	if(opera_obj) base_obj = opera_obj; else base_obj = window;

	if((typeof base_obj.userscripts) == "undefined")
	{
		userscripts = new Object();
		userscripts.toString = default_toString;
		base_obj.userscripts = userscripts;
		if(!opera_obj && !unsfw.userscripts) unsfw.userscripts = userscripts;
	}
	else
		userscripts = base_obj.userscripts;

	if(userscripts.GM) { userscripts.GM.GM_log("Double execution. Browser bug!!!"); return; }
	userscripts.GM = new Object();
	userscripts.gm_emulation_private = new Object();
	userscripts.gm_emulation_private.toString = default_toString;
	var gm_extensions = userscripts.GM;

	if((typeof GM_log) != "undefined")				// Firefox
		gm_extensions.GM_log = GM_log;
	else
	{
		var opera_postError = null, pro_log_present = false, console_enabled = false;
		if(opera_obj) opera_postError = opera_obj.postError;
		else if((typeof PRO_log) != "undefined") pro_log_present = true;
		else if((typeof console) == "object") console_enabled = true;

		gm_extensions.GM_log = function(message, displayed_script_name)
		{
			if(displayed_script_name != undefined)	message = displayed_script_name + ":\n" + message;

			if(opera_postError)				// Opera
				opera_postError(message);
			else if(pro_log_present)		// Internet Explorer
				PRO_log(message);
			else if(console_enabled)		// Google Chrome - Midori
				try{ console.log(message); } catch(e){ if(use_alert_as_fallback) alert(message); }
			else if(use_alert_as_fallback)	// Fallback to an alert if other methods fail
				alert(message);
		};
	}

	var native_getsetvalues_functions = false, is_GM_deleteValue_bultin = false, is_GM_listValues_bultin = false;
	gm_extensions.GM_deleteValue = function(name, unique_script_name) { if(!name) return false; if(gm_extensions.GM_getValue(name, undefined, unique_script_name) === undefined) return; gm_extensions.GM_setValue(name, "", unique_script_name); try{ gm_extensions.GM_setValue(name, undefined, unique_script_name); } catch(e){} };
	gm_extensions.GM_listValues = function() { return []; }; // Dummy
	var get_full_name = function(name, unique_script_name) // unique_script_name is optional but recommended
	{
		if(unique_script_name != undefined)
			return "UserJS_" + unique_script_name + "_" + name;
		else
			return "UserJS__" + name;
	}
	if((typeof GM_setValue) != "undefined" && GM_setValue.toString().indexOf("not supported") == -1) // Firefox
	{
		cross_domain_values = true;
		native_getsetvalues_functions = true;
		var _GM_getValue = GM_getValue, _GM_setValue = GM_setValue, _GM_deleteValue = null, _GM_listValues = null;
		gm_extensions.GM_getValue = function(name, default_value, unique_script_name)
		{
			if(!name) return; return _GM_getValue(get_full_name(name, unique_script_name), default_value);
		};
		gm_extensions.GM_setValue = function(name, value, unique_script_name)
		{
			if(!name) return false; _GM_setValue(get_full_name(name, unique_script_name), value);
		};
		if((typeof GM_deleteValue) != "undefined")
		{
			is_GM_deleteValue_bultin = true;
			_GM_deleteValue = GM_deleteValue;
			gm_extensions.GM_deleteValue = function(name, unique_script_name)
			{
				if(!name) return false; _GM_deleteValue(get_full_name(name, unique_script_name));
			};
		}
		if((typeof GM_listValues) != "undefined")
		{
			is_GM_listValues_bultin = true;
			_GM_listValues = GM_listValues;
			gm_extensions.GM_listValues = _GM_listValues; // ToDO
		}
	}
	else
	{
		var get_recoverable_string = function(value)
		{
			var type = (typeof value);
			if(type == "boolean")
				return "" + value;
			if(type == "number")
			{
				if(isNaN(value)) return "Number.NaN";
				if(value == Number.POSITIVE_INFINITY) return "Number.POSITIVE_INFINITY";
				if(value == Number.NEGATIVE_INFINITY) return "Number.NEGATIVE_INFINITY";
				return "" + value;
			}
			if(type == "string")
			{
				var tmp = escape(value);
				if(value == tmp) return "'" + value + "'";
				return "unescape('" + tmp + "')";
			}
			if(type == "null" || (type == "object" && value == null))
				return "null";
			if(type == "date")
				return "new Date(" + value.getTime() + ")";

			alert("Unsupported value in GM_set: " + value);
			return "{error: 'Unsupported value.'}";
		};

		if((typeof PRO_setValue) != "undefined") // Internet Explorer
		{
			cross_domain_values = true;
			gm_extensions.GM_getValue = function(name, default_value, unique_script_name)
			{
				if(!name) return;
				var value = PRO_getValue(get_full_name(name, unique_script_name), default_value);
				if(value == default_value) return default_value;

				try { eval("value = " + unescape(value)); } catch(e) { return default_value; }

				// If the value is equal to default, delete it so it won't waste space
				if(value == default_value) gm_extensions.GM_deleteValue(name, unique_script_name);

				return value;
			};
			gm_extensions.GM_setValue = function(name, value, unique_script_name)
			{
				if(!name) return false;
				PRO_setValue(get_full_name(name, unique_script_name), escape(get_recoverable_string(value)));
			};
			gm_extensions.GM_deleteValue = function(name, unique_script_name)
			{
				if(!name) return false;
				if((typeof PRO_deleteValue) != "undefined")
					PRO_deleteValue(get_full_name(name, unique_script_name));
				else
					PRO_setValue(get_full_name(name, unique_script_name), "");
			};
			if((typeof PRO_listValues) != "undefined") gm_extensions.GM_listValues = PRO_listValues; // ToDO
		}
		else if(storage)
		{
			storage_used = true;
			if(opera_script_storage_active) cross_domain_values = true;
			gm_extensions.GM_getValue = function(name, default_value, unique_script_name)
			{
				if(!name) return;
				var value = storage.getItem(get_full_name(name, unique_script_name));
				if(value == null) return default_value;

				try { eval("value = " + unescape(value)); } catch(e) { return default_value; }

				// If the value is equal to default, delete it so it won't waste space
				if(value == default_value) gm_extensions.GM_deleteValue(name, unique_script_name);

				return value;
			};
			gm_extensions.GM_setValue = function(name, value, unique_script_name)
			{
				if(!name) return false;
				storage.setItem(get_full_name(name, unique_script_name), escape(get_recoverable_string(value)));
			};
			gm_extensions.GM_deleteValue = function(name, unique_script_name)
			{
				if(!name) return false;
				storage.removeItem(get_full_name(name, unique_script_name));
			};
			gm_extensions.GM_listValues = function(unique_script_name)
			{
				var list = [], count = 0, storage_length = storage.length, search = null, skip_length = 0; if(storage_length == undefined) return [];

				if(unique_script_name != undefined) search = "UserJS_" + unique_script_name + "_";
				else { search = "UserJS__"; gm_extensions.GM_log("You should avoid using GM_listValues without unique_script_name."); }
				skip_length = search.length;

				for(var i = 0; i < storage_length; i++)
				{
					name = storage.key(i);
					if(name.indexOf(search) == 0) { list[count] = name.substring(skip_length); count++; }
				}

				return list;
			};
		}
		/*else if(window.google && google.gears){ google.gears.factory.create('beta.database'); }*/
		else
		{
			gm_extensions.GM_getValue = function(name, default_value, unique_script_name)
			{
				if(!name) return;
				var full_name = escape(get_full_name(name, unique_script_name));
				var cookies = document.cookie.split("; ");
				var cookies_length = cookies.length, one_cookie;
				for(var i = 0; i < cookies_length; i++)
				{
					one_cookie = cookies[i].split("=");
					if(one_cookie[0] == full_name)
					{
						var value;
						try { eval("value = "+unescape(one_cookie[1])); } catch(e) { return default_value; }

						// If the value is equal to default, delete it so it won't waste space
						if(value == default_value) gm_extensions.GM_deleteValue(name, unique_script_name);

						return value;
					}
				}
				return default_value;
			};
			var life_time = 157680000000; // 31536000 * 5 * 1000
			gm_extensions.GM_setValue = function(name, value, unique_script_name, action)
			{
				if(!name) return false;
				if(action == "delete") action = -10; else action = life_time;
				document.cookie = escape(get_full_name(name, unique_script_name))+"="+escape(get_recoverable_string(value))+";expires="+( new Date( (new Date()).getTime() + action ) ).toGMTString()+";path=/";
			};
			gm_extensions.GM_deleteValue = function(name, unique_script_name) { return gm_extensions.GM_setValue(name, "", unique_script_name, "delete"); };
			gm_extensions.GM_listValues = function() { return []; }; // ToDO
		}
	}
	gm_extensions.GM_areStoredValuesCrossDomain = function()
	{
		return cross_domain_values;
	}

	if((typeof GM_addStyle) != "undefined") // Firefox
		gm_extensions.GM_addStyle = GM_addStyle;
	else if((typeof PRO_addStyle) != "undefined") // Internet Explorer
		gm_extensions.GM_addStyle = PRO_addStyle;
	else
	{
		gm_extensions.GM_addStyle = function(css_string)
		{
			var head = document.getElementsByTagName("head")[0];
			var document_element = (!head ? document.documentElement : null);
			var link_stylesheet = document.createElement("link");
			link_stylesheet.rel = "stylesheet";
			link_stylesheet.type = "text/css";
			link_stylesheet.href = "data:text/css," + encodeURIComponent(css_string);
			if(head)
				head.appendChild(link_stylesheet);
			else
				document_element.insertBefore(link_stylesheet, document_element.firstChild);
		};
	}

	var gm_menu_must_be_opened_now = false, show_gm_menu = null, addeventlistener_obj = null, removeeventlistener_obj = null, attachevent_obj = null, detachevent_obj = null;
	if(window.addEventListener) { addeventlistener_obj = window.addEventListener; removeeventlistener_obj = window.removeEventListener; }
	else if(document.addEventListener) { addeventlistener_obj = document.addEventListener; removeeventlistener_obj = document.removeEventListener; }
	else { attachevent_obj = document.attachEvent; detachevent_obj = document.detachEvent; }

	gm_extensions.GM_renameMenuCommand = function(){}; // Dummy
	if((typeof GM_registerMenuCommand) != "undefined" && GM_registerMenuCommand.toString().indexOf("not supported") == -1 && !override_GM_registerMenuCommand) // Firefox
		gm_extensions.GM_registerMenuCommand = GM_registerMenuCommand;
	else if((typeof PRO_registerMenuCommand) != "undefined" && !override_GM_registerMenuCommand) // Internet Explorer
		gm_extensions.GM_registerMenuCommand = PRO_registerMenuCommand;
	else if(!enable_GM_registerMenuCommand)
		gm_extensions.GM_registerMenuCommand = function(){}; // Dummy
	else
	{
		var gm_menu_visible = false, gm_menu_first_time = false, gm_menu_expanded = false, gm_menu_elements = [];
		gm_extensions.GM_registerMenuCommand = function(caption, command_func, dummy1, dummy2, access_key)
		{
			if(access_key === undefined) access_key = "";
			gm_menu_elements[gm_menu_elements.length] = [caption, command_func, escape(access_key.toUpperCase())];
			show_gm_menu(gm_menu_visible);
			return gm_menu_elements.length - 1 + rnd;
		};
		gm_extensions.GM_renameMenuCommand = function(index, new_name)
		{
			index -= rnd;
			if(index >= gm_menu_elements.length || index <= 0) { gm_extensions.GM_log("Invalid index in GM_renameMenuCommand: " + index); return false; }

			gm_menu_elements[index][0] = new_name;
			show_gm_menu(gm_menu_visible);
			return true;
		};

		var run_menu_command = function(index)
		{
			var caller = arguments.callee.caller; if(caller == null) return;
			var evt = caller.arguments[0] || window.event;
			if(evt.preventDefault) evt.preventDefault(); else evt.returnValue = false;

			if((evt != "[object MouseEvent]" && evt != "[object KeyEvent]" && String(evt).indexOf("[object KeyboardEvent]") == -1 && evt != "[object Event]") || ((typeof caller.name) != "undefined" && caller.name != "" && caller.name != "anonymous") || (caller.toString().indexOf("function anonymous(e)") != 0 && caller.toString().match(/^function\s?\(e\)/) == null) || caller.caller != null)
			{
				alert("Don't do bad things, man");
				return;
			}

			index -= rnd;
			gm_extensions.BrowserCompat_Add();
			try {
				gm_menu_elements[index][1](evt);
			} catch(e) { GM_log("Error inside " + gm_menu_elements[index][0] + " => " + gm_menu_elements[index][1]); };
			gm_extensions.BrowserCompat_Restore();
		};

		/*
		http://www.quirksmode.org/dom/events/index.html
		http://www.quirksmode.org/js/events_properties.html
		*/
		var dragging = false, this_drag_has_moved = false;
		var drag_n_drop_start = function(e)
		{
			if(!e) e = window.event;
			var target = e.target || e.srcElement;
			if(target.nodeType == 3) // Defeat Safari bug
				target = target.parentNode || target.parentElement;
			if(target.tagName.toLowerCase() != "html"|"body" && target.className != "enable_gm_drag_yes")
			{
				target = target.parentNode || target.parentElement;
			}

			if(target.className == "enable_gm_drag_yes")
			{
				dragging = true;
				this_drag_has_moved = false;
				var drag = new Object();
				drag.target = target;
				drag.initial_value_left = parseInt(0 + target.style.left);
				drag.initial_value_right = parseInt(0 + target.style.right);
				drag.initial_value_top = parseInt(0 + target.style.top);
				drag.initial_value_bottom = parseInt(0 + target.style.bottom);
				if(e.pageX)
				{
					drag.initial_client_x = e.pageX;
					drag.initial_client_y = e.pageY;
				}
				else
				{
					drag.initial_client_x = e.clientX;
					drag.initial_client_y = e.clientY;
				}

				// Block text selection in Opera - Firefox - Google Chrome
				if(e.preventDefault) e.preventDefault(); else e.returnValue = false;

				if(addeventlistener_obj)
				{
					var mousemove_function_listener = (function(drag) { return function(e) { drag_n_drop_move(e, drag); } })(drag);
					//var mousemove_function_listener = function(e){ return drag_n_drop_move(e, drag); }
					this.addEventListener("mousemove", mousemove_function_listener, false);
					this.addEventListener("mouseup", function(){ return drag_n_drop_end(this, mousemove_function_listener); }, false);
				}
				else
				{
					this.drag = drag;
					this.onmousemove = drag_n_drop_move;
					this.onmouseup = drag_n_drop_end;
				}
				drag = null;
			}
		}
		var drag_n_drop_move = function(e, drag)
		{
			this_drag_has_moved = true;
			if(!e) e = window.event;
			if(!drag) drag = this.drag;

			var client_x, client_y;
			if(e.pageX)
			{
				client_x = e.pageX;
				client_y = e.pageY;
			}
			else
			{
				client_x = e.clientX;
				client_y = e.clientY;
			}
			var left = (drag.initial_value_left + client_x - drag.initial_client_x);
			var right = (drag.initial_value_right + drag.initial_client_x - client_x);
			var top = (drag.initial_value_top + client_y - drag.initial_client_y);
			var bottom = (drag.initial_value_bottom + drag.initial_client_y - client_y);
			if(drag.target.style.left != "" && left >= 0) drag.target.style.left = left + "px";
			if(drag.target.style.right != "" && right >= 0) drag.target.style.right = right + "px";
			if(drag.target.style.top != "" && top >= 0) drag.target.style.top = top + "px";
			if(drag.target.style.bottom != "" && bottom >= 0) drag.target.style.bottom = bottom + "px";
		}
		var drag_n_drop_end = function(object_dragged, mousemove_function_listener)
		{
			if(removeeventlistener_obj)
			{
				object_dragged.removeEventListener("mousemove", mousemove_function_listener, false);
				object_dragged.removeEventListener("mouseup", arguments.callee.caller, false);
			}
			else
			{
				this.onmousemove = null;
				this.onmouseup = null;
				this.drag = null;
			}
			dragging = false;
		}

		var hide_gm_menu = function(e)
		{
			if(e != "dummy") { gm_menu_first_time = false; if(!e) e = window.event; if(e.preventDefault) e.preventDefault(); else e.returnValue = false; }
			var gm_menu_base = document.getElementById("gm_my_personal_fake_menu");
			if(gm_menu_base) { gm_menu_base.parentNode.removeChild(gm_menu_base); gm_menu_visible = false; gm_menu_expanded = false; }
		};

		var gm_menu_css_added = false;
		show_gm_menu = function(force)
		{
			if( (!gm_menu_must_be_opened_now || gm_menu_elements.length <= 1) && !force) return;
			hide_gm_menu("dummy");
			gm_menu_visible = true;

			if(!gm_menu_css_added) { gm_menu_css_added = true; gm_extensions.GM_addStyle("a.gm_my_personal_fake_menu { color: #0060c0 !important; font-size: inherit !important; text-decoration: none !important; } a.gm_my_personal_fake_menu:hover { color: #104070 !important; }"); }
			var document_body = (document.body ? document.body : document.documentElement);

			gm_menu_base = document.createElement("gm_menuuuuuu");
			gm_menu_base.id = "gm_my_personal_fake_menu";
			gm_menu_base.style.cssText = "border: 1px solid #000000 !important;\
						background-color: #bbf000 !important;\
						color: #000000 !important;\
						z-index: 900000 !important;\
						position: fixed !important;\
						top: 25px;\
						right: 10px;\
						padding: 2px !important;\
						margin: 0px !important;\
						overflow: hidden !important;\
						height: 1.27em !important;\
						opacity: 0.4;\
						-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(opacity=40)\";\
						font-family: Arial !important;\
						font-size: 13px !important;\
						text-align: left !important;";

			var gm_menu_title = document.createElement("b");
			gm_menu_title.style.cssText = "cursor: move !important; padding-right: 30px !important;";
			gm_menu_title.appendChild(document.createTextNode("User Script Commands (Shift+0)"));
			gm_menu_base.appendChild(gm_menu_title);

			var gm_menu_x = document.createElement("a");
			gm_menu_x.appendChild(document.createTextNode("X"));
			gm_menu_x.href = "#";
			gm_menu_x.style.cssText = "position: absolute !important; top: 2px !important; right: 10px !important; color: red !important; font-size: inherit !important; text-decoration: none !important;";
			gm_menu_base.appendChild(gm_menu_x);

			var gm_menu_list = document.createElement("ul"), gm_menu_list_element, gm_menu_link;
			gm_menu_list.style.cssText = "padding: 6px !important; margin: 0px !important; list-style-position: inside !important;";
			var menu_length = gm_menu_elements.length;
			for(var i = 0; i < menu_length; i++)
			{
				gm_menu_list_element = document.createElement('li');
				gm_menu_list_element.appendChild(gm_menu_link = document.createElement('a'));
				gm_menu_link.href = "#";
				gm_menu_link.className = "gm_my_personal_fake_menu";
				if(addeventlistener_obj)
					gm_menu_link.addEventListener("click", (function(i) { return function(e) { run_menu_command(i); } })(i + rnd), false);
				else
					gm_menu_link.onclick = (function(i) { return function(e) { run_menu_command(i); } })(i + rnd);
				gm_menu_link.appendChild(document.createTextNode(gm_menu_elements[i][0]));
				if(gm_menu_elements[i][2] != "")
				{
					var reg_exp = new RegExp("(" + gm_menu_elements[i][2] + ")", "i");
					gm_menu_link.innerHTML = gm_menu_link.innerHTML.replace(reg_exp, "<u>$1</u>");
					if(gm_menu_link.innerHTML == gm_menu_elements[i][0])
						gm_menu_link.innerHTML += " (<u>" + gm_menu_elements[i][2] + "</u>)";
				}
				gm_menu_list.appendChild(gm_menu_list_element);
			}
			gm_menu_base.appendChild(gm_menu_list);

			var move_left_right = function()
			{
				if(this_drag_has_moved) return;

				var target = this;
				if(target.nodeType == 3) // Defeat Safari bug
					target = target.parentNode || target.parentElement;
				target = target.parentNode || target.parentElement;

				target.style.left = (target.style.left == "" ? "10px" : "");
				target.style.right = (target.style.right == "" ? "10px" : "");
			};
			var expand = function() { gm_menu_expanded = true; this.style.height = ""; this.style.opacity = "1"; this.style.filter = "-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(opacity=100)\";"; window.focus(); this.focus(); };
			var collapse = function() { if(dragging) return; gm_menu_expanded = false; gm_menu_first_time = false; this.style.height = "1.27em"; this.style.opacity = "0.4"; this.style.filter = "-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(opacity=40)\";"; };

			document_body.appendChild(gm_menu_base);
			if(addeventlistener_obj)
			{
				gm_menu_title.addEventListener("click", move_left_right, false);
				gm_menu_x.addEventListener("click", hide_gm_menu, false);
				gm_menu_base.addEventListener("mousedown", drag_n_drop_start, false);
				gm_menu_base.addEventListener("mouseover", expand, false);
				gm_menu_base.addEventListener("mouseout", collapse, false);
			}
			else
			{
				gm_menu_title.onclick = move_left_right;
				gm_menu_x.onclick = hide_gm_menu;
				gm_menu_base.onmousedown = drag_n_drop_start;
				gm_menu_base.onmouseover = expand;
				gm_menu_base.onmouseout = collapse;
				gm_menu_base.onselectstart = function() { return false; }; // Block text selection in Internet Explorer, for other browsers it is blocked inside onmousedown
			}
			gm_menu_base.className = "enable_gm_drag_yes";
			gm_menu_base.focus();
		};

		userscripts.gm_emulation_private.show_menu = function()
		{
			var caller = arguments.callee.caller;
			if(caller == null || ((typeof caller.name) != "undefined" && caller.name != "") || caller.toString().match(/^\(?function\s?\(\)/) == null || caller.caller != null)
			{
				alert("Don't do bad things, man");
				return;
			}

			show_gm_menu(true);
		};

		var shift = false;
		/*
		http://asquare.net/javascript/tests/KeyCode.html
		http://www.quirksmode.org/js/keys.html
		http://unixpapa.com/js/key.html
		*/
		var onKeyEvent = function(e) // Note: In the keydown and keyup events you will get the keycode of the letters always in uppercase instead in the keypress events you will get them in the same case the user typed them.
		{
			if(!e) e = window.event;
			var eventType = e.type;
			var keyCode = e.which || e.keyCode;
			if(keyCode == 0) return; // Unknown key

			if(eventType == "keydown")
			{
				if(keyCode == 16) // The shift button
					shift = true;
				else if( (shift && keyCode == 48) || (midori && /* Midori bug!!! */keyCode == 187 && GM_log("Midori bug!!! Bad keyCode.") == undefined) ) // Shift+0
				{
					if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
					gm_menu_first_time = true; // This will allow to open the elements (with the shortcuts) immediately after the menu is opened
					show_gm_menu(true);
				}
				else if(gm_menu_expanded || gm_menu_first_time)
				{
					gm_menu_first_time = false;
					var menu_length = gm_menu_elements.length;
					var char_to_search = String.fromCharCode(keyCode);

					for(var i = 0; i < menu_length; i++)
						if(char_to_search == gm_menu_elements[i][2])
						{
							if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
							run_menu_command(i + rnd);
							break;
						}
				}
			}
			else if(eventType == "keyup" && keyCode == 16) // The shift button
				shift = false;
		};
		if(hostname != "googleads.g.doubleclick.net")
		{
			// Opera - Firefox - Google Chrome
			if(addeventlistener_obj) { addeventlistener_obj("keydown", onKeyEvent, false); addeventlistener_obj("keyup", onKeyEvent, false); }
			// Internet Explorer
			else if(attachevent_obj) { attachevent_obj("onkeydown", onKeyEvent); attachevent_obj("onkeyup", onKeyEvent); }
		}
	}
	var GlobalConfiguration = function()
	{
		var global_variables = {"Script managment":[], "Unknown script":[], "Web page":[]};
		var output = "";

		if(storage_used)
		{
			var storage_length = storage.length, name, value, pos;
			if(storage_length != undefined)
				for(var i = 0; i < storage_length; i++)
				{
					name = storage.key(i);
					value = storage.getItem(name);
					if(name.indexOf("UserJS_") != 0)
						global_variables["Web page"][(global_variables["Web page"].length)] = [name, value];
					else
					{
						name = name.substring(7);
						if(name.indexOf("Script_managment-") == 0)
							global_variables["Script managment"][(global_variables["Script managment"].length)] = [name.substring(17), value];
						else
						{
							pos = name.indexOf("_");
							if(pos == 0)
								global_variables["Unknown script"][(global_variables["Unknown script"].length)] = [name.substring(1), value];
							else
							{
								var temp = name.substring(0, pos);
								if(!global_variables[temp]) global_variables[temp] = [];
								global_variables[temp][(global_variables[temp].length)] = [name.substring(pos+1), value];
							}
						}
					}
				}

			output += "Cross-domain values => " + cross_domain_values + "<br>";
			output += "opera.scriptStorage active => " + opera_script_storage_active + "<br>";
			output += "window.localStorage => " + (!!window.localStorage) + "<br><br>";
			if(storage_length == undefined) output += "Warning: Missing length property in the storage array.<br><br>";
			var value, i, global_variables_script_length;
			for(var script_name in global_variables)
			{
				if(script_name == "Script managment") continue;
				for(i = 0, global_variables_script_length = global_variables[script_name].length; i < global_variables_script_length; i++)
				{
					if(script_name != "Web page")
						try { eval("value = " + unescape(global_variables[script_name][i][1])); } catch(e) { value = {error: "Failed."}; }
					else
						value = global_variables[script_name][i][1];
					output += script_name + " => " + global_variables[script_name][i][0] + " = " + value + "<br>";
				}
				if(global_variables_script_length > 0) output += "<br>";
			}
			global_variables = null;
			document.write(output);
			output = null;
		}
		else
			alert("Not yet implemented.");
	};
	gm_extensions.GM_registerMenuCommand("Global configuration", GlobalConfiguration, undefined, undefined, "G");

	gm_extensions.unsafeWindow = unsfw;
	if(!window.wrappedJSObject) window.wrappedJSObject = unsfw;
	if(!window.content) window.content = window.top; // https://developer.mozilla.org/en/DOM/window.content
	if(!unsfw.content) unsfw.content = unsfw.top;
	if(!unsfw._content) unsfw._content = unsfw.content;

	if((typeof GM_xmlhttpRequest) != "undefined") // Firefox
		gm_extensions.GM_xmlhttpRequest = GM_xmlhttpRequest;
	else
	{
		var error_text = "GM_xmlhttpRequest failed, URL: ";
		var cross_domain_note = "\nNote: Cross-domain GM_xmlhttpRequest is disabled, if you are using Opera you must install the \"Cross-domain XMLHttpRequest\" userscript to enable it.";
		var cross_domain_opera_xmlhttprequest = (opera_obj ? opera_obj.XMLHttpRequest : null);
		var iepro_xmlhttprequest_exist = ((typeof PRO_xmlhttpRequest) != "undefined" ? true : false);
		var is_cross_domain_http_request = function(url_req)
		{
			//gm_extensions.GM_log("is_cross_domain_http_request(" + url_req + ");");
			var pos = url_req.indexOf("://");
			if( url_req.substring(0, pos + 1) != location.protocol ) return true;

			url_req = url_req.substring(pos + 3);
			pos = url_req.indexOf("/");
			if(pos != -1) url_req = url_req.substring(0, pos);
			if( url_req != location.host ) return true;

			return false;
		}

		gm_extensions.GM_xmlhttpRequest = function(details) // http://www.w3.org/Protocols/HTTP/HTRESP.html
		{
			//gm_extensions.GM_log("XMLHttpRequest of: " + details.url);
			var xml_http = null, cross_domain_used = true, cross_domain_req = is_cross_domain_http_request(details.url);
			//gm_extensions.GM_log("cross_domain_req => " + cross_domain_req);

			if(cross_domain_req && cross_domain_opera_xmlhttprequest)	// Opera (cross-domain requests only)
				xml_http = new cross_domain_opera_xmlhttprequest();
			else if(iepro_xmlhttprequest_exist)					// Internet Explorer + IEPro
				xml_http = PRO_xmlhttpRequest();
			else
			{
				cross_domain_used = false;
				if(window.XMLHttpRequest)		// The standard
					xml_http = new XMLHttpRequest();
				else if(window.createRequest)	// IceBrowser
					xml_http = window.createRequest();
			}
			if(!xml_http)
			{	// Simulate a real error
				if(details.onerror) details.onerror({ responseText: "", readyState: 4, responseHeaders: "", status: 0, statusText: "Internal Error", finalUrl: details.url });
				gm_extensions.GM_log("GM_xmlhttpRequest failed (missing xml_http object), URL: " + details.url);
				return;
			}

			xml_http.onreadystatechange = function()
			{
				var ready_state = xml_http.readyState;
				var status3or4 = (ready_state == 3 || ready_state == 4);
				var response =
				{
					responseText: (status3or4 ? xml_http.responseText : ""),
					readyState: ready_state,
					responseHeaders: (status3or4 ? xml_http.getAllResponseHeaders() : null),
					status: (status3or4 ?  xml_http.status : null),
					statusText: (status3or4 ? xml_http.statusText : null),
					finalUrl: (ready_state == 4 ? details.url : null)
				}

				if(details.onreadystatechange) details.onreadystatechange(response);
				if(ready_state == 4)
				{
					if(xml_http.status >= 200 && xml_http.status < 300) { if(details.onload) details.onload(response); }
					else { if(details.onerror) details.onerror(response); }
				}
			}

			xml_http.open(details.method, details.url, true);
			if(details.headers)
				for(var this_header in details.headers) xml_http.setRequestHeader(this_header, details.headers[this_header]);

			try { xml_http.send(details.data); }
			catch(e)
			{	// Simulate a real error
				if(details.onerror) details.onerror({ responseText: "", readyState: 4, responseHeaders: "", status: 403, statusText: "Forbidden", finalUrl: details.url });
				gm_extensions.GM_log(error_text + details.url + (opera_obj && !cross_domain_used && cross_domain_req ? cross_domain_note : ""));
			}
		};
	}

	if((typeof GM_openInTab) != "undefined") // Firefox
		gm_extensions.GM_openInTab = GM_openInTab;
	else if((typeof PRO_openInTab) != "undefined") // Internet Explorer
		gm_extensions.GM_openInTab = PRO_openInTab;
	else
		gm_extensions.GM_openInTab = function(url) { return window.open(url, "_blank"); };

	var gm_emulation_enhanced_scripts = [];
	gm_extensions.GM_announcePresence = function(unique_script_name, displayed_name, version)
	{
		if(unique_script_name.length <= 4) { alert("GM_announcePresence => The \"unique_script_name\" is missing or too short."); return false; }
		gm_emulation_enhanced_scripts[gm_emulation_enhanced_scripts.length] = [unique_script_name, displayed_name, version];
		return gm_extensions.GM_getValue("is_enabled", true, "Script_managment-" + unique_script_name);
	};
	gm_extensions.GM_updateCheck = function(update_check_url, installed_version, update_check_every, handle_update_function, unique_script_name)
	{
		if(!cross_domain_values) return null;
		var now = Math.round( ( (new Date()).getTime() ) / 60000 ); // 60000 (1000 * 60) From milliseconds to minutes

		var last_update_check_global = gm_extensions.GM_getValue("last_update_check", 0, "Script_managment-GLOBAL_SHARED");
		if(now - last_update_check_global < 3) return false; // Only one time every 3 minutes maximum

		if(unique_script_name.length <= 4) { alert("GM_updateCheck => The \"unique_script_name\" is missing or too short."); return false; }

		var last_update_check = gm_extensions.GM_getValue("last_update_check", 0, "Script_managment-" + unique_script_name);
		if(now - last_update_check < update_check_every * 1440) return false; // 1440 (60 * 24) From days to minutes - Only one time every X days maximum

		gm_extensions.GM_setValue("last_update_check", now, "Script_managment-GLOBAL_SHARED");
		gm_extensions.GM_setValue("last_update_check", now, "Script_managment-" + unique_script_name);
		gm_extensions.GM_xmlhttpRequest(
		{
			method: "GET", url: update_check_url, onload: function(result)
			{
				//gm_extensions.GM_log(result.responseText);
				var new_version = /\/\/\s*@version[\t\s]+([^\s\t\r\n]+)\s*\r?\n/i.exec(result.responseText);
				var new_unique_script_name = /\/\/\s*@uniquescriptname[\t\s]+([^\s\t\r\n]+)\s*\r?\n/i.exec(result.responseText);

				if(new_version == null)
				{
					var error = unique_script_name + " => Failed checking the new version, URL: " + update_check_url;
					gm_extensions.GM_log(error);
					alert(error);
					return null;
				}
				new_version = new_version[1];
				if(new_unique_script_name == null)
					gm_extensions.GM_log(unique_script_name + " => The \"uniquescriptname\" is missing on the update server, URL: " + update_check_url);
				else if(new_unique_script_name[1] != unique_script_name)
				{
					var error = unique_script_name + " => The unique script name passed doesn't match the unique script name on the update server, maybe the update_check_url is wrong, URL: " + update_check_url;
					gm_extensions.GM_log(error);
					alert(error);
					return null;
				}
				gm_extensions.GM_setValue("last_new_version", new_version, "Script_managment-" + unique_script_name);
				if(new_version == installed_version) handle_update_function(false);
				else handle_update_function(new_version);
			}
		});

		return true;
	};
	gm_extensions.GM_getEmulationVersion = function()
	{
		return version;
	}

	gm_extensions.GM_exposeAPIs = function()
	{
		GM_log = gm_extensions.GM_log;
		if(!native_getsetvalues_functions)
		{
			GM_getValue = gm_extensions.GM_getValue;
			GM_setValue = gm_extensions.GM_setValue;
		}
		if(!is_GM_deleteValue_bultin) GM_deleteValue = gm_extensions.GM_deleteValue;
		if(!is_GM_listValues_bultin) GM_listValues = gm_extensions.GM_listValues;
		GM_areStoredValuesCrossDomain = gm_extensions.GM_areStoredValuesCrossDomain;
		GM_addStyle = gm_extensions.GM_addStyle;
		GM_registerMenuCommand = gm_extensions.GM_registerMenuCommand;
		GM_renameMenuCommand = gm_extensions.GM_renameMenuCommand;
		GM_xmlhttpRequest = gm_extensions.GM_xmlhttpRequest;
		GM_openInTab = gm_extensions.GM_openInTab;
	};
	gm_extensions.GM_exposeAPIs();

	if(open_gm_menu_on_page_load && show_gm_menu)
	{
		var run_at_document_start = !document.body;
		var on_page_load = function()
		{
			gm_menu_must_be_opened_now = true;
			show_gm_menu(false);

			if(run_at_document_start && removeeventlistener_obj) { removeeventlistener_obj("load", on_page_load, false); }
		};
		if(!run_at_document_start) on_page_load(); // Firefox - Internet Explorer
		else if(addeventlistener_obj) { addeventlistener_obj("load", on_page_load, false); } // Opera - Google Chrome
		else alert("GM menu auto-load failed.");
	}

	var compat_array_indexof = false, compat_array_foreach = false;
	gm_extensions.BrowserCompat_Add = function()
	{
		var result = false;
		if(!Array.prototype.indexOf)
		{
			result = true;
			compat_array_indexof = true;
			Array.prototype.indexOf = function(find, i /*opt*/)
			{
				var array_length = this.length;
				if(!i) i = 0; else { if(i < 0) i+= array_length; if(i < 0) i= 0; }

				for(; i < array_length; i++) if(this[i] == find) return i;
				return -1;
			};
		}
		if(!Array.prototype.forEach)
		{
			result = true;
			compat_array_foreach = true;
			Array.prototype.forEach = function(callback, thisObject /*opt*/)
			{
				if(!thisObject)
				{
					for(var i = 0, array_length = this.length; i < array_length; i++) if (i in this) callback(this[i]);
				}
				else
				{
					for(var i = 0, array_length = this.length; i < array_length; i++) if (i in this) callback.call(thisObject, this[i]);
				}
			};
		}
		return result;
	};

	gm_extensions.BrowserCompat_Restore = function()
	{
		if(compat_array_indexof) { delete Array.prototype.indexOf; compat_array_indexof = false; }
		if(compat_array_foreach) { delete Array.prototype.forEach; compat_array_foreach = false; }
	}

	var handle_update_function = function(new_version)
	{
		if(new_version != null && new_version != false)
		{
			GM_log("Greasemonkey Emulation => New version detected: " + new_version);
			var result = confirm("A new version of the \"Greasemonkey Emulation\" userscript is available.\nCurrent version: " + version + "\nNew version: " + new_version + "\n\nDo you want to update it now?\nThe update check will be done again in 10 days.");
			if(result)
				try { location.href = "http://userscripts.org/scripts/source/88932.user.js"; } catch(e) {}
		}
	};
	gm_extensions.GM_updateCheck("http://userscripts.org/scripts/source/88932.meta.js", version, 10, handle_update_function, unique_script_name);

})();

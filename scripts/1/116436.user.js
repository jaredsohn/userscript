// ==UserScript==

// @name tom's module navigation
// @namespace http://www.carpetemporem.com

// @description module navigation 201110061756

// @include http://boardgamegeek.com/boardgame/*
// @include http://*.boardgamegeek.com/boardgame/*
// @include http://boardgamegeek.com/boardgameexpansion/*
// @include http://*.boardgamegeek.com/boardgameexpansion/*
// @include http://boardgamegeek.com/boardgamepublisher/*
// @include http://*.boardgamegeek.com/boardgamepublisher/*
// @include http://boardgamegeek.com/boardgamedesigner/*
// @include http://*.boardgamegeek.com/boardgamedesigner/*
// @include http://boardgamegeek.com/boardgameartist/*
// @include http://*.boardgamegeek.com/boardgameartist/*
// @include http://boardgamegeek.com/boardgamefamily/*
// @include http://*.boardgamegeek.com/boardgamefamily/*

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js

// ==/UserScript==


(function ()
	{
	function eo_newApply(O_class, AV_arguments)
		{
		function e_proxy()
			{
			return O_class.apply(this, AV_arguments);
			}

		e_proxy.prototype = O_class.prototype;

		return new e_proxy ();
		}

	function eo_newCall(O_class)
		{
		var av_arguments = eav_argumentsArray(arguments, 1);

		function e_proxy()
			{
			return O_class.apply(this, av_arguments);
			}

		e_proxy.prototype = O_class.prototype;

		return new e_proxy ();
		}

	function eb_hasSlot(O_object, S_slot)
		{
		return S_slot in O_object;
		}

	function e_timed(E_do, I_millis)
		{
		window.setTimeout(E_do, eb_isNumber(I_millis) ? I_millis : 150);
		}

	function eav_argumentsArray(O_arguments, I_from, I_upto)
		{
		return Array.prototype.slice.call(O_arguments, I_from, I_upto);
		}

	function eb_isArray(V_object)
		{
		return V_object instanceof Array;
		}

	function eb_isBoolean(V_object)
		{
		return typeof V_object == "boolean" || V_object instanceof Boolean;
		}

	function eb_isDate(V_object)
		{
		return V_object instanceof Date;
		}

	function eb_isFunction(V_object)
		{
		return V_object instanceof Function;
		}

	function eb_isNumber(V_object)
		{
		return typeof V_object == "number" || V_object instanceof Number;
		}

	function eb_isRegExp(V_object)
		{
		return V_object instanceof RegExp;
		}

	function eb_isString(V_object)
		{
		return typeof V_object == "string" || V_object instanceof String;
		}

	function ei_getGCF(I_one, I_two, B_zero, B_negative)
		{
		// get GCF according to Josef Stein.
		 // optimized for number of tests and speed.
		 // extended with flags for zero and negative numbers:
		 // if the flags are not set, 0 is returned respectively.

		if (I_one == 0)
			{
			return B_zero ? I_two : 0;
			}

		if (I_two == 0)
			{
			return B_zero ? I_one : 0;
			}

		// ? abs(one)
		if (I_one < 0)
			{
			if (!B_negative)
				{
				return 0;
				}

			I_one = -I_one;
			}

		// ? abs(two)
		if (I_two < 0)
			{
			if (!B_negative)
				{
				return 0;
				}

			I_two = -I_two;
			}

		var i_factor = 1;

		// create odd numbers by halfing even numbers
		while (1)
			{
			// ? one is odd
			if (I_one & 1)
				{
				// half two while even
				while (!(I_two & 1))
					{
					I_two /= 2;
					}

				break;
				}

			// ? two is odd (one is even) 
			if (I_two & 1)
				{
				// half one while even
				do
					{
					I_one /= 2;
					}
				while (!(I_one & 1))

				break;
				}

			i_factor *= 2;

			I_one /= 2;
			I_two /= 2;
			}

		// both are always odd here
		while (I_one != I_two)
			{
			// ? two is greater, subtract one from two
			if (I_one < I_two)
				{
				I_two -= I_one;

				// half two while even
				do
					{
					I_two /= 2;
					}
				while (!(I_two & 1))
				}
			// ! one is greater, subtract two from one
			else
				{
				I_one -= I_two;

				// half one while even
				do
					{
					I_one /= 2;
					}
				while (!(I_one & 1))
				}
			}

		return I_one * i_factor;
		}

	function et_log ()
		{
		return this.eo_Set.apply(this, eav_argumentsArray(arguments));
		}

	et_log.prototype.eo_Set = function (I_limit, S_label)
		{
		this.i_Limit = I_limit ? I_limit : 0;
		this.s_Label = S_label ? S_label : "";

		return this;
		}

	et_log.prototype.e_Log = function (I_level)
		{
		if (!I_level || I_level > this.i_Limit)
			{
			return;
			}

		var s_log;
		var s_gap;

		if (this.s_Label)
			{
			s_log = this.s_Label;
			s_gap = ": ";
			}
		else
			{
			s_log = "";
			s_gap = "";
			}

		var i_arguments = arguments.length;
		var i_argument = 1;

		while (i_argument < i_arguments)
			{
			var v_argument = arguments[i_argument++];

			if (v_argument != undefined)
				{
				s_log = s_log + s_gap + v_argument;
				s_gap = ": ";
				}
			}

		e_log(s_log);
		}

	function e_log(S_string)
		{
		if (!S_string)
			{
			S_string = "";
			}

		var global = (function () {return this;})();

		if (global.GM_log)
			{
			GM_log(S_string);
			}

		if (global.unsafeWindow && global.unsafeWindow.console)
			{
			global.unsafeWindow.console.log(S_string);

			return;
			}

		if (global.window.console)
			{
			global.window.console.log(S_string);

			return;
			}
		}

	function es_toString(V_object)
		{
		function es_toStringExpand(V_object, B_expand)
			{
			if (V_object == null)
				{
				return "null";
				}

			if (V_object == undefined)
				{
				return "undefined";
				}

			if (eb_isBoolean(V_object)
			 || eb_isNumber(V_object)
			 || eb_isRegExp(V_object))
				{
				return "" + V_object;
				}

			if (eb_isDate(V_object))
				{
				return V_object.getFullYear() + "." +
				 es_padHead("00", (V_object.getMonth() + 1)) + "." +
				 es_padHead("00", V_object.getDate()) + " " +
				 es_padHead("00", V_object.getHours()) + ":" +
				 es_padHead("00", V_object.getMinutes()) + ":" +
				 es_padHead("00", V_object.getSeconds());
				}

			if (eb_isFunction(V_object))
				{
				return ("" + V_object).replace(/ *\n */g, " ");
				}

			if (eb_isString(V_object))
				{
				return "\"" + V_object + "\"";
				}

			var s_string = "";
			var s_gap = "";

			if (eb_isArray(V_object))
				{
				var i_objects = V_object.length;
				var i_object = 0;

				while (i_object < i_objects)
					{
					s_string = s_string + s_gap + i_object + ": " +
					 es_toStringExpand(V_object[i_object++], 0);

					s_gap = ", ";
					}

				return "[" + s_string + "]";
				}

			if (!B_expand)
				{
				return V_object.toString();
				}

			// sort object members before building string

			var ao_object = [];

			for (s_name in V_object)
				{
				ao_object.push({s_Name: s_name, v_Value: V_object[s_name]});
				}

			ao_object.sort(
			 function (o_one, o_two)
				{
				return (o_one.s_Name < o_two.s_Name ? -1
				 : (o_one.s_Name > o_two.s_Name ? 1 : 0));
				});

			while (ao_object.length != 0)
				{
				var o_object = ao_object.pop();

				s_string = o_object.s_Name + ": " +
				 es_toStringExpand(o_object.v_Value, 0)
				 + s_gap + s_string;

				s_gap = ", ";
				}

			return "{" + s_string + "}";
			}

		return es_toStringExpand(V_object, 1);
		}

	function e_logNode(O_node)
		{
		e_log("node " + O_node.nodeName + " (" + O_node.nodeType + ")");
		}

	jQuery.fn.innerHTML = function(V_replace)
		{
		return this.html(V_replace);
		}

	jQuery.fn.outerHTML = function(V_replace)
		{
		return V_replace
		 ? this.before(V_replace).remove()
		 : eo_getItem("<div>").append(this.eq(0).clone()).html();
		}

	function e_evalInPage(V_object)
		{
		if (eb_isFunction(V_object))
			{
			V_object = '(' + V_object + ')();'
			}

		var o_scriptNode = document.createElement('script');

		o_scriptNode.setAttribute("type", "application/javascript");
		o_scriptNode.textContent = V_object;

		// insert and run
		document.body.appendChild(o_scriptNode);
		// remove and clean up
		document.body.removeChild(o_scriptNode);
		}

	function e_bggLinkClick(O_module, O_linkItem, E_do)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		if (O_module.b_Busy)
			{
			o_log.e_Log(1, "busy");

			return;
			}

		O_linkItem.addClass("tom_BGGLinkBusy").removeClass("tom_BGGLinkIdle");

		e_setInputValue(
		 eo_getItem("#showInput_" + O_module.s_ID), O_module.i_Show);
		e_setInputValue(
		 eo_getItem("#pageInput_" + O_module.s_ID), O_module.i_Page);

		o_log.e_Log(4, es_toString(E_do));

		e_timed(
		 function ()
			{
			e_evalInPage(E_do);
			});
		}

	function e_ownLinkClick(
	 O_module, O_linkItem, S_idleClass, S_busyClass, E_do)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		var o_linkNode = eo_getNode(O_linkItem);

		if (o_linkNode !== O_module.o_Results.o_StopBoxLinkNode
		&& o_linkNode !== O_module.o_Results.o_StopTextLinkNode)
			{
			if (O_module.b_Busy)
				{
				o_log.e_Log(1, "busy");

				return;
				}

			O_linkItem.addClass(S_busyClass).removeClass(S_idleClass);
			}

		e_setInputValue(
		 eo_getItem("#showInput_" + O_module.s_ID), O_module.i_Show);
		e_setInputValue(
		 eo_getItem("#pageInput_" + O_module.s_ID), O_module.i_Page);

		e_timed(
		 function ()
			{
			E_do();
			});
		}

	function e_eventCancel(O_event)
		{
		if (!O_event)
			{
			if (!window.event)
				{
				return;
				}

			O_event = window.event;
			}

		if (O_event.cancelBubble != null)
			{
			O_event.cancelBubble = true;
			}

		if (O_event.stopPropagation)
			{
			O_event.stopPropagation();
			}

		if (O_event.preventDefault)
			{
			O_event.preventDefault();
			}

		if (window.event)
			{
			O_event.returnValue = false;
			}

		if (O_event.cancel != null)
			{
			O_event.cancel = true;
			}
		}

	function eo_getItem(O_node)
		{
		return $(O_node);
		}

	function eo_getNode(O_item, I_offset)
		{
		return I_offset === undefined ? O_item[0] : O_item.get(I_offset);
		}

	function eo_clone(O_object)
		{
		return eval(uneval(O_object));
		}

	function es_padHead(S_pad, S_string)
		{
		S_string = "" + S_string;

		if (S_string.length >= S_pad.length)
			{
			return S_string;
			}

		S_string = S_pad + S_string;

		return S_string.slice(S_string.length - S_pad.length);
		}

	function es_padTail(S_string, S_pad)
		{
		S_string = "" + S_string;

		if (S_string.length >= S_pad.length)
			{
			return S_string;
			}

		var s_string = S_string + S_pad;

		return s_string.slice(0, S_pad.length);
		}

	function eb_isSame(O_one, O_two, AS_exclude)
		{
		var o_log = eo_newLog();

		var o_exclude = {};

		if (AS_exclude)
			{
			for (var i_item = 0; i_item < AS_exclude.length; ++i_item)
				{
				o_exclude[AS_exclude[i_item]] = null;
				}
			}

		var o_two = {};

		for (s_item in O_two)
			{
			o_two[s_item] = null;
			}

		for (s_item in O_one)
			{
			if (!(s_item in o_exclude))
				{
				if (!(s_item in o_two))
					{
					o_log.e_Log(3, "missing in two", s_item);

					return 0;
					}

				if (O_one[s_item] != O_two[s_item])
					{
					o_log.e_Log(3, "different", s_item);
					o_log.e_Log(3, "one", O_one[s_item]);
					o_log.e_Log(3, "two", O_two[s_item]);

					return 0;
					}
				}

			delete o_two[s_item];
			}

		for (s_item in o_two)
			{
			if (!(s_item in o_exclude))
				{
				o_log.e_Log(3, "missing in one", s_item);

				return 0;
				}
			}

		return 1;
		}

	function eb_isTextNode(O_node)
		{
		return O_node.nodeType == 3;
		}

	function eb_isTextItem(O_item)
		{
		return eb_isTextNode(O_item[0]);
		}

	function es_strip(S_string)
		{
		if (S_string == null)
			{
			return "";
			}

		return S_string.replace(/\s+/g, " ").replace(/(^ )|( $)/g, "");
		}

	function es_getText(O_item)
		{
		var s_text = "";
		var s_gap = "";

		O_item.contents().each(
		 function ()
			{
			if (eb_isTextNode(this))
				{
				s_text = s_text + this.nodeValue;
				}
			});

		return es_strip(s_text);
		}

	function eo_getModuleForm(O_module)
		{
		var o_formItem;
		
		// try standard form
		o_formItem = eo_getItem(
		 "form[id='moduleform_" + O_module.s_ID + "']");

		if (o_formItem.size() != 1)
			{
			// try linked form
			o_formItem = eo_getItem(
			 "form[id='geekitem_linkeditems_form_" + O_module.s_ID + "']");

			if (o_formItem.size() != 1)
				{
				return null;
				}
			}

		return o_formItem;
		}

	function e_getFormData(O_formItem, O_data)
		{
		O_formItem.find("input").each(
		 function ()
			{
			O_data[this.name] = this.value;
			});
		}

	function eo_appendFormSpace(O_formItem)
		{
		var o_item = eo_getItem(
		 "<span class='tom_Space'>&emsp;</span>");

		O_formItem.append(o_item);

		return o_item;
		}

	function eo_appendFormDash(O_formItem)
		{
		var o_item = eo_getItem(
		 "<span class='tom_Space'>&ndash;</span>");

		O_formItem.append(o_item);

		return o_item;
		}

	function eo_appendFormText(O_formItem, S_text)
		{
		eo_appendFormSpace(O_formItem);

		var o_item = eo_getItem(
		 "<span class='tom_Text'>" + S_text + "</span>");

		O_formItem.append(o_item);

		return o_item;
		}

	function eo_appendFormBox(O_formItem, S_text)
		{
		eo_appendFormDash(O_formItem);

		var o_item = eo_getItem(
		 "<span class='tom_Space'>" +
		 "</span>"
		 );

		o_item.append(
		 "<span class='tom_Box'>" +
		 S_text +
		 "</span>"
		 );

		O_formItem.append(o_item);

		return o_item;
		}

	function eo_appendFormBoxLinkItem(O_formItem, S_text, O_module, E_do)
		{
		var o_linkItem = eo_getItem(
		 "<a href='javascript://'>" + S_text + "</a>");

		if (E_do)
			{
			o_linkItem.addClass("tom_OwnBoxLink tom_OwnBoxLinkIdle");

			o_linkItem.click(
			 function (I_value)
				{
				return function (O_event)
					{
					e_ownLinkClick(O_module, eo_getItem(O_event.target),
					 "tom_OwnBoxLinkIdle", "tom_OwnBoxLinkBusy",
					 function ()
						{
						E_do(O_module, I_value);
						});
					}
				 ;
				}(parseInt(S_text)));
			}
		else
			{
			o_linkItem.addClass("tom_OwnBoxLink tom_OwnBoxLinkNone");
			}

		eo_appendFormDash(O_formItem);
		O_formItem.append(o_linkItem);

		return o_linkItem;
		}

	function eo_appendFormTextLinkItem(O_formItem, S_text, O_module, E_do)
		{
		eo_appendFormSpace(O_formItem);

		var o_linkItem = eo_getItem(
		 "<a href='javascript://'>" + S_text + "</a>");

		if (E_do)
			{
			o_linkItem.addClass("tom_OwnTextLink tom_OwnTextLinkIdle");

			o_linkItem.click(
			 function (O_event)
				{
				e_ownLinkClick(O_module, eo_getItem(O_event.target),
				 "tom_OwnTextLinkIdle", "tom_OwnTextLinkBusy",
				 function ()
					{
					E_do(O_module);
					});
				});
			}
		else
			{
			o_linkItem.addClass("tom_OwnTextLink tom_OwnTextLinkNone");
			}

		O_formItem.append(o_linkItem);

		return o_linkItem;
		}

	function eo_appendFormInputItem(
	 O_formItem, O_module, S_name, S_value, E_doFocus)
		{
		var i_size = 5;

		var o_inputItem = eo_getItem(
		 "<input" +
		 " class='tom_Input tom_InputIdle'" +
		 " type='text'" +
		 " id='" + S_name + "Input_" + O_module.s_ID + "'" +
		 " name='" + S_name + "'" +
		 " size='" + i_size + "'" + 
		 " value='" + S_value + "'" +
		 "/>");

		o_inputItem.keypress(
		 function (O_event)
			{
			if (O_event.keyCode == "13")
				{
				// prevent default submit
				return false;
				}
			});

		o_inputItem.focus(
		 function (O_event)
			{
			if (E_doFocus)
				{
				E_doFocus();
				}
			});

		o_inputItem.keyup(
		 function (O_event)
			{
			if (O_event.keyCode == "13")
				{
				O_formItem.e_Submit();
				}
			});

		eo_appendFormDash(O_formItem);
		O_formItem.append(o_inputItem);

		return o_inputItem;
		}

	function e_enableModule(O_module, B_enable)
		{
		var o_log = eo_newLog();

		// ? enable module
		if (B_enable)
			{
			eo_getItem(O_module.o_Results.o_ResultsNode)
			 .find(".moduletable th a[href^='javascript:']").each(
			 function ()
				{
				var o_item = eo_getItem(this);

				if (o_item.hasClass("tom_BGGLinkNone"))
					{
					o_item.addClass("tom_BGGLinkIdle")
					 .removeClass("tom_BGGLinkNone");
					}
				else if (o_item.hasClass("tom_BGGLinkBusy"))
					{
					o_item.addClass("tom_BGGLinkIdle")
					 .removeClass("tom_BGGLinkBusy");
					}
				else if (o_item.hasClass("tom_OwnBoxLinkNone"))
					{
					o_item.addClass("tom_OwnBoxLinkIdle")
					 .removeClass("tom_OwnBoxLinkNone");
					}
				else if (o_item.hasClass("tom_OwnBoxLinkBusy"))
					{
					o_item.addClass("tom_OwnBoxLinkIdle")
					 .removeClass("tom_OwnBoxLinkBusy");
					}
				else if (o_item.hasClass("tom_OwnTextLinkNone"))
					{
					o_item.addClass("tom_OwnTextLinkIdle")
					 .removeClass("tom_OwnTextLinkNone");
					}
				else if (o_item.hasClass("tom_OwnTextLinkBusy"))
					{
					o_item.addClass("tom_OwnTextLinkIdle")
					 .removeClass("tom_OwnTextLinkBusy");
					}
				});

			eo_getItem(O_module.o_Results.o_ResultsNode).find("input").each(
			 function ()
				{
				var o_item = $(this);

				o_item.prop("disabled", false);

				if (o_item.hasClass("tom_InputBusy"))
					{
					o_item.addClass("tom_InputIdle")
					 .removeClass("tom_InputBusy");
					}
				else if (o_item.hasClass("tom_InputNone"))
					{
					o_item.addClass("tom_InputIdle")
					 .removeClass("tom_InputNone");
					}
				});

			var o_showInputItem =
			 eo_getItem(O_module.o_Results.o_ShowInputNode);

			o_showInputItem.attr("value", O_module.i_Show);

			var o_pageInputItem =
			 eo_getItem(O_module.o_Results.o_PageInputNode);

			o_pageInputItem.attr("value", O_module.i_Page);

			var o_toggleItem = eo_getItem(
			 "#toggle_" + O_module.s_ID + " img");

			o_toggleItem.addClass("tom_ToggleIdle")
			 .removeClass("tom_ToggleNone");

			var o_titleItem = eo_getItem(O_module.o_Results.o_TitleNode);

			o_titleItem.addClass("tom_TitleIdle")
			 .removeClass("tom_TitleBusy").removeClass("tom_TitleNone");

			O_module.b_Busy = false;
			}
		// ! disable module
		else
			{
			O_module.b_Busy = true;

			var o_titleItem = eo_getItem(O_module.o_Results.o_TitleNode);

			if (o_titleItem.hasClass("tom_TitleIdle"))
				{
				o_titleItem.addClass("tom_TitleNone")
				 .removeClass("tom_TitleIdle");
				}

			var o_toggleItem = eo_getItem(
			 "#toggle_" + O_module.s_ID + " img");

			o_toggleItem.addClass("tom_ToggleNone")
			 .removeClass("tom_ToggleIdle");

			eo_getItem(O_module.o_Results.o_ResultsNode)
			 .find(".moduletable th a[href^='javascript:']").each(
			 function ()
				{
				var o_item = eo_getItem(this);

				if (o_item.hasClass("tom_BGGLinkIdle"))
					{
					o_log.e_Log(3, "class='" + o_item.attr("class") + "'");
					o_item.addClass("tom_BGGLinkNone")
					 .removeClass("tom_BGGLinkIdle");
					o_log.e_Log(3, "class='" + o_item.attr("class") + "'");
					}
				else if (o_item.hasClass("tom_OwnBoxLinkIdle"))
					{
					if (this !== O_module.o_Results.o_StopBoxLinkNode)
						{
						o_item.addClass("tom_OwnBoxLinkNone")
						 .removeClass("tom_OwnBoxLinkIdle");
						}
					}
				});

			eo_getItem(O_module.o_Results.o_ResultsNode).find("input").each(
			 function ()
				{
				var o_item = $(this);

				if (o_item.hasClass("tom_InputIdle"))
					{
					o_item.addClass("tom_InputNone")
					 .removeClass("tom_InputIdle");

					o_item.prop("disabled", true);
					}
				});
			}
		}

	function e_enableInput(O_inputItem, B_enable)
		{
		// ? enable input
		if (B_enable)
			{
			O_inputItem.addClass("tom_InputIdle").removeClass("tom_InputBusy");

			eo_getNode(O_inputItem).disabled = false;
			}
		// ! disable input
		else
			{
			O_inputItem.addClass("tom_InputBusy").removeClass("tom_InputIdle");

			eo_getNode(O_inputItem).disabled = true;
			}
		}

	function ev_getInputValue(O_inputItem)
		{
		return O_inputItem.attr("value");
		}

	function e_setInputValue(O_inputItem, V_value)
		{
		O_inputItem.attr("value", V_value);
		}

	function e_setForms(O_module, O_cached, O_results)
		{
		var o_pagesItem = eo_getItem(O_results.o_PagesNode);
		
		o_pagesItem.empty();

		var i_items = O_cached.o_Unit.i_Items;

		if (i_items == 0)
			{
			eo_getItem(O_results.o_ItemsNode).hide();
			}
		else
			{
			e_appendStopForm(o_pagesItem, O_module, O_cached, O_results);
			e_appendShowForm(o_pagesItem, O_module, O_cached, O_results);
			e_appendPageForm(o_pagesItem, O_module, O_cached, O_results);
			}
		}

	function e_appendStopForm(O_pagesItem, O_module, O_cached, O_results)
		{
		var o_formItem = eo_getItem("<form id='workForm_"
		 + O_module.s_ID + "' style='display:none;'></form>");

		O_results.o_StopFormNode = eo_getNode(o_formItem);

		eo_appendFormText(o_formItem, "stop");

		O_results.o_StopBoxLinkNode = eo_getNode(
		 eo_appendFormBoxLinkItem(o_formItem, "0", O_module,
		 function (O_module)
			{
			O_module.b_Cancel = true;

			e_showStopForm(O_module, 0);
			}));

		O_pagesItem.append(o_formItem);
		}

	function e_setStopValue(O_module, V_value)
		{
		eo_getItem(O_module.o_Results.o_StopBoxLinkNode).innerHTML(V_value);
		}

	function e_showStopForm(O_module, B_show)
		{
		O_module.o_Results.o_StopFormNode.style.display =
		 B_show ? "inline" : "none";
		}

	function e_appendShowForm(O_pagesItem, O_module, O_cached, O_results)
		{
		var e_do = e_showRequest;

		var o_formItem = eo_getItem("<form id='showForm_"
		 + O_module.s_ID + "' style='display:inline;'></form>");

		O_results.o_ShowFormNode = eo_getNode(o_formItem);

		var i_items = O_cached.o_Unit.i_Items;

		// ? no items means no form items
		if (!i_items)
			{
			return;
			}

		eo_appendFormText(o_formItem, "show");

		var o_inputItem;

		var e_doFocus =
		 function ()
			{
			e_setInputValue(
			 eo_getItem("#pageInput_" + O_module.s_ID), O_module.i_Page);
			};

		// ! default is first item
		if (O_module.i_Show > O_module.i_MinLoad)
			{
			eo_appendFormBoxLinkItem(
			 o_formItem, O_module.i_MinLoad, O_module, e_do);

			o_inputItem = eo_appendFormInputItem(
			 o_formItem, O_module, "show", O_module.i_Show, e_doFocus);

			if (i_items > O_module.i_Show)
				{
				eo_appendFormBoxLinkItem(o_formItem, i_items, O_module, e_do);
				}
			}
		// ! input is first item
		else
			{
			o_inputItem = eo_appendFormInputItem(
			 o_formItem, O_module, "show", O_module.i_Show, e_doFocus);

			if (i_items > O_module.i_MinLoad)
				{
				if (O_module.i_MinLoad > O_module.i_Show)
					{
					eo_appendFormBoxLinkItem(
					 o_formItem, O_module.i_MinLoad, O_module, e_do);
					}

				if (i_items > O_module.i_MinLoad)
					{
					eo_appendFormBoxLinkItem(
					 o_formItem, i_items, O_module, e_do);
					}
				}
			}

		O_results.o_ShowInputNode = eo_getNode(o_inputItem);

		o_formItem.e_Submit =
		 function ()
			{
			var o_inputNode = O_module.o_Results.o_ShowInputNode;

			e_enableInput(eo_getItem(o_inputNode), 0);

			e_timed(
			 function ()
				{
				e_showRequest(O_module, parseInt(o_inputNode.value));
				});
			};

		o_formItem.submit =
		 function ()
			{
			// should never happen!
			alert("submit show");
			};

		O_pagesItem.append(o_formItem);
		}

	function e_appendPageForm(O_pagesItem, O_module, O_cached, O_results)
		{
		var i_items = O_cached.o_Unit.i_Items;

		// ? no items no form
		if (!i_items)
			{
			return;
			}

		var i_pages = ei_getPage(O_module.i_Show, i_items);

		// ? one page no form
		if (i_pages == 1)
			{
			return;
			}

		var e_do = e_pageRequest;

		var o_formItem = eo_getItem("<form id='pageForm_"
		 + O_module.s_ID + "' style='display:inline;'></form>");

		O_results.o_PageFormNode = eo_getNode(o_formItem);

		eo_appendFormText(o_formItem, "page");

		if (O_module.i_Page > 1)
			{
			eo_appendFormBoxLinkItem(o_formItem, 1, O_module, e_do);
			}

		if (O_module.i_Page > 2)
			{
			eo_appendFormBoxLinkItem(
			 o_formItem, O_module.i_Page - 1, O_module, e_do);
			}

		var e_doFocus =
		 function ()
			{
			e_setInputValue(
			 eo_getItem("#showInput_" + O_module.s_ID), O_module.i_Show);
			};

		var o_inputItem = eo_appendFormInputItem(
		 o_formItem, O_module, "page", O_module.i_Page, e_doFocus);

		if (O_module.i_Page < i_pages - 1)
			{
			eo_appendFormBoxLinkItem(
			 o_formItem, O_module.i_Page + 1, O_module, e_do);
			}

		if (O_module.i_Page < i_pages)
			{
			eo_appendFormBoxLinkItem(
			 o_formItem, i_pages, O_module, e_do);
			}

		O_results.o_PageInputNode = eo_getNode(o_inputItem);

		o_formItem.e_Submit =
		 function ()
			{
			var o_inputNode = O_module.o_Results.o_PageInputNode;

			e_enableInput(eo_getItem(o_inputNode), 0);

			e_timed(
			 function ()
				{
				e_pageRequest(O_module, parseInt(o_inputNode.value));
				});
			};

		o_formItem.submit =
		 function ()
			{
			// should never happen!
			alert("submit page");
			};

		O_pagesItem.append(o_formItem);
		}

	function e_delegateJavascriptLinks(O_module, O_resultsItem)
		{
		var o_log = eo_newLog(O_module);

		O_resultsItem.find(".moduletable th a").each(
		 function ()
			{
			var o_item = eo_getItem(this);

			// ? non-code links just get hover behaviour
			if (!o_item.is("[href^='javascript:']"))
				{
				o_item.addClass("tom_BGGLinkIdle");

				return;
				}

			var s_code = o_item.attr("onclick");
			s_code = s_code ? es_strip(s_code) : "";

			if (s_code == "")
				{
				var s_href = o_item.attr("href");

				if (!s_href)
					{
					return;
					}

				var as_match = s_href.match(/^javascript:( *\/\/ *)?(.*)$/);

				if (as_match && as_match[1])
					{
					return;
					}

				s_code = es_strip(as_match[2]);
				}

			var e_do;
			var s_eval = "e_do = function () {" + s_code + "}";

			try
				{
				eval(s_eval);
				}

			catch (O_error)
				{
				o_log.e_Log(1,
				 "eval '" + s_eval + "' failed: " + O_error.message);

				return;
				}

			o_log.e_Log(4, es_toString(e_do));

			o_item.attr("href", "javascript://");
			o_item.removeAttr("onclick");

			// save the code for request data deduction
			o_item.attr("tom_onclick", s_code);

			// add hover behaviour
			o_item.addClass("tom_BGGLinkIdle");

			o_item.click(
			 function (O_event)
				{
				e_bggLinkClick(O_module, eo_getItem(O_event.target), e_do);
				});
			});
		}

	function e_itemsRequest(
	 O_module, O_headResults, O_requestData, O_cached, E_failure)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		var i_show = O_headResults.i_Show;

		// ? no items, no page
		if (i_show == 0)
			{
			o_log.e_Log(2, "no page");

			O_cached.o_Unit.i_Items = 0;
			o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

			e_showUnit(O_module, O_cached, O_headResults);

			return;
			}

		var i_pages = O_headResults.i_Pages;

		// ? one page means items as shown
		if (i_pages == 1)
			{
			o_log.e_Log(2, "one page");

			O_cached.o_Unit.i_Items = i_show;
			o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

			e_showUnit(O_module, O_cached, O_headResults);

			return;
			}

		var o_requestData = eo_dubRequestData(O_requestData);

		o_log.e_Log(4, es_toString(o_requestData));

		// ? cumbersome search for last page
		if (i_pages == -1)
			{
			var o_defaultCached = eo_getCached(
			 O_module, O_module.o_DefaultRequestData);

			o_log.e_Log(3, "default key='" + o_defaultCached.o_Unit.s_Key +
			 "', requested key='" + O_cached.o_Unit.s_Key + "'");

			// ? default (initial) unit
			if (o_defaultCached.o_Unit == O_cached.o_Unit)
				{
				o_log.e_Log(2, "default unit");

				// pick some starting page (anyway it's my year of birth ;)
				o_requestData.pageid = 64;
				}
			// ! optimize for other units with less items
			else
				{
				o_log.e_Log(2, "not default unit");

				// ? no items in default unit, no items in requested unit
				if (o_defaultCached.o_Unit.i_Items == 0)
					{
					o_log.e_Log(2, "no items in default unit");

					O_cached.o_Unit.i_Items = 0;
					o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

					e_showUnit(O_module, O_cached, O_headResults);

					return;
					}

				i_pages = ei_getPage(
				 O_module.i_MinLoad, o_defaultCached.o_Unit.i_Items);

				o_requestData.pageid =
				 (i_pages & 1 ? i_pages + 1 : i_pages) / 2;

				o_log.e_Log(3, "page=" + o_requestData.pageid);
				}

			e_moreRequest(0, 0);

			return;
			}

		// request last page

		o_requestData.pageid = i_pages;

		o_log.e_Log(4, "requestData", es_toString(o_requestData));

		e_request(O_module, O_cached, o_requestData,
		 function (O_tailResults, E_failure)
			{
			// also works with empty last page
			O_cached.o_Unit.i_Items =
			 (i_pages - 1) * i_show + O_tailResults.i_Show;

			o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

			e_showUnit(O_module, O_cached, O_headResults);
			},
		 E_failure);

		return;

		function e_moreRequest(I_low, I_high)
			{
			var o_log = eo_newLog(e_itemsRequest, O_module);

			o_log.e_Log(3, "low=" + I_low + ", high=" + I_high +
			 ", page=" + o_requestData.pageid);

			o_log.e_Log(4, "requestData", es_toString(o_requestData));

			e_request(O_module, O_cached, o_requestData,
			 function (O_tailResults, E_failure)
				{
				o_log.e_Log(3, "page=" + O_tailResults.i_Page +
				 ", pages=" + O_tailResults.i_Pages);

				// ? page with items, narrow from below or done
				if (O_tailResults.i_Show != 0)
					{
					I_low = o_requestData.pageid;

					// don't trust bgg here, wrong pages turning up
					if (O_tailResults.i_Pages != -1
					 && O_tailResults.i_Pages != O_tailResults.i_Page)
						{
						O_tailResults.i_Pages = -1;
						}

					// ? got last page or bgg yields false more
					if ((I_high - I_low) == 1
					 || O_tailResults.i_Pages != -1
					 || O_tailResults.i_Show < o_requestData.showcount)
						{
						O_cached.o_Unit.i_Items = (I_low - 1)
						 * O_headResults.i_Show + O_tailResults.i_Show;

						o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

						e_showUnit(O_module, O_cached, O_headResults);

						return;
						}
					}
				// ! empty page, narrow from above
				else
					{
					o_log.e_Log(3, "empty page, narrow from above");

					I_high = o_requestData.pageid;

					// ? no more pages between, take full page before
					if (I_high - I_low <= 1)
						{
						O_cached.o_Unit.i_Items = (I_high - 1)
						 * O_headResults.i_Show;

						o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

						e_showUnit(O_module, O_cached, O_headResults);

						return;
						}
					}

				// ? no empty page found yet, double amount of pages
				if (I_high == 0)
					{
					o_requestData.pageid *= 2;
					}
				// ! got upper bound already, half gap
				else
					{
					var i_delta = (I_high - I_low);

					if (i_delta & 1)
						{
						i_delta -= 1;
						}

					o_requestData.pageid = I_high - i_delta / 2;
					}

				e_moreRequest(I_low, I_high);
				},
			 E_failure);
			}
		}

	function e_showRequest(O_module, I_show)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(3, "show=" + I_show);

		function e_failure()
			{
			var o_inputItem = eo_getItem(O_module.o_Results.o_ShowInputNode);
			e_setInputValue(o_inputItem, O_module.i_Show);

			e_enableInput(o_inputItem, 1);
			}

		var s_cancel;

		if (isNaN(I_show))
			{
			s_cancel = "show is no number";
			}
		else if (I_show < 1)
			{
			s_cancel = "invalid show";
			}

		if (s_cancel)
			{
			o_log.e_Log(1, s_cancel);

			e_failure();

			return;
			}

		var i_items = O_module.o_Cached.o_Unit.i_Items;

		if (I_show > i_items)
			{
			o_log.e_Log(3, "show " + I_show + " adjusted to " + i_items);

			I_show = i_items;
			}

		e_showItems(O_module, O_module.o_Cached.o_Sort.o_DefaultRequestData,
		 I_show, 1, e_failure);
		}

	function e_pageRequest(O_module, I_page)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(3, "page=" + I_page);

		function e_failure()
			{
			var o_inputItem = eo_getItem(O_module.o_Results.o_PageInputNode);
			e_setInputValue(o_inputItem, O_module.i_Page);

			e_enableInput(o_inputItem, 1);
			}

		var s_cancel;

		if (isNaN(I_page))
			{
			s_cancel = "page is no number";
			}
		else if (I_page < 1)
			{
			s_cancel = "invalid page";
			}

		if (s_cancel)
			{
			o_log.e_Log(1, s_cancel);

			e_failure();

			return;
			}

		var i_items = O_module.o_Cached.o_Unit.i_Items;
		var i_pages = ei_getPage(O_module.i_Show, i_items);

		if (I_page > i_pages)
			{
			o_log.e_Log(3, "page " + I_page + " adjusted to " + i_pages);

			I_page = i_pages;
			}

		e_showItems(O_module, O_module.o_Cached.o_Sort.o_DefaultRequestData,
		 O_module.i_Show, I_page, e_failure);
		}

	function eo_getIDModule(S_moduleID)
		{
		return eo_getNode(eo_getIDResultsItem(S_moduleID)
		 .parents("table[class='geekitem_module']")).o_Module;
		}

	function e_bggRequestProxy(O_requestData, S_url)
		{
		var o_log = eo_newLog();

		var o_module = eo_getIDModule(O_requestData.instanceid);

		// ? prevent bgg request before links are delegated
		if (!o_module)
			{
			o_log.e_Log(1,
			 "module " + O_requestData.instanceid + " not ready");

			return;
			}

		o_log = eo_newLog(o_module);

		O_requestData.ajax = 1;

		// should be 1 anyway for all remaining bgg requests
		O_requestData.pageid = 1;

		// ensure showcount needed later
		O_requestData.showcount = o_module.i_MinLoad;

		o_log.e_Log(3, "requestData", es_toString(O_requestData));

		// ? url must have changed in bgg
		if (S_url != o_module.s_RequestURL)
			{
			o_log.e_Log(0, "mismatching urls: requested='" + S_url + "', " +
			 "calculated='" + o_module.s_RequestURL + "'");

			return;
			}

		e_bggRequest(o_module, O_requestData)
		}

	function e_bggRequest(O_module, O_requestData)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		var o_cached = eo_getCached(O_module, O_requestData);

		// ? later requests for unit don't need items request
		if (eb_hasSlot(o_cached.o_Unit, "i_Items"))
			{
			e_showItems(O_module, O_requestData,
			 o_cached.o_Unit.i_Items >= O_requestData.showcount
			 ? O_requestData.showcount : o_cached.o_Unit.i_Items, 1);

			return;
			}

		// first request for unit

		e_enableModule(O_module, 0);

		e_request(O_module, o_cached, O_requestData,
		 function (O_results, E_failure)
			{
			e_itemsRequest(
			 O_module, O_results, O_requestData, o_cached, E_failure);
			},
		 function ()
			{
			e_enableModule(O_module, 1);
			});
		}

	function e_bggSetField(S_field, V_value, S_formID)
		{
		var o_module = eo_getIDModule(S_formID.replace(/.*_/, ""));

		var o_log = eo_newLog(o_module);

		o_log.e_Log(3, "formID=" + S_formID);
		o_log.e_Log(3, "value=" + es_toString(V_value));

		var o_formData = eo_newFormRequestData(o_module, o_module.o_Results);
		o_log.e_Log(3, "formData", es_toString(o_formData));

		o_module.o_Subject.MOD_Module_SetField(S_field, V_value, S_formID);
		}
			
	function eo_getIDResultsItem(S_moduleID)
		{
		return eo_getItem("#results_" + S_moduleID);
		}

	function es_getLabel(S_title)
		{
		return S_title.replace(/ */g, "");
		}

	function eo_newRequestData(O_module, O_results)
		{
		var o_log = eo_newLog(O_module);

		var s_action = "module";
		var eb_getRequestData = eb_getFormRequestData;

		var i_show = 10;

		switch (O_module.s_Label)
			{
		case "Blogs":
			O_module.s_RequestURL = "/geekblog.php";

			s_action = "outputmodule";

			break;
		case "Forums":
			O_module.s_RequestURL = "/geekforum.php";

			break;
		case "LinkedForums":
			O_module.s_RequestURL = "/geekforum.php";

			break;
		case "Videos":
			O_module.s_RequestURL = "/geekvideomodule.php";
			i_show = 15;

			break;
		case "LinkedItems":
		case "WebLinks":
			O_module.s_RequestURL = "/geekitem.php";

			s_action = "linkeditems";

			break;
		case "Versions":
			O_module.s_RequestURL = "/geekitem.php";
			i_show = 5;

			s_action = "linkeditems";

			break;
		case "Files":
			O_module.s_RequestURL = "/geekfile.php";

			eb_getRequestData = eb_getFilesRequestData;

			break;
		case "GeekLists":
			O_module.s_RequestURL = "/geeklist.php";

			s_action = "geeklistmodule";
			eb_getRequestData = eb_getGeekListsRequestData;

			break;
		case "Images":
			O_module.s_RequestURL = "/geekimagemodule.php";
			i_show = 15;

			s_action = "imagemodule";
			eb_getRequestData = eb_getImagesRequestData;

			break;
		default:
			o_log.e_Log(1, "unknown module");

			var o_commandsItems = eo_getCommandsItems(O_results, 1)

			if (!o_commandsItems)
				{
				o_log.e_Log(1, "no module commands");

				return null;
				}

			var o_selectedItem =
			 o_commandsItems.slice(0, 1).find("a.selected");

			if (o_selectedItem.size() != 1)
				{
				o_log.e_Log(1, "not one selected module command");

				return null;
				}

			if (!o_selectedItem.is("[href='javascript://']"))
				{
				o_log.e_Log(1, "no javascript function");

				return null;
				}

			// original 'onclick' has been removed by delegating the link
			var s_onclick = o_selectedItem.attr("tom_onclick");

			if (s_onclick == undefined)
				{
				o_log.e_Log(1, "no onclick");
				}

			if (s_onclick.search(/^\s*MOD_SetLinkedItemsField\s*\(/) == -1)
				{
				o_log.e_Log(1, "unknown javascript function");
				}

			// unknown module but hope it works like other linked modules

			o_log.e_Log(1, "unknown module treated as linked items module");

			O_module.s_RequestURL = "/geekitem.php";

			s_action = "linkeditems";

			break;
			}

		// create generic request data

		var o_requestData = {};

		if (!eb_getRequestData(O_module, o_requestData, O_results))
			{
			o_log.e_Log(1, "no request data");

			return null;
			}

		// values could be wrong or missing in form (e.g. Blogs.action),
		 // set them after gathering form data

		o_requestData.action = s_action;
		o_requestData.ajax = 1;
		o_requestData.instanceid = O_module.s_ID;

		// these are defaults needed later

		o_requestData.pageid = 1;
		o_requestData.showcount = i_show;

		return o_requestData
		}

	function eb_getFormRequestData(O_module, O_requestData)
		{
		var o_log = eo_newLog(O_module);

		var o_formItem = eo_getModuleForm(O_module);
		
		if (!o_formItem)
			{
			return 0;
			}

		e_getFormData(o_formItem, O_requestData);

		// ? unify empty 'forumid' to '0' for caching identity
		if (eb_hasSlot(O_requestData, "forumid")
		 && O_requestData.forumid == "")
			{
			o_log.e_Log(2, "forumid set to '0'");

			O_requestData.forumid = "0";
			}

		// ? unify empty 'blogid' to '0' for caching identity
		if (eb_hasSlot(O_requestData, "blogid")
		 && O_requestData.blogid == "")
			{
			o_log.e_Log(2, "blogid set to '0'");

			O_requestData.blogid = "0";
			}

		return 1;
		}

	function eb_getFilesRequestData(O_module, O_requestData, O_results)
		{
		var o_log = eo_newLog(O_module);

		var o_commandsItems = eo_getCommandsItems(O_results, 1)

		if (!o_commandsItems)
			{
			o_log.e_Log(1, "not 1 command item");

			return 0;
			}

		var s_sort = es_getSort(o_commandsItems.slice(0, 1));

		if (s_sort == "")
			{
			o_log.e_Log(1, "sort not found");

			return 0;
			}

		O_requestData.objectid = O_module.o_Subject.s_ID;
		O_requestData.objecttype = "thing";

		O_requestData.sort = s_sort;

		return 1;
		}

	function eb_getGeekListsRequestData(O_module, O_requestData, O_results)
		{
		var o_log = eo_newLog(O_module);

		var o_commandsItems = eo_getCommandsItems(O_results, 1)

		if (!o_commandsItems)
			{
			o_log.e_Log(1, "less than 1 command item");

			return 0;
			}

		var s_sort = es_getSort(o_commandsItems.slice(0, 1));

		// ? should never happen since lowercase sort term is taken anyway
		if (s_sort == "")
			{
			o_log.e_Log(1, "sort not found");

			return 0;
			}

		O_requestData.objectid = O_module.o_Subject.s_ID;
		O_requestData.objecttype = "thing";

		O_requestData.sort = s_sort;

		return 1;
		}

	function eb_getImagesRequestData(O_module, O_requestData, O_results)
		{
		var o_log = eo_newLog(O_module);

		function es_getGallery(O_commandsItem)
			{
			var o_log = eo_newLog();

			var o_selectedItem = O_commandsItem.find("a.selected");

			if (o_selectedItem.size() != 1)
				{
				o_log.e_Log(1, "no selected gallery");

				return "";
				}

			var s_text = es_strip(o_selectedItem.text());

			switch (s_text)
				{
			case "All":
			case "Game":
			case "People":
			case "Creative":

				break;
			default:
				o_log.e_Log(1, "unknown gallery '" + s_text + "'");
				}

			return s_text.toLowerCase();
			}

		var o_commandsItems = eo_getCommandsItems(O_results, 2)

		if (!o_commandsItems)
			{
			o_log.e_Log(1, "less than 2 command items");

			return 0;
			}

		O_requestData.objectid = O_module.o_Subject.s_ID;
		O_requestData.objecttype = "thing";

		O_requestData.linktype = "";
		O_requestData.hidegalleries = "";
		O_requestData.hidecontrols = "";
		O_requestData.hidesort = "";
		O_requestData.moduletitle = "";

		O_requestData.rowsize = 5;

		O_requestData.gallery = es_getGallery(o_commandsItems.slice(0, 1));
		O_requestData.sort = es_getSort(o_commandsItems.slice(1, 2));

		return 1;
		}

	function eo_getCommandsItems(O_results, I_needed)
		{
		var o_commandsItems;

		o_commandsItems = eo_getItem(O_results.o_ResultsNode)
		 .find(".modulecommands");

		return o_commandsItems.size() >= I_needed ? o_commandsItems : null;
		}

	function es_getSort(O_commandsItem)
		{
		var o_log = eo_newLog();

		var o_selectedItem = O_commandsItem.find("a.selected");

		if (o_selectedItem.size() != 1)
			{
			o_log.e_Log(1, "no selected sort");

			return "";
			}

		var s_text = es_strip(o_selectedItem.text());

		switch (s_text)
			{
		case "Active":
		case "Hot":
		case "Recent":
		case "Title":

			break;
		default:
			o_log.e_Log(1, "unknown sort '" + s_text + "'");
			}

		return s_text.toLowerCase();
		}

	function e_showItems(O_module, O_requestData, I_show, I_page, E_failure)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		e_enableModule(O_module, 0);

		var o_cached = eo_getCached(O_module, O_requestData);

		var i_items = o_cached.o_Unit.i_Items;

		o_log.e_Log(3, "items=" + i_items + ", " +
		 "show=" + I_show + ", " + "page=" + I_page);

		// determine item range

		var i_fromItem = ei_getFromItem(I_show, I_page);
		var i_intoItem = ei_getIntoItem(I_show, I_page);

		if (i_intoItem > i_items)
			{
			i_intoItem = i_items;
			}

		o_log.e_Log(3, "fromItem=" + i_fromItem + ", intoItem=" + i_intoItem +
		 ", items=" + (i_intoItem - i_fromItem + 1));

		// check item range against cache

		// align requested items to default boundaries

		var i_minLoad = O_module.i_MinLoad;
		var i_maxLoad = O_module.i_MaxLoad;

		var i_fromLoad = ei_getFromItem(
		 i_minLoad, ei_getPage(i_minLoad, i_fromItem));
		var i_intoLoad = ei_getIntoItem(
		 i_minLoad, ei_getPage(i_minLoad, i_intoItem));

		o_log.e_Log(3, "fromLoad=" + i_fromLoad +
		 ", " + "intoLoad=" + i_intoLoad);

		// set by 'e_getGaps', used by 'e_getLoad' and 'e_requestLoad'
		var ao_gaps = [];
		var i_miss = 0;

		e_mapGaps();

		o_log.e_Log(3, "miss=" + i_miss);

		// ? all cached, show from cache
		if (i_miss == 0)
			{
			o_log.e_Log(2, "all cached");

			e_showCached(O_module, o_cached,
			 I_show, I_page, i_fromItem, i_intoItem);

			return;
			}

		var i_gaps = ao_gaps.length;
		var i_gap = 0;

		// adust load boundaries to gaps aligned to default boundaries

		i_fromLoad = ei_getFromItem(
		 i_minLoad, ei_getPage(i_minLoad, ao_gaps[0].i_From));
		i_intoLoad = ei_getIntoItem(
		 i_minLoad, ei_getPage(i_minLoad, ao_gaps[i_gaps - 1].i_Into));

		o_log.e_Log(3, "fromLoad=" + i_fromLoad +
		 ", " + "intoLoad=" + i_intoLoad);

		var i_stop = 0;

		function e_failure ()
			{
			if (i_stop != 0)
				{
				e_showStopForm(O_module, 0);
				}

			e_enableModule(O_module, 1);

			E_failure();
			}

		var o_requestData = eo_dubRequestData(O_requestData);

		// set by 'e_getLoad', used by 'e_requestLoad'
		var i_load;
		var i_over;

		e_requestLoad();

		return;

		function e_mapGaps()
			{
			var as_items = o_cached.o_Sort.as_CachedItems;

			for (var i_item = i_fromLoad; i_item <= i_intoLoad; i_item += 1)
				{
				if (!as_items[i_item])
					{
					var o_gap = {i_From: i_item};
					ao_gaps.push(o_gap);

					while (1)
						{
						if (i_item >= i_fromItem && i_item <= i_intoItem)
							{
							i_miss += 1;
							}

						if (++i_item > i_intoLoad || as_items[i_item])
							{
							break;
							}
						}

					o_gap.i_Into = i_item - 1;

					o_log.e_Log(3, "gap (from=" + o_gap.i_From +
					 ", into=" + o_gap.i_Into + ")");
					}
				}
			}

		function e_getLoad()
			{
			while (1)
				{
				o_gap = ao_gaps[i_gap];

				if (i_fromLoad <= o_gap.i_Into)
					{
					break;
					}

				i_gap += 1;
				}

			var i_fromMiss;
			
			if (i_fromLoad > o_gap.i_From)
				{
				i_fromMiss = i_fromLoad;
				}
			else
				{
				i_fromMiss =  i_fromLoad = o_gap.i_From;
				}

			var i_intoMiss = o_gap.i_Into;

			o_log.e_Log(3, "fromMiss=" + i_fromMiss + ", intoMiss=" +
			 i_intoMiss + ", total=" + (i_intoMiss - i_fromMiss + 1));

			var i_past = i_fromMiss - 1;

			i_load = i_intoMiss - i_past;

			// ? check for one load
			if (i_load <= i_maxLoad)
				{
				o_log.e_Log(2, "try one load");

				do
					{
					i_over = i_past % i_load;

					// ? load in one request possible
					if (i_past - i_over + i_load >= i_intoMiss)
						{
						o_log.e_Log(3, "one load", i_load + ", " + i_over);

						return;
						}

					i_load += i_minLoad;
					}
				while (i_load <= i_maxLoad)
				}

			i_stop += 1;

			var i_loadTotal = i_intoMiss - i_past;

			// ? check for two loads
			if (i_loadTotal <= 2 * i_maxLoad)
				{
				o_log.e_Log(2, "try two loads");

				i_over = 0;

				var i_gotOne;
				var i_gotTwo;

				var i_loadOne = i_loadTotal > i_maxLoad
				 ? i_load - i_maxLoad : i_minLoad;

				// search for two loads with minimum overload
				do
					{
					var i_overOne = i_past % i_loadOne;
					var i_pastOne = i_past - i_overOne;

					o_log.e_Log(4, "one", "load=" + i_loadOne +
					 ", over=" + i_overOne + ", past=" + i_pastOne);

					var i_loadTwo = i_load - (i_loadOne - i_overOne);

					while (i_loadTwo <= i_maxLoad)
						{
						var i_overTwo = (i_pastOne + i_loadOne) % i_loadTwo;
						var i_pastTwo = (i_pastOne + i_loadOne) - i_overTwo;

						o_log.e_Log(4, "two", "load=" + i_loadTwo +
						 ", over=" + i_overTwo + ", past=" + i_pastTwo);

						// overload at the end
						var i_overTotal = i_pastTwo + i_loadTwo - i_intoMiss;
						o_log.e_Log(4, "overTotal=" + i_overTotal);

						// ? got required load
						if (i_overTotal >= 0)
							{
							// add overload from both starts
							i_overTotal += i_overOne + i_overTwo;
							o_log.e_Log(4, "overTotal=" + i_overTotal);

							// ? two perfect loads
							if (i_overTotal == 0)
								{
								o_log.e_Log(3, "two loads",
								 i_loadOne + ", " + i_loadTwo + ", 0");

								i_over = 0;
								i_load = i_loadOne;

								return;
								}

							if (i_over == 0 || i_over > i_overTotal)
								{
								i_over = i_overTotal;

								i_gotOne = i_loadOne;
								// two is just for logging
								i_gotTwo = i_loadTwo;
								}
							}

						i_loadTwo += i_minLoad;
						}

					i_loadOne += i_minLoad;
					}
				while (i_loadOne <= i_maxLoad)

				if (i_over != 0)
					{
					o_log.e_Log(3, "two loads",
					 i_gotOne + ", " + i_gotTwo + ", " + i_over);

					i_load = i_gotOne;
					i_over = i_past % i_load;

					return;
					}
				}

			// three or more loads, align to max load boundary

			o_log.e_Log(2, "more loads");

			if (i_past % i_maxLoad == 0)
				{
				i_over = 0;
				i_load = i_maxLoad;
				}
			else
				{
				i_load = 0;

				do
					{
					i_load += i_minLoad;
					i_over = i_past % i_load;

					if ((i_past - i_over + i_load) % i_maxLoad == 0)
						{
						break;
						}
					}
				while (i_load < i_maxLoad)
				}

			o_log.e_Log(3, "more loads", i_load + ", " + i_over);
			}

		function e_requestLoad()
			{
			var b_stop = i_stop != 0;

			e_getLoad();

			// ? more than one request shows work form
			if (i_stop != 0)
				{
				e_setStopValue(O_module, i_miss);

				if (!b_stop)
					{
					e_showStopForm(O_module, 1);
					}
				}

			o_requestData.pageid = ei_getPage(i_load, i_fromLoad);
			o_requestData.showcount = i_load;

			e_request(O_module, o_cached, o_requestData,
			 function (O_results, E_failure)
				{
				o_log.e_Log(3, "miss=" + i_miss + ", load=" + i_load +
				 ", over=" + i_over + ", show=" + O_results.i_Show);

				// ? got whole load range or last page of more pages
				if (O_results.i_Show >= i_miss)
					{
					o_log.e_Log(2, "got all", i_miss + ":" + O_results.i_Show);

					e_showStopForm(O_module, 0);

					e_showCached(O_module, o_cached,
					 I_show, I_page, i_fromItem, i_intoItem);

					return;
					}

				// ? got load limit (and wrong page)
				if (O_results.i_Show != i_load)
					{
					O_module.i_MaxLoad = i_maxLoad = O_results.i_Show;
					o_log.e_Log(3, "max load=" + O_module.i_MaxLoad);
					}
				// ! got full load requested
				else
					{
					o_log.e_Log(3, "load more");

					i_miss -= i_load - i_over;

					if (i_fromLoad < i_fromItem)
						{
						i_miss += i_fromItem - i_fromLoad;
						}

					o_log.e_Log(3, "miss=" + i_miss);

					i_fromLoad += i_load - i_over;
					o_log.e_Log(3, "load from=" + i_fromLoad);
					}

				e_requestLoad();
				},
			 e_failure);
			}
		}

	function ei_getFromItem(I_show, I_page)
		{
		return (I_page - 1) * I_show + 1;
		}

	function ei_getIntoItem(I_show, I_page)
		{
		return I_page * I_show;
		}

	function ei_getPage(I_show, I_item)
		{
		I_item += I_show - 1;

		return (I_item - I_item % I_show) / I_show;

		return Math.floor((I_item - 1) / I_show) + 1;
		}

	function ei_getFromMiss(O_module, AS_items, I_fromItem, I_intoItem)
		{
		while (I_fromItem <= I_intoItem)
			{
			if (!AS_items[I_fromItem])
				{
				break;
				}

			I_fromItem += 1;
			}
		
		return I_fromItem;
		}

	function ei_getIntoMiss(O_module, AS_items, I_fromItem, I_intoItem)
		{
		while (1)
			{
			if (!AS_items[I_intoItem])
				{
				break;
				}

			I_intoItem -= 1;
			}
		
		return I_intoItem;
		}

	function eao_mapCacheGaps(O_module, AS_cachedItems, I_fromItem, I_intoItem)
		{
		var ao_gaps = [];

		while (I_fromItem <= I_intoItem)
			{
			// ? gap from
			if (!AS_cachedItems[I_fromItem])
				{
				var o_gap = {};

				o_gap.i_From = I_fromItem;

				// find upto at first non-empty or end
				while (I_fromItem <= I_intoItem)
					{
					// ? gap upto
					if (AS_cachedItems[I_fromItem])
						{
						break;
						}

					I_fromItem += 1;
					}

				o_gap.i_Into = I_fromItem - 1;

				ao_gaps.push(o_gap);
				}

			I_fromItem += 1;
			}

		return ao_gaps;
		}

	function e_showCached(O_module, O_cached,
	 I_show, I_page, I_fromItem, I_intoItem)
		{
		e_timed(
		 function ()
			{
			O_module.o_Cached = O_cached;

			// work on copy, don't possibly fiddle with current page
			var o_results = eo_dubResults(O_cached.o_Sort.o_DefaultResults);

			var i_item = I_fromItem;

			var as_items = O_cached.o_Sort.as_CachedItems;
			var o_itemsItem = eo_getItem(o_results.o_ItemsNode);

			// ? renumber and append non-image items
			if (o_itemsItem.attr("class") == "innermoduletable")
				{
				while (i_item <= I_intoItem)
					{
					var o_item = eo_getItem(as_items[i_item]);

					o_item.find("span").first().text(i_item);

					o_itemsItem.append(o_item);

					i_item += 1
					}
				}
			// ! renumber and append image items
			else
				{
				var i_xCount = O_cached.o_Sort.o_DefaultRequestData.rowsize;
				var i_xItems = 0;

				while (i_item <= I_intoItem)
					{
					if (i_xItems++ % i_xCount == 0)
						{
						o_itemsItem.append($("<tr></tr>"));
						}

					var o_item = eo_getItem(as_items[i_item]);

					o_item.find("img").attr("title", i_item);

					o_itemsItem.children().last().append(o_item);

					i_item += 1
					}
				}

			o_results.i_Show = I_intoItem - I_fromItem + 1;

			O_module.i_Page = I_page;
			O_module.i_Show = I_show;

			e_showResults(O_module, O_cached, o_results);
			});
		}

	function e_showResults(O_module, O_cached, O_results)
		{
		e_setForms(O_module, O_cached, O_results);

		if (O_module.o_Results != O_results)
			{
			eo_getItem(O_module.o_Results.o_ResultsNode)
			 .replaceWith(O_results.o_ResultsNode);

			O_module.o_Results = O_results;
			}

		O_module.o_Cached = O_cached;

		e_enableModule(O_module, 1);
		}

	function e_request(O_module, O_cached, O_requestData, E_success, E_failure)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		if (O_module.b_Cancel)
			{
			O_module.b_Cancel = false;

			E_failure();

			return;
			}

		o_log.e_Log(3, "requestData", es_toString(O_requestData));

		$.get(O_module.s_RequestURL, O_requestData)
		 .success(
		 function (S_html)
			{
			o_log.e_Log(2, "success");

			var o_resultsItem = eo_getItem(
			 "<div id='results_" + O_module.s_ID + "'>" +
			 S_html +
			 "</div>"
			 );

			var o_results = eo_newResults(
			 O_module, o_resultsItem, O_requestData, O_cached);

			if (o_results)
				{
				o_log.e_Log(4, "results", es_toString(o_results));

				E_success(o_results, E_failure);
				}
			else
				{
				o_log.e_Log(1, "no results");

				if (E_failure)
					{
					E_failure();
					}

				// ??? success needed for more request
				//E_success(null, E_failure);
				}
			})
		 .error(
		 function ()
			{
			o_log.e_Log(2, "failure");

			if (E_failure)
				{
				E_failure();
				}
			});
		}

	function eo_dubRequestData(O_requestData)
		{
		var o_requestData = {};

		for (s_member in O_requestData)
			{
			o_requestData[s_member] = O_requestData[s_member];
			}

		return o_requestData;
		}

	function eo_dubResults(O_results)
		{
		var o_resultsItem = eo_getItem(O_results.o_ResultsNode).clone(true);

		var o_itemsItem = eo_getItemsItem(o_resultsItem);
		o_itemsItem.empty();

		var o_results = {};

		o_results.o_ResultsNode = eo_getNode(o_resultsItem);

		o_results.o_TitleNode = eo_getNode(eo_getTitleItem(o_resultsItem));
		o_results.s_Title = O_results.s_Title;

		o_results.o_PagesNode = eo_getNode(eo_getPagesItem(o_resultsItem));
		o_results.i_Page = O_results.i_Page;
		o_results.i_Pages = O_results.i_Pages;

		o_results.o_ItemsNode = eo_getNode(o_itemsItem);
		o_results.i_Show = O_results.i_Show;

		return o_results;
		}

	function e_hrefLinksOpenNewWindow(O_moduleItem)
		{
		O_moduleItem.find("a").each(
		 function ()
			{
			var o_linkItem = eo_getItem(this);

			var s_href = o_linkItem.attr("href");

			if (s_href && s_href.search(/^(#|javascript:)/) == -1)
				{
				o_linkItem.attr("target", "_blank");
				}
			});
		}

	function es_getTitle(O_module, O_resultsItem)
		{
		var o_log = eo_newLog();

		var o_titleParentItem = O_resultsItem.find("[class='module_title']");

		o_log.e_Log(4, o_titleParentItem.outerHTML());

		if (o_titleParentItem.size() != 1)
			{
			o_log.e_Log(1, "not 1 title item");

			return "";
			}

		// collect text items

		var o_titleItems = o_titleParentItem.contents();

		var i_items = o_titleItems.size();

		for (var i_item = 0; i_item < i_items; i_item += 1)
			{
			if (!eb_isTextItem(o_titleItems.eq(i_item)))
				{
				break;
				}
			}

		if (i_item == 0)
			{
			o_log.e_Log(1, "no text nodes");

			return "";
			}

		var o_titleTextItems = o_titleItems.slice(0, i_item);

		// insert space before uppercase letters
		var s_title = es_strip(o_titleTextItems.text())
		 .replace(/([^A-Z\s])([A-Z])/g, "$1 $2");

		if (s_title == "")
			{
			o_log.e_Log(1, "no text");

			return "";
			}

		o_log.e_Log(2, "title='" + s_title + "'");

		o_titleTextItems.remove();

		var o_titleItem = eo_getItem(
		 "<a class='tom_TitleIdle' href='javascript://'>" +
			s_title +
		 "</a>");

		o_titleItem.click(
		 function (O_event)
			{
			e_ownLinkClick(O_module, eo_getItem(O_event.target),
			 "tom_TitleIdle", "tom_TitleBusy",
			 function ()
				{
				e_checkItems(O_module);
				});
			});

		o_titleParentItem.prepend(o_titleItem);

		return s_title;
		}

	function eo_getTitleItem(O_resultsItem)
		{
		var o_titleItem =
		 O_resultsItem.find("[class='module_title'] a").first();

		return o_titleItem.size() == 1 ? o_titleItem : null;
		}

	function eo_getPagesItem(O_resultsItem)
		{
		var o_pagesItem = O_resultsItem.find("div[class='pages']");

		return o_pagesItem.size() == 1 ? o_pagesItem : null;
		}

	function eo_getItemsItem(O_resultsItem)
		{
		var o_itemsItem = O_resultsItem.find(
		 "div[id^='module_'] table").first();

		return o_itemsItem.size() == 1 ? o_itemsItem : null;
		}

	function eo_newResults(O_module, O_resultsItem, O_requestData, O_cached)
		{
		var o_log = eo_newLog(O_module);

		e_unifyHeader(O_module, O_resultsItem);
		e_hrefLinksOpenNewWindow(O_resultsItem);

		var s_title = es_getTitle(O_module, O_resultsItem);

		if (s_title == "")
			{
			o_log.e_Log(1, "no title");

			return null;
			}

		// ? set label just for logging
		if (!O_requestData)
			{
			O_module.s_Label = es_getLabel(s_title);

			o_log = eo_newLog(O_module);
			}

		var o_titleItem = eo_getTitleItem(O_resultsItem);

		if (!o_titleItem)
			{
			o_log.e_Log(1, "no title item");

			return null;
			}

		var o_pagesItem = eo_getPagesItem(O_resultsItem);

		if (!o_pagesItem)
			{
			o_log.e_Log(1, "no pages item");

			return null;
			}

		var o_itemsItem = eo_getItemsItem(O_resultsItem);

		if (!o_itemsItem)
			{
			o_log.e_Log(1, "no items item");

			return null;
			}

		var s_text = es_getText(o_pagesItem);
		o_log.e_Log(2, "pages text",  es_toString(es_strip(s_text)));

		var r_page = /^\s*pg.\s*(\d+)/i;

		// ? no pages text
		if (s_text.search(r_page) == -1)
			{
			o_log.e_Log(1, "no pages text");

			return null;
			}

		// determine page from text
		var i_page = parseInt(s_text.replace(r_page, "$1"));

		// ? not the page requested
		if (O_requestData && i_page != O_requestData.pageid)
			{
			o_log.e_Log(1, "wrong page",
			 "requested " + O_requestData.pageid + ", got " + i_page);

			return null;
			}

		var o_results = {};

		o_results.i_Page = i_page;
		o_log.e_Log(3, "page=" + i_page);

		o_results.o_ResultsNode = eo_getNode(O_resultsItem);

		o_results.o_TitleNode = eo_getNode(o_titleItem);
		o_results.s_Title = s_title;

		o_results.o_PagesNode = eo_getNode(o_pagesItem);

		o_results.o_ItemsNode = eo_getNode(o_itemsItem);
		o_results.i_Show = ei_countItems(o_itemsItem);
		o_log.e_Log(3, "show=" + o_results.i_Show);

		// ? initial call from 'eo_newModule'
		if (!O_requestData)
			{
			O_requestData = eo_newRequestData(O_module, o_results);

			if (!O_requestData)
				{
				o_log.e_Log(1, "no request data");

				return null;
				}

			o_log.e_Log(3, "default request data", es_toString(O_requestData));

			// showcount is set per module in 'eo_newRequestData'
			O_module.i_MinLoad = O_requestData.showcount;

			// self-imposed load limit is 5 times default
			 // (chosen because it's the limit anyway for some modules)
			O_module.i_MaxLoad = O_module.i_MinLoad * 5;

			O_cached = eo_getCached(O_module, O_requestData);

			O_module.o_DefaultRequestData = O_requestData;
			}

		e_delegateJavascriptLinks(O_module, O_resultsItem);

		var r_pages = /^\s*pg.\s*\d+\s*(of|\/)\s*(\d+).*$/i;

		// ? can determine pages from pages text
		if (s_text.search(r_pages) != -1)
			{
			o_results.i_Pages = parseInt(s_text.replace(r_pages, "$2"));

			// test for more pages sometiems yield wrong pages count
			 // which is dealt with later
			}
		// ! no pages text, search for more pages
		else
			{
			o_results.i_Pages = o_results.i_Page;

			// check for (next page) link after page text

			var o_items = o_pagesItem.contents();
			var i_items = o_items.size();
			var i_item = i_items;

			while (i_item)
				{
				var o_item = o_items.eq(--i_item);

				// ? next page link
				if (o_item.is("a[href='javascript://']"))
					{
					o_log.e_Log(2, "more pages");

					o_results.i_Pages = -1;

					break;
					}

				// ? no next page link found
				if (eb_isTextItem(o_item) && es_strip(o_item.text()))
					{
					break;
					}
				}
			}

		o_log.e_Log(3, "pages=" + o_results.i_Pages);

		// ? empty page, nothing to adjust
		if (o_results.i_Show == 0)
			{
			o_log.e_Log(2, "empty page");

			// could be page 1 of 0, page 0 of 0, page 1,
			 // empty last page or test for more pages

			// ? correct all oddities (yields a possibly wrong pages count
			 // in case of test for more pages which is dealt with later)
			if (o_results.i_Pages > 0)
				{
				o_results.i_Pages -= 1;

				o_log.e_Log(3, "pages=" + o_results.i_Pages);
				}

			e_setCachedResults(O_cached, o_results);

			return o_results;
			}

		// assume show which might be wrong for last page (if not first page)
		var i_show = o_results.i_Show;

		// ? not page 1 (inital results and bgg request are page 1)
		if (o_results.i_Page > 1)
			{
			// ? items request
			if (!eb_hasSlot(O_cached.o_Unit, "i_Items"))
				{
				o_log.e_Log(3, "requestData", es_toString(O_requestData));

				// showcount is sure to be set
				i_show = O_requestData.showcount;
				o_log.e_Log(3, "request data show=" + i_show);
				}
			// ! any other request
			else
				{
				// ? last (but not only) page, calculate show
				if (o_results.i_Page == o_results.i_Pages)
					{
					o_log.e_Log(3, "items=" + O_cached.o_Unit.i_Items);

					i_show = (O_cached.o_Unit.i_Items - i_show)
					 / (o_results.i_Page - 1);

					o_log.e_Log(3, "calculated show=" + i_show);
					}
				}
			}

		var i_item = ei_getFromItem(i_show, o_results.i_Page);
		o_log.e_Log(3, "i_show=" + i_show + ", item=" + i_item);

		e_adjustItems(O_module, o_results, i_item);
		e_cacheItems(O_module, o_results, i_item, O_cached);
		
		e_setCachedResults(O_cached, o_results);

		return o_results;
		}

	function e_adjustItems(O_module, O_results, I_item)
		{
		function e_spanWrap(O_item)
			{
			var s_text = es_getText(O_item);

			O_item.empty();

			O_item.prepend(
			 "<span class='sf'>" +
				 s_text +
			 "</span>");
			}

		function e_smallThumbs(O_rowItem)
			{
			var o_firstCellItem = O_rowItem.children("td").first();

			// ? text-only cell should be thumbs count
			if (o_firstCellItem.children().size() == 0)
				{
				e_spanWrap(o_firstCellItem);
				}
			else
				{
				// check for 'geekrecommend' link

				var o_firstLinkItem = o_firstCellItem.children("a");

				if (o_firstLinkItem.size() == 1)
					{
					var s_href = o_firstLinkItem.attr("href");

					if (s_href.search(/.*\/geekrecommend.php\?/) != -1)
						{
						o_firstLinkItem.addClass("sf");
						}
					}
				}
			}

		function e_smallComments(O_rowItem)
			{
			var o_blogCommentsItem = O_rowItem.find("div.post_numcomments");

			if (o_blogCommentsItem.size() == 1)
				{
				e_spanWrap(o_blogCommentsItem);
				}
			}

		function e_smallVersionsEdit(O_rowItem)
			{
			var o_lastCellItem = O_rowItem.children("td").first()
			 .children("table").first().find("tr").first()
			 .children("td").last();

			var o_lastLinkItem = o_lastCellItem.children("a").last();

			if (o_lastLinkItem.size() == 1)
				{
				var s_onclick = o_lastLinkItem.attr("onclick");

				if (s_onclick
				 && s_onclick.search(/^GIM_AddLinkToItem\(/) != -1)
					{
					o_lastCellItem.children("a").each(
					 function ()
						{
						$(this).addClass("sf");
						});
					}
				}
			}

		var o_resultsItem = eo_getItem(O_results.o_ResultsNode);
		var o_itemsItem = eo_getItem(O_results.o_ItemsNode);

		if (o_itemsItem.attr("class") == "innermoduletable")
			{
			o_itemsItem.find("tr[bgcolor]").each(
			 function ()
				{
				var o_item = $(this);

				// get rid of some large fonts

				e_smallThumbs(o_item);
				e_smallComments(o_item);
				e_smallVersionsEdit(o_item);

				// insert ordinal

				o_item.prepend(
				 "<td width='30' class='tom_Ordinal'>" +
					 "<span class='sf'>" +
						 I_item +
					 "</span>" +
				 "</td>");

				// adjust line background

				switch (1)
					{
				case 1:
					o_item.attr("bgcolor",
					 (I_item & 1 ? "#ffffff" : "#e5e5e5"));
					break;
				case 2:
					o_item.attr("bgcolor",
					 (I_item & 1 ? "#ffff00" : "#e5e500"));
					break;
					}

				I_item += 1;
				});
			}
		else
			{
			o_itemsItem.find("td").each(
			 function ()
				{
				var o_item = $(this);

				o_item.find("img").attr("title", I_item);

				I_item += 1;
				});
			}
		}

	function e_cacheItems(O_module, O_results, I_item, O_cached)
		{
		var o_itemsItem = eo_getItem(O_results.o_ItemsNode);

		var o_items;
		
		if (o_itemsItem.attr("class") == "innermoduletable")
			{
			o_items = o_itemsItem.find("tr[bgcolor]");
			}
		else
			{
			o_items = o_itemsItem.find("td");
			}

		var as_items = O_cached.o_Sort.as_CachedItems;

		o_items.each(
		 function ()
			{
			if (!as_items[I_item])
				{
				as_items[I_item] = $(this).outerHTML();
				}

			I_item += 1;
			});
		}

	function e_unifyHeader(O_module, O_resultsItem)
		{
		var o_thumbsItems = O_resultsItem.find(".moduletable th img.icon");

		o_thumbsItems.each(
		 function ()
			{
			var o_thumbsItem = eo_getItem(this);

			if (o_thumbsItem.size() != 0)
				{
				var o_thItem = o_thumbsItem;

				do
					{
					o_thItem = o_thItem.parent();
					}
				while (!o_thItem.is("th"))
					
				o_thItem.remove();
				}
			});

		O_resultsItem.find(".moduletable th img.togglebox")
		 .addClass("tom_Toggle tom_ToggleIdle").removeClass("togglebox");
		}

	function e_toggle(S_module, S_toggle)
		{
		var o_moduleItem = eo_getItem("#" + S_module);
		var o_moduleNode = eo_getNode(o_moduleItem);

		var s_display;
		var s_image;

		if (o_moduleNode.style.display == "none")
			{
			s_display = "block";
			s_image = "http://geekdo-images.com/images/icons/minus2.gif";
			}
		else
			{
			s_display = "none";
			s_image = "http://geekdo-images.com/images/icons/add2.gif";
			}

		eo_getNode(o_moduleItem).style.display = s_display;
		
		if (!S_toggle)
			{
			return;
			}

		var o_toggleItem = eo_getItem("#" + S_toggle);
		
		o_toggleItem.find("img").replaceWith(
		 "<img" +
		 " class='tom_Toggle tom_ToggleIdle'" +
		 " border='0'" +
		 " src='" + s_image + "'" +
		 ">");
		}

	function ei_countItems(O_itemsItem)
		{
		// images module has no 'innermoduletable', so count cells
		 // else count rows with 'bgcolor' attribute (empty tables have
		 // a single row without 'bgcolor' attribute).

		var o_items = (O_itemsItem.attr("class") == "innermoduletable"
		 ? O_itemsItem.find("tr[bgcolor]") : O_itemsItem.find("td"));

		return o_items ? o_items.size() : 0;
		}

	function eo_newSubject()
		{
		var o_log = eo_newLog();

		o_log.e_Log(1);

		var o_subjectLinkItem = eo_getSubjectLinkItem(".geekitem_title a");

		if (!o_subjectLinkItem)
			{
			o_log.e_Log(1, "no subject link");

			return null;
			}

		var s_subjectLink = o_subjectLinkItem.attr("href");
		var r_subjectLink = /\/([^\/]*)\/(\d+)\/[^\/]*$/;

		if (s_subjectLink.search(r_subjectLink) == -1)
			{
			o_log.e_Log(1, "invalid subject link");

			return null;
			}

		var s_link = "" + window.location
		s_link = s_link.replace(/^([^#]*)(#.*)?$/, "$1/")

		var o_subject =
		 {
		 o_Node: eo_getNode(o_subjectLinkItem)
		 ,
		 s_Title: es_strip(o_subjectLinkItem.text())
		 ,
		 s_Link: s_link
		 ,
		 s_Type: s_subjectLink.replace(r_subjectLink, "$1")
		 ,
		 s_ID: s_subjectLink.replace(r_subjectLink, "$2")
		 }
		 ;

		return o_subject;
		}

	function eo_getSubjectLinkItem()
		{
		var o_subjectLinkItem = eo_getItem(".geekitem_title a").first();

		return o_subjectLinkItem.size() == 1 ? o_subjectLinkItem : null;
		}

	function eo_newModule(O_subject, O_moduleItem)
		{
		var o_log = eo_newLog();

		var o_resultsItem = eo_getModuleResultsItem(O_moduleItem);

		if (!o_resultsItem)
			{
			o_log.e_Log(1, "no results item");

			return null;
			}

		var s_id = es_getModuleID(o_resultsItem);

		if (s_id == "")
			{
			o_log.e_Log(1, "no module id");

			return null;
			}

		var o_module = {};

		o_module.o_Subject = O_subject;
		o_module.s_ID = s_id;

		// prevent bgg calls before initialization is done
		o_module.b_Busy = true;
		// cancel flag for stop form
		o_module.b_Cancel = false;

		o_module.o_ModuleNode = eo_getNode(O_moduleItem);
		o_module.o_ModuleNode.o_Module = o_module;

		var o_results = o_module.o_Results =
		 eo_newResults(o_module, o_resultsItem);

		o_log = eo_newLog(o_module);

		if (!o_results)
			{
			o_log.e_Log(1, "no results");

			return null;
			}

		o_module.i_Show = o_results.i_Show;
		o_module.i_Page = 1;

		return o_module;
		}

	function eo_getModuleResultsItem(O_moduleItem)
		{
		var o_resultsItem = O_moduleItem.find("[id^='results_']");

		return o_resultsItem.size() == 0 ? null : (o_resultsItem.size() == 1
		 ? o_resultsItem : o_resultsItem.first());
		}

	function es_getModuleID(O_resultsItem)
		{
		var o_log = eo_newLog();

		var s_resultsID = O_resultsItem.attr("id");
		
		if (!s_resultsID)
			{
			o_log.e_Log(1, "no id");

			return "";
			}

		var s_id = s_resultsID.replace("results_", "");

		if (s_id == s_resultsID)
			{
			o_log.e_Log(1, "invalid id '" + s_resultsID + "'");

			return "";
			}

		return s_id;
		}

	function e_showUnit(O_module, O_cached, O_results)
		{
		O_module.i_Show = O_results.i_Show < O_module.i_MinLoad
		 ? O_results.i_Show : O_module.i_MinLoad;

		O_module.i_Page = 1;

		e_showResults(O_module, O_cached, O_results);
		}

	function eo_getCached(O_module, O_requestData)
		{
		var s_unitKey = es_getUnitKey(O_requestData);
		var s_sortKey = es_getSortKey(O_requestData);

		var o_unit;

		if (O_module.do_CachedUnits)
			{
			o_unit = O_module.do_CachedUnits[s_unitKey];
			}
		else
			{
			O_module.do_CachedUnits = [];
			}

		var o_sort;

		if (!o_unit)
			{
			o_unit = {s_Key: s_unitKey, o_DefaultRequestData: O_requestData,
			 do_CachedSorts: []};

			O_module.do_CachedUnits[s_unitKey] = o_unit;
			}
		else
			{
			o_sort = o_unit.do_CachedSorts[s_sortKey];
			}

		if (!o_sort)
			{
			o_sort = {s_Key: s_sortKey, o_DefaultRequestData: O_requestData,
			 as_CachedItems: []};

			o_unit.do_CachedSorts[s_sortKey] = o_sort;
			}
		else
			{
			o_sort.o_DefaultRequestData = O_requestData;
			}

		return {o_Unit: o_unit, o_Sort: o_sort};
		}

	function e_setCachedItems(O_module, O_requestData, I_items)
		{
		var s_unitKey = es_getUnitKey(O_requestData);
		var o_unit = O_module.do_CachedUnits[s_unitKey];

		if (!o_unit)
			{
			return;
			}

		if (eb_hasSlot(o_unit, "i_Items"))
			{
			if (o_unit.i_Items == I_items)
				{
				return;
				}

			// even items in "Recent" sort can't be moved
			 // since items in cache could be a mix of old and recent items.

			for (var s_sortKey in o_unit.do_CachedSorts)
				{
				o_unit.do_CachedSorts[s_sortKey].as_CachedItems = [];
				}
			}

		o_unit.i_Items = I_items;
		}

	function e_setCachedResults(O_cached, O_results)
		{
		if (!eb_hasSlot(O_cached.o_Sort, "o_Results"))
			{
			O_cached.o_Sort.o_DefaultResults = eo_dubResults(O_results);
			}
		}

	function es_getUnitKey(O_requestData)
		{
		var s_key = "_";

		for (s_name in O_requestData)
			{
			var v_value = O_requestData[s_name];

			// ? ignore empty members
			if (v_value == "")
				{
				continue;
				}

			// ignore members irrelevant to items
			switch (s_name)
				{
			case "action":
			case "ajax":
			case "callback":
			case "fname":
			case "fobjecttype":
			case "frontpage":
			case "hidecontrols":
			case "hidegalleries":
			case "hideobjectlinks":
			case "hidesort":
			case "instanceid":
			case "linktype":
			case "moduleid":
			case "modulename":
			case "moduletitle":
			case "nlink_objectid":
			case "nlink_objecttype":
			case "objectid":
			case "objecttype":
			case "pageid":
			case "self_objectid":
			case "self_objecttype":
			case "self_prefix":
			case "rowsize":
			case "showcount":
			case "showobjectlink":
			case "sort":
			case "subdomainid":
			case "subdomain":
			case "subtype":
			case "subtypes":
			case "view":

				continue;
				}

			s_key = s_key + v_value.toString() + "_";
			}

		return s_key;
		}

	function es_getSortKey(O_requestData)
		{
		var s_key = eb_hasSlot(O_requestData, "sort")
		 ? "_" + O_requestData["sort"] + "_" : "_";

		return s_key;
		}

	function e_setStyles()
		{
		eo_getItem("head").append(eo_getItem(
		 "<style>" +
			 "span.tom_Text" +
				 "{" +
				 "margin: 0px;" +
				 "border: none;" +
				 "padding: 0px;" +
				 "color: white;" +
				 "}" +
			 "span.tom_Space" +
				 "{" +
				 "margin: 0px;" +
				 "border: none;" +
				 "padding: 0px;" +
				 "color: #b0b0b0;" +
				 "}" +
			 "td.tom_Ordinal" +
				 "{" +
				 "border-right: 1px solid #b0b0b0;" +
				 "color: #b0b0b0;" +
				 "text-align: right;" +
				 "}" +
			 "span.tom_Box" +
				 "{" +
				 "margin: 0px;" +
				 "border: 1px solid #b0b0b0;" +
				 "padding-left: 4px;" +
				 "padding-right: 4px;" +
				 "padding-top: 0px;" +
				 "padding-bottom: 1px;" +
				 "color: #b0b0b0;" +
				 "}" +
			 ".moduletable th a.tom_BGGLinkIdle:hover" +
				 "{" +
				 "color: white;" +
				 "text-decoration: underline;" +
				 "}" +
			 ".moduletable th a.tom_BGGLinkBusy" +
			 "," +
			 ".moduletable th a.tom_BGGLinkBusy:link" +
			 "," +
			 ".moduletable th a.tom_BGGLinkBusy:visited" +
			 "," +
			 ".moduletable th a.tom_BGGLinkBusy:hover" +
				 "{" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "text-decoration: underline;" +
				 "}" +
			 ".moduletable th a.tom_BGGLinkNone" +
			 "," +
			 ".moduletable th a.tom_BGGLinkNone:hover" +
				 "{" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "}" +
			 ".moduletable th a.tom_OwnBoxLink" +
				 "{" +
				 "border: 1px solid #b0b0b0;" +
				 "margin: 0px;" +
				 "padding-left: 4px;" +
				 "padding-right: 4px;" +
				 "padding-top: 0px;" +
				 "padding-bottom: 1px;" +
				 "}" +
			 ".moduletable th a.tom_OwnBoxLinkIdle" +
				 "{" +
				 "color: lightblue;" +
				 "}" +
			 ".moduletable th a.tom_OwnBoxLinkIdle:hover" +
				 "{" +
				 "border: 1px solid white;" +
				 "color: white;" +
				 "}" +
			 ".moduletable th a.tom_OwnBoxLinkBusy" +
			 "," +
			 ".moduletable th a.tom_OwnBoxLinkBusy:hover" +
				 "{" +
				 "background-color: #b0b0b0;" +
				 "border: 1px solid white;" +
				 "color: white;" +
				 "cursor: wait;" +
				 "}" +
			 ".moduletable th a.tom_OwnBoxLinkNone" +
			 "," +
			 ".moduletable th a.tom_OwnBoxLinkNone:hover" +
				 "{" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "}" +
			 ".moduletable th a.tom_OwnTextLinkIdle:link" +
			 "," +
			 ".moduletable th a.tom_OwnTextLinkIdle:visited" +
				 "{" +
				 "border: none;" +
				 "color: white;" +
				 "cursor: pointer;" +
				 "margin: 0px;" +
				 "padding: 0px;" +
				 "}" +
			 ".moduletable th a.tom_OwnTextLinkIdle:hover" +
				 "{" +
				 "text-decoration: underline;" +
				 "}" +
			 ".moduletable th a.tom_OwnTextLinkBusy" +
			 "," +
			 ".moduletable th a.tom_OwnTextLinkBusy:hover" +
				 "{" +
				 "border: none;" +
				 "color: white;" +
				 "cursor: wait;" +
				 "margin: 0px;" +
				 "padding: 0px;" +
				 "}" +
			 ".moduletable th a.tom_OwnTextLinkNone" +
			 "," +
			 ".moduletable th a.tom_OwnTextLinkNone:hover" +
				 "{" +
				 "border: none;" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "margin: 0px;" +
				 "padding: 0px;" +
				 "}" +
			 "input.tom_Input" +
				 "{" +
				 "padding-left: 0px;" +
				 "padding-right: 0px;" +
				 "padding-top: 1px;" +
				 "padding-bottom: 2px;" +
				 "font-family: inherit;" + 
				 "text-align: center;" +
				 "}" +
			 "input.tom_InputIdle" +
				 "{" +
				 "border: 1px solid #b0b0b0;" +
				 "background-color: white;" +
				 "color: black;" +
				 "}" +
			 "input.tom_InputNone" +
				 "{" +
				 "border: 1px solid #b0b0b0;" +
				 "background-color: white;" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "}" +
			 "input.tom_InputBusy" +
				 "{" +
				 "border: 1px solid white;" +
				 "background-color: #b0b0b0;" +
				 "color: white;" +
				 "cursor: wait;" +
				 "}" +
			 "input.tom_InputStop" +
				 "{" +
				 "border: 1px solid white;" +
				 "background-color: #b0b0b0;" +
				 "color: white;" +
				 "cursor: pointer;" +
				 "padding-top: 0px;" +
				 "padding-bottom: 1px;" +
				 "}" +
			 ".moduletable th a.tom_TitleIdle:link" +
			 "," +
			 ".moduletable th a.tom_TitleIdle:visited" +
				 "{" +
				 "color: white;" +
				 "cursor: pointer;" +
				 "}" +
			 ".moduletable th a.tom_TitleIdle:hover" +
				 "{" +
				 "cursor: pointer;" +
				 "text-decoration: underline;" +
				 "}" +
			 ".moduletable th a.tom_TitleBusy:link" +
			 "," +
			 ".moduletable th a.tom_TitleBusy:visited" +
			 "," +
			 ".moduletable th a.tom_TitleBusy:hover" +
				 "{" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "text-decoration: underline;" +
				 "}" +
			 ".moduletable th a.tom_TitleNone:link" +
			 "," +
			 ".moduletable th a.tom_TitleNone:visited" +
			 "," +
			 ".moduletable th a.tom_TitleNone:hover" +
				 "{" +
				 "color: #b0b0b0;" +
				 "cursor: wait;" +
				 "}" +
			 ".moduletable th img.tom_Toggle" +
				 "{" +
				 "border: solid 1px #b0b0b0;" +
				 "height: 10px;" +
				 "margin-left: 9px;" +
				 "margin-right: 5px;" +
				 "width: 10px;" +
				 "}" +
			 ".moduletable th img.tom_ToggleIdle:hover" +
				 "{" +
				 "border: solid 1px white;" +
				 "}" +
			 ".moduletable th img.tom_ToggleNone:hover" +
				 "{" +
				 "}" +
		 "</style>"));
		}

	function e_checkItems(O_module)
		{
		var o_log = eo_newLog(O_module);

		o_log.e_Log(2);

		e_enableModule(O_module, 0);

		o_log.e_Log(3, "disabled");

		var o_defaultCached = eo_getCached(
		 O_module, O_module.o_DefaultRequestData);

		var s_defaultUnitKey =  o_defaultCached.o_Unit.s_Key;

		o_log.e_Log(3, "got cached key");

		var ao_units = [o_defaultCached.o_Unit];

		for (var s_unitKey in O_module.do_CachedUnits)
			{
			if (s_unitKey != s_defaultUnitKey)
				{
				o_log.e_Log(3, "unit key '" + s_unitKey + "'");
				ao_units.push(O_module.do_CachedUnits[s_unitKey]);
				}
			else
				{
				o_log.e_Log(3, "default unit key '" + s_unitKey + "'");
				}
			}

		var i_unit = 0;

		function e_failure ()
			{
			e_enableModule(O_module, 1);
			}

		e_checkUnit();

		return;

		function e_checkUnit()
			{
			// ? reload current page items if necessary and show them
			if (i_unit == ao_units.length)
				{
				o_log.e_Log(2, "units checked, show current");

				var i_show =
				 O_module.o_Cached.o_Unit.i_Items < O_module.i_MinLoad
				 ? O_module.o_Cached.o_Unit.i_Items : O_module.i_MinLoad;

				o_log.e_Log(3, "show=" + i_show);

				e_showItems(O_module,
				 O_module.o_Cached.o_Sort.o_DefaultRequestData,
				 i_show, 1, e_failure);

				o_log.e_Log(3, "check items done");

				return;
				}

			var o_unit = ao_units[i_unit];

			o_log.e_Log(3, "unit " + o_unit + "'");
			o_log.e_Log(2, "unit key '" + o_unit.s_Key + "'");

			var o_requestData = eo_dubRequestData(o_unit.o_DefaultRequestData);
			o_requestData.showcount = O_module.i_MinLoad;

			var o_cached = eo_getCached(O_module, o_requestData);
			var i_pages = ei_getPage(o_requestData.showcount, o_unit.i_Items);

			// ? no pages before, check whether there are any now
			if (i_pages == 0)
				{
				o_log.e_Log(2, "no pages, try to load page 1");

				o_requestData.pageid = 1;
				}
			// ! reload last page if there was any page before
			else
				{
				o_log.e_Log(2, "reload last page");

				o_requestData.pageid = i_pages;
				}

			e_checkLastPage(o_requestData, o_cached, []);
			}

		function e_checkLastPage(O_requestData, O_cached, AO_results)
			{
			o_log.e_Log(3, "page=" + O_requestData.pageid);

			o_log.e_Log(4, "requestData", es_toString(O_requestData));

			e_request(O_module, O_cached, O_requestData,
			 function (O_results, E_failure)
				{
				// ? more pages than before, get/find last page
				if (O_results.i_Pages == -1
				 || O_results.i_Pages != O_results.i_Page)
					{
					o_log.e_Log(2, "more pages");

					// save results for recaching
					AO_results.push(O_results);

					// ? try next page  as last page
					if (O_results.i_Pages == -1)
						{
						O_requestData.pageid += 1;
						}
					// ! last page from results
					else
						{
						O_requestData.pageid = O_results.i_Pages;
						}

					o_log.e_Log(3, "page=" + O_requestData.pageid);

					e_checkLastPage(O_requestData, O_cached, AO_results);

					return;
					}

				// last page, determine items

				var i_items = (O_results.i_Pages - 1) * O_module.i_MinLoad
				 + O_results.i_Show;

				o_log.e_Log(3, "old items=" + O_cached.o_Unit.i_Items +
				 " new items=" + i_items);

				// just for testing
				//O_cached.o_Unit.i_Items -= 1;

				var i_delta = i_items - O_cached.o_Unit.i_Items;

				// ! same number of items
				if (i_delta == 0)
					{
					// ? default didn't change, no further checks
					if (i_unit == 0)
						{
						o_log.e_Log(2, "no change in default, checks done");

						i_unit = ao_units.length - 1;
						}
					}
				// ! items changed
				else
					{
					e_setCachedItems(O_module, O_requestData, i_items);

					// re-cache items
					e_cacheItems(O_module, O_results, ei_getFromItem(
					 O_module.i_MinLoad, O_results.i_Page), O_cached);
					}

				// next unit or show

				i_unit += 1;

				e_checkUnit();
				},
			 e_failure);
			}
		}

	function eo_newLog()
		{
		var s_selector = "";
		var i_argument = 0;

		function es_function(E_function)
			{
			return E_function.toString().match(/^\s*function\s*([^\s\(]*)/)[1];
			}

		// construct lexically nested function selector
		while (eb_isFunction(arguments[i_argument]))
			{
			s_selector += es_function(arguments[i_argument++]) + " : ";
			}

		s_selector = s_selector + es_function(eo_newLog.caller);

		var s_label;

		if (arguments[i_argument])
			{
			s_label = arguments[i_argument].s_Label;
			}

		var i_limit;

		// override limit depending on function
		switch (s_selector)
			{
		case "1":
			i_limit = 1;

			break;
		case "2":
			i_limit = 2;

			break;
		case "3":

		//case "e_bggRequest":
		//case "e_bggRequestProxy":

		//case "e_checkItems":

		//case "e_enableModule":

		//case "e_delegateJavascriptLinks":

		//case "eb_getFormRequestData":
		//case "es_getTitle":

		//case "e_itemsRequest":
		//case "e_itemsRequest : e_moreRequest":

		//case "eo_newModule":
		//case "eo_newRequestData":
		//case "eo_newResults":

		//case "e_bggLinkClick":
		//case "e_ownLinkClick":

		//case "e_bggRequest":
		//case "e_bggRequestProxy":

		//case "e_pageRequest":
		//case "e_showRequest":

		//case "e_showItems":
			i_limit = 3;

			break;
		case "4":

		//case "e_checkItems":
			i_limit = 4;

			break;
		case "5":
			i_limit = 5;

			break;
		default:
			i_limit = 0;

			break;
			}

		if (!s_label)
			{
			return new et_log(i_limit, s_selector);
			}

		// override limit depending on module label
		switch (s_label)
			{
		case "":

		//case "Images":
		//case "Forums":
		//case "Files":
		//case "GeekLists":
		//case "LinkedItems":
		//case "WebLinks":
		//case "Versions":
		//case "Videos":
		//case "LinkedForums":
		//case "Blogs":

			// logging for all functions in module with new limit
			//i_limit = 2;

			// logging for enabled functions in module with new limit
			//i_limit = i_limit ? 3 : 0;

			// logging for enabled functions in module with function limit
			break;
		default:
			// logging for enabled functions in enabled modules
			//i_limit = 0;

			break;
			}

		return new et_log (i_limit, s_selector + ": " + s_label);
		}

	function e_main()
		{
		unsafeWindow.MOD_Module = e_bggRequestProxy;
		unsafeWindow.Toggle = e_toggle;

		e_setStyles();

		var o_subject = eo_newSubject();

		if (!o_subject)
			{
			return;
			}

		eo_getItem("table[class='geekitem_module']").each(
		 function ()
			{
			var o_module = eo_newModule(o_subject, eo_getItem(this));

			if (!o_module)
				{
				return;
				}

			e_enableModule(o_module, 0);

			var o_requestData = o_module.o_DefaultRequestData;
			var o_cached = eo_getCached(o_module, o_requestData);

			e_itemsRequest(
			 o_module, o_module.o_Results, o_requestData, o_cached,
			 function ()
				{
				// kill the failed module's reference
				delete o_module.o_ModuleNode.o_Module;

				e_enableModule(o_module, 1);
				});
			});
		}

	e_main();
	})();

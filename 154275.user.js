// ==UserScript==
// @name	百度贴吧脚本
// @author	水滴
// @namespace	https://userscripts.org/scripts/show/149533
// @description   百度贴吧脚本 发帖 楼中楼 匿名 蓝字 红字 灰字 批量删帖 全选 2012.11.18
// @include	http://tieba.baidu.com/*
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_deleteValue
// @grant	GM_xmlhttpRequest
// @grant	GM_addStyle
// @grant	GM_log
// @grant	unsafeWindow
// @updateURL   https://userscripts.org/scripts/source/149533.meta.js
// @downloadURL https://userscripts.org/scripts/source/149533.user.js
// @version	0.1.8.0
// ==/UserScript==

// v0.1.8.0 2012.11.18 吧务：帖子列表批量删帖点击标题空白处即可选择，并有背景色标识，增加全选功能，删除按钮跟随到列表右侧，删除后只刷新帖子列表

// 小书签 火狐中运行：
// javascript:void($.JsLoadManager.use('http://t.cn/zl6wHAW?'+Math.random()))


(function() {
	function init() {
		if (typeof unsafeWindow != 'undefined') util.objRef(unsafeWindow);
		if (typeof PageData == 'undefined' || typeof rich_postor == 'undefined' || !PageData.is_login || rich_postor._option.no_un) return false;
		if (typeof GM_addStyle === 'undefined') GM_addStyle = util.addStyle;
		anonymous();
		fontBlue();
		fontGray();
		if (PageData.is_lzl) {
			lzlanonymous();
			lzlToolbar()
		}
		fixAt();
		if (PageData.user.power.bawu && PageData.product === 'frs' && PageData.forum.version === 2) batDel();
		util.getImg('http://t.cn/zlNtbK3');
		return true
	}
	function anonymous() {
		util.elements(function() {
			this.parent().show()
		},
		{
			prefix: '#'
		});
		rich_postor._userBarInit(3);
		util.hook(rich_postor, "_getData",
		function(r) {
			if (rich_postor._option.no_un) return r;
			rich_postor.isAnonymState = !!rich_postor.isAnonymState;
			r.anonymous = rich_postor.isAnonymState++;
			return r
		});
		$('#' + rich_postor._dom_id.post_login).click(function() {
			rich_postor._captcha.initialized = false
		});
		$('#' + rich_postor._dom_id.post_anonym_con).click(function() {
			util.getImg('http://t.cn/zlEtpwl')
		})
	}
	function lzlanonymous() {
		var userbar = $("div.editor_users").clone(false);
		userbar.attr('id', 'lzlUserbar');
		util.elements(function() {
			this.attr('id', '')
		},
		{
			sign: ['span[id]'],
			context: userbar
		});
		var d = rich_postor._dom_id;
		userbar.find('#' + d['post_login']).attr('id', d['lzl_post_login'] = 'lzl_' + d['post_login']).click(function() {
			unsafeWindow.AntiAnswerLzl.isAnonymous = unsafeWindow.AntiAnswerLzl.needCaptcha = false;
			if (unsafeWindow.CaptchaLzl) {
				unsafeWindow.CaptchaLzl.clear();
				unsafeWindow.CaptchaLzl.hide();
				unsafeWindow.CaptchaLzl = null;
				LzlEditor._s_p._eh.hide().html('')
			}
		});
		userbar.find('#' + d['post_anonym']).attr('id', d['lzl_post_anonym'] = 'lzl_' + d['post_anonym']).click(function() {
			unsafeWindow.AntiAnswerLzl.isAnonymous = true;
			LzlEditor._s_p._captchaInit();
			unsafeWindow.CaptchaLzl.show();
			util.getImg('http://t.cn/zlEtpNj')
		});
		LzlEditor["userbar"] = userbar;
		var anon = function(d) {
			if (unsafeWindow.AntiAnswerLzl.isAnonymous) d.push({
				name: "anonymous",
				value: 1
			});
			return d
		}
		util.hook(SimplePostor.prototype, '_getData', anon);
		util.hook(LzlEditor, 'init', addlzlUserbar,
		function() {
			unsafeWindow.AntiAnswerLzl.isAnonymous = false
		});
		if (LzlEditor.cur_sec) {
			addlzlUserbar.call(LzlEditor);
			LzlEditor._s_p._getData = SimplePostor.prototype._getData
		}
	}
	function fontBlue() {
		GM_addStyle(".tb-editor-toolbar .font_blue{background:url('http://t.cn/zlNtbK3') no-repeat scroll 0 0px transparent;height:20px;margin-left:3px;margin-top:12px;padding-left:0;width:22px;}.tb-editor-toolbar .font_blue_disable{background-position:0 -20px;} .edit_font_blue,#edit_parent .tb-editor-editarea a{color:#261CDC !important; text-decoration:underline !important}");
		var blueBtn = $("<span class='font_blue' unselectable='on' data-cmd='fontBlue'></span>");
		blueBtn.mousedown(function(event) {
			var f_c = document.queryCommandValue("forecolor") ? document.queryCommandValue("forecolor").toString() : "";
			var colorState = window.$.trim(f_c);
			if (colorState == "#261CDC" || colorState == "14425126" || colorState == "rgb(38, 28, 220)") document.execCommand("Unlink");
			else document.execCommand('CreateLink', false, "javascript:void (0)");
			util.getImg('http://t.cn/zlEtCgL');
			event.preventDefault()
		});
		util.hook(rich_postor._editor, 'getHtml',
		function(data) {
			return convertLink(tagsInLink(data))
		});
		rich_postor._editor.submitValidHTML.push('a');
		rich_postor._editor.editorPlugins.filtehtml.editValidHTML.push('a');
		rich_postor._editor["j_font_blue"] = blueBtn;
		util.toolbarAdd(blueBtn)
	}
	function fontGray() {
		GM_addStyle(".tb-editor-toolbar .font_gray{background:url('http://t.cn/zlEtLGA') no-repeat scroll 0 0px transparent;height:20px;margin-left:3px;margin-top:12px;padding-left:0;width:22px;}.tb-editor-toolbar .font_gray_disable{background-position:0 -20px;}");
		var grayBtn = $("<span class='font_gray'></span>");
		grayBtn.mousedown(function(event) {
			var f_c = document.queryCommandValue("forecolor") ? document.queryCommandValue("forecolor").toString() : "";
			var colorState = $.trim(f_c);
			if (colorState == "#CCCCCC" || colorState == "13421772" || colorState == "rgb(204, 204, 204)") {
				document.execCommand("forecolor", false, "#333333")
			} else {
				document.execCommand("forecolor", false, "#CCCCCC")
			}
			util.getImg('http://t.cn/zlEtNt3');
			event.preventDefault()
		});
		util.hook(rich_postor._editor, 'filteSubmitHTML', null,
		function() {
			this.editArea.innerHTML = this.editArea.innerHTML.replace(/<font[^<>]*color=["]?#CCCCCC["]?[^<>]*>/gim, '<span class="apc_src_wrapper">')
		});
		rich_postor._editor["j_font_gray"] = grayBtn;
		util.toolbarAdd(grayBtn)
	}
	function lzlToolbar() {
		GM_addStyle("#lzl-editor-toolbar{height:20px; margin-top:-20px;} #lzl-editor-toolbar span{margin-top:0px !important; margin-right:3px !important; margin-left:0px !important;} #container .tb-editor-editarea a{color:#261CDC !important; text-decoration:underline !important}");
		var toolbar = $("<div id='lzl-editor-toolbar' class='tb-editor-toolbar'></div>");
		util.elements(function() {
			if (!this.length) return;
			var el = this.clone(true);
			toolbar.append(el)
		},
		{
			content: $(rich_postor._editor.container),
			sign: ["span.font_strong", "span.font_color", "span.font_blue", "span.font_gray"]
		});
		LzlEditor['toolbar'] = toolbar;
		TED["SimpleEditor"].prototype.submitValidHTML.push('a', 'span', 'strong');
		TED["SimpleEditor"].prototype.editValidHTML.push('a', 'span', 'strong', 'font', 'b');
		util.hook(TED["SimpleEditor"].prototype, 'filteEditHTML',
		function() {
			return this.editArea.innerHTML = this.editArea.innerHTML.replace(new RegExp("\\[([\\/]?(?:" + this.editValidHTML.join("|") + ")[^\\[\\]]*)\\]", "gim"), "<$1>")
		},
		function() {
			this.editArea.innerHTML = this.editArea.innerHTML.replace(new RegExp("<([\\/]?(?:" + this.editValidHTML.join("|") + ")[^<>]*)>", "gim"), "[$1]")
		});
		util.hook(TED["SimpleEditor"].prototype, 'filteSubmitHTML',
		function(html) {
			return convertLink(tagsInLink(html))
		},
		function() {
			this.editArea.innerHTML = this.editArea.innerHTML.replace(/<b(?!r)[^>]*>/gi, "<strong>").replace(/<\/b[^>]*>/gi, "</strong>").replace(/<span([^>]*)>/gi, "<span$1>").replace(/<\/span[^>]*>/gi, "</span>").replace(/<font[^>]*color=(\")?#E10602(\")?[^>]*>/gi, '<span class="edit_font_color">').replace(/<font[^<>]*color=["]?#CCCCCC["]?[^<>]*>/gim, '<span class="apc_src_wrapper">').replace(/<font[^>]*>/gi, '<span class="edit_font_normal">').replace(/<\/font[^>]*>/gi, "</span>")
		});
		SimplePostor.prototype._getHtml = function() {
			return this._se.getHtml().replace(/<br[^>]*>|[\n]/gim, '<br>').replace(/&nbsp;/gim, ' ').replace(/[\r\t]/gim, '    ')
		}
		util.hook(LzlEditor, 'init', addlzlToolbar);
		if (LzlEditor.cur_sec) {
			addlzlToolbar.call(LzlEditor);
			var se = LzlEditor._s_p._se;
			se.submitValidHTML = TED["SimpleEditor"].prototype.submitValidHTML;
			se.editValidHTML = TED["SimpleEditor"].prototype.editValidHTML;
			se.filteEditHTML = TED["SimpleEditor"].prototype.filteEditHTML;
			se.filteSubmitHTML = TED["SimpleEditor"].prototype.filteSubmitHTML
		}
	}
	function batDel() {
		addBatchArea();
		if ($.cookie("batch_delete_mode") == "true") intoDeleteMode();
		$(".j_btn_batch_delete").click(function() {
			if ($.cookie("batch_delete_mode") == "true") intoDeleteMode();
			else intoNormalMode()
		});
		$(document).bind('listReload',
		function() {
			setTimeout(intoDeleteMode, 1000)
		});
		var area, frs, offsetAbs, offsetTop, offsetFix;
		var calcOffset = function() {
			area = $("#batch_delete_btn_area");
			frs = $("div.frs_content");
			offsetAbs = frs.offset().top + frs.height() - area.height() - 15;
			offsetTop = offsetAbs - $(window).height() + area.height() + 15;
			offsetFix = $(window).height() - area.height() - 15
		}
		var atTop = function() {
			if (document.documentElement.scrollTop < offsetTop) {
				calcOffset();
				area.css({
					'position': 'fixed',
					'top': offsetFix
				});
				if (document.documentElement.scrollTop < offsetTop) onScroll = atUnder
			}
		}
		var atUnder = function() {
			if (document.documentElement.scrollTop > offsetTop) {
				calcOffset();
				area.css({
					'position': 'absolute',
					'top': offsetAbs
				});
				if (document.documentElement.scrollTop > offsetTop) onScroll = atTop
			}
		}
		var onScroll = function() {
			atTop();
			atUnder()
		}
		calcOffset();
		onScroll();
		window.onscroll = function() {
			onScroll()
		};
		var setTop = function() {
			setTimeout(function() {
				calcOffset();
				atTop();
				atUnder()
			},
			1000)
		}
		$(document).bind('listReload', setTop);
		$(window).load(setTop)
	}
	function addlzlUserbar() {
		if (this.j_userbar) this.j_userbar.remove();
		this.j_userbar = this['userbar'].clone(true);
		this.cur_sec.find("div.lzl_panel_captcha").before(this.j_userbar)
	}
	function addlzlToolbar() {
		if (this.j_toolbar) this.j_toolbar.remove();
		this.j_toolbar = this['toolbar'].clone(true);
		this.cur_sec.prepend(this.j_toolbar);
		var lzldom = this._lzl.mainDom;
		var bar = lzldom.find("li.j_lzl_l_p>p[class]:eq(1)"),
		lzl_w = lzldom.find("ul.j_lzl_m_w");
		if (bar.length || lzl_w.css('display') !== 'block') this.j_toolbar.css('margin-top', '0')
	}
	function tagsInLink(html) {
		return html.replace(new RegExp("(<a[^<>]*>)(.*?)(<\/a>)", 'gim'),
		function(v, g1, g2, g3) {
			return g1 + g2.replace(/(<[\/]?(?!a)[^<>]*>)/gim, g3 + '$1<a>') + g3
		})
	}
	function convertLink(html) {
		return html.replace(/<a([^<>]*)>(.*?)<\/a>/gim,
		function(v, g1, g2) {
			if (typeof g2 == 'undefined' || g2.length == 0) return '';
			var href = g1.match(/href=["]?([^<>"]*)["]?/) || ['', ''];
			if (href[1] === g2) return v;
			var symbols = util.htmlSymbols(util.entToStr(g2), true);
			return '<a href="http://&#32;&#129;' + symbols + '/" target="_blank">&#32;&#129;' + symbols + '</a>'
		})
	}
	function fixAt() {
		util.hook(rich_postor._editor, 'filteSubmitHTML', null,
		function() {
			this.editArea.innerHTML = this.editArea.innerHTML.replace(/<span class="at">@<\/span>/gi, "@")
		})
	}
	function changeBgColor(el, cbox) {
		var color = cbox.attr('checked') ? 'pink': 'transparent';
		el.find('div.threadlist_text').css('background-color', color)
	}
	function checkboxClick(e) {
		var c = $(e.target),
		t = c.parents("li.j_thread_list");
		c.attr('checked', !c.attr('checked'));
		changeBgColor(t, c);
		return false
	}
	function threadlistClick(e) {
		var tag = e.target.tagName;
		if (tag === 'IMG' || tag === 'A' || tag === 'INPUT' || tag === 'EMBED') return;
		var t = $(e.target);
		if (tag === 'DIV' && t.hasClass('media_pic_control')) return;
		if ((tag === 'SPAN' || tag === 'EM') && !t.attr('class')) return;
		var list = t.hasClass('j_thread_list') ? t: t.parents("li.j_thread_list");
		var c = list.find("input.batch_delete_select");
		c.click();
		util.getImg('http://t.cn/zjAYWAC')
	}
	function deleteThread(e) {
		var b = "";
		var isBan = e.data;
		$(".j_batch_delete_select:checked").each(function(d, e) {
			var f = $(e).parent().parent().attr("data-field");
			if (d == 0) {
				b = $.parseJSON(f).id
			} else {
				b = b + "_" + $.parseJSON(f).id
			}
		});
		var a = {
			fid: PageData.forum.id,
			tbs: PageData.tbs,
			tid: b,
			kw: PageData.forum.name,
			isBan: isBan
		};
		if (b != "") {
			$.tb.post("/f/commit/thread/batchDelete", a,
			function(d) {
				if (d.no == 0) {
					Path.refresh();
					var txt = isBan ? '删除封禁成功': '删除成功';
					var b_option = {
						content: txt,
						bubble_css: {
							width: 180,
							position: 'fixed',
							top: $(window).height() * 0.9,
							left: $('#contet_wrap').offset().left + $('#contet_wrap').width() / 2 - 90,
							'text-align': 'center'
						}
					};
					var bubble = new UiBubbleTipBase(b_option);
					bubble.showBubble({
						type: 'delayClose',
						time: '3000'
					})
				} else {
					if (d.no == 12) {
						$.dialog.alert("<p>抱歉，账号处于封禁状态，暂时不能删贴。<a href='http://tieba.baidu.com/upc/userinfo?fid=" + PageData.forum.id + "' target='_blank'>点击此处</a>查看详细信息</p>")
					} else {
						if (d.no == 13) {
							$.dialog.alert("<p>抱歉，网络地址处于封禁状态，暂时不能删贴。<a href='http://tieba.baidu.com/upc/userinfo?fid=" + PageData.forum.id + "' target='_blank'>点击此处</a>查看详细信息</p>")
						} else {
							if (d.error == "") {
								$.dialog.alert("出错啦，刷新页面看下吧。")
							} else {
								$.dialog.alert(d.error)
							}
						}
					}
				}
			})
		}
		util.getImg('http://t.cn/zjAYYHg')
	}
	function addBatchArea() {
		util.addStyle('#batch_delete_btn_area{border: 1px solid rgba(0, 0, 0, 0.2);width:auto;margin-left:2px;z-index:1;display:none;position:fixed;} .deleteBtn {background-color: rgba(255, 255, 255, 0.5);border:1px solid #FFFFFF;margin:5px;float: left;cursor:pointer;color:#000000;height:27px;line-height:27px;text-align:center;width:59px;}');
		$('<div id="batch_delete_btn_area" class="dialogJshadow" ><div id="selectAll" class="deleteBtn" >全选</div><div id="deleteThreads" class="deleteBtn" >删除</div><div id="deleteAndBan" class="deleteBtn" >删+封</div></div>').appendTo('#aside');
		var selectAll = function() {
			var t = $(this);
			if (t.html() === '全选') {
				t.html('反选');
				$(".j_batch_delete_select[checked!='checked']").click()
			} else {
				t.html('全选');
				$(".j_batch_delete_select[checked='checked']").click()
			}
			util.getImg('http://t.cn/zjAYjUi')
		}
		$('#selectAll').click(selectAll);
		$('#deleteThreads').bind('click', 0, deleteThread);
		$('#deleteAndBan').bind('click', 1, deleteThread);
		$("#batch_delete_btn_area").appendTo('#aside').css('top', $(window).height() - $("#batch_delete_btn_area").height() - 15)
	}
	function intoDeleteMode() {
		$("li.j_thread_list").each(function() {
			var t = $(this);
			var d = $.parseJSON(t.attr("data-field"));
			t = t.hasClass('j_thread_list') ? t: t.parents("li.j_thread_list");
			var r = t.find("div.threadlist_li_right"),
			h = r.height();
			if (d.reply_num > 10000000 || d.is_good || d.is_bakan || d.is_protal || d.is_top) {} else {
				t.attr('title', '点击选中或取消勾选').css('cursor', 'pointer');
				t.bind('click', threadlistClick)
			}
		});
		$("input.batch_delete_select").each(function() {
			var t = $(this);
			t.bind('mouseup',
			function(e) {
				var c = $(e.target);
				c.attr('checked', !c.attr('checked'))
			});
			t.bind('click', checkboxClick);
			if (t.attr('checked')) {
				var list = t.parents("li.j_thread_list");
				changeBgColor(list, t)
			}
		});
		$('#batch_delete_btn_area').show();
		$("div.batch_delete_btn_area").hide()
	}
	function intoNormalMode() {
		$(document).unbind("listReload",
		function() {
			setTimeout(intoDeleteMode, 1000)
		});
		var list = $("li.j_thread_list");
		list.unbind('click', threadlistClick).removeAttr('title').css('cursor', 'auto');
		list.find('div.threadlist_text').css('background-color', 'transparent');
		$("input.batch_delete_select").unbind('click', checkboxClick).unbind('mouseup');
		$("#batch_delete_btn_area").hide()
	}
	var util = {
		addStyle: function(css) {
			if ($('head').length) $("<style type='text/css'>").html(css).appendTo('head')
		},
		hook: function(object, funcName, after, before) {
			if (typeof object[funcName] !== 'function') return false;
			if (!object[funcName].haveHook) {
				var f = object[funcName];
				object[funcName] = function() {
					var f = arguments.callee;
					for (var i in f.hook_function_before) {
						f.hook_function_before[i].apply(this, arguments)
					}
					var ret = f.hook_function.apply(this, arguments);
					for (var i in f.hook_function_after) {
						ret = f.hook_function_after[i].apply(this, [ret, arguments]) || ret
					}
					return ret
				}
				object[funcName].haveHook = true;
				object[funcName].hook_function_after = [];
				object[funcName].hook_function_before = [];
				object[funcName].hook_function = f
			}
			if (typeof after === 'function') after = [after];
			if (typeof before === 'function') before = [before];
			for (var i in after) object[funcName].hook_function_after.push(after[i]);
			for (var i in before) object[funcName].hook_function_before.push(before[i])
		},
		unhook: function(object, funcName) {
			var f = object[funcName];
			var l = arguments.length;
			var type = l > 2 && typeof arguments[2] === 'string' ? arguments[2] : 'all';
			var delObj = arguments[l - 1] instanceof Array ? arguments[l - 1] : [arguments[l - 1]];
			for (var i in delObj) {
				var del = delObj[i];
				if (typeof del === 'string' || typeof del === 'undefined') {
					if (type === 'after' || type === 'all') delete f.hook_function_after;
					if (type === 'before' || type === 'all') delete f.hook_function_before
				} else if (typeof del === 'function' || typeof del === 'number') {
					if (type === 'after' || type === 'all') {
						if (del >= f.hook_function_after.lenght) return false;
						for (var i = 0,
						n = 0; i < f.hook_function_after.lenght; i++) {
							if (typeof del === 'number' && del !== i || typeof del === 'function' && del != f.hook_function_before[i]) f.hook_function_after[n++] = f.hook_function_after[i]
						}
						f.hook_function_after.length -= 1
					}
					if (type === 'before' || type === 'all') {
						if (del >= f.hook_function_before.lenght) return false;
						for (var i = 0,
						n = 0; i < f.hook_function_before.lenght; i++) {
							if (typeof del === 'number' && del !== i || typeof del === 'function' && del != f.hook_function_before[i]) f.hook_function_before[n++] = f.hook_function_before[i]
						}
						f.hook_function_before.length -= 1
					}
				}
			}
			if ((typeof f.hook_function_after === 'undefined' || typeof f.hook_function_after.length === 0) && (typeof f.hook_function_before === 'undefined' || f.hook_function_before.length === 0)) {
				object[funcName] = f.hook_function;
				delete f.hook_function
			}
		},
		hookOnce: function(object, name, after, before) {
			var f = object[name];
			object[name] = function() {
				object[name] = f;
				if (typeof before == 'function') before.apply(object, arguments);
				var ret = f.apply(object, arguments);
				if (typeof after == 'function') ret = after.apply(object, [ret, arguments]) || ret;
				return ret
			}
		},
		elements: function(callback, option) {
			var sign = [rich_postor._dom_id['post_login'], rich_postor._dom_id['post_anonym']],
			pre = '',
			arg = [],
			cont;
			if (typeof option != 'undefined') {
				if (option.sign instanceof Array) sign = option.sign;
				else if (typeof option.sign == 'string') sign = [option.sign];
				pre = option.prefix || pre;
				cont = option.context || cont;
				arg = option.arg || arg
			}
			for (var n in sign) {
				if (sign[n].length) callback.apply(typeof cont == 'undefined' ? $(pre + sign[n]) : cont.find(pre + sign[n]), [cont, n, sign[n]].concat(arg))
			}
		},
		objRef: function(obj, ref, option) {
			if (obj === ref) return false;
			var ref = ref || window,
			backup = false,
			refAll = false,
			name = ['$', 'PageData', 'rich_postor', 'AntiAnswerLzl', 'CaptchaLzl', 'LzlEditor', 'SimplePostor', 'TED', 'Path', 'UiBubbleTipBase'];
			if (option) {
				refAll = option.all || refAll;
				backup = option.backup || backup;
				if (option.name instanceof Array) name = option.name;
				else if (typeof option.name == 'string') name = [option.name]
			}
			var container = refAll ? obj: name;
			for (_n in container) {
				var n = refAll ? _n: container[_n];
				if (!obj.propertyIsEnumerable(n)) continue;
				if (backup && ref[n]) ref[n + '_bak'] = ref[n];
				ref[n] = obj[n]
			}
		},
		toolbarAdd: function(el) {
			var bar = $(rich_postor._editor.toolbar.holder),
			last = bar.find(':last'),
			lw = last.width(),
			width = bar.offset().left + bar.width() - last.offset().left - lw - 16,
			ew = 0;
			var _el = el.clone().appendTo(bar);
			ew = _el.width();
			width -= ew == 22 ? 25 : 76;
			_el.remove();
			function newLine() {
				bar.css('height', 60);
				bar.append("<hr style='clear:both; height:0; margin:0; padding:5px 0 0;'>");
				$(".tb-editor-toolbar span").css('margin-top', 5);
				$(".tb-editor-toolbar label").css('margin-top', 12);
				el.css('margin-left', ew == 22 ? 20 : 1)
			}
			if (width < 0) {
				newLine()
			} else if (ew == lw) {
				if (ew != 22) bar.append("<label></label>")
			} else {
				if (ew > lw) {
					if (width > 17) last.css('margin-right', 17);
					else newLine()
				} else if (ew < lw) {
					if (width > 20) el.css('margin-left', 20);
					else newLine()
				}
				bar.append("<label></label>")
			}
			bar.append(el)
		},
		htmlSymbols: function(text, convertAll, num) {
			var result = [],
			c,
			n;
			convertAll = typeof convertAll == 'undefined' ? false: convertAll;
			for (var i = 0; i < text.length; i++) {
				c = text[i];
				n = c.charCodeAt();
				num = num || 10;
				var prefix = '&#' + (num == 10 ? '': 'x');
				if (!convertAll && 32 < n && n < 127) {
					result.push(c);
					continue
				}
				result.push(prefix + n.toString(num) + ';')
			}
			return result.join('')
		},
		entToStr: function(entities) {
			var area = document.createElement("textArea");
			area.innerHTML = entities;
			return area.value
		},
		getImg: function(url) {
			if (document.images) {
				var a = new Image;
				a.src = url + '?t=' + Math.random();
				delete a
			}
		}
	}
	init()
})();
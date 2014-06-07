// ==UserScript==
// @name				hainei pmsgs enhancer
// @author				PorkFat
// @namespace			Hainei
// @version				0.8
// @description			私信列表可以按人、按群发过滤，私信签名档
// @include				http://www.hainei.com/pmsg*
// ==/UserScript==

// Add jQuery
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://code.jquery.com/jquery-latest.pack.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
	GM_wait();

// All your GM code must be inside this function
	function letsJQuery() {
// GM code starts
		function handlerMessageList() {
			if ($('#pmlist tr').length == 0) return;

			// Additional CSS Styles
			var CSS = document.createElement('style');
			CSS.type = 'text/css';
			var css_lines = '';
			css_lines += '#filter {padding:5px; background:#555; position:absolute; top:89px; left:50%; width:174px; margin-left:297px; border:1px solid #444; -moz-border-radius:6px;}';
			css_lines += '#filter .misc {display:block; padding:2px; color:#fff;}';
			css_lines += '#filter .avatar {position:relative; float:left; width:48px; height:48px; margin:3px; border:2px solid #eee; text-decoration:none;}';
			css_lines += '#filter .avatar:hover {border:2px solid #ff0;}';
			css_lines += '#filter .avatar span {position:absolute; right:0; bottom:0; padding:0 3px; background:#000; color:#fff; opacity:0.75;}';
			CSS.innerHTML = css_lines;
			document.getElementsByTagName('head')[0].appendChild(CSS);

			var array_map = new Array(); //私信对应的用户id
			var array_count = new Object(); //私信计数
			var array_gmessages = new Array(); //群发私信; Array of Message Index
			var el_status = $('.bar', '#toc')[0]; //信息栏HTML元素
			var str_status = el_status.innerHTML; //信息栏初始文本

			function showGroupMessages() {
				$('#pmlist tr').each(function(i){ $.inArray(i, array_gmessages) != -1 ? $(this).show().css('background', '#edf4fa') : $(this).hide(); });
				el_status.innerHTML = array_gmessages.length + ' 封 <img src="http://static.hainei.com/img/pmsg-throng.gif" alt="群发" /> 私信<span class="pipe">/</span>共 ' + str_status;
			}

			function showMessagesByID(id, name) {
				$('#pmlist tr').each(function(i){ array_map[i] == id ? $(this).show().css('background', '#edf4fa') : $(this).hide(); });
				el_status.innerHTML = array_count[id] + ' 封 <a href="http://www.hainei.com/user?r=' + id + '">' + name + '</a> 的私信<span class="pipe">/</span>共 ' + str_status;
			}

			function showAllMessages() {
				$('#pmlist tr').show().css('background', '');
				el_status.innerHTML = str_status;
			}

			$('<div id="filter"></div>').prependTo('body');

			$('<a href="#" class="misc" id="filter-all">显示所有人的私信 (' + $('#pmlist tr').length + ')</a>').appendTo('#filter').click(function(ev){ ev.preventDefault(); showAllMessages(); });

		// Initialize
			$('#pmlist tr').each(function(i){
				var el_avatar = $('.ava a', this)[0];
				var n = el_avatar.href.match(/user\?r=(\d+)/)[1];
				//按人整理
				// Generate the avtars.
				if ($.inArray(n, array_map) == -1) {
					$(el_avatar).clone().addClass('avatar').appendTo('#filter');
					array_count[n] = 1;
				} else {
					array_count[n]++;
				}
				array_map[i] = n;
				//按群发整理
				if ($('.time', this).eq(0).hasClass('pmsg-throng')) {
					array_gmessages.push(i);
				}
			});
			if (array_gmessages.length) {
				$('<a href="#" class="misc" id="filter-gmessages">只显示群发私信 (' + array_gmessages.length + ')</a>').insertAfter('#filter-all').click(function(ev){ ev.preventDefault(); showGroupMessages(); });
			}
		// Click avatar to filter the messages.
			$('#filter .avatar').each(function(i){
				var n = this.href.match(/user\?r=(\d+)/)[1];
				$(this).append('<span>' + array_count[n] + '</span>').click(function(ev){ ev.preventDefault(); showMessagesByID(n, $('img', this)[0].alt); });
			});
		}

		function handlerMessage() {
			// Additional CSS Styles
			var CSS = document.createElement('style');
			CSS.type = 'text/css';
			var css_lines = '';
			css_lines += '#setting {padding:5px; background:#555; position:absolute; top:89px; left:50%; width:174px; margin-left:297px; border:1px solid #444; -moz-border-radius:6px;}';
			css_lines += '#setting .misc {display:block; padding:2px; color:#fff;}';
			CSS.innerHTML = css_lines;
			document.getElementsByTagName('head')[0].appendChild(CSS);

			if (GM_getValue('hainei_pm_signature', false) === false) {
				GM_setValue('hainei_pm_signature', '我就那么一说');
			}
			var str_signature = GM_getValue('hainei_pm_signature');

			function signature(s) {
				if (s != '') {
					var separator = '\r\r----------\r';
					$('#pmsg-textarea').val(separator + str_signature);
				} else {
					$('#pmsg-textarea').val('');
				}
			}

			$('<div id="setting"><form id="setting-signature" style="display:none"><textarea name="signature" id="signature">' + str_signature + '</textarea><input type="button" id="submit-signature" class="f-button" value="保存" /></form></div>').prependTo('body');

			$('#submit-signature')[0].addEventListener('click',function(ev){
				ev.preventDefault();
				str_signature = $('#signature').val();
				GM_setValue('hainei_pm_signature', str_signature);
				signature(str_signature);
				$('#setting-signature').css('display', 'none');
		    },false);

			$('<a href="#" class="misc">设置签名档</a>')
				.prependTo('#setting')
				.click(function(ev){
						ev.preventDefault();
						$('#setting-signature').css('display', $('#setting-signature').css('display') == 'none' ? '' : 'none');
					});

			signature(str_signature);
		}

		var url = window.location.pathname.toString();
		switch (url) {
			case '/pmsgs':
				handlerMessageList();
				break;
			case '/pmsg':
				handlerMessage();
				break;
			default: break;
		}
// GM code ends
	}


// ==UserScript==
// @name        tiebaMP3
// @namespace   tieba
// @description 贴吧自定义插入mp3链接
// @include     http://tieba.baidu.com/*
// @version     2.1
// ==/UserScript==

//JQuery支持
$ = unsafeWindow.$;

//音乐链接面板 GUI界面
var musicUrl = '<span class="label">歌名</span><input style="width:100px" id="musicUrlTitle" placeholder="输入歌曲名" value="">';
musicUrl += '&nbsp;<span class="label">链接</span><input style="width:300px" id="musicUrl" placeholder="输入链接" value="">';
musicUrl += '&nbsp;<span id="convertLinks" class="btn" >插入音乐链接</span><span id="Check_status" style="color:red;display:none">歌名和链接不能为空</span>';
//css
var css = '.label{display:inline-block;padding:2px 4px;font-size:11.844px;font-weight:bold;line-height:14px;color:#ffffff;vertical-align:baseline;white-space:nowrap;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#999999;}\
.btn{font-size: 12px;height: 25.6px;line-height: 25.6px;padding: 0px 2px;transition-property: #000, color;\
transition-duration: 0.3s;\
box-shadow: none;\
background: none repeat scroll 0% 0% #00A1CB;\
color: #FFF;\
text-shadow: none;\
border: medium none;}';
GM_addStyle(css);

//调用控制
addNodeInsertedListener('.old_style_wrapper', function() {
	$(".old_style_wrapper").after(musicUrl);
	$('#convertLinks').click(check);
});

//函数 检查表单

function check() {
	if (($('#musicUrlTitle').val() == '') || ($('#musicUrl').val() == '')) {
		$('#Check_status').css('display', 'block');
		setTimeout(function() {
			$('#Check_status').hide();
		}, 2000);
	} else {
		rewriteGetContent();
		convertLinks();
	}
}
//插入函数 插入音乐

function convertLinks() {
	var url = $('#musicUrl').val();
	$('#musicUrl').val('');
	var title = $('#musicUrlTitle').val();
	if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && url.indexOf('ftp://') == -1)
		url = 'http://' + url;
	var temp = '<img data-height="95" data-width="400"';
	temp += ' title="http://box.baidu.com/widget/flash/bdspacesong.swf?from=tiebasongwidget&amp;url=';
	temp += url;
	temp += '&amp;name=' + encodeURIComponent(title) + '&amp;artist=';
	temp += '&amp;extra=&amp;autoPlay=false&amp;loop=true"';
	temp += 'src="http://tieba.baidu.com/tb/editor/v2/music.png" class="BDE_Music">';
	$("#ueditor_replace").html($('#ueditor_replace').html() + temp);
	$('.dialogJ,.dialogJmodal').remove();
}

//函数 元素精确定位

function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
		prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
		eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
		forEach = function(array, func) {
			for (var i = 0, l = array.length; i < l; i++) {
				func(array[i]);
			}
		};
	if (!noStyle) {
		var css = elCssPath + "{",
			css2 = "";
		forEach(prefixList, function(prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		GM_addStyle(css);
	}
	if (handler) {
		var bindedFunc = function(e) {
			var els = document.querySelectorAll(elCssPath),
				tar = e.target,
				match = false;
			if (els.length !== 0) {
				forEach(els, function(el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function(eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//函数 元素精确定位取消绑定

function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
		forEach = function(array, func) {
			for (var i = 0, l = array.length; i < l; i++) {
				func(array[i]);
			}
		};
	forEach(eventTypeList, function(eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}

//度娘处理函数改写(来自猫酱和小鹿姐)

function rewriteGetContent() {
	var b = unsafeWindow.test_editor.getContent;
	unsafeWindow.test_editor.getContent = function() {
		cr_flash = [];
		var d = b.call(unsafeWindow.test_editor);
		d = d.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/(^(<br\/>)+)|((<br\/>)+$)/g, "");
		var embeds = d.match(/<embed[^>]*>/g);
		if (embeds) {
			var f = '<embed allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" scale="noborder" src="#{url}" class="BDE_Music" width="400" height="95"/>';
			$('#ueditor_replace .BDE_Music').each(function() {
				var g = $.tb.format(f, {
					url: $(this).attr('title')
				});
				cr_flash.push(g);
			});
			for (var i = 0; i < embeds.length; i++)
				d = d.replace(embeds[i], cr_flash[i]);
		}
		return d;
	};
}
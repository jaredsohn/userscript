// ==UserScript==
// @name			校长之怒 for chrome
// @version			2.1
// @namespace		angerOfPresidentForChrome
// @include			http://tieba.baidu.com/*
// @include			http://tieba.baidu.com.cn/*
// @run-at 			document-end
// @author			anran
// ==/UserScript==


//重置配置,去掉注释即可(去掉行首两个斜杠"//"),注意,重置完成重新注释上
// localStorage.removeItem("xzconfig");
// localStorage.removeItem("xzblacklist");
// localStorage.removeItem("xzusersign");
// localStorage.removeItem("xztailsign");
execute();

function execute(){
	/***********************************chrome兼容部分*********************************************/
	
	var unsafeWindow = document.createElement("div");
	unsafeWindow.setAttribute("onclick", "return window;");
	unsafeWindow = unsafeWindow.onclick();
	unsafeWindow.rich_postor._submit2 = unsafeWindow.rich_postor._submit;
	unsafeWindow.rich_postor._submit = function(){
		setTimeout(function(){unsafeWindow.rich_postor._submit2()},1);
	}
	function GM_addStyle(css) {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
		}
	}
	/*************************************主体部分***********************************************/
	if (window != window.top || window.document.title == "" || !unsafeWindow.rich_postor)
		return;

	main();
	//避免冲突,给存储信息标识加个前缀,临时使用这段代码将信息拷贝过来
	if (!localStorage["xzconfig"] && localStorage["config"]) {
		localStorage["xzconfig"] = localStorage["config"];
		localStorage.removeItem("config");
	}
	if (!localStorage["xzblacklist"] && localStorage["blacklist"]) {
		localStorage["xzblacklist"] = localStorage["blacklist"];
		localStorage.removeItem("blacklist");
	}

	if (!localStorage["xzusersign"] && localStorage["usersign"]) {
		localStorage["xzusersign"] = localStorage["usersign"];
		localStorage.removeItem("usersign");
	}

	if (!localStorage["xztailsign"] && localStorage["tailsign"]) {
		localStorage["xztailsign"] = localStorage["tailsign"];
		localStorage.removeItem("tailsign");
	}
	//入口
	function main() {
		//校长基础样式
		GM_addStyle('ul#nunavigation {position: absolute;margin: 0px;padding: 0px;top: 0px;left: 10px;list-style: none;z-index: 999999;width: auto;}ul#nunavigation li {width: 103px;display: inline;float: left;}ul#nunavigation li a {display: block;float: left;margin-top: -2px;width: 100px;height: 25px;background-color: #E7F2F9;background-repeat: no-repeat;background-position: 50% 10px;border: 1px solid #BDDCEF;border-radius: 0px 0px 10px 10px;-webkit-border-bottom-right-radius: 10px;-webkit-border-bottom-left-radius: 10px;-khtml-border-bottom-right-radius: 10px;-khtml-border-bottom-left-radius: 10px;text-decoration: none;text-align: center;padding-top: 80px;opacity: 0.7;}ul#nunavigation li a:hover {background-color: #CAE3F2;}ul#nunavigation li a span {letter-spacing: 2px;font-size: 11px;color: #60ACD8;text-shadow: 0 -1px 1px #fff;}ul#nunavigation .photos a {background-image: url(http://imgsrc.baidu.com/forum/pic/item/4d086e061d950a7b044160650ad162d9f2d3c91e.jpg);}ul#nunavigation .option a {background-image: url(http://imgsrc.baidu.com/forum/pic/item/b8014a90f603738d42102283b31bb051f819ec3d.jpg);}.overlay {background: transparent url(http://tympanus.net/Tutorials/CSSOverlay/images/overlay.png) repeat top left;position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;z-index: 999;}.nubox {position: fixed;top: -400px;display:none;left: 25%;right: 28%;background-color: #fff;color: #7F7F7F;padding: 20px;border: 2px solid #ccc;border-radius: 20px;-webkit-border-radius: 20px;-khtml-border-radius: 20px;shadow: 0 1px 5px #333;-webkit-box-shadow: 0 1px 5px #333;z-index: 999;}.nubox h1 {font-size: 24px !important; border-bottom: 1px dashed #7F7F7F;margin: -20px -20px 0px -20px !important;padding: 10px !important;background-color: #FFEFEF;color: #EF7777;border-radius: 20px 20px 0px 0px;-webkit-border-top-left-radius: 20px;-webkit-border-top-right-radius: 20px;-khtml-border-top-left-radius: 20px;-khtml-border-top-right-radius: 20px;}a.boxclose {float: right;width: 26px;height: 26px;background: transparent url(http://imgsrc.baidu.com/forum/pic/item/267f9e2f07082838e11bf2b5b899a9014c08f179.jpg) repeat top left;margin-top: -30px;margin-right: -30px;cursor: pointer;}a.boxok {float: right;width: 32px;height: 32px;background: transparent url(http://imgsrc.baidu.com/forum/pic/item/a50f4bfbfbedab64da576361f736afc379311e6d.jpg) repeat top left;margin-top: -30px;cursor: pointer;}#header .i {opacity: 1 !important;}.subbtn_bg {float: none !important;}.subTip {float: none !important;}#postByUnicode, #convertLinks, #ConverToBase64 {width: 105px !important;background: url("http://imgsrc.baidu.com/forum/pic/item/3bf33a87e950352aaa7de3b15343fbf2b2118b6f.jpg") no-repeat scroll 0 0 transparent !important;}.base64html,.base64text {font-size:14px !important;}.recentImgDiv a {border: 3px solid #FFFFFF;float: left;height: 46px;width: 46px;text-align: center;}');
		//读取配置
		var blacklist = [];
		var config = [];
		var usersign = [];
		var tailsign = [];
		if (localStorage["xzconfig"])
			config = JSON.parse(localStorage["xzconfig"]);
		if (localStorage["xzblacklist"])
			blacklist = JSON.parse(localStorage["xzblacklist"]);
		if (localStorage["xzusersign"])
			usersign = JSON.parse(localStorage["xzusersign"]);
		if (localStorage["xztailsign"])
			tailsign = JSON.parse(localStorage["xztailsign"]);
		var imgSize = getConfig(2);
		var recentImg = getConfig(8);
		if (imgSize == null) {
			imgSize = new Object();
			imgSize.imgMinWidth = 500;
			imgSize.imgMaxWidth = 999;
			imgSize.imgMinHeight = 300;
			imgSize.imgMaxHeight = 999;
		}
		if (recentImg == undefined) {
			recentImg = [];
			recentImg.push('http://game.ali213.net/static/image/smiley/wei/0000.jpg');
			recentImg.push('http://game.ali213.net/static/image/smiley/wei/2.gif');
			recentImg.push('http://game.ali213.net/static/image/smiley/wei/26.gif');
			recentImg.push('http://game.ali213.net/static/image/smiley/wei/8.gif');
			recentImg.push('http://imgsrc.baidu.com/forum/pic/item/14ce36d3d539b60080ba9b1ee950352ac65cb727.jpg');
			recentImg.push('http://imgsrc.baidu.com/forum/pic/item/30adcbef76094b3678e78f44a3cc7cd98d109d26.jpg');
			recentImg.push('http://imgsrc.baidu.com/forum/pic/item/0824ab18972bd40775c447547b899e510fb30913.jpg');
			recentImg.push('http://imgsrc.baidu.com/forum/pic/item/0824ab18972bd40775c447547b899e510fb30913.jpg');
			recentImg.push('http://g.hiphotos.baidu.com/album/s%3D400%3Bq%3D90/sign=cdd2fe3dfc039245a5b5e00fb7afd5ff/6a600c338744ebf814506ccfd9f9d72a6059a718.jpg');
		}
		if (usersign.length == 0) {
			usersign[0] = new Object();
			usersign[0].name = '签名范例1';
			usersign[0].imgUrl = 'http://imgsrc.baidu.com/forum/pic/item/18d8bc3eb13533fae9aee28ca8d3fd1f41345b73.jpg';
			usersign[1] = new Object();
			usersign[1].name = '签名范例2';
			usersign[1].imgUrl = 'http://imgsrc.baidu.com/forum/pic/item/c995d143ad4bd113dad2c6905aafa40f4bfb0570.jpg';
		}
		if (tailsign.length == 0) {
			tailsign[0] = new Object();
			tailsign[0].name = '元芳,你怎么看';
			tailsign[0].value = '————元芳,你怎么看';
			tailsign[1] = new Object();
			tailsign[1].name = '校长,你怎么看';
			tailsign[1].value = '————校长,你怎么看';
			tailsign[2] = new Object();
			tailsign[2].name = '酷容,你怎么看';
			tailsign[2].value = '————酷容,你怎么看';
		}
		if (!getConfig(12))
			setConfig(12, []);

		//美化
		if (getConfig(6) != 0)
			GM_addStyle('body {fod_sign_splitnt-family:Microsoft YaHei !important;}a, a> font {text-decoration:none !important;color:rgb(28, 64, 120) !important;}a:visited {color:rgb(130, 130, 130) !important;}');
		//屏蔽小尾巴
		if (getConfig(10) == 1)
			GM_addStyle('span.apc_src_wrapper {display:none !important;}');

		var line = 'http://d.hiphotos.baidu.com/album/pic/item/e61190ef76c6a7efdd67e4abfdfaaf51f2de66fd.jpg';
		var split = '<br>———————————————————————————<br>';
		$ = unsafeWindow.$;
		setTimeout(function() {
			sbId = unsafeWindow.rich_postor._dom_id.add_post_submit.replace('aps', '');
			if ($("#thread_list").length > 0) {
				init2();
			} else {
				init1();
			}
		}, 0);
		//帖子页面初始化
		function init1() {
			blockUserSign();
			displayUserArea();
			displayFixedMenu();
			displayOptionDialog();
			displayPostArea();
			displayUserSignArea();
		}

		//列表页面初始化
		function init2() {
			displayFixedMenu();
			displayOptionDialog();
			displayThreadList();
			displayPostArea();
			displayUserSignArea();
		}

		//用户区各种显示
		function displayUserArea() {
			var $users = $("a.p_author_name");
			var $tbodys = $users.parent().parent().parent().parent();
			for (var i = 0; i < $users.length; i++) {
				displayUserArea2(i, $users, $tbodys);
			}
			$('div.p_postlist').find(".d_post_content").each(function(i) {
				autoConvertBase64($(this));
			});
			$('div.p_postlist').find('.lzl_cnt').each(function(i) {
				displayUserArea3($(this));
			});
			//兼容ajax翻页
			if (getConfig(11) == 1)
				document.addEventListener('DOMNodeInserted', function(event) {
					var $users = $(event.target).find('a.p_author_name');
					var $tbodys = $users.parent().parent().parent().parent();
					var $reply = $(event.target).find('a.lzl_link_unfold');
					$(event.target).find('div.l_post').each(function(i) {
						displayUserArea2(i, $users, $tbodys);
					});
					$(event.target).find(".d_post_content").each(function() {
						autoConvertBase64($(this));
					});
					$(event.target).find('.lzl_cnt').each(function(i) {
						displayUserArea3($(this));
					});
				}, true);
		}

		//楼层相关
		function displayUserArea2(i, $users, $tbodys) {
			var $user = $users.eq(i);
			var $tbody = $tbodys.eq(i);
			var $target = $tbody.find('ul.p_mtail');
			var username = $user.text();
			var louceng = JSON.parse($tbody.attr('data-field')).content.floor + "楼";
			var content = $tbody.find('.d_post_content').html();
			var ul = '';
			var url = "http://tianyatool.com/cgi-bin/baidu/baidu-lz.pl?url=" + window.location.href.replace(/\?.*/, "");
			if (getConfig(12)[9] != 1) {
				var a1 = '<a target="new" href="' + url + '&unm=' + encodeURI(username) + '">只看此人</a>';
				ul += '<li>' + a1 + '</li>';
			}
			if (getConfig(12)[10] != 1) {
				var a2 = '<a href="javascript:void(0);" class="blockUser" name="' + username + '">屏蔽此人</a>';
				ul += '<li>' + a2 + '</li>';

				$user.append(ul);
				$user.find("a.blockUser")[0].addEventListener('click', addToBlacklist, false);
				blockUser($tbody, username);
			}
			if (getConfig(12)[11] != 1) {
				addReplyHref(username, louceng, content, $target);
				displayQuoteArea($tbody.find('.d_post_content'), content);
			}
		}

		//楼层引用显示
		function displayQuoteArea($d_post_content, content) {
			if (content.indexOf(split) == -1 || getConfig(12)[12] == 1)
				return;
			var tmp1 = /^引用.*?楼\)/.exec(content);
			content = content.replace(tmp1, '');

			var tmp2 = content.substr(4, content.indexOf(split));
			content = content.substr(content.indexOf(split) + split.length, content.length - 1);

			var quote = '<blockquote class="d_quote"><fieldset><legend>' + tmp1 + '</legend><p class="quote_content">' + tmp2 + '</fieldset></blockquote>';
			$d_post_content.html(content);
			$d_post_content.parent().parent().prepend(quote);
		}

		function blockUser($tbody, username) {
			for (var j = 0; j < blacklist.length; j++) {
				if (username == blacklist[j]) {
					if (getConfig(3) == 0) {
						$tbody.children().remove();
						$tbody.prepend("<br>");
						$tbody.prepend(blockTbody(username));
						$tbody.prepend("<br>");
					} else {
						$tbody.remove();
					}
				}
			}
		}

		//楼中楼
		function displayUserArea3($this) {
			var username = $this.find('.at').attr('username');

			if (getConfig(12)[11] != 1) {
				var content = $this.find('.lzl_content_main').text();
				var parent = $this.parent().parent().parent().parent().parent().parent().parent();
				var obj = parent.attr('data-field') == undefined ? parent.parent().attr('data-field') : parent.attr('data-field');
				var louceng = louceng = JSON.parse(obj).content.floor + "楼";
				content = content.replace(/(<br>)+/gi, '<br>');
				addReplyHref(username, louceng, content, $this.find('.lzl_content_reply'));
			}

			if (getConfig(12)[10] != 1)
				blockUserReply($this, username);
		}

		function blockUserReply($this, username) {
			for (var j = 0; j < blacklist.length; j++) {
				if (username == blacklist[j]) {
					if (getConfig(3) == 0) {
						$this.parent().html('<font color="red">被屏蔽的回复 来自于 ' + username + '</font>');
					} else {
						$this.parent().remove();
					}
				}
			}
		}

		//添加引用按钮
		function addReplyHref(username, louceng, content, $target) {
			var a = document.createElement('a');
			a.href = '#sub';
			a.innerHTML = '&nbsp;引用';
			a.style.cssFloat = 'right';
			a.addEventListener('click', function() {
				if (( i = content.indexOf(split)) != -1) {
					content = content.substr(i, content.length - 1);
				}
				content = content.replace(/^引用[^——————————————————————]*/gi, '').replace(split, '').replace(/<span class="apc_src_wrapper">.*<\/span>/gi, '').replace(/\s*/gi, '').replace(/<br>/gi, "〓").replace(/<img[^>]*>/gi, '㊣').replace(/<[^>]*>/gi, '').substr(0, 100).replace(/㊣/gi, '[图片]').replace(/〓+/gi, "<br>").replace(/<br>$/gi, '');
				if (content.length >= 100)
					content += '……';
				var temp = '引用 @' + username + ' (' + louceng + ')<br>' + content + split;
				$("div.tb-editor-editarea").html(temp + $("div.tb-editor-editarea").html());
			}, false);

			$target.append(a);
		}

		//配置窗口初始化
		function displayOptionDialog() {
			var div = '<div class="overlay" id="overlay" style="display:none;"></div>';
			div += '<div class="nubox" id="box"><a class="boxclose" id="boxclose"></a><h1>Option<br></h1><br>';

			var st12 = "<li>关闭模块：";
			st12 += "<input type='checkbox' id='st12_1'/>&nbsp;UNICODE&emsp;&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_4'/>&nbsp;和谐测试&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_3'/>&nbsp;竖排转换&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_2'/>&nbsp;BASE64&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_13'/>&nbsp;BASE64（显示）";

			st12 += "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_6'/>&nbsp;自定义签名&emsp;&nbsp;&nbsp;";
			st12 += "<input type='checkbox' id='st12_5'/>&nbsp;小尾巴&emsp;&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_7'/>&nbsp;音乐链接&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_8'/>&nbsp;最近图片&emsp;&nbsp;&nbsp;";
			st12 += "<input type='checkbox' id='st12_9'/>&nbsp;只看此人";

			st12 += "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_10'/>&nbsp;黑名单&emsp;&emsp;&emsp;&nbsp;&nbsp;";
			st12 += "<input type='checkbox' id='st12_11'/>&nbsp;引用&emsp;&emsp;&emsp;&emsp;";
			st12 += "<input type='checkbox' id='st12_12'/>&nbsp;引用(显示)&emsp;&nbsp;";
			st12 += "<input type='checkbox' id='st12_14'/>&nbsp;末页链接";
			div += st12 + "</li>";

			var st1 = "<li><input type='checkbox' id='st6'/>&nbsp;开启美化&emsp;";
			st1 += "<input type='checkbox' id='st10'/>&nbsp;屏蔽小尾巴&emsp;";
			st1 += "<input type='checkbox' id='st1'/>&nbsp;屏蔽黑名单用户主题&emsp;";
			st1 += "<input type='checkbox' id='st1_2'/>&nbsp;不显示被屏蔽用户楼层提示&emsp;";
			st1 += "<input type='checkbox' id='st11'/>&nbsp;兼容自动翻页扩展(脚本)</li>";
			div += st1;

			var st7 = "<li>BASE64转换 :&emsp;&emsp;<input type='radio' name='st7' value = '0'/>关闭自动转换";
			st7 += "&emsp;&emsp;<input type='radio' name='st7' value = '1'/>自动转换为html格式";
			st7 += "&emsp;&emsp;<input type='radio' name='st7' value = '2'/>自动转换为文本格式</li>";
			div += st7;

			var st5 = "<li>屏蔽签名档 :&emsp;&emsp;&nbsp;&nbsp;<input type='radio' name='st5' value = '0'/>屏蔽所有签名";
			st5 += "&emsp;&emsp;<input type='radio' name='st5' value = '1'/>屏蔽重复签名";
			st5 += "&emsp;&emsp;&emsp;&emsp;&emsp;<input type='radio' name='st5' value = '2' />不使用屏蔽</li>";
			div += st5;

			var st2 = "<li>仅看图片大小：&emsp;&nbsp;";
			st2 += "<input type='text' style='width:50px;' id='st2_1'/>";
			st2 += " < 宽  < <input type='textField' style='width:50px;' id='st2_2'/>";
			st2 += "&emsp;且 &emsp;<input type='text' style='width:50px;' id='st2_3'/>";
			st2 += " < 高  < <input type='textField' style='width:50px;' id='st2_4'/></li>";
			div += st2;

			var st3 = "<li>黑名单 (逗号分隔多个用户)<textarea rows=2 style='resize: none;width:100%' id='st3'/> </li>";
			div += st3;
			var st4 = "<li>签名档 (签名名称:签名地址 , 换行分隔多个签名)<textarea rows=2 style='resize: none;width:100%' id='st4'/> </li>";
			div += st4;
			var st8 = "<li>最近使用的表情 (换行分隔多个表情)<textarea rows=2 style='resize: none;width:100%' id='st8'/> </li>";
			div += st8;
			var st9 = "<li>小尾巴 (尾巴名称:尾巴内容 , 换行分隔多个尾巴)<textarea rows=2 style='resize: none;width:100%' id='st9'/> </li>";
			div += st9;
			div += '<br><br><a class="boxok" id="boxok"></a></div>';
			$(document.body).append(div);

			$('#boxok')[0].addEventListener("click", saveConfig, false);
			$('#option').click(function() {
				flushConfig();
				$('#overlay').fadeIn('fast', function() {
					$('#box').animate({
						'top' : '30px'
					}, 300);
					$('#box').css("display", "block");
				});
			});
			$('#boxclose').click(function() {
				$('#box').animate({
					'top' : '-400px'
				}, 300, function() {
					$('#box').css("display", "none");
					$('#overlay').fadeOut('fast');
				});
			});
		}

		//刷新配置菜单
		function flushConfig() {
			//列表过滤
			{
				var st1 = getConfig(0);
				if (st1 == null || st1 != 0)
					$("#st1").attr("checked", true);
				else
					$("#st1").attr("checked", false);
			}
			//
			{
				var st1_2 = getConfig(3);
				if (st1_2 == null || st1_2 != 0)
					$("#st1_2").attr("checked", true);
				else
					$("#st1_2").attr("checked", false);
			}
			//
			{
				var st4 = "";
				for (var i = 0; i < usersign.length; i++)
					st4 += usersign[i].name + ":" + usersign[i].imgUrl + "\n";
				$("#st4").val(st4);
			}
			//
			{
				var st5 = getConfig(4) == undefined ? 2 : getConfig(4);
				$("input:radio[name='st5']").eq(st5).attr("checked", true);
			}
			//
			{
				var st6 = getConfig(6);
				$("#st6").attr("checked", st6 != 0);
			}
			//
			{
				var st7 = getConfig(7) == undefined ? 2 : getConfig(7);
				$("input:radio[name='st7']").eq(st7).attr("checked", true);
			}
			//
			{
				var st8 = "";
				for (var i = 0; i < recentImg.length; i++)
					st8 += recentImg[i] + "\n";
				$("#st8").val(st8);
			}
			//
			{
				var st9 = "";
				for (var i = 0; i < tailsign.length; i++)
					st9 += tailsign[i].name + ":" + tailsign[i].value + "\n";
				$("#st9").val(st9);
			}
			//
			{
				var st10 = getConfig(10);
				if (st10 == null || st10 == 0)
					$("#st10").attr("checked", false);
				else
					$("#st10").attr("checked", true);
			}
			//
			{
				var st11 = getConfig(11);
				if (st11 == 1)
					$("#st11").attr("checked", true);
				else
					$("#st11").attr("checked", false);
			}
			//
			{
				var st12 = getConfig(12);
				for (var i = 0; i < 14; i++)
					if (st12[i])
						$("#st12_" + i).attr("checked", true);
			}
			$("#st2_1").val(imgSize.imgMinWidth);
			$("#st2_2").val(imgSize.imgMaxWidth);
			$("#st2_3").val(imgSize.imgMinHeight);
			$("#st2_4").val(imgSize.imgMaxHeight);
			$("#st3").val(blacklist);
		}

		//存储配置信息
		function saveConfig() {
			//列表过滤
			{
				var st1 = $("#st1")[0].checked ? 1 : 0;
				setConfig(0, st1);
			}
			//完全屏蔽
			{
				var st1_2 = $("#st1_2")[0].checked ? 1 : 0;
				setConfig(3, st1_2);
			}
			//屏蔽签名档
			{
				var st5 = $("input:radio[name='st5']:checked").val();
				setConfig(4, st5);
			}
			//仅看图片
			{
				imgSize.imgMinWidth = $("#st2_1").val();
				imgSize.imgMaxWidth = $("#st2_2").val();
				imgSize.imgMinHeight = $("#st2_3").val();
				imgSize.imgMaxHeight = $("#st2_4").val();
				setConfig(2, imgSize);
			}
			//黑名单
			{
				blacklist = $("#st3").val().replace('，', ',').split(',');
				localStorage["xzblacklist"] = JSON.stringify(blacklist);
			}
			//自定义签名
			{
				if ($("#st4").val().length > 3) {
					var a = $("#st4").val().replace('：', ':').split('\n');
					var b = new Array();
					for (var i = 0; i < a.length; i++) {
						var c = new Object();
						c.name = a[i].substring(0, a[i].indexOf(":"));
						c.imgUrl = a[i].substring(a[i].indexOf(":") + 1);
						if (c.name != "" && c.imgUrl != "") {
							b[i] = c;
						}
					}
					localStorage["xzusersign"] = JSON.stringify(b);
				} else {
					localStorage["xzusersign"] = JSON.stringify(new Array());
				}
			}
			//美化
			{
				var st6 = $("#st6")[0].checked ? 1 : 0;
				setConfig(6, st6);
			}
			//是否转换base64
			{
				var st7 = $("input:radio[name='st7']:checked").val();
				setConfig(7, st7);
			}
			//最近使用的表情
			{
				var temp = $("#st8").val().split('\n');
				var st8 = [];
				for (var i = 0; i < temp.length && i < 10; i++) {
					if (temp[i].length > 0 && !st8.contains(temp[i]))
						st8.push(temp[i]);
				}
				setConfig(8, st8);
			}
			//小尾巴
			{
				if ($("#st9").val().length > 3) {
					var a = $("#st9").val().replace('：', ':').split('\n');
					var b = new Array();
					for (var i = 0; i < a.length; i++) {
						var c = new Object();
						c.name = a[i].substring(0, a[i].indexOf(":"));
						c.value = a[i].substring(a[i].indexOf(":") + 1);
						if (c.name != "" && c.value != "") {
							b[i] = c;
						}
					}
					localStorage["xztailsign"] = JSON.stringify(b);
				} else {
					localStorage["xztailsign"] = JSON.stringify(new Array());
				}
			}
			//屏蔽小尾巴
			{
				var st10 = $("#st10")[0].checked ? 1 : 0;
				setConfig(10, st10);
			}
			//兼容翻页
			{
				var st11 = $("#st11")[0].checked ? 1 : 0;
				setConfig(11, st11);
			}
			//关闭模块
			{
				var st12 = getConfig(12);

				st12[1] = $("#st12_1")[0].checked ? 1 : 0;
				st12[2] = $("#st12_2")[0].checked ? 1 : 0;
				st12[3] = $("#st12_3")[0].checked ? 1 : 0;
				st12[4] = $("#st12_4")[0].checked ? 1 : 0;
				st12[5] = $("#st12_5")[0].checked ? 1 : 0;
				st12[6] = $("#st12_6")[0].checked ? 1 : 0;
				st12[7] = $("#st12_7")[0].checked ? 1 : 0;
				st12[8] = $("#st12_8")[0].checked ? 1 : 0;
				st12[9] = $("#st12_9")[0].checked ? 1 : 0;
				st12[10] = $("#st12_10")[0].checked ? 1 : 0;
				st12[11] = $("#st12_11")[0].checked ? 1 : 0;
				st12[12] = $("#st12_12")[0].checked ? 1 : 0;
				st12[13] = $("#st12_13")[0].checked ? 1 : 0;
				st12[14] = $("#st12_14")[0].checked ? 1 : 0;

				setConfig(12, st12);
			}
			window.location.reload();
		}

		//屏蔽签名档
		function blockUserSign() {
			var st4 = getConfig(4);
			var $d_sign_split = $('.d_sign_split');
			var $usersignSplit = $('.img[src="' + line + '"]');
			if (st4 == 0) {
				for (var i = 0; i < $d_sign_split.length; i++) {
					var split = $d_sign_split.eq(i);
					var next = split.next();
					next.remove();
					split.remove();
				}
				for (var i = 0; i < $usersignSplit.length; i++) {
					var split = $usersignSplit.eq(i);
					split.next().next().remove();
					split.next().remove();
					split.remove();
				}
			} else if (st4 == 1) {
				var temps = new Array();
				for (var i = 0; i < $d_sign_split.length; i++) {
					var split = $d_sign_split.eq(i);
					var next = split.next();
					var src = next.attr("src") != "/tb/static-pb/img/user/default_sign.png" ? next.attr("src") : next.attr("data-passive");
					if (temps.contains(src)) {
						next.remove();
						split.remove();
					} else
						temps.push(src);
				}
				for (var i = 0; i < $usersignSplit.length; i++) {
					var split = $usersignSplit.eq(i);
					var next = split.next().next();
					if (temps.contains(next.attr('src'))) {
						next.remove();
						split.next().remove();
						split.remove();
					} else
						temps.push(next.attr('src'));
				}
			}
		}

		//列表相关显示
		function displayThreadList() {

			//兼容ajax自动翻页
			if (getConfig(11) == 1)
				$('#container')[0].addEventListener('DOMNodeInserted', function(event) {
					$(event.target).find("li.j_thread_list").each(function(i) {
						displayThreadList2($(this));
					});
				}, true);
			displayThreadList2($("li.j_thread_list"));
		}

		function displayThreadList2($ThreadList) {
			var temp = new Object();
			for (var i = 0; i < $ThreadList.length; i++) {
				if (getConfig(12)[14] != 1) {
					var $Thread = $ThreadList.eq(i);
					var $a = $Thread.find('a.j_th_tit').eq(0);
					if ($Thread.children().eq(0).text() > 30) {
						var href = "http://wapp.baidu.com/f/m?kz=" + $a.attr("href").replace(/\/p\//g, '');
						var a = document.createElement('a');
						a.innerHTML = '>>';
						a.href = 'javascript:void(0);';
						$(a).attr("wapphref", $a.attr("href").replace(/\/p\//g, ''));
						a.addEventListener('click', function() {
							var tid = $(this).attr("wapphref")
							var $this = $(this);
							GM_xmlhttpRequest({
								method : 'GET',
								url : "http://wapp.baidu.com/f/m?kz=" + tid + '&pn=10',
								headers : {
									"Content-Type" : "application/x-www-form-urlencoded"
								},
								onload : function(data) {
									var pn = $(data.responseText).find('[name=pnum]').attr('value');
									var n = $(data.responseText).find('div.i').length;
									if (pn == undefined)
										pn = 1;
									else if (n == 10)
										pn = Math.ceil(pn / 3);
									window.location.href ='/p/' + tid + '?pn=' + pn;
								}
							});
						}, false);
						$a.after(a);
					}
				}
				//列表页黑名单屏蔽
				if (getConfig(12)[10] != 1) {

					var st1 = getConfig(0);
					var username = $ThreadList.eq(i).find('span.tb_icon_author').children().eq(0).text();
					if (st1 == null || st1 != 0) {
						for (var j = 0; j < blacklist.length && username.length > 0; j++) {
							if (username == blacklist[j]) {
								$ThreadList.eq(i).remove();
								temp[username] = temp[username] == null ? 1 : temp[username] + 1;
							}
						}
					}

				}
			}
			if (getConfig(12)[10] != 1) {
				var str = "";
				for (var user in temp)
				str += user + " (" + temp[user] + ")  ";
				if (str != "")
					$("div.th_footer_l").append(' , 屏蔽信息 : <span class="red">' + str + '</span>');
			}

		}

		//各种按钮
		function displayPostArea() {

			//添加各种按钮
			var button = '';
			if (getConfig(12)[1] != 1)
				button += '&nbsp;<input type="button" value="unicode发表" class="subbtn_bg" id="postByUnicode">';
			if (getConfig(12)[2] != 1)
				button += '&nbsp;<input type="button" value="转换为base64" class="subbtn_bg" id="ConverToBase64">';
			if (getConfig(12)[3] != 1)
				button += '&nbsp;<input type="button" value="竖 排" class="subbtn_bg" id="changeText">';
			if (getConfig(12)[4] != 1)
				button += '&nbsp;<input type="button" value="和谐测试" class="subbtn_bg" id="hexieTest">';
			$('#aps' + sbId).after(button);

			if (getConfig(12)[7] != 1) {
				var title = getConfig(5) == null ? "音乐链接" : getConfig(5);
				var musicUrl = '<tr><td></td><td>&nbsp;标题 : <input value="' + title + '" style="width:100px" id="musicUrlTitle">';
				musicUrl += '&nbsp;链接 : <input value="http://tieba.baidu.com/f?kw=firefox" style="width:300px" id="musicUrl">';
				musicUrl += '&nbsp;<input type="button" id="convertLinks" class="subbtn_bg" value="插入音乐链接"></td></tr>';
				$('#pu' + sbId).parent().append(musicUrl);
			}
			if (getConfig(12)[8] != 1) {
				//最近表情面板
				var div = '<div class="recentImgDiv" style="display:none"><div class="tb-editor-overlay" style="display: block; left: 43%; top: 35px; width: 260px; height: 160px;"><span class="arrow" style="left: 13px;"></span><div class="overlay-content"><br><h3 align="middle">最近使用的表情</h3><hr><div></div></div></div>';
				$('.tb-editor-wrapper').append(div);

				if ($('#postByUnicode')[0])
					$('#postByUnicode')[0].addEventListener("click", postByUnicode, true);
				if ($('#ConverToBase64')[0])
					$('#ConverToBase64')[0].addEventListener("click", ConverToBase64, true);
				if ($('#changeText')[0])
					$('#changeText')[0].addEventListener("click", changeText, false);
				if ($('#hexieTest')[0])
					$('#hexieTest')[0].addEventListener("click", hexieTest, false);
				if ($('#convertLinks')[0])
					$('#convertLinks')[0].addEventListener("click", convertLinks, false);
				if ($('span.smiley')[0])
					$('span.smiley')[0].addEventListener("click", recentImgDivDisplayNone, false);
				if ($('span.smiley')[0]) {
					$('span.smiley')[0].addEventListener("mouseover", recentImgDivDisplay, false);
					$('span.smiley')[0].addEventListener("mouseout", recentImgDivDisplayNone, false);
				}
				if ($('div.recentImgDiv')[0]) {
					$('div.recentImgDiv')[0].addEventListener("mouseover", recentImgDivDisplay, false);
					$('div.recentImgDiv')[0].addEventListener("mouseout", recentImgDivDisplayNone, false);
				}
			}
		}

		//显示最近使用的表情
		function recentImgDivDisplay() {
			if ($('div.recentImgDiv')[0] != undefined && $('.recentImgDiv .overlay-content img').length == 0) {
				var div = $('.recentImgDiv .overlay-content');
				var scope = unsafeWindow.rich_postor._editor._events.paste[0].scope;
				for (var i = 0; i < recentImg.length; i++) {
					var a = document.createElement('a');
					a.addEventListener('click', function() {
						var src = scope.createImageTagFromUrl(this.childNodes[0].src);
						unsafeWindow.rich_postor._editor.execCommand("inserthtml", src);
						recentImgDivDisplayNone();
					}, false);
					$(a).append('<img src=' + recentImg[i] + ' style="width:40px;height:40px;">');
					div.append(a);
				}
			}
			$('div.recentImgDiv').css("display", "");
		}

		function recentImgDivDisplayNone() {
			$('div.recentImgDiv').css("display", "none");
		}

		function recentImgSave() {
			if (getConfig(12)[8] == 1)
				return;
			var temp = new Array();
			$(unsafeWindow.rich_postor._editor.editArea).find('img').each(function(index) {
				if (this.width < 129 && this.height < 129) {
					var src = this.src;
					if (!temp.contains(src))
						temp.push(src);
				}
			});
			for (var i = 0; i < recentImg.length; i++) {
				var src = recentImg[i];
				if (!temp.contains(src))
					temp.push(src);
			}

			var end = temp.length < 10 ? temp.length : 10;
			recentImg = temp.slice(0, end);
			setConfig(8, recentImg);
		}

		//转换为base64
		function ConverToBase64() {
			var str = a2u($("div.tb-editor-editarea").text());
			var result = 'data:text/html;base64,' + btoa(str);
			$("div.tb-editor-editarea").html(result);
		}

		//和谐测试
		function hexieTest() {
			GM_xmlhttpRequest({
				method : 'POST',
				url : 'http://xiaohexie.com/~xiaohexi/ff_test.php',
				data : "co=" + unsafeWindow.rich_postor._editor.editArea.innerHTML.replace(/&nbsp;/gi, ' '),
				headers : {
					"Content-Type" : "application/x-www-form-urlencoded"
				},
				onload : function(data) {
					var temp = data.responseText.replace(/\s/gi, '&nbsp;').replace(/丄/gi, '龘');
					unsafeWindow.rich_postor._editor.editArea.innerHTML = temp;
				}
			});
		}

		//音乐链接
		function convertLinks() {
			var url = $('#musicUrl').val();
			$('#musicUrl').val('');
			var title = $('#musicUrlTitle').val();
			setConfig(5, title);
			if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && url.indexOf('ftp://') == -1)
				url = 'http://' + url;

			var temp = '<img data-height="95" data-width="400"';
			temp += ' title="http://box.baidu.com/widget/flash/bdspacesong.swf?from=tiebasongwidget&amp;url=';
			temp += url;
			temp += '&amp;name=' + encodeURIComponent(title) + '&amp;artist=';
			temp += '&amp;extra=&amp;autoPlay=false&amp;loop=true"';
			temp += 'src="http://tieba.baidu.com/tb/editor/v2/music.png" class="BDE_Music">';
			unsafeWindow.rich_postor._editor.editArea.innerHTML += temp;
		}

		//构建屏蔽信息
		function blockTbody(username) {
			var font = document.createElement("font");
			font.color = "red";
			font.innerHTML = "此楼来自于被屏蔽用户 " + username + " . ";

			var a = document.createElement("a");
			a.innerHTML = "将该用户移出黑名单.";
			a.href = "javascript:void(0);";
			a.style.textDecoration = "none";
			a.name = username;
			a.className = "blockInfo";
			a.addEventListener("click", removeFromBlacklist, false);

			var div = document.createElement("div");
			div.appendChild(font);
			div.appendChild(a);
			div.align = 'center';
			return div;
		}

		//加入黑名单
		function addToBlacklist() {
			var username = $(this).attr("name");
			for (var i = 0; i < blacklist.length; i++)
				if (username == blacklist[i])
					return;

			blacklist.push(username);
			localStorage["xzblacklist"] = JSON.stringify(blacklist);

			var $p = $("a[name=" + username + "]").parent().parent().parent().parent().parent().parent();

			for (var i = 0; i < $p.length; i++) {
				blockUser($p.eq(i), username);
			}
			$('div.p_postlist').find('.lzl_cnt').each(function(i) {
				displayUserArea3($(this));
			});

			$(this).parent().parent().css("display", "none");
		}

		//自定义签名和小尾巴面板显示以及事件监听
		function displayUserSignArea() {
			//尾巴
			if (getConfig(12)[5] != 1) {
				var div2 = '<tr>';
				var names2 = "";
				for (var i = 0; i < tailsign.length; i++)
					names2 += "<option oid = " + (i + 2) + ">" + tailsign[i].name + "</option>";
				div2 += "<td></td><td><input type='checkbox' id='doTailSign'/>使用小尾巴&emsp;&emsp;&emsp;&emsp;<select id='TailSignValue'>";
				div2 += "<option oid = 0>随机小尾巴</option>";
				div2 += "<option oid = 1>http请求头</option>";
				div2 += names2 + "</select></td></tr>";
				$("#pu" + sbId).after(div2);

				var $doTailSign = $("input#doTailSign");
				var $TailSignValue = $("select#TailSignValue");
				var config9 = getConfig(9);
				if (config9 != -1) {
					$doTailSign.attr("checked", true);
					$TailSignValue.find("option").eq(config9).attr("selected", true);
				}
				$doTailSign[0].addEventListener("click", saveTailSignInfo, false);
				$TailSignValue[0].addEventListener("click", saveTailSignInfo, false);
			}
			//签名
			if (getConfig(12)[6] != 1) {
				var div = '<tr>';
				var names = "";
				for (var i = 0; i < usersign.length; i++)
					names += "<option oid = " + (i + 1) + ">" + usersign[i].name + "</option>";
				div += "<td></td><td><input type='checkbox' id='doUserSign'/>使用自定义签名档&emsp;<select id='UserSignImg'>";
				div += "<option oid = 0>随机签名</option>"
				div += names + "</select></td></tr>";
				$("#pu" + sbId).after(div);

				var $doUserSign = $("input#doUserSign");
				var $UserSignImg = $("select#UserSignImg");
				var config1 = getConfig(1);
				if (config1 != -1) {
					$doUserSign.attr("checked", true);
					$UserSignImg.find("option").eq(config1).attr("selected", true);
				}

				//签名档BUG暂用预读解决
				$(document.body).append('<img width="0px" height="0px" src="' + line + '">');
				for (var i = 0; i < usersign.length; i++)
					$(document.body).append('<img width="0px" height="0px" src="' + usersign[i].imgUrl + '">');

				$doUserSign[0].addEventListener("click", saveUserSignInfo, false);
				$UserSignImg[0].addEventListener("click", saveUserSignInfo, false);
			}

			$('#aps' + sbId)[0].addEventListener("click", recentImgSave, true);
			$('#aps' + sbId)[0].addEventListener("click", submitWithUserSign, true);
			window.addEventListener("keydown", function(event) {
				if (event.ctrlKey && event.keyCode == 13 && event.target.className == 'tb-editor-editarea edit_field_focus') {
					recentImgSave();
					submitWithUserSign();
				}
			}, true);

		}

		//添加签名和小尾巴,发帖
		function submitWithUserSign() {
			//添加小尾巴
			if ($("input#doTailSign")[0] && $("input#doTailSign")[0].checked) {
				var optionIndex2 = parseInt($("select#TailSignValue").find("option:selected").attr("oid"));
				if (optionIndex2 == 0) {
					var len = $("select#TailSignValue").find("option").length - 2;
					optionIndex2 = Math.floor(Math.random() * len + 2);
				}

				var value = "";
				if (optionIndex2 == 1)
					value = navigator.userAgent;
				else {
					value = tailsign[optionIndex2 - 2].value;
					var len = 40 - value.length;
					value = value.replace(/\s\s/gi, '&emsp;');
					for (var i = 0; i < len; i++)
						value = "&emsp;" + value;
				}
				unsafeWindow.rich_postor._editor.editArea.innerHTML += "<br><br><br><br><span class=\"apc_src_wrapper\">" + value + "<\/span>";
			}
			//添加自定义签名
			if ($("input#doUserSign")[0] && $("input#doUserSign")[0].checked) {
				var optionIndex1 = parseInt($("select#UserSignImg").find("option:selected").attr("oid"));
				if (optionIndex1 == 0) {
					var len = $("select#UserSignImg").find("option").length - 1;
					optionIndex1 = Math.floor(Math.random() * len + 1);
				}
				var scope = unsafeWindow.rich_postor._editor._events.paste[0].scope;
				var img = scope.createImageTagFromUrl(line);
				var img2 = scope.createImageTagFromUrl(usersign[optionIndex1 - 1].imgUrl);
				unsafeWindow.rich_postor._editor.editArea.innerHTML += "<br>" + img + "<br>" + img2;
				//unsafeWindow.rich_postor._editor.execCommand("inserthtml", img);
			}
		}

		//自定义签名状态记忆
		function saveUserSignInfo() {
			if (!$('input#doUserSign')[0].checked) {
				setConfig(1, -1);
				return;
			}
			var optionIndex = $("select#UserSignImg").find("option:selected").attr("oid");
			setConfig(1, Number(optionIndex));
		}

		//小尾巴状态记忆
		function saveTailSignInfo() {
			if (!$('input#doTailSign')[0].checked) {
				setConfig(9, -1);
				return;
			}
			var optionIndex = $("select#TailSignValue").find("option:selected").attr("oid");
			setConfig(9, Number(optionIndex));
		}

		//自动解码base64
		function autoConvertBase64($d_post_content) {
			if (getConfig(12)[13] == 1)
				return;
			var temp = $d_post_content.html();
			if (!/data:text\/html;base64,.*/.test(temp))
				return;
			$d_post_content.parent().prepend('<a href="javascript:void(0);" style="text-decoration: none;" class="convertBase64ToHtml">转换为html</a>&emsp;<a href="javascript:void(0);" style="text-decoration: none;" class="convertBase64ToText">转换为文本</a>&emsp;<a href="javascript:void(0);" style="text-decoration: none;" class="convertBase64ToNone">取消转换</a>&emsp;<font style="font-size:11px;line-height:11px;color:red;" class="base64font">未转换的base64数据 : </font><hr>');

			$d_post_content.parent().find(".convertBase64ToHtml")[0].addEventListener("click", function() {
				convertBase64ToHTML($d_post_content, temp);
			}, false);
			$d_post_content.parent().find(".convertBase64ToText")[0].addEventListener("click", function() {
				convertBase64ToText($d_post_content, temp);
			}, false);
			$d_post_content.parent().find(".convertBase64ToNone")[0].addEventListener("click", function() {
				$d_post_content.css("display", "");
				$d_post_content.parent().find(".base64font").html('未转换的base64数据');
				$d_post_content.parent().find(".base64text").remove();
				$d_post_content.parent().find(".base64html").remove();
			}, false);
			var i = getConfig(7);
			if (i == 1) {
				convertBase64ToHTML($d_post_content, temp);
			} else if (i != 0) {
				convertBase64ToText($d_post_content, temp);
			}
		}

		//base64解码为文本
		function convertBase64ToText($d_post_content, temp) {
			try {
				$d_post_content.css("display", "none");
				$d_post_content.parent().find(".base64font").html('文本形式的base64数据');
				$d_post_content.parent().find(".base64text").remove();
				$d_post_content.parent().find(".base64html").remove();
				var str = /data:text\/html;base64,.*/.exec(temp) + '';
				str = str.replace(/\<br\>.*/g, '');
				var str2 = atob(str.replace(/data:text\/html;base64,/, ''));

				var tmp = str.match(/&#(\d+);/g);
				if (tmp != null)
					for (var i = 0; i < tmp.length; i++) {
						str = str.replace(tmp[i], String.fromCharCode(tmp[i].replace(/[&#;]/g, '')));
					}

				var result = $d_post_content.html().replace(str, str2.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
				$d_post_content.parent().append("<p class='base64text'>" + result + "</p>");
			} catch(e) {
				//alert(e);
			}
		}

		//base64解码为html
		function convertBase64ToHTML($d_post_content, temp) {
			try {
				$d_post_content.css("display", "none");
				$d_post_content.parent().find(".base64font").html('html形式的base64数据');
				$d_post_content.parent().find(".base64text").remove();
				$d_post_content.parent().find(".base64html").remove();
				var str = /data:text\/html;base64,.*/.exec(temp) + '';
				var str2 = atob(str.replace(/data:text\/html;base64,/, ''));
				var result = $d_post_content.html().replace(str, str2);
				$d_post_content.parent().append("<p class='base64html'>" + result + "</p>");
			} catch(e) {
				//alert(e);
			}
		}

		//unicode发表
		var fc = true;
		function postByUnicode() {
			if (fc) {
				submitWithUserSign();
				var str = unsafeWindow.rich_postor._editor.getHtml().replace(/<\/?a[^>]*>/gi, "").replace(/&amp;/gi, "&");
				var temps = new Array();
				var i = 0;
				while (/<[^>]*>|&nbsp;|@\S*/.test(str)) {
					temps[i] = /<[^>]*>|&nbsp;|@\S*/.exec(str);
					str = str.replace(temps[i], "㊣");
					i++;
				}
				var out = "";
				for (var i = 0; i < str.length; i++) {
					out += "&#" + str.charCodeAt(i) + ";";
				}
				for (var i = 0; i < temps.length; i++) {
					var temp = temps[i] + "";
					out = out.replace(/&#12963;/, temp);
				}
				unsafeWindow.rich_postor._editor.getHtml = function() {
					return out;
				}
			}
			fc = false;
			unsafeWindow.rich_postor._submit();
		}

		//竖排
		var counter = 1;
		function changeText() {
			var text = $("div.tb-editor-editarea").html();
			if (counter++ & 1 == 1) {
				$("div.tb-editor-editarea").html(getEncryptedText(text));
				$('input#changeText').val("横 排");
			} else {
				$("div.tb-editor-editarea").html(getDecryptedText(text));
				$('input#changeText').val("竖 排");
			}
		}

		//返回竖排文本
		function getEncryptedText(text) {
			text = text.replace(/<br>/gi, "〓").replace(/<[^>]*>/gi, "");
			text = toSBC(text);
			var len = text.length;
			var row = 0;
			if (len == 0) {
				return;
			} else if (len <= 20) {
				row = 2;
			} else if (len > 20 && len < 150) {
				row = 10;
			} else {
				row = Math.ceil(len / 22);
			}
			var column = Math.ceil(len / row);
			var array = splitByLength(text, column);
			var result = "";
			for (var j = 0; j < array[0].length; j++) {
				for (var i = array.length - 1; i >= 0; i--) {
					var str = array[i].charAt(j);
					if (str == "")
						str = "　"
					result += str + "&emsp;";
				}
				result += "<br>"
			}
			return result;
		}

		//返回横排文本
		function getDecryptedText(text) {
			text = text.split(/<br>/gi);
			var result = "";
			var len = text[0].length;
			for (var i = len - 1; i >= 0; i--) {
				for (var j = 0; j < text.length - 1; j++) {
					var tmp = text[j].charAt(i);
					if (tmp != null)
						result += tmp;
				}
			}
			result = result.replace(/〓/gi, "<br>").replace(/\s/gi, "")
			return result;
		}

		//显示悬浮功能按钮
		function displayFixedMenu() {

			var ul = '<ul id="nunavigation"><li class="option"><a id="option" href="#optionDialog"><span>配置</span></a></li>';
			ul += '<li class="photos"><a id="onlyShowImg" href="javascript:void(0);"><span>仅看图片</span></a></li></ul>';
			$(document.body).append(ul);

			var d = 300;
			$('#nunavigation a').each(function() {
				$(this).stop().animate({
					'marginTop' : '-80px'
				}, d += 150);
			});
			$('#nunavigation > li').hover(function() {
				$('a', $(this)).stop().animate({
					'marginTop' : '-2px'
				}, 200);
			}, function() {
				$('a', $(this)).stop().animate({
					'marginTop' : '-80px'
				}, 200);
			});

			$("#onlyShowImg")[0].addEventListener("click", onlyShowImg, false);
		}

		// //IP查询绑定
		// function ipQueryDisplay() {
		// var $users = $(".d_author_anonym");
		// for (var i = 0; i < $users.length; i++) {
		// var $u = $users.eq(i);
		// var ip = $u.text().replace('吧友', '');
		// var url = "javascript:void(0);";
		// $u.html("<a target='_blank' class='ip_query' ip=" + ip.replace('\*', 0) + ">" + ip + "</a>");
		// $u.children()[0].addEventListener("click", IpAddressQuery, false);
		// }
		// }
		// //IP归属地查询
		// function IpAddressQuery() {
		// GM_xmlhttpRequest({
		// method : 'GET',
		// url : 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + $(this).attr('ip'),
		// headers : {
		// 'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
		// 'Accept' : 'application/atom+xml,application/xml,text/xml',
		// },
		// onload : function(responseDetails) {
		// var data = responseDetails.responseText;
		// data = data.substring(20, data.length - 1);
		// var obj = JSON.parse(data);
		// var str = "查询结果:\t" + obj.country + "\t" + obj.province + "\t" + obj.city + "\t" + obj.isp;
		// alert(str);
		// }
		// });
		// }

		//移出黑名单
		function removeFromBlacklist() {
			var username = $(this).attr("name");
			blacklist.deleteElementByValue(username);
			localStorage["xzblacklist"] = JSON.stringify(blacklist);
			window.location.reload();
		}

		//只看图片
		function onlyShowImg() {
			var temp = '';
			for (var i = 0; i < document.images.length; i++) {
				var img = document.images[i];
				if (img.height >= imgSize.imgMinHeight && img.height <= imgSize.imgMaxHeight)
					if (img.width >= imgSize.imgMinWidth && img.width <= imgSize.imgMaxWidth)
						temp += '<img src=' + img.src + '><br>';
			}
			if (temp != '') {
				document.write('<center>' + temp + '</center>');
				void (document.close())
			} else {
				alert("没有满足条件的图片!")
			}
		}

		//字符串切割为数组返回
		function splitByLength(str, len) {
			var length = Math.ceil(str.length / len);
			var array = new Array(length);
			var start = 0;
			for (var i = 0; i < length; i++) {
				array[i] = str.substring(start, start + len);
				start = start + len;
			}
			return array;
		}

		//asic转unicode
		function a2u(str) {
			var result = '';
			for (var i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) < 128) {
					result += str.charAt(i);
				} else {
					result += "&#" + str.charCodeAt(i) + ";";
				}
			}
			return result;
		}

		//半角转全角
		function toSBC(text) {
			var res = "", c;
			for (var i = 0; i < text.length; i++) {
				c = text.charCodeAt(i);
				if (c >= 0x21 && c <= 0x7e)
					res += String.fromCharCode(c + 0xFEE0);
				else if (c == 0x20)
					res += String.fromCharCode(0x3000);
				else
					res += text.charAt(i);
			}
			return res;
		}

		//删除指定
		Array.prototype.deleteElementByValue = function(varElement) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == varElement) {
					this.splice(i, 1);
					break;
				}
			}
		}
		//是否包含
		Array.prototype.contains = function(obj) {
			var i = this.length;
			while (i--)
			if (this[i] === obj)
				return true;
			return false;
		}
		//写入配置
		function setConfig(num, value) {
			config[num] = value;
			localStorage["xzconfig"] = JSON.stringify(config);
		}

		//读取配置
		//|	id	|	value
		//|	0	|	列表屏蔽
		//|	1	|	是否开启自定义签名
		//|	2	|	仅看图片大小
		//|	3	|   黑名单完全屏蔽
		//|	4	|   签名档屏蔽
		//|	5	|	音乐链接标题
		//| 6	|	是否美化
		//| 7	|	是否自动转换base64
		//| 8	|	常用图片
		//| 9   |   是否开启小尾巴
		//| 10  |   是否屏蔽小尾巴
		//| 11  |   是否兼容自动翻页
		//| 12  |   关闭模块信息
		function getConfig(num) {
			return config[num];
		}
	}
}

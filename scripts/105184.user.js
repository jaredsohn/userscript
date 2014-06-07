// ==UserScript==
// @name			校长之怒(最终精简版)
// @version			2.0.1
// @namespace		angerOfPresident
// @include			http://tieba.baidu.com/*
// @include			http://tieba.baidu.com.cn/*
// @author			anran
// @grant       	GM_getValue
// @grant       	GM_setValue
// @grant       	GM_addStyle
// ==/UserScript==

//重置配置,去掉注释即可(去掉行首两个斜杠"//"),注意,重置完成重新注释上
//localStorage.removeItem("xzconfig");
//localStorage.removeItem("xzblacklist");

if (window != window.top)
	return;

main();

//入口
function main() {
	//基础样式
	GM_addStyle('ul#nunavigation {position: absolute;margin: 0px;padding: 0px;top: 0px;left: 10px;list-style: none;z-index: 999999;width: auto;}ul#nunavigation li {width: 103px;display: inline;float: left;}ul#nunavigation li a {display: block;float: left;margin-top: -2px;width: 100px;height: 25px;background-color: #E7F2F9;background-repeat: no-repeat;background-position: 50% 10px;border: 1px solid #BDDCEF;border-radius: 0px 0px 10px 10px;-webkit-border-bottom-right-radius: 10px;-webkit-border-bottom-left-radius: 10px;-khtml-border-bottom-right-radius: 10px;-khtml-border-bottom-left-radius: 10px;text-decoration: none;text-align: center;padding-top: 80px;opacity: 0.7;}ul#nunavigation li a:hover {background-color: #CAE3F2;}ul#nunavigation li a span {letter-spacing: 2px;font-size: 11px;color: #60ACD8;text-shadow: 0 -1px 1px #fff;}ul#nunavigation .photos a {background-image: url(http://imgsrc.baidu.com/forum/pic/item/4d086e061d950a7b044160650ad162d9f2d3c91e.jpg);}ul#nunavigation .option a {background-image: url(http://imgsrc.baidu.com/forum/pic/item/b8014a90f603738d42102283b31bb051f819ec3d.jpg);}.overlay {background: transparent url(http://tympanus.net/Tutorials/CSSOverlay/images/overlay.png) repeat top left;position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;z-index: 999;}.nubox {position: fixed;top: -400px;display:none;left: 25%;right: 28%;background-color: #fff;color: #7F7F7F;padding: 20px;border: 2px solid #ccc;border-radius: 20px;-webkit-border-radius: 20px;-khtml-border-radius: 20px;shadow: 0 1px 5px #333;-webkit-box-shadow: 0 1px 5px #333;z-index: 999;}.nubox h1 {font-size: 24px !important; border-bottom: 1px dashed #7F7F7F;margin: -20px -20px 0px -20px !important;padding: 10px !important;background-color: #FFEFEF;color: #EF7777;border-radius: 20px 20px 0px 0px;-webkit-border-top-left-radius: 20px;-webkit-border-top-right-radius: 20px;-khtml-border-top-left-radius: 20px;-khtml-border-top-right-radius: 20px;}a.boxclose {float: right;width: 26px;height: 26px;background: transparent url(http://imgsrc.baidu.com/forum/pic/item/267f9e2f07082838e11bf2b5b899a9014c08f179.jpg) repeat top left;margin-top: -30px;margin-right: -30px;cursor: pointer;}a.boxok {float: right;width: 32px;height: 32px;background: transparent url(http://imgsrc.baidu.com/forum/pic/item/a50f4bfbfbedab64da576361f736afc379311e6d.jpg) repeat top left;margin-top: -30px;cursor: pointer;}#header .i {opacity: 1 !important;}.recentImgDiv a {border: 3px solid #FFFFFF;float: left;height: 46px;width: 46px;text-align: center;}');
	//读取配置
	var blacklist = [];
	var config = [];
	if (localStorage["xzconfig"])
		config = JSON.parse(localStorage["xzconfig"]);
	if (localStorage["xzblacklist"])
		blacklist = JSON.parse(localStorage["xzblacklist"]);
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
	
	GM_addStyle('body {fod_sign_splitnt-family:Microsoft YaHei !important;}a, a> font {text-decoration:none !important;color:rgb(28, 64, 120) !important;}a:visited {color:rgb(130, 130, 130) !important;}');

	$ = unsafeWindow.$;
	var sbId;
	setTimeout(function() {
		if(unsafeWindow.rich_postor)
		sbId = unsafeWindow.rich_postor._dom_id.add_post_submit.replace('aps', '');
		if ($("#thread_list").length > 0) {
			init2();
		} else if($("#j_p_postlist").length > 0){
			init1();
		} else if($("#feed").length > 0){
			init3();
		} 
	}, 0);
	//帖子页面初始化
	function init1() {
		displayUserArea();
		displayFixedMenu();
		displayOptionDialog();
		displayPostArea();
	}

	//列表页面初始化
	function init2() {
		displayFixedMenu();
		displayOptionDialog();
		displayThreadList();
		displayPostArea();
	}
	//i贴吧页面
	function init3(){
		displayFixedMenu();
		displayOptionDialog();
		blockUserInItieba();
	}
	
	//用户区各种显示
	function displayUserArea() {
		var $users = $("a.p_author_name");
		var $tbodys = $users.parent().parent().parent().parent();
		for (var i = 0; i < $users.length; i++) {
			displayUserArea2(i, $users, $tbodys);
		}

		document.addEventListener('DOMNodeInserted', function(event) {
			var $users = $(event.target).find('a.p_author_name');
			var $tbodys = $users.parent().parent().parent().parent();
			var $reply = $(event.target).find('a.lzl_link_unfold');
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

		var a2 = '<br><a href="javascript:void(0);" class="blockUser" name="' + username + '">屏蔽此人</a>';

		$user.parent().append(a2);
		$user.parent().find("a.blockUser")[0].addEventListener('click', addToBlacklist, false);
		blockUser($tbody, username);
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

	
	//在i贴吧使用黑名单
	function blockUserInItieba(){
		$('.replyme_user,.atme_user').each(function(i){
			var username = this.children[0].innerHTML.replace('：','');
			for (var j = 0; j < blacklist.length; j++) {
				if (username == blacklist[j])
					$(this).parent().parent().parent().remove();
			}
		});
	}
	
	//楼中楼
	function displayUserArea3($this) {
		var username = $this.find('.at').attr('username');

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

	//配置窗口初始化
	function displayOptionDialog() {
		var div = '<div class="overlay" id="overlay" style="display:none;"></div>';
		div += '<div class="nubox" id="box"><a class="boxclose" id="boxclose"></a><h1>Option<br></h1><br>';

		var st1 = "<li><input type='checkbox' id='st1'/>&nbsp;屏蔽黑名单用户主题&emsp;</li>";
		st1 += "<li><input type='checkbox' id='st1_2'/>&nbsp;不显示被屏蔽用户楼层提示&emsp;</li>";
		div += st1;

		var st2 = "<li>仅看图片大小：&emsp;&nbsp;";
		st2 += "<input type='text' style='width:50px;' id='st2_1'/>";
		st2 += " < 宽  < <input type='textField' style='width:50px;' id='st2_2'/>";
		st2 += "&emsp;且 &emsp;<input type='text' style='width:50px;' id='st2_3'/>";
		st2 += " < 高  < <input type='textField' style='width:50px;' id='st2_4'/></li>";
		div += st2;

		var st3 = "<li>黑名单 (逗号分隔多个用户)<textarea rows=3 style='resize: none;width:100%' id='st3'/> </li>";
		div += st3;

		var st8 = "<li>最近使用的表情 (换行分隔多个表情)<textarea rows=7 style='resize: none;width:100%' id='st8'/> </li>";
		div += st8;
		div += '<br><br><a class="boxok" id="boxok"></a></div>';
		$(document.body).append(div);

		$('#boxok')[0].addEventListener("click", saveConfig, false);
		$('#option').click(function() {
			flushConfig();
			$('#overlay').fadeIn('fast', function() {
				$('#box').animate({
					'top' : '140px'
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
			var st8 = "";
			for (var i = 0; i < recentImg.length; i++)
				st8 += recentImg[i] + "\n";
			$("#st8").val(st8);
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


		//最近使用的表情
		{
			var temp = $("#st8").val().split('\n');
			var st8 = [];
			for (var i = 0; i < temp.length && i < 18; i++) {
				if (temp[i].length > 0 && !st8.contains(temp[i]))
					st8.push(temp[i]);
			}
			setConfig(8, st8);
		}


		window.location.reload();
	}

	//列表相关显示
	function displayThreadList() {

		$ThreadList = $("li.j_thread_list");
		var temp = new Object();
		
		for (var i = 0; i < $ThreadList.length; i++) {
		//列表页黑名单屏蔽
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
	
		var str = "";
		for (var user in temp)
		str += user + " (" + temp[user] + ")  ";
		if (str != "")
			$("div.th_footer_l").append(' , 屏蔽信息 : <span class="red">' + str + '</span>');
	}

	//各种按钮
	function displayPostArea() {
		//最近表情面板
		var div = '<div class="recentImgDiv" style="display:none"><div class="tb-editor-overlay" style="display: block; left: 43%; top: 35px; width: 315px; height: 220px;"><span class="arrow" style="left: 13px;"></span><div class="overlay-content"><br><h3 align="middle">最近使用的表情</h3><hr><div></div></div></div>';
		$('.tb-editor-wrapper').append(div);

		if ($('span.smiley')[0]){
			$('span.smiley')[0].addEventListener("click", recentImgDivDisplayNone, false);
			$('span.smiley')[0].addEventListener("mouseover", recentImgDivDisplay, false);
			$('span.smiley')[0].addEventListener("mouseout", recentImgDivDisplayNone, false);
		}
		if ($('div.recentImgDiv')[0]) {
			$('div.recentImgDiv')[0].addEventListener("mouseover", recentImgDivDisplay, false);
			$('div.recentImgDiv')[0].addEventListener("mouseout", recentImgDivDisplayNone, false);
		}
		
		//事件监听
		$('#aps' + sbId)[0].addEventListener("click", recentImgSave, true);
		window.addEventListener("keydown", function(event) {
			if (event.ctrlKey && event.keyCode == 13 && event.target.className == 'tb-editor-editarea edit_field_focus') {
				recentImgSave();
			}
		}, true);
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

		var end = temp.length < 18 ? temp.length : 18;
		recentImg = temp.slice(0, end);
		setConfig(8, recentImg);
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

		var $p = $("a[name=" + username + "]").parent().parent().parent().parent();

		for (var i = 0; i < $p.length; i++) {
			blockUser($p.eq(i), username);
		}
		$('div.p_postlist').find('.lzl_cnt').each(function(i) {
			displayUserArea3($(this));
		});

		$(this).parent().parent().css("display", "none");
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
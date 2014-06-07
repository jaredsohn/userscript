// ==UserScript==
// @name        校长之怒(经典版)
// @namespace   AoP_Classical
// @include     http://tieba.baidu.com/*
// @include     http://tieba.baidu.com.cn/*
// @version     0.3.6
// @author      MicroAleX
// @date        2013/08/24
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// ==/UserScript==
//读取配置
var config = new Array();
var usersign = new Array();
if (GM_getValue('config'))
	config = JSON.parse(GM_getValue('config'));
if (GM_getValue('usersign'))
	usersign = JSON.parse(GM_getValue('usersign'));
var imgSize = getConfig(1);
var recentImg = getConfig(2);
var CustomTailOfThread = "————本人正在使用经典版贴吧，楼中楼一律不看不回";
//初始化只看图片大小
if (imgSize == null) {
	imgSize = new Object();
	imgSize.imgMinWidth = 500;
	imgSize.imgMaxWidth = 999;
	imgSize.imgMinHeight = 300;
	imgSize.imgMaxHeight = 999;
}
//初始化自定义签名
if (usersign.length == 0) {
	usersign[0] = new Object();
	usersign[0].name = '楼中楼';
	usersign[0].imgUrl = 'http://hiphotos.baidu.com/microalex/pic/item/45565f54564e92589c7e39409c82d158cdbf4e4f.jpg';
}
//初始化最近使用表情
if (recentImg == undefined) {
	recentImg = new Array();
	recentImg.push('http://game.ali213.net/static/image/smiley/wei/0000.jpg');
	recentImg.push('http://game.ali213.net/static/image/smiley/wei/2.gif');
	recentImg.push('http://game.ali213.net/static/image/smiley/wei/26.gif');
	recentImg.push('http://game.ali213.net/static/image/smiley/wei/8.gif');
	recentImg.push('http://imgsrc.baidu.com/forum/pic/item/14ce36d3d539b60080ba9b1ee950352ac65cb727.jpg');
	recentImg.push('http://imgsrc.baidu.com/forum/pic/item/30adcbef76094b3678e78f44a3cc7cd98d109d26.jpg');
	recentImg.push('http://imgsrc.baidu.com/forum/pic/item/0824ab18972bd40775c447547b899e510fb30913.jpg');
}

GM_addStyle('ul#nunavigation {position: absolute;margin: 0px;padding: 0px;top: 0px;left: 10px;list-style: none;z-index: 999999;width: auto;}ul#nunavigation li {width: 103px;display: inline;float: left;}ul#nunavigation li a {display: block;float: left;margin-top: -2px;width: 100px;height: 25px;background-color: #E7F2F9;background-repeat: no-repeat;background-position: 50% 10px;border: 1px solid #BDDCEF;border-radius: 0px 0px 10px 10px;-webkit-border-bottom-right-radius: 10px;-webkit-border-bottom-left-radius: 10px;-khtml-border-bottom-right-radius: 10px;-khtml-border-bottom-left-radius: 10px;text-decoration: none;text-align: center;padding-top: 80px;opacity: 0.7;}ul#nunavigation li a:hover {background-color: #CAE3F2;}ul#nunavigation li a span {letter-spacing: 2px;font-size: 11px;color: #60ACD8;text-shadow: 0 -1px 1px #fff;}ul#nunavigation .photos a {background-image: url(http://imgsrc.baidu.com/forum/pic/item/4d086e061d950a7b044160650ad162d9f2d3c91e.jpg);}ul#nunavigation .option a {background-image: url(http://imgsrc.baidu.com/forum/pic/item/b8014a90f603738d42102283b31bb051f819ec3d.jpg);}.overlay {background: transparent url(http://tympanus.net/Tutorials/CSSOverlay/images/overlay.png) repeat top left;position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;z-index: 999;}.nubox {position: fixed;top: -400px;display:none;left: 25%;right: 28%;background-color: #fff;color: #7F7F7F;padding: 20px;border: 2px solid #ccc;border-radius: 20px;-webkit-border-radius: 20px;-khtml-border-radius: 20px;shadow: 0 1px 5px #333;-webkit-box-shadow: 0 1px 5px #333;z-index: 999;}.nubox h1 {border-bottom: 1px dashed #7F7F7F;margin: -20px -20px 0px -20px !important;padding: 10px !important;background-color: #FFEFEF;color: #EF7777;border-radius: 20px 20px 0px 0px;-webkit-border-top-left-radius: 20px;-webkit-border-top-right-radius: 20px;-khtml-border-top-left-radius: 20px;-khtml-border-top-right-radius: 20px;}a.boxclose {float: right;width: 26px;height: 26px;background: transparent url(http://imgsrc.baidu.com/forum/pic/item/267f9e2f07082838e11bf2b5b899a9014c08f179.jpg) repeat top left;margin-top: -30px;margin-right: -30px;cursor: pointer;}a.boxok {float: right;width: 32px;height: 32px;background: transparent url(http://imgsrc.baidu.com/forum/pic/item/a50f4bfbfbedab64da576361f736afc379311e6d.jpg) repeat top left;margin-top: -30px;cursor: pointer;}#header .i {opacity: 1 !important;}.subbtn_bg {float: none !important;}.subTip {float: none !important;}#postByUnicode, #convertLinks, #ConverToBase64 {width: 105px !important;background: url("http://imgsrc.baidu.com/forum/pic/item/3bf33a87e950352aaa7de3b15343fbf2b2118b6f.jpg") no-repeat scroll 0 0 transparent !important;}.base64html,.base64text {font-size:14px !important;}.recentImgDiv a {border: 3px solid #FFFFFF;float: left;height: 46px;width: 46px;text-align: center;}span.wapapp_adv{display: none;}');
var line = 'http://hiphotos.baidu.com/xuezhiling/pic/item/3f320df41bd5ad6ed82eb34981cb39dbb7fd3c63.jpg';
var zhikanUrl = "http://tianyatool.com/cgi-bin/baidu/baidu-lz.pl?url=" + window.location.href.replace(/\?.*/, "");
var split = '<br>———————————————————————————<br>';
main();
function fidin(a,_fid){var a=a||"";return("-"+a+"-").indexOf("-"+_fid+"-")>-1}
function delfid(a,_fid){var a=a||"";return a.replace(new RegExp("\\b("+_fid+")+\\b\\-?|\\-?\\b("+this._fid+")+\\b","g"),"")}
function addfid(c,_fid){var c=c||"";var b=10;if(fidin(c,_fid)){return c}if(c!=""){var a=c.split("-")}else{var a=[]}a.push(_fid);if(a.length>b){a.shift()}return a.join("-")}
function main() {

	if (window != window.top || window.document.title == "")
		return;

	//JQuery支持

	var JQueryDiv = document.createElement("div");
	JQueryDiv.setAttribute("onclick", "return $;");
	$ = JQueryDiv.onclick();
	var W = unsafeWindow;
	var sbId;
	var counter = 1;

	//自动转旧版
	if (!W.PageData.thread && W.PageData.forum.forum_id && !fidin(W.$.cookie("TB_OFRS"),W.PageData.forum.forum_id) && W.PageData.forum.forum_id)
	{
		var a=$.cookie("TB_OFRS")||"";
		$.cookie("TB_OFRS",addfid(a,W.PageData.forum.forum_id),{expires:365,path:"/"})
		setTimeout(function(){window.location.reload()},30);
	}


	//新版贴吧不执行本脚本
	if (!W.PageData.thread && W.PageData.forum.forum_id && !fidin(W.$.cookie("TB_OFRS"),W.PageData.forum.forum_id))
	{
		GM_addStyle('div.region_3{display: none;}'+
'div.zyq_2{display: none;}'+
'div.aside_album_good{display: none;}'+
'ul.threadlist_media{display: none;}'+
'div.threadlist_abs{display: none;}'+
'li.j_thread_list{padding-top: 1px; padding-bottom: 1px;}'+
'.tb_icon_author{margin: 0px 0px 0px 0px; height: 20px;}'+
'.threadlist_author{margin: 0px 0px 0px 0px; height: 20px;}'+
'.threadlist_reply_date{margin: 0px 0px 0px 0px; height: 20px;}'+
'div.threadlist_detail{display: none;}'+
'')
		return;
	}

	setTimeout(function() {
		sbId = W.rich_postor._dom_id.add_post_submit.replace('aps', '');
		if ($("td.thread_title").length > 0 || $("div.th_w2").length > 0) {
			init2();
		} else {
			init1();
		}
	}, 1);
	//帖子页面初始化
	function init1() {
		displayUserArea();
		displayFixedMenu();
		displayOptionDialog();
		displayPostArea();
		displayUserSignArea();
	}

	//列表页面初始化
	function init2() {
		displayAdvSearchLink();
		displayFixedMenu();
		displayOptionDialog();
		displayPostArea();
		displayUserSignArea();
	}

	//用户区各种显示
	function displayUserArea() {
		var $users = $("a.p_author_name");
		var $tbodys = $users.parent().parent().parent().parent().parent().parent().parent();

		for (var i = 0; i < $users.length; i++) {
			displayUserArea2(i, $users, $tbodys);
		}
		//兼容ajax翻页
		document.addEventListener('DOMNodeInserted', function(event) {
			var $users = $(event.target).find('a.p_author_name');
			var $tbodys = $users.parent().parent().parent().parent().parent();
			var $reply = $(event.target).find('a.lzl_link_unfold');
			$(event.target).find('div.l_post').each(function(i) {
				displayUserArea2(i, $users, $tbodys);
			});
		}, true);
		var tbls=document.getElementsByTagName('table');
		for (var i=0; i<tbls.length; i++)
		{
			if(tbls[i].parentNode.id == "container" && tbls[i].id == "" && tbls[i].className == "")
			{
				tbls[i].parentNode.removeChild(tbls[i]);
			}
		}
	}

	//楼层相关
	function displayUserArea2(i, $users, $tbodys) {
		var $user = $users.eq(i);
		var $tbody = $tbodys.eq(i);
		var content = $tbody.find('.c_post_content').html();
		var louceng = $tbody.find('.c_floor').html()+'楼';

		var $target = $tbody.find('ul.p_mtail');
		var username = $user.text();

		var ul = '';
		var a1 = '<a href="' + zhikanUrl + '&unm=' + encodeURI(username) + '">只看此人</a>';
		ul += '<li>' + a1 + '</li>';
		$user.append(ul);
		addReplyHref(username, louceng, content, $target);
	}

	function addReplyHref(username, louceng, content, $target) {
		var a = document.createElement('a');
		var regSplit = /<br>(-{30,100}|—{20,50})<br>/i;
		a.href = '#sub';
		a.innerHTML = '引用';
		a.addEventListener('click', function() {
			if (( i = content.search(regSplit)) != -1) {
				content = content.substr(i, content.length - 1);
			}
			content = content.replace(/^引用[^——————————————————————]*/gi, '').replace(split, '').replace(regSplit, '').replace(/\s*/gi, '').replace(/<br>/gi, "〓").replace(/<img[^>]*>/gi, '㊣').replace(/<[^>]*>/gi, '').substr(0, 100).replace(/㊣/gi, '[图片]').replace(/〓+/gi, "<br>").replace(/(<br>)+$/gi, "");
			if (content.length >= 100)
				content += '……';
			var temp = '引用 @' + username + ' (' + louceng + ')<br>' + content + split;
			$("div.tb-editor-editarea").html(temp + $("div.tb-editor-editarea").html());
		}, false);
		$target.prepend('｜');
		$target.prepend(a);
	}

	//显示悬浮功能菜单
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

	//显示高级搜索链接
	function displayAdvSearchLink() {
		var TbName=unsafeWindow.PageData.forum.name_url;
		if (TbName) {
			$('.s_tools span').parent().prepend('<a href="/f/search/adv?kw='+TbName+'">高级搜索</a>|');
		} else {
			$('.s_tools span').parent().prepend('<a href="/f/search/adv">高级搜索</a>|');
		}
	}

	//配置窗口设置
	function displayOptionDialog() {
		var div = '<div class="overlay" id="overlay" style="display:none;"></div>';
		div += '<div class="nubox" id="box"><a class="boxclose" id="boxclose"></a><h1>Option<br></h1><br>';

		var st2 = "<li>仅看图片大小：&emsp;&emsp;&nbsp;";
		st2 += "<input type='text' style='width:50px;' id='st2_1'/>";
		st2 += " < 宽  < <input type='textField' style='width:50px;' id='st2_2'/>";
		st2 += "&emsp;且 &emsp;<input type='text' style='width:50px;' id='st2_3'/>";
		st2 += " < 高  < <input type='textField' style='width:50px;' id='st2_4'/></li>";
		div += st2;

		var st4 = "<li>签名档 (换行分隔)： <textarea rows=2 style='resize: none;width:100%' id='st4'/> </li>";
		div += st4;

		var st8 = "<li>最近使用的表情 (换行分隔)：  <textarea rows=2 style='resize: none;width:100%' id='st8'/> </li>";
		div += st8;

		div += '<br><br><a class="boxok" id="boxok"></a></div>';
		$(document.body).append(div);

		$('#boxok')[0].addEventListener("click", saveConfig, false);
		$('#option').click(function() {
			flushConfig();
			$('#overlay').fadeIn('fast', function() {
				$('#box').animate({
					'top' : '60px'
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
		var st1 = getConfig(0);
		if (st1 == null || st1 != 0) {
			$("#st1").attr("checked", true);
		} else {
			$("#st1").attr("checked", false);
		}

		var st4 = "";
		for (var i = 0; i < usersign.length; i++)
			st4 += usersign[i].name + ":" + usersign[i].imgUrl + "\n";

		var st8 = "";
		for (var i = 0; i < recentImg.length; i++) {
			st8 += recentImg[i] + "\n";
		}

		$("#st2_1").val(imgSize.imgMinWidth);
		$("#st2_2").val(imgSize.imgMaxWidth);
		$("#st2_3").val(imgSize.imgMinHeight);
		$("#st2_4").val(imgSize.imgMaxHeight);
		$("#st4").val(st4);
		$("#st8").val(st8);
	}

	//存储配置信息
	function saveConfig() {
		//仅看图片
		{
			imgSize.imgMinWidth = $("#st2_1").val();
			imgSize.imgMaxWidth = $("#st2_2").val();
			imgSize.imgMinHeight = $("#st2_3").val();
			imgSize.imgMaxHeight = $("#st2_4").val();
			setConfig(1, imgSize);
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
				GM_setValue("usersign", JSON.stringify(b));
			} else {
				GM_setValue("usersign", JSON.stringify(new Array()));
			}
		}
		//最近使用的表情
		{
			var temp = $("#st8").val().split('\n');
			var st8 = [];
			for (var i = 0; i < temp.length && i < 10; i++) {
				if (temp[i].length > 0 && !st8.contains(temp[i]))
					st8.push(temp[i]);
			}
			setConfig(2, st8);
		}
		window.location.reload();
	}

	//各种按钮
	function displayPostArea() {

		//添加各种按钮
		var button = '&nbsp;<input type="button" value="unicode发表" class="subbtn_bg" id="postByUnicode">';
		button += '&nbsp;<input type="button" value="和谐测试" class="subbtn_bg" id="hexieTest">';

		$('#aps' + sbId).after(button);

		//最近表情面板
		var div = '<div class="recentImgDiv" style="display:none"><div class="tb-editor-overlay" style="display: block; left: 43%; top: 25px; width: 260px; height: 160px;"><span class="arrow" style="left: 13px;"></span><div class="overlay-content"><br><h3 align="middle">最近使用的表情</h3><hr><div></div></div></div>';
		$('.tb-editor-wrapper').append(div);

		$('#postByUnicode')[0].addEventListener("click", postByUnicode, true);
		$('#hexieTest')[0].addEventListener("click", hexieTest, false);

		$('span.smiley')[0].addEventListener("click", recentImgDivDisplayNone, false);
		$('span.smiley')[0].addEventListener("mouseover", recentImgDivDisplay, false);
		$('span.smiley')[0].addEventListener("mouseout", recentImgDivDisplayNone, false);
		$('div.recentImgDiv')[0].addEventListener("mouseover", recentImgDivDisplay, false);
		$('div.recentImgDiv')[0].addEventListener("mouseout", recentImgDivDisplayNone, false);
	}

	//显示最近使用的表情
	function recentImgDivDisplay() {
		if ($('.recentImgDiv .overlay-content img').length == 0) {
			var div = $('.recentImgDiv .overlay-content');
			var scope = W.rich_postor._editor._events.paste[0].scope;
			for (var i = 0; i < recentImg.length; i++) {
				var a = document.createElement('a');
				a.addEventListener('click', function() {
					var src = scope.createImageTagFromUrl(this.childNodes[0].src);
					W.rich_postor._editor.execCommand("inserthtml", src);
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
		$(W.rich_postor._editor.editArea).find('img').each(function(index) {
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
		setConfig(2, recentImg);
	}

	//和谐测试
	function hexieTest() {
		GM_xmlhttpRequest({
			method : 'POST',
			url : 'http://xiaohexie.com/~xiaohexi/ff_test.php',
			data : "co=" + W.rich_postor._editor.editArea.innerHTML.replace(/&nbsp;/gi, ' '),
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			onload : function(data) {
				var temp = data.responseText.replace(/\s/gi, '&nbsp;').replace(/丄/gi, '龘');
				W.rich_postor._editor.editArea.innerHTML = temp;
			}
		});
	}

	//自定义签名
	function displayUserSignArea() {

		var div = '<tr>';
		var names = "";
		for (var i = 0; i < usersign.length; i++)
			names += "<option oid = " + (i + 1) + ">" + usersign[i].name + "</option>";
		div += "<td></td><td>是否使用自定义签名档<input type='checkbox' id='doUserSign'/><select id='UserSignImg'>";
		div += "<option oid = 0>随机签名</option>"
		div += names + "</select></td></tr>";
		$("#pu" + sbId).parent().append(div);

		var $doUserSign = $("input#doUserSign");
		var $UserSignImg = $("select#UserSignImg");
		var config1 = getConfig(0);
		if (config1 != -1) {
			$doUserSign.attr("checked", true);
			$UserSignImg.find("option").eq(config1).attr("selected", true);
		}

		//签名档BUG暂用预读解决
		$(document.body).append('<img style="display:none" src="' + line + '">');
		for (var i = 0; i < usersign.length; i++) {
			var temp = '<img style="display:none" src="' + usersign[i].imgUrl + '">';
			$(document.body).append(temp);
		}

		unsafeWindow.rich_postor._submit2 = unsafeWindow.rich_postor._submit;
		unsafeWindow.rich_postor._submit = function() {
			setTimeout(function() {
				unsafeWindow.rich_postor._submit2()
			}, 1);
		}
		$('#aps' + sbId)[0].addEventListener("click", recentImgSave, true);
		$('#aps' + sbId)[0].addEventListener("click", submitWithUserSign, true);
		window.addEventListener("keydown", function(event) {
			if (event.ctrlKey && event.keyCode == 13) {
				recentImgSave();
				submitWithUserSign();
			}
		}, true);

		$doUserSign[0].addEventListener("click", saveUserSignInfo, false);
		$UserSignImg[0].addEventListener("click", saveUserSignInfo, false);
	}

	//添加签名,发帖
	function submitWithUserSign() {
		if (W.rich_postor._editor.editArea.innerHTML.substr(W.rich_postor._editor.editArea.innerHTML.length-CustomTailOfThread.length) != CustomTailOfThread)
		{
			W.rich_postor._editor.editArea.innerHTML = W.rich_postor._editor.editArea.innerHTML.replace(/(<br>)+$/i, "");
			W.rich_postor._editor.editArea.innerHTML += "<br><br>" + CustomTailOfThread;
		}
		if (!$("input#doUserSign")[0].checked)
			return;
		var optionIndex = parseInt($("select#UserSignImg").find("option:selected").attr("oid"));
		if (optionIndex == 0) {
			var len = $("select#UserSignImg").find("option").length - 1;
			optionIndex = Math.floor(Math.random() * len + 1);
		}
		var scope = W.rich_postor._editor._events.paste[0].scope;
		var img = scope.createImageTagFromUrl(line);
		var img2 = scope.createImageTagFromUrl(usersign[optionIndex - 1].imgUrl);
		//W.rich_postor._editor.execCommand("inserthtml", img);
		W.rich_postor._editor.editArea.innerHTML += "<br>" + img + "<br>" + img2;
	}

	//自定义签名状态记忆
	function saveUserSignInfo() {
		if (!$('input#doUserSign')[0].checked) {
			setConfig(0, -1);
			return;
		}
		var optionIndex = $("select#UserSignImg").find("option:selected").attr("oid");
		setConfig(0, Number(optionIndex));
	}

	//unicode发表
	function postByUnicode() {
		submitWithUserSign();
		var str = W.rich_postor._editor.getHtml();
		str = str.replace(/<\/?a[^>]*>/gi, "");
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
		W.rich_postor._editor.getHtml = function() {
			return out;
		}
		W.rich_postor._submit();
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
			W.alert("没有满足条件的图片!")
		}
	}

}

//写入配置
function setConfig(num, value) {
	config[num] = value;
	GM_setValue("config", JSON.stringify(config));
}

//读取配置
//|	id	|	value
//|	0	|	是否开启自定义签名
//|	1	|	自定义签名详细
//| 2	|	常用图片
function getConfig(num) {
	return config[num];
}
// ==UserScript==
// @name        pic.lg.ua
// @namespace   http://userscripts.org/scripts/show/182307
// @description 整理pic.lg.ua的上传完成页连接，添加批量获取外链连接，汉化部分网页内容
// @include     http://pic.lg.ua/*
// @grant       none
// @updateURL   https://userscripts.org/scripts/source/182307.meta.js
// @downloadURL https://userscripts.org/scripts/source/182307.user.js
// @version     4
// ==/UserScript==
dq = function(a){
return document.querySelector(a);
}
var path = location.pathname;
var a = path.match('/l/g/')||path.match(/\/l\/(?=\w{5,})/)||path.match('/upload-remote/')||"";
switch(a.toString()){
	case '/l/g/':
	$('#links_group_block').before('<textarea type="text" onclick="this.select()" value="" readonly="readonly" class="span-19" id="links" style="height:130px;margin-bottom:-50px"></textarea>')
	$('#image_menu').append('<li><label onclick="showlink(\'bbs\');">论坛外链</label></li><li><label onclick="showlink(\'html\');">网页外链</label></li>')
	$('input[id^="html"]').each(function(){
		this.value = this.value.match(/<img src=".*?>/)[0].replace("/md_","/");
	})
	$('input[id^="bbcode"]').each(function(){
		this.value = this.value.match(/\[img\].*?\[\/img\]/)[0].replace("/md_","/");
	})
	$('label[for^="html"]').html("网页外链");
	$('label[for^="bbcode"]').html("论坛外链");
	$('label[for^="show"]').html("相册");
	$('label[for^="original"]').html("原图");
	dq('#image_menu li:nth-child(5) a').innerHTML = "幻灯片连接";
	dq('#image_menu li:nth-child(5) a').target = "_blank";
	window.showlink = function(t){
		var links = "";
		switch(t){
			case 'bbs':
				$('input[id^="original"]').each(function(){
				links += "[img]"+$(this).val()+"[/img]\n";
				})
			break;
			case 'html':
				$('input[id^="original"]').each(function(){
					links += '<img src="'+$(this).val()+'" />\n';
				})
			break;
		}
		document.querySelector('#links').innerHTML = links;
		document.querySelector('#links').select();
	}
	showlink('bbs');
	break;
	case '/l/':
	dq('#bbcode').value = ('[IMG]' + dq('#original').value + '[/IMG]')
	dq('#html').value = ('<img src="' + dq('#original').value + '">')
	dq('label[for="html"]').innerHTML = "网页外链";
	dq('label[for="bbcode"]').innerHTML = "论坛外链";
	dq('label[for="show"]').innerHTML = "相册";
	dq('label[for="original"]').innerHTML = "原图";
	break;
	case '/upload-remote/':
	location.href = eval('('+document.body.innerHTML+')').url;
	break;
	default:
	dq('h3').innerHTML = "上传您的图片，永久保存在服务器上";
	dq('input[type="submit"]').value = "开始上传";
	dq('#advanced_link').innerHTML = "高级";
	dq('label[for="reduce_original"]').innerHTML = "缩小图片";
	dq('#input_label_desc').innerHTML = "像素";
}
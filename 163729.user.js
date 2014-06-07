// ==UserScript==
// @name        穷人版贴吧小尾巴
// @namespace   http://userscripts.org/users/508758
// @description 我的贴吧小尾巴
// @include     http://tieba.baidu.com/p/*
// @include	http://tieba.baidu.com/f*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @version     1.0
// ==/UserScript==
// first created on Mar 26, 2013
// finished on Apr 1, 2013  This is all fools' day 
// GM_deleteValue("my_def"); // 自定义的尾巴内容
// GM_deleteValue("my_sel")   // option的默认选项


////////////////////////////////用户界面////////////////////////////////
var newObj = '<input id="wBtn" class="subbtn_bg" value=" Tail ">';
$('.subbtn_bg').eq(0).after(newObj);
$('#wBtn').css("float", "left");
$('#wBtn').css("margin-left", "4px");

var text = '<strong>尾巴内容</strong>\
			<select id = "choose">\
				<option id = "op1"> 时间 </option>\
				<option id = "op2"> 浏览器 </option>\
				<option id = "op3"> 自定义 </option>\
			</select>\
			<input id="aBtn" type= "button" value="输入自定义" style = "width:80px" >\
			<textarea id = "wTxt" ></textarea>';

$('.subbtn_bg').eq(1).after(text);
$('#wTxt').css("float", "right");
$('#wTxt').hide();

if (GM_getValue("my_sel")) {
	var my_sel = GM_getValue("my_sel");
	$('#' + my_sel).attr('selected', 'selected');
	}
////////////////////////////////用户界面////////////////////////////////


$('#aBtn').click(function() {
	$('#wTxt').slideToggle('fast');
	if($('#aBtn').val() === '输入自定义') {
		$('#wTxt').val(GM_getValue("my_def", "请输入自定义内容"));
		$('#aBtn').val('点击保存');
		$('#wTxt').select();
		}
	else {
		$('#aBtn').val('输入自定义');
		GM_setValue("my_def", $('#wTxt').val());
		}
	});

$('#wBtn').click(function() {
	var textArea = $('.tb-editor-editarea').eq(0).html();
	textArea += '<br/>' + '<br/>' + '<br/>' + '<br/>' + '<br/>' + '<br/>' + fun();
	$('.tb-editor-editarea').eq(0).html(textArea);
	$('.subbtn_bg').eq(0).click();
	});

function fun() {
	var val = $('#choose').val();
	if(val === '时间') {
		GM_setValue("my_sel", "op1");
		return calTime();
		}
	else if (val === '浏览器') {
		GM_setValue("my_sel", "op2");
		return calNavi();
		}
	else if (val === '自定义') {
		GM_setValue("my_sel", "op3");
		return myDef();
		}
	}


// 返回时间的字符串
function calTime() {
	var week = ['日', '一', '二', '三', '四', '五', '六'];
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;	// 真实的月份要加1
	var date = now.getDate();
	var day = week[now.getDay()];	// 0~6 0表示星期日 6表示星期六
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var the_time_of_now = "";
	the_time_of_now +=  '　　　　——————————现在是当地时间' + year + '年' + month + '月' + date + '日' + '星期' + day  + hour + '点' + minute + '分' + second + '秒';
	return the_time_of_now;
	}
	
// 返回浏览器信息的字符串
function calNavi() {
	return '　　　　——————————这条消息来自' + navigator.userAgent;
	}

// 返回自定义字符串
function myDef() {
	return '　　　　——————————' + GM_getValue("my_def", "默认自定义");
	}

////////////////////////////////// End of the js //////////////////////////////

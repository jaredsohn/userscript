// ==UserScript==
// @name       lexun
// @namespace  http://use.i.E.your.homepage/
// @version    0.2.4
// @description  乐讯乐圈自动回帖机~
// @updateURL          http://userscripts.org/scripts/source/401191.meta.js
// @downloadURL      http://userscripts.org/scripts/source/401191.user.js
// @require     http://caomei.vicp.co/mail/jquery-1.11.0.js
// @include     *://*f*.lexun.com*
// @copyright  2014+, hatn
// @run-at                  document-start
// @grant                   GM_xmlhttpRequest
// ==/UserScript==

/* html视图 */

//<input name="" placeholder="" /><br />
var fbox = $('<div id="js_tool" status="0"></div>');
var html = '<div id="pbox"><p>定时回贴</p>';
html += '<form id="parse">';
html += '<table id="pinit">';
html += '<tr><td>身份lxt：</td><td><input id="xid" placeholder="乐讯身份识别码" /></td></tr>';
html += '<tr><td>帖子id：</td><td><input id="tid" placeholder="帖子ID" ></td></tr>';
html += '<tr><td>间隔时间：</td><td><input id="rtime" placeholder="间隔时间/分" /></td></tr>';
html += '<tr><td>执行次数：</td><td><input id="rnums" placeholder="循环次数" /></td></tr>';
html += '<tr><td>回复内容：</td><td><textarea id="cont" placeholder="多个用‘|’分隔" title="多个内容则循环调用"></textarea></td></tr>';
html += '</table>';// pinit
html += '<div id="btns">';
html += '<input type="button" id="save_parse" value="保存参数" />';
html += '<input type="button" id="start" value="马上回帖" />';
html += '<input type="button" id="start_d" value="定时回帖" />';
html += '</div>';// btns
html += '<div id="count_d">';
html += '<div id="count_txt"></div>';
html += '<div id="t_btn">';
html += '<input id="t_stop" value="暂停" type="button" />';
html += '<input id="t_cancle" value="取消" type="button" />';
html += '</div>';// t_btn
html += '</div>';// count_d
html += '</form>';
html += '<div id="show_log"></div>';
html += '</div>';// pbox
html += '<div id="lbox">显示</div>';
fbox.html(html);
$('body:eq(0)').prepend(fbox);

/* 初始化 */

init();// 旧的参数
var cookie_option = {expires: 990, path: "/", domain: ".lexun.com"};// cookie 作用域
var ritme, xid, tid, cont, timer, timer_, time_m, time_s, fcont, rnums, turn, foo, show_log;// 全局变量

/* 定义css */

$('#js_tool table').css({"border-collapse": "collapse", "border-spacing": "0", "margin": "0px", "padding": "0px"});
$('#js_tool').css('cssText', 'line-height: 12px; margin: 0; padding: 0; color: #696A52; font-size: 12px; position: fixed; top: 100px; left: -200px; text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8),0px 1px 1px rgba(255, 255, 255, 0.8);');
$('#lbox').css('cssText', 'float: left; width: 16px; height: 121px; background-color: #78bd3a; border-radius: 0 8px 8px 0; cursor: pointer; padding: 94px 0 0 4px;');
$('#pinit td').css({"text-align": "right"});
$('#pinit input, #pinit textarea').css('cssText', 'line-height: 12px; margin: 0 0 1px 0; font-size: 12px; width: 100px; outline: none; border: 1px solid #ccc; border-radius: 3px;');
$('#btns input, #t_btn input').css('cssText', 'line-height: 12px; color: #fff; background-color: #deadf7; float: left; padding: 0; border: 1px solid #ccc; border-radius: 2px; font-size: 12px; width: 50px; height: 17px; margin-right: 13px;');
$('#btns input:eq(0)').css('margin-left', '4px');
$('#t_btn input:eq(0)').css('margin-left', '20px');
$('#pbox').css('cssText', 'position: relative; float:left; width: 200px; height: 215px; text-align: center; background-color: #e1f592;');
$('#count_d').css('cssText', 'display: none; line-height: 19px; font-size: 19px;');
$('#count_txt').css({"margin-top": "23px", "margin-bottom": "5px"});
$('#pbox p').css('cssText', 'margin: 0; font-weight: bold; line-height: 20px;');
$('#show_log').css('cssText', 'position: absolute; bottom: 7px; left: 0px; width: 100%; color: #2FB474;');

/* 动作绑定 */

$('#lbox').click(function () {
    var status = $('#js_tool');
    status.attr('status') != '0' ? $('#js_tool').animate({"left": "-200px"}, 600) + (status.attr('status', '0')) + $('#lbox').text('显示') :	$('#js_tool').animate({"left": "0px"}, 600) + (status.attr('status', '1')) + $('#lbox').text('隐藏');
});

$('#save_parse').click(function (){
	_setParse(1) + console.log('保存成功!');
});

$('#start').click(function (){
	_postParse();
});

$('#start_d').click(function (){
	_timer(0);
});

$('#t_stop').click(function (){
	timer == 1 ? _timer(2) : _timer(4);
});

$('#t_cancle').click(function (){
	_timer(3);
});

/* 设置参数 */

function _setParse() {
	xid = $('#xid').val();
    tid = $('#tid').val();
    (cont = $('#cont').val()) + _contProfession();
    rtime = $('#rtime').val();
	rnums = $('#rnums').val();
	foo = JSON.parse($.cookie('foo'));
	if (xid == '' || tid == '' || rtime == '' || rnums < 1 || cont == '') {
		alert('各项参数不能为空~');
		return false;
	}
if (rnums > 999999) {
		alert('执行次数不能大于999999');
		return false;
	}
	var lx_id = 'id_' + xid + tid;
	if (arguments.length > 0 && arguments[0] == 1) {// 重置参数
		var til = $('.articleTitle').text();// 帖子标题
		foo = {};
		foo = {"tid": tid, "xid": xid, "til": til, "cont": cont, "rtime": rtime, "rnums": rnums};
		var _foo = JSON.stringify(foo);
		$.cookie(lx_id, _foo, cookie_option);
		console.log('save parse!') + show_log.text('保存成功!');
	}
}

/* JSON to string */

function _jsonTostr(data) {
	var res = '';
	for (var i in data) {
		res += '"' + i + '": ' + JSON.stringify(data[i]) + ',';
	}
	var reCat = /,$/gi;
	res = res.replace(reCat, "");
	res = '{' + res + '}';
	console.log(res);
	return res;
}

/* 回帖 Ajax */

function _postParse() {
	_setParse();
	if (xid == '' || tid == '' || cont == '') {
		_timer(3) + console.log('取消回帖');
		return false;
	}
	if (fcont.nums == 1) {
		var content = cont; 
	} else {
		turn = fcont.turn >= fcont.nums - 1 ? 0 : fcont.turn - 0 + 1;
		var content = cont.split("|")[turn];
		fcont = {"turn": turn, "nums": fcont.nums};
	}
	if (1>9) {
		console.log('内容为：' + content);
	} else {
		var host = location.host;// 当前域
		var url = 'http://' + host + '/writerlyapp.php?gorders=1&gpage=1&npp=1&bid=150&pl=1&cd=0&lxt=' + xid;
		$.post(url, {"content": content, "id": tid}, function(data){
			console.log("已执行 \n" + data) + show_log.text('执行回帖!');
		});
	}
}

/* 回帖内容处理 */

function _contProfession() {
	var reCat = /\|/gi;
	if (reCat.test(cont)) {
		if(fcont != null) {
			var conts = cont.split("|").length;
			if(conts != fcont.nums) {
				fcont = {"turn": conts, "nums": conts};
			}
		} else {
			fcont = {"turn": "0", "nums": "1"};
		}
	} else {
		fcont = {"turn": "0", "nums": "1"};
	}
}

/* 初始化数据 */

function init() {
	var _xid = $.GET('lxt');
	var _tid = $.GET('id');
	var lx_id = 'id_' + _xid + _tid;
	var c_foo = $.cookie(lx_id);
	if (c_foo == null) {
		$('#xid').val(_xid);
		$('#tid').val(_tid);
	} else {
		var foo = JSON.parse(c_foo);
		$('#xid').val(foo.xid);
		$('#tid').val(foo.tid);
		$('#rtime').val(foo.rtime);
		$('#rnums').val(foo.rnums);
		$('#cont').val(foo.cont);
	}
	show_log = $('#show_log');
	_xid != null && _tid != null ? (timer_ = setInterval(_checkTime , 1000)) : show_log.html('请在多号模式下使用');// 计时器检测
}

/* 定时器设置 */

function _timer(n) {// [0]开启 [1]重新循环 [2]暂停 [3]取消 [4]继续
	n < 2 && _setParse();
	if (n == 2) {
		(timer = 2) + $('#t_stop').val('继续') + show_log.text('暂停定时');
		return false;
	}else if(n == 3) {
		$('#count_d').hide() + (timer = 0) + show_log.text('取消定时');
		return false;
	}else if(n == 4) {
		(timer = 1) + $('#t_stop').val('暂停') + show_log.text('继续定时');
		return false;
	}
	var m = rtime, s = 1;// 定义开始 分/秒
	if (m < 1 || m > 2000) {
		alert('间隔分钟数 需小于2000并大于0！');
		return false;
	}
	if (rnums < 1) {
		alert('执行次数需大于0！');
		return false;
	}
    (time_m = rtime) + (time_s = s);
	n == 0 && (timer = 1);// 启动定时器
 	console.log(rtime + '分钟定时任务开始~') +  show_log.text('定时开始~');
}

/* 定时计数 */

function _checkTime() {
	var m = time_m;
	var s = time_s;
	var n = rnums;
	var r = 1;
	if (timer != '1') {
		return false;
	}
	$('#count_d').show();
	if(n < 1) {
		_timer(3) + $('#rnums').val(n) + show_log.text('定时任务已完成.') + alert('定时任务已执行完成~');
		return false;
	}
	s > 0 ? (s -= 1) : ((s < 1 && m > 0) ? (m -= 1) + (s = 59) : _postParse() + _timer(1) + (r = 0) + (rnums -= 1) + $('#rnums').val(n - 1));
	r == 1 && (time_m = m) + (time_s = s) + $('#count_txt').html('倒计时：' + m + '分' + s + '秒');
}

/* test */
//$.cookie('fff01', '1', {expires: 7, path: '/', domain: '.f.lexun.com'});



//




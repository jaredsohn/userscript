// ==UserScript==
// @name       bilibili blackList
// @namespace  http://use.i.E.your.homepage/
// @version    0.2.2
// @description  哔哩哔哩@屏蔽
// @updateURL          http://userscripts.org/scripts/source/405031.meta.js
// @downloadURL      http://userscripts.org/scripts/source/405031.user.js
// @require     http://caomei.vicp.co/mail/jquery-1.11.0.js
// @include     *.bilibili.*account/at
// @include     *bilibili.*/video*
// @copyright  2014+, hatn
// @run-at                  document-start
// @grant                   GM_xmlhttpRequest
// ==/UserScript==

/* 初始化 */

var temp, afoo, pfoo, status, foo, checkMsg, pbs = 0, show_log;// 全局变量
temp  = setInterval(init , 300);
function init() {
	if($('body').length > 0){
		window.clearInterval(temp);
        _html_css()  + _clickButton();
        show_log = $('#show_log');
        localStorage.getItem('status') == null && localStorage.setItem('status', 1);
        var status = localStorage.getItem('status');
        status == 0 ? $('#hide_swt').val('开启屏蔽') + show_log.text('状态：停止') : show_log.text('状态：开启');
        _initParse(0);
	}
}

/* html视图 */

function _html_css() {
    var fbox = $('<div id="js_tool" status="0"></div>');
    var html = '<div id="pbox"><p>评论黑名单</p>';
    html += '<form id="parse">';
    html += '<table id="pinit">';
    html += '<tr><td>评论名单：</td><td><textarea id="pinglist" placeholder="多个用户名用‘|’分隔"></textarea></td></tr>';
    html += '<tr><td>@at名单：</td><td><textarea id="atlist" placeholder="多个用户名用‘|’分隔" ></textarea></td></tr>';
    html += '</table>';// pinit
    html += '<div id="btns">';
    html += '<input type="button" id="save_parse" value="保存参数" />';
    html += '<input type="button" id="hide_swt" value="取消屏蔽" />';
    html += '</div>';// btns
    html += '<div id="count_d">';
    html += '<div id="count_txt"></div>';
    html += '</div>';// count_d
    html += '</form>';
    html += '<div id="show_log"></div>';
    html += '</div>';// pbox
    html += '<div id="lbox">显示</div>';
    fbox.html(html);
    $('body:eq(0)').prepend(fbox);
    /* css */
    $('#js_tool table').css({"border-collapse": "collapse", "border-spacing": "0", "margin": "0 auto", "padding": "0px"});
    $('#js_tool').css('cssText', 'z-index: 999999; line-height: 12px; margin: 0; padding: 0; color: #696A52; font-size: 12px; position: fixed; top: 100px; left: -200px; text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8),0px 1px 1px rgba(255, 255, 255, 0.8);');
    $('#lbox').css('cssText', 'float: left; width: 16px; height: 121px; background-color: #78bd3a; border-radius: 0 8px 8px 0; cursor: pointer; padding: 94px 0 0 4px;');
    $('#pinit td').css({"text-align": "right"});
    $('#pinit input, #pinit textarea').css('cssText', 'line-height: 12px; margin: 0 0 1px 0; font-size: 12px; width: 100px; outline: none; border: 1px solid #ccc; border-radius: 3px;');
    $('#btns input').css('cssText', 'line-height: 12px; color: #fff; background-color: #deadf7; float: left; padding: 0; border: 1px solid #ccc; border-radius: 2px; font-size: 12px; width: 50px; height: 17px; margin-left: 30px;');
    $('#pbox').css('cssText', 'position: relative; float:left; width: 200px; height: 215px; text-align: center; background-color: #e1f592;');
    $('#count_d').css('cssText', 'line-height: 19px; font-size: 19px;');
    $('#count_txt').css({"margin-top": "50px", "margin-bottom": "5px"});
    $('#pbox p').css('cssText', 'margin: 0; font-weight: bold; line-height: 20px;');
    $('#show_log').css('cssText', 'position: absolute; bottom: 7px; left: 0px; width: 100%; color: #2FB474;');
}

/* 动作绑定 */

function _clickButton() {
    $('#lbox').click(function () {
        var status = $('#js_tool');
        status.attr('status') != '0' ? $('#js_tool').animate({"left": "-200px"}, 600) + (status.attr('status', '0')) + $('#lbox').text('显示') :	$('#js_tool').animate({"left": "0px"}, 600) + (status.attr('status', '1')) + $('#lbox').text('隐藏');
    });
    $('#save_parse').click(function (){
        _setParse() + console.log('保存成功!');
    });
    $('#hide_swt').click(function (){
        status == 1 ? _initParse(1) + $('#hide_swt').val('开启屏蔽') :  _initParse(2) + $('#hide_swt').val('取消屏蔽');
    });
}

/* 设置参数 */

function _setParse() {
	var pids = $('#pinglist').val();
    var aids = $('#atlist').val();
    foo = {"pids": pids, "aids": aids};
    var _foo = JSON.stringify(foo);
    localStorage.setItem('foo', _foo);
    console.log('save parse!') + show_log.text('保存成功!');
    _formatData();
}

/* 初始化数据 */

function _initParse(n) {// [0]初始化 [1]取消 [2]启动
    if (n == 1) {
        localStorage.setItem('status', 0) + (checkMsg > 0 && window.clearInterval(checkMsg)) + $('a[card]').parents('li:hidden').show() + show_log.text('已取消屏蔽') + (pbs = 0) + $('#count_txt').text('');
    }else if(n == 2) {
        localStorage.setItem('status', 1) + show_log.text('已开启屏蔽');
    } else {
        var foo = JSON.parse(localStorage.getItem('foo'));
        $('#pinglist').val(foo.pids) + $('#atlist').val(foo.aids) + _formatData();
    }
    status = localStorage.getItem('status');
    status == 1 && (checkMsg = setInterval(_checkMsg , 500)) + console.log(checkMsg+'llls');
}

/* 监控评论/at列表 */

function _checkMsg() {
    var reg = /=""/g, regg = /=""/g;
    (reg.test(afoo) && regg.test(pfoo.pft)) && _initParse(1) + $('#hide_swt').val('开启屏蔽') + show_log.text('无用户数据');
    if (location.pathname != "/account/at") {
        var $pfw = $(pfoo.pfw).parents('.re_ul li:visible');
        var $pft = $(pfoo.pft).parents('li:visible');
        var _pbs = $pfw.length + $pft.length;
        _pbs && $pfw.hide() + $pft.hide();
        
    } else {
        var $aft = $(afoo).parents('li:visible');
        var _pbs = $aft.length;
        _pbs && $aft.hide();
    }
    pbs += _pbs;
    _pbs > 0 && $('#count_txt').text('已屏蔽' + pbs + '条记录');
    console.log(_pbs);
}

/* 格式化屏蔽用户列表 */

function _formatData() {
	var _foo = JSON.parse(localStorage.getItem('foo'));
    var reg = /\|/g, regg = /\|/g;
    pfoo = {};
    if (reg.test(_foo.pids)) {
        var _pfoo = _foo.pids.split("|");
        var _pft = [], _pfw = [];
        for (var i in _pfoo) {
             _pft.push('.t a[card*="' + _pfoo[i] + '"]');
           	 _pfw.push('.w a.name[card*="' + _pfoo[i] + '"]');
        }
        pfoo.pft = _pft.join();
        pfoo.pfw = _pfw.join();
    } else {
        pfoo.pft = '.t a[card*="' + _foo.pids + '"]';
        pfoo.pfw = '.w a.name[card*="' + _foo.pids + '"]';
    }
    if (regg.test(_foo.aids)) {
        var _afoo = _foo.aids.split("|");
        var _aft = [];
        for (var i in _afoo) {
             _aft.push('.t a[card*="' + _afoo[i] + '"]');
        }
        afoo = _aft.join();
    } else {
        afoo = '.t a[card*="' + _foo.aids + '"]';
    }
    console.log(afoo);
}
//





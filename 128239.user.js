// ==UserScript==
// @name           天涯宝盒(TianyaBox)
// @namespace      http://www.leaf.com
// @author         树叶(huwei-001982@163.com)
// @description    天涯看贴的利器。主要功能：只看楼主，高亮楼主，滚动到页面底部时自动加载加一页。特色功能：如果选择了只看楼主，则加载下一页时同样只加载楼主的帖子，高亮楼主也一样（目前仅发现chrome上有一个扩展实现了该功能）
// @include        http://*.tianya.cn/*publicforum/content*
// @include        http://*.tianya.cn/*techforum/content*
// @include        http://*.tianya.cn/*tianyacity/content*
// @include        http://bbs.tianya.cn/*
// @version        2.1.12
// @grant          none
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==\
//v2.1.12 2012-12-10
//  修复了自动翻页的一些bug
//v2.0.11 2012-11-30
//  可以选择高亮楼主时的颜色
//  优化体验，查看全部和取消高亮时不再刷新页面
//  针对天涯的持续改版，修正一些对应的小bug
//  不再更新老版天涯的代码，请使用新版天涯
//v1.5.10 2012-11-7
//  增加对天涯新版本(域名为bbs.tianya.cn)的支持，现同时支持新旧两个版本的天涯
//v1.4.6 2012-10-11
//  增加对天涯城市/天涯别院板块的支持
//v1.3.5 2012-9-12
//  加载下一页失败后可以重试
//v1.2.4 2012-8-31
//  修改天涯加载图片的方式
//  保证图片能正确加载
//v1.1.3 2012-6-14
//  增加对天涯新版本的支持
//  用 jquery 重构了代码
//  同时兼容 chrome和firefox
//v1.0.2 2012-4-27
//	增加了一些系统设置
//	优化代码,翻页速度更快
//v1.0.1 2012-3-15
//	修正了一些小bug
//	修改了高亮楼主的样式
//v1.0.0 2012-3-14

var version = '2.1.12';
var next_page_url;
var b_show_author;
var b_high_light;
var pager;
var b_loading;
var b_auto_pager;
var author;

var id_show_author = "ty_a_showAuthor";
var id_hl_author = "ty_a_hl_author";
var id_hl_author_style = "ty_a_hl_author_style";
var id_loading = "ty_div_loading";
var hl_style = {};
var id_iframe = "ty_iframe_nextpage";
var id_auto_pager = "ty_a_autopager";
var id_cfg_show_author = "a_showAuthor";
var id_cfg_hl = "a_hl";
var id_cfg_pager = "a_pager";
var id_retry = "ty_a_retry";
var timer_load_next;
var form_name;//板块
var g_dg_id = 0;
var g_color_picker;
var TYDialog = function (id, w, h) {
    this.width = w === undefined ? 220 : w;
    this.height = w === undefined ? 400 : h;
    this.id = id === undefined ? 'dg-' + g_dg_id++ : id;
    this.init = function () {
        var obj_html = "<div id='" + this.id + "' class='ty_box' style='position: absolute;width:" +
			this.width + "px;height:" + this.height + "px'></div>";
        this.obj = $(obj_html);
        $("body").append(this.obj);
        this.obj.hide();
    };
    var on_mouse_down = function (event) {
        var parent = $(event.target).parent('#' + event.data.id);
        if (event.target === event.data.obj[0] || parent.length > 0) {
            return;
        }
        event.data.hide();
    };
    this.show = function (x, y) {
        this.obj.css({ 'top': y, 'left': x });
        $(document).bind('mousedown', this, on_mouse_down);
        this.obj.show();
    };
    this.hide = function () {
        $(document).unbind('mousedown', on_mouse_down);
        this.obj.hide();
    };
};
var color_picker_block_click = function (event) {
    var color = $(event.target).attr('hex');
    var bold = $('#chk_blod').attr('checked');
    $(event.data).trigger('onselected', { color: color, bold: bold });
    event.data.hide();
};
var TYColorPicker = function (id) {
    var colors = [
		'000000', '993300', '333300', '000080', '333399', '333333', '800000', 'FF6600',
	'808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900',
	'99CC00', '339966', '33CCCC', '3366FF', '800080', '999999', 'FF00FF', 'FFCC00',
	'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99',
	'FFFF99', 'CCFFFF', '99CCFF', 'FFFFFF'
    ];
    this.init();
    this.obj.width(4 * 6 + 6 * 14);
    this.obj.height(4 * 6 + 6 * 14 + 20);
    this.obj.css({ 'padding': 4 });
    this.id = id;
    this.obj.attr('id', id);
    var i;
    for (i = 0; i < colors.length; i++) {
        var block = $("<div style='float:left;margin:2px;width:12px;height:12px;border: 1px solid #000000;background-color: #"
				+ colors[i] + ";'" + " hex='" + colors[i] + "'></div>");
        block.bind('click', this, color_picker_block_click);
        this.obj.append(block);
    }
    var bold = "<label for='chk_blod' style='font-size:10px'>粗体字</label><input id='chk_blod' checked='checked' type='checkbox' />";
    this.obj.append(bold);
};

TYColorPicker.prototype = new TYDialog();

/*
 *判断是否是新版天涯
 * */
function is_new_version() {
    return (/bbs\.tianya\.cn\//).test(window.location);
}

function set_value(key, value) {
    localStorage[key] = value;
}

function get_value(key) {
    return localStorage[key];
}

/*
 *判断浏览器
 * */
function is_chrome() {
    return navigator.userAgent.indexOf('Chrome') > -1;
}


//主板
function filter_main(dom, div_content, author) {
    var arr, new_content, i, item;
    arr = div_content.html().split(/<TABLE /ig); // .replace(/[\n\r]/g,'')
    for (i = 0; i < arr.length; i++) {
        item = arr[i];
        if (item.indexOf('>作者：') !== -1 && item.indexOf('日期：') !== -1) {
            if (author !== '' && item.indexOf('>' + author + '</') !== -1) {
                new_content += '<TABLE ' + item;
            }
        }
        else {
            if (i === 0) {
                if (dom.find('#firstAuthor').html().indexOf('>' + author + '</') !== -1) {
                    // 主版第一个回复内容处理
                    new_content = item;
                } else {
                    new_content = '';
                }
            } else {
                new_content += '<TABLE ' + item;
            }
        }
    }
    // 主版第一个回复作者处理
    if (!(author !== '' && dom.find('#firstAuthor').html().indexOf('>' + author + '</') !== -1)) {
        dom.find('#firstAuthor')[0].style.display = 'none';
    }
    div_content.html(new_content);
    return new_content !== '';
}

//城市
function filter_city(dom, div_content, author) {
    var items, not_author;
    items = div_content.find('div[class="item"]');
    not_author = items.not(':has(div[class="vcard"]>a:contains("' + author + '"))');
    not_author.addClass('ty_box_hidden');
    return items.length !== not_author.length;
}

//只看楼主
function filter_content(dom, div_content, author, on) {
    if (is_new_version()) {
        var items = div_content.find('div[class*="atl-item"]');
        var has_author = false;
        if (on) {
            var others = items.filter(':has(div[class="atl-info"])').not(':has(strong)');
            has_author = items.length > others.length;
            others.addClass('ty_box_hidden');
        } else {
            items.removeClass('ty_box_hidden');
        }
        return has_author;
    }
    switch (form_name) {
        case 'main':
            return filter_main(dom, div_content, author);
        case 'city':
        case 'tech':
            return filter_city(dom, div_content, author);
    }
}

function highlight_main(dom, div_content, author) {
    var i, item, new_content, arr = div_content.html().split(/<TABLE /ig); // .replace(/[\n\r]/g,'')
    for (i = 0; i < arr.length; i++) {
        item = arr[i];
        if (item.indexOf('>作者：') !== -1 && item.indexOf('回复日期：') !== -1) {
            if (author !== '' && item.indexOf('>' + author + '</') !== -1) {
                new_content += '<TABLE ' + item.replace('class="post"', 'class="post" style=' + hl_style);
            }
            else {
                new_content += '<TABLE ' + item;
            }
        } else {
            if (i === 0) {
                if (dom.find('#firstAuthor').html().indexOf('>' + author + '</') !== -1) { // 主版第一个回复内容处理
                    new_content = item.replace('class="post"', 'class="post" style=' + hl_style);
                } else {
                    new_content = '<TABLE ' + item;
                }
            } else {
                new_content += '<TABLE ' + item;
            }
        }
    }
    div_content.html(new_content);
}

function highlight_city(dom, div_content, author) {
    var items = div_content.find('div[class="item"]');
    var authors = items.filter(':has(div[class="vcard"]>a:contains("' + author + '"))');
    authors.find('div[class="post"]').addClass('ty_box_hl');
}

/*
 *高亮楼主
 * */
function highlight_content(dom, div_content, author, on) {
    if (is_new_version()) {
        var items = div_content.find('div[class="atl-item"]');
        var author_item = items.filter(':has(div[class="atl-info"] strong)');
        if (on){
            author_item.css(hl_style);
        }else{
            author_item.removeAttr('style');
        }
        var first = items.first();
        if (on) {
            if (first.filter(':has(div[class="atl-info"])').length === 0) {
                first.css(hl_style);
            }
        } else {
            if (first.filter(':has(div[class="atl-info"])').length === 0) {
                first.removeAttr('style');
            }
        }
    }
    else {
        switch (form_name) {
            case 'main':
                highlight_main(dom, div_content, author);
                break;
            case 'city':
            case 'tech':
                return highlight_city(dom, div_content, author);
        }
    }
}

function get_content_div(dom,all) {
    if (is_new_version()) {
		var contents = dom.find('.atl-main');
		if (all === undefined || !all)
			return contents.last();
		return contents;
    }
    return dom.find('#pContentDiv');
}

/**
 * 加载下一页失败
 * */
function load_error() {
    $('#' + id_loading).html('<span style="font-weight:bold;color:Red">加载失败 <a id="' + id_retry + '">重试</a></span>');
    $('#' + id_retry).click(function () {
        retry();
    });
}

/**
 * 加载下一页
 */
function load_next_page() {
    if (next_page_url) {
        b_loading = true;
        var iframe_nextpage = document.getElementById(id_iframe);
        iframe_nextpage.src = next_page_url;
        $('#' + id_loading).css({ 'top': document.body.clientHeight - 100 });
        $('#' + id_loading).show();
        window.clearTimeout(timer_load_next);
        timer_load_next = window.setTimeout(load_error, 60000);
    }
}

/**
 * 重试
 * */
function retry() {
    $('#' + id_loading).html('<span style="font-weight:bold;color:Blue">正在加载下一页...</span>');
    load_next_page();
}

function get_next_page_url(dom) {
    if (is_new_version()) {
        return dom.find('div[class="atl-pages"] a:contains("下页")').attr('href');
    }
    return dom.find('div[class="pages"] a:contains("下一页")').attr('href');
}

/**
 * 设置自动翻页开关
 * @param {boolean} on 打开或关闭
 */
function set_auto_pager(on) {
    $('#ty_a_autopager').text(on ? '自动分页开' : '自动分页关');
    b_auto_pager = on;
}

/**
 * 只看楼主
 */
function show_author_only(on) {
    var dom = $(document);
    filter_content(dom, get_content_div(dom, true), author, on);
    $('#' + id_show_author).text(on?'查看全部':'只看楼主');
    b_show_author = on;
}

/**
 * 高亮楼主
 */
function hl_author(on) {
    var dom = $(document);
    highlight_content(dom, get_content_div(dom, true), author, on);
    $('#' + id_hl_author).html(on?'去掉高亮':'高亮楼主');
    b_high_light = on;
}

/*
 * 添加css
 * */
function set_style() {
    var str_css = '.ty_box {margin:10px 0 0;height:32px;border:1px solid #CADBE7;background:#ECF8EC;border-radius:3px;}';
    str_css += '.ty_box li {float:left;display:inline;margin:0 10px;height:32px;line-height:32px}';
    str_css += '.ty_box li a{float:left;display:inline;margin:0 5px;text-decoration:none;}';
    str_css += '.ty_box_pager{padding-top:4px;height:28px;font-size:16px;border:1px solid #CADBE7;background:#ECF8FC;border-radius:3px;}';
    str_css += '.ty_box_hidden {display: none}';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = str_css;
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
}

/*
 *设置天涯宝盒的界面
 * */
function set_tybox() {
    var new_box_html = '<div class="ty_box">'
                + '<ul class="list-bbx">'
                    + '<li id=""><a style="color: Red; font-weight: bold" href="http://userscripts.org/scripts/show/128239" alt="插件主页" target="_blank">天涯宝盒 v' + version + '</a>'
                    + '<a id="' + id_show_author + '" href="#">只看楼主</a><a id="' + id_hl_author + '"'
                    + 'href="#">高亮楼主</a><a id="' + id_hl_author_style
                    + '" href="#">设置高亮样式</a><div id="ty_div_hl_style" style="float:left;margin-top:10px;width:12px;height:12px;border: 1px solid #000000;background-color:#"></div><a id="'
					+ id_auto_pager + '" style="color: red" href="#">自动分页开</a></li>'
                    + '<li>每次打开新页面时自动<input id="' + id_cfg_show_author + '" type="checkbox"/>只看楼主</li>'
                    + '<li><input id="' + id_cfg_hl + '" type="checkbox" />高亮楼主</li>'
                    + '</ul></div>';
    if (!is_new_version()) {
        var box = $("#tybbx");
        box.html(new_box_html);
    }
    else {
        var new_box = $(new_box_html);
        new_box.insertAfter($("#hd"));
    }

    $('#' + id_show_author).click(function () {
        show_author_only(!b_show_author);
    });
    $('#' + id_hl_author).click(function () {
        hl_author(!b_high_light);
    });
    $('#' + id_auto_pager).click(function () {
        set_auto_pager(!b_auto_pager);
        set_value(id_cfg_pager, b_auto_pager);
    });
    $('#' + id_cfg_show_author).click(function () {
        set_value(id_cfg_show_author, $('#' + id_cfg_show_author).prop('checked'));
    });
    $('#' + id_cfg_hl).click(function () {
        set_value(id_cfg_hl, $('#' + id_cfg_hl).prop('checked'));
    });
    $('#' + id_hl_author_style).click(function () {
        var x = $(this).offset().left;
        var y = $(this).offset().top + 20;
        g_color_picker.show(x, y);
    });
    g_color_picker = new TYColorPicker('dlg-color-picker');
    $(g_color_picker).bind('onselected', function (event, style) {
        hl_style = {};
        hl_style.color = "#" + style.color;
        hl_style["font-weight"] = style.bold ? "bold" : "normal";
        $("#ty_div_hl_style").css('background-color', hl_style.color);
        set_value('hl_style', JSON.stringify(hl_style));
        if (b_high_light) {
            hl_author(true);
        }
    });
    $("#ty_div_hl_style").css('background-color', hl_style.color);
}

/*
 *删除广告
 * */
function clear_page(div) {
    if (is_new_version()) {
        div.find('div[id="bbs_tj"]').remove();
    }
}


/*
 * 加载所有的图片
 * */
function load_images(dom) {
    dom.find('img[original]')
		.attr('src', function () {
		    return $(this).attr('original');
		})
		.removeAttr('height')
		.attr('loaded', "1")
    ;
}

function parse_next_page() {
    window.clearTimeout(timer_load_next);
    var iframe_nextpage = document.getElementById(id_iframe);
    var dom = $(iframe_nextpage.contentDocument);
    var div_next_page = get_content_div(dom);
    if (div_next_page.length === 0) {
        return;
    }
    load_images(dom);
    clear_page(div_next_page);
    var p_content_div = get_content_div($(document));
    var b_no_author_reply;
    if (b_show_author) {
        b_no_author_reply = !filter_content(dom, div_next_page, author, true);
        if (b_no_author_reply) {
			div_next_page.append('<div class="ty_box_pager" style="text-align: center"><span style="color:Red;font-weight:bold">本页没有楼主回复</span></div>');
        }
    }
    if (b_high_light) {
        highlight_content(dom, div_next_page, author, true);
    }
    //加入翻页条
    var divPaging = '<div class="ty_box_pager" style="text-align: center">'
		+ '<span style="color:Red;font-weight:bold">这是第' + (++pager).toString() + '页&nbsp;&nbsp;&nbsp;</span>'
		+ '<a href="' + next_page_url + '">' + next_page_url + '</a>'
		+ '</div>';
    div_next_page.prepend($(divPaging));
    p_content_div.append(div_next_page[0].innerHTML);
    //查找下一页
    next_page_url = get_next_page_url(dom);
    if (!next_page_url) {
        var last_page = '<div class="ty_box_pager" style="text-align: center">'
			+ '<span style="color:Blue;font-weight:bold">已经是最后一页</span>'
			+ '</div>';
        p_content_div.append(last_page);
    }
    b_loading = false;
    $('#' + id_loading).hide();
    if (next_page_url && b_no_author_reply) {
        load_next_page();
    }
}

function load_config() {
    b_show_author = get_value(id_cfg_show_author) == 'true';
    b_high_light = get_value(id_cfg_hl) == 'true';
    b_auto_pager = get_value(id_cfg_pager) == 'true';
    var value = get_value('hl_style');
    try {
        hl_style = JSON.parse(value);
    }
    catch (err) {
        hl_style.color = "#000000";
        hl_style["font-weight"] = "bold";
    }
}

function get_body_height() {
    if (is_chrome()) {
        return document.body.scrollHeight;
    }
    return document.documentElement.scrollHeight;
}

function get_body_scroll_top() {
    if (is_chrome()) {
        return document.body.scrollTop;
    }
    return document.documentElement.scrollTop;
}

/*
 *自动翻页
 * */
function windowOnScroll() {
    var height = window.screen.height * 3;
    //如果剩下两屏文字，则自动加载下一页
    if (get_body_height() - get_body_scroll_top() < height) {
        if (b_auto_pager && !b_loading) {
            b_loading = true;
            load_next_page();
        }
    }
}


function start() {
    load_config();
    pager = 1;
    if (/tianya\.cn\/publicforum/.test(window.location)) {
        form_name = 'main';
    }
    if (/bbs\.city\.tianya\.cn/.test(window.location)) {
        form_name = 'city';
    }
    if (/tianya\.cn\/techforum/.test(window.location)) {
        form_name = 'tech';
    }
    set_style();
    set_tybox();
    var dom = $(document);
    if (!is_new_version()) {
        author = $('input[name="chrAuthor"]').val();
    }
    var html_loading = '<div id="' + id_loading + '" style="position:absolute;height:20px;width:auto;display:none;left:'
	+ (document.documentElement.scrollWidth - 200) + 'px;top:' + (document.documentElement.clientHeight - 100) + 'px'
	+ '"><span style="font-weight:bold;color:Blue">正在加载下一页...</span></div>';
    $(document.documentElement).append(html_loading);
    //	if (chrome)
    //		$('#img-loading').attr('src',chrome.extension.getURL("loading.gif"));

    next_page_url = get_next_page_url(dom);
    var iframe_nextpage = document.createElement("iframe");
    iframe_nextpage.id = iframe_nextpage.name = id_iframe;
    iframe_nextpage.style.display = "none";
    iframe_nextpage.onload = function () {
        parse_next_page();
    };
    document.body.appendChild(iframe_nextpage);
    window.addEventListener('scroll', windowOnScroll);
    set_auto_pager(b_auto_pager);
    $('#' + id_cfg_show_author).prop('checked', b_show_author);
    $('#' + id_cfg_hl).prop('checked', b_high_light);
    if (b_show_author) {
        show_author_only(true);
    }
    if (b_high_light) {
        hl_author(true);
    }
    load_images(dom);
}

start();

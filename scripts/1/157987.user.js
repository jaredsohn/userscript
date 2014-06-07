// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.0.0
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @require      http://underscorejs.org/underscore-min.js
// @require      https://github.com/allmarkedup/jQuery-URL-Parser/raw/master/purl.js
// @require      https://github.com/n1k0/casperjs/raw/master/modules/clientutils.js
// @copyright    2012+, @钢盅郭子 @刘勇 @罗大睿
// ==/UserScript==


var $ = unsafeWindow.$;

var _ = this._;

var purl = window.purl;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
var client = window.create();

var url = purl();

var page = url.segment(1);

//主入口
$(function main() {
    console.log("izhihu started.");
});

//拖动, 用法 $('目标的css selector').drags({handler:'拖动对象的css selector'})
(function($) {
    $.fn.drags = function(opt) {
        opt = $.extend({
            handler: "",
            cursor: "move"
        }, opt);
        if (opt.handler === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handler);
        }
        return $el.css("cursor", opt.cursor).on("mousedown", function(e) {
            if (opt.handler === "") {
                var $drag = $(this).addClass("draggable");
            } else {
                var $drag = $(this).addClass("active-handle").parent().addClass("draggable");
            }
            var z_idx = $drag.css("z-index"), drg_h = $drag.outerHeight(), drg_w = $drag.outerWidth(), pos_y = $drag.offset().top + drg_h - e.pageY, pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css("z-index", 1e3).parents().on("mousemove", function(e) {
                $(".draggable").offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass("draggable").css("z-index", z_idx);
                });
            });
            e.preventDefault();
        }).on("mouseup", function() {
            if (opt.handler === "") {
                $(this).removeClass("draggable");
            } else {
                $(this).removeClass("active-handle").parent().removeClass("draggable");
            }
        });
    };
})($);

/**
 * @class Utils 辅助类
 */
function utils() {}

/**
 * 读取配置
 */
utils.getCfg = function(key) {
    var obj = {
        comment_sidebar: true,
        answer_orderByTime: false
    };
    obj = _.extend(obj, this.getValue("izhihu"));
    return key ? obj[key] : obj;
};

/**
 * 读取存储
 */
utils.getValue = function(key, defaultValue) {
    return localStorage[key] || defaultValue;
};

/**
 * 写入存储
 */
utils.setValue = function(key, value) {
    return localStorage[key] = value;
};

/**
 * 删除存储
 */
utils.deleteValue = function(key) {
    return delete localStorage[key];
};

/**
 * 收藏页
 */
$(function() {
    if (page == "collection") {
        //添加按钮
        $("#zh-list-meta-wrap").append('<span class="zg-bull">•</span>  ').append('<a href="javascript:;" id="getAllLinks">列出全部</a>');
        var btn = $("#getAllLinks");
        var result = [];
        //初始化弹出框
        var initDialog = function() {
            if ($("#izhihu-dialog").length == 0) {
                var dom = [ '<div id="izhihu-dialog-bg" class="modal-dialog-bg" style="opacity: 0.5; width: 1283px; height: 3423px; display: none;"></div>', '<div id="izhihu-dialog" class="modal-dialog" tabindex="0" style="display: none;">', '<div class="modal-dialog-title modal-dialog-title-draggable">', '<span class="modal-dialog-title-text">收藏夹链接清单</span>', '<span class="modal-dialog-title-close"></span>', "</div>", '<div class="modal-dialog-content">', "<div>", '<div class="zg-section">', '<div id="izhihu-collection-links" class="zg-form-text-input">', //'<textarea style="width: 100%; height: 132px;" id="izhihu-collection-links" class="zu-seamless-input-origin-element"></textarea>',
                "</div>", "</div>", '<div class="zm-command">', '<div class="zm-item-meta zg-left">', '<span id="izhihu-collection-info"></span>', "</div>", //'<a class="zm-command-cancel" name="cancel" href="javascript:;">取消</a>',
                '<a id="copy" class="zg-btn-blue" href="javascript:;">复制到剪贴板</a>', "</div>", "</div>", "</div>", "</div>" ].join("");
                $(".zhi").append(dom);
                $("#izhihu-dialog .modal-dialog-title-close").click(function() {
                    $(".modal-dialog-bg").hide();
                    $("#izhihu-dialog").first().hide();
                });
                //拖动
                $("#izhihu-dialog").drags({
                    handler: ".modal-dialog-title-draggable"
                });
            }
        };
        //分析内容
        var processNode = function(content) {
            $(content).find(".zm-item-fav").each(function(index, item) {
                var dom = $(item);
                var obj = {
                    title: dom.parent().find(".zm-item-title a").text(),
                    questionUrl: dom.parent().find(".zm-item-title a").attr("href"),
                    answerUrl: dom.find(".answer-date-link-wrap a").attr("href"),
                    content: dom.find(".zm-editable-content").html()
                };
                result.push(obj);
                $("#izhihu-collection-links").append('<li><a href="' + obj.answerUrl + '">' + obj.answerUrl + "</a></li>");
                $("#izhihu-collection-info").html("努力加载中(" + result.length + ")...");
            });
        };
        //处理函数
        var offset = 0;
        var handler = function(msg) {
            offset += Number(msg[0]);
            var start = String(msg[2]);
            processNode(msg[1]);
            if (start !== "-1") {
                $.post(window.location, $.param({
                    offset: offset,
                    start: start,
                    _xsrf: $("[name=_xsrf]").val()
                }), function(r) {
                    handler(r.msg);
                });
            } else {
                offset = 0;
                $("#izhihu-collection-info").html("加载完成,共" + result.length + "条.");
            }
        };
        //注册点击事件
        btn.click(function() {
            initDialog();
            $(".modal-dialog-bg").toggle();
            $("#izhihu-dialog").css({
                top: btn.position().top + 60,
                left: btn.position().left
            }).fadeIn("slow");
            result = [];
            $("#izhihu-collection-links").empty();
            handler([ $("#zh-list-answer-wrap .zm-item").size(), $("#zh-list-answer-wrap").html(), $("#zh-load-more").attr("data-next") ]);
        });
    }
});

/**
 * 问题页
 */
$(function() {
    if (page == "question") {
        //答案按时间排序
        if (utils.getCfg("answer_orderByTime")) {
            client.click(".zh-answers-filter-popup div[data-key=added_time]");
        }
    }
});

/**
 * 配置界面
 */
$(function() {
    var dom = [ "<li>", '<a href="javascript:void(0);" tabindex="-1">', '<i class="zg-icon zg-icon-dd-settings izhihu-settings"></i>', "iZhihu", "</a>", "</li>" ].join("");
    var d = '<div id="dialog" title="Basic dialog"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>';
    $(document).append(d);
    $(dom).insertBefore($("ul#top-nav-profile-dropdown li:last")).click(function() {
        console.log(this);
    });
});
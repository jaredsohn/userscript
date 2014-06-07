
// Batch CSDN comment user script
// version 0.1 BETA!
// 2012-08-6
// Copyright (c) 2012, SharpBai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Batch CSDN Comment", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Batch CSDN Comment
// @namespace     http://http://www.renren.com/sharpbai
// @description   批量评论CSDN刷分~你懂得~
// @include       http://download.csdn.net/my/downloads*
// @require	http://www.csdn.net/js/jquery-1.4.2.min.js
// @require http://download.csdn.net/js/jquery.rating.js
// @require http://www.update8.com/download/js/piaofu/11/update8.js

// ==/UserScript==

//window.helloworld=function(){
//	alert('Hello world!');
//}

//window.setTimeout("helloworld()",60);

// 全局参数
// 评论间隔,目前为301秒
var interval = 301 * 1000;

// 主函数
unsafeWindow.run = function () {
    // 检查Greasemonkey版本
    if (!GM_xmlhttpRequest) {
        alert('请升级到最新版本的 Greasemonkey.');
        //return;
    }
    //console.log(GM_getValue('popup'));
    // 读取设置是否弹出
    if (GM_getValue('popup') === true) {
        // 加载弹出层css
        $('head').append('<style>.float_layer { text-align:left; margin: 0; padding: 0; background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #AAAAAA; display: none; width: 300px; } .float_layer h2 { background: url("http://www.update8.com/download/js/piaofu/11/images/title_bg.gif") repeat-x scroll 0 0 transparent; border-bottom: 1px solid #AAAAAA; color: #333333; font-size: 14px; height: 25px; line-height: 25px; padding-left: 10px; position: relative; } .float_layer .min { background: url("http://www.update8.com/download/js/piaofu/11/images/min.gif") no-repeat scroll 0 bottom transparent; height: 20px; position: absolute; right: 25px; top: 2px; width: 21px; } .float_layer .min:hover { background: url("http://www.update8.com/download/js/piaofu/11/images/min.gif") no-repeat scroll 0 0 transparent; } .float_layer .max { background: url("http://www.update8.com/download/js/piaofu/11/images/max.gif") no-repeat scroll 0 bottom transparent; height: 20px; position: absolute; right: 25px; top: 2px; width: 21px; } .float_layer .max:hover { background: url("http://www.update8.com/download/js/piaofu/11/images/max.gif") no-repeat scroll 0 0 transparent; } .float_layer .close { background: url("http://www.update8.com/download/js/piaofu/11/images/close.gif") no-repeat scroll 0 bottom transparent; height: 20px; position: absolute; right: 3px; top: 2px; width: 21px; } .float_layer .close:hover { background: url("http://www.update8.com/download/js/piaofu/11/images/close.gif") no-repeat scroll 0 0 transparent; } .float_layer .content { color: #666666; font-size: 14px; height: 120px; line-height: 18px; overflow: hidden; text-indent: 28px; } .float_layer .wrap { padding: 10px; }</style>');
        // 加入弹出层html
        $('body').append('<div class="float_layer" id="miaov_float_layer"><h2><strong>欢迎使用CSDN批量评论工具~&#12288; </strong><a href="javascript:CommentAbout();" id="btn_about">关于</a><a class="min" href="javascript:;" id="btn_min"></a><a class="close" href="javascript:;" id="btn_close"></a></h2><div class="content"><div class="wrap"><p><a href="javascript:load();">点击开始批量评论</a></p><p>一键评论：无需选择评分与键入内容</p><p>有评有据：随机选择下载项已有的评论</p><p>评即得分：自动过滤无资源分的下载项</p><p>手动评论：无评论的下载项可输入评论</p><p><input type="checkbox" onclick="DisablePopup();"> 不再弹出此提示</p></div></div></div>');
    }
    else if (GM_getValue('popup') === undefined) {
        GM_setValue('popup', true);
    }

    // 加入批量评论按钮
    $('.bor_box_1 .tab_1 ul').append('<li><a href="javascript:load();">批量评论</a></li>');
}
// 加载数据函数
unsafeWindow.load = function () {
    // 改变选项卡样式
    $('.bor_box_1 .tab_1 ul li.select').removeClass('select');
    $('.bor_box_1 .tab_1 ul li:last').addClass('select');

    // 获取页数
    var link = $('.page_nav a:last').attr('href');
    var page = parseInt(link.substring(link.lastIndexOf('/') + 1));

    // 移除已有项目
    $('.bor_box_1 dl').remove();
    $('.bor_box_1 .page_nav').remove();

    // 基地址
    var base_url = (unsafeWindow.location.host.substring(0, 5) == 'local') ? 'http://local.downloadv3.csdn.net' : 'http://download.csdn.net';

    // 获取所有页的所有待评论对象
    $('.bor_box_1').append('<div class=\'list_1  temp_container\' style=\'display:none;\'></div>');
    var temp_container = $('.temp_container');
    // 插入下载项容器
    $('<div class=\'list_1  item_container\' ></div>').insertAfter('.bor_box_1 .tab_1');
    // 添加设置项
    $('<div style="font-size: larger; padding-left: 20px;">进入我的资源页面时开启批量评论工具提示<input type="checkbox" class="set_popup" onclick="SetPopup();"></input></div>').insertAfter('.bor_box_1 .item_container');
    setTimeout(function () {
        if (GM_getValue('popup')) {
            $('.bor_box_1 input.set_popup').attr('checked', 'checked');
        }
    }, 0);
    var item_container = $('.item_container');

    // 添加评分脚本
    //$('.bor_box_1').append('<script type="text/javascript" src="http://download.csdn.net/js/jquery.rating.js"/>');
    $('.bor_box_1').append('<link rel="stylesheet" type="text/css" href="http://download.csdn.net/js/jquery.rating.css" />');
    for (var num = 1; num <= page; num++) {
        if (num == page) { // 最后一页加载完成时添加批量评论按钮
            $('<dt class="page_nav" style="height:30px;"><span class="share"><strong onclick="javascript:BatchPostComment();" title="点击即可批量评论选中的项">点击批量评论</strong></span><h3>说明:请勾选需要评论的项,等待所有评论加载完毕后,再点击右边按钮批量评论</h3></dt>').prependTo('.item_container');
        }
        // 每页内容加载到临时容器中
        temp_container.load('http://download.csdn.net/my/downloads/' + num + ' dt:contains(\'立即评价\')', function () {
            // 使用过滤器将临时容器中的项添加到项容器中
            temp_container.find('dt').each(function (index) {
                var item = $(this);
                //var item = temp_container.find('dt:eq(' + index + ')');
                //console.log(item);
                // 过滤掉已被删除的项
                if (item.is(':contains(\'[已删除]\')')) {
                    return;
                }
                // 过滤掉资源分为0的项
                else if (item.children('.marks').html() === '0') {
                    return;
                }
                else {
                    // 获取每项的连接
                    var item_url = base_url + $(item).children('a').attr('href');
                    //console.log(item_url);
                    // 获取sourceid
                    var sourceid = parseInt(item_url.substring(item_url.lastIndexOf('/') + 1));
                    //console.log(sourceid);
                    // 创建临时容器
                    $('.bor_box_1').append('<div id=\'temp_container_' + sourceid + '\' style=\'display:none;\'></div>');
                    var source_temp_container = $('#temp_container_' + sourceid);
                    $(item).find('.share').html('正在载入中...请稍候...');
                    // 获取项首页评论,填入临时容器
                    source_temp_container.load('http://download.csdn.net/index.php/comment/get_comment_data/' + sourceid + '/1?t=' + (new Date()).getTime() + ' *', function () {
                        // 从临时内容容器中获取评论项
                        var comments = new Array();
                        source_temp_container.find("dd").each(function (num, comment_item) {
                            //console.log($(comment_item).html());
                            comments.push($(comment_item).html());
                        });
                        // 移除最后一个空项
                        comments.pop();
                        // 添加评论项容器
                        if (comments.length === 0) { // 没有已有的评论，手动输入评论
                            $(item).find('.share').html('<rate_container></rate_container><input type="text" class="input_comment" title="请输入评论" value="这个资源真是挺不错的" /> <input type="checkbox" class="select_to_submit" checked="checked" title="勾选以评论" />');
                            $(item).find('.share rate_container').html('<input type="radio" class="rating" value="1" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="2" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="3" checked="checked" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="4" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="5" name="star_' + sourceid + '"/>');
                            // 应用评分插件
                            $(item).find('.rating').rating();
                        }
                        else { // 存在之前的评论，选择评论
                            $(item).find('.share').html('<rate_container></rate_container><select class="input_comment" title="请选择评论" style="width:150px;"></select> <input type="checkbox" class="select_to_submit" checked="checked" title="勾选以评论" />');
                            // 向容器中添加评分项
                            $(item).find('.share rate_container').html('<input type="radio" class="rating" value="1" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="2" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="3" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="4" name="star_' + sourceid + '"/>'
                                    + '<input type="radio" class="rating" value="5" name="star_' + sourceid + '"/>');
                            // 获取项的评分
                            var rate = parseInt(source_temp_container.find('.star_full:last').html());
                            //console.log(rate);
                            // 为评分项赋值
                            rate--;
                            //console.log(item.html());
                            $(item).find('rate_container .rating:eq(' + rate + ')').attr('checked', 'checked');
                            // 应用评分插件
                            $(item).find('.rating').rating();
                            // 向容器中添加评论
                            var select_comments = $(item).find('.share select');
                            // 逐条添加评论
                            for (var num = 0; num < comments.length; num++) {
                                select_comments.append('<option value="' + comments[num] + '">' + comments[num] + '</option>');
                            }
                            // 随机选择一条评论
                            var selected_index = new Date().getSeconds() % comments.length;
                            //console.log(selected_index);
                            $(item).find('.share option:eq(' + selected_index + ')').attr('selected', 'selected');
                        }
                        //console.log(comments.toString());
                        // 删除临时容器
                        source_temp_container.remove();
                    });
                    item_container.append(item);
                    //console.log(num);
                }
            });
        });
    }
}

// 批量提交评论
unsafeWindow.BatchPostComment = function () {
    // 判断是否没有可评论的项
    if ($('.item_container dt:not(".page_nav")').length === 0) {
        $('.item_container').append('<dt style="text-align:center;line-height:300px;"><h2 style="font-size: xx-large;">囧~现在没有可以评论的下载项呢~</h2></dt>');
        return;
    }

    // 回调次数
    var count = $('.item_container dt').has(':checkbox:checked').length;
    var time = 0;

    // 添加倒计时容器
    $('.item_container dt:first h3').remove();
    $('.item_container dt:first').append('<h3>正在批量评论中......<span class="lxftime"  lxfday="no">剩余时间</span></h3>')

    //倒计时牌
    var totaltime = (count - 1) * interval;
    var future = new Date(new Date().getTime() + totaltime).toString();
    $(".lxftime").attr('endtime', future);
    $('.item_container dt:first h3').html()
    unsafeWindow.lxfEndtime();

    // 选择复选框选中的的项,并遍历
    $('.item_container dt').has(':checkbox:checked').each(function (index) {
        var item = $(this);
        var pass = true;
        //var form = $('.cc_comment_form');

        // 获取评论文字
        var text = item.find('.input_comment');
        // 获取评分
        var rating = item.find('input[type=radio]:checked').val();

        if (text.val().length > 600) {
            alert('请精简评论内容后提交');
            pass = false;
        };

        if (rating == null) {
            alert('请为资源打分');
            pass = false;
        }

        if (text.val() == '不少于5个字') {
            text.val() = '';
        }

        if (text.val().length > 0 && text.val().replace(/[^\x00-\xff]/g, "**").length < 10) {
            //$('#cc_body_msg').html('您输入的评论不够5个字');
            pass = false;
        };

        // 基地址
        var base_url = (unsafeWindow.location.host.substring(0, 5) == 'local') ? 'http://local.downloadv3.csdn.net' : 'http://download.csdn.net';
        // 获取每项的连接
        var item_url = base_url + $(item).children('a').attr('href');
        //console.log(item_url);
        // 获取sourceid
        var sourceid = parseInt(item_url.substring(item_url.lastIndexOf('/') + 1));
        //console.log(sourceid);

        setTimeout(function () {
            if (pass) {
                $.ajax({
                    url: base_url + '/index.php/comment/post_comment',
                    data: 'sourceid=' + sourceid + '&content=' + encodeURIComponent(text.val()) + '&rating=' + rating + '&t=' + (new Date).getTime(),
                    type: 'GET',
                    beforeSend: function () {
                        //form.find('input,textarea').attr("disabled", true);
                    },
                    error: function (request) {
                        //alert(request.responseText);
                        //form.find('input,textarea').removeAttr('disabled');
                    },
                    success: function (data) {
                        if (data.succ <= 0) {
                            //alert(data.msg);
                            if (data.succ == -1) {
                                $(item).find('.share').html('您尚未登录');
                            }
                        }
                        else {
                            $(item).find('.share').html('评论成功~CSDN感谢您的评论!');
                        }
                    }
                });
            }
        }, time);
        // 增加时间
        time += interval;
    });
}

unsafeWindow.CommentAbout = function () {
    alert('Created by SharpBai.\nE-Mail:sharpbai@163.com\n人人主页:http://www.renren.com/sharpbai\n欢迎与我交流~')
}

unsafeWindow.DisablePopup = function () {

    if ($('#miaov_float_layer.float_layer div.content div.wrap p input').attr('checked') === false)
        setTimeout(function () {
            GM_setValue('popup', true);
            $('.bor_box_1 input.set_popup').attr('checked', 'checked');
        }, 0);
    else {
        if (confirm('点击确定关闭加载该提示框\n如果想批量评论，请进入下载频道 > 我的资源\n并点击 上传资源 按钮左侧的 批量评论 选项卡\n您也可以在批量评论中勾选设置再次打开提示')) {
            setTimeout(function () {
                GM_setValue('popup', false);
                $('.bor_box_1 input.set_popup').removeAttr('checked');
            }, 0);
        }
    }
    setTimeout(function () {
        //console.log(GM_getValue('popup'));
    }, 0);

}

unsafeWindow.SetPopup = function () {
    setTimeout(function () {
        if ($('.bor_box_1 input.set_popup').attr('checked') === true)
            GM_setValue('popup', true);
        else
            GM_setValue('popup', false);
        //console.log(GM_getValue('popup'));
    }, 0);
}

unsafeWindow.testQueue = function () {
    // 测试
    // 清空所有项，添加测试项
    $('.item_container dt:not(".page_nav")').remove();
    for (var num = 10000; num < 10010; num++) {
        $('.item_container').append('<dt><span class="share"><rate_container><input class="rating" type="radio" name="star_' + num + '" value="1"><input class="rating" type="radio" name="star_' + num + '" value="2"><input class="rating" type="radio" name="star_' + num + '" checked="checked" value="3"><input class="rating" type="radio" name="star_' + num + '" value="4"><input class="rating" type="radio" name="star_' + num + '" value="5"></rate_container><input class="input_comment" type="text" value="这个资源真是挺不错的" title="请输入评论"><input class="select_to_submit" type="checkbox" title="勾选以评论" checked="checked"></span><a href="/detail/chenrenhua8888/' + num + '">javascript权威指南</a><span class="marks">1</span></dt>');
        $('.item_container dt:last').find('.rating').rating();
    }


    // 判断是否没有可评论的项
    if ($('.item_container dt:not(".page_nav")').length === 0) {
        $('.item_container').append('<dt style="text-align:center;line-height:300px;"><h2 style="font-size: xx-large;">囧~现在没有可以评论的下载项呢~</h2></dt>');
        return;
    }

    
}

unsafeWindow.lxfEndtime = function () {
    $(".lxftime").each(function () {
        var lxfday = $(this).attr("lxfday"); //用来判断是否显示天数的变量
        var endtime = new Date($(this).attr("endtime")).getTime(); //取结束日期(毫秒值)
        var nowtime = new Date().getTime();        //今天的日期(毫秒值)
        var youtime = endtime - nowtime; //还有多久(毫秒值)
        var seconds = youtime / 1000;
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var CDay = days;
        var CHour = hours % 24;
        var CMinute = minutes % 60;
        var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
        if (endtime <= nowtime) {
            $('.item_container dt:first h3').html("恭喜~批量评论已完成")//如果结束日期小于当前日期就提示过期啦
        } else {
            if ($(this).attr("lxfday") == "no") {
                $(this).html("<i>剩余时间：</i><span>" + CHour + "</span>时<span>" + CMinute + "</span>分<span>" + CSecond + "</span>秒");          //输出没有天数的数据
            } else {
                $(this).html("<i>剩余时间：</i><span>" + days + "</span><em>天</em><span>" + CHour + "</span><em>时</em><span>" + CMinute + "</span><em>分</em><span>" + CSecond + "</span><em>秒</em>");          //输出有天数的数据
            }
        }
    });
    unsafeWindow.setTimeout("lxfEndtime()", 1000);
};

unsafeWindow.run();



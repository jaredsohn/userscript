// ==UserScript==
// @name           scrollbetter
// @namespace      http://
// @author         liangguohuan
// @email          liangguohuan@gmail.com
// @description    实现更好地滚动，即加大默认滚动步长达到更好浏览效果
// @mod_date       2011-01-07
// @version        2.3
// @include        http://*
// @include        https://*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// @resource imgpause  http://ubuntuone.com/4nD08q7ojR5XFywkdPgC35
// @resource imgplay  http://ubuntuone.com/6wxXYY1HoGTWBufLB7Bcw0
// ==/UserScript==

/**
* 2011-01-07: 右下角按钮鼠标经过才显示，增加快捷键 Ctrl + ~ 组合键控制滚动与否。
* 2011-12-27: 优化右下角 禁止／允许 事件，通过 bind 与 unbind 方法，而不是通过变量改变。
* 2011-12-25: 让 select,textarea 类控件正常滚动。默认步长和时间分别设置为500和300，因为滚动效果比较好。https类页面也应用滚动特效。
* 2011-12-21: 让 iframe 下内容不监听滚动事件，让编辑器正常滚动
* 2011-12-20: 修复当页面中存在iframe时，禁止／允许 按钮设置无效
* 2011-12-19: 用 $(window.top.document.body).append(...) 防止影响 iframe 里的内容 
* 2011-12-17: 在右下角添加 禁止／允许 此滚动效果的按钮设置
* 让 div 和 textarea 类似的元素,当滚动条高度大于自身内部高度时,应用自身滚动事件
* 支持热键 Ctrl + Alt + Shift + S : 显示滚动设置
* 支持热键 Ctrl + Alt + Shift + X : 隐藏滚动设置
**/

function createSetting(){
    var add_css = '\n\
    #better_scroll_div {\n\
        font-size:12px;\n\
        border:1px #ccc solid;\n\
        position: fixed;\n\
        padding:5px ;\n\
        right: 10px;\n\
        top: 0px;\n\
        -moz-border-radius: 5px;\n\
        -moz-border-radius-topleft: 0px;\n\
        -moz-border-radius-topright: 0px;\n\
        background:#eee;\n\
        z-index:100000;\n\
        display:none;\n\
    }\n\
    #better_scroll_div input {\n\
        width:50px;\n\
    }\n\
    ';
    var html = '\n\
        <div id="better_scroll_div" style="display:none">\n\
        滚动步长：<input id="better_scroll_step" type="text">\n\
        滚动时间：<input id="better_scroll_time" type="text">\n\
        平滑效果：<input id="better_scroll_flash" type="checkbox">\n\
        <input value="确定" id="better_scroll_sure" type="button">\n\
        <input value="取消" id="better_scroll_cancel" type="button">\n\
        </div>\n\
    ';
    var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = add_css;
    $('head:eq(0)').append(style);
    $(window.top.document.body).append(html);

    $('#better_scroll_sure').bind('click', function(){
        var step  = $('#better_scroll_step').val()*1;
        var time  = $('#better_scroll_time').val()*1;
        //var flash = $('#better_scroll_flash').attr('checked') ? 1 : 0;
        var flash = document.getElementById('better_scroll_flash').checked ? 1 : 0;
        //console.log('set setting:' + step + ',' + time + ',' + flash);
        GM_setValue(scrollbetterkey, step + ',' + time + ',' + flash);
        setting_hide();
    });

    $('#better_scroll_cancel').bind('click', setting_hide);
}

function get_setting_val(){
    var val = GM_getValue(scrollbetterkey, '500,300,1');
    //console.log('get_setting_val:' + val);
    eval('var re = [' + val + ']');
    return re;
}

function setting_show(){
    var arr = get_setting_val();
    var step = arr[0];
    var time = arr[1];
    var flash = arr[2];
    $('#better_scroll_div').css('top', '-' + ( $('#better_scroll_div').outerHeight() + 100 ) + 'px');
    $('#better_scroll_div').show();
    $('#better_scroll_div').animate({top:'0px'}, 300);
    $('#better_scroll_step').val(step);
    $('#better_scroll_time').val(time);
    $('#better_scroll_flash').attr('checked', true);
}

function setting_hide(){
    $('#better_scroll_div').animate({top:'-' + ( $('#better_scroll_div').outerHeight() + 100 ) + 'px'}, 300);
}

function createButtonOnOff() {
    var btn = $('<img id="imgpauseplay" src="' + GM_getResourceURL('imgplay') + '" style="cursor:pointer; opacity:0; position:fixed; z-index:100000;right:5px; bottom: 5px;" />')
            .toggle(
                function(){
                    $(btn).attr('src', GM_getResourceURL('imgpause'));
                    scrollListener(false);
                },
                function(){
                    $(btn).attr('src', GM_getResourceURL('imgplay'));
                    scrollListener(true);
                }
            )
            .hover(
                function(){
                    $(btn).stop();
                    $(btn).animate({opacity:1}, 500);
                },
                function(){
                    $(btn).stop();
                    $(btn).animate({opacity:0}, 500);
                }
            );
    $(window.top.document.body).append(btn);
}

//star handdle
var scrollbetterkey = 'scrollbetterkey2011';
createSetting();
createButtonOnOff();
GM_registerMenuCommand ('滚动浏览设置' , setting_show);

//鼠标滚动事件
var currtop = self;  //记录最顶层
scrollListener(true);

//过滤 select,textarea 滚动事件监听
$('select,textarea').hover(
    function(){
        scrollListener(false);
    },
    function(){
        scrollListener(true);
    }
);

function scrollListener(bScroll) {
    if (bScroll) {
        $('html,body').bind("DOMMouseScroll", function(event){
            if (window.top != currtop) return true;  //iframe 下内容不进行监听

            $('html,body').stop();
            var setTop;
            //var winTop = $('html,body').scrollTop(); //because sometime it's zero
            var winTop = $(window).scrollTop();
            var arr = get_setting_val();
            var step = arr[0] >= 100 ? arr[0] : 100;
            var time = arr[1];
            var flash = arr[2];
            //console.log(step + ',' + time + ',' + flash);
            if(event.detail<0){
                setTop = winTop - step; //up
            }else{
	            setTop = winTop + step; //down
            }

            if (setTop < 0) setTop = 0;

            if (flash > 0) {
                $('html,body').animate({scrollTop:setTop}, time);
            } else {
                $('html,body').scrollTop(setTop);
            }
            //delete default browse mousewheel event
            event.preventDefault();
            return false;
        });
    } else {
        $('html,body').unbind("DOMMouseScroll");
    }
}


// keycode listener
$(document).keypress(function(e)
{
    if (e.ctrlKey && e.altKey && e.shiftKey) {
        switch(e.which)
        {
            // user presses the "a"
            case 83:
                setting_show()
                break;
            case 88:
                setting_hide()
                break;
        }
    }
    else if (e.ctrlKey && (e.which == 96 || e.which == 126)) {
        $('#imgpauseplay').trigger('click');
    }
});
// ==UserScript==
// @name       12306订票成功的桌面提醒
// @namespace  http://userscripts.org/scripts/show/186711
// @author Xuefeng Li | http://xuefeng.info/
// @version    0.3
// @description  12306开启动提交功能时，会自动弹出桌面提醒窗口以提示用户已经订到票了，浏览器窗口最小化也不影响哦，工作订票两不误。
// @match      https://kyfw.12306.cn/otn/leftTicket/init*
// @copyright  2013+, Xuefeng Li
// ==/UserScript==

(function() {
    // 重载ajax方法，去掉同步标志
    // 此段代码来自：http://www.oschina.net/code/snippet_100267_27781
    var originalAjaxMethod = $.ajax;
    // 重载
    $.ajax = function() {
        // 修改async为true
        arguments[0]["async"] = true
        
        // 执行原方法
        originalAjaxMethod.apply(this, arguments);
    }
    
    var xf_notify = false;
    function notify_info(str, autoHide) {
        if( window.webkitNotifications && window.webkitNotifications.checkPermission() == 0 ) {
            
            if (!xf_notify)
            {
                var notification = window.webkitNotifications.createNotification(
                    "http://www.12306.cn/mormhweb/images/favicon.ico",
                    '订票',
                    str
                );
                xf_notify = true;
                notification.show();
                if ( autoHide ) {
                    setTimeout(function() {
                        notification.cancel();
                        xf_notify = false;
                    }, 5000);
                }
            }
        } else {
            //if (!xf_notify)
            //{
            //    alert("str");
            //}
            
        }
    }
    
    
    function init_notify() {
        if( window.webkitNotifications && window.webkitNotifications.checkPermission() == 0 ) {
            notify_info("这是提醒样式！");
        } else {
            // 请求用户开启桌面提醒
            window.webkitNotifications.requestPermission(init_notify);
            updateNotifyButtonTex();
            
        }
    }
    
    function updateNotifyButtonTex()
    {
        var btnTex = "开启桌面提醒";
        var notifyTxt = " 提示：点击左边的按钮开启桌面提醒。";
        if (window.webkitNotifications == 0) {
            btnTex = "浏览器不支持!";
            notifyTxt = " 提示：请换用Chrome等Webkit内核浏览器以支持桌面提醒功能。";
        }
        else {
            if(window.webkitNotifications.checkPermission() == 0 ) {
                btnTex="桌面提醒已开启";
                notifyTxt = " 提示：在开启自动提交功能时会自动发桌面提醒哦。";
            }
        }
        $("#notify_btn").text(btnTex);         // 更新名称
        $("#notify_func_txt").text(notifyTxt);         // 更新名称
    }
    
    function appendNotifyButton()
    {
        var btnHtml = "<a id='notify_btn' class='btn92s' href='#'></a>"; 
        var infoHtml = "<span id='notify_func_txt'></span>"; 
        
        $(".content").prepend(infoHtml);         // 添加信息组件
        $(".content").prepend(btnHtml);         // 添加按钮
        updateNotifyButtonTex();
    }
    
    
    function init_js() {
        
        appendNotifyButton();
        $("#notify_btn").css("margin","5px 5px 0"); 
        
        $("#notify_btn").click(function(){
            init_notify();
        });
        
    }
    
    init_js();
    
    function my_check_result(){
        if( $("#autoSubmit").prop("checked") == true && $("#autosubmitcheckticketinfo").css("display") != "none"){
            var nt = $("#sy_ticket_num_id strong").text();
            notify_info("订到票啦，快点确认哦！剩余车票张数："+nt, true);
        }
    }
    setInterval(my_check_result,1000);
    
    function my_keep_online(){
        $.ajax("//kyfw.12306.cn/otn/leftTicket/init");
        
    }
    setInterval(my_keep_online,300*1000);
    
    
})();
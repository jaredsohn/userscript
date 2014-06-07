// ==UserScript==
// @name           !!!!!!!!!!MIAO!!!!!!!!!!
// @namespace      https://twitter.com/hanyee
// @version        0.0.3
// @description    !!!!!!!!!!MIAO!!!!!!!!!!
// @include        http://miao.item.taobao.com/*
// @include        http://item.taobao.com/*
// ==/UserScript==
(function(){
    var refreshed = /[9,14,19]:5[8,9]:[0-9]{2}/.test(new Date().toTimeString()), running = false;
    function createNotification () {
        if (window.webkitNotifications) {
            if (window.webkitNotifications.checkPermission() == 0) {
                console.log('has permission');
                var notification = window.webkitNotifications.createNotification("http://tp4.sinaimg.cn/1640123495/50/1.jpg", "爵之温馨提醒您：秒杀即将开始!", "Are You Ready!!");
                notification.onshow = function () { window.setTimeout(notification.cancel(), 5000);};
                notification.show();
            } else {
                console.log('has not permission');
                window.webkitNotifications.requestPermission();
                window.webkitNotifications.requestPermission(createNotification);
            }
        }
    }

    function miao (){
        var t = new Date().toTimeString(), flag = /[9,14,19]:58:[0-9]{2}/.test(t);
        if (flag && !running) {
            if(!refreshed) window.location.reload();
            else {
                createNotification();
                var lighting = window.setInterval(function () {
                    try {
                        var root = document.getElementById("J_SecKill"),
                            btn = root.getElementsByClassName('J_RefreshStatus')[0];
                        if (btn && btn.click) btn.click();
                        console.log('give me good luck please!');
                        // auto focus && press enter to submit
                        var input = root.getElementsByClassName('answer-input')[0],
                            subbtn = root.getElementsByClassName('J_Submit')[0];
                        if(input) input.focus() && input.click() && input.addEventListener('keydown',function(e){
                            if(e.keyCode==13 && subbtn) {
                                subbtn.click();
                                if(subbtn.form && subbtn.form.submit) subbtn.form.submit();
                            }
                        },false);

                    } catch (e) {}
                }, 5);
                running = true;
                window.setTimeout(function () {
                    window.clearInterval(lighting);
                    running = false;
                }, 3 * 60 * 1000);
            }
        }
        console.log(flag?'miao timing!':'waiting........ it\'s '+ t);
    }

    webkitNotifications.requestPermission(createNotification);
    miao();
    var tick = window.setInterval(miao, 6*10000);

    window.setTimeout(function(){
        window.clearInterval(tick);
    },5*24*60*60*1000);
    window.webkitNotifications.requestPermission(createNotification);
    console.log('miao initialization completed!');
})();
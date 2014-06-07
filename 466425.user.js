// ==UserScript==
// @name  饭否免刷新显示无限多新消息 Fanfou Show Unlimited New Messages Without Refresh
// @author HackMyBrain
// @version 1.0.1
// @description 免刷新饭否首页, 去掉显示多于19条新消息需要刷新的限制
// @create 2013-07-21
// @include http://fanfou.com/home
// @homepage http://userscripts.org/scripts/show/466425
// @downloadURL    https://userscripts.org/scripts/source/466425.user.js
// @updateURL   https://userscripts.org/scripts/source/466425.meta.js
// ==/UserScript==


(function (){
    var original_title = document.title;
    var count = document.getElementById("timeline-count");
    var noti = document.getElementById("timeline-notification");
    var buffereds = document.getElementsByClassName("buffered");

    function updateTime(){
        var time = new Date().getTime();
        var gap_s, gap_m, gap_h;
        var datestring;
        var stime_list = document.querySelectorAll("[stime]");
        for(var i = 0, l = stime_list.length; i < l; i++){
            if (stime_list[i].innerHTML != stime_list[i].title){
                datestring = stime_list[i].getAttribute("stime");
                gap_s = (time - Date.parse(datestring)) / 1000;
                if (gap_s < 60){
                    stime_list[i].innerHTML = gap_s.toFixed() + " 秒前";
                } else if (60 <= gap_s && gap_s < 3600){
                    gap_m = gap_s / 60;
                    stime_list[i].innerHTML = gap_m.toFixed() + " 分钟前";
                } else if (3600 <= gap_s && gap_s < 86400){
                    gap_h = gap_s / 3600;
                    stime_list[i].innerHTML = "约 " + gap_h.toFixed() + " 小时前";
                } else {
                    stime_list[i].innerHTML = stime_list[i].title;
                }
            }
            else return;
        }
    }

    function showBuffered(e){
        updateTime();
        while(buffereds.length > 0){
            buffereds[0].removeAttribute("class");
        }
        e.stopPropagation();
        e.preventDefault();
        noti.style.display = "none";
        document.title = original_title;
        count.innerHTML = 0;
    }

    noti.addEventListener('click', showBuffered, true);
})()
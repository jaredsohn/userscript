// ==UserScript==
// @name       EveServerStatus for SinaWeiboV5
// @author     Naka
// @namespace  http://weibo.com/nauni
// @version    1.0
// @description  For SinaWeibo V5 ONLY
// @include    http://weibo.com/*
// @require    http://appstack.sinaapp.com/static/jquery.min.js
// ==/UserScript==

function showMessage(data){
    var obj = $(".WB_right_tips.S_line2");
    obj.html(data);
};
function outPutStatus(data){
    var result = '<p class="picon">';
    result += '<a>   EVE服务器状态监视器：</a>';
    result += '<p><a>';
    result += '国服在线：'+data.sr;
    result += '</a>';
    if(data.sr>data.tq)
        result +='  <span class="icon_rthot"></span>';
    result += '</p>';
    result += '<p><a>';
    result += '欧服在线：'+data.tq;
    result += '</a>';
    if(data.tq>data.sr)
        result +='  <span class="icon_rthot"></span>';
    result += '</p>';
    var obj = $(".WB_right_tips.S_line2");
    obj.css("background","url(http://bbs.eve-china.com/favicon.ico)");
    obj.css("background-repeat","no-repeat");
    obj.css("background-position-x","right");
    obj.css("background-position-y","bottom");
    obj.html(result);
};
function requestServerStatus() {
    showMessage('Requesting...');
    $.get("http://cem.copyliu.org/serverStatus",
          updateServerStatus,
          "text"
         );
    function updateServerStatus(data){
        data = data.substr(1,data.length-3);
        var result = JSON.parse(data);
        outPutStatus(result);
    };
    
};
setTimeout(requestServerStatus(),3);
//$(document).ready(requestServerStatus);
//setInterval(function(){requestServerStatus()}, 5000);
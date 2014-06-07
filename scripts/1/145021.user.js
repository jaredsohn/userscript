// ==UserScript==
// @name       EveServerStatus for ECF
// @author     Naka
// @namespace  http://weibo.com/nauni
// @version    1.0
// @description  For ECF forums ONLY
// @include    http://bbs.eve-china.com/*
// @require    http://appstack.sinaapp.com/static/jquery.min.js
// ==/UserScript==

function init(){
    var obj = $("#append_parent");
    obj.before('<div id="serverStatus"></div>');
};
function outPutStatus(data){
    var result = '<p class="picon">';
    result += '<a>   EVE服务器状态监视器：</a>';
    result += '<p><a>';
    result += '国服在线：'+data.sr;
    result += '</a>';
    result += '</p>';
    result += '<p><a>';
    result += '欧服在线：'+data.tq;
    result += '</a>';
    result += '</p>';
    var obj = $("#serverStatus");
    obj.css("left","200px");
    obj.css("top","19px");
    obj.css("position","absolute");
    obj.css("height","64px");
    obj.css("width","190px");
    obj.css("background-color","#E6E6E6");
    obj.prepend(result);
};
function requestServerStatus() {
    init();
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
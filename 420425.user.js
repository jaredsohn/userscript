// ==UserScript==
// @name       用html5audio替换传统wmp播放器
// @namespace  http://weibo.com/monsm
// @version    0.1
// @description  用html5audio替换传统wmp播放器
// @match      http://www.sxradio.com.cn/*
// @copyright  2014+, Monsm
// ==/UserScript==


var object = document.getElementById("MediaPlayer");
var gcy = document.getElementById("gcy");
var params = object.getElementsByTagName("param");
var msg = "";
for (var i = 0; i < params.length; i++) {
    if(params[i].getAttribute("name")=='filename'){msg = params[i].getAttribute("value");}        
}
var url = msg;
var code_str =      
    //" <audio src=\""+url+"\" " + " controls=\"true\" " + " autoplay=\"true\""+ "></audio> ";
      "<audio controls=\"controls\" autoplay loop > <source src=\""+url+"\" type=\"audio/wma\" /></audio>"
                

object.parentNode.removeChild(object);
gcy.innerHTML = code_str;

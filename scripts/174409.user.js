// ==UserScript==
// @name          Remove google search redirect
// @description   去除google搜索结果中的URL转向。
// @namespace     http://www.jznote.com/
// @homepage      http://userscripts.org/scripts/show/174409
// @updateURL     http://userscripts.org/scripts/source/174409.user.js
// @version       1.0
// @match         http://www.google.com/*
// @match         https://www.google.com/*
// @match         http://www.google.com.hk/*
// @match         https://www.google.com.hk/*
// ==/UserScript==
//=======START=======
var isChrome = navigator.userAgent.indexOf("AppleWebKit") != -1;
var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
var url = window.location.href.toLowerCase(); 
function beginExecute() {
  var all = document.querySelectorAll("#ires a"), href = "", onMouseDown="", i = 0, sum_i = all.length, p = [], j = 0, sum_j = 0, _href = "";
  for (i; i < sum_i; i++) { 
    href = all[i].getAttribute("href");
    onMouseDown = all[i].getAttribute("onmousedown");
    if (onMouseDown) {
      all[i].setAttribute("onmousedown", "");
    }
    if(href.indexOf("url?")>-1){
      p = href.split("&");
      sum_j = p.length;
      for (j; j<sum_j; j++) {
        if (p[j].indexOf("url=")>-1) {
          _href = decodeURIComponent(p[j].split("=")[1]);
          all[i].setAttribute("href", _href);
        }
      }
    }
  }
}
if (url.indexOf("www.google.com.hk") >= 0 || url.indexOf("www.google.com") >= 0 || url.indexOf("/search") >= 0 || url.indexOf("/url") >= 0) { 
  if (!isChrome && !isFirefox) {
    alert("很抱歉，未能识别您的浏览器，或您的浏览器尚不支持脚本运行，请使用Firefox或Chrome浏览器！\n如果您运行的是Maxthon3，请确认当前页面运行在高速模式而不是兼容模式下 :-)");
  } else if (isFirefox && "undefined"===typeof(GM_notification)) {
    alert("很抱歉，本脚本需要最新的Scriptish扩展、不支持GreaseMonkey，请禁用您的GreaseMonkey扩展并安装Scriptish！");
    window.open("https://addons.mozilla.org/zh-CN/firefox/addon/scriptish/");
  } else {
    window.onload = beginExecute();
  }
}

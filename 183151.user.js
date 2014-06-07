// ==UserScript==
// @name       baidu voice search
// @namespace  www.wangdongjie.com
// @version    1.0.5
// @description  为百度添加语音搜索功能，支持chrome内核浏览器，推荐Chrome
// @updateURL https://userscripts.org/scripts/source/183151.meta.js
// @downloadURL https://userscripts.org/scripts/source/183151.user.js
// @include http://*.baidu.com/*
// @include http://www.hao123.com/*
// @include chrome://newtab/
// @include liebao://newtab/
// @exclude http://tieba.baidu.com/*
// @exclude http://music.baidu.com/*
// @exclude http://v.baidu.com/*
// @exclude http://jingyan.baidu.com/*
// @exclude http://baike.baidu.com/*
// @author wangdongjie
// @copyright  2013+, wangdongjie
// ==/UserScript==
/*
 * homepage http://www.wangdongjie.com
 * 
 * Email wangdongjie0101@163.com
 * 
 * 感谢
 * http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
 * http://code.jquery.com/jquery-latest.min.js
*/

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQ("input[name='wd'],input[name='word'],input[name='searchinput']").attr("x-webkit-speech","true")

}

addJQuery(main);
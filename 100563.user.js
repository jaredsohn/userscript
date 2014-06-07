(function () {
// ==UserScript==
// @name           Bing Cloud Dictionary Widget
// @namespace      http://www.tianyicui.com
// @author         Tianyi Cui
// @description    Bing English-Chinese Cloud Dictionary Widget
// @version        0.1
// @include        *
// ==/UserScript==

var scr = document.createElement('script');
scr.src = 'http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Selection.js';
scr.onload = function(){
    location.href = "javascript:void(BingCW.Init({AppID:'Chrome Extension', MachineTranslation:true, WebDefinition:true}))";
}

var head = document.getElementsByTagName('head')[0];
head.appendChild(scr);

})();

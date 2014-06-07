// ==UserScript==
// @name           BlogBus自动匿名评论
// @namespace      blogbus
// @author         pc360
// @copyright      2013,pc360
// @description    auto comment in blogbus
// @version        2013.01.23
// @website        http://www.pc360.net
// @include        http://www.pc360.net
// ==/UserScript==
 
(function() {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.appendChild(document.createTextNode("(" + function () {
        function hotkey() {
            var a=window.event.keyCode;
            if((a==65)&&(event.altKey)) {
                if(    window.anoy_mode()){}
                if(    document.getElementById('cname').value                = 'pc360'){}
                if(    document.getElementById('cemail').value                = '945913581@qq.com'){}
                if(    document.getElementById('chomepage').value            = 'http://www.pc360.net'){}
                if(    document.getElementsByName('content')[0].value        = '加油吧！'){}
                if(    document.getElementsByName('addsub')[0].click()){}
            }
        }
        document.onkeydown = hotkey;
    } + "());"))
    head.appendChild(script);
}());
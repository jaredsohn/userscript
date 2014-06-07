// ==UserScript==
// @name           修复百度贴吧中键功能
// @namespace      http://www.czcp.co.cc/archives/193
// @author         zbinlin
// @homepage       http://www.czcp.co.cc
// @version        0.0.3
// @description    修复当 middlemouse.paste 为 true 时，百度贴吧中键打开链接失效
// @include        http://tieba.baidu.com/f?*
// ==/UserScript==

var FixMiddleClick = {
    handleEvent: function (e) {
        if (!e.target || e.target.localName != "a" || e.button != 1
            || e.href == "") return;
        e.preventDefault();
        GM_openInTab(e.target);
    },
    init: function () {
        document.addEventListener("click", this, false);

        document.addEventListener("unload", function (e) {
            document.removeEventListener("click", this, false);
            document.removeEventListener("unload", argument.callee, false);
        }, false);
    }
}
FixMiddleClick.init();

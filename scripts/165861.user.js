// ==UserScript==
// @name	亮度调节修改版的修改版 by xplsy
// @namespace	com.mozest.keijack
// @author	Keijack
// @version	1.0.0
// @description	减低页面的亮度，在黑暗中查看页面有助于保护眼睛，快捷键：Alt+上/下调节亮度，Alt+F5开关遮罩
// @updateURL	https://userscripts.org/scripts/source/154910.meta.js
// @downloadURL	https://userscripts.org/scripts/source/154910.user.js
// @include	*
// ==/UserScript==
var brightness = localStorage["brightness"]||0.15, cover = null, delta = .05;

// 遮盖显示方法
function showCover() {
    if (brightness < 0) {
        if (cover) cover.style.display = "none";
        return;
    }
    if (!cover) {
        cover = document.createElement("div");
        cover.setAttribute("style", "position:fixed;top:0;left:0;width:0;height:0;outline:3000px solid;z-index:999;");
        document.body.appendChild(cover);
    } else cover.style.display = "";
    cover.style.outlineColor = "rgba(0,0,0," + brightness + ")";
}

// 增加事件处理
window.addEventListener("keydown", function(e) {
    if (e.altKey && e.keyCode == 116) {	// alt + F5, 打开/关闭遮罩
        showCover(brightness = -brightness);
    } else {
        if (brightness < 0) return;
        if (e.altKey && e.keyCode == 38) {	// alt + UP：变亮
            if (brightness - delta > 0) showCover(brightness -= delta);
        } else if (e.altKey && e.keyCode == 40) {	// alt + DOWN：变暗
            if (brightness + delta < 1) showCover(brightness += delta);
        }
    }
    localStorage["brightness"]=brightness;
}, false);
showCover();
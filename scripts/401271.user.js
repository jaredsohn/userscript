// ==UserScript==
// @name       Relocate WebQQ_Smart UI
// @namespace  FireAway-剑仙乘仙剑
// @version    0.1
// @description  把窗口放在边边上
// @updateURL          http://userscripts.org/scripts/source/401271.meta.js
// @downloadURL      http://userscripts.org/scripts/source/401271.user.js
// @match      http://w.qq.com/
// @copyright  FireAway
// @run-at     document-start
// ==/UserScript==

var script = document.createElement("script");
script.setAttribute("language", "javascript");
script.innerHTML = "\
var _IsMousedown = 0; \
var _ClickLeft = 0; \
var _ClickTop = 0; \
\
function moveInit(obj) { \
_IsMousedown = 1; \
if (getBrowserType() == 'NSupport') { \
return; \
} \
if (getBrowserType() == 'Netscape') { \
_ClickLeft = evt.pageX - parseInt(obj.style.left); \
_ClickTop = evt.pageY - parseInt(obj.style.top); \
} else { \
_ClickLeft = evt.x - parseInt(obj.style.left); \
_ClickTop = evt.y - parseInt(obj.style.top); \
} \
} \
\
function Move(obj) { \
if (_IsMousedown == 0) { \
return; \
} \
if (getBrowserType() == 'Netscape') { \
obj.style.left = evt.pageX - _ClickLeft; \
obj.style.top = evt.pageY - _ClickTop; \
} else { \
obj.style.left = evt.x - _ClickLeft; \
obj.style.top = evt.y - _ClickTop; \
} \
} \
\
function stopMove() { \
_IsMousedown = 0; \
} \
\
function getBrowserType() { \
var browser = navigator.appName \
var b_version = navigator.appVersion \
var version = parseFloat(b_version) \
if ((browser == 'Netscape')) { \
return 'Netscape'; \
} else if (browser == 'Microsoft Internet Explorer') { \
if (version >= 4) { \
return 'ie4+'; \
} else { \
return 'ie4-'; \
} \
} else { \
return 'NSupport'; \
} \
} \
";

document.getElementsByClassName("wrap")[0].appendChild(script);


var container = document.getElementById("container");
container.style.position = "absolute";
container.style.left = "270px";

var main_container = document.getElementById("main_container");
main_container.style.position = "absolute";
main_container.style.right = "0px";
main_container.addEventListener("mouseover", ini, false);

function ini() {
    var current_chat_list = document.getElementById("current_chat_list");
    current_chat_list.addEventListener("click", ini2(), false);
}

function ini2() {
    main_container.removeEventListener("mouseover", ini, false);
    var interval = self.setInterval(function() {
        if (document.getElementById("panelHeader-5")) {
            var panelTitle = document.getElementById("panelHeader-5");
            
            panelTitle.setAttribute("onmousedown", "moveInit(this, event)");
            panelTitle.setAttribute("onmousemove", "Move(this, event)");
            panelTitle.setAttribute("onmouseup", "stopMove()");
            panelTitle.setAttribute("onmouseout", "stopMove()");
            
            document.getElementById("current_chat_list").removeEventListener("click", ini2, false);
            
            window.clearInterval(interval);
        }
    }, 500);
}

// ==UserScript==
// @name            KanColleOpenChildWindow - 艦これ 子窗口开启工具
// @author          magami
// @weibo           http://weibo.com/galstars
// @namespace       http://userscripts.org/scripts/show/177464
// @description     艦これ 开启子窗口的工具，因为直接用网页地址新开窗口会导致前一个窗口的游戏掉线，所以做了这个，很简单的东西，你也可以自己找到游戏的.swf地址打开
// @version         1.0.0
// @include         http://osapi.dmm.com/gadgets/*
// @updateURL       http://userscripts.org/scripts/source/177464.meta.js
// @downloadURL     http://userscripts.org/scripts/source/177464.user.js
//
// ==/UserScript==

(function () {
    function showGameFlashLink() {
        var flashWrap_dom = document.getElementById("flashWrap");
        if (flashWrap_dom) {
            var flash_dom = document.getElementById("externalswf");
            if (flash_dom) {
                var flash_url = flash_dom.src;
                if (flash_url) {
                    var gameFlashLinkDiv = document.getElementById("gameFlashLinkBody");
                    if (!gameFlashLinkDiv) {
                        gameFlashLinkDiv = document.createElement("div");
                        gameFlashLinkDiv.id = "gameFlashLinkBody";
                        gameFlashLinkDiv.style.lineHeight = "20px";
                        insertAfter(gameFlashLinkDiv, flashWrap_dom);
                    }
                    gameFlashLinkDiv.innerHTML = '<a href="' + flash_url + '" target="_blank">打开新窗口</a>';
                }
            }
        }
        setTimeout(showGameFlashLink, 1000);
    }
    showGameFlashLink();

    function insertAfter(newEl, targetEl) {
        var parentEl = targetEl.parentNode;
        if (parentEl.lastChild == targetEl) {
            parentEl.appendChild(newEl);
        } else {
            parentEl.insertBefore(newEl, targetEl.nextSibling);
        }
    }
})();
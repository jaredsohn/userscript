// ==UserScript==
// @name           pixiv_show_comment
// @version        1.0
// @namespace      http://userscripts.org/users/438377
// @author         henge
// @description    pixivのイラストページのコメントを自動で表示します
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @run-at         document-end
// ==/UserScript==

setTimeout(show, 500);
var count = 3;

function show() {
    button = document.getElementsByClassName('comment-show-button')[0];
    display = getComputedStyle(button, '').display;
    if (display == "block") {
        button.click();
        count = 3;
        setTimeout(more, 500);
    } else if (--count > 0) {
        setTimeout(show, 500);
    }
}

function more() {
    button = document.getElementsByClassName('comment-more-button')[0];
    display = getComputedStyle(button, '').display;
    if (display == "block") {
        button.click();
        count = 3;
        setTimeout(more, 500);
    } else if (--count > 0) {
        setTimeout(more, 500);
    }
}

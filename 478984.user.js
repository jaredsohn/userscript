// ==UserScript==
// @name        暴漫回复 ctrl enter
// @namespace   mailto:tusooa@vista.aero
// @include     http://baozoumanhua.com/articles/*
// @version     1
// @grant       none
// ==/UserScript==
function handleCtrlEnter(e) {
    e = e || window.event;
    // 提供对回复评论的支持。
    if (e.target.nodeName == 'TEXTAREA' && e.target.getAttribute('class') == 'comment_input') {
        //alert('here'); 
        if (e.ctrlKey && e.keyCode == 13) {
            ((e.target.parentNode.parentNode.getElementsByClassName('upload_pic')) [0].getElementsByClassName('comment_submit')) [0].click();
        }
    }
}
document.addEventListener('keyup', handleCtrlEnter, false);

// ==UserScript==
// @name		印象笔记去广告|Evernote/Yinxiang Promotions Remover
// @namespace		http://www.webmaster.me
// @version		1.1
// @create		2013-11-17
// @lastmodified	2013-11-17
// @description		去除印象笔记左侧的广告框，提供更大的操作空间|Remove Promotions&Ads from Evernote Web and YinXiang Web
// @updateURL		https://userscripts.org/scripts/source/183149.meta.js
// @downloadURL		https://userscripts.org/scripts/source/183149.user.js
// @match		https://app.yinxiang.com/Home.action*
// @match		https://www.evernote.com/Home.action*
// @copyright		2013+, script@webmaster.me
// @run-at		document-end
// ==/UserScript==
var timer,counter = 0;
function removeprom() {
    var prombtm = $("#gwt-debug-navigationScroller").parent().css("bottom");
    if(prombtm != undefined && prombtm != "0px") {
        $('#gwt-debug-ad').parent().remove();
        $("#gwt-debug-navigationScroller").parent().css("bottom", "0px");       
        clearInterval(timer);
    }
    counter++;
    if (counter > 10)	clearInterval(timer);
}
window.addEventListener("DOMContentLoaded", function () {
    timer = setInterval(removeprom, 800);
}, true);

GM_addStyle( "#gwt-debug-ad{ display:none}");
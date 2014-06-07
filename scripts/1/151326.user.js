// ==UserScript==
// @name         OnlineDown No 5s Ad / 华军去 5s 广告
// @namespace    onlinedown.no.code
// @version      0.1
// @description  华军去 5s 广告
// @match        *onlinedown.net/softdown/*.htm
// @copyright    jixun66 - http://jixun.org/
// @run-at       document-start
// ==/UserScript==

document.onreadystatechange = function () { if (document.readyState == "interactive") { try {
    // unsafeWindow.CustomDefinedAjaxOnkeyup(1);
    // 验证码已经消失，替换成了 5s 广告。
    
    // 清理广告
    function removeElement (elementNode) { if (!elementNode) { return }; elementNode.parentNode.removeChild (elementNode); }
    
    var d = document;
    removeElement (d.querySelector ('div#box'));
    removeElement (d.querySelector ('div#cover'));
    removeElement (d.querySelector ('div.right'));
    removeElement (d.querySelector ('div.idczone'));
    removeElement (d.querySelectorAll ('div.downbody')[1]);
	d.querySelector ('div#ft').style.marginTop = '20px';
} catch (e) {alert (e + "\r\n 请将该问题反馈给作者于 jixun.org，谢谢。");}}}
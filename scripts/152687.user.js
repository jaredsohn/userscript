// ==UserScript==
// @name         4399 Flash Real address finder / 4399 Flash 真实地址解析
// @namespace    http://jixun.org/
// @version      0.1
// @description  Replace the link of button Download.
// @include      *://4399.*/flash/*_*.htm
// @include      *://*.4399.*/flash/*_*.htm
// @copyright    2012+, jixun66
// ==/UserScript==

(function () { try {
    try { var link = unsafeWindow.webServer + unsafeWindow.str1; 
          var down_btn = document.getElementById ('down_a');
        } catch (e) { return; /* Do Nothing */ }
    
    down_btn.removeAttribute ('onclick');
    down_btn.target = '_blank';
    down_btn.textContent = '右键另存';
    down_btn.href = link;
} catch (e) {
    prompt('脚本执行发生错误，请报告给 http://jixun.org/ 下列信息：\n\n' + e,
           '错误发生于地址: ' + document.location.toString());
}})();
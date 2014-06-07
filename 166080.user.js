// ==UserScript==
// @name         精易自动签到脚本
// @namespace    http://jixun.org/
// @version      1.0
// @description  自动签到

/* 当前域名 */
// @include      *://bbs.125.la/plugin.php?id=dsu_paulsign:sign

/* 不知道到时候会不会换回来下面这个域名 */
// @include      *://3600gz.cn/plugin.php?id=dsu_paulsign:sign

// @copyright    2012+, Jixun.Org // Jixun67 // 精易 - jixun66
// @run-at       document-end
// ==/UserScript==




// 查询所有可点的元素
var ticks = document.querySelectorAll ('input[type="radio"][name="todaysay"]');
// console.log ('query :: ', ticks);

// 随机选取一个并勾上
var eCurrent = (ticks[Math.round(Math.random() * ticks.length)]);
console.log ('current :: ', eCurrent);
eCurrent.checked = true;

// 寻找表单并提交，如果没找到则退不提交 (签到后会回到同一页面，防止执行错误)
var qdForm = document.querySelector ('form[name="qiandao"]');
console.log ('submit :: ', qdForm);
if (qdForm)
    qdForm.submit();
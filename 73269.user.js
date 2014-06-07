// ==UserScript==
// @name            HDChina.Auto.Thanks
// @namespace       HDChina.Auto.Thanks
// @description     浏览 HDChina.org 资源详情页面时使用 AJAX 方式在后台自动感谢发布者。如果您觉得这不足以表达谢意，请使用奖励积分功能。
// @match           http://hdchina.org/details.php*
// @match           https://hdchina.org/details.php*
// ==/UserScript==

(function() {
	var btn;
	(btn=document.getElementById('thanksbutton'))&&(btn.click());
})();
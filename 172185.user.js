// ==UserScript==
// @name        随手记辅助工具
// @namespace   qiangtou.weibo.com
// @description 随手记金额和备注输入框输入后互相切换焦点
// @include     http://money.feidee.com/*/tally/new.do
// @updateURL   https://userscripts.org/scripts/source/172185.meta.js
// @downloadURL https://userscripts.org/scripts/source/172185.user.js
// @grant       none
// @version     20130629
// ==/UserScript==

/**
*http://money.feidee.com
*随手记网站本身引入了Jquery,可以直接使用了
*/
(function () {
        //切换焦点函数
	var toggleFocus = function (obj, focusObj) {
		obj.keyup(function (e) {
			var c = e.keyCode;
			if (c === 13) {
				focusObj.focus();
			}
		});
                //返回本函数，以支持链式调用
		return arguments.callee;
	}
        //真正做事情了
	var remark = $('#tb-memo');
	var m = $('#tb-outMoney-1');
	toggleFocus(m, remark)(remark, m);
})();
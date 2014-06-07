// ==UserScript==
// @name         自动跳转到简体中文的维基百科
// @namespace    http://userscripts.org/users/92143
// @version      2.0
// @description  从搜索引擎结果或非中文的维基百科进入中文的维基百科(Wikipedia)条目时重定向至简体中文版本
// @include      /^https?\:\/\/zh\.wikipedia\.org\/(wiki|zh(\-(?!cn\/)\w+)?)\//
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-start
// ==/UserScript==

location.replace(
	location.href.replace(/\:\/\/zh\.wikipedia\.org\/(?!zh\-cn\/)[^\/]+/, '://zh.wikipedia.org/zh-cn')
)

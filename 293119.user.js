// ==UserScript==
// @name 哔哩哔哩生肉隐藏
// @namespace  http://weibo.com/zheung
// @version    0.2
// @description  如题
// @updateURL https://userscripts.org/scripts/source/293119.meta.js
// @downloadURL https://userscripts.org/scripts/source/293119.user.js
// @match http://www.bilibili.tv/video/bangumi-two-*.html
// @include http://www.bilibili.tv/video/bangumi-two-*.html
// @include http://bilibili.kankanews.com/video/bangumi-two-*.html
// @copyright  DanoRtn
// ==/UserScript==

var otitle = document.querySelectorAll(".vd_list li.l2 .title");

for(i=0;i<otitle.length;i++)
	if(otitle[i].innerHTML.indexOf("生肉") != -1)
		otitle[i].parentNode.style.display = "none";
// ==UserScript==
// @name        新浪秀场自动投票
// @namespace   http://userscripts.org/users/softiger
// @description 为新浪主播自动投票。
// @author      softiger
// @downloadURL https://userscripts.org/scripts/source/185920.user.js
// @updateURL   https://userscripts.org/scripts/source/185920.meta.js
// @include     http://ok.sina.com.cn/9*
// @version     0.1
// @grant       none
// @history     0.1 Initial release.
// ==/UserScript==

setInterval(function(){sendVoteInfo()},310000);

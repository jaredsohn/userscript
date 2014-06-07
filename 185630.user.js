1// ==UserScript==
// @name         Direct Baidu
// @namespace    http://userscripts.org/users/92143
// @version      0.2
// @description  不用点击继续访问您选择的百度结果
// @include      /^http\:\/\/www\.baidu\.com\/search\/ressafe\.html\?.*\&url\=/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-start
// ==/UserScript==

var u = location.href.split('&url=')[1]
if(u) {
	location.replace(u)
}

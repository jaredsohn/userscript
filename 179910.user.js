// ==UserScript==
// @name         Tieba jQuery UI
// @namespace    http://userscripts.org/users/92143
// @version      0.1
// @description  修复百度贴吧由jQuery UI缺失所导致的无法设置头衔等问题(错误信息样例：Uncaught TypeError: Object [object Object] has no method 'draggable')
// @include      /^http\:\/\/tieba.baidu.com\/f\/like\/manage\/gradetitle\?/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-end
// ==/UserScript==

var s = document.createElement('script')
s.type = 'text/javascript'
s.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js'
document.body.appendChild(s)

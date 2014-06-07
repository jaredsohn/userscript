// ==UserScript==
// @name         维基百科中英日语言链接排序
// @namespace    http://userscripts.org/users/92143
// @version      0.4
// @description  将维基百科的中文版链接放在第一位，英文版链接放在第二位，日语版链接放在第三位
// @include      /^https?\:\/\/([^\.]+\.)?wik(ipedia|tionary)\.org/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-start
// ==/UserScript==

var LANG_ARRAY = ['li.interwiki-zh', 'li.interwiki-en', 'li.interwiki-ja']
var isReordered = false

function reorder() {
	
	if(isReordered) {
		return
	}
	isReordered = true
	
	var i = LANG_ARRAY.length - 1
	for(; i > -1; i--) {
		$(LANG_ARRAY[i]).each(function() {
			$(this).prependTo($(this).parent())
		})
	}
	
}

$(document).one('DOMNodeInserted', '#p-lang', function(event) {
	reorder()
})
//last resort
$(document).one('DOMContentLoaded', function(event) {
	reorder()
})

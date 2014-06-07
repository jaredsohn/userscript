// ==UserScript==
// @name         DMHY Torrent Search
// @namespace    http://userscripts.org/users/92143
// @version      0.1
// @description  在动漫花园资源网“從谷歌搜索資源種子”后添加一个不用登入就可直接下载torrent文件的Torrage链接（太冷门的可能找不到）
// @include      /^http\:\/\/share\.dmhy\.org\/topics\/view\//
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

$('a[href^="http://www.google.com/search?"]:first').each(function() {
	var hash = $(this).attr('href').split('q=')[1].toUpperCase()
	$(this).after('&nbsp;<a href="http://torrage.com/torrent/' + hash + 
		'.torrent" target="_blank">Torrage</a>')
})

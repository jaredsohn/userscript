// ==UserScript==
// @id             qidian_download_helper
// @name           qidianDownloadHelper
// @version        1.0.2
// @namespace      http://userscripts.org/users/Harv
// @author         Harv
// @description    起点小说下载助手
// @include        http://www.qidian.com/Book/*
// @include        http://www.qdmm.com/MMWeb/*
// @include        http://www.qdwenxue.com/Book/*
// @updateURL      https://userscripts.org/scripts/source/122694.meta.js
// @run-at         document-end
// ==/UserScript==

/* History
 * 2012.1.10 v1.0.2 增加对起点女生网和文学网的支持
 * 2012.1.10 v1.0.1 修正编码问题
 * 2012.1.9 v1.0.0 第一个版本
 */

(function() {
	var tabs = document.querySelector('.tabs ul');
	var li = document.createElement('li');
	li.className = 'notab nohid';

	var div = document.createElement('div');
	with(div) {
		className = 'sc';
		var a =  document.createElement('a');
		a.className = 'scd';
		a.href = 'javascript:;';
		a.innerHTML = '下载';
		appendChild(a);

		var ul = document.createElement('ul');
		ul.className = 'scmenu';
		var list = ['txt', 'apk', 'epub', 'chm', 'umd'];
		var number = document.location.pathname.match(/\d+/);
		with(ul) {
			for(var i = 0; i < list.length; i++) {
				var lili = document.createElement('li');
				var aa = document.createElement('a');
				if(list[i] == 'txt')
					aa.href = 'http://download.qidian.com/pda/' + number + '.' + list[i];
				else
					aa.href = 'http://download.qidian.com/' + list[i] + '/' + number + '.' + list[i];
				aa.innerHTML = list[i];
				lili.appendChild(aa);
				appendChild(lili);
			}
		}
		appendChild(ul);
	}

	li.appendChild(div);

	tabs.appendChild(li);

	if(!/qidian\.com/.test(document.location.href))
		GM_addStyle(<><![CDATA[
#book_home .bookshow .book_info .tabs {
	overflow: visible !important;
}
#book_home .bookshow .book_info .tabs ul li.notab {
	float: left;
	height: 90%;
	line-height: 21px;
	overflow: hidden;
}
#book_home .bookshow .book_info .tabs ul li.nohid {
    overflow: visible;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc {
    background-color: Transparent;
    float: left;
    overflow: visible;
    position: relative;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc a {
    background-color: Transparent;
    background-image: none;
    border-width: 0;
    display: block;
    float: left;
    height: 21px;
    line-height: 21px;
    overflow: visible;
    padding: 0;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc a.scd {
	background-color: #EEEEEE;
    border: 1px solid #CCCCCC;    
    color: #000000;
    height: auto;
    outline: 0 none;
    overflow: visible;
    padding: 0 12px;
    position: relative;
    z-index: 999;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc ul.scmenu {
	background-color: #EEEEEE;
    border: 1px solid #CCCCCC;    
    display: none;
    height: auto;
    left: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 21px;
    width: 120px;
    z-index: 998;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc ul.scmenu li {
    display: block;
    float: none;
    height: auto;
    margin: 0;
    padding: 0;
    text-align: center;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc ul.scmenu li a {
    border-width: 0;
    float: none;
    padding: 3px;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc ul.scmenu li a:hover {
    background-color: #CECECE;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc:hover ul.scmenu {
    display: block;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc:hover a.scd {
    border-bottom-width: 0;
}
			
]]></>.toString());

if(/qdmm\.com/.test(document.location.href))
	GM_addStyle(<><![CDATA[
#book_home .bookshow .book_info .tabs ul li.notab div.sc a.scd {
    background: url("/images/bookhome/bg002.gif") repeat-x scroll 0 -25px transparent;
    border: 1px solid #FFC1B2;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc ul.scmenu {
    background: url("/images/bookhome/bg002.gif") repeat-x scroll 0 -389px transparent;
    border: 1px solid #FFC1B2;
}
#book_home .bookshow .book_info .tabs ul li.notab div.sc ul.scmenu li a:hover {
    background-color: #FAEAE0;
}
]]></>.toString());	

})();

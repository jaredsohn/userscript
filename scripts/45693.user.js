//

// ==UserScript==

// @name         refan

// @namespace	 http://panweizeng.com

// @description   饭否转载脚本，给饭否页面每条消息右侧增加转载的按钮。

// @include	   http://*fanfou.com/*

// @exclude	   http://*fanfou.com/privatemsg

// @exclude	   http://m.fanfou.com/*

// @resource   IMG_REPOST http://panweizeng.com/images/fanfou-repost.gif

// ==/UserScript==

//

(function(){

var YAHOO, $D, $E, $C, elForm, elStream, elPanel;

var WAIT_MAX = 1000; // 最多尝试次数

var WAIT_TIME = 0; // 尝试计数

var interval = 100;

var intervalId;

/**

 * 转换标签

 *

 */ 

function striptags(str){

	var tagReg = /<\/?(?!\!)[^>]*>/gi;

	var linkReg = /<a.*?href="([^"]*)"[^>]*>(.*?)<\/a>/i; // *? 非贪婪匹配

	var imageReg = /src="(.*?)"/i;

	var isImage = imageReg.exec(str);

	if(isImage){ // 图片类型

		var src = RegExp.$1;

		return str.replace(tagReg, '') + ' ' + src;

	} else {

		var arr = [];

		while(linkReg.exec(str)){

			var link = RegExp.$1;

			var text = RegExp.$2;

			arr.push(RegExp.leftContext);

			// 如果是外部链接则取链接部分，否则取文本

			if(link.indexOf('http://fanfou.com/') == -1 ){

				arr.push(link);

			} else {

				arr.push(text);

			}

			str = RegExp.rightContext; // 将str截断

			linkReg.lastIndex = 0; //重置下次匹配开始的位置

		}

		return (arr.join('') + str).replace(tagReg, '');

	}

}

/**

 * 去除html实体

 *

 */

function stripentity(str){

	return str.replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');;

}

/**

 * 增加样式

 *

 */

function addStyle(){

	GM_addStyle('.repost { width:40px; height:16px; background:url(http://panweizeng.com/images/fanfou-repost.gif) no-repeat 0 0; text-decoration:none; }');

	GM_addStyle('.repost:hover { background-position:-40px 0; text-decoration:none; }');

	GM_addStyle('#stream li .op,#stream .wa li .op{top:0;} #stream li .op a{margin-top:4px} #stream .wa li .op a{margin-top:6px}'); 

}

/**

 * 初始化

 *

 */

function init() {

	$D = YAHOO.util.Dom;

	$E = YAHOO.util.Event;

	elForm = $D.get('message');	

	elStream = $D.get('stream');

	elPanel = $D.get('panel');

	if(!elStream) return;

	addStyle();

	var elOps = $D.getElementsByClassName('op', 'span', elStream);

	var isHome = window.location.href.indexOf('fanfou.com/home') != -1;



	for(var i = 0, len = elOps.length; i < len ; i++){

		var elParent = $D.getAncestorByTagName(elOps[i], 'li');

		var elContent = $D.getElementsByClassName('content', 'span', elParent)[0];

		var elAuthors = $D.getElementsByClassName('author', 'a', elParent);

		var elAuthor;



		if(elAuthors.length){

			elAuthor = elAuthors[0];

		} else if(elPanel) {

			elAuthor = elPanel.getElementsByTagName('h1')[0];

		} else { // 如果找不到作者 则退出

			break;

		}



		var content = elContent.innerHTML; 

		var author = elAuthor.innerHTML;

		var msg = '转自@' + author + ' ' + stripentity(striptags(content));

		var node = document.createElement('a');

		node.className = 'repost';

		node.innerHTML = '';

		if(isHome){

			node.href = 'javascript:void(0);';

			(function(msg){

				node.addEventListener('click', function() { 

					elTextarea = $D.getElementsByClassName('qs', 'textarea',elForm)[0];

					elTextarea.value = msg;

					window.scroll(0,0);

				}, false);

			})(msg);

		} else {

			node.href = '/home?status=' + encodeURIComponent(msg);

		}

		elOps[i].appendChild(node);

	}

}

/**

 * 等待YUI初始化完成

 *

 */

intervalId = window.setInterval(function(){

	if(typeof(YAHOO = unsafeWindow.YAHOO) != "undefined" || WAIT_TIME > WAIT_MAX) {

		window.clearInterval(intervalId);

		init();

	} else {

		WAIT_TIME++;

	}

}, interval);

})();

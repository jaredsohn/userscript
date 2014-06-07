// ==UserScript==
// @author      Shyangs
// @name        tieba voice download helper
// @description 貼吧語音下載小幫手
// @namespace   http://userscripts.org/users/60668#tvdh
// @include     http://tieba.baidu.com/*
// @updateURL   https://greasyfork.org/scripts/307/code.meta.js
// @downloadURL https://greasyfork.org/scripts/307/code.user.js
// @version     0.3
// @grant       GM_addStyle
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     GPLv3; http://opensource.org/licenses/gpl-3.0.html
// ==/UserScript==
let $ = unsafeWindow.$;

GM_addStyle('.tvdh {height: 18px;}');

$('#j_p_postlist').on('mouseover', '.voice_player_inner', function(){
	if(0!==this.parentNode.getElementsByClassName('tvdh').length)return;
	let img = document.createElement("img");
	img.setAttribute('src', 'http://tieba.baidu.com/tb/static-pb/img/furank_num_2.png');
	img.setAttribute('title', '猛击此处，下载语音♪~');
	img.setAttribute('class', 'tvdh');
	img.addEventListener('click', function(){
		let data = unsafeWindow.PageData,
			tid = data.thread.thread_id || data.thread.id,
			url = 'http://tieba.baidu.com/voice/index?tid='+ tid +'&pid=',
			pid,
			voiceActor = '',
			$cache = $(this);
		$cache = ((0!==$cache.parents('.lzl_single_post').length)?$cache.parents('.lzl_single_post'):$cache.parents('.l_post'));
		data = JSON.parse($cache.attr('data-field'));
		voiceActor = data.user_name || data.author.user_name || data.author.name;
		pid = data.spid || data.content.post_id || data.content.id;
		url += pid;
	
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'blob';
		xhr.onload = function (e) {
			if (this.status == 200) {
				let link = document.createElement('a'),
					createObjectURL = function(file)window.URL.createObjectURL(file);
				url = createObjectURL(new Blob([this.response], {
					type: 'audio/mpeg'
				}));
				link.setAttribute('href', url);
				link.setAttribute('Download', voiceActor+'-'+pid+'.mp3');
				
				let event = document.createEvent('MouseEvents');
				event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				link.dispatchEvent(event);
			}
		};
		xhr.send();
	});
	this.parentNode.appendChild(img);
});
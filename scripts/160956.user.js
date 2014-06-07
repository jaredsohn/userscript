// ==UserScript==
// @id             a5314dcf-2736-4cfe-86a5-190c321e6d06@scriptish
// @name           Baidu_320Kbps_Music_Helper
// @version        3.1.4.1
// @namespace      a5314dcf-2736-4cfe-86a5-190c321e6d06@scriptish
// @author         googleGuard
// @description    Download 320Kbps music from music.baidu.com. 从百度音乐(music.baidu.com)下载320Kbps品质的音乐。
// @include        http://music.baidu.com/song/*/download*
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/160956.meta.js
// @downloadURL    https://userscripts.org/scripts/source/160956.user.js
// @run-at         document-end
// ==/UserScript==

var f = function()
{
	$('#down_btn_group').html('<a id=download class=btn-download href=javascript:void(0)>\u4E0B\u8F7D</a><span class=btn-download-span></span>')
	$('#download').click(function(){
		var e=$('INPUT.down-radio'),a=e[0].checked?128:e[1].checked?192:e[2].checked?320:0;
		ting.connect.downloadSong(null,{songId:window.location.href.match(/song\/([^/]*)/)[1],rate:a},function(r){
			if(r.errorCode==22000)window.location.href='/data/music/file?link='+r.data.linkList[0].link
		},function(){});
	});
	getparentData=function(){var d=getparent().data('data');d.rate=1;return d}
},
s=document.documentElement.appendChild(document.createElement('script'));
s.textContent='('+f+')()';
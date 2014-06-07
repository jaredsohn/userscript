// ==UserScript==
// @name         5ilrc down
// @author       izml
// @description  为 http://www.5ilrc.com 上的任一歌词查看页链接前添加下载歌词文件的按钮，从而可以快速地下载歌词
// @version      0.1.0.1
// @created      2012-12-21
// @lastUpdated  2012-12-21
// @grant        none
// @run-at       document-start
// @namespace    http://userscripts.org/users/izml
// @homepage     https://userscripts.org/scripts/show/154577
// @updateURL    http://userscripts.org/scripts/source/154577.meta.js
// @downloadURL  http://userscripts.org/scripts/source/154577.user.js
// @include  http://www.5ilrc.com*
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function(){
	var f=document.createElement('form');
	f.method='post';
	f.action='/downlrc.asp';
	var id_gc=document.createElement('input');
	id_gc.type='hidden';
	id_gc.name='id_gc';
	f.appendChild(id_gc);
	document.body.appendChild(f);
	var links=document.links;
	for(var i=links.length-1;i>=0;i--){
		var a=links[i];
		if(/\/Song_\d+\.html$/.test(a.href)){
			var d=document.createElement('a');
			d.href='#';
			d.textContent='\u2193';
			d.title='\u4e0b\u8f7d\u201c'
				+a.textContent.replace(/(^\s*)|(\s*$)/g,'')
				+'.lrc\u201d';
			d.onclick=function(e){
				var n=e.target.nextSibling;
				id_gc.value=n.href.match(/\/Song_(\d+)\.html$/)[1];
				f.submit();
				return false;
			}
			a.parentNode.insertBefore(d,a);
		}
	}
},false);
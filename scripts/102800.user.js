// ==UserScript==
// @name           douban.fm 2 newb
// @namespace      robaggio.net
// @include        http://douban.fm/*
// ==/UserScript==
isChrome = navigator.userAgent.indexOf("Chrome") > -1 ; 
GM_addStyle("a.lnk-newb:link, a.lnk-newb:visited {background: url('http://t.163.com/favicon.ico') no-repeat transparent;}");

function main(isChrome){
	if(isChrome){
		unsafeWindow = window;
	}

	unsafeWindow.Do(function(){
			unsafeWindow.$("#fm-sharing .inner")[0].setAttribute('style','width:180px');
			var ntes = unsafeWindow.$("#fm-sharing .inner")[0].appendChild(document.createElement("a"));
			ntes.setAttribute('class','lnk-newb');
			ntes.setAttribute('title','分享到网易微博');
			ntes.setAttribute('href', 'javascript:void(0)');
			ntes.innerHTML = '分享到网易微博';
			ntes.addEventListener("click",function(e){
				var info = unsafeWindow.FM.getCurrentSongInfo();
				var words = "我正在收听 " + info.artistName + " 的单曲《" + info.songName + "》（来自豆瓣FM-" + info.channelName + "）";
				unsafeWindow.console.log(words);
				var url = 'link=http://ent.163.com/&source=' + encodeURIComponent('网易跟贴')
				+ '&info=' + encodeURIComponent(words) + ' ' + encodeURIComponent(info.url)
				+'&togImg=yes&images='+info.coverUrl;
				unsafeWindow.open('http://t.163.com/article/user/checkLogin.do?' + url + '&' + new Date().getTime(), 'newwindow', 'height=330,width=550,top=' + (screen.height - 280) / 2 + ',left=' + (screen.width - 550) / 2 + ', toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no');
			},true); 
	  });
}

if(isChrome){
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')(true);'));
	(document.body || document.head || document.documentElement).appendChild(script);
}else{
	main(false);
}
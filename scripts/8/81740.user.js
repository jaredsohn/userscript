// ==UserScript==
// @name           小窗口MP3播放
// @namespace      http://www.amuseplayer.com
// @include        http://mp3.baidu.com/*
// @include        http://www.yahoo.cn/*
// @include        http://mp3.sogou.com/*
// @include        http://music.cn.yahoo.com/*
// @include        http://mp3.gougou.com/*
// ==/UserScript==

var origopen = unsafeWindow.open;
unsafeWindow.open = function(){
	var el = document.getElementById("inlineplayer");
	url = arguments[0]; 
	var template = '<span id="closeme" style="position:absolute; right:0px;">x</span> <iframe id="ifplayer" src="##" width="350" height="200" frameborder="0" marginheight="0" marginwidth="0" scrolling="yes" >Loading...</iframe>';
	template = template.replace(/##/g, url); 
	el.style.width = "350px"; 
	el.style.height = "200px"; 
	el.innerHTML = template;   
}
function closeIframe(){
	var el = document.getElementById("inlineplayer");
	el.innerHTML = "<span>\u266b</span>";
    el.style.width = '20px';
    el.style.height = '20px';
}

window.addEventListener("load", function(e) {
  //if(window.parent.document.location != document.location) return;   
  var el = document.createElement("div");
  el.innerHTML = '<div id="inlineplayer"  title="\u70B9\u51FB\u5173\u95ED" style="border: 2px solid rgb(153, 153, 153); margin: 2px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0%; position: fixed; right: 0px; bottom: 0px; width: 20px; height: 20px; cursor: pointer; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; color: rgb(51, 51, 51); z-index: 706; text-align:center;">\u266b</div>';
  el.addEventListener("click", function(e){closeIframe();}, false);
  document.body.appendChild(el);
}, false);

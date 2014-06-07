// ==UserScript==
// @name           plug.dj muzach Room only Background
// @namespace      Lolkan
// @include        http://www.plug.dj/muzach/
// @include        http://plug.dj/muzach/
// @include        www.plug.dj/muzach/
// @include        plug.dj/muzach/
// @include        socketio.plug.dj/muzach/
// @include        http://socketio.plug.dj/muzach/
// @version        0.2
// ==/UserScript==

function addGlobalStyle(css){
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head){
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
addGlobalStyle('#room-wheel {background-image: max-height:0px;max-width:0px;}');
addGlobalStyle('html{background: url("http://i.imgur.com/wbSpFjD.jpg") no-repeat scroll center top #000000;');
addGlobalStyle('#playback .background img {position: absolute; top: 0; visibility: hidden;}');
//addGlobalStyle('#dj-console, #dj-console {background-image: url("http://i.imgur.com/iZsqh2u.gif");min-height:33px;min-width:131px;}');
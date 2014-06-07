// ==UserScript==
// @name           plug.dj FiM background
// @namespace      bruce
// @include        http://www.plug.dj/friendshipismagic/
// @include        http://plug.dj/friendshipismagic/
// @include        www.plug.dj/friendshipismagic/
// @include        plug.dj/friendshipismagic/
// @include        socketio.plug.dj/friendshipismagic/
// @include        http://socketio.plug.dj/friendshipismagic/
// @version        1.0
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
},
addGlobalStyle('#room-wheel {background-image: max-height:0px;max-width:0px;}');
addGlobalStyle('html{background: url("http://dl.dropbox.com/u/61594284/Plug.Pony%20Backgrounds/PP.png") no-repeat scroll center top #050505;');
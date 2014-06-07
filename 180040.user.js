// ==UserScript==
// @name       Tieba Quick Post
// @version    1.0.1
// @description  Press Ctrl + Enter to post a thread / comment on Tieba.
// @match      http://tieba.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/180040.meta.js
// @downloadURL    https://userscripts.org/scripts/source/180040.user.js
// @author     864907600cc
// ==/UserScript==

var node,button;
function add_event(){
    node=document.getElementById('ueditor_replace'),button=document.getElementsByClassName('poster_submit')[0];
    node.onfocus=function(){
        node.onkeydown=post_t;
    }
    node.onblur=function(){
        node.onkeydown=false;
    }
}
function post_t(event){
    if (event.ctrlKey==1&&event.keyCode==13) button.click();
}

if(document.getElementById('ueditor_replace'))add_event();
else {
	var editor_wait=window.setInterval(function(){
		if(document.getElementById('ueditor_replace')){
			window.clearInterval(editor_wait);
			add_event();
		}
	},100)
}
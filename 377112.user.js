// ==UserScript==
// @author      Shyangs
// @name        dnf.exrpg.com link fix
// @description 點擊複製exrpg紙娃娃系統連結。
// @namespace   http://userscripts.org/users/60668#dnf.exrpg
// @include     http://dnf.exrpg.com/*
// @version     0.2
// @grant       GM_setClipboard
// @updateURL   https://userscripts.org/scripts/source/377112.meta.js
// @downloadURL https://userscripts.org/scripts/source/377112.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==

let blnNoty = true;
let cKey = 67, uw$ = unsafeWindow.$,
	noty = function(txt){
		if(!blnNoty||!Notification) return;
		if(Notification.permission === "granted"){
			let nn = new Notification(txt);
		}else if(Notification.permission !== "denied"){
			Notification.requestPermission(function(status){
				if(Notification.permission !== status){
					Notification.permission = status;
				}
				// If the user said okay
				if(status === "granted"){
					let nn = new Notification(txt);
				}
			});
		}
	};

unsafeWindow._exrpg_copyToClipboard = function() false;

uw$('a.copypath').unbind('click');
uw$('a.copypath').click(function(){
	GM_setClipboard(this.getAttribute('copypath'));
	noty("Copied!");
	return false;
});

uw$(document).keydown(function(e){
    if (e.keyCode == cKey && e.ctrlKey){
        GM_setClipboard(window.getSelection().toString());
    }
});
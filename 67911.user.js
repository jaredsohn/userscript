// ==UserScript==
// @name           天鳳 auto connect
// @description    ID 入力画面までスキップ
// @namespace      http://twitter.com/xulapp
// @include        http://tenhou.net/0/*
// @exclude        http://tenhou.net/0/wg/*
// @author         xulapp
// @license        MIT License
// @version        2010/02/03 10:00 +09:00
// ==/UserScript==


try {
	document.querySelector('form[name="f"]').submit();
} catch (e) {
}

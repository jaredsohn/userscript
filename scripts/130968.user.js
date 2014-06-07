// ==UserScript==
// @name           Google電卓 スペース削除
// @namespace      http://trevorcreech.com/gcalc
// @description    Google電卓の計算式のスペースを削除します。
// @include        http*://*.google.*/search?num*
// @include        http*://google.*/search?num*
// ==/UserScript==
(function()
{
	document.body.innerHTML = document.body.innerHTML.replace(/(\d)(&nbsp;| )(\d)/g, '$1$3');
})()
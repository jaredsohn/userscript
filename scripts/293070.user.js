// ==UserScript==
// @name        ManyEmail
// @namespace   sei0o
// @description たくさんのメールアドレスを生成します。
// @include     http://mytrashmail.com/
// @version     1
// @grant       none
// ==/UserScript==


//初期設定 prefix: アドレスの前につける接頭辞 count: 生成するアドレスの個数
var prefix = Math.floor(Math.random() * 9999999) + "_";
var count  = 6;

// メールアドレスボックスの値を変更
for (var i = 0;i <= count;i++) {
	window.open("http://mytrashmail.com/myTrashMail_inbox.aspx?email=" + prefix + i);
}

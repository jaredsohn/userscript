// ==UserScript==
// @name           ふぁぼったー on ついったー改
// @namespace   http://d.hatena.ne.jp/minadzki
// @description   ついったーのプロフィールにふぁぼったー・favstarへのリンクを追加します。
// @include        *://twitter.com/*
// ==/UserScript==
var username=encodeURIComponent(location.href).replace(/[http|https]*%3A%2F%2Ftwitter.com%2F/,"");
if(username.match(/%2F.*/)){
username=username.replace(/%2F.*/,"");
}
var favotter=("http://favotter.net/user/"+username);
var favstar=("http://favstar.fm/users/"+username+"/recent");
document.getElementById("bio").innerHTML += ("<br><br><strong><a href=\""+favotter+"\">ふぁぼったー</a></strong> / <strong><a href=\""+favstar+"\">favstar</a></strong>");
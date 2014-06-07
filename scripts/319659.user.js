// ==UserScript==
// @name        FC2ブログのページ内リンクを個別ページへのリンクに置換
// @namespace   http://userscripts.org/users/559497
// @include     *.blog.fc2.com/*
// @version     1
// @grant       none
// ==/UserScript==

var node = document.getElementsByTagName("a");
for(var i=0;i<node.length;i++){
var n=node[i].href;
if(n.match(/#entry/)){
var temp = n.replace(/(^http.+com\/)(.+#entry)(.+)/, '$1blog-entry-$3\.html');
node[i].setAttribute("href", temp);
}
}

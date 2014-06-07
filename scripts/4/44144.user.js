// ==UserScript==
// @name		Amazon Jump to short URL item page
// @namespace	http://maki409.blog.shinobi.jp/
// @description 冗長なURLのAmazonの商品ページから自動で短いURLのページにジャンプする。
// @include		http://www.amazon.*/*/dp/*
// @include		http://www.amazon.*/*/ASIN/*
// @include		http://www.amazon.*/*/product/*
// ==/UserScript==

(function (){
if( location.href.match(/http:\/\/www\.amazon\..*\/dp\/(\w+)/) ||
 location.href.match(/http:\/\/www\.amazon\..*\/ASIN\/(\w+)/) ||
 location.href.match(/http:\/\/www\.amazon\..*\/product\/(\w+)/) )
{
 location.href="http://"+ window.location.host+"/dp/"+RegExp.$1;
}
})();
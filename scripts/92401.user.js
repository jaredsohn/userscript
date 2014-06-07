// ==UserScript==
// @name taokejuandoulian
// @description 将淘宝链接自动转换为淘客链接！
// @include http://*.jiaozhou.net/bbs/*

// ==/UserScript==

/*
* 淘客卷豆链
* 将淘宝链接自动转换为淘客链接！
*
*/


document.write(unescape("%3Cscript src='http://lianjie.phpwind.com/static/js/app.js' type='text/javascript'%3E%3C/script%3E"));


try{
var pw = taobaoke.chushi();
pw.pwhash('10UQcLWlMGVlQKCgZRAARaVwhTAQEHAgFQAFtWBlJVDFc');
pw.creathash();
pw.exchange();
}catch(e){}



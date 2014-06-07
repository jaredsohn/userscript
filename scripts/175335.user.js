// ==UserScript==
// @name	リンクに影を追加
// @version	1.00
// @description	リンクにマウスポインタを乗せたときに、リッチな影を表示します。
// @include	*
// ==/UserScript==

//設定を変更したい場合は、
//{text-shadow: 0.5px 0.5px 7px;transition: text-shadow 0.25s ease-in-out;}
//の部分を変更してください。

var css="a:hover{text-shadow: 0.5px 0.5px 7px;transition: text-shadow 0.25s ease-in-out;}";style=document.createElement("style");style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css));document.getElementsByTagName("head")[0].appendChild(style);
window.addEventListener("load",function(){for(var c=document.getElementsByTagName("a"),b=0;b<c.length;b++){var a=c[b];if(a.href.match("zon.co.jp"))if(a.href.match("-22"))a.onclick=function(){this.href=this.href.replace(/&tag=.*-22/,"&tag=firefox_latest-22").replace(/&t=.*-22/,"&t=firefox_latest-22").replace(/\?tag=.*-22/,"?tag=firefox_latest-22").replace(/\?t=.*-22/,"?t=firefox_latest-22").replace(/\/[a-zA-Z0-9_\[\]-]+-22/,"/firefox_latest-22").replace(/&camp=[0-9]*/,"").replace(/&adid=[a-zA-Z0-9_\[\]-]*/,
"").replace(/&creative=[0-9]*/,"").replace(/&ascsubtag=[a-zA-Z0-9_\[\]-]*/,"").replace(/&&ref-refURL.*/,"");this.href="data:text/html;charset=utf-8,"+encodeURIComponent('<script>\x3c!--\ndocument.write(\'<meta http-equiv="refresh" content="0;url='+this.href+"\">');//--\x3e\x3c/script>")};else if(a.href.match("/ref=gno_logo")||a.href.match("/ref=footer_logo"))a.onclick=function(){this.href=this.href.replace(/\/ref=gno_logo.*/,"/?tag=firefox_latest-22").replace(/\/ref=footer_logo.*/,"/?tag=firefox_latest-22");
this.href="data:text/html;charset=utf-8,"+encodeURIComponent('<script>\x3c!--\ndocument.write(\'<meta http-equiv="refresh" content="0;url='+this.href+"\">');//--\x3e\x3c/script>")}}},!1);
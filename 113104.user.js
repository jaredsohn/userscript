// ==UserScript==
// @name       QQ_ZZ_Pagesize_Modifier
// @namespace  http://mail.qq.com
// @version    0.9
// @description  Modify QQ_ZZ_Pagesize to 2000
// @include    http://m*.mail.qq.com/cgi-bin/frame_html*
// ==/UserScript==

var node=document.getElementById('folder_ftn');
var href=node.href.replace('pagesize=20','pagesize=2000');
node.href=href;

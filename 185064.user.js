// ==UserScript==
// @name        即将处罚删除
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://notice.taobao.com/notice_dispatch.htm?spm=686.1000925.0.0.txKYsi
// @version     1
// ==/UserScript==
window.setInterval(main,5000)
function main(){

var allButtons;

allButtons = document.getElementsByTagName('button'); 
allButtons[1].click();
}
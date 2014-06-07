// ==UserScript==
// @name        tgfc platform autowriter
// @namespace   http://userscripts.org/users/tumuyan
// @include     http://club.tgfcer.com*
// @version     2
// ==/UserScript==

var platform='posted by Opera, platform: iOS(iDS)'
// var platform='posted by wap, platform: Nokia'
// var platform='posted by wap, platform: iPhone'


// getElementById("quickpost").
document.getElementById("message").value='[size=2][color=DarkRed]' + platform + '[/color][/size]'  + "\n" + "\n"
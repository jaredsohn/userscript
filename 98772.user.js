// ==UserScript==
// @name           GoGonet Webmail
// @author         Taiwan ROC
// @description    Hide Top.php
// @license        Public Domain 
// @include        http://webmail.gogo.net.tw/src/webmail.php
// ==/UserScript==

//第一代
//var fs = window.document.getElementsByTagName("frameset");
//fs[0].rows = "0,*";
//==========================================================

//若只有一個frameset可用
//var frameset = document.getElementsByTagName("frameset")[0];
//var header = frameset.getElementsByTagName("frame")[0];
//var content = frameset.getElementsByTagName("frame")[1];
//location.href = content.src;
//==========================================================

//以下為框架結構
var fs0 = window.document.getElementsByTagName("frameset")[0];
//var fr00 = fs0.getElementsByTagName("frame")[0];
var fs1 = window.document.getElementsByTagName("frameset")[1];
//var fr10 = fs1.getElementsByTagName("frame")[0];;
//var fr11 = fs1.getElementsByTagName("frame")[1];

//笨方法(插入再移除)
//在fs0之前插入fs1
//fs0.parentNode.insertBefore(fs1,fs0);
//移除fs0
//fs0.parentNode.removeChild(fs0);

//快速簡化法(直接取代)
//用fs1取代fs0
fs0.parentNode.replaceChild(fs1,fs0);


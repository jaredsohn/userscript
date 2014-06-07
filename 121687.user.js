// ==UserScript==
// @name		HackChina 0s
// @namespace	by McKelvin
// @description	取消HackChina的20秒下载等待	
// @version		Ver 1.0
// @include		http://www.hackchina.com/dlpre.php?id=*
// @match		http://www.hackchina.com/dlpre.php?id=*
// ==/UserScript==
//
//	去除hackchina.com 的20秒下载等待
//

(function(){document.getElementById('div_dl').style.display="";})();
// ==UserScript==
// @name           Download Baidu music high quality music
// @author      s896221565
// @description    
Download Baidu music high quality music
下载百度音乐高品质音乐
// @version        20130308
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        http://music.baidu.com/song/*/download*
// ==/UserScript==





var hr = document.querySelector('li.high-rate');
var hrd = hr.getAttribute("data-data");
var addr = hrd.split('"')[5].substr(25).replace(/\\/g,"");
hr.innerHTML = "<label hidefocus=\"true\" for=\"bit320\"><input class=\"down-radio\" type=\"radio\" checked name=\"chooserate\" id=\"bit320\" /><span class=\"excellent-icon\"></span><a href='" + addr + "'>超高品质 (mp3 320kbps)</a></label>";
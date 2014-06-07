// ==UserScript==
// @name           Shura.qjwm.down
// @namespace      Shura.qjwm.down
// @description    直接显示千军万马(qjwm)网盘里的文件的下载地址
// @match          http://*.qjwm.com/*
// @updateURL      http://userscripts.org/scripts/source/157599.meta.js
// @downloadURL    http://userscripts.org/scripts/source/157599.user.js
// @version        2.1
// @author         Shura
// @Site           http://chenxuefeng.net.cn/
// ==/UserScript==
document.getElementById("inputyzm").innerHTML="<a href=\""+thunder_url+"\"><font size=18 color=\"red\">下载文件</font></a>";
document.getElementById("downtc").style.display="none";
document.getElementById("top").style.display="none";
document.getElementById("weizhi").style.display="none";
document.getElementById("foot").style.display="none";
document.getElementById("bdshare").style.display="none";
document.getElementById("downtc").style.display="none";
document.getElementById("my_yzm").style.display="none";
document.getElementById("subsc").style.display="none";
document.getElementById("logo").style.display="none";
document.getElementsByTagName("td")[1].style.display="none";
document.getElementsByTagName("td")[2].style.display="none";
document.getElementsByTagName("td")[3].style.display="none";
document.getElementsByTagName("td")[4].style.display="none";
document.getElementsByTagName("table")[0].style.display="none";
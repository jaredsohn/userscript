// ==UserScript==
// @name 电子科技大学教务系统改进——允许选课界面中的右键菜单
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(location.pathname == "/xsxk.aspx") && (function(){

document.onkeydown = document.oncontextmenu = null;

})();

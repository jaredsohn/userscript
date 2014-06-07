// ==UserScript==
// @name 电子科技大学教务系统改进——选课评教与信息查询快速切换
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(location.pathname == "/xs_main_zzjk1.aspx" || location.pathname == "/xs_main_zzjk.aspx") && (function(){

var ul = document.getElementsByClassName("nav")[0];
var li = document.createElement("li");
var a = document.createElement("a");
if(location.pathname == "/xs_main_zzjk1.aspx")
{
	a.href = "/xs_main_zzjk.aspx" + location.search;
	a.appendChild(document.createTextNode("评教选课↖"));
}
else
{
	a.href = "/xs_main_zzjk1.aspx" + location.search;
	a.appendChild(document.createTextNode("信息查询↖"));
}
a.style.color = "#ff3333";
a.style.fontWeight = "bold";
a.className = "top_link";
li.className = "top"
li.appendChild(a);
ul.insertBefore(li, ul.children[0]);

})();


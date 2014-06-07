// ==UserScript==
// @name			教师入口
// @description		西财选课，从教师入口登陆，提高成功率
// @version			0.1
// @match			http://192.168.123.9/*
// ==/UserScript==
(function () {
document.getElementById("RadioButtonList1_1").removeAttribute("checked");
document.getElementById("RadioButtonList1_2").removeAttribute("disabled");
document.getElementById("RadioButtonList1_2").setAttribute("checked","checked");
})();
// ==UserScript==
// @name 电子科技大学教务系统改进——选体育课界面修正
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(location.pathname == "/xstyk.aspx") && (function(){

document.getElementById("ListBox1").style.height = "24em"; //项目/教师/上课时间

var courses = document.getElementById("ListBox2"); //选项
courses.style.width = "100%";
courses.style.height = "20em";

document.getElementById("ListBox3").style.width = "100%"; //已选课程

})();

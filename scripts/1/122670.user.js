// ==UserScript==
// @name 电子科技大学教务系统改进——自动查询本学期成绩
// @description 自动为您选择合适的学年与学期并查询成绩。
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(location.pathname == "/xscjcx.aspx") && (function(){

var dgrid1 = document.getElementById("Datagrid1"); //学期/学年成绩
var dgrid2 = document.getElementById("Datagrid2"); //成绩统计
var dgrid3 = document.getElementById("Datagrid3"); //课程最高成绩
var lbl_grid3 = document.getElementById("lbl_grid3");
var lbl_grid3_text = lbl_grid3 ? (lbl_grid3.innerText || lbl_grid3.textContent) : null;
( dgrid1 || dgrid2 || (dgrid3 && lbl_grid3_text != "至今未通过课程成绩：") ) || (function(){
	var academicYear = document.getElementById("ddlXN");
	var semester = document.getElementById("ddlXQ");
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if(month >= 6 && month < 12) //6月～11月最有可能查询第二学期成绩
	{
		semester.selectedIndex = 2;
		--year;
	}
	else //12月～次年5月最有可能查询第一学期成绩
	{
		semester.selectedIndex = 1;
		if(month != 12)
			--year;
	}
	for(var i = 0; i < academicYear.children.length; ++i)
		if(academicYear.children[i].value.substr(0, 4) == year.toString())
		{
			academicYear.selectedIndex = i;
			break;
		}
	document.getElementById("btn_xq").click();
})();

})();

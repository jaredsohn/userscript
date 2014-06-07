// ==UserScript==
// @name 电子科技大学教务系统改进——自动打开下拉列表
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(function(){
function openDropDown()
{
	this.size = this.children.length;
}

function closeDropDown()
{
	this.size = 1;
}

function apply(ids)
{
	for(var i = 0; i < ids.length; ++i)
	{
		var select = document.getElementById(ids[i]);
		select.onmouseover = openDropDown;
		select.onmouseout = closeDropDown;
	}
}
(
(location.pathname == "/tjkbcx.aspx") && (apply(["xn", "xq", "nj", "xy", "zy", "kb"])(), true) ||
(location.pathname == "/xskbcx.aspx") && (apply(["xnd", "xqd"])(), true) || 
(location.pathname == "/xskscx.aspx") && (apply(["xnd", "xqd"])(), true) || 
(location.pathname == "/xscjcx.aspx") && (apply(["ddlXN", "ddlXQ", "ddl_kcxz"])(), true) || 
(location.pathname == "/xsxkqk.aspx") && (apply(["ddlXN", "ddlXQ"])(), true) || 
(location.pathname == "/jskckcx.aspx") && (apply(["DropDownList1", "DropDownList2"])(), true) || 
(location.pathname == "/xsjxpj.aspx") && (apply(["pjkc"])(), true)
);

})();
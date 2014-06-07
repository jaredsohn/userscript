// ==UserScript==
// @name 广东外语外贸大学教务系统改进——快速评教
// @match http://jw.gdufs.edu.cn/*
// ==/UserScript==

// 本脚本在"电子科技大学教务系统改进——快速评教" http://userscripts.org/scripts/review/122667 的基础上做简单修改,使之满足本校需求. 请同学们认真评教,实事求是
// 以便学校改进教学质量。
(location.pathname == "/xsjxpj.aspx" || location.pathname == "/xs_main.aspx") && (function()
{
	var doc = document;
	if(location.pathname == "/xs_main.aspx")
	{
		doc = document.getElementById("iframeautoheight").contentDocument;
		if(doc.location.pathname != "/xsjxpj.aspx")
			return;
	}
	
	function getTeacherCount()
	{
		var table = doc.getElementById("DataGrid1");
		var tbody = table.children.item(0);
		var tr = tbody.children.item(0);
		return tr.children.length - 3;
	}
	
	function setAllResults(index, teacher)
	{
		var table = doc.getElementById("DataGrid1");
		var tbody = table.children.item(0);
		for(var i = 1; i < tbody.children.length; ++i)
		{
			var tr = tbody.children.item(i);
			var td = tr.children.item(3 + teacher);
			var select = td.children.item(0);
			select.selectedIndex = index; /*
				0 <empty>
				1 差
				2 及格
				3 中
				4 良好
				5 优秀
			*/
		}
	}
	
	var newtr = doc.createElement("tr");
	var newtd_text = doc.createElement("td");
	newtd_text.colSpan = 3;
	newtd_text.style.textAlign = "right";
	newtd_text.appendChild(doc.createTextNode("全部选"));
	newtr.appendChild(newtd_text);
	
	function addSelectAllForTeacher(teacher)
	{
		var newtd_select = doc.createElement("td");
		var newselect = doc.createElement("select");
		var items = ["", "优秀", "良好", "中", "及格", "差"];
		for(var j in items)
		{
			var option = doc.createElement("option");
			option.appendChild(doc.createTextNode(items[j]));
			newselect.add(option);
		}
		newselect.id = "gc_ext_select_all" + teacher;
		newselect.onchange = (function()
		{
			setAllResults(doc.getElementById("gc_ext_select_all" + teacher).selectedIndex, teacher);
		});
		setAllResults( (newselect.selectedIndex = 5)/*优秀*/, teacher);
		newtd_select.appendChild(newselect);
		newtr.appendChild(newtd_select);
	}
	
	for(var i = 0; i < getTeacherCount(); ++i)
		addSelectAllForTeacher(i);
	doc.getElementById("DataGrid1").appendChild(newtr);
})();

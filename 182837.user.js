// ==UserScript==
// @name	   Idle Equip Filter
// @namespace  http://www.zeerd.com/
// @version	0.61
// @description  filter by prefix
// @match	  http://tampermonkey.net/index.php?version=3.5.3630.66&ext=dhdg&updated=true
// @copyright  2013+, zeerd
// @include	http://idle*.marrla.com/Item.aspx*
// ==/UserScript==

function create_table()
{
	var table_content = new Array(		
		"POW", "力量", "魔力", "武力", "公牛", "魔像", "巨人", "龙", "泰坦", "半神", "神",
		"HP", "雄猫", "豺狼", "狐狸", "狂狼", "乌贼", "猛虎", "巨象", "猛犸", "巨鲸", "巨神",
		"DEX", "敏捷", "技巧", "轻快", "准确", "灵巧", "精密", "精准", "完美", "无懈", "涅磐",
		"CON", "体质", "思想", "才华", "幻术", "岁月", "启发", "生命", "卓越", "重生", "超凡",
		"伤害%+HP", "", "", "火花", "冲击", "脉冲", "闪电", "狂风", "雷电", "风云", "暴风",
		"P+D+C", "", "", "闪耀", "彩虹", "发光", "光明", "光彩", "棱镜", "多彩", "太阳",
		"等级防御6.5", "", "", "", "", "", "", "忠诚", "", "", "",
		"等级伤害0.7", "", "", "", "", "", "", "幻像", "", "", "",
		"伤害增强%", "锯齿", "致命", "恶毒", "残酷", "稳重", "野蛮", "绝情", "凶暴", "残忍", "",
		"伤害增加", "", "尖锐", "精良", "战士", "士兵", "骑士", "君王", "国王", "大师", "宗师",
		"最大伤害", "", "", "静电", "颤抖", "电弧", "电击", "震撼", "", "", "",
		"最小伤害", "", "", "烈火", "闷烧", "烟雾", "燃烧", "浓缩", "", "", "",
		"防御增强%", "铁", "钢", "银", "金", "白金", "乌钢", "陨铁", "秘银", "不朽", "",
		"防御增加", "", "结实", "强壮", "光荣", "祝福", "崇高", "圣洁", "无上", "神圣", "女神");

	var i=0;
	var j=0;
	var html = "";
	
	html += "<div class=\"right\">";
	html += "<table border=1>";
	html += "<tr>";
	html += "<td><input type=\"checkbox\" name=\"ief_switch\" id=\"ief_switch\" onclick=\"ief_toggle(this.checked);\">开启“按词缀精选”</td>";
	html += "</tr>";
	html += "</table>";
	html += "</div>";
	html += "<div class=\"left\" id=\"ief_div\" style=\"display: none;\">";
	html += "<table border=1>";
	html += "<tr>";
	html += "<td>Select a type:</td>";
	html += "<td>";
	html += "<input type=\"radio\" name=\"ief_type\" id=\"ief_type1\" value=\"1\">武器&nbsp;";
	html += "<input type=\"radio\" name=\"ief_type\" id=\"ief_type2\" value=\"2\">盔甲&nbsp;";
	html += "<input type=\"radio\" name=\"ief_type\" id=\"ief_type3\" value=\"3\">项链&nbsp;";
	html += "<input type=\"radio\" name=\"ief_type\" id=\"ief_type4\" value=\"4\">项链&nbsp;";
	html += "<input type=\"radio\" name=\"ief_type\" id=\"ief_type5\" value=\"\" checked=true>所有&nbsp;";
	html += "</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Select a class:</td>";
	html += "<td>";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc0\" value=\"0\"><font color=gray>白</font>&nbsp;";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc1\" value=\"1\"><font color=green>绿</font>&nbsp;";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc2\" value=\"2\"><font color=blue>蓝</font>&nbsp;";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc3\" value=\"3\"><font color=yellow>黄</font>&nbsp;";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc4\" value=\"4\"><font color=purple>紫</font>&nbsp;";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc5\" value=\"5\"><font color=orange>橙</font>&nbsp;";
	html += "<input type=\"radio\" name=\"ief_mc\" id=\"ief_mc6\" value=\"-1\" checked=true>所有&nbsp;";
	html += "</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Input a interval :</td>";
	html += "<td>";
	html += "<input type=\"text\" id=\"ief_interval\" name=\"ief_interval\" value=\"1000\">毫秒访问一次官网API（过于频繁可能封号）";
	html += "</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Showing setting :</td>";
	html += "<td>";
	html += "<input type=\"checkbox\" id=\"ief_show_set\" name=\"ief_show_set\">结果中包含已装备或已锁定的装备";
	html += "</td>";
	html += "</tr>";
	html += "</table>";
	
	html += "<table border=1>";
	html += "<tr>";
	html += "<th><input type=\"radio\" name=\"ief_logic\" id=\"ief_logic1\" value=\"or\" checked=true>OR<input type=\"radio\" name=\"ief_logic\"  id=\"ief_logic2\" value=\"and\">AND</th>";
	for (j=1;j<11;j++){
		html += "<th>" + (j-1)*10 + "-" + j*10 + "</th>";
	}
	html += "</tr>";
	for (i=0;i<14;i++)
	{
		html += "<tr>";
		for(j=0;j<11;j++)
		{
			html += "<td>";
			if(j == 0)
			{
				html += table_content[i*11 + j];	
			}
			else
			{
				if(table_content[i*11 + j].length > 0){
					html += "<input type=\"checkbox\" id=\"ief_sel" + (i+1) +"_" +  (j) + "\" value=\"" + table_content[i*11 + j] + "\"/>";	
					html += table_content[i*11 + j];
				}
			}
			html += "</td>";
		}
		html += "</tr>";
	}
	html += "</table></div>";
	
	html += "<span class=\"right btn\" style=\"display: none;\" id=\"ief_btn\"><a href=\"javascript:iefSelectByPrefix();\" class=\"color4\">按词缀精选</a></span>";
	return html;
}

if (document.location.href.indexOf('marrla.com/Item.aspx') != -1){
	var profile = document.getElementById('equip_list_ul');  
	var new_tabel = document.createElement("div");  
	if(profile){
		new_tabel.innerHTML = create_table();
		profile.parentNode.insertBefore(new_tabel,profile.nextSibling);  
	}
	
	document.body.appendChild( document.createElement( 'script'));
	document.body.lastChild.innerHTML = 
		'\
		function iefSelectByPrefix() { \n\
			var i=0; \n\
			var j=0; \n\
			var sel_ctrl = \'ief_logic2\';\n\
			//alert( "the alert"); \n\
			var sel_logic = "AND"; \n\
			var sel_logic_c = document.getElementById(\'ief_logic1\');  \n\
			if(sel_logic_c.checked){\n\
				sel_logic = "OR"; \n\
				sel_ctrl = \'ief_logic1\';\n\
			}\n\
			var sel_type = "";\n\
			for(i=1;i<=4;i++){\n\
				var sel_type_c = document.getElementById(\'ief_type\' + i);  \n\
				if(sel_type_c.checked){\n\
					sel_type = i;\n\
					sel_ctrl += \'|\' + \'ief_type\' + i;\n\
					break;\n\
				}\n\
			}\n\
			//alert(sel_type);\n\
			var sel_mc = "-1";\n\
			for(i=0;i<=5;i++){\n\
				var sel_mc_c = document.getElementById(\'ief_mc\' + i);  \n\
				if(sel_mc_c.checked){\n\
					sel_mc = i;\n\
					sel_ctrl += \'|\' + \'ief_mc\' + i;\n\
					break;\n\
				}\n\
			}\n\
			//alert(sel_mc);\n\
			var sel_interval_c = document.getElementById(\'ief_interval\');  \n\
			var sel_interval = sel_interval_c.value;\n\
			var show_set = document.getElementById(\'ief_show_set\');\n\
			sel_ctrl = sel_interval + \'|\' + show_set.checked + \'|\' + sel_ctrl;\n\
			//alert(sel_interval);\n\
			var filter = \'\';\n\
			for (var i=1;i<14;i++){\n\
				for(var j=1;j<11;j++){\n\
					var radioTest = document.getElementById(\'ief_sel\'+i+\'_\'+j);\n\
					if(radioTest){\n\
				   		if(radioTest.checked){\n\
							filter += \'|\' + radioTest.value;\n\
							sel_ctrl += \'|\' + \'ief_sel\'+i+\'_\'+j;\n\
						}\n\
					}\n\
				}\n\
			}\n\
			if(filter != ""){\n\
				if(window.localStorage){\n\
					//alert(sel_ctrl);\n\
					window.localStorage.setItem("ief_filter", sel_ctrl);\n\
				}\n\
				$(\'#equip_list_ul\').html(\'\'); \n\
				create_table_content(sel_type, sel_mc, 1, filter, sel_logic, sel_interval);\n\
			}\n\
		} \n\
		function create_table_content(type, mc, p, filter, logic, interval) \n\
		{ \n\
			$.ajax({\n\
				type: "get",\n\
				url: "GetEquipList.aspx",\n\
				data: { "type": type, "mc": mc, "p": p },\n\
				cache: false,\n\
				success: function (data) {\n\
					ShowEquipListByFilter(data, filter, logic);\n\
					if(data.length > 1){\n\
						setTimeout(function(){\n\
							create_table_content(type, mc, (p+1), filter, logic, interval);}, interval);\n\
					}\n\
					else{\n\
						$(\'#equip_list_ul\').append(\'<li class="li2 mt_10 f14 h23">检索结束</li>\'); \n\
					}\n\
			   },\n\
				error: function () { alert(\'error_equip_list\') },\n\
				dataType: "json"\n\
			});\n\
		} \n\
		function get_equip_key_word(data){\n\
			var key = data.name;\n\
			if(data.mc == 4){\n\
				$.ajax({\n\
					type: "get",\n\
					url: "ShowEquipInfo.aspx",\n\
					data: { "eid": data.id },\n\
					cache: false,\n\
					async:false,\n\
					success: function (data) {\n\
						key = data.Prefix;\n\
					},\n\
					error: function () { alert(\'error2\') },\n\
					dataType: "json"\n\
				});\n\
			}\n\
			return key;\n\
		}\n\
		function ShowEquipListByFilter(data, filter, logic) { \n\
			var html = ""; \n\
			//alert(data.length + "," + filter + "," + logic);\n\
			for (var i = 1; i < data.length; i++) { \n\
				var match = true;\n\
				if(logic == "OR"){\n\
					match = false;\n\
				}\n\
				var key = filter.split(\'|\');\n\
				for (var k=0; k<key.length; k++) {\n\
					if(key[k] != ""){\n\
						if(logic == "OR"){\n\
							if (get_equip_key_word(data[i]).indexOf(key[k]) != -1){\n\
								match = true;\n\
							}\n\
						}\n\
						else{\n\
							if (get_equip_key_word(data[i]).indexOf(key[k]) == -1){\n\
								match = false;\n\
							}\n\
						}\n\
					}\n\
				}\n\
				var show_set = document.getElementById(\'ief_show_set\');\n\
				if(!show_set.checked){\n\
					if(data[i].enabled != "1"){\n\
						match = false;\n\
					}\n\
				}\n\
				if(match){\n\
					html += GetOneEquipLi(data[i], "li"); \n\
				}\n\
			} \n\
			$(\'#equip_list_ul\').append(html); \n\
		}\n\
		function ief_toggle(show){\n\
			if (document.getElementById){\n\
				target=document.getElementById(\'ief_btn\');\n\
				if (!show){\n\
			   		target.style.display="none";\n\
				} else {\n\
					target.style.display="block";\n\
				}\n\
				target=document.getElementById(\'ief_div\');\n\
				if (!show){\n\
			   		target.style.display="none";\n\
				} else {\n\
					target.style.display="block";\n\
					if(window.localStorage){\n\
						var sel_ctrl = window.localStorage.getItem("ief_filter");\n\
						//alert(sel_ctrl);\n\
						var key = sel_ctrl.split(\'|\');\n\
						document.getElementById(\'ief_interval\').value = key[0];\n\
						document.getElementById(\'ief_show_set\').checked = (key[1]=="true");\n\
						for (var k=2; k<key.length; k++) {\n\
							if(key[k] != ""){\n\
								var cbox = document.getElementById(key[k]);\n\
								if(cbox){\n\
									cbox.checked = true;\n\
								}\n\
							}\n\
						}\n\
					}\n\
				}\n\
			}\n\
		}\n\
		';
}
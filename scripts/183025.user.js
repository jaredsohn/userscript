// ==UserScript==
// @name	   Idel Dungeon Fight
// @namespace  http://www.zeerd.com/
// @version	0.2.2
// @description  auto fight
// @match	  http://idle2.marrla.com/Map.aspx
// @copyright  2013+, zeerd
// @include	http://idle*.marrla.com/Map.aspx*
// ==/UserScript==

function create_gears(id){
	var html = "";
	html += "<select id='ipd_sel_"+id+"' style='width:160px;' >";
	html += "	<option value='1'>打怪技能组</option>";
	html += "	<option value='2'>PK技能组</option>";
	html += "	<option value='3'>团战技能组</option>";
	html += "	<option value='4'>其它技能组</option>";
	html += "	<option value='5'>备用技能组</option>";
	html += "	<option value='6'>贵族技能组</option>";
	html += "	<option value='7'>君主技能组</option>";
	html += "</select>";
	return html
}

function create_pd(){
	var html = "";
	
	html += "<div class='pagination-wrap'>";
	html += "<select id='ipd_sel' style='width:160px;' onchange='javascript:idfChangeDungeon()'>";
	html += "	<option value='9'>异世界的魔术 Lv44.</option>";
	html += "	<option value='10'>腐烂农场 Lv45.</option>";
	html += "	<option value='11'>黑暗教团 Lv54.</option>";
	html += "	<option value='12'>黑暗邪教之教主 Lv55.</option>";
	html += "	<option value='13'>不灭的执念 Lv64.</option>";
	html += "	<option value='14'>艾伦的秘密 Lv66.</option>";
	html += "	<option value='15'>疯狂的遭遇 Lv73.</option>";
	html += "	<option value='16'>黑与白 Lv78.</option>";
	html += "	<option value='7'>远古遗迹 Lv85.</option>";
	html += "	<option value='3'>禁断仪式 Lv87.</option>";
	html += "	<option value='5'>眼魔巢穴 Lv88.</option>";
	html += "	<option value='1'>闪耀的光球 Lv89.</option>";
	html += "	<option value='2'>魔域试炼 Lv90.</option>";
	html += "	<option value='4'>一言不和 Lv90.</option>";
	html += "	<option value='17'>月圆之夜 Lv95.</option>";
	html += "	<option value='18'>权力的游戏 Lv97.</option>";
	html += "	<option value='19'>传奇之路 Lv1.</option>";
	html += "</select>";
	html += "&nbsp;&nbsp;&nbsp;<input type='checkbox' id='ipd_ext'><span class='color2 f12 mr_10'>快速战斗</span>";	
	html += "<input type='checkbox' id='ipd_t'><span class='color2 f12 mr_10'>包含联盟成员</span>";	
	html += "<br/>"

	html += "<span class='color2 f12 mr_10'>选择自己的技能：</span>" + create_gears("my") + "<br/>";
	html += "<div id='ipd_p_skill1' class='color2 f12 mr_10'>选择队友及技能：队友ID<input type=\"text\" id=\"ipd_pid1\" name=\"ipd_pod1\" value=\"\">，技能" + create_gears("1") + "</div>";
	html += "<div id='ipd_p_skill2' class='color2 f12 mr_10'>选择队友及技能：队友ID<input type=\"text\" id=\"ipd_pid2\" name=\"ipd_pod2\" value=\"\">，技能" + create_gears("2") + "</div>";
	html += "<div id='ipd_p_skill3' class='color2 f12 mr_10'>选择队友及技能：队友ID<input type=\"text\" id=\"ipd_pid3\" name=\"ipd_pod3\" value=\"\">，技能" + create_gears("3") + "</div>";
	
	html += "<span class='color2 f12 mr_10'>间隔<input type=\"text\" id=\"ipd_interval\" name=\"ipd_interval\" value=\"15000\">毫秒战斗一次，</span>";
	html += "<span class='color2 f12 mr_10'>重复战斗<input type=\"text\" id=\"ipd_r_cnt\" name=\"ipd_r_cnt\" value=\"5\">次</span>";
 

	html += "<span style=\"display: block;\" id=\"ipd_btn\"><a href=\"javascript:ipdStartPD();\" class=\"color4\">开始自动打副本</a></span>";
	html += "<div id='ipd_count' class='color2 f12 mr_10'></div>";
	html += "</div>"
	html += "<div class='clear'></div><div class='thinline'></div><div class='clear'></div>";
	return html;
}

if (document.location.href.indexOf('marrla.com/Map.aspx') != -1){
	
	document.body.appendChild( document.createElement( 'div'));
	document.body.lastChild.innerHTML = create_pd();

	document.body.appendChild( document.createElement( 'frameset'));
	document.body.lastChild.innerHTML = '<frame src="" name="ipd_frame">';
	
	document.body.appendChild( document.createElement( 'script'));
	document.body.lastChild.innerHTML = 
		'\
		function ipdStartPD() { \n\
			var did = document.getElementById(\'ipd_sel\').value;\n\
			var url_t = (document.getElementById(\'ipd_t\').checked)?"t=a&":"";\n\
			var url_ext = (document.getElementById(\'ipd_ext\').checked)?"ext=true&":"ext=false&";\n\
			var url_did = "did=-" + did + "&";\n\
			var url_mg = "mg=" + document.getElementById(\'ipd_sel_my\').value + "&";\n\
			var url_cgid = "cgid=";\n\
			if(did == "9" || did == "10"){\n\
				url_cgid += document.getElementById(\'ipd_pid1\').value + "_" + document.getElementById(\'ipd_sel_1\').value;\n\
			}\n\
			else if(did == "17" || did == "18" || did == "19"){\n\
				url_cgid += document.getElementById(\'ipd_pid1\').value + "_" + document.getElementById(\'ipd_sel_1\').value + ",";\n\
				url_cgid += document.getElementById(\'ipd_pid2\').value + "_" + document.getElementById(\'ipd_sel_2\').value + ",";\n\
				url_cgid += document.getElementById(\'ipd_pid3\').value + "_" + document.getElementById(\'ipd_sel_3\').value;\n\
			}\n\
			else{\n\
				url_cgid += document.getElementById(\'ipd_pid1\').value + "_" + document.getElementById(\'ipd_sel_1\').value + ",";\n\
				url_cgid += document.getElementById(\'ipd_pid2\').value + "_" + document.getElementById(\'ipd_sel_2\').value;\n\
			}\n\
			var target_url = "pd.aspx?" + url_t + url_ext + url_did + url_mg + url_cgid;\n\
			//alert(target_url);\n\
			ipdSaveStorage(did);\n\
			ipdContinue(target_url, 1);\n\
		}\n\
		function ipdContinue(target_url, c){\n\
			document.getElementById(\'ipd_count\').innerHTML = c; \n\
			var max = document.getElementById(\'ipd_r_cnt\').value;\n\
			var interval = document.getElementById(\'ipd_interval\').value;\n\
			window.open(target_url, "ipd_frame");\n\
			if(c < max){\n\
				setTimeout(function(){\n\
					ipdContinue(target_url, (c+1));}, interval);\n\
			}\n\
            else{\n\
                document.getElementById(\'ipd_count\').innerHTML = "完成"; \n\
            }\n\
		}\n\
		function idfChangeDungeon(){\n\
			var did = document.getElementById(\'ipd_sel\').value;\n\
			ipdLoadStorage(did);\n\
		}\n\
		function ipdSaveStorage(did){\n\
			var setting = document.getElementById(\'ipd_t\').checked;\n\
			setting += \'|\' + document.getElementById(\'ipd_ext\').checked;\n\
			setting += \'|\' + document.getElementById(\'ipd_pid1\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_sel_1\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_pid2\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_sel_2\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_pid3\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_sel_3\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_interval\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_r_cnt\').value;\n\
			setting += \'|\' + document.getElementById(\'ipd_sel_my\').value;\n\
			if(window.localStorage){\n\
				//alert(setting);\n\
				window.localStorage.setItem("ipd_setting_" + did, setting);\n\
			}\n\
		}\n\
		function ipdLoadStorage(did){\n\
			if(window.localStorage){\n\
				var setting = window.localStorage.getItem("ipd_setting_" + did);\n\
				//alert(setting);\n\
				var key = setting.split(\'|\');\n\
				document.getElementById(\'ipd_t\').checked = (key[0]=="true");\n\
				document.getElementById(\'ipd_ext\').checked =(key[1]=="true");\n\
				document.getElementById(\'ipd_pid1\').value = key[2];\n\
				document.getElementById(\'ipd_sel_1\').value = key[3];\n\
				document.getElementById(\'ipd_pid2\').value = key[4];\n\
				document.getElementById(\'ipd_sel_2\').value = key[5];\n\
				document.getElementById(\'ipd_pid3\').value = key[6];\n\
				document.getElementById(\'ipd_sel_3\').value = key[7];\n\
				document.getElementById(\'ipd_interval\').value = key[8];\n\
				document.getElementById(\'ipd_r_cnt\').value = key[9];\n\
				document.getElementById(\'ipd_sel_my\').value = key[10];\n\
			}\n\
		}\n\
		';
}

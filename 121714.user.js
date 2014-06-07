// ==UserScript==
// @name		浙江工业大学原创教务系统助手
// @namespace	by McKelvin
// @description	浙江工业大学原创教务系统助手
// @version		Ver 1.0.30
// @include		http://www.ycjw.zjut.edu.cn/*
// @include		http://172.16.7.221/*
// @include		http://172.16.7.194/*
// @include		http://172.16.7.86/*
// ==/UserScript==
//
//=技能=
//* 登录界面自动选择登录类型为:[学生]
//* 进入成绩查询页面自动显示当前学期的的所有科目成绩
//* 自动计算当前页面平均绩点(Beta)
//* 自动评教勾选10分(手动提交评价结果)
//* 其他隐藏技能
//
//=用法=
//Google Chrome:
//1.点击右上角↗的[Install]
//Firefox:
//1.安装插件Greasemonkey(https://addons.mozilla.org/zh-CN/firefox/addon/... );
//2.点击右上角↗的[Install]
//其他浏览器:
//冇知 : (
//
(function () {
	var url = document.location.href;
	if (document.getElementById('Cbo_LX') != null) { /*UNLOGIN*/
		document.getElementById('Cbo_LX').value = '学生';
		return;
	}
	if (url.indexOf('stdgl/xkgl/ptxk/Web_ptxk_Main.aspx') != -1) { /*BiXiuKe*/
		document.getElementById('RtMod1_Lb_title').setAttribute('href', '/stdgl/xkgl/ptxk/Web_zgd_ptxk_new.aspx');
		document.getElementById('RtMod3_Lb_title').setAttribute('href', '/stdgl/xkgl/ptxk/Web_zgd_ptxk_tbx.aspx');
	} else if (url.indexOf('stdgl/xkgl/zyxxk/Web_xsxxkc_main.aspx') != -1) { /*XianXuanKe*/
		document.getElementById('RtMod1_Lb_title').setAttribute('href', '/stdgl/xkgl/zyxxk/Web_xsxxkc_select.aspx');
		document.getElementById('RtMod2_Lb_title').setAttribute('href', '/stdgl/xkgl/zyxxk/web_xsxxkc_tbx.aspx');
		document.getElementById('Rtmod4_Lb_title').setAttribute('href', '/stdgl/xkgl/zyxxk/web_xsxxkc_tbx_2.aspx');
	} else if (url.indexOf('/stdgl/xkgl/gxk/Web_GXK_Main.aspx') != -1) { /*GongXuanKe*/
		document.getElementById('RtMod1_Lb_title').setAttribute('href', '/stdgl/xkgl/gxk/Web_gxk_zyselect.aspx');
	} else if (url.indexOf('stdgl/cxxt/cjcx/Cjcx_Xsgrcj.aspx') != -1) { /*ScoreQuery*/
		if (document.getElementById('ddlXq').value == '') {
			document.getElementById('ddlXq').value = '2011/2012(2)';
			document.getElementById('ddlKc').value = '＝所有课程＝';
			document.getElementById('Button1').click();
		}
		var e = document.createElement('script');
		e.setAttribute('type', 'text/javascript'); /*e.setAttribute('src','http://localhost/cal.js');*/
		e.innerHTML = "function calGPA(withPE) { var scoreTable = document.getElementById('DataGrid1'); if (scoreTable != null) { var totalGrade = 0, totalSum = 0; for (var i = 1; i < scoreTable.rows.length; i++) { var courseName = scoreTable.rows[i].cells[1].innerHTML.replace(/(<([^>]+)>)/gi, \"\"), courseType = scoreTable.rows[i].cells[2].innerHTML.replace(/(<([^>]+)>)/gi, \"\"), forScore = scoreTable.rows[i].cells[3].innerHTML.replace(/(<([^>]+)>)/gi, \"\"), forGrade = scoreTable.rows[i].cells[5].innerHTML.replace(/(<([^>]+)>)/gi, \"\"); if (forScore == '免修') { cell.innerHTML='<input type=\"checkbox\" id=\"course\"'+i+'onclick=\"javascript:calGPA('+withPE+');\"/>'; continue; } if(!document.getElementById('course'+i).checked){ continue; } if (isNaN(forScore)) { switch (forScore) { case '优秀': forScore = 4.5; break; case '良好': forScore = 3.5; break; case '中等': forScore = 2.5; break; case '及格': forScore = 1.5; break; default: forScore = 0.0; } } else { forScore = (forScore >= 60) ? ((forScore - 50) / 10.0) : 0.0; } forGrade = forGrade * 1.0; totalGrade += (forGrade); totalSum += (forGrade * forScore); } var gpa = (totalSum / totalGrade).toFixed(3); if (!isNaN(gpa)) { var scoreHTML = '</br><font style=\"color:#FFFFFF;background-color:#006699\">本页平均绩点:' + gpa + '</font>'; document.getElementById('Table3').rows[0].cells[0].innerHTML = '<span id=\"Label1\"><font color=\"#0000C0\" size=\"2\">学生各类成绩查询</font></span>' + scoreHTML; } } }";
		document.body.appendChild(e);
		(function (withPE) {
			var scoreTable = document.getElementById("DataGrid1");
			if (scoreTable != null) {
				var totalGrade = 0,
					totalSum = 0;
				for (var i = 1; i < scoreTable.rows.length; i++) {
					var courseName = scoreTable.rows[i].cells[1].innerHTML.replace(/(<([^>]+)>)/gi, ""),
						courseType = scoreTable.rows[i].cells[2].innerHTML.replace(/(<([^>]+)>)/gi, ""),
						forScore = scoreTable.rows[i].cells[3].innerHTML.replace(/(<([^>]+)>)/gi, ""),
						forGrade = scoreTable.rows[i].cells[5].innerHTML.replace(/(<([^>]+)>)/gi, "");
					var cell = document.getElementById("DataGrid1").rows[i].insertCell(-1);
					if (courseType == '公选课' || courseName.indexOf('体质健康训练') != -1 || courseName.indexOf('军训') != -1 || (!withPE && courseName.indexOf('体育') != -1) || forScore == '免修') {
						cell.innerHTML = '<input type="checkbox" id="course' + i + '" onclick="javascript:calGPA(' + withPE + ');"/>';
						continue;
					} else {
						cell.innerHTML = '<input type="checkbox" id="course' + i + '" checked onclick="javascript:calGPA(' + withPE + ');"/>';
					}
					if (isNaN(forScore)) {
						switch (forScore) {
						case '优秀':
							forScore = 4.5;
							break;
						case '良好':
							forScore = 3.5;
							break;
						case '中等':
							forScore = 2.5;
							break;
						case '及格':
							forScore = 1.5;
							break;
						default:
							forScore = 0.0;
						}
					} else {
						forScore = (forScore >= 60) ? ((forScore - 50) / 10.0) : 0.0;
					}
					console.log(forGrade + 'x' + forScore + '=' + (forGrade * forScore));
					forGrade = forGrade * 1.0;
					totalGrade += (forGrade);
					totalSum += (forGrade * forScore);
				}
				console.log(totalSum + '/' + totalGrade + '=' + (totalSum / totalGrade));
				var gpa = (totalSum / totalGrade).toFixed(3);
				if (!isNaN(gpa)) {
					var scoreHTML = '</br><font style="color:#FFFFFF;background-color:#006699">本页平均绩点:' + gpa + '</font>';
					document.getElementById("Table3").rows[0].cells[0].innerHTML = '<span id="Label1"><font color="#0000C0" size="2">学生各类成绩查询</font></span>' + scoreHTML;
				}
			}
		})(true);
	} else if (url.indexOf('/stdgl/pjgl/Web_StdPG.aspx?kcjsid') != -1) {
		for (var i = 2; i < 12; i++) {
			var rs = document.getElementsByName('DG_GXK:_ctl' + i + ':Cbo_BZ');
			rs[0].checked = true;
		}
	}
})();

// ==UserScript==
// @name          大连海事大学教务系统增强
// @author        紫云飞
// @namespace     
// @description  教务系统自己的学分计算在某种情况会出现错误
// @include       http://jwc.dlmu.edu.cn/Menu.jsp?UserType=BASE_STUDENT*
// @include       http://202.118.90.197/Menu.jsp?UserType=BASE_STUDENT*
// ==/UserScript==
(function main() {
	if (window.location.href.indexOf("Menu.jsp?UserType=BASE_STUDENT") == -1) return;
	var tongji = document.getElementById("outlookdivin0");
	var tongjibutton = document.createElement("span");
	tongjibutton.innerHTML = '<a title="学分统计" href="#">学分统计</a></span><br/>';
	tongjibutton.addEventListener('click', startTongJi, false);
	if (tongji) tongji.insertBefore(tongjibutton, tongji.firstChild)
})();
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}
function delSameName(id, num) {
	var samename = xpath("//*[td[2][contains(text(),'" + id + "')]]/td[3]");
	if (samename.snapshotLength) {
		for (var i = 0; i < samename.snapshotLength; i++) {
			samename.snapshotItem(i).innerHTML = samename.snapshotItem(i).innerHTML + "(" + num + ")"
		}
	}
}
function showNoPass() {
	var nopass = xpath("//*[td[4][contains(text(),'课')]][td[9][contains(text(),'0')]]/td[3]/text()");
	var guake = "";
	if (nopass.snapshotLength) {
		for (var i = 0; i < nopass.snapshotLength; i++) {
			if (guake.indexOf("|" + nopass.snapshotItem(i).data + "|") == -1) {
				guake += "|" + nopass.snapshotItem(i).data + "|<br />";
			}
		}
	}
		guake = guake.replace(/\|/g, "");
		if (guake == "") guake = "无";
		return guake;
}
function needRehabilitate() {
	var passclass = xpath("//*[td[4][contains(text(),'必修')]][td[9][not(contains(text(),'0'))]]/td[3]/text()");
	var nopassclass = xpath("//*[td[4][contains(text(),'必修')]][td[9][contains(text(),'0')]]/td[3]/text()");
	var makeupclass = xpath("//*[td[4][contains(text(),'必修')]][td[7][contains(text(),'补考')]]/td[3]/text()");
	var needchongxiu = needbukao = ""
	if (passclass.snapshotLength) {
		for (var i = 0, passclassname; i < passclass.snapshotLength; i++) {
			passclassname += "|" + passclass.snapshotItem(i).data + "|"
		}
	}
	if (makeupclass.snapshotLength) {
		for (var i = 0, makeupclassname; i < makeupclass.snapshotLength; i++) {
			makeupclassname += "|" + makeupclass.snapshotItem(i).data + "|"
		}
	}
	if (nopassclass.snapshotLength) {
		for (var i = 0; i < nopassclass.snapshotLength; i++) {
			if (passclassname.indexOf("|" + nopassclass.snapshotItem(i).data + "|") == -1) {
				if (makeupclassname.indexOf("|" + nopassclass.snapshotItem(i).data + "|") != -1) {
					if (needchongxiu.indexOf("|" + nopassclass.snapshotItem(i).data + "|") == -1) {
						needchongxiu += "|" + nopassclass.snapshotItem(i).data + "|<br />"
					}
				} else {
					var weibukao = xpath("//*[td[3][text()='" + nopassclass.snapshotItem(i).data + "']]/td[8]/text()");
					if (weibukao.snapshotLength) {
						for (var j = 0; j < weibukao.snapshotLength; j++) {
							if (Number(weibukao.snapshotItem(j).data) < 41 || String(weibukao.snapshotItem(j).data).indexOf("旷考") != -1) {
								if (needchongxiu.indexOf("|" + nopassclass.snapshotItem(i).data + "|") == -1) {
									needchongxiu += "|" + nopassclass.snapshotItem(i).data + "|<br />"
								}
							} else {
								if (needbukao.indexOf("|" + nopassclass.snapshotItem(i).data + "|") == -1) {
									needbukao += "|" + nopassclass.snapshotItem(i).data + "|<br />";
									if (needchongxiu.indexOf("|" + nopassclass.snapshotItem(i).data + "|") != -1) {
										needchongxiu.replace(/"|" + nopassclass.snapshotItem(i).data + "|"/, "")
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (needbukao == "") needbukao = "无"
	if (needchongxiu == "") needchongxiu = "无"
	needchongxiu = needchongxiu.replace(/\|/g, "");
	needbukao = needbukao.replace(/\|/g, "");
	return [needbukao, needchongxiu]
}
function countCredit(type) {
	var class = xpath("//*[td[4][contains(text(),'" + type + "')]][td[9][not(contains(text(),'0'))]]/td[3]/text()");
	if (class.snapshotLength) {
		for (var i = 0, classname = "", classcredit = 0; i < class.snapshotLength; i++) {
			if (classname.indexOf("|" + class.snapshotItem(i).data + "|") == -1) {
				classname += "|" + class.snapshotItem(i).data + "|";
				classcredit += Number(xpath("//*[td[4][contains(text(),'" + type + "')]][td[3][text()='" + class.snapshotItem(i).data + "']][td[9][not(contains(text(),'0'))]]/td[6]/text()").snapshotItem(0).data)
			}
		}
	}
	return classcredit
}
function rehabilitate() {
	var chongxiu = new Array("无", "无", "无", 0);
	var allclass = xpath("//*[td[4][contains(text(),'修课')]][td[7][contains(text(),'期末')]]/td[3]/text()");
	if (allclass.snapshotLength) {
		for (var i = 0, allclassname = ""; i < allclass.snapshotLength; i++) {
			allclassname += "|" + allclass.snapshotItem(i).data + "|"
		}
		for (var i = 0, unicclassname = ""; i < allclass.snapshotLength; i++) {
			if (unicclassname.indexOf("|" + allclass.snapshotItem(i).data + "|") == -1) {
				unicclassname += "|" + allclass.snapshotItem(i).data + "|";
				switch (allclassname.split("|" + allclass.snapshotItem(i).data + "|").length - 1) {
				case 2:
					if (chongxiu[0] == "无") {
						chongxiu[0] = ""
					}
					chongxiu[0] += allclass.snapshotItem(i).data + "<br />";
					chongxiu[3] += Number(xpath("//*[td[3][text()='" + allclass.snapshotItem(i).data + "']]/td[6]/text()").snapshotItem(0).data);
					break;
				case 3:
					if (chongxiu[1] == "无") {
						chongxiu[1] = ""
					}
					chongxiu[1] += allclass.snapshotItem(i).data + "<br />";
					chongxiu[3] += 2 * Number(xpath("//*[td[3][text()='" + allclass.snapshotItem(i).data + "']]/td[6]/text()").snapshotItem(0).data);
					break;
				case 4:
					if (chongxiu[2] == "无") {
						chongxiu[2] = ""
					}
					chongxiu[2] += allclass.snapshotItem(i).data + "<br />";
					chongxiu[3] += 3 * Number(xpath("//*[td[3][text()='" + allclass.snapshotItem(i).data + "']]/td[6]/text()").snapshotItem(0).data)
				}
			}
		}
	}
	return chongxiu
}
function startTongJi() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + 'ACTIONQUERYSTUDENTSCORE.APPPROCESS?mode=2',
		onload: function(responseDetails) {
			tongJiGuoCheng(responseDetails)
		}
	})
}
function show(a, b) {
	document.write("<tr><td height='25' width='30%' align='center'>" + a + "</td><td height='25' width='30%' align='center'>" + b + "</td></tr>")
}
function tongJiGuoCheng(responseDetails) {
	document = top.frames[2].document;
	document.write(responseDetails.responseText);
	delSameName(13013511, 1);
	delSameName(13013512, 2);
	var bixiu = countCredit("必修");
	var xianxuan = countCredit("限选");
	var renxuan = countCredit("任选");
	var chongxiu = rehabilitate();
	var needbukao = needRehabilitate()[0];
	var needchongxiu = needRehabilitate()[1];
	var zongfen = bixiu + xianxuan + renxuan;
	var guake = showNoPass();
	top.frames[2].location.href = "about:blank";
	document.write("<table borderColor='#ff9999'border='1' height='0' cellSpacing='0' cellPadding='0' width='600' align='center'>");
	show("已修必修课学分", bixiu);
	show("已修限选课学分", xianxuan);
	show("已修任选课学分", renxuan);
	show("已修课程总学分", zongfen);
	show("未及格过课程", guake);
	show("重修一次课程", chongxiu[0]);
	show("重修两次课程", chongxiu[1]);
	show("重修三次课程", chongxiu[2]);
	show("重修课程学分统计", chongxiu[3]);
	show("重修课程总费用", chongxiu[3] * 115.5 + " 元");
	show("需要重修的必修课", needchongxiu);
	show("需要补考的必修课", needbukao);
	document.write("</table>");
	top.frames[2].stop()
}
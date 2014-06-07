// ==UserScript==
// @name           mumanage
// @namespace      nidongde
// @include        http://*.e-sim.org/militaryUnitStorage.html*
// @include        http://*.e-sim.org/militaryUnitMembers.html*
// @include        http://*.e-sim.org/militaryUnitMoneyAccount.html*
// @include        http://*.e-sim.org/myMilitaryUnit.html
// @include        http://*.e-sim.org/militaryUnit.html*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//2014/1/1
//增加防止页面链接被聊天框挡着点不到的问题（虽然与此脚本没关系

//============================================================================
//共通方法
//============================================================================
function getHostPath() {
	return (window.location.hostname.toLowerCase().match("primera")) ? "http://primera.e-sim.org" : "http://secura.e-sim.org";
}
String.prototype.trim = function() { return this.replace(/(^[\t\n\r\s]*)|([\t\n\r\s]*$)/g, ""); } 

function getOneDataTable() {
	return document.evaluate("//table[@class='dataTable']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function isTargetHtml(targetHtml) {
	if (window.location.pathname.substring(0,targetHtml.length)==targetHtml) {
		return true;
	} else {
		return false;
	}
}

//---------------------------------------------------
//常量
//---------------------------------------------------

RankMap = {
	"Rookie"                       : 1.0,
	"Private"                      : 1.1,
	"Private First Class"          : 1.2,
	"Corporal"                     : 1.3,
	"Sergeant"                     : 1.4,
	"Staff Sergeant"               : 1.5,
	"Sergeant First Class"         : 1.6,
	"Master Sergeant"              : 1.65,
	"First Sergeant"               : 1.7,
	"Sergeant Major"               : 1.75,
	"Command Sergeant Major"       : 1.8,
	"Sergeant Major of the Army"   : 1.85,
	"Second Lieutenant"            : 1.9,
	"First Lieutenant"             : 1.93,
	"Captain"                      : 1.96,
	"Major"                        : 2.0,
	"Lieutenant Colonel"           : 2.03,
	"Colonel"                      : 2.06,
	"Brigadier General"            : 2.1,
	"Major General"                : 2.12,
	"Lieutenant General"           : 2.14,
	"General"                      : 2.16,
	"General of the Army"          : 2.18,
	"Marshall"                     : 2.2,
	"Field Marshall"               : 2.22,
	"Supreme Marshall"             : 2.24,
	"Generalissimus"               : 2.26
};
MUMap = {
	"Novice"  : 1.05,
	"Regular" : 1.10,
	"Veteran" : 1.15,
	"Elite"   : 1.20
};

//---------------------------------------------------
//Main
//---------------------------------------------------

$(document).ready(function() {
	
	var MU_ID;
	var MU_RANK;
	var MU_TOTLE_MEMBERS;
	var MU_PAGE_ELE;
	var LIST_OBJ;
	var MU_STR_SUM;
	var MU_STR_CNT;

	function inits() {
		tmps=document.getElementById('tickAll').parentNode;
		tt = document.createElement("div");
		tt.innerHTML = ""
					 + "<input type='button' value='计算力量信息' id='getinfo' style='float: left; '/>"
					 + "<input type='button' value='平均力量(显示用)' id='getstr' style='float: left;'/>"
//					 + "<input type='button' value='军垦信息' id='getworkinfo' style='float: left;'/>"
//					 + "<input type='button' value='信息清空' id='inputclear' style='float: left;'/>"
		 			 + "<p style='clear: both'></p>"
					 + "<input type='button' value='Tick off' id='tickoff' style='float: left;width:15pt'/>"
					 + "<input type='button' value='正选' id='doset' style='float: left;width:10pt'/>"
					 + "<input type='button' value='反选' id='unset' style='float: left;width:10pt'/>"
					 + "<input type='button' value='获得勾选ID' id='getchecked' style='float: left;width:25pt'/>"
		 			 + "<p style='clear: both'></p>"
					 + "<textarea style='' id='memberlist'></textarea>"
					 ;
		tmps.insertBefore(tt, tmps.children[1]);
		
		//muid = $("[href^='militaryUnit.html?id=']",$(document.getElementById('leaveMilitaryUnit').parentNode.parentNode)).attr('href').replace(/^[\d\D]*?id=(\d*)$/m,"$1");

//		tmps = document.getElementById('contentRow').children[1];
//		MU_ID = tmps.innerHTML.replace(/^[\d\D]*?militaryUnit\.html\?id=([\d]*)">[\d\D]*$/m,"$1");
//		MU_RANK = tmps.innerHTML.replace(/^[\d\D]*?Military rank[^>]*>([^<]*)<[\d\D]*$/m,"$1");
//		MU_TOTLE_MEMBERS = Number(tmps.innerHTML.replace(/^[\d\D]*?Total members:[^>]*>([^<]*)<[\d\D]*$/m,"$1"));
		
		$("#memberlist").val(GM_getValue("MU_INPUT_INFO","请输入团员id 换行区分"));
		$("#memberlist").width(GM_getValue("MU_INPUT_WIDTH","100"));
		$("#memberlist").height(GM_getValue("MU_INPUT_HEIGHT","75"));
		
		window.setTimeout(setPos,2000)
	}
	
//	function inits2() {
//		tmps=$(":submit[value='Show']").get(0).parentNode;
//		tt = document.createElement("input");
//		tt.type = "button"
//		tt.value = "显示力量";
//		tt.id = "showStr";
//		tmps.insertBefore(tt, tmps.children[2]);
////		$(tmps).append("<input type='button' value='显示力量' id='showStr' style='float: left;'/>");
//	}
//	
	function setPos() {
		$("#newChatMsg0").css("top","2000px");
	}

	function inits3() {
		tt = "<div>"
			+ "<input type='button' value='计算力量信息' id='getinfo2' style='float: left; '/>"
			+ "<input type='button' value='平均力量(显示用)' id='getstr' style='float: left;'/>"
			+ "<p style='clear: both'></p>"
			+ "</div>";
		$("#militaryUnitContainer").next().eq(0).next().eq(0).next().eq(0).children().eq(0).before(tt);
		
		window.setTimeout(setPos,2000)
	}
	
	if (isTargetHtml("/militaryUnitStorage.html")) {
		MU_PAGE_ELE = "donateProductForm";
		inits();
	} else if (isTargetHtml("/militaryUnitMoneyAccount.html")) {
		MU_PAGE_ELE = "donateMoneyForm";
		inits();
//	} else if (isTargetHtml("/militaryUnitMembers.html")) {
//		inits2();
	} else if (isTargetHtml("/myMilitaryUnit.html")) {
		inits3();
	} else if (isTargetHtml("/militaryUnit.html")) {
		inits3();
	}
	
//	function getMsgInfo(msg) {
//		var json = jQuery.parseJSON(msg);
//		str = json.strength;
//		dmg = json.damageToday;
//		//力量 军衔 MU 本地 Q1
//		basedmg = str*RankMap[json.rank]*MUMap[MU_RANK]*1.2*1.2;
//		
//		tmp="　"
//			+"str=" + str + "　"
//			+(dmg/10000).toFixed(0) + "w / "
//			+(basedmg*50/10000).toFixed(0) + "w / "
//			+(basedmg*100/10000).toFixed(0) + "w"
//		
//		sumstr=GM_getValue("MU_STR_SUM",0)+str;
//		GM_setValue("MU_STR_SUM",sumstr);
//		sumcnt=GM_getValue("MU_STR_CNT",0)+1;
//		GM_setValue("MU_STR_CNT",sumcnt);
//		$("#getstr").val((sumstr/sumcnt).toFixed(0));
//		
//		return tmp;
//	}
	
//	function setUserInfo(id) {
////		if (id!="19892") {
////			return false;
////		} else {
////			alert("go");
////		}
//		
//		$.ajax({
//			type: "GET",
//			url: getHostPath()+"/apiCitizenById.html?id=" + id,
////			timeout: 5000,
//			success: function(msg) {
////				alert(msg);
//				
//				tmp = $("[href='profile.html?id="+id+"']","#"+MU_PAGE_ELE);
//				sp = tmp.html().split("　");
//				tmp.html(sp[0]+getMsgInfo(msg));
//				
//			},
//			error: function(msg) {
////				alert("error id="+id);
//				setUserInfo(id);
//			}
//		});
//	}
	
//	function xxxxxx() {
//		$(".receipments").each(function(){
//			setUserInfo($(this).val());
//		});
//	}
	
	$("#tickoff").click(function() {
		$(".receipments").attr('checked',false);
		return false; 
	});
	function getStrInfo(id) {
		var ret;
		$.ajax({
			type: "GET",
			url: getHostPath()+"/apiCitizenById.html?id=" + id,
//			timeout: 5000,
			async: false,
			success: function(msg) {
//				alert(msg);

				var json = jQuery.parseJSON(msg);
				str = json.strength;
				dmg = json.damageToday;
				
				MU_STR_CNT+=1;
				MU_STR_SUM+=Number(str);
				
				$("#getstr").val((MU_STR_SUM/MU_STR_CNT).toFixed(1));
				
				ret="力量:" + str + "　" + "已输出:" + (dmg/10000).toFixed(1) + "w";
			},
			error: function(msg) {
				ret="力量信息取得失败！";
			}
		});
		return ret;
	}
	$("#getinfo").click(function() {
		MU_STR_SUM=0;
		MU_STR_CNT=0;
		$("#getstr").val("0");
		
		list=$("#tickAll").next().nextAll();
		list.each(function(){
			//alert($(this).attr('href'))
			
			txt=$(this).attr('href');
			//profile.html?id=287327
			if (txt != null && txt.indexOf("profile.html")>=0) {
				txt=txt.replace("profile.html?id=","");
				$(this).text($(this).text() + "　" + getStrInfo(txt));
				//return false;
			}
		});
		alert("over");
	});
	$("#getinfo2").click(function() {
		MU_STR_SUM=0;
		MU_STR_CNT=0;
		$("#getstr").val("0");
		
		list=$("#militaryUnitContainer").nextAll().eq(2).find("a");
		list.each(function(){
			//alert($(this).attr('href'))
			
			txt=$(this).attr('href');
			//profile.html?id=287327
			if (txt != null && txt.indexOf("profile.html")>=0) {
				txt=txt.replace("profile.html?id=","");
				$(this).text($(this).text() + "　" + getStrInfo(txt));
				//return false;
			}
		});
		alert("over");
	});
//	$("#getstr").click(function() {
//		this.value=(GM_getValue("MU_STR_SUM",0)/MU_TOTLE_MEMBERS).toFixed(1);
//	});
	
//	function setFactoryInfo(id) {
////		if (id!="346") {
////			return false;
////		} else {
////			alert("go");
////		}
//		
//		$.ajax({
//			type: "GET",
//			url: getHostPath()+"/companyWorkResults.html?id=" + id,
//			timeout: 5000,
//			error: function(msg) {
//				setFactoryInfo(id);
//			},
//			success: function(msg) {
////				alert(msg);
//				
//				msg = msg.replace(/^[\d\D]*(Historical work results[\d\D]*)$/m,"$1");
//				
//				sp = msg.match(/profile\.html\?id=[\d]*"/gm);
//				for (k in sp) {
//					userid = sp[k].replace('profile.html?id=','').replace('"','');
////					alert(userid);
//					if (MU_PAGE_ELE != "") {
//						tmp = $("[href='profile.html?id="+userid+"']","#"+MU_PAGE_ELE);
//					} else {
//						tmp = $("[href='profile.html?id="+userid+"']",LIST_OBJ);
//					}
////					alert(tmp.html());
//					if (tmp.length != 0) {
//						sp2 = tmp.html().split("　");
//						tmp.html(sp2[0]+"　FactoryID="+id);
//						if (MU_PAGE_ELE != "") {
//							$(":checkbox[value='"+userid+"']").attr('checked',true);
//						}
//					}
//				}
//			}
//		});
//	}
//	function getWorkInfo() {
////		MU_ID=134;
//		$.ajax({
//			type: "GET",
//			url: getHostPath()+"/militaryUnitCompanies.html?id=" + MU_ID,
//			timeout: 10000,
//			error: function(msg) {
//				getWorkInfo();
//			},
//			success: function(msg) {
////				alert(msg);
//				sp = msg.match(/company\.html\?id=[\d]*"/gm);
////				alert(sp);
//				//company.html?id=4285",company.html?id=4385"
//				for (k in sp) {
//					tmp = sp[k].replace('company.html?id=','').replace('"','');
//					setFactoryInfo(tmp);
//				}
//			}
//		});
//	}
//	$("#getworkinfo").click(function() {
//		$(".receipments").attr('checked',false);
//		getWorkInfo();
//	});
	
	
	
	
	function saveInputSize() {
		GM_setValue("MU_INPUT_WIDTH",$("#memberlist").width().toFixed(0));
		GM_setValue("MU_INPUT_HEIGHT",$("#memberlist").height().toFixed(0));
	}
	
	$("#memberlist").focus(function() {
		saveInputSize();
	});
	$("#memberlist").mouseout(function() {
		saveInputSize();
	});
	

//	function setUserInfo2(id, obj) {
////		if (id!="19892") {
////			return false;
////		} else {
////			alert(id);
////		}
//		$.ajax({
//			type: "GET",
//			url: getHostPath()+"/apiCitizenById.html?id=" + id,
//			timeout: 5000,
//			error: function(msg) {
//				setUserInfo2(id, obj);
//			},
//			success: function(msg) {
////				alert(msg);
//				tmp = $("[href='profile.html?id="+id+"']",LIST_OBJ);
//				sp = tmp.html().split("　");
//				tmp.html(sp[0]+getMsgInfo(msg));
//			}
//		});
//	}
	
	function doCommChecked(cmd) {
		GM_setValue("MU_INPUT_INFO",$("#memberlist").val());
		list=$("#tickAll").next().nextAll();
//		alert(list)
//		alert(list.html())
//		alert($(list).html())
		
		sp = $("#memberlist").val().split("\n");
		for (k in sp) {
//			reg = new RegExp('^[\\d\\D]*?profile.html\\?id=([\\d]*?)">'+tmp+'<[\\d\\D]*$',"m");
//			userid = txt.replace(reg,"$1");
			list.each(function(){
				//alert($(this).attr('href'))
				
				txt=$(this).attr('href');
				//profile.html?id=287327
				if (txt != null && txt.indexOf("profile.html")>=0 && $(this).text().replace("★ ","") == sp[k].trim()) {
					txt=txt.replace("profile.html?id=","");
					$(":checkbox[value='"+txt+"']").attr('checked',cmd);
					return false;
				}
			});
		}
		
//		sp = $("#memberlist").val().split("\n");
//		txt = document.getElementById(MU_PAGE_ELE).innerHTML;
//		for (k in sp) {
//			tmp = sp[k].trim();
//			if (tmp != "" && tmp != "-") {
//				if (tmp.substr(0, 2) == "- ") {
//					tmp = tmp.substr(2);
//				}
//				reg = new RegExp('^[\\d\\D]*?profile.html\\?id=([\\d]*?)">'+tmp+'<[\\d\\D]*$',"m");
//				userid = txt.replace(reg,"$1");
//				$(":checkbox[value='"+userid+"']").attr('checked',cmd);
//			}
//		}
	}
	
	$("#doset").click(function() {
		doCommChecked(true);
	});
	$("#unset").click(function() {
		doCommChecked(false);
	});
	$("#getchecked").click(function() {
		list=$("#tickAll").next().nextAll();
		tmp="";
		list.filter("[checked='true']").each(function(){
//			alert($(this).attr("value"));
			
			txt=$(this).attr('value');
			tmp+=list.filter("[href='profile.html?id="+txt+"']").eq(0).text().replace("★ ","") + "\n";
		});
		$("#memberlist").val(tmp);
	});
//	$("#inputclear").click(function() {
//		$("a[href^='profile.html']",LIST_OBJ).each(function(){
//			this.innerHTML = this.innerHTML.split("　")[0];
//		});
//	});
	

	function addStr(id, obj) {
//		if (id!="19892") {
//			return false;
//		} else {
//			alert("go");
//		}
		
		$.ajax({
			type: "GET",
			url: getHostPath()+"/apiCitizenById.html?id=" + id,
			timeout: 5000,
			success: function(msg) {
				var json = jQuery.parseJSON(msg);
				str = json.strength;
				obj.innerHTML = obj.innerHTML + "<td>" + str + "</td>";
			},
			error: function(msg) {
				addStr(id, obj);
			}
		});
	}
	$("#showStr").click(function() {
		results = getOneDataTable();
		tmp = results.children[0].children[0];
		tmp.innerHTML = tmp.innerHTML + "<td>Strength</td>";
		tmp = results.children[0];
		for (var j = 1; j < tmp.children.length; j++) {
			obj = tmp.children[j].children[0];
			id = obj.innerHTML.replace(/^[\d\D]*profile.html\?id=(\d*)">[\d\D]*$/m,"$1");
//			if (j==1){alert(id);}
			addStr(id, tmp.children[j]);
		}
	});
	
});

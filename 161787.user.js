// ==UserScript==
// @name           18p2p_faceText
// @description    18p2p颜文字输入
// @include        http://210.6.90.*/*
// @include        http://14.102.250.18/*
// @include        http://*18p2p.com/*
// @include        http://18p2p.z4.cc/*
// @updateURL      https://userscripts.org/scripts/source/161787.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161787.user.js
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2013.3.18.0
// ==/UserScript==


//初始颜文字表情
const defaultFaceText = {
	"faceText0" : ["(>_<)", "o(>< )o", "ｏ( ><)o", "（＞д＜）", "ヽ(#`Д´)ﾉ", "ヽ(≧Д≦)ノ", "＞﹏＜", "┌( ಠ_ಠ)┘"],
	"faceText1" : ["(￣︿￣)", "(¬д¬。)", "(¬､¬)", "（；¬＿¬)", "(;¬_¬)", "(；¬д¬)", "( ;´Д`)", "o(￣ヘ￣o＃)"],
	"faceText2" : ["T_T", "(T＿T)", "（ ＴДＴ）", "(ToT)", "(Ｔ▽Ｔ)", "(T_T)", "（；へ：）", "(ノД`)・゜・。", "(´＿｀。)", "(´Ａ｀。)", "(´∩｀。)", "(*´；ェ；`*)", "(个_个)", ",,Ծ‸Ծ,,", "〒▽〒"],
	"faceText3" : ["(*ﾟ∇ﾟ)", "(*´∀`)", "( ﾟ∀ﾟ)", "o(ノﾟ∀ﾟ)ノ", "(￣∇￣)", "o(*≥▽≤)ツ", "(`・ω・´)", "(｡◕∀◕｡)", "ノ( ◕‿‿◕ )ノ", "(๑￫ܫ￩)", "（＠￣）￣＠）", "(●'‿'●)", "(✿✪‿✪｡)ﾉ♡", "(O ^ ~ ^ O)"],
	"faceText4" : ["(￣(エ)￣)", "(^(エ)^)", "⊂(・(ェ)・)⊃", "(*￣(ｴ)￣*)", "(=^･ｪ･^=)", "(=;ェ;=)", "ヽ(=^･ω･^=)丿", "<(*ΦωΦ*)>", "Uo･ｪ･oU", "ヾ(●ω●)ノ", "U・♀・U", "U＾ェ＾U", "（´(ｪ)‘）"],
	"faceText5" : ["(*・_・)ノ⌒ ⌒ ⌒╭*", "*★.°*:.☆(￣▽￣)ノ:*.°★* 。", "╭∩╮（￣︿￣）╭∩╮", "(╯｀□′)╯～～╧╧", "((((*｡_｡)_", "⊂彡☆))д`)", "(￣3￣)", "(|||ﾟдﾟ)", "(　д ) ﾟ ﾟ", "@_@", "-_-!!!", "(`ε´ )", "(→_→)", "(@[]@!!)"],
	"faceText6" : ["⊙﹏⊙‖∣°", "(—。—) . z  Z"],
	"faceText7" : ["段落演示"]
};
const EasyInsertTextDemo = {
	"段落演示" : "18p2p是个好地方，我们都要爱护它。"
};

//去除页面上的title是黑条的式样
unsafeWindow.showPopupText = undefined;
document.onmouseover = function(){return false;}

//定义代码简化
function lodex(r) {
	return window.location.href.indexOf(r);
}
//脚本双存储相互恢复
if (!localStorage.userFaceText && GM_getValue("userFaceText", "") != "") {
	localStorage.userFaceText = GM_getValue("userFaceText");
}
if (GM_getValue("userFaceText", "") == "" && localStorage.userFaceText) {
	GM_setValue("userFaceText", localStorage.userFaceText);
}

if (!localStorage.EasyInsertText && GM_getValue("EasyInsertText", "") != "") {
	localStorage.EasyInsertText = GM_getValue("EasyInsertText");
}
if (GM_getValue("EasyInsertText", "") == "" && localStorage.EasyInsertText) {
	GM_setValue("EasyInsertText", localStorage.EasyInsertText);
}

//脚本主CSS
var replyCss = "";
replyCss += ".insertFacetxt,.quickInsert{background-color: #E5E5E0; padding:0px 3px; margin:2px 6px; cursor:pointer; display:inline-block;}";
replyCss += "#faceTextDiv{background-color:lightGrey; width:658px;}#faceTextDiv td{padding:0px !important;}";
replyCss += ".FTLeftDiv{cursor:pointer; display:inline-block; background-color:lightGrey;padding:3px 10px; width:36px;}";
replyCss += ".FTRightDiv{display:inline-block; background-color:lightGrey; padding:3px 6px; width:579px;}";
replyCss += ".closeFTDivbt{cursor:pointer; float:right; margin:0px -2px; width:16px; height:16px;}";
replyCss += "#editorButton{cursor:pointer; padding:10px 8px 0px 8px; display:inline-block; color:#3163B6;}";
replyCss += "#editorButton_lzl{margin:0 5px 3px 5px; float:right;cursor:pointer; font-size:1.2em; display:inline-block; color:#3163B6;}";
replyCss += ".editFaceTxtTb{width:200px; padding:1px 1px 0 0;} .inputInTdFt{width:199px;} .FTbutton{float:right; padding:0px 10px; margin:15px 10px 0px 0px}";
replyCss += "#defaultDiv{color: red; padding:0px 10px; margin:15px 0px 0px 159px}";
replyCss += "#newEditDiv{border: 1px solid gray; width:612px; z-index:2000; background-color:#EEEEEE; padding:20px; position:fixed; left:200px; bottom:80px;} #newEditDiv *:not(.pageTitle),#faceTextDiv *{font-size:12px !important;}";
replyCss += ".quickEditdiv{margin:1px; border: 1px solid gray; width:200px; display:inline-block;}"
replyCss += ".qdisplayDiv{margin-left:3px; width:137px; display:inline-block;}"
replyCss += ".modifyQuichText{padding-left:3px; background-color:#D0FFD0; cursor:pointer; width:27px; display:inline-block;}"
replyCss += ".deleteQuichText{padding-left:3px; background-color:#FFD0D0; cursor:pointer; width:27px; display:inline-block;}";
replyCss += "#fuuuffs{width:612px;} .margin-top30{padding-top:20px;} .editSbuttom{ display:inline-block; padding:0px 10px; margin-right:9px; margin-top:10px;}"
replyCss += "#titleInput{width:136px;} #lotTextArea{width:454px} #inSertThenSubmit{position:relative; top:1px;} .checkboxDiv{float:right; margin:18px 50px 0px 0px}";
GM_addStyle(replyCss);

var Tds = []; //数据修改用列表


//函数 数组字符串重排序
Array.prototype.reIndex = function () {
	var lastStr = this.sort(function (a, b) {
			return a.localeCompare(b)
		});
	return lastStr;
}
//提取localStorage的参数
function getLSJS(a) {
	return JSON.parse(localStorage[a] ? localStorage[a] : "{}");
}
//简化脚本
function crE(a) {
	return document.createElement(a);
}
function getId(a) {
	return document.getElementById(a);
}
//函数 载入各名单
function loadThe(ff) {
	function ffe(ww) {
		$("#tdRightDiv" + ww + ">.insertFacetxt,#tdRightDiv" + ww + ">.quickInsert").remove();
		var searchSave = getLSJS("userFaceText");
		myFri = (searchSave["faceText" + ww]) ? searchSave["faceText" + ww] : defaultFaceText["faceText" + ww];
		if (ww == "7") {
			aqq = (localStorage.EasyInsertText) ? JSON.parse(localStorage.EasyInsertText) : EasyInsertTextDemo;
			myFri = myFri.reIndex();
		}
		var parentDiv = $("#tdRightDiv" + ww);
		if (myFri.length != 0) {
			for (l = 0; l < myFri.length; l++) {
				$("<span>", {
					html : myFri[l],
					title : ((ww == "7") ? ((aqq[myFri[l]].length < 30) ? aqq[myFri[l]] : aqq[myFri[l]].substr(0, 30) + "...") : undefined),
					class : ((ww == "7") ? "quickInsert" : "insertFacetxt"),
					click : insertEdiror
				}).appendTo(parentDiv);
			}
		}
	}
	if (ff == "all") {
		for (p = 0; p < 8; p++) {
			ffe("" + p);
		}
	} else {
		ffe(ff);
	}
}
//保存数据
function saveData(a, b) {
	if ($.isEmptyObject(a)) {
		localStorage.removeItem(b);
		GM_deleteValue(b);
	} else {
		localStorage[b] = JSON.stringify(a);
		GM_setValue(b, JSON.stringify(a));
	}
}
//函数 插入到编辑器
function insertEdiror(e) {
	var whh = e.target.innerHTML;
	var insertKind = e.target.getAttribute("class");
	if (insertKind == "quickInsert") {
		var InsertText = ((localStorage.EasyInsertText) ? JSON.parse(localStorage.EasyInsertText) : EasyInsertTextDemo)[whh] + " ";
	} else {
		var InsertText =" " + whh + " ";
	}
	var wl = 0;
	if ($('textarea').length > 1) {
		wl = 1;
	};
	$("textarea")[wl].value = $("textarea")[wl].value.slice(0, $("textarea")[wl].selectionStart) + InsertText + $("textarea")[wl].value.slice($("textarea")[wl].selectionEnd);
	closeFaceTxttable();
}
//列表创建函数
function creaseTable(UrlLength) {
	var tablepp = crE("table");
	tablepp.id = "tablepp";
	var trs = [];
	for (ly = 0; ly <= Math.ceil(UrlLength / 3); ly++) {
		var tr = crE("tr");
		mmd = trs.push(tr);
		tablepp.appendChild(tr);
	}
	for (ls = 0; ls < trs.length * 3; ls++) {
		var td = crE("td");
		td.className = "editFaceTxtTb";
		td.innerHTML = "<input type='text' class='inputInTdFt' value=''>";
		wq = Tds.push(td);
		trs[Math.floor(ls / 3)].appendChild(td);
	}
	return tablepp
}
//函数 编辑我的自定义颜文字
function promptUserFT(ev) {
	if (!getId("newEditDiv")) {
		var wK = ev.target.id.split("tdLeftDiv")[1];
		var ujuy = getLSJS("userFaceText");
		var faceText = (ujuy["faceText" + wK]) ? ujuy["faceText" + wK] : defaultFaceText["faceText" + wK];

		var newEditDiv = crE("div");
		newEditDiv.id = "newEditDiv";

		$("<div>", {
			class : "pageTitle",
			html : "可直接修改表格内容或添加新表情到表格中："
		}).css({
			"font-size" : "16px",
			"margin-bottom" : "15px"
		}).appendTo(newEditDiv);

		newTable = creaseTable(faceText.length);
		newEditDiv.appendChild(newTable);

		var yesButton = crE("input");
		yesButton.type = "button";
		yesButton.className = "FTbutton";
		yesButton.value = "确定";
		yesButton.addEventListener("click", function () {
			var reGetArray = [];
			var hht = document.getElementsByClassName("inputInTdFt");
			for (hh = 0; hh < hht.length; hh++) {
				if (hht[hh].value != "") {
					ko = reGetArray.push(hht[hh].value.trim());
				}
			}
			if (reGetArray.length > 0) {
				if (reGetArray.toString() != faceText.toString()) {
					ujuy["faceText" + wK] = reGetArray;
				}
			} else {
				delete ujuy["faceText" + wK];
			}
			saveData(ujuy, "userFaceText")
			loadThe(wK);

			$(".inputInTdFt").html("");
			$("#tablepp").detach();
			$("#newEditDiv").detach();
		}, false);
		newEditDiv.appendChild(yesButton);

		var addButton = crE("input");
		addButton.type = "button";
		addButton.className = "FTbutton";
		addButton.value = "加行";
		addButton.addEventListener("click", function () {
			var tdNum = document.getElementsByClassName("inputInTdFt").length;
			var newTr = crE("tr");
			getId("tablepp").appendChild(newTr);
			for (es = 0; es < 3; es++) {
				var newTD = crE("td");
				newTD.className = "editFaceTxtTb";
				newTD.innerHTML = "<input type='text' class='inputInTdFt' value=''>";
				newTr.appendChild(newTD);
			}
		}, false);
		newEditDiv.appendChild(addButton);

		if (ujuy["faceText" + wK]) {
			var addButton = crE("input");
			addButton.type = "button";
			addButton.className = "FTbutton";
			addButton.value = "恢复本类默认";
			addButton.addEventListener("click", function () {
				var alertMe = confirm("这一动作将删除本类表情的修改和添加，\r\n你确定要这么做吗？");
				if (alertMe) {
					delete ujuy["faceText" + wK];
					saveData(ujuy, "userFaceText");
					loadThe(wK);
					$(".inputInTdFt").html("");
					$("#tablepp").detach();
					$("#newEditDiv").detach();
				}
			}, false);
			newEditDiv.appendChild(addButton);
		}

		document.body.appendChild(newEditDiv);

		for (ss = 0; ss < faceText.length; ss++) {
			document.getElementsByClassName("inputInTdFt")[ss].value = faceText[ss];
		}
	}
}
//函数 编辑我的快速输入文字
function promptEasyInsert() {
	if (!getId("newEditDiv")) {
		var newEditDiv = crE("div");
		newEditDiv.id = "newEditDiv";
		document.body.appendChild(newEditDiv);

		$("<div>", {
			html : "段落快速输入功能的设置页",
			class : "pageTitle"
		}).css({
			"font-size" : "16px",
			"margin-bottom" : "15px"
		}).appendTo(newEditDiv);

		var tablepp = crE("table");
		var tr1 = crE("tr");
		var td1 = crE("td");
		td1.setAttribute("colspan", "2");
		var ffdiv = crE("div");
		ffdiv.id = "fuuuffs";
		td1.appendChild(ffdiv);
		tr1.appendChild(td1);

		var tr3 = crE("tr");
		var td6 = crE("td");
		td6.className = "margin-top30";
		td6.innerHTML = "这里输入段落名称:";
		var td7 = crE("td");
		td7.className = "margin-top30";
		td7.innerHTML = "这里输入段落内容:";
		tr3.appendChild(td6);
		tr3.appendChild(td7);

		var tr2 = crE("tr");
		var td2 = crE("td");

		var inputTit = crE("input");
		inputTit.type = "text";
		inputTit.id = "titleInput";
		inputTit.value = "";
		td2.appendChild(inputTit);

		var saveButton = crE("input");
		saveButton.className = "editSbuttom";
		saveButton.type = "button";
		saveButton.value = "保 存";
		saveButton.addEventListener("click", function () {
			var titValue = getId("titleInput").value;
			var innText = getId("lotTextArea").value.replace(/\n/g, "<br>");
			if (innText.indexOf('<img') == -1) {
				//自动识别图片并加标签
				innText = innText.replace(/(http:\/\/(?!static\.tieba).*?)(\.jpg|\.png|\.gif)/i, '<img class="BDE_Image" src="$1$2">');
				//自动识别表情并加标签
				innText = innText.replace(/(http:\/\/static\.tieba\.baidu\.com.*?)(\.jpg|\.png|\.gif)/i, '<img src="$1$2" class="BDE_Smiley">');
			}
			if (titValue != "" && innText != "") {
				var userFacee = getLSJS("userFaceText");
				var temmm = (userFacee.faceText7) ? userFacee.faceText7 : [];
				if (temmm.indexOf(titValue) != -1) {
					var coverAlert = confirm("已经有了一个同名的段落，要覆盖吗？");
					if (coverAlert) {
						var temss = getLSJS("EasyInsertText");
						temss[titValue] = innText;
						localStorage.EasyInsertText = JSON.stringify(temss);
						GM_setValue("EasyInsertText", JSON.stringify(temss));

						getId("titleInput").value = "";
						getId("lotTextArea").value = "";
						EditQuickLoad();
					}
				} else {
					sdd = temmm.push(titValue);
					userFacee.faceText7 = temmm;
					localStorage.userFaceText = JSON.stringify(userFacee);
					GM_setValue("userFaceText", JSON.stringify(userFacee));

					var temss = getLSJS("EasyInsertText");
					temss[titValue] = innText;
					localStorage.EasyInsertText = JSON.stringify(temss);
					GM_setValue("EasyInsertText", JSON.stringify(temss));

					getId("titleInput").value = "";
					getId("lotTextArea").value = "";
					EditQuickLoad();
				}
			} else {
				var message = (titValue == "") ? "段落名称" : "段落内容";
				alert(message + "不能为空！请填好再按保存。");
			}
		}, false);
		td2.appendChild(saveButton);

		var clearButton = crE("input");
		clearButton.className = "editSbuttom";
		clearButton.type = "button";
		clearButton.value = "清 除";
		clearButton.addEventListener("click", function () {
			getId("titleInput").value = "";
			getId("lotTextArea").value = "";
		}, false);
		td2.appendChild(clearButton);

		var td3 = crE("td");
		var inTextArea = crE("textarea");
		inTextArea.id = "lotTextArea";
		inTextArea.rows = "3";
		td3.appendChild(inTextArea);

		tr2.appendChild(td2);
		tr2.appendChild(td3);
		tablepp.appendChild(tr1);
		tablepp.appendChild(tr3);
		tablepp.appendChild(tr2);
		newEditDiv.appendChild(tablepp);

		function EditQuickLoad() {
			$(".quickEditdiv").remove();
			var ujuy = getLSJS("userFaceText");
			var faceText = (ujuy["faceText7"]) ? ujuy["faceText7"] : defaultFaceText["faceText7"];
			faceText = faceText.reIndex();
			for (ls = 0; ls < faceText.length; ls++) {
				var inlineBlock = crE("div");
				inlineBlock.className = "quickEditdiv";

				var newspan = crE("span");
				newspan.innerHTML = faceText[ls];
				newspan.className = "qdisplayDiv";
				inlineBlock.appendChild(newspan);

				var modifyBu = crE("span");
				modifyBu.className = "modifyQuichText";
				modifyBu.setAttribute("qval", faceText[ls]);
				modifyBu.title = "点击以后到下面修改";
				modifyBu.innerHTML = "修改";
				modifyBu.addEventListener("click", modifyQuickText, false);
				inlineBlock.appendChild(modifyBu);

				var deleteBu = crE("span");
				deleteBu.className = "deleteQuichText";
				deleteBu.setAttribute("qval", faceText[ls]);
				deleteBu.title = "删除这一条";
				deleteBu.innerHTML = "删除";
				deleteBu.addEventListener("click", deleteQuickText, false);
				inlineBlock.appendChild(deleteBu);

				ffdiv.appendChild(inlineBlock);
			}
		}
		function modifyQuickText(ee) {
			var yaa = ee.target.getAttribute("qval");
			getId("titleInput").value = yaa;
			getId("lotTextArea").value = ((localStorage.EasyInsertText) ? JSON.parse(localStorage.EasyInsertText) : EasyInsertTextDemo)[yaa];
		}
		function deleteQuickText(ee) {
			var yaa = ee.target.getAttribute("qval");
			var deleteAlert = confirm("删除段落： " + yaa + "\r\n\r\n你确定吗？");
			if (deleteAlert) {
				var userFace = getLSJS("userFaceText");
				var temm = (userFace.faceText7) ? userFace.faceText7.toString().replace("," + yaa, "").replace(yaa + ",", "").replace(yaa, "") : "";
				if (temm == "") {
					delete userFace.faceText7;
				} else {
					userFace.faceText7 = temm.split(",");
				}
				saveData(userFace, "userFaceText");
				var tema = getLSJS("EasyInsertText");
				delete tema[yaa];
				saveData(tema, "EasyInsertText");
				EditQuickLoad();
			}
		}
		EditQuickLoad();

		//确定按钮
		var yesButton = crE("input");
		yesButton.type = "button";
		yesButton.className = "FTbutton";
		yesButton.value = "关 闭 本 页";
		yesButton.addEventListener("click", function () {
			loadThe("7");
			document.body.removeChild(getId("newEditDiv"));
		}, false);
		newEditDiv.appendChild(yesButton);

		//福利
		var smallDiv = crE("div");
		smallDiv.className = "checkboxDiv";
		var inSertThenSubmit = crE("input");
		inSertThenSubmit.type = "checkbox";
		inSertThenSubmit.id = "inSertThenSubmit";
		inSertThenSubmit.checked = GM_getValue('inSertThenSubmit', false);
		inSertThenSubmit.addEventListener('click', function () {
			GM_setValue('inSertThenSubmit', getId("inSertThenSubmit").checked);
		}, true);
		smallDiv.appendChild(inSertThenSubmit);
		var smallSpan = crE("span");
		smallSpan.innerHTML = " 插入后自动发表";
		smallDiv.appendChild(smallSpan);
		newEditDiv.appendChild(smallDiv);

		//全部恢复默认
		var defaultDiv = crE("input");
		defaultDiv.type = "button";
		defaultDiv.title = "除非保存的数据出现无法恢复的异常，否则最好不要用这个！";
		defaultDiv.id = "defaultDiv";
		defaultDiv.value = "删 除 所 有 段 落";
		defaultDiv.addEventListener('click', function () {
			var deleteAlert = confirm("！！！把所有保存的段落全部删除！！！\r\n\r\n数据将无法恢复！你确定吗？");
			if (deleteAlert) {
				var defaultTemp = getLSJS("userFaceText");
				delete defaultTemp.faceText7;
				saveData(defaultTemp, "userFaceText");
				localStorage.removeItem("EasyInsertText");
				GM_deleteValue("EasyInsertText");
				EditQuickLoad();
			}
		}, true);
		newEditDiv.appendChild(defaultDiv);
	}
}
//函数 绝对定位
function getElementLeft(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
//函数 绝对定位
function getElementTop(element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
//主函数 由编辑窗上方的按钮调用，展开主列表
function createFaceTexttable(ete) {
	if ($("#faceTextDiv").length == 0) {
		var ortt = ete.target;
		var getTop = (ortt.id == "faceTextButtonEasy") ? getElementTop(ortt) -120 : getElementTop(ortt) + 20;
		//定位主列表位置
		var faceTextDiv = $("<div>", {
				id : "faceTextDiv"
			}).css({
				"position" : "absolute",
				"z-index" : "1000",
				"left" : getElementLeft(ortt) - 400,
				"top" : getTop,
			}).appendTo(document.body);
		//建表
		var atTable = crE("table");
		atTable.setAttribute("border", "1");
		atTable.setAttribute("bordercolor", "#B8B3FF");
		atTable.setAttribute("cellpadding", "1");
		getId("faceTextDiv").appendChild(atTable);
		//TR
		var tdLeftName = ["愤怒啊", "不高兴", "哭、苦", "欢喜悦", "狗熊猫", "其它类", "自定义", "快输入"]
		for (lk = 0; lk < 8; lk++) {
			var creaFttr = crE("tr");

			var tdLeft = crE("td");
			var tdLeftDiv = crE("div");
			tdLeftDiv.className = "FTLeftDiv";
			tdLeftDiv.id = "tdLeftDiv" + lk;
			tdLeftDiv.innerHTML = tdLeftName[lk];
			tdLeftDiv.title = "点击可编辑";
			if (lk == 7) {
				tdLeftDiv.addEventListener("click", promptEasyInsert, false);
			} else {
				tdLeftDiv.addEventListener("click", promptUserFT, false);
			}
			tdLeft.appendChild(tdLeftDiv);

			var tdRight = crE("td");
			var tdRightDiv = crE("div");
			tdRightDiv.className = "FTRightDiv";
			tdRightDiv.id = "tdRightDiv" + lk;
			tdRight.appendChild(tdRightDiv);

			creaFttr.appendChild(tdLeft);
			creaFttr.appendChild(tdRight);
			atTable.appendChild(creaFttr);
		}

		//关闭按钮
		var closeFTDivbt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8UlEQVR42pWSMQrCQBBFcwPvI3gNKwtvYGVhaStqJYiFjY0IFmIrWEXRFIISiIqohYUYFcTC1gc/BFkSEmGyzMz/f3ZmNlaxMSvU7JQG2eJzdvdEW3j++vgstZ1AsNz6OgHkG6EpCFPe5S2qjHBzfgGZAuLV4TGw952Rg6MMVEKSZEyB7V6BW8NlJlcu1ccUPt0+1e6UkBMIgtkSKUi9iStSsz/H4SQJFD00ALXRZPMV2FxISDJ2S2qMpiVggFhB2BJsjaEB0ES3FO4k7dAqQHmm/F0rISMBRWxJjFQPF8IC9DsYoV42EOAlGtdyWyD4y76WWDtXsJol3gAAAABJRU5ErkJggg==";
		$("<span>", {
			class : "closeFTDivbt",
			click : closeFaceTxttable,
			html : "<img src='" + closeFTDivbt + "' alt='X' />"
		}).appendTo("#tdRightDiv0");

		//载入各种颜文字到列表中
		loadThe("all");
	}
}
//关闭输入窗列表
function closeFaceTxttable() {
	$(".insertFacetxt").detach();
	$(".FTRightDiv").detach();
	$(".FTLeftDiv").detach();
	$("#faceTextDiv").detach();
}

//主编辑器添加按钮
if (lodex("viewthread.php") != -1 || lodex("redirect.php") != -1 || lodex("pm.php?action=send") != -1) {
	$("<span>", {
		id : "faceTextButtonEasy",
		html : "('ｪ ' )",
		title : "颜文字",
		style : "cursor:pointer",
		click : createFaceTexttable
	}).css({
		"height" : "28px",
		"margin" : "0px 0px -7px 15px"
	}).appendTo($('td>[name="subject"]')[0].parentNode);
}
if (lodex("post.php") != -1) {
	$('.altbg2>.smalltxt>br,.altbg1>br').detach();
	$('<spam>', {
		id : "editorButton_post",
		html : "('ｪ ' )",
		title : "颜文字",
		style : "cursor:pointer",
		click : createFaceTexttable
	}).insertAfter($('.altbg2:not([align="center"])>table').css("display", "inline")).css({
		"height" : "40px",
		"margin" : "0px 0px 0px 30px"
	});
}

// ==UserScript==
// @name           tieba_faceText
// @description    百度贴吧颜文字
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/mo/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @updateURL      https://userscripts.org/scripts/source/159289.meta.js
// @downloadURL    https://userscripts.org/scripts/source/159289.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.12.28.0
// ==/UserScript==


//初始颜文字表情
var defaultFaceText = {
	"faceText0" : ["(>_<)", "o(>< )o", "ｏ( ><)o", "（＞д＜）", "ヽ(#`Д´)ﾉ", "ヽ(≧Д≦)ノ", "＞﹏＜", "┌( ಠ_ಠ)┘"],
	"faceText1" : ["(￣︿￣)", "(¬д¬。)", "(¬､¬)", "（；¬＿¬)", "(;¬_¬)", "(；¬д¬)", "( ;´Д`)", "o(￣ヘ￣o＃)"],
	"faceText2" : ["T_T", "(T＿T)", "（ ＴДＴ）", "(ToT)", "(Ｔ▽Ｔ)", "(T_T)", "（；へ：）", "(ノД`)・゜・。", "(´＿｀。)", "(´Ａ｀。)", "(´∩｀。)", "｡･ﾟﾟ･(>д<;)･ﾟﾟ･｡", "(*´；ェ；`*)", "(个_个)", ",,Ծ‸Ծ,,", "〒▽〒"],
	"faceText3" : ["(*ﾟ∇ﾟ)", "(*´∀`)", "( ﾟ∀ﾟ)", "o(ノﾟ∀ﾟ)ノ", "(￣∇￣)", "o(*≥▽≤)ツ", "(`・ω・´)", "(｡◕∀◕｡)", "ノ( ◕‿‿◕ )ノ", "(๑￫ܫ￩)", "（＠￣）￣＠）", "(●'‿'●)", "(✿✪‿✪｡)ﾉ♡", "(O ^ ~ ^ O)"],
	"faceText4" : ["(￣(エ)￣)", "(^(エ)^)", "⊂(・(ェ)・)⊃", "(*￣(ｴ)￣*)", "(=^･ｪ･^=)", "(=;ェ;=)", "ヽ(=^･ω･^=)丿", "<(*ΦωΦ*)>", "Uo･ｪ･oU", "ヾ(●ω●)ノ", "U・♀・U", "U＾ェ＾U", "（´(ｪ)‘）"],
	"faceText5" : ["(*・_・)ノ⌒ ⌒ ⌒╭*", "*★.°*:.☆(￣▽￣)ノ:*.°★* 。", "╭∩╮（￣︿￣）╭∩╮", "(╯｀□′)╯～～╧╧", "((((*｡_｡)_", "⊂彡☆))д`)", "(￣3￣)", "(|||ﾟдﾟ)", "(　д ) ﾟ ﾟ", "@_@", "-_-!!!", "(`ε´ )", "(→_→)", "(@[]@!!)"],
	"faceText6" : ["⊙﹏⊙‖∣°", "(—。—) . z  Z", "d(*◕ ‿ -) :|}  - － >>—>"],
	"faceText7" : ["段落演示"]
};
var EasyInsertTextDemo = {"段落演示" : "坐怀则乱是天然纯洁的，我们都要爱护他。"};

//下面这一段CSS，可帮助编辑器工具栏不够用的同学，会CSS的同学可删除它。
var forCss2er = ".cut_screen{display:none!important;}";
forCss2er += ".tb-editor-wrapper{width:720px !important}";
forCss2er += ".recentImgDiv>.tb-editor-overlay{left:28% !important; top:30px !important;}";
GM_addStyle(forCss2er);




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
replyCss += "#faceTextDiv{background-color:lightGrey; width:650px; border:4px double gray;}";
replyCss += ".FTLeftDiv{cursor:pointer; display:inline-block; background-color:lightGrey;padding:3px 10px; width:36px;}";
replyCss += ".FTRightDiv{display:inline-block; background-color:lightGrey; padding:3px 6px; width:579px;}";
replyCss += ".closeFTDivbt{cursor:pointer; float:right; margin:0px -2px; width:16px; height:16px;}";
replyCss += "#editorButton{cursor:pointer; margin:0 0 0 16px; display:inline-block; color:#3163B6; padding: 1px 1px 10px 1px; position:relative; top:0px}";
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

var $ = unsafeWindow.$;
var Tds = []; //数据修改用列表


//函数 数组字符串重排序
Array.prototype.reIndex = function () {
	var lastStr = this.sort(function (a, b) {
			return a.localeCompare(b)
		});
	return lastStr;
}
//元素精确监听
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function (prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		GM_addStyle(css);
	}
	if (handler) {
		var bindedFunc = function (e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function (el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function (eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//移除精确监听
function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function (eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}
//提取localStorage的参数
function getLSJS(a){
	return JSON.parse(localStorage[a] ? localStorage[a] : "{}");
}
//简化脚本
function crE(a){
	return document.createElement(a);
}
function getId(a){
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
		var InsertText = ((localStorage.EasyInsertText) ? JSON.parse(localStorage.EasyInsertText) : EasyInsertTextDemo)[whh] + "&nbsp;";
	} else {
		var InsertText = whh + "&nbsp;";
	}
	var editor = (localStorage['FT_which_editor']) ? localStorage['FT_which_editor'] : 'editorButton';
	if (editor == "editorButton") {
		unsafeWindow.test_editor.execCommand("inserthtml", InsertText);
		setTimeout(function () {
			if (insertKind == "quickInsert" && window.location.href.indexOf("kw=") == -1 && GM_getValue('inSertThenSubmit', false)) {
				document.querySelector(".poster_submit").click();
			}
		}, 1000);
	} else if (InsertText.indexOf("<img") == -1 || InsertText.indexOf("http://static.tieba.baidu.com") != -1) {
		unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", InsertText);
		setTimeout(function () {
			if (insertKind == "quickInsert" && window.location.href.indexOf("kw=") == -1 && GM_getValue('inSertThenSubmit', false)) {
				document.querySelector(".lzl_panel_btn>.lzl_panel_submit").click();
			}
		}, 500);
	}
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
				//自动识别图片并加标签http://imgsrc.baidu.com/forum/pic/item/
				innText = innText.replace(/(http:\/\/(?!static\.tieba).*?)([0-9a-z]{40})(\.jpg|\.png|\.gif)/i, '<img class="BDE_Image" unselectable="on" onload="EditorUI.resizeImage(this, 560)" pic_type="1" src="' + 'http://imgsrc.baidu.com/forum/pic/item/' + '$2$3">');
				//自动识别表情并加标签
				innText = innText.replace(/(http:\/\/static\.tieba\.baidu\.com.*?)(\.jpg|\.png|\.gif)/i, '<img class="BDE_Smiley" unselectable="on" onload="EditorUI.resizeImage(this, 560)" pic_type="1" src="$1$2">');
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
			getId("lotTextArea").value =((localStorage.EasyInsertText) ? JSON.parse(localStorage.EasyInsertText) : EasyInsertTextDemo)[yaa];
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
		localStorage.FT_which_editor = (ortt.id == "editorButton") ? 'editorButton' : 'editorButton_lzl';
		var getTop = (ortt.id == "editorButton") ? getElementTop(ortt) + 32 : getElementTop(ortt) + 20;
		//定位主列表位置
		if ($('#tb_rich_poster').css('position')=='fixed' && ortt.id == "editorButton") { //原子的悬浮窗
			var faceTextDiv = $("<div>", {
					id : "faceTextDiv"
				}).css({
					"position" : "fixed",
					"z-index" : "1000",
					"right" : "20px",
					"bottom" : "24px"
				}).appendTo(document.body);
		} else if (ortt.id == "editorButton_lzl") { //楼中楼回复
			var faceTextDiv = $("<div>", {
					id : "faceTextDiv"
				}).css({
					"position" : "absolute",
					"z-index" : "1000",
					"left" : getElementLeft(ortt) - 300,
					"top" : getTop - 300
				}).appendTo(document.body);
		} else { //主窗
			content.scrollTo(0, 99999);
			var faceTextDiv = $("<div>", {
					id : "faceTextDiv"
				}).css({
					"position" : "absolute",
					"z-index" : "1000",
					"left" : getElementLeft(ortt) - 300,
					"top" : getTop
				}).appendTo(document.body);
		}
		//建表
		var atTable = crE("table");
		atTable.setAttribute("border", "1");
		atTable.setAttribute("bordercolor", "#B8B3FF");
		atTable.setAttribute("cellpadding", "6");
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
addNodeInsertedListener('.edui-btn-toolbar', function () {
	if (!document.getElementById("editorButton")) {
		$("<div>", {
			id : "editorButton",
			html : "('ｪ ' )",
			click : createFaceTexttable
		}).appendTo($(".edui-btn-toolbar"));
	}
})


//楼中楼加按钮
if (window.location.href.indexOf("/p/") != -1 || window.location.href.indexOf("ct=") != -1 || window.location.href.indexOf("kz=") != -1) {
	addNodeInsertedListener('.lzl_panel_wrapper>tbody>tr>td:first-child', function () {
		if (!getId("editorButton_lzl")) {
			$("<em>", {
				id : "editorButton_lzl",
				html : "('ｪ ' )",
				click : createFaceTexttable
			}).appendTo(this);
		}
	});
}

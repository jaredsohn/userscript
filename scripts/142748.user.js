// ==UserScript==
// @name           tiebaAllsign_NoWapp
// @description    贴吧首页和我的贴吧集体签到之无法使用wapp的版本
// @include        http://www.baidu.com/
// @include        http://www.baidu.com/index.php?tn=baiduhome_pg
// @include        http://tieba.baidu.com/f?kw=*
// @include        http://tieba.baidu.com/f?ie=gbk&kw=*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2012.11.21.0
// ==/UserScript==

var maxLines = 27; //此处可修改屏幕允许显示的最大行数;

if (navigator.userAgent.search(/Chrome/) != -1) {
	var GM_getValue;
	if (GM_getValue == undefined) {
		alert("贴吧集中签到脚本提醒您：\r\n\r\nchrome用户需要先安装Tampermonkey，后安装本脚本，才能保证本脚本正常运行。\r\n\r\n先安装了脚本而未安装Tampermonkey的用户，您需要：\r\n先卸载本脚本，然后，按 Tampermonkey - 脚本 的顺序重新安装。");
	}
}

var signCSS = "";
signCSS += "#headTd{border-bottom:1px solid grey; color:blue; padding:0px 0px 5px 0px !important;}";
signCSS += "#footTd{border-top:1px solid grey; color:blue; padding:6px 0px 0px 0px !important;}";
signCSS += ".signbaInfor{white-space:nowrap; padding:0px 6px 0px 6px;}";
signCSS += "#scrollDiv{max-height:" + (maxLines * 18) + "px; max-width:1200px;}";
signCSS += "#getDown:active,#allsign:active,#newbutn:active,#newbutn3:active{border:2px groove black;}";
signCSS += "#newbutn,#newbutn2,#newbutn3,#zhidaoDiv{float:right;}#useIdDiv,#thDiv{float:left;}";
signCSS += "#timerDiv{z-index:997; position:fixed;left:5px;top:5px;}";
signCSS += "#getDown,#allsign,#newbutn,#newbutn2,#newbutn3{cursor:pointer;margin:0px 3px;padding:0px 3px;color:black;border:2px ridge black;}";
signCSS += "#massWindow2{z-index:998; padding:6px 10px 8px 10px;background-color:lightGrey;position:fixed;right:5px;bottom:5px;border:1px solid grey}";
GM_addStyle(signCSS);

//添加按钮
var newEm = document.createElement("span");
newEm.innerHTML = "全部签到";
newEm.id = "allsign";
newEm.addEventListener('click', jjuds, true);
var autoSignbox = document.createElement("input");
autoSignbox.type = "checkbox";
autoSignbox.id = "autoSign";
autoSignbox.title = "选中此项，启动自动签到，否则，关闭自动签到";
autoSignbox.checked = GM_getValue('autoSignbox', true);
autoSignbox.addEventListener('click', function () {
	GM_setValue('autoSignbox', document.getElementById("autoSign").checked)
}, true);
if (window.location.href.indexOf("http://www.baidu.com/") != -1) {
	//百度首页添加按钮
	if (document.getElementsByClassName("s-nav-tabs")) {
		var sspli = document.getElementsByClassName("s-nav-tab-span")[0].cloneNode(true);
		document.getElementsByClassName("s-nav-tabs")[0].appendChild(sspli);
		document.getElementsByClassName("s-nav-tabs")[0].appendChild(newEm);
		document.getElementsByClassName("s-nav-tabs")[0].appendChild(autoSignbox);
	}
	var userSignName = document.getElementById("s_username_top").innerHTML;
} else { //各贴吧添加按钮
	GM_addStyle("#getDown,#allsign{padding:0px 3px 2px 3px; color:#FFFFFF; position:relative;} #autoSign{margin:0px 0px 0px 3px; position:relative; top:10px;}");
	(document.getElementById("frs_old_version")) ? GM_addStyle("#getDown,#allsign{top:8px;}") : GM_addStyle("#getDown,#allsign{top:0px;}");
	if (document.getElementById("add_post_btn")) {
		var getDown = document.createElement("span");
		getDown.id = "getDown";
		getDown.innerHTML = "↓";
		getDown.addEventListener('click', function () {
			content.scrollTo(0, 10000000);
			unsafeWindow.rich_postor._editor.execCommand("inserthtml", "");
		}, true);
		document.getElementById("add_post_btn").parentNode.appendChild(getDown);
		document.getElementById("add_post_btn").parentNode.appendChild(newEm);
		document.getElementById("add_post_btn").parentNode.appendChild(autoSignbox);
		document.getElementById("add_post_btn").parentNode.removeChild(document.getElementById("add_post_btn"));
	}
	var userSignName = document.querySelector(".userlike_info_name").innerHTML;
}
//北京时间
var yuy = new Date();
re = yuy.getTime() + 28800000;
yuy.setTime(re);
var fulltime = yuy.getUTCFullYear() + "/" + (yuy.getUTCMonth() + 1) + "/" + yuy.getUTCDate();

//自动签到
if (userSignName) {
	if (yuy.getUTCHours() > 0 && document.getElementById("autoSign").checked && (GM_getValue('todaySign', '').indexOf(fulltime) == -1 || GM_getValue('todaySign', '').indexOf(userSignName) == -1)) {
		jjuds();
	}
}

//吧名缩略显示
String.prototype.reComLength = function () {
	var yn = 0;
	var kuu = "";
	for (w in this) {
		if (/[a-zA-Z0-9]/.exec(this[w])) {
			yn += 1;
		} else {
			yn += 2;
		}
		if (yn < 11) {
			kuu += this[w];
		}
	}
	var uui = yn > 13 ? kuu + "..." : this;
	return uui;
}

//获取签到贴吧名单
function jjuds() {
	var allAncs = [];
	var baNameF = [];

	function getTieba(nn, lp) { //获取第2-第n页的贴吧列表
		var addTail = "?&pn=" + nn;
		var urll = "http://tieba.baidu.com/f/like/mylike" + addTail;
		GM_xmlhttpRequest({
			method : 'GET',
			synchronous : true,
			url : urll,
			onload : function (reText) {
				var reTextTxt = reText.responseText.replace(/[	]/g, "").replace(/<td>\r\n/g, "<td>").replace(/\r\n<\/td>/g, "</td>").replace(/<span.*?span>\r\n/g, "");
				var ww = reTextTxt.match(/<td><a[ ]href=".*?(?=<\/a>)/g);
				for (s = 0; s < ww.length; s++) {
					qq = allAncs.push("http://tieba.baidu.com/f?kw=" + ww[s].replace('<td><a href="/f?kw=', '').replace(/"[ ]title.*/, ""));
					dd = baNameF.push(ww[s].replace(/<td><a[ ]href=".*?">/, ""));
				}
				if (nn == lp) { //最后一页取完，开始执行签到
					gowork(allAncs, baNameF);
				}
			}
		})
	}

	GM_xmlhttpRequest({ //从“我的贴吧”第1页获取列表
		method : 'GET',
		synchronous : true,
		url : "http://tieba.baidu.com/f/like/mylike",
		onload : function (reDetails) {
			if (GM_getValue('todaySign', '').indexOf(fulltime) == -1) { //记录签到标记，当日不再签
				GM_setValue('todaySign', fulltime + ":" + userSignName);
			} else if (GM_getValue('todaySign', '').indexOf(userSignName) == -1) {
				GM_setValue('todaySign', GM_getValue('todaySign') + "," + userSignName);
			}
			var simTxt = reDetails.responseText.replace(/[	]/g, "").replace(/<td>\r\n/g, "<td>").replace(/\r\n<\/td>/g, "</td>").replace(/<span.*?span>\r\n/g, "");
			var ww = simTxt.match(/<td><a[ ]href=".*?(?=<\/a>)/g);
			for (s = 0; s < ww.length; s++) {
				qq = allAncs.push("http://tieba.baidu.com/f?kw=" + ww[s].replace('<td><a href="/f?kw=', '').replace(/"[ ]title.*/, ""));
				dd = baNameF.push(ww[s].replace(/<td><a[ ]href=".*?">/, ""));
			}
			var qqee = simTxt.match(/<a[ ]href=.*pn=\d+">尾页<\/a>/);
			if (qqee) { //检查是否分页，分页则继续获取贴吧名单
				var deho = Number(qqee[0].match(/&pn=\d+/)[0].replace("&pn=", ""));
				deho = (deho<10) ? deho : 10;//因为度娘限签200，所以，此处只取前10页
				for (b = 2; b <= deho; b++) {
					getTieba(b, deho);
				}
			} else { //不分页则直接开始签到
				gowork(allAncs, baNameF);
			}
		}
	});
}

//功能函数
function gowork(allAncs, baNameF) { //以获取的地址数组和吧名数组为参数
	var newsignCss = document.createElement("style");
	newsignCss.id = "newsignCss";
	newsignCss.type = "text/css";
	newsignCss.innerHTML = "#allsign{display:none}";
	document.head.appendChild(newsignCss); //签到过程中，隐藏签到按钮

	var yuy = new Date();
	re = yuy.getTime() + 28800000;
	yuy.setTime(re);
	var fulltime = yuy.getUTCFullYear() + "/" + (yuy.getUTCMonth() + 1) + "/" + yuy.getUTCDate(); //当前时间

	//创建窗口
	if (document.getElementById("massWindow2")) {
		document.body.removeChild(document.getElementById("massWindow2"));
	}
	var newDivv2 = document.createElement("div");
	newDivv2.id = "massWindow2";
	newDivv2.align = "left";
	document.body.appendChild(newDivv2);

	var tablee = document.createElement("table");
	newDivv2.appendChild(tablee);

	var thh = document.createElement("th");
	thh.id = "headTd";
	var thDiv = document.createElement("span");
	thDiv.id = "thDiv";
	thh.appendChild(thDiv);
	tablee.appendChild(thh);

	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");

	tablee.appendChild(tr1);
	tablee.appendChild(tr2);

	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	td2.id = "footTd";

	tr1.appendChild(td1);
	tr2.appendChild(td2);

	var tibeNums = allAncs.length; //贴吧总数量
	var Tds = []; //各吧签到信息栏的空白数组

	var scrollDiv = document.createElement("div");
	scrollDiv.id = "scrollDiv";
	newTable = creaseTable(tibeNums); //根据贴吧数量创建列表
	scrollDiv.appendChild(newTable);
	td1.appendChild(scrollDiv);
	td2.innerHTML += fulltime + " 共" + tibeNums + "个贴吧需要签到";

	zhidao(); //知道签到
	onebyone(0, "conti"); //这里开始启动逐一签到动作


	var newbutn = document.createElement("span"); //创建关窗按钮
	newbutn.id = "newbutn";
	newbutn.innerHTML = "关闭窗口";
	newbutn.addEventListener("click", function () {
		document.head.removeChild(document.getElementById("newsignCss"));
		document.body.removeChild(document.getElementById("massWindow2"));
	}, false);
	td2.appendChild(newbutn);

	var useIdDiv = document.createElement("span");
	useIdDiv.id = "useIdDiv";
	useIdDiv.innerHTML = "用户ID&nbsp;:&nbsp;" + userSignName;
	thDiv.appendChild(useIdDiv);

	//知道签到函数
	function zhidao() {
		var zhidaoDiv = document.createElement("span");
		zhidaoDiv.id = "zhidaoDiv";
		thh.appendChild(zhidaoDiv);
		var gtt = new Date();
		dataa = "cm=100509&t=" + gtt.getTime();
		GM_xmlhttpRequest({
			method : 'POST',
			synchronous : false,
			url : "http://zhidao.baidu.com/submit/user",
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data : encodeURI(dataa),
			onload : function (response) {
				if (JSON.parse(response.responseText).status == 0) {
					var todayEx = JSON.parse(response.responseText).data.expToday;
					zhidaoDiv.innerHTML = "百度知道签到成功&nbsp;经验+" + todayEx.toString();
				} else if (JSON.parse(response.responseText).status == 2) {
					zhidaoDiv.innerHTML = "百度知道已签到";
				}
			}
		});
	}

	//列表创建函数
	function creaseTable(UrlLength) {
		var cons = (UrlLength <= maxLines * 2) ? 2 : 3;
		if (tibeNums > maxLines * cons) {
			GM_addStyle("#scrollDiv{overflow-x:auto; overflow-y:scroll; padding-right:15px}");
		}
		var tablepp = document.createElement("table");
		var trs = [];
		for (ly = 0; ly < Math.ceil(UrlLength / cons); ly++) {
			var tr = document.createElement("tr");
			mmd = trs.push(tr);
			tablepp.appendChild(tr);
		}
		for (ls = 0; ls < UrlLength; ls++) {
			var td = document.createElement("td")
				td.setAttribute("class", "signbaInfor");
			wq = Tds.push(td);
			trs[Math.floor(ls / cons)].appendChild(td);
		}
		return tablepp
	}

	function consNum(n) { //显示信息序号的函数
		if (tibeNums < 10) {
			var indexN = (n + 1).toString();
		} else if (tibeNums > 9 && tibeNums < 100) {
			if (n < 9) {
				var indexN = "0" + (n + 1);
			} else {
				var indexN = (n + 1).toString();
			}
		} else {
			if (n < 9) {
				var indexN = "00" + (n + 1);
			} else if (n < 99) {
				var indexN = "0" + (n + 1);
			} else {
				var indexN = (n + 1).toString();
			}
		}
		return indexN;
	}

	function onebyone(gg, goorstop) { //这里的gg是从0开始的贴吧序号，goorstop用于判别是否递进执行。
		var timeout = 0;//默认不延时
		gg = Number(gg);
		var tiebaname = "<a href='http://tieba.baidu.com/f?kw=" + baNameF[gg] + "' title='" + baNameF[gg] + "吧'><font color='blue'>" + baNameF[gg].reComLength() + "吧</font></a>";
		vdddd = consNum(gg) + ".&nbsp;" + tiebaname + " 访问中......";
		Tds[gg].innerHTML = vdddd.blink();
		document.getElementById("scrollDiv").scrollTop = document.getElementById("scrollDiv").scrollHeight; //滚动时总显示最下一行
		GM_xmlhttpRequest({
			method : 'GET',
			synchronous : false,
			url : allAncs[gg],
			headers : {
				"Referer" : 'http://tieba.baidu.com'
			},
			onload : function (responseDetails) {
				var wwdata = responseDetails.responseText; 
				var signStatus = wwdata.match(/<span[ ]class="sign_index_num[ ]j_signin_index">.*?(?=<\/span>)/);
				if (!signStatus) {
					Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 未开启签到功能".fontcolor("grey");
				} else {
					if (signStatus[0].replace('<span class="sign_index_num j_signin_index">', '') != "0") {
						Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 此前已签过到";
					} else {
						timeout = 3000;
						var km = gg; //把gg此时的值记录下来是必须的，因为gg值将发生变化，后面不便调用
						lacona = wwdata.match(/PageData.forum.name_url.*(?=";)/)[0].replace('PageData.forum.name_url = "', '');
						var bartbs = wwdata.match(/PageData.tbs.*(?=";)/)[0].replace('PageData.tbs = "', '');
						var postData = "ie=utf-8&kw=" + baNameF[km] + "&tbs=" + bartbs;
						GM_xmlhttpRequest({
							method : 'POST',
							synchronous : false,
							url : 'http://tieba.baidu.com/sign/add',
							headers : {
								"Content-Type" : "application/x-www-form-urlencoded",
							},
							data : encodeURI(postData),
							onload : function (response){
								if (JSON.parse(response.responseText).error == "") {
									var numberr = JSON.parse(response.responseText).data.uinfo.user_sign_rank;
									Tds[km].innerHTML =  consNum(km) + ".&nbsp;" + tiebaname + "&nbsp;成功签到&nbsp;第" + numberr.toString().fontcolor("blue") + "名";
								} else {
									var reSignSpan = document.createElement("a");
									reSignSpan.href = "javascript:void(0);";
									reSignSpan.innerHTML = "重试";
									reSignSpan.setAttribute("sentValue", km);
									reSignSpan.addEventListener('click', function (ee) {
										k = ee.target.getAttribute("sentValue");
										onebyone(k, "stop");
									}, false);
									Tds[km].innerHTML =  consNum(km) + ".&nbsp;" + tiebaname + + " 度娘不方便...";
									Tds[km].appendChild(reSignSpan);
								} 
							} 
						});
					}
				}
				if (goorstop == "conti") { //只有当参数为"conti"时，才继续下一个签到动作
					gg = gg + 1;
					if (gg < tibeNums) {
						setTimeout(function () {
							onebyone(gg, "conti"); //函数自调用，其实是另一种循环
						}, timeout)
					}
				}
			}
		});
	}
}
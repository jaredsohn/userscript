// ==UserScript==
// @name       CRM enhance tool beta
// @description	  CRM enhance tool beta
// @version    3.1.5
// @copyright  reizhi
// @include http://*.faces
// @include http://172.22.8.180/*
// @updateURL   http://userscripts.org/scripts/source/466954.meta.js
// @downloadURL   http://userscripts.org/scripts/source/466954.user.js
// ==/UserScript==


var x = document.getElementsByTagName("label"); //取label标签

function errorstate() {
	var e = document.getElementsByTagName("a");
	var f = e[0].innerText;
	if (f == "点此返回") //500错误判断
	{
		getlocalstor();
		return;
	}


}





function statecheck() { //预约取消状态检测
	var i = x.length - 1;
	var j = document.getElementById("default");
	var k = j.getElementsByTagName("label");
	var l = k[0].innerText; //第1个label，返回“退货正在处理中!”或“换货正在处理中!
	var n;


	for (n = 0; n <= i; n++) //遍历label查找“暂停服务”或“使用中”
	{
		if (x[n].innerText == "暂停服务" || x[n].innerText == "使用中") //判断状态，避免操作已取消设备
		{
			if (l == "退货正在处理中!") //判断"退货正在处理中!"字样
			{
				return 10;
			} else {
				return cancelcheck(); //确认页面，避免出现undefined
			}
		}
	}
	return 100;
}

function cancelcheck() { //取消工单状态检测

	var o = document.getElementById("default:list:tb"); //获取default:list:tb元素
	var p = o.getElementsByTagName("td"); //获取td标签
	var i = p.length - 1;
	var n;
	for (n = 0; n <= i; n++) //遍历所有td
	{
		if (p[n].innerHTML.indexOf("取消服务") > 0) //如发现“取消服务”字样，返回1
		{
			return 1;
		}
	}

}

function mailinfo() {//生成邮件信息
var des = document.getElementsByTagName("label");
var i = des.length -1;
var n;
var name;
var cn;
var time;
var ser;
	for (n = 0; n <= i; n++) //遍历所有label
	{
		if (des[n].innerHTML.indexOf("信用卡收取服务费失败") > 0) //匹配‘信用卡收取服务费失败’后生成邮件模板
		{
			var name = gettext('姓名');
			var cn = gettext('Description').substring(5,9);
			var time = gettext('Description').substring(26,47);
			var mailcnt = '尊敬的用户' + name + '\n魅力中国中文电视在信用卡尾号' + cn + '收取您本月（' + time + '）服务费扣费失败，为了不影响您的观看，请您尽快与我司取得联系，祝您使用愉快！\n工号' + localStorage.getItem('wn') +'为您服务！'
			return mailcnt;
	}
	else if (des[n].innerHTML.indexOf("用户账户余额不足") > 0 )
	{
			var name = gettext('姓名');
			var time = gettext('Description').substring(22,43);
			var mailcnt = '尊敬的用户' + name + '\n魅力中国中文电视在收取您本月（' + time + '）服务费扣费失败，为了不影响您的观看，请您尽快与我司取得联系，祝您使用愉快！\n工号' + localStorage.getItem('wn') +'为您服务！'
			return mailcnt;
	}
	else if (des[n].innerHTML.indexOf("预约操作停止") > 0)
	{
	var name = gettext('姓名');
	var ser = gettext('机顶盒条形码');
	var tstart = des[n].innerText.indexOf("预约操作停止");
	var tend = des[n].innerText.indexOf("日仍未收到");
	var tcancel =gettext('Description').substring(tstart+6,tend+1);
	var mailcnt = name + '先生/女士：您好！\n您的取消申请，我公司已受理，魅力中国计划使用时间截止到2014年' + tcancel +'。期待您再次订购。\n请您将魅力中国机顶盒（' + ser +'）及零配件退回到库管中心。\n如果您是试用期或租用设备的取消，收到您的设备后，我公司会在30个工作日内以支票/信用卡（美国、加拿大）或银行转账（澳洲、日本）退还您的费用；\n若超过15天未收到您回邮的设备或缺少零配件，魅力中国将按各零配件价格收取相应费用。'
	return mailcnt;
	}
}
return 0;
}


function gettext(cnt) {//获取指定字符串值
var des = document.getElementsByTagName("label");
var i = des.length -1;
var n;
var cnt;
	for (n = 0; n <= i; n++) 
	{
			if (des[n].innerHTML.indexOf(cnt) > 0) 
		{
			return des[n+1].innerText;
		}
	}
}









function adddiv() { //添加页面文字提醒
	var notify = document.createElement("div");
	document.body.appendChild(notify);
	notify.style.position = "absolute";
	notify.style.top = 740;
	notify.style.left = 680;
	notify.id = "ext";
	notify.innerHTML = "没有预约取消！";
}


function getlocalstor() { //读取localStorage并写回页面
	var n;
	for (n = 1; n < 4; n++) {
		var textarea = document.createElement("textarea");
		document.body.appendChild(textarea);
		textarea.style.position = "absolute";
		textarea.style.top = 125;
		textarea.style.left = 800 - 320 * (n - 1);
		textarea.type = "text";
		textarea.id = "cke";
		textarea.value = JSON.parse(localStorage.getItem('autosave' + n));
		textarea.style.height = 300;
		textarea.style.width = 300;
	}
	clearInterval(errid);
}

function addmailcnt() {//页面插入邮件模板
	if ( mailinfo() != 0 )
	{
		var textarea = document.createElement("textarea");
		document.body.appendChild(textarea);
		textarea.style.position = "absolute";
		textarea.style.top = 125;
		textarea.style.left = 630;
		textarea.style.height = 81;
		textarea.style.width = 535;
		textarea.value = mailinfo();

	}
}






function confirm() {

	t = statecheck();
	if (t == 1) {
		adddiv();
		document.getElementById("ext").style.color = "red";
		document.getElementById("ext").style.fontSize = "xx-large";
		document.getElementById("ext").style.fontFamily = "微软雅黑,Microsoft YaHei,Arial";
		alert("没有预约取消！");
		clearInterval(startid);
	}
}

function autosave() {
	var frameObj = document.getElementsByTagName("iframe");
	var frameContent = frameObj[0].contentWindow.document.body.innerText;
	var ci = localStorage.getItem('savechannel');
	if (frameContent != "" && frameContent != "\n" && frameContent != " ") {
		switch (ci) {
		case "1":
			{
				localStorage.setItem('autosave1', JSON.stringify(frameContent));
				localStorage.setItem('savechannel', '2');
				break;
			}
		case "2":
			{
				localStorage.setItem('autosave2', JSON.stringify(frameContent));
				localStorage.setItem('savechannel', '3');
				break;
			}
		case "3":
			{
				localStorage.setItem('autosave3', JSON.stringify(frameContent));
				localStorage.setItem('savechannel', '1');
				break;
			}
		default:
			{
				localStorage.setItem('autosave1', JSON.stringify(frameContent));
				localStorage.setItem('savechannel', '2');
			}
		}
	}

}

function  zonedetact() {
var curl = window.location.toString();
var numin = curl.slice(86,89);
if ( numin > 0 && numin <999 )
{
switch (numin) {
		case "201":
			{
			document.getElementById("otherinfo").value = "US 新泽西州 new jeresy"
				break;
			}
		case "202":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "203":
			{
			document.getElementById("otherinfo").value = "US 康乃狄克州 connecticut"
				break;
			}
		case "204":
			{
			document.getElementById("otherinfo").value = "CA 马尼托巴省 MB"
				break;
			}
		case "205":
			{
			document.getElementById("otherinfo").value = "US 亚拉巴马 alabama"
				break;
			}
		case "206":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "207":
			{
			document.getElementById("otherinfo").value = "US 缅因 maine"
				break;
			}
		case "208":
			{
			document.getElementById("otherinfo").value = "US 爱德华州 idaho"
				break;
			}
		case "209":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "210":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 Texas"
				break;
			}
		case "212":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "213":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "214":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "215":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "216":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "217":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "218":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达州 minnesota"
				break;
			}
		case "219":
			{
			document.getElementById("otherinfo").value = "US 印第安纳州 indiana"
				break;
			}
		case "224":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "225":
			{
			document.getElementById("otherinfo").value = "US 路易斯安娜州 louisiana"
				break;
			}
		case "226":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "228":
			{
			document.getElementById("otherinfo").value = "US 密西西比州 mississippi"
				break;
			}
		case "229":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "231":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "234":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "239":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "240":
			{
			document.getElementById("otherinfo").value = "US 马里兰州 maryland"
				break;
			}
		case "248":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "250":
			{
			document.getElementById("otherinfo").value = "CA 英属哥伦比亚省 BC"
				break;
			}
		case "251":
			{
			document.getElementById("otherinfo").value = "US 阿拉巴马州 alabama"
				break;
			}
		case "252":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 northcarolina"
				break;
			}
		case "253":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "254":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "256":
			{
			document.getElementById("otherinfo").value = "US 阿拉巴马州 alabama"
				break;
			}
		case "260":
			{
			document.getElementById("otherinfo").value = "US 印第安纳州 indiana"
				break;
			}
		case "262":
			{
			document.getElementById("otherinfo").value = "US 威斯康辛州 wisconsin"
				break;
			}
		case "267":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "269":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "270":
			{
			document.getElementById("otherinfo").value = "US 肯塔基州 kentucky"
				break;
			}
		case "276":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 virginia"
				break;
			}
		case "281":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "289":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "301":
			{
			document.getElementById("otherinfo").value = "US 马里兰州 maryland"
				break;
			}
		case "302":
			{
			document.getElementById("otherinfo").value = "US 德拉瓦州 delaware"
				break;
			}
		case "303":
			{
			document.getElementById("otherinfo").value = "US 科罗拉多州 colorado"
				break;
			}
		case "305":
			{
			document.getElementById("otherinfo").value = "US 福罗里达州 florida"
				break;
			}
		case "306":
			{
			document.getElementById("otherinfo").value = "CA 沙士吉万省 SK"
				break;
			}
		case "307":
			{
			document.getElementById("otherinfo").value = "US 怀俄明州 wyoming"
				break;
			}
		case "308":
			{
			document.getElementById("otherinfo").value = "US 内布拉斯加州 nebraska"
				break;
			}
		case "309":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "310":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州"
				break;
			}
		case "312":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "313":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "314":
			{
			document.getElementById("otherinfo").value = "US 密苏里州 missouri"
				break;
			}
		case "315":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "317":
			{
			document.getElementById("otherinfo").value = "US 印第安纳州 indiana"
				break;
			}
		case "318":
			{
			document.getElementById("otherinfo").value = "US 路易斯安娜州 louisiana"
				break;
			}
		case "319":
			{
			document.getElementById("otherinfo").value = "US 艾奥瓦州 iowa"
				break;
			}
		case "320":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达州 minnesota"
				break;
			}
		case "321":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "323":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "325":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯州 texas"
				break;
			}
		case "330":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "334":
			{
			document.getElementById("otherinfo").value = "US 亚拉巴马 alabama"
				break;
			}
		case "336":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 northcarolina"
				break;
			}
		case "337":
			{
			document.getElementById("otherinfo").value = "US 路易斯安那州 louisiana"
				break;
			}
		case "339":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "347":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "351":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "352":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "360":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "361":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "386":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "401":
			{
			document.getElementById("otherinfo").value = "US 罗得岛州 island"
				break;
			}
		case "402":
			{
			document.getElementById("otherinfo").value = "US 内布拉斯加州 nebraska"
				break;
			}
		case "403":
			{
			document.getElementById("otherinfo").value = "CA 亚伯达省 AB"
				break;
			}
		case "404":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "405":
			{
			document.getElementById("otherinfo").value = "US 奥克拉荷马州 oklahoma"
				break;
			}
		case "406":
			{
			document.getElementById("otherinfo").value = "US 蒙大拿州 montana"
				break;
			}
		case "407":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "408":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "409":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "410":
			{
			document.getElementById("otherinfo").value = "US 马里兰州 maryland"
				break;
			}
		case "412":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "413":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "414":
			{
			document.getElementById("otherinfo").value = "US 威斯康辛州 wisconsin"
				break;
			}
		case "415":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "416":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "417":
			{
			document.getElementById("otherinfo").value = "US 密苏里州 Missouri"
				break;
			}
		case "418":
			{
			document.getElementById("otherinfo").value = "CA 魁北克省 QC"
				break;
			}
		case "419":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "423":
			{
			document.getElementById("otherinfo").value = "US 田纳西州 tennessee"
				break;
			}
		case "425":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "430":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "432":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "434":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 virginia"
				break;
			}
		case "435":
			{
			document.getElementById("otherinfo").value = "US 犹他州 utah"
				break;
			}
		case "440":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "443":
			{
			document.getElementById("otherinfo").value = "US 马里兰州 maryland"
				break;
			}
		case "445":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}			
		case "450":
			{
			document.getElementById("otherinfo").value = "CA 魁北克省 QC"
				break;
			}
		case "469":
			{
			document.getElementById("otherinfo").value = "US 特克萨斯 texas"
				break;
			}
		case "470":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "475":
			{
			document.getElementById("otherinfo").value = "US 康乃狄克州 connecticut"
				break;
			}
		case "478":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "479":
			{
			document.getElementById("otherinfo").value = "US 阿肯色州 arkansas"
				break;
			}
		case "480":
			{
			document.getElementById("otherinfo").value = "US 亚利桑那州 arizona"
				break;
			}
		case "484":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "501":
			{
			document.getElementById("otherinfo").value = "US 阿肯色州 arkansas"
				break;
			}
		case "502":
			{
			document.getElementById("otherinfo").value = "US 肯塔基州 kentucky"
				break;
			}
		case "503":
			{
			document.getElementById("otherinfo").value = "US 奥勒冈州 oregon"
				break;
			}
		case "504":
			{
			document.getElementById("otherinfo").value = "US 路易斯安那州 louisiana"
				break;
			}
		case "505":
			{
			document.getElementById("otherinfo").value = "US 新墨西哥州 new mexico"
				break;
			}
		case "506":
			{
			document.getElementById("otherinfo").value = "CA 新不伦瑞克 NB"
				break;
			}
		case "507":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达州 minnesota"
				break;
			}
		case "508":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "509":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "510":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "512":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "513":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "514":
			{
			document.getElementById("otherinfo").value = "CA 魁北克省 ohio"
				break;
			}
		case "515":
			{
			document.getElementById("otherinfo").value = "US 艾奥瓦州 lowa"
				break;
			}
		case "516":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "517":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "518":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "519":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "520":
			{
			document.getElementById("otherinfo").value = "US 亚利桑那州 arizona"
				break;
			}
		case "530":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "540":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 virginia"
				break;
			}
		case "541":
			{
			document.getElementById("otherinfo").value = "US 奥勒冈州 oregon"
				break;
			}
		case "559":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "561":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "562":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "563":
			{
			document.getElementById("otherinfo").value = "US 艾奥瓦州 iowa"
				break;
			}
		case "564":
			{
			document.getElementById("otherinfo").value = "US 华盛顿 washington"
				break;
			}
		case "567":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "570":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "571":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 virginia"
				break;
			}
		case "573":
			{
			document.getElementById("otherinfo").value = "US 密苏里州 missouri"
				break;
			}
		case "574":
			{
			document.getElementById("otherinfo").value = "US 印第安纳州 indiana"
				break;
			}
		case "580":
			{
			document.getElementById("otherinfo").value = "US 奥克拉荷马州 oklahoma"
				break;
			}
		case "585":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "586":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "601":
			{
			document.getElementById("otherinfo").value = "US 密西西比州 mississippl"
				break;
			}
		case "602":
			{
			document.getElementById("otherinfo").value = "US 亚利桑那 arizona"
				break;
			}
		case "603":
			{
			document.getElementById("otherinfo").value = "US 新罕布什尔 new hampsbire"
				break;
			}
		case "604":
			{
			document.getElementById("otherinfo").value = "CA 英属哥伦比亚省 BC"
				break;
			}
		case "605":
			{
			document.getElementById("otherinfo").value = "US 南达科他州 south dakota"
				break;
			}
		case "606":
			{
			document.getElementById("otherinfo").value = "US 肯塔基州 kentucky"
				break;
			}
		case "607":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "608":
			{
			document.getElementById("otherinfo").value = "US 威斯康辛州 wisconsin"
				break;
			}
		case "609":
			{
			document.getElementById("otherinfo").value = "US 新泽西州 new jeresy"
				break;
			}
		case "610":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "612":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达州 minnesota"
				break;
			}
		case "613":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "614":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "615":
			{
			document.getElementById("otherinfo").value = "US 田纳西州 tennessee"
				break;
			}
		case "616":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "617":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "618":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "619":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "620":
			{
			document.getElementById("otherinfo").value = "US 堪萨斯州 kansas"
				break;
			}
		case "623":
			{
			document.getElementById("otherinfo").value = "US 亚利桑那 arizona"
				break;
			}
		case "626":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "630":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "631":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "636":
			{
			document.getElementById("otherinfo").value = "US 密苏里州 missouri"
				break;
			}
		case "641":
			{
			document.getElementById("otherinfo").value = "US 艾奥瓦州 lowa"
				break;
			}
		case "646":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "647":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "650":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "651":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达州 minnesota"
				break;
			}
		case "660":
			{
			document.getElementById("otherinfo").value = "US 密苏里州 missouri"
				break;
			}
		case "661":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "662":
			{
			document.getElementById("otherinfo").value = "US 密西西比州 mississippi"
				break;
			}
		case "671":
			{
			document.getElementById("otherinfo").value = "US 关岛"
				break;
			}
		case "678":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "682":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "701":
			{
			document.getElementById("otherinfo").value = "US 北达科他州 north dakota"
				break;
			}
		case "702":
			{
			document.getElementById("otherinfo").value = "US 内华达州 nevada"
				break;
			}
		case "703":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 nevada"
				break;
			}
		case "704":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 north carolina"
				break;
			}
		case "705":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "706":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "707":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州"
				break;
			}
		case "708":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "709":
			{
			document.getElementById("otherinfo").value = "CA 纽芬兰省 NL"
				break;
			}
		case "712":
			{
			document.getElementById("otherinfo").value = "US 艾奥瓦州 iowa"
				break;
			}
		case "713":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯州 texas"
				break;
			}
		case "714":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "715":
			{
			document.getElementById("otherinfo").value = "US 威斯康辛州 wisconsin"
				break;
			}
		case "716":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "717":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "718":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "719":
			{
			document.getElementById("otherinfo").value = "US 科罗拉多州 colorado"
				break;
			}
		case "720":
			{
			document.getElementById("otherinfo").value = "US 科罗拉多州 colorado"
				break;
			}
		case "724":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "727":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 flori"
				break;
			}
		case "731":
			{
			document.getElementById("otherinfo").value = "US 田纳西州 tennessee"
				break;
			}
		case "732":
			{
			document.getElementById("otherinfo").value = "US 新泽西州 new jeresy"
				break;
			}
		case "734":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "740":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "754":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "757":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 virginia"
				break;
			}
		case "760":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "763":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达州 minnesota"
				break;
			}
		case "765":
			{
			document.getElementById("otherinfo").value = "US 印第安纳州 indiana"
				break;
			}
		case "769":
			{
			document.getElementById("otherinfo").value = "US 密西西比州 mississippi"
				break;
			}
		case "770":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "772":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 illinois"
				break;
			}
		case "773":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "774":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "775":
			{
			document.getElementById("otherinfo").value = "US 内华达州 nevada"
				break;
			}
		case "778":
			{
			document.getElementById("otherinfo").value = "CA 英属哥伦比亚 BC"
				break;
			}
		case "780":
			{
			document.getElementById("otherinfo").value = "CA 亚伯达省 AB"
				break;
			}
		case "781":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "785":
			{
			document.getElementById("otherinfo").value = "US 堪萨斯州 kansas"
				break;
			}
		case "786":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "787":
			{
			document.getElementById("otherinfo").value = "US 波多黎各"
				break;
			}
		case "801":
			{
			document.getElementById("otherinfo").value = "US 犹他州 utah"
				break;
			}
		case "802":
			{
			document.getElementById("otherinfo").value = "US 佛蒙特 vermont"
				break;
			}
		case "803":
			{
			document.getElementById("otherinfo").value = "US 南卡罗来纳 south carolina"
				break;
			}
		case "804":
			{
			document.getElementById("otherinfo").value = "US 维吉尼亚州 virginia"
				break;
			}
		case "805":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "806":
			{
			document.getElementById("otherinfo").value = "US 特克萨斯 texas"
				break;
			}
		case "807":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 NT"
				break;
			}
		case "808":
			{
			document.getElementById("otherinfo").value = "US 夏威夷 hawaii"
				break;
			}
		case "810":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "812":
			{
			document.getElementById("otherinfo").value = "US 印第安纳州 indiana"
				break;
			}
		case "813":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "814":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "815":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "816":
			{
			document.getElementById("otherinfo").value = "US 密苏里州 missouri"
				break;
			}
		case "817":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "818":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "819":
			{
			document.getElementById("otherinfo").value = "CA 魁北克省 QC"
				break;
			}
		case "828":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 north carolina"
				break;
			}
		case "830":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "831":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "832":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "835":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州 pennsylvania"
				break;
			}
		case "843":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 north carolina"
				break;
			}
		case "845":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "847":
			{
			document.getElementById("otherinfo").value = "US 伊利诺州 illinois"
				break;
			}
		case "850":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "856":
			{
			document.getElementById("otherinfo").value = "US 新泽西州 new jeresy"
				break;
			}
		case "857":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "858":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "859":
			{
			document.getElementById("otherinfo").value = "US 肯塔基州 kentucky"
				break;
			}
		case "860":
			{
			document.getElementById("otherinfo").value = "US 康乃狄克州 connecticut"
				break;
			}
		case "863":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "864":
			{
			document.getElementById("otherinfo").value = "US 南卡罗来纳 south carolina"
				break;
			}
		case "865":
			{
			document.getElementById("otherinfo").value = "US 田纳西州 tennessee"
				break;
			}
		case "867":
			{
			document.getElementById("otherinfo").value = "CA 育康地区 YT"
				break;
			}
		case "870":
			{
			document.getElementById("otherinfo").value = "US 阿肯色州 arkansas"
				break;
			}
		case "878":
			{
			document.getElementById("otherinfo").value = "US 宾夕法尼亚州"
				break;
			}
		case "901":
			{
			document.getElementById("otherinfo").value = "US 田纳西州 tennessee"
				break;
			}
		case "902":
			{
			document.getElementById("otherinfo").value = "CA 新高沙省 NS"
				break;
			}
		case "903":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "904":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "905":
			{
			document.getElementById("otherinfo").value = "CA 安大略省 ON"
				break;
			}
		case "906":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}
		case "907":
			{
			document.getElementById("otherinfo").value = "US 阿拉斯加州 alaska"
				break;
			}
		case "908":
			{
			document.getElementById("otherinfo").value = "US 新泽西州 new jeresy"
				break;
			}
		case "909":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "910":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 north carolina"
				break;
			}
		case "912":
			{
			document.getElementById("otherinfo").value = "US 佐治亚州 georgia"
				break;
			}
		case "913":
			{
			document.getElementById("otherinfo").value = "US 堪萨斯州 kansas"
				break;
			}
		case "914":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "915":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "916":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "917":
			{
			document.getElementById("otherinfo").value = "US 纽约州 new york"
				break;
			}
		case "918":
			{
			document.getElementById("otherinfo").value = "US 俄克拉荷马 oklahoma"
				break;
			}
		case "919":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 north carolina"
				break;
			}
		case "920":
			{
			document.getElementById("otherinfo").value = "US 威斯康辛州 wisconsin"
				break;
			}
		case "925":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "928":
			{
			document.getElementById("otherinfo").value = "US 亚利桑那 arizona"
				break;
			}
		case "931":
			{
			document.getElementById("otherinfo").value = "US 田纳西州 tennessee"
				break;
			}
		case "936":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "937":
			{
			document.getElementById("otherinfo").value = "US 俄亥俄州 ohio"
				break;
			}
		case "939":
			{
			document.getElementById("otherinfo").value = "US 波多黎各 "
				break;
			}
		case "940":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "941":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "947":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 Michigan"
				break;
			}
		case "949":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "951":
			{
			document.getElementById("otherinfo").value = "US 加利福尼亚州 california"
				break;
			}
		case "952":
			{
			document.getElementById("otherinfo").value = "US 明尼苏达 minnesota"
				break;
			}
		case "954":
			{
			document.getElementById("otherinfo").value = "US 佛罗里达州 florida"
				break;
			}
		case "956":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯州 texas"
				break;
			}
		case "959":
			{
			document.getElementById("otherinfo").value = "US 康乃狄克州 connecticut"
				break;
			}
		case "970":
			{
			document.getElementById("otherinfo").value = "US 康乃狄克州 connecticut"
				break;
			}
		case "971":
			{
			document.getElementById("otherinfo").value = "US 俄勒冈州 oregon"
				break;
			}
		case "972":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯州 texas"
				break;
			}
		case "973":
			{
			document.getElementById("otherinfo").value = "US 新泽西州 new jeresy"
				break;
			}
		case "978":
			{
			document.getElementById("otherinfo").value = "US 马塞诸塞州 massachusetts"
				break;
			}
		case "979":
			{
			document.getElementById("otherinfo").value = "US 德克萨斯 texas"
				break;
			}
		case "980":
			{
			document.getElementById("otherinfo").value = "US 北卡罗来纳州 north carolina"
				break;
			}
		case "985":
			{
			document.getElementById("otherinfo").value = "US 路易斯安那州 louisiana"
				break;
			}
		case "989":
			{
			document.getElementById("otherinfo").value = "US 密歇根州 michigan"
				break;
			}			
		case "888":
			{
			document.getElementById("otherinfo").value = ""
				break;
			}
		default:
			{
			document.getElementById("otherinfo").value = "未找到区号数据，请联系开发者"
			break;
			}
		}






}




}


function autocnl() {//取消服务自动填表函数
var frameObj = document.getElementsByTagName("iframe");
var ctd = prompt("请输入预约取消日期", "");
document.getElementById('default:status').value = 'Open';
ctd1 = parseInt(ctd.slice(0,2));
ctd2 = parseInt(ctd.slice(2,4));
var ctd4 = ctd3;
var ctd3;
if (ctd2+10 >29)
{
ctd4 = ctd1 + 1;
ctd3 = ctd2 - 19;
}
else
{
ctd3 = ctd2 + 10;
ctd4 = ctd1;
}
if (ctd4 >12)
{
ctd4 = 1;
}
document.getElementById('default:title').value = getcon(parseInt(gettext('注册渠道'))) + gettext('姓名') + '-取消服务-' + localStorage.getItem('wn');
document.getElementById("default:iptvCloud").value = 0;
A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id350','parameters':{'default:j_id350':'default:j_id350'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
    conval1 = setInterval(function(){cheval('1075','0')},1000);
frameObj[0].contentWindow.document.body.innerText = cct + "\n1.取消原因:\n2.挽留办法:\n3.挽留结果:失败\n4.机顶盒序列号:" + gettext('机顶盒条形码') +"\n5.订单状态:" + gettext('魅力状态') + "\n6.需退还费用:\n7.退费方式\n信用卡/支票/银行转账(银行名称，用户名，BSB，Account Number)\n8.合约期内取消需要收取违约金69.99（用户同意支付/不同意支付）\n9.已为用户发送取消邮件并预约操作停止" + ctd1 + "月" + ctd2 + "日，请查收用户退还设备，若在" + ctd4 + "月" + ctd3 + "日仍未收到，请将工单提交到“客服初级”名下跟进，若已收到用户退还设备，请按照以上退费方式为用户办理退费，谢谢！"
}

function autobfr() {//缓冲自动填表函数
var frameObj = document.getElementsByTagName("iframe");
document.getElementById('default:status').value = 'Open';
document.getElementById('default:title').value = getcon(parseInt(gettext('注册渠道'))) + gettext('姓名') + '-缓冲-' + localStorage.getItem('wn');
document.getElementById("default:iptvCloud").value = 0;
A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id350','parameters':{'default:j_id350':'default:j_id350'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
    conval1 = setInterval(function(){cheval('673','1642')},1000);
document.getElementById('default:assign').value = 505626;
frameObj[0].contentWindow.document.body.innerText = cct + "\n1.用户收看节目出现缓冲\n2.已指导用户提交数据\n3.机顶盒序列号为:" + gettext('机顶盒条形码') + "\n4.已请用户在提交信息完成后重启家庭网络设备与机顶盒\n5.联系电话：\n6.请在20分钟内回复用户,谢谢!"
}

function autornw() {//套餐提醒填表函数
var frameObj = document.getElementsByTagName("iframe");
document.getElementById('default:status').value = 'Open';
document.getElementById('default:title').value = getcon(parseInt(gettext('注册渠道'))) + gettext('姓名') + '-发送套餐提醒邮件失败' ;
document.getElementById("default:iptvCloud").value = 0;
A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id350','parameters':{'default:j_id350':'default:j_id350'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
    conval1 = setInterval(function(){cheval('1179','1231')},1000);
document.getElementById('default:assign').value = 505626
frameObj[0].contentWindow.document.body.innerText = cct + "\n发送到期提醒邮件失败，请回访告知用户到期时间和续约资费，若超过2次未联系上，请将工单提交至高级坐席名下。\n若已联系上用户同意到期后继续续订原计划，请在续约管理里操作为用户续转原计划。"

}
var conval1;

function autocrd() {//更新资料填表函数
var frameObj = document.getElementsByTagName("iframe");
var updc = prompt("请输入所更新项目，如信用卡或地址", "");
document.getElementById('default:title').value = getcon(parseInt(gettext('注册渠道'))) + gettext('姓名') + '-更新' + updc + '-' + localStorage.getItem('wn');
document.getElementById("default:iptvCloud").value = 0;
A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id350','parameters':{'default:j_id350':'default:j_id350'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
document.getElementById("default:status").value = 0;
    conval1 = setInterval(function(){cheval('1102','1107');},1000);

document.getElementById('default:status').value = 'Closed';

frameObj[0].contentWindow.document.body.innerText = cct + "\n来电更新" + updc + "，已更新。\n工单关闭。"


}

function getcon(regnm) {
var regnm;

if (regnm < 20000 || regnm == 90000)
{
return "US-";
}
else if (regnm < 30000 && regnm > 20000)
{
return "CA-";
}
else
{
return "AU-";
}



}









function setval(zone,val) {//设置select值
var zone,val;
document.getElementById(zone).value = val;

}


function getval(zone) {//获取select值
var zone,val;
val = document.getElementById(zone).value;
return val;
}

function cheval(val1,val2) {//循环设置select
var val1,val2;
    setval('default:one',val1);
    setval('default:two',val2 );
    if (getval('default:one') == val1)
    {
     A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id355','parameters':{'default:j_id355':'default:j_id355'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
     if (val2 != 0)
     {
         setval('default:two',val2)
         if ( getval('default:two') == val2)
         {
             A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id360','parameters':{'default:j_id360':'default:j_id360'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
             clearInterval(conval1);
         }
     }
     else if (val2 == 0)
     {
      A4J.AJAX.Submit('_viewRoot','default',event,{'similarityGroupingId':'default:j_id360','parameters':{'default:j_id360':'default:j_id360'} ,'actionUrl':'/hy_crm/rich/page/TroubleTicketManager/CreateTroubleTicketPage.faces'} );
      clearInterval(conval1);   
     }
    }
}





function autotme() {//插入时间函数
var myDate = new Date();
var cctn = myDate.toLocaleString();
var frameObj = document.getElementsByTagName("iframe");
frameObj[0].contentWindow.document.body.innerText = cctn + "\n" + frameObj[0].contentWindow.document.body.innerText ;


}











function nametonum (wn) {//工号判断函数
var wn;
switch (wn) {
case "yangkan":
{
localStorage.setItem('wn', 1050);
break;
}
case "tancaiyun":
{
localStorage.setItem('wn', 1003);
break;
}
case "zhangliqiong":
{
localStorage.setItem('wn', 1005);
break;
}
case "linyanyan":
{
localStorage.setItem('wn', 1006);
break;
}
case "baiyun":
{
localStorage.setItem('wn', 1008);
break;
}
case "yiweiliang":
{
localStorage.setItem('wn', 1014);
break;
}
case "huangshuman":
{
localStorage.setItem('wn', 1016);
break;
}
case "longjing":
{
localStorage.setItem('wn', 1020);
break;
}
case "tanjingbo":
{
localStorage.setItem('wn', 1030);
break;
}
case "niena":
{
localStorage.setItem('wn', 1031);
break;
}
case "huangjinjing":
{
localStorage.setItem('wn', 1032);
break;
}
case "caiyun":
{
localStorage.setItem('wn', 1037);
break;
}
case "liuchao":
{
localStorage.setItem('wn', 1042);
break;
}
case "xiongqiong":
{
localStorage.setItem('wn', 1048);
break;
}
case "zhengjiancan":
{
localStorage.setItem('wn', 1053);
break;
}
case "zhoujun":
{
localStorage.setItem('wn', 1055);
break;
}
case "zengkai":
{
localStorage.setItem('wn', 1056);
break;
}
case "bijianbiao":
{
localStorage.setItem('wn', 1059);
break;
}
case "xiaxujiao":
{
localStorage.setItem('wn', 1015);
break;
}
case "xuxia":
{
localStorage.setItem('wn', 1043);
break;
}
case "liguan":
{
localStorage.setItem('wn', 1009);
break;
}
case "zhanghui":
{
localStorage.setItem('wn', 1018);
break;
}
}

}











if (document.getElementById("gongdan") ) {

var input =document.createElement("input");//取消服务填表入口
{
input.setAttribute("type","button");
input.setAttribute("value","取消服务");
input.onclick = autocnl;
}
var mydiv=document.getElementById("gongdan");
mydiv.appendChild(input);

var input =document.createElement("input");//缓冲填表入口
{
input.setAttribute("type","button");
input.setAttribute("value","缓冲");
input.onclick = autobfr;
}
var mydiv=document.getElementById("gongdan");
mydiv.appendChild(input);

var input =document.createElement("input");//套餐到期提醒填表入口
{
input.setAttribute("type","button");
input.setAttribute("value","套餐到期提醒");
input.onclick = autornw;
}
var mydiv=document.getElementById("gongdan");
mydiv.appendChild(input);


var input =document.createElement("input");//更新资料填表入口
{
input.setAttribute("type","button");
input.setAttribute("value","更新资料");
input.onclick = autocrd;
}
var mydiv=document.getElementById("gongdan");
mydiv.appendChild(input);

var input =document.createElement("input");//插入时间入口
{
input.setAttribute("type","button");
input.setAttribute("value","插入时间");
input.onclick = autotme;
}
var mydiv=document.getElementById("gongdan");
mydiv.appendChild(input);





var wna = document.getElementsByTagName("a");
var wn = nametonum(wna[0].innerText);//获取登入用户名

}




var myDate = new Date();
var cct = myDate.toLocaleString();//获取系统时间


var startid = setInterval(confirm, 1000);//预约取消检测入口
var errid = setInterval(errorstate, 1000)//CRM错误检测入口
var saveid = setInterval(autosave, 20000);//自动保存入口
var mail = addmailcnt();//邮件模板入口
var zone = zonedetact();//来电归属地入口
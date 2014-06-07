// ==UserScript==
// @name      Rapid Buy
// @version	  1.2
// @namespace      http://www.morntea.com/
// @description    淘宝秒杀辅助工具
// @author	  Lou Lin(loulin@morntea.com)
// @include	  http://item.taobao.com/*
// @include	  http://buy.taobao.com/*
// ==/UserScript==

var MS_VALID_TIME = -5 * 60 * 1000;	//秒杀开始后的延时，要发怒了，开始后5分钟都还没开始
var MS_AHEAD_TIME = 3 * 1000;	//最后无等待刷新倒计时，默认3秒
var REFRESH_INTERVAL = 5 * 60 * 1000;	//刷新间隔时间，默认5分钟
var MS_START_TIME = "01 07, 2011 16:00:00";
var ITEM_ID = "9023573744";
var ANSWER = "";


var NOTE = "...";
var PROVINCE = "310000";
var CITY = "310100";
var AREA = "310112";
var AREA_CODE = "310112";
var POST_CODE = "200240";
var ADDRESS = "...";
var NAME = "...";
var PHONE = "...";

var LOG_CONSOLE = 0;

/* 秒杀初始化，检查秒杀时间及是否登录 */
function init() {
	var reload = false;
	if(!isMsTimeValid()) {
		log("init:秒杀时间过期或未设置。");
		checkLogin();
		reload = true;
	}
	setMsTime();
	if(reload && isMsTimeValid()) {window.location.reload();}
}

function $(id) {return document.getElementById(id);}
var BUF = 4; var logArr = new Array(BUF);var cur = 0;
function log(str) {
	switch(LOG_CONSOLE) {
		case 0:
			logArr[cur] = str; var strtmp = "";
			var i = 0;index = 0;
			while(i<BUF){
				index = (cur+i)%BUF;
				console.log("cur:"+cur+",i="+i+""+logArr[index]);
				if(typeof logArr[index] != "undefined")	strtmp += (i==0?"":"  -  ") + "(" + i + ")" + logArr[index];
				i++;
			}
			document.title = strtmp;
			if(++cur==BUF)cur=0;
			break;
		case 1: GM_log(str);break;
		case 2: console.log(str);break;
		default: alert(str);
	}
}
function getFormElementByName(name) {
	return document.evaluate("//input[@name = '"+name+"']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function fT(date) {
	//return (date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds();
	return date.getDate()+"日"+date.getHours()+"点"+date.getMinutes()+"分"+date.getSeconds()+"秒"+date.getMilliseconds();
}

/* 判断秒杀时间是否有效 */
function isMsTimeValid() {
	var mstime = GM_getValue("mstime");
	if(typeof mstime == "undefined") {
		return false;
	} else {
		var mstime = new Date(mstime);
		if((mstime.getTime() - new Date().getTime())<MS_VALID_TIME) {
			return false;
		}
	}
	return true;
}

/* 检查是否登录，未登录则登录，否则设置秒杀时间 */
function checkLogin() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://i.taobao.com/my_taobao.htm",
		onload: function(response) {
			if(response.responseText.indexOf("支付宝会员登录")!=-1) {
				if(confirm("尚未登录，是否登录？")) {
					window.location.href = "https://login.taobao.com/member/login.jhtml?f=top&redirectURL=" + window.location.href;
				}
			}
		}
	});
}

/* 设置秒杀时间 */
function setMsTime() {
	var strMsTime = MS_START_TIME;
	GM_setValue("mstime", strMsTime);
	log("秒杀时间设为：" + strMsTime);
}

function destroyGlobal(confVar) {
	if(typeof GM_getValue(confVar) != "undefined") {
		log("销毁" + confVar + "=" + GM_getValue(confVar));
		GM_deleteValue(confVar);
	}
}

function destroy() {
	destroyGlobal("mstime");
	destroyGlobal("answer");
	destroyGlobal("timeline");
}

/* 将秒杀问题保存在Firefox全局配置中 */
function saveQuestion() {
	var msQuestionObj = document.getElementById("seckill");
	if(msQuestionObj!=null) {	
		var question = msQuestionObj.children[2].innerHTML.split("<br>")[1]; //.lastChild.innerHTML.split("<br>")[1];		
		GM_setValue("question", question); //question = "888+999-1880=？（填答案即可） ";
		log(GM_getValue("question"));
	}
}

/* 判断是否包含可计算的表达式，若是则返回表达式，否则返回null */
function parseExpr(str) { // 例子：“2*6*8/3=？（填答案即可） ”，返回“2*6*8/3”
	var expr = str.replace(/（.+）/g, "").replace(/[ =？\s]+/g, "");
	if(/^[\d\+\-\*\/\(\)]+$/.test(expr)) {
		return expr;
	} else {
		return null;
	}
}

/* 简单判断当前商品可否秒杀（已经发现秒杀问题或者价格只有1元）*/
function canBuy() {
	var msQuestionObj = $("seckill");
	var buyButton = $("J_LinkBuy");
	var priceObj = $("J_StrPrice");
	var vipPriceObj = $("J_SpanVip");
	if (msQuestionObj!=null 
		|| (buyButton!=null 
			&& (priceObj.innerHTML=="1.00"
				//|| vipPriceObj.innerHTML=="1.00"
				|| (ITEM_ID!="" && location.href.indexOf(ITEM_ID)!=-1) 
				)
			)
		) {
		return true;
	}
	return false;
}

/* 开始购买，模拟点击“立即购买” */
function autoBuy() {
	log("Begin to buy");
	document.getElementById("J_FrmBid").submit(); //document.forms["bidForm"].submit();
	//location.assign( "javascript:var evt = document.createEvent('MouseEvents');evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);document.getElementById('J_LinkBuy').dispatchEvent(evt);void(0)" );
}

/* 加速购买页面，问题输入框获得焦点，增加TAB键跳到验证码输入 */
function fastInput() {
	if($("J_OrderForm")==null) return;
	$("n_prov").value = PROVINCE;
	$("n_city").value = CITY;
	$("n_area").value = AREA;
	$("divisionCode").value = AREA_CODE;
	$("J_postCode").value = POST_CODE;
	$("deliverAddress").value = ADDRESS;
	$("deliverName").value = NAME;
	$("deliverPhoneBak").value = PHONE;
	
	$("performSubmit").focus(); // Used to simply scroll down the window to fully display verify code	
	
	// other infomation
	$("J_msgtosaler").value = NOTE;
	if($("shippingHidden")!=null){
		var ship = 4; //4,快递 7,EMS
		if($("shippingHidden").value=="") {$("shippingHidden").value = ship;}
		if($("shipping"+ship)!=null) {$("shipping"+ship).checked="checked";}
	}
	var bonus = getFormElementByName("bonus_id");
	if(bonus!=null) bonus.checked="checked";
	
	// verify code
	var verifyCode = $("J_checkCodeInput");
	if(verifyCode!=null) {
		verifyCode.tabIndex = 20;
		verifyCode.style.imeMode = "disabled";
		verifyCode.focus();
	}
	
	// answer question
	var answer = document.evaluate("//input[@name = '_fma.b._0.se']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(answer!=null) {
		answer.tabIndex = 21;
		var question = GM_getValue("question");
		var expr = parseExpr(question);
		if(expr!=null) { // If the question is an expression
			try {
				answer.value = eval(expr);
			} catch(e) {
				answer.value = "";
			}
		} else {
			var pos = question.lastIndexOf("（");
			if(pos!=-1) { // If the answer is given
				var hint = question.substring(pos+1, question.lastIndexOf("）"));
				if(hint.indexOf("个")==-1 && hint.indexOf("字")==-1){
					answer.value = hint;
				}
			}
		}
		if(ANSWER!="") answer.value = ANSWER;
		if(verifyCode==null || verifyCode.value!="") {
			answer.focus();
		}
		// 直接将问题显示在答案输入框下面
		function getPos(q){
			var p = q.lastIndexOf("？");
			if(p==-1) p = q.lastIndexOf("（");
			if(p==-1) p = q.length;
			var w = q.lastIndexOf("什么");
			if(p-w<=5) p = w;
			return p;
		}
		var pos = getPos(question); var searchStr = question; var tail = "";
		if(pos!=-1) {searchStr = question.substring(0, pos); tail = question.substring(pos);}
		var newDiv = document.createElement("div");
		var newLink = document.createElement("a");
		newLink.href = "http://www.baidu.com/baidu?wd=" + searchStr;
		newLink.setAttribute("style", "color: red; font-size: 14px; font-weight: bold;");
		newLink.setAttribute("target", "_blank");
		newLink.innerHTML = searchStr;
		newDiv.appendChild(newLink);
		newDiv.appendChild(document.createTextNode(tail+"（"+$("NameText").textContent+"）"));
		var shop = getFormElementByName("shop_name");
		if(shop!=null)newDiv.appendChild(document.createTextNode("（"+shop.value+"）"));
		answer.parentNode.appendChild(newDiv);
	}
	
	// submit directly
	if (answer==null && verifyCode==null 
		//|| (answer.value!="" && verifyCode.value!="")
		) { //没问题没验证码则直接提交秒杀
		log("缓存的问题：" + GM_getValue("question"));
		var action = getFormElementByName("action");
		if( getFormElementByName("item_id_num").value==ITEM_ID || (action!=null && action.value.indexOf("secKill")!=-1) ) { //buynow/secKillBuyNowAction
			$("performSubmit").click(); //document.forms["mainform"].submit();
			$("J_OrderForm").submit();
		}
	}
}

function monitor() {
	//-------------------------------------------------- //购买
	if(location.href.indexOf("buy_now.htm")!=-1) { //http://buy.taobao.com/auction/buy_now.htm
		log(fT(new Date()));
		log(fT(new Date()) + "秒杀提交");
	} else if (location.href.indexOf("buy.taobao.com")!=-1) { //http://buy.taobao.com/auction/buy_now.jhtml
		fastInput();
		destroy();
		log(fT(new Date()) + "开始秒杀");
	//-------------------------------------------------- //商品页面
	} else {
		if($("detail")&&$("detail").textContent.indexOf("秒杀完毕")!=-1) {
			log("宝贝已秒杀完毕！");return;
		}
		init();
		if(canBuy()) {
			saveQuestion();
			autoBuy();
		} else {
			var mstime = GM_getValue("mstime");
			var now = new Date();
			if(typeof mstime != "undefined") {
				mstime = new Date(mstime);
				var left = mstime.getTime() - now.getTime();
				if(left>0)log("剩余" + ((left)>1000?(parseInt(left/1000)+"秒"+(left%1000)):left) + "毫秒");
				log("当前[" + fT(now) + "]");
				
				if (left < MS_VALID_TIME) {
					log("秒杀时间过期或未设置。");
				} else if (left <= MS_AHEAD_TIME) {
					log("居然没有刷出来！！！500毫秒自动刷新！！！");
					setTimeout("window.location.reload();", 500);
				} else {
					var waitMicro;
					if(left > MS_AHEAD_TIME + REFRESH_INTERVAL) {
						waitMicro = REFRESH_INTERVAL-parseInt(Math.random()*(REFRESH_INTERVAL/10));
					} else {
						waitMicro = left - MS_AHEAD_TIME;
					}
					log(waitMicro/1000 + "s后刷新，[" + fT(mstime) + "]秒杀");	
					
					// calculate network delay
					function reload() {
						GM_setValue("timeline", (new Date().getTime())+"");
						window.location.reload();
					}
					var timeline = GM_getValue("timeline");
					if(typeof timeline != "undefined") {
						log("网络延迟：" + (new Date().getTime()-timeline) + "毫秒");
					}
					
					setTimeout(function(){reload();}, waitMicro);
				}
			}
		}
	}
};
monitor();
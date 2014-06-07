// ==UserScript==
// @name        dz论坛自动灌水机
// @namespace   http://userscripts.org/scripts/show/168113
// @description 实现dz论坛下自动灌水功能
// @include     *read*tid*
// @include     *forum*fid*
// @include	*thread*
// @include	*forum*viewthread*
// @version     1.2
// ==/UserScript==


// ------------------------------ Read Me ------------------------------ //
// 间隔时间如果设置过小，会导致回复无效；其实间隔时间也不准
// 一次只能在一个url里面灌水，不能同时作用于不同的两个url


// ------------------------------ To Learn ------------------------------ //

// ------------------------------ Update Log ------------------------------ //
// first created on May 22, 2013


/////初始化。。。。。。。
if(GM_getValue("start_flag")==null)
	GM_setValue("start_flag", false);

//console.log("灌水模式--"+GM_getValue("start_flag"));
//console.log("url--"+GM_getValue("url"));
//console.log("textArea--"+GM_getValue("textArea"));
//console.log("count--"+GM_getValue("count"));
//console.log("interval--"+GM_getValue("interval"));

console.log("灌水模式初始化<<<<<<<<<<<<");

water();

function water() {

var wBtn_f=Id("wBtn");
var wStn_f=Id("wStn");
var curDiv = Id("f_pst");
var newDiv = document.createElement("div");

	if(GM_getValue("start_flag"))
	{
		if(wBtn_f!=null)
			{
				Id("wBtn").style.display="none";
			}
		else if(wStn_f==null){
			newDiv.innerHTML = '\
		<button id = "wBtn" class = "pn pnc vm" style = "float : right; display:none; margin-right:200px"> <strong> 开启灌水模式 </strong> </button>\
		<b>回复内容</b>\
		<input id = "textArea1" type = "text" style = "width : 400px" class = "tedt mtn">\
		<b>回复次数</b>\
		<input id = "textArea2" type = "text" style = "width : 30px" value="5" class = "tedt mtn">\
		<b>间隔时间(秒)</b>\
		<input id = "textArea3" type = "text" style = "width : 30px" value="' + GM_getValue("interval")/1000 + '" class = "tedt mtn" >\
		<button id = "wStn" class = "pn pnc vm" style = "float : right;margin-right : 200px"> <strong> 关闭灌水模式 </strong> </button>\
		';
		curDiv.parentNode.appendChild(newDiv);
		wStn_f=Id("wStn");
		}
		
		if(wStn_f==null) 
		{
			newDiv.innerHTML = '\
		<button id = "wStn" class = "pn pnc vm" style = "float : right;margin-right : 200px"> <strong> 关闭灌水模式 </strong> </button>\
		';
		curDiv.parentNode.appendChild(newDiv);
		}
		if(Id("wStn").style.display=="none") Id("wStn").style.display="block";
		var the_wStn = document.getElementById("wStn");
		the_wStn.addEventListener("click", stopWater);	//按键监听关闭
		console.log("关闭灌水模式初始化完成<<<<<<<<<<");
	}
	else{
		if(wStn_f!=null)
			{Id("wStn").style.display="none";
			}
		if(wBtn_f==null) 
		{newDiv.innerHTML = '\
		<button id = "wStn" class = "pn pnc vm" style = "float : right; display:none; margin-right:200px"> <strong> 关闭灌水模式 </strong> </button>\
		<b>回复内容</b>\
		<input id = "textArea1" type = "text" style = "width : 400px" class = "tedt mtn">\
		<b>回复次数</b>\
		<input id = "textArea2" type = "text" style = "width : 30px" value="5" class = "tedt mtn">\
		<b>间隔时间(秒)</b>\
		<input id = "textArea3" type = "text" style = "width : 30px" value="15" class = "tedt mtn" >\
		<button id = "wBtn" class = "pn pnc vm" style = "float : right; margin-right : 200px"> <strong> 开启灌水模式 </strong> </button>\
		';
		curDiv.parentNode.appendChild(newDiv);
		}
		if(Id("wBtn").style.display=="none") Id("wBtn").style.display="block";
		var the_wBtn = document.getElementById("wBtn");
		the_wBtn.addEventListener("click", startWater);	//按键监听开启
		console.log("开启灌水模式初始化完成<<<<<<<<<<");

	}

if(GM_getValue("url") != window.location.href) { console.log("灌水模式已开，不是本页面。");	return;	}//不允许出现新的灌水页面



if(GM_getValue("count")) {
	
	GM_setValue("count", GM_getValue("count") - 1);
	var textArea = Id("fastpostmessage");
	var wBtn = Id("fastpostsubmit");

	textArea.value = radtextArea();
	
	wBtn.click();
	Id("textArea2").value=GM_getValue("count");
	console.log(GM_getValue("count"));
	if(GM_getValue("count")) {window.setTimeout(function() {water()}, GM_getValue("interval"));}
	else stopWater();
	
	document.getElementById("wStn").scrollIntoView(true);
	}
else {	//灌水结束
	stopWater();
	}
}	


/////////////////////////---函数---//////////////////////////
function Id(a) {
	return document.getElementById(a);
}

/////////////开启灌水模式////////////
function startWater() {
	GM_setValue("start_flag", true);
	GM_setValue("url", window.location.href);	//设定灌水页面url
	GM_setValue("textArea", Id("textArea1").value);	
	GM_setValue("count", parseInt(Id("textArea2").value));
	GM_setValue("interval", Id("textArea3").value * 1000);
	console.log("灌水模式开启！");
	water();
	
}

/////////////关闭灌水模式////////////
function stopWater() {
	if(GM_getValue("start_flag")){
	Id("textArea2").value=5;
	GM_setValue("start_flag", false);
	//GM_deleteValue("start_flag");
	GM_deleteValue("url");
	GM_deleteValue("textArea");
	GM_deleteValue("count");
	GM_deleteValue("interval");
	console.log("灌水模式关闭！");
	//alert("灌水模式关闭！");
	}
	water();
}

/////////////随机内容////自定义修改////////////
function radtextArea() {
	if(Id("textArea1").value!="")
	
	{return Id("textArea1").value;}
	
	var textArea= new Array(
		'[catsoul=1]直到我膝盖中了一箭[/catsoul]',
		'[catsoul=2]我擦！[/catsoul]',
		'[catsoul=3]你懂的。[/catsoul]',
		'[catsoul=4]这真是极好的[/catsoul]',
		'[catsoul=5]给力！[/catsoul]',
		'[catsoul=6]你妹。[/catsoul]',
		'[catsoul=7]感觉不会再爱了[/catsoul]',
		'[catsoul=8]楼下怎么看？[/catsoul]',
		'[catsoul=9]呵呵。[/catsoul]',
		'[catsoul=4]有人否？？？[/catsoul]',
		'[catsoul=9]一个人，默默地灌着水[/catsoul]',
		'用你的2B铅笔描绘出你的2B人生',
		'机息时,便有月到风来,不必苦海人世;心远处,自无车尘马迹,何须痼疾丘山。',
		'无论今天发生多么糟糕的事，都不应该感到悲伤。因为今天是你往后日子里最年轻的一天了……',
		'生活将我磨圆，是为了让我滚得更远。。。',
		'你复杂的五官掩饰不了你朴素的智商！',
		'奈何，七尺之躯，已许国，再难许卿',
		'[img]http://static.bbs.maxthon.cn/data/attachment/forum/201305/10/151444oyo7axyeww9wa0xp.jpg[/img]',
		'[img]http://static.bbs.maxthon.cn/data/attachment/forum/201305/09/143026mk1yzq6ek4c1kyp6.jpg[/img]'
		
	);
	
	//随机数
	var N=textArea.length-1;
	var radom_num = 0;
		radom_num = parseInt(Math.random()*N+1);	//0-N
	return textArea[radom_num];	
}

///////////刷新页面///////
function fun() {
	window.location.reload();
}
////////////////////////////--END--//////////////////////////////
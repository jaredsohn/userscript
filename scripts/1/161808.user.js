// ==UserScript==
// @name        Reply-function for Tieba
// @namespace   http://userscripts.org/users/508758
// @description add reply-function for Tieba
// @include     http://tieba.baidu.com/p/*
// @date        Mar 12, 2013  By I'mNotYangBuhui
// @version     1.0
// ==/UserScript==


//------------------------------ READ ME ------------------------------//
//该JS脚本完全是学习并模仿火狐吧@网络孤独行客 大神的作品完成的，再次感谢大神，另附大神作品地址 http://userscripts.org/scripts/show/138983
//本脚本用于贴吧回复帖子使用，只适用于无验证码的贴吧，使用期间，请勿关闭标签页,回复成功后会跳出提示框
//如需修改”快捷回复“中的内容，请到rpArr数组中自行修改
//"大量灌水"中"回复次数"请填写需要回复的次数，请勿短时间内回复大量内容，可能导致账号被封，该功能可用于贴吧抢楼
//定时灌水用于定时回复，"时间间隔"单位为秒，为每隔几秒回复一帖，“回帖总数"为总的需要的回帖数量，该功能用来防帖沉
//firefox only



//------------------------------ 函数 ------------------------------//
function getId(a) {	//取得某个对象的id
	return document.getElementById(a);
	}


	
//------------------------------ 快捷回复 ------------------------------//
var objDiv = document.getElementsByTagName("div");
var rpArr = new Array();
rpArr[0] = "楼主好人";
rpArr[1] = "占座挽尊";
rpArr[2] = "给楼主跪了";
rpArr[3] = "火钳刘明";
rpArr[4] = "虽不明但觉厉";
rpArr[5] = "三观尽毁，节操何在!";
rpArr[6] = "神马都是浮云";
rpArr[7] = "生活愉快~~";


for(var i = 0; i < objDiv.length; i++) 
	if(objDiv[i].className === "new_tiezi_tip") {	//将新建元素放到该元素位置的上面
		var curDiv = objDiv[i];
		var newDiv = document.createElement("div");
		newDiv.innerHTML = "\
		<div>\
			<b> 快捷回复 </b>\
			<select id = 'rpSet' style = 'width : 530px' >\
				<option>" + rpArr[0] + "</option>\
				<option>" + rpArr[1] + "</option>\
				<option>" + rpArr[2] + "</option>\
				<option>" + rpArr[3] + "</option>\
				<option>" + rpArr[4] + "</option>\
				<option>" + rpArr[5] + "</option>\
				<option>" + rpArr[6] + "</option>\
				<option>" + rpArr[7] + "</option>\
			</select>\
			<button id = 'rpBtn' style='float:right;margin-right:35px'>快捷回复</button>\
		</div>"
		curDiv.insertBefore(newDiv, curDiv.firstChild);
		break;
		}


var the_rpBtn = getId("rpBtn");
the_rpBtn.addEventListener("click", rp_Post);


function rp_Post() {
	var the_rpSet = getId("rpSet");
	var content = the_rpSet.value;
	var the_Content = unsafeWindow.rich_postor._getData();
	the_Content.content = content;
	unsafeWindow.PostHandler.post(unsafeWindow.rich_postor._option.url,the_Content,function(to_Post) {unsafeWindow.rich_postor.showAddResult(to_Post)},function(to_Post) {});  
	alert("快捷回复成功!");
	}


	
//------------------------------ 大量灌水 ------------------------------//
for(var i = 0; i < objDiv.length; i++) 
	if(objDiv[i].className == "new_tiezi_tip") {
		var curDiv = objDiv[i];
		var newDiv = document.createElement("div");
		//插入html的内容
		newDiv.innerHTML = "\
		<div>\
			<b> 大量灌水 </b>\
			<input id = 'gsText1' type = 'text' style = 'width : 430px'>\
			<b>回复次数 </b>\
			<input id = 'gsText2' type = 'text' style = 'width : 30px' >\
			<button id = 'gsBtn' style = 'float : right; margin-right : 35px'> 大量灌水 </button>\
		</div>"
		curDiv.insertBefore(newDiv, curDiv.firstChild);
		break;
		}

		
var the_gsBtn = getId("gsBtn");
the_gsBtn.addEventListener("click", gs_Post);


function gs_Post() {
	var content = getId("gsText1").value;
	var count = parseInt(getId("gsText2").value);
	var the_Content = unsafeWindow.rich_postor._getData();
	the_Content.content = content;
	for(var i = 0; i < count; i++) 
		unsafeWindow.PostHandler.post(unsafeWindow.rich_postor._option.url,the_Content,function(to_Post) {unsafeWindow.rich_postor.showAddResult(to_Post)},function(to_Post) {});  
	alert("大量灌水成功!");
	}


	

//------------------------------ 定时回复 ------------------------------//
for(var i = 0; i < objDiv.length; i++) 
	if(objDiv[i].className === "new_tiezi_tip") {
		var curDiv = objDiv[i];
		var newDiv = document.createElement("div");
		newDiv.innerHTML = '\
		<div>\
		    <b> 定时回复 </b>\
			<input id = "dgText1" type = "text" style = " width : 307px">\
			<b> 时间间隔(秒)</b>\
			<input id = "dgText2" type = "text" style = " width : 30px">\
			<b> 回帖次数 </b>\
			<input id = "dgText3" type = "text" style = " width : 30px">\
			<button id = "dgBtn" style = "float : right; margin-right : 35px"> 定时回复 </button>\
		</div>'
		
		curDiv.insertBefore(newDiv, curDiv.firstChild);
		break;
		}

		

		
var the_dgBtn = getId("dgBtn");
the_dgBtn.addEventListener("click", myFunction);


function myFunction() {
	var count = parseInt(getId("dgText3").value);
	GM_setValue("reply", count - 1);
	GM_setValue("content", getId("dgText1").value);
	GM_setValue("timeOut", getId("dgText2").value * 1000);
	GM_setValue("kk", "finish");
	dg_Post();
	}

function dg_Post() {
	var the_Content = unsafeWindow.rich_postor._getData();
	the_Content.content = GM_getValue("content");
	unsafeWindow.PostHandler.post(unsafeWindow.rich_postor._option.url,the_Content,function(to_Post) {unsafeWindow.rich_postor.showAddResult(to_Post)},function(to_Post) {});  
	}

	
if(GM_getValue("reply"))
{
	var value = GM_getValue("reply");
	GM_setValue("reply", value - 1);
	window.setTimeout(function(){dg_Post()},GM_getValue("timeOut", 60000));
}
else if(GM_getValue("kk") === "finish") {
	GM_setValue("kk","");
	alert("定时回复成功!");
	}
	
	
	

















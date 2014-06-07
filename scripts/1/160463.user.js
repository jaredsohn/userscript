// ==UserScript==
// @name           百度魔方吧扩展
// @description    百度魔方吧扩展
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         Jimo
// @version        0.0.3
// ==/UserScript==


var forCss2er = ".wapapp_adv,.cut_screen,#pic_to_album_tip,.fav-toolbar{display:none!important;}";
forCss2er += ".tb-editor-wrapper{width:1080px !important}.tb-editor-toolbar>span{width:60px !important;}";
forCss2er += ".recentImgDiv>.tb-editor-overlay{left:28% !important; top:30px !important;}";
GM_addStyle(forCss2er);


var replyCss = "";
replyCss += ".tb_icon_author, .tb_icon_author_rely{background:none !important;background-position:none !important;}";
replyCss += ".insertAt{padding:0px 0px 0px 0px; margin:1px 1px; cursor:pointer; background-color:lightGrey; display:inline-block;}";
replyCss += "#attaDiv{background-color:lightGrey; width:450px; border:4px double gray;} #ATTAnewEditDiv *:not(.pageTitle){font-size:12px !important;}";
replyCss += ".leftDiv{display:inline-block; background-color:lightGrey;padding:5px 6px; width:48px;}";
replyCss += ".rightDiv{display:inline-block; background-color:lightGrey; padding:4px 6px; width:375px;}";
replyCss += ".addPlus{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:blue;}";
replyCss += ".addPlusBack{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:red;}";
replyCss += ".picFrd{cursor:pointer; margin:0px 2px 0px -1px; width:20px; color:#A0522D; font-size:13px} .bbaa{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:green; font-size:13px} .bbaaB{cursor:pointer; margin:0px 2px 0px 0px; width:20px; color:#1E90FF; font-size:13px}";
replyCss += ".picFrdTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:#A0522D;} .bbaaTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:green;} .bbaaTabB{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:#1E90FF;}";
replyCss += ".addPlusTab{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:blue;}";
replyCss += ".addPlusTabBack{cursor:pointer; margin:0px 2px 0px 2px; width:20px; color:red;}";
replyCss += ".closeDivbt{cursor:pointer; float:right; margin:0px -2px; width:16px; height:16px;}";
replyCss += "#atta{cursor:pointer; padding:10px 8px 0px 8px; display:inline; color:#3163B6;}";
replyCss += "#mtimer{cursor:pointer; padding:10px 8px 0px 8px; display:inline-block; color:#FF0000; font-weight:bold;}";
replyCss += "#mtimers{cursor:pointer; padding:10px 8px 0px 8px; display:inline; color:#FF0000;}";
replyCss += "#mtimern{padding:10px 8px 0px 8px; display:inline; color:#3163B6;}";
replyCss += "#atta_lzl{margin:0 5px 3px 5px; float:right;cursor:pointer; font-size:1.2em; display:inline-block; color:#3163B6;}";
replyCss += ".thread_alt>td:nth-child(4){width:110px} .thread_alt>td:nth-child(5){width:160px}";
replyCss += ".ATeditFaceTxtTb{width:150px; padding:1px 1px 0 0;} .inputInTd{width:149px;} .FTbutton{margin:10px 10px 0px 0px}";
replyCss += "#ATTAnewEditDiv{border: 1px solid gray; z-index:2000; background-color:#EEEEEE; padding:20px; position:fixed; left:300px; bottom:80px;}";
replyCss += ".pageTitle{font-size : 16px; margin-bottom : 15px;}";

GM_addStyle(replyCss);

var $ = unsafeWindow.$;
var Tds = []; 
var thisPageTitle = document.getElementById("wd1").value + "吧";

function rand(min,max){return parseInt(Math.random()*(max-min)+min);};

var timernid,timerid,timersid,button;
var ms = 0;				
var state = 0;				
var ks,km,kms;
var inputElement,keyc;
var testm=0;

function sc3(t){
if (t<10){kms="00"+t}
else if (t<100){kms="0"+t}
else{kms=t}
return kms;
}

function startstop() {
if (state == 0) {			
state = 1;				
then = new Date();		
then.setTime(then.getTime() - ms);	
//display();
timersid.innerHTML = "[Stop ]";
timernid.innerHTML = "[0.000]";
}
else{					
state = 0;			
timersid.innerHTML = "[Start]";
now = new Date();		
ms = now.getTime() - then.getTime();	
ks=Math.floor(ms/1000)
km=Math.floor(ks/60)
ks=ks-60*km
if (km==0){
timernid.innerHTML ="[" + ks + "." + sc3(ms%1000) + "]";
unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+ks + "." + sc3(ms%1000)+"]"); 
}else{
timernid.innerHTML =  "[" + km + ":" + ks + "." + sc3(ms%1000) + "]";
unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+km + ":" + ks + "." + sc3(ms%1000)+"]");
}
ms=0;

}
}

function swreset() {
state = 0;			
ms = 0;					
//unsafeWindow.LzlEditor._s_p._se.execCommand("inserthtml", "0.000");
timernid.innerHTML = "[0.000]";
//inputElement.value="[0.000]";
}

function display() {
setTimeout("display();", 50);	
testm = testm + 1
inputElement.value =testm
if (state == 1)  {			
now = new Date();			
ms = now.getTime() - then.getTime();	
ks=Math.floor(ms/1000)
km=Math.floor(ks/60)
ks=ks-60*km
if (km==0){
timernid.innerHTML ="[" + ks + "." + sc3(ms%1000) + "]";
unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+ks + "." + sc3(ms%1000)+"]"); 
}else{
timernid.innerHTML =  "[" + km + ":" + ks + "." + sc3(ms%1000) + "]";
unsafeWindow.rich_postor._editor.execCommand("inserthtml", "["+km + ":" + ks + "." + sc3(ms%1000)+"]");
}
}
}

function scr() {
var m3=new Array(" R"," R'"," R2"," L"," L'"," L2"," U"," U'"," U2"," D"," D'"," D2"," F"," F'"," F2"," B"," B'"," B2");
var I1,
	I2,
	I3,
	sj,
	mii=0;
var daluan="Scramble:";
    I2 = rand(0,17);
    daluan+= m3[I2];
	I1 =rand(0,17);
	while (parseInt(I1 / 3) == parseInt(I2 / 3))
	{
		  I1 = rand(0,17);
	}
      daluan += m3[I1];
      sj = rand(17,20);
    for (;mii<sj;mii++)
	{
    I3 = I2;
    I2 = I1;
	I1 = rand(0,17);
		while (parseInt(I1 / 3) == parseInt(I2 / 3) || parseInt(I1 / 6) == parseInt(I2 / 6) && parseInt(I1 / 3) == parseInt(I3 / 3))
		{
			  I1 = rand(0,17);
		}
   daluan +=  m3[I1];
	}
return daluan;
}


//列表创建函数
function creaseTable(UrlLength) {
	var tablepp = document.createElement("table");
	tablepp.id = "ATTAtablepp";
	var trs = [];
	for (ly = 0; ly <= Math.ceil(UrlLength / 3); ly++) {
		var tr = document.createElement("tr");
		mmd = trs.push(tr);
		tablepp.appendChild(tr);
	}
	for (ls = 0; ls < trs.length * 3; ls++) {
		var td = document.createElement("td");
		td.className = "ATeditFaceTxtTb";
		td.innerHTML = "<input type='text' class='inputInTd' value=''>";
		wq = Tds.push(td);
		trs[Math.floor(ls / 3)].appendChild(td);
	}
	return tablepp
}

function promptMyfriend(el) {
	unsafeWindow.rich_postor._editor.execCommand("inserthtml", scr());

}

function getElementLeft(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}

function getElementTop(element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

function createAttable(ete) {
promptMyfriend()
}

function closeAttable() {
	$(".insertAt").detach();
	$(".rightDiv").detach();
	$(".leftDiv").detach();
	$("#attaDiv").detach();
}

//主编辑器添加scramble
function addAtInEditor() {
		if (!document.getElementById("mtimer")) {
		$("<label>").appendTo($(".tb-editor-toolbar"));
		$("<em>", {
			id : "mtimer",
			html : "[M Timer for Tieba]",
			click : swreset
		}).appendTo($(".tb-editor-toolbar"));
	}
		if (!document.getElementById("mtimern")) {
		$("<label>").appendTo($(".tb-editor-toolbar"));
		$("<em>", {
			id : "mtimern",
			html : "[0.000]",
		}).appendTo($(".tb-editor-toolbar"));
	}
	if (!document.getElementById("mtimers")) {
		$("<label>").appendTo($(".tb-editor-toolbar"));
		$("<em>", {
			id : "mtimers",
			html : "[Start]",
			click : startstop
		}).appendTo($(".tb-editor-toolbar"));
	}
timerid = document.getElementById("mtimer");
timernid = document.getElementById("mtimern");
timersid= document.getElementById("mtimers");

	if (!document.getElementById("atta")) {
		$("<label>").appendTo($(".tb-editor-toolbar"));
		$("<em>", {
			id : "atta",
			html : "Scramble",
			click : createAttable
		}).appendTo($(".tb-editor-toolbar"));
	}
}

//兼容小脸
function smallFaceEnbale() {
	$('#cLinkContent1').css({
		"display" : 'table-cell'
	}); //兼容旧版小脸，打开编辑窗
	$('#cLinkContent').css({
		"display" : 'table-cell'
	}); //兼容新版小脸，打开编辑窗
	$('#menuSwitch').html('>>'); //兼容小脸，打开编辑窗
}

addAtInEditor();


// ==UserScript==
// @name           Emoji Input
// @namespace      http://www.ceilwoo.com
// @description    Quickly input ascii & unicode emoji
// @include        http://twitter.com/*
// @include        http://t.sina.com.cn/*
// @include        http://weibo.com/*
// @include        http://t.qq.com/*
// ==/UserScript==

var twitterCss = "\
#tae-button { display:block; padding:9px 10px; color:#fff; outline:none;}\
#tae-feedback { font-size:8px; position:absolute; bottom:2px; left:4px; color:#666;}\
#tae-button:hover{ text-decoration:none;}\
#ew{ position:absolute; top:32px; width:226px; height:185px; padding:3px; background-color:#fff; border-top:1px #666 solid; border-right:1px #666 solid; border-bottom:1px #666 solid; border-top:1px #666 solid; z-index:1984; -moz-box-shadow: 1px 1px 2px #666; -webkit-box-shadow: 1px 1px 2px #666;}\
.ew-close #ew { display:none;}\
.ew-open #ew { display:block;}\
#ew i { display:block; float:left; text-align:center; padding:2px; width:70px; height:16px; line-height:16px; border-top: 1px solid #DFE6F6; border-left: 1px solid #DFE6F6; font-size:10px; cursor:pointer; font-style:normal; font-family:Tahoma, sans-serif; color:#333;}\
#ew i:hover, #ewc:hover { background-color:#DFE6F6; color:#000; border-color:#666; text-decoration:none;}\
#ewc { position:absolute; bottom:1px; right:1px; padding:1px 2px; border:1px solid #999; font-size:8px;	line-height:8px; color:#999; font-weight:bold; cursor:pointer;}\
#eww { border-right:1px solid #DFE6F6; border-bottom:1px solid #DFE6F6; overflow:hidden;}\
#ebw-twitter { display:block; float:left; height: 21px; position:relative;}\
#ebw-sina { display:block; float:left; height: 14px; position:relative;}\
#ebw-qq { display:block; float:left; height: 15px; position:relative;}\
#ebw-sina #tae-button{ display:block; padding:0 10px; color:#fff; outline:none}\
#ebw-qq #tae-button{ display:block; padding:0 10px; color:#2B4A78; outline:none; line-height:15px;}\
#ebw-sina #ew{ top:20px;}\
#homeBannerTip{display:none !important;}\
";




GM_addStyle(twitterCss);

var emojiData;

var windowUrl = window.location.href;

function taeInit(){
	var eBt = document.createTextNode("^o^");
	var eB = document.createElement("a");
		eB.setAttribute("id","tae-button");
		eB.setAttribute("href","#");
		eB.addEventListener("click", emojiBoxInit, true);
		eB.appendChild(eBt);
	var eBw = document.createElement("span");
		if( clientChecker() == "twitter" ){
			
			eBw.setAttribute("id","ebw-twitter");
			
		}else if ( clientChecker() == "sina" ){
			
			eBw.setAttribute("id","ebw-sina");
			
		}else if ( clientChecker() == "qq" ){
			
			eBw.setAttribute("id","ebw-qq");
			
		}
		eBw.setAttribute("class","");
		eBw.appendChild(eB);

    createEmojiInputButton(eBw);

}

function createEmojiInputButton(obj){
	var clientID = clientChecker();
	var eBw = obj;
	
	if( clientID == "twitter" ){
		//twitter插入按钮
		var tE = document.getElementsByClassName("active-links")[0];
		tE.appendChild(eBw);
		
	}else if ( clientID == "sina" ){
		//sina围脖插入按钮
		var tE = document.getElementById("publisher_faces");
		var tEp = document.getElementsByClassName("postOptionBg")[1];
		tEp.insertBefore(eBw, tE);
		
	}else if ( clientID == "qq" ){
		//扣扣围脖插入按钮
		var tEp = document.getElementsByClassName("insertFun")[0];
		var tE = document.getElementsByClassName("newTopic")[0];
		tEp.insertBefore(eBw, tE);
		
	}else{
		
		alert("Emoji Input encount an error, please disable EmojiInpuit and contact author: ceilwoo@gmail.com")
	}
	
}

//获取不同作用域下的EmojiInput按钮
function getEmojiInputButton(){
	var obj;
	if( clientChecker() == "twitter"  ){
		obj = document.getElementById("ebw-twitter");
	} else if( clientChecker()=="sina" ){
		obj = document.getElementById("ebw-sina");
	} else if( clientChecker()=="qq" ){
		obj = document.getElementById("ebw-qq");
	}
	return obj;
}

//检测twitter||sina||qq
function clientChecker(){
	var clientID;
	if( windowUrl.indexOf("twitter.com")!= -1 ){
		clientID = "twitter";
	} else if( windowUrl.indexOf("sina.com") != -1 || windowUrl.indexOf("weibo.com") != -1 ){
		clientID = "sina";
	} else if( windowUrl.indexOf("qq.com") != -1 ){
		clientID = "qq";
	}
	return clientID;
}

//初始化表情列表的box
function emojiBoxInit(){
	var ebw = getEmojiInputButton();

	if (!document.getElementById("ew")){
		emojiInit();
		
		var ew = document.createElement("div");
			ew.setAttribute("id","ew");
			ebw.appendChild(ew);
			ew.innerHTML = emojiData;
			
			var eww = document.getElementById("eww");
			var ewi = eww.getElementsByTagName("i");
			for(var i = 0; i < ewi.length; i++ ){
				ewi[i].addEventListener("click", insertEmoji, true);
			}

			
		var ewc = document.getElementById("ewc");
			ewc.addEventListener("click", closeTaeWindow, true);
			
	}else if(ebw.getAttribute("class")=="ew-close"){
		ebw.setAttribute("class","ew-open");
		
	}else if(ebw.getAttribute("class")=="ew-open"){
		ebw.setAttribute("class","ew-close");
	}else{
		ebw.setAttribute("class","ew-close");
	}
	
}

//关闭EmojInput窗口
function closeTaeWindow(){
	var ebw = getEmojiInputButton();
	ebw.setAttribute("class","ew-close");
}

//在Editor插入表情
function insertEmoji(){
	
	if( clientChecker() == "twitter"  ){
		//for twitter
		var twInput = document.getElementsByClassName("twitter-anywhere-tweet-box-editor");
		for(var i=0; i< twInput.length; i++){
			var tmp = twInput[i].value;
			twInput[i].value = tmp + this.getAttribute("value");
		}
	} else if( clientChecker()=="sina" ){
		//for sina
		var sinaInput = document.getElementById("publish_editor");
		sinaInput.value = sinaInput.value + this.getAttribute("value");
		
	} else if( clientChecker()=="qq" ){
		//for qq
		var sinaInput = document.getElementById("msgTxt");
		sinaInput.value = sinaInput.value + this.getAttribute("value");
		
	}

	
}

//初始化表情列表
function emojiInit(){
	emoji = [
		"(￣口￣)!!",
		"╮(￣▽￣)╭",
		"╮(￣﹏￣)╭",
		"╮(╯▽╰)╭",
		"(｀□′)",
		"#(┬＿┬)",
		"〒▽〒",
		"d(￣︶￣)b",
		"o(^-^)o",
		"(╭￣3￣)╭♡",
		"~\(≧▽≦)/~",
		"(￣ˇ￣)",
		"(*￣▽￣)y",
		"┌(｀▽′)╭",
		"m(_ _)m",
		"ヽ(^○^)ノ",
		"o(｀ω´*)o",
		"Ｏ(≧∇≦)Ｏ",
		"(⊙_⊙)",
		"（>□<）",
		"o(≥ω≤)o",
		"（<ゝω・）~☆",
		"(~￣▽￣)~",
		"<(￣︶￣)>",
		];
	var emojiHtml="";
	for(var i=0; i<emoji.length;i++){
		emojiHtml = emojiHtml + "<i value='"+ emoji[i] + "'>" + emoji[i] + "</i>";
	}
	emojiData = "<div id='eww'>" + emojiHtml + "</div>" + "<a id='ewc' title='Close'>X</a><a id='tae-feedback' href='http://www.ceilwoo.com' target='_blank'>Emoji Input v1.01</a>";
}

//启动EmojiInput
window.addEventListener("load", taeInit, true);


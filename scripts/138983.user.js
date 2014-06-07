// Copyleft (c) 2013,网络孤独行客
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name        Auto-reply for Tieba
// @namespace   http://www.winbaike.com
// @description An auto-reply userscript for Baidu tieba.
// @include     http://tieba.baidu.com/p/*
// @updateURL	https://userscripts.org/scripts/source/138983.meta.js
// @downloadURL	https://userscripts.org/scripts/source/138983.user.js
// @grand unsafeWindow
// @grand GM_getValue 
// @grand GM_setValue
// @grand GM_addStyle
// @version     0.09 Beta
// ==/UserScript==

(function(){
	//CSS
	var ar_css='#reply_sel{width:530px}\
		#qrBtn{float:right;margin-right:35px}\
		#reTxt{width:430px}\
		#rate{width:32px}\
		#stBtn{color:red;display:none;float:right;margin-right:35px}\
		#reBtn{float:right;margin-right:35px}';
	GM_addStyle(ar_css);	
	
	//GUI
	var insert=document.querySelector(".new_tiezi_tip");
	var qrDiv=document.createElement("div");
	var newDiv=document.createElement("div");

	qrDiv.innerHTML='<div><b>快捷回复</b><select id="reply_sel" name="reply_sele"></select>\
		<button id="qrBtn">快捷回复</button></div>';
	newDiv.innerHTML='<b>自动回复</b><input id="reTxt" type="text">\
		频率：<input id="rate" type="text">秒\
		<button id="stBtn">停止回复</button>\
		<button id="reBtn">自动回复</button>';
					
	insert.insertBefore(qrDiv,insert.firstChild);
	insert.insertBefore(newDiv,insert.firstChild);

	//addEventListener
	var the_reBtn=document.querySelector("#reBtn");
	the_reBtn.addEventListener("click",start,false);
	var qr_btn=document.querySelector("#qrBtn");
	qr_btn.addEventListener("click",qr_post,false);
	var the_stBtn=document.querySelector("#stBtn");
	the_stBtn.addEventListener("click",stop,false);
	var replay_dom=document.querySelector("#reply_sel");
	replay_dom.addEventListener("change",qr_post,false);

	//缺省值
	GM_getValue("gmSwitch",0); //默认关闭
	var the_reTxt=document.querySelector("#reTxt");
	the_reTxt.setAttribute("value",GM_getValue("replayTxt","人工置顶"));
	var the_rate=document.querySelector("#rate");
	the_rate.setAttribute("value",GM_getValue("timeOut",60000)/1000);

	var quickRe =[
		"顶",
		"挽",
		"Mark",
		"火前留名",
		"笑而不语",
		"瞎了我的狗眼",
		"神马都是浮云",
		"你知道得太多了",
		"虽不明，但觉厉",
		"楼主好人，xxx@xxx.com"
	]
	for(var i=0;i<quickRe.length;i++){
		var reply_opt = new Option(quickRe[i], i);
		replay_dom.options[replay_dom.options.length] = reply_opt;			
	}
	
	//Post
	function post(post_Data){
		var the_Content=unsafeWindow.rich_postor._getData();
		the_Content.content=post_Data;
		unsafeWindow.PostHandler.post(unsafeWindow.rich_postor._option.url,the_Content,function(to_Post){unsafeWindow.rich_postor.showAddResult(to_Post)},function(to_Post){});	
	}
	//Start
	function start(){
		the_reBtn.style.display="none";
		the_stBtn.style.display="block";
		GM_setValue("gmSwitch",1);		
		var post_vlue=the_reTxt.value;
		GM_setValue("replayTxt",post_vlue);
		var time_Vlue=the_rate.value*1000;
		GM_setValue("timeOut",time_Vlue);
		post(post_vlue);
	}
	//Stop
	function stop(){
		GM_setValue("gmSwitch",0)
		the_reBtn.style.display="block";
		the_stBtn.style.display="none";
		window.location.reload(); 
	}
	//Quick Post
	function qr_post(){
		var quick_Vlue=replay_dom.options[replay_dom.selectedIndex].text;
		post(quick_Vlue);
	}

	if(GM_getValue("gmSwitch")){
		the_reBtn.style.display="none";
		the_stBtn.style.display="block";
		window.setTimeout(start,GM_getValue("timeOut",60000)); 	//缺省60s
	}
})();
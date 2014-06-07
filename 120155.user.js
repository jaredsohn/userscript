// ==UserScript==
// @name       jc_translator (using Google)
// @namespace  http://localhost/jc/
// @include    http://*/*
// @include    http://*
// @include    https://*
// @exclude    https://apps.facebook.com/*
// @exclude        http://*/cgi-bin/openwebmail/*
// @exclude        http://www.blogger.com/blogger.g*
// @exclude    https://docs.google.com/*
// @exclude    https://drive.google.com/*
// @exclude    http://*.popcap.com/html5/*
// @exclude    http://*.gov.tw/*
// @downloadURL    https://userscripts.org/scripts/source/120155.user.js 
// @updateURL    https://userscripts.org/scripts/source/120155.meta.js
// @version        1.8.1
// @history        1.7.2: 隱藏時，便從 body 拿掉 div...
// @history        1.7: 修正 Google Search 文字需編碼(之前正常，可能是 Firefox 改版導致)
// @history        1.6: 修正成有選取才新增按鈕，沒有選取動作則不新增按鈕
// @history        1.5: 新增搜尋功能
// @history        1.4: 介面改善
// @history        1.2: 原始版本
// @description    划线翻译 , modified by jc (http://userscripts.org/scripts/show/120155)
// @description    划线翻译 , 原作者 testeven (http://userscripts.org/scripts/show/103104)
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// ==/UserScript==
GM_addStyle(".button1 { position:absolute;display:none;z-index:1010;width:70px;height:30px; }");
var jcTransDivCreateFlag = false;
function jc_create_trans_div() {
	if (!jcTransDivCreateFlag) {
		//create the hidden translation box and set its style
		window.div=document.createElement("div");
		var divStyle="position:absolute;display:none;width:auto;z-index:100000;border-left:solid 0.5px #0000AA;border-top:solid 1px #0000AA;border-right:solid 2.5px #0000AA;border-bottom:solid 3px #0000AA;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 13pt;color: blue;";
		window.div.setAttribute("style",divStyle);
		//document.body.appendChild(window.div);
		window.button1=document.createElement("input");
		//var buttonStyle="position:absolute;display:none;z-index:1010;width:100px;height:30px;";
		//window.button1.setAttribute("style",buttonStyle);
		window.button1.value="翻譯";
		window.button1.type="button";
		window.button1.setAttribute('CLASS' , "button1");
		//document.body.appendChild(window.button1);
		window.button2=document.createElement("input");
		window.button2.value="隱藏";
		window.button2.type="button";
		window.button2.setAttribute('CLASS' , "button1");
		//document.body.appendChild(window.button2);
		window.button3=document.createElement("input");
		window.button3.value="搜尋";
		window.button3.type="button";
		window.button3.setAttribute('CLASS' , "button1");
		//document.body.appendChild(window.button3);
		
		window.button1.addEventListener("click",translation.button1click,false);
		window.button2.addEventListener("click",translation.button2click,false);
		window.button3.addEventListener("click",translation.button3click,false);
		translation.log("addEventListener button click!");
		
		jcTransDivCreateFlag = true;
	}
}
var translation = {};
var target_lang = "zh-CN";
//var target_lang = "zh-TW";
var trans_step = 0; // 0:未運作 ; 1:詢問 ; 2:翻譯中 ; 3:出現翻譯結果
//firebug log just user when debug
translation.log = function(msg)
{
	console.log("translate log:"+msg);
}
//the mouseup event get the highlighted text and pass the text to http://translate.google.cn
translation.mouseUp=function (event)
{
	window.event=event;
	//if(window.event.target==window.div)	return ;
	//window.div.style.display="none";
	translation.text=window.getSelection();
	
	if (translation.text=="") {
		jcHideAllButtons();
		trans_step = 0;
		return;
	} else {
		jc_create_trans_div();
	}
	
	translation.log(translation.text);
	
	translation.text = "" + translation.text;
	translation.text = translation.text.replace(/\n/g, "%0A");
	
	if ( ( 0 == trans_step ) || ( 3 == trans_step ) ) {
		// Show All Buttons
		trans_step = 1;
		window.button1.style.left=(window.event.clientX+window.scrollX+10).toString()+"px";
		window.button1.style.top=(window.event.clientY+window.scrollY+25).toString()+"px";
		window.button1.style.display="inline";
		window.button2.style.left=(window.event.clientX+window.scrollX+80).toString()+"px";
		window.button2.style.top=(window.event.clientY+window.scrollY+25).toString()+"px";
		window.button2.style.display="inline";
		window.button3.style.left=(window.event.clientX+window.scrollX+150).toString()+"px";
		window.button3.style.top=(window.event.clientY+window.scrollY+25).toString()+"px";
		window.button3.style.display="inline";
		
		document.body.appendChild(window.div);
		document.body.appendChild(window.button1);
		document.body.appendChild(window.button2);
		document.body.appendChild(window.button3);
	}
	
}
    
function jcHideAllButtons() {
	// 隱藏
	if (jcTransDivCreateFlag) {
		window.div.style.display="none";
		window.button1.style.display="none";
		window.button2.style.display="none";
		window.button3.style.display="none";
		
		document.body.removeChild(window.div);
		document.body.removeChild(window.button1);
		document.body.removeChild(window.button2);
		document.body.removeChild(window.button3);
	}
}
translation.button1click=function(event) {
	// 翻譯中
	trans_step=2;
	
	jcHideAllButtons();
	
	window.div.innerHTML="翻譯中...";
	window.div.style.left=(Math.min(300 , window.event.clientX+window.scrollX+10)).toString()+"px";
	window.div.style.top=(window.event.clientY+window.scrollY+25).toString()+"px";
	window.div.style.display="inline";
	document.body.appendChild(window.div);
	
	GM_xmlhttpRequest({
		url:"http://translate.google.com/translate_a/t?client=t&hl=" + target_lang + "&sl=auto&tl=" + target_lang + "&text="+translation.text,
		method:"GET",
		overrideMimeType:'text/javascript;charset=UTF-8',
		onload:translation.anlysisRequest,
		onerror:translation.onRequestError
		});
}
translation.button2click=function(event) {
	// 取消
	jcHideAllButtons();
	window.div.style.display="none";
	trans_step=0;
	
}
translation.button3click=function(event) {
	// Google Search
	var aurl = "http://www.google.com.tw/search?q=" + encodeURIComponent(translation.text) + "&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:zh-TW:official";
	GM_openInTab( aurl )
	jcHideAllButtons();
	window.div.style.display="none";
	trans_step=0;
	
}
					
//get the return JOSN of translat result from http://translate.google.cn
translation.anlysisRequest=function(result) {
	if(result.status == 200)
	{
		translation.log(result.responseText);
		//var oresult = eval(result.responseText).toString().split(",");
		//translation.log(oresult);
		
		var myarr = eval(result.responseText);
		jresult = '';
		for(var key in myarr[0]){
		    var para = myarr[0][key].toString().split(",");
		    jresult += para[0] + "<br />\n\r";
		}
		
		translation.translateResult(jresult);
	}
}
//when GM_xmlhttpRequest have and error show "翻译错误!"
translation.onRequestError=function ()
{
	translation.translateResult("sorry，连接服务器出错!");
}						
//if translation exists, display the translation box with the translation
translation.translateResult=function(result){
	if (result!="")
	{
		//window.div.innerHTML=translation.text+": "+result;
		window.div.innerHTML=result;
		//you can customize the horizontal position of the translation box by changing "10" to other numbers
		window.div.style.left=(Math.min(300 , window.event.clientX+window.scrollX+10)).toString()+"px";
		//you can customize the vertical position of the translation box by changing "10" to other numbers
		window.div.style.top=(window.event.clientY+window.scrollY+25).toString()+"px";
		window.div.style.display="inline";
		
		trans_step=3;
	}
}
//when the page are loaded, add a mouseup event to the page
window.addEventListener("mouseup",translation.mouseUp,false);
//translation.log("addEventListener mouseUp!");

// ==UserScript==
// @name           google 划线翻译
// @namespace      testeven
// @description    划线翻译
// @include        *
// ==/UserScript==

var translation = {};

//create the hidden translation box and set its style
translation.resultdiv = document.createElement("div");
var divStyle="position:absolute;display:none;z-index:1000;border-left:solid 0.5px #0000AA;border-top:solid 1px #0000AA;border-right:solid 2.5px #0000AA;border-bottom:solid 2px #0000AA;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: #000000;";
translation.resultdiv.setAttribute("style",divStyle);
document.body.appendChild(translation.resultdiv);

translation.Actdiv = document.createElement("div");
divStyle="position:absolute;display:none;z-index:1000;height:24px;width:24px;";
translation.Actdiv.setAttribute("style",divStyle);
//translation.Actdiv.style.backgroundImage = "url(http://www.google.com/images/icons/translate_onebox-35.gif)"
//translation.Actdiv.style.backgroundImage.width = "16px";
//translation.Actdiv.style.backgroundImage.height = "16px";
translation.Actdiv.id = "translaAct";
translation.Actdiv.innerHTML = "<img src='http://www.google.com/images/icons/translate_onebox-35.gif'id='translaimg'></img>";
document.body.appendChild(translation.Actdiv);
document.getElementById("translaimg").style.width = "24px";
document.getElementById("translaimg").style.height = "24px";

//the mouseup event get the highlighted text and pass the text to http://translate.google.cn
translation.mouseUp=function (event)
{
	window.event=event;
	if(window.event.target==translation.resultdiv)
	return ;
	if(window.event.target==translation.Actdiv)
	return ;
	translation.resultdiv.style.display="none";
	translation.Actdiv.style.display="none";
	
	if(window.getSelection()=="") return;
	translation.text=window.getSelection();
	
	GM_xmlhttpRequest({
		url:"http://translate.google.cn/translate_a/t?client=t&hl=zh-CN&sl=auto&tl=zh-CN&text="+translation.text,
		method:"GET",
		overrideMimeType:'text/javascript;charset=UTF-8',
		onload:translation.anlysisRequest,
		onerror:translation.onRequestError
		});
		
	translation.Actdiv.style.left=(window.event.clientX+window.scrollX+10).toString()+"px";
	translation.Actdiv.style.top=(window.event.clientY+window.scrollY+10).toString()+"px";
	translation.Actdiv.style.display="inline";
};

translation.start = function ()
{
	translation.Actdiv.style.display="none";
	GM_log(translation.text);
	translation.resultdiv.style.display="inline";
};
					
//get the return JOSN of translat result from http://translate.google.cn
translation.anlysisRequest=function(result) {
	if(result.status == 200)
	{
		var oresult = eval(result.responseText).toString().split(",");
		translation.translateResult(oresult[0]);
	}
};

//when GM_xmlhttpRequest have and error show "翻译错误!"
translation.onRequestError=function ()
{
	translation.translateResult("sorry，连接服务器出错!");
};		
			
//if translation exists, display the translation box with the translation
translation.translateResult=function(result){
	if (result!="")
	{
		translation.resultdiv.innerHTML= result;
		//you can customize the horizontal position of the translation box by changing "10" to other numbers
		translation.resultdiv.style.left=(window.event.clientX+window.scrollX+10).toString()+"px";
		//you can customize the vertical position of the translation box by changing "10" to other numbers
		translation.resultdiv.style.top=(window.event.clientY+window.scrollY+10).toString()+"px";
	}
	else
	{
		translation.resultdiv.innerHTML= "服务器返回空值";
		//you can customize the horizontal position of the translation box by changing "10" to other numbers
		translation.resultdiv.style.left=(window.event.clientX+window.scrollX+10).toString()+"px";
		//you can customize the vertical position of the translation box by changing "10" to other numbers
		translation.resultdiv.style.top=(window.event.clientY+window.scrollY+10).toString()+"px";
	}
};

//when the page are loaded, add a mouseup event to the page
window.addEventListener("mouseup",translation.mouseUp,false);
document.getElementById("translaAct").addEventListener("mouseover",translation.start,false);
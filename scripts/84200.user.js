// ==UserScript==
// @name        Super Google Dictionary 2
// @namespace   LongLiveKimJongIl
// @version     2.2
// @description	Make Google Dictionary be more simple,more quick and more humane.
//
// @include     http://www.google.*/dictionary*
// @include     https://www.google.*/dictionary*
// ==/UserScript==

// update log
// 1.0.1
// Now the script can store the result which was queried.
// 1.0.2
// Use Trim to clear some meaningless space.
// 1.0.3
// Fix a bug that the Trim function are not available in Firefox, actually I think that's Firefox's bug.
// 1.0.4
// Fix a serious bug that when the current search result has been loaded but the last one hasn't, the last result will cover current page.
// 1.0.5
// Support Https Google Dictionary now.
// 2.0.0
// More Advancement
// 2.1
// AutoJump is removed and Controls are invisible by default.
// 2.2
// Replace keyup Events with input Events

/*可修改的参数，设置默认值，在实际使用时可以被Cookie和用户界面设置覆盖*/
var wait=500;			//如果延时发送，则延时多少毫秒？
var isDelay=true;		//是否延时发生请求？
var display=false;		//是否确实要显示设置控件？
/*注意：仅在脚本内部才可以设置默认值，对设置控件的设置有效时间完全取决于Cookie的维持时间*/

if(document.getElementsByClassName("dct-srch-otr").length)
{
	/*读取Cookie*/
	var items=document.cookie.split(";");
	for(var i=0;i<items.length;++i)
	{
		var item=items[i].split("=");
		if(item[0].match(/\s*bachue\s*/))
		{
			var cookies=item[1].split("/");
			isDelay=parseInt(cookies[0]);
			wait=cookies[1];
		}
	}

	/*DOM操作，显示按钮*/
	var span=document.createElement("span");
	span.style.fontSize="0.8em";
	var label1=document.createElement("label");
	label1.htmlFor="bachue_isDelay";
	label1.style.paddingLeft="10px";
	label1.appendChild(document.createTextNode("启用延迟发送:\u00A0"));
	label1.title="如果启用延迟发送，当按一个键后，总会等待一段时间，如果在这段时间没有再按下任何键，将搜索框内容发送。如果不启用，按下键后将立即发送。不启用延迟发送可能会获得更好的用户体验，但是对服务器和浏览器都会造成负担，服务器可能会自我保护，如果在网速不快的情况下，可能适得其反。";
	span.appendChild(label1);
	var delayInput=document.createElement("input");
	delayInput.type="checkbox";
	delayInput.id="bachue_isDelay";
	delayInput.checked=isDelay;
	span.appendChild(delayInput);
	var label2=document.createElement("label");
	label2.htmlFor="bachue_wait";
	label2.appendChild(document.createTextNode("\u00A0\u00A0延迟时间:\u00A0"));
	label2.title="在启用延迟发送的情况下，每当按一个键，等待的时间长度。如果在这个时间长度内没有其他键按下，请求将被发送。";
	span.appendChild(label2);
	var waitInput=document.createElement("input");
	waitInput.style.width="4em";
	waitInput.type="text";
	waitInput.disabled=!isDelay;
	waitInput.value=wait;
	span.appendChild(waitInput);
	var label3=document.createElement("label");
	label3.htmlFor="bachue_wait";
	label3.appendChild(document.createTextNode("\u00A0毫秒"));
	label3.title="单位是毫秒，即千分之一秒。";
	span.appendChild(label3);
	var submitBtn=document.querySelector("input[type='submit']");
	if(display==true) submitBtn.parentNode.appendChild(span);
	submitBtn.parentNode.removeChild(submitBtn);
	
	/*一些初始化参数*/
	var timeout;
	var cache="";
	var error=0;
	var textFocus=true;
	
	/*记录常用DOM节点*/
	var textInput=document.getElementsByName("q")[0];
	var content=document.getElementsByClassName("dct-srch-otr")[0];
	var langpairSelect=document.getElementsByName("langpair")[0];
	
	/*函数*/
	function trim(text)
	{
		return text.replace(/(^\s*)|(\s*$)/g, "");
	}
	function err()
	{
		cache="";
		if(++error<=10)
		{
			ar();
			textInput.style.color="#800";
		}
	}
	function q()
	{
		/*如果在新iframe里没有任何内容或没有找到搜索框和解释框，可能iframe出错，
		将其删除并再次调用ar函数（不一定再次载入出错的iframe），连续出错10次即不再尝试*/
		if(!this.contentDocument||!this.contentDocument.getElementsByName("q")[0]||
		    !this.contentDocument.getElementsByClassName("dct-srch-otr")[0])
			{
				this.parentNode.removeChild(this);
				err();
				return;
			}
		
		/*如果载入页已经不是当前用户需求，清除cache，并缓存iframe内容*/
		if(trim(this.contentDocument.getElementsByName("q")[0].value)!=trim(textInput.value))
		{
			cache="";
			return;
		}
		
		/*如果没有出错，应用iframe内容*/
		textInput.style.color="";
		error=0;
		content.innerHTML=this.contentDocument.getElementsByClassName("dct-srch-otr")[0].innerHTML;
		document.getElementsByClassName("t bt")[0].innerHTML=this.contentDocument.getElementsByClassName("t bt")[0].innerHTML;
	}
	function ar()
	{
		var text=trim(textInput.value);
		
		/*cache:记录上一次搜索框内容，如果在按下键后搜索框内容并没有改变，不做任何事*/
		if(cache==text) return;
		else cache=text;
		
		/*先尝试搜索现有的iframe缓存，看是否已存在，如果已存在，不再重新请求*/
		var langpair=langpairSelect.value;
		var hl=document.getElementsByName("hl")[0].value;
		var url='/dictionary?langpair='+langpair+'&q='+text+'&hl='+hl;
		var iframe=document.querySelector("iframe[src='"+url+"']");
		
		/*缓存中不存在指定的iframe*/
		if(!iframe)
		{
			iframe=document.createElement('iframe');
			iframe.src=url;
			iframe.style.display="none";
			document.body.appendChild(iframe);
			iframe.addEventListener('load',q,false);
			iframe.addEventListener('error',err,false);
		}
		/*缓存中出现指定的iframe*/
		else q.call(iframe);
	}
	function dl()
	{
		clearTimeout(timeout);
		timeout=setTimeout(ar,waitInput.value||wait);
	}
	
	/*对控件绑定事件*/
	delayInput.addEventListener("click",function()
	{
		waitInput.disabled=!this.checked;
	},false);
	textInput.addEventListener("input",function(){
		delayInput.checked?dl():ar();
	},false);
	langpairSelect.addEventListener("change",function(){
		cache="";
		ar();
	},false);
	
	/*在焦点并非出于搜索框时，按回车键将聚焦搜索框*/
	textInput.addEventListener("focus",function(){textFocus=true;},false);
	textInput.addEventListener("blur",function(){textFocus=false;},false);
	document.addEventListener("keypress",function(e)
	{
		if((e.charCode==13||e.charCode==10)&&!textFocus)
		{
			textInput.focus();
			e.stopPropagation();
			e.preventDefault();
		}
	},false);
	
	/*Cookie设置函数*/
	function setCookie()
	{
		var currDelay=delayInput.checked;
		var currWait=waitInput.value;
		document.cookie="bachue="+(currDelay?1:0)+"/"+currWait+";expired="+Number.MAX_VALUE+";";
	}
	delayInput.addEventListener("click",setCookie,false);
	waitInput.addEventListener("input",setCookie,false);
	
	document.getElementById("cnt").style.minWidth="960px";
}

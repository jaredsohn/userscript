// ==UserScript==
// @name        Wild West Town Link Helper
// @namespace   http://userscripts.org/users/527299
// @include     http://wwt-secure.clipwiregames.com/wildwest/pKongregate/index.php?*
// @include     http://www.kongregate.com/games/ClipwireGames/wild-west-town*
// @version     1
// ==/UserScript==

//log functions
function logText(text){GM_log(text);}
function log(){logText(Array.map(arguments,formatLogObject).join(", "),arguments.callee.caller?arguments.callee.caller.name?arguments.callee.caller.name:"":"");}
function formatLogObject(obj){return obj==null?"<null>":typeof(obj)=="object" && typeof(obj.toSource)=="function"?obj.toSource():typeof(obj)=="function"?obj.name?"<"+obj.name+">":obj.toSource():obj;}

//DOM utilities
function $(selector,doc){return (doc||document).querySelector(selector);}
function $$(selector,doc){return (doc||document).querySelectorAll(selector);}

if (location.hostname.indexOf(".kongregate.")!=-1) kongregateInit();
else if (location.hostname.indexOf(".clipwiregames.")!=-1) clipwireInit();

/********************************************************************/
/*                         Kongregate functions                     */
/********************************************************************/
function kongregateInit()
{
	unsafeWindow.addEventListener("message",kongregateReceiveMessage,false);
	unsafeWindow.document.addEventListener("DOMNodeInserted",kongregateNodeInserted,false);
}

var _kongregatePuffer=[];
function kongregateSendMessage(type,value)
{
	if (!_clipwareReady) _kongregatePuffer.push({type:type,value:value});
	else
	{
		//log(type,unsafeWindow.frames.length);
		for(var num1=0;num1<unsafeWindow.frames.length;num1++) 
		{
			//log(num1);
			unsafeWindow.frames[num1].postMessage({type:type,value:value},"http://wwt-secure.clipwiregames.com/wildwest/pKongregate/index.php");
		}
	}
}	

var _clipwareReady=false;
function kongregateReceiveMessage(e)
{
	//log(e.data);
	switch(e.data.type)
	{
		case "bye":
			//log("frame is reloading ...");
			_clipwareReady=false;
			break;
		case "hello":
			//log("frame is ready ...");
			_clipwareReady=true;
			for(var num1=0;num1<_kongregatePuffer.length;num1++) kongregateSendMessage(_kongregatePuffer[num1].type,_kongregatePuffer[num1].value);
			_kongregatePuffer=[];
			break;
		case "loaded":
			var arr2=$$(".chat_message_window a[href*='"+e.data.value+"']");
			for(var num2=0;num2<arr2.length;num2++) 
			{
				//log(arr2[num2]);
				arr2[num2].style.color="";
				arr2[num2].style.textDecoration = 'line-through';
			}
			break;
	}
}

function kongregateNodeInserted(e)
{
	//log(e.target.id,e.target.className,e.target.parentNode.id,e.target.parentNode.className,e.target.parentNode.parentNode.className);
	if (e.target.parentNode.parentNode.className=="chat_message_window")
	{
		var arr1=e.target.getElementsByTagName("a"),arr2=[];
		for(var num1=0;num1<arr1.length;num1++)
		{
			var el=arr1[num1];
			var url=getLink(el.href);
			//log(url);
			if (url)
			{
				el.addEventListener("click",linkClick,false);
				el.style.color="green";
				if (arr2.indexOf(url[0])==-1) arr2.push(url[0]);
			}
		}
		if (unsafeWindow.loadAllLinks && arr2.length) kongregateSendMessage("links",arr2);
	}
	else if (e.target.parentNode.id=="chat_container")
	{
		if (!$("#autoLoadLinks"))
		{
			var el1=parseHTML("<div style='padding-top:5px'><label><input type='checkbox' id='autoLoadLinks' onchange='loadAllLinks=this.checked' /> Auto load all links</label> (Watch out for parallel requests!)</div>");
			var el2=$(".chat_controls");
			el2.parentNode.insertBefore(el1,el2.nextSibling);
		}
	}
}

function linkClick(e)
{
	if (!e.ctrlKey && !e.altKey) 
	{
		e.preventDefault();
		e.target.style.color="orange";
		kongregateSendMessage("links",getLink(e.target.href));
	}
}

/********************************************************************/
/*                         Clipwire functions                       */
/********************************************************************/
function clipwireInit()
{
	unsafeWindow.addEventListener("message",clipwireReceiveMessage,false);
	unsafeWindow.addEventListener("unload",function(e){clipwireSendMessage("bye");},false);
	clipwireSendMessage("hello");
}

function clipwireSendMessage(type,value)
{
	unsafeWindow.parent.postMessage({type:type,value:value},"*");
}

function clipwireReceiveMessage(e)
{
	//log(e.data);
	switch(e.data.type)
	{
		case "links":
			if (e.data.value.length) loadLinksAsync(e.data.value);
			break;
	}
}

var _baseUrl;
function loadLinksAsync(arr)
{	
	var text=arr.shift();
	//log("Loading link "+text);
	var url=(_baseUrl||(_baseUrl=document.location.href.replace(/kv_link=[a-z0-9&_=]+/gmi,"")))+"&"+text;
	GM_xmlhttpRequest({
		context:arr,
		method:"GET",
		url:url,
		onerror:loadLinksAsyncCallback,
		onload:loadLinksAsyncCallback,
		ontimeout:loadLinksAsyncCallback});
}

function loadLinksAsyncCallback(resp)
{
	var arr=resp.context;
	if (arr.length) setTimeout(loadLinksAsync,0,arr);
	if (resp.status==200)
	{
		var result=displayText(resp.responseText);
		clipwireSendMessage("loaded",getLink(resp.finalUrl)[0]);
	}
}

function displayText(text)
{
	//log(text);
	var event=/(<div[^>]*?id="eventDiv"[\s\S]*?)<div[^>]*?id="buyBox"/gmi.exec(text);
	//log(event);
	if (event!=null)
	{
		removeElement("#eventDiv");
		var el1=parseHTML(event[0]);
		var el2=$("#top");
		//log(el2);
		el2.parentNode.insertBefore(el1,el2.nextSibling);
	}
	var result=/<div[^>]*?id="kongMessage">([\s\S]*?)<div>[\s\S]*?<\/div>[\s\S]*?<\/div>/gmi.exec(text);
	//log(result);
	if (result!=null)
	{
		removeElement("#kongMessage");
		var el1=parseHTML(result[0]);
		var el2=$("#top");
		//log(el2);
		el2.parentNode.insertBefore(el1,el2.nextSibling);
	}
}

/********************************************************************/
/*                         Generic functions                        */
/********************************************************************/
function getLink(url)
{
	return /kv_link=[a-z0-9&_=]+/i.exec(url);
}

var _parser=document.createElement("DIV");
function parseHTML(html)
{
	_parser.innerHTML=html;
	return removeElement(_parser.firstChild);
}

function removeElement(el)
{
	if (typeof(el)=="string") el=$(el);
	if (el && el.parentNode) el.parentNode.removeChild(el);
	return el;
}

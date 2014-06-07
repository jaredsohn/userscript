// ==UserScript==
// @name           Javascript Library 1
// @namespace      http://userscripts.org/users/28612
// @version        0.05.01
// @description    This is a javascript library, it hasn't to be installed but imported from other scripts with the meta tag require
// @resource       Library1Resources http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1.xml
// @resource       Library1Resources_de http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0//Library1_de.xml
// @resource       Library1Resources_es http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1_es.xml
// @resource       Library1Resources_fr http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1_fr.xml
// @resource       Library1Resources_it http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1_it.xml
// ==/UserScript==

/*
var ScriptInfos={
	name: "Library 1",
	version: "0.05.00",
	language: "en",
	idPrefix: "jl"};
*/

//Extending some native objects
if (Array.prototype.clear==null) Array.prototype.clear=function(){this.splice(0,this.length);}
if (Array.prototype.contains==null) Array.prototype.contains=function(obj){return this.indexOf(obj)!=-1;}
if (Array.prototype.merge==null) Array.prototype.merge=function(array){for(var num1=0;num1<array.length;num1++) this.push(array[num1]);}
if (Array.prototype.remove==null) Array.prototype.remove=function(){for(var num1=0;num1<arguments.length;num1++) {var num2=this.indexOf(arguments[num1]); if (num2!=-1) this.splice(num2,1);} return this.length;}
if (Array.prototype.replace==null) Array.prototype.replace=function(array){for(var num1=0;num1<array.length;num1++) if (array[num1]!=null) this[num1]=array[num1]; return this;}
if (Array.prototype.toHTMLList==null) Array.prototype.toHTMLList=function(listTag,className){return "<{0}{1}><li>{2}</li></{0}>".format(listTag?listTag:"ul",className?" class=\"{0}\"".format(className):"",this.join("</li><li>"));}
if (String.prototype.beginsWith==null) String.prototype.beginsWith=function(text){return this.indexOf(text)==0;}
if (String.prototype.endsWith==null) String.prototype.endsWith=function(text){return this.lastIndexOf(text)==this.length-text.length;}
if (String.prototype.format==null) String.prototype.format=function(){var a=arguments; if (a.length==1 && typeof(a[0])=="object" && a[0].constructor==Array) a=a[0]; var t=this; for(var num1=0;num1<a.length;num1++) if (a[num1]!=null) t=t.replace(new RegExp("\\{"+num1+"\\}","gm"),a[num1]); return t;}
if (String.prototype.trim==null) String.prototype.trim=function(){return this.replace(/^\s+|\s+$/gm,"");}
//if (HTMLElement.prototype.addClasses==null) HTMLElement.prototype.addClasses=function(){var a=this.className.split(" "); for(var num1=0;num1<arguments.length;num1++) a.push(arguments[num1]); this.className=a.join(" ");}
//if (HTMLElement.prototype.containsClasses==null) HTMLElement.prototype.containsClasses=function(){var a=this.className.split(" "); for (var num1=0;num1<arguments.length;num1++) if (a.indexOf(arguments[num1])==-1) return false; return true;}
//if (HTMLElement.prototype.removeClasses==null) HTMLElement.prototype.removeClasses=function(){var a=this.className.split(" "); for(var num1=0;num1<arguments.length;num1++) a.remove(arguments[num1]); this.className=a.join(" ");}
//if (HTMLElement.prototype.xorClasses==null) HTMLElement.prototype.xorClasses=function(){var a=this.className.split(" "); for(var num1=0;num1<arguments.length;num1++) {var t=arguments[num1]; var num2=a.indexOf(t); if (num2!=-1) a.splice(num2,1); else a.push(t);} this.className=a.join(" ");}

//Quick-functions
function $as(style){document.getElementsByTagName("head")[0].appendChild($ce("style","\n"+style+"\n",{type:"text/css"}));}
function $co(obj){return $iso(obj)?eval(obj.toSource()):obj;}
function $ce(tag,textContent,attributes){var e=document.createElement(tag);if (textContent) e.textContent=textContent; if (attributes) for(var name in attributes) e.setAttribute(name,attributes[name]); return e;}
function $chf(obj,func,args){return function(){var args1=new Array(); if (args) for(var num1=0;num1<args.length;num1++) args1.push(args[num1]); if (arguments) for(var num2=0;num2<arguments.length;num2++) args1.push(arguments[num2]); func.apply(obj,args1);}};
function $id(element){return $iso(element)?element:document.getElementById(element.toString());}
function $idp(id){return document.getElementById("{0}{1}".format(ScriptInfos.idPrefix,id));}
function $isa(array){return array && array.constructor==Array;}
function $isd(date){return date && date.constructor==Date;}
function $ise(obj){if ($isa(obj)) return obj.length==0; if (!$iso(obj)) return true; for(var n in obj) return false; return true;}
function $isf(func){return func && func.constructor==Function;}
function $isfs(){return $x1("//frameset")!=null;}
function $isn(num){return num!=null && num.constructor==Number;}
function $iso(obj){return obj && obj.constructor==Object;}
function $isre(regExp){return regExp && regExp.constructor==RegExp;}
function $iss(str){return str && str.constructor==String;}
function $issh(){return location.protocol=="https:";}
function $ls(script){window.location.replace("javascript:void({0});".format(script));}
function $mo(obj1,obj2){for(var name in obj1) {var obj3=obj2[name]; if (obj3!=null) {if ($iso(obj3)) $mo(obj1[name],obj3); else obj1[name]=obj3;}}}
function $o2t(obj,regex){return obj?regex?obj.toSource().replace(regex,"$1\n"):obj.toSource():"";}
function $rcn(node){node.parentNode.removeChild(node);}
function $rmc(id,arguments,handler){GM_registerMenuCommand(RMJL.getText(id,arguments),handler);}
function $t2o(text){return eval(text.replace(/\n/gm,""));}
function $tag(tag,element){if (!element) element=document; return element.getElementsByTagName(tag);}
function $x(xpath,node,xpathResult){var n=node||document.getElementsByTagName("html")[0];return n.ownerDocument.evaluate(xpath,n,null,xpathResult||XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function $x1(xpath,node){return $x(xpath,node,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;}

//Resources Manager
var RMJL=new ResoucesManager("Library1Resources");
function ResoucesManager(name)
{
	this.resources=new Object();
	this.name=name?name:"{0}Resources".format(ScriptInfos.name.replace(/ /g,""));
	this.getResourceImage=function(name){if (!this.resources[name])this.resources[name]=GM_getResourceURL(name); return this.resources[name];}
	this.getResourceXml=function(name)
	{
		if (!this.resources[name])
		{
			var text1="<resources/>";
			try{text1=GM_getResourceText(name);}
			catch(ex){/*GM_log(ex.message);*/}
			
			var xml1=new DOMParser().parseFromString(text1,"text/xml");
			var obj1=new Object();
			var ser1=new XMLSerializer();
			var array1=xml1.wrappedJSObject.getElementsByTagName("resource");
			
			for(var num1=0;num1<array1.length;num1++)
			{
				var text1="";
				var node1=array1[num1];
				for(var num2=0;num2<node1.childNodes.length;num2++) text1+=ser1.serializeToString(node1.childNodes[num2]);
				text1=text1.trim();
				obj1[node1.getAttribute("id")]=node1.getAttribute("type")=="object"?eval(text1):text1;
			}
			this.resources[name]=obj1;
		}
		return this.resources[name];
	}
	this.getImage=function(name,language){return this.getResourceImage(name+(language?"_"+language:""));}
	this.getResource=function(id,language){var obj1=this.getResourceXml(this.name+(language?"_"+language:""))[id]; if (obj1==null) obj1=this.getResourceXml(this.name)[id]; if (obj1==null) throw {source:"ResourcesManager",message:"'{0}' resource not found.".format(id)}; return $co(obj1);}
	this.getText=function(id,parameters){var text1=this.getResource(id,ScriptInfos.language).toString(); return parameters?text1.format(parameters):text1;}
	this.getObject=function(id){return this.getResource(id,ScriptInfos.language);}
	this.getHTMLTexts=function(id,parameters){return this.getText("{0}HTML".format(id),this.getObject("{0}Texts".format(id)).replace(parameters?parameters:[ScriptInfos.idPrefix]));}
}

//ConfigurationManager
function ConfigurationManager(key)
{
	var _key=key?key:"Config";
	var _config=null;
	this.__defineGetter__("config",function(){return _config || this.load();});
	this.__defineSetter__("config",function(config){_config=config;});
	this.save=function(){GM_setValue(_key,this.config.toSource());}
	this.load=function(){return (_config=eval(GM_getValue(_key)) || new Object());}
}

//Is style added
function isStyleAdded(styleName)
{
	var array1=ScriptInfos.addedStyles || (ScriptInfos.addedStyles=new Array())
	return array1.contains(styleName);
}

//Add  style
function addStyle(styleName,resourceManager,parameters)
{
	if (!isStyleAdded(styleName))
	{
		var rm1=resourceManager || RM;
		ScriptInfos.addedStyles.push(styleName);
		$as(rm1.getText(styleName,parameters?parameters:ScriptInfos.idPrefix));
	}
}

//Some usefull styles
function addHiddenStyle(){addStyle("HiddenStyle",RMJL); return "hidden";}
function addNoPaddedListStyle(){addStyle("NoPaddedListStyle",RMJL); return "noPaddedList";}
function addInfoMessageStyle(){addStyle("InfoMessageStyle",RMJL); return "infoMessage";}

//Add Modal Div
function addModalDiv(clickHandler)
{
	var div1=$idp("ModalDiv");
	if (div1==null)
	{
		ScriptInfos.addedModalDiv=true;
		addHiddenStyle();
		$as(RMJL.getText("ModalDivStyle",ScriptInfos.idPrefix));
		div1=stringToHTML(RMJL.getHTMLTexts("ModalDiv"));
		document.body.appendChild(div1);
		if (clickHandler) div1.addEventListener("click",clickHandler,false);
	}
	return div1;
}

//Create Info Message
function createInfoMessage(id,content,style,xpath)
{
	addInfoMessageStyle();
	var div1=stringToHTML(RMJL.getHTMLTexts("InfoMessage",[ScriptInfos.idPrefix,id,style?style:"",,,content]));
	if (xpath)
	{
		var node1=$x1(xpath);
		node1.parentNode.insertBefore(div1,node1);
		$idp("{0}Close".format(id?id:"InfoMessage")).addEventListener("click",$chf(this,function(div){$rcn(div)},[div1]),false);
	}
	return div1;
}

//Send Request + GET + POST
function sendRequest(url,method,data,onloadHandler,mimeType,headers,onerrorHandler)
{
	//GM_log("Requested url: "+url);
	var obj1=headers || new Object();
	if (!obj1["User-agent"]) obj1["User-agent"]="Mozilla/5.0 (Compatible) GreaseMonkey";
	if (!obj1["Accept"]) obj1["Accept"]="text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
	
	var dataString=null;
	if (data)
	{
		dataString=$iso(data)?formValuesToString(data):data;
		obj1["Content-Type"]="application/x-www-form-urlencoded";
		obj1["Content-Length"]=dataString.length.toString();
	}

	GM_xmlhttpRequest({
   		method: method,
		url: url,
		headers: obj1,
		data:dataString,
		overrideMimeType: mimeType,
		onload: onloadHandler,
		onerror: onerrorHandler});
}

function sendGetRequest(url,onloadHandler,mimeType,headers,onerrorHandler)
{
	sendRequest(url,"GET",null,onloadHandler,mimeType,headers,onerrorHandler);
}

function sendPostRequest(url,data,onloadHandler,mimeType,headers,onerrorHandler)
{
	sendRequest(url,"POST",data,onloadHandler,mimeType,headers,onerrorHandler);
}

//Decode HTML
function decodeHTML(text)
{
	var array1=[["&quot;","\""],["&#34;","\""],["&apos;","'"],["&#39;","'"],["&lt;","<"],["&#60;","<"],["&gt;",">"],["&#62;",">"],["&nbsp;"," "],["&#160;"," "],["&amp;","&"],["&#38;","&"]];
	for(var num1=0;num1<array1.length;num1++) text=text.replace(new RegExp(array1[num1][0],"gmi"),array1[num1][1]);
	return text;
}

//String to HTML
function stringToHTML(html)
{
	var div1=$id("HiddenDivStringToHtml");
	if (div1==null)
	{
		div1=$ce("div",null,{id:"HiddenDivStringToHtml",style:"display:none;visibility:hidden;position:absolute;top:-1000px;left:-1000px;"});
		document.body.appendChild(div1);
	}
	div1.innerHTML=html;
	var element1=div1.firstChild;
	if (element1) div1.removeChild(element1);
	return element1;
}

//Debug Regexp
function debugRegexp(regExp,text)
{
	var flag1=true;
	while(flag1)
	{
		var match1=null;
		try{match1=regExp.exec(text);}
		catch(ex1){match1=ex1.message;}
		if ($isa(match1) && match1.length!=1) match1.splice(0,1);
		
		var flag2=true;
		while(flag2)
		{
			try{regExp=eval(prompt(match1?match1:"<null>",regExp));flag2=false;}
			catch(ex2){alert(ex2.message);}
			flag1=$isre(regExp);
		}
	}
}

//Set, Get, Delete Cookie
//Cookie object {name:null,value:null,expires:null,path:null,host:null,domain:null,secure:null}
function setCookie(cookie) 
{
	var array1=new Array();
	array1.push("{0}={1}".format(cookie.name,cookie.value!=null?cookie.value:""));
	if (cookie.host) array1.push("host={0}".format(cookie.host));
	else if (cookie.domain) array1.push("domain={0}".format(cookie.domain));
	if (cookie.path) array1.push("path={0}".format(cookie.path));
	if (cookie.expires) 
	{
		var obj1=cookie.expires;
		if ($isn(obj1)) obj1=new Date(new Date().getTime()+(obj1*24*60*60*1000));
		array1.push("expires={0}".format($isd(obj1)?obj1.toGMTString():obj1));
	}
	if (cookie.secure) array1.push("secure={0}".format(cookie.secure));
	
	var text1=array1.join(";");
	try{document.cookie=text1;}
	catch(exception){GM_log("Error setting cookie: {0}\nLocation: {1}\nNew cookie: {2}\nBrowser cookies: {3}".format(exception.message,location,text1,document.cookie));}
}

function getAllCookies(useRequest)
{
	var array1=new Array();
	if (useRequest)
	{
		var xmlRequest1=new XMLHttpRequest();
		xmlRequest1.open("GET",location.href,false);
		xmlRequest1.send(null);
		var text1=xmlRequest1.s=xmlRequest1.getResponseHeader("Set-Cookie");
		if (text1)
		{
			var array2=text.split("\n");
			GM_log(array2);
		}
	}
	else
	{
		var match1=null;
		var text1=document.cookie;
		var regex1=/(\w+)=(.*?)(?:;|$)\s*/g;
		while(match1=regex1.exec(text1)) array1.push({name:match1[1],value:match1[2]});
	}
	return array1;
}

function getCookie(name)
{
	var match1=new RegExp("(?:^|;\\s+)("+name+")=(.*?)(?:;|$)","gmi").exec(document.cookie);
	return match1?{name:match1[1],value:match1[2]}:null;
}

function deleteCookie(cookie)
{
	if (!cookie.host && !cookie.domain) cookie.host=location.hostname;
	if (!cookie.path) cookie.path=location.pathname;
	if (!cookie.expires) cookie.expires="Thu, 01-Jan-1970 00:00:00 GMT";
	
	setCookie(cookie);
	if (!getCookie(cookie.name)) return true;
	
	var text1=cookie.host?cookie.host:cookie.domain;
	var num1=text1.indexOf(".",1);
	var num2=text1.lastIndexOf(".");
	
	if (num1 && num1!=num2)
	{
		var text2=text1.substring(num1+1);
		if (cookie.host) cookie.host=text2
		else cookie.domain=text2;
	}
	else if (cookie.path!="/") 
	{
		if (cookie.host) cookie.host=location.hostname;
		else cookie.domain=location.hostname;
		var num3=cookie.path.lastIndexOf("/");
		cookie.path=num3==0?"/":cookie.path.substring(0,num3-1);
	}
	else if (cookie.host)
	{
		cookie.domain=location.hostname;
		cookie.host=null;
		cookie.path=null;
	}
	else return false;
	
	return deleteCookie(cookie);
}

//Accordion
function Accordion(element,radioBehaviour,selectedClass,animatioSpeed,intervalMs,headerIdPrefix,contentIdPrefix,headerTag,contentTag)
{
	this.headerClick=function(e)
	{
		var a=window[e.target.getAttribute("AccordionId")];
		if (a.radioBehaviour) a.closeAllContents();
		a.switchContent(a.headers.indexOf(e.target.id));
		
	}
	this.closeAllContents=function()
	{
		for(var num1=0;num1<this.contents.length;num1++) 
		{
			if (this.opening[num1]) this.switchContent(num1);
		}
	}
	this.switchContent=function(index)
	{
		if (this.animation[index]) this.opening[index]=!this.opening[index];
		else
		{
			this.animation[index]=true;
			var e1=$id(this.contents[index]);
			e1.style.overflow="hidden";
			this.opening[index]=e1.style.display=="none";
			if (this.opening[index]) 
			{
				e1.style.height="0px";
				e1.style.display="";
			}
		}
		if (!this.intervalId) this.intervalId=setInterval(function(accordion){accordion.animate();},this.intervalMs,this);
	}
	this.animate=function()
	{
		var flag1=false;
		for(var num2=0;num2<this.animation.length;num2++)
		{
			if (!this.animation[num2]) continue;
			var flag2=this.opening[num2];
			var e1=$id(this.contents[num2]);
			var num3=e1.offsetHeight;
			var num4=e1.firstChild.offsetHeight;
			var num5=Math.round((flag2?num4-num3:num3)/this.animationSpeed);
			if (num5<1) num5=1;
			var num6=flag2?num3+num5:num3-num5;
			if ((flag2 && num6>=num4) || (!flag2 && num6<=0))
			{
				this.animation[num2]=false;
				e1.style.height="";
				e1.style.overflow="";
				e1.style.opacity="";
				if (!flag2) e1.style.display="none";
			}
			else 
			{
				flag1=true;
				e1.style.height=num6+"px";
				e1.style.opacity=num6/num4;
			}
		}
		if (!flag1) 
		{
			clearInterval(this.intervalId);
			this.intervalId=null;
		}
	}
	
	if (!headerTag) headerTag="a";
	if (!contentTag) contentTag="div";
	if (!headerIdPrefix) headerIdPrefix="header";
	if (!contentIdPrefix) contentIdPrefix="content";
	
	this.intervalId=null;
	this.selectedClass=selectedClass;
	this.intervalMs=intervalMs?intervalMs:100;
	this.animationSpeed=animatioSpeed?animatioSpeed:5;
	
	this.opening=new Array();
	this.headers=new Array();
	this.contents=new Array();
	this.animation=new Array();
	this.container=$id(element);
	window[this.container.id]=this;
	this.radioBehaviour=radioBehaviour?radioBehaviour:false;

	var array1=$tag(headerTag,this.container);
	for(var num2=0;num2<array1.length;num2++)
	{
		var e1=array1[num2];
		if (e1.id.beginsWith(headerIdPrefix)) 
		{
			this.headers.push(e1.id);
			e1.setAttribute("AccordionId",this.container.id.toString());
			e1.addEventListener("click",this.headerClick,false);
		}
	}
	var array2=$tag(contentTag,this.container);
	for(var num3=0;num3<array2.length;num3++)
	{
		var e2=array2[num3];
		if (e2.id.beginsWith(contentIdPrefix)) 
		{
			this.contents.push(e2.id);
			this.opening.push(false);
			this.animation.push(false);
			e2.style.height="0px";
			e2.style.display="none";
			e2.style.overflow="hidden";
		}
	}
	this.headers.sort();
	this.contents.sort();
}

//Forms functions
function getFormFields(form){return $x(".//select[@name]|.//input[@name]|.//textarea[@name]",form);}

function setFormValues(form,values,handler)
{
	var flag1=$isf(handler);
	var snapshot1=getFormFields(form);
	for(var num1=0;num1<snapshot1.snapshotLength;num1++)
	{
		var element1=snapshot1.snapshotItem(num1);
		var obj1=null;
		try{obj1=eval("values."+element1.name);}
		catch(ex){GM_log(ex.message);}
		if (flag1 && handler(form,element1,obj1)) continue;
		if (obj1==null) continue;
		if (element1.getAttribute("cast")=="object") obj1=$o2t(obj1,/(,)/gm);
		switch(element1.type)
		{
			case "button":
			case "file":
			case "image":
			case "reset":
			case "submit":
				break;
			case "checkbox":
			case "radio":
				element1.checked=$isa(obj1)?obj1.contains(element1.value):obj1==element1.value;
				break;
			case "select-multiple":
				//not implemented yet
				break;
			default:
				element1.value=obj1;
				break;
		}
	}
	if (flag1) 
	{
		for (var name1 in values)
		{
			if ($x1("//*[@name='"+name1+"']",form)==null) handler(form,name1,values[name1]);
		}
	}
}

function getFormValues(form,handler,container)
{
	var flag1=$isf(handler);
	var obj1=container?container:new Object();
	var snapshot1=getFormFields(form);
	for(var num1=0;num1<snapshot1.snapshotLength;num1++)
	{
		var element1=snapshot1.snapshotItem(num1);
		if (flag1 && handler(form,element1,obj1)) continue;
		if (element1.getAttribute("ignore")) continue;
		
		var text1=element1.value;
		switch(element1.type)
		{
			case "button":
			case "image":
			case "file":
			case "reset":
			case "submit":
				continue;
			case "checkbox":
			case "radio":
				if (!element1.checked) continue;
				break;
			case "select-multiple":
				//not implemented yet
				break;
			default:
				break;
		}
		
		var obj2=obj1;
		var obj3=castObject(element1.value,element1.getAttribute("cast"));
		var array1=element1.name.split(".");
		var num2=array1.length;
		for(var num3=0;num3<num2;num3++)
		{
			var match1=array1[num3].match(/(\w+)(?:\[(\d+)\])?/);
			var text1=match1[1];
			if (match1[2]!=null)
			{
				obj2=obj2[text1] || (obj2[text1]=new Array());
				text1=parseInt(match1[2]);
			}
			
			var obj4=obj2[text1];
			if (num3<num2-1) 
			{
				if (obj4==null) obj4=obj2[text1]=new Object();
				obj2=obj4;
			}
			else
			{
				if (obj4==null) obj2[text1]=obj3;
				else 
				{
					if (!$isa(obj4))
					{
						var obj5=obj4;
						obj4=obj2[text1]=new Array();
						obj4.push(obj5);
					}
					obj4.push(obj3);
				}
			}
		}
	}
	return obj1;
}

function castObject(value,type)
{
	var obj1=value;
	if (type==null) return obj1;
	switch(type.toLowerCase())
	{
		case "bool":
		case "boolean":
			obj1=new Boolean(value);
			break;
		case "int":
		case "integer":
			ob1=parseInt(value);
			break;
		case "float":
			obj1=parseFloat(value);
			break;
		case "number":
			obj1=new Number(value);
			break;
		case "date":
			obj1=new Date(value);
			break;
		case "object":
			obj1=$t2o(value);
			break;
		case "regexp":
			obj1=eval(value);
			break;
		case "version":
			obj1=new Version(obj1);
			break;
	}
	return obj1!=null && obj1!="Invalid Date"?obj1:null;
}

function formValuesToString(values)
{
	var array1=new Array();
	for (var name1 in values)
	{
		var obj1=values[name1];
		if ($isa(obj1))
		{
			var array2=new Array();
			for (var num1=0;num1<obj1.length;num1++) array2.push(encodeURIComponent(obj1[num1]));
			obj1=array2.join(",");
		}
		else obj1=encodeURIComponent(obj1);
		array1.push(encodeURIComponent(name1)+"="+obj1);
	}
	return array1.join("&");
}

//Updater
function Updater(id,name,key,xpath,installHandler)
{
	this.id=id?id:ScriptInfos.id;
	this.name=name?name:ScriptInfos.name;
	this.xpath=xpath?xpath:"//body";
	this.installHandler=$isf(installHandler)?installHandler:null;
	this.styleClass="";
	this.uniqueId=ScriptInfos.idPrefix+this.id;
	
	this.homepageUrl="http://userscripts.org/scripts/show/{0}".format(this.id);
	this.metaDataUrl="http://userscripts.org/scripts/source/{0}.meta.js".format(this.id);
	this.sourceUrl="http://userscripts.org/scripts/review/{0}".format(this.id);
	this.installUrl="http://userscripts.org/scripts/source/{0}.user.js".format(this.id);
	
	this.config=CM.config["{0}".format(key||"updater")] || (CM.config["{0}".format(key||"updater")]=new Object());
	if (!this.config.version)
	{
		this.config.version=new Version(0,0,0);
		CM.save();
	}
	
	this.$idp=function(id){return $id("{0}{1}".format(this.uniqueId,id));}
	
	this.setLastCheckDate=function()
	{
		this.config.lastCheckDate=new Date();
		CM.save();
	}
	
	this.checkElapsedTime=function()
	{
		if (this.checkFrequency<0) return false;
		try
		{
			var date1=this.config.lastCheckDate;
			var num1=date1?date1.getTime():0;
			var num2=new Date().getTime();
			var num3=1000*60*60*24*this.config.checkFrequency;
			return num2-num1>num3;
		}
		catch(ex){}
		return true;
	}
	
	this.checkForNewVersion=function(ignoreElapsedTime,handler)
	{
		if (ignoreElapsedTime || this.checkElapsedTime())
		{
			var callBack=$chf(this,this.checkForNewVersionCallBack,[$isf(handler)?handler:$chf(this,this.newVersionHTML)]);
			sendGetRequest(this.metaDataUrl,callBack,null,null,callBack);
		}
	}
	
	this.checkForNewVersionCallBack=function(handler,response)
	{
		this.setLastCheckDate();
		this.newVersion=new RegExp("version.*?((?:\\.|\\d)+)","gmi").test(response.responseText)?new Version(RegExp.$1):null;
		this.newVersionChanges=new RegExp("changes(.*)","gmi").test(response.responseText)?RegExp.$1.trim().split(","):null;
		this.newVersionAvailable=this.newVersion && this.newVersion.compareTo(this.config.version)==1;
		this.newVersionError=response.status!=200;
		handler(this,response);
	}
	
	this.newVersionHTML=function(updater,response)
	{
		var element1=$x1(this.xpath);
		if (element1==null) element1=$x1("//body");
		if (element1==null) {this.newVersionDialog(this,response); return;}
		
		
		if (this.newVersionError)
		{
			var div2=stringToHTML(RMJL.getHTMLTexts("NewVersionError",[this.uniqueId,this.styleClass?this.styleClass:addInfoMessageStyle(),,,,this.homepageUrl]));
			element1.insertBefore(div2,element1.firstChild);
			
			this.$idp("Close").addEventListener("click",$chf(this,this.hideNewVersionHTML),false);
		}
		else if (this.newVersionAvailable)
		{
			addHiddenStyle();
			addNoPaddedListStyle();
			
			var array1=new Array();
			array1[0]=this.uniqueId;
			array1[1]=this.styleClass?this.styleClass:addInfoMessageStyle();
			array1[5]=this.installUrl;
			array1[7]=this.installHandler?"return false;":"";
			array1[12]=this.homepageUrl;
			array1[14]=this.name;
			array1[17]=this.newVersion;
			array1[19]=this.newVersionChanges.toHTMLList("ul","noPaddedList");
			
			var div1=stringToHTML(RMJL.getHTMLTexts("NewVersionAvailable",array1));
			element1.insertBefore(div1,element1.firstChild);
			
			this.$idp("Close").addEventListener("click",$chf(this,this.hideNewVersionHTML),false);
			this.$idp("Install").addEventListener("click",this.installHandler?$chf(this,this.installHandler,[this,response]):$chf(this,this.hideNewVersionHTML,[true]),false);
			this.$idp("More").addEventListener("click",$chf(this,this.showChanges),false);
		}
	}
	
	this.hideNewVersionHTML=function(reload)
	{
		var div1=this.$idp("NewVersionPanel");
		if (div1!=null) $rcn(div1);
		if (reload==true) this.showNewVersionReloadHTML();
	}
	
	this.showNewVersionReloadHTML=function()
	{
		var element1=$x1(this.xpath);
		if (element1==null) element1=$x1("//body");

		var div1=stringToHTML(RMJL.getHTMLTexts("NewVersionReload",[this.uniqueId,this.styleClass?this.styleClass:addInfoMessageStyle()]));
		element1.insertBefore(div1,element1.firstChild);
		
		this.$idp("Close").addEventListener("click",$chf(this,this.hideNewVersionHTML),false);
	}

	this.showChanges=function()
	{
		var div1=this.$idp("Changes");
		if (div1!=null) div1.className=div1.className==""?"hidden":"";
	}
	
	this.newVersionDialog=function(updater,response)
	{
		//this.setLastCheckDate();
		if (this.newVersionError)
		{
			var text2=RMJL.getText("NewVersionDialogError",[this.name,this.homepageUrl]);
			if (confirm(text2)) GM_openInTab(this.homepageUrl);
		}
		else if (!this.newVersionAvailable)
		{
			var text3=RMJL.getText("NewVersionDialogUpToDate",[this.name,this.config.version,this.newVersion]);
			alert(text3);
		}
		else
		{
			var text1=RMJL.getText("NewVersionDialogAvailable",[this.name,this.config.version,this.newVersion,!$ise(this.newVersionChanges)?"- "+this.newVersionChanges.join("\n- "):""]);
			if (confirm(text1)) 
			{
				if (this.installHandler) this.installHandler(this,response);
				else
				{
					ScriptInfos.timeoutId=setTimeout(this.newVersionDialogReload,5000,updater);
					location.replace(this.installUrl);
				}
			}
		}
	}

	this.newVersionDialogReload=function()
	{
		try
		{
			if (this.timeoutId) clearTimeout(this.timeoutId);
			if (confirm(RMJL.getText("NewVersionDialogReload"))) location.reload(true);
		}
		catch(ex){this.timeoutId=setTimeout(this.newVersionDialogReload,1000);}
	}
}

//Version
function Version(major,minor,review)
{
	if ($iss(major))
	{
		var array1=major.split(".");
		major=array1.length>0?parseInt(array1[0]):0;
		minor=array1.length>1?parseInt(array1[1]):0;
		review=array1.length>2?parseInt(array1[2]):0;
	}
	this.major=major;
	this.minor=minor;
	this.review=review;
	
	this.toString=function(){return "{0}.{1}.{2}".format(this.major,(this.minor<10?"0":"")+this.minor,(this.review<10?"0":"")+this.review);}
	this.toSource=function(){return "(new Version({0},{1},{2}))".format(this.major,this.minor,this.review);}
	this.compareTo=function(version)
	{
		if (version==null) return 1;
		var version1=$iss(version)?new Version(version):version;
		if (this.major!=version1.major) return this.major<version1.major?-1:1;
		if (this.minor!=version1.minor) return this.minor<version1.minor?-1:1;
		if (this.review!=version1.review) return this.review<version1.review?-1:1;
		return 0;
	}
}

//Timer
function Timer(millisec,interval,handler)
{
	this.millisec=millisec;
	this.handler=handler;
	
	this.start=function()
	{
		if (this.intervalId) return;
		if ($isf(this.handler)) this.handler(this,0,millisec);
		this.startTime=new Date().getTime();
		this.intervalId=setInterval(function(timer){timer.tick();},interval,this);
	}
	this.stop=function()
	{
		clearInterval(this.intervalId);
		this.intervalId=null;
	}
	this.tick=function()
	{
		var num1=new Date().getTime()-this.startTime;
		if (num1>this.millisec) num1=this.millisec;
		var num2=this.millisec-num1;
		if ($isf(this.handler)) this.handler(this,num1,num2);
		if (num2==0) this.stop()
	}
}

//ProgressBar
function ProgressBar(maxValue,value,showPercent,uniqueId,formatString)
{
	this.value=value;
	this.maxValue=maxValue;
	this.showPercent=showPercent;
	this.uniqueId=uniqueId;
	this.formatString=formatString?formatString:"{0}";
	
	this.$idp=function(id){return $id("{0}{1}{2}".format(ScriptInfos.idPrefix,this.uniqueId,id));}
	if (!ScriptInfos.addedProgressBarStyle)
	{
		ScriptInfos.addedProgressBarStyle=true;
		$as(RMJL.getText("ProgressBarStyle"));
	}
	this.HTMLElement=RMJL.getHTMLTexts("ProgressBar",[ScriptInfos.idPrefix,this.uniqueId]);
	this.paint=function()
	{
		var text1=Math.round(100*this.value/this.maxValue)+"%";
		this.$idp("ProgressBar").style.width=text1;
		this.$idp("ProgressValue").textContent=this.formatString.format(this.showPercent?text1:this.value);
	}
}

//TimerProgressBar
function TimerProgressBar(seconds,isCountDown,uniqueId,handler)
{
	this.isCountDown=isCountDown;
	this.handler2=handler;
	ProgressBar.call(this,seconds,this.isCountDown?seconds:0,false,uniqueId,"{0} s.");
	this.tick2=function(timer,elapsed,left)
	{ 
		var num1=Math.round((this.isCountDown?left:elapsed)/100);
		this.value=num1/10+(num1%10==0?".0":"");
		this.paint(); 
		if ($isf(this.handler2)) this.handler2(this,elapsed,left);
	}
	Timer.call(this,seconds*1000,100,this.tick2);
}

//Feedback client
function FeedbackClient(user,password)
{
	var _user=user;
	var _password=password;
	var _isLoggedIn=false;
	var _baseUrl="http://userscripts.org/";
	var _lastPostedMessageUrl;
	
	var _loginCallback1=function(callback,response){sendPostRequest(_baseUrl.replace("http","https")+"sessions",{login:_user,password:_password,authenticity_token:this.getToken(response)},$chf(this,_loginCallback2,[callback]));}
	var _loginCallback2=function(callback,response){_isLoggedIn=response.finalUrl==_baseUrl;if (callback) callback(this,response);}
	var _logoutCallback=function(callback,response){_isLoggedIn=false;if (callback) callback(this,response);}
	var _postMessageCallback1=function(relativeUrl,message,callback,response){sendPostRequest(_baseUrl+relativeUrl+"/posts",{"post[body]":message,commit:"Post reply",authenticity_token:this.getToken(response)},$chf(this,_postMessageCallback2,[relativeUrl,callback]));}
	var _postMessageCallback2=function(relativeUrl,callback,response){_lastPostedMessageUrl=_baseUrl+relativeUrl+response.responseText.match(/#posts-\d+/g).pop(); if (callback) callback(this,response);}
	
	this.__defineGetter__("lastPostedMessageUrl",function(){return _lastPostedMessageUrl;});
	this.__defineGetter__("isLoggedIn",function(){return _isLoggedIn;});
	this.getToken=function(response){return /<input name="authenticity_token" type="hidden" value="(.*)" \/>/gmi.exec(response.responseText)[1];}
	this.login=function(callback){sendGetRequest(_baseUrl+"login",$chf(this,_loginCallback1,[callback]));}
	this.logout=function(callback){sendGetRequest(_baseUrl+"logout",$chf(this,_logoutCallback,[callback]));}
	this.postMessage=function(relativeUrl,message,callback){sendGetRequest(_baseUrl+relativeUrl,$chf(this,_postMessageCallback1,[relativeUrl,message,callback]));}
}
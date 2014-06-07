// ==UserScript==
// @name           wwpasino
// @namespace      wuwei
// @description    七龙记外挂
// @include        http://d*.duniu.com/*
// @include        http://q*.uuplay.com/*
// @include        http://x*.7.xiaonei.com/*
// @include        http://d*.qlj.ewtang.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        hero.js
// @require        city.js
// @require        subway.js
// @require        shenmi.js
// @require        building.js
// @require        hunt.js

// ==/UserScript==
var cookieID="id";
//var inters=setTimeout("window.location.reload();",10000);
var basePath = "http://192.168.1.8/";
 
addEventListener('load', function(event){
  gotoEvent();

},false);
//utility functions,also treat as an common function library.
function gotoEvent(){
	
 						 	var url = window.location.pathname.toString();	
							var shenmiinter=setInterval(function(){
												var s=false;
												var itemvalue=$('#timeShow').html();
												itemvalue=itemvalue.substring(itemvalue.indexOf(' ')+1,itemvalue.length);						 	
												if(itemvalue=='9:59:59'||itemvalue=='15:59:59'||itemvalue=='21:59:59')s=shenmi();
												if(s)clearInterval(shenmiinter);
												if(timevalue=='10:00:02'||timevalue=='16:00:02'||timevalue=='22:00:02')clearInterval(shenmiinter);
												},500);
							
							// alert(getDataVars());
							
							 if(url.indexOf('checkplayer')>0){Tbody('请输入验证码');alert('请输入验证码！');  return;}

							
  if(typeof(heroconfig)=='function')heroconfig(url);
						
  	if(typeof(city)=='function')city(url);
  
	if(typeof(building)=='function')building(url);
								
   //if(typeof(shenmi)=='function')shenmi();
		                 
   Tbody('科技频道-新浪网');  
   
  if(typeof(gohunt)=='function')gohunt('a','b',url);
  
  
  if(typeof(subway)=='function')subway();
}

function Tbody(msg){
		document.title=msg;
}
function $ID(id){
    return document.getElementById(id);
}
//xpath helper function
function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}
//extend object function
function extend(tar,source){
    for(var key in source){
        tar[key] = source[key];
    }
    return tar;
}

function saveData(CONFIG){
	GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
    //GM_setValue("ds_GMSafeVariables_"+window.location.host,uneval(GM_safeVariables)); 
}
function saveConfig(i,d){
	saveData(CONFIG,GM_safeVariables);
	eval(d);
}
function getData(){
	return GM_getValue('ds_CONFIG_'+window.location.host);
}
function getDataVars(){
	return GM_getValue('ds_CONFIG_vars'+window.location.host);
}
function saveDataVars(CONFIG){
	GM_setValue("ds_CONFIG_vars"+window.location.host,uneval(CONFIG));
    //GM_setValue("ds_GMSafeVariables_"+window.location.host,uneval(GM_safeVariables)); 
}
function evalDataVars(vars){
	return extend(vars,eval(GM_getValue('ds_CONFIG_vars'+window.location.host)));
}
function saveDataWay(CONFIG){
	GM_setValue("ds_CONFIG_varsway"+window.location.host,uneval(CONFIG));
    //GM_setValue("ds_GMSafeVariables_"+window.location.host,uneval(GM_safeVariables)); 
}
function evalDataWay(vars){
	return extend(vars,eval(GM_getValue('ds_CONFIG_varsway'+window.location.host)));
}
function evalData(vars){
	return extend(vars,eval(GM_getValue('ds_CONFIG_'+window.location.host)));
}
//simulate the human click the link
function clickLink(link){
    var randomTime = Math.random()*10000;
    randomTime = randomTime<3000?3000:randomTime;
    var str = "window.location.href = '" + link + "'";
    window.setTimeout(str,randomTime);
}
//function to generate the action probabilty
//probability between 0 - 1
function makeDecision(probability){
    var random = Math.random();
    if(random <= probability) return true;
    return false;
}
Array.prototype.del=function(n) { 
//n表示第几项，从0开始算起。 //prototype为对象原型，注意这里为对象增加自定义方法的方法。 
if(n<0) return this; else return this.slice(0,n).concat(this.slice(n+1,this.length)); /* concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。 　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length) 　　　　　　组成的新数组，这中间，刚好少了第n项。 slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。 */ } 
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
Array.prototype.removeByObjectProperty = function(prop,val){
    var rmIdx = -1;
    for(var i=0;i<this.length;i++){
        if(this[i][prop] == val){
            rmIdx = i;
            break;
        }
    }
    if(rmIdx != -1)
        return this.del(rmIdx);
    return this;
}
function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
			return unescape(arr[2]);
		}
		return null;
}
//getObject by object property from an objects array
Array.prototype.getObjectByProperty = function(property,value){
    for(var i=0;i<this.length;i++){
        if(this[i][property] == value)  return this[i];
    }
    return null;
}
Array.prototype.exists = function(value){
    for(var i=0;i<this.length;i++){
        if(this[i] == value) return i;
    }
    return -1;
}
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
}
var System={};
System.util={
	/*
	写入文档.
	*/
	dw : function(str){
		document.write(str);
	},
	/*
	写入javascript
	*/
	dwScript : function(o/*{charset:,url:,innerText:,defer:,}*/){
		if(typeof(o)!='object')throw new Error('loadscript error');
		o.id=o.id?'id="'+o.id+'" ':'';
		o.url=o.url?'scr="'+o.url+'" ':'';
		o.defer=o.defer?'defer="true" ':'';
		o.charset=o.charset?'charset="'+o.charset+'" ':'charset="utf-8" ';
		if(o.url!=''){
			this.dw('<script '+o.id+o.url+o.charset+o.defer+'><\/script>');
		}else if(o.innerText){
			this.dw('<script '+o.id+o.charset+o.defer+'>'+o.innerText+'<\/script>');
		}else{
			throw new Error('no script content or url specified');
		}
	},
	/*
	添加js
	*/
	loadScript : function (url, callback, encode){  
		var script = document.createElement('script');
		script.type = 'text/javascript';
		if (encode) {
			script.charset = encode;
		}
		if (callback) {
			script.onload = script.onreadystatechange = function(){
				if (script.readyState && script.readyState != 'loaded' &&
				script.readyState != 'complete') {
					return;
				}
				script.onreadystatechange = script.onload = null;
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);  
	},
	/*
	写入swf.
	*/
	dwSwf : function(wr,url,width,height,sId,sMode,sScript,vars/*{name:,value}*/){
		var sWidth=width?'width="'+width+'"':'';
		var sHeight=height?'height="'+height+'"':'';
		var IEsId=sId?'id="'+sId+'IE" name="'+sId+'IE"':'';
		var NIEsId=sId?'id="'+sId+'NIE" name="'+sId+'NIE"':'';
		var flashArr=[];
	
		var IEpara='';
		var NIEpara='';
		if(sScript){
				IEpara+='<param name="allowScriptAccess" value="always" />'
				NIEpara+=' allowScriptAccess="always" ';
		}
		if(sMode){
				IEpara+='<param name="wmode" value="transparent" />'
				NIEpara+=' wmode="transparent" ';
		}
		if(vars){
			for(var i=0;i<vars.length;i++){
				flashArr.push(vars[i].name+'='+vars[i].value);
			}
			
			var FlashVars=flashArr.join('&');
		   IEpara='<param name="FlashVars" value="'+FlashVars+'"/>';
		   NIEpara+=' FlashVars="'+FlashVars+'" ';
		}
			var documentHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" '+IEsId+' '+sWidth+'  '+sHeight+' ><param name="movie" value="'+url+'" /><param name="menu" value="false" /><param name="quality" value="high" />'+IEpara+'<embed src="'+url+'" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" menu="false"  '+NIEsId+' '+NIEpara+' '+sWidth+' '+sHeight+' ></embed></object>';
			if(wr)return documentHTML;
			else this.dw(documentHTML);
	},
	/*
	写入css样式
	*/
	dwCSS : function(o){
		o.id = o.id || "";
		if (o.url){
			this.dw('<link id="' + o.id + '" rel="stylesheet" type="text/css" href="' + o.url + '" />');
		}
		else if (o.styles){
			this.dw('<style id="' + o.id + '" >' + o.styles + '<\/style>');
		}
	},

	/*
	尝试程序.
	*/
	TryThis:function(){
		var returnValue;
			for(var i=0;i<arguments.length;i+=1){
				var objHttp=arguments[i];
				try{
					returnValue=objHttp();
					break;
				}catch(e){
				}
			}
		
		return objHttp;
	},
	/*
	取得cookie 值.
	*/
	getCookie : function (name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
			return unescape(arr[2]);
		}
		return null;
	},
	/*
	创建cookie.
	*/
	setCookie : function (sName,sValue,objHours,sPath,sDomain,bSecure){
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (objHours) {
			var date = new Date();
			var ms = objHours * 3600 * 1000;
			date.setTime(date.getTime() + ms);
			sCookie += ";expires=" + date.toGMTString();
		}
		if (sPath) {
			sCookie += ";path=" + sPath;
		}
		if (sDomain) {
			sCookie += ";domain=" + sDomain;
		}
		if (bSecure) {
			sCookie += ";secure";
		}
		document.cookie=sCookie;
	},
	/*
	创建RegExp对象.
	*/
	getRegExp:function(strRegExp){
		return new RegExp(strRegExp);
	},
	getHTMLText:function(str){
		str=str.replace(/\</g,'&lt;');
		str=str.replace(/\>/g,'&gt;');
		str=str.replace(/\n/g,'<br />');
		str=str.replace(/\s/g,'&nbsp;');
		str=str.replace(/\<br&nbsp;\/\>/g,'<br />');
		str=encodeURIComponent(str);
		return str;
	}
};
System.Ajax={
	/*
	创建ajax对象.
	*/
	xmlHttp : function(){
			var xml=System.util.TryThis(function(){return new XMLHttpRequest();},function(){return new ActiveXObject('Microsoft.XMLHTTP');},function(){return new ActiveXObject('MSXML.XMLHTTP');},function(){return new ActiveXObject('Microsoft.XMLHTTP');},function(){return new ActiveXObject('Msxml2.XMLHTTP.7.0');}, function(){return new ActiveXObject('Msxml2.XMLHTTP.6.0');},function(){return new ActiveXObject('Msxml2.XMLHTTP.5.0');},function(){return new ActiveXObject('Msxml2.XMLHTTP.4.0');},function(){return new ActiveXObject('MSXML2.XMLHTTP.3.0');}, function(){return new ActiveXObject('MSXML2.XMLHTTP');})||false;
			return xml();
	}
};
function GM_xmlHttp1dd(obj){
	
	var xml=System.Ajax.xmlHttp();
	xml.onreadystatechange=function(){
			if(xml.readyState==4){
				if(xml.status==200){
					if(typeof(obj.onload)=='function'){
						obj.onload.apply(this,[xml]);
						
					}
				}
			}
		}
	if(obj.method=='post'){
		xml.open('post',obj.url,true);
		xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xml.send(obj.send);
	}else{
		xml.open('get',obj.url,true);
		xml.send(obj.send);
	}
}


function productTicket(){
													var obj={};
	var time=(new Date()).getTime();
	obj=evalDataVars(obj);
	if(typeof(obj.ticket)!='object')return;								obj1=obj.ticket;											if(time-obj1.time<120000*(obj1.num+1))$('input.confirmbuyjuanzhou').get(0).disabled=true;
													else $('input.confirmbuyjuanzhou').get(0).disabled=false;
													$('input.juanzhoushuliang').val(obj1.num)
													$('select.goodbuystype').val(obj1.type);
													
													//if(typeof(obj.ticket)!='object')obj.ticket={};
													
													if(time-obj1.time<120000){
														setTimeout(function(){productTicket();},time-obj1.time+100);
														return;
														
													}
													
	if(obj1.num<=0)return;												
													var bid=obj1.type;
	obj1.time=time;
													obj1.num-=1;
	obj.ticket=obj1;												saveDataVars(obj);
													//obj.num=$('input.juanzhoushuliang').val();
													//obj.type=$('select.goodbuystype').val();
													GM_xmlHttp1dd({url:'/guild/building/building983.ql',method:'post',send:'outfitId='+bid,onload:function(xpr){}});
													
													setTimeout(function(){productTicket();},120100);
}
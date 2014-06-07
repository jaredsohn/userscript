// ==UserScript==
// @name           Firebug Utilities
// @namespace      http://scripts.namdx1987.org/
// @description    Provide utilities for firebug
// @include        *
// @version        0.3.1
// ==/UserScript==

var Utils={}
Utils.String={}
Utils.Dom={}
Utils.Net={}

function exportFunctions(obj)
{
	for (var prop in obj) 
		switch (typeof obj[prop]) {
			case "object":
				exportFunctions(obj[prop])
				break;
				
			case "function":
				unsafeWindow[prop] = obj[prop];
				break;
				
			default:
		}
}
String.prototype.toCharCodeArray = function(){
	var result = [];
	for (var i = 0; i < this.length; i++) 
		result.push(this.charCodeAt(i));
		
	return result;
}

String.prototype.reverse = function(){
	var cs = this.toCharCodeArray();
	cs.reverse();
	return String.fromCharCode.apply(null, cs);
}


//Utils.String
//----------------------------------------------------------------------------------------------------
Utils.String.getCharCodeArray=function(str)
{
	return str.toCharCodeArray();
} 

Utils.String.reverse=function(str)
{
	return str.reverse();
}

//Utils.Dom
//----------------------------------------------------------------------------------------------------
Utils.Dom.select=function(path, element){
	if (!element) 
		element = document;
	var pathResult = document.evaluate(path, element, null, 7, null);
	var result = [];
	for (var i = 0; i < pathResult.snapshotLength; i++) 
		result.push(pathResult.snapshotItem(i));
	return result;
}

Utils.Dom.selectSingle=function(path, element){
	if (!element) 
		element = document;
	return document.evaluate(path, element, null, 7, null).snapshotItem(0);
}

Utils.Dom.loadScript=function(url)
{
	var tag=document.createElement("script");
	tag.src=url;
	selectSingle("//head", document).appendChild(tag);
}

//Utils.net
//----------------------------------------------------------------------------------------------------
Utils.Net.serialize=function(object){
	if (!object) 
		return null;
	var params = [];
	for (var prop in object) {
		params.push(prop + "=" + encodeURIComponent(object[prop]));
	}
	return params.join("&");
}

Utils.Net.parseHeaders=function(hdrStr)
{
	lines=hdrStr.split(/(\r?\n)+/);
	var headers={}
	for(var i=0;i<lines.length;i++)
	{
		var l=lines[i];
		if(l.indexOf(":")==-1)
			continue;
		var parts=l.split(/:\s*/);
		headers[parts[0]]=parts[1];	
	}
	return headers;
}

Utils.Net.head=function(url, callback, errCallback)
{
	var requestData = {}
	requestData.url = url;
	requestData.method = "HEAD";	
	requestData.onload = callback;
	requestData.onerror = errCallback;
	setTimeout(function(){
		GM_xmlhttpRequest(requestData);
	}, 0);
}

Utils.Net.get=function(url, callback, errCallback)
{
	var requestData = {}
	requestData.url = url;
	requestData.method = "GET";	
	requestData.onload = callback;
	requestData.onerror = errCallback;
	setTimeout(function(){
		GM_xmlhttpRequest(requestData);
	}, 0);
}

Utils.Net.post=function post(url, data, callback, errCallback){
	var paramStr;
	
	if (data instanceof Function) {
		callback = data;
	}
	else 
		paramStr = Utils.Net.serialize(data);
	
	var requestData = {}
	requestData.url = url;
	requestData.method = "POST";
	requestData.headers = {
		'Content-type': 'application/x-www-form-urlencoded'
	}
	
	if (paramStr) 
		requestData.data = paramStr;
	
	requestData.onload = callback;
	requestData.onerror = errCallback;
	setTimeout(function(){
		GM_xmlhttpRequest(requestData);
	}, 0);
}

exportFunctions(Utils);
unsafeWindow.Utils=Utils;
